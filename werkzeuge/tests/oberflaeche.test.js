// Basar 2.0, Sammlung und Deckbau 2.0, Heldenwahl und Kampagnenkarte (AP 1.4, AP 1.6, AP 1.7) und die Rückmeldung zu 1.18.0.
// ViewModels ohne DOM mit einer aufzeichnenden Shell-Attrappe; Renderer, CSS und Klänge über ihre Quelltexte und Dateien.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const game=path.join(__dirname,'../../quellcode/assets/game'),need=f=>require(path.join(game,f)),read=f=>fs.readFileSync(path.join(game,f),'utf8');
const {Store}=need('model/store.js'),D=need('model/data.js');
const {Shop}=need('viewmodel/shop.js'),{Collection,curveHint,curveOf}=need('viewmodel/collection.js'),{Setup,GALLERY}=need('viewmodel/setup.js');
const {Campaign,MAP,STATIONS}=need('viewmodel/campaign.js'),{Dialogs}=need('viewmodel/dialogs.js'),{Packs}=need('viewmodel/packs.js');

function setup(screen='packs'){
 const m=new Map(),store=new Store({storage:{getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v))}});store.load();
 const log={toasts:[],sounds:[],go:[],haptics:[]};
 const ui={screen:()=>screen,busy:()=>false,hidden:()=>false,unlockAudio(){},exportSave(){},pickImport(){},exit(){},haptic:k=>log.haptics.push(k),
  toast:t=>log.toasts.push(t),play:(s,o)=>log.sounds.push({s,o}),go:(next,arg)=>log.go.push([next,arg]),
  dialog:(kind,vm)=>{log.open={kind,vm};},close:()=>{log.open?.vm.closed?.();log.open=null;},dialogOpen:()=>!!log.open};
 const ctx={store,ui,session:{mode:'free',hero:'leonidas',foe:'hypatia',deckId:'leonidas',mission:0}};
 ctx.dialogs=new Dialogs(ctx,'test');ctx.packs=new Packs(ctx);
 return {ctx,store,log};}
const choose=(log,label)=>{const d=log.open.vm,i=d.state.buttons.findIndex(b=>b.label===label);assert.ok(i>=0,label);d.choose(i);};
const sounds=log=>log.sounds.map(x=>x.s);

test('AP 1.4 Basar: Schaufenster zeigt den ausgerüsteten Gegenstand, Antippen legt einen anderen aufs Podest',()=>{
 const {ctx,log}=setup(),shop=new Shop(ctx);shop.enter('backs');
 assert.equal(shop.showcase.item.id,'chroniken','ohne Wahl: der Rücken im Einsatz');assert.ok(shop.showcase.equipped);
 shop.select('backs','sparta');assert.equal(shop.showcase.item.id,'sparta');assert.ok(!shop.showcase.owned);assert.ok(sounds(log).includes('stone'));
 assert.ok(shop.items('backs').find(e=>e.item.id==='sparta').picked,'die Kachel weiß, dass sie gewählt ist');
 shop.select('backs','gibt-es-nicht');assert.equal(shop.showcase.item.id,'sparta');
 shop.tab('skins');assert.equal(shop.showcase.kind,'skins');assert.equal(shop.showcase.item.id,'leonidas-marmor','Skins: der erste');
 shop.tab('packs');assert.equal(shop.showcase,null,'Kartenpakete ohne Schaufenster');
 shop.tab('backs');assert.equal(shop.showcase.item.id,'sparta','die Wahl je Reiter bleibt');
});

test('AP 1.4 Basar: Kauf wird inszeniert – Münzen, Siegel, Belohnung als Folge, ein neues Zeichen je Kauf',()=>{
 const {ctx,store,log}=setup(),shop=new Shop(ctx);shop.enter('boards');
 shop.select('boards','athen');log.sounds=[];shop.buy('boards','athen');choose(log,'Für 100 Gold kaufen');
 assert.equal(store.profile.gold,200);const first=shop.showcase.bought;assert.ok(first>0,'Inszenierung läuft');
 assert.deepEqual(sounds(log),['coins','seal','pack'],'Münzen, dann Siegel, dann Belohnung');
 assert.ok(log.sounds[1].o.delay>0&&log.sounds[2].o.delay>log.sounds[1].o.delay,'nacheinander');assert.ok(log.haptics.includes(2),'kräftige Vibration');
 shop.select('boards','kapitol');assert.equal(shop.showcase.bought,0,'ein anderer Gegenstand: keine Inszenierung');
 shop.buy('boards','kapitol');choose(log,'Für 100 Gold kaufen');assert.ok(shop.showcase.bought>first,'jeder Kauf ein neues Zeichen (neue Animation)');
 shop.equip('boards','kapitol');assert.equal(shop.showcase.bought,0);assert.ok(shop.showcase.equipped);
 const states=shop.items('boards').map(e=>e.equipped?'Einsatz':e.owned?'Besitz':'gesperrt');
 assert.deepEqual(states,['Besitz','Besitz','Einsatz','gesperrt','gesperrt'],'klare Zustände');
 assert.equal(shop.preview('boards','skriptorium'),undefined);assert.equal(shop.showcase.item.id,'skriptorium','Vorschau = aufs Podest');
});

