# Aeterna 1.23.0 – Bauen & Prüfen

*Vormals „Chroniken der Helden“.* `android/` ist die native Hülle (Gradle, Kotlin), `quellcode/assets/game/` das Web-Spiel,
das sie unter `https://chroniken.local/` ausliefert. Die Signatur erzeugt Gradle mit `signatur/chroniken-test.p12`.

## Neu in 1.23.0 (AP L.5 Heldenfähigkeiten aus der Geschichte, Rückmeldung zu 1.22.0)

- **Heldenfähigkeiten** (`model/data.js`, Entscheidung 20: alle Empfehlungen der Prüftabelle in der README): Hypatia
  *Unterricht* (ruft den neuen Spielstein `student`, „Schüler der Hypatia“ 1/2 mit `focus:1`, hinten an `tokens` angehängt),
  Imhotep *Baumeister des Djoser* (`buffWeakest` 0/+2), Vercingetorix *Kein Korn für Caesar* (`aoe` 1 und `overload:1` an der
  Fähigkeit); neue Namen für Nezahualcóyotl, Thusnelda und die Fürstin von Vix. `engine.js`: `power()` bucht `ability.overload`
  als Belastung, `canPower` verlangt für `buffWeakest` einen eigenen Diener. `fx.js`: `CHF.POWERS` für die drei neuen Wirkungen.
- **Tat zur Fähigkeit:** `AELORE.deeds`/`AELORE.deed(id)` (`model/lore.js`) – ein Satz mit Quelle je Held, in der Heldenwahl unter
  der Fähigkeit (`Setup.view.deed`, `.power-deed` in `screens.css`); Spielstil-Texte der fünf betroffenen Helden neu.
- **Steintür** (Rückmeldung): `astra_bilder.py` schneidet die rechte Hälfte auf die Tür zu und spiegelt sie für links
  (`UI`-Einträge mit drittem Feld `beschnitten`/`gespiegelt`); `astra.css` setzt beide Flügel an die Naht.
  `NEW_MOTIFS` liefert Motive für neue IDs ohne Briefing-Zeile (heute `student`).
- **Leuchtrahmen** (Rückmeldung): `gateGlow(color,blur,key)` in `render.js` nimmt die Silhouette des gemalten Rahmens
  (`frameKey`: Art und gold/normal) samt Bildfenster, doppelt gezeichnet; ohne Bild bleibt das gezeichnete Tempeltor.
- Tests: neu `tests/faehigkeiten.test.js`, angepasst `heldenbalance.test.js` und `schluessel.test.js`. Voller Balance-Lauf,
  alter Bericht als `balance/BERICHT-1.22.0.md`. Version 1.23.0 / versionCode 26.

## Neu in 1.22.0 (AP A.2 Astra-Oberfläche, Entscheidung 19)

- **`astra_bilder.py`** schreibt zusätzlich `assets/ui/<name>.webp` (Liste `UI`: Kartenrücken, Kartenrahmen, Chronikleiste in drei
  Stücken, Stundenglas, Befehle, Waffenablage, Schildwall, Phiole, Urne, Paket, Podest, Kartenbuch, Startbefehle, Steinplatten),
  die Währungen als SVG, Hintergründe nach `assets/art/` (`menu`, `bg-*`, `hall-aeterna`) und in `model/bilder.js` die Felder `ui`
  (Name → Maße) und `windows` (Bildfenster der Rahmen aus Astras Clipmasken, auf 200 × 282). `BLOCKED` ist leer (Entscheidung 19).
- **Laden:** `CHS.loadUI()` (`view/stone.js`) lädt alle `CHB.ui`-Bilder neben `H.preload`; `CHS.ui[name]` ist das Bild.
  `R.pic(c,name,cx,cy,w,h)` zeichnet eines eingepasst und meldet, ob es da war – jede Zeichenfunktion behält ihre Zeichnung als
  Ersatz. `R.card` → `paintedCard` (Lagen je Rahmen in `PAINTED`), `CHS.paintBack`, `stripArt` (3-Slice), `hourglassArt`,
  `orderArt`, `weaponRack`, `CHF.shieldWall`/`vial`/`urn`; DOM-Bilder in `view/css/astra.css` (zuletzt geladen).
- **Android:** `res/drawable/ic_launcher_*.xml`, `splash_icon.xml`, `splash_window.xml` aus Teil 3 (Vektor).
- Test `tests/astra.test.js` um die Oberfläche erweitert; Klickpfad-Referenzbilder neu. Version 1.22.0 / versionCode 25.

## Neu in 1.21.0 (AP A.1 Astra-Bilder)

- **`astra_bilder.py`** (Pillow, Node): sammelt alle Astra-Lieferungen aus `ungenutzte_assets/neue_astra_assets/` je ID (Ordner in
  `FOLDERS`, gerettete Bilder über Astras Zuordnung, Mamlukenbilder in `BAIBARS`), schreibt Kartenatlanten
  `assets/art/astra-karten-NN.webp` (4 × 3 à 362 px), Helden `heroes`/`heroes2` (à 384 px), `heroes-marble`, fünf Tische mit Vorschau,
  `model/bilder.js` (`CHB`: ID → Atlas, Feld), `ungenutzte_assets/ASTRA_STAND.csv` und `ASTRA_AUFTRAG.md`; löscht alte
  Kartenatlanten ohne Karte. Danach `node werkzeuge/motive.js`. `bilder_webp.py` liest jetzt `archiviert/art-original/` und
  überspringt, was Astra ersetzt hat.
- **Spiel:** `index.html` und `labor/renderer.html` laden `model/bilder.js` vor `data.js`; `data.js` legt die Zuordnung über Karten,
  Spielsteine und Helden. `render.js`: Heldenbild immer aus `hero.art`/`hero.cell` (`R.heroStyle`, `medal`, Intro), `R.atlases()`
  lädt die Heldenatlanten der Helden. `cosmetics.js`: Tische mit `image` statt `tint`.
- Test `tests/astra.test.js`; Klickpfad-Referenzbilder 03–13 neu. Version 1.21.0 / versionCode 24.

## Neu in 1.20.0 (AP 3.6 Schlüsselwort-Effekte, AP 3.8 Anfang und Ende des Matches, Rückmeldung zu 1.19.0)

- **Effekte** `view/match/fx.js` (`CHF`, nach `motion.js` geladen, nutzt `R.paint` und `R.medal` aus `render.js`): Bilder auf der
  Plakette `shieldWall`, `frost`, `stealth`, `vial`, `urn`, `ring` (im Plaketten-Sprite), umlaufender Schimmer `aura` (je Bild);
  Ereignisse `CHF.event(ev,pos,t,fx)` aus `R.events` (Gunst `gunst`, Starre `frostburst`, Gift `poison`, Urne `urn`; gibt `true`
  zurück, wenn es den Klang übernimmt); Elemente `CHF.element(card)`, `ELEMENTS`, Fähigkeiten `POWERS`/`power(hero)` (Element,
  Bahn, Farbe), Orb `CHF.orb` (aus `M.overlay`), Ausbruch `CHF.cast(x,t)` (aus `impact`), Zeichenfunktionen `CHF.paint` (aus `effects`).
