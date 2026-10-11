# Chronicle of Heroes / Aeterna — Assetpaket Teil 01

**Erste Teillieferung auf Wunsch des Nutzers. Stand: 9. Oktober 2026. Der Gesamtauftrag ist noch nicht abgeschlossen.**

Enthalten sind **74 neu gemalte Motive**, **192 neue UI-Vektorassets mit PNG-Alternativen** und **eine überarbeitete geografische SVG-Karte**. Das sind **267 unterschiedliche Assets**; PNG-Alternativen, Atlanten und Vorschaubilder werden nicht zusätzlich gezählt.

| Bereich | Fertig in diesem Paket | Gesamt laut Ausgangscode / Inventar |
|---|---:|---:|
| Heldenporträts | 22 | 22 |
| Helden-Skins | 4 | 4 |
| Kartenillustrationen | 9 | 350 |
| Tokenillustrationen | 0 | 27 |
| Kartenrücken | 8 | 8 |
| Gemalte Hintergründe | 12, darunter alle 5 Spielfelder | 12 geplante Motive |
| Gemalte UI-Ebenen | 19 | 19 geplante Motive |
| SVG-UI-Elemente | 192, jeweils zusätzlich als PNG | System mit Varianten und Zuständen |
| Kampagnenkarte | 1 SVG | 1 |

## So verwenden

1. `ASSET_KATALOG.html` lokal öffnen: durchsuchbarer Bildkatalog ohne Internetverbindung.
2. `EINBAUANLEITUNG.md` lesen. **Nur enthaltene IDs übernehmen.** Noch offene Karten und Tokens behalten vorläufig ihre vorhandenen Bilder beziehungsweise Platzhalter.
3. `ASSET_ZUORDNUNG.csv` oder `ASSET_MANIFEST.json` für genaue Dateien, Maße und Zielpfade verwenden.
4. `KARTEN_HELDEN_MAPPING.json` und `ATLAS_MANIFEST.json` ordnen die mitgelieferten Bilder den Atlas-Zellen zu.
5. `ASTRA_EINBAU.md` nennt die 70 markierten Grafikgruppen mit Code-Stellen und den verfügbaren Dateien. Diese Gruppen sind unterschiedlich groß; ihre Abdeckung ist **keine** Aussage, dass alle Kartenbilder bereits fertig sind.
6. `LIEFERSTATUS.md`, `OFFENE_ASSETS.csv` und `OFFENE_GENERIERUNGSAUFTRAEGE.json` beschreiben die Fortsetzung.

Die Einbau-KI erhält ein Assetpaket, kein integriertes Spiel. Die Grundlage ist das hochgeladene Archiv mit **Aeterna 1.20.0**. Es wurde nichts auf GitHub hochgeladen oder im eigentlichen Spiel eingebaut.

Historische Kleidung, Zeiträume und Materialien wurden in den Motiven berücksichtigt. Gesichter vieler Personen sind künstlerische Rekonstruktionen; `HISTORIK_UND_STIL.md` beschreibt Quellen und Grenzen. Das Paket ist keine Garantie, dass jedes generierte Detail historisch zweifelsfrei ist.