test('AP 1.4 Basar: Ansicht mit Podest, drehendem Rücken, Münze, Miniatur-Tisch und Kauf-Effekt; Klänge vorhanden',()=>{
 const view=read('view/shop.js'),css=read('view/css/stone.css');
 for(const k of ['praesentationspodest','heldenmuenze-basar','miniatur-spielfeld'])assert.match(view,new RegExp('// ASTRA: '+k+' – '),k);
 assert.match(css,/\/\* ASTRA: goldglanz-basar – /);
 assert.match(view,/class="spin-card"[^]*class="face reverse"/,'Kartenrücken mit Rückseite, die sich dreht');
 assert.match(css,/@keyframes card-spin\{0%\{transform:rotateY\(-16deg\)\}[^}]*\}[^]*100%\{transform:rotateY\(344deg\)\}\}/,'nahtlose Schleife');
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{\.buy-fx\{display:none\}\.spin-inner\{animation:none/,'reduzierte Bewegung: still');
 assert.match(view,/data-key="buy-\$\{n\}"/,'Kauf-Effekt je Zeichen neu');
 const manifest=JSON.parse(read('assets/audio/manifest.json'));
 for(const k of ['chime','coins','seal','page']){assert.equal(manifest[k].length,2,k);for(const f of manifest[k])assert.ok(fs.existsSync(path.join(game,'assets/audio',f+'.ogg')),f);}
 assert.match(read('service/audio.js'),/node\.start\(now\+\(options\.delay\|\|0\)\)/,'Klänge mit Verzögerung');
});

test('AP 1.6 Sammlung: Umblättern mit Richtung und Klang, Steinknöpfe für Mana und Seltenheit',()=>{
 const {ctx,log}=setup('collection'),coll=new Collection(ctx);coll.enter();
 assert.equal(coll.view.turn,0);coll.page(1);assert.equal(coll.view.page,1);assert.equal(coll.view.turn,1);assert.ok(sounds(log).includes('page'));
 coll.page(-1);assert.equal(coll.view.turn,-1);assert.equal(coll.view.page,0);
 log.sounds=[];coll.page(-1);assert.equal(coll.view.page,0);assert.ok(!sounds(log).includes('page'),'auf Seite 1 blättert nichts zurück');
 coll.pick('mana','3');assert.equal(coll.view.filters.mana,'3');assert.ok(coll.view.cards.every(x=>x.card.cost===3));assert.equal(coll.view.turn,0,'Filter: kein Umblättern');
 coll.pick('mana','3');assert.equal(coll.view.filters.mana,'all','zweites Antippen zeigt wieder alle');
 coll.pick('rarity','rare');assert.ok(coll.view.cards.every(x=>x.card.rarity==='rare'));coll.pick('rarity','rare');assert.equal(coll.view.filters.rarity,'all');
 coll.pick('q','x');assert.equal(coll.view.filters.q,'','nur Mana und Seltenheit sind Knöpfe');
 coll.inspect(coll.view.cards[5].card.id,'5');assert.equal(log.open.kind,'card');assert.equal(log.open.vm.state.slot,5,'Zoom beginnt am Platz der Karte');
 coll.inspect(coll.view.cards[0].card.id);assert.equal(log.open.vm.state.slot,null);
});

