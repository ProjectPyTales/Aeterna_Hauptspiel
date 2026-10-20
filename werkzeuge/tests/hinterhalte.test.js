// Taktische Hinterhalte (AP 5.6, 1.25.0): Zauber, die verdeckt neben dem Helden liegen und im Zug des Gegners zuschnappen –
// zwölf Karten aus der Geschichte, eine KI, die sie legt, aber nicht in die verdeckten Rollen des Gegners schaut.
require('./attrappen.js');
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const game=path.join(__dirname,'../../quellcode/assets/game');
const need=f=>require(path.join(game,f));
const D=need('model/data.js'),E=need('model/engine.js'),L=need('model/lore.js');
const TRIGGERS=['attack','hero','defend','minion','spell','death'];
const AMBUSH=D.cards.filter(c=>c.ambush&&!c.set);

function ready(hero='leonidas',foe='khan'){const s=E.create({hero,foe,seed:4242,first:0});E.mulligan(s,[]);for(const a of s.players){a.hand=[];a.mana=a.maxMana=10;}return s;}
const give=(s,p,id)=>{const h={id,uid:'t'+s.nextId++};s.players[p].hand.push(h);return h;};
const act=(s,a)=>{const r=E.apply(s,a);assert.ok(r.ok,r.error+' '+JSON.stringify(a));};
const play=(s,id,extra={})=>{const h=give(s,s.active,id);act(s,{type:'play',uid:h.uid,...extra});return h;};
// p 0 legt den Hinterhalt, dann ist p 1 am Zug (mit vollem Mana).
function laid(...ids){const s=ready();for(const id of ids)play(s,id);act(s,{type:'end'});const b=s.players[1];b.hand=[];b.mana=10;return s;}
const minion=(s,p,id='attrappe_23')=>{const u=E.summon(s,p,id);u.ready=true;delete u.fresh;return u;};
const sprung=s=>s.events.filter(e=>e.type==='ambush').map(e=>e.id);

test('Zwölf Hinterhalte: Zauber mit Auslöser, „Hinterhalt:“ im Text, Glossar, Chronikzeile mit Quelle, IDs hinten angehängt',()=>{
 assert.equal(AMBUSH.length,12);assert.equal(D.cards.filter(c=>!c.set).length,362,'ohne die Erweiterung (AP 5.7)');
 assert.deepEqual(D.cards.slice(350,362).map(c=>c.id),['neutral_50','neutral_51','steppe_7','griechen_7','rom_7','mittelalter_7','byzanz_7','ostasien_7','khan_13','fabius_10','anna_12','leonidas_12']);
 for(const c of AMBUSH){assert.equal(c.type,'spell',c.id);assert.ok(TRIGGERS.includes(c.ambush),c.id);assert.ok(c.text.startsWith('Hinterhalt: Wenn '),c.id);
  assert.equal(c.target,null,c.id+': kein Ziel beim Ausspielen');assert.ok(D.missingArt(c),c.id+': Platzhalter bis Astra');
  assert.ok(D.keywordsOf(c.text).some(k=>k.name==='Hinterhalt'),c.id);
  const line=L.card(c.id);assert.ok(line&&line[0].length>60&&line[1].length>5,c.id+': Aus der Chronik mit Quelle');}
 // Jeder Held kann Hinterhalte spielen: zwei neutrale und je einer für jedes Zeitalter.
 for(const h of D.heroes)assert.ok(AMBUSH.filter(c=>D.playable(c,h.id)).length>=3,h.id);
 for(const a of D.ages)assert.equal(AMBUSH.filter(c=>c.age===a.id).length,1,a.id);
 assert.ok(D.keywords.some(k=>k.name==='Hinterhalt'));assert.equal(D.tokens.standard.name,'Träger der Kaiserstandarte');
});

