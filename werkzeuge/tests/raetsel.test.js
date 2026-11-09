// Kartenrätsel (AP 6.4 Teil 2): je Kapitel ein Rätsel „Gewinne in diesem Zug“ nach einer historischen Lage. Ein Löser über die Engine
// beweist, dass jedes lösbar ist und nicht trivial; dazu Freischalten, Belohnung, Regel am Zugende, Kampagnenkarte und Match.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const game=path.join(__dirname,'../../quellcode/assets/game'),need=f=>require(path.join(game,f)),read=f=>fs.readFileSync(path.join(game,f),'utf8');
const D=need('model/data.js'),E=need('model/engine.js'),P=need('model/profile.js'),KA=need('model/campaign.js'),RA=need('model/puzzles.js');
const {Store}=need('model/store.js'),{Dialogs}=need('viewmodel/dialogs.js'),{Campaign}=need('viewmodel/campaign.js'),{Match}=need('viewmodel/match.js');

function setup(screen='campaign'){const m=new Map(),storage={getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v))},store=new Store({storage});store.load();
 const log={go:[],dialogs:[],toasts:[]};
 const ui={screen:()=>screen,busy:()=>false,hidden:()=>false,unlockAudio(){},haptic(){},toast:t=>log.toasts.push(t),play(){},go:(next,arg)=>{log.go.push(next);screen=next;log.open=null;},
  dialog:(kind,vm)=>{log.dialogs.push({kind,vm});log.open={kind,vm};},close:()=>{log.open=null;},dialogOpen:vm=>!!log.open&&(!vm||log.open.vm===vm)};
 const ctx={store,ui,session:{mode:'free',hero:'leonidas',foe:'hypatia',deckId:'leonidas',mission:0}};ctx.dialogs=new Dialogs(ctx,'test');
 ctx.board={busy:()=>false,begin:(b,s,a,o,impact,done)=>{impact();done();},rebound(){},cancel(){},events(){},effect(){}};
 ctx.match=new Match(ctx);return {ctx,store,log};}
const won=p=>{for(const c of KA.CHAPTERS)p.campaign.push(...c.missions);};
const play=(s,line)=>{for(const a of line)assert.ok(E.apply(s,a).ok,JSON.stringify(a));return s;};

test('Sechs Rätsel: je Kapitel der Lehrplan-Epochen eines, mit Lage, Tipp, Quelle und Karten des Kapitels',()=>{
 assert.equal(RA.PUZZLES.length,6);assert.deepEqual(RA.PUZZLES.map(z=>z.chapter),KA.CHAPTERS.slice(0,6).map(c=>c.id),'in der Reihenfolge der Kapitel');
 assert.equal(RA.ofChapter('epilog'),null);assert.equal(new Set(RA.PUZZLES.map(z=>z.id)).size,6);
 for(const z of RA.PUZZLES){
  assert.equal(D.heroById[z.hero].age,z.chapter,z.id+': der Held lebt in der Epoche des Kapitels');assert.ok(D.heroById[z.foe]&&z.foe!==z.hero);
  for(const k of ['title','place','boss','source'])assert.ok(z[k].length>=4,z.id+' '+k);assert.match(z.year,/\d/);
  assert.ok(z.text.length>=80&&z.text.length<=260,z.id+': Lage in zwei, drei Sätzen');assert.ok(z.hint.length>=30&&z.hint.length<=140,z.id+': Tipp');
  assert.equal(z.reward,75);
  const ids=[...z.you.board,...z.you.hand,...z.rival.board].map(x=>Array.isArray(x)?x[0]:x);
  for(const id of ids)assert.ok(D.byId[id],z.id+': '+id);
  // Keine Karte, die ein Zufall entscheidet oder vom leeren Deck zieht – die Lösung soll sich durchdenken lassen.
  for(const id of [...z.you.board,...z.you.hand].map(x=>Array.isArray(x)?x[0]:x)){const c=D.byId[id],all=[...(c.battle||[]),...(c.effects||[])];
   assert.ok(!all.some(e=>/^random|discover|draw$/.test(e.type)||e.random),z.id+': '+c.name+' ohne Zufall und ohne Ziehen');}}
});

