# AETERNA / Chronicle of Heroes – Produktionsbriefing für fehlende Bildassets

Stand: 9. Oktober 2026 · Grundlage: hochgeladenes Projekt Aeterna 1.20.0, Assetpakete Teil 01, Teil 02, unvollständiger Teil 04, gerettet.zip und fünf Einzelbilder.

**Diese Datei ist die eigenständige Übergabe an eine Bild-KI.** Es sind keine Projektarchive nötig, um die unten freigegebenen Motive zu erstellen. Ergänze lediglich wenige Stilreferenzen. Die KI soll nur ausdrücklich gewählte IDs mit Status **GENERIEREN** bearbeiten. Namen, IDs und Dateipfade unverändert lassen.

## 1. Was tatsächlich noch zu tun ist

| Status | Karten | Tokens | Summe | Handlung |
|---|---:|---:|---:|---|
| GENERIEREN | 239 | 21 | **260** | Neue Einzelmotive nach Abschnitt 5 und 6 erstellen. |
| ZUORDNEN | 5 | 0 | **5** | Fünf beigefügte Bilder passen zu Baibars 0–4; ID-Zuordnung bestätigen, dann korrekt exportieren. Vorher keine Dubletten erzeugen. |
| WIEDERBESCHAFFEN | 3 | 3 | **6** | Laut Teil-04-Manifest bereits erzeugt, im beschädigten Upload fehlen die vollständigen Dateien. Originale bevorzugen. |
| GESPERRT | 2 | 0 | **2** | Alexandria-Zuordnung klären; nicht automatisch generieren. |
| VORHANDEN | 101 | 3 | **104** | Bilddateien in den Paketen vorhanden; gerettete Zuordnungen teilweise vorläufig. |
| **Abgleich mit Spielcode** | **350** | **27** | **377** | Jede aktive Karten-/Token-ID ist genau einer dieser Gruppen zugeordnet. |

Die alte Restliste nach Teil 04 enthält 265 reguläre Aufträge. Davon passen fünf zu den neuen Einzelbildern; dadurch bleiben 260 Produktionsaufträge. Diese fünf Zuordnungen sind inhaltliche Empfehlungen, keine durch ein ursprüngliches ID-Manifest bestätigten Lieferungen. Falls die Bilder ausschließlich Stilbeispiele sein sollen, werden die betreffenden fünf Karten wieder Produktionsaufträge (dann 265 statt 260).

„Fehlend“ meint hier: noch keine neue, passend zugeordnete Illustration in den gelieferten Überarbeitungspaketen. Der Spielcode kann dafür bereits alte Bilder, wiederverwendete Atlaszellen oder Platzhalter anzeigen. Diese alten Darstellungen gelten nicht als fertige neue Lieferung. Die Liste deckt den überprüften Projektstand ab, keine unangekündigten zukünftigen Erweiterungen.

Teil 04 ist abgeschnitten: 24 der 30 Einzelbilder ließen sich mit korrekten Prüfsummen vollständig wiederherstellen; sechs fehlen. Die drei dort beschriebenen Atlanten fehlen ebenfalls in diesem Upload, sind aber nur technische Ableitungen und keine zusätzlichen Motive. Teil 03 wird als UI-/Technikpaket erwähnt, liegt hier jedoch nicht vor; sein Inhalt ist daher nicht abschließend prüfbar.

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

Status ZUORDNEN, WIEDERBESCHAFFEN und GESPERRT nicht als Generierungsauftrag behandeln.
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

## 5. Neu zu erstellen: 239 Kartenillustrationen

**Status aller folgenden Zeilen: GENERIEREN.** Jede Dateizeile ist eine vollständige Einzeldatei nach Profil **K1: PNG, 1024 × 1024 px, 1:1, deckend, sRGB**. Der Dateipfad enthält zugleich die eindeutige ID; z. B. `imhotep_0.png` hat die ID `imhotep_0`. Alle Stilparameter aus Abschnitt 3 gelten zusätzlich zum Gruppenkontext.

### Imhotep · Altes Reich · 8 Motive (erledigt)

**Stil-/Epochenkontext:** Ägypten, 3. Dynastie, um 2650 v. Chr.; Memphis und Sakkara. Leinen, Papyrus, Kupferwerkzeuge, Kalkstein und Holz. Sand, Elfenbein, kleine Lapis- und Lotusakzente. Keine Pferde oder Streitwagen, Eisenrüstung oder Ausstattung des Neuen Reiches.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Nilschülerin | `assets/cards/imhotep_0.png` · K1 | Junge erwachsene Schülerin am Nilufer mit Papyrus und Schreibrohr; schlichtes Leinenkleid, Dorf im Hintergrund. Halbfigur, Hände und Lernmaterial deutlich sichtbar. |
| Heilender Balsam | `assets/cards/imhotep_1.png` · K1 | Alabastergefäß mit Balsam, Leinenbinde, Mörser und Kräuter auf einer Schilfmatte. Nahes Stillleben; keine modernen Medizinflaschen. |
| Pyramidenwächter | `assets/cards/imhotep_2.png` · K1 | Wächter vor der Umfassung der Djoser-Pyramide; Leinenschurz, Holzspeer und einfacher Hautschild. Dreiviertelfigur mit sichtbarer Toranlage; vom Token stoneguard unterscheiden. |
| Tempelärztin | `assets/cards/imhotep_3.png` · K1 | Erwachsene Heilerin verbindet einen sitzenden Patienten in einem schlichten Raum des Alten Reiches. Hände, Leinenverband und fürsorglicher Blick bilden den Fokus. |
| Sonnensegen | `assets/cards/imhotep_4.png` · K1 | Morgensonne fällt auf einen kleinen Opfertisch mit Brot, Lotus und Wasser. Licht als Segenssymbol; keine schwebende Gottheit oder Zaubererfigur. |
| Kobra des Nils | `assets/cards/imhotep_10.png` · K1 | Aufgerichtete ägyptische Kobra zwischen Papyruspflanzen am Nilufer. Bodennaher Blick; natürliche Schuppen mit goldwarmem Licht, keine goldene Metallstatue. |
| Priesterin der Sachmet | `assets/cards/imhotep_11.png` · K1 | Priesterin in schlichtem Leinen mit erhobenen Händen; Löwinnenstatue im Hintergrund deutet Sachmet an. Ruhige Heilungsallegorie, keine phantastische Löwenfrau. |
| Ka-Statue | `assets/cards/imhotep_12.png` · K1 | Bemalte Kalksteinstatue eines sitzenden Beamten in einer Tempelnische, kleine Opfergaben davor. Material und Statuencharakter klar erkennbar; kein lebender Herrscher. |

### Ahhotep I. · Theben am Nil · 12 Motive (erledigt)

**Stil-/Epochenkontext:** Ägypten um 1550 v. Chr., Übergang zur 18. Dynastie. Leinen, Holz-/Hautschilde, Bögen, Bronze, Gold und Fayence. Türkis und Ocker als Akzente. Streitwagen nur beim entsprechenden Motiv. Die ID meint Ahhotep, nicht die spätere kuschitische Amanirenas.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Bogenschütze aus Elkab | `assets/cards/amanirenas_0.png` · K1 | Bogenschütze aus Elkab spannt seinen Bogen vor den Felsen des Niltals. Leinenschurz, funktionale Ausrüstung; Seitenansicht der Schusshaltung. |
| Krieger der Nilflotte | `assets/cards/amanirenas_1.png` · K1 | Thebanische Krieger setzen von einem Nilkriegsschiff auf ein erbeutetes Hyksosschiff über. Schiffsreling und ein klarer Sprung als Fokus, Ladung im Hintergrund. |
| Pfeilregen vor Auaris | `assets/cards/amanirenas_2.png` · K1 | Ägyptische Bogenschützen schießen vor den Mauern von Auaris. Kleine Vordergrundgruppe, gebündelte Pfeilrichtung und Stadtmauer schaffen Tiefe. |
| Speerträger aus Theben | `assets/cards/amanirenas_3.png` · K1 | Thebanischer Speerträger mit Hautschild schreitet entschlossen voran, ägyptische Tempelarchitektur dahinter. Keine monumentalen Anlagen späterer Epochen kopieren. |
| Priester der Selket | `assets/cards/amanirenas_4.png` · K1 | Priester der Selket mit Schutzamulett und einem Skorpion als Attribut. Vorsichtige, ruhige Haltung; keine riesigen Monster und keine moderne Medizin. |
| Medjai-Kundschafter | `assets/cards/amanirenas_5.png` · K1 | Medjai-Kundschafter mit Bogen beobachtet hinter Wüstenfelsen ein entferntes Lager. Gesicht und Auge im Fokus, Tarnung durch Landschaft. |
| Erbeuteter Streitwagen | `assets/cards/amanirenas_6.png` · K1 | Thebanischer Krieger führt einen erbeuteten leichten Streitwagen mit zwei Pferden. Wagenkonstruktion sichtbar; Sandstaub unterstützt die Bewegungsrichtung. |
| Überfall auf Nefrusi | `assets/cards/amanirenas_7.png` · K1 | Thebanische Truppen stürmen im Morgengrauen auf Nefrusi zu. Ein klarer Anführer und eine Stadttorsilhouette; kein überladenes Massengewimmel. |
| Ahmose, Befreier Ägyptens | `assets/cards/amanirenas_8.png` · K1 | Junger Ahmose als ägyptischer Herrscher in einer energischen Streitwagenszene. Zeitgerechte königliche Attribute; keine Ausstattung Kleopatras oder römische Rüstung. |
| Zeremonialaxt des Ahmose | `assets/cards/amanirenas_9.png` · K1 | Zeremonialaxt mit Gold- und Lapiseinlagen als großformatiges Objekt auf schlichtem Leinen. Griff, Blatt und Material getrennt lesbar; Herkunft nicht mit lesbaren Zeichen erklären. |
| Pfeilmacher aus Edfu | `assets/cards/amanirenas_10.png` · K1 | Pfeilmacher aus Edfu befestigt Befiederung und richtet Schäfte auf einer niedrigen Werkbank. Hände und Pfeile als Fokus; Werkzeuge der passenden Epoche. |
| Gift der Hornviper | `assets/cards/amanirenas_11.png` · K1 | Hornviper im Wüstensand, charakteristische Kopfform und zurückhaltender Gifttropfen. Natürliche Tierstudie, keine giftgrüne Fantasy-Schlange. |

### Fürstin von Vix · Hallstattzeit · 10 Motive ( erledigt)

**Stil-/Epochenkontext:** Mont Lassois und Burgund um 500 v. Chr. Wolle, Fibeln, Bronzegefäße, Bernstein, Holz und Flechtwerk. Goldtorques am Hals, nicht als Krone. Ocker, Moosgrün und Bronze. Keine Shang-Kultur und keine spätere keltische Fantasy-Rüstung.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Speerwerfer vom Mont Lassois | `assets/cards/fuhao_0.png` · K1 | Hallstattzeitlicher Speerwerfer vor dem Mont Lassois um 500 v. Chr. Wollgewand und passende Metallteile; kein chinesisches Motiv. |
| Prunkdolch | `assets/cards/fuhao_1.png` · K1 | Hallstattzeitlicher Prunkdolch mit goldverziertem Griff und Scheide auf Leinen. Nahes Objektmotiv, Funktion und Material gut lesbar. |
| Reiter an der Seine | `assets/cards/fuhao_2.png` · K1 | Früher keltischer Reiter am Ufer der oberen Seine. Ruhige Reisepose, zeitgerechtes Zaumzeug; kein mittelalterlicher Turniersattel. |
| Seherin | `assets/cards/fuhao_3.png` · K1 | Seherin beobachtet den Flug von Vögeln unter offenem Himmel. Menschliche Deutungsgeste, kein Zauberstab oder schwebende Prophezeiung. |
| Aufgebot des Fürstensitzes | `assets/cards/fuhao_4.png` · K1 | Krieger sammeln sich am Tor des Fürstensitzes auf dem Mont Lassois. Holz-, Erd- und Flechtwerkstrukturen statt mittelalterlicher Steinburg. |
| Trankopfer | `assets/cards/fuhao_5.png` · K1 | Wein wird aus einer Bronzekanne vor einem kleinen Heiligtum auf die Erde gegossen. Nahansicht von Händen, Gefäß und Flüssigkeitsstrahl. |
| Gelage am Krater | `assets/cards/fuhao_6.png` · K1 | Festgesellschaft um einen großen bronzenen Krater, Wein wird in Schalen ausgeschenkt. Das Gefäß ist der visuelle Mittelpunkt; kein modernes Trinkgeschirr. |
| Schleuderer am Wall | `assets/cards/fuhao_7.png` · K1 | Keltischer Schleuderer auf einem Erdwall schwingt seine Schleuder. Klare Armbewegung und geschlossene Steinbahn, Hallstattkleidung. |
| Halle auf dem Mont Lassois | `assets/cards/fuhao_8.png` · K1 | Große apsidiale Halle auf dem Mont Lassois mit Holz- und Flechtwerkwänden. Architektur in Schrägansicht mit kleinen Maßstabsfiguren; Rekonstruktion. |
| Gesandter aus Massalia | `assets/cards/fuhao_9.png` · K1 | Gesandter aus Massalia präsentiert Bronzegefäße und Weinamphoren vor keltischen Würdenträgern. Begegnung zweier Kulturen ohne ihre Kleidung zu vermischen. |

### Zeitalter · Griechenland und Hellenismus · 4 Motive (erledigt)

**Stil-/Epochenkontext:** Zeit und Ort nach Kartentitel wählen: klassisches Athen oder hellenistisches Alexandria. Heller Stein, Wolle/Leinen, Bronze, Oliv und Blau. Pharos und große Bibliothek nicht in Hypatias spätantike Lebenszeit versetzen. Legenden bleiben gestalterische Überlieferungen.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Marathonläufer | `assets/cards/griechen_2.png` · K1 | Griechischer Bote läuft auf einem staubigen Weg nach Athen. Leichte Tunika, klare Laufbewegung; Illustration der Marathonüberlieferung, keine gesicherte Ereignisrekonstruktion. |
| Leuchtturm von Pharos | `assets/cards/griechen_4.png` · K1 | Leuchtturm von Pharos über dem nächtlichen Hafen, Feuer oben rechts am Turm. Architektur als Hauptmotiv; kein moderner Lichtprojektor. |
| Akropolis | `assets/cards/griechen_5.png` · K1 | Akropolis mit Parthenon im Morgenlicht. Erhöhte Fernsicht, nachvollziehbare Tempelsilhouetten und sparsame Farbfassung; nicht als heutige Ruinenpostkarte. |
| Bibliothek von Alexandria | `assets/cards/griechen_6.png` · K1 | Bibliothek im hellenistischen Alexandria mit Gelehrten und Papyrusrollen. Innenraum mit Säulen; eigenständige frühere Epoche, nicht Hypatias Arbeitszimmer um 400. |

