// Historische Schlüsselwörter (AP 5.4, Teil 1): Umbenennung und die neuen Regeln Vorstoß, Starre, Ergründen,
// Doppelschlag, Arkaner Fokus und Bauwerk – mit der KI, die sie bewertet (AP 5.8, Teil).
require('./attrappen.js');
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const game=path.join(__dirname,'../../quellcode/assets/game');
const D=require(path.join(game,'model/data.js')),E=require(path.join(game,'model/engine.js'));

// Partie im Zug von Spieler 0 mit 10 Mana, leeren Händen und leerem Feld.
function ready(hero='leonidas',foe='khan'){
 const s=E.create({hero,foe,seed:4242,first:0});E.mulligan(s,[]);
 for(const a of s.players){a.hand=[];a.mana=a.maxMana=10;}
 return s;
}
const give=(s,p,id)=>{const h={id,uid:'t'+s.nextId++};s.players[p].hand.push(h);return h;};
const act=(s,a)=>{const r=E.apply(s,a);assert.ok(r.ok,r.error+' '+JSON.stringify(a));};
const play=(s,id,extra={})=>{const h=give(s,s.active,id);act(s,{type:'play',uid:h.uid,...extra});return s.players[s.active===0?0:1].board.at(-1);};
const end=s=>act(s,{type:'end'});

// Karten, die ein Schlüsselwort verleihen oder danach filtern (AP 5.10: Testudo, Treueschwur, Löwentempel …).
const grants=(c,key)=>[...(c.effects||[]),...(c.battle||[]),...(c.death||[]),...(c.start||[])].some(e=>e.key===key||e.only===key||e.per===key||(e.grant||[]).includes(key)||key==='shield'&&e.type==='shield');
test('Umbenennung: keine Hearthstone-Begriffe mehr, Glossar erklärt jedes Schlüsselwort',()=>{
 const old=/Spott|Gottesschild|Kampfschrei|Todesröcheln|Ansturm|Initiative/;
 for(const c of Object.values(D.byId))assert.doesNotMatch(c.name+' '+(c.text||''),old,c.id);
 for(const h of D.heroes)assert.doesNotMatch(h.power+' '+h.powerText,old,h.id);
 for(const m of D.missions)assert.doesNotMatch(m.description,old,m.title);
 assert.equal(D.byId.coin.name,'Gunst der Stunde');assert.equal(D.byId.coin.cost,0);
 // Kartentexte nennen die neuen Namen genau dort, wo die Engine-Felder gesetzt sind. Klammern beschreiben gerufene
 // Spielsteine („Steppenreiter (1/1, Sturmangriff)“), die Pyramiden von Gizeh verdoppeln fremde Vermächtnisse (AP 5.11).
 for(const c0 of D.cards){const c={...c0,text:c0.text.replace(/\([^)]*\)/g,'')};
  assert.equal(c.text.includes('Schildwall'),!!c.taunt||c.id==='leonidas_9'||grants(c,'taunt'),c.name);
  assert.equal(/Göttliche Gunst\./.test(c.text)&&!c.target&&!grants(c,'shield'),!!c.shield,c.name);
  assert.equal(c.text.startsWith('Einmarsch')||c.text.includes(' Einmarsch:'),!!c.battle,c.name);
  assert.equal(c.text.includes('Vermächtnis'),!!c.death||!!c.doubleDeath,c.name);
  assert.equal(c.text.includes('Sturmangriff'),!!c.charge,c.name);
  assert.equal(c.text.includes('Vorstoß'),!!c.rush||grants(c,'rush'),c.name);
 }
 assert.deepEqual(D.keywordsOf('Schildwall. Einmarsch: Ergründet …').map(k=>k.name),['Schildwall','Einmarsch','Ergründen']);
 for(const k of D.keywords)assert.ok(k.text.length>10,k.name);
 assert.equal(D.heroes.find(h=>h.id==='leonidas').power,'Phalanx','Heldenfähigkeit heißt nicht wie das Schlüsselwort');
});

