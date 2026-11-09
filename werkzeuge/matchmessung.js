// Messlauf für den Match-Renderer (AP 2.4) im Handyformat (915 × 412, Pixeldichte 2,6).
// Baut ein volles Match auf – 7 Diener je Seite (seit 1.20.0 mit allen Schlüsselwörtern aus AP 3.6: Schildwall, Segen
// (bis 1.23.0 Göttliche Gunst), Starre, Tarnung, Tödliches Gift, Vermächtnis), 10 Handkarten, die alle spielbar leuchten – und misst je 3 s ohne
// und mit 4× gedrosselter CPU:
//   ruhe      – nur die Bildschleife (atmende Diener, leuchtende Karten, schimmernde Gunst)
//   gefecht   – dazu alle 250 ms Treffer, Tod und Heilung mit Partikeln, Gunst zerspringt, Starre, Gift und ein
//               Zauber-Ausbruch je Element (wie ein Schlagabtausch)
// Gemessen werden die Zeit, die R.draw je Bild braucht (Frame-Zeit), die Abstände der Bilder und wie viele Bilder die
// Schleife wirklich zeichnet. Seit 1.37.0 (AP 2.7) außerdem: der Ruhetakt (in Ruhe ≈ 90 gezeichnete Bilder in 3 s statt eines je
// Bildwechsel), die Stufe der Auflösung und Live-Schatten (shadowBlur auf der Leinwand des Bretts je Bild – muss 0 sein). Werte aus der Emulation (Desktop-Chromium ohne GPU) – auf dem Gerät mit dem FPS-Overlay
// gegenprüfen.
//
// Aufruf: node werkzeuge/matchmessung.js [--spiel <ordner>] [--ziel <ordner>]
//   --spiel  anderes Spielverzeichnis, z. B. eine ältere Version für den Vorher-Wert
//   --ziel   Ordner für matchmessung.json und den Screenshot (Standard: sichtpruefung/)
const fs=require('node:fs'),path=require('node:path');
const {pw,serve,open,PHONE}=require('./buehne.js');
const P=require('../quellcode/assets/game/model/profile.js');
const arg=(name,def)=>{const i=process.argv.indexOf(name);return i<0?def:process.argv[i+1];};
const game=path.resolve(arg('--spiel',path.join(__dirname,'../quellcode/assets/game')));
const out=path.resolve(arg('--ziel','sichtpruefung'));
// ambushSeen: Beginnt die KI und legt sie als Erstes einen Hinterhalt, erklärte sonst ein Fenster die Wachsrolle (einmal je
// Spielstand) – der Lauf wartete darauf (CI am 9. 11. 2026, Startwert zufällig).
const profile=JSON.stringify({...P.fresh(),seed:424242,helpSeen:true,ambushSeen:true});

// Volles Brett: fester Aufbau, damit vorher und nachher dasselbe gezeichnet wird.
function fill(){const s=App.profile.game,E=CHE;
 const mine=['neutral_10','neutral_4','leonidas_10','neutral_9','neutral_6','neutral_7','neutral_5'],theirs=['neutral_0','neutral_3','neutral_8','neutral_45','neutral_43','neutral_2','neutral_1'];
 for(const [p,ids] of [[0,mine],[1,theirs]]){const a=s.players[p];a.board=[];for(const id of ids)E.summon(s,p,id);
  a.board.forEach((u,i)=>{u.ready=true;u.attacks=0;u.fresh=false;if(i===1)u.shield=true;if(p===1&&i===2)u.frozen=true;if(i===3)u.taunt=true;if(i===4)u.stealth=true;if(i===5)u.poison=true;});}
 const a=s.players[0],hand=['neutral_11','neutral_12','neutral_13','neutral_14','neutral_15','neutral_16','neutral_17','neutral_18','neutral_19','neutral_20'];
 a.hand=hand.map(id=>({id,uid:'c'+s.nextId++}));a.mana=a.maxMana=10;s.players[1].hand=s.players[1].hand.slice(0,5);s.events=[];}