### Epaminondas · Theben in Böotien · 10 Motive (erledigt)

**Stil-/Epochenkontext:** Griechenland des 4. Jahrhunderts v. Chr., Schwerpunkt um 371 v. Chr. Rundschilde, Leinenpanzer und passende Bronzehelme; Ocker, Stein und gedämpftes Blau. Keine spartanischen Lambda-Zeichen auf thebanischen Schilden, keine automatisch übernommene spätere Sarissenphalanx.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Thebanischer Plänkler | `assets/cards/epaminondas_0.png` · K1 | Thebanischer Plänkler wirft einen Wurfspeer vor böotischen Hügeln. Leichte Ausrüstung, gesamte Wurfbewegung erkennbar. |
| Böotischer Hoplit | `assets/cards/epaminondas_1.png` · K1 | Böotischer Hoplit mit Rundschild und dezentem Keulenemblem. Wehrhafte Halbfigur, keine spartanischen Lambda-Zeichen. |
| Fünfzig Schilde tief | `assets/cards/epaminondas_2.png` · K1 | Tiefe thebanische Phalanx am linken Flügel, Schilde und Speere in gestaffelten Reihen. Verdichtung durch Perspektive; nicht fünfzig einzelne Reihen zeichnerisch abzählen. |
| Böotarch | `assets/cards/epaminondas_3.png` · K1 | Böotarch gibt mit ausgestrecktem Speer eine Richtung vor. Griechischer Feldherr in passender Ausrüstung; eigener Gesichtstyp statt kopiertem Heldenporträt. |
| Kämpfer der Heiligen Schar | `assets/cards/epaminondas_4.png` · K1 | Zwei Kämpfer der Heiligen Schar stehen Schulter an Schulter im Gefecht. Beide Gesichter und Schilde lesbar; klar von dem einzelnen Gefährten-Token unterscheiden. |
| Schlacht bei Leuktra | `assets/cards/epaminondas_5.png` · K1 | Thebanischer linker Flügel trifft bei Leuktra auf die spartanische Linie. Überblick mit einem klaren Berührungspunkt beider Formationen. |
| Befreiung Messeniens | `assets/cards/epaminondas_6.png` · K1 | Freigelassene Messenier feiern vor dem Ithome-Gebirge, im Hintergrund neue Befestigungen. Freude und neue Selbstständigkeit ohne moderne Nationalflaggen. |
| Thebanischer Phalangit | `assets/cards/epaminondas_7.png` · K1 | Thebanischer Hoplit stemmt sich hinter seinen Schild gegen ankommende Speere. Enge Abwehrszene; keine hellenistische Sarissenrüstung automatisch übernehmen. |
| Megalopolis | `assets/cards/epaminondas_8.png` · K1 | Megalopolis im Aufbau, Arbeiter und Steinblöcke vor einer entstehenden öffentlichen Anlage. Stadtgründung als Motiv, Bauphasen als gestalterische Rekonstruktion behandeln. |
| Pelopidas, Führer der Heiligen Schar | `assets/cards/epaminondas_9.png` · K1 | Pelopidas führt Elitehopliten im Angriff. Entschlossener Anführer vorn, kompakte Reihe dahinter; andere Pose als Böotarch. |

### Fabius Maximus · Römische Republik · 10 Motive (erledigt)

**Stil-/Epochenkontext:** Rom und Süditalien im Zweiten Punischen Krieg. Republikanische Ausrüstung mit ovalen Schilden, passenden Helmen, Speeren und Kettenrüstung. Ziegelrot, warmes Leder und Bronze. Keine kaiserzeitliche Segmentrüstung oder spätere Kaiserinsignien.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Veles | `assets/cards/fabius_0.png` · K1 | Junger römischer Veles mit leichtem Schild und Wurfspeeren auf einem Hügel. Bewegliche, unbeschwerte Haltung und republikanische Ausrüstung. |
| Triarier | `assets/cards/fabius_1.png` · K1 | Erfahrener Triarier kniet hinter seinem großen Schild und stützt den Speer. Ruhige Abwehrhaltung, gealtertes Gesicht; keine kaiserzeitliche Segmentrüstung. |
| Hinhalten | `assets/cards/fabius_2.png` · K1 | Römische Soldaten beobachten von einer Höhe Hannibals Heer im Tal. Kontrast zwischen wartendem Vordergrund und fernem Gegner; taktische Geduld statt Angriff. |
| Konsul der Republik | `assets/cards/fabius_3.png` · K1 | Konsul in Toga vor der Kurie mit Liktoren und Rutenbündeln. Öffentliche Amtsausübung, keine mittelalterliche Krone. |
| Verbrannte Erde | `assets/cards/fabius_4.png` · K1 | Brennende Felder und geräumte Gehöfte in Kampanien. Landschaft und Rauch im Zentrum; keine brennenden Personen. |
| Späher am Volturnus | `assets/cards/fabius_5.png` · K1 | Römischer Späher kauert im Schilf am Volturnus im Morgenlicht. Halbverdeckte Figur, Spiegelung und Blickrichtung schaffen Spannung. |
| Minucius, der Reiteroberst | `assets/cards/fabius_6.png` · K1 | Minucius führt römische Reiter mit impulsiver Vorwärtsbewegung. Vorderes Pferd und angehobene Waffe bilden den Fokus; republikanische Reitausrüstung. |
| Rückeroberung von Tarent | `assets/cards/fabius_7.png` · K1 | Römische Soldaten erklimmen nachts die Mauer von Tarent. Wenige klare Silhouetten, Fackellicht von rechts; keine moderne Belagerungsleiter. |
| Lager auf den Höhen | `assets/cards/fabius_8.png` · K1 | Befestigtes römisches Lager auf einem Höhenrücken mit Palisade und Wachfeuern. Erhöhte Sicht, geometrisch verständliche Lagerstruktur. |
| Marcellus, Schwert Roms | `assets/cards/fabius_9.png` · K1 | Marcellus hebt im Gefecht sein Schwert, römische Soldaten hinter ihm. Heroische Halbfigur mit eigenem Gesicht, kein Agrippa-Porträt übernehmen. |

### Vercingetorix · Gallien · 4 Motive (erledigt)

**Stil-/Epochenkontext:** Gallien um 52 v. Chr.; Arverner, Gergovia, Alesia. Spätlatènezeitliche Schwerter, lange Schilde, Wolltunika und Hosen, Kettenrüstung für passende Figuren. Waldgrün, Erdbraun und Terrakotta. Keine schottischen Tartans, gehörnten Helme oder mittelalterlichen Burgen.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Commius, Führer des Entsatzheers | `assets/cards/boudicca_9.png` · K1 | Commius führt das gallische Entsatzheer über Hügel Richtung Alesia. Anführer im Vordergrund, nachvollziehbarer Zug von Kriegern dahinter; keine Darstellung Caesars. |
| Zwanzig Städte in Flammen | `assets/cards/boudicca_10.png` · K1 | Mehrere gallische Siedlungen mit Feuern und Rauchsäulen über einer weiten Ebene. Erhöhte Fernsicht vermittelt die Strategie verbrannter Erde; keine mittelalterlichen Städte. |
| Barde der Arverner | `assets/cards/boudicca_11.png` · K1 | Gallischer Barde spielt eine Leier beim Festmahl und besingt seinen Anführer. Halbfigur im warmen Feuerlicht, Zuhörer im weicheren Hintergrund. |
| Gallische Reiterei | `assets/cards/boudicca_12.png` · K1 | Gallische Reiterei greift über offenes Gelände an; römische Gräben und Wälle von Alesia weit hinten. Gruppenbewegung statt eines einzelnen Herrscherporträts. |

### Thusnelda · Cherusker · 10 Motive

**Stil-/Epochenkontext:** Germanien zwischen Rhein und Weser in der frühen Kaiserzeit. Wolle, Leinen, Fibeln, Speere, Holzschilde und Langhäuser. Waldgrün, Holzbraun und Leinenbeige. Keine Mongolen, Wikingerhörner, Burgen oder Fantasy-Korsetts. Konkrete Ereignisjahre der Einzelmotive gehen vor.

| Name                                            | Dateiname und Format                | Konkretes Motiv und Komposition                                                                                                                                     |
| ----------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Botin der Cherusker (nur dieses eine erledigt ) | `assets/cards/mandukhai_0.png` · K1 | Cheruskische Botin läuft mit einem Speer als Kriegszeichen durch den Wald. Praktisches Woll- und Leinengewand, dynamische, natürliche Laufhaltung.                  |
| Hüterin des Herdfeuers                          | `assets/cards/mandukhai_1.png` · K1 | Frau versorgt das Herdfeuer in einem germanischen Langhaus. Ruhige Innenraumszene mit Keramik und Holz; keine Hexendarstellung.                                     |
| Ruf zum Thing                                   | `assets/cards/mandukhai_2.png` · K1 | Krieger stimmen bei einer Versammlung durch Speerschläge auf Schilde zu. Kreisförmige Gruppe unter Bäumen; Versammlung statt Schlacht.                              |
| Krieger im Keil                                 | `assets/cards/mandukhai_3.png` · K1 | Germanische Krieger greifen in einer Keilformation an. Drei deutliche Vordergrundfiguren, übrige Gruppe reduziert; Rundschilde und Speere.                          |
| Varusschlacht                                   | `assets/cards/mandukhai_4.png` · K1 | Angriff auf einen römischen Marschzug im nassen Wald, Regen und Schlamm. Unübersichtlichkeit durch Tiefe, nicht durch unlesbares Gewimmel; Jahr 9 als Spielkontext. |
| Krieger der Sippe                               | `assets/cards/mandukhai_5.png` · K1 | Zwei Krieger derselben Sippe nebeneinander mit Speeren und bemalten Schilden. Familiäre Verbundenheit, unterschiedliche Gesichter; kein einzelner Token.            |
| Heiliger Hain                                   | `assets/cards/mandukhai_6.png` · K1 | Alter Eichenhain mit aufgehängten Waffenzeichen. Landschaft und kultischer Ort als Motiv; keine Zauberrunen, die in der Luft leuchten.                              |
| Seitenwechsel                                   | `assets/cards/mandukhai_7.png` · K1 | Germanischer Auxiliarsoldat legt ein römisches Feldzeichen nieder und wendet sich seinen Stammesangehörigen zu. Seitenwechsel als eindeutige Geste.                 |
| Arminius, Fürst der Cherusker                   | `assets/cards/mandukhai_8.png` · K1 | Arminius mit Elementen römischer Offiziersausrüstung und germanischem Mantel vor dunklem Wald. Halbfigur, natürliche Physiognomie; keine Fantasy-Krone.             |
| Bund der Stämme                                 | `assets/cards/mandukhai_9.png` · K1 | Anführer mehrerer Stämme schließen am Feuer ein Bündnis durch Handschlag. Hände und Gesichter als Fokus; regionale Unterschiede sparsam darstellen.                 |

### Zeitalter · Rom und Germanien · 7 Motive

**Stil-/Epochenkontext:** Römische Republik beziehungsweise frühe Kaiserzeit passend zum konkreten Motiv. Toga, römische Helme und Schilde; Marmor, Kalkstein, Ziegelrot. Arena, Kurie, Triumph und Straßenbau als unterschiedliche Bildtypen behandeln.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Gladiator | `assets/cards/rom_0.png` · K1 | Römischer Netzgladiator mit Dreizack in der Arena. Netzführung, unbehinderte Silhouette und Sandboden; keine überladene Ganzkörperrüstung. |
| Senator der Kurie | `assets/cards/rom_1.png` · K1 | Senator in Toga spricht in der Kurie vor sitzenden Zuhörern. Redegeste und Gesicht im Fokus; keine Schrift im Hintergrund. |
| Centurio | `assets/cards/rom_2.png` · K1 | Centurio mit Querhelmbusch ermutigt einen Legionär. Zwei Figuren, erkennbare Rangunterschiede und römische Ausrüstung. |
| Triumphzug | `assets/cards/rom_3.png` · K1 | Römischer Triumphzug mit Feldherrn in einer Quadriga. Wagen und Pferde im Vordergrund, Menschenmenge vereinfacht; keine lesbaren Triumphinschriften. |
| Via Appia | `assets/cards/rom_4.png` · K1 | Via Appia mit Steinpflaster, Grabbauten und Zypressen; eine Legion zieht in die Ferne. Fluchtpunkt und Wegstruktur als Hauptmotiv. |
| Vestalin am ewigen Feuer | `assets/cards/rom_5.png` · K1 | Vestalin versorgt das heilige Feuer im Rundtempel. Helles Gewand, ruhige Haltung und Feuerschale; keine Fantasy-Priesterin. |
| Pax Romana | `assets/cards/rom_6.png` · K1 | Ara Pacis als ruhiges Architektur- und Reliefmotiv im warmen Licht. Frieden durch Atmosphäre; keine moderne Museumshülle. |

### Widukind · Sachsen · 5 Motive

**Stil-/Epochenkontext:** Sachsenkriege des 8. Jahrhunderts, Westfalen und Weserraum. Wolltunika, Mantel, Sax, Speer, Holzschild; Kettenhemd für wohlhabende Krieger. Gedämpftes Grün, Ocker und Holzbraun. Keine mongolische Kleidung oder Waffen aus dem alten ID-Namen ableiten.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Pfeilschuss | `assets/cards/khan_2.png` · K1 | Sächsischer Bogenschütze lässt einen Pfeil auf ein Holzziel am Buchenwald los. Seitenansicht mit verständlicher Bogenhaltung; einfacher Holzbogen. |
| Reiter der Edelinge | `assets/cards/khan_3.png` · K1 | Sächsischer Edeling reitet mit gesenktem Speer einen Waldweg entlang; Kettenhemd und Wollmantel. Pferd und Speerrichtung bilden eine klare Diagonale. |
| Plünderer am Rhein | `assets/cards/khan_10.png` · K1 | Sächsische Plünderer tragen Beute am Rheinufer; entfernt Rauch über einem fränkischen Dorf. Vordergrundgruppe gut lesbar, keine grafische Gewaltdarstellung. |
| Heerlager an der Weser | `assets/cards/khan_11.png` · K1 | Sächsisches Heerlager an der Weser im Morgenlicht; Zelte, Feuer, Pferde und wenige sich rüstende Krieger. Flussbiegung schafft Tiefe. |
| Versammlung in Marklo | `assets/cards/khan_12.png` · K1 | Versammlung von Edelingen und freien Bauern unter großen Eichen bei Marklo. Kreisförmige Gruppe, ein sprechender Mann im Fokus; keine Krönungszeremonie. |

