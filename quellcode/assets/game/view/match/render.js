(function(){'use strict';const D=CHD,E=CHE,L=CHL;const R=window.CHR={images:{},thumbs:{},hits:[],positions:{},fx:[],pointer:null,look:{back:'chroniken',board:'board',skins:{}},pending:{}};
// Pictures for the match, the collection and the bazaar (AP 2.2): they load in the background while the hall is already
// shown; progress(done,total) drives the loading bar. Kept as decoded ImageBitmaps: drawing from an <img> may decode
// the WebP again on every drawImage (a legendary card picture took 84 instead of 11 ms). Decoded from the fetched
// file, which happens off the main thread – createImageBitmap(<img>) blocked the hall for up to 3 s at 4× CPU.
const picture=name=>{const src='assets/art/'+name+'.webp',viaImage=()=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src;});
 return window.createImageBitmap?fetch(src).then(r=>{if(!r.ok)throw Error(r.status);return r.blob();}).then(b=>createImageBitmap(b)).catch(viaImage):viaImage();};
R.atlases=()=>['board','heroes','heroes-marble','legendary-frame',...D.heroes.filter(h=>h.art).map(h=>h.id),'neutral0','neutral1','neutral2','neutral3'];
R.load=(progress=()=>{})=>{const names=R.atlases();let done=0;
 return Promise.all(names.map(name=>picture(name).then(im=>{R.images[name]=im;},()=>null).then(()=>progress(++done,names.length))));};
