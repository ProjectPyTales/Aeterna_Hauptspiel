/* Aeterna – Start (1.26.0): developer splash and game intro before the main menu.
 * 1. PY'TALES (developer splash): the studio's own idle animation (assets/intro/pytales.webp, from the original video, see
 *    werkzeuge/entwicklersplash.py) fades in on its grey and out to black – plain DOM and CSS, it runs while the game loads.
 * 2. „Die Geschichte erwacht“ (game intro, about 8 s on one canvas, music in assets/audio/intro.ogg, werkzeuge/intro_klang.py):
 *    a spark tears a seam of light open → six epochs of the curriculum flash by on the beat, three painted heroes each,
 *    a year counter runs from 2650 v. Chr. to 1708 n. Chr. → the portraits turn into cards that whirl in a ring →
 *    the ring collapses into a point of light → impact: the Aeterna seal, light rays, sparks and the title →
 *    match cut into the hall: the seal flies into the star above the ring while the menu builds itself up.
 * Every picture is a pure function of the time t (no state per frame), so freeze(t) shows any moment (Sichtprüfung).
 * A tap or the back key skips (the splash to the intro, the intro to the menu). Off in the settings („Intro beim Start“):
 * only the splash. Reduced motion: only the splash. Automated runs (navigator.webdriver) skip both unless ?intro=1. */
(function(){'use strict';
// ---------- Timeline (seconds of the intro; werkzeuge/intro_klang.py uses the same numbers) ----------
const T={seam:.55,montage:1,beat:.48,flip:3.88,edge:4.03,formed:4.5,collapse:5.55,point:5.92,impact:6.05,handoff:7.95,end:9.6};
const DEV={hold:2.3,out:.45,wait:1.6};          // splash: shown, fade to black, longest wait for the intro's pictures
const REVEAL={match:.9,fast:.32,arrive:.42};     // match cut into the hall (arrive = the seal reaches the star)
// Six epochs (the order of the curriculum), three heroes each, and the year the counter shows.
const EPOCHS=[['steppe',-2650,['imhotep','amanirenas','fuhao']],['griechen',-480,['leonidas','perikles','hypatia']],
 ['rom',-52,['boudicca','agrippa','mandukhai']],['mittelalter',800,['khan','masako','jeanne']],
 ['byzanz',1204,['anna','dandolo','baibars']],['ostasien',1708,['nezahualcoyotl','zizka','nostradamus']]];
// Ten cards for the ring (five card atlases), legendary ones in gold; the backs are the eight painted backs.
const CARDS=['leonidas_9','imhotep_9','boudicca_9','jeanne_8','epaminondas_9','leonidas_8','imhotep_8','boudicca_8','jeanne_9','epaminondas_8'];
const BACKS=['chroniken','sparta','pharao','runen','lilien','sterne','tempel','zen'];
const RING={x:800,y:404,rx:560,ry:92,n:10},MID=390,SEAL={x:800,y:320};
const PANEL={y0:150,y1:630,hw:190,skew:36,gap:420};

const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v,lerp=(a,b,p)=>a+(b-a)*p,seg=(t,a,b)=>clamp((t-a)/(b-a));
const ease={out:p=>1-Math.pow(1-p,3),in:p=>p*p*p,io:p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2,
 back:p=>{const c=1.70158;return 1+(c+1)*Math.pow(p-1,3)+c*Math.pow(p-1,2);}};
// Seeded random numbers: embers and sparks are the same in every run and every frozen frame.
const rand=seed=>()=>{seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
const canvas=(w,h)=>{const c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(w));c.height=Math.max(1,Math.ceil(h));return c;};
const picture=src=>fetch(src).then(r=>{if(!r.ok)throw Error(r.status);return r.blob();}).then(b=>createImageBitmap(b))
 .catch(()=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src;}));
const year=y=>{const v=Math.round(y);return v<=0?(Math.max(1,-v))+' v. Chr.':v+' n. Chr.';};

