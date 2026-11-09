/* Match view: the canvas board. Draws every frame from the match view model, turns pointer gestures into
 * view-model commands (with the geometry from layout.js) and presents engine events (motion.js, render.js).
 * One captured pointer owns a gesture; a dragged card follows the finger in board coordinates. */
(function(){'use strict';
const R=CHR,M=CHM,L=CHL,A=CHA,T=CHT;

window.AEMatchView=function(canvas,vm,ui){
 const ctx=canvas.getContext('2d');
 // Tisch als eigene Ebene (AP 2.7, seit 1.37.0): eine Leinwand unter dem Brett (#table) trägt das fertige Bild des Tisches und
 // wird nur bei einem Tischwechsel neu gemalt; das Brett löscht nur noch seine eigene, durchsichtige Fläche.
 const under=document.getElementById('table'),tctx=under?.getContext('2d');R.layered=!!tctx;
 // Wann zuletzt etwas geschah (Berührung, Ereignis, Effekt): danach noch WAKE ms voller Takt, dann der Ruhetakt.
 let wake=0;const WAKE=2000,woke=()=>{wake=performance.now();};
 // What the view model may ask of the board (ctx.board).
 const board={busy:()=>M.busy(),begin:(...args)=>{woke();return M.begin(...args);},rebound:(d,s)=>{woke();return M.rebound(d,s);},
  cancel:()=>{M.cancel();R.fx=[];CHF.cancel();},events:events=>{woke();return R.events(events,vm.profile.settings);},effect:fx=>{woke();R.fx.push({...fx,start:T.clock.now()});},
  // AP 3.8: opening (heroes, chronicler, coin), the rolled-back starting orders, the new cards, the close. done follows
  // at once under reduced motion.
  present:(kind,info,done=()=>{})=>{woke();if(kind==='deal'){M.deal(info.before,info.after);done();}
   else if(kind==='mulligan'){if(window.AEP?.reducedMotion?.())done();else setTimeout(done,ROLL/(vm.profile.settings.speed||1));}
   else CHF.present(kind,info,done);}};
 const ROLL=720;

 let down=null,holdTimer=null,held=false;
 const coord=ev=>{const r=canvas.getBoundingClientRect();return {x:(ev.clientX-r.left)/r.width*1600,y:(ev.clientY-r.top)/r.height*800};};
 // Where the finger is, in terms the view model understands.
 const where=p=>{const me=vm.game.players[0],hit=R.hit(p.x,p.y);
  return {hitId:hit?.id??null,inHand:p.y>=L.handTop,handSlot:L.handIndex(p.x,me.hand.length),inDrop:L.inDrop(p.x,p.y),boardSlot:L.insertIndex(p.x,me.board.length),y:p.y};};
 function release(id){if(id!=null&&canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);}
 function cancel(){clearTimeout(holdTimer);vm.cancelDrag();vm.release();const id=down?.id;down=null;held=false;vm.touching=false;release(id);}

 canvas.addEventListener('pointerdown',ev=>{woke();if(ui.screen()!=='game'||ui.dialogOpen()||down)return;ui.unlockAudio();if(CHF.busy()){CHF.skip();return;}if(M.skipHerald())return;if(M.busy())return;
  const p=coord(ev),hit=R.hit(p.x,p.y);down={...p,hit,id:ev.pointerId,pose:hit?.kind==='hand'?{...R.positions[hit.id]}:null};
  held=false;vm.touching=true;canvas.setPointerCapture(ev.pointerId);vm.press(hit);
  holdTimer=setTimeout(()=>{if(!down)return;held=true;vm.longPress(hit);},500);});
 canvas.addEventListener('pointermove',ev=>{if(!down||held||ev.pointerId!==down.id)return;woke();const p=coord(ev);
  if(Math.hypot(p.x-down.x,p.y-down.y)<10&&!vm.view.drag)return;clearTimeout(holdTimer);
  // The drag grows on the match clock; its tilt is a spring in the renderer (AP 3.2).
  if(!vm.view.drag){if(!vm.pickUp(down.hit,p.x))return;vm.view.drag.at=T.clock.now();if(vm.view.drag.cardId)Object.assign(vm.view.drag,{from:down.pose,w:L.handWidth});}
  const d=vm.view.drag;Object.assign(d,{pointerX:p.x,pointerY:p.y,x:p.x,y:p.y});
  if(d.cardId){Object.assign(d,{offsetX:down.pose.x-down.x,offsetY:down.pose.y-down.y});Object.assign(d,L.dragPose(d,T.clock.now()));}
  vm.aim(where(p));});
 canvas.addEventListener('pointerup',ev=>{woke();if(!down||ev.pointerId!==down.id)return;clearTimeout(holdTimer);const p=coord(ev);
  if(!held){if(vm.view.drag&&vm.view.selected)vm.drop(where(p));else vm.tap(R.hit(p.x,p.y));}
  down=null;held=false;vm.touching=false;vm.release();vm.endDrag();release(ev.pointerId);});
 canvas.addEventListener('pointercancel',cancel);
 canvas.addEventListener('lostpointercapture',()=>{if(down)cancel();});

 // Pixel density (AP 2.4): the canvas holds R.scale device pixels per stage unit, at most 2. Drawing and touch stay in
 // stage units (1600 × 800); only the backing store grows. Checked again whenever the canvas changes its size.
 // Seit 1.37.0 (AP 2.7) setzt zusätzlich die Auflösung, die sich anpasst (T.Resolution), eine Obergrenze: Kommt das Gerät
 // nicht mit, sinkt sie stufenweise (2 → 1,5 → 1,25 → 1) und steigt wieder, wenn es sich erholt hat.
 const res=new T.Resolution();let fitted=false,zoom=1;
 const fit=()=>{const w=canvas.getBoundingClientRect().width/zoom;if(!w)return;fitted=(R.quality||'hoch')+'@'+res.cap;
  const k=Math.round(Math.max(1,Math.min(R.quality==='sparsam'?1:2,res.cap,w*(window.devicePixelRatio||1)/1600))*100)/100;
  for(const cv of [canvas,under])if(cv&&cv.width!==Math.round(1600*k)){cv.width=Math.round(1600*k);cv.height=Math.round(800*k);}
  if(under)tableSprite=null;R.scale=k;R.scaled(ctx,k);};
 if(window.ResizeObserver)new ResizeObserver(()=>{fitted=false;}).observe(canvas);
 window.addEventListener('resize',()=>{fitted=false;});
 // Die Ebene des Tisches: nur neu, wenn sich das Bild des Tisches ändert (anderer Tisch, Farbfilter, Pixeldichte, Farben).
 let tableSprite=null;
 const paintTable=()=>{if(!tctx)return;const sp=R.field();if(sp===tableSprite)return;tableSprite=sp;
  tctx.setTransform(1,0,0,1,0,0);tctx.clearRect(0,0,under.width,under.height);tctx.setTransform(R.scale,0,0,R.scale,0,0);R.blit(tctx,sp);};
 // Wackeln und Zoom bei Treffern als CSS-transform auf beiden Ebenen: das Bild verschiebt die GPU, nicht das Canvas.
 let moved='';
 const shake=()=>{const sh=T.shake.offset(),still=sh.zoom===1&&!sh.x&&!sh.y;zoom=sh.zoom;
  const tf=still?'':'scale('+sh.zoom.toFixed(4)+') translate('+sh.x.toFixed(2)+'px,'+sh.y.toFixed(2)+'px)';
  if(tf!==moved){moved=tf;canvas.style.transform=tf;if(under)under.style.transform=tf;}};
 // Bewegt sich etwas? Sonst zeichnet die Schleife im Ruhetakt (30 Bilder je Sekunde).
 const calm=now=>!down&&!vm.view.drag&&now-wake>WAKE&&!M.busy()&&!CHF.busy()&&!R.fx.length&&!T.shake.trauma&&!T.shake.zoom&&!T.clock.stopped();

 // Developer overlay (AP 2.4), switched on by the hidden setting settings.fps: pictures per second, drawing time of a
 // picture (mean and 95th percentile) and the longest gap between two pictures, over the last second.
 const stats=[];
 function overlay(now){while(stats.length&&now-stats[0].at>1000)stats.shift();if(stats.length<2)return;
  const d=stats.map(x=>x.ms).sort((a,b)=>a-b),mean=d.reduce((a,b)=>a+b,0)/d.length,p95=d[Math.min(d.length-1,Math.floor(d.length*.95))];
  const gap=Math.max(...stats.slice(1).map((x,i)=>x.at-stats[i].at)),fps=Math.round((stats.length-1)*1000/(stats[stats.length-1].at-stats[0].at));
  const f=n=>n.toFixed(1).replace('.',',');
  ctx.save();ctx.fillStyle='#0d0f12d0';ctx.beginPath();ctx.roundRect(1032,6,360,34,10);ctx.fill();ctx.font='16px Body,serif';ctx.textAlign='left';ctx.textBaseline='middle';
  ctx.fillStyle=fps>=55?'#9cf07a':fps>=40?'#ffd27a':'#ff8f7a';ctx.fillText(fps+' fps',1044,24);ctx.fillStyle='#f2dfaf';
  ctx.fillText('Bild '+f(mean)+' ms · 95 %: '+f(p95)+' · Lücke '+Math.round(gap)+' · ×'+f(R.scale)+(T.pace.resting?' · Ruhe':''),1110,24,272);ctx.restore();}

 // Frame loop: one picture per display refresh. The former 15 ms throttle skipped pictures on 90/120 Hz screens
 // (gaps of 11 and 22 ms in turn); now the loop follows the display. Animations run on the match clock (anim.js, AP 3.1):
 // the tempo setting speeds it up, a hit stop holds it, reduced motion switches hit stop and shake off.
 // Seit 1.37.0 (AP 2.7): Ruhetakt, wenn sich nichts bewegt; im vollen Takt meldet jedes Bild seinen Abstand an die Auflösung.
 let drawnAt=null,full=false;
 const frame=now=>{const s=vm.game;
  if(ui.screen()==='game'&&s){
   const rest=calm(now);
   if(T.pace.due(now,rest)){
    if(!rest&&full&&drawnAt!=null&&!document.hidden&&res.sample(now,now-drawnAt,R.scale))fitted=false;
    full=!rest;drawnAt=now;
    if(fitted!==(R.quality||'hoch')+'@'+res.cap)fit();paintTable();ctx.setTransform(R.scale,0,0,R.scale,0,0);
    T.clock.speed=vm.profile.settings.speed||1;T.clock.reduced=!!window.AEP?.reducedMotion?.();const t=T.clock.tick(now);if(R.layered)shake();
    const dev=vm.profile.settings.fps,t0=dev?performance.now():0;const shown=M.frame(s,t);R.draw(ctx,shown,vm.view,t,vm.strip(shown),vm.hand(shown));
    if(dev){stats.push({at:now,ms:performance.now()-t0});overlay(now);}else stats.length=0;
    A.intensity(s.players.some(p=>p.health<=12)?.8:0);}}
  else drawnAt=null;
  requestAnimationFrame(frame);};
 // Für Messungen und Tests (matchmessung.js): Stufe der Auflösung und ob gerade der Ruhetakt gilt.
 R.pacing=()=>({resting:T.pace.resting,cap:res.cap,level:res.level});
 return {board,cancel,start:()=>requestAnimationFrame(frame)};
};
})();
