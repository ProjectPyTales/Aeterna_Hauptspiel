// Aufgaben und Heldenstufen (AP 6.3): Tagesaufgaben mit Lernaufgabe und einmal Neuwürfeln, Tagesgeschenk mit Serie,
// Erfahrung je Held mit Stufenbelohnungen bis zur Goldenen Fassung, alte Spielstände. Mit fester Uhr (Datum je Aufruf).
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const game=path.join(__dirname,'../../quellcode/assets/game'),need=f=>require(path.join(game,f));
const D=need('model/data.js'),E=need('model/engine.js'),P=need('model/profile.js'),Q=need('model/quests.js');
const day=(d,h=12)=>new Date(2026,9,d,h);
const over=(p,{hero='leonidas',winner=0,turns=6,mode='free'}={})=>{const s=E.create({hero,foe:'hypatia',deck:E.starter(hero),enemyDeck:E.starter('hypatia'),mode,mission:mode==='campaign'?0:null,seed:3,first:0});
 s.players[0].turns=turns;s.phase='over';s.winner=winner;return s;};
const set=(p,ids,date)=>{Q.sync(p,date);p.daily.list=ids.map(id=>({id,n:0,claimed:false}));};

test('Tagesaufgaben: drei je Tag, genau eine zum Lernen, fest je Tag und Spielstand, am nächsten Tag neu',()=>{
 const p=P.fresh();p.seed=4242;
 for(let d=1;d<=31;d++){const ids=Q.choose(p,20261000+d);assert.equal(new Set(ids).size,3);assert.equal(ids.filter(id=>Q.LEARN.includes(Q.byId[id])).length,1,'eine Lernaufgabe');
  assert.deepEqual(Q.choose(p,20261000+d),ids,'gleicher Tag, gleiche Aufgaben');}
 const seen=new Set();for(let d=1;d<=60;d++)for(const id of Q.choose(p,20261100+d))seen.add(id);
 assert.ok(seen.size>=14,'der Pool wird genutzt ('+seen.size+')');
 assert.ok(Q.LEARN.filter(q=>q.age).length===D.ages.length,'je Epoche eine Aufgabe');
 assert.equal(Q.sync(p,day(6)),true);assert.equal(p.daily.day,20261006);assert.equal(Q.sync(p,day(6,23)),false,'derselbe Tag');
 const before=p.daily.list.map(x=>x.id);Q.sync(p,day(7,0));assert.equal(p.daily.day,20261007);assert.notDeepEqual(p.daily.list.map(x=>x.id),before);
});

test('Tagesaufgaben: Karten nach Art und Epoche, Angriffe, Partien, Lesen einmal je Held und Karte',()=>{
 const p=P.fresh(),d=day(6);set(p,['age_griechen','spells6','minions10'],d);
 const greek=D.cards.find(c=>c.hero==='leonidas'&&c.type==='minion'&&!c.building),age=D.cards.find(c=>c.hero==='griechen'&&c.type==='spell'),neutral=D.cards.find(c=>c.hero==='neutral'&&c.type==='minion'&&!c.building),building=D.cards.find(c=>c.building&&Q.ageOf(c)!=='griechen');
 assert.equal(Q.ageOf(greek),'griechen');assert.equal(Q.ageOf(age),'griechen');assert.equal(Q.ageOf(neutral),null);
 for(const c of [greek,age,neutral,building])Q.track(p,{type:'play',card:c.id},d);
 assert.deepEqual(p.daily.list.map(x=>x.n),[2,1,2],'Epoche: Held und Zeitalter; Zauber; Diener ohne Bauwerk');
 const done=Q.track(p,{type:'play',card:greek.id},d);assert.deepEqual(done.map(q=>q.id),['age_griechen']);
 Q.track(p,{type:'play',card:greek.id},d);assert.equal(p.daily.list[0].n,3,'erledigt bleibt beim Ziel');
 set(p,['lore2','chronicle4','games3'],d);
 Q.track(p,{type:'lore',hero:'leonidas'},d);Q.track(p,{type:'lore',hero:'leonidas'},d);assert.equal(p.daily.list[0].n,1,'jeder Held einmal');
 assert.deepEqual(Q.track(p,{type:'lore',hero:'hypatia'},d).map(q=>q.id),['lore2']);
 for(const id of ['leonidas_6','leonidas_6','hypatia_1'])Q.track(p,{type:'chronicle',card:id},d);assert.equal(p.daily.list[1].n,2);
 P.reward(p,over(p,{winner:1,turns:2}),true,d);assert.equal(p.daily.list[2].n,0,'Aufgeben vor 4 Zügen zählt nicht');
 P.reward(p,over(p,{winner:1,turns:5}),false,d);P.reward(p,over(p,{winner:0,turns:1}),false,d);assert.equal(p.daily.list[2].n,2,'Niederlage nach 4 Zügen und Sieg zählen');
 set(p,['win2','draft1','campaign1'],d);const s=over(p,{mode:'campaign'});P.reward(p,s,false,d);
 assert.deepEqual(p.daily.list.map(x=>x.n),[1,0,1],'Kampagne zählt, Kolosseum nur mit Sieg im Kolosseum');
});

