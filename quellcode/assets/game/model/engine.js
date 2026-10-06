/* Deterministic rules engine. No DOM, clock or network dependencies.
 * Keywords (AP 5.4) keep their engine fields: taunt = Schildwall, shield = Göttliche Gunst, battle = Einmarsch,
 * death = Vermächtnis, charge = Sturmangriff. New in 1.7.0: rush (Vorstoß), freeze (Starre), discover (Ergründen,
 * a pending choice in s.choice), double (Doppelschlag), focus (Arkaner Fokus), buildings (Bauwerk), auras of the
 * legendaries and per-card cost changes in the hand. New in 1.8.0 (AP 5.4 part 2): plunder (Plünderung), stealth
 * (Tarnung), silence (Bannung, unit.silenced), poison (Tödliches Gift) and overload (Belastung, player.overload/locked).
 * Older saved games simply lack the new fields. */
(function(root){'use strict';
const D=typeof module!=='undefined'?require('./data.js'):root.CHD;
const clone=x=>JSON.parse(JSON.stringify(x));
// Fast copy of a game state for the AI look-ahead: same content as clone(), several times faster.
function copy(s){const o={...s,players:s.players.map(a=>{const b={...a,hand:a.hand.map(c=>({...c})),deck:a.deck.slice(),board:a.board.map(u=>({...u})),grave:a.grave.slice(),weapon:a.weapon&&{...a.weapon}};if(a.fallen)b.fallen=a.fallen.slice();return b;}),events:s.events.slice(),log:s.log.slice()};
 if(s.played)o.played=s.played.slice();if(s.choice)o.choice={...s.choice,options:s.choice.options.slice()};return o;}
function rand(s){let x=s.seed|0;x^=x<<13;x^=x>>>17;x^=x<<5;s.seed=x>>>0;return s.seed/4294967296;}
function shuffle(s,a){for(let i=a.length-1;i>0;i--){const j=Math.floor(rand(s)*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const pick=(s,list)=>list[Math.floor(rand(s)*list.length)];
function emit(s,type,extra={}){s.events.push({type,...extra});if(s.events.length>70)s.events.shift();}
function log(s,msg){s.log.push(msg);if(s.log.length>70)s.log.shift();}
function heroName(s,p){return p===1&&s.mission!=null?D.missions[s.mission].boss:D.heroes.find(h=>h.id===s.players[p].hero).name;}
function unit(s,id){for(let p=0;p<2;p++){if(id==='h'+p)return {obj:s.players[p],p,hero:true};const u=s.players[p].board.find(u=>u.uid===id);if(u)return {obj:u,p,hero:false};}return null;}
const maxHealth=t=>t.obj.maxHealth;
// Minions in the narrow sense: buildings occupy a place but are no Diener.
const minions=a=>a.board.filter(u=>!u.building);
const has=(a,id)=>a.board.filter(u=>u.id===id&&!u.silenced).length;
// The rules a unit still has: none after Bannung.
const NONE={};const rule=u=>u.silenced?NONE:D.byId[u.id];
// from: the attacking unit (uid or 'h0'/'h1'). Its Plünderung heals its hero, its Tödliches Gift destroys a damaged minion.
function hurt(s,id,n,from){const t=unit(s,id);if(!t||n<=0)return;const o=t.obj;if(!t.hero&&o.shield){o.shield=false;emit(s,'shield',{target:id});return;}let actual=n;if(t.hero){const a=Math.min(o.armor,n);o.armor-=a;actual-=a;}o.health-=actual;emit(s,'damage',{target:id,n,hero:t.hero});
 const src=from&&unit(s,from);if(!src||src.hero)return;if(src.obj.plunder)heal(s,'h'+src.p,n);if(src.obj.poison&&!t.hero&&!o.building&&o.health>0){o.health=0;emit(s,'poison',{target:id});}}
function heal(s,id,n){const t=unit(s,id);if(!t||t.obj.building)return;let k=Math.min(n,maxHealth(t)-t.obj.health);t.obj.health+=Math.max(0,k);if(k>0)emit(s,'heal',{target:id,n:k});}
// Draws n cards; returns the hand entries that arrived (Caterina lowers their cost).
function draw(s,p,n=1){const a=s.players[p],got=[];for(let i=0;i<n;i++){if(!a.deck.length){a.fatigue++;hurt(s,'h'+p,a.fatigue);log(s,heroName(s,p)+': Erschöpfung '+a.fatigue+'.');continue;}const id=a.deck.shift();if(a.hand.length>=10){a.grave.push(id);emit(s,'burn',{p,id});log(s,D.byId[id].name+' verbrannt (Hand voll).');}else{const h={id,uid:'c'+s.nextId++};a.hand.push(h);got.push(h);emit(s,'draw',{p});}}return got;}
function summon(s,p,id,position){const a=s.players[p];if(a.board.length>=7)return null;const c=D.byId[id];if(!c||c.type!=='minion')return null;
 const u={uid:'u'+s.nextId++,id,attack:c.attack,health:c.health,maxHealth:c.health,shield:!!c.shield,taunt:!!c.taunt,ready:!!(c.charge||c.rush),attacks:0};
 if(c.rush)u.rush=true;if(c.double)u.double=true;if(c.stealth)u.stealth=true;if(c.plunder)u.plunder=true;if(c.poison)u.poison=true;if(c.building){u.building=true;u.ready=false;}if(!c.charge)u.fresh=true;
 a.board.splice(position==null?a.board.length:position,0,u);emit(s,'summon',{p,target:u.uid,id});auras(s);return u;}
// Auras of the legendaries, recomputed after every change: Gorgo (+1 attack for Schildwall), La Hire (recruits +1/+1 and
// Göttliche Gunst once), Lagertha (totems Schildwall and +1 health). Only the difference to the last value is applied.
function auras(s){for(const a of s.players){const gorgo=has(a,'leonidas_9'),lahire=has(a,'jeanne_9'),lagertha=has(a,'ragnar_9');
 for(const u of a.board){if(u.building)continue;const totem=u.id.startsWith('totem_'),recruit=u.id==='recruit';
  const wall=lagertha>0&&totem;if(wall&&!u.taunt){u.taunt=true;u.auraTaunt=true;}else if(!wall&&u.auraTaunt){u.taunt=false;delete u.auraTaunt;}
  if(recruit&&lahire&&!u.graced){u.shield=true;u.graced=true;}
  const atk=(u.taunt?gorgo:0)+(recruit?lahire:0),hp=(totem?lagertha:0)+(recruit?lahire:0);
  const da=atk-(u.auraAtk||0),dh=hp-(u.auraHp||0);
  if(da){u.attack+=da;if(atk)u.auraAtk=atk;else delete u.auraAtk;}
  if(dh){u.maxHealth+=dh;u.health=dh>0?u.health+dh:Math.min(u.health,u.maxHealth);if(hp)u.auraHp=hp;else delete u.auraHp;}}}}
// Arkaner Fokus: extra damage of the player's spells.
const focus=(s,p)=>s.players[p].board.reduce((n,u)=>n+(rule(u).focus||0),0);
// Cost of a hand card: base cost, its own change (Marco, Caterina) and Andraste's discount (1 per two fallen minions).
function cost(s,p,h){const c=D.byId[h.id],a=s.players[p];return Math.max(0,c.cost+(h.mod||0)-(c.costPerFallen?Math.floor((a.fallen||[]).length/c.costPerFallen):0));}
// Freeze: the minion misses its next attack. Frozen in its own turn it stays frozen through the next one.
function freeze(s,id){const t=unit(s,id);if(!t||t.hero||t.obj.building)return;t.obj.frozen=s.active===t.p?2:1;emit(s,'freeze',{target:id});}

// ---------- Ergründen (discover) ----------
const collectible=c=>c.rarity!=='token';
function pool(s,p,kind){const own=s.players[p].hero;
 if(kind==='played')return [...new Set(s.played||[])];
 return D.cards.filter(c=>kind==='foreign'?c.hero!=='neutral'&&c.hero!==own:(c.hero===own||c.hero==='neutral')&&(kind!=='spell'||c.type==='spell')).map(c=>c.id);}
function offer(s,p,kind){const list=pool(s,p,kind).slice(),out=[];while(out.length<3&&list.length)out.push(list.splice(Math.floor(rand(s)*list.length),1)[0]);return out;}
function discover(s,p,e,auto){const left=e.n||1;for(let i=0;i<left;i++){const options=offer(s,p,e.pool);if(!options.length)return;
  if(auto){take(s,p,pick(s,options),e.mod);continue;}
  s.choice={p,pool:e.pool,options,left:left-i,mod:e.mod||0};emit(s,'choice',{p});return;}}
function take(s,p,id,mod){const a=s.players[p];if(a.hand.length>=10){a.grave.push(id);emit(s,'burn',{p,id});log(s,D.byId[id].name+' verbrannt (Hand voll).');return;}
 const h={id,uid:'c'+s.nextId++};if(mod)h.mod=mod;a.hand.push(h);emit(s,'discover',{p,id});log(s,heroName(s,p)+' ergründet eine Karte.');}
function choose(s,index){const c=s.choice;s.choice=null;take(s,c.p,c.options[index],c.mod);
 if(c.left>1){const options=offer(s,c.p,c.pool);if(options.length){s.choice={...c,options,left:c.left-1};emit(s,'choice',{p:c.p});}}}

// ---------- Effects ----------
// ctx: {spell} adds Arkaner Fokus to damage, {auto} resolves Ergründen at random (Theon's echo at the end of a turn).
function effects(s,p,list,target,source,ctx={}){const a=s.players[p],enemy=s.players[1-p],plus=ctx.spell?focus(s,p):0;for(const e of list||[]){const t=unit(s,target);switch(e.type){
case 'damage':hurt(s,target,e.n+plus);break;case 'heal':heal(s,target,e.n);break;case 'face':hurt(s,'h'+(1-p),e.n+plus);break;case 'selfDamage':hurt(s,'h'+p,e.n);break;
case 'armor':a.armor+=e.n;emit(s,'armor',{target:'h'+p,n:e.n});break;
case 'healHero':heal(s,'h'+p,e.n);break;case 'draw':draw(s,p,e.n);break;
case 'mana':a.mana=Math.min(10,a.mana+e.n);break;
case 'heroAttack':a.tempAttack+=e.n;break;
case 'weapon':a.weapon={attack:e.n,durability:e.durability};emit(s,'weapon',{p});break;
case 'buff':if(t&&!t.hero){t.obj.attack+=e.n;t.obj.maxHealth+=e.health||0;t.obj.health+=e.health||0;emit(s,'buff',{target});}break;
case 'shield':if(t&&!t.hero){t.obj.shield=true;emit(s,'buff',{target});}break;
case 'buffAll':for(const u of minions(a)){if(e.excludeSelf&&u.uid===source)continue;u.attack+=e.n;u.health+=e.health||0;u.maxHealth+=e.health||0;emit(s,'buff',{target:u.uid});}break;
case 'summon':for(let i=0;i<e.n;i++)summon(s,p,e.token);break;
case 'healAll':heal(s,'h'+p,e.n);for(const u of a.board)heal(s,u.uid,e.n);break;
case 'aoe':for(const u of [...enemy.board,...(e.both?a.board:[])])if(!u.building)hurt(s,u.uid,e.n+plus);if(e.heroes)hurt(s,'h'+(1-p),e.n+plus);break;
case 'freeze':if(e.all){for(const u of minions(enemy))if(u.health>0)freeze(s,u.uid);}else if(t&&t.obj.health>0)freeze(s,target);break;
case 'discover':discover(s,p,e,ctx.auto);break;
case 'silence':if(t&&!t.hero)silence(s,target);break;
// Gorgo: one hoplite for every enemy minion.
case 'summonPerEnemy':{const n=minions(enemy).length;for(let i=0;i<n;i++)summon(s,p,e.token);break;}
// Andraste: the minion(s) of this player that died last return.
case 'revive':for(const id of (a.fallen||[]).slice(-e.n))summon(s,p,id);break;
case 'totems':for(const id of ['totem_heal','totem_fire','totem_guard','totem_strength'])summon(s,p,id);break;
// Kojirō: he and the chosen minion trade blows until one of them falls.
case 'duel':{const k=unit(s,source);if(!k||!t||t.hero||t.p===p)break;for(let r=0;r<12&&k.obj.health>0&&t.obj.health>0;r++){if(!k.obj.attack&&!t.obj.attack)break;emit(s,'attack',{source,target,duel:true});hurt(s,target,k.obj.attack,source);hurt(s,source,t.obj.attack,target);}break;}
// Zenobia: the chosen enemy minion changes sides (no room: it is destroyed).
case 'steal':{if(!t||t.hero||t.p===p)break;const u=t.obj;if(a.board.length>=7){u.health=0;break;}enemy.board=enemy.board.filter(x=>x!==u);const c=D.byId[u.id];
 Object.assign(u,{ready:!!(c.charge||c.rush),attacks:0,fresh:true});delete u.frozen;a.board.push(u);emit(s,'steal',{p,target:u.uid});log(s,heroName(s,p)+' übernimmt '+c.name+'.');auras(s);break;}
}}}
// Bannung: abilities, blessings and auras are gone; attack and maximum health fall back to the card.
function silence(s,id){const t=unit(s,id);if(!t||t.hero)return;const u=t.obj,c=D.byId[u.id];
 for(const k of ['taunt','shield','rush','double','stealth','plunder','poison','frozen','auraTaunt','auraAtk','auraHp'])delete u[k];u.taunt=false;u.shield=false;
 u.silenced=true;u.attack=c.attack;u.maxHealth=c.health;u.health=Math.min(u.health,c.health);emit(s,'silence',{target:id});auras(s);}
function fall(s,p,u){const a=s.players[p];a.grave.push(u.id);if(!u.building)a.fallen=[...(a.fallen||[]),u.id];emit(s,'death',{target:u.uid,p,id:u.id,building:!!u.building});log(s,D.byId[u.id].name+(u.building?' stürzt ein.':' wurde besiegt.'));}
function settle(s){let loops=0;while(loops++<40){const dead=[];for(let p=0;p<2;p++){const a=s.players[p];for(const u of a.board)if(u.health<=0)dead.push({p,u});a.board=a.board.filter(u=>u.health>0);}auras(s);if(!dead.length)break;for(const {p,u} of dead)fall(s,p,u);for(const {p,u} of dead)effects(s,p,rule(u).death,null,u.uid);}
const a=s.players[0].health<=0,b=s.players[1].health<=0;if(a||b){s.phase='over';s.winner=a&&b?-1:a?1:0;s.choice=null;emit(s,'over',{winner:s.winner});log(s,s.winner===-1?'Unentschieden.':heroName(s,s.winner)+' gewinnt.');}}
function validTargets(s,p,kind,card){const all=['h0','h1',...s.players[0].board.map(u=>u.uid),...s.players[1].board.map(u=>u.uid)];return all.filter(id=>{const t=unit(s,id);if(!t.hero&&t.p!==p&&t.obj.stealth)return false;if(kind==='any')return true;if(kind==='minion')return !t.hero;if(kind==='friendlyMinion')return !t.hero&&t.p===p&&!t.obj.building;if(kind==='enemy')return t.p!==p;
 if(kind==='enemyMinion')return !t.hero&&t.p!==p&&!t.obj.building&&(card?.targetMax==null||t.obj.attack<=card.targetMax);return false;});}
function targetKind(s,p,action){if(action.type==='play'){const h=s.players[p].hand.find(c=>c.uid===action.uid),c=h&&D.byId[h.id];if(!c||!c.target)return null;
  // A minion whose Einmarsch finds no target is still played (without it).
  return c.type==='minion'&&!validTargets(s,p,c.target,c).length?null:c.target;}
 if(action.type==='power')return s.players[p].hero==='imhotep'?'any':null;return null;}
function heroAttack(a){return a.tempAttack+(a.weapon?a.weapon.attack:0);}
// Vorstoß: in the turn it arrived a minion may only attack minions.
// Tarnung: a hidden minion can't be attacked, and its Schildwall doesn't count.
function attackTargets(s,p,uid){const foe=s.players[1-p],seen=foe.board.filter(u=>!u.stealth),taunts=seen.filter(u=>u.taunt),u=uid&&s.players[p].board.find(x=>x.uid===uid);
 const list=taunts.length?taunts.map(u=>u.uid):['h'+(1-p),...seen.map(u=>u.uid)];return u&&u.fresh&&u.rush?list.filter(id=>id!=='h'+(1-p)):list;}
const canAttack=u=>u.ready&&!u.building&&!u.frozen&&u.attack>0&&u.attacks<(u.double?2:1);
function canPower(s,p){const a=s.players[p],h=D.heroes.find(h=>h.id===a.hero);if(s.phase!=='play'||s.active!==p||s.choice||a.powerUsed||a.mana<h.cost)return false;if(['jeanne','ragnar'].includes(a.hero)&&a.board.length>=7)return false;if(a.hero==='ragnar'&&['heal','fire','guard','strength'].every(t=>a.board.some(u=>u.id==='totem_'+t)))return false;return true;}
function legal(s,p=s.active){if(s.phase!=='play'||s.active!==p)return [];
 if(s.choice)return s.choice.p===p?s.choice.options.map((_,index)=>({type:'choose',index})):[];
 const a=s.players[p],out=[];for(const h of a.hand){const c=D.byId[h.id];if(cost(s,p,h)>a.mana||c.type==='minion'&&a.board.length>=7)continue;if(c.target){const ts=validTargets(s,p,c.target,c);for(const target of ts)out.push({type:'play',uid:h.uid,target});if(!ts.length&&c.type==='minion')out.push({type:'play',uid:h.uid});}else out.push({type:'play',uid:h.uid});}
if(canPower(s,p)){const k=targetKind(s,p,{type:'power'});if(k)for(const target of validTargets(s,p,k))out.push({type:'power',target});else out.push({type:'power'});}
const sources=a.board.filter(canAttack).map(u=>u.uid);if(!a.attacked&&heroAttack(a)>0)sources.push('h'+p);for(const uid of sources)for(const target of attackTargets(s,p,uid))out.push({type:'attack',uid,target});out.push({type:'end'});return out;}
function equalAction(a,b){return a.type===b.type&&a.uid===b.uid&&a.target===b.target&&(a.type!=='choose'||a.index===b.index);}
function power(s,p,target){const a=s.players[p],h=D.heroes.find(h=>h.id===a.hero);a.powerUsed=true;a.mana-=h.cost;if(a.hero==='hypatia'){const foes=['h'+(1-p),...s.players[1-p].board.filter(u=>!u.stealth).map(u=>u.uid)];target=foes[Math.floor(rand(s)*foes.length)];}emit(s,'power',{p,target:target||'h'+p});log(s,heroName(s,p)+' nutzt '+h.power+'.');switch(a.hero){case 'leonidas':a.armor+=1;for(const u of minions(a)){u.health++;u.maxHealth++;emit(s,'buff',{target:u.uid});}break;case 'hypatia':hurt(s,target,1);break;case 'imhotep':heal(s,target,3);break;case 'dandolo':a.weapon={attack:1,durability:2};break;case 'khan':hurt(s,'h'+(1-p),2);break;case 'boudicca':a.tempAttack++;a.armor+=2;break;case 'nostradamus':draw(s,p);hurt(s,'h'+p,1);break;case 'jeanne':for(let i=has(a,'jeanne_9')?2:1;i>0;i--)summon(s,p,'recruit');break;case 'ragnar':{const avail=['heal','fire','guard','strength'].filter(t=>!a.board.some(u=>u.id==='totem_'+t));if(avail.length)summon(s,p,'totem_'+avail[Math.floor(rand(s)*avail.length)]);break;}case 'musashi':a.tempAttack++;break;}}
function boss(s){if(s.mission==null||s.active!==1)return;const m=D.missions[s.mission],a=s.players[1],n=a.turns;switch(m.ability){case 'armor':a.armor+=2;break;case 'draw':if(n%3===0)draw(s,1);break;case 'heal':heal(s,'h1',2);break;case 'weapon':if(n%3===0)a.weapon={attack:2,durability:2};break;case 'arrow':hurt(s,'h0',1);break;case 'recruit':if(n%2===0)summon(s,1,'recruit');break;case 'storm':if(n%3===0)effects(s,1,[{type:'aoe',n:1}]);break;case 'shield':if(a.board[0])a.board[0].shield=true;break;case 'totem':if(n%3===0)summon(s,1,'totem_fire');break;case 'final':a.armor+=2;if(a.board.length){a.board[0].attack++;a.board[0].maxHealth++;a.board[0].health++;}break;}emit(s,'boss',{p:1});}
// Start of a turn: buildings act first (the step pyramid strengthens the weakest own minion), then the draw.
function startTurn(s,p){s.active=p;s.turn++;const a=s.players[p];a.turns++;a.maxMana=Math.min(10,a.maxMana+1);a.locked=a.overload||0;a.overload=0;a.mana=Math.max(0,a.maxMana-a.locked);a.powerUsed=false;a.attacked=false;a.tempAttack=0;for(const u of a.board){u.ready=!u.building;u.attacks=0;delete u.fresh;}
 for(const b of a.board.filter(u=>rule(u).turnStart==='weakest')){const list=minions(a);if(!list.length)continue;const w=list.reduce((m,u)=>u.attack+u.health<m.attack+m.health?u:m);w.attack+=2;w.health+=2;w.maxHealth+=2;emit(s,'buff',{target:w.uid});}
 draw(s,p);boss(s);settle(s);emit(s,'turn',{p});log(s,'Zug '+s.turn+': '+heroName(s,p)+'.');}
// Theon: the last spell of this player once more, with random targets.
function echo(s,p){const a=s.players[p],c=a.lastSpell&&D.byId[a.lastSpell];if(!c)return;let target=null;
 if(c.target){const ts=validTargets(s,p,c.target,c);if(!ts.length)return;target=pick(s,ts);}
 emit(s,'echo',{p,id:c.id,target});log(s,'Theon wirkt '+c.name+' erneut.');effects(s,p,c.effects,target,null,{spell:true,auto:true});}
function endTurn(s,p){const a=s.players[p];for(const u of [...a.board]){if(u.health<=0||!a.board.includes(u))continue;const passive=rule(u).passive;if(passive==='heal')for(const t of a.board)heal(s,t.uid,1);if(passive==='fire')hurt(s,'h'+(1-p),1);if(passive==='strength'){const others=minions(a).filter(x=>x.uid!==u.uid);if(others.length){const t=others[Math.floor(rand(s)*others.length)];t.attack++;emit(s,'buff',{target:t.uid});}}
  if(passive==='echo'){echo(s,p);settle(s);if(s.phase==='over')return;}
  if(passive==='regent'){for(const h of draw(s,p))h.mod=(h.mod||0)-2;hurt(s,'h'+p,1);}}
 for(const u of a.board)if(u.frozen&&!--u.frozen)delete u.frozen;
 a.tempAttack=0;settle(s);if(s.phase!=='over'){if(s.turn>=120){s.phase='over';s.winner=-1;emit(s,'over',{winner:-1});}else startTurn(s,1-p);}}
// Subutai's pincer: another own minion joins the attack on the same target (without spending its own attack).
function pincer(s,p,attacker,target){const a=s.players[p];if(!has(a,'khan_9')||attacker.id==='khan_9')return;const t=unit(s,target);if(!t||t.obj.health<=0)return;
 const list=minions(a).filter(u=>u!==attacker&&u.id!=='khan_9'&&u.health>0&&u.attack>0&&!u.frozen);if(!list.length)return;const u=pick(s,list);
 emit(s,'attack',{source:u.uid,target,pincer:true});delete u.stealth;const back=t.hero?0:t.obj.attack;hurt(s,target,u.attack,u.uid);hurt(s,u.uid,back,target);}
function apply(s,action){if(!legal(s).some(x=>equalAction(x,action)))return {ok:false,error:'Diese Aktion ist nicht möglich.'};if(action.position!=null){const hc=s.players[s.active].hand.find(h=>h.uid===action.uid);if(action.type!=='play'||!hc||D.byId[hc.id].type!=='minion'||!Number.isInteger(action.position)||action.position<0||action.position>s.players[s.active].board.length)return {ok:false,error:'Ungültige Position.'};}s.events=[];const p=s.active,a=s.players[p];switch(action.type){
case 'play':{const i=a.hand.findIndex(c=>c.uid===action.uid),hc=a.hand[i],c=D.byId[hc.id];a.mana-=cost(s,p,hc);a.hand.splice(i,1);emit(s,'play',{p,id:c.id,target:action.target,spell:c.type==='spell'});log(s,heroName(s,p)+' spielt '+c.name+'.');
 if(c.type==='minion'){const u=summon(s,p,c.id,action.position);effects(s,p,c.battle,action.target,u&&u.uid);}else{a.grave.push(c.id);if(c.id!=='coin')a.lastSpell=c.id;effects(s,p,c.effects,action.target,null,{spell:true});}
 if(c.overload)a.overload=(a.overload||0)+c.overload;
 if(collectible(c))s.played=[...(s.played||[]),c.id];break;}
case 'choose':choose(s,action.index);break;
case 'power':power(s,p,action.target);break;
case 'attack':{const from=unit(s,action.uid),to=unit(s,action.target);const damage=from.hero?heroAttack(from.obj):from.obj.attack;const retaliation=to.hero?0:to.obj.attack;emit(s,'attack',{source:action.uid,target:action.target});if(!from.hero)delete from.obj.stealth;hurt(s,action.target,damage,action.uid);hurt(s,action.uid,retaliation,action.target);if(from.hero){a.attacked=true;if(a.weapon){a.weapon.durability--;if(a.weapon.durability<=0)a.weapon=null;}}else{from.obj.attacks++;from.obj.ready=from.obj.attacks<(from.obj.double?2:1);pincer(s,p,from.obj,action.target);}log(s,(from.hero?heroName(s,p):D.byId[from.obj.id].name)+' greift an.');break;}
case 'end':endTurn(s,p);break;}settle(s);return {ok:true};}
function starter(hero){const ids=[...Array.from({length:4},(_,i)=>hero+'_'+i),...Array.from({length:11},(_,i)=>'neutral_'+i)];return ids.flatMap(id=>[id,id]);}
function randomDeck(hero,seed=1234){const s={seed:seed||1};const pool=D.cards.filter(c=>c.hero===hero||c.hero==='neutral');const counts={},out=[];const costs=[1,2,2,3,3,4,4,5,6,7];for(let i=0;i<30;i++){let opts=pool.filter(c=>(counts[c.id]||0)<(c.rarity==='legendary'?1:2));const desired=costs[i%costs.length];let near=opts.filter(c=>Math.abs(c.cost-desired)<=1);if(near.length)opts=near;const c=opts[Math.floor(rand(s)*opts.length)];counts[c.id]=(counts[c.id]||0)+1;out.push(c.id);}return out;}
function create(opts={}){const hero=opts.hero||'leonidas',foe=opts.foe||'hypatia',first=opts.first==null?0:opts.first;const s={version:1,seed:opts.seed||1234567,nextId:1,players:[],active:first,turn:0,phase:'mulligan',winner:null,mode:opts.mode||'free',mission:opts.mission==null?null:opts.mission,events:[],log:[],rewarded:false};for(let p=0;p<2;p++){const hid=p===0?hero:foe;const health=p===1&&s.mission!=null?D.missions[s.mission].health:30;s.players.push({hero:hid,health,maxHealth:health,armor:0,mana:0,maxMana:0,hand:[],deck:shuffle(s,[...(p===0?(opts.deck||starter(hid)):(opts.enemyDeck||randomDeck(hid,s.seed)))]),board:[],grave:[],weapon:null,tempAttack:0,attacked:false,powerUsed:false,fatigue:0,turns:0});draw(s,p,p===first?3:4);}s.events=[];return s;}
function mulligan(s,ids=[]){if(s.phase!=='mulligan')return false;for(let p=0;p<2;p++){const a=s.players[p];const replace=a.hand.filter(c=>p===0?ids.includes(c.uid):D.byId[c.id].cost>=4);a.hand=a.hand.filter(c=>!replace.includes(c));draw(s,p,replace.length);a.deck.push(...replace.map(c=>c.id));shuffle(s,a.deck);}s.players[1-s.active].hand.push({id:'coin',uid:'c'+s.nextId++});s.phase='play';s.events=[];startTurn(s,s.active);return true;}

// ---------- AI ----------
// Extra worth of legendaries whose rule keeps working while they stand (AP 5.8, part 1).
const SPECIAL={leonidas_9:2,hypatia_9:2.5,khan_9:3.5,nostradamus_9:1.5,jeanne_9:2,ragnar_9:1.5};
function unitValue(u){const c=rule(u);if(u.building)return u.silenced?u.health*.5:u.health*.7+3.5;
 return u.attack*1.65+u.health+u.shield*2.7+u.taunt*1.1+(c.death?1.7:0)+(c.passive?2:0)+(u.double?u.attack*1.1:0)+(c.focus||0)*1.6+(u.silenced?0:SPECIAL[u.id]||0)-(u.frozen?u.attack*1.1:0)
  +(u.plunder?u.attack*.6:0)+(u.poison?2.4:0)+(u.stealth?u.attack*.35+.6:0);}
function value(s,p){if(s.phase==='over')return s.winner===p?100000:s.winner===-1?0:-100000;const own=s.players[p],foe=s.players[1-p];const board=a=>a.board.reduce((v,u)=>v+unitValue(u),0);
const hand=a=>a.hand.length*1.7+a.hand.reduce((v,h)=>v-(h.mod||0)*.35,0);
const health=a=>a.health*.5+a.armor*.36-(a.health<13?(13-a.health)*1.6:0);return board(own)-board(foe)*1.08+health(own)-health(foe)+hand(own)-hand(foe)*1.4/1.7+(s.choice&&s.choice.p===p?s.choice.left*1.9:0)+(own.weapon?own.weapon.attack*own.weapon.durability*.9:0)-(foe.weapon?foe.weapon.attack*foe.weapon.durability*.9:0)+Math.min(own.deck.length,5)*.1-(own.overload||0)*1.1;}
// Rough worth of a card offered by Ergründen: strong for its cost, and playable soon.
function cardWorth(s,p,id,mod=0){const c=D.byId[id],a=s.players[p],k=Math.max(0,c.cost+mod);let v=c.cost*1.4+({legendary:2.5,epic:1.5,rare:.8}[c.rarity]||0);
 if(c.type==='minion')v+=(c.attack*1.65+c.health)*.25+(c.taunt?.6:0)+(c.shield?.8:0)+(c.charge||c.rush?.7:0)+(c.plunder||c.poison||c.stealth?.6:0);v-=(c.overload||0)*.8;
 if(c.target&&!validTargets(s,p,c.target,c).length&&c.type==='spell')v-=4;return v-Math.max(0,k-(a.maxMana+1))*1.6;}
function ai(s,p=s.active){if(s.phase!=='play'||s.active!==p)return null;const acts=legal(s,p);if(acts.length===1)return acts[0];
 if(s.choice){const c=s.choice;return acts.reduce((b,x)=>cardWorth(s,p,c.options[x.index],c.mod)>cardWorth(s,p,c.options[b.index],c.mod)?x:b);}
 const baseline=value(s,p);let ranked=[];for(const a of acts){if(a.type==='end')continue;const c=copy(s);apply(c,a);const v=value(c,p);if(c.phase==='over'&&c.winner===p)return a;let tie=a.type==='play'?.2:a.type==='power'?.05:0;ranked.push({a,c,v:v+tie});}ranked.sort((a,b)=>b.v-a.v);
// Check sequences of attacks / damage spells for lethal without peeking into the rival hand or deck.
const lethal=lethalPlan(s,p,250);if(lethal&&lethal.length)return lethal[0];
let best={a:{type:'end'},score:baseline-.15};for(const r of ranked.slice(0,8)){let score=r.v;for(const a2 of legal(r.c,p).filter(a=>a.type!=='end')){const c2=copy(r.c);apply(c2,a2);if(c2.winner===p&&c2.phase==='over')return r.a;score=Math.max(score,value(c2,p)*.62+r.v*.38);}if(score>best.score){best={a:r.a,score};}}return best.a;}
function lethalPlan(s,p,budget=200){let remaining=budget;function go(st,path,depth){if(st.phase==='over')return st.winner===p?path:null;if(depth<=0||remaining--<=0)return null;const a=st.players[p],b=st.players[1-p];const rough=a.board.filter(canAttack).reduce((v,u)=>v+u.attack*(u.double?2-u.attacks:1),0)+heroAttack(a)+a.mana*4+4;if(b.health+b.armor>rough)return null;
let acts=legal(st,p).filter(x=>{if(x.type==='attack')return true;if(x.type==='power')return ['khan','hypatia','boudicca','musashi','dandolo'].includes(a.hero)&&(!x.target||x.target==='h'+(1-p)||unit(st,x.target).p!==p);if(x.type==='play'){const c=D.byId[a.hand.find(h=>h.uid===x.uid).id];return c.charge||c.rush||(c.effects||c.battle||[]).some(e=>['damage','face','buffAll','heroAttack','weapon','mana','duel','freeze','silence'].includes(e.type));}return false;});
acts.sort((x,y)=>(y.target==='h'+(1-p)?1:0)-(x.target==='h'+(1-p)?1:0));for(const action of acts.slice(0,18)){const c=copy(st);apply(c,action);const r=go(c,[...path,action],depth-1);if(r)return r;}return null;}return go(s,[],7);}
const api={silence,clone,copy,rand,shuffle,create,mulligan,legal,apply,unit,heroAttack,canPower,canAttack,targetKind,validTargets,attackTargets,starter,randomDeck,ai,value,lethalPlan,settle,summon,hurt,heal,effects,cost,focus,auras,cardWorth};if(typeof module!=='undefined')module.exports=api;else root.CHE=api;
})(typeof globalThis!=='undefined'?globalThis:this);
