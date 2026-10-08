// Automatische Sichtprüfung (AP 2.6) und Abnahme von AP 2.3 / AP 0.1, im Handyformat (915 × 412, Pixeldichte 2,6).
// Klickpfad wie ein Spieler: Hauptmenü → Basar (Reiter, Kauf, Ausrüsten) → Sammlung (Suche) → Herausforderung →
// Starthand → Match → Pause → Aufgeben → Ergebnis → Hauptmenü.
// Jeder Schritt wird fotografiert (sichtpruefung/klickpfad/) und verkleinert mit werkzeuge/referenz/*.webp verglichen.
// Der Lauf schlägt fehl bei JavaScript-Fehlern, nicht erfüllten Prüfungen oder starken Bildabweichungen.
//
// Aufruf: node werkzeuge/klickpfad.js [--referenz] [--spiel <ordner>] [--nur-basar] [--ziel <ordner>]
//   --referenz   Referenzbilder neu schreiben – nur nach gewollten optischen Änderungen, Bilder ansehen und committen
//   --spiel      anderes Spielverzeichnis (z. B. eine ältere Version, um Messwerte zu vergleichen)
//   --nur-basar  nur die Basar-Messung (funktioniert auch mit 1.4.0, keine Bildvergleiche)
// Für stabile Bilder: reduzierte Bewegung (kein Auftritt, keine Übergänge, keine Funken), feste Uhrzeit
// (Tagesduell vom 6. 10. 2026) und ein fester Spielstand.
const fs=require('node:fs'),path=require('node:path');
const {pw,serve,open,stagePoint,PHONE}=require('./buehne.js');
const P=require('../quellcode/assets/game/model/profile.js');
const arg=(name,def)=>{const i=process.argv.indexOf(name);return i<0?def:process.argv[i+1];};
const REF=process.argv.includes('--referenz'),ONLY_SHOP=process.argv.includes('--nur-basar');
const game=path.resolve(arg('--spiel',path.join(__dirname,'../quellcode/assets/game')));
const out=path.resolve(arg('--ziel','sichtpruefung/klickpfad')),refDir=path.join(__dirname,'referenz');
const DAY=new Date('2026-10-06T12:00:00');
// Verkleinerter Vergleich: so groß, dass Layout, Bilder und Texte zählen, Kantenglättung aber nicht.
const CMP={w:458,h:206,pixel:48,share:.03,mean:6};
// Konzeptbild-Koordinaten des Hauptmenüs → Bühne (siehe view/hall.js).
const C=(x,y)=>[(x+84)*800/1084,(y-24)*800/1084];

// Fester Spielstand: frisches Profil mit festem Startwert, Hilfe schon gesehen.
const profile=JSON.stringify({...P.fresh(),seed:424242,helpSeen:true});

const checks=[],shots=[],errors=[];
const check=(name,ok,detail)=>{checks.push({name,ok:!!ok,detail});console.log((ok?'✓ ':'✗ ')+name+(detail!=null?' – '+JSON.stringify(detail):''));};
const settle=(page,ms=0)=>page.evaluate(ms=>new Promise(r=>setTimeout(()=>requestAnimationFrame(()=>requestAnimationFrame(r)),ms)),ms);
const screen=page=>page.evaluate(()=>App.screen);
async function waitScreen(page,name){await page.waitForFunction(n=>App.screen===n,name,{timeout:10000});await settle(page,150);}
async function tapHall(page,point){const [x,y]=await stagePoint(page,point);await page.mouse.click(x,y);}

