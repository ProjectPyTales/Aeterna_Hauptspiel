// MVVM (AP 2.3): Store und ViewModels laufen ohne DOM. Die Shell wird durch eine aufzeichnende Attrappe ersetzt.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const game=path.join(__dirname,'../../quellcode/assets/game');
const need=f=>require(path.join(game,f));
const {ViewModel,html,raw}=need('core/mvvm.js'),{Store}=need('model/store.js'),P=need('model/profile.js'),K=need('model/cosmetics.js'),D=need('model/data.js'),E=need('model/engine.js');
const {Shop}=need('viewmodel/shop.js'),{Collection}=need('viewmodel/collection.js'),{Packs,STEP,TICK}=need('viewmodel/packs.js'),{Menu}=need('viewmodel/menu.js'),{Match}=need('viewmodel/match.js'),{Dialogs}=need('viewmodel/dialogs.js');

function memory(init={}){const m=new Map(Object.entries(init));return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),map:m};}
// Shell attrappe: records toasts, dialogs, navigation and sounds.
function setup(screen='packs'){
 const storage=memory(),store=new Store({storage});store.load();
 const log={toasts:[],dialogs:[],go:[],sounds:[],closed:0};
 const ui={screen:()=>screen,busy:()=>false,hidden:()=>false,unlockAudio(){},haptic(){},exportSave(){},pickImport(){},exit(){},
  toast:t=>log.toasts.push(t),play:s=>log.sounds.push(s),go:(next,arg)=>{log.go.push([next,arg]);},
  dialog:(kind,vm)=>{log.dialogs.push({kind,vm});log.open={kind,vm};},close:()=>{log.closed++;log.open?.vm.closed?.();log.open=null;},dialogOpen:vm=>!!log.open&&(!vm||log.open.vm===vm)};
 const ctx={store,ui,session:{mode:'free',hero:'leonidas',foe:'hypatia',deckId:'leonidas',mission:0}};
 ctx.dialogs=new Dialogs(ctx,'test');ctx.packs=new Packs(ctx);
 return {ctx,store,storage,log,ui};}
const choose=(log,label)=>{const d=log.open.vm,i=d.state.buttons.findIndex(b=>b.label===label);assert.ok(i>=0,label);d.choose(i);};

test('Kern: html() maskiert Werte, ViewModel.set meldet nur echte Änderungen',()=>{
 assert.equal(String(html`<b>${'<i>&"'}</b>${raw('<br>')}${['a',html`<p>${1}</p>`]}`),'<b>&lt;i&gt;&amp;&quot;</b><br>a<p>1</p>');
 const vm=new ViewModel({a:1});let n=0;vm.subscribe(()=>n++);
 vm.set({a:1});vm.set({a:2,b:3});assert.equal(n,1);
});

test('Store: Sicherung des vorigen Stands, Rückfall auf die Sicherung, Meldung nach commit',()=>{
 const {store,storage}=setup();let notified=0;store.subscribe(()=>notified++);
 store.profile.gold=111;store.commit();store.profile.gold=222;store.commit();
 assert.equal(notified,2);
 assert.equal(JSON.parse(storage.getItem('chroniken.backup')).gold,111);
 storage.setItem('chroniken.profile','{kaputt');
 const again=new Store({storage});assert.equal(again.load().gold,111,'beschädigter Hauptstand → Sicherung');
});

test('Basar (AP 0.1): Kauf über Rückfrage zieht Gold genau einmal ab, Reiter bleibt',()=>{
 const {ctx,log}=setup(),shop=new Shop(ctx);let renders=0;shop.subscribe(()=>renders++);
 shop.enter('boards');assert.equal(shop.state.tab,'boards');
 shop.buy('boards','athen');assert.equal(log.open.kind,'message');assert.equal(ctx.store.profile.gold,300,'erst nach Bestätigung');
 choose(log,'Für 100 Gold kaufen');
 assert.equal(ctx.store.profile.gold,200);assert.ok(K.owns(ctx.store.profile,'boards','athen'));
 assert.equal(shop.state.tab,'boards','Reiter bleibt nach dem Kauf');assert.ok(renders>0,'Ansicht wird aktualisiert statt neu aufgebaut');
 shop.buy('boards','athen');assert.equal(log.toasts.at(-1),'Bereits freigeschaltet.');assert.equal(ctx.store.profile.gold,200);
 shop.equip('boards','athen');assert.equal(ctx.store.profile.cosmetics.equipped.board,'athen');
 const tile=shop.items('boards').find(e=>e.item.id==='athen');assert.ok(tile.owned&&tile.equipped);
 shop.state.tab='skins';ctx.store.profile.gold=10;shop.buy('skins','leonidas-marmor');assert.match(log.toasts.at(-1),/es fehlen noch 290/);
});

