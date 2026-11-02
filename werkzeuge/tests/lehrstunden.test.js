// Version 1.34.0: Lehrstunden (AP 6.5), Schwierigkeitsgrade der KI (AP 5.8) und Einstellungen aus Phase 7 – Textgröße, Farben,
// ruhige Bewegung, Grafik, automatische Sicherungen und lokales Fehlerprotokoll.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),{execFileSync}=require('node:child_process');
const game=path.join(__dirname,'../../quellcode/assets/game'),need=f=>require(path.join(game,f)),read=f=>fs.readFileSync(path.join(game,f),'utf8');
const D=need('model/data.js'),E=need('model/engine.js'),P=need('model/profile.js'),TU=need('model/tutorial.js'),F=need('service/protokoll.js');
const {Store}=need('model/store.js'),{Dialogs}=need('viewmodel/dialogs.js'),{Match}=need('viewmodel/match.js'),{Menu}=need('viewmodel/menu.js'),{Setup}=need('viewmodel/setup.js');

const memory=()=>{const m=new Map();return {m,getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v))};};
function setup(screen='menu',now=()=>Date.parse('2026-11-02T10:00:00')){const storage=memory(),store=new Store({storage,now});store.load();
 const log={go:[],dialogs:[],toasts:[],exported:[]};
 const ui={screen:()=>screen,busy:()=>false,hidden:()=>false,unlockAudio(){},haptic(){},toast:t=>log.toasts.push(t),play(){},go:(next)=>{log.go.push(next);screen=next;log.open=null;},
  dialog:(kind,vm)=>{log.dialogs.push({kind,vm});log.open={kind,vm};},close:()=>{log.open=null;},dialogOpen:vm=>!!log.open&&(!vm||log.open.vm===vm),
  exportText:(raw,name)=>log.exported.push({raw,name})};
 const errors=F.create({storage,now,version:'test'});
 const ctx={store,ui,errors,session:{mode:'free',hero:'leonidas',foe:'hypatia',deckId:'leonidas',mission:0}};ctx.dialogs=new Dialogs(ctx,'test');
 ctx.board={busy:()=>false,begin:(b,s,a,o,impact,done)=>{impact();done();},rebound(){},cancel(){},events(){},effect(){}};
 ctx.match=new Match(ctx);return {ctx,store,log,storage,errors};}

// Folgt dem Chronisten: spielt die Karte des Schritts, nutzt die Fähigkeit, greift an, beendet den Zug; sonst spielt die KI für Dich.
function follow(s){const c=TU.coach(s),acts=E.legal(s,0);
 if(c.card){const h=s.players[0].hand.find(x=>x.id===c.card),a=h&&acts.find(x=>x.type==='play'&&x.uid===h.uid);if(a)return a;}
 if(c.focus==='power'){const a=acts.find(x=>x.type==='power');if(a)return a;}
 if(c.focus==='board'){const a=acts.find(x=>x.type==='attack');if(a)return a;}
 if(c.focus==='chrono')return {type:'end'};
 const keep=s.level;s.level='feldherr';const a=E.ai(s)||{type:'end'};s.level=keep;return a;}
function run(s,pick=follow){const seen=[s.lesson.step];let n=0;
 while(s.phase!=='over'&&n++<400){const p=s.active,a=p===0?pick(s):E.ai(s)||{type:'end'},card=a.type==='play'?s.players[p].hand.find(h=>h.uid===a.uid)?.id:null;
  assert.ok(E.apply(s,a).ok,JSON.stringify(a));TU.advance(s,{act:a,p,card});if(seen.at(-1)!==s.lesson.step)seen.push(s.lesson.step);}
 return seen;}

