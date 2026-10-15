# AETERNA – Auftrag an Astra: noch fehlende Kartenbilder

*Erzeugt von `werkzeuge/astra_bilder.py` – nicht von Hand ändern. Grundlage: alle Lieferungen in `ungenutzte_assets/neue_astra_assets/` (Teil 1–6, gerettet, gerettet_2te) und das Produktionsbriefing (`neue_astra_assets/PRODUKTIONSBRIEFING.md`). Jede Karte mit Status steht in `ASTRA_STAND.csv`.*

**Diese Datei ersetzt das alte Produktionsbriefing als Übergabe an die Bild-KI.** Sie enthält nur noch, was wirklich fehlt; alles Gelieferte ist im Spiel eingebaut und darf nicht erneut erzeugt werden.

## 1. Stand

| Status | Karten | Spielsteine | Summe |
|---|---:|---:|---:|
| Eingebaut (im Spiel) | 163 | 3 | **166** |
| Eingebaut, Korrektur nötig | 1 | 0 | **1** |
| Altes Bild bleibt (AP L.6) – nicht erzeugen | 36 | 3 | **39** |
| Im Spiel nie gerufen – nicht erzeugen | 0 | 1 | **1** |
| Neu erzeugen | 159 | 19 | **178** |
| Teil 4 beschädigt – Original suchen, sonst neu | 3 | 3 | **6** |
| Gesperrt – Zuordnung klären | 0 | 0 | **0** |
| **Gesamt** | **362** | **29** | **391** |

Im Spiel: 167 Karten und Spielsteine in 14 Atlanten, alle 22 Heldenporträts, 4 Marmor-Skins, 5 Schlachtfeld-Tische. Lieferformat ist egal (PNG oder WebP): `werkzeuge/astra_bilder.py` erzeugt daraus die WebP-Atlanten des Spiels. Bitte weiter **PNG 1024 × 1024** (oder das native Original) liefern, je Datei genau die ID als Namen, **höchstens 10–12 Bilder je ZIP** – große ZIPs sind mehrfach abgebrochen.

## 2. So gibst du den nächsten Auftrag an eine KI

1. Diese Datei anhängen.
2. Zwei bis vier passende Referenzbilder ergänzen: ein menschliches Motiv, ein Objekt/Bauwerk und optional eine Gruppenszene. Für UI separat eine UI-Referenz verwenden.
3. Gewünschte IDs nennen, z. B. `imhotep_0` bis `imhotep_4`. Nur tatsächlich in Abschnitt 5/6 aufgeführte IDs auswählen.
4. Pro ID genau ein eigenständiges Bild erzeugen; Dateinamen und Status in einer kurzen Lieferliste festhalten.
5. Nach Annahme die ID aus GENERIEREN nach VORHANDEN verschieben. So genügt auch beim nächsten Auftrag die aktualisierte Textdatei mit wenigen Referenzen.

### Kopierfertiger Arbeitsauftrag

```text
Erstelle für AETERNA ausschließlich folgende IDs: [IDs EINTRAGEN].
Verwende dieses Produktionsbriefing als vollständige Motiv- und Dateispezifikation.
Pro ID: genau ein quadratisches, randfüllendes Einzelmotiv, PNG, 1024 × 1024 px,
sRGB/RGB, vollständig deckender Szenenhintergrund. Größere native Originale
zusätzlich erhalten; Größenabweichungen offen nennen. Kein Atlas und keine Collage.

Stil: warmes, handgemaltes historisches Kartenspielbild; malerischer
Semi-Realismus mit leicht vereinfachten Formen, natürlichen Proportionen,
sichtbarer Pinseltextur und feinen dunkelbraunen Konturen. Hauptlicht von oben
rechts. Warme Stein-, Elfenbein-, Holz- und Bronzetöne, gezielte Farbnuancen
nach Gruppe. Ein klares Hauptmotiv, auch bei 128 px sofort erkennbar.

Die beigefügten Bilder bestimmen Pinselcharakter, Detailgrad und Atmosphäre.
Ihre Figuren, Gebäude, Waffen und Ornamente nicht blind in andere Epochen kopieren.
Das konkrete Motiv, seine Epoche und die Abgrenzungen stehen in der jeweiligen
Tabellenzeile und ihrem Gruppenkontext. Der Kartenname wird NICHT ins Bild geschrieben.

Kein Text, keine Zahlen, keine Logos, keine Wasserzeichen, keine Kartenrahmen,
keine UI, keine Wertefelder, keine zusätzlichen Panels. Keine anatomischen Fehler,
keine zusätzlichen Gliedmaßen, keine unverbundenen Waffen oder schwebenden Seile.
Keine ungefragten Varianten oder Neugenerierungen bereits gelieferter Motive.

Melde pro geliefertem Bild: ID, Name, Dateiname, tatsächliche Pixelmaße und Format.
```

### Referenzplätze

- **R1 – Malstil und Licht:** [Beispielbild ergänzen]
- **R2 – Figuren und Materialdetails:** [Beispielbild ergänzen]
- **R3 – Gebäude, Objekte oder Landschaft:** [Beispielbild ergänzen]
- **R4 – UI, nur bei technischen Oberflächenarbeiten:** [optional ergänzen]

Die fünf derzeit beigefügten Mamlukenbilder zeigen warmen malerischen Semi-Realismus und gut lesbare Aktionen. Diese Empfehlung übernimmt ihren Pinselcharakter und die Projektpalette. Die UI darf entsprechend der Stilbibel stärker vereinfacht sein. Referenzen sind keine historische Belegquelle; etwaige spätere Architektur oder überladene Ornamentik daraus nicht übernehmen.

## 3. Gemeinsame Parameter für jedes neue Motiv

| Parameter | Vorgabe |
|---|---|
| Profil K1 – Kartenillustration | Einzelbild, PNG, **1024 × 1024 px**, 1:1, sRGB, RGB/8 Bit, deckender Hintergrund; keine Transparenz. |
| Profil T1 – Tokenillustration | Gleiche Dateivorgaben wie K1. Hauptfigur/-objekt größer und Hintergrund einfacher; ebenfalls vollständige Szene, kein freigestellter Sprite. |
| Master | Wenn nativ z. B. 1536 × 1536 oder größer erzeugt: Original bewahren und saubere 1024-Pixel-Ableitung ausgeben. Keine Qualität durch bloßes Hochskalieren vortäuschen. |
| Komposition | Ein Hauptmotiv beziehungsweise eine klare Hauptaktion. Wichtige Informationen im mittleren Bereich von etwa 70–80 %. An entscheidenden Köpfen, Händen, Waffenenden und Tieren 8–10 % Randreserve anstreben. |
| Lesbarkeit | Bei 128 × 128 px muss Figur, Aktion oder Objekt noch erkennbar sein. Hintergrund weniger kontrastreich und weniger scharf ausarbeiten als den Fokus. |
| Figuren | Natürliche Anatomie; Gesichter, Alter, Geschlecht, Beruf und Pose entsprechend der Zeile. Verschiedene Personen erhalten unterscheidbare Gesichter. Keine automatische Ersetzung durch den Fraktionshelden. |
| Objekte und Gebäude | Titelgebender Gegenstand bzw. Baukörper bleibt Hauptmotiv. Personen höchstens als Maßstab oder für die ausdrücklich verlangte Handlung. |
| Licht | Warmes Hauptlicht von **oben rechts**, kurze/weiche Schatten nach links unten. Bei Nacht Innenlicht, Lampe oder Feuer entsprechend anordnen; keine widersprüchliche Tagessonne hinzufügen. |
| Grundpalette | Stein `#e5ceb1`, Elfenbeinlicht `#fbeccf`, Bronze `#875d3e`, Blattgold `#d6a148`, Kontur `#2e1a0f`. |
| Akzente | Lapis `#44528e`, Oliv `#72582e`, Terrakotta `#b1523f`, Pflanzengrün `#61671d`. Kontextfarben sparsam ergänzen; keine flächige Sepia-Eintönigkeit. |
| Materialwirkung | Leinen matt und faserig, Holz mit nachvollziehbarer Maserung, Stein porös, Metall mit begrenztem warmem Glanz. Keine Plastikoberflächen, Chrom oder Neon. |
| Konturen und Malweise | Dezente dunkelbraune Kanten, weiche gemalte Übergänge, kontrollierte Pinselspuren. Keine dicken schwarzen Comiclinien, keine Fotografie, kein glänzender 3D-Render. |
| Textfreiheit | Keine Titel, Buchstaben, Zahlen, Formeln oder Wasserzeichen. Manuskripte und Pläne nur mit nicht lesbaren grafischen Spuren; keine erfundenen modernen Beschriftungen. |
| Spielmechanik | Heilung, Gunst und andere Effekte als sparsame Licht-/Handlungsallegorie. Keine willkürlichen Magierporträts für abstrakte Karten. |
| Gewalt | Handlung und Spannung zeigen; keine unnötig expliziten Verletzungen. |
| Formatwahrheit | Die Endung muss zum kodierten Dateityp passen. Ein JPEG wird nicht durch Umbenennen zu PNG. |
| Dateiname | Exakt wie in der Liste, kleingeschrieben; keine neuen Zusätze wie „final_final“ und keine Umbenennung der ID. |
| Varianten | Eine sorgfältige Version pro ID; Änderungen an demselben Motiv als Revision verwalten, nicht als zusätzlich fertige ID zählen. |
| Modellparameter | Keine modellübergreifend erfundenen CFG-, Schritt- oder Seed-Werte. Falls verfügbar: hohe Qualität, 1:1, Referenzführung moderat. Für Figurenserien dieselben freigegebenen Referenzen verwenden. |

