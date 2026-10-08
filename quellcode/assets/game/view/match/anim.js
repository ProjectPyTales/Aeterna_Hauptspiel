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
const reset=()=>{Object.assign(clock,{time:0,real:null,until:-Infinity,speed:1,reduced:false,dt:0,realDt:0});shake.trauma=0;shake.zoom=0;};
const api={clamp,mix,ease,curve,tween,timeline,Spring,clock,shake,reset};
if(typeof module!=='undefined')module.exports=api;else root.CHT=api;
})(typeof globalThis!=='undefined'?globalThis:this);
