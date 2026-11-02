// AP 2.4 (Match-Renderer) und AP 2.5 (Renderer-Labor): versteckte Bildraten-Anzeige, Bildschleife ohne Drossel,
// Pixeldichte, Labor mit PixiJS offline. Gezeichnet und gemessen wird im Browser (werkzeuge/matchmessung.js,
// werkzeuge/labormessung.js); hier steht, was ohne Browser prüfbar ist.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const game=path.join(__dirname,'../../quellcode/assets/game'),read=f=>fs.readFileSync(path.join(game,f),'utf8');
const {Store}=require(path.join(game,'model/store.js')),P=require(path.join(game,'model/profile.js')),{Dialogs,Credits}=require(path.join(game,'viewmodel/dialogs.js'));

function setup(){const m=new Map(),storage={getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v))},store=new Store({storage});store.load();
 const log={toasts:[],dialogs:[],lab:0},ui={toast:t=>log.toasts.push(t),dialog:(kind,vm)=>log.dialogs.push({kind,vm}),close(){},lab:()=>log.lab++,platform:()=>null};
 const ctx={store,ui,session:{}};ctx.dialogs=new Dialogs(ctx,'test');return {ctx,store,log};}

test('Versteckte Einstellung: fünfmal auf die Version tippen schaltet die Bildraten-Anzeige und das Labor',()=>{
 const {ctx,store,log}=setup();assert.equal(store.profile.settings.fps,false,'neue Spielstände ohne Anzeige');
 ctx.dialogs.credits();const vm=log.dialogs.at(-1).vm;assert.ok(vm instanceof Credits);
 vm.lab();assert.equal(log.lab,0,'Labor nur im Entwicklermodus');
 for(let i=0;i<4;i++)vm.tapVersion();assert.equal(store.profile.settings.fps,false,'vier Tipper reichen nicht');
 vm.tapVersion();assert.equal(store.profile.settings.fps,true);assert.equal(vm.dev,true);assert.match(log.toasts.at(-1),/Bildrate/);
 vm.lab();assert.equal(log.lab,1);
 const saved=JSON.parse(ctx.store.exportText());assert.equal(saved.settings.fps,true,'gespeichert');
 for(let i=0;i<5;i++)vm.tapVersion();assert.equal(store.profile.settings.fps,false,'wieder aus');
});

test('Alte Spielstände ohne fps-Feld bleiben ladbar und bekommen die Anzeige aus',()=>{
 const old=P.fresh();delete old.settings.fps;const p=P.parse(JSON.stringify(old));assert.equal(p.settings.fps,false);
 old.settings.fps='ja';assert.equal(P.parse(JSON.stringify(old)).settings.fps,false,'nur true schaltet ein');
});

test('Bildschleife ohne 15-ms-Drossel, Leinwand mit Pixeldichte (höchstens 2), Leuchten als Sprites',()=>{
 const board=read('view/match/board.js'),render=read('view/match/render.js');
 assert.doesNotMatch(board,/now-last>=15/);assert.match(board,/Math\.min\(R\.quality==='sparsam'\?1:2,w\*\(window\.devicePixelRatio\|\|1\)\/1600\)/);
 assert.match(board,/ctx\.setTransform\(R\.scale,0,0,R\.scale,0,0\)/);
 // Im Bild je Frame nur noch Sprites: shadowBlur steht nur noch in Malfunktionen, die einmal in ein Sprite zeichnen.
 const draw=render.slice(render.indexOf('R.draw=(c,s,view,now)=>'),render.indexOf('R.events='));
 assert.doesNotMatch(draw.replace(/R\.sprite\([^]*?\}\)\)/g,''),/c\.shadowBlur=[1-9]/);
 for(const f of ['minion','portrait','button'])assert.match(render,new RegExp('function '+f+'\\([^]*?R\\.sprite\\('));
});

test('Renderer-Labor: PixiJS liegt offline mit MIT-Lizenz bei, alle Skripte der Seite existieren',()=>{
 const page=read('labor/renderer.html');assert.match(page,/<base href="\.\.\/">/);
 for(const [,src] of page.matchAll(/src="([^"]+)"/g))assert.ok(fs.existsSync(path.join(game,src)),src);
 assert.match(read('labor/LIZENZ-pixi.txt'),/MIT License/);assert.ok(fs.statSync(path.join(game,'labor/pixi.min.js')).size<1.5e6);
 assert.doesNotMatch(page+read('labor/labor.js'),/https?:\/\//,'keine Netzadressen');
 assert.match(read('view/dialogs.js'),/PixiJS/,'Credits nennen PixiJS');
});
