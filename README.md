# Aeterna

*Vormals „Chroniken der Helden“.* Ein historisches Offline-Kartenduell für Android: 140 Karten,
10 Helden von Leonidas bis Musashi, 10 Kampagnenmissionen. Aktueller Stand im Code: **Version 1.4.0**
(neuer Name Aeterna, gemaltes Hauptmenü nach dem Konzeptbild, Stil-Bibel, Tagesduell); davor 1.3.0 mit
Basar, Kartenrücken, Helden-Skins und Schlachtfeldern.

![Konzeptbild und Umsetzung des Hauptmenüs](stil/vergleich-hauptmenue.jpg)

Dieses Dokument ist zugleich der **Arbeitsplan** für die nächsten Sitzungen. Ziel: Aeterna soll sich so
flüssig und hochwertig anfühlen wie die besten Kartenspiele, ohne eine Kopie zu sein, und vor allem Spaß machen.

---

## Inhalt

1. [APK herunterladen](#apk-herunterladen)
2. [Projektaufbau](#projektaufbau)
3. [Regeln für jede Sitzung](#regeln-für-jede-sitzung)
4. [Ehrliche Bestandsaufnahme](#ehrliche-bestandsaufnahme)
5. [Leitbild: nah an Hearthstone, aber eigenständig](#leitbild-nah-an-hearthstone-aber-eigenständig)
6. [Qualitätsziele](#qualitätsziele)
7. [Arbeitsplan](#arbeitsplan)
   - [Phase 0 – Sofortkorrekturen und Umbenennung](#phase-0--sofortkorrekturen-und-umbenennung-s)
   - [Phase 1 – Neue Optik mit gemalten Grafiken](#phase-1--neue-optik-mit-gemalten-grafiken-höchste-priorität-l)
   - [Phase 2 – Technisches Fundament](#phase-2--technisches-fundament-l)
   - [Phase 3 – Game Feel im Match](#phase-3--game-feel-im-match-l)
   - [Phase 4 – Klang, Stimmen und Haptik](#phase-4--klang-stimmen-und-haptik-m)
   - [Phase 5 – Regeln, Karten und Balance](#phase-5--regeln-karten-und-balance-l)
   - [Phase 6 – Spielmodi und Motivation](#phase-6--spielmodi-und-motivation-fortlaufend)
   - [Phase 7 – Release-Qualität](#phase-7--release-qualität-m)
8. [Weitere Ideen](#weitere-ideen)
9. [Deine Ideensammlung – wo sie im Plan steht](#deine-ideensammlung--wo-sie-im-plan-steht)
10. [Offene Entscheidungen](#offene-entscheidungen)
11. [Empfohlene Reihenfolge der Sitzungen](#empfohlene-reihenfolge-der-sitzungen)
12. [Vorschlag für die nächste Sitzung](#vorschlag-für-die-nächste-sitzung)

---

## APK herunterladen

Jeder Push baut automatisch eine signierte Test-APK (`.github/workflows/apk.yml`).

1. Im Repo auf **Actions** gehen und den obersten grünen Lauf **„Test-APK bauen“** auf `main` öffnen.
2. Unten unter **Artifacts** auf `Aeterna-<Version>-Test-APK` tippen.
3. Die ZIP-Datei entpacken – darin liegt die APK.

Umstieg von 1.2.2 (anderer Signaturschlüssel): In der alten App *Einstellungen → Spielstand
exportieren*, alte App deinstallieren, neue installieren, *Spielstand importieren*. Ab 1.3.0
installieren sich neue Versionen direkt als Update (1.3.0 → 1.4.0: einfach die neue APK installieren).

---

## Projektaufbau

Das Spiel ist eine Web-App (HTML/CSS/JavaScript) in einer Android-WebView. Menüs sind DOM,
das Match wird auf ein Canvas (1600 × 800) gezeichnet.

| Pfad | Inhalt |
|---|---|
| `quellcode/` | Kompletter APK-Inhalt. `classes.dex` ist die **kompilierte** native Hülle (kein Java-Quelltext vorhanden). |
| `quellcode/assets/game/data.js` | Helden, 140 Karten, Spielsteine (Tokens), Missionen |
| `quellcode/assets/game/engine.js` | Regel-Engine und KI (`CHE`) |
| `quellcode/assets/game/profile.js` | Spielstand, Packs, Aufgaben, Import-Prüfung (`CHP`) |
| `quellcode/assets/game/cosmetics.js` | Kosmetik-Katalog, Kaufen/Ausrüsten (`CHK`) |
| `quellcode/assets/game/render.js` | Match-Zeichnung auf dem Canvas (`CHR`) |
| `quellcode/assets/game/motion.js` | Match-Animationen (`CHM`) |
| `quellcode/assets/game/layout.js` | Gemeinsame Geometrie für Zeichnen und Touch (`CHL`) |
| `quellcode/assets/game/hall.js` / `hall.css` | Hauptmenü aus dem Konzeptbild (`CHH`): ausgeschnittene Ebenen, Auftritt, Ring-Übergang; Schriften und Farbvariablen `--ae-…` |
| `quellcode/assets/game/stone.js` / `stone.css` | Steinplatten-Übergang, Kartenrücken, Basar |
| `quellcode/assets/game/assets/fonts/` | Cinzel, Cinzel Decorative, Alegreya Sans (SIL OFL, Lizenztexte daneben) |
| `quellcode/assets/game/app.js` | Bildschirme, Navigation, Gesten, Basar-Logik |
| `quellcode/assets/game/audio.js` | Web-Audio-Mischer (`CHA`) |
| `werkzeuge/` | APK-Build und -Signatur, Manifest (Version, App-Name), Hauptmenü-Bild, Sound-Generator, Sichtprüfung, Tests – siehe `werkzeuge/LIESMICH.md` |
| `stil/` | Stil-Bibel (`STILBIBEL.md`), Stil-Tafel und Vergleichsbild Konzept ↔ Umsetzung |
| `ungenutzte_assets/` | Ausgangsbilder; `ui/hauptmenue-konzept.jpg` ist das Konzeptbild des Hauptmenüs |

Native Brücke (`window.Android`): `save`, `load`, `exportSave`, `importSave`, `haptic(0|1)`,
`exitApp`. Inhalte werden unter `https://chroniken.local/` ausgeliefert; die Hülle kennt nur die
Endungen `.html .js .css .png .ogg .ttf .json`.

**Bereits vorhandene Spielmechanik** (damit nichts doppelt gebaut wird): Mana 1 → 10,
Startkarten-Tausch, Münze für den zweiten Spieler („Initiative“, 0 Mana, +1 Mana in diesem Zug),
Handlimit 10 mit Verbrennen, steigende Erschöpfung bei leerem Deck, Aufmarsch-Verzögerung,
höchstens 7 Diener pro Seite, kein Zugtimer, Spott, Gottesschild, Kampfschrei, Todesröcheln,
Ansturm, Waffen, Rüstung, Totems, KI-Gegner.

---

## Regeln für jede Sitzung

- **Tests vor jedem Push:** `node --test werkzeuge/tests/*.test.js` (Kosmetik, Spielstand, 100 simulierte Partien).
- **CI muss grün sein**, die APK kommt aus Actions – keine gebauten APKs/ZIPs ins Repo.
- **Spielstände bleiben kompatibel:** Neue Felder immer über eine `normalize`-Funktion ergänzen
  (Muster: `CHK.normalize`), alte Saves dürfen nie verloren gehen. Interne Schlüssel wie
  `chroniken.profile` bleiben trotz Umbenennung bestehen.
- **Regeländerungen nur bewusst:** `data.js`/`engine.js` nur in Arbeitspaketen anfassen, die das
  ausdrücklich vorsehen (Phase 5), und dann mit neuen Tests und Simulationslauf.
- **Sichtprüfung:** Jede optische Änderung per Playwright-Screenshot im Handyformat
  (915 × 412, Pixeldichte 2,6) und im Tabletformat (1600 × 800) prüfen –
  `node werkzeuge/sichtpruefung.js` liefert beides plus Messwerte (`sichtpruefung/`, nicht im Repo).
- **Stil:** Neue Oberflächen folgen `stil/STILBIBEL.md` (Palette als `--ae-…`-Variablen in `hall.css`).
- **Signatur und Paket-ID:** Immer mit `werkzeuge/signatur/chroniken-test.p12` signieren, Paket-ID
  `de.chroniken.helden.layout` nie ändern – sonst gehen Updates nicht.
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
   *Stand 1.4.0:* Das Hauptmenü ist jetzt das gemalte Konzeptbild; Basar, Sammlung, Heldenwahl und Spielbrett folgen (AP 1.4–1.8).
2. **Kein einheitlicher Stil.** Gemalte, fast realistische Kartenmotive und Spielfelder treffen auf flache
   Vektorflächen im Hauptmenü und generische Web-Oberflächen (dunkle Kästen, Standardknöpfe) in Basar,
   Sammlung und Heldenwahl.
3. **Keine Tiefe und kein Licht.** Es gibt keine Lichtquelle, keine Schatten zwischen den Ebenen, keine
   Glanzlichter und keine Bewegung im Bild. Alles liegt platt auf einer Ebene.
4. **Typografie ohne Charakter.** Fließtext nutzt DejaVu Sans, es fehlt eine markante Display-Schrift.
   *Stand 1.4.0:* Cinzel, Cinzel Decorative und Alegreya Sans sind eingebunden und im Hauptmenü und Ladebildschirm im Einsatz.
5. **Basar wie ein Webshop.** Raster aus Kästen statt Inszenierung (kein Podest, kein Licht, keine Kaufanimation).
6. **Karten werden prozedural gezeichnet** (`R.card` in `render.js`): Verläufe und Ellipsen statt gemalter Rahmen.
7. ~~**Sichtbarer Fehler:** Die goldene Platte „Partie fortsetzen“ ist zu schmal für ihren Text.~~ Behoben mit AP 1.3.

**Was Code leisten kann und was Bilder leisten müssen:** Code übernimmt Anordnung, Animation,
Lichteffekte darüber, Partikel, Text und Zustände (gedrückt, gesperrt). Material, Oberfläche,
Ornamente und Charakter müssen aus gemalten Bildern kommen.

### Karten und Balance

1. **Die Legendären sind belanglos.** Alle 12 folgen demselben Muster: großer Körper für 7–9 Mana plus
   ein einfacher Kampfschrei oder ein Schlüsselwort (viermal Diener rufen, dreimal Karten ziehen, zweimal
   Werte erhöhen, dazu Heilung/Rüstung). Keine verändert eine Regel, keine ist ein Baustein, um den man ein
   Deck baut, und mehrere sind fast identisch (Andraste und Lagertha rufen beide zwei Krieger 2/2,
   Marco und Herodot ziehen beide drei Karten). Es gibt keine legendären Zauber, Waffen oder Bauwerke.
2. **Kleines, gleichförmiges Set.** 60 Basis-, 28 gewöhnliche, 26 seltene, 14 epische, 12 legendäre Karten;
   je Held 10 eigene, 40 neutrale. Nur fünf Schlüsselwörter (Spott 22×, Kampfschrei 27×, Gottesschild 15×,
   Todesröcheln 13×, Ansturm 11×) – wenig Raum für Kombinationen und Überraschungen.
3. **Schlüsselwörter tragen die deutschen Hearthstone-Namen** (Spott, Gottesschild, Kampfschrei,
   Todesröcheln, Ansturm). Das verstärkt den Eindruck einer Kopie.
4. **Heldenbalance ist ungeprüft.** Es gibt bisher keine Messung der Siegquoten je Held oder Paarung.

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
7. **Audio ungeprüft und dünn.** Die Steingeräusche wurden synthetisch erzeugt und nie auf einem Gerät
   angehört; die Musik ist eine prozedurale Eigenkomposition; Diener haben keine eigenen Stimmen oder Laute.
8. *Nebenpunkt:* Das Match-Canvas (1600 × 800) wird auf Handys hochskaliert (`devicePixelRatio` fehlt).

### Was schon gut ist

Regel-Engine und KI laufen stabil (100 simulierte Partien), die Spielstand-Prüfung ist robust,
die Kartenmotive sind stark, Packöffnung und Basar-Logik funktionieren, die Grundstruktur der
Navigation steht – und mit `ungenutzte_assets/ui/hauptmenue-konzept.jpg` gibt es jetzt ein
gemaltes Zielbild für das Hauptmenü.

---

## Leitbild: nah an Hearthstone, aber eigenständig

**Übernehmen (Prinzipien, nicht Gestaltung):**
- Jede Aktion hat **Gewicht**: Anheben → Schweben → Einschlag → Nachwirkung (Staub, Risse, Klang).
- **Klarheit vor Effekt:** Was spielbar ist, leuchtet; was passiert, ist eindeutig lesbar.
- **Alles reagiert auf Berührung:** Kein Element bleibt stumm, wenn man es antippt.
- **Jede Karte hat eine Stimme:** Auftritt, Angriff und Tod klingen unverwechselbar.
- **Belohnungen werden inszeniert**, nicht nur verbucht.

**Bewusst vermeiden:** Blizzard-Namen und -Symbole (Spirale), die Schrift Belwe, die deutschen
Hearthstone-Schlüsselwörter (werden in AP 5.4 ersetzt), das Brennseil als Zugtimer, Original-Sounds,
1:1 nachgebaute Bildschirme und Kartenrahmen.

**Eigene Identität – „Die lebendige Chronik“:**
- Material: heller Kalkstein, poliertes dunkles Holz, Bronze, Blattgold, Lapislazuli-Akzente; Licht fällt warm.
- Das Spielfeld ist ein **Feldherrentisch** mit eingeritzter Weltkarte; Diener werden auf dem Feld zu
  **Truppensiegel-Plaketten**, Helden sind gemeißelte Münzen oder Gemmen.
- Der **„Chronist der Zeiten“** ist die Erzählerstimme; die Schlacht wird als Chronik mitgeschrieben.
- Tote Einheiten zerbrechen zu **Gesteinssplittern**, Zug beenden ist ein **bronzenes Chronometer**,
  Zeitdruck gibt es nur in Belagerungsmissionen als **glühende Lunte**.
- Jede Epoche bringt ihren Klang, ihre Bildsprache und ihre **eigene Spielfeldhälfte** mit.

---

## Qualitätsziele

| Bereich | Ziel | Stand 1.4.0 (gemessen) |
|---|---|---|
| Gestaltung | Jeder Bildschirm besteht aus gemalten Assets nach der Stil-Bibel; Freigabe durch dich vor dem Einbau | Hauptmenü und Ladebildschirm ✓ (Freigabe offen); übrige Bildschirme noch alt |
| Bildrate im Match | stabil 60 fps (95 % der Frames < 16,7 ms) auf einem Mittelklasse-Handy, z. B. Galaxy A54 | Match noch nicht gemessen (AP 2.4). Hauptmenü im Ruhezustand: 95 % ≤ 16,7 ms, 1 von 180 Bildern > 20 ms bei 4× gedrosselter CPU¹ |
| Touch-Reaktion | sichtbare Reaktion < 50 ms nach Berührung | Hauptmenü: 8 ms, mit 4× gedrosselter CPU 13 ms¹ |
| Menüwechsel | ≤ 600 ms, unterbrechbar | vom Hauptmenü: 567 ms (4× CPU: 575 ms), neuer Bildschirm ab 396 ms; zurück ins Menü 333 ms¹ – nicht unterbrechbar |
| Start bis Hauptmenü | < 2,5 s (kalt), < 1 s (warm) | auf dem Gerät noch nicht gemessen; Desktop-Chromium mit lokalem Server 0,5 s (nicht aussagekräftig) |
| APK-Größe | < 25 MB | 55,8 MB (1.3.0: 55,2 MB; Hauptmenü-Bild 0,45 MB, Schriften 0,29 MB) |
| Heldenbalance | jeder Held 47–53 % Siegquote gegen das Feld (Simulation, ≥ 200 Partien je Paarung) | – (AP 5.1) |
| Legendäre | jede Legendäre hat einen einzigartigen Effekt, der eine Partie sichtbar verändert | – (AP 5.3) |

¹ Playwright-Emulation im Handyformat (915 × 412, Pixeldichte 2,6), `node werkzeuge/sichtpruefung.js`;
Werte auf einem echten Handy können abweichen.

---

## Arbeitsplan

Größen: **S** = eine Sitzung, **M** = zwei Sitzungen, **L** = drei oder mehr.
Jedes Arbeitspaket (AP) hat Abnahmekriterien; abhaken, wenn erfüllt.

### Phase 0 – Sofortkorrekturen und Umbenennung (S)

**AP 0.1 – Sichtbare Fehler beheben**
- [x] ~~Goldene Platte „Partie fortsetzen“: Text passt nicht (`renderMenu` in `app.js`, `.plaque.gold` in `stone.css`).~~
  Entfallen durch AP 1.3: „Partie fortsetzen“ steht auf der vierten Platte, lange Inschriften verkleinern sich automatisch.
- [ ] Basar: Scrollposition und aktiven Reiter nach Kaufen/Ausrüsten erhalten (`renderPacks`).
- Abnahme: Screenshots im Handy- und Tabletformat ohne Überläufe; im Basar kein Sprung nach einem Kauf.

**AP 0.2 – Audio-Check auf dem Gerät**
- [ ] Steingeräusche (`stone`, `scrape`, `grind`, `slam`) auf dem Handy anhören, Lautstärken in `audio.js` angleichen, bei Bedarf ersetzen.

**AP 0.3 – Umbenennung in „Aeterna“**
- [x] Texte: Fenstertitel und Ladebildschirm (`index.html`), Titeltafel im Hauptmenü, „Über das Spiel“,
  Packtitel „CHRONIKEN“, Kartenrücken „Chroniken-Siegel“ → „Aeterna-Siegel“ (interne ID `chroniken` bleibt),
  Pack-Aufdeckbildschirm, Export-Dateiname im Browser (`Aeterna-Spielstand.json`). Auch der Import-Hinweis
  und die Kartenrücken-Beschriftung; die Version steht nur noch an einer Stelle (`VERSION` in `app.js`).
- [x] App-Name auf dem Homescreen: Manifest-Label „Chroniken 1.3.0“ → „Aeterna“. `werkzeuge/manifest_version.py`
  baut den String-Pool jetzt neu auf (beliebige Länge, `--label`); ohne Änderung ist das Ergebnis byte-identisch,
  `androguard` liest das neue Manifest fehlerfrei.
- [x] Version 1.4.0 / versionCode 7; Artefakt- und APK-Namen im Workflow auf `Aeterna-<Version>-Test`.
- [x] Bleibt bewusst gleich: Paket-ID, Speicher-Schlüssel, Server-Name `chroniken.local`, das In-Game-Konzept
  „Chronik“ (Spielverlauf, Chronist). Der native Standard-Dateiname beim Export ändert sich erst mit AP 2.1.
  Abgesichert durch `werkzeuge/tests/aeterna.test.js`.
- Abnahme: Auf dem Gerät heißt die App „Aeterna“, Update über 1.3.0 funktioniert, Spielstand bleibt.
  *Stand:* Manifest, Signatur (v2, gleicher Schlüssel) und Tests geprüft; **der Test auf deinem Handy steht noch aus.**

### Phase 1 – Neue Optik mit gemalten Grafiken (höchste Priorität, L)

Grundsatz: **Erst Stil festlegen und von dir freigeben lassen, dann Grafiken erzeugen, dann einbauen.**
Kein Bildschirm wird mehr aus Code-Formen gezeichnet; `stone.js` dient danach nur noch für Animation und Effekte.

**AP 1.1 – Stil-Bibel (S)**
- [x] Ausgangspunkt ist das Konzeptbild `ungenutzte_assets/ui/hauptmenue-konzept.jpg`: Farben, Materialien,
  Lichtrichtung und Detailgrad daraus ableiten. *Die Farbwerte sind im Bild gemessen; abgeleitet sind nur Gravur- und Zustandsfarben.*
- [x] Datei `stil/STILBIBEL.md`: Farbpalette (Hex-Werte), Materialien (heller Kalkstein mit Poren und Abrieb,
  poliertes dunkles Holz, gealterte Bronze, Blattgold, Lapislazuli, Efeu), Licht, Konturstärken, Schriften,
  Icon-Stil, Bewegungssprache (Dauern, Easing-Kurven), Klangfarben je Epoche. Dazu die Übersicht
  [`stil/stiltafel.jpg`](stil/stiltafel.jpg) und die Palette als CSS-Variablen (`--ae-…` in `hall.css`).
- [x] Schriften (OFL, offline): **Cinzel Decorative** (Logo), **Cinzel** (Titel, Platten, Zahlen),
  **Alegreya Sans** Medium/Bold (Text) in `assets/fonts/` – zusammen 0,29 MB. Fira Sans bleibt Alternative.
- Abnahme: Du gibst die Stil-Bibel frei. *Stand:* **Freigabe offen** – die Fragen stehen am Ende der Stil-Bibel.

**AP 1.2 – Asset-Werkstatt: gemalte Grafiken erzeugen (M, fortlaufend)**

Die Grafiken entstehen außerhalb des Codes. Claude-Code-Sitzungen haben bisher kein Bildgenerierungs-Werkzeug,
die Bilder kommen deshalb von dir (z. B. Bild-KI wie beim Konzeptbild) oder werden zugekauft (Lizenz für
kommerzielle Mobile-Spiele prüfen) bzw. beauftragt.

Ablauf: das Konzeptbild als Stilreferenz anhängen, in doppelter Zielgröße erzeugen, transparenter Hintergrund
(oder einfarbig zum Freistellen), Upload nach `ungenutzte_assets/ui/`. Die nächste Sitzung stellt frei,
schneidet zu (9-Slice für Panels), optimiert und baut ein.

Gemeinsamer Prompt-Anfang:
*„Game UI asset for a mobile card game, hand-painted stylized fantasy-antique style, weathered light limestone
with fine pores, chipped edges, ivy and dust in the crevices, aged bronze and gold trim with soft specular
highlights, warm light, soft ambient occlusion, rich detail, clean readable silhouette, isolated on transparent
background, no text“* – passend zum Konzeptbild.

*Menü und Oberflächen*

| Asset | Größe (px) | Verwendung | Prompt-Zusatz |
|---|---|---|---|
| Hauptmenü in hoher Auflösung | 3840 × 2140 | Ersatz für das Konzeptbild (2000 × 1116) | dasselbe Bild hochskaliert/neu erzeugt, ohne Text |
| Hauptmenü-Einzelteile | je nach Teil | Platten, Medaillons, Titeltafel, Goldanzeige, Zahnrad einzeln | „same element isolated on transparent background“ |
| Panel (9-Slice) | 768 × 768 | Fenster, Kacheln | „stone tablet frame with bronze corners, recessed darker centre“ |
| Reiter aktiv + inaktiv | 800 × 180 | Basar, Sammlung | „small carved stone tab with bronze trim; active version glowing gold“ |
| Präsentationspodest | 1200 × 900 | Basar-Vorschau | „round marble pedestal with soft spotlight“ |
| Siegesbanner / Niederlage | 1600 × 500 | Match-Ende | „unrolling victory banner, gold embroidery“ (Text per Code) |

*Karten*

| Asset | Größe (px) | Verwendung | Prompt-Zusatz |
|---|---|---|---|
| Kartenrahmen Diener / Zauber / Waffe / Bauwerk | 800 × 1128 | Handkarten | „card frame shaped like a temple gateway arch, name banner, empty art window“ |
| Seltenheits-Siegel | je 160 × 160 | Bronze (gewöhnlich), Silber (selten), Gold (episch), Himmels-Obsidian (legendär) | „archive wax seal in bronze / silver / gold / black obsidian with starlight“ |
| Lorbeerkranz | 900 × 500 | Rahmen legendärer Karten | „golden laurel wreath crowning a card frame“ |
| Werte-Symbole | je 160 × 160 | Ätherkristall (Kosten), gekreuzte Klingen (Angriff), Schild (Leben), Turm (Haltbarkeit) | „gem / crossed swords / round shield / small stone tower icon“ |
| Truppensiegel-Plakette | 600 × 700 | Diener auf dem Feld (oval), je Seltenheit | „oval medallion plaque with bronze rim, empty centre for portrait“ |
| Schlüsselwort-Rahmen | je 700 × 800 | Schildwall (Holz-/Bronzeschilde), Göttliche Gunst (Aurenkreis), Starre (Ketten/Reif), Tarnung (Unterholz-Schatten) | jeweils als Overlay |
| Kleine Marken | je 128 × 128 | Urne (Vermächtnis), Phiole (Gift), Doppelschlag, Plünderung | „small carved icon“ |

*Spielbrett und HUD*

| Asset | Größe (px) | Verwendung | Prompt-Zusatz |
|---|---|---|---|
| Halbe Spielfelder je Epoche | 10 × (3200 × 800) | Sparta, Alexandria, Ägypten, Venedig, Mongolei, Kelten, Renaissance, Frankreich, Wikinger, Japan | „half of a commander's war table, ancient stone and dark polished wood, carved world map, themed for …“ |
| Mittelnaht | 3200 × 120 | Übergang zwischen den Hälften | „bronze divider rail with engraved meander“ |
| Heldenmünze / Gemme | 800 × 800 | Heldenporträt oben/unten | „carved coin / cameo frame, bronze and stone“ |
| Herrschersiegel Vorder- und Rückseite | je 400 × 400 | Heldenfähigkeit (dreht sich nach Benutzung) | „embossed ruler's seal; back side grey stone“ |
| Phalanx-Schild | 300 × 300 | Rüstungsanzeige | „bronze phalanx shield“ |
| Waffenablage | 400 × 300 | Waffe links neben dem Helden | „stone weapon rest with bronze clamps“ |
| Äther-Runen aktiv + leer | je 160 × 160 | Ressourcen 1–10 unten rechts | „glowing ether rune / golden sun amulet“ |
| Chronometer | 700 × 700 | Zug beenden (zwei Zustände) | „bronze chronometer / hourglass mechanism“ |
| Versiegelte Befehle | 300 × 400 | verdeckte KI-Hand | „rolled order scroll with wax seal“ |
| Pergamentrollen-Stapel | 400 × 500 | Deck, Dicke nimmt ab | „stack of parchment scrolls“ |
| Stundenglas | 300 × 400 | Erschöpfung „Zahn der Zeit“ | „ancient hourglass, sand running out“ |
| Chronik-Leiste | 300 × 1600 | Spielverlauf am linken Rand | „vertical parchment strip with bronze holders“ |
| Eck-Dioramen | je 500 × 500 | vier Bildschirmecken | „burning incense burner / rotating astrolabe / crumbling marble column / miniature catapult“ |
| Bronzemünze | 400 × 400 | Münzwurf um den ersten Zug | „ancient bronze coin, two distinct faces“ |
| Wachsrolle | 200 × 260 | Hinterhalte über dem Helden | „sealed wax scroll“ |

- Abnahme: Grafiken liegen vor, passen sichtbar zum Konzeptbild, du hast sie freigegeben.

**AP 1.3 – Hauptmenü aus dem Konzeptbild (M)**

Das textfreie Konzeptbild ist als Grundlage geeignet. Umsetzung:
- [x] **Format:** Das Bild ist 2000 × 1116 (etwa 16:9), die Bühne 2:1. Auf Höhe skalieren und die Seiten
  (je ca. 80 px) mit horizontal gestreckten Randstreifen füllen – die Balken laufen waagerecht, das fällt kaum auf.
  Besser: höhere Auflösung oder Breitbild-Version des Bildes (AP 1.2).
  *Umgesetzt mit `werkzeuge/hauptmenue_bild.py`:* gestreckte Streifen schlierten sichtbar (Efeu, Zahnrad), deshalb
  oben 24 px und unten 8 px Wand abgeschnitten und die Seiten (je 84 px) gespiegelt fortgesetzt; das angeschnittene
  Zahnrad wird durch Drehung um seine Achse nahtlos ergänzt. Für Handys breiter als 2:1 reicht das Bild abgedunkelt
  bis 2,4:1 in die Seitenränder. Ergebnis 2602 × 1084, 0,45 MB.
- [x] **Bedienelemente aus dem Bild lösen:** Platten, Medaillons, Titeltafel, Goldanzeige und Zahnrad-Knauf
  als eigene Ebenen mit Masken entlang der Konturen (oder als gelieferte Einzelteile).
  *Umgesetzt als Ebenen mit `clip-path` über demselben Bild (keine Zusatzdateien), Geometrie im Konzeptbild
  vermessen (`PLATES`, `RAILS` in `hall.js`). Trefferflächen folgen Platte, Kreis und Balken.*
- [x] **Beschriftung per Code** im gemeißelten Stil: Titeltafel „AETERNA“ mit Unterzeile, die vier Platten,
  die vier Balken (Aufgaben, Basar, Sammlung, Kartenpakete), Goldzahl in der Anzeige.
- [x] **Vier Platten belegen:** Schlacht, Kampagne, Kolosseum und eine vierte (Vorschlag: „Partie fortsetzen“,
  wenn eine Partie läuft, sonst „Herausforderung“ – siehe Offene Entscheidungen).
  *Wie vorgeschlagen; „Herausforderung“ ist vorerst ein **Tagesduell**: feste Helden, Decks und Startwert pro
  Kalendertag (`CHP.daily`), die Platte nennt die Paarung des Tages. „Partie fortsetzen“ pulsiert golden.*
- [x] **Drücken:** Platte sinkt 6–8 px in eine dunkle Fuge, Medaillon drückt ein (Skalierung 0,94, Leuchtkranz in
  seiner Farbe), Balken leuchtet kurz auf, Zahnrad-Knauf dreht sich um 60°; dazu Steinklopfen und Vibration.
- [x] **Leben:** Lichtstrahlen von oben rechts (wie im Bild) pulsieren sanft, Funken und Staub schweben,
  der Stern im Schlussstein glüht, Glanzlauf über die Medaillons, Benachrichtigungs-Siegel (Aufgaben, Pakete).
- [x] **Auftritt beim Start:** Platten fahren nacheinander ein, Stern blitzt auf (≤ 700 ms, überspringbar).
  *Gemessen 700 ms; Antippen beendet den Auftritt, ohne einen Knopf auszulösen.*
- [x] **Menüwechsel:** Platte drückt → Lichtblitz aus dem Stern → Zoom in den Ring → neuer Bildschirm (≤ 600 ms).
  *Gemessen 567 ms; zurück ins Menü umgekehrt (Zoom aus dem Ring) in 333 ms. Wechsel zwischen anderen
  Bildschirmen behalten die Steinplatten.*
- Abnahme: Screenshot neben dem Konzeptbild – gleiche Qualität; alle Knöpfe reagieren; du gibst frei.
  *Stand:* Vergleichsbild [`stil/vergleich-hauptmenue.jpg`](stil/vergleich-hauptmenue.jpg); alle acht Knöpfe und
  das Zahnrad per Playwright angetippt (Trefferflächen, Wechsel, Einstellungen). **Deine Freigabe steht aus.**

*Messwerte AP 1.3 (Handyformat, Emulation, `node werkzeuge/sichtpruefung.js`):*

| Messung | normal | CPU 4× gedrosselt |
|---|---|---|
| Berührung → sichtbare Reaktion | 8 ms | 13 ms |
| Menüwechsel: neuer Bildschirm unter dem Blitz / fertig | 396 / 567 ms | 404 / 575 ms |
| Zurück ins Hauptmenü | 333 ms | 376 ms |
| Auftritt beim Start | 700 ms | – |
| Bildzeit im Ruhezustand (95 %) | 16,7 ms, 0 von 181 > 20 ms | 16,7 ms, 1 von 180 > 20 ms |

*Bekannte Grenzen:* Das Bild hat nur 1116 px Höhe und wird auf Tablets mit hoher Pixeldichte hochskaliert;
die ergänzten Ränder sind gespiegelt (an der rechten Kante unter dem Zahnrad sichtbar). Beides löst eine
höher aufgelöste Breitbild-Fassung aus AP 1.2 – dann nur `hauptmenue_bild.py` neu ausführen.

**AP 1.4 – Basar 2.0 (M)**
- [ ] Schaufenster statt Raster: Auswahl links, großes Präsentationspodest rechts mit Licht.
- [ ] Kartenrücken drehen sich in 3D, Skins in der Heldenmünze, Schlachtfelder als Miniatur-Spielfeld.
- [ ] Kaufen inszenieren: Münzen fliegen aus der Goldanzeige, Siegel bricht, Gegenstand leuchtet auf, kräftiger Klang.
- [ ] Panels, Reiter und Wallet aus den gemalten Grafiken; klare Zustände (gesperrt, besitzt, ausgerüstet).

**AP 1.5 – Karten neu gestalten (M)**
- [ ] Gemalte Rahmen in Tempeltor-Form; Werte-Symbole: Kosten oben links im Ätherkristall, Angriff unten links
  mit gekreuzten Klingen, Leben unten rechts im Schild.
- [ ] Seltenheit über Archiv-Siegel (Bronze, Silber, Gold, Himmels-Obsidian); Legendäre mit goldenem Lorbeerkranz.
- [ ] Neue gemalte Kartenrücken; „Goldene Karten“ als Kosmetik mit animiertem Glanz.

**AP 1.6 – Sammlung und Deckbau 2.0 (M)**
- [ ] Kartenbuch mit Umblätter-Animation, Antippen zoomt die Karte heran, Filter als gemalte Steinknöpfe.
- [ ] **Manakurve als dauerhafter Anker:** Balkendiagramm der Kosten immer sichtbar, eingefärbt nach
  Früh- (1–3), Mittel- (4–6) und Spätphase (7+), mit Hinweis bei Schieflage.
- [ ] Karten fliegen beim Hinzufügen ins Deck, der passende Balken wächst sichtbar.

**AP 1.7 – Heldenwahl und Kampagnenkarte (M)**
- [ ] Heldenwahl als Galerie mit großem Porträt, Fähigkeit, Epoche und Lieblingskarten.
- [ ] Kampagne als gemalte Weltkarte mit Stationen von Sparta bis Japan; Belagerungsmissionen markiert.

**AP 1.8 – Spielbrett und HUD neu (L)**
- [ ] **Feldherrentisch** aus antikem Stein und poliertem Holz mit eingeritzter Weltkarte.
- [ ] **Zwei thematische Hälften:** Jeder Held bringt seine Epochen-Spielfeldhälfte mit (unten Spieler, oben
  Gegner), verbunden durch eine Bronze-Mittelnaht. Verhältnis zu den Schlachtfeld-Skins aus dem Basar klären.
- [ ] **Helden** als gemeißelte Münzen/Gemmen oben (KI) und unten (Spieler); **Rüstung** als Phalanx-Schild über
  dem Leben; **Waffe** links neben dem Helden mit Wucht (Angriff) und Schmiedequalität (Haltbarkeit).
- [ ] **Heldenfähigkeit** als geprägtes Herrschersiegel rechts neben dem Porträt: nach Benutzung **dreht es sich um**
  (graue Rückseite) und rastet ein; zu Beginn des nächsten Zuges dreht es sich zurück.
- [ ] **Ressourcen unten rechts** als 1–10 Äther-Runen bzw. Sonnen-Amulette (ersetzt die Mana-Säule links).
- [ ] **Chronik-Leiste am linken Rand:** Pergament-Abschnitte mit allen gespielten Karten, Zaubern und Verlusten.
- [ ] **Deck unten rechts** als Pergamentrollen-Stapel, der sichtbar dünner wird; **KI-Hand** oben als versiegelte Befehle.
- [ ] **Zug beenden** als bronzenes Chronometer bzw. Sanduhr, das beim Tippen umspringt, auf Messing schlägt und gongt.
- [ ] **Vier Eck-Dioramen** je Epoche, antippbar (Räuchergefäß brennt, Astrolabium dreht sich, Säule bröckelt, Katapult schießt).
- [ ] **Hinterhalte** als versiegelte Wachsrollen über dem Helden; **Erschöpfung** als Stundenglas.
- [ ] Höchstens 7 Plätze je Seite, Formationen rücken bei Verlusten sofort mittig zusammen (vorhanden, Animation verbessern).
- Abnahme: Mockup zuerst als Bild freigeben, dann einbauen; alle Touch-Ziele mindestens 48 dp.

### Phase 2 – Technisches Fundament (L)

**AP 2.1 – Native Android-Hülle neu aufsetzen (M)**
- [ ] Gradle-Projekt (Kotlin) mit gleicher Paket-ID, `WebViewAssetLoader` für `https://chroniken.local/`,
  Brücke mit identischer JS-API. Verhalten der alten Hülle lässt sich aus `classes.dex` ablesen.
- [ ] Gleicher Signaturschlüssel, CI baut mit Gradle statt mit `apk_bauen.py`; App-Name, Versionen und
  Dateinamen werden normal gepflegt statt binär gepatcht.
- [ ] Gewinne: echte MIME-Typen (WebP/JPEG), Vollbild mit Display-Aussparung, Bildschirm bleibt an im Match,
  Splash-Screen mit Aeterna-Logo, App-Icon, `VIBRATE` mit Mustern, hohe Bildwiederholrate.
- Abnahme: Update über die Vorversion installierbar, Spielstand bleibt, alle Brückenfunktionen getestet.

**AP 2.2 – Asset-Pipeline (S)**
- [ ] Alle Bilder nach WebP (Qualität ~85), Atlanten in benötigter Größe; Kartenmotive für Daumennagel und Großansicht getrennt.
- [ ] Laden in Stufen: Hauptmenü sofort, Match-Assets im Hintergrund, Ladebalken mit echtem Fortschritt.
- Abnahme: APK < 25 MB, Start bis Menü < 2,5 s auf dem Testhandy.

**AP 2.3 – UI ohne Komplett-Neuaufbau (M)**
- [ ] Bildschirme behalten ihre DOM-Knoten; nur geänderte Teile werden aktualisiert (kleiner eigener Helfer oder
  offline eingebundene Mini-Bibliothek wie Preact + htm, ca. 10 KB).
- [ ] Gemeinsame Bausteine: Steinknopf, Panel, Reiter, Wallet, Modal – je einmal implementiert, mit den gemalten Grafiken.
- Abnahme: Übergänge laufen weich, keine Bild-Neuladungen, Scrollpositionen bleiben.

**AP 2.4 – Match-Renderer entlasten (S)**
- [ ] Frame-Drossel `now-lastFrame>=15` entfernen (Ruckeln auf 90/120 Hz).
- [ ] Canvas-Auflösung an die Pixeldichte koppeln (höchstens 2), Touch-Koordinaten bleiben in Spielfeld-Einheiten.
- [ ] Statische Ebene offscreen zeichnen; Leucht- und Schatteneffekte als vorgerenderte Sprites statt `shadowBlur`.
- [ ] Entwickler-Overlay (FPS, Frame-Zeit) über eine versteckte Einstellung.
- Abnahme: Frame-Zeit auf dem Testhandy mindestens halbiert (vorher/nachher hier eintragen).

**AP 2.5 – Entscheidung Canvas 2D oder WebGL (PixiJS) (S)**
- [ ] Prototyp eines Matches mit 7 Dienern pro Seite, voller Hand, Partikelregen und Verformung (Karte → Siegel) in
  PixiJS (MIT, offline eingebunden); auf dem Gerät gegen den optimierten Canvas messen.
- Empfehlung: Wechsel zu PixiJS, sobald Phase 3 mit Partikeln, Glühen, Rissen und Verformung beginnt – das ist
  in Canvas 2D auf Handys kaum flüssig zu schaffen. Engine bleibt unverändert.

**AP 2.6 – Automatische Sichtprüfung (S)**
- [ ] Playwright-Tests in CI: Klickpfad Menü → Basar → Match → Ergebnis, Screenshots als Artefakt, Vergleich gegen Referenzbilder.
- Abnahme: CI schlägt bei JavaScript-Fehlern oder starken Bildabweichungen fehl.

### Phase 3 – Game Feel im Match (L)

Alle Animationen werden aus den Engine-Ereignissen (`events`) abgeleitet; Regeln ändern sich hier nicht.

**AP 3.1 – Animations-Werkzeugkasten (S)**
- [ ] Tweens mit Easing-Kurven, Zeitleisten, Treffer-Stopp (40–80 ms), Kamerawackeln nach Gewicht, Federn.
- [ ] Geschwindigkeitseinstellung wirkt auf alle Animationen.

**AP 3.2 – Karten in der Hand (S)**
- [ ] Gedrückt halten vergrößert die Karte sofort und hebt sie mit dem Rascheln von schwerem Pergament an.
- [ ] Beim Verschieben weichen benachbarte Karten zur Seite aus; Ziehen neigt die Karte mit Federphysik.
- [ ] Grüne Aura um spielbare Karten; **goldgelbe Aura**, wenn eine Bedingung erfüllt ist (Kombo, Formation, Bündnis).

**AP 3.3 – Ausspielen mit Wucht (S)**
- [ ] Karte hebt sich, schwebt kurz und landet mit dumpfem Schlag – „Wumms eines Feldmarsch-Befehls“.
- [ ] **Verformung:** Das rechteckige Dokument formt sich beim Landen zur ovalen Truppensiegel-Plakette.
- [ ] Aufwirbelnder Kartenstaub und Risse im Steintisch; bei schweren Legendären stärker, mit Kameraruck.

**AP 3.4 – Kartenziehen (S)**
- [ ] Karte verlässt das Deck verdeckt (ausgerüsteter Kartenrücken) und dreht sich in der Luft um.
- [ ] Volle Hand: Karte verbrennt zu Asche; Erschöpfung: Stundenglas entzieht 1, 2, 3 … Leben.

**AP 3.5 – Angriff und Treffer (M)**
- [ ] Grüne Umrandung für Einheiten, die noch angreifen können.
- [ ] Roter, stilisierter **Marschrouten-Pfeil** von der angreifenden Einheit zum Finger; gültige Ziele pulsieren rot,
  sobald die Route darüber liegt.
- [ ] Angreifer zieht sich kurz zurück, prallt auf das Ziel, Treffersound passend zur Einheit
  (Schwerterklirren, Hufgetrappel, Lanzenkrachen); gleichzeitiger Schaden auf beiden Seiten.
- [ ] Getroffene wackeln, Schadenszahlen springen rot auf und verblassen mit Spritzern getrockneter Tinte;
  Lebenspunkte pumpen rot.
- [ ] **Tod:** Die Siegel-Plakette zerbricht in Gesteinssplitter, danach der individuelle Fall- oder Sterbelaut.

**AP 3.6 – Schlüsselwort-Effekte (M)**
- [ ] Schildwall (Holz- und Bronzeschilde), Göttliche Gunst (schimmernder Aurenkreis, zerspringt klirrend),
  Starre (Ketten/Reif), Tarnung (Schatten im Unterholz), Gift (Phiole), Vermächtnis (Urne unter der Plakette).
- [ ] Zauber-Partikel je Element und ein eigener Effekt für jede der 10 Heldenfähigkeiten.

**AP 3.7 – Zugwechsel und Ressourcen (S)**
- [ ] „Dein Zug“-Tafel fällt herunter und rastet ein; Äther-Runen füllen sich nacheinander mit Glanz und Klang.
- [ ] Heldenfähigkeits-Siegel dreht sich nach Benutzung um (siehe AP 1.8).
- [ ] Kein Zugtimer im normalen Spiel; nur Belagerungsmissionen zeigen eine glühende Lunte als Countdown.

**AP 3.8 – Match-Anfang und -Ende (S)**
- [ ] **Feldzug-Initiative:** Eine geworfene Bronzemünze entscheidet, wer beginnt; der Zweite erhält die Karte
  „Gunst der Stunde“ (heute „Initiative“, nur umbenennen und inszenieren).
- [ ] **Vorbereitungsphase:** Startbefehle werden als Schriftrollen ausgelegt, getauschte rollen sichtbar ins Deck zurück.
- [ ] Intro: Helden stehen sich gegenüber, der Chronist kündigt die Schlacht an.
- [ ] **Sieg:** Das gegnerische Herrscher-Relief bricht auseinander, ein Banner „TRIUMPH“ entrollt sich, Kriegshörner;
  danach werden Belohnungen mit Fortschrittsbalken ausgeschüttet.

**AP 3.9 – Lebendige Schlachtfelder und Lesbarkeit (S)**
- [ ] Eck-Dioramen und Deko-Objekte reagieren auf Antippen (siehe AP 1.8).
- [ ] Langer Druck erklärt Schlüsselwörter in Sprechblasen; Angriffsvorschau zeigt den erwarteten Schaden.

### Phase 4 – Klang, Stimmen und Haptik (M)

**AP 4.1 – Drei Klangspuren je Diener**
- [ ] Jede Einheit bekommt **Auftritt** (Spruch oder Fanfare), **Angriffsruf** und **Todeslaut**.
- [ ] Umfang realistisch staffeln: zuerst die 10 Helden und alle Legendären mit eigener Stimme, dann
  Gruppenklänge für die übrigen Einheiten nach Typ (Infanterie, Reiterei, Bogenschützen, Gelehrte, Tiere,
  Belagerung, Schiffe) mit je 2–3 Varianten, später Einzelstimmen.
- [ ] Quelle festlegen: eigene Aufnahmen, Sprecher oder KI-Sprachausgabe mit kommerzieller Lizenz (Sprache: Deutsch).

**AP 4.2 – Der „Chronist der Zeiten“**
- [ ] Neutrale Erzählerstimme: leitet Schlachten ein, kündigt Legendäre („Monumente“) an, zieht am Ende ein
  kurzes historisches Fazit.

**AP 4.3 – Reaktive KI-Dialoge**
- [ ] Die KI kommentiert kritische Züge mit situativen Zeilen ihres Helden (z. B. Leonidas spottet über einen
  schwachen Angriff, Hypatia analysiert einen Fehler); mit Abklingzeit, damit es nie nervt. Kein Spieler-Emote-Spam.

**AP 4.4 – Geräuschkulisse und Musik**
- [ ] Kategorien: Stein-UI, Pergament/Karten, Kampf, Magie, Belohnung; Lautheit angleichen; Quellen in den Credits.
- [ ] Musik je Epoche (Instrumente wie Aulos, Ney, Shamisen, Bodhrán) für Menü, Kampf, Spannung, Sieg, Niederlage.

**AP 4.5 – Haptik-Sprache** (benötigt AP 2.1)
- [ ] Leicht (Antippen), mittel (Ausspielen, Einrasten), schwer (Treffer, Tod, Legendäre); abschaltbar.

### Phase 5 – Regeln, Karten und Balance (L)

Hier ändern sich `data.js` und `engine.js`. Jede Änderung braucht Tests, einen Simulationslauf und eine
KI, die die neue Mechanik versteht.

**AP 5.1 – Balance-Werkzeug (S)**
- [ ] Skript `werkzeuge/balance.js`: KI gegen KI für alle 10 × 10 Heldenpaarungen (Startdecks und Zufallsdecks),
  je Paarung mindestens 200 Partien; Ausgabe: Siegquoten-Matrix, Vorteil des ersten Spielers, Partielänge,
  Spiel- und Siegquote je Karte („gewinnt, wenn gezogen“).
- [ ] Ergebnisse als Tabelle in `balance/BERICHT.md`; Lauf auch in CI (verkürzt).
- Abnahme: reproduzierbare Zahlen mit festem Startwert.

**AP 5.2 – Heldenbalance (S)**
- [ ] Ausreißer anhand von AP 5.1 bestimmen; Stellschrauben: Wert und Kosten der Heldenfähigkeit, Startdeck,
  Heldenkarten. Lieber Schwache stärken als Starke schwächen.
- [ ] Ziel: jeder Held 47–53 % gegen das Feld, keine Paarung schlechter als 40/60, Erster-Spieler-Vorteil ≤ 55 %.

**AP 5.3 – Legendäre neu denken (M)**

Grundsätze: Jede Legendäre ist eine **historische Persönlichkeit mit einer einzigartigen Regel**, um die man ein Deck
bauen kann; mächtig, aber mit Antwort; nie nur „großer Körper plus Bonus“. Werte nach dem Simulationslauf feinjustieren.

| Held | Heute | Vorschlag (Richtung, Werte vorläufig) | Benötigt |
|---|---|---|---|
| Leonidas | Gorgo, 7: 6/7, andere Diener +2/+2 | **Gorgo, Stimme Spartas** 6: 4/6, Schildwall. Einmarsch: Ruft für jeden feindlichen Diener einen Hopliten (2/3, Schildwall). Eure Schildwall-Diener haben +1 Angriff. | Zählen feindlicher Diener, Aura |
| Hypatia | Theon, 7: 5/7, zieht 2, 3 Rüstung | **Theon von Alexandria** 5: 3/5, Arkaner Fokus +1. Am Ende Eures Zuges: Wirkt Euren zuletzt gewirkten Zauber erneut (zufällige Ziele). | Zauberschaden, Zauber-Verlauf |
| Imhotep | Djoser, 8: 6/8, zwei Pyramidenwächter | **Djoser, der Erbauer** 7: 5/7. Einmarsch: Errichtet die Stufenpyramide (Bauwerk, Haltbarkeit 8): Zu Beginn Eures Zuges erhält Euer schwächster Diener +2/+2. | Bauwerke (AP 5.5) |
| Dandolo | Marco, 7: 6/6, zieht 3 | **Marco Polo, der Weltenfahrer** 6: 5/5. Einmarsch: Ergründet zweimal eine Karte eines anderen Helden („Seidenstraße“); sie kosten 1 weniger. | Ergründen, heldenfremde Karten |
| Khan | Subutai, 8: 7/7, andere +2 Angriff | **Subutai, der Stratege** 7: 6/6, Vorstoß. Wann immer ein anderer eigener Diener angreift, greift ein zufälliger weiterer eigener Diener dasselbe Ziel an (Zangenangriff). | Vorstoß, Angriffs-Auslöser |
| Boudicca | Andraste, 8: 7/8 Spott, Todesröcheln zwei 2/2 | **Andraste, Göttin des Sieges** 8: 7/7. Kostet 1 weniger für jeden eigenen Diener, der in dieser Partie gestorben ist. Einmarsch: Holt die zwei zuletzt gestorbenen eigenen Diener zurück. | Todes-Verlauf, Kostensenkung |
| Nostradamus | Caterina, 8: 7/7, 5 Schaden + 5 Heilung | **Caterina de’ Medici, die Regentin** 6: 5/5. Am Ende Eures Zuges: Zieht eine Karte, sie kostet 2 weniger; Euer Held erleidet 2 Schaden. | Kosten ändern |
| Jeanne | La Hire, 8: 6/8 Gottesschild, zwei Rekruten | **La Hire, der Unbeugsame** 6: 4/6, Göttliche Gunst. Eure Rekruten haben +1/+1 und Göttliche Gunst; Eure Heldenfähigkeit ruft zwei Rekruten. | Aura für Spielsteine, Heldenfähigkeit ändern |
| Ragnar | Lagertha, 8: 7/8 Spott, zwei Krieger | **Lagertha, Schildmaid** 7: 6/7, Schildwall. Einmarsch: Ruft eines von jedem Totem. Eure Totems haben Schildwall und +2 Leben. | Aura für Totems |
| Musashi | Kojirō, 8: 7/6 Ansturm, Gottesschild | **Sasaki Kojirō, der Rivale** 6: 5/5, Doppelschlag. Einmarsch: Duell – Kojirō und ein feindlicher Diener Eurer Wahl kämpfen, bis einer stirbt. | Doppelschlag, Duell-Effekt |
| Neutral | Herodot, 8: 6/8, zieht 3, heilt 4 | **Herodot, Vater der Geschichtsschreibung** 5: 4/5. Einmarsch: Ergründet eine Karte, die in dieser Partie bereits gespielt wurde (von beiden Seiten). | Ergründen, Spielverlauf |
| Neutral | Zenobia, 9: 8/8 Ansturm, 5 Rüstung | **Zenobia, Rebellin von Palmyra** 8: 6/6. Einmarsch: Übernehmt die Kontrolle über einen feindlichen Diener mit höchstens 4 Angriff. | Kontrolle übernehmen |

- [ ] Vorschläge mit dir abstimmen, umsetzen, KI-Bewertung ergänzen, Simulationslauf; Legendäre als Gruppe
  nicht stärker als 55 % „gewinnt, wenn gezogen“.

**AP 5.4 – Historische Schlüsselwörter (M)**

*Umbenennen (Engine bleibt, nur Texte, Symbole und Hilfe):*

| Heute | Neu | Darstellung |
|---|---|---|
| Spott | **Schildwall** | Holz- und Bronzeschilde um die Einheit; Gegner müssen zuerst sie angreifen |
| Gottesschild | **Göttliche Gunst** | schimmernder Aurenkreis, fängt den ersten Schaden ab |
| Kampfschrei | **Einmarsch** | Effekt beim Ausspielen aus der Hand |
| Todesröcheln | **Vermächtnis** | kleine Urne unter der Plakette |
| Ansturm | **Sturmangriff** | darf sofort jedes Ziel angreifen |
| Initiative (Münze) | **Gunst der Stunde** | Schriftrolle, 0 Mana, +1 Mana in diesem Zug |

*Neu einführen (Engine-Erweiterung, je mit Tests und KI-Bewertung):*

| Schlüsselwort | Regel | Darstellung |
|---|---|---|
| **Vorstoß** | sofort angreifen, aber keine Helden | Pfeilspitze |
| **Starre** | Ziel verpasst seinen nächsten Angriff | Ketten oder Reif |
| **Doppelschlag** | zwei Angriffe pro Zug | zwei gekreuzte Klingen |
| **Tödliches Gift** | jeder Schaden an Dienern vernichtet sie | Phiole |
| **Tarnung** | weder angreifbar noch anvisierbar, bis die Einheit selbst angreift | Schatten im Unterholz |
| **Plünderung** | ausgeteilter Schaden heilt den eigenen Helden | Beutel |
| **Arkaner Fokus +X** | Offensivzauber verursachen X mehr Schaden | leuchtende Rune |
| **Ergründen** | der Chronist breitet 3 versiegelte Schriftrollen aus, eine wird gewählt | drei Rollen |
| **Belastung X** | nächster Zug hat X Ressourcen weniger | rissige Rune |
| **Bannung** | entfernt alle Effekte, Segnungen und Auren einer Einheit | durchgestrichenes Siegel |

- [ ] Reihenfolge nach Spielspaß und Aufwand: Vorstoß, Starre, Ergründen, Plünderung, Tarnung, Bannung, Gift,
  Doppelschlag, Arkaner Fokus, Belastung.

**AP 5.5 – Bauwerke und Denkmäler (M)**

Neuer Kartentyp ohne Angriff mit dauerhaftem Effekt, ähnlich Schauplätzen in Runeterra oder Planeswalkern in Magic.

- [ ] Regelvorschlag: Ein Bauwerk belegt einen der 7 Plätze, greift nie an, hat **Haltbarkeit** statt Leben, kann von
  Dienern, Helden und gezielten Zaubern angegriffen (belagert) werden; Flächenschaden trifft es nicht; Heilung wirkt
  nicht, nur eigene Reparatur-Effekte. Beim Einsturz bricht die Plakette zusammen.
- [ ] Beispiele: **Bibliothek von Alexandria** (zu Beginn Eures Zuges: Ergründet einen Zauber), **Aquädukt** (am Ende
  Eures Zuges: 2 Heilung für alle eigenen Charaktere), **Große Mauer** (Schildwall; feindliche Diener mit Sturmangriff
  können Euren Helden nicht angreifen), **Leuchtturm von Pharos** (Eure Zauber kosten 1 weniger), **Kolosseum**
  (wann immer ein Diener stirbt: +1 Rüstung), **Hängende Gärten** (Heilung auf eigene Diener verdoppelt),
  **Akropolis** (eigene Diener +1 Leben), **Pyramiden von Gizeh** (Vermächtnis löst zweimal aus).
- [ ] Engine: neuer Typ `building`, Zielwahl und KI-Bewertung („belagern oder ignorieren?“), Darstellung mit Turm-Symbol.

**AP 5.6 – Taktische Hinterhalte (M)**
- [ ] Verdeckte Karten als versiegelte Wachsrollen über dem Helden, lösen bei gegnerischen Aktionen automatisch aus
  (z. B. „Wenn ein feindlicher Diener angreift …“, „Wenn der Gegner einen Zauber wirkt …“). Keine Echtzeit-Reaktionen nötig.

**AP 5.7 – Erweiterung „Wunder der Welt“ (L)**
- [ ] Rund 90 neue Karten: je Held 6 (davon 1 Legendäre), 20 neutrale, 10 Bauwerke, dazu Hinterhalte; nutzt die neuen
  Schlüsselwörter. Kostenkurve und Werte-Budget nach einer festen Formel (z. B. Grundwerte = 2 × Kosten + 1,
  Schlüsselwörter kosten Werte), Feinschliff per Simulation.
- [ ] Ideen für neue Legendäre: Kleopatra (verführt feindliche Diener), Hannibal (Elefanten ignorieren einmal
  Schildwall), Alexander der Große (wächst mit jedem eroberten Diener), Archimedes (Erfindungen, stärkt Bauwerke),
  Qin Shi Huang (Terrakotta-Armee kehrt zurück), Mansa Musa (Reichtum: Karten kosten weniger), Sun Tzu
  (Hinterhalte kosten 0), Hammurabi (Gesetz: alle Karten kosten 3), Leonardo da Vinci (verwandelt Zauber in
  Erfindungen), Hatschepsut, Saladin, Wu Zetian, Spartacus (Aufstand: Angriff und Leben aller Diener tauschen).
- [ ] Jede neue Karte mit Motiv aus dem Bild-Atlas (Grafiken über AP 1.2).

**AP 5.8 – KI erweitern (M)**
- [ ] KI versteht alle neuen Mechaniken; Schwierigkeitsgrade Lehrling, Feldherr, Legende; Vorausschau 1–2 Züge;
  Persönlichkeit je Held (aggressiv, defensiv, kombinierend).

### Phase 6 – Spielmodi und Motivation (fortlaufend)

- [ ] **AP 6.1 Kolosseum als echter Draft:** Held aus 3, dann 30-mal 1 aus 3 Karten; Lauf endet bei 3 Niederlagen
  oder 12 Siegen; Belohnung nach Siegen. Nur App-Ebene.
- [ ] **AP 6.2 Schlacht mit Offline-Rangliste:** Ränge aus Stein, Bronze, Silber, Gold und Lapis mit Sternen; Saisonbelohnungen.
- [ ] **AP 6.3 Aufgaben:** tägliche Aufgaben mit Rotation und einmal Neuwürfeln pro Tag, Login-Bonus, Heldenstufen
  mit Belohnungen (Gold, Skins, goldene Karten).
- [ ] **AP 6.4 Kampagne 2.0:** Kapitel mit kurzen Story-Szenen und Sprechblasen, Bosse mit eigenen Fähigkeiten,
  **Belagerungsmissionen mit Lunten-Countdown**, gelegentliche Kartenrätsel.
- [ ] **AP 6.5 Tutorial:** die ersten drei Partien geführt.
- [ ] **AP 6.6 Eigenständige Mechaniken:** Epochen-Synergien (Bonus bei drei Karten derselben Ära), Relikte als
  Kartentyp (Atlasfelder für Spartanerschild und Astrolabium sind schon gemalt), Chronik-Ereignisse für beide Spieler.

### Phase 7 – Release-Qualität (M)

- [ ] Geräte-Testmatrix: schwach/mittel/stark, 60/90/120 Hz, Seitenverhältnisse 16:9 bis 21:9.
- [ ] Einstellungen: Grafikqualität (Partikel, Auflösung), Textgröße, Farbsehschwäche-Modus, reduzierte Bewegung.
- [ ] Lokales Fehlerprotokoll und automatische Spielstand-Sicherungen.
- [ ] Optional Play-Store: eigener Upload-Schlüssel, Datenschutzerklärung, Store-Grafiken, Name „Aeterna“ auf Markenkonflikte prüfen.

---

## Weitere Ideen

Zusätzliche Vorschläge, die zu Aeterna passen und Spaß machen – zum Einsortieren, wenn die Phasen oben stehen:

1. **Archiv der Zeiten (Lexikon):** Jede gesammelte Karte schaltet einen kurzen, echten Geschichtsfakt frei
   („Wusstest du …?“). Die Sammlung wird zum Nachschlagewerk; Sammel-Meilensteine belohnen mit Kartenrücken.
2. **Historische Schlachten als Rätsel:** Thermopylen 480 v. Chr., Hastings 1066, Orléans 1429 – feste Aufstellung,
   „Gewinne in diesem Zug“. Kurz, knifflig, lehrreich.
3. **Zwei Spieler an einem Gerät:** Hotseat-Modus mit verdeckter Hand beim Weitergeben – Mehrspieler ganz ohne Internet.
4. **Zeitanomalie der Woche:** Jede Kalenderwoche eine Sonderregel offline (z. B. „Alle Diener kosten 1 weniger“,
   „Nur Bauwerke und Zauber“, „Zufällige Helden“) mit eigener Belohnung.
5. **Heldenmeisterschaft:** Stufen je Held schalten Porträtrahmen, zusätzliche Stimmzeilen und Spielfeldhälften frei.
6. **Deck-Codes:** Decks als kurzen Text teilen und importieren.
7. **Chronik-Moment:** Nach besonderen Zügen (z. B. 10+ Schaden in einem Zug) bietet das Spiel ein Bild des Moments zum Teilen an.
8. **Komfort:** Hinweis beim Zug beenden, wenn noch Mana oder Angriffe übrig sind (abschaltbar); Rückgängig beim Sortieren der Hand.
9. **Tagesduell mit festem Startwert:** Jeden Tag dieselbe Ausgangslage, Bestwert lokal speichern.
10. **Handwerk inszenieren:** Herstellen und Entzaubern als Schmiede-Animation mit Funken statt Text-Bestätigung.

---

## Deine Ideensammlung – wo sie im Plan steht

| Bereich aus deiner Liste | Arbeitspakete |
|---|---|
| Name „Aeterna“ | AP 0.3 |
| Textfreies Hauptmenü-Bild mit interaktiven Knöpfen und Animationen | AP 1.3 (Bild liegt in `ungenutzte_assets/ui/`) |
| Mehr Karten | AP 5.7 |
| Legendäre aufwerten | AP 5.3 |
| Heldenbalance | AP 5.1, AP 5.2 |
| Heldenfähigkeit dreht sich nach Benutzung um | AP 1.8, AP 3.7 |
| Zwei thematische Spielfeldhälften je Epoche | AP 1.2, AP 1.8 |
| Gewicht und Wucht beim Ausspielen, Staub und Risse | AP 3.3 |
| Drei Klangspuren je Diener | AP 4.1 |
| Status-Leuchten (grün, gelb, roter Zielpfeil, pumpende Lebenspunkte) | AP 3.2, AP 3.5 |
| Manakurve im Deckbau | AP 1.6 |
| Halten zum Vergrößern mit Pergament-Rascheln, ausweichende Nachbarkarten | AP 3.2 |
| Karte wird auf dem Feld zur ovalen Truppensiegel-Plakette | AP 1.2, AP 3.3 |
| Angriffe mit Rückzug, Aufprall und Einheiten-Treffersounds | AP 3.5, AP 4.1 |
| Schadenszahlen mit Tintenspritzern, Tod als Gesteinssplitter | AP 3.5 |
| Chronometer bzw. Sanduhr als „Zug beenden“ mit Gong | AP 1.8 |
| Kein Timer, Lunte nur in Belagerungsmissionen | AP 3.7, AP 6.4 |
| Eck-Dioramen | AP 1.2, AP 1.8, AP 3.9 |
| Reaktive KI-Dialoge | AP 4.3 |
| Chronist der Zeiten (Erzähler) | AP 4.2 |
| Sieg mit zerbrechendem Relief, Banner „TRIUMPH“, Kriegshörnern | AP 3.8 |
| Feldherrentisch, Heldenmünzen, Phalanx-Schild, Herrschersiegel, Waffenablage | AP 1.8 |
| Äther-Runen unten rechts, versiegelte KI-Befehle, Chronik-Leiste, Pergament-Deck, Stundenglas | AP 1.8, AP 3.4 |
| Münzwurf, Startkarten-Tausch, „Gunst der Stunde“, Mana bis 10, Handlimit, gleichzeitiger Schaden, Aufmarsch-Verzögerung, freie Zielwahl, KI-Zug ohne Unterbrechung | vorhanden; Inszenierung in AP 3.4, AP 3.8; Umbenennung in AP 5.4 |
| Taktische Hinterhalte | AP 5.6, AP 1.8 |
| Kartenwerte-Symbole, Lorbeerkranz, Archiv-Siegel der Seltenheit | AP 1.5 |
| Historische Schlüsselwörter (Schildwall bis Bannung) | AP 5.4, AP 3.6 |
| Bauwerke und Denkmäler mit Haltbarkeit | AP 5.5 |

---

## Offene Entscheidungen

Diese Punkte solltest du vor dem jeweiligen Arbeitspaket entscheiden:

1. **Vierte Menüplatte** (AP 1.3): *vorläufig wie vorgeschlagen umgesetzt* – „Partie fortsetzen“ bei laufender
   Partie, sonst „Herausforderung“ als Tagesduell (Idee 9). Rätsel und Zeitanomalie können sie später erweitern.
   Passt das, oder soll dort etwas anderes stehen?
2. **Heldenfähigkeit „umdrehen“** (AP 1.8): Ich habe es so verstanden, dass sich das Fähigkeits-Siegel wie in
   Hearthstone umdreht. Falls du meinst, dass sich das ganze Spielfeld dreht, bitte korrigieren.
3. **Spielfeldhälften vs. Schlachtfeld-Skins** (AP 1.8): Ersetzt ein gekaufter Skin die eigene Epochenhälfte, oder
   werden die Skins zu Mittelnähten/Rahmen?
4. **Schlüsselwörter umbenennen** (AP 5.4): alle sechs auf einmal oder schrittweise?
5. **Ressourcen** (AP 1.8): Äther-Runen oder Sonnen-Amulette?
6. **Bauwerke** (AP 5.5): Belegen sie einen der 7 Plätze (Vorschlag) oder bekommen sie eine eigene Reihe?
7. **Stimmen** (AP 4.1): Quelle und Budget (eigene Aufnahmen, Sprecher, KI-Sprachausgabe)?
8. **Legendäre** (AP 5.3): Vorschläge so umsetzen, anpassen oder durch eigene Ideen ersetzen?
9. **Stil-Bibel und Hauptmenü** (AP 1.1, AP 1.3): Freigabe – siehe Abschnitt 10 der Stil-Bibel
   (Palette, Schriften, Logo-Unterzeile „Das historische Kartenduell“, Bewegungssprache).

---

## Empfohlene Reihenfolge der Sitzungen

| Sitzung | Arbeitspakete | Warum jetzt |
|---|---|---|
| 1 ✓ | AP 0.3, AP 1.1, AP 1.3 | erledigt in 1.4.0 – Name Aeterna, Stil-Bibel, gemaltes Hauptmenü (Freigaben offen) |
| 2 | AP 2.3, AP 0.1, AP 2.6, Feinschliff AP 1.3 | solide UI-Basis, Basar ohne Sprünge, Sichtprüfung in der CI (siehe unten) |
| 3 | AP 5.1, AP 5.2 | Erst messen, dann balancieren – Grundlage für alle Kartenarbeiten |
| 4–5 | AP 5.4 (Umbenennung + erste neue Schlüsselwörter), AP 5.3, AP 5.8 (Teil) | Legendäre mit echter Wirkung, KI zieht mit |
| zwischendurch | AP 1.2 (du) | Grafiken für Karten, Spielbrett und HUD erzeugen |
| 6–7 | AP 2.1, AP 2.2, AP 0.2 | Native Hülle, WebP, schneller Start, Haptik-Grundlage |
| 8 | AP 2.4, AP 2.5, AP 2.6 | Flüssiges Match, Renderer-Entscheidung, Sicherheitsnetz |
| 9–11 | AP 1.8, AP 1.5, AP 3.1–3.5 | Neues Spielbrett, neue Karten, Gewicht und Wucht |
| 12 | AP 1.4, AP 1.6, AP 1.7 | Basar, Sammlung, Heldenwahl im neuen Stil |
| 13–14 | AP 3.6–3.9, Phase 4 | Effekte, Stimmen, Chronist, Klang, Haptik aus einem Guss |
| 15+ | AP 5.5–5.7, Phase 6 | Bauwerke, Hinterhalte, Erweiterung „Wunder der Welt“, Modi |

Tipp: Eine Sitzung sollte mit einer grünen CI und einer installierbaren APK enden, auch wenn ein Paket noch nicht ganz fertig ist.

---

## Vorschlag für die nächste Sitzung

**Erledigt in Sitzung 1 (Version 1.4.0):** AP 0.3 (Aeterna), AP 1.1 (Stil-Bibel, Schriften), AP 1.3 (Hauptmenü
aus dem Konzeptbild mit Tagesduell), dazu `werkzeuge/sichtpruefung.js` für Screenshots und Messwerte.

**Vorher bitte von dir (5 Minuten):**
1. Test-APK `Aeterna-1.4.0-Test-APK` aus Actions über 1.3.0 installieren: Heißt die App „Aeterna“? Ist der
   Spielstand noch da? Fühlen sich Drücken, Auftritt und Menüwechsel gut an? Klingen die Steingeräusche passend (AP 0.2)?
2. Stil-Bibel und Hauptmenü freigeben oder Änderungen nennen (Offene Entscheidungen 1 und 9).

**Sitzung 2 – AP 2.3, AP 0.1, AP 2.6 und Feinschliff AP 1.3**

| Paket | Inhalt | Warum jetzt |
|---|---|---|
| Feinschliff AP 1.3 | dein Feedback vom Gerät und zur Stil-Bibel einarbeiten | Freigabe abschließen, solange alles frisch ist |
| AP 2.3 | kleiner Render-Helfer statt `innerHTML`-Neuaufbau; zuerst Basar und Sammlung; gemeinsame Bausteine (Steinknopf, Reiter, Wallet, Modal) mit den Stil-Bibel-Farben und -Schriften | Grundlage für AP 1.4–1.7; Bilder flackern nicht mehr, Übergänge werden möglich |
| AP 0.1 | Scrollposition und Reiter im Basar nach Kauf/Ausrüsten erhalten | fällt mit AP 2.3 fast von selbst ab |
| AP 2.6 | `werkzeuge/sichtpruefung.js` als CI-Schritt (Screenshots als Artefakt, Abbruch bei JavaScript-Fehlern) | schützt das neue Hauptmenü bei jedem Push |

Danach weiter mit Sitzung 3 (AP 5.1, AP 5.2 – erst messen, dann balancieren). Grafiken für Basar, Karten und
Spielbrett (AP 1.2) kannst du parallel nach der Stil-Bibel erzeugen.

**Text zum Kopieren für den Start:**

> Lies die `README.md` im Repo `thepytales/Chronicle_of_Heroes`. Arbeite **AP 2.3, AP 0.1 und AP 2.6** ab und
> übernimm mein Feedback zu AP 1.1/AP 1.3: *(hier Feedback einfügen)*. Halte dich an die „Regeln für jede
> Sitzung“, prüfe optische Änderungen mit Screenshots im Handyformat, lass die Tests laufen und sorge für eine
> grüne CI. Hake erledigte Punkte in der README ab und trage Messwerte ein. Öffne am Ende einen Pull Request
> nach `main` und schreibe unten in die README wieder einen Vorschlag für die nächste Sitzung.
