# Lieferstatus — Teil 01

## Fertige Karten

| ID | Kartenname |
|---|---|
| `boudicca_5` | Heilkundige mit der Mistel |
| `dandolo_4` | Dogenklinge |
| `dandolo_6` | Geheimer Vertrag |
| `hypatia_9` | Theon von Alexandria |
| `leonidas_3` | Hoplitenhauptmann |
| `leonidas_4` | Speerträger |
| `leonidas_5` | Schildstoß |
| `leonidas_6` | Phalanxveteran |
| `leonidas_9` | Gorgo, Stimme Spartas |

## Noch offen

- **341 Kartenbilder** und **27 Tokenbilder**. Jede fehlende ID ist in `OFFENE_ASSETS.csv` aufgeführt.
- Die dazugehörigen Bildvorgaben stehen in `OFFENE_GENERIERUNGSAUFTRAEGE.json` (368 Aufträge). Die Stilreferenz ist das Hauptmenükonzept im Originalarchiv; sie wurde nicht als neu erstelltes Asset kopiert.
- Native Android-XML-Varianten für monochromes/adaptives Launcher-Icon und Splash benötigen noch die plattformspezifische Umsetzung. SVG/PNG-Grundmotive sind enthalten.
- Zusätzliche Filterzustände außerhalb der mitgelieferten Varianten bei Integration aus demselben Vektorsystem ergänzen; das Paket beansprucht noch keine vollständige Prüfung aller Laufzeitzustände.
- Kartenrahmen-Clipmasken, Hauptmenü-Trefferflächen und die lange Chronikleiste müssen beim Einbau an die realen Bildkonturen angepasst werden.
- Vollständige historische Detailprüfung und Abnahme im eigentlichen Spiel nach Abschluss der restlichen Motive.

## Qualität und Format

Verworfene Kartenversuche mit falschen Personen-/Szenenzuordnungen sind nicht enthalten. Gemalte Einzelbilder liegen als hochwertige WebP-Dateien vor; transparente Ebenen als PNG. Native UI-Elemente liegen als SVG und PNG vor. Die tatsächlichen Größen im Manifest sind verbindlich; Wunschgrößen aus der Generierung sind separat dokumentiert.

Die Atlas-Motive sind zentriert quadratisch zugeschnitten. Jedes Motiv liegt zusätzlich als unbeschnittenes Einzelbild vor. Unbelegte Restzellen sind nur Reserveflächen und niemals einer aktiven Karten-ID zugeordnet.

ASTRA-Gruppen mit zugeordneten Dateien: **69 von 70**. Nicht zugeordnete Gruppen: stufenpyramide. Karten/Token werden zusätzlich über ihre einzelnen IDs erfasst.