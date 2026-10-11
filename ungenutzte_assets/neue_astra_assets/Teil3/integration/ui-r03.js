/* Optional integration helpers. No game state or automatic installation. */
export function filterLayers(family, {selected=false, disabled=false, pressed=false, hover=false, focus=false}={}, base='assets/ui/') {
  if (!['mana','basic','common','rare','epic','legendary'].includes(family)) throw new Error('Unknown filter family');
  const state=disabled?'disabled':pressed?'pressed':focus?'fokus':hover?'hover':selected?'aktiv':'normal';
  return {base:base+`filterknopf-${family}-${state}.png`,
    emblem:['common','rare','epic','legendary'].includes(family)?base+`archivsiegel-${family}.png`:null,
    emblemRect:[46+(state==='pressed'?2:0),46+(state==='pressed'?4:0),100,100],
    emblemOpacity:disabled?0.46:1,
    overlay:selected&&!['aktiv'].includes(state)?base+'filter-auswahl-overlay.png':null,
    overlayOpacity:disabled?0.46:1, overlayOffset:state==='pressed'?[2,4]:[0,0],
    focusOutline:focus, ariaPressed:selected, disabled};
}

// Art and mask are rendered to an isolated surface: destination-in must never
// erase the entire game canvas. Then overlay the corresponding Teil-01 frame.
export function drawFramedArt(ctx, art, mask, frame, x,y,w,h,apertureBox=[0,0,mask.width,mask.height]) {
  const layer=document.createElement('canvas');layer.width=mask.width;layer.height=mask.height;
  const c=layer.getContext('2d');
  const [left,top,right,bottom]=apertureBox,aw=right-left,ah=bottom-top;
  const scale=Math.max(aw/art.width,ah/art.height);
  c.drawImage(art,left+(aw-art.width*scale)/2,top+(ah-art.height*scale)/2,art.width*scale,art.height*scale);
  c.globalCompositeOperation='destination-in';c.drawImage(mask,0,0);
  ctx.drawImage(layer,x,y,w,h);ctx.drawImage(frame,x,y,w,h);
}

export function drawChronicle(ctx, top,middle,bottom,x,y,w,h) {
  const a=top.height*w/top.width,b=bottom.height*w/bottom.width;
  if(h<a+b) throw new Error('Chronicle too short for unscaled caps');
  ctx.drawImage(top,x,y,w,a);
  ctx.drawImage(middle,x,y+a,w,h-a-b);
  ctx.drawImage(bottom,x,y+h-b,w,b);
}

// Use matching source coordinates for drawing and input; stage units here use
// the project's 1600x800 stage, including its source crop of 217 pixels.
export function sourceToStage(mapping,x,y) {
  return [(x-mapping.source_crop_left)*mapping.scale,y*mapping.scale];
}
export function stageToSource(mapping,x,y) {
  return [x/mapping.scale+mapping.source_crop_left,y/mapping.scale];
}
function insidePolygon(points,x,y) {
  let inside=false;
  for(let i=0,j=points.length-1;i<points.length;j=i++){
    const [xi,yi]=points[i],[xj,yj]=points[j];
    if((yi>y)!=(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)inside=!inside;
  }
  return inside;
}
export function hitMenu(mapping,stageX,stageY) {
  const [x,y]=stageToSource(mapping,stageX,stageY);
  for(const control of mapping.controls){
    if(control.shape==='polygon'&&insidePolygon(control.points,x,y))return control.id;
    if(control.center&&Math.hypot(x-control.center[0],y-control.center[1])<=control.radius)return control.id;
    if(control.rect){const [rx,ry,rw,rh]=control.rect;if(x>=rx&&x<=rx+rw&&y>=ry&&y<=ry+rh)return control.id;}
  }
  return null;
}

export function drawAtlasSprite(ctx,atlas,entry,x,y,w,h) {
  const [sx,sy,sw,sh]=entry.rect;ctx.drawImage(atlas,sx,sy,sw,sh,x,y,w,h);
}
