# Chroniken der Helden

Ein historisches Offline-Kartenduell für Android: 140 Karten, 10 Helden von Leonidas bis Musashi,
10 Kampagnenmissionen. Aktueller Stand: **Version 1.3.0** (Cartoon-Stein-Hauptmenü, Basar mit
Kartenrücken, Helden-Skins und Schlachtfeldern).

Dieses Dokument ist zugleich der **Arbeitsplan** für die nächsten Sitzungen. Ziel: Das Spiel soll
sich so flüssig und hochwertig anfühlen wie die besten Kartenspiele, ohne eine Kopie zu sein, und
vor allem Spaß machen.

---

## Inhalt

1. [APK herunterladen](#apk-herunterladen)
2. [Projektaufbau](#projektaufbau)
3. [Regeln für jede Sitzung](#regeln-für-jede-sitzung)
4. [Ehrliche Bestandsaufnahme](#ehrliche-bestandsaufnahme)
5. [Leitbild: nah an Hearthstone, aber eigenständig](#leitbild-nah-an-hearthstone-aber-eigenständig)
6. [Qualitätsziele](#qualitätsziele)
7. [Arbeitsplan](#arbeitsplan)
8. [Empfohlene Reihenfolge der Sitzungen](#empfohlene-reihenfolge-der-sitzungen)
9. [Vorlage für den Start einer Sitzung](#vorlage-für-den-start-einer-sitzung)

---

## APK herunterladen

Jeder Push baut automatisch eine signierte Test-APK (`.github/workflows/apk.yml`).

1. Im Repo auf **Actions** gehen und den obersten grünen Lauf **„Test-APK bauen“** auf `main` öffnen.
2. Unten unter **Artifacts** auf `Chroniken-<Version>-Test-APK` tippen.
3. Die ZIP-Datei entpacken – darin liegt die APK.

Umstieg von 1.2.2 (anderer Signaturschlüssel): In der alten App *Einstellungen → Spielstand
exportieren*, alte App deinstallieren, neue installieren, *Spielstand importieren*. Ab 1.3.0
installieren sich neue Versionen direkt als Update.

---

## Projektaufbau

Das Spiel ist eine Web-App (HTML/CSS/JavaScript) in einer Android-WebView. Menüs sind DOM,
das Match wird auf ein Canvas (1600 × 800) gezeichnet.

| Pfad | Inhalt |
|---|---|
| `quellcode/` | Kompletter APK-Inhalt. `classes.dex` ist die **kompilierte** native Hülle (kein Java-Quelltext vorhanden). |
| `quellcode/assets/game/data.js` | Helden, 140 Karten, Missionen |
| `quellcode/assets/game/engine.js` | Regel-Engine und KI (`CHE`) |
| `quellcode/assets/game/profile.js` | Spielstand, Packs, Aufgaben, Import-Prüfung (`CHP`) |
| `quellcode/assets/game/cosmetics.js` | Kosmetik-Katalog, Kaufen/Ausrüsten (`CHK`) |
| `quellcode/assets/game/render.js` | Match-Zeichnung auf dem Canvas (`CHR`) |
| `quellcode/assets/game/motion.js` | Match-Animationen (`CHM`) |
| `quellcode/assets/game/layout.js` | Gemeinsame Geometrie für Zeichnen und Touch (`CHL`) |
| `quellcode/assets/game/stone.js` / `stone.css` | Cartoon-Stein-Grafik, Kartenrücken, Hauptmenü, Basar |
| `quellcode/assets/game/app.js` | Bildschirme, Navigation, Gesten, Basar-Logik |
| `quellcode/assets/game/audio.js` | Web-Audio-Mischer (`CHA`) |
| `werkzeuge/` | APK-Build und -Signatur, Manifest-Version, Sound-Generator, Tests – siehe `werkzeuge/LIESMICH.md` |
| `ungenutzte_assets/` | Ausgangsbilder (bereits eingebaut, nur noch als Vorlage) |

Native Brücke (`window.Android`): `save`, `load`, `exportSave`, `importSave`, `haptic(0|1)`,
`exitApp`. Inhalte werden unter `https://chroniken.local/` ausgeliefert; die Hülle kennt nur die
Endungen `.html .js .css .png .ogg .ttf .json`.

---

## Regeln für jede Sitzung

- **Tests vor jedem Push:** `node --test werkzeuge/tests/*.test.js` (Kosmetik, Spielstand, 100 simulierte Partien).
- **CI muss grün sein**, die APK kommt aus Actions – keine gebauten APKs/ZIPs ins Repo.
- **Spielstände bleiben kompatibel:** Neue Felder immer über eine `normalize`-Funktion ergänzen
  (Muster: `CHK.normalize`), alte Saves dürfen nie verloren gehen.
- **Regeländerungen nur bewusst:** `data.js`/`engine.js` nur in Arbeitspaketen anfassen, die das
  ausdrücklich vorsehen, und dann mit neuen Tests.
- **Sichtprüfung:** Jede optische Änderung per Playwright-Screenshot im Handyformat
  (915 × 412, Pixeldichte 2,6) und im Tabletformat (1600 × 800) prüfen.
- **Signatur:** Immer mit `werkzeuge/signatur/chroniken-test.p12` signieren, sonst gehen Updates nicht.
- **Lizenzen:** Nur eigene, generierte oder klar lizenzfreie Assets (CC0/OFL/MIT), Quelle in der Credits-Liste notieren.

---

## Ehrliche Bestandsaufnahme

Warum sich das Spiel im Moment „billig“ und nicht flüssig genug anfühlt – mit Belegen aus dem Code.

### Optik – das Hauptproblem

1. **Die Grafik ist mit Code gezeichnet, nicht gemalt.** Hauptmenü, Steinplatten, Medaillons, Reiter und
   Basar bestehen aus Rechtecken, Kreisen, Verläufen und Konturlinien (`stone.js`, `stone.css`). Das
   ergibt bestenfalls Clipart-Niveau und wirkt primitiv – daran ändert auch Feinschliff nichts.
   Hochwertige Spiele nutzen **gemalte Texturen**: Stein mit Poren, Kanten, Abrieb, Schmutz in den Fugen,
   Metall mit Glanzlichtern, Edelsteine mit Lichtbrechung, weiche Umgebungsschatten.
2. **Kein einheitlicher Stil.** Gemalte, fast realistische Kartenmotive und Spielfelder treffen auf flache
   Vektorflächen im Hauptmenü und generische Web-Oberflächen (dunkle Kästen, Standardknöpfe) in Basar,
   Sammlung und Heldenwahl.
3. **Keine Tiefe und kein Licht.** Es gibt keine Lichtquelle, keine Schatten zwischen den Ebenen, keine
   Glanzlichter und keine Bewegung im Bild. Alles liegt platt auf einer Ebene.
4. **Typografie ohne Charakter.** Fließtext nutzt DejaVu Sans, es fehlt eine markante Display-Schrift.
5. **Basar wie ein Webshop.** Raster aus Kästen statt Inszenierung (kein Podest, kein Licht, keine Kaufanimation).
6. **Karten werden prozedural gezeichnet** (`R.card` in `render.js`): Verläufe und Ellipsen statt gemalter
   Rahmen; das Oval-Porträt erinnert zudem stark an Hearthstone.
7. **Sichtbarer Fehler:** Die goldene Platte „Partie fortsetzen“ ist zu schmal für ihren Text.

**Was Code leisten kann und was Bilder leisten müssen:** Code übernimmt Anordnung, Animation,
Lichteffekte darüber, Partikel, Text und Zustände (gedrückt, gesperrt). Material, Oberfläche,
Ornamente und Charakter müssen aus gemalten Bildern kommen.

### Flüssigkeit und Technik

1. **Ungleichmäßige Bildrate auf 90/120-Hz-Displays.** Die Zeichenschleife überspringt Frames
   (`now-lastFrame>=15` in `app.js`). Bei 90 Hz wechseln sich 11- und 22-ms-Abstände ab → Ruckeln.
2. **Teure Effekte pro Frame.** `render.js` nutzt 23-mal `shadowBlur` und erzeugt Verläufe neu, statt
   sie zwischenzuspeichern – auf schwächeren Handys der größte Bremsklotz.
3. **Menüs werden komplett neu aufgebaut.** 16 Stellen ersetzen ganze Bildschirme per `innerHTML`.
   Folgen: CSS-Übergänge sind unmöglich, Bilder flackern, die Scrollposition springt zurück (z. B. nach
   einem Kauf im Basar).
4. **Lange Ladezeit, großes APK.** Alle 29 Bilder (51 MB, Heldenatlanten je 3–3,4 MB PNG) werden vor
   dem Hauptmenü geladen und dekodiert. APK ≈ 53 MB.
5. **Animationen ohne Persönlichkeit.** Bewegungen haben kaum Ausholen, Nachschwingen, Gewicht oder
   Treffer-Stopp. Gezogene Karten fliegen sofort aufgedeckt aus dem Deck, Diener verschwinden beim Tod
   fast ohne Effekt.
6. **Native Hülle nur kompiliert.** Ohne Quelltext sind Verbesserungen wie echte Vibrationsmuster,
   Vollbild, Splash-Screen, 120 Hz, WebP-Unterstützung oder eine saubere Versionierung kaum möglich.
7. **Audio ungeprüft.** Die Steingeräusche wurden synthetisch erzeugt und nie auf einem Gerät angehört;
   die Musik ist eine prozedurale Eigenkomposition.
8. *Nebenpunkt:* Das Match-Canvas (1600 × 800) wird auf Handys hochskaliert (`devicePixelRatio` fehlt).
   Das stört weniger als die Gestaltung, wird aber im Technikteil mit erledigt.

### Was schon gut ist

Regel-Engine und KI laufen stabil (100 simulierte Partien), die Spielstand-Prüfung ist robust,
die Kartenmotive sind stark, Packöffnung und Basar-Logik funktionieren, die Grundstruktur der
Navigation steht. Darauf lässt sich aufbauen.

---

## Leitbild: nah an Hearthstone, aber eigenständig

**Übernehmen (Prinzipien, nicht Gestaltung):**
- Jede Aktion hat **Gewicht**: Ausholen → Bewegung → Einschlag → Nachwirkung.
- **Klarheit vor Effekt:** Was spielbar ist, leuchtet; was passiert, ist eindeutig lesbar.
- **Alles reagiert auf Berührung:** Kein Element bleibt stumm, wenn man es antippt.
- **Belohnungen werden inszeniert**, nicht nur verbucht.

**Bewusst vermeiden:** Blizzard-Namen und -Symbole (Spirale), die Schrift Belwe, das Oval-Kartenporträt,
das Brennseil als Zugtimer, Original-Sounds, 1:1 nachgebaute Bildschirme.

**Eigene Identität – „Die lebendige Chronik“:**
- Material: heller Kalkstein, Bronze, Blattgold, Lapislazuli-Akzente; Licht fällt warm von oben links.
- Die Welt ist ein **Archiv der Geschichte**: Kartenrahmen als Tempeltor- bzw. Bogenfenster-Form,
  Tote zerfallen zu Stein und Staub, der Zugtimer ist eine **glimmende Lunte an einer Schriftrolle**.
- Jede Epoche bringt ihren Klang und ihr Schlachtfeld mit (Sparta, Nil, Nordmeer, Japan …).

---

## Qualitätsziele

| Bereich | Ziel |
|---|---|
| Gestaltung | Jeder Bildschirm besteht aus gemalten Assets nach der Stil-Bibel; Freigabe durch dich vor dem Einbau |
| Bildrate im Match | stabil 60 fps (95 % der Frames < 16,7 ms) auf einem Mittelklasse-Handy, z. B. Galaxy A54 |
| Touch-Reaktion | sichtbare Reaktion < 50 ms nach Berührung |
| Menüwechsel | ≤ 600 ms, unterbrechbar |
| Start bis Hauptmenü | < 2,5 s (kalt), < 1 s (warm) |
| APK-Größe | < 25 MB |

---

## Arbeitsplan

Größen: **S** = eine Sitzung, **M** = zwei Sitzungen, **L** = drei oder mehr.
Jedes Arbeitspaket (AP) hat Abnahmekriterien; abhaken, wenn erfüllt.

### Phase 0 – Sofortkorrekturen (S)

**AP 0.1 – Sichtbare Fehler beheben**
- [ ] Goldene Platte „Partie fortsetzen“: Breite und Schriftgröße so anpassen, dass der Text mit Abstand zu den Nieten passt (`renderMenu` in `app.js`, `.plaque.gold` in `stone.css`).
- [ ] Basar: Scrollposition und aktiven Reiter nach Kaufen/Ausrüsten erhalten (`renderPacks`).
- Abnahme: Screenshots im Handy- und Tabletformat ohne Überläufe; im Basar kein Sprung nach einem Kauf.

**AP 0.2 – Audio-Check auf dem Gerät**
- [ ] Steingeräusche (`stone`, `scrape`, `grind`, `slam`) auf dem Handy anhören, Lautstärken in `audio.js` angleichen, bei Bedarf durch lizenzfreie Aufnahmen ersetzen.

### Phase 1 – Neue Optik mit gemalten Grafiken (höchste Priorität, L)

Grundsatz: **Erst Stil festlegen und von dir freigeben lassen, dann Grafiken erzeugen, dann einbauen.**
Kein Bildschirm wird mehr aus Code-Formen gezeichnet; `stone.js` dient danach nur noch für Animation und Effekte.

**AP 1.1 – Stil-Bibel und Konzeptbild (S)**
- [ ] Moodboard: 6–10 Referenzbilder, was gefällt (Materialien, Licht, Farbigkeit) und was nicht.
- [ ] **Ein Konzeptbild des kompletten Hauptmenüs** (1920 × 1080) als Zielbild – gemalt, mit Ring, Platten,
  Medaillons, Goldanzeige. Erst wenn du dieses Bild freigibst, werden Einzelteile erzeugt.
- [ ] Datei `stil/STILBIBEL.md`: Farbpalette (Hex-Werte), Materialien (heller Kalkstein mit Poren und Abrieb,
  gealterte Bronze, Blattgold, Lapislazuli), Licht warm von oben links, Detailgrad, Schriften, Icon-Stil,
  Bewegungssprache (Dauern, Easing-Kurven), Klangfarben.
- [ ] Schriften (OFL, offline): Vorschlag **Cinzel Decorative/Cinzel** für Titel, **Alegreya Sans** oder **Fira Sans** für Text.
- Abnahme: Du gibst Konzeptbild und Stil-Bibel frei.

**AP 1.2 – Asset-Werkstatt: gemalte UI-Grafiken erzeugen (M)**

Die Grafiken entstehen außerhalb des Codes. Claude-Code-Sitzungen haben bisher kein Bildgenerierungs-Werkzeug,
die Bilder kommen deshalb von dir oder werden zugekauft. Möglichkeiten:
- **Bild-KI** (z. B. ChatGPT-Bilder, Midjourney, Leonardo) mit dem Prompt-Paket unten – günstig und schnell;
  das freigegebene Konzeptbild als Stilreferenz anhängen, damit alles zusammenpasst.
- **Lizenzierte UI-Kits** aus Asset-Shops (Lizenz für kommerzielle Mobile-Spiele prüfen).
- **Illustrator beauftragen** – beste Qualität, kostet Geld.

Ablauf: Grafiken in doppelter Zielgröße erzeugen, mit transparentem Hintergrund (oder einfarbig zum
Freistellen), in `ungenutzte_assets/ui/` hochladen. Die nächste Sitzung stellt frei, schneidet zu
(9-Slice für Panels), optimiert und baut ein.

Gemeinsamer Prompt-Anfang für einen einheitlichen Stil:
*„Game UI asset for a mobile card game, hand-painted stylized fantasy-antique style, weathered light limestone
with fine pores, chipped edges and dust in the crevices, aged bronze and gold trim with soft specular
highlights, warm light from top left, soft ambient occlusion, rich detail, clean readable silhouette,
isolated on transparent background, no text“*.

| Asset | Größe (px) | Verwendung | Prompt-Zusatz |
|---|---|---|---|
| Hauptmenü-Hintergrund | 3840 × 1920 | Halle mit großem Steinportal | „ancient sunlit temple hall, great round carved stone portal in the centre, meander frieze, columns, light shafts, depth“ (ohne transparenten Hintergrund) |
| Modus-Platte normal + gedrückt | 1400 × 260 | Schlacht / Kampagne / Kolosseum | „wide carved limestone plaque with bronze end caps and rivets, empty centre for text“ |
| Platte „Fortsetzen“ | 1400 × 260 | laufende Partie | „same plaque in gilded bronze“ |
| Medaillon-Rahmen | 512 × 512 | Aufgaben, Basar, Sammlung, Pakete | „round carved stone medallion with bronze rim, empty inner disc“ |
| Medaillon-Symbole | je 384 × 384 | Schriftrolle, Münzbeutel, Buch, Kartenpaket | „embossed relief icon of a …“ |
| Seitenbalken | 2000 × 200 | Menübalken links/rechts | „long horizontal stone beam with bronze bands“ |
| Goldanzeige | 800 × 200 | oben rechts | „bronze framed counter with stone inlay and gold coin slot“ |
| Zahnrad-Knopf | 256 × 256 | Einstellungen | „round stone button with carved bronze gear“ |
| Panel (9-Slice) | 768 × 768 | Fenster, Kacheln | „stone tablet frame with bronze corners, recessed darker centre“ |
| Reiter aktiv + inaktiv | 800 × 180 | Basar, Sammlung | „small carved stone tab with bronze trim; active version glowing gold“ |
| Präsentationspodest | 1200 × 900 | Basar-Vorschau | „round marble pedestal with soft spotlight“ |
| Kartenrahmen je Seltenheit | 800 × 1128 | Karten | „card frame shaped like a temple gateway arch, gem slot at top, name banner, rarity colour accents“ |
| Heldenrahmen | 800 × 800 | Match-Porträt | „round bronze and stone hero frame with laurel wreath“ |
| Zug-Beenden-Knopf | 700 × 300 | Match | „ornate bronze and stone button with glowing rune slot“ |
| Mana-Säule | 300 × 1200 | Match | „vertical stone pillar with ten lapis gem sockets“ |

- Abnahme: Alle Grafiken liegen vor, passen sichtbar zum Konzeptbild, du hast sie freigegeben.

**AP 1.3 – Hauptmenü 2.0 aus gemalten Grafiken (M)**
- [ ] Code-Formen aus `stone.js` durch die Grafiken ersetzen; Ring, Platten, Balken behalten ihre Funktion.
- [ ] Tiefe: Hintergrund, Mittelgrund und Knöpfe als Ebenen mit leichter Parallaxe; echte Schatten zwischen den Ebenen.
- [ ] Leben: Lichtstrahlen, schwebender Staub, Glanzlauf über Medaillons und Gold, pulsierende Benachrichtigungs-Siegel.
- [ ] Auftritt beim Start (≤ 700 ms, überspringbar); Menüwechsel kürzer und satter (≤ 600 ms).
- [ ] Breitbild-Handys: Seitenbereiche mit Bildinhalt füllen statt einfarbiger Balken.
- Abnahme: Screenshot neben dem Konzeptbild – gleiche Qualität und Stimmung; du gibst frei.

**AP 1.4 – Basar 2.0 (M)**
- [ ] Schaufenster statt Raster: Auswahl links, großes Präsentationspodest rechts mit Licht.
- [ ] Kartenrücken drehen sich in 3D, Skins im Heldenrahmen, Schlachtfelder als Miniatur-Spielfeld mit Deko-Animation.
- [ ] Kaufen inszenieren: Münzen fliegen aus der Goldanzeige, Siegel bricht, Gegenstand leuchtet auf, kräftiger Klang.
- [ ] Panels, Reiter und Wallet aus den gemalten Grafiken; klare Zustände (gesperrt, besitzt, ausgerüstet).

**AP 1.5 – Karten neu gestalten (M)**
- [ ] Gemalte Rahmen aus AP 1.2 statt prozeduraler Formen, eigenständige Tempeltor-Form, bessere Textsetzung.
- [ ] Neue Kartenrücken als gemalte Bilder statt Code-Zeichnung.
- [ ] „Goldene Karten“ als Kosmetik: animierter Goldglanz und Partikel.

**AP 1.6 – Sammlung und Deckbau 2.0 (M)**
- [ ] Kartenbuch mit Umblätter-Animation, Antippen zoomt die Karte heran, Filter als gemalte Steinknöpfe.
- [ ] Deckliste mit animierter Mana-Kurve, Karten fliegen beim Hinzufügen ins Deck.

**AP 1.7 – Heldenwahl, Kampagnenkarte, Match-Oberfläche (M)**
- [ ] Heldenwahl als Galerie mit großem Porträt, Fähigkeit und Lieblingskarten.
- [ ] Kampagne als gemalte Weltkarte mit Stationen von Sparta bis Japan.
- [ ] Match: Heldenrahmen, Mana-Säule, Zug-Beenden-Knopf, Friedhof und Deck aus den gemalten Grafiken.
- [ ] Gegnerhand und Deckstapel zeigen die neuen gemalten Kartenrücken.

### Phase 2 – Technisches Fundament (L)

**AP 2.1 – Native Android-Hülle neu aufsetzen (M)**
- [ ] Gradle-Projekt (Kotlin) mit gleicher Paket-ID `de.chroniken.helden.layout`, `WebViewAssetLoader` für `https://chroniken.local/`, Brücke mit identischer JS-API (siehe Projektaufbau). Verhalten der alten Hülle lässt sich aus `classes.dex` ablesen.
- [ ] Gleicher Signaturschlüssel, `versionCode` > 6, CI baut mit Gradle statt mit `apk_bauen.py`.
- [ ] Gewinne: echte MIME-Typen (WebP/JPEG), Vollbild mit Display-Aussparung, Bildschirm bleibt an während eines Matches, Splash-Screen, richtiges App-Icon, `VIBRATE` mit Mustern, hohe Bildwiederholrate.
- Abnahme: Update über 1.3.0 installierbar, Spielstand bleibt, alle Brückenfunktionen getestet.

**AP 2.2 – Asset-Pipeline (S)**
- [ ] Alle Bilder nach WebP (Qualität ~85), Atlanten in benötigter Größe; Kartenmotive für Daumennagel und Großansicht getrennt.
- [ ] Laden in Stufen: Hauptmenü sofort, Match-Assets im Hintergrund, Ladebalken mit echtem Fortschritt.
- Abnahme: APK < 25 MB, Start bis Menü < 2,5 s auf dem Testhandy.

**AP 2.3 – UI ohne Komplett-Neuaufbau (M)**
- [ ] Bildschirme behalten ihre DOM-Knoten; nur geänderte Teile werden aktualisiert (kleiner eigener Helfer oder offline eingebundene Mini-Bibliothek wie Preact + htm, ca. 10 KB).
- [ ] Gemeinsame Bausteine: Steinknopf, Panel, Reiter, Wallet, Modal – je einmal implementiert, mit den gemalten Grafiken.
- Abnahme: Übergänge laufen weich, keine Bild-Neuladungen, Scrollpositionen bleiben.

**AP 2.4 – Match-Renderer entlasten (S)**
- [ ] Frame-Drossel `now-lastFrame>=15` entfernen (Ruckeln auf 90/120 Hz).
- [ ] Canvas-Auflösung an die Pixeldichte koppeln (höchstens 2), Touch-Koordinaten bleiben in Spielfeld-Einheiten.
- [ ] Statische Ebene (Spielfeld, Rahmen, Deko) einmal offscreen zeichnen; Leucht- und Schatteneffekte als vorgerenderte Sprites statt `shadowBlur` pro Frame.
- [ ] Entwickler-Overlay (FPS, Frame-Zeit) über eine versteckte Einstellung.
- Abnahme: Frame-Zeit auf dem Testhandy mindestens halbiert (vorher/nachher hier eintragen).

**AP 2.5 – Entscheidung Canvas 2D oder WebGL (PixiJS) (S)**
- [ ] Prototyp: ein Match-Bildschirm mit 7 Dienern pro Seite, voller Hand und Partikelregen in PixiJS (MIT, offline eingebunden); auf dem Gerät gegen den optimierten Canvas messen.
- Empfehlung: auf PixiJS wechseln, wenn Canvas nach AP 2.4 nicht stabil 60 fps hält oder Glüh-, Verzerrungs- und Partikeleffekte aus Phase 3 gewünscht sind. Engine bleibt unverändert.

**AP 2.6 – Automatische Sichtprüfung (S)**
- [ ] Playwright-Tests in CI: Klickpfad Menü → Basar → Match → Ergebnis, Screenshots als Artefakt, Vergleich gegen Referenzbilder.
- Abnahme: CI schlägt bei JavaScript-Fehlern oder starken Bildabweichungen fehl.

### Phase 3 – Game Feel im Match (L)

Alle Animationen werden aus den bestehenden Engine-Ereignissen (`events`) abgeleitet – die Regeln bleiben unverändert.

**AP 3.1 – Animations-Werkzeugkasten (S)**
- [ ] Tweens mit Easing-Kurven, Zeitleisten, Treffer-Stopp (40–80 ms), Kamerawackeln nach Gewicht, Federn für Kartenbewegung.
- [ ] Geschwindigkeitseinstellung wirkt auf alle Animationen.

**AP 3.2 – Karten in der Hand (S)**
- [ ] Antippen hebt die Karte an und vergrößert sie, Ziehen neigt sie mit Federphysik, weicher Schatten.
- [ ] Ausspielen mit Schwung, Landung mit Staubring und kurzem Kameraruck; spielbare Karten mit lebendigem Leuchtrand.

**AP 3.3 – Kartenziehen (S)**
- [ ] Karte verlässt das Deck verdeckt (ausgerüsteter Kartenrücken), dreht sich in der Luft um.
- [ ] Animationen für volle Hand (Karte verbrennt) und Erschöpfung.

**AP 3.4 – Diener (M)**
- [ ] Beschwörung: Fall, Aufprall, Staub; leichtes Atmen im Stand.
- [ ] Angriff: Ausholen, Sprung, Einschlag mit Treffer-Stopp, Rückprall.
- [ ] Schadenszahlen als Comic-Einschlag, Gottesschild als Lichtblase, Spott als Steinschild.
- [ ] **Tod: Diener zerfällt zu Stein und Staub** (Markenzeichen der Chronik).
- [ ] Legendäre Auftritte mit Banner, Lichtsäule und eigenem Klang.

**AP 3.5 – Zauber und Heldenfähigkeiten (M)**
- [ ] Partikeleffekte je Element (Feuer, Heilung, Blitz, Schatten, Sterne) mit Flugbahn und Einschlag.
- [ ] Jede der 10 Heldenfähigkeiten bekommt einen eigenen Effekt.

**AP 3.6 – Zugwechsel und Ressourcen (S)**
- [ ] „Dein Zug“ als Steintafel, die herunterfällt und einrastet.
- [ ] Zugtimer als **glimmende Lunte** an einer Schriftrolle (eigene Idee statt Brennseil).
- [ ] Mana-Edelsteine füllen sich nacheinander mit Glanz und Klang.

**AP 3.7 – Match-Anfang und -Ende (S)**
- [ ] Intro: Helden stehen sich gegenüber, Namen und Epochen erscheinen, Kampfgong.
- [ ] Ende: unterlegenes Porträt zerspringt, Siegerlorbeer, Belohnungen werden mit Fortschrittsbalken ausgeschüttet.

**AP 3.8 – Lebendige Schlachtfelder (S)**
- [ ] Jedes Schlachtfeld hat 3–4 antippbare Deko-Objekte mit Animation und Klang (Laterne flackert, Eule dreht den Kopf, Ahornblätter wehen).

**AP 3.9 – Lesbarkeit (S)**
- [ ] Langer Druck erklärt Schlüsselwörter (Spott, Gottesschild, Kampfschrei …) in Sprechblasen.
- [ ] Angriffsvorschau zeigt den zu erwartenden Schaden; Zielpfeil als Bronzepfeil mit Lichtspur.

### Phase 4 – Audio und Haptik (M)

**AP 4.1 – Klangbild**
- [ ] Geräusche nach Kategorien (Stein-UI, Papier/Karten, Kampf, Magie, Belohnung) aus lizenzfreien Quellen,
  Lautheit angleichen, je Ereignis 2–3 Varianten; Quellen in den Credits.

**AP 4.2 – Musik**
- [ ] Themen für Menü, Kampf, Spannung, Sieg und Niederlage (lizenzfrei oder eigen), weiche Überblendungen, Spannung steigt mit niedrigem Leben.

**AP 4.3 – Haptik-Sprache** (benötigt AP 2.1)
- [ ] Leicht (Antippen), mittel (Ausspielen, Einrasten), schwer (Treffer, Tod, legendärer Auftritt); in den Einstellungen abschaltbar.

### Phase 5 – Spielspaß und Inhalte (fortlaufend)

**AP 5.1 – KI mit Schwierigkeitsgraden (M)** – *ändert `engine.js`, nur mit neuen Tests*
- [ ] Stufen Lehrling, Feldherr, Legende; Vorausschau über 1–2 Züge, Persönlichkeit je Held (aggressiv, defensiv).

**AP 5.2 – Kolosseum als echter Draft-Modus (M)**
- [ ] Held aus 3 wählen, dann 30-mal 1 aus 3 Karten; Lauf endet bei 3 Niederlagen oder 12 Siegen; Belohnung nach Siegen.
- [ ] Läuft nur auf App-Ebene: eigenes Deck, keine Sammlungsprüfung, Regeln unverändert.

**AP 5.3 – Schlacht mit Offline-Rangliste (S)**
- [ ] Ränge aus Stein, Bronze, Silber, Gold und Lapis mit Sternen; Saisonbelohnungen.

**AP 5.4 – Aufgaben und Fortschritt (S)**
- [ ] Tägliche Aufgaben mit Rotation und einmal Neuwürfeln pro Tag, Login-Bonus.
- [ ] Heldenstufen mit Belohnungen (Gold, Skins, goldene Karten).

**AP 5.5 – Kampagne 2.0 (M)**
- [ ] Kapitel mit kurzen Story-Szenen und Sprechblasen, Bosse mit eigenen Fähigkeiten, gelegentliche Kartenrätsel.

**AP 5.6 – Balance (S)**
- [ ] Simulationstest erweitern: Siegraten je Held und Karte; Ziel 45–55 % je Held gegen das Feld.

**AP 5.7 – Tutorial (S)**
- [ ] Die ersten drei Partien geführt: Ausspielen, Angreifen, Heldenfähigkeit – mit Hand-Hinweisen.

**AP 5.8 – Eigenständige Mechaniken (L)** – *ändert Regeln*
- [ ] Ideen, die die Chronik unverwechselbar machen: **Epochen-Synergien** (Bonus, wenn drei Karten derselben Ära gespielt wurden), **Relikte** als dritter Kartentyp (die Atlasfelder für Spartanerschild und Astrolabium sind schon gemalt), **Chronik-Ereignisse**, die beide Spieler betreffen.

### Phase 6 – Release-Qualität (M)

- [ ] Geräte-Testmatrix: schwach/mittel/stark, 60/90/120 Hz, Seitenverhältnisse 16:9 bis 21:9.
- [ ] Einstellungen: Grafikqualität (Partikel, Auflösung), Textgröße, Farbsehschwäche-Modus.
- [ ] Lokales Fehlerprotokoll und automatische Spielstand-Sicherungen.
- [ ] Optional Play-Store: eigener Upload-Schlüssel, Datenschutzerklärung, Store-Grafiken.

---

## Empfohlene Reihenfolge der Sitzungen

| Sitzung | Arbeitspakete | Warum jetzt |
|---|---|---|
| 1 | AP 0.1, AP 1.1 | Fehler weg; Stil und Konzeptbild festlegen – du gibst frei |
| zwischen 1 und 2 | AP 1.2 (du) | Grafiken mit dem Prompt-Paket erzeugen und hochladen |
| 2–3 | AP 1.3, AP 2.3 | Neues Hauptmenü aus gemalten Grafiken auf solider UI-Basis |
| 4–5 | AP 1.4, AP 1.5 | Basar und Karten auf Premium-Niveau |
| 6–7 | AP 2.1, AP 2.2, AP 0.2 | Native Hülle, WebP, schneller Start, Haptik-Grundlage |
| 8 | AP 2.4, AP 2.5, AP 2.6 | Flüssiges Match, Renderer-Entscheidung, Sicherheitsnetz |
| 9–10 | AP 3.1–3.4 | Das Match fühlt sich gewichtig und lebendig an |
| 11 | AP 1.6, AP 1.7 | Sammlung, Heldenwahl, Kampagne, Match-Oberfläche im neuen Stil |
| 12 | AP 3.5–3.9, Phase 4 | Effekte, Klang, Haptik aus einem Guss |
| 13+ | Phase 5 (zuerst 5.2 Draft, 5.4 Aufgaben, 5.7 Tutorial) | Mehr Gründe, wiederzukommen |

Tipp: Eine Sitzung sollte mit einer grünen CI und einer installierbaren APK enden, auch wenn ein Paket noch nicht ganz fertig ist.

---

## Vorlage für den Start einer Sitzung

Kopiere diesen Text in eine neue Sitzung und passe die Paketnummer an:

> Lies die `README.md` im Repo `thepytales/Chronicle_of_Heroes`. Arbeite **AP 0.1 und AP 1.1** ab.
> Halte dich an die „Regeln für jede Sitzung“, prüfe optische Änderungen mit Screenshots im
> Handyformat, lass die Tests laufen und sorge für eine grüne CI. Hake erledigte Punkte in der
> README ab und trage Messwerte ein. Öffne am Ende einen Pull Request nach `main`.
