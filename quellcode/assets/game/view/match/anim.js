/* Animation toolkit (AP 3.1): easing curves, tweens, timelines, springs, hit stop and camera shake by weight – and the
 * one clock all match animations read. The clock runs at the tempo setting (settings.speed) and stands still during a
 * hit stop, so card flights, impacts, the turn tablet and the ether dial follow both. Under reduced motion there is
 * neither hit stop nor shake. No DOM: tested in Node (werkzeuge/tests/spielgefuehl.test.js). */
(function(root){'use strict';
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),mix=(a,b,t)=>a+(b-a)*t;
// Easing curves on 0…1 (t → progress). Back and elastic overshoot, bounce lands like a dropped stone.
const BACK=1.70158;
const ease={linear:t=>t,inQuad:t=>t*t,outQuad:t=>t*(2-t),inCubic:t=>t*t*t,outCubic:t=>1-Math.pow(1-t,3),
 inOutCubic:t=>t<.5?4*t*t*t:1-Math.pow(2-2*t,3)/2,inBack:t=>(BACK+1)*t*t*t-BACK*t*t,
 outBack:t=>1+(BACK+1)*Math.pow(t-1,3)+BACK*Math.pow(t-1,2),
 outElastic:t=>t<=0?0:t>=1?1:Math.pow(2,-10*t)*Math.sin((t*10-.75)*2*Math.PI/3)+1,
 outBounce:t=>{const n=7.5625,d=2.75;if(t<1/d)return n*t*t;if(t<2/d)return n*(t-=1.5/d)*t+.75;if(t<2.5/d)return n*(t-=2.25/d)*t+.9375;return n*(t-=2.625/d)*t+.984375;}};
const curve=e=>typeof e==='function'?e:ease[e]||ease.linear;
// Value of a tween from a to b over d ms at local time t.
const tween=(t,a,b,d,e='outCubic')=>mix(a,b,curve(e)(clamp(d>0?t/d:1)));
// A timeline is a row of named phases [{name, d (ms), ease}]; at(t) says which phase runs and how far (raw and eased).
function timeline(phases){let total=0;const list=phases.map(p=>{const x={...p,start:total};total+=p.d;return x;});
 const at=t=>{let i=list.findIndex(p=>t<p.start+p.d);if(i<0)i=list.length-1;const p=list[i],raw=clamp(p.d?(t-p.start)/p.d:1);
  return {name:p.name,i,raw,q:curve(p.ease)(raw),done:t>=total};};
 const find=name=>list.find(p=>p.name===name);
 return {phases:list,duration:total,at,start:name=>find(name)?.start??0,end:name=>{const p=find(name);return p?p.start+p.d:0;}};}
// Damped spring towards a target: stiffness (1/s²) and damping (1/s) as in physics; step(dt) in ms, in steps of at most
// 1/240 s, so a long frame stays stable. Hand cards, the tilt of a dragged card and the squash of a landing plaque use it.
class Spring{
 constructor(value=0,{stiffness=170,damping=20}={}){this.value=value;this.target=value;this.velocity=0;this.stiffness=stiffness;this.damping=damping;}
 to(target){this.target=target;return this;}
 kick(v){this.velocity+=v;return this;}
 step(dt){let t=clamp(dt,0,100)/1000;while(t>1e-6){const h=Math.min(t,1/240),a=-this.stiffness*(this.value-this.target)-this.damping*this.velocity;
   this.velocity+=a*h;this.value+=this.velocity*h;t-=h;}return this.value;}
 get settled(){return Math.abs(this.value-this.target)<1e-3&&Math.abs(this.velocity)<1e-2;}
}
// The match clock. tick(real) once per picture: time advances by the real gap × speed, at most 100 ms per picture (after
// a pause the animations continue instead of jumping), and not at all during a hit stop.
const clock={time:0,real:null,until:-Infinity,speed:1,reduced:false,dt:0,realDt:0,
 tick(real){const last=this.real??real;this.real=real;this.realDt=Math.max(0,real-last);
  this.dt=Math.min(100,Math.max(0,real-Math.max(last,this.until)))*this.speed;this.time+=this.dt;return this.time;},
 now(){return this.time;},
 // Hit stop: everything stands still for ms (40–80 at an impact), shorter at a higher tempo.
 stop(ms){if(this.reduced||!(ms>0))return;this.until=Math.max(this.until,(this.real??0)+ms/this.speed);},
 stopped(){return this.real!=null&&this.real<this.until;}};
// Camera shake by weight (0…1, „trauma“): the offset grows with the square of the trauma and decays in real time,
// so the table still trembles while a hit stop freezes the pieces. A jolt adds a short zoom for the heaviest landings.
const shake={trauma:0,zoom:0,max:15,
 add(weight,jolt=0){if(clock.reduced)return;this.trauma=clamp(this.trauma+weight);this.zoom=Math.max(this.zoom,jolt);},
 offset(){const d=clock.realDt;this.trauma=Math.max(0,this.trauma-d/600);this.zoom=Math.max(0,this.zoom-d/2600);
  const k=this.trauma*this.trauma*this.max,t=(clock.real??0)/1000;
  return {x:k*(Math.sin(t*61)*.6+Math.sin(t*97+1.3)*.4),y:k*.6*(Math.sin(t*73+2.1)*.6+Math.sin(t*113)*.4),zoom:1+this.zoom*this.zoom*.9};}};
const reset=()=>{Object.assign(clock,{time:0,real:null,until:-Infinity,speed:1,reduced:false,dt:0,realDt:0});shake.trauma=0;shake.zoom=0;pace.reset();};

// Ruhetakt (AP 2.7): Bewegt sich nichts (kein Finger, kein Flug, kein Effekt, keine Feder), genügen 30 Bilder je Sekunde für
// Atmen, Leuchten und Dioramen – auf 60, 90 und 120 Hz gleich. due(now, calm) sagt, ob dieses Bild gezeichnet wird; im vollen
// Takt immer. Ein wenig Spielraum (4 ms), damit auf 60 Hz wirklich jedes zweite Bild kommt und keines doppelt wartet.
const pace={REST:1000/30,last:-Infinity,resting:false,
 due(now,calm){this.resting=!!calm;if(!calm||now-this.last>=this.REST-4){this.last=now;return true;}return false;},
 reset(){this.last=-Infinity;this.resting=false;}};

// Auflösung, die sich anpasst (AP 2.7): Die Schleife meldet im vollen Takt den Abstand jedes Bildes. Kommen in zwei Sekunden mehr
// als ein Viertel zu spät (über LATE ms, also unter etwa 42 Bildern je Sekunde), sinkt die Stufe (2 → 1,5 → 1,25 → 1); laufen acht
// Sekunden fast alle pünktlich (höchstens 5 % zu spät), steigt sie wieder. Nach jedem Wechsel drei Sekunden Pause (die Leinwand
// wird neu angelegt). Muss eine Stufe kurz nach dem Steigen wieder fallen, bleibt sie eine Minute – so flackert nichts.
// Obergrenze bleibt das Gerät bzw. „Grafik: Hoch“ (board.js), „Sparsam“ ist ohnehin 1.
class Resolution{
 constructor({steps=[2,1.5,1.25,1],late=24,down=2000,up=8000,hold=3000,lock=60000}={}){
  Object.assign(this,{steps,late,down,up,hold,lock});this.level=0;this.samples=[];this.until=0;this.raised=-Infinity;this.locked=0;}
 get cap(){return this.steps[this.level];}
 // gap: Abstand zum vorigen Bild im vollen Takt (ms). Lücken über 250 ms (Pause, Wechsel des Bildschirms) zählen nicht.
 // scale: die Pixeldichte, die gerade gilt (das Gerät kann unter der Stufe liegen) – hinab geht es auf die nächste Stufe darunter,
 // sonst bliebe ein Schritt ohne Wirkung. → true, wenn sich die Stufe geändert hat.
 sample(now,gap,scale=this.cap){if(!(gap>0)||gap>250||now<this.until)return false;
  this.samples.push([now,gap>this.late]);while(this.samples.length&&now-this.samples[0][0]>this.up)this.samples.shift();
  const share=ms=>{const s=this.samples.filter(x=>now-x[0]<=ms);return s.length?s.filter(x=>x[1]).length/s.length:0;},span=now-this.samples[0][0];
  const below=this.steps.findIndex(x=>x<Math.min(scale,this.cap)-.01);
  if(below>this.level&&span>=this.down*.9&&this.samples.length>=20&&share(this.down)>.25){
   if(now-this.raised<10000)this.locked=now+this.lock;return this.change(now,below-this.level);}
  if(this.level>0&&now>=this.locked&&span>=this.up*.9&&share(this.up)<=.05){this.raised=now;return this.change(now,-1);}
  return false;}
 change(now,d){this.level+=d;this.samples=[];this.until=now+this.hold;return true;}
 reset(){this.level=0;this.samples=[];this.until=0;this.raised=-Infinity;this.locked=0;}
}
const api={clamp,mix,ease,curve,tween,timeline,Spring,clock,shake,pace,Resolution,reset};
if(typeof module!=='undefined')module.exports=api;else root.CHT=api;
})(typeof globalThis!=='undefined'?globalThis:this);