### Theophanu · Ottonen · 12 Motive

**Stil-/Epochenkontext:** Ottonisches Reich um 980, bei einzelnen Motiven genauerer Kontext. Byzantinisch beeinflusste Seide, Pergament, Siegel, passende Kirchen- und Pfalzarchitektur. Purpur, Elfenbein und kleines Gold. Keine japanischen Motive oder spätgotischen Formen.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Lehnsmann | `assets/cards/masako_0.png` · K1 | Ottonischer Lehnsmann kniet und legt seine Hände in die Hände seines Herrn. Huldigung als klarer Gestus; schlichter Raum des 10. Jahrhunderts. |
| Bogenschütze der Pfalz | `assets/cards/masako_1.png` · K1 | Bogenschütze auf der Mauer einer ottonischen Pfalz. Wollkleidung und einfacher Bogen, kompakte Architektur; keine gotische Burg. |
| Treueschwur | `assets/cards/masako_2.png` · K1 | Adelige schwören dem jungen Otto III. Treue, Hände bei einem Reliquiar. Kinderkönig und Eidgeste sichtbar, Zeremonie ohne lesbare Urkunde. |
| Stiftsdame aus Quedlinburg | `assets/cards/masako_3.png` · K1 | Stiftsdame aus Quedlinburg hält ein kostbar gebundenes Evangelienbuch. Würdevolle Halbfigur im Innenhof des Stifts; zeitgerechte Stoffe und Kopfbedeckung. |
| Späher an der Elbe | `assets/cards/masako_4.png` · K1 | Späher verbirgt sich im Schilf an der Elbe und beobachtet das andere Ufer. Blickachse über den Fluss; Ausrüstung um 983. |
| Heerbann | `assets/cards/masako_5.png` · K1 | Bewaffnete Gefolgsleute sammeln sich zum Heerbann unter einem Banner. Unterschiedliche, zeitlich stimmige Ausrüstung; keine Uniformarmee. |
| St. Pantaleon in Köln | `assets/cards/masako_6.png` · K1 | St. Pantaleon in Köln mit Schwerpunkt auf dem ottonischen Westwerk. Architekturbild mit kleinen Maßstabsfiguren; keine heutige Ansicht ungeprüft kopieren. |
| Haft in Utrecht | `assets/cards/masako_7.png` · K1 | Heinrich der Zänker sitzt unter Bewachung in Utrecht. Gefangenschaft durch Tür, Wache und Körpersprache zeigen; keine moderne Gefängniszelle. |
| Willigis, Erzbischof von Mainz | `assets/cards/masako_8.png` · K1 | Willigis als Erzbischof mit Pallium und Krummstab neben der Regentin. Er bleibt die Hauptfigur; zeitgerechte Gewandung, kein übergroßer später Mitraaufbau. |
| Otto II., Kaiser | `assets/cards/masako_9.png` · K1 | Otto II. mit zurückhaltenden Kaiserinsignien und kostbarem Hofgewand. Halbfigur mit warmem Goldlicht; kein japanisches Motiv trotz alter ID. |
| Kanzler der Kaiserin | `assets/cards/masako_10.png` · K1 | Kanzler der Kaiserin prüft eine Urkunde mit Feder und Siegel an einem Schreibpult. Arbeitsgestus im Vordergrund, Hofumgebung vereinfacht. |
| Siegel der Kaiserin | `assets/cards/masako_11.png` · K1 | Nahes Stillleben einer prunkvollen ottonischen Urkunde mit Siegel und purpurfarbener Gestaltung. Material, Schnur und Wachssiegel statt lesbarer Buchstaben. |

### Wiprecht von Groitzsch · Mark Meißen · 14 Motive

**Stil-/Epochenkontext:** Groitzsch, Pegau und Mark Meißen um 1100. Kettenhemd, Nasalhelm, lange Schilde, Wolltunika, Holzbau und Romanik. Erde, Waldgrün und warmes Steinbeige. Keine Wikinger-Fantasy und keine Vollplattenrüstung.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Siedler aus Franken | `assets/cards/ragnar_0.png` · K1 | Fränkische Siedler treffen mit Ochsenkarren und Werkzeugen an einer Waldlichtung bei der Weißen Elster ein. Familie und Wagen im Vordergrund, neues Land dahinter. |
| Fehde | `assets/cards/ragnar_1.png` · K1 | Bewaffnete Reiter setzen bei einer Fehde um 1100 eine abgelegene Scheune in Brand. Abendlicht, Feuer als Nebenlicht; keine brennenden Menschen. |
| Burgmann von Groitzsch | `assets/cards/ragnar_2.png` · K1 | Burgmann auf der Mauer von Groitzsch mit Kettenhemd, Nasalhelm und langem Schild. Wachsame Dreiviertelfigur, romanische Burganlage im Hintergrund. |
| Lokator | `assets/cards/ragnar_3.png` · K1 | Lokator legt mit Messseil den Grundriss eines neuen Dorfes fest und weist Helfer beim Grenzsteinsetzen an. Weite Arbeitsszene mit nachvollziehbarer Raumordnung. |
| Verhau | `assets/cards/ragnar_4.png` · K1 | Gefällte Bäume versperren einen Waldweg; wenige feindliche Reiter kommen davor zum Halt. Der Verhau selbst ist das große Hauptmotiv. |
| Panzerreiter | `assets/cards/ragnar_5.png` · K1 | Panzerreiter um 1100 im Kettenhemd mit Nasalhelm und langem Schild stürmt mit eingelegter Lanze. Dynamische Seitenansicht; keine Vollplattenrüstung. |
| Rodung | `assets/cards/ragnar_6.png` · K1 | Siedler roden Wald mit Äxten und kontrolliertem Feuer; neue Felder und eine kleine Kirche in der Ferne. Menschliche Arbeit steht im Zentrum. |
| Grenzwächter der Mark | `assets/cards/ragnar_7.png` · K1 | Grenzwächter der Mark Meißen steht mit Speer und Horn neben einem Grenzstein. Wachfeuer im Hintergrund; klarer Figurenumriss vor einer Landschaft. |
| Heerfahrt nach Italien | `assets/cards/ragnar_8.png` · K1 | Ritter Heinrichs IV. ziehen in den 1080er-Jahren über einen Alpenpass Richtung Italien. Tief gestaffelter Zug, Felswände und Weg als Bildführung. |
| Judith von Böhmen | `assets/cards/ragnar_9.png` · K1 | Judith von Böhmen in vornehmem Mantel und zurückhaltendem Stirnreif; Grenzsteine und Landschaft hinter ihr. Würdevolle Halbfigur, keine Märchenkönigin. |
| Böhmischer Söldner | `assets/cards/ragnar_10.png` · K1 | Böhmischer Söldner um 1100 mit Axt, Schild und Beutesack. Abgenutzte Ausrüstung, markantes Gesicht; bodenständige Figur statt Wikingerklischee. |
| Brandschatzung | `assets/cards/ragnar_11.png` · K1 | Soldaten fordern mit Fackeln eine Abgabe von Dorfbewohnern. Angespannte Verhandlung an einem Hoftor; Bedrohung ohne explizite Verletzungen. |
| Feldmesser | `assets/cards/ragnar_12.png` · K1 | Feldmesser arbeitet mit Messstab und geknotetem Seil an Feldgrenzen. Nahsicht auf Werkzeuge und Handgriffe; anders als die Dorfplanung des Lokators. |
| Beuterecht | `assets/cards/ragnar_13.png` · K1 | Ritter beansprucht nach einer Schlacht ein erbeutetes Pferd und abgelegte Waffen. Ruhige Übergabeszene; Beutegegenstände im Vordergrund, kein weiterer Angriff. |

### Ulrich von Liechtenstein · Steiermark · 13 Motive

**Stil-/Epochenkontext:** Höfische und turnierbezogene Welt des 13. Jahrhunderts. Kettenrüstung, Topfhelme, Waffenröcke, Turnierlanzen und zeitgerechte Schilde. Warme Textilfarben mit Rot-/Blauakzenten. Keine Samurai oder Rüstung des 15. Jahrhunderts. Venusfahrt ausdrücklich literarisch inszeniert.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Edelknabe | `assets/cards/musashi_0.png` · K1 | Junger Edelknabe im hochmittelalterlichen Gewand hält den großen Helm seines Herrn in einem steirischen Burghof. Schlichte, würdige Dienstszene. |
| Lanzenstoß | `assets/cards/musashi_1.png` · K1 | Turnierlanze trifft einen Schild, Holzsplitter fliegen. Enge Aktionsansicht mit nachvollziehbaren Händen und Lanzenrichtung; kein Blut und kein tödlicher Treffer. |
| Fahrender Ritter | `assets/cards/musashi_2.png` · K1 | Fahrender Ritter mit Topfhelm und farbigem Waffenrock reitet durch die Steiermark. Berglandschaft und einsamer Weg; Reise statt Turnier. |
| Minnebrief | `assets/cards/musashi_3.png` · K1 | Bote überreicht einem Ritter einen mit Wachs versiegelten Minnebrief. Hände, Siegel und Reaktionen im Fokus; keine lesbaren Liebesverse. |
| Minneritter | `assets/cards/musashi_4.png` · K1 | Minneritter mit dem Ärmel seiner Dame als Gunstzeichen am Helm bereitet sich auf ein Turnier vor. Ruhige Halbfigur, Stoffdetail deutlich. |
| Mit eingelegter Lanze | `assets/cards/musashi_5.png` · K1 | Ritter galoppiert mit eingelegter Lanze entlang der Turnierbahn. Voller Bewegungsbogen des Pferdes; vor dem Aufprall, keine Wiederholung von musashi_1. |
| Kämpe im Buhurt | `assets/cards/musashi_6.png` · K1 | Mehrere Ritter kämpfen im Buhurt mit stumpfen Waffen. Zwei klar getrennte Vordergrundfiguren, übriges Getümmel vereinfacht; Kettenrüstung des 13. Jahrhunderts. |
| Venusfahrt | `assets/cards/musashi_7.png` · K1 | Literarisch inszenierte Venusfahrt: Turnierritter in Kettenrüstung mit langem blondem Flechtenhaar und höfischer weiblicher Verkleidung. Reiterszene, keine übernatürliche Venus. |
| Landrichter der Steiermark | `assets/cards/musashi_8.png` · K1 | Landrichter der Steiermark hält unter einer Linde Gericht, Amtsstab in der Hand. Bittsteller und Zeugen rahmen die sitzende Hauptfigur. |
| Friedrich der Streitbare | `assets/cards/musashi_9.png` · K1 | Herzog Friedrich der Streitbare in zeitgerechter Rüstung vor einem Turnierfeld; rot-weiß-rotes Banner als Farbakzent. Eigenständiges Gesicht, keine spätere Plattenrüstung. |
| Heimlicher Bote | `assets/cards/musashi_10.png` · K1 | Heimlicher Bote schiebt nachts einen versiegelten Brief durch ein Burgfenster. Nahes Motiv mit Händen und Fensterrand; warmes Innenlicht oben rechts. |
| Ritter aus Murau | `assets/cards/musashi_11.png` · K1 | Ritter aus Murau mit Schwert und Schild vor dem Murtal. Standhafte Dreiviertelfigur mit Landschaft; keine Turnieraktion. |
| Frische Lanze | `assets/cards/musashi_12.png` · K1 | Knappe reicht einem Ritter eine frische Lanze an der Turnierbahn. Übergabe im Mittelpunkt; zwei klar lesbare Figuren, keine gesplitterte Lanze. |

### Zeitalter · Mittelalter im Reich · 7 Motive

**Stil-/Epochenkontext:** Je Motiv ein konsistenter Zeitpunkt ungefähr zwischen 1100 und 1400. Holz, Stein, Wolle, Leinen und passende Metallausrüstung. Warmes Beige, Bronze, gedämpftes Blau/Rot. Spannsystem der Armbrust, Helm und Schiffstyp müssen zur gewählten Zeit passen.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Knappe | `assets/cards/mittelalter_0.png` · K1 | Knappe poliert neben einem Pferd den Helm seines Ritters. Burghof, praktische Kleidung und deutlich sichtbare Handarbeit. |
| Armbrustschütze | `assets/cards/mittelalter_1.png` · K1 | Armbrustschütze spannt seine Armbrust im Schutz einer Pavese. Schrägansicht mit verständlicher Mechanik; Epoche konsequent zum Spannsystem wählen. |
| Mönch von Cluny | `assets/cards/mittelalter_2.png` · K1 | Benediktinermönch von Cluny kopiert eine Handschrift im Skriptorium. Schreibpult, Tageslicht und konzentrierte Haltung; keine lesbaren Textseiten. |
| Hansekogge | `assets/cards/mittelalter_3.png` · K1 | Hansekogge läuft mit Tuchballen und Fässern in einen Hafen ein. Schiffsform und Rahsegel klar, keine spätere Galeone. |
| Turnierritter | `assets/cards/mittelalter_4.png` · K1 | Turnierritter mit gesenkter Lanze vor Tribüne und Fahnen. Gesamtansicht der Turniersituation; nicht die enge Splitteraufnahme musashi_1 wiederholen. |
| Burgfried | `assets/cards/mittelalter_5.png` · K1 | Bergfried einer mittelalterlichen Höhenburg über einem felsigen Hang. Massiger steinerner Turm im Fokus; nicht als gesamte märchenhafte Schlossanlage. |
| Tribok | `assets/cards/mittelalter_6.png` · K1 | Tribok schleudert einen Stein auf eine entfernte Burgmauer. Wurfarm, Gegengewicht und Schleuder räumlich verständlich; keine schwebenden Seile. |

### Anna Komnene · Byzanz · 12 Motive

**Stil-/Epochenkontext:** Konstantinopel im 11./12. Jahrhundert; für einzelne Bauwerke deren Kontext beachten. Seide, Codices, Purpur, Gold, Ketten- oder passende Lamellenrüstung. Keine osmanischen Minarette an der Hagia Sophia. Bronze und Purpur sparsam vor warmem Stein.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Kopistin der Chronik | `assets/cards/anna_0.png` · K1 | Byzantinische Kopistin schreibt eine Chronik an einem Lesepult bei warmem Licht. Nonnengewand, Codex und Schreibwerkzeuge; keine lesbaren Textzeilen. |
| Pantokrator-Spital | `assets/cards/anna_1.png` · K1 | Weiter Blick in einen Saal des Pantokrator-Spitals mit mehreren Patienten und Pflegenden. Architektur und organisierte Versorgung als Hauptthema; keine Arzt-Nahaufnahme. |
| Warägergardist | `assets/cards/anna_2.png` · K1 | Warägergardist mit großer Axt und Rundschild im Kaiserpalast. Massige, aber glaubwürdige Silhouette; byzantinische Umgebung, kein gehörntes Wikingerkostüm. |
| Hofärztin | `assets/cards/anna_3.png` · K1 | Hofärztin prüft den Puls einer sitzenden Person; Kräuter und medizinischer Codex auf kleinem Tisch. Weibliche Fachperson eindeutig zeigen. |
| Griechisches Feuer | `assets/cards/anna_4.png` · K1 | Ein byzantinischer Dromon setzt nachts Griechisches Feuer gegen ein entferntes Schiff ein. Siphon und Feuerstrahl visuell verständlich; keine moderne Flammenwerferkonstruktion. |
| Bibliothekar von Konstantinopel | `assets/cards/anna_5.png` · K1 | Bibliothekar ordnet Codices und Schriftrollen, durch ein Fenster sind Kuppeln Konstantinopels sichtbar. Gelehrter in Halbfigur, tiefe Regale dahinter. |
| Kataphrakt | `assets/cards/anna_6.png` · K1 | Kataphrakt mit passendem Pferdeschutz und gesenkter Lanze. Seitliche Dreiviertelansicht, Rüstung und Pferdeanatomie erkennbar; kein spätmittelalterlicher Ritter. |
| Chrysobull | `assets/cards/anna_7.png` · K1 | Kaiserliche Urkunde mit hängendem Goldsiegel an purpurner Schnur wird einem venezianischen Kaufmann überreicht. Siegel als großer Fokus; Schrift unleserlich. |
| Nikephoros Bryennios | `assets/cards/anna_8.png` · K1 | Nikephoros Bryennios schreibt an einem Tisch, Helm und Rüstung liegen daneben. Verbindung von Feldherr und Historiker durch wenige klare Attribute. |
| Alexios I. Komnenos | `assets/cards/anna_9.png` · K1 | Alexios I. Komnenos auf dem Thron in Purpur und Gold; byzantinischer Palast und entfernte Kuppel. Zurückhaltende Insignien, eigenständige Gesichtszüge. |
| Spitalarzt des Pantokrator | `assets/cards/anna_10.png` · K1 | Ein Spitalarzt versorgt einen einzelnen Patienten bei Lampenlicht. Intime Nahansicht mit Arbeitsbewegung; unterscheidbar vom großen Spitalsaal anna_1. |
| Chronist am Kaiserhof | `assets/cards/anna_11.png` · K1 | Chronist am Kaiserhof präsentiert eine lange Schriftrolle im Palast. Stehende Halbfigur und Rollengeste; keine Wiederholung der schreibenden Kopistin. |

### Baibars · Mamluken · 5 Motive

**Stil-/Epochenkontext:** Ägypten, Syrien und Palästina im 13. Jahrhundert. Kettenrüstung, passende textile/Lamellenanteile, konische Helme, Lanzen und Kompositbögen. Sandbeige, Lapisblau, Bronze und kleine rote Akzente wie in den Einzelbildern. Keine späteren osmanischen Bauwerke oder Feuerwaffen übernehmen.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Vorgetäuschte Flucht | `assets/cards/baibars_5.png` · K1 | Mamlukenreiter wenden sich während einer vorgetäuschten Flucht zurück zum verfolgenden Gegner. Geschwungene Bewegungsrichtung, mindestens ein sichtbarer Rückblick. |
| Qutuz, Sultan von Ägypten | `assets/cards/baibars_6.png` · K1 | Qutuz in mamlukischer Ausrüstung vor seinem Heer. Ruhige, entschlossene Halbfigur mit Lanze oder Schwert; nicht den Baibars-Heldenkopf kopieren. |
| Sturm auf Antiochia | `assets/cards/baibars_7.png` · K1 | Mamlukische Soldaten stürmen 1268 auf eine Bresche in Antiochias Mauern zu. Infanterie und Mauerdurchbruch im Fokus; nicht erneut das Katapultmotiv. |
| Zitadelle von Kairo | `assets/cards/baibars_8.png` · K1 | Zitadelle von Kairo über der Stadt als Architekturbild. Blick vom Hang, passende mittelalterliche Silhouette; spätere osmanische Bauten nicht aus Referenzen übernehmen. |
| Qalawun, Emir der Bahriya | `assets/cards/baibars_9.png` · K1 | Qalawun führt schwere mamlukische Reiterei. Eigener älterer Gesichtstyp, Lanze und textile Akzente; von Qutuz durch Reiteraktion unterscheiden. |

### Zeitalter · Kreuzzüge · 7 Motive

**Stil-/Epochenkontext:** Byzantinischer oder mittelalterlich-islamischer Kontext, je Motiv grob 900–1300. Konstantinopel, Bagdad und Kairo voneinander unterscheiden. Stein, Papier/Pergament, Bronze und zurückhaltende Purpur-/Türkisakzente. Keine osmanischen Minarette im byzantinischen Bild.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Akrit der Grenzmark | `assets/cards/byzanz_0.png` · K1 | Byzantinischer Grenzkrieger mit Speer und Schild im Bergland. Aufmerksame Einzelperson; praktische Ausrüstung und felsige Grenzlandschaft. |
| Gelehrter im Haus der Weisheit | `assets/cards/byzanz_1.png` · K1 | Gelehrte übersetzen Handschriften in Bagdad an einem gemeinsamen Arbeitstisch. Bücher, Schreibgeräte und Austausch; keine moderne Universität. |
| Tribut in Goldbyzantinern | `assets/cards/byzanz_2.png` · K1 | Tribut aus byzantinischen Goldmünzen wird auf einem Tuch abgezählt. Hände und kleine Münzhaufen als Nahmotiv; Prägungen ohne lesbare Schrift. |
| Arzt des Bimaristan | `assets/cards/byzanz_3.png` · K1 | Arzt versorgt einen Patienten im mittelalterlichen Bimaristan, Brunnenhof im Hintergrund. Ruhige Halbfiguren und Keramikgefäße. |
| Theodosianische Mauern | `assets/cards/byzanz_4.png` · K1 | Theodosianische Mauern mit gestaffelten Befestigungslinien und Türmen. Erhöhte Sicht, Mauertiefe gut lesbar; keine osmanische Belagerungsszene. |
| Hagia Sophia | `assets/cards/byzanz_5.png` · K1 | Hagia Sophia im byzantinischen Kontext bei warmem Abendlicht. Kuppel und Baukörper klar lesbar; ohne osmanische Minarette. |
| Ibn an-Nafis, Arzt von Kairo | `assets/cards/byzanz_6.png` · K1 | Ibn an-Nafis studiert einen medizinischen Codex zu Herz und Lunge in Kairo. Gelehrter als Hauptmotiv, schematische unbeschriftete Zeichnungen als Nebendetail. |

### Nezahualcóyotl · Texcoco · 12 Motive

**Stil-/Epochenkontext:** Zentralmexiko im 15. Jahrhundert vor der Eroberung; Acolhua-/Nahua-Kontext. Baumwolle, Türkis, Obsidian, Holz und regionale Federkleidung. Warmes Steinbeige mit Türkis und Grün. Keine Pferde, Stahlwaffen, europäischen Kronen, Maya-Architektur oder Plains-Federhauben.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Gärtner von Tetzcotzinco | `assets/cards/nezahualcoyotl_0.png` · K1 | Gärtner pflegt Terrassen, Blumen und Wasserläufe in Tetzcotzinco. Mensch im Vordergrund, Wasserführung und Hangstaffelung gut lesbar. |
| Adlerkrieger | `assets/cards/nezahualcoyotl_1.png` · K1 | Adlerkrieger mit charakteristischem Adlerkopf-Kopfschutz, Baumwollschutz, Schild und Macuahuitl. Klarer Körperumriss; keine europäische Metallrüstung. |
| Blumenkrieg | `assets/cards/nezahualcoyotl_2.png` · K1 | Zwei Krieger im Adler- und Jaguargewand begegnen sich im Blumenkrieg. Kontrollierte Aktionsszene mit regionalen Blumenakzenten; keine Feuerballmagie. |
| Jaguarkrieger | `assets/cards/nezahualcoyotl_3.png` · K1 | Jaguarkrieger kauert aufmerksam im schattigen Unterholz. Jaguargewand als Kleidung, menschliches Gesicht; kein anthropomorphes Raubtier. |
| Aquädukt von Chapultepec | `assets/cards/nezahualcoyotl_4.png` · K1 | Wasserleitung von Chapultepec führt durch die Landschaft Richtung Tenochtitlan. Fokus auf Wasserkanal und Verlauf; keine ungeprüfte römische Bogenbrücke übernehmen. |
| Gesetze von Texcoco | `assets/cards/nezahualcoyotl_5.png` · K1 | Richter von Texcoco beraten über einen aufgeschlagenen Bildcodex. Figurenkreis und bemalte Buchseiten; keine lateinischen Gesetzestexte oder europäischen Perücken. |
| Quetzal-Hauptmann | `assets/cards/nezahualcoyotl_6.png` · K1 | Hauptmann mit regional passendem Quetzalfederschmuck hält eine Räucherschale. Türkis, Baumwolle und grünes Federwerk als Akzente; keine Plains-Federhaube. |
| Damm von Nezahualcóyotl | `assets/cards/nezahualcoyotl_7.png` · K1 | Damm durch den Texcoco-See mit Holz-, Stein- und Erdabschnitten; Kanus verdeutlichen den Maßstab. Erhöhte Perspektive und klare Diagonale. |
| Itzcoatl, Herr von Tenochtitlan | `assets/cards/nezahualcoyotl_8.png` · K1 | Itzcoatl mit Türkisdiadem vor dem Templo Mayor. Würdevolle Halbfigur mit Baumwollmantel; keine europäische Krone oder Maya-Pyramide. |
| Nezahualpilli, Sohn des Dichters | `assets/cards/nezahualcoyotl_9.png` · K1 | Nezahualpilli beobachtet von einem Tempeldach den Sternenhimmel. Schlichte Beobachtung ohne Fernrohr; warmes Lampenlicht und kühler Nachtakzent. |
| Dichter von Texcoco | `assets/cards/nezahualcoyotl_10.png` · K1 | Dichter von Texcoco trägt ein Blumenlied vor, Trommel und einzelne Blüten als Attribute. Ausdrucksvolle, natürliche Sprechgeste; keine Schriftbänder. |
| Chinampa | `assets/cards/nezahualcoyotl_11.png` · K1 | Chinampa-Anbauflächen zwischen Kanälen, Mais und Gemüse, ein Gärtner im Kanu. Fest angelegte Beete im Wasserlandschaftssystem, keine frei treibenden Inseln. |

### Vauban · Frankreich · 10 Motive

**Stil-/Epochenkontext:** Frankreich unter Ludwig XIV., spätes 17. Jahrhundert. Lange Röcke, Kniehosen, passende Perücken, historische Musketen, Geschütze, Bastionen, Faschinen und Schanzkörbe. Warmes Steinbeige, zurückhaltendes Blau und Bronze. Keine Hussiten und keine Wagenburg.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Schanzarbeiter | `assets/cards/zizka_0.png` · K1 | Französischer Schanzarbeiter füllt im Belagerungsgraben einen geflochtenen Schanzkorb mit Erde. Naher Arbeitsgestus, Holzschaufel und Flechtwerk sichtbar. |
| Grenadier | `assets/cards/zizka_1.png` · K1 | Grenadier Ludwigs XIV. setzt zum Wurf einer historischen Handgranate an. Historische Ausrüstung und kontrollierte Bewegung; keine moderne Granate. |
| Salve von der Bastion | `assets/cards/zizka_2.png` · K1 | Geschütze feuern von einer Bastion, weißgrauer Pulverdampf zieht über die Brüstung. Architektur und gemeinsamer Feuerstoß, keine einzelnen Schützenporträts. |
| Ingenieur des Königs | `assets/cards/zizka_3.png` · K1 | Königlicher Ingenieur prüft mit Zirkel einen Festungsplan am Grabenrand. Gesicht, Hände und Plan im Fokus; Plan ohne lesbare Beschriftung. |
| Festungsgeschütz | `assets/cards/zizka_4.png` · K1 | Schweres Festungsgeschütz in einer Kasematte wird von Bedienmannschaft geladen. Rohr, Lafette und Raum klar trennen; keine neuzeitliche Stahlkanone. |
| Faschinen | `assets/cards/zizka_5.png` · K1 | Soldaten tragen Reisigbündel zur Befestigung eines Grabens. Große Faschinen und wiederholte Arbeitsbewegung; nicht mit Schanzkörben verwechseln. |
| Minengang | `assets/cards/zizka_6.png` · K1 | Mineure arbeiten bei Kerzenlicht in einem engen Stollen unter einer Bastion. Holzausbau, Werkzeuge und verschlossene Pulverfässer; sachliche Arbeitsszene. |
| Zitadelle von Lille | `assets/cards/zizka_7.png` · K1 | Fünfeckige Zitadelle von Lille aus erhöhter Schrägsicht. Bastionen und Gräben lesbar; zeichnerische Spielillustration, kein präziser Vermessungsplan. |
| Louvois, Kriegsminister | `assets/cards/zizka_8.png` · K1 | Louvois mit Perücke und barockem Amtsgewand am Schreibtisch mit Armeelisten. Verwaltungsarbeit als Motiv; unlesbare Papierflächen. |
| Ludwig XIV., der Sonnenkönig | `assets/cards/zizka_9.png` · K1 | Ludwig XIV. im zeremoniellen Mantel mit Lilienmotiven vor einem angedeuteten Versailles. Würdevolles Herrscherbild mit sparsamen Goldakzenten. |