R.ensure=name=>{if(R.images[name]||R.pending[name])return;R.pending[name]=true;picture(name).then(im=>{R.images[name]=im;},()=>null).then(()=>delete R.pending[name]);};
function round(c,x,y,w,h,r,fill,stroke,lw=1){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke();}}
function ellipse(c,x,y,rx,ry,fill,stroke,lw=1){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke();}}
function txt(c,t,x,y,size=18,color='#fff',align='center',max){c.font=`${size}px ${size>=22?'Title':'Body'},serif`;c.textAlign=align;c.textBaseline='middle';c.fillStyle=color;if(max)c.fillText(t,x,y,max);else c.fillText(t,x,y);}
function number(c,t,x,y,size=30){c.font=`bold ${size}px Title,serif`;c.textAlign='center';c.textBaseline='middle';c.strokeStyle='#171416';c.lineWidth=5;c.lineJoin='round';c.strokeText(t,x,y);c.fillStyle='#fff6dc';c.fillText(t,x,y);}
function grad(c,x,y,w,h,a,b){let g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,a);g.addColorStop(.45,b);g.addColorStop(1,a);return g;}
function gem(c,x,y,r,color,label){c.save();c.translate(x,y);c.beginPath();c.moveTo(0,-r);c.lineTo(r*.82,-r*.4);c.lineTo(r,r*.35);c.lineTo(0,r);c.lineTo(-r,r*.35);c.lineTo(-r*.82,-r*.4);c.closePath();const g=c.createLinearGradient(-r,-r,r,r);g.addColorStop(0,'#f5ffff');g.addColorStop(.22,color);g.addColorStop(.62,color);g.addColorStop(1,'#162030');c.fillStyle=g;c.fill();c.lineWidth=2;c.strokeStyle='#172c50';c.stroke();c.beginPath();c.moveTo(-r*.82,-r*.4);c.lineTo(0,0);c.lineTo(r*.82,-r*.4);c.moveTo(0,0);c.lineTo(0,r);c.strokeStyle='#ffffff50';c.stroke();if(label!=null)number(c,label,0,1,r*1.4);c.restore();}
function heart(c,x,y,r,label){c.beginPath();c.moveTo(x,y-r);c.bezierCurveTo(x+r*.4,y-r*.2,x+r,y+r*.05,x+r*.8,y+r*.55);c.bezierCurveTo(x+r*.45,y+r*1.4,x-r*.8,y+r*1.4,x-r*.86,y+r*.4);c.bezierCurveTo(x-r*.92,y-r*.1,x-r*.3,y-r*.4,x,y-r);c.fillStyle=grad(c,x-r,y-r,2*r,2*r,'#731c23','#ee5a47');c.fill();c.strokeStyle='#321211';c.lineWidth=3;c.stroke();number(c,label,x,y+r*.35,r*1.25);}
// Placeholder art drawn in code (AP 5.12 preview): the step pyramid of Djoser until a painted motif exists.
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
const monogram=name=>{const w=name.replace(/[,.’']/g,'').split(/\s+/).filter(x=>/^[A-ZÄÖÜ]/.test(x));return ((w[0]||name)[0]+(w.length>1?w[w.length-1][0]:'')).toUpperCase();};
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
R.card=(c,card,x,y,w=200,h=282,opts={})=>{const rare=rarityColor[card.rarity],legend=card.rarity==='legendary';c.save();c.translate(x,y);c.scale(w/200,h/282);if(opts.glow){c.shadowColor=opts.selected?'#ffc653':'#71ff56';c.shadowBlur=20;}round(c,0,0,200,282,14,'#241d19','#130e0c',3);round(c,4,4,192,274,12,grad(c,0,0,200,282,legend?'#8b501f':'#75573a',legend?'#ffe29a':'#d3b879'),rare,3);round(c,8,8,184,266,10,null,rare,2);c.shadowBlur=0;round(c,10,10,180,258,11,D.owner(card)?.color||'#625b4c','#38251e',3);
c.save();c.beginPath();c.ellipse(100,85,78,74,0,0,Math.PI*2);c.clip();R.tile(c,card.art,card.cell,21,legend?38:10,158,154,card);c.restore();ellipse(c,100,85,79,75,null,'#dbbf7b',4);ellipse(c,100,85,74,70,null,'#1b1719',2);
if(legend&&R.images['legendary-frame'])c.drawImage(R.images['legendary-frame'],4,0,192,153);
else if(card.rarity==='epic'||card.rarity==='rare'){for(const x of [14,186]){gem(c,x,84,9,rare);gem(c,x,126,6,rare);}}
round(c,18,163,164,98,7,grad(c,0,160,0,100,'#ae946a','#f0deaf'),'#5b4631',2);
c.beginPath();c.moveTo(8,143);c.quadraticCurveTo(98,132,192,143);c.lineTo(185,176);c.quadraticCurveTo(100,165,15,177);c.closePath();c.fillStyle=grad(c,0,137,0,40,'#9e7950','#eee1ba');c.fill();c.lineWidth=3;c.strokeStyle='#4b3524';c.stroke();txt(c,card.name,100,155,14,'#211912','center',169);
// Long rules (the new legendaries) get a smaller size and up to seven lines instead of being cut off.
c.font='13px Body';const ls=lines(c,card.text||'Diener',144);let fs=ls.length>4?11:12.5;c.font=fs+'px Body';let body=lines(c,card.text||'Diener',144);let lh=body.length>4?10:12,top=198;
if(body.length>5){fs=10;c.font=fs+'px Body';body=lines(c,card.text,150);lh=9.4;top=Math.max(186,212-(body.length-1)*lh/2);}body.slice(0,7).forEach((t,i)=>txt(c,t,100,top+i*lh,fs,'#30251a'));
gem(c,18,20,24,'#2162ba',card.cost);c.save();c.shadowColor=rare;c.shadowBlur=9;gem(c,100,176,12,rare);c.restore();
round(c,47,247,106,18,6,legend?'#713d15':'#332b27',rare,1);txt(c,(D.rarities[card.rarity]||'Spezial').toUpperCase(),100,256,9.5,legend?'#ffe6a3':rare);
// Bauwerk (AP 5.5): no attack, durability on the same stone tower badge as on the board.
if(card.building){round(c,148,238,46,34,8,grad(c,148,238,46,34,'#6f6a62','#cfc8ba'),'#3a3631',2.5);txt(c,'♜',161,255,16,'#3a3631');number(c,card.health,181,256,22);txt(c,'BAUWERK',100,274,9,'#77603b');}
else if(card.type==='minion'){ellipse(c,21,259,21,21,'#d5ab3f','#362814',3);c.strokeStyle='#f9eee0';c.lineWidth=4;c.beginPath();c.moveTo(4,272);c.lineTo(35,237);c.moveTo(10,250);c.lineTo(22,260);c.stroke();number(c,card.attack,22,261,26);heart(c,179,254,20,card.health);}else{txt(c,'ZAUBER',100,274,9,'#77603b');}
if(legend){for(const x of [10,190])gem(c,x,214,7,'#ffc460');}
if(opts.count!=null){round(c,61,260,78,22,8,'#211b17','#c2a66e',1);txt(c,'× '+opts.count,100,271,13);}
if(opts.locked){round(c,0,0,200,282,14,'#131b23a0');round(c,60,110,80,40,6,'#161a20d9','#aa8d56',1);txt(c,'GESPERRT',100,130,11,'#cfb886');}c.restore();};
// Cache card faces once. Only transforms and shadows change while dragging.
R.cardCache={};R.fastCard=(c,card,x,y,w,h,opts={})=>{let im=R.cardCache[card.id];if(!im){im=document.createElement('canvas');im.width=300;im.height=423;R.card(im.getContext('2d'),card,0,0,300,423);R.cardCache[card.id]=im;}c.save();if(opts.glow){c.shadowColor=opts.selected?'#ffc653':'#71ff56';c.shadowBlur=opts.selected?20:12;}c.drawImage(im,x,y,w,h);c.restore();
 // A changed cost (Marco Polo, Caterina, Andraste) covers the printed gem: green when cheaper.
 if(opts.cost!=null&&opts.cost!==card.cost){const k=w/200;c.save();c.translate(x,y);c.scale(k,k);gem(c,18,20,24,opts.cost<card.cost?'#3aa84e':'#c0453a',opts.cost);c.restore();}};
R.smoothed={};R.smooth=(id,x,y,dt)=>{const old=R.smoothed[id]||{x,y},q=1-Math.exp(-dt/58);const p={x:old.x+(x-old.x)*q,y:old.y+(y-old.y)*q};R.smoothed[id]=p;return p;};
// Rendered cards and artworks become short blob: URLs instead of ~150 KB data: URLs – the views and the binder
// handle hundreds of them (collection, mass opening) without copying megabytes of text on every render.
const blobURL=canvas=>{const data=canvas.toDataURL('image/png'),bin=atob(data.slice(data.indexOf(',')+1)),bytes=new Uint8Array(bin.length);
 for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);return URL.createObjectURL(new Blob([bytes],{type:'image/png'}));};
R.thumb=(id)=>{if(!R.thumbs[id]){const c=document.createElement('canvas');c.width=240;c.height=338;R.card(c.getContext('2d'),D.byId[id],0,0,240,338);R.thumbs[id]=blobURL(c);}return R.thumbs[id];};
// The detail view gets the entire atlas cell, without the portrait crop.
R.artworks={};R.artwork=id=>{if(!R.artworks[id]){const card=D.byId[id],im=R.images[card.art];
 if(card.art==='@pyramid'||!card.art){const c=document.createElement('canvas');c.width=362;c.height=362;R.tile(c.getContext('2d'),card.art,0,0,0,362,362,card);R.artworks[id]=blobURL(c);return R.artworks[id];}
 if(!im)return R.thumb(id);
 const c=document.createElement('canvas');c.width=im.width/4;c.height=im.height/3;
 R.tile(c.getContext('2d'),card.art,card.cell,0,0,c.width,c.height);R.artworks[id]=blobURL(c);}return R.artworks[id];};
// atlas === true picks the player's equipped skin for that hero.
R.medals={};R.heroStyle=(id,atlas='heroes')=>{const i=D.heroes.findIndex(h=>h.id===id),hero=D.heroes[i];
 if(!hero.art){if(!R.medals[id]){const c=document.createElement('canvas');c.width=300;c.height=450;R.tile(c.getContext('2d'),null,0,0,0,300,450,hero);R.medals[id]=c.toDataURL('image/png');}return `background-image:url('${R.medals[id]}');background-size:cover;background-position:center`;}if(atlas===true)atlas=R.look.skins[id]||'heroes';return `background-image:url('assets/art/${atlas}.webp');background-size:400% 300%;background-position:${(i%4)/3*100}% ${Math.floor(i/4)/2*100}%`;};
function hit(id,x,y,w,h,data={}){R.hits.push({id,x,y,w,h,...data});}
R.hit=(x,y)=>[...R.hits].reverse().find(h=>{if(h.angle!=null){const dx=x-h.cx,dy=y-h.cy,co=Math.cos(-h.angle),si=Math.sin(-h.angle),xx=dx*co-dy*si,yy=dx*si+dy*co;return Math.abs(xx)<=h.w/2&&Math.abs(yy)<=h.h/2;}return x>=h.x&&x<=h.x+h.w&&y>=h.y&&y<=h.y+h.h;});
function button(c,text,x,y,w,h,active,id){c.save();if(active){c.shadowColor='#ffc44b';c.shadowBlur=12;}round(c,x,y,w,h,12,grad(c,x,y,0,h,active?'#b48534':'#3c4647',active?'#f4d47c':'#667270'),active?'#63451e':'#303839',5);c.shadowBlur=0;round(c,x+6,y+6,w-12,h-12,8,null,'#ffffff45',1);txt(c,text,x+w/2,y+h/2,19,active?'#2a2016':'#c8cfcb','center',w-14);c.restore();hit(id,x,y,w,h);}
function powerIcon(c,id,x,y){c.save();c.translate(x,y);c.strokeStyle='#f2d99b';c.fillStyle='#f2d99b';c.lineWidth=3;c.lineCap='round';c.lineJoin='round';c.beginPath();
if(id==='leonidas'){c.moveTo(-16,-18);c.lineTo(16,-18);c.lineTo(16,2);c.quadraticCurveTo(13,18,0,24);c.quadraticCurveTo(-13,18,-16,2);c.closePath();c.stroke();c.beginPath();c.moveTo(-7,8);c.lineTo(0,-8);c.lineTo(7,8);}
else if(id==='imhotep'){c.ellipse(0,-12,8,11,0,0,Math.PI*2);c.moveTo(0,0);c.lineTo(0,24);c.moveTo(-14,6);c.lineTo(14,6);}
else if(id==='dandolo'||id==='musashi'){c.moveTo(-15,21);c.lineTo(16,-21);c.lineTo(13,-4);c.moveTo(-16,7);c.lineTo(-2,16);if(id==='musashi'){c.moveTo(15,21);c.lineTo(-16,-21);c.moveTo(16,7);c.lineTo(2,16);}}
else if(id==='khan'){c.moveTo(-8,-22);c.quadraticCurveTo(26,0,-8,22);c.lineTo(-8,-22);c.moveTo(-20,0);c.lineTo(22,0);c.lineTo(13,-7);c.moveTo(22,0);c.lineTo(13,7);}
else if(id==='jeanne'){c.moveTo(-12,24);c.lineTo(-12,-24);c.lineTo(20,-19);c.lineTo(13,-6);c.lineTo(-12,-10);}
else if(id==='ragnar'){c.moveTo(0,25);c.lineTo(0,-25);c.moveTo(-17,-16);c.lineTo(0,0);c.lineTo(17,-16);c.moveTo(-17,4);c.lineTo(0,20);c.lineTo(17,4);}
else if(id==='nostradamus'){c.moveTo(-25,0);c.quadraticCurveTo(0,-28,25,0);c.quadraticCurveTo(0,28,-25,0);c.moveTo(8,0);c.arc(0,0,8,0,Math.PI*2);}
else if(!D.heroById[id]?.art){c.font='bold 34px serif';c.textAlign='center';c.textBaseline='middle';c.fillText(D.heroById[id].icon,0,2);}
else{for(let i=0;i<8;i++){const a=i*Math.PI/4,r=i%2?8:25;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();c.fill();}c.stroke();c.restore();}
// The power shares a metal mounting with the portrait; no separate name plates.
function portrait(c,s,p,x,y){
 const hitStart=R.hits.length,scale=L.heroScale(p),a=s.players[p],hero=D.heroes.find(h=>h.id===a.hero),idx=D.heroes.indexOf(hero);
 const ready=s.active===p&&!a.attacked&&E.heroAttack(a)>0&&s.phase==='play';
 c.save();c.translate(x,y);c.scale(scale,scale);c.translate(-x,-y);
 const powerX=x+L.powerOffset.x,powerY=y+L.powerOffset.y;
 // Cast shadow, broad bronze socket and inset bevel give the assembly depth.
 c.save();c.shadowColor='#160e09bb';c.shadowBlur=16;c.shadowOffsetY=7;
 round(c,x+41,y-15,94,66,21,grad(c,x+41,y-15,94,66,'#453324','#c4a068'),'#35271b',4);
 ellipse(c,x,y,69,82,'#3d2a1b','#392718',5);c.restore();
 round(c,x+49,y-8,73,52,15,null,'#f1d39c',2);
 for(const yy of [y-5,y+40])ellipse(c,x+76,yy,3,3,'#e5c791','#57432d',1.5);
 if(ready){c.shadowColor='#70ff63';c.shadowBlur=20;}
 ellipse(c,x,y,65,78,'#322719',grad(c,x-60,y-75,125,150,'#735025','#f7d594'),9);c.shadowBlur=0;
 c.save();c.beginPath();c.ellipse(x,y-1,58,70,0,0,Math.PI*2);c.clip();R.tile(c,hero.art&&(p===0&&R.look.skins[hero.id]||hero.art),idx,x-67,y-70,134,140,hero);
 const relief=c.createLinearGradient(x-50,y-70,x+50,y+70);relief.addColorStop(0,'#fff1b822');relief.addColorStop(.4,'#00000000');relief.addColorStop(1,'#160b0a5c');c.fillStyle=relief;c.fillRect(x-65,y-78,130,156);c.restore();
 ellipse(c,x,y,58,71,null,'#ead397',2);
 for(const xx of [x-62,x+62])ellipse(c,xx,y,2.5,3.5,'#e9c885','#604227',1);
 heart(c,x+47,y+56,23,a.health);
 if(a.armor){round(c,x-66,y-51,42,46,13,grad(c,x-70,y-50,40,40,'#798c96','#d6e5ea'),'#343f47',3);number(c,a.armor,x-45,y-28,24);}
 if(E.heroAttack(a)){ellipse(c,x-46,y+51,23,23,'#e2bc55','#554521',3);number(c,E.heroAttack(a),x-46,y+51,29);}
 if(a.weapon){ellipse(c,x-117,y+17,34,42,'#383630','#a69a74',3);txt(c,'⚔',x-117,y+8,28);txt(c,a.weapon.attack+' / '+a.weapon.durability,x-117,y+37,17,'#e5c478');}
 hit('h'+p,x-65,y-78,130,157,{kind:'target'});R.positions['h'+p]={x,y};
 const can=E.canPower(s,p);if(can){c.shadowColor='#69ff64';c.shadowBlur=16;}
 ellipse(c,powerX,powerY,39,42,grad(c,powerX-40,powerY-40,80,80,'#423522',hero.color),'#b79557',6);c.shadowBlur=0;
 ellipse(c,powerX,powerY,34,37,null,'#f0d69a88',1.5);powerIcon(c,hero.id,powerX,powerY);
 gem(c,powerX-9,powerY-39,16,'#347ac2',hero.cost);
 if(a.powerUsed){ellipse(c,powerX,powerY,36,39,'#0f121ba0');txt(c,'✓',powerX,powerY,28,'#aa9d87');}
 // Adjacent hit regions keep the portrait and its dock individually operable.
 hit('power'+p,powerX-34,powerY-55,78,101,{kind:'power'});
 c.restore();for(const h of R.hits.slice(hitStart)){h.x=x+(h.x-x)*scale;h.y=y+(h.y-y)*scale;h.w*=scale;h.h*=scale;}
 R.positions['power'+p]=L.powerPosition(p,x,y);
}
// Starre: hoarfrost over the plaque and a snowflake on top.
function frost(c){c.save();const g=c.createRadialGradient(0,0,20,0,0,80);g.addColorStop(0,'#d6f1ff38');g.addColorStop(1,'#e9f8ffb0');round(c,-47,-64,94,128,7,g,'#eefaff',3);c.strokeStyle='#ffffffb0';c.lineWidth=1.4;
 for(const [x,y,a] of [[-40,-56,.6],[40,-56,2.5],[-40,50,-.6],[40,50,-2.5]]){c.beginPath();for(let i=0;i<3;i++){const r=10+i*4,an=a+(i-1)*.45;c.moveTo(x,y);c.lineTo(x+Math.cos(an)*r,y+Math.sin(an)*r);}c.stroke();}
 ellipse(c,-31,-46,13,13,'#1d3a52d0','#eaf8ff',1.5);c.font='19px Body,serif';c.textAlign='center';c.textBaseline='middle';c.fillStyle='#eaf8ff';c.fillText('❄',-31,-45);c.restore();}
function tauntFrame(c){
 c.beginPath();c.moveTo(-60,-73);c.lineTo(-34,-73);c.lineTo(-25,-79);c.lineTo(25,-79);c.lineTo(34,-73);c.lineTo(60,-73);c.lineTo(60,47);c.quadraticCurveTo(57,65,0,83);c.quadraticCurveTo(-57,65,-60,47);c.closePath();
 c.strokeStyle='#352a20';c.lineWidth=12;c.stroke();c.strokeStyle=grad(c,-60,-78,120,160,'#755134','#e5c48b');c.lineWidth=8;c.stroke();
 for(const xx of [-59,59])for(const yy of [-65,30])ellipse(c,xx,yy,2.5,2.5,'#ffdf9d','#60442d',1);
}
function tauntCrest(c){
 c.save();c.shadowColor='#20160dcc';c.shadowBlur=4;c.shadowOffsetY=2;
 c.beginPath();c.moveTo(-18,-83);c.lineTo(18,-83);c.lineTo(17,-64);c.quadraticCurveTo(14,-52,0,-46);c.quadraticCurveTo(-14,-52,-17,-64);c.closePath();
 c.fillStyle=grad(c,-18,-83,36,37,'#594536','#c29b60');c.fill();c.strokeStyle='#f4d494';c.lineWidth=3;c.stroke();c.shadowBlur=0;
 c.beginPath();c.moveTo(0,-76);c.lineTo(0,-55);c.moveTo(-10,-70);c.lineTo(10,-70);c.strokeStyle='#fce5b4';c.lineWidth=3;c.stroke();c.restore();
}
function manaColumn(c,a){
 const {x,y,w,h}=L.mana,cx=x+w/2;
 c.save();c.shadowColor='#21170abb';c.shadowBlur=14;c.shadowOffsetY=5;
 round(c,x,y,w,h,25,grad(c,x,y,w,0,'#4c3a28','#b38f54'),'#3b2d20',3);c.shadowBlur=0;c.shadowOffsetY=0;
 round(c,x+6,y+6,w-12,h-12,20,'#192b34','#e3c080',2);
 round(c,cx-18,y+72,36,279,13,grad(c,cx-18,y+72,36,0,'#10232f','#385360'),'#6a7060',1);
 txt(c,'MANA',cx,y+25,13,'#d7bd82');txt(c,a.mana+' / '+a.maxMana,cx,y+51,23,'#edf8ff');
 for(let i=0;i<10;i++){const yy=y+333-i*27;c.save();c.globalAlpha=i<a.maxMana?1:.25;
  const locked=i>=a.maxMana-(a.locked||0)&&i<a.maxMana;if(i<a.mana){c.shadowColor='#42b7ff';c.shadowBlur=8;}gem(c,cx,yy,10.5,i<a.mana?'#258eea':locked?'#a3483a':'#415361');c.restore();}
 if(a.locked)txt(c,'−'+a.locked+' Belastung',cx,y+66,11,'#f2a58f');if(a.overload)txt(c,'Folgezug −'+a.overload,cx,y+h-40,11,'#f2a58f');
 for(const xx of [x+16,x+w-16])for(const yy of [y+16,y+h-16])ellipse(c,xx,yy,2.5,2.5,'#ecd398','#453522',1);
 txt(c,'◆',cx,y+h-22,15,'#ba985e');c.restore();
}
// Square chronicle images reuse the exact in-match artwork and ability glyphs.
R.logIcons={};R.logIcon=(kind,id)=>{const key=kind+':'+id;if(!R.logIcons[key]){
 const el=document.createElement('canvas');el.width=el.height=96;const c=el.getContext('2d');
 if(kind==='card'){const card=D.byId[id];R.tile(c,card.art,card.cell,0,0,96,96,card);}
 else if(kind==='hero'){const hero=D.heroes.find(h=>h.id===id);R.tile(c,hero.art,hero.cell,0,0,96,96,hero);}
 else if(kind==='power'){const hero=D.heroes.find(h=>h.id===id);c.fillStyle=grad(c,0,0,96,96,'#292723',hero.color);c.fillRect(0,0,96,96);c.save();c.translate(48,48);c.scale(1.4,1.4);powerIcon(c,id,0,0);c.restore();}
 else{c.fillStyle='#26383d';c.fillRect(0,0,96,96);txt(c,'✦',48,48,48,'#d6b577');}
 R.logIcons[key]=el.toDataURL('image/png');}return R.logIcons[key];};
// Upright 3:4 relief plaques. Status cues retain their existing meanings.
function minion(c,s,p,u,x,y,selected,targets){
 c.save();c.shadowColor='#301b12aa';c.shadowBlur=13;
 ellipse(c,x,y+69*L.minionScale,47*L.minionScale,8,'#38271939');c.restore();
 c.save();c.translate(x,y);c.scale(L.minionScale,L.minionScale);
 const card=D.byId[u.id],ready=p===s.active&&E.canAttack(u)&&s.phase==='play',legend=card.rarity==='legendary',building=!!u.building;
 if(ready||selected){c.shadowColor=selected?'#ffda67':'#76ff4d';c.shadowBlur=20;}
 round(c,-51,-68,102,136,9,grad(c,-51,-68,102,136,'#292824',building?'#a9a397':legend?'#b38c4e':'#79654e'),'#28231f',3);
 c.shadowBlur=0;
 round(c,-47,-64,94,128,7,null,legend?'#e1bd74':'#b59b75',1.5);
 round(c,-44,-61,88,119,5,'#25221d','#1a1816',2);
 c.save();c.beginPath();c.roundRect(-43,-60,86,116,4);c.clip();
 R.tile(c,card.art,card.cell,-56,-60,112,116,card);c.restore();
 if(u.stealth){round(c,-43,-60,86,116,4,'#0c120ec0');c.save();c.globalAlpha=.5;for(const [xx,yy,r] of [[-26,-30,22],[24,-8,26],[-10,30,24]]){ellipse(c,xx,yy,r,r*.55,'#1f2b1d');}c.restore();}
 if(u.silenced)round(c,-43,-60,86,116,4,'#a8a29a66');
 // Raised corner rivets and a dark inner bevel keep the artwork dominant.
 for(const xx of [-47,47])for(const yy of [-64,64])ellipse(c,xx,yy,1.8,1.8,'#dac499');
 round(c,-43,-60,86,116,4,null,'#201b18aa',2);
 if(u.taunt)tauntFrame(c);
 if(card.rarity!=='basic'&&card.rarity!=='token')gem(c,0,61,legend?8:6,rarityColor[card.rarity]);
 if(u.shield){c.shadowColor='#ffdb73';c.shadowBlur=12;round(c,-56,-73,112,146,12,null,'#fff3b3',3);c.shadowBlur=0;round(c,-56,-73,112,146,12,'#fff19a24');}
 if(u.frozen)frost(c);
 if(u.taunt)tauntCrest(c);
 if(building){// Bauwerk: no attack, durability on a stone tower badge.
  round(c,-24,41,48,34,8,grad(c,-24,41,48,34,'#6f6a62','#cfc8ba'),'#3a3631',2.5);txt(c,'♜',-11,58,17,'#3a3631');number(c,u.health,9,59,24);}
 else{round(c,-56,43,39,32,8,grad(c,-56,43,39,32,'#b8a479','#fff0c7'),'#53432d',2.5);
  c.font='bold 26px Title';c.textAlign='center';c.textBaseline='middle';c.fillStyle='#30251a';c.fillText(u.attack,-36.5,60);
  round(c,17,43,39,32,8,grad(c,17,43,39,32,'#581722','#b52e40'),'#34171c',2.5);number(c,u.health,36.5,60,25);}
 if(!u.ready&&u.attacks===0&&!building)txt(c,'z',34,-50,22,'#346f29');
 // Keyword marks between the stats: Vermächtnis, effect at turn end, Vorstoß, Doppelschlag, Arkaner Fokus.
 // 1.8.0: ◐ Tarnung, ♥ Plünderung, ⚗ Tödliches Gift, ⊘ Bannung (the card's own marks are gone).
 const own=!u.silenced;const marks=[own&&card.death&&['☠','#e6d6b3'],own&&(card.passive||card.start||card.end||card.onHeal||card.allyHeal)&&['✦','#d8c9fa'],u.rush&&['➤','#ffd27a'],u.double&&['⚔','#ffe3b0'],own&&card.focus&&['✧'+card.focus,'#a9dcff'],u.stealth&&['◐','#b9d3a8'],u.plunder&&['♥','#ff8f7a'],u.poison&&['⚗','#9cf07a'],u.silenced&&['⊘','#d5d0c8']].filter(Boolean);
 if(!building&&marks.length){const w=marks.reduce((n,[g])=>n+(g.length>1?24:17),6);round(c,-w/2,22,w,22,10,'#1d1712d9','#c9a96a',1.2);let xx=-w/2+3;
  for(const [g,col] of marks){const gw=g.length>1?24:17;txt(c,g,xx+gw/2,33,g.length>1?13:15,col);xx+=gw;}}
 if(targets.includes(u.uid))round(c,-59,-76,118,154,13,null,'#db403d',3);
 R.positions[u.uid]={x,y};c.restore();
 hit(u.uid,x-57*L.minionScale,y-72*L.minionScale,114*L.minionScale,146*L.minionScale,{kind:'target',idCard:u.id});
}
R.draw=(c,s,view,now)=>{const dt=Math.min(40,now-(R.lastTime||now-16));R.lastTime=now;R.hits=[];R.positions={};c.clearRect(0,0,1600,800);c.save();const shake=CHM.shake(now);c.translate(shake.x,shake.y);const field=R.images[R.look.board]||R.images.board;if(field)c.drawImage(field,0,0,1600,800);else{c.fillStyle='#765d3e';c.fillRect(0,0,1600,800);}const shade=c.createRadialGradient(800,365,210,800,365,880);shade.addColorStop(0,'#3d230a00');shade.addColorStop(1,'#23150e45');c.fillStyle=shade;c.fillRect(0,0,1600,800);
// Calm combat surface and a fine central seam preserve legibility over the illustration.
c.strokeStyle='#71563540';c.lineWidth=2;c.beginPath();c.moveTo(222,354);c.quadraticCurveTo(800,368,1370,354);c.stroke();
const a=s.players[0],b=s.players[1],targets=view.targets||[];hit('decor0',1485,0,112,145,{kind:'decor'});hit('decor1',0,0,110,142,{kind:'decor'});hit('decor2',0,710,120,90,{kind:'decor'});hit('decor3',1490,710,110,90,{kind:'decor'});
const insert=view.insertIndex??CHM.insertion();
for(let p=0;p<2;p++){const yy=L.rows[p],board=s.players[p].board,hasGap=p===0&&insert!=null&&board.length<7;if(view.drag?.cardId&&p===0)for(let i=0;i<7;i++)ellipse(c,L.center+(i-3)*L.spacing,yy,56,76,'#49331a05','#67502e22',1);
 if(hasGap){const xx=L.center+(insert-board.length/2)*L.spacing;c.save();c.shadowColor='#aaf36a';c.shadowBlur=24;ellipse(c,xx,yy,60,78,'#91d55629','#d3ed9b',2);c.restore();txt(c,'↓',xx,yy,30,'#efffd3');}
 board.forEach((u,i)=>{const index=i+(hasGap&&i>=insert?1:0),base=R.smooth(u.uid,L.center+(index-(board.length-1+(hasGap?1:0))/2)*L.spacing,yy,dt),pos=CHM.pose(u.uid,base,now);c.save();c.translate(pos.x,pos.y);c.rotate(pos.angle);c.scale(pos.scale,pos.scale);c.translate(-pos.x,-pos.y);minion(c,s,p,u,pos.x,pos.y,view.selected&&view.selected.uid===u.uid,targets);c.restore();});}
// Rival's fanned hand.
for(let i=0;i<b.hand.length;i++){c.save();c.translate(490+i*34,7);c.rotate((i-(b.hand.length-1)/2)*.033);round(c,-24,-50,48,72,5,grad(c,0,0,40,70,'#16334d','#4c6f87'),'#c7a759',3);txt(c,'✦',0,-10,25,'#e7c675');c.restore();}
for(let p=0;p<2;p++){const pp=s.players[p],yy=p===0?590:158;CHS.deck(c,p===0?R.look.back:'chroniken',1421,yy,55,83,Math.min(5,Math.ceil(pp.deck.length/6)),now,p*2300);txt(c,pp.deck.length,1451,yy+103,19,'#f2dfaf');hit('deck'+p,1411,yy-10,80,125,{kind:'deck'});round(c,1510,yy+35,64,53,8,'#2c2925bb','#907750',2);txt(c,'☠ '+pp.grave.length,1542,yy+61,21,'#d9c99f');hit('grave'+p,1500,yy+25,89,77,{kind:'grave'});}
button(c,s.active===0?'ZUG BEENDEN':'GEGNERZUG',1402,342,172,64,s.active===0&&s.phase==='play','end');txt(c,'ZUG '+Math.max(1,s.turn),1488,426,14,'#ddc99d');
// The resource pillar leaves the hero's lower center completely clear.
manaColumn(c,a);txt(c,b.mana+' / '+b.maxMana+' Mana'+(b.locked?' (−'+b.locked+')':''),1036,62,16,'#eedcaf');
let hand=a.hand;if(view.drag?.cardId&&view.handIndex!=null){hand=[...hand];const i=hand.findIndex(h=>h.uid===view.drag.uid);if(i>=0)hand.splice(view.handIndex,0,hand.splice(i,1)[0]);}
const handState=hand===a.hand?s:{...s,players:[{...a,hand},b]};
// Selected cards draw last within the hand, above both resting fans.
[...hand].sort((a,b)=>Number(a.uid===view.selected?.uid)-Number(b.uid===view.selected?.uid)).forEach(h=>{if(view.drag?.uid===h.uid||CHM.hiddenHand(h.uid))return;const selected=view.selected?.uid===h.uid,rest=CHM.handPose(handState,h.uid),pose=selected?L.raisedHandPose(rest):rest,pos=R.smooth(h.uid,pose.x,pose.y,dt);const card=D.byId[h.id],cost=E.cost(s,0,h),can=s.active===0&&s.phase==='play'&&!s.choice&&cost<=a.mana&&(card.type==='spell'||a.board.length<7);c.save();c.translate(pos.x,pos.y);c.rotate(pose.angle);R.fastCard(c,card,-L.handWidth/2,-L.handWidth*1.41/2,L.handWidth,L.handWidth*1.41,{glow:can,selected,cost});c.restore();hit(h.uid,pos.x-L.handWidth/2,pos.y-L.handWidth*1.41/2,L.handWidth,L.handWidth*1.41,{kind:'hand',idCard:h.id,cx:pos.x,cy:pos.y,angle:pose.angle});R.positions[h.uid]={...pos,w:L.handWidth,angle:pose.angle};});
const ownHero=CHM.pose('h0',{x:L.center,y:L.heroY[0]},now);R.positions.h0=ownHero;R.positions.power0=L.powerPosition(0,ownHero.x,ownHero.y);
const rivalHero=CHM.pose('h1',{x:L.center,y:L.heroY[1]},now);portrait(c,s,1,rivalHero.x,rivalHero.y);
for(const id of targets.filter(x=>x==='h1')){const pos=R.positions[id];ellipse(c,pos.x,pos.y,74*L.heroScale(1),86*L.heroScale(1),null,'#f5473b',4);}
// The chronicle is available on demand; combat gets the entire center.
if(!view.selected)button(c,'CHRONIK',25,586,165,45,false,'chronicle');
if(!view.drag&&view.selected&&view.selected.type==='play'&&!E.targetKind(s,0,view.selected))button(c,'AUSSPIELEN',25,586,184,57,true,'confirm');
button(c,'Ⅱ',124,27,60,56,false,'pause');button(c,'?',194,27,60,56,false,'help');txt(c,s.mode==='campaign'?'MISSION '+(s.mission+1):s.mode==='random'?'KOLOSSEUM':s.mode==='daily'?'TAGESDUELL':'SCHLACHT',368,55,13,'#f3dab0');
CHM.overlay(c,s,now);
if(view.drag&&view.selected){const d=view.drag,needsArrow=view.selected.type==='attack'||(view.selected.type==='power'&&E.targetKind(s,0,view.selected))||(d.cardId&&E.targetKind(s,0,view.selected));
 if(d.cardId){const {x,y,w}=L.dragPose(d,now);d.x=x;d.y=y;d.w=w;CHM.floatCard(c,d.cardId,x,y,w,d.angle);}
 if(needsArrow){const start=d.cardId?{x:d.x,y:d.y-82}:R.positions[view.selected.uid]||R.positions.power0;const end=d.target?R.positions[d.target]:{x:d.pointerX,y:d.pointerY};if(start&&end){c.save();c.strokeStyle=d.target?'#ffdc8a':'#d9332f';c.lineWidth=d.target?7:6;c.shadowColor='#412115';c.shadowBlur=8;c.setLineDash(d.target?[]:[14,7]);c.beginPath();c.moveTo(start.x,start.y);c.quadraticCurveTo((start.x+end.x)/2,start.y-90,end.x,end.y);c.stroke();c.setLineDash([]);const angle=Math.atan2(end.y-start.y+90,(end.x-start.x)/2);c.translate(end.x,end.y);c.rotate(angle);c.beginPath();c.moveTo(0,0);c.lineTo(-26,-14);c.lineTo(-20,0);c.lineTo(-26,14);c.closePath();c.fillStyle=d.target?'#ffdb84':'#ed4940';c.fill();c.restore();if(d.target){ellipse(c,end.x,end.y,60,76,null,'#fff0b4',3);}}}
}
// Own portrait, frame, armor, health and power always stay above card flights/drags.
portrait(c,s,0,ownHero.x,ownHero.y);
if(targets.includes('h0'))ellipse(c,ownHero.x,ownHero.y,74*L.heroScale(0),86*L.heroScale(0),null,'#f5473b',4);
R.fx=R.fx.filter(f=>now-f.start<f.life);for(const f of R.fx){const q=(now-f.start)/f.life;if(f.type==='damage'||f.type==='heal'){c.save();c.globalAlpha=1-q;number(c,(f.type==='heal'?'+':'−')+f.n,f.x,f.y-q*60,40);c.restore();}else if(['death','buff','shield','freeze','steal'].includes(f.type)){for(let i=0;i<14;i++){const ang=i*2.4,r=q*(f.type==='death'?110:65);c.globalAlpha=1-q;ellipse(c,f.x+Math.cos(ang)*r,f.y+Math.sin(ang)*r,4*(1-q)+1,4*(1-q)+1,f.type==='death'?'#d9b986':f.type==='freeze'?'#e8f8ff':f.type==='steal'?'#f0c463':'#a2e6ee');}c.globalAlpha=1;}else if(f.type==='impact'){c.save();c.globalAlpha=1-q;c.globalCompositeOperation='screen';ellipse(c,f.x,f.y,18+q*54,12+q*37,null,'#ffe7b0',4*(1-q)+1);for(let i=0;i<9;i++){const an=i*2.399+f.x,rad=12+q*86;c.strokeStyle=i%2?'#fff5d7':'#ffb449';c.lineWidth=3*(1-q)+.5;c.beginPath();c.moveTo(f.x+Math.cos(an)*rad*.55,f.y+Math.sin(an)*rad*.55);c.lineTo(f.x+Math.cos(an)*rad,f.y+Math.sin(an)*rad);c.stroke();}c.restore();}}
c.restore();
};
R.events=(events,settings)=>{const played=new Set();for(const ev of events){const pos=R.positions[ev.target]||R.positions['h'+(ev.p||0)]||{x:800,y:400};if(settings.particles!==false&&['damage','heal','death','buff','shield','freeze','steal'].includes(ev.type))R.fx.push({...ev,x:pos.x,y:pos.y,start:performance.now(),life:ev.type==='death'?660:750});if(ev.type==='attack'||ev.type==='damage'){if(settings.particles!==false)R.fx.push({type:'impact',x:pos.x,y:pos.y,start:performance.now(),life:280});}
 const sound={attack:'clash',damage:'hit',heal:'heal',death:ev.building?'slam':'destroy',shield:'armor',power:'power',play:ev.spell?'fire':'land',draw:'draw',weapon:'sword',turn:'gong',armor:'armor',freeze:'channel',steal:'power',discover:'draw',echo:'fire',choice:'pack'}[ev.type];if(sound&&!played.has(sound)){CHA.play(sound,{x:pos.x,gain:ev.type==='damage'&&events.some(e=>e.type==='attack')?.55:1});played.add(sound);}}
};
})();
