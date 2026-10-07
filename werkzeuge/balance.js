#!/usr/bin/env node
// Balance-Werkzeug (AP 5.1): KI gegen KI für alle Heldenpaarungen, mit Start- und Zufallsdecks.
//
//   node werkzeuge/balance.js                      # 200 Partien je Paarung, Bericht nach balance/BERICHT.md
//   node werkzeuge/balance.js --partien 20 --bericht sichtpruefung/balance/BERICHT.md   # verkürzt (CI)
//   Optionen: --partien N  --seed N  --decks start,zufall  --threads N  --bericht Pfad  --json Pfad
//   Regelvariante testen, ohne das Spiel zu ändern: AETERNA_MODELL=<Ordner> (Kopie von model/ mit data.js, engine.js)
//
// Gleicher Startwert → gleiche Zahlen, unabhängig von der Zahl der Threads: Jede Partie bekommt ihren Startwert
// aus (Startwert, Deckart, Paarung, Partie), und die Ergebnisse sind reine Zählungen.
// Je zwei Partien teilen sich Startwert und Decks und unterscheiden sich nur darin, wer beginnt.
'use strict';
const path=require('node:path'),fs=require('node:fs'),os=require('node:os'),crypto=require('node:crypto');
const {Worker,isMainThread,parentPort,workerData}=require('node:worker_threads');
// Regelvarianten vergleichen: AETERNA_MODELL=<Ordner mit data.js und engine.js> node werkzeuge/balance.js …
const MODEL=process.env.AETERNA_MODELL?path.resolve(process.env.AETERNA_MODELL):path.join(__dirname,'../quellcode/assets/game/model');
const D=require(path.join(MODEL,'data.js')),E=require(path.join(MODEL,'engine.js'));
const MODES={start:'Startdecks',zufall:'Zufallsdecks'};
const TARGET={field:[.47,.53],pair:.40,first:.55,legend:.55};

function mix(...n){let h=0x9e3779b9;for(const x of n){h=Math.imul(h^(x>>>0),0x85ebca6b);h^=h>>>13;h=Math.imul(h,0xc2b2ae35);h^=h>>>16;}return (h>>>0)||1;}
const isCard=id=>D.byId[id].rarity!=='token';

// Eine Partie KI gegen KI. Beide Seiten tauschen beim Start Karten ab 4 Mana (Regel der KI für Spieler 2).
function play({hero,foe,mode,seed,first}){
 const deck=mode==='start'?E.starter(hero):E.randomDeck(hero,mix(seed,1));
 const enemyDeck=mode==='start'?E.starter(foe):E.randomDeck(foe,mix(seed,2));
 const s=E.create({hero,foe,deck,enemyDeck,mode:'free',mission:null,seed,first});
 E.mulligan(s,s.players[0].hand.filter(c=>D.byId[c.id].cost>=4).map(c=>c.uid));
 const seen=[new Set(),new Set()],drawn=[new Set(),new Set()],played=[new Set(),new Set()],style=[{atk:0,face:0,siege:0},{atk:0,face:0,siege:0}];
 const look=()=>{for(let p=0;p<2;p++)for(const c of s.players[p].hand)if(!seen[p].has(c.uid)){seen[p].add(c.uid);if(isCard(c.id))drawn[p].add(c.id);}};
 look();
 let guard=0;
 while(s.phase==='play'){
  if(++guard>5000)throw new Error('Partie endet nicht: '+JSON.stringify({hero,foe,mode,seed,first}));
  const a=E.ai(s)||{type:'end'};
  if(a.type==='play'){const c=s.players[s.active].hand.find(h=>h.uid===a.uid);if(isCard(c.id))played[s.active].add(c.id);}
  // Spielweise der KI (AP 5.8 Teil 2): wohin die Angriffe gehen – Held, Diener oder Bauwerk.
  if(a.type==='attack'){const st=style[s.active],t=E.unit(s,a.target);st.atk++;if(t.hero)st.face++;else if(t.obj.building)st.siege++;}
  const r=E.apply(s,a);if(!r.ok)throw new Error(r.error+' '+JSON.stringify(a));
  look();
 }
 return {winner:s.winner,turns:s.turn,decks:[new Set(deck),new Set(enemyDeck)],drawn,played,style};
}

