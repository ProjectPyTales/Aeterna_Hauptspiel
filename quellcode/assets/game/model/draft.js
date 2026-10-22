/* Kolosseum als Draft (AP 6.1): ein Lauf im Spielstand (profile.draft). Erst wählt der Spieler einen von drei Helden aus
 * drei verschiedenen Epochen, dann 30-mal eine von drei Karten derselben Seltenheit; danach kämpft das Deck, bis es
 * 12 Siege oder 3 Niederlagen hat. Die Belohnung wächst mit den Siegen und wird am Ende abgeholt. Keine DOM-Zugriffe.
 *
 * profile.draft      – der laufende Lauf oder null: {id, seed, heroes:[3], hero, picks:[ids], options:[3 ids]|null,
 *                      wins, losses, games, over, reward:{gold, packs, dust}|null}
 * profile.draftStats – {started, runs, best}: begonnene und abgeschlossene Läufe, bester Lauf (Siege). */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('./data.js'):root.CHD,E=node?require('./engine.js'):root.CHE;
const PICKS=30,WINS=12,LOSSES=3,FEE=150;
// Seltenheit einer Wahl; Basiskarten zählen als gewöhnlich. Die 1., 10., 20. und 30. Wahl ist mindestens selten.
const ROLL=[['common',.70],['rare',.22],['epic',.06],['legendary',.02]],SPECIAL=[0,9,19,29];
// Karten des eigenen Helden kommen dreimal so oft, Zeitalterkarten doppelt so oft wie neutrale – das Deck soll nach
// der Lebenswelt des Helden schmecken, nicht nach dem ganzen Set.
const WEIGHT={hero:3,age:2,neutral:1};
const GOLD=[10,20,30,50,70,90,110,130,150,180,210,240,300];
const reward=wins=>({gold:GOLD[Math.min(WINS,wins)],packs:1+(wins>=3)+(wins>=7)+(wins>=WINS),dust:wins>=5?20*(wins-4):0});

const mix=(...n)=>{let h=0x9e3779b9;for(const x of n){h=Math.imul(h^(x>>>0),0x85ebca6b);h^=h>>>13;h=Math.imul(h,0xc2b2ae35);h^=h>>>16;}return (h>>>0)||1;};
const rarityOf=c=>c.rarity==='basic'?'common':c.rarity;
const kind=(c,hero)=>c.hero===hero?'hero':c.hero==='neutral'?'neutral':'age';
const phase=run=>!run?null:run.over?'done':!run.hero?'hero':run.picks.length<PICKS?'pick':'play';
const fee=p=>p.draftStats.started?FEE:0;

// Drei Helden aus drei verschiedenen Epochen.
function heroChoice(seed){const s={seed},ages=D.ages.map(a=>a.id),out=[];
 while(out.length<3){const age=ages.splice(Math.floor(E.rand(s)*ages.length),1)[0],list=D.heroes.filter(h=>h.age===age);out.push(list[Math.floor(E.rand(s)*list.length)].id);}
 return out;}

// Die drei Karten der n-ten Wahl: gleiche Seltenheit, gewichtet nach Held, Zeitalter und neutral, keine doppelt,
// eine Legendäre höchstens einmal im Deck. Gleicher Lauf, gleiche Wahl – auch nach einem Neustart der App.
function options(run,n=run.picks.length){const s={seed:mix(run.seed,n+1)};
 let r=E.rand(s),rarity='common';
 if(SPECIAL.includes(n))r=ROLL[0][1]+r*(1-ROLL[0][1]);
 for(const [k,p] of ROLL){if(r<p){rarity=k;break;}r-=p;rarity=k;}
 const taken=new Set(run.picks.filter(id=>D.byId[id].rarity==='legendary'));
 const all=D.cards.filter(c=>c.rarity!=='token'&&D.playable(c,run.hero)&&!taken.has(c.id));
 // Zu wenige Karten dieser Seltenheit (z. B. Legendäre schon gewählt): die nächstniedrigere.
 let k=ROLL.findIndex(([r])=>r===rarity),pool=[];
 for(;k>=0;k--){pool=all.filter(c=>rarityOf(c)===ROLL[k][0]);if(pool.length>=3)break;}
 const out=[];
 while(out.length<3&&pool.length){const total=pool.reduce((t,c)=>t+WEIGHT[kind(c,run.hero)],0);let x=E.rand(s)*total,i=0;
  for(;i<pool.length-1;i++){x-=WEIGHT[kind(pool[i],run.hero)];if(x<0)break;}
  out.push(pool.splice(i,1)[0].id);}
 return out;}

