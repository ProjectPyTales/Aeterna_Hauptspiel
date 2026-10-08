/* Collection & deck building view (AP 1.6, Sammlung 2.0), the card detail dialog and the new-deck dialog.
 * An open card book with two pages; a page turn is a sheet that swings over the spine (keyed by page, so a new page
 * animates, a filter change on the same page does not). Mana and rarity are stone buttons, the mana curve stays in
 * sight while building. Cards and deck rows are keyed: paging, filtering and adding cards move nodes instead of rebuilding them. */
(function(){'use strict';
const {html}=AEM,V=AEV,D=CHD,P=CHP,R=CHR;
const RARITIES=['basic','common','rare','epic','legendary'];
const PHASE={early:'Früh',mid:'Mitte',late:'Spät'};
const option=(value,label,selected)=>html`<option value="${value}"${V.attr('selected',selected)}>${label}</option>`;
// Where a card lies on the open spread (stage units, relative to the book) – the zoom starts there, a flight ends at its bar.
const slotAt=i=>({x:[390,605,830,1045][i%4],y:i<4?160:456});
const ZOOM={x:490,y:308},barX=i=>1231+46*i,BAR_Y=520;

// ASTRA: filterknopf – Steinknöpfe für Manakosten (Ätherkristall mit Zahl) und Seltenheit (Archiv-Siegel), je 96 × 96
function filters(v){const f=v.filters;
 return html`<aside class="filters"><div class="eyebrow">Kartenbuch</div><input id="search" type="text" placeholder="Name oder Effekt …" value="${f.q}" data-input="filter" data-a="q" aria-label="Karten suchen"><label>HELD</label><select data-change="filter" data-a="hero"${V.attr('disabled',!!v.edit)}>${option('all','Alle Helden',f.hero==='all')}${D.heroes.map(h=>option(h.id,h.era,f.hero===h.id))}</select><label>MANAKOSTEN</label><div class="mana-knobs">${
  [0,1,2,3,4,5,6,7].map(n=>html`<button class="${V.cls('knob',f.mana===String(n)&&'on')}" data-cmd="pick" data-a="mana" data-b="${n}" aria-pressed="${f.mana===String(n)}" aria-label="${n===7?'7 oder mehr':n} Mana">${n===7?'7+':n}</button>`)}</div><label>SELTENHEIT <b>${f.rarity==='all'?'alle':D.rarities[f.rarity]}</b></label><div class="rarity-seals">${
  RARITIES.map(r=>html`<button class="${V.cls('seal-knob',r,f.rarity===r&&'on')}" data-cmd="pick" data-a="rarity" data-b="${r}" aria-pressed="${f.rarity===r}" aria-label="${D.rarities[r]}" title="${D.rarities[r]}"></button>`)}</div>${
  V.button({label:f.owned?'✓ Nur im Besitz':'Alle Karten zeigen',cmd:'toggleOwned',small:true})}<div class="stats">${v.unique} / ${v.total} Karten · ✧ ${v.dust}<br><small>Karte antippen: Details${v.edit?' & Hinzufügen':''}</small></div>${
  V.button({label:'Duplikate entzaubern',cmd:'extras',small:true})}</aside>`;}

const card=(x,i)=>html`<button class="${V.cls('collect-card',!x.owned&&'locked')}" data-key="${x.card.id}" data-cmd="inspect" data-a="${x.card.id}" data-b="${i}"><img src="${R.thumb(x.card.id)}" alt="${x.card.name}" decoding="async">${x.inDeck?html`<span class="in-deck">${x.inDeck}</span>`:''}<span class="count">${x.owned?'× '+x.owned:'Nicht im Besitz'}</span></button>`;
// The same card on the turning leaf and on the old half under it: a picture only, no command.
const still=x=>html`<span class="${V.cls('collect-card',!x.owned&&'locked')}"><img src="${R.thumb(x.card.id)}" alt="" decoding="async">${x.inDeck?html`<span class="in-deck">${x.inDeck}</span>`:''}<span class="count">${x.owned?'× '+x.owned:'Nicht im Besitz'}</span></span>`;
const leaf=v=>v.turn&&v.leaf?html`<div class="${V.cls('page','under',v.turn>0?'on-left':'on-right')}" aria-hidden="true">${v.leaf.under.map(still)}</div><div class="page-turn" aria-hidden="true"><div class="leaf-face front">${v.leaf.front.map(still)}</div><div class="leaf-face back">${v.leaf.back.map(still)}</div></div>`:'';
// ASTRA: kartenbuch – aufgeschlagenes Kartenbuch mit Ledereinband, Pergamentseiten und Buchrücken, 1868 × 1240
const book=v=>{const left=v.cards.slice(0,4),right=v.cards.slice(4);
 return html`<section class="cardbook"><div class="${V.cls('spread',v.turn>0&&'turn-next',v.turn<0&&'turn-prev')}" data-key="page-${v.page}"><div class="page left">${left.map((x,i)=>card(x,i))}</div><div class="spine"></div><div class="page right">${right.map((x,i)=>card(x,i+4))}</div>${leaf(v)}</div><div class="pagination">${
 V.button({label:'‹',cmd:'page',a:-1,small:true,disabled:v.page===0,aria:'Vorherige Seite'})}<span>Seite ${v.page+1} / ${v.pages}</span>${
 V.button({label:'›',cmd:'page',a:1,small:true,disabled:v.page>=v.pages-1,aria:'Nächste Seite'})}</div></section>`;};

// A small curve on every deck in the overview, the full one while building.
const mini=curve=>{const max=Math.max(3,...curve);return html`<span class="mini-curve" aria-hidden="true">${curve.map((n,i)=>html`<i class="${i<=3?'ph-early':i<=6?'ph-mid':'ph-late'}" style="height:${Math.round(n/max*22)+2}px"></i>`)}</span>`;};
const chooser=v=>html`<div class="eyebrow">Deine Decks</div><h3>Wähle Deine Strategie</h3><div class="decklist">${v.decks.map(({deck,icon,curve})=>
 html`<button class="deckrow" data-key="${deck.id}" data-cmd="editDeck" data-a="${deck.id}"><span class="mana">${icon}</span><b>${deck.name}</b>${mini(curve)}<span>›</span></button>`)}</div>${
 V.button({label:'+ Neues Deck',cmd:'newDeck',style:'gold'})}<div class="deck-info">30 Karten · höchstens 2 Exemplare<br>Legendäre Karten: höchstens 1 Exemplar</div>`;
// ASTRA: manakurve – Balken der Manakurve als Ätherkristall-Säulen in drei Phasenfarben, 760 × 220
const curve=v=>{const fl=v.flight;return html`<div class="curve-box"><div class="curve" role="img" aria-label="Manakurve: ${v.curve.map((n,i)=>(i===7?'7+':i)+': '+n).join(', ')}">${
 v.bars.map(b=>html`<div class="${V.cls('bar','ph-'+b.phase)}" style="height:${Math.round(b.n/v.max*64)+3}px"><em>${b.n||''}</em>${fl&&fl.bar===b.i?html`<i class="grow" data-key="g${fl.n}"></i>`:''}<span>${b.i===7?'7+':b.i}</span></div>`)}</div><div class="phases">${
 Object.entries(PHASE).map(([k,label])=>html`<span class="ph-${k}">${label} ${v.hint.phases[k]}</span>`)}<span class="avg">Ø ${v.hint.avg}</span></div><p class="${V.cls('curve-hint',v.hint.warn&&'warn')}">${v.hint.text}</p></div>`;};
const editor=v=>html`<div class="eyebrow">${v.era} · Deck bearbeiten</div><input type="text" maxlength="36" value="${v.edit.name}" data-input="deckName" aria-label="Deckname"><div class="deck-controls">${
 V.button({label:'Auffüllen',cmd:'autoFill'})}${V.button({label:'Leeren',cmd:'clearDeck'})}${V.button({label:'Löschen',cmd:'deleteDeck'})}</div><div class="decklist">${
 v.rows.length?v.rows.map(({card,count})=>html`<button class="deckrow" data-key="${card.id}" data-cmd="removeCard" data-a="${card.id}"><span class="mana">${card.cost}</span><b>${card.name}</b><span class="${card.rarity==='legendary'?'legend':''}">${count} −</span></button>`)
 :html`<p class="muted deck-empty">Wähle links Karten aus Deiner Sammlung und füge sie Deinem Deck hinzu.</p>`}</div>${curve(v)}<div class="${V.cls('deck-info',v.dirty&&'dirty')}">${v.edit.cards.length}/30 Karten ${v.dirty?'· ungespeichert':''} · Tippen entfernt eine Karte</div><div class="deck-actions">${
 V.button({label:'Deck speichern',cmd:'saveDeck',style:'gold'})}${V.button({label:'Übersicht',cmd:'stopEdit',small:true,aria:'Zur Deckübersicht'})}</div>`;
// An added card flies from the zoomed view into its bar of the curve (keyed by its token, hidden under reduced motion).
const flight=v=>{const f=v.flight;if(!f||!v.edit)return '';
 return html`<img class="fly-card" data-key="fly-${f.n}" src="${R.thumb(f.id)}" alt="" style="--tx:${barX(f.bar)-ZOOM.x}px;--ty:${BAR_Y-ZOOM.y}px">`;};

// The pages next to the open one are drawn while the browser idles, so turning a page shows finished cards at once
// (drawing eight card faces in the frame of the turn cost 50–70 ms).
const idle=window.requestIdleCallback||(f=>setTimeout(f,120));let warm=null;
function prefetch(ids){const key=ids.join();if(key===warm)return;warm=key;idle(()=>{for(const id of ids)R.thumb(id);});}

AEV.screens=AEV.screens||{};AEV.dialogs=AEV.dialogs||{};
AEV.screens.collection={render:vm=>{const v=vm.view;prefetch(v.ahead);
 return html`<div class="screen">${V.topbar('Sammlung & Decks',vm.wallet())}<div class="book">${filters(v)}${book(v)}<aside class="deck-side" data-key="${v.edit?'edit-'+v.edit.id:'decks'}">${v.edit?editor(v):chooser(v)}</aside>${flight(v)}</div></div>`;}};

// The card zooms in from its place on the page (--fx/--fy: from the dialog's picture back to the slot).
AEV.dialogs.card={render:vm=>{const v=vm.view,c=v.card,slot=vm.state.slot,from=slot==null?null:slotAt(slot);
 const controls=html`<p>Besitz: <b>${v.owned}</b> · ${D.rarities[c.rarity]}</p>${V.buttons([
  v.editing?V.button({label:'Zum Deck hinzufügen',cmd:'addCard',a:c.id,style:'gold'}):'',
  v.price?[V.button({label:'Herstellen · '+v.price+' ✧',cmd:'craft',a:c.id,disabled:!v.canCraft}),V.button({label:'Entzaubern · +'+v.dust+' ✧',cmd:'dustCard',a:c.id,disabled:!v.canDust})]
  :html`<span class="muted">Basiskarten sind dauerhaft verfügbar.</span>`],'start')}`;
 return V.modal({width:1000,scrim:true,body:html`<div class="card-detail"><img class="${V.cls('zoom-in',from&&'from-slot')}" src="${R.thumb(c.id)}" alt="${c.name}" style="${from?`--fx:${from.x-ZOOM.x}px;--fy:${from.y+92-400}px`:''}"><div class="details"><div class="eyebrow">${v.era} · ${c.cost} Mana · ${D.rarities[c.rarity]}</div><h3>${c.name}</h3><p class="card-text">${c.text||'Ein Diener ohne zusätzliche Fähigkeit.'}</p>${V.glossary(c.text)}${
  c.building?html`<p>♜ ${c.health} Haltbarkeit</p>`:c.type==='minion'?html`<p>⚔ ${c.attack} Angriff · ♥ ${c.health} Leben</p>`:''}${controls}</div></div>`});}};

AEV.dialogs.newDeck={render:vm=>V.modal({close:false,body:html`<h2>Neues Deck</h2><p>Wähle den Helden für Dein neues Deck.</p><select id="newhero" class="wide" data-change="choose" aria-label="Held">${
 D.heroes.map(h=>option(h.id,h.name+' · '+h.era,vm.state.hero===h.id))}</select>${V.buttons([V.button({label:'Abbrechen',cmd:'close'}),V.button({label:'Deck erstellen',cmd:'create',style:'gold'})])}`})};
})();
