/* View kit (AP 2.3): the shared building blocks, each implemented once – Steinknopf, Panel, Reiter,
 * Wallet, Kopfleiste and Modal. Pure HTML builders for the views; commands use data-cmd (see core/mvvm.js). */
(function(){'use strict';
const {html,raw,esc}=AEM;
const V=window.AEV={};
const cls=(...names)=>names.filter(Boolean).join(' ');
// data-* attributes for everything that is set (cmd, a, b, c, key …).
const data=o=>raw(Object.entries(o).filter(([,v])=>v!=null&&v!==false).map(([k,v])=>` data-${k}="${esc(v)}"`).join(''));
const attr=(name,v)=>v==null||v===false?'':raw(v===true?` ${name}`:` ${name}="${esc(v)}"`);
V.data=data;V.attr=attr;V.cls=cls;

// Steinknopf. style: '' (stone) | 'gold' (main action) | 'teal' (equip) | 'danger'.
V.button=({label,cmd,a,b,c,style,small,disabled,extra,aria,key,id})=>
 html`<button class="${cls(style,small&&'small',extra)}"${data({cmd,a,b,c,key})}${attr('id',id)}${attr('disabled',!!disabled)}${attr('aria-label',aria)}>${label}</button>`;
V.buttons=(list,extra)=>html`<div class="${cls('buttons',extra)}">${list}</div>`;

// Panel: framed tablet for side bars, tiles and dialogs.
V.panel=(body,{extra,key,role}={})=>html`<section class="${cls('panel',extra)}"${data({key})}${attr('role',role)}>${body}</section>`;

// Reiter: one row of stone tabs; the active one sits pressed in with a gold rim.
V.tabs=(items,active,cmd)=>html`<div class="stone-tabs" role="tablist">${items.map(([id,label])=>
 html`<button class="${cls('stone-tab',id===active&&'active')}" role="tab" aria-selected="${id===active}"${data({cmd,a:id,key:id})}>${label}</button>`)}</div>`;

// Wallet: gold, dust and packs. Keyed, so a changing number only updates its own text.
// Astra-Bild (AP A.2): waehrung – Symbole für Gold, Staub und Kartenpakete (assets/ui/waehrung-*.svg, CSS in astra.css), je 64 × 64
V.wallet=({gold,dust,packs})=>html`<div class="wallet" role="status"><span data-key="gold" aria-label="${gold} Gold"><i class="cur gold" aria-hidden="true"></i>${gold}</span><span data-key="dust" aria-label="${dust} Staub"><i class="cur dust" aria-hidden="true"></i>${dust}</span><span data-key="packs" aria-label="${packs} Kartenpakete"><i class="cur packs" aria-hidden="true"></i>${packs}</span></div>`;

// Kopfleiste: back, title, wallet. The back command belongs to the screen's view model.
V.topbar=(title,wallet)=>html`<div class="topbar">${V.button({label:'‹ Zurück',cmd:'back'})}<h2>${title}</h2>${wallet?V.wallet(wallet):''}</div>`;

// Modal: scrim + framed dialog. width in stage pixels; scrim:true closes on a tap beside the dialog.
V.modal=({body,width,close=true,extra,scrimExtra,label,labelledby,scrim=false})=>
 html`<div class="${cls('scrim',scrimExtra)}"${attr('data-scrim',scrim)}><div class="${cls('modal panel',extra)}" role="dialog" aria-modal="true"${attr('aria-label',label)}${attr('aria-labelledby',labelledby)}${width?raw(` style="width:${+width}px"`):''}>${close?V.button({label:'×',cmd:'close',extra:'close',aria:'Schließen'}):''}${body}</div></div>`;

// Schlüsselwörter einer Karte mit Erklärung (AP 5.4; seit AP L.6 auch „Zauber“) – für Großansicht und Kartendetails.
V.glossary=c=>{const list=CHD.glossaryOf(c);return list.length?html`<dl class="glossary">${list.map(k=>html`<div><dt>${k.name}</dt><dd>${k.text}</dd></div>`)}</dl>`:'';};
// „Aus der Chronik“ (AP L.6 Teil 2): ein belegter Satz mit Quelle, wo es ihn schon gibt.
V.chronicle=c=>{const l=AELORE.card(c.id);return l?html`<div class="chronicle-line"><b>Aus der Chronik</b>${l[0]}<cite>${l[1]}</cite></div>`:'';};

// Plain message or question: title, paragraphs and a row of buttons.
V.message=({title,text=[],buttons=[]})=>html`<h2>${title}</h2>${[].concat(text).map(t=>html`<p>${t}</p>`)}${buttons.length?V.buttons(buttons):''}`;
})();
