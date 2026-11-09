// Automatische Sichtprüfung (AP 2.6) und Abnahme von AP 2.3 / AP 0.1, im Handyformat (915 × 412, Pixeldichte 2,6).
// Klickpfad wie ein Spieler: Hauptmenü → Basar (Reiter, Schaufenster, Kauf, Ausrüsten) → Sammlung (Suche) → Herausforderung →
// Starthand → Match → Pause → Aufgeben → Ergebnis → Hauptmenü → Kampagnenkarte (seit 1.19.0) mit Szene (seit 1.31.0) und Kartenrätsel (seit 1.33.0) → Kolosseum als Draft (seit 1.29.0).
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
// Seit 1.34.0 bietet das Hauptmenü einem neuen Spielstand die Lehrstunden an; der Klickpfad blendet sie zuerst aus und prüft sie am Ende.
const profile=JSON.stringify({...P.fresh(),seed:424242,helpSeen:true,tutorial:{done:[],skipped:true}});

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

// Basar (AP 0.1, AP 2.3, seit 1.19.0 als Schaufenster nach AP 1.4): Reiter Schlachtfelder, Auswahl links ganz nach unten
// scrollen, den Tisch aufs Podest legen, kaufen, ausrüsten.
async function basar(page,cmpPage,cdp){
 await tapHall(page,C(238,936));await waitScreen(page,'packs');
 await shot(page,cmpPage,'02-basar-kartenruecken');
 check('Basar öffnet auf dem Reiter Kartenrücken',await page.evaluate(()=>document.querySelector('.stone-tab.active')?.textContent.trim())==='Kartenrücken');
 await page.locator('.stone-tab',{hasText:'Schlachtfelder'}).click();await settle(page,100);
 await page.evaluate(()=>{const b=document.querySelector('.shop-list');b.scrollTop=b.scrollHeight;});await settle(page,50);
 await page.locator('.shop-tile',{hasText:'Meißner Porzellan'}).locator('.shop-pick').click();await settle(page,100);
 check('Antippen legt den Tisch aufs Podest (AP 1.4)',await page.evaluate(()=>document.querySelector('.plaque-info h2')?.textContent.trim())==='Meißner Porzellan');
 const before=await page.evaluate(()=>{const b=document.querySelector('.shop-list');
  document.querySelectorAll('#ui img,#ui *').forEach(i=>{i.__vorher=1;});return {scroll:Math.round(b.scrollTop),bilder:document.querySelectorAll('#ui img').length,gold:App.profile.gold};});
 check('Schlachtfelder lassen sich scrollen',before.scroll>0,before);
 await shot(page,cmpPage,'03-basar-schlachtfelder');
 await page.locator('.plaque-info button',{hasText:'Kaufen'}).click();await settle(page,100);
 await shot(page,cmpPage,'04-basar-kauf-bestaetigen');
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 const frame=await longestFrame(page,()=>page.locator('#overlay button',{hasText:'Für 100 Gold kaufen'}).click());
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
 const after=await page.evaluate(()=>{const b=document.querySelector('.shop-list');const imgs=[...document.querySelectorAll('#ui img')];
  const all=[...document.querySelectorAll('#ui *')];
  return {scroll:Math.round(b.scrollTop),reiter:document.querySelector('.stone-tab.active')?.textContent.trim(),gold:App.profile.gold,neueBilder:imgs.filter(i=>!i.__vorher).length,bilder:imgs.length,
   neueElemente:all.filter(e=>!e.__vorher).length,elemente:all.length};});
 check('Kauf zieht 100 Gold ab',after.gold===before.gold-100,{vorher:before.gold,nachher:after.gold});
 check('Reiter bleibt nach dem Kauf (AP 0.1)',after.reiter==='Schlachtfelder',after.reiter);
 check('Scrollposition bleibt nach dem Kauf (AP 0.1)',Math.abs(after.scroll-before.scroll)<=1,{vorher:before.scroll,nachher:after.scroll});
 check('Keine Bilder neu erzeugt (AP 2.3)',after.neueBilder===0,{neu:after.neueBilder,gesamt:after.bilder});
 await shot(page,cmpPage,'05-basar-nach-kauf');
 const frame2=await longestFrame(page,()=>page.locator('.plaque-info button',{hasText:'Ausrüsten'}).click());
 const equip=await page.evaluate(()=>{const b=document.querySelector('.shop-list');return {scroll:Math.round(b.scrollTop),neueBilder:[...document.querySelectorAll('#ui img')].filter(i=>!i.__vorher).length,
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
   // Sammlung (seit 1.35.0): Raster der Decks; ein Deck öffnet den Deckbau in zwei Spalten, die Suche tippt in ein Feld, das seinen Fokus behält.
   await tapHall(page,C(1812,714));await waitScreen(page,'collection');
   check('Sammlung: Raster der Decks mit Neues Deck',await page.evaluate(()=>document.querySelectorAll('.deck-tile').length===App.profile.decks.length+1));
   await shot(page,cmpPage,'06-sammlung');
   await page.locator('.deck-tile[data-a="leonidas"]').click();await settle(page,150);
   const zwei=await page.evaluate(()=>({plaetze:document.querySelectorAll('.deck-slot').length,belegt:document.querySelectorAll('.deck-slot:not(.empty)').length,raster:document.querySelectorAll('.pool-grid .collect-card').length}));
   check('Deckbau: links 30 Plätze, rechts das Kartenraster',zwei.plaetze===30&&zwei.belegt===30&&zwei.raster>0,zwei);
   await page.locator('#search').click();await page.keyboard.type('Wache',{delay:30});await settle(page,100);
   const search=await page.evaluate(()=>({fokus:document.activeElement?.id,wert:document.getElementById('search').value,karten:document.querySelectorAll('.pool-grid .collect-card').length}));
   check('Suche: Feld behält Fokus und Text (AP 2.3)',search.fokus==='search'&&search.wert==='Wache'&&search.karten>0,search);
   await shot(page,cmpPage,'07-sammlung-suche');
   await page.locator('#ui button',{hasText:'Zurück'}).click();await settle(page,100);
   check('Zurück im Deckbau führt zur Deckübersicht',await page.evaluate(()=>!!document.querySelector('.deck-grid')));
   await page.locator('#ui button',{hasText:'Zurück'}).click();await waitScreen(page,'menu');
   // Herausforderung → Starthand → Match.
   await tapHall(page,C(996,800));await waitScreen(page,'setup');await shot(page,cmpPage,'08-herausforderung');
   await page.locator('#ui button',{hasText:'Duell beginnen'}).click();await waitScreen(page,'game');
   await page.waitForSelector('#overlay .mulligan');await settle(page,200);
   const mull=await page.evaluate(()=>{document.querySelectorAll('#overlay img').forEach(i=>{i.__vorher=1;});return document.querySelectorAll('.mulligan-card').length;});
   await page.locator('.mulligan-card').first().click();await settle(page,50);
   const toggled=await page.evaluate(()=>({markiert:document.querySelectorAll('.mulligan-card.replace').length,neueBilder:[...document.querySelectorAll('#overlay img')].filter(i=>!i.__vorher).length}));
   check('Starthand: Auswahl ohne neue Bilder (AP 2.3)',toggled.markiert===1&&toggled.neueBilder===0,{karten:mull,...toggled});
   // AP 3.8: Startbefehle als Schriftrollen (zwei Stäbe je Karte) neben dem Deck; bei reduzierter Bewegung ohne Intro.
   const rollen=await page.evaluate(()=>({staebe:document.querySelectorAll('.mulligan-card .rod').length,deck:!!document.querySelector('.mulligan-deck')}));
   check('Starthand: Schriftrollen und Deck (AP 3.8)',rollen.staebe===2*mull&&rollen.deck,rollen);
   await shot(page,cmpPage,'09-starthand');
   await page.locator('.mulligan-card').first().click();
   await page.locator('#overlay button',{hasText:'Beginnen'}).click();
   await page.waitForFunction(()=>App.profile.game.phase==='play'&&App.profile.game.active===0&&!CHM.busy()&&!document.querySelector('#overlay .scrim'),null,{timeout:30000});
   await settle(page,700);await shot(page,cmpPage,'10-match');
   // AP 3.9 (seit 1.32.0): ein Eck-Diorama antippen – der Chronist erzählt mit Quelle; ein Tippen auf den Tisch schließt die Blase.
   await tapHall(page,[56,50]);await settle(page,100);
   check('Eck-Diorama: Astrolabium mit Zeile des Chronisten und Quelle',await page.evaluate(()=>App.view.bubble?.title==='Astrolabium'&&/Synesios/.test(App.view.bubble.source)));
   await tapHall(page,[800,330]);await settle(page,60);check('Tippen schließt die Blase',await page.evaluate(()=>!App.view.bubble));
   await page.keyboard.press('Escape');await page.waitForSelector('#overlay .modal');await shot(page,cmpPage,'11-pause');
   await page.locator('#overlay button',{hasText:'Aufgeben'}).click();await page.waitForSelector('#overlay .modal');
   await page.locator('#overlay button',{hasText:'Aufgeben'}).click();await page.waitForSelector('#overlay .result');await settle(page,200);
   check('Aufgeben endet als Niederlage',await page.evaluate(()=>App.profile.game.phase==='over'&&App.profile.game.winner===1));
   const lohn=await page.evaluate(()=>({banner:document.querySelector('.result-banner')?.textContent,balken:document.querySelectorAll('.reward-bar').length}));
   check('Ergebnis: Banner und Fortschrittsbalken (AP 3.8)',lohn.banner==='NIEDERLAGE'&&lohn.balken>=4,lohn);
   await shot(page,cmpPage,'12-ergebnis');
   await page.locator('#overlay button',{hasText:'Zum Hauptmenü'}).click();await waitScreen(page,'menu');
   check('Zurück im Hauptmenü',await screen(page)==='menu');
   // Kampagnenkarte (AP 1.7): Stationen auf der Weltkarte, Antippen öffnet die Mission rechts.
   await page.evaluate(()=>App.navigate('campaign'));await waitScreen(page,'campaign');
   const map=await page.evaluate(()=>({stationen:document.querySelectorAll('.station').length,karte:document.querySelector('.map-art')?.naturalWidth||0}));
   check('Kampagnenkarte: 22 Stationen auf der Karte',map.stationen===22&&map.karte>0,map);
   await shot(page,cmpPage,'13-kampagne');
   check('Kampagne 2.0: Kapitel-Leiste mit sechs Kapiteln und Epilog, Kapitel I offen',await page.evaluate(()=>document.querySelectorAll('.chapter-seal').length===7&&document.querySelector('.chapter-seal.current')?.dataset.a==='steppe'));
   await page.locator('.station',{hasText:'02'}).click();await settle(page,100);
   check('Station öffnet ihre Mission',await page.evaluate(()=>document.querySelector('.mission-panel h2')?.textContent.trim()===CHD.missions[AEKA.ORDER[1]].title));
   // Kampagne 2.0 (AP 6.4, seit 1.31.0): vor der ersten Mission eines Kapitels die Story-Szene mit Sprechblase und Quelle.
   await page.locator('.station',{hasText:'01'}).click();await settle(page,100);
   await page.locator('#ui button',{hasText:'Mission vorbereiten'}).click();await page.waitForSelector('#overlay .scene');await settle(page,150);
   const szene=await page.evaluate(()=>({sprecher:document.querySelectorAll('.speaker').length,wartend:document.querySelectorAll('.speaker.waiting').length,blase:document.querySelector('.speech.narration b')?.textContent,jahre:document.querySelector('.scene-years')?.textContent,quelle:!!document.querySelector('.scene-source')}));
   // Seit 1.32.0 (Rückmeldung zu 1.31.0): der Chronist erzählt, die drei Helden warten als Schattenrisse, Zeitspanne im Titel.
   check('Szene: Chronist erzählt, drei Helden als Schattenrisse, Zeitspanne und Quelle',szene.sprecher===3&&szene.wartend===3&&/Der Chronist$/.test(szene.blase||'')&&szene.jahre==='um 2650 – 500 v. Chr.'&&szene.quelle,szene);
   await shot(page,cmpPage,'18-szene');
   await page.locator('#overlay button',{hasText:'Weiter'}).click();await settle(page,100);
   check('Szene blättert zur Fürstin von Vix mit Ort und Zeit',await page.evaluate(()=>document.querySelector('.speech b')?.textContent==='Fürstin von Vix'&&document.querySelector('.scene-cue')?.textContent==='Mont Lassois · um 500 v. Chr.'&&document.querySelectorAll('.speaker.waiting').length===2));
   await page.locator('#overlay button',{hasText:'Überspringen'}).click();await waitScreen(page,'setup');
   check('Nach der Szene die Heldenwahl der Mission',await page.evaluate(()=>App.screen==='setup'&&App.profile.scenes.includes('steppe')));
   await page.evaluate(()=>App.navigate('campaign'));await waitScreen(page,'campaign');
   // Kartenrätsel (AP 6.4 Teil 2, seit 1.33.0): nach dem Kapitel die Lage, dann das feste Brett mit der Tafel „Gewinne in diesem Zug“.
   check('Kartenrätsel: im Panel versiegelt, solange das Kapitel offen ist',await page.evaluate(()=>!!document.querySelector('.riddle-note')&&!document.querySelector('.riddle-note.open')));
   await page.evaluate(()=>{App.profile.campaign.push(21,2,12);App.navigate('campaign');});await settle(page,150);
   await page.locator('.chapter-seal[data-a="steppe"]').click();await settle(page,100);
   await page.locator('.riddle-note button').click();await page.waitForSelector('#overlay .riddle');await settle(page,150);
   check('Kartenrätsel: Lage mit Ort, Zeit, Ziel und Quelle',await page.evaluate(()=>document.querySelector('.riddle h2')?.textContent==='Der Kanal von Auaris'&&/Auaris · um 1550 v\. Chr\./.test(document.querySelector('.riddle .scene-years')?.textContent||'')&&!!document.querySelector('.riddle-goal')&&!!document.querySelector('.riddle .scene-source')));
   await shot(page,cmpPage,'19-raetsel');
   await page.locator('#overlay button',{hasText:'Rätsel beginnen'}).click();await waitScreen(page,'game');await settle(page,300);
   check('Kartenrätsel: festes Brett, Dein Zug, keine Starthand',await page.evaluate(()=>{const s=App.profile.game;return s.puzzle==='auaris'&&s.phase==='play'&&s.active===0&&s.players[0].hand.length===3&&!document.querySelector('#overlay .mulligan');}));
   await shot(page,cmpPage,'20-raetsel-brett');
   await page.evaluate(()=>App.navigate('campaign'));await waitScreen(page,'campaign');
   await page.locator('#ui button',{hasText:'Zurück'}).click();await waitScreen(page,'menu');
   // Kolosseum als Draft (AP 6.1, seit 1.29.0): Eintritt → Probelauf → Held aus drei Epochen → erste Kartenwahl.
   await tapHall(page,C(996,661));await waitScreen(page,'draft');
   check('Kolosseum: Eintritt mit Probelauf und Belohnungstafel',await page.evaluate(()=>!!document.querySelector('.arena-gate')&&document.querySelectorAll('.prize-table tr').length===4));
   await shot(page,cmpPage,'14-kolosseum');
   await page.locator('#ui button',{hasText:'Probelauf beginnen'}).click();await settle(page,100);
   const held=await page.evaluate(()=>({helden:document.querySelectorAll('.hero-pick').length,epochen:new Set(App.profile.draft.heroes.map(h=>CHD.heroById[h].age)).size}));
   check('Kolosseum: drei Helden aus drei Epochen',held.helden===3&&held.epochen===3,held);
   await shot(page,cmpPage,'15-kolosseum-held');
   await page.locator('.hero-pick').first().click();await settle(page,100);
   await page.locator('.option-card').nth(1).click();await settle(page,100);
   const wahl=await page.evaluate(()=>({karten:document.querySelectorAll('.option-card').length,gewaehlt:App.profile.draft.picks.length,deck:document.querySelectorAll('.draft-deck .deckrow').length}));
   check('Kolosseum: Wahl aus drei, die Karte liegt im Deck',wahl.karten===3&&wahl.gewaehlt===1&&wahl.deck===1,wahl);
   await shot(page,cmpPage,'16-kolosseum-wahl');
   await page.locator('#ui button',{hasText:'Zurück'}).click();await waitScreen(page,'menu');
   check('Hauptmenü zeigt den Stand des Laufs',await page.evaluate(()=>/1 von 30 Karten/.test(App.vm.menu.view.plates[2].sub)));
   // Aufgaben (AP 6.3, seit 1.30.0): Tagesgeschenk mit sieben Siegeln, drei Tagesaufgaben – eine zum Lernen –, Erfolge.
   check('Hauptmenü: Aufgaben melden das Tagesgeschenk',await page.evaluate(()=>App.vm.menu.view.quests>=1));
   await tapHall(page,C(537,716));await page.waitForSelector('#overlay .quests');await settle(page,150);
   const auf=await page.evaluate(()=>({karten:document.querySelectorAll('.quest-card').length,lernen:document.querySelectorAll('.quest-card.learn').length,siegel:document.querySelectorAll('.gift-day').length,bereit:!!document.querySelector('.gift-day.ready'),erfolge:document.querySelectorAll('.feat-grid .quest-row').length}));
   check('Aufgaben: Tagesgeschenk, drei Tagesaufgaben (eine zum Lernen) und vier Erfolge',auf.karten===3&&auf.lernen===1&&auf.siegel===7&&auf.bereit&&auf.erfolge===4,auf);
   await shot(page,cmpPage,'17-aufgaben');
   // AP 2.7 (seit 1.37.0): Unter einem Fenster ruhen die Teilchen des Hauptmenüs (ohne reduzierte Bewegung laufen sie sonst).
   const funken=await page.evaluate(async()=>{const a=CHH.sparkFrames;await new Promise(r=>setTimeout(r,400));return {an:a>0,unter_fenster:CHH.sparkFrames-a};});
   check('Hauptmenü: Teilchen ruhen unter einem Fenster',!funken.an||funken.unter_fenster===0,funken);
   const vorher=await page.evaluate(()=>App.profile.gold);await page.locator('.quest-gift button',{hasText:'Abholen'}).click();await settle(page,100);
   const geschenk=await page.evaluate(v=>({gold:App.profile.gold-v,knopf:document.querySelector('.quest-gift button')?.textContent.trim(),serie:App.profile.login.streak}),vorher);
   check('Tagesgeschenk: Tag 1 bringt 20 Gold, dann „Morgen wieder“',geschenk.gold===20&&geschenk.knopf==='Morgen wieder'&&geschenk.serie===1,geschenk);
   await page.keyboard.press('Escape');await settle(page,100);
   // Lehrstunden (AP 6.5, seit 1.34.0): die vierte Platte bietet sie an, der Dialog zeigt drei, das Brett die Tafel des Chronisten.
   await page.evaluate(()=>{App.profile.tutorial.skipped=false;App.profile.game=null;App.store.commit();});await settle(page,150);
   check('Hauptmenü: vierte Platte bietet die Lehrstunde an',await page.evaluate(()=>App.vm.menu.view.plates[3].go==='lesson'&&!!document.querySelector('.plate[data-a="lesson"]')));
   await tapHall(page,C(996,800));await page.waitForSelector('#overlay .lessons');await settle(page,150);
   check('Lehrstunden: drei Siegel, die erste ist die nächste',await page.evaluate(()=>document.querySelectorAll('.lesson-card').length===3&&document.querySelector('.lesson-card.next h3')?.textContent==='Die erste Schlacht'));
   await page.evaluate(()=>document.getElementById('toast').classList.remove('show'));await settle(page,250);
   await shot(page,cmpPage,'21-lehrstunden');
   await page.locator('.lesson-card.next button').click();await waitScreen(page,'game');await settle(page,400);
   check('Lehrstunde: festes Brett, Dein Zug, der Chronist zeigt Schritt 1',await page.evaluate(()=>{const s=App.profile.game,k=AETU.coach(s);return s.lesson?.id==='schlacht'&&s.phase==='play'&&s.active===0&&k.step===1&&k.card==='leonidas_0'&&!document.querySelector('#overlay .mulligan');}));
   await shot(page,cmpPage,'22-lehrstunde');
   // AP 2.7: der goldene Ring der Lehrstunde ist ein Sprite – kein shadowBlur auf der Leinwand des Bretts; in Ruhe der Ruhetakt.
   // Gezählt wird erst, wenn der Ruhetakt gilt (nach dem letzten Ereignis läuft noch 2 s der volle Takt): 2 s → etwa 60 Bilder.
   await page.waitForFunction(()=>CHR.pacing?.().resting,null,{timeout:10000});
   const ring=await page.evaluate(()=>new Promise(res=>{const c=document.getElementById('board').getContext('2d'),d=Object.getOwnPropertyDescriptor(c,'shadowBlur');let n=0,f=0;const draw=CHR.draw;
    Object.defineProperty(c,'shadowBlur',{configurable:true,get(){return d.get.call(this);},set(v){if(v>0)n++;d.set.call(this,v);}});CHR.draw=function(...a){f++;return draw.apply(this,a);};
    setTimeout(()=>{CHR.draw=draw;Object.defineProperty(c,'shadowBlur',d);res({schatten:n,bilder_2s:f,ruhe:CHR.pacing().resting,ebene:CHR.layered&&getComputedStyle(document.getElementById('table')).display});},2000);}));
   check('Lehrstunde: Ring ohne Live-Schatten, Tisch als eigene Ebene, Ruhetakt',ring.schatten===0&&ring.bilder_2s>0&&ring.bilder_2s<=72&&ring.ruhe&&ring.ebene==='block',ring);
   // Einstellungen (Phase 7): Reiter „Anzeige“; Farben bei Farbsehschwäche und große Schrift wirken sofort.
   await page.keyboard.press('Escape');await page.waitForSelector('#overlay .modal');await page.locator('#overlay button',{hasText:'Einstellungen'}).click();await page.waitForSelector('#overlay .settings');
   await page.locator('#overlay .stone-tab',{hasText:'Anzeige'}).click();await settle(page,100);
   await page.locator('#overlay select[data-a="text"]').selectOption('gross');await page.locator('#overlay select[data-a="colors"]').selectOption('klar');await settle(page,150);
   check('Einstellungen: große Schrift und klare Farben am Wurzelelement',await page.evaluate(()=>document.documentElement.classList.contains('text-gross')&&document.documentElement.classList.contains('colors-klar')&&App.profile.settings.colors==='klar'));
   await shot(page,cmpPage,'23-einstellungen');
   await page.locator('#overlay select[data-a="text"]').selectOption('normal');await page.locator('#overlay select[data-a="colors"]').selectOption('normal');
   await page.locator('#overlay button',{hasText:'Fertig'}).click();await settle(page,100);
   // Automatische Updates (seit 1.36.0): im Browser nur der Hinweis in Einstellungen → Daten; das Fenster „Neue Version“
   // mit eingespieltem Zustand der Hülle (verfügbar → lädt → Fehler), ohne Referenzbild.
   check('Updates: im Browser keine Suche',await page.evaluate(()=>!App.updates.supported&&App.updates.started&&App.updates.state.state==='idle'));
   await page.evaluate(()=>App.vm.game.ctx.dialogs.settings());await page.waitForSelector('#overlay .settings');
   await page.locator('#overlay .stone-tab',{hasText:'Daten'}).click();await settle(page,100);
   check('Updates: Einstellungen → Daten nennt Version und die Android-App',await page.evaluate(()=>/Automatische Updates gibt es in der Android-App/.test(document.querySelector('#overlay .update-block')?.textContent||'')));
   await page.keyboard.press('Escape');await settle(page,100);
   const neu=await page.evaluate(async()=>{const u=App.updates,base={installed:'1.36.0',version:'9.9.9',notes:'Neue Karten und ein Fest.',size:13*1048576};
    u.receive({state:'available',...base});u.show();await new Promise(r=>setTimeout(r,60));const m=document.querySelector('#overlay .modal.update'),a={titel:m?.querySelector('h2')?.textContent,neu:m?.querySelector('.update-notes p')?.textContent,knoepfe:[...(m?.querySelectorAll('button')||[])].map(b=>b.textContent.trim())};
    u.receive(JSON.stringify({state:'downloading',...base,progress:.5,step:'Wird geladen …'}));await new Promise(r=>setTimeout(r,60));a.balken=document.querySelector('#overlay .update-track')?.getAttribute('aria-valuenow');
    u.receive({state:'failed',...base,message:'Prüfsumme stimmt nicht.'});await new Promise(r=>setTimeout(r,60));a.fehler=document.querySelector('#overlay .modal.update p')?.textContent;
    App.back();await new Promise(r=>setTimeout(r,60));a.zu=!document.querySelector('#overlay .modal.update');u.receive({state:'idle'});return a;});
   check('Updates: Fenster „Neue Version“ mit Neuem, Fortschritt und Fehler, Zurück schließt',neu.titel==='Neue Version verfügbar'&&neu.neu==='Neue Karten und ein Fest.'&&neu.knoepfe.join('|')==='Später|Jetzt aktualisieren'&&neu.balken==='50'&&neu.fehler==='Prüfsumme stimmt nicht.'&&neu.zu,neu);
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
