/* Match view model: selection, legal targets, hints, committing actions, the AI's pace and the dialogs
 * around a game (starting hand, result, pause, graveyards, chronicle). Rules stay in model/engine.js.
 *
 * this.view is the selection state the canvas renderer draws every frame:
 *   {selected, inspect, targets, hint, drag, insertIndex, handIndex}
 * Geometry (where the finger is: hand, drop zone, slot) comes from view/match/input.js; the board
 * presenter ctx.board animates (busy, begin, rebound, events, effect, cancel). */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD,E=node?require('../model/engine.js'):root.CHE,P=node?require('../model/profile.js'):root.CHP;
const {Screen,Dialog}=node?require('./base.js'):root.AEVM;
const chronicle=()=>node?null:root.CHC;
const idle=()=>({selected:null,inspect:null,targets:[]});

// Ergründen: the choice has to be made – the back key and the scrim do not close it.
class Choice extends Dialog{
 pick(i){this.ctx.ui.close();this.state.run(+i);}
 close(){}
}

class Match extends Screen{
 constructor(ctx){super(ctx,{});this.view=idle();this.mull=new Set();this.aiTimer=null;this.touching=false;}
 get board(){return this.ctx.board;}
 get game(){return this.profile.game;}
 reset(){this.mull=new Set();this.view=idle();}
 enter(){this.view=idle();const s=this.game;if(!s)return;
  if(s.phase==='mulligan')this.ui.dialog('mulligan',this);else if(s.phase==='over')this.showResult();else if(!this.discover())this.scheduleAI();}
 leave(){clearTimeout(this.aiTimer);this.cancelDrag();}
 // The shell opened or closed a dialog: hold the AI while one is open.
 dialogChanged(open){if(open){this.cancelDrag();clearTimeout(this.aiTimer);}else this.scheduleAI();}

 // ---------- Starting hand ----------
 get mulligan(){const s=this.game;return {first:s.active===0,hand:s.players[0].hand.map(c=>({uid:c.uid,card:D.byId[c.id],replace:this.mull.has(c.uid)})),count:this.mull.size};}
 toggleMull(uid){if(this.mull.has(uid))this.mull.delete(uid);else this.mull.add(uid);this.notify();}
 acceptHand(){const p=this.profile;E.mulligan(this.game,[...this.mull]);this.commit();this.ui.close();this.board.events(this.game.events);
  if(!p.helpSeen){p.helpSeen=true;this.commit();this.ui.toast('Karten mit dem Finger ziehen, in der Hand sortieren oder auf dem Feld ablegen. Lange drücken zeigt Details.');}
  this.scheduleAI();}
 // Back key on the starting hand leaves the game (it stays saved).
 close(){if(this.game?.phase==='mulligan')this.ui.go('menu');else this.ui.close();}

 // ---------- Actions ----------
 action(act,origin=null){const s=this.game,p=this.profile;if(!s||s.phase!=='play'||this.board.busy())return false;
  const before=E.clone(s),result=E.apply(s,act);
  if(!result.ok){this.ui.toast(result.error);return false;}
  chronicle()?.record(p,before);
  if(before.active===0){if(act.type==='play')p.stats.played++;if(act.type==='attack')p.stats.attacks++;}
  this.view=idle();if(s.phase==='over')P.reward(p,s);this.commit();
  this.board.begin(before,s,act,origin,()=>{this.board.events(s.events);if(before.active===0)this.ui.haptic(act.type==='attack'?1:0);},
   ()=>{if(s.phase==='over')this.showResult();else if(!this.discover())this.scheduleAI();});
  return true;}
 // Your Ergründen is open (also after resuming a saved game): show the three cards.
 discover(){const c=this.game?.choice;if(!c||c.p!==0||this.ui.screen()!=='game'||this.ui.dialogOpen())return false;
  this.ui.dialog('discover',new Choice(this.ctx,{close:false,cards:c.options.map(id=>D.byId[id]),mod:c.mod||0,left:c.left,run:i=>this.action({type:'choose',index:i})}));return true;}
 scheduleAI(){clearTimeout(this.aiTimer);const s=this.game,ui=this.ui;
  if(ui.screen()!=='game'||!s||s.active!==1||s.phase!=='play'||ui.dialogOpen()||ui.hidden())return;
  this.aiTimer=setTimeout(()=>{const g=this.game;
   if(ui.hidden()||ui.screen()!=='game'||ui.dialogOpen()||!g||g.active!==1||g.phase!=='play')return;
   if(this.board.busy()||this.touching){this.scheduleAI();return;}
   const a=E.ai(g);if(a)this.action(a);},Math.round(520/(this.profile.settings.speed||1)));}
 select(a,inspect){const v=this.view=Object.assign(idle(),{selected:a,inspect,hint:''});
  const legal=E.legal(this.game,0).filter(x=>x.type===a.type&&x.uid===a.uid);v.targets=legal.filter(x=>x.target).map(x=>x.target);
  if(a.type==='play'&&!legal.length)this.ui.toast('Noch nicht spielbar: Prüfe Mana und freien Platz.');
  v.hint=a.type==='attack'?'Wähle ein Angriffsziel. Diener mit Schildwall müssen zuerst angegriffen werden.':v.targets.length?'Wähle ein rot markiertes Ziel.':'Tippe auf AUSSPIELEN oder ziehe die Karte auf Deine Spielfeldhälfte.';}

