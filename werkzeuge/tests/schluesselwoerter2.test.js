// Historische Schlüsselwörter (AP 5.4, Teil 2, 1.8.0): Plünderung, Tarnung, Bannung, Tödliches Gift und Belastung –
// je mit Regel-Test und KI-Bewertung (AP 5.8). Dazu die Platzhalter (AP 5.12) und die Chronik der Helden (AP 5.9).
require('./attrappen.js');
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const game=path.join(__dirname,'../../quellcode/assets/game');
const D=require(path.join(game,'model/data.js')),E=require(path.join(game,'model/engine.js')),P=require(path.join(game,'model/profile.js')),L=require(path.join(game,'model/lore.js'));

function ready(hero='leonidas',foe='khan'){
 const s=E.create({hero,foe,seed:4242,first:0});E.mulligan(s,[]);
 for(const a of s.players){a.hand=[];a.mana=a.maxMana=10;}
 return s;
}
const give=(s,p,id)=>{const h={id,uid:'t'+s.nextId++};s.players[p].hand.push(h);return h;};
const act=(s,a)=>{const r=E.apply(s,a);assert.ok(r.ok,r.error+' '+JSON.stringify(a));};
const play=(s,id,extra={})=>{const h=give(s,s.active,id);act(s,{type:'play',uid:h.uid,...extra});return s.players[s.active].board.at(-1);};
const end=s=>act(s,{type:'end'});
const id=name=>D.cards.find(c=>c.name===name).id;

// Karten, die ein Schlüsselwort verleihen oder danach filtern (AP 5.10: Testudo, Treueschwur, Löwentempel …).
const grants=(c,key)=>[...(c.effects||[]),...(c.battle||[]),...(c.death||[]),...(c.start||[])].some(e=>e.key===key||e.only===key||key==='shield'&&e.type==='shield');
test('Neue Karten: feste IDs hinten angehängt, Text nennt das Schlüsselwort, Glossar erklärt es',()=>{
 assert.equal(D.cards.length,153+60+56+60+21,'153 bis 1.8.0, 6 × 10 Karten der neuen Helden (AP 5.10), 56 aus Kartenwelle 1 (AP 5.11), Welle 2: 6 × 10 und 21 Zeitalterkarten');
 for(const [k,word] of [['plunder','Plünderung'],['stealth','Tarnung'],['poison','Tödliches Gift']])
  for(const c of D.cards)assert.equal(c.text.includes(word),!!c[k]||grants(c,k),c.id);
 for(const c of D.cards)assert.equal(/Belastung \d/.test(c.text),!!c.overload,c.id);
 for(const w of ['Plünderung','Tarnung','Bannung','Tödliches Gift','Belastung'])assert.ok(D.keywords.some(k=>k.name===w),w);
 assert.deepEqual(D.keywordsOf(D.byId.nostradamus_10.text).map(k=>k.name),['Bannung']);
});

test('Plünderung: Schaden im Angriff und beim Gegenschlag heilt den eigenen Helden',()=>{
 const s=ready('khan','leonidas');s.players[0].health=20;const u=play(s,id('Plünderer am Rhein'));u.ready=true;
 const foe=E.summon(s,1,'attrappe_34');// 3/4
 act(s,{type:'attack',uid:u.uid,target:foe.uid});assert.equal(s.players[0].health,23);
 end(s);const mine=E.summon(s,0,'ragnar_10'),b=E.summon(s,1,'neutral_0');b.ready=true;s.players[0].health=20;
 act(s,{type:'attack',uid:b.uid,target:mine.uid});assert.equal(s.players[0].health,23,'Gegenschlag zählt');
});