test('AP 1.6 Deckbau: Manakurve in drei Phasen mit Hinweis, Karte fliegt ins Deck und ihr Balken wächst',()=>{
 const {ctx}=setup('collection'),coll=new Collection(ctx);coll.enter();
 assert.ok(coll.view.decks.every(d=>d.curve.length===8&&d.curve.reduce((a,b)=>a+b,0)===d.deck.cards.length),'Übersicht: Kurve je Deck');
 coll.createDeck('leonidas');assert.equal(coll.view.hint.warn,false);assert.match(coll.view.hint.text,/Füge Karten hinzu/);
 const card=D.cards.find(c=>c.hero==='leonidas'&&c.cost===4&&c.rarity==='basic');coll.addCard(card.id);
 assert.deepEqual(coll.view.flight&&[coll.view.flight.id,coll.view.flight.bar],[card.id,4]);const n=coll.view.flight.n;
 assert.equal(coll.view.bars[4].n,1);assert.equal(coll.view.bars[4].phase,'mid');assert.deepEqual(coll.view.bars.map(b=>b.phase),['early','early','early','early','mid','mid','mid','late']);
 coll.addCard(card.id);assert.ok(coll.view.flight.n>n,'jede Karte fliegt neu');
 coll.autoFill();assert.equal(coll.view.edit.cards.length,30);assert.equal(coll.view.hint.phases.early+coll.view.hint.phases.mid+coll.view.hint.phases.late,30);
 // Hinweise bei Schieflage.
 assert.match(curveHint([0,1,1,2,6,6,6,8]).text,/teure Karten/);assert.ok(curveHint([0,1,1,2,6,6,6,8]).warn);
 assert.match(curveHint([0,2,3,4,8,8,5,0]).text,/Zu wenige frühe/);
 assert.match(curveHint([4,8,9,7,1,1,0,0]).text,/Fast nur frühe/);
 assert.match(curveHint([4,6,6,6,1,1,1,5]).text,/Kaum Karten für die Mitte/);
 const ok=curveHint([2,4,5,5,4,4,3,3]);assert.equal(ok.warn,false);assert.equal(ok.avg,3.5);assert.deepEqual(ok.phases,{early:16,mid:11,late:3});
 assert.deepEqual(curveOf(['leonidas_1','leonidas_1']).reduce((a,b)=>a+b,0),2);
 const view=read('view/collection.js'),css=read('view/css/screens.css');
 assert.match(view,/data-key="page-\$\{v\.page\}"/,'neue Seite = neuer Knoten (Animation), Filter auf derselben Seite nicht');
 assert.match(view,/data-key="fly-\$\{f\.n\}"/);assert.match(css,/\.bar\{[^}]*transition:height/,'der Balken wächst sichtbar');
 for(const k of ['filterknopf','kartenbuch','manakurve'])assert.match(view,new RegExp('// ASTRA: '+k+' – '),k);
});

test('AP 1.7 Heldenwahl: Galerie nach Zeitalter, großes Porträt mit Fähigkeit, Epoche, Lehrplan und Lieblingskarten',()=>{
 const {ctx,log}=setup('setup'),s=new Setup(ctx);
 assert.equal(GALLERY.length,D.ages.length);assert.deepEqual(GALLERY.flatMap(g=>g.heroes.map(h=>h.id)).sort(),D.heroes.map(h=>h.id).sort(),'jeder Held genau einmal');
 assert.ok(GALLERY.every(g=>g.heroes.every(h=>h.age===g.age.id)));
 ctx.session.hero='khan';let v=s.view;assert.equal(v.hero.name,'Widukind');assert.equal(v.age.name,'Mittelalter im Reich');
 assert.equal(v.school.grade,6);assert.equal(v.favorites.length,3);assert.ok(v.favorites.every(c=>c.hero==='khan'));assert.ok(v.style&&v.life);
 s.chooseHero('hypatia');assert.equal(s.view.hero.id,'hypatia');assert.ok(sounds(log).includes('stone'));
 s.inspect(v.favorites[0].id);assert.equal(log.open.kind,'zoom');assert.equal(log.open.vm.state.card.id,v.favorites[0].id);
 ctx.session.mode='random';s.chooseHero('perikles');assert.equal(ctx.session.hero,'hypatia','Kolosseum: Held kommt aus dem Los');
 ctx.session.mode='daily';s.chooseHero('perikles');assert.equal(ctx.session.hero,'hypatia');v=s.view;assert.equal(v.selected,v.day.hero);
 for(const k of ['heldengalerie'])assert.match(read('view/setup.js'),new RegExp('// ASTRA: '+k+' – '));
});

