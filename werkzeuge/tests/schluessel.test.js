// Schlüsselwort-Effekte (AP 3.6), Anfang und Ende des Matches (AP 3.8) und die Rückmeldung zu 1.19.0.
// Effekte über fx.js mit Attrappen für Klang und Leinwand (wie tests/spielgefuehl.test.js), der Ablauf über das Match-
// ViewModel mit einer aufzeichnenden Shell und einem Brett, das „present“ protokolliert; Bilder prüft der Klickpfad.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),vm=require('node:vm');
const game=path.join(__dirname,'../../quellcode/assets/game'),read=f=>fs.readFileSync(path.join(game,f),'utf8'),need=f=>require(path.join(game,f));
const T=need('view/match/anim.js'),D=need('model/data.js'),E=need('model/engine.js'),P=need('model/profile.js');
const {Store}=need('model/store.js'),{Match}=need('viewmodel/match.js'),{Collection}=need('viewmodel/collection.js'),{Dialogs}=need('viewmodel/dialogs.js');
const box={window:{}};vm.runInNewContext(read('view/match/layout.js'),box);const L=box.window.CHL;
const sounds=[],stage={window:{},CHL:L,CHT:T,CHD:D,CHE:E,CHA:{play:(name,o)=>sounds.push([name,o])},CHS:{},performance:{now:()=>0}};
vm.runInNewContext(read('view/match/render.js'),stage);stage.CHR=stage.window.CHR;vm.runInNewContext(read('view/match/motion.js'),stage);stage.CHM=stage.window.CHM;
vm.runInNewContext(read('view/match/fx.js'),stage);
const R=stage.window.CHR,M=stage.window.CHM,F=stage.window.CHF,fx=read('view/match/fx.js'),render=read('view/match/render.js');

test('AP 3.6: Schildwall, Starre, Tarnung, Gift und Vermächtnis haben eigene Bilder auf der Plakette (statt ☠ ⚗ ◐)',()=>{
 for(const k of ['shieldWall','frost','stealth','vial','urn','ring','aura'])assert.equal(typeof F[k],'function',k);
 assert.match(render,/if\(u\.taunt\)K\.shieldWall\(c\);if\(card\.death&&!u\.silenced&&!building\)K\.urn\(c\)/,'Schilde und Urne hinter der Plakette');
 assert.match(render,/if\(u\.stealth\)K\.stealth\(c\)/);assert.match(render,/if\(u\.frozen\)K\.frost\(c\)/);assert.match(render,/if\(u\.poison\)K\.vial\(c\)/);
 assert.match(render,/if\(u\.shield\)K\.ring\(c\)/,'Göttliche Gunst als Aurenkreis um die Plakette');assert.match(render,/if\(u\.shield\)window\.CHF\.aura\(c,x,y,t,ms\)/,'mit umlaufendem Schimmer in jedem Bild');
 const marks=render.slice(render.indexOf('const own=!u.silenced;const marks'),render.indexOf('if(!building&&marks.length)'));
 for(const g of ['☠','⚗','◐'])assert.ok(!marks.includes(g),g+' ersetzt');
 for(const k of ['schildwall','starre-ketten','tarnung-unterholz','giftphiole','vermaechtnis-urne','gunst-aurenkreis','eiskristall','giftblasen','urnengeist'])assert.match(fx,new RegExp('// (?:ASTRA|Astra-Bild \\(AP A\\.2\\)): '+k+' – '),k);
});

test('fx.js wird überall geladen, wo render.js läuft (Spiel und Renderer-Labor), und zwar nach motion.js',()=>{
 for(const page of ['index.html','labor/renderer.html']){const html=read(page),r=html.indexOf('view/match/render.js'),m=html.indexOf('view/match/motion.js'),f=html.indexOf('view/match/fx.js');
  assert.ok(r>=0&&f>m&&m>r,page);}
});

test('AP 3.6: Gunst zerspringt klirrend, Starre mit Ketten, Gift blubbert, die Urne entlässt ihr Vermächtnis',()=>{
 const card=D.cards.find(c=>c.type==='minion'&&c.death&&!c.building);sounds.length=0;R.fx=[];
 R.units={a:{u:{shield:true},card:D.byId.neutral_0,sp:{},x:400,y:300,p:1,seen:0},b:{u:{},card,sp:{},x:600,y:300,p:1,seen:0},c:{u:{silenced:true},card,sp:{},x:700,y:300,p:1,seen:0}};
 R.positions={a:{x:400,y:300},b:{x:600,y:300},c:{x:700,y:300}};
 R.events([{type:'shield',target:'a'},{type:'freeze',target:'a'},{type:'poison',target:'b'},{type:'death',target:'b',p:1,id:card.id}],{particles:true});
 for(const k of ['gunst','frostburst','poison','urn'])assert.ok(R.fx.some(f=>f.type===k),k);
 const names=sounds.map(([n])=>n);for(const k of ['clink','chains','poison'])assert.ok(names.includes(k),k);
 assert.ok(!names.includes('armor'),'Gunst klingt nicht mehr nach Rüstung');
 R.fx=[];R.events([{type:'death',target:'c',p:1,id:card.id}],{particles:true});assert.ok(!R.fx.some(f=>f.type==='urn'),'gebannt: keine Urne');
 for(const k of Object.keys(F.paint))assert.equal(typeof F.paint[k],'function',k);R.fx=[];
});

