# AETERNA – Start der Astra-Bildgenerierung

*Stand 1.34.0 (2. 11. 2026). Das Spiel ist fertig gebaut (Entscheidung 22): Ab hier ändern neue Bilder nur noch das Aussehen, keine
Regel und keine Karte mehr. Diese Seite ist der ganze Ablauf – von der ersten Bestellung bis zum Einbau.*

## Was bestellt wird

| Reihe | Pakete | Inhalt | Liegt in |
|---|---|---|---|
| **K – Kartenbilder** | K01–K32 | 239 Bilder: 232 neue Motive, 1 Korrektur (`fabius_0`), 6 aus Teil 4 (zuerst das Original suchen) | `ungenutzte_assets/astra_bestellung/K01.md` … `K32.md` |
| **U – Oberfläche** | U01–U13 | 80 gemalte Oberflächenteile mit Transparenz (Spielbrett, Werte, Effekte, Menüs, Modi, Updates, Auftritt der Legendären) | `ungenutzte_assets/astra_bestellung/U01.md` … `U13.md` |

Jede Paketdatei ist vollständig: Auftrag zum Kopieren, Stil- und Dateivorgaben, Referenzen und genau die Motive des Pakets
(höchstens zehn Kartenbilder je Paket). Die Übersicht mit allen IDs steht in `ASTRA_AUFTRAG.md`, Abschnitt 0; der Stand jeder
Karte in `ASTRA_STAND.csv`. Die Paketdateien erzeugt `python3 werkzeuge/astra_bilder.py --nur-auftrag` – nicht von Hand ändern.

## Einmal vorbereiten (5 Minuten)

1. **Referenzbilder bereitlegen** (aus dem Repo herunterladen, z. B. auf GitHub „Download raw file“):
   - Karten: `ungenutzte_assets/neue_astra_assets/Teil5/originale_1254px/imhotep_3.png` (Figur),
     `…/Teil6/originale/griechen_6.png` (Bauwerk), `…/Teil6/originale/epaminondas_5.png` (Gruppenszene).
   - Oberfläche: `quellcode/assets/game/assets/ui/kartenrahmen-minion-normal.webp`, `…/stundenglas.webp`, `…/waffenablage.webp`.
2. **Teil 4 suchen:** Sechs Bilder aus der vierten Lieferung sind beschädigt (`pioneer`, `perikles_7`, `perikles_8`, `perikles_9`,
   `citizen`, `parthenos` – in K24). Findest Du die Originale, lege sie in `ungenutzte_assets/neue_astra_assets/Lieferung_K24/`;
   sonst bestellt K24 sie neu.

## Je Paket (10 Minuten Bestellung, eine Sitzung Einbau)

1. Neue Unterhaltung mit Astra, **die Paketdatei anhängen** (z. B. `K01.md`) und die drei passenden Referenzbilder dazulegen.
2. Den Block „Arbeitsauftrag zum Kopieren“ aus der Datei einfügen und abschicken.
3. **Prüfen, bevor Du die Lieferung annimmst:**
   - Dateinamen genau wie die IDs (`fabius_0.png`), PNG – ein umbenanntes JPEG nicht annehmen.
   - Kein Text, keine Zahlen, kein Kartenrahmen im Bild; Oberflächenteile mit echter Transparenz.
   - Motiv passt zur Zeile (Epoche, Personen, keine Fantasy). Ein falsches Bild gleich in derselben Unterhaltung neu anfordern.
4. Die Dateien in den Ordner `ungenutzte_assets/neue_astra_assets/Lieferung_K01/` (bzw. `Lieferung_U01/`) legen – lokal oder auf
   GitHub mit „Add file → Upload files“ und dem Ordnernamen im Pfad. Mehrere Lieferungen dürfen sich sammeln.
5. Eine Claude-Code-Sitzung mit diesem Text starten:

   > Lies die `README.md` im Repo `ProjectPyTales/Aeterna_Hauptspiel`. Baue die Astra-Lieferung(en) **K01** aus
   > `ungenutzte_assets/neue_astra_assets/Lieferung_K01/` ein (AP A.3): `python3 werkzeuge/astra_bilder.py`, `node werkzeuge/motive.js`,
   > Tests und Klickpfad, neue Referenzbilder ansehen. Melde Bilder, die nicht zur Motivzeile passen. Öffne am Ende einen Pull Request
   > nach `main` und merge ihn bei grüner CI.

   Kartenbilder brauchen dafür keinen Code: Das Werkzeug findet jeden Ordner `Lieferung_K…` selbst (spätere Pakete haben Vorrang),
   packt die Atlanten neu und streicht die IDs aus dem Auftrag. Oberflächenteile (`Lieferung_U…`) stellt die Sitzung von der
   gezeichneten Grafik auf das Bild um, so wie in 1.22.0.

## Empfohlene Reihenfolge

1. **U01 und U02** – Spielbrett und Kartenwerte sieht man in jeder Partie.
2. **K22 und K23** – die Spielsteine erscheinen in vielen Partien und in den Lehrstunden.
3. **K01 bis K21** in der Reihenfolge der Liste (je Held und Zeitalter), dazwischen **U03 bis U05**.
4. **K24 bis K32** (Teil 4, Alexandria, Hinterhalte, Wunder der Welt) und **U06 bis U11** (Modi), zuletzt **U12** (Updates) und **U13** (Auftritt der Legendären).

Eine Bestellung je Tag reicht; jede eingebaute Lieferung kommt mit der nächsten Test-APK aufs Handy.

## Wenn etwas abweicht

| Fall | Was tun |
|---|---|
| Astra liefert eine andere Größe (z. B. 1254 × 1254) | Annehmen – das Werkzeug schneidet quadratisch zu und verkleinert. |
| Ein Dateiname weicht ab | Vor dem Hochladen in die ID umbenennen. Ein Name ohne Karte im Spiel lässt das Werkzeug mit einer Meldung abbrechen. |
| Ein Bild gefällt nicht | Gleiche ID später erneut liefern, in einen neueren Ordner (`Lieferung_K05b/`) – der neuere gewinnt. |
| Astra will mehr als 12 Bilder in ein ZIP packen | Auf zwei ZIPs bestehen – große ZIPs sind mehrfach abgebrochen. |
| Eine Karte soll nach dem Bild umbenannt werden | Wie in AP L.6: der Name folgt dem Bild – kurz in der Einbau-Sitzung sagen. |