test('Tarnung: weder angreifbar noch Ziel, Schildwall zählt nicht; nach dem eigenen Angriff sichtbar',()=>{
 const s=ready('musashi','leonidas');const shin=play(s,id('Heimlicher Bote'));
 end(s);const a=s.players[1];const att=E.summon(s,1,'attrappe_34');att.ready=true;
 assert.ok(!E.attackTargets(s,1,att.uid).includes(shin.uid));
 give(s,1,'hypatia_1');assert.ok(!E.validTargets(s,1,'any').includes(shin.uid));
 end(s);const foe=E.summon(s,1,'neutral_0');
 act(s,{type:'attack',uid:shin.uid,target:foe.uid});assert.ok(!shin.stealth);
 const s2=ready('musashi','leonidas');const hidden=E.summon(s2,1,'neutral_43');hidden.taunt=true;const me=E.summon(s2,0,'attrappe_34');me.ready=true;
 assert.ok(E.attackTargets(s2,0,me.uid).includes('h1'),'getarnter Schildwall sperrt nicht');
 E.effects(s2,0,[{type:'aoe',n:1}]);E.settle(s2);assert.equal(s2.players[1].board.length,0,'Flächenschaden trifft');
});

test('Bannung: Fähigkeiten, Segnungen und Auren weg, Werte auf Kartenwert, Vermächtnis entfällt',()=>{
 const s=ready('nostradamus','leonidas');const foe=E.summon(s,1,'leonidas_8');// Dienekes 5/6, Vermächtnis 6 Rüstung
 foe.attack+=3;foe.maxHealth+=3;foe.health+=3;foe.taunt=true;foe.shield=true;foe.frozen=1;
 play(s,'nostradamus_10',{target:foe.uid});
 assert.deepEqual([foe.attack,foe.health,foe.maxHealth,foe.taunt,foe.shield,!!foe.frozen,foe.silenced],[5,6,6,false,false,false,true]);
 foe.health=0;E.settle(s);assert.equal(s.players[1].armor,0,'kein Vermächtnis');
 const s2=ready('leonidas','nostradamus');const g=play(s2,'leonidas_9');const w=E.summon(s2,0,'neutral_0');assert.equal(w.attack,2,'Gorgo-Aura');
 end(s2);play(s2,'neutral_44',{target:g.uid});assert.equal(w.attack,1,'Aura endet mit der Bannung');
 const s3=ready('imhotep','nostradamus');play(s3,'imhotep_9');const pyr=s3.players[0].board.find(u=>u.id==='pyramid');
 end(s3);play(s3,'nostradamus_10',{target:pyr.uid});end(s3);const minion=s3.players[0].board.find(u=>u.id==='imhotep_9');assert.equal(minion.attack,4,'Pyramide wirkt nicht mehr');
});

test('Tödliches Gift: vernichtet beschädigte Diener, nicht Helden, Bauwerke oder Göttliche Gunst',()=>{
 const s=ready('imhotep','leonidas');const cobra=play(s,id('Kobra des Nils'));cobra.ready=true;
 const big=E.summon(s,1,'neutral_36');// Burgbesatzung 7/9, Göttliche Gunst
 act(s,{type:'attack',uid:cobra.uid,target:big.uid});assert.ok(s.players[1].board.includes(big),'Gunst fängt ab');
 assert.equal(s.players[0].board.length,0,'Kobra fällt');
 const s2=ready('imhotep','leonidas');const c2=play(s2,id('Kobra des Nils'));c2.ready=true;const v=E.summon(s2,1,'neutral_9');
 act(s2,{type:'attack',uid:c2.uid,target:v.uid});assert.equal(s2.players[1].board.length,0);
 const s3=ready('leonidas','imhotep');end(s3);play(s3,'imhotep_9');end(s3);const p3=s3.players[1].board.find(u=>u.id==='pyramid');
 const c3=E.summon(s3,0,'imhotep_10');c3.ready=true;act(s3,{type:'attack',uid:c3.uid,target:p3.uid});assert.equal(p3.health,7,'Bauwerk sicher');
});

test('Belastung: der nächste Zug hat weniger Mana, die Anzeige kennt die gesperrten Kristalle',()=>{
 const s=ready('ragnar','leonidas');for(const a of s.players)a.maxMana=5;
 play(s,'ragnar_11',{target:'h1'});play(s,'neutral_46');assert.equal(s.players[0].overload,3);
 end(s);end(s);const a=s.players[0];assert.equal(a.maxMana,6);assert.equal(a.locked,3);assert.equal(a.mana,3);assert.equal(a.overload,0);
 end(s);end(s);assert.equal(a.mana,7,'nur ein Zug');
});