test('AP 3.6: Zauber-Partikel je Element und ein eigener Effekt für jede der 22 Heldenfähigkeiten',()=>{
 const spell=t=>D.cards.find(c=>c.type==='spell'&&c.effects?.length&&c.effects.every(e=>e.type===t));
 assert.equal(F.element(spell('damage')),'fire');assert.equal(F.element(spell('freeze')),'frost');assert.equal(F.element(spell('draw')),'arcane');
 assert.equal(F.element(spell('summon')),'earth');assert.equal(F.element(spell('buffAll')),'gold');assert.equal(F.element({effects:[{type:'heal',n:2}]}),'light');
 assert.equal(F.element({effects:[{type:'destroy'}]}),'shadow');assert.equal(F.element({effects:[{type:'damage'},{type:'freeze'}]}),'frost','Starre zuerst');
 const spells=D.cards.filter(c=>c.type==='spell'),used=new Set(spells.map(F.element));assert.ok(used.size>=6,'mindestens sechs Elemente: '+[...used]);
 for(const el of ['fire','frost','light','gold','earth','arcane','shadow','nature'])assert.ok(F.ELEMENTS[el],el);
 const keys=new Set();for(const h of D.heroes){const p=F.power(h.id);assert.ok(F.POWERS[h.id],h.id);assert.ok(F.ELEMENTS[p.element],h.id);
  assert.ok(['arc','straight','spiral','rain','rise','wave'].includes(p.path),h.id);keys.add(p.color);}
 assert.equal(keys.size,D.heroes.length,'jede Fähigkeit in eigener Farbe');
 // Ein Zauber und eine Fähigkeit landen: Ausbruch am Ziel, die Fähigkeit mit dem Zeichen ihres Helden.
 T.reset();R.fx=[];const s=E.create({hero:'khan',foe:'leonidas',seed:5,first:0});E.mulligan(s,[]);s.players[0].mana=10;const before=E.clone(s);
 E.apply(s,{type:'power'});M.begin(before,s,{type:'power'},null,()=>{},()=>{});
 while(!M.transition.hit){T.clock.tick((T.clock.real??0)+16);M.frame(s,T.clock.now());}
 const b=R.fx.filter(f=>f.type==='burst');assert.ok(b.length>=1&&b[0].glyph==='khan'&&b[0].element==='nature','Überfall aus dem Wald: '+JSON.stringify(b[0]));M.cancel();R.fx=[];T.reset();
});

test('AP 3.8: Anfang und Ende laufen über die Match-Uhr, ein Tippen überspringt, reduzierte Bewegung zeigt sie nicht',()=>{
 T.reset();let done=0;stage.window.AEP={reducedMotion:()=>true};assert.equal(F.present('opening',{},()=>done++),0);assert.equal(done,1,'reduziert: sofort weiter');
 stage.window.AEP={reducedMotion:()=>false};sounds.length=0;
 const ms=F.present('opening',{names:['A','B'],eras:['',''],line:'x',first:1,firstName:'B'},()=>done++);assert.ok(ms>=2500&&ms<=4000,'Dauer '+ms);
 assert.ok(F.busy()&&M.busy(),'währenddessen kein Zug');assert.ok(sounds.some(([n])=>n==='horn'),'der Chronist kündigt mit dem Horn an');
 F.skip();assert.equal(done,2);assert.ok(!F.busy());
 F.present('finale',{winner:0},()=>done++);assert.equal(F.stage.info.loser,1,'das Relief des Gegners bricht');assert.ok(!F.hidden(1),'erst nach dem Bruch verborgen');
 F.skip();assert.equal(done,3,'Tippen: gleich zum Ergebnis');assert.ok(F.stage.held&&!F.busy(),'Banner bleibt unter dem Dialog liegen');
 F.stop();assert.equal(F.stage,null);F.present('stop',null,()=>done++);assert.equal(done,4);delete stage.window.AEP;T.reset();
 for(const k of ['chronik-banner','muenze-initiative','triumph-banner','faehigkeits-effekt'])assert.match(fx,new RegExp('// (?:ASTRA|Astra-Bild \\(AP A\\.2\\)): '+k+' – '),k);
});

