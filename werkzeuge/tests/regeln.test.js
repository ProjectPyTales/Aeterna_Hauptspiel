// Rauchtest: Die Regel-Engine ist unverändert und spielt 100 KI-Partien vollständig durch.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const game=path.join(__dirname,'../../quellcode/assets/game');
const D=require(path.join(game,'model/data.js')),E=require(path.join(game,'model/engine.js'));

test('100 simulierte Partien enden regelkonform',()=>{
 let finished=0;
 for(let g=0;g<100;g++){
  const seed=1000+g*7919,r={seed};
  const n=D.heroes.length,hero=D.heroes[g%n].id,foe=D.heroes[(g*3+1)%n].id;
  const s=E.create({hero,foe,deck:E.randomDeck(hero,seed),enemyDeck:E.randomDeck(foe,seed+47),mode:'free',mission:null,seed,first:g%2});
  E.mulligan(s,[]);
  let guard=0;
  while(s.phase==='play'&&guard++<5000){
   const a=E.ai(s)||{type:"end"};
   const res=E.apply(s,a);assert.ok(res.ok,res.error);
   for(const p of s.players){assert.ok(p.board.length<=7);assert.ok(p.hand.length<=10);assert.ok(p.mana<=10);}
  }
  if(s.phase==='over')finished++;
 }
 assert.equal(finished,100);
});