test('Basar: Pack kaufen und öffnen – Inhalt wird vor der Präsentation gespeichert',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const {ctx,store,storage,log}=setup(),shop=new Shop(ctx),packs=ctx.packs;
 shop.buyPack();assert.equal(store.profile.packs,3);assert.equal(store.profile.gold,200);
 shop.openPack();assert.equal(packs.state.phase,'opening');assert.equal(log.open.kind,'packs');
 assert.equal(JSON.parse(storage.getItem('chroniken.profile')).pendingPack.length,5,'schon gespeichert');
 t.mock.timers.tick(1550);assert.equal(packs.state.phase,'reveal');
 packs.reveal(2);packs.reveal(2);assert.deepEqual(store.profile.pendingPackRevealed,[2]);
 packs.finish();t.mock.timers.tick(700);assert.equal(packs.state.revealed.length,5);
 packs.finish();assert.equal(store.profile.pendingPack,null);assert.equal(packs.state.phase,null);
});

test('Sammlung: Filter, Seiten, Deckbau mit Regeln und Rückfrage bei ungespeicherten Änderungen',()=>{
 const {ctx,log}=setup('collection'),coll=new Collection(ctx);coll.enter();
 assert.equal(coll.view.filters.hero,'leonidas');
 coll.filter('rarity','basic');assert.ok(coll.view.cards.every(x=>x.card.rarity==='basic'));
 coll.page(1);assert.equal(coll.view.page,1);coll.filter('q','Wache');assert.equal(coll.view.page,0,'Suche springt auf Seite 1');
 coll.filter('q','');coll.filter('rarity','all');
 coll.createDeck('hypatia');assert.equal(coll.view.edit.hero,'hypatia');assert.ok(coll.state.dirty);
 const foreign=D.cards.find(c=>c.hero==='leonidas');coll.addCard(foreign.id);assert.equal(log.toasts.at(-1),'Diese Karte gehört zu einem anderen Helden.');
 coll.autoFill();assert.equal(coll.state.edit.cards.length,30);
 assert.equal(coll.canLeave('menu'),false);assert.equal(log.open.vm.state.title,'Ungespeichertes Deck');
 coll.saveDeck();assert.equal(coll.state.dirty,false);assert.ok(ctx.store.profile.decks.some(d=>d.id===coll.state.edit.id));
 assert.equal(coll.canLeave('menu'),true);
 coll.deckName('Bibliothek');assert.ok(coll.state.dirty);coll.stopEdit();choose(log,'Verwerfen');assert.equal(coll.state.edit,null);
});

test('Hauptmenü: vierte Platte zeigt „Partie fortsetzen“ nur bei laufender Partie',()=>{
 const {ctx,log}=setup('menu'),menu=new Menu(ctx,'test');
 assert.equal(menu.view.plates[3].go,'daily');
 const p=ctx.store.profile;p.game=E.create({hero:'leonidas',foe:'hypatia',deck:E.starter('leonidas'),enemyDeck:E.starter('hypatia'),mode:'free',mission:null,seed:7,first:0});
 assert.equal(menu.view.plates[3].go,'resume');
 menu.go('bazaar');assert.deepEqual(log.go.at(-1),['packs','backs']);
});

