# AETERNA – Auftrag an Astra: gemalte Oberfläche (50 Teile)

*Stand 1.25.0 (15. 10. 2026; seit 1.22.0 dazu die zwei Teile der Hinterhalte, AP 5.6). Gehört zu AP A.2 im README. Die Kartenbilder stehen getrennt in `ASTRA_AUFTRAG.md`.*

## Worum es geht

Das Spiel zeichnet noch 50 Oberflächenteile selbst – im Code steht an jeder Stelle `ASTRA: <kennung>` (Liste in `MOTIVE.md`,
Abschnitt „Im Code gezeichnet“). Teil 1 hat für diese Teile **flache Vektorgrafiken** geliefert (einfache Flächen mit Verlauf).
Die sind schlichter als die heutigen Zeichnungen und werden **nicht** verwendet. Gesucht sind dieselben Teile **gemalt** – im Stil
der 27 gemalten Oberflächenbilder, die schon im Spiel sind: Kartenrahmen, Kartenrücken, Stundenglas, Chronikleiste,
versiegelte Befehle, Waffenablage, Schildwall, Giftphiole, Urne, Kartenpaket, Podest, Kartenbuch, Startbefehle, Steinplatten.

## So gibst du den Auftrag

1. Diese Datei anhängen und **drei Stilreferenzen** aus dem Spiel dazulegen:
   `quellcode/assets/game/assets/ui/kartenrahmen-minion-normal.webp`, `…/stundenglas.webp`, `…/waffenablage.webp`.
2. **Ein Paket je Auftrag** (Abschnitt „Pakete“); hat es mehr als 12 Dateien, auf mehrere ZIPs verteilen (z. B. „Paket 1a/1b“) –
   große ZIPs sind mehrfach abgebrochen.
3. Lieferung als neuer Ordner `ungenutzte_assets/neue_astra_assets/<Name>/`; eine Sitzung baut sie mit
   `werkzeuge/astra_bilder.py` ein (Liste `UI`) und stellt die Zeichenfunktion auf das Bild um – wie in 1.22.0.

### Kopierfertiger Arbeitsauftrag

```text
Male für AETERNA die Oberflächenteile aus Paket [NUMMER] dieser Datei – jede Zeile eine Datei mit genau dem
angegebenen Dateinamen. Stil wie die beigefügten Referenzen: handgemalt, warmer Kalkstein, Elfenbein, poliertes
dunkles Holz, Bronze mit begrenztem warmem Glanz, Blattgold, kleine Lapis-, Oliv- und Terrakotta-Akzente,
feine dunkelbraune Konturen, sichtbare kontrollierte Pinseltextur, Licht von oben rechts, weiche Schatten nach
links unten. Keine flachen Vektorflächen, keine Plastik-, Chrom- oder Neonoptik, kein 3D-Render.

Technisch: PNG mit echter Transparenz (RGBA), außerhalb des Objekts vollständig transparent, kein Hintergrund,
kein Schlagschatten auf den Hintergrund (den setzt das Spiel). Doppelte Größe der Tabellenangabe (z. B. 160 × 160
→ 320 × 320). Kein Text, keine Zahlen, keine Buchstaben – Zahlen und Beschriftungen schreibt das Spiel selbst; die
Flächen dafür bleiben ruhig und hell bzw. dunkel genug für eine helle oder dunkle Zahl (steht in der Zeile).
Varianten eines Teils haben exakt dieselbe Größe und Lage, nur Farbe oder Zustand ändern sich.
Melde je Datei: Dateiname, tatsächliche Pixelmaße, Abweichungen.
```

## Pakete

Größen sind die Darstellung im Spiel; **geliefert wird doppelt so groß**. „Frei für Zahl“ heißt: Das Spiel schreibt dort eine
Zahl – die Fläche bleibt ruhig, ohne Ornament in der Mitte.

### Paket 1 – Spielbrett: Mana, Zug, Helden (10 Teile, 27 Dateien)

