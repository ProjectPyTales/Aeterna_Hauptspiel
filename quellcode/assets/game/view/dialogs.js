/* Dialog views. Each renders one dialog view model into #overlay through the shared modal (view/kit.js). */
(function(){'use strict';
const {html,raw}=AEM,V=AEV,D=CHD,R=CHR;
const D_=AEV.dialogs=AEV.dialogs||{};
const choose=(buttons=[])=>buttons.map((b,i)=>V.button({label:b.label,style:b.style,cmd:'choose',a:i}));
const option=(value,label,selected)=>html`<option value="${value}"${V.attr('selected',selected)}>${label}</option>`;

// Message or question: title, text, buttons.
D_.message={render:vm=>{const s=vm.state;
 return V.modal({close:s.close,width:s.width,body:html`<h2>${s.title}</h2>${[].concat(s.text||[]).map(t=>html`<p>${t}</p>`)}${s.buttons?.length?V.buttons(choose(s.buttons),s.wrap&&'wrap'):''}`});}};

// Aufgaben (AP 6.3): Tagesgeschenk mit Serie, drei Tagesaufgaben (eine zum Lernen) und die dauerhaften Erfolge.
const bar=(n,goal)=>html`<span class="quest-track" role="progressbar" aria-valuemin="0" aria-valuemax="${goal}" aria-valuenow="${n}"><i style="width:${pct(n,goal)}"></i></span>`;
// ASTRA: tagesgeschenk – sieben Wachssiegel der Serie: offen, heute leuchtend, abgeholt gebrochen, je 96 × 96
const gift=g=>html`<section class="quest-gift"><div class="eyebrow">Tagesgeschenk · ${g.ready?'Tag '+((g.streak-1)%7+1)+' der Serie':'Serie: '+g.streak+(g.streak===1?' Tag':' Tage')}</div><div class="gift-days">${
 g.slots.map(s=>html`<div class="${V.cls('gift-day',s.done&&'done',s.today&&'today',s.today&&g.ready&&'ready')}" data-key="g${s.day}"><span class="gift-seal" aria-hidden="true">${s.day}</span><small>${s.text}</small></div>`)}</div>${
 V.button({label:g.ready?'Abholen':'Morgen wieder',cmd:'claimLogin',style:g.ready?'gold':'',disabled:!g.ready})}</section>`;
// ASTRA: aufgabe-tafel – Wachstafel einer Tagesaufgabe mit Griffel, die zum Lernen mit Eule und Schriftrolle, 360 × 210
const task=(x,rerolled)=>html`<article class="${V.cls('quest-card',x.learn&&'learn',x.ready&&'ready',x.claimed&&'claimed')}" data-key="${x.quest.id}"><div class="eyebrow">${x.learn?'Lernen':'Spielen'} · ${x.quest.gold} Gold</div><h3>${x.quest.text}</h3><p>${x.quest.hint}</p>${
 bar(x.n,x.goal)}<div class="quest-foot"><b>${x.n} / ${x.goal}</b>${x.claimed?html`<span class="muted">Abgeholt</span>`:x.ready?V.button({label:'Abholen',cmd:'claim',a:x.quest.id,style:'gold',small:true}):
 V.button({label:'Neu würfeln',cmd:'reroll',a:x.quest.id,small:true,disabled:rerolled,aria:'Andere Aufgabe statt „'+x.quest.text+'“'})}</div></article>`;
D_.quests={render:vm=>{const g=vm.login,d=vm.daily;
 return V.modal({width:1240,extra:'quests',labelledby:'quests-title',body:html`<h2 id="quests-title">Aufgaben</h2>${gift(g)}<section class="quest-daily"><div class="eyebrow">Heute · ${d.rerolled?'neu gewürfelt – morgen wieder':'einmal neu würfeln möglich'}${
  d.credit?' · '+d.credit+' Gold von gestern gutgeschrieben':''}</div><div class="quest-cards">${d.list.map(x=>task(x,d.rerolled))}</div></section><section class="quest-feats"><div class="eyebrow">Erfolge · dauerhaft</div><div class="feat-grid">${
  vm.rows.map(r=>html`<div class="quest-row" data-key="${r.quest.id}"><div>${r.quest.text}<br><small>${r.progress}/${r.quest.goal} · ${r.quest.gold} Gold</small></div>${V.button({label:r.claimed?'Erledigt':'Abholen',cmd:'claim',a:r.quest.id,disabled:!r.ready,small:true})}</div>`)}</div></section>`});}};

// Einstellungen (seit 1.34.0 in vier Reitern, Phase 7).
const when=at=>{const d=new Date(at);return d.toLocaleDateString('de-DE',{weekday:'short',day:'numeric',month:'numeric'})+', '+d.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'});};
const SETTING_BODY={
 spiel:(vm,s,row,pick)=>html`${row('Stärke der KI',pick('level',vm.levels.map(l=>[l.id,l.name,s.level===l.id])))}<p class="settings-note">${vm.levels.find(l=>l.id===s.level)?.text||''} Gilt für alle Duelle, die Kampagne und das Kolosseum.</p>${
  row('Spieltempo',pick('speed',[['1','Normal',s.speed===1],['2','Schnell',s.speed===2]]))}${
  row('Intro beim Start',pick('intro',[['true','Ein',s.intro!==false],['false','Aus',s.intro===false]]))}${
  row('Lehrstunden',V.button({label:'Mit dem Chronisten üben',cmd:'lessons',small:true}))}`,
 anzeige:(vm,s,row,pick)=>html`${row('Textgröße',pick('text',[['normal','Normal',s.text==='normal'],['gross','Groß',s.text==='gross'],['sehr','Sehr groß',s.text==='sehr']]))}${
  row('Farben',pick('colors',[['normal','Normal',s.colors==='normal'],['klar','Bei Farbsehschwäche',s.colors==='klar']]))}${
  row('Bewegung',pick('motion',[['auto','Wie das Gerät',s.motion==='auto'],['ruhig','Ruhig',s.motion==='ruhig']]))}${
  row('Grafik im Match',pick('quality',[['hoch','Hoch',s.quality==='hoch'],['sparsam','Sparsam (Akku)',s.quality==='sparsam']]))}${
  row('Partikeleffekte',pick('particles',[['true','Ein',!!s.particles],['false','Aus',!s.particles]]))}<p class="settings-note">Farbsehschwäche: blau statt grün für spielbar, orange statt rot für Ziele. „Ruhig“ ohne Wackeln und lange Übergänge, „Sparsam“ mit weniger Pixeln.</p>`,
 klang:(vm,s,row,pick,range)=>html`${row('Musik',range('music'))}${row('Geräusche',range('sfx'))}${
  row('Touch-Vibration',pick('haptics',[['true','Ein',s.haptics!==false],['false','Aus',s.haptics===false]]))}${
  row('Klangprobe',html`<div class="sound-samples">${vm.samples.map(([g,l])=>V.button({label:l,cmd:'sample',a:g,small:true}))}</div>`)}`,
 daten:vm=>{const b=vm.backups,e=vm.errors;return html`<p class="settings-note">Sammlung und laufende Partie werden nach jeder Aktion gespeichert. Sichere Deinen Fortschritt vor einer Neuinstallation.</p>${
  V.buttons([V.button({label:'Spielstand exportieren',cmd:'exportSave',small:true}),V.button({label:'Spielstand importieren',cmd:'askImport',small:true})])}<div class="settings-block"><b>Automatische Sicherungen</b><small>Der erste Stand jedes Tages, die drei jüngsten Tage.</small>${
  b.length?html`<div class="backup-list">${b.map(x=>html`<div class="backup-row" data-key="b${x.at}"><span>${when(x.at)} · ${x.gold} Gold · ${x.wins} Siege</span>${V.button({label:'Zurückholen',cmd:'restore',a:x.i,small:true})}</div>`)}</div>`:html`<small>Noch keine Sicherung.</small>`}</div><div class="settings-block"><b>Fehlerprotokoll</b><small>${
  e.length?e.length+' Einträge, zuletzt '+when(e[0].at)+': '+e[0].msg:'Keine Fehler aufgezeichnet.'} Es bleibt auf dem Gerät.</small>${
  e.length?V.buttons([V.button({label:'Als Datei sichern',cmd:'saveErrors',small:true}),V.button({label:'Leeren',cmd:'clearErrors',small:true})]):''}</div>${updates(vm)}`;}};
// Updates (seit 1.36.0): Stand, „Jetzt suchen“, beim Start suchen Ein/Aus; im Browser nur der Hinweis auf die Android-App.
function updates(vm){const u=vm.update,s=vm.settings;
 if(!u.supported)return html`<div class="settings-block update-block"><b>Updates</b><small>Version ${u.version}. Automatische Updates gibt es in der Android-App; neue Versionen stehen im Release „Test-APK“ auf GitHub.</small></div>`;
 return html`<div class="settings-block update-block"><b>Updates · installiert: Aeterna ${u.version}</b><small class="${V.cls(u.failed&&'update-error')}" role="status">${u.status}</small><div class="update-row"><label>Beim Start suchen</label><select data-change="setting" data-a="updates" aria-label="Beim Start nach Updates suchen">${
  option('true','Ein',s.updates!==false)}${option('false','Aus',s.updates===false)}</select></div>${
  V.buttons([u.offer?V.button({label:'Jetzt aktualisieren',cmd:'showUpdate',style:'gold',small:true}):V.button({label:'Jetzt nach Updates suchen',cmd:'checkUpdate',small:true,disabled:u.busy}),V.button({label:'Alle Versionen',cmd:'updatePage',small:true})])}</div>`;}

// Neue Version (seit 1.36.0, viewmodel/update.js): Hinweis mit „Was ist neu“, Laden mit Fortschritt, bereit, Fehler.
// ASTRA: update-siegel – Wachssiegel mit Pfeil im Ring über dem Hinweis „Neue Version“, 120 × 120
const UPDATE_KEEP='Sammlung, Decks und eine laufende Partie bleiben.';
D_.update={render:vm=>{const s=vm.s,size=vm.size;let body;
 if(s.state==='downloading')body=html`<h2 id="update-title">Aeterna ${s.version} wird geladen</h2><span class="update-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${vm.percent}"><i style="width:${vm.percent}%"></i></span><p class="update-step">${s.step||'Wird geladen …'} ${vm.percent} %${size?' von '+size:''}</p><p class="settings-note">Danach fragt Android, ob die App aktualisiert werden soll – einfach „Aktualisieren“ tippen.</p>${
  V.buttons([V.button({label:'Abbrechen',cmd:'cancel'}),V.button({label:'Im Hintergrund',cmd:'background'})])}`;
 else if(s.state==='ready')body=html`<h2 id="update-title">Update ist bereit</h2><p>Aeterna ${s.version} ist geladen und geprüft. ${s.installing?'Android fragt jetzt, ob die App aktualisiert werden soll – einfach „Aktualisieren“ tippen.':'Android fragt gleich, ob die App aktualisiert werden soll – einfach „Aktualisieren“ tippen.'} ${UPDATE_KEEP}</p>${
  s.note?html`<p class="update-note" role="alert">${s.note}</p>`:''}${V.buttons([V.button({label:'Später',cmd:'later'}),V.button({label:'Installieren',cmd:'install',style:'gold'})])}`;
 else if(s.state==='failed')body=html`<h2 id="update-title">Update hat nicht geklappt</h2><p>${s.message||''}</p><p class="settings-note">Die bisherige Version läuft weiter. Beim nächsten Start fragt das Spiel erneut.</p>${
  V.buttons([V.button({label:'Schließen',cmd:'later'}),V.button({label:'Download-Seite',cmd:'page'}),...(s.version?[V.button({label:'Erneut versuchen',cmd:'start',style:'gold'})]:[])])}`;
 else if(s.state==='available')body=html`<h2 id="update-title">Neue Version verfügbar</h2><p>Aeterna ${s.version} ist da (installiert: ${s.installed}).</p>${
  s.notes?html`<div class="update-notes"><b>Neu</b><p>${s.notes}</p></div>`:''}<p class="settings-note">Das Update lädt ${size||'die neue APK'} aus dem Release „Test-APK“ auf GitHub. Danach fragt Android einmal nach („Aktualisieren“). ${UPDATE_KEEP}</p>${
  V.buttons([V.button({label:'Später',cmd:'later'}),V.button({label:'Jetzt aktualisieren',cmd:'start',style:'gold'})])}`;
 else body=html`<h2 id="update-title">Updates</h2><p>${vm.updates.status}</p>${V.buttons([V.button({label:'Schließen',cmd:'later',style:'gold'})])}`;
 return V.modal({width:860,close:false,extra:'update',labelledby:'update-title',body:html`<span class="update-seal" aria-hidden="true">⟳</span>${body}`});}};
D_.settings={render:vm=>{const s=vm.settings,tab=vm.state.tab,row=(label,control)=>html`<div class="settings-row"><label>${label}</label>${control}</div>`;
 const range=k=>html`<input type="range" min="0" max="1" step=".05" value="${s[k]}" data-input="setting" data-a="${k}" aria-label="${k==='music'?'Musik':'Geräusche'}">`;
 const pick=(k,opts)=>html`<select data-change="setting" data-a="${k}">${opts.map(([v,l,on])=>option(v,l,on))}</select>`;
 return V.modal({width:1040,extra:'settings',body:html`<h2>Einstellungen</h2>${V.tabs(vm.tabs,tab,'tab')}<div class="settings-body" data-key="tab-${tab}">${SETTING_BODY[tab](vm,s,row,pick,range)}</div>${
  V.buttons([V.button({label:'Code einlösen',cmd:'redeem'}),V.button({label:'Über das Spiel',cmd:'credits'}),V.button({label:'Fertig',cmd:'close',style:'gold'})])}`});}};

// Code einlösen (Rückmeldung zu 1.10.0).
D_.redeem={render:vm=>{const s=vm.state;return V.modal({width:760,body:html`<h2>Code einlösen</h2><p>Codes schalten Gold, Kartenpakete, Staub oder Karten frei. Jeder Code gilt einmal je Spielstand.</p><input type="text" class="code-input" maxlength="32" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="CODE" value="${s.code}" data-input="type" aria-label="Code">${
  s.error?html`<p class="code-msg error" role="alert">${s.error}</p>`:s.result?html`<p class="code-msg ok" role="status">${s.result}</p>`:html`<p class="code-msg">&nbsp;</p>`}${
  V.buttons([V.button({label:'Einlösen',cmd:'redeem',style:'gold'}),V.button({label:'Schließen',cmd:'close'})])}`});}};

const RULES=[['1 · Karte ausspielen','Karte antippen, dann „Ausspielen“ oder ein gültiges Ziel wählen. Karten folgen Deinem Finger. Ziehe sie an die gewünschte Position auf Deiner Spielfeldhälfte. In der Hand kannst Du sie umsortieren; außerhalb des Felds springen sie zurück.'],
 ['2 · Angreifen','Grün leuchtenden Diener oder bewaffneten Helden antippen und Gegner wählen. Ziehen zeigt einen Zielpfeil.'],
 ['3 · Heldenfähigkeit','Das runde Symbol neben Deinem Helden ist einmal pro Zug nutzbar. '+CHD.heroes.filter(h=>h.cost!==2).map(h=>h.name+' kostet '+h.cost+' Mana').join(', ')+', alle anderen 2.'],
 ['4 · Karten ansehen','Eine Karte, einen Diener oder die Heldenfähigkeit lange drücken. Friedhöfe zeigen bereits abgelegte Karten. Die Großansicht erklärt jedes Schlüsselwort – auch, warum Zauber so heißen – und erzählt aus der Chronik.'],
 ['Schildwall & Segen','Angriffe müssen zuerst Diener mit Schildwall treffen; Zauber umgehen ihn. Segen fängt den nächsten Schaden ab.'],
 ['Einmarsch & Vermächtnis','Einmarsch wirkt beim Ausspielen aus der Hand, Vermächtnis nach dem Tod. Sturmangriff: sofort angreifen. Vorstoß: sofort angreifen, im ersten Zug nur Diener.'],
 ['Starre & Doppelschlag','Ein Diener in Starre verpasst seinen nächsten Angriff (❄). Doppelschlag: zwei Angriffe pro Zug. Weisheit +X: Eure Zauber verursachen X mehr Schaden.'],
 ['Ergründen & Bauwerke','Ergründen: Wähle eine von drei Karten auf die Hand. Bauwerke belegen einen Platz, greifen nie an und haben Haltbarkeit; Flächenschaden und Heilung wirken nicht.'],
 ['Mana & Grenzen','Jeder eigene Zug erhöht maximales Mana bis 10. Höchstens 7 Diener, 10 Handkarten. Ein leeres Deck verursacht steigenden Erschöpfungsschaden.'],
 ['Waffen & Fortschritt','Waffen verlieren pro Heldenangriff 1 Haltbarkeit. Siege geben 40 Gold. Niederlagen nach 4 eigenen Zügen geben 10 Gold; Aufgeben gibt keines.']];
D_.help={render:()=>V.modal({width:1080,body:html`<h2>So spielst Du</h2><div class="help-list">${RULES.map(([t,x])=>html`<div><b>${t}</b>${x}</div>`)}</div>${V.buttons([V.button({label:'Lehrstunden',cmd:'lessons'}),V.button({label:'Verstanden',cmd:'close',style:'gold'})])}`})};

// Lehrstunden (AP 6.5): drei Siegel mit Ort und Zeit, was man lernt und die Belohnung der ersten Lösung.
// ASTRA: lehrstunde-siegel – Wachssiegel mit Feder und Zahl (1–3) für die Lehrstunden, 160 × 160
const LEARN={schlacht:'Mana, Diener ausspielen, Angreifen, Heldenfähigkeit',schildwall:'Schildwall, Zauber, Großansicht',gunst:'Gunst der Stunde, Einmarsch, Sturmangriff, Vermächtnis'};
D_.lessons={render:vm=>V.modal({width:1180,extra:'lessons',labelledby:'lessons-title',body:html`<h2 id="lessons-title">Lehrstunden mit dem Chronisten</h2><p>Drei kurze Partien, in denen der Chronist Dir Schritt für Schritt zeigt, wie Aeterna gespielt wird. Der Gegner kämpft als Lehrling.</p><div class="lesson-list">${
 vm.rows.map(r=>html`<article class="${V.cls('lesson-card',r.done&&'done',r.next&&'next')}" data-key="${r.lesson.id}"><span class="lesson-seal" aria-hidden="true">${r.done?'✓':r.lesson.n}</span><div><small>${r.lesson.place} · ${r.lesson.year}</small><h3>${r.lesson.title}</h3><p>${LEARN[r.lesson.id]}</p><small>${r.done?'Geschafft':'Belohnung: '+r.reward.gold+' Gold'+(r.reward.packs?' und ein Kartenpaket':'')}</small></div>${
  V.button({label:r.done?'Noch einmal':'Beginnen',cmd:'start',a:r.lesson.id,style:r.next?'gold':'',small:true,aria:'Lehrstunde '+r.lesson.n+': '+r.lesson.title})}</article>`)}</div>${
 V.buttons([vm.skipped?V.button({label:'Im Hauptmenü zeigen',cmd:'show'}):V.button({label:'Im Hauptmenü ausblenden',cmd:'hide'}),V.button({label:'Schließen',cmd:'close',style:'gold'})])}`})};

D_.credits={render:vm=>V.modal({close:false,body:html`<h2>Aeterna</h2><p><span class="version-tap" data-cmd="tapVersion">Version ${vm.state.version}</span>${vm.state.shell?` · Android-Hülle ${vm.state.shell.shell}${vm.state.shell.android?' auf Android '+vm.state.shell.android:''}`:''} · Vormals „Chroniken der Helden“. Ein eigenständiges historisches Offline-Kartenspiel mit ${vm.state.cards} Karten, ${vm.state.heroes} Helden und ${vm.state.missions} Missionen.</p><p>Eigene Illustrationen: mit dem integrierten Bildgenerierungswerkzeug erstellt. Geräusche: aufgenommene Karten-, Material- und Waffensounds von Kenney und StarNinjas (CC0), neu abgemischt; Stein- und Kristallklänge, Pergament, Aufprall, Hufe, Lanzen, Uhrwerk, Münzen, Siegel, Umblättern, Kriegshörner, Ketten, Gift, Gunst, Münzwurf und die Eck-Dioramen (Astrolabium, Räuchergefäß, Säule, Katapult) prozedural erzeugt (CC0). Musik: eigene Stücke für Hauptmenü und Duell (seit 1.13.0). Historische Motive sind künstlerisch interpretiert.</p><p>Ohne Werbung, Netzwerkzugriff oder Käufe mit echtem Geld. Schriften: Cinzel und Cinzel Decorative von Natanael Gama, Alegreya Sans von Huerta Tipográfica (beide SIL Open Font License) sowie DejaVu (freie Font-Lizenz). Renderer-Labor: PixiJS (MIT-Lizenz). Küstenlinien der Kampagnenkarte: Natural Earth (gemeinfrei), über world-atlas (ISC-Lizenz).</p>${
 vm.dev?html`<p class="dev-note">Entwickler: Bildrate im Match an (fünfmal auf die Version tippen schaltet sie aus).</p>`:''}${
 V.buttons([...(vm.dev?[V.button({label:'Renderer-Labor',cmd:'lab'})]:[]),V.button({label:'Zurück',cmd:'close',style:'gold'})])}`})};

// Chronikseite eines Helden (AP 5.9): Porträt, Lebensdaten, Biografie, Zitat, Spielstil, Lieblingskarten, Beziehungen.
D_.lore={render:vm=>{const {hero:h,page:l,school,favorites}=vm.state;
 return html`<div class="scrim" data-scrim><div class="modal panel lore" role="dialog" aria-modal="true" aria-labelledby="lore-title" style="width:1240px">${
  V.button({label:'×',cmd:'close',extra:'close',aria:'Chronik schließen'})}<div class="lore-head"><div class="lore-portrait portrait" style="${R.heroStyle(h.id)}"></div><div><div class="eyebrow">Chronik der Helden · ${l.epoch}</div><h2 id="lore-title">${h.name}</h2><div class="lore-meta">${l.life} · ${l.place}</div>${school?html`<div class="lore-school">Lehrplan Sachsen · Klasse ${school.grade} · ${school.topic}</div>`:''}${
  html`<blockquote>„${l.quote}“<cite>${l.source}</cite></blockquote>`}</div></div><div class="lore-body"><div class="lore-bio">${l.bio.map(t=>html`<p>${t}</p>`)}</div><aside class="lore-facts"><h3>Spielstil</h3><p>${l.style}</p><h3>Heldenfähigkeit</h3><p><b>${h.power}</b> · ${h.powerText}</p><h3>Lieblingskarten</h3><p>${favorites.map(c=>c.name).join(' · ')}</p><h3>Verbündete und Rivalen</h3><ul>${l.relations.map(([who,what])=>html`<li><b>${who}</b> – ${what}</li>`)}</ul><h3>Stimme und Musik</h3><p>${l.voice}; ${l.music}</p></aside></div></div></div>`;}};
// Card zoom in the match: read-only; a tap beside the card closes it.
D_.zoom={render:vm=>{const c=vm.state.card,type=c.building?'Bauwerk':c.type==='minion'?'Diener':c.effect?.type==='weapon'?'Zauber · Waffe':c.ambush?'Zauber · Hinterhalt':'Zauber';
 return html`<div class="scrim card-zoom-scrim" data-scrim><div class="modal panel card-zoom" role="dialog" aria-modal="true" aria-labelledby="zoom-title" style="width:1120px">${
  V.button({label:'×',cmd:'close',extra:'close',aria:'Großansicht schließen'})}<div class="card-detail zoom-detail"><div class="zoom-art"><img src="${R.artwork(c.id)}" alt="${c.name} – vollständiges Kartenmotiv" draggable="false"><span class="zoom-cost">${c.cost}</span></div><div class="details"><div class="eyebrow">${vm.state.era} · ${D.rarities[c.rarity]}</div><h2 id="zoom-title">${c.name}</h2><div class="zoom-type">${type} · ${c.cost} Mana</div><p class="zoom-text">${c.text||'Ein Diener ohne zusätzliche Fähigkeit.'}</p>${V.glossary(c)}${V.chronicle(c)}${
  c.type==='minion'?html`<div class="zoom-stats">${c.building?html`<span>♜ ${c.health} Haltbarkeit</span>`:html`<span>⚔ ${c.attack} Angriff</span><span>♥ ${c.health} Leben</span>`}</div>`:''}<p class="zoom-hint">Zum Schließen außerhalb der Karte tippen.</p></div></div></div></div>`;}};

// AP 3.8: the starting orders are laid out as scrolls that unroll one after another; replaced ones carry a red wax seal
// and, on „Beginnen“, roll up and back into the deck of scrolls at the right (rolling).
// Astra-Bild (AP A.2): startbefehle – Startkarte als Schriftrolle mit zwei Holzstäben, Wachssiegel „austauschen“, Deckstapel, 300 × 520
D_.mulligan={render:vm=>{const m=vm.mulligan;
 return html`<div class="scrim"><div class="${V.cls('mulligan',m.rolling&&'rolling')}" style="--n:${m.hand.length}"><div class="eyebrow">${m.first?'Du beginnst':'Der Gegner beginnt · Du erhältst die Gunst der Stunde'}</div><h2>Deine Startbefehle</h2><p>Tippe auf Befehle, die Du zurück ins Deck rollen möchtest.</p><div class="mulligan-cards">${
  m.hand.map((x,i)=>html`<button class="${V.cls('mulligan-card',x.replace&&'replace')}" style="--i:${i}" data-key="${x.uid}" data-cmd="toggleMull" data-a="${x.uid}" aria-pressed="${x.replace}"><span class="rod top"></span><span class="sheet"><img src="${R.thumb(x.card.id)}" alt="${x.card.name}"></span><span class="rod bottom"></span></button>`)}<div class="mulligan-deck" aria-label="Deck: ${m.deck} Befehle"><i></i><i></i><i></i><b>${m.deck}</b></div></div>${
  V.button({label:(m.count?m.count+' Befehle tauschen':'Befehle behalten')+' · Beginnen',cmd:'acceptHand',style:'gold'})}</div></div>`;}};

// Ergründen: the chronicler lays out three sealed scrolls; one card goes to the hand. No way around the choice.
D_.discover={render:vm=>{const s=vm.state;
 return html`<div class="scrim"><div class="discover" role="dialog" aria-modal="true" aria-labelledby="discover-title"><div class="eyebrow">${s.left>1?'Ergründen · noch '+s.left+' Karten':'Ergründen'}</div><h2 id="discover-title">Der Chronist breitet drei Schriftrollen aus</h2><p>Wähle eine Karte für Deine Hand.${s.mod?' Sie kostet '+(-s.mod)+' weniger.':''}</p><div class="discover-cards">${
  s.cards.map((c,i)=>html`<button class="discover-card" data-key="${c.id}" data-cmd="pick" data-a="${i}" aria-label="${c.name} wählen"><img src="${R.thumb(c.id)}" alt="${c.name}">${s.mod?html`<span class="sale">${s.mod} Mana</span>`:''}</button>`)}</div></div></div>`;}};

// AP 3.8: the banner of the close hangs above the result; the rewards pour out as bars that fill one after another
// (gold, open quests from their value before the game, campaign).
// ASTRA: ergebnis-banner – Banner „TRIUMPH“ / „NIEDERLAGE“ / „UNENTSCHIEDEN“ über dem Ergebnis, 900 × 240
const pct=(n,goal)=>Math.round(Math.max(0,Math.min(1,goal?n/goal:0))*100)+'%';
D_.result={render:vm=>{const s=vm.state,win=s.winner===0,r=s.reward,kind=win?'win':s.winner===-1?'draw':'loss',bars=s.bars||[];
 return html`<div class="scrim"><div class="${V.cls('result','panel',kind)}" role="dialog" aria-modal="true" aria-label="Ergebnis"><div class="result-banner"><span>${s.puzzle?(win?'GELÖST':'UNGELÖST'):win?'TRIUMPH':s.winner===-1?'UNENTSCHIEDEN':'NIEDERLAGE'}</span></div><div class="eyebrow">${s.puzzle?'Kartenrätsel · '+s.puzzle.place+' · '+s.puzzle.year:s.lesson?'Lehrstunde '+s.lesson.n+' · '+s.lesson.title:s.mode==='campaign'?'Die historische Kampagne':s.mode==='draft'?'Das Kolosseum':'Die Chronik des Duells'}</div><p>${s.lesson?(win?(s.lesson.n<3?'Geschafft! Die nächste Lehrstunde wartet.':'Alle Lehrstunden geschafft – jetzt stehen Dir Kampagne, Kolosseum und Tagesduell offen.'):'Jede Schlacht lehrt einen neuen Weg. Versuche es noch einmal – der Chronist hilft.'):s.puzzle?(win?'Gelöst: '+s.puzzle.title+'.':s.missed?'Der Zug ist vorbei – das Rätsel bleibt ungelöst. Versuche eine andere Reihenfolge.':'Das Rätsel bleibt ungelöst. Versuche eine andere Reihenfolge.'):win?'Eine neue Seite Deiner Geschichte.':s.burnt?'Die Lunte ist abgebrannt – die Belagerung ist gescheitert. Versuche es schneller.':'Jede Schlacht lehrt einen neuen Weg.'}</p><div class="rewards">${
  bars.map((b,i)=>html`<div class="${V.cls('reward-bar',b.key==='gold'&&'gain',b.ep&&'xp',b.to>=b.goal&&b.key!=='gold'&&'full')}" data-key="${b.key}" style="--i:${i};--from:${pct(b.from,b.goal)};--to:${pct(b.to,b.goal)}"><span class="label">${b.label}</span><span class="track"><i></i></span><b>${b.key==='gold'?'+'+b.to:b.to+' / '+b.goal}</b><small>${b.note}</small>${b.key==='gold'&&b.to?html`<span class="coin-rain" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>`:''}</div>`)}${
  r.packs?html`<div class="reward-pack">▣ +${r.packs} Kartenpaket</div>`:''}</div>${choose(s.buttons)}</div></div>`;}};

// Kartenrätsel (AP 6.4 Teil 2): die Lage vor dem Brett – Siegel in der Farbe der Epoche, Ort und Zeit, Text, Ziel, Belohnung, Quelle.
// ASTRA: raetsel-lage – Pergament der Rätsel-Lage mit Kartenfächer und Fragezeichen-Siegel, 1000 × 420
D_.riddle={render:vm=>{const s=vm.state,z=s.puzzle,c=s.chapter;
 return V.modal({close:true,extra:'riddle',label:'Kartenrätsel: '+z.title,body:html`<div class="scene-head"><span class="scene-seal riddle-mark" style="--age:${c.color}" aria-hidden="true">?</span><div><h2>${z.title}</h2><span class="scene-years">Kartenrätsel · ${c.label} · ${z.place} · ${z.year}</span></div></div><p class="riddle-text">${z.text}</p><p class="riddle-goal">Ziel: Gewinne in diesem Zug. Endet er ohne Sieg, legst Du das Brett einfach neu auf.</p><p class="riddle-meta">${s.solved?'Schon gelöst – ein neuer Sieg bringt nur die Ehre.':'Erste Lösung: '+z.reward+' Gold'}</p><p class="scene-source">Quelle: ${z.source}</p>${V.buttons(choose(s.buttons))}`});}};

// Story-Szene eines Kapitels (AP 6.4): die Sprechblase steht über dem Porträt dessen, der spricht; darunter alle, die in der
// Szene sprechen, und die Quelle. Seit 1.32.0 (Rückmeldung zu 1.31.0): Titel mit Kapitelsiegel und Zeitspanne, die Bühne entrollt
// sich, der Chronist erzählt im Erzählkasten, die Helden warten als Schattenrisse und treten ins Licht, sobald sie sprechen; über
// ihrer Blase Ort und Zeit, die Worte erscheinen nacheinander; die letzte Zeile führt zur ersten Mission.
// ASTRA: szene-buehne – Pergamentbühne der Story-Szene mit Band in der Farbe der Epoche, 1200 × 520
// ASTRA: sprechblase – Sprechblase als entrollte Schriftrolle mit Spitze nach unten, 1000 × 180
// ASTRA: chronist – Porträt des Chronisten mit Feder und Buch für die Story-Szenen, 256 × 256
// ASTRA: erzaehlkasten – Erzählkasten des Chronisten: Pergamentstreifen mit Feder und Tintenrand, 1000 × 160
// ASTRA: schattenriss – Schattenriss eines Helden, der in der Szene noch nicht gesprochen hat (Rand und Schleier), 256 × 256
const speaker=who=>who==='chronist'?'Der Chronist':D.heroById[who]?.name||who;
const words=text=>text.split(' ').map((w,i)=>html`<span style="--w:${i}">${w} </span>`);
D_.scene={render:vm=>{const c=vm.chapter,l=vm.line,stage=vm.stage,at=stage.findIndex(x=>x.speaking),step=vm.state.step,talk=l.who!=='chronist',g=vm.goal;
 return V.modal({width:1200,extra:'scene',labelledby:'scene-title',body:html`<header class="scene-head" style="--age:${c.color}"><span class="scene-seal" aria-hidden="true">${c.numeral||c.icon}</span><div><div class="eyebrow">${c.label}${c.epilogue?'':' · '+c.era}</div><h2 id="scene-title">${c.title}</h2><small class="scene-years">${c.years}</small></div></header><div class="scene-stage" style="--age:${c.color};--n:${stage.length};--at:${at}"><div class="${V.cls('speech',!talk&&'narration')}" data-key="line${step}" role="status" aria-live="polite">${
  talk&&l.cue?html`<span class="scene-cue">${l.cue}</span>`:''}<b>${talk?'':html`<i class="quill" aria-hidden="true">✒</i>`}${speaker(l.who)}</b><p>${words(l.text)}</p></div><div class="cast">${
  stage.map(x=>html`<div class="${V.cls('speaker',x.speaking&&'speaking',x.spoke&&'spoke',x.waiting&&'waiting')}" data-key="${x.who}"><span class="coin-face" style="${R.heroStyle(x.who)}"></span><small>${x.waiting?'…':speaker(x.who)}</small></div>`)}</div></div><div class="scene-foot"><span class="scene-steps" aria-label="Zeile ${step+1} von ${vm.lines.length}">${
  vm.lines.map((_,i)=>html`<i class="${V.cls(i===step&&'now',i<step&&'read')}"></i>`)}</span><small class="scene-source">Quelle: ${c.source}</small></div>${
  V.buttons([V.button({label:'Zurück',cmd:'prev',disabled:step===0}),...(vm.last?[]:[V.button({label:vm.then?'Überspringen':'Schließen',cmd:'done'})]),
   V.button({label:vm.last?(vm.then?'Zur Mission '+g.number+' · '+g.place+' ›':'Schließen'):'Weiter ›',cmd:'next',style:'gold'})])}`});}};

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
