# Einbauanleitung — Teil 01

**Verbindlicher Lieferumfang:** Dieses Paket enthält 9 von 350 Karten, keine der 27 Tokens, aber alle 22 Helden und vier Skins. Alle Aussagen über die vollständige Ablösung der Platzhalter gelten erst nach späteren Lieferungen. Nur IDs im Mapping dieses Pakets verändern. Bestehende Atlanten und fehlende Motive vorläufig erhalten.

Die neuen Porträt-, Skin- und Kartenatlanten tragen den Präfix `r01-`, um alte Bilddateien beim schrittweisen Einbau zu erhalten. Vor jeder Zuweisung die Verfügbarkeit im Mapping prüfen.

## Verbindliche Grundlage

Quellwurzel: `quellcode/assets/game/`. Die folgende Anleitung gilt für den mitgelieferten Ausgangsstand 1.20.0. Vor Einbau gegen den aktuellen GitHub-Stand abgleichen, falls dort inzwischen andere Karten oder IDs existieren. Dieses Paket enthält keine Änderungen am eigentlichen Spiel.

Alle Zuordnungen erfolgen **über IDs**, niemals über alphabetische Sortierung oder den historischen Klang einer ID. `khan` ist Widukind, `boudicca` Vercingetorix, `nostradamus` Böttger, `jeanne` Hildegard, `ragnar` Wiprecht, `musashi` Ulrich, `amanirenas` Ahhotep, `masako` Theophanu, `mandukhai` Thusnelda, `zizka` Vauban und `fuhao` die Fürstin von Vix. `steppe` bezeichnet Frühzeit/Ägypten, `ostasien` Frühe Neuzeit. IDs bleiben erhalten, damit vorhandene Spielstände gültig bleiben.

## 1. Karten, Helden, Tokens und Skins

Empfohlener Weg: `game-assets/art/*.webp` nach `quellcode/assets/game/assets/art/` kopieren. Die Atlanten haben 4 Spalten × 3 Zeilen und jeweils 724×724 Pixel pro Zelle. Die bestehende Funktion `R.tile` in `view/match/render.js` teilt bereits durch 4 und 3. `ATLAS_MANIFEST.json` nennt belegte Zellen und ausdrücklich unbenutzte Restfelder; diese sind keine fehlenden Motive.

In `model/data.js` nach vollständiger Konstruktion aller Arrays/Objekte die Werte `art` und `cell` aus `KARTEN_HELDEN_MAPPING.json` zuweisen. Karten: `cards`, Helden: `heroes`, Spielsteine: `tokens`. `byId` kann dieselben Objekte referenzieren; Reihenfolge und Referenzidentität prüfen. In Teil 01 ausschließlich die neun enthaltenen Karten ersetzen. Für alle anderen Karten vorhandene Zuordnungen und `missingArt` beibehalten; die vollständige Bereinigung erfolgt erst mit den späteren Lieferungen.

**Noch offen:** Der Token `pyramid` ist in Teil 01 nicht enthalten. Den Sonderfall `art === '@pyramid'` und seine bisherige Darstellung vorerst erhalten. Erst nach Lieferung des Tokens auf eine reguläre Atlas-Zelle umstellen. Token-IDs wie `terracotta` und `taborite` ebenfalls nicht wörtlich auslegen: sie heißen heute Musketier und Füsilier.

**Atlas-Lader:** `R.atlases()` lädt im Ausgangscode `board`, `heroes`, `heroes-marble` und Kartenatlanten aus `D.byId`. Zusätzlich alle `art`-Werte aus `D.heroes` laden, damit `r01-heroes` und `r01-heroes-2` bei Heldenwahl und Duell verfügbar sind. Skin-Atlanten ebenfalls explizit laden. Keine falsche Ersatzgrafik aus `R.images.heroes` akzeptieren, wenn ein Name fehlt: fehlgeschlagene Pfade während des Einbaus protokollieren.

