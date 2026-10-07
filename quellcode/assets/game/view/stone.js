/* Stone presentation kit: transition slabs, relief card backs and the deck gloss. The main menu lives in hall.js. No game state. */
(function(){'use strict';
const S=window.CHS={};
const rng=seed=>()=>{seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
const INK='#211c17';

// ---------- Light cartoon stone for the transition slabs (SVG) ----------
// Flat, high-key stone: one face colour, a bright top band, a darker lower band and a heavy ink line.
const ST={hi:'#fffaf0',face:'#ece5d6',mid:'#ddd3c0',low:'#c3b7a0',deep:'#9f9179',crack:'#7b6d5b',moss:'#88a954',mossInk:'#4f6c2b'};
const FACES=['#eee8da','#e7dfcd','#f1ebdf','#e3dac7'],WALLS=['#d1c5ae','#cabda4','#d6cbb6','#c6b99f'];
const f1=n=>n.toFixed(1);
function tufts(r,x,y,w,n){let o='';for(let i=0;i<n;i++){const cx=x+w*(.1+r()*.8);for(let k=0;k<3+Math.floor(r()*3);k++){const rx=2.5+r()*3.5;o+=`<ellipse cx="${f1(cx+(r()-.5)*15)}" cy="${f1(y-r()*4)}" rx="${f1(rx*1.3)}" ry="${f1(rx)}" fill="${ST.moss}" stroke="${ST.mossInk}" stroke-width="1.2"/>`;}}return o;}
function crackPath(r,x,y,w,h){let px=x+w*(.2+r()*.6),py=y+2,d=`M${f1(px)} ${f1(py)}`;for(let s=0;s<3;s++){px+=(r()-.5)*w*.18;py+=h*(.12+r()*.14);d+=` L${f1(px)} ${f1(py)}`;}
 return `<path d="${d}" fill="none" stroke="${ST.hi}" stroke-width="1.6" transform="translate(1.4 1.4)" opacity=".8"/><path d="${d}" fill="none" stroke="${ST.crack}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;}
// A cartoon block: base, light top band, shaded lower band, speckles, an occasional chip, crack or moss.
function cBlock(x,y,w,h,r,{tone,wall=false,rx=12,moss=0,plain=false}={}){const ink=wall?'stroke="#3a3027" stroke-opacity=".5" stroke-width="3"':'stroke="#3a3027" stroke-width="4"';tone=tone||(wall?WALLS:FACES)[Math.floor(r()*4)];
 let o=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${rx}" fill="${tone}" ${ink}/>`;
 o+=`<rect x="${f1(x+7)}" y="${f1(y+6)}" width="${f1(w-14)}" height="${f1(Math.min(15,h*.2))}" rx="6" fill="${ST.hi}" opacity="${wall?.45:.75}"/>`;
 o+=`<rect x="${f1(x+8)}" y="${f1(y+h-13)}" width="${f1(w-16)}" height="7" rx="3.5" fill="${ST.low}" opacity="${wall?.5:.8}"/>`;
 if(plain)return o;
 for(let i=0;i<4;i++)o+=`<circle cx="${f1(x+14+r()*(w-28))}" cy="${f1(y+20+r()*(h-36))}" r="${f1(1.4+r()*2)}" fill="${ST.deep}" opacity=".35"/>`;
 if(r()<.45){const cx=r()<.5?x:x+w,cy=r()<.5?y:y+h,sx=cx===x?1:-1,sy=cy===y?1:-1,s=8+r()*8;o+=`<path d="M${f1(cx)} ${f1(cy+sy*s)} L${f1(cx+sx*s*.6)} ${f1(cy+sy*s*.6)} L${f1(cx+sx*s)} ${f1(cy)}" fill="${ST.low}" stroke="#3a3027" stroke-width="${wall?2:2.6}" stroke-linejoin="round" ${wall?'stroke-opacity=".5"':''}/>`;}
 if(r()<(wall?.35:.3))o+=crackPath(r,x,y,w,h);
 if(moss)o+=tufts(r,x,y+h,w,moss);return o;}
// Wall art for the transition slabs; the seam edge carries half a bronze seal each.
S.slabArt=dir=>{const r=rng(dir==='l'?11:12);let o='';[[-20,190],[170,210],[380,200],[580,260]].forEach(([y,h],k)=>{let x=-(k%2?120:30)-r()*40;while(x<840){const w=220+r()*170;o+=cBlock(x,y,w,h,r,{moss:r()<.3?1:0});x+=w;}});
 return `<svg viewBox="0 0 812 824" width="812" height="824" preserveAspectRatio="none" aria-hidden="true">${o}</svg>`;};

// ---------- Card backs (canvas, 200 × 282 design space) ----------
function rr(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r);}
function lin(c,x0,y0,x1,y1,stops){const g=c.createLinearGradient(x0,y0,x1,y1);stops.forEach((s,i)=>g.addColorStop(i/(stops.length-1),s));return g;}
function rad(c,x,y,r0,r1,stops){const g=c.createRadialGradient(x,y,r0,x,y,r1);stops.forEach((s,i)=>g.addColorStop(i/(stops.length-1),s));return g;}
// Raised relief: light catches the upper left edge, shadow falls lower right.
function relief(c,draw,{fill,stroke,lw=2,d=1.3,light='#fff6dc80',dark='#0000008c'}){
 for(const [o,col] of [[-d,light],[d,dark]]){c.save();c.translate(o,o);draw();if(fill){c.fillStyle=col;c.fill();}if(stroke){c.strokeStyle=col;c.lineWidth=lw;c.stroke();}c.restore();}
 draw();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke();}}
function star4(c,x,y,r,k=.24){c.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/2,q=i%2?r*k:r;c.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q);}c.closePath();}
function speckle(c,r,n,colors,size=1.2){for(let i=0;i<n;i++){c.fillStyle=colors[i%colors.length];c.fillRect(12+r()*176,12+r()*258,size*(.5+r()),size*(.5+r()));}}
function fleur(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();
 c.moveTo(0,-30);c.bezierCurveTo(9,-20,9,-8,2,2);c.lineTo(-2,2);c.bezierCurveTo(-9,-8,-9,-20,0,-30);
 c.moveTo(-3,0);c.bezierCurveTo(-14,-14,-30,-6,-24,6);c.bezierCurveTo(-20,13,-11,9,-10,3);c.bezierCurveTo(-13,4,-15,1,-13,-2);c.bezierCurveTo(-10,-5,-6,-2,-3,4);
 c.moveTo(3,0);c.bezierCurveTo(14,-14,30,-6,24,6);c.bezierCurveTo(20,13,11,9,10,3);c.bezierCurveTo(13,4,15,1,13,-2);c.bezierCurveTo(10,-5,6,-2,3,4);
 c.rect(-13,5,26,5);c.moveTo(-5,11);c.lineTo(5,11);c.lineTo(3,24);c.quadraticCurveTo(0,30,-3,24);c.closePath();c.restore();}
