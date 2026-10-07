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
 pyramid:'the step pyramid of Djoser at Saqqara at golden hour, desert sky',
 // Welle 1 der neuen Helden (AP 5.10)
 perikles_0:'an Athenian trireme rower pulling an oar below deck, sweat and bronze light, coins at his belt',
 perikles_1:'the Long Walls of Athens running from the city to the harbour of Piraeus, massive limestone fortification',
 perikles_2:'Pericles giving the funeral oration on a wooden platform before a crowd of Athenians, cypress coffins',
 perikles_3:'an Athenian strategos in a Corinthian helmet with a scroll of building plans, Acropolis scaffolding behind',
 perikles_4:'the Pnyx hill of Athens with the speaker platform and citizens gathered for the assembly, Acropolis in the distance',
 perikles_5:'Athenian citizens scratching names on pottery shards (ostraka) for an ostracism vote',
 perikles_6:'a Greek trireme with a bronze ram charging through waves at Salamis, oars in perfect rhythm',
 perikles_7:'the plague of Athens, a dim crowded street inside the city walls, a physician bending over the sick, sombre light',
 perikles_8:'the Odeon of Pericles, a great roofed concert hall with many columns at the foot of the Acropolis',
 perikles_9:'Phidias the sculptor on scaffolding before the colossal gold-and-ivory Athena Parthenos statue',
 agrippa_0:'a Roman legionary throwing a pilum, shield raised, dust of the battlefield',
 agrippa_1:'a legionary of the Tenth Legion charging with gladius and red scutum, eagle standard behind',
 agrippa_2:'a Roman legionary camp (castra) with palisade, gate towers and neat rows of tents at dusk',
 agrippa_3:'Roman legionaries in testudo formation, shields locked overhead under a rain of arrows',
 agrippa_4:'a Roman ballista bolt thrower on a wooden platform, engineers loading a heavy bolt',
 agrippa_5:'light Liburnian galleys outmanoeuvring large warships at the battle of Actium, smoke on the sea',
 agrippa_6:'a veteran Roman centurion (primus pilus) with a transverse helmet crest and vine staff, leading a charge',
 agrippa_7:'the Baths of Agrippa in Rome, steaming pools under marble arches, warm light',
 agrippa_8:'the first Pantheon of Agrippa with its portico and the inscription area left blank, Roman crowd',
 agrippa_9:'Vitruvius, Roman architect, with compass and scroll of De architectura, an aqueduct under construction behind',
 amanirenas_0:'a Kushite archer of Ta-Seti, "land of the bow", drawing a long bow, Nile desert behind',
 amanirenas_1:'a Kushite desert rider on a horse raiding a Roman outpost, loot bags, dust',
 amanirenas_2:'a rain of arrows from Kushite archers darkening the sky over the Nile cataract',
 amanirenas_3:'a Kushite spearman from Napata with a leopard-skin shield charging forward',
 amanirenas_4:'a guardian before the Lion Temple of Apedemak at Naqa, lion-headed god relief, poisoned spear',
 amanirenas_5:'a Kushite scout from Meroë hiding among pyramids at night, blowpipe and poison gourd',
 amanirenas_6:'an armoured war elephant of Kush with a howdah of archers, Musawwarat temple behind',
 amanirenas_7:'Kushite warriors storming Syene (Aswan) on the Nile, Roman statues being carried away',
 amanirenas_8:'Akinidad, prince of Kush, in a golden diadem with two swords, Meroitic inscriptions behind',
 amanirenas_9:'the bronze head of Augustus with glass eyes, buried beneath a temple threshold in Meroë',
 anna_0:'a Byzantine copyist nun writing a chronicle by candlelight, gold leaf manuscripts',
 anna_1:'the Pantokrator hospital in Constantinople, physicians tending patients in a vaulted hall',
 anna_2:'a Varangian guardsman with a great Dane axe and round shield in the imperial palace',
 anna_3:'a Byzantine court physician with herbs, a medical codex and a pulse-reading hand',
 anna_4:'Byzantine Greek fire sprayed from a siphon on a dromon onto enemy ships at night',
 anna_5:'a librarian of Constantinople among codices and scroll shelves, domes visible through a window',
 anna_6:'a Byzantine kataphrakt, armoured horseman and horse in scale armour, lance lowered',
 anna_7:'a golden imperial chrysobull with a gold seal hanging from a purple cord, Venetian merchant receiving it',
 anna_8:'Nikephoros Bryennios, Byzantine general and historian, writing beside his armour',
 anna_9:'Emperor Alexios I Komnenos enthroned in purple and gold, Hagia Sophia behind',
 nezahualcoyotl_0:'a gardener in the hillside gardens of Tetzcotzinco, terraces, flowers and water channels',
 nezahualcoyotl_1:'an Aztec eagle warrior in feathered eagle helmet with a macuahuitl',
 nezahualcoyotl_2:'a flower war (xochiyaoyotl), warriors in jaguar and eagle suits clashing among marigolds',
 nezahualcoyotl_3:'an Aztec jaguar warrior in jaguar pelt crouching in the jungle shadows',
 nezahualcoyotl_4:'the stone aqueduct of Chapultepec carrying fresh water toward Tenochtitlan',
 nezahualcoyotl_5:'Nezahualcoyotl’s judges of Texcoco reading laws from a painted codex',
 nezahualcoyotl_6:'a Mesoamerican captain with a towering quetzal-feather headdress raising a healing incense burner',
 nezahualcoyotl_7:'the great dike of Nezahualcoyotl across Lake Texcoco, stakes and stone, canoes alongside',
 nezahualcoyotl_8:'Itzcoatl, ruler of Tenochtitlan, in turquoise diadem before the Templo Mayor',
 nezahualcoyotl_9:'Nezahualpilli, astronomer king of Texcoco, observing the stars from a temple roof',
 masako_0:'a Kamakura gokenin vassal samurai kneeling with bow and banner, loyal and ready',
 masako_1:'a mounted Kamakura archer (yabusame) shooting at full gallop',
 masako_2:'samurai vassals swearing an oath of loyalty before a shrine, swords laid down',
 masako_3:'a Buddhist nun in Kamakura holding prayer beads, soft protective light',
 masako_4:'a Rokuhara spy in dark clothes listening at a Kyoto mansion wall at night',
 masako_5:'the Kamakura army marching west to Kyoto in 1221, banners of the Hojo',
 masako_6:'the Tsurugaoka Hachiman shrine in Kamakura with its great stone steps and ginkgo tree',
 masako_7:'the retired emperor Go-Toba exiled to the windswept Oki islands, a lone boat',
 masako_8:'Hojo Yoshitoki, regent of the shogunate, in armour with a commander’s fan',
 masako_9:'Minamoto no Yoritomo, the first shogun, seated in court robes with a war fan',
 citizen:'an Athenian citizen in a himation holding a voting pebble, agora behind',
 pioneer:'a Roman legion engineer with pickaxe and surveying groma, building a road',
 parthenos:'the colossal gold-and-ivory statue of Athena Parthenos inside the Parthenon, Nike in her hand',
 // Kartenwelle 1 (AP 5.11) mit Zeitalterkarten und Weltwundern (AP 5.5)
 leonidas_10:'one of the three hundred Spartans, bloodied but unbroken, bronze shield raised in the pass of Thermopylae',
 leonidas_11:'the narrow pass of Thermopylae between cliffs and sea, a wall of Spartan shields holding back a vast army',
 hypatia_10:'a woman astronomer of the Museion of Alexandria measuring stars with an armillary sphere at night',
 hypatia_11:'a scroll of Diophantus’ Arithmetica with Hypatia’s commentary, glowing equations above a lamp',
 imhotep_11:'a priestess of the lioness goddess Sekhmet raising her hands in healing, lion statue behind',
 imhotep_12:'an Egyptian ka statue of a seated official in a temple niche, painted limestone, offerings before it',
 dandolo_11:'a Venetian shipwright forging a blade in the Arsenal of Venice, galleys under construction behind',
 dandolo_12:'Venetian crusaders carrying the bronze horses and treasures out of Constantinople in 1204',
 khan_11:'a Mongol ger camp on the steppe at dawn, horses saddled and riders mounting',
 khan_12:'a Mongol kurultai, chieftains gathered in a great white tent around the khan',
 boudicca_11:'a Celtic bard with a lyre chanting a war song before Iceni warriors',
 boudicca_12:'a British scythed war chariot thundering forward, blades on the wheels',
 nostradamus_11:'Nostradamus’ almanac of quatrains open on a desk, candle, quill and star chart',
 nostradamus_12:'a royal horoscope wheel drawn for Queen Catherine de’ Medici, zodiac signs in gold',
 jeanne_10:'a young pilgrim woman from Domrémy walking with a staff and a small banner, village behind',
 jeanne_11:'the coronation of Charles VII in Reims cathedral, Joan of Arc with her banner beside the altar',
 ragnar_12:'a Norse rune mistress carving glowing runes into a standing stone',
 ragnar_13:'a Viking berserker in a frenzy, bear pelt, axe raised, eyes burning',
 musashi_11:'a young swordsman from Kokura practising with two swords in a dojo',
 musashi_12:'the two-sword stance of the Niten Ichi-ryu school, a samurai silhouette against a red sun',
 perikles_10:'a stonemason quarrying white marble on Mount Pentelikon, blocks for the Parthenon',
 perikles_11:'the treasury of the Delian League, chests of silver coins with the Athenian owl',
 agrippa_10:'a Roman aquilifer carrying the golden legionary eagle standard, lion pelt over his helmet',
 agrippa_11:'the harpax, a grappling hook fired from a Roman ship catapult hooking an enemy galley',
 amanirenas_10:'a Kushite arrow maker fletching arrows in Meroë, quivers and bows on the wall',
 amanirenas_11:'a desert viper coiled beside poisoned Kushite arrowheads on a stone',
 anna_10:'a physician of the Pantokrator hospital in Constantinople tending a patient by lamplight',
 anna_11:'a Byzantine court chronicler with a long scroll of history, imperial palace behind',
 nezahualcoyotl_10:'a poet of Texcoco reciting flower songs with a drum, flowers in his hair',
 nezahualcoyotl_11:'chinampas, floating gardens on Lake Texcoco, canals and maize fields',
 masako_10:'a jito estate steward of the Kamakura shogunate inspecting rice fields with a scroll',
 masako_11:'the seal of the Hojo regent (shikken) pressed onto an order, red ink and brush',
 griechen_0:'an Olympic victor with an olive wreath and a palm branch, stadium of Olympia behind',
 griechen_1:'a Greek rhapsode reciting Homer with a staff before listeners',
 griechen_2:'the runner from Marathon arriving exhausted in Athens, arms raised',
 griechen_3:'the Pythia of Delphi on her tripod above the vapours, temple of Apollo',
 griechen_4:'the Pharos lighthouse of Alexandria at night, its great fire shining over the harbour',
 griechen_5:'the Acropolis of Athens with the Parthenon in morning light',
 griechen_6:'the Library of Alexandria, scholars among shelves of scrolls under high columns',
 mittelalter_0:'a medieval squire polishing his knight’s helmet beside a horse',
 mittelalter_1:'a medieval crossbowman spanning his crossbow behind a pavise shield',
 mittelalter_2:'a Benedictine monk of Cluny copying a manuscript in the scriptorium',
 mittelalter_3:'a Hanseatic cog sailing into a harbour with bales of cloth and barrels',
 mittelalter_4:'a jousting knight in a tournament, lance lowered, banners and crowd',
 mittelalter_5:'a stone keep of a medieval castle on a hill, banners on the battlements',
 mittelalter_6:'a medieval trebuchet hurling a stone at a castle wall',
 ostasien_0:'Japanese ashigaru foot soldiers with long spears charging',
 ostasien_1:'a Chinese mandarin scholar official with a scroll in an imperial hall',
 ostasien_2:'a Japanese tea ceremony in a quiet tea house, steam rising from the bowl',
 ostasien_3:'a Korean hwacha firing a volley of rocket arrows from a wooden cart',
 ostasien_4:'the Korean turtle ship of Yi Sun-sin with an iron-spiked roof and dragon head',
 ostasien_5:'rows of the terracotta army of Qin Shi Huang in the pit, warm light',
 ostasien_6:'the Great Wall of China winding over green mountains',
 neutral_47:'the Colosseum of Rome filled with spectators, gladiators in the arena',
 neutral_48:'the Hanging Gardens of Babylon, terraces overflowing with plants and waterfalls',
 neutral_49:'the pyramids of Giza at sunset with the Sphinx, desert sky',
 rider:'a light Mongol rider galloping across the steppe with a short bow',
 terracotta:'a single terracotta warrior from the army of Qin Shi Huang, shield ready'};