**Prompt zusammensetzen:** Arbeitsauftrag + K1 oder T1 + Gruppenkontext + konkrete Motivzeile. Alle Bestandteile sind in dieser Datei enthalten. Die nachstehenden Zeilen sind bildfertige Motivbriefs, keine bloßen Titel.

**Historischer Prüfrahmen:** Die Epochen- und Materialregeln stammen aus dem Projekt und den Paketvorgaben; es wurde dafür keine neue historische Quellenprüfung durchgeführt. Konkrete Bauphasen, Porträtähnlichkeiten und technische Details bleiben vor einer historischen Endabnahme prüfbedürftig. Gesichter ohne gesicherte Vorlage sind künstlerische Rekonstruktionen. Ergänzte Kompositionen sind Empfehlungen.

## 4. Alte IDs richtig lesen

Die technischen IDs bleiben wegen bestehender Spielstände erhalten. Der aktuelle Name bestimmt die Bildwelt.

| Technische ID / Präfix | Tatsächlicher Inhalt | Nicht aus dem ID-Namen ableiten |
|---|---|---|
| `khan` | Widukind / Sachsen | Dschingis Khan oder Mongolen |
| `boudicca` | Vercingetorix / Gallien | Boudicca oder britische Icener |
| `nostradamus` | Johann Friedrich Böttger / sächsischer Barock | Nostradamus oder mittelalterlicher Zauberer |
| `jeanne` | Hildegard von Bingen / Klosterwelt | Jeanne d’Arc und französischer Ritterkrieg |
| `ragnar` | Wiprecht von Groitzsch / Mark Meißen | Ragnar und Wikinger |
| `musashi` | Ulrich von Liechtenstein / Steiermark | Samurai |
| `amanirenas` | Ahhotep I. / Theben am Nil | Spätere kuschitische Königin |
| `masako` | Theophanu / Ottonen | Japanische Hof- oder Kriegerwelt |
| `mandukhai` | Thusnelda / Cherusker | Mongolische Reiter |
| `zizka` | Vauban / Frankreich unter Ludwig XIV. | Hussitische Wagenburg |
| `fuhao` | Fürstin von Vix / Hallstattzeit | Shang-China |
| `ostasien_*` | Frühe Neuzeit in Europa | Ostasien |
| `steppe_*` | Frühzeit und Ägypten, je Motiv | Mongolische Steppe |
| `eagle` | Habicht | Adler |
| `terracotta` | Musketier | Terrakottakrieger |
| `wagon` | Schanzkorb | Wagen |
| `taborite` | Füsilier | Hussitischer Kämpfer |
| `immortal` | Medjai-Krieger | Persischer Unsterblicher |
| `totem_*` | Grenzsteine | Fantasy-Totempfähle |


## 5. Kartenillustrationen: 163

Profil **K1**: PNG, 1024 × 1024 px, 1:1, deckend, sRGB; Dateiname `<ID>.png`.


### Fabius Maximus · Römische Republik

**Stil-/Epochenkontext:** Rom und Süditalien im Zweiten Punischen Krieg. Republikanische Ausrüstung mit ovalen Schilden, passenden Helmen, Speeren und Kettenrüstung. Ziegelrot, warmes Leder und Bronze. Keine kaiserzeitliche Segmentrüstung oder spätere Kaiserinsignien.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `fabius_0` | Veles | Revision: Veles trägt zu schwere Rüstung: schlichte Tunika, kleiner leichter Rundschild, Wurfspeere, kein Kettenhemd. | Junger römischer Veles mit leichtem Schild und Wurfspeeren auf einem Hügel. Bewegliche, unbeschwerte Haltung und republikanische Ausrüstung. |
| `fabius_9` | Marcellus, Schwert Roms | neu | Marcellus hebt im Gefecht sein Schwert, römische Soldaten hinter ihm. Heroische Halbfigur mit eigenem Gesicht, kein Agrippa-Porträt übernehmen. |

### Thusnelda · Cherusker

**Stil-/Epochenkontext:** Germanien zwischen Rhein und Weser in der frühen Kaiserzeit. Wolle, Leinen, Fibeln, Speere, Holzschilde und Langhäuser. Waldgrün, Holzbraun und Leinenbeige. Keine Mongolen, Wikingerhörner, Burgen oder Fantasy-Korsetts. Konkrete Ereignisjahre der Einzelmotive gehen vor.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `mandukhai_1` | Hüterin des Herdfeuers | neu | Frau versorgt das Herdfeuer in einem germanischen Langhaus. Ruhige Innenraumszene mit Keramik und Holz; keine Hexendarstellung. |
| `mandukhai_2` | Ruf zum Thing | neu | Krieger stimmen bei einer Versammlung durch Speerschläge auf Schilde zu. Kreisförmige Gruppe unter Bäumen; Versammlung statt Schlacht. |
| `mandukhai_3` | Krieger im Keil | neu | Germanische Krieger greifen in einer Keilformation an. Drei deutliche Vordergrundfiguren, übrige Gruppe reduziert; Rundschilde und Speere. |
| `mandukhai_4` | Varusschlacht | neu | Angriff auf einen römischen Marschzug im nassen Wald, Regen und Schlamm. Unübersichtlichkeit durch Tiefe, nicht durch unlesbares Gewimmel; Jahr 9 als Spielkontext. |
| `mandukhai_5` | Krieger der Sippe | neu | Zwei Krieger derselben Sippe nebeneinander mit Speeren und bemalten Schilden. Familiäre Verbundenheit, unterschiedliche Gesichter; kein einzelner Token. |
| `mandukhai_6` | Heiliger Hain | neu | Alter Eichenhain mit aufgehängten Waffenzeichen. Landschaft und kultischer Ort als Motiv; keine Zauberrunen, die in der Luft leuchten. |
| `mandukhai_7` | Seitenwechsel | neu | Germanischer Auxiliarsoldat legt ein römisches Feldzeichen nieder und wendet sich seinen Stammesangehörigen zu. Seitenwechsel als eindeutige Geste. |
| `mandukhai_8` | Arminius, Fürst der Cherusker | neu | Arminius mit Elementen römischer Offiziersausrüstung und germanischem Mantel vor dunklem Wald. Halbfigur, natürliche Physiognomie; keine Fantasy-Krone. |
| `mandukhai_9` | Bund der Stämme | neu | Anführer mehrerer Stämme schließen am Feuer ein Bündnis durch Handschlag. Hände und Gesichter als Fokus; regionale Unterschiede sparsam darstellen. |

### Zeitalter · Rom und Germanien