const RUNES=[[[0,-9,0,9],[0,-9,6,-4],[0,-2,6,-7]],[[0,-9,0,9],[0,-9,6,-3],[6,-3,6,9]],[[0,-9,0,9],[0,-5,5,0],[5,0,0,5]],[[0,-9,0,9],[-5,-4,5,4]],[[-5,-9,5,9],[5,-9,-5,9]],[[0,-9,0,9],[0,-9,-5,-4],[0,-9,5,-4]],[[-4,-9,4,0],[4,0,-4,9]],[[0,-9,0,9],[0,-3,5,-8],[0,3,5,8]]];
const BACKS={
 chroniken(c,r){c.fillStyle=rad(c,82,100,8,190,['#5c8297','#244a5e','#10222d']);c.fillRect(0,0,200,282);
  c.save();c.globalAlpha=.55;for(let i=-300;i<300;i+=17)relief(c,()=>{c.beginPath();c.moveTo(i,0);c.lineTo(i+282,282);c.moveTo(i+282,0);c.lineTo(i,282);},{stroke:'#ffffff12',lw:1,d:.7,light:'#ffffff14',dark:'#00000033'});c.restore();
  c.save();c.translate(100,141);c.rotate(.38);relief(c,()=>{c.beginPath();c.ellipse(0,0,64,92,0,0,Math.PI*2);},{stroke:'#c9aa6d',lw:3});relief(c,()=>{c.beginPath();c.ellipse(0,0,56,84,0,0,Math.PI*2);},{stroke:'#a88d57',lw:1.2,d:.8});c.restore();
  relief(c,()=>star4(c,100,141,48),{fill:lin(c,60,95,140,190,['#fff0b8','#d8b264','#8f6a2e']),d:2});relief(c,()=>star4(c,100,141,20,.3),{fill:'#fbe7a8',d:1});
  for(const [x,y] of [[40,46],[160,46],[40,236],[160,236]])relief(c,()=>star4(c,x,y,9),{fill:'#d7b56f',d:.9});
  c.font='13px Title,serif';c.textAlign='center';c.letterSpacing='4px';c.fillStyle='#00000080';c.fillText('AETERNA',101,258);c.fillStyle='#e2cf9f';c.fillText('AETERNA',100,257);c.letterSpacing='0px';},
 tempel(c,r){c.fillStyle=lin(c,0,0,200,282,['#b3aa9b','#958c7e','#7a7166']);c.fillRect(0,0,200,282);speckle(c,r,1300,['#00000022','#ffffff26','#4a403522']);
  const key=(x,y,u,dir)=>{c.beginPath();for(let i=0;i<6;i++){const ox=x+i*u*2.5*dir;c.moveTo(ox,y+u*2);c.lineTo(ox,y);c.lineTo(ox+u*2*dir,y);c.lineTo(ox+u*2*dir,y+u*1.4);c.lineTo(ox+u*.8*dir,y+u*1.4);c.lineTo(ox+u*.8*dir,y+u*.7);c.moveTo(ox,y+u*2);c.lineTo(ox+u*2.5*dir,y+u*2);}};
  for(const y of [24,244])relief(c,()=>key(26,y,6,1),{stroke:'#5b5247',lw:2.4,d:1,light:'#fff3dc66',dark:'#00000066'});
  relief(c,()=>{c.beginPath();c.moveTo(56,118);c.lineTo(100,88);c.lineTo(144,118);c.closePath();c.rect(52,122,96,8);for(let i=0;i<4;i++)c.rect(60+i*23,136,10,58);c.rect(50,198,100,9);},{fill:'#8b8274',light:'#00000070',dark:'#fff4de70',d:1.5});
  c.strokeStyle='#3a332b';c.lineWidth=1.6;c.beginPath();c.moveTo(150,12);c.lineTo(142,40);c.lineTo(156,62);c.lineTo(149,84);c.moveTo(30,270);c.lineTo(44,240);c.lineTo(36,222);c.stroke();
  for(const [x,y,n] of [[36,262,7],[150,20,4],[168,262,5],[20,140,3]])for(let i=0;i<n;i++){c.fillStyle=i%3?'#6c8a3a':'#93b05a';c.beginPath();c.ellipse(x+(r()-.5)*22,y+(r()-.5)*10,2+r()*3.5,1.6+r()*2.5,0,0,Math.PI*2);c.fill();}},
 sparta(c,r){c.fillStyle=rad(c,100,141,10,180,['#a8342a','#6e1912','#3d0c08']);c.fillRect(0,0,200,282);
  c.save();c.globalAlpha=.16;c.strokeStyle='#ffd7a8';for(let i=0;i<36;i++){const a=i/36*Math.PI*2;c.beginPath();c.moveTo(100,141);c.lineTo(100+Math.cos(a)*200,141+Math.sin(a)*200);c.stroke();}c.restore();
  relief(c,()=>{c.beginPath();c.arc(100,141,66,0,Math.PI*2);},{fill:lin(c,40,80,160,200,['#f2c97a','#b98a42','#7b5222']),d:2.2});
  relief(c,()=>{c.beginPath();c.arc(100,141,54,0,Math.PI*2);},{stroke:'#6d4719',lw:2,light:'#00000060',dark:'#fff0c860'});
  for(let i=0;i<14;i++){const a=i/14*Math.PI*2;relief(c,()=>{c.beginPath();c.arc(100+Math.cos(a)*60,141+Math.sin(a)*60,2.6,0,Math.PI*2);},{fill:'#f7dc9a',d:.8});}
  relief(c,()=>{c.beginPath();c.moveTo(72,172);c.lineTo(100,106);c.lineTo(128,172);},{stroke:'#7c1d16',lw:12,d:1.4,light:'#00000080',dark:'#ffe9b880'});},
 pharao(c,r){c.fillStyle=lin(c,0,0,0,282,['#2c58b4','#183a80','#0c1d44']);c.fillRect(0,0,200,282);speckle(c,r,160,['#e9c36a','#f7dc8c'],1.5);
  for(const y of [32,250]){relief(c,()=>{c.beginPath();for(let x=16;x<184;x+=14){c.moveTo(x,y+7);c.lineTo(x+7,y-7);c.lineTo(x+14,y+7);}},{stroke:'#e6c063',lw:2.2,d:.9});}
  relief(c,()=>{c.beginPath();c.moveTo(48,138);c.quadraticCurveTo(100,96,152,138);c.quadraticCurveTo(100,170,48,138);c.moveTo(42,112);c.quadraticCurveTo(100,80,158,108);c.moveTo(84,163);c.lineTo(78,204);c.moveTo(112,160);c.quadraticCurveTo(122,196,148,190);c.quadraticCurveTo(160,184,150,172);},{stroke:'#f2cd6a',lw:5.5,d:1.5});
  relief(c,()=>{c.beginPath();c.arc(100,136,15,0,Math.PI*2);},{fill:'#f2cd6a',d:1.2});c.fillStyle='#0c1d44';c.beginPath();c.arc(100,136,6,0,Math.PI*2);c.fill();},
 runen(c,r){c.fillStyle=lin(c,0,0,200,282,['#565c64','#33383f','#1d2126']);c.fillRect(0,0,200,282);speckle(c,r,900,['#ffffff14','#00000030']);
  c.save();c.strokeStyle='#9fd0ff';c.shadowColor='#6fbfff';c.shadowBlur=6;c.lineWidth=1.1;c.globalAlpha=.55;c.beginPath();c.moveTo(20,70);c.lineTo(60,96);c.lineTo(52,130);c.moveTo(180,190);c.lineTo(140,206);c.lineTo(150,236);c.stroke();c.restore();
  const glyph=(g,x,y)=>{c.beginPath();for(const [a,b,e,f] of g){c.moveTo(x+a,y+b);c.lineTo(x+e,y+f);}};
  c.save();c.shadowColor='#7cc6ff';c.shadowBlur=7;for(let i=0;i<8;i++){glyph(RUNES[i],32+i*19.4,30);c.strokeStyle='#bfe3ff';c.lineWidth=2;c.stroke();glyph(RUNES[(i+3)%8],32+i*19.4,252);c.stroke();}c.restore();
  relief(c,()=>{c.beginPath();c.arc(100,141,58,0,Math.PI*2);},{fill:lin(c,50,90,150,190,['#aab3bd','#6c7580','#3d434b']),d:2});
  relief(c,()=>{c.beginPath();c.moveTo(100,85);c.lineTo(100,197);c.moveTo(44,141);c.lineTo(156,141);c.moveTo(60,101);c.lineTo(140,181);c.moveTo(140,101);c.lineTo(60,181);},{stroke:'#454c55',lw:3,light:'#00000066',dark:'#ffffff40'});
  relief(c,()=>{c.beginPath();c.arc(100,141,16,0,Math.PI*2);},{fill:'#c7cfd8',d:1.4});},
 sterne(c,r){c.fillStyle=rad(c,100,120,10,200,['#26357a','#141d4c','#080c22']);c.fillRect(0,0,200,282);
  for(let i=0;i<90;i++){c.fillStyle=i%5?'#ffffffcc':'#f5d27a';c.beginPath();c.arc(14+r()*172,14+r()*254,.5+r()*1.3,0,Math.PI*2);c.fill();}
  c.strokeStyle='#e8c87a66';c.lineWidth=.8;c.beginPath();c.moveTo(30,40);c.lineTo(52,58);c.lineTo(48,84);c.lineTo(70,70);c.moveTo(150,220);c.lineTo(168,238);c.lineTo(146,252);c.stroke();
  for(const rr0 of [62,50])relief(c,()=>{c.beginPath();c.arc(100,141,rr0,0,Math.PI*2);},{stroke:'#e9c56c',lw:rr0===62?5:2.2,d:1.2});
  relief(c,()=>{c.beginPath();for(let i=0;i<36;i++){const a=i/36*Math.PI*2,q=i%3?3:7;c.moveTo(100+Math.cos(a)*62,141+Math.sin(a)*62);c.lineTo(100+Math.cos(a)*(62-q),141+Math.sin(a)*(62-q));}},{stroke:'#c9a24f',lw:1.4,d:.6});
  relief(c,()=>{c.save();c.translate(100,141);c.rotate(-.5);c.beginPath();c.moveTo(-58,0);c.lineTo(58,0);c.moveTo(0,-36);c.quadraticCurveTo(30,-6,0,30);c.quadraticCurveTo(-30,-6,0,-36);c.restore();},{stroke:'#f3d68a',lw:3.2,d:1});
  relief(c,()=>star4(c,100,141,12),{fill:'#fbe6a6',d:1});},
 lilien(c,r){c.fillStyle=lin(c,0,0,200,282,['#3962b8','#24468f','#142a5c']);c.fillRect(0,0,200,282);
  c.save();c.globalAlpha=.32;for(let y=30;y<282;y+=44)for(let x=(y/44%2?22:44);x<200;x+=44)relief(c,()=>fleur(c,x,y,.38),{fill:'#e6c467',d:.6});c.restore();
  relief(c,()=>{c.beginPath();c.moveTo(52,82);c.lineTo(148,82);c.lineTo(148,150);c.quadraticCurveTo(146,190,100,210);c.quadraticCurveTo(54,190,52,150);c.closePath();},{fill:lin(c,52,82,148,210,['#2f5bb4','#1c3b7c']),stroke:'#e2bf62',lw:4,d:1.6});
  relief(c,()=>fleur(c,100,140,1.25),{fill:lin(c,70,100,130,180,['#fff0b5','#e0b752','#9c7428']),d:1.6});},
 zen(c,r){c.fillStyle=lin(c,0,0,200,0,['#191514','#2d2522','#1b1716']);c.fillRect(0,0,200,282);
  c.save();c.globalAlpha=.07;c.fillStyle='#fff';c.fillRect(40,0,22,282);c.fillRect(70,0,6,282);c.restore();
  c.save();c.fillStyle='#b0261e';for(let i=0;i<220;i++){const t=i/220,a=-1.9+t*5.75,w=(1-t)*7+2+Math.sin(t*40)*.6;c.globalAlpha=.85-t*.25;c.beginPath();c.ellipse(100+Math.cos(a)*56,138+Math.sin(a)*56,w,w*.8,a,0,Math.PI*2);c.fill();}c.restore();
  c.save();c.globalAlpha=.6;c.strokeStyle='#7d1912';c.lineWidth=1;c.beginPath();c.arc(100,138,61,-1.8,3.6);c.stroke();c.restore();
  const petal=(x,y,s,rot)=>{c.save();c.translate(x,y);c.rotate(rot);for(let k=0;k<5;k++){c.rotate(Math.PI*2/5);c.beginPath();c.ellipse(0,-5*s,3.2*s,5*s,0,0,Math.PI*2);c.fillStyle='#f2b8c6';c.fill();}c.fillStyle='#d8576f';c.beginPath();c.arc(0,0,1.6*s,0,Math.PI*2);c.fill();c.restore();};
  [[44,58,1.3,.2],[158,96,1,.9],[64,222,1.1,1.6],[150,232,.8,2.4],[132,48,.7,.5]].forEach(p=>petal(...p));
  c.strokeStyle='#c9a45a';c.lineWidth=1.2;rr(c,20,20,160,242,4);c.stroke();}};