| Kennung | Dateien | Größe | Motiv und Vorgaben |
|---|---|---|---|
| `aetheruhr` | `aetheruhr.png` | 256 × 256 | Bronzene Uhr mit Zifferblatt aus dunklem Lapis, zehn leere Fassungen im Kreis (wie Stundenmarken), Mitte frei für die Manazahl (hell). Die Kristalle liefert `aetherkristall`. |
| `aetheruhr` | `aetherkristall-voll.png`, `-verbraucht.png`, `-gesperrt.png`, `-fehlt.png` | je 48 × 64 | Ein Kristall für eine Fassung: voll leuchtend blau, verbraucht dunkel und matt, gesperrt rot mit feinem Riss, fehlt als leere Bronzefassung. |
| `chronometer` | `chronometer-aktiv.png`, `chronometer-gegnerzug.png`, `chronometer-zeiger.png` | 256 × 336, Zeiger 24 × 120 | Bronzene Taschenuhr mit Bügel oben und Schild unten (Schild frei für „ZUG BEENDEN“); aktiv mit warmem Glanz, im Gegnerzug gedämpft und kühler. Zeiger einzeln, Drehpunkt unten mittig. |
| `heldenmuenze` | `heldenmuenze-spieler.png`, `heldenmuenze-gegner.png` | 400 × 400 | Geprägte Bronzemünze mit Rändelung und breitem Rand; **Mitte rund transparent** (Durchmesser 52 % der Breite) für das Porträt, oberer Randbogen glatt für die Umschrift. Gegner etwas dunklere, rötlichere Bronze. |
| `herrschersiegel` | `herrschersiegel-bereit.png`, `-ruhend.png`, `-rueckseite.png` | 248 × 248 | Geprägtes Wachs-/Bronzesiegel der Heldenfähigkeit, Mitte frei für das Fähigkeitssymbol; bereit mit Glanz, ruhend matt, Rückseite grau-steinern ohne Prägung. |
| `phalanxschild` | `phalanxschild.png` | 112 × 112 | Runder Hoplitenschild (Aspis) aus Bronze, frontal; Mitte frei für die Rüstungszahl (dunkel). |
| `lebensherz` | `lebensherz.png` | 96 × 96 | Rotes Herz aus Emaille mit Goldrand; Mitte frei für die Lebenszahl (hell). |
| `knopf-match` | `knopf-match-aktiv.png`, `knopf-match-ruhend.png` | 344 × 128 | Länglicher Bronze-Steinknopf auf dem Spielbrett, links Platz für ein Symbol, aktiv golden, ruhend grau-bronzen; Fläche frei für Beschriftung. |
| `pergamentstapel` | `pergamentstapel-1.png` … `-6.png` | 160 × 200 | Gerollte Pergamente mit rotem Band, gestapelt: 1, 2, 3, 4, 5 und 6 Rollen (das Deck wird sichtbar dünner). Unten Platz für die Kartenzahl. |
| `zugtafel` | `zugtafel-spieler.png`, `zugtafel-gegner.png` | 960 × 200 | Steintafel an zwei Ketten mit Bronzerahmen; Fläche frei für „DEIN ZUG“ / „ZUG DES GEGNERS“; Gegner kühler, dunkler Stein. |
| `chronik-eintrag` | `chronik-eintrag-spieler.png`, `chronik-eintrag-gegner.png` | 116 × 116 | Kleiner quadratischer Bilderrahmen für die Chronikleiste, **Mitte transparent** (80 %) für das Kartenbild; Spieler Goldrand, Gegner Rotrand. |

### Paket 2 – Karten und Werte (10 Teile mit `goldglanz-basar`, 20 Dateien)

| Kennung | Dateien | Größe | Motiv und Vorgaben |
|---|---|---|---|
| `werte-kristall` | `werte-kristall-blau.png`, `-gruen.png`, `-rot.png` | 160 × 160 | Ätherkristall der Kosten (sechseckig, facettiert, Goldfassung); blau normal, grün verbilligt, rot verteuert. Mitte frei für die Zahl (hell). |
| `werte-klingen` | `werte-klingen.png` | 160 × 160 | Zwei gekreuzte Klingen hinter einer runden Bronzescheibe; Scheibe frei für den Angriff (hell). |
| `werte-schild` | `werte-schild.png` | 160 × 160 | Roter Wappenschild mit Goldrand; frei für das Leben (hell). |
| `werte-turm` | `werte-turm.png` | 160 × 160 | Kleiner Steinturm mit Zinnen; frei für die Haltbarkeit (dunkel oder hell, bitte angeben). |
| `archivsiegel` | `archivsiegel-common.png`, `-rare.png`, `-epic.png`, `-legendary.png` | je 160 × 160 | Wachssiegel der Seltenheit: Bronze, Silber, Gold, Himmels-Obsidian mit Sternen. Ohne Zahl. |
| `lorbeerkranz` | `lorbeerkranz.png` | 900 × 500 | Goldener Lorbeerkranz über dem Giebel legendärer Karten (offener Bogen, Mitte oben frei für den Giebelstern). |
| `edelstein` | `edelstein-lapis.png`, `-olive.png`, `-red.png`, `-gold.png`, `-silver.png`, `-obsidian.png` | je 96 × 96 | Facettierter Edelstein in Goldfassung je Farbe. Ohne Zahl. |
| `goldglanz` | `goldglanz.png` | 160 × 800 | Weicher, schräger Lichtstreifen (Blattgold-Schimmer) mit transparenten Rändern; läuft über Goldene Karten – auch im Basar (`goldglanz-basar`, dieselbe Datei). |
| `diener-plakette` | `diener-plakette-diener.png`, `diener-plakette-bauwerk.png` | 204 × 272 | Ovale Truppensiegel-Plakette auf dem Feld: Bronze-/Steinrahmen, **Mitte transparent** für das Kartenbild, unten links Platz für Angriff, unten rechts für Leben bzw. Turm; Bauwerk mit Zinnenrand. |

