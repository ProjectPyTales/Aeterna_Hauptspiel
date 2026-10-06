# Aeterna – Stil-Bibel

**Status:** Entwurf zur Freigabe (AP 1.1). Abgeleitet aus dem Konzeptbild
`ungenutzte_assets/ui/hauptmenue-konzept.jpg`; im Hauptmenü (AP 1.3) bereits umgesetzt.
Alle Farbwerte wurden im Konzeptbild gemessen (Median bzw. gesättigte Anteile der genannten Stellen).
Die Übersicht als Bild: [`stiltafel.jpg`](stiltafel.jpg).

> **In einem Satz:** Ein sonnendurchfluteter Tempelsaal aus hellem, verwittertem Kalkstein, gefasst in
> gealterte Bronze und Blattgold, in dem Efeu wächst und Staub im warmen Licht von oben rechts tanzt –
> gemalt, freundlich, leicht comichaft, nie düster.

---

## 1. Farbpalette

Die Namen sind zugleich die CSS-Variablen in `quellcode/assets/game/hall.css` (`--ae-…`).

### Stein und Holz

| Name | Hex | Gemessen an | Verwendung |
|---|---|---|---|
| `stein-glanz` | `#fbeccf` | Kantenlicht der Platten | Lichtkanten, Unterlippe gravierter Schrift |
| `stein-hell` | `#e5ceb1` | Fläche der Menüplatten | Knöpfe, Tafeln, helle Flächen |
| `marmor` | `#dbcaae` | Titeltafel | Titel, besondere Tafeln (mit grauen Adern) |
| `ring` | `#c1a380` | Innenscheibe des Steinrings | vertiefte Flächen, Hintergrund von Panels |
| `wand` | `#b69167` | Wand im Licht | Mauerwerk |
| `wand-schatten` | `#806b5e` | Wand links unten | Mauerwerk im Schatten, Randabdunklung |
| `holz` | `#57412c` | Rahmen der Platten | Fassungen, Fugen, Rahmenleisten |
| `titelband` | `#66513f` | dunkles Band der Titeltafel | dunkle Schriftbänder (helle Schrift darauf) |
| `tinte` | `#2e1a0f` | dunkelste Konturen | Konturlinien, tiefste Schatten – **nie reines Schwarz** |
| `gravur` | `#43301f` | – (aus `tinte` aufgehellt) | gravierte Schrift auf hellem Stein |

### Metall und Licht

| Name | Hex | Gemessen an | Verwendung |
|---|---|---|---|
| `bronze-hell` | `#ca9a6c` | Glanz der Medaillon-Ringe | Glanzlichter auf Bronze |
| `bronze` | `#875d3e` | Medaillon-Ringe, Zahnrad | Fassungen, Ringe, Zahnrad |
| `bronze-dunkel` | `#5a3925` | Schattenseite der Ringe | Bronze im Schatten |
| `goldlinie` | `#b0824a` | Zierlinie im Ring | feine Ziernähte, Rahmenlinien |
| `blattgold` | `#d6a148` | Ornamente, Titelschrift | Goldeinlagen, Auszeichnungen, „ausgerüstet“ |
| `muenzgold` | `#efa21a` | Münze in der Goldanzeige | Währung, Belohnungen |
| `stern` | `#f1cb44` | Stern im Schlussstein | Leuchtpunkte, Fokus, Auftrittsblitz |
| `licht` | `#ecc793` | Lichtstrahlen oben rechts | Strahlen, Staub, Funken (mit „screen“ überlagert) |

### Akzente der Bereiche (Emaille der Medaillons)

| Name | Hex (Mitte) | hell / dunkel | Bereich |
|---|---|---|---|
| `lapis` | `#44528e` | `#58699b` / `#2f3a66` | Aufgaben, Wissen, Kampagne |
| `medaillon-gold` | `#905c1b` | `#dcaa58` / `#5d3000` | Basar, Gold, Belohnung |
| `oliv` | `#72582e` | `#a08556` / `#39290e` | Sammlung, Kartenbuch |
| `terrakotta` | `#b1523f` | `#bd6450` / `#471107` | Kartenpakete, Kampf |
| `efeu` | `#61671d` | `#757c2e` / `#454b0f` | Pflanzen, Leben, Heilung |

### Zustandsfarben (abgeleitet, nicht im Bild)

