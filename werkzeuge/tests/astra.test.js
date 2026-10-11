// Astra-Einbau (AP A.1): gemalte Bilder aus ungenutzte_assets/neue_astra_assets/, erzeugt von werkzeuge/astra_bilder.py.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const game=path.join(__dirname,'../../quellcode/assets/game'),art=path.join(game,'assets/art'),root=path.join(__dirname,'../..');
const B=require(path.join(game,'model/bilder.js')),D=require(path.join(game,'model/data.js'));
// Breite und Höhe einer WebP-Datei (VP8, VP8L oder VP8X) aus dem Kopf.
function size(file){const b=fs.readFileSync(file),kind=b.toString('ascii',12,16);
 if(kind==='VP8X')return [1+b.readUIntLE(24,3),1+b.readUIntLE(27,3)];
 if(kind==='VP8L'){const n=b.readUInt32LE(21);return [1+(n&0x3fff),1+((n>>14)&0x3fff)];}
 return [b.readUInt16LE(26)&0x3fff,b.readUInt16LE(28)&0x3fff];}

test('Zuordnung: jede Astra-ID gibt es im Spiel, Feld 0–11, Atlas liegt als 4 × 3-WebP bereit',()=>{
 const atlases=new Set();
 for(const [id,[atlas,cell]] of Object.entries(B.cards)){assert.ok(D.byId[id],id);assert.equal(D.byId[id].art,atlas,id);assert.equal(D.byId[id].cell,cell,id);
  assert.ok(Number.isInteger(cell)&&cell>=0&&cell<12,id);atlases.add(atlas);}
 for(const a of atlases)assert.deepEqual(size(path.join(art,a+'.webp')),[4*362,3*362],a);
 assert.ok(Object.keys(B.cards).length>=167,'Stand nach Teil 6: 167 Karten und Spielsteine');
});

test('Helden: alle 22 mit Astra-Porträt in heroes und heroes2, Skins im Feld ihres Helden',()=>{
 assert.equal(Object.keys(B.heroes).length,22);
 D.heroes.forEach((h,i)=>{assert.deepEqual([h.art,h.cell],[i<12?'heroes':'heroes2',i%12],h.id);});
 for(const a of ['heroes','heroes2','heroes-marble'])assert.deepEqual(size(path.join(art,a+'.webp')),[4*384,3*384],a);
});

test('Laden: bilder.js vor data.js; im Ordner nur Bilder, auf die das Spiel zeigt',()=>{
 for(const page of ['index.html','labor/renderer.html']){const html=fs.readFileSync(path.join(game,page),'utf8');
  assert.ok(html.indexOf('model/bilder.js')>0&&html.indexOf('model/bilder.js')<html.indexOf('model/data.js'),page);}
 const K=require(path.join(game,'model/cosmetics.js'));
 const used=new Set([...D.cards,...Object.values(D.tokens),...D.heroes].map(c=>c.art).filter(a=>a&&a[0]!=='@'));
 for(const b of K.catalog.boards)used.add(b.image).add(b.image+'-preview');
 for(const name of ['heroes-marble','hall-aeterna','menu','temple','legendary-frame','board-preview'])used.add(name);
 const files=fs.readdirSync(art).filter(f=>f.endsWith('.webp')).map(f=>f.slice(0,-5));
 assert.deepEqual(files.filter(f=>!used.has(f)),[],'Atlanten ohne Karte gehören nicht in die APK');
 for(const a of used)assert.ok(files.includes(a),a);
});

test('Stand: ASTRA_STAND.csv nennt alle 377 Karten und Spielsteine, Auftrag nur offene IDs',()=>{
 const rows=fs.readFileSync(path.join(root,'ungenutzte_assets/ASTRA_STAND.csv'),'utf8').trim().split(/\r?\n/).slice(1).map(r=>r.split(';'));
 assert.equal(rows.length,D.cards.length+Object.keys(D.tokens).length);
 const status=Object.fromEntries(rows.map(r=>[r[0],r[3]]));
 for(const [id,s] of Object.entries(status)){assert.ok(['eingebaut','Revision','offen','wiederbeschaffen','gesperrt'].includes(s),id);
  assert.equal(['eingebaut','Revision'].includes(s),!!B.cards[id],id+': Status passt zu bilder.js');}
 const md=fs.readFileSync(path.join(root,'ungenutzte_assets/ASTRA_AUFTRAG.md'),'utf8');
 for(const [id,s] of Object.entries(status))assert.equal(md.includes('| `'+id+'` |'),['offen','Revision','wiederbeschaffen'].includes(s),id+' im Auftrag');
});
