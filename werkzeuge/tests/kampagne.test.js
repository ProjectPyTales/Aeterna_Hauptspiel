// Kampagne 2.0 (AP 6.4) mit der Lunte (AP 3.7): Kapitel nach den Epochen des Lehrplans, Story-Szenen mit Quelle, Freischalten in
// der neuen Reihenfolge (alte Spielstände behalten ihren Fortschritt), Lunte als Regel am Zugende, Kampagnenkarte und Szene.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const game=path.join(__dirname,'../../quellcode/assets/game'),need=f=>require(path.join(game,f)),read=f=>fs.readFileSync(path.join(game,f),'utf8');
const D=need('model/data.js'),E=need('model/engine.js'),P=need('model/profile.js'),KA=need('model/campaign.js');
const {Store}=need('model/store.js'),{Dialogs}=need('viewmodel/dialogs.js'),{Campaign,Scene,STATIONS}=need('viewmodel/campaign.js'),{Match}=need('viewmodel/match.js'),{Setup}=need('viewmodel/setup.js');

function setup(screen='campaign'){const m=new Map(),storage={getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v))},store=new Store({storage});store.load();
 const log={go:[],dialogs:[],sounds:[],closed:0};
 const ui={screen:()=>screen,busy:()=>false,hidden:()=>false,unlockAudio(){},haptic(){},toast(){},play:s=>log.sounds.push(s),go:(next,arg)=>log.go.push([next,arg]),
  dialog:(kind,vm)=>{log.dialogs.push({kind,vm});log.open={kind,vm};},close:()=>{log.closed++;log.open=null;},dialogOpen:vm=>!!log.open&&(!vm||log.open.vm===vm)};
 const ctx={store,ui,session:{mode:'free',hero:'leonidas',foe:'hypatia',deckId:'leonidas',mission:0}};ctx.dialogs=new Dialogs(ctx,'test');
 return {ctx,store,log};}
// Eine Mission, in der Du nur Züge beendest; Dein Held hält alles aus.
function siege(id,first=0){const s=E.create({hero:'leonidas',foe:D.missions[id].hero,deck:E.starter('leonidas'),mode:'campaign',mission:id,seed:11,first});
 E.mulligan(s,[]);s.players[0].health=s.players[0].maxHealth=99999;return s;}
const step=s=>E.apply(s,s.active===0?{type:'end'}:E.ai(s)||{type:'end'});

test('Kapitel: sechs Epochen in der Reihenfolge des Lehrplans und ein Epilog, jede Mission genau einmal',()=>{
 const C=KA.CHAPTERS;assert.equal(C.length,7);assert.deepEqual(C.slice(0,6).map(c=>c.id),D.ages.map(a=>a.id),'Kapitel I–VI = Epochen des Lehrplans');
 assert.ok(C[6].epilogue);assert.deepEqual(C[6].missions,[9],'Der letzte Horizont schließt die Kampagne');
 assert.equal(KA.ORDER.length,22);assert.deepEqual([...KA.ORDER].sort((a,b)=>a-b),D.missions.map(m=>m.id));
 for(const c of C.slice(0,6))for(const id of c.missions)assert.equal(D.heroById[D.missions[id].hero].age,c.id,D.missions[id].title+' gehört in '+c.label);
 assert.equal(KA.number(21),1,'Kapitel I beginnt am Mont Lassois');assert.equal(KA.number(9),22);assert.equal(KA.chapterOf(5).id,'rom');
 assert.deepEqual(C.map(c=>c.label),['Kapitel I','Kapitel II','Kapitel III','Kapitel IV','Kapitel V','Kapitel VI','Epilog']);
});

test('Lunte: genau die letzte Mission jedes Kapitels, mit Grund und Quelle; Belagerungen auf der Karte',()=>{
 const fused=D.missions.filter(m=>m.fuse).map(m=>m.id);
 assert.deepEqual(fused.sort((a,b)=>a-b),KA.CHAPTERS.slice(0,6).map(c=>c.missions.at(-1)).sort((a,b)=>a-b));
 for(const id of fused){const f=KA.fuse(id);assert.ok(f.turns>=12&&f.turns<=14,D.missions[id].title);assert.match(f.text,/Lunte abbrennt/);assert.ok(f.source.length>8);}
 assert.equal(KA.fuse(0),null);
 for(const id of fused.filter(id=>id!==3))assert.ok(STATIONS[id].siege,STATIONS[id].place+' ist eine Belagerung');
});

