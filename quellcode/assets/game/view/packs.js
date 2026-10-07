/* Pack opening view: a sealed pack, a tear, a burst, five individually turning cards.
 * The cards keep their nodes while they are revealed, so the CSS flip runs on the same element. */
(function(){'use strict';
const {html,raw}=AEM,D=CHD,R=CHR,S=CHS;
const display=()=>html`<div class="pack-display"><span class="emblem">✦</span><span class="packtitle">AETERNA</span></div>`;
const sparks=raw(Array.from({length:20},(_,i)=>`<i class="pack-spark" style="--a:${i*137.5}deg;--travel:${170+(i%5)*80}px;--delay:${i%4*30}ms"></i>`).join(''));
const opening=()=>html`<div class="scrim pack-opening"><div class="pack-flash"></div><div class="pack-runes">✦</div><div class="pack-shell"><div class="pack-half pack-top">${display()}</div><div class="pack-half pack-bottom">${display()}</div></div>${sparks}<p class="pack-opening-caption">Ein neues Kapitel beginnt …</p><button class="small skip-pack" data-cmd="skip">Animation überspringen</button></div>`;
const back=()=>R.look.back==='chroniken'?html`<span class="pack-card-back"><span class="back">✦</span><span class="back-line">AETERNA</span></span>`:html`<span class="pack-card-back custom" style="background-image:url(${S.backURL(R.look.back)})"></span>`;
function slot(x,animate){const c=x.card,rarity=c.rarity,i=x.index;
 return html`<div class="pack-slot ${animate?'deal-in':''}" style="--i:${i};--offset:${(2-i)*263}px" data-key="slot${i}"><button class="reveal-card ${rarity} ${x.open?'revealed':''}" data-pack-index="${i}" style="--rarity:${R.rarityColor[rarity]}" data-cmd="reveal" data-a="${i}" aria-label="${x.open?c.name+', '+D.rarities[rarity]:'Karte '+(i+1)+' aufdecken'}"><span class="card-flipper">${back()}<span class="pack-card-front"><img src="${R.thumb(c.id)}" alt="${c.name}"></span></span><span class="reveal-burst"></span><small>${x.isNew?'NEU ENTDECKT':'FÜR DEINE SAMMLUNG'}</small><span class="pack-rarity">${D.rarities[rarity]}</span></button></div>`;}
function reveal(vm){const all=vm.state.revealed.length>=5;
 return html`<div class="scrim pack-reveal"><div class="reveal"><div class="eyebrow">Die Geschichte liegt in Deinen Händen</div><h2>Dein Aeterna-Pack</h2><div class="reveal-cards">${vm.cards.map(x=>slot(x,vm.state.animate))}</div><p class="pack-status">${all?'Alle fünf Karten sind in Deiner Sammlung gespeichert.':'Tippe auf eine Karte und enthülle ihre Geschichte.'}</p><div class="pack-actions"><button class="gold pack-finish" data-cmd="finish">${all?'Zur Sammlung der Packs':'Alle aufdecken'}</button></div></div></div>`;}
// Massenöffnung (Rückmeldung zu 1.10.0): eine Übersicht statt fünf umdrehender Karten je Paket.
// Not yet shown cards wait as sealed backs in their place; the view model uncovers them a few at a time.
const tally=(g,shown)=>shown?html`<div class="bulk-card ${g.card.rarity}" data-key="${g.card.id}" style="--rarity:${R.rarityColor[g.card.rarity]}"><img src="${R.thumb(g.card.id)}" alt="${g.card.name}">${
 g.isNew?html`<span class="bulk-new">NEU</span>`:''}${g.count>1?html`<span class="bulk-count">×${g.count}</span>`:''}</div>`
 :html`<div class="bulk-card sealed ${g.card.rarity}" data-key="${g.card.id}" style="--rarity:${R.rarityColor[g.card.rarity]}"></div>`;
function bulk(vm){const b=vm.state.bulk;
 return html`<div class="scrim pack-reveal pack-bulk"><div class="reveal"><div class="eyebrow">${b.packs} Kartenpakete geöffnet · ${b.total} Karten</div><h2>Deine neuen Schätze</h2><p class="bulk-stats">${
  b.fresh} neu entdeckt · ${b.legendary} legendär · ${b.epic} episch – alle Karten sind in Deiner Sammlung gespeichert.</p><div class="bulk-grid">${b.list.map((g,i)=>tally(g,i<b.shown))}</div><div class="pack-actions"><button class="gold pack-finish" data-cmd="finish">Zur Sammlung der Packs</button></div></div></div>`;}
AEV.dialogs=AEV.dialogs||{};
AEV.dialogs.packs={render:vm=>vm.state.phase==='opening'?opening():vm.state.phase==='reveal'?reveal(vm):vm.state.phase==='bulk'&&vm.state.bulk?bulk(vm):''};
})();
