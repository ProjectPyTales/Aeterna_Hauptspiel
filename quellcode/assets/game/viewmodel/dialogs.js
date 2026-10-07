/* Dialogs reachable from several screens: quests, settings, rules, credits, export and import. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const P=node?require('../model/profile.js'):root.CHP,D=node?require('../model/data.js'):root.CHD,LORE=node?require('../model/lore.js'):root.AELORE;
const {Dialog,LiveDialog}=node?require('./base.js'):root.AEVM;

class Quests extends LiveDialog{
 get rows(){const p=this.profile;return P.quests.map(q=>({quest:q,progress:Math.min(q.goal,p.stats[q.stat]),claimed:p.claimed.includes(q.id),ready:!p.claimed.includes(q.id)&&p.stats[q.stat]>=q.goal}));}
 claim(id){if(P.claim(this.profile,id))this.ctx.store.commit();}
}

class Settings extends LiveDialog{
 get settings(){return this.profile.settings;}
 // Sliders deliver strings, the selects 'true'/'false' or numbers.
 setting(k,v){const s=this.profile.settings;
  if(k==='music'||k==='sfx')s[k]=Math.max(0,Math.min(1,Number(v)||0));
  else if(k==='speed')s.speed=Number(v)===2?2:1;
  else if(k==='haptics'||k==='particles')s[k]=v===true||v==='true';
  else return;
  this.ctx.store.commit();}
 exportSave(){this.ctx.dialogs.exportSave();}
 askImport(){this.ctx.dialogs.askImport();}
 credits(){this.ctx.dialogs.credits();}
 redeem(){this.ctx.dialogs.redeem();}
 // Klangprobe (AP 0.2): die Steingeräusche und zwei Vergleichsklänge aus dem Match auf dem Gerät anhören.
 get samples(){return SAMPLES;}
 sample(group){if(!SAMPLES.some(([g])=>g===group))return;this.ctx.ui.unlockAudio?.();this.ctx.ui.play(group);if(group==='slam')this.ctx.ui.haptic(1);}
}
const SAMPLES=[['stone','Tippen'],['scrape','Schleifen'],['slam','Einrasten'],['grind','Mahlen'],['draw','Karte'],['hit','Treffer']];

// Über das Spiel. Versteckte Entwickler-Einstellung (AP 2.4): fünfmal auf die Versionsnummer tippen schaltet die
// Bildraten-Anzeige im Match (settings.fps) und den Knopf zum Renderer-Labor (AP 2.5).
class Credits extends LiveDialog{
 constructor(ctx,state){super(ctx,state);this.taps=0;}
 get dev(){return this.profile.settings.fps===true;}
 tapVersion(){if(++this.taps<5)return;this.taps=0;const s=this.profile.settings;s.fps=!s.fps;this.ctx.store.commit();
  this.ctx.ui.toast(s.fps?'Entwickler: Bildrate wird im Match angezeigt.':'Entwickler: Bildraten-Anzeige aus.');}
 lab(){if(this.dev)this.ctx.ui.lab?.();}
}

// Code einlösen (Rückmeldung zu 1.10.0): welche Codes es gibt und dass jeder nur einmal je Spielstand gilt, regelt
// model/profile.js (CHP.redeem). Das Feld wird beim Tippen nicht neu gezeichnet (Cursor bleibt).
class Redeem extends LiveDialog{
 constructor(ctx){super(ctx,{code:'',error:null,result:null});}
 type(v){this.state.code=String(v??'').slice(0,32);}
 redeem(){const r=P.redeem(this.profile,this.state.code);
  if(r.error){this.set({error:r.error,result:null});this.ctx.ui.play('click');return;}
  this.set({code:'',error:null,result:'Eingelöst: '+r.text+'.'});this.ctx.store.commit();this.ctx.ui.play('pack');this.ctx.ui.haptic(1);}
}

class Dialogs{
 constructor(ctx,version){this.ctx=ctx;this.version=version;}
 get ui(){return this.ctx.ui;}
 quests(){this.ui.dialog('quests',new Quests(this.ctx));}
 settings(){this.ui.dialog('settings',new Settings(this.ctx));}
 help(){this.ui.dialog('help',new Dialog(this.ctx,{}));}
 // Chronikseite eines Helden (AP 5.9): Heldenwahl und Großansicht des Helden im Match.
 lore(id){const hero=D.heroes.find(h=>h.id===id),page=LORE.of(id);if(!hero||!page)return;
  this.ui.dialog('lore',new Dialog(this.ctx,{hero,page,school:LORE.school(id),favorites:page.favorites.map(c=>D.byId[c]).filter(Boolean)}));}
 credits(){this.ui.dialog('credits',new Credits(this.ctx,{version:this.version,cards:D.cards.length,heroes:D.heroes.length,missions:D.missions.length,shell:this.ui.platform?.()||null}));}
 redeem(){this.ui.dialog('redeem',new Redeem(this.ctx));}
 exportSave(){this.ui.exportSave(this.ctx.store.exportText());}
 askImport(){this.ui.dialog('message',new Dialog(this.ctx,{title:'Spielstand laden',close:false,
  text:'Wähle eine zuvor exportierte Spielstand-Datei (JSON). Vor dem Ersetzen siehst Du eine Zusammenfassung.',
  buttons:[{label:'Abbrechen'},{label:'Datei auswählen',style:'gold',run:()=>this.ui.pickImport()}]}));}
 // Text from the file picker or the native shell: check it, show a summary, replace only on confirmation.
 importText(raw){let candidate;
  try{candidate=this.ctx.store.parse(raw);}catch(e){this.ui.toast('Import fehlgeschlagen: '+e.message);return;}
  this.ui.dialog('message',new Dialog(this.ctx,{title:'Spielstand importieren?',close:false,
   text:'Dieser Spielstand enthält '+candidate.gold+' Gold, '+candidate.stats.wins+' Siege und '+candidate.campaign.length+' abgeschlossene Missionen. Er ersetzt Deinen jetzigen Fortschritt.',
   buttons:[{label:'Abbrechen'},{label:'Importieren',style:'gold',run:()=>{this.ctx.store.replace(candidate);this.ctx.reset?.();this.ui.go('menu',null,true);this.ui.toast('Spielstand importiert.');}}]}));}
}

const api={Dialogs,Quests,Settings,Redeem,Credits};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
