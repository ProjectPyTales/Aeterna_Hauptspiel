/* Deterministic rules engine. No DOM, clock or network dependencies.
 * Keywords (AP 5.4) keep their engine fields: taunt = Schildwall, shield = Segen (until 1.23.0 Göttliche Gunst), battle = Einmarsch,
 * death = Vermächtnis, charge = Sturmangriff. New in 1.7.0: rush (Vorstoß), freeze (Starre), discover (Ergründen,
 * a pending choice in s.choice), double (Doppelschlag), focus (Weisheit, until 1.23.0 Arkaner Fokus), buildings (Bauwerk), auras of the
 * legendaries and per-card cost changes in the hand. New in 1.8.0 (AP 5.4 part 2): plunder (Plünderung), stealth
 * (Tarnung), silence (Bannung, unit.silenced), poison (Tödliches Gift) and overload (Belastung, player.overload/locked).
 * New in 1.9.0 (AP 5.10): hero powers are data (hero.ability: effects and target, conditions follow from the effects),
 * triggers start/end on cards and buildings, ages (D.playable). New in 1.10.0 (AP 5.5, 5.8, 5.11): onDamage, anyDeath,
 * spellDiscount, healDouble, doubleDeath and wall (Große Mauer) on cards and buildings, discover pools of the ages, an AI
 * personality per hero (hero.ai) and buildings valued by what they do. New in 1.11.0 (AP 5.10 wave 2): buffLeft (the
 * leftmost minion), ifMinions, a granted Vorstoß that acts at once, random Starre, Ergründen from the top of the own deck
 * (pool 'deck'), auras for Schildwall minions only and targets in Starre. New in 1.25.0 (AP 5.6): Hinterhalte – spells that
 * lie hidden beside their hero (player.ambush) and spring in the rival's turn. Older saved games simply lack the new fields. */
