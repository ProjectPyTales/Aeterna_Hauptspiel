/* Kartenrätsel (AP 6.4 Teil 2, seit 1.33.0): je Kapitel der Kampagne ein Rätsel „Gewinne in diesem Zug“ nach einer historischen
 * Lage – feste Hand, festes Brett, kein Deck, kein Zufall. Endet der Zug ohne Sieg, ist das Rätsel verloren (Regel in CHE.endTurn,
 * Feld s.puzzle). Freigeschaltet wird ein Rätsel, sobald alle Missionen seines Kapitels gewonnen sind; der erste Sieg bringt
 * Gold, jeder weitere nur die Ehre. Keine DOM-Zugriffe.
 *
 * profile.puzzles – Kennungen der gelösten Rätsel (über normalize, alte Spielstände bekommen []).
 *
 * solve(s) durchsucht alle Züge (Ausspielen an jeder Stelle der Reihe, Angriffe, Fähigkeit) und beweist, dass ein Rätsel lösbar
 * ist; die Tests prüfen damit auch, dass es nicht trivial ist (keine Lösung in einem Schritt, nicht jeder erste Schritt führt
 * zum Ziel). */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('./data.js'):root.CHD,E=node?require('./engine.js'):root.CHE,KA=node?require('./campaign.js'):root.AEKA;

// chapter: Kapitel der Kampagne (AEKA.CHAPTERS). hero/foe: Porträts (der Gegner trägt den Namen boss). you/rival: Leben, Rüstung,
// Mana, Waffe, Brett ([Karte, {Werte}]) und Hand. power:false sperrt die Heldenfähigkeit. text: die Lage, hint: ein Tipp ohne die
// Lösung, source: woher die Lage stammt.
const PUZZLES=[
 {id:'auaris',chapter:'steppe',title:'Der Kanal von Auaris',place:'Auaris',year:'um 1550 v. Chr.',hero:'amanirenas',foe:'imhotep',boss:'Die Hyksos von Auaris',power:false,
  text:'Die Hyksos verschanzen sich in Auaris. Auf dem Kanal vor der Stadt kämpft die Flotte aus Theben, und Ahmose, Ahhoteps Sohn, steht bereit. Vor der Mauer wartet die Leibwache mit Segen und Schildwall.',
  hint:'Ahmose schlägt zweimal zu. Wer den Segen bricht, bevor er zuschlägt, braucht nur einen Hieb für die Wache.',
  source:'Grabinschrift des Ahmose, Sohn der Ebana, in Elkab',
  you:{health:12,mana:5,board:['amanirenas_8','amanirenas_1'],hand:['amanirenas_4','amanirenas_2','imhotep_10']},
  rival:{health:5,board:[['anna_2',{health:7,maxHealth:7}],'neutral_0']}},
 {id:'leuktra',chapter:'griechen',title:'Fünfzig Schilde tief',place:'Leuktra',year:'371 v. Chr.',hero:'epaminondas',foe:'leonidas',boss:'Kleombrotos von Sparta',
  text:'Epaminondas stellt seinen linken Flügel fünfzig Schilde tief auf – genau dort, wo der spartanische König Kleombrotos steht. Wo der linke Flügel am stärksten ist, fällt die Entscheidung.',
  hint:'Alles, was Du hier tust, stärkt den Diener ganz links. Wer steht dort, wenn es zählt?',
  source:'Xenophon, Hellenika VI 4, 12',
  you:{health:12,mana:6,board:['epaminondas_1'],hand:['epaminondas_2','griechen_2']},
  rival:{health:3,board:['leonidas_10']}},
 {id:'naulochos',chapter:'rom',title:'Die Harpax',place:'Naulochos',year:'36 v. Chr.',hero:'agrippa',foe:'fabius',boss:'Sextus Pompeius',
  text:'Vor Naulochos trifft Agrippa auf die Flotte des Sextus Pompeius. Seine neue Waffe ist die Harpax: ein Enterhaken, den ein Katapult auf feindliche Schiffe schießt, um sie heranzuziehen.',
  hint:'Die Harpax zieht nur leichte Schiffe heran – mit höchstens 2 Angriff. Welches versperrt Dir den Weg?',
  source:'Appian, Bürgerkriege V 118–121',
  you:{health:12,mana:6,board:['agrippa_1','rom_0'],hand:['agrippa_11','agrippa_3','agrippa_0']},
  rival:{health:8,board:['fabius_1','neutral_2']}},
 {id:'suentel',chapter:'mittelalter',title:'Am Süntel',place:'Süntel',year:'782',hero:'khan',foe:'ragnar',boss:'Die fränkischen Grafen',
  text:'782 lagern die Sachsen am Süntel. Die fränkischen Grafen greifen übereilt an, ohne auf das Heer des Theoderich zu warten. Schlage zu, bevor sie sich sammeln.',
  hint:'Ein Aufstand stärkt nur, wer schon auf dem Feld steht. Und jeder Schildwall braucht den richtigen Gegner.',
  source:'Reichsannalen zu 782',
  you:{health:12,mana:7,board:['khan_0','khan_10'],hand:['khan_5','khan_2','khan_3','khan_1']},
  rival:{health:7,board:['neutral_4','neutral_8']}},
 {id:'konstantinopel',chapter:'byzanz',title:'Das Banner von San Marco',place:'Konstantinopel',year:'1203',hero:'dandolo',foe:'anna',boss:'Alexios III. Angelos',
  text:'Juli 1203: Die Galeeren erreichen die Seemauer am Goldenen Horn. Der blinde Doge Enrico Dandolo steht in Waffen am Bug, vor sich das Banner von San Marco, und befiehlt, ihn an Land zu setzen.',
  hint:'Der Doge greift selbst an – mit der besten Waffe, die Du ihm gibst. Und die Warägergarde trägt Segen.',
  source:'Geoffroi de Villehardouin, Die Eroberung von Konstantinopel',
  you:{health:12,mana:6,board:['dandolo_1'],hand:['dandolo_4','dandolo_11','dandolo_2']},
  rival:{health:4,board:['anna_2']}},
 {id:'brennofen',chapter:'ostasien',title:'Der Brennofen',place:'Dresden',year:'1708',hero:'nostradamus',foe:'zizka',boss:'Die Wachen des Kurfürsten',power:false,
  text:'August der Starke will Gold und lässt Böttger bewachen. Doch im Ofen entsteht 1708 etwas anderes: das erste weiße Porzellan Europas, gebrannt bei rund 1300 Grad. Die Glut verschont niemanden, der zu nah steht.',
  hint:'Die Glut trifft alle Diener, auch Deine. Wer vorher noch zuschlagen kann, soll es tun. Und Du hast nur noch 2 Leben.',
  source:'Böttgers Laborbuch, Januar 1708',
  you:{health:2,mana:6,board:['nostradamus_8','nostradamus_2'],hand:['nostradamus_7','nostradamus_1','nostradamus_5']},
  rival:{health:9,board:['neutral_7','byzanz_0','neutral_4']}}
].map(z=>({reward:75,...z}));

