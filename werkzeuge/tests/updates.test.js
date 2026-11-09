// Automatische Updates (seit 1.36.0, nach dem Vorbild von ADEU-Harness): die Hülle liest version.json aus dem Release
// „Test-APK“, lädt die APK, prüft Größe und SHA-256 und öffnet den Installer von Android; das Spiel fragt im ruhigen
// Hauptmenü, „Später“ bis zum nächsten Start, „Was ist neu“ einmal nach einem Update, Abschnitt in Einstellungen → Daten.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),os=require('node:os'),crypto=require('node:crypto');
const root=path.join(__dirname,'../..'),game=path.join(root,'quellcode/assets/game'),android=path.join(root,'android/app/src/main');
const need=f=>require(path.join(game,f)),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const {Store}=need('model/store.js'),P=need('model/profile.js'),NEU=need('model/neu.js');
const {Updates,UpdateDialog,UPDATE_KEY,newerVersion}=need('viewmodel/update.js'),{Dialogs,Settings}=need('viewmodel/dialogs.js');
const tool=require('../update_info.js');
const kotlin=f=>fs.readFileSync(path.join(android,'java/de/chroniken/helden',f),'utf8');
const VERSION=read('quellcode/assets/game/app.js').match(/VERSION='([\d.]+)'/)[1];

function memory(init={}){const m=new Map(Object.entries(init));return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),map:m};}
// Hülle als Attrappe: zeichnet Aufrufe auf; der Test spielt ihre Antworten über receive() ein.
function shell(supported=true){const calls=[];return {calls,supported,state:()=>null,check:m=>calls.push(['check',m]),download:()=>calls.push(['download']),
 install:()=>calls.push(['install']),cancel:()=>calls.push(['cancel']),page:()=>calls.push(['page'])};}
function setup({screen='menu',seen,played=0,supported=true,automated=false,updates}={}){
 const storage=memory(seen?{[UPDATE_KEY]:seen}:{}),store=new Store({storage:memory()});store.load();
 store.profile.stats.played=played;if(updates!==undefined)store.profile.settings.updates=updates;
 const log={dialogs:[],toasts:[],closed:0,open:null};let idle=true;
 const ui={screen:()=>screen,busy:()=>false,idle:()=>idle&&screen==='menu'&&!log.open,toast:t=>log.toasts.push(t),play(){},haptic(){},
  dialog:(kind,vm)=>{log.open?.vm.closed?.();log.dialogs.push({kind,vm});log.open={kind,vm};},
  close:()=>{log.closed++;const o=log.open;log.open=null;o?.vm.closed?.();},dialogOpen:vm=>!!log.open&&(!vm||log.open.vm===vm)};
 const ctx={store,ui,session:{}};const platform=shell(supported);
 ctx.updates=new Updates(ctx,{platform,storage,version:VERSION,automated});ctx.dialogs=new Dialogs(ctx,VERSION);
 return {ctx,ui,log,platform,storage,store,u:ctx.updates,set screen(v){screen=v;},set idle(v){idle=v;}};}
// Die angebotene Version liegt immer eine Unterversion über der installierten, die vorige eine darunter.
const NEXT=VERSION.replace(/^(\d+)\.(\d+)\..*$/,(m,a,b)=>a+'.'+(+b+1)+'.0'),PREV=VERSION.replace(/^(\d+)\.(\d+)\..*$/,(m,a,b)=>a+'.'+(+b-1)+'.0');
const offer={state:'available',installed:VERSION,version:NEXT,notes:'Neue Karten.',size:13*1048576,page:'https://example.invalid'};