test('Löser: jedes Rätsel ist lösbar, braucht mindestens drei Schritte, und nicht jeder erste Schritt führt zum Ziel',()=>{
 for(const z of RA.PUZZLES){const s=RA.state(z),r=RA.solve(s);
  assert.ok(r.win,z.id+' ist lösbar');assert.ok(r.shortest>=3,z.id+': keine Lösung in ein oder zwei Schritten ('+r.shortest+')');
  assert.ok(r.good<r.first,z.id+': '+r.good+' von '+r.first+' ersten Schritten führen zum Ziel');assert.ok(r.good/r.first<=.7,z.id+': die meisten Wege scheitern');
  // Die gefundene Lösung gewinnt wirklich – und mit einem anderen Startwert genauso: kein Zufall im Rätsel.
  for(const seed of [7919,1,123456789]){const t=Object.assign(RA.state(z),{seed});play(t,r.line);assert.equal(t.phase,'over');assert.equal(t.winner,0,z.id+' mit Startwert '+seed);}
  const other=RA.solve(Object.assign(RA.state(z),{seed:42}));assert.deepEqual([other.good,other.first,other.shortest],[r.good,r.first,r.shortest],z.id+' hängt nicht am Startwert');
  // Wer nur angreift, was er kann, und dann den Zug beendet, verliert.
  const t=RA.state(z);for(let i=0;i<20&&t.phase==='play';i++){const a=E.legal(t).find(x=>x.type==='attack')||{type:'end'};E.apply(t,a);}
  assert.equal(t.winner,1,z.id+': nur Angreifen reicht nicht');}
});

test('Lösungswege nach der Geschichte: die Einsicht jedes Rätsels steckt in seiner kürzesten Lösung',()=>{
 const names=z=>{const s=RA.state(z),out=[];for(const a of RA.solve(s).line){const h=a.type==='play'&&s.players[0].hand.find(x=>x.uid===a.uid);out.push(h?h.id:a.type);E.apply(s,a);}return out;};
 const by=Object.fromEntries(RA.PUZZLES.map(z=>[z.id,names(z)]));
 assert.ok(by.auaris.includes('amanirenas_4')&&by.auaris.includes('amanirenas_2'),'Auaris: Gift und Pfeilregen gegen den Segen');
 assert.ok(by.leuktra.includes('power')&&by.leuktra.includes('griechen_2'),'Leuktra: die Schiefe Schlachtordnung trifft den Läufer ganz links');
 assert.equal(by.naulochos[0],'agrippa_11','Naulochos: die Harpax zieht den Triarier herüber');
 assert.ok(by.suentel.indexOf('khan_3')<by.suentel.indexOf('khan_5'),'Süntel: erst der Reiter, dann der Aufstand');
 assert.ok(by.konstantinopel.indexOf('dandolo_4')<by.konstantinopel.indexOf('dandolo_11'),'Konstantinopel: erst die Klinge, dann der Schmied');
 assert.ok(!by.brennofen.includes('nostradamus_5'),'Brennofen: der Befehl des Kurfürsten kostet das letzte Leben');
 assert.ok(by.brennofen.indexOf('attack')<by.brennofen.indexOf('nostradamus_7'),'Brennofen: erst zuschlagen, dann die Glut');
});

