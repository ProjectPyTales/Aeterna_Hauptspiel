(function(){'use strict';const D=CHD,E=CHE,L=CHL,T=CHT;const R=window.CHR={images:{},thumbs:{},hits:[],positions:{},fx:[],pointer:null,look:{back:'chroniken',board:'board',skins:{}},pending:{}};
// Pictures for the match, the collection and the bazaar (AP 2.2): they load in the background while the hall is already
// shown; progress(done,total) drives the loading bar. Kept as decoded ImageBitmaps: drawing from an <img> may decode
// the WebP again on every drawImage (a legendary card picture took 84 instead of 11 ms). Decoded from the fetched
// file, which happens off the main thread – createImageBitmap(<img>) blocked the hall for up to 3 s at 4× CPU.
const picture=name=>{const src='assets/art/'+name+'.webp',viaImage=()=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src;});
 return window.createImageBitmap?fetch(src).then(r=>{if(!r.ok)throw Error(r.status);return r.blob();}).then(b=>createImageBitmap(b)).catch(viaImage):viaImage();};
// Atlases come from the heroes and cards themselves (since 1.21.0, AP A.1, Astra's portraits in heroes and heroes2).
R.atlases=()=>['board',...new Set(D.heroes.map(h=>h.art).filter(Boolean)),'heroes-marble',...new Set(Object.values(D.byId).map(c=>c.art).filter(a=>a&&a[0]!=='@'))];
R.load=(progress=()=>{})=>{const names=R.atlases();let done=0;
 return Promise.all(names.map(name=>picture(name).then(im=>{R.images[name]=im;},()=>null).then(()=>progress(++done,names.length))));};
R.ensure=name=>{if(R.images[name]||R.pending[name])return;R.pending[name]=true;picture(name).then(im=>{R.images[name]=im;},()=>null).then(()=>delete R.pending[name]);};
// Pixel density and pre-rendered sprites (AP 2.4). The match canvas holds R.scale device pixels per stage unit (pixel
// density, at most 2). Glows, shadows and whole plaques are drawn once into an offscreen canvas at that density and
// afterwards only copied – shadowBlur on every frame was the most expensive part of a picture. The canvas matrix does
// not scale shadows, so R.scaled multiplies blur and offset on a scaled context: everything keeps its old size.
R.scale=1;
const SHADOW=['shadowBlur','shadowOffsetX','shadowOffsetY'];
R.scaled=(c,k)=>{if(!('__k' in c))for(const name of SHADOW){const d=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(c),name);
 Object.defineProperty(c,name,{configurable:true,get(){return d.get.call(this)/this.__k;},set(v){d.set.call(this,v*this.__k);}});}c.__k=k;return c;};
// A sprite covers the box x, y, w, h of its own coordinates; res is the extra scale it is drawn with (plaques, portraits).
const sprites=new Map();
R.sprite=(key,x,y,w,h,paint,res=1)=>{const k=R.scale*res,id=key+'@'+k;let sp=sprites.get(id);
 if(!sp){const cv=document.createElement('canvas');cv.width=Math.max(1,Math.ceil(w*k));cv.height=Math.max(1,Math.ceil(h*k));
  const g=R.scaled(cv.getContext('2d'),R.scale);g.scale(k,k);g.translate(-x,-y);paint(g);
  if(sprites.size>=400)sprites.clear();sp={cv,x,y,w,h};sprites.set(id,sp);}
 return sp;};
R.blit=(c,sp,dx=0,dy=0)=>c.drawImage(sp.cv,dx+sp.x,dy+sp.y,sp.w,sp.h);
R.sprites=()=>sprites.size;
// Soft glow behind a card or plaque: a filled shape with its shadow, drawn once.
const glow=(w,h,r,color,blur)=>R.sprite('glow:'+[w,h,r,color,blur],-blur*2,-blur*2,w+blur*4,h+blur*4,g=>{g.shadowColor=color;g.shadowBlur=blur;round(g,0,0,w,h,r,color);});
// Cast shadow of a flying or dragged card (drawn for a 200-unit card, scaled to the flight).
R.cardShadow=()=>R.sprite('cardshadow',-40,-40,280,362,g=>{g.shadowColor='#000a';g.shadowBlur=24;round(g,0,0,200,282,14,'#000a');});
function round(c,x,y,w,h,r,fill,stroke,lw=1){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke();}}
function ellipse(c,x,y,rx,ry,fill,stroke,lw=1){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke();}}
function txt(c,t,x,y,size=18,color='#fff',align='center',max){c.font=`${size}px ${size>=22?'Title':'Body'},serif`;c.textAlign=align;c.textBaseline='middle';c.fillStyle=color;if(max)c.fillText(t,x,y,max);else c.fillText(t,x,y);}
function number(c,t,x,y,size=30){c.font=`bold ${size}px Title,serif`;c.textAlign='center';c.textBaseline='middle';c.strokeStyle='#171416';c.lineWidth=5;c.lineJoin='round';c.strokeText(t,x,y);c.fillStyle='#fff6dc';c.fillText(t,x,y);}
function grad(c,x,y,w,h,a,b){let g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,a);g.addColorStop(.45,b);g.addColorStop(1,a);return g;}
// ASTRA: edelstein – facettierter Edelstein für Kosten, Seltenheit und Mana (je Farbe), 96 × 96
function gem(c,x,y,r,color,label){c.save();c.translate(x,y);c.beginPath();c.moveTo(0,-r);c.lineTo(r*.82,-r*.4);c.lineTo(r,r*.35);c.lineTo(0,r);c.lineTo(-r,r*.35);c.lineTo(-r*.82,-r*.4);c.closePath();const g=c.createLinearGradient(-r,-r,r,r);g.addColorStop(0,'#f5ffff');g.addColorStop(.22,color);g.addColorStop(.62,color);g.addColorStop(1,'#162030');c.fillStyle=g;c.fill();c.lineWidth=2;c.strokeStyle='#172c50';c.stroke();c.beginPath();c.moveTo(-r*.82,-r*.4);c.lineTo(0,0);c.lineTo(r*.82,-r*.4);c.moveTo(0,0);c.lineTo(0,r);c.strokeStyle='#ffffff50';c.stroke();if(label!=null)number(c,label,0,1,r*1.4);c.restore();}
// ASTRA: lebensherz – Herz für die Lebenspunkte, 96 × 96
function heart(c,x,y,r,label){c.beginPath();c.moveTo(x,y-r);c.bezierCurveTo(x+r*.4,y-r*.2,x+r,y+r*.05,x+r*.8,y+r*.55);c.bezierCurveTo(x+r*.45,y+r*1.4,x-r*.8,y+r*1.4,x-r*.86,y+r*.4);c.bezierCurveTo(x-r*.92,y-r*.1,x-r*.3,y-r*.4,x,y-r);c.fillStyle=grad(c,x-r,y-r,2*r,2*r,'#731c23','#ee5a47');c.fill();c.strokeStyle='#321211';c.lineWidth=3;c.stroke();number(c,label,x,y+r*.35,r*1.25);}
// Placeholder art drawn in code (AP 5.12 preview): the step pyramid of Djoser until a painted motif exists.
// ASTRA: stufenpyramide – Motiv der Stufenpyramide des Djoser (Spielstein pyramid), 724 × 724
function pyramidArt(c,x,y,w,h){c.save();c.beginPath();c.rect(x,y,w,h);c.clip();
 const sky=c.createLinearGradient(0,y,0,y+h);sky.addColorStop(0,'#f2c37a');sky.addColorStop(.55,'#f7dfae');sky.addColorStop(.56,'#d9b47a');sky.addColorStop(1,'#a97c44');c.fillStyle=sky;c.fillRect(x,y,w,h);
 const sun=c.createRadialGradient(x+w*.74,y+h*.24,0,x+w*.74,y+h*.24,w*.2);sun.addColorStop(0,'#fffbe8');sun.addColorStop(.4,'#ffe7a3');sun.addColorStop(1,'#ffe7a300');c.fillStyle=sun;c.fillRect(x,y,w,h);
 const base=y+h*.8,steps=6,sw=w*.86,sh=h*.075;for(let i=0;i<steps;i++){const ww=sw*(1-i*.14),xx=x+(w-ww)/2,yy=base-(i+1)*sh;
  const g=c.createLinearGradient(xx,0,xx+ww,0);g.addColorStop(0,'#f6dca4');g.addColorStop(.62,'#d8a964');g.addColorStop(.63,'#a87a43');g.addColorStop(1,'#8a6033');c.fillStyle=g;c.fillRect(xx,yy,ww,sh+.5);
  c.fillStyle='#5b3d1f55';c.fillRect(xx,yy+sh-1.2,ww,1.2);}
 c.fillStyle='#3f2a1544';c.fillRect(x,base,w,h-base+y);c.restore();}