// Eine Paarung (i ≤ j) mit n Partien; Punkte doppelt gezählt (Sieg 2, Unentschieden 1), damit alles ganzzahlig bleibt.
function job({mode,m,i,j,n,seed}){
 const hero=D.heroes[i].id,foe=D.heroes[j].id,out={mode,i,j,games:0,pts:0,draws:0,first:{games:0,pts:0},seat:{},turns:{},cards:{},style:{}};
 const seat=(h,k)=>out.seat[h+'|'+k]??=({games:0,pts:0});
 for(let k=0;k<n;k++){
  const first=k%2,g=play({hero,foe,mode,seed:mix(seed,m,i,j,k>>1),first});
  const pts=p=>g.winner===p?2:g.winner===-1?1:0;
  out.games++;out.pts+=pts(0);if(g.winner===-1)out.draws++;
  out.first.games++;out.first.pts+=pts(first);
  out.turns[g.turns]=(out.turns[g.turns]||0)+1;
  for(let p=0;p<2;p++){
   const h=p===0?hero:foe,st=seat(h,p===first?'first':'second');st.games++;st.pts+=pts(p);
   const sy=out.style[h]??={atk:0,face:0,siege:0};for(const k in sy)sy[k]+=g.style[p][k];
   for(const id of g.decks[p]){
    const c=out.cards[h+'|'+id]??=({deck:0,deckPts:0,drawn:0,drawnPts:0,played:0,playedPts:0});
    c.deck++;c.deckPts+=pts(p);
    if(g.drawn[p].has(id)){c.drawn++;c.drawnPts+=pts(p);}
    if(g.played[p].has(id)){c.played++;c.playedPts+=pts(p);}
   }
  }
 }
 return out;
}

function jobs({partien,seed,decks}){
 const list=[];
 decks.forEach(mode=>{const m=Object.keys(MODES).indexOf(mode);for(let i=0;i<D.heroes.length;i++)for(let j=i;j<D.heroes.length;j++)list.push({mode,m,i,j,n:partien,seed});});
 return list;
}

function merge(results,opts){
 const R={opts,rules:rulesHash(),modes:{}};
 for(const mode of opts.decks)R.modes[mode]={pairs:{},first:{games:0,pts:0},draws:0,games:0,seat:{},turns:{},cards:{},style:{}};
 const add=(a,b)=>{for(const k in b)a[k]=(a[k]||0)+b[k];};
 for(const r of results){
  const M=R.modes[r.mode];
  M.pairs[r.i+'|'+r.j]={games:r.games,pts:r.pts,draws:r.draws};
  M.games+=r.games;M.draws+=r.draws;add(M.first,r.first);add(M.turns,r.turns);
  for(const k in r.seat)add(M.seat[k]??={},r.seat[k]);
  for(const k in r.cards)add(M.cards[k]??={},r.cards[k]);
  for(const k in r.style)add(M.style[k]??={},r.style[k]);
 }
 return R;
}

function rulesHash(){const h=crypto.createHash('sha1');for(const f of ['data.js','engine.js'])h.update(fs.readFileSync(path.join(MODEL,f)));return h.digest('hex').slice(0,10);}

async function run(opts={}){
 opts={partien:200,seed:20261006,decks:Object.keys(MODES),threads:os.availableParallelism?.()||os.cpus().length,...opts};
 if(opts.partien%2)opts.partien++;
 const list=jobs(opts),results=new Array(list.length),progress=opts.progress||(()=>{});
 const threads=Math.max(1,Math.min(opts.threads,list.length));
 if(threads===1){list.forEach((j,k)=>{results[k]=job(j);progress(k+1,list.length);});return merge(results,opts);}
 let next=0,done=0;
 await Promise.all(Array.from({length:threads},()=>new Promise((resolve,reject)=>{
  const w=new Worker(__filename,{workerData:{}});let current=-1;
  const feed=()=>{if(next>=list.length){w.terminate().then(()=>resolve());return;}current=next++;w.postMessage(list[current]);};
  w.on('message',r=>{results[current]=r;progress(++done,list.length);feed();});
  w.on('error',reject);
  feed();
 })));
 return merge(results,opts);
}

// ---------- Auswertung ----------
const pct=x=>x==null||isNaN(x)?'–':(x*100).toFixed(1).replace('.',',')+' %';
const pp=x=>(x>=0?'+':'−')+Math.abs(x*100).toFixed(1).replace('.',',');
const short=h=>D.ageById[h]?.name||({leonidas:'Leonidas',hypatia:'Hypatia',imhotep:'Imhotep',dandolo:'Dandolo',khan:'Khan',boudicca:'Boudicca',nostradamus:'Nostradamus',jeanne:'Jeanne',ragnar:'Ragnar',musashi:'Musashi',perikles:'Perikles',agrippa:'Agrippa',amanirenas:'Amanirenas',anna:'Anna',nezahualcoyotl:'Nezahualcóyotl',masako:'Masako'})[h]||h;

