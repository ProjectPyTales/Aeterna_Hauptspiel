// Lehrplan-Helden (AP L.1, 1.14.0), Zeitalterkarten nach Epoche (AP L.2, erster Teil) und Astra-Kennzeichnung (AP L.4).
require('./attrappen.js');
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const game=path.join(__dirname,'../../quellcode/assets/game');
const need=f=>require(path.join(game,f));
const B=need('model/bilder.js'),D=need('model/data.js'),E=need('model/engine.js'),P=need('model/profile.js'),L=need('model/lore.js');
const NEW={khan:'Widukind',boudicca:'Vercingetorix',nostradamus:'Johann Friedrich Böttger',jeanne:'Hildegard von Bingen',ragnar:'Wiprecht von Groitzsch',
 musashi:'Ulrich von Liechtenstein',amanirenas:'Ahhotep I.',masako:'Theophanu',mandukhai:'Thusnelda',zizka:'Vauban',fuhao:'Fürstin von Vix'};
// Namen der ersetzten Personen und ihrer Welt – sie dürfen an Helden, Chronik und Missionen nicht mehr stehen
// (geschichtliche Erwähnungen wie Baibars’ Sieg über die Mongolen bleiben erlaubt).
const OLD=/Dschingis|Boudicca|Nostradamus|Jeanne|Ragnar|Lodbrok|Musashi|Amanirenas|Masako|Mandukhai|Žižka|Fu Hao|Shang-|Kamakura|Hussit|Wikinger/;

test('Lehrplan: jeder Held hat Klassenstufe 5–7 und Lernbereich, die elf neuen Personen erben die IDs',()=>{
 assert.deepEqual(Object.keys(L.curriculum).sort(),D.heroes.map(h=>h.id).sort());
 for(const h of D.heroes){const s=L.school(h.id);assert.ok(s.grade>=5&&s.grade<=7,h.id);assert.ok(s.topic.length>5,h.id);}
 for(const [id,name] of Object.entries(NEW)){const h=D.heroById[id];assert.equal(h.name,name);assert.deepEqual([h.art,h.cell],B.heroes[id],id+': Astra-Porträt (AP A.1)');
  assert.deepEqual(D.replaced.includes(id),true);assert.equal(P.validateDeck(P.fresh(),id,E.starter(id)),null,id);}
 assert.equal(D.replaced.length,11);
 for(const h of D.heroes){const l=L.of(h.id),m=D.missions.find(m=>m.hero===h.id);
  for(const text of [h.name,h.era,h.power,l.epoch,l.place,l.quote,l.style,...l.bio,...l.relations.flat(),m.title,m.boss,m.subtitle])assert.ok(!OLD.test(text),h.id+': '+text);}
});

test('Zeitalter nach dem Lehrplan: sechs Epochen in zeitlicher Folge, je drei bis fünf Helden und sieben Zeitalterkarten',()=>{
 assert.deepEqual(D.ages.map(a=>a.name),['Frühzeit und Ägypten','Griechenland und Hellenismus','Rom und Germanien','Mittelalter im Reich','Kreuzzüge','Frühe Neuzeit']);
 for(const a of D.ages){const heroes=D.heroes.filter(h=>h.age===a.id),set=D.cards.filter(c=>c.age===a.id);
  assert.ok(heroes.length>=3&&heroes.length<=5,a.id);assert.equal(set.length,7,a.id);
  assert.ok(set.every(c=>heroes.every(h=>D.playable(c,h.id))),a.id);}
 assert.ok(D.heroes.every(h=>D.ageById[h.age]),'kein Held ohne Zeitalter');
 // Die Grundschule der Epochen: Klasse 5 vorn, Klasse 7 hinten.
 const grade=a=>Math.max(...D.heroes.filter(h=>h.age===a.id).map(h=>L.school(h.id).grade));
 assert.ok(D.ages.every((a,i)=>!i||grade(D.ages[i-1])<=grade(a)));
});