| Name | Hex | Bedeutung |
|---|---|---|
| `spielbar` | `#8cc152` | spielbare Karte, angriffsbereite Einheit (aufgehelltes Efeugrün) |
| `ziel` | `#d8644e` | gültiges Ziel, Gefahr, Marschrouten-Pfeil (helles Terrakotta) |
| `siegelrot` | `#ab2b1c` | Benachrichtigungs-Siegel (rotes Wachs mit hellem Glanz oben links) |
| gesperrt | – | Fläche entsättigen (`saturate(.6)`) und auf 85 % abdunkeln, **nicht** halbtransparent |

## 2. Materialien

| Material | So sieht es aus | So nicht |
|---|---|---|
| **Heller Kalkstein** | warmes Beige, feine Poren, abgeplatzte Kanten, Haarrisse, Moos und Staub in den Fugen, helle Oberkante | glatte Vektorflächen, kaltes Grau, Rauschen ohne Form |
| **Marmor** | fast weiß mit grauen Adern, nur für Besonderes (Titel, Legendäres) | flächig weiß |
| **Gealterte Bronze** | Kupferbraun, Nieten, acht kleine Dornen am Ring, warmes Glanzlicht | Chrom, Neon, reines Gelbgold |
| **Blattgold** | dünne Linien und Einlagen in Stein und Schrift, Verlauf hell → satt → dunkel | großflächiges Gold |
| **Emaille (Lapis, Oliv, Gold, Terrakotta)** | gesättigte Scheibe im Bronzering mit silbernem Innenrand, Symbol hell mit dunkler Kontur | Flachfarbe ohne Rand |
| **Dunkles Holz / Fassung** | Rahmen und Fugen um Platten, fast schokoladenbraun | – |
| **Efeu und Gras** | sattgrüne Blätter mit dunkler Kontur, wachsen aus Fugen und über Kanten | Blumen, Bunt |
| **Eisen** | rostige Ketten (nur Aufhängung) | blankes Metall |

## 3. Licht

- **Hauptlicht warm von oben rechts** (etwa 40° von der Senkrechten). Im Bild sichtbar als breite
  Strahlenbündel; die rechte Bildhälfte ist heller.
- Oberkanten und rechte Kanten bekommen eine helle Fase (`stein-glanz`), Unterkanten einen dunklen Absatz.
- **Weiche Umgebungsverdeckung** in Fugen und unter Platten; Schlagschatten kurz, nach unten links.
- Lebendiges Licht im Code: Strahlen pulsieren langsam (5–9 s), Staub und Funken schweben,
  der Stern glüht (3,2 s), Glanzläufe über Medaillons (alle ~7 s). Immer mit `mix-blend-mode: screen`.
- Gravierte Schrift: dunkler Schnitt mit **heller Unterlippe** (1,5 px `#fff5e0`) und dunkler Oberkante.

## 4. Konturen

- Farbe `tinte` (`#2e1a0f`), nie Schwarz.
- Stärke im gemalten Bild (2000 px breit): 3–4 px an Außenkanten, 1,5–2 px innen.
  Auf der Bühne (1600 × 800) entspricht das 2–3 px bzw. 1–1,5 px.
- Feine Ziernähte in `goldlinie`, etwa 2 px.

## 5. Schriften (alle SIL Open Font License, offline in `assets/fonts/`)

| Rolle | Schrift | Schnitt | Größe auf der Bühne | Verwendung |
|---|---|---|---|---|
| **Aeterna Zier** | Cinzel Decorative | Bold | 52 px | nur Logo „AETERNA“ und große Ereignisse (Sieg, Legendär) |
| **Aeterna Titel** | Cinzel (variabel) | 600–700 | 25–33 px, Zahlen 31 px | Platten, Reiter, Überschriften, Goldzahl – immer in Versalien, Laufweite 2–5 px |
| **Aeterna Text** | Alegreya Sans | Medium, Bold | mindestens 16 px, üblich 18 px | Untertitel, Beschreibungen, Fließtext, Zahlen in Siegeln |

- Kleinste Schrift auf der Bühne 14 px (Fußzeile) – auf einem 412 px hohen Handy sind das ≈ 7 CSS-px,
  deshalb nur für Nebensachen.
- Lange Inschriften werden automatisch verkleinert, bis sie zwischen die Nieten passen (`CHH.fit`).
- **Vermeiden:** Belwe und andere Hearthstone-ähnliche Schriften, DejaVu für sichtbare Titel (bleibt nur als Rückfall).
- Die übrigen Bildschirme (Basar, Sammlung, Heldenwahl) wechseln mit AP 1.4–1.7 auf diese Schriften.