test('Legen: verdeckt neben dem Helden, Mana bezahlt, die Chronik nennt die Karte nicht; höchstens drei, keine doppelt',()=>{
 const s=ready(),a=s.players[0];play(s,'neutral_50');
 assert.deepEqual(a.ambush.map(x=>x.id),['neutral_50']);assert.equal(a.mana,9);assert.ok(!a.grave.includes('neutral_50'),'noch nicht abgelegt');
 assert.match(s.log.at(-1),/legt einen Hinterhalt\.$/);assert.ok(!s.log.some(l=>l.includes('Krähenfüße')));
 assert.ok(s.events.some(e=>e.type==='play'&&e.ambush));
 assert.ok(!(s.played||[]).includes('neutral_50'),'zählt erst aufgedeckt als gespielt (Annas Alexiade zeigt ihn nicht)');
 const twice=give(s,0,'neutral_50');assert.ok(!E.legal(s).some(x=>x.uid===twice.uid),'keine Rolle doppelt');
 play(s,'khan_13');play(s,'mittelalter_7');const fourth=give(s,0,'neutral_51');
 assert.ok(!E.legal(s).some(x=>x.uid===fourth.uid),'höchstens drei');
 // Im eigenen Zug schnappt nichts zu: der eigene Diener greift an, nichts geschieht.
 const u=minion(s,0);act(s,{type:'attack',uid:u.uid,target:'h1'});assert.equal(a.ambush.length,3);assert.deepEqual(sprung(s),[]);
});

test('Krähenfüße: der Angreifer erleidet 2 Schaden, stirbt er, fällt der Angriff aus; der Hinterhalt ist verbraucht',()=>{
 const s=laid('neutral_50'),own=minion(s,0,'attrappe_34'),u=minion(s,1,'neutral_2');
 act(s,{type:'attack',uid:u.uid,target:own.uid});
 assert.deepEqual(sprung(s),['neutral_50']);assert.ok(!s.players[1].board.includes(u),'Steinschleuderer 3/2 fällt');
 assert.equal(own.health,4,'kein Schlag');assert.ok(!s.events.some(e=>e.type==='attack'));
});

test('Krähenfüße gegen einen kräftigen Angreifer: er überlebt und schlägt zu; danach liegt die Rolle im Ablagestapel',()=>{
 const s=laid('neutral_50'),own=minion(s,0,'attrappe_34'),u=minion(s,1,'attrappe_34');
 act(s,{type:'attack',uid:u.uid,target:own.uid});
 assert.equal(u.health,4-2-3,'zuerst 2 vom Hinterhalt, dann 3 vom Gegenschlag');assert.equal(own.health,1);
 assert.equal(s.players[0].ambush.length,0);assert.ok(s.players[0].grave.includes('neutral_50'));assert.ok(s.played.includes('neutral_50'),'aufgedeckt: gespielt');assert.ok(s.log.includes('Hinterhalt: Krähenfüße.'));
});

test('Hinterhalt am Süntel und Fallgatter: nur gegen Angriffe auf den Helden – vernichtet bzw. zurück auf die Hand',()=>{
 let s=laid('khan_13'),own=minion(s,0),u=minion(s,1);
 act(s,{type:'attack',uid:u.uid,target:own.uid});assert.deepEqual(sprung(s),[],'ein Angriff auf einen Diener löst nicht aus');
 const v=minion(s,1,'attrappe_34');act(s,{type:'attack',uid:v.uid,target:'h0'});
 assert.deepEqual(sprung(s),['khan_13']);assert.ok(!s.players[1].board.includes(v));assert.equal(s.players[0].health,30,'kein Schlag');
 s=laid('mittelalter_7');const w=minion(s,1,'attrappe_34');act(s,{type:'attack',uid:w.uid,target:'h0'});
 assert.ok(!s.players[1].board.includes(w));assert.ok(s.players[1].hand.some(h=>h.id==='attrappe_34'),'zurück auf die Hand');assert.equal(s.players[0].health,30);
});

