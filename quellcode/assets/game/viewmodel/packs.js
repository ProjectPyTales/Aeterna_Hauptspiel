/* Pack opening view model. The contents commit once, before the presentation starts; timers only
 * reveal, they never award cards. Phases: 'opening' (sealed pack tears, 1.55 s) → 'reveal'; 'bulk' is the summary of
 * the mass opening (Rückmeldung zu 1.10.0 und 1.11.0): all packs at once, straight into the collection; the overview
 * fills in rarest first, STEP cards per TICK, so no frame has to wait for hundreds of card pictures. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD,P=node?require('../model/profile.js'):root.CHP;
const {ViewModel}=node?require('../core/mvvm.js'):root.AEM;

const STEP=4,TICK=45,RANK={legendary:0,epic:1,rare:2,common:3,basic:4};

class Packs extends ViewModel{
 constructor(ctx){super({phase:null,revealed:[],animate:false,bulk:null});this.ctx=ctx;this.timer=null;this.reveals=[];this.generation=0;}
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
 // Massenöffnung: alle Pakete auf einmal (bis 1.11.0 höchstens 50). Die Karten liegen sofort in der Sammlung; der Dialog fasst sie zusammen –
 // seltenste zuerst, neue vor bekannten, gleiche Karten gezählt.
 openAll(){
  const p=this.profile;if(this.state.phase||p.pendingPack||p.packs<2)return;
  const r=P.openPacks(p);if(!r)return;this.ctx.store.commit();
  const groups=new Map();for(const x of r.cards){const g=groups.get(x.id)||{card:D.byId[x.id],count:0,isNew:false};g.count++;g.isNew=g.isNew||x.isNew;groups.set(x.id,g);}
  const list=[...groups.values()].sort((a,b)=>RANK[a.card.rarity]-RANK[b.card.rarity]||b.isNew-a.isNew||a.card.cost-b.card.cost||a.card.name.localeCompare(b.card.name));
  const count=k=>r.cards.filter(x=>D.byId[x.id].rarity===k).length;
  this.set({phase:'bulk',bulk:{packs:r.packs,total:r.cards.length,fresh:r.cards.filter(x=>x.isNew).length,legendary:count('legendary'),epic:count('epic'),list,shown:0}});
  this.ui.dialog('packs',this);this.ui.play(r.cards.some(x=>D.byId[x.id].rarity==='legendary')?'victory':'pack');this.ui.haptic(1);
  const generation=++this.generation,step=()=>{const b=this.state.bulk;if(generation!==this.generation||this.state.phase!=='bulk'||!b)return;
   const shown=Math.min(b.list.length,b.shown+STEP);this.set({bulk:{...b,shown}});if(shown<b.list.length)this.timer=setTimeout(step,TICK);};
  this.timer=setTimeout(step,0);
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
  if(this.state.phase==='bulk'){this.stop();this.set({phase:null,bulk:null});this.ui.close();return;}
  const p=this.profile;if(this.state.phase!=='reveal'||!p.pendingPack)return;
  if(this.state.revealed.length<5){
   if(this.reveals.length)return;
   const generation=this.generation;
   [0,1,2,3,4].filter(i=>!this.state.revealed.includes(i)).forEach((i,j)=>this.reveals.push(setTimeout(()=>{if(generation===this.generation)this.reveal(i);},j*150)));
  }else{this.stop();p.pendingPack=null;p.pendingPackRevealed=[];this.set({phase:null,revealed:[]});this.ctx.store.commit();this.ui.close();}
 }
 // No closing an unopened pack: the back key only reminds.
 close(){if(this.state.phase==='bulk'){this.finish();return;}if(this.profile.pendingPack)this.ui.toast('Bitte decke das Pack auf und schließe es ab.');else this.ui.close();}
 stop(){clearTimeout(this.timer);this.reveals.forEach(clearTimeout);this.reveals=[];this.generation++;}
 // The shell closed the dialog (screen change): drop timers; an unfinished pack resumes next time.
 closed(){this.stop();this.state.phase=null;this.state.bulk=null;}
 // App paused during the tear: skip straight to the cards.
 pause(){if(this.state.phase==='opening'){this.stop();if(this.ui.screen()==='packs')this.show(false);}}
}

const api={Packs,STEP,TICK};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