function start(o={}){
 const layer=document.getElementById('intro');
 const api={active:()=>!!layer?.isConnected,ready:()=>handoff,reveal:()=>Promise.resolve(),skip(){},abort(){},state:()=>state};
 let state='done',resolveHandoff;const handoff=new Promise(r=>resolveHandoff=r);
 if(!layer){resolveHandoff();return api;}
 if(o.automated){layer.remove();resolveHandoff();return api;}
 // Sized in pixels: on Android a fixed layer follows the layout viewport, which grows with the hall's wide picture.
 const size=()=>{layer.style.width=innerWidth+'px';layer.style.height=innerHeight+'px';};size();addEventListener('resize',size);
 const full=!!o.full,D=o.data,A=o.audio;
 state='dev';
 // ---------- 1. Developer splash ----------
 requestAnimationFrame(()=>layer.classList.add('dev-on'));
 const t0=performance.now();let devTimer=0,introStarted=false;
 const toIntro=()=>{if(state!=='dev')return;clearTimeout(devTimer);
  if(!full){state='done';resolveHandoff();fadeLayer(()=>{});return;}
  state='dev-out';layer.classList.add('dev-out');setTimeout(()=>{layer.querySelector('.dev')?.remove();begin();},DEV.out*1000+200);};
 // ---------- 2. Intro: pictures and sound load during the splash ----------
 const art={},sprites={},cards=[];let prepared=null;
 if(full)prepared=prepare();
 const devEnd=()=>{const wait=Math.max(0,DEV.hold*1000-(performance.now()-t0));
  devTimer=setTimeout(()=>{if(!full){toIntro();return;}Promise.race([prepared,new Promise(r=>setTimeout(r,DEV.wait*1000))]).then(toIntro);},wait);};
 devEnd();

 function prepare(){
  const heroes=['heroes','heroes2'].map(n=>picture('assets/art/'+n+'.webp').then(im=>art[n]=im,()=>null));
  const atlases=[...new Set(CARDS.map(id=>D.byId[id]?.art).filter(Boolean))].map(n=>o.render?.images?.[n]?null:picture('assets/art/'+n+'.webp').then(im=>{art[n]=im;if(o.render&&!o.render.images[n])o.render.images[n]=im;},()=>null));
  const fonts=['700 96px "Aeterna Zier"','700 40px "Aeterna Titel"','600 22px "Aeterna Titel"','500 20px "Aeterna Text"','14px Body','14px Title'].map(f=>document.fonts?.load(f)?.catch(()=>null));
  const sound=prepareSound();
  // The card faces are the game's own (R.card with Astra's frames), drawn once when frames, art and fonts are there.
  const faces=Promise.all([...atlases,...fonts,o.surface||Promise.resolve()]).then(()=>{
   CARDS.forEach((id,i)=>{const card=D.byId[id],c=canvas(400,564);
    if(card&&o.render?.card)try{o.render.card(c.getContext('2d'),card,0,0,400,564,{gold:card.rarity==='legendary'});}catch(e){console.warn('Intro',e);}
    cards[i]={face:c,back:o.stone?.ui?.['kartenruecken-'+BACKS[i%BACKS.length]]||null};});});
  return Promise.all([...heroes,faces,sound,...fonts]).then(()=>{buildSprites();});}

 // ---------- Sound: one recorded track, started in sync with the picture ----------
 const sound={buffer:null,node:null,gain:null,at:null};
 function prepareSound(){
  if(!A||!o.sound)return Promise.resolve();
  A.track('intro');A.init().catch(()=>{});const ctx=A.ctx;if(!ctx)return Promise.resolve();
  return fetch('assets/audio/intro.ogg').then(r=>r.arrayBuffer()).then(b=>ctx.decodeAudioData(b)).then(buf=>{sound.buffer=buf;if(introStarted)playSound();}).catch(e=>console.warn('Intro-Klang',e));}
 function playSound(){const ctx=A?.ctx;if(!ctx||!sound.buffer||sound.node||ctx.state!=='running'||clock.t>T.impact-.2)return;
  const node=ctx.createBufferSource(),gain=ctx.createGain();node.buffer=sound.buffer;gain.gain.value=1;node.connect(gain);gain.connect(A.fx||ctx.destination);
  const when=ctx.currentTime+.03;node.start(when,clock.t);sound.node=node;sound.gain=gain;sound.at=when-clock.t;}
 function audioTime(){const ctx=A?.ctx;if(!sound.node||!ctx||ctx.state!=='running')return null;return ctx.currentTime-sound.at-(ctx.outputLatency||ctx.baseLatency||0);}
 // Skipped: the track fades out and no longer drives the clock (it would pull the picture back to its own time).
 function fadeSound(s=.25){const ctx=A?.ctx,node=sound.node,gain=sound.gain;sound.node=null;sound.buffer=null;if(!gain||!ctx)return;const now=ctx.currentTime;
  gain.gain.cancelScheduledValues(now);gain.gain.setTargetAtTime(0,now,s/3);setTimeout(()=>{try{node.stop();}catch{}},s*1000+200);}

 // ---------- Canvas ----------
 let cv=null,g=null,W=0,H=0,K=1,S=1,OX=0,OY=0,raf=0,frozen=null,frozenR=null,vignette=null;
 const clock={t:0,last:null};
 function fit(){W=innerWidth;H=innerHeight;K=Math.min(window.devicePixelRatio||1,2,Math.sqrt(2.6e6/Math.max(1,W*H)));
  cv.width=Math.round(W*K);cv.height=Math.round(H*K);cv.style.width=W+'px';cv.style.height=H+'px';S=Math.min(W/1600,H/800);OX=(W-1600*S)/2;OY=(H-800*S)/2;
  const v=canvas(cv.width/4,cv.height/4),vg=v.getContext('2d'),gr=vg.createRadialGradient(v.width/2,v.height*.47,v.height*.25,v.width/2,v.height/2,Math.hypot(v.width,v.height)*.56);
  gr.addColorStop(0,'#0000');gr.addColorStop(.7,'#00000055');gr.addColorStop(1,'#000000d8');vg.fillStyle=gr;vg.fillRect(0,0,v.width,v.height);vignette=v;}
 function begin(){state='intro';introStarted=true;
  cv=document.createElement('canvas');cv.setAttribute('aria-hidden','true');layer.appendChild(cv);g=cv.getContext('2d');fit();
  if(!sprites.glow)buildSprites();
  addEventListener('resize',fit);layer.classList.add('playing');clock.t=0;clock.last=null;playSound();raf=requestAnimationFrame(frame);}
 function frame(now){raf=requestAnimationFrame(frame);
  if(frozen!==null){if(state==='intro'&&frozen>=T.handoff){state='hold';resolveHandoff();}draw(frozen,frozenR!==null?frozenR:revealT());return;}
  const dt=clock.last===null?0:Math.min(.05,(now-clock.last)/1000);clock.last=now;clock.t+=dt;
  // Smooth clock, pulled towards the clock of the sound: the picture stays on the beat even if frames drop.
  const at=audioTime();if(at!==null){const err=at-clock.t;clock.t=Math.abs(err)>.15?at:clock.t+err*.12;}
  if(!sound.node&&sound.buffer)playSound();
  if(state==='intro'&&clock.t>=T.handoff){state='hold';resolveHandoff();}
  if(state==='reveal'){const r=revealT();if(r>=(reveal.fast?REVEAL.fast:REVEAL.match)){finish();return;}draw(clock.t,r);return;}
  draw(clock.t,null);}
 const reveal={start:0,fast:false,target:null,chimed:false};
 const revealT=()=>state==='reveal'?(performance.now()-reveal.start)/1000:null;
 function finish(){state='done';cancelAnimationFrame(raf);removeEventListener('resize',fit);removeEventListener('resize',size);layer.remove();doneReveal?.();}
 let doneReveal=null;

 // ---------- Sprites, drawn once ----------
 function buildSprites(){if(sprites.glow)return;
  const glow=(col,size=128)=>{const c=canvas(size,size),x=c.getContext('2d'),gr=x.createRadialGradient(size/2,size/2,0,size/2,size/2,size/2);
   gr.addColorStop(0,col+'ff');gr.addColorStop(.18,col+'cc');gr.addColorStop(.45,col+'44');gr.addColorStop(1,col+'00');x.fillStyle=gr;x.fillRect(0,0,size,size);return c;};
  sprites.glow=glow('#ffd27a');sprites.hot=glow('#fff4d6');sprites.ember=glow('#ff9a3c',64);
  // Light rays: wedges of light from the centre, fading outwards.
  const rays=canvas(1024,1024),rx=rays.getContext('2d'),rr=rand(7);rx.translate(512,512);
  for(let i=0;i<30;i++){const a=i/30*Math.PI*2+rr()*.12,w=.025+rr()*.07,len=380+rr()*132,gr=rx.createRadialGradient(0,0,0,0,0,len);
   gr.addColorStop(0,'#fff3d0b0');gr.addColorStop(.35,'#ffd98a40');gr.addColorStop(1,'#ffd98a00');rx.fillStyle=gr;rx.beginPath();rx.moveTo(0,0);rx.arc(0,0,len,a-w,a+w);rx.closePath();rx.fill();}
  sprites.rays=rays;
  // The Aeterna seal (as the app icon, android/…/splash_icon.xml): a gold disc with rings and the four-pointed star.
  const seal=canvas(512,512),sx=seal.getContext('2d'),star=canvas(512,512),st=star.getContext('2d'),k=512/100;
  const gold=(x,stops)=>{const gr=x.createLinearGradient(5*k,95*k,95*k,5*k);stops.forEach(([o,c])=>gr.addColorStop(o,c));return gr;};
  const disc=[[0,'#4e321f'],[.3,'#94643d'],[.56,'#c29a62'],[.8,'#f1d79e'],[1,'#a67a47']];
  sx.beginPath();sx.arc(50*k,53*k,45*k,0,Math.PI*2);sx.fillStyle='#4d321f';sx.fill();
  sx.beginPath();sx.arc(50*k,50*k,45*k,0,Math.PI*2);sx.fillStyle=gold(sx,disc);sx.fill();sx.lineWidth=2*k;sx.strokeStyle='#3b291c';sx.stroke();
  sx.beginPath();sx.arc(50*k,50*k,40*k,0,Math.PI*2);sx.fillStyle=gold(sx,disc);sx.fill();sx.lineWidth=k;sx.strokeStyle='#e4c389';sx.stroke();
  sx.beginPath();sx.arc(50*k,50*k,36*k,0,Math.PI*2);sx.lineWidth=k;sx.strokeStyle='#614724';sx.stroke();
  const starPath=x=>{x.beginPath();x.moveTo(50*k,21*k);x.quadraticCurveTo(53*k,47*k,79*k,50*k);x.quadraticCurveTo(53*k,53*k,50*k,79*k);x.quadraticCurveTo(47*k,53*k,21*k,50*k);x.quadraticCurveTo(47*k,47*k,50*k,21*k);x.closePath();};
  for(const x of [sx,st]){starPath(x);x.fillStyle=gold(x,[[0,'#6d451e'],[.35,'#b8822b'],[.72,'#eac465'],[1,'#fff3c3']]);x.fill();x.lineWidth=k;x.strokeStyle='#604421';x.stroke();}
  sprites.seal=seal;sprites.star=star;
  // Title and subtitle, letter by letter for the reveal and as a whole for the shimmer.
  const title='AETERNA',font='700 104px "Aeterna Zier", "Aeterna Titel", serif',spacing=16,m=canvas(10,10).getContext('2d');m.font=font;
  const widths=[...title].map(ch=>m.measureText(ch).width),total=widths.reduce((a,b)=>a+b,0)+spacing*(title.length-1);
  const letter=(ch,w,hot)=>{const c=canvas(w+40,150),x=c.getContext('2d');x.font=font;x.textAlign='center';x.textBaseline='middle';
   if(hot){x.fillStyle='#fff6dc';x.fillText(ch,c.width/2,75);return c;}
   x.lineWidth=7;x.strokeStyle='#1c120a';x.lineJoin='round';x.strokeText(ch,c.width/2,79);
   const gr=x.createLinearGradient(0,30,0,120);gr.addColorStop(0,'#fff3c8');gr.addColorStop(.42,'#eec66c');gr.addColorStop(.62,'#b8812f');gr.addColorStop(1,'#f1d58e');
   x.fillStyle=gr;x.fillText(ch,c.width/2,75);x.lineWidth=1.2;x.strokeStyle='#fff6dc88';x.strokeText(ch,c.width/2,74);return c;};
  let cx=-total/2;sprites.letters=[...title].map((ch,i)=>{const w=widths[i],l={x:cx+w/2,img:letter(ch,w),hot:letter(ch,w,true)};cx+=w+spacing;return l;});
  sprites.titleW=total;
  sprites.sub=text('DIE GESCHICHTE ERWACHT','600 26px "Aeterna Titel", serif','#e9d3a3',9);}
 // Text sprites, cached: names, epochs, the counter.
 const texts=new Map();
 function text(s,font,color,spacing=0,shadow=true){const key=s+'|'+font+'|'+color+'|'+spacing;let c=texts.get(key);if(c)return c;
  const m=canvas(10,10).getContext('2d');m.font=font;if('letterSpacing' in m)m.letterSpacing=spacing+'px';const w=m.measureText(s).width+spacing,h=parseInt(font.match(/(\d+)px/)[1],10)*1.6;
  c=canvas(w+24,h+12);const x=c.getContext('2d');x.font=font;if('letterSpacing' in x)x.letterSpacing=spacing+'px';x.textAlign='center';x.textBaseline='middle';
  if(shadow){x.fillStyle='#000000b0';x.fillText(s,c.width/2+spacing/2,c.height/2+2.5);}x.fillStyle=color;x.fillText(s,c.width/2+spacing/2,c.height/2);
  if(texts.size>120)texts.clear();texts.set(key,c);return c;}
 const put=(img,x,y,scale=1,alpha=1)=>{if(!img||alpha<=0)return;g.globalAlpha=alpha;g.drawImage(img,x-img.width*scale/2,y-img.height*scale/2,img.width*scale,img.height*scale);g.globalAlpha=1;};
 const glowAt=(img,x,y,size,alpha)=>{if(alpha<=0)return;g.globalAlpha=clamp(alpha);g.drawImage(img,x-size/2,y-size/2,size,size);g.globalAlpha=1;};

 // ---------- One picture at time t (r: seconds of the match cut, or null) ----------
 function draw(t,r){
  const fast=r!==null&&reveal.fast,fade=r===null?0:fast?ease.io(clamp(r/REVEAL.fast)):ease.io(seg(r,.1,.62)),bgA=1-fade;
  g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,cv.width,cv.height);
  if(bgA>0){g.globalAlpha=bgA;g.fillStyle='#070504';g.fillRect(0,0,cv.width,cv.height);g.globalAlpha=1;}
  // Camera: a slow push-in, shake after the impact.
  const u=t-T.impact,shake=u>0&&u<.9?16*Math.exp(-5.5*u):0,push=1+.05*seg(t,T.montage,T.flip)+.04*ease.out(seg(t,T.impact,T.handoff+1));
  const sxo=shake?Math.sin(t*93)*shake+Math.sin(t*41)*shake*.5:0,syo=shake?Math.cos(t*71)*shake*.8:0;
  g.setTransform(K*S*push,0,0,K*S*push,K*(OX+800*S*(1-push)+sxo*S),K*(OY+400*S*(1-push)+syo*S));
  const content=1-(fast?fade:0);
  backdrop(t,bgA);
  if(t>=T.impact)rays(t,r,content);
  embers(t,bgA);
  if(t<T.montage+.1)seam(t);
  if(t>=T.seam&&t<T.edge)panels(t);
  if(t>=T.edge-.01&&t<T.point+.02)ring(t);
  if(t>=T.collapse&&t<T.impact+.3)core(t);
  if(t>=T.impact){shockwave(t);sparks(t,T.impact,0,0,1);title(t,r,content);seal(t,r,content);}
  // Screen space: flash, vignette, letterbox.
  g.setTransform(K,0,0,K,0,0);
  const flash=(t>=T.impact?.95*Math.exp(-11*u):0)+(t<.4?.5*Math.exp(-14*t)*(t>.02?1:0):0)+beatFlash(t);
  if(flash>.004){g.globalAlpha=clamp(flash)*content;g.fillStyle='#fff1d4';g.fillRect(0,0,W,H);g.globalAlpha=1;}
  if(vignette&&bgA>0){g.globalAlpha=bgA;g.drawImage(vignette,0,0,W,H);g.globalAlpha=1;}
  const bar=H*.055*(1-(r===null?0:ease.io(clamp(r/(fast?REVEAL.fast:.4)))));
  if(bar>.5){g.fillStyle='#000';g.fillRect(0,0,W,bar);g.fillRect(0,H-bar,W,bar);}}

 // The epoch's colours as soft light behind the panels: the middle portrait shrunk to 16 × 10 pixels and drawn large.
 const ambients=new Map();
 function ambient(id){if(ambients.has(id))return ambients.get(id);const hero=D.heroById[id],im=hero&&art[hero.art];if(!im)return null;
  const cw=im.width/4,ch=im.height/3,small=canvas(16,10),mid=canvas(64,40);small.getContext('2d').drawImage(im,(hero.cell%4)*cw,Math.floor(hero.cell/4)*ch+ch*.2,cw,ch*.6,0,0,16,10);
  const m=mid.getContext('2d');m.imageSmoothingQuality='high';m.drawImage(small,0,0,64,40);ambients.set(id,mid);return mid;}
 function ambience(t,a){const on=seg(t,T.seam,T.montage+.2)*(1-seg(t,T.flip,T.edge+.25));if(on<=0)return;
  const beat=Math.max(0,Math.min(5,Math.floor((t-T.montage)/T.beat))),since=t-T.montage-beat*T.beat,mix=beat>0?clamp(since/.3):1,z=1.08+.04*Math.sin(t*.9);
  for(const [k,al] of beat>0&&mix<1?[[beat-1,1-mix],[beat,mix]]:[[beat,1]]){const img=ambient(EPOCHS[k][2][1]);if(!img)continue;
   g.globalAlpha=.42*on*al*a;g.drawImage(img,800-900*z,400-500*z,1800*z,1000*z);}
  g.globalAlpha=.55*on*a;g.fillStyle='#070504';g.fillRect(-200,-100,2000,1000);g.globalAlpha=1;}
 function backdrop(t,a){if(a<=0)return;ambience(t,a);
  // Warm light behind the middle, stronger in the montage and behind the seal.
  const glow=.25+.35*seg(t,T.seam,T.montage)-.25*seg(t,T.collapse,T.point)+.6*seg(t,T.impact,T.impact+.3)*(t>=T.impact?1:0);
  g.globalCompositeOperation='lighter';glowAt(sprites.glow,800,t>=T.impact?320:400,t>=T.impact?1500:1700,glow*.32*a);g.globalCompositeOperation='source-over';}

 function rays(t,r,a){const u=t-T.impact,on=seg(u,0,.35)*(1-(r===null?0:clamp(r/.35)))*a;if(on<=0)return;
  const flick=.85+.15*Math.sin(t*23)*Math.sin(t*7.3);g.globalCompositeOperation='lighter';
  for(const [k,sp,al] of [[1.9,.07,.4],[1.35,-.11,.28]]){g.save();g.translate(800,320);g.rotate(t*sp+k);g.globalAlpha=on*al*flick;const s=1024*k;g.drawImage(sprites.rays,-s/2,-s/2,s,s);g.restore();}
  g.globalAlpha=1;g.globalCompositeOperation='source-over';}

 // Embers rise through the whole intro; during the ring they lean into the turn.
 const EMBERS=(()=>{const r=rand(11);return Array.from({length:o.particles===false?34:70},()=>({x:r()*1800-100,v:28+r()*70,off:r()*900,amp:10+r()*40,f:.4+r()*1.2,ph:r()*6.3,s:6+r()*22,a:.3+r()*.6}));})();
 function embers(t,a){if(a<=0)return;g.globalCompositeOperation='lighter';
  const spin=seg(t,T.formed,T.collapse)*(1-seg(t,T.point,T.impact)),boost=1+1.4*seg(t,T.impact,T.impact+.2)*Math.exp(-2*Math.max(0,t-T.impact));
  for(const e of EMBERS){const y=840-((t*e.v*boost+e.off)%920),x=e.x+Math.sin(t*e.f+e.ph)*e.amp+spin*(y-400)*.35;
   const fl=.65+.35*Math.sin(t*9*e.f+e.ph);glowAt(sprites.ember,x,y,e.s,e.a*fl*a*(.55+.45*seg(t,0,.8)));}
  g.globalCompositeOperation='source-over';}

 // Act 1: a spark, a seam of light across the screen that opens into the montage.
 function seam(t){const ign=seg(t,0,.25),open=ease.io(seg(t,T.seam,T.montage)),y=MID,half=open*(PANEL.y1-PANEL.y0)/2;
  const len=1700*ease.out(seg(t,.05,.6)),bright=(1-seg(t,T.montage-.05,T.montage+.1));if(bright<=0)return;
  g.globalCompositeOperation='lighter';
  glowAt(sprites.hot,800,y,60+260*ign*(1-open*.6),(.4+.6*ign)*bright);
  for(const yy of half>1?[y-half,y+half]:[y]){g.globalAlpha=.95*bright;const gr=g.createLinearGradient(800-len/2,0,800+len/2,0);
   gr.addColorStop(0,'#ffd27a00');gr.addColorStop(.5,'#fff6e0');gr.addColorStop(1,'#ffd27a00');g.fillStyle=gr;g.fillRect(800-len/2,yy-1.6,len,3.2);
   g.globalAlpha=.35*bright;g.fillRect(800-len/2,yy-9,len,18);}
  // Anamorphic flare through the spark.
  g.globalAlpha=.5*ign*bright;g.drawImage(sprites.glow,800-700,y-14,1400,28);g.globalAlpha=1;g.globalCompositeOperation='source-over';}
 function beatFlash(t){if(t<T.montage||t>T.flip+.2)return 0;const k=Math.floor((t-T.montage)/T.beat),u=t-T.montage-k*T.beat;return k>0&&k<6?.16*Math.exp(-18*u):0;}

 // Act 2: the montage – three slanted panels per epoch, wiped in on the beat.
 const panelPath=(cx,inset=0)=>{const {y0,y1,hw,skew}=PANEL;g.beginPath();g.moveTo(cx-hw+skew+inset,y0+inset);g.lineTo(cx+hw+skew-inset,y0+inset);g.lineTo(cx+hw-skew-inset,y1-inset);g.lineTo(cx-hw-skew+inset,y1-inset);g.closePath();};
 function portrait(id,cx,since){const hero=D.heroById[id],im=hero&&art[hero.art];const {y0,y1}=PANEL;
  if(!im){const gr=g.createLinearGradient(0,y0,0,y1);gr.addColorStop(0,hero?.color||'#5a4630');gr.addColorStop(1,'#120d09');g.fillStyle=gr;g.fillRect(cx-260,y0,520,y1-y0);return;}
  const cw=im.width/4,ch=im.height/3,z=1.3+.1*ease.out(clamp(since/.9)),size=(y1-y0)*z,drift=12*clamp(since/.9);
  g.drawImage(im,(hero.cell%4)*cw,Math.floor(hero.cell/4)*ch,cw,ch,cx-size/2,y0-8-drift,size,size);}
 function panelLabel(id,cx,since){const hero=D.heroById[id];if(!hero)return;const {y1}=PANEL;
  const gr=g.createLinearGradient(0,y1-150,0,y1);gr.addColorStop(0,'#0000');gr.addColorStop(1,'#000000d0');g.fillStyle=gr;g.fillRect(cx-260,y1-150,520,150);
  const p=ease.out(clamp((since-.05)/.25));put(text(hero.name.toUpperCase(),'600 21px "Aeterna Titel", serif','#f6e3b4',3),cx-PANEL.skew*.55,y1-34+12*(1-p),1,p);}
 function panels(t){const flip=seg(t,T.flip,T.edge);
  const beat=Math.max(0,Math.min(5,Math.floor((t-T.montage)/T.beat))),since=t-T.montage-beat*T.beat,open=ease.io(seg(t,T.seam,T.montage));
  const punch=t>=T.montage?1+.03*Math.exp(-14*since):1;
  // The seam opens: before the first beat the panels show through the gap between the two lines.
  g.save();if(open<1){const half=open*(PANEL.y1-PANEL.y0)/2;g.beginPath();g.rect(0,MID-half,1600,2*half);g.clip();}
  for(let i=0;i<3;i++){const cx=800+(i-1)*PANEL.gap,cur=EPOCHS[beat][2][i],prev=beat>0?EPOCHS[beat-1][2][i]:null;
   const wipe=prev?ease.io(clamp((since-i*.06)/.2)):1;
   g.save();g.translate(cx,390);
   if(flip>0){const p=ease.in(flip);g.scale(Math.cos(flip*Math.PI/2)*lerp(1,.56,p),lerp(1,.56,p));}
   g.scale(punch,punch);g.translate(-cx,-390);
   g.save();panelPath(cx);g.clip();
   if(wipe<1&&prev){portrait(prev,cx,since+T.beat);panelLabel(prev,cx,since+T.beat);}
   if(wipe>0){g.save();if(wipe<1){const X=cx-300+wipe*620;g.beginPath();g.moveTo(cx-400,PANEL.y0);g.lineTo(X+80,PANEL.y0);g.lineTo(X-80,PANEL.y1);g.lineTo(cx-400,PANEL.y1);g.closePath();g.clip();}
    portrait(cur,cx,beat===0?t-T.seam:since);panelLabel(cur,cx,beat===0?t-T.montage:since);g.restore();}
   // Inner shading, then the gold edge of the wipe.
   const sh=g.createRadialGradient(cx,330,60,cx,390,330);sh.addColorStop(0,'#0000');sh.addColorStop(1,'#00000070');g.fillStyle=sh;g.fillRect(cx-280,PANEL.y0,560,PANEL.y1-PANEL.y0);
   if(wipe>0&&wipe<1){const X=cx-300+wipe*620;g.globalCompositeOperation='lighter';g.strokeStyle='#fff1c8';g.lineWidth=5;g.globalAlpha=.9;g.beginPath();g.moveTo(X+80,PANEL.y0);g.lineTo(X-80,PANEL.y1);g.stroke();
    g.lineWidth=22;g.globalAlpha=.25;g.stroke();g.globalAlpha=1;g.globalCompositeOperation='source-over';}
   g.restore();
   panelPath(cx);g.lineWidth=3;g.strokeStyle='#d9b26a';g.stroke();panelPath(cx,6);g.lineWidth=1;g.strokeStyle='#d9b26a66';g.stroke();
   g.restore();}
  g.restore();
  if(t>=T.montage-.2&&flip<1)epochText(t,beat,since,1-flip);}
 function epochText(t,beat,since,a){const age=D.ageById?.[EPOCHS[beat][0]],p=ease.out(clamp(since/.22)),intro=seg(t,T.montage-.2,T.montage+.15);
  const label=text((age?.name||'').toUpperCase(),'600 22px "Aeterna Titel", serif','#e8cf98',7);put(label,800,104+10*(1-p),1,p*a*intro);
  const ln=200*p,half=label.width/2+14;g.globalAlpha=.7*a*intro*p;g.fillStyle='#d9b26a';g.fillRect(800-half-ln,104,ln,1.5);g.fillRect(800+half,104,ln,1.5);g.globalAlpha=1;
  // The year counter rolls on every beat, fast at first and settling.
  const from=beat>0?EPOCHS[beat-1][1]:-3200,to=EPOCHS[beat][1],y=lerp(from,to,ease.out(clamp(since/.32)));
  put(text(year(y),'700 46px "Aeterna Titel", serif','#f3d68f',2),800,690,1,a*intro);}

 // Act 3: the cards – the three portraits turn into cards, seven more fly in, the ring whirls and collapses.
 const spin=t=>{const u=Math.max(0,t-T.edge);return .6*u+1.15*u*u*u;};
 const FLY=(()=>{const r=rand(23);return CARDS.map((_,j)=>j<3?{x:800+(j-1)*PANEL.gap,y:390,s:.56*480/282,start:T.edge,turn:Math.PI/2}:
  {x:j%2?1900:-300,y:120+r()*560,s:1.4,start:3.92+.055*(j-3),turn:(j%2?-1:1)*(Math.PI*3+r())});})();
 // Ring slots: the middle portrait lands in front, its neighbours left and right of it.
 const SLOT=[-1,0,1,5,2,7,4,8,3,6].map(k=>k*Math.PI*2/RING.n);
 function ringPose(j,t){const c=ease.in(seg(t,T.collapse,T.point)),phi=SLOT[j]+spin(t),z=Math.cos(phi);
  return {x:RING.x+RING.rx*(1-c)*Math.sin(phi),y:RING.y+RING.ry*(1-c)*z-(RING.y-SEAL.y)*c,s:(.6+.4*(z+1)/2)*(1-.8*c),phi,z};}
 function ring(t){const items=[];
  for(let j=0;j<CARDS.length;j++){const f=FLY[j];if(t<f.start)continue;const rp=ringPose(j,t),p=ease.out(seg(t,f.start,f.start+.5));
   items.push({j,x:lerp(f.x,rp.x,p),y:lerp(f.y,rp.y,p),s:lerp(f.s,rp.s,p),phi:lerp(f.turn,rp.phi,p),z:p<1?2+p:rp.z,arrived:p>=1});}
  items.sort((a,b)=>a.z-b.z);
  // Motion blur: two faint copies a moment behind, once the ring turns fast.
  const w=Math.max(0,t-T.edge),blur=clamp((.6+3.45*w*w-3)/9)*(1-seg(t,T.point-.12,T.point));
  for(const it of items){if(blur>0&&it.arrived)for(const k of [2,1]){const gp=ringPose(it.j,t-k*.018);card(it.j,gp.x,gp.y,gp.s,gp.phi,.24*blur/k,t);}
   card(it.j,it.x,it.y,it.s,it.phi,1,t);}
  // Tagline under the ring.
  const tag=seg(t,T.formed-.1,T.formed+.25)*(1-seg(t,T.collapse,T.collapse+.2));
  if(tag>0)put(text(D.heroes.length+' HELDEN  ·  '+D.cards.length+' KARTEN  ·  6 EPOCHEN','600 24px "Aeterna Titel", serif','#f0d8a2',5),800,690,1,tag);}
 function card(j,x,y,s,phi,alpha,t){const c=cards[j],front=Math.cos(phi)>=0,img=front?c?.face:(c?.back||null),wx=Math.abs(Math.cos(phi));
  const w=200*s,h=282*s,dim=1-seg(-Math.cos(phi)*.5+.5,.42,1)*.62,bright=seg(t,T.collapse+.15,T.point);
  g.save();g.translate(x,y);g.scale(Math.max(.02,wx),1);g.globalAlpha=alpha*dim*(1-seg(t,T.point-.06,T.point));
  if(img)g.drawImage(img,-w/2,-h/2,w,h);else{g.fillStyle='#5b4327';g.fillRect(-w/2,-h/2,w,h);g.strokeStyle='#d9b26a';g.lineWidth=3;g.strokeRect(-w/2+4,-h/2+4,w-8,h-8);}
  if(bright>0){g.globalCompositeOperation='lighter';g.globalAlpha=bright*alpha;g.drawImage(sprites.hot,-w,-h*.8,2*w,1.6*h);g.globalCompositeOperation='source-over';}
  g.restore();g.globalAlpha=1;}

 // Act 4: the point of light – speed lines rush in, then a breath of darkness.
 function core(t){const grow=ease.in(seg(t,T.collapse,T.point)),shrink=seg(t,T.point,T.impact),r=lerp(10,190,grow)*(1-.92*shrink);
  g.globalCompositeOperation='lighter';glowAt(sprites.hot,SEAL.x,SEAL.y,r*2.4,.9);glowAt(sprites.glow,SEAL.x,SEAL.y,r*5,.5*(1-shrink*.7));
  const lines=grow*(1-shrink);if(lines>0){const rr=rand(31);g.strokeStyle='#ffe2a0';g.lineCap='round';
   for(let i=0;i<34;i++){const a=rr()*Math.PI*2,d0=200+rr()*700,ph=(t*2.2+rr())%1,d=d0*(1-ph);g.globalAlpha=lines*.5*(1-ph);g.lineWidth=1+rr()*2.5;
    g.beginPath();g.moveTo(SEAL.x+Math.cos(a)*d,SEAL.y+Math.sin(a)*d*.6);g.lineTo(SEAL.x+Math.cos(a)*(d+90),SEAL.y+Math.sin(a)*(d+90)*.6);g.stroke();}}
  g.globalAlpha=1;g.globalCompositeOperation='source-over';}

 // Act 5: impact – shockwave, sparks, the seal and the title.
 function shockwave(t){const u=t-T.impact;g.globalCompositeOperation='lighter';
  for(const [d,w,a,max] of [[0,34,.8,1500],[.07,10,.6,1100],[.16,5,.45,800]]){const p=seg(u-d,0,.75);if(p<=0||p>=1)continue;const e=ease.out(p);
   g.globalAlpha=a*(1-p);g.strokeStyle='#ffe8b8';g.lineWidth=w*(1-p)+1;g.beginPath();g.ellipse(800,320,40+max*e,(40+max*e)*.72,0,0,Math.PI*2);g.stroke();}
  g.globalAlpha=1;g.globalCompositeOperation='source-over';}
 const SPARKS=(()=>{const r=rand(47);return Array.from({length:o.particles===false?40:80},()=>{const a=r()*Math.PI*2;return {c:Math.cos(a),s:Math.sin(a),v:420+r()*1300,life:.45+r()*1.1,w:1.5+r()*3,hot:r()<.35};});})();
 // Sparks are a pure function of time: v/d·(1−e^(−d·u)) along the direction, plus gravity.
 function sparks(t,at,x0=0,y0=0,scale=1,cx=800,cy=320){const u=t-at;if(u<0||u>1.6)return;g.globalCompositeOperation='lighter';g.lineCap='round';
  for(const p of SPARKS){if(u>p.life)continue;const d=4.2,v=p.v*scale,dist=v/d*(1-Math.exp(-d*u)),sp=v*Math.exp(-d*u),grav=260*scale*u*u;
   const x=cx+x0+p.c*dist,y=cy+y0+p.s*dist*.8+grav,len=Math.min(60*scale,sp*.045)+2,fade=1-u/p.life;
   g.strokeStyle=p.hot?'#fff6dc':'#ffb84a';g.globalAlpha=fade;g.lineWidth=p.w*scale*(.4+.6*fade);g.beginPath();g.moveTo(x,y);g.lineTo(x-p.c*len,y-(p.s*.8*len)-grav*.02);g.stroke();}
  g.globalAlpha=1;g.globalCompositeOperation='source-over';}
 function seal(t,r,a){const u=t-T.impact;let x=SEAL.x,y=SEAL.y,s=1+1.25*Math.exp(-7.5*u)*Math.cos(9*u),ring=1;
  if(r!==null&&!reveal.fast){const p=ease.io(clamp(r/REVEAL.arrive)),tg=reveal.target||{x:800,y:64};
   x=lerp(SEAL.x,tg.x,p);y=lerp(SEAL.y,tg.y,p)-60*Math.sin(p*Math.PI);s=lerp(1,.34,p);ring=1-seg(r,0,.3);
   if(r>=REVEAL.arrive){sparks(r,REVEAL.arrive,0,0,.35,tg.x,tg.y);if(!reveal.chimed){reveal.chimed=true;o.onArrive?.();}}
   a=1-seg(r,REVEAL.arrive,REVEAL.arrive+.2);}
  if(a<=0)return;const R=230*s;
  g.globalCompositeOperation='lighter';glowAt(sprites.glow,x,y,R*3.2,(.5+.25*Math.sin(t*3))*a*ring+.6*a*(1-ring));g.globalCompositeOperation='source-over';
  if(ring>0)put(sprites.seal,x,y,R/512,a*ring);
  put(sprites.star,x,y,R/512,a);
  // A glint wanders over the seal.
  const gl=seg(u,1.15,1.75);if(gl>0&&gl<1&&r===null){g.globalCompositeOperation='lighter';glowAt(sprites.hot,x-R*.32+R*.64*gl,y-R*.3+R*.6*gl,R*.5,Math.sin(gl*Math.PI)*.8);g.globalCompositeOperation='source-over';}}
 function title(t,r,a){if(r!==null){a*=1-clamp(r/.25);}if(a<=0)return;const u=t-T.impact,drop=r!==null?18*clamp(r/.25):0,y=508+drop;
  for(let i=0;i<sprites.letters.length;i++){const l=sprites.letters[i],d=.12+Math.abs(i-3)*.07,p=seg(u,d,d+.42);if(p<=0)continue;
   const s=lerp(1.7,1,ease.back(p)),al=clamp(p*2.4)*a;put(l.img,800+l.x,y,s*.96,al);
   const hot=Math.exp(-7*Math.max(0,u-d-.12));if(hot>.02){g.globalCompositeOperation='lighter';put(l.hot,800+l.x,y,s*.96,hot*.7*a);g.globalCompositeOperation='source-over';}}
  // Ornament line and subtitle.
  const ln=ease.out(seg(u,.4,.9))*sprites.titleW*.48;if(ln>0){g.globalAlpha=.85*a;g.fillStyle='#d9b26a';g.fillRect(800-ln,560+drop,ln-14,2);g.fillRect(814,560+drop,ln-14,2);
   g.save();g.translate(800,561+drop);g.rotate(Math.PI/4);g.fillRect(-5,-5,10,10);g.restore();g.globalAlpha=1;}
  const sp=ease.out(seg(u,.8,1.3));if(sp>0){const img=sprites.sub,w=img.width*sp;g.save();g.beginPath();g.rect(800-w/2,590+drop,w,img.height);g.clip();put(img,800,590+drop+img.height/2,.96,sp*a);g.restore();}
  // Shimmer: a band of light runs over the title once.
  const sh=seg(u,1.25,1.85);if(sh>0&&sh<1){const X=800-sprites.titleW/2-120+(sprites.titleW+240)*ease.io(sh);g.save();g.beginPath();g.moveTo(X-40,430);g.lineTo(X+30,430);g.lineTo(X-10,590);g.lineTo(X-80,590);g.closePath();g.clip();
   g.globalCompositeOperation='lighter';for(const l of sprites.letters)put(l.hot,800+l.x,y,.96,.8*a);g.restore();g.globalCompositeOperation='source-over';}}

 // ---------- Control ----------
 function skip(){if(state==='dev'){toIntro();return;}
  if(state==='intro'||state==='hold'){fadeSound(.3);reveal.fast=true;clock.t=Math.max(clock.t,T.handoff);if(state==='intro'){state='hold';resolveHandoff();}}}
 layer.addEventListener('pointerdown',ev=>{ev.preventDefault();skip();});
 api.skip=skip;
 api.abort=()=>{fadeSound(.1);if(state!=='done'){state='done';cancelAnimationFrame(raf);removeEventListener('resize',size);removeEventListener('resize',fit);layer.remove();resolveHandoff();}};
 // The app shows the hall underneath, then calls reveal(): the match cut (or a quick fade after a skip) and the end.
 api.reveal=()=>new Promise(resolve=>{if(state==='done'||!cv){resolve();return;}
  const star=document.querySelector('#ui .hall-star')?.getBoundingClientRect();
  if(star){const push=1+.05+.04*ease.out(seg(clock.t,T.impact,T.handoff+1));reveal.target={x:((star.left+star.width/2-OX)/S-800)/push+800,y:((star.top+star.height/2-OY)/S-400)/push+400};}
  layer.classList.add('reveal');state='reveal';reveal.start=performance.now();doneReveal=resolve;});
 // Splash only (intro off or reduced motion): the grey fades away over the loading screen or the hall.
 function fadeLayer(done){layer.classList.add('gone');setTimeout(()=>{removeEventListener('resize',size);layer.remove();done();},420);}
 api.freeze=(t,r=null)=>{frozen=t;frozenR=r;if(state==='dev'){clearTimeout(devTimer);layer.querySelector('.dev')?.remove();layer.classList.add('dev-out');if(full)begin();}};
 api.time=()=>clock.t;
 window.AEI.current=api;
 return api;}

window.AEI={start,T,EPOCHS,CARDS};
})();