test('Story-Szenen: Sprecher aus der Epoche des Kapitels oder der Chronist, jede Szene mit Quelle',()=>{
 for(const c of KA.CHAPTERS){assert.ok(c.scene.length>=2&&c.scene.length<=5,c.label);assert.ok(c.source.length>20,c.label+' nennt eine Quelle');
  assert.equal(c.scene[0].who,'chronist','der Chronist eröffnet');
  for(const l of c.scene){assert.ok(l.who==='chronist'||D.heroById[l.who],l.who);assert.ok(l.text.length>20&&l.text.length<=200,l.text);
   if(l.who!=='chronist'&&!c.epilogue)assert.equal(D.heroById[l.who].age,c.id,l.who+' spricht in seiner Epoche');}}
});

test('Freischalten in der Reihenfolge der Kapitel; alte Spielstände behalten ihren Fortschritt',()=>{
 const p=P.fresh();assert.deepEqual(p.scenes,[]);
 assert.deepEqual(D.missions.filter(m=>KA.unlocked(p,m.id)).map(m=>m.id),[21],'neu: nur die erste Mission');
 for(const id of KA.ORDER){assert.ok(KA.unlocked(p,id));p.campaign.push(id);}
 // Ein Spielstand von 1.30.0 mit den Missionen 1–10 (alte Reihenfolge): alle bleiben vollendet und spielbar, dazu öffnen ihre Nachfolger.
 const old=P.fresh();old.campaign=[0,1,2,3,4,5,6,7,8,9];delete old.scenes;const q=P.parse(JSON.stringify(old));
 assert.deepEqual(q.scenes,[]);assert.ok(q.campaign.every(id=>KA.unlocked(q,id)));
 assert.deepEqual(D.missions.filter(m=>!q.campaign.includes(m.id)&&KA.unlocked(q,m.id)).map(m=>m.id).sort((a,b)=>a-b),[10,12,13,14,15,16,20,21]);
 const bad=P.fresh();bad.scenes=['steppe','steppe','nirgendwo',3];assert.deepEqual(P.parse(JSON.stringify(bad)).scenes,['steppe']);
});

test('Engine: die Lunte zählt die eigenen Züge und beendet die Mission am Ende des letzten verloren',()=>{
 for(const first of [0,1]){const s=siege(4,first),left=[];let guard=0;
  assert.deepEqual(E.fuse(s),{turns:12,left:12});
  while(s.phase==='play'&&guard++<500){if(s.active===0)left.push(E.fuse(s).left);step(s);}
  assert.deepEqual(left,[12,11,10,9,8,7,6,5,4,3,2,1]);assert.equal(s.winner,1);assert.equal(s.burnt,true);assert.equal(s.players[0].turns,12);
  assert.match(s.log.at(-1),/Die Lunte ist abgebrannt – Karl der Große hält stand\./);assert.deepEqual(E.fuse(s),{turns:12,left:0});}
 // Ein Sieg im letzten Zug zählt.
 const s=siege(10);while(s.players[0].turns<12||s.active!==0)step(s);
 E.hurt(s,'h1',999);E.settle(s);assert.equal(s.winner,0);assert.ok(!s.burnt);
 // Ohne Lunte (Mission 1, freies Duell) endet nichts nach zwölf Zügen.
 for(const mission of [0,null]){const t=E.create({hero:'leonidas',foe:'hypatia',deck:E.starter('leonidas'),mode:mission==null?'free':'campaign',mission,seed:5,first:0});
  E.mulligan(t,[]);t.players[0].health=99999;assert.equal(E.fuse(t),null);while(t.phase==='play'&&t.players[0].turns<14)step(t);assert.equal(t.phase,'play');assert.ok(!t.burnt);}
 // Verloren durch die Lunte zählt wie eine Niederlage nach vier Zügen: 10 Gold, keine Mission.
 const p=P.fresh(),b=siege(12);while(b.phase==='play')step(b);const r=P.reward(p,b,false,new Date(2026,9,24));assert.equal(r.gold,10);assert.deepEqual(p.campaign,[]);
});

