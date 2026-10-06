# Aeterna 1.8.0 – Bauen & Prüfen

*Vormals „Chroniken der Helden“.* `quellcode/` enthält den vollständigen Inhalt der APK (Manifest,
`classes.dex`, `resources.arsc`, Web-Spiel unter `assets/game/`). Die Signatur wird beim Bauen erzeugt.

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
| `assets/game/assets/fonts/*` | Cinzel, Cinzel Decorative, Alegreya Sans mit Lizenztexten (OFL) |
| `assets/game/assets/art/*` | Neue Bilder (JPEG-Daten mit `.png`-Endung, da die App nur `.png` als Bild ausliefert) |
| `assets/game/assets/audio/stone-*, scrape-*, grind-*, slam-*` | Steingeräusche (`werkzeuge/stein_sounds.py`) |

## Test-APK herunterladen (GitHub Actions)

Bei jedem Push baut der Workflow `.github/workflows/apk.yml` die APK: Tests laufen, die APK
wird gebaut, signiert und die Signatur geprüft. Parallel spielt der Job „sichtpruefung“ den Klickpfad im
Handyformat und vergleicht ihn mit den Referenzbildern (Artefakt „Sichtpruefung“).

1. Im Repo auf **Actions** gehen und den obersten grünen Lauf „Test-APK bauen“ öffnen.
2. Unten unter **Artifacts** auf `Aeterna-<Version>-Test-APK` tippen.
3. Die heruntergeladene ZIP-Datei entpacken – darin liegt die APK.

Artefakte bleiben 30 Tage erhalten. Über „Run workflow“ lässt sich jederzeit ein neuer Build starten.

## Lokal bauen

```sh
pip install cryptography
python3 werkzeuge/apk_bauen.py quellcode Aeterna-1.7.0-Test.apk \
    werkzeuge/signatur/chroniken-test.p12 chroniken-test
```

- Version und App-Name setzen (beliebige Länge, der String-Pool wird neu aufgebaut):
  `python3 werkzeuge/manifest_version.py quellcode/AndroidManifest.xml 10 1.7.0 --label Aeterna`
  (dazu `VERSION` in `assets/game/app.js` anpassen – ein Test prüft, dass beide übereinstimmen)
- Version anzeigen: `python3 werkzeuge/manifest_version.py quellcode/AndroidManifest.xml` (mit `--info` auch den App-Namen)
- Hauptmenü-Hintergrund neu erzeugen (z. B. nach einem höher aufgelösten Konzeptbild):
  `python3 werkzeuge/hauptmenue_bild.py` (Pillow, NumPy). Die Fugen (`JOINTS`), Sperrflächen (`KEEP_OUT`) und die
  Zahnrad-Winkel stehen oben im Skript und gelten für das jetzige Konzeptbild; bei einem neuen Bild prüfen.

## Tests

```sh
node --test werkzeuge/tests/*.test.js
```

Kosmetik-Käufe (Gold wird genau einmal abgezogen), Ausrüsten nur nach Freischaltung,
Speichern/Laden, alte 1.2.2-Spielstände, manipulierte Spielstände, 100 simulierte Partien,
Manifest (App-Name, Version, Neuaufbau des String-Pools), unveränderte Speicher-Schlüssel,
umbenannte Texte, das Tagesduell und die ViewModels (MVVM-Kern, Store mit Sicherung, Basar mit Kauf über
Rückfrage, Pack öffnen, Sammlung und Deckbau, Hauptmenü, Match mit KI-Takt), die geänderten Heldenfähigkeiten und
die Gunst der Stunde, die schnelle Zustandskopie der KI und das Balance-Werkzeug (gleiche Zahlen unabhängig von der Zahl der
Threads), seit 1.7.0 die umbenannten und neuen Schlüsselwörter, alle zwölf Legendären und die Ergründen-Wahl im
Match-ViewModel – ohne Browser.

## Balance-Lauf

```sh
node werkzeuge/balance.js                         # 200 Partien je Paarung, ≈ 6 min auf 4 Kernen → balance/BERICHT.md
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
node werkzeuge/motive.js              # Liste der fehlenden Motive (ungenutzte_assets/MOTIVE.md) neu schreiben
```

Der Klickpfad läuft mit reduzierter Bewegung, fester Uhrzeit und festem Spielstand, damit die Bilder stabil sind.
Er bricht ab bei JavaScript-Fehlern, fehlgeschlagenen Prüfungen oder starken Bildabweichungen (mehr als 3 % stark
abweichende Pixel oder mittlere Abweichung über 6 bei 458 × 206); Abweichungsbilder landen neben den Screenshots.
Mit `--nur-basar --spiel <ordner>` misst er nur den Basar, auch für ältere Versionen (Vergleich 1.4.0 ↔ 1.5.0).
Lokal: Playwright 1.56.1 (`npm install --no-save playwright@1.56.1`), in den Claude-Code-Sitzungen vorinstalliert.

## Signatur

Der private Schlüssel der Version 1.2.2 lag nicht im Repository. 1.3.0 ist deshalb mit dem
neuen Testschlüssel `werkzeuge/signatur/chroniken-test.p12` (Passwort `chroniken-test`)
signiert. Künftige Versionen mit diesem Schlüssel lassen sich direkt als Update installieren.

Umstieg von 1.2.2: In der alten App *Einstellungen → Spielstand exportieren*, alte App
deinstallieren, die neue Version installieren, *Einstellungen → Spielstand importieren*.
Ab 1.3.0 (auch 1.5.0 → 1.6.0) genügt es, die neue APK über die alte zu installieren.
