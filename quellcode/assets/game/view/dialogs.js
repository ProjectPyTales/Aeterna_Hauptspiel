/* Dialog views. Each renders one dialog view model into #overlay through the shared modal (view/kit.js). */
(function(){'use strict';
const {html}=AEM,V=AEV,D=CHD,R=CHR;
const D_=AEV.dialogs=AEV.dialogs||{};
const choose=(buttons=[])=>buttons.map((b,i)=>V.button({label:b.label,style:b.style,cmd:'choose',a:i}));
const option=(value,label,selected)=>html`<option value="${value}"${V.attr('selected',selected)}>${label}</option>`;

// Message or question: title, text, buttons.
D_.message={render:vm=>{const s=vm.state;
 return V.modal({close:s.close,width:s.width,body:html`<h2>${s.title}</h2>${[].concat(s.text||[]).map(t=>html`<p>${t}</p>`)}${s.buttons?.length?V.buttons(choose(s.buttons),s.wrap&&'wrap'):''}`});}};

D_.quests={render:vm=>V.modal({body:html`<h2>Deine Aufträge</h2><p>Erfolge werden dauerhaft gespeichert. Gold gibt es auch für jedes gewonnene Duell.</p>${vm.rows.map(r=>
 html`<div class="quest-row" data-key="${r.quest.id}"><div>${r.quest.text}<br><small>${r.progress}/${r.quest.goal} · ${r.quest.gold} Gold</small></div>${V.button({label:r.claimed?'Erledigt':'Abholen',cmd:'claim',a:r.quest.id,disabled:!r.ready})}</div>`)}`})};

D_.settings={render:vm=>{const s=vm.settings,row=(label,control)=>html`<div class="settings-row"><label>${label}</label>${control}</div>`;
 const range=k=>html`<input type="range" min="0" max="1" step=".05" value="${s[k]}" data-input="setting" data-a="${k}" aria-label="${k==='music'?'Musik':'Geräusche'}">`;
 const pick=(k,opts)=>html`<select data-change="setting" data-a="${k}">${opts.map(([v,l,on])=>option(v,l,on))}</select>`;
 return V.modal({body:html`<h2>Einstellungen</h2>${row('Musik',range('music'))}${row('Geräusche',range('sfx'))}${
  row('Touch-Vibration',pick('haptics',[['true','Ein',s.haptics!==false],['false','Aus',s.haptics===false]]))}${
  row('Spieltempo',pick('speed',[['1','Normal',s.speed===1],['2','Schnell',s.speed===2]]))}${
  row('Partikeleffekte',pick('particles',[['true','Ein',!!s.particles],['false','Aus',!s.particles]]))}${
  row('Klangprobe',html`<div class="sound-samples">${vm.samples.map(([g,l])=>V.button({label:l,cmd:'sample',a:g,small:true}))}</div>`)}<p>Sammlung und laufende Partie werden nach jeder Aktion gespeichert. Sichere Deinen Fortschritt vor einer Neuinstallation.</p>${
  V.buttons([V.button({label:'Spielstand exportieren',cmd:'exportSave'}),V.button({label:'Spielstand importieren',cmd:'askImport'})])}${
  V.buttons([V.button({label:'Code einlösen',cmd:'redeem'}),V.button({label:'Über das Spiel',cmd:'credits'}),V.button({label:'Fertig',cmd:'close',style:'gold'})])}`});}};

// Code einlösen (Rückmeldung zu 1.10.0).
D_.redeem={render:vm=>{const s=vm.state;return V.modal({width:760,body:html`<h2>Code einlösen</h2><p>Codes schalten Gold, Kartenpakete, Staub oder Karten frei. Jeder Code gilt einmal je Spielstand.</p><input type="text" class="code-input" maxlength="32" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="CODE" value="${s.code}" data-input="type" aria-label="Code">${
  s.error?html`<p class="code-msg error" role="alert">${s.error}</p>`:s.result?html`<p class="code-msg ok" role="status">${s.result}</p>`:html`<p class="code-msg">&nbsp;</p>`}${
  V.buttons([V.button({label:'Einlösen',cmd:'redeem',style:'gold'}),V.button({label:'Schließen',cmd:'close'})])}`});}};

const RULES=[['1 · Karte ausspielen','Karte antippen, dann „Ausspielen“ oder ein gültiges Ziel wählen. Karten folgen Deinem Finger. Ziehe sie an die gewünschte Position auf Deiner Spielfeldhälfte. In der Hand kannst Du sie umsortieren; außerhalb des Felds springen sie zurück.'],
 ['2 · Angreifen','Grün leuchtenden Diener oder bewaffneten Helden antippen und Gegner wählen. Ziehen zeigt einen Zielpfeil.'],
 ['3 · Heldenfähigkeit','Das runde Symbol neben Deinem Helden ist einmal pro Zug nutzbar. '+CHD.heroes.filter(h=>h.cost!==2).map(h=>h.name+' kostet '+h.cost+' Mana').join(', ')+', alle anderen 2.'],
 ['4 · Karten ansehen','Eine Karte, einen Diener oder die Heldenfähigkeit lange drücken. Friedhöfe zeigen bereits abgelegte Karten.'],
 ['Schildwall & Göttliche Gunst','Angriffe müssen zuerst Diener mit Schildwall treffen; Zauber umgehen ihn. Göttliche Gunst fängt den nächsten Schaden ab.'],
 ['Einmarsch & Vermächtnis','Einmarsch wirkt beim Ausspielen aus der Hand, Vermächtnis nach dem Tod. Sturmangriff: sofort angreifen. Vorstoß: sofort angreifen, im ersten Zug nur Diener.'],
 ['Starre & Doppelschlag','Ein Diener in Starre verpasst seinen nächsten Angriff (❄). Doppelschlag: zwei Angriffe pro Zug. Arkaner Fokus +X: Eure Zauber verursachen X mehr Schaden.'],
 ['Ergründen & Bauwerke','Ergründen: Wähle eine von drei Karten auf die Hand. Bauwerke belegen einen Platz, greifen nie an und haben Haltbarkeit; Flächenschaden und Heilung wirken nicht.'],
 ['Mana & Grenzen','Jeder eigene Zug erhöht maximales Mana bis 10. Höchstens 7 Diener, 10 Handkarten. Ein leeres Deck verursacht steigenden Erschöpfungsschaden.'],
 ['Waffen & Fortschritt','Waffen verlieren pro Heldenangriff 1 Haltbarkeit. Siege geben 40 Gold. Niederlagen nach 4 eigenen Zügen geben 10 Gold; Aufgeben gibt keines.']];
D_.help={render:()=>V.modal({width:1080,body:html`<h2>So spielst Du</h2><div class="help-list">${RULES.map(([t,x])=>html`<div><b>${t}</b>${x}</div>`)}</div>${V.buttons([V.button({label:'Verstanden',cmd:'close',style:'gold'})])}`})};

D_.credits={render:vm=>V.modal({close:false,body:html`<h2>Aeterna</h2><p><span class="version-tap" data-cmd="tapVersion">Version ${vm.state.version}</span>${vm.state.shell?` · Android-Hülle ${vm.state.shell.shell}${vm.state.shell.android?' auf Android '+vm.state.shell.android:''}`:''} · Vormals „Chroniken der Helden“. Ein eigenständiges historisches Offline-Kartenspiel mit ${vm.state.cards} Karten, ${vm.state.heroes} Helden und ${vm.state.missions} Missionen.</p><p>Eigene Illustrationen: mit dem integrierten Bildgenerierungswerkzeug erstellt. Geräusche: aufgenommene Karten-, Material- und Waffensounds von Kenney und StarNinjas (CC0), neu abgemischt; Stein- und Kristallklänge, Pergament, Aufprall, Hufe und Lanzen prozedural erzeugt (CC0). Musik: eigene Stücke für Hauptmenü und Duell (seit 1.13.0). Historische Motive sind künstlerisch interpretiert.</p><p>Ohne Werbung, Netzwerkzugriff oder Käufe mit echtem Geld. Schriften: Cinzel und Cinzel Decorative von Natanael Gama, Alegreya Sans von Huerta Tipográfica (beide SIL Open Font License) sowie DejaVu (freie Font-Lizenz). Renderer-Labor: PixiJS (MIT-Lizenz).</p>${
 vm.dev?html`<p class="dev-note">Entwickler: Bildrate im Match an (fünfmal auf die Version tippen schaltet sie aus).</p>`:''}${
 V.buttons([...(vm.dev?[V.button({label:'Renderer-Labor',cmd:'lab'})]:[]),V.button({label:'Zurück',cmd:'close',style:'gold'})])}`})};

// Chronikseite eines Helden (AP 5.9): Porträt, Lebensdaten, Biografie, Zitat, Spielstil, Lieblingskarten, Beziehungen.
D_.lore={render:vm=>{const {hero:h,page:l,school,favorites}=vm.state;
 return html`<div class="scrim" data-scrim><div class="modal panel lore" role="dialog" aria-modal="true" aria-labelledby="lore-title" style="width:1240px">${
  V.button({label:'×',cmd:'close',extra:'close',aria:'Chronik schließen'})}<div class="lore-head"><div class="lore-portrait portrait" style="${R.heroStyle(h.id)}"></div><div><div class="eyebrow">Chronik der Helden · ${l.epoch}</div><h2 id="lore-title">${h.name}</h2><div class="lore-meta">${l.life} · ${l.place}</div>${school?html`<div class="lore-school">Lehrplan Sachsen · Klasse ${school.grade} · ${school.topic}</div>`:''}${
  html`<blockquote>„${l.quote}“<cite>${l.source}</cite></blockquote>`}</div></div><div class="lore-body"><div class="lore-bio">${l.bio.map(t=>html`<p>${t}</p>`)}</div><aside class="lore-facts"><h3>Spielstil</h3><p>${l.style}</p><h3>Heldenfähigkeit</h3><p><b>${h.power}</b> · ${h.powerText}</p><h3>Lieblingskarten</h3><p>${favorites.map(c=>c.name).join(' · ')}</p><h3>Verbündete und Rivalen</h3><ul>${l.relations.map(([who,what])=>html`<li><b>${who}</b> – ${what}</li>`)}</ul><h3>Stimme und Musik</h3><p>${l.voice}; ${l.music}</p></aside></div></div></div>`;}};
// Card zoom in the match: read-only; a tap beside the card closes it.
D_.zoom={render:vm=>{const c=vm.state.card,type=c.building?'Bauwerk':c.type==='minion'?'Diener':c.effect?.type==='weapon'?'Zauber · Waffe':'Zauber';
 return html`<div class="scrim card-zoom-scrim" data-scrim><div class="modal panel card-zoom" role="dialog" aria-modal="true" aria-labelledby="zoom-title" style="width:1120px">${
  V.button({label:'×',cmd:'close',extra:'close',aria:'Großansicht schließen'})}<div class="card-detail zoom-detail"><div class="zoom-art"><img src="${R.artwork(c.id)}" alt="${c.name} – vollständiges Kartenmotiv" draggable="false"><span class="zoom-cost">${c.cost}</span></div><div class="details"><div class="eyebrow">${vm.state.era} · ${D.rarities[c.rarity]}</div><h2 id="zoom-title">${c.name}</h2><div class="zoom-type">${type} · ${c.cost} Mana</div><p class="zoom-text">${c.text||'Ein Diener ohne zusätzliche Fähigkeit.'}</p>${V.glossary(c.text)}${
  c.type==='minion'?html`<div class="zoom-stats">${c.building?html`<span>♜ ${c.health} Haltbarkeit</span>`:html`<span>⚔ ${c.attack} Angriff</span><span>♥ ${c.health} Leben</span>`}</div>`:''}<p class="zoom-hint">Zum Schließen außerhalb der Karte tippen.</p></div></div></div></div>`;}};

D_.mulligan={render:vm=>{const m=vm.mulligan;
 return html`<div class="scrim"><div class="mulligan"><div class="eyebrow">${m.first?'Du beginnst':'Der Gegner beginnt · Du erhältst die Gunst der Stunde'}</div><h2>Deine Starthand</h2><p>Tippe auf Karten, die Du austauschen möchtest.</p><div class="mulligan-cards">${
  m.hand.map(x=>html`<button class="${V.cls('mulligan-card',x.replace&&'replace')}" data-key="${x.uid}" data-cmd="toggleMull" data-a="${x.uid}" aria-pressed="${x.replace}"><img src="${R.thumb(x.card.id)}" alt="${x.card.name}"></button>`)}</div>${
  V.button({label:(m.count?m.count+' Karten austauschen':'Karten behalten')+' · Beginnen',cmd:'acceptHand',style:'gold'})}</div></div>`;}};

// Ergründen: the chronicler lays out three sealed scrolls; one card goes to the hand. No way around the choice.
D_.discover={render:vm=>{const s=vm.state;
 return html`<div class="scrim"><div class="discover" role="dialog" aria-modal="true" aria-labelledby="discover-title"><div class="eyebrow">${s.left>1?'Ergründen · noch '+s.left+' Karten':'Ergründen'}</div><h2 id="discover-title">Der Chronist breitet drei Schriftrollen aus</h2><p>Wähle eine Karte für Deine Hand.${s.mod?' Sie kostet '+(-s.mod)+' weniger.':''}</p><div class="discover-cards">${
  s.cards.map((c,i)=>html`<button class="discover-card" data-key="${c.id}" data-cmd="pick" data-a="${i}" aria-label="${c.name} wählen"><img src="${R.thumb(c.id)}" alt="${c.name}">${s.mod?html`<span class="sale">${s.mod} Mana</span>`:''}</button>`)}</div></div></div>`;}};

D_.result={render:vm=>{const s=vm.state,win=s.winner===0,r=s.reward;
 return html`<div class="scrim"><div class="result panel" role="dialog" aria-modal="true" aria-label="Ergebnis"><div class="laurel">${win?'✦':'⚔'}</div><div class="eyebrow">${s.mode==='campaign'?'Die historische Kampagne':'Die Chronik des Duells'}</div><h1>${win?'SIEG':s.winner===-1?'UNENTSCHIEDEN':'NIEDERLAGE'}</h1><p>${win?'Eine neue Seite Deiner Geschichte.':'Jede Schlacht lehrt einen neuen Weg.'}</p><div class="rewards">◉ +${r.gold} Gold ${r.packs?' · ▣ +'+r.packs+' Pack':''}${r.first?html`<br><small>Mission erstmals vollendet</small>`:''}</div>${choose(s.buttons)}</div></div>`;}};

D_.grave={render:vm=>{const s=vm.state;
 return V.modal({width:1000,body:html`<h2>${s.mine?'Dein':'Gegnerischer'} Friedhof · ${s.cards.length}</h2><div class="grave-grid">${
  s.cards.length?s.cards.map((c,i)=>html`<button class="grave-card" data-key="g${i}" data-cmd="inspect" data-a="${c.id}"><img src="${R.thumb(c.id)}" alt="${c.name}"></button>`):html`<p>Noch keine Karten abgelegt.</p>`}</div>`});}};

D_.chronicle={render:vm=>{const entries=vm.state.entries;
 return html`<div class="scrim chronicle-scrim" data-scrim><div class="modal panel chronicle-drawer" role="dialog" aria-modal="true" aria-labelledby="chronicle-title"><header class="chronicle-heading"><div><div class="eyebrow">DUELLVERLAUF</div><h2 id="chronicle-title">Die Chronik des Duells</h2></div>${
  V.button({label:'×',cmd:'close',extra:'close',aria:'Chronik schließen'})}</header><ol class="match-log">${
  entries.length?entries.map(e=>html`<li class="chronicle-entry"><img class="chronicle-icon" data-kind="${e.kind}" data-icon-id="${e.id}" src="${R.logIcon(e.kind,e.id)}" alt="" draggable="false"><p>${e.text}</p></li>`)
  :html`<li class="chronicle-entry"><img class="chronicle-icon" src="${R.logIcon('event','chronicle')}" alt=""><p>Die Partie beginnt.</p></li>`}</ol></div></div>`;},
 mounted:el=>{const list=el.querySelector('.match-log');if(list)list.scrollTop=list.scrollHeight;el.querySelector('.close')?.focus({preventScroll:true});}};
})();
