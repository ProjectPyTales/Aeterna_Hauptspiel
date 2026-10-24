// AP 3.9 – Lebendige Schlachtfelder und Lesbarkeit (1.32.0): vier Eck-Dioramen mit Animation, Klang und Zeile des Chronisten,
// langer Druck auf einen Diener erklärt seine Schlüsselwörter in einer Sprechblase, die Angriffsvorschau rechnet auf einer Kopie.
require('./attrappen.js');
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const game=path.join(__dirname,'../../quellcode/assets/game');
const need=f=>require(path.join(game,f)),read=f=>fs.readFileSync(path.join(game,f),'utf8');
const D=need('model/data.js'),E=need('model/engine.js');
const {Match,DIORAMAS,keywordsOf}=need('viewmodel/match.js');

// Geometrie aus view/match/layout.js (ohne Browser ausgewertet).
const L=(()=>{const window={};new Function('window',read('view/match/layout.js'))(window);return window.CHL;})();

function setup(s){const log={sound:[],fx:[],zoom:[],lore:[],dialogs:[]};
 const ui={play:(g,o)=>log.sound.push(g),haptic(){},screen:()=>'game',dialogOpen:()=>false,hidden:()=>false,toast(){},dialog:(k)=>log.dialogs.push(k),close(){}};
 const store={profile:{game:s,settings:{},stats:{}},commit(){},subscribe(){}};
 const m=new Match({store,ui,board:{busy:()=>false,effect:f=>log.fx.push(f)},dialogs:{zoom:id=>log.zoom.push(id),lore:id=>log.lore.push(id)}});
 return {m,log};}
function ready(){const s=E.create({hero:'leonidas',foe:'khan',seed:4242,first:0});E.mulligan(s,[]);for(const a of s.players){a.hand=[];a.mana=a.maxMana=10;}return s;}
const minion=(s,p,id='attrappe_23')=>{const u=E.summon(s,p,id);u.ready=true;delete u.fresh;return u;};

test('Eck-Dioramen: vier Ecken, Treffer-Ziele ≥ 48 dp im Bild und frei von Pause, Hilfe, Chronik-Leiste und Ausspielen',()=>{
 assert.equal(L.dioramas.length,4);assert.equal(DIORAMAS.length,4);
 const boxes=L.dioramas.map((_,i)=>L.dioramaBox(i)),apart=(a,b)=>a.x+a.w<=b.x||b.x+b.w<=a.x||a.y+a.h<=b.y||b.y+b.h<=a.y;
 const busy=[{x:124-12,y:27-14,w:84,h:84},{x:210-12,y:27-14,w:84,h:84},{x:L.strip.x,y:L.strip.top-30,w:L.strip.w,h:L.strip.h},{x:L.confirm.x,y:L.confirm.y,w:L.confirm.w,h:L.confirm.h}];
 for(const b of boxes){assert.ok(b.w>=84&&b.h>=84,'mindestens 84 Bühneneinheiten');assert.ok(b.x>=0&&b.y>=0&&b.x+b.w<=1600&&b.y+b.h<=800,'im Bild');
  for(const o of busy)assert.ok(apart(b,o),JSON.stringify([b,o]));}
 // Je Ecke eine Ecke des Tisches: oben links, oben rechts, unten links, unten rechts.
 assert.deepEqual(L.dioramas.map(d=>[d.x<800,d.y<400]),[[true,true],[false,true],[true,false],[false,false]]);
});

test('Eck-Dioramen: Antippen spielt Animation und eigenen Klang, der Chronist erzählt mit Quelle; ein Tippen schließt die Blase',()=>{
 const {m,log}=setup(ready());
 DIORAMAS.forEach((d,i)=>{const b=L.dioramaBox(i);m.tap({id:'diorama'+i,kind:'diorama',...b});
  assert.deepEqual(log.fx.at(-1),{type:'diorama',id:d.id,x:b.x+b.w/2,y:b.y+b.h/2,life:d.life});assert.equal(log.sound.at(-1),d.sound);
  const bub=m.view.bubble;assert.equal(bub.title,d.name);assert.ok(bub.lines[0].text.length>40&&bub.lines[0].text.length<=150,d.name);
  assert.ok(bub.source.length>8,d.name+' nennt eine Quelle');assert.ok(bub.delay>0&&bub.delay<d.life,'erst die Bewegung, dann die Blase');});
 assert.deepEqual(DIORAMAS.map(d=>d.id),['astrolab','incense','column','catapult']);
 m.tap(null);assert.equal(m.view.bubble,undefined);
 // Dioramen sind Schmuck: sie ändern nichts an der Partie und gehen auch im Zug des Gegners.
 const s=ready();s.active=1;const {m:m2,log:l2}=setup(s);const before=JSON.stringify(s);m2.tap({id:'diorama3',kind:'diorama',...L.dioramaBox(3)});
 assert.equal(l2.sound[0],'catapult');assert.equal(JSON.stringify(s),before);
});

test('Eck-Dioramen: vier eigene Klänge mit zwei Varianten, Pegel in CHA.levels',()=>{
 const manifest=JSON.parse(read('assets/audio/manifest.json')),audio=read('service/audio.js');
 for(const k of ['astrolab','incense','column','catapult']){assert.deepEqual(manifest[k],[k+'-1',k+'-2']);
  for(const f of manifest[k])assert.ok(fs.existsSync(path.join(game,'assets/audio',f+'.ogg')),f);assert.match(audio,new RegExp(k+':[.0-9]+'));}
 assert.ok(fs.existsSync(path.join(__dirname,'../diorama_klang.py')));
});