// Bildvergleich im Browser (Canvas): Anteil stark abweichender Pixel und mittlere Abweichung.
async function compare(cmpPage,name,png){
 const refFile=path.join(refDir,name+'.webp'),shot='data:image/png;base64,'+png.toString('base64');
 const small=await cmpPage.evaluate(async([src,c])=>{const im=await createImageBitmap(await (await fetch(src)).blob());const cv=new OffscreenCanvas(c.w,c.h),g=cv.getContext('2d');
  g.drawImage(im,0,0,c.w,c.h);const b=await cv.convertToBlob({type:'image/webp',quality:.9});return [...new Uint8Array(await b.arrayBuffer())];},[shot,CMP]);
 const smallPng=Buffer.from(small);
 if(REF||!fs.existsSync(refFile)){fs.mkdirSync(refDir,{recursive:true});fs.writeFileSync(refFile,smallPng);return {neu:true};}
 const ref='data:image/webp;base64,'+fs.readFileSync(refFile).toString('base64'),now='data:image/webp;base64,'+smallPng.toString('base64');
 const r=await cmpPage.evaluate(async([a,b,c])=>{const load=async s=>{const im=await createImageBitmap(await (await fetch(s)).blob());const cv=new OffscreenCanvas(c.w,c.h),g=cv.getContext('2d');g.drawImage(im,0,0,c.w,c.h);return g.getImageData(0,0,c.w,c.h);};
  const A=await load(a),B=await load(b),diff=new OffscreenCanvas(c.w,c.h),g=diff.getContext('2d'),D=g.createImageData(c.w,c.h);let sum=0,bad=0;
  for(let i=0;i<A.data.length;i+=4){const d=Math.max(Math.abs(A.data[i]-B.data[i]),Math.abs(A.data[i+1]-B.data[i+1]),Math.abs(A.data[i+2]-B.data[i+2]));sum+=d;
   const grey=(B.data[i]+B.data[i+1]+B.data[i+2])/6;if(d>c.pixel){bad++;D.data[i]=255;D.data[i+1]=30;D.data[i+2]=30;}else{D.data[i]=D.data[i+1]=D.data[i+2]=grey;}D.data[i+3]=255;}
  g.putImageData(D,0,0);const blob=await diff.convertToBlob({type:'image/png'});
  return {anteil:+(bad/(c.w*c.h)).toFixed(4),mittel:+(sum/(c.w*c.h)).toFixed(2),diff:[...new Uint8Array(await blob.arrayBuffer())]};},[ref,now,CMP]);
 fs.writeFileSync(path.join(out,name+'-abweichung.png'),Buffer.from(r.diff));
 return {anteil:r.anteil,mittel:r.mittel,ok:r.anteil<=CMP.share&&r.mittel<=CMP.mean};}
async function shot(page,cmpPage,name){await settle(page,120);
 const png=await page.screenshot({path:path.join(out,name+'.png'),animations:'disabled',caret:'hide'});
 if(ONLY_SHOP)return;
 const r=await compare(cmpPage,name,png);shots.push({name,...r});
 if(r.neu)console.log('  Referenz geschrieben: '+name);else check('Bild '+name+' wie Referenz',r.ok,{abweichend:r.anteil,mittel:r.mittel});}

// Längster Bildabstand, während fn läuft und danach (ms): misst, ob ein Kauf die Bildrate einbrechen lässt.
async function longestFrame(page,fn,after=600){
 await page.evaluate(()=>{const f=window.__frames={max:0,last:performance.now(),run:true};const loop=now=>{f.max=Math.max(f.max,now-f.last);f.last=now;if(f.run)requestAnimationFrame(loop);};requestAnimationFrame(loop);});
 await fn();await page.waitForTimeout(after);
 return page.evaluate(()=>{window.__frames.run=false;return Math.round(window.__frames.max);});}

