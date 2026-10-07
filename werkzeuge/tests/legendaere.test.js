// Legendäre neu gedacht (AP 5.3): Jede der zwölf hat eine eigene Regel.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const game=path.join(__dirname,'../../quellcode/assets/game');
const D=require(path.join(game,'model/data.js')),E=require(path.join(game,'model/engine.js'));

function ready(hero='leonidas',foe='khan'){
 const s=E.create({hero,foe,seed:777,first:0});E.mulligan(s,[]);
 for(const a of s.players){a.hand=[];a.mana=a.maxMana=10;}
 return s;
}
const give=(s,p,id)=>{const h={id,uid:'t'+s.nextId++};s.players[p].hand.push(h);return h;};
const act=(s,a)=>{const r=E.apply(s,a);assert.ok(r.ok,r.error+' '+JSON.stringify(a));};
const play=(s,id,extra={})=>{const h=give(s,s.active,id);act(s,{type:'play',uid:h.uid,...extra});return h;};
const end=s=>act(s,{type:'end'});
const ids=a=>a.board.map(u=>u.id);

test('Alle zwölf Legendären sind neu: kein „großer Körper plus Bonus“, Kosten 4–8',()=>{
 // Die zwölf aus AP 5.3; die Legendären der neuen Helden (AP 5.10, beide Wellen) prüfen helden.test.js und welle2.test.js.
 const NEW=['perikles','agrippa','amanirenas','anna','nezahualcoyotl','masako','epaminondas','fabius','mandukhai','baibars','zizka','fuhao'];
 const legends=D.cards.filter(c=>c.rarity==='legendary'&&!NEW.includes(c.hero));assert.equal(legends.length,12);
 for(const c of legends){assert.ok(c.cost>=4&&c.cost<=8,c.name);assert.ok(c.aura||c.passive||c.battle||c.costPerFallen||c.focus,c.name);}
});

test('Gorgo: ein Hoplit je feindlichem Diener, Schildwall-Diener haben +1 Angriff, solange sie lebt',()=>{
 const s=ready('leonidas','khan');for(let i=0;i<3;i++)E.summon(s,1,'neutral_1');
 const guard=E.summon(s,0,'leonidas_1');// 2/3 Schildwall
 play(s,'leonidas_9');
 assert.deepEqual(ids(s.players[0]),['leonidas_1','leonidas_9','hoplite','hoplite','hoplite']);
 assert.equal(guard.attack,3);assert.deepEqual([s.players[0].board[2].attack,s.players[0].board[2].health],[2,2],'Hoplit 1/2 +1 Angriff');
 const gorgo=s.players[0].board[1];assert.equal(gorgo.attack,5,'Gorgo selbst hat Schildwall');
 gorgo.health=0;E.settle(s);assert.equal(guard.attack,2,'Aura endet mit ihrem Tod');
});

test('Theon: Arkaner Fokus +1 und Wiederholung mit zufälligem Ziel (Zufall der Engine, reproduzierbar)',()=>{
 const s=ready('hypatia','khan');play(s,'hypatia_9');play(s,'hypatia_3');
 const foe=E.summon(s,1,'neutral_9');end(s);
 assert.equal(foe.health,3,'Sternenregen am Zugende erneut: 2 + 1 Fokus');
});

test('Djoser: Einmarsch errichtet die Stufenpyramide (Bauwerk, Haltbarkeit 8)',()=>{
 const s=ready('imhotep','khan');play(s,'imhotep_9');assert.deepEqual(ids(s.players[0]),['imhotep_9','pyramid']);
 assert.equal(D.byId.imhotep_9.cost,6);
});

test('Marco Polo: zwei heldenfremde Karten, je 1 billiger',()=>{
 const s=ready('dandolo','khan');play(s,'dandolo_9');act(s,{type:'choose',index:2});act(s,{type:'choose',index:0});
 assert.equal(s.players[0].hand.length,2);assert.ok(s.players[0].hand.every(h=>h.mod===-1&&D.byId[h.id].hero!=='dandolo'));
});

test('Subutai: Vorstoß und Zangenangriff – ein weiterer Diener greift dasselbe Ziel an',()=>{
 const s=ready('khan','leonidas');const a=E.summon(s,0,'neutral_9'),b=E.summon(s,0,'neutral_3');a.ready=b.ready=true;
 const foe=E.summon(s,1,'neutral_13');// 4/7 Schildwall
 play(s,'khan_9');
 act(s,{type:'attack',uid:a.uid,target:foe.uid});
 const pincer=s.events.find(e=>e.type==='attack'&&e.pincer);assert.ok(pincer,'Zangenangriff ausgelöst');
 assert.equal(pincer.source,b.uid);assert.equal(foe.health<=0||foe.health===7-5-3,true);
 assert.equal(b.attacks,0,'der Helfer behält seinen eigenen Angriff');
 const sub=s.players[0].board.find(u=>u.id==='khan_9');assert.ok(sub.rush);
});

