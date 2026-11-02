/* Profile store (model): the one place that loads, saves, backs up, exports and imports the profile.
 * The keys stay 'chroniken.profile' and 'chroniken.backup' despite the new name, so every save since
 * 1.2.2 keeps loading. View models change the profile through the rules in profile.js / cosmetics.js
 * and then call commit(): the store saves and tells everyone who watches it. No DOM here. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const P=node?require('./profile.js'):root.CHP,{Observable}=node?require('../core/mvvm.js'):root.AEM;
const KEY='chroniken.profile',BACKUP='chroniken.backup',AUTO='chroniken.auto',KEEP=3;
// Kalendertag (Ortszeit) einer Sicherung.
const dayOf=t=>{const d=new Date(t);return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();};

class Store extends Observable{
 // storage: localStorage-like; bridge: the native Android bridge (save/load) or null.
 constructor({storage,bridge=null,onError=()=>{},now=()=>Date.now()}={}){super();this.storage=storage;this.bridge=bridge;this.onError=onError;this.now=now;this.profile=null;}
 // Native copy first, then the browser copy, then the backup of the previous save.
 load(){
  for(const raw of [this.bridge?.load?.()??null,this.storage.getItem(KEY),this.storage.getItem(BACKUP),...this.snapshots().map(x=>x.text)])
   if(raw)try{return this.profile=P.parse(raw);}catch(e){console.warn(e);}
  return this.profile=P.fresh();
 }
 save(){
  try{const str=JSON.stringify(this.profile),old=this.storage.getItem(KEY);
   if(old)this.storage.setItem(BACKUP,old);this.storage.setItem(KEY,str);this.bridge?.save?.(str);this.snapshot(str);}
  catch(e){this.onError('Speichern fehlgeschlagen. Bitte exportiere Deinen Spielstand.');console.error(e);}
 }
 // Automatische Sicherungen (Phase 7, seit 1.34.0): der erste Stand jedes Tages, die drei jüngsten Tage bleiben – zusätzlich zur
 // Sicherung des vorigen Speicherns. Läuft der Speicher voll, fällt die älteste weg; das Speichern selbst scheitert daran nie.
 // [{at, day, text, gold, wins}] – neueste zuerst.
 snapshots(){try{const list=JSON.parse(this.storage.getItem(AUTO)||'[]');return Array.isArray(list)?list.filter(x=>x&&typeof x.text==='string'&&Number.isFinite(x.at)):[];}catch{return [];}}
 snapshot(str){const at=this.now(),day=dayOf(at);let list=this.snapshots();if(list[0]?.day===day)return false;
  const p=this.profile;list=[{at,day,text:str,gold:p?.gold??0,wins:p?.stats?.wins??0},...list].slice(0,KEEP);
  while(list.length){try{this.storage.setItem(AUTO,JSON.stringify(list));return true;}catch{list.pop();}}
  return false;}
 // Eine Sicherung prüfen (wie ein Import); ersetzt wird erst mit replace().
 snapshotProfile(i){const x=this.snapshots()[i];if(!x)throw Error('Diese Sicherung gibt es nicht mehr.');return P.parse(x.text);}
 commit(){this.save();this.notify();}
 exportText(){return JSON.stringify(this.profile,null,2);}
 // Checks an imported file; throws a readable error. Nothing changes until replace().
 parse(raw){return P.parse(raw);}
 replace(profile){this.profile=profile;this.commit();}
}

const api={Store,KEY,BACKUP,AUTO,KEEP,dayOf,EXPORT_NAME:'Aeterna-Spielstand.json'};
if(node)module.exports=api;else root.AES=api;
})(typeof globalThis!=='undefined'?globalThis:this);
