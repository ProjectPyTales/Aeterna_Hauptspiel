// Balance-Werkzeug (AP 5.1): gleiche Zahlen bei gleichem Startwert, unabhängig von der Zahl der Threads.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const B=require(path.join(__dirname,'../balance.js'));

test('Balance-Lauf ist reproduzierbar und zählt jede Partie',async()=>{
 const a=await B.run({partien:2,decks:['start'],threads:1}),b=await B.run({partien:2,decks:['start'],threads:2});
 assert.equal(B.report(a),B.report(b));
 const M=a.modes.start;
 assert.equal(M.games,55*2);
 assert.equal(Object.keys(M.pairs).length,55);
 assert.equal(M.first.games,M.games);
 const seats=Object.values(M.seat).reduce((n,s)=>n+s.games,0);assert.equal(seats,2*M.games);
 for(const c of Object.values(M.cards)){assert.ok(c.drawn<=c.deck);assert.ok(c.played<=c.deck);}
 assert.match(B.report(a),/Siegquoten-Matrix/);
});

test('Gepaarte Partien teilen Decks und unterscheiden sich nur im Beginner',()=>{
 const g0=B.play({hero:'leonidas',foe:'khan',mode:'zufall',seed:B.mix(7),first:0});
 const g1=B.play({hero:'leonidas',foe:'khan',mode:'zufall',seed:B.mix(7),first:1});
 assert.deepEqual([...g0.decks[0]],[...g1.decks[0]]);assert.deepEqual([...g0.decks[1]],[...g1.decks[1]]);
 assert.ok([0,1,-1].includes(g0.winner)&&g0.turns>0);
});
