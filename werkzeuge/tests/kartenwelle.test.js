// Kartenwelle 1 (AP 5.11) mit Zeitalterkarten, Bauwerke und Weltwunder (AP 5.5), KI-Persönlichkeit und Belagern (AP 5.8 Teil 2).
require('./attrappen.js');
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const game=path.join(__dirname,'../../quellcode/assets/game');
const need=f=>require(path.join(game,f));
const D=need('model/data.js'),E=need('model/engine.js'),P=need('model/profile.js');
const AGES=['griechen','mittelalter','ostasien'];

function ready(hero='leonidas',foe='khan'){
 const s=E.create({hero,foe,seed:777,first:0});E.mulligan(s,[]);
 for(const a of s.players){a.hand=[];a.mana=a.maxMana=10;}
 return s;
}
const give=(s,p,id)=>{const h={id,uid:'t'+s.nextId++};s.players[p].hand.push(h);return h;};
const act=(s,a)=>{const r=E.apply(s,a);assert.ok(r.ok,r.error+' '+JSON.stringify(a));};
const play=(s,id,extra={})=>{const h=give(s,s.active,id);act(s,{type:'play',uid:h.uid,...extra});return s.players[s.active].board.at(-1);};
const end=s=>act(s,{type:'end'});
const wave=D.cards.slice(213,269);

test('Welle 1: 56 neue Karten mit festen IDs hinten, zwei je Held, sieben je Zeitalter, drei Weltwunder',()=>{
 assert.equal(wave.length,56);
 for(const h of D.heroes.slice(0,16))assert.equal(wave.filter(c=>c.hero===h.id).length,2,h.id);
 for(const a of AGES){const set=wave.filter(c=>c.age===a);assert.equal(set.length,7,a);assert.ok(set.every(c=>c.hero===a&&c.id.startsWith(a+'_')),a);}
 assert.deepEqual(wave.filter(c=>c.hero==='neutral').map(c=>c.name),['Kolosseum','Hängende Gärten','Pyramiden von Gizeh']);
 assert.ok(wave.every(c=>D.missingArt(c)&&['common','rare','epic'].includes(c.rarity)),'Platzhalter, keine Basis- oder Legendären');
 assert.equal(wave.filter(c=>c.building).length,12,'zwölf neue Bauwerke');
 // Bisherige IDs bleiben an ihrer Stelle (Spielstände).
 assert.equal(D.cards[0].id,'leonidas_0');assert.equal(D.cards[212].id,'masako_9');
});

test('Zeitalterkarten: nur Helden ihres Zeitalters dürfen sie spielen; Sammlung, Deckbau und Zufallsdecks',()=>{
 assert.ok(D.playable(D.byId.griechen_0,'perikles')&&D.playable(D.byId.griechen_0,'leonidas')&&D.playable(D.byId.griechen_0,'hypatia'));
 assert.ok(!D.playable(D.byId.griechen_0,'khan')&&!D.playable(D.byId.mittelalter_0,'dandolo')&&D.playable(D.byId.ostasien_6,'zizka'));
 // Seit 1.14.0 (AP L.1) gehören Ulrich (musashi) zum Mittelalter im Reich und Theophanu (masako) nicht mehr zur Frühen Neuzeit.
 assert.ok(D.playable(D.byId.mittelalter_0,'musashi')&&!D.playable(D.byId.ostasien_6,'masako'));
 assert.equal(D.eraOf(D.byId.griechen_4),'Griechenland und Hellenismus');assert.equal(D.eraOf(D.byId.neutral_0),'Neutral');assert.equal(D.eraOf(D.byId.leonidas_0),'Sparta');
 const p=P.fresh();for(const c of wave)p.collection[c.id]=2;
 const deck=[...E.starter('jeanne').slice(0,26),'mittelalter_4','mittelalter_4','mittelalter_5','mittelalter_5'];
 assert.equal(P.validateDeck(p,'jeanne',deck),null);assert.match(P.validateDeck(p,'dandolo',[...E.starter('dandolo').slice(0,28),'mittelalter_4','mittelalter_4']),/anderen Helden/);
 const random=E.randomDeck('ragnar',99);assert.ok(random.every(id=>D.playable(D.byId[id],'ragnar')));
 // Alte Spielstände bekommen die neuen Karten mit 0 Exemplaren.
 const old=P.fresh();for(const c of wave)delete old.collection[c.id];const back=P.parse(JSON.stringify(old));assert.equal(back.collection.ostasien_6,0);
});