test('Match: Starthand, Zug beenden und KI-Takt über die Attrappe des Spielbretts',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const {ctx,store,log}=setup('game'),match=new Match(ctx);ctx.match=match;
 let begun=0;ctx.board={busy:()=>false,begin:(b,s,a,o,impact,done)=>{begun++;impact();done();},rebound(){},cancel(){},events(){},effect(){}};
 store.profile.game=E.create({hero:'leonidas',foe:'hypatia',deck:E.starter('leonidas'),enemyDeck:E.starter('hypatia'),mode:'free',mission:null,seed:11,first:0});
 match.enter();assert.equal(log.open.kind,'mulligan');
 const uid=match.mulligan.hand[0].uid;match.toggleMull(uid);assert.equal(match.mulligan.count,1);
 match.acceptHand();assert.equal(store.profile.game.phase,'play');assert.ok(store.profile.helpSeen);
 match.tap({id:'end',kind:'button'});assert.equal(begun,1);assert.equal(store.profile.game.active,1,'KI ist am Zug');
 for(let i=0;i<60&&store.profile.game.active===1&&store.profile.game.phase==='play';i++)t.mock.timers.tick(520);
 assert.equal(store.profile.game.active,0,'KI beendet ihren Zug');
});

test('Match: Ergründen öffnet die Wahl, die sich nicht wegklicken lässt; auch nach dem Fortsetzen',()=>{
 const {ctx,store,log}=setup('game'),match=new Match(ctx);ctx.match=match;
 ctx.board={busy:()=>false,begin:(b,s,a,o,impact,done)=>{impact();done();},rebound(){},cancel(){},events(){},effect(){}};
 const s=E.create({hero:'hypatia',foe:'khan',seed:21,first:0});E.mulligan(s,[]);s.players[0].mana=5;s.players[0].hand=[{id:'hypatia_5',uid:'lehrsatz'}];
 store.profile.game=s;match.enter();
 match.select({type:'play',uid:'lehrsatz'});match.tap({id:'confirm',kind:'button'});
 assert.equal(log.open.kind,'discover');const choice=log.open.vm;assert.equal(choice.state.cards.length,3);
 choice.close();assert.equal(log.open?.kind,'discover','Zurück schließt die Wahl nicht');
 // Spiel verlassen und fortsetzen: die offene Wahl kommt wieder.
 log.open=null;match.enter();assert.equal(log.open.kind,'discover');
 const id=log.open.vm.state.cards[2].id;log.open.vm.pick(2);
 assert.equal(store.profile.game.choice,null);assert.ok(store.profile.game.players[0].hand.some(h=>h.id===id));
});

test('Hinterhalte (AP 5.6): eigene Rolle zeigt die Karte, die fremde bleibt versiegelt – auch in Hand und Chronik-Leiste',()=>{
 const {ctx,store,log}=setup('game'),match=new Match(ctx);ctx.match=match;
 ctx.board={busy:()=>false,begin:(b,s,a,o,impact,done)=>{impact();done();},rebound(){},cancel(){},events(){},effect(){}};
 const s=E.create({hero:'khan',foe:'fabius',seed:11,first:0});E.mulligan(s,[]);store.profile.game=s;store.profile.matchChronicle=[];
 const a=s.players[0],b=s.players[1];a.mana=a.maxMana=10;a.hand=[{id:'khan_13',uid:'h1'},{id:'khan_13',uid:'h2'}];
 assert.ok(match.action({type:'play',uid:'h1'}));assert.equal(match.hand().h2.can,false,'keine Rolle doppelt');
 assert.deepEqual(match.strip(s,99).at(0),{...match.strip(s,99).at(0),type:'ambush',p:0,kind:'card',id:'khan_13'},'die eigene sieht man');
 match.tap({id:'ambush0_0',kind:'ambush',p:0,idCard:'khan_13'});assert.equal(log.open.kind,'zoom');assert.equal(log.open.vm.state.card.id,'khan_13');
 // Die KI legt Fabius' Rettung bei Gerunium: in der Leiste nur „legt einen Hinterhalt“, ohne Karte.
 const mine=E.summon(s,0,'neutral_2');mine.ready=true;delete mine.fresh;const theirs=E.summon(s,1,'neutral_0');
 s.active=1;b.mana=10;b.hand=[{id:'fabius_10',uid:'k1'}];assert.ok(match.action({type:'play',uid:'k1'}));
 const hidden=match.strip(s,99).at(0);assert.equal(hidden.type,'ambush');assert.equal(hidden.p,1);assert.equal(hidden.kind,'event');assert.ok(!JSON.stringify(match.strip(s,99)).includes('fabius_10'));
 assert.ok(!JSON.stringify(store.profile.matchChronicle).includes('fabius_10'),'auch nicht im gespeicherten Seitenstreifen');
 match.tap({id:'ambush1_0',kind:'ambush',p:1,idCard:null});assert.equal(log.open.kind,'message');assert.equal(log.open.vm.state.title,'Versiegelter Hinterhalt');
 // Er schnappt zu: jetzt steht er mit Bild in der Leiste.
 s.active=0;assert.ok(match.action({type:'attack',uid:mine.uid,target:theirs.uid}));
 const sprung=match.strip(s,99).at(0);assert.equal(sprung.type,'sprung');assert.equal(sprung.id,'fabius_10');assert.equal(sprung.p,1);
});