test('KI: bewertet die neuen Schlüsselwörter und spielt Bannung gegen einen starken Schildwall',()=>{
 const s=ready('nostradamus','leonidas');const base=E.value(s,0);
 for(const card of ['neutral_42','neutral_43','neutral_45']){const c=E.copy(s);const u=E.summon(c,0,card),plain={...u};delete plain.plunder;delete plain.stealth;delete plain.poison;
  const c2=E.copy(s);c2.players[0].board.push(plain);assert.ok(E.value(c,0)>E.value(c2,0),card);}
 const c=E.copy(s);c.players[0].overload=2;assert.ok(E.value(c,0)<base,'Belastung kostet');
 const s2=ready('nostradamus','leonidas');s2.players[1].health=4;const wall=E.summon(s2,1,'neutral_36');const me=E.summon(s2,0,'neutral_9');me.ready=true;
 give(s2,0,'nostradamus_10');s2.players[0].mana=1;
 const a=E.ai(s2,0);assert.equal(a.type,'play');assert.equal(a.target,wall.uid);
});

test('Platzhalter (AP 5.12): Karten ohne Motiv sind gekennzeichnet, ein Deck nur daraus ist spielbar',()=>{
 const missing=D.cards.filter(D.missingArt);assert.ok(missing.length>=13);assert.ok(D.missingArt(D.byId.pyramid));
 for(const h of D.heroes.slice(0,10))assert.equal(h.art,D.replaced.includes(h.id)?undefined:'heroes',h.id+': Porträt nur für Helden, die geblieben sind');
 const pool=missing.filter(c=>c.hero==='neutral'||c.hero==='ragnar');const deck=[];for(let i=0;deck.length<30;i++)deck.push(pool[i%pool.length].id);
 let over=0;for(let seed=1;seed<=6;seed++){const s=E.create({hero:'ragnar',foe:'khan',deck,seed,first:seed%2});E.mulligan(s,[]);
  for(let n=0;n<600&&s.phase!=='over';n++){const r=E.apply(s,E.ai(s));assert.ok(r.ok);}if(s.phase==='over')over++;}
 assert.equal(over,6);
 const list=fs.readFileSync(path.join(__dirname,'../../ungenutzte_assets/MOTIVE.md'),'utf8');
 for(const c of missing)assert.ok(list.includes('`'+c.id+'`'),'MOTIVE.md nennt '+c.id+' – node werkzeuge/motive.js ausführen');
});

test('Chronik der Helden (AP 5.9, 5.10): eine vollständige Seite je Held mit gültigen Lieblingskarten',()=>{
 assert.equal(Object.keys(L.lore).length,D.heroes.length);
 for(const h of D.heroes){const l=L.of(h.id);assert.ok(l,h.id);
  for(const k of ['life','epoch','place','quote','source','style','voice','music'])assert.ok(typeof l[k]==='string'&&l[k].length>2,h.id+'.'+k);
  assert.ok(l.bio.length>=3);assert.ok(l.relations.length>=3);
  for(const id of l.favorites){assert.ok(D.byId[id],id);assert.equal(D.byId[id].hero,h.id,id);}}
});

test('Spielstand: ein Profil aus 1.7.0 ohne die neuen Karten lädt, die neuen Karten stehen auf 0',()=>{
 const NEW=['perikles','agrippa','amanirenas','anna','nezahualcoyotl','masako'];
 const old=P.fresh();for(const c of D.cards)if(NEW.includes(c.hero)||+c.id.split('_')[1]>=(c.hero==='neutral'?42:10))delete old.collection[c.id];
 const p=P.parse(JSON.stringify(old));assert.equal(p.collection.neutral_46,0);assert.equal(p.collection.leonidas_0,2);
});
