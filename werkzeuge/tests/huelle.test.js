// Native Android-Hülle (AP 2.1): Gradle-Projekt unter android/ statt binär gepatchter Hülle.
// Gebaut und signiert wird in der CI; hier wird geprüft, was ein Update über 1.11.0 und die JS-Brücke brauchen.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const root=path.join(__dirname,'../..'),android=path.join(root,'android'),game=path.join(root,'quellcode/assets/game');
const read=file=>fs.readFileSync(path.join(android,file),'utf8');
const gradle=read('app/build.gradle.kts'),manifest=read('app/src/main/AndroidManifest.xml');
const kotlin=dir=>fs.readdirSync(path.join(android,dir)).filter(f=>f.endsWith('.kt')).map(f=>read(dir+'/'+f)).join('\n');
const src=kotlin('app/src/main/java/de/chroniken/helden');

test('Paket-ID, Version und Signatur erlauben das Update über 1.11.0',()=>{
 assert.match(gradle,/applicationId = "de\.chroniken\.helden\.layout"/);
 const name=gradle.match(/versionName = "([\d.]+)"/)[1],code=Number(gradle.match(/versionCode = (\d+)/)[1]);
 assert.equal(name,fs.readFileSync(path.join(game,'app.js'),'utf8').match(/VERSION='([\d.]+)'/)[1],'Version wie im Spiel');
 assert.ok(code>14,'versionCode muss über 1.11.0 (14) liegen, sonst gibt es kein Update');
 assert.match(gradle,/minSdk = 28/);
 assert.match(gradle,/werkzeuge\/signatur\/chroniken-test\.p12/);
 assert.match(gradle,/keyAlias = "chroniken"/);
 assert.ok(fs.existsSync(path.join(root,'werkzeuge/signatur/chroniken-test.p12')));
 assert.match(gradle,/assets\.srcDirs\(rootProject\.file\("\.\.\/quellcode\/assets"\)\)/,'Web-Spiel aus quellcode/assets');
});

test('App-Name Aeterna, gleicher Einstieg (MainActivity), Vollbild mit Kamera-Aussparung',()=>{
 assert.match(read('app/src/main/res/values/strings.xml'),/<string name="app_name">Aeterna<\/string>/);
 assert.match(gradle,/namespace = "de\.chroniken\.helden"/);
 assert.match(manifest,/android:name="\.MainActivity"/,'de.chroniken.helden.MainActivity wie in der alten Hülle');
 assert.match(manifest,/android\.intent\.category\.LAUNCHER/);
 assert.match(manifest,/android\.permission\.VIBRATE/);
 assert.match(manifest,/android:screenOrientation="sensorLandscape"/);
 for(const f of ['values/themes.xml','values-v31/themes.xml'])assert.match(read('app/src/main/res/'+f),/windowLayoutInDisplayCutoutMode">shortEdges/);
 assert.match(read('app/src/main/res/values-v31/themes.xml'),/windowSplashScreenAnimatedIcon/);
 assert.match(src,/LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES/);
 assert.match(src,/preferredDisplayModeId/,'hohe Bildwiederholrate');
});

test('JS-Brücke: alle Aufrufe des Spiels gibt es in der Hülle, mit @JavascriptInterface',()=>{
 const bridge=read('app/src/main/java/de/chroniken/helden/Bridge.kt');
 const exposed=new Set([...bridge.matchAll(/@JavascriptInterface\s+fun (\w+)/g)].map(m=>m[1]));
 for(const name of ['save','load','exportSave','importSave','haptic','exitApp'])assert.ok(exposed.has(name),'alte API: '+name);
 const js=['service/platform.js','model/store.js','app.js'].map(f=>fs.readFileSync(path.join(game,f),'utf8')).join('\n');
 const used=new Set([...js.matchAll(/(?:native\(\)|bridge)\??\.(\w+)/g)].map(m=>m[1]));
 for(const name of used)assert.ok(exposed.has(name),'Brücke kennt '+name);
 assert.match(read('app/proguard-rules.pro'),/@android\.webkit\.JavascriptInterface/,'R8 darf die Brücke nicht entfernen');
 assert.match(src,/addJavascriptInterface\(Bridge\(this\), "Android"\)/);
 for(const call of ['App.back()','App.importText(','App.onPause()','App.onResume()','App.resize()'])assert.ok(src.includes(call),call);
});

test('Spielstand: gleicher Speicherort wie die alte Hülle, gleicher Ursprung, Export-Name Aeterna',()=>{
 assert.match(src,/PREFS = "chroniken_v1"/);
 assert.match(src,/putString\("profile", raw\)/);
 assert.match(src,/getString\("profile", ""\)/);
 assert.match(src,/HOST = "chroniken\.local"/);
 assert.match(src,/ORIGIN = "https:\/\/\$HOST\/"/);
 assert.match(src,/EXPORT_NAME = "Aeterna-Spielstand\.json"/);
 assert.equal(require(path.join(game,'model/store.js')).EXPORT_NAME,'Aeterna-Spielstand.json');
 assert.match(src,/path\.contains\("\.\."\)/,'keine Pfade mit ..');
});

test('Echte MIME-Typen für alle Dateien des Spiels',()=>{
 const types=new Set([...src.matchAll(/"(\w+)" to "[a-z]+\/[\w+.-]+"/g)].map(m=>m[1]));
 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[e.name]);
 const ext=new Set(walk(game).map(f=>path.extname(f).slice(1).toLowerCase()).filter(Boolean));
 for(const e of ext)assert.ok(types.has(e),'MIME-Typ für .'+e);
 assert.ok(types.has('webp'));
});