 // ---------- Touch: tap, long press, drag ----------
 tap(hit){const s=this.game,ui=this.ui;
  if(!hit){this.view=idle();return;}
  if(hit.kind==='decor'){this.board.effect({type:'buff',x:hit.x+hit.w/2,y:hit.y+hit.h/2,start:performance.now(),life:1000});ui.play(hit.id==='decor0'?'fire':hit.id==='decor1'?'draw':hit.id==='decor2'?'sword':'gong');return;}
  if(hit.id==='pause')return this.pause();
  if(hit.id==='help')return this.ctx.dialogs.help();
  if(hit.id==='chronicle')return this.chronicle();
  if(hit.kind==='grave')return this.grave(+hit.id.slice(-1));
  if(hit.kind==='deck'){ui.toast('Deck: '+s.players[+hit.id.slice(-1)].deck.length+' Karten. Die Reihenfolge bleibt verborgen.');return;}
  if(s.phase!=='play'||s.active!==0||this.board.busy())return;
  const v=this.view;
  if(v.selected&&v.targets.includes(hit.id)){this.action({...v.selected,target:hit.id});return;}
  if(hit.id==='end'){this.action({type:'end'});return;}
  if(hit.id==='confirm'&&v.selected){this.action(v.selected);return;}
  if(hit.kind==='hand'){this.select({type:'play',uid:hit.id},hit.idCard);return;}
  if(hit.id==='power0'){if(!E.canPower(s,0)){ui.toast('Fähigkeit bereits benutzt, zu wenig Mana oder kein Platz.');return;}
   const act={type:'power'};if(E.targetKind(s,0,act))this.select(act);else this.action(act);return;}
  if(hit.kind==='target'){const t=E.unit(s,hit.id);
   if(t&&t.p===0){const acts=E.legal(s,0).filter(a=>a.type==='attack'&&a.uid===hit.id);
    if(acts.length)this.select({type:'attack',uid:hit.id},t.hero?null:t.obj.id);
    else{this.view=Object.assign(idle(),{inspect:t.hero?null:t.obj.id});ui.toast(t.hero?'Dein Held kann gerade nicht angreifen.':'Dieser Diener kann in diesem Zug nicht angreifen.');}}
   else if(hit.idCard)this.view.inspect=hit.idCard;return;}
  this.view=idle();}
 longPress(hit){if(hit?.idCard)this.inspect(hit.idCard);
  else if(hit?.kind==='power'){const h=D.heroes.find(h=>h.id===this.game.players[+hit.id.slice(-1)].hero);
   this.ui.dialog('message',new Dialog(this.ctx,{title:h.power+' · '+h.cost+' Mana',close:false,text:h.powerText,buttons:[{label:'Zurück',style:'gold'}]}));}}
 // The finger moved far enough: pick up a hand card, aim an attack or aim the hero power.
 pickUp(hit,x){const s=this.game,v=this.view;
  if(hit?.kind==='hand'){this.select({type:'play',uid:hit.id},hit.idCard);this.view.inspect=null;this.view.drag={uid:hit.id,cardId:hit.idCard,at:performance.now(),angle:0};
   this.ui.play('pickup',{x,gain:.6});this.ui.haptic(0);return true;}
  if(s.active===0&&hit?.kind==='target'&&E.legal(s,0).some(a=>a.type==='attack'&&a.uid===hit.id)){this.select({type:'attack',uid:hit.id},hit.idCard);this.view.inspect=null;this.view.drag={at:performance.now()};return true;}
  if(s.active===0&&hit?.id==='power0'&&E.canPower(s,0)){this.select({type:'power'});this.view.drag={at:performance.now()};return true;}
  return false;}
 // g: where the finger is – {hitId, inHand, handSlot, inDrop, boardSlot}.
 aim(g){const s=this.game,v=this.view,d=v.drag;if(!d)return;
  if(d.cardId){const card=D.byId[d.cardId],n=s.players[0].board.length;
   v.handIndex=g.inHand?g.handSlot:null;
   v.insertIndex=s.active===0&&card.type==='minion'&&n<7&&card.cost<=s.players[0].mana&&g.inDrop?g.boardSlot:null;
   v.hint=v.handIndex!=null?'In der Hand ablegen, um Karten zu sortieren.':v.insertIndex!=null?'Loslassen, um den Diener hier auszuspielen.':v.targets.length?'Karte auf ein markiertes Ziel ziehen.':'Zurück in die Hand ziehen, um abzubrechen.';}
  d.target=g.hitId&&v.targets.includes(g.hitId)?g.hitId:null;}
 // Released: sort the hand, play on a target or on the board, use the power – or spring back.
 drop(g){const s=this.game,v=this.view,d=v.drag,selected=v.selected;let committed=false;
  if(!d||!selected)return;
  if(d.cardId&&g.inHand){const hand=s.players[0].hand,i=hand.findIndex(h=>h.uid===d.uid),to=v.handIndex;if(i>=0&&to!=null){hand.splice(to,0,hand.splice(i,1)[0]);this.commit();}}
  else if(s.active===0){
   if(g.hitId&&v.targets.includes(g.hitId))committed=this.action({...selected,target:g.hitId},d.cardId?d:null);
   else if(selected.type==='play'&&!E.targetKind(s,0,selected)&&g.inDrop){const card=D.byId[d.cardId];committed=this.action({...selected,...(card.type==='minion'?{position:v.insertIndex??s.players[0].board.length}:{})},d);}
   else if(selected.type==='power'&&!E.targetKind(s,0,selected)&&g.y<660)committed=this.action(selected);}
  if(!committed&&d.cardId)this.board.rebound(d,s);
  if(!committed)this.view=idle();
  this.endDrag();}
 endDrag(){delete this.view.drag;delete this.view.insertIndex;delete this.view.handIndex;}
 cancelDrag(){if(this.view.drag?.cardId&&this.game)this.board.rebound(this.view.drag,this.game);this.endDrag();}