(function(root){'use strict';
const D=typeof module!=='undefined'?require('./data.js'):root.CHD;
const clone=x=>JSON.parse(JSON.stringify(x));
// Fast copy of a game state for the AI look-ahead: same content as clone(), several times faster.
function copy(s){const o={...s,players:s.players.map(a=>{const b={...a,hand:a.hand.map(c=>({...c})),deck:a.deck.slice(),board:a.board.map(u=>({...u})),grave:a.grave.slice(),weapon:a.weapon&&{...a.weapon}};if(a.fallen)b.fallen=a.fallen.slice();if(a.ambush)b.ambush=a.ambush.slice();return b;}),events:s.events.slice(),log:s.log.slice()};
 if(s.played)o.played=s.played.slice();if(s.choice)o.choice={...s.choice,options:s.choice.options.slice()};return o;}
function rand(s){let x=s.seed|0;x^=x<<13;x^=x>>>17;x^=x<<5;s.seed=x>>>0;return s.seed/4294967296;}
function shuffle(s,a){for(let i=a.length-1;i>0;i--){const j=Math.floor(rand(s)*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const pick=(s,list)=>list[Math.floor(rand(s)*list.length)];
function emit(s,type,extra={}){s.events.push({type,...extra});if(s.events.length>70)s.events.shift();}
function log(s,msg){s.log.push(msg);if(s.log.length>70)s.log.shift();}
const heroOf=a=>D.heroById[a.hero];
function heroName(s,p){return p===1&&s.mission!=null?D.missions[s.mission].boss:heroOf(s.players[p]).name;}
function unit(s,id){for(let p=0;p<2;p++){if(id==='h'+p)return {obj:s.players[p],p,hero:true};const u=s.players[p].board.find(u=>u.uid===id);if(u)return {obj:u,p,hero:false};}return null;}
const maxHealth=t=>t.obj.maxHealth;
// Minions in the narrow sense: buildings occupy a place but are no Diener.
const minions=a=>a.board.filter(u=>!u.building);
const has=(a,id)=>a.board.filter(u=>u.id===id&&!u.silenced).length;
// The rules a unit still has: none after Bannung.
const NONE={};const rule=u=>u.silenced?NONE:D.byId[u.id];
// from: the attacking unit (uid or 'h0'/'h1'). Its Plünderung heals its hero, its Tödliches Gift destroys a damaged minion.
function hurt(s,id,n,from){const t=unit(s,id);if(!t||n<=0)return;const o=t.obj;if(!t.hero&&o.shield){o.shield=false;emit(s,'shield',{target:id});return;}let actual=n;if(t.hero){const a=Math.min(o.armor,n);o.armor-=a;actual-=a;}o.health-=actual;emit(s,'damage',{target:id,n,hero:t.hero});
 const src=from&&unit(s,from);if(src&&!src.hero){if(src.obj.plunder)heal(s,'h'+src.p,n);if(src.obj.poison&&!t.hero&&!o.building&&o.health>0){o.health=0;emit(s,'poison',{target:id});}}
 // onDamage (1.10.0): a minion that takes damage and survives reacts (Spartiat, Schildkrötenschiff); chains stay short.
 if(!t.hero&&o.health>0&&rule(o).onDamage&&(s.depth||0)<6){s.depth=(s.depth||0)+1;effects(s,t.p,rule(o).onDamage,null,o.uid);s.depth--;if(!s.depth)delete s.depth;}}
function heal(s,id,n){const t=unit(s,id);if(!t||t.obj.building)return;if(!t.hero&&s.players[t.p].board.some(u=>rule(u).healDouble&&u.health>0))n*=2;let k=Math.min(n,maxHealth(t)-t.obj.health);t.obj.health+=Math.max(0,k);if(k>0){emit(s,'heal',{target:id,n:k});healed(s,t);}}
// Heal triggers (1.9.0): onHeal of the healed minion itself, allyHeal of every own unit (Nezahualcóyotl).
function healed(s,t){const a=s.players[t.p];if(!t.hero&&rule(t.obj).onHeal)effects(s,t.p,rule(t.obj).onHeal,null,t.obj.uid);
 for(const u of [...a.board])if(rule(u).allyHeal&&u.health>0)effects(s,t.p,rule(u).allyHeal,null,u.uid);}
// Draws n cards; returns the hand entries that arrived (Caterina lowers their cost).
function draw(s,p,n=1){const a=s.players[p],got=[];for(let i=0;i<n;i++){if(!a.deck.length){a.fatigue++;hurt(s,'h'+p,a.fatigue);log(s,heroName(s,p)+': Erschöpfung '+a.fatigue+'.');continue;}const id=a.deck.shift();if(a.hand.length>=10){a.grave.push(id);emit(s,'burn',{p,id});log(s,D.byId[id].name+' verbrannt (Hand voll).');}else{const h={id,uid:'c'+s.nextId++};a.hand.push(h);got.push(h);emit(s,'draw',{p});}}return got;}
function summon(s,p,id,position){const a=s.players[p];if(a.board.length>=7)return null;const c=D.byId[id];if(!c||c.type!=='minion')return null;
 const u={uid:'u'+s.nextId++,id,attack:c.attack,health:c.health,maxHealth:c.health,shield:!!c.shield,taunt:!!c.taunt,ready:!!(c.charge||c.rush),attacks:0};
 if(c.rush)u.rush=true;if(c.double)u.double=true;if(c.stealth)u.stealth=true;if(c.plunder)u.plunder=true;if(c.poison)u.poison=true;if(c.building){u.building=true;u.ready=false;}u.fresh=true;
 a.board.splice(position==null?a.board.length:position,0,u);emit(s,'summon',{p,target:u.uid,id});auras(s);return u;}
// Auras of the legendaries, recomputed after every change: Gorgo (+1 attack for Schildwall), Jutta von Sponheim (novices
// +1/+1 and Segen once; until 1.14.0 La Hire with recruits), Judith von Böhmen (boundary stones Schildwall and +1 health) and buffAura of any card (Castra, Athena Parthenos:
// all other own minions). Only the difference to the last value is applied.
function auras(s){for(const a of s.players){const gorgo=has(a,'leonidas_9'),jutta=has(a,'jeanne_9'),judith=has(a,'ragnar_9'),anthems=a.board.filter(u=>rule(u).buffAura);
 for(const u of a.board){if(u.building)continue;const totem=u.id.startsWith('totem_'),novice=u.id==='novice';
  const wall=judith>0&&totem;if(wall&&!u.taunt){u.taunt=true;u.auraTaunt=true;}else if(!wall&&u.auraTaunt){u.taunt=false;delete u.auraTaunt;}
  if(novice&&jutta&&!u.graced){u.shield=true;u.graced=true;}
  let atk=(u.taunt?gorgo:0)+(novice?jutta:0),hp=(totem?judith:0)+(novice?jutta:0);
  for(const b of anthems)if(b!==u&&(rule(b).buffAura.only!=='taunt'||u.taunt)){atk+=rule(b).buffAura.attack||0;hp+=rule(b).buffAura.health||0;}
  const da=atk-(u.auraAtk||0),dh=hp-(u.auraHp||0);
  if(da){u.attack+=da;if(atk)u.auraAtk=atk;else delete u.auraAtk;}
  if(dh){u.maxHealth+=dh;u.health=dh>0?u.health+dh:Math.min(u.health,u.maxHealth);if(hp)u.auraHp=hp;else delete u.auraHp;}}}}
// Weisheit: extra damage of the player's spells.
const focus=(s,p)=>s.players[p].board.reduce((n,u)=>n+(rule(u).focus||0),0);
// Cost of a hand card: base cost, its own change (Marco, Caterina, Chrysobull) and Andraste's discount (1 per two fallen
// minions).
// Buildings: the best buildingDiscount on the own board (Pionier 1, Vitruv 2), not added up; spells likewise the best
// spellDiscount (Leuchtturm von Pharos). costPerPlayed: 1 less for every n cards played in this game (both sides).
function cost(s,p,h){const c=D.byId[h.id],a=s.players[p],best=k=>a.board.reduce((n,u)=>Math.max(n,rule(u)[k]||0),0),off=c.building?best('buildingDiscount'):c.type==='spell'&&c.id!=='coin'?best('spellDiscount'):0;
 return Math.max(0,c.cost+(h.mod||0)-off-(c.costPerFallen?Math.floor((a.fallen||[]).length/c.costPerFallen):0)-(c.costPerPlayed?Math.floor((s.played||[]).length/c.costPerPlayed):0));}
// Freeze: the minion misses its next attack. Frozen in its own turn it stays frozen through the next one.
function freeze(s,id){const t=unit(s,id);if(!t||t.hero||t.obj.building)return;t.obj.frozen=s.active===t.p?2:1;emit(s,'freeze',{target:id});}

// ---------- Ergründen (discover) ----------
const collectible=c=>c.rarity!=='token';
// Pools: played (this game), foreign (cards of another hero), hero (own hero cards), age (cards of the own age, without one
// all age cards), ages (all age cards – Herodot), spell, building or any playable card.
function pool(s,p,kind){const own=s.players[p].hero,age=D.heroById[own].age;
 // Fu Hao (1.11.0): the top three cards of the own deck; the chosen one leaves the deck.
 if(kind==='deck')return [...new Set(s.players[p].deck.slice(0,3))];
 if(kind==='played')return [...new Set(s.played||[])];
 if(kind==='age'&&!D.cards.some(c=>c.age===age))kind='ages';
 return D.cards.filter(c=>kind==='foreign'?!!D.heroById[c.hero]&&c.hero!==own:kind==='hero'?c.hero===own:kind==='age'?c.age===age:kind==='ages'?!!c.age
  :D.playable(c,own)&&(kind==='spell'?c.type==='spell':kind==='building'?!!c.building:true)).map(c=>c.id);}
function offer(s,p,kind){const list=pool(s,p,kind).slice(),out=[];while(out.length<3&&list.length)out.push(list.splice(Math.floor(rand(s)*list.length),1)[0]);return out;}
function discover(s,p,e,auto){const left=e.n||1;for(let i=0;i<left;i++){const options=offer(s,p,e.pool);if(!options.length)return;
  if(auto||s.choice){take(s,p,pick(s,options),e.mod,e.pool);continue;}
  s.choice={p,pool:e.pool,options,left:left-i,mod:e.mod||0};emit(s,'choice',{p});return;}}
function take(s,p,id,mod,kind){const a=s.players[p];if(kind==='deck'){const i=a.deck.indexOf(id);if(i>=0)a.deck.splice(i,1);}if(a.hand.length>=10){a.grave.push(id);emit(s,'burn',{p,id});log(s,D.byId[id].name+' verbrannt (Hand voll).');return;}
 const h={id,uid:'c'+s.nextId++};if(mod)h.mod=mod;a.hand.push(h);emit(s,'discover',{p,id});log(s,heroName(s,p)+' ergründet eine Karte.');}
function choose(s,index){const c=s.choice;s.choice=null;take(s,c.p,c.options[index],c.mod,c.pool);
 if(c.left>1){const options=offer(s,c.p,c.pool);if(options.length){s.choice={...c,options,left:c.left-1};emit(s,'choice',{p:c.p});}}}

// ---------- Effects ----------
// ctx: {spell} adds Weisheit to damage, {auto} resolves Ergründen at random (Theon's echo at the end of a turn).
function effects(s,p,list,target,source,ctx={}){const a=s.players[p],enemy=s.players[1-p],plus=ctx.spell?focus(s,p):0;for(const e of list||[]){const t=unit(s,target);switch(e.type){
// noToken (1.10.0, Kandake): no reward for a summoned token – novices and boundary stones no longer feed Ahhotep's cards.
case 'damage':hurt(s,target,e.n+plus);if(e.onKill&&t&&!t.hero&&t.obj.health<=0&&!(e.noToken&&D.byId[t.obj.id].rarity==='token'))effects(s,p,e.onKill,null,source,ctx);break;case 'heal':heal(s,target,e.n);break;case 'face':hurt(s,'h'+(1-p),e.n+plus);break;case 'selfDamage':hurt(s,'h'+p,e.n);break;
case 'armor':a.armor+=e.n;emit(s,'armor',{target:'h'+p,n:e.n});break;
case 'healHero':heal(s,'h'+p,e.n);break;case 'draw':{const got=draw(s,p,e.n+(e.per==='building'?Math.min(e.max||7,a.board.filter(u=>u.building).length):0));if(e.mod)for(const h of got)h.mod=(h.mod||0)+e.mod;break;}
case 'mana':a.mana=Math.min(10,a.mana+e.n);break;
case 'heroAttack':a.tempAttack+=e.n;break;
case 'weapon':a.weapon={attack:e.n,durability:e.durability};emit(s,'weapon',{p});break;
case 'weaponUp':if(a.weapon){a.weapon.attack+=e.n;a.weapon.durability+=e.n;emit(s,'weapon',{p});}break;
case 'buff':if(t&&!t.hero){t.obj.attack+=e.n;t.obj.maxHealth+=e.health||0;t.obj.health+=e.health||0;emit(s,'buff',{target});}break;
case 'shield':if(t&&!t.hero){t.obj.shield=true;emit(s,'buff',{target});}break;
case 'buffAll':for(const u of minions(a)){if(e.excludeSelf&&u.uid===source||e.only&&!u[e.only])continue;u.attack+=e.n;u.health+=e.health||0;u.maxHealth+=e.health||0;emit(s,'buff',{target:u.uid});}break;
case 'summon':for(let i=e.n+(e.bonusIf&&has(a,e.bonusIf)?1:0);i>0;i--)summon(s,p,e.token);break;
// Ragnar: one of the tokens that is not on the board yet.
case 'summonNew':{const avail=e.tokens.filter(id=>!a.board.some(u=>u.id===id));if(avail.length)summon(s,p,avail[Math.floor(rand(s)*avail.length)]);break;}
// Step pyramid: the weakest own minion grows.
case 'buffWeakest':{const list=minions(a);if(!list.length)break;const w=list.reduce((m,u)=>u.attack+u.health<m.attack+m.health?u:m);w.attack+=e.n;w.health+=e.health||0;w.maxHealth+=e.health||0;emit(s,'buff',{target:w.uid});break;}
case 'healAll':heal(s,'h'+p,e.n);for(const u of a.board)heal(s,u.uid,e.n);break;
case 'aoe':for(const u of [...enemy.board,...(e.both?a.board:[])])if(!u.building)hurt(s,u.uid,e.n+plus);if(e.heroes)hurt(s,'h'+(1-p),e.n+plus);break;
case 'freeze':if(e.all){for(const u of minions(enemy))if(u.health>0&&u.attack>=(e.minAttack||0))freeze(s,u.uid);}else if(e.random){const list=minions(enemy).filter(u=>u.health>0&&!u.stealth&&!u.frozen);if(list.length)freeze(s,pick(s,list).uid);}else if(t&&t.obj.health>0)freeze(s,target);break;
case 'discover':discover(s,p,e,ctx.auto);break;
case 'silence':if(t&&!t.hero)silence(s,target);break;
// New in 1.9.0 (AP 5.10): keywords on a minion, random targets, buildings and more.
case 'grant':if(t&&!t.hero&&!t.obj.building){t.obj[e.key]=true;if(e.key==='rush'||e.key==='charge')t.obj.ready=t.obj.attacks<(t.obj.double?2:1);emit(s,'buff',{target});}break;
case 'grantAll':for(const u of minions(a)){if(e.only&&!u[e.only])continue;u[e.key]=true;if(e.key==='rush'||e.key==='charge')u.ready=u.attacks<(u.double?2:1);emit(s,'buff',{target:u.uid});}break;
case 'grantRandom':{const list=minions(a).filter(u=>!u[e.key]&&u.health>0);if(list.length){const u=pick(s,list);u[e.key]=true;emit(s,'buff',{target:u.uid});}break;}
case 'buffSelf':{const u=unit(s,source),k=e.per==='minion'?minions(a).filter(x=>x.uid!==source).length:1;if(u&&!u.hero&&k){u.obj.attack+=e.n*k;u.obj.health+=(e.health||0)*k;u.obj.maxHealth+=(e.health||0)*k;emit(s,'buff',{target:source});}break;}
case 'buffRandom':{const list=minions(a).filter(u=>u.uid!==source&&u.health>0);if(list.length){const u=pick(s,list);u.attack+=e.n;u.health+=e.health||0;u.maxHealth+=e.health||0;emit(s,'buff',{target:u.uid});}break;}
case 'randomDamage':for(let i=0,times=e.per==='taunt'?minions(a).filter(u=>u.taunt&&u.health>0).length:e.times||1;i<times;i++){const list=[...(e.minions||e.board?[]:['h'+(1-p)]),...enemy.board.filter(u=>!u.stealth&&u.health>0&&!(e.minions&&u.building)).map(u=>u.uid)];if(!list.length)break;hurt(s,pick(s,list),e.n+plus);}break;
// Perikles: the weakest own building gains durability; without a building the else effects apply.
case 'fortify':{const list=a.board.filter(u=>u.building&&u.health>0);if(list.length){const w=list.reduce((m,u)=>u.health<m.health?u:m);w.health+=e.n;w.maxHealth+=e.n;emit(s,'buff',{target:w.uid});}else effects(s,p,e.else,target,source,ctx);break;}
case 'bounce':if(t&&!t.hero)bounce(s,target);break;
case 'destroy':if(t&&!t.hero&&!t.obj.building){t.obj.health=0;emit(s,'destroy',{target});}break;
case 'enemyOverload':enemy.overload=(enemy.overload||0)+e.n;break;
// Gorgo: one hoplite for every enemy minion.
case 'summonPerEnemy':{const n=minions(enemy).length;for(let i=0;i<n;i++)summon(s,p,e.token);break;}
// Andraste: the minion(s) of this player that died last return.
case 'revive':for(const id of (a.fallen||[]).slice(-e.n))summon(s,p,id);break;
case 'totems':for(const id of ['totem_heal','totem_fire','totem_guard','totem_strength'])summon(s,p,id);break;
// Kojirō: he and the chosen minion trade blows until one of them falls.
case 'duel':{const k=unit(s,source);if(!k||!t||t.hero||t.p===p)break;for(let r=0;r<12&&k.obj.health>0&&t.obj.health>0;r++){if(!k.obj.attack&&!t.obj.attack)break;emit(s,'attack',{source,target,duel:true});hurt(s,target,k.obj.attack,source);hurt(s,source,t.obj.attack,target);}break;}
// Welle 2 (1.11.0): Epaminondas' schiefe Schlachtordnung strengthens the leftmost own minion (no building).
case 'buffLeft':{const u=minions(a).find(u=>u.health>0);if(u){u.attack+=e.n;u.health+=e.health||0;u.maxHealth+=e.health||0;for(const k of e.grant||[])u[k]=true;emit(s,'buff',{target:u.uid});}break;}
// Mandukhai: with at least n own minions the then effects apply, else the others.
case 'ifMinions':effects(s,p,minions(a).filter(u=>u.health>0).length>=e.n?e.then:e.else,target,source,ctx);break;
// Zenobia: the chosen enemy minion changes sides (no room: it is destroyed).
case 'steal':{if(!t||t.hero||t.p===p)break;const u=t.obj;if(a.board.length>=7){u.health=0;break;}enemy.board=enemy.board.filter(x=>x!==u);const c=D.byId[u.id];
 Object.assign(u,{ready:!!(c.charge||c.rush),attacks:0,fresh:true});delete u.frozen;a.board.push(u);emit(s,'steal',{p,target:u.uid});log(s,heroName(s,p)+' übernimmt '+c.name+'.');auras(s);break;}
// Hinterhalte (AP 5.6): the attack fails, the spell is foiled, a defender takes the blow, a copy of the spell for the hand.
case 'cancel':if(ctx.ambush)ctx.ambush.cancel=true;break;
case 'counter':if(ctx.ambush)ctx.ambush.counter=true;break;
case 'decoy':{const u=summon(s,p,e.token);if(u&&ctx.ambush)ctx.ambush.redirect=u.uid;break;}
case 'copySpell':{const id=ctx.ambush?.spell;if(!id)break;if(a.hand.length>=10){a.grave.push(id);emit(s,'burn',{p,id});}else{a.hand.push({id,uid:'c'+s.nextId++});emit(s,'draw',{p});}break;}
}}}
// ---------- Hinterhalte (AP 5.6) ----------
// An ambush is a spell with a trigger (card.ambush). Played, it lies hidden as a sealed roll beside its hero (player.ambush,
// at most three, never the same card twice) and springs in the rival's turn when its trigger happens: attack – an enemy
// minion attacks, hero – it attacks the own hero, defend – it attacks an own minion, minion – the rival plays a minion,
// spell – the rival casts a spell (not the Gunst der Stunde), death – an own minion dies. Its effects aim at the attacker
// or the played minion; info collects what they decided (cancel, counter, redirect). s.blind hides the ambushes of one side
// from the AI's look-ahead: it knows they lie there, not what they do.
const AMBUSH_MAX=3;
const ambushes=a=>a.ambush||[];
const canSet=(a,c)=>ambushes(a).length<AMBUSH_MAX&&!ambushes(a).some(x=>x.id===c.id);
function spring(s,q,kinds,info){const a=s.players[q];let n=0;if(s.phase!=='play'||s.active===q||s.blind===q||!ambushes(a).length)return n;
 for(const x of [...a.ambush]){const c=D.byId[x.id];if(!kinds.includes(c.ambush))continue;if(info.counter||info.cancel||info.redirect)break;
  // An ambush aimed at a unit that is already gone stays hidden.
  if(info.target){const t=unit(s,info.target);if(!t||t.obj.health<=0)break;}
  a.ambush=a.ambush.filter(y=>y!==x);a.grave.push(x.id);s.played=[...(s.played||[]),x.id];emit(s,'ambush',{p:q,id:x.id,target:info.target||null});log(s,'Hinterhalt: '+c.name+'.');
  n++;effects(s,q,c.effects,info.target||null,null,{spell:true,auto:true,ambush:info});}return n;}
// Bannung: abilities, blessings and auras are gone; attack and maximum health fall back to the card.
function silence(s,id){const t=unit(s,id);if(!t||t.hero)return;const u=t.obj,c=D.byId[u.id];
 for(const k of ['taunt','shield','rush','double','stealth','plunder','poison','frozen','auraTaunt','auraAtk','auraHp'])delete u[k];u.taunt=false;u.shield=false;
 u.silenced=true;u.attack=c.attack;u.maxHealth=c.health;u.health=Math.min(u.health,c.health);emit(s,'silence',{target:id});auras(s);}
// Scherbengericht: the minion returns to its owner's hand as the plain card (full hand: it burns).
function bounce(s,id){const t=unit(s,id);if(!t||t.hero||t.obj.building)return;const a=s.players[t.p],u=t.obj;a.board=a.board.filter(x=>x!==u);emit(s,'bounce',{target:id,p:t.p,id:u.id});
 if(a.hand.length>=10){a.grave.push(u.id);emit(s,'burn',{p:t.p,id:u.id});}else a.hand.push({id:u.id,uid:'c'+s.nextId++});log(s,D.byId[u.id].name+' kehrt auf die Hand zurück.');auras(s);}
function fall(s,p,u){const a=s.players[p];a.grave.push(u.id);if(!u.building)a.fallen=[...(a.fallen||[]),u.id];emit(s,'death',{target:u.uid,p,id:u.id,building:!!u.building});log(s,D.byId[u.id].name+(u.building?' stürzt ein.':' wurde besiegt.'));}
function settle(s){let loops=0;while(loops++<40){const dead=[];for(let p=0;p<2;p++){const a=s.players[p];for(const u of a.board)if(u.health<=0)dead.push({p,u});a.board=a.board.filter(u=>u.health>0);}auras(s);if(!dead.length)break;for(const {p,u} of dead)fall(s,p,u);
 for(const {p,u} of dead){const twice=s.players[p].board.some(b=>rule(b).doubleDeath&&b.health>0);for(let k=twice?2:1;k>0;k--)effects(s,p,rule(u).death,null,u.uid);}
 for(const {u} of dead)if(!u.building)for(let q=0;q<2;q++)for(const b of [...s.players[q].board])if(rule(b).anyDeath&&b.health>0)effects(s,q,rule(b).anyDeath,null,b.uid);
 for(const {p,u} of dead)if(!u.building)spring(s,p,['death'],{});}
const a=s.players[0].health<=0,b=s.players[1].health<=0;if(a||b){s.phase='over';s.winner=a&&b?-1:a?1:0;s.choice=null;emit(s,'over',{winner:s.winner});log(s,s.winner===-1?'Unentschieden.':heroName(s,s.winner)+' gewinnt.');}}
function validTargets(s,p,kind,card){const all=['h0','h1',...s.players[0].board.map(u=>u.uid),...s.players[1].board.map(u=>u.uid)];return all.filter(id=>{const t=unit(s,id);if(!t.hero&&t.p!==p&&t.obj.stealth)return false;if(kind==='any')return true;if(kind==='minion')return !t.hero;if(kind==='friendlyMinion')return !t.hero&&t.p===p&&!t.obj.building;if(kind==='enemy')return t.p!==p;
 if(kind==='enemyMinion')return !t.hero&&t.p!==p&&!t.obj.building&&(card?.targetMax==null||t.obj.attack<=card.targetMax)&&(!card?.targetFrozen||!!t.obj.frozen);return false;});}
function targetKind(s,p,action){if(action.type==='play'){const h=s.players[p].hand.find(c=>c.uid===action.uid),c=h&&D.byId[h.id];if(!c||!c.target)return null;
  // A minion whose Einmarsch finds no target is still played (without it).
  return c.type==='minion'&&!validTargets(s,p,c.target,c).length?null:c.target;}
 if(action.type==='power'){const k=heroOf(s.players[p]).ability.target;return k==='random'||k==='randomMinion'?null:k;}return null;}
function heroAttack(a){return a.tempAttack+(a.weapon?a.weapon.attack:0);}
// Vorstoß: in the turn it arrived a minion may only attack minions.
// Tarnung: a hidden minion can't be attacked, and its Schildwall doesn't count.
// Große Mauer: no enemy minion may attack this hero in the turn it appeared.
function attackTargets(s,p,uid){const foe=s.players[1-p],seen=foe.board.filter(u=>!u.stealth),taunts=seen.filter(u=>u.taunt),u=uid&&s.players[p].board.find(x=>x.uid===uid);
 const list=taunts.length?taunts.map(u=>u.uid):['h'+(1-p),...seen.map(u=>u.uid)];
 return u&&u.fresh&&(u.rush||foe.board.some(b=>rule(b).wall&&b.health>0))?list.filter(id=>id!=='h'+(1-p)):list;}
const canAttack=u=>u.ready&&!u.building&&!u.frozen&&u.attack>0&&u.attacks<(u.double?2:1);
// Conditions follow from the effects: room to summon, a token still missing, something to discover.
function canPower(s,p){const a=s.players[p],h=heroOf(a),ab=h.ability;if(s.phase!=='play'||s.active!==p||s.choice||a.powerUsed||a.mana<h.cost)return false;
 if(ab.target==='randomMinion'&&!randomMinions(s,p).length)return false;
 const ok=e=>e.type==='summon'||e.type==='summonNew'?a.board.length<7&&(e.type==='summon'||e.tokens.some(id=>!a.board.some(u=>u.id===id)))
  :e.type==='discover'?pool(s,p,e.pool).length>0:e.type==='fortify'&&!a.board.some(u=>u.building)?e.else.every(ok)
  :e.type==='buffLeft'||e.type==='buffWeakest'?minions(a).length>0:e.type==='randomDamage'&&e.minions?randomMinions(s,p).length>0:e.type==='ifMinions'?(minions(a).length>=e.n?e.then:e.else).every(ok):true;
 return ab.effects.every(ok);}
// Amanirenas: the visible enemy minions (no buildings) a random power can hit.
const randomMinions=(s,p)=>s.players[1-p].board.filter(u=>!u.stealth&&!u.building&&u.health>0).map(u=>u.uid);
function legal(s,p=s.active){if(s.phase!=='play'||s.active!==p)return [];
 if(s.choice)return s.choice.p===p?s.choice.options.map((_,index)=>({type:'choose',index})):[];
 const a=s.players[p],out=[];for(const h of a.hand){const c=D.byId[h.id];if(cost(s,p,h)>a.mana||c.type==='minion'&&a.board.length>=7||c.ambush&&!canSet(a,c))continue;if(c.target){const ts=validTargets(s,p,c.target,c);for(const target of ts)out.push({type:'play',uid:h.uid,target});if(!ts.length&&c.type==='minion')out.push({type:'play',uid:h.uid});}else out.push({type:'play',uid:h.uid});}
if(canPower(s,p)){const k=targetKind(s,p,{type:'power'});if(k)for(const target of validTargets(s,p,k))out.push({type:'power',target});else out.push({type:'power'});}
const sources=a.board.filter(canAttack).map(u=>u.uid);if(!a.attacked&&heroAttack(a)>0)sources.push('h'+p);for(const uid of sources)for(const target of attackTargets(s,p,uid))out.push({type:'attack',uid,target});out.push({type:'end'});return out;}
function equalAction(a,b){return a.type===b.type&&a.uid===b.uid&&a.target===b.target&&(a.type!=='choose'||a.index===b.index);}
function power(s,p,target){const a=s.players[p],h=heroOf(a),ab=h.ability;a.powerUsed=true;a.mana-=h.cost;
 if(ab.target==='random'){const foes=['h'+(1-p),...s.players[1-p].board.filter(u=>!u.stealth).map(u=>u.uid)];target=foes[Math.floor(rand(s)*foes.length)];}
 if(ab.target==='randomMinion')target=pick(s,randomMinions(s,p));
 emit(s,'power',{p,target:target||'h'+p});log(s,heroName(s,p)+' nutzt '+h.power+'.');effects(s,p,ab.effects,target,null);}
function boss(s){if(s.mission==null||s.active!==1)return;const m=D.missions[s.mission],a=s.players[1],n=a.turns;switch(m.ability){case 'armor':a.armor+=2;break;case 'draw':if(n%3===0)draw(s,1);break;case 'heal':heal(s,'h1',2);break;case 'weapon':if(n%3===0)a.weapon={attack:2,durability:2};break;case 'arrow':hurt(s,'h0',1);break;case 'recruit':if(n%2===0)summon(s,1,'recruit');break;case 'storm':if(n%3===0)effects(s,1,[{type:'aoe',n:1}]);break;case 'shield':if(a.board[0])a.board[0].shield=true;break;case 'totem':if(n%3===0)summon(s,1,'totem_fire');break;case 'final':a.armor+=2;if(a.board.length){a.board[0].attack++;a.board[0].maxHealth++;a.board[0].health++;}break;
 // Missions since 1.9.0 describe their boss as data: effects every n-th own turn.
 default:if(m.effects&&n%(m.every||1)===0)effects(s,1,m.effects,null,null,{auto:true});}emit(s,'boss',{p:1});}
// Start of a turn: buildings and minions with a start trigger act first (the step pyramid strengthens the weakest own
// minion), then the draw.
function startTurn(s,p){s.active=p;s.turn++;const a=s.players[p];a.turns++;a.maxMana=Math.min(10,a.maxMana+1);a.locked=a.overload||0;a.overload=0;a.mana=Math.max(0,a.maxMana-a.locked);a.powerUsed=false;a.attacked=false;a.tempAttack=0;for(const u of a.board){u.ready=!u.building;u.attacks=0;delete u.fresh;}
 for(const u of [...a.board])if(rule(u).start&&u.health>0&&a.board.includes(u))effects(s,p,rule(u).start,null,u.uid);
 draw(s,p);boss(s);settle(s);emit(s,'turn',{p});log(s,'Zug '+s.turn+': '+heroName(s,p)+'.');}
// Theon: the last spell of this player once more, with random targets.
function echo(s,p){const a=s.players[p],c=a.lastSpell&&D.byId[a.lastSpell];if(!c)return;let target=null;
 if(c.target){const ts=validTargets(s,p,c.target,c);if(!ts.length)return;target=pick(s,ts);}
 emit(s,'echo',{p,id:c.id,target});log(s,'Theon wirkt '+c.name+' erneut.');effects(s,p,c.effects,target,null,{spell:true,auto:true});}
function endTurn(s,p){const a=s.players[p];for(const u of [...a.board]){if(u.health<=0||!a.board.includes(u))continue;const passive=rule(u).passive;if(passive==='heal')for(const t of a.board)heal(s,t.uid,1);if(passive==='fire')hurt(s,'h'+(1-p),1);if(passive==='strength'){const others=minions(a).filter(x=>x.uid!==u.uid);if(others.length){const t=others[Math.floor(rand(s)*others.length)];t.attack++;emit(s,'buff',{target:t.uid});}}
  if(passive==='echo'){echo(s,p);settle(s);if(s.phase==='over')return;}
  if(passive==='regent'){for(const h of draw(s,p))h.mod=(h.mod||0)-2;hurt(s,'h'+p,1);}
  if(rule(u).end)effects(s,p,rule(u).end,null,u.uid,{auto:true});}
 for(const u of a.board)if(u.frozen&&!--u.frozen)delete u.frozen;
 a.tempAttack=0;settle(s);if(s.phase!=='over'){if(s.turn>=120){s.phase='over';s.winner=-1;emit(s,'over',{winner:-1});}else startTurn(s,1-p);}}
// Subutai's pincer: another own minion joins the attack on the same target (without spending its own attack).
function pincer(s,p,attacker,target){const a=s.players[p];if(!has(a,'khan_9')||attacker.id==='khan_9')return;const t=unit(s,target);if(!t||t.obj.health<=0)return;
 const list=minions(a).filter(u=>u!==attacker&&u.id!=='khan_9'&&u.health>0&&u.attack>0&&!u.frozen);if(!list.length)return;const u=pick(s,list);
 emit(s,'attack',{source:u.uid,target,pincer:true});delete u.stealth;const back=t.hero?0:t.obj.attack;hurt(s,target,u.attack,u.uid);hurt(s,u.uid,back,target);}
function apply(s,action){if(!legal(s).some(x=>equalAction(x,action)))return {ok:false,error:'Diese Aktion ist nicht möglich.'};if(action.position!=null){const hc=s.players[s.active].hand.find(h=>h.uid===action.uid);if(action.type!=='play'||!hc||D.byId[hc.id].type!=='minion'||!Number.isInteger(action.position)||action.position<0||action.position>s.players[s.active].board.length)return {ok:false,error:'Ungültige Position.'};}s.events=[];const p=s.active,a=s.players[p];switch(action.type){
case 'play':{const i=a.hand.findIndex(c=>c.uid===action.uid),hc=a.hand[i],c=D.byId[hc.id],info={};a.mana-=cost(s,p,hc);a.hand.splice(i,1);
 // A Hinterhalt is laid face down: the rival learns that it lies there, not which one.
 emit(s,'play',{p,id:c.id,target:action.target,spell:c.type==='spell',...(c.ambush?{ambush:true}:{})});log(s,heroName(s,p)+(c.ambush?' legt einen Hinterhalt.':' spielt '+c.name+'.'));
 if(c.type==='minion'){const u=summon(s,p,c.id,action.position);effects(s,p,c.battle,action.target,u&&u.uid);if(u)spring(s,1-p,['minion'],{target:u.uid});}
 else{info.spell=c.id;if(c.id!=='coin')spring(s,1-p,['spell'],info);
  if(info.counter){a.grave.push(c.id);emit(s,'counter',{p,id:c.id});log(s,c.name+' wird vereitelt.');}
  else if(c.ambush)a.ambush=[...ambushes(a),{id:c.id,uid:hc.uid}];
  else{a.grave.push(c.id);if(c.id!=='coin')a.lastSpell=c.id;effects(s,p,c.effects,action.target,null,{spell:true});}}
 if(c.overload)a.overload=(a.overload||0)+c.overload;
 // A laid Hinterhalt counts as played once it is revealed (spring, counter) – Anna's Alexiade must not show it before.
 if(collectible(c)&&!(c.ambush&&!info.counter))s.played=[...(s.played||[]),c.id];break;}
case 'choose':choose(s,action.index);break;
case 'power':power(s,p,action.target);break;
case 'attack':{let from=unit(s,action.uid),target=action.target,cancel=false;
 // Hinterhalte of the defender (AP 5.6) spring before the blow: the attacker may fall, freeze, turn back or meet a defender.
 if(!from.hero){const info={target:action.uid};if(spring(s,1-p,unit(s,target).hero?['attack','hero']:['attack','defend'],info)){
  if(info.redirect)target=info.redirect;cancel=!!info.cancel;settle(s);if(s.phase==='over')break;from=unit(s,action.uid);}}
 const to=unit(s,target),fight=!cancel&&!!from&&!!to&&from.obj.health>0&&to.obj.health>0;
 if(fight){const damage=from.hero?heroAttack(from.obj):from.obj.attack,retaliation=to.hero?0:to.obj.attack;emit(s,'attack',{source:action.uid,target});if(!from.hero)delete from.obj.stealth;hurt(s,target,damage,action.uid);hurt(s,action.uid,retaliation,target);}
 if(from){if(from.hero){a.attacked=true;if(a.weapon){a.weapon.durability--;if(a.weapon.durability<=0)a.weapon=null;}}else{delete from.obj.stealth;from.obj.attacks++;from.obj.ready=from.obj.attacks<(from.obj.double?2:1);if(fight)pincer(s,p,from.obj,target);}
  if(fight)log(s,(from.hero?heroName(s,p):D.byId[from.obj.id].name)+' greift an.');}break;}
case 'end':endTurn(s,p);break;}settle(s);return {ok:true};}
function starter(hero){const ids=[...Array.from({length:4},(_,i)=>hero+'_'+i),...Array.from({length:11},(_,i)=>'neutral_'+i)];return ids.flatMap(id=>[id,id]);}
function randomDeck(hero,seed=1234){const s={seed:seed||1};const pool=D.cards.filter(c=>D.playable(c,hero));const counts={},out=[];const costs=[1,2,2,3,3,4,4,5,6,7];for(let i=0;i<30;i++){let opts=pool.filter(c=>(counts[c.id]||0)<(c.rarity==='legendary'?1:2));const desired=costs[i%costs.length];let near=opts.filter(c=>Math.abs(c.cost-desired)<=1);if(near.length)opts=near;const c=opts[Math.floor(rand(s)*opts.length)];counts[c.id]=(counts[c.id]||0)+1;out.push(c.id);}return out;}
function create(opts={}){const hero=opts.hero||'leonidas',foe=opts.foe||'hypatia',first=opts.first==null?0:opts.first;const s={version:1,seed:opts.seed||1234567,nextId:1,players:[],active:first,turn:0,phase:'mulligan',winner:null,mode:opts.mode||'free',mission:opts.mission==null?null:opts.mission,events:[],log:[],rewarded:false};for(let p=0;p<2;p++){const hid=p===0?hero:foe;const health=p===1&&s.mission!=null?D.missions[s.mission].health:30;s.players.push({hero:hid,health,maxHealth:health,armor:0,mana:0,maxMana:0,hand:[],deck:shuffle(s,[...(p===0?(opts.deck||starter(hid)):(opts.enemyDeck||randomDeck(hid,s.seed)))]),board:[],grave:[],weapon:null,tempAttack:0,attacked:false,powerUsed:false,fatigue:0,turns:0});draw(s,p,p===first?3:4);}s.events=[];return s;}
function mulligan(s,ids=[]){if(s.phase!=='mulligan')return false;for(let p=0;p<2;p++){const a=s.players[p];const replace=a.hand.filter(c=>p===0?ids.includes(c.uid):D.byId[c.id].cost>=4);a.hand=a.hand.filter(c=>!replace.includes(c));draw(s,p,replace.length);a.deck.push(...replace.map(c=>c.id));shuffle(s,a.deck);}s.players[1-s.active].hand.push({id:'coin',uid:'c'+s.nextId++});s.phase='play';s.events=[];startTurn(s,s.active);return true;}

// ---------- AI ----------
// Extra worth of legendaries whose rule keeps working while they stand (AP 5.8, part 1).
const SPECIAL={leonidas_9:2,hypatia_9:2.5,khan_9:3.5,nostradamus_9:1.5,jeanne_9:2,ragnar_9:1.5,anna_9:1.5,nezahualcoyotl_9:1.5,masako_9:2.5};
// What a building does every turn or while it stands (1.10.0) – the reason to besiege it (AP 5.5).
function impact(c){const b=c.buffAura;return (c.start||c.end||c.passive?2.5:0)+(b?((b.attack||0)*1.65+(b.health||0))*1.6:0)+(c.buildingDiscount?1:0)+(c.spellDiscount||0)*1.5+(c.focus||0)*1.6
 +(c.anyDeath?1.2:0)+(c.onDamage?1:0)+(c.healDouble?.8:0)+(c.doubleDeath?1.6:0)+(c.wall?1.2:0)+(c.death?1.2:0);}
// Buildings: a building that does nothing is a wall – its durability counts little, so the AI ignores it unless it blocks
// (Schildwall). The more it does, the more each point of durability and its fall are worth: then the AI besieges it.
function buildingValue(u,c){if(u.silenced)return u.health*.25+(u.taunt?1:0);const k=impact(c);
 return u.health*Math.min(.7,.2+.1*k)+1.5+k*1.4+(u.taunt?2.5+u.health*.5:0);}
function unitValue(u){const c=rule(u);if(u.building)return buildingValue(u,c);
 return u.attack*1.65+u.health+u.shield*2.7+u.taunt*1.1+(c.death?1.7:0)+(c.passive||c.start||c.end?2:0)+(c.onHeal||c.allyHeal||c.onDamage?1.5:0)+(c.buildingDiscount?1:0)+(u.double?u.attack*1.1:0)+(c.focus||0)*1.6+(u.silenced?0:SPECIAL[u.id]||0)-(u.frozen?u.attack*1.1:0)
  +(u.plunder?u.attack*.6:0)+(u.poison?2.4:0)+(u.stealth?u.attack*.35+.6:0);}
// AI personality (AP 5.8 part 2), a field of the hero: aggressive heroes weigh the enemy hero's life higher, defensive ones
// their own life and a cleared board, combining ones cards in hand, Ergründen and every different own unit that keeps
// working (triggers, auras, Weisheit, discounts). Small factors: the style shows, the strength stays.
const STYLE={aggressive:{face:1.3,guard:.95,clear:1,cards:1,engine:0},defensive:{face:.95,guard:1.12,clear:1.06,cards:1,engine:0},combo:{face:1,guard:1,clear:1,cards:1.12,engine:.8}};
const NEUTRAL={face:1,guard:1,clear:1,cards:1,engine:0};
const engines=a=>new Set(a.board.filter(u=>{const c=rule(u);return c.passive||c.start||c.end||c.buffAura||c.focus||c.aura||c.allyHeal||c.onHeal||c.spellDiscount||c.buildingDiscount||c.anyDeath;}).map(u=>u.id)).size;
function value(s,p){if(s.phase==='over')return s.winner===p?100000:s.winner===-1?0:-100000;const own=s.players[p],foe=s.players[1-p],W=STYLE[heroOf(own).ai]||NEUTRAL;
const board=a=>a.board.reduce((v,u)=>v+unitValue(u),0);
const hand=a=>a.hand.length*1.7+a.hand.reduce((v,h)=>v-(h.mod||0)*.35,0);
const health=a=>a.health*.5+a.armor*.36-(a.health<13?(13-a.health)*1.6:0);return board(own)+(W.engine?engines(own)*W.engine:0)-board(foe)*1.08*W.clear+health(own)*W.guard-health(foe)*W.face+hand(own)*W.cards-hand(foe)*1.4/1.7+(s.choice&&s.choice.p===p?s.choice.left*1.9*W.cards:0)+(own.weapon?own.weapon.attack*own.weapon.durability*.9:0)-(foe.weapon?foe.weapon.attack*foe.weapon.durability*.9:0)+Math.min(own.deck.length,5)*.1-(own.overload||0)*1.1+(foe.overload||0)*1.1+ambushes(own).reduce((v,x)=>v+AMBUSH_WORTH(D.byId[x.id]),0);}
// A laid Hinterhalt (AP 5.6) is worth more than the card in hand – it only waits for its moment.
const AMBUSH_WORTH=c=>1.2+c.cost*1.1;
// Rough worth of a card offered by Ergründen: strong for its cost, and playable soon.
function cardWorth(s,p,id,mod=0){const c=D.byId[id],a=s.players[p],k=Math.max(0,c.cost+mod);let v=c.cost*1.4+({legendary:2.5,epic:1.5,rare:.8}[c.rarity]||0);
 if(c.type==='minion')v+=(c.attack*1.65+c.health)*.25+(c.taunt?.6:0)+(c.shield?.8:0)+(c.charge||c.rush?.7:0)+(c.plunder||c.poison||c.stealth?.6:0);v-=(c.overload||0)*.8;
 if(c.target&&!validTargets(s,p,c.target,c).length&&c.type==='spell')v-=4;return v-Math.max(0,k-(a.maxMana+1))*1.6;}
function ai(s,p=s.active){if(s.phase!=='play'||s.active!==p)return null;const acts=legal(s,p);if(acts.length===1)return acts[0];
 if(s.choice){const c=s.choice;return acts.reduce((b,x)=>cardWorth(s,p,c.options[x.index],c.mod)>cardWorth(s,p,c.options[b.index],c.mod)?x:b);}
 // Hinterhalte (AP 5.6): the look-ahead plays on a copy where the rival's ambushes stay hidden (s.blind) – the AI knows
 // that they lie there, not what they do. It fears them a little: its cheaper minions attack first, spells wait a little.
 const fear=Math.min(2,ambushes(s.players[1-p]).length),look=fear?Object.assign(copy(s),{blind:1-p}):s;
 const risk=a=>!fear?0:a.type==='attack'&&a.uid[0]!=='h'?.08*fear*unitValue(unit(s,a.uid).obj):a.type==='play'&&D.byId[s.players[p].hand.find(h=>h.uid===a.uid).id].type==='spell'?.05*fear*D.byId[s.players[p].hand.find(h=>h.uid===a.uid).id].cost:0;
 const baseline=value(look,p);let ranked=[];for(const a of acts){if(a.type==='end')continue;const c=copy(look);apply(c,a);const v=value(c,p);if(c.phase==='over'&&c.winner===p)return a;let tie=a.type==='play'?.2:a.type==='power'?.05:0;ranked.push({a,c,v:v+tie-risk(a)});}ranked.sort((a,b)=>b.v-a.v);
// Check sequences of attacks / damage spells for lethal without peeking into the rival hand or deck.
const lethal=lethalPlan(look,p,250);if(lethal&&lethal.length)return lethal[0];
let best={a:{type:'end'},score:baseline-.15};for(const r of ranked.slice(0,8)){let score=r.v;for(const a2 of legal(r.c,p).filter(a=>a.type!=='end')){const c2=copy(r.c);apply(c2,a2);if(c2.winner===p&&c2.phase==='over')return r.a;score=Math.max(score,value(c2,p)*.62+r.v*.38);}if(score>best.score){best={a:r.a,score};}}return best.a;}
// Hero powers that can add to a lethal turn.
const HITS=['damage','face','heroAttack','weapon','randomDamage'];
function lethalPlan(s,p,budget=200){let remaining=budget;function go(st,path,depth){if(st.phase==='over')return st.winner===p?path:null;if(depth<=0||remaining--<=0)return null;const a=st.players[p],b=st.players[1-p];const rough=a.board.filter(canAttack).reduce((v,u)=>v+u.attack*(u.double?2-u.attacks:1),0)+heroAttack(a)+a.mana*4+4;if(b.health+b.armor>rough)return null;
let acts=legal(st,p).filter(x=>{if(x.type==='attack')return true;if(x.type==='power')return heroOf(a).ability.effects.some(e=>HITS.includes(e.type))&&(!x.target||x.target==='h'+(1-p)||unit(st,x.target).p!==p);if(x.type==='play'){const c=D.byId[a.hand.find(h=>h.uid===x.uid).id];return c.charge||c.rush||(c.effects||c.battle||[]).some(e=>['damage','face','buffAll','heroAttack','weapon','mana','duel','freeze','silence','randomDamage','destroy','bounce'].includes(e.type));}return false;});
acts.sort((x,y)=>(y.target==='h'+(1-p)?1:0)-(x.target==='h'+(1-p)?1:0));for(const action of acts.slice(0,18)){const c=copy(st);apply(c,action);const r=go(c,[...path,action],depth-1);if(r)return r;}return null;}return go(s,[],7);}
const api={STYLE,impact,silence,canSet,ambushes,AMBUSH_MAX,clone,copy,rand,shuffle,create,mulligan,legal,apply,unit,heroAttack,canPower,canAttack,targetKind,validTargets,attackTargets,starter,randomDeck,ai,value,lethalPlan,settle,summon,hurt,heal,effects,cost,focus,auras,cardWorth};if(typeof module!=='undefined')module.exports=api;else root.CHE=api;
})(typeof globalThis!=='undefined'?globalThis:this);
