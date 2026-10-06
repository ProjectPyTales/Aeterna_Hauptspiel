# Aeterna 1.4.0 – Bauen & Prüfen

*Vormals „Chroniken der Helden“.* `quellcode/` enthält den vollständigen Inhalt der APK (Manifest,
`classes.dex`, `resources.arsc`, Web-Spiel unter `assets/game/`). Die Signatur wird beim Bauen erzeugt.

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

Unverändert: `data.js`, `engine.js`, `motion.js`, `layout.js`, `chronicle.js`, `classes.dex`.

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

| Datei | Zweck |
|---|---|
| `assets/game/cosmetics.js` | Katalog, Kaufen/Ausrüsten, Bereinigung gespeicherter Kosmetik |
| `assets/game/hall.js` | Hauptmenü: Geometrie aus dem Konzeptbild, ausgeschnittene Ebenen, Auftritt, Ring-Übergang (`CHH`) |
| `assets/game/hall.css` | Schriften, Farbvariablen (`--ae-…`), Ladebildschirm, Hauptmenü |
| `assets/game/stone.js` | Steinplatten-Übergang (SVG), Kartenrücken (Canvas), Deckstapel-Glanz |
| `assets/game/stone.css` | Steinplatten-Übergang, Basar |
| `assets/game/assets/fonts/*` | Cinzel, Cinzel Decorative, Alegreya Sans mit Lizenztexten (OFL) |
| `assets/game/assets/art/*` | Neue Bilder (JPEG-Daten mit `.png`-Endung, da die App nur `.png` als Bild ausliefert) |
| `assets/game/assets/audio/stone-*, scrape-*, grind-*, slam-*` | Steingeräusche (`werkzeuge/stein_sounds.py`) |

## Test-APK herunterladen (GitHub Actions)

Bei jedem Push baut der Workflow `.github/workflows/apk.yml` die APK: Tests laufen, die APK
wird gebaut, signiert und die Signatur geprüft.

1. Im Repo auf **Actions** gehen und den obersten grünen Lauf „Test-APK bauen“ öffnen.
2. Unten unter **Artifacts** auf `Aeterna-<Version>-Test-APK` tippen.
3. Die heruntergeladene ZIP-Datei entpacken – darin liegt die APK.

Artefakte bleiben 30 Tage erhalten. Über „Run workflow“ lässt sich jederzeit ein neuer Build starten.

## Lokal bauen

```sh
pip install cryptography
python3 werkzeuge/apk_bauen.py quellcode Aeterna-1.4.0-Test.apk \
    werkzeuge/signatur/chroniken-test.p12 chroniken-test
```

- Version und App-Name setzen (beliebige Länge, der String-Pool wird neu aufgebaut):
  `python3 werkzeuge/manifest_version.py quellcode/AndroidManifest.xml 8 1.5.0 --label Aeterna`
- Version anzeigen: `python3 werkzeuge/manifest_version.py quellcode/AndroidManifest.xml` (mit `--info` auch den App-Namen)
- Hauptmenü-Hintergrund neu erzeugen (z. B. nach einem höher aufgelösten Konzeptbild):
  `python3 werkzeuge/hauptmenue_bild.py` (Pillow, NumPy)

## Tests

```sh
node --test werkzeuge/tests/*.test.js
```

Kosmetik-Käufe (Gold wird genau einmal abgezogen), Ausrüsten nur nach Freischaltung,
Speichern/Laden, alte 1.2.2-Spielstände, manipulierte Spielstände, 100 simulierte Partien,
Manifest (App-Name, Version, Neuaufbau des String-Pools), unveränderte Speicher-Schlüssel,
umbenannte Texte und das Tagesduell.

## Signatur

Der private Schlüssel der Version 1.2.2 lag nicht im Repository. 1.3.0 ist deshalb mit dem
neuen Testschlüssel `werkzeuge/signatur/chroniken-test.p12` (Passwort `chroniken-test`)
signiert. Künftige Versionen mit diesem Schlüssel lassen sich direkt als Update installieren.

Umstieg von 1.2.2: In der alten App *Einstellungen → Spielstand exportieren*, alte App
deinstallieren, die neue Version installieren, *Einstellungen → Spielstand importieren*.
Ab 1.3.0 (auch 1.3.0 → 1.4.0) genügt es, die neue APK über die alte zu installieren.