test('Tagesaufgaben: Abholen genau einmal, einmal Neuwürfeln (Lernen bleibt Lernen), Tageswechsel schreibt Erledigtes gut',()=>{
 const p=P.fresh(),d=day(6);set(p,['lore2','win2','attack15'],d);const gold=p.gold;
 assert.equal(Q.claim(p,'win2',d),null,'erst erledigen');
 for(let i=0;i<15;i++)Q.track(p,{type:'attack'},d);
 assert.equal(Q.claim(p,'attack15',d).gold,40);assert.equal(p.gold,gold+40);assert.equal(Q.claim(p,'attack15',d),null,'nur einmal');
 assert.equal(Q.reroll(p,'attack15',d),null,'abgeholte nicht');
 const learn=Q.reroll(p,'lore2',d);assert.ok(Q.LEARN.includes(learn)&&learn.id!=='lore2');assert.equal(p.daily.list[0].id,learn.id);assert.equal(p.daily.list[0].n,0);
 assert.equal(Q.reroll(p,'win2',d),null,'einmal je Tag');
 Q.track(p,{type:'game',win:true,counted:true},d);Q.track(p,{type:'game',win:true,counted:true},d);
 const before=p.gold;Q.sync(p,day(7));assert.equal(p.gold,before+60,'Sieg-Aufgabe von gestern gutgeschrieben');assert.equal(p.daily.credit,60);
 assert.equal(p.daily.rerolled,false,'neuer Tag, neues Würfeln');
 assert.equal(Q.ready(p,day(7)),1,'nur das Tagesgeschenk');
});

test('Tagesgeschenk: einmal je Tag, Serie über sieben Tage, nach einer Lücke von vorn',()=>{
 const p=P.fresh(),start={gold:p.gold,packs:p.packs,dust:p.dust};
 assert.ok(Q.loginReady(p,day(1)));
 const got=[];for(let d=1;d<=8;d++){const w=Q.claimLogin(p,day(d));got.push(w.day);assert.equal(Q.claimLogin(p,day(d,20)),null,'einmal am Tag');}
 assert.deepEqual(got,[1,2,3,4,5,6,7,1]);assert.equal(p.login.streak,8);
 const sum=k=>Q.LOGIN.reduce((n,w)=>n+(w[k]||0),0)+(Q.LOGIN[0][k]||0);
 assert.deepEqual({gold:p.gold-start.gold,packs:p.packs-start.packs,dust:p.dust-start.dust},{gold:sum('gold'),packs:sum('packs'),dust:sum('dust')});
 assert.equal(Q.loginNext(p,day(10)),1,'Lücke: die Serie beginnt neu');Q.claimLogin(p,day(10));assert.equal(p.login.streak,1);
 // Über den Monatswechsel bleibt die Serie.
 const m=P.fresh();Q.claimLogin(m,new Date(2026,9,31));assert.equal(Q.claimLogin(m,new Date(2026,10,1)).day,2);
});