// Basar (AP 0.1, AP 2.3): Reiter Schlachtfelder, ganz nach unten scrollen, kaufen, ausrüsten.
async function basar(page,cmpPage,cdp){
 await tapHall(page,C(238,936));await waitScreen(page,'packs');
 await shot(page,cmpPage,'02-basar-kartenruecken');
 check('Basar öffnet auf dem Reiter Kartenrücken',await page.evaluate(()=>document.querySelector('.stone-tab.active')?.textContent.trim())==='Kartenrücken');
 await page.locator('.stone-tab',{hasText:'Schlachtfelder'}).click();await settle(page,100);
 const before=await page.evaluate(()=>{const b=document.querySelector('.shop-body');b.scrollTop=b.scrollHeight;
  document.querySelectorAll('#ui img,#ui *').forEach(i=>{i.__vorher=1;});return {scroll:Math.round(b.scrollTop),bilder:document.querySelectorAll('#ui img').length,gold:App.profile.gold};});
 check('Schlachtfelder lassen sich scrollen',before.scroll>0,before);
 await shot(page,cmpPage,'03-basar-schlachtfelder');
 await page.locator('.shop-tile',{hasText:'Meißner Porzellan'}).locator('button',{hasText:'Kaufen'}).click();await settle(page,100);
 await shot(page,cmpPage,'04-basar-kauf-bestaetigen');
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 const frame=await longestFrame(page,()=>page.locator('#overlay button',{hasText:'Für 100 Gold kaufen'}).click());
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
 const after=await page.evaluate(()=>{const b=document.querySelector('.shop-body');const imgs=[...document.querySelectorAll('#ui img')];
  const all=[...document.querySelectorAll('#ui *')];
  return {scroll:Math.round(b.scrollTop),reiter:document.querySelector('.stone-tab.active')?.textContent.trim(),gold:App.profile.gold,neueBilder:imgs.filter(i=>!i.__vorher).length,bilder:imgs.length,
   neueElemente:all.filter(e=>!e.__vorher).length,elemente:all.length};});
 check('Kauf zieht 100 Gold ab',after.gold===before.gold-100,{vorher:before.gold,nachher:after.gold});
 check('Reiter bleibt nach dem Kauf (AP 0.1)',after.reiter==='Schlachtfelder',after.reiter);
 check('Scrollposition bleibt nach dem Kauf (AP 0.1)',Math.abs(after.scroll-before.scroll)<=1,{vorher:before.scroll,nachher:after.scroll});
 check('Keine Bilder neu erzeugt (AP 2.3)',after.neueBilder===0,{neu:after.neueBilder,gesamt:after.bilder});
 await shot(page,cmpPage,'05-basar-nach-kauf');
 const frame2=await longestFrame(page,()=>page.locator('.shop-tile',{hasText:'Meißner Porzellan'}).locator('button',{hasText:'Ausrüsten'}).click());
 const equip=await page.evaluate(()=>{const b=document.querySelector('.shop-body');return {scroll:Math.round(b.scrollTop),neueBilder:[...document.querySelectorAll('#ui img')].filter(i=>!i.__vorher).length,
  ausgeruestet:App.profile.cosmetics.equipped.board};});
 check('Ausrüsten: Scrollposition und Bilder bleiben',Math.abs(equip.scroll-before.scroll)<=1&&equip.neueBilder===0,equip);
 check('Meißner Porzellan (Platzhalter-Tisch) ist ausgerüstet',equip.ausgeruestet==='porzellan');
 return {scroll_vorher:before.scroll,scroll_nach_kauf:after.scroll,scroll_nach_ausruesten:equip.scroll,neue_bilder_nach_kauf:after.neueBilder,
  neue_bilder_nach_ausruesten:equip.neueBilder,bilder:after.bilder,neue_elemente_nach_kauf:after.neueElemente,elemente:after.elemente,laengstes_bild_kauf_cpu4x_ms:frame,laengstes_bild_ausruesten_ms:frame2};}