const RIMS={chroniken:['#ecd18e','#9a7639'],tempel:['#d4ccbd','#6c655b'],sparta:['#e1b06a','#7d5224'],pharao:['#f6d778','#9b7225'],runen:['#c4ccd4','#565e68'],sterne:['#ecd18e','#8c6a2c'],lilien:['#f1d57f','#9b7428'],zen:['#3a312d','#141110']};
S.paintBack=(c,id,w=200,h=282)=>{const paint=BACKS[id]||BACKS.chroniken,rim=RIMS[id]||RIMS.chroniken,r=rng(id.split('').reduce((n,ch)=>n*31+ch.charCodeAt(0),7));
 c.save();c.scale(w/200,h/282);rr(c,0,0,200,282,15);c.fillStyle=INK;c.fill();
 rr(c,3.5,3.5,193,275,12);c.fillStyle=lin(c,0,0,200,282,[rim[0],rim[1],rim[0],rim[1]]);c.fill();
 rr(c,11,11,178,260,8);c.save();c.clip();paint(c,r);c.restore();
 rr(c,11,11,178,260,8);c.strokeStyle='#00000088';c.lineWidth=2;c.stroke();rr(c,7,7,186,268,10);c.strokeStyle='#ffffff40';c.lineWidth=1;c.stroke();c.restore();};
