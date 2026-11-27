/* Der Server führt die gemeinsame Engine aus. Ein Platz erhält nur seine Hand und seine erlaubten Züge. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id), version=AENEU.version;
  const storageKey='aeterna.freundesduell', local=['localhost','127.0.0.1','[::1]'].includes(location.hostname);
  const read=(store,key)=>{try{return JSON.parse(store.getItem(key));}catch{return null;}};
  const deck=read(sessionStorage,'aeterna.duelldeck') || {hero:'leonidas',name:'Leonidas · Basis',cards:CHE.starter('leonidas')};
  let saved=read(localStorage,storageKey), ws, timer, state, stopped=false, pending=false, versionConflict=false;
  const redraw=()=>{if(state)render(state);};
  $('deck').textContent='Dein Deck · '+deck.name;
  $('adresse').value=saved?.url || localStorage.getItem('aeterna.duellserver') || (local?'ws://127.0.0.1:8787':'');
  const status=msg=>{$('status').textContent=msg;};
  const node=(tag,str,cls)=>{const el=document.createElement(tag);if(str!=null)el.textContent=str;if(cls)el.className=cls;return el;};
  function button(label,click){const el=node('button',label);el.onclick=click;return el;}
  function send(m){if(ws?.readyState!==WebSocket.OPEN||pending)return;pending=true;ws.send(JSON.stringify({...m,rev:state?.rev}));redraw();}
  function connect(type){
    clearTimeout(timer);let u;
    try{u=new URL(saved?.url||$('adresse').value.trim());
      if(u.protocol!=='wss:' && !(local && ['localhost','127.0.0.1','[::1]'].includes(u.hostname)&&u.protocol==='ws:'))throw Error();
      if(u.username||u.password||u.hash)throw Error();
    }catch{status('Gib die WSS-Adresse des Duellservers ein.');return;}
    if(type==='join'&&!/^[A-F0-9]{10}$/i.test($('code').value.trim())){status('Der Einladungscode hat zehn Zeichen.');return;}
    let socket;try{socket=new WebSocket(u.href);}catch{status('Die Serveradresse ist nicht erreichbar.');return;}
    ws=socket;stopped=false;pending=true;versionConflict=false;$('lobby').hidden=true;status('Verbindung wird aufgebaut …');
    socket.onopen=()=>{localStorage.setItem('aeterna.duellserver',u.href);
      socket.send(JSON.stringify(type==='resume'?{type,version,code:saved.code,key:saved.key}:
        {type,version,hero:deck.hero,deck:deck.cards,code:$('code').value.trim().toUpperCase()}));};
    socket.onmessage=e=>{
      if(ws!==socket)return;
      const m=JSON.parse(e.data);
      if(m.type==='left'){stopped=true;clearTimeout(timer);localStorage.removeItem(storageKey);socket.close();location.replace('index.html');return;}
      if(m.type==='seat'){saved={code:m.code,key:m.key,url:u.href};localStorage.setItem(storageKey,JSON.stringify(saved));}
      if(m.type==='state'){pending=false;state=m;render(m);}
    };
    socket.onclose=e=>{
      if(ws!==socket||stopped)return;pending=true;redraw();
      if(e.code>=4000&&e.code<4100){
        // Bei einem Versionsfehler kann derselbe Platz mit der richtigen App wieder übernommen werden.
        versionConflict=e.code===4001;
        if([4002,4003].includes(e.code)){saved=null;localStorage.removeItem(storageKey);}
        $('spiel').replaceChildren();$('lobby').hidden=!!saved;$('verlassen').hidden=!saved;status(e.reason);return;
      }
      if(saved){status('Verbindung unterbrochen. Dein Platz bleibt reserviert. Verbinde erneut …');timer=setTimeout(()=>connect('resume'),1600);}
      else{$('lobby').hidden=false;status('Duellserver nicht erreichbar. Prüfe Adresse und Verbindung.');}
    };
  }
  function card(c,detail,click){
    const el=click?button('',click):node('div');el.className='karte';
    const art=node('span',null,'bild');
    art.style.backgroundImage='url("assets/art/'+c.art+'.webp")';
    art.style.backgroundPosition=(c.cell%4)*100/3+'% '+Math.floor(c.cell/4)*50+'%';
    el.append(art,node('b',c.name),node('span',detail,'werte'));if(c.text)el.append(node('small',c.text,'regel'));return el;
  }
  function area(root,title){const el=node('section',null,'zone');el.append(node('h2',title));const row=node('div',null,'reihe');el.append(row);root.append(el);return row;}
  let marked=new Set(), selected=null, lastRev=-1;
  function render(s){
    const root=$('spiel');root.replaceChildren();$('lobby').hidden=true;$('verlassen').hidden=false;
    const mine=s.seat,ready=s.online.every(Boolean)&&!pending;
    $('verlassen').textContent=s.phase==='over'?'Duell schließen':'Einladung verlassen';
    if(s.phase==='waiting'){status('Einladungscode '+s.code+' · Warte auf deinen Gast.');return;}
    if(lastRev!==s.rev){selected=null;lastRev=s.rev;}
    const result=s.winner===-1?'Unentschieden':s.winner===mine?'Du hast gewonnen.':'Dein Gegenüber hat gewonnen.';
    status(s.phase==='over'?result:!s.online.every(Boolean)?'Partie pausiert. Warte auf die Wiederverbindung.':
      s.phase==='mulligan'?(s.kept?'Warte auf die andere Starthand.':'Markiere Karten zum Tauschen.') :
      'Zug '+s.turn+' · '+(s.active===mine?'Du bist am Zug.':'Dein Gegenüber spielt.'));
    for(const i of [1-mine,mine]){
      const p=s.players[i],name=CHD.heroById[p.hero].name;
      const row=area(root,(i===mine?'Du':'Gegenüber')+' · '+name+' · '+p.health+' Leben · '+p.armor+' Rüstung · '+p.mana+'/'+p.maxMana+' Mana');
      row.append(node('span',p.hand+' Hand · '+p.deck+' Deck · '+p.ambush+' Hinterhalt'+(p.weapon?' · Waffe '+p.weapon.attack+'/'+p.weapon.durability:'')));
      for(const unit of p.board)row.append(card(CHD.byId[unit.id],unit.attack+' Angriff · '+unit.health+' Leben'+(unit.frozen?' · Starre':'')));
    }
    const labels=new Map(s.players.map((p,i)=>['h'+i,CHD.heroById[p.hero].name]));
    for(const p of s.players)for(const u of p.board)labels.set(u.uid,CHD.byId[u.id].name+' ('+u.attack+'/'+u.health+' · '+u.uid+')');
    const hand=area(root,'Deine Hand');
    for(const c of s.hand){
      labels.set(c.uid,CHD.byId[c.id].name);
      const swap=s.phase==='mulligan'&&!s.kept&&ready;
      const el=card(CHD.byId[c.id],c.cost+' Mana',swap?()=>{marked.has(c.uid)?marked.delete(c.uid):marked.add(c.uid);redraw();}:null);
      if(swap)el.setAttribute('aria-pressed',String(marked.has(c.uid)));hand.append(el);
    }
    if(s.phase==='mulligan'&&!s.kept&&ready){root.append(button('Starthand bestätigen',()=>send({type:'mull',ids:[...marked]})));return;}
    if(s.phase!=='play'||s.active!==mine||!ready)return;
    const actions=area(root,'Spielzug');actions.className='befehle';
    const groups=new Map();
    s.actions.forEach((a,index)=>{
      let key=a.type+':'+(a.uid??a.index??'');
      if(!groups.has(key))groups.set(key,[]);groups.get(key).push({a,index});
    });
    const actionName=a=>({play:'Ausspielen · '+labels.get(a.uid),attack:'Angreifen · '+labels.get(a.uid),
      power:CHD.heroById[s.players[mine].hero].power,choose:'Wählen · '+(CHD.byId[s.choices[a.index]]?.name||''),end:'Zug beenden'})[a.type];
    for(const [key,list] of groups){
      const a=list[0].a;
      const place=a.type==='play'&&CHD.byId[s.hand.find(c=>c.uid===a.uid).id].type==='minion'&&s.players[mine].board.length;
      const multi=!!(place||a.target);
      const cmd=button(actionName(a),()=>{if(multi){selected=key;redraw();}else send({type:'act',index:list[0].index});});
      cmd.dataset.action=key;actions.append(cmd);
      if(key!==selected)continue;
      const panel=node('div',null,'befehle');let pos;
      if(place){pos=node('select');pos.setAttribute('aria-label','Platz auf dem Feld');
        for(let i=0;i<=s.players[mine].board.length;i++){const o=node('option','Platz '+(i+1));o.value=i;pos.append(o);}pos.selectedIndex=pos.options.length-1;panel.append(pos);}
      for(const {a,index} of list){
        const target=button(a.target?'Ziel · '+labels.get(a.target):'Hier ausspielen',
          ()=>send({type:'act',index,...(pos?{position:Number(pos.value)}:{})}));
        target.dataset.index=index;panel.append(target);
      }
      actions.append(panel);
    }
  }
  $('erstellen').onclick=()=>connect('create');$('beitreten').onclick=()=>connect('join');
  $('verlassen').onclick=()=>{if(state?.phase!=='over'&&!confirm('Platz auf diesem Gerät freigeben? Ohne den Schlüssel kannst du nicht zurückkehren.'))return;
    if(versionConflict){localStorage.removeItem(storageKey);location.replace('index.html');return;}
    if(ws?.readyState!==WebSocket.OPEN){status('Zum Aufgeben erneut verbinden. Dein Platz bleibt reserviert.');return;}
    ws.send(JSON.stringify({type:'leave'}));status('Der Server bestätigt das Verlassen …');};
  $('vollbild').hidden=!document.fullscreenEnabled;$('vollbild').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
  window.App={back:()=>location.replace('index.html'),onPause:()=>{},onResume:()=>{},resize:()=>{},onUpdate:()=>{}};
  for(const id of ['adresse','code','erstellen','beitreten'])$(id).disabled=false;
  if(saved)connect('resume');
})();
