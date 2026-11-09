/* Automatische Updates (seit 1.36.0, nach dem Vorbild von ADEU-Harness) – ohne DOM, in Node testbar.
 *
 * Die Hülle (android/…/Updater.kt) liest version.json aus dem Release „Test-APK“, lädt die APK, prüft Größe und SHA-256 und
 * öffnet den Installer von Android; ihren Zustand meldet sie über App.onUpdate (idle, checking, current, available,
 * downloading, ready, failed). Dieses ViewModel entscheidet, wann das Spiel fragt: nur im ruhigen Hauptmenü (kein Fenster,
 * kein Übergang, kein Intro), nie mitten im Match; „Später“ fragt erst beim nächsten Start wieder. Dazu „Was ist neu“ einmal
 * nach einem Update (model/neu.js) und der Stand für Einstellungen → Daten.
 *
 *   platform – AEP.updates (supported, state, check, download, install, cancel, page); in Tests eine Attrappe
 *   storage  – merkt sich die zuletzt gestartete Version (Schlüssel aeterna.version, außerhalb des Spielstands)
 *   ctx.ui.idle() – true im ruhigen Hauptmenü */
(function(root){'use strict';
const node=typeof module!=='undefined';
const {ViewModel}=node?require('../core/mvvm.js'):root.AEM;
const {Dialog}=node?require('./base.js'):root.AEVM;
const NEU=node?require('../model/neu.js'):root.AENEU;
const KEY='aeterna.version',PERIOD=6*3600e3;

// "1.36.0" gegen "1.35.2": true, wenn a neuer ist.
const newer=(a,b)=>{const p=v=>String(v||'').split('-')[0].split('.').map(n=>parseInt(n,10)||0),x=p(a),y=p(b);
 for(let i=0;i<Math.max(x.length,y.length);i++){const d=(x[i]||0)-(y[i]||0);if(d)return d>0;}return false;};

// Das Fenster „Neue Version“ folgt dem Zustand der Hülle, solange es offen ist: verfügbar → lädt → bereit → Installer.
class UpdateDialog extends ViewModel{
 constructor(ctx,updates){super({});this.ctx=ctx;this.updates=updates;this.off=updates.subscribe(()=>this.notify());}
 get s(){return this.updates.state;}
 get size(){const b=this.s.size;return b?Math.max(1,Math.round(b/1048576))+' MB':'';}
 get percent(){return Math.round(100*Math.max(0,Math.min(1,this.s.progress||0)));}
 start(){this.updates.download();this.ctx.ui.play?.('stone',{gain:.5});}
 install(){this.updates.install();}
 later(){this.updates.later();this.ctx.ui.close();}
 background(){this.updates.background=true;this.ctx.ui.close();this.ctx.ui.toast('Das Update lädt im Hintergrund. Ist es fertig, fragt das Spiel im Hauptmenü.');}
 cancel(){this.updates.platform.cancel();this.updates.wanted=false;this.ctx.ui.close();}
 page(){this.updates.platform.page();}
 // Zurück-Taste: ein laufender Download geht in den Hintergrund, sonst „Später“.
 close(){if(this.s.state==='downloading')this.background();else this.later();}
 closed(){this.off();if(this.updates.dialog===this)this.updates.dialog=null;}
}

class Updates{
 constructor(ctx,{platform=null,storage=null,version='',automated=false}={}){
  this.ctx=ctx;this.platform=platform;this.storage=storage;this.version=version;this.automated=automated;
  this.state=platform?.state?.()||{state:'idle'};this.listeners=new Set();
  this.postponed=null;this.wanted=false;this.background=false;this.started=false;this.checkedAt=0;this.news=null;this.dialog=null;}
 get supported(){return !!this.platform?.supported;}
 get auto(){return this.ctx.store.profile.settings.updates!==false;}
 now(){return this.ctx.now?.()??Date.now();}
 subscribe(f){this.listeners.add(f);return ()=>this.listeners.delete(f);}
 // Nach dem Intro im Hauptmenü: einmal „Was ist neu“, dann die erste Suche (wenn eingeschaltet).
 start(){if(this.started)return;this.started=true;this.news=this.whatsNew();if(this.supported&&this.auto)this.check(false);this.idle();}
 // Zurück aus dem Hintergrund: nach sechs Stunden noch einmal suchen.
 resume(){if(this.started&&this.supported&&this.auto&&this.now()-this.checkedAt>PERIOD)this.check(false);}
 // manual (Einstellungen): fragt auch nach „Später“ wieder und zeigt Fehler.
 check(manual=false){if(!this.supported)return;this.checkedAt=this.now();if(manual)this.postponed=null;this.platform.check(!!manual);}
 download(){this.wanted=true;this.background=false;this.platform.download();}
 install(){this.platform.install();}
 later(){const v=this.state.version;this.postponed=v||this.version;if(this.state.state!=='downloading')this.wanted=false;}
 // Von der Hülle (App.onUpdate): Zustand übernehmen, Fenster neu zeichnen, ggf. fragen.
 receive(raw){let s=raw;if(typeof raw==='string'){try{s=JSON.parse(raw);}catch{return;}}if(!s||typeof s.state!=='string')return;
  const was=this.state.state;this.state=s;for(const f of [...this.listeners])f(s);
  // Fertig geladen, während das Fenster offen ist: gleich den Installer öffnen (wie ADEU-Harness).
  if(s.state==='ready'&&was==='downloading'&&this.wanted&&!this.background&&this.dialog&&this.ctx.ui.dialogOpen(this.dialog)){this.install();return;}
  this.idle();}
 // Soll das Spiel von sich aus fragen?
 offer(s=this.state){if(!s.version||this.postponed===s.version)return false;
  return s.state==='available'||s.state==='ready'||s.state==='failed'&&this.wanted;}
 // Das Hauptmenü ist ruhig (app.js nach Übergängen, geschlossenen Fenstern und dem Intro).
 idle(){if(!this.started||!this.ctx.ui.idle?.())return;
  if(this.news){const n=this.news;this.news=null;
   this.ctx.ui.dialog('message',new Dialog(this.ctx,{title:'Neu in Aeterna '+n.version,text:n.notes,close:false,buttons:[{label:'Weiter',style:'gold'}]}));return;}
  if(this.offer())this.show();}
 // Fenster öffnen (auch aus den Einstellungen heraus).
 show(){this.postponed=null;this.dialog=new UpdateDialog(this.ctx,this);this.ctx.ui.dialog('update',this.dialog);}
 page(){this.platform?.page?.();}
 // Einmal nach einem Update: die Sätze aus model/neu.js. Spielstände von vor 1.36.0 kennen den Schlüssel noch nicht – wer
 // schon gespielt hat, kommt also aus einer älteren Version.
 whatsNew(){let seen=null;try{seen=this.storage?.getItem(KEY)||null;this.storage?.setItem(KEY,this.version);}catch{}
  if(this.automated||NEU.version!==this.version||!NEU.notes)return null;
  const p=this.ctx.store.profile,veteran=(p.stats?.played||0)>0||(p.campaign?.length||0)>0;
  return (seen?newer(this.version,seen):veteran)?{version:this.version,notes:NEU.notes}:null;}
 // Für Einstellungen → Daten.
 get status(){const s=this.state;switch(s.state){
  case 'checking':return 'Suche nach Updates …';
  case 'current':return 'Du hast die neueste Version.';
  case 'available':return 'Version '+s.version+' ist verfügbar.';
  case 'downloading':return 'Version '+s.version+' wird geladen ('+Math.round(100*(s.progress||0))+' %).';
  case 'ready':return 'Version '+s.version+' ist geladen und bereit zum Installieren.';
  case 'failed':return s.message||'Das Update hat nicht geklappt.';
  default:return s.error?'Beim letzten Versuch nicht erreichbar: '+s.error:'Noch nicht gesucht.';}}
 get busy(){return ['checking','downloading'].includes(this.state.state);}
}

const api={Updates,UpdateDialog,UPDATE_KEY:KEY,newerVersion:newer};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