// Porträts der Helden ohne Atlasfeld.
const PORTRAIT={
 perikles:'Portrait of Pericles, Athenian statesman, bearded, wearing a Corinthian helmet pushed up on his head, Acropolis behind',
 agrippa:'Portrait of Marcus Vipsanius Agrippa, Roman general, strong brow, naval crown (corona rostrata), Actium fleet behind',
 amanirenas:'Portrait of Amanirenas, Kandake of Kush, one eye scarred, golden diadem with uraei, bow in hand, Meroë pyramids behind',
 anna:'Portrait of Anna Komnene, Byzantine princess and historian, purple and gold robes, holding a codex',
 nezahualcoyotl:'Portrait of Nezahualcoyotl, poet-king of Texcoco, feathered headdress, flower in hand, lake and dike behind',
 masako:'Portrait of Hojo Masako, the nun shogun, in a white Buddhist nun’s hood over dark robes, Kamakura behind'};
const kind=c=>c.building?'Bauwerk':c.type==='spell'?'Zauber':'Diener';
const epoch=hero=>{const h=D.heroes.find(x=>x.id===hero),l=h&&L.of(h.id),age=D.ageById[hero];return l?`${l.epoch}, ${l.place}`:age?age.name:'neutral, any historical epoch';};
const cards=Object.values(D.byId).filter(D.missingArt),heroes=D.heroes.filter(h=>!h.art);
const row=c=>{const prompt=`${START}. ${IDEA[c.id]||`${c.name}: ${c.text||'a soldier'}`}. Epoch: ${epoch(c.hero)}.`;
 return `| \`${c.id}\` | ${c.name} | ${D.heroById[c.hero]?.name||D.eraOf(c)} | ${kind(c)} | 724 × 724 (Atlasfeld 362 × 362) | ${prompt} |`;};