**Stil-/Epochenkontext:** Römische Republik beziehungsweise frühe Kaiserzeit passend zum konkreten Motiv. Toga, römische Helme und Schilde; Marmor, Kalkstein, Ziegelrot. Arena, Kurie, Triumph und Straßenbau als unterschiedliche Bildtypen behandeln.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `rom_0` | Gladiator | neu | Römischer Netzgladiator mit Dreizack in der Arena. Netzführung, unbehinderte Silhouette und Sandboden; keine überladene Ganzkörperrüstung. |
| `rom_1` | Senator der Kurie | neu | Senator in Toga spricht in der Kurie vor sitzenden Zuhörern. Redegeste und Gesicht im Fokus; keine Schrift im Hintergrund. |
| `rom_2` | Centurio | neu | Centurio mit Querhelmbusch ermutigt einen Legionär. Zwei Figuren, erkennbare Rangunterschiede und römische Ausrüstung. |
| `rom_3` | Triumphzug | neu | Römischer Triumphzug mit Feldherrn in einer Quadriga. Wagen und Pferde im Vordergrund, Menschenmenge vereinfacht; keine lesbaren Triumphinschriften. |
| `rom_4` | Via Appia | neu | Via Appia mit Steinpflaster, Grabbauten und Zypressen; eine Legion zieht in die Ferne. Fluchtpunkt und Wegstruktur als Hauptmotiv. |
| `rom_5` | Vestalin am ewigen Feuer | neu | Vestalin versorgt das heilige Feuer im Rundtempel. Helles Gewand, ruhige Haltung und Feuerschale; keine Fantasy-Priesterin. |
| `rom_6` | Pax Romana | neu | Ara Pacis als ruhiges Architektur- und Reliefmotiv im warmen Licht. Frieden durch Atmosphäre; keine moderne Museumshülle. |

### Widukind · Sachsen

**Stil-/Epochenkontext:** Sachsenkriege des 8. Jahrhunderts, Westfalen und Weserraum. Wolltunika, Mantel, Sax, Speer, Holzschild; Kettenhemd für wohlhabende Krieger. Gedämpftes Grün, Ocker und Holzbraun. Keine mongolische Kleidung oder Waffen aus dem alten ID-Namen ableiten.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `khan_3` | Reiter der Edelinge | neu | Sächsischer Edeling reitet mit gesenktem Speer einen Waldweg entlang; Kettenhemd und Wollmantel. Pferd und Speerrichtung bilden eine klare Diagonale. |
| `khan_10` | Plünderer am Rhein | neu | Sächsische Plünderer tragen Beute am Rheinufer; entfernt Rauch über einem fränkischen Dorf. Vordergrundgruppe gut lesbar, keine grafische Gewaltdarstellung. |
| `khan_11` | Heerlager an der Weser | neu | Sächsisches Heerlager an der Weser im Morgenlicht; Zelte, Feuer, Pferde und wenige sich rüstende Krieger. Flussbiegung schafft Tiefe. |
| `khan_12` | Versammlung in Marklo | neu | Versammlung von Edelingen und freien Bauern unter großen Eichen bei Marklo. Kreisförmige Gruppe, ein sprechender Mann im Fokus; keine Krönungszeremonie. |

### Theophanu · Ottonen

**Stil-/Epochenkontext:** Ottonisches Reich um 980, bei einzelnen Motiven genauerer Kontext. Byzantinisch beeinflusste Seide, Pergament, Siegel, passende Kirchen- und Pfalzarchitektur. Purpur, Elfenbein und kleines Gold. Keine japanischen Motive oder spätgotischen Formen.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `masako_0` | Lehnsmann | neu | Ottonischer Lehnsmann kniet und legt seine Hände in die Hände seines Herrn. Huldigung als klarer Gestus; schlichter Raum des 10. Jahrhunderts. |
| `masako_1` | Bogenschütze der Pfalz | neu | Bogenschütze auf der Mauer einer ottonischen Pfalz. Wollkleidung und einfacher Bogen, kompakte Architektur; keine gotische Burg. |
| `masako_2` | Treueschwur | neu | Adelige schwören dem jungen Otto III. Treue, Hände bei einem Reliquiar. Kinderkönig und Eidgeste sichtbar, Zeremonie ohne lesbare Urkunde. |
| `masako_3` | Stiftsdame aus Quedlinburg | neu | Stiftsdame aus Quedlinburg hält ein kostbar gebundenes Evangelienbuch. Würdevolle Halbfigur im Innenhof des Stifts; zeitgerechte Stoffe und Kopfbedeckung. |
| `masako_4` | Späher an der Elbe | neu | Späher verbirgt sich im Schilf an der Elbe und beobachtet das andere Ufer. Blickachse über den Fluss; Ausrüstung um 983. |
| `masako_5` | Heerbann | neu | Bewaffnete Gefolgsleute sammeln sich zum Heerbann unter einem Banner. Unterschiedliche, zeitlich stimmige Ausrüstung; keine Uniformarmee. |
| `masako_6` | St. Pantaleon in Köln | neu | St. Pantaleon in Köln mit Schwerpunkt auf dem ottonischen Westwerk. Architekturbild mit kleinen Maßstabsfiguren; keine heutige Ansicht ungeprüft kopieren. |
| `masako_7` | Haft in Utrecht | neu | Heinrich der Zänker sitzt unter Bewachung in Utrecht. Gefangenschaft durch Tür, Wache und Körpersprache zeigen; keine moderne Gefängniszelle. |
| `masako_8` | Willigis, Erzbischof von Mainz | neu | Willigis als Erzbischof mit Pallium und Krummstab neben der Regentin. Er bleibt die Hauptfigur; zeitgerechte Gewandung, kein übergroßer später Mitraaufbau. |
| `masako_9` | Otto II., Kaiser | neu | Otto II. mit zurückhaltenden Kaiserinsignien und kostbarem Hofgewand. Halbfigur mit warmem Goldlicht; kein japanisches Motiv trotz alter ID. |
| `masako_10` | Kanzler der Kaiserin | neu | Kanzler der Kaiserin prüft eine Urkunde mit Feder und Siegel an einem Schreibpult. Arbeitsgestus im Vordergrund, Hofumgebung vereinfacht. |
| `masako_11` | Siegel der Kaiserin | neu | Nahes Stillleben einer prunkvollen ottonischen Urkunde mit Siegel und purpurfarbener Gestaltung. Material, Schnur und Wachssiegel statt lesbarer Buchstaben. |

### Wiprecht von Groitzsch · Mark Meißen

**Stil-/Epochenkontext:** Groitzsch, Pegau und Mark Meißen um 1100. Kettenhemd, Nasalhelm, lange Schilde, Wolltunika, Holzbau und Romanik. Erde, Waldgrün und warmes Steinbeige. Keine Wikinger-Fantasy und keine Vollplattenrüstung.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `ragnar_0` | Siedler aus Franken | neu | Fränkische Siedler treffen mit Ochsenkarren und Werkzeugen an einer Waldlichtung bei der Weißen Elster ein. Familie und Wagen im Vordergrund, neues Land dahinter. |
| `ragnar_1` | Fehde | neu | Bewaffnete Reiter setzen bei einer Fehde um 1100 eine abgelegene Scheune in Brand. Abendlicht, Feuer als Nebenlicht; keine brennenden Menschen. |
| `ragnar_2` | Burgmann von Groitzsch | neu | Burgmann auf der Mauer von Groitzsch mit Kettenhemd, Nasalhelm und langem Schild. Wachsame Dreiviertelfigur, romanische Burganlage im Hintergrund. |
| `ragnar_3` | Lokator | neu | Lokator legt mit Messseil den Grundriss eines neuen Dorfes fest und weist Helfer beim Grenzsteinsetzen an. Weite Arbeitsszene mit nachvollziehbarer Raumordnung. |
| `ragnar_4` | Verhau | neu | Gefällte Bäume versperren einen Waldweg; wenige feindliche Reiter kommen davor zum Halt. Der Verhau selbst ist das große Hauptmotiv. |
| `ragnar_5` | Panzerreiter | neu | Panzerreiter um 1100 im Kettenhemd mit Nasalhelm und langem Schild stürmt mit eingelegter Lanze. Dynamische Seitenansicht; keine Vollplattenrüstung. |
| `ragnar_6` | Rodung | neu | Siedler roden Wald mit Äxten und kontrolliertem Feuer; neue Felder und eine kleine Kirche in der Ferne. Menschliche Arbeit steht im Zentrum. |
| `ragnar_7` | Grenzwächter der Mark | neu | Grenzwächter der Mark Meißen steht mit Speer und Horn neben einem Grenzstein. Wachfeuer im Hintergrund; klarer Figurenumriss vor einer Landschaft. |
| `ragnar_8` | Heerfahrt nach Italien | neu | Ritter Heinrichs IV. ziehen in den 1080er-Jahren über einen Alpenpass Richtung Italien. Tief gestaffelter Zug, Felswände und Weg als Bildführung. |
| `ragnar_9` | Judith von Böhmen | neu | Judith von Böhmen in vornehmem Mantel und zurückhaltendem Stirnreif; Grenzsteine und Landschaft hinter ihr. Würdevolle Halbfigur, keine Märchenkönigin. |
| `ragnar_10` | Böhmischer Söldner | neu | Böhmischer Söldner um 1100 mit Axt, Schild und Beutesack. Abgenutzte Ausrüstung, markantes Gesicht; bodenständige Figur statt Wikingerklischee. |
| `ragnar_11` | Brandschatzung | neu | Soldaten fordern mit Fackeln eine Abgabe von Dorfbewohnern. Angespannte Verhandlung an einem Hoftor; Bedrohung ohne explizite Verletzungen. |
| `ragnar_12` | Feldmesser | neu | Feldmesser arbeitet mit Messstab und geknotetem Seil an Feldgrenzen. Nahsicht auf Werkzeuge und Handgriffe; anders als die Dorfplanung des Lokators. |
| `ragnar_13` | Beuterecht | neu | Ritter beansprucht nach einer Schlacht ein erbeutetes Pferd und abgelegte Waffen. Ruhige Übergabeszene; Beutegegenstände im Vordergrund, kein weiterer Angriff. |