**Skin-Zellen:** Die vier aktuellen Marmorhallen-Skins sind in `r01-heroes-marble` in den Zellen 0–3 angeordnet. Die Zuordnung steht im Mapping. Der Ausgangscode kann für Skins die Zelle des Basishelden verwenden; für diese vier Helden entspricht das 0–3. Zusätzlich den Skin-Atlasnamen im Renderer von `heroes-marble` auf `r01-heroes-marble` umstellen oder explizit aus dem Mapping laden. Bei später hinzugefügten Skins nicht diese Übereinstimmung voraussetzen.

**Einzelbild-Alternative:** `assets/cards`, `assets/heroes`, `assets/tokens` und `assets/skins` können direkt verwendet werden. Dafür muss der Renderer zwischen Einzelbild und Atlas unterscheiden und bei Einzelbildern das vollständige Bild zeichnen. Diese Einzelbilder nicht unverändert durch die bestehende 4×3-Aufteilung schicken. Nur einen der beiden Wege aktiv nutzen, um redundante Downloads zu vermeiden.

`BESTEHENDE_DATEIEN.json` nennt für jede bisherige Datei in `assets/art/`, ob sie ersetzt oder nach Umstellung aller Verweise durch neue Atlanten abgelöst wird. Alte Kartenatlanten in dieser Teillieferung noch nicht löschen: andere Karten verwenden sie weiterhin. Die mitgelieferten Helden werden dagegen vollständig auf die aktuellen historischen Personen umgestellt.

## 2. Spielfelder und Basar

Fünf Spielfelder: `board`, `board-athen`, `board-kapitol`, `board-skriptorium`, `board-porzellan`, jeweils mit `-preview.webp`. Laufzeitbild 3200×1600, Vorschau 480×240. Das Laufzeitformat ist aus dem tatsächlichen Generierungsformat exportiert; native Bildabmessungen stehen im Manifest.

In `model/cosmetics.js` für jeden aktiven Board-Eintrag `image` entsprechend dem Mapping setzen und den bisherigen `tint` entfernen. `price`, `id`, Besitz und Erstattung unverändert lassen. Für erfolgreich eingebundene neue Spielfelder entfallen danach die Hinweise „Bild folgt“ in `view/shop.js`; nicht einfach nur Hinweise entfernen, solange die Dateien noch nicht geladen werden.

`assets/backgrounds/basar.webp` wird Hintergrund der `.bazaar`-Fläche in `view/css/stone.css`. Dunkle alte Überblendungen soweit reduzieren, dass die warmen Materialien lesbar bleiben; Kontrast der Texte weiterhin prüfen. `praesentationspodest.png` ist die freigestellte Podestebene: die gemalte Hintergrundfassung und das separate Podest nicht doppelt übereinander zeichnen. Entweder das feste Podest des Hintergrunds verwenden oder im Bildaufbau den separaten Sockel an seine Stelle setzen.

Kartenrücken in `assets/cardbacks/kartenruecken-<id>.webp` ersetzen die generierten SVG-Rücken aus `view/stone.js`. ID-Zuordnung entspricht dem Katalog. Die vorhandene CSS-Drehung, Vorder-/Rückseite und Rückseitenverdeckung behalten. Keine Namen oder Preise in Bilder einbrennen.

`heldenmuenze-basar` ist ein transparenter Münzrand. Dahinter den ausgewählten Skin kreisförmig beschneiden, darüber den Namen als Text setzen. `miniatur-spielfeld` ist ein separater perspektivischer Rand; darunter das gewählte neue Board einsetzen. Alternativ die bestehende CSS-Perspektive mit dem neuen Board beibehalten. Die Vorschau darf niemals ein anderes Material zeigen als das gekaufte Feld.

## 3. Hauptmenü, Sammlung, Heldenwahl, Pakete

