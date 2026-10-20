// Erweiterung „Wunder der Welt“ Teil 1 (AP 5.7, 1.27.0, Entscheidung 22): je Held eine Karte aus seiner Lebenswelt und fünf
// neutrale – nur vorhandene Regeln, jede mit Quelle, alle noch Platzhalter. Dazu die Rückmeldung zu 1.25.0: Beim ersten
// Hinterhalt erklärt ein Fenster einmal, was die Wachsrolle ist.
require('./attrappen.js');
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const root=path.join(__dirname,'../..'),game=path.join(root,'quellcode/assets/game');
const need=f=>require(path.join(game,f));
const D=need('model/data.js'),E=need('model/engine.js'),L=need('model/lore.js'),P=need('model/profile.js');
const {Store}=need('model/store.js'),{Match}=need('viewmodel/match.js'),{Dialogs}=need('viewmodel/dialogs.js');
const SET=D.cards.filter(c=>c.set==='wunder');

function ready(hero='leonidas',foe='khan'){const s=E.create({hero,foe,seed:4242,first:0});E.mulligan(s,[]);for(const a of s.players){a.hand=[];a.mana=a.maxMana=10;}return s;}
const give=(s,p,id)=>{const h={id,uid:'t'+s.nextId++};s.players[p].hand.push(h);return h;};
const act=(s,a)=>{const r=E.apply(s,a);assert.ok(r.ok,r.error+' '+JSON.stringify(a));};
const play=(s,id,extra={})=>{const h=give(s,s.active,id);act(s,{type:'play',uid:h.uid,...extra});return h;};
const minion=(s,p,id='attrappe_23')=>{const u=E.summon(s,p,id);u.ready=true;delete u.fresh;return u;};
const placed=(s,p,id)=>s.players[p].board.find(u=>u.id===id);
const turn=s=>{act(s,{type:'end'});const a=s.players[s.active];a.mana=a.maxMana=10;};

test('Teil 1: 27 Karten hinten angehängt – je Held eine, fünf neutrale, Quelle, Platzhalter, Werte-Budget',()=>{
 assert.equal(SET.length,27);assert.deepEqual(D.cards.slice(362).map(c=>c.id),SET.map(c=>c.id),'IDs hinten angehängt');
 for(const h of D.heroes)assert.equal(SET.filter(c=>c.hero===h.id).length,1,h.id+': eine Karte');
 assert.equal(SET.filter(c=>c.hero==='neutral').length,5);assert.ok(SET.every(c=>!c.age),'keine Zeitalterkarten');
 const motive=fs.readFileSync(path.join(root,'ungenutzte_assets/MOTIVE.md'),'utf8'),auftrag=fs.readFileSync(path.join(root,'ungenutzte_assets/ASTRA_AUFTRAG.md'),'utf8');
 for(const c of SET){
  assert.ok(D.missingArt(c),c.id+': Platzhalter bis Astra');assert.ok(motive.includes(c.id)&&auftrag.includes(c.id),c.id+': Bildidee für Astra');
  const line=L.card(c.id);assert.ok(line&&line[0].length>80&&line[1].length>5,c.id+': Aus der Chronik mit Quelle');
  assert.ok(['common','rare','epic'].includes(c.rarity),c.id+': keine neue Legendäre');
  if(c.type==='minion')assert.ok(c.attack+c.health<=2*c.cost+1,c.id+': Grundwerte höchstens 2 × Kosten + 1');
  assert.ok(D.glossaryOf(c).length||c.type==='minion','Zauber erklären das Wort');}
 // Drei neue Hinterhalte – damit begegnet man ihnen öfter (Rückmeldung zu 1.25.0).
 assert.deepEqual(SET.filter(c=>c.ambush).map(c=>c.id),['epaminondas_10','neutral_55','neutral_56']);
 for(const h of D.heroes)assert.ok(D.cards.filter(c=>c.ambush&&D.playable(c,h.id)).length>=5,h.id+': mindestens fünf Hinterhalte im Pool');
});

