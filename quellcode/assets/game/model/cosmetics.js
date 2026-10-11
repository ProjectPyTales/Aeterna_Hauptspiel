/* Cosmetic catalog for the Basar. Purely presentational: nothing here touches match rules. */
(function(root){'use strict';
const backs=[
{id:'chroniken',name:'Aeterna-Siegel',text:'Der klassische Rücken mit dem goldenen Stern der Chronik.',price:0},
{id:'tempel',name:'Tempelstein',text:'Verwitterter Kalkstein mit Mäanderband und Moos in den Fugen.',price:150},
{id:'sparta',name:'Spartas Bronzeschild',text:'Ein gehämmertes Lambda auf spartanischem Purpur.',price:200},
{id:'pharao',name:'Pharaonengold',text:'Lapislazuli, Blattgold und das wachende Auge des Horus.',price:200},
{id:'runen',name:'Wikinger-Runen',text:'Basalt aus dem Norden, gezeichnet von eisblauen Runen.',price:200},
{id:'sterne',name:'Sternenkarte',text:'Das Astrolabium von Alexandria unter einem Himmel aus Gold.',price:250},
{id:'lilien',name:'Lilienbanner',text:'Goldene Lilien auf königsblauem Tuch, wie in Orléans.',price:250},
{id:'zen',name:'Tusche & Kirschblüte',text:'Schwarzer Lack, ein roter Pinselkreis und fallende Blüten.',price:250}];
// The marble-hall edition keeps every ruler's face; only attire and setting change.
const skinEpithets={leonidas:'Hüter der Thermopylen',hypatia:'Sternkundige von Alexandria',imhotep:'Baumeister von Sakkara',dandolo:'Doge von Venedig'};
const skins=Object.keys(skinEpithets).map(hero=>({id:hero+'-marmor',hero,atlas:'heroes-marble',name:'Marmorhallen-Edition',text:skinEpithets[hero],price:300}));
// Lehrplan-Helden (AP L.1, 1.14.0): Die Marmor-Skins der sechs ersetzten Helden zeigten die alten Personen. Sie entfallen;
// wer einen gekauft hat, bekommt den Preis zurück – einmal, denn normalize entfernt die ID danach aus dem Spielstand.
const retired=['khan','boudicca','nostradamus','jeanne','ragnar','musashi'].map(hero=>hero+'-marmor');
// Schlachtfelder (Rückmeldung zu 1.15.0): Die vier gemalten Felder von 1.4.0 (Marmor, Gruft, Basalt, Schiefer) sahen
// schlecht aus und entfallen; wer eins gekauft hat, bekommt 100 Gold zurück – ebenfalls einmal.
const retiredBoards=['ancient','egypt','viking','japan'];
const refund=raw=>{if(!raw||typeof raw!=='object')return 0;const ids=list=>Array.isArray(list)?[...new Set(list)]:[];
 return ids(raw.skins).filter(id=>retired.includes(id)).length*300+ids(raw.boards).filter(id=>retiredBoards.includes(id)).length*100;};
// Ein Schlachtfeld ist der Tisch unter beiden Epochenhälften (AP 1.8, Entscheidung 3). Seit 1.21.0 (AP A.1) hat jeder
// Tisch sein Astra-Bild (werkzeuge/astra_bilder.py). Ein Tisch ohne image bliebe Platzhalter: der Standardtisch mit dem
// Farbfilter tint (CSS-Filter), gelistet in MOTIVE.md.
const boards=[
{id:'standard',name:'Standard',text:'Der Feldherrentisch aus Sandstein und poliertem Holz.',image:'board',price:0},
{id:'athen',name:'Marmortisch von Athen',text:'Weißer Marmor vom Pentelikon, wie im Rat der Fünfhundert.',image:'board-athen',price:100},
{id:'kapitol',name:'Porphyr des Kapitols',text:'Roter Porphyr mit Bronzebeschlägen aus dem Senat Roms.',image:'board-kapitol',price:100},
{id:'skriptorium',name:'Pult des Skriptoriums',text:'Dunkle Eiche und Schiefer aus der Schreibstube eines Klosters.',image:'board-skriptorium',price:100},
{id:'porzellan',name:'Meißner Porzellan',text:'Weißes Porzellan und Kobaltblau aus Böttgers Manufaktur.',image:'board-porzellan',price:100}];
// Kartenrahmen (AP 1.5, 1.18.0): the temple gate is the standard; golden cards gild every frame of your own cards – in
// the hand, in the air, in the collection – and a glint passes over them in the match. Purely cosmetic.
const frames=[
{id:'tempeltor',name:'Tempeltor',text:'Kalkstein, Bronze und ein Bogenfenster – der Rahmen jeder Karte.',price:0},
{id:'gold',name:'Goldene Karten',text:'Blattgold auf jedem Rahmen Deiner Karten; im Duell läuft ein Glanz darüber.',price:600}];
const catalog={backs,skins,boards,frames};
const find=(kind,id)=>(catalog[kind]||[]).find(x=>x.id===id);
function fresh(){return {backs:['chroniken'],skins:[],boards:['standard'],frames:['tempeltor'],equipped:{back:'chroniken',board:'standard',frame:'tempeltor',skins:{}}};}
// Accepts anything from an older or edited save and returns a consistent record.
function normalize(raw){const c=fresh();if(!raw||typeof raw!=='object')return c;
 for(const kind of ['backs','skins','boards','frames'])if(Array.isArray(raw[kind]))for(const id of raw[kind])if(typeof id==='string'&&find(kind,id)&&!c[kind].includes(id))c[kind].push(id);
 const e=raw.equipped&&typeof raw.equipped==='object'?raw.equipped:{};
 if(c.backs.includes(e.back))c.equipped.back=e.back;
 if(c.boards.includes(e.board))c.equipped.board=e.board;
 if(c.frames.includes(e.frame))c.equipped.frame=e.frame;
 if(e.skins&&typeof e.skins==='object')for(const [hero,id] of Object.entries(e.skins)){const s=find('skins',id);if(s&&s.hero===hero&&c.skins.includes(id))c.equipped.skins[hero]=id;}
 return c;}
function owns(p,kind,id){return !!find(kind,id)&&p.cosmetics[kind].includes(id);}
// Gold leaves the wallet exactly once; repeated taps on an owned item are refused.
function buy(p,kind,id){const item=find(kind,id);if(!item)return 'Unbekannter Gegenstand.';if(owns(p,kind,id))return 'Bereits freigeschaltet.';if(p.gold<item.price)return 'Du brauchst '+item.price+' Gold.';p.gold-=item.price;p.cosmetics[kind].push(id);return null;}
function equip(p,kind,id){const item=find(kind,id);if(!item)return 'Unbekannter Gegenstand.';if(!owns(p,kind,id))return 'Zuerst freischalten.';const e=p.cosmetics.equipped;if(kind==='backs')e.back=id;else if(kind==='boards')e.board=id;else if(kind==='frames')e.frame=id;else e.skins[item.hero]=id;return null;}
function unequipSkin(p,hero){delete p.cosmetics.equipped.skins[hero];}
function equipped(p,kind,id){const e=p.cosmetics.equipped;if(kind==='backs')return e.back===id;if(kind==='boards')return e.board===id;if(kind==='frames')return e.frame===id;const s=find('skins',id);return !!s&&e.skins[s.hero]===id;}
const api={catalog,find,fresh,normalize,retired,retiredBoards,refund,owns,buy,equip,unequipSkin,equipped};
if(typeof module!=='undefined')module.exports=api;else root.CHK=api;
})(typeof globalThis!=='undefined'?globalThis:this);
