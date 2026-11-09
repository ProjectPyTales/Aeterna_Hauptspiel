// Start (1.26.0): Entwickler-Splash PY'TALES und Aeterna-Intro im Handyformat. Prüft den Ablauf bis ins Hauptmenü, das
// Überspringen per Tippen, den Splash allein bei reduzierter Bewegung und dass automatisierte Läufe ohne Intro starten;
// misst die Bildzeiten im Intro und hält Standbilder der sechs Akte fest (sichtpruefung/intro-*.png, nur bei Fehlern
// hochgeladen). Headless-Chromium zeichnet ohne GPU – die Bildzeiten zeigen nur, dass nichts hängt.
// Aufruf: node werkzeuge/intromessung.js [--ziel <ordner>]
const fs=require('node:fs'),path=require('node:path');
const {pw,serve,frames,PHONE}=require('./buehne.js');
const arg=(name,def)=>{const i=process.argv.indexOf(name);return i<0?def:process.argv[i+1];};
const out=path.resolve(arg('--ziel','sichtpruefung'));
const STILLS=[['funke',.35],['montage',2.2],['karten',4.25],['ring',5.1],['einschlag',6.5],['titel',7.7]];

(async()=>{fs.mkdirSync(out,{recursive:true});const {server,url}=await serve();const browser=await pw.chromium.launch();
 const errors=[],R={};
 const page=async(query,opts={})=>{const ctx=await browser.newContext({...PHONE,reducedMotion:opts.reduced?'reduce':'no-preference'}),p=await ctx.newPage();
  p.on('pageerror',e=>errors.push(query+': '+e.message));p.on('console',m=>{if(m.type()==='error')errors.push(query+': '+m.text());});
  const t0=Date.now();await p.goto(url+query);return {ctx,p,t0};};
 const menu=p=>p.waitForFunction(()=>!document.getElementById('loading')&&!document.getElementById('intro')&&document.querySelector('#ui .hall')&&App.intro==='done',null,{timeout:30000});
 const check=(ok,msg)=>{if(!ok)errors.push(msg);};

 // 1. Ganzer Ablauf: Splash, Intro, Match-Cut ins Hauptmenü.
 {const {ctx,p,t0}=await page('?intro=1');
  await p.waitForTimeout(900);
  const dev=await p.evaluate(()=>{const im=document.querySelector('#intro .dev');return im&&{op:+getComputedStyle(im).opacity,w:im.getBoundingClientRect().width,loaded:im.complete&&im.naturalWidth===480};});
  check(dev&&dev.op>.5&&dev.loaded,'Splash sichtbar: '+JSON.stringify(dev));
  await p.waitForFunction(()=>App.intro==='intro',null,{timeout:8000});R.splash_s=+((Date.now()-t0)/1000).toFixed(2);
  check(R.splash_s>2&&R.splash_s<6,'Splash-Dauer '+R.splash_s+' s');
  await p.waitForTimeout(600);R.bildzeiten=await frames(p,3000);
  await menu(p);R.bis_menue_s=+((Date.now()-t0)/1000).toFixed(2);
  check(await p.evaluate(()=>[...document.querySelectorAll('canvas')].every(c=>c.id==='board'||c.id==='table'||c.classList.contains('hall-sparks'))),'Intro-Canvas entfernt');
  // AP 2.7 (seit 1.37.0): Die Teilchen des Hauptmenüs ruhen, solange ein Fenster darüber liegt, und laufen danach weiter.
  await p.waitForFunction(()=>!document.getElementById('intro'),null,{timeout:20000});
  const funken=await p.evaluate(async()=>{const wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(300);const a=CHH.sparkFrames;await wait(300);const frei=CHH.sparkFrames-a;
   App.vm.menu.ctx.dialogs.settings();await wait(100);const b=CHH.sparkFrames;await wait(400);const fenster=CHH.sparkFrames-b;App.close();await wait(300);const c=CHH.sparkFrames;await wait(300);
   return {frei,unter_fenster:fenster,danach:CHH.sparkFrames-c};});
  R.funken=funken;check(funken.frei>5&&funken.unter_fenster===0&&funken.danach>5,'Teilchen ruhen unter einem Fenster: '+JSON.stringify(funken));
  await ctx.close();}

 // 2. Standbilder der Akte (eingefroren, unabhängig von der Bildrate).
 {const {ctx,p}=await page('?intro=1');await p.waitForFunction(()=>window.AEI?.current);
  for(const [name,t] of STILLS){await p.evaluate(t=>AEI.current.freeze(t),t);await p.waitForTimeout(150);await p.screenshot({path:path.join(out,`intro-${name}.png`)});}
  await ctx.close();}

 // 3. Überspringen: ein Tippen beendet den Splash, ein zweites das Intro.
 {const {ctx,p}=await page('?intro=1');await p.waitForTimeout(700);await p.mouse.click(400,200);
  await p.waitForFunction(()=>App.intro==='intro',null,{timeout:3000}).catch(()=>errors.push('Tippen überspringt den Splash nicht'));
  await p.waitForTimeout(500);const t1=Date.now();await p.mouse.click(400,200);await menu(p);R.ueberspringen_s=+((Date.now()-t1)/1000).toFixed(2);
  check(R.ueberspringen_s<3,'Überspringen dauert '+R.ueberspringen_s+' s');await ctx.close();}

 // 4. Reduzierte Bewegung: nur der Splash, kein Intro.
 {const {ctx,p,t0}=await page('?intro=1',{reduced:true});let canvas=false;
  const watch=setInterval(()=>p.evaluate(()=>!!document.querySelector('#intro canvas')).then(v=>{canvas||=v;},()=>{}),100);
  await menu(p);clearInterval(watch);R.reduziert_s=+((Date.now()-t0)/1000).toFixed(2);check(!canvas,'reduzierte Bewegung ohne Intro');await ctx.close();}

 // 5. Automatisiert (Sichtprüfung, Klickpfad): ohne ?intro=1 kein Splash.
 {const {ctx,p}=await page('');await p.waitForSelector('#loading',{state:'detached',timeout:60000});
  check(await p.evaluate(()=>!document.getElementById('intro')&&App.intro==='done'),'automatisierter Lauf ohne Intro');await ctx.close();}

 R.fehler=errors;fs.writeFileSync(path.join(out,'intromessung.json'),JSON.stringify(R,null,1));console.log(JSON.stringify(R,null,1));
 await browser.close();server.close();if(errors.length)process.exitCode=1;})().catch(e=>{console.error(e);process.exit(1);});