test('Alte Spielstände (1.26.0): die neuen Karten fehlen in der Sammlung und kommen mit 0 dazu, Decks bleiben gültig',()=>{
 const p=P.fresh();for(const c of SET)delete p.collection[c.id];delete p.ambushSeen;
 const back=P.parse(JSON.stringify(p));assert.ok(SET.every(c=>back.collection[c.id]===0));assert.equal(back.ambushSeen,false);
 assert.equal(back.decks.length,p.decks.length);
 // Code WUNDER: wer CHRONIK schon eingelöst hat, bekommt so auch die neuen Karten – und nur diese.
 back.redeemed=['CHRONIK'];const before=back.collection.neutral_0;assert.ok(P.redeem(back,'wunder').code);
 assert.ok(SET.every(c=>back.collection[c.id]===2));assert.equal(back.collection.neutral_0,before);assert.ok(P.redeem(back,'WUNDER').error);
});

test('Weltwunder: Koloss stürzt auf die Feinde, Zeus stärkt und heilt, Irminsul treibt die Sachsen an',()=>{
 const s=ready();play(s,'neutral_52');const koloss=placed(s,0,'neutral_52');assert.ok(koloss.building&&koloss.taunt);
 const f1=minion(s,1,'attrappe_34'),f2=minion(s,1);koloss.health=1;E.hurt(s,koloss.uid,1);E.settle(s);
 assert.equal(f1.health,2);assert.equal(f2.health,1,'2 Schaden an allen Feinden');
 const t=ready(),own=minion(t,0);play(t,'neutral_53');assert.equal(own.attack,3,'+1 Angriff');t.players[0].health=20;turn(t);assert.equal(t.players[0].health,22);
 const u=ready('khan'),w=minion(u,0);play(u,'khan_14');assert.equal(w.attack,3,'solange sie steht: +1 Angriff');const irm=placed(u,0,'khan_14');irm.health=0;E.settle(u);assert.equal(w.attack,4,'Vermächtnis: +2 Angriff');
});

test('Bauwerke der Helden: Pegau ruft Grenzsteine, Neuf-Brisach Schanzkörbe, Albrechtsburg zieht, Kecharitomene ergründet',()=>{
 let s=ready('ragnar');play(s,'ragnar_14');turn(s);turn(s);assert.equal(s.players[0].board.filter(u=>u.id.startsWith('totem_')).length,1);
 s=ready('zizka');play(s,'zizka_10');turn(s);turn(s);assert.ok(placed(s,0,'wagon'));
 s=ready('nostradamus');play(s,'nostradamus_13');const n=s.players[0].hand.length,hp=s.players[0].health;turn(s);
 assert.equal(s.players[0].hand.length,n+1,'am Ende des Zuges 1 Karte');assert.equal(s.players[0].hand.at(-1).mod,-1,'sie kostet 1 weniger');assert.equal(s.players[0].health,hp);
 s=ready('anna');play(s,'neutral_18',{target:'h1'});play(s,'anna_13');turn(s);turn(s);assert.ok(s.choice&&s.choice.p===0,'Wahl aus gespielten Karten');
});

test('Diener und Zauber: Artusfahrt nur für Segen, Eiren gibt Schildwall, Krak schickt zurück, Fabius’ Sohn lässt erstarren',()=>{
 let s=ready('musashi');const plain=minion(s,0),blessed=minion(s,0);blessed.shield=true;play(s,'musashi_13');
 assert.equal(plain.attack,2);assert.equal(blessed.attack,3);assert.ok(placed(s,0,'musashi_13').shield);
 s=ready();const own=minion(s,0);play(s,'leonidas_13',{target:own.uid});assert.ok(own.taunt);assert.equal(own.attack,2);assert.equal(own.health,4);
 s=ready('baibars');const foe=minion(s,1);const n=s.players[0].hand.length;play(s,'baibars_10',{target:foe.uid});
 assert.ok(!s.players[1].board.includes(foe));assert.ok(s.players[1].hand.some(h=>h.id==='attrappe_23'));assert.equal(s.players[0].hand.length,n+1);
 s=ready('fabius');const f=minion(s,1);play(s,'fabius_11',{target:f.uid});assert.ok(f.frozen);assert.equal(s.players[0].armor,2);
});