// Designed placeholder for a missing motif (AP 5.12): epoch colour of the hero, a large symbol (hero sign, type or
// tower), a notice "Motiv folgt"; heroes without a portrait get a bronze medallion with a monogram. Large versions
// (detail view) also carry the name. Every placeholder drawn is counted in R.placeholderIds for the visual check.
R.placeholderIds=new Set();
function mix(hex,t){const n=parseInt(hex.slice(1,7),16),ch=[n>>16,n>>8&255,n&255].map(v=>Math.round(t>0?v+(255-v)*t:v*(1+t)));return '#'+ch.map(v=>v.toString(16).padStart(2,'0')).join('');}
// Ordinal numbers (Ahhotep I.) are no initials: „A“, not „AI“.
const monogram=name=>{const w=name.replace(/[,.’']/g,'').split(/\s+/).filter(x=>/^[A-ZÄÖÜ]/.test(x)&&!/^[IVX]+$/.test(x));return ((w[0]||name)[0]+(w.length>1?w[w.length-1][0]:'')).toUpperCase();};
function placeholderArt(c,item,x,y,w,h){R.placeholderIds.add(item.id);const isHero=!!item.power,hero=isHero?item:D.owner(item),col=hero?hero.color:'#7c6a4c',k=Math.min(w,h),cx=x+w/2,big=w>=250;
 c.save();c.beginPath();c.rect(x,y,w,h);c.clip();
 const g=c.createRadialGradient(cx,y+h*.4,k*.04,cx,y+h*.45,k*.8);g.addColorStop(0,mix(col,.45));g.addColorStop(.55,col);g.addColorStop(1,mix(col,-.65));c.fillStyle=g;c.fillRect(x,y,w,h);
 c.save();c.translate(cx,y+h*.42);c.strokeStyle=mix(col,.6)+'55';c.lineWidth=Math.max(1,k*.012);for(let i=0;i<16;i++){c.rotate(Math.PI/8);c.beginPath();c.moveTo(k*.2,0);c.lineTo(k*.5,0);c.stroke();}c.restore();
 const cy=y+h*(isHero?.5:big?.46:.4),r=k*(isHero?.36:.25);
 c.beginPath();c.arc(cx,cy,r,0,Math.PI*2);c.fillStyle=mix(col,-.45)+'cc';c.fill();c.lineWidth=k*.025;c.strokeStyle=grad(c,cx-r,cy-r,2*r,2*r,'#7a5a2c','#f1d79a');c.stroke();
 c.beginPath();c.arc(cx,cy,r*.84,0,Math.PI*2);c.lineWidth=Math.max(1,k*.007);c.strokeStyle='#f1d79a99';c.stroke();
 const sign=isHero?monogram(item.name):item.building?'♜':hero?hero.icon:item.type==='spell'?'✦':'⚔';
 c.font=`${Math.round(r*(isHero?.95:1.05))}px Title,serif`;c.textAlign='center';c.textBaseline='middle';c.lineWidth=k*.02;c.strokeStyle='#1d140c';c.strokeText(sign,cx,cy+r*.05,r*1.5);c.fillStyle='#f8e7bd';c.fillText(sign,cx,cy+r*.05,r*1.5);
 if(!isHero){if(big)txt(c,item.name,cx,y+h*.12,Math.round(k*.07),'#fff1cf','center',w*.9);
  if(k>=130){c.font=`${Math.round(k*(big?.05:.062))}px Body,serif`;c.fillStyle='#fff1cfd0';c.fillText('MOTIV FOLGT',cx,cy+r+k*(big?.08:.07));}}
 c.restore();}
R.tile=(c,name,cell,x,y,w,h,item)=>{if(name==='@pyramid'){R.placeholderIds.add('pyramid');pyramidArt(c,x,y,w,h);return;}if(!name&&item){placeholderArt(c,item,x,y,w,h);return;}const im=R.images[name]||R.images.heroes;if(!im){c.fillStyle='#725938';c.fillRect(x,y,w,h);return;}const cw=im.width/4,ch=im.height/3;c.drawImage(im,(cell%4)*cw,Math.floor(cell/4)*ch,cw,ch,x,y,w,h);};
function lines(c,text,max){const words=text.split(' '),out=[];let line='';for(const w of words){const n=line?line+' '+w:w;if(c.measureText(n).width>max&&line){out.push(line);line=w;}else line=n;}if(line)out.push(line);return out;}
const rarityColor={basic:'#99938a',common:'#c6cac7',rare:'#55b8f9',epic:'#b56fe9',legendary:'#ffb94b',token:'#988a69'};
R.rarityColor=rarityColor;
// AP 1.5: the card as a temple gate – a gable with the owner's sign, a cornice, two fluted columns beside an arched art
// window, the name on a ribbon, the rules on parchment and a stepped plinth. Cost in an ether crystal (as in the ether
// dial), attack on crossed blades, health in a shield, durability on a tower; rarity as an archive seal, legendaries
// crowned by a golden laurel. Golden cards (cosmetic, opts.gold) are gilded all over. Drawn in code until Astra paints them.
const gatePath=c=>{c.beginPath();c.moveTo(4,36);c.lineTo(4,27);c.lineTo(100,3);c.lineTo(196,27);c.lineTo(196,268);c.quadraticCurveTo(196,279,185,279);c.lineTo(15,279);c.quadraticCurveTo(4,279,4,268);c.closePath();};
R.gatePath=gatePath;
const FRAME={plain:{stone:['#a8977a','#f1e8d2'],column:['#b5a481','#f6eedb'],trim:'#b08a4a',ink:'#3b2812'},
 legend:{stone:['#9a7a34','#f6e2a6'],column:['#b89a58','#fbf0cc'],trim:'#e6c065',ink:'#3b2812'},
 gold:{stone:['#94600f','#ffd56a'],column:['#a8701a','#ffe28a'],trim:'#fff1b0',ink:'#4a2c06'}};
// ASTRA: werte-kristall – Ätherkristall der Kosten wie in der Äther-Uhr (blau, billiger grün, teurer rot), 160 × 160
function etherCrystal(c,x,y,r,label,tone='blue'){const t={blue:['#eefaff','#49aef8','#123a78','#0b1d3d'],green:['#efffe8','#5fd06a','#1d6a2c','#0d2a12'],red:['#fff0ea','#f06a50','#7a2016','#2e0a06']}[tone];
 c.save();c.translate(x,y);const pts=[[0,-1.2],[.86,-.2],[.62,.86],[0,1.14],[-.62,.86],[-.86,-.2]];
 c.beginPath();pts.forEach(([px,py],i)=>c[i?'lineTo':'moveTo'](px*r,py*r));c.closePath();
 const f=c.createLinearGradient(-r,-r*1.2,r*.8,r*1.2);f.addColorStop(0,t[0]);f.addColorStop(.3,t[1]);f.addColorStop(.75,t[2]);f.addColorStop(1,t[3]);c.fillStyle=f;c.fill();
 c.lineWidth=2.4;c.strokeStyle='#e8cf8f';c.stroke();c.lineWidth=1;c.strokeStyle=t[3];c.stroke();
 c.beginPath();for(const [px,py] of pts){c.moveTo(0,-r*.1);c.lineTo(px*r,py*r);}c.strokeStyle='#ffffff40';c.lineWidth=1;c.stroke();
 c.beginPath();c.moveTo(-r*.5,-r*.55);c.lineTo(-r*.1,-r*.95);c.strokeStyle='#ffffffb0';c.lineWidth=2;c.stroke();
 number(c,label,0,r*.1,r*1.3);c.restore();}
// ASTRA: werte-klingen – Angriff auf zwei gekreuzten Klingen hinter einer Bronzescheibe, 160 × 160
function blades(c,x,y,label){c.save();c.translate(x,y);
 for(const sx of [-1,1]){c.save();c.rotate(sx*.74);c.beginPath();c.moveTo(-3,12);c.lineTo(-3,-25);c.lineTo(0,-31);c.lineTo(3,-25);c.lineTo(3,12);c.closePath();
  c.fillStyle=grad(c,-3,0,6,0,'#7d898f','#f4f8f9');c.fill();c.strokeStyle='#2c3438';c.lineWidth=1.2;c.stroke();
  round(c,-9,12,18,4,2,'#c9a052','#4a3418',1);round(c,-2,16,4,8,1.5,'#5a3d1e');c.restore();}
 ellipse(c,0,2,17,17,grad(c,-17,-15,34,34,'#8a6526','#f2d38a'),'#3b2812',2.5);ellipse(c,0,2,13.5,13.5,null,'#fff0c466',1);
 number(c,label,0,3,25);c.restore();}
// ASTRA: werte-schild – Leben im roten Schild mit Goldrand, 160 × 160
function lifeShield(c,x,y,label){c.save();c.translate(x,y);
 c.beginPath();c.moveTo(-18,-19);c.quadraticCurveTo(0,-25,18,-19);c.lineTo(18,0);c.quadraticCurveTo(16,15,0,23);c.quadraticCurveTo(-16,15,-18,0);c.closePath();
 c.fillStyle=grad(c,-18,-24,36,48,'#5b1620','#d23c4a');c.fill();c.lineWidth=3.2;c.strokeStyle='#e0bd76';c.stroke();c.lineWidth=1.1;c.strokeStyle='#3a1015';c.stroke();
 number(c,label,0,1,25);c.restore();}
// ASTRA: werte-turm – Haltbarkeit eines Bauwerks auf einem Steinturm, 160 × 160
function towerBadge(c,x,y,label){c.save();c.translate(x,y);
 c.beginPath();c.moveTo(-17,22);c.lineTo(-14,-12);c.lineTo(-18,-12);c.lineTo(-18,-22);c.lineTo(-10,-22);c.lineTo(-10,-17);c.lineTo(-3,-17);c.lineTo(-3,-22);c.lineTo(3,-22);c.lineTo(3,-17);c.lineTo(10,-17);c.lineTo(10,-22);c.lineTo(18,-22);c.lineTo(18,-12);c.lineTo(14,-12);c.lineTo(17,22);c.closePath();
 c.fillStyle=grad(c,-18,-22,36,44,'#6f6a62','#d9d2c4');c.fill();c.lineWidth=2.2;c.strokeStyle='#3a3631';c.stroke();
 number(c,label,0,3,24);c.restore();}
// Archive seals of rarity: bronze (common), silver (rare), gold (epic), sky obsidian with stars (legendary); basic cards
// and tokens carry none.
const SEALS={common:['#6b4520','#e2b06a','#3a240f'],rare:['#5f6a74','#f2f6f8','#2c3238'],epic:['#7a5212','#ffe28a','#3d2a07'],legendary:['#0c0e1c','#5a6ac0','#05060c']};
function sparkle(c,x,y,r,color){c.beginPath();c.moveTo(x,y-r);c.quadraticCurveTo(x,y,x+r,y);c.quadraticCurveTo(x,y,x,y+r);c.quadraticCurveTo(x,y,x-r,y);c.quadraticCurveTo(x,y,x,y-r);c.fillStyle=color;c.fill();}
// ASTRA: archivsiegel – Archiv-Siegel der Seltenheit aus Wachs: Bronze, Silber, Gold, Himmels-Obsidian, je 160 × 160
function archiveSeal(c,x,y,r,rarity){const s=SEALS[rarity];if(!s)return;c.save();c.translate(x,y);
 c.beginPath();for(let i=0;i<=48;i++){const an=i*Math.PI/24,rr=r*(1+.08*Math.sin(an*7)+.04*Math.sin(an*3+1));c.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);}c.closePath();
 c.fillStyle=grad(c,-r,-r,2*r,2*r,s[0],s[1]);c.fill();c.lineWidth=1.4;c.strokeStyle=s[2];c.stroke();
 ellipse(c,0,0,r*.66,r*.66,null,s[1]+'cc',1.2);ellipse(c,0,0,r*.58,r*.58,null,s[2]+'99',1);
 if(rarity==='legendary')for(const [sx,sy,k] of [[-.28,-.22,1],[.26,-.12,.7],[.04,.3,.85],[-.2,.18,.5],[.32,.3,.45]])sparkle(c,sx*r,sy*r,r*.2*k,'#f4f1ff');
 else sparkle(c,0,0,r*.42,s[2]);c.restore();}
// ASTRA: lorbeerkranz – goldener Lorbeerkranz über dem Giebel legendärer Karten, 900 × 500
function laurel(c){c.save();
 for(const sx of [-1,1]){c.beginPath();c.moveTo(100+sx*58,23);c.quadraticCurveTo(100+sx*36,6,100+sx*7,3);c.strokeStyle='#8a5a12';c.lineWidth=2;c.stroke();
  for(let i=0;i<7;i++){const q=i/6,bx=100+sx*(58-51*q),by=23-20*q+Math.sin(q*Math.PI)*-3,an=Math.atan2(-20,sx*-51);
   for(const side of [-1,1]){c.save();c.translate(bx,by);c.rotate(an+side*.75);ellipse(c,6.5,0,7,2.8,grad(c,0,-3,13,6,'#9a6a1a','#ffe39a'),'#5a3a0a',.8);c.restore();}}}
 ellipse(c,100,4,3.4,3.4,'#ffe7a0','#5a3a0a',1);c.restore();}
function column(c,x,y,w,h,p){round(c,x,y+7,w,h-14,2,grad(c,x,0,w,0,p.column[0],p.column[1]),p.ink,1.2);
 for(let k=1;k<4;k++){const xx=x+k*w/4;c.beginPath();c.moveTo(xx,y+10);c.lineTo(xx,y+h-10);c.strokeStyle='#3b281233';c.lineWidth=1.4;c.stroke();c.beginPath();c.moveTo(xx+1.2,y+10);c.lineTo(xx+1.2,y+h-10);c.strokeStyle='#ffffff55';c.lineWidth=.8;c.stroke();}
 for(const yy of [y,y+h-8])round(c,x-2,yy,w+4,8,2,grad(c,0,yy,0,8,p.trim,p.stone[0]),p.ink,1.1);}
// ASTRA: kartenrahmen – Kartenrahmen in Tempeltor-Form für Diener, Zauber und Bauwerke, normal und golden (Giebel, Säulen, Bogenfenster, Namensband, Textfeld, Sockel), 800 × 1128
R.card=(c,card,x,y,w=200,h=282,opts={})=>{const legend=card.rarity==='legendary',owner=D.owner(card),col=owner?.color||'#7c6a4c',p=FRAME[opts.gold?'gold':legend?'legend':'plain'];
 c.save();c.translate(x,y);c.scale(w/200,h/282);
 if(opts.glow){c.shadowColor=opts.selected?'#ffc653':'#71ff56';c.shadowBlur=20;}
 gatePath(c);c.fillStyle=grad(c,0,0,200,282,p.stone[0],p.stone[1]);c.fill();c.shadowBlur=0;c.lineWidth=3;c.strokeStyle=p.ink;c.stroke();
 c.beginPath();c.moveTo(9,33);c.lineTo(100,10);c.lineTo(191,33);c.strokeStyle='#ffffff55';c.lineWidth=1.2;c.stroke();
 // Gable field in the owner's colour with his sign.
 c.beginPath();c.moveTo(26,26);c.lineTo(100,8.5);c.lineTo(174,26);c.closePath();c.fillStyle=grad(c,0,8,0,18,mix(col,-.35),mix(col,.1));c.fill();c.lineWidth=1.4;c.strokeStyle=p.trim;c.stroke();
 ellipse(c,100,19.5,8,8,grad(c,92,12,16,16,'#6b4a22',p.trim),p.ink,1.1);txt(c,owner?.icon||'✦',100,20,9.5,'#fff3d0','center',13);
 // Cornice with dentils, the dark recess behind the window, the columns.
 round(c,5,27,190,10,2,grad(c,0,27,0,10,p.trim,p.stone[0]),p.ink,1.2);c.fillStyle=p.ink+'88';for(let xx=11;xx<190;xx+=8)c.fillRect(xx,32,4,3.5);
 round(c,27,37,146,130,3,grad(c,0,37,0,130,mix(col,-.55),mix(col,-.2)));
 column(c,8,37,18,130,p);column(c,174,37,18,130,p);
 // Arched art window with a keystone.
 const win=()=>{c.beginPath();c.moveTo(31,168);c.lineTo(31,84);c.ellipse(100,84,69,40,0,Math.PI,Math.PI*2);c.lineTo(169,168);c.closePath();};
 c.save();win();c.clip();R.tile(c,card.art,card.cell,23,40,154,154,card);c.restore();
 win();c.lineWidth=4.5;c.strokeStyle=p.trim;c.stroke();win();c.lineWidth=1.4;c.strokeStyle='#1b1719';c.stroke();
 c.beginPath();c.moveTo(93,40);c.lineTo(107,40);c.lineTo(104,51);c.lineTo(96,51);c.closePath();c.fillStyle=grad(c,93,40,14,11,p.stone[0],p.stone[1]);c.fill();c.lineWidth=1.2;c.strokeStyle=p.ink;c.stroke();
 // Name ribbon with swallowtails.
 c.beginPath();c.moveTo(14,150);c.quadraticCurveTo(100,142,186,150);c.lineTo(197,155);c.lineTo(190,163);c.lineTo(197,171);c.lineTo(186,174);c.quadraticCurveTo(100,166,14,174);c.lineTo(3,171);c.lineTo(10,163);c.lineTo(3,155);c.closePath();
 c.fillStyle=grad(c,0,144,0,30,'#9e7950','#eee1ba');c.fill();c.lineWidth=2.4;c.strokeStyle='#4b3524';c.stroke();txt(c,card.name,100,158.5,14,'#211912','center',164);
 // Rules on parchment – long ones get a smaller size and up to seven lines.
 round(c,17,176,166,63,6,grad(c,0,176,0,63,'#d6c294','#f6ecd0'),'#5b4631',1.5);
 c.font='13px Body';let fs=lines(c,card.text||'Diener',144).length>4?11:12.5;c.font=fs+'px Body';let body=lines(c,card.text||'Diener',144),lh=body.length>4?10:12;
 if(body.length>5){fs=10;c.font=fs+'px Body';body=lines(c,card.text,152);lh=9.4;}body=body.slice(0,7);const top=207.5-(body.length-1)*lh/2;body.forEach((t,i)=>txt(c,t,100,top+i*lh,fs,'#30251a'));
 // Stepped plinth, the stats and the archive seal.
 for(const [yy,a] of [[247,'55'],[264,'33']]){c.beginPath();c.moveTo(10,yy);c.lineTo(190,yy);c.strokeStyle=p.ink+a;c.lineWidth=1.2;c.stroke();}
 etherCrystal(c,25,34,22,card.cost);
 if(card.building){towerBadge(c,174,257,card.health);txt(c,'BAUWERK',100,274,8.5,'#4b3524');}
 else if(card.type==='minion'){blades(c,25,257,card.attack);lifeShield(c,175,257,card.health);}
 else txt(c,'ZAUBER',100,274,8.5,'#4b3524');
 archiveSeal(c,100,258,11.5,card.rarity);
 if(legend)laurel(c);
 // Gilded cards keep a fixed streak of light; in the match a glint runs over them as well (glint).
 if(opts.gold){c.save();gatePath(c);c.clip();const sh=c.createLinearGradient(0,0,200,282);sh.addColorStop(.28,'#fff6d000');sh.addColorStop(.4,'#fff6d070');sh.addColorStop(.52,'#fff6d000');c.fillStyle=sh;c.fillRect(0,0,200,282);c.restore();}
 if(opts.locked){gatePath(c);c.fillStyle='#131b23a0';c.fill();round(c,60,110,80,40,6,'#161a20d9','#aa8d56',1);txt(c,'GESPERRT',100,130,11,'#cfb886');}c.restore();};
// Cache card faces once (plain and golden). Only transforms and shadows change while dragging.
// With a pixel density above 1.2 the faces are cached larger, so a dragged card (258 units) stays sharp.
// The aura follows the temple gate: green when playable, golden yellow when a condition is met (AP 3.2), gold when selected.
const gateGlow=(color,blur)=>R.sprite('gateglow:'+[color,blur],-blur*2,-blur*2,200+blur*4,282+blur*4,g=>{g.shadowColor=color;g.shadowBlur=blur;gatePath(g);g.fillStyle=color;g.fill();});
R.cardCache={};R.fastCard=(c,card,x,y,w,h,opts={})=>{const cw=R.scale>1.2?400:300,gold=!!opts.gold,key=card.id+':'+cw+(gold?':gold':'');let im=R.cardCache[key];if(!im){im=document.createElement('canvas');im.width=cw;im.height=Math.round(cw*1.41);R.card(im.getContext('2d'),card,0,0,cw,im.height,{gold});R.cardCache[key]=im;}
 if(opts.glow){const sp=opts.selected?gateGlow('#ffc653',20):opts.glow==='boost'?gateGlow('#ffd23a',18):gateGlow('#71ff56',12);c.save();c.translate(x,y);c.scale(w/200,h/282);R.blit(c,sp);c.restore();}c.drawImage(im,x,y,w,h);
 // A changed cost (Marco Polo, Caterina, Andraste) covers the printed crystal: green when cheaper.
 if(opts.cost!=null&&opts.cost!==card.cost){const k=w/200;c.save();c.translate(x,y);c.scale(k,k);etherCrystal(c,25,34,22,opts.cost,opts.cost<card.cost?'green':'red');c.restore();}};
R.smoothed={};R.smooth=(id,x,y,dt)=>{const old=R.smoothed[id]||{x,y},q=1-Math.exp(-dt/58);const p={x:old.x+(x-old.x)*q,y:old.y+(y-old.y)*q};R.smoothed[id]=p;return p;};
// Rendered cards and artworks become short blob: URLs instead of ~150 KB data: URLs – the views and the binder
// handle hundreds of them (collection, mass opening) without copying megabytes of text on every render.
const blobURL=canvas=>{const data=canvas.toDataURL('image/png'),bin=atob(data.slice(data.indexOf(',')+1)),bytes=new Uint8Array(bin.length);
 for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);return URL.createObjectURL(new Blob([bytes],{type:'image/png'}));};
// Sample card for the Basar shelf of frames (AP 1.5); cached once its picture has loaded.
R.frameSamples={};R.frameSample=id=>{const card=D.byId.leonidas_3;if(R.frameSamples[id])return R.frameSamples[id];
 const c=document.createElement('canvas');c.width=240;c.height=338;R.card(c.getContext('2d'),card,0,0,240,338,{gold:id==='gold'});const url=blobURL(c);if(R.images[card.art])R.frameSamples[id]=url;return url;};
// Golden cards (AP 1.5) show in the collection, the packs and the dialogs too.
R.thumb=id=>{const gold=R.look.frame==='gold',key=id+(gold?':gold':'');if(!R.thumbs[key]){const c=document.createElement('canvas');c.width=240;c.height=338;R.card(c.getContext('2d'),D.byId[id],0,0,240,338,{gold});R.thumbs[key]=blobURL(c);}return R.thumbs[key];};
// The detail view gets the entire atlas cell, without the portrait crop.
R.artworks={};R.artwork=id=>{if(!R.artworks[id]){const card=D.byId[id],im=R.images[card.art];
 if(card.art==='@pyramid'||!card.art){const c=document.createElement('canvas');c.width=362;c.height=362;R.tile(c.getContext('2d'),card.art,0,0,0,362,362,card);R.artworks[id]=blobURL(c);return R.artworks[id];}
 if(!im)return R.thumb(id);
 const c=document.createElement('canvas');c.width=im.width/4;c.height=im.height/3;
 R.tile(c.getContext('2d'),card.art,card.cell,0,0,c.width,c.height);R.artworks[id]=blobURL(c);}return R.artworks[id];};
// atlas === true picks the player's equipped skin for that hero.
R.medals={};R.heroStyle=(id,atlas)=>{const hero=D.heroById[id],i=hero.cell;
 if(!hero.art){if(!R.medals[id]){const c=document.createElement('canvas');c.width=300;c.height=450;R.tile(c.getContext('2d'),null,0,0,0,300,450,hero);R.medals[id]=c.toDataURL('image/png');}return `background-image:url('${R.medals[id]}');background-size:cover;background-position:center`;}if(atlas===true)atlas=R.look.skins[id];atlas=atlas||hero.art;return `background-image:url('assets/art/${atlas}.webp');background-size:400% 300%;background-position:${(i%4)/3*100}% ${Math.floor(i/4)/2*100}%`;};
function hit(id,x,y,w,h,data={}){R.hits.push({id,x,y,w,h,...data});}
// Touch targets of at least 48 dp (AP 1.8): 84 stage units are 48 CSS pixels on a 915 px wide phone; the picture keeps its size.
const TOUCH=84;function touch(id,x,y,w,h,data){const tw=Math.max(w,TOUCH),th=Math.max(h,TOUCH);hit(id,x-(tw-w)/2,y-(th-h)/2,tw,th,data);}
R.hit=(x,y)=>[...R.hits].reverse().find(h=>{if(h.angle!=null){const dx=x-h.cx,dy=y-h.cy,co=Math.cos(-h.angle),si=Math.sin(-h.angle),xx=dx*co-dy*si,yy=dx*si+dy*co;return Math.abs(xx)<=h.w/2&&Math.abs(yy)<=h.h/2;}return x>=h.x&&x<=h.x+h.w&&y>=h.y&&y<=h.y+h.h;});
// ASTRA: knopf-match – Knopf auf dem Spielbrett (Zug beenden, Chronik, Pause, Hilfe), aktiv und ruhend, 344 × 128
function button(c,text,x,y,w,h,active,id){R.blit(c,R.sprite('button:'+[text,w,h,active],-30,-30,w+60,h+60,g=>{if(active){g.shadowColor='#ffc44b';g.shadowBlur=12;}round(g,0,0,w,h,12,grad(g,0,0,0,h,active?'#b48534':'#3c4647',active?'#f4d47c':'#667270'),active?'#63451e':'#303839',5);g.shadowBlur=0;round(g,6,6,w-12,h-12,8,null,'#ffffff45',1);txt(g,text,w/2,h/2,19,active?'#2a2016':'#c8cfcb','center',w-14);}),x,y);touch(id,x,y,w,h);}
// ASTRA: faehigkeitssymbole – Symbol der Heldenfähigkeit, eines je Held (22), 96 × 96
function powerIcon(c,id,x,y){c.save();c.translate(x,y);c.strokeStyle='#f2d99b';c.fillStyle='#f2d99b';c.lineWidth=3;c.lineCap='round';c.lineJoin='round';c.beginPath();
if(id==='leonidas'){c.moveTo(-16,-18);c.lineTo(16,-18);c.lineTo(16,2);c.quadraticCurveTo(13,18,0,24);c.quadraticCurveTo(-13,18,-16,2);c.closePath();c.stroke();c.beginPath();c.moveTo(-7,8);c.lineTo(0,-8);c.lineTo(7,8);}
else if(id==='imhotep'){c.ellipse(0,-12,8,11,0,0,Math.PI*2);c.moveTo(0,0);c.lineTo(0,24);c.moveTo(-14,6);c.lineTo(14,6);}
else if(!D.heroById[id]?.art){c.font='bold 34px serif';c.textAlign='center';c.textBaseline='middle';c.fillText(D.heroById[id].icon,0,2);}
else if(id==='dandolo'){c.moveTo(-15,21);c.lineTo(16,-21);c.lineTo(13,-4);c.moveTo(-16,7);c.lineTo(-2,16);}
else{for(let i=0;i<8;i++){const a=i*Math.PI/4,r=i%2?8:25;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();c.fill();}c.stroke();c.restore();}
// AP 1.8: the hero is a struck bronze coin; its power is a ruler's seal beside it (separate sprite, so it can turn over).
// The coin assembly is one sprite per state (health, armor, attack, weapon, readiness).
function portrait(c,s,p,x,y,now){
 const scale=L.heroScale(p),a=s.players[p],hero=D.heroById[a.hero],skin=hero.art&&(p===0&&R.look.skins[hero.id]||hero.art);
 const ready=s.active===p&&!a.attacked&&E.heroAttack(a)>0&&s.phase==='play',can=E.canPower(s,p),r=L.coin+4;
 const key=['coin',p,hero.id,skin,!!R.images[skin],ready,a.health,a.armor,E.heroAttack(a),a.weapon?a.weapon.attack+'/'+a.weapon.durability:''].join();
 c.save();c.translate(x,y);c.scale(scale,scale);R.blit(c,R.sprite(key,-175,-118,350,240,g=>coinArt(g,a,hero,skin,ready),scale));c.restore();
 seal(c,p,hero,can,!!a.powerUsed,x+L.powerOffset.x*scale,y+L.powerOffset.y*scale,scale,now);
 hit('h'+p,x-r*scale,y-r*scale,2*r*scale,2*r*scale,{kind:'target'});R.positions['h'+p]={x,y};
 hit('power'+p,x+(L.powerOffset.x-44)*scale,y+(L.powerOffset.y-58)*scale,88*scale,104*scale,{kind:'power'});
 R.positions['power'+p]=L.powerPosition(p,x,y);
}
// Turning seal: after use it flips over to its grey back and snaps in; at the start of the next own turn it flips back.
// Reduced motion is read once per picture (R.draw), not for every seal, dial and card.
const FLIP=440,SNAP=150;let still=false;const motion=()=>!still;
R.seals=[null,null];
function seal(c,p,hero,can,used,x,y,scale,now){let f=R.seals[p];
 if(!f||f.hero!==hero.id)f=R.seals[p]={hero:hero.id,used,at:-1e9};else if(f.used!==used){f.used=used;f.at=motion()?now:-1e9;}
 const t=now-f.at,q=Math.min(1,t/FLIP),back=q<.5?!used:used,sx=Math.abs(Math.cos(q*Math.PI)),
  lift=1+.14*Math.sin(q*Math.PI)+(t>FLIP&&t<FLIP+SNAP?.06*Math.sin((t-FLIP)/SNAP*Math.PI):0);
 const sp=R.sprite(['seal',hero.id,back?'back':can?'can':'idle',hero.cost].join(),-62,-62,124,124,g=>sealArt(g,hero,can,back),scale);
 c.save();c.translate(x,y);c.scale(scale*lift*Math.max(.04,sx),scale*lift);R.blit(c,sp);c.restore();}
// ASTRA: herrschersiegel – geprägtes Herrschersiegel der Heldenfähigkeit, Vorderseite (bereit, ruhend) und graue Rückseite, 248 × 248
function sealArt(c,hero,can,back){const r=40,edge=()=>{c.beginPath();for(let i=0;i<=96;i++){const an=i*Math.PI/48,rr=r+2.4*Math.cos(an*14);c.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);}c.closePath();};
 c.save();c.shadowColor=can&&!back?'#69ff64':'#160e09aa';c.shadowBlur=can&&!back?16:9;c.shadowOffsetY=can&&!back?0:3;edge();
 c.fillStyle=back?grad(c,-r,-r,2*r,2*r,'#45474b','#a3a5a6'):grad(c,-r,-r,2*r,2*r,'#4a3216',mix(hero.color,.15));c.fill();c.restore();
 edge();c.lineWidth=back?4:5;c.strokeStyle=back?'#56595d':'#b79557';c.stroke();
 ellipse(c,0,0,r-8,r-8,null,back?'#d2d4d455':'#f0d69a88',1.5);
 if(back){c.save();c.globalAlpha=.55;txt(c,hero.icon,0,2,30,'#2d2f33');c.restore();ellipse(c,0,0,r-14,r-14,null,'#2d2f3366',1);return;}
 powerIcon(c,hero.id,0,0);gem(c,-9,-39,16,'#347ac2',hero.cost);}
// ASTRA: heldenmuenze – geprägte Bronzemünze des Helden mit Rändelung, Umschrift (Name) und Porträt, Spieler und Gegner, 400 × 400
function coinArt(c,a,hero,skin,ready){
 c.save();if(ready){c.shadowColor='#70ff63';c.shadowBlur=22;}else{c.shadowColor='#160e09bb';c.shadowBlur=16;c.shadowOffsetY=7;}
 medal(c,hero,skin);c.restore();
 heart(c,50,52,23,a.health);
 if(a.armor)aspis(c,47,8,a.armor);
 if(E.heroAttack(a)){ellipse(c,-50,52,23,23,'#e2bc55','#554521',3);number(c,E.heroAttack(a),-50,52,29);}
 if(a.weapon)weaponRack(c,-124,18,a.weapon);}
// The struck medal alone (AP 3.8: the coin of the Feldzug-Initiative and the relief that breaks use it too); the shadow
// is the caller's.
function medal(c,hero,skin){const r=L.coin,idx=hero.cell;
 ellipse(c,0,0,r,r,grad(c,-r,-r,2*r,2*r,'#5e3f1c','#f0cd85'),'#2e2012',3);c.save();c.shadowColor='transparent';
 // Reeded edge, a raised rim with the name as legend, then the struck portrait.
 c.beginPath();for(let i=0;i<120;i++){const an=i*Math.PI/60;c.moveTo(Math.cos(an)*(r-6),Math.sin(an)*(r-6));c.lineTo(Math.cos(an)*(r-1.5),Math.sin(an)*(r-1.5));}c.strokeStyle='#3a291488';c.lineWidth=1.4;c.stroke();
 ellipse(c,0,0,r-7,r-7,grad(c,-r,-r,2*r,2*r,'#7d5a2a','#e8c47e'),'#4a3418',2);
 // The portrait is a little smaller than before 1.18.0, so the legend has its own band between portrait and rim and is
 // drawn last – the portrait disc used to cover the inner half of the letters (feedback on 1.17.0).
 ellipse(c,0,0,53,53,'#2a1f14','#f3d9a0',2.5);
 c.save();c.beginPath();c.arc(0,0,51,0,Math.PI*2);c.clip();R.tile(c,skin,idx,-61,-68,122,130,hero);
 const relief=c.createLinearGradient(-47,-52,47,52);relief.addColorStop(0,'#fff1b822');relief.addColorStop(.45,'#00000000');relief.addColorStop(1,'#160b0a66');c.fillStyle=relief;c.fillRect(-52,-52,104,104);c.restore();
 ellipse(c,0,0,51,51,null,'#3a2810',2);
 legend(c,hero.name.toUpperCase(),r-13.5);c.restore();}
R.medal=medal;
// The legend runs clockwise along the upper rim, letter by letter, struck into the bronze (light edge below, dark cut).
// Each letter takes its measured width, so wide and narrow letters keep even gaps; a long name gets a smaller size
// instead of running into the badges.
function legend(c,text,r){const chars=[...text],arc=Math.PI*1.2*r;let size=10.5;c.save();c.textAlign='center';c.textBaseline='middle';
 const widths=()=>{c.font=`bold ${size.toFixed(2)}px Title,serif`;return chars.map(ch=>c.measureText(ch).width+size*.2);};
 let w=widths(),total=w.reduce((a,b)=>a+b,0);if(total>arc){size*=arc/total;w=widths();total=w.reduce((a,b)=>a+b,0);}
 let at=-total/2;chars.forEach((ch,i)=>{const an=-Math.PI/2+(at+w[i]/2)/r;at+=w[i];c.save();c.rotate(an+Math.PI/2);c.fillStyle='#fff0c466';c.fillText(ch,0,-r+.9);c.fillStyle='#3b2710';c.fillText(ch,0,-r);c.restore();});
 c.restore();}
// ASTRA: phalanxschild – Rüstung als runder Hoplitenschild (Aspis) über dem Leben, 112 × 112
function aspis(c,x,y,n){c.save();c.shadowColor='#10141899';c.shadowBlur=6;c.shadowOffsetY=2;ellipse(c,x,y,23,23,grad(c,x-23,y-23,46,46,'#56636a','#e3ecee'),'#262e33',3);c.restore();
 ellipse(c,x,y,17.5,17.5,null,'#f6fbff99',1.5);for(let i=0;i<8;i++){const an=i*Math.PI/4;ellipse(c,x+Math.cos(an)*20.5,y+Math.sin(an)*20.5,1.3,1.3,'#f6fbff');}number(c,n,x,y+1,23);}
// ASTRA: waffenablage – Waffe links neben dem Helden: Klinge auf Bronzeplatte, Wucht (Angriff) und Schmiedequalität (Haltbarkeit), 160 × 210
function weaponRack(c,x,y,w){c.save();c.shadowColor='#160e09aa';c.shadowBlur=10;c.shadowOffsetY=4;round(c,x-31,y-46,62,84,12,grad(c,x-31,y-46,62,84,'#35281b','#8d6c3d'),'#2a1e12',3);c.restore();
 round(c,x-26,y-41,52,74,9,null,'#e9c98a66',1.2);
 c.save();c.translate(x,y-6);c.rotate(-.72);c.beginPath();c.moveTo(-3.6,-30);c.lineTo(0,-38);c.lineTo(3.6,-30);c.lineTo(3.6,12);c.lineTo(-3.6,12);c.closePath();c.fillStyle=grad(c,-4,0,8,0,'#7d898f','#f4f8f9');c.fill();c.strokeStyle='#2c3438';c.lineWidth=1.2;c.stroke();
 round(c,-12,12,24,5,2,'#c9a052','#4a3418',1);round(c,-2.5,17,5,12,2,'#5a3d1e');ellipse(c,0,31,4,4,'#c9a052','#4a3418',1);c.restore();
 ellipse(c,x-20,y+38,15,15,'#e2bc55','#554521',2.5);number(c,w.attack,x-20,y+39,21);
 c.beginPath();c.moveTo(x+8,y+25);c.lineTo(x+34,y+25);c.lineTo(x+34,y+40);c.quadraticCurveTo(x+33,y+51,x+21,y+56);c.quadraticCurveTo(x+9,y+51,x+8,y+40);c.closePath();c.fillStyle=grad(c,x+8,y+25,26,31,'#5d686e','#dfe6e8');c.fill();c.strokeStyle='#262e33';c.lineWidth=2.5;c.stroke();number(c,w.durability,x+21,y+39,19);}
function tauntCrest(c){
 c.save();c.shadowColor='#20160dcc';c.shadowBlur=4;c.shadowOffsetY=2;
 c.beginPath();c.moveTo(-18,-83);c.lineTo(18,-83);c.lineTo(17,-64);c.quadraticCurveTo(14,-52,0,-46);c.quadraticCurveTo(-14,-52,-17,-64);c.closePath();
 c.fillStyle=grad(c,-18,-83,36,37,'#594536','#c29b60');c.fill();c.strokeStyle='#f4d494';c.lineWidth=3;c.stroke();c.shadowBlur=0;
 c.beginPath();c.moveTo(0,-76);c.lineTo(0,-55);c.moveTo(-10,-70);c.lineTo(10,-70);c.strokeStyle='#fce5b4';c.lineWidth=3;c.stroke();c.restore();
}
// Commander's table (AP 1.8): the equipped table (picture, or the standard table under a colour filter while it is a
// placeholder) and the engraved chart – one static picture per match. Since 1.17.0 (feedback on 1.16.0) without the
// coloured epoch halves (wash, inlaid band, sign and name) and without the bronze seam with its medallion.
function table(g,field,tint){const im=R.images[field];
 if(im){if(tint)g.filter=tint;g.drawImage(im,0,0,1600,800);g.filter='none';}else{g.fillStyle='#765d3e';g.fillRect(0,0,1600,800);}
 const shade=g.createRadialGradient(800,365,210,800,365,880);shade.addColorStop(0,'#3d230a00');shade.addColorStop(1,'#23150e45');g.fillStyle=shade;g.fillRect(0,0,1600,800);
 chart(g);}
// ASTRA: feldherrentisch – eingeritzte Weltkarte auf dem Feldherrentisch (Kompassrose, Loxodromen, Gradnetz), 3200 × 1600
function chart(g){g.save();g.beginPath();g.rect(40,34,1520,732);g.clip();
 // Every line is cut into the stone: a dark groove with a light lower edge.
 const cut=(path,w,a)=>{g.lineWidth=w;g.save();g.translate(0,1.3);path();g.strokeStyle=`rgba(255,240,205,${a*.7})`;g.stroke();g.restore();path();g.strokeStyle=`rgba(52,30,12,${a})`;g.stroke();};
 cut(()=>{g.beginPath();for(let i=0;i<32;i++){const an=i*Math.PI/16;g.moveTo(800+Math.cos(an)*60,L.seam+Math.sin(an)*60);g.lineTo(800+Math.cos(an)*1800,L.seam+Math.sin(an)*1800);}},1,.1);
 cut(()=>{g.beginPath();for(let i=-3;i<=3;i++){if(!i)continue;const x=800+i*228;g.moveTo(x-i*16,34);g.quadraticCurveTo(x+i*22,L.seam,x-i*16,766);}
  for(const y of [128,236,478,586,694]){g.moveTo(40,y);g.quadraticCurveTo(800,y+(y<L.seam?-24:24),1560,y);}},1.4,.16);
 cut(()=>{g.beginPath();g.arc(800,L.seam,150,0,Math.PI*2);g.moveTo(1040,L.seam);g.arc(800,L.seam,240,0,Math.PI*2);},1.6,.16);
 g.restore();}
// Mana as an ether dial (1.17.0, feedback on 1.16.0: the amulet row is gone). A bronze ring like coin and chronometer,
// ten crystals in it – full ones glow blue, spent ones are dark, locked ones (Belastung) red, missing ones an empty
// socket – and the number in the middle. AP 3.7: when mana rises, the crystals light up one after another with a glint
// and a chime (R.dials, MANA_STEP apart); without animation under reduced motion.
// ASTRA: aetheruhr – Mana-Anzeige als bronzene Äther-Uhr mit zehn Kristallen (voll, verbraucht, gesperrt, fehlt) und Zahl in der Mitte, 256 × 256
function crystal(g,x,y,an,r,state){g.save();g.translate(x,y);g.rotate(an+Math.PI/2);
 if(state==='none'){ellipse(g,0,0,r*.55,r*.9,'#2a1c0e33','#4a341855',1);g.restore();return;}
 ellipse(g,0,0,r*.95,r*1.6,'#2a1c0e44');
 g.beginPath();g.moveTo(0,-r*1.45);g.lineTo(r*.8,0);g.lineTo(0,r*1.45);g.lineTo(-r*.8,0);g.closePath();
 if(state==='full'){g.shadowColor='#5cc8ff';g.shadowBlur=r*1.3;const f=g.createLinearGradient(-r,-r*1.4,r,r*1.4);f.addColorStop(0,'#eefaff');f.addColorStop(.35,'#49aef8');f.addColorStop(1,'#123a78');g.fillStyle=f;}
 else g.fillStyle=state==='locked'?'#7b2a1f':'#262c34';
 g.fill();g.shadowBlur=0;g.lineWidth=1.3;g.strokeStyle=state==='full'?'#d9f2ff':state==='locked'?'#f2a58f':'#5b6470';g.stroke();
 if(state==='full'){g.beginPath();g.moveTo(0,-r*1.45);g.lineTo(0,r*1.45);g.moveTo(-r*.8,0);g.lineTo(r*.8,0);g.strokeStyle='#ffffff55';g.lineWidth=1;g.stroke();}
 if(state==='locked'){g.beginPath();g.moveTo(-r*.35,-r*.7);g.lineTo(r*.2,-r*.05);g.lineTo(-r*.15,r*.35);g.lineTo(r*.3,r*.8);g.strokeStyle='#f2a58f';g.lineWidth=1.4;g.stroke();}
 g.restore();}
function dialArt(g,p,lit,max,locked,shownMana){const {r}=L.mana[p],small=p===1;
 g.save();g.shadowColor='#160e09bb';g.shadowBlur=14;g.shadowOffsetY=5;ellipse(g,0,0,r,r,grad(g,-r,-r,2*r,2*r,'#5a3d1e','#f2d18c'),'#3b2812',3);g.restore();
 g.beginPath();for(let i=0;i<96;i++){const an=i*Math.PI/48;g.moveTo(Math.cos(an)*(r-5),Math.sin(an)*(r-5));g.lineTo(Math.cos(an)*(r-1.5),Math.sin(an)*(r-1.5));}g.strokeStyle='#3a291488';g.lineWidth=1.2;g.stroke();
 ellipse(g,0,0,r-6,r-6,grad(g,-r,-r,2*r,2*r,'#6e4f25','#e6c27c'),'#4a3418',1.5);
 const d=g.createRadialGradient(-r*.15,-r*.2,2,0,0,r*.5);d.addColorStop(0,'#2d5a96');d.addColorStop(1,'#0c1530');ellipse(g,0,0,r*.5,r*.5,d,'#f0d69a',2);
 for(let i=0;i<10;i++){const c=L.crystal(p,i),m=L.mana[p];crystal(g,c.x-m.x,c.y-m.y,c.an,c.r,i<lit?'full':i>=max-locked&&i<max?'locked':i<max?'spent':'none');}
 number(g,shownMana,0,-r*.07,r*(small?.5:.46));txt(g,'/ '+max,0,r*.27,Math.round(r*.2),'#cfe2ff');}
const MANA_STEP=85,GLINT=300;R.dials=[null,null];
function dial(c,p,a,now){const {x,y,r}=L.mana[p],locked=a.locked||0;let f=R.dials[p];
 if(!f||a.mana<f.to||!motion())f=R.dials[p]={from:a.mana,to:a.mana,at:-1e9,chimed:a.mana};
 else if(a.mana>f.to){f.from=Math.min(f.to,f.from+Math.floor((now-f.at)/MANA_STEP));f.to=a.mana;f.at=now;f.chimed=f.from;}
 const lit=Math.min(f.to,f.from+Math.max(0,Math.floor((now-f.at)/MANA_STEP)+1));
 if(lit>f.chimed){f.chimed=lit;CHA.play('aether',{x,gain:p?.45:.8});}
 R.blit(c,R.sprite('dial:'+[p,lit,a.maxMana,locked,lit<f.to?lit:a.mana],-r-24,-r-24,2*r+48,2*r+48,g=>dialArt(g,p,lit,a.maxMana,locked,lit<f.to?lit:a.mana)),x,y);
 // The glint of each crystal that has just lit: a soft white star, no shadowBlur in the frame.
 for(let i=f.from;i<lit;i++){const t=now-(f.at+(i-f.from)*MANA_STEP);if(t<0||t>GLINT)continue;const q=t/GLINT,cr=L.crystal(p,i),rr=cr.r*(1.2+2.4*q);
  const gl=c.createRadialGradient(cr.x,cr.y,0,cr.x,cr.y,rr);gl.addColorStop(0,`rgba(255,255,255,${.9*(1-q)})`);gl.addColorStop(.4,`rgba(150,215,255,${.6*(1-q)})`);gl.addColorStop(1,'rgba(150,215,255,0)');
  c.fillStyle=gl;c.beginPath();c.arc(cr.x,cr.y,rr,0,Math.PI*2);c.fill();}
 const note=[locked&&'Belastung −'+locked,!p&&a.overload&&'Folgezug −'+a.overload].filter(Boolean).join(' · ');
 if(note&&!p)txt(c,note,x,y+r+14,11.5,'#f2a58f','center',136);}
// AP 3.7: „Dein Zug“ – a tablet drops on two chains from the top, snaps in with a stone click, hangs and lifts away.
// Not part of the action's busy time, so it never holds up a tap; skipped under reduced motion.
const PLATE={drop:300,snap:170,hold:{0:1250,1:850},lift:260};R.plate=null;
// ASTRA: zugtafel – herabfallende Steintafel „Dein Zug“ / „Zug des Gegners“ an zwei Ketten, mit Bronzerahmen, 960 × 200
// Feedback 1.18.0: „ZUG DES GEGNERS“ was wider than its plate – the plate now takes the measured width of its text.
const PLATE_TEXT={true:['DEIN ZUG',40],false:['ZUG DES GEGNERS',30]};R.plateWidth={};
function plateSize(mine){let w=R.plateWidth[mine];
 if(w==null){const [text,px]=PLATE_TEXT[mine],g=document.createElement('canvas').getContext('2d');g.font=`${px}px Title,serif`;
  const tw=g.measureText(text).width+3*text.length;w=Math.max(mine?460:380,Math.ceil(tw)+96);if(document.fonts?.check?.(`${px}px Title`))R.plateWidth[mine]=w;}
 return {w,h:mine?92:74};}
function plateArt(g,mine){const {w,h}=plateSize(mine);
 g.save();g.shadowColor='#160e09cc';g.shadowBlur=18;g.shadowOffsetY=8;round(g,-w/2,-h/2,w,h,14,grad(g,-w/2,-h/2,w,h,'#5a3d1e','#efcd85'),'#2e2012',3);g.restore();
 round(g,-w/2+8,-h/2+8,w-16,h-16,9,grad(g,0,-h/2,0,h,mine?'#d9cfb8':'#b9b3a7','#f6eedb'),'#4a3418',2);
 round(g,-w/2+14,-h/2+14,w-28,h-28,6,null,'#4a341855',1);
 for(const sx of [-1,1])ellipse(g,sx*(w/2-26),-h/2+4,7,7,grad(g,-7,-7,14,14,'#5a3d1e','#f2d18c'),'#2e2012',1.5);
 g.font=`${mine?40:30}px Title,serif`;g.textAlign='center';g.textBaseline='middle';if('letterSpacing' in g)g.letterSpacing='3px';
 g.fillStyle='#fff8e6';g.fillText(mine?'DEIN ZUG':'ZUG DES GEGNERS',0,3.5);g.fillStyle=mine?'#5a3510':'#3a3631';g.fillText(mine?'DEIN ZUG':'ZUG DES GEGNERS',0,2);if('letterSpacing' in g)g.letterSpacing='0px';}
function turnPlate(c,s,now){const key=s.phase==='play'?s.turn+':'+s.active:'-';let f=R.plate;
 if(!f){R.plate={key,at:-1e9};return;}
 if(f.key!==key){f.key=key;f.mine=s.active===0;f.at=s.phase==='play'&&motion()?now:-1e9;f.clicked=false;}
 const t=now-f.at,hold=PLATE.hold[f.mine?0:1],end=PLATE.drop+PLATE.snap+hold+PLATE.lift;if(t<0||t>end)return;
 const rest=352,top=-90;let y;
 if(t<PLATE.drop){const q=t/PLATE.drop;y=top+(rest-top)*q*q;}
 else if(t<PLATE.drop+PLATE.snap){if(!f.clicked){f.clicked=true;CHA.play('stone',{gain:.7});}const q=(t-PLATE.drop)/PLATE.snap;y=rest-16*Math.sin(q*Math.PI)*(1-q*.4);}
 else if(t<PLATE.drop+PLATE.snap+hold)y=rest;
 else{const q=(t-PLATE.drop-PLATE.snap-hold)/PLATE.lift;y=rest+(top-rest)*q*q;}
 const {w,h}=plateSize(f.mine);c.save();c.strokeStyle='#3a2a16';c.lineWidth=4;c.setLineDash([9,5]);
 for(const sx of [-1,1]){c.beginPath();c.moveTo(800+sx*(w/2-26),0);c.lineTo(800+sx*(w/2-26),y-h/2+4);c.stroke();}c.restore();
 R.blit(c,R.sprite('plate:'+f.mine+':'+w,-w/2-40,-h/2-40,w+80,h+80,g=>plateArt(g,f.mine)),800,y);}
// AP 1.8 Teil 2: the deck as a pile of parchment scrolls that visibly shrinks (one scroll per five cards, at most six);
// an empty deck becomes the hourglass of Erschöpfung („Zahn der Zeit“) with the damage of the next draw.
// ASTRA: pergamentstapel – Deck als Stapel gerollter Pergamente (1–6 Rollen), 160 × 200
function scrolls(g,n){for(let i=0;i<n;i++){const y=74-i*13,dx=(i%2?3:-3),w=60,h=14,x=-w/2+dx;
 g.save();g.shadowColor='#160e09aa';g.shadowBlur=5;g.shadowOffsetY=2;round(g,x,y-h/2,w,h,6,grad(g,0,y-h/2,0,h,'#b89a64','#f3e3bb'),'#5b4326',1.4);g.restore();
 ellipse(g,x+w,y,4.5,h/2,'#d8c08c','#5b4326',1.2);ellipse(g,x+w,y,1.8,3,null,'#7a5e3388',1);
 round(g,x+w*.42,y-h/2-.5,6,h+1,1.5,'#9b2f22','#4e170f',1);}}
// ASTRA: stundenglas – Stundenglas der Erschöpfung „Zahn der Zeit“ mit rinnendem Sand, 140 × 200
function hourglassArt(g){g.save();g.shadowColor='#160e09aa';g.shadowBlur=8;g.shadowOffsetY=3;
 for(const y of [-2,84])round(g,-28,y,56,9,4,grad(g,-28,y,56,9,'#5a3d1e','#efcd85'),'#2e2012',1.5);g.restore();
 for(const sx of [-1,1])round(g,sx*24-2.5,5,5,80,2,grad(g,0,0,5,0,'#5a3d1e','#d9b46e'),'#2e2012',1);
 const bulb=()=>{g.beginPath();g.moveTo(-17,8);g.bezierCurveTo(-17,30,-3,36,-3,41);g.bezierCurveTo(-3,46,-17,52,-17,82);g.lineTo(17,82);g.bezierCurveTo(17,52,3,46,3,41);g.bezierCurveTo(3,36,17,30,17,8);g.closePath();};
 bulb();g.fillStyle='#e8f2f455';g.fill();
 g.save();bulb();g.clip();g.fillStyle='#d6a85a';g.fillRect(-20,28,40,8);g.beginPath();g.moveTo(-17,82);g.quadraticCurveTo(0,52,17,82);g.closePath();g.fill();g.restore();
 bulb();g.strokeStyle='#f6fbffcc';g.lineWidth=1.6;g.stroke();g.beginPath();g.moveTo(-11,14);g.quadraticCurveTo(-12,26,-6,33);g.strokeStyle='#ffffff88';g.lineWidth=1.4;g.stroke();}
function deck(c,s,p,now){const pp=s.players[p],yy=p===0?590:158,x=1448;
 if(pp.deck.length){const n=Math.min(6,Math.ceil(pp.deck.length/5));R.blit(c,R.sprite('scrolls:'+n,-50,-10,100,110,g=>scrolls(g,n)),x,yy);txt(c,pp.deck.length,1451,yy+103,19,'#f2dfaf');}
 else{// While the hourglass drinks life (AP 3.4) it swells and glows red.
  const dr=CHM.drains.find(f=>f.p===p),beat=dr?Math.sin(Math.min(1,(now-dr.at)/dr.duration*1.6)*Math.PI):0;
  if(beat>0){c.save();c.globalAlpha=.7*beat;c.translate(x,yy+42);c.scale(1.8+beat,2.2+beat);R.blit(c,pumpSprite());c.restore();}
  c.save();c.translate(x,yy+42);c.scale(1+.12*beat,1+.12*beat);c.translate(-x,-yy-42);R.blit(c,R.sprite('hourglass',-40,-12,80,112,hourglassArt),x,yy);c.restore();
  // Falling sand: a dashed stream that runs downwards.
  c.save();c.setLineDash([3,4]);c.lineDashOffset=-(now/40%7);c.beginPath();c.moveTo(x,yy+41);c.lineTo(x,yy+70);c.strokeStyle='#d6a85a';c.lineWidth=2;c.stroke();c.restore();
  txt(c,'−'+(pp.fatigue+1),1451,yy+103,19,'#ff9a8a');}
 touch('deck'+p,1411,yy-10,80,125,{kind:'deck'});
 round(c,1510,yy+35,64,53,8,'#2c2925bb','#907750',2);txt(c,'☠ '+pp.grave.length,1542,yy+61,21,'#d9c99f');touch('grave'+p,1500,yy+25,89,77,{kind:'grave'});}
// AP 1.8 Teil 2: the rival's hand as sealed orders – rolled scrolls with a red wax seal.
// ASTRA: versiegelte-befehle – verdeckte Karte der KI-Hand als gerollter Befehl mit rotem Wachssiegel, 80 × 160
function orderArt(g){g.save();g.shadowColor='#160e09aa';g.shadowBlur=6;g.shadowOffsetY=3;round(g,-14,-52,28,72,6,grad(g,-14,0,28,0,'#a88a58','#f3e3bb'),'#5b4326',1.5);g.restore();
 for(const y of [-52,20])ellipse(g,0,y,14,4.5,'#d8c08c','#5b4326',1.2);
 g.strokeStyle='#7a5e3366';g.lineWidth=1;for(const y of [-38,-28,-18])g.beginPath(),g.moveTo(-9,y),g.lineTo(9,y),g.stroke();
 round(g,-15,-4,30,4,1.5,'#9b2f22');
 g.save();g.shadowColor='#2a0a06aa';g.shadowBlur=3;g.shadowOffsetY=1;g.beginPath();for(let i=0;i<=24;i++){const an=i*Math.PI/12,rr=10+1.2*Math.cos(an*5);g.lineTo(Math.cos(an)*rr,-2+Math.sin(an)*rr);}g.closePath();g.fillStyle=grad(g,-10,-12,20,20,'#7a1c14','#d9473a');g.fill();g.restore();
 ellipse(g,0,-2,6.5,6.5,null,'#f6b29a88',1.2);txt(g,'✦',0,-1.5,10,'#ffd6c4');}
// AP 1.8 Teil 2: the chronicle strip at the left edge. Parchment with bronze rods; the newest entries on top, each a
// picture with the side's colour (gold yours, red the rival's) and a mark (✦ spell, ☠ loss, ✕ burnt, ⌛ Erschöpfung);
// a new turn starts a new parchment section. Tap an entry for the card, the strip for the whole chronicle.
// ASTRA: chronikleiste – senkrechte Pergamentleiste mit Bronzestäben oben und unten, 140 × 1100
function stripArt(g){const {x,y,w,h}=L.strip;
 g.save();g.shadowColor='#160e09aa';g.shadowBlur=10;g.shadowOffsetY=4;round(g,x+4,y+14,w-8,h-28,4,grad(g,x,0,w,0,'#c9ad78','#f3e3bb'),'#6a5030',1.5);g.restore();
 g.strokeStyle='#7a5e3322';g.lineWidth=1;for(let yy=y+40;yy<y+h-30;yy+=9){g.beginPath();g.moveTo(x+10,yy);g.lineTo(x+w-10,yy+(yy%3));g.stroke();}
 for(const yy of [y,y+h-24]){round(g,x-4,yy,w+8,24,10,grad(g,0,yy,0,24,'#5a3d1e','#efcd85'),'#2e2012',2);for(const sx of [x-2,x+w+2])ellipse(g,sx,yy+12,6,12,grad(g,sx-6,yy,12,24,'#4a3216','#d9b46e'),'#2e2012',1.5);}
 txt(g,'CHRONIK',x+w/2,y+12.5,11,'#2e2012','center',w-6);}
// ASTRA: chronik-eintrag – Eintrag der Chronik-Leiste: Bild der Karte oder Fähigkeit mit Seitenfarbe und Marke, 116 × 116
function entryArt(g,e){const k=54/2,col=e.p===0?'#e2bf6a':e.p===1?'#c8473b':'#9a8a6a';
 round(g,-k-3,-k-3,2*k+6,2*k+6,7,col,'#2e2012',1.5);
 g.save();g.beginPath();g.roundRect(-k,-k,2*k,2*k,5);g.clip();if(e.type==='death'||e.type==='burn')g.filter='grayscale(1) brightness(.8)';
 if(e.type==='fatigue'){g.fillStyle='#3a2a1a';g.fillRect(-k,-k,2*k,2*k);g.save();g.translate(0,-k*.78);g.scale(.62,.62);hourglassArt(g);g.restore();}
 else if(e.kind==='card'){const card=D.byId[e.id];R.tile(g,card.art,card.cell,-k*1.2,-k*1.05,k*2.4,k*2.4,card);}
 else if(e.kind==='power'||e.kind==='hero'){const hero=D.heroById[e.id];if(e.kind==='hero'&&hero)R.tile(g,hero.art,hero.cell,-k*1.2,-k*1.1,k*2.4,k*2.4,hero);else{g.fillStyle=grad(g,-k,-k,2*k,2*k,'#292723',hero?.color||'#555');g.fillRect(-k,-k,2*k,2*k);if(hero)powerIcon(g,hero.id,0,0);}}
 else{g.fillStyle='#26383d';g.fillRect(-k,-k,2*k,2*k);txt(g,'✦',0,0,30,'#d6b577');}
 g.restore();
 const card=e.kind==='card'?D.byId[e.id]:null,mark=e.type==='death'?['☠','#5b1a14']:e.type==='burn'?['✕','#5b1a14']:e.type==='fatigue'?['−'+(e.n||''),'#5b1a14']:card?.type==='spell'?['✦','#1f4f8f']:e.type==='power'?['◆','#3b2812']:e.type==='steal'?['⇄','#6a4a10']:null;
 if(mark){ellipse(g,k-2,k-2,11,11,mark[1],'#f3d79a',1.5);txt(g,mark[0],k-2,k-1.5,mark[0].length>1?10:13,'#fff1cf');}}
function strip(c,items,now){R.blit(c,R.sprite('strip',L.strip.x-20,L.strip.y-12,L.strip.w+40,L.strip.h+30,stripArt));touch('chronicle',L.strip.x,L.strip.y,L.strip.w,L.strip.h);
 items.forEach((e,i)=>{const {x,y,size}=L.stripRow(i);
  // A new parchment section per turn, headed by its number.
  if(i&&items[i-1].turn!==e.turn){const sy=y-L.strip.step/2;c.save();c.strokeStyle='#6a503088';c.lineWidth=1.2;c.setLineDash([4,3]);c.beginPath();c.moveTo(L.strip.x+8,sy);c.lineTo(L.strip.x+L.strip.w-8,sy);c.stroke();c.restore();
   round(c,x-23,sy-6.5,46,13,6.5,'#ead8ab','#6a503066',1);txt(c,'ZUG '+e.turn,x,sy+.5,8.5,'#5a4026');}
  R.blit(c,R.sprite('entry:'+[e.kind,e.id,e.type,e.p,e.n||''],-size/2-6,-size/2-6,size+12,size+12,g=>entryArt(g,e)),x,y);
  if(!i&&R.stripNew?.key===e.key&&now-R.stripNew.at<900){const q=(now-R.stripNew.at)/900;c.save();c.globalAlpha=1-q;round(c,x-size/2-6,y-size/2-6,size+12,size+12,9,null,'#fff0b4',3);c.restore();}
  touch('log'+i,x-size/2,y-size/2,size,size,{kind:'log',idCard:e.kind==='card'?e.id:null});});
 const top=items[0]?.key;if(top&&R.stripNew?.key!==top)R.stripNew={key:top,at:R.stripNew?now:-1e9};}
// „Zug beenden“ as a bronze chronometer (AP 1.8): the hand points up during your turn and down during the rival's;
// a tap swings it round with a small hop, the turn event strikes the gong.
const CHRONO=560;R.chrono=null;
// ASTRA: chronometer – bronzenes Chronometer „Zug beenden“: Gehäuse mit Bügel, Zifferblatt und Schild (aktiv, Gegnerzug), 256 × 336
function chronoArt(c,active,label,turn){const r=L.chrono.r;
 c.save();if(active){c.shadowColor='#ffc44b';c.shadowBlur=18;}else{c.shadowColor='#160e09bb';c.shadowBlur=12;c.shadowOffsetY=5;}
 c.beginPath();c.arc(0,-r-11,11,Math.PI*.82,Math.PI*2.18);c.lineWidth=5;c.strokeStyle='#8d6a33';c.stroke();
 round(c,-9,-r-7,18,12,3,grad(c,-9,-r-7,18,12,'#6b4a22','#efcd85'),'#3b2812',1.5);
 ellipse(c,0,0,r,r,grad(c,-r,-r,2*r,2*r,'#5a3d1e','#f2d18c'),'#3b2812',3);c.restore();
 ellipse(c,0,0,r-7,r-7,active?grad(c,-r,-r,2*r,2*r,'#fff6dc','#e0c58e'):grad(c,-r,-r,2*r,2*r,'#c9c3b5','#8f8a7f'),'#4a3418',2);
 c.strokeStyle='#4a3418';for(let i=0;i<60;i++){const an=i*Math.PI/30,long=i%5===0;c.beginPath();c.moveTo(Math.cos(an)*(r-10),Math.sin(an)*(r-10));c.lineTo(Math.cos(an)*(r-(long?17:13)),Math.sin(an)*(r-(long?17:13)));c.lineWidth=long?2:1;c.stroke();}
 for(const [t,an] of [['XII',-Math.PI/2],['III',0],['VI',Math.PI/2],['IX',Math.PI]])txt(c,t,Math.cos(an)*(r-26),Math.sin(an)*(r-26)+1,10,'#4a3418');
 round(c,-64,r+8,128,30,9,grad(c,-64,r+8,0,30,active?'#b48534':'#3c4647',active?'#f4d47c':'#667270'),active?'#63451e':'#303839',3);
 round(c,-60,r+12,120,22,6,null,'#ffffff40',1);txt(c,label,0,r+24,14,active?'#2a2016':'#c8cfcb','center',118);txt(c,'ZUG '+turn,0,r+56,14,'#ddc99d');}
function chronometer(c,s,now){const {x,y,r}=L.chrono,mine=s.active===0,active=mine&&s.phase==='play';let f=R.chrono;
 if(!f)f=R.chrono={mine,from:0,to:mine?0:Math.PI,at:-1e9};else if(f.mine!==mine){f.mine=mine;f.from=f.to;f.to+=Math.PI;f.at=motion()?now:-1e9;}
 const q=Math.min(1,(now-f.at)/CHRONO),back=1.70158,e=1+(back+1)*Math.pow(q-1,3)+back*Math.pow(q-1,2),angle=f.from+(f.to-f.from)*e,hop=1+.08*Math.sin(Math.min(1,q*1.6)*Math.PI);
 c.save();c.translate(x,y);c.scale(hop,hop);R.blit(c,R.sprite('chrono:'+[active,s.turn],-90,-r-40,180,2*r+112,g=>chronoArt(g,active,mine?'ZUG BEENDEN':'GEGNERZUG',Math.max(1,s.turn))));
 c.rotate(angle);c.lineCap='round';c.beginPath();c.moveTo(0,10);c.lineTo(0,-(r-21));c.strokeStyle='#2a1c10';c.lineWidth=4;c.stroke();
 c.beginPath();c.moveTo(0,-(r-14));c.lineTo(-5,-(r-25));c.lineTo(5,-(r-25));c.closePath();c.fillStyle='#2a1c10';c.fill();c.restore();
 ellipse(c,x,y,5,5,'#c9a052','#2a1c10',1.5);
 hit('end',x-r-10,y-r-26,2*r+20,2*r+74);}
// Square chronicle images reuse the exact in-match artwork and ability glyphs.
R.logIcons={};R.logIcon=(kind,id)=>{const key=kind+':'+id;if(!R.logIcons[key]){
 const el=document.createElement('canvas');el.width=el.height=96;const c=el.getContext('2d');
 if(kind==='card'){const card=D.byId[id];R.tile(c,card.art,card.cell,0,0,96,96,card);}
 else if(kind==='hero'){const hero=D.heroes.find(h=>h.id===id);R.tile(c,hero.art,hero.cell,0,0,96,96,hero);}
 else if(kind==='power'){const hero=D.heroes.find(h=>h.id===id);c.fillStyle=grad(c,0,0,96,96,'#292723',hero.color);c.fillRect(0,0,96,96);c.save();c.translate(48,48);c.scale(1.4,1.4);powerIcon(c,id,0,0);c.restore();}
 else{c.fillStyle='#26383d';c.fillRect(0,0,96,96);txt(c,'✦',48,48,48,'#d6b577');}
 R.logIcons[key]=el.toDataURL('image/png');}return R.logIcons[key];};
// Upright 3:4 relief plaques. Status cues retain their existing meanings.
// Since AP 2.4 a plaque is one sprite per state: the key holds everything the picture depends on.
function plaqueSprite(u,card,ready,selected,aim){const key=['minion',u.id,u.attack,u.health,!!u.building,selected?2:ready?1:0,aim,!!R.images[card.art],...['stealth','silenced','taunt','shield','frozen','rush','double','plunder','poison'].map(k=>u[k]?1:0),!u.ready&&u.attacks===0].join();
 return R.sprite(key,-86,-108,172,212,g=>plaque(g,u,card,ready,selected,aim),L.minionScale);}
// R.units remembers the last picture of every unit, so a plaque that dies can still break into shards (AP 3.5).
R.units={};
function minion(c,s,p,u,x,y,selected,targets,t){
 const card=D.byId[u.id],ready=p===s.active&&E.canAttack(u)&&s.phase==='play',aim=targets.includes(u.uid),ms=L.minionScale;
 const sp=plaqueSprite(u,card,ready,selected,aim);c.save();c.translate(x,y);c.scale(ms,ms);R.blit(c,sp);c.restore();
 if(u.shield)window.CHF.aura(c,x,y,t,ms);
 R.positions[u.uid]={x,y};R.units[u.uid]={u,card,x,y,p,sp,seen:t};
 hit(u.uid,x-57*ms,y-72*ms,114*ms,146*ms,{kind:'target',idCard:u.id});
 return ready;
}
// ASTRA: diener-plakette – Diener-Plakette auf dem Feld (Rahmen, Angriff, Leben, Bauwerk-Turm, Schlüsselwort-Leiste), 204 × 272
function plaque(c,u,card,ready,selected,aim){
 c.save();c.shadowColor='#301b12aa';c.shadowBlur=13;
 ellipse(c,0,69,47,8/L.minionScale,'#38271939');c.restore();
 const legend=card.rarity==='legendary',building=!!u.building,K=window.CHF;
 // AP 3.6: Schildwall as a wooden and a bronze shield behind the plaque, Vermächtnis as an urn below it.
 if(u.taunt)K.shieldWall(c);if(card.death&&!u.silenced&&!building)K.urn(c);
 if(ready||selected){c.shadowColor=selected?'#ffda67':'#76ff4d';c.shadowBlur=20;}
 round(c,-51,-68,102,136,9,grad(c,-51,-68,102,136,'#292824',building?'#a9a397':legend?'#b38c4e':'#79654e'),'#28231f',3);
 c.shadowBlur=0;
 round(c,-47,-64,94,128,7,null,legend?'#e1bd74':'#b59b75',1.5);
 round(c,-44,-61,88,119,5,'#25221d','#1a1816',2);
 c.save();c.beginPath();c.roundRect(-43,-60,86,116,4);c.clip();
 R.tile(c,card.art,card.cell,-56,-60,112,116,card);c.restore();
 if(u.stealth)K.stealth(c);
 if(u.silenced)round(c,-43,-60,86,116,4,'#a8a29a66');
 // Raised corner rivets and a dark inner bevel keep the artwork dominant.
 for(const xx of [-47,47])for(const yy of [-64,64])ellipse(c,xx,yy,1.8,1.8,'#dac499');
 round(c,-43,-60,86,116,4,null,'#201b18aa',2);
 if(card.rarity!=='basic'&&card.rarity!=='token')gem(c,0,61,legend?8:6,rarityColor[card.rarity]);
 // Göttliche Gunst: a ring of light around the plaque; two lights run round it in every picture (CHF.aura).
 if(u.shield)K.ring(c);
 if(u.frozen)K.frost(c);
 if(u.poison)K.vial(c);
 if(u.taunt)tauntCrest(c);
 if(building){// Bauwerk: no attack, durability on a stone tower badge.
  round(c,-24,41,48,34,8,grad(c,-24,41,48,34,'#6f6a62','#cfc8ba'),'#3a3631',2.5);txt(c,'♜',-11,58,17,'#3a3631');number(c,u.health,9,59,24);}
 else{round(c,-56,43,39,32,8,grad(c,-56,43,39,32,'#b8a479','#fff0c7'),'#53432d',2.5);
  c.font='bold 26px Title';c.textAlign='center';c.textBaseline='middle';c.fillStyle='#30251a';c.fillText(u.attack,-36.5,60);
  round(c,17,43,39,32,8,grad(c,17,43,39,32,'#581722','#b52e40'),'#34171c',2.5);number(c,u.health,36.5,60,25);}
 if(!u.ready&&u.attacks===0&&!building)txt(c,'z',34,-50,22,'#346f29');
 // Keyword marks between the stats: Vermächtnis, effect at turn end, Vorstoß, Doppelschlag, Arkaner Fokus.
 // 1.8.0: ◐ Tarnung, ♥ Plünderung, ⚗ Tödliches Gift, ⊘ Bannung (the card's own marks are gone).
 // 1.20.0 (AP 3.6): the urn, the phial and the undergrowth replace ☠, ⚗ and ◐.
 const own=!u.silenced;const marks=[own&&(card.passive||card.start||card.end||card.onHeal||card.allyHeal)&&['✦','#d8c9fa'],u.rush&&['➤','#ffd27a'],u.double&&['⚔','#ffe3b0'],own&&card.focus&&['✧'+card.focus,'#a9dcff'],u.plunder&&['♥','#ff8f7a'],u.silenced&&['⊘','#d5d0c8']].filter(Boolean);
 if(!building&&marks.length){const w=marks.reduce((n,[g])=>n+(g.length>1?24:17),6);round(c,-w/2,22,w,22,10,'#1d1712d9','#c9a96a',1.2);let xx=-w/2+3;
  for(const [g,col] of marks){const gw=g.length>1?24:17;txt(c,g,xx+gw/2,33,g.length>1?13:15,col);xx+=gw;}}
 if(ready&&!selected)round(c,-55,-72,110,144,11,null,'#8dff6a',2.5);
 if(aim)round(c,-59,-76,118,154,13,null,'#db403d',3);
}
// ---------- Game feel (AP 3.2–3.5) ----------
const clamp=T.clamp,lerp=T.mix;
// The equipped card back for cards in the air (AP 3.4), from the stone kit in a size that stays sharp.
R.cardBack=(c,x,y,w,h)=>c.drawImage(CHS.backCanvas(R.look.back,w*R.scale>150?240:120),x,y,w,h);
// AP 3.5: the hit sound of a unit – hooves for riders and chariots, a lance crash for spears and pikes, else blades.
const FAMILY=[[/reiter|ross\b|pferd|kavaller|husar|streitwagen|kriegswagen|kamel|mameluk|ritter|tjost|kürassier|dragoner|lanzenreiter/i,'hooves'],[/lanze|speer|pike|hoplit|phalanx|spieß|sarissa|hellebard|landsknecht|triarier/i,'lance']];
R.hitSound=card=>!card?'clash':FAMILY.find(([re])=>re.test(card.name))?.[1]||'clash';
// AP 3.2: hand cards follow springs. A pressed card grows at once and rises upright, its neighbours on the same fan give
// way; playable cards glow green, golden yellow when a condition is met (vm.hand), golden cards catch a passing glint.
const HAND_SPRING={stiffness:260,damping:24},SPREAD=[0,48,24,10];R.springs={};
function handSpring(uid,pose){let f=R.springs[uid];
 if(!f)f=R.springs[uid]={x:new T.Spring(pose.x,HAND_SPRING),y:new T.Spring(pose.y,HAND_SPRING),a:new T.Spring(pose.angle,HAND_SPRING),k:new T.Spring(1,{stiffness:420,damping:28})};return f;}
// ASTRA: goldglanz – Glanzstreifen, der über Goldene Karten läuft, 160 × 800
const glintSprite=()=>R.sprite('glint',-40,-200,80,400,g=>{const gr=g.createLinearGradient(-40,0,40,0);gr.addColorStop(0,'#fff4c800');gr.addColorStop(.5,'#fff8dcb0');gr.addColorStop(1,'#fff4c800');g.fillStyle=gr;g.fillRect(-40,-200,80,400);});
// Feedback 1.18.0: the card is drawn around its centre, the gate path from its corner – without the shift the streak ran
// below and right of the card and never crossed the picture. Now it sweeps the whole gate, picture included, top left to bottom right.
function glint(c,w,h,t,i){const ph=((t+i*430)%2800)/2800;if(ph>.32)return;const q=ph/.32;
 c.save();c.translate(-w/2,-h/2);c.scale(w/200,h/282);R.gatePath(c);c.clip();c.translate(-70+q*340,141);c.rotate(.38);R.blit(c,glintSprite());c.restore();}
function hand(c,s,view,handInfo,t,gold){const a=s.players[0];let cards=a.hand;
 if(view.drag?.cardId&&view.handIndex!=null){cards=[...cards];const i=cards.findIndex(h=>h.uid===view.drag.uid);if(i>=0)cards.splice(view.handIndex,0,cards.splice(i,1)[0]);}
 const n=cards.length,left=Math.ceil(n/2),press=view.drag?null:view.press,selected=view.selected?.type==='play'?view.selected.uid:null,focus=press||selected,fi=cards.findIndex(h=>h.uid===focus),dt=T.clock.dt;
 const keep=new Set(cards.map(h=>h.uid));for(const uid of Object.keys(R.springs))if(!keep.has(uid))delete R.springs[uid];
 const order=cards.map((h,i)=>({h,i})).sort((x,y)=>Number(x.h.uid===focus)-Number(y.h.uid===focus));
 for(const {h,i} of order){if(view.drag?.uid===h.uid||CHM.hiddenHand(h.uid))continue;
  const rest=L.handPose(i,n);let pose=rest,k=1;
  if(h.uid===press){pose=L.pressedHandPose(rest);k=L.pressScale;}
  else if(h.uid===selected)pose=L.raisedHandPose(rest);
  else if(fi>=0&&(i<left)===(fi<left)){const d=i-fi;pose={...rest,x:rest.x+Math.sign(d)*SPREAD[Math.min(3,Math.abs(d))]};}
  const f=handSpring(h.uid,rest),x=f.x.to(pose.x).step(dt),y=f.y.to(pose.y).step(dt),an=f.a.to(pose.angle).step(dt),sc=f.k.to(k).step(dt);
  const info=handInfo[h.uid]||{},card=D.byId[h.id],w=L.handWidth,hh=w*1.41;
  c.save();c.translate(x,y);c.rotate(an);c.scale(sc,sc);R.fastCard(c,card,-w/2,-hh/2,w,hh,{glow:info.can?(info.boost?'boost':true):false,selected:h.uid===selected,cost:info.cost,gold});
  if(gold&&motion())glint(c,w,hh,t,i);c.restore();
  hit(h.uid,x-w*sc/2,y-hh*sc/2,w*sc,hh*sc,{kind:'hand',idCard:h.id,cx:x,cy:y,angle:an});R.positions[h.uid]={x,y,w:w*sc,angle:an};}}
// The dragged card tilts with the speed of the finger on a soft spring and swings out when it stops.
function dragged(c,d,t,gold){const p=L.dragPose(d,t);let f=R.dragTilt;
 if(!f||f.uid!==d.uid)f=R.dragTilt={uid:d.uid,last:p.x,s:new T.Spring(0,{stiffness:150,damping:11})};
 const v=(p.x-f.last)/Math.max(4,T.clock.realDt||16);f.last=p.x;d.angle=f.s.to(clamp(v*.16,-.26,.26)).step(T.clock.dt||T.clock.realDt);
 d.x=p.x;d.y=p.y;d.w=p.w;CHM.floatCard(c,d.cardId,p.x,p.y,p.w,d.angle,1,{lift:.6,gold});}
// AP 3.5: the march route – chevrons of red ink like on a campaign map, marching towards the finger, and a bold head.
// ASTRA: marschroute – Marschrouten-Pfeil aus roten Tintenwinkeln mit Pfeilspitze, 64 × 64 je Winkel
const chevron=()=>R.sprite('chevron',-14,-14,28,28,g=>{g.lineCap='round';g.lineJoin='round';g.beginPath();g.moveTo(-6,-8);g.lineTo(5,0);g.lineTo(-6,8);g.strokeStyle='#3b0d0a';g.lineWidth=8;g.stroke();g.strokeStyle='#d8352a';g.lineWidth=4.5;g.stroke();});
const routeHead=()=>R.sprite('routehead',-44,-28,56,56,g=>{g.beginPath();g.moveTo(6,0);g.lineTo(-30,-19);g.lineTo(-20,0);g.lineTo(-30,19);g.closePath();g.fillStyle='#c42a20';g.fill();g.lineJoin='round';g.lineWidth=3;g.strokeStyle='#3b0d0a';g.stroke();g.beginPath();g.moveTo(-1,-1);g.lineTo(-24,-14);g.strokeStyle='#ff8a70';g.lineWidth=1.4;g.stroke();});
function route(c,a,b,locked,t){const cx=(a.x+b.x)/2,cy=Math.min(a.y,b.y)-90,P=u=>({x:(1-u)*(1-u)*a.x+2*(1-u)*u*cx+u*u*b.x,y:(1-u)*(1-u)*a.y+2*(1-u)*u*cy+u*u*b.y});
 const pts=[];let len=0,last=P(0);for(let i=0;i<=40;i++){const p=P(i/40);len+=Math.hypot(p.x-last.x,p.y-last.y);pts.push({...p,len});last=p;}
 const at=d=>{let i=pts.findIndex(p=>p.len>=d);if(i<1)i=1;const p=pts[i],q=pts[i-1];return {x:p.x,y:p.y,an:Math.atan2(p.y-q.y,p.x-q.x)};};
 c.save();c.globalAlpha=locked?1:.92;const step=26,off=motion()?(t*.09)%step:0,sp=chevron();
 for(let d=off+8;d<len-34;d+=step){const p=at(d);c.save();c.translate(p.x,p.y);c.rotate(p.an);R.blit(c,sp);c.restore();}
 const e=at(len);c.translate(b.x,b.y);c.rotate(e.an);const k=locked?1.15:1;c.scale(k,k);R.blit(c,routeHead());c.restore();}
// Valid targets pulse red as soon as the route lies on them.
const aimGlow=(w,h,r)=>R.sprite('aimglow:'+[w,h,r],-w/2-30,-h/2-30,w+60,h+60,g=>{g.shadowColor='#ff3a2a';g.shadowBlur=18;g.beginPath();g.roundRect(-w/2,-h/2,w,h,r);g.lineWidth=5;g.strokeStyle='#ff5a45';g.stroke();});
function pulse(c,uid,t){const pos=R.positions[uid];if(!pos)return;const hero=/^h[01]$/.test(uid),k=hero?L.heroScale(+uid[1]):L.minionScale,b=motion()?Math.sin(t/85):1;
 c.save();c.globalAlpha=.55+.4*b;c.translate(pos.x,pos.y);c.scale(1+.05*b,1+.05*b);
 if(hero)R.blit(c,aimGlow(170*k,170*k,85*k));else R.blit(c,aimGlow(118*k,154*k,13*k));c.restore();}
// Units that may still attack breathe a green glow (AP 3.5).
const readyGlow=()=>R.sprite('readyglow',-80,-100,160,200,g=>{g.shadowColor='#7dff55';g.shadowBlur=16;g.beginPath();g.roundRect(-54,-71,108,142,11);g.lineWidth=3;g.strokeStyle='#9dff7a';g.stroke();});
// ---------- Effects ----------
// ASTRA: tintenspritzer – Spritzer getrockneter Tinte hinter einer Schadenszahl (drei Varianten), 220 × 220
const inkSprite=v=>R.sprite('ink:'+v,-55,-55,110,110,g=>{let seed=v*7919+3;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
 g.fillStyle='#5a1410';g.globalAlpha=.78;g.beginPath();for(let i=0;i<=24;i++){const an=i/24*Math.PI*2,r=22+rnd()*9;g.lineTo(Math.cos(an)*r,Math.sin(an)*r*.82);}g.closePath();g.fill();
 for(let i=0;i<11;i++){const an=rnd()*Math.PI*2,r=28+rnd()*22,s=1.5+rnd()*4.5;g.beginPath();g.ellipse(Math.cos(an)*r,Math.sin(an)*r*.85,s,s*.8,an,0,Math.PI*2);g.fill();}
 g.globalAlpha=.35;g.fillStyle='#2a0806';g.beginPath();g.ellipse(-4,-3,14,10,.4,0,Math.PI*2);g.fill();});
const redNumber=text=>R.sprite('dmg:'+text,-60,-34,120,68,g=>{g.font='bold 40px Title,serif';g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.strokeStyle='#2a0b08';g.lineWidth=6;g.strokeText(text,0,0);g.fillStyle='#ff5a47';g.fillText(text,0,0);});
// ASTRA: staubwolke – Staubwolke beim Aufprall einer Karte und beim Zerbrechen einer Plakette, 128 × 128
const dustSprite=()=>R.sprite('dust',-32,-32,64,64,g=>{const gr=g.createRadialGradient(0,0,2,0,0,32);gr.addColorStop(0,'#efe0bccc');gr.addColorStop(.5,'#d9c49a77');gr.addColorStop(1,'#d9c49a00');g.fillStyle=gr;g.fillRect(-32,-32,64,64);});
// ASTRA: steinrisse – Risse im Steintisch unter einer landenden Karte (drei Varianten), 440 × 240
const crackSprite=v=>R.sprite('cracks:'+v,-110,-60,220,120,g=>{let seed=v*977+13;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;g.lineCap='round';g.lineJoin='round';
 for(let i=0;i<9;i++){const an=i/9*Math.PI*2+rnd()*.5,len=40+rnd()*62,pts=[[0,0]];let x=0,y=0;for(let k=1;k<=4;k++){const d=an+(rnd()-.5)*.7;x+=Math.cos(d)*len/4;y+=Math.sin(d)*len/4*.5;pts.push([x,y]);}
  const path=()=>{g.beginPath();pts.forEach(([x,y],j)=>g[j?'lineTo':'moveTo'](x,y));};const w=i%2?1.6:2.4;
  g.save();g.translate(0,1.2);path();g.strokeStyle='rgba(255,240,205,.5)';g.lineWidth=w;g.stroke();g.restore();path();g.strokeStyle='rgba(52,30,12,.78)';g.lineWidth=w;g.stroke();}});
const pumpSprite=()=>R.sprite('pump',-30,-30,60,60,g=>{const gr=g.createRadialGradient(0,0,3,0,0,30);gr.addColorStop(0,'#ff7a60');gr.addColorStop(.45,'#e8302588');gr.addColorStop(1,'#e8302500');g.fillStyle=gr;g.fillRect(-30,-30,60,60);});
// Shards of a broken plaque: triangles from an off-centre point to the outline, each with its own push and spin.
const SHARDS=(()=>{const o=[-8,-14],rim=[[-60,-82],[-14,-82],[26,-82],[60,-82],[60,-28],[60,26],[60,84],[16,84],[-28,84],[-60,84],[-60,24],[-60,-30]],out=[];
 rim.forEach((a,i)=>{const b=rim[(i+1)%rim.length],cx=(o[0]+a[0]+b[0])/3,cy=(o[1]+a[1]+b[1])/3,len=Math.hypot(cx,cy)||1,r=(i*37%11)/11;
  out.push({pts:[o,a,b],cx,cy,vx:cx/len*(55+r*45),vy:cy/len*(40+r*30)-70,spin:(r-.5)*3.2});});return out;})();
// Each shard is the plaque's last picture (R.units) under a triangular clip – nothing new has to be painted when a unit dies.
function shatter(c,f,t){const e=(t-f.start)/1000,q=(t-f.start)/f.life,k=L.minionScale;
 c.save();c.globalAlpha=q<.35?1:Math.max(0,1-(q-.35)/.65);
 for(const sh of SHARDS){c.save();c.translate(f.x,f.y);c.scale(k,k);c.translate(sh.cx+sh.vx*e,sh.cy+sh.vy*e+260*e*e);c.rotate(sh.spin*e);c.translate(-sh.cx,-sh.cy);
  c.beginPath();sh.pts.forEach(([x,y],i)=>c[i?'lineTo':'moveTo'](x,y));c.closePath();c.clip();R.blit(c,f.sp);c.restore();}
 c.restore();}
function dust(c,f,t){const q=(t-f.start)/f.life,n=8+Math.round(12*f.weight),sp=dustSprite(),spread=(40+80*f.weight)*T.ease.outCubic(q);
 for(let i=0;i<n;i++){const an=i/n*Math.PI*2+(i%3)*.2,r=spread*(.7+(i*37%10)/25),size=(.55+.7*f.weight)*(.6+q*.9);
  c.save();c.globalAlpha=.8*(1-q)*(1-q);c.translate(f.x+Math.cos(an)*r,f.y+Math.sin(an)*r*.42-q*18);c.scale(size,size*.8);R.blit(c,sp);c.restore();}}
// AP 3.4: a card that does not fit into a full hand burns from below – charred edge, a seam of embers, rising ash.
R.burning=(c,id,x,y,w,burn,t)=>{const h=w*1.41,front=h/2-burn*h*1.08;c.save();c.translate(x,y);
 if(burn<1){c.save();c.beginPath();c.rect(-w/2-4,-h/2-4,w+8,Math.max(0,front+h/2+4));c.clip();R.fastCard(c,D.byId[id],-w/2,-h/2,w,h);
  const ch=c.createLinearGradient(0,front-28,0,front);ch.addColorStop(0,'#1a0c0400');ch.addColorStop(1,'#1a0c04ee');c.fillStyle=ch;c.fillRect(-w/2-4,front-28,w+8,28);c.restore();
  if(burn>0){c.beginPath();for(let i=0;i<=12;i++)c[i?'lineTo':'moveTo'](-w/2+i*w/12,front+Math.sin(i*1.9+t/60)*3);c.lineCap='round';c.strokeStyle='#ff9f3a';c.lineWidth=3.6;c.stroke();c.strokeStyle='#fff1b0';c.lineWidth=1.2;c.stroke();}}
 for(let i=0;i<20;i++){const born=i/20,age=burn-born;if(age<=0||age>.45)continue;const a=1-age/.45,ax=-w/2+(i*53%17)/17*w+Math.sin(age*20+i)*6,ay=h/2-born*h*1.08-age*h*.9;
  c.fillStyle=i%3?`rgba(70,60,52,${a*.8})`:`rgba(255,170,80,${a})`;c.fillRect(ax,ay,i%3?3:2,i%3?3:2);}
 c.restore();};
// AP 3.4: Erschöpfung – drops of life run from the hero into the hourglass, which glows red while it drinks.
R.drain=(c,p,n,q)=>{const from={x:L.center,y:L.heroY[p]},to=CHM.deckPosition(p);
 for(let i=0;i<14;i++){const k=clamp((q-i*.03)/.55);if(k<=0||k>=1)continue;const e=T.ease.inOutCubic(k),r=4.2-k*1.6;
  ellipse(c,lerp(from.x,to.x,e),lerp(from.y,to.y,e)-Math.sin(e*Math.PI)*(90+i*4),r,r,i%2?'#c8342c':'#d6a85a');}};
function effects(c,t,floor){
 for(const f of R.fx){if(t<f.start)continue;const q=(t-f.start)/f.life;
  if(f.type==='sound'){if(!f.fired){f.fired=true;CHA.play(f.sound,{x:f.x,gain:f.gain});}continue;}
  if(floor!==(f.type==='cracks'))continue;
  if(f.type==='cracks'){const s=(.7+.6*f.weight)*Math.min(1,.4+(t-f.start)/150);c.save();c.globalAlpha=q<.65?1:1-(q-.65)/.35;c.translate(f.x,f.y);c.scale(s,s);R.blit(c,crackSprite(f.seed%3));c.restore();}
  else if(f.type==='dust')dust(c,f,t);
  else if(f.type==='shatter')shatter(c,f,t);
  else if(window.CHF.paint[f.type])window.CHF.paint[f.type](c,f,t);
  else if(f.type==='pump'){const pos=R.positions[f.target];if(!pos)continue;const hero=/^h[01]$/.test(f.target),k=hero?L.heroScale(+f.target[1]):L.minionScale,
    beat=q<.45?Math.sin(q/.45*Math.PI):.6*Math.sin((q-.45)/.55*Math.PI);if(beat<=0)continue;
   c.save();c.globalAlpha=.8*beat;c.translate(pos.x+(hero?50:36.5)*k,pos.y+(hero?58:59)*k);c.scale(1+.5*beat,1+.5*beat);R.blit(c,pumpSprite());c.restore();}
  else if(f.type==='damage'){const e=t-f.start,pop=e<180?T.ease.outBack(e/180):1,s=(.45+.7*pop)*(1-Math.min(.12,Math.max(0,e-180)/1500));
   c.save();c.globalAlpha=Math.pow(1-q,.7)*.9;c.translate(f.x,f.y-6);const ik=.7+.45*T.ease.outCubic(Math.min(1,e/220));c.scale(ik,ik);R.blit(c,inkSprite(f.seed%3));c.restore();
   c.save();c.globalAlpha=q<.6?1:1-(q-.6)/.4;c.translate(f.x,f.y-q*34);c.scale(s,s);R.blit(c,redNumber('−'+f.n));c.restore();}
  else if(f.type==='heal'){c.save();c.globalAlpha=1-q;number(c,'+'+f.n,f.x,f.y-q*60,40);c.restore();}
  else if(['death','buff','steal'].includes(f.type)){for(let i=0;i<14;i++){const ang=i*2.4,r=q*(f.type==='death'?110:65);c.globalAlpha=1-q;ellipse(c,f.x+Math.cos(ang)*r,f.y+Math.sin(ang)*r,4*(1-q)+1,4*(1-q)+1,f.type==='death'?'#d9b986':f.type==='steal'?'#f0c463':'#a2e6ee');}c.globalAlpha=1;}
  else if(f.type==='impact'){c.save();c.globalAlpha=1-q;c.globalCompositeOperation='screen';ellipse(c,f.x,f.y,18+q*54,12+q*37,null,'#ffe7b0',4*(1-q)+1);for(let i=0;i<9;i++){const an=i*2.399+f.x,rad=12+q*86;c.strokeStyle=i%2?'#fff5d7':'#ffb449';c.lineWidth=3*(1-q)+.5;c.beginPath();c.moveTo(f.x+Math.cos(an)*rad*.55,f.y+Math.sin(an)*rad*.55);c.lineTo(f.x+Math.cos(an)*rad,f.y+Math.sin(an)*rad);c.stroke();}c.restore();}}}
// ---------- The picture ----------
// t is the match clock (anim.js): tempo, hit stop. handInfo comes from the view model (Match.hand): cost, playable, boost.
R.draw=(c,s,view,t,log=[],handInfo={})=>{const dt=Math.min(40,Math.max(0,t-(R.lastTime??t-16)));R.lastTime=t;still=!!window.AEP?.reducedMotion?.();R.hits=[];R.positions={};c.clearRect(0,0,1600,800);c.save();
 const gold=R.look.frame==='gold',sh=T.shake.offset();if(sh.zoom!==1){c.translate(800,400);c.scale(sh.zoom,sh.zoom);c.translate(-800,-400);}c.translate(sh.x,sh.y);
 // Static layer (AP 2.4): table and chart in one offscreen picture, redrawn only for another table.
 const fieldName=R.images[R.look.board]?R.look.board:R.images.board?'board':null,tint=fieldName===R.look.board?R.look.tint||'':'';
 R.blit(c,R.sprite('field:'+[fieldName,tint],0,0,1600,800,g=>table(g,fieldName,tint)));
 R.fx=R.fx.filter(f=>t-f.start<f.life);effects(c,t,true);
 const a=s.players[0],b=s.players[1],targets=view.targets||[];hit('decor0',1485,0,112,145,{kind:'decor'});hit('decor1',0,0,110,142,{kind:'decor'});hit('decor2',0,710,120,90,{kind:'decor'});hit('decor3',1490,710,110,90,{kind:'decor'});
 const insert=view.insertIndex??CHM.insertion();
 for(let p=0;p<2;p++){const yy=L.rows[p],board=s.players[p].board,hasGap=p===0&&insert!=null&&board.length<7;if(view.drag?.cardId&&p===0)for(let i=0;i<7;i++)ellipse(c,L.center+(i-3)*L.spacing,yy,56,76,'#49331a05','#67502e22',1);
  if(hasGap){const xx=L.center+(insert-board.length/2)*L.spacing;R.blit(c,R.sprite('gap',-110,-130,220,260,g=>{g.shadowColor='#aaf36a';g.shadowBlur=24;ellipse(g,0,0,60,78,'#91d55629','#d3ed9b',2);g.shadowBlur=0;txt(g,'↓',0,0,30,'#efffd3');}),xx,yy);}
  board.forEach((u,i)=>{const index=i+(hasGap&&i>=insert?1:0),base=R.smooth(u.uid,L.center+(index-(board.length-1+(hasGap?1:0))/2)*L.spacing,yy,dt),pos=CHM.pose(u.uid,base,t),foot=60*L.minionScale;
   c.save();c.translate(pos.x,pos.y+foot);c.rotate(pos.angle);c.scale(pos.scale*(pos.sx||1),pos.scale*(pos.sy||1));c.translate(-pos.x,-pos.y-foot);
   const ready=minion(c,s,p,u,pos.x,pos.y,view.selected&&view.selected.uid===u.uid,targets,t);
   if(ready&&p===0&&motion()&&view.selected?.uid!==u.uid){c.save();c.globalAlpha=.25+.25*Math.sin(t/320);c.translate(pos.x,pos.y);c.scale(L.minionScale,L.minionScale);R.blit(c,readyGlow());c.restore();}
   c.restore();});}
 for(const uid of Object.keys(R.units))if(t-R.units[uid].seen>4000)delete R.units[uid];
 // Rival's fanned hand as sealed orders (AP 1.8 Teil 2); orders still flying from his deck are not in the row yet.
 const order=R.sprite('order',-24,-62,48,92,orderArt),orders=Math.max(0,b.hand.length-CHM.pendingOrders());
 for(let i=0;i<orders;i++){c.save();c.translate(490+i*34,12);c.rotate((i-(b.hand.length-1)/2)*.033);R.blit(c,order);c.restore();}
 deck(c,s,0,t);deck(c,s,1,t);
 chronometer(c,s,t);
 // Ether dials on the left (1.17.0) and the chronicle strip at the edge (AP 1.8 Teil 2).
 dial(c,0,a,t);dial(c,1,b,t);strip(c,log,t);
 hand(c,s,view,handInfo,t,gold);
 const ownHero=CHM.pose('h0',{x:L.center,y:L.heroY[0]},t);R.positions.h0=ownHero;R.positions.power0=L.powerPosition(0,ownHero.x,ownHero.y);
 const rivalHero=CHM.pose('h1',{x:L.center,y:L.heroY[1]},t),K=window.CHF;if(!K.hidden(1))portrait(c,s,1,rivalHero.x,rivalHero.y,t);
 for(const id of targets.filter(x=>x==='h1')){const pos=R.positions[id];ellipse(c,pos.x,pos.y,74*L.heroScale(1),86*L.heroScale(1),null,'#f5473b',4);}
 // The chronicle strip replaces the former CHRONIK button; AUSSPIELEN sits below your ether dial.
 if(!view.drag&&view.selected&&view.selected.type==='play'&&!E.targetKind(s,0,view.selected))button(c,'AUSSPIELEN',L.confirm.x,L.confirm.y,L.confirm.w,L.confirm.h,true,'confirm');
 button(c,'Ⅱ',124,27,60,56,false,'pause');button(c,'?',210,27,60,56,false,'help');txt(c,s.mode==='campaign'?'MISSION '+(s.mission+1):s.mode==='random'?'KOLOSSEUM':s.mode==='daily'?'TAGESDUELL':'SCHLACHT',368,55,13,'#f3dab0');
 CHM.overlay(c,s,t,gold);
 if(view.drag&&view.selected){const d=view.drag,needsArrow=view.selected.type==='attack'||(view.selected.type==='power'&&E.targetKind(s,0,view.selected))||(d.cardId&&E.targetKind(s,0,view.selected));
  if(d.target&&d.target!=='h0')pulse(c,d.target,t);
  if(d.cardId)dragged(c,d,t,gold);
  if(needsArrow){const start=d.cardId?{x:d.x,y:d.y-82}:R.positions[view.selected.uid]||R.positions.power0,end=d.target?R.positions[d.target]:{x:d.pointerX,y:d.pointerY};if(start&&end)route(c,start,end,!!d.target,t);}}
 // Own portrait, frame, armor, health and power always stay above card flights/drags.
 if(!K.hidden(0))portrait(c,s,0,ownHero.x,ownHero.y,t);
 if(targets.includes('h0'))ellipse(c,ownHero.x,ownHero.y,74*L.heroScale(0),86*L.heroScale(0),null,'#f5473b',4);
 if(view.drag?.target==='h0')pulse(c,'h0',t);
 effects(c,t,false);
 turnPlate(c,s,t);
 // AP 3.8: the opening (heroes, chronicler, coin) and the close (relief, banner) lie over everything.
 K.draw(c,s,t);
 c.restore();
};
// Drawing helpers for the keyword effects and the opening and close (fx.js).
R.paint={round,ellipse,grad,txt,number,sparkle,powerIcon};
const hash=s=>String(s).split('').reduce((n,ch)=>n*31+ch.charCodeAt(0)>>>0,7);
R.events=(events,settings)=>{const t=T.clock.now(),played=new Set(),fx=settings.particles!==false;
 for(const ev of events){const pos=R.positions[ev.target]||R.positions['h'+(ev.p||0)]||{x:800,y:400};
  // Keyword effects of this event (AP 3.6): Göttliche Gunst shatters, Starre, Tödliches Gift, the urn of a Vermächtnis.
  const own=window.CHF.event(ev,pos,t,fx);
  if(ev.type==='death'){const u=R.units[ev.target];
   // Feedback 1.19.0 („immer noch etwas viel“): shorter, closer shards, no dust; only a building still crashes down.
   if(fx){if(u)R.fx.push({type:'shatter',sp:u.sp,x:u.x,y:u.y,start:t,life:460});else R.fx.push({type:'death',x:pos.x,y:pos.y,start:t,life:460});if(ev.building)R.fx.push({type:'dust',x:pos.x,y:pos.y+40,weight:.05,start:t,life:520});}
   if(ev.building)R.fx.push({type:'sound',sound:'slam',x:pos.x,gain:.3,start:t+200,life:400});}
  if(fx){if(ev.type==='damage'){R.fx.push({type:'damage',n:ev.n,x:pos.x,y:pos.y-18,seed:hash(ev.target),start:t,life:1050});R.fx.push({type:'pump',target:ev.target,start:t,life:560});}
   else if(ev.type==='heal')R.fx.push({type:'heal',n:ev.n,x:pos.x,y:pos.y,start:t,life:750});
   else if(['buff','steal'].includes(ev.type))R.fx.push({...ev,x:pos.x,y:pos.y,start:t,life:750});
   if(ev.type==='attack'||ev.type==='damage')R.fx.push({type:'impact',x:pos.x,y:pos.y,start:t,life:280});}
  // A unit's own blow (AP 3.5): blades, hooves or a lance; a played minion's thud comes from the landing (motion.js).
  const sound=own?null:{attack:R.hitSound(R.units[ev.source]?.card),damage:'hit',heal:'heal',death:ev.building?'slam':'destroy',power:'power',play:ev.spell?'fire':null,draw:'draw',weapon:'sword',turn:'chime',armor:'armor',steal:'power',discover:'draw',echo:'fire',choice:'pack'}[ev.type];
  // Feedback 1.19.0: the clockwork at a change of turn is softer for the rival's turn; a unit's death is quieter.
  if(sound&&!played.has(sound)){CHA.play(sound,{x:pos.x,gain:ev.type==='damage'&&events.some(e=>e.type==='attack')?.55:ev.type==='turn'&&ev.p===1?.6:ev.type==='death'&&!ev.building?.7:1});played.add(sound);}}
};
})();