### Paket 3 – Schlüsselwörter und Effekte (12 Teile, 18 Dateien)

| Kennung | Dateien | Größe | Motiv und Vorgaben |
|---|---|---|---|
| `starre-ketten` | `starre-ketten.png` | 188 × 256 | Zwei gekreuzte Eisenketten mit Schloss und Raureif-Kanten über einer Plakette; Mitte oben frei (Gesicht bleibt sichtbar). |
| `tarnung-unterholz` | `tarnung-unterholz.png` | 188 × 256 | Farne und Schatten im Unterholz am unteren und seitlichen Rand, halbtransparent; Mitte frei. |
| `gunst-aurenkreis` | `gunst-aurenkreis.png` | 300 × 360 | Schimmernder goldener Lichtring (oval) um eine Plakette, innen transparent. |
| `eiskristall` | `eiskristall.png` | 32 × 96 | Ein einzelner Eissplitter (Partikel). |
| `giftblasen` | `giftblasen.png` | 32 × 32 | Zwei, drei grüne Giftblasen (Partikel). |
| `urnengeist` | `urnengeist.png` | 64 × 64 | Aufsteigende, weiche Rauchschwade (Partikel). |
| `staubwolke` | `staubwolke.png` | 128 × 128 | Sandfarbene Staubwolke beim Aufprall (Partikel, weiche Ränder). |
| `steinrisse` | `steinrisse-1.png`, `-2.png`, `-3.png` | 440 × 240 | Risse im hellen Steintisch, flach von oben, transparent außerhalb der Risse; drei Varianten. |
| `tintenspritzer` | `tintenspritzer-1.png`, `-2.png`, `-3.png` | 220 × 220 | Getrocknete dunkelrote Tintenspritzer hinter einer Schadenszahl; Mitte etwas dichter. |
| `marschroute` | `marschroute-winkel.png`, `marschroute-spitze.png` | 64 × 64 | Rote Tintenwinkel (Chevron) und Pfeilspitze für den Angriffspfeil, gemalt wie mit der Feder. |
| `hinterhalt-rolle` | `hinterhalt-rolle-eigen.png`, `hinterhalt-rolle-gegner.png` | 72 × 128 | Kurze Pergamentrolle mit Schnur und großem Wachssiegel, leicht schräg liegend – ein gelegter Hinterhalt (AP 5.6) neben der Heldenmünze. Eigen: Siegel mit Goldrand; Gegner: dunkelrotes Siegel. Muss sich klar von den versiegelten Befehlen der Hand unterscheiden. |
| `hinterhalt-enthuellung` | `hinterhalt-band.png`, `hinterhalt-siegelsplitter.png` | 600 × 160, Splitter 32 × 32 | Pergamentband mit eingerollten Enden, Fläche frei für „Hinterhalt!“ (steht über der aufgedeckten Karte); dazu ein Splitter des brechenden roten Wachssiegels (Partikel). |

### Paket 4 – Inszenierung: Anfang und Ende (6 Teile mit `faehigkeits-effekt`, 30 Dateien)