test('Andraste: kostet 1 weniger je zwei gefallenen eigenen Dienern und holt den letzten zurück',()=>{
 const s=ready('boudicca','khan');const h=give(s,0,'boudicca_9');assert.equal(E.cost(s,0,h),8);
 for(const id of ['neutral_1','neutral_2','neutral_3']){const u=E.summon(s,0,id);u.health=0;E.settle(s);}
 assert.equal(E.cost(s,0,h),7,'drei Gefallene: 1 weniger');
 const u=E.summon(s,0,'neutral_9');u.health=0;E.settle(s);assert.equal(E.cost(s,0,h),6);
 act(s,{type:'play',uid:h.uid});
 assert.deepEqual(ids(s.players[0]),['boudicca_9','neutral_9']);assert.equal(s.players[0].mana,4);
 const pyr=E.summon(s,0,'pyramid');pyr.health=0;E.settle(s);assert.equal(s.players[0].fallen.length,4,'Bauwerke zählen nicht');
});

test('Caterina: am Zugende eine Karte, 2 billiger, und 1 Schaden am eigenen Helden',()=>{
 const s=ready('nostradamus','khan');play(s,'nostradamus_9');const hp=s.players[0].health;end(s);
 assert.equal(s.players[0].health,hp-1);const h=s.players[0].hand.at(-1);assert.equal(h.mod,-2);
 assert.equal(E.cost(s,0,h),Math.max(0,D.byId[h.id].cost-2));
});

test('La Hire: Rekruten +1/+1 mit Göttlicher Gunst, die Heldenfähigkeit ruft zwei',()=>{
 const s=ready('jeanne','khan');const old=E.summon(s,0,'recruit');play(s,'jeanne_9');
 assert.deepEqual([old.attack,old.health,old.shield],[2,2,true]);
 act(s,{type:'power'});
 assert.deepEqual(ids(s.players[0]),['recruit','jeanne_9','recruit','recruit']);
 for(const u of s.players[0].board.filter(u=>u.id==='recruit'))assert.deepEqual([u.attack,u.health,u.shield],[2,2,true]);
 const hire=s.players[0].board[1];hire.health=0;E.settle(s);
 for(const u of s.players[0].board)assert.deepEqual([u.attack,u.health],[1,1],'ohne La Hire wieder 1/1');
});

test('Lagertha: ruft jeden Runenstein, Runensteine haben Schildwall und +1 Leben',()=>{
 const s=ready('ragnar','khan');play(s,'ragnar_9');
 assert.deepEqual(ids(s.players[0]),['ragnar_9','totem_heal','totem_fire','totem_guard','totem_strength']);
 for(const u of s.players[0].board.slice(1)){assert.ok(u.taunt);assert.equal(u.health,3);}
 s.players[0].board[0].health=0;E.settle(s);
 const [heal,,guard]=s.players[0].board;assert.equal(heal.taunt,false);assert.equal(heal.health,2);assert.equal(guard.taunt,true,'Schutzrune behält Schildwall');
});

test('Zenobia: übernimmt einen feindlichen Diener mit höchstens 4 Angriff',()=>{
 const s=ready('leonidas','khan');const big=E.summon(s,1,'neutral_9'),small=E.summon(s,1,'neutral_3');
 const h=give(s,0,'neutral_39');
 const targets=E.legal(s,0).filter(a=>a.uid===h.uid).map(a=>a.target);assert.deepEqual(targets,[small.uid]);
 act(s,{type:'play',uid:h.uid,target:small.uid});
 assert.ok(s.players[0].board.includes(small));assert.ok(!s.players[1].board.includes(small));assert.ok(s.players[1].board.includes(big));
 assert.ok(!E.legal(s,0).some(a=>a.type==='attack'&&a.uid===small.uid),'übernommene Diener sind erst im nächsten Zug bereit');
});

test('Kosten nach dem Balance-Lauf (Herodot und Kojirō: siehe schluesselwoerter.test.js)',()=>{
 const NEW=['perikles','agrippa','amanirenas','anna','nezahualcoyotl','masako','epaminondas','fabius','mandukhai','baibars','zizka','fuhao'];
 const cost=Object.fromEntries(D.cards.filter(c=>c.rarity==='legendary'&&!NEW.includes(c.hero)).map(c=>[c.id,c.cost]));
 assert.deepEqual(cost,{leonidas_9:7,hypatia_9:5,imhotep_9:6,dandolo_9:6,khan_9:6,boudicca_9:8,nostradamus_9:5,jeanne_9:7,ragnar_9:7,musashi_9:6,neutral_38:4,neutral_39:8});
});
