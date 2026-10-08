/* Campaign map view (AP 1.7): the stations of all 22 missions on a map of Europe and the Mediterranean, joined by a
 * march route in mission order – won stretches in gold, the rest dotted; sieges carry a tower. The picked station
 * opens on the panel to the right. Coastlines: assets/art/weltkarte.svg (werkzeuge/weltkarte.js). */
(function(){'use strict';
const {html,raw}=AEM,V=AEV,D=CHD,R=CHR;
const num=m=>String(m.id+1).padStart(2,'0');

// The route as SVG over the map: leader lines from seal to place, then the march in mission order – only as far as
// the chronicle has come (won stretches in gold, the way to the next open mission dotted); the rest stays unwritten.
function route(vm,list){const st=vm.route,seg=[];
 for(let i=1;i<st.length;i++){const a=st[i-1],b=st[i],x=list[b.id];if(x.locked)break;seg.push(`<path class="${x.done?'won':'open'}" d="M${a.x} ${a.y}L${b.x} ${b.y}"/>`);}
 const lead=list.map(x=>x.station).filter(s=>Math.hypot(s.x-s.at.x,s.y-s.at.y)>4).map(s=>`<path class="lead" d="M${s.at.x} ${s.at.y}L${s.x} ${s.y}"/><circle class="place" cx="${s.at.x}" cy="${s.at.y}" r="3"/>`);
 return raw(`<svg class="map-route" viewBox="0 0 1080 640" aria-hidden="true">${lead.join('')}${seg.join('')}</svg>`);}

// ASTRA: missionssiegel – Wachssiegel einer Station (offen, vollendet, versiegelt) mit Turm für Belagerungen, 128 × 128
const station=(x,picked)=>{const s=x.station,m=x.mission;
 return html`<button class="${V.cls('station',x.done&&'done',x.locked&&'locked',!x.done&&!x.locked&&'open',picked&&'picked',s.siege&&'siege')}" data-key="st${m.id}" style="left:${s.x}px;top:${s.y}px" data-cmd="pick" data-a="${m.id}" aria-label="Mission ${m.id+1}: ${m.title}, ${s.place}${x.done?', vollendet':x.locked?', versiegelt':''}" aria-pressed="${picked}"><span class="st-seal">${x.done?'✓':num(m)}</span>${s.siege?html`<i class="tower" title="Belagerung">♜</i>`:''}${picked?html`<span class="place-name">${s.place}</span>`:''}</button>`;};

function panel(x,count){const m=x.mission,s=x.station,foe=D.heroes.find(h=>h.id===m.hero);
 return V.panel(html`<div class="eyebrow">Mission ${num(m)} · ${s.place}${s.siege?' · Belagerung':''}</div><h2>${m.title}</h2><div class="mission-foe"><span class="coin-face" style="${R.heroStyle(m.hero)}"></span><div><small>Gegner</small><b>${m.boss}</b><span>${foe?'mit den Karten von '+foe.name:''}</span></div></div><p>${m.description}</p><p class="reward">${x.done?'Vollendet · wiederholbar für 40 Gold':'Erster Sieg: '+m.reward+' Gold + 1 Pack'}</p><div class="spacer"></div>${
  x.locked?html`<p class="sealed">Versiegelt – gewinne zuerst Mission ${num({id:m.id-1})}.</p>`:''}${V.button({label:'Mission vorbereiten ›',cmd:'start',style:'gold',disabled:x.locked})}<div class="campaign-foot"><span>${count} / ${D.missions.length} vollendet</span>${V.button({label:'Aufträge',cmd:'quests',small:true})}</div>`,{extra:'mission-panel',key:'m'+m.id});}

AEV.screens=AEV.screens||{};
AEV.screens.campaign={render:vm=>{const list=vm.missions,picked=vm.picked,count=list.filter(x=>x.done).length;
 // ASTRA: weltkarte – gemalte Weltkarte Europa und Mittelmeer mit Kästchen „Neue Welt“ (heute Küstenlinien als SVG), 2160 × 1280
 return html`<div class="screen campaign">${V.topbar('Kampagne · Die Chronik',vm.wallet())}<div class="campaign-content"><div class="world-map"><img class="map-art" src="assets/art/weltkarte.svg" alt="">${route(vm,list)}<span class="map-title">Die Chronik der Welt</span><span class="inset-title">Neue Welt</span>${
  list.map(x=>station(x,x.mission.id===picked.mission.id))}</div>${panel(picked,count)}</div></div>`;}};
})();
