/* Collection & deck building view (Sammlung 3.0, seit 1.35.0), the card detail dialog and the new-deck dialog.
 * Übersicht: ein Raster aller Decks (Heldenbild, Name, Kartenzahl, kleine Manakurve) und der Reiter Kartensammlung.
 * Deckbau in zwei Spalten: links das Deck als 30 Plätze mit Manakurve, rechts alle Karten als Raster mit Suche und Filtern.
 * Mana und Seltenheit bleiben Steinknöpfe (AP 1.6). Raster und Deckplätze sind keyed: Blättern, Filtern und Hinzufügen
 * bewegen Knoten, statt sie neu zu bauen; eine neue Seite ist ein neuer Knoten (data-key page-N) und gleitet herein. */
(function(){'use strict';
const {html}=AEM,V=AEV,D=CHD,R=CHR;
const RARITIES=['basic','common','rare','epic','legendary'];
const PHASE={early:'Früh',mid:'Mitte',late:'Spät'};
const option=(value,label,selected)=>html`<option value="${value}"${V.attr('selected',selected)}>${label}</option>`;
// Geometry in stage units, relative to the area under the top bar (see screens.css): the grid on the right, the deck on the left.
const POOL={x:660,y:136,w:146,h:206,dx:155,dy:222,cols:6},DECK={x:18,y:76,w:70,h:99,dx:76,dy:105,cols:8};
const poolAt=i=>({x:POOL.x+(i%POOL.cols)*POOL.dx,y:POOL.y+Math.floor(i/POOL.cols)*POOL.dy});
const deckAt=i=>({x:DECK.x+(i%DECK.cols)*DECK.dx,y:DECK.y+Math.floor(i/DECK.cols)*DECK.dy});
// Where the card detail dialog shows its picture (300 wide, centred on the stage).
const ZOOM={x:490,y:308};

// ---------- Übersicht ----------
const mini=curve=>{const max=Math.max(3,...curve);return html`<span class="mini-curve" aria-hidden="true">${curve.map((n,i)=>html`<i class="${i<=3?'ph-early':i<=6?'ph-mid':'ph-late'}" style="height:${Math.round(n/max*22)+2}px"></i>`)}</span>`;};
// Deck tile: the hero picture behind a name plate with the card count and a small curve.
const deckTile=({deck,hero,age,curve,count,complete})=>html`<button class="deck-tile" data-key="${deck.id}" data-cmd="editDeck" data-a="${deck.id}" style="--hero:${hero.color}" aria-label="${deck.name}, ${count} von 30 Karten"><span class="tile-art" style="${R.heroStyle(hero.id,true)}"></span><span class="tile-age" title="${age?.name||''}">${age?.icon||hero.icon}</span><span class="tile-plate"><b>${deck.name}</b><small>${hero.name}</small><span class="tile-meta"><span class="${V.cls('tile-count',!complete&&'short')}">${count}/30</span>${mini(curve)}</span></span></button>`;
const deckGrid=v=>html`<div class="deck-grid scroll">${html`<button class="deck-tile new" data-key="new" data-cmd="newDeck"><span class="plus">+</span><b>Neues Deck</b><small>Held wählen und Karten zusammenstellen</small></button>`}${v.decks.map(deckTile)}</div>`;

// ---------- Rechte Spalte: alle Karten ----------
// ASTRA: filterknopf – Steinknöpfe für Manakosten (Ätherkristall mit Zahl) und Seltenheit (Archiv-Siegel), je 96 × 96
function filters(v){const f=v.filters,editing=v.tab==='edit';
 return html`<div class="pool-filters"><input id="search" type="text" placeholder="Name oder Effekt …" value="${f.q}" data-input="filter" data-a="q" aria-label="Karten suchen"><select data-change="filter" data-a="hero" aria-label="Held"${V.attr('disabled',editing)}>${option('all','Alle Helden',f.hero==='all')}${D.heroes.map(h=>option(h.id,h.era,f.hero===h.id))}</select><select data-change="filter" data-a="type" aria-label="Kartenart">${option('all','Alle Arten',f.type==='all')}${Object.entries(v.types).map(([k,l])=>option(k,l,f.type===k))}</select><select data-change="filter" data-a="sort" aria-label="Sortieren">${Object.entries(v.sorts).map(([k,l])=>option(k,'Nach '+l,f.sort===k))}</select></div><div class="pool-knobs"><div class="mana-knobs" role="group" aria-label="Manakosten">${
  [0,1,2,3,4,5,6,7].map(n=>html`<button class="${V.cls('knob',f.mana===String(n)&&'on')}" data-cmd="pick" data-a="mana" data-b="${n}" aria-pressed="${f.mana===String(n)}" aria-label="${n===7?'7 oder mehr':n} Mana">${n===7?'7+':n}</button>`)}</div><div class="rarity-seals" role="group" aria-label="Seltenheit">${
  RARITIES.map(r=>html`<button class="${V.cls('seal-knob',r,f.rarity===r&&'on')}" data-cmd="pick" data-a="rarity" data-b="${r}" aria-pressed="${f.rarity===r}" aria-label="${D.rarities[r]}" title="${D.rarities[r]}"></button>`)}</div>${
  V.button({label:f.owned?'✓ Im Besitz':'Alle Karten',cmd:'toggleOwned',small:true,extra:V.cls('owned-toggle',f.owned&&'on'),aria:f.owned?'Nur Karten im Besitz':'Alle Karten zeigen'})}${
  V.button({label:'↺',cmd:'resetFilters',small:true,extra:'reset',aria:'Filter zurücksetzen'})}</div>`;}

const badges=x=>html`${x.inDeck?html`<span class="in-deck">${x.inDeck}/${Math.min(x.cap,Math.max(x.owned,x.inDeck))}</span>`:''}<span class="count">${x.owned?'× '+x.owned:'Nicht im Besitz'}</span>`;
const poolCard=(editing,x,i)=>{const full=editing&&x.owned>0&&x.inDeck>=Math.min(x.owned,x.cap);
 return html`<div class="${V.cls('pool-card',!x.owned&&'locked',full&&'full')}" data-key="${x.card.id}"><button class="collect-card" data-cmd="tapCard" data-a="${x.card.id}" data-b="${i}" aria-label="${x.card.name}${editing&&x.owned?' – ins Deck':''}"><img src="${R.thumb(x.card.id)}" alt="" decoding="async">${badges(x)}</button>${
  editing?html`<button class="pc-info" data-cmd="inspect" data-a="${x.card.id}" data-b="${i}" aria-label="Details: ${x.card.name}">i</button>`:''}</div>`;};
const pool=v=>{const editing=v.tab==='edit';
 return html`<section class="pool">${filters(v)}<div class="${V.cls('pool-grid',v.turn>0&&'turn-next',v.turn<0&&'turn-prev')}" data-key="page-${v.page}">${
  v.cards.length?v.cards.map((x,i)=>poolCard(editing,x,i)):html`<p class="pool-empty muted">Keine Karte passt zu Suche und Filtern.</p>`}</div><div class="pool-pager">${
 V.button({label:'‹',cmd:'page',a:-1,small:true,disabled:v.page===0,aria:'Vorherige Seite'})}<span>Seite ${v.page+1} / ${v.pages}<small>${v.found} Karten</small></span>${
 V.button({label:'›',cmd:'page',a:1,small:true,disabled:v.page>=v.pages-1,aria:'Nächste Seite'})}</div><p class="pool-help">${
 editing?'Karte antippen: ins Deck · ⓘ Details · Platz im Deck antippen: heraus · Wischen blättert':'Karte antippen: Details, Herstellen und Entzaubern · Wischen blättert'}</p></section>`;};

// ---------- Linke Spalte: das Deck oder die Sammlung ----------
// ASTRA: manakurve – Balken der Manakurve als Ätherkristall-Säulen in drei Phasenfarben, 760 × 220
const curve=v=>{const fl=v.flight;return html`<div class="curve-box"><div class="curve" role="img" aria-label="Manakurve: ${v.curve.map((n,i)=>(i===7?'7+':i)+': '+n).join(', ')}">${
 v.bars.map(b=>html`<div class="${V.cls('bar','ph-'+b.phase)}" style="height:${Math.round(b.n/v.max*52)+3}px"><em>${b.n||''}</em>${fl&&fl.bar===b.i?html`<i class="grow" data-key="g${fl.n}"></i>`:''}<span>${b.i===7?'7+':b.i}</span></div>`)}</div><div class="phases">${
 Object.entries(PHASE).map(([k,label])=>html`<span class="ph-${k}">${label} ${v.hint.phases[k]}</span>`)}<span class="avg">Ø ${v.hint.avg}</span></div><p class="${V.cls('curve-hint',v.hint.warn&&'warn')}">${v.hint.text}</p></div>`;};
// Thirty places; empty ones stay visible, so a new deck shows how much is still missing.
const slots=v=>{const fl=v.flight,cells=[];
 for(let i=0;i<v.size;i++){const x=v.slots[i];
  cells.push(x?html`<button class="deck-slot" data-key="${x.key}" data-cmd="removeCard" data-a="${x.card.id}" aria-label="${x.card.name} herausnehmen"><img src="${R.thumb(x.card.id)}" alt="" decoding="async">${fl&&fl.key===x.key?html`<i class="land" data-key="l${fl.n}"></i>`:''}</button>`
   :html`<span class="deck-slot empty" data-key="empty-${i}" aria-hidden="true"></span>`);}
 return html`<div class="deck-slots" role="list" aria-label="Deck: ${v.slots.length} von ${v.size} Karten">${cells}</div>`;};
const editor=v=>html`<aside class="deck-panel" data-key="edit-${v.edit.id}"><div class="deck-head"><span class="coin-face" style="${R.heroStyle(v.hero.id,true)}" title="${v.hero.name}"></span><div class="deck-title"><div class="eyebrow">${v.era} · Deckbau${v.dirty?html` · <span class="dirty">ungespeichert</span>`:''}</div><input type="text" maxlength="36" value="${v.edit.name}" data-input="deckName" aria-label="Deckname"></div><span class="${V.cls('deck-count',v.slots.length===v.size&&'full')}">${v.slots.length}<small>/${v.size}</small></span></div>${
 slots(v)}${curve(v)}<div class="deck-controls">${
 V.button({label:'Auffüllen',cmd:'autoFill',small:true})}${V.button({label:'Leeren',cmd:'clearDeck',small:true})}${V.button({label:'Löschen',cmd:'deleteDeck',small:true,style:'danger'})}${
 V.button({label:'Deck speichern',cmd:'saveDeck',style:'gold',extra:'save'})}</div></aside>`;
const stats=v=>html`<aside class="deck-panel coll-stats" data-key="cards"><div class="eyebrow">Kartensammlung</div><h3>${v.unique} von ${v.total} Karten</h3><div class="progress" role="img" aria-label="${Math.round(v.unique/v.total*100)} Prozent gesammelt"><i style="width:${(v.unique/v.total*100).toFixed(1)}%"></i></div><ul class="rarity-list">${
 v.rarities.map(r=>html`<li><span class="${V.cls('seal-dot',r.id)}"></span>${r.label}<b>${r.owned} / ${r.total}</b></li>`)}</ul><p class="dust-line"><i class="cur dust" aria-hidden="true"></i>${v.dust} Staub</p>${
 V.button({label:'Duplikate entzaubern',cmd:'extras',small:true})}<p class="muted coll-note">Fehlende Karten stellst Du mit Staub her: Karte antippen und „Herstellen“ wählen. Decks baust Du im Reiter „Decks“.</p></aside>`;

// An added card flies from its place in the grid (or the detail dialog) onto its place in the deck (keyed by its token,
// hidden under reduced motion).
const flight=v=>{const f=v.flight;if(!f||v.tab!=='edit'||f.to<0)return '';
 const from=f.from==null?{x:ZOOM.x-150,y:96,w:300}:{...poolAt(f.from),w:POOL.w},to=deckAt(f.to);
 return html`<img class="fly-card" data-key="fly-${f.n}" src="${R.thumb(f.id)}" alt="" style="left:${from.x}px;top:${from.y}px;width:${from.w}px;--tx:${to.x-from.x}px;--ty:${to.y-from.y}px;--s:${(DECK.w/from.w).toFixed(3)}">`;};

// The pages next to the open one are drawn while the browser idles, so paging shows finished cards at once.
const idle=window.requestIdleCallback||(f=>setTimeout(f,120));let warm=null;
function prefetch(ids){if(!ids)return;const key=ids.join();if(key===warm)return;warm=key;idle(()=>{for(const id of ids)R.thumb(id);});}

// Swiping across the grid turns the page; the tap that ends a swipe does not count as a tap on a card.
function swipe(el,vm){let start=null,swallow=false;
 const down=ev=>{start=ev.target.closest?.('.pool-grid')?{x:ev.clientX,y:ev.clientY}:null;};
 const up=ev=>{if(!start)return;const dx=ev.clientX-start.x,dy=ev.clientY-start.y,w=el.getBoundingClientRect().width/1600;start=null;
  if(Math.abs(dx)>60*w&&Math.abs(dx)>Math.abs(dy)*1.4){swallow=true;setTimeout(()=>{swallow=false;},350);vm.page(dx<0?1:-1);}};
 const click=ev=>{if(swallow){swallow=false;ev.stopPropagation();ev.preventDefault();}};
 el.addEventListener('pointerdown',down);el.addEventListener('pointerup',up);el.addEventListener('click',click,true);
 return ()=>{el.removeEventListener('pointerdown',down);el.removeEventListener('pointerup',up);el.removeEventListener('click',click,true);};}

AEV.screens=AEV.screens||{};AEV.dialogs=AEV.dialogs||{};
AEV.screens.collection={render:vm=>{const v=vm.view;prefetch(v.ahead);
 // Reiter Decks | Kartensammlung in der Kopfleiste; im Deckbau führt Zurück zur Übersicht.
 const tabs=v.tab==='edit'?'':V.tabs([['decks','Decks'],['cards','Kartensammlung']],v.tab,'tab'),w=vm.wallet();
 const top=html`<div class="topbar">${V.button({label:'‹ Zurück',cmd:'back',aria:v.tab==='edit'?'Zur Deckübersicht':'Zum Hauptmenü'})}<h2>${v.tab==='edit'?'Deckbau':'Sammlung & Decks'}</h2>${tabs}${V.wallet(w)}</div>`;
 const body=v.tab==='decks'?deckGrid(v):v.tab==='cards'?html`<div class="deckbuilder in-cards">${stats(v)}${pool(v)}</div>`:html`<div class="deckbuilder">${editor(v)}${pool(v)}${flight(v)}</div>`;
 return html`<div class="${V.cls('screen collection','coll-'+v.tab)}">${top}${body}</div>`;},
 mounted(el,vm){this.off?.();this.off=swipe(el,vm);},unmounted(){this.off?.();this.off=null;}};

// The card zooms in from its place in the grid (--fx/--fy: from the dialog's picture back to the slot).
AEV.dialogs.card={render:vm=>{const v=vm.view,c=v.card,slot=vm.state.slot,at=slot==null?null:poolAt(slot),from=at&&{x:at.x+POOL.w/2,y:at.y+POOL.h/2};
 const controls=html`<p>Besitz: <b>${v.owned}</b> · ${D.rarities[c.rarity]}</p>${V.buttons([
  v.editing?V.button({label:'Zum Deck hinzufügen',cmd:'addCard',a:c.id,style:'gold',disabled:!v.owned}):'',
  v.price?[V.button({label:'Herstellen · '+v.price+' ✧',cmd:'craft',a:c.id,disabled:!v.canCraft}),V.button({label:'Entzaubern · +'+v.dust+' ✧',cmd:'dustCard',a:c.id,disabled:!v.canDust})]
  :html`<span class="muted">Basiskarten sind dauerhaft verfügbar.</span>`],'start')}`;
 return V.modal({width:1000,scrim:true,body:html`<div class="card-detail"><img class="${V.cls('zoom-in',from&&'from-slot')}" src="${R.thumb(c.id)}" alt="${c.name}" style="${from?`--fx:${from.x-ZOOM.x}px;--fy:${from.y+92-400}px`:''}"><div class="details"><div class="eyebrow">${v.era} · ${c.cost} Mana · ${D.rarities[c.rarity]}</div><h3>${c.name}</h3><p class="card-text">${c.text||'Ein Diener ohne zusätzliche Fähigkeit.'}</p>${V.glossary(c)}${V.chronicle(c)}${
  c.building?html`<p>♜ ${c.health} Haltbarkeit</p>`:c.type==='minion'?html`<p>⚔ ${c.attack} Angriff · ♥ ${c.health} Leben</p>`:''}${controls}</div></div>`});}};

AEV.dialogs.newDeck={render:vm=>V.modal({close:false,body:html`<h2>Neues Deck</h2><p>Wähle den Helden für Dein neues Deck.</p><select id="newhero" class="wide" data-change="choose" aria-label="Held">${
 D.heroes.map(h=>option(h.id,h.name+' · '+h.era,vm.state.hero===h.id))}</select>${V.buttons([V.button({label:'Abbrechen',cmd:'close'}),V.button({label:'Deck erstellen',cmd:'create',style:'gold'})])}`})};
})();