### Ulrich von Liechtenstein · Steiermark

**Stil-/Epochenkontext:** Höfische und turnierbezogene Welt des 13. Jahrhunderts. Kettenrüstung, Topfhelme, Waffenröcke, Turnierlanzen und zeitgerechte Schilde. Warme Textilfarben mit Rot-/Blauakzenten. Keine Samurai oder Rüstung des 15. Jahrhunderts. Venusfahrt ausdrücklich literarisch inszeniert.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `musashi_0` | Edelknabe | neu | Junger Edelknabe im hochmittelalterlichen Gewand hält den großen Helm seines Herrn in einem steirischen Burghof. Schlichte, würdige Dienstszene. |
| `musashi_1` | Lanzenstoß | neu | Turnierlanze trifft einen Schild, Holzsplitter fliegen. Enge Aktionsansicht mit nachvollziehbaren Händen und Lanzenrichtung; kein Blut und kein tödlicher Treffer. |
| `musashi_2` | Fahrender Ritter | neu | Fahrender Ritter mit Topfhelm und farbigem Waffenrock reitet durch die Steiermark. Berglandschaft und einsamer Weg; Reise statt Turnier. |
| `musashi_3` | Minnebrief | neu | Bote überreicht einem Ritter einen mit Wachs versiegelten Minnebrief. Hände, Siegel und Reaktionen im Fokus; keine lesbaren Liebesverse. |
| `musashi_4` | Minneritter | neu | Minneritter mit dem Ärmel seiner Dame als Gunstzeichen am Helm bereitet sich auf ein Turnier vor. Ruhige Halbfigur, Stoffdetail deutlich. |
| `musashi_5` | Mit eingelegter Lanze | neu | Ritter galoppiert mit eingelegter Lanze entlang der Turnierbahn. Voller Bewegungsbogen des Pferdes; vor dem Aufprall, keine Wiederholung von musashi_1. |
| `musashi_6` | Kämpe im Buhurt | neu | Mehrere Ritter kämpfen im Buhurt mit stumpfen Waffen. Zwei klar getrennte Vordergrundfiguren, übriges Getümmel vereinfacht; Kettenrüstung des 13. Jahrhunderts. |
| `musashi_7` | Venusfahrt | neu | Literarisch inszenierte Venusfahrt: Turnierritter in Kettenrüstung mit langem blondem Flechtenhaar und höfischer weiblicher Verkleidung. Reiterszene, keine übernatürliche Venus. |
| `musashi_8` | Landrichter der Steiermark | neu | Landrichter der Steiermark hält unter einer Linde Gericht, Amtsstab in der Hand. Bittsteller und Zeugen rahmen die sitzende Hauptfigur. |
| `musashi_9` | Friedrich der Streitbare | neu | Herzog Friedrich der Streitbare in zeitgerechter Rüstung vor einem Turnierfeld; rot-weiß-rotes Banner als Farbakzent. Eigenständiges Gesicht, keine spätere Plattenrüstung. |
| `musashi_10` | Heimlicher Bote | neu | Heimlicher Bote schiebt nachts einen versiegelten Brief durch ein Burgfenster. Nahes Motiv mit Händen und Fensterrand; warmes Innenlicht oben rechts. |
| `musashi_11` | Ritter aus Murau | neu | Ritter aus Murau mit Schwert und Schild vor dem Murtal. Standhafte Dreiviertelfigur mit Landschaft; keine Turnieraktion. |
| `musashi_12` | Frische Lanze | neu | Knappe reicht einem Ritter eine frische Lanze an der Turnierbahn. Übergabe im Mittelpunkt; zwei klar lesbare Figuren, keine gesplitterte Lanze. |

### Zeitalter · Mittelalter im Reich

**Stil-/Epochenkontext:** Je Motiv ein konsistenter Zeitpunkt ungefähr zwischen 1100 und 1400. Holz, Stein, Wolle, Leinen und passende Metallausrüstung. Warmes Beige, Bronze, gedämpftes Blau/Rot. Spannsystem der Armbrust, Helm und Schiffstyp müssen zur gewählten Zeit passen.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `mittelalter_0` | Knappe | neu | Knappe poliert neben einem Pferd den Helm seines Ritters. Burghof, praktische Kleidung und deutlich sichtbare Handarbeit. |
| `mittelalter_1` | Armbrustschütze | neu | Armbrustschütze spannt seine Armbrust im Schutz einer Pavese. Schrägansicht mit verständlicher Mechanik; Epoche konsequent zum Spannsystem wählen. |
| `mittelalter_2` | Mönch von Cluny | neu | Benediktinermönch von Cluny kopiert eine Handschrift im Skriptorium. Schreibpult, Tageslicht und konzentrierte Haltung; keine lesbaren Textseiten. |
| `mittelalter_3` | Hansekogge | neu | Hansekogge läuft mit Tuchballen und Fässern in einen Hafen ein. Schiffsform und Rahsegel klar, keine spätere Galeone. |
| `mittelalter_4` | Turnierritter | neu | Turnierritter mit gesenkter Lanze vor Tribüne und Fahnen. Gesamtansicht der Turniersituation; nicht die enge Splitteraufnahme musashi_1 wiederholen. |
| `mittelalter_5` | Burgfried | neu | Bergfried einer mittelalterlichen Höhenburg über einem felsigen Hang. Massiger steinerner Turm im Fokus; nicht als gesamte märchenhafte Schlossanlage. |
| `mittelalter_6` | Tribok | neu | Tribok schleudert einen Stein auf eine entfernte Burgmauer. Wurfarm, Gegengewicht und Schleuder räumlich verständlich; keine schwebenden Seile. |

### Anna Komnene · Byzanz

