// Browserteil der Android-Updateprüfung: beide Websites kommen aus den angegebenen signierten APKs.
// Der HTTP-Ursprung und das Browserprofil bleiben beim Wechsel gleich.
const {pw,serve}=require('./buehne'),{execFileSync}=require('node:child_process');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict');

async function main(){
 const [oldApk,newApk]=process.argv.slice(2);
 if(!oldApk||!newApk)throw Error('Aufruf: node werkzeuge/update-spielstand.js veröffentlichte.apk kandidat.apk');
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'aeterna-update-'));let browser,site;
 try{
  for(const [dir,apk] of [['alt',oldApk],['neu',newApk]]){
   execFileSync('unzip',['-q',path.resolve(apk),'assets/game/*','-d',path.join(tmp,dir)]);
  }
  const root=path.join(tmp,'spiel'),link=dir=>fs.symlinkSync(path.join(tmp,dir,'assets/game'),root);
  link('alt');site=await serve(root);browser=await pw.chromium.launch();
  const page=await browser.newPage({viewport:{width:640,height:360},hasTouch:true,reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   window.stimmproben=[];
   const audio=window.Audio;
   window.Audio=function(src){
    const el=new audio(src);if(src?.includes('/stimmen/'))window.stimmproben.push(el);return el;
   };
   window.Audio.prototype=audio.prototype;
  });
  const ready=()=>page.waitForFunction(()=>window.App?.artReady,null,{timeout:90000});
  await page.goto(site.url);await ready();
  const oldVersion=await page.evaluate(()=>AENEU.version);
  await page.evaluate(()=>{CHP.openPack(App.profile);App.store.commit();App.vm.menu.go('collection');});
  const deck=await page.evaluate(()=>{const c=App.vm.collection;c.createDeck('hypatia');c.deckName('Abnahme Alexandria');
   c.autoFill();c.saveDeck();const id=c.state.edit.id;c.back();return id;});
  await page.evaluate(()=>{App.navigate('menu');App.vm.menu.go('free');});
  await page.waitForFunction(()=>App.screen==='setup');
  await page.evaluate(id=>{const s=App.vm.setup;s.chooseHero('hypatia');s.chooseDeck(id);s.begin();},deck);
  await page.waitForFunction(()=>App.dialog==='mulligan');await page.evaluate(()=>{App.profile.helpSeen=true;App.vm.game.acceptHand();App.onPause();});
  const snapshot=()=>page.evaluate(()=>{const p=App.profile;return {collection:p.collection,decks:p.decks,game:p.game};});
  // Bereits die veröffentlichte App verwirft beim Laden einmalige Animationsevents.
  await page.reload();await ready();
  const before=await snapshot();assert.equal(before.game.phase,'play');assert.ok(before.decks.find(d=>d.id===deck&&d.cards.length===30));
  if(process.env.AETERNA_PRUEFSPIELSTAND)fs.writeFileSync(process.env.AETERNA_PRUEFSPIELSTAND,await page.evaluate(()=>App.store.exportText()));
  await page.goto('about:blank');fs.unlinkSync(root);link('neu');await page.goto(site.url);await ready();
  assert.deepEqual(await snapshot(),before);
  const version=await page.evaluate(()=>AENEU.version);assert.notEqual(oldVersion,version);
  await page.evaluate(()=>{App.close();App.vm.menu.go('resume');});await page.waitForFunction(()=>App.screen==='game');
  assert.equal(await page.evaluate(()=>App.profile.game.players[0].hero),'hypatia');
  // Die echten Großansichten bei größter Schrift. Die Quelle muss bis zum letzten Zeichen erreichbar sein.
  await page.evaluate(()=>{App.navigate('menu');App.profile.settings.text='sehr';App.store.commit();App.vm.menu.go('collection');});
  const longest=await page.evaluate(()=>Object.entries(AELORE.cards).sort((a,b)=>b[1].join('').length-a[1].join('').length)[0][0]);
  for(const kind of ['collection','match']){
   await page.evaluate(([id,kind])=>{if(kind==='collection')App.vm.collection.inspect(id);else App.vm.setup.inspect(id);},[longest,kind]);
   const cite=page.locator('.chronicle-line cite');await cite.scrollIntoViewIfNeeded();
   const visible=await cite.evaluate(el=>{const r=el.getBoundingClientRect(),x=(r.left+r.right)/2,y=r.bottom-1;
    return r.left>=0&&r.right<=innerWidth&&y>=0&&y<innerHeight&&el.contains(document.elementFromPoint(x,y));});
   assert.ok(visible,kind+': lange Quelle abgeschnitten');await page.evaluate(()=>App.close());
  }
  await page.evaluate(()=>App.vm.game.ctx.dialogs.settings());
  await page.locator('#overlay .stone-tab',{hasText:'Klang'}).click();
  const slider=key=>page.locator('#overlay input[data-a="'+key+'"]');
  async function volume(key,value){
   await slider(key).evaluate((el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));},String(value));
   assert.equal(await page.evaluate(k=>App.profile.settings[k],key),value);
  }
  await volume('music',.2);await volume('sfx',.45);await volume('voice',.65);
  await page.locator('[data-cmd="sampleVoice"]').click();
  await page.waitForFunction(()=>stimmproben.some(el=>!el.paused&&el.currentTime>0),null,{timeout:20000});
  await volume('voice',0);
  assert.ok(await page.evaluate(()=>stimmproben.every(el=>el.paused)));
  const attempts=await page.evaluate(()=>stimmproben.length);
  await page.locator('[data-cmd="sampleVoice"]').click();
  assert.equal(await page.evaluate(()=>stimmproben.length),attempts);
  assert.deepEqual(await page.evaluate(()=>[CHA.settings.music,CHA.settings.sfx]),[.2,.45]);
  await volume('voice',.8);await page.evaluate(()=>App.close());
  // Ein vollständiges Offline-Duell. Beide Seiten verwenden die reguläre Aktionsverarbeitung des Matches.
  await page.evaluate(()=>{App.vm.menu.go('resume');App.profile.ambushSeen=true;});
  let count=0;
  while(await page.evaluate(()=>App.profile.game.phase==='play')){
   assert.ok(++count<1000);
   await page.waitForFunction(()=>!App.vm.game.board.busy(),null,{timeout:20000});
   await page.evaluate(()=>{const vm=App.vm.game,g=vm.game;
    if(g.phase!=='play')return;clearTimeout(vm.aiTimer);
    if(App.dialog)App.close();vm.action(CHE.ai(g));});
  }
  assert.deepEqual(errors,[]);
  console.log(oldVersion+' → '+version+': Sammlung, eigenes 30-Karten-Deck und laufende Partie identisch. Fortgesetzt und beendet. Lange Kartenquelle in beiden Ansichten bei 640 × 360 und sehr großer Schrift sichtbar. Drei getrennte Klangregler, Ogg-Wiedergabe und sofortiges Stummschalten geprüft.');
 }finally{await browser?.close();site?.server.close();fs.rmSync(tmp,{recursive:true,force:true});}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