test('Neue Hinterhalte: Gänse geben Rüstung vor dem Schlag, Skytale zieht, Scheinlager stärkt den Diener ganz links',()=>{
 let s=ready();play(s,'neutral_55');turn(s);let u=minion(s,1,'attrappe_34');act(s,{type:'attack',uid:u.uid,target:'h0'});
 assert.equal(s.players[0].health,30,'4 Rüstung fangen 3 Schaden');assert.equal(s.players[0].armor,1);
 s=ready();play(s,'neutral_56');turn(s);const n=s.players[0].hand.length;play(s,'neutral_18',{target:'h0'});assert.equal(s.players[0].hand.length,n+2);
 s=ready('epaminondas');const left=minion(s,0);play(s,'epaminondas_10');turn(s);u=minion(s,1);act(s,{type:'attack',uid:u.uid,target:left.uid});
 assert.equal(left.attack,4);assert.equal(left.health,5-2,'erst +2/+2, dann der Schlag');
});

test('Rückmeldung zu 1.25.0: Beim ersten Hinterhalt erklärt ein Fenster einmal die Wachsrolle – danach nie wieder',()=>{
 const m=new Map(),storage={getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v))},store=new Store({storage});store.load();
 const log={};const ui={screen:()=>'game',busy:()=>false,hidden:()=>false,unlockAudio(){},haptic(){},toast(){},play(){},go(){},
  dialog:(kind,vm)=>{log.open={kind,vm};},close:()=>{log.open=null;},dialogOpen:()=>!!log.open};
 const ctx={store,ui,session:{mode:'free'}};ctx.dialogs=new Dialogs(ctx,'test');const match=new Match(ctx);ctx.match=match;
 ctx.board={busy:()=>false,begin:(b,s,a,o,impact,done)=>{impact();done();},rebound(){},cancel(){},events(){},effect(){}};
 const s=E.create({hero:'khan',foe:'fabius',seed:11,first:0});E.mulligan(s,[]);store.profile.game=s;store.profile.matchChronicle=[];
 assert.equal(store.profile.ambushSeen,false);
 const a=s.players[0],b=s.players[1];a.mana=a.maxMana=10;b.mana=b.maxMana=10;a.hand=[{id:'neutral_2',uid:'m1'}];
 assert.ok(match.action({type:'play',uid:'m1'}));assert.equal(log.open,undefined,'ohne Hinterhalt kein Fenster');
 // Die KI legt einen Hinterhalt: das Fenster erklärt ihn, ohne die Karte zu verraten.
 s.active=1;b.hand=[{id:'fabius_10',uid:'k1'}];assert.ok(match.action({type:'play',uid:'k1'}));
 assert.equal(log.open.kind,'message');assert.equal(log.open.vm.state.title,'Ein Hinterhalt liegt bereit');
 assert.match(log.open.vm.state.text,/Der Gegner hat eine Karte verdeckt.*erst in Deinem Zug zuschnappt/);assert.ok(!log.open.vm.state.text.includes('Gerunium'));
 assert.equal(store.profile.ambushSeen,true);assert.ok(JSON.parse(m.get('chroniken.profile')).ambushSeen,'gespeichert');
 // Beim Zuschnappen kommt es nicht noch einmal.
 log.open=null;s.active=0;const mine=a.board[0];mine.ready=true;delete mine.fresh;const theirs=E.summon(s,1,'neutral_0');
 assert.ok(match.action({type:'attack',uid:mine.uid,target:theirs.uid}));assert.ok(s.events.some(e=>e.type==='ambush'));assert.equal(log.open,null);
 // Zuschnappen als erster Kontakt: Name und Wirkung stehen im Fenster.
 assert.deepEqual(match.lesson([{type:'ambush',p:1,id:'neutral_55'}]),{kind:'sprung',p:1,name:'Gänse des Kapitols',text:'Wenn ein feindlicher Diener Euren Helden angreift, erhaltet Ihr 4 Rüstung.'});
 store.profile.ambushSeen=false;assert.ok(match.teach(match.lesson([{type:'ambush',p:1,id:'neutral_55'}])));
 assert.equal(log.open.vm.state.title,'Hinterhalt!');assert.match(log.open.vm.state.text,/„Gänse des Kapitols“: Wenn ein feindlicher Diener/);
});
