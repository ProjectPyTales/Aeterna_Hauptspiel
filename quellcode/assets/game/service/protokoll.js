/* Lokales Fehlerprotokoll (Phase 7, seit 1.34.0): Fehler und abgelehnte Versprechen des Spiels landen nur auf dem Gerät
 * (localStorage, Schlüssel aeterna.fehler) – kein Netz. In den Einstellungen unter „Daten“ lässt es sich ansehen, als Datei
 * sichern (für eine Rückmeldung) und leeren. Die 40 jüngsten Einträge bleiben; gleiche Meldungen kurz hintereinander zählen
 * nur hoch. Keine DOM-Zugriffe außer in attach(); in Node mit einem Ersatz für localStorage testbar. */
(function(root){'use strict';
const KEY='aeterna.fehler',MAX=40,LONG=400;
function create({storage,now=()=>Date.now(),version=''}={}){
 const read=()=>{try{const list=JSON.parse(storage?.getItem(KEY)||'[]');return Array.isArray(list)?list.filter(x=>x&&typeof x.msg==='string'):[];}catch{return [];}};
 const write=list=>{try{storage?.setItem(KEY,JSON.stringify(list));}catch{}};
 const log={
  // where: Ort des Fehlers (Datei:Zeile oder „Versprechen“); stack wird gekürzt.
  add(msg,where='',stack=''){const at=now(),text=String(msg??'Unbekannter Fehler').slice(0,LONG),list=read(),last=list[0];
   if(last&&last.msg===text&&last.where===where&&at-last.at<60000){last.n=(last.n||1)+1;last.at=at;write(list);return last;}
   const e={at,msg:text,where:String(where).slice(0,120),stack:String(stack||'').split('\n').slice(0,4).join('\n').slice(0,LONG),version};
   write([e,...list].slice(0,MAX));return e;},
  list:read,
  clear(){write([]);},
  // Klartext für die Datei: eine Zeile je Eintrag, darunter der gekürzte Stapel.
  text(){const list=read();return ['Aeterna '+version+' – Fehlerprotokoll ('+list.length+' Einträge)',...list.map(e=>new Date(e.at).toISOString()+' · '+(e.version||'?')+' · '+e.msg+(e.where?' ('+e.where+')':'')+(e.n>1?' ×'+e.n:'')+(e.stack?'\n   '+e.stack.replace(/\n/g,'\n   '):''))].join('\n');},
  // Im Browser: alle ungefangenen Fehler mitschreiben.
  attach(win){win.addEventListener('error',e=>log.add(e.message,(e.filename||'').split('/').pop()+':'+(e.lineno||0),e.error?.stack));
   win.addEventListener('unhandledrejection',e=>log.add(e.reason?.message||e.reason,'Versprechen',e.reason?.stack));return log;}};
 return log;}
const api={create,KEY,MAX};
if(typeof module!=='undefined')module.exports=api;else root.AEF=api;
})(typeof globalThis!=='undefined'?globalThis:this);
