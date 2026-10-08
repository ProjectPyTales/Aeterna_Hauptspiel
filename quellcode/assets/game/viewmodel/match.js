/* Match view model: selection, legal targets, hints, committing actions, the AI's pace and the dialogs
 * around a game (starting hand, result, pause, graveyards, chronicle). Rules stay in model/engine.js.
 *
 * this.view is the selection state the canvas renderer draws every frame:
 *   {selected, inspect, targets, hint, drag, insertIndex, handIndex, press}
 * and hand(state) says per hand card what it costs, whether it is playable and whether a condition is met (AP 3.2).
 * Geometry (where the finger is: hand, drop zone, slot) comes from view/match/input.js; the board
 * presenter ctx.board animates (busy, begin, rebound, events, effect, cancel, present). Since 1.20.0 (AP 3.8) a match
 * opens with the heroes, the chronicler and the coin of the Feldzug-Initiative (opening), the replaced starting orders roll
 * back into the deck (rolling) and a match closes with the broken relief and the banner before the result with its
 * reward bars (finale, rewardBars). */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD,E=node?require('../model/engine.js'):root.CHE,P=node?require('../model/profile.js'):root.CHP;
const {Screen,Dialog}=node?require('./base.js'):root.AEVM;
const chronicle=()=>node?require('./chronicle.js'):root.CHC;
const idle=()=>({selected:null,inspect:null,targets:[]});
// Chronicle strip (AP 1.8 Teil 2): which log lines it shows and how they are marked.
const STRIP=[[/ spielt /,'play'],[/ nutzt /,'power'],[/ (wurde besiegt|stürzt ein)\.$/,'death'],[/ verbrannt \(Hand voll\)\.$/,'burn'],[/ übernimmt /,'steal'],[/ erneut\.$/,'echo'],[/: Erschöpfung (\d+)\.$/,'fatigue']];

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
  if(s.phase==='mulligan'){if(this.ui.busy())this.waiting=true;else this.open();}else if(s.phase==='over')this.showResult();else if(!this.discover())this.scheduleAI();}
 // The board presents (ctx.board.present: opening, mulligan, deal, finale) and calls done when it is over – at once
 // under reduced motion, and a board without the presenter (tests) goes straight on.
 present(kind,info,done=()=>{}){const b=this.board;if(b.present)b.present(kind,info,done);else done();}
 // The shell's transition (slabs, ring) is over: an opening that waited for it starts now, else the AI goes on.
 arrived(){if(this.waiting){this.waiting=false;if(this.game?.phase==='mulligan')this.open();}else this.scheduleAI();}
 // AP 3.8: the heroes face each other, the chronicler announces the battle, the coin decides who begins – once per game;
 // then the starting hand.
 open(){const s=this.game;if(this.opened===s){this.ui.dialog('mulligan',this);return;}this.opened=s;
  this.present('opening',this.opening(s),()=>{if(this.ui.screen()==='game'&&this.game===s&&s.phase==='mulligan'&&!this.ui.dialogOpen())this.ui.dialog('mulligan',this);});}
 // Names, epochs and the chronicler's line; first is the side the coin chose (the engine decided it at creation).
 opening(s=this.game){const names=[0,1].map(p=>p===1&&s.mission!=null?D.missions[s.mission].boss:D.heroById[s.players[p].hero].name),m=s.mission!=null?D.missions[s.mission]:null;
  const eras=[0,1].map(p=>p===1&&m?'Mission '+(s.mission+1):D.heroById[s.players[p].hero].era);
  const line=m?'Mission '+(s.mission+1)+' · '+m.title+': '+names[0]+' stellt sich '+names[1]+'.':names[0]+' trifft auf '+names[1]+' – die Chronik schlägt eine neue Seite auf.';
  return {names,eras,line,first:s.active,firstName:names[s.active]};}
 leave(){clearTimeout(this.aiTimer);this.cancelDrag();this.waiting=false;this.present('stop');}
 // The shell opened or closed a dialog: hold the AI while one is open.
 dialogChanged(open){if(open){this.cancelDrag();this.release();clearTimeout(this.aiTimer);}else this.scheduleAI();}

 // ---------- Starting hand ----------
 // The starting orders as scrolls (AP 3.8): rolling – the replaced ones roll up and back into the deck.
 get mulligan(){const s=this.game;return {first:s.active===0,hand:s.players[0].hand.map(c=>({uid:c.uid,card:D.byId[c.id],replace:this.mull.has(c.uid)})),count:this.mull.size,rolling:!!this.rolling,deck:s.players[0].deck.length};}
 toggleMull(uid){if(this.rolling)return;if(this.mull.has(uid))this.mull.delete(uid);else this.mull.add(uid);this.notify();}
 acceptHand(){if(this.rolling)return;const s=this.game,go=()=>{this.rolling=false;this.keepHand(s);};
  if(this.mull.size){this.rolling=true;this.ui.play('parchment',{gain:.7});this.notify();this.present('mulligan',{n:this.mull.size},go);}else go();}
 keepHand(s){const p=this.profile;if(this.game!==s||s.phase!=='mulligan')return;const before=E.clone(s);E.mulligan(s,[...this.mull]);this.commit();this.ui.close();
  this.present('deal',{before,after:s});this.board.events(s.events);
  if(!p.helpSeen){p.helpSeen=true;this.commit();this.ui.toast('Karten mit dem Finger ziehen, in der Hand sortieren oder auf dem Feld ablegen. Lange drücken zeigt Details.');}
  this.scheduleAI();}
 // Back key on the starting hand leaves the game (it stays saved).
 close(){if(this.game?.phase==='mulligan')this.ui.go('menu');else this.ui.close();}

 // ---------- Actions ----------
 action(act,origin=null){const s=this.game,p=this.profile;if(!s||s.phase!=='play'||this.board.busy())return false;
  const before=E.clone(s),result=E.apply(s,act);
  if(!result.ok){this.ui.toast(result.error);return false;}
  chronicle()?.record(p,before);
  if(before.active===0){const n=this.tallied(s);if(act.type==='play'){p.stats.played++;n.played++;}if(act.type==='attack'){p.stats.attacks++;n.attacks++;}}
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

 // ---------- Touch: press, tap, long press, drag ----------
 // Finger down on a hand card (AP 3.2): it grows at once and lifts with the rustle of heavy parchment (view.press).
 press(hit){if(hit?.kind!=='hand'){this.release();return;}this.view.press=hit.id;this.ui.play('parchment',{gain:.8});this.ui.haptic(0);}
 release(){if(this.view.press)this.view.press=null;}
 // Per hand card: {cost, can (green aura), boost (golden-yellow aura)}. A condition is met when a Formation counts
 // enough own minions (ifMinions, the card itself included) or a Kombo makes the card cheaper than printed.
 hand(s=this.game){if(!s)return {};const a=s.players[0],open=s.active===0&&s.phase==='play'&&!s.choice,out={},army=a.board.filter(u=>!u.building).length;
  for(const h of a.hand){const card=D.byId[h.id],cost=E.cost(s,0,h),can=open&&cost<=a.mana&&(card.type==='spell'||a.board.length<7);
   const formation=[...(card.battle||[]),...(card.effects||[])].some(e=>e.type==='ifMinions'&&army+(card.type==='minion'&&!card.building?1:0)>=e.n);
   out[h.uid]={cost,can,boost:can&&(formation||cost<card.cost)};}
  return out;}
 tap(hit){const s=this.game,ui=this.ui;
  if(!hit){this.view=idle();return;}
  if(hit.kind==='decor'){this.board.effect({type:'buff',x:hit.x+hit.w/2,y:hit.y+hit.h/2,start:performance.now(),life:1000});ui.play(hit.id==='decor0'?'fire':hit.id==='decor1'?'draw':hit.id==='decor2'?'sword':'gong');return;}
  if(hit.id==='pause')return this.pause();
  if(hit.id==='help')return this.ctx.dialogs.help();
  if(hit.id==='chronicle')return this.chronicle();
  if(hit.kind==='log'){if(hit.idCard)this.inspect(hit.idCard);else this.chronicle();return;}
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
  else if(hit?.kind==='target'&&/^h[01]$/.test(hit.id))this.ctx.dialogs.lore(this.game.players[+hit.id[1]].hero);
  else if(hit?.kind==='power'){const h=D.heroes.find(h=>h.id===this.game.players[+hit.id.slice(-1)].hero);
   this.ui.dialog('message',new Dialog(this.ctx,{title:h.power+' · '+h.cost+' Mana',close:false,text:h.powerText,buttons:[{label:'Zurück',style:'gold'}]}));}}
 // The finger moved far enough: pick up a hand card, aim an attack or aim the hero power.
 pickUp(hit,x){const s=this.game,v=this.view;
  if(hit?.kind==='hand'){this.select({type:'play',uid:hit.id},hit.idCard);this.view.inspect=null;this.view.drag={uid:hit.id,cardId:hit.idCard,at:0,angle:0};
   this.ui.play('pickup',{x,gain:.6});return true;}
  if(s.active===0&&hit?.kind==='target'&&E.legal(s,0).some(a=>a.type==='attack'&&a.uid===hit.id)){this.select({type:'attack',uid:hit.id},hit.idCard);this.view.inspect=null;this.view.drag={at:0};return true;}
  if(s.active===0&&hit?.id==='power0'&&E.canPower(s,0)){this.select({type:'power'});this.view.drag={at:0};return true;}
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
 inspect(id){const c=D.byId[id];if(c)this.ui.dialog('zoom',new Dialog(this.ctx,{card:c,era:D.eraOf(c)}));}
 // What this game added to the stats while this view model ran (for the reward bars).
 tallied(s=this.game){if(this.tallyFor!==s){this.tallyFor=s;this.tally={played:0,attacks:0};}return this.tally;}
 // AP 3.8: the close first – the loser's relief breaks, the banner unrolls with war horns –, then the result.
 showResult(){const s=this.game;if(this.ui.screen()!=='game'||s?.phase!=='over')return;
  if(!s.rewarded){P.reward(this.profile,s);this.commit();}
  if(this.closing===s){this.result();return;}this.closing=s;
  this.present('finale',{winner:s.winner},()=>this.result(true));}
 // After the close the war horns have sounded; without it (reduced motion, a resumed game) the fanfare plays here.
 result(staged=false){const s=this.game;if(this.ui.screen()!=='game'||s?.phase!=='over'||this.ui.dialogOpen())return;
  if(!staged)this.ui.play(s.winner===0?'victory':'defeat');
  const to=s.mode==='campaign'?'campaign':'menu';
  this.ui.dialog('result',new Dialog(this.ctx,{close:false,winner:s.winner,mode:s.mode,reward:s.reward||{gold:0,packs:0},bars:this.rewardBars(s),
   buttons:[{label:to==='campaign'?'Zur Kampagne':'Zum Hauptmenü',style:'gold',keep:true,run:()=>this.ui.go(to)}]}));}
 // Rewards with progress bars (AP 3.8): the gold won, every open quest from its value before this game to now (a reached
 // goal can be claimed in the menu), and in the campaign the missions completed. {key, label, from, to, goal, note}
 rewardBars(s=this.game){const p=this.profile,st=p.stats,n=this.tallyFor===s?this.tally:{played:0,attacks:0},win=s.winner===0,r=s.reward||{gold:0,packs:0};
  const gained={wins:win?1:0,played:n.played,attacks:n.attacks},bars=[{key:'gold',label:'Gold',from:0,to:r.gold,goal:Math.max(40,r.gold),note:'◉ '+p.gold}];
  for(const q of P.quests){if(p.claimed.includes(q.id))continue;const to=Math.min(q.goal,st[q.stat]||0),from=Math.min(to,Math.max(0,(st[q.stat]||0)-gained[q.stat]));
   bars.push({key:q.id,label:q.text,from,to,goal:q.goal,note:to>=q.goal?'Belohnung bereit: '+q.gold+' Gold':q.gold+' Gold'});}
  if(s.mode==='campaign'){const done=p.campaign.length;bars.push({key:'campaign',label:'Kampagne',from:done-(r.first?1:0),to:done,goal:D.missions.length,note:r.first?'Mission erstmals vollendet':''});}
  return bars;}
 pause(){this.ui.dialog('message',new Dialog(this.ctx,{title:'Die Partie ruht',close:false,text:'Dein Spielstand ist gespeichert.',wrap:true,
  buttons:[{label:'Fortsetzen',style:'gold'},{label:'Einstellungen',run:()=>this.ctx.dialogs.settings()},{label:'Zum Hauptmenü',keep:true,run:()=>this.ui.go('menu')},{label:'Aufgeben',style:'danger',run:()=>this.confirmSurrender()}]}));}
 grave(p){const a=this.game.players[p];this.ui.dialog('grave',Object.assign(new Dialog(this.ctx,{mine:p===0,cards:a.grave.map(id=>D.byId[id])}),{inspect:id=>this.inspect(id)}));}
 // The newest played cards, spells, powers and losses for the strip at the left edge, newest first: {key, kind, id,
 // type, p (side, null if unknown), turn, n (Erschöpfung)}. s is the state the board shows (before or after an action).
 // Cached per log length – the full chronicle is only rebuilt when a line is added.
 strip(s=this.game,rows=6){if(!s)return [];const saved=this.profile.matchChronicle||[],key=[s.log.length,s.log[s.log.length-1],saved.length].join('|');
  if(this.stripCache?.key===key)return this.stripCache.items;
  const C=chronicle(),all=C?C.entries(s,saved):[],names=[0,1].map(p=>p===1&&s.mission!=null?D.missions[s.mission].boss:D.heroById[s.players[p].hero].name);
  let turn=1;const items=[];
  all.forEach((e,i)=>{const t=/^Zug (\d+): /.exec(e.text);if(t){turn=+t[1];return;}const hit=STRIP.find(([re])=>re.test(e.text));if(!hit)return;
   let p=e.p??null;if(p==null&&names[0]!==names[1])p=e.text.startsWith(names[0])?0:e.text.startsWith(names[1])?1:null;
   items.push({key:i+':'+e.text,kind:e.kind,id:e.id,type:hit[1],p,turn,...(hit[1]==='fatigue'?{n:+hit[0].exec(e.text)[1]}:{})});});
  this.stripCache={key,items:items.slice(-rows).reverse()};return this.stripCache.items;}
 chronicle(){this.ui.dialog('chronicle',new Dialog(this.ctx,{entries:chronicle()?.entries(this.game,this.profile.matchChronicle)||[]}));}
 confirmSurrender(){this.ui.dialog('message',new Dialog(this.ctx,{title:'Wirklich aufgeben?',close:false,text:'Die Partie endet als Niederlage. Für das Aufgeben erhältst Du kein Gold.',
  buttons:[{label:'Weiterspielen'},{label:'Aufgeben',style:'danger',keep:true,run:()=>this.surrender()}]}));}
 surrender(){const s=this.game;s.phase='over';s.winner=1;P.reward(this.profile,s,true);this.commit();this.ui.close();this.showResult();}

 // ---------- App lifecycle and back key ----------
 pauseApp(){this.cancelDrag();this.board.cancel();clearTimeout(this.aiTimer);}
 resumeApp(){if(this.ui.screen()==='game'&&this.game?.phase==='over')this.showResult();else if(!this.discover())this.scheduleAI();}
 back(){this.pause();}
}

const api={Match,Choice};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