test('Kampagnenkarte: Kapitel-Leiste, Routen je Kapitel, Szene vor der ersten Mission eines Kapitels',()=>{
 const {ctx,store,log}=setup(),c=new Campaign(ctx);c.enter();
 assert.equal(c.picked.mission.id,21);assert.equal(c.picked.chapter.id,'steppe');
 assert.deepEqual(c.chapters.map(x=>[x.chapter.id,x.open,x.done,x.total,x.current]).slice(0,2),[['steppe',true,0,3,true],['griechen',false,0,4,false]]);
 c.start();assert.equal(log.open.kind,'scene','erst die Szene');assert.deepEqual(log.go,[]);assert.deepEqual(store.profile.scenes,['steppe']);
 const sc=log.open.vm;assert.ok(sc instanceof Scene);assert.equal(sc.line.who,'chronist');assert.deepEqual(sc.cast,['chronist','fuhao','imhotep','amanirenas']);
 sc.prev();assert.equal(sc.state.step,0);sc.next();sc.next();assert.equal(sc.line.who,'imhotep');sc.next();assert.ok(sc.last);sc.next();
 assert.deepEqual(log.go.at(-1),['setup',undefined],'nach der letzten Zeile zur Heldenwahl');assert.equal(ctx.session.mission,21);
 c.start();assert.equal(log.go.length,2,'die Szene kommt nur einmal');
 c.replay();assert.equal(log.open.kind,'scene');log.open.vm.done();assert.equal(log.go.length,2,'noch einmal ansehen führt nirgendwohin');
 c.chapter('griechen');assert.equal(c.picked.mission.id,0);assert.ok(c.picked.locked);c.start();assert.equal(log.go.length,2,'versiegelt');
 store.profile.campaign=[21,2,12];c.chapter('griechen');assert.ok(!c.picked.locked);c.start();assert.equal(log.open.kind,'scene');assert.equal(log.open.vm.chapter.id,'griechen');
 log.open.vm.done();assert.deepEqual(log.go.at(-1),['setup',undefined],'Überspringen führt weiter');
 const r=c.routes;assert.equal(r.length,7);assert.ok(r[1].current);assert.deepEqual(r[0].legs.map(l=>l.won),[true,true]);
 assert.equal(c.ordered.map(x=>x.number).join(),Array.from({length:22},(_,i)=>i+1).join());
 // Heldenwahl und Match nennen die Lunte und die neue Nummer.
 Object.assign(ctx.session,{mode:'campaign',mission:10});assert.deepEqual(new Setup(ctx).view.fuse.turns,12);
 const m=new Match(ctx),s=siege(10);assert.match(m.opening(s).line,/^Mission 7 · Die Langen Mauern: .*Die Lunte brennt: 12 eigene Züge\.$/);
});

test('Ansichten: Platzhalter für Astra, Szene, Lunte im Match und im Ergebnis',()=>{
 const camp=read('view/campaign.js'),dlg=read('view/dialogs.js'),rnd=read('view/match/render.js');
 assert.match(camp,/\/\/ ASTRA: kapitelsiegel – /);for(const k of ['szene-buehne','sprechblase','chronist'])assert.match(dlg,new RegExp('// ASTRA: '+k+' – '),k);
 assert.match(rnd,/\/\/ ASTRA: lunte – /);assert.match(rnd,/fuse\(c,s,t\)/);assert.match(rnd,/AEKA\.number\(s\.mission\)/);
 assert.match(dlg,/D_\.scene=/);assert.match(dlg,/s\.burnt\?'Die Lunte ist abgebrannt/);
 const html=read('index.html');assert.ok(html.indexOf('model/campaign.js')<html.indexOf('model/profile.js'),'Kampagnen-Modell vor dem Spielstand');assert.match(html,/view\/css\/campaign\.css/);
});
