/* Keyword effects (AP 3.6) and the opening and close of a match (AP 3.8) on the match canvas. Derived from engine
 * events like every animation of phase 3; the rules do not change here. Everything runs on the match clock (anim.js) and
 * is drawn from pre-rendered sprites (R.sprite) – each picture only copies them. All pictures are placeholders for Astra.
 *  - Keywords on the plaque (drawn into its sprite): Schildwall as wooden and bronze shields, Starre as chains and
 *    hoarfrost, Tarnung as shadow in the undergrowth, Tödliches Gift as a phial, Vermächtnis as an urn below the plaque.
 *  - Göttliche Gunst as a shimmering ring of light around the plaque (each picture), which shatters with a clink.
 *  - Spell particles per element (F.element) and one effect per hero power (F.POWERS: element, path, colour, glyph).
 *  - Opening: the heroes face each other, the chronicler announces the battle, a bronze coin decides who begins.
 *  - Close: the ruler's relief of the loser breaks, a banner „TRIUMPH“ unrolls, war horns. */
(function(){'use strict';
const R=CHR,L=CHL,T=CHT,D=CHD,{clamp,mix,ease}=T,{round,ellipse,grad,txt,sparkle,powerIcon}=R.paint;
const F=window.CHF={stage:null};
const TAU=Math.PI*2,now=()=>T.clock.now(),still=()=>!!window.AEP?.reducedMotion?.();
// Seeded noise for particles: the same burst looks the same in every picture.
const noise=(seed,i)=>{const x=Math.sin(seed*12.9898+i*78.233)*43758.5453;return x-Math.floor(x);};

// ---------- Keywords on the plaque (plaque coordinates, inside the sprite of render.js) ----------
// Astra-Bild (AP A.2): schildwall – Schildwall hinter der Plakette: Holzschild mit Eisenbuckel links, Bronze-Aspis rechts, 240 × 200
function woodShield(g,x,y,r){g.save();g.translate(x,y);g.shadowColor='#1a0f08aa';g.shadowBlur=8;g.shadowOffsetY=3;
 ellipse(g,0,0,r,r,'#6b4524','#2a1a0c',3);g.shadowBlur=0;g.shadowOffsetY=0;g.save();g.beginPath();g.arc(0,0,r-2,0,TAU);g.clip();
 for(let i=-3;i<=3;i++){g.fillStyle=i%2?'#8a5a2e':'#9c6a38';g.fillRect(i*r/3.4-r/6.8,-r,r/3.4,2*r);g.strokeStyle='#3a240f88';g.lineWidth=1;g.strokeRect(i*r/3.4-r/6.8,-r,r/3.4,2*r);}g.restore();
 ellipse(g,0,0,r-2,r-2,null,'#4a4a4a',3.5);ellipse(g,0,0,r*.32,r*.32,grad(g,-r*.3,-r*.3,r*.6,r*.6,'#3b3b3b','#b9b9b9'),'#222',1.5);g.restore();}
function bronzeShield(g,x,y,r){g.save();g.translate(x,y);g.shadowColor='#1a0f08aa';g.shadowBlur=8;g.shadowOffsetY=3;
 ellipse(g,0,0,r,r,grad(g,-r,-r,2*r,2*r,'#6a4316','#f2c46c'),'#3a2508',3);g.shadowBlur=0;g.shadowOffsetY=0;
 ellipse(g,0,0,r-6,r-6,grad(g,-r,-r,2*r,2*r,'#8c5a1e','#e2aa52'),'#5a3a10',1.5);
 g.beginPath();g.moveTo(-r*.42,r*.3);g.lineTo(0,-r*.48);g.lineTo(r*.42,r*.3);g.strokeStyle='#5a3008';g.lineWidth=4;g.lineCap='round';g.stroke();g.restore();}
F.shieldWall=g=>{if(R.pic(g,'schildwall',0,16,176,146))return;woodShield(g,-53,16,30);bronzeShield(g,53,16,30);};
// ASTRA: starre-ketten – Ketten und Raureif über einem Diener in Starre, 188 × 256
function chainLinks(g,x0,y0,x1,y1){const n=10,an=Math.atan2(y1-y0,x1-x0);for(let i=0;i<=n;i++){const q=i/n,x=mix(x0,x1,q),y=mix(y0,y1,q);
 g.save();g.translate(x,y);g.rotate(an);g.scale(1,i%2?.45:1);ellipse(g,0,0,6,3.6,null,'#2b343c',3.6);ellipse(g,0,0,6,3.6,null,i%2?'#d4e0ea':'#a7b6c2',1.8);g.restore();}}
F.frost=g=>{g.save();const gr=g.createRadialGradient(0,-10,30,0,0,82);gr.addColorStop(0,'#d6f1ff00');gr.addColorStop(1,'#e9f8ff9a');round(g,-47,-64,94,128,7,gr,'#eefaff',3);
 g.strokeStyle='#ffffffb0';g.lineWidth=1.4;for(const [x,y,a] of [[-40,-56,.6],[40,-56,2.5],[-40,50,-.6],[40,50,-2.5]]){g.beginPath();for(let i=0;i<3;i++){const r=10+i*4,an=a+(i-1)*.45;g.moveTo(x,y);g.lineTo(x+Math.cos(an)*r,y+Math.sin(an)*r);}g.stroke();}
 // The chains cross low over the plaque, so the face stays free; a small lock where they meet.
 chainLinks(g,-50,-4,50,40);chainLinks(g,50,-4,-50,40);
 ellipse(g,0,22,8,6.5,grad(g,-8,16,16,13,'#5a6670','#d8e2ea'),'#2a333a',1.8);round(g,-2.5,20,5,6,1.5,'#2a333a');
 ellipse(g,-31,-46,13,13,'#1d3a52d0','#eaf8ff',1.5);txt(g,'❄',-31,-45,19,'#eaf8ff');g.restore();};
// ASTRA: tarnung-unterholz – Diener in Tarnung: Schatten und Farne im Unterholz über dem Bild, 188 × 256
F.stealth=g=>{g.save();g.beginPath();g.roundRect(-43,-60,86,116,4);g.clip();
 const sh=g.createLinearGradient(0,-60,0,56);sh.addColorStop(0,'#0a100c60');sh.addColorStop(.55,'#0c140e88');sh.addColorStop(1,'#050906b0');g.fillStyle=sh;g.fillRect(-43,-60,86,116);
 const frond=(x,y,len,an,col)=>{g.save();g.translate(x,y);g.rotate(an);g.strokeStyle=col;g.fillStyle=col;g.lineWidth=2;g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(len*.15,-len*.5,len*.05,-len);g.stroke();
  for(let i=1;i<8;i++){const q=i/8,px=len*.15*2*q*(1-q)+len*.05*q*q,py=-len*q,l=(1-q)*len*.32+3;for(const s of [-1,1]){g.beginPath();g.ellipse(px+s*l/2,py+2,l/2,2.2,s*.5,0,TAU);g.fill();}}g.restore();};
 for(const [x,y,len,an,col] of [[-36,58,62,-.35,'#1f3a1c'],[-14,60,74,-.08,'#29482a'],[10,60,66,.12,'#1c331b'],[34,58,58,.4,'#284427'],[-46,-20,40,1.2,'#1a2e19'],[46,-28,42,-1.25,'#1a2e19']])frond(x,y,len,an,col);
 ellipse(g,-12,-14,2.6,1.6,'#e8d27a');ellipse(g,4,-14,2.6,1.6,'#e8d27a');g.restore();};
// Astra-Bild (AP A.2): giftphiole – Phiole mit grünem Gift am Rand der Plakette, 64 × 96
F.vial=g=>{g.save();if(R.pic(g,'giftphiole',50,-30,30,44)){g.restore();return;}g.translate(50,-30);g.rotate(.18);g.shadowColor='#0b1a08aa';g.shadowBlur=6;g.shadowOffsetY=2;
 ellipse(g,0,8,12,12,'#d8f2d0aa','#2b3a26',2);g.shadowBlur=0;g.shadowOffsetY=0;g.save();g.beginPath();g.arc(0,8,10.5,0,TAU);g.clip();
 const liq=g.createLinearGradient(0,4,0,19);liq.addColorStop(0,'#b8ff6a');liq.addColorStop(1,'#2f9a2a');g.fillStyle=liq;g.fillRect(-12,3,24,18);g.restore();
 round(g,-4.5,-10,9,10,2,'#d8f2d0cc','#2b3a26',1.6);round(g,-5.5,-15,11,6,2,'#8a5a2e','#3a240f',1.4);
 ellipse(g,-4,4,2.4,4,'#ffffffaa');ellipse(g,3,11,1.6,1.6,'#e8ffd0');g.restore();};
// Astra-Bild (AP A.2): vermaechtnis-urne – Urne unter der Plakette eines Dieners mit Vermächtnis, 72 × 96
F.urn=g=>{g.save();if(R.pic(g,'vermaechtnis-urne',0,82,32,42)){g.restore();return;}g.translate(0,83);g.shadowColor='#160e09aa';g.shadowBlur=6;g.shadowOffsetY=2;
 g.beginPath();g.moveTo(-8,-18);g.quadraticCurveTo(-18,-8,-15,4);g.quadraticCurveTo(-12,14,-6,16);g.lineTo(6,16);g.quadraticCurveTo(12,14,15,4);g.quadraticCurveTo(18,-8,8,-18);g.closePath();
 g.fillStyle=grad(g,-16,-18,32,34,'#5a2e1c','#c4714a');g.fill();g.shadowBlur=0;g.shadowOffsetY=0;g.strokeStyle='#2a140a';g.lineWidth=1.8;g.stroke();
 g.fillStyle='#1c0e08';g.fillRect(-13,-3,26,5);g.strokeStyle='#e8b48a';g.lineWidth=1;g.beginPath();for(let i=-11;i<=11;i+=4){g.moveTo(i,-2);g.lineTo(i+2,1);}g.stroke();
 round(g,-9,-22,18,5,2,'#8a4a2e','#2a140a',1.4);round(g,-7,15,14,5,2,'#6a3420','#2a140a',1.2);g.restore();};

// ---------- Göttliche Gunst: a ring of light (each picture) that shatters with a clink ----------
// ASTRA: gunst-aurenkreis – schimmernder Aurenkreis der Göttlichen Gunst um eine Plakette, 300 × 360
const auraRing=()=>R.sprite('gunst',-80,-96,160,192,g=>{g.shadowColor='#ffe27a';g.shadowBlur=16;ellipse(g,0,0,64,80,null,'#fff2b8',3.2);g.shadowBlur=0;
 ellipse(g,0,0,60,76,null,'#ffffffaa',1.2);const gr=g.createRadialGradient(0,0,40,0,0,82);gr.addColorStop(0,'#fff6c000');gr.addColorStop(.85,'#ffe9a022');gr.addColorStop(1,'#ffe9a000');g.fillStyle=gr;g.fillRect(-80,-96,160,192);});
const glintDot=()=>R.sprite('gunstglint',-16,-16,32,32,g=>{const gr=g.createRadialGradient(0,0,0,0,0,16);gr.addColorStop(0,'#ffffff');gr.addColorStop(.3,'#fff3b8cc');gr.addColorStop(1,'#fff3b800');g.fillStyle=gr;g.fillRect(-16,-16,32,32);});
// The ring lies in the plaque's sprite (F.ring); each picture only lets two small lights run round it – a ring drawn
// anew in every picture cost 130 000 mostly transparent pixels per unit.
F.ring=g=>R.blit(g,auraRing());
F.aura=(c,x,y,t,k)=>{if(still())return;c.save();c.translate(x,y);c.scale(k,k);
 for(const off of [0,Math.PI]){const an=t/700+off+x*.003;c.globalAlpha=.75+.25*Math.sin(t/180+off);R.blit(c,glintDot(),Math.cos(an)*64,Math.sin(an)*80);}c.restore();};
// The ring breaks into glowing arcs that fly apart and fall.
// Each piece is one arc of the ring, pre-rendered tightly around its middle (8 sprites, one per place on the ring) – a
// sprite as large as the ring cost 8 × 30 000 transparent pixels per picture.
const ARC=i=>{const mid=i/8*TAU+TAU/19;return {mid,ox:Math.cos(mid)*64,oy:Math.sin(mid)*80};};
const arcPiece=i=>R.sprite('gunstarc:'+i,-32,-32,64,64,g=>{const a0=i/8*TAU,{ox,oy}=ARC(i);g.translate(-ox,-oy);g.lineCap='round';g.shadowColor='#ffe27a';g.shadowBlur=8;g.beginPath();g.ellipse(0,0,64,80,0,a0,a0+TAU/9.5);g.strokeStyle='#fff2b8';g.lineWidth=3.4;g.stroke();});
function gunstBreak(c,f,t){const q=(t-f.start)/f.life,e=(t-f.start)/1000,k=L.minionScale;c.save();c.translate(f.x,f.y);c.scale(k,k);
 if(q<.25){c.globalAlpha=1-q/.25;R.blit(c,auraRing());}
 c.globalAlpha=Math.max(0,1-q);for(let i=0;i<8;i++){const {mid,ox,oy}=ARC(i),v=60+noise(f.seed,i)*70,dx=Math.cos(mid)*v*e,dy=Math.sin(mid)*v*e+120*e*e;
  c.save();c.translate(dx+ox,dy+oy);c.rotate((noise(f.seed,i+20)-.5)*3*e);R.blit(c,arcPiece(i));c.restore();}
 c.restore();}

// ---------- Event effects: Starre, Gift, Vermächtnis ----------
// ASTRA: eiskristall – Eissplitter beim Erstarren und für Frost-Zauber, 32 × 96
const shardSprite=()=>R.sprite('iceshard',-8,-24,16,48,g=>{g.beginPath();g.moveTo(0,-22);g.lineTo(6,0);g.lineTo(0,22);g.lineTo(-6,0);g.closePath();
 const gr=g.createLinearGradient(-6,0,6,0);gr.addColorStop(0,'#bfeaff');gr.addColorStop(.5,'#ffffff');gr.addColorStop(1,'#7cc8f0');g.fillStyle=gr;g.fill();g.strokeStyle='#e8f8ffcc';g.lineWidth=1;g.stroke();});
function freezeBurst(c,f,t){const q=(t-f.start)/f.life,grow=ease.outBack(clamp(q/.35)),k=L.minionScale;c.save();c.translate(f.x,f.y);c.scale(k,k);
 c.globalAlpha=q<.6?1:1-(q-.6)/.4;for(let i=0;i<8;i++){const an=i/8*TAU+.2,r=50+12*(i%2);c.save();c.translate(Math.cos(an)*r*grow*.9,Math.sin(an)*r*grow*1.15);c.rotate(an+Math.PI/2);c.scale(grow*.9,grow*(.7+.4*(i%2)));R.blit(c,shardSprite());c.restore();}
 if(q<.5){c.globalAlpha=(1-q*2)*.6;c.scale(1+q*.6,1+q*.6);R.blit(c,flash('frost'));}c.restore();}
// ASTRA: giftblasen – grüne Giftblasen und Spritzer, wenn Tödliches Gift wirkt, 32 × 32
const bubble=()=>R.sprite('bubble',-12,-12,24,24,g=>{ellipse(g,0,0,9,9,'#7be04a88','#d8ffb0',1.6);ellipse(g,-3,-3,2.4,2.4,'#ffffffcc');});
function poisonBurst(c,f,t){const q=(t-f.start)/f.life,e=(t-f.start)/1000,a=q<.2?q/.2:1-(q-.2)/.8;c.save();c.translate(f.x,f.y);
 if(q<.5){c.save();c.globalAlpha=a*.55*(1-q*2);c.scale(.9+q*.6,.8+q*.5);R.blit(c,flash('poison'));c.restore();}c.globalAlpha=a;
 for(let i=0;i<9;i++){const an=noise(f.seed,i)*TAU,sp=30+noise(f.seed,i+30)*50,s=.5+noise(f.seed,i+60)*.8;c.save();c.translate(Math.cos(an)*sp*e*1.4,-40*e-sp*e*.6+Math.sin(an)*sp*e*.5);c.scale(s,s);R.blit(c,bubble());c.restore();}
 c.restore();}
// ASTRA: urnengeist – aus der Urne aufsteigender Rauch, wenn ein Vermächtnis wirkt, 64 × 64
const wisp=()=>R.sprite('wisp',-24,-24,48,48,g=>{const gr=g.createRadialGradient(0,0,0,0,0,24);gr.addColorStop(0,'#fff4d8cc');gr.addColorStop(.5,'#e8d0a066');gr.addColorStop(1,'#e8d0a000');g.fillStyle=gr;g.fillRect(-24,-24,48,48);});
function urnRelease(c,f,t){const q=(t-f.start)/f.life,k=L.minionScale,lift=ease.outCubic(clamp(q/.25));c.save();c.translate(f.x,f.y);c.scale(k,k);
 c.save();c.globalAlpha=q<.75?1:1-(q-.75)/.25;c.translate(0,-lift*30);R.blit(c,R.sprite('urn',-24,60,48,52,g=>F.urn(g)));c.restore();
 for(let i=0;i<6;i++){const p=clamp((q-.12-i*.07)/.6);if(p<=0||p>=1)continue;const x=Math.sin(p*5+i)*14*(1+p),y=54-lift*30-p*140;
  c.save();c.globalAlpha=(1-p)*.85;c.translate(x,y);c.scale(.6+p*.8,.6+p*.8);R.blit(c,wisp());c.restore();}c.restore();}

// ---------- Elements: spells and hero powers ----------
// Element of a spell or power from its effects, strongest first: Starre → frost, removal → shadow, damage → fire,
// healing → light, strengthening → gold, troops and armour → earth, knowledge → arcane.
const ELEMENT_OF=[['frost',['freeze']],['shadow',['destroy','silence','steal','enemyOverload','selfDamage','bounce']],['fire',['damage','aoe','randomDamage','face']],
 ['light',['heal','healAll','healHero']],['gold',['buff','buffAll','buffLeft','grant','grantAll','grantRandom','shield']],['earth',['summon','summonNew','armor','fortify','weapon','heroAttack']],['arcane',['draw','discover','echo']]];
const effectTypes=list=>(list||[]).flatMap(e=>[e.type,...effectTypes(e.then),...effectTypes(e.else),...effectTypes(e.onKill)]);
F.element=card=>{const types=new Set(effectTypes(card?.effects||card?.ability?.effects));return (ELEMENT_OF.find(([,ts])=>ts.some(x=>types.has(x)))||['arcane'])[0];};
F.ELEMENTS={fire:{core:'#fff3c4',mid:'#ff9a3a',edge:'#c8361a'},frost:{core:'#ffffff',mid:'#9fe4ff',edge:'#3a8ad8'},light:{core:'#fffdf0',mid:'#ffe9a0',edge:'#e8b84a'},
 gold:{core:'#fff8d8',mid:'#ffd25e',edge:'#b07a1e'},earth:{core:'#f6e2b8',mid:'#c99a5a',edge:'#6b4a2a'},arcane:{core:'#f6eeff',mid:'#b48cff',edge:'#5a3aa8'},
 shadow:{core:'#e8d8f0',mid:'#7a4a8a',edge:'#1a1020'},nature:{core:'#f0ffd8',mid:'#7ccf5a',edge:'#2f6b2a'},poison:{core:'#eaffd0',mid:'#7be04a',edge:'#1f6a1a'}};
// One effect per hero power (AP 3.6): its element, the path of the orb (arc, straight, spiral, rain from above, rise from
// the ground, wave from the hero), its own colour and the hero's glyph stamped where it lands. Since 1.23.0 (AP L.5) Hypatia's
// pupil rises in light, Imhotep's stone grows from the ground and Vercingetorix' burnt land falls on one enemy as fire.
F.POWERS={leonidas:['earth','wave','#d8a050'],hypatia:['light','rise','#9fd8ff'],imhotep:['earth','rise','#ffe39a'],dandolo:['earth','straight','#d89a6a'],
 khan:['nature','rain','#8fd06a'],boudicca:['fire','arc','#ff9a5a'],nostradamus:['arcane','spiral','#c8a8ff'],jeanne:['light','rise','#fff0c0'],
 ragnar:['earth','rise','#8ad0dc'],musashi:['gold','straight','#ffb0bc'],perikles:['light','rise','#f2f0e6'],agrippa:['earth','rise','#e8955a'],
 amanirenas:['gold','arc','#ffd84a'],anna:['arcane','spiral','#e09ad0'],nezahualcoyotl:['nature','wave','#ffa8d0'],masako:['gold','rise','#a8b8ff'],
 epaminondas:['gold','straight','#9ec0ff'],fabius:['frost','arc','#bfe8ff'],mandukhai:['nature','wave','#ffc070'],baibars:['fire','straight','#ff8a5a'],
 zizka:['earth','rise','#c8d0a0'],fuhao:['gold','spiral','#e8d070']};
F.power=hero=>{const [element,path,color]=F.POWERS[hero]||['arcane','arc','#ffe9a0'];return {element,path,color};};
// Sprites per element: a soft flash and one particle (ember, ice shard, ray, sparkle, chip, rune, smoke, leaf).
const flash=el=>R.sprite('flash:'+el,-34,-34,68,68,g=>{const p=F.ELEMENTS[el],gr=g.createRadialGradient(0,0,0,0,0,34);gr.addColorStop(0,p.core);gr.addColorStop(.35,p.mid+'aa');gr.addColorStop(1,p.edge+'00');g.fillStyle=gr;g.fillRect(-34,-34,68,68);});
const RUNES='ᚠᚢᚦᚨᚱᚲᚷᚹ';
const particle=el=>R.sprite('particle:'+el,-14,-14,28,28,g=>{const p=F.ELEMENTS[el];
 if(el==='frost'){g.scale(.55,.55);R.blit(g,shardSprite());return;}
 if(el==='gold'||el==='light'){g.shadowColor=p.mid;g.shadowBlur=6;g.fillStyle=p.core;sparkle(g,0,0,10,p.core);return;}
 if(el==='earth'){g.beginPath();g.moveTo(-6,-4);g.lineTo(2,-7);g.lineTo(7,-1);g.lineTo(3,6);g.lineTo(-5,5);g.closePath();g.fillStyle=grad(g,-7,-7,14,13,p.edge,p.mid);g.fill();g.strokeStyle='#2a1a0c';g.lineWidth=1;g.stroke();return;}
 if(el==='arcane'){g.shadowColor=p.mid;g.shadowBlur=8;txt(g,RUNES[0],0,1,18,p.core);return;}
 if(el==='shadow'){const gr=g.createRadialGradient(0,0,0,0,0,14);gr.addColorStop(0,'#3a2448d8');gr.addColorStop(.6,'#2a1a3488');gr.addColorStop(1,'#1a102000');g.fillStyle=gr;g.fillRect(-14,-14,28,28);return;}
 if(el==='nature'){g.beginPath();g.ellipse(0,0,9,4,.6,0,TAU);g.fillStyle=p.mid;g.fill();g.strokeStyle=p.edge;g.lineWidth=1.2;g.beginPath();g.moveTo(-7,-5);g.lineTo(7,5);g.stroke();return;}
 const gr=g.createRadialGradient(0,0,0,0,0,13);gr.addColorStop(0,p.core);gr.addColorStop(.4,p.mid+'cc');gr.addColorStop(1,p.edge+'00');g.fillStyle=gr;g.fillRect(-14,-14,28,28);});
// A burst where a spell or power lands: flash, particles by element and – for a hero power – the glyph in its colour.
function burst(c,f,t){const q=(t-f.start)/f.life,e=(t-f.start)/1000,el=f.element,sp=particle(el),n=f.n||11;c.save();c.translate(f.x,f.y);
 // Plain source-over everywhere: the sprites are already light; a „screen“ blend cost twice as much at 4× CPU.
 const fa=1-q*1.8;if(fa>.02){c.save();c.globalAlpha=fa;const fs=(.9+q*1.1)*(f.size||1);c.scale(fs,fs);R.blit(c,flash(el));c.restore();}
 for(let i=0;i<n;i++){const an=noise(f.seed,i)*TAU,v=(50+noise(f.seed,i+40)*90)*(f.size||1),life=.55+noise(f.seed,i+80)*.45,p=clamp(q/life);if(p>=1)continue;
  let x=Math.cos(an)*v*e,y=Math.sin(an)*v*e*.7,rot=0,s=1-p*.5;
  if(el==='fire'){y-=60*e;s=1.1-p*.8;}else if(el==='earth'){y=Math.sin(an)*v*e*.4-110*e+260*e*e;rot=e*6*(noise(f.seed,i+5)-.5);}
  else if(el==='nature'){y=Math.sin(an)*v*e*.5+40*e*e;x+=Math.sin(e*8+i)*10;rot=Math.sin(e*6+i)*1.2;}
  else if(el==='shadow'){const sw=an+e*2.4;x=Math.cos(sw)*v*e*.8;y=Math.sin(sw)*v*e*.5-20*e;s=1.2+p;}
  else if(el==='arcane'){const ring=an+e*1.8;x=Math.cos(ring)*(30+v*e*.6);y=Math.sin(ring)*(22+v*e*.4);}
  else if(el==='light'||el==='gold'){y-=50*e;s=(.8+.4*Math.sin(e*18+i))*(1-p*.4);}
  else if(el==='frost')rot=an+Math.PI/2;
  c.save();c.globalAlpha=(1-p)*(el==='shadow'?.7:1);c.translate(x,y);if(rot)c.rotate(rot);c.scale(s,s);R.blit(c,sp);c.restore();}
 if(f.glyph){const g=ease.outBack(clamp(q/.3)),a=q<.55?1:1-(q-.55)/.45;c.save();c.globalAlpha=Math.max(0,a);c.scale(.6+g*.9,.6+g*.9);c.translate(0,-q*16);R.blit(c,glyphSprite(f.glyph,f.color));c.restore();}
 c.restore();}
// ASTRA: faehigkeits-effekt – leuchtendes Fähigkeitssymbol des Helden über dem Ziel (22 Farben), 160 × 160
const glyphSprite=(hero,color)=>R.sprite('glyph:'+hero,-40,-40,80,80,g=>{g.shadowColor=color;g.shadowBlur=14;ellipse(g,0,0,30,30,'#1a120a66',color,2.4);g.shadowBlur=10;powerIcon(g,hero,0,0);});
// The orb of a spell or power on its way: colours of the element, a short trail, and the hero's path.
F.orb=(c,x,q,from,to)=>{const pw=x.action.type==='power'?F.power(x.before.players[x.p].hero):null,el=pw?pw.element:F.element(x.card),p=F.ELEMENTS[el],path=pw?.path||'arc';
 const at=k=>{let ox=mix(from.x,to.x,k),oy=mix(from.y,to.y,k);
  if(path==='arc')oy-=Math.sin(k*Math.PI)*65;else if(path==='spiral'){ox+=Math.sin(k*TAU*1.5)*40*(1-k);oy+=Math.cos(k*TAU*1.5)*30*(1-k)-Math.sin(k*Math.PI)*40;}
  else if(path==='rain'){ox=to.x+(1-k)*120;oy=mix(to.y-320,to.y,k);}else if(path==='rise'){ox=to.x;oy=mix(to.y+60,to.y,ease.outCubic(k));}
  else if(path==='wave'){ox=mix(from.x,to.x,k);oy=mix(from.y,to.y,k);}return {x:ox,y:oy};};
 c.save();c.globalCompositeOperation='screen';
 if(path==='wave'){const r=20+q*220;c.globalAlpha=1-q*.6;ellipse(c,from.x,from.y,r,r*.55,null,pw?.color||p.mid,6*(1-q)+1.5);}
 for(let i=5;i>=0;i--){const k=clamp(q-i*.045),pos=at(k),s=(1-i/7)*(i?.55:1);c.globalAlpha=i?.45*(1-i/6):1;c.save();c.translate(pos.x,pos.y);c.scale(s*.75,s*.75);R.blit(c,flash(el));c.restore();}
 if(pw){const pos=at(q);c.globalAlpha=.9;c.save();c.translate(pos.x,pos.y);c.scale(.45,.45);R.blit(c,glyphSprite(x.before.players[x.p].hero,pw.color));c.restore();}
 c.restore();};
// Where a spell or power lands: every unit an event names (damage, healing, Starre, strengthening, a summon), at most
// eight; else its target or the middle of the table.
F.cast=(x,t)=>{const power=x.action.type==='power',pw=power?F.power(x.before.players[x.p].hero):null,el=pw?pw.element:F.element(x.card);
 const ids=[...new Set(x.after.events.filter(e=>['damage','heal','freeze','buff','summon','armor','shield','steal','silence','destroy','bounce'].includes(e.type)).map(e=>e.target).filter(Boolean))].slice(0,8);
 const spots=(ids.length?ids:[x.action.target||(power?'h'+x.p:null)]).map(id=>id?CHM.position(x.after,id)||CHM.position(x.before,id):{x:800,y:357}).filter(Boolean);
 spots.forEach((pos,i)=>R.fx.push({type:'burst',element:el,x:pos.x,y:pos.y,seed:x.id*7+i,start:t+i*40,life:power?900:760,n:spots.length>3?7:11,size:spots.length>3?.8:1,
  ...(power&&i===0?{glyph:x.before.players[x.p].hero,color:pw.color}:{})}));
 if(power&&pw.path==='wave')R.fx.push({type:'burst',element:el,x:CHM.position(x.before,'h'+x.p).x,y:CHM.position(x.before,'h'+x.p).y,seed:x.id,start:t,life:700,n:10,size:1.3});};

// Event hook from R.events: keyword effects that belong to one event. Returns true when it handled the sound.
F.event=(ev,pos,t,fx)=>{const u=R.units[ev.target];
 if(ev.type==='shield'){if(fx&&u)R.fx.push({type:'gunst',x:u.x,y:u.y,seed:t%997,start:t,life:620});CHA.play('clink',{x:pos.x});return true;}
 if(ev.type==='freeze'){if(fx&&u)R.fx.push({type:'frostburst',x:u.x,y:u.y,start:t,life:700});CHA.play('chains',{x:pos.x,gain:.8});return true;}
 if(ev.type==='poison'){if(fx)R.fx.push({type:'poison',x:pos.x,y:pos.y,seed:t%991,start:t,life:900});CHA.play('poison',{x:pos.x});return true;}
 if(ev.type==='death'&&u&&u.card?.death&&!u.u.silenced&&!u.u.building){if(fx)R.fx.push({type:'urn',x:u.x,y:u.y,start:t+120,life:1100});R.fx.push({type:'sound',sound:'channel',x:u.x,gain:.45,start:t+220,life:300});}
 return false;};
F.paint={gunst:gunstBreak,frostburst:freezeBurst,poison:poisonBurst,urn:urnRelease,burst};

// ---------- Opening and close (AP 3.8) ----------
// F.stage: {kind, at, info, done, held}. The opening: the heroes face each other (0–450 ms), the chronicler's banner
// unrolls (200–900), a bronze coin is tossed (1300) and lands on the face of the side that begins (2250), the word
// follows; at 3200 the dialog of the starting hand opens. A tap skips it. The close: the loser's relief cracks (0–420),
// breaks (420), the banner unrolls with war horns (650–1500) and the result follows at 2500; the banner and the broken
// relief stay under the dialog.
const OPENING={duel:450,banner:200,toss:1300,land:2250,word:2350,end:3200},FINALE={crack:420,banner:650,unroll:850,end:2500};
F.present=(kind,info,done)=>{if(kind==='stop'){F.stop();done();return 0;}if(still()){done();return 0;}const at=now();
 if(kind==='opening'){F.stage={kind,at,info,done,coin:false};CHA.play('horn',{gain:.35,delay:.15});CHA.play('page',{gain:.7,delay:.25});return OPENING.end;}
 if(kind==='finale'){F.stage={kind,at,info:{...info,loser:info.winner===0?1:info.winner===1?0:null},done,held:false,broke:false};T.shake.add(.25);CHA.play('seal',{x:800,gain:.9});return FINALE.end;}
 done();return 0;};
F.busy=()=>!!F.stage&&!F.stage.held;
F.skip=()=>{const st=F.stage;if(!st||st.held)return;if(st.kind==='finale'){st.held=true;st.at=now()-FINALE.end;}else F.stage=null;st.done?.();};
F.cancel=()=>{const st=F.stage;F.stage=null;if(st&&!st.held)st.done?.();};
// Leaving the match: the opening or close is dropped without going on (the view model shows it again on return).
F.stop=()=>{F.stage=null;};
// The relief of a side is hidden once it has broken.
F.hidden=p=>F.stage?.kind==='finale'&&F.stage.broke&&F.stage.info.loser===p;
// ASTRA: chronik-banner – Pergamentband des Chronisten mit der Ankündigung der Schlacht, 1400 × 160
const ribbon=(w,text)=>R.sprite('ribbon:'+w+':'+text,-w/2-40,-46,w+80,92,g=>{g.shadowColor='#160e09aa';g.shadowBlur=10;g.shadowOffsetY=4;
 g.beginPath();g.moveTo(-w/2-30,-20);g.lineTo(-w/2,-28);g.lineTo(w/2,-28);g.lineTo(w/2+30,-20);g.lineTo(w/2+16,0);g.lineTo(w/2+30,20);g.lineTo(w/2,28);g.lineTo(-w/2,28);g.lineTo(-w/2-30,20);g.lineTo(-w/2-16,0);g.closePath();
 g.fillStyle=grad(g,-w/2,-28,w,56,'#d9c49a','#f6ecd2');g.fill();g.shadowBlur=0;g.shadowOffsetY=0;g.strokeStyle='#7a5a2e';g.lineWidth=2;g.stroke();
 for(const s of [-1,1]){round(g,s*w/2-6,-34,12,68,5,grad(g,s*w/2-6,-34,12,68,'#4a2e14','#b07a3a'),'#2a1a0c',1.5);}
 g.font='italic 25px Body,serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#3b2812';g.fillText(text,0,1,w-30);});
// ASTRA: muenze-initiative – bronzene Münze der Feldzug-Initiative mit den Bildnissen beider Helden, 400 × 400
const medal=(s,p)=>{const hero=D.heroById[s.players[p].hero],skin=hero.art&&(p===0&&R.look.skins?.[hero.id]||hero.art);
 return R.sprite('medal:'+hero.id+':'+skin+':'+!!R.images[skin],-80,-80,160,160,g=>R.medal(g,hero,skin),1.6);};
function opening(c,s,t,st){const e=t-st.at,info=st.info,fade=e>OPENING.end-260?clamp((OPENING.end-e)/260):1;
 c.save();c.globalAlpha=fade;c.fillStyle='#0b0806';c.globalAlpha=fade*.62*clamp(e/250);c.fillRect(-60,-60,1720,920);c.globalAlpha=fade;
 // The heroes face each other.
 const duel=ease.outBack(clamp(e/OPENING.duel)),side=e>OPENING.toss?ease.inOutCubic(clamp((e-OPENING.toss)/400)):0;
 for(const p of [0,1]){const dir=p===0?-1:1,x=800+dir*mix(900,330,duel)+dir*side*60,y=380,k=mix(1.55,1.25,side);c.save();c.translate(x,y);c.scale(k,k);R.blit(c,medal(s,p));c.restore();
  txt(c,info.names[p],x,y+128*k/1.25,26,'#f6e2b0');txt(c,info.eras[p],x,y+158*k/1.25,17,'#d9c49a');}
 if(e<OPENING.toss+200){c.save();c.globalAlpha=fade*clamp((e-300)/200)*(1-clamp((e-OPENING.toss)/200));txt(c,'GEGEN',800,380,30,'#e8c47e');c.restore();}
 // The chronicler announces the battle on an unrolling banner.
 const un=ease.outCubic(clamp((e-OPENING.banner)/700)),bw=Math.min(1240,info.line.length*11.5+120);
 if(un>0){c.save();c.beginPath();c.rect(800-(bw/2+50)*un,60,(bw+100)*un,120);c.clip();R.blit(c,ribbon(bw,info.line),800,118);c.restore();txt(c,'DER CHRONIST VERKÜNDET',800,64,15,'#d9c49a');}
 // The coin of the Feldzug-Initiative: thrown up, spinning, it lands on the face of the side that begins.
 if(e>=OPENING.toss){if(!st.coin){st.coin=true;CHA.play('toss',{gain:.9});}
  const q=clamp((e-OPENING.toss)/(OPENING.land-OPENING.toss)),y=q<1?mix(560,400,q)-Math.sin(q*Math.PI)*260:400-Math.abs(Math.sin((e-OPENING.land)/90))*12*Math.exp(-(e-OPENING.land)/160);
  const turns=7+(info.first===0?0:1),phase=q*turns*Math.PI,face=Math.floor((phase+Math.PI/2)/Math.PI)%2===0?0:1,sx=Math.abs(Math.cos(phase));
  if(e>=OPENING.land&&!st.landed){st.landed=true;CHA.play('coins',{gain:.45});T.shake.add(.12);}
  c.save();c.translate(800,y);c.scale(Math.max(.04,sx)*.95,.95);R.blit(c,medal(s,q<1?face:info.first));c.restore();
  if(e>=OPENING.word){const w=ease.outBack(clamp((e-OPENING.word)/300));c.save();c.translate(800,560);c.scale(w,w);txt(c,info.first===0?'DU BEGINNST':info.firstName.toUpperCase()+' BEGINNT',0,0,40,'#ffe6a6');
   if(info.first!==0)txt(c,'Du erhältst die Gunst der Stunde',0,44,21,'#f0dcb0');c.restore();}}
 txt(c,'Tippen zum Überspringen',800,770,14,'#d9c49a99');
 c.restore();
 if(e>=OPENING.end){F.stage=null;st.done?.();}}
// ASTRA: triumph-banner – Siegesbanner „TRIUMPH“ (rot und gold), Niederlage und Unentschieden, das sich an einer Stange entrollt, 900 × 520
const banner=kind=>R.sprite('banner:'+kind,-230,-30,460,300,g=>{const cols={win:['#7a1414','#c8322a','#ffd36a'],loss:['#1e1a24','#3a3446','#a8a0b8'],draw:['#2a2a22','#5a5444','#e0d0a0']}[kind];
 g.shadowColor='#0008';g.shadowBlur=14;g.shadowOffsetY=6;g.beginPath();g.moveTo(-180,0);g.lineTo(180,0);g.lineTo(180,230);g.lineTo(0,268);g.lineTo(-180,230);g.closePath();g.fillStyle=grad(g,-180,0,360,0,cols[0],cols[1]);g.fill();
 g.shadowBlur=0;g.shadowOffsetY=0;g.strokeStyle=cols[2];g.lineWidth=5;g.stroke();g.lineWidth=1.5;g.beginPath();g.moveTo(-166,12);g.lineTo(166,12);g.lineTo(166,222);g.lineTo(0,254);g.lineTo(-166,222);g.closePath();g.stroke();
 round(g,-214,-18,428,22,10,grad(g,-214,-18,428,22,'#4a2e14','#d0a050'),'#2a1a0c',2);for(const s of [-1,1])ellipse(g,s*214,-7,14,14,grad(g,s*214-14,-21,28,28,'#8a5a1e','#ffe08a'),'#2a1a0c',2);
 g.font='bold 54px Title,serif';g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.strokeStyle='#1a0a06';g.lineWidth=7;const word={win:'TRIUMPH',loss:'NIEDERLAGE',draw:'REMIS'}[kind];
 g.font=`bold ${word.length>8?40:54}px Title,serif`;g.strokeText(word,0,112);g.fillStyle=cols[2];g.fillText(word,0,112);
 g.font='26px Body,serif';g.fillStyle=cols[2]+'cc';g.fillText(kind==='win'?'✦ ✦ ✦':kind==='loss'?'⚔':'⚖',0,176);});
// The relief breaks: wedges of the coin fly apart, a ring of dust.
function relief(c,s,st,e){const p=st.info.loser,pos=CHM.position(s,'h'+p),k=L.heroScale(p);
 if(e<FINALE.crack){const q=e/FINALE.crack;c.save();c.translate(pos.x,pos.y);c.scale(k,k);c.strokeStyle='#1a0e06';c.lineWidth=2.5;c.lineCap='round';
  for(let i=0;i<7;i++){const an=i/7*TAU+.4,len=74*ease.outCubic(clamp(q*1.4-i*.06));c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(an)*len*.5+Math.sin(i)*6,Math.sin(an)*len*.5);c.lineTo(Math.cos(an)*len,Math.sin(an)*len);c.stroke();}c.restore();return;}
 if(!st.broke){st.broke=true;T.clock.stop(70);T.shake.add(.45,.12);CHA.play('slam',{x:pos.x,gain:.8});R.fx.push({type:'dust',x:pos.x,y:pos.y+30,weight:.6,start:now(),life:900});}
 const d=(e-FINALE.crack)/1000,sp=medal(s,p);if(d>1.6)return;c.save();c.globalAlpha=clamp(1-(d-.8)/.8);
 for(let i=0;i<10;i++){const a0=i/10*TAU,mid=a0+TAU/20,v=120+noise(p+3,i)*110;c.save();c.translate(pos.x+Math.cos(mid)*v*d,pos.y+Math.sin(mid)*v*d*.8+380*d*d);c.rotate((noise(p+7,i)-.5)*5*d);c.scale(k,k);
  c.beginPath();c.moveTo(0,0);c.arc(0,0,76,a0,a0+TAU/10);c.closePath();c.clip();R.blit(c,sp);c.restore();}
 c.restore();}
function finale(c,s,t,st){const e=st.held?FINALE.end:t-st.at,kind=st.info.winner===0?'win':st.info.winner===1?'loss':'draw';
 if(st.info.loser!=null)relief(c,s,st,e);
 if(e>=FINALE.banner){if(!st.horn){st.horn=true;CHA.play('horn',{gain:kind==='win'?1:.6});}
  const q=ease.outCubic(clamp((e-FINALE.banner)/FINALE.unroll)),drop=ease.outBack(clamp((e-FINALE.banner)/350));
  c.save();c.translate(800,mix(-60,250,drop));c.beginPath();c.rect(-240,-40,480,40+290*q);c.clip();R.blit(c,banner(kind));c.restore();}
 if(!st.held&&e>=FINALE.end){st.held=true;st.done?.();}}
// Drawn last over the board (R.draw). A held close is dropped as soon as another game is shown.
F.draw=(c,s,t)=>{const st=F.stage;if(!st)return;if(st.kind==='finale'&&s.phase!=='over'){F.stage=null;return;}
 if(st.kind==='opening')opening(c,s,t,st);else finale(c,s,t,st);};
})();
