# Einbauanleitung — Teil 03 (noch nicht eingebaut)

Grundlage ist ausschließlich das angehängte Originalprojekt 1.20.0 mit Teil 01 und Teil 02. Alle Zielpfade stehen im Manifest. Die Originalarchive und das Spiel wurden nicht verändert. Dieses Paket liefert Dateien und Hilfsfunktionen zur späteren manuellen Integration.

## 1. Filter

`assets/ui/*` nach `quellcode/assets/game/assets/ui/` kopieren. Die Normal-/Aktiv-Dateien für mana/common/rare/epic/legendary stammen weiterhin aus Teil 01; für **basic** sind sie neu enthalten. `basic` ist die fünfte Seltenheit in `view/collection.js` und fehlte im bisherigen UI-Set.

Alle Buttons sind 192×192 Pixel für eine logische 96×96-Anzeige. SVG und PNG sind alternative Darstellungen. Mana-Ziffern 0–6 und 7+ bleiben dynamischer Text; Beschriftungen und ARIA-Attribute bleiben im Code.

Die vier Seltenheiten verwenden schon in Teil 01 identische Grundknöpfe. Für ihre sichtbare Unterscheidung die vorhandenen `archivsiegel-common/rare/epic/legendary.png` aus Teil 01 als zweite Ebene bei `[46,46,100,100]` über den Knopf legen (192er Quellkoordinaten). Sie tragen Bronze, Silber, Gold und Obsidian. `filterLayers` gibt `emblem`, `emblemRect` und `emblemOpacity` dafür zurück. Reihenfolge: Grundknopf → Siegel → Auswahl-Overlay → dynamische Beschriftung. Die wiederverwendeten Siegel werden hier nicht als neue Motive mitgeliefert. Gleichartige Knopfhintergründe dürfen im Cache geteilt werden.

`integration/ui-r03.js::filterLayers` liefert die passenden Dateien. Priorität: Disabled → Pressed → Fokus → Hover → ausgewählt → Normal. Das separate Auswahl-Overlay hält den Zustand `aria-pressed` sichtbar, wenn ein anderer Interaktionszustand angezeigt wird. Pressed verschiebt das Overlay um 2/4 Quellpixel; Disabled reduziert dessen Deckkraft. Bei gleichzeitiger Tastaturfokussierung und Pressed zusätzlich eine CSS-Outline setzen, da Fokus sichtbar bleiben soll. Disabled muss als echtes HTML-Attribut gesetzt werden; eine graue Grafik allein sperrt keine Eingabe.

SVG/PNG-Fokus darf von einer äußeren CSS-Outline ergänzt werden. Beispiel: `:focus-visible { outline: 3px solid #152b46; outline-offset: 3px; }`. Buttons nicht nur anhand von Farbe unterscheiden; der Auswahlhaken ist deshalb separat enthalten. Keine zusätzlichen goldenen Auswahlringe aus Teil 01 darüberlegen.

## 2. Kartenrahmen-Masken

`assets/masks/*` nach `quellcode/assets/game/assets/masks/`. Jede Maske gehört **exakt** zum gleichnamigen Rahmen aus Teil 01 ohne Suffix `-clip`. Die tatsächlichen Rahmenabmessungen unterscheiden sich geringfügig (1055/1056 × 1489/1490); nicht auf eine vermeintlich gemeinsame Größe runden.

Masken: weißes RGB mit Alpha, innen deckend, außen transparent. Das zentrale zusammenhängende Bildfenster wurde aus dem Originalalpha gewonnen und um drei Quellpixel unter den Rahmen erweitert. Es ist nicht der äußere Kartenumriss und nicht das Textfeld. Erst Motiv auf eine isolierte Zeichenfläche zeichnen, dann `destination-in` mit der Maske, anschließend Rahmen darüber. `drawFramedArt` zeigt die Komposition. Für sinnvollen Bildausschnitt im Spiel die Motivposition im Fenster anpassen; die Hilfsfunktion verwendet nur einen zentrierten Cover-Crop.

Als letzten Parameter `apertureBox` den Wert `aperture_bbox` aus dem Manifest übergeben (links, oben, rechts, unten). So richtet sich der Cover-Crop am Bildfenster aus und nicht an der gesamten Karte.

Keine Maske mit `destination-in` direkt auf das gesamte Spielbrett anwenden. Goldglanz, der den äußeren Kartenumriss benötigt, verwendet weiterhin die eigene äußere Kartenkontur, nicht diese Bildfenstermasken.

## 3. Chronikleiste

`assets/ui-art/chronikleiste-{oben,mitte,unten}.png` in den gleichnamigen Zielordner kopieren. `CHRONIK_MAPPING.json` beschreibt die drei verlustfreien Quellrechtecke. Zusammengefügt ergeben sie exakt das Original aus Teil 01, ohne Beschneidung oder Neumalerei.