test('AP 1.7 Kampagnenkarte: 22 Stationen auf der Karte, keine überdeckt eine andere, Belagerungen markiert',()=>{
 assert.equal(STATIONS.length,D.missions.length);
 const main=STATIONS.filter(s=>!s.inset),I=MAP.inset;
 for(const s of main){assert.ok(s.x>=24&&s.x<=MAP.w-24&&s.y>=24&&s.y<=MAP.h-24,s.place);assert.ok(Math.hypot(s.x-s.at.x,s.y-s.at.y)<60,s.place+' bleibt nah an seinem Ort');
  assert.ok(!(s.x>I.x-30&&s.x<I.x+I.w+30&&s.y<I.y+I.h+30),s.place+' nicht unter dem Kästchen „Neue Welt“');}
 for(let i=0;i<main.length;i++)for(let j=i+1;j<main.length;j++)assert.ok(Math.hypot(main[i].x-main[j].x,main[i].y-main[j].y)>=48,main[i].place+' / '+main[j].place);
 const tex=STATIONS[14];assert.equal(tex.place,'Azcapotzalco');assert.ok(tex.inset&&tex.x>I.x&&tex.x<I.x+I.w&&tex.y>I.y&&tex.y<I.y+I.h,'Neue Welt im Kästchen');
 assert.deepEqual(STATIONS.filter(s=>s.siege).map(s=>s.place),['Eresburg','Alesia','Athen','Auaris','Azcapotzalco','Namur']);
 const {ctx,store,log}=setup('campaign'),c=new Campaign(ctx);c.enter();
 assert.equal(c.picked.mission.id,0,'neu: Mission 1 liegt offen');store.profile.campaign=[0,1,2];assert.equal(c.picked.mission.id,3,'danach die erste nicht gewonnene');
 c.pick(9);assert.equal(c.picked.mission.id,9);assert.ok(c.picked.locked);c.start();assert.equal(log.go.length,0,'versiegelt: kein Start');
 c.pick(1);c.start();assert.deepEqual(log.go.at(-1),['setup',undefined]);assert.equal(ctx.session.mission,1);assert.equal(ctx.session.mode,'campaign');
 assert.equal(c.route.length,21,'die Marschroute verbindet die Stationen in Europa');
 const svg=read('assets/art/weltkarte.svg');assert.match(svg,/Natural Earth/);assert.ok(svg.length<120*1024,'Karte klein: '+svg.length);
 assert.match(svg,new RegExp(`viewBox="0 0 ${MAP.w} ${MAP.h}"`),'gleiche Projektion wie die Stationen');
 const view=read('view/campaign.js');for(const k of ['weltkarte','missionssiegel'])assert.match(view,new RegExp('// ASTRA: '+k+' – '),k);
 assert.match(read('view/dialogs.js'),/Natural Earth \(gemeinfrei\)/,'Quelle in den Credits');
});

test('Rückmeldung zu 1.18.0: weicheres Uhrwerk statt Gong, dezenterer Tod, Goldglanz über der ganzen Karte, Zugtafel misst ihren Text',()=>{
 const render=read('view/match/render.js');
 assert.match(render,/turn:'chime'/,'Zugwechsel klingt nach Uhrwerk');
 global.window=global.window||{};require(path.join(game,'service/audio.js'));const {levels}=window.CHA;
 // Lautestes 100-ms-Fenster je Datei (dBFS, werkzeuge/oberflaeche_klang.py) + Pegel.
 const measured={chime:-14.6,gong:-10.8,coins:-17.8,seal:-18.9,page:-20.5,parchment:-23.2,stone:-13.8},db=g=>measured[g]+20*Math.log10(levels[g]);
 assert.ok(db('chime')<=db('gong')-7,'Uhrwerk mindestens 7 dB leiser als der Gong: '+db('chime').toFixed(1));
 assert.ok(Math.abs(db('page')-db('parchment'))<2,'Umblättern wie das Pergament der Hand');
 assert.ok(db('coins')>db('stone')&&db('seal')>db('stone'),'Kauf kräftiger als ein Menü-Tipp');
 assert.match(render,/function glint\(c,w,h,t,i\)\{[^}]*\n c\.save\(\);c\.translate\(-w\/2,-h\/2\);c\.scale\(w\/200,h\/282\);R\.gatePath\(c\);c\.clip\(\)/,'Glanz liegt auf der Karte, nicht rechts darunter');
 // Seit 1.20.0 (Rückmeldung zu 1.19.0) noch ruhiger: tests/schluessel.test.js.
 assert.match(render,/type:'shatter',sp:u\.sp,x:u\.x,y:u\.y,start:t,life:460/,'Splitter kürzer');assert.match(render,/vx:cx\/len\*\(55\+r\*45\)/,'Splitter fliegen weniger weit');
 assert.match(render,/if\(ev\.building\)R\.fx\.push\(\{type:'sound',sound:'slam',x:pos\.x,gain:\.3/,'leiserer Fall-Laut, nur bei Bauwerken');
 assert.match(render,/function plateSize\(mine\)\{[^]*?measureText\(text\)[^]*?Math\.max\(mine\?460:380/,'die Tafel wächst mit ihrem Text');
});
