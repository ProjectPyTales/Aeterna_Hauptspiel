/* Comic-stone presentation kit: hewn slabs, chiselled icons and relief card backs. No game state. */
(function(){'use strict';
const S=window.CHS={};
const rng=seed=>()=>{seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
const INK='#211c17';

// Chiselled glyphs: a bright lower lip under a dark cut.
const ICONS={
 swords:'M15 49 L47 17 M41 12 L52 23 M13 40 L24 51 M49 49 L17 17 M23 12 L12 23 M40 51 L51 40 M11 53 l4 -4 M53 53 l-4 -4',
 banner:'M17 56 V8 M17 11 H48 L41 21 L48 31 H17 M13 56 H23',
 colosseum:'M7 51 H57 M9 51 V24 Q32 11 55 24 V51 M15 51 V41 a4.5 4.5 0 0 1 9 0 V51 M27.5 51 V41 a4.5 4.5 0 0 1 9 0 V51 M40 51 V41 a4.5 4.5 0 0 1 9 0 V51 M14 33 a3.5 3.5 0 0 1 7 0 M28.5 31 a3.5 3.5 0 0 1 7 0 M43 33 a3.5 3.5 0 0 1 7 0 M10 37 H54',
 tablet:'M14 10 H50 V54 H14 Z M21 21 H43 M21 30 H36 M24 43 l5 5 l11 -13',
 coins:'M13 45 a19 6.5 0 0 0 38 0 M13 37 a19 6.5 0 0 0 38 0 M13 29 a19 6.5 0 1 0 38 0 a19 6.5 0 1 0 -38 0 M13 29 V45 M51 29 V45 M32 26 v6',
 book:'M32 18 Q21 11 9 13 V48 Q21 46 32 53 Q43 46 55 48 V13 Q43 11 32 18 Z M32 18 V53 M15 22 Q21 21 26 24 M15 30 Q21 29 26 32 M38 24 Q43 21 49 22',
 cards:'M11 21 L29 14 L40 44 L22 51 Z M29 12 H51 V48 H29 M40 23 l2.5 5 l5.5 .8 l-4 3.8 l1 5.4 l-5 -2.6 l-5 2.6 l1 -5.4 l-4 -3.8 l5.5 -.8 Z',
 gear:(()=>{let d='';for(let i=0;i<8;i++){const a=i/8*Math.PI*2,b=a+Math.PI/8,o=24,n=17;const p=(r,t)=>(32+Math.cos(t)*r).toFixed(1)+' '+(32+Math.sin(t)*r).toFixed(1);d+=(i?' L':'M')+p(n,a-.2)+' L'+p(o,a-.12)+' L'+p(o,a+.12)+' L'+p(n,a+.2)+' L'+p(n,b);}return d+' Z M41 32 a9 9 0 1 0 -18 0 a9 9 0 1 0 18 0';})()};
S.icon=(name,size=52)=>`<svg class="glyph" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true"><path d="${ICONS[name]}" fill="none" stroke="#fff4de" stroke-opacity=".5" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round" transform="translate(1.3 1.7)"/><path d="${ICONS[name]}" fill="none" stroke="#3b332b" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ---------- Light cartoon stone (SVG) ----------
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
const sector=(cx,cy,r1,r2,a0,a1)=>{const p=(rr,a)=>f1(cx+Math.cos(a)*rr)+' '+f1(cy+Math.sin(a)*rr);return `M${p(r2,a0)} A${r2} ${r2} 0 0 1 ${p(r2,a1)} L${p(r1,a1)} A${r1} ${r1} 0 0 0 ${p(r1,a0)} Z`;};
const arc=(cx,cy,rr,a0,a1)=>`M${f1(cx+Math.cos(a0)*rr)} ${f1(cy+Math.sin(a0)*rr)} A${rr} ${rr} 0 0 1 ${f1(cx+Math.cos(a1)*rr)} ${f1(cy+Math.sin(a1)*rr)}`;
function glyph(name,x,y,size){const k=size/64;return `<g transform="translate(${f1(x-size/2)} ${f1(y-size/2)}) scale(${k.toFixed(3)})"><path d="${ICONS[name]}" fill="none" stroke="${ST.hi}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" transform="translate(1.5 2)"/><path d="${ICONS[name]}" fill="none" stroke="#45392d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>`;}
const star=(x,y,rr,k=.28)=>{let d='';for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/2,q=i%2?rr*k:rr;d+=(i?'L':'M')+f1(x+Math.cos(a)*q)+' '+f1(y+Math.sin(a)*q);}return d+'Z';};
// Geometry shared with the menu layout: the great ring sits a little below centre.
S.HALL={cx:800,cy:432,r1:314,r2:372};
S.hallDefs=()=>`<svg class="stone-defs" width="0" height="0" aria-hidden="true"><defs><radialGradient id="hall-disc" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="#ebe4d6"/><stop offset=".75" stop-color="#d8cebb"/><stop offset="1" stop-color="#c8bca6"/></radialGradient><radialGradient id="hall-glow" cx=".5" cy=".54" r=".5"><stop offset="0" stop-color="#fffaf0" stop-opacity=".55"/><stop offset=".6" stop-color="#fffaf0" stop-opacity=".18"/><stop offset="1" stop-color="#fffaf0" stop-opacity="0"/></radialGradient><radialGradient id="hall-vignette" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#3a2c1e" stop-opacity="0"/><stop offset="1" stop-color="#3a2c1e" stop-opacity=".28"/></radialGradient><linearGradient id="plaque-face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7f2e8"/><stop offset="1" stop-color="#e1d8c6"/></linearGradient><linearGradient id="plaque-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8e9c4"/><stop offset="1" stop-color="#dcc08a"/></linearGradient></defs></svg>`;
// The whole hall: block wall, meander frieze, two diagonal buttresses and the great stone ring.
S.hall=()=>{const r=rng(2024),{cx,cy,r1,r2}=S.HALL;let o='';
 [[54,176],[230,168],[398,188],[586,214]].forEach(([y,h],k)=>{let x=-(k%2?150:46)-r()*50;while(x<1600){const w=240+r()*160;o+=cBlock(x,y,w,h,r,{wall:true,moss:r()<.25?1:0});x+=w;}});
 o+=`<rect width="1600" height="800" fill="url(#hall-vignette)"/><ellipse cx="${cx}" cy="${cy}" rx="760" ry="560" fill="url(#hall-glow)"/>`;
 o+=`<rect x="-10" y="-10" width="1620" height="66" fill="#e2d9c7" stroke="#3a3027" stroke-width="4"/><rect x="0" y="4" width="1600" height="9" fill="${ST.hi}" opacity=".6"/>`;
 let key='';for(let x=10;x<1600;x+=40){key+=`M${x} 46 V22 H${x+30} V40 H${x+10} V28 H${x+20} V34 M${x} 46 H${x+40} `;}
 o+=`<path d="${key}" fill="none" stroke="${ST.hi}" stroke-width="3" transform="translate(1.2 1.6)"/><path d="${key}" fill="none" stroke="#6f6252" stroke-width="3"/>`;
 for(const a of [-2.48,-.66]){const dx=Math.cos(a),dy=Math.sin(a),nx=-dy*48,ny=dx*48,p=t=>[cx+dx*t,cy+dy*t],[ax,ay]=p(250),[bx,by]=p(1150);
  o+=`<path d="M${f1(ax+nx+8)} ${f1(ay+ny+12)} L${f1(bx+nx+8)} ${f1(by+ny+12)} L${f1(bx-nx+8)} ${f1(by-ny+12)} L${f1(ax-nx+8)} ${f1(ay-ny+12)} Z" fill="#5a4a3a" opacity=".16"/>`;
  o+=`<path d="M${f1(ax+nx)} ${f1(ay+ny)} L${f1(bx+nx)} ${f1(by+ny)} L${f1(bx-nx)} ${f1(by-ny)} L${f1(ax-nx)} ${f1(ay-ny)} Z" fill="${FACES[1]}" stroke="#3a3027" stroke-width="4"/>`;
  const side=dx<0?-1:1;o+=`<path d="M${f1(ax+nx*.72*side)} ${f1(ay+ny*.72*side)} L${f1(bx+nx*.72*side)} ${f1(by+ny*.72*side)}" stroke="${ST.hi}" stroke-width="9" opacity=".7"/><path d="M${f1(ax-nx*.7*side)} ${f1(ay-ny*.7*side)} L${f1(bx-nx*.7*side)} ${f1(by-ny*.7*side)}" stroke="${ST.low}" stroke-width="8" opacity=".8"/>`;
  for(const t of [470,610])o+=`<circle cx="${f1(cx+dx*t)}" cy="${f1(cy+dy*t)}" r="9" fill="${ST.mid}" stroke="#3a3027" stroke-width="3"/><circle cx="${f1(cx+dx*t-2.5)}" cy="${f1(cy+dy*t-3)}" r="3" fill="${ST.hi}"/>`;}
 o+=`<circle cx="${cx+9}" cy="${cy+14}" r="${r2+6}" fill="#5a4a3a" opacity=".18"/><circle cx="${cx}" cy="${cy}" r="${r2+2}" fill="#7d6f5c" stroke="#3a3027" stroke-width="5"/>`;
 const n=22,step=Math.PI*2/n,start=-Math.PI/2+step/2;
 for(let i=0;i<n;i++){const a0=start+i*step+.006,a1=start+(i+1)*step-.006;o+=`<path d="${sector(cx,cy,r1,r2,a0,a1)}" fill="${FACES[i%4]}" stroke="#3a3027" stroke-width="3.5" stroke-linejoin="round"/><path d="${arc(cx,cy,r2-7,a0+.02,a1-.02)}" stroke="${ST.hi}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/><path d="${arc(cx,cy,r1+6,a0+.02,a1-.02)}" stroke="${ST.low}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  if(i%5===2)o+=`<circle cx="${f1(cx+Math.cos((a0+a1)/2)*(r1+r2)/2)}" cy="${f1(cy+Math.sin((a0+a1)/2)*(r1+r2)/2)}" r="2.6" fill="${ST.deep}" opacity=".5"/>`;
  if(i===7||i===15)o+=tufts(r,cx+Math.cos(a1)*r2-14,cy+Math.sin(a1)*r2+4,28,1);}
 const k0=-Math.PI/2-.13,k1=-Math.PI/2+.13;o+=`<path d="${sector(cx,cy,r1-12,r2+26,k0,k1)}" fill="#f3eee3" stroke="#3a3027" stroke-width="4.5" stroke-linejoin="round"/><path d="${arc(cx,cy,r2+18,k0+.02,k1-.02)}" stroke="${ST.hi}" stroke-width="6" fill="none"/>`;
 o+=`<path d="${star(cx,cy-r2+8,24)}" fill="${ST.low}" stroke="#45392d" stroke-width="3" stroke-linejoin="round"/><path d="${star(cx,cy-r2+6,11,.3)}" fill="${ST.hi}"/>`;
 o+=`<circle cx="${cx}" cy="${cy}" r="${r1}" fill="url(#hall-disc)" stroke="#3a3027" stroke-width="4.5"/><path d="${arc(cx,cy,r1-9,Math.PI*1.06,Math.PI*1.94)}" stroke="#4d3f31" stroke-width="16" fill="none" opacity=".13" stroke-linecap="round"/>`;
 o+=`<circle cx="${cx}" cy="${cy}" r="${r1-30}" fill="none" stroke="${ST.hi}" stroke-width="2.4" transform="translate(1.3 1.8)"/><circle cx="${cx}" cy="${cy}" r="${r1-30}" fill="none" stroke="${ST.deep}" stroke-width="2.4"/>`;
 return `<svg class="hall-art" viewBox="0 0 1600 800" width="1600" height="800" aria-hidden="true">${o}</svg>`;};
// Mode plaque with angled ends, set into a carved slot. Only .stone-face moves when pressed.
S.plaque=(w,h,depth,seed,gold=false)=>{const r=rng(seed*7919+5),p=14,W=w+p*2,H=h+depth+p*2,x=p,y=p,c=Math.min(30,h*.34);
 const poly=(x,y,w,h,c)=>`M${f1(x+c)} ${f1(y)} H${f1(x+w-c)} L${f1(x+w)} ${f1(y+h/2)} L${f1(x+w-c)} ${f1(y+h)} H${f1(x+c)} L${f1(x)} ${f1(y+h/2)} Z`;
 let face=`<path d="${poly(x,y,w,h,c)}" fill="url(#${gold?'plaque-gold':'plaque-face'})" stroke="#3a3027" stroke-width="4.5" stroke-linejoin="round"/>`;
 face+=`<path d="M${f1(x+c+3)} ${f1(y+6)} H${f1(x+w-c-3)} L${f1(x+w-c*.5)} ${f1(y+h*.28)} H${f1(x+c*.5)} Z" fill="${ST.hi}" opacity=".8"/><path d="M${f1(x+c*.55)} ${f1(y+h*.76)} H${f1(x+w-c*.55)} L${f1(x+w-c-3)} ${f1(y+h-6)} H${f1(x+c+3)} Z" fill="${gold?'#c9a868':ST.low}" opacity=".6"/>`;
 for(const rx of [x+c*.95,x+w-c*.95])face+=`<circle cx="${f1(rx)}" cy="${f1(y+h/2)}" r="7" fill="${gold?'#e3c27c':ST.mid}" stroke="#3a3027" stroke-width="2.8"/><circle cx="${f1(rx-2)}" cy="${f1(y+h/2-2.5)}" r="2.4" fill="${ST.hi}"/>`;
 if(r()<.7)face+=crackPath(r,x+w*.62,y,w*.3,h);if(r()<.6)face+=tufts(r,x+c+w*.1,y+h+1,w*.5,1);
 return `<svg class="stone-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true"><path d="${poly(x-9,y-7,w+18,h+depth+14,c+7)}" fill="#a99c84" stroke="#3a3027" stroke-width="3.5" stroke-linejoin="round"/><path d="M${f1(x-9+c+7)} ${f1(y-1)} H${f1(x+w+9-c-7)}" stroke="#4d3f31" stroke-width="7" opacity=".22"/><path d="${poly(x,y+depth,w,h,c)}" fill="${gold?'#b99a60':ST.deep}" stroke="#3a3027" stroke-width="4.5" stroke-linejoin="round"/><g class="stone-face">${face}</g></svg>`;};
// Side rail: a stone beam from the screen edge ending in a round medallion on the ring.
S.rail=(dir,len,seed,icon,accent)=>{const r=rng(seed*104729+3),R=62,d=8,cy=R+8,W=len+R+10,H=R*2+d+18,ex=dir>0?len:W-len,x0=dir>0?-30:ex,x1=dir>0?ex:W+30;
 let face=cBlock(x0,cy-31,x1-x0,62,r,{tone:FACES[seed%4],rx:14,moss:1});
 face+=`<path d="M${f1(Math.min(x0,x1)+20)} ${cy+19} H${f1(Math.max(x0,x1)-20)}" stroke="${ST.deep}" stroke-width="2" opacity=".55"/>`;
 face+=`<circle cx="${ex}" cy="${cy}" r="${R}" fill="${FACES[(seed+1)%4]}" stroke="#3a3027" stroke-width="4.5"/><path d="${arc(ex,cy,R-8,Math.PI*1.05,Math.PI*1.85)}" stroke="${ST.hi}" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/><path d="${arc(ex,cy,R-8,Math.PI*.15,Math.PI*.85)}" stroke="${ST.low}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
 face+=`<circle cx="${ex}" cy="${cy}" r="47" fill="${ST.mid}" stroke="#3a3027" stroke-width="3"/><circle cx="${ex}" cy="${cy}" r="41" fill="none" stroke="${accent}" stroke-width="4" opacity=".85"/>${glyph(icon,ex,cy,58)}`;
 for(let i=0;i<8;i++){const a=i/8*Math.PI*2+.39;face+=`<circle cx="${f1(ex+Math.cos(a)*(R-4))}" cy="${f1(cy+Math.sin(a)*(R-4))}" r="2.2" fill="${ST.deep}" opacity=".6"/>`;}
 return `<svg class="stone-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true"><rect x="${f1(Math.min(x0,x1))}" y="${cy-31+d}" width="${f1(Math.abs(x1-x0))}" height="62" rx="14" fill="${ST.deep}" stroke="#3a3027" stroke-width="4"/><circle cx="${ex}" cy="${cy+d}" r="${R}" fill="${ST.deep}" stroke="#3a3027" stroke-width="4.5"/><g class="stone-face">${face}</g></svg>`;};
// Small rounded stone for the gold counter and the round gear button.
S.pill=(w,h,seed)=>{const r=rng(seed);return `<svg class="stone-svg" viewBox="0 0 ${w+10} ${h+16}" width="${w+10}" height="${h+16}" aria-hidden="true"><rect x="5" y="11" width="${w}" height="${h}" rx="${h/2}" fill="${ST.deep}" stroke="#3a3027" stroke-width="4"/><g class="stone-face">${cBlock(5,5,w,h,r,{rx:h/2,tone:FACES[0],plain:true})}</g></svg>`;};
S.knob=(size,icon)=>{const c=size/2+5;return `<svg class="stone-svg" viewBox="0 0 ${size+10} ${size+16}" width="${size+10}" height="${size+16}" aria-hidden="true"><circle cx="${c}" cy="${c+6}" r="${size/2}" fill="${ST.deep}" stroke="#3a3027" stroke-width="4"/><g class="stone-face"><circle cx="${c}" cy="${c}" r="${size/2}" fill="${FACES[2]}" stroke="#3a3027" stroke-width="4"/><path d="${arc(c,c,size/2-6,Math.PI*1.05,Math.PI*1.8)}" stroke="${ST.hi}" stroke-width="5" fill="none" stroke-linecap="round"/>${glyph(icon,c,c,size*.68)}</g></svg>`;};
// Hanging title tablet.
S.tablet=(w,h)=>{const r=rng(77);return `<svg class="stone-svg" viewBox="0 0 ${w+10} ${h+18}" width="${w+10}" height="${h+18}" aria-hidden="true"><path d="M5 -10 H${w+5} V${h-18+12} L${w-20} ${h+12} H30 L5 ${h-18+12} Z" fill="${ST.deep}" stroke="#3a3027" stroke-width="4" stroke-linejoin="round"/><path d="M5 -10 H${w+5} V${h-18} L${w-20} ${h} H30 L5 ${h-18} Z" fill="${FACES[2]}" stroke="#3a3027" stroke-width="4.5" stroke-linejoin="round"/><path d="M20 4 H${w-10} V${h-26} L${w-30} ${h-14} H40 L20 ${h-26} Z" fill="none" stroke="${ST.hi}" stroke-width="2.4" transform="translate(1.2 1.6)"/><path d="M20 4 H${w-10} V${h-26} L${w-30} ${h-14} H40 L20 ${h-26} Z" fill="none" stroke="${ST.deep}" stroke-width="2.4"/><rect x="14" y="0" width="${w-14}" height="10" fill="${ST.hi}" opacity=".5"/>${crackPath(r,w*.7,0,w*.25,h)}${tufts(r,40,h-4,w*.5,2)}</svg>`;};
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
  c.font='13px Title,serif';c.textAlign='center';c.letterSpacing='4px';c.fillStyle='#00000080';c.fillText('CHRONIKEN',101,258);c.fillStyle='#e2cf9f';c.fillText('CHRONIKEN',100,257);c.letterSpacing='0px';},
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
S.deck=(c,id,x,y,w,h,count,now,phase=0)=>{const im=S.backCanvas(id);for(let i=0;i<count;i++){c.save();c.shadowColor='#0000006b';c.shadowBlur=4;c.shadowOffsetX=1.5;c.shadowOffsetY=2;c.drawImage(im,x+i*3,y-i*3,w,h);c.restore();}
 if(!count)return;const tx=x+(count-1)*3,ty=y-(count-1)*3;c.save();c.beginPath();c.roundRect(tx+1,ty+1,w-2,h-2,5);c.clip();
 c.fillStyle=lin(c,tx,ty,tx+w,ty+h,['#ffffff30','#ffffff00','#ffffff00','#00000022']);c.fillRect(tx,ty,w,h);
 const q=((now+phase)%5600)/1100;if(q<1){const bx=tx-30+q*(w+60);c.globalCompositeOperation='screen';c.fillStyle=lin(c,bx-22,ty,bx+22,ty+30,['#fff3d000','#fff3d070','#fff3d000']);c.fillRect(tx,ty,w,h);}c.restore();};
})();
