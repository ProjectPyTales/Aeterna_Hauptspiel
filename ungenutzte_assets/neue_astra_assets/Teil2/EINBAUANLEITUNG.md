# Einbauanleitung — Teil 02 / Zwischenstand 01

Grundlage: hochgeladenes Projekt Aeterna 1.20.0, Quellwurzel `quellcode/assets/game/`. Diese Lieferung verändert weder den Projektcode noch GitHub. Die folgenden Schritte führt die spätere Integration aus.

## Lieferumfang und Dateien

- 27 Kartenillustrationen unter `assets/cards/<id>.png`.
- 3 Tokenillustrationen unter `assets/tokens/<id>.png`: `hoplite`, `novice`, `totem_heal`.
- 3 WebP-Atlanten unter `game-assets/art/`, jeweils 2896 × 2172 Pixel, vier Spalten und drei Zeilen; jede Zelle 724 × 724 Pixel.
- `KARTEN_TOKEN_MAPPING.json` ist die verbindliche Zuordnung von ID zu `art` und `cell`. Zellnummern beginnen bei 0 und laufen zeilenweise von links nach rechts.
- `ASSET_MANIFEST.json` nennt tatsächliche Originalmaße, Prüfsummen, Einzelbild- und Atlas-Zielpfade. Gewünschte Generierungsmaße und tatsächliche Maße sind getrennt angegeben.

## Empfohlener Atlas-Einbau

1. Vor Änderungen Arbeitskopie und aktuelle Zuordnungen sichern. Nur IDs aus diesem Paket übernehmen.
2. Die drei Dateien `game-assets/art/r02-b01-01.webp`, `r02-b01-02.webp` und `r02-b01-03.webp` nach `quellcode/assets/game/assets/art/` kopieren. Ihre Namen sind neu; bestehende Atlanten bleiben erhalten.
3. Nach der vollständigen Konstruktion von Karten und Tokens, vor dem initialen Laden der Bilder, jedem der 30 passenden Objekte die Werte `art` und `cell` aus `KARTEN_TOKEN_MAPPING.json` zuweisen. Karten stehen in `CHD.cards`, Tokens in `CHD.tokens`; im hochgeladenen Stand referenziert `CHD.byId` beide Gruppen. Beim Einbau gegen den aktuellen Stand prüfen, ob diese Referenzidentität erhalten ist.
4. Nur für erfolgreich zugeordnete und geladene neue IDs einen eventuell vorhandenen `missingArt`-Marker entfernen. Nicht global bereinigen.
5. `R.atlases()` in `view/match/render.js` sammelt im Ausgangsstand Atlasnamen aus `D.byId`. Sind die Zuordnungen vor `R.load()` gesetzt, werden diese drei neuen Atlanten darüber gefunden. Bei später Zuweisung müssen sie explizit geladen werden; anschließend Vorschaubild-Caches neu aufbauen oder die Anwendung vollständig neu laden.
6. `R.tile` teilt die Bildbreite bereits durch 4 und die Bildhöhe durch 3. Diese Geometrie beibehalten. `ATLAS_MANIFEST.json` nennt die sechs ungenutzten Zellen des dritten Atlas; ihnen darf keine Karte zugeordnet werden.
7. Für den Token `totem_heal` den bestehenden Namen „Grenzstein des Klosters“ verwenden. IDs werden nicht umbenannt. `jeanne` bezeichnet Hildegard von Bingen, nicht Jeanne d’Arc.

Zuweisungsprinzip für die spätere Integration (das JSON vorher lokal laden oder als Konstante einbinden):

```js
for (const [id, m] of Object.entries(mapping)) {
  const item = CHD.byId[id];
  if (!item) throw new Error(`Unbekannte Asset-ID: ${id}`);
  item.art = m.art;
  item.cell = m.cell;
}
```

Keine alphabetische Zuordnung, keine Ableitung aus deutschen Dateititeln und keine Neubelegung alter Atlas-Zellen. Ausschließlich das Mapping dieses Pakets anwenden. Aus der Kategorie `tokens` folgt kein transparenter Hintergrund: Diese drei Tokenillustrationen sind ausdrücklich vollflächige Szenen.

## Alternative mit Einzelbildern

Die PNGs gemäß `single_target` im Manifest kopieren. Dafür den Renderer ausdrücklich um einen Einzelbildmodus erweitern: das vollständige Bild als Quelle zeichnen, ohne die bisherige 4×3-Aufteilung. Auch Sammlung, Karten-Vorschau und Token-Darstellung berücksichtigen. Ein PNG allein in den vorhandenen Atlaspfad zu legen genügt nicht: Der vorhandene Loader erwartet dort WebP-Atlanten. Einen der beiden Wege wählen; die Original-PNGs müssen bei Atlas-Nutzung nicht in die Laufzeit-App.

## Zusammenspiel mit Teil 01 und gerettet.zip

Die neun Kartenbilder aus Teil 01 sowie dessen Helden, Skins und UI bleiben unverändert. Die 41 geretteten Bilder werden nicht ersetzt. Ihre Zuordnungstabelle in diesem Paket ist eine dokumentierte Arbeitsrekonstruktion, da das Rettungsarchiv nur beschreibende Dateinamen enthält. Sie gehört nicht zum automatisch anzuwendenden Mapping der 30 neuen Bilder.

Besonders beachten: „Papyrusstudium in Alexandrien“ zeigt eine geometrische Tafel und wird vorläufig `hypatia_5` / Lehrsatz zugeordnet; der betrachtende Astronom vor Sternenhimmel wird vorläufig `hypatia_8` / Sternenorakel zugeordnet. `hypatia_0` und `hypatia_2` bleiben zusätzlich gesperrt, bis die ursprüngliche Zuordnung geklärt ist. Eine Sperre bedeutet nicht, dass dafür ein weiteres freigegebenes Bild geliefert wurde.

## Kurze Prüfung nach späterem Einbau

Alle 30 IDs einmal als Karte beziehungsweise Token öffnen; Name, Motiv und Atlas-Zelle vergleichen. Netzwerk-/Dateifehler prüfen, weil der Ausgangsrenderer bei fehlenden Bildern auf den Heldenatlas zurückfallen kann. Bei Tokens auch die tatsächliche Beschwörung prüfen. Teil-01-Assets und nicht bearbeitete Karten müssen weiterhin erreichbar bleiben. Eine vollständige Abnahme aller Karten, historischen Details und UI-Zustände ist mit dieser Lieferung nicht erfolgt.
