# Einbauanleitung — Teil 04

Grundlage ist das angehängte Originalprojekt. Dies ist eine Assetlieferung ohne Änderung am eigentlichen Spiel und ohne GitHub-Aktion.

## Atlanten

`game-assets/art/r04-01.webp`, `r04-02.webp` und `r04-03.webp` später nach `quellcode/assets/game/assets/art/` kopieren. Jeder Atlas hat 2896×2172 Pixel, vier Spalten und drei Zeilen mit 724×724 Pixeln pro Zelle. Dies entspricht der bestehenden `R.tile`-Aufteilung.

Nur die 30 IDs in `KARTEN_TOKEN_MAPPING.json` auf das angegebene Paar `art`/`cell` umstellen. Karten in `D.cards` beziehungsweise `D.byId`, Tokens in `D.tokens` anhand ihrer **IDs** zuordnen. `art` enthält den Dateinamen ohne Endung. Zellen werden zeilenweise ab null gezählt. Im letzten Atlas sind Zellen 6–11 unbenutzt; sie sind Reserveflächen und dürfen keiner Karte zugewiesen werden.

Der erste Atlas enthält die zwölf Agrippa-Karten. Der zweite enthält Pionier und Perikles 0–10. Der dritte enthält Perikles 11, Bürger, Athena Parthenos und die drei griechischen Karten. Alle Namen und Pfade sind im Manifest verbindlich erfasst.

Den Atlas-Lader um die drei Namen erweitern beziehungsweise die verwendeten `art`-Werte aus **Karten und Tokens** sammeln. Nicht voraussetzen, dass Tokens automatisch über `D.byId` geladen werden. Token `parthenos` heißt Athena Parthenos; `pioneer` heißt Pionier; `citizen` heißt Bürger.

Alle alten Atlanten und ihre verbleibenden Zuordnungen erhalten. Keine pauschale Bereinigung von `missingArt`; nur tatsächlich neu gelieferte und erfolgreich geladene IDs freischalten. Kartenwerte, Effekte, Besitzstände, Namen und Spielregeln bleiben unverändert.

## Einzelbilder

Alternativ die 30 PNGs aus `assets/cards/` und `assets/tokens/` nach den im Manifest genannten `single_target`-Pfaden kopieren. Diese Bilder müssen als vollständige Einzelbilder geladen werden, nicht durch den 4×3-Atlasrenderer. Die PNGs sind native, unbeschnittene Generierungsoriginale; ihre tatsächlichen Größen stehen im Manifest. Gewünschte Promptgröße und reale Ausgabe können abweichen.

Die drei Tokens sind vollständige quadratische Szenenbilder mit Hintergrund. Sie sind keine freigestellten UI-Sprites. Motivfenster und Kartenrahmen werden später wie bei anderen Karten separat angewendet. UI-Masken und native Android-Ergänzungen bleiben Bestandteil von Teil 03.

Nur einen Ladeweg aktiv verwenden, um PNGs und Atlanten nicht doppelt in den Speicher zu laden. Die WebP-Atlanten sind hochwertige, aber verlustbehaftete technische Verkleinerungen; die PNGs bleiben die Originalquelle.

## Prüfung nach späterem Einbau

Die 30 IDs anhand des Katalogs durchgehen: richtiger Name, richtiger Ausschnitt, keine fremde Nachbarzelle, korrektes Tokenbild. Insbesondere Pionier, Bürger und Athena Parthenos in ihren Beschwörungssituationen testen. Es wurde in diesem Durchlauf keine Laufzeitabnahme vorgenommen.

Für das nächste Paket ausschließlich `OFFENE_GENERIERUNGSAUFTRAEGE.json` mit 265 regulären Aufträgen verwenden. Die 41 geretteten Motive bleiben unter allen möglichen Kartennamen gesperrt. `hypatia_0` und `hypatia_2` nicht generieren. `gerettet.zip` bleibt eine eigenständige notwendige Lieferung.
