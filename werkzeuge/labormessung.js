// Messreihe des Renderer-Labors (AP 2.5) im Handyformat: Canvas 2D gegen PixiJS (WebGL), je Szene 3 s.
// Aufruf: node werkzeuge/labormessung.js [--ziel <ordner>] [--cpu 4]
// Achtung: Headless-Chromium hat keine GPU – WebGL läuft dort in SwiftShader auf der CPU. Die Werte zeigen, ob das Labor
// funktioniert und wie teuer die Wege für die CPU sind; die Entscheidung fällt mit der Messung auf dem Gerät.
const fs=require('node:fs'),path=require('node:path');
const {pw,serve,PHONE}=require('./buehne.js');
const arg=(name,def)=>{const i=process.argv.indexOf(name);return i<0?def:process.argv[i+1];};
const out=path.resolve(arg('--ziel','sichtpruefung')),cpu=+arg('--cpu',1);
(async()=>{fs.mkdirSync(out,{recursive:true});const {server,url}=await serve();const browser=await pw.chromium.launch();const errors=[];
 const ctx=await browser.newContext(PHONE),page=await ctx.newPage();
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 if(cpu>1)await (await ctx.newCDPSession(page)).send('Emulation.setCPUThrottlingRate',{rate:cpu});
 await page.goto(url+'labor/renderer.html?auto=1');
 let R={};try{await page.waitForFunction(()=>window.__labor?.ergebnisse,null,{timeout:180000});R=await page.evaluate(()=>window.__labor);
  await page.screenshot({path:path.join(out,'labor.png')});}catch(e){errors.push('Labor: '+e.message.split('\n')[0]);}
 R.cpu=cpu;R.fehler=errors;fs.writeFileSync(path.join(out,'labormessung'+(cpu>1?'-cpu'+cpu+'x':'')+'.json'),JSON.stringify(R,null,1));console.log(JSON.stringify(R,null,1));
 await browser.close();server.close();if(errors.length)process.exitCode=1;})().catch(e=>{console.error(e);process.exit(1);});
