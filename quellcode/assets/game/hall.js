/* Aeterna main menu painted from the concept art. The wall, ring, plates and medallions are one
 * image; every control is cut out of it as its own layer (CSS clip-path over the same picture),
 * so it can sink, glow and turn while the painting stays intact. No game state lives here. */
(function(){'use strict';
const H=window.CHH={};
// Picture geometry: concept art is 2000 × 1116; the delivered file is 2602 × 1084 (24 px cut at the
// top, 301 px added left). The stage shows 2168 × 1084 of it, i.e. concept x −84 … 2084.
const ART={src:'assets/art/hall-aeterna.png',w:2602,h:1084,left:301,top:-24,stage:217},K=800/ART.h;
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
const MEDAL=86,KNOB={c:[1913.5,87.5],r:63,rim:76},STAR=[997,110],RING=[997,597];
H.ring={x:sx(RING[0]),y:sy(RING[1])};H.star={x:sx(STAR[0]),y:sy(STAR[1])};
const box=pts=>{const xs=pts.map(p=>sx(p[0])),ys=pts.map(p=>sy(p[1]));return {x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)};};
const pos=b=>`left:${f(b.x)}px;top:${f(b.y)}px;width:${f(b.w)}px;height:${f(b.h)}px`;
// A layer showing the picture exactly where it sits on the stage.
const cut=b=>`background-position:${f(-b.x-H.bgOffset)}px ${f(-b.y)}px`;
const poly=(pts,b)=>`polygon(${pts.map(([x,y])=>`${f(sx(x)-b.x)}px ${f(sy(y)-b.y)}px`).join(',')})`;
const disc=(c,r)=>({x:sx(c[0]-r),y:sy(c[1]-r),w:2*r*K,h:2*r*K});
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Dust and sparks drifting through the light from the upper right.
const motes=()=>{let o='',seed=7;const r=()=>(seed=(seed*16807)%2147483647)/2147483647;
 for(let i=0;i<26;i++){const x=480+r()*1100,y=60+r()*640,s=2+r()*4.5,d=7+r()*9,spark=r()<.35;
  o+=`<i class="${spark?'spark':''}" style="left:${f(x)}px;top:${f(y)}px;width:${f(s)}px;height:${f(s)}px;--dx:${f((r()-.5)*70)}px;--dy:${f(-60-r()*130)}px;animation-duration:${f(d)}s;animation-delay:${f(-r()*d)}s"></i>`;}
 return o;};
function plate(p,i){const b=box(PLATES[i]),clip=poly(PLATES[i],b);
 return `<button class="cut plate ${p.gold?'gold':''}" style="${pos(b)};--i:${i}" aria-label="${esc(p.title)}: ${esc(p.sub)}" onclick="App.menuGo(this,'${p.go}')"><span class="slot" style="clip-path:${clip}"></span><span class="face" style="clip-path:${clip};${cut(b)}"></span><span class="label"><b>${esc(p.title)}</b><small>${esc(p.sub)}</small></span></button>`;}
function rail(id,title,badge,i){const g=RAILS[id],m=disc(g.c,MEDAL),[x0,y0,x1,y1]=g.rail,rb={x:sx(x0),y:sy(y0),w:(x1-x0)*K,h:(y1-y0)*K};
 const b={x:Math.min(m.x,rb.x),y:Math.min(m.y,rb.y)};b.w=Math.max(m.x+m.w,rb.x+rb.w)-b.x;b.h=Math.max(m.y+m.h,rb.y+rb.h)-b.y;
 const R=MEDAL*K,cx=m.x-b.x+R,cy=m.y-b.y+R,rx=rb.x-b.x,ry=rb.y-b.y;
 const lx=sx(g.label[0])-b.x,ly=sy(g.label[1])-b.y,local={x:m.x,y:m.y,w:m.w,h:m.h};
 return `<button class="cut rail" style="${pos(b)};--accent:${g.accent};--i:${i}" aria-label="${esc(title)}${badge?' ('+badge+' neu)':''}" onclick="App.menuGo(this,'${id}')"><span class="rail-flash" style="${pos({x:rx,y:ry,w:rb.w,h:rb.h})}"></span><span class="label" style="left:${f(lx)}px;top:${f(ly)}px">${esc(title)}</span><span class="medal" style="${pos({x:cx-R,y:cy-R,w:2*R,h:2*R})}"><span class="slot"></span><span class="glow"></span><span class="face" style="${cut(local)}"></span><span class="sheen"></span></span>${badge?`<span class="seal" style="left:${f(cx+R*.64)}px;top:${f(cy-R*.64)}px">${badge}</span>`:''}</button>`;}
// p: {gold, quests, packs, plates:[{go,title,sub,gold}], version, intro}
H.render=p=>{const k=disc(KNOB.c,KNOB.rim),face=disc(KNOB.c,KNOB.r);
 const knob=`<button class="cut knob" style="${pos(k)}" aria-label="Einstellungen" onclick="App.menuGo(this,'settings')"><span class="face" style="${pos({x:face.x-k.x,y:face.y-k.y,w:face.w,h:face.h})};${cut(face)}"></span></button>`;
 const title=`<header class="hall-title" style="${pos({x:sx(74),y:sy(112),w:(537-74)*K,h:(276-112)*K})}"><h1>AETERNA</h1><p>Das historische Kartenduell</p></header>`;
 const gold=`<div class="hall-gold" role="status" aria-label="${p.gold} Gold" style="${pos({x:sx(1662),y:sy(52),w:(1832-1662)*K,h:(112-52)*K})}"><b>${p.gold}</b></div>`;
 return `<div class="hall aeterna ${p.intro?'intro':''}" style="--bgw:${f(H.bgWidth)}px;--ring-x:${f(H.ring.x)}px;--ring-y:${f(H.ring.y)}px"><div class="hall-zoom" style="transform-origin:${f(H.ring.x)}px ${f(H.ring.y)}px"><div class="hall-bg"></div>
<div class="hall-star" style="left:${f(H.star.x)}px;top:${f(H.star.y)}px"></div>${title}${gold}${knob}
<nav class="hall-modes" aria-label="Spielmodi">${p.plates.map(plate).join('')}</nav>
<nav class="hall-rails" aria-label="Menü">${rail('quests','Aufgaben',p.quests,0)}${rail('bazaar','Basar',0,1)}${rail('collection','Sammlung',0,2)}${rail('packs','Kartenpakete',p.packs,3)}</nav>
<div class="hall-rays" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="hall-motes" aria-hidden="true">${motes()}</div>
<footer class="hall-foot">Version ${esc(p.version)} · 140 Karten · 10 Helden · offline</footer></div></div>`;};
// Long inscriptions shrink until they fit between the rivets of their plate.
H.fit=el=>{for(const t of el.querySelectorAll('.plate .label b,.plate .label small')){const max=t.closest('.plate').offsetWidth*(t.tagName==='B'?.72:.8),w=t.offsetWidth;if(w<=max)continue;
 const cs=getComputedStyle(t),k=max/w*.98;t.style.fontSize=parseFloat(cs.fontSize)*k+'px';t.style.letterSpacing=(parseFloat(cs.letterSpacing)||0)*k+'px';}};
// The entrance (≤ 700 ms) ends on any touch; that touch does not trigger a button.
H.mount=el=>{H.fit(el);const hall=el.querySelector('.hall');if(!hall||!hall.classList.contains('intro'))return;let swallow=false;
 const end=()=>{hall.classList.remove('intro');clearTimeout(timer);};const timer=setTimeout(end,760);
 hall.addEventListener('pointerdown',()=>{if(hall.classList.contains('intro')){swallow=true;end();}},{capture:true});
 hall.addEventListener('click',ev=>{if(swallow){swallow=false;ev.stopPropagation();ev.preventDefault();}},{capture:true});};
// Fonts and the decoded picture are ready before the hall is shown, so nothing pops in late.
H.preload=()=>Promise.all([...['700 66px "Aeterna Zier"','700 33px "Aeterna Titel"','600 16px "Aeterna Titel"','500 17px "Aeterna Text"','700 23px "Aeterna Text"'].map(font=>document.fonts.load(font).catch(()=>null)),
 new Promise(resolve=>{const im=new Image();H.picture=im;im.onload=()=>(im.decode?im.decode():Promise.resolve()).catch(()=>null).then(resolve);im.onerror=()=>resolve();im.src=ART.src;})]);
// Ring transition: light bursts from the star, the hall zooms into the ring, the next screen appears.
function flash(){let el=document.getElementById('ring-flash');if(!el){el=document.createElement('div');el.id='ring-flash';el.innerHTML='<i></i>';document.getElementById('stage').appendChild(el);}
 el.style.setProperty('--fx',f(H.star.x)+'px');el.style.setProperty('--fy',f(H.star.y)+'px');return el;}
const T={zoom:280,fade:170,flashIn:110,arrive:380};H.T=T;
H.leave=(swap,done)=>{const hall=document.querySelector('#ui .hall'),fl=flash();fl.className='burst';if(hall)hall.classList.add('leaving');
 setTimeout(()=>{swap();fl.className='fade';setTimeout(()=>{fl.className='';done();},T.fade);},T.zoom);};
H.arrive=(swap,done)=>{const fl=flash();fl.className='cover';
 setTimeout(()=>{swap();const hall=document.querySelector('#ui .hall');if(hall){hall.classList.add('arriving');setTimeout(()=>hall.classList.remove('arriving'),T.arrive);}fl.className='fade';setTimeout(()=>{fl.className='';done();},T.fade+40);},T.flashIn);};
})();
