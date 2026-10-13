// Karten, Schlüsselwörter und Chronik nah an der Geschichte (AP L.6, 1.24.0): Fantasy-Namen folgen den vorhandenen Bildern,
// Göttliche Gunst heißt Segen, Arkaner Fokus Weisheit, „Zauber“ wird als Glaube der Zeit erklärt; „Aus der Chronik“ je Karte.
require('./attrappen.js');
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const game=path.join(__dirname,'../../quellcode/assets/game');
const D=require(path.join(game,'model/data.js')),L=require(path.join(game,'model/lore.js')),B=require(path.join(game,'model/bilder.js'));
const src=f=>fs.readFileSync(path.join(game,f),'utf8');
// Wörter, die nach Zauberei klingen oder die alten Namen tragen – „Zauber“ selbst bleibt (Entscheidung 21).
const FANTASY=/Himmelsstrahl|Sternenregen|Sonnenfokus|Sternenorakel|Sonnensegen|Urteil der Sonne|Astrolabienwächter|Vergessene Weisheit|Maskierte Wache|Zehnerrat|Fokus|Göttlich|Magie|Zauberei|Sternenfunke|Arkane[rn]? /;
const RENAMED={hypatia_1:'Erdmessung des Eratosthenes',hypatia_3:'Sternkatalog des Hipparchos',hypatia_4:'Synesios von Kyrene',
 hypatia_7:'Brennspiegel des Archimedes',hypatia_8:'Klaudios Ptolemaios',imhotep_4:'Brot und Bier',imhotep_8:'Urteil nach der Maat',
 dandolo_5:'Nachtwache am Kanal',dandolo_10:'Spitzel im Venezianerviertel',neutral_35:'Mercators Atlas',nostradamus_3:'Rezept des Goldmachers'};

test('Prüftabelle Teil 1: neue Namen nach den Bildern, Wirkungen und Kosten wie bisher',()=>{
 for(const [id,name] of Object.entries(RENAMED))assert.equal(D.byId[id].name,name,id);
 // Stichproben der Wirkung: nur Namen haben sich geändert.
 const fx=id=>JSON.stringify([D.byId[id].cost,D.byId[id].effects||D.byId[id].end||null]);
 assert.equal(fx('hypatia_1'),JSON.stringify([2,[{type:'damage',n:3}]]));
 assert.equal(fx('hypatia_7'),JSON.stringify([6,[{type:'damage',n:7}]]));
 assert.equal(D.byId.hypatia_3.cost,4);assert.equal(D.byId.imhotep_8.cost,5);assert.equal(D.byId.neutral_35.cost,4);
 assert.equal(D.byId.hypatia_4.shield,true,'Synesios, später Bischof: Segen');assert.equal(D.byId.dandolo_10.stealth,true,'der Spitzel bleibt getarnt');
 // Das Bild bleibt, wo es war: Astras Bilder für die Hypatia-, Imhotep- und Dandolo-Karten.
 for(const id of Object.keys(RENAMED).filter(id=>!id.startsWith('neutral')&&id!=='nostradamus_3'))assert.ok(B.cards[id],id+': Astra-Bild bleibt');
 assert.equal(D.byId.dandolo_9.name,'Marco Polo, der Weltenfahrer','Marco Polo bleibt – die Chronikzeile erklärt die Zeit');
});

test('Alte Bilder: Fantasy-Motive werden Platzhalter, zwei falsche Bilder tauschen mit ungenutzten alten',()=>{
 for(const id of ['neutral_20','neutral_23'])assert.ok(D.missingArt(D.byId[id]),id+': Platzhalter statt Kristallgestalt und Skelett');
 assert.deepEqual([D.byId.neutral_22.art,D.byId.neutral_22.cell],['khan',10],'Steinadler statt Weißkopfseeadler');
 assert.deepEqual([D.byId.neutral_35.art,D.byId.neutral_35.cell],['neutral3',10],'goldenes Buch mit Erdkugel');
 // Kein anderes Bild zeigt dasselbe Atlasfeld.
 const cells=Object.values(D.byId).filter(c=>c.art&&!D.missingArt(c)).map(c=>c.art+':'+c.cell);
 for(const k of ['khan:10','neutral3:10'])assert.equal(cells.filter(x=>x===k).length,1,k);
 const md=fs.readFileSync(path.join(__dirname,'../../ungenutzte_assets/MOTIVE.md'),'utf8');
 for(const id of ['neutral_20','neutral_23'])assert.ok(md.includes('`'+id+'`'),id+' in MOTIVE.md');
});

