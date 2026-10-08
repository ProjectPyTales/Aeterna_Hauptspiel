/* Presentation clock: rules commit atomically, visuals reveal the result on impact. */
(function(){'use strict';
const L=CHL;const M=window.CHM={transition:null,returns:[],draws:[],lastImpact:0,impactWeight:0,serial:0};
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=t=>1-Math.pow(1-clamp(t),3);
const mix=(a,b,t)=>a+(b-a)*t;
M.handPose=(s,uid)=>{const hand=s.players[0].hand,i=hand.findIndex(h=>h.uid===uid);return L.handPose(i,hand.length);};
M.position=(s,uid)=>{if(uid==='h0')return{x:L.center,y:L.heroY[0]};if(uid==='h1')return{x:L.center,y:L.heroY[1]};if(uid==='power0')return L.powerPosition(0);if(uid==='power1')return L.powerPosition(1);for(let p=0;p<2;p++){const arr=s.players[p].board,i=arr.findIndex(u=>u.uid===uid);if(i>=0)return{x:L.center+(i-(arr.length-1)/2)*L.spacing,y:L.rows[p]};}return M.handPose(s,uid);};
M.begin=(before,after,action,origin,impact,done)=>{
 M.cancel(false);const now=performance.now(),p=before.active,h=action.type==='play'?before.players[p].hand.find(h=>h.uid===action.uid):null;
 const card=h?CHD.byId[h.id]:null,attack=action.type==='attack';
 const hitAt=attack?240:action.type==='play'?330:action.type==='power'?260:160;
 const duration=attack?610:action.type==='play'?610:action.type==='power'?570:660;
 const to=card?.type==='minion'?M.position(after,after.events.find(e=>e.type==='summon'&&e.id===card.id)?.target):action.target?M.position(before,action.target):action.type==='power'?M.position(before,(after.events.find(e=>e.type==='damage'||e.type==='heal'||e.type==='summon')||after.events.find(e=>e.type==='power'))?.target||'h'+p):{x:800,y:350};
 M.transition={id:++M.serial,before,after,action,card,p,from:origin||(card&&p===1?{x:650,y:25}:M.position(before,action.uid||'power'+p)),to,origin,at:now,hitAt,duration,hit:false,impact,done};
 if(attack)CHA.play('swing',{x:M.position(before,action.uid).x,gain:.62});
 if(action.type==='play')CHA.play('slide',{x:origin?.x||740,gain:.7});
 if(action.type==='power')CHA.play('channel',{x:939,gain:.4});
 return duration;
};
M.busy=()=>!!M.transition;
M.remaining=()=>M.transition?Math.max(0,M.transition.duration-(performance.now()-M.transition.at)):0;
M.cancel=(clearReturns=true)=>{if(M.transition&&!M.transition.hit){M.transition.hit=true;/* State is already saved; cancel visual effects when leaving. */}M.transition=null;M.draws=[];if(clearReturns)M.returns=[];};
M.frame=(actual,now)=>{
 M.returns=M.returns.filter(f=>now-f.at<f.duration);M.draws=M.draws.filter(f=>now-f.at<f.duration);
 const t=M.transition;if(!t)return actual;
 if(!t.hit&&now-t.at>=t.hitAt){t.hit=true;M.lastImpact=now;M.impactWeight=t.action.type==='attack'?2.6:t.action.type==='play'?1.4:.8;t.impact?.();
  const known=new Set(t.before.players[0].hand.map(h=>h.uid));t.after.players[0].hand.filter(h=>!known.has(h.uid)).forEach((h,i)=>M.draws.push({uid:h.uid,id:h.id,at:now+i*80,duration:360}));
 }
 if(now-t.at>=t.duration){M.transition=null;t.done?.();return actual;}
 return t.hit?t.after:t.before;
};
M.pose=(uid,base,now)=>{
 const t=M.transition;if(!t){const phase=now/680+String(uid).split('').reduce((n,c)=>n+c.charCodeAt(0),0);return {...base,y:base.y+Math.sin(phase)*.65,scale:1+Math.sin(phase)*.002,angle:0};}const elapsed=now-t.at;
 if(t.action.type==='attack'&&uid===t.action.uid){const from=M.position(t.before,uid),to=M.position(t.before,t.action.target),dx=to.x-from.x,dy=to.y-from.y;let q;
  if(elapsed<70)q=-.045*Math.sin(elapsed/70*Math.PI/2);
  else if(elapsed<t.hitAt)q=mix(-.045,.86,Math.pow(clamp((elapsed-70)/(t.hitAt-70)),2.2));
  else if(elapsed<305)q=.86;
  else q=.86*(1-ease((elapsed-305)/270));
  return{x:from.x+dx*q,y:from.y+dy*q,scale:1+.07*Math.sin(clamp(elapsed/610)*Math.PI),angle:Math.sin(elapsed/85)*.025};
 }
 if(t.hit&&t.after.events.some(e=>e.type==='damage'&&e.target===uid)){const age=elapsed-t.hitAt;if(age<200)return{x:base.x+Math.sin(age*.14)*5*(1-age/200),y:base.y,scale:1,angle:0};}
 const summon=t.after.events.find(e=>e.type==='summon'&&e.target===uid);
 if(t.hit&&summon){const q=clamp((elapsed-t.hitAt)/260);return{...base,scale:.8+.2*ease(q)+.075*Math.sin(q*Math.PI),angle:0};}
 return {...base,scale:1,angle:0};
};
M.insertion=()=>{const t=M.transition;return t&&!t.hit&&t.card?.type==='minion'&&t.p===0?(t.action.position??t.before.players[0].board.length):null;};
M.hiddenHand=uid=>M.returns.some(f=>f.uid===uid)||M.draws.some(f=>f.uid===uid)||(M.transition&&!M.transition.hit&&M.transition.action.uid===uid&&M.transition.card);
M.rebound=(drag,s)=>{M.returns=M.returns.filter(f=>f.uid!==drag.uid);M.returns.push({uid:drag.uid,id:drag.cardId,from:{x:drag.x,y:drag.y,w:drag.w||L.dragWidth,angle:drag.angle||0},at:performance.now(),duration:290});CHA.play('return',{x:drag.x,gain:.45});};
M.shake=now=>{const q=clamp((now-M.lastImpact)/180);return {x:Math.sin(q*27)*M.impactWeight*(1-q),y:Math.sin(q*35)*M.impactWeight*.5*(1-q)};};
// The cast shadow is a pre-rendered sprite (AP 2.4), offset like the former shadowBlur 24 / 9 / 18.
M.floatCard=(c,id,x,y,w,angle=0,alpha=1)=>{c.save();c.globalAlpha=alpha;c.translate(x,y);c.rotate(angle);
 c.save();c.translate(9-w/2,18-w*1.41/2);c.scale(w/200,w*1.41/282);CHR.blit(c,CHR.cardShadow());c.restore();
 CHR.fastCard(c,CHD.byId[id],-w/2,-w*1.41/2,w,w*1.41);c.restore();};
M.overlay=(c,s,now)=>{
 const t=M.transition;
 if(t?.card&&!t.hit){const q=ease((now-t.at)/t.hitAt),from=t.from,to=t.to;const startW=t.origin?.w||160,endW=t.card.type==='minion'?138:200;const x=mix(from.x,to.x,q),y=mix(from.y,to.y,q)-Math.sin(q*Math.PI)*55;M.floatCard(c,t.card.id,x,y,mix(startW,endW,q),mix(t.origin?.angle||-.08,0,q),t.card.type==='spell'?1-q*.3:1);}
 if((t?.action.type==='power'||t?.card?.type==='spell')&&!t.hit){const q=clamp((now-t.at)/t.hitAt),from=t.card?t.from:M.position(t.before,'power'+t.p),to=t.to;c.save();c.globalCompositeOperation='screen';const x=mix(from.x,to.x,q),y=mix(from.y,to.y,q)-Math.sin(q*Math.PI)*65;const g=c.createRadialGradient(x,y,0,x,y,32);g.addColorStop(0,'#fff8d6');g.addColorStop(.25,'#70d6ff');g.addColorStop(1,'#55aaff00');c.fillStyle=g;c.beginPath();c.arc(x,y,32,0,Math.PI*2);c.fill();c.restore();}
 for(const f of M.returns){const q=ease((now-f.at)/f.duration),to=M.handPose(s,f.uid);M.floatCard(c,f.id,mix(f.from.x,to.x,q),mix(f.from.y,to.y,q),mix(f.from.w,L.handWidth,q),mix(f.from.angle,to.angle,q));}
 for(const f of M.draws){const q=clamp((now-f.at)/f.duration);if(q<=0)continue;const to=M.handPose(s,f.uid);M.floatCard(c,f.id,mix(1380,to.x,ease(q)),mix(644,to.y,ease(q))-Math.sin(q*Math.PI)*120,mix(62,L.handWidth,q),mix(.2,to.angle,q));}
 // „Dein Zug“ is the dropping tablet in render.js (turnPlate, AP 3.7).
};
})();
