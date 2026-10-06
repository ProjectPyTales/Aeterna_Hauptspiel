/* Match view: the canvas board. Draws every frame from the match view model, turns pointer gestures into
 * view-model commands (with the geometry from layout.js) and presents engine events (motion.js, render.js).
 * One captured pointer owns a gesture; a dragged card follows the finger in board coordinates. */
(function(){'use strict';
const R=CHR,M=CHM,L=CHL,A=CHA;

window.AEMatchView=function(canvas,vm,ui){
 const ctx=canvas.getContext('2d');
 // What the view model may ask of the board (ctx.board).
 const board={busy:()=>M.busy(),begin:(...args)=>M.begin(...args),rebound:(d,s)=>M.rebound(d,s),
  cancel:()=>{M.cancel();R.fx=[];},events:events=>R.events(events,vm.profile.settings),effect:fx=>R.fx.push(fx)};

 let down=null,holdTimer=null,held=false;
 const coord=ev=>{const r=canvas.getBoundingClientRect();return {x:(ev.clientX-r.left)/r.width*1600,y:(ev.clientY-r.top)/r.height*800};};
 // Where the finger is, in terms the view model understands.
 const where=p=>{const me=vm.game.players[0],hit=R.hit(p.x,p.y);
  return {hitId:hit?.id??null,inHand:p.y>=L.handTop,handSlot:L.handIndex(p.x,me.hand.length),inDrop:L.inDrop(p.x,p.y),boardSlot:L.insertIndex(p.x,me.board.length),y:p.y};};
 function release(id){if(id!=null&&canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);}
 function cancel(){clearTimeout(holdTimer);vm.cancelDrag();const id=down?.id;down=null;held=false;vm.touching=false;release(id);}

 canvas.addEventListener('pointerdown',ev=>{if(ui.screen()!=='game'||ui.dialogOpen()||down||M.busy())return;ui.unlockAudio();
  const p=coord(ev),hit=R.hit(p.x,p.y);down={...p,hit,id:ev.pointerId,pose:hit?.kind==='hand'?{...R.positions[hit.id]}:null};
  held=false;vm.touching=true;canvas.setPointerCapture(ev.pointerId);
  holdTimer=setTimeout(()=>{if(!down)return;held=true;vm.longPress(hit);},500);});
 canvas.addEventListener('pointermove',ev=>{if(!down||held||ev.pointerId!==down.id)return;const p=coord(ev);
  if(Math.hypot(p.x-down.x,p.y-down.y)<10&&!vm.view.drag)return;clearTimeout(holdTimer);
  if(!vm.view.drag){if(!vm.pickUp(down.hit,p.x))return;if(vm.view.drag.cardId)Object.assign(vm.view.drag,{from:down.pose,w:L.handWidth});}
  const d=vm.view.drag,oldX=d.pointerX??p.x;Object.assign(d,{pointerX:p.x,pointerY:p.y,x:p.x,y:p.y});
  if(d.cardId){Object.assign(d,{offsetX:down.pose.x-down.x,offsetY:down.pose.y-down.y,angle:Math.max(-.1,Math.min(.1,(p.x-oldX)*.003))});Object.assign(d,L.dragPose(d,performance.now()));}
  vm.aim(where(p));});
 canvas.addEventListener('pointerup',ev=>{if(!down||ev.pointerId!==down.id)return;clearTimeout(holdTimer);const p=coord(ev);
  if(!held){if(vm.view.drag&&vm.view.selected)vm.drop(where(p));else vm.tap(R.hit(p.x,p.y));}
  down=null;held=false;vm.touching=false;vm.endDrag();release(ev.pointerId);});
 canvas.addEventListener('pointercancel',cancel);
 canvas.addEventListener('lostpointercapture',()=>{if(down)cancel();});

 // Frame loop (the 15 ms throttle goes with AP 2.4).
 let last=0;
 const frame=now=>{const s=vm.game;if(ui.screen()==='game'&&s&&now-last>=15){last=now;R.draw(ctx,M.frame(s,now),vm.view,now);A.intensity(s.players.some(p=>p.health<=12)?.8:0);}requestAnimationFrame(frame);};
 return {board,cancel,start:()=>requestAnimationFrame(frame)};
};
})();