test('Hülle: Internet nur für Updates, Installer-Recht, Provider nicht exportiert, WebView bleibt offline',()=>{
 const manifest=fs.readFileSync(path.join(android,'AndroidManifest.xml'),'utf8');
 assert.match(manifest,/android\.permission\.INTERNET/);
 assert.match(manifest,/android\.permission\.REQUEST_INSTALL_PACKAGES/);
 const provider=manifest.match(/<provider[\s\S]*?\/>/)?.[0]||'';
 assert.match(provider,/android:name="\.UpdateFiles"/);
 assert.match(provider,/android:authorities="\$\{applicationId\}\.updates"/);
 assert.match(provider,/android:exported="false"/);
 assert.match(provider,/android:grantUriPermissions="true"/);
 const files=kotlin('UpdateFiles.kt'),up=kotlin('Updater.kt'),client=kotlin('AssetClient.kt');
 assert.match(files,/SUFFIX = "\.updates"/,'Authority wie im Manifest');
 assert.match(files,/mode != "r"/,'nur lesen');
 assert.match(up,/REPOSITORY = "ProjectPyTales\/Aeterna_Hauptspiel"/);
 assert.match(up,/SOURCE = "https:\/\/github\.com\/\$REPOSITORY\/releases\/download\/\$TAG\/version\.json"/);
 assert.match(up,/TAG = "test-apk"/);
 assert.match(up,/sha256\(tmp\) != i\.sha256/,'Prüfsumme vor dem Installieren');
 assert.match(up,/canRequestPackageInstalls\(\)/,'führt einmalig zur Freigabe');
 assert.match(up,/i\.code <= installedCode/,'neuer nur mit höherem versionCode');
 assert.match(up,/startsWith\("https:\/\/"\)/,'nur https');
 assert.match(client,/url\.host != MainActivity\.HOST\) return empty\(403/,'die WebView lädt nur chroniken.local');
 // Der Dateiname der APK muss in beiden Prüfungen gleich sein (Hülle und Werkzeug).
 const kt=new RegExp('^'+files.match(/NAME = Regex\("(.+)"\)/)[1].replace(/\\\\/g,'\\')+'$');
 for(const name of ['Aeterna-1.36.0-Test.apk','Aeterna-2.10.3-Test.apk'])assert.ok(kt.test(name)&&tool.FILE.test(name),name);
 for(const name of ['../Aeterna-1.36.0-Test.apk','Aeterna-1.36.0-Test.apk.part','x.apk'])assert.ok(!kt.test(name)&&!tool.FILE.test(name),name);
 const bridge=kotlin('Bridge.kt'),exposed=new Set([...bridge.matchAll(/@JavascriptInterface\s+fun (\w+)/g)].map(m=>m[1]));
 for(const name of ['updateState','updateCheck','updateDownload','updateInstall','updateCancel','updatePage'])assert.ok(exposed.has(name),name);
 assert.ok(kotlin('MainActivity.kt').includes('updater = Updater(this)'));
});

test('CI: version.json kommt mit der APK in einem Schritt ins Release „Test-APK“',()=>{
 const ci=read('.github/workflows/apk.yml');
 assert.match(ci,/node werkzeuge\/update_info\.js "Aeterna-\$\{\{ steps\.version\.outputs\.name \}\}-Test\.apk" version\.json/);
 assert.match(ci,/gh release create test-apk "\$apk" version\.json/);
 assert.ok(ci.indexOf('update_info.js')<ci.indexOf('gh release create'),'erst schreiben, dann veröffentlichen');
});

test('Werkzeug: version.json mit Version, versionCode, Was ist neu, Adresse, Größe und SHA-256',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'aeterna-update-')),apk=path.join(dir,'Aeterna-'+VERSION+'-Test.apk'),bytes=Buffer.from('APK '+VERSION);
 fs.writeFileSync(apk,bytes);
 const g=tool.gradle(),j=tool.info(apk,{repository:'ProjectPyTales/Aeterna_Hauptspiel',today:new Date('2026-11-09T12:00:00Z')});
 assert.equal(j.version,VERSION);assert.equal(j.versionCode,g.code);assert.equal(j.published,'2026-11-09');
 assert.equal(j.notes,NEU.notes);
 assert.deepEqual(j.android,{file:path.basename(apk),url:'https://github.com/ProjectPyTales/Aeterna_Hauptspiel/releases/download/test-apk/'+path.basename(apk),
  sha256:crypto.createHash('sha256').update(bytes).digest('hex'),size:bytes.length});
 assert.equal(tool.info(apk,{neu:{version:'0.0.1',notes:'alt'}}).notes,'Fehlerbehebungen und Verbesserungen.','alte Sätze nicht als neu ausgeben');
 const wrong=path.join(dir,'app-release.apk');fs.writeFileSync(wrong,bytes);
 assert.throws(()=>tool.info(wrong),/Dateiname/);
 const other=path.join(dir,'Aeterna-0.0.1-Test.apk');fs.writeFileSync(other,bytes);
 assert.throws(()=>tool.info(other),/gehört nicht zu Version/);
 fs.rmSync(dir,{recursive:true,force:true});
});

