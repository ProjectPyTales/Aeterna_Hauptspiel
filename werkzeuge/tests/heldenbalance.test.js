// Heldenbalance (AP 5.2): geänderte Heldenfähigkeiten, Initiative und die schnelle Zustandskopie der KI.
require('./attrappen.js');
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const game=path.join(__dirname,'../../quellcode/assets/game');
const D=require(path.join(game,'model/data.js')),E=require(path.join(game,'model/engine.js'));

// Partie im Spielzug von Spieler 0 mit 10 Mana und leerer Hand.
function ready(hero,foe='khan'){
 const s=E.create({hero,foe,seed:4242,first:0});E.mulligan(s,[]);
 for(const a of s.players){a.hand=[];a.mana=a.maxMana=10;}
 return s;
}
const power=(s,target)=>{const r=E.apply(s,target?{type:'power',target}:{type:'power'});assert.ok(r.ok,r.error);};

test('Initiative gibt dem Nachziehenden 2 Mana',()=>{
 assert.equal(D.byId.coin.cost,0);assert.deepEqual(D.byId.coin.effects,[{type:'mana',n:2}]);
 const s=E.create({hero:'leonidas',foe:'hypatia',seed:7,first:0});E.mulligan(s,[]);
 assert.ok(s.players[1].hand.some(c=>c.id==='coin'));
});

test('Leonidas: 1 Rüstung und +1 Leben für alle eigenen Diener',()=>{
 const s=ready('leonidas');const a=E.summon(s,0,'neutral_0'),b=E.summon(s,0,'attrappe_34');
 power(s);
 assert.equal(s.players[0].armor,1);
 assert.deepEqual([a.health,a.maxHealth,b.health,b.maxHealth],[3,3,5,5]);
});

test('Hypatia: Unterricht ruft ohne Zielwahl einen Schüler mit Arkanem Fokus (AP L.5)',()=>{
 const s=ready('hypatia');
 assert.equal(E.targetKind(s,0,{type:'power'}),null);
 power(s);
 assert.deepEqual(s.players[0].board.map(u=>[u.id,u.attack,u.health]),[['student',1,2]]);
 assert.equal(E.focus(s,0),1,'der Schüler verstärkt Zauber um 1');
});

test('Imhotep baut am Schwächsten, Vercingetorix verbrennt das Land, Böttger zieht für 1 Leben',()=>{
 let s=ready('imhotep');assert.equal(E.canPower(s,0),false,'ohne Diener nichts zu bauen');
 const weak=E.summon(s,0,'neutral_0'),strong=E.summon(s,0,'attrappe_34');power(s);
 assert.deepEqual([weak.health,weak.maxHealth,weak.attack,strong.health],[4,4,1,4]);
 s=ready('boudicca');const a=E.summon(s,1,'neutral_0'),b=E.summon(s,1,'attrappe_34');const hp=s.players[1].health;power(s);
 assert.deepEqual([a.health,b.health,s.players[1].health],[1,3,hp],'1 Schaden an allen feindlichen Dienern, nicht am Helden');
 assert.equal(s.players[0].overload,1,'Belastung 1');
 E.apply(s,{type:'end'});E.apply(s,{type:'end'});assert.equal(s.players[0].locked,1);
 s=ready('nostradamus');const deck=s.players[0].deck.length;power(s);
 assert.equal(s.players[0].health,29);assert.equal(s.players[0].hand.length,1);assert.equal(s.players[0].deck.length,deck-1);
 for(const id of ['leonidas','hypatia','imhotep','boudicca','nostradamus'])assert.match(D.heroes.find(h=>h.id===id).powerText,/\d/);
});

test('Schnelle Kopie für die KI entspricht dem vollständigen Klon und ist unabhängig',()=>{
 const s=ready('jeanne');E.summon(s,0,'attrappe_23');s.players[0].weapon={attack:1,durability:2};
 const c=E.copy(s);assert.deepEqual(JSON.parse(JSON.stringify(c)),E.clone(s));
 c.players[0].board[0].health=0;c.players[0].weapon.attack=9;c.players[0].deck.pop();c.players[0].hand.push({id:'coin',uid:'x'});
 assert.equal(s.players[0].board[0].health,3);assert.equal(s.players[0].weapon.attack,1);
 assert.equal(s.players[0].hand.length,0);assert.notEqual(s.players[0].deck.length,c.players[0].deck.length);
});
