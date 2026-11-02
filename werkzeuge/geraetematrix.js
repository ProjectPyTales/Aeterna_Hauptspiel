// Geräte-Testmatrix (Phase 7, seit 1.34.0): dieselben Bildschirme in den Seitenverhältnissen 4:3 bis 21:9, schwach und stark.
// Aufruf: node werkzeuge/geraetematrix.js [Zielordner]   (Standard: sichtpruefung/geraete/, nicht im Repo)
// Je Gerät: Hauptmenü, Lehrstunde im Match, Einstellungen mit großer Schrift. Geprüft wird, dass die Bühne ganz im Bild liegt,
// nichts seitlich herausragt, das Fenster in den Bildschirm passt und die Leinwand die erwartete Pixeldichte hat (sparsam: 1).
// Die Bildwiederholrate (60/90/120 Hz) lässt sich in der Emulation nicht einstellen – sie bleibt eine Prüfung auf dem Gerät.
const fs=require('node:fs'),path=require('node:path');
const {pw,serve,open}=require('./buehne.js');
const P=require('../quellcode/assets/game/model/profile.js');
const out=path.resolve(process.argv[2]||'sichtpruefung/geraete');
const phone=(width,height,dpr)=>({viewport:{width,height},deviceScaleFactor:dpr,isMobile:true,hasTouch:true});
// Querformat, CSS-Pixel. „schwach“ mit 4-facher CPU-Drosselung und sparsamer Grafik.
const DEVICES=[
 {name:'16-9-schwach',ratio:'16:9',device:phone(640,360,2),slow:true},
 {name:'18-9',ratio:'18:9',device:phone(720,360,3)},
 {name:'19-5-9',ratio:'19,5:9',device:phone(844,390,3)},
 {name:'20-9',ratio:'20:9',device:phone(915,412,2.6)},
 {name:'21-9',ratio:'21:9',device:phone(960,412,3)},
 {name:'tablet-4-3',ratio:'4:3',device:{viewport:{width:1024,height:768},deviceScaleFactor:2,hasTouch:true}},
 {name:'tablet-16-10',ratio:'16:10',device:{viewport:{width:1280,height:800},deviceScaleFactor:2,hasTouch:true}}];
const checks=[];const check=(name,ok,detail)=>{checks.push({name,ok:!!ok,detail});console.log((ok?'✓ ':'✗ ')+name+(detail!=null?' – '+JSON.stringify(detail):''));};
const settle=(page,ms=0)=>page.evaluate(ms=>new Promise(r=>setTimeout(()=>requestAnimationFrame(()=>requestAnimationFrame(r)),ms)),ms);
// Liegt das Element ganz im Bildschirm? Ragt die Seite seitlich heraus?
const fits=(page,sel)=>page.evaluate(sel=>{const el=document.querySelector(sel);if(!el)return {da:false};const r=el.getBoundingClientRect(),W=innerWidth,H=innerHeight;
 return {da:true,innen:r.left>=-1&&r.top>=-1&&r.right<=W+1&&r.bottom<=H+1,ueberlauf:document.documentElement.scrollWidth>W+1,b:Math.round(r.width),h:Math.round(r.height),W,H};},sel);

(async()=>{fs.mkdirSync(out,{recursive:true});const {server,url}=await serve();const browser=await pw.chromium.launch();const errors=[],R={};
 for(const d of DEVICES){const profile={...P.fresh(),seed:7,helpSeen:true};if(d.slow)profile.settings.quality='sparsam';
  const {ctx,page}=await open(browser,url,d.device,errors,{reduced:true,init:p=>p.addInitScript(x=>localStorage.setItem('chroniken.profile',x),JSON.stringify(profile))});
  if(d.slow){const cdp=await ctx.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});}
  await settle(page,300);const r=R[d.name]={verhaeltnis:d.ratio};
  r.menue=await fits(page,'#stage');await page.screenshot({path:path.join(out,d.name+'-menue.png')});
  check(d.name+': Hauptmenü – Bühne im Bild, kein seitlicher Überlauf',r.menue.innen&&!r.menue.ueberlauf,r.menue);
  check(d.name+': Lehrstunde auf der vierten Platte',await page.evaluate(()=>!!document.querySelector('.plate[data-a="lesson"]')));
  // Lehrstunde im Match: Leinwand, Tafel des Chronisten, Pixeldichte.
  await page.evaluate(()=>App.vm.game.startLesson('schlacht'));await page.waitForFunction(()=>App.screen==='game',null,{timeout:15000});await settle(page,600);
  r.match=await fits(page,'#board');r.pixeldichte=await page.evaluate(()=>CHR.scale);await page.screenshot({path:path.join(out,d.name+'-lehrstunde.png')});
  check(d.name+': Match – Leinwand im Bild',r.match.innen&&!r.match.ueberlauf,r.match);
  check(d.name+': Pixeldichte '+(d.slow?'sparsam 1':'1 bis 2'),d.slow?r.pixeldichte===1:r.pixeldichte>=1&&r.pixeldichte<=2,r.pixeldichte);
  // Einstellungen mit sehr großer Schrift: das Fenster passt, der Reiter „Anzeige“ ist erreichbar.
  await page.evaluate(()=>{App.profile.settings.text='sehr';App.store.commit();App.ui.close();});await page.evaluate(()=>App.vm.game.ctx.dialogs.settings());
  await page.waitForSelector('#overlay .settings');await page.locator('#overlay .stone-tab',{hasText:'Anzeige'}).click();await settle(page,150);
  r.einstellungen=await fits(page,'#overlay .modal');await page.screenshot({path:path.join(out,d.name+'-einstellungen.png')});
  check(d.name+': Einstellungen mit sehr großer Schrift passen ins Bild',r.einstellungen.innen&&!r.einstellungen.ueberlauf,r.einstellungen);
  await ctx.close();}
 check('Keine JavaScript-Fehler',errors.length===0,errors);
 fs.writeFileSync(path.join(out,'geraetematrix.json'),JSON.stringify({geraete:R,pruefungen:checks,fehler:errors},null,1));
 await browser.close();server.close();
 const failed=checks.filter(c=>!c.ok);console.log(failed.length?`\n${failed.length} Prüfung(en) fehlgeschlagen.`:`\nAlle ${checks.length} Prüfungen bestanden.`);
 if(failed.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1);});
