# Chroniken der Helden 1.3.0 – Bauen & Prüfen

`quellcode/` enthält den vollständigen Inhalt der APK (Manifest, `classes.dex`,
`resources.arsc`, Web-Spiel unter `assets/game/`). Die Signatur wird beim Bauen erzeugt.

## Neu in 1.3.0 (nur Menü, Shop, Audio, Assets)

- **Hauptmenü aus hellem Cartoon-Stein** im Hearthstone-Aufbau: großer Steinring mit den
  Platten *Schlacht* (freies Duell), *Kampagne* und *Kolosseum* (Zufallsduell), links die
  Balken *Aufgaben* und *Basar*, rechts *Sammlung* und *Kartenpakete*, oben rechts Gold und
  Einstellungen. Laufende Partien erscheinen als goldene Platte *Partie fortsetzen*.
- Antippen: Die Platte senkt sich wie eine Druckplatte, dumpfes Steinklopfen.
- Menüwechsel: Zwei Steinplatten schließen sich (Schleifen), rasten ein (Schlag + native
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
| `assets/game/stone.js` | Cartoon-Stein-Grafik (SVG), Kartenrücken (Canvas), Deckstapel-Glanz |
| `assets/game/stone.css` | Hauptmenü, Steinplatten-Übergang, Basar |
| `assets/game/assets/art/*` | Neue Bilder (JPEG-Daten mit `.png`-Endung, da die App nur `.png` als Bild ausliefert) |
| `assets/game/assets/audio/stone-*, scrape-*, grind-*, slam-*` | Steingeräusche (`werkzeuge/stein_sounds.py`) |

## Bauen

```sh
pip install cryptography
python3 werkzeuge/apk_bauen.py quellcode Chroniken-1.3.0-Test.apk \
    werkzeuge/signatur/chroniken-test.p12 chroniken-test
```

Version ändern (gleich lange Versionstexte): `python3 werkzeuge/manifest_version.py quellcode/AndroidManifest.xml 7 1.3.0 1.3.1`

## Tests

```sh
node --test werkzeuge/tests/*.test.js
```

Kosmetik-Käufe (Gold wird genau einmal abgezogen), Ausrüsten nur nach Freischaltung,
Speichern/Laden, alte 1.2.2-Spielstände, manipulierte Spielstände und 100 simulierte Partien.

## Signatur

Der private Schlüssel der Version 1.2.2 lag nicht im Repository. 1.3.0 ist deshalb mit dem
neuen Testschlüssel `werkzeuge/signatur/chroniken-test.p12` (Passwort `chroniken-test`)
signiert. Künftige Versionen mit diesem Schlüssel lassen sich direkt als Update installieren.

Umstieg von 1.2.2: In der alten App *Einstellungen → Spielstand exportieren*, alte App
deinstallieren, 1.3.0 installieren, *Einstellungen → Spielstand importieren*.
