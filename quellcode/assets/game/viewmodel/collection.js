/* Collection & deck building view model. Typing in the search field or the deck name only patches the
 * view, so the field keeps its focus and caret (no more manual focus restore).
 * Sammlung 3.0 (1.35.0, nach dem Vorbild der Deckbauer großer Sammelkartenspiele): zuerst ein Raster aller Decks
 * (state.tab 'decks') und daneben der Reiter Kartensammlung ('cards'); ein angetipptes Deck öffnet den Deckbau in zwei
 * Spalten – links das Deck als 30 Plätze (leere Plätze sichtbar) mit Manakurve, rechts alle Karten als Raster mit Suche,
 * Held, Kartenart, Sortierung, Steinknöpfen für Mana und Seltenheit. Antippen fügt im Deckbau hinzu (die Karte fliegt auf
 * ihren Platz, state.flight mit neuem Zähler), ⓘ zeigt Details; ein Platz im Deck nimmt die Karte wieder heraus. Im Deckbau
 * zeigt das Raster zuerst nur Karten im Besitz („Alle Karten“ zeigt auch die fehlenden, zum Herstellen).
 * Die Manakurve bleibt aus AP 1.6: früh (0–3), Mitte (4–6), spät (7+) mit Hinweis, wenn sie kippt. Blättern
 * (state.turn: +1 vor, −1 zurück) schiebt das Raster in Blätterrichtung. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD,E=node?require('../model/engine.js'):root.CHE,P=node?require('../model/profile.js'):root.CHP,LORE=node?require('../model/lore.js'):root.AELORE;
const {Screen,Dialog,LiveDialog}=node?require('./base.js'):root.AEVM;
// Raster rechts: 6 Spalten × 2 Reihen; Deck links: 30 Plätze.
const PER_PAGE=12,DECK_SIZE=30,cap=c=>c.rarity==='legendary'?1:2,era=hero=>D.heroes.find(h=>h.id===hero).era;
const RARITY_ORDER=['basic','common','rare','epic','legendary'];
// Kartenarten für den Filter (Hinterhalte sind verdeckte Zauber, Gebäude stehende Diener).
const TYPES={minion:'Diener',building:'Gebäude',spell:'Zauber',ambush:'Hinterhalte'};
const typeOf=c=>c.ambush?'ambush':c.building?'building':c.type==='spell'?'spell':'minion';
const SORTS={cost:'Mana',name:'Name',rarity:'Seltenheit',attack:'Angriff'};
const sorters={cost:(a,b)=>a.cost-b.cost||a.name.localeCompare(b.name,'de'),name:(a,b)=>a.name.localeCompare(b.name,'de'),
 rarity:(a,b)=>RARITY_ORDER.indexOf(b.rarity)-RARITY_ORDER.indexOf(a.rarity)||a.cost-b.cost||a.name.localeCompare(b.name,'de'),
 attack:(a,b)=>(b.attack||0)-(a.attack||0)||a.cost-b.cost||a.name.localeCompare(b.name,'de')};
// Mana curve: eight bars (0 … 7+), three phases. bucket(cost) is the bar of a card.
const bucket=cost=>Math.min(7,cost),phase=i=>i<=3?'early':i<=6?'mid':'late';
function curveOf(ids){const curve=Array(8).fill(0);for(const id of ids)curve[bucket(D.byId[id].cost)]++;return curve;}
// A hint when the curve leans (AP 1.6). Counts follow the usual advice for 30-card decks: about half early,
// a third in the middle, a few finishers.
function curveHint(curve){const n=curve.reduce((a,b)=>a+b,0),early=curve.slice(0,4).reduce((a,b)=>a+b,0),mid=curve[4]+curve[5]+curve[6],late=curve[7];
 const phases={early,mid,late},avg=n?curve.reduce((a,c,i)=>a+c*i,0)/n:0;
 let text,warn=true;
 if(n<10){text='Füge Karten hinzu – die Kurve zeigt, wann Dein Deck stark ist.';warn=false;}
 else if(late>Math.max(5,n*.2))text='Viele teure Karten (7+): Die Hand droht zu verstopfen, bevor Du sie spielen kannst.';
 else if(early<n*.35)text='Zu wenige frühe Karten (0–3 Mana): In den ersten Zügen fehlt Dir etwas zu tun.';
 else if(early>n*.75)text='Fast nur frühe Karten: Im späten Spiel geht Dir die Kraft aus.';
 else if(mid<n*.15)text='Kaum Karten für die Mitte (4–6 Mana): Zwischen Auftakt und Finale klafft eine Lücke.';
 else{text='Ausgewogene Kurve – Früh, Mitte und Spät sind gut verteilt.';warn=false;}
 return {text,warn,phases,avg:Math.round(avg*10)/10};}

class Collection extends Screen{
 constructor(ctx){super(ctx,{tab:'decks',filters:{q:'',hero:'leonidas',rarity:'all',mana:'all',type:'all',sort:'cost',owned:false},page:0,edit:null,dirty:false,turn:0,flight:null});this.flights=0;}
 enter(){Object.assign(this.state,{tab:'decks',edit:null,turn:0,flight:null,page:0});this.state.filters.hero=this.session.hero;}

 list(){const f=this.state.filters,p=this.profile,q=f.q.toLowerCase();
  return D.cards.filter(c=>(f.hero==='all'||D.playable(c,f.hero))
   &&(!q||(c.name+' '+c.text+' '+D.rarities[c.rarity]).toLowerCase().includes(q))
   &&(f.rarity==='all'||c.rarity===f.rarity)
   &&(f.mana==='all'||(f.mana==='7'?c.cost>=7:c.cost===+f.mana))
   &&(f.type==='all'||typeOf(c)===f.type)
   &&(!f.owned||p.collection[c.id]>0))
  .sort(sorters[f.sort]||sorters.cost);}
 counts(){const counts={};if(this.state.edit)for(const id of this.state.edit.cards)counts[id]=(counts[id]||0)+1;return counts;}
 // The deck as places: every copy on its own place, by mana and name; the rest of the 30 stay empty.
 slots(){const edit=this.state.edit;if(!edit)return [];const seen={};
  return [...edit.cards].sort((a,b)=>sorters.cost(D.byId[a],D.byId[b])).map(id=>{const k=seen[id]=(seen[id]||0)+1;return {card:D.byId[id],key:id+'#'+k};});}
 // Everything the view draws, derived from the profile and the screen state.
 get view(){
  const p=this.profile,s=this.state,editing=!!s.edit,tab=editing?'edit':s.tab,view={tab,filters:s.filters,edit:s.edit,dirty:s.dirty,dust:p.dust,
   unique:D.cards.filter(c=>p.collection[c.id]>0).length,total:D.cards.length,types:TYPES,sorts:SORTS};
  if(tab==='decks')view.decks=p.decks.map(d=>{const hero=D.heroes.find(h=>h.id===d.hero);
   return {deck:d,hero,icon:hero.icon,age:D.ageById[hero.age],curve:curveOf(d.cards),count:d.cards.length,complete:d.cards.length===DECK_SIZE};});
  // The grid of cards (shown in the tab Kartensammlung and while building; cheap enough to derive always).
  const list=this.list(),pages=Math.max(1,Math.ceil(list.length/PER_PAGE));s.page=Math.min(pages-1,Math.max(0,s.page));
  const counts=this.counts(),row=c=>({card:c,owned:p.collection[c.id]||0,inDeck:counts[c.id]||0,cap:cap(c)});
  Object.assign(view,{page:s.page,pages,found:list.length,turn:s.turn,flight:s.flight,
   ahead:tab==='decks'?null:[...list.slice((s.page+1)*PER_PAGE,(s.page+2)*PER_PAGE),...list.slice(Math.max(0,s.page-1)*PER_PAGE,s.page*PER_PAGE)].map(c=>c.id),
   cards:list.slice(s.page*PER_PAGE,s.page*PER_PAGE+PER_PAGE).map(row)});
  if(editing){
   const curve=curveOf(s.edit.cards),slots=this.slots();
   view.curve=curve;view.max=Math.max(4,...curve);view.bars=curve.map((n,i)=>({n,i,phase:phase(i)}));view.hint=curveHint(curve);view.era=era(s.edit.hero);
   view.hero=D.heroes.find(h=>h.id===s.edit.hero);view.slots=slots;view.size=DECK_SIZE;
   view.rows=Object.keys(counts).sort((a,b)=>D.byId[a].cost-D.byId[b].cost).map(id=>({card:D.byId[id],count:counts[id]}));
   // The place the flying card lands on: the last copy of it in the sorted deck.
   if(s.flight){const key=s.flight.id+'#'+counts[s.flight.id],to=slots.findIndex(x=>x.key===key);view.flight={...s.flight,to,key};}
  }else if(tab==='cards'){
   // Sammlung: progress by rarity (cards owned at least once).
   view.rarities=RARITY_ORDER.map(r=>{const all=D.cards.filter(c=>c.rarity===r);return {id:r,label:D.rarities[r],owned:all.filter(c=>p.collection[c.id]>0).length,total:all.length};});
  }
  return view;}

 // Reiter der Übersicht: Decks oder Kartensammlung.
 tab(id){if(!['decks','cards'].includes(id)||this.state.edit||this.state.tab===id)return;this.ui.play('stone',{gain:.5});
  Object.assign(this.state,{tab:id,page:0,turn:0,flight:null});if(id==='cards')Object.assign(this.state.filters,{hero:'all',q:'',owned:false});this.notify();}
 filter(k,v){if(!['q','hero','rarity','mana','type','sort'].includes(k))return;if(k==='hero'&&this.state.edit)return;
  if(k==='sort'&&!SORTS[v])return;if(k==='type'&&v!=='all'&&!TYPES[v])return;
  Object.assign(this.state,{page:0,turn:0});this.state.filters[k]=String(v);this.notify();}
 // Stone buttons for mana and rarity: a tap picks, a second tap on the same button shows all again.
 pick(k,v){if(!['rarity','mana'].includes(k))return;this.ui.play('stone',{gain:.6});this.filter(k,this.state.filters[k]===String(v)?'all':v);}
 toggleOwned(){Object.assign(this.state,{page:0,turn:0});this.state.filters.owned=!this.state.filters.owned;this.notify();}
 // Clears search and filters (the hero stays while building).
 resetFilters(){const f=this.state.filters;Object.assign(f,{q:'',rarity:'all',mana:'all',type:'all',owned:false});if(!this.state.edit)f.hero='all';Object.assign(this.state,{page:0,turn:0});this.notify();}
 // Turning a page of the card grid (the view slides the grid in the direction of state.turn).
 page(n){n=Math.sign(Number(n));const s=this.state,pages=Math.max(1,Math.ceil(this.list().length/PER_PAGE)),to=Math.min(pages-1,Math.max(0,s.page+n));
  if(!n||to===s.page)return;Object.assign(s,{page:to,turn:n});this.notify();this.ui.play('page');this.ui.haptic(0);}
 // slot: the place of the card in the grid (0–11), so the zoom starts where the card lies.
 inspect(id,slot){if(D.byId[id])this.ui.dialog('card',new CardDialog(this,id,slot));}
 // A tap on a card of the grid: while building it goes into the deck, otherwise (or if none is owned) the details open.
 tapCard(id,slot){const c=D.byId[id];if(!c)return;
  if(this.state.edit&&(this.profile.collection[id]||0)>0)this.addCard(id,slot);else this.inspect(id,slot);}

 newDeck(){this.ui.dialog('newDeck',new NewDeck(this));}
 createDeck(hero){if(!D.heroes.some(h=>h.id===hero))return;
  Object.assign(this.state,{edit:{id:'deck_'+Date.now(),name:era(hero)+' · Neu',hero,cards:[]},page:0,turn:0,flight:null,dirty:true});
  Object.assign(this.state.filters,{hero,q:'',owned:true});this.ui.close();this.notify();}
 editDeck(id){const d=this.profile.decks.find(d=>d.id===id);if(!d)return;this.ui.play('page');
  Object.assign(this.state,{edit:E.clone(d),page:0,turn:0,flight:null,dirty:false});Object.assign(this.state.filters,{hero:d.hero,q:'',owned:true});this.notify();}
 deckName(n){if(!this.state.edit)return;this.state.edit.name=String(n);this.state.dirty=true;this.notify();}
 addCard(id,slot){const edit=this.state.edit;if(!edit)return;const c=D.byId[id];if(!c)return;const n=edit.cards.filter(x=>x===id).length;
  if(edit.cards.length>=DECK_SIZE){this.ui.toast('Das Deck enthält bereits 30 Karten.');return;}
  if(!D.playable(c,edit.hero)){this.ui.toast('Diese Karte gehört zu einem anderen Helden.');return;}
  if(n>=Math.min(this.profile.collection[id]||0,cap(c))){this.ui.toast(n>=cap(c)?(cap(c)===1?'Legendäre Karten: höchstens 1 Exemplar.':'Höchstens 2 Exemplare je Karte.'):'Kein weiteres erlaubtes Exemplar im Besitz.');return;}
  edit.cards.push(id);this.state.dirty=true;
  this.state.flight={id,bar:bucket(c.cost),n:++this.flights,from:slot==null||slot===''?null:+slot};this.ui.close();this.notify();this.ui.play('play');}
 removeCard(id){const edit=this.state.edit;if(!edit)return;const i=edit.cards.lastIndexOf(id);if(i<0)return;edit.cards.splice(i,1);this.state.dirty=true;this.state.flight=null;this.notify();this.ui.play('stone',{gain:.4});}
 saveDeck(){const edit=this.state.edit,p=this.profile;if(!edit)return;const err=P.validateDeck(p,edit.hero,edit.cards);if(err){this.ui.toast(err);return;}
  edit.name=edit.name.trim()||era(edit.hero)+' · Deck';
  const i=p.decks.findIndex(d=>d.id===edit.id);if(i<0)p.decks.push(E.clone(edit));else p.decks[i]=E.clone(edit);
  this.state.dirty=false;this.commit();this.ui.toast('Deck gespeichert.');}
 // Fills up along a gentle mana curve with cards the player owns.
 autoFill(){const edit=this.state.edit,p=this.profile;if(!edit)return;
  const pool=D.cards.filter(c=>D.playable(c,edit.hero)&&p.collection[c.id]>0).sort((a,b)=>a.cost-b.cost);let guard=0;
  while(edit.cards.length<DECK_SIZE&&guard++<1000){let choices=pool.filter(c=>edit.cards.filter(id=>id===c.id).length<Math.min(p.collection[c.id],cap(c)));
   const cost=[1,2,2,3,3,4,4,5,6,7][edit.cards.length%10],near=choices.filter(c=>Math.abs(c.cost-cost)<=1);if(near.length)choices=near;if(!choices.length)break;
   edit.cards.push(choices[(edit.cards.length*7)%choices.length].id);}
  this.state.dirty=true;this.state.flight=null;this.notify();}
 clearDeck(){if(!this.state.edit)return;this.state.edit.cards=[];this.state.dirty=true;this.state.flight=null;this.notify();}
 stopEdit(){if(this.state.dirty){this.askDiscard(()=>this.discard());return;}Object.assign(this.state,{edit:null,flight:null,tab:'decks'});this.notify();}
 // Zurück im Deckbau führt zur Deckübersicht, sonst ins Hauptmenü.
 back(){if(this.state.edit)this.stopEdit();else super.back();}
 discard(){Object.assign(this.state,{dirty:false,edit:null,flight:null,tab:'decks'});this.notify();}
 deleteDeck(){const edit=this.state.edit,p=this.profile;if(!edit)return;
  if(p.decks.filter(d=>d.hero===edit.hero).length<=1&&p.decks.some(d=>d.id===edit.id)){this.ui.toast('Behalte mindestens ein Deck pro Held.');return;}
  this.ui.dialog('message',new Dialog(this.ctx,{title:'Deck löschen?',close:false,text:'Die Karten bleiben in Deiner Sammlung.',
   buttons:[{label:'Abbrechen'},{label:'Deck löschen',style:'danger',run:()=>this.doDeleteDeck()}]}));}
 doDeleteDeck(){const p=this.profile;p.decks=p.decks.filter(d=>d.id!==this.state.edit.id);Object.assign(this.state,{dirty:false,edit:null,flight:null,tab:'decks'});this.commit();}
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
 constructor(coll,id,slot){super(coll.ctx,{id,slot:slot==null||slot===''?null:+slot});this.coll=coll;if(LORE.card(id))coll.ctx.dialogs?.learned({type:'chronicle',card:id});}
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

const api={Collection,CardDialog,NewDeck,curveHint,curveOf,phase,typeOf,PER_PAGE,DECK_SIZE};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
