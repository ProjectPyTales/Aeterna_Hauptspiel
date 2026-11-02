/* Lehrstunden (AP 6.5, seit 1.34.0): die ersten drei Partien geführt. Der Chronist erklärt Schritt für Schritt, was gerade zu tun
 * ist – Mana, Diener, Angriff, Heldenfähigkeit, Schildwall, Zauber, Großansicht, Gunst der Stunde, Einmarsch, Sturmangriff und
 * Vermächtnis. Feste Hände und Decks in fester Reihenfolge, ein Gegner auf der Stufe „Lehrling“ (AP 5.8) mit weniger Leben.
 * Keine neue Regel in der Engine: nur der Modus 'tutorial' und das Feld s.lesson = {id, step}. Keine DOM-Zugriffe.
 *
 * profile.tutorial = {done: [Kennungen], skipped} – über normalize; wer vor 1.34.0 schon gespielt hat, bekommt skipped:true
 * (das Menü bietet die Lehrstunden dann nicht mehr an, die Einstellungen und die Spielregeln schon).
 *
 * Jeder Schritt: text (was der Chronist sagt), focus (wohin der goldene Ring zeigt: hand, chrono, board, power, enemy, foeBoard),
 * card (die Handkarte, um die es geht) und done(s, ev) – ist er erfüllt, geht es weiter. ev = {act, p} nach jeder Aktion oder
 * {note:'inspect'} nach einem langen Druck. Wer etwas anderes tut, verpasst nichts: jeder Schritt endet spätestens mit einem
 * späteren eigenen Zug, und der letzte Schritt („Besiege …“) bleibt bis zum Ende stehen. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('./data.js'):root.CHD,E=node?require('./engine.js'):root.CHE;

const own=s=>s.players[0],turns=s=>own(s).turns;
const onBoard=(s,id)=>own(s).board.some(u=>u.id===id);
const played=(ev,id)=>ev.p===0&&ev.act?.type==='play'&&ev.card===id;
const did=(ev,type)=>ev.p===0&&ev.act?.type===type;

const LESSONS=[
 {id:'schlacht',n:1,title:'Die erste Schlacht',place:'Übungsplatz in Sparta',year:'um 480 v. Chr.',hero:'leonidas',foe:'perikles',first:0,seed:4801,reward:{gold:50},
  intro:'Spartas Jungen übten jahrelang für die Phalanx, Schulter an Schulter. Heute übst Du mit Leonidas gegen Perikles aus Athen – erst die Grundlagen, dann den Kampf.',
  source:'Plutarch, Lykurgos 16–17',
  you:{hand:['leonidas_0','neutral_2','neutral_8','neutral_1'],deck:['neutral_6','leonidas_3','neutral_5','leonidas_1','neutral_9','neutral_3','leonidas_2','neutral_4','neutral_7','neutral_10','leonidas_0','neutral_2','neutral_8','neutral_1','neutral_6']},
  rival:{health:12,hand:['perikles_0','neutral_0','neutral_2'],deck:['neutral_8','perikles_3','neutral_1','neutral_6','neutral_0','neutral_3','perikles_0','neutral_9','neutral_4','neutral_2','neutral_7','neutral_5']},
  steps:[
   {id:'mana',focus:'hand',card:'leonidas_0',text:'Links zeigt die Äther-Uhr Dein Mana: Du hast 1. Ziehe den Spartanischen Rekruten (1 Mana) mit dem Finger auf Dein Feld.',done:s=>onBoard(s,'leonidas_0')||turns(s)>=2},
   {id:'ende',focus:'chrono',text:'Neu gerufene Diener ruhen einen Zug. Beende Deinen Zug: Tippe auf den Chronometer rechts.',done:s=>s.active===1||turns(s)>=2},
   {id:'mehr',focus:'hand',card:'neutral_2',text:'Jeder Zug füllt die Uhr um ein Mana mehr – jetzt sind es 2. Spiele den Steinschleuderer.',done:(s,ev)=>played(ev,'neutral_2')||onBoard(s,'neutral_2')||turns(s)>=3},
   {id:'angriff',focus:'board',text:'Dein Rekrut ist bereit – er leuchtet. Ziehe ihn auf einen Gegner: einen Diener oder Perikles selbst.',done:(s,ev)=>did(ev,'attack')||turns(s)>=3},
   {id:'ende2',focus:'chrono',text:'Gut gekämpft! Wer angegriffen hat, hat Schaden genommen – die Zahlen zeigen Angriff und Leben. Beende den Zug.',done:s=>turns(s)>=3},
   {id:'phalanx',focus:'power',text:'Neben Leonidas liegt sein Siegel: die Heldenfähigkeit „Phalanx“ – 2 Mana, einmal je Zug. Tippe sie an.',done:(s,ev)=>did(ev,'power')||turns(s)>=4},
   {id:'sieg',focus:'enemy',text:'Jetzt kennst Du das Wichtigste: Mana, Diener, Angriff und Heldenfähigkeit. Bring das Leben von Perikles auf 0!',done:()=>false}]},
 {id:'schildwall',n:2,title:'Schildwall und Zauber',place:'Museion von Alexandria',year:'um 400',hero:'hypatia',foe:'zizka',first:0,seed:4152,reward:{gold:50},mana:2,
  intro:'Hypatia lehrte in Alexandria Mathematik und Sternkunde. Gegen Vaubans Festungen hilft kein Sturmlauf – aber Wissen: Ein Zauber trifft auch hinter dem Schildwall.',
  source:'Sokrates Scholastikos, Kirchengeschichte VII 15',
  you:{hand:['hypatia_1','hypatia_0','neutral_2','neutral_3'],deck:['hypatia_2','neutral_6','hypatia_1','neutral_5','hypatia_3','neutral_7','neutral_9','hypatia_0','neutral_4','neutral_2','neutral_3','neutral_10','hypatia_2','neutral_1']},
  rival:{health:12,board:['neutral_8'],hand:['zizka_0','neutral_0','zizka_1'],deck:['neutral_2','zizka_3','neutral_1','neutral_6','zizka_0','neutral_4','neutral_3','neutral_9','neutral_8','neutral_7']},
  steps:[
   {id:'schildwall',focus:'foeBoard',text:'Vauban hat einen Wachhund mit Schildwall – ihn müssen Diener und Helden zuerst angreifen. Halte den Finger auf den Wachhund, um es nachzulesen.',done:(s,ev)=>ev.note==='inspect'||ev.p===0&&!!ev.act},
   {id:'zauber',focus:'hand',card:'hypatia_1',text:'Zauber umgehen den Schildwall. Ziehe die „Erdmessung des Eratosthenes“ (3 Schaden) auf den Wachhund oder direkt auf Vauban.',done:(s,ev)=>played(ev,'hypatia_1')||turns(s)>=3},
   {id:'ende',focus:'chrono',text:'Dein Mana ist verbraucht. Beende den Zug.',done:s=>turns(s)>=3},
   {id:'unterricht',focus:'power',text:'Hypatias Heldenfähigkeit „Unterricht“ ruft einen Schüler (1/1) auf Dein Feld. Probiere sie aus.',done:(s,ev)=>did(ev,'power')||turns(s)>=4},
   {id:'grossansicht',focus:'hand',text:'Halte den Finger auf eine Karte in Deiner Hand: Die Großansicht zeigt Werte, Schlüsselwörter und einen Satz aus der Chronik.',done:(s,ev)=>ev.note==='inspect'||turns(s)>=5},
   {id:'sieg',focus:'enemy',text:'Besiege Vauban! Neue Schildwall-Diener zuerst angreifen – oder mit einem Zauber darüber hinweg.',done:()=>false}]},
 {id:'gunst',n:3,title:'Die Gunst der Stunde',place:'Wälder Westfalens',year:'782',hero:'khan',foe:'imhotep',first:1,seed:7821,reward:{gold:50,packs:1},
  intro:'Widukind führte die Sachsen gegen Karl den Großen, oft aus dem Hinterhalt der Wälder. Heute beginnt der Gegner – dafür liegt das Glück auf Deiner Seite.',
  source:'Reichsannalen zu 777–785',
  you:{hand:['khan_0','khan_1','neutral_1','khan_3'],deck:['neutral_6','khan_2','neutral_5','khan_0','neutral_9','khan_1','neutral_3','khan_3','neutral_4','neutral_2','neutral_7','khan_2','neutral_10','neutral_8']},
  rival:{health:18,hand:['imhotep_0','neutral_0','imhotep_2'],deck:['neutral_2','imhotep_1','neutral_1','imhotep_3','neutral_6','imhotep_0','neutral_4','neutral_3','imhotep_2','neutral_9','neutral_7']},
  steps:[
   {id:'gunst',focus:'hand',card:'coin',text:'Imhotep hat begonnen. Dafür hast Du die „Gunst der Stunde“: Sie kostet 0 und gibt Dir in diesem Zug 2 Mana mehr. Heb sie auf, bis sie Dir einen starken Zug erlaubt.',done:(s,ev)=>played(ev,'coin')||turns(s)>=3},
   {id:'einmarsch',focus:'hand',card:'khan_1',text:'„Einmarsch“ wirkt, wenn Du die Karte aus der Hand spielst: Der Speerwerfer aus Westfalen trifft Imhotep sofort mit 1 Schaden.',done:(s,ev)=>played(ev,'khan_1')||turns(s)>=4},
   {id:'sturm',focus:'hand',card:'khan_3',text:'Der Reiter der Edelinge hat „Sturmangriff“: Er greift im selben Zug an, ohne zu ruhen. Spiele ihn und greif gleich an – mit der Gunst der Stunde schon einen Zug früher.',done:(s,ev)=>played(ev,'khan_3')||turns(s)>=6},
   {id:'vermaechtnis',focus:'hand',card:'neutral_1',text:'„Vermächtnis“ wirkt, wenn der Diener stirbt: Der Wandernde Händler hinterlässt Dir dann 2 Rüstung.',done:(s,ev)=>played(ev,'neutral_1')||turns(s)>=7},
   {id:'sieg',focus:'enemy',text:'Du weißt jetzt genug für Kampagne, Kolosseum und Tagesduell. Besiege Imhotep!',done:()=>false}]}];

const byId=Object.fromEntries(LESSONS.map(z=>[z.id,z]));
const normalize=(p,veteran=false)=>{const t=p.tutorial&&typeof p.tutorial==='object'?p.tutorial:null;
 p.tutorial={done:Array.isArray(t?.done)?[...new Set(t.done.filter(id=>byId[id]))]:[],skipped:t?t.skipped===true:veteran};return p;};
const done=(p,z)=>p.tutorial.done.includes(z.id);
// Die nächste offene Lehrstunde (null, wenn alle geschafft sind).
const next=p=>LESSONS.find(z=>!done(p,z))||null;
// Bietet das Hauptmenü die Lehrstunden an? Solange nicht alle geschafft und nicht ausgeblendet.
const offered=p=>!p.tutorial.skipped&&!!next(p);

// Der feste Anfang einer Lehrstunde. Die Engine legt wie immer auf (Münze für den Zweiten, erster Zug); danach ersetzt die
// Lehrstunde Hände und Decks durch ihre feste Reihenfolge, setzt das Leben des Gegners und stellt seine Diener auf.
function state(z){const s=E.create({hero:z.hero,foe:z.foe,deck:z.you.deck,enemyDeck:z.rival.deck,mode:'tutorial',seed:z.seed,first:z.first,level:'lehrling'});
 E.mulligan(s,[]);
 [z.you,z.rival].forEach((x,p)=>{const a=s.players[p],coin=a.hand.filter(h=>h.id==='coin');
  a.hand=[...x.hand.map(id=>({id,uid:'c'+s.nextId++})),...coin];a.deck=[...x.deck];
  if(x.health){a.health=x.health;a.maxHealth=x.health;}
  for(const id of x.board||[]){const u=E.summon(s,p,id);u.ready=!D.byId[id].building;delete u.fresh;}});
 if(z.mana&&s.active===0){const a=own(s);a.maxMana=a.mana=z.mana;}
 E.auras(s);s.lesson={id:z.id,step:0};s.events=[];s.log=['Lehrstunde '+z.n+': '+z.title+'.'];return s;}

// Nach jeder Aktion (beider Seiten) und nach einem langen Druck: erfüllte Schritte abhaken, auch mehrere hintereinander.
// → true, wenn sich der Schritt geändert hat.
function advance(s,ev={}){const l=s?.lesson,z=l&&byId[l.id];if(!z||s.phase==='over')return false;const from=l.step;
 while(l.step<z.steps.length-1&&z.steps[l.step].done(s,ev))l.step++;return l.step!==from;}
// Was der Chronist gerade sagt: {lesson, title, n, total, step, text, focus, card, waiting}. Im Zug des Gegners wartet er.
function coach(s){const l=s?.lesson,z=l&&byId[l.id];if(!z)return null;const st=z.steps[Math.min(l.step,z.steps.length-1)];
 const waiting=s.phase==='play'&&s.active===1;
 return {lesson:z.id,title:z.title,n:z.n,total:z.steps.length,step:l.step+1,waiting,
  text:waiting?D.heroById[z.foe].name+' ist am Zug. Schau zu, was der Gegner tut – gleich bist Du wieder dran.':st.text,
  focus:waiting?null:st.focus,card:waiting?null:st.card||null};}

const api={LESSONS,byId,normalize,done,next,offered,state,advance,coach};
if(node)module.exports=api;else root.AETU=api;
})(typeof globalThis!=='undefined'?globalThis:this);