// Siegquote von Held i gegen Held j (Unentschieden zählen halb).
function rate(M,i,j){if(i<=j){const p=M.pairs[i+'|'+j];return p?p.pts/(2*p.games):null;}const p=M.pairs[j+'|'+i];return p?1-p.pts/(2*p.games):null;}

function analyse(R){
 const out={};
 for(const [mode,M] of Object.entries(R.modes)){
  const n=D.heroes.length,heroes=D.heroes.map((h,i)=>{
   const vs=D.heroes.map((_,j)=>rate(M,i,j)),others=vs.filter((_,j)=>j!==i);
   const field=others.reduce((a,b)=>a+b,0)/others.length;
   const f=M.seat[h.id+'|first'],s=M.seat[h.id+'|second'];
   let overallPts=0,overallGames=0;for(const k of ['first','second']){const x=M.seat[h.id+'|'+k];overallPts+=x.pts;overallGames+=x.games;}
   const worst=others.reduce((b,x,k)=>x<b.x?{x,j:k>=i?k+1:k}:b,{x:2,j:-1}),best=others.reduce((b,x,k)=>x>b.x?{x,j:k>=i?k+1:k}:b,{x:-1,j:-1});
   const sy=M.style[h.id]||{atk:0,face:0,siege:0};
   return {id:h.id,i,vs,field,first:f.pts/(2*f.games),second:s.pts/(2*s.games),overall:overallPts/(2*overallGames),worst,best,face:sy.atk?sy.face/sy.atk:null,siege:sy.atk?sy.siege/sy.atk:null};
  });
  const first=M.first.pts/(2*M.first.games);
  const lengths=Object.entries(M.turns).flatMap(([t,c])=>Array(c).fill(+t)).sort((a,b)=>a-b);
  const q=x=>lengths[Math.min(lengths.length-1,Math.floor(x*lengths.length))];
  const cards=Object.entries(M.cards).map(([k,c])=>{const [hero,id]=k.split('|');return {hero,id,...c};});
  const base=Object.fromEntries(heroes.map(h=>[h.id,h.overall]));
  const byCard={};for(const c of cards){const b=byCard[c.id]??={id:c.id,deck:0,drawn:0,drawnPts:0,played:0,playedPts:0,baseSum:0};b.deck+=c.deck;b.drawn+=c.drawn;b.drawnPts+=c.drawnPts;b.played+=c.played;b.playedPts+=c.playedPts;b.baseSum+=c.drawn*base[c.hero];}
  for(const b of Object.values(byCard)){b.playRate=b.played/b.deck;b.drawnRate=b.drawn?b.drawnPts/(2*b.drawn):null;b.delta=b.drawn?b.drawnRate-b.baseSum/b.drawn:null;}
  const pairsOut=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const r=rate(M,i,j);if(r<TARGET.pair||r>1-TARGET.pair)pairsOut.push({i,j,r});}
  // Legendäre als Gruppe (AP 5.3): „gewinnt, wenn gezogen“ über alle Partien, in denen eine Legendäre auf die Hand kam.
  const legends=Object.values(byCard).filter(b=>D.byId[b.id].rarity==='legendary'&&b.drawn);
  const lg=legends.reduce((g,b)=>({drawn:g.drawn+b.drawn,pts:g.pts+b.drawnPts,base:g.base+b.baseSum}),{drawn:0,pts:0,base:0});
  const legend=lg.drawn?{rate:lg.pts/(2*lg.drawn),delta:lg.pts/(2*lg.drawn)-lg.base/lg.drawn,drawn:lg.drawn}:null;
  const ok={field:heroes.every(h=>h.field>=TARGET.field[0]&&h.field<=TARGET.field[1]),pair:!pairsOut.length,first:first<=TARGET.first,legend:!legend||legend.rate<=TARGET.legend};
  out[mode]={heroes,first,draws:M.draws,games:M.games,mean:lengths.reduce((a,b)=>a+b,0)/lengths.length,median:q(.5),p10:q(.1),p90:q(.9),min:lengths[0],max:lengths.at(-1),cards:byCard,pairsOut,ok,legend,perPair:M.pairs['0|1'].games};
 }
 return out;
}