test('Chronik-Leiste (AP 1.8 Teil 2): neueste Einträge oben, Seite auch im Spiegelduell, Abschnitte je Zug, Antippen',()=>{
 const {ctx,store,log}=setup('game'),match=new Match(ctx);ctx.match=match;
 ctx.board={busy:()=>false,begin:(b,s,a,o,impact,done)=>{impact();done();},rebound(){},cancel(){},events(){},effect(){}};
 const s=E.create({hero:'leonidas',foe:'leonidas',deck:E.starter('leonidas'),enemyDeck:E.starter('leonidas'),mode:'free',mission:null,seed:5,first:0});E.mulligan(s,[]);
 store.profile.game=s;assert.deepEqual(match.strip(),[],'leere Partie');
 for(let i=0;i<400&&s.turn<12&&s.phase==='play';i++){const a=E.ai(s);if(!a||!match.action(a))break;}
 const items=match.strip();assert.ok(items.length>0&&items.length<=6);
 assert.equal(match.strip(),items,'zwischengespeichert, solange keine Zeile dazukommt');
 for(const e of items){assert.ok(['play','power','death','burn','steal','echo','fatigue'].includes(e.type),e.type);assert.ok(e.p===0||e.p===1,'Seite trotz gleicher Namen: '+e.key);}
 for(let i=1;i<items.length;i++)assert.ok(items[i-1].turn>=items[i].turn,'neueste oben');
 const all=match.strip(s,99);assert.ok(all.some(e=>e.p===0)&&all.some(e=>e.p===1),'beide Seiten');
 const card=all.find(e=>e.kind==='card');match.tap({id:'log0',kind:'log',idCard:card.id});assert.equal(log.open.kind,'zoom');assert.equal(log.open.vm.state.card.id,card.id);
 match.tap({id:'log1',kind:'log',idCard:null});assert.equal(log.open.kind,'chronicle');
 // Alte Seitenleisten ohne p: die Seite folgt aus dem Namen, wenn die Helden verschieden heißen.
 const t=E.create({hero:'leonidas',foe:'hypatia',seed:3,first:0});E.mulligan(t,[]);store.profile.game=t;store.profile.matchChronicle=[];
 for(let i=0;i<200&&t.turn<6&&t.phase==='play';i++){const a=E.ai(t);if(!a||!match.action(a))break;}
 for(const e of store.profile.matchChronicle)delete e.p;match.stripCache=null;
 assert.ok(match.strip(t,99).filter(e=>e.type==='play').every(e=>e.p===0||e.p===1));
 // Erschöpfung: eigene Zeile mit Schaden.
 const u=E.create({hero:'leonidas',foe:'hypatia',seed:4,first:0});E.mulligan(u,[]);u.players[0].deck=[];store.profile.game=u;store.profile.matchChronicle=[];
 match.action({type:'end'});while(u.active===1&&u.phase==='play'){const a=E.ai(u);if(!a||!match.action(a))break;}
 const f=match.strip().find(e=>e.type==='fatigue');assert.ok(f&&f.p===0&&f.n===1,'Erschöpfung 1 auf Deiner Seite');
});

