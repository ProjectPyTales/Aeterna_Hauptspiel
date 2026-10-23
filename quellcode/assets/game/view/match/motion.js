/* Presentation clock: rules commit atomically, visuals reveal the result on impact. Since 1.18.0 (AP 3.1–3.5) every
 * action is a timeline of the animation toolkit (anim.js) on the match clock CHT.clock – the tempo setting speeds it
 * up, a hit stop holds it – and the weight of a card decides how hard it lands. */
(function(){'use strict';
const L=CHL,T=CHT,{clamp,mix,ease,timeline}=T;
const M=window.CHM={transition:null,returns:[],draws:[],burns:[],drains:[],serial:0};
const now=()=>T.clock.now();
// AP 3.3: a card is lifted, hovers and lands with a dull thud – heavy ones hover longer. A spell is cast instead.
// AP 3.5: an attacker winds up, charges, presses into its target and springs back.
const PLAY=heavy=>timeline([{name:'lift',d:150,ease:'outCubic'},{name:'hover',d:heavy?270:140,ease:'inOutCubic'},{name:'slam',d:heavy?130:115,ease:'inCubic'},{name:'settle',d:heavy?380:300}]);
const SPELL=timeline([{name:'lift',d:150,ease:'outCubic'},{name:'hover',d:110,ease:'inOutCubic'},{name:'cast',d:130,ease:'inQuad'},{name:'after',d:260}]);
const ATTACK=timeline([{name:'windup',d:130,ease:'outCubic'},{name:'charge',d:105,ease:'inQuad'},{name:'contact',d:60},{name:'recoil',d:300,ease:'outBack'}]);
M.lines={PLAY,SPELL,ATTACK};
// Weight of a card 0…1: cost, and legendaries weigh more; from 0.7 a card is heavy (longer hover, cracks, camera jolt).
M.weight=card=>!card?0:card.rarity==='legendary'&&card.cost>=5?1:clamp(.12+card.cost*.07+(card.rarity==='legendary'?.15:0),0,.85);
M.heavy=card=>M.weight(card)>=.7;
// Where the rival's sealed orders lie (AP 1.8 Teil 2) – his cards start and end their flights there.
M.orderPosition=i=>({x:490+i*34,y:12});
M.deckPosition=p=>({x:1448,y:p===0?630:198});
M.handPose=(s,uid)=>{const hand=s.players[0].hand,i=hand.findIndex(h=>h.uid===uid);return L.handPose(i,hand.length);};
M.position=(s,uid)=>{if(uid==='h0')return{x:L.center,y:L.heroY[0]};if(uid==='h1')return{x:L.center,y:L.heroY[1]};if(uid==='power0')return L.powerPosition(0);if(uid==='power1')return L.powerPosition(1);for(let p=0;p<2;p++){const arr=s.players[p].board,i=arr.findIndex(u=>u.uid===uid);if(i>=0)return{x:L.center+(i-(arr.length-1)/2)*L.spacing,y:L.rows[p]};}return M.handPose(s,uid);};
M.begin=(before,after,action,origin,impact,done)=>{
 M.cancel(false);const at=now(),p=before.active,type=action.type,h=type==='play'?before.players[p].hand.find(h=>h.uid===action.uid):null;
 const card=h?CHD.byId[h.id]:null,weight=M.weight(card),line=type==='attack'?ATTACK:card?(card.type==='minion'?PLAY(weight>=.7):SPELL):null;
 const hitAt=line?line.start(type==='attack'?'contact':card.type==='minion'?'settle':'after'):type==='power'?260:160;
 const duration=line?line.duration:type==='power'?570:660;
 // A Hinterhalt (AP 5.6) flies to its roll beside the hero – the rival's face down.
 const to=card?.ambush?L.ambush(p,Math.min(2,(before.players[p].ambush||[]).length)):card?.type==='minion'?M.position(after,after.events.find(e=>e.type==='summon'&&e.id===card.id)?.target):action.target?M.position(before,action.target):type==='power'?M.position(before,(after.events.find(e=>e.type==='damage'||e.type==='heal'||e.type==='summon')||after.events.find(e=>e.type==='power'))?.target||'h'+p):{x:800,y:350};
 const from=origin||(card&&p===1?M.orderPosition(Math.max(0,before.players[1].hand.findIndex(x=>x.uid===action.uid))):M.position(before,action.uid||'power'+p));
 M.transition={id:++M.serial,before,after,action,card,p,weight,line,from,to,origin,at,hitAt,duration,hit:false,impact,done};
 if(type==='attack')CHA.play('swing',{x:M.position(before,action.uid).x,gain:.62});
 if(type==='play')CHA.play('parchment',{x:from.x,gain:.55+.35*weight});
 if(type==='power')CHA.play('channel',{x:939,gain:.4});
 return duration;
};
M.busy=()=>!!M.transition||window.CHF.busy();
M.remaining=()=>M.transition?Math.max(0,M.transition.duration-(now()-M.transition.at)):0;
M.cancel=(clearReturns=true)=>{if(M.transition&&!M.transition.hit){M.transition.hit=true;/* State is already saved; cancel visual effects when leaving. */}M.transition=null;M.draws=[];M.burns=[];M.drains=[];if(clearReturns)M.returns=[];};
// The moment of impact: hit stop and shake by weight, dust and cracks where a card lands (AP 3.3), and what the action
// set going – cards drawn face down (AP 3.4), cards burnt in a full hand, life drained by the hourglass.
function impact(x,t){const {action,card,weight,after,before}=x;
 if(card?.type==='minion'){T.clock.stop(40+40*weight);T.shake.add(.18+.5*weight,weight>=.7?.16:0);
  CHA.play('thud',{x:x.to.x,gain:.6+.4*weight});if(weight>=.7)CHA.play('slam',{x:x.to.x,gain:.7});
  CHR.fx.push({type:'dust',x:x.to.x,y:x.to.y+58,weight,start:t,life:900});if(weight>=.3)CHR.fx.push({type:'cracks',x:x.to.x,y:x.to.y+40,weight,seed:x.id,start:t,life:1700});}
 if(action.type==='attack'){const n=Math.max(0,...after.events.filter(e=>e.type==='damage'&&e.target===action.target).map(e=>e.n));
  T.clock.stop(50+Math.min(30,n*6));T.shake.add(.3+Math.min(.35,n*.05));}
 // AP 3.6: a spell bursts in the colours of its element, a hero power in its own effect, where they land.
 if(card?.ambush)CHA.play('seal',{x:x.to.x,gain:.45});else if(card?.type==='spell'||action.type==='power')window.CHF.cast(x,t);
 for(const p of [0,1]){const known=new Set(before.players[p].hand.map(h=>h.uid));
  after.players[p].hand.forEach((h,slot)=>{if(!known.has(h.uid))M.draws.push({uid:h.uid,id:h.id,p,slot,at:t+M.draws.filter(f=>f.p===p&&f.at>=t).length*110,duration:560});});
  if(after.players[p].fatigue>(before.players[p].fatigue||0))M.drains.push({p,n:after.players[p].fatigue,at:t,duration:1150});}
 after.events.forEach((e,i)=>{if(e.type!=='burn')return;const bounced=after.events.slice(0,i).find(b=>b.type==='bounce'&&b.id===e.id);
  M.burns.push({p:e.p,id:e.id,from:bounced&&CHR.positions[bounced.target]||M.deckPosition(e.p),at:t+M.burns.length*160,duration:1150});});}
M.frame=(actual,t)=>{
 const live=f=>t-f.at<f.duration;M.returns=M.returns.filter(live);M.draws=M.draws.filter(live);M.burns=M.burns.filter(live);M.drains=M.drains.filter(live);
 const x=M.transition;if(!x)return actual;
 if(!x.hit&&t-x.at>=x.hitAt){x.hit=true;impact(x,t);x.impact?.();}
 if(t-x.at>=x.duration){M.transition=null;x.done?.();return actual;}
 return x.hit?x.after:x.before;
};
// Pose of a unit: {x, y, scale, angle, sx, sy} – sx/sy squash a plaque that has just landed.
M.pose=(uid,base,t)=>{
 const x=M.transition;if(!x){const phase=t/680+String(uid).split('').reduce((n,c)=>n+c.charCodeAt(0),0);return {...base,y:base.y+Math.sin(phase)*.65,scale:1+Math.sin(phase)*.002,angle:0};}const e=t-x.at;
 if(x.action.type==='attack'&&uid===x.action.uid){const from=M.position(x.before,uid),to=M.position(x.before,x.action.target),dx=to.x-from.x,dy=to.y-from.y,ph=x.line.at(e),side=Math.sign(dx)||1;let q,scale,angle=0;
  if(ph.name==='windup'){q=-.09*ph.q;scale=1+.1*ph.q;angle=-.06*side*ph.q;}
  else if(ph.name==='charge'){q=mix(-.09,.82,ph.q);scale=1.1-.04*ph.q;angle=mix(-.06,.04,ph.q)*side;}
  else if(ph.name==='contact'){q=.82+.025*Math.sin(ph.raw*Math.PI);scale=1.06;angle=.04*side;}
  else{q=.82*(1-ph.q);scale=1+.06*(1-ph.raw);angle=.04*side*(1-ph.raw);}
  return{x:from.x+dx*q,y:from.y+dy*q,scale,angle};}
 // AP 3.5: a unit that takes damage is knocked back and wobbles.
 if(x.hit&&x.after.events.some(ev=>ev.type==='damage'&&ev.target===uid)){const age=e-x.hitAt;if(age<340){const k=1-age/340,src=x.action.type==='attack'&&x.action.target===uid?M.position(x.before,x.action.uid):null,
  dir=src?Math.atan2(base.y-src.y,base.x-src.x):Math.PI/2,push=10*k*k;
  return{x:base.x+Math.cos(dir)*push+Math.sin(age*.09)*6*k,y:base.y+Math.sin(dir)*push,scale:1,angle:Math.sin(age*.07)*.07*k};}}
 // AP 3.3: the plaque lands squashed and springs back.
 const summon=x.after.events.find(ev=>ev.type==='summon'&&ev.target===uid);
 if(x.hit&&summon){const q=clamp((e-x.hitAt)/360),k=Math.exp(-4.5*q)*Math.cos(q*10),pop=summon.id===x.card?.id?1:0;
  return{...base,scale:pop?1:.8+.2*ease.outBack(q),sx:1+.17*k*pop,sy:1-.15*k*pop,angle:0};}
 return {...base,scale:1,angle:0};
};
M.insertion=()=>{const x=M.transition;return x&&!x.hit&&x.card?.type==='minion'&&x.p===0?(x.action.position??x.before.players[0].board.length):null;};
M.hiddenHand=uid=>M.returns.some(f=>f.uid===uid)||M.draws.some(f=>f.uid===uid)||(M.transition&&!M.transition.hit&&M.transition.action.uid===uid&&M.transition.card);
// Sealed orders still in flight from the rival's deck are not yet in his row.
M.pendingOrders=()=>M.draws.filter(f=>f.p===1).length;
// AP 3.8: after the starting hand the new cards fly from the pile into the hand; the Gunst der Stunde of the second
// player comes face up from the middle of the table, where the coin of the Feldzug-Initiative fell.
M.deal=(before,after)=>{const t=now();for(const p of [0,1]){const known=new Set(before.players[p].hand.map(h=>h.uid));let n=0;
 after.players[p].hand.forEach((h,slot)=>{if(known.has(h.uid))return;const coin=h.id==='coin';M.draws.push({uid:h.uid,id:h.id,p,slot,at:t+(coin?260:n++*110),duration:coin?700:560,...(coin&&p===0?{from:{x:800,y:400}}:{})});});}};
M.rebound=(drag,s)=>{M.returns=M.returns.filter(f=>f.uid!==drag.uid);M.returns.push({uid:drag.uid,id:drag.cardId,from:{x:drag.x,y:drag.y,w:drag.w||L.dragWidth,angle:drag.angle||0},at:now(),duration:290});CHA.play('return',{x:drag.x,gain:.45});};
// A card in the air: its cast shadow (pre-rendered sprite, AP 2.4) falls further away the higher it is (lift 0…1). It
// shows its back (o.back, the equipped card back) or face; o.sx < 1 turns it about its upright axis, o.gold gilds it.
M.floatCard=(c,id,x,y,w,angle=0,alpha=1,o={})=>{const h=w*1.41,lift=o.lift??.5;c.save();c.globalAlpha=alpha;c.translate(x,y);c.rotate(angle);
 c.save();c.globalAlpha=alpha*(1-lift*.45);c.translate(4+lift*16-w/2,8+lift*36-h/2);c.scale(w/200,h/282);CHR.blit(c,CHR.cardShadow());c.restore();
 if(o.sx!=null)c.scale(Math.max(.02,o.sx),1);
 if(o.back)CHR.cardBack(c,-w/2,-h/2,w,h);else CHR.fastCard(c,CHD.byId[id],-w/2,-h/2,w,h,{gold:o.gold});c.restore();};
// AP 3.3: the last part of the fall turns the rectangular order into the oval troop seal – the face is cut to an ever
// rounder shape around its picture, a bronze rim grows, and on impact the plaque takes over.
function morph(c,id,x,y,q,gold){const card=CHD.byId[id],w=mix(200,128,q),h=w*1.41,pw=mix(w,106,q),ph=mix(h,141,q),r=mix(.07*w,pw/2,Math.min(1,q*1.3)),cy=-(h*.17)*q;
 c.save();c.translate(x,y);c.save();c.translate(4+12*(1-q)-pw/2,8+28*(1-q)-ph/2);c.scale(pw/200,ph/282);c.globalAlpha=.8;CHR.blit(c,CHR.cardShadow());c.restore();
 c.beginPath();c.roundRect(-pw/2,-ph/2,pw,ph,r);c.save();c.clip();CHR.fastCard(c,card,-w/2,-h/2-cy,w,h,{gold});c.restore();
 if(q>0){c.beginPath();c.roundRect(-pw/2,-ph/2,pw,ph,r);c.lineWidth=5*q;c.strokeStyle='#b08a4a';c.stroke();}c.restore();}
M.overlay=(c,s,t,gold)=>{
 const x=M.transition;
 if(x?.card&&!x.hit){const e=t-x.at,ph=x.line.at(e),from=x.from,to=x.to,mine=x.p===0,minion=x.card.type==='minion',heavy=x.weight>=.7,g=mine&&(gold||CHR.gilded(x.card.id)),hidden=!mine&&!!x.card.ambush;
  const startW=x.origin?.w||(mine?L.handWidth:46),liftW=heavy?226:210;
  const lifted={x:mix(from.x,to.x,.25),y:mine?Math.min(from.y-110,to.y+60):Math.max(from.y+150,to.y-260)};
  const above={x:to.x,y:minion?to.y-(heavy?150:120):to.y-110};
  if(ph.name==='lift'){const q=ph.q,turn=mine?null:clamp(ph.raw*1.4);M.floatCard(c,x.card.id,mix(from.x,lifted.x,q),mix(from.y,lifted.y,q),mix(startW,liftW,q),mix(x.origin?.angle||-.06,0,q),1,
   {lift:q,back:hidden||turn!=null&&turn<.5,sx:turn==null||hidden?null:Math.abs(Math.cos(turn*Math.PI)),gold:g});}
  else if(ph.name==='hover'){const q=ph.q,bob=Math.sin(ph.raw*Math.PI*(heavy?2:1))*(heavy?7:4);M.floatCard(c,x.card.id,mix(lifted.x,above.x,q),mix(lifted.y,above.y,q)-bob,liftW,Math.sin(ph.raw*Math.PI)*.03,1,{lift:1,gold:g,back:hidden});}
  else if(minion)morph(c,x.card.id,above.x,mix(above.y,to.y,ph.q),ph.q,g);
  else M.floatCard(c,x.card.id,mix(above.x,to.x,ph.q),mix(above.y,to.y,ph.q),mix(liftW,70,ph.q),0,1-ph.q*.85,{lift:1-ph.q,gold:g,back:hidden});}
 // The ether orb of a power or a spell on its way to the target.
 const orb=x&&!x.hit&&(x.action.type==='power'||x.card?.type==='spell'&&!x.card.ambush);
 // AP 3.6: its colours come from the element of the spell or the power of the hero, the path from the power (fx.js).
 if(orb&&(x.action.type==='power'||x.line.at(t-x.at).name==='cast')){const q=x.card?x.line.at(t-x.at).q:clamp((t-x.at)/x.hitAt),from=x.card?{x:x.to.x,y:x.to.y-110}:M.position(x.before,'power'+x.p);window.CHF.orb(c,x,q,from,x.to);}
 for(const f of M.returns){const q=ease.outCubic(clamp((t-f.at)/f.duration)),to=M.handPose(s,f.uid);M.floatCard(c,f.id,mix(f.from.x,to.x,q),mix(f.from.y,to.y,q),mix(f.from.w,L.handWidth,q),mix(f.from.angle,to.angle,q),1,{lift:1-q,gold:gold||CHR.gilded(f.id)});}
 // AP 3.4: a drawn card leaves the parchment pile face down, turns over at the top of its arc and settles into the hand;
 // the rival's flies into his row of sealed orders and stays hidden.
 for(const f of M.draws){const e=t-f.at;if(e<0)continue;const q=clamp(e/f.duration),deck=M.deckPosition(f.p);
  if(f.p===0){const to=M.handPose(s,f.uid),peak=f.from?{x:mix(f.from.x,to.x,.4),y:f.from.y-60}:{x:1262,y:452},a=ease.outCubic(clamp(q/.6)),b=ease.inOutCubic(clamp((q-.6)/.4)),turn=f.from?1:clamp((q-.24)/.36);
   const start=f.from||deck,px=q<.6?mix(start.x,peak.x,a):mix(peak.x,to.x,b),py=q<.6?mix(start.y,peak.y,a)-Math.sin(a*Math.PI)*30:mix(peak.y,to.y,b);
   M.floatCard(c,f.id,px,py,q<.6?mix(60,196,a):mix(196,L.handWidth,b),q<.6?mix(.35,-.04,a):mix(-.04,to.angle,b),1,{back:turn<.5,sx:Math.abs(Math.cos(turn*Math.PI)),lift:q<.6?a:1-b,gold});}
  else{const to=M.orderPosition(f.slot),k=ease.inOutCubic(q);M.floatCard(c,f.id,mix(deck.x,to.x+4,k),mix(deck.y,to.y+40,k)-Math.sin(q*Math.PI)*70,mix(60,48,k),mix(-.3,0,k),1-ease.inQuad(clamp((q-.8)/.2))*.6,{back:true,lift:Math.sin(q*Math.PI)});}}
 // A card that does not fit into a full hand rises from the pile, shows itself and burns to ash from below.
 for(const f of M.burns){const e=t-f.at;if(e<0)continue;const q=clamp(e/f.duration),spot={x:1240,y:f.p===0?470:250},a=ease.outCubic(clamp(q/.3)),burn=clamp((q-.32)/.68);
  if(burn>0&&!f.lit){f.lit=true;CHA.play('fire',{x:spot.x,gain:.8});}
  CHR.burning(c,f.id,mix(f.from.x,spot.x,a),mix(f.from.y,spot.y,a),mix(60,170,a),burn,t,f.at);}
 // The hourglass of Erschöpfung drains life: drops of it flow from the hero into the glass (the damage shows at the hero).
 for(const f of M.drains){const e=t-f.at;CHR.drain(c,f.p,f.n,clamp(e/f.duration),t);}
};
})();