 // ---------- Dialogs around the game ----------
 inspect(id){const c=D.byId[id];if(c)this.ui.dialog('zoom',new Dialog(this.ctx,{card:c,era:c.hero==='neutral'?'Neutral':D.heroes.find(h=>h.id===c.hero).era}));}
 showResult(){const s=this.game;if(this.ui.screen()!=='game'||s?.phase!=='over')return;
  if(!s.rewarded){P.reward(this.profile,s);this.commit();}
  this.ui.play(s.winner===0?'victory':'defeat');
  const to=s.mode==='campaign'?'campaign':'menu';
  this.ui.dialog('result',new Dialog(this.ctx,{close:false,winner:s.winner,mode:s.mode,reward:s.reward||{gold:0,packs:0},
   buttons:[{label:to==='campaign'?'Zur Kampagne':'Zum Hauptmenü',style:'gold',keep:true,run:()=>this.ui.go(to)}]}));}
 pause(){this.ui.dialog('message',new Dialog(this.ctx,{title:'Die Partie ruht',close:false,text:'Dein Spielstand ist gespeichert.',wrap:true,
  buttons:[{label:'Fortsetzen',style:'gold'},{label:'Einstellungen',run:()=>this.ctx.dialogs.settings()},{label:'Zum Hauptmenü',keep:true,run:()=>this.ui.go('menu')},{label:'Aufgeben',style:'danger',run:()=>this.confirmSurrender()}]}));}
 grave(p){const a=this.game.players[p];this.ui.dialog('grave',Object.assign(new Dialog(this.ctx,{mine:p===0,cards:a.grave.map(id=>D.byId[id])}),{inspect:id=>this.inspect(id)}));}
 chronicle(){this.ui.dialog('chronicle',new Dialog(this.ctx,{entries:chronicle()?.entries(this.game,this.profile.matchChronicle)||[]}));}
 confirmSurrender(){this.ui.dialog('message',new Dialog(this.ctx,{title:'Wirklich aufgeben?',close:false,text:'Die Partie endet als Niederlage. Für das Aufgeben erhältst Du kein Gold.',
  buttons:[{label:'Weiterspielen'},{label:'Aufgeben',style:'danger',keep:true,run:()=>this.surrender()}]}));}
 surrender(){const s=this.game;s.phase='over';s.winner=1;P.reward(this.profile,s,true);this.commit();this.showResult();}

 // ---------- App lifecycle and back key ----------
 pauseApp(){this.cancelDrag();this.board.cancel();clearTimeout(this.aiTimer);}
 resumeApp(){if(this.ui.screen()==='game'&&this.game?.phase==='over')this.showResult();else if(!this.discover())this.scheduleAI();}
 back(){this.pause();}
}

const api={Match,Choice};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
