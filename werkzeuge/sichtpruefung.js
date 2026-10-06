// Sichtprüfung und Messlauf für das Hauptmenü (Playwright, Chromium).
// Aufruf: node werkzeuge/sichtpruefung.js [Zielordner]   (Standard: sichtpruefung/, nicht im Repo)
// Liefert Screenshots im Handyformat (915 × 412, Pixeldichte 2,6) und Tabletformat (1600 × 800),
// Bilder vom Auftritt, vom Gedrückt-Zustand und vom Menüwechsel sowie messwerte.json.
// Werte stammen aus der Emulation (Desktop-Chromium, CPU-Drosselung 4×) – Gerätemessungen ersetzen sie nicht.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
let pw;try{pw=require('playwright');}catch{pw=require(path.join(require('node:child_process').execSync('npm root -g').toString().trim(),'playwright'));}
const root=path.join(__dirname,'../quellcode/assets/game'),out=path.resolve(process.argv[2]||'sichtpruefung');
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.ogg':'audio/ogg','.ttf':'font/ttf','.json':'application/json'};
const server=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]).replace(/^\/$/,'/index.html'));
 if(!p.startsWith(root)){res.writeHead(403);res.end();return;}
 fs.readFile(p,(e,d)=>{if(e){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':types[path.extname(p)]||'application/octet-stream'});res.end(d);});});
// Konzeptbild-Koordinaten → Bühne (siehe hall.js)
const C=(x,y)=>[(x+84)*800/1084,(y-24)*800/1084];
const PHONE={viewport:{width:915,height:412},deviceScaleFactor:2.6,isMobile:true,hasTouch:true},TABLET={viewport:{width:1600,height:800}};

async function open(browser,device,errors){const ctx=await browser.newContext(device),page=await ctx.newPage();
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const t0=Date.now();await page.goto(`http://localhost:${server.address().port}/`);await page.waitForSelector('#loading',{state:'detached',timeout:60000});
 return {ctx,page,start:Date.now()-t0};}
const stagePt=(page,[x,y])=>page.evaluate(([x,y])=>{const r=document.getElementById('stage').getBoundingClientRect(),k=r.width/1600;return [r.left+x*k,r.top+y*k];},[x,y]);
const frames=page=>page.evaluate(()=>new Promise(res=>{const d=[];let last=performance.now();const end=last+3000;
 const f=now=>{d.push(now-last);last=now;if(now<end)requestAnimationFrame(f);else{d.sort((a,b)=>a-b);res({bilder:d.length,p50_ms:+d[d.length>>1].toFixed(1),p95_ms:+d[Math.floor(d.length*.95)].toFixed(1),ueber_20ms:d.filter(x=>x>20).length});}};requestAnimationFrame(f);}));
// Misst ab dem Loslassen: neuer Bildschirm sichtbar (unter dem Blitz) und Blitz verblasst.
async function change(page,point,selector){await page.evaluate(sel=>{const m=window.__wechsel={};document.addEventListener('pointerup',()=>{m.t0=performance.now();},{once:true,capture:true});
  const ui=document.getElementById('ui');new MutationObserver(()=>{if(ui.querySelector(sel)&&m.t0&&!m.neu)m.neu=Math.round(performance.now()-m.t0);}).observe(ui,{childList:true});
  new MutationObserver(ms=>{for(const x of ms)if(x.target.id==='ring-flash'){if(x.target.className==='fade')m.fade=1;if(x.target.className===''&&m.fade&&!m.fertig)m.fertig=Math.round(performance.now()-m.t0);}}).observe(document.getElementById('stage'),{subtree:true,attributes:true,attributeFilter:['class']});},selector);
 const [x,y]=await stagePt(page,point);await page.mouse.click(x,y);await page.waitForTimeout(1200);
 return page.evaluate(()=>({neuer_bildschirm_ms:window.__wechsel.neu,fertig_ms:window.__wechsel.fertig}));}

(async()=>{fs.mkdirSync(out,{recursive:true});await new Promise(r=>server.listen(0,r));const browser=await pw.chromium.launch();const errors=[],R={};
 // Tablet: Screenshot und Bildzeiten im Ruhezustand
 {const {ctx,page,start}=await open(browser,TABLET,errors);R.tablet_start_bis_menue_ms=start;await page.waitForTimeout(1200);await page.screenshot({path:path.join(out,'menue-tablet.png')});await page.waitForTimeout(600);R.tablet_ruhe=await frames(page);await ctx.close();}
 const {ctx,page,start}=await open(browser,PHONE,errors);R.handy_start_bis_menue_ms=start;
 // Auftritt bei angehaltenen Animationen
 await page.evaluate(()=>document.getAnimations().forEach(a=>a.pause()));
 R.auftritt_ms=await page.evaluate(()=>Math.round(Math.max(...document.getAnimations().map(a=>a.effect.getComputedTiming()).filter(t=>t.iterations!==Infinity).map(t=>t.endTime))));
 for(const t of [80,240,420,620]){await page.evaluate(t=>document.getAnimations().forEach(a=>{a.currentTime=t;}),t);await page.screenshot({path:path.join(out,`auftritt-${t}ms.png`)});}
 await page.evaluate(()=>document.getAnimations().forEach(a=>a.play()));await page.waitForTimeout(900);
 await page.screenshot({path:path.join(out,'menue-handy.png')});
 await page.evaluate(()=>{document.querySelectorAll('.plate')[1].classList.add('pressed');document.querySelectorAll('.rail')[1].classList.add('pressed');});
 await page.waitForTimeout(160);await page.screenshot({path:path.join(out,'gedrueckt-handy.png')});
 await page.evaluate(()=>document.querySelectorAll('.pressed').forEach(e=>e.classList.remove('pressed')));
 // Trefferflächen
 R.treffer={};for(const [name,p] of Object.entries({platte_schlacht:C(996,384),medaille_aufgaben:C(537,716),balken_aufgaben:C(150,714),ecke_neben_medaille:C(600,640),zahnrad:C(1913,88),wand:C(1700,450),balken_kartenpakete:C(1800,936)})){
  const [x,y]=await stagePt(page,p);R.treffer[name]=await page.evaluate(([x,y])=>document.elementFromPoint(x,y)?.closest('button')?.getAttribute('aria-label')||'(kein Knopf)',[x,y]);}
 // Die erste Berührung lädt alle Klänge – vorher erledigen, damit sie die Messung nicht verfälscht.
 {const [x,y]=await stagePt(page,C(1700,450));await page.mouse.click(x,y);await page.waitForTimeout(2500);}
 const cdp=await ctx.newCDPSession(page);
 for(const rate of [1,4]){await cdp.send('Emulation.setCPUThrottlingRate',{rate});const k=`cpu_${rate}x`;R[k]={ruhe:await frames(page)};
  await page.evaluate(()=>{const face=document.querySelector('.plate .face');document.addEventListener('pointerdown',()=>{const s=performance.now();const tick=()=>{if(getComputedStyle(face).transform!=='none')window.__reaktion=Math.round(performance.now()-s);else if(performance.now()-s<800)requestAnimationFrame(tick);};requestAnimationFrame(tick);},{once:true,capture:true});});
  R[k].menuewechsel_schlacht=await change(page,C(996,384),'.setup-content');R[k].beruehrung_bis_reaktion_ms=await page.evaluate(()=>window.__reaktion);
  const t=await page.evaluate(()=>performance.now());await page.evaluate(()=>App.navigate('menu'));await page.waitForFunction(()=>document.querySelector('.hall')&&!document.querySelector('#ring-flash.fade,#ring-flash.cover'));
  R[k].zurueck_ins_menue_ms=Math.round(await page.evaluate(()=>performance.now())-t);await page.waitForTimeout(600);}
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
 R.fehler=errors;fs.writeFileSync(path.join(out,'messwerte.json'),JSON.stringify(R,null,1));console.log(JSON.stringify(R,null,1));
 await browser.close();server.close();if(errors.length)process.exitCode=1;})().catch(e=>{console.error(e);process.exit(1);});
