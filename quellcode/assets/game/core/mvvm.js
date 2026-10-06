/* MVVM core (AP 2.3): observable view models, a DOM patcher and declarative bindings.
 *
 * Model      – rules and data (model/*.js). Knows nothing about screens.
 * ViewModel  – screen state and commands (viewmodel/*.js). Reads and changes the model, never the DOM.
 * View       – a pure function render(vm) → HTML (view/*.js). Never changes the model.
 *
 * bind() renders the view, patches only what changed (nodes, images and scroll positions survive)
 * and routes user input to view-model commands:
 *   data-cmd="buy" data-a="skins" data-b="leonidas-marmor"  → vm.buy('skins','leonidas-marmor')   (click)
 *   data-input="filter" data-a="q"                          → vm.filter('q', el.value)          (input)
 *   data-change="chooseFoe"                                 → vm.chooseFoe(el.value)            (change)
 * Lists carry data-key so entries keep their nodes when they move; data-static keeps an element and its
 * subtree untouched (e.g. a canvas); data-own="class" leaves the named attributes to imperative view code
 * (e.g. classes of a running transition) after the first render.
 * No game logic lives here; the file also loads in Node for the view-model tests. */
(function(root){'use strict';

// Anything that can be watched: the profile store and every view model.
class Observable{
 constructor(){this._subs=new Set();}
 subscribe(fn){this._subs.add(fn);return()=>this._subs.delete(fn);}
 notify(){for(const fn of [...this._subs])fn(this);}
}

// A view model owns plain state; set() merges a patch and notifies once if something changed.
class ViewModel extends Observable{
 constructor(state={}){super();this.state=state;}
 set(patch){let changed=false;for(const k of Object.keys(patch))if(this.state[k]!==patch[k]){this.state[k]=patch[k];changed=true;}if(changed)this.notify();return changed;}
}

// ---------- DOM patching ----------
const keyOf=n=>n.nodeType===1?n.getAttribute('data-key'):null;
const same=(a,b)=>a.nodeType===b.nodeType&&a.nodeName===b.nodeName&&keyOf(a)===keyOf(b);

function patchAttributes(el,next){
 const own=new Set((next.getAttribute('data-own')||'').split(',').filter(Boolean));
 for(const {name} of [...el.attributes])if(!next.hasAttribute(name)&&!own.has(name))el.removeAttribute(name);
 for(const {name,value} of next.attributes)if(!own.has(name)&&el.getAttribute(name)!==value)el.setAttribute(name,value);
 // Live form state lives in properties, not attributes. A field being typed in keeps its caret.
 if(el.nodeName==='INPUT'||el.nodeName==='TEXTAREA'){
  const v=next.getAttribute('value')??'';if(el.value!==v&&el!==el.ownerDocument.activeElement)el.value=v;
  if(el.type==='checkbox'||el.type==='radio')el.checked=next.hasAttribute('checked');}
}

function patchNode(el,next){
 if(el.nodeType!==1){if(el.nodeValue!==next.nodeValue)el.nodeValue=next.nodeValue;return;}
 if(el.hasAttribute('data-static'))return;
 patchAttributes(el,next);
 patchChildren(el,next);
 if(el.nodeName==='SELECT'){const o=next.querySelector('option[selected]');const v=o?o.getAttribute('value')??o.textContent:el.options[0]?.value;if(v!=null&&el.value!==v)el.value=v;}
}

// Keyed children are matched by data-key wherever they are; the rest by position and tag.
function patchChildren(parent,next){
 const old=[...parent.childNodes],keyed=new Map(),loose=[];
 for(const n of old){const k=keyOf(n);if(k!=null)keyed.set(k,n);else loose.push(n);}
 let li=0,at=0;
 for(const n of [...next.childNodes]){
  const k=keyOf(n);let match=null;
  if(k!=null){match=keyed.get(k)||null;if(match&&!same(match,n))match=null;if(match)keyed.delete(k);}
  else if(li<loose.length){const c=loose[li++];if(same(c,n))match=c;}
  if(match)patchNode(match,n);else match=n;
  const here=parent.childNodes[at];
  if(here!==match)parent.insertBefore(match,here||null);
  at++;
 }
 while(parent.childNodes.length>at)parent.removeChild(parent.lastChild);
}

// Make root's children equal to the given HTML, touching only what differs.
function patch(rootEl,html){
 const tpl=rootEl.ownerDocument.createElement('template');tpl.innerHTML=html;
 patchChildren(rootEl,tpl.content);
}

// ---------- Binding ----------
const ARGS=['a','b','c'];
const args=el=>ARGS.filter(k=>k in el.dataset).map(k=>el.dataset[k]);
function call(vm,name,list,ev){
 const fn=vm[name];
 if(typeof fn!=='function'){console.warn('Unbekannter Befehl',name);return;}
 fn.apply(vm,[...list,ev]);
}

// view: {render(vm) → html, mounted?(el,vm), updated?(el,vm), unmounted?(el,vm)}
function bind(el,view,vm){
 let queued=false,alive=true;
 const render=()=>{queued=false;if(!alive)return;patch(el,view.render(vm));view.updated?.(el,vm);};
 const schedule=()=>{if(queued||!alive)return;queued=true;queueMicrotask(render);};
 const onClick=ev=>{const t=ev.target.closest?.('[data-cmd]');if(!t||!el.contains(t)||t.disabled)return;call(vm,t.dataset.cmd,args(t),ev);};
 const onInput=ev=>{const t=ev.target;if(t.dataset?.input)call(vm,t.dataset.input,[...args(t),t.value],ev);};
 const onChange=ev=>{const t=ev.target;if(t.dataset?.change)call(vm,t.dataset.change,[...args(t),t.value],ev);};
 el.addEventListener('click',onClick);el.addEventListener('input',onInput);el.addEventListener('change',onChange);
 const off=vm.subscribe(schedule);
 patch(el,view.render(vm));view.mounted?.(el,vm);view.updated?.(el,vm);
 return {el,vm,render,
  unbind(){if(!alive)return;alive=false;off();el.removeEventListener('click',onClick);el.removeEventListener('input',onInput);el.removeEventListener('change',onChange);view.unmounted?.(el,vm);}};
}

// HTML escaping for every text that comes from data or the player.
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Tagged template: interpolated values are escaped unless they are html() results; arrays are joined.
class Html{constructor(s){this.s=s;}toString(){return this.s;}}
const raw=s=>new Html(String(s));
const value=v=>v==null||v===false?'':v instanceof Html?v.s:Array.isArray(v)?v.map(value).join(''):esc(v);
function html(strings,...vals){let out=strings[0];for(let i=0;i<vals.length;i++)out+=value(vals[i])+strings[i+1];return new Html(out);}

const api={Observable,ViewModel,patch,bind,esc,html,raw};
if(typeof module!=='undefined')module.exports=api;else root.AEM=api;
})(typeof globalThis!=='undefined'?globalThis:this);
