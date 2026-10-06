// Sichtprüfung und Messlauf für das Hauptmenü (Playwright, Chromium).
// Aufruf: node werkzeuge/sichtpruefung.js [Zielordner]   (Standard: sichtpruefung/, nicht im Repo)
// Liefert Screenshots im Handyformat (915 × 412, Pixeldichte 2,6) und Tabletformat (1600 × 800),
// Bilder vom Auftritt, vom Gedrückt-Zustand und vom Menüwechsel sowie messwerte.json (mit Zahl der Platzhalter, AP 5.12).
// Werte stammen aus der Emulation (Desktop-Chromium, CPU-Drosselung 4×) – Gerätemessungen ersetzen sie nicht.
const fs=require('node:fs'),path=require('node:path');
const {pw,serve,open:openPage,stagePoint,frames,PHONE,TABLET}=require('./buehne.js');
const out=path.resolve(process.argv[2]||'sichtpruefung');
let url;
// Konzeptbild-Koordinaten → Bühne (siehe view/hall.js)
const C=(x,y)=>[(x+84)*800/1084,(y-24)*800/1084];
const open=(browser,device,errors)=>openPage(browser,url,device,errors);
// Misst ab dem Loslassen: neuer Bildschirm sichtbar (unter dem Blitz) und Blitz verblasst.
async function change(page,point,selector){await page.evaluate(sel=>{const m=window.__wechsel={};document.addEventListener('pointerup',()=>{m.t0=performance.now();},{once:true,capture:true});
  const ui=document.getElementById('ui');new MutationObserver(()=>{if(ui.querySelector(sel)&&m.t0&&!m.neu)m.neu=Math.round(performance.now()-m.t0);}).observe(ui,{childList:true});
  new MutationObserver(ms=>{for(const x of ms)if(x.target.id==='ring-flash'){if(x.target.className==='fade')m.fade=1;if(x.target.className===''&&m.fade&&!m.fertig)m.fertig=Math.round(performance.now()-m.t0);}}).observe(document.getElementById('stage'),{subtree:true,attributes:true,attributeFilter:['class']});},selector);
 const [x,y]=await stagePoint(page,point);await page.mouse.click(x,y);await page.waitForTimeout(1200);
 return page.evaluate(()=>({neuer_bildschirm_ms:window.__wechsel.neu,fertig_ms:window.__wechsel.fertig}));}

(async()=>{fs.mkdirSync(out,{recursive:true});const srv=await serve();url=srv.url;const server=srv.server;const browser=await pw.chromium.launch();const errors=[],R={};
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
  const [x,y]=await stagePoint(page,p);R.treffer[name]=await page.evaluate(([x,y])=>document.elementFromPoint(x,y)?.closest('button')?.getAttribute('aria-label')||'(kein Knopf)',[x,y]);}
 // Die erste Berührung lädt alle Klänge – vorher erledigen, damit sie die Messung nicht verfälscht.
 {const [x,y]=await stagePoint(page,C(1700,450));await page.mouse.click(x,y);await page.waitForTimeout(2500);}
 const cdp=await ctx.newCDPSession(page);
 for(const rate of [1,4]){await cdp.send('Emulation.setCPUThrottlingRate',{rate});const k=`cpu_${rate}x`;R[k]={ruhe:await frames(page)};
  await page.evaluate(()=>{const face=document.querySelector('.plate .face');document.addEventListener('pointerdown',()=>{const s=performance.now();const tick=()=>{if(getComputedStyle(face).transform!=='none')window.__reaktion=Math.round(performance.now()-s);else if(performance.now()-s<800)requestAnimationFrame(tick);};requestAnimationFrame(tick);},{once:true,capture:true});});
  R[k].menuewechsel_schlacht=await change(page,C(996,384),'.setup-content');R[k].beruehrung_bis_reaktion_ms=await page.evaluate(()=>window.__reaktion);
  const t=await page.evaluate(()=>performance.now());await page.evaluate(()=>App.navigate('menu'));await page.waitForFunction(()=>document.querySelector('.hall')&&!document.querySelector('#ring-flash.fade,#ring-flash.cover'));
  R[k].zurueck_ins_menue_ms=Math.round(await page.evaluate(()=>performance.now())-t);await page.waitForTimeout(600);}
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
 // Platzhalter (AP 5.12): wie viele Motive fehlen noch? Jede Karte einmal zeichnen, gezählt wird im Renderer.
 R.platzhalter=await page.evaluate(()=>{for(const c of Object.values(CHD.byId))CHR.thumb(c.id);const ids=[...CHR.placeholderIds].sort();
  return {karten_ohne_motiv:Object.values(CHD.byId).filter(CHD.missingArt).length,helden_ohne_portraet:CHD.heroes.filter(h=>!h.art).length,gezeichnet:ids.length,ids};});
 R.fehler=errors;fs.writeFileSync(path.join(out,'messwerte.json'),JSON.stringify(R,null,1));console.log(JSON.stringify(R,null,1));
 await browser.close();server.close();if(errors.length)process.exitCode=1;})().catch(e=>{console.error(e);process.exit(1);});
