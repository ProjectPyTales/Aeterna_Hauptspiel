# Fehlende Motive

*Automatisch erzeugt von `node werkzeuge/motive.js` – nicht von Hand ändern.* Bis ein Motiv da ist, zeichnet das Spiel
einen gestalteten Platzhalter (Epochenfarbe, Symbol, „Motiv folgt“; AP 5.12).

**Stand:** 0 Karten ohne Motiv, 0 Helden ohne Porträt, 0 Schlachtfelder ohne Bild, 0 im Code gezeichnete Grafiken.
Die Karten der elf Lehrplan-Helden tragen seit 1.15.0 (AP L.2) Namen und Bildideen aus deren Lebenswelt.

Den Bildstand jeder Karte und jedes Spielsteins führt `ungenutzte_assets/ASTRA_STAND.csv`.
Offene Bildaufträge und historische Korrekturen stehen in `ungenutzte_assets/ASTRA_AUFTRAG.md`.
Lieferungen kommen nach `ungenutzte_assets/neue_astra_assets/`. Das Werkzeug `werkzeuge/astra_bilder.py` baut sie ein.

| ID | Name | Held | Typ | Größe (px) | Prompt |
|---|---|---|---|---|---|


## Im Code gezeichnet (AP L.4)

Diese Grafiken zeichnet das Spiel heute selbst (Canvas, SVG oder CSS). Im Code steht an der Zeichenfunktion der Kommentar
`ASTRA: <kennung> – <was>, <Größe>`. Ablage der Astra-Bilder: `ungenutzte_assets/astra/<kennung>.png` in doppelter Größe; eine
spätere Sitzung baut sie ein. Größen mit „9-Slice“ sind dehnbare Rahmen (Ecken fest, Kanten und Mitte gestreckt).

| Kennung | Was | Größe (px) | Stelle im Code | Prompt |
|---|---|---|---|---|