- **Inszenierung**: `CHF.present(kind,info,done)` für `opening` (Helden, Chronist, Münzwurf) und `finale` (Relief bricht, Banner,
  Hörner); `busy`, `skip` (Tippen), `cancel` (ruft `done`), `stop` (ohne `done`), `hidden(p)`, `draw` (zuletzt in `R.draw`). Bei
  reduzierter Bewegung ruft `present` sofort `done`. `board.present` in `board.js` leitet weiter und kennt dazu `mulligan`
  (wartet `ROLL` ms) und `deal` (`M.deal(before,after)`: neue Karten aus dem Stapel, die Gunst der Stunde aus der Tischmitte).
- **ViewModel** (`viewmodel/match.js`): `present`, `open`/`opening(s)` (einmal je Partie, wartet über `waiting`/`arrived()` auf den
  Übergang der Shell), `acceptHand` → `rolling` → `keepHand`, `showResult` → `finale` → `result(staged)` mit `rewardBars(s)`
  (Gold, offene Aufgaben ab dem Stand vor der Partie über `tallied`, Kampagne). `app.js`: `release()` ruft `arrived()`.
- **Views**: Starthand als Schriftrollen (`view/dialogs.js`, CSS in `screens.css`), Ergebnis mit Banner und Balken; Kartenbuch:
  `view.leaf` ({front, back, under}) und Blatt mit zwei Seiten (`leaf-face`), `visibility` statt `opacity` in den Keyframes.
- **Klänge**: `schluessel_klang.py` (numpy, ffmpeg) erzeugt `clink`, `chains`, `poison`, `toss`, `horn` (je zwei Varianten, CC0);
  `oberflaeche_klang.py` mit leiserer Uhrwerk-Glocke. Pegel in `CHA.levels`, Messwerte in `tests/schluessel.test.js`.
- **Messung** `matchmessung.js`: Brett mit allen Schlüsselwörtern, Gefecht mit Gunst, Starre, Gift und einem Zauber-Ausbruch je
  250 ms. Klickpfad: Schriftrollen und Ergebnis-Balken, neue Referenzbilder 09 und 12. Version 1.20.0 / versionCode 23.

## Neu in 1.19.0 (AP 1.4 Basar, AP 1.6 Sammlung, AP 1.7 Heldenwahl und Kampagnenkarte, Rückmeldung zu 1.18.0)

- **Basar** (`viewmodel/shop.js`, `view/shop.js`, CSS in `stone.css`): `Shop.picked(kind)`, `showcase`, `select(kind,id)`
  (ersetzt den Vorschau-Dialog `shopPreview`; `preview` ruft `select`), Kauf-Zeichen `state.bought` ({kind,id,n}, neuer Knoten
  `buy-<n>` → CSS-Animation). `CHA.play(name,{delay})` startet verzögert.
- **Sammlung** (`viewmodel/collection.js`, `view/collection.js`, CSS in `screens.css`): `page(±1)` setzt `turn`, `pick(k,v)` für
  Mana/Seltenheit (zweiter Tipp = alle), `inspect(id,slot)` → `CardDialog.state.slot` (Zoom vom Platz), `curveOf`, `curveHint`
  (Phasen, Ø, Warnung), `view.bars`, `view.ahead` (Nachbarseiten, im Leerlauf vorgezeichnet), `state.flight` ({id,bar,n}).
- **Heldenwahl** (`viewmodel/setup.js`, `view/setup.js`): `GALLERY` (Helden je Zeitalter), `view.age/school/life/style/favorites`
  aus `model/lore.js`, `inspect(id)` öffnet die Großansicht `zoom`. `app.js` zeichnet Medaillons und Lieblingskarten nach dem
  Laden der Atlanten im Leerlauf vor (je Leerlauf-Scheibe ein Bild).
- **Kampagnenkarte** (`viewmodel/campaign.js`, neu `view/campaign.js`): `MAP` (Projektion 1080 × 640, Kästchen „Neue Welt“),
  `PLACES`, `STATIONS` (auseinandergeschoben, ≥ 51 Einheiten), `picked`, `pick`, `start`, `route`. Die Küsten
  `assets/art/weltkarte.svg` schreibt `werkzeuge/weltkarte.js` aus Natural Earth `land-50m.json` (`npm pack world-atlas@2.0.2`,
  nicht im Repo) mit derselben Projektion. `buehne.js` liefert `.svg` als `image/svg+xml`.
- **Rückmeldung 1.18.0** (`render.js`): Zugwechsel `turn:'chime'`, Splitter `SHARDS` langsamer, `life` 560, Staub `weight .05`;
  `glint` verschiebt um die halbe Karte; `plateSize` misst den Text der Zugtafel.
- **Klänge**: `oberflaeche_klang.py` (numpy, ffmpeg, nutzt `spielgefuehl_klang.py`) erzeugt `chime`, `coins`, `seal`, `page`
  (je zwei Varianten, CC0) und gibt die Pegel aus; Pegel in `CHA.levels`, Messwerte in `tests/oberflaeche.test.js`.
- Klickpfad: Basar über Auswahl und Podest, neues Bild `13-kampagne`. Tests: `tests/oberflaeche.test.js`. Version 1.19.0 /
  versionCode 22.

## Neu in 1.18.0 (AP 1.5 Karten, AP 3.1–3.5 Spielgefühl, Rückmeldung zu 1.17.0)

- **Werkzeugkasten** `view/match/anim.js` (`CHT`, UMD, in Node testbar): `ease`, `tween`, `timeline`, `Spring`, die Match-Uhr
  `clock` (`tick(real)` je Bild in `board.js`, Tempo `speed` aus `settings.speed`, Treffer-Stopp `stop(ms)`, höchstens 100 ms
  je Bild, `reduced` aus `AEP.reducedMotion()`) und `shake` (Trauma, Zoom-Ruck). Alle Zeiten in `motion.js`/`render.js` kommen
  von der Uhr (`R.draw(c, s, view, t, log, hand)`); `board.effect` stempelt die Startzeit, `drag.at` setzt `board.js`.
- **Bewegung** (`motion.js`): Zeitleisten `CHM.lines` (PLAY, SPELL, ATTACK), Gewicht `CHM.weight`, Aufprall `impact` (Treffer-Stopp,
  Wackeln, `R.fx` Staub/Risse, Klang `thud`), Ziehen `CHM.draws` (auch Gegner, `pendingOrders`), Verbrennen `CHM.burns`
  (`R.burning`), Erschöpfung `CHM.drains` (`R.drain`), Verformung `morph`, Stauchung `sx`/`sy` in `CHM.pose`.
