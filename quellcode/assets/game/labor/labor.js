/* Renderer-Labor (AP 2.5): dasselbe volle Match – 7 Diener je Seite, 10 Handkarten – einmal mit dem optimierten
 * Canvas-2D-Renderer des Spiels (CHR.draw, AP 2.4) und einmal mit PixiJS (WebGL, MIT, offline in pixi.min.js).
 * Darüber die Last von Phase 3: Partikelregen (additiv, flackernd) und Verformung Karte → Siegel (Gitternetz 10 × 10).
 * In Canvas 2D braucht die Verformung je Dreieck Clip und Transformation (200 je Karte), in WebGL ist sie ein Netz.
 *
 * Die Pixi-Szene entsteht aus demselben Bild: Ein Durchlauf von CHR.draw zeichnet alles außer Bildern auf eine
 * Restebene (Texte, Linien) und merkt sich jeden drawImage-Aufruf mit Matrix – daraus werden Pixi-Sprites mit
 * denselben Texturen (Sprites aus AP 2.4, Kartenbilder, Schlachtfeld). So vergleicht das Labor die Zeichenwege, nicht
 * zwei verschiedene Bilder.
 *
 * Seite: labor/renderer.html (im Spiel: Über das Spiel → fünfmal auf die Version tippen → Renderer-Labor).
 * ?auto=1 misst alle Kombinationen je 3 s und legt das Ergebnis in window.__labor (werkzeuge/labormessung.js). */
(function(){'use strict';
const D=CHD,E=CHE,R=CHR,L=CHL;
window.CHA={play(){},intensity(){}};
window.App={back(){location.href='index.html';}};
const $=s=>document.querySelector(s),info=$('#info'),stage=$('#stage'),c2d=$('#c2d'),gl=$('#gl'),ctx=c2d.getContext('2d');
const SCENES=[{name:'Brett',particles:0,warps:0},{name:'+ 500 Partikel, 4 Verformungen',particles:500,warps:4},{name:'+ 2000 Partikel, 4 Verformungen',particles:2000,warps:4}];
const G=10;
let k=1,state=null,view={targets:[]},renderer='canvas',scene=0,app=null,pixi=null,stats=[];

// Fester Spielstand wie in werkzeuge/matchmessung.js.
function build(){const s=E.create({hero:'leonidas',foe:'hypatia',seed:20261007,first:0});s.phase='play';s.turn=2;
 const mine=['neutral_10','neutral_4','leonidas_10','neutral_9','neutral_6','neutral_7','neutral_5'],theirs=['neutral_0','neutral_3','neutral_8','neutral_45','neutral_43','neutral_2','neutral_1'];
 for(const [p,ids] of [[0,mine],[1,theirs]]){const a=s.players[p];a.board=[];for(const id of ids)E.summon(s,p,id);
  a.board.forEach((u,i)=>{u.ready=true;u.attacks=0;u.fresh=false;if(i===1)u.shield=true;if(p===1&&i===2)u.frozen=true;});}
 const a=s.players[0];a.hand=['neutral_11','neutral_12','neutral_13','neutral_14','neutral_15','neutral_16','neutral_17','neutral_18','neutral_19','neutral_20'].map(id=>({id,uid:'c'+s.nextId++}));
 a.mana=a.maxMana=10;s.players[1].hand=s.players[1].hand.slice(0,5);s.events=[];return s;}

function fit(){const w=innerWidth,h=innerHeight-44,sc=Math.min(w/1600,h/800);stage.style.width=1600*sc+'px';stage.style.height=800*sc+'px';stage.style.marginTop='-22px';
 k=Math.round(Math.max(1,Math.min(2,1600*sc*(devicePixelRatio||1)/1600))*100)/100;R.scale=k;c2d.width=1600*k;c2d.height=800*k;R.scaled(ctx,k);}

// ---------- Effekte: gleicher Ablauf für beide Renderer ----------
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const parts=[];function reseed(n){seed=7;parts.length=0;for(let i=0;i<n;i++)parts.push({x:rnd()*1600,y:rnd()*800,v:40+rnd()*120,s:6+rnd()*18,ph:rnd()*6.3,hue:rnd()});}
function step(dt,now){for(const p of parts){p.y+=p.v*dt;if(p.y>820){p.y=-20;p.x=(p.x+397)%1600;}p.dx=Math.sin(now/600+p.ph)*24;p.a=.35+.45*Math.abs(Math.sin(now/240+p.ph));}}
const dot=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=32;const g=cv.getContext('2d'),r=g.createRadialGradient(16,16,0,16,16,16);
 r.addColorStop(0,'#fff8e0');r.addColorStop(.3,'#ffcf6a');r.addColorStop(1,'#ff9a2000');g.fillStyle=r;g.fillRect(0,0,32,32);return cv;})();
