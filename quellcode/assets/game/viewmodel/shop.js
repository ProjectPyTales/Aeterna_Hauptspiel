/* Basar view model: card packs plus four cosmetic tabs, all paid with gold (AP 0.1, AP 2.3).
 * Buying or equipping changes the profile and notifies – the view patches itself, so the active tab
 * and the scroll position stay where they were.
 * Basar 2.0 (AP 1.4): a shop window – the choice on the left, the picked item large on a lit pedestal on the right.
 * A purchase is staged: coins fly out of the wallet, a seal breaks, the item lights up (state.bought, a new token each time). */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD,P=node?require('../model/profile.js'):root.CHP,K=node?require('../model/cosmetics.js'):root.CHK;
const {Screen,Dialog}=node?require('./base.js'):root.AEVM;
const TABS=[['packs','Kartenpakete'],['backs','Kartenrücken'],['frames','Kartenrahmen'],['skins','Helden-Skins'],['boards','Schlachtfelder']];
const LABEL={backs:'Kartenrücken',frames:'Kartenrahmen',skins:'Helden-Skin',boards:'Schlachtfeld'};

class Shop extends Screen{
 constructor(ctx){super(ctx,{tab:'packs',pick:{},bought:null});this.buys=0;}
 get tabs(){return TABS;}
 // The menu opens the Basar on a given tab: 'packs' for card packs, 'backs' for cosmetics.
 enter(tab){if(tab)this.state.tab=tab;this.state.bought=null;}
 tab(t){if(t===this.state.tab||!TABS.some(([id])=>id===t))return;this.set({tab:t,bought:null});this.ui.play('stone');this.ui.haptic(0);}

 // The pedestal shows the picked item; without a pick the one in use (for skins the first), else the first of the shelf.
 picked(kind){const list=K.catalog[kind]||[],id=this.state.pick[kind];
  return list.find(i=>i.id===id)||list.find(i=>K.equipped(this.profile,kind,i.id))||list[0];}
 get showcase(){const kind=this.state.tab;if(kind==='packs')return null;const item=this.picked(kind);
  const e=this.entry(kind,item);return {...e,bought:this.state.bought?.kind===kind&&this.state.bought.id===item.id?this.state.bought.n:0};}
 select(kind,id){if(!K.find(kind,id)||this.picked(kind).id===id&&this.state.pick[kind])return;
  this.state.pick[kind]=id;this.state.bought=null;this.notify();this.ui.play('stone',{gain:.6});this.ui.haptic(0);}

 // Everything a tile needs: the item, ownership, whether it is worn, whether the gold suffices.
 entry(kind,item){const p=this.profile;
  return {kind,item,owned:K.owns(p,kind,item.id),equipped:K.equipped(p,kind,item.id),short:p.gold<item.price,
   picked:this.picked(kind).id===item.id,hero:kind==='skins'?D.heroes.find(h=>h.id===item.hero):null};}
 items(kind){return (K.catalog[kind]||[]).map(item=>this.entry(kind,item));}
 get pack(){const p=this.profile;return {packs:p.packs,pending:!!p.pendingPack,canBuy:p.gold>=100,bulk:!p.pendingPack&&p.packs>=2?p.packs:0};}

 // Formerly a preview dialog; the pedestal took its place (AP 1.4).
 preview(kind,id){this.select(kind,id);}
 buy(kind,id){const item=K.find(kind,id),p=this.profile;if(!item)return;
  if(K.owns(p,kind,id)){this.ui.toast('Bereits freigeschaltet.');return;}
  if(p.gold<item.price){this.ui.toast('Du brauchst '+item.price+' Gold – es fehlen noch '+(item.price-p.gold)+'.');return;}
  const name=kind==='skins'?D.heroes.find(h=>h.id===item.hero).name+' · '+item.name:item.name;
  this.ui.dialog('message',new Dialog(this.ctx,{title:LABEL[kind]+' freischalten?',close:false,
   text:'»'+name+'« kostet '+item.price+' Gold. Danach bleiben Dir '+(p.gold-item.price)+' Gold.',
   buttons:[{label:'Abbrechen'},{label:'Für '+item.price+' Gold kaufen',style:'gold',run:()=>this.confirmBuy(kind,id)}]}));}
 // Gold leaves the wallet exactly once (CHK.buy refuses a second purchase).
 // Staged purchase: coins at once, the seal breaks after half a second, then the reward sounds while the item lights up.
 confirmBuy(kind,id){const err=K.buy(this.profile,kind,id);this.ui.close();if(err){this.ui.toast(err);return;}
  this.state.pick[kind]=id;this.state.bought={kind,id,n:++this.buys};this.commit();
  this.ui.play('coins');this.ui.play('seal',{delay:.5});this.ui.play('pack',{delay:.62,gain:.8});this.ui.haptic(2);
  this.ui.toast('Freigeschaltet! Tippe auf „Ausrüsten“, um es zu verwenden.');}
 equip(kind,id){const err=K.equip(this.profile,kind,id);if(err){this.ui.toast(err);return;}
  this.state.bought=null;this.commit();this.ui.play('stone');this.ui.haptic(0);this.ui.toast('Ausgerüstet.');}
 unequip(hero){K.unequipSkin(this.profile,hero);this.state.bought=null;this.commit();this.ui.play('stone');this.ui.toast('Standardporträt ausgerüstet.');}

 buyPack(){if(P.buy(this.profile)){this.commit();this.ui.play('click');}else this.ui.toast('Du brauchst 100 Gold.');}
 openPack(){this.ctx.packs.open();}
 openAll(){this.ctx.packs.openAll();}
 packOdds(){this.ui.dialog('message',new Dialog(this.ctx,{title:'Packs & Seltenheiten',close:false,text:[
  'Pro regulärem Kartenplatz: 73 % gewöhnlich, 21 % selten, 5 % episch, 1 % legendär. Der letzte Platz wird bei Bedarf auf mindestens selten angehoben. Legendär ist spätestens im 10. Startpack und danach nach 40 Packs ohne legendäre Karte garantiert.',
  'Herstellung / Entzauberung: Gewöhnlich 40 / 5, Selten 100 / 20, Episch 400 / 100, Legendär 1600 / 400 Staub. Basiskarten sind kostenlos und nicht entzauberbar.',
  'Der Duplikatschutz wählt innerhalb der gezogenen Seltenheit zuerst Karten, von denen Du noch keine zwei Exemplare besitzt (legendär: eines).'],
  buttons:[{label:'Verstanden',style:'gold'}]}));}
}

const api={Shop,TABS,LABEL};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