- **Renderer** (`render.js`): Kartenrahmen `R.card` neu (Tempeltor, `etherCrystal`, `blades`, `lifeShield`, `towerBadge`,
  `archiveSeal`, `laurel`, Option `gold`), Aura `gateGlow` (grün, `boost` goldgelb, gewählt gold), `R.cardBack`,
  `R.frameSample`, Hand mit Federn `hand` (`R.springs`, `CHL.pressedHandPose`, `CHL.pressScale`), Neigung `dragged`,
  Marschroute `route`, Zielpuls `pulse`, Effekte `effects` (`damage` mit Tinte, `pump`, `shatter` aus `R.units[uid].sp`,
  `dust`, `cracks`, geplante Klänge `sound`), Treffersound `R.hitSound`. Umschrift der Münze `legend` mit gemessenen Breiten.
- **ViewModel** (`viewmodel/match.js`): `press(hit)`/`release()` (`view.press`), `hand(state)` → `{cost, can, boost}`.
- **Kosmetik**: `CHK.catalog.frames` (`tempeltor`, `gold` 600 Gold), `equipped.frame`, Basar-Reiter „Kartenrahmen“,
  `R.look.frame` in `app.js`. `CHS.backCanvas(id, w)` mit Breite.
- **Klänge**: `spielgefuehl_klang.py` (numpy, ffmpeg) erzeugt `parchment`, `thud`, `hooves`, `lance` (je zwei Varianten, CC0);
  Pegel in `CHA.levels`, Messwerte in `tests/spielgefuehl.test.js`. Einstellung „KI-Zugtempo“ heißt jetzt „Spieltempo“.
- Tests: `tests/spielgefuehl.test.js` (Kurven, Zeitleisten, Federn, Uhr, Gewicht, Ziehen/Verbrennen/Erschöpfung, Effekte,
  Hand, ViewModel, Kartenrahmen, Umschrift, Klänge), Kartenrahmen in `tests/kosmetik.test.js`. Version 1.18.0 / versionCode 21.

## Neu in 1.17.0 (AP 1.8 Teil 2, AP 3.7, Rückmeldung zu 1.16.0)

- **Tisch** (`view/match/render.js`, `table`): nur noch Schlachtfeld und eingeritzte Karte; `half` (Epochenhälften) und `seam`
  (Bronzenaht) entfallen, das statische Sprite hängt nur an Tisch und Farbfilter. `CHL.seam` bleibt als Mitte des Tisches.
- **Äther-Uhr** (`dial`, Geometrie `CHL.mana`, `CHL.crystal(p,i)`): ersetzt `amulets`/`CHL.amulets`. `R.dials[p]` merkt, ab
  wann Kristalle aufleuchten (`MANA_STEP` 85 ms, Glanz `GLINT` 300 ms als Verlauf ohne `shadowBlur`), je Kristall
  `CHA.play('aether')`. Klang: `assets/audio/aether-1/2.ogg` aus `werkzeuge/aether_klang.py` (numpy, ffmpeg).
- **Chronik-Leiste** (`strip`, `CHL.strip`, `CHL.stripRow`): Daten aus `Match.strip(state, rows)` (ViewModel, zwischengespeichert
  je Logzeile); `board.js` übergibt sie als fünftes Argument an `R.draw`. Treffer `chronicle` (Leiste → ganze Chronik) und
  `log<i>` (`kind:'log'`, Karte → Zoom). `viewmodel/chronicle.js` (`CHC`) läuft jetzt auch in Node; `record` speichert die
  Seite `p` je Eintrag und Erschöpfungszeilen über die Warteschlange.
- **Deck** (`deck`): Pergamentrollen `scrolls` (eine je fünf Karten, höchstens sechs), leer: `hourglassArt` mit Schaden des
  nächsten Zugs; **KI-Hand** `orderArt`. **Zugtafel** `turnPlate` (`R.plate`, Schlüssel Zug + aktiver Spieler), ersetzt die
  Einblendung in `motion.js`. Tafel und Füllen entfallen bei `AEP.reducedMotion()` (Klickpfad).
- `AUSSPIELEN` an `CHL.confirm`; der Knopf CHRONIK entfällt. Tests: `spielbrett.test.js`, Chronik-Leiste in
  `viewmodel.test.js`. Version 1.17.0 / versionCode 20.

## Neu in 1.16.0 (AP 1.8 Teil 1 Spielbrett und HUD, Rückmeldung zu 1.15.0 Schlachtfelder)

- **Statisches Bild** (`view/match/render.js`, `table`): Tisch (`R.look.board`, bei Platzhaltern mit `ctx.filter` =
  `R.look.tint`), eingeritzte Karte `chart`, je Spieler eine Epochenhälfte `half` (Zeitalter des Helden aus `CHD.ages`),
  Bronzenaht `seam` bei `CHL.seam`. Sprite-Schlüssel: Tisch, Filter, beide Zeitalter.
- **Held** (`portrait`): Münze `coinArt` als Sprite je Zustand (Leben, Rüstung als `aspis`, Angriff, `weaponRack`), das Siegel
  `seal` als eigenes Sprite (Vorderseite bereit/ruhend, Rückseite), damit es sich drehen kann: `R.seals[p]` merkt Zustand und
  Zeitpunkt, 440 ms Drehung um die senkrechte Achse, 150 ms Einrasten. **Chronometer** (`chronometer`, `R.chrono`): Zeiger
  oben im eigenen Zug, schwingt mit Überschwingen um 180°. Beides ohne Animation bei `AEP.reducedMotion()` (Klickpfad).
- **Mana-Amulette** (`amulets`, Geometrie `CHL.amulets`/`CHL.amulet(p,i)`): eine Reihe je Spieler als Sprite je Mana-Stand;
  `CHL.mana` und `manaColumn` entfallen. **Touch-Ziele** über `touch(id,x,y,w,h)`: mindestens 84 Einheiten (48 dp im
  Handyformat), das Bild bleibt gleich groß.
- **Schlachtfelder** (`model/cosmetics.js`): `retiredBoards` (ancient, egypt, viking, japan) – `refund` zahlt 100 Gold je Feld
  einmal; neue Tische `athen`, `kapitol`, `skriptorium`, `porzellan` ohne `image`, mit `tint` (CSS-Filter, im Basar als
  `--tint` auf dem Standardbild). `motive.js` listet Tische ohne Bild in `MOTIVE.md`. Klickpfad kauft „Meißner Porzellan“.
- Tests: `tests/spielbrett.test.js` (Geometrie, Touch-Ziele, Drehen), Schlachtfelder in `tests/kosmetik.test.js`.
  Version 1.16.0 / versionCode 19.

## Neu in 1.13.0 (AP 2.4 Match-Renderer, AP 2.5 Renderer-Labor, AP 5.11 Teil 2 Balance)