test('Engine: ein Rätsel endet mit Deinem Zug verloren – ohne Zug des Gegners; der Gegner trägt den Namen der Lage',()=>{
 const z=RA.byId.leuktra,s=RA.state(z);
 assert.equal(s.mode,'puzzle');assert.equal(s.phase,'play');assert.equal(s.active,0);assert.equal(s.players[0].deck.length,0);assert.equal(s.players[0].mana,6);
 assert.ok(s.players[0].board.every(u=>u.ready&&!u.fresh),'Deine Diener dürfen angreifen');assert.match(s.log[0],/^Rätsel: Fünfzig Schilde tief/);
 E.apply(s,{type:'end'});assert.equal(s.phase,'over');assert.equal(s.winner,1);assert.equal(s.missed,true);assert.equal(s.players[1].turns,s.players[0].turns,'kein Zug des Gegners');
 assert.match(s.log.at(-1),/das Rätsel bleibt ungelöst/);
 const t=play(RA.state(z),RA.solve(RA.state(z)).line);assert.match(t.log.at(-1),/^Epaminondas gewinnt\.$/);
 const u=RA.state(z);E.hurt(u,'h0',99);E.settle(u);assert.match(u.log.at(-1),/^Kleombrotos von Sparta gewinnt\.$/);
 // Heldenfähigkeit gesperrt, wo sie den Zufall brächte.
 assert.equal(E.canPower(RA.state(RA.byId.auaris),0),false);assert.equal(E.canPower(RA.state(RA.byId.leuktra),0),true);
});

test('Freischalten nach dem Kapitel, Gold nur für die erste Lösung, keine Statistik; alte und kaputte Spielstände',()=>{
 const p=P.fresh();assert.deepEqual(p.puzzles,[]);const z=RA.byId.auaris;
 assert.ok(!RA.unlocked(p,z));p.campaign=[21,2];assert.ok(!RA.unlocked(p,z),'erst wenn das ganze Kapitel gewonnen ist');p.campaign.push(12);assert.ok(RA.unlocked(p,z));
 assert.ok(!RA.unlocked(p,RA.byId.leuktra));
 const gold=p.gold,stats={...p.stats},win=play(RA.state(z),RA.solve(RA.state(z)).line);
 const r=P.reward(p,win,false,new Date(2026,9,25));assert.deepEqual([r.gold,r.first],[75,true]);assert.equal(p.gold,gold+75);assert.deepEqual(p.puzzles,['auaris']);
 assert.deepEqual(p.stats,stats,'kein Duell');assert.deepEqual(p.heroXp,{},'keine Erfahrung');assert.equal(p.daily,null,'keine Tagesaufgabe');
 const again=play(RA.state(z),RA.solve(RA.state(z)).line);assert.equal(P.reward(p,again).gold,0);assert.equal(p.gold,gold+75);
 const lost=RA.state(z);E.apply(lost,{type:'end'});assert.equal(P.reward(p,lost).gold,0);assert.deepEqual(p.stats,stats);
 // Spielstand von 1.32.0 ohne Rätsel; kaputte Einträge fallen weg; eine laufende Rätselpartie übersteht Speichern und Laden.
 const old=P.fresh();delete old.puzzles;assert.deepEqual(P.parse(JSON.stringify(old)).puzzles,[]);
 const bad=P.fresh();bad.puzzles=['auaris','auaris','nirgendwo',3];assert.deepEqual(P.parse(JSON.stringify(bad)).puzzles,['auaris']);
 const saved=P.fresh();saved.game=RA.state(RA.byId.suentel);const back=P.parse(JSON.stringify(saved));assert.equal(back.game.puzzle,'suentel');assert.equal(back.game.boss,'Die fränkischen Grafen');
 const gone=P.fresh();gone.game={...RA.state(z),puzzle:'atlantis'};assert.equal(P.parse(JSON.stringify(gone)).game,null,'ein unbekanntes Rätsel fällt weg, der Spielstand bleibt');
});