// Verformung: Gitterpunkt (i, j) zwischen Kartenrechteck und Siegel-Kreis, t pendelt 0 → 1 → 0.
const WARP=[[330,420],[600,420],[1000,420],[1270,420]];
function warpPoints(n,now){const [cx,cy]=WARP[n],t=(1-Math.cos(now/700+n))/2,w=150,h=211,r=78,pts=[];
 for(let j=0;j<=G;j++)for(let i=0;i<=G;i++){const u=i/G,v=j/G,sx=u*2-1,sy=v*2-1;
  const dx=sx*Math.sqrt(1-sy*sy/2)*r,dy=sy*Math.sqrt(1-sx*sx/2)*r;pts.push(cx+(1-t)*sx*w/2+t*dx,cy+(1-t)*sy*h/2+t*dy);}return pts;}
function warpImage(n){return R.cardCache[['neutral_21','neutral_22','neutral_23','neutral_24'][n]+':'+(R.scale>1.2?400:300)];}

// ---------- Canvas 2D ----------
function tri(c,im,x0,y0,x1,y1,x2,y2,u0,v0,u1,v1,u2,v2){const d=u0*(v1-v2)+u1*(v2-v0)+u2*(v0-v1);if(!d)return;
 c.save();c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.lineTo(x2,y2);c.closePath();c.clip();
 c.transform((x0*(v1-v2)+x1*(v2-v0)+x2*(v0-v1))/d,(y0*(v1-v2)+y1*(v2-v0)+y2*(v0-v1))/d,(x0*(u2-u1)+x1*(u0-u2)+x2*(u1-u0))/d,(y0*(u2-u1)+y1*(u0-u2)+y2*(u1-u0))/d,
  (x0*(u1*v2-u2*v1)+x1*(u2*v0-u0*v2)+x2*(u0*v1-u1*v0))/d,(y0*(u1*v2-u2*v1)+y1*(u2*v0-u0*v2)+y2*(u0*v1-u1*v0))/d);c.drawImage(im,0,0);c.restore();}
function canvasFrame(now){ctx.setTransform(k,0,0,k,0,0);R.draw(ctx,state,view,now);const sc=SCENES[scene];
 for(let n=0;n<sc.warps;n++){const im=warpImage(n);if(!im)continue;const p=warpPoints(n,now),W=im.width,H=im.height,at=(i,j)=>(j*(G+1)+i)*2;
  for(let j=0;j<G;j++)for(let i=0;i<G;i++){const a=at(i,j),b=at(i+1,j),c=at(i,j+1),d=at(i+1,j+1),u0=i/G*W,u1=(i+1)/G*W,v0=j/G*H,v1=(j+1)/G*H;
   tri(ctx,im,p[a],p[a+1],p[b],p[b+1],p[c],p[c+1],u0,v0,u1,v0,u0,v1);tri(ctx,im,p[b],p[b+1],p[d],p[d+1],p[c],p[c+1],u1,v0,u1,v1,u0,v1);}}
 if(parts.length){ctx.save();ctx.globalCompositeOperation='lighter';for(const p of parts){ctx.globalAlpha=p.a;ctx.drawImage(dot,p.x+p.dx-p.s/2,p.y-p.s/2,p.s,p.s);}ctx.restore();}}