(async()=>{fs.mkdirSync(out,{recursive:true});const {server,url}=await serve(game);const browser=await pw.chromium.launch();const R={};
 const cmpCtx=await browser.newContext(),cmpPage=await cmpCtx.newPage();
 const {ctx,page}=await open(browser,url,PHONE,errors,{reduced:true,init:async page=>{await page.clock.setFixedTime(DAY);
  await page.addInitScript(p=>{if(!sessionStorage.getItem('klickpfad')){sessionStorage.setItem('klickpfad','1');localStorage.setItem('chroniken.profile',p);}},profile);}});
 const cdp=await ctx.newCDPSession(page);
 try{
  await settle(page,300);await shot(page,cmpPage,'01-hauptmenue');
  R.basar=await basar(page,cmpPage,cdp);
  if(!ONLY_SHOP){
   await page.locator('#ui button',{hasText:'Zurück'}).click();await waitScreen(page,'menu');
   // Sammlung: Suche tippt in ein Feld, das seinen Fokus behält.
   await tapHall(page,C(1812,714));await waitScreen(page,'collection');await shot(page,cmpPage,'06-sammlung');
   await page.locator('#search').click();await page.keyboard.type('Wache',{delay:30});await settle(page,100);
   const search=await page.evaluate(()=>({fokus:document.activeElement?.id,wert:document.getElementById('search').value,karten:document.querySelectorAll('.collect-card').length}));
   check('Suche: Feld behält Fokus und Text (AP 2.3)',search.fokus==='search'&&search.wert==='Wache',search);
   await shot(page,cmpPage,'07-sammlung-suche');
   await page.locator('#ui button',{hasText:'Zurück'}).click();await waitScreen(page,'menu');
   // Herausforderung → Starthand → Match.
   await tapHall(page,C(996,800));await waitScreen(page,'setup');await shot(page,cmpPage,'08-herausforderung');
   await page.locator('#ui button',{hasText:'Duell beginnen'}).click();await waitScreen(page,'game');
   await page.waitForSelector('#overlay .mulligan');await settle(page,200);
   const mull=await page.evaluate(()=>{document.querySelectorAll('#overlay img').forEach(i=>{i.__vorher=1;});return document.querySelectorAll('.mulligan-card').length;});
   await page.locator('.mulligan-card').first().click();await settle(page,50);
   const toggled=await page.evaluate(()=>({markiert:document.querySelectorAll('.mulligan-card.replace').length,neueBilder:[...document.querySelectorAll('#overlay img')].filter(i=>!i.__vorher).length}));
   check('Starthand: Auswahl ohne neue Bilder (AP 2.3)',toggled.markiert===1&&toggled.neueBilder===0,{karten:mull,...toggled});
   await shot(page,cmpPage,'09-starthand');
   await page.locator('.mulligan-card').first().click();
   await page.locator('#overlay button',{hasText:'Beginnen'}).click();
   await page.waitForFunction(()=>App.profile.game.phase==='play'&&App.profile.game.active===0&&!CHM.busy()&&!document.querySelector('#overlay .scrim'),null,{timeout:30000});
   await settle(page,700);await shot(page,cmpPage,'10-match');
   await page.keyboard.press('Escape');await page.waitForSelector('#overlay .modal');await shot(page,cmpPage,'11-pause');
   await page.locator('#overlay button',{hasText:'Aufgeben'}).click();await page.waitForSelector('#overlay .modal');
   await page.locator('#overlay button',{hasText:'Aufgeben'}).click();await page.waitForSelector('#overlay .result');await settle(page,200);
   check('Aufgeben endet als Niederlage',await page.evaluate(()=>App.profile.game.phase==='over'&&App.profile.game.winner===1));
   await shot(page,cmpPage,'12-ergebnis');
   await page.locator('#overlay button',{hasText:'Zum Hauptmenü'}).click();await waitScreen(page,'menu');
   check('Zurück im Hauptmenü',await screen(page)==='menu');
  }
 }catch(e){check('Klickpfad vollständig',false,e.message.split('\n')[0]);}
 check('Keine JavaScript-Fehler',errors.length===0,errors);
 R.pruefungen=checks;R.bilder=shots;R.fehler=errors;
 fs.writeFileSync(path.join(out,'klickpfad.json'),JSON.stringify(R,null,1));
 console.log(JSON.stringify(R.basar,null,1));
 await browser.close();server.close();
 const failed=checks.filter(c=>!c.ok);console.log(failed.length?`\n${failed.length} Prüfung(en) fehlgeschlagen.`:`\nAlle ${checks.length} Prüfungen bestanden.`);
 if(failed.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1);});