// Shell-Attrappe und ein Brett, das present protokolliert und auf Wunsch sofort weitermacht.
function setup(){const m=new Map(),store=new Store({storage:{getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v))}});store.load();
 const log={dialogs:[],sounds:[],present:[],closed:0,toasts:[]},pending=[];let open=null;
 const ui={screen:()=>'game',busy:()=>false,hidden:()=>false,unlockAudio(){},haptic(){},play:s=>log.sounds.push(s),toast:t=>log.toasts.push(t),go(){},
  dialog:(kind,vm)=>{log.dialogs.push(kind);open={kind,vm};},close:()=>{log.closed++;open=null;},dialogOpen:()=>!!open};
 const ctx={store,ui,session:{}};ctx.dialogs=new Dialogs(ctx,'test');
 ctx.board={busy:()=>false,begin(){},rebound(){},cancel(){},events(){},effect(){},present:(kind,info,done)=>{log.present.push([kind,info]);pending.push(done);}};
 const match=new Match(ctx);ctx.match=match;return {ctx,store,log,match,pending,open:()=>open};}

test('AP 3.8: Intro mit Münzwurf vor der Starthand; getauschte Befehle rollen zurück, neue Karten fliegen in die Hand',()=>{
 const {store,log,match,pending,open}=setup();
 const s=store.profile.game=E.create({hero:'leonidas',foe:'hypatia',deck:E.starter('leonidas'),enemyDeck:E.starter('hypatia'),seed:11,first:1});
 match.enter();assert.equal(log.present[0][0],'opening');assert.equal(open(),null,'Starthand erst nach dem Intro');
 const info=log.present[0][1];assert.deepEqual(info.names,['Leonidas I.','Hypatia']);assert.equal(info.first,1);assert.equal(info.firstName,'Hypatia');assert.match(info.line,/Leonidas I\. trifft auf Hypatia/);
 pending.shift()();assert.equal(open().kind,'mulligan');
 match.enter();assert.equal(log.present.length,1,'Intro nur einmal je Partie');
 match.toggleMull(match.mulligan.hand[0].uid);match.acceptHand();assert.ok(match.mulligan.rolling,'Befehle rollen zurück');assert.equal(s.phase,'mulligan','erst danach wird getauscht');
 match.toggleMull(match.mulligan.hand[1].uid);assert.equal(match.mulligan.count,1,'während des Rollens keine Änderung');
 assert.equal(log.present[log.present.length-1][0],'mulligan');pending.shift()();
 assert.equal(s.phase,'play');assert.ok(!match.mulligan.rolling);const deal=log.present.find(([k])=>k==='deal')[1];
 assert.equal(deal.after,s);assert.equal(deal.before.phase,'mulligan');assert.ok(s.players[0].hand.some(h=>h.id==='coin'),'der Zweite erhält die Gunst der Stunde');
 // Die neuen Karten fliegen aus dem Stapel, die Gunst der Stunde aus der Tischmitte (wo die Münze fiel).
 T.reset();M.draws=[];M.deal(deal.before,s);const coin=M.draws.find(f=>f.id==='coin');
 assert.ok(coin&&coin.from&&coin.from.x===800,'Gunst der Stunde von der Münze');assert.ok(M.draws.filter(f=>f.p===0&&!f.from).length>=1,'getauschte Karte aus dem Deck');M.draws=[];
 const mm=setup();mm.store.profile.game=E.create({hero:'leonidas',foe:'hypatia',seed:3,first:0});mm.match.opened=mm.store.profile.game;mm.match.enter();
 mm.match.acceptHand();assert.equal(mm.store.profile.game.phase,'play','ohne Tausch sofort');assert.ok(!mm.log.present.some(([k])=>k==='mulligan'));
});