// ---------- PixiJS ----------
// Ein Durchlauf von CHR.draw: Bilder werden aufgezeichnet, alles andere landet auf der Restebene.
function record(){const rest=document.createElement('canvas');rest.width=1600*k;rest.height=800*k;const g=rest.getContext('2d');R.scaled(g,k);g.setTransform(k,0,0,k,0,0);
 const calls=[];g.drawImage=function(im,...a){const m=this.getTransform();calls.push({im,a,m:[m.a/k,m.b/k,m.c/k,m.d/k,m.e/k,m.f/k],alpha:this.globalAlpha});};
 R.draw(g,state,view,performance.now());return {rest,calls};}
async function initPixi(){if(app)return;app=new PIXI.Application();
 await app.init({canvas:gl,width:1600,height:800,resolution:k,autoDensity:false,autoStart:false,antialias:false,backgroundAlpha:0,preference:'webgl'});
 const {rest,calls}=record(),tex=new Map(),T=im=>{if(!tex.has(im))tex.set(im,PIXI.Texture.from(im));return tex.get(im);};
 const board=new PIXI.Container(),breathe=[];
 for(const {im,a,m,alpha} of calls){const base=T(im);let t=base,x,y,w,h;
  if(a.length===8){const [sx,sy,sw,sh]=a;t=new PIXI.Texture({source:base.source,frame:new PIXI.Rectangle(sx,sy,sw,sh)});[x,y,w,h]=a.slice(4);}
  else{[x,y]=a;w=a[2]??im.width;h=a[3]??im.height;}
  const holder=new PIXI.Container();holder.setFromMatrix(new PIXI.Matrix(...m));const sp=new PIXI.Sprite(t);sp.x=x;sp.y=y;sp.width=w;sp.height=h;sp.alpha=alpha;holder.addChild(sp);board.addChild(holder);
  // Diener atmen wie im Spiel (CHM.pose): kleine Auf-und-ab-Bewegung.
  if(m[5]>200&&m[5]<520&&Math.abs(m[0]-L.minionScale)<.01)breathe.push({holder,y:holder.y,ph:breathe.length*1.7});}
 board.addChild(new PIXI.Sprite(PIXI.Texture.from(rest))).scale.set(1/k);
 const meshes=[0,1,2,3].map(n=>{const im=warpImage(n);if(!im)return null;const m=new PIXI.MeshPlane({texture:T(im),verticesX:G+1,verticesY:G+1});m.autoResize=false;return m;});
 const fx=new PIXI.Container(),dotTex=T(dot),pool=[];
 app.stage.addChild(board);for(const m of meshes)if(m)app.stage.addChild(m);app.stage.addChild(fx);
 pixi={board,breathe,meshes,fx,pool,dotTex};}
function pixiFrame(now){const P=pixi,sc=SCENES[scene];for(const b of P.breathe)b.holder.y=b.y+Math.sin(now/680+b.ph)*.65;
 P.meshes.forEach((m,n)=>{if(!m)return;m.visible=n<sc.warps;if(!m.visible)return;const pos=m.geometry.positions,p=warpPoints(n,now);pos.set(p);m.geometry.getBuffer('aPosition').update();});
 while(P.pool.length<parts.length){const s=new PIXI.Sprite(P.dotTex);s.blendMode='add';s.anchor.set(.5);P.pool.push(s);P.fx.addChild(s);}
 P.pool.forEach((s,i)=>{const p=parts[i];s.visible=!!p;if(!p)return;s.x=p.x+p.dx;s.y=p.y;s.width=s.height=p.s;s.alpha=p.a;});
 app.render();}

