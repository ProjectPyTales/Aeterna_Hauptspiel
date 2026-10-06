// Liste der fehlenden Motive (AP 5.12): schreibt ungenutzte_assets/MOTIVE.md mit allen Karten und Helden, für die der
// Renderer heute einen Platzhalter zeichnet – je mit Zielgröße und fertigem Prompt zum Erzeugen in Stapeln.
// Aufruf: node werkzeuge/motive.js   (der Test schluesselwoerter2.test.js prüft, dass die Liste aktuell ist)
const fs=require('node:fs'),path=require('node:path');
const game=path.join(__dirname,'../quellcode/assets/game');
const D=require(path.join(game,'model/data.js')),L=require(path.join(game,'model/lore.js'));

// Gemeinsamer Prompt-Anfang für Kartenmotive – derselbe Stil wie der Prompt-Anfang aus AP 1.2, aber als Bild im Kartenfenster.
const START='Card illustration for a mobile card game, hand-painted stylized fantasy-antique style matching the Aeterna concept art, '+
 'warm golden light, rich detail, clean readable silhouette centred for a round portrait crop, painterly background, no text, no frame';
// Bildidee je Karte (englisch, für die Bild-KI). Fehlt sie, nennt der Prompt Name und Kartentext.
const IDEA={
 dandolo_10:'a masked Venetian spy of the Council of Ten in a dark cloak, half hidden in a canal alley at night, dagger glinting',
 khan_10:'a Mongol tribute collector on horseback with chests of silver and silk, steppe camp behind',
 imhotep_10:'a rearing Egyptian cobra (uraeus) with golden markings among papyrus reeds on the Nile bank',
 boudicca_10:'Roman Londinium burning at night, Iceni warriors with torches silhouetted against the flames',
 nostradamus_10:'a papal bull of excommunication, parchment with a heavy lead seal and red cords on a candlelit desk',
 ragnar_10:'a Viking raider with an axe and a sack of loot on a longship sailing up the Seine, Paris on the horizon',
 ragnar_11:'a lightning bolt striking from a stormy northern sky, Thor’s hammer outlined in the clouds',
 musashi_10:'a shinobi from Iga in dark clothing crouching on a temple roof under the moon',
 neutral_42:'a Mediterranean privateer woman with a cutlass and a coin pouch on the deck of a galley',
 neutral_43:'a scout woman in green hood hiding in dense undergrowth, only her eyes and bow visible',
 neutral_44:'a wandering monk with a staff and a raised wooden cross, calming light around him',
 neutral_45:'a Renaissance poisoner woman pouring a green potion from a phial in an apothecary',
 neutral_46:'an Italian condottiere in plate armour with a commander baton, mercenary banners behind',
 pyramid:'the step pyramid of Djoser at Saqqara at golden hour, desert sky'};
const kind=c=>c.building?'Bauwerk':c.type==='spell'?'Zauber':'Diener';
const epoch=hero=>{const h=D.heroes.find(x=>x.id===hero),l=h&&L.of(h.id);return l?`${l.epoch}, ${l.place}`:'neutral, any historical epoch';};
const cards=Object.values(D.byId).filter(D.missingArt),heroes=D.heroes.filter(h=>!h.art);
const row=c=>{const prompt=`${START}. ${IDEA[c.id]||`${c.name}: ${c.text||'a soldier'}`}. Epoch: ${epoch(c.hero)}.`;
 return `| \`${c.id}\` | ${c.name} | ${c.hero==='neutral'?'Neutral':D.heroes.find(h=>h.id===c.hero).name} | ${kind(c)} | 724 × 724 (Atlasfeld 362 × 362) | ${prompt} |`;};
const out=`# Fehlende Motive

*Automatisch erzeugt von \`node werkzeuge/motive.js\` – nicht von Hand ändern.* Bis ein Motiv da ist, zeichnet das Spiel
einen gestalteten Platzhalter (Epochenfarbe, Symbol, „Motiv folgt“; AP 5.12).

**Stand:** ${cards.length} Karten ohne Motiv, ${heroes.length} Helden ohne Porträt.

Ablauf wie in AP 1.2: Konzeptbild als Stilreferenz anhängen, in doppelter Zielgröße erzeugen, Ablage in
\`ungenutzte_assets/karten/<id>.png\`; die nächste Sitzung schneidet zu und baut die Bilder in die Atlanten ein.

| ID | Name | Held | Typ | Größe (px) | Prompt |
|---|---|---|---|---|---|
${cards.map(row).join('\n')}
${heroes.length?`\n## Helden ohne Porträt\n\n| ID | Name | Größe (px) | Prompt |\n|---|---|---|---|\n${heroes.map(h=>`| \`${h.id}\` | ${h.name} | 768 × 768 (Atlasfeld 384 × 384) | ${START}. Portrait of ${h.name}. Epoch: ${epoch(h.id)}. |`).join('\n')}\n`:''}`;
fs.mkdirSync(path.join(__dirname,'../ungenutzte_assets'),{recursive:true});
fs.writeFileSync(path.join(__dirname,'../ungenutzte_assets/MOTIVE.md'),out);
console.log(`MOTIVE.md: ${cards.length} Karten, ${heroes.length} Helden ohne Motiv.`);