test('Zeitalterkarten (AP L.2): Frühzeit und Frühe Neuzeit ohne Steppe und Ostasien, Wirkungen und IDs unverändert',()=>{
 const set=D.cards.filter(c=>c.age==='steppe'||c.age==='ostasien'),far=/Steppe|Pers|Parth|Unsterbl|Mongol|Jurt|Japan|China|Korea|Terrakotta|Samurai|Ashigaru|Hwacha|Mandarin|Schildkröt|Große Mauer|Tee/;
 assert.equal(set.length,14);
 for(const c of set){assert.ok(!far.test(c.name+' '+c.text),c.id+': '+c.name);
  for(const e of [...(c.effects||[]),...(c.battle||[]),...(c.death||[]),...(c.start||[])])if(e.token)assert.ok(!far.test(D.tokens[e.token].name),c.id+' ruft '+D.tokens[e.token].name);}
 assert.deepEqual(['steppe_0','steppe_6','ostasien_0','ostasien_6'].map(id=>D.byId[id].name),['Wagenbauer','Festung Buhen','Landsknecht','Sternschanze']);
 assert.equal(D.byId.ostasien_6.wall,true);assert.equal(D.tokens.chariot.attack,D.tokens.rider.attack);assert.equal(D.tokens.chariot.charge,true);
 assert.equal(D.cards.length,350);
});

test('Alte Spielstände (1.13.0): Sammlung und Decks bleiben, alte Decknamen bekommen die neue Epoche',()=>{
 const old=P.fresh();old.collection.khan_9=1;old.collection.steppe_2=2;
 const deck=old.decks.find(d=>d.hero==='khan');deck.name='Mongolen · Basis';
 old.decks.push({id:'eigen',name:'Shang · Neu',hero:'fuhao',cards:E.starter('fuhao')},{id:'frei',name:'Mein Lieblingsdeck',hero:'musashi',cards:E.starter('musashi')});
 const p=P.parse(JSON.stringify(old));
 assert.equal(p.collection.khan_9,1);assert.equal(p.collection.steppe_2,2);
 assert.equal(p.decks.find(d=>d.hero==='khan').name,'Sachsen · Basis');
 assert.equal(p.decks.find(d=>d.id==='eigen').name,'Hallstattzeit · Neu');
 assert.equal(p.decks.find(d=>d.id==='frei').name,'Mein Lieblingsdeck','eigene Namen bleiben');
});

test('Astra (AP L.4): Code und MOTIVE.md nennen dieselben Kennungen, jede mit Größe',()=>{
 const tag=/ASTRA: ([a-z0-9-]+) – (.+?), ([^,]*?\d+ × \d+)/g,code=[];let marks=0;
 const walk=dir=>{for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);
  if(e.isDirectory())walk(f);else if(/\.(js|css|html)$/.test(e.name)&&!e.name.endsWith('.min.js')){const text=fs.readFileSync(f,'utf8');
   for(const m of text.matchAll(tag))code.push(m[1]);marks+=text.split('ASTRA:').length-1;}}};
 walk(path.join(__dirname,'../../quellcode'));
 assert.ok(code.length>=20,'mindestens 20 gezeichnete Grafiken gekennzeichnet');
 assert.equal(new Set(code).size,code.length,'jede Kennung nur einmal');
 assert.equal(marks,code.length,'unvollständige Kennzeichnung: „ASTRA: <kennung> – <was>, <Größe>“');
 const md=fs.readFileSync(path.join(__dirname,'../../ungenutzte_assets/MOTIVE.md'),'utf8'),section=md.slice(md.indexOf('## Im Code gezeichnet'));
 const listed=[...section.matchAll(/^\| `([a-z0-9-]+)` \|/gm)].map(m=>m[1]);
 assert.deepEqual(listed.sort(),[...code].sort(),'MOTIVE.md veraltet – node werkzeuge/motive.js ausführen');
 for(const id of ['kartenrahmen','diener-plakette','faehigkeitssymbole','steinknopf','stufenpyramide','feldherrentisch','heldenmuenze','herrschersiegel','aetheruhr','chronikleiste','chronometer'])assert.ok(code.includes(id),id);
});

// AP L.2 (1.15.0): Karten der elf Lehrplan-Helden und neutrale Karten aus Lebenswelten statt Fantasy.
// Welten der ersetzten Helden – Mongolen, Icener, Prophetie, Jeanne, Wikinger, Samurai, Kusch, Kamakura, Hussiten, Shang.
const FAR=/Steppe|Mongol|Khan\b|Khatun|Tumen|Jurt|Kurultai|Keshig|Subutai|Icener|Andraste|Londinium|Quatrain|Prophez|Horoskop|Medici|Orléans|Reims|Lilie|Domrémy|La Hire|Loire|Rune|Fjord|Berserk|Lagertha|Donnergott|Nordsee|Samurai|Rōnin|Dojo|Shinobi|Kojir|Niten|Kirschblüt|Kusch|Meroë|Napata|Ta-Seti|Akinidad|Syene|Kamakura|Gokenin|Jōkyū|Hachiman|Shikken|Jitō|Hōjō|Minamoto|Rokuhara|Chahar|Oirat|Tas Bürd|Möngke|Zwilling|Tabor|Wagenburg|Píšťala|Prokop|Jan Hus|Prager|Laienkelch|Shang|Yue-Axt|Qiang|Wu Ding|Weltenbaum|Golem|Phönix/;
const texts=c=>[c.name,c.text||'',...['effects','battle','death','start','end'].flatMap(k=>(c[k]||[]).filter(e=>e.token).map(e=>D.byId[e.token].name))].join(' ');

