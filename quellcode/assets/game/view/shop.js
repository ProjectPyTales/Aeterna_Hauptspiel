/* Basar view: tabs, the pack counter and three cosmetic shelves, plus the large preview dialog.
 * The shelf is keyed by tab: switching tabs starts at the top, buying or equipping keeps the scroll. */
(function(){'use strict';
const {html}=AEM,V=AEV,R=CHR,S=CHS;
const LABEL={backs:'Kartenrücken',skins:'Helden-Skin',boards:'Schlachtfeld'};
const HINT={backs:'Dein Kartenrücken erscheint auf Deinem Deckstapel im Spiel und beim Öffnen von Kartenpaketen.',
 skins:'Alternative Porträts der Marmorhallen-Edition. Gleiche Gesichter, neue Gewänder – sie gelten für Deinen Helden im Spiel und in der Heldenwahl.',
 boards:'Das ausgerüstete Schlachtfeld wird in jeder Partie als Spielfeld geladen.'};

const state=e=>e.equipped?'Im Einsatz':e.owned?'Freigeschaltet':'Preis: '+e.item.price+' Gold';
function action(e){const {kind,item}=e;
 if(e.equipped)return kind==='skins'?V.button({label:'Standard tragen',cmd:'unequip',a:item.hero,small:true,extra:'act'}):V.button({label:'✓ Ausgerüstet',small:true,extra:'act',disabled:true});
 if(e.owned)return V.button({label:'Ausrüsten',cmd:'equip',a:kind,b:item.id,small:true,style:'teal',extra:'act'});
 return V.button({label:'Kaufen · '+item.price+' Gold',cmd:'buy',a:kind,b:item.id,small:true,style:'gold',extra:V.cls('act',e.short&&'short')});}
const art={
 backs:e=>html`<img class="back-art" src="${S.backURL(e.item.id)}" alt="">`,
 skins:e=>html`<span class="skin-art" style="${R.heroStyle(e.item.hero,e.item.atlas)}"></span>`,
 boards:e=>html`<img class="board-art" src="assets/art/${e.item.image}-preview.png" alt="">`};
const title=e=>e.kind==='skins'?e.hero.name:e.item.name;
const sub=e=>e.kind==='backs'?(e.item.price?'Kosmetik':'Standard'):e.item.text;
const tile=e=>html`<div class="${V.cls('shop-tile',e.equipped&&'equipped',!e.owned&&'locked')}" data-key="${e.item.id}"><button class="shop-preview" aria-label="Vorschau: ${title(e)}" data-cmd="preview" data-a="${e.kind}" data-b="${e.item.id}">${art[e.kind](e)}</button><h4>${title(e)}</h4><small>${sub(e)}</small><span class="shop-state">${state(e)}</span>${action(e)}</div>`;

const display=()=>html`<div class="pack-display"><span class="emblem">✦</span><span class="packtitle">AETERNA</span></div>`;
const packs=p=>html`<div class="pack-area">${display()}<div class="pack-info"><div class="eyebrow">Das historische Grundset</div><h1>Fünf neue Möglichkeiten.</h1><p>Jedes Pack enthält 5 Karten. Mindestens eine davon ist selten oder besser. Erspiele Gold in Duellen, Missionen und Aufträgen.</p>${
 V.button({label:p.pending?'Geöffnetes Pack ansehen':'Pack öffnen · '+p.packs+' verfügbar',cmd:'openPack',style:'gold',disabled:!p.packs&&!p.pending})}${
 V.button({label:'Ein Pack kaufen · 100 Gold',cmd:'buyPack',disabled:!p.canBuy})}<small>Keine Käufe mit echtem Geld. Duplikatschutz bis zur vollständigen Seltenheitsstufe. Eine legendäre Karte in den ersten 10 Packs, danach spätestens alle 40 Packs.<br>${
 V.button({label:'Chancen & Staubwerte',cmd:'packOdds',small:true})}</small></div></div>`;
const shelf=(vm,kind)=>html`<p class="shop-hint">${HINT[kind]}</p><div class="shop-grid grid-${kind}">${vm.items(kind).map(tile)}</div>`;

AEV.screens=AEV.screens||{};AEV.dialogs=AEV.dialogs||{};
AEV.screens.packs={render:vm=>{const tab=vm.state.tab;
 return html`<div class="screen bazaar">${V.topbar('Basar',vm.wallet())}${V.tabs(vm.tabs,tab,'tab')}<div class="shop-body" data-key="shelf-${tab}">${tab==='packs'?packs(vm.pack):shelf(vm,tab)}</div></div>`;}};

AEV.dialogs.shopPreview={render:vm=>{const e=vm.entry,{kind,item}=e;
 const big=kind==='backs'?html`<img class="preview-back" src="${S.backURL(item.id)}" alt="${item.name}">`:kind==='boards'?html`<img class="preview-board" src="assets/art/${item.image}.png" alt="${item.name}">`:
  html`<div class="preview-skins"><figure><span class="skin-art" style="${R.heroStyle(item.hero,'heroes')}"></span><figcaption>Standard</figcaption></figure><figure><span class="skin-art" style="${R.heroStyle(item.hero,item.atlas)}"></span><figcaption>${item.name}</figcaption></figure></div>`;
 return V.modal({width:kind==='boards'?1180:960,body:html`<div class="shop-preview-modal ${kind}">${big}<div class="details"><div class="eyebrow">${LABEL[kind]}</div><h2>${e.hero?e.hero.name:item.name}</h2><p>${e.hero?item.name+' · '+item.text:item.text}</p><p class="shop-state">${state(e)}</p>${V.buttons([action(e)])}</div></div>`});}};
})();
