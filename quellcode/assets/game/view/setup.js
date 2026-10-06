/* Duel preparation and campaign views. */
(function(){'use strict';
const {html}=AEM,V=AEV,D=CHD,R=CHR;
const TITLE={random:'Kolosseum · Zufalls-Duell',daily:'Herausforderung · Tagesduell',campaign:'Mission vorbereiten',free:'Schlacht · Freies Duell'};
const option=(value,label,selected)=>html`<option value="${value}"${V.attr('selected',selected)}>${label}</option>`;

function side(v){const h=v.hero,day=v.day,m=v.mode;
 return V.panel(html`<h3>${m==='random'?'Das Schicksal ruft':day?h.name+' gegen '+v.foe.name:h.name}</h3><div class="power-line"><div class="eyebrow">${h.cost} Mana · ${h.power}</div><p>${h.powerText}</p></div>${
  m==='random'?html`<p>Du und die KI erhalten jeweils einen zufälligen Helden und ein zufälliges Deck aus dem gesamten Set. Deine Sammlung bleibt unverändert.</p>`
  :day?html`<p>Die Herausforderung des Tages: ${day.first?'Die KI beginnt':'Du beginnst'}, beide Decks sind fest vorgegeben. Jeden Tag wartet ein neues Duell – findest Du den Weg zum Sieg?</p>`
  :html`<div><label>DEIN DECK · 30 KARTEN</label><select data-change="chooseDeck">${v.decks.map(d=>option(d.id,d.name,d.id===v.deckId))}</select></div>`}${
  m==='free'?html`<div><label>GEGNER · OFFLINE-KI</label><select data-change="chooseFoe">${D.heroes.map(h=>option(h.id,h.name,h.id===v.foeId))}</select></div>`
  :m==='campaign'?html`<p><b>${v.mission.boss}</b><br>${v.mission.description}</p>`:''}<div class="spacer"></div>${
  V.button({label:(m==='campaign'?'Mission beginnen':'Duell beginnen')+' ›',cmd:'begin',style:'gold'})}${V.button({label:'Spielregeln & Steuerung',cmd:'help',small:true})}`,{extra:'setup-side'});}

const tile=(h,v)=>html`<button class="${V.cls('hero-tile',h.id===v.selected&&'selected',v.day&&h.id===v.day.foe&&'foe')}" data-key="${h.id}"${
 v.day?V.attr('tabindex','-1'):V.data({cmd:'chooseHero',a:h.id})}><div class="portrait" style="${R.heroStyle(h.id,true)}"></div><div class="tile-label"><b>${h.name}</b><small>${h.era}</small></div></button>`;

AEV.screens=AEV.screens||{};
AEV.screens.setup={render:vm=>{const v=vm.view;
 return html`<div class="screen">${V.topbar(TITLE[v.mode]||TITLE.free,vm.wallet())}<div class="setup-content"><div class="hero-area"><div class="eyebrow">${
  v.mode==='random'?'Held und Deck werden für beide Seiten zufällig bestimmt':v.day?'Heute für jede Partie gleich: Helden, Decks und Startwert':'Wähle Deinen Helden'}</div><div class="hero-grid">${
  v.heroes.map(h=>tile(h,v))}</div></div>${side(v)}</div></div>`;}};

AEV.screens.campaign={render:vm=>html`<div class="screen">${V.topbar('Kampagne · Die Chronik',vm.wallet())}<div class="campaign-grid">${vm.missions.map(({mission:m,done,locked})=>
 html`<button class="mission" data-key="m${m.id}"${V.attr('disabled',locked)}${V.data({cmd:'mission',a:m.id})}><div class="ghost portrait" style="${R.heroStyle(m.hero)}"></div><div class="num">${done?'✓':locked?'◆':'0'+(m.id+1)} · ${done?'VOLLENDET':locked?'VERSIEGELT':'MISSION'}</div><h3>${m.title}</h3><p>${m.boss}<br><br>${m.description}</p><div class="reward">${done?'Wiederholbar · 40 Gold':'Erster Sieg: '+m.reward+' Gold + 1 Pack'}</div></button>`)}</div><div class="campaign-bottom"><span>Alle Helden sind spielbar. Jede Mission schaltet die nächste frei.</span>${
 V.button({label:'Aufträge ansehen',cmd:'quests',small:true})}</div></div>`};
})();
