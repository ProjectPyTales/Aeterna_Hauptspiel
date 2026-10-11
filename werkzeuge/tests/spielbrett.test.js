// AP 1.8 Teil 1 (1.16.0): Feldherrentisch, Heldenmünzen, Siegel und Chronometer; seit 1.17.0 (Rückmeldung zu 1.16.0,
// AP 1.8 Teil 2, AP 3.7) ohne Epochenhälften und Naht, mit Äther-Uhr links, Chronik-Leiste, Pergament-Deck und Zugtafel.
// Gezeichnet wird im Browser (Klickpfad, matchmessung.js); hier steht die Geometrie und was ohne Browser prüfbar ist.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),vm=require('node:vm');
const game=path.join(__dirname,'../../quellcode/assets/game'),read=f=>fs.readFileSync(path.join(game,f),'utf8');
const D=require(path.join(game,'model/data.js'));
const box={window:{}};vm.runInNewContext(read('view/match/layout.js'),box);const L=box.window.CHL;
const render=read('view/match/render.js');

test('Rückmeldung zu 1.16.0: keine Epochenhälften, keine Naht, keine Amulette – der Tisch hängt nur am Schlachtfeld',()=>{
 assert.match(render,/R\.sprite\('field:'\+\[fieldName,tint\]/);
 for(const f of ['half','seam','amulets','amulet'])assert.doesNotMatch(render,new RegExp('function '+f+'\\('),f);
 for(const k of ['epochenhaelfte','bronzenaht','mana-amulett'])assert.doesNotMatch(render,new RegExp('ASTRA: '+k+' '),k);
 assert.equal(L.amulets,undefined);assert.ok(L.seam>L.rows[1]+60&&L.seam<L.rows[0]-60,'Mitte des Tisches zwischen den Reihen');
});

test('Äther-Uhr links neben der Chronik-Leiste: frei von Dienern, Hand, Pause und Hilfe',()=>{
 const left=L.center-3*L.spacing-57*L.minionScale,strip=L.strip;
 for(const p of [0,1]){const m=L.mana[p];
  assert.ok(m.x+m.r<left-10,'links der äußeren Diener');assert.ok(m.x-m.r>strip.x+strip.w,'rechts der Leiste');
  for(let i=0;i<10;i++){const c=L.crystal(p,i);assert.ok(Math.hypot(c.x-m.x,c.y-m.y)<m.r,'Kristall im Ring');}}
 assert.ok(L.mana[0].y>L.seam&&L.mana[1].y<L.seam,'jede Uhr in ihrer Hälfte');
 assert.ok(L.mana[1].y-L.mana[1].r>27+56+14,'unter Pause und Hilfe');
 const c=L.confirm;assert.ok(c.y>L.mana[0].y+L.mana[0].r+20&&c.y+c.h<L.handY-L.handWidth*1.41/2,'AUSSPIELEN zwischen Uhr und Hand');
 assert.ok(c.x>strip.x+strip.w,'AUSSPIELEN neben der Leiste');
 assert.match(render,/R\.dials[^]*?CHA\.play\('aether'/,'Kristalle füllen sich nacheinander mit Klang');
 assert.ok(require(path.join(game,'assets/audio/manifest.json')).aether.length===2);
 assert.match(read('service/audio.js'),/aether:\./);
});

test('Chronik-Leiste: Zeilen in der Leiste, Touch-Ziele, ersetzt den Knopf CHRONIK',()=>{
 const s=L.strip,last=L.stripRow(s.rows-1);assert.ok(L.stripRow(0).y-27>s.y+24&&last.y+27<s.y+s.h-24,'zwischen den Bronzestäben');
 assert.ok(s.y>27+56,'unter Pause');assert.ok(s.y+s.h<L.handY-L.handWidth*1.41/2+40,'über der Hand');
 assert.match(render,/touch\('chronicle',L\.strip/);assert.match(render,/touch\('log'\+i/);assert.doesNotMatch(render,/button\(c,'CHRONIK'/);
});

test('Heldenmünze und Siegel lassen den Gang zwischen den Handfächern frei; Chronometer zwischen den Decks',()=>{
 const corridor=L.center+262-L.handWidth/2,seal=L.powerPosition(0);
 assert.ok(seal.x+42.4*L.heroScale(0)<=corridor+.5,'Siegel (Radius 40 + Zacken 2,4) rechts im Gang');
 assert.ok(L.center-(124+31)*L.heroScale(0)>=L.center-262+L.handWidth/2-1,'Waffenablage links im Gang');
 const {x,y,r}=L.chrono;assert.ok(y-r-26>158+103,'unter dem Deck des Gegners');assert.ok(y+r+60<590,'über dem eigenen Deck');assert.ok(x-r>L.drop.right,'rechts der Ablagezone');
});

test('Touch-Ziele mindestens 48 dp (84 Bühneneinheiten im Handyformat 915 px)',()=>{
 const unit=Number(render.match(/const TOUCH=(\d+)/)[1]);assert.ok(unit*915/1600>=48);
 assert.match(render,/function button\([^]*?touch\(id,x,y,w,h\);\}/,'Knöpfe im Match (Pause, Hilfe, Ausspielen)');
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

test('Pergament-Deck, Stundenglas, versiegelte Befehle und Zugtafel sind gekennzeichnete Platzhalter',()=>{
 for(const k of ['aetheruhr','zugtafel','pergamentstapel','stundenglas','versiegelte-befehle','chronikleiste','chronik-eintrag'])assert.match(render,new RegExp('// (?:ASTRA|Astra-Bild \\(AP A\\.2\\)): '+k+' – '),k);
 assert.match(render,/function deck\([^]*?Math\.min\(6,Math\.ceil\(pp\.deck\.length\/5\)\)[^]*?pp\.fatigue\+1/,'Stapel wird dünner, leeres Deck zeigt den nächsten Schaden');
 assert.match(render,/function turnPlate\([^]*?motion\(\)/,'Zugtafel nur mit Bewegung');
 assert.doesNotMatch(read('view/match/motion.js'),/GEGNERISCHER ZUG/,'alte Einblendung entfällt');
});
