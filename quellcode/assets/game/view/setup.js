/* Duel preparation (AP 1.7, Heldenwahl 2.0) and the campaign map views.
 * The hero choice is a gallery: heroes by age on the left, the chosen one large in the middle – medal, epoch,
 * curriculum, hero power and favourite cards –, deck, opponent and the start on the right. */
(function(){'use strict';
const {html}=AEM,V=AEV,D=CHD,R=CHR;
const TITLE={random:'Kolosseum · Zufalls-Duell',daily:'Herausforderung · Tagesduell',campaign:'Mission vorbereiten',free:'Schlacht · Freies Duell'};
const option=(value,label,selected)=>html`<option value="${value}"${V.attr('selected',selected)}>${label}</option>`;

function side(v){const h=v.hero,day=v.day,m=v.mode;
 return V.panel(html`<div class="eyebrow">${m==='campaign'?'Mission':m==='random'?'Kolosseum':day?'Tagesduell':'Freies Duell'}</div><h3>${m==='random'?'Das Schicksal ruft':day?h.name+' gegen '+v.foe.name:m==='campaign'?v.mission.title:'Deine Aufstellung'}</h3>${
  m==='random'?html`<p>Du und die KI erhaltet jeweils einen zufälligen Helden und ein zufälliges Deck aus dem gesamten Set. Deine Sammlung bleibt unverändert.</p>`
  :day?html`<p>Die Herausforderung des Tages: ${day.first?'Die KI beginnt':'Du beginnst'}, beide Decks sind fest vorgegeben. Jeden Tag wartet ein neues Duell – findest Du den Weg zum Sieg?</p>`
  :html`<div><label>DEIN DECK · 30 KARTEN</label><select data-change="chooseDeck">${v.decks.map(d=>option(d.id,d.name,d.id===v.deckId))}</select></div>`}${
  m==='free'?html`<div><label>GEGNER · OFFLINE-KI</label><select data-change="chooseFoe">${D.heroes.map(h=>option(h.id,h.name,h.id===v.foeId))}</select>${
   v.foeStyle?html`<p class="foe-style">Spielweise: <b>${v.foeStyle.name}</b> – ${v.foeStyle.text}</p>`:''}</div>`
  :m==='campaign'?html`<p><b>${v.mission.boss}</b><br>${v.mission.description}</p>${v.fuse?html`<p class="fuse-line"><b>Lunte:</b> ${v.fuse.turns} eigene Züge – gewinne vorher, sonst ist die Mission verloren.</p>`:''}`:''}<div class="spacer"></div>${
  V.button({label:(m==='campaign'?'Mission beginnen':'Duell beginnen')+' ›',cmd:'begin',style:'gold'})}${V.button({label:'Spielregeln',cmd:'help',small:true})}`,{extra:'setup-side'});}

// ASTRA: heldengalerie – Heldenmünze der Galerie (klein) und Medaillon der Großansicht mit Rändelung, 512 × 512
// Short names under the gallery coins: the usual one, without regnal numbers.
const SHORT={agrippa:'Agrippa',nostradamus:'Böttger',fuhao:'Vix',dandolo:'Dandolo',anna:'Anna',zizka:'Vauban'};
const short=h=>SHORT[h.id]||h.name.replace(/ [IVX]+\.$/,'').split(' ')[0];
const coin=(h,v)=>{const fixed=v.mode==='daily'||v.mode==='random';
 return html`<button class="${V.cls('hero-coin',h.id===v.selected&&v.mode!=='random'&&'selected',v.day&&h.id===v.day.foe&&'foe')}" data-key="${h.id}" aria-label="${h.name}" aria-pressed="${h.id===v.selected}"${
  fixed?V.attr('tabindex','-1'):V.data({cmd:'chooseHero',a:h.id})}><span class="coin-face" style="${R.heroStyle(h.id,true)}"></span>${v.levels[h.id]>1?html`<em class="coin-level" aria-label="Stufe ${v.levels[h.id]}">${v.levels[h.id]}</em>`:''}<small>${short(h)}</small></button>`;};
const gallery=v=>html`<div class="${V.cls('hero-gallery',(v.mode==='daily'||v.mode==='random')&&'fixed')}">${v.gallery.map(({age,heroes})=>
 html`<div class="age-row" data-key="${age.id}" style="--age:${age.color}"><div class="age-label"><span>${age.icon}</span>${age.name}</div><div class="age-heroes">${heroes.map(h=>coin(h,v))}</div></div>`)}</div>`;

// Heldenstufe (AP 6.3): Abzeichen, Erfahrung in der Stufe und die Belohnung der nächsten.
// ASTRA: heldenstufe – Stufenabzeichen als Lorbeerkranz mit Zahl an der Heldenmünze, 64 × 64
const level=l=>html`<div class="${V.cls('hero-level',l.max&&'max')}"><span class="level-badge" aria-hidden="true">${l.level}</span><div><b>Stufe ${l.level}</b>${
 l.max?html`<small>Höchste Stufe – die Goldene Fassung der Legendären gehört Dir.</small>`:html`<span class="level-track"><i style="width:${Math.round(100*l.into/l.span)}%"></i></span><small>${l.into} / ${l.span} EP · Stufe ${l.level+1}: ${l.next}</small>`}</div></div>`;
function show(v){const h=v.hero;
 if(v.mode==='random')return html`<section class="hero-show random"><div class="hero-medal"><span class="coin-rim"></span><span class="coin-face mystery">?</span></div><div class="show-info"><div class="eyebrow">Kolosseum</div><h2>Ein Held aus der Chronik</h2><p>Erst in der Arena entscheidet das Los, wer für Dich kämpft – und gegen wen.</p></div></section>`;
 return html`<section class="hero-show" data-key="show-${h.id}" style="--age:${v.age.color}"><div class="hero-medal"><span class="coin-rim"></span><span class="coin-face" style="${R.heroStyle(h.id,true)}"></span></div><div class="show-info"><div class="age-badge"><span>${v.age.icon}</span>${v.age.name}</div><h2>${h.name}</h2><div class="show-meta">${h.era}${v.life?' · '+v.life:''}</div>${level(v.level)}${
  v.school?html`<div class="show-school">Lehrplan Sachsen · Klasse ${v.school.grade} · ${v.school.topic}</div>`:''}<div class="show-power"><span class="power-cost">${h.cost}</span><div><b>${h.power}</b><p>${h.powerText}</p>${v.deed?html`<p class="power-deed">${v.deed}</p>`:''}</div></div>${
  v.style?html`<p class="show-style">Spielweise der KI: <b>${v.style.name}</b></p>`:''}</div><div class="show-favorites"><div class="eyebrow">Lieblingskarten</div><div class="fav-row">${
  v.favorites.map(c=>html`<button class="fav-card" data-key="${c.id}" data-cmd="inspect" data-a="${c.id}" aria-label="${c.name}"><img src="${R.thumb(c.id)}" alt="${c.name}"></button>`)}</div>${
  V.button({label:'Chronik lesen',cmd:'lore',small:true,aria:'Chronik von '+h.name})}</div></section>`;}

AEV.screens=AEV.screens||{};
AEV.screens.setup={render:vm=>{const v=vm.view;
 return html`<div class="screen setup">${V.topbar(TITLE[v.mode]||TITLE.free,vm.wallet())}<div class="setup-content">${gallery(v)}${show(v)}${side(v)}</div></div>`;}};
})();