- **Bildschleife ohne Drossel** (`view/match/board.js`): ein Bild je Bildwechsel des Displays statt `now-last>=15`
  (auf 90/120 Hz fehlte jedes zweite Bild). **Pixeldichte:** Die Leinwand hat `R.scale` Gerätepixel je Bühneneinheit
  (CSS-Breite × `devicePixelRatio` / 1600, zwischen 1 und 2; Handyformat 1,34 → 2144 × 1072); gezeichnet und getippt wird
  weiter in 1600 × 800. `R.scaled(ctx, k)` vervielfacht `shadowBlur`/`shadowOffset` auf skalierten Kontexten, damit
  Schatten gleich groß bleiben.
- **Sprites statt `shadowBlur`** (`view/match/render.js`): `R.sprite(key, x, y, w, h, paint, res)` zeichnet einmal in eine
  Offscreen-Leinwand mit der aktuellen Pixeldichte, `R.blit` kopiert. Ein Sprite je Zustand für Diener-Plaketten
  (Schlüssel: Karte, Werte, Schlüsselwörter, Bereitschaft, Auswahl, Ziel), Heldenporträt mit Fähigkeit, Manasäule,
  Knöpfe, Deckstapel (`CHS.stack`, nur der Glanz `CHS.gloss` je Bild), Kartenrücken des Gegners, Einfügelücke;
  statische Ebene (Schlachtfeld, Schatten, Naht) als ein Bild. Leuchten der Handkarten und Wurfschatten fliegender Karten
  sind vorgerenderte Sprites, der Zielpfeil hat einen breiteren dunklen Strich statt Unschärfe. Kartenbilder im Cache ab
  Pixeldichte 1,2 mit 400 statt 300 px Breite. Höchstens 400 Sprites, dann wird der Cache geleert.
- **Bildraten-Anzeige** (versteckte Einstellung `settings.fps`): *Einstellungen → Über das Spiel → fünfmal auf „Version“
  tippen* (`Credits.tapVersion`). Oben rechts im Match: Bilder je Sekunde, Zeichenzeit je Bild (Mittel, 95 %), längste
  Lücke, Pixeldichte. Alte Spielstände bekommen `fps:false`.
- **Renderer-Labor** (`assets/game/labor/renderer.html`, `labor.js`, PixiJS 8.22 als `pixi.min.js`, MIT, `LIZENZ-pixi.txt`):
  dasselbe volle Match mit Canvas 2D und mit PixiJS (WebGL), dazu Partikelregen und Verformung Karte → Siegel; Knopf
  „Messreihe“ misst alle sechs Kombinationen. Erreichbar im Entwicklermodus über *Über das Spiel → Renderer-Labor*;
  „Zurück zum Spiel“ (und die Zurück-Geste) lädt das Spiel neu.
- **Messwerkzeuge:** `matchmessung.js` (7 Diener je Seite, 10 Handkarten; Frame-Zeit und Bildabstände in Ruhe und im
  Gefecht, CPU 1× und 4×; `--spiel <ordner>` für Vorher-Werte) und `labormessung.js` (Messreihe des Labors; ohne GPU läuft
  WebGL in SwiftShader – nur Funktionsprobe). Beide laufen im CI-Job „sichtpruefung“. Test: `tests/renderer.test.js`.
- **AP 5.11 Teil 2** (`model/data.js`): Wandernder Händler 2/2 mit Vermächtnis 2 Rüstung, Grenzläuferin 3/3 mit Tarnung,
  Rōnin 3/4, Bronzener Wall 2 Rüstung (+2 Leben), Kämpfer der Heiligen Schar 3/2. Bericht `balance/BERICHT.md`, vorher
  `BERICHT-1.12.0.md`. Die Regeltests nutzen statt Händler und Grenzläuferin regellose Attrappen (`tests/attrappen.js`,
  `attrappe_23`, `attrappe_34`, nur in `D.byId`).
- **Musik** (`service/audio.js`): `musik-menue.ogg` (Hauptmenü und Untermenüs) und `musik-duell.ogg` (Match) laufen
  gestreamt über `<audio>` → `createMediaElementSource` → Musikregler mit Ducking; `CHA.track(mode)` blendet über.
  Originale in `ungenutzte_assets/musik-original/`, kodiert mit
  `ffmpeg -i duell.mp3 -af volume=-8dB -c:a libvorbis -q:a 4 musik-duell.ogg` (Menü: −7,5 dB) → −20 LUFS.
  `menu.ogg`, `battle.ogg`, `tension.ogg` entfallen, alle Soundeffekte bleiben.
- Version 1.13.0 / versionCode 16.

## Neu in 1.12.0 (AP 2.1 Hülle, AP 2.2 Asset-Pipeline, AP 0.2 Audio, Rückmeldung zu 1.11.0)

- **Native Hülle in Kotlin** (`android/`, AGP 8.10, Kotlin 2.2, Gradle 8.14, ohne AndroidX): ersetzt `classes.dex`,
  `resources.arsc` und das binär gepatchte Manifest; `apk_bauen.py` und `manifest_version.py` entfallen. Gleich bleiben
  Paket-ID, Schlüssel, Activity-Name, SharedPreferences `chroniken_v1` und die JS-Brücke; neu sind `keepAwake`, `info`,
  `haptic(0–3)` über die Geräte-Effekte, Vollbild mit Aussparung (`shortEdges`, `window.safeInsets`), Splash (Android 12+),
  adaptives Icon, höchste Bildwiederholrate, echte MIME-Typen. Version 1.12.0 / versionCode 15 in `app/build.gradle.kts`.
- **Flügel bis in die Kamera-Aussparung** (`resize()` in `app.js`): Untermenüs und Dialoge reichen über den sicheren Rand
  hinaus bis an die Kante, Inhalte bleiben im sicheren Bereich (toter linker Rand auf dem OnePlus 15, AP 1.3).
- **Bilder als WebP** (`bilder_webp.py`, Originale in `ungenutzte_assets/art-original/`): 53,1 → 9,4 MB. **Laden in
  Stufen:** `H.preload(progress)` für Ladebalken und Hauptmenü, danach `R.load(progress)` mit `R.atlases()` im Hintergrund
  als `ImageBitmap` (aus der Datei dekodiert); `App.navigate` wartet bis dahin mit Fortschrittsanzeige.
- **Kartenbilder als `blob:`-Adressen** (`R.thumb`, `R.artwork`) statt `data:`-Adressen.
- **Massenöffnung ohne Grenze** (`Packs.openAll` öffnet alle Pakete; Übersicht mit `bulk.shown`, `STEP` Karten je `TICK` ms,
  noch verdeckte Karten als Siegel).
- **Klangpegel** in `CHA.levels` (gemessen, Tabelle in der README unter AP 0.2), **Klangprobe** in den Einstellungen
  (`Settings.sample`). Tests: `tests/huelle.test.js`, `tests/audio.test.js`, Massenöffnung und Klangprobe in
  `tests/viewmodel.test.js`.

## Neu in 1.11.0 (AP 5.10 Welle 2, Rückmeldung zu 1.10.0)

