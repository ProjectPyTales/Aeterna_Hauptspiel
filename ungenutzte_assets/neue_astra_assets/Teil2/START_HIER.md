# Chronicle of Heroes / Aeterna — Teil 02

Zwischenstand 01: **30 neue Motive, davon 27 Karten und 3 Tokens.** Stand: 9. Oktober 2026.

1. `ASSET_KATALOG.html` zeigt die 30 neuen Bilder offline.
2. `EINBAUANLEITUNG.md` erläutert den späteren Einbau. Im Spiel und auf GitHub wurde nichts geändert.
3. `ASSET_ZUORDNUNG.csv`, `ASSET_MANIFEST.json` und `KARTEN_TOKEN_MAPPING.json` enthalten IDs, Dateien, Zielpfade und Atlas-Zellen.
4. `GERETTETE_ASSETS_ZUORDNUNG.json` erfasst die 41 bestehenden Motive. Deren Bilddateien bleiben in `gerettet.zip` und werden hier nicht nochmals mitgeliefert.
5. `OFFENE_GENERIERUNGSAUFTRAEGE.json` enthält 295 regulär offene Aufträge für weitere Pakete. Zwei zusätzliche Alexandria-IDs sind wegen möglicher Überschneidung gesperrt und stehen ausschließlich in `GESPERRTE_ZUORDNUNGSPRUEFUNG.json` und im vollständigen `RESTBESTAND.json`.

Dateien sind technisch kurz geprüft; keine vollständige historische, anatomische oder spielinterne Abnahme. Die PNG-Einzelbilder sind unbeschnittene Generierungsoriginale. Die drei WebP-Atlanten sind technische Ableitungen derselben 30 Motive und zählen nicht als zusätzliche Assets.

Die zunächst erzeugten Versuche für `hypatia_0` und `hypatia_2` sind nach dem erneuten Dublettenhinweis ausdrücklich ausgeschlossen und nicht in dieser ZIP enthalten. Als Ersatz wurden `imhotep_7` und `totem_heal` erstellt.

Für die Fortsetzung: jeweils 30 neue Motive pro ZIP liefern. Alle bereits gelieferten IDs sowie alle 41 geretteten Bildmotive sperren. Die beiden gesperrten Alexandria-IDs nicht automatisch neu erzeugen.
