// AP 1.8 Teil 1 (1.16.0): Feldherrentisch mit Epochenhälften, Heldenmünzen, Siegel, Mana-Amulette und Chronometer.
// Gezeichnet wird im Browser (Klickpfad, matchmessung.js); hier steht die Geometrie und was ohne Browser prüfbar ist.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),vm=require('node:vm');
const game=path.join(__dirname,'../../quellcode/assets/game'),read=f=>fs.readFileSync(path.join(game,f),'utf8');
const D=require(path.join(game,'model/data.js'));
const box={window:{}};vm.runInNewContext(read('view/match/layout.js'),box);const L=box.window.CHL;
const render=read('view/match/render.js');

test('Epochenhälften: jeder Held bringt ein Zeitalter mit Farbe und Zeichen mit',()=>{
 for(const h of D.heroes){const age=D.ageById[h.age];assert.ok(age,h.id);assert.match(age.color,/^#[0-9a-f]{6}$/);assert.ok(age.icon&&age.name);}
 // Das statische Bild hängt an Tisch, Farbfilter und beiden Zeitaltern – ein anderer Gegner zeichnet die Hälfte neu.
 assert.match(render,/R\.sprite\('field:'\+\[fieldName,tint,\.\.\.ages\.map\(x=>x\?\.id\)\]/);
 assert.ok(L.seam>L.rows[1]+60&&L.seam<L.rows[0]-60,'Naht zwischen den Reihen');
});

test('Mana-Amulette unten rechts: zwischen Siegel und Deck, über der Hand, ohne die Mana-Säule links',()=>{
 const seal=L.powerPosition(0),sealRight=seal.x+44*L.heroScale(0),first=L.amulet(0,0),last=L.amulet(0,9);
 assert.ok(first.x-first.r*3.4-30>sealRight,'Platz für die Anzeige „5/8“ rechts vom Siegel');
 assert.ok(last.x+last.r<1411,'links vom Deck');
 assert.ok(first.y+first.r+20<L.handY-L.handWidth*1.41/2,'über der ruhenden Hand');
 assert.ok(first.y-first.r>L.drop.bottom,'unter der Ablagezone');
 assert.ok(first.x>L.center&&first.y>L.seam,'rechte untere Hälfte');
 const rival=L.amulet(1,0),rivalSeal=L.powerPosition(1);assert.ok(rival.x-rival.r*3.4-25>rivalSeal.x+44*L.heroScale(1)&&L.amulet(1,9).x<1400&&rival.y<L.rows[1]-120);
 assert.equal(L.mana,undefined,'Mana-Säule entfällt');assert.doesNotMatch(render,/function manaColumn/);
});

test('Heldenmünze und Siegel lassen den Gang zwischen den Handfächern frei; Chronometer zwischen den Decks',()=>{
 const corridor=L.center+262-L.handWidth/2,seal=L.powerPosition(0);
 assert.ok(seal.x+42.4*L.heroScale(0)<=corridor+.5,'Siegel (Radius 40 + Zacken 2,4) rechts im Gang');
 assert.ok(L.center-(124+31)*L.heroScale(0)>=L.center-262+L.handWidth/2-1,'Waffenablage links im Gang');
 const {x,y,r}=L.chrono;assert.ok(y-r-26>158+103,'unter dem Deck des Gegners');assert.ok(y+r+60<590,'über dem eigenen Deck');assert.ok(x-r>L.drop.right,'rechts der Ablagezone');
});

test('Touch-Ziele mindestens 48 dp (84 Bühneneinheiten im Handyformat 915 px)',()=>{
 const unit=Number(render.match(/const TOUCH=(\d+)/)[1]);assert.ok(unit*915/1600>=48);
 assert.match(render,/function button\([^]*?touch\(id,x,y,w,h\);\}/,'Knöpfe im Match (Pause, Hilfe, Chronik, Ausspielen)');
 assert.ok(2*L.chrono.r+20>=unit,'Chronometer');
 assert.match(render,/touch\('deck'\+p/);assert.match(render,/touch\('grave'\+p/);
 // Pause (124) und Hilfe (210) dürfen sich mit vergrößerter Fläche nicht überdecken.
 assert.match(render,/button\(c,'Ⅱ',124,27,60,56[^]*?button\(c,'\?',210,27,60,56/);assert.ok(124+30+unit/2<=210+30-unit/2);
});

test('Siegel dreht sich um, Chronometer schwingt – beides ohne Animation bei reduzierter Bewegung',()=>{
 assert.match(render,/reducedMotion/);
 assert.match(render,/function seal\([^]*?f\.used!==used[^]*?back\?'back'/);
 assert.match(render,/function chronometer\([^]*?f\.mine!==mine[^]*?hit\('end'/);
 assert.doesNotMatch(render,/'ZUG BEENDEN',1402/,'alter Knopf entfällt');
});
