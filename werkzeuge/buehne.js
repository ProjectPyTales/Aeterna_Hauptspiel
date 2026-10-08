// Gemeinsames Gerüst für Sichtprüfung und Klickpfad: lokaler Server für das Web-Spiel und Playwright.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
let pw;try{pw=require('playwright');}catch{pw=require(path.join(require('node:child_process').execSync('npm root -g').toString().trim(),'playwright'));}
const TYPES={'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.ogg':'audio/ogg','.ttf':'font/ttf','.json':'application/json','.svg':'image/svg+xml'};
// Handyformat wie in den Regeln für jede Sitzung; Tablet = Bühne 1:1.
const PHONE={viewport:{width:915,height:412},deviceScaleFactor:2.6,isMobile:true,hasTouch:true},TABLET={viewport:{width:1600,height:800}};

// Liefert das Spiel aus root aus (Standard: quellcode/assets/game) – mit denselben MIME-Typen wie die App-Hülle.
function serve(root=path.join(__dirname,'../quellcode/assets/game')){
 const server=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]).replace(/^\/$/,'/index.html'));
  if(!p.startsWith(root)){res.writeHead(403);res.end();return;}
  fs.readFile(p,(e,d)=>{if(e){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':TYPES[path.extname(p)]||'application/octet-stream'});res.end(d);});});
 return new Promise(r=>server.listen(0,()=>r({server,url:`http://localhost:${server.address().port}/`})));}

// Neue Seite mit Fehlersammlung; wartet, bis der Ladebildschirm weg ist.
async function open(browser,url,device,errors,{init,reduced=false}={}){
 const ctx=await browser.newContext({...device,reducedMotion:reduced?'reduce':'no-preference'}),page=await ctx.newPage();
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 if(init)await init(page);
 const t0=Date.now();await page.goto(url);await page.waitForSelector('#loading',{state:'detached',timeout:60000});
 return {ctx,page,start:Date.now()-t0};}

// Bühnenkoordinaten (1600 × 800) → Bildschirmpunkt.
// Auf Bildschirmen breiter als 2:1 ist die Bühne um zwei Flügel (--wing) breiter; der Bereich 1600 × 800 liegt mittig.
const stagePoint=(page,[x,y])=>page.evaluate(([x,y])=>{const el=document.getElementById('stage'),r=el.getBoundingClientRect(),k=r.height/800,wing=parseFloat(el.style.getPropertyValue('--wing'))||0;return [r.left+(wing+x)*k,r.top+y*k];},[x,y]);
// Bildzeiten über 3 s: Anzahl, Median, 95. Perzentil, Bilder über 20 ms.
const frames=(page,ms=3000)=>page.evaluate(ms=>new Promise(res=>{const d=[];let last=performance.now();const end=last+ms;
 const f=now=>{d.push(now-last);last=now;if(now<end)requestAnimationFrame(f);else{d.sort((a,b)=>a-b);res({bilder:d.length,p50_ms:+d[d.length>>1].toFixed(1),p95_ms:+d[Math.floor(d.length*.95)].toFixed(1),ueber_20ms:d.filter(x=>x>20).length});}};requestAnimationFrame(f);}),ms);

module.exports={pw,serve,open,stagePoint,frames,PHONE,TABLET};
