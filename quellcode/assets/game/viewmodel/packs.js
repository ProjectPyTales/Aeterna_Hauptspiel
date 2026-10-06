/* Pack opening view model. The contents commit once, before the presentation starts; timers only
 * reveal, they never award cards. Phases: 'opening' (sealed pack tears, 1.55 s) → 'reveal'. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD,P=node?require('../model/profile.js'):root.CHP;
const {ViewModel}=node?require('../core/mvvm.js'):root.AEM;

class Packs extends ViewModel{
 constructor(ctx){super({phase:null,revealed:[],animate:false});this.ctx=ctx;this.timer=null;this.reveals=[];this.generation=0;}
 get profile(){return this.ctx.store.profile;}
 get ui(){return this.ctx.ui;}
 get cards(){return (this.profile.pendingPack||[]).map((x,i)=>({index:i,card:D.byId[x.id],isNew:x.isNew,open:this.state.revealed.includes(i)}));}
 open(){
  if(this.state.phase)return;
  const p=this.profile,resumed=!!p.pendingPack;
  if(!resumed&&!P.openPack(p))return;
  if(!resumed)p.pendingPackRevealed=[];
  this.state.revealed=[...(p.pendingPackRevealed||[])];this.ctx.store.commit();
  if(resumed){this.show(false);return;}
  const generation=++this.generation;
  this.set({phase:'opening',animate:false});this.ui.dialog('packs',this);this.ui.play('pack');this.ui.haptic(0);
  this.timer=setTimeout(()=>{if(generation===this.generation&&this.ui.screen()==='packs')this.show(true);},1550);
 }
 show(animate=false){
  if(!this.profile.pendingPack)return;
  clearTimeout(this.timer);
  this.set({phase:'reveal',animate});
  if(!this.ui.dialogOpen(this))this.ui.dialog('packs',this);
  if(animate)this.ui.play('draw');
 }
 skip(){if(this.state.phase==='opening')this.show(true);}
 reveal(i){
  i=Number(i);const p=this.profile;
  if(this.state.phase!=='reveal'||!p.pendingPack||!Number.isInteger(i)||i<0||i>4||this.state.revealed.includes(i))return;
  const revealed=[...this.state.revealed,i];p.pendingPackRevealed=revealed;this.state.revealed=revealed;this.ctx.store.commit();this.notify();
  const c=D.byId[p.pendingPack[i].id];
  this.ui.play(c.rarity==='legendary'?'victory':c.rarity==='epic'?'power':'draw');this.ui.haptic(c.rarity==='legendary'?1:0);
 }
 // First tap reveals the rest one by one; once all five are open it files the pack away.
 finish(){
  const p=this.profile;if(this.state.phase!=='reveal'||!p.pendingPack)return;
  if(this.state.revealed.length<5){
   if(this.reveals.length)return;
   const generation=this.generation;
   [0,1,2,3,4].filter(i=>!this.state.revealed.includes(i)).forEach((i,j)=>this.reveals.push(setTimeout(()=>{if(generation===this.generation)this.reveal(i);},j*150)));
  }else{this.stop();p.pendingPack=null;p.pendingPackRevealed=[];this.set({phase:null,revealed:[]});this.ctx.store.commit();this.ui.close();}
 }
 // No closing an unopened pack: the back key only reminds.
 close(){if(this.profile.pendingPack)this.ui.toast('Bitte decke das Pack auf und schließe es ab.');else this.ui.close();}
 stop(){clearTimeout(this.timer);this.reveals.forEach(clearTimeout);this.reveals=[];this.generation++;}
 // The shell closed the dialog (screen change): drop timers; an unfinished pack resumes next time.
 closed(){this.stop();this.state.phase=null;}
 // App paused during the tear: skip straight to the cards.
 pause(){if(this.state.phase==='opening'){this.stop();if(this.ui.screen()==='packs')this.show(false);}}
}

const api={Packs};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
