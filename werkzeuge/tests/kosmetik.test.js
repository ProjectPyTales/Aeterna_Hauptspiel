// node --test werkzeuge/tests/
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const game=path.join(__dirname,'../../quellcode/assets/game');
const K=require(path.join(game,'model/cosmetics.js')),P=require(path.join(game,'model/profile.js'));

test('neues Profil: Standard freigeschaltet und ausgerüstet',()=>{
 const p=P.fresh();
 assert.deepEqual(p.cosmetics.equipped,{back:'chroniken',board:'standard',frame:'tempeltor',skins:{}});
 assert.ok(K.owns(p,'backs','chroniken')&&K.owns(p,'boards','standard')&&K.owns(p,'frames','tempeltor'));
 assert.equal(p.gold,300);
});

test('Kauf zieht Gold genau einmal ab',()=>{
 const p=P.fresh();
 assert.equal(K.buy(p,'boards','athen'),null);
 assert.equal(p.gold,200);
 assert.equal(K.buy(p,'boards','athen'),'Bereits freigeschaltet.');
 assert.equal(p.gold,200);
 assert.equal(p.cosmetics.boards.filter(x=>x==='athen').length,1);
});

test('zu wenig Gold: kein Kauf, kein Abzug',()=>{
 const p=P.fresh();p.gold=299;
 assert.match(K.buy(p,'skins','leonidas-marmor'),/300 Gold/);
 assert.equal(p.gold,299);
 assert.ok(!K.owns(p,'skins','leonidas-marmor'));
});

test('gesperrte Gegenstände lassen sich nicht ausrüsten',()=>{
 const p=P.fresh();
 assert.equal(K.equip(p,'backs','zen'),'Zuerst freischalten.');
 assert.equal(K.equip(p,'boards','kapitol'),'Zuerst freischalten.');
 assert.equal(K.equip(p,'skins','dandolo-marmor'),'Zuerst freischalten.');
 assert.equal(K.equip(p,'frames','gold'),'Zuerst freischalten.');
 assert.deepEqual(p.cosmetics.equipped,{back:'chroniken',board:'standard',frame:'tempeltor',skins:{}});
});

test('Ausrüstung bleibt nach Speichern und Laden erhalten',()=>{
 const p=P.fresh();p.gold=2000;
 for(const [k,id] of [['backs','runen'],['boards','porzellan'],['skins','hypatia-marmor']]){assert.equal(K.buy(p,k,id),null);assert.equal(K.equip(p,k,id),null);}
 const q=P.parse(JSON.stringify(p));
 assert.deepEqual(q.cosmetics.equipped,{back:'runen',board:'porzellan',frame:'tempeltor',skins:{hypatia:'hypatia-marmor'}});
 assert.equal(q.gold,2000-200-100-300);
 K.unequipSkin(q,'hypatia');
 assert.deepEqual(P.parse(JSON.stringify(q)).cosmetics.equipped.skins,{});
});

test('alte 1.2.2-Spielstände ohne Kosmetik werden ergänzt',()=>{
 const p=P.fresh();delete p.cosmetics;
 const q=P.parse(JSON.stringify(p));
 assert.deepEqual(q.cosmetics,K.fresh());
});

test('manipulierte Kosmetik wird bereinigt',()=>{
 const p=P.fresh();
 p.cosmetics={backs:['zen','zen','<script>',42],skins:['imhotep-marmor'],boards:'alle',equipped:{back:'sterne',board:'viking',skins:{dandolo:'imhotep-marmor',imhotep:'imhotep-marmor',__proto__x:'y'}}};
 const c=P.parse(JSON.stringify(p)).cosmetics;
 assert.deepEqual(c.backs,['chroniken','zen']);
 assert.deepEqual(c.boards,['standard']);
 assert.deepEqual(c.equipped,{back:'chroniken',board:'standard',frame:'tempeltor',skins:{imhotep:'imhotep-marmor'}});
});

test('Lehrplan-Helden (AP L.1): Marmor-Skins ersetzter Helden entfallen, der Preis kommt einmal zurück',()=>{
 const p=P.fresh();p.gold=50;p.cosmetics.skins=['khan-marmor','jeanne-marmor','leonidas-marmor','khan-marmor'];p.cosmetics.equipped.skins={khan:'khan-marmor',leonidas:'leonidas-marmor'};
 const q=P.parse(JSON.stringify(p));
 assert.equal(q.gold,50+2*300,'zwei ersetzte Skins, doppelte ID zählt einmal');
 assert.deepEqual(q.cosmetics.skins,['leonidas-marmor']);assert.deepEqual(q.cosmetics.equipped.skins,{leonidas:'leonidas-marmor'});
 assert.equal(P.parse(JSON.stringify(q)).gold,q.gold,'kein zweites Mal');
 assert.ok(K.retired.every(id=>!K.find('skins',id)));
});

