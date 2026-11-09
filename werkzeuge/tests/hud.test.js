// AP 1.9 Match-HUD, AP 3.10 Auftritt der Legendären und AP 4.5 Vibration im Takt des Aufpralls (seit 1.38.0). Gezeichnet wird im
// Browser (Klickpfad, matchmessung.js, Geräte-Matrix); hier stehen Geometrie, Regeln und was ohne Browser prüfbar ist.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),vm=require('node:vm');
const game=path.join(__dirname,'../../quellcode/assets/game'),read=f=>fs.readFileSync(path.join(game,f),'utf8');
const D=require(path.join(game,'model/data.js')),{impactHaptic}=require(path.join(game,'viewmodel/match.js')),T=require(path.join(game,'view/match/anim.js'));
const box={window:{}};vm.runInNewContext(read('view/match/layout.js'),box);const L=box.window.CHL;
const render=read('view/match/render.js'),motion=read('view/match/motion.js'),fx=read('view/match/fx.js'),board=read('view/match/board.js');

test('AP 1.9 Handkarten (Entscheidung 23: zwei Fächerseiten): bei voller Hand weiter auseinander, frei von Rand, Dioramen und Münze',()=>{
 const pose=n=>Array.from({length:n},(_,i)=>L.handPose(i,n)),w=L.handWidth;
 for(let n=1;n<=10;n++){const p=pose(n);
  for(const c of p){assert.ok(c.x-w/2>L.dioramaBox(2).x+L.dioramaBox(2).w,n+': links frei vom Diorama');assert.ok(c.x+w/2<L.dioramaBox(3).x,n+': rechts frei vom Katapult');}
  const left=p.filter(c=>c.x<L.center),right=p.filter(c=>c.x>L.center);
  if(left.length)assert.ok(Math.max(...left.map(c=>c.x))+w/2<L.ambush(0,0).x-20,n+': vor den Hinterhalt-Rollen');
  if(right.length){const pw=L.powerPosition(0);assert.ok(Math.min(...right.map(c=>c.x))-w/2>pw.x+40*L.heroScale(0),n+': rechts vom Siegel der Heldenfähigkeit');}}
 // Volle Hand: 98 bzw. 90 statt 80 Einheiten zwischen den Karten, also mehr vom Namen sichtbar.
 const p=pose(10),gap=(a,b)=>Math.abs(p[a].x-p[b].x);
 assert.ok(gap(0,1)>=95&&gap(5,6)>=90,JSON.stringify([gap(0,1),gap(5,6)]));
 // Bis acht Karten wie bisher: symmetrisch, Schritt 100.
 const q=pose(8);assert.equal(L.center-q[3].x,q[4].x-L.center);assert.equal(q[1].x-q[0].x,100);
 // Höher, damit das Namensband nicht am Rand klebt – und doch unter AUSSPIELEN und der Chronik-Leiste.
 assert.equal(L.handY,752);assert.ok(L.confirm.y+L.confirm.h<L.handY-L.handWidth*1.41/2);
});