const byId=Object.fromEntries(PUZZLES.map(z=>[z.id,z]));
const ofChapter=id=>PUZZLES.find(z=>z.chapter===id)||null;
const chapter=z=>KA.CHAPTERS.find(c=>c.id===z.chapter);
// Offen, sobald alle Missionen des Kapitels gewonnen sind.
const unlocked=(p,z)=>{const c=chapter(z);return !!c&&KA.done(p,c)===c.missions.length;};
const solved=(p,z)=>p.puzzles.includes(z.id);
const normalize=p=>{p.puzzles=Array.isArray(p.puzzles)?[...new Set(p.puzzles.filter(id=>byId[id]))]:[];return p;};

// Der feste Zustand eines Rätsels: Dein Zug läuft, beide Decks sind leer, der Zufall bleibt außen vor.
function state(z){const s={version:1,seed:7919,nextId:1,players:[],active:0,turn:z.turn||9,phase:'play',winner:null,mode:'puzzle',mission:null,puzzle:z.id,boss:z.boss,events:[],log:[],rewarded:false};
 [[z.hero,z.you],[z.foe,z.rival]].forEach(([hero,x],p)=>{const mana=p===0?x.mana||0:0;
  s.players.push({hero,health:x.health,maxHealth:Math.max(30,x.health),armor:x.armor||0,mana,maxMana:mana,hand:[],deck:[],board:[],grave:[],weapon:x.weapon?{...x.weapon}:null,
   tempAttack:0,attacked:false,powerUsed:p===0&&z.power===false,fatigue:0,turns:Math.ceil((z.turn||9)/2)});});
 [z.you,z.rival].forEach((x,p)=>{for(const entry of x.board||[]){const [id,set]=Array.isArray(entry)?entry:[entry,{}],u=E.summon(s,p,id);Object.assign(u,{ready:!D.byId[id].building},set);delete u.fresh;}
  for(const id of x.hand||[])s.players[p].hand.push({id,uid:'c'+s.nextId++});});
 E.auras(s);s.events=[];s.log=['Rätsel: '+z.title+' – gewinne in diesem Zug.'];return s;}

// Alle Züge des aktiven Spielers außer „Zug beenden“; Diener an jeder Stelle der Reihe (die Schiefe Schlachtordnung zählt von links).
function moves(s){const out=[];for(const a of E.legal(s)){if(a.type==='end')continue;
  const h=a.type==='play'&&s.players[s.active].hand.find(x=>x.uid===a.uid),c=h&&D.byId[h.id];
  if(c&&c.type==='minion'&&s.players[s.active].board.length)for(let i=0;i<=s.players[s.active].board.length;i++)out.push({...a,position:i});else out.push(a);}
 return out;}
const key=s=>JSON.stringify([s.players,s.choice]);
// → {win, shortest (Schritte bis zum Sieg), line (eine kürzeste Lösung), first (Zahl der ersten Schritte), good (davon zum Ziel),
// lines (Zahl der verschiedenen Lösungswege), states (durchsuchte Zustände)}.
function solve(start){const memo=new Map();
 function go(s){const k=key(s);if(memo.has(k))return memo.get(k);let best=null,lines=0;memo.set(k,{best:null,lines:0});
  for(const m of moves(s)){const c=E.clone(s);if(!E.apply(c,m).ok)continue;
   if(c.phase==='over'){if(c.winner===0){lines++;if(!best||best.length>1)best=[m];}continue;}
   const r=go(c);lines+=r.lines;if(r.best&&(!best||best.length>r.best.length+1))best=[m,...r.best];}
  const r={best,lines};memo.set(k,r);return r;}
 const all=moves(start);let good=0;
 for(const m of all){const c=E.clone(start);E.apply(c,m);if(c.phase==='over'?c.winner===0:!!go(c).best)good++;}
 const r=go(start);return {win:!!r.best,shortest:r.best?r.best.length:0,line:r.best||[],first:all.length,good,lines:r.lines,states:memo.size};}

const api={PUZZLES,byId,ofChapter,chapter,unlocked,solved,normalize,state,moves,solve};
if(node)module.exports=api;else root.AERA=api;
})(typeof globalThis!=='undefined'?globalThis:this);