test('Keine Fantasy-Wörter mehr in Karten, Spielsteinen, Schlüsselwörtern, Missionen, Fähigkeiten und Spielstil',()=>{
 for(const c of Object.values(D.byId))assert.doesNotMatch(c.name+' '+(c.text||''),FANTASY,c.id);
 for(const k of D.keywords)assert.doesNotMatch(k.name+' '+k.text,FANTASY,k.name);
 for(const m of D.missions)assert.doesNotMatch(m.title+' '+m.boss+' '+m.description,FANTASY,m.title);
 for(const h of D.heroes)assert.doesNotMatch(h.power+' '+h.powerText+' '+L.of(h.id).style,FANTASY,h.id);
 const help=src('view/dialogs.js');assert.doesNotMatch(help.slice(help.indexOf('const RULES'),help.indexOf('D_.help')),FANTASY,'Hilfe');
});

test('Schlüsselwörter: Segen und Weisheit stehen genau dort, wo die Engine-Felder gesetzt sind',()=>{
 const names=D.keywords.map(k=>k.name);
 for(const k of ['Segen','Weisheit','Zauber'])assert.ok(names.includes(k),k);
 assert.ok(D.keywords.find(k=>k.name==='Segen').text.includes('Epoche'),'Segen erklärt, dass Menschen darum baten');
 for(const c of D.cards){const m=/Weisheit \+(\d)/.exec(c.text);assert.equal(m?+m[1]:0,c.focus||0,c.id);}
 assert.equal(D.cards.filter(c=>c.focus).length,3,'Theon, Astronomin des Museions, Leuchtturm von Pharos');
 assert.ok(D.cards.filter(c=>/Segen/.test(c.text)).length>=20);
});

test('„Zauber“ bleibt und wird als Glaube der Zeit erklärt – unter jedem Zauber und in der Hilfe',()=>{
 const z=D.keywords.find(k=>k.name==='Zauber');assert.match(z.text,/Glauben der Zeit/);assert.match(z.text,/Merseburger/);
 const spell=D.byId.hypatia_1,minion=D.byId.leonidas_0;
 assert.ok(D.glossaryOf(spell).some(k=>k.name==='Zauber'),'Zauber erklärt sich in der Großansicht');
 assert.ok(!D.glossaryOf(minion).some(k=>k.name==='Zauber'),'Diener ohne Zauber im Text');
 assert.equal(D.glossaryOf(D.byId.griechen_4).filter(k=>k.name==='Zauber').length,1,'Leuchtturm nennt Zauber im Text: einmal');
 assert.equal(D.glossaryOf(spell).filter(k=>k.name==='Zauber').length,1);
 assert.match(src('view/dialogs.js'),/warum Zauber so heißen/,'Hilfe zeigt, wo das Wort erklärt wird');
});

test('Aus der Chronik (AP L.6 Teil 2): belegte Sätze mit Quelle, zuerst für alle geprüften Karten',()=>{
 const lines=Object.entries(L.cards);
 assert.ok(lines.length>=16);
 for(const [id,[text,source]] of lines){assert.ok(D.byId[id],id+': Karte gibt es');
  assert.ok(text.length>=40&&/[.!?“]$/.test(text),id+': ganzer Satz');assert.ok(source.length>=5,id+': Quelle');
  assert.doesNotMatch(text,FANTASY,id);assert.deepEqual(L.card(id),[text,source]);}
 for(const id of [...Object.keys(RENAMED),'dandolo_9','neutral_20','neutral_22','neutral_33','neutral_48'])
  assert.ok(L.card(id),id+': Chronikzeile fehlt');
 // Unsicheres wird als unsicher erzählt.
 assert.match(L.card('hypatia_7')[0],/Legende/);assert.match(L.card('neutral_33')[0],/Sage/);assert.match(L.card('neutral_48')[0],/unsicher/);
 assert.equal(L.card('leonidas_0'),null);
 // Großansicht im Match und Kartendetails der Sammlung zeigen die Zeile.
 assert.match(src('view/kit.js'),/V\.chronicle=c=>\{const l=AELORE\.card\(c\.id\)/);
 for(const f of ['view/dialogs.js','view/collection.js'])assert.match(src(f),/\$\{V\.glossary\(c\)\}\$\{V\.chronicle\(c\)\}/,f);
});