const cache={},urls={};
S.backCanvas=id=>{if(!cache[id]){const el=document.createElement('canvas');el.width=120;el.height=169;S.paintBack(el.getContext('2d'),id,120,169);cache[id]=el;}return cache[id];};
S.backURL=id=>{if(!urls[id]){const el=document.createElement('canvas');el.width=300;el.height=423;S.paintBack(el.getContext('2d'),id,300,423);urls[id]=el.toDataURL('image/png');}return urls[id];};
// Deck stack on the board: relief backs plus a slow, faint gloss that sweeps the top card.
// The match keeps the stack as a pre-rendered sprite (AP 2.4) and draws only the gloss on every frame.
S.deck=(c,id,x,y,w,h,count,now,phase=0)=>{S.stack(c,id,x,y,w,h,count);S.gloss(c,x,y,w,h,count,now,phase);};
S.stack=(c,id,x,y,w,h,count)=>{const im=S.backCanvas(id);for(let i=0;i<count;i++){c.save();c.shadowColor='#0000006b';c.shadowBlur=4;c.shadowOffsetX=1.5;c.shadowOffsetY=2;c.drawImage(im,x+i*3,y-i*3,w,h);c.restore();}};
S.gloss=(c,x,y,w,h,count,now,phase=0)=>{
 if(!count)return;const tx=x+(count-1)*3,ty=y-(count-1)*3;c.save();c.beginPath();c.roundRect(tx+1,ty+1,w-2,h-2,5);c.clip();
 c.fillStyle=lin(c,tx,ty,tx+w,ty+h,['#ffffff30','#ffffff00','#ffffff00','#00000022']);c.fillRect(tx,ty,w,h);
 const q=((now+phase)%5600)/1100;if(q<1){const bx=tx-30+q*(w+60);c.globalCompositeOperation='screen';c.fillStyle=lin(c,bx-22,ty,bx+22,ty+30,['#fff3d000','#fff3d070','#fff3d000']);c.fillRect(tx,ty,w,h);}c.restore();};
})();