### Johann Friedrich Böttger · Dresden und Meißen · 5 Motive

**Stil-/Epochenkontext:** Sächsischer Barock um 1705–1710. Hemden, Westen, Röcke, Leinenhalstücher; Keramiktiegel, Öfen, frühes Porzellan und Schreibbücher. Elfenbein, Brennofenorange und dunkles Holz. Keine mittelalterlichen Zauberer, Runen oder moderne Labortechnik.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Apothekerlehrling | `assets/cards/nostradamus_0.png` · K1 | Junger Apothekerlehrling in Hemd und schlichter Weste zerreibt Kräuter im Keramikmörser, Dresden um 1705. Nahansicht von Gesicht und Arbeitsgeräten. |
| Geheimes Rezeptbuch | `assets/cards/nostradamus_3.png` · K1 | Geheimes Rezeptbuch in schräger Ansicht zwischen Tiegeln und einer kleinen Porzellanprobe; teilweise verdeckte Seiten und Siegel betonen Geheimhaltung. Keine lesbare Schrift. |
| Eid der Arkanisten | `assets/cards/nostradamus_10.png` · K1 | Porzellanarbeiter schwören mit erhobenen Händen vor einem Hofbeamten Verschwiegenheit. Kleine Gruppe in einer Werkstatt; keine mittelalterlichen Magier. |
| Laborbuch | `assets/cards/nostradamus_11.png` · K1 | Offenes Laborbuch von 1708 von oben, Porzellanscherbe auf den Seiten, Versuchsspuren und Arbeitsutensilien. Sachliche Werkbankstudie; vom geheimen Rezeptbuch kompositorisch unterscheiden. |
| Weißes Gold | `assets/cards/nostradamus_12.png` · K1 | Frühes weißes Meißner Porzellangefäß auf dunklem Samtkissen. Ruhiges Objektmotiv, weicher Glanz auf weißer Glasur; keine moderne Marke oder Beschriftung. |

### Zeitalter · Frühe Neuzeit · 7 Motive

**Stil-/Epochenkontext:** Europa ungefähr 1450–1720, der konkrete Titel bestimmt Datum und Region. Druckerpresse, Pike, Muskete, Kartaune und Sternfestung passend zum Motiv. Nicht Ostasien darstellen. Warme Stein-/Holztöne mit Stofffarben, weißem Pulverdampf und begrenzten Goldakzenten.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Landsknecht | `assets/cards/ostasien_0.png` · K1 | Landsknecht in geschlitzter bunter Kleidung, Federhut und langer Pike. Dynamische Einzelperson der frühen Neuzeit; keine ostasiatische Rüstung. |
| Buchdrucker aus Mainz | `assets/cards/ostasien_1.png` · K1 | Buchdrucker betätigt eine hölzerne Presse in Mainz; Druckbögen hängen im Hintergrund. Hebel, Drucktisch und Handwerk im Fokus. |
| Leipziger Kaffeehaus | `assets/cards/ostasien_2.png` · K1 | Barockes Leipziger Kaffeehaus mit wenigen Gästen, Zeitungsbögen und dampfendem Kaffee. Gemütliche Gruppenszene; keine lesbaren Zeitungstitel. |
| Kartaunen-Salve | `assets/cards/ostasien_3.png` · K1 | Schwere Kartaunen feuern gemeinsam, dichter Pulverdampf über einer Belagerungsstellung. Geschützrohre und Holzlafetten klar erkennbar. |
| Kriegsgaleone | `assets/cards/ostasien_4.png` · K1 | Spanische Kriegsgaleone feuert eine Breitseite auf dem Atlantik. Schiff in Dreiviertelansicht, Segel und Rauch; keine Dampfschiffe. |
| Stehendes Heer | `assets/cards/ostasien_5.png` · K1 | Uniformierte Musketiere üben auf einem barocken Paradeplatz. Wiederholung klarer Reihen, ein vorderer Soldat als Größenanker. |
| Sternschanze | `assets/cards/ostasien_6.png` · K1 | Sternförmige Festung aus der Vogelperspektive mit Bastionen, Außenwerken und Gräben. Generisches Festungssystem; von der konkreten Zitadelle Lille unterscheiden. |

### Zeitalter · Frühzeit und Ägypten · 7 Motive

**Stil-/Epochenkontext:** Diese Gruppe vereint verschiedene Kontexte: Wagenbauer und Bernsteinstraße hallstattzeitlich; Schreiber, Medjai, Streitwagen und Buhen ägyptisch. Kulturen nie innerhalb eines Motivs vermischen. Ägyptische Streitwagen gehören nicht zu Imhoteps Altem Reich. Keine mongolische Steppe.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Wagenbauer | `assets/cards/steppe_0.png` · K1 | Hallstattzeitlicher Wagenbauer setzt einen Eisenreifen auf ein hölzernes Speichenrad. Zeremonialwagen dahinter; Werkzeug und Rad im Fokus, keine Mongolen. |
| Schreiber im Lebenshaus | `assets/cards/steppe_1.png` · K1 | Ägyptischer Schreiber sitzt mit Papyrus und Schreibrohr im Lebenshaus. Regalnischen mit Rollen, schlichtes Leinen; keinerlei lesbare Hieroglyphen verlangen. |
| Schuss vom Streitwagen | `assets/cards/steppe_2.png` · K1 | Ägyptischer Bogenschütze spannt im fahrenden Streitwagen einen Kompositbogen. Nahsicht auf Schütze und Wagen; vom Wagenverband steppe_4 unterscheiden. |
| Wache der Medjai | `assets/cards/steppe_3.png` · K1 | Medjai-Wachen mit Bögen sichern eine Wüstenstraße in Ägypten. Zwei deutlich lesbare Figuren, Felsen und Weg als Hintergrund. |
| Angriff der Streitwagen | `assets/cards/steppe_4.png` · K1 | Mehrere ägyptische Streitwagen greifen in versetzter Reihe an. Formationsbewegung und Staubwolke; anatomisch klare vordere Pferde. |
| Bernsteinstraße | `assets/cards/steppe_5.png` · K1 | Frühkeltischer Handelszug mit Ochsenkarren, Bernstein, Zinn und Amphoren im Waldtal. Waren und Reiseweg im Fokus; keine asiatische Seidenkarawane. |
| Festung Buhen | `assets/cards/steppe_6.png` · K1 | Lehmziegelfestung Buhen am Nil mit Türmen, Mauern und trockenem Graben. Erhöhte Schrägsicht; eigener ägyptischer Kontext statt Hallstattzeit. |

### Neutrale Karten · 48 Motive

**Stil-/Epochenkontext:** Jeder Titel erhält eine eigene zusammenhängende historische Welt. Antike für griechisch-römische Motive; Mittelalter für Dorf/Burg; Renaissance/Frühe Neuzeit, wo ausdrücklich passend. Keine Mischrüstung. Tiere natürlich darstellen. Benannte Frauen bleiben Frauen, Berufe bleiben Berufe, Bauwerke und Objekte werden keine Heldenporträts.

| Name | Dateiname und Format | Konkretes Motiv und Komposition |
|---|---|---|
| Dorfwache | `assets/cards/neutral_0.png` · K1 | Dorfwächter um 1200 mit Speer und einfachem Holzschild am Holztor. Wolltunika, ruhige Standpose; bescheidene Ausrüstung. |
| Wandernder Händler | `assets/cards/neutral_1.png` · K1 | Wandernder Händler führt einen kleinen Packesel mit Tuch und Keramik einen Dorfweg entlang. Freundliches Reisebild, Ware eindeutig lesbar. |
| Steinschleuderer | `assets/cards/neutral_2.png` · K1 | Antiker mediterraner Schleuderer holt mit Lederschleuder aus, Steinbeutel am Gürtel. Leinentunika und felsiger Boden; nachvollziehbare Handhaltung. |
| Wilderin | `assets/cards/neutral_3.png` · K1 | Erwachsene Wilderin kauert mit schlichtem Jagdbogen im Wald. Praktisches geschlossenes Wollgewand; unauffällige Jagdszene statt Fantasy-Assassinin. |
| Torwache der Burg | `assets/cards/neutral_4.png` · K1 | Torwache in Kettenhemd und Nasalhelm mit Speer vor einem steinernen Burgtor um 1200. Stärker gerüstet als Dorfwache neutral_0. |
| Kavallerist | `assets/cards/neutral_5.png` · K1 | Berittener Krieger um 1150 mit Speer, Kettenhemd und langem Schild. Seitliche Reise- oder Wachpose; keine Vollplattenrüstung. |
| Feldheilerin | `assets/cards/neutral_6.png` · K1 | Feldheilerin verbindet einen sitzenden Soldaten, Leinenapron über Wollkleid. Zuwendung und Hände im Fokus; keine modernen Verbandsverpackungen. |
| Archivarin | `assets/cards/neutral_7.png` · K1 | Reife Archivarin hält einen geschlossenen Codex vor Handschriftenregalen. Schlichtes Gewand, Wissensarbeit statt Magie. |
| Wachhund | `assets/cards/neutral_8.png` · K1 | Kräftiger Haushund bewacht eine mittelalterliche Holztür. Niedrige Perspektive, natürliche Anatomie; keine Panzerung. |
| Veteran | `assets/cards/neutral_9.png` · K1 | Älterer Veteran mit grauem Bart, abgenutztem Kettenhemd und Schild. Ruhige würdevolle Halbfigur, sichtbare Gebrauchsspuren. |
| Belagerungsturm | `assets/cards/neutral_10.png` · K1 | Hölzerner Belagerungsturm auf großen Rädern nähert sich einer Steinmauer. Rohhautverkleidung, stabile Balken; Gerät als Hauptmotiv. |
| Schmied | `assets/cards/neutral_11.png` · K1 | Schmied in Hemd und Lederschürze bearbeitet glühendes Eisen am Amboss. Hammerbewegung und Werkstück klar, Funken sparsam. |
| Wüstenspäherin | `assets/cards/neutral_12.png` · K1 | Nordafrikanische Wüstenspäherin in geschlossenen Leinen- und Wolltüchern mit Sandalen und Speer. Wüstenlandschaft, praktische Reiseausstattung. |
| Gebirgswache | `assets/cards/neutral_13.png` · K1 | Gebirgswache mit Wollmantel über Kettenhemd und Speer an einem Alpenpass. Standhafte Silhouette vor Fels und weitem Himmel. |
| Verwegener Bote | `assets/cards/neutral_14.png` · K1 | Verwegener Bote reitet auf kleinem Pferd über einen unebenen Weg; versiegelter Brief am Sattel. Tempo durch Körperhaltung, kein Adelsprunk. |
| Nachtwächter | `assets/cards/neutral_15.png` · K1 | Nachtwächter mit einfacher Laterne und Stab zwischen Fachwerkhäusern. Warmes Licht oben rechts an der Figur, lesbare Umgebung trotz Nacht. |
| Versorgung | `assets/cards/neutral_16.png` · K1 | Feldversorgung mit Getreidesäcken, Brot, Tonkrügen und Wolldecken beim Abladen eines Holzkarrens. Güter vorn, kleine Helfer dahinter. |
| Heilkräuter | `assets/cards/neutral_17.png` · K1 | Heilkräuter, Mörser, Leinentuch und Keramikschale auf einem Holztisch. Nahes Stillleben, natürliche Pflanzenformen und keine Etiketten. |
| Wurfmesser | `assets/cards/neutral_18.png` · K1 | Drei einfache eiserne Wurfmesser mit Holzgriffen auf dunklem Leder. Sachliche Objektstudie; keine übergroßen Zacken oder Fantasy-Klingen. |
| Kriegselefant | `assets/cards/neutral_19.png` · K1 | Karthagischer Kriegselefant mit einfacher Ausrüstung und Reiter auf einem antiken Schlachtfeld. Größere Umgebung und Bewegung; Token elephant erhält eigene ruhige Komposition. |
| Ordensritter | `assets/cards/neutral_20.png` · K1 | Ordensritter des 13. Jahrhunderts im Kettenhemd und schlichtem weißem Waffenrock mit kleinem Kreuz. Topfhelm unter dem Arm, keine spätere Plattenrüstung. |
| Söldnerhauptmann | `assets/cards/neutral_21.png` · K1 | Erfahrener spätmittelalterlicher Söldnerhauptmann sammelt seine Leute. Gepolstertes Gewand, zeitgerechte Rüstung und deutliche Führungsgeste. |
| Adler der Berge | `assets/cards/neutral_22.png` · K1 | Steinadler gleitet über europäische Berggipfel. Flügelspannweite und natürliche Federn im Fokus; kein Feuer- oder Magievogel. |
| Grabwächter | `assets/cards/neutral_23.png` · K1 | Lebender Grabwächter trägt eine Lampe an einer antiken mediterranen Grabanlage. Ruhiges Motiv; keine Mumie, kein Untoter. |
| Sammelruf | `assets/cards/neutral_24.png` · K1 | Zwei antike Speerträger folgen einem Hornruf und sammeln sich unter einem schlichten Banner. Reaktion und Zusammenkommen statt übernatürlicher Beschwörung. |
| Feldration | `assets/cards/neutral_25.png` · K1 | Brot, Bohnen, Käse und eine keramische Wasserflasche auf Leinentuch im Feldlager. Essensstillleben in Nahsicht; keine Versorgungskarren. |
| Bogenmeisterin | `assets/cards/neutral_26.png` · K1 | Erfahrene Bogenmeisterin zieht einen einfachen Langbogen. Geschlossene Wollkleidung, Ledergürtel und Köcher; sicherer Stand und stimmige Hände. |
| Prätorianer | `assets/cards/neutral_27.png` · K1 | Prätorianer der frühen Kaiserzeit mit römischem Helm, Kettenrüstung und gebogenem Scutum. Wehrhafte Halbfigur; kein mittelalterlicher Ritter. |
| Silberner Bannerträger | `assets/cards/neutral_28.png` · K1 | Bannerträger mit hell silbrigem Stoffbanner, Kettenhemd und schlichtem Waffenrock. Stoff statt Metallflagge; keine erfundene konkrete Königswappen-Zuordnung. |
| Flammenkrug | `assets/cards/neutral_29.png` · K1 | Keramischer Brandtopf mit kleinem Feuer und Rauch am Docht auf einer Belagerungsplattform. Objekt als Fokus, keine moderne Handgranate. |
| Löwin der Arena | `assets/cards/neutral_30.png` · K1 | Löwin in einer römischen Arena, kraftvolle natürliche Körperhaltung. Sand und niedrige Tribünenstaffelung; keine Rüstung oder menschlichen Züge. |
| Seidenkarawanenführer | `assets/cards/neutral_31.png` · K1 | Karawanenführer mit beladenen Kamelen und Seidenbündeln in einem trockenen Gebirgstal. Mehrlagige Gewänder und verständliche Reiserichtung. |
| Schlachtruf | `assets/cards/neutral_32.png` · K1 | Mittelalterliche Fußsoldaten heben vor dem Angriff ihre Speere und rufen gemeinsam. Gesichter und Rhythmus der Waffen; keine magische Druckwelle. |
| Trojanisches Pferd | `assets/cards/neutral_33.png` · K1 | Trojanisches Pferd als hölzernes Objekt vor einer bronzezeitlich inspirierten Stadtmauer. Legendäre Szene, kleine Maßstabsfiguren; keine archäologische Gewissheit behaupten. |
| Brander | `assets/cards/neutral_34.png` · K1 | Brennendes hölzernes Schiff treibt auf entfernte gegnerische Schiffe zu. Segelbrand und Wasserreflexe; kein modernes Kriegsschiff. |
| Vergessene Weisheit | `assets/cards/neutral_35.png` · K1 | Antike Schriftrolle, alter Codex, Bronzelampe und geometrisches Instrument auf steinernem Gelehrtentisch. Wiederentdecktes Wissen, keine lesbaren modernen Formeln. |
| Burgbesatzung | `assets/cards/neutral_36.png` · K1 | Burgbesatzung verteidigt eine Steinmauer mit Schilden und Speeren. Mehrere erkennbare Soldaten; keine einzelne Torwache. |
| Donnernde Legion | `assets/cards/neutral_37.png` · K1 | Römische Legion marschiert dicht geordnet über eine staubige Straße. Schilde und Schrittfolge erzeugen Rhythmus; kein übernatürlicher Blitz. |
| Herodot, Vater der Geschichte | `assets/cards/neutral_38.png` · K1 | Herodot als reifer bärtiger Grieche mit Himation, Papyrusrolle und Reisebündel. Nachdenkliches Gelehrtenbild; Gesicht als künstlerische Rekonstruktion. |
| Zenobia, Rebellin von Palmyra | `assets/cards/neutral_39.png` · K1 | Zenobia in gegürteter langer Tunika, Mantel und zurückhaltendem Diadem vor Palmyras Säulen. Würdevolle syrische Herrscherin; kein Kleopatra-Kostüm. |
| Freibeuterin | `assets/cards/neutral_42.png` · K1 | Mediterrane Freibeuterin auf einer Galeere mit zeitgerecht schlichtem Schwert und Münzbeutel. Praktische Kleidung, keine modernen Piratenfilm-Accessoires. |
| Späherin im Unterholz | `assets/cards/neutral_43.png` · K1 | Späherin unter grüner Kapuze im Unterholz; Augen und einfacher Bogen sichtbar. Stille Beobachtung, deutlich engere Komposition als Wilderin neutral_3. |
| Wandermönch | `assets/cards/neutral_44.png` · K1 | Wandermönch mit Stab und kleinem Holzkreuz auf einem Weg. Beruhigende Lichtstimmung; kein übernatürlicher Heiligenschein nötig. |
| Giftmischerin | `assets/cards/neutral_45.png` · K1 | Renaissancezeitliche Giftmischerin gießt Flüssigkeit aus einer Phiole in einer Apotheke. Kontrollierte Hände, Keramik und Glas der gewählten Epoche; kein Neontrank. |
| Condottiere | `assets/cards/neutral_46.png` · K1 | Italienischer Condottiere mit zeitgerechter Plattenrüstung und Kommandostab vor Söldnerbannern. Spätmittelalterlicher Kontext ausdrücklich erhalten. |
| Kolosseum | `assets/cards/neutral_47.png` · K1 | Kolosseum mit Zuschauern und kleinen Gladiatoren in der Arena. Architektur und räumliche Weite im Fokus; kein zweites Gladiatorenporträt. |
| Hängende Gärten | `assets/cards/neutral_48.png` · K1 | Hängende Gärten als interpretierte antike Überlieferung: begrünte Terrassen und Wasserläufe. Architektur mit Pflanzenstaffelung, keine gesicherte Rekonstruktion behaupten. |
| Pyramiden von Gizeh | `assets/cards/neutral_49.png` · K1 | Pyramiden von Gizeh mit Sphinx im warmen Abendlicht. Große klare Silhouetten, keine Djoser-Stufenpyramide und keine modernen Touristen. |