test('Chronik (AP 5.9): Heldenwahl und langes Drücken auf einen Helden im Match öffnen die Chronikseite',()=>{
 const {Setup}=need('viewmodel/setup.js');const {ctx,log,store}=setup('setup');ctx.session.hero='boudicca';
 new Setup(ctx).lore();assert.equal(log.open.kind,'lore');assert.equal(log.open.vm.state.hero.id,'boudicca');
 assert.deepEqual(log.open.vm.state.favorites.map(c=>c.hero),['boudicca','boudicca','boudicca']);
 store.profile.game=E.create({hero:'leonidas',foe:'musashi',seed:7});const m=new Match(ctx);ctx.match=m;
 m.longPress({kind:'target',id:'h1'});assert.equal(log.open.vm.state.hero.id,'musashi');
});

test('Neue Helden (AP 5.10): Heldenwahl nach Zeitalter, Kampagne mit 22 Missionen, Sammlung mit Zeitalterkarten',()=>{
 const {Setup}=need('viewmodel/setup.js'),{Campaign}=need('viewmodel/campaign.js');const {ctx,store}=setup('setup');
 const heroes=new Setup(ctx).view.heroes,age=Object.fromEntries(D.ages.map((a,i)=>[a.id,i]));
 assert.equal(heroes.length,22);assert.ok(heroes.every((h,i)=>!i||age[heroes[i-1].age]<=age[h.age]),'gruppiert nach Zeitalter');
 const c=new Campaign(ctx);assert.equal(c.missions.length,22);assert.ok(c.missions[10].locked);
 store.profile.campaign=[...Array(10).keys()];assert.ok(!c.missions[10].locked,'Neue Chroniken nach Mission 10');
 const coll=new Collection(ctx);coll.filter('hero','perikles');const seen=new Set(coll.view.cards.map(x=>x.card.hero));
 assert.ok(seen.has('perikles')||seen.has('neutral'));assert.ok(![...seen].some(h=>!['perikles','neutral','griechen'].includes(h)),'eigene, neutrale und Karten der Griechischen Antike');
});

test('Rückmeldung zu 1.10.0 und 1.11.0: Massenöffnung legt alle Karten sofort ab und fasst sie zusammen',t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const {ctx,store,log}=setup(),shop=new Shop(ctx),p=store.profile;
 assert.equal(shop.pack.bulk,2,'zwei Startpakete: Knopf „Alle öffnen · 2“');p.packs=1;assert.equal(shop.pack.bulk,0,'ein Paket: normal öffnen');
 p.packs=60;const before=Object.values(p.collection).reduce((a,b)=>a+b,0);
 shop.openAll();const vm=ctx.packs,b=vm.state.bulk;
 assert.equal(log.open.kind,'packs');assert.equal(vm.state.phase,'bulk');assert.equal(b.packs,60,'alle Pakete auf einmal (bis 1.11.0 höchstens 50)');
 assert.equal(p.packs,0);assert.equal(p.pendingPack,null,'kein Paket bleibt zum Aufdecken liegen');
 assert.equal(Object.values(p.collection).reduce((a,b)=>a+b,0),before+300,'300 Karten in der Sammlung');
 assert.equal(JSON.parse(ctx.store.exportText()).packs,0,'vor der Anzeige gespeichert');
 assert.equal(b.list.reduce((n,g)=>n+g.count,0),300);
 assert.equal(b.shown,0,'die Übersicht beginnt verdeckt');t.mock.timers.tick(0);
 assert.equal(vm.state.bulk.shown,STEP,'seltenste zuerst, wenige Karten je Schritt');t.mock.timers.tick(TICK);assert.equal(vm.state.bulk.shown,2*STEP);
 for(let i=0;i<200;i++)t.mock.timers.tick(TICK);assert.equal(vm.state.bulk.shown,b.list.length,'am Ende sind alle Karten aufgedeckt');const rank=['legendary','epic','rare','common'];
 assert.ok(b.list.every((g,i)=>!i||rank.indexOf(b.list[i-1].card.rarity)<=rank.indexOf(g.card.rarity)),'seltenste zuerst');
 assert.ok(b.list.some(g=>g.isNew));assert.equal(b.fresh,b.list.filter(g=>g.isNew).length,'jede neue Karte einmal');
 vm.close();assert.equal(vm.state.phase,null);assert.equal(log.open,null,'Zurück schließt die Übersicht');
 p.packs=5;shop.openAll();t.mock.timers.tick(0);vm.close();t.mock.timers.tick(10*TICK);assert.equal(vm.state.bulk,null,'nach dem Schließen läuft nichts weiter');
 p.packs=3;shop.openPack();shop.openAll();assert.equal(vm.state.phase,'opening','während ein Paket aufgedeckt wird: keine Massenöffnung');
});

