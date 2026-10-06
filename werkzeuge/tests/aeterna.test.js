// Umbenennung in Aeterna (AP 0.3) und Tagesduell des neuen Hauptmenüs (AP 1.3).
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),os=require('node:os');
const {execFileSync}=require('node:child_process');
const root=path.join(__dirname,'../..'),game=path.join(root,'quellcode/assets/game');
const K=require(path.join(game,'cosmetics.js')),P=require(path.join(game,'profile.js')),D=require(path.join(game,'data.js'));
const tool=path.join(root,'werkzeuge/manifest_version.py'),manifest=path.join(root,'quellcode/AndroidManifest.xml');
const info=file=>execFileSync('python3',[tool,file,'--info'],{encoding:'utf8'}).trim().split(' ');
const read=file=>fs.readFileSync(path.join(game,file),'utf8');

test('Manifest: App-Name Aeterna, Version wie im Spiel, Paket-ID unverändert',()=>{
 const [name,code,label]=info(manifest);
 assert.equal(label,'Aeterna');
 assert.equal(name,read('app.js').match(/VERSION='([\d.]+)'/)[1]);
 assert.ok(Number(code)>=7,'versionCode muss über 1.3.0 (6) liegen, sonst gibt es kein Update');
 assert.ok(fs.readFileSync(manifest).includes(Buffer.from('de.chroniken.helden.layout','utf16le')));
});

test('Manifest-Werkzeug baut den String-Pool für längere und kürzere Namen neu auf',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'aeterna-')),copy=path.join(dir,'AndroidManifest.xml');
 try{
  fs.copyFileSync(manifest,copy);
  execFileSync('python3',[tool,copy,'99','10.20.300','--label','Aeterna – Chronik der Zeiten']);
  assert.deepEqual(info(copy),['10.20.300','99','Aeterna','–','Chronik','der','Zeiten']);
  execFileSync('python3',[tool,copy,'7','1.4.0','--label','A']);
  assert.deepEqual(info(copy),['1.4.0','7','A']);
  assert.equal(fs.readFileSync(copy).readUInt32LE(4),fs.statSync(copy).size,'Dateigröße im XML-Kopf');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('Spielstand-Schlüssel und interne IDs bleiben trotz Umbenennung gleich',()=>{
 const app=read('app.js');
 for(const key of ["'chroniken.profile'","'chroniken.backup'"])assert.ok(app.includes(key),key);
 assert.equal(K.find('backs','chroniken').name,'Aeterna-Siegel');
 assert.equal(P.fresh().cosmetics.equipped.back,'chroniken');
});

test('Sichtbare Texte heißen Aeterna',()=>{
 const html=read('index.html'),app=read('app.js');
 assert.match(html,/<title>Aeterna<\/title>/);
 assert.doesNotMatch(html+app,/CHRONIKEN|Chroniken-Pack|Chroniken-Spielstand/);
 assert.ok(app.includes("a.download='Aeterna-Spielstand.json'"));
});

test('Tagesduell: fester Startwert pro Tag, zwei verschiedene Helden',()=>{
 const day=new Date(2026,9,6),again=P.daily(new Date(2026,9,6,23,59));
 assert.deepEqual(P.daily(day),again);
 const ids=new Set(D.heroes.map(h=>h.id)),seen=new Set(),seeds=new Set();
 for(let i=0;i<366;i++){const d=P.daily(new Date(2026,0,1+i));
  assert.ok(ids.has(d.hero)&&ids.has(d.foe)&&d.hero!==d.foe);
  assert.ok(Number.isInteger(d.seed)&&d.seed>0&&[0,1].includes(d.first));
  seen.add(d.hero);seeds.add(d.seed);}
 assert.equal(seen.size,10,'jeder Held kommt im Jahr vor');
 assert.equal(seeds.size,366,'jeder Tag hat einen eigenen Startwert');
});