## 6. Neu zu erstellen: 21 Tokenillustrationen

**Status aller folgenden Zeilen: GENERIEREN.** Profil **T1: PNG, 1024 × 1024 px, 1:1, deckend, sRGB**. Die Tokens sind beschworene Karten-/Einheitenbilder, keine transparenten UI-Freisteller. Motivumfang bewusst kleiner halten als bei großen Kartenereignissen. Der jeweilige kulturelle Kontext steht in der Zeile; allgemeine Regeln aus Abschnitt 3 gelten vollständig.

| Name | Dateiname und Format | Konkretes Motiv und Abgrenzung |
|---|---|---|
| Rekrut | `assets/tokens/recruit.png` · T1 | Ein erwachsener, einfacher Rekrut mit Speer und Holzschild vor ruhigem Lagerhintergrund. Gestaltungsvorschlag: schlicht mediterran-mittelalterlich, keine konkrete Herrscheruniform; Einzelperson mit klarer Silhouette. |
| Krieger | `assets/tokens/warrior.png` · T1 | Ein erwachsener einfacher Krieger mit Speer, rundem Holzschild und Wolltunika. Gestaltungsvorschlag: generische europäische historische Fußtruppe; kampfbereit, anderes Gesicht und andere Pose als recruit. |
| Habicht | `assets/tokens/eagle.png` · T1 | Habicht mit angezogenen beziehungsweise zum Greifen geöffneten Fängen über einem deutschen Wald. Kurze breite Flügel und langer Schwanz; ausdrücklich kein Adler trotz Dateiname. |
| Pyramidenwächter | `assets/tokens/stoneguard.png` · T1 | Ein Wächter des Alten Reiches mit Leinenschurz und Hautschild in ruhiger Halbfigur. Pyramidenmauer nur angedeutet; gegenüber imhotep_2 engere, vereinfachte Komposition. |
| Grenzstein der Mark | `assets/tokens/totem_fire.png` · T1 | Grenzstein der Mark mit einfachem Schwertrelief, kleines Signalfeuer daneben. Hauptstein groß, Umgebung ruhig; keine Figur und kein Totempfahl. |
| Grenzstein der Burg | `assets/tokens/totem_guard.png` · T1 | Massiver moosiger Grenzstein mit eingearbeitetem Turmrelief. Frontal-nahe Ansicht, feste breite Silhouette; kein vollständiges Burgpanorama. |
| Grenzstein des Dorfes | `assets/tokens/totem_strength.png` · T1 | Dörflicher Grenzstein mit schlichtem Pflugrelief, reifes Feld dahinter. Stein als Hauptmotiv, goldwarme Akzente; kein magisches Runenobjekt. |
| Gunst der Stunde | `assets/tokens/coin.png` · T1 | Gestaltungsvorschlag für Gunst der Stunde: einzelne gealterte Bronzemünze mit schlichtem Sonnensymbol auf warmem Stein, schmaler goldener Lichtsaum. Keine Währungszahl oder lesbare Prägung; kein Goldhaufen. |
| Reiter | `assets/tokens/rider.png` · T1 | Ein leichter Reiter mit Speer und Rundschild kommt aus einem Wald. Vereinfachter Hintergrund und zentrale Pferd-Reiter-Silhouette; kein Porträt eines benannten Helden. |
| Streitwagen | `assets/tokens/chariot.png` · T1 | Ein leichter ägyptischer Streitwagen mit zwei Pferden und Bogenschützen. Seiten-Dreiviertelansicht, ruhiger Wüstenhintergrund; keine ganze Wagenformation. |
| Musketier | `assets/tokens/terracotta.png` · T1 | Ein barocker Musketier im blauen Rock mit Muskete in Wachhaltung. Menschliche Einzelperson, keine Terrakottastatue und kein chinesischer Soldat. |
| Stammeskrieger | `assets/tokens/tribesman.png` · T1 | Ein Cherusker mit Speer und kleinem Rundschild vor einem ruhigen Waldrand. Wolle, Leinen und schlichte Fibel; keine mongolische Rüstung. |
| Schanzkorb | `assets/tokens/wagon.png` · T1 | Ein großer geflochtener Schanzkorb voller Erde im Belagerungsgraben; Kanone klein im Hintergrund. Objektmotiv mit klarer Flechtstruktur; kein Wagen. |
| Füsilier | `assets/tokens/taborite.png` · T1 | Französischer Füsilier des späten 17. Jahrhunderts mit Steinschlossmuskete und passender Ausrüstung. Einzelperson; keine hussitische oder mittelalterliche Darstellung. |
| Mamlukenreiter | `assets/tokens/mamluk.png` · T1 | Ein leichter Mamlukenreiter mit Lanze und Rundschild. Ruhige Dreiviertelpose vor schlichtem sandigem Hintergrund; vom aktiven Bogenreiter baibars_3 unterscheiden. |
| Medjai-Krieger | `assets/tokens/immortal.png` · T1 | Ein Medjai-Krieger mit Bogen und Hautschild in ägyptischem Kontext. Natürliche menschliche Figur; kein persischer Unsterblicher oder Fantasy-Wesen. |
| Freier Messenier | `assets/tokens/messenian.png` · T1 | Freier Messenier mit neuem Speer und Schild vor ruhiger Landschaft. Selbstbewusste Standpose im griechischen Kontext; keine Massenbefreiungsszene. |
| Gefährte der Heiligen Schar | `assets/tokens/companion.png` · T1 | Ein Gefährte der Heiligen Schar mit Rundschild in griechischer Hoplitenausrüstung. Einzelperson als Gegenstück zu den zwei Kämpfern epaminondas_4. |
| Sippenbruder | `assets/tokens/twin.png` · T1 | Junger germanischer Sippenbruder mit Speer und kleinem Schild. Eigenständiges Gesicht und andere Pose als tribesman; weder Zwillingpaar noch Mongole. |
| Kriegselefant | `assets/tokens/elephant.png` · T1 | Ein antiker Kriegselefant in ruhiger Dreiviertelansicht, natürliche Anatomie und einfache Ausrüstung. Keine übergroße Fantasieturm-Panzerung; anders als die bewegte Feldszene neutral_19. |
| Stufenpyramide | `assets/tokens/pyramid.png` · T1 | Djosers Stufenpyramide bei Sakkara im warmen Licht, Architektur klar zentral. Keine Figur Djosers, keine Gizeh-Pyramide; vereinfachter, gut lesbarer Hintergrund. |

Die generischen Tokens `recruit`, `warrior` und `coin` besaßen im bisherigen Promptbestand nur sehr knappe Motivangaben. Ihre hier beschriebenen Umsetzungen sind ausdrücklich gestalterische Vorschläge. Sie sind keine neu behaupteten historischen Zuordnungen. Die schlichte Elefantenausstattung ist eine bewusste Empfehlung gegen den ungesicherten, leicht übertriebenen Turmaufbau des alten Token-Prompts.

## 7. Fünf Einzelbilder zuerst zuordnen

**Status: ZUORDNEN, bis zur Entscheidung keine Neugenerierung.** Die Bilder sind inhaltlich passende Kandidaten und gleichzeitig brauchbare Stilreferenzen. Eine ursprüngliche ID-Metadatei fehlt. Alle fünf Dateien enthalten tatsächlich **JPEG-Daten mit 1536 × 1536 px**, obwohl ihre Namen auf `.png` enden. Nach Zuordnung sauber als PNG exportieren; nicht nur umbenennen.

| Empfohlene ID | Name / sichtbares Motiv | Vorhandene Datei | Empfohlener Zielpfad |
|---|---|---|---|
| `baibars_0` | Mamlukenrekrut – Junger Reiter übt mit Lanze an einem Ziel im Hof | `bf9709a5-8713-4dd0-8aa7-6ac966b22275.png` | `assets/cards/baibars_0.png` · K1 |
| `baibars_1` | Barid-Kurier – Kurier lässt eine Brieftaube frei | `4137f04e-bc14-49b4-8b74-0480c39de1bd.png` | `assets/cards/baibars_1.png` · K1 |
| `baibars_2` | Ain Dschalut – Mamlukische und mongolische Reiter im Gefecht | `efd83f43-4ebc-4b02-b4be-264e376f0dab.png` | `assets/cards/baibars_2.png` · K1 |
| `baibars_3` | Bogenreiter der Bahriya – Berittener Bogenschütze | `e1f5377d-d9d2-46b4-9425-24caff1cada0.png` | `assets/cards/baibars_3.png` · K1 |
| `baibars_4` | Manjaniq-Meister – Bemannter Manjaniq vor einer Stadtmauer | `1c6b6825-0953-4078-b12a-2ed1b9d01797.png` | `assets/cards/baibars_4.png` · K1 |

Die Zuordnung beruht auf den sichtbaren Szenen, nicht allein auf dem Stil. Bei Annahme diese fünf IDs als VORHANDEN führen. Nur falls ein Bild verworfen oder ausdrücklich ausschließlich als Stilbeispiel behandelt wird, diese einzelne ID erneut freigeben. Die obigen Motivbeschreibungen und der Baibars-Kontext aus Abschnitt 5 genügen dann als zusätzlicher Bildauftrag. Allein wegen historischer Nebenfehler keine automatische Neugenerierung veranlassen.

## 8. Sechs Motive aus Teil 04 wiederbeschaffen

**Status: WIEDERBESCHAFFEN.** Laut Manifest bereits erzeugt, hier als vollständige PNG-Dateien nicht vorhanden. Bei `perikles_7` endet der Upload innerhalb der Bilddaten; nachfolgende Einträge fehlen. Das Manifest nennt für die Originale 1254 × 1254 px. **Zuerst die originalen Dateien aus einem vollständigen Teil 04 nutzen.** Nur wenn diese nicht beschaffbar sind, gezielt als Ersatz neu erzeugen; dabei gelten K1/T1 und folgende Motivvorgaben.