`game-assets/art/hall-aeterna.webp` ist die überarbeitete Menütafel. **Die Bildgenerierung garantiert keine pixelidentischen Konturen.** `view/hall.js` enthält fest gemessene `ART`, `PLATES`, `RAILS`, `KNOB`, `STAR` und `GOLD_LINE`. Diese Treffer- und Ausschneidepolygone auf dem neuen Bild kontrollieren und nötigenfalls neu messen. Die Ausgabe hat 2602×1084; die bestehende Bühnenumrechnung bleibt der Ausgangspunkt. Besonders breite Android-Displays mit seitlichen Flügeln prüfen.

Die zusätzlichen Hintergründe `sammlung`, `heldengalerie` und `pakete` ersetzen die jeweiligen Flächen in `view/css/screens.css`, `stone.css` und `packs.css`. Nicht mit `view/setup.js` verwechseln: `assets/backgrounds/heldengalerie.webp` ist der Raum, `assets/ui/heldengalerie.png` der transparente Porträtrand.

`kartenbuch.png`: leere Seiten liegen hinter den realen Karten; Buchblättern weiterhin im Code. `filterknopf-*`, `manakurve-*` und `reiter-*` ersetzen die CSS-Grundformen. Mana-Ziffern, Kurvenhöhen und Auswahlstatus aus ViewModel-Daten beziehen.

`kartenpaket.png`: versiegeltes Paket für die Öffnung. Animation und tatsächliche Karten getrennt halten. `startbefehle.png`: Schriftrollenebene der Startkarten; darüber Kartenmotive, Werte und Austausch-Siegel. Keine komplette Karte durch eine unveränderliche Grafik ersetzen.

## 4. Match-Renderer und Effekte

`ASTRA_EINBAU.md` und `ASTRA_ABDECKUNG.json` enthalten jede markierte Zeichenstelle mit Quellpfad und Zeile. Die Zeilennummern beziehen sich auf das Eingangsarchiv; Marker und Funktionsname sind bei verschobenen Zeilen maßgeblich.

Kartenrahmen: getrennte Motive für Diener, Zauber und Bauwerke, jeweils normal und golden. Die Bildfenster benötigen eine Clip-Maske, die anhand der realen Rahmenkontur gemessen wird. Vorhandene `gatePath`-Geometrie nicht blind als exakte Maske des neuen Gemäldes verwenden. Rahmen über dem Motiv, Textfelder und Werte darüber. Angegebene Zielgröße 800×1128; tatsächliche Dateigröße im Manifest. Namen, Kosten, Angriff, Leben, Haltbarkeit, Seltenheit und Kartentext bleiben dynamisch.

Held: Porträt → kreisförmiger Clip → Münzrand → Name/Status. Fähigkeit: neutraler Herrschersiegel-Grundkörper → heldenspezifisches Symbol → Zustandsanzeige. Es gibt 22 individuelle Fähigkeitssymbole und 22 Effektbilder, passend zu den aktuellen Heldennamen. Der Fähigkeitseffekt wird im Code skaliert, bewegt und ausgeblendet; die bestehende Effektlogik bleibt erhalten.

Mana: Grunduhr für 0–10 gefüllte Kristalle, zusätzliche Kristallzustände voll/verbraucht/gesperrt/fehlt und separat gerenderte Zahlen. Sperren hängen von der aktuellen Partie ab; die bloße Uhr mit n Kristallen ersetzt keine Belastungslogik.

Deck: sechs Pergamentstapel für 1–6 sichtbare Rollen; Anzahl anhand des tatsächlichen Deckstands bestimmen. Bei leerem Deck die Sanduhr. Gegenspielerhand: `versiegelte-befehle`. Chronikleiste: Der gemalte Grund hat ein weniger schmales Seitenverhältnis als der Platzhalter im Code. Endkappen erhalten und den mittleren Pergamentbereich separat strecken oder wiederholen; nicht das ganze Bild auf 140×1100 verzerren. Dazu `chronik-eintrag-spieler/gegner`, darüber jeweiliges Kartenmotiv oder Fähigkeitssymbol.

