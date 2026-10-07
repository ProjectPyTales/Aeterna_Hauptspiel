/* Collection & deck building view model. Typing in the search field or the deck name only patches the
 * view, so the field keeps its focus and caret (no more manual focus restore). */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD,E=node?require('../model/engine.js'):root.CHE,P=node?require('../model/profile.js'):root.CHP;
const {Screen,Dialog,LiveDialog}=node?require('./base.js'):root.AEVM;
const PER_PAGE=8,cap=c=>c.rarity==='legendary'?1:2,era=hero=>D.heroes.find(h=>h.id===hero).era;

class Collection extends Screen{
 constructor(ctx){super(ctx,{filters:{q:'',hero:'leonidas',rarity:'all',mana:'all',owned:false},page:0,edit:null,dirty:false});}
 enter(){this.state.edit=null;this.state.filters.hero=this.session.hero;}

 list(){const f=this.state.filters,p=this.profile,q=f.q.toLowerCase();
  return D.cards.filter(c=>(f.hero==='all'||D.playable(c,f.hero))
   &&(!q||(c.name+' '+c.text+' '+D.rarities[c.rarity]).toLowerCase().includes(q))
   &&(f.rarity==='all'||c.rarity===f.rarity)
   &&(f.mana==='all'||(f.mana==='7'?c.cost>=7:c.cost===+f.mana))
   &&(!f.owned||p.collection[c.id]>0))
  .sort((a,b)=>a.cost-b.cost||a.name.localeCompare(b.name,'de'));}
 counts(){const counts={};if(this.state.edit)for(const id of this.state.edit.cards)counts[id]=(counts[id]||0)+1;return counts;}
 // Everything the view draws, derived from the profile and the screen state.
 get view(){
  const p=this.profile,s=this.state,list=this.list(),pages=Math.max(1,Math.ceil(list.length/PER_PAGE));
  s.page=Math.min(pages-1,Math.max(0,s.page));
  const counts=this.counts(),view={filters:s.filters,page:s.page,pages,edit:s.edit,dirty:s.dirty,dust:p.dust,
   unique:D.cards.filter(c=>p.collection[c.id]>0).length,total:D.cards.length,
   cards:list.slice(s.page*PER_PAGE,s.page*PER_PAGE+PER_PAGE).map(c=>({card:c,owned:p.collection[c.id]||0,inDeck:counts[c.id]||0}))};
  if(s.edit){
   const curve=Array(8).fill(0);for(const id of s.edit.cards)curve[Math.min(7,D.byId[id].cost)]++;
   view.curve=curve;view.max=Math.max(1,...curve);view.era=era(s.edit.hero);
   view.rows=Object.keys(counts).sort((a,b)=>D.byId[a].cost-D.byId[b].cost).map(id=>({card:D.byId[id],count:counts[id]}));
  }else view.decks=p.decks.map(d=>({deck:d,icon:D.heroes.find(h=>h.id===d.hero).icon}));
  return view;}

 filter(k,v){if(!['q','hero','rarity','mana'].includes(k))return;this.state.filters[k]=String(v);this.state.page=0;this.notify();}
 toggleOwned(){this.state.filters.owned=!this.state.filters.owned;this.state.page=0;this.notify();}
 page(n){this.state.page+=Number(n);this.notify();}
 inspect(id){if(D.byId[id])this.ui.dialog('card',new CardDialog(this,id));}