## 6. Symbole und Bedienelemente

- **Medaillon:** Bronzering mit acht Dornen, Emaille-Scheibe in der Bereichsfarbe, helles Symbol
  (Schriftrolle, Münzstapel, Buch, Karten) mit dunkler Kontur. Sitzt am Ende eines Steinbalkens.
- **Platte:** sechseckige Steintafel mit zwei Bronzenieten in Holzfassung; Text graviert, Untertitel klein darunter.
- **Siegel:** rotes Wachs, unregelmäßiger Rand, helle Zahl – nur für „hier gibt es etwas“.
- **Knauf:** runde Steinscheibe mit Zahnrad-Relief im Bronzering, dreht sich bei Berührung.
- Touch-Ziele mindestens 48 dp; Trefferflächen folgen der Form (Platte, Kreis, Balken), nicht dem Rechteck.

## 7. Bewegungssprache

Stein ist schwer: Er bewegt sich wenig, aber entschieden, und federt kaum nach. Licht und Staub sind
leicht und langsam.

| Bewegung | Dauer | Easing | Beispiel |
|---|---|---|---|
| Eindrücken | 70–90 ms | `cubic-bezier(.3,.8,.4,1)` | Platte sinkt 6 px, Medaillon auf 94 % |
| Lösen / Nachfedern | 120–320 ms | `cubic-bezier(.3,1.5,.5,1)` | Zahnrad dreht 60°, Medaillon setzt sich |
| Auftritt | ≤ 700 ms, gestaffelt 60–90 ms | `cubic-bezier(.2,.85,.3,1.12)` | Platten fahren in ihre Fugen |
| Bildschirmwechsel | ≤ 600 ms | ein: `cubic-bezier(.55,.05,.9,.45)`, aus: `cubic-bezier(.15,.7,.3,1)` | Blitz aus dem Stern, Zoom in den Ring |
| Aufleuchten | 400–450 ms | `ease-out` | Lichtlauf über einen Balken |
| Umgebung | 3–9 s, endlos | `ease-in-out` | Strahlen, Sternglühen, Staub |
| Treffer-Stopp (Phase 3) | 40–80 ms | – | kurzer Halt beim Aufprall |

Bei „Bewegung reduzieren“ (Systemeinstellung) entfallen Auftritt, Zoom, Staub und Pulsieren.

## 8. Klangfarben

**Oberfläche:** Stein (dumpfes Klopfen beim Drücken, Schleifen bei Übergängen), Bronze (heller Anschlag
bei Belohnungen), Pergament (Karten, Listen). Kein Klick ohne Material.

| Epoche | Instrumente und Klänge |
|---|---|
| Sparta | Aulos, Bronzeschild, Lyra |
| Alexandria | Ney, Harfe, Astrolabium-Klicken |
| Ägypten | Sistrum, Rahmentrommel, Sand |
| Venedig | Laute, Kirchenglocken, Wasser |
| Mongolei | Morin Khuur (Pferdekopfgeige), Kehlgesang, Hufe |
| Kelten | Bodhrán, Carnyx, Wind |
| Renaissance | Laute, Cembalo, Federkiel |
| Frankreich | Schalmei, Marschtrommel, Fanfare |
| Wikinger | Tagelharpa, Kriegshorn, Brandung |
| Japan | Shamisen, Shakuhachi, Taiko |

## 9. Regeln für neue Grafiken (AP 1.2)

1. Konzeptbild als Stilreferenz anhängen, **Lichtrichtung oben rechts** vorgeben.
2. In doppelter Zielgröße erzeugen, transparenter oder einfarbiger Hintergrund, **kein Text im Bild**.
3. Konturen in dunklem Braun, Palette oben einhalten; Efeu sparsam als Akzent.
4. Prompt-Anfang: siehe README, AP 1.2.
5. Ablage in `ungenutzte_assets/ui/`; Einbau erst nach Freigabe.

## 10. Zur Freigabe – bitte entscheiden

- [ ] Palette und Materialien passen so.
- [ ] Schriften: Cinzel / Cinzel Decorative / Alegreya Sans (Alternative für Text: Fira Sans).
- [ ] Unterzeile im Logo: „Das historische Kartenduell“ (oder z. B. „Die Chronik der Helden“).
- [ ] Bewegungssprache „schwerer Stein, leichtes Licht“.
