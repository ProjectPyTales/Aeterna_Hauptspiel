# AETERNA – Auftrag an Astra: noch fehlende Kartenbilder

*Erzeugt von `werkzeuge/astra_bilder.py` – nicht von Hand ändern. Grundlage: alle Lieferungen in `ungenutzte_assets/neue_astra_assets/` (Teil 1–6, gerettete Bilder und Lieferung_K…) und das Produktionsbriefing (`neue_astra_assets/PRODUKTIONSBRIEFING.md`). Jede Karte mit Status steht in `ASTRA_STAND.csv`.*

**Diese Datei ersetzt das alte Produktionsbriefing als Übergabe an die Bild-KI.** Sie enthält nur noch, was wirklich fehlt; alles Gelieferte ist im Spiel eingebaut und darf nicht erneut erzeugt werden.

## 1. Stand

| Status | Karten | Spielsteine | Summe |
|---|---:|---:|---:|
| Eingebaut (im Spiel) | 380 | 26 | **406** |
| Eingebaut, Korrektur nötig | 0 | 0 | **0** |
| Altes Bild bleibt (AP L.6) – nicht erzeugen | 36 | 2 | **38** |
| Im Spiel nie gerufen – nicht erzeugen | 0 | 1 | **1** |
| Neu erzeugen | 0 | 0 | **0** |
| Teil 4 beschädigt – Original suchen, sonst neu | 0 | 0 | **0** |
| Gesperrt – Zuordnung klären | 0 | 0 | **0** |
| **Gesamt** | **416** | **29** | **445** |

Im Spiel: 406 Karten und Spielsteine in 34 Atlanten, alle 22 Heldenporträts, 4 Marmor-Skins, 5 Schlachtfeld-Tische. Lieferformat ist egal (PNG oder WebP): `werkzeuge/astra_bilder.py` erzeugt daraus die WebP-Atlanten des Spiels. Bitte weiter **PNG 1024 × 1024** (oder das native Original) liefern, je Datei genau die ID als Namen, **höchstens 10–12 Bilder je ZIP** – große ZIPs sind mehrfach abgebrochen.


## 0. Bestellpakete – in dieser Reihenfolge bestellen

Jedes Paket liegt als eigene Datei in `ungenutzte_assets/astra_bestellung/` – mit Auftrag zum Kopieren, Referenzen und genau seinen Motiven. Die Anleitung steht in `ungenutzte_assets/ASTRA_START.md`.

Alle Kartenpakete sind abgeschlossen.

| Paket | Oberfläche | Zeilen |
|---|---|---:|
| [U01](astra_bestellung/U01.md) | Spielbrett: Mana, Zug, Helden (eingebaut, 23 Dateien) | 8 |
| [U02](astra_bestellung/U02.md) | Karten und Werte (eingebaut, 20 Dateien einschließlich Basar-Glanz) | 9 |
| [U03](astra_bestellung/U03.md) | Schlüsselwörter und Effekte (13 Teile, 20 Dateien) | 13 |
| [U04](astra_bestellung/U04.md) | Inszenierung: Anfang und Ende (6 Teile mit `faehigkeits-effekt`, 30 Dateien) | 5 |
| [U05](astra_bestellung/U05.md) | Menüs (10 Teile, 19 Dateien) | 10 |
| [U06](astra_bestellung/U06.md) | Kolosseum als Draft (5 Teile, 9 Dateien, seit 1.29.0) | 5 |
| [U07](astra_bestellung/U07.md) | Aufgaben und Heldenstufen (3 Teile, 6 Dateien, seit 1.30.0) | 3 |
| [U08](astra_bestellung/U08.md) | Kampagne 2.0 mit Lunte (5 Teile, 7 Dateien, seit 1.31.0) | 5 |
| [U09](astra_bestellung/U09.md) | Lebendige Schlachtfelder und Szene (8 Teile, 11 Dateien, seit 1.32.0) | 8 |
| [U10](astra_bestellung/U10.md) | Kartenrätsel (3 Teile, 5 Dateien, seit 1.33.0) | 3 |
| [U11](astra_bestellung/U11.md) | Lehrstunden (2 Teile, 4 Dateien, seit 1.34.0) | 2 |
| [U12](astra_bestellung/U12.md) | Updates (1 Teil, 1 Datei, seit 1.36.0) | 1 |
| [U13](astra_bestellung/U13.md) | Auftritt der Legendären (3 Teile, 3 Dateien, seit 1.38.0, neu in 1.39.0) | 3 |

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

- **R1 – Figur, Malstil und Licht:** `ungenutzte_assets/neue_astra_assets/Teil5/originale_1254px/imhotep_3.png` – Tempelärztin (`imhotep_3`)
- **R2 – Bauwerk, Objekt, Landschaft:** `ungenutzte_assets/neue_astra_assets/Teil6/originale/griechen_6.png` – Bibliothek von Alexandria (`griechen_6`)
- **R3 – Gruppenszene:** `ungenutzte_assets/neue_astra_assets/Teil6/originale/epaminondas_5.png` – Schlacht bei Leuktra (`epaminondas_5`)
- **R4 – nur für Oberflächenteile:** `quellcode/assets/game/assets/ui/kartenrahmen-minion-normal.webp`, `quellcode/assets/game/assets/ui/stundenglas.webp`, `quellcode/assets/game/assets/ui/waffenablage.webp`

Die drei Referenzen stammen aus Astras eigenen, im Spiel eingebauten Lieferungen: warmer malerischer Semi-Realismus, gut lesbare Handlung, die Projektpalette. Sie zeigen Pinsel und Licht – nicht Figuren, Gebäude oder Waffen, die in andere Epochen kopiert werden.

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


## 5. Kartenillustrationen: 0

Profil **K1**: PNG, 1024 × 1024 px, 1:1, deckend, sRGB; Dateiname `<ID>.png`.


## 6. Spielsteine: 0

Profil **T1**: wie K1, Hauptfigur größer, Hintergrund ruhiger; vollständige Szene, kein Freisteller.