test('Heldenstufen: Erfahrung wie das Gold, zehn Stufen mit Belohnung, Stufe 10 bringt die Goldene Fassung',()=>{
 assert.deepEqual([Q.level(0).level,Q.level(99).level,Q.level(100).level,Q.level(2199).level,Q.level(2200).level,Q.level(9999).level],[1,1,2,9,10,10]);
 assert.ok(Q.LEVEL.every((x,i)=>!i||x>Q.LEVEL[i-1]));
 const p=P.fresh(),d=day(6);
 const r=P.reward(p,over(p,{winner:0}),false,d);assert.equal(r.xp.gained,Q.XP.win);assert.equal(r.xp.to,2);assert.deepEqual(r.xp.rewards,[{level:2,gold:50}]);
 assert.equal(P.reward(p,over(p,{winner:1,turns:2}),true,d).xp.gained,0,'Aufgeben vor 4 Zügen');
 assert.equal(P.reward(p,over(p,{winner:1,turns:4}),false,d).xp.gained,Q.XP.loss);
 assert.equal(P.reward(p,over(p,{winner:-1}),false,d).xp.gained,Q.XP.draw);
 assert.deepEqual(Q.golden(p),[]);
 p.collection.leonidas_9=0;const gold=p.gold,packs=p.packs,dust=p.dust,g=Q.gain(p,'leonidas',5000);
 assert.equal(g.to,10);assert.deepEqual(g.rewards.map(w=>w.level),[3,4,5,6,7,8,9,10]);
 assert.equal(p.gold-gold,100+150);assert.equal(p.packs-packs,1+1+2);assert.equal(p.dust-dust,40+80);
 assert.equal(p.collection.leonidas_9,1,'die Legendäre kommt in die Sammlung');assert.deepEqual(Q.golden(p),['leonidas_9']);
 assert.equal(Q.gain(p,'leonidas',500).rewards.length,0,'über Stufe 10 nichts mehr');
 assert.ok(D.heroes.every(h=>D.byId[Q.signature(h.id)]?.rarity==='legendary'),'jeder Held hat seine Legendäre');
 assert.match(Q.rewardText(Q.levelReward('leonidas',10)),/Goldene Fassung von „Gorgo, Stimme Spartas“/);
});

test('Spielstand: alte Saves laden mit leeren Aufgaben, Erfolge bleiben eingelöst, Kaputtes fällt weg',()=>{
 const old=P.fresh();delete old.daily;delete old.login;delete old.heroXp;old.stats.wins=12;old.claimed=['win3','win10'];
 const p=P.parse(JSON.stringify(old));assert.equal(p.daily,null);assert.deepEqual(p.login,{last:0,streak:0});assert.deepEqual(p.heroXp,{});assert.deepEqual(p.claimed,['win3','win10']);
 Q.sync(p,day(6));Q.track(p,{type:'attack'},day(6));Q.claimLogin(p,day(6));Q.gain(p,'hypatia',260);
 const again=P.parse(JSON.stringify(p));assert.deepEqual(again.daily,p.daily);assert.deepEqual(again.login,p.login);assert.deepEqual(again.heroXp,{hypatia:260});
 const bad=JSON.parse(JSON.stringify(p));bad.daily={day:20261006,list:[{id:'gibt-es-nicht',n:1}]};bad.login='x';bad.heroXp={hypatia:-5,niemand:100,leonidas:1.5,imhotep:300};
 const fixed=P.parse(JSON.stringify(bad));assert.equal(fixed.daily,null);assert.deepEqual(fixed.login,{last:0,streak:0});assert.deepEqual(fixed.heroXp,{imhotep:300});
});