test('Rettung bei Gerunium: greift ein Feind einen Eurer Diener an, fällt der Angriff aus und der Angreifer erstarrt',()=>{
 const s=laid('fabius_10'),own=minion(s,0),u=minion(s,1,'attrappe_34');
 act(s,{type:'attack',uid:u.uid,target:own.uid});
 assert.deepEqual(sprung(s),['fabius_10']);assert.equal(own.health,3);assert.equal(u.health,4);assert.ok(u.frozen);
 assert.ok(!E.legal(s).some(x=>x.type==='attack'&&x.uid===u.uid),'Angriff verbraucht');assert.ok(!s.events.some(e=>e.type==='attack'));
 act(s,{type:'end'});act(s,{type:'end'});assert.ok(u.frozen,'erstarrt auch im nächsten Zug');
});

test('Täuschung bei Larissa: der Träger der Kaiserstandarte fängt den Angriff auf den Helden ab',()=>{
 const s=laid('anna_12'),u=minion(s,1);act(s,{type:'attack',uid:u.uid,target:'h0'});
 const decoy=s.events.find(e=>e.type==='summon'&&e.id==='standard');assert.ok(decoy,'Träger gerufen');
 assert.equal(s.players[0].health,30);assert.ok(s.events.some(e=>e.type==='attack'&&e.target===decoy.target),'er fängt den Schlag (2/2 gegen 2/3: er fällt)');
 // Kein Platz: kein Träger, der Angriff trifft den Helden.
 const t=laid('anna_12');for(let i=0;i<7;i++)E.summon(t,0,'attrappe_23');const v=minion(t,1);act(t,{type:'attack',uid:v.uid,target:'h0'});
 assert.equal(t.players[0].health,28);
});

test('Kadesch und Sikinnos: ein ausgespielter Diener erleidet 4 Schaden bzw. erstarrt (und Ihr zieht)',()=>{
 let s=laid('steppe_7');play(s,'neutral_49');const big=s.players[1].board.at(-1);
 assert.deepEqual(sprung(s),['steppe_7']);assert.equal(big.health,big.maxHealth-4);
 s=laid('griechen_7');const hand=s.players[0].hand.length;play(s,'attrappe_23');
 const u=s.players[1].board.at(-1);assert.ok(u.frozen);assert.equal(s.players[0].hand.length,hand+1);
 act(s,{type:'end'});act(s,{type:'end'});assert.ok(!E.legal(s).some(x=>x.type==='attack'&&x.uid===u.uid),'verpasst den nächsten Angriff');
});

test('Gegenmine vereitelt einen Zauber (Mana weg, keine Wirkung); die Gunst der Stunde löst nichts aus',()=>{
 const s=laid('ostasien_7');play(s,'coin');assert.equal(s.players[0].ambush.length,1,'Gunst der Stunde zählt nicht');
 const mana=s.players[1].mana;play(s,'khan_2',{target:'h0'});
 assert.deepEqual(sprung(s),['ostasien_7']);assert.equal(s.players[0].health,30);assert.equal(s.players[1].mana,mana-D.byId.khan_2.cost);
 assert.ok(s.players[1].grave.includes('khan_2'));assert.match(s.log.at(-1),/wird vereitelt\.$/);
});

test('Abgefangene Botschaft: der Zauber wirkt, und Ihr erhaltet eine Kopie',()=>{
 const s=laid('neutral_51');play(s,'khan_2',{target:'h0'});
 assert.equal(s.players[0].health,30-3);assert.ok(s.players[0].hand.some(h=>h.id==='khan_2'));
});

test('Wall am Kalkrieser Berg und Engpass von Myriokephalon: der ganze Angriff gerät in den Hinterhalt',()=>{
 let s=laid('rom_7');const a=minion(s,1,'neutral_2'),b=minion(s,1,'attrappe_34');act(s,{type:'attack',uid:b.uid,target:'h0'});
 assert.ok(!s.players[1].board.includes(a));assert.equal(b.health,2);assert.equal(s.players[0].health,30-3,'b überlebt und trifft');
 s=laid('byzanz_7');const c=minion(s,1),d=minion(s,1);act(s,{type:'attack',uid:c.uid,target:'h0'});
 assert.ok(c.frozen&&d.frozen);assert.ok(!E.legal(s).some(x=>x.type==='attack'),'die Kolonne steckt fest');
});

