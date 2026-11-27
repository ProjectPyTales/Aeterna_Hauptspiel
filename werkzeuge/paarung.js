// Vertieft eine einzelne Startdeck-Paarung unter identischen Bedingungen zum Gesamtlauf.
const path=require('node:path'),{mix,play}=require('./balance');
const model=process.env.AETERNA_MODELL||path.join(__dirname,'../quellcode/assets/game/model');
const D=require(path.resolve(model,'data'));
const [left,right,nRaw='400',seedRaw='42']=process.argv.slice(2), n=Number(nRaw),seed=Number(seedRaw);
const ids=D.heroes.map(h=>h.id),order=[ids.indexOf(left),ids.indexOf(right)].sort((a,b)=>a-b);
if(order[0]<0||left===right||!Number.isSafeInteger(n)||n<2||n%2||!Number.isSafeInteger(seed))
 throw Error('Aufruf: node werkzeuge/paarung.js Held Gegner gerade-Partien Startwert');
const [i,j]=order,seat=ids[i]===left?0:1;let wins=0,draws=0;
for(let k=0;k<n;k++){const result=play({hero:ids[i],foe:ids[j],mode:'start',seed:mix(seed,0,i,j,k>>1),first:k%2});
 if(result.winner===seat)wins++;else if(result.winner===-1)draws++;}
console.log(JSON.stringify({left,right,n,seed,wins,draws,score:(wins+.5*draws)/n}));