| ID / Name | Gesuchter Originalpfad | Ersatzmotiv nur bei notwendiger Neuerstellung |
|---|---|---|
| `pioneer` – Pionier | `assets/tokens/pioneer.png` | Römischer Pionier der späten Republik/frühen Kaiserzeit mit Werkzeug und einfacher Soldatenausrüstung beim Bauen; Einzelperson, warmer Stein und Ziegelrot, Profil T1. |
| `perikles_7` – Pest von Athen | `assets/cards/perikles_7.png` | Pest von Athen: respektvolle Szene von Versorgung und Erschöpfung in einer klassischen athenischen Straße. Eine versorgende Person im Fokus; keine moderne Schutzkleidung und keine expliziten Krankheitsdetails. Profil K1. |
| `perikles_8` – Odeion | `assets/cards/perikles_8.png` | Odeion als athenischer Musik- und Versammlungsbau im Kontext des Perikles; Baukörper und Nutzung erkennbar. Kleine Musiker als Maßstab; keine moderne Bühne. Profil K1. |
| `perikles_9` – Phidias, Meister der Akropolis | `assets/cards/perikles_9.png` | Phidias arbeitet in einer Werkstatt an einer großen Athena-Statue. Bildhauer und Werkzeug im Fokus; vom fertigen Kultbild des Tokens unterscheiden. Klassisches Athen, Profil K1. |
| `citizen` – Bürger | `assets/tokens/citizen.png` | Ein athenischer Bürger in schlichtem Chiton/Himation vor ruhiger Stadtkulisse; klare menschliche Halbfigur statt Feldherr. Klassisches Athen, Profil T1. |
| `parthenos` – Athena Parthenos | `assets/tokens/parthenos.png` | Vollendete Athena-Parthenos-Kultstatue im Tempelraum; Elfenbein-/Goldwirkung sparsam, Statue statt lebender Göttin, keine Werkstattaktion. Klassisches Athen, Profil T1. |

Die fehlenden WebP-Atlanten `game-assets/art/r04-01.webp`, `r04-02.webp` und `r04-03.webp` später aus den Einzelbildern wiederherstellen. Sie sind **keine drei weiteren KI-Bildaufträge**. Das bestehende Teil-04-Format beträgt 2896 × 2172 px, Raster 4 × 3, Zellen 724 × 724 px. Originale Zuordnung verwenden; die freien Zellen sind keine fehlenden Karten.

## 9. Zwei Alexandria-IDs gesperrt lassen

| ID / Name | Geplanter Dateipfad / Format | Motiv bei späterer Freigabe | Grund der Sperre |
|---|---|---|---|
| `hypatia_0` – Bibliothekslehrling | `assets/cards/hypatia_0.png` · K1 | Junger erwachsener männlicher Schüler mit Papyrus in einem bescheidenen alexandrinischen Gelehrtenraum um 400 n. Chr.; Tunika/Himation, keine monumentale intakte ptolemäische Bibliothek. | Überschneidung mit dem geretteten Papyrusstudium, derzeit `hypatia_5` / Lehrsatz zugeordnet. |
| `hypatia_2` – Sternenkundiger | `assets/cards/hypatia_2.png` · K1 | Älterer Astronom mit einfachem Visierinstrument unter Sternen in spätrömisch-alexandrinischem Kontext; kein Fernrohr und kein Hypatia-Porträt. | Überschneidung mit dem geretteten Astronomenmotiv, derzeit `hypatia_8` / Sternenorakel zugeordnet. |

**Nicht aus der Sperre ableiten, dass zwei zusätzliche neue Bilder nötig sind.** Erst ursprüngliche beziehungsweise gewünschte Motivzuordnung entscheiden. Die 41 geretteten Dateien haben bei Dubletten Vorrang entsprechend ihrer beigefügten Readme. Die übrigen geretteten Zuordnungen bleiben ebenfalls Arbeitszuordnungen, bis sie abschließend bestätigt sind.

## 10. UI und Technik: prüfen, ableiten oder einbauen

Dieser Bereich ist getrennt von den 260 Bildmotiven. Teil 03 wird ausdrücklich als UI-/Techniklieferung bezeichnet, war aber nicht angehängt. Deshalb sind die folgenden Punkte **Prüf- und gegebenenfalls Ergänzungsarbeiten**, keine sicher fehlenden neuen Malmotive. Die endgültige Anzahl zusätzlicher UI-Dateien lässt sich ohne dieses Paket nicht seriös nennen.

| Aufgabe | Dateiname / Format | Stil und technische Parameter | Status |
|---|---|---|---|
| Android-Launcher adaptiv | Vorhandene Projektdateien `android/app/src/main/res/drawable/ic_launcher_foreground.xml`, `ic_launcher_background.xml`; Verknüpfung in `mipmap-anydpi-v26/ic_launcher.xml` | Vorhandenes neues Motiv aus `assets/ui/app-icon-foreground.svg` übernehmen und für native Ebenen aufbereiten. Geometrie des Projekt-Viewports erhalten; keine Bild-KI für XML einsetzen. | Neue Stilfassung/Teil 03 prüfen; die Projektdateien selbst existieren bereits. |
| Android-Launcher monochrom | `android/app/src/main/res/drawable/ic_launcher_monochrome.xml` | Einfarbige klare Form aus dem vorhandenen Symbolsystem; Hintergrund transparent. Native Vektorarbeit, keine neue gemalte Illustration. | Stilübernahme aus Teil 03 prüfen. |
| Splash-Symbol und Hintergrund | `android/app/src/main/res/drawable/splash_icon.xml`, `splash_window.xml` | Vorhandenes `assets/ui/splash-icon.svg` als Gestaltungsvorlage, Materialpalette und zentrale Silhouette erhalten. | Umsetzung/Teil 03 prüfen. |
| Zusätzliche Filterzustände | Vorschlagsnamen `assets/ui/filterknopf-{mana,common,rare,epic,legendary}-{hover,pressed,disabled}.svg`, PNG-Ableitung | Vorhandene Normal-/Aktivvarianten fortsetzen, gleiche Maße und Konturen. Gesperrt entsättigen und leicht abdunkeln; Text/Zahlen im Code. Nur tatsächlich benötigte Zustände ergänzen. | Nicht als pauschal 15 fehlende Motive zählen; Laufzeitbedarf und Teil 03 prüfen. |
| Kartenrahmen-Clipmasken | Technische SVG-/Canvas-Pfade für `minion`, `spell`, `building`; bei separater Datei z. B. `mask-card-minion.svg` (Vorschlagsname) | Exakt aus den vorhandenen Rahmenkonturen ableiten, deckender Maskenbereich und transparente Außenfläche. Keine frei generierte Geometrie. | Teil 03 und spätere Einbindung prüfen. |
| Hauptmenü-Trefferflächen | Code-/SVG-Pfade, keine Bilddateien notwendig | Klickflächen an Steinplatten und Medaillons anpassen, Touchziele gemäß Projektvorgabe mindestens 48 dp. | Integration, kein Bildauftrag. |
| Lange Chronikleiste | Bestehende `assets/ui-art/chronikleiste.png`, bei Bedarf skalierbare Teilstücke/Masken | Bronze-/Steinsystem aus Teil 01 erhalten; Zuschnitt, Streckbereiche und Positionierung aus realer UI ableiten. Neue Maße erst aus Layout ermitteln. | Anpassung prüfen; Grundmotiv vorhanden. |
| Atlas und Bildzuordnung | WebP 4 × 3; pro Bild quadratische Zelle, ID→Atlas/Zelle in Manifest | Code schneidet `Breite/4` und `Höhe/3`. Bestehende Raster und Zuordnungen erhalten. Einzeldateien ohne Atlas-Schnitt nur mit entsprechendem Ladeweg nutzen. | Technische Ableitung, keine zusätzliche Illustration. |
| Stufenpyramiden-Platzhalter | Neues `assets/tokens/pyramid.png` aus Abschnitt 6 einbinden | Der bisherige Sonderwert `@pyramid` zeichnet einen Platzhalter. Nach fertigem Motiv gezielt umstellen. | Bereits als EIN Tokenauftrag gezählt, nicht nochmals als UI-Asset zählen. |

Für tatsächliche UI-Ergänzungen: vorhandene SVGs bearbeiten und daraus PNGs ableiten. Vektor-/Maskengeometrie und Bedienelemente nicht mit einer Bild-KI neu erfinden. Nicht belegte Dateinamen oben sind ausdrücklich Vorschläge. Weder Abmessungen noch Anzahl der unbekannten Teil-03-Dateien wurden erfunden.

## 11. Was schon vorhanden ist und nicht erneut bestellt werden soll

### Andere Grafikbereiche aus Teil 01

| Bereich | Vorhandene Motive / Assets | Bewertung |
|---|---:|---|
| Heldenporträts | 22 | Alle aktiven Helden abgedeckt. Keine neuen Heldenporträts aus den Kartennamen ableiten. |
| Helden-Skins | 4 | Dandolo, Hypatia, Imhotep und Leonidas in der Marmorvariante. |
| Kartenrücken | 8 | Chroniken, Lilien, Pharao, Runen, Sparta, Sterne, Tempel und Zen. |
| Gemalte Hintergründe | 12 | Einschließlich der fünf Spielfelder sowie Menü-/Sammlungs-/Basaransichten. |
| Kampagnenkarte | 1 SVG | Vorhandene geografische Karte; genaue Vektorgeometrie nicht als Rasterbild neu erzeugen. |
| Gemalte UI-Ebenen | 19 | Unter anderem Kartenrahmen, Chronikleiste, Kartenbuch, Pakete, Schildwall und Waffenablage. |
| Native UI-Vektorassets | 192 | Zusätzlich PNG-Ableitungen; SVG und PNG nicht doppelt als verschiedene Motive zählen. |

Die 267 Einträge im Teil-01-Manifest umfassen diese 258 Nicht-Karten-Assets plus neun Kartenillustrationen. In Teil 02 sind 27 Karten und drei Tokens hinzugekommen. Die fünf Einzelbilder sind vorläufige Zuordnungskandidaten; der beschädigte Teil 04 liefert hier nur 24 vollständige Kartenbilder.

### Sperrliste der bereits dokumentierten Karten und Tokens

Folgende IDs bei Folgeaufträgen nicht automatisch erzeugen. „Teil 04 / Wiederbeschaffen“ bleibt in Abschnitt 8, die fünf Baibars-Kandidaten in Abschnitt 7. Die folgende Tabelle enthält die 110 im bisherigen Lieferstand dokumentierten IDs, davon hier 104 mit vollständiger Bilddatei und sechs nur als Manifestnachweis. Gerettete Motive können inhaltlich auch unter einer anderen ID eine Dublette darstellen.

