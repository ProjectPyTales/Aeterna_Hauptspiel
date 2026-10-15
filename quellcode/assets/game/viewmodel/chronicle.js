/* Presentation adapter. Never mutates engine state or the saved text log.
 * Since 1.17.0 also in Node (tests of the chronicle strip); entries carry the side p where the sidecar knows it. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD,CHE=node?require('../model/engine.js'):root.CHE;
const name=(s,p)=>p===1&&s.mission!=null?D.missions[s.mission].boss:D.heroes.find(h=>h.id===s.players[p].hero).name;
const valid=e=>e&&((e.kind==='card'&&Object.prototype.hasOwnProperty.call(D.byId,e.id))||(['hero','power'].includes(e.kind)&&D.heroes.some(h=>h.id===e.id))||(e.kind==='event'&&e.id==='chronicle'));
const C={entries(s,saved=[]){
 const icons=new Map(),put=(line,kind,id)=>{if(!icons.has(line))icons.set(line,{kind,id});};
 const heroes=s.players.map((p,i)=>{const hero=D.heroes.find(h=>h.id===p.hero);
  return {hero,name:i===1&&s.mission!=null?D.missions[s.mission].boss:hero.name};});
 for(const {hero,name} of heroes){
  put(name+' nutzt '+hero.power+'.','power',hero.id);
  put(name+' greift an.','hero',hero.id);put(name+' gewinnt.','hero',hero.id);put(name+' ergründet eine Karte.','event','chronicle');put(name+' legt einen Hinterhalt.','event','chronicle');
 }
 for(const card of Object.values(D.byId)){
  for(const {name} of heroes)put(name+' spielt '+card.name+'.','card',card.id);
  for(const suffix of [' greift an.',' wurde besiegt.',' stürzt ein.',' verbrannt (Hand voll).'])put(card.name+suffix,'card',card.id);
  for(const {name} of heroes)put(name+' übernimmt '+card.name+'.','card',card.id);
  put('Theon wirkt '+card.name+' erneut.','card',card.id);
  if(card.type==='spell'){put('Hinterhalt: '+card.name+'.','card',card.id);put(card.name+' wird vereitelt.','card',card.id);}
 }
 return s.log.map((text,i)=>{
  const prior=Array.isArray(saved)&&saved[i];
  let icon=prior?.text===text&&valid(prior)?{kind:prior.kind,id:prior.id,...(prior.p!=null?{p:prior.p}:{})}:icons.get(text);
  if(!icon){const turn=/^Zug \d+: (.+)\.$/.exec(text),fatigue=/^(.+): Erschöpfung \d+\.$/.exec(text);
   const player=heroes.find(h=>h.name===(turn?.[1]||fatigue?.[1]));
   if(player)icon={kind:'hero',id:player.hero.id};
  }
  return {text,...(icon||{kind:'event',id:'chronicle'})};
 });
},record(profile,before){
 // An optional UI sidecar preserves exact artwork for identically named
 // collectible/token cards, including after resume or export/import.
 const after=profile.game,queues=new Map();let count=0;
 const add=(text,kind,id,p)=>{if(!queues.has(text))queues.set(text,[]);queues.get(text).push({text,kind,id,...(p!=null?{p}:{})});count++;};
 for(const e of after.events){
  // A laid Hinterhalt (AP 5.6) stays hidden in the chronicle – your own shows its card to you.
  if(e.type==='play'&&e.ambush)add(name(after,e.p)+' legt einen Hinterhalt.',e.p===0?'card':'event',e.p===0?e.id:'chronicle',e.p);
  else if(e.type==='play')add(name(after,e.p)+' spielt '+D.byId[e.id].name+'.','card',e.id,e.p);
  else if(e.type==='ambush')add('Hinterhalt: '+D.byId[e.id].name+'.','card',e.id,e.p);
  else if(e.type==='counter')add(D.byId[e.id].name+' wird vereitelt.','card',e.id,e.p);
  else if(e.type==='power'){const h=D.heroes.find(h=>h.id===after.players[e.p].hero);add(name(after,e.p)+' nutzt '+h.power+'.','power',h.id,e.p);}
  else if(e.type==='attack'&&!e.pincer&&!e.duel){const u=CHE.unit(before,e.source);if(u)add((u.hero?name(before,u.p):D.byId[u.obj.id].name)+' greift an.',u.hero?'hero':'card',u.hero?u.obj.hero:u.obj.id,u.p);}
  else if(e.type==='death'||e.type==='burn')add(D.byId[e.id].name+(e.type==='burn'?' verbrannt (Hand voll).':e.building?' stürzt ein.':' wurde besiegt.'),'card',e.id,e.p);
  else if(e.type==='discover')add(name(after,e.p)+' ergründet eine Karte.','event','chronicle');
  else if(e.type==='steal'){const u=CHE.unit(after,e.target);if(u)add(name(after,e.p)+' übernimmt '+D.byId[u.obj.id].name+'.','card',u.obj.id,e.p);}
  else if(e.type==='echo')add('Theon wirkt '+D.byId[e.id].name+' erneut.','card',e.id,e.p);
  else if(e.type==='turn')add('Zug '+after.turn+': '+name(after,e.p)+'.','hero',after.players[e.p].hero);
  else if(e.type==='over')add(e.winner===-1?'Unentschieden.':name(after,e.winner)+' gewinnt.',e.winner===-1?'event':'hero',e.winner===-1?'chronicle':after.players[e.winner].hero);
 }
 for(let p=0;p<2;p++)for(let n=before.players[p].fatigue+1;n<=after.players[p].fatigue;n++)add(name(after,p)+': Erschöpfung '+n+'.','hero',after.players[p].hero,p);
 const fresh=count?C.entries(after).slice(-count).map(e=>queues.get(e.text)?.shift()||e):[];
 profile.matchChronicle=after.log.length?[...C.entries(before,profile.matchChronicle),...fresh].slice(-after.log.length):[];
}};
if(node)module.exports=C;else root.CHC=C;
})(typeof globalThis!=='undefined'?globalThis:this);