**Stil-/Epochenkontext:** Konstantinopel im 11./12. Jahrhundert; für einzelne Bauwerke deren Kontext beachten. Seide, Codices, Purpur, Gold, Ketten- oder passende Lamellenrüstung. Keine osmanischen Minarette an der Hagia Sophia. Bronze und Purpur sparsam vor warmem Stein.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `anna_0` | Kopistin der Chronik | neu | Byzantinische Kopistin schreibt eine Chronik an einem Lesepult bei warmem Licht. Nonnengewand, Codex und Schreibwerkzeuge; keine lesbaren Textzeilen. |
| `anna_1` | Pantokrator-Spital | neu | Weiter Blick in einen Saal des Pantokrator-Spitals mit mehreren Patienten und Pflegenden. Architektur und organisierte Versorgung als Hauptthema; keine Arzt-Nahaufnahme. |
| `anna_2` | Warägergardist | neu | Warägergardist mit großer Axt und Rundschild im Kaiserpalast. Massige, aber glaubwürdige Silhouette; byzantinische Umgebung, kein gehörntes Wikingerkostüm. |
| `anna_3` | Hofärztin | neu | Hofärztin prüft den Puls einer sitzenden Person; Kräuter und medizinischer Codex auf kleinem Tisch. Weibliche Fachperson eindeutig zeigen. |
| `anna_4` | Griechisches Feuer | neu | Ein byzantinischer Dromon setzt nachts Griechisches Feuer gegen ein entferntes Schiff ein. Siphon und Feuerstrahl visuell verständlich; keine moderne Flammenwerferkonstruktion. |
| `anna_5` | Bibliothekar von Konstantinopel | neu | Bibliothekar ordnet Codices und Schriftrollen, durch ein Fenster sind Kuppeln Konstantinopels sichtbar. Gelehrter in Halbfigur, tiefe Regale dahinter. |
| `anna_6` | Kataphrakt | neu | Kataphrakt mit passendem Pferdeschutz und gesenkter Lanze. Seitliche Dreiviertelansicht, Rüstung und Pferdeanatomie erkennbar; kein spätmittelalterlicher Ritter. |
| `anna_7` | Chrysobull | neu | Kaiserliche Urkunde mit hängendem Goldsiegel an purpurner Schnur wird einem venezianischen Kaufmann überreicht. Siegel als großer Fokus; Schrift unleserlich. |
| `anna_8` | Nikephoros Bryennios | neu | Nikephoros Bryennios schreibt an einem Tisch, Helm und Rüstung liegen daneben. Verbindung von Feldherr und Historiker durch wenige klare Attribute. |
| `anna_9` | Alexios I. Komnenos | neu | Alexios I. Komnenos auf dem Thron in Purpur und Gold; byzantinischer Palast und entfernte Kuppel. Zurückhaltende Insignien, eigenständige Gesichtszüge. |
| `anna_10` | Spitalarzt des Pantokrator | neu | Ein Spitalarzt versorgt einen einzelnen Patienten bei Lampenlicht. Intime Nahansicht mit Arbeitsbewegung; unterscheidbar vom großen Spitalsaal anna_1. |
| `anna_11` | Chronist am Kaiserhof | neu | Chronist am Kaiserhof präsentiert eine lange Schriftrolle im Palast. Stehende Halbfigur und Rollengeste; keine Wiederholung der schreibenden Kopistin. |

### Baibars · Mamluken

**Stil-/Epochenkontext:** Ägypten, Syrien und Palästina im 13. Jahrhundert. Kettenrüstung, passende textile/Lamellenanteile, konische Helme, Lanzen und Kompositbögen. Sandbeige, Lapisblau, Bronze und kleine rote Akzente wie in den Einzelbildern. Keine späteren osmanischen Bauwerke oder Feuerwaffen übernehmen.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `baibars_5` | Vorgetäuschte Flucht | neu | Mamlukenreiter wenden sich während einer vorgetäuschten Flucht zurück zum verfolgenden Gegner. Geschwungene Bewegungsrichtung, mindestens ein sichtbarer Rückblick. |
| `baibars_6` | Qutuz, Sultan von Ägypten | neu | Qutuz in mamlukischer Ausrüstung vor seinem Heer. Ruhige, entschlossene Halbfigur mit Lanze oder Schwert; nicht den Baibars-Heldenkopf kopieren. |
| `baibars_7` | Sturm auf Antiochia | neu | Mamlukische Soldaten stürmen 1268 auf eine Bresche in Antiochias Mauern zu. Infanterie und Mauerdurchbruch im Fokus; nicht erneut das Katapultmotiv. |
| `baibars_8` | Zitadelle von Kairo | neu | Zitadelle von Kairo über der Stadt als Architekturbild. Blick vom Hang, passende mittelalterliche Silhouette; spätere osmanische Bauten nicht aus Referenzen übernehmen. |
| `baibars_9` | Qalawun, Emir der Bahriya | neu | Qalawun führt schwere mamlukische Reiterei. Eigener älterer Gesichtstyp, Lanze und textile Akzente; von Qutuz durch Reiteraktion unterscheiden. |

### Zeitalter · Kreuzzüge

**Stil-/Epochenkontext:** Byzantinischer oder mittelalterlich-islamischer Kontext, je Motiv grob 900–1300. Konstantinopel, Bagdad und Kairo voneinander unterscheiden. Stein, Papier/Pergament, Bronze und zurückhaltende Purpur-/Türkisakzente. Keine osmanischen Minarette im byzantinischen Bild.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `byzanz_0` | Akrit der Grenzmark | neu | Byzantinischer Grenzkrieger mit Speer und Schild im Bergland. Aufmerksame Einzelperson; praktische Ausrüstung und felsige Grenzlandschaft. |
| `byzanz_1` | Gelehrter im Haus der Weisheit | neu | Gelehrte übersetzen Handschriften in Bagdad an einem gemeinsamen Arbeitstisch. Bücher, Schreibgeräte und Austausch; keine moderne Universität. |
| `byzanz_2` | Tribut in Goldbyzantinern | neu | Tribut aus byzantinischen Goldmünzen wird auf einem Tuch abgezählt. Hände und kleine Münzhaufen als Nahmotiv; Prägungen ohne lesbare Schrift. |
| `byzanz_3` | Arzt des Bimaristan | neu | Arzt versorgt einen Patienten im mittelalterlichen Bimaristan, Brunnenhof im Hintergrund. Ruhige Halbfiguren und Keramikgefäße. |
| `byzanz_4` | Theodosianische Mauern | neu | Theodosianische Mauern mit gestaffelten Befestigungslinien und Türmen. Erhöhte Sicht, Mauertiefe gut lesbar; keine osmanische Belagerungsszene. |
| `byzanz_5` | Hagia Sophia | neu | Hagia Sophia im byzantinischen Kontext bei warmem Abendlicht. Kuppel und Baukörper klar lesbar; ohne osmanische Minarette. |
| `byzanz_6` | Ibn an-Nafis, Arzt von Kairo | neu | Ibn an-Nafis studiert einen medizinischen Codex zu Herz und Lunge in Kairo. Gelehrter als Hauptmotiv, schematische unbeschriftete Zeichnungen als Nebendetail. |

### Nezahualcóyotl · Texcoco