function report(R){
 const A=analyse(R),o=R.opts,L=[];
 const yes=b=>b?'✓':'✗';
 L.push('# Balance-Bericht','');
 L.push('Erzeugt mit `node werkzeuge/balance.js'+(o.partien!==200?' --partien '+o.partien:'')+(o.seed!==20261006?' --seed '+o.seed:'')+'` (AP 5.1). KI gegen KI, '+
  'jede Paarung '+o.partien+' Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert '+o.seed+', Regelstand `'+R.rules+'` '+
  '(Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.','');
 L.push('Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der '+
  'Siegquoten gegen die neun anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±'+
  (1.96*Math.sqrt(.25/o.partien)*100).toFixed(1).replace('.',',')+' Prozentpunkte, gegen das Feld etwa ±'+(1.96*Math.sqrt(.25/((D.heroes.length-1)*o.partien))*100).toFixed(1).replace('.',',')+'.','');
 L.push('**Ziele (AP 5.2):** jeder Held '+pct(TARGET.field[0])+' bis '+pct(TARGET.field[1])+' gegen das Feld, keine Paarung schlechter als 40/60, '+
  'Vorteil des Beginners ≤ '+pct(TARGET.first)+'. **AP 5.3:** Legendäre als Gruppe ≤ '+pct(TARGET.legend)+' „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).','');
 L.push('| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |','|---|---|---|---|---|---|---|---|');
 for(const [mode,a] of Object.entries(A))L.push('| '+MODES[mode]+' | '+a.games+' | '+yes(a.ok.field)+' '+a.heroes.filter(h=>h.field>=TARGET.field[0]&&h.field<=TARGET.field[1]).length+'/'+D.heroes.length+' | '+
  yes(a.ok.pair)+' '+(D.heroes.length*(D.heroes.length-1)/2-a.pairsOut.length)+'/'+D.heroes.length*(D.heroes.length-1)/2+' | '+yes(a.ok.first)+' '+pct(a.first)+' | '+(a.legend?yes(a.ok.legend)+' '+pct(a.legend.rate)+' ('+pp(a.legend.delta)+')':'–')+' | '+a.draws+' | '+a.median+' |');
 L.push('');
 for(const [mode,a] of Object.entries(A)){
  L.push('## '+MODES[mode],'');
  L.push(mode==='start'?'Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.':
   'Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).','');
  L.push('| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |','|---|---|---|---|---|---|---|---|');
  for(const h of [...a.heroes].sort((x,y)=>y.field-x.field))L.push('| '+D.heroes[h.i].name+' | **'+pct(h.field)+'** | '+pct(h.first)+' | '+pct(h.second)+' | '+
   short(D.heroes[h.worst.j].id)+' '+pct(h.worst.x)+' | '+short(D.heroes[h.best.j].id)+' '+pct(h.best.x)+' | '+(D.personalities[D.heroes[h.i].ai]?.name||'–')+': '+pct(h.face)+' | '+yes(h.field>=TARGET.field[0]&&h.field<=TARGET.field[1])+' |');
  L.push('','**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):','');
  L.push('| | '+D.heroes.map(h=>short(h.id).slice(0,4)+'.').join(' | ')+' |','|---|'+D.heroes.map(()=>'---:').join('|')+'|');
  for(const h of a.heroes)L.push('| '+short(h.id)+' | '+h.vs.map((x,j)=>j===h.i?'·':(x<TARGET.pair||x>1-TARGET.pair?'**'+Math.round(x*100)+'**':Math.round(x*100))).join(' | ')+' |');
  const styles=Object.keys(D.personalities).map(k=>{const hs=a.heroes.filter(h=>D.heroes[h.i].ai===k),m=x=>hs.reduce((n,h)=>n+(h[x]||0),0)/(hs.length||1);return '**'+D.personalities[k].name+'** ('+hs.length+' Helden) '+pct(m('face'))+' aufs Gesicht, '+pct(m('siege'))+' auf Bauwerke';});
  L.push('','**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: '+styles.join(' · ')+'.');
  L.push('','**Partielänge** (Züge beider Seiten zusammen): Mittel '+a.mean.toFixed(1).replace('.',',')+', Median '+a.median+', 10–90 %: '+a.p10+'–'+a.p90+
   ', kürzeste '+a.min+', längste '+a.max+'. Beginner gewinnt '+pct(a.first)+', Unentschieden (Zuglimit 120): '+a.draws+'.','');
  const list=Object.values(a.cards).filter(c=>c.drawn>=Math.max(20,o.partien/5)).sort((x,y)=>y.delta-x.delta);
  const line=c=>{const d=D.byId[c.id];return '| '+d.name+' | '+(d.hero==='neutral'?'neutral':short(d.hero))+' | '+d.cost+' | '+pct(c.drawnRate)+' | '+pp(c.delta)+' | '+pct(c.playRate)+' |';};
  L.push('**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):','');
  L.push('| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |','|---|---|---:|---:|---:|---:|');
  for(const c of [...list.slice(0,8),...list.slice(-8)])L.push(line(c));
  L.push('');
  if(a.legend){
   L.push('**Legendäre** (AP 5.3) – als Gruppe '+pct(a.legend.rate)+' „gewinnt, wenn gezogen“ ('+pp(a.legend.delta)+' gegenüber ihrem Helden, '+a.legend.drawn+' Partien):','');
   L.push('| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |','|---|---|---:|---:|---:|---:|');
   for(const c of Object.values(a.cards).filter(c=>D.byId[c.id].rarity==='legendary'&&c.drawn).sort((x,y)=>y.drawnRate-x.drawnRate))L.push(line(c));
   L.push('');}
 }
 L.push('## Alle Karten','');
 L.push('„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; '+
  '„gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.','');
 const modes=Object.keys(A);
 L.push('| Karte | Held | Mana | Seltenheit | '+modes.map(m=>MODES[m]+': im Deck | gespielt | gewinnt, wenn gezogen | Δ').join(' | ')+' |',
  '|---|---|---:|---|'+modes.map(()=>'---:|---:|---:|---:').join('|')+'|');
 for(const c of D.cards){
  const cells=modes.map(m=>{const x=A[m].cards[c.id];return x?x.deck+' | '+pct(x.playRate)+' | '+pct(x.drawnRate)+' | '+(x.delta==null?'–':pp(x.delta)):'– | – | – | –';});
  L.push('| '+c.name+' | '+(c.hero==='neutral'?'neutral':short(c.hero))+' | '+c.cost+' | '+D.rarities[c.rarity]+' | '+cells.join(' | ')+' |');
 }
 L.push('');
 return L.join('\n');
}

