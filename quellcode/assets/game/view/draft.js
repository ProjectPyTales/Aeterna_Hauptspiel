/* Kolosseum als Draft (AP 6.1): Eintritt, Heldenwahl aus drei, 30 Kartenwahlen mit Manakurve, der Lauf mit Lorbeeren und
 * Schilden, die Belohnung. Alle gemalten Teile sind Platzhalter für Astra (MOTIVE.md, ASTRA_AUFTRAG_OBERFLAECHE.md). */
(function(){'use strict';
const {html}=AEM,V=AEV,D=CHD,R=CHR;
const RARITY={common:'Gewöhnlich',rare:'Selten',epic:'Episch',legendary:'Legendär'};
const plural=(n,one,many)=>n+' '+(n===1?one:many);
const prize=w=>[w.gold?html`<span><i class="cur gold" aria-hidden="true"></i>${w.gold}</span>`:'',w.packs?html`<span><i class="cur packs" aria-hidden="true"></i>${w.packs}</span>`:'',w.dust?html`<span><i class="cur dust" aria-hidden="true"></i>${w.dust}</span>`:''];

// ASTRA: kolosseum-lorbeer – Lorbeerkranz je Sieg, leer als graue Ritzung, gewonnen in Gold, 96 × 96
// ASTRA: kolosseum-schild – Rundschild je Niederlage, heil als Umriss, verloren gebrochen, 96 × 96
const tally=v=>html`<div class="draft-tally" role="img" aria-label="${plural(v.won,'Sieg','Siege')} von ${v.wins}, ${plural(v.lost,'Niederlage','Niederlagen')} von ${v.losses}"><div class="laurels">${
 v.slots.wins.map((on,i)=>html`<i class="${V.cls('laurel',on&&'on')}" data-key="w${i}"></i>`)}</div><div class="shields">${v.slots.losses.map((on,i)=>html`<i class="${V.cls('shield',on&&'on')}" data-key="l${i}"></i>`)}</div></div>`;

// ASTRA: kolosseum-arena – Blick in die Arena: Ränge, Sand und Velarium im Abendlicht, für den Eintritt, 1100 × 620
function entry(v){const free=!v.fee;
 return html`<div class="draft-entry"><section class="arena-gate panel"><div class="arena-art" aria-hidden="true"><span>ASTRA · Kolosseum</span></div><div class="eyebrow">Kolosseum · Draft</div><h2>Ein Held, dreißig Karten, kein Zurück</h2><p>Wähle einen von drei Helden aus verschiedenen Epochen und baue Dein Deck Karte für Karte – jede Wahl eine von dreien. Dann kämpfst Du, bis Du <b>${v.wins} Siege</b> oder <b>${v.losses} Niederlagen</b> hast.</p><p class="muted">Im Amphitheatrum Flavium in Rom, seit 80 n. Chr. „Kolosseum“ genannt, kämpften Gladiatoren vor bis zu 50 000 Zuschauern. Hier kämpfen Helden aus allen Epochen – mit Karten.</p></section>${
 V.panel(html`<div class="eyebrow">Belohnung nach Siegen</div><table class="prize-table"><tbody>${v.table.map(t=>html`<tr data-key="${t.wins}"><th>${plural(t.wins,'Sieg','Siege')}</th><td>${prize(t)}</td></tr>`)}</tbody></table><p class="muted">Dazwischen wächst die Belohnung mit jedem Sieg. Deine Sammlung bleibt unverändert.</p><div class="spacer"></div>${
  v.stats.runs?html`<p class="draft-best">Bester Lauf: <b>${plural(v.stats.best,'Sieg','Siege')}</b> · ${plural(v.stats.runs,'Lauf','Läufe')}</p>`:''}${
  V.button({label:free?'Probelauf beginnen · frei ›':'Eintreten · '+v.fee+' Gold ›',cmd:'start',style:'gold',disabled:!free&&v.gold<v.fee})}${V.button({label:'Regeln',cmd:'help',small:true})}`,{extra:'draft-side'})}</div>`;}

function heroes(v){
 return html`<div class="draft-heroes"><div class="draft-heading"><div class="eyebrow">Wahl des Helden</div><h2>Wer zieht in die Arena?</h2></div><div class="hero-picks">${v.heroes.map(x=>{const h=x.hero;
  return html`<button class="hero-pick" data-key="${h.id}" data-cmd="chooseHero" data-a="${h.id}" style="--age:${x.age.color}" aria-label="${h.name} wählen"><span class="hero-medal small"><span class="coin-rim"></span><span class="coin-face" style="${R.heroStyle(h.id,true)}"></span></span><span class="age-badge"><span>${x.age.icon}</span>${x.age.name}</span><b class="pick-name">${h.name}</b><span class="show-meta">${h.era}</span>${
   x.school?html`<span class="show-school">Lehrplan Sachsen · Klasse ${x.school.grade} · ${x.school.topic}</span>`:''}<span class="show-power"><span class="power-cost">${h.cost}</span><span><b>${h.power}</b><span class="power-text">${h.powerText}</span></span></span>${
   x.style?html`<span class="show-style">Spielweise: <b>${x.style.name}</b></span>`:''}</button>`;})}</div></div>`;}

// Kurve und Deckliste rechts, wie im Deckbau (AP 1.6).
const deck=v=>html`<aside class="panel draft-deck"><div class="eyebrow">${v.hero.name} · ${v.n}/${v.picks} Karten</div><div class="curve-box"><div class="curve" role="img" aria-label="Manakurve: ${v.curve.map((n,i)=>(i===7?'7+':i)+': '+n).join(', ')}">${
 v.bars.map(b=>html`<div class="${V.cls('bar','ph-'+b.phase)}" style="height:${Math.round(b.n/v.max*54)+3}px"><em>${b.n||''}</em><span>${b.i===7?'7+':b.i}</span></div>`)}</div><p class="${V.cls('curve-hint',v.hint.warn&&'warn')}">${v.hint.text}</p></div><div class="decklist">${
 v.rows.length?v.rows.map(({card,count})=>html`<button class="${V.cls('deckrow',v.flash?.id===card.id&&'fresh')}" data-key="${card.id}" data-cmd="inspect" data-a="${card.id}"><span class="mana">${card.cost}</span><b>${card.name}</b><span class="${card.rarity==='legendary'?'legend':''}">× ${count}</span></button>`)
 :html`<p class="muted deck-empty">Hier sammelt sich Dein Deck.</p>`}</div></aside>`;

// ASTRA: draft-wahl – Sockel unter den drei angebotenen Karten mit Seltenheitslicht, 380 × 120
function picks(v){
 return html`<div class="draft-board"><aside class="panel draft-status"><div class="eyebrow">Wahl ${v.n+1} von ${v.picks}</div><h3>${v.special?'Sonderwahl':'Wähle eine Karte'}</h3><p><span class="${V.cls('seal-knob','static',v.rarity)}" aria-hidden="true"></span> ${RARITY[v.rarity]}${v.special?' – jede 10. Wahl ist mindestens selten.':''}</p><p class="muted">Antippen wählt die Karte. Die Lupe zeigt sie groß, mit ihrer Geschichte.</p>${tally(v)}<div class="spacer"></div>${
  V.button({label:'Regeln',cmd:'help',small:true})}${V.button({label:'Lauf beenden',cmd:'retire',small:true,style:'danger'})}</aside><section class="draft-options">${v.options.map((o,i)=>html`<div class="${V.cls('option',o.card.rarity)}" data-key="${v.n}-${o.card.id}"><button class="option-card" data-cmd="pick" data-a="${i}" aria-label="${o.card.name} wählen"><img src="${R.thumb(o.card.id)}" alt="${o.card.name}" draggable="false"></button><span class="option-socket" aria-hidden="true"></span><div class="option-info"><small>${o.own?'Heldenkarte':o.era}</small>${
   o.lore?html`<p class="option-lore"><b>Aus der Chronik</b> ${o.lore[0]}</p>`:o.keys.length?html`<dl class="option-keys">${o.keys.map(k=>html`<div><dt>${k.name}</dt><dd>${k.text}</dd></div>`)}</dl>`:html`<p class="option-lore muted">${o.card.type==='minion'?'Ein Diener ohne Schlüsselwort – hier zählen die Werte.':'Ein Zauber: Er wirkt einmal, dann ist die Karte abgelegt. „Zauber“ steht für den Glauben der Zeit – die Großansicht erklärt es.'}</p>`}${V.button({label:'Ansehen',cmd:'inspect',a:o.card.id,small:true,extra:'lens',aria:o.card.name+' groß ansehen'})}</div></div>`)}</section>${deck(v)}</div>`;}

// ASTRA: kolosseum-sand – Arenaboden mit Sand und Spuren hinter dem Lauf, 700 × 620
function run(v){const h=v.hero;
 return html`<div class="draft-board"><section class="panel draft-run" style="--age:${v.age.color}"><div class="run-hero"><span class="hero-medal small"><span class="coin-rim"></span><span class="coin-face" style="${R.heroStyle(h.id,true)}"></span></span><div><div class="eyebrow">Dein Lauf</div><h2>${h.name}</h2><p class="show-meta">${plural(v.won,'Sieg','Siege')} · ${plural(v.lost,'Niederlage','Niederlagen')}</p></div></div>${tally(v)}<div class="run-prize"><span>Belohnung jetzt</span>${prize(v.reward)}</div><ol class="run-goals">${v.table.slice(1).map(t=>html`<li class="${V.cls(v.won>=t.wins&&'reached')}" data-key="g${t.wins}"><b>${plural(t.wins,'Sieg','Siege')}</b>${prize(t)}</li>`)}</ol><div class="spacer"></div>${
  V.buttons([V.button({label:v.resume?'Partie fortsetzen ›':'Kampf beginnen ›',cmd:'fight',style:'gold'}),V.button({label:'Lauf beenden',cmd:'retire',style:'danger',small:true})])}</section>${deck(v)}</div>`;}

function done(v){
 return html`<div class="draft-entry"><section class="panel draft-done"><div class="eyebrow">Der Lauf ist vorbei</div><h2>${v.won>=v.wins?'Champion des Kolosseums!':plural(v.won,'Sieg','Siege')}</h2>${tally(v)}<p>${v.won>=v.wins?'Zwölf Siege – die Menge tobt. So weit kommen nur die Besten.':v.won>=7?'Ein großer Lauf: Die Ränge feiern Deinen Namen.':v.won>=3?'Ein ehrenvoller Lauf.':'Die Arena ist hart. Der nächste Lauf wird besser.'}</p><div class="run-prize big"><span>Deine Belohnung</span>${prize(v.reward)}</div>${
  V.button({label:'Belohnung abholen',cmd:'claim',style:'gold'})}</section></div>`;}

AEV.screens=AEV.screens||{};
AEV.screens.draft={render:vm=>{const v=vm.view,body={hero:heroes,pick:picks,play:run,done}[v.phase]||entry;
 return html`<div class="${V.cls('screen','draft','phase-'+(v.phase||'entry'))}">${V.topbar('Kolosseum · Draft',vm.wallet())}<div class="draft-content">${body(v)}</div></div>`;}};
})();
