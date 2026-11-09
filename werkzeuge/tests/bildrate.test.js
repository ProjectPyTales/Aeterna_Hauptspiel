// AP 2.7 (seit 1.37.0): Bildrate und Wärme – Ruhetakt, Auflösung, die sich anpasst, Tisch als eigene Ebene mit Wackeln als
// CSS-transform, keine Live-Schatten mehr, Teilchen des Hauptmenüs ruhen unter Fenstern. Gezeichnet und gemessen wird im Browser
// (werkzeuge/matchmessung.js: ruhe_gezeichnet ≈ 90 in 3 s, live_schatten 0); hier steht, was ohne Browser prüfbar ist.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const game=path.join(__dirname,'../../quellcode/assets/game'),read=f=>fs.readFileSync(path.join(game,f),'utf8');
const T=require(path.join(game,'view/match/anim.js'));

// Bildwechsel eines Displays mit hz Hertz über ms Millisekunden: wie viele Bilder zeichnet die Schleife?
function drawn(hz,ms,calm){T.reset();let n=0;for(let i=0;i*1000/hz<ms;i++)if(T.pace.due(i*1000/hz,calm))n++;return n;}

test('Ruhetakt: in Ruhe 30 Bilder je Sekunde auf 60, 90 und 120 Hz, sonst jedes Bild',()=>{
 for(const hz of [60,90,120]){const n=drawn(hz,3000,true);assert.ok(n>=88&&n<=92,hz+' Hz: '+n);assert.equal(drawn(hz,3000,false),3*hz,hz+' Hz voll');}
 // Die erste Bewegung schaltet sofort zurück: das nächste Bild wird gezeichnet, auch wenn das letzte eben erst kam.
 T.reset();assert.ok(T.pace.due(0,true));assert.equal(T.pace.due(8,true),false);assert.ok(T.pace.due(16,false));assert.equal(T.pace.resting,false);
 T.pace.due(20,true);assert.equal(T.pace.resting,true);
});

test('Auflösung: sinkt bei vielen späten Bildern stufenweise, erholt sich, flackert nicht',()=>{
 const r=new T.Resolution();assert.equal(r.cap,2);
 let now=0;const run=(ms,gap)=>{let changed=0;for(const end=now+ms;now<end;now+=gap)if(r.sample(now,gap))changed++;return changed;};
 assert.equal(run(10000,16.7),0,'60 fps: bleibt bei 2');assert.equal(r.cap,2);
 assert.equal(run(2500,33),1,'30 fps über zwei Sekunden: eine Stufe');assert.equal(r.cap,1.5);
 assert.equal(run(2900,33),0,'drei Sekunden Pause nach dem Wechsel');
 run(3000,33);assert.equal(r.cap,1.25);run(6000,33);assert.equal(r.cap,1,'unten ist 1');run(6000,40);assert.equal(r.cap,1);
 // Erholung: acht Sekunden fast alle pünktlich → eine Stufe hinauf.
 run(9000,16.7);assert.equal(r.cap,1.25);
 // Fällt sie gleich danach wieder, bleibt sie eine Minute unten.
 run(4000,33);assert.equal(r.cap,1);run(30000,16.7);assert.equal(r.cap,1,'gesperrt');run(40000,16.7);assert.ok(r.cap>1,'nach der Sperre wieder hinauf');
 // Liegt das Gerät unter der Stufe (Pixeldichte 1,34), geht es gleich auf die nächste wirksame Stufe (1,25), nicht auf 1,5.
 const d=new T.Resolution();let u=0;for(;u<2500;u+=33)d.sample(u,33,1.34);assert.equal(d.cap,1.25);
 const e=new T.Resolution();for(let v=0;v<5000;v+=33)e.sample(v,33,1);assert.equal(e.cap,2,'Pixeldichte 1: nichts zu senken');
 // Einzelne Ruckler und Pausen zählen nicht.
 const q=new T.Resolution();let t=0;for(let i=0;i<600;i++){t+=i%10?16.7:40;q.sample(t,i%10?16.7:40);}assert.equal(q.cap,2,'jedes zehnte Bild spät: bleibt');
 assert.equal(q.sample(t+400,400),false,'Lücke über 250 ms (Pause) zählt nicht');
});

test('Bildschleife: Tisch als Ebene, Wackeln als CSS-transform, Ruhetakt und Auflösung',()=>{
 const board=read('view/match/board.js'),render=read('view/match/render.js'),index=read('index.html'),app=read('app.js');
 assert.ok(index.indexOf('<canvas id="table"')>=0&&index.indexOf('<canvas id="table"')<index.indexOf('<canvas id="board"'),'Tisch unter dem Brett');
 assert.match(read('view/css/style.css'),/#table\{position:absolute;inset:0;display:none;width:1600px;height:800px;pointer-events:none\}/);
 assert.match(read('view/css/style.css'),/#board,#table\{transform-origin:800px 400px\}/,'Zoom um die Mitte wie bisher');
 assert.match(read('view/css/kit.css'),/#board,#table\{left:var\(--wing\)\}/,'beide Ebenen in der Mitte breiter Bildschirme');
 assert.match(app,/canvas\.style\.display=\$\('table'\)\.style\.display=next==='game'/);
 // R.draw zeichnet Tisch und Wackeln nur noch ohne Ebene (Renderer-Labor).
 assert.match(render,/R\.layered=false;/);assert.match(render,/if\(!R\.layered\)\{const sh=T\.shake\.offset\(\);/);
 assert.match(board,/R\.layered=!!tctx/);assert.match(board,/if\(sp===tableSprite\)return;/,'Tisch nur bei einem Wechsel');
 assert.match(board,/canvas\.style\.transform=tf;if\(under\)under\.style\.transform=tf;/);
 // Ruhetakt: Berührung, Ereignisse, Effekte, Flüge, Federn und Wackeln halten den vollen Takt.
 for(const k of ['!down','!vm.view.drag','now-wake>WAKE','!M.busy()','!CHF.busy()','!R.fx.length','!T.shake.trauma','!T.clock.stopped()'])assert.ok(board.includes(k),k);
 assert.match(board,/T\.pace\.due\(now,rest\)/);
 for(const k of ['begin','rebound','events','effect','present'])assert.match(board,new RegExp(k+':[^\\n]{0,40}?=>\\{woke\\(\\)'),k+' weckt');
 assert.match(board,/res\.sample\(now,now-drawnAt,R\.scale\)/);assert.match(board,/· Ruhe/,'Bildraten-Anzeige zeigt den Ruhetakt');
});

test('Hauptmenü: Teilchen ruhen, solange ein Fenster darüber liegt',()=>{
 const hall=read('view/hall.js');
 assert.match(hall,/H\.covered=\(\)=>!!document\.getElementById\('overlay'\)\?\.firstElementChild/);
 assert.match(hall,/if\(hall\.classList\.contains\('leaving'\)\|\|H\.covered\(\)\)\{requestAnimationFrame\(frame\);return;\}spawn\(dt\);H\.sparkFrames\+\+;/);
});