**Stil-/Epochenkontext:** Zentralmexiko im 15. Jahrhundert vor der Eroberung; Acolhua-/Nahua-Kontext. Baumwolle, Türkis, Obsidian, Holz und regionale Federkleidung. Warmes Steinbeige mit Türkis und Grün. Keine Pferde, Stahlwaffen, europäischen Kronen, Maya-Architektur oder Plains-Federhauben.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `nezahualcoyotl_0` | Gärtner von Tetzcotzinco | neu | Gärtner pflegt Terrassen, Blumen und Wasserläufe in Tetzcotzinco. Mensch im Vordergrund, Wasserführung und Hangstaffelung gut lesbar. |
| `nezahualcoyotl_1` | Adlerkrieger | neu | Adlerkrieger mit charakteristischem Adlerkopf-Kopfschutz, Baumwollschutz, Schild und Macuahuitl. Klarer Körperumriss; keine europäische Metallrüstung. |
| `nezahualcoyotl_2` | Blumenkrieg | neu | Zwei Krieger im Adler- und Jaguargewand begegnen sich im Blumenkrieg. Kontrollierte Aktionsszene mit regionalen Blumenakzenten; keine Feuerballmagie. |
| `nezahualcoyotl_3` | Jaguarkrieger | neu | Jaguarkrieger kauert aufmerksam im schattigen Unterholz. Jaguargewand als Kleidung, menschliches Gesicht; kein anthropomorphes Raubtier. |
| `nezahualcoyotl_4` | Aquädukt von Chapultepec | neu | Wasserleitung von Chapultepec führt durch die Landschaft Richtung Tenochtitlan. Fokus auf Wasserkanal und Verlauf; keine ungeprüfte römische Bogenbrücke übernehmen. |
| `nezahualcoyotl_5` | Gesetze von Texcoco | neu | Richter von Texcoco beraten über einen aufgeschlagenen Bildcodex. Figurenkreis und bemalte Buchseiten; keine lateinischen Gesetzestexte oder europäischen Perücken. |
| `nezahualcoyotl_6` | Quetzal-Hauptmann | neu | Hauptmann mit regional passendem Quetzalfederschmuck hält eine Räucherschale. Türkis, Baumwolle und grünes Federwerk als Akzente; keine Plains-Federhaube. |
| `nezahualcoyotl_7` | Damm von Nezahualcóyotl | neu | Damm durch den Texcoco-See mit Holz-, Stein- und Erdabschnitten; Kanus verdeutlichen den Maßstab. Erhöhte Perspektive und klare Diagonale. |
| `nezahualcoyotl_8` | Itzcoatl, Herr von Tenochtitlan | neu | Itzcoatl mit Türkisdiadem vor dem Templo Mayor. Würdevolle Halbfigur mit Baumwollmantel; keine europäische Krone oder Maya-Pyramide. |
| `nezahualcoyotl_9` | Nezahualpilli, Sohn des Dichters | neu | Nezahualpilli beobachtet von einem Tempeldach den Sternenhimmel. Schlichte Beobachtung ohne Fernrohr; warmes Lampenlicht und kühler Nachtakzent. |
| `nezahualcoyotl_10` | Dichter von Texcoco | neu | Dichter von Texcoco trägt ein Blumenlied vor, Trommel und einzelne Blüten als Attribute. Ausdrucksvolle, natürliche Sprechgeste; keine Schriftbänder. |
| `nezahualcoyotl_11` | Chinampa | neu | Chinampa-Anbauflächen zwischen Kanälen, Mais und Gemüse, ein Gärtner im Kanu. Fest angelegte Beete im Wasserlandschaftssystem, keine frei treibenden Inseln. |

### Vauban · Frankreich

**Stil-/Epochenkontext:** Frankreich unter Ludwig XIV., spätes 17. Jahrhundert. Lange Röcke, Kniehosen, passende Perücken, historische Musketen, Geschütze, Bastionen, Faschinen und Schanzkörbe. Warmes Steinbeige, zurückhaltendes Blau und Bronze. Keine Hussiten und keine Wagenburg.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `zizka_0` | Schanzarbeiter | neu | Französischer Schanzarbeiter füllt im Belagerungsgraben einen geflochtenen Schanzkorb mit Erde. Naher Arbeitsgestus, Holzschaufel und Flechtwerk sichtbar. |
| `zizka_1` | Grenadier | neu | Grenadier Ludwigs XIV. setzt zum Wurf einer historischen Handgranate an. Historische Ausrüstung und kontrollierte Bewegung; keine moderne Granate. |
| `zizka_2` | Salve von der Bastion | neu | Geschütze feuern von einer Bastion, weißgrauer Pulverdampf zieht über die Brüstung. Architektur und gemeinsamer Feuerstoß, keine einzelnen Schützenporträts. |
| `zizka_3` | Ingenieur des Königs | neu | Königlicher Ingenieur prüft mit Zirkel einen Festungsplan am Grabenrand. Gesicht, Hände und Plan im Fokus; Plan ohne lesbare Beschriftung. |
| `zizka_4` | Festungsgeschütz | neu | Schweres Festungsgeschütz in einer Kasematte wird von Bedienmannschaft geladen. Rohr, Lafette und Raum klar trennen; keine neuzeitliche Stahlkanone. |
| `zizka_5` | Faschinen | neu | Soldaten tragen Reisigbündel zur Befestigung eines Grabens. Große Faschinen und wiederholte Arbeitsbewegung; nicht mit Schanzkörben verwechseln. |
| `zizka_6` | Minengang | neu | Mineure arbeiten bei Kerzenlicht in einem engen Stollen unter einer Bastion. Holzausbau, Werkzeuge und verschlossene Pulverfässer; sachliche Arbeitsszene. |
| `zizka_7` | Zitadelle von Lille | neu | Fünfeckige Zitadelle von Lille aus erhöhter Schrägsicht. Bastionen und Gräben lesbar; zeichnerische Spielillustration, kein präziser Vermessungsplan. |
| `zizka_8` | Louvois, Kriegsminister | neu | Louvois mit Perücke und barockem Amtsgewand am Schreibtisch mit Armeelisten. Verwaltungsarbeit als Motiv; unlesbare Papierflächen. |
| `zizka_9` | Ludwig XIV., der Sonnenkönig | neu | Ludwig XIV. im zeremoniellen Mantel mit Lilienmotiven vor einem angedeuteten Versailles. Würdevolles Herrscherbild mit sparsamen Goldakzenten. |

### Johann Friedrich Böttger · Dresden und Meißen

**Stil-/Epochenkontext:** Sächsischer Barock um 1705–1710. Hemden, Westen, Röcke, Leinenhalstücher; Keramiktiegel, Öfen, frühes Porzellan und Schreibbücher. Elfenbein, Brennofenorange und dunkles Holz. Keine mittelalterlichen Zauberer, Runen oder moderne Labortechnik.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `nostradamus_10` | Eid der Arkanisten | neu | Porzellanarbeiter schwören mit erhobenen Händen vor einem Hofbeamten Verschwiegenheit. Kleine Gruppe in einer Werkstatt; keine mittelalterlichen Magier. |
| `nostradamus_11` | Laborbuch | neu | Offenes Laborbuch von 1708 von oben, Porzellanscherbe auf den Seiten, Versuchsspuren und Arbeitsutensilien. Sachliche Werkbankstudie; vom geheimen Rezeptbuch kompositorisch unterscheiden. |
| `nostradamus_12` | Weißes Gold | neu | Frühes weißes Meißner Porzellangefäß auf dunklem Samtkissen. Ruhiges Objektmotiv, weicher Glanz auf weißer Glasur; keine moderne Marke oder Beschriftung. |

### Zeitalter · Frühe Neuzeit

**Stil-/Epochenkontext:** Europa ungefähr 1450–1720, der konkrete Titel bestimmt Datum und Region. Druckerpresse, Pike, Muskete, Kartaune und Sternfestung passend zum Motiv. Nicht Ostasien darstellen. Warme Stein-/Holztöne mit Stofffarben, weißem Pulverdampf und begrenzten Goldakzenten.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `ostasien_0` | Landsknecht | neu | Landsknecht in geschlitzter bunter Kleidung, Federhut und langer Pike. Dynamische Einzelperson der frühen Neuzeit; keine ostasiatische Rüstung. |
| `ostasien_1` | Buchdrucker aus Mainz | neu | Buchdrucker betätigt eine hölzerne Presse in Mainz; Druckbögen hängen im Hintergrund. Hebel, Drucktisch und Handwerk im Fokus. |
| `ostasien_2` | Leipziger Kaffeehaus | neu | Barockes Leipziger Kaffeehaus mit wenigen Gästen, Zeitungsbögen und dampfendem Kaffee. Gemütliche Gruppenszene; keine lesbaren Zeitungstitel. |
| `ostasien_3` | Kartaunen-Salve | neu | Schwere Kartaunen feuern gemeinsam, dichter Pulverdampf über einer Belagerungsstellung. Geschützrohre und Holzlafetten klar erkennbar. |
| `ostasien_4` | Kriegsgaleone | neu | Spanische Kriegsgaleone feuert eine Breitseite auf dem Atlantik. Schiff in Dreiviertelansicht, Segel und Rauch; keine Dampfschiffe. |
| `ostasien_5` | Stehendes Heer | neu | Uniformierte Musketiere üben auf einem barocken Paradeplatz. Wiederholung klarer Reihen, ein vorderer Soldat als Größenanker. |
| `ostasien_6` | Sternschanze | neu | Sternförmige Festung aus der Vogelperspektive mit Bastionen, Außenwerken und Gräben. Generisches Festungssystem; von der konkreten Zitadelle Lille unterscheiden. |

### Zeitalter · Frühzeit und Ägypten