function args(argv){
 const o={};for(let k=0;k<argv.length;k++){const a=argv[k],v=argv[k+1];
  if(a==='--partien'){o.partien=+v;k++;}else if(a==='--seed'){o.seed=+v;k++;}else if(a==='--threads'){o.threads=+v;k++;}
  else if(a==='--decks'){o.decks=v.split(',');k++;}else if(a==='--bericht'){o.bericht=v;k++;}else if(a==='--json'){o.json=v;k++;}
  else throw new Error('Unbekannte Option '+a);}
 for(const m of o.decks||[])if(!MODES[m])throw new Error('Deckart '+m+' unbekannt (start, zufall).');
 return o;
}

async function main(){
 const o=args(process.argv.slice(2)),t0=Date.now();
 const bericht=o.bericht||path.join(__dirname,'../balance/BERICHT.md');delete o.bericht;
 const json=o.json;delete o.json;
 let last=-1;
 const R=await run({...o,progress:(d,n)=>{const p=Math.floor(d/n*10);if(p!==last){last=p;process.stderr.write('  '+d+'/'+n+' Paarungen\n');}}});
 fs.mkdirSync(path.dirname(bericht),{recursive:true});fs.writeFileSync(bericht,report(R));
 if(json){fs.mkdirSync(path.dirname(json),{recursive:true});fs.writeFileSync(json,JSON.stringify(R));}
 const A=analyse(R);
 for(const [mode,a] of Object.entries(A)){
  console.log(MODES[mode]+': '+a.games+' Partien, Beginner '+pct(a.first)+', Median '+a.median+' Züge');
  for(const h of [...a.heroes].sort((x,y)=>y.field-x.field))console.log('  '+short(h.id).padEnd(12)+pct(h.field).padStart(8)+'  schwerste: '+short(D.heroes[h.worst.j].id)+' '+pct(h.worst.x));
  if(a.legend){console.log('  Legendäre als Gruppe '+pct(a.legend.rate)+' ('+pp(a.legend.delta)+')');
   for(const c of Object.values(a.cards).filter(c=>D.byId[c.id].rarity==='legendary'&&c.drawn).sort((x,y)=>y.drawnRate-x.drawnRate))console.log('    '+D.byId[c.id].name.padEnd(42)+pct(c.drawnRate).padStart(8)+' '+pp(c.delta).padStart(6)+'  gespielt '+pct(c.playRate));}
 }
 console.log('Bericht: '+path.relative(process.cwd(),bericht)+' ('+((Date.now()-t0)/1000).toFixed(1)+' s)');
}

if(!isMainThread)parentPort.on('message',j=>parentPort.postMessage(job(j)));
else if(require.main===module)main().catch(e=>{console.error(e);process.exit(1);});
module.exports={run,report,analyse,play,mix,TARGET};