Ziel 140×1100: Breite einheitlich 140; obere Kappe etwa 45,99 hoch, untere 44,79 hoch; die Mitte füllt die verbleibende Höhe. **Nur die Mitte strecken.** `drawChronicle` berechnet dies anhand der echten Bildgrößen. Ganze Rollen oder Endkappen nicht auf die volle Höhe ziehen. Kleine natürliche Pergamentstrukturen in der Mitte werden dabei länglich; das ist die dokumentierte 3-Slice-Ableitung.

## 4. Hauptmenü

`HAUPTMENUE_MAPPING.json` bezieht sich auf die Datei `game-assets/art/hall-aeterna.webp` aus Teil 01 (2602×1084), deren SHA-256 hinterlegt ist. Vier Platten, vier Medaillon-/Schienenkombinationen und Einstellungen sind als konservative innere Trefferflächen vermessen. Titel-/Goldfelder, Stern, Ring und Lichtellipse sind ebenfalls angegeben. Das SVG/PNG ist eine **Entwickler-Überlagerung**, kein sichtbares Hintergrundbild im Spiel.

Koordinaten sind Bildpixel, keine alten Konzeptpixel. Umrechnung: `stageX=(sourceX-217)*800/1084`, `stageY=sourceY*800/1084`. Für die bisherige `hall.js`-Geometrie alternativ `conceptX=sourceX-301`, `conceptY=sourceY+24` verwenden. Nicht beide Umrechnungen anwenden. `sourceToStage`, `stageToSource` und `hitMenu` liefern die explizite Variante. Für CSS-Crops dieselben neuen Punkte wie für Trefferflächen einsetzen. Die vier Platten werden über ihren Index an `view.plates[i].go` gebunden; Spielmodusnamen nicht aus Bildpositionen erraten.

Die neue Treffergeometrie setzt die vollständige Deckung des Bildes mit der vorhandenen Bühne voraus. Nach einem Wechsel von Hintergrund, Beschnitt, Zoom oder Layout muss dieselbe Transformation auch auf Eingaben angewendet werden. Im späteren Spiel prüfen: Plattenränder, Medaillons, Einstellungen, breite Android-Seitenflächen. Der kurze Dateitest ersetzt diesen Laufzeittest nicht.

## 5. Android

Den Inhalt von `android-res/` später nach `android/app/src/main/res/` übernehmen. Vier VectorDrawables bilden das Bronze-/Goldmedaillon von Teil 01 in nativen Pfaden ab. Der Launcher nutzt eine 108×108-Viewport; die sichtbare Form liegt innerhalb des zentralen sicheren Kreises. Die Monochrom-Fassung enthält nur Silhouette und Ring; Tönung erfolgt durch Android. Splash nutzt eine 288-dp-Fläche mit entsprechend freiem Rand.

Zusätzliche Konfiguration: `mipmap-anydpi-v26/ic_launcher.xml` enthält Hintergrund und Vordergrund; ab API 33 ergänzt die gleichnamige Datei unter `mipmap-anydpi-v33/` die monochrome Ebene. `drawable/splash_window.xml` verwendet dieselbe Splash-Grafik für die ältere Startfensterdarstellung. Die vorhandene `values-v31/themes.xml` verweist bereits auf `@drawable/splash_icon` und bleibt unverändert. `@color/hall` bleibt aus dem Projekt erhalten. Paket-ID, Signatur, Versionscode und Gradle-Dateien nicht ändern.

XML wurde geparst und Ressourcen wurden lokal zugeordnet. Es wurde keine APK gebaut und kein Gerätetest durchgeführt. Keine Aussage über eine bereits erfolgreich getestete Android-Integration.

## 6. Atlanten

Drei PNG-Atlanten: Filter, Masken, Chronik. Rechtecke `[x,y,width,height]` und Zielpfade stehen in `ATLAS_MANIFEST.json`, jeweils vier Pixel transparenter Abstand. **Keine Kartenatlanten und nicht für `R.tile` bestimmt.** `drawAtlasSprite` zeigt die Rechteckadressierung. Einzeldatei oder Atlas nutzen; nicht beide gleichzeitig laden. Maskenatlas verlustfrei belassen.

Hauptmenü-Geometrie und Android-XML werden nicht in einen UI-Spriteatlas gezwungen. Es gibt keine neuen `art`/`cell`-Zuordnungen für Karten oder Tokens.

## 7. Fortsetzung

Die reguläre Liste mit 295 Aufträgen bleibt maßgeblich. Alle 41 geretteten Bildmotive und die bereits gelieferten Karten/Tokens bleiben gesperrt; `hypatia_0` und `hypatia_2` nicht bearbeiten. `DUBLETTENSPERREN.json` bündelt die Sperren ergänzend, ohne die originalen Sperrdateien zu verändern. `gerettet.zip` bleibt eigenständig erforderlich.