- **Sechs neue Helden** (`D.heroes[16…21]`): Epaminondas (`griechen`), Fabius Maximus (`rom`), Mandukhai (`steppe`),
  Baibars (`byzanz`), Jan Žižka (`mittelalter`), Fu Hao (`ostasien`) – je 10 Karten (`<held>_0`–`_9`, Seltenheiten wie
  Welle 1), Chronikseite in `model/lore.js`, KI-Persönlichkeit, Monogramm-Porträt und Mission 17–22 (Bossfähigkeit als
  Daten). Neue Spielsteine: `tribesman`, `wagon`, `taborite`, `mamluk`, `immortal`, `messenian`, `companion`, `twin`,
  `elephant`.
- **21 Zeitalterkarten** `rom_0`–`_6`, `steppe_0`–`_6`, `byzanz_0`–`_6` – Rom, Persien & Steppe und Byzanz haben jetzt je
  zwei Helden. Alle 81 neuen Karten mit Platzhalter und Bildidee in `ungenutzte_assets/MOTIVE.md`.
- **Neue Regeln** (`model/engine.js`): `buffLeft` (Diener ganz links, optional `grant`), `ifMinions` (ab n eigenen Dienern
  `then`, sonst `else`), ein verliehener Vorstoß/Sturmangriff (`grant`, `grantAll`) macht frische Diener sofort
  angriffsbereit, `freeze` mit `random`, `randomDamage` mit `per:'taunt'`, `buffSelf` mit `per:'minion'`, `buffAll`/
  `grantAll` mit beliebigem `only`, Auren `buffAura.only:'taunt'`, Ziele nur in Starre (`targetFrozen`) und Ergründen aus
  den obersten drei Karten des eigenen Decks (`pool:'deck'`, die gewählte verlässt das Deck). `canPower` kennt `buffLeft`
  und `ifMinions`; Bauwerke mit `onDamage` zählen für die KI-Bewertung (`E.impact`).
- **Massenöffnung** (`CHP.openPacks`, `Packs.openAll`, Phase `bulk`): bis zu 50 Pakete auf einmal, gleiche Regeln wie beim
  einzelnen Paket, Übersicht seltenste zuerst. **Codes** (`CHP.codes`, `CHP.redeem`, Dialog `redeem` in den Einstellungen):
  einmal je Spielstand, Feld `redeemed` (alte Spielstände bekommen `[]`).
- Heldenwahl mit 8 Spalten (22 Helden), Monogramm-Medaillons im Hochformat (`R.heroStyle`), „Über das Spiel“ zählt Karten,
  Helden und Missionen. Tests: `tests/welle2.test.js`, Massenöffnung und Codes in `tests/viewmodel.test.js`.
- Version 1.11.0 / versionCode 14. Balance-Lauf mit 22 Helden ≈ 30 min auf 4 Kernen.

## Neu in 1.10.0 (AP 5.11 Kartenwelle 1, AP 5.5 Bauwerke, AP 5.8 Teil 2 KI-Persönlichkeit)

- **56 neue Karten** mit festen IDs hinten angehängt: je Held zwei (`leonidas_10`, `masako_11` …), je sieben
  **Zeitalterkarten** für Griechische Antike, Europäisches Mittelalter und China/Korea/Japan (`griechen_0`–`_6`,
  `mittelalter_0`–`_6`, `ostasien_0`–`_6`; Feld `hero` und `age` = Zeitalter) und drei neutrale Weltwunder
  (`neutral_47`–`49`). `D.owner(karte)`/`D.eraOf(karte)` liefern Held, Zeitalter oder „Neutral“; Zeitalter haben Farbe und
  Zeichen für Rahmen und Platzhalter. Neue Spielsteine `rider` (Steppenreiter) und `terracotta`.
- **Neue Regeln** (`model/engine.js`): Auslöser `onDamage`, `anyDeath`; Auren `spellDiscount`, `healDouble`,
  `doubleDeath`, `wall` (Große Mauer: frische feindliche Diener erreichen den Helden nicht – dafür ist `fresh` jetzt an
  jedem neuen Diener gesetzt); Kosten `costPerPlayed`; Effekte `weaponUp`, `draw` mit `per:'building'`, `freeze` mit
  `minAttack`, `grantAll` mit `only`, `randomDamage` mit `board`; Ergründen-Pools `hero`, `age`, `ages`. Ein zweites
  Ergründen bei offener Wahl wird zufällig aufgelöst. Entzerrt: Herodot ergründet Zeitalterkarten (gespielte Karten
  bleiben Anna), die Thermen des Agrippa heilen nur den Helden.
- **KI:** Persönlichkeit je Held als Datenfeld `ai` (`aggressive`, `defensive`, `combo`, Namen in `D.personalities`),
  Gewichte in `E.STYLE`; Bauwerke bewertet die KI nach ihrer Wirkung (`E.impact`) – wirkungslose ignoriert sie, wirksame
  belagert sie. Die Heldenwahl zeigt die Spielweise des KI-Gegners.
- **Oberfläche:** Bauwerk-Handkarten mit Turm-Abzeichen und Haltbarkeit statt Angriff/Leben, Kartendetail „♜ Haltbarkeit“,
  Sammlung zählt alle Karten statt fest 140. Deckbau und Auffüllen nutzen `D.playable` (Zeitalterkarten).
- **Balance-Werkzeug:** Spalte „KI-Spielweise: Angriffe aufs Gesicht“ und Zeile „KI-Persönlichkeit“ (Anteil der Angriffe
  aufs Gesicht und auf Bauwerke). Tests: `tests/kartenwelle.test.js`.
- Version 1.10.0 / versionCode 13.

## Neu in 1.9.0 (AP 5.10: sechs neue Helden, Heldenfähigkeiten als Daten)

- **Heldenfähigkeiten als Daten:** `hero.ability` (`effects`, `target`) in `model/data.js`; `E.power`/`E.canPower` ohne
  Sonderfall je Held, Bedingungen aus den Effekten. Nach dem Umbau war der Balance-Bericht der zehn alten Helden byte-gleich.
- **Zeitalter** `CHD.ages`, Feld `age` je Held, `CHD.playable(karte, held)` für Decks, Ergründen und Zufallsdecks.
- **Auslöser und Auren:** `start`/`end` (Zugbeginn/-ende), `onHeal`/`allyHeal`, `buffAura`, `buildingDiscount`; neue Effekte
  `fortify`, `bounce`, `destroy`, `randomDamage`, `grant*`, `buffSelf`/`buffRandom`, `enemyOverload`, Missionen mit
  Bossfähigkeit als Daten.
- **Welle 1:** Perikles, Marcus Agrippa, Amanirenas, Anna Komnene, Nezahualcóyotl, Hōjō Masako – je 10 Karten
  (`<held>_0`–`_9`), Chronikseite, Mission 11–16, Platzhalter-Porträt; neue Spielsteine `citizen`, `pioneer`, `parthenos`.
  Ältere Spielstände bekommen die Basisdecks der neuen Helden (`starters` in `profile.js`). Tests: `tests/helden.test.js`.