 newDeck(){this.ui.dialog('newDeck',new NewDeck(this));}
 createDeck(hero){if(!D.heroes.some(h=>h.id===hero))return;
  Object.assign(this.state,{edit:{id:'deck_'+Date.now(),name:era(hero)+' · Neu',hero,cards:[]},page:0,dirty:true});
  Object.assign(this.state.filters,{hero,q:''});this.ui.close();this.notify();}
 editDeck(id){const d=this.profile.decks.find(d=>d.id===id);if(!d)return;
  Object.assign(this.state,{edit:E.clone(d),page:0,dirty:false});Object.assign(this.state.filters,{hero:d.hero,q:''});this.notify();}
 deckName(n){if(!this.state.edit)return;this.state.edit.name=String(n);this.state.dirty=true;this.notify();}
 addCard(id){const edit=this.state.edit;if(!edit)return;const c=D.byId[id],n=edit.cards.filter(x=>x===id).length;
  if(edit.cards.length>=30){this.ui.toast('Das Deck enthält bereits 30 Karten.');return;}
  if(!D.playable(c,edit.hero)){this.ui.toast('Diese Karte gehört zu einem anderen Helden.');return;}
  if(n>=Math.min(this.profile.collection[id]||0,cap(c))){this.ui.toast('Kein weiteres erlaubtes Exemplar im Besitz.');return;}
  edit.cards.push(id);this.state.dirty=true;this.ui.close();this.notify();this.ui.play('play');}
 removeCard(id){const edit=this.state.edit;if(!edit)return;const i=edit.cards.indexOf(id);if(i>=0)edit.cards.splice(i,1);this.state.dirty=true;this.notify();}
 saveDeck(){const edit=this.state.edit,p=this.profile;if(!edit)return;const err=P.validateDeck(p,edit.hero,edit.cards);if(err){this.ui.toast(err);return;}
  edit.name=edit.name.trim()||era(edit.hero)+' · Deck';
  const i=p.decks.findIndex(d=>d.id===edit.id);if(i<0)p.decks.push(E.clone(edit));else p.decks[i]=E.clone(edit);
  this.state.dirty=false;this.commit();this.ui.toast('Deck gespeichert.');}
 // Fills up along a gentle mana curve with cards the player owns.
 autoFill(){const edit=this.state.edit,p=this.profile;if(!edit)return;
  const pool=D.cards.filter(c=>D.playable(c,edit.hero)&&p.collection[c.id]>0).sort((a,b)=>a.cost-b.cost);let guard=0;
  while(edit.cards.length<30&&guard++<1000){let choices=pool.filter(c=>edit.cards.filter(id=>id===c.id).length<Math.min(p.collection[c.id],cap(c)));
   const cost=[1,2,2,3,3,4,4,5,6,7][edit.cards.length%10],near=choices.filter(c=>Math.abs(c.cost-cost)<=1);if(near.length)choices=near;if(!choices.length)break;
   edit.cards.push(choices[(edit.cards.length*7)%choices.length].id);}
  this.state.dirty=true;this.notify();}
 clearDeck(){if(!this.state.edit)return;this.state.edit.cards=[];this.state.dirty=true;this.notify();}
 stopEdit(){if(this.state.dirty){this.askDiscard(()=>this.discard());return;}this.set({edit:null});}
 discard(){Object.assign(this.state,{dirty:false,edit:null});this.notify();}
 deleteDeck(){const edit=this.state.edit,p=this.profile;if(!edit)return;
  if(p.decks.filter(d=>d.hero===edit.hero).length<=1&&p.decks.some(d=>d.id===edit.id)){this.ui.toast('Behalte mindestens ein Deck pro Held.');return;}
  this.ui.dialog('message',new Dialog(this.ctx,{title:'Deck löschen?',close:false,text:'Die Karten bleiben in Deiner Sammlung.',
   buttons:[{label:'Abbrechen'},{label:'Deck löschen',style:'danger',run:()=>this.doDeleteDeck()}]}));}
 doDeleteDeck(){const p=this.profile;p.decks=p.decks.filter(d=>d.id!==this.state.edit.id);Object.assign(this.state,{dirty:false,edit:null});this.commit();}
 craft(id){if(P.craft(this.profile,id)){this.commit();this.ui.play('heal');}else this.ui.toast('Nicht genügend Staub oder bereits genug Exemplare.');}
 dustCard(id){if(P.disenchant(this.profile,id)){this.commit();this.ui.play('destroy');}else this.ui.toast('Diese Karte wird noch in einem gespeicherten Deck verwendet.');}
 extras(){let gain=0;const p=this.profile;for(const c of D.cards)gain+=Math.max(0,p.collection[c.id]-cap(c))*(P.dust[c.rarity]||0);
  if(!gain){this.ui.toast('Keine überzähligen Karten vorhanden.');return;}
  this.ui.dialog('message',new Dialog(this.ctx,{title:'Duplikate entzaubern?',close:false,
   text:'Überzählige Exemplare werden zu '+gain+' Staub. Zwei Exemplare jeder Karte und ein Exemplar jeder legendären Karte bleiben erhalten.',
   buttons:[{label:'Abbrechen'},{label:gain+' Staub erhalten',style:'gold',run:()=>this.doExtras()}]}));}
 doExtras(){const g=P.extras(this.profile);this.commit();this.ui.toast('+'+g+' Staub erhalten.');}

 // Unsaved changes: ask before leaving the screen or the editor.
 askDiscard(run){this.ui.dialog('message',new Dialog(this.ctx,{title:'Ungespeichertes Deck',close:false,
  text:'Deine Änderungen sind noch nicht gespeichert. Möchtest Du weiter bearbeiten oder sie verwerfen?',
  buttons:[{label:'Weiter bearbeiten'},{label:'Verwerfen',style:'danger',run}]}));}
 canLeave(next){if(!this.state.dirty)return true;this.askDiscard(()=>{this.discard();this.ui.go(next);});return false;}
}

// One card from the collection: details, add to the deck being edited, craft or disenchant.
class CardDialog extends LiveDialog{
 constructor(coll,id){super(coll.ctx,{id});this.coll=coll;}
 get view(){const p=this.profile,c=D.byId[this.state.id],owned=p.collection[c.id]||0;
  return {card:c,owned,editing:!!this.coll.state.edit,era:D.eraOf(c),
   price:P.price[c.rarity],dust:P.dust[c.rarity],canCraft:p.dust>=(P.price[c.rarity]||Infinity)&&owned<cap(c),canDust:owned>0};}
 addCard(id){this.coll.addCard(id);}
 craft(id){this.coll.craft(id);}
 dustCard(id){this.coll.dustCard(id);}
}
// Hero choice for a new deck.
class NewDeck extends LiveDialog{
 constructor(coll){super(coll.ctx,{hero:D.heroes[0].id});this.coll=coll;}
 choose(hero){this.state.hero=hero;}
 create(){this.coll.createDeck(this.state.hero);}
}

const api={Collection,CardDialog,NewDeck};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