test('AP 3.8: Sieg mit Relief und Banner, danach Belohnungen mit Fortschrittsbalken',()=>{
 const {store,log,match,pending,open}=setup();const p=store.profile;
 const s=p.game=E.create({hero:'leonidas',foe:'hypatia',seed:7,first:0});E.mulligan(s,[]);match.opened=s;
 match.tallied(s).played=3;match.tally.attacks=2;p.stats.played+=3;p.stats.attacks+=2;
 s.phase='over';s.winner=0;match.showResult();assert.deepEqual(log.present.at(-1),['finale',{winner:0}]);assert.equal(open(),null,'erst das Finale');
 pending.shift()();assert.equal(open().kind,'result');assert.ok(!log.sounds.includes('victory'),'die Kriegshörner ersetzen die Fanfare');
 const bars=open().vm.state.bars,by=k=>bars.find(b=>b.key===k);
 assert.equal(by('gold').to,40);assert.deepEqual([by('win3').from,by('win3').to,by('win3').goal],[0,1,3]);
 assert.deepEqual([by('play30').from,by('play30').to],[0,3]);assert.deepEqual([by('attack40').from,by('attack40').to],[0,2]);
 match.showResult();assert.equal(log.present.filter(([k])=>k==='finale').length,1,'Finale nur einmal');
 // Kampagne: Balken der vollendeten Missionen; erfüllte Aufgaben melden „Belohnung bereit“.
 const c=setup(),q=c.store.profile;q.stats.wins=2;const g=q.game=E.create({hero:'leonidas',foe:'hypatia',mode:'campaign',mission:0,seed:9,first:0});E.mulligan(g,[]);
 g.phase='over';g.winner=0;c.match.showResult();c.pending.shift()();const cb=c.open().vm.state.bars;
 assert.deepEqual(cb.find(b=>b.key==='campaign'),{key:'campaign',label:'Kampagne',from:0,to:1,goal:D.missions.length,note:'Mission erstmals vollendet'});
 assert.match(cb.find(b=>b.key==='win3').note,/Belohnung bereit/);
 // Aufgeben schließt die Rückfrage, dann Finale und Ergebnis.
 const d=setup();const h=d.store.profile.game=E.create({hero:'leonidas',foe:'hypatia',seed:4,first:0});E.mulligan(h,[]);d.match.surrender();
 assert.equal(d.log.closed,1);assert.equal(d.log.present.at(-1)[1].winner,1);
});

test('Rückmeldung 1.19.0: Uhrwerk leiser, Dienertod ruhiger, beim Blättern trägt das Blatt die Karten',()=>{
 global.window=global.window||{};require(path.join(game,'service/audio.js'));const {levels}=window.CHA;
 // Lautestes 100-ms-Fenster je Datei (dBFS, oberflaeche_klang.py / schluessel_klang.py) + Pegel; 1.19.0: −15 dBFS bei 0,35.
 const measured={chime:-14.6,gong:-10.8,clink:-19.5,chains:-23.5,poison:-17.9,toss:-19.3,horn:-12,clash:-14.4},db=g=>measured[g]+20*Math.log10(levels[g]);
 assert.ok(db('chime')<=-15+20*Math.log10(.35)-3,'Uhrwerk mindestens 3 dB leiser als in 1.19.0: '+db('chime').toFixed(1));
 assert.match(render,/ev\.type==='turn'&&ev\.p===1\?\.6/,'im Zug des Gegners noch leiser');
 assert.ok(db('horn')<db('clash')+6,'Kriegshörner nicht lauter als ein Gefecht');for(const k of ['clink','chains','poison','toss'])assert.ok(db(k)<=db('clash'),k);
 const manifest=JSON.parse(read('assets/audio/manifest.json'));for(const k of ['clink','chains','poison','toss','horn']){assert.equal(manifest[k].length,2,k);for(const f of manifest[k])assert.ok(fs.existsSync(path.join(game,'assets/audio',f+'.ogg')),f);}
 assert.match(render,/life:460/);assert.match(render,/ev\.type==='death'&&!ev\.building\?\.7/,'Todeslaut leiser');
 // Kartenbuch: Vorderseite = Hälfte der alten Doppelseite, Rückseite = Hälfte der neuen, darunter die andere alte Hälfte.
 const m=new Map(),store=new Store({storage:{getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v))}});store.load();
 const ui={screen:()=>'collection',busy:()=>false,hidden:()=>false,play(){},haptic(){},toast(){},go(){},dialog(){},close(){},dialogOpen:()=>false};
 const coll=new Collection({store,ui,session:{hero:'leonidas'}});coll.enter();const ids=v=>v.map(x=>x.card.id),first=ids(coll.view.cards);
 coll.page(1);let v=coll.view;assert.deepEqual(ids(v.leaf.front),first.slice(4));assert.deepEqual(ids(v.leaf.under),first.slice(0,4));assert.deepEqual(ids(v.leaf.back),ids(v.cards).slice(0,4));
 const second=ids(v.cards);coll.page(-1);v=coll.view;assert.deepEqual(ids(v.leaf.front),second.slice(0,4));assert.deepEqual(ids(v.leaf.back),ids(v.cards).slice(4));
 coll.filter('q','');assert.equal(coll.view.leaf,undefined,'ohne Blättern kein Blatt');
 const css=read('view/css/screens.css');assert.match(css,/\.leaf-face\.back\{transform:rotateY\(180deg\)/);assert.match(css,/backface-visibility:hidden/);
 assert.ok(!/@keyframes turn-next\{[^}]*opacity/.test(css),'keine Deckkraft-Animation am Blatt (sie hebt das 3D auf)');
});