- Heldenwahl 6 × 3 nach Zeitalter, Kampagne scrollt (16 Missionen), Stern im Hauptmenü leiser.
- Version 1.9.0 / versionCode 12. Balance-Lauf mit 16 Helden ≈ 15 min auf 4 Kernen (mit 1.10.0: ≈ 25 min).

## Neu in 1.8.0 (Platzhalter, Chronik der Helden, fünf neue Schlüsselwörter, randlose Menüs)

- **Randlose Untermenüs und Dialoge** (Rückmeldung zu 1.7.0): Auf Bildschirmen breiter als 2:1 wächst die Bühne zur
  Seite (`--wing`, `app.js`); Kopfleisten, Hintergründe und der Dialog-Schleier reichen bis an den Rand, Inhalte, Hauptmenü
  und Match-Canvas bleiben mittig. `buehne.js` rechnet Bühnenpunkte entsprechend um.
- **Platzhalter für fehlende Motive** (AP 5.12): Karten ohne Atlasfeld (`art: null`) zeichnet `R.tile` als gestaltetes
  Medaillon in der Epochenfarbe mit Heldenzeichen bzw. Typsymbol und „Motiv folgt“; Helden ohne Porträt bekommen ein
  Monogramm. `D.missingArt` kennzeichnet sie, `motive.js` schreibt `ungenutzte_assets/MOTIVE.md` mit fertigen Prompts,
  die Sichtprüfung zählt sie (`messwerte.json` → `platzhalter`).
- **Chronik der Helden** (AP 5.9): `model/lore.js` mit zehn Chronikseiten; Dialog `lore`, erreichbar über „Chronik“ in der
  Heldenwahl und langes Drücken auf ein Heldenporträt im Match.
- **Neue Schlüsselwörter** (AP 5.4 Teil 2): Plünderung (`plunder`), Tarnung (`stealth`), Bannung (Effekt `silence`),
  Tödliches Gift (`poison`), Belastung (`overload`) – mit KI-Bewertung, Plaketten-Marken (♥ ◐ ⚗ ⊘) und Anzeige der
  gesperrten Manakristalle. 13 neue Karten mit festen IDs (`*_10`, `*_11`, `neutral_42`–`46`), zunächst mit Platzhaltern.
  Tests: `tests/schluesselwoerter2.test.js`.
- Alte Spielstände ohne die neuen Karten-IDs werden beim Laden ergänzt (Sammlung 0) statt abgelehnt.
- Version 1.8.0 / versionCode 11. Speicher-Schlüssel, Paket-ID, Signatur und bestehende Karten-IDs unverändert.

## Neu in 1.7.0 (eigene Schlüsselwörter, zwölf neue Legendäre, Menü-Feinschliff)

- **Schlüsselwörter umbenannt** (AP 5.4): Schildwall, Göttliche Gunst, Einmarsch, Vermächtnis, Sturmangriff und
  Gunst der Stunde statt der Hearthstone-Begriffe – in Kartentexten, Hilfe, Hinweisen und Starthand. Die Engine-Felder
  (`taunt`, `shield`, `battle`, `death`, `charge`) und alle Spielstände bleiben. Glossar `CHD.keywords`, angezeigt in
  der Großansicht und den Kartendetails. Leonidas' Heldenfähigkeit heißt jetzt *Phalanx*, „Spartas Vermächtnis“ heißt
  „Spartas Erbe“ (sonst Verwechslung mit dem Schlüsselwort).
- **Neue Regeln** in `model/engine.js`: Vorstoß, Starre, Ergründen (offene Wahl in `s.choice`, Aktion `choose`),
  Doppelschlag, Arkaner Fokus, Bauwerke (`building`), Auren der Legendären und Kostenänderungen je Handkarte
  (`E.cost`). Neue Karten-IDs gibt es keine, nur zwei neue Spielsteine (`hoplite`, `pyramid`).
- **Zwölf neue Legendäre** (AP 5.3) mit eigener Regel, Werte per Balance-Lauf justiert; die KI bewertet die neuen
  Mechaniken (AP 5.8, Teil). Tests: `tests/schluesselwoerter.test.js`, `tests/legendaere.test.js`.
- **Oberfläche:** Ergründen-Dialog, Symbole auf den Plaketten (➤ Vorstoß, ⚔ Doppelschlag, ✧ Fokus, ❄ Starre),
  Bauwerk-Plakette mit gezeichneter Platzhalter-Pyramide, grüne Kosten bei verbilligten Handkarten.
- **Hauptmenü** (Rückmeldung zu 1.6.0): Der Lichtblitz beim Menüwechsel ist warmgolden statt weiß; die Seitenränder auf
  breiten Handys setzen die Wand scharf fort statt gestreckt und weichgezeichnet (`hauptmenue_bild.py`).
- **Balance-Werkzeug:** Kennzahl „Legendäre als Gruppe“ und Tabelle der Legendären im Bericht.
- Version 1.7.0 / versionCode 10. Speicher-Schlüssel, Paket-ID, Signatur und Karten-IDs unverändert – Update über 1.6.0,
  Spielstände, Decks und laufende Partien bleiben gültig.

## Neu in 1.6.0 (Balance-Werkzeug, Heldenbalance)

- **Balance-Werkzeug** `balance.js` (AP 5.1): KI gegen KI für alle Heldenpaarungen mit Start- und Zufallsdecks,
  Bericht nach `balance/BERICHT.md` (Siegquoten-Matrix, Beginner-Vorteil, Partielänge, Werte je Karte).
  In der CI als eigener Job „balance“ mit 20 Partien je Paarung (Artefakt „Balance“).
- **Heldenbalance** (AP 5.2): Initiative (seit 1.7.0 „Gunst der Stunde“) +2 Mana, fünf Heldenfähigkeiten und 40 Heldenkarten angepasst – alle Helden
  47–53 % gegen das Feld (vorher 15–80 %). Liste der Änderungen: README, AP 5.2. Neue Tests in
  `tests/heldenbalance.test.js` und `tests/balance.test.js`.
- **KI-Vorausschau schneller:** `E.copy` statt JSON-Klon, 5,3× schneller bei gleichen Zügen.
- Version 1.6.0 / versionCode 9. Speicher-Schlüssel, Paket-ID, Signatur und Karten-IDs unverändert – Update über 1.5.0,
  Spielstände und Decks bleiben gültig.

## Neu in 1.5.0 (MVVM, Oberfläche ohne Neuaufbau, Sichtprüfung, Zahnrad)

- **Code in MVVM-Struktur** unter `assets/game/`: `model/` (Regeln, Daten, Spielstand-Speicher `store.js`),
  `viewmodel/` (Zustand und Befehle je Bildschirm, ohne DOM), `view/` (Vorlagen, Bausteine `kit.js`, Hauptmenü,
  Match-Canvas unter `view/match/`, CSS unter `view/css/`), `service/` (Audio, Android-Brücke), `core/mvvm.js`
  (eigener Binder) und `app.js` (setzt alles zusammen). Aufbau und Regeln: README, Abschnitt „Projektaufbau“.