async function measure(page,fight){
 return page.evaluate(fight=>new Promise(res=>{const R=CHR,draw=R.draw,times=[],gaps=[];let last=performance.now(),fx=0,shadows=0,resting=0;
  // Live-Schatten: jedes shadowBlur über 0 auf dem Kontext des Bretts (Sprites malen in eigene Leinwände).
  const c=document.getElementById('board').getContext('2d'),d=Object.getOwnPropertyDescriptor(c,'shadowBlur')||Object.getOwnPropertyDescriptor(Object.getPrototypeOf(c),'shadowBlur');
  Object.defineProperty(c,'shadowBlur',{configurable:true,get(){return d.get.call(this);},set(v){if(v>0)shadows++;d.set.call(this,v);}});
  R.draw=function(...a){const t=performance.now();const r=draw.apply(this,a);times.push(performance.now()-t);if(R.pacing?.().resting)resting++;return r;};
  const s=App.profile.game,ids=[...s.players[0].board,...s.players[1].board].map(u=>u.uid),end=last+3000;
  const loop=now=>{gaps.push(now-last);last=now;
   if(fight&&now>fx){fx=now+250;const t=ids[Math.floor(Math.random()*ids.length)],u=ids[Math.floor(Math.random()*ids.length)];
    R.events([{type:'attack',target:t},{type:'damage',target:t,n:3},{type:'death',target:u},{type:'heal',target:'h0',n:2},{type:'shield',target:t},{type:'freeze',target:u},{type:'poison',target:t}],{particles:true});
    const els=['fire','frost','light','gold','earth','arcane','shadow','nature'],pos=R.positions[t]||{x:800,y:400};R.fx.push({type:'burst',element:els[Math.floor(fx/250)%8],x:pos.x,y:pos.y,seed:Math.floor(fx)%97,start:CHT.clock.now(),life:900,n:11,size:1});}
   if(now<end)requestAnimationFrame(loop);else{R.draw=draw;Object.defineProperty(c,'shadowBlur',d.get?{configurable:true,get:d.get,set:d.set}:d);const q=(d,k)=>{d=[...d].sort((a,b)=>a-b);return +d[Math.min(d.length-1,Math.floor(d.length*k))].toFixed(2);};
    const mean=d=>+(d.reduce((a,b)=>a+b,0)/d.length).toFixed(2);
    res({bilder:gaps.length,gezeichnet:times.length,frame_mittel_ms:mean(times),frame_p50_ms:q(times,.5),frame_p95_ms:q(times,.95),frame_max_ms:+Math.max(...times).toFixed(1),
     abstand_p50_ms:q(gaps,.5),abstand_p95_ms:q(gaps,.95),abstaende_ueber_20ms:gaps.filter(x=>x>20).length,
     im_ruhetakt:resting,live_schatten:shadows,aufloesung:R.scale,stufe:R.pacing?.().cap??null});}};
  requestAnimationFrame(loop);}),fight);}

(async()=>{fs.mkdirSync(out,{recursive:true});const {server,url}=await serve(game);const browser=await pw.chromium.launch();const errors=[],R={spiel:path.relative(process.cwd(),game)||'.'};
 const {ctx,page}=await open(browser,url,PHONE,errors,{init:page=>page.addInitScript(p=>{if(!sessionStorage.getItem('messung')){sessionStorage.setItem('messung','1');localStorage.setItem('chroniken.profile',p);}},profile)});
 try{
  await page.waitForFunction(()=>App.artReady!==false,null,{timeout:30000});
  await page.evaluate(()=>App.navigate('setup'));await page.waitForFunction(()=>App.screen==='setup');await page.waitForTimeout(400);
  await page.locator('#ui button',{hasText:'Duell beginnen'}).click();await page.waitForSelector('#overlay .mulligan');await page.waitForTimeout(300);
  await page.locator('#overlay button',{hasText:'Beginnen'}).click();
  await page.waitForFunction(()=>App.profile.game.phase==='play'&&App.profile.game.active===0&&!CHM.busy()&&!document.querySelector('#overlay .scrim'),null,{timeout:30000})
   .catch(async e=>{R.zustand=await page.evaluate(()=>({phase:App.profile.game?.phase,active:App.profile.game?.active,busy:CHM.busy(),fenster:App.dialog,screen:App.screen})).catch(()=>null);throw e;});
  await page.evaluate(fill);await page.waitForTimeout(1500);
  R.leinwand=await page.evaluate(()=>{const c=document.getElementById('board');return {breite:c.width,hoehe:c.height,css_breite:Math.round(c.getBoundingClientRect().width),pixeldichte:devicePixelRatio};});
  await page.screenshot({path:path.join(out,'match-voll.png')});
  const cdp=await ctx.newCDPSession(page);
  for(const rate of [1,4]){await cdp.send('Emulation.setCPUThrottlingRate',{rate});await page.waitForTimeout(500);
   R['cpu_'+rate+'x']={ruhe:await measure(page,false),gefecht:await measure(page,true)};}
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
  // Abnahme AP 2.7: in Ruhe der Ruhetakt (ohne Drosselung höchstens etwa 30 Bilder je Sekunde), nirgends Live-Schatten.
  const r1=R.cpu_1x,ruhe=r1.ruhe.gezeichnet;
  if(R.cpu_1x.ruhe.im_ruhetakt>0&&ruhe>100)errors.push('Ruhetakt: '+ruhe+' gezeichnete Bilder in 3 s Ruhe (Ziel ≈ 90)');
  if(!R.cpu_1x.ruhe.im_ruhetakt)errors.push('Ruhetakt greift in Ruhe nicht');
  for(const k of ['cpu_1x','cpu_4x'])for(const m of ['ruhe','gefecht'])if(R[k][m].live_schatten)errors.push('Live-Schatten '+k+' '+m+': '+R[k][m].live_schatten);
 }catch(e){errors.push('Messlauf: '+e.message.split('\n')[0]);}
 R.fehler=errors;fs.writeFileSync(path.join(out,'matchmessung.json'),JSON.stringify(R,null,1));console.log(JSON.stringify(R,null,1));
 await browser.close();server.close();if(errors.length)process.exitCode=1;})().catch(e=>{console.error(e);process.exit(1);});
