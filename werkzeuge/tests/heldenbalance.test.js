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

test('Hypatia: Sternenfunke trifft ohne Zielwahl einen zufälligen Feind',()=>{
 const s=ready('hypatia');E.summon(s,1,'attrappe_34');
 assert.equal(E.targetKind(s,0,{type:'power'}),null);
 const before=s.players[1].health+s.players[1].board[0].health;
 power(s);
 const ev=s.events.find(e=>e.type==='power');
 assert.ok(['h1',s.players[1].board[0].uid].includes(ev.target),'Ereignis nennt das getroffene Ziel');
 assert.equal(s.players[1].health+s.players[1].board[0].health,before-1);
});

test('Imhotep heilt 3, Boudicca +1 Angriff und 2 Rüstung, Nostradamus zieht für 1 Leben',()=>{
 let s=ready('imhotep');s.players[0].health=20;power(s,'h0');assert.equal(s.players[0].health,23);
 s=ready('boudicca');power(s);assert.equal(s.players[0].tempAttack,1);assert.equal(s.players[0].armor,2);
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