test('AP 5.8: drei Stufen; ohne Feld spielt der Feldherr genau wie bisher, Lehrling schwächer, Legende stärker',()=>{
 assert.deepEqual(E.LEVELS.map(l=>l.id),['lehrling','feldherr','legende']);assert.equal(E.level('x'),'feldherr');assert.equal(E.level('legende'),'legende');
 assert.equal(E.create({seed:5}).level,undefined,'Feldherr legt kein Feld an – Balance-Läufe und alte Partien unverändert');
 assert.equal(E.create({seed:5,level:'feldherr'}).level,undefined);assert.equal(E.create({seed:5,level:'legende'}).level,'legende');
 // Gleiche Entscheidung mit und ohne Feld „feldherr“, und die KI verbraucht keinen Zufall der Partie.
 for(let g=0;g<6;g++){const s=E.create({hero:'leonidas',foe:'hypatia',seed:300+g,first:1});E.mulligan(s,[]);const t=E.clone(s);t.level='feldherr';
  assert.deepEqual(E.ai(s),E.ai(t));const seed=s.seed;s.level='lehrling';E.ai(s);assert.equal(s.seed,seed,'Lehrling würfelt nicht mit dem Startwert');}
 const hs=D.heroes.map(h=>h.id),duel=(a,b,n)=>{let w=0;for(let g=0;g<n;g++){const h=hs[g%hs.length],f=hs[(g*7+3)%hs.length],s=E.create({hero:h,foe:f,seed:1000+g,first:g%2,deck:E.starter(h),enemyDeck:E.starter(f)});E.mulligan(s,[]);
  let k=0;while(s.phase!=='over'&&k++<400){s.level=s.active===0?a:b;E.apply(s,E.ai(s)||{type:'end'});}if(s.winner===0)w++;}return w/n;};
 const base=duel('feldherr','feldherr',44);
 assert.ok(duel('lehrling','feldherr',44)<base-.1,'der Lehrling gewinnt deutlich seltener');assert.ok(duel('legende','feldherr',44)>base,'die Legende gewinnt öfter');
});

test('AP 5.8: Stärke in Einstellungen und Heldenwahl, gilt für Duell, Kampagne und Kolosseum; alte Spielstände spielen als Feldherr',()=>{
 const {ctx,store}=setup('setup');assert.equal(store.profile.settings.level,'feldherr');
 const old=P.fresh();delete old.settings.level;assert.equal(P.parse(JSON.stringify(old)).settings.level,'feldherr');
 old.settings.level='gott';assert.equal(P.parse(JSON.stringify(old)).settings.level,'feldherr','unbekannte Stufe');
 const setupVm=new Setup(ctx);assert.deepEqual(setupVm.view.aiLevels.map(l=>l.name),['Lehrling','Feldherr','Legende']);
 setupVm.chooseLevel('legende');assert.equal(store.profile.settings.level,'legende');assert.equal(setupVm.view.aiLevel,'legende');
 setupVm.begin();assert.equal(store.profile.game.level,'legende','die Partie merkt sich die Stufe');
 // Im gespeicherten Spiel bleibt die Stufe; eine unbekannte wird zum Feldherrn.
 const saved=JSON.parse(store.exportText());saved.game.level='zauberer';assert.equal(P.parse(JSON.stringify(saved)).game.level,'feldherr');
 assert.match(read('model/draft.js'),/level:p\.settings\?\.level/,'Kolosseum nach der Einstellung');
 assert.match(read('view/setup.js'),/data-change="chooseLevel"/);assert.match(read('view/match/render.js'),/s\.level&&s\.mode!=='tutorial'\?' · '\+s\.level\.toUpperCase\(\)/,'Stufe im Match oben links');
});

test('AP 6.5: drei Lehrstunden mit Ort, Zeit, Quelle, festen Karten und Schritten des Chronisten',()=>{
 assert.deepEqual(TU.LESSONS.map(z=>z.n),[1,2,3]);
 for(const z of TU.LESSONS){assert.ok(D.heroById[z.hero]&&D.heroById[z.foe]&&z.hero!==z.foe,z.id);
  for(const k of ['title','place','year','intro','source'])assert.ok(z[k].length>=3,z.id+' '+k);
  for(const id of [...z.you.hand,...z.you.deck,...z.rival.hand,...z.rival.deck,...(z.rival.board||[])])assert.ok(D.byId[id]&&D.playable(D.byId[id],z.you.hand.includes(id)||z.you.deck.includes(id)?z.hero:z.foe),z.id+': '+id);
  assert.ok(z.steps.length>=5&&z.steps.length<=7,z.id+': fünf bis sieben Schritte');
  for(const st of z.steps){assert.ok(st.text.length>=40&&st.text.length<=200,z.id+'/'+st.id+': ein, zwei Sätze');assert.ok(['hand','chrono','board','power','enemy','foeBoard'].includes(st.focus),st.id);
   if(st.card&&st.card!=='coin')assert.ok(z.you.hand.includes(st.card),z.id+'/'+st.id+': die Karte liegt schon auf der Hand');}
  assert.equal(z.steps.at(-1).done({},{}),false,'der letzte Schritt bleibt stehen');
  const s=TU.state(z);assert.equal(s.mode,'tutorial');assert.equal(s.level,'lehrling');assert.equal(s.phase,'play');assert.equal(s.active,z.first);
  assert.deepEqual(s.players[0].hand.map(h=>h.id).filter(id=>id!=='coin'),z.you.hand);assert.equal(s.players[1].health,z.rival.health);
  assert.equal(s.players[0].hand.some(h=>h.id==='coin'),z.first===1,'die Gunst der Stunde nur, wenn der Gegner beginnt');
  assert.deepEqual(TU.state(z),TU.state(z),'immer derselbe Anfang');}
});