test('Bauwerke (AP 5.5): Pharos verbilligt Zauber, Akropolis stärkt, Kolosseum gibt Rüstung, Pyramiden verdoppeln Vermächtnisse',()=>{
 const s=ready('hypatia');const spell=give(s,0,'hypatia_1');assert.equal(E.cost(s,0,spell),2);
 E.summon(s,0,'griechen_4');assert.equal(E.cost(s,0,spell),1,'Pharos: 1 weniger');E.summon(s,0,'griechen_4');assert.equal(E.cost(s,0,spell),1,'nicht gestapelt');
 const coin=give(s,0,'coin');assert.equal(E.cost(s,0,coin),0);
 const u=E.summon(s,0,'attrappe_23');play(s,'griechen_5');assert.equal(u.health,4,'Akropolis: +1 Leben');
 const k=ready();E.summon(k,0,'neutral_47');const a=E.summon(k,0,'neutral_0'),b=E.summon(k,1,'neutral_0');a.health=0;b.health=0;E.settle(k);
 assert.equal(k.players[0].armor,2,'Kolosseum: je Tod 1 Rüstung');
 const g=ready();E.summon(g,0,'neutral_49');const lantern=E.summon(g,0,'neutral_15');const hand=g.players[0].hand.length;lantern.health=0;E.settle(g);
 assert.equal(g.players[0].hand.length,hand+2,'Pyramiden: Vermächtnis zweimal');
});

test('Hängende Gärten verdoppeln die Heilung eigener Diener, Große Mauer hält frische Diener vom Helden fern',()=>{
 const s=ready('imhotep');E.summon(s,0,'neutral_48');const u=E.summon(s,0,'neutral_13');u.health=1;s.players[0].health=20;
 act(s,{type:'power',target:u.uid});assert.equal(u.health,7,'3 Heilung wirken doppelt');act(s,{type:'end'});assert.equal(u.health,7,'voll');
 const w=ready('khan','musashi');E.summon(w,1,'ostasien_6');w.players[1].board[0].taunt=false;// nur die Regel der Mauer prüfen
 const rider=play(w,'neutral_5');assert.ok(!E.attackTargets(w,0,rider.uid).includes('h1'),'Sturmangriff erreicht den Helden nicht');
 assert.ok(E.attackTargets(w,0,rider.uid).length>0,'die Mauer selbst darf er angreifen');end(w);end(w);assert.ok(E.attackTargets(w,0,rider.uid).includes('h1'),'im nächsten Zug schon');
});

test('Neue Regeln der Heldenkarten: Spartiat, Thermopylen, Galeerenschmied, Seebund, Harpax, Chronist, Shikken, Tribok',()=>{
 const s=ready('leonidas');const sp=E.summon(s,0,'leonidas_10');E.hurt(s,sp.uid,1);assert.equal(sp.attack,3,'+1 Angriff nach Schaden');
 const t=ready('leonidas');const big=E.summon(t,1,'neutral_9'),small=E.summon(t,1,'neutral_0');play(t,'leonidas_11');assert.ok(big.frozen&&!small.frozen);
 const d=ready('dandolo');act(d,{type:'power'});play(d,'dandolo_11');assert.deepEqual([d.players[0].weapon.attack,d.players[0].weapon.durability],[2,3]);
 const pe=ready('perikles');E.summon(pe,0,'perikles_1');E.summon(pe,0,'perikles_4');const n=pe.players[0].hand.length;play(pe,'perikles_11');assert.equal(pe.players[0].hand.length,n+3);
 const ag=ready('agrippa');const weak=E.summon(ag,1,'attrappe_23'),strong=E.summon(ag,1,'neutral_9');
 const harpax=give(ag,0,'agrippa_11');
 const targets=E.legal(ag).filter(a=>a.uid===harpax.uid).map(a=>a.target);assert.ok(targets.includes(weak.uid)&&!targets.includes(strong.uid));
 act(ag,{type:'play',uid:harpax.uid,target:weak.uid});assert.ok(ag.players[0].board.includes(weak));
 const an=ready('anna');const zon=give(an,0,'anna_11');assert.equal(E.cost(an,0,zon),6);an.played=Array(7).fill('neutral_0');assert.equal(E.cost(an,0,zon),4);
 const m=ready('masako');const wall=E.summon(m,0,'neutral_0'),plain=E.summon(m,0,'attrappe_23');play(m,'masako_11');assert.ok(wall.shield&&!plain.shield);
 const tr=ready('dandolo','khan');E.summon(tr,0,'mittelalter_6');const camp=E.summon(tr,1,'khan_11');end(tr);
 assert.equal(camp.health,1,'Tribok trifft auch Bauwerke');assert.equal(tr.players[1].health,30,'aber nie den Helden');
});

