// Welle 2 der neuen Helden (AP 5.10, 1.11.0): Epaminondas, Fabius Maximus, Mandukhai, Baibars, Jan Žižka, Fu Hao und die
// Zeitalterkarten für Rom, Persien & Steppe und Byzanz – samt den neuen Regeln, die sie brauchen.
require('./attrappen.js');
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const game=path.join(__dirname,'../../quellcode/assets/game');
const need=f=>require(path.join(game,f));
const D=need('model/data.js'),E=need('model/engine.js'),P=need('model/profile.js'),L=need('model/lore.js');
const NEW=['epaminondas','fabius','mandukhai','baibars','zizka','fuhao'],AGES=['rom','steppe','byzanz'];

function ready(hero,foe='khan'){const s=E.create({hero,foe,seed:777,first:0});E.mulligan(s,[]);for(const a of s.players){a.hand=[];a.mana=a.maxMana=10;}return s;}
const give=(s,p,id)=>{const h={id,uid:'t'+s.nextId++};s.players[p].hand.push(h);return h;};
const act=(s,a)=>{const r=E.apply(s,a);assert.ok(r.ok,r.error+' '+JSON.stringify(a));};
const play=(s,id,extra={})=>{const h=give(s,s.active,id);act(s,{type:'play',uid:h.uid,...extra});return h;};
const end=s=>act(s,{type:'end'});

test('Welle 2: sechs Helden mit 10 Karten, Chronik, Startdeck, Mission 17–22 und Zeitalter mit je zwei Helden',()=>{
 assert.deepEqual(D.heroes.slice(16).map(h=>h.id),NEW);
 for(const id of NEW){const h=D.heroById[id],set=D.cards.filter(c=>c.hero===id);
  assert.deepEqual(set.map(c=>c.rarity),['basic','basic','basic','basic','common','common','rare','rare','epic','legendary'],id);
  assert.ok(set.every(c=>D.missingArt(c))&&!h.art,id+': Platzhalter und Monogramm');assert.ok(D.personalities[h.ai],id+': KI-Persönlichkeit');
  assert.ok(L.of(id),id);assert.equal(P.validateDeck(P.fresh(),id,E.starter(id)),null,id);}
 assert.deepEqual(D.missions.slice(16).map(m=>m.hero),NEW);
 for(const a of AGES){const heroes=D.heroes.filter(h=>h.age===a),set=D.cards.filter(c=>c.age===a);
  assert.equal(heroes.length,2,a);assert.equal(set.length,7,a);assert.ok(set.every(c=>c.hero===a&&heroes.every(h=>D.playable(c,h.id))),a);}
 assert.equal(D.cards[269].id,'epaminondas_0','neue IDs hinten angehängt');
});

test('Epaminondas: der Diener ganz links wächst, Bauwerke zählen nicht; Pelopidas verleiht Doppelschlag',()=>{
 const s=ready('epaminondas');assert.ok(!E.canPower(s,0),'ohne Diener keine Fähigkeit');
 E.summon(s,0,'neutral_49');const left=E.summon(s,0,'attrappe_23'),right=E.summon(s,0,'neutral_2');
 act(s,{type:'power'});assert.deepEqual([left.attack,left.health],[3,4]);assert.deepEqual([right.attack,right.health],[3,2]);
 play(s,'epaminondas_9');assert.ok(left.double&&left.shield);
});

test('Fabius: Schaden und Starre; Marcellus und Tarent zielen nur auf Diener in Starre',()=>{
 const s=ready('fabius');const a=E.summon(s,1,'attrappe_34'),b=E.summon(s,1,'neutral_4');
 assert.ok(!E.legal(s).some(x=>x.type==='power'&&x.target==='h1'),'nur Diener');act(s,{type:'power',target:a.uid});assert.ok(a.frozen);assert.equal(a.health,a.maxHealth-1);
 const marcellus=give(s,0,'fabius_9');const targets=E.legal(s).filter(x=>x.uid===marcellus.uid).map(x=>x.target);
 assert.deepEqual(targets,[a.uid]);act(s,{type:'play',uid:marcellus.uid,target:a.uid});assert.ok(!s.players[1].board.includes(a));
 const t=give(s,0,'fabius_7');assert.ok(!E.legal(s).some(x=>x.uid===t.uid),'kein Ziel in Starre: Tarent nicht spielbar');
 const f=ready('fabius');for(let i=0;i<3;i++)E.summon(f,1,'attrappe_23');play(f,'fabius_2');assert.equal(f.players[1].board.filter(u=>u.frozen).length,2,'Hinhalten: zwei zufällige');
});