**Stil-/Epochenkontext:** Diese Gruppe vereint verschiedene Kontexte: Wagenbauer und Bernsteinstraße hallstattzeitlich; Schreiber, Medjai, Streitwagen und Buhen ägyptisch. Kulturen nie innerhalb eines Motivs vermischen. Ägyptische Streitwagen gehören nicht zu Imhoteps Altem Reich. Keine mongolische Steppe.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `steppe_0` | Wagenbauer | neu | Hallstattzeitlicher Wagenbauer setzt einen Eisenreifen auf ein hölzernes Speichenrad. Zeremonialwagen dahinter; Werkzeug und Rad im Fokus, keine Mongolen. |
| `steppe_1` | Schreiber im Lebenshaus | neu | Ägyptischer Schreiber sitzt mit Papyrus und Schreibrohr im Lebenshaus. Regalnischen mit Rollen, schlichtes Leinen; keinerlei lesbare Hieroglyphen verlangen. |
| `steppe_2` | Schuss vom Streitwagen | neu | Ägyptischer Bogenschütze spannt im fahrenden Streitwagen einen Kompositbogen. Nahsicht auf Schütze und Wagen; vom Wagenverband steppe_4 unterscheiden. |
| `steppe_3` | Wache der Medjai | neu | Medjai-Wachen mit Bögen sichern eine Wüstenstraße in Ägypten. Zwei deutlich lesbare Figuren, Felsen und Weg als Hintergrund. |
| `steppe_4` | Angriff der Streitwagen | neu | Mehrere ägyptische Streitwagen greifen in versetzter Reihe an. Formationsbewegung und Staubwolke; anatomisch klare vordere Pferde. |
| `steppe_5` | Bernsteinstraße | neu | Frühkeltischer Handelszug mit Ochsenkarren, Bernstein, Zinn und Amphoren im Waldtal. Waren und Reiseweg im Fokus; keine asiatische Seidenkarawane. |
| `steppe_6` | Festung Buhen | neu | Lehmziegelfestung Buhen am Nil mit Türmen, Mauern und trockenem Graben. Erhöhte Schrägsicht; eigener ägyptischer Kontext statt Hallstattzeit. |

### Neutrale Karten

**Stil-/Epochenkontext:** Jeder Titel erhält eine eigene zusammenhängende historische Welt. Antike für griechisch-römische Motive; Mittelalter für Dorf/Burg; Renaissance/Frühe Neuzeit, wo ausdrücklich passend. Keine Mischrüstung. Tiere natürlich darstellen. Benannte Frauen bleiben Frauen, Berufe bleiben Berufe, Bauwerke und Objekte werden keine Heldenporträts.

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `neutral_6` | Feldheilerin | neu | Feldheilerin verbindet einen sitzenden Soldaten, Leinenapron über Wollkleid. Zuwendung und Hände im Fokus; keine modernen Verbandsverpackungen. |
| `neutral_8` | Wachhund | neu | Kräftiger Haushund bewacht eine mittelalterliche Holztür. Niedrige Perspektive, natürliche Anatomie; keine Panzerung. |
| `neutral_20` | Ordensritter | neu | Ordensritter des 13. Jahrhunderts im Kettenhemd und schlichtem weißem Waffenrock mit kleinem Kreuz. Topfhelm unter dem Arm, keine spätere Plattenrüstung. |
| `neutral_23` | Grabwächter | neu | Lebender Grabwächter trägt eine Lampe an einer antiken mediterranen Grabanlage. Ruhiges Motiv; keine Mumie, kein Untoter. |
| `neutral_27` | Prätorianer | neu | Prätorianer der frühen Kaiserzeit mit römischem Helm, Kettenrüstung und gebogenem Scutum. Wehrhafte Halbfigur; kein mittelalterlicher Ritter. |
| `neutral_33` | Trojanisches Pferd | neu | Trojanisches Pferd als hölzernes Objekt vor einer bronzezeitlich inspirierten Stadtmauer. Legendäre Szene, kleine Maßstabsfiguren; keine archäologische Gewissheit behaupten. |
| `neutral_34` | Brander | neu | Brennendes hölzernes Schiff treibt auf entfernte gegnerische Schiffe zu. Segelbrand und Wasserreflexe; kein modernes Kriegsschiff. |
| `neutral_36` | Burgbesatzung | neu | Burgbesatzung verteidigt eine Steinmauer mit Schilden und Speeren. Mehrere erkennbare Soldaten; keine einzelne Torwache. |
| `neutral_42` | Freibeuterin | neu | Mediterrane Freibeuterin auf einer Galeere mit zeitgerecht schlichtem Schwert und Münzbeutel. Praktische Kleidung, keine modernen Piratenfilm-Accessoires. |
| `neutral_43` | Späherin im Unterholz | neu | Späherin unter grüner Kapuze im Unterholz; Augen und einfacher Bogen sichtbar. Stille Beobachtung, deutlich engere Komposition als Wilderin neutral_3. |
| `neutral_44` | Wandermönch | neu | Wandermönch mit Stab und kleinem Holzkreuz auf einem Weg. Beruhigende Lichtstimmung; kein übernatürlicher Heiligenschein nötig. |
| `neutral_45` | Giftmischerin | neu | Renaissancezeitliche Giftmischerin gießt Flüssigkeit aus einer Phiole in einer Apotheke. Kontrollierte Hände, Keramik und Glas der gewählten Epoche; kein Neontrank. |
| `neutral_46` | Condottiere | neu | Italienischer Condottiere mit zeitgerechter Plattenrüstung und Kommandostab vor Söldnerbannern. Spätmittelalterlicher Kontext ausdrücklich erhalten. |
| `neutral_47` | Kolosseum | neu | Kolosseum mit Zuschauern und kleinen Gladiatoren in der Arena. Architektur und räumliche Weite im Fokus; kein zweites Gladiatorenporträt. |
| `neutral_48` | Hängende Gärten | neu | Hängende Gärten als interpretierte antike Überlieferung: begrünte Terrassen und Wasserläufe. Architektur mit Pflanzenstaffelung, keine gesicherte Rekonstruktion behaupten. |
| `neutral_49` | Pyramiden von Gizeh | neu | Pyramiden von Gizeh mit Sphinx im warmen Abendlicht. Große klare Silhouetten, keine Djoser-Stufenpyramide und keine modernen Touristen. |

### Aus Teil 4 wiederbeschaffen

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `perikles_7` | Pest von Athen | Original aus Teil 4 suchen; nur wenn verloren, neu erzeugen | Pest von Athen: respektvolle Szene von Versorgung und Erschöpfung in einer klassischen athenischen Straße. Eine versorgende Person im Fokus; keine moderne Schutzkleidung und keine expliziten Krankheitsdetails. Profil K1. |
| `perikles_8` | Odeion | Original aus Teil 4 suchen; nur wenn verloren, neu erzeugen | Odeion als athenischer Musik- und Versammlungsbau im Kontext des Perikles; Baukörper und Nutzung erkennbar. Kleine Musiker als Maßstab; keine moderne Bühne. Profil K1. |
| `perikles_9` | Phidias, Meister der Akropolis | Original aus Teil 4 suchen; nur wenn verloren, neu erzeugen | Phidias arbeitet in einer Werkstatt an einer großen Athena-Statue. Bildhauer und Werkzeug im Fokus; vom fertigen Kultbild des Tokens unterscheiden. Klassisches Athen, Profil K1. |

### Alexandria · Spätantike (Entscheidung 19: neu bestellen)

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `hypatia_0` | Bibliothekslehrling | neu | Junger erwachsener männlicher Schüler mit Papyrus in einem bescheidenen alexandrinischen Gelehrtenraum um 400 n. Chr.; Tunika/Himation, keine monumentale intakte ptolemäische Bibliothek. |