// Spielstand: altes oder kaputtes Feld → kein Lauf; nichts geht verloren, was gültig ist.
function normalize(p){const st=p.draftStats&&typeof p.draftStats==='object'?p.draftStats:{},int=(x,max)=>Number.isInteger(x)&&x>=0&&x<=max?x:0;
 p.draftStats={started:int(st.started,1e9),runs:int(st.runs,1e9),best:int(st.best,WINS)};
 const r=p.draft;p.draft=null;
 if(!r||typeof r!=='object'||!Number.isInteger(r.id)||!Number.isInteger(r.seed)||r.seed<1||!Array.isArray(r.heroes)||r.heroes.length!==3||r.heroes.some(h=>!D.heroById[h]))return p;
 if(r.hero!=null&&!r.heroes.includes(r.hero))return p;
 const picks=Array.isArray(r.picks)?r.picks:[];
 if(picks.length>PICKS||picks.some(id=>!D.byId[id]||D.byId[id].rarity==='token'||!r.hero||!D.playable(D.byId[id],r.hero)))return p;
 const run={id:r.id,seed:r.seed,heroes:[...r.heroes],hero:r.hero??null,picks:[...picks],options:null,wins:int(r.wins,WINS),losses:int(r.losses,LOSSES),games:int(r.games,1e6),over:r.over===true,reward:null};
 if(run.wins>=WINS||run.losses>=LOSSES)run.over=true;
 if(run.over)run.reward=reward(run.wins);else if(run.hero&&run.picks.length<PICKS)run.options=options(run);
 p.draft=run;return p;}

// Neuer Lauf: der erste ist ein Probelauf ohne Eintritt, danach 150 Gold.
function start(p){if(p.draft)return {error:'Du hast schon einen Lauf im Kolosseum.'};const cost=fee(p);
 if(p.gold<cost)return {error:'Der Eintritt kostet '+cost+' Gold – es fehlen noch '+(cost-p.gold)+'.'};
 p.gold-=cost;const seed=Math.floor(E.rand(p)*4294967295)||1;p.draftStats.started++;
 p.draft={id:p.draftStats.started,seed,heroes:heroChoice(seed),hero:null,picks:[],options:null,wins:0,losses:0,games:0,over:false,reward:null};
 return {run:p.draft,cost};}
function chooseHero(p,id){const r=p.draft;if(phase(r)!=='hero'||!r.heroes.includes(id))return false;r.hero=id;r.options=options(r);return true;}
function pick(p,i){const r=p.draft;if(phase(r)!=='pick'||!r.options?.[i])return null;const id=r.options[i];r.picks.push(id);
 r.options=r.picks.length<PICKS?options(r):null;return id;}

// Der nächste Gegner: ein Held, nicht der eigene, mit einem Zufallsdeck – je Partie des Laufs fest.
function foe(r){const s={seed:mix(r.seed,1000+r.games)},others=D.heroes.filter(h=>h.id!==r.hero);
 const hero=others[Math.floor(E.rand(s)*others.length)].id;return {hero,deck:E.randomDeck(hero,s.seed),seed:mix(r.seed,2000+r.games),first:E.rand(s)<.5?0:1};}
// Die Partie für den Lauf: Engine-Zustand mit Kennung des Laufs (s.draft), damit ein altes Ergebnis nie zählt.
function game(p){const r=p.draft;if(phase(r)!=='play')return null;const f=foe(r);
 const s=E.create({hero:r.hero,foe:f.hero,deck:r.picks,enemyDeck:f.deck,mode:'draft',mission:null,seed:f.seed,first:f.first});s.draft=r.id;return s;}
// Ergebnis einer Partie (aus CHP.reward): Sieg oder Niederlage zählt, ein Unentschieden wird wiederholt.
function record(p,s){const r=p.draft;if(s.mode!=='draft'||phase(r)!=='play'||s.draft!==r.id)return null;
 r.games++;if(s.winner===0)r.wins++;else if(s.winner===1)r.losses++;
 if(r.wins>=WINS||r.losses>=LOSSES)finish(r);return {wins:r.wins,losses:r.losses,over:r.over};}
function finish(r){r.over=true;r.options=null;r.reward=reward(r.wins);}
// Aufhören: Der Lauf endet mit den Siegen, die er hat (auch schon während der Wahl – dann ohne Siege).
function retire(p){const r=p.draft;if(!r||r.over)return false;finish(r);return true;}
function claim(p){const r=p.draft;if(!r?.over)return null;const w=r.reward;p.gold+=w.gold;p.packs+=w.packs;p.dust+=w.dust;
 p.draftStats.runs++;p.draftStats.best=Math.max(p.draftStats.best,r.wins);p.draft=null;return {...w,wins:r.wins};}

const api={PICKS,WINS,LOSSES,FEE,GOLD,WEIGHT,reward,phase,fee,heroChoice,options,normalize,start,chooseHero,pick,foe,game,record,retire,claim};
if(node)module.exports=api;else root.AEDR=api;
})(typeof globalThis!=='undefined'?globalThis:this);
