/* Deutsche Aufnahmen werden erst bei ihrem Einsatz als Stream geöffnet. Das Musikstück läuft weiter. */
(() => {
  'use strict';
  const audio=window.CHA, D=window.CHD;
  const families=[
    [/reiter|rekrut.*pferd|kavaller|ritter|streitwagen|kataphrakt/i,['hooves','lance','thud']],
    [/bogen|schütz|speerwerf|schleuder/i,['slide','swing','return']],
    [/galeere|schiff|triere|brander|kogge|galeone/i,['grind','clash','destroy']],
    [/turm|bastion|ballista|tribok|geschütz|mauer|schanze/i,['stone','catapult','destroy']],
    [/hund|löw|elefant|kobra|habicht|adler(?!krieger)/i,['thud','swing','land']],
    [/gelehrt|schreib|schüler|lehrling|ärzt|archiv|priester|mönch|bibliothek/i,['page','channel','parchment']]
  ];
  const infantry=['land','clash','thud'];
  let current, gain, speechBus, queue=[], lastComment=-Infinity, lastId='';
  function stop(){
    queue=[];if(!current)return;
    current.onended=current.onerror=null;current.pause();current.removeAttribute('src');current.load();current=null;
    gain?.disconnect();gain=null;
  }
  function next(){
    const id=queue.shift();if(!id){stop();return;}
    if(current){current.onended=current.onerror=null;current.pause();gain?.disconnect();}
    current=new Audio('assets/audio/stimmen/'+id+'.ogg');
    gain=audio.ctx.createMediaElementSource(current);
    if(!speechBus){speechBus=audio.ctx.createGain();speechBus.connect(audio.master);}
    speechBus.gain.value=audio.settings.voice??.8;gain.connect(speechBus);
    audio.duck.gain.setTargetAtTime(.4,audio.ctx.currentTime,.06);
    const ended=()=>{if(!queue.length)audio.duck.gain.setTargetAtTime(1,audio.ctx.currentTime,.2);next();};
    const el=current;el.onended=el.onerror=ended;el.play().catch(()=>{if(current===el)ended();});
  }
  function speak(ids,interrupt=false){
    if(!audio.ctx||!(audio.settings.voice??.8)||document.hidden)return;
    if(interrupt)stop();if(current)return;
    queue=ids;next();
  }
  function foley(id,stage){const card=D.byId[id];if(!card)return;
    const groups=families.find(([pattern])=>pattern.test(card.name))?.[1]||infantry;
    audio.play(groups[stage],{gain:.42});}
  window.AESpeech={
    sample(){speak(['anfang'],true);},
    stop(){stop();if(audio.ctx)audio.duck.gain.setTargetAtTime(1,audio.ctx.currentTime,.18);},
    volume(v){if(!v)this.stop();else if(speechBus)speechBus.gain.value=v;},
    opening(s){lastComment=-Infinity;lastId='';speak(['anfang',s.players[1].hero+'-gruss'],true);},
    ending(s){speak(['ende',s.players[0].hero+'-chronik'],true);},
    action(before,s,act){
      const p=before.active, a=before.players[p], id=act.type==='play'?a.hand.find(c=>c.uid===act.uid)?.id:
        act.type==='attack'?a.board.find(u=>u.uid===act.uid)?.id:null;
      const c=D.byId[id],dead=s.events.filter(e=>e.type==='death'),legend=dead.find(e=>D.byId[e.id].rarity==='legendary');
      if(c?.type==='minion')foley(id,act.type==='attack'?1:0);
      if(dead.length)foley(dead[0].id,2);
      if(s.phase==='over')return;
      if(c?.rarity==='legendary' && act.type==='play'){speak(['monument',id+'-auftritt'],true);return;}
      if(legend){speak([legend.id+'-abschied']);return;}
      if(c?.rarity==='legendary'&&act.type==='attack'){if(lastId!==id){speak([id+'-angriff']);lastId=id;}return;}
      if(current||p!==1||s.turn<3||performance.now()-lastComment<35000)return;
      const delta=s.players[0].health-before.players[0].health;
      const tag=a.health<=10?'gefahr':delta<=-3?'vorteil':'';
      if(tag && lastId!==tag){lastComment=performance.now();lastId=tag;speak([a.hero+'-'+tag]);}
    }
  };
})();
