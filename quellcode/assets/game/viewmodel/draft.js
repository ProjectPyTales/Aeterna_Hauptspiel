/* Kolosseum (AP 6.1): der Draft als eigener Bildschirm. Ohne Lauf erklärt er Regeln, Eintritt und Belohnung; dann die
 * Heldenwahl aus drei, 30 Wahlen aus je drei Karten (mit Manakurve und „Aus der Chronik“ jeder angebotenen Karte –
 * halb Spaß, halb Lernen), der Lauf mit Lorbeeren für Siege und gebrochenen Schilden für Niederlagen, am Ende die
 * Belohnung. Regeln und Spielstand in model/draft.js (AEDR); hier nur Zustand, Befehle und Rückfragen. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD,DR=node?require('../model/draft.js'):root.AEDR,LORE=node?require('../model/lore.js'):root.AELORE;
const {Screen,Dialog}=node?require('./base.js'):root.AEVM;
const {curveOf,curveHint,phase:curvePhase}=node?require('./collection.js'):root.AEVM;

class Draft extends Screen{
 constructor(ctx){super(ctx,{flash:null});this.flashes=0;}
 enter(){this.state.flash=null;}
 get run(){return this.profile.draft;}
 get view(){const p=this.profile,r=this.run,phase=DR.phase(r),v={phase,gold:p.gold,fee:DR.fee(p),stats:p.draftStats,wins:DR.WINS,losses:DR.LOSSES,picks:DR.PICKS,flash:this.state.flash,
   table:[0,3,7,DR.WINS].map(w=>({wins:w,...DR.reward(w)}))};
  if(!r)return v;
  Object.assign(v,{run:r,won:r.wins,lost:r.losses,
   slots:{wins:Array.from({length:DR.WINS},(_,i)=>i<r.wins),losses:Array.from({length:DR.LOSSES},(_,i)=>i<r.losses)},reward:r.reward||DR.reward(r.wins)});
  if(phase==='hero')v.heroes=r.heroes.map(id=>{const h=D.heroById[id];return {hero:h,age:D.ageById[h.age],school:LORE.school(id),deed:LORE.deed(id),style:D.personalities[h.ai]||null};});
  if(r.hero){const h=D.heroById[r.hero],counts={};for(const id of r.picks)counts[id]=(counts[id]||0)+1;
   const curve=curveOf(r.picks);
   Object.assign(v,{hero:h,age:D.ageById[h.age],n:r.picks.length,curve,max:Math.max(4,...curve),bars:curve.map((n,i)=>({n,i,phase:curvePhase(i)})),hint:curveHint(curve),
    rows:Object.keys(counts).sort((a,b)=>D.byId[a].cost-D.byId[b].cost||D.byId[a].name.localeCompare(D.byId[b].name,'de')).map(id=>({card:D.byId[id],count:counts[id]}))});}
  if(phase==='pick'){const rarity=D.byId[r.options[0]].rarity;
   v.options=r.options.map(id=>{const c=D.byId[id];return {card:c,era:D.eraOf(c),lore:LORE.card(id),keys:D.glossaryOf(c).filter(k=>k.name!=='Zauber').slice(0,2),own:c.hero===r.hero};});
   v.rarity=rarity==='basic'?'common':rarity;v.special=[0,9,19,29].includes(r.picks.length);}
  if(phase==='play'){const g=p.game;v.resume=!!g&&g.mode==='draft'&&g.draft===r.id&&g.phase!=='over';}
  return v;}

 // Lauf beginnen – der erste ist ein Probelauf, danach kostet der Eintritt Gold (mit Rückfrage).
 start(force=false){const p=this.profile,cost=DR.fee(p);
  if(!p.draft&&cost&&force!==true){
   this.ui.dialog('message',new Dialog(this.ctx,{title:'Eintritt ins Kolosseum',close:false,text:['Ein Lauf kostet '+cost+' Gold. Du wählst einen Helden und 30 Karten und kämpfst, bis Du '+DR.WINS+' Siege oder '+DR.LOSSES+' Niederlagen hast.','Die Belohnung wächst mit jedem Sieg – schon ab 3 Siegen bekommst Du mehr zurück, als der Eintritt kostet.'],
    buttons:[{label:'Zurück'},{label:'Für '+cost+' Gold eintreten',style:'gold',run:()=>this.start(true)}]}));return;}
  const res=DR.start(p);if(res.error){this.ui.toast(res.error);return;}
  this.commit();this.ui.play(res.cost?'coins':'seal');this.ui.haptic(1);}
 chooseHero(id){if(!DR.chooseHero(this.profile,id))return;this.commit();this.ui.play('stone',{gain:.7});this.ui.haptic(0);}
 // Eine Karte wählen: Sie fliegt in die Kurve (flash: neuer Schlüssel je Wahl), dann kommen die nächsten drei.
 pick(i){const p=this.profile,id=DR.pick(p,+i);if(!id)return;this.state.flash={id,n:++this.flashes};this.commit();this.ui.play('draw');this.ui.haptic(0);
  if(DR.phase(p.draft)==='play'){this.ui.play('seal');this.ui.toast('Dein Deck steht – auf in die Arena!');}}
 inspect(id){this.ctx.dialogs.zoom(id);}
 // Kampf: eine laufende Partie dieses Laufs wird fortgesetzt; eine andere gespeicherte Partie ersetzt sie nur nach Rückfrage.
 fight(force=false){const p=this.profile,r=this.run;if(DR.phase(r)!=='play')return;
  const g=p.game;if(g&&g.mode==='draft'&&g.draft===r.id&&g.phase!=='over'){this.ui.go('game');return;}
  if(g&&g.phase!=='over'&&force!==true){
   this.ui.dialog('message',new Dialog(this.ctx,{title:'Laufende Partie',close:false,text:'Du hast noch eine gespeicherte Partie. Ein Kampf im Kolosseum ersetzt sie.',
    buttons:[{label:'Zurück'},{label:'Kampf beginnen',style:'gold',run:()=>this.fight(true)}]}));return;}
  p.game=DR.game(p);delete p.matchChronicle;this.commit();this.ctx.match?.reset();this.ui.go('game');}
 // Aufhören: Der Lauf endet mit den Siegen, die er hat.
 retire(){const r=this.run;if(!r||r.over)return;
  this.ui.dialog('message',new Dialog(this.ctx,{title:'Lauf beenden?',close:false,text:'Du erhältst die Belohnung für '+r.wins+' '+(r.wins===1?'Sieg':'Siege')+'. Das Deck des Laufs verfällt.',
   buttons:[{label:'Weiterkämpfen'},{label:'Lauf beenden',style:'danger',run:()=>{if(DR.retire(this.profile))this.commit();}}]}));}
 claim(){const w=DR.claim(this.profile);if(!w)return;this.commit();this.ui.play('coins');this.ui.haptic(2);
  this.ui.toast('Belohnung: '+[w.gold&&w.gold+' Gold',w.packs&&w.packs+' '+(w.packs===1?'Kartenpaket':'Kartenpakete'),w.dust&&w.dust+' Staub'].filter(Boolean).join(', ')+'.');}
 help(){this.ui.dialog('message',new Dialog(this.ctx,{title:'Das Kolosseum',text:[
  'Wähle einen von drei Helden – jeder aus einer anderen Epoche. Dann wählst Du 30-mal eine von drei Karten; alle drei haben dieselbe Seltenheit, die 1., 10., 20. und 30. Wahl ist mindestens selten.',
  'Karten Deines Helden kommen öfter, Zeitalterkarten etwas öfter als neutrale. Antippen zeigt eine Karte groß, mit ihrer Geschichte „Aus der Chronik“.',
  'Mit dem fertigen Deck kämpfst Du gegen zufällige Gegner, bis Du '+DR.WINS+' Siege oder '+DR.LOSSES+' Niederlagen hast. Deine Sammlung bleibt unverändert; die Belohnung holst Du am Ende ab.'],
  buttons:[{label:'Verstanden',style:'gold'}]}));}
}

const api={Draft};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
