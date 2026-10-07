/* Aeterna main menu painted from the concept art. The wall, ring, plates and medallions are one
 * image; every control is cut out of it as its own layer (CSS clip-path over the same picture),
 * so it can sink, glow and turn while the painting stays intact. No game state lives here. */
(function(){'use strict';
const H=window.CHH={};
// Picture geometry: concept art is 2000 × 1116; the delivered file is 2602 × 1084 (24 px cut at the
// top, 301 px added left). The stage shows 2168 × 1084 of it, i.e. concept x −84 … 2084.
const ART={src:'assets/art/hall-aeterna.webp',w:2602,h:1084,left:301,top:-24,stage:217},K=800/ART.h;
const sx=x=>(x+ART.left-ART.stage)*K,sy=y=>(y+ART.top)*K,f=n=>Math.round(n*10)/10;
H.ART=ART;H.bgWidth=ART.w*K;H.bgOffset=ART.stage*K;
// Measured on hauptmenue-konzept.jpg (concept pixels).
const PLATES=[
 [[750,319],[1240,319],[1284,382],[1240,452],[750,452],[708,382]],
 [[670,457],[1322,457],[1367,522],[1322,590],[670,590],[626,522]],
 [[670,598],[1322,598],[1367,661],[1322,730],[670,730],[626,661]],
 [[746,737],[1247,737],[1291,800],[1247,868],[746,868],[702,800]]];
// Medallion centre, rail rectangle and label centre for the four rails. Only the rail strip and the
// round medallion take touches (see hall.css), so neighbouring plates keep their full area.
const RAILS={
 quests:{c:[537,716],rail:[-90,668,470,768],label:[182,714],accent:'#5f7fd0'},
 bazaar:{c:[647,937],rail:[-90,885,580,990],label:[238,936],accent:'#e8b04a'},
 collection:{c:[1455,716],rail:[1530,668,2090,768],label:[1812,714],accent:'#a5b062'},
 packs:{c:[1346,936],rail:[1420,885,2090,990],label:[1758,936],accent:'#d8644e'}};
const MEDAL=86,KNOB={c:[1913.5,87.5],r:63,rim:76},STAR=[997,110],RING=[997,597],GOLD_LINE={c:[996,595],rx:368,ry:383};
H.ring={x:sx(RING[0]),y:sy(RING[1])};H.star={x:sx(STAR[0]),y:sy(STAR[1])};
const box=pts=>{const xs=pts.map(p=>sx(p[0])),ys=pts.map(p=>sy(p[1]));return {x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)};};
const pos=b=>`left:${f(b.x)}px;top:${f(b.y)}px;width:${f(b.w)}px;height:${f(b.h)}px`;
// A layer showing the picture exactly where it sits on the stage.
const cut=b=>`background-position:${f(-b.x-H.bgOffset)}px ${f(-b.y)}px`;
const poly=(pts,b)=>`polygon(${pts.map(([x,y])=>`${f(sx(x)-b.x)}px ${f(sy(y)-b.y)}px`).join(',')})`;
const disc=(c,r)=>({x:sx(c[0]-r),y:sy(c[1]-r),w:2*r*K,h:2*r*K});
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Pressed and lit come from the view model (viewmodel/menu.js); a press is a data-cmd like everywhere else.
const state=(st,id)=>`${st.pressed===id?' pressed':''}${st.lit===id?' lit':''}`;
function plate(p,i,st){const b=box(PLATES[i]),clip=poly(PLATES[i],b);
 return `<button class="cut plate ${p.gold?'gold':''}${state(st,p.go)}" style="${pos(b)};--i:${i}" aria-label="${esc(p.title)}: ${esc(p.sub)}" data-cmd="press" data-a="${p.go}" data-key="plate-${p.go}"><span class="slot" style="clip-path:${clip}"></span><span class="face" style="clip-path:${clip};${cut(b)}"></span><span class="shine" style="clip-path:${clip}"></span><span class="label"><b data-own="style">${esc(p.title)}</b><small data-own="style">${esc(p.sub)}</small></span></button>`;}
function rail(id,title,badge,i,st){const g=RAILS[id],m=disc(g.c,MEDAL),[x0,y0,x1,y1]=g.rail,rb={x:sx(x0),y:sy(y0),w:(x1-x0)*K,h:(y1-y0)*K};
 const b={x:Math.min(m.x,rb.x),y:Math.min(m.y,rb.y)};b.w=Math.max(m.x+m.w,rb.x+rb.w)-b.x;b.h=Math.max(m.y+m.h,rb.y+rb.h)-b.y;
 const R=MEDAL*K,cx=m.x-b.x+R,cy=m.y-b.y+R,rx=rb.x-b.x,ry=rb.y-b.y;
 const lx=sx(g.label[0])-b.x,ly=sy(g.label[1])-b.y,local={x:m.x,y:m.y,w:m.w,h:m.h};
 return `<button class="cut rail${state(st,id)}" style="${pos(b)};--accent:${g.accent};--i:${i}" aria-label="${esc(title)}${badge?' ('+badge+' neu)':''}" data-cmd="press" data-a="${id}" data-key="rail-${id}"><span class="rail-flash" style="${pos({x:rx,y:ry,w:rb.w,h:rb.h})}"></span><span class="label" style="left:${f(lx)}px;top:${f(ly)}px">${esc(title)}</span><span class="medal" style="${pos({x:cx-R,y:cy-R,w:2*R,h:2*R})}"><span class="slot"></span><span class="glow"></span><span class="face" style="${cut(local)}"></span><span class="sheen"></span></span>${badge?`<span class="seal" style="left:${f(cx+R*.64)}px;top:${f(cy-R*.64)}px">${badge}</span>`:''}</button>`;}
// p: {gold, quests, packs, plates:[{go,title,sub,gold}], version, intro, pressed, lit, knob} – see viewmodel/menu.js.
// The hall element's classes belong to the entrance and the ring transition (data-own), the sparks canvas
// to its own loop (data-static).
H.render=p=>{const k=disc(KNOB.c,KNOB.rim),face=disc(KNOB.c,KNOB.r);
 const knob=`<button class="cut knob${state(p,'settings')}" style="${pos(k)}" aria-label="Einstellungen" data-cmd="press" data-a="settings"><span class="face" style="${pos({x:face.x-k.x,y:face.y-k.y,w:face.w,h:face.h})};${cut(face)};--turn:${p.knob||0}deg"></span></button>`;
 const title=`<header class="hall-title" style="${pos({x:sx(74),y:sy(112),w:(537-74)*K,h:(276-112)*K})}"><h1>AETERNA</h1><p>Das historische Kartenduell</p></header>`;
 const gold=`<div class="hall-gold" role="status" aria-label="${p.gold} Gold" style="${pos({x:sx(1662),y:sy(52),w:(1832-1662)*K,h:(112-52)*K})}"><b>${p.gold}</b></div>`;
 return `<div class="hall aeterna ${p.intro?'intro':''}" data-own="class" style="--bgw:${f(H.bgWidth)}px;--ring-x:${f(H.ring.x)}px;--ring-y:${f(H.ring.y)}px"><div class="hall-zoom" style="transform-origin:${f(H.ring.x)}px ${f(H.ring.y)}px"><div class="hall-bg"></div>
<div class="hall-star" style="left:${f(H.star.x)}px;top:${f(H.star.y)}px"></div>${title}${gold}${knob}
<nav class="hall-modes" aria-label="Spielmodi">${p.plates.map((x,i)=>plate(x,i,p)).join('')}</nav>
<nav class="hall-rails" aria-label="Menü">${rail('quests','Aufgaben',p.quests,0,p)}${rail('bazaar','Basar',0,1,p)}${rail('collection','Sammlung',0,2,p)}${rail('packs','Kartenpakete',p.packs,3,p)}</nav>
<div class="hall-rays" aria-hidden="true"><i></i><i></i><i></i><i></i></div><canvas class="hall-sparks" width="1600" height="800" aria-hidden="true" data-static></canvas>
<footer class="hall-foot">Version ${esc(p.version)} · ${CHD.cards.length} Karten · ${CHD.heroes.length} Helden · offline</footer></div></div>`;};
// Long inscriptions shrink until they fit between the rivets of their plate. Each label is measured once
// (a plate with new text is a new node); the patcher leaves the fitted size alone (data-own="style").
H.fit=el=>{for(const t of el.querySelectorAll('.plate .label b,.plate .label small')){if(t.__fit)continue;t.__fit=true;const max=t.closest('.plate').offsetWidth*(t.tagName==='B'?.72:.8),w=t.offsetWidth;if(w<=max)continue;
 const cs=getComputedStyle(t),k=max/w*.98;t.style.fontSize=parseFloat(cs.fontSize)*k+'px';t.style.letterSpacing=(parseFloat(cs.letterSpacing)||0)*k+'px';}};
// The entrance (≤ 700 ms) ends on any touch; that touch does not trigger a button.
H.mount=(el,done=()=>{})=>{H.fit(el);const hall=el.querySelector('.hall');if(!hall)return;const fx=sparks(hall);if(!hall.classList.contains('intro'))return;let swallow=false;
 if(fx)setTimeout(()=>fx.burst(H.star.x,H.star.y,14,.9),420);
 const end=()=>{hall.classList.remove('intro');clearTimeout(timer);done();};const timer=setTimeout(end,760);
 hall.addEventListener('pointerdown',()=>{if(hall.classList.contains('intro')){swallow=true;end();}},{capture:true});
 hall.addEventListener('click',ev=>{if(swallow){swallow=false;ev.stopPropagation();ev.preventDefault();}},{capture:true});};
// Golden particles on one canvas over the hall: embers rise through the warm light, dust drifts in the rays,
// glints flicker at the star, two comets run along the gold line of the ring, and every press or mouse
// movement throws sparks. Saturated gold with a warm halo, so it reads on the light stone; all motion is
// per second, so 60, 90 and 120 Hz look alike.
let SPRITES=null;
function sprites(){const make=(n,draw)=>{const c=document.createElement('canvas');c.width=c.height=n;draw(c.getContext('2d'),n/2);return c;};
 const glow=make(64,(g,r)=>{const d=g.createRadialGradient(r,r,0,r,r,r);[[0,'#fffef2ff'],[.12,'#fff0a8ff'],[.26,'#ffc93cf2'],[.42,'#f29a1c73'],[.7,'#e07a101f'],[1,'#e07a1000']].forEach(([o,col])=>d.addColorStop(o,col));g.fillStyle=d;g.fillRect(0,0,2*r,2*r);});
 const star=make(64,(g,r)=>{for(const [w,h] of [[2*r,r*.16],[r*.16,2*r]]){const d=g.createRadialGradient(r,r,0,r,r,r);d.addColorStop(0,'#fff6c8ff');d.addColorStop(.5,'#f5b638b0');d.addColorStop(1,'#f5b63800');g.fillStyle=d;g.fillRect(r-w/2,r-h/2,w,h);}g.drawImage(glow,r/2,r/2,r,r);});
 const orb=make(64,(g,r)=>{const d=g.createRadialGradient(r,r,0,r,r,r);[[0,'#fff3c0cc'],[.35,'#ffd46a66'],[1,'#ffc04000']].forEach(([o,col])=>d.addColorStop(o,col));g.fillStyle=d;g.fillRect(0,0,2*r,2*r);});
 return {glow,star,orb};}
function sparks(hall){const canvas=hall.querySelector('.hall-sparks');if(!canvas||!canvas.getContext||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return null;
 SPRITES=SPRITES||sprites();const g=canvas.getContext('2d'),P=[],rnd=(a,b)=>a+Math.random()*(b-a),gl={cx:sx(GOLD_LINE.c[0]),cy:sy(GOLD_LINE.c[1]),rx:GOLD_LINE.rx*K,ry:GOLD_LINE.ry*K};
 let res=1,last=performance.now(),due={ember:0,dust:0,glint:0,orb:0},trailAt=0;
 // Backing store: 1:1 when the stage is shown at about its own size (a scaled canvas over the light rays was
 // costly to composite there), otherwise 0.75 of the stage – the soft glows need no more pixels.
 const fit=()=>{const r=canvas.getBoundingClientRect(),px=r.width/1600*(window.devicePixelRatio||1),k=Math.max(.4,Math.min(px,px<=1.1?1:.75));if(Math.abs(k-res)>.02||canvas.width!==Math.round(1600*k)){res=k;canvas.width=Math.round(1600*k);canvas.height=Math.round(800*k);}};
 fit();window.addEventListener('resize',fit);
 const add=p=>{if(P.length<260)P.push(Object.assign({age:0,vx:0,vy:0,g:0,drag:0,wob:0,tw:0,ph:Math.random()*6.3,a:1,sprite:SPRITES.glow},p));};
 const comets=[0,1].map(i=>({t:i*Math.PI+rnd(0,1),w:rnd(.32,.42)*(i?-1:1),trail:[]}));
 const api={burst(x,y,n=24,power=1){for(let i=0;i<n;i++){const a=rnd(0,Math.PI*2),v=rnd(90,320)*power;add({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-70*power,g:420,drag:1.5,s:rnd(12,24)*Math.min(1.3,power),life:rnd(.5,1.05),sprite:i%4?SPRITES.glow:SPRITES.star});}}};
 const local=ev=>{const r=canvas.getBoundingClientRect();return [(ev.clientX-r.left)/r.width*1600,(ev.clientY-r.top)/r.height*800];};
 hall.addEventListener('pointerdown',ev=>{if(ev.target.closest('button.cut')){const [x,y]=local(ev);api.burst(x,y,ev.target.closest('.plate')?26:20);}},{passive:true});
 hall.addEventListener('pointermove',ev=>{if(ev.pointerType!=='mouse'||ev.timeStamp-trailAt<28)return;trailAt=ev.timeStamp;const [x,y]=local(ev);
  add({x:x+rnd(-4,4),y:y+rnd(-4,4),vx:rnd(-30,30),vy:rnd(-60,-10),g:40,s:rnd(9,16),life:rnd(.45,.85)});},{passive:true});
 const spawn=dt=>{
  for(due.ember+=dt*7;due.ember>=1;due.ember--)add({x:rnd(0,1600),y:rnd(380,830),vx:rnd(-10,10),vy:rnd(-55,-20),s:rnd(10,20),life:rnd(4,8),wob:rnd(8,26),tw:rnd(2,5),a:rnd(.7,1)});
  for(due.dust+=dt*2.5;due.dust>=1;due.dust--)add({x:rnd(820,1600),y:rnd(0,640),vx:rnd(-9,5),vy:rnd(-9,6),s:rnd(6,11),life:rnd(6,10),wob:rnd(3,8),tw:rnd(.8,2),a:rnd(.4,.65)});
  for(due.orb+=dt*.35;due.orb>=1;due.orb--)add({x:rnd(100,1500),y:rnd(120,760),vx:rnd(-6,6),vy:rnd(-12,-3),s:rnd(30,48),life:rnd(7,12),wob:rnd(4,10),tw:rnd(.4,1),a:rnd(.35,.6),sprite:SPRITES.orb});
  for(due.glint+=dt*.5;due.glint>=1;due.glint--)add({x:H.star.x+rnd(-55,55),y:H.star.y+rnd(-25,35),s:rnd(10,18),life:rnd(.5,.9),sprite:SPRITES.star,a:.7});};
 const draw=(sprite,x,y,s,a)=>{if(a<=.01)return;g.globalAlpha=Math.min(1,a);g.drawImage(sprite,x-s/2,y-s/2,s,s);};
 const frame=now=>{if(!canvas.isConnected){window.removeEventListener('resize',fit);return;}
  const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;
  if(hall.classList.contains('leaving')){requestAnimationFrame(frame);return;}spawn(dt);
  g.setTransform(res,0,0,res,0,0);g.clearRect(0,0,1600,800);
  for(let i=P.length-1;i>=0;i--){const p=P[i];p.age+=dt;const t=p.age/p.life;if(t>=1){P.splice(i,1);continue;}
   const k=Math.exp(-p.drag*dt);p.vx*=k;p.vy=p.vy*k+p.g*dt;p.x+=p.vx*dt+(p.wob?Math.cos(p.ph+p.age*1.3)*p.wob*dt:0);p.y+=p.vy*dt;
   const fade=Math.min(1,t*6)*Math.min(1,(1-t)*3),twinkle=p.tw?.62+.38*Math.sin(p.ph+p.age*p.tw*3):1;
   draw(p.sprite,p.x,p.y,p.s*(p.sprite===SPRITES.star?.75+.5*Math.sin(Math.PI*t):1),p.a*fade*twinkle);}
  for(const c of comets){c.t+=c.w*dt;const x=gl.cx+Math.cos(c.t)*gl.rx,y=gl.cy+Math.sin(c.t)*gl.ry;c.trail.unshift([x,y]);if(c.trail.length>9)c.trail.pop();
   const pulse=.8+.2*Math.sin(now/260+c.t*3);for(let j=c.trail.length-1;j>=0;j--)draw(SPRITES.glow,c.trail[j][0],c.trail[j][1],(24-j*1.6)*(j?1:1.2),(1-j/9)*pulse);if(Math.random()<dt*8)add({x,y,vx:rnd(-24,24),vy:rnd(-36,12),s:rnd(8,13),life:rnd(.35,.7)});}
  requestAnimationFrame(frame);};
 requestAnimationFrame(frame);H.particles=()=>P.length;return api;}
// MVVM view for the menu: the hall re-renders from viewmodel/menu.js and keeps its nodes.
H.view={render:vm=>H.render(vm.view),mounted:(el,vm)=>H.mount(el,()=>vm.introDone()),updated:el=>H.fit(el)};
// Fonts and the decoded picture are ready before the hall is shown, so nothing pops in late.
// progress(done,total) drives the loading bar (AP 2.2).
H.preload=(progress=()=>{})=>{let done=0;const parts=[...['700 66px "Aeterna Zier"','700 33px "Aeterna Titel"','600 16px "Aeterna Titel"','500 17px "Aeterna Text"','700 23px "Aeterna Text"'].map(font=>document.fonts.load(font).catch(()=>null)),
 new Promise(resolve=>{const im=new Image();H.picture=im;im.onload=()=>(im.decode?im.decode():Promise.resolve()).catch(()=>null).then(resolve);im.onerror=()=>resolve();im.src=ART.src;}),document.fonts.ready];
 return Promise.all(parts.map(p=>p.then(()=>progress(++done,parts.length))));};
// Ring transition: light bursts from the star, the hall zooms into the ring, the next screen appears.
function flash(){let el=document.getElementById('ring-flash');if(!el){el=document.createElement('div');el.id='ring-flash';el.innerHTML='<i></i>';document.getElementById('stage').appendChild(el);}
 el.style.setProperty('--fx',f(H.star.x)+'px');el.style.setProperty('--fy',f(H.star.y)+'px');return el;}
const T={zoom:260,fade:160,flashIn:110,arrive:380};H.T=T;
H.leave=(swap,done)=>{const hall=document.querySelector('#ui .hall'),fl=flash();fl.className='burst';if(hall)hall.classList.add('leaving');
 setTimeout(()=>{swap();fl.className='fade';setTimeout(()=>{fl.className='';done();},T.fade);},T.zoom);};
H.arrive=(swap,done)=>{const fl=flash();fl.className='cover';
 setTimeout(()=>{swap();const hall=document.querySelector('#ui .hall');if(hall){hall.classList.add('arriving');setTimeout(()=>hall.classList.remove('arriving'),T.arrive);}fl.className='fade';setTimeout(()=>{fl.className='';done();},T.fade+40);},T.flashIn);};
})();