- **Keine Komplett-Neuaufbauten mehr:** Bildschirme und Dialoge werden abgeglichen statt per `innerHTML` neu
  gebaut. Im Basar bleiben nach Kauf und Ausrüsten Scrollposition, Reiter und Bilder; das Suchfeld der Sammlung
  behält beim Tippen den Fokus; die Starthand lädt beim Markieren keine Bilder neu.
- **Hauptmenü-Bild repariert:** Das Zahnrad oben rechts ist ohne Kerbe vervollständigt, die Wand an beiden
  Rändern ohne Spiegelflecken fortgesetzt (`hauptmenue_bild.py`).
- **Automatische Sichtprüfung:** `klickpfad.js` mit Referenzbildern in `referenz/`, in der CI als eigener Job.
- **Tests für die ViewModels** (`tests/viewmodel.test.js`), laufen ohne Browser.
- Version 1.5.0 / versionCode 8. Speicher-Schlüssel, Paket-ID und Signatur unverändert – Update über 1.4.0.

Unverändert in der Wirkung: `model/data.js`, `model/engine.js`, `view/match/render.js`, `motion.js`,
`layout.js`, `classes.dex` (nur verschoben).

## Neu in 1.4.0 (Name, Stil, Hauptmenü)

- **Neuer Name „Aeterna“** auf dem Homescreen, im Ladebildschirm, im Hauptmenü, auf Packs, beim
  Kartenrücken „Aeterna-Siegel“ und im Export-Dateinamen des Browsers. Paket-ID, Speicher-Schlüssel
  (`chroniken.profile`), interne IDs und `chroniken.local` bleiben gleich – 1.4.0 installiert sich als
  Update über 1.3.0, der Spielstand bleibt.
- **Hauptmenü aus dem gemalten Konzeptbild** (`assets/art/hall-aeterna.png`, erzeugt mit
  `hauptmenue_bild.py`). Platten, Medaillons und Zahnrad sind als eigene Ebenen aus dem Bild
  ausgeschnitten (`hall.js`, `hall.css`): Platten sinken in ihre Fuge, Medaillons drücken ein und
  leuchten, Balken blitzen auf, das Zahnrad dreht sich. Lichtstrahlen, glühender Stern, Glanzläufe und
  Wachssiegel beleben den Saal; goldene Partikel (Canvas) steigen auf, kreisen als Kometen auf der Goldlinie und
  sprühen bei jeder Berührung. Mit Maus: Hover-Animationen und Funkenspur. Auftritt beim Start (≤ 700 ms, antippen überspringt),
  Menüwechsel als Lichtblitz aus dem Stern mit Zoom in den Ring (≤ 600 ms).
- **Vierte Platte:** „Partie fortsetzen“ bei laufender Partie, sonst „Herausforderung“ – ein
  **Tagesduell** mit festen Helden, Decks und Startwert pro Kalendertag (`CHP.daily`).
- **Schriften (SIL OFL)** in `assets/fonts/`: Cinzel, Cinzel Decorative (unverändert), Alegreya Sans
  (auf Latein-Zeichen reduziert). Lizenztexte liegen daneben.
- **Stil-Bibel** in `stil/STILBIBEL.md` mit Stil-Tafel und Vergleichsbild.

## Neu in 1.3.0 (Shop, Audio, Assets)

- Das Cartoon-Stein-Hauptmenü aus 1.3.0 ist in 1.4.0 durch das gemalte Hauptmenü ersetzt.
- Übergänge zwischen den übrigen Bildschirmen: Zwei Steinplatten schließen sich (Schleifen), rasten ein (Schlag + native
  Vibration über `Android.haptic`) und gleiten mit Mahlgeräusch auseinander.
- **Basar** mit vier Reitern: Kartenpakete, Kartenrücken (8), Helden-Skins (10 Porträts der
  Marmorhallen-Edition), Schlachtfelder (Standard + 4 × 100 Gold). Bezahlt wird mit Gold.
- Kartenrücken erscheinen auf dem eigenen Deckstapel (Relief + wandernder Lichtglanz) und
  beim Öffnen von Paketen. Skins gelten für den eigenen Helden im Match und in der Heldenwahl.
- Standard-Spielfeld durch das neue Spielfeldbild ersetzt.

Unverändert: `data.js`, `engine.js`, `motion.js`, `layout.js`, `chronicle.js`, `classes.dex`.

## Dateien

Die vollständige Übersicht der Spielmodule (MVVM) steht in der README unter „Projektaufbau“.

| Datei | Zweck |
|---|---|
| `assets/game/model/cosmetics.js` | Katalog, Kaufen/Ausrüsten, Bereinigung gespeicherter Kosmetik |
| `assets/game/model/store.js` | Laden, Speichern, Sicherung, Export/Import (Schlüssel `chroniken.profile`) |
| `assets/game/view/hall.js` | Hauptmenü: Geometrie aus dem Konzeptbild, ausgeschnittene Ebenen, Auftritt, Ring-Übergang (`CHH`) |
| `assets/game/view/css/hall.css` | Schriften, Farbvariablen (`--ae-…`), Ladebildschirm, Hauptmenü |
| `assets/game/view/stone.js` | Steinplatten-Übergang (SVG), Kartenrücken (Canvas), Deckstapel-Glanz |
| `assets/game/view/css/stone.css` | Steinplatten-Übergang, Basar |
| `assets/game/view/kit.js`, `view/css/kit.css` | Gemeinsame Bausteine: Steinknopf, Panel, Reiter, Wallet, Kopfleiste, Modal |
| `assets/game/labor/` | Renderer-Labor (AP 2.5): `renderer.html`, `labor.js`, PixiJS `pixi.min.js` (MIT, `LIZENZ-pixi.txt`) |
| `assets/game/assets/fonts/*` | Cinzel, Cinzel Decorative, Alegreya Sans mit Lizenztexten (OFL) |
| `assets/game/assets/art/*.webp` | Bilder des Spiels, erzeugt von `bilder_webp.py` aus `ungenutzte_assets/art-original/` |
| `assets/game/assets/audio/stone-*, scrape-*, grind-*, slam-*` | Steingeräusche (`werkzeuge/stein_sounds.py`) |

## Test-APK herunterladen (GitHub Actions)

Bei jedem Push baut der Workflow `.github/workflows/apk.yml` die APK mit Gradle: Tests laufen, `./gradlew assembleRelease`
baut und signiert, `aapt2` prüft Paket-ID und Version, `apksigner` das Zertifikat (SHA-256 `8d4ab16f…e509`). Parallel spielt
der Job „sichtpruefung“ den Klickpfad im Handyformat und vergleicht ihn mit den Referenzbildern (Artefakt „Sichtpruefung“ nur
bei Fehlern, 3 Tage).