| ID | Aktueller Name | Herkunft / Stand |
|---|---|---|
| `agrippa_0` | Pilumwerfer | Teil 04 · vollständig vorhanden |
| `agrippa_1` | Legionär der Zehnten | Teil 04 · vollständig vorhanden |
| `agrippa_10` | Aquilifer | Teil 04 · vollständig vorhanden |
| `agrippa_11` | Harpax | Teil 04 · vollständig vorhanden |
| `agrippa_2` | Castra | Teil 04 · vollständig vorhanden |
| `agrippa_3` | Testudo | Teil 04 · vollständig vorhanden |
| `agrippa_4` | Ballista | Teil 04 · vollständig vorhanden |
| `agrippa_5` | Liburnen bei Actium | Teil 04 · vollständig vorhanden |
| `agrippa_6` | Primus Pilus | Teil 04 · vollständig vorhanden |
| `agrippa_7` | Thermen des Agrippa | Teil 04 · vollständig vorhanden |
| `agrippa_8` | Pantheon | Teil 04 · vollständig vorhanden |
| `agrippa_9` | Vitruv, Baumeister Roms | Teil 04 · vollständig vorhanden |
| `boudicca_0` | Hüterin des Hains | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `boudicca_1` | Schild aus Eichenholz | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `boudicca_2` | Krieger der Arverner | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `boudicca_3` | Hieb mit dem Langschwert | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `boudicca_4` | Reiter der Arverner | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `boudicca_5` | Heilkundige mit der Mistel | Teil 01 · vollständig vorhanden |
| `boudicca_6` | Erhebung der Gallier | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `boudicca_7` | Verteidiger von Gergovia | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `boudicca_8` | Letzter Ritt vor Alesia | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `citizen` | Bürger | Teil 04 · WIEDERBESCHAFFEN |
| `dandolo_0` | Lagunenbote | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `dandolo_1` | Arsenalarbeiter | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `dandolo_10` | Agent des Zehnerrats | Teil 02 · vollständig vorhanden |
| `dandolo_11` | Galeerenschmied | Teil 02 · vollständig vorhanden |
| `dandolo_12` | Plünderung Konstantinopels | Teil 02 · vollständig vorhanden |
| `dandolo_2` | Präziser Stich | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `dandolo_3` | Handelsgesandter | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `dandolo_4` | Dogenklinge | Teil 01 · vollständig vorhanden |
| `dandolo_5` | Maskierte Wache | Teil 02 · vollständig vorhanden |
| `dandolo_6` | Geheimer Vertrag | Teil 01 · vollständig vorhanden |
| `dandolo_7` | Admiral der Galeeren | Teil 02 · vollständig vorhanden |
| `dandolo_8` | Arsenal von Venedig | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `dandolo_9` | Marco Polo, der Weltenfahrer | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `griechen_0` | Olympionike | Teil 04 · vollständig vorhanden |
| `griechen_1` | Rhapsode | Teil 04 · vollständig vorhanden |
| `griechen_3` | Orakel von Delphi | Teil 04 · vollständig vorhanden |
| `hoplite` | Hoplit | Teil 02 · vollständig vorhanden |
| `hypatia_1` | Himmelsstrahl | Teil 02 · vollständig vorhanden |
| `hypatia_10` | Astronomin des Museions | Teil 02 · vollständig vorhanden |
| `hypatia_11` | Kommentar zu Diophant | Teil 02 · vollständig vorhanden |
| `hypatia_3` | Sternenregen | Teil 02 · vollständig vorhanden |
| `hypatia_4` | Astrolabienwächter | Teil 02 · vollständig vorhanden |
| `hypatia_5` | Lehrsatz | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `hypatia_6` | Museionshüterin | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `hypatia_7` | Sonnenfokus | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `hypatia_8` | Sternenorakel | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `hypatia_9` | Theon von Alexandria | Teil 01 · vollständig vorhanden |
| `imhotep_5` | Balsamierer | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `imhotep_6` | Nilschwemme | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `imhotep_7` | Goldener Skarabäus | Teil 02 · vollständig vorhanden |
| `imhotep_8` | Urteil der Sonne | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `imhotep_9` | Djoser, der Erbauer | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `jeanne_0` | Pförtnerin vom Rupertsberg | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `jeanne_1` | Grünkraft | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `jeanne_10` | Adlige Stifterin | Teil 02 · vollständig vorhanden |
| `jeanne_11` | Weihe der Klosterkirche | Teil 02 · vollständig vorhanden |
| `jeanne_2` | Klostervogt | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `jeanne_3` | Einkleidung der Novizinnen | Teil 02 · vollständig vorhanden |
| `jeanne_4` | Pilger am Rhein | Teil 02 · vollständig vorhanden |
| `jeanne_5` | Segen der Äbtissin | Teil 02 · vollständig vorhanden |
| `jeanne_6` | Vorsängerin im Chor | Teil 02 · vollständig vorhanden |
| `jeanne_7` | Spiel der Tugenden | Teil 02 · vollständig vorhanden |
| `jeanne_8` | Ritter mit dem Schutzbrief | Teil 02 · vollständig vorhanden |
| `jeanne_9` | Jutta von Sponheim, Magistra | Teil 02 · vollständig vorhanden |
| `khan_0` | Späher aus Engern | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `khan_1` | Speerwerfer aus Westfalen | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `khan_4` | Falknerin | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `khan_5` | Sachsenaufstand | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `khan_6` | Schildträger aus Ostfalen | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `khan_7` | Sturm auf die Eresburg | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `khan_8` | Gefolgschaft Widukinds | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `khan_9` | Abbi, Gefährte Widukinds | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `leonidas_0` | Spartanischer Rekrut | Teil 02 · vollständig vorhanden |
| `leonidas_1` | Wächter der Thermopylen | Teil 02 · vollständig vorhanden |
| `leonidas_10` | Spartiat der Dreihundert | Teil 02 · vollständig vorhanden |
| `leonidas_11` | Engpass der Thermopylen | Teil 02 · vollständig vorhanden |
| `leonidas_2` | Bronzener Wall | Teil 02 · vollständig vorhanden |
| `leonidas_3` | Hoplitenhauptmann | Teil 01 · vollständig vorhanden |
| `leonidas_4` | Speerträger | Teil 01 · vollständig vorhanden |
| `leonidas_5` | Schildstoß | Teil 01 · vollständig vorhanden |
| `leonidas_6` | Phalanxveteran | Teil 01 · vollständig vorhanden |
| `leonidas_7` | Spartas Erbe | Teil 02 · vollständig vorhanden |
| `leonidas_8` | Dienekes | Teil 02 · vollständig vorhanden |
| `leonidas_9` | Gorgo, Stimme Spartas | Teil 01 · vollständig vorhanden |
| `nostradamus_1` | Verpuffung im Laboratorium | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `nostradamus_2` | Bergmann aus Aue | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `nostradamus_4` | Pestarzt | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `nostradamus_5` | Befehl des Kurfürsten | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `nostradamus_6` | Schreiber der Manufaktur | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `nostradamus_7` | Glut des Brennofens | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `nostradamus_8` | Wache auf dem Königstein | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `nostradamus_9` | Tschirnhaus, Naturforscher | gerettet.zip · Bild vorhanden, Zuordnung vorläufig |
| `novice` | Novizin | Teil 02 · vollständig vorhanden |
| `parthenos` | Athena Parthenos | Teil 04 · WIEDERBESCHAFFEN |
| `perikles_0` | Ruderer der Triere | Teil 04 · vollständig vorhanden |
| `perikles_1` | Lange Mauern | Teil 04 · vollständig vorhanden |
| `perikles_10` | Steinmetz vom Pentelikon | Teil 04 · vollständig vorhanden |
| `perikles_11` | Schatz des Seebunds | Teil 04 · vollständig vorhanden |
| `perikles_2` | Rede auf die Gefallenen | Teil 04 · vollständig vorhanden |
| `perikles_3` | Strategos | Teil 04 · vollständig vorhanden |
| `perikles_4` | Pnyx | Teil 04 · vollständig vorhanden |
| `perikles_5` | Scherbengericht | Teil 04 · vollständig vorhanden |
| `perikles_6` | Triere von Salamis | Teil 04 · vollständig vorhanden |
| `perikles_7` | Pest von Athen | Teil 04 · WIEDERBESCHAFFEN |
| `perikles_8` | Odeion | Teil 04 · WIEDERBESCHAFFEN |
| `perikles_9` | Phidias, Meister der Akropolis | Teil 04 · WIEDERBESCHAFFEN |
| `pioneer` | Pionier | Teil 04 · WIEDERBESCHAFFEN |
| `totem_heal` | Grenzstein des Klosters | Teil 02 · vollständig vorhanden |

### Gerettete Originaldateien für eine spätere Einbau-KI

Diese Tabelle benötigt die Bild-KI nicht für die Neugenerierung; sie verhindert erneute Dubletten und erhält die Zuordnung ohne erneutes Durchsuchen des Archivs. Die Zuordnung stammt aus den Paketen und wurde nicht als ursprüngliche ID-Bestätigung ausgegeben.

| Arbeits-ID | Originaldatei in gerettet.zip |
|---|---|
| `boudicca_0` | `gerettet/Wächterin des heiligen Eichenhains.png` |
| `boudicca_1` | `gerettet/Gallischer Eichenschild mit Eisenbuckel.png` |
| `boudicca_2` | `gerettet/Arvernerkrieger vor den Vulkanhügeln.png` |
| `boudicca_3` | `gerettet/Gallischer Krieger schwingt das Langschwert.png` |
| `boudicca_4` | `gerettet/Arvernischer Reiter im Speerangriff.png` |
| `boudicca_6` | `gerettet/Speere und Schilde der Gallier.png` |
| `boudicca_7` | `gerettet/Gallischer Schildwächter auf Gergovia.png` |
| `boudicca_8` | `gerettet/Vercingetorix reitet aus Alesia.png` |
| `dandolo_0` | `gerettet/Venezianischer Bote im Ruderboo.png` |
| `dandolo_1` | `gerettet/Venezianischer Schiffbauer in der Werft.png` |
| `dandolo_2` | `gerettet/Dolch gegen Holzschild auf Schiffsplanken.png` |
| `dandolo_3` | `gerettet/Venezianischer Gesandter mit Siegelbrief.png` |
| `dandolo_8` | `gerettet/Galeerenbau im venezianischen Arsenal.png` |
| `dandolo_9` | `gerettet/Marco Polo auf der Seidenstraße.png` |
| `hypatia_5` | `gerettet/Papyrusstudium in Alexandrien.png` |
| `hypatia_6` | `gerettet/Bewahrerin des alexandrinischen Wissens.png` |
| `hypatia_7` | `gerettet/Bronzespiegel bündelt Sonnenlicht.png` |
| `hypatia_8` | `gerettet/Astronom unter Alexandrias Sternenhimmel.png` |
| `imhotep_5` | `gerettet/Leinen und Salbgefäße im altägyptischen Einbalsamierungsraum.png` |
| `imhotep_6` | `gerettet/Jährliche Flut bei Saqqara.png` |
| `imhotep_8` | `gerettet/Altägyptisches Gericht unter der Sonne.png` |
| `imhotep_9` | `gerettet/Djoser und die Stufenpyramide.png` |
| `jeanne_0` | `gerettet/Schlüsselhüterin am Rupertsberg.png` |
| `jeanne_1` | `gerettet/Leuchtende Kräuter in Hildegards Garten.png` |
| `jeanne_2` | `gerettet/Wächter am romanischen Klostertor.png` |
| `khan_0` | `gerettet/Späher im dunklen Buchenwald.png` |
| `khan_1` | `gerettet/Sächsischer Speerwerfer im Nebel.png` |
| `khan_4` | `gerettet/Sächsische Falknerin mit Habicht.png` |
| `khan_5` | `gerettet/Sächsische Speerträger vor dem brennenden Dorf.png` |
| `khan_6` | `gerettet/Ostfälischer Schildträger mit Speer.png` |
| `khan_7` | `gerettet/Sachsen stürmen die brennende Burg.png` |
| `khan_8` | `gerettet/Sächsischer Sturm aus dem Wald.png` |
| `khan_9` | `gerettet/Sächsischer Edelmann am Weserufer.png` |
| `nostradamus_1` | `gerettet/Funkenflug zwischen Fläschchen im Labor.png` |
| `nostradamus_2` | `gerettet/Sächsischer Bergmann mit Kaolinkorb.png` |
| `nostradamus_4` | `gerettet/Sächsischer Arzt mit Kräutern.png` |
| `nostradamus_5` | `gerettet/Versiegelter Befehl im Alchemielabor.png` |
| `nostradamus_6` | `gerettet/Schreiber in der Meißner Porzellanmanufaktur.png` |
| `nostradamus_7` | `gerettet/Meißner Arbeiter am glühenden Brennofen.png` |
| `nostradamus_8` | `gerettet/Sächsische Wache am Königstein.png` |
| `nostradamus_9` | `gerettet/Tschirnhaus am großen Brennspiegel.png` |

## 12. Abnahme und Fortschreibung

Für jede neu gelieferte ID prüfen:

- Richtiger Name, Motiv und historische Gruppe; keine Ableitung der Bildwelt aus einer veralteten technischen ID.
- PNG tatsächlich als PNG kodiert; 1:1, Zielableitung 1024 × 1024 px, keine unerwünschte Transparenz.
- Hauptmotiv bei 128 px noch verständlich; weder Gesicht noch wichtige Handlung ungewollt abgeschnitten.
- Keine Titel, Wasserzeichen, Kartenrahmen oder Zahlen in die Illustration eingebrannt.
- Hände, Gliedmaßen, Tiere, Waffen, Seile, Wagen und Architektur ohne offensichtliche strukturelle Fehler.
- Gemalte Materialwirkung, passender Detailgrad und Hauptlicht oben rechts; Nachtmotive sinnvoll ausgenommen von Tageslicht.
- Kein vorhandenes Motiv erneut geliefert; ähnliche Kartennamen durch andere Handlung und Komposition unterscheiden.
- Tatsächliche Ausgabegröße und Status dokumentiert. Eine gelieferte Datei ist erst nach Sichtprüfung angenommen.

### Kurze Lieferzeile als Vorlage

```text
ID: imhotep_0
Name: Nilschülerin
Datei: assets/cards/imhotep_0.png
Ist-Format: PNG / RGB / sRGB / 1024 × 1024 px
Originalgröße: [falls abweichend]
Status: geliefert, Sichtprüfung ausstehend | angenommen | Korrektur nötig
Abweichung / nächste Aktion: [nur wenn nötig]
```

### Kleine, handhabbare Produktionspakete

Empfehlung: pro Auftrag eine historische Gruppe oder 6–12 ausgewählte Motive. Pro Motiv genau eine Datei. Falls ZIPs verwendet werden, alle Dateien vollständig prüfen und das fertige Archiv auf Lesbarkeit testen. Eine feste Anzahl von 30 Bildern pro Archiv ist für dieses Briefing nicht notwendig. Keine alten Assets, Vorschauatlanten oder kompletten Projektkopien erneut mitliefern, wenn nur neue Motive bestellt sind.

### Technischer Einbau später

Die angegebenen Pfade `assets/cards/…` bzw. `assets/tokens/…` sind Lieferpfade. Als Einzeldateien liegen sie im Projekt unter `quellcode/assets/game/assets/cards/…` bzw. `…/tokens/…`. Der vorhandene Renderer erwartet überwiegend Atlanten mit vier Spalten und drei Zeilen. Deshalb genügt das Kopieren der PNGs allein nicht: entweder eine bewusste Einzelbild-Laderoute einbauen oder Atlanten und die ID→`art`/`cell`-Zuordnung ergänzen. Keine Spielwerte oder Namen verändern. Das ist Einbauarbeit, kein neuer Generierungsbedarf.

## 13. Nachweis und Grenzen des Abgleichs

Verwendete Quellen im angehängten Bestand:

- `Chronicle_of_Heroes-main.zip` → `quellcode/assets/game/model/data.js`: 350 Karten, 27 Tokens, 22 Helden; aktuelle Namen und historische Umbenennungen.
- Dasselbe Projekt → `stil/STILBIBEL.md`: Palette, Material, Konturen und Licht von oben rechts.
- Dasselbe Projekt → `quellcode/assets/game/view/match/render.js`: 4×3-Atlasaufteilung und Pyramiden-Platzhalter.
- Teil 01 → `ASSET_MANIFEST.json`, `LIEFERSTATUS.md`, `ASTRA_ABDECKUNG.json`, `HISTORIK_UND_STIL.md`: fertige Grundgrafiken und technische Restarbeiten.
- Teil 02 → `ASSET_MANIFEST.json`: weitere 30 Motive.
- Teil 04 → vollständig gelesene `ASSET_MANIFEST.json`, `OFFENE_GENERIERUNGSAUFTRAEGE.json`, `DUBLETTENSPERREN.json`, `GERETTETE_ASSETS_ZUORDNUNG.json`, `GESPERRTE_ZUORDNUNGSPRUEFUNG.json`, `LIEFERSTATUS.md` und `EINBAUANLEITUNG.md`.
- `gerettet.zip` → 41 vorhandene PNG-Motive und die Readme mit Vorrang für gerettete Bilder bei Dubletten.
- Fünf Einzelbilder → visuelle Szenenzuordnung zu Baibars 0–4; tatsächliches Dateiformat und Maße geprüft.

Prüfumfang: vollständiger ID-Abgleich mit dem Spielcode; Abgleich der Einzeldateien mit den Paketmanifesten und ihren Prüfsummen; Formatprüfung der fünf Referenzdateien; visuelle Prüfung dieser fünf Zuordnungskandidaten. Keine vollständige historische oder anatomische Abnahme aller vorhandenen Bilder und kein Test des Einbaus im laufenden Spiel. Audio, Schriftdateien und künftige Spielinhalte sind nicht Gegenstand dieses Bildproduktionsbriefings.

**Fortschreibungsregel:** Nur den Status tatsächlich bearbeiteter IDs ändern. Die Summe der fünf Karten-/Tokenstatusgruppen bleibt für diesen Projektstand 377. Ein PNG-Export, eine WebP-Version, ein Atlas und eine Vorschau desselben Motivs sind ein Motiv, nicht vier neue Assets.