test('AP 6.5: wer dem Chronisten folgt, sieht jeden Schritt der Reihe nach und gewinnt; wer etwas anderes tut, bleibt nicht hängen',()=>{
 for(const z of TU.LESSONS){const s=TU.state(z),seen=run(s);
  assert.deepEqual(seen,z.steps.map((_,i)=>i),z.id+': alle Schritte');assert.equal(s.winner,0,z.id+': gewonnen');
  // Nur Züge beenden: spätestens nach einigen eigenen Zügen steht der letzte Schritt.
  const t=TU.state(z);t.players[0].health=t.players[0].maxHealth=999;let k=0;while(t.phase!=='over'&&k++<60){const p=t.active,a=p===0?{type:'end'}:E.ai(t)||{type:'end'};E.apply(t,a);TU.advance(t,{act:a,p});if(t.lesson.step===z.steps.length-1)break;}
  assert.equal(t.lesson.step,z.steps.length-1,z.id+': Schritte enden mit späteren Zügen');}
 const s=TU.state(TU.byId.schildwall);assert.ok(TU.advance(s,{note:'inspect'}),'langer Druck auf den Schildwall');assert.equal(TU.coach(s).card,'hypatia_1');
 s.active=1;assert.equal(TU.coach(s).waiting,true);assert.match(TU.coach(s).text,/ist am Zug/);assert.equal(TU.coach(s).focus,null);
});

test('AP 6.5: Hauptmenü bietet sie an, Dialog, Belohnung nur beim ersten Sieg, kein Duell in der Statistik, alte Spielstände ohne Angebot',()=>{
 const {ctx,store,log}=setup();const p=store.profile,menu=new Menu(ctx,'test');
 assert.deepEqual(p.tutorial,{done:[],skipped:false});assert.equal(menu.view.plates[3].go,'lesson');assert.match(menu.view.plates[3].sub,/Lehrstunde 1 von 3/);
 menu.go('lesson');assert.equal(log.open.kind,'lessons');const vm=log.open.vm;assert.equal(vm.rows.length,3);assert.equal(vm.rows[0].next,true);
 vm.start('schlacht');assert.equal(log.go.at(-1),'game');assert.equal(p.game.lesson.id,'schlacht');
 // Den Rest spielt der Chronisten-Bot über das ViewModel.
 const m=ctx.match,s=p.game,gold=p.gold;let n=0;while(s.phase!=='over'&&n++<400)assert.ok(m.action(s.active===0?follow(s):E.ai(s)||{type:'end'}));
 assert.equal(s.winner,0);assert.deepEqual(p.tutorial.done,['schlacht']);assert.equal(p.gold,gold+50);assert.equal(p.stats.wins,0,'keine Statistik');assert.equal(p.stats.played,0);
 assert.equal(s.reward.first,true);const bars=m.rewardBars(s);assert.ok(bars.some(b=>b.key==='lessons'&&b.to===1&&b.goal===3));
 m.showResult();const result=log.open.vm.state;assert.equal(result.lesson.n,1);assert.match(result.buttons[0].label,/Lehrstunde 2/);
 result.buttons[0].run();assert.equal(p.game.lesson.id,'schildwall','weiter zur nächsten');
 assert.equal(menu.view.plates[3].go,'resume','die laufende Lehrstunde lässt sich fortsetzen');p.game=null;assert.match(menu.view.plates[3].sub,/Lehrstunde 2 von 3/);
 // Ein zweiter Sieg in derselben Lehrstunde bringt nichts mehr; der dritte schaltet das Paket frei.
 const again=TU.state(TU.byId.schlacht);again.phase='over';again.winner=0;assert.equal(P.reward(p,again).gold,0);
 const last=TU.state(TU.byId.gunst);last.phase='over';last.winner=0;const packs=p.packs;assert.equal(P.reward(p,last).packs,1);assert.equal(p.packs,packs+1);
 // Ausblenden: das Menü zeigt wieder das Tagesduell.
 ctx.dialogs.lessons();log.open.vm.hide();assert.equal(p.tutorial.skipped,true);assert.equal(new Menu(ctx,'t').view.plates[3].go,'daily');
 // Alte Spielstände: wer schon gespielt hat, bekommt sie nicht angeboten; ein neuer Spielstand ohne Feld schon.
 const veteran=P.fresh();delete veteran.tutorial;veteran.stats.wins=4;assert.equal(P.parse(JSON.stringify(veteran)).tutorial.skipped,true);
 const rookie=P.fresh();delete rookie.tutorial;assert.equal(P.parse(JSON.stringify(rookie)).tutorial.skipped,false);
 // Gespeicherte Lehrstunde mit unbekannter Kennung fällt weg, ein Schritt außerhalb wird begrenzt.
 const saved=P.fresh();saved.game=TU.state(TU.byId.gunst);saved.game.lesson.step=99;assert.equal(P.parse(JSON.stringify(saved)).game.lesson.step,4);
 saved.game.lesson.id='nix';assert.equal(P.parse(JSON.stringify(saved)).game,null);
});