test('Vorstoß: sofort angreifen, im ersten Zug aber keine Helden',()=>{
 const s=ready('musashi','khan');const foe=E.summon(s,1,'attrappe_34');
 const u=play(s,'musashi_6');
 const targets=E.legal(s,0).filter(a=>a.type==='attack'&&a.uid===u.uid).map(a=>a.target);
 assert.deepEqual(targets,[foe.uid]);
 end(s);end(s);
 assert.ok(E.legal(s,0).some(a=>a.type==='attack'&&a.uid===u.uid&&a.target==='h1'),'im nächsten Zug auch den Helden');
});

test('Starre: Schildstoß – der Diener verpasst genau seinen nächsten Angriff',()=>{
 const s=ready('leonidas','khan');const foe=E.summon(s,1,'neutral_9');foe.ready=true;
 play(s,'leonidas_5',{target:foe.uid});
 assert.equal(foe.health,3);assert.ok(foe.frozen);
 end(s);
 assert.ok(!E.legal(s,1).some(a=>a.type==='attack'&&a.uid===foe.uid),'im eigenen Zug starr');
 end(s);assert.ok(!foe.frozen,'nach seinem Zug wieder frei');end(s);
 assert.ok(E.legal(s,1).some(a=>a.type==='attack'&&a.uid===foe.uid));
});

test('Starre: Donnerschlag trifft alle feindlichen Diener und lässt sie erstarren',()=>{
 const s=ready('ragnar','khan');const a=E.summon(s,1,'attrappe_34'),b=E.summon(s,1,'neutral_0');
 play(s,'ragnar_4');
 assert.equal(a.health,3);assert.ok(a.frozen);assert.equal(b.health,1);assert.ok(b.frozen);
});

test('Ergründen: Lehrsatz bietet drei Zauber an, bis zur Wahl gibt es nur die Wahl',()=>{
 const s=ready('hypatia','khan');const deck=s.players[0].deck.length;
 const h=give(s,0,'hypatia_5');act(s,{type:'play',uid:h.uid});
 assert.equal(s.choice.options.length,3);assert.equal(new Set(s.choice.options).size,3);
 for(const id of s.choice.options){const c=D.byId[id];assert.equal(c.type,'spell');assert.ok(['hypatia','neutral'].includes(c.hero));assert.notEqual(id,'coin');}
 assert.equal(s.players[0].deck.length,deck-1,'zieht zusätzlich 1 Karte');
 assert.deepEqual(E.legal(s,0).map(a=>a.type),['choose','choose','choose']);
 assert.equal(E.apply(s,{type:'end'}).ok,false);
 const id=s.choice.options[1];act(s,{type:'choose',index:1});
 assert.equal(s.choice,null);assert.ok(s.players[0].hand.some(x=>x.id===id));
});

test('Marco Polo ergründet zweimal heldenfremde Karten, sie kosten 1 weniger',()=>{
 const s=ready('dandolo','khan');play(s,'dandolo_9');
 for(let i=0;i<2;i++){assert.ok(s.choice);assert.ok(s.choice.options.every(id=>!['dandolo','neutral'].includes(D.byId[id].hero)));act(s,{type:'choose',index:0});}
 assert.equal(s.choice,null);
 for(const h of s.players[0].hand){assert.equal(h.mod,-1);assert.equal(E.cost(s,0,h),Math.max(0,D.byId[h.id].cost-1));}
});

// Seit 1.10.0 (AP 5.11) ergründet Herodot Zeitalterkarten aller Zeitalter – gespielte Karten bleiben Anna Komnene.
test('Herodot ergründet Zeitalterkarten, auch aus fremden Zeitaltern',()=>{
 const seen=new Set();for(let k=1;k<=8;k++){const s=ready('khan','leonidas');s.seed=k*7919;play(s,'neutral_38');
  assert.equal(s.choice.options.length,3);for(const id of s.choice.options){assert.ok(D.byId[id].age,id);seen.add(D.byId[id].age);}}
 assert.ok(seen.size>=2,'mehrere Zeitalter');
});