### Hinterhalte (AP 5.6)

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `neutral_50` | Krähenfüße | neu | Eiserne Krähenfüße mit vier Spitzen im zertretenen Gras, ein römischer Soldat streut weitere aus einem Lederbeutel, in der Ferne nahen Reiter. |
| `neutral_51` | Abgefangene Botschaft | neu | Römische Futterholer halten auf einer staubigen Straße in Süditalien zwei numidische Reiter an, ein Legionär hält einen versiegelten Brief hoch (207 v. Chr.). |
| `steppe_7` | Falsche Kundschafter von Kadesch | neu | Zwei Beduinen knien vor Ramses II. in seinem Lager und zeigen nach Norden; hinter den Mauern von Kadesch warten verborgen hethitische Streitwagen (um 1274 v. Chr.). |
| `griechen_7` | Botschaft des Sikinnos | neu | Ein griechischer Sklave rudert nachts in einem kleinen Boot auf die persische Flotte zu, Laternen auf den Trieren, die Meerenge von Salamis (480 v. Chr.). |
| `rom_7` | Wall am Kalkrieser Berg | neu | Germanen warten hinter einem langen Wall aus Rasensoden am Fuß eines bewaldeten Bergs; auf dem schmalen Weg am Moor zieht im Regen eine römische Kolonne vorbei (9 n. Chr.). |
| `mittelalter_7` | Fallgatter | neu | Das eisenbeschlagene Fallgatter eines Burgtors saust herab, davor reißen Reiter ihre Pferde zurück. |
| `byzanz_7` | Engpass von Myriokephalon | neu | Seldschukische Bogenreiter greifen von felsigen Hängen eine lange byzantinische Heereskolonne an, der Tross steckt im engen Pass fest (1176). |
| `ostasien_7` | Gegenmine | neu | Verteidiger einer barocken Sternfestung graben bei Kerzenlicht einen Gegenstollen unter dem Wall, einer horcht an der Erdwand, Pulverfässer (um 1700). |
| `khan_13` | Hinterhalt am Süntel | neu | Fränkische Reiter stürmen überhastet einen bewaldeten Berghang hinauf auf das Lager der Sachsen zu, von beiden Seiten brechen Sachsen aus dem Wald (782). |
| `fabius_10` | Rettung bei Gerunium | neu | Der alte Fabius Maximus führt seine Legionen über einen Hügel, um im Tal umzingelte Römer vor den Karthagern zu retten (217 v. Chr.). |
| `anna_12` | Täuschung bei Larissa | neu | Ein byzantinisches Heer steht mit den kaiserlichen Feldzeichen vor den Mauern von Larissa, normannische Ritter stürmen darauf zu (1083). |
| `leonidas_12` | Kampf um den Leichnam | neu | Spartanische Hopliten kämpfen im Engpass der Thermopylen um den Leichnam ihres gefallenen Königs und drängen die Perser zurück (480 v. Chr.). |

## 6. Spielsteine: 22

Profil **T1**: wie K1, Hauptfigur größer, Hintergrund ruhiger; vollständige Szene, kein Freisteller.


### Spielsteine

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `eagle` | Habicht | neu | Habicht mit angezogenen beziehungsweise zum Greifen geöffneten Fängen über einem deutschen Wald. Kurze breite Flügel und langer Schwanz; ausdrücklich kein Adler trotz Dateiname. |
| `totem_fire` | Grenzstein der Mark | neu | Grenzstein der Mark mit einfachem Schwertrelief, kleines Signalfeuer daneben. Hauptstein groß, Umgebung ruhig; keine Figur und kein Totempfahl. |
| `totem_guard` | Grenzstein der Burg | neu | Massiver moosiger Grenzstein mit eingearbeitetem Turmrelief. Frontal-nahe Ansicht, feste breite Silhouette; kein vollständiges Burgpanorama. |
| `totem_strength` | Grenzstein des Dorfes | neu | Dörflicher Grenzstein mit schlichtem Pflugrelief, reifes Feld dahinter. Stein als Hauptmotiv, goldwarme Akzente; kein magisches Runenobjekt. |
| `rider` | Reiter | neu | Ein leichter Reiter mit Speer und Rundschild kommt aus einem Wald. Vereinfachter Hintergrund und zentrale Pferd-Reiter-Silhouette; kein Porträt eines benannten Helden. |
| `chariot` | Streitwagen | neu | Ein leichter ägyptischer Streitwagen mit zwei Pferden und Bogenschützen. Seiten-Dreiviertelansicht, ruhiger Wüstenhintergrund; keine ganze Wagenformation. |
| `terracotta` | Musketier | neu | Ein barocker Musketier im blauen Rock mit Muskete in Wachhaltung. Menschliche Einzelperson, keine Terrakottastatue und kein chinesischer Soldat. |
| `tribesman` | Stammeskrieger | neu | Ein Cherusker mit Speer und kleinem Rundschild vor einem ruhigen Waldrand. Wolle, Leinen und schlichte Fibel; keine mongolische Rüstung. |
| `wagon` | Schanzkorb | neu | Ein großer geflochtener Schanzkorb voller Erde im Belagerungsgraben; Kanone klein im Hintergrund. Objektmotiv mit klarer Flechtstruktur; kein Wagen. |
| `taborite` | Füsilier | neu | Französischer Füsilier des späten 17. Jahrhunderts mit Steinschlossmuskete und passender Ausrüstung. Einzelperson; keine hussitische oder mittelalterliche Darstellung. |
| `mamluk` | Mamlukenreiter | neu | Ein leichter Mamlukenreiter mit Lanze und Rundschild. Ruhige Dreiviertelpose vor schlichtem sandigem Hintergrund; vom aktiven Bogenreiter baibars_3 unterscheiden. |
| `immortal` | Medjai-Krieger | neu | Ein Medjai-Krieger mit Bogen und Hautschild in ägyptischem Kontext. Natürliche menschliche Figur; kein persischer Unsterblicher oder Fantasy-Wesen. |
| `messenian` | Freier Messenier | neu | Freier Messenier mit neuem Speer und Schild vor ruhiger Landschaft. Selbstbewusste Standpose im griechischen Kontext; keine Massenbefreiungsszene. |
| `companion` | Gefährte der Heiligen Schar | neu | Ein Gefährte der Heiligen Schar mit Rundschild in griechischer Hoplitenausrüstung. Einzelperson als Gegenstück zu den zwei Kämpfern epaminondas_4. |
| `twin` | Sippenbruder | neu | Junger germanischer Sippenbruder mit Speer und kleinem Schild. Eigenständiges Gesicht und andere Pose als tribesman; weder Zwillingpaar noch Mongole. |
| `elephant` | Kriegselefant | neu | Ein antiker Kriegselefant in ruhiger Dreiviertelansicht, natürliche Anatomie und einfache Ausrüstung. Keine übergroße Fantasieturm-Panzerung; anders als die bewegte Feldszene neutral_19. |
| `pyramid` | Stufenpyramide | neu | Djosers Stufenpyramide bei Sakkara im warmen Licht, Architektur klar zentral. Keine Figur Djosers, keine Gizeh-Pyramide; vereinfachter, gut lesbarer Hintergrund. |

### Aus Teil 4 wiederbeschaffen

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `pioneer` | Pionier | Original aus Teil 4 suchen; nur wenn verloren, neu erzeugen | Römischer Pionier der späten Republik/frühen Kaiserzeit mit Werkzeug und einfacher Soldatenausrüstung beim Bauen; Einzelperson, warmer Stein und Ziegelrot, Profil T1. |
| `citizen` | Bürger | Original aus Teil 4 suchen; nur wenn verloren, neu erzeugen | Ein athenischer Bürger in schlichtem Chiton/Himation vor ruhiger Stadtkulisse; klare menschliche Halbfigur statt Feldherr. Klassisches Athen, Profil T1. |
| `parthenos` | Athena Parthenos | Original aus Teil 4 suchen; nur wenn verloren, neu erzeugen | Vollendete Athena-Parthenos-Kultstatue im Tempelraum; Elfenbein-/Goldwirkung sparsam, Statue statt lebender Göttin, keine Werkstattaktion. Klassisches Athen, Profil T1. |

### Spielsteine

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `student` | Schüler der Hypatia | neu | Junger Gelehrter in schlichtem Chiton und Mantel um 400 n. Chr., sitzt mit Wachstafel und Griffel, ein Astrolab aus Messing auf dem Tisch, Säulenhalle in Alexandria im Hintergrund. Kein Zauber, kein Leuchten (AP L.5: Hypatias Unterricht). |

### Hinterhalte (AP 5.6)

| ID | Name | Status | Konkretes Motiv und Komposition |
|---|---|---|---|
| `standard` | Träger der Kaiserstandarte | neu | Byzantinischer Fahnenträger im Lamellenpanzer mit hoher kaiserlicher Fahne mit goldenem Kreuz (11. Jh.). |