test('AP 6.5: Spielregeln und Einstellungen führen zu den Lehrstunden, Pause bietet „Neu beginnen“, Chronisten-Tafel als Platzhalter',()=>{
 const {ctx,log}=setup('game');ctx.dialogs.help();log.open.vm.lessons();assert.equal(log.open.kind,'lessons');
 ctx.dialogs.settings();log.open.vm.lessons();assert.equal(log.open.kind,'lessons');
 ctx.match.startLesson('gunst');ctx.match.pause();assert.equal(log.open.vm.state.title,'Lehrstunde 3 · Die Gunst der Stunde');
 assert.ok(log.open.vm.state.buttons.some(b=>b.label==='Neu beginnen'));
 const render=read('view/match/render.js');assert.match(render,/ASTRA: lehrstunde-chronist/);assert.match(render,/coach\(c,s,t,view\)/);
 assert.match(read('view/dialogs.js'),/ASTRA: lehrstunde-siegel/);
 assert.match(fs.readFileSync(path.join(__dirname,'../../ungenutzte_assets/ASTRA_AUFTRAG_OBERFLAECHE.md'),'utf8'),/Paket 11 – Lehrstunden/);
});

test('Phase 7: Einstellungen in vier Reitern – Textgröße, Farben, Bewegung, Grafik; unbekannte Werte fallen zurück',()=>{
 const {ctx,store,log}=setup();ctx.dialogs.settings();const vm=log.open.vm;assert.deepEqual(vm.tabs.map(t=>t[0]),['spiel','anzeige','klang','daten']);
 assert.equal(vm.state.tab,'spiel');vm.tab('anzeige');assert.equal(vm.state.tab,'anzeige');vm.tab('gibtsnicht');assert.equal(vm.state.tab,'anzeige');
 const s=store.profile.settings;assert.deepEqual([s.text,s.colors,s.motion,s.quality],['normal','normal','auto','hoch']);
 vm.setting('text','sehr');vm.setting('colors','klar');vm.setting('motion','ruhig');vm.setting('quality','sparsam');vm.setting('text','riesig');vm.setting('level','legende');
 assert.deepEqual([s.text,s.colors,s.motion,s.quality,s.level],['sehr','klar','ruhig','sparsam','legende']);
 const old=P.fresh();for(const k of ['text','colors','motion','quality'])delete old.settings[k];old.settings.colors='lila';
 assert.deepEqual(P.LOOK,{text:['normal','gross','sehr'],colors:['normal','klar'],motion:['auto','ruhig'],quality:['hoch','sparsam']});
 const q=P.parse(JSON.stringify(old)).settings;assert.deepEqual([q.text,q.colors,q.motion,q.quality],['normal','normal','auto','hoch']);
 // Die Shell setzt Klassen und Schalter, der Renderer hat eine zweite Palette, die Leinwand eine sparsame Pixeldichte.
 const app=read('app.js');assert.match(app,/root\.toggle\('colors-klar',s\.colors==='klar'\)/);assert.match(app,/AEP\.calm=s\.motion==='ruhig'/);assert.match(app,/R\.palette\(s\.colors\);R\.quality=s\.quality/);
 assert.match(read('service/platform.js'),/reducedMotion:\(\)=>window\.AEP\.calm\|\|/);
 assert.match(read('view/match/render.js'),/klar:\{ready:'#3da5ff'/);assert.match(read('view/match/board.js'),/R\.quality==='sparsam'\?1:2/);
 // lesbar.css ist aus den Stylesheets erzeugt und aktuell; sie enthält große Schrift und die ruhige Bewegung.
 execFileSync('python3',[path.join(__dirname,'../lesbar_css.py'),'--pruefen']);const css=read('view/css/lesbar.css');
 assert.match(css,/html\.text-gross \.modal p\{font-size:21\.8px/);assert.match(css,/html\.text-sehr \.glossary\{font-size:22\.1px/);assert.match(css,/html\.motion-ruhig /);
 assert.match(read('index.html'),/lesbar\.css/);
});

test('Phase 7: automatische Sicherungen – erster Stand je Tag, drei Tage, Laden fällt auf sie zurück, Zurückholen nach Rückfrage',()=>{
 let t=Date.parse('2026-11-01T09:00:00');const storage=memory(),store=new Store({storage,now:()=>t});store.load();
 store.profile.gold=111;store.save();store.profile.gold=222;store.save();assert.equal(store.snapshots().length,1);assert.equal(store.snapshots()[0].gold,111,'der erste Stand des Tages');
 for(const g of [333,444,555]){t+=864e5;store.profile.gold=g;store.save();}
 assert.deepEqual(store.snapshots().map(x=>x.gold),[555,444,333],'die drei jüngsten Tage');
 // Hauptstand und Sicherung des vorigen Speicherns kaputt: das Laden nimmt die jüngste automatische Sicherung.
 storage.setItem('chroniken.profile','{kaputt');storage.setItem('chroniken.backup','auch kaputt');assert.equal(new Store({storage}).load().gold,555);
 // Voller Speicher: die älteste fällt weg, das Speichern selbst scheitert nicht.
 const tight=memory(),setItem=tight.setItem;let calls=0;tight.setItem=(k,v)=>{if(k==='chroniken.auto'&&++calls===1)throw Error('voll');setItem(k,v);};
 const small=new Store({storage:tight,now:()=>t,onError:()=>assert.fail('kein Fehler')});small.load();small.save();
 const {ctx,store:live,log}=setup();live.save();ctx.dialogs.settings();const vm=log.open.vm;assert.equal(vm.backups.length,1);
 live.profile.gold=9;vm.restore(0);assert.equal(log.open.vm.state.title,'Sicherung zurückholen?');log.open.vm.state.buttons[1].run();assert.equal(live.profile.gold,300);assert.equal(log.go.at(-1),'menu');
});

test('Phase 7: lokales Fehlerprotokoll – nur auf dem Gerät, höchstens 40 Einträge, als Datei oder Zwischenablage, leeren',()=>{
 const storage=memory();let t=1e12;const f=F.create({storage,now:()=>t,version:'1.34.0'});
 f.add('Kaputt','app.js:12','Error: Kaputt\n at a\n at b\n at c\n at d\n at e');f.add('Kaputt','app.js:12');assert.equal(f.list().length,1);assert.equal(f.list()[0].n,2,'gleiche Meldung zählt hoch');
 t+=120000;f.add('Kaputt','app.js:12');assert.equal(f.list().length,2,'später wieder ein eigener Eintrag');
 for(let i=0;i<50;i++)f.add('Fehler '+i);assert.equal(f.list().length,F.MAX);assert.match(f.text(),/^Aeterna 1\.34\.0 – Fehlerprotokoll \(40 Einträge\)/);
 assert.ok(f.list()[0].stack.split('\n').length<=4);f.add('x'.repeat(2000));assert.ok(f.list()[0].msg.length<=400);
 storage.setItem(F.KEY,'kaputt');assert.deepEqual(f.list(),[],'kaputtes Protokoll stört nicht');
 const {ctx,errors,log}=setup();errors.add('Test');ctx.dialogs.settings();const vm=log.open.vm;assert.equal(vm.errors.length,1);
 vm.saveErrors();assert.equal(log.exported[0].name,'Aeterna-Fehlerprotokoll.txt');assert.match(log.exported[0].raw,/Test/);vm.clearErrors();assert.equal(vm.errors.length,0);
 const app=read('app.js');assert.match(app,/AEF\.create\(\{storage:localStorage,version:VERSION\}\)\.attach\(window\)/);assert.match(read('index.html'),/service\/protokoll\.js/);
 assert.match(read('service/platform.js'),/exportText\(raw,name\)/);
});