| Kennung | Dateien | Größe | Motiv und Vorgaben |
|---|---|---|---|
| `chronik-banner` | `chronik-banner.png` | 1400 × 160 | Langes Pergamentband mit eingerollten Enden; Fläche frei für die Ankündigung der Schlacht. |
| `muenze-initiative` | `muenze-initiative.png` | 400 × 400 | Bronzemünze der Feldzug-Initiative, **Mitte rund transparent** (beide Heldenbildnisse setzt das Spiel ein). |
| `triumph-banner` | `triumph-banner-sieg.png`, `-niederlage.png`, `-unentschieden.png` | 900 × 520 | Banner an einer Querstange, Sieg rot-gold, Niederlage dunkelviolett-grau, Unentschieden blau-bronze; Fläche frei für „TRIUMPH“ usw. |
| `ergebnis-banner` | `ergebnis-banner-sieg.png`, `-niederlage.png`, `-unentschieden.png` | 900 × 240 | Flacheres Band über dem Ergebnisfenster, dieselben Farben. |
| `faehigkeitssymbole` | `faehigkeitssymbol-<held>.png` für alle 22 Helden (IDs wie `leonidas`, `khan`, `fuhao` …) | je 96 × 96 | Ein gemaltes Symbol je Heldenfähigkeit (Tabelle in README, AP L.5): z. B. Leonidas Schild, Hildegard Blatt, Vauban Schanzkorb. Das Spiel nutzt es auch für den leuchtenden Effekt (`faehigkeits-effekt`) – kein eigenes Bild nötig. *Am besten erst nach AP L.5 bestellen, falls sich Fähigkeiten ändern.* |

### Paket 5 – Menüs (12 Teile, 27 Dateien)

| Kennung | Dateien | Größe | Motiv und Vorgaben |
|---|---|---|---|
| `steinknopf` | `steinknopf-stein-normal.png`, `-gedrueckt.png`, ebenso `gold-`, `tuerkis-`, `gefahr-` | 9-Slice 360 × 108 | Steinknopf mit Bronzekante; Ecken 36 px fest, Mitte gleichmäßig (wird gedehnt), Fläche frei für Text. |
| `panel` | `panel-hell.png`, `panel-dunkel.png` | 9-Slice 512 × 512 | Tafel mit Bronzerahmen für Dialoge und Kopfleiste; Ecken 48 px fest, Mitte ruhig. |
| `reiter` | `reiter-ruhend.png`, `reiter-aktiv.png` | 540 × 112 | Steinreiter (Registerkarte) für den Basar; aktiv heller mit Goldkante. Fläche frei für Text. |
| `filterknopf` | `filterknopf-normal.png`, `filterknopf-aktiv.png` | je 96 × 96 | Runder Steinknopf; aktiv mit Goldring. Zahl bzw. Siegel setzt das Spiel darauf. |
| `manakurve` | `manakurve-frueh.png`, `-mittel.png`, `-spaet.png` | 40 × 220 | Senkrechte Ätherkristall-Säule je Phase (grün, blau, violett), wird in der Höhe beschnitten. |
| `heldengalerie` | `heldengalerie-medaillon.png` | 512 × 512 | Großes Medaillon mit Rändelung, **Mitte rund transparent** für das Porträt. |
| `heldenmuenze-basar` | – | – | Nutzt `heldenmuenze-spieler.png` aus Paket 1. |
| `miniatur-spielfeld` | `miniatur-spielfeld.png` | 1000 × 700 | Kleiner Feldherrentisch in Schrägsicht mit ein paar Münzen und Plaketten; die Tischplatte bleibt frei (das Spiel legt den gewählten Tisch darauf). |
| `missionssiegel` | `missionssiegel-offen.png`, `-vollendet.png`, `-versiegelt.png`, jeweils auch `-belagerung` | 128 × 128 | Wachssiegel einer Kampagnenstation; Belagerung mit kleinem Turm. |
| `weltkarte` | `weltkarte.png` | 2160 × 1280 | Gemalte Karte Europa und Mittelmeer (Pergament, Küsten, Meere, keine Beschriftung), Kästchen „Neue Welt“ unten links frei. Küstenverlauf wie `quellcode/assets/game/assets/art/weltkarte.svg` (beilegen). |
| `feldherrentisch` | `feldherrentisch-gravur.png` | 3200 × 1600 | Nur die eingeritzte Karte über den Tischen: Kompassrose in der Mitte, Loxodromen, Gradnetz, sehr zart; alles andere transparent. |
| `stufenpyramide` | – | – | Ist der Spielstein `pyramid` – steht im Kartenauftrag `ASTRA_AUFTRAG.md`. |

## Abnahme

- Datei als PNG mit Transparenz, doppelte Größe, exakt der Dateiname der Tabelle.
- Keine Schrift und keine Zahlen; die freien Flächen sind ruhig genug für die Zahl des Spiels.
- Varianten deckungsgleich (gleiche Größe, gleiche Lage).
- Gemalt wie die Referenzen – eine flache Vektorgrafik wird nicht angenommen.
