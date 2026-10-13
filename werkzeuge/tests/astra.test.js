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
 for(const name of ['heroes-marble','hall-aeterna','menu','legendary-frame','board-preview','bg-basar','bg-sammlung','bg-pakete','bg-heldengalerie'])used.add(name);
 const files=fs.readdirSync(art).filter(f=>f.endsWith('.webp')).map(f=>f.slice(0,-5));
 assert.deepEqual(files.filter(f=>!used.has(f)),[],'Atlanten ohne Karte gehören nicht in die APK');
 for(const a of used)assert.ok(files.includes(a),a);
});

test('Stand: ASTRA_STAND.csv nennt alle Karten und Spielsteine, Auftrag nur offene IDs',()=>{
 const rows=fs.readFileSync(path.join(root,'ungenutzte_assets/ASTRA_STAND.csv'),'utf8').trim().split(/\r?\n/).slice(1).map(r=>r.split(';'));
 assert.equal(rows.length,D.cards.length+Object.keys(D.tokens).length);
 const status=Object.fromEntries(rows.map(r=>[r[0],r[3]]));
 for(const [id,s] of Object.entries(status)){assert.ok(['eingebaut','Revision','altes Bild','unbenutzt','offen','wiederbeschaffen','gesperrt'].includes(s),id);
  assert.equal(['eingebaut','Revision'].includes(s),!!B.cards[id],id+': Status passt zu bilder.js');
  // AP L.6: „altes Bild“ heißt, das Spiel zeigt ein altes, geprüftes Bild – nicht den Platzhalter.
  if(s==='altes Bild')assert.ok(D.byId[id].art&&!D.missingArt(D.byId[id])&&!D.byId[id].art.startsWith('astra'),id+': altes Bild im Spiel');}
 // Entscheidung 21 (AP L.6): 39 alte Bilder bleiben, der nie gerufene Pyramidenwächter wird nicht bestellt.
 assert.equal(Object.values(status).filter(s=>s==='altes Bild').length,39);assert.equal(status.stoneguard,'unbenutzt');
 for(const id of ['neutral_6','neutral_8','neutral_20','neutral_23','hypatia_0'])assert.equal(status[id],'offen',id+': altes Bild stimmt nicht');
 const md=fs.readFileSync(path.join(root,'ungenutzte_assets/ASTRA_AUFTRAG.md'),'utf8');
 for(const [id,s] of Object.entries(status))assert.equal(md.includes('| `'+id+'` |'),['offen','Revision','wiederbeschaffen'].includes(s),id+' im Auftrag');
});

test('Oberfläche (AP A.2): jedes Astra-Bild liegt in assets/ui, Rahmen haben ein Bildfenster, CSS zeigt auf vorhandene Bilder',()=>{
 const ui=path.join(game,'assets/ui');
 for(const [name,[w,h]] of Object.entries(B.ui))assert.deepEqual(size(path.join(ui,name+'.webp')),[w,h],name);
 for(const kind of ['minion','spell','building'])for(const v of ['normal','gold']){const k=kind+'-'+v,[x0,y0,x1,y1]=B.windows[k];
  assert.ok(B.ui['kartenrahmen-'+k],k);assert.ok(x0>20&&x1<180&&y0>20&&y1<180&&x1-x0>80&&y1-y0>80,k+': Fenster im Tempeltor');}
 for(const back of ['chroniken','tempel','sparta','pharao','runen','sterne','lilien','zen'])assert.ok(B.ui['kartenruecken-'+back],back);
 const css=fs.readFileSync(path.join(game,'view/css/astra.css'),'utf8');
 for(const m of css.matchAll(/url\('\.\.\/\.\.\/(assets\/[^']+)'\)/g))assert.ok(fs.existsSync(path.join(game,m[1])),m[1]);
 const html=fs.readFileSync(path.join(game,'index.html'),'utf8');assert.ok(html.indexOf('astra.css')>html.indexOf('screens.css'),'astra.css zuletzt');
 // Erledigte Kennungen tragen den Vermerk statt ASTRA:, damit MOTIVE.md sie nicht mehr listet.
 const md=fs.readFileSync(path.join(root,'ungenutzte_assets/MOTIVE.md'),'utf8');
 for(const k of ['kartenrahmen','kartenruecken-chroniken','chronikleiste','stundenglas','waffenablage','kartenbuch','waehrung'])assert.ok(!md.includes('`'+k+'`'),k);
});

test('Auftrag Oberfläche: jede noch gezeichnete Kennung aus MOTIVE.md hat eine Zeile in ASTRA_AUFTRAG_OBERFLAECHE.md',()=>{
 const md=fs.readFileSync(path.join(root,'ungenutzte_assets/MOTIVE.md'),'utf8'),section=md.slice(md.indexOf('## Im Code gezeichnet'));
 const ids=[...section.matchAll(/^\| `([a-z0-9-]+)` \|/gm)].map(m=>m[1]),order=fs.readFileSync(path.join(root,'ungenutzte_assets/ASTRA_AUFTRAG_OBERFLAECHE.md'),'utf8');
 assert.ok(ids.length>=40);
 for(const id of ids)assert.ok(order.includes('| `'+id+'` |')||order.includes('`'+id+'`'),id);
});