test('Schildkrötenschiff schlägt zurück, Ergründen nach Zeitalter, Herodot über alle Zeitalter, zwei Ergründen zugleich',()=>{
 // Kandake (1.10.0): ein getöteter Spielstein bringt keine Karte mehr (Konter gegen Hildegards Novizinnen, bis 1.14.0 Jeannes Rekruten, entschärft).
 for(let k=1;k<30;k++){const t=ready('amanirenas','jeanne');t.seed=(k*2654435761)>>>0;E.summon(t,1,'novice');t.players[1].health=1e6;act(t,{type:'power'});
  if(!t.players[1].board.length){assert.equal(t.players[0].hand.length,0,'Novizin getötet: keine Karte');break;}}
 const s=ready('musashi','khan');const ship=E.summon(s,0,'ostasien_4');E.hurt(s,ship.uid,2);assert.equal(s.players[1].health,29,'1 Schaden am einzigen Feind');
 const g=ready('perikles');play(g,'griechen_1');assert.ok(g.choice.options.every(id=>D.byId[id].age==='griechen'));
 const o=ready('leonidas');play(o,'griechen_3');assert.ok(o.choice.options.every(id=>D.byId[id].hero==='leonidas'));act(o,{type:'choose',index:0});assert.equal(o.choice?.left,1);
 const b=ready('agrippa');E.summon(b,0,'agrippa_8');E.summon(b,0,'agrippa_8');end(b);end(b);
 assert.equal(b.choice?.p,0,'eine Wahl bleibt offen');assert.equal(b.players[0].hand.length,2,'die zweite kam zufällig, dazu die gezogene Karte');
});

test('KI-Persönlichkeit (AP 5.8 Teil 2): jeder Held hat eine, die Bewertung hängt von ihr ab',()=>{
 const kinds=new Set(D.heroes.map(h=>h.ai));assert.deepEqual([...kinds].sort(),['aggressive','combo','defensive']);
 for(const h of D.heroes)assert.ok(E.STYLE[h.ai]&&D.personalities[h.ai],h.id);
 // Gleiche Lage, nur der Held wechselt: Die aggressive KI wertet Schaden am Gegner höher als die defensive.
 const lose=hero=>{const s=ready(hero,'leonidas');const v=E.value(s,0);s.players[1].health-=5;return E.value(s,0)-v;};
 assert.ok(lose('khan')>lose('leonidas'),'Khan (aggressiv) freut sich mehr über 5 Schaden am Gegner als Leonidas (defensiv)');
 const hold=hero=>{const s=ready(hero,'leonidas');const v=E.value(s,0);give(s,0,'neutral_0');return E.value(s,0)-v;};
 assert.ok(hold('hypatia')>hold('khan'),'Hypatia (kombinierend) wertet Handkarten höher');
});

test('Belagern oder ignorieren (AP 5.5): Die KI greift ein wirkungsloses Bauwerk nicht an, ein gefährliches schon',()=>{
 const pick=(building,fix)=>{const s=ready('khan','hypatia');s.players[1].health=30;const b=E.summon(s,1,building);fix&&fix(b);
  const u=E.summon(s,0,'neutral_2');u.ready=true;delete u.fresh;s.players[0].mana=0;return {a:E.ai(s),b,u};};
 const calm=pick('griechen_6',b=>{b.silenced=true;});
 assert.equal(calm.a.type,'attack');assert.equal(calm.a.target,'h1','gebanntes Bauwerk: lieber den Helden');
 const lib=pick('griechen_6',b=>{b.health=3;});assert.equal(lib.a.target,lib.b.uid,'Bibliothek mit 3 Haltbarkeit: einreißen');
 assert.ok(E.impact(D.byId.griechen_6)>E.impact(D.byId.perikles_1),'Wirkung zählt mehr als eine bloße Mauer');
});

test('Partien mit der Kartenwelle laufen bis zum Ende: je Zeitalter ein Deck aus Zeitalter- und neuen Karten',()=>{
 for(const [hero,age] of [['perikles','griechen'],['jeanne','mittelalter'],['nostradamus','ostasien']]){
  const pool=wave.filter(c=>D.playable(c,hero)).map(c=>c.id);const deck=[];for(let i=0;deck.length<30;i++)deck.push(pool[i%pool.length]);
  for(let seed=1;seed<=3;seed++){const s=E.create({hero,foe:'khan',deck,seed,first:seed%2});E.mulligan(s,[]);
   let n=0;while(s.phase==='play'&&n++<3000)act(s,E.ai(s));assert.equal(s.phase,'over',hero+' '+age+' '+seed);}}
});