// ---------- Schleife, Anzeige, Messung ----------
let last=performance.now();
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;step(dt,now);const t0=performance.now();
 if(renderer==='canvas')canvasFrame(now);else if(pixi)pixiFrame(now);
 stats.push({at:now,ms:performance.now()-t0});while(stats.length&&now-stats[0].at>1000)stats.shift();
 if(stats.length>2&&(!frame.n||++frame.n%15===0)){frame.n=1;const s=summary(stats);
  info.textContent=`${renderer==='canvas'?'Canvas 2D':'PixiJS (WebGL)'} · ${SCENES[scene].name}\n${s.fps} fps · Bild ${s.mean} ms (95 %: ${s.p95}) · längste Lücke ${s.gap} ms · Pixeldichte ×${k}`;}
 requestAnimationFrame(frame);}
function summary(list){const d=list.map(x=>x.ms).sort((a,b)=>a-b),gaps=list.slice(1).map((x,i)=>x.at-list[i].at).sort((a,b)=>a-b),q=(a,p)=>a[Math.min(a.length-1,Math.floor(a.length*p))];
 return {fps:Math.round((list.length-1)*1000/(list[list.length-1].at-list[0].at)),mean:+(d.reduce((a,b)=>a+b,0)/d.length).toFixed(2),p95:+q(d,.95).toFixed(2),
  gap:Math.round(gaps[gaps.length-1]||0),gap_p95:+(q(gaps,.95)||0).toFixed(1),bilder:list.length};}
async function use(r,s){if(r==='pixi')await initPixi();renderer=r;scene=s;reseed(SCENES[s].particles);c2d.style.display=r==='canvas'?'block':'none';gl.style.display=r==='pixi'?'block':'none';
 document.querySelectorAll('[data-r]').forEach(b=>b.classList.toggle('on',b.dataset.r===r));document.querySelectorAll('[data-s]').forEach(b=>b.classList.toggle('on',+b.dataset.s===s));}
async function series(){const out=[];for(const r of ['canvas','pixi'])for(let s=0;s<SCENES.length;s++){await use(r,s);await new Promise(x=>setTimeout(x,700));
  const list=[],t1=performance.now()+3000;await new Promise(done=>{const tick=now=>{list.push({at:now,ms:stats[stats.length-1]?.ms||0});if(now<t1)requestAnimationFrame(tick);else done();};requestAnimationFrame(tick);});
  out.push({renderer:r,szene:SCENES[s].name,...summary(list)});}
 info.textContent=out.map(o=>`${o.renderer==='canvas'?'Canvas':'Pixi  '} · ${o.szene}: ${o.fps} fps, Bild ${o.mean} ms, Lücke ${o.gap} ms`).join('\n');return out;}

document.querySelector('#bar').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.r)use(b.dataset.r,scene);else if(b.dataset.s)use(renderer,+b.dataset.s);else if('run' in b.dataset)series();else if('back' in b.dataset)App.back();});
(async()=>{fit();await document.fonts.load('20px Title');await document.fonts.load('20px Body');await R.load();state=build();
 // Kartenbilder für die Verformung und alle Sprites einmal anlegen.
 for(const id of ['neutral_21','neutral_22','neutral_23','neutral_24'])R.fastCard(document.createElement('canvas').getContext('2d'),D.byId[id],0,0,1,1);
 ctx.setTransform(k,0,0,k,0,0);R.draw(ctx,state,view,performance.now());
 await use('canvas',0);requestAnimationFrame(frame);
 if(/auto=1/.test(location.search)){window.__labor={pixeldichte:k,webgl:null};window.__labor.ergebnisse=await series();
  const g=app?.renderer?.gl;window.__labor.webgl=g?(g.getParameter(g.getExtension('WEBGL_debug_renderer_info')?.UNMASKED_RENDERER_WEBGL??g.RENDERER)):null;}
})().catch(e=>{info.textContent='Fehler: '+e.message;console.error(e);});
})();
