/* Campaign map view (AP 1.7): the stations of all 22 missions on a map of Europe and the Mediterranean, joined by a
 * march route – won stretches in gold, the rest dotted; sieges carry a tower. The picked station opens on the panel to
 * the right. Coastlines: assets/art/weltkarte.svg (werkzeuge/weltkarte.js).
 * Kampagne 2.0 (AP 6.4): the chapter strip on the panel, one route per chapter (the picked chapter bright, the others
 * faint), numbers in campaign order, boss ability and Lunte on the panel, and the story scene (dialog in view/dialogs.js).
 * Kartenrätsel (AP 6.4 Teil 2): one row per chapter on the panel – sealed until the chapter is won, then „Lösen“. */
(function(){'use strict';
const {html,raw}=AEM,V=AEV,D=CHD,R=CHR;
const num=n=>String(n).padStart(2,'0');

// The routes as SVG over the map: leader lines from seal to place, then the march of each chapter – only as far as the
// chronicle has come (won stretches in gold, the way to the next open mission dotted); the rest stays unwritten.
function route(vm,list){const seg=[];
 for(const r of vm.routes)for(const l of r.legs)seg.push(`<path class="${l.won?'won':'open'}${r.current?'':' other'}" d="M${l.a.x} ${l.a.y}L${l.b.x} ${l.b.y}"/>`);
 const lead=list.map(x=>x.station).filter(s=>Math.hypot(s.x-s.at.x,s.y-s.at.y)>4).map(s=>`<path class="lead" d="M${s.at.x} ${s.at.y}L${s.x} ${s.y}"/><circle class="place" cx="${s.at.x}" cy="${s.at.y}" r="3"/>`);
 return raw(`<svg class="map-route" viewBox="0 0 1080 640" aria-hidden="true">${lead.join('')}${seg.join('')}</svg>`);}

// ASTRA: missionssiegel – Wachssiegel einer Station (offen, vollendet, versiegelt) mit Turm für Belagerungen, 128 × 128
const station=(x,picked,chapter)=>{const s=x.station,m=x.mission;
 return html`<button class="${V.cls('station',x.done&&'done',x.locked&&'locked',!x.done&&!x.locked&&'open',picked&&'picked',s.siege&&'siege',x.chapter!==chapter&&'other')}" data-key="st${m.id}" style="left:${s.x}px;top:${s.y}px" data-cmd="pick" data-a="${m.id}" aria-label="Mission ${x.number}: ${m.title}, ${s.place}${x.done?', vollendet':x.locked?', versiegelt':''}" aria-pressed="${picked}"><span class="st-seal">${x.done?'✓':num(x.number)}</span>${x.fuse?html`<i class="tower fuse" title="Belagerung mit Lunte">✹</i>`:s.siege?html`<i class="tower" title="Belagerung">♜</i>`:''}${picked?html`<span class="place-name">${s.place}</span>`:''}</button>`;};

// ASTRA: kapitelsiegel – Medaillon eines Kapitels in der Farbe seiner Epoche (offen, vollendet, versiegelt), 96 × 96
const chapters=vm=>html`<nav class="chapter-strip" aria-label="Kapitel">${vm.chapters.map(c=>html`<button class="${V.cls('chapter-seal',c.current&&'current',c.complete&&'complete',!c.open&&'locked')}" data-key="${c.chapter.id}" data-cmd="chapter" data-a="${c.chapter.id}" style="--age:${c.chapter.color}" aria-label="${c.chapter.label}: ${c.chapter.era}, ${c.done} von ${c.total}" aria-pressed="${c.current}"><span>${c.chapter.numeral||c.chapter.icon}</span><small>${c.done}/${c.total}</small></button>`)}</nav>`;

// ASTRA: raetsel-siegel – Siegel eines Kartenrätsels (versiegelt, offen, gelöst) mit Fragezeichen aus Karten, 96 × 96
const riddle=r=>!r?'':html`<div class="${V.cls('riddle-note',r.open&&'open',r.solved&&'solved')}"><span class="riddle-seal" aria-hidden="true">${r.solved?'✓':'?'}</span><div><small>Kartenrätsel${r.solved?' · gelöst':''}</small><b>${r.puzzle.title}</b>${r.open?'':html`<span>Gewinne alle Missionen des Kapitels.</span>`}</div>${
 r.open?V.button({label:r.solved?'Erneut':'Lösen',cmd:'openRiddle',small:true,aria:'Kartenrätsel '+r.puzzle.title+(r.solved?' erneut lösen':' lösen')}):''}</div>`;

function panel(vm,x,count){const m=x.mission,s=x.station,c=x.chapter,f=x.fuse,ch=vm.chapters.find(y=>y.current);
 return V.panel(html`${chapters(vm)}<div class="chapter-head"><b>${c.label}${c.epilogue?'':' · '+c.era}</b><span>${c.title}</span></div><div class="eyebrow">Mission ${num(x.number)} · ${s.place}${s.siege&&!f?' · Belagerung':''}</div><h2>${m.title}</h2><div class="mission-foe"><span class="coin-face" style="${R.heroStyle(m.hero)}"></span><div><small>Gegner</small><b>${m.boss}</b><span>${D.heroById[m.hero]?'mit den Karten von '+D.heroById[m.hero].name:''}</span></div></div><p class="boss-ability"><small>Fähigkeit des Bosses</small>${m.description}</p>${
  f?html`<div class="fuse-note"><b>Lunte · ${f.turns} eigene Züge</b><p>${f.text}</p><small>Quelle: ${f.source}</small></div>`:''}<p class="reward">${x.done?'Vollendet · wiederholbar für 40 Gold':'Erster Sieg: '+m.reward+' Gold + 1 Pack'}</p>${riddle(vm.riddle)}<div class="spacer"></div>${
  x.locked?html`<p class="sealed">Versiegelt – gewinne zuerst Mission ${num(x.number-1)}.</p>`:''}${V.button({label:'Mission vorbereiten ›',cmd:'start',style:'gold',disabled:x.locked})}<div class="campaign-foot"><span>${count} / ${D.missions.length} vollendet</span><span class="foot-buttons">${V.button({label:'Szene',cmd:'replay',small:true,disabled:!ch?.open,aria:'Szene von '+c.label+' ansehen'})}${V.button({label:'Aufträge',cmd:'quests',small:true})}</span></div>`,{extra:'mission-panel',key:'m'+m.id});}

AEV.screens=AEV.screens||{};
AEV.screens.campaign={render:vm=>{const list=vm.missions,picked=vm.picked,count=list.filter(x=>x.done).length;
 // ASTRA: weltkarte – gemalte Weltkarte Europa und Mittelmeer mit Kästchen „Neue Welt“ (heute Küstenlinien als SVG), 2160 × 1280
 return html`<div class="screen campaign">${V.topbar('Kampagne · Die Chronik',vm.wallet())}<div class="campaign-content"><div class="world-map"><img class="map-art" src="assets/art/weltkarte.svg" alt="">${route(vm,list)}<span class="map-title">Die Chronik der Welt</span><span class="inset-title">Neue Welt</span>${
  vm.ordered.map(x=>station(x,x.mission.id===picked.mission.id,picked.chapter))}</div>${panel(vm,picked,count)}</div></div>`;}};
})();
