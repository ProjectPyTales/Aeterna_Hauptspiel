/* Campaign view model: 22 missions; each victory unlocks the next.
 * Kampagnenkarte (AP 1.7): every mission is a station on a map of Europe and the Mediterranean (the Aztec lake in an
 * inset „Neue Welt“); sieges carry a tower. Places and the projection live here, not in model/data.js – they only place the
 * stations and do not touch the rules. werkzeuge/weltkarte.js draws the coastlines (assets/art/weltkarte.svg) with the same
 * projection.
 * Kampagne 2.0 (AP 6.4, 1.31.0): the missions follow the six chapters of model/campaign.js (AEKA) and the epilogue – a chapter
 * strip on the panel, a march route per chapter, a story scene before the first mission of a chapter (dialog 'scene') and the
 * Lunte of the last mission. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD,KA=node?require('../model/campaign.js'):root.AEKA;
const {Screen}=node?require('./base.js'):root.AEVM,{ViewModel}=node?require('../core/mvvm.js'):root.AEM;

// Equirectangular map, 1080 × 640 stage units: 28°–56° N, 18° W – 46.5° E (longitudes shrunk by cos 43°).
const MAP={w:1080,h:640,lon0:-18,lat1:56,ky:640/28,kx:640/28*Math.cos(43*Math.PI/180),
 inset:{x:842,y:14,w:224,h:150,lon0:-100.6,lat1:21.2,k:42,place:'Neue Welt'}};
const project=(lon,lat)=>({x:(lon-MAP.lon0)*MAP.kx,y:(MAP.lat1-lat)*MAP.ky});
const projectInset=(lon,lat)=>{const i=MAP.inset;return {x:i.x+(lon-i.lon0)*i.k*Math.cos(19.4*Math.PI/180),y:i.y+(i.lat1-lat)*i.k};};
// Where each mission takes place (degrees). siege: a siege or a stormed fortress (marked on the map).
const PLACES=[
 {place:'Thermopylen',lon:22.56,lat:38.80},
 {place:'Alexandria',lon:29.92,lat:31.20},
 {place:'Sakkara',lon:31.22,lat:29.87},
 {place:'Venedig',lon:12.33,lat:45.44},
 {place:'Eresburg',lon:8.83,lat:51.38,siege:true},
 {place:'Alesia',lon:4.50,lat:47.54,siege:true},
 {place:'Königstein',lon:14.07,lat:50.92},
 {place:'Rupertsberg',lon:7.90,lat:49.97},
 {place:'Meißen',lon:13.47,lat:51.16},
 {place:'Säulen des Herakles',lon:-5.6,lat:36.0},
 {place:'Athen',lon:23.72,lat:37.97,siege:true},
 {place:'Actium',lon:20.73,lat:38.95},
 {place:'Auaris',lon:31.82,lat:30.79,siege:true},
 {place:'Konstantinopel',lon:28.98,lat:41.01},
 {place:'Azcapotzalco',lon:-99.18,lat:19.48,siege:true,inset:true},
 {place:'Quedlinburg',lon:11.14,lat:51.79},
 {place:'Leuktra',lon:23.18,lat:38.26},
 {place:'Ager Falernus',lon:14.25,lat:41.10},
 {place:'Idistaviso',lon:9.10,lat:52.25},
 {place:'Ain Dschalut',lon:35.37,lat:32.55},
 {place:'Namur',lon:4.87,lat:50.47,siege:true},
 {place:'Mont Lassois',lon:4.53,lat:47.86}];
// Seals 46 units wide must not overlap: close places are pushed apart (deterministic, a few hundred small steps);
// a thin line leads from the seal back to the true place.
const GAP=54;
const STATIONS=(()=>{const st=PLACES.map((p,id)=>{const at=p.inset?projectInset(p.lon,p.lat):project(p.lon,p.lat);return {id,...p,at,x:at.x,y:at.y};});
 const main=st.filter(s=>!s.inset);
 for(let k=0;k<400;k++)for(let i=0;i<main.length;i++)for(let j=i+1;j<main.length;j++){const a=main[i],b=main[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1;
  if(d<GAP){const push=(GAP-d)/2*.5,ux=dx/d||(j%2?1:-1),uy=dy/d;a.x-=ux*push;a.y-=uy*push;b.x+=ux*push;b.y+=uy*push;}}
 for(const s of main){s.x=Math.round(Math.min(MAP.w-30,Math.max(30,s.x)));s.y=Math.round(Math.min(MAP.h-30,Math.max(30,s.y)));}
 for(const s of st){s.at={x:Math.round(s.at.x),y:Math.round(s.at.y)};s.x=Math.round(s.x);s.y=Math.round(s.y);}
 return st;})();

class Campaign extends Screen{
 constructor(ctx){super(ctx,{pick:null});}
 enter(){this.state.pick=null;}
 // By mission id: {mission, number, chapter, done, locked, station, fuse}.
 get missions(){const p=this.profile;
  return D.missions.map(m=>({mission:m,number:KA.number(m.id),chapter:KA.chapterOf(m.id),done:p.campaign.includes(m.id),locked:!KA.unlocked(p,m.id),station:STATIONS[m.id],fuse:KA.fuse(m.id)}));}
 // In campaign order, chapter by chapter.
 get ordered(){const list=this.missions;return KA.ORDER.map(id=>list[id]);}
 // The open station: the picked one, else the first mission not yet won.
 get picked(){const list=this.ordered,id=this.state.pick;return list.find(x=>x.mission.id===id)||list.find(x=>!x.done&&!x.locked)||list[list.length-1];}
 // The chapter strip: {chapter, open, done, total, complete, current}.
 get chapters(){const p=this.profile,cur=this.picked.chapter;
  return KA.CHAPTERS.map(c=>{const done=KA.done(p,c);return {chapter:c,open:KA.open(p,c),done,total:c.missions.length,complete:done===c.missions.length,current:c===cur};});}
 // One march route per chapter, in mission order and only as far as the chronicle has come: [{chapter, current, legs:[{a, b, won}]}].
 get routes(){const list=this.missions,cur=this.picked.chapter;
  return KA.CHAPTERS.map(c=>{const st=c.missions.map(id=>list[id]).filter(x=>!x.station.inset),legs=[];
   for(let i=1;i<st.length;i++){if(st[i].locked)break;legs.push({a:st[i-1].station,b:st[i].station,won:st[i].done});}
   return {chapter:c,current:c===cur,legs};});}
 pick(id){id=Number(id);const m=this.missions[id];if(!m||m.mission.id===this.picked.mission.id)return;this.set({pick:id});this.ui.play('stone',{gain:.6});this.ui.haptic(0);}
 // A chapter opens on its first mission not yet won (or its first one).
 chapter(id){const c=KA.CHAPTERS.find(c=>c.id===id);if(!c)return;const list=this.missions,x=c.missions.map(i=>list[i]),to=(x.find(y=>!y.done&&!y.locked)||x[0]).mission.id;
  if(to===this.picked.mission.id)return;this.set({pick:to});this.ui.play('parchment',{gain:.6});this.ui.haptic(0);}
 start(){this.mission(this.picked.mission.id);}
 // Before the first mission of a chapter its story scene, once; then the hero choice.
 mission(id){id=Number(id);const m=this.missions[id];if(!m||m.locked)return;Object.assign(this.session,{mission:id,mode:'campaign'});
  const c=m.chapter;if(c&&!KA.seen(this.profile,c)){this.scene(c.id,()=>this.ui.go('setup'),id);return;}
  this.ui.go('setup');}
 // Story scene of a chapter; then runs after the last line. replay(): the scene of the picked chapter again (panel).
 replay(){this.scene(this.picked.chapter.id);}
 scene(id,then=null,mission=null){const c=KA.CHAPTERS.find(c=>c.id===id);if(!c||!KA.open(this.profile,c))return;
  if(KA.see(this.profile,c))this.commit();this.ui.dialog('scene',new Scene(this.ctx,{chapter:c,then,mission}));this.ui.play('parchment');}
 quests(){this.ctx.dialogs.quests();}
}

// Story-Szene (AP 6.4): Zeile für Zeile eine Sprechblase über dem Porträt dessen, der spricht; am Ende die Quelle.
// „Weiter“ blättert, „Überspringen“ und die letzte Zeile führen weiter (zur Heldenwahl, wenn die Szene vor einer Mission kam).
// Seit 1.32.0 (Rückmeldung zu 1.31.0): Der Chronist erzählt im Erzählkasten (ohne Porträt), die Helden stehen von Anfang an als
// Schattenrisse auf der Bühne und treten ins Licht, sobald sie sprechen (stage); ihre Zeile trägt Ort und Zeit (cue).
class Scene extends ViewModel{
 constructor(ctx,{chapter,then,mission=null}){super({step:0});this.ctx=ctx;this.chapter=chapter;this.then=then;this.mission=mission;}
 get lines(){return this.chapter.scene;}
 get line(){return this.lines[this.state.step];}
 get last(){return this.state.step>=this.lines.length-1;}
 // Everyone who speaks, in order of appearance, once.
 get cast(){return [...new Set(this.lines.map(l=>l.who))];}
 // The heroes on the stage, in order of appearance: {who, speaking, spoke (already had a line), waiting (still in shadow)}.
 get stage(){const step=this.state.step,now=this.line.who;
  return this.cast.filter(w=>w!=='chronist').map(who=>{const first=this.lines.findIndex(l=>l.who===who);
   return {who,speaking:who===now,spoke:first<step&&who!==now,waiting:first>step};});}
 // The mission the last line leads to (the one being started, else the first of the chapter): {number, place}.
 get goal(){const id=this.mission??this.chapter.missions[0];return {number:KA.number(id),place:STATIONS[id].place};}
 next(){if(this.last){this.done();return;}this.set({step:this.state.step+1});this.ctx.ui.play('parchment',{gain:.5});}
 prev(){if(this.state.step>0)this.set({step:this.state.step-1});}
 done(){this.ctx.ui.close();this.then?.();}
 close(){this.ctx.ui.close();}
}

const api={Campaign,Scene,MAP,STATIONS,PLACES,project,projectInset};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
