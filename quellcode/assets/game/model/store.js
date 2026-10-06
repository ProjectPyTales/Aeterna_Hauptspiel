/* Profile store (model): the one place that loads, saves, backs up, exports and imports the profile.
 * The keys stay 'chroniken.profile' and 'chroniken.backup' despite the new name, so every save since
 * 1.2.2 keeps loading. View models change the profile through the rules in profile.js / cosmetics.js
 * and then call commit(): the store saves and tells everyone who watches it. No DOM here. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const P=node?require('./profile.js'):root.CHP,{Observable}=node?require('../core/mvvm.js'):root.AEM;
const KEY='chroniken.profile',BACKUP='chroniken.backup';

class Store extends Observable{
 // storage: localStorage-like; bridge: the native Android bridge (save/load) or null.
 constructor({storage,bridge=null,onError=()=>{}}={}){super();this.storage=storage;this.bridge=bridge;this.onError=onError;this.profile=null;}
 // Native copy first, then the browser copy, then the backup of the previous save.
 load(){
  for(const raw of [this.bridge?.load?.()??null,this.storage.getItem(KEY),this.storage.getItem(BACKUP)])
   if(raw)try{return this.profile=P.parse(raw);}catch(e){console.warn(e);}
  return this.profile=P.fresh();
 }
 save(){
  try{const str=JSON.stringify(this.profile),old=this.storage.getItem(KEY);
   if(old)this.storage.setItem(BACKUP,old);this.storage.setItem(KEY,str);this.bridge?.save?.(str);}
  catch(e){this.onError('Speichern fehlgeschlagen. Bitte exportiere Deinen Spielstand.');console.error(e);}
 }
 commit(){this.save();this.notify();}
 exportText(){return JSON.stringify(this.profile,null,2);}
 // Checks an imported file; throws a readable error. Nothing changes until replace().
 parse(raw){return P.parse(raw);}
 replace(profile){this.profile=profile;this.commit();}
}

const api={Store,KEY,BACKUP,EXPORT_NAME:'Aeterna-Spielstand.json'};
if(node)module.exports=api;else root.AES=api;
})(typeof globalThis!=='undefined'?globalThis:this);
