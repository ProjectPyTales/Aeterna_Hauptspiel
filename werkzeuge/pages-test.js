// Prüft das gepackte HTML5-Spiel so, wie GitHub Pages es ausliefert: unter dem Projektpfad /Aeterna_Hauptspiel/.
// Jede Datei muss relativ geladen werden. Eine Anfrage außerhalb des Pfads oder eine fehlende Datei lässt den Test scheitern.
'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),http=require('node:http');
const {execFileSync}=require('node:child_process'),{once}=require('node:events'),assert=require('node:assert/strict');
const {pw,PHONE}=require('./buehne');
const version=require('../quellcode/assets/game/model/neu').version;
const BASE='/Aeterna_Hauptspiel/';
const TYPES={'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp',
 '.jpg':'image/jpeg','.ogg':'audio/ogg','.ttf':'font/ttf','.json':'application/json','.svg':'image/svg+xml'};

// Wie Pages: nur der Projektpfad existiert, „/Aeterna_Hauptspiel“ leitet auf den Pfad mit Schrägstrich um.
function serve(root){
 const outside=[];
 const server=http.createServer((req,res)=>{
  const url=decodeURIComponent(req.url.split('?')[0]);
  if(url===BASE.slice(0,-1)){res.writeHead(301,{Location:BASE});res.end();return;}
  if(!url.startsWith(BASE)){outside.push(url);res.writeHead(404);res.end();return;}
  const p=path.join(root,url.slice(BASE.length).replace(/^$/,'index.html'));
  if(!p.startsWith(root)){res.writeHead(403);res.end();return;}
  fs.readFile(p,(e,d)=>{if(e){res.writeHead(404);res.end();return;}
   res.writeHead(200,{'Content-Type':TYPES[path.extname(p)]||'application/octet-stream'});res.end(d);});
 });
 return new Promise(r=>server.listen(0,'127.0.0.1',()=>r({server,outside,origin:'http://localhost:'+server.address().port})));
}

async function main(){
 const zip=path.resolve(process.argv[2]||('dist/Aeterna-'+version+'-HTML5.zip'));
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'aeterna-pages-'));
 let browser,site;
 try{
  execFileSync('unzip',['-q',zip,'-d',tmp]);
  assert.ok(fs.existsSync(path.join(tmp,'index.html')),'index.html liegt an der Wurzel des ZIP');
  // Grenzen von GitHub Pages: höchstens 1 GB Seite, keine Datei über 100 MB.
  let total=0;
  for(const f of fs.readdirSync(tmp,{recursive:true})){const s=fs.statSync(path.join(tmp,f));if(s.isFile()){total+=s.size;assert.ok(s.size<100e6,f);}}
  assert.ok(total<1e9,'Seite unter 1 GB');
  site=await serve(tmp);
  browser=await pw.chromium.launch();
  const page=await (await browser.newContext({...PHONE,reducedMotion:'reduce'})).newPage();
  const errors=[],failed=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)failed.push(r.status()+' '+r.url());});
  // Beim Seitenwechsel bricht der Browser laufende Vorabladungen ab (ERR_ABORTED). Das ist kein fehlender Inhalt.
  page.on('requestfailed',r=>{const e=r.failure()?.errorText;if(e!=='net::ERR_ABORTED')failed.push(e+' '+r.url());});
  await page.goto(site.origin+BASE.slice(0,-1));
  assert.equal(new URL(page.url()).pathname,BASE,'Umleitung auf den Projektpfad');
  await page.waitForFunction(()=>window.App?.artReady,null,{timeout:90000});
  assert.equal(await page.evaluate(()=>AENEU.version),version,'ausgelieferte Version');
  await page.evaluate(()=>App.vm.menu.go('free'));
  await page.locator('[data-cmd="friends"]').click();
  await page.locator('#adresse').waitFor();
  assert.ok(new URL(page.url()).pathname.startsWith(BASE),'Privates Duell bleibt im Projektpfad: '+page.url());
  await page.goBack();
  await page.waitForFunction(()=>window.App?.artReady,null,{timeout:90000});
  assert.deepEqual(site.outside,[],'Anfragen außerhalb von '+BASE);
  assert.deepEqual(failed,[],'fehlgeschlagene Anfragen');
  assert.deepEqual(errors,[],'Fehler auf der Seite');
  console.log(`GitHub-Pages-Pfad ${BASE}: ${version} geladen, Privates Duell erreichbar, ${(total/1e6).toFixed(1)} MB, keine fehlenden Dateien.`);
 }finally{
  await browser?.close();site?.server.close();fs.rmSync(tmp,{recursive:true,force:true});
 }
}
main().catch(e=>{console.error(e);process.exit(1);});