Effekte: Schildwall hinter die Plakette; Starre-Ketten und Unterholz darüber; Phiole und Urne an den Rand; Gunst-Kreis unter beziehungsweise um den Rand. Alpha unverändert erhalten, keine deckende Hintergrundfarbe hinzufügen. Tintenspritzer liegen hinter der Schadenszahl, Steinrisse unter der landenden Karte. Staubwolke besitzt acht Einzelbilder (`00`–`07`, 60 ms pro Bild), alle mit gleicher Ankerlage (128,190). Andere Effekte nutzen die bestehende Animationslogik mit den neuen Sprites. `goldglanz` wird an die Kartenkontur geclippt und verschoben. Bei reduzierter Bewegung ruhende Endzustände verwenden.

Zugtafel, Chronik-Banner und Ergebnisbanner sind absichtlich ohne Schrift. „Dein Zug“, „Zug des Gegners“, „TRIUMPH“, „NIEDERLAGE“ und „UNENTSCHIEDEN“ mit den vorhandenen Offline-Schriften darüber rendern. Damit bleiben Lokalisierung und Lesbarkeit erhalten.

## 5. Technische Vorgaben

- SVG und PNG einer UI-Datei sind Alternativen, keine gleichzeitig übereinanderzulegenden Ebenen. Für Canvas die dekodierten PNGs im bestehenden Sprite-Cache halten.
- `slice` im Manifest ist `[oben,rechts,unten,links]` in Pixeln der angegebenen SVG/PNG-Größe. Ecken erhalten; Kanten und Mitte separat skalieren. Malerische Kartenrahmen sind keine 9-Slice-Panels.
- Natürliche Schatten liegen innerhalb transparenter Dateien. Keine weißen Freistellungsflächen einsetzen. Alpha im Android-WebView prüfen.
- Kartenatlanten auf 4×3 halten. Bei Mipmapping/Linearfilterung höchstens bis zur Zellenkante sampeln, damit keine Nachbarzellen hineinbluten. Einzelbilder bieten eine Alternative, falls Gutter benötigt werden.
- Assets offline paketieren; keine externen Bild-URLs verwenden. Durchsuchen des Katalogs funktioniert offline.
- Schriftlizenzen aus dem Projekt unverändert erhalten. Generierte Bilder und selbst erstellte Vektoren werden im Paket getrennt gekennzeichnet. Die geografische Karte basiert auf den im Projekt vorhandenen Natural-Earth-Daten; den Herkunftsvermerk erhalten.
- Android-Icon: `app-icon` als vollständige Marketing/Launcher-Grafik; `app-icon-foreground` als transparente Vordergrundebene. Hintergrund separat auf die Steinfarbe setzen. Adaptive Icon-Safezone und `splash-icon` gegen runde und abgerundete Masken prüfen. Die Monochrom-Variante aus dem Sternmotiv ableiten beziehungsweise die bestehende Vektorversion mit passender Geometrie aktualisieren.

## 6. Abnahme im eigentlichen Spiel

**Teil 01:** Zunächst nur die 9 gelieferten Karten, 22 Helden, vier Skins, fünf Spielfelder und die tatsächlich eingebauten UI-Gruppen prüfen. Die folgende vollständige Abnahme ist erst für den Abschluss aller Lieferungen vorgesehen.

Nach Integration alle 350 Karten, 27 Tokens, 22 Helden und vier Skins durchlaufen. Es dürfen keine aktiven „Motiv folgt“- oder „Bild folgt“-Anzeigen mehr erscheinen. Jede der fünf Tischvarianten auswählen, im Basar und im Match vergleichen. Alle Seltenheiten, normale/goldene Rahmen, Mana-/Sperrzustände, Sieg/Niederlage/Unentschieden und Startkartentausch prüfen.

Hauptmenü-Trefferflächen, Kreis-Crops, Textüberläufe langer Namen, Transparenz, Hoch-/Querformatwechsel und breite Android-Seitenflügel gesondert kontrollieren. Bestehende Tests im Projekt nach den notwendigen Integrationsänderungen ausführen. Aus diesem Assetpaket allein folgt noch keine Aussage zur Laufzeitperformance oder zur Fehlerfreiheit der späteren Integration.
