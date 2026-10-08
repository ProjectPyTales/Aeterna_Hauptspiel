// Kampagnenkarte (AP 1.7): zeichnet die Küsten Europas und des Mittelmeers als SVG – mit derselben Projektion wie die
// Stationen in viewmodel/campaign.js (MAP), dazu das Kästchen „Neue Welt“ mit dem See von Texcoco, Gradnetz und Kompass.
// Quelle: Natural Earth 1:50 Mio. (gemeinfrei) aus dem npm-Paket world-atlas (ISC), Datei land-50m.json (TopoJSON).
// Das Paket gehört nicht ins Repo: `npm pack world-atlas@2.0.2`, entpacken und den Pfad übergeben.
// Platzhalter für Astra (ASTRA: weltkarte in view/campaign.js) – das gemalte Bild ersetzt später nur diese Datei.
//
// Aufruf: node werkzeuge/weltkarte.js <pfad/zu/land-50m.json> [ziel.svg]
const fs=require('node:fs'),path=require('node:path');
const {MAP,project,projectInset}=require('../quellcode/assets/game/viewmodel/campaign.js');
const src=process.argv[2];if(!src){console.error('Aufruf: node werkzeuge/weltkarte.js <land-50m.json> [ziel.svg]');process.exit(1);}
const out=process.argv[3]||path.join(__dirname,'../quellcode/assets/game/assets/art/weltkarte.svg');
const topo=JSON.parse(fs.readFileSync(src,'utf8')),{scale,translate}=topo.transform;

// TopoJSON: Bögen sind quantisiert und deltakodiert; ein Ring setzt sich aus Bögen zusammen (~i = rückwärts).
const arcs=topo.arcs.map(a=>{let x=0,y=0;return a.map(([dx,dy])=>{x+=dx;y+=dy;return [x*scale[0]+translate[0],y*scale[1]+translate[1]];});});
const ring=ids=>{const pts=[];ids.forEach((i,n)=>{const a=i<0?arcs[~i].slice().reverse():arcs[i];pts.push(...(n?a.slice(1):a));});return pts;};
const polys=[];const walk=g=>{if(g.type==='GeometryCollection')g.geometries.forEach(walk);else if(g.type==='Polygon')polys.push(g.arcs.map(ring));else if(g.type==='MultiPolygon')g.arcs.forEach(p=>polys.push(p.map(ring)));};
walk(topo.objects.land);

// Sutherland–Hodgman am Rechteck, danach Punkte näher als 1,2 Einheiten weglassen.
function clip(pts,x0,y0,x1,y1){const edges=[[p=>p[0]>=x0,(a,b)=>[x0,a[1]+(b[1]-a[1])*(x0-a[0])/(b[0]-a[0])]],[p=>p[0]<=x1,(a,b)=>[x1,a[1]+(b[1]-a[1])*(x1-a[0])/(b[0]-a[0])]],
 [p=>p[1]>=y0,(a,b)=>[a[0]+(b[0]-a[0])*(y0-a[1])/(b[1]-a[1]),y0]],[p=>p[1]<=y1,(a,b)=>[a[0]+(b[0]-a[0])*(y1-a[1])/(b[1]-a[1]),y1]]];
 for(const [inside,cut] of edges){const res=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];
  if(inside(b)){if(!inside(a))res.push(cut(a,b));res.push(b);}else if(inside(a))res.push(cut(a,b));}pts=res;if(!pts.length)break;}return pts;}
function thin(pts,min=1.2){const res=[];for(const p of pts){const q=res[res.length-1];if(!q||Math.hypot(p[0]-q[0],p[1]-q[1])>=min)res.push(p);}return res;}
const f=n=>(Math.round(n*10)/10).toString();
function pathOf(proj,x0,y0,x1,y1){let d='';
 for(const poly of polys)for(const r of poly){let pts=r.map(([lon,lat])=>{const p=proj(lon,lat);return [p.x,p.y];});
  const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);if(Math.max(...xs)<x0||Math.min(...xs)>x1||Math.max(...ys)<y0||Math.min(...ys)>y1)continue;
  pts=thin(clip(pts,x0-4,y0-4,x1+4,y1+4));if(pts.length<3)continue;
  d+='M'+pts.map(p=>f(p[0])+' '+f(p[1])).join('L')+'Z';}
 return d;}

const {w,h,inset:I}=MAP,main=pathOf(project,0,0,w,h),small=pathOf(projectInset,I.x,I.y,I.x+I.w,I.y+I.h);
// Gradnetz alle 5 Grad.
let grid='';for(let lon=-15;lon<=45;lon+=5){const x=project(lon,0).x;grid+=`M${f(x)} 0V${h}`;}for(let lat=30;lat<=55;lat+=5){const y=project(0,lat).y;grid+=`M0 ${f(y)}H${w}`;}
// Kompassrose unten rechts.
const cx=1012,cy=566,star=[...Array(16)].map((_,i)=>{const a=i*Math.PI/8-Math.PI/2,r=i%4===0?44:i%2?12:24;return f(cx+Math.cos(a)*r)+' '+f(cy+Math.sin(a)*r);}).join('L');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<!-- Kampagnenkarte (AP 1.7), erzeugt von werkzeuge/weltkarte.js aus Natural Earth 1:50 Mio. (gemeinfrei, über world-atlas, ISC). Platzhalter für Astra. -->
<defs><clipPath id="i"><rect x="${I.x}" y="${I.y}" width="${I.w}" height="${I.h}"/></clipPath></defs>
<path d="${grid}" fill="none" stroke="#7a6440" stroke-opacity=".22" stroke-width="1" stroke-dasharray="4 5"/>
<path d="${main}" fill="none" stroke="#7d9a92" stroke-opacity=".38" stroke-width="7" stroke-linejoin="round"/>
<path d="${main}" fill="#d5c08c" stroke="#6b4f2e" stroke-width="1.1" stroke-linejoin="round"/>
<path d="M${star}Z" fill="#8a6a3a" fill-opacity=".55" stroke="#4a3418" stroke-width="1"/><circle cx="${cx}" cy="${cy}" r="30" fill="none" stroke="#4a3418" stroke-opacity=".5"/>
<rect x="${I.x-4}" y="${I.y-4}" width="${I.w+8}" height="${I.h+8}" rx="4" fill="#4a3418"/><rect x="${I.x}" y="${I.y}" width="${I.w}" height="${I.h}" fill="#e7dbbb"/>
<g clip-path="url(#i)"><path d="${small}" fill="none" stroke="#7d9a92" stroke-opacity=".38" stroke-width="7"/><path d="${small}" fill="#d5c08c" stroke="#6b4f2e" stroke-width="1.1"/></g>
<rect x="${I.x}" y="${I.y}" width="${I.w}" height="${I.h}" fill="none" stroke="#a8834a" stroke-width="2"/>
</svg>
`;
fs.writeFileSync(out,svg);console.log(out,(svg.length/1024).toFixed(1)+' KB');
