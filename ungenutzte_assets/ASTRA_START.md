# AETERNA – Start der Astra-Bildgenerierung

*Stand 1.40.0 (27. 11. 2026). Das Spiel ist fertig gebaut (Entscheidung 22): Ab hier ändern neue Bilder nur noch das Aussehen, keine
Regel und keine Karte mehr. Diese Seite ist der ganze Ablauf – von der ersten Bestellung bis zum Einbau.*

## Was bestellt wird

| Reihe | Pakete | Inhalt | Liegt in |
|---|---|---|---|
| **K – Kartenbilder** | K01–K32 | Alle Kartenpakete sind abgeschlossen. 416 Karten und 28 verwendete Spielsteine haben ein Bild. | [Bildbestand](ASTRA_STAND.csv) |
| **U – Oberfläche** | U01–U13 | Offene gemalte Oberflächenteile mit Transparenz (Spielbrett, Werte, Effekte, Menüs, Modi, Updates, Auftritt der Legendären) | `ungenutzte_assets/astra_bestellung/U01.md` … `U13.md` |

Jede Paketdatei ist vollständig: Auftrag zum Kopieren, Stil- und Dateivorgaben, Referenzen und genau die Motive des Pakets
(höchstens zehn Kartenbilder je Paket). Die Übersicht mit allen IDs steht in `ASTRA_AUFTRAG.md`, Abschnitt 0; der Stand jeder
Karte in `ASTRA_STAND.csv`. Die Paketdateien erzeugt `python3 werkzeuge/astra_bilder.py --nur-auftrag` – nicht von Hand ändern.

## Einmal vorbereiten (5 Minuten)

1. **Referenzbilder bereitlegen** (aus dem Repo herunterladen, z. B. auf GitHub „Download raw file“):
   - Karten: `ungenutzte_assets/neue_astra_assets/Teil5/originale_1254px/imhotep_3.png` (Figur),
     `…/Teil6/originale/griechen_6.png` (Bauwerk), `…/Teil6/originale/epaminondas_5.png` (Gruppenszene).
   - Oberfläche: `quellcode/assets/game/assets/ui/kartenrahmen-minion-normal.webp`, `…/stundenglas.webp`, `…/waffenablage.webp`.

Die sechs verlorenen Motive aus Teil 4 haben neue Illustrationen in `Lieferung_K24/` erhalten.

## Je Paket (10 Minuten Bestellung, eine Sitzung Einbau)

1. Neue Unterhaltung mit Astra, **die Paketdatei anhängen** (z. B. `U01.md`) und die drei passenden Referenzbilder dazulegen.
2. Den Block „Arbeitsauftrag zum Kopieren“ aus der Datei einfügen und abschicken.
3. **Prüfen, bevor Du die Lieferung annimmst:**
   - Dateinamen genau wie die IDs (`mandukhai_1.png`), PNG – ein umbenanntes JPEG nicht annehmen.
   - Kein Text, keine Zahlen, kein Kartenrahmen im Bild; Oberflächenteile mit echter Transparenz.
   - Motiv passt zur Zeile (Epoche, Personen, keine Fantasy). Ein falsches Bild gleich in derselben Unterhaltung neu anfordern.
4. Die Dateien in den Ordner `ungenutzte_assets/neue_astra_assets/Lieferung_K02/` (bzw. `Lieferung_U01/`) legen – lokal oder auf
   GitHub mit „Add file → Upload files“ und dem Ordnernamen im Pfad. Mehrere Lieferungen dürfen sich sammeln.
5. Eine Claude-Code-Sitzung mit diesem Text starten:

   > Lies die `README.md` im Repo `ProjectPyTales/Aeterna_Hauptspiel`. Baue die Astra-Lieferung(en) **U01** aus
   > `ungenutzte_assets/neue_astra_assets/Lieferung_U01/` ein (AP A.3): `python3 werkzeuge/astra_bilder.py`, `node werkzeuge/motive.js`,
   > Tests und Klickpfad, neue Referenzbilder ansehen. Melde Bilder, die nicht zur Motivzeile passen. Öffne am Ende einen Pull Request
   > nach `main` und merge ihn bei grüner CI.

   Kartenbilder brauchen dafür keinen Code: Das Werkzeug findet jeden Ordner `Lieferung_K…` selbst (spätere Pakete haben Vorrang),
   packt die Atlanten neu und streicht die IDs aus dem Auftrag. Oberflächenteile (`Lieferung_U…`) stellt die Sitzung von der
   gezeichneten Grafik auf das Bild um, so wie in 1.22.0.

## Empfohlene Reihenfolge

1. **U01 und U02** – Spielbrett und Kartenwerte sieht man in jeder Partie.
2. **U03 bis U13** – verbleibende Oberflächenteile je Modus und Ansicht ergänzen.

Eine Bestellung je Tag reicht; jede eingebaute Lieferung kommt mit der nächsten Test-APK aufs Handy.

## Wenn etwas abweicht

| Fall | Was tun |
|---|---|
| Astra liefert eine andere Größe (z. B. 1254 × 1254) | Annehmen – das Werkzeug schneidet quadratisch zu und verkleinert. |
| Ein Dateiname weicht ab | Vor dem Hochladen in die ID umbenennen. Ein Name ohne Karte im Spiel lässt das Werkzeug mit einer Meldung abbrechen. |
| Ein Bild gefällt nicht | Gleiche ID später erneut liefern, in einen neueren Ordner (`Lieferung_K05b/`) – der neuere gewinnt. |
| Astra will mehr als 12 Bilder in ein ZIP packen | Auf zwei ZIPs bestehen – große ZIPs sind mehrfach abgebrochen. |
| Eine Karte soll nach dem Bild umbenannt werden | Wie in AP L.6: der Name folgt dem Bild – kurz in der Einbau-Sitzung sagen. |
