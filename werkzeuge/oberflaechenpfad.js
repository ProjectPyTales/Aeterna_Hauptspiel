// Abnahme U05–U13. Aufruf: node werkzeuge/oberflaechenpfad.js [Bildordner]
// Eigene Browserkontexte und feste Spielstände: zwei Angriffsziele und Gorgo in einer Belagerung.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {pw, open, serve, stagePoint} = require('./buehne.js');
const P = require('../quellcode/assets/game/model/profile.js');
const out = path.resolve(process.argv[2] || 'sichtpruefung/oberflaeche');
const sizes = {handy:[640,360], tablet:[1024,768]};

async function exercise(browser, url, name, [width,height]) {
 const errors = [];
 const profile = {...P.fresh(), seed:424242, helpSeen:true, campaign:[21,2,12]};
 const device = {viewport:{width,height}, deviceScaleFactor:2, hasTouch:true, isMobile:name==='handy'};
 const {page,ctx} = await open(browser,url,device,errors,{reduced:true,init:async p=>{
  await p.clock.setFixedTime(new Date('2026-10-06T12:00:00Z'));
  await p.addInitScript(data=>localStorage.setItem('chroniken.profile',data),JSON.stringify(profile));
 }});
 const shot = async id=>{
  await page.screenshot({path:path.join(out,name+'-'+id+'.png')});
  console.log(name,id);
 };
 const go = async (screen,arg)=>{
  await page.evaluate(([s,a])=>App.navigate(s,a),[screen,arg]);
  await page.waitForFunction(s=>App.screen===s&&!App.ui.busy(),screen);
 };
 const click = selector=>page.locator(selector).first().click();
 try {
  await page.waitForFunction(()=>App.artReady);
  await go('packs','backs');await click('.stone-tab[data-a="skins"]');await page.waitForSelector('.shop-coin');
  await click('.stone-tab[data-a="boards"]');await click('.shop-tile:last-child .shop-pick');
  await shot('basar');
  await go('collection');await click('.deck-tile[data-a="leonidas"]');await click('.knob[data-b="2"]');
  assert.equal(await page.locator('.knob.on').getAttribute('data-b'),'2');await shot('sammlung');
  await click('#ui [data-cmd="back"]');await go('draft');await shot('arena');
  await click('[data-cmd="start"]');await click('.hero-pick');await click('.option-card');
  assert.equal(await page.evaluate(()=>App.profile.draft.picks.length),1);await shot('draft');
  for(let n=1;n<30;n++)await click('.option-card');
  await page.waitForSelector('.draft-run');
  await page.evaluate(()=>{Object.assign(App.profile.draft,{wins:2,losses:1,games:3});App.store.commit();});
  await page.waitForSelector('.shield.on');assert.equal(await page.locator('.laurel.on').count(),2);
  await shot('sand');
  await go('campaign');await click('[data-cmd="quests"]');await page.waitForSelector('.quest-card.learn');await shot('aufgaben');
  await page.keyboard.press('Escape');await click('.chapter-seal[data-a="steppe"]');await shot('karte');
  await click('[data-cmd="replay"]');await page.waitForSelector('.speech.narration');await shot('chronist');
  await click('.scene [data-cmd="next"]');assert.equal(await page.locator('.speaker.speaking').count(),1);
  await shot('szene');
  const speaker=await page.locator('.speaker.speaking').getAttribute('data-key');
  await click('.scene [data-cmd="next"]');
  assert.notEqual(await page.locator('.speaker.speaking').getAttribute('data-key'),speaker);
  await click('.scene [data-cmd="done"]');
  // Fünf Münzen mit echten Spielporträts im regulären Szenendialog.
  await page.evaluate(()=>{
   const ctx=App.vm.campaign.ctx,chapter=AEKA.CHAPTERS[0];
   const scene=['fuhao','imhotep','amanirenas','hypatia','leonidas'].map(who=>({who,text:CHD.heroById[who].name}));
   App.ui.dialog('scene',new AEVM.Scene(ctx,{chapter:{...chapter,scene}}));
  });
  const portraits=await page.locator('.cast .coin-face').evaluateAll(els=>els.map(e=>{
   const {left,right}=e.getBoundingClientRect();return {left,right};
  }));
  assert.equal(portraits.length,5);
  assert.ok(portraits.every((p,i)=>p.left>=0&&p.right<=width&&(!i||p.left>portraits[i-1].right)));
  await click('.scene [data-cmd="done"]');
  await click('.riddle-note button');assert.equal(await page.locator('.riddle h2').textContent(),'Der Kanal von Auaris');
  assert.match(await page.locator('.riddle-goal').textContent(),/Gewinne in diesem Zug/);await shot('raetsel');
  await page.getByRole('button',{name:'Rätsel beginnen'}).click();await page.waitForFunction(()=>App.profile.game.puzzle==='auaris'&&App.screen==='game');
  await shot('raetsel-brett');
  await page.evaluate(()=>App.vm.game.ctx.dialogs.lessons());await page.waitForSelector('.lesson-card.next');await shot('lehrstunden');
  await click('.lesson-card.next button');await page.waitForFunction(()=>App.profile.game.lesson?.id==='schlacht');
  await shot('lehrstunde-brett');
  await page.evaluate(()=>{
   App.onUpdate({state:'available',installed:'1.40.0',version:'9.9.9',notes:'Testdaten für die Sichtprüfung.',size:13*1048576});
   App.updates.show();
  });
  await page.waitForSelector('.update-seal');assert.match(await page.locator('.update h2').textContent(),/Neue Version/);
  await shot('update');await click('.update [data-cmd="later"]');

  // Die beiden Zielwerte unterscheiden sich nur in der Gesundheit. Die Vorschau kommt aus regulären Pointer-Ereignissen.
  const ids = await page.evaluate(()=>{
   const s=CHE.create({hero:'leonidas',foe:CHD.missions[4].hero,mission:4,mode:'campaign',seed:731,first:0});
   CHE.mulligan(s,[]);const me=s.players[0];me.hand=[];me.mana=me.maxMana=10;me.turns=8;
   const own=CHE.summon(s,0,'leonidas_0'),safe=CHE.summon(s,1,'neutral_0'),fragile=CHE.summon(s,1,'neutral_0');
   Object.assign(own,{ready:true,attack:3,health:6,maxHealth:6});delete own.fresh;
   Object.assign(safe,{health:6,maxHealth:6});Object.assign(fragile,{health:2,maxHealth:2});
   me.hand.push({id:'leonidas_9',uid:'c'+s.nextId++});s.events=[];App.profile.game=s;App.store.commit();App.navigate('game');
   return {own:own.uid,safe:safe.uid,fragile:fragile.uid};
  });
  await page.waitForFunction(u=>!!CHR.positions[u]&&!!CHR.fuse,ids.fragile);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.evaluate(()=>{App.profile.game.players[0].turns++;});
  await page.waitForFunction(()=>{const f=CHE.fuse(App.profile.game);return CHR.fuse.to===f.left/f.turns&&CHT.clock.now()-CHR.fuse.at>=600;});
  for(let i=0;i<4;i++){
   const point=await page.evaluate(i=>{const p=CHL.dioramas[i];return [p.x,p.y]},i);
   await page.touchscreen.tap(...await stagePoint(page,point));
   assert.ok(await page.evaluate(()=>!!App.view.bubble?.source));
   if(i===3){
    await page.waitForFunction(()=>CHR.hits.some(h=>h.kind==='bubble')&&CHT.clock.now()-App.view.bubble.t0-App.view.bubble.delay>200);
    await shot('diorama');
   }
   await page.touchscreen.tap(...await stagePoint(page,[800,334]));
  }
  const pointFor=async id=>stagePoint(page,await page.evaluate(u=>{const {x,y}=CHR.positions[u];return [x,y]},id));
  await page.mouse.move(...await pointFor(ids.own));await page.mouse.down();
  for(const [id,lethal] of [[ids.safe,false],[ids.fragile,true]]){
   await page.mouse.move(...await pointFor(id),{steps:7});
   await page.waitForFunction(u=>App.view.preview?.target===u,id);
   const side=await page.evaluate(()=>App.view.preview.sides[0]);assert.equal(side.loss,lethal?2:3);assert.equal(side.dies,lethal);
   await shot(lethal?'angriff-toedlich':'angriff');
  }
  await page.mouse.up();
  await page.waitForFunction(id=>!CHM.busy()&&!CHE.unit(App.profile.game,id),ids.fragile);

  for(const mode of ['voll','antippen','ruhig']){
   await page.emulateMedia({reducedMotion:mode==='ruhig'?'reduce':'no-preference'});
   await page.evaluate(mode=>{
    const s=App.profile.game,me=s.players[0];me.hand=[{id:'leonidas_9',uid:'c'+s.nextId++}];me.mana=10;
    const action=CHE.legal(s,0).find(a=>a.type==='play'&&a.uid===me.hand[0].uid);
    if(!action||!App.vm.game.action(action))throw Error('Gorgo ist nicht spielbar: '+JSON.stringify({mode,busy:CHM.busy(),phase:s.phase,board:me.board.length,action}));
    if(mode==='antippen')return;
    // Für das Bildschirmfoto die Matchuhr nach dem tatsächlich gezeichneten Bild anhalten.
    // Der nächste Frame und die Zustandsmaschine laufen nach dem Foto normal weiter.
    const original=CHF.herald;
    CHF.herald=function(c,x,q,t){
     original(c,x,q,t);
     if(q<.63)return;
     CHF.herald=original;
     const tick=CHT.clock.tick;CHT.clock.tick=()=>CHT.clock.time;
     window.resumeHerald=()=>{CHT.clock.tick=tick;delete window.resumeHerald};
    };
   },mode);
   if(mode==='antippen'){
    assert.ok(await page.evaluate(()=>CHM.inHerald()));
    await page.touchscreen.tap(...await stagePoint(page,[800,340]));
    assert.equal(await page.evaluate(()=>CHM.inHerald()),false);
   }else{
    await page.waitForFunction(()=>!!window.resumeHerald);
    assert.equal(await page.evaluate(()=>!!CHM.transition.stamped),mode==='voll');
    await shot('legendaer-'+mode);await page.evaluate(()=>window.resumeHerald());
   }
   await page.waitForFunction(()=>!CHM.busy());
   assert.equal(await page.evaluate(()=>App.profile.game.players[0].board.filter(u=>u.id==='leonidas_9').length),['voll','antippen','ruhig'].indexOf(mode)+1);
  }
  assert.deepEqual(errors,[]);
 } finally {await ctx.close();}
}
(async()=>{
 fs.mkdirSync(out,{recursive:true});const {server,url}=await serve();const browser=await pw.chromium.launch();
 try {for(const [name,size] of Object.entries(sizes))await exercise(browser,url,name,size);}
 finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