test('Rückmeldung zu 1.10.0: Codes in den Einstellungen – einmal je Spielstand, alte Spielstände ohne Feld',()=>{
 const {ctx,store,log}=setup();ctx.dialogs.settings();log.open.vm.redeem();assert.equal(log.open.kind,'redeem');
 const vm=log.open.vm,p=store.profile;
 vm.type('  kartenpakete ');vm.redeem();assert.equal(p.packs,12);assert.match(vm.state.result,/10 Kartenpakete/);
 vm.type('KARTENPAKETE');vm.redeem();assert.equal(p.packs,12);assert.match(vm.state.error,/schon eingelöst/);
 vm.type('gibtsnicht');vm.redeem();assert.match(vm.state.error,/kennt die Chronik nicht/);
 vm.type('chronik');vm.redeem();assert.ok(D.cards.every(c=>p.collection[c.id]>=(c.rarity==='legendary'?1:2)),'jede Karte in voller Zahl');
 assert.deepEqual(JSON.parse(store.exportText()).redeemed,['KARTENPAKETE','CHRONIK'],'gespeichert');
 const old=P.fresh();delete old.redeemed;assert.deepEqual(P.parse(JSON.stringify(old)).redeemed,[]);
 old.redeemed=['AETERNA','unsinn',5];assert.deepEqual(P.parse(JSON.stringify(old)).redeemed,['AETERNA']);
});

test('AP 0.2: Klangprobe in den Einstellungen spielt nur die angebotenen Geräusche',()=>{
 const {ctx,log}=setup(),played=[];ctx.ui.play=g=>played.push(g);ctx.dialogs.settings();const vm=log.open.vm;
 assert.deepEqual(vm.samples.map(([g])=>g),['stone','scrape','slam','grind','draw','hit']);
 vm.sample('slam');vm.sample('victory');vm.sample('stone');assert.deepEqual(played,['slam','stone']);
});