Auf `main` ersetzt der Lauf die Datei im Release **„Test-APK“** (Tag `test-apk`, `gh release create`) und löscht Artefakte, die
älter als einen Tag sind – Release-Dateien belegen keinen Actions-Speicher (Free: 0,5 GB). Download: rechts unter **Releases**,
unter Assets `Aeterna-<Version>-Test.apk`. Über „Run workflow“ lässt sich jederzeit ein neuer Build starten.

## Lokal bauen

Mit Android-SDK (Android Studio oder `ANDROID_HOME`) und JDK 17:

```sh
cd android && ./gradlew assembleRelease     # → app/build/outputs/apk/release/app-release.apk (signiert)
```

- Neue Version: `versionCode` +1 und `versionName` in `android/app/build.gradle.kts`, dazu `VERSION` in
  `assets/game/app.js` (ein Test prüft, dass beide übereinstimmen). App-Name: `app/src/main/res/values/strings.xml`.
- In den Claude-Code-Sitzungen gibt es kein Android-SDK (`dl.google.com` ist gesperrt). Die Kotlin-Quellen lassen sich dort
  trotzdem prüfen: ein kleines Gradle-Projekt mit `kotlin("jvm")` und `compileOnly("org.robolectric:android-all:16-…")`
  aus Maven Central, das `android/app/src/main/java` kompiliert. Gebaut wird in der CI.
- Bilder neu erzeugen (nach neuen Originalen in `ungenutzte_assets/art-original/`): `python3 werkzeuge/bilder_webp.py`
  (Pillow mit WebP). Größen und Qualität stehen oben im Skript.
- Hauptmenü-Hintergrund neu erzeugen (z. B. nach einem höher aufgelösten Konzeptbild):
  `python3 werkzeuge/hauptmenue_bild.py` (Pillow, NumPy) schreibt nach `ungenutzte_assets/art-original/hall-aeterna.png`,
  danach `bilder_webp.py`. Die Fugen (`JOINTS`), Sperrflächen (`KEEP_OUT`) und die Zahnrad-Winkel stehen oben im Skript und
  gelten für das jetzige Konzeptbild; bei einem neuen Bild prüfen.

## Tests

```sh
node --test werkzeuge/tests/*.test.js
```

Kosmetik-Käufe (Gold wird genau einmal abgezogen), Ausrüsten nur nach Freischaltung,
Speichern/Laden, alte 1.2.2-Spielstände, manipulierte Spielstände, 100 simulierte Partien,
die native Hülle (Paket-ID, Version, Schlüssel, Brückenfunktionen, MIME-Typen, Speicherort), die Klangpegel, unveränderte Speicher-Schlüssel,
umbenannte Texte, das Tagesduell und die ViewModels (MVVM-Kern, Store mit Sicherung, Basar mit Kauf über
Rückfrage, Pack öffnen, Sammlung und Deckbau, Hauptmenü, Match mit KI-Takt), die versteckte Bildraten-Anzeige und das Renderer-Labor (seit 1.13.0), die geänderten Heldenfähigkeiten und
die Gunst der Stunde, die schnelle Zustandskopie der KI und das Balance-Werkzeug (gleiche Zahlen unabhängig von der Zahl der
Threads), seit 1.7.0 die umbenannten und neuen Schlüsselwörter, alle zwölf Legendären und die Ergründen-Wahl im
Match-ViewModel – ohne Browser.

## Balance-Lauf

```sh
node werkzeuge/balance.js                         # 200 Partien je Paarung, ≈ 15 min auf 4 Kernen (16 Helden) → balance/BERICHT.md
node werkzeuge/balance.js --partien 20 --bericht balance-ci/BERICHT.md   # verkürzt wie in der CI
node werkzeuge/balance.js --seed 1 --decks start  # anderer Startwert, nur Startdecks
AETERNA_MODELL=/pfad/kopie-von-model node werkzeuge/balance.js --partien 40   # Regelvariante testen
```

Gleicher Startwert und Regelstand ergeben denselben Bericht, unabhängig von `--threads`. Ziele (AP 5.2): jeder Held
47–53 % gegen das Feld, keine Paarung schlechter als 40/60, Beginner gewinnt höchstens 55 %; seit AP 5.3 außerdem
Legendäre als Gruppe höchstens 55 % „gewinnt, wenn gezogen“ (nur in Zufallsdecks, Startdecks enthalten keine). Bei 200 Partien je
Paarung beträgt der Zufallsfehler etwa ±2,3 Punkte je Held und ±6,9 je Paarung.

## Sichtprüfung (Playwright)

```sh
node werkzeuge/klickpfad.js            # Klickpfad Handyformat, Vergleich mit referenz/, Ergebnis in sichtpruefung/klickpfad/
node werkzeuge/klickpfad.js --referenz # nach gewollten optischen Änderungen: Referenzbilder neu schreiben, ansehen, committen
node werkzeuge/sichtpruefung.js        # Hauptmenü: Screenshots Handy/Tablet, Auftritt, Trefferflächen, Bildzeiten, Menüwechsel
node werkzeuge/matchmessung.js         # Match mit 7 Dienern je Seite: Frame-Zeit und Bildabstände (CPU 1× und 4×) → sichtpruefung/matchmessung.json
node werkzeuge/matchmessung.js --spiel <ordner>   # dasselbe für eine ältere Version (Vorher-Wert)
node werkzeuge/labormessung.js         # Renderer-Labor: Canvas 2D gegen PixiJS, je Szene 3 s → sichtpruefung/labormessung.json
node werkzeuge/motive.js              # Liste der fehlenden Motive (ungenutzte_assets/MOTIVE.md) neu schreiben
```

Der Klickpfad läuft mit reduzierter Bewegung, fester Uhrzeit und festem Spielstand, damit die Bilder stabil sind.
Er bricht ab bei JavaScript-Fehlern, fehlgeschlagenen Prüfungen oder starken Bildabweichungen (mehr als 3 % stark
abweichende Pixel oder mittlere Abweichung über 6 bei 458 × 206); Abweichungsbilder landen neben den Screenshots.
Mit `--nur-basar --spiel <ordner>` misst er nur den Basar, auch für ältere Versionen (Vergleich 1.4.0 ↔ 1.5.0).
Lokal: Playwright 1.56.1 (`npm install --no-save playwright@1.56.1`), in den Claude-Code-Sitzungen vorinstalliert.

## Signatur

Der private Schlüssel der Version 1.2.2 lag nicht im Repository. Seit 1.3.0 ist jede Version mit dem Testschlüssel
`werkzeuge/signatur/chroniken-test.p12` signiert (Passwort `chroniken-test`, Alias `chroniken`); Gradle nutzt ihn für
Release und Debug. Versionen mit diesem Schlüssel lassen sich direkt als Update installieren – auch 1.12.0 mit der neuen
Hülle über 1.11.0.

Umstieg von 1.2.2: In der alten App *Einstellungen → Spielstand exportieren*, alte App
deinstallieren, die neue Version installieren, *Einstellungen → Spielstand importieren*.
