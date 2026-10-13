// Heldenfähigkeiten aus der Geschichte (AP L.5, 1.23.0): jede Fähigkeit knüpft an eine belegte Rolle oder Tat an –
// die Tat steht mit Quelle in model/lore.js (deeds) und in der Heldenwahl, die Prüftabelle in der README.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const game=path.join(__dirname,'../../quellcode/assets/game');
const D=require(path.join(game,'model/data.js')),LORE=require(path.join(game,'model/lore.js'));

test('Jeder Held hat eine Tat zu seiner Fähigkeit, kurz genug für die Heldenwahl',()=>{
 for(const h of D.heroes){const d=LORE.deed(h.id);assert.ok(d.length>40&&d.length<=140,h.id+': '+d.length);}
 assert.deepEqual(Object.keys(LORE.deeds).sort(),D.heroes.map(h=>h.id).sort());
});

// Nach dem Balance-Lauf justiert: Hypatias Schüler ohne Weisheit (bis 1.23.0 Arkaner Fokus), Vercingetorix trifft einen statt aller Diener.
test('Die Entscheidung zu AP L.5 ist umgesetzt: drei neue Wirkungen, drei neue Namen',()=>{
 const by=Object.fromEntries(D.heroes.map(h=>[h.name,h]));
 assert.equal(by.Hypatia.power,'Unterricht');assert.deepEqual(by.Hypatia.ability.effects,[{type:'summon',n:1,token:'student'}]);
 assert.equal(by.Imhotep.power,'Baumeister des Djoser');assert.equal(by.Imhotep.ability.effects[0].type,'buffWeakest');
 assert.equal(by.Vercingetorix.power,'Kein Korn für Caesar');assert.deepEqual(by.Vercingetorix.ability.effects,[{type:'randomDamage',n:1,minions:true}]);
 assert.equal(by['Nezahualcóyotl'].power,'Quellwasser von Chapultepec');
 assert.equal(by.Thusnelda.power,'Ruf zu den Waffen');
 assert.equal(by['Fürstin von Vix'].power,'Handel mit Massalia');
 const student=D.byId.student;assert.deepEqual([student.name,student.attack,student.health,student.rarity],['Schüler der Hypatia',1,1,'token']);
});

test('Keine Sternenmagie mehr in Namen und Texten der Heldenfähigkeiten',()=>{
 for(const h of D.heroes)assert.doesNotMatch(h.power+' '+h.powerText,/Stern|Funke|Magie|Zauberei|Götter/,h.id);
 // Die Fähigkeitstexte nennen ihre Wirkung mit Zahlen, die Prüftabelle in der README jeden Helden.
 const readme=fs.readFileSync(path.join(__dirname,'../../README.md'),'utf8');
 for(const h of D.heroes)assert.ok(readme.includes('| '+h.name+' |'),'Prüftabelle: '+h.name);
});
