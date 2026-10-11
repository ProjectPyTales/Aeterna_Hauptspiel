// Spielgefühl (1.18.0): Animations-Werkzeugkasten (AP 3.1), Hand (AP 3.2), Ausspielen (AP 3.3), Ziehen (AP 3.4), Angriff und
// Treffer (AP 3.5), neue Karten (AP 1.5). Bewegung und Bilder prüft der Klickpfad im Browser; hier steht, was ohne Browser
// prüfbar ist: Kurven, Zeitleisten, Federn, Uhr, Gewicht, Geometrie, ViewModel und Kennzeichnung der Platzhalter.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),vm=require('node:vm');
const game=path.join(__dirname,'../../quellcode/assets/game'),read=f=>fs.readFileSync(path.join(game,f),'utf8'),need=f=>require(path.join(game,f));
const T=need('view/match/anim.js'),D=need('model/data.js'),E=need('model/engine.js');
const box={window:{}};vm.runInNewContext(read('view/match/layout.js'),box);const L=box.window.CHL;
// motion.js und render.js laufen mit Attrappen für Klang und Leinwand.
const sounds=[],stage={window:{},CHL:L,CHT:T,CHD:D,CHE:E,CHA:{play:(name,o)=>sounds.push(name)},CHS:{},performance:{now:()=>0}};
vm.runInNewContext(read('view/match/render.js'),stage);stage.CHR=stage.window.CHR;vm.runInNewContext(read('view/match/motion.js'),stage);stage.CHM=stage.window.CHM;vm.runInNewContext(read('view/match/fx.js'),stage);
const R=stage.window.CHR,M=stage.window.CHM,render=read('view/match/render.js');
// Die Uhr in Bildern zu 16 ms vorstellen (höchstens 100 ms je Bild, Treffer-Stopp hält sie an), M.frame je Bild.
const advance=(s,until)=>{while(T.clock.now()<until){T.clock.tick((T.clock.real??0)+16);M.frame(s,T.clock.now());}};

test('AP 3.1: Kurven beginnen bei 0 und enden bei 1; Ausholen und Nachschwingen gehen darüber hinaus',()=>{
 for(const [name,f] of Object.entries(T.ease)){assert.ok(Math.abs(f(0))<1e-9,name+'(0)');assert.ok(Math.abs(f(1)-1)<1e-9,name+'(1)');}
 assert.ok(Math.max(...[...Array(50)].map((_,i)=>T.ease.outBack(i/50)))>1.05,'outBack schwingt nach');
 assert.ok(T.ease.inBack(.2)<0,'inBack holt aus');
 assert.equal(T.tween(-50,10,20,100),10);assert.equal(T.tween(500,10,20,100),20);assert.equal(T.tween(50,0,100,100,'linear'),50);
});

test('AP 3.1: Zeitleiste kennt Phasen, Anfang und Ende',()=>{
 const tl=T.timeline([{name:'a',d:100,ease:'linear'},{name:'b',d:50},{name:'c',d:200,ease:'outCubic'}]);
 assert.equal(tl.duration,350);assert.equal(tl.start('b'),100);assert.equal(tl.end('b'),150);
 assert.deepEqual([tl.at(50).name,tl.at(50).q],['a',.5]);assert.equal(tl.at(120).name,'b');
 const end=tl.at(999);assert.equal(end.name,'c');assert.equal(end.q,1);assert.ok(end.done);
});

test('AP 3.1: Federn kommen an, schwingen leicht nach und bleiben bei langen Bildern stabil',()=>{
 const s=new T.Spring(0,{stiffness:260,damping:24}).to(100);let peak=0;
 for(let i=0;i<120;i++){s.step(1000/120);peak=Math.max(peak,s.value);}
 assert.ok(Math.abs(s.value-100)<.5,'nach 1 s am Ziel');assert.ok(peak>100&&peak<110,'kleines Überschwingen');
 const big=new T.Spring(0).to(1);for(let i=0;i<20;i++)big.step(500);assert.ok(Number.isFinite(big.value)&&Math.abs(big.value-1)<.01,'lange Bilder (bis 100 ms je Schritt)');
});