test('Doppelschlag und Duell: Kojirō kämpft gegen den gewählten Diener und greift später zweimal an',()=>{
 const s=ready('musashi','khan');const foe=E.summon(s,1,'neutral_9');// 5/6
 const h=give(s,0,'musashi_9');
 assert.equal(E.targetKind(s,0,{type:'play',uid:h.uid}),'enemyMinion');
 act(s,{type:'play',uid:h.uid,target:foe.uid});
 const k=s.players[0].board[0];
 // 5/5 gegen 5/6: nach zwei Runden fällt der Veteran, Kojirō fällt nach der ersten.
 assert.ok(!s.players[1].board.includes(foe)||!s.players[0].board.includes(k));
 const s2=ready('musashi','khan');const k2=play(s2,'musashi_9');assert.equal(s2.players[0].board.length,1,'ohne Ziel trotzdem spielbar');
 end(s2);end(s2);
 act(s2,{type:'attack',uid:k2.uid,target:'h1'});act(s2,{type:'attack',uid:k2.uid,target:'h1'});
 assert.equal(s2.players[1].health,20);assert.equal(E.legal(s2,0).filter(a=>a.uid===k2.uid).length,0);
});

test('Arkaner Fokus: Theon verstärkt Zauberschaden und wirkt am Zugende den letzten Zauber erneut',()=>{
 const s=ready('hypatia','khan');play(s,'hypatia_9');
 play(s,'hypatia_1',{target:'h1'});assert.equal(s.players[1].health,26,'3 Schaden + 1 Fokus');
 end(s);
 assert.ok(s.log.includes('Theon wirkt Himmelsstrahl erneut.'));
 const echo=s.events.find(e=>e.type==='echo');assert.ok(echo&&echo.target);
 // Kampfschrei-Schaden zählt nicht als Zauber.
 const s2=ready('hypatia','nostradamus');play(s2,'hypatia_9');const foe=E.summon(s2,1,'attrappe_34');play(s2,'nostradamus_4');assert.equal(foe.health,3);
});

test('Bauwerk: Djoser errichtet die Stufenpyramide – kein Angriff, kein Flächenschaden, keine Heilung',()=>{
 const s=ready('imhotep','hypatia');play(s,'imhotep_9');
 const [djoser,pyr]=s.players[0].board;assert.equal(pyr.id,'pyramid');assert.ok(pyr.building);assert.equal(pyr.health,8);
 const small=E.summon(s,0,'neutral_12');// 2/1
 end(s);
 const h=give(s,1,'hypatia_3');act(s,{type:'play',uid:h.uid});// Sternenregen: 2 an alle feindlichen Diener
 assert.equal(pyr.health,8,'Flächenschaden trifft Bauwerke nicht');assert.equal(djoser.health,3);
 assert.ok(E.validTargets(s,1,'minion').includes(pyr.uid),'gezielte Zauber dürfen belagern');
 end(s);
 assert.ok(!E.legal(s,0).some(a=>a.type==='attack'&&a.uid===pyr.uid),'Bauwerke greifen nie an');
 assert.equal(djoser.attack,6,'schwächster eigener Diener +2/+2');assert.equal(djoser.health,5);
 pyr.health=5;E.effects(s,0,[{type:'healAll',n:4}]);assert.equal(pyr.health,5,'keine Heilung');
 assert.ok(!E.validTargets(s,0,'friendlyMinion').includes(pyr.uid));
 assert.equal(small.health<=0||!s.players[0].board.includes(small),true,'der 2/1 starb am Sternenregen');
});

test('Schnelle Kopie bleibt gleich dem Klon, auch mit offener Wahl und Verlauf',()=>{
 const s=ready('dandolo','khan');play(s,'neutral_1');play(s,'dandolo_9');
 s.players[0].fallen=['neutral_3'];s.players[0].board[0].frozen=1;
 const c=E.copy(s);assert.deepEqual(JSON.parse(JSON.stringify(c)),E.clone(s));
 c.choice.options.pop();c.played.push('x');c.players[0].fallen.push('y');
 assert.equal(s.choice.options.length,3);assert.equal(s.played.length,2);assert.equal(s.players[0].fallen.length,1);
});

test('KI: wählt beim Ergründen und bewertet eine offene Wahl',()=>{
 const s=ready('hypatia','khan');const h=give(s,0,'hypatia_5');act(s,{type:'play',uid:h.uid});
 const a=E.ai(s);assert.equal(a.type,'choose');
 const v=E.value(s,0);const c=E.copy(s);c.choice=null;assert.ok(v>E.value(c,0),'offene Wahl zählt als Karte');
 // Ein erstarrter Diener ist weniger wert.
 const t=ready();const u=E.summon(t,0,'neutral_9');const before=E.value(t,0);u.frozen=1;assert.ok(E.value(t,0)<before);
});