test('Langer Druck: Schlüsselwörter eines Dieners als Sprechblase, Antippen der Blase zeigt die Karte; sonst wie bisher',()=>{
 const s=ready(),u=minion(s,0,'neutral_8');u.shield=true;const plain=minion(s,0);const {m,log}=setup(s);
 const hit={id:u.uid,kind:'target',idCard:u.id,x:600,y:380,w:114,h:146};m.longPress(hit);
 const b=m.view.bubble;assert.equal(b.title,'Wachhund');assert.equal(b.card,'neutral_8');assert.deepEqual(b.lines.map(l=>l.name),['Schildwall','Segen']);
 assert.equal(b.lines[0].text,D.keywords.find(k=>k.name==='Schildwall').text);assert.deepEqual([b.x,b.top,b.bottom],[657,380,526]);assert.deepEqual(log.zoom,[]);
 m.tap({id:'bubble',kind:'bubble'});assert.deepEqual(log.zoom,['neutral_8'],'Blase antippen zeigt die ganze Karte');assert.equal(m.view.bubble,null);
 // Ohne Schlüsselwort, auf der Hand und am Helden bleibt es bei Karte und Chronik.
 m.longPress({id:plain.uid,kind:'target',idCard:plain.id,x:0,y:0,w:10,h:10});assert.deepEqual(log.zoom,['neutral_8','attrappe_23']);
 m.longPress({id:'h1',kind:'target',x:0,y:0,w:10,h:10});assert.deepEqual(log.lore,['khan']);
 // Zustand statt Kartentext: Starre und Bannung erscheinen, ein gebannter Diener verliert sein Vermächtnis.
 assert.deepEqual(keywordsOf({frozen:true,silenced:true},{death:[{}]}).map(k=>k.name),['Starre','Bannung']);
 assert.deepEqual(keywordsOf({},{death:[{}],focus:1}).map(k=>k.name),['Vermächtnis','Weisheit']);
});

test('Angriffsvorschau: erwarteter Schaden an Ziel und Angreifer auf einer Kopie – die Partie bleibt unberührt, Hinterhalte bleiben verdeckt',()=>{
 // Der Gegner legt Krähenfüße (Hinterhalt beim Angriff), dann bin ich am Zug.
 const s=ready();E.apply(s,{type:'end'});const b=s.players[1];b.mana=10;const h={id:'neutral_50',uid:'t'+s.nextId++};b.hand.push(h);
 assert.ok(E.apply(s,{type:'play',uid:h.uid}).ok);E.apply(s,{type:'end'});assert.equal(s.active,0);s.players[0].mana=10;
 const me=minion(s,0,'attrappe_34'),foe=minion(s,1,'attrappe_23');const {m}=setup(s),before=JSON.stringify(s);
 const p=m.preview(me.uid,foe.uid);
 assert.deepEqual(p,{attacker:me.uid,target:foe.uid,sides:[{id:foe.uid,loss:3,dies:true},{id:me.uid,loss:2,dies:false}]});
 assert.equal(JSON.stringify(s),before,'nur auf der Kopie gerechnet');assert.equal(s.players[1].ambush.length,1,'Hinterhalt bleibt verdeckt');
 // Auf den Helden: Leben und Rüstung zählen.
 s.players[1].armor=2;const q=m.preview(me.uid,'h1');assert.deepEqual(q.sides[0],{id:'h1',loss:3,dies:false});
 // Beim Zielen mit gezogenem Angreifer steht die Vorschau im view; ohne Ziel und nach dem Loslassen nicht mehr.
 m.view.selected={type:'attack',uid:me.uid};m.view.targets=[foe.uid,'h1'];m.view.drag={at:0};
 m.aim({hitId:foe.uid});assert.equal(m.view.preview.target,foe.uid);const first=m.view.preview;m.aim({hitId:foe.uid});assert.equal(m.view.preview,first,'zwischengespeichert');
 m.aim({hitId:null});assert.equal(m.view.preview,null);m.aim({hitId:'h1'});m.endDrag();assert.equal(m.view.preview,undefined);
 // Im Zug des Gegners gibt es keine Vorschau.
 s.active=1;assert.equal(m.preview(me.uid,foe.uid),null);
});

test('Ansichten: Dioramen, Sprechblase und Vorschau als gekennzeichnete Platzhalter, nach render.js geladen',()=>{
 const di=read('view/match/dioramen.js'),rnd=read('view/match/render.js'),html=read('index.html');
 for(const k of ['eck-astrolabium','eck-raeuchergefaess','eck-saeule','eck-katapult','sprechblase-match','angriffsvorschau'])assert.match(di,new RegExp('// ASTRA: '+k+' – .*, \\d+ × \\d+'),k);
 assert.ok(html.indexOf('view/match/dioramen.js')>html.indexOf('view/match/render.js'));
 assert.match(rnd,/hit\('diorama'\+i,/);assert.match(rnd,/AEDI\?\.bubble\(c,view\.bubble,t,hit\)/);assert.match(rnd,/AEDI\?\.preview\(c,view,t\)/);
 assert.doesNotMatch(rnd,/decor0/,'die alten Deko-Flächen sind ersetzt');
 // Bei reduzierter Bewegung leuchtet ein Diorama nur kurz auf.
 assert.match(di,/if\(q!=null&&still\(\)\)/);
});
