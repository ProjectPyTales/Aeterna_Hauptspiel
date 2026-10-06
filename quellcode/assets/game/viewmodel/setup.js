/* Duel preparation: hero, deck and opponent for a free duel, the colosseum, the daily duel or a mission. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD,E=node?require('../model/engine.js'):root.CHE,P=node?require('../model/profile.js'):root.CHP;
const {Screen,Dialog}=node?require('./base.js'):root.AEVM;

// Hero tiles grouped by age (AP 5.10); within an age the order of D.heroes.
const AGE=Object.fromEntries(D.ages.map((a,i)=>[a.id,i])),HEROES=D.heroes.slice().sort((a,b)=>AGE[a.age]-AGE[b.age]);

class Setup extends Screen{
 get view(){const s=this.session,p=this.profile,day=s.mode==='daily'?P.daily():null,heroId=day?day.hero:s.hero;
  const decks=p.decks.filter(d=>d.hero===s.hero);if(!decks.some(d=>d.id===s.deckId))s.deckId=decks[0]?.id||'';
  return {mode:s.mode,day,hero:D.heroes.find(h=>h.id===heroId),foe:day?D.heroes.find(h=>h.id===day.foe):null,heroes:HEROES,
   selected:heroId,decks,deckId:s.deckId,foeId:s.foe,mission:s.mode==='campaign'?D.missions[s.mission]:null};}
 chooseHero(id){if(this.session.mode==='daily'||!D.heroes.some(h=>h.id===id))return;this.session.hero=id;this.notify();}
 chooseFoe(id){this.session.foe=id;}
 chooseDeck(id){this.session.deckId=id;}
 help(){this.ctx.dialogs.help();}
 lore(){const day=this.session.mode==='daily'?P.daily():null;this.ctx.dialogs.lore(day?day.hero:this.session.hero);}
 // A new game replaces a saved one only after asking.
 begin(force=false){const p=this.profile,s=this.session;
  if(p.game&&p.game.phase!=='over'&&force!==true){
   this.ui.dialog('message',new Dialog(this.ctx,{title:'Laufende Partie',close:false,text:'Du hast noch eine gespeicherte Partie. Eine neue Partie ersetzt sie.',
    buttons:[{label:'Zurück'},{label:'Neue Partie starten',style:'gold',run:()=>this.begin(true)}]}));return;}
  let hero=s.hero,foe=s.foe,deck,enemyDeck,seed=(Date.now()^Math.floor(Math.random()*1e9))>>>0;
  if(s.mode==='daily'){const day=P.daily();seed=day.seed;hero=day.hero;foe=day.foe;deck=E.randomDeck(hero,day.deckSeed);enemyDeck=E.randomDeck(foe,day.deckSeed+47);}
  else if(s.mode==='random'){const r={seed:seed||1};const n=D.heroes.length;hero=D.heroes[Math.floor(E.rand(r)*n)].id;foe=D.heroes[Math.floor(E.rand(r)*n)].id;deck=E.randomDeck(hero,r.seed);enemyDeck=E.randomDeck(foe,r.seed+47);}
  else{const d=p.decks.find(d=>d.id===s.deckId&&d.hero===hero);if(!d){this.ui.toast('Erstelle zuerst ein vollständiges Deck für diesen Helden.');return;}
   const err=P.validateDeck(p,hero,d.cards);if(err){this.ui.toast(err);return;}
   deck=d.cards;if(s.mode==='campaign')foe=D.missions[s.mission].hero;}
  p.game=E.create({hero,foe,deck,enemyDeck,mode:s.mode,mission:s.mode==='campaign'?s.mission:null,seed:seed||1,first:seed%2});
  delete p.matchChronicle;this.commit();this.ctx.match.reset();this.ui.go('game');}
}

const api={Setup};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