test('AP 3.1: Die Uhr läuft im Spieltempo, steht beim Treffer-Stopp und springt nach einer Pause nicht',()=>{
 T.reset();const c=T.clock;c.tick(1000);c.tick(1016);assert.equal(c.now(),16);
 c.speed=2;c.tick(1032);assert.equal(c.now(),48,'Schnell: doppelt so schnell');
 c.stop(60);assert.ok(c.stopped());c.tick(1048);c.tick(1060);assert.equal(c.now(),48,'Treffer-Stopp: 60 ms / Tempo 2 = 30 ms Stillstand');
 c.tick(1080);assert.equal(c.now(),48+2*(1080-1062),'danach läuft sie weiter');
 const before=c.now();c.tick(9000);assert.equal(c.now(),before+200,'höchstens 100 ms je Bild');
 T.reset();c.reduced=true;c.tick(0);c.stop(80);assert.ok(!c.stopped(),'reduzierte Bewegung: kein Treffer-Stopp');
 T.shake.add(.8);assert.equal(T.shake.trauma,0,'reduzierte Bewegung: kein Wackeln');
 T.reset();c.tick(0);T.shake.add(.8,.2);c.tick(10);const o=T.shake.offset();assert.ok(o.zoom>1&&T.shake.trauma<.8);
 for(let i=1;i<=100;i++){c.tick(10+i*16);T.shake.offset();}assert.equal(T.shake.trauma,0,'klingt ab');T.reset();
 // Die Bildschleife setzt Tempo und reduzierte Bewegung und zeichnet auf der Uhr (AP 3.1: Tempo wirkt auf alle Animationen).
 const board=read('view/match/board.js');
 assert.match(board,/T\.clock\.speed=vm\.profile\.settings\.speed\|\|1;T\.clock\.reduced=[^;]*reducedMotion[^;]*;const t=T\.clock\.tick\(now\)/);
 assert.match(board,/M\.frame\(s,t\);R\.draw\(ctx,shown,vm\.view,t,/);
 assert.doesNotMatch(read('view/match/motion.js'),/performance\.now/,'Bewegung nur auf der Uhr');
 assert.doesNotMatch(render,/performance\.now/);
});

test('AP 3.3/3.5: Gewicht, Zeitleisten und Treffer-Stopp je Aktion',()=>{
 assert.equal(M.weight(D.byId.leonidas_9),1,'schwere Legendäre');assert.ok(M.weight(D.byId.neutral_0)<.3,'leichte Karte');
 const play=M.lines.PLAY(false),heavy=M.lines.PLAY(true);
 assert.equal(play.phases.map(p=>p.name).join(),'lift,hover,slam,settle');assert.ok(heavy.start('settle')>play.start('settle'),'schwere Karten schweben länger');
 assert.ok(M.lines.ATTACK.start('contact')<=260,'Aufprall nach Ausholen und Ansturm');
 // Ausspielen eines Dieners über die Attrappe: Aufprall nach lift+hover+slam, mit Staub und bei Gewicht Rissen und Treffer-Stopp.
 T.reset();T.clock.tick(0);const s=E.create({hero:'leonidas',foe:'hypatia',seed:5,first:0});E.mulligan(s,[]);s.players[1].mana=0;
 const a=s.players[0];a.mana=a.maxMana=10;a.hand=[{id:'leonidas_9',uid:'gorgo'}];const before=E.clone(s);E.apply(s,{type:'play',uid:'gorgo',position:0});
 let hit=0;M.begin(before,s,{type:'play',uid:'gorgo',position:0},null,()=>hit++,()=>{});
 assert.ok(sounds.includes('parchment'),'Karte hebt sich mit Pergament-Rascheln');
 const t0=M.transition.hitAt;advance(s,t0-16);assert.equal(hit,0);
 advance(s,t0+1);assert.equal(hit,1);assert.ok(T.clock.stopped(),'Treffer-Stopp');
 assert.ok(sounds.includes('thud')&&sounds.includes('slam'),'Wumms, bei schweren Karten mit Einrasten');
 assert.ok(R.fx.some(f=>f.type==='dust')&&R.fx.some(f=>f.type==='cracks'),'Staub und Risse');
 const u=s.players[0].board.find(x=>x.id==='leonidas_9'),pose=M.pose(u.uid,{x:800,y:448},T.clock.now()+20);assert.ok(pose.sx>1&&pose.sy<1,'Plakette landet gestaucht');
 M.cancel();R.fx=[];T.reset();
});

test('AP 3.4: Gezogene Karten fliegen verdeckt, volle Hand verbrennt, Erschöpfung entzieht Leben',()=>{
 T.reset();T.clock.tick(0);const s=E.create({hero:'leonidas',foe:'hypatia',seed:9,first:1});E.mulligan(s,[]);
 const a=s.players[0];a.hand=a.hand.slice(0,9);s.players[1].mana=0;
 const before=E.clone(s);E.apply(s,{type:'end'});assert.equal(s.active,0);
 M.begin(before,s,{type:'end'},null,()=>{},()=>{});advance(s,M.transition.hitAt+1);
 assert.equal(M.draws.filter(f=>f.p===0).length,1,'eine Karte fliegt in die Hand');assert.ok(M.hiddenHand(M.draws[0].uid),'bis sie ankommt, liegt sie nicht in der Hand');
 assert.match(read('view/match/motion.js'),/back:turn<\.5,sx:Math\.abs\(Math\.cos\(turn\*Math\.PI\)\)/,'verdeckt, dreht sich in der Luft um');
 assert.match(render,/R\.cardBack=\(c,x,y,w,h\)=>c\.drawImage\(CHS\.backCanvas\(R\.look\.back/,'ausgerüsteter Kartenrücken');
 M.cancel();T.reset();T.clock.tick(0);
 // Volle Hand und leeres Deck.
 const t=E.create({hero:'leonidas',foe:'hypatia',seed:9,first:1});E.mulligan(t,[]);const b=t.players[0];while(b.hand.length<10)b.hand.push({id:'neutral_0',uid:'x'+b.hand.length});
 let s2=E.clone(t);E.apply(t,{type:'end'});M.begin(s2,t,{type:'end'},null,()=>{},()=>{});advance(t,T.clock.now()+M.transition.hitAt+1);
 assert.equal(M.burns.length,1,'die zehnte Karte verbrennt');M.cancel();
 const f=E.create({hero:'leonidas',foe:'hypatia',seed:9,first:1});E.mulligan(f,[]);f.players[0].deck=[];
 s2=E.clone(f);E.apply(f,{type:'end'});M.begin(s2,f,{type:'end'},null,()=>{},()=>{});advance(f,T.clock.now()+M.transition.hitAt+1);
 assert.equal(JSON.stringify(M.drains.map(d=>[d.p,d.n])),'[[0,1]]','Stundenglas entzieht 1 Leben');M.cancel();T.reset();
});

test('AP 3.5: Treffersound je Einheit, Schadenszahl mit Tinte, Pumpen und Splitter',()=>{
 const name=re=>D.cards.find(c=>c.type==='minion'&&re.test(c.name));
 assert.equal(R.hitSound(name(/Reiter/)),'hooves');assert.equal(R.hitSound(name(/Hoplit/)),'lance');assert.equal(R.hitSound(D.byId.neutral_0),'clash');assert.equal(R.hitSound(null),'clash');
 R.fx=[];R.units={u1:{u:{},card:D.byId.neutral_0,sp:{},x:500,y:300,p:1,seen:0}};R.positions={u1:{x:500,y:300}};
 R.events([{type:'attack',source:'h0',target:'u1'},{type:'damage',target:'u1',n:3},{type:'death',target:'u1',p:1,id:'neutral_0'}],{particles:true});
 for(const k of ['damage','pump','shatter','impact'])assert.ok(R.fx.some(f=>f.type===k),k);
 assert.ok(sounds.includes('clash')&&sounds.includes('destroy'));
 // Seit 1.20.0 (Rückmeldung zu 1.19.0): kein Staub und kein Schleifen mehr beim Tod eines Dieners, nur ein Bauwerk stürzt hörbar ein.
 assert.ok(!R.fx.some(f=>f.type==='dust'||f.type==='sound'),'Diener: ohne Staub und Fall-Laut');
 R.fx=[];R.events([{type:'death',target:'u1',p:1,id:'neutral_0',building:true}],{particles:false});assert.equal(R.fx.map(f=>f.type).join(),'sound','ohne Partikel nur der Fall-Laut des Bauwerks');R.fx=[];
 for(const k of ['marschroute','tintenspritzer','staubwolke','steinrisse'])assert.match(render,new RegExp('// (?:ASTRA|Astra-Bild \\(AP A\\.2\\)): '+k+' – '),k);
 assert.match(render,/function route\([^]*?motion\(\)\?\(t\*\.09\)%step:0/,'die Winkel marschieren (nicht bei reduzierter Bewegung)');
 assert.match(render,/if\(d\.target&&d\.target!=='h0'\)pulse\(c,d\.target,t\)/,'Ziel unter der Route pulsiert');
 assert.match(render,/if\(ready&&!selected\)round\(c,-55,-72,110,144,11,null,'#8dff6a',2\.5\)/,'grüne Umrandung, wer angreifen kann');
});

test('AP 3.2: Gedrückte Karte bleibt im Bild und frei von der Heldenmünze; Nachbarn weichen aus',()=>{
 const w=L.handWidth*L.pressScale,h=w*1.41;
 for(let n=1;n<=10;n++)for(let i=0;i<n;i++){const p=L.pressedHandPose(L.handPose(i,n));
  assert.ok(p.x-w/2>=10&&p.x+w/2<=1590&&p.y-h/2>=0&&p.y+h/2<=800,'im Bild '+n+'/'+i);
  assert.ok(p.x+w/2<=L.center-L.coin*L.heroScale(0)+10||p.x-w/2>=L.center+L.coin*L.heroScale(0)-10,'frei von der Münze '+n+'/'+i);assert.equal(p.angle,0);}
 assert.match(render,/const HAND_SPRING=\{stiffness:260,damping:24\},SPREAD=\[0,48,24,10\]/);
 assert.match(render,/R\.fastCard\(c,card,-w\/2,-hh\/2,w,hh,\{glow:info\.can\?\(info\.boost\?'boost':true\):false/,'grüne oder goldgelbe Aura');
 assert.match(render,/function dragged\([^]*?new T\.Spring\(0,\{stiffness:150,damping:11\}\)/,'gezogene Karte neigt sich auf einer Feder');
});

test('AP 3.2: ViewModel – Drücken hebt die Karte an, Aura bei erfüllter Bedingung (Formation, Kombo)',()=>{
 const {Match}=need('viewmodel/match.js'),log=[],ui={play:s=>log.push(s),haptic(){},screen:()=>'game',dialogOpen:()=>false,hidden:()=>false,toast(){},dialog(){},close(){}};
 const s=E.create({hero:'mandukhai',foe:'hypatia',seed:3,first:0});E.mulligan(s,[]);const a=s.players[0];a.mana=a.maxMana=10;
 const store={profile:{game:s,settings:{},stats:{}},commit(){},subscribe(){}},m=new Match({store,ui,board:{busy:()=>false}});
 m.press({kind:'hand',id:'k'});assert.equal(m.view.press,'k');assert.ok(log.includes('parchment'));m.release();assert.equal(m.view.press,null);
 m.press({kind:'hand',id:'k'});m.press({kind:'target',id:'h0'});assert.equal(m.view.press,null,'anderes Ziel löst');
 m.press({kind:'hand',id:'k'});m.dialogChanged(true);assert.equal(m.view.press,null,'ein Dialog löst');
 a.hand=[{id:'mandukhai_3',uid:'keil'},{id:'neutral_0',uid:'wache'}];a.board=[];
 assert.deepEqual(m.hand(s).keil,{cost:D.byId.mandukhai_3.cost,can:true,boost:false});
 for(let i=0;i<3;i++)E.summon(s,0,'neutral_0');assert.equal(m.hand(s).keil.boost,true,'Krieger im Keil: drei Diener und er selbst = Formation');
 assert.equal(m.hand(s).wache.boost,false);a.mana=0;assert.equal(m.hand(s).keil.can,false);assert.equal(m.hand(s).keil.boost,false,'unspielbar: keine Aura');
});

test('AP 1.5: Kartenrahmen als Tempeltor mit Werte-Symbolen, Archiv-Siegel und Lorbeer – gekennzeichnete Platzhalter',()=>{
 for(const k of ['kartenrahmen','werte-kristall','werte-klingen','werte-schild','werte-turm','archivsiegel','lorbeerkranz','goldglanz'])assert.match(render,new RegExp('// (?:ASTRA|Astra-Bild \\(AP A\\.2\\)): '+k+' – '),k);
 assert.match(render,/etherCrystal\(c,25,34,22,card\.cost\);[^]*?blades\(c,25,257,card\.attack\);lifeShield\(c,175,257,card\.health\);/,'Kosten oben links, Angriff unten links, Leben unten rechts');
 assert.match(render,/archiveSeal\(c,100,258,11\.5,card\.rarity\);\n if\(legend\)laurel\(c\);/,'Siegel je Seltenheit, Lorbeer für Legendäre');
 assert.doesNotMatch(render,/legendary-frame/,'der alte Adlerrahmen entfällt');
 assert.match(render,/key=card\.id\+':'\+cw\+\(gold\?':gold':''\)/,'Goldene Karten haben ein eigenes Bild');
 assert.match(render,/if\(gold&&motion\(\)\)glint\(c,w,hh,t,i\)/,'Glanz läuft nur mit Bewegung');
});

test('Rückmeldung zu 1.17.0: Die Umschrift der Heldenmünze liegt frei und wird zuletzt geprägt',()=>{
 const coin=render.slice(render.indexOf('function coinArt('),render.indexOf('// The legend runs clockwise'));
 assert.ok(coin.indexOf('legend(c,hero.name.toUpperCase(),r-13.5)')>coin.indexOf('ellipse(c,0,0,51,51,null'),'nach dem Porträt gezeichnet');
 // Band zwischen Porträt (53 + halber Rand) und innerer Scheibe (r−7): die Buchstaben (≤ 10,5 px, halbe Höhe ≈ 4) passen hinein.
 const r=L.coin,band=[53+1.25,r-7],at=r-13.5;assert.ok(at-4.2>band[0]&&at+4.2<band[1],'Umschrift im freien Band');
 assert.match(render,/function legend\(c,text,r\)\{const chars=\[\.\.\.text\],arc=Math\.PI\*1\.2\*r;let size=10\.5;/,'lange Namen werden kleiner statt abgeschnitten');
});

test('Klänge: Pergament, Wumms, Hufe und Lanze sind eingebunden und ausgepegelt',()=>{
 const manifest=require(path.join(game,'assets/audio/manifest.json'));
 for(const k of ['parchment','thud','hooves','lance']){assert.equal(manifest[k].length,2,k);for(const f of manifest[k])assert.ok(fs.existsSync(path.join(game,'assets/audio',f+'.ogg')),f);}
 global.window=global.window||{};require(path.join(game,'service/audio.js'));const {levels}=window.CHA;
 // Lautestes 100-ms-Fenster je Datei (dBFS, werkzeuge/spielgefuehl_klang.py) + Pegel: Hufe und Lanze wie Schwerter, Pergament wie das Aufnehmen.
 const measured={parchment:-23.2,thud:-12.9,hooves:-17.7,lance:-16,clash:-14.4,pickup:-25.2,slam:-13},db=g=>measured[g]+20*Math.log10(levels[g]);
 assert.ok(Math.abs(db('hooves')-db('clash'))<1&&Math.abs(db('lance')-db('clash'))<1);
 assert.ok(Math.abs(db('parchment')-db('pickup'))<1.5);assert.ok(Math.abs(db('thud')-db('slam'))<1.5,'Wumms so kräftig wie das Einrasten');
});