test('Katalog: 8 Rücken, 4 Skins, 5 Schlachtfelder, Preise laut Vorgabe',()=>{
 assert.equal(K.catalog.backs.length,8);
 assert.equal(K.catalog.skins.length,4);
 assert.deepEqual(K.catalog.boards.map(b=>[b.id,b.name,b.price]),[['standard','Standard',0],['athen','Marmortisch von Athen',100],['kapitol','Porphyr des Kapitols',100],['skriptorium','Pult des Skriptoriums',100],['porzellan','Meißner Porzellan',100]]);
 const D=require(path.join(game,'model/data.js'));
 // Skins gibt es für Helden mit gemaltem Porträt; die neuen (AP 5.10, AP L.1) bekommen sie mit ihrem Astra-Porträt.
 assert.deepEqual(K.catalog.skins.map(s=>s.hero),D.heroes.filter(h=>h.art).map(h=>h.id));
});

// Rückmeldung zu 1.15.0: Die vier gemalten Schlachtfelder von 1.4.0 entfallen, an ihrer Stelle stehen Platzhalter-Tische.
test('Schlachtfelder (Rückmeldung 1.15.0): alte Felder entfallen, 100 Gold je Feld kommen einmal zurück',()=>{
 const p=P.fresh();p.gold=40;p.cosmetics.boards=['standard','viking','japan','japan','ancient'];p.cosmetics.equipped.board='japan';p.cosmetics.skins=['khan-marmor'];
 const q=P.parse(JSON.stringify(p));
 assert.equal(q.gold,40+3*100+300,'drei Felder (doppelte ID einmal) und ein ersetzter Skin');
 assert.deepEqual(q.cosmetics.boards,['standard']);assert.equal(q.cosmetics.equipped.board,'standard','ausgerüstetes altes Feld → Standard');
 assert.equal(P.parse(JSON.stringify(q)).gold,q.gold,'kein zweites Mal');
 assert.ok(K.retiredBoards.every(id=>!K.find('boards',id)));
 const fs=require('node:fs'),art=path.join(game,'assets/art');
 for(const id of ['ancient','egypt','viking','japan'])assert.ok(!fs.existsSync(path.join(art,'board-'+id+'.webp')),'Bild entfernt: '+id);
});

test('Platzhalter-Tische (AP L.4): ohne Bild, mit Farbfilter, in MOTIVE.md gelistet; Bilder vorhandener Tische liegen bereit',()=>{
 const fs=require('node:fs'),md=fs.readFileSync(path.join(__dirname,'../../ungenutzte_assets/MOTIVE.md'),'utf8');
 for(const b of K.catalog.boards){
  if(b.image){for(const f of [b.image,b.image+'-preview'])assert.ok(fs.existsSync(path.join(game,'assets/art',f+'.webp')),f);continue;}
  assert.match(b.tint,/^([a-z-]+\([-\d.]+(deg)?\) ?)+$/,'CSS-Filter für '+b.id);
  assert.ok(md.includes('| `'+b.id+'` | '+b.name+' |'),'MOTIVE.md nennt '+b.id);}
 assert.equal(K.catalog.boards.filter(b=>!b.image).length,4);
});

test('Goldene Karten (AP 1.5): Kartenrahmen als Kosmetik, alte Spielstände bekommen das Tempeltor',()=>{
 const p=P.fresh();p.gold=1000;
 assert.equal(K.buy(p,'frames','gold'),null);assert.equal(p.gold,400);assert.equal(K.buy(p,'frames','gold'),'Bereits freigeschaltet.');
 assert.equal(K.equip(p,'frames','gold'),null);assert.ok(K.equipped(p,'frames','gold'));
 const q=P.parse(JSON.stringify(p));assert.equal(q.cosmetics.equipped.frame,'gold');assert.deepEqual(q.cosmetics.frames,['tempeltor','gold']);
 // Ein Spielstand von 1.17.0 kennt keine Rahmen.
 const old=P.fresh();delete old.cosmetics.frames;delete old.cosmetics.equipped.frame;
 const r=P.parse(JSON.stringify(old)).cosmetics;assert.deepEqual(r.frames,['tempeltor']);assert.equal(r.equipped.frame,'tempeltor');
 // Ein ausgerüsteter, aber nicht gekaufter Rahmen fällt auf das Tempeltor zurück.
 const fake=P.fresh();fake.cosmetics.equipped.frame='gold';assert.equal(P.parse(JSON.stringify(fake)).cosmetics.equipped.frame,'tempeltor');
});