test('Was ist neu: gehört zur Version, kurz und ohne Markup',()=>{
 assert.equal(NEU.version,VERSION,'model/neu.js bei jeder neuen Version mitändern');
 assert.ok(NEU.notes.length>=20&&NEU.notes.length<=400,NEU.notes.length);
 assert.doesNotMatch(NEU.notes,/[<>*`]/);
 const index=read('quellcode/assets/game/index.html');
 for(const f of ['model/neu.js','viewmodel/update.js'])assert.ok(index.includes('<script src="'+f+'"></script>'),f);
 assert.ok(index.indexOf('viewmodel/update.js')<index.indexOf('app.js'));
});

test('Spielstand: „Beim Start suchen“ ist neu eingeschaltet und bleibt beim Laden erhalten',()=>{
 assert.equal(P.fresh().settings.updates,true);
 const p=P.fresh();delete p.settings.updates;assert.equal(P.parse(JSON.stringify(p)).settings.updates,true,'alte Spielstände: an');
 p.settings.updates=false;assert.equal(P.parse(JSON.stringify(p)).settings.updates,false);
 assert.ok(newerVersion('1.36.0','1.35.9')&&newerVersion('1.40.0','1.36.0')&&!newerVersion('1.36.0','1.36.0')&&!newerVersion('1.9.0','1.36.0'));
});

test('Start: sucht nach dem Intro, wenn eingeschaltet – im Browser und mit „Aus“ nicht',()=>{
 const a=setup();a.u.start();assert.deepEqual(a.platform.calls,[['check',false]]);a.u.start();assert.equal(a.platform.calls.length,1,'nur einmal');
 const b=setup({updates:false});b.u.start();assert.deepEqual(b.platform.calls,[]);
 const c=setup({supported:false});c.u.start();assert.deepEqual(c.platform.calls,[]);assert.equal(c.u.supported,false);
 // Nach sechs Stunden im Hintergrund noch einmal.
 let now=0;a.ctx.now=()=>now;a.u.check(false);now=3600e3;a.u.resume();assert.equal(a.platform.calls.length,2);now=7*3600e3;a.u.resume();assert.equal(a.platform.calls.length,3);
});

test('Neue Version: fragt im ruhigen Hauptmenü, nie im Match; „Später“ bis zum nächsten Start, von Hand wieder',()=>{
 const t=setup();t.u.start();
 t.screen='game';t.u.receive(JSON.stringify(offer));assert.equal(t.log.dialogs.length,0,'nicht im Match');
 t.screen='menu';t.u.idle();assert.equal(t.log.open?.kind,'update');
 const d=t.log.open.vm;assert.ok(d instanceof UpdateDialog);assert.equal(d.size,'13 MB');assert.equal(d.s.notes,'Neue Karten.');
 d.later();assert.equal(t.log.open,null);assert.equal(t.u.postponed,NEXT);
 t.u.receive(offer);t.u.idle();assert.equal(t.log.dialogs.length,1,'nach „Später“ nicht wieder');
 t.u.check(true);assert.equal(t.u.postponed,null);assert.deepEqual(t.platform.calls.at(-1),['check',true]);
 t.u.receive(offer);assert.equal(t.log.dialogs.length,2,'von Hand gesucht: fragt wieder');
 // Ein anderes Fenster ist offen: erst danach.
 const o=setup();o.u.start();o.ui.dialog('settings',{closed(){}});o.u.receive(offer);assert.equal(o.log.open.kind,'settings');
 o.ui.close();o.u.idle();assert.equal(o.log.open?.kind,'update');
});

test('Laden: Fortschritt im Fenster, fertig → Installer; im Hintergrund fragt das Spiel danach',()=>{
 const t=setup();t.u.start();t.u.receive(offer);const d=t.log.open.vm;let renders=0;d.subscribe(()=>renders++);
 d.start();assert.deepEqual(t.platform.calls.at(-1),['download']);assert.ok(t.u.wanted);
 t.u.receive({...offer,state:'downloading',progress:.42,step:'Wird geladen …'});assert.ok(renders>=1);assert.equal(d.percent,42);
 t.u.receive({...offer,state:'ready'});assert.deepEqual(t.platform.calls.at(-1),['install'],'gleich der Installer');
 // Einmalige Freigabe: die Hülle meldet, was zu tun ist; „Installieren“ noch einmal.
 t.u.receive({...offer,state:'ready',note:'Einmalig nötig: …'});assert.equal(t.log.open.vm,d);d.install();assert.deepEqual(t.platform.calls.at(-1),['install']);
 // Hintergrund: Fenster zu, fertig → im Hauptmenü fragen statt sofort installieren.
 const b=setup();b.u.start();b.u.receive(offer);b.log.open.vm.start();b.u.receive({...offer,state:'downloading',progress:.1});
 b.log.open.vm.close();assert.equal(b.log.open,null,'Zurück-Taste: in den Hintergrund');assert.ok(b.u.background);assert.match(b.log.toasts.at(-1),/Hintergrund/);
 b.u.receive({...offer,state:'downloading',progress:.6});assert.equal(b.log.open,null,'kein Fenster während des Ladens');
 b.screen='game';b.u.receive({...offer,state:'ready'});assert.equal(b.log.open,null);assert.notDeepEqual(b.platform.calls.at(-1),['install']);
 b.screen='menu';b.u.idle();assert.equal(b.log.open?.kind,'update');assert.equal(b.log.open.vm.s.state,'ready');
 // Abbrechen und Fehler.
 const c=setup();c.u.start();c.u.receive(offer);c.log.open.vm.start();c.u.receive({...offer,state:'downloading'});c.log.open.vm.cancel();
 assert.deepEqual(c.platform.calls.at(-1),['cancel']);assert.equal(c.u.wanted,false);
 c.u.receive({...offer,state:'available'});c.u.idle();assert.equal(c.log.open?.kind,'update','nach Abbrechen wieder anbieten');
 c.log.open.vm.start();c.log.open.vm.background();c.u.receive({...offer,state:'failed',message:'Prüfsumme stimmt nicht.'});
 assert.equal(c.log.open?.kind,'update','Fehler nach gewolltem Laden zeigen');assert.equal(c.log.open.vm.s.message,'Prüfsumme stimmt nicht.');
 c.log.open.vm.page();assert.deepEqual(c.platform.calls.at(-1),['page']);
 // Fehler beim stillen Suchen ohne Version: kein Fenster.
 const s=setup();s.u.start();s.u.receive({state:'idle',error:'Keine Verbindung zu github.com.'});assert.equal(s.log.open,null);
 assert.match(s.u.status,/nicht erreichbar/);s.u.receive('{kaputt');assert.equal(s.u.state.state,'idle');
});

test('Was ist neu: einmal nach einem Update, nicht nach einer Neuinstallation, nicht in der Sichtprüfung',()=>{
 const a=setup({seen:PREV});a.u.start();assert.equal(a.log.open?.kind,'message');assert.equal(a.log.open.vm.state.title,'Neu in Aeterna '+VERSION);
 assert.equal(a.log.open.vm.state.text,NEU.notes);assert.equal(a.storage.getItem(UPDATE_KEY),VERSION);
 // Danach fragt das Spiel nach dem Update, nicht vorher.
 a.u.receive(offer);assert.equal(a.log.open.kind,'message');a.log.open.vm.choose(0);a.u.idle();assert.equal(a.log.open?.kind,'update');
 const again=setup({seen:VERSION});again.u.start();assert.equal(again.log.open,null,'gleiche Version: nichts');
 const fresh=setup();fresh.u.start();assert.equal(fresh.log.open,null,'Neuinstallation: nichts');
 const old=setup({played:3});old.u.start();assert.equal(old.log.open?.kind,'message','aus 1.35.0 (ohne Schlüssel), schon gespielt');
 const ci=setup({seen:PREV,automated:true});ci.u.start();assert.equal(ci.log.open,null);
});

test('Einstellungen → Daten: Stand, Jetzt suchen, Ein/Aus; im Browser der Hinweis auf die Android-App',()=>{
 const t=setup();t.u.start();const s=new Settings(t.ctx,{tab:'daten'});let renders=0;s.subscribe(()=>renders++);
 assert.equal(s.update.supported,true);assert.equal(s.update.version,VERSION);
 t.u.receive({state:'checking'});assert.ok(renders>=1,'neu zeichnen bei jedem Zustand');assert.ok(s.update.busy);
 s.checkUpdate();assert.equal(t.platform.calls.filter(c=>c[1]===true).length,0,'nicht während einer Suche');
 t.u.receive({state:'current',installed:VERSION});assert.equal(s.update.status,'Du hast die neueste Version.');
 s.checkUpdate();assert.deepEqual(t.platform.calls.at(-1),['check',true]);
 t.ui.dialog('settings',s);t.u.receive(offer);assert.equal(t.log.open.vm,s,'Einstellungen bleiben offen');assert.ok(s.update.offer);
 s.showUpdate();assert.equal(t.log.open.kind,'update');
 s.setting('updates','false');assert.equal(t.store.profile.settings.updates,false);s.setting('updates','true');assert.equal(t.store.profile.settings.updates,true);
 s.updatePage();assert.deepEqual(t.platform.calls.at(-1),['page']);
 s.closed();const n=renders;t.u.receive({state:'idle'});assert.equal(renders,n,'nach dem Schließen keine Meldungen mehr');
 const web=setup({supported:false});web.u.start();assert.equal(new Settings(web.ctx).update.supported,false);
 const view=read('quellcode/assets/game/view/dialogs.js');
 assert.match(view,/D_\.update=\{render/);assert.match(view,/Automatische Updates gibt es in der Android-App/);
 for(const cmd of ['checkUpdate','showUpdate','updatePage','start','later','background','cancel','install','page'])assert.ok(view.includes("cmd:'"+cmd+"'"),cmd);
});
