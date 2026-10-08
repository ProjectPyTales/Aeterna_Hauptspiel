/* Basar view (AP 1.4, Basar 2.0): tabs, the pack on its pedestal, and for the four cosmetic tabs a shop window –
 * the choice on the left, the picked item large on a lit marble pedestal on the right, with its price and actions.
 * The list is keyed by tab: switching tabs starts at the top, picking, buying or equipping keeps the scroll. */
(function(){'use strict';
const {html}=AEM,V=AEV,R=CHR,S=CHS;
const LABEL={backs:'Kartenrücken',frames:'Kartenrahmen',skins:'Helden-Skin',boards:'Schlachtfeld'};
const HINT={backs:'Dein Kartenrücken erscheint, wenn Du Karten ziehst und Kartenpakete öffnest.',
 skins:'Alternative Porträts der Marmorhallen-Edition – sie gelten für Deinen Helden im Spiel und in der Heldenwahl.',
 frames:'Der Rahmen Deiner Karten – in der Hand, im Duell und in der Sammlung. Goldene Karten tragen Blattgold, im Duell läuft ein Glanz darüber.',
 boards:'Das ausgerüstete Schlachtfeld ist Dein Feldherrentisch in jeder Partie. Tische mit „Bild folgt“ sind Platzhalter – das gemalte Bild kommt mit einem Update.'};
// Tables without a picture are placeholders (AP L.4): the standard table under their colour filter, marked as such.
const table=(item,cls,big)=>html`<span class="board-frame"><img class="${cls}" src="assets/art/${item.image||'board'}${big?'':'-preview'}.webp" style="${item.tint?'--tint:'+item.tint:''}" alt="${big?item.name:''}">${item.image?'':html`<span class="board-note">Platzhalter · Bild folgt</span>`}</span>`;

// Clear states (AP 1.4): locked with its price, owned, in use.
const badge=e=>e.equipped?html`<span class="badge in-use">Im Einsatz</span>`:e.owned?html`<span class="badge owned">Im Besitz</span>`:html`<span class="${V.cls('badge locked',e.short&&'short')}">◉ ${e.item.price}</span>`;
const state=e=>e.equipped?'Im Einsatz':e.owned?'Freigeschaltet':'Preis: '+e.item.price+' Gold';
function action(e){const {kind,item}=e;
 if(e.equipped)return kind==='skins'?V.button({label:'Standard tragen',cmd:'unequip',a:item.hero,extra:'act'}):V.button({label:'✓ Ausgerüstet',extra:'act',disabled:true});
 if(e.owned)return V.button({label:'Ausrüsten',cmd:'equip',a:kind,b:item.id,style:'teal',extra:'act'});
 return V.button({label:'Kaufen · '+item.price+' Gold',cmd:'buy',a:kind,b:item.id,style:'gold',extra:V.cls('act',e.short&&'short')});}
// A frame shows on a sample card (Leonidas' hoplite captain).
const art={
 backs:e=>html`<img class="back-art" src="${S.backURL(e.item.id)}" alt="">`,
 frames:e=>html`<img class="frame-art" src="${R.frameSample(e.item.id)}" alt="">`,
 skins:e=>html`<span class="skin-art" style="${R.heroStyle(e.item.hero,e.item.atlas)}"></span>`,
 boards:e=>table(e.item,'board-art')};
const title=e=>e.kind==='skins'?e.hero.name:e.item.name;
const sub=e=>e.kind==='backs'||e.kind==='frames'?(e.item.price?'Kosmetik':'Standard'):e.kind==='skins'?e.item.name:e.item.text;
const tile=e=>html`<div class="${V.cls('shop-tile',e.equipped&&'equipped',!e.owned&&'locked',e.picked&&'picked')}" data-key="${e.item.id}"><button class="shop-pick" aria-label="Zeigen: ${title(e)}" aria-pressed="${e.picked}" data-cmd="select" data-a="${e.kind}" data-b="${e.item.id}">${art[e.kind](e)}<span class="tile-text"><b>${title(e)}</b><small>${sub(e)}</small></span>${badge(e)}</button></div>`;

// ---------- The pedestal ----------
// ASTRA: praesentationspodest – runder Marmorsockel mit Bronzering unter einem warmen Lichtkegel, 1200 × 900
const pedestal=body=>html`<div class="podium"><span class="spot"></span><span class="spot-floor"></span>${body}<span class="pedestal"><i></i></span></div>`;
// A card back turns slowly in 3D; its reverse is a card in Your frame. Stands still under reduced motion.
const spinning=item=>html`<div class="spin-card" aria-hidden="true"><div class="spin-inner"><img class="face" src="${S.backURL(item.id)}" alt=""><img class="face reverse" src="${R.frameSample(R.look.frame)}" alt=""></div></div>`;
// A frame on a standing card; golden cards catch a passing glint (the same streak as in the duel).
const framed=item=>html`<div class="${V.cls('stand-card',item.id==='gold'&&'gilded')}"><img src="${R.frameSample(item.id)}" alt="${item.name}"><span class="glint"></span></div>`;
// ASTRA: heldenmuenze-basar – Skin in der bronzenen Heldenmünze wie im Duell (Rändelung, Umschrift), 640 × 640
const coin=(e,item)=>html`<div class="shop-coin"><span class="coin-rim"></span><span class="coin-face" style="${R.heroStyle(item.hero,item.atlas)}"></span><span class="coin-name">${e.hero.name}</span></div><div class="coin-standard"><span class="coin-face" style="${R.heroStyle(item.hero,'heroes')}"></span><small>Standard</small></div>`;
// ASTRA: miniatur-spielfeld – Schlachtfeld als kleiner Feldherrentisch in Schrägsicht mit Münzen und Plaketten, 1000 × 700
const MINI=[[-2,1],[-1,1],[0,1],[1,1],[-1,-1],[0,-1],[1,-1],[2,-1]];
const miniature=item=>html`<div class="mini-field"><div class="mini-table"><img src="assets/art/${item.image||'board'}-preview.webp" style="${item.tint?'--tint:'+item.tint:''}" alt="${item.name}">${
 MINI.map(([x,y])=>html`<i class="mini-plaque" style="--x:${x};--y:${y}"></i>`)}<i class="mini-coin top"></i><i class="mini-coin bottom"></i></div>${item.image?'':html`<span class="board-note">Platzhalter · Bild folgt</span>`}</div>`;
const showpiece={backs:(e,item)=>spinning(item),frames:(e,item)=>framed(item),skins:coin,boards:(e,item)=>miniature(item)};

// The staged purchase (keyed by its token): coins arc from the wallet (top right, --sx/--sy from the pedestal) onto the
// pedestal, a seal stamps on the item and cracks, light bursts. Hidden under reduced motion (CSS).
const COINS=[...Array(11).keys()];
const purchase=n=>html`<div class="buy-fx" data-key="buy-${n}" aria-hidden="true">${COINS.map(i=>html`<i class="fly-coin" style="--i:${i};--sx:${440+(i*37%70)}px;--sy:${-610+(i*53%50)}px;--ex:${(i%5-2)*22}px;--ey:${-4-(i*7%14)}px;--lift:${90+(i*29%70)}px"></i>`)}<span class="seal-break"><i class="half l"></i><i class="half r"></i></span><span class="buy-burst"></span></div>`;

function window_(vm){const e=vm.showcase,{kind,item}=e;
 return html`<div class="${V.cls('shop-window','kind-'+kind,!e.owned&&'locked')}" data-key="window-${kind}-${item.id}">${pedestal(showpiece[kind](e,item))}${e.bought?purchase(e.bought):''}<div class="plaque-info"><div class="eyebrow">${LABEL[kind]}</div><h2>${e.hero?e.hero.name:item.name}</h2><p>${e.hero?item.name+' · '+item.text:item.text||(item.price?'Kosmetik':'Standard')}</p><p class="shop-state">${state(e)}</p>${V.buttons([action(e)])}</div></div>`;}
const shelf=(vm,kind)=>html`<div class="shop-list grid-${kind}"><p class="shop-hint">${HINT[kind]}</p>${vm.items(kind).map(tile)}</div>${window_(vm)}`;

const display=()=>html`<div class="pack-display"><span class="emblem">✦</span><span class="packtitle">AETERNA</span></div>`;
const packs=p=>html`<div class="pack-area">${pedestal(display())}<div class="pack-info"><div class="eyebrow">Das historische Grundset</div><h1>Fünf neue Möglichkeiten.</h1><p>Jedes Pack enthält 5 Karten. Mindestens eine davon ist selten oder besser. Erspiele Gold in Duellen, Missionen und Aufträgen.</p>${
 V.button({label:p.pending?'Geöffnetes Pack ansehen':'Pack öffnen · '+p.packs+' verfügbar',cmd:'openPack',style:'gold',disabled:!p.packs&&!p.pending})}${
 html`<div class="pack-row">${p.bulk?V.button({label:'Alle öffnen · '+p.bulk,cmd:'openAll',extra:'open-all',aria:p.bulk+' Kartenpakete auf einmal öffnen'}):''}${
 V.button({label:p.bulk?'Pack kaufen · 100 Gold':'Ein Pack kaufen · 100 Gold',cmd:'buyPack',disabled:!p.canBuy})}</div>`}<small>Keine Käufe mit echtem Geld. Duplikatschutz bis zur vollständigen Seltenheitsstufe. Eine legendäre Karte in den ersten 10 Packs, danach spätestens alle 40 Packs.<br>${
 V.button({label:'Chancen & Staubwerte',cmd:'packOdds',small:true})}</small></div></div>`;

AEV.screens=AEV.screens||{};
AEV.screens.packs={render:vm=>{const tab=vm.state.tab;
 return html`<div class="screen bazaar">${V.topbar('Basar',vm.wallet())}${V.tabs(vm.tabs,tab,'tab')}<div class="${V.cls('shop-body',tab!=='packs'&&'showcase')}" data-key="shelf-${tab}">${tab==='packs'?packs(vm.pack):shelf(vm,tab)}</div></div>`;}};
})();
