/* Campaign view model: 22 missions (ten plus the new chronicles of AP 5.10); each victory unlocks the next.
 * Kampagnenkarte (AP 1.7): every mission is a station on a map of Europe and the Mediterranean (the Aztec lake in an
 * inset „Neue Welt“), joined by a march route in mission order; sieges carry a tower. Places and the projection live
 * here, not in model/data.js – they only place the stations and do not touch the rules.
 * werkzeuge/weltkarte.js draws the coastlines (assets/art/weltkarte.svg) with the same projection. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD;
const {Screen}=node?require('./base.js'):root.AEVM;

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
 get missions(){const done=this.profile.campaign;
  return D.missions.map(m=>({mission:m,done:done.includes(m.id),locked:m.id>0&&!done.includes(m.id-1),station:STATIONS[m.id]}));}
 // The open station: the picked one, else the first mission not yet won.
 get picked(){const list=this.missions,id=this.state.pick;return list.find(x=>x.mission.id===id)||list.find(x=>!x.done&&!x.locked)||list[list.length-1];}
 get route(){return this.missions.filter(x=>!x.station.inset).map(x=>x.station);}
 pick(id){id=Number(id);const m=this.missions[id];if(!m||m.mission.id===this.picked.mission.id)return;this.set({pick:id});this.ui.play('stone',{gain:.6});this.ui.haptic(0);}
 start(){this.mission(this.picked.mission.id);}
 mission(id){id=Number(id);const m=this.missions[id];if(!m||m.locked)return;Object.assign(this.session,{mission:id,mode:'campaign'});this.ui.go('setup');}
 quests(){this.ctx.dialogs.quests();}
}

const api={Campaign,MAP,STATIONS,PLACES,project,projectInset};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
