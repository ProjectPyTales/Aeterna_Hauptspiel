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
const refund=raw=>raw&&typeof raw==='object'&&Array.isArray(raw.skins)?[...new Set(raw.skins)].filter(id=>retired.includes(id)).length*300:0;
const boards=[
{id:'standard',name:'Standard',text:'Das sandsteinerne Schlachtfeld der Chronik.',image:'board',price:0},
{id:'ancient',name:'Griechischer Marmor',text:'Weißer Marmor, Eulen und der Helm eines Hopliten.',image:'board-ancient',price:100},
{id:'egypt',name:'Pharaonen-Gruft',text:'Goldene Wände einer Grabkammer am Nil.',image:'board-egypt',price:100},
{id:'viking',name:'Wikinger-Basalt',text:'Runenbasalt im Holzrahmen eines Langhauses.',image:'board-viking',price:100},
{id:'japan',name:'Zen-Schiefer',text:'Geharkter Schiefer, Laterne und Ahornlaub.',image:'board-japan',price:100}];
const catalog={backs,skins,boards};
const find=(kind,id)=>(catalog[kind]||[]).find(x=>x.id===id);
function fresh(){return {backs:['chroniken'],skins:[],boards:['standard'],equipped:{back:'chroniken',board:'standard',skins:{}}};}
// Accepts anything from an older or edited save and returns a consistent record.
function normalize(raw){const c=fresh();if(!raw||typeof raw!=='object')return c;
 for(const kind of ['backs','skins','boards'])if(Array.isArray(raw[kind]))for(const id of raw[kind])if(typeof id==='string'&&find(kind,id)&&!c[kind].includes(id))c[kind].push(id);
 const e=raw.equipped&&typeof raw.equipped==='object'?raw.equipped:{};
 if(c.backs.includes(e.back))c.equipped.back=e.back;
 if(c.boards.includes(e.board))c.equipped.board=e.board;
 if(e.skins&&typeof e.skins==='object')for(const [hero,id] of Object.entries(e.skins)){const s=find('skins',id);if(s&&s.hero===hero&&c.skins.includes(id))c.equipped.skins[hero]=id;}
 return c;}
function owns(p,kind,id){return !!find(kind,id)&&p.cosmetics[kind].includes(id);}
// Gold leaves the wallet exactly once; repeated taps on an owned item are refused.
function buy(p,kind,id){const item=find(kind,id);if(!item)return 'Unbekannter Gegenstand.';if(owns(p,kind,id))return 'Bereits freigeschaltet.';if(p.gold<item.price)return 'Du brauchst '+item.price+' Gold.';p.gold-=item.price;p.cosmetics[kind].push(id);return null;}
function equip(p,kind,id){const item=find(kind,id);if(!item)return 'Unbekannter Gegenstand.';if(!owns(p,kind,id))return 'Zuerst freischalten.';const e=p.cosmetics.equipped;if(kind==='backs')e.back=id;else if(kind==='boards')e.board=id;else e.skins[item.hero]=id;return null;}
function unequipSkin(p,hero){delete p.cosmetics.equipped.skins[hero];}
function equipped(p,kind,id){const e=p.cosmetics.equipped;if(kind==='backs')return e.back===id;if(kind==='boards')return e.board===id;const s=find('skins',id);return !!s&&e.skins[s.hero]===id;}
const api={catalog,find,fresh,normalize,retired,refund,owns,buy,equip,unequipSkin,equipped};
if(typeof module!=='undefined')module.exports=api;else root.CHK=api;
})(typeof globalThis!=='undefined'?globalThis:this);
