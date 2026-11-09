// Start (1.26.0): Entwickler-Splash PY'TALES und Aeterna-Intro. Bild, Ablauf und Messung im Browser: werkzeuge/intromessung.js;
// hier steht, was ohne Browser prüfbar ist.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const root=path.join(__dirname,'../..'),game=path.join(root,'quellcode/assets/game'),read=f=>fs.readFileSync(path.join(game,f),'utf8');
const D=require(path.join(game,'model/data.js')),P=require(path.join(game,'model/profile.js'));
const {Store}=require(path.join(game,'model/store.js')),{Dialogs}=require(path.join(game,'viewmodel/dialogs.js'));

// intro.js ohne Browser laden: nur window und document werden gebraucht, und erst in start().
function load(layer){const saved={window:global.window,document:global.document};global.window={};
 global.document={getElementById:id=>id==='intro'?layer:null};
 new Function('window','document',read('view/intro.js'))(global.window,global.document);const AEI=global.window.AEI;Object.assign(global,saved);return AEI;}

test('Dateien: Splash als animiertes WebP (Schleife A B C B), Musik, Originalvideo, Werkzeuge',()=>{
 const webp=fs.readFileSync(path.join(game,'assets/intro/pytales.webp'));
 assert.equal(webp.toString('ascii',0,4),'RIFF');assert.equal(webp.toString('ascii',8,12),'WEBP');
 assert.ok(webp.includes(Buffer.from('ANIM')),'animiert');
 assert.equal(webp.toString('latin1').split('ANMF').length-1,4,'vier Bilder');
 assert.ok(webp.length<80000,'klein: '+webp.length);
 const ogg=fs.readFileSync(path.join(game,'assets/audio/intro.ogg'));
 assert.equal(ogg.toString('ascii',0,4),'OggS');assert.ok(ogg.length<300000,'Musik klein: '+ogg.length);
 assert.ok(!Object.values(JSON.parse(read('assets/audio/manifest.json'))).flat().includes('intro'),'eigene Spur, keine Geräuschgruppe');
 assert.ok(fs.existsSync(path.join(root,'ungenutzte_assets/entwicklersplash/pytales-animation-hd.mp4')),'Original bleibt im Repo');
 for(const tool of ['entwicklersplash.py','intro_klang.py'])assert.ok(fs.existsSync(path.join(root,'werkzeuge',tool)),tool);
});

