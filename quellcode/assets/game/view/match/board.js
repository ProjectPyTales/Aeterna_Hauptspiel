/* Match view: the canvas board. Draws every frame from the match view model, turns pointer gestures into
 * view-model commands (with the geometry from layout.js) and presents engine events (motion.js, render.js).
 * One captured pointer owns a gesture; a dragged card follows the finger in board coordinates. */
(function(){'use strict';
const R=CHR,M=CHM,L=CHL,A=CHA,T=CHT;

window.AEMatchView=function(canvas,vm,ui){
 const ctx=canvas.getContext('2d');
 // What the view model may ask of the board (ctx.board).
 const board={busy:()=>M.busy(),begin:(...args)=>M.begin(...args),rebound:(d,s)=>M.rebound(d,s),
  cancel:()=>{M.cancel();R.fx=[];},events:events=>R.events(events,vm.profile.settings),effect:fx=>R.fx.push({...fx,start:T.clock.now()})};

 let down=null,holdTimer=null,held=false;
 const coord=ev=>{const r=canvas.getBoundingClientRect();return {x:(ev.clientX-r.left)/r.width*1600,y:(ev.clientY-r.top)/r.height*800};};
 // Where the finger is, in terms the view model understands.
 const where=p=>{const me=vm.game.players[0],hit=R.hit(p.x,p.y);
  return {hitId:hit?.id??null,inHand:p.y>=L.handTop,handSlot:L.handIndex(p.x,me.hand.length),inDrop:L.inDrop(p.x,p.y),boardSlot:L.insertIndex(p.x,me.board.length),y:p.y};};
 function release(id){if(id!=null&&canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);}
 function cancel(){clearTimeout(holdTimer);vm.cancelDrag();vm.release();const id=down?.id;down=null;held=false;vm.touching=false;release(id);}

 canvas.addEventListener('pointerdown',ev=>{if(ui.screen()!=='game'||ui.dialogOpen()||down||M.busy())return;ui.unlockAudio();
  const p=coord(ev),hit=R.hit(p.x,p.y);down={...p,hit,id:ev.pointerId,pose:hit?.kind==='hand'?{...R.positions[hit.id]}:null};
  held=false;vm.touching=true;canvas.setPointerCapture(ev.pointerId);vm.press(hit);
  holdTimer=setTimeout(()=>{if(!down)return;held=true;vm.longPress(hit);},500);});
 canvas.addEventListener('pointermove',ev=>{if(!down||held||ev.pointerId!==down.id)return;const p=coord(ev);
  if(Math.hypot(p.x-down.x,p.y-down.y)<10&&!vm.view.drag)return;clearTimeout(holdTimer);
  // The drag grows on the match clock; its tilt is a spring in the renderer (AP 3.2).
  if(!vm.view.drag){if(!vm.pickUp(down.hit,p.x))return;vm.view.drag.at=T.clock.now();if(vm.view.drag.cardId)Object.assign(vm.view.drag,{from:down.pose,w:L.handWidth});}
  const d=vm.view.drag;Object.assign(d,{pointerX:p.x,pointerY:p.y,x:p.x,y:p.y});
  if(d.cardId){Object.assign(d,{offsetX:down.pose.x-down.x,offsetY:down.pose.y-down.y});Object.assign(d,L.dragPose(d,T.clock.now()));}
  vm.aim(where(p));});
 canvas.addEventListener('pointerup',ev=>{if(!down||ev.pointerId!==down.id)return;clearTimeout(holdTimer);const p=coord(ev);
  if(!held){if(vm.view.drag&&vm.view.selected)vm.drop(where(p));else vm.tap(R.hit(p.x,p.y));}
  down=null;held=false;vm.touching=false;vm.release();vm.endDrag();release(ev.pointerId);});
 canvas.addEventListener('pointercancel',cancel);
 canvas.addEventListener('lostpointercapture',()=>{if(down)cancel();});

 // Pixel density (AP 2.4): the canvas holds R.scale device pixels per stage unit, at most 2. Drawing and touch stay in
 // stage units (1600 × 800); only the backing store grows. Checked again whenever the canvas changes its size.
 let fitted=false;
 const fit=()=>{const w=canvas.getBoundingClientRect().width;if(!w)return;fitted=true;
  const k=Math.round(Math.max(1,Math.min(2,w*(window.devicePixelRatio||1)/1600))*100)/100;
  if(canvas.width!==Math.round(1600*k)){canvas.width=Math.round(1600*k);canvas.height=Math.round(800*k);}R.scale=k;R.scaled(ctx,k);};
 if(window.ResizeObserver)new ResizeObserver(()=>{fitted=false;}).observe(canvas);
 window.addEventListener('resize',()=>{fitted=false;});

 // Developer overlay (AP 2.4), switched on by the hidden setting settings.fps: pictures per second, drawing time of a
 // picture (mean and 95th percentile) and the longest gap between two pictures, over the last second.
 const stats=[];
 function overlay(now){while(stats.length&&now-stats[0].at>1000)stats.shift();if(stats.length<2)return;
  const d=stats.map(x=>x.ms).sort((a,b)=>a-b),mean=d.reduce((a,b)=>a+b,0)/d.length,p95=d[Math.min(d.length-1,Math.floor(d.length*.95))];
  const gap=Math.max(...stats.slice(1).map((x,i)=>x.at-stats[i].at)),fps=Math.round((stats.length-1)*1000/(stats[stats.length-1].at-stats[0].at));
  const f=n=>n.toFixed(1).replace('.',',');
  ctx.save();ctx.fillStyle='#0d0f12d0';ctx.beginPath();ctx.roundRect(1032,6,360,34,10);ctx.fill();ctx.font='16px Body,serif';ctx.textAlign='left';ctx.textBaseline='middle';
  ctx.fillStyle=fps>=55?'#9cf07a':fps>=40?'#ffd27a':'#ff8f7a';ctx.fillText(fps+' fps',1044,24);ctx.fillStyle='#f2dfaf';
  ctx.fillText('Bild '+f(mean)+' ms · 95 %: '+f(p95)+' · Lücke '+Math.round(gap)+' · ×'+f(R.scale),1110,24,272);ctx.restore();}

 // Frame loop: one picture per display refresh. The former 15 ms throttle skipped pictures on 90/120 Hz screens
 // (gaps of 11 and 22 ms in turn); now the loop follows the display. Animations run on the match clock (anim.js, AP 3.1):
 // the tempo setting speeds it up, a hit stop holds it, reduced motion switches hit stop and shake off.
 const frame=now=>{const s=vm.game;
  if(ui.screen()==='game'&&s){if(!fitted)fit();ctx.setTransform(R.scale,0,0,R.scale,0,0);
   T.clock.speed=vm.profile.settings.speed||1;T.clock.reduced=!!window.AEP?.reducedMotion?.();const t=T.clock.tick(now);
   const dev=vm.profile.settings.fps,t0=dev?performance.now():0;const shown=M.frame(s,t);R.draw(ctx,shown,vm.view,t,vm.strip(shown),vm.hand(shown));
   if(dev){stats.push({at:now,ms:performance.now()-t0});overlay(now);}else stats.length=0;
   A.intensity(s.players.some(p=>p.health<=12)?.8:0);}
  requestAnimationFrame(frame);};
 return {board,cancel,start:()=>requestAnimationFrame(frame)};
};
})();
