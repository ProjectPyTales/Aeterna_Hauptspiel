/* Aeterna – composition root (MVVM shell). Creates the model store, the view models and their views, and
 * provides the ui service the view models talk to: navigation with transitions, dialogs, toasts, sound and
 * haptics. Game rules live in model/, screen logic in viewmodel/, markup in view/ (see core/mvvm.js).
 * window.App stays the facade for the native shell: back(), importText(), onPause(), onResume(). */
(function(){'use strict';
const VERSION='1.7.0',D=CHD,R=CHR,A=CHA,H=CHH,S=CHS,V=AEV,VM=AEVM,{bind}=AEM,$=id=>document.getElementById(id);
const stage=$('stage'),canvas=$('board'),overlay=$('overlay');

// ---------- Model ----------
const store=new AES.Store({storage:localStorage,bridge:AEP.bridge,onError:msg=>ui.toast(msg)});
const session={mode:'free',hero:'leonidas',foe:'hypatia',deckId:'leonidas',mission:0};
// The renderer and the mixer follow the profile: equipped cosmetics and sound settings.
function applyProfile(){const p=store.profile,e=p.cosmetics.equipped,skins={};
 for(const [hero,id] of Object.entries(e.skins))skins[hero]=CHK.find('skins',id).atlas;
 R.look={back:e.back,board:CHK.find('boards',e.board).image,skins};R.ensure(R.look.board);A.set(p.settings);}

// ---------- Shell state ----------
let screen='menu',current=null,dialog=null,busy=false,toastTimer=null;
const reduced=()=>AEP.reducedMotion();

// ---------- ui service for the view models ----------
const ui={
 screen:()=>screen,busy:()=>busy,hidden:()=>document.hidden,
 go:(next,arg,force)=>navigate(next,arg,force),
 toast(msg){$('toast').textContent=msg;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3000);},
 // One dialog at a time; opening another replaces it.
 dialog(kind,vm){closeDialog(false);matchView.cancel();
  dialog={kind,vm,binding:bind(overlay,V.dialogs[kind],vm)};screens.game.vm.dialogChanged(true);},
 close(){closeDialog(true);},
 dialogOpen:vm=>!!dialog&&(!vm||dialog.vm===vm),
 play:(name,opts)=>A.play(name,opts),
 haptic:kind=>AEP.haptic(kind,store.profile.settings.haptics!==false),
 unlockAudio:()=>A.init().catch(console.warn),
 exportSave:raw=>AEP.exportSave(raw,AES.EXPORT_NAME),
 pickImport:()=>AEP.pickImport(),
 exit:()=>AEP.exit()};
function closeDialog(resume){if(!dialog)return;const d=dialog;dialog=null;d.binding.unbind();overlay.textContent='';d.vm.closed?.();
 if(resume&&screen==='game')screens.game.vm.dialogChanged(false);}

// ---------- View models and views ----------
const ctx={store,session,ui};
ctx.dialogs=new VM.Dialogs(ctx,VERSION);
ctx.packs=new VM.Packs(ctx);
const screens={
 menu:{vm:new VM.Menu(ctx,VERSION),view:H.view},
 setup:{vm:new VM.Setup(ctx),view:V.screens.setup},
 campaign:{vm:new VM.Campaign(ctx),view:V.screens.campaign},
 collection:{vm:new VM.Collection(ctx),view:V.screens.collection},
 packs:{vm:new VM.Shop(ctx),view:V.screens.packs},
 game:{vm:new VM.Match(ctx),view:null}};
ctx.match=screens.game.vm;
ctx.reset=()=>screens.collection.vm.discard();
const matchView=AEMatchView(canvas,screens.game.vm,ui);ctx.board=matchView.board;

// ---------- Navigation ----------
// Leaving the hall: light bursts from the star and the view dives into the ring; coming back reverses it.
// Between other screens two stone slabs slam shut, lock in (haptic) and grind apart.
function navigate(next,arg,force=false){
 if(!force&&!screens[screen].vm.canLeave(next))return;
 if(busy)return;
 if(next===screen||reduced()){show(next,arg);return;}
 if(screen==='menu'||next==='menu')ring(next,arg);else slide(()=>show(next,arg));}
function hold(){busy=true;clearTimeout(screens.game.vm.aiTimer);matchView.cancel();}
function release(){busy=false;if(screen==='game')screens.game.vm.scheduleAI();}
function ring(next,arg){hold();
 if(next==='menu'){A.play('grind',{gain:.6});H.arrive(()=>show(next,arg),release);}else{A.play('power',{gain:.45});H.leave(()=>show(next,arg),release);}}
function slide(swap){hold();const el=$('slabs');el.className='active closing';A.play('scrape',{gain:.9});
 setTimeout(()=>{el.className='active closed';A.play('slam');ui.haptic(1);swap();
  setTimeout(()=>{el.className='active opening';A.play('grind');setTimeout(()=>{el.className='';release();},560);},140);},300);}
// Swap the screen: the old binding goes, the new view model is entered and bound to #ui.
function show(next,arg){
 closeDialog(false);clearTimeout(toastTimer);$('toast').classList.remove('show');
 if(screen==='game'||next==='game'){matchView.cancel();screens.game.vm.leave();matchView.board.cancel();}
 current?.unbind();current=null;$('ui').textContent='';
 screen=next;document.body.classList.toggle('stone-hall',next==='menu');stage.classList.toggle('match-active',next==='game');
 window.getSelection()?.removeAllRanges();canvas.style.display=next==='game'?'block':'none';
 const {vm,view}=screens[next];vm.enter(arg);
 if(view)current=bind($('ui'),view,vm);
 if(next==='menu')A.track('menu');if(next==='game')A.track('battle');}

// ---------- Platform ----------
function resize(){const inset=window.safeInsets||{left:0,right:0,top:0,bottom:0},w=innerWidth-inset.left-inset.right,h=innerHeight-inset.top-inset.bottom,scale=Math.min(w/1600,h/800),left=inset.left+(w-1600*scale)/2,topY=inset.top+(h-800*scale)/2;
 stage.style.transform=`scale(${scale})`;stage.style.left=left+'px';stage.style.top=topY+'px';
 for(const [k,v] of [['bw',H.bgWidth*scale],['bh',800*scale],['bx',left-H.bgOffset*scale],['by',topY]])document.body.style.setProperty('--hall-'+k,v+'px');}
function back(){if(busy)return;if(dialog){dialog.vm.close?.();return;}screens[screen].vm.back();}
function onPause(){ctx.packs.pause();matchView.cancel();screens.game.vm.pauseApp();store.save();A.pause();}
function onResume(){A.resume();screens.game.vm.resumeApp();}

window.App={get profile(){return store.profile;},get view(){return screens.game.vm.view;},get screen(){return screen;},get dialog(){return dialog?.kind||null;},
 vm:Object.fromEntries(Object.entries(screens).map(([k,s])=>[k,s.vm])),store,ui,
 navigate:(next,arg)=>navigate(next,arg),close:()=>ui.close(),toast:msg=>ui.toast(msg),back,onPause,onResume,resize,
 importText:raw=>ctx.dialogs.importText(raw)};

for(const event of ['selectstart','contextmenu','dragstart'])stage.addEventListener(event,ev=>{if(screen==='game')ev.preventDefault();});
// A tap on the scrim beside a dialog that allows it (card zoom, chronicle) closes the dialog.
overlay.addEventListener('pointerdown',ev=>{if(dialog&&ev.target.hasAttribute?.('data-scrim')){ev.preventDefault();ev.stopPropagation();dialog.vm.close();}});
$('import-file').addEventListener('change',async ev=>{const f=ev.target.files[0];if(f){if(f.size>2*1024*1024)ui.toast('Diese Datei ist zu groß.');else App.importText(await f.text());}ev.target.value='';});
document.addEventListener('pointerdown',()=>ui.unlockAudio(),{once:true});
document.addEventListener('visibilitychange',()=>document.hidden?onPause():onResume());
window.addEventListener('pagehide',()=>store.save());
window.addEventListener('resize',resize);
window.addEventListener('keydown',ev=>{if(ev.key==='Escape')back();});
store.subscribe(applyProfile);

// ---------- Start ----------
store.load();applyProfile();resize();
Promise.all([R.load(),H.preload()]).then(()=>{$('loading').remove();
 $('slabs').querySelector('.slab-l').innerHTML=S.slabArt('l');$('slabs').querySelector('.slab-r').innerHTML=S.slabArt('r');
 show('menu',!reduced());store.save();matchView.start();})
 .catch(e=>{$('loading').innerHTML='<h2>Ladefehler</h2><p>'+AEM.esc(e.message)+'</p>';});
})();
