// node --test werkzeuge/tests/
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const game=path.join(__dirname,'../../quellcode/assets/game');
const K=require(path.join(game,'model/cosmetics.js')),P=require(path.join(game,'model/profile.js'));

test('neues Profil: Standard freigeschaltet und ausgerüstet',()=>{
 const p=P.fresh();
 assert.deepEqual(p.cosmetics.equipped,{back:'chroniken',board:'standard',skins:{}});
 assert.ok(K.owns(p,'backs','chroniken')&&K.owns(p,'boards','standard'));
 assert.equal(p.gold,300);
});

test('Kauf zieht Gold genau einmal ab',()=>{
 const p=P.fresh();
 assert.equal(K.buy(p,'boards','viking'),null);
 assert.equal(p.gold,200);
 assert.equal(K.buy(p,'boards','viking'),'Bereits freigeschaltet.');
 assert.equal(p.gold,200);
 assert.equal(p.cosmetics.boards.filter(x=>x==='viking').length,1);
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
 assert.equal(K.equip(p,'boards','egypt'),'Zuerst freischalten.');
 assert.equal(K.equip(p,'skins','khan-marmor'),'Zuerst freischalten.');
 assert.deepEqual(p.cosmetics.equipped,{back:'chroniken',board:'standard',skins:{}});
});

test('Ausrüstung bleibt nach Speichern und Laden erhalten',()=>{
 const p=P.fresh();p.gold=2000;
 for(const [k,id] of [['backs','runen'],['boards','japan'],['skins','jeanne-marmor']]){assert.equal(K.buy(p,k,id),null);assert.equal(K.equip(p,k,id),null);}
 const q=P.parse(JSON.stringify(p));
 assert.deepEqual(q.cosmetics.equipped,{back:'runen',board:'japan',skins:{jeanne:'jeanne-marmor'}});
 assert.equal(q.gold,2000-200-100-300);
 K.unequipSkin(q,'jeanne');
 assert.deepEqual(P.parse(JSON.stringify(q)).cosmetics.equipped.skins,{});
});

test('alte 1.2.2-Spielstände ohne Kosmetik werden ergänzt',()=>{
 const p=P.fresh();delete p.cosmetics;
 const q=P.parse(JSON.stringify(p));
 assert.deepEqual(q.cosmetics,K.fresh());
});

test('manipulierte Kosmetik wird bereinigt',()=>{
 const p=P.fresh();
 p.cosmetics={backs:['zen','zen','<script>',42],skins:['ragnar-marmor'],boards:'alle',equipped:{back:'sterne',board:'viking',skins:{khan:'ragnar-marmor',ragnar:'ragnar-marmor',__proto__x:'y'}}};
 const c=P.parse(JSON.stringify(p)).cosmetics;
 assert.deepEqual(c.backs,['chroniken','zen']);
 assert.deepEqual(c.boards,['standard']);
 assert.deepEqual(c.equipped,{back:'chroniken',board:'standard',skins:{ragnar:'ragnar-marmor'}});
});

test('Katalog: 8 Rücken, 10 Skins, 5 Schlachtfelder, Preise laut Vorgabe',()=>{
 assert.equal(K.catalog.backs.length,8);
 assert.equal(K.catalog.skins.length,10);
 assert.deepEqual(K.catalog.boards.map(b=>[b.id,b.name,b.price]),[['standard','Standard',0],['ancient','Griechischer Marmor',100],['egypt','Pharaonen-Gruft',100],['viking','Wikinger-Basalt',100],['japan','Zen-Schiefer',100]]);
 const D=require(path.join(game,'model/data.js'));
 // Die Helden aus AP 5.10 bekommen Skins, sobald ihre Porträts gemalt sind.
 assert.deepEqual(K.catalog.skins.map(s=>s.hero),D.heroes.slice(0,10).map(h=>h.id));
});
