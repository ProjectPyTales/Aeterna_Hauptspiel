/* Shared geometry for rendering, animation and touch targets. 1600 × 800 stage. */
(function(){'use strict';
const L=window.CHL={center:800,spacing:158,rows:[448,264],heroY:[656,91],heroScales:[1.23,1.02],
  // AP 1.8: hero coin (radius in coin units), ruler's seal beside it, chronometer, middle line of the table (no drawn seam
  // since 1.17.0, the engraved chart is centred on it).
  coin:74,powerOffset:{x:112,y:22},chrono:{x:1490,y:366,r:56},seam:357,
  minionScale:1.22*.85,handCenter:800,handY:764,handWidth:144,dragWidth:258,handTop:700,
  drop:{left:225,right:1370,top:365,bottom:551}};
L.heroScale=p=>L.heroScales[p];
// Mana (1.17.0, feedback on 1.16.0): an ether dial on the free left side beside the chronicle strip – yours in your
// half, the rival's smaller one in his; ten crystals around the ring (L.crystal), the number in the middle.
L.mana=[{x:184,y:470,r:58},{x:184,y:200,r:44}];
L.crystal=(p,i)=>{const m=L.mana[p],an=-Math.PI/2+i*Math.PI/5;return {x:m.x+Math.cos(an)*m.r*.74,y:m.y+Math.sin(an)*m.r*.74,an,r:m.r*.17};};
// Chronicle strip (AP 1.8 Teil 2) at the left edge: a parchment strip with the newest entries on top, one row each.
L.strip={x:44,y:96,w:70,h:548,top:160,step:78,rows:6};
L.stripRow=i=>({x:L.strip.x+L.strip.w/2,y:L.strip.top+i*L.strip.step,size:54});
// AUSSPIELEN below your ether dial; the rival's sealed orders (hand) along the top edge.
L.confirm={x:120,y:584,w:140,h:56};
L.powerPosition=(p,x=L.center,y=L.heroY[p])=>({x:x+L.powerOffset.x*L.heroScale(p),y:y+L.powerOffset.y*L.heroScale(p)});
// Two low fans leave a permanent clear corridor for the hero and attached power.
// Rendering, card flights and reorder hit testing all use this same geometry.
L.handStep=n=>Math.min(100,320/Math.max(1,Math.ceil(n/2)-1));
L.handPose=(i,n)=>{const left=Math.ceil(n/2),side=i<left?-1:1,depth=side<0?left-1-i:i-left;
  return {x:L.center+side*(262+depth*L.handStep(n)),y:L.handY+depth*.8,
    w:L.handWidth,h:L.handWidth*1.41,angle:side*(.012+depth*.012)};};
L.raisedHandPose=pose=>({...pose,x:pose.x<L.center?Math.min(pose.x,530):Math.max(pose.x,1086),y:pose.y-58,angle:0});
// AP 3.2: a pressed hand card grows at once (× 1.75) and rises upright – inside the stage and clear of the hero coin.
L.pressScale=1.75;
L.pressedHandPose=pose=>{const w=L.handWidth*L.pressScale,h=w*1.41;
  return {...pose,x:pose.x<L.center?Math.max(w/2+10,Math.min(pose.x,L.center-240)):Math.min(1590-w/2,Math.max(pose.x,L.center+240)),y:800-h/2-12,angle:0};};
L.handIndex=(x,n)=>{let nearest=0,distance=Infinity;for(let i=0;i<n;i++){const d=Math.abs(x-L.handPose(i,n).x);if(d<distance){nearest=i;distance=d;}}return nearest;};
L.inDrop=(x,y)=>x>L.drop.left&&x<L.drop.right&&y>L.drop.top&&y<L.drop.bottom;
L.insertIndex=(x,n)=>Math.max(0,Math.min(n,Math.round((x-L.center)/L.spacing+n/2)));
L.dragPose=(d,now)=>{const q=1-Math.pow(1-Math.min(1,Math.max(0,(now-d.at)/150)),3),w=L.handWidth+(L.dragWidth-L.handWidth)*q;
  // Lift the face above the fingertip; clamp it inside the stage at every edge.
  const h=w*1.41;
  return {w,x:Math.max(w/2+10,Math.min(1590-w/2,d.pointerX+(d.offsetX||0)*w/L.handWidth)),
    y:Math.max(h/2+10,Math.min(790-h/2,d.pointerY+(d.offsetY||0)*w/L.handWidth-58*q))};};
})();