test('Heldenkarten (AP L.2): 132 Karten der elf Lehrplan-Helden aus ihrer Lebenswelt, Wirkungen und IDs unverändert',()=>{
 const set=D.cards.filter(c=>D.replaced.includes(c.hero));
 assert.equal(set.length,132);
 for(const c of set){assert.ok(!OLD.test(texts(c))&&!FAR.test(texts(c)),c.id+': '+texts(c));}
 for(const h of D.replaced)assert.ok(!FAR.test(D.heroById[h].powerText),h+': '+D.heroById[h].powerText);
 // Spielsteine: Novizinnen, Grenzsteine, Schanzkörbe, Füsiliere, Sippenbruder
 assert.deepEqual(['novice','totem_heal','totem_fire','totem_guard','totem_strength','wagon','taborite','twin'].map(id=>D.tokens[id].name),
  ['Novizin','Grenzstein des Klosters','Grenzstein der Mark','Grenzstein der Burg','Grenzstein des Dorfes','Schanzkorb','Füsilier','Sippenbruder']);
 assert.equal(D.heroById.jeanne.ability.effects[0].token,'novice');assert.equal(D.tokens.recruit.name,'Rekrut','Rekruten bleiben für Dandolo und Caesar');
 assert.deepEqual(['khan_9','boudicca_9','nostradamus_9','jeanne_9','ragnar_9','musashi_9','amanirenas_9','masako_9','mandukhai_9','zizka_9','fuhao_9'].map(id=>D.byId[id].name),
  ['Abbi, Gefährte Widukinds','Commius, Führer des Entsatzheers','Tschirnhaus, Naturforscher','Jutta von Sponheim, Magistra','Judith von Böhmen',
   'Friedrich der Streitbare','Zeremonialaxt des Ahmose','Otto II., Kaiser','Bund der Stämme','Ludwig XIV., der Sonnenkönig','Gesandter aus Massalia']);
 // Bilder: Nur Motive, die zur neuen Person passen, bleiben; die übrigen sind Platzhalter mit Bildidee in MOTIVE.md.
 // Seit 1.21.0 (AP A.1) malt Astra auch diese neu; drei alte Motive sind noch übrig.
 assert.deepEqual(set.filter(c=>!D.missingArt(c)&&!B.cards[c.id]).map(c=>c.id),['khan_2','nostradamus_0','nostradamus_3']);
 const md=fs.readFileSync(path.join(__dirname,'../../ungenutzte_assets/MOTIVE.md'),'utf8');
 for(const c of set.filter(D.missingArt)){const row=md.split('\n').find(r=>r.startsWith('| `'+c.id+'` |'));
  assert.ok(row&&row.includes('| '+c.name+' |'),c.id+': MOTIVE.md veraltet');
  assert.ok(!/Mongol|Viking|Samurai|Japan|Hussite|Kush|Meroe|Shang|Joan|Kamakura|steppe/i.test(row),c.id+': alte Bildidee');}
});

test('Kartentexte nennen nur Helden, die es gibt (AP L.2): keine Karte, kein Spielstein und keine Chronik-Lieblingskarte mit alter Welt',()=>{
 for(const c of Object.values(D.byId))assert.ok(!OLD.test(texts(c))&&!FAR.test(texts(c)),c.id+': '+texts(c));
 // Neutrale Karten aus den Lebenswelten des Lehrplans statt Fantasy (Wirkungen unverändert)
 assert.deepEqual([3,4,15,17,20,27,30,33,34,36].map(i=>D.byId['neutral_'+i].name),
  ['Wilderin','Torwache der Burg','Nachtwächter','Heilkräuter','Ordensritter','Prätorianer','Löwin der Arena','Trojanisches Pferd','Brander','Burgbesatzung']);
 for(const h of D.heroes)for(const id of L.of(h.id).favorites)assert.ok(!FAR.test(D.byId[id].name),h.id+': '+D.byId[id].name);
 // Legendäre der Lehrplan-Helden stehen auf ihrer Chronikseite.
 for(const h of D.replaced.filter(h=>h!=='mandukhai'))assert.ok(JSON.stringify(L.of(h).relations).includes('Legendäre'),h+': Legendäre fehlt in der Chronik');
});