// Kolosseum als Draft (AP 6.1): Lauf im Spielstand, Heldenwahl aus drei Epochen, 30 Wahlen gleicher Seltenheit,
// Ende bei 12 Siegen oder 3 Niederlagen, Belohnung nach Siegen; alte Spielstände ohne Feld laden weiter.
test('Kolosseum (AP 6.1): Draft-Lauf vom Eintritt bis zur Belohnung',()=>{
 const DR=need('model/draft.js'),{Draft}=need('viewmodel/draft.js');
 const {ctx,store,log}=setup('draft'),vm=new Draft(ctx),p=store.profile;
 assert.equal(vm.view.phase,null);assert.equal(vm.view.fee,0,'der erste Lauf ist ein Probelauf');
 vm.start();assert.equal(p.gold,300);assert.equal(vm.view.phase,'hero');
 const heroes=vm.view.heroes;assert.equal(heroes.length,3);assert.equal(new Set(heroes.map(x=>x.hero.age)).size,3,'drei Epochen');
 vm.chooseHero('nicht-da');assert.equal(vm.view.phase,'hero');
 vm.chooseHero(heroes[1].hero.id);assert.equal(vm.view.phase,'pick');
 const seen=[];
 for(let i=0;i<DR.PICKS;i++){const v=vm.view,ids=v.options.map(o=>o.card.id);
  assert.equal(new Set(ids).size,3,'drei verschiedene Karten');
  assert.equal(new Set(v.options.map(o=>o.card.rarity==='basic'?'common':o.card.rarity)).size,1,'gleiche Seltenheit');
  assert.ok(v.options.every(o=>D.playable(o.card,p.draft.hero)&&o.card.rarity!=='token'));
  if([0,9,19,29].includes(i))assert.notEqual(v.rarity,'common','Sonderwahl mindestens selten');
  seen.push(ids);vm.pick(i%3);}
 assert.equal(p.draft.picks.length,30);assert.equal(vm.view.phase,'play');assert.equal(vm.view.rows.reduce((n,r)=>n+r.count,0),30);
 assert.ok(p.draft.picks.filter(id=>D.byId[id].rarity==='legendary').length===new Set(p.draft.picks.filter(id=>D.byId[id].rarity==='legendary')).size,'Legendäre höchstens einmal');
 // Gleicher Lauf, gleiche Wahl: Neu geladen bleibt alles, wie es war.
 const again=P.parse(JSON.stringify(p));assert.deepEqual(again.draft.picks,p.draft.picks);assert.equal(again.draftStats.started,1);
 // Kampf: Partie im Modus draft mit dem gewählten Deck, ohne Gold je Partie.
 vm.fight();assert.deepEqual(log.go.at(-1),['game',undefined]);assert.equal(p.game.mode,'draft');assert.equal(p.game.draft,p.draft.id);
 assert.equal(p.game.players[0].hero,p.draft.hero);
 const gold=p.gold;p.game.phase='over';p.game.winner=0;const r=P.reward(p,p.game);assert.equal(r.gold,0);
 // Kein Gold je Partie – nur die Belohnung der neuen Heldenstufe (AP 6.3).
 assert.equal(p.gold,gold+r.xp.rewards.reduce((n,w)=>n+(w.gold||0),0));assert.equal(p.draft.wins,1);
 assert.equal(P.reward(p,p.game),null,'ein Ergebnis zählt nur einmal');
 // Ein Ergebnis aus einem anderen Lauf zählt nicht.
 const old=DR.game(p);old.draft=99;old.phase='over';old.winner=1;P.reward(p,old);assert.equal(p.draft.losses,0);
 for(let k=0;k<3;k++){const g=DR.game(p);g.phase='over';g.winner=1;P.reward(p,g);}
 assert.equal(p.draft.losses,3);assert.equal(vm.view.phase,'done');assert.deepEqual(vm.view.reward,DR.reward(1));
 const before={gold:p.gold,packs:p.packs};vm.claim();
 assert.equal(p.gold,before.gold+DR.reward(1).gold);assert.equal(p.packs,before.packs+1);assert.equal(p.draft,null);
 assert.deepEqual(p.draftStats,{started:1,runs:1,best:1});
 // Der zweite Lauf kostet Eintritt – mit Rückfrage.
 assert.equal(vm.view.fee,DR.FEE);vm.start();assert.equal(log.open.kind,'message');assert.equal(p.draft,null);
 choose(log,'Für 150 Gold eintreten');assert.equal(p.gold,before.gold+DR.reward(1).gold-150);assert.equal(vm.view.phase,'hero');
 vm.retire();choose(log,'Lauf beenden');assert.equal(vm.view.phase,'done');assert.deepEqual(vm.view.reward,DR.reward(0));
});

test('Kolosseum (AP 6.1): Belohnung wächst mit den Siegen, alte und kaputte Spielstände bleiben ladbar',()=>{
 const DR=need('model/draft.js');
 for(let w=1;w<=DR.WINS;w++){const a=DR.reward(w-1),b=DR.reward(w);assert.ok(b.gold>=a.gold&&b.packs>=a.packs&&b.dust>=a.dust);}
 assert.ok(DR.reward(3).gold+100*DR.reward(3).packs>DR.FEE,'ab 3 Siegen mehr zurück als der Eintritt');
 const old=P.fresh();delete old.draft;delete old.draftStats;
 const p=P.parse(JSON.stringify(old));assert.equal(p.draft,null);assert.deepEqual(p.draftStats,{started:0,runs:0,best:0});
 const bad=P.parse(JSON.stringify({...P.fresh(),draft:{id:1,seed:5,heroes:['leonidas','x','y'],picks:[]}}));assert.equal(bad.draft,null,'kaputter Lauf fällt weg, der Spielstand bleibt');
 const done=P.parse(JSON.stringify({...P.fresh(),draft:{id:1,seed:5,heroes:['leonidas','perikles','anna'],hero:'anna',picks:[],wins:12,losses:0}}));
 assert.equal(DR.phase(done.draft),'done');assert.deepEqual(done.draft.reward,DR.reward(12));
 // Hauptmenü: Die Platte des Kolosseums öffnet den Draft und zeigt den Stand des Laufs.
 const {ctx,store,log}=setup('menu'),menu=new Menu(ctx,'test');
 assert.match(menu.view.plates[2].sub,/Draft/);menu.go('draft');assert.deepEqual(log.go.at(-1),['draft',undefined]);
 DR.start(store.profile);DR.chooseHero(store.profile,store.profile.draft.heroes[0]);assert.match(menu.view.plates[2].sub,/0 von 30 Karten/);
});

