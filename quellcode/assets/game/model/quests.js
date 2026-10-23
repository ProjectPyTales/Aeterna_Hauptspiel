/* Aufgaben und Heldenstufen (AP 6.3): drei Tagesaufgaben aus einem Pool (eine davon zum Lernen), einmal Neuwürfeln je
 * Tag, ein Tagesgeschenk mit Serie über sieben Tage und Erfahrung je Held mit zehn Stufen. Keine DOM-Zugriffe; jede
 * Funktion nimmt das Datum als letzten Wert (Tests, Klickpfad mit fester Uhr), sonst gilt heute.
 *
 * profile.daily  – {day, list:[{id, n, claimed}], rerolled, seen:[…], credit}: die Aufgaben des Tages (day = JJJJMMTT),
 *                  ihr Stand, ob schon neu gewürfelt wurde, was zum Lernen schon zählte (Chronikseiten, Karten) und das
 *                  Gold, das beim Tageswechsel für erledigte, nicht abgeholte Aufgaben gutgeschrieben wurde
 * profile.login  – {last, streak}: Tag des letzten Tagesgeschenks und Länge der Serie
 * profile.heroXp – {held: Erfahrung}
 * Die vier Aufgaben bis 1.29.0 (CHP.quests, profile.claimed) bleiben als dauerhafte Erfolge bestehen. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('./data.js'):root.CHD,E=node?require('./engine.js'):root.CHE;

const dayKey=(date=new Date())=>date.getFullYear()*10000+(date.getMonth()+1)*100+date.getDate();
const yesterday=(date=new Date())=>dayKey(new Date(date.getFullYear(),date.getMonth(),date.getDate()-1));
const mix=(a,b)=>{let h=Math.imul((a>>>0)^0x9e3779b9,0x85ebca6b)^(b>>>0);h^=h>>>13;h=Math.imul(h,0xc2b2ae35);h^=h>>>16;return (h>>>0)||1;};

// Epoche einer Karte: Heldenkarten die ihres Helden, Zeitalterkarten ihr Zeitalter, neutrale keine.
const ageOf=c=>!c||c.hero==='neutral'?null:D.heroById[c.hero]?.age||(D.ageById[c.hero]?c.hero:null);
const heroesOf=age=>D.heroes.filter(h=>h.age===age).map(h=>h.name).join(', ');

// on: welches Ereignis zählt – play, spell, minion, attack, game (mindestens 4 eigene Züge oder Sieg), win, draft (Sieg im
// Kolosseum), campaign (Partie einer Mission), lore (Chronikseite eines Helden), chronicle (Karte mit „Aus der Chronik“).
const PLAY=[
 {id:'win2',on:'win',goal:2,gold:60,text:'Gewinne 2 Partien',hint:'Jede Partie zählt – Schlacht, Kampagne, Kolosseum und Tagesduell.'},
 {id:'games3',on:'game',goal:3,gold:50,text:'Bestreite 3 Partien',hint:'Gezählt wird ein Sieg oder eine Partie mit mindestens 4 eigenen Zügen.'},
 {id:'play20',on:'play',goal:20,gold:40,text:'Spiele 20 Karten',hint:'Jede Karte, die Du aus der Hand ausspielst.'},
 {id:'attack15',on:'attack',goal:15,gold:40,text:'Greife 15 Mal an',hint:'Mit Dienern oder mit Deinem bewaffneten Helden.'},
 {id:'spells6',on:'spell',goal:6,gold:40,text:'Wirke 6 Zauber',hint:'„Zauber“ steht für den Glauben der Zeit – auch Hinterhalte zählen.'},
 {id:'minions10',on:'minion',goal:10,gold:40,text:'Spiele 10 Diener',hint:'Bauwerke zählen nicht mit.'},
 {id:'draft1',on:'draft',goal:1,gold:60,text:'Gewinne einen Kampf im Kolosseum',hint:'Im Hauptmenü: Kolosseum – der erste Lauf ist ein freier Probelauf.'},
 {id:'campaign1',on:'campaign',goal:1,gold:50,text:'Bestreite eine Mission der Kampagne',hint:'Gezählt wird ein Sieg oder eine Mission mit mindestens 4 eigenen Zügen.'}];
// Halb Lernen: Jeden Tag ist eine der drei Aufgaben eine zum Lesen oder zu einer Epoche des Lehrplans.
const LEARN=[
 {id:'lore2',on:'lore',goal:2,gold:40,text:'Lies 2 Chronikseiten',hint:'Heldenwahl: „Chronik lesen“, im Duell Deinen Helden lange drücken. Jeder Held zählt einmal am Tag.'},
 {id:'chronicle4',on:'chronicle',goal:4,gold:40,text:'Lies bei 4 Karten „Aus der Chronik“',hint:'Eine Karte mit Chronikzeile groß ansehen: im Duell lange drücken, in der Sammlung oder im Kolosseum antippen.'},
 ...D.ages.map(a=>({id:'age_'+a.id,on:'play',age:a.id,goal:3,gold:50,text:'Spiele 3 Karten der Epoche „'+a.name+'“',hint:'Helden dieser Epoche: '+heroesOf(a.id)+'.'}))];
const POOL=[...PLAY,...LEARN],byId=Object.fromEntries(POOL.map(q=>[q.id,q]));
const learn=q=>LEARN.includes(q);
const LEARN_KINDS=[['lore2'],['chronicle4'],LEARN.filter(q=>q.age).map(q=>q.id)];

// Die drei Aufgaben eines Tages: eine zum Lernen, zwei zum Spielen – fest je Tag und Spielstand.
function choose(p,day){const s={seed:mix(day,p.seed)},pickFrom=list=>list.splice(Math.floor(E.rand(s)*list.length),1)[0];
 const kind=LEARN_KINDS[Math.floor(E.rand(s)*LEARN_KINDS.length)],play=PLAY.map(q=>q.id);
 return [pickFrom([...kind]),pickFrom(play),pickFrom(play)];}
const fresh=(p,day)=>({day,list:choose(p,day).map(id=>({id,n:0,claimed:false})),rerolled:false,seen:[],credit:0});

// Neuer Tag: Erledigte, nicht abgeholte Aufgaben werden gutgeschrieben (nichts geht verloren), dann kommen drei neue.
function sync(p,date){const day=dayKey(date),d=p.daily;if(d&&d.day===day)return false;
 let credit=0;if(d)for(const x of d.list)if(!x.claimed&&x.n>=byId[x.id].goal)credit+=byId[x.id].gold;
 p.gold+=credit;p.daily=fresh(p,day);p.daily.credit=credit;return true;}
const today=(p,date)=>{sync(p,date);return p.daily;};

// Ein Ereignis: {type:'play', card} · {type:'attack'} · {type:'game', mode, win, counted} · {type:'lore', hero} ·
// {type:'chronicle', card}. Gibt die Aufgaben zurück, die dadurch gerade erledigt sind.
function counts(q,ev){const c=ev.card&&D.byId[ev.card];
 switch(q.on){
  case 'play':return ev.type==='play'&&(!q.age||ageOf(c)===q.age);
  case 'spell':return ev.type==='play'&&c?.type==='spell';
  case 'minion':return ev.type==='play'&&c?.type==='minion'&&!c.building;
  case 'attack':return ev.type==='attack';
  case 'game':return ev.type==='game'&&ev.counted;
  case 'win':return ev.type==='game'&&ev.win;
  case 'draft':return ev.type==='game'&&ev.win&&ev.mode==='draft';
  case 'campaign':return ev.type==='game'&&ev.counted&&ev.mode==='campaign';
  case 'lore':case 'chronicle':return ev.type===q.on;}
 return false;}
function track(p,ev,date){const d=today(p,date),done=[];
 // Chronikseiten und Chronikzeilen zählen je Held und Karte einmal am Tag.
 if(ev.type==='lore'||ev.type==='chronicle'){const key=ev.type+':'+(ev.hero||ev.card);if(d.seen.includes(key))return done;d.seen.push(key);if(d.seen.length>60)d.seen.shift();}
 for(const x of d.list){const q=byId[x.id];if(x.claimed||x.n>=q.goal||!counts(q,ev))continue;if(++x.n>=q.goal)done.push(q);}
 return done;}
function claim(p,id,date){const d=today(p,date),x=d.list.find(x=>x.id===id);if(!x||x.claimed||x.n<byId[id].goal)return null;
 x.claimed=true;p.gold+=byId[id].gold;return byId[id];}
// Einmal am Tag: eine offene Aufgabe gegen eine andere derselben Art tauschen (Lernen bleibt Lernen).
function reroll(p,id,date){const d=today(p,date),i=d.list.findIndex(x=>x.id===id);if(d.rerolled||i<0||d.list[i].claimed||d.list[i].n>=byId[id].goal)return null;
 const s={seed:mix(d.day,p.seed^0x5bd1e995)},taken=new Set(d.list.map(x=>x.id)),pool=(learn(byId[id])?LEARN:PLAY).filter(q=>!taken.has(q.id));
 if(!pool.length)return null;const q=pool[Math.floor(E.rand(s)*pool.length)];d.list[i]={id:q.id,n:0,claimed:false};d.rerolled=true;return q;}
// Was im Menü auf Abholung wartet: erledigte Tagesaufgaben und das Tagesgeschenk.
function ready(p,date){const d=p.daily,stale=!d||d.day!==dayKey(date);return (stale?0:d.list.filter(x=>!x.claimed&&x.n>=byId[x.id].goal).length)+(loginReady(p,date)?1:0);}

// Tagesgeschenk: einmal je Kalendertag, die Serie wächst an Folgetagen und beginnt nach einer Lücke neu; Tag 7 ist der größte.
const LOGIN=[{gold:20},{gold:30},{dust:25},{gold:40},{packs:1},{gold:50},{packs:1,dust:50}];
const loginReady=(p,date)=>p.login.last!==dayKey(date);
// Der Tag der Serie, den das nächste Geschenk zählt (1–7, danach von vorn).
const loginNext=(p,date)=>{const l=p.login,run=l.last===yesterday(date)||l.last===dayKey(date)?l.streak:0;return l.last===dayKey(date)?run:run+1;};
function claimLogin(p,date){if(!loginReady(p,date))return null;const streak=loginNext(p,date),w=LOGIN[(streak-1)%LOGIN.length];
 p.login={last:dayKey(date),streak};grant(p,w);return {...w,streak,day:(streak-1)%LOGIN.length+1};}

// Heldenstufen: Erfahrung je Partie wie das Gold (Sieg, Unentschieden, Niederlage nach 4 Zügen; Aufgeben davor gibt keine).
const XP={win:100,draw:60,loss:40},MAX=10;
const LEVEL=[0,100,240,400,600,840,1120,1440,1800,2200];
// Belohnung beim Erreichen einer Stufe; Stufe 10: die Goldene Fassung der Legendären des Helden (und die Karte, falls sie fehlt).
const REWARD={2:{gold:50},3:{packs:1},4:{dust:40},5:{gold:100},6:{packs:1},7:{dust:80},8:{gold:150},9:{packs:2},10:{golden:true}};
const signature=hero=>hero+'_9';
function level(xp=0){let n=1;while(n<MAX&&xp>=LEVEL[n])n++;const start=LEVEL[n-1],next=n<MAX?LEVEL[n]:null;
 return {level:n,xp,start,next,into:xp-start,span:next==null?0:next-start,max:n>=MAX};}
const of=(p,hero)=>level(p.heroXp[hero]||0);
function grant(p,w,hero){p.gold+=w.gold||0;p.packs+=w.packs||0;p.dust+=w.dust||0;
 if(w.golden&&hero){const id=signature(hero);if(D.byId[id]&&!(p.collection[id]>0))p.collection[id]=1;}}
function gain(p,hero,amount){if(!D.heroById[hero])return null;const before=p.heroXp[hero]||0,after=before+Math.max(0,amount|0),a=level(before),b=level(after),rewards=[];
 p.heroXp[hero]=after;for(let n=a.level+1;n<=b.level;n++){grant(p,REWARD[n],hero);rewards.push({level:n,...REWARD[n]});}
 return {hero,before,after,gained:after-before,from:a.level,to:b.level,rewards};}
// Die Goldenen Fassungen: je Held auf Stufe 10 seine Legendäre.
const golden=p=>D.heroes.filter(h=>of(p,h.id).max).map(h=>signature(h.id));
const rewardText=w=>w.golden?'Goldene Fassung von „'+(D.byId[w.card]?.name||'')+'“':[w.gold&&w.gold+' Gold',w.packs&&w.packs+' '+(w.packs===1?'Kartenpaket':'Kartenpakete'),w.dust&&w.dust+' Staub'].filter(Boolean).join(' und ');
const levelReward=(hero,n)=>REWARD[n]?{...REWARD[n],...(REWARD[n].golden?{card:signature(hero)}:{})}:null;

// Ende einer Partie (aus CHP.reward): Aufgaben und Erfahrung. {quests, xp}
function finish(p,s,surrender=false,date){const win=s.winner===0,draw=s.winner===-1,counted=win||draw||!surrender&&s.players[0].turns>=4;
 const quests=track(p,{type:'game',mode:s.mode,win,counted},date);
 return {quests,xp:gain(p,s.players[0].hero,counted?win?XP.win:draw?XP.draw:XP.loss:0)};}

// Spielstand: fehlende oder kaputte Felder werden ersetzt, Gültiges bleibt.
function normalize(p){const int=(x,max)=>Number.isInteger(x)&&x>=0&&x<=max?x:0,d=p.daily;
 p.daily=null;
 if(d&&typeof d==='object'&&Number.isInteger(d.day)&&Array.isArray(d.list)&&d.list.length===3&&d.list.every(x=>x&&byId[x.id])&&new Set(d.list.map(x=>x.id)).size===3)
  p.daily={day:d.day,list:d.list.map(x=>({id:x.id,n:Math.min(int(x.n,1e6),byId[x.id].goal),claimed:x.claimed===true})),rerolled:d.rerolled===true,
   seen:Array.isArray(d.seen)?d.seen.filter(k=>typeof k==='string'&&k.length<80).slice(-60):[],credit:int(d.credit,1e6)};
 const l=p.login&&typeof p.login==='object'?p.login:{};p.login={last:int(l.last,99991231),streak:int(l.streak,1e6)};
 const xp=p.heroXp&&typeof p.heroXp==='object'?p.heroXp:{};p.heroXp={};
 for(const h of D.heroes){const n=int(xp[h.id],1e9);if(n)p.heroXp[h.id]=n;}
 return p;}

const api={POOL,PLAY,LEARN,byId,LOGIN,XP,MAX,LEVEL,REWARD,dayKey,ageOf,choose,sync,today,track,claim,reroll,ready,loginReady,loginNext,claimLogin,
 level,of,gain,golden,signature,rewardText,levelReward,finish,normalize};
if(node)module.exports=api;else root.AEQ=api;
})(typeof globalThis!=='undefined'?globalThis:this);