test('Kampagnenkarte und Match: Rätsel im Panel, Lage, Brett, Tipp, Neu beginnen, Ergebnis mit „Noch einmal“',()=>{
 const {ctx,store,log}=setup(),c=new Campaign(ctx),p=store.profile;c.enter();
 assert.deepEqual(c.riddle,{puzzle:RA.byId.auaris,open:false,solved:false});c.openRiddle();assert.equal(log.open,undefined,'versiegelt');
 won(p);c.chapter('epilog');assert.equal(c.riddle,null,'der Epilog hat kein Rätsel');c.chapter('griechen');assert.ok(c.riddle.open);
 c.openRiddle();assert.equal(log.open.kind,'riddle');assert.equal(log.open.vm.state.puzzle.id,'leuktra');assert.equal(log.open.vm.state.chapter.id,'griechen');
 // Eine echte Partie läuft: erst die Rückfrage.
 p.game=E.create({hero:'leonidas',foe:'hypatia',deck:E.starter('leonidas'),seed:3});log.open.vm.choose(1);
 assert.equal(log.open.kind,'message');assert.equal(log.open.vm.state.title,'Laufende Partie');assert.equal(p.game.puzzle,undefined);
 log.open.vm.choose(1);assert.equal(p.game.puzzle,'leuktra');assert.deepEqual(log.go,['game']);
 const m=ctx.match;assert.deepEqual(m.opening(p.game).names,['Epaminondas','Kleombrotos von Sparta']);
 m.pause();assert.equal(log.open.vm.state.title,'Rätsel · Fünfzig Schilde tief');assert.deepEqual(log.open.vm.state.buttons.map(b=>b.label),['Weiter','Tipp','Neu beginnen','Zur Kampagne']);
 log.open.vm.choose(1);assert.equal(log.open.vm.state.title,'Tipp');assert.match(log.open.vm.state.text,/ganz links/);log.open.vm.choose(0);
 // Falsch gespielt, neu aufgelegt, dann gelöst – Gold einmal, das Ergebnis bietet „Noch einmal“.
 const gold=p.gold,stats={...p.stats};m.action({type:'end'});assert.equal(p.game.winner,1);assert.equal(log.open.kind,'result');
 assert.equal(log.open.vm.state.missed,true);assert.equal(log.open.vm.state.puzzle.title,'Fünfzig Schilde tief');assert.deepEqual(log.open.vm.state.buttons.map(b=>b.label),['Noch einmal','Zur Kampagne']);
 log.open.vm.choose(0);assert.equal(p.game.phase,'play');assert.equal(p.game.puzzle,'leuktra');assert.equal(log.open,null,'der Wechsel schließt das Ergebnis');
 for(const a of RA.solve(RA.state(RA.byId.leuktra)).line)assert.ok(m.action(a));
 assert.equal(p.game.winner,0);assert.equal(p.gold,gold+75);assert.deepEqual(p.puzzles,['leuktra']);assert.deepEqual(p.stats,stats,'keine Duell-Statistik');
 const bars=log.open.vm.state.bars;assert.deepEqual(bars.map(b=>b.key),['gold','puzzles']);assert.deepEqual([bars[1].from,bars[1].to,bars[1].goal],[0,1,6]);
 log.open.vm.choose(1);assert.equal(log.go.at(-1),'campaign');c.chapter('griechen');assert.ok(c.riddle.solved);
});

test('Ansichten: Platzhalter für Astra, Tafel im Match, Lage und Ergebnis; Laden vor dem Spielstand',()=>{
 const camp=read('view/campaign.js'),dlg=read('view/dialogs.js'),rnd=read('view/match/render.js');
 assert.match(camp,/\/\/ ASTRA: raetsel-siegel – /);assert.match(camp,/cmd:'openRiddle'/);
 assert.match(dlg,/\/\/ ASTRA: raetsel-lage – /);assert.match(dlg,/D_\.riddle=/);assert.match(dlg,/'GELÖST':'UNGELÖST'/);
 assert.match(rnd,/\/\/ ASTRA: raetsel-tafel – /);assert.match(rnd,/riddle\(c,s\)/);assert.match(read('viewmodel/match.js'),/puzzle:\(\)=>'Kartenrätsel'/);
 const html=read('index.html');assert.ok(html.indexOf('model/campaign.js')<html.indexOf('model/puzzles.js')&&html.indexOf('model/puzzles.js')<html.indexOf('model/profile.js'));
 const order=fs.readFileSync(path.join(__dirname,'../../ungenutzte_assets/ASTRA_AUFTRAG_OBERFLAECHE.md'),'utf8');
 for(const k of ['raetsel-siegel','raetsel-lage','raetsel-tafel'])assert.ok(order.includes('| `'+k+'` |'),k);
});