test('AP 1.9 Lesbarkeit: Brett-Schriften in Mindestgröße hell auf dunklem Band, ruhigeres Grün, kleineres Schildwall-Wappen',()=>{
 assert.match(render,/const MIN_TEXT=22;/);
 // Modus, Zug, ZUG BEENDEN, Deck, Erschöpfung, Friedhof und das Zugsiegel der Chronik-Leiste nutzen die Mindestgröße.
 for(const re of [/372,56,MIN_TEXT,'#f3dab0'/,/txt\(c,label,0,r\+27,MIN_TEXT/,/txt\(c,'ZUG '\+turn,0,r\+66,MIN_TEXT/,/txt\(c,pp\.deck\.length,1451,yy\+104,MIN_TEXT/,
  /txt\(c,'−'\+\(pp\.fatigue\+1\),1451,yy\+104,MIN_TEXT/,/txt\(c,'☠ '\+pp\.grave\.length,1542,yy\+61,MIN_TEXT/,/txt\(c,e\.turn,x,sy\+1,MIN_TEXT/])assert.match(render,re);
 for(const old of [/,368,55,13,/,/'ZUG '\+e\.turn,x,sy\+\.5,8\.5/,/'ZUG '\+turn,0,r\+56,14/,/pp\.deck\.length,1451,yy\+103,19/])assert.doesNotMatch(render,old);
 // Die Plakette der Chronometer-Taste passt in sein Sprite.
 assert.match(render,/R\.sprite\('chrono:'\+\[active,s\.turn\],-92,-r-40,184,2\*r\+124/);
 const normal=/normal:\{ready:'(#[0-9a-f]{6})'/.exec(render)[1];assert.notEqual(normal,'#71ff56','nicht mehr grell');
 const [r,g,b]=[1,3,5].map(i=>parseInt(normal.slice(i,i+2),16));assert.ok(g>r&&g>b&&g<240&&r>100,'wärmeres, satteres Grün: '+normal);
 assert.match(render,/klar:\{ready:'#3da5ff'/,'Palette bei Farbsehschwäche unverändert');
 assert.match(render,/globalAlpha=\.17\+\.13\*Math\.sin\(t\/420\)/,'leiseres Atmen');
 assert.match(render,/function tauntCrest\(c\)\{\n c\.save\(\);c\.translate\(0,-50\);c\.scale\(\.7,\.7\);/);
});

test('AP 3.10 Auftritt der Legendären: Band und Siegel vor dem Aufprall, ≤ 1 s, überspringbar, nicht für Hinterhalte',()=>{
 assert.match(motion,/const HERALD=700;/);assert.match(motion,/M\.legendary=card=>card\?\.rarity==='legendary'&&!card\.ambush;/);
 assert.match(motion,/line=base&&M\.legendary\(card\)\?herald\(base\):base/);
 // Die Zeitleiste behält ihre Phasen und setzt das Band davor; auf „Schnell“ läuft die Match-Uhr doppelt (anim.js).
 const play=T.timeline([{name:'lift',d:150},{name:'hover',d:270},{name:'slam',d:130},{name:'settle',d:380}]);
 const withBand=T.timeline([{name:'herald',d:700},...play.phases.map(({name,d,ease})=>({name,d,ease}))]);
 assert.equal(withBand.duration,play.duration+700);assert.equal(withBand.start('lift'),700);assert.ok(700<=1000);
 assert.match(motion,/M\.skipHerald=\(\)=>\{if\(!M\.inHerald\(\)\)return false;/);
 assert.match(board,/if\(M\.skipHerald\(\)\)return;if\(M\.busy\(\)\)return;/,'ein Tippen überspringt');
 assert.match(fx,/F\.draw=\(c,s,t\)=>\{const x=CHM\.transition;if\(x\?\.line&&!x\.hit\)\{const ph=x\.line\.at\(t-x\.at\);if\(ph\.name==='herald'\)F\.herald/,'zuletzt über allem');
 assert.match(fx,/calm=still\(\)/);assert.match(fx,/stamp=calm\?0:/,'ruhige Bewegung: nur das Band');
 for(const k of ['legendaer-band','legendaer-siegel'])assert.match(fx,new RegExp('ASTRA: '+k+' – '),k);
 // Es gibt Legendäre, die so auftreten – und Hinterhalte, die verdeckt bleiben.
 assert.ok(D.cards.filter(c=>c.rarity==='legendary'&&!c.ambush).length>=22);
});

test('AP 4.5 Vibration im Takt des Aufpralls: nach Wucht, auch im Zug des Gegners, wenn es trifft',()=>{
 const hand=(id,p=0)=>{const players=[{hand:[]},{hand:[]}];players[p].hand=[{uid:'c1',id}];return {active:p,players};};
 const legend=D.cards.find(c=>c.rarity==='legendary'&&c.type==='minion'&&!c.ambush),small=D.cards.find(c=>c.type==='minion'&&c.cost===1&&c.rarity!=='legendary'),big=D.cards.find(c=>c.type==='minion'&&c.cost>=6&&c.rarity!=='legendary');
 const play=id=>({type:'play',uid:'c1'}),none={events:[]};
 assert.equal(impactHaptic(hand(legend.id),none,play()),2,'Legendäre: schwer');
 assert.equal(impactHaptic(hand(legend.id,1),none,play()),2,'auch die der KI');
 assert.equal(impactHaptic(hand(small.id),none,play()),0,'kleiner eigener Diener: leicht');
 assert.equal(impactHaptic(hand(small.id,1),none,play()),-1,'kleiner Diener der KI: nichts');
 assert.equal(impactHaptic(hand(big.id),none,play()),1,'schwere Karte: mittel');
 const attack={type:'attack',uid:'u1',target:'h1'},p0={active:0,players:[{hand:[]},{hand:[]}]},p1={active:1,players:[{hand:[]},{hand:[]}]};
 assert.equal(impactHaptic(p0,{events:[{type:'damage',target:'h1',n:3,hero:true}]},attack),2,'Treffer am Helden: schwer');
 assert.equal(impactHaptic(p0,{events:[{type:'damage',target:'u7',n:2}]},attack),1,'Treffer am Diener: mittel');
 assert.equal(impactHaptic(p1,{events:[{type:'damage',target:'h0',n:4,hero:true}]},attack),2,'die KI trifft Deinen Helden');
 assert.equal(impactHaptic(p0,{events:[{type:'damage',target:'u7',n:2},{type:'death',target:'u7',id:big.id}]},attack),2,'großer Diener fällt: schwer');
 assert.equal(impactHaptic(p0,{events:[{type:'damage',target:'u7',n:0}]},attack),1,'Angriff ohne Schaden (Segen): mittel über den Befehl');
 assert.match(read('viewmodel/match.js'),/const k=impactHaptic\(before,s,act\);if\(k>=0\)this\.ui\.haptic\(k\);/,'im Moment des Einschlags (impact)');
});