test('Aufgaben (AP 6.3): Dialog mit Tagesgeschenk, Tagesaufgaben und Erfolgen; Menü zählt, Lesen zählt, Heldenwahl zeigt die Stufe',()=>{
 const Q=need('model/quests.js'),{Setup}=need('viewmodel/setup.js');
 const {ctx,store,log}=setup('menu'),p=store.profile,now=new Date(2026,9,6,12);ctx.now=()=>now;
 const menu=new Menu(ctx,'test');assert.equal(menu.view.quests,1,'das Tagesgeschenk wartet');
 ctx.dialogs.quests();const vm=log.open.vm;assert.equal(log.open.kind,'quests');assert.equal(p.daily.day,20261006,'der Tag beginnt beim Öffnen');
 assert.equal(vm.daily.list.length,3);assert.equal(vm.daily.list.filter(x=>x.learn).length,1);
 assert.equal(vm.login.slots.length,7);assert.ok(vm.login.ready&&vm.login.slots[0].today&&!vm.login.slots[0].done);
 const gold=p.gold;vm.claimLogin();assert.equal(p.gold,gold+20);assert.ok(vm.login.slots[0].done&&!vm.login.ready);assert.match(log.toasts.at(-1),/Tag 1 der Serie: 20 Gold/);
 vm.claimLogin();assert.equal(p.gold,gold+20,'einmal am Tag');assert.equal(menu.view.quests,0);
 // Lernen: Chronikseite und Karte mit Chronikzeile zählen, Abholen im Dialog.
 p.daily.list=[{id:'lore2',n:0,claimed:false},{id:'chronicle4',n:0,claimed:false},{id:'win2',n:0,claimed:false}];
 ctx.dialogs.lore('leonidas');ctx.dialogs.lore('hypatia');assert.equal(log.open.kind,'lore');assert.match(log.toasts.at(-1),/Aufgabe erledigt: Lies 2 Chronikseiten/);
 const withLine=D.cards.find(c=>need('model/lore.js').card(c.id)).id;ctx.dialogs.zoom(withLine);ctx.dialogs.zoom(withLine);assert.equal(log.open.kind,'zoom');assert.equal(p.daily.list[1].n,1,'jede Karte einmal');
 assert.equal(menu.view.quests,1);
 ctx.dialogs.quests();const q=log.open.vm;q.claim('lore2');assert.equal(p.gold,gold+20+40);assert.ok(q.daily.list[0].claimed);
 q.reroll('win2');assert.notEqual(p.daily.list[2].id,'win2');assert.ok(q.daily.rerolled);const id=p.daily.list[2].id;q.reroll(id);assert.equal(p.daily.list[2].id,id,'einmal je Tag');
 // Die Erfolge bis 1.29.0 bleiben im selben Fenster.
 p.stats.wins=3;q.claim('win3');assert.ok(p.claimed.includes('win3'));assert.equal(q.rows.find(r=>r.quest.id==='win3').claimed,true);
 // Heldenwahl: Stufe, Erfahrung und nächste Belohnung; Stufen der Galerie.
 Q.gain(p,'leonidas',130);const v=new Setup(ctx).view;assert.equal(v.level.level,2);assert.equal(v.level.into,30);assert.equal(v.level.span,140);assert.equal(v.level.next,'1 Kartenpaket');assert.equal(v.levels.leonidas,2);assert.equal(v.levels.hypatia,1);
});
