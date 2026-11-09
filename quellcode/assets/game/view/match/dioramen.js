/* AP 3.9 – Lebendige Schlachtfelder und Lesbarkeit (seit 1.32.0), gezeichnet von render.js auf dem Match-Canvas:
 * - die vier Eck-Dioramen des Tisches (L.dioramas): in Ruhe und nach einem Tippen – das Tippen kommt als Effekt
 *   {type:'diorama', id} aus dem ViewModel (Match.diorama), das auch Klang und Sprechblase auslöst;
 * - die Sprechblase (view.bubble): Zeile des Chronisten zu einem Diorama oder die Schlüsselwörter eines Dieners nach langem
 *   Druck; ein Tippen auf die Blase eines Dieners zeigt seine Karte;
 * - die Angriffsvorschau (view.preview): erwarteter Verlust an Ziel und Angreifer, aus Match.preview (Kopie der Partie).
 * Alles hier sind gekennzeichnete Platzhalter für Astra. Bei reduzierter Bewegung reagieren die Dioramen mit einem kurzen
 * Leuchten statt einer Bewegung. */
(function(){'use strict';
const R=CHR,L=CHL,T=CHT,{round,ellipse,txt,sparkle}=R.paint;
const still=()=>!!window.AEP?.reducedMotion?.();
const ease=T.ease,DI=window.AEDI={};
const BRONZE='#8a6331',DARK='#3b2a18',LIGHT='#e9c983';
const plinth=g=>{ellipse(g,0,34,38,10,'#2a1d1288');ellipse(g,0,30,34,9,'#5c4126',DARK,2);};

// ASTRA: eck-astrolabium – Diorama oben links: Astrolabium aus Messing auf Sockel, Netz (Rete) drehbar als eigene Ebene, 500 × 500
const astrolab={base:g=>{plinth(g);round(g,-5,-42,10,10,3,BRONZE,DARK,1.5);
  const m=g.createRadialGradient(-8,-10,4,0,0,32);m.addColorStop(0,'#f3d593');m.addColorStop(.7,'#b48a45');m.addColorStop(1,'#6e4b22');
  ellipse(g,0,0,31,31,m,DARK,2.5);ellipse(g,0,0,24,24,'#3d2c19cc',null);
  g.strokeStyle='#f6e2b0';g.lineWidth=1.2;for(let i=0;i<24;i++){const a=i*Math.PI/12,r0=i%6?27:25;g.beginPath();g.moveTo(Math.cos(a)*r0,Math.sin(a)*r0);g.lineTo(Math.cos(a)*30,Math.sin(a)*30);g.stroke();}},
 // The rete: an off-centre ecliptic ring and six star pointers; spun once when tapped, with a glint at the end.
 live:(c,q,t)=>{const turn=q==null?0:ease.outCubic(Math.min(1,q/.8))*Math.PI*2;c.save();c.rotate(turn);
  ellipse(c,0,0,21,21,null,'#e8c77c',2);ellipse(c,0,-6,13,13,null,'#e8c77c',1.6);
  for(let i=0;i<6;i++){const a=i*Math.PI/3+.3;c.save();c.rotate(a);c.beginPath();c.moveTo(0,-8);c.lineTo(2.5,-19);c.lineTo(-2.5,-19);c.closePath();c.fillStyle='#f2d999';c.fill();c.restore();}
  c.strokeStyle='#5a3d1c';c.lineWidth=3;c.beginPath();c.moveTo(-27,0);c.lineTo(27,0);c.stroke();ellipse(c,0,0,3.5,3.5,'#f6e2b0',DARK,1);c.restore();
  if(q!=null&&q>.7){c.globalAlpha=Math.sin((q-.7)/.3*Math.PI);sparkle(c,14,-16,10,'#fff6d6');c.globalAlpha=1;}}};

// ASTRA: eck-raeuchergefaess – Diorama oben rechts: bronzenes Räuchergefäß auf drei Füßen mit glimmender Glut, Rauch als eigene Ebene, 500 × 500
const incense={base:g=>{plinth(g);g.strokeStyle=DARK;g.lineWidth=4;for(const x of [-16,0,16]){g.beginPath();g.moveTo(x*.6,6);g.lineTo(x,28);g.stroke();}
  g.beginPath();g.moveTo(-26,-8);g.quadraticCurveTo(-24,14,0,14);g.quadraticCurveTo(24,14,26,-8);g.closePath();g.fillStyle=R.paint.grad(g,-26,-8,52,22,'#6e4b22','#c99a52');g.fill();g.strokeStyle=DARK;g.lineWidth=2;g.stroke();
  ellipse(g,0,-8,26,6,'#2b1d10',DARK,2);},
 live:(c,q,t)=>{const flare=q==null?0:Math.sin(Math.min(1,q/.35)*Math.PI/2)*(1-Math.max(0,q-.5)/.5);
  const glow=c.createRadialGradient(0,-8,1,0,-8,22+16*flare);glow.addColorStop(0,`rgba(255,${180+40*flare|0},90,${.75+.25*flare})`);glow.addColorStop(1,'rgba(255,120,40,0)');
  c.fillStyle=glow;c.beginPath();c.ellipse(0,-8,24+12*flare,7+5*flare,0,0,Math.PI*2);c.fill();
  if(still()&&q==null)return;
  // Smoke: three thin wisps at rest, a column of puffs when tapped.
  const n=q==null?3:10;for(let i=0;i<n;i++){const k=((t/(q==null?2400:900))+i/n)%1,r=4+k*(q==null?8:16),drift=Math.sin(t/700+i*1.7)*6*k;
   c.globalAlpha=(q==null?.22:.5*(1-q*.6))*(1-k);ellipse(c,drift+(i%3-1)*3,-14-k*(q==null?44:72),r,r*.8,'#d9d1c4');}
  c.globalAlpha=1;}};

// ASTRA: eck-saeule – Diorama unten links: dorische Säule auf Stufen, Splitter des Kapitells und Staub als eigene Ebene, 500 × 500
const column={base:g=>{plinth(g);round(g,-24,18,48,8,2,'#cfc6b2','#6b6252',1.5);round(g,-20,12,40,7,2,'#ddd5c2','#6b6252',1.5);
  round(g,-12,-30,24,43,2,R.paint.grad(g,-12,-30,24,43,'#a79f8d','#efe8d8'),'#6b6252',1.5);
  g.strokeStyle='#8c846f';g.lineWidth=1;for(const x of [-7,-2.5,2,6.5]){g.beginPath();g.moveTo(x,-28);g.lineTo(x,11);g.stroke();}},
 capital:c=>{c.beginPath();c.moveTo(-12,-30);c.quadraticCurveTo(-16,-34,-17,-38);c.lineTo(17,-38);c.quadraticCurveTo(16,-34,12,-30);c.closePath();c.fillStyle='#e3dbc8';c.fill();c.strokeStyle='#6b6252';c.lineWidth=1.5;c.stroke();
  round(c,-19,-45,38,7,1,'#ece5d3','#6b6252',1.5);},
 // Chips break off the capital and fall to the steps in a puff of dust; then the column stands whole again.
 live:(c,q,t)=>{const sh=q!=null&&q<.3&&!still()?Math.sin(q*90)*1.6*(1-q/.3):0;c.save();c.translate(sh,0);column.capital(c);c.restore();
  if(q==null||still())return;
  for(let i=0;i<5;i++){const k=Math.min(1,q/.55),x=(i-2)*8+Math.sin(i*3)*3,y=-40+k*k*62,a=1-Math.max(0,q-.6)/.4;
   c.globalAlpha=Math.max(0,a);c.save();c.translate(x+(i-2)*k*6,Math.min(y,20));c.rotate(k*(i-2)*1.4);round(c,-3,-2.5,6,5,1,'#d8cfbb','#6b6252',1);c.restore();}
  if(q>.4){const k=(q-.4)/.6;c.globalAlpha=.45*(1-k);for(let i=0;i<6;i++)ellipse(c,(i-2.5)*9*(1+k),20-k*8,6+k*10,4+k*5,'#cbbfa6');}
  c.globalAlpha=1;}};

// ASTRA: eck-katapult – Diorama unten rechts: hölzernes Katapult mit Wurfarm und Stein, Wurfarm und Flug als eigene Ebene, 500 × 500
const catapult={base:g=>{plinth(g);g.strokeStyle='#9a6634';g.lineWidth=5;g.beginPath();g.moveTo(-30,20);g.lineTo(30,20);g.stroke();
  g.lineWidth=4;g.beginPath();g.moveTo(-6,20);g.lineTo(2,-6);g.lineTo(10,20);g.stroke();
  for(const x of [-22,22])ellipse(g,x,24,7,7,'#b07a3c','#3a2612',2);},
 // The arm flings up to the left, the stone flies onto the table and lands in a little dust; the arm settles back.
 live:(c,q,t)=>{const rest=.42,up=-2.1,a=q==null||still()?rest:q<.14?rest+(up-rest)*ease.outCubic(q/.14):q<.5?up:up+(rest-up)*ease.inOutCubic(Math.min(1,(q-.5)/.4));
  c.save();c.translate(2,-6);c.rotate(a);c.strokeStyle='#c08443';c.lineWidth=4.5;c.beginPath();c.moveTo(-8,0);c.lineTo(34,0);c.stroke();
  ellipse(c,36,-3,6,4,'#7a4f22');if(q==null||q<.14||still())ellipse(c,36,-6,4.5,4.5,'#9b9483','#4b463c',1);c.restore();ellipse(c,2,-6,3,3,'#e9c983');
  if(q==null||still()||q<.14)return;
  const k=Math.min(1,(q-.14)/.42),sx=-18,sy=-38,ex=-200,ey=-150;
  if(k<1){const x=sx+(ex-sx)*k,y=sy+(ey-sy)*k-Math.sin(k*Math.PI)*90;ellipse(c,x,y,4.5,4.5,'#9b9483','#4b463c',1);}
  else{const d=(q-.56)/.44;c.globalAlpha=.5*(1-d);for(let i=0;i<5;i++)ellipse(c,ex+(i-2)*7*(1+d),ey+4-d*6,5+d*8,3+d*4,'#cbbfa6');c.globalAlpha=1;}}};

const KINDS={astrolab,incense,column,catapult},ORDER=['astrolab','incense','column','catapult'];
// The corners: idle picture plus the active tap (newest effect of that diorama) – q runs 0 → 1 over its life.
DI.dioramas=(c,t,fx)=>{ORDER.forEach((id,i)=>{const at=L.dioramas[i],d=KINDS[id],f=fx.filter(f=>f.type==='diorama'&&f.id===id&&t>=f.start).at(-1),q=f?Math.min(1,(t-f.start)/f.life):null;
 c.save();c.translate(at.x,at.y);c.scale(at.k,at.k);R.blit(c,R.sprite('diorama:'+id,-48,-56,96,100,d.base));
 if(q!=null&&still()){c.globalAlpha=Math.sin(q*Math.PI)*.6;ellipse(c,0,0,40,40,null,'#ffe7a8',4);c.globalAlpha=1;}
 d.live(c,q,t);c.restore();});};

// delay: a diorama first plays, then the chronicler speaks (the bubble would hide the flying stone).
// ASTRA: sprechblase-match – Sprechblase auf dem Spielbrett (Pergament mit Spitze, Titel, Zeilen, Quelle), wie in der Story-Szene, 920 × 360
const W=470,PAD=16,LINE=21;
const wrap=(c,text,width)=>{const out=[];let line='';for(const w of text.split(' ')){const next=line?line+' '+w:w;if(line&&c.measureText(next).width>width){out.push(line);line=w;}else line=next;}if(line)out.push(line);return out;};
DI.bubble=(c,b,t,hit)=>{if(!b)return;b.t0??=t;const e=t-b.t0-(b.delay||0);if(e<0||e>b.life)return;
 const alpha=Math.min(1,e/140)*Math.min(1,(b.life-e)/400);
 c.save();c.font='16px Body,serif';const rows=[];
 for(const l of b.lines){if(l.name)rows.push({text:l.name,font:'bold 16px Body,serif',color:'#7a2a1c'});for(const r of wrap(c,l.text,W-2*PAD))rows.push({text:r,font:'16px Body,serif',color:'#2e1a0f'});}
 if(b.source){c.font='italic 13px Body,serif';for(const r of wrap(c,'Quelle: '+b.source,W-2*PAD))rows.push({text:r,font:'italic 13px Body,serif',color:'#6b5236',small:true});}
 if(b.card)rows.push({text:'Antippen: ganze Karte',font:'italic 13px Body,serif',color:'#6b5236',small:true});
 const h=PAD*2+24+rows.reduce((n,r)=>n+(r.small?17:LINE),0),below=b.top<300,x=Math.max(14,Math.min(1586-W,b.x-W/2)),y=below?b.bottom+16:b.top-16-h;
 c.globalAlpha=alpha;c.translate(0,(1-Math.min(1,e/140))*(below?-8:8));
 R.blit(c,R.sprite('blase-schatten:'+W+','+h,-34,-30,W+68,h+72,g=>{g.shadowColor='#0009';g.shadowBlur=14;g.shadowOffsetY=5;round(g,0,0,W,h,14,'#eadbb8');}),x,y);
 const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#f5e9cc');g.addColorStop(1,'#e0cca3');round(c,x,y,W,h,14,g,'#8a6a3a',2);
 const tx=Math.max(x+24,Math.min(x+W-24,b.x));c.beginPath();if(below){c.moveTo(tx-12,y+1);c.lineTo(tx,y-13);c.lineTo(tx+12,y+1);}else{c.moveTo(tx-12,y+h-1);c.lineTo(tx,y+h+13);c.lineTo(tx+12,y+h-1);}
 c.fillStyle=below?'#f5e9cc':'#e0cca3';c.fill();c.strokeStyle='#8a6a3a';c.lineWidth=2;c.stroke();
 txt(c,b.title.toUpperCase(),x+PAD,y+PAD+9,15,'#7a2a1c','left',W-2*PAD);
 let yy=y+PAD+24+LINE/2;c.textAlign='left';c.textBaseline='middle';for(const r of rows){c.font=r.font;c.fillStyle=r.color;c.fillText(r.text,x+PAD,yy);yy+=r.small?17:LINE;}
 c.restore();hit('bubble',x,y,W,h,{kind:'bubble'});};

// ASTRA: angriffsvorschau – Marke über Ziel und Angreifer: erwarteter Schaden (rot) oder Totenkopf, wenn die Einheit fällt, 160 × 100
DI.preview=(c,view,t)=>{const p=view.preview;if(!p||!view.drag)return;const beat=still()?1:.85+.15*Math.sin(t/160);
 for(const s of p.sides){const pos=R.positions[s.id];if(!pos)continue;const hero=/^h[01]$/.test(s.id),x=pos.x+(hero?-70:0),y=pos.y-(hero?70:96);
  const label=s.dies?'☠ −'+s.loss:'−'+s.loss,w=s.dies?78:58;
  c.save();c.translate(x,y);c.scale(beat,beat);c.globalAlpha=.94;
  round(c,-w/2,-19,w,38,12,s.dies?'#2a0d0d':s.loss?'#6d1717':'#3b3328',s.dies?'#ff6b5b':'#e9c983',2.5);
  c.font='bold 22px Title,serif';c.textAlign='center';c.textBaseline='middle';c.fillStyle=s.dies?'#ffb3a8':'#fff1d6';c.fillText(s.loss||s.dies?label:'0',0,1);c.restore();}};
})();
