// Zwei unabhängige Browserprofile benutzen das fertig gepackte HTML5-Spiel und den echten Relay.
'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {execFileSync}=require('node:child_process'),{once}=require('node:events'),assert=require('node:assert/strict');
const {pw,serve}=require('./buehne'),{start}=require('../relay/server');
const version=require('../quellcode/assets/game/model/neu').version;

async function main(){
 const zip=path.resolve(process.argv[2]||('dist/Aeterna-'+version+'-HTML5.zip'));
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'aeterna-web-'));
 const android=process.argv.includes('--android');
 let browser,site,relay,device,tlsProxy;
 try{
  execFileSync('unzip',['-q',zip,'-d',tmp]);site=await serve(tmp);
  relay=start({port:0});await once(relay,'listening');
  const url='ws://127.0.0.1:'+relay.address().port;
  if(android){
   // Nur der CI-Test terminiert TLS. Die eigene Test-CA liegt ausschließlich im Wegwerf-AVD.
   const tls=require('node:tls'),net=require('node:net');
   tlsProxy=tls.createServer({cert:fs.readFileSync(process.env.AETERNA_TEST_CERT),key:fs.readFileSync(process.env.AETERNA_TEST_KEY)},socket=>{
    const upstream=net.connect(relay.address().port,'127.0.0.1');
    socket.on('error',()=>upstream.destroy());upstream.on('error',()=>socket.destroy());
    socket.on('close',()=>upstream.destroy());upstream.on('close',()=>socket.destroy());
    socket.pipe(upstream).pipe(socket);
   });
   tlsProxy.listen(0,'127.0.0.1');await once(tlsProxy,'listening');
   const port=tlsProxy.address().port;execFileSync('adb',['reverse','tcp:'+port,'tcp:'+port]);
   [device]=await pw._android.devices({omitDriverInstall:true});
   assert.ok(device,'Test-AVD ist per adb erreichbar');
  }
  browser=await pw.chromium.launch();
  const pages=[],states=[],errors=[];
  for(let i=0;i<2;i++){
   const native=android&&i===1;
   const page=native?await (await device.webView({pkg:'de.chroniken.helden.layout'},{timeout:90000})).page():
    await (await browser.newContext({viewport:i?{width:640,height:360}:{width:1100,height:650},hasTouch:!!i,reducedMotion:'reduce'})).newPage();
   pages.push(page);page.on('pageerror',e=>errors.push(e.message));
   page.on('websocket',ws=>ws.on('framereceived',({payload})=>{const m=JSON.parse(payload);if(m.type==='state')states[i]=m;}));
   if(!native)await page.goto(site.url);
   await page.waitForFunction(()=>window.App?.artReady,null,{timeout:90000});
   await page.evaluate(()=>App.vm.menu.go('free'));await page.locator('[data-cmd="friends"]').waitFor();
   if(i)await page.evaluate(()=>App.vm.setup.chooseHero('fabius'));
   await page.locator('[data-cmd="friends"]').click();
   await page.locator('#adresse').fill(native?'wss://127.0.0.1:'+tlsProxy.address().port:url);
   if(!i){await page.locator('#erstellen').click();await page.getByText(/Einladungscode [A-F0-9]{10}/).waitFor();}
   else{await page.locator('#code').fill(states[0].code);await page.locator('#beitreten').click();}
  }
  // Vergleich des öffentlichen Bretts, der Revision und der aktiven Seite nach jedem einzelnen Befehl.
  const sync=async(pred)=>{
   const end=Date.now()+20000;
   while(Date.now()<end){
    if(states[0]&&states[1]&&states[0].rev===states[1].rev&&pred(states[0],states[1])){
     assert.deepEqual(states[0].players,states[1].players);assert.equal(states[0].active,states[1].active);return;
    }
    await new Promise(r=>setTimeout(r,15));
   }
   throw Error('Zustand nicht synchron: '+states.map(s=>[s?.phase,s?.rev,s?.online].join('/')).join(' und '));
  };
  await sync(s=>s.phase==='mulligan');
  for(const page of pages){await page.locator('button.karte').first().click();await page.getByText('Starthand bestätigen',{exact:true}).click();}
  await sync(s=>s.phase==='play');let steps=0,restored=false,reconnected=false,played=0,attacked=0;
  while(states[0].phase==='play'){
   assert.ok(++steps<1200,'Partie endet');
   if(steps===5){
    const old=states[1],connections=[...relay.clients];
    assert.equal(connections.length,2);
    // Der Gast wurde zuletzt verbunden. Den Transport trennen, ohne die Gastseite neu zu laden.
    connections[1].terminate();
    await pages[0].getByText(/Partie pausiert/).waitFor();
    await sync((a,b)=>a.online.every(Boolean)&&b.online.every(Boolean));
    assert.equal(states[1].rev,old.rev);assert.deepEqual(states[1].hand,old.hand);
    assert.deepEqual(states[1].players,old.players);reconnected=true;
   }
   if(steps===9){
    const rev=states[0].rev,publicBoard=states[0].players;
    const guestUrl=pages[1].url();
    await pages[1].goto(android?'https://chroniken.local/index.html':'about:blank');
    await pages[0].getByText(/Partie pausiert/).waitFor();assert.equal(states[0].rev,rev);
    await pages[1].goto(guestUrl);
    await sync((a,b)=>a.online.every(Boolean)&&b.online.every(Boolean));
    assert.equal(states[1].rev,rev);assert.deepEqual(states[1].players,publicBoard);restored=true;
   }
   const seat=states[0].active,s=states[seat],acts=s.actions,enemy=s.players[1-seat];
   assert.equal(states[1-seat].actions.length,0);
   const face='h'+(1-seat);
   function score(a){
    if(a.type==='choose')return 1000;
    if(a.type==='play')return 100+(s.hand.find(c=>c.uid===a.uid)?.cost||0)+(a.target===face?2:0);
    if(a.type==='attack')return 70+(a.target===face?5:enemy.board.some(c=>c.uid===a.target)?2:0);
    if(a.type==='power')return 30;return 0;
   }
   const best=acts.reduce((best,a,i)=>score(a)>score(acts[best])?i:best,0),a=acts[best];
   const page=pages[seat],key=a.type+':'+(a.uid??a.index??'');
   await page.locator('[data-action="'+key+'"]').evaluate(el=>el.click());
   if(a.target || a.type==='play'&&s.players[seat].board.length&&await page.locator('[data-index="'+best+'"]').count())
    await page.locator('[data-index="'+best+'"]').evaluate(el=>el.click());
   if(a.type==='play')played++;if(a.type==='attack')attacked++;
   await sync(n=>n.rev===s.rev+1);
  }
  assert.ok(played&&attacked&&restored&&reconnected);assert.equal(states[0].winner,states[1].winner);
  for(const page of pages)await page.getByText(/Du hast gewonnen|Gegenüber hat gewonnen|Unentschieden/).waitFor();
  const rejected=await pages[0].evaluate(url=>new Promise(resolve=>{const w=new WebSocket(url);w.onopen=()=>w.send(JSON.stringify({type:'create',version:'0.0.1'}));w.onclose=e=>resolve(e.code);}),url);
  assert.equal(rejected,4001);assert.deepEqual(errors,[]);
  if(android)await pages[1].evaluate(()=>{window.aeternaDuellAbgenommen=true;});
  console.log(path.basename(zip)+' · '+(android?'Android-APK und Browser':'zwei getrennte Browserprofile')+', '+steps+' Befehle, '+played+' Karten, '+attacked+' Angriffe, Wiederaufnahme, identisches Ende. Abweichende Spielversion abgewiesen.');
 }finally{await device?.close();await browser?.close();tlsProxy?.close();relay?.close();site?.server.close();fs.rmSync(tmp,{recursive:true,force:true});}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