test('Rückmeldung zu 1.26.0: Splash ohne grauen Kasten und mit eigenem Klang',()=>{
 // Kasten: Das Bild ist um die Figur durchsichtig (VP8X-Kopf mit Alpha-Bit), und das Grau wird erst dunkel, wenn das Logo weg ist.
 const webp=fs.readFileSync(path.join(game,'assets/intro/pytales.webp'));
 assert.equal(webp.toString('ascii',12,16),'VP8X');assert.ok(webp[20]&0x10,'Alpha');
 const css=read('view/css/intro.css'),bgDelay=Number(css.match(/#intro\{[^}]*transition:background-color [\d.]+s ease-in ([\d.]+)s/)[1]);
 const logoOut=Number(css.match(/#intro\.dev-out \.dev\{[^}]*transition:opacity ([\d.]+)s/)[1]);
 assert.ok(bgDelay>=logoOut*.75,'Grau verdunkelt sich erst, wenn das Logo fast weg ist');
 // Klang: Das Video hat keine Tonspur – pytales.ogg kommt aus intro_klang.py und startet mit dem Einblenden.
 const ogg=fs.readFileSync(path.join(game,'assets/audio/pytales.ogg'));
 assert.equal(ogg.toString('ascii',0,4),'OggS');assert.ok(ogg.length<120000,'klein: '+ogg.length);
 assert.ok(!Object.values(JSON.parse(read('assets/audio/manifest.json'))).flat().includes('pytales'),'eigene Spur');
 assert.match(fs.readFileSync(path.join(root,'werkzeuge/intro_klang.py'),'utf8'),/SPLASH = os\.path\.join\(AUDIO, 'pytales\.ogg'\)/);
 const js=read('view/intro.js');
 assert.match(js,/decode\('pytales'\)\.then\(showDev\)/,'Logo wartet kurz auf seinen Klang');
 assert.match(js,/layer\.classList\.add\('dev-on'\);splashVoice=once\(buf\)/,'Klang und Einblenden im selben Bild');
 assert.match(js,/const ctx=o\.sound&&A\?\(A\.track\('intro'\)/,'Menümusik wartet auch ohne Intro');
});

test('Seite: Splash ist das erste Element und ohne Skript sichtbar, intro.js vor app.js',()=>{
 const html=read('index.html'),body=html.slice(html.indexOf('<body>'));
 assert.match(body,/^<body><div id="intro"><img class="dev" src="assets\/intro\/pytales\.webp"/);
 assert.match(body,/Tippen zum Überspringen/);
 assert.ok(html.indexOf('view/css/intro.css')>0&&html.indexOf('view/css/intro.css')<html.indexOf('view/css/astra.css'));
 assert.ok(html.indexOf('view/intro.js')>html.indexOf('model/data.js')&&html.indexOf('view/intro.js')<html.indexOf('app.js'));
 const css=read('view/css/intro.css');
 assert.match(css,/#intro\{[^}]*background:#2c2c2c/,'Grau des Videos');
 assert.match(css,/width:min\(44\.444vh,25vw\)/,'480 von 1080 Pixeln, wie das Video im Vollbild');
});

test('Zeitleiste: Bild (intro.js) und Musik (intro_klang.py) haben dieselben Zeitpunkte',()=>{
 const AEI=load(null),py=fs.readFileSync(path.join(root,'werkzeuge/intro_klang.py'),'utf8');
 const line=py.match(/T = dict\(([\s\S]*?)\)\n/)[1],T=Object.fromEntries([...line.matchAll(/(\w+)=([\d.]+)/g)].map(m=>[m[1],Number(m[2])]));
 for(const [k,v] of Object.entries(T))assert.equal(AEI.T[k],v,k);
 assert.ok(AEI.T.montage+6*AEI.T.beat<=AEI.T.flip+1e-9,'sechs Epochen vor dem Kippen');
 for(const [a,b] of [['seam','montage'],['flip','edge'],['edge','formed'],['formed','collapse'],['collapse','point'],['point','impact'],['impact','handoff']])assert.ok(AEI.T[a]<AEI.T[b],a+' < '+b);
 assert.match(py,/def spin\(t\):[\s\S]*?return \.6 \* u \+ 1\.15 \* u \*\* 3/,'Schwirren im Takt des Rings');
 assert.match(read('view/intro.js'),/const spin=t=>\{const u=Math\.max\(0,t-T\.edge\);return \.6\*u\+1\.15\*u\*u\*u;\}/);
});

test('Inhalt: sechs Epochen des Lehrplans mit je drei eigenen Helden, zehn Karten mit Bild',()=>{
 const AEI=load(null);
 assert.deepEqual(AEI.EPOCHS.map(e=>e[0]),D.ages.map(a=>a.id),'Reihenfolge der Epochen');
 const seen=new Set();
 for(const [age,year,heroes] of AEI.EPOCHS){assert.equal(heroes.length,3);
  for(const id of heroes){const h=D.heroById[id];assert.ok(h,id);assert.equal(h.age,age,id);assert.ok(!seen.has(id));seen.add(id);}}
 const years=AEI.EPOCHS.map(e=>e[1]);assert.deepEqual([...years].sort((a,b)=>a-b),years,'Jahre steigen');
 assert.equal(AEI.CARDS.length,10);
 for(const id of AEI.CARDS){const c=D.byId[id];assert.ok(c&&c.art&&c.art.startsWith('astra-karten-'),id);}
 assert.ok(new Set(AEI.CARDS.map(id=>D.byId[id].art)).size<=5,'höchstens fünf Kartenatlanten laden');
});

test('Ablauf: automatisierte Läufe überspringen, ohne Ebene geht es sofort weiter',async()=>{
 let removed=0;const layer={remove(){removed++;},classList:{add(){}},addEventListener(){},querySelector:()=>null,style:{}};
 const AEI=load(layer),api=AEI.start({automated:true});
 assert.equal(removed,1);await api.ready();assert.equal(api.state(),'done');await api.reveal();
 const none=load(null).start({full:true});await none.ready();assert.equal(none.active(),false);
 const app=read('app.js');
 assert.match(app,/automated:!!navigator\.webdriver&&!\/\[\?&\]intro=1\/\.test\(location\.search\)/,'Sichtprüfung ohne Intro, ?intro=1 erzwingt es');
 assert.match(app,/full:settings\.intro!==false&&!reduced\(\)/,'Einstellung und reduzierte Bewegung');
 assert.match(app,/sound:!!AEP\.bridge/,'Ton nur in der App (Autoplay im Browser gesperrt)');
 assert.match(app,/then\(\(\)=>intro\.ready\(\)\)\.then\(\(\)=>\{\$\('loading'\)\.remove\(\);/,'Ladebildschirm erst nach dem Intro weg');
 assert.match(app,/show\('menu',!reduced\(\)\);intro\.reveal\(\)[.;]/,'Hauptmenü unter dem letzten Bild');
 assert.match(app,/function back\(\)\{if\(intro\.active\(\)\)\{intro\.skip\(\);return;\}/,'Zurück überspringt');
 assert.match(app,/catch\(e=>\{intro\.abort\(\);/,'Ladefehler bleibt sichtbar');
});

test('Einstellung „Intro beim Start“: neu an, alte Spielstände an, Aus bleibt aus',()=>{
 assert.equal(P.fresh().settings.intro,true);
 const old=P.fresh();delete old.settings.intro;assert.equal(P.parse(JSON.stringify(old)).settings.intro,true);
 old.settings.intro=false;assert.equal(P.parse(JSON.stringify(old)).settings.intro,false);
 const m=new Map(),storage={getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v))},store=new Store({storage});store.load();
 const dialogs=[],ctx={store,session:{},ui:{toast(){},dialog:(kind,vm)=>dialogs.push({kind,vm}),close(){},platform:()=>null}};ctx.dialogs=new Dialogs(ctx,'test');
 ctx.dialogs.settings();const vm=dialogs.at(-1).vm;vm.setting('intro','false');assert.equal(store.profile.settings.intro,false);
 vm.setting('intro','true');assert.equal(store.profile.settings.intro,true);
 assert.match(read('view/dialogs.js'),/row\('Intro beim Start',pick\('intro'/);
});

test('Android: System-Splash ohne Zeichen im Grau von PY\'TALES, WebView ebenso',()=>{
 const android=path.join(root,'android/app/src/main'),res=f=>fs.readFileSync(path.join(android,'res',f),'utf8');
 assert.match(res('values/colors.xml'),/<color name="pytales">#FF2C2C2C<\/color>/);
 assert.match(res('values-v31/themes.xml'),/windowSplashScreenBackground">@color\/pytales/);
 assert.match(res('values-v31/themes.xml'),/windowSplashScreenAnimatedIcon">@drawable\/splash_leer/);
 assert.match(res('drawable/splash_leer.xml'),/fillColor="#00000000"/,'durchsichtig');
 assert.match(res('values/themes.xml'),/windowBackground">@color\/pytales/);
 assert.match(fs.readFileSync(path.join(android,'java/de/chroniken/helden/MainActivity.kt'),'utf8'),/setBackgroundColor\(Color\.rgb\(44, 44, 44\)\)/);
});

test('Musik: der stumme Modus des Intros legt keinen Eintrag an, danach übernimmt die Menümusik',()=>{
 const w={};new Function('window',read('service/audio.js'))(w);const A=w.CHA,played=[];
 const gain=()=>({gain:{setTargetAtTime(){},value:0}});
 A.ctx={currentTime:0,suspend(){},resume:()=>Promise.resolve()};A.stream=mode=>mode==='menu'?{el:{paused:true,currentTime:0,play:()=>{played.push(mode);return Promise.resolve();},pause(){}},gain:gain()}:null;
 A.track('intro');assert.equal(A.current,'intro');assert.deepEqual(Object.keys(A.loops),[],'kein leerer Eintrag');
 assert.doesNotThrow(()=>A.track('menu'));assert.deepEqual(played,['menu']);
 assert.doesNotThrow(()=>{A.track('intro');A.pause();A.resume();});
});
