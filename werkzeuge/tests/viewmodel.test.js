// MVVM (AP 2.3): Store und ViewModels laufen ohne DOM. Die Shell wird durch eine aufzeichnende Attrappe ersetzt.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
const game=path.join(__dirname,'../../quellcode/assets/game');
const need=f=>require(path.join(game,f));
const {ViewModel,html,raw}=need('core/mvvm.js'),{Store}=need('model/store.js'),P=need('model/profile.js'),K=need('model/cosmetics.js'),D=need('model/data.js'),E=need('model/engine.js');
const {Shop}=need('viewmodel/shop.js'),{Collection}=need('viewmodel/collection.js'),{Packs}=need('viewmodel/packs.js'),{Menu}=need('viewmodel/menu.js'),{Match}=need('viewmodel/match.js'),{Dialogs}=need('viewmodel/dialogs.js');

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
 shop.buy('boards','viking');assert.equal(log.open.kind,'message');assert.equal(ctx.store.profile.gold,300,'erst nach Bestätigung');
 choose(log,'Für 100 Gold kaufen');
 assert.equal(ctx.store.profile.gold,200);assert.ok(K.owns(ctx.store.profile,'boards','viking'));
 assert.equal(shop.state.tab,'boards','Reiter bleibt nach dem Kauf');assert.ok(renders>0,'Ansicht wird aktualisiert statt neu aufgebaut');
 shop.buy('boards','viking');assert.equal(log.toasts.at(-1),'Bereits freigeschaltet.');assert.equal(ctx.store.profile.gold,200);
 shop.equip('boards','viking');assert.equal(ctx.store.profile.cosmetics.equipped.board,'viking');
 const tile=shop.items('boards').find(e=>e.item.id==='viking');assert.ok(tile.owned&&tile.equipped);
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

test('Chronik (AP 5.9): Heldenwahl und langes Drücken auf einen Helden im Match öffnen die Chronikseite',()=>{
 const {Setup}=need('viewmodel/setup.js');const {ctx,log,store}=setup('setup');ctx.session.hero='boudicca';
 new Setup(ctx).lore();assert.equal(log.open.kind,'lore');assert.equal(log.open.vm.state.hero.id,'boudicca');
 assert.deepEqual(log.open.vm.state.favorites.map(c=>c.hero),['boudicca','boudicca','boudicca']);
 store.profile.game=E.create({hero:'leonidas',foe:'musashi',seed:7});const m=new Match(ctx);ctx.match=m;
 m.longPress({kind:'target',id:'h1'});assert.equal(log.open.vm.state.hero.id,'musashi');
});