test('Kampf um den Leichnam: stirbt im Zug des Gegners einer Eurer Diener, wachsen die übrigen – im eigenen Zug nicht',()=>{
 const s=laid('leonidas_12'),weak=minion(s,0,'attrappe_23'),other=minion(s,0,'attrappe_23'),u=minion(s,1,'attrappe_34');
 act(s,{type:'attack',uid:u.uid,target:weak.uid});
 assert.deepEqual(sprung(s),['leonidas_12']);assert.deepEqual([other.attack,other.health],[3,4]);
 const t=ready();play(t,'leonidas_12');const mine=minion(t,0),foe=minion(t,1,'attrappe_34');act(t,{type:'attack',uid:mine.uid,target:foe.uid});
 assert.equal(t.players[0].ambush.length,1,'eigener Zug: bleibt verdeckt');
});

test('Alte Spielstände ohne Feld ambush, Kopie der KI unabhängig',()=>{
 const s=ready();delete s.players[0].ambush;delete s.players[1].ambush;play(s,'neutral_50');assert.equal(s.players[0].ambush.length,1);
 const c=E.copy(s);c.players[0].ambush.pop();assert.equal(s.players[0].ambush.length,1);
 const old=ready();delete old.players[0].ambush;act(old,{type:'end'});const u=minion(old,1);act(old,{type:'attack',uid:u.uid,target:'h0'});assert.equal(old.players[0].health,28);
});

test('KI: legt eigene Hinterhalte und schaut nicht in die verdeckten Rollen des Gegners',()=>{
 // Eigener Hinterhalt auf der Hand und freies Mana: die KI legt ihn.
 const s=ready('khan','fabius');act(s,{type:'end'});give(s,1,'mittelalter_7');assert.equal(E.ai(s).type,'play');
 // Gleiche Lage, verschiedene verdeckte Rollen: dieselbe Entscheidung – die KI kennt nur ihre Zahl.
 const choose=id=>{const t=laid(id);minion(t,0);const u=minion(t,1,'attrappe_34');minion(t,1);t.players[1].hand=[];return JSON.stringify(E.ai(t));};
 const picks=['khan_13','neutral_50','mittelalter_7','fabius_10'].map(choose);assert.equal(new Set(picks).size,1,picks.join(' | '));
 // Sie fürchtet sie ein wenig: der billigere Diener greift zuerst an.
 const t=laid('khan_13');const big=minion(t,1,'neutral_49'),small=minion(t,1);t.players[1].hand=[];t.players[1].powerUsed=true;
 const a=E.ai(t);assert.equal(a.type,'attack');assert.equal(a.uid,small.uid);
});

test('KI gegen KI: 30 Partien mit Hinterhalten in beiden Decks enden regelgerecht',()=>{
 const deck=h=>{const d=E.randomDeck(h,7);const ids=AMBUSH.filter(c=>D.playable(c,h)).map(c=>c.id);for(let i=0;i<ids.length&&i<6;i++)d[i]=ids[i];return d;};
 let sprungen=0;
 for(let g=0;g<30;g++){const heroes=[D.heroes[g%22].id,D.heroes[(g*7+3)%22].id];
  const s=E.create({hero:heroes[0],foe:heroes[1],deck:deck(heroes[0]),enemyDeck:deck(heroes[1]),seed:900+g,first:g%2});E.mulligan(s,[]);
  for(let n=0;n<400&&s.phase==='play';n++){const a=E.ai(s);assert.ok(E.apply(s,a).ok);sprungen+=s.events.filter(e=>e.type==='ambush').length;
   for(const p of s.players)assert.ok(E.ambushes(p).length<=3);}
  assert.equal(s.phase,'over');}
 assert.ok(sprungen>20,'Hinterhalte schnappen zu: '+sprungen);
});
