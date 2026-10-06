/* Collection & deck building view, the card detail dialog and the new-deck dialog.
 * Cards and deck rows are keyed: paging, filtering and adding cards move nodes instead of rebuilding them. */
(function(){'use strict';
const {html}=AEM,V=AEV,D=CHD,P=CHP,R=CHR;
const RARITIES=['basic','common','rare','epic','legendary'];
const option=(value,label,selected)=>html`<option value="${value}"${V.attr('selected',selected)}>${label}</option>`;

function filters(v){const f=v.filters;
 return html`<aside class="filters"><div class="eyebrow">Kartenbuch</div><input id="search" type="text" placeholder="Name oder Effekt …" value="${f.q}" data-input="filter" data-a="q" aria-label="Karten suchen"><label>HELD</label><select data-change="filter" data-a="hero"${V.attr('disabled',!!v.edit)}>${option('all','Alle Helden',f.hero==='all')}${D.heroes.map(h=>option(h.id,h.era,f.hero===h.id))}</select><label>SELTENHEIT</label><select data-change="filter" data-a="rarity">${option('all','Alle Seltenheiten',f.rarity==='all')}${RARITIES.map(r=>option(r,D.rarities[r],f.rarity===r))}</select><label>MANAKOSTEN</label><select data-change="filter" data-a="mana">${option('all','Alle Kosten',f.mana==='all')}${[0,1,2,3,4,5,6,7].map(n=>option(n,(n===7?'7+':n)+' Mana',f.mana===String(n)))}</select>${
  V.button({label:f.owned?'✓ Nur im Besitz':'Alle Karten zeigen',cmd:'toggleOwned',small:true})}<div class="stats">${v.unique} / 140 Karten<br>✧ ${v.dust} Staub<br><small>Karte antippen: Details${v.edit?' & Hinzufügen':''}</small></div>${
  V.button({label:'Duplikate entzaubern',cmd:'extras',small:true})}</aside>`;}

const card=x=>html`<button class="${V.cls('collect-card',!x.owned&&'locked')}" data-key="${x.card.id}" data-cmd="inspect" data-a="${x.card.id}"><img src="${R.thumb(x.card.id)}" alt="${x.card.name}">${x.inDeck?html`<span class="in-deck">${x.inDeck}</span>`:''}<span class="count">${x.owned?'× '+x.owned:'Nicht im Besitz'}</span></button>`;
const book=v=>html`<section class="cardbook"><div class="card-grid">${v.cards.map(card)}</div><div class="pagination">${
 V.button({label:'‹',cmd:'page',a:-1,small:true,disabled:v.page===0,aria:'Vorherige Seite'})}<span>${v.page+1} / ${v.pages}</span>${
 V.button({label:'›',cmd:'page',a:1,small:true,disabled:v.page>=v.pages-1,aria:'Nächste Seite'})}</div></section>`;

const chooser=v=>html`<div class="eyebrow">Deine Decks</div><h3>Wähle Deine Strategie</h3><div class="decklist">${v.decks.map(({deck,icon})=>
 html`<button class="deckrow" data-key="${deck.id}" data-cmd="editDeck" data-a="${deck.id}"><span class="mana">${icon}</span><b>${deck.name}</b><span>30 ›</span></button>`)}</div>${
 V.button({label:'+ Neues Deck',cmd:'newDeck',style:'gold'})}<div class="deck-info">30 Karten · höchstens 2 Exemplare<br>Legendäre Karten: höchstens 1 Exemplar</div>`;
const editor=v=>html`<div class="eyebrow">${v.era} · Deck bearbeiten</div><input type="text" maxlength="36" value="${v.edit.name}" data-input="deckName" aria-label="Deckname"><div class="deck-controls">${
 V.button({label:'Auffüllen',cmd:'autoFill'})}${V.button({label:'Leeren',cmd:'clearDeck'})}${V.button({label:'Löschen',cmd:'deleteDeck'})}</div><div class="decklist">${
 v.rows.length?v.rows.map(({card,count})=>html`<button class="deckrow" data-key="${card.id}" data-cmd="removeCard" data-a="${card.id}"><span class="mana">${card.cost}</span><b>${card.name}</b><span class="${card.rarity==='legendary'?'legend':''}">${count} −</span></button>`)
 :html`<p class="muted deck-empty">Wähle links Karten aus Deiner Sammlung und füge sie Deinem Deck hinzu.</p>`}</div><div class="curve">${
 v.curve.map((n,i)=>html`<div class="bar" style="height:${n/v.max*47}px" title="${n} Karten"><span>${i===7?'7+':i}</span></div>`)}</div><div class="${V.cls('deck-info',v.dirty&&'dirty')}">${v.edit.cards.length}/30 Karten ${v.dirty?'· ungespeichert':''} · Tippen entfernt eine Karte</div>${
 V.button({label:'Deck speichern',cmd:'saveDeck',style:'gold'})}${V.button({label:'Zur Deckübersicht',cmd:'stopEdit',small:true})}`;

AEV.screens=AEV.screens||{};AEV.dialogs=AEV.dialogs||{};
AEV.screens.collection={render:vm=>{const v=vm.view;
 return html`<div class="screen">${V.topbar('Sammlung & Decks',vm.wallet())}<div class="book">${filters(v)}${book(v)}<aside class="deck-side" data-key="${v.edit?'edit-'+v.edit.id:'decks'}">${v.edit?editor(v):chooser(v)}</aside></div></div>`;}};

AEV.dialogs.card={render:vm=>{const v=vm.view,c=v.card;
 const controls=html`<p>Besitz: <b>${v.owned}</b> · ${D.rarities[c.rarity]}</p>${V.buttons([
  v.editing?V.button({label:'Zum Deck hinzufügen',cmd:'addCard',a:c.id,style:'gold'}):'',
  v.price?[V.button({label:'Herstellen · '+v.price+' ✧',cmd:'craft',a:c.id,disabled:!v.canCraft}),V.button({label:'Entzaubern · +'+v.dust+' ✧',cmd:'dustCard',a:c.id,disabled:!v.canDust})]
  :html`<span class="muted">Basiskarten sind dauerhaft verfügbar.</span>`],'start')}`;
 return V.modal({width:1000,body:html`<div class="card-detail"><img src="${R.thumb(c.id)}" alt="${c.name}"><div class="details"><div class="eyebrow">${v.era} · ${c.cost} Mana · ${D.rarities[c.rarity]}</div><h3>${c.name}</h3><p class="card-text">${c.text||'Ein Diener ohne zusätzliche Fähigkeit.'}</p>${
  c.type==='minion'?html`<p>⚔ ${c.attack} Angriff · ♥ ${c.health} Leben</p>`:''}${controls}</div></div>`});}};

AEV.dialogs.newDeck={render:vm=>V.modal({close:false,body:html`<h2>Neues Deck</h2><p>Wähle den Helden für Dein neues Deck.</p><select id="newhero" class="wide" data-change="choose" aria-label="Held">${
 D.heroes.map(h=>option(h.id,h.name+' · '+h.era,vm.state.hero===h.id))}</select>${V.buttons([V.button({label:'Abbrechen',cmd:'close'}),V.button({label:'Deck erstellen',cmd:'create',style:'gold'})])}`})};
})();
