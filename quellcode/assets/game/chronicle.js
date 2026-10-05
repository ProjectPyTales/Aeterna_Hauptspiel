/* Presentation adapter. Never mutates engine state or the saved text log. */
(function(){'use strict';
const D=CHD;
const name=(s,p)=>p===1&&s.mission!=null?D.missions[s.mission].boss:D.heroes.find(h=>h.id===s.players[p].hero).name;
const valid=e=>e&&((e.kind==='card'&&Object.prototype.hasOwnProperty.call(D.byId,e.id))||(['hero','power'].includes(e.kind)&&D.heroes.some(h=>h.id===e.id))||(e.kind==='event'&&e.id==='chronicle'));
const C=window.CHC={entries(s,saved=[]){
 const icons=new Map(),put=(line,kind,id)=>{if(!icons.has(line))icons.set(line,{kind,id});};
 const heroes=s.players.map((p,i)=>{const hero=D.heroes.find(h=>h.id===p.hero);
  return {hero,name:i===1&&s.mission!=null?D.missions[s.mission].boss:hero.name};});
 for(const {hero,name} of heroes){
  put(name+' nutzt '+hero.power+'.','power',hero.id);
  put(name+' greift an.','hero',hero.id);put(name+' gewinnt.','hero',hero.id);
 }
 for(const card of Object.values(D.byId)){
  for(const {name} of heroes)put(name+' spielt '+card.name+'.','card',card.id);
  for(const suffix of [' greift an.',' wurde besiegt.',' verbrannt (Hand voll).'])put(card.name+suffix,'card',card.id);
 }
 return s.log.map((text,i)=>{
  const prior=Array.isArray(saved)&&saved[i];
  let icon=prior?.text===text&&valid(prior)?{kind:prior.kind,id:prior.id}:icons.get(text);
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
 const add=(text,kind,id)=>{if(!queues.has(text))queues.set(text,[]);queues.get(text).push({text,kind,id});count++;};
 for(const e of after.events){
  if(e.type==='play')add(name(after,e.p)+' spielt '+D.byId[e.id].name+'.','card',e.id);
  else if(e.type==='power'){const h=D.heroes.find(h=>h.id===after.players[e.p].hero);add(name(after,e.p)+' nutzt '+h.power+'.','power',h.id);}
  else if(e.type==='attack'){const u=CHE.unit(before,e.source);if(u)add((u.hero?name(before,u.p):D.byId[u.obj.id].name)+' greift an.',u.hero?'hero':'card',u.hero?u.obj.hero:u.obj.id);}
  else if(e.type==='death'||e.type==='burn')add(D.byId[e.id].name+(e.type==='death'?' wurde besiegt.':' verbrannt (Hand voll).'),'card',e.id);
  else if(e.type==='turn')add('Zug '+after.turn+': '+name(after,e.p)+'.','hero',after.players[e.p].hero);
  else if(e.type==='over')add(e.winner===-1?'Unentschieden.':name(after,e.winner)+' gewinnt.',e.winner===-1?'event':'hero',e.winner===-1?'chronicle':after.players[e.winner].hero);
 }
 for(let p=0;p<2;p++)count+=Math.max(0,after.players[p].fatigue-before.players[p].fatigue);
 const fresh=count?C.entries(after).slice(-count).map(e=>queues.get(e.text)?.shift()||e):[];
 profile.matchChronicle=after.log.length?[...C.entries(before,profile.matchChronicle),...fresh].slice(-after.log.length):[];
}};
})();