test('Mandukhai: ab drei Dienern +1 Leben für alle, sonst ein Stammeskrieger; Batu Möngke wächst mit dem Feld',()=>{
 const s=ready('mandukhai');act(s,{type:'power'});assert.deepEqual(s.players[0].board.map(u=>u.id),['tribesman']);
 const t=ready('mandukhai');for(let i=0;i<3;i++)E.summon(t,0,'attrappe_23');act(t,{type:'power'});assert.ok(t.players[0].board.every(u=>u.health===4)&&t.players[0].board.length===3);
 play(t,'mandukhai_8');const batu=t.players[0].board.at(-1);assert.deepEqual([batu.attack,batu.health],[5,5],'2/2 + drei andere Diener');
 const w=ready('mandukhai');for(let i=0;i<7;i++)E.summon(w,0,'neutral_0');assert.ok(E.canPower(w,0),'volles Feld: das Bündnis wirkt trotzdem');
});

test('Baibars: verliehener Vorstoß greift sofort Diener an, nicht den Helden; Qalawun stärkt die Reiter',()=>{
 const s=ready('baibars');const foe=E.summon(s,1,'attrappe_23');const h=play(s,'attrappe_34');const u=s.players[0].board.at(-1);
 assert.ok(!E.legal(s).some(x=>x.type==='attack'&&x.uid===u.uid));act(s,{type:'power',target:u.uid});
 assert.deepEqual(E.legal(s).filter(x=>x.type==='attack'&&x.uid===u.uid).map(x=>x.target),[foe.uid]);assert.equal(u.attack,4);
 const q=ready('baibars');const r=E.summon(q,0,'baibars_0');play(q,'baibars_9');assert.deepEqual([r.attack,r.health,r.shield],[3,4,true]);
});

test('Žižka: Kriegswagen, Salve je Schildwall-Diener, Wagenburg stärkt nur Schildwall',()=>{
 const s=ready('zizka');act(s,{type:'power'});end(s);end(s);act(s,{type:'power'});const foe=s.players[1];foe.health=30;
 play(s,'zizka_2');assert.equal(foe.health,28,'zwei Kriegswagen → zwei Treffer am einzigen Feind');
 const t=ready('zizka');const wagon=E.summon(t,0,'wagon'),plain=E.summon(t,0,'attrappe_23');E.summon(t,0,'zizka_7');
 assert.deepEqual([wagon.attack,wagon.health],[2,3]);assert.deepEqual([plain.attack,plain.health],[2,3]);
});

test('Fu Hao: Orakelknochen bietet die obersten drei Karten des eigenen Decks; die gewählte verlässt das Deck',()=>{
 const s=ready('fuhao');const a=s.players[0];a.deck=['neutral_0','neutral_1','neutral_2','neutral_3'];
 act(s,{type:'power'});assert.deepEqual([...s.choice.options].sort(),['neutral_0','neutral_1','neutral_2']);
 const pick=s.choice.options[0];act(s,{type:'choose',index:0});assert.equal(a.hand.at(-1).id,pick);assert.equal(a.deck.length,3);assert.ok(!a.deck.includes(pick));
 const e=ready('fuhao');e.players[0].deck=[];assert.ok(!E.canPower(e,0),'leeres Deck: nichts zu sehen');
 const w=ready('fuhao');w.players[0].deck=['neutral_5','neutral_6','neutral_7','neutral_8'];play(w,'fuhao_9');act(w,{type:'choose',index:0});
 assert.equal(w.choice?.p,0,'Wu Ding: zweite Wahl');act(w,{type:'choose',index:0});assert.ok(w.players[0].hand.every(h=>h.mod===-2));
});

test('Missionen 17–22: Bossfähigkeit aus Daten, je eine Partie bis zum Ende',()=>{
 for(let i=16;i<22;i++){const m=D.missions[i];const s=E.create({hero:'leonidas',foe:m.hero,mission:i,seed:4242+i,first:i%2});E.mulligan(s,[]);
  let n=0;while(s.phase==='play'&&n++<4000)act(s,E.ai(s));assert.equal(s.phase,'over',m.title);}
});

test('KI gegen KI: jeder neue Held spielt Partien mit Start- und Zufallsdeck bis zum Ende',()=>{
 for(const [k,hero] of NEW.entries())for(const random of [false,true]){const foe=D.heroes[(k*5+3)%16].id;
  const s=E.create({hero,foe,deck:random?E.randomDeck(hero,99+k):undefined,seed:1000+k,first:k%2});E.mulligan(s,[]);
  let n=0;while(s.phase==='play'&&n++<4000)act(s,E.ai(s));assert.equal(s.phase,'over',hero);}
});
