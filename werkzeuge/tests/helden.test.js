// Neue Helden (AP 5.10): Heldenfähigkeiten als Daten, Zeitalter, Bauwerke mit Auslösern und Welle 1 mit sechs Helden.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const game=path.join(__dirname,'../../quellcode/assets/game');
const need=f=>require(path.join(game,f));
const D=need('model/data.js'),E=need('model/engine.js'),P=need('model/profile.js'),L=need('model/lore.js');
const NEW=['perikles','agrippa','amanirenas','anna','nezahualcoyotl','masako'];

function ready(hero='perikles',foe='khan'){
 const s=E.create({hero,foe,seed:777,first:0});E.mulligan(s,[]);
 for(const a of s.players){a.hand=[];a.mana=a.maxMana=10;}
 return s;
}
const give=(s,p,id)=>{const h={id,uid:'t'+s.nextId++};s.players[p].hand.push(h);return h;};
const act=(s,a)=>{const r=E.apply(s,a);assert.ok(r.ok,r.error+' '+JSON.stringify(a));};
const play=(s,id,extra={})=>{const h=give(s,s.active,id);act(s,{type:'play',uid:h.uid,...extra});return h;};
const end=s=>act(s,{type:'end'});
const ids=a=>a.board.map(u=>u.id);

test('Heldenfähigkeiten sind Daten: kein Sonderfall je Held mehr in der Engine',()=>{
 const src=fs.readFileSync(path.join(game,'model/engine.js'),'utf8');
 assert.doesNotMatch(src,new RegExp("case '("+D.heroes.map(h=>h.id).join('|')+")'"),'kein switch über Helden-IDs');
 assert.doesNotMatch(src,/a\.hero==='/,'keine Abfrage einzelner Helden');
 for(const h of D.heroes){assert.ok(Array.isArray(h.ability.effects)&&h.ability.effects.length,h.id);assert.ok(D.ages.some(a=>a.id===h.age),h.id+' hat ein Zeitalter');}
});

test('Jeder der 16 Helden kann seine Fähigkeit nutzen, sobald ihre Bedingung erfüllt ist',()=>{
 for(const h of D.heroes){const s=ready(h.id,'khan');const a=s.players[0];
  E.summon(s,0,'neutral_1');E.summon(s,1,'neutral_1');E.summon(s,0,'perikles_1');// eigener Diener, feindlicher Diener, Bauwerk
  if(h.id==='anna')s.played=['neutral_1'];
  assert.ok(E.canPower(s,0),h.id);const acts=E.legal(s).filter(x=>x.type==='power');assert.ok(acts.length,h.id);
  act(s,acts[0]);assert.equal(a.mana,10-h.cost,h.id);assert.ok(!E.canPower(s,0),h.id+' nur einmal pro Zug');}
});

test('Bedingungen aus den Effekten: Platz zum Rufen, fehlende Runensteine, etwas zum Ergründen',()=>{
 const s=ready('anna');assert.ok(!E.canPower(s,0),'Anna: noch keine Karte gespielt');
 play(s,'neutral_0');assert.ok(E.canPower(s,0));
 const p=ready('perikles');for(let i=0;i<7;i++)E.summon(p,0,'neutral_0');assert.ok(!E.canPower(p,0),'Perikles: kein Platz für den Bürger');
 const r=ready('ragnar');for(const t of ['totem_heal','totem_fire','totem_guard','totem_strength'])E.summon(r,0,t);assert.ok(!E.canPower(r,0),'Ragnar: alle Runensteine stehen');
 const k=ready('amanirenas');assert.ok(E.canPower(k,0),'Amanirenas: der zufällige Feind kann auch der Held sein');
});

test('Perikles: Bürger und schwächstes Bauwerk +2; Bauwerke mit Auslösern zu Zugbeginn',()=>{
 const s=ready('perikles');const wall=E.summon(s,0,'perikles_1'),pnyx=E.summon(s,0,'perikles_4');
 pnyx.health=4;act(s,{type:'power'});assert.equal(pnyx.health,6,'Pnyx (4) ist das schwächere Bauwerk');assert.equal(wall.health,5);
 assert.deepEqual(ids(s.players[0]).slice(-1),['citizen']);const hand=s.players[0].hand.length;end(s);end(s);
 assert.equal(s.players[0].hand.length,hand+2,'Pnyx zieht zu Beginn eine Karte, dazu der normale Zug');
 play(s,'perikles_9');const athena=s.players[0].board.find(u=>u.id==='parthenos');assert.ok(athena&&athena.building);
 const citizen=s.players[0].board.find(u=>u.id==='citizen');assert.deepEqual([citizen.attack,citizen.health],[2,3],'Athena Parthenos: +1/+1');
 athena.health=0;E.settle(s);assert.deepEqual([citizen.attack,citizen.health],[1,2],'Aura endet mit dem Bauwerk');
});

test('Agrippa: Pionier verbilligt Bauwerke (nicht gestapelt), Vitruv um 2; Castra stärkt die Legion',()=>{
 const s=ready('agrippa');const castra=give(s,0,'agrippa_2');
 assert.equal(E.cost(s,0,castra),3);act(s,{type:'power'});act(s,{type:'end'});end(s);
 assert.equal(E.cost(s,0,castra),2,'ein Pionier: 1 weniger');act(s,{type:'power'});assert.equal(E.cost(s,0,castra),2,'zwei Pioniere: nicht gestapelt');
 play(s,'agrippa_9');assert.equal(E.cost(s,0,castra),1,'Vitruv: 2 weniger');assert.equal(s.choice?.p,0,'Vitruv ergründet');
 assert.ok(s.choice.options.every(id=>D.byId[id].building),'nur Bauwerke');act(s,{type:'choose',index:0});
 act(s,{type:'play',uid:castra.uid});const pioneer=s.players[0].board.find(u=>u.id==='pioneer');assert.deepEqual([pioneer.attack,pioneer.health],[2,4],'Pionier 1/3 mit Castra +1/+1');
});

test('Ballista und Aquädukt wirken am Zugende, Odeion ruft zu Zugbeginn',()=>{
 const s=ready('agrippa','khan');E.summon(s,0,'agrippa_4');const foe=s.players[1];end(s);
 assert.equal(foe.health,28,'Ballista: 2 Schaden am einzigen Feind, dem Helden');
 const n=ready('nezahualcoyotl');E.summon(n,0,'nezahualcoyotl_4');n.players[0].health=20;end(n);assert.equal(n.players[0].health,22);
 const o=ready('perikles');E.summon(o,0,'perikles_8');end(o);end(o);assert.ok(ids(o.players[0]).includes('citizen'));
});

test('Amanirenas: zufälliger Feind, eine Karte, wenn ein Diener dadurch stirbt; Bronzekopf belastet den Gegner',()=>{
 const seen=new Set();
 for(let k=1;k<40&&seen.size<2;k++){const t=ready('amanirenas','khan');const v=E.summon(t,1,'neutral_12');v.health=1;t.seed=(k*2654435761)>>>0;act(t,{type:'power'});
  const killed=!t.players[1].board.length;seen.add(killed);assert.equal(t.players[0].hand.length,killed?1:0,killed?'Karte für den Treffer':'Held getroffen: keine Karte');}
 assert.equal(seen.size,2,'trifft mal den Diener, mal den Helden');
 const b=ready('amanirenas','khan');const big=E.summon(b,1,'neutral_19');play(b,'amanirenas_9',{target:big.uid});
 assert.equal(b.players[1].board.length,0);end(b);assert.equal(b.players[1].mana,b.players[1].maxMana-2,'2 Mana weniger');
});

test('Anna Komnene: Alexiade ergründet gespielte Karten, Chrysobull verbilligt, Alexios gibt am Zugende eine Karte',()=>{
 const s=ready('anna','khan');play(s,'neutral_5');act(s,{type:'power'});
 assert.deepEqual(s.choice.options,['neutral_5']);act(s,{type:'choose',index:0});assert.equal(s.players[0].hand.at(-1).id,'neutral_5');
 const c=ready('anna');c.players[0].deck=['neutral_0','neutral_1'];play(c,'anna_7');assert.deepEqual(c.players[0].hand.map(h=>E.cost(c,0,h)),[0,1]);
 const a=ready('anna');play(a,'neutral_5');play(a,'anna_9');const n=a.players[0].hand.length;end(a);assert.equal(a.players[0].hand.length,n+1);assert.ok(!a.choice,'zufällig, ohne Wahl');
});

test('Nezahualcóyotl: Heilung lässt den Gärtner wachsen, Nezahualpilli belohnt jede Heilung',()=>{
 const s=ready('nezahualcoyotl');const g=E.summon(s,0,'nezahualcoyotl_0');g.health=1;s.players[0].health=25;
 act(s,{type:'power'});assert.deepEqual([g.attack,g.health],[2,3],'+1 Angriff durch die Heilung');
 const t=ready('nezahualcoyotl');const x=E.summon(t,0,'neutral_1');play(t,'nezahualcoyotl_9');t.players[0].health=20;
 act(t,{type:'power'});assert.equal(x.attack+t.players[0].board.find(u=>u.id==='nezahualcoyotl_9').attack,2+3+1,'eine Heilung (Held) → +1 Angriff');
});

test('Hōjō Masako: Schildwall und Treue; Bannung entfernt den verliehenen Schildwall',()=>{
 const s=ready('masako');const u=E.summon(s,0,'neutral_1');act(s,{type:'power',target:u.uid});
 assert.ok(u.taunt);assert.equal(u.health,4);play(s,'masako_2');assert.deepEqual([u.attack,u.health],[4,6],'Treueschwur: +2/+2 für Schildwall');
 const g=E.summon(s,0,'masako_0');g.health=0;E.settle(s);assert.deepEqual([u.attack,u.health],[5,7],'Gokenin: Vermächtnis +1/+1');
 const t=ready('khan','masako');const v=E.summon(t,1,'neutral_1');v.taunt=true;play(t,'nostradamus_10',{target:v.uid});assert.ok(!v.taunt);
});

test('Scherbengericht schickt einen Diener auf die Hand seines Besitzers zurück',()=>{
 const s=ready('perikles','khan');const u=E.summon(s,1,'neutral_19');play(s,'perikles_5',{target:u.uid});
 assert.equal(s.players[1].board.length,0);assert.equal(s.players[1].hand.at(-1).id,'neutral_19');
});

test('Welle 1: sechs Helden mit je 10 Karten, Chronik, Startdeck, Mission und Zeitalter',()=>{
 assert.equal(D.heroes.length,16);
 for(const id of NEW){const h=D.heroById[id],set=D.cards.filter(c=>c.hero===id&&+c.id.split('_')[1]<10);
  assert.equal(set.length,10,id);assert.deepEqual(set.map(c=>c.rarity),['basic','basic','basic','basic','common','common','rare','rare','epic','legendary'],id);
  assert.ok(set.every(c=>D.missingArt(c)),id+': Platzhalter bis zu den Motiven');assert.ok(!h.art,'Monogramm statt Porträt');
  assert.ok(L.of(id),id+' hat eine Chronikseite');assert.ok(D.missions.some(m=>m.hero===id&&m.effects),id+' hat eine Mission');
  assert.equal(P.validateDeck(P.fresh(),id,E.starter(id)),null,id+': Startdeck gültig');
  const legend=set[9];assert.ok(legend.cost>=4&&legend.cost<=8,legend.name);}
 assert.equal(D.missions.length,16);assert.deepEqual(D.missions.map(m=>m.id),[...Array(16).keys()]);
 assert.ok(D.playable(D.byId.perikles_0,'perikles')&&D.playable(D.byId.neutral_0,'perikles')&&!D.playable(D.byId.leonidas_0,'perikles'));
});

test('Spielstand: Profile ohne die neuen Helden bekommen deren Startdecks; Mission 16 ist gültig',()=>{
 const old=P.fresh();old.decks=old.decks.filter(d=>!NEW.includes(d.hero));for(const c of D.cards)if(NEW.includes(c.hero))delete old.collection[c.id];
 old.campaign=[0,1,2];const p=P.parse(JSON.stringify(old));
 for(const id of NEW)assert.ok(p.decks.some(d=>d.hero===id&&d.cards.length===30),id);
 assert.equal(p.collection.perikles_0,2);assert.equal(p.collection.perikles_9,0);
 old.campaign=[15];assert.doesNotThrow(()=>P.parse(JSON.stringify(old)));old.campaign=[16];assert.throws(()=>P.parse(JSON.stringify(old)));
});

test('Missionen der neuen Helden: Bossfähigkeit aus Daten, je eine Partie bis zum Ende',()=>{
 for(let i=10;i<16;i++){const m=D.missions[i];const s=E.create({hero:'leonidas',foe:m.hero,mission:i,seed:4242+i,first:i%2});E.mulligan(s,[]);
  assert.equal(s.players[1].health,m.health);let n=0;while(s.phase==='play'&&n++<4000)act(s,E.ai(s));assert.equal(s.phase,'over',m.title);}
});