const out=`# Fehlende Motive

*Automatisch erzeugt von \`node werkzeuge/motive.js\` – nicht von Hand ändern.* Bis ein Motiv da ist, zeichnet das Spiel
einen gestalteten Platzhalter (Epochenfarbe, Symbol, „Motiv folgt“; AP 5.12).

**Stand:** ${cards.length} Karten ohne Motiv, ${heroes.length} Helden ohne Porträt.

Ablauf wie in AP 1.2: Konzeptbild als Stilreferenz anhängen, in doppelter Zielgröße erzeugen, Ablage in
\`ungenutzte_assets/karten/<id>.png\`; die nächste Sitzung schneidet zu und baut die Bilder in die Atlanten ein.

| ID | Name | Held | Typ | Größe (px) | Prompt |
|---|---|---|---|---|---|
${cards.map(row).join('\n')}
${heroes.length?`\n## Helden ohne Porträt\n\n| ID | Name | Größe (px) | Prompt |\n|---|---|---|---|\n${heroes.map(h=>`| \`${h.id}\` | ${h.name} | 768 × 768 (Atlasfeld 384 × 384) | ${START}. ${PORTRAIT[h.id]||'Portrait of '+h.name}. Epoch: ${epoch(h.id)}. |`).join('\n')}\n`:''}`;
fs.mkdirSync(path.join(__dirname,'../ungenutzte_assets'),{recursive:true});
fs.writeFileSync(path.join(__dirname,'../ungenutzte_assets/MOTIVE.md'),out);
console.log(`MOTIVE.md: ${cards.length} Karten, ${heroes.length} Helden ohne Motiv.`);
