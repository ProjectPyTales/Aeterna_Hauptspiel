// Umbenennung in Aeterna (AP 0.3) und Tagesduell des neuen Hauptmenüs (AP 1.3).
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const root=path.join(__dirname,'../..'),game=path.join(root,'quellcode/assets/game');
const K=require(path.join(game,'model/cosmetics.js')),P=require(path.join(game,'model/profile.js')),D=require(path.join(game,'model/data.js'));
const read=file=>fs.readFileSync(path.join(game,file),'utf8');

test('Spielstand-Schlüssel und interne IDs bleiben trotz Umbenennung gleich',()=>{
 const S=require(path.join(game,'model/store.js'));
 assert.equal(S.KEY,'chroniken.profile');
 assert.equal(S.BACKUP,'chroniken.backup');
 assert.equal(K.find('backs','chroniken').name,'Aeterna-Siegel');
 assert.equal(P.fresh().cosmetics.equipped.back,'chroniken');
});

test('Sichtbare Texte heißen Aeterna',()=>{
 const html=read('index.html'),code=['app.js',...['view','viewmodel'].flatMap(dir=>fs.readdirSync(path.join(game,dir)).filter(f=>f.endsWith('.js')).map(f=>dir+'/'+f))].map(read).join('');
 assert.match(html,/<title>Aeterna<\/title>/);
 assert.doesNotMatch(html+code,/CHRONIKEN|Chroniken-Pack|Chroniken-Spielstand/);
 assert.equal(require(path.join(game,'model/store.js')).EXPORT_NAME,'Aeterna-Spielstand.json');
});

test('Tagesduell: fester Startwert pro Tag, zwei verschiedene Helden',()=>{
 const day=new Date(2026,9,6),again=P.daily(new Date(2026,9,6,23,59));
 assert.deepEqual(P.daily(day),again);
 const ids=new Set(D.heroes.map(h=>h.id)),seen=new Set(),seeds=new Set();
 for(let i=0;i<366;i++){const d=P.daily(new Date(2026,0,1+i));
  assert.ok(ids.has(d.hero)&&ids.has(d.foe)&&d.hero!==d.foe);
  assert.ok(Number.isInteger(d.seed)&&d.seed>0&&[0,1].includes(d.first));
  seen.add(d.hero);seeds.add(d.seed);}
 assert.equal(seen.size,D.heroes.length,'jeder Held kommt im Jahr vor');
 assert.equal(seeds.size,366,'jeder Tag hat einen eigenen Startwert');
});
