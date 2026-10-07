# Aeterna

*Vormals „Chroniken der Helden“.* Ein historisches Offline-Kartenduell für Android: 350 Karten,
22 Helden von Fu Hao bis Musashi, 22 Kampagnenmissionen. Aktueller Stand im Code: **Version 1.11.0**
(Welle 2 der neuen Helden – Epaminondas, Fabius Maximus, Mandukhai, Baibars, Jan Žižka und Fu Hao mit je zehn Karten,
Chronikseite und Mission –, 21 Zeitalterkarten für Rom, Persien & Steppe und Byzanz, Massenöffnung der Kartenpakete und
Code-Eingabe); davor 1.10.0 mit Kartenwelle 1 (56 Karten – je Held zwei, je sieben Zeitalterkarten für Griechische Antike, Europäisches Mittelalter
und China/Korea/Japan, Weltwunder wie Kolosseum und Pyramiden –, neue Bauwerk-Regeln, eine KI, die Bauwerke belagert
oder ignoriert, und eine KI-Persönlichkeit je Held); davor 1.9.0 mit sechs neuen Helden und Heldenfähigkeiten als
Daten, 1.8.0 mit Platzhaltern, Chronik der Helden
und fünf neuen Schlüsselwörtern, 1.7.0 mit eigenen Schlüsselwörtern und zwölf neuen Legendären, 1.6.0 mit
Balance-Werkzeug und ausbalancierten Helden (47–53 %), 1.5.0 mit MVVM-Struktur und automatischer Sichtprüfung in der
CI, 1.4.0 mit neuem Namen Aeterna, gemaltem Hauptmenü, Stil-Bibel und Tagesduell.

![Konzeptbild und Umsetzung des Hauptmenüs](stil/vergleich-hauptmenue.jpg)

Dieses Dokument ist zugleich der **Arbeitsplan** für die nächsten Sitzungen. Ziel: Aeterna soll sich so
flüssig und hochwertig anfühlen wie die besten Kartenspiele, ohne eine Kopie zu sein, und vor allem Spaß machen.

---

## Inhalt

1. [APK herunterladen](#apk-herunterladen)
2. [Projektaufbau](#projektaufbau)
3. [Regeln für jede Sitzung](#regeln-für-jede-sitzung)
4. [Ehrliche Bestandsaufnahme](#ehrliche-bestandsaufnahme)
5. [Leitbild: nah an Hearthstone, aber eigenständig](#leitbild-nah-an-hearthstone-aber-eigenständig)
6. [Qualitätsziele](#qualitätsziele)
7. [Arbeitsplan](#arbeitsplan)
   - [Phase 0 – Sofortkorrekturen und Umbenennung](#phase-0--sofortkorrekturen-und-umbenennung-s)
   - [Phase 1 – Neue Optik mit gemalten Grafiken](#phase-1--neue-optik-mit-gemalten-grafiken-höchste-priorität-l)
   - [Phase 2 – Technisches Fundament](#phase-2--technisches-fundament-l)
   - [Phase 3 – Game Feel im Match](#phase-3--game-feel-im-match-l)
   - [Phase 4 – Klang, Stimmen und Haptik](#phase-4--klang-stimmen-und-haptik-m)
   - [Phase 5 – Regeln, Karten und Balance](#phase-5--regeln-karten-und-balance-l)
   - [Phase 6 – Spielmodi und Motivation](#phase-6--spielmodi-und-motivation-fortlaufend)
   - [Phase 7 – Release-Qualität](#phase-7--release-qualität-m)
8. [Weitere Ideen](#weitere-ideen)
9. [Deine Ideensammlung – wo sie im Plan steht](#deine-ideensammlung--wo-sie-im-plan-steht)
10. [Offene Entscheidungen](#offene-entscheidungen)
11. [Empfohlene Reihenfolge der Sitzungen](#empfohlene-reihenfolge-der-sitzungen)
12. [Vorschlag für die nächste Sitzung](#vorschlag-für-die-nächste-sitzung)

---

## APK herunterladen

Jeder Push baut automatisch eine signierte Test-APK (`.github/workflows/apk.yml`).

1. Im Repo auf **Actions** gehen und den obersten grünen Lauf **„Test-APK bauen“** auf `main` öffnen.
2. Unten unter **Artifacts** auf `Aeterna-<Version>-Test-APK` tippen. (Das Artefakt „Sichtpruefung“ daneben
   enthält die Screenshots des Klickpfads.)
3. Die ZIP-Datei entpacken – darin liegt die APK.

Umstieg von 1.2.2 (anderer Signaturschlüssel): In der alten App *Einstellungen → Spielstand
exportieren*, alte App deinstallieren, neue installieren, *Spielstand importieren*. Ab 1.3.0
installieren sich neue Versionen direkt als Update (z. B. 1.10.0 → 1.11.0: einfach die neue APK installieren; eine
laufende Partie läuft mit den neuen Regeln weiter, die neuen Karten stehen in der Sammlung auf 0, Decks bleiben gültig,
die sechs neuen Helden bekommen ihr Basisdeck).

**Codes** (*Einstellungen → Code einlösen*, je Spielstand einmal, Groß-/Kleinschreibung egal; Liste in
`model/profile.js`, `CHP.codes`):

| Code | Belohnung |
|---|---|
| `AETERNA` | 500 Gold |
| `KARTENPAKETE` | 10 Kartenpakete – im Basar mit „Alle öffnen“ auf einmal aufdecken (bis zu 50) |
| `ZEITALTER` | 1 000 Staub |
| `CHRONIK` | jede Karte in voller Zahl (zwei, Legendäre eine) – zum Ausprobieren aller 350 Karten |

---

## Projektaufbau

Das Spiel ist eine Web-App (HTML/CSS/JavaScript) in einer Android-WebView. Menüs sind DOM,
das Match wird auf ein Canvas (1600 × 800) gezeichnet. Seit 1.5.0 ist der Code nach **MVVM**
(Model – View – ViewModel) gegliedert, ein Ordner je Schicht unter `quellcode/assets/game/`:

| Pfad | Schicht | Inhalt |
|---|---|---|
| `core/mvvm.js` | Kern | Kleiner eigener Binder (`AEM`, ~5 KB, offline): beobachtbare ViewModels, DOM-Abgleich statt `innerHTML`-Neuaufbau, Befehle über `data-cmd`, maskierendes `html`-Template |
| `model/data.js` | Model | 22 Helden mit Heldenfähigkeit als Daten (`ability`: Effekte und Ziel), Zeitalter (`age`, Liste `CHD.ages` mit Farbe und Zeichen) und KI-Persönlichkeit (`ai`, `CHD.personalities`), 350 Karten (davon 42 Zeitalterkarten), Spielsteine (Tokens), 22 Missionen, Glossar; `CHD.missingArt` kennzeichnet Karten ohne Motiv, `CHD.playable(karte, held)` sagt, ob ein Deck des Helden sie enthalten darf, `CHD.owner`/`CHD.eraOf` nennen Held, Zeitalter oder „Neutral“ |
| `model/lore.js` | Model | Chronik der Helden (AP 5.9, 22 Seiten): Lebensdaten, Biografie, Zitat mit Quelle, Spielstil, Beziehungen (`AELORE`) |
| `model/engine.js` | Model | Regel-Engine und KI (`CHE`); `E.copy` ist die schnelle Zustandskopie der KI-Vorausschau |
| `model/profile.js` | Model | Spielstand-Regeln, Packs (auch mehrere auf einmal, `openPacks`), Codes (`codes`, `redeem`), Aufgaben, Import-Prüfung (`CHP`) |
| `model/cosmetics.js` | Model | Kosmetik-Katalog, Kaufen/Ausrüsten (`CHK`) |
| `model/store.js` | Model | Laden, Speichern, Sicherung, Export/Import des Spielstands (`AES`); meldet Änderungen |
| `viewmodel/*.js` | ViewModel | Zustand und Befehle je Bildschirm (`AEVM`): `menu`, `setup`, `campaign`, `collection`, `shop` (Basar), `packs` (Pack öffnen), `match`, `dialogs`, dazu `base` und `chronicle` – **ohne DOM, in Node testbar** |
| `view/kit.js` | View | Gemeinsame Bausteine, je einmal: Steinknopf, Panel, Reiter, Wallet, Kopfleiste, Modal (`AEV`) |
| `view/*.js` | View | Vorlagen je Bildschirm und Dialog (`shop`, `packs`, `collection`, `setup`, `dialogs`), Hauptmenü `hall.js` (`CHH`), Steinplatten-Übergang und Kartenrücken `stone.js` (`CHS`) |
| `view/match/` | View | Match-Canvas: `render.js` (`CHR`), `motion.js` (`CHM`), `layout.js` (`CHL`), `board.js` (Gesten → ViewModel, Bildschleife) |
| `view/css/` | View | `style.css`, `packs.css`, `stone.css`, `hall.css` (Schriften, Farbvariablen `--ae-…`), `kit.css` |
| `service/` | Dienste | `audio.js` (Web-Audio-Mischer, `CHA`), `platform.js` (Android-Brücke, `AEP`) |
| `app.js` | Shell | Steckt alles zusammen: Store, ViewModels, Views, Navigation mit Übergängen, Dialoge, Toasts; `window.App` für die Hülle. Auf Bildschirmen breiter als 2:1 wird die Bühne um zwei Flügel (`--wing`) breiter: Untermenüs und Dialoge reichen randlos bis an den Rand, Inhalte bleiben im mittleren 1600 × 800-Bereich |
| `assets/fonts/` | – | Cinzel, Cinzel Decorative, Alegreya Sans (SIL OFL, Lizenztexte daneben) |

| Pfad | Inhalt |
|---|---|
| `quellcode/` | Kompletter APK-Inhalt. `classes.dex` ist die **kompilierte** native Hülle (kein Java-Quelltext vorhanden). |
| `werkzeuge/` | APK-Build und -Signatur, Manifest (Version, App-Name), Hauptmenü-Bild, Sound-Generator, Sichtprüfung, Klickpfad mit Referenzbildern (`referenz/`), Balance-Werkzeug `balance.js`, Liste fehlender Motive `motive.js`, Tests – siehe `werkzeuge/LIESMICH.md` |
| `balance/` | Balance-Berichte: `BERICHT.md` (aktueller Stand, 22 Helden, 350 Karten), `BERICHT-1.10.0.md` (vor AP 5.10 Welle 2, 16 Helden), `BERICHT-1.9.0.md` (vor AP 5.11), `BERICHT-1.8.0.md` (vor AP 5.10, 10 Helden), `BERICHT-1.7.0.md` (vor AP 5.4 Teil 2), `BERICHT-1.6.0.md` (vor AP 5.3/5.4), `BERICHT-1.5.0.md` (vor AP 5.2) |
| `stil/` | Stil-Bibel (`STILBIBEL.md`), Stil-Tafel und Vergleichsbild Konzept ↔ Umsetzung |
| `ungenutzte_assets/` | Ausgangsbilder; `ui/hauptmenue-konzept.jpg` ist das Konzeptbild des Hauptmenüs; `MOTIVE.md` listet alle fehlenden Motive mit fertigem Prompt (AP 5.12) |

### Architektur: wohin neuer Code gehört (MVVM)

- **Model** kennt keine Bildschirme: Regeln, Daten, Spielstand. Änderungen am Spielstand laufen über die
  Regeln in `model/` und enden mit `store.commit()` (speichert und meldet allen, die zuhören).
- **ViewModel** hält den Bildschirmzustand (Reiter, Filter, Auswahl) und die Befehle (`buy`, `equip`, `filter` …).
  Es liest und ändert das Model, fasst aber **nie das DOM** an. Was es von der Oberfläche braucht (Navigation,
  Dialog, Toast, Klang, Vibration), bekommt es über den `ui`-Dienst der Shell – in Tests ersetzt durch eine Attrappe.
- **View** ist eine Funktion `render(vm) → HTML` und ändert nie das Model. Eingaben werden zu Befehlen:
  `data-cmd="buy" data-a="boards" data-b="japan"` ruft `vm.buy('boards','japan')`, `data-input`/`data-change`
  für Felder. Listen bekommen `data-key`, damit Einträge ihre Knoten behalten.
- **Binder** (`core/mvvm.js`): Nach jeder Änderung rendert die View neu und der Binder gleicht nur die
  Unterschiede ins DOM ab – Bilder werden nicht neu geladen, Scrollpositionen, Fokus und CSS-Übergänge bleiben.
  `data-static` schützt Teilbäume (Canvas), `data-own` überlässt einzelne Attribute der Animation der View.
- Das Match-Canvas zeichnet jedes Bild aus `vm.view` (Auswahl, Ziele, Ziehen); `view/match/board.js` liefert dem
  ViewModel nur Geometrie (Hand, Ablagezone, Platz), die Regeln entscheidet das ViewModel.

Native Brücke (`window.Android`): `save`, `load`, `exportSave`, `importSave`, `haptic(0|1)`,
`exitApp`; die Hülle ruft `App.back()`, `App.importText()`, `App.onPause()` und `App.onResume()` auf.
Inhalte werden unter `https://chroniken.local/` ausgeliefert (Unterordner gehen, Pfade mit `..` nicht);
die Hülle kennt nur die Endungen `.html .js .css .png .ogg .ttf .json`.

**Bereits vorhandene Spielmechanik** (damit nichts doppelt gebaut wird): Mana 1 → 10,
Startkarten-Tausch, Münze für den zweiten Spieler („Gunst der Stunde“, 0 Mana, +2 Mana in diesem Zug),
Handlimit 10 mit Verbrennen, steigende Erschöpfung bei leerem Deck, Aufmarsch-Verzögerung,
höchstens 7 Diener pro Seite, kein Zugtimer, Schildwall, Göttliche Gunst, Einmarsch, Vermächtnis,
Sturmangriff, Waffen, Rüstung, Runensteine (Engine-IDs `totem_*`), KI-Gegner. Seit 1.7.0 außerdem Vorstoß, Starre, Ergründen (offene Wahl
`s.choice`, Aktion `choose`), Doppelschlag, Arkaner Fokus, Bauwerke (`building`), Auren, Kostenänderungen je Handkarte
(`E.cost`) und Übernahme feindlicher Diener. Seit 1.8.0 Plünderung (`plunder`), Tarnung (`stealth`), Bannung (Effekt
`silence`, Feld `silenced`), Tödliches Gift (`poison`) und Belastung (`overload`, gesperrte Kristalle `locked`).
Seit 1.9.0 (AP 5.10) **Heldenfähigkeiten als Daten** (`hero.ability`: dieselben Effekte wie Karten; Bedingungen wie Platz
zum Rufen leitet `E.canPower` aus den Effekten ab – ein neuer Held braucht keinen Code), Bauwerke und Diener mit
Auslösern `start`/`end` (Zugbeginn/-ende), `onHeal`/`allyHeal` (Heilung), Auren `buffAura` und `buildingDiscount`, neue
Effekte `fortify`, `bounce`, `destroy`, `randomDamage`, `grant`/`grantAll`/`grantRandom`, `buffSelf`/`buffRandom`,
`enemyOverload`, Ergründen aus Bauwerken (`pool:'building'`) und Missionen mit Bossfähigkeit als Daten (`effects`, `every`).
Seit 1.10.0 (AP 5.5, 5.8, 5.11) **Zeitalterkarten** (`hero` und `age` = Zeitalter, nur für Helden dieses Zeitalters),
Auslöser `onDamage` (Schaden erlitten) und `anyDeath` (irgendein Diener stirbt), Auren `spellDiscount`, `healDouble`,
`doubleDeath` (Vermächtnis zweimal) und `wall` (Große Mauer), Kosten je gespielter Karte (`costPerPlayed`), Ergründen aus
den Pools `hero`, `age` und `ages`, eine **KI-Persönlichkeit** je Held (`ai`: aggressiv, defensiv, kombinierend; Gewichte
`E.STYLE`) und eine Bauwerk-Bewertung nach Wirkung (`E.impact`: wirkungslose ignoriert die KI, wirksame belagert sie).
Seit 1.11.0 (AP 5.10 Welle 2) der **Diener ganz links** (`buffLeft`, Epaminondas), Bedingungen nach Zahl der eigenen Diener
(`ifMinions`), verliehener Vorstoß, der frische Diener sofort angreifen lässt (Baibars), zufällige Starre und Ziele nur in
Starre (`targetFrozen`, Fabius), Schaden je Schildwall-Diener und Auren nur für Schildwall (Žižka), Wachstum je eigenem
Diener (`per:'minion'`) und **Ergründen aus dem eigenen Deck** (`pool:'deck'`: die obersten drei Karten, Fu Hao).
Die Schlüsselwörter erklärt das Glossar `CHD.keywords`.

---

## Regeln für jede Sitzung

- **Tests vor jedem Push:** `node --test werkzeuge/tests/*.test.js` (Kosmetik, Spielstand, ViewModels, Regeln und
  Heldenfähigkeiten, Schlüsselwörter Teil 1 und 2, Legendäre, Platzhalter, Chronik, neue Helden beider Wellen, Kartenwelle mit Bauwerken und KI-Persönlichkeit, Massenöffnung und Codes, Balance-Werkzeug, 100 simulierte Partien) und `node werkzeuge/klickpfad.js` (Klickpfad mit
  Referenzbildern, läuft auch in der CI).
- **CI muss grün sein** (Jobs „apk“, „sichtpruefung“ und „balance“), die APK kommt aus Actions – keine gebauten APKs/ZIPs ins Repo.
- **MVVM einhalten:** Regeln und Spielstand in `model/`, Bildschirmzustand und Befehle in `viewmodel/` (ohne DOM,
  mit Test in `werkzeuge/tests/viewmodel.test.js`), Markup in `view/` (ohne Spiellogik), gemeinsame Bausteine aus
  `view/kit.js` statt eigener Knöpfe und Fenster. Kein `innerHTML`-Neuaufbau ganzer Bildschirme, kein `onclick="App…"`.
- **Spielstände bleiben kompatibel:** Neue Felder immer über eine `normalize`-Funktion ergänzen
  (Muster: `CHK.normalize`), alte Saves dürfen nie verloren gehen. Interne Schlüssel wie
  `chroniken.profile` bleiben trotz Umbenennung bestehen.
- **Regeländerungen nur bewusst:** `data.js`/`engine.js` nur in Arbeitspaketen anfassen, die das
  ausdrücklich vorsehen (Phase 5), und dann mit neuen Tests und vollem Balance-Lauf `node werkzeuge/balance.js`
  (mit 22 Helden und 350 Karten ≈ 30 min auf 4 Kernen; `balance/BERICHT.md` mit committen, Ziele aus AP 5.2 und AP 5.3 halten). Varianten erst ohne Änderung am Spiel
  vergleichen: Kopie von `model/` anlegen und `AETERNA_MODELL=<Ordner> node werkzeuge/balance.js --partien 40`.
- **Sichtprüfung:** Jede optische Änderung per Playwright-Screenshot im Handyformat
  (915 × 412, Pixeldichte 2,6) und im Tabletformat (1600 × 800) prüfen –
  `node werkzeuge/sichtpruefung.js` liefert beides plus Messwerte (`sichtpruefung/`, nicht im Repo).
  Gewollte optische Änderungen: `node werkzeuge/klickpfad.js --referenz`, die neuen Bilder in
  `werkzeuge/referenz/` ansehen und mit committen – sonst schlägt die CI zu Recht fehl.
- **Neue Karten oder Helden ohne Motiv:** `art` weglassen (Platzhalter, AP 5.12) und `node werkzeuge/motive.js`
  ausführen – der Test prüft, dass `ungenutzte_assets/MOTIVE.md` jede Karte ohne Motiv nennt. Neue Karten-IDs nur
  hinten anhängen, nie bestehende umnummerieren (Spielstände).
- **Stil:** Neue Oberflächen folgen `stil/STILBIBEL.md` (Palette als `--ae-…`-Variablen in `view/css/hall.css`).
- **Signatur und Paket-ID:** Immer mit `werkzeuge/signatur/chroniken-test.p12` signieren, Paket-ID
  `de.chroniken.helden.layout` nie ändern – sonst gehen Updates nicht.
- **Lizenzen:** Nur eigene, generierte oder klar lizenzfreie Assets (CC0/OFL/MIT), Quelle in der Credits-Liste notieren.
- **Effort-Empfehlung:** Der [Vorschlag für die nächste Sitzung](#vorschlag-für-die-nächste-sitzung) endet immer mit
  dem empfohlenen Effort (low, medium, high, xhigh oder max) für den nächsten Prompt.

---

## Ehrliche Bestandsaufnahme

Warum sich das Spiel im Moment „billig“ und nicht flüssig genug anfühlt – mit Belegen aus dem Code.

### Optik – das Hauptproblem

1. **Die Grafik ist mit Code gezeichnet, nicht gemalt.** Hauptmenü, Steinplatten, Medaillons, Reiter und
   Basar bestehen aus Rechtecken, Kreisen, Verläufen und Konturlinien (`stone.js`, `stone.css`). Das
   ergibt bestenfalls Clipart-Niveau und wirkt primitiv – daran ändert auch Feinschliff nichts.
   Hochwertige Spiele nutzen **gemalte Texturen**: Stein mit Poren, Kanten, Abrieb, Schmutz in den Fugen,
   Metall mit Glanzlichtern, Edelsteine mit Lichtbrechung, weiche Umgebungsschatten.
   *Stand 1.4.0:* Das Hauptmenü ist jetzt das gemalte Konzeptbild; Basar, Sammlung, Heldenwahl und Spielbrett folgen (AP 1.4–1.8).
2. **Kein einheitlicher Stil.** Gemalte, fast realistische Kartenmotive und Spielfelder treffen auf flache
   Vektorflächen im Hauptmenü und generische Web-Oberflächen (dunkle Kästen, Standardknöpfe) in Basar,
   Sammlung und Heldenwahl.
3. **Keine Tiefe und kein Licht.** Es gibt keine Lichtquelle, keine Schatten zwischen den Ebenen, keine
   Glanzlichter und keine Bewegung im Bild. Alles liegt platt auf einer Ebene.
4. **Typografie ohne Charakter.** Fließtext nutzt DejaVu Sans, es fehlt eine markante Display-Schrift.
   *Stand 1.4.0:* Cinzel, Cinzel Decorative und Alegreya Sans sind eingebunden und im Hauptmenü und Ladebildschirm im Einsatz.
5. **Basar wie ein Webshop.** Raster aus Kästen statt Inszenierung (kein Podest, kein Licht, keine Kaufanimation).
6. **Karten werden prozedural gezeichnet** (`R.card` in `render.js`): Verläufe und Ellipsen statt gemalter Rahmen.
7. ~~**Sichtbarer Fehler:** Die goldene Platte „Partie fortsetzen“ ist zu schmal für ihren Text.~~ Behoben mit AP 1.3.

**Was Code leisten kann und was Bilder leisten müssen:** Code übernimmt Anordnung, Animation,
Lichteffekte darüber, Partikel, Text und Zustände (gedrückt, gesperrt). Material, Oberfläche,
Ornamente und Charakter müssen aus gemalten Bildern kommen.

### Karten und Balance

1. ~~**Die Legendären sind belanglos.** Alle 12 folgen demselben Muster: großer Körper für 7–9 Mana plus
   ein einfacher Kampfschrei oder ein Schlüsselwort. Keine verändert eine Regel, mehrere sind fast identisch.~~
   *Behoben in 1.7.0 (AP 5.3):* Jede Legendäre hat eine eigene Regel (Aura, Duell, Übernahme, Ergründen,
   Bauwerk …), alle zwölf liegen „gewinnt, wenn gezogen“ nah an ihrem Helden. Legendäre Zauber und Waffen fehlen noch.
2. **Kleines, gleichförmiges Set.** 1.6.0: 60 Basis-, 28 gewöhnliche, 26 seltene, 14 epische, 12 legendäre Karten;
   je Held 10 eigene, 40 neutrale. *Stand 1.11.0:* 350 Karten, 22 Helden mit je 10–14 eigenen Karten, dazu 42 Zeitalterkarten für sechs Zeitalter. Bis 1.6.0 nur fünf Schlüsselwörter (Schildwall 22×, Einmarsch 27×, Göttliche Gunst
   15×, Vermächtnis 13×, Sturmangriff 11×); seit 1.7.0 dazu Vorstoß, Starre, Ergründen, Doppelschlag, Arkaner Fokus und
   ein erstes Bauwerk – die Karten dazu sind noch wenige (AP 5.11).
3. ~~**Schlüsselwörter tragen die deutschen Hearthstone-Namen.** Das verstärkt den Eindruck einer Kopie.~~
   *Behoben in 1.7.0 (AP 5.4):* Schildwall, Göttliche Gunst, Einmarsch, Vermächtnis, Sturmangriff, Gunst der Stunde.
4. ~~**Heldenbalance ist ungeprüft.** Es gibt bisher keine Messung der Siegquoten je Held oder Paarung.~~
   *Gemessen und ausgeglichen in 1.6.0 (AP 5.1, AP 5.2):* Mit Startdecks lagen die Helden zwischen 15 % (Leonidas)
   und 80 % (Hypatia), jetzt alle zwischen 47,8 und 51,9 %.

### Flüssigkeit und Technik

1. **Ungleichmäßige Bildrate auf 90/120-Hz-Displays.** Die Zeichenschleife überspringt Frames
   (`now-lastFrame>=15` in `app.js`). Bei 90 Hz wechseln sich 11- und 22-ms-Abstände ab → Ruckeln.
2. **Teure Effekte pro Frame.** `render.js` nutzt 23-mal `shadowBlur` und erzeugt Verläufe neu, statt
   sie zwischenzuspeichern – auf schwächeren Handys der größte Bremsklotz.
3. ~~**Menüs werden komplett neu aufgebaut.** 16 Stellen ersetzen ganze Bildschirme per `innerHTML`.
   Folgen: CSS-Übergänge sind unmöglich, Bilder flackern, die Scrollposition springt zurück (z. B. nach
   einem Kauf im Basar).~~ *Behoben in 1.5.0 (AP 2.3):* Views werden per Abgleich aktualisiert; nach einem Kauf
   bleiben Scrollposition, Reiter und alle Bilder (gemessen: 0 statt 51 neu erzeugte Elemente).
4. **Lange Ladezeit, großes APK.** Alle 29 Bilder (51 MB, Heldenatlanten je 3–3,4 MB PNG) werden vor
   dem Hauptmenü geladen und dekodiert. APK ≈ 53 MB.
5. **Animationen ohne Persönlichkeit.** Bewegungen haben kaum Ausholen, Nachschwingen, Gewicht oder
   Treffer-Stopp. Gezogene Karten fliegen sofort aufgedeckt aus dem Deck, Diener verschwinden beim Tod
   fast ohne Effekt.
6. **Native Hülle nur kompiliert.** Ohne Quelltext sind Verbesserungen wie echte Vibrationsmuster,
   Vollbild, Splash-Screen, 120 Hz, WebP-Unterstützung oder eine saubere Versionierung kaum möglich.
7. **Audio ungeprüft und dünn.** Die Steingeräusche wurden synthetisch erzeugt und nie auf einem Gerät
   angehört; die Musik ist eine prozedurale Eigenkomposition; Diener haben keine eigenen Stimmen oder Laute.
8. *Nebenpunkt:* Das Match-Canvas (1600 × 800) wird auf Handys hochskaliert (`devicePixelRatio` fehlt).

### Was schon gut ist

Regel-Engine und KI laufen stabil (100 simulierte Partien), die Spielstand-Prüfung ist robust,
die Kartenmotive sind stark, Packöffnung und Basar-Logik funktionieren, die Grundstruktur der
Navigation steht – und mit `ungenutzte_assets/ui/hauptmenue-konzept.jpg` gibt es jetzt ein
gemaltes Zielbild für das Hauptmenü.

---

## Leitbild: nah an Hearthstone, aber eigenständig

**Übernehmen (Prinzipien, nicht Gestaltung):**
- Jede Aktion hat **Gewicht**: Anheben → Schweben → Einschlag → Nachwirkung (Staub, Risse, Klang).
- **Klarheit vor Effekt:** Was spielbar ist, leuchtet; was passiert, ist eindeutig lesbar.
- **Alles reagiert auf Berührung:** Kein Element bleibt stumm, wenn man es antippt.
- **Jede Karte hat eine Stimme:** Auftritt, Angriff und Tod klingen unverwechselbar.
- **Belohnungen werden inszeniert**, nicht nur verbucht.

**Bewusst vermeiden:** Blizzard-Namen und -Symbole (Spirale), die Schrift Belwe, die deutschen
Hearthstone-Schlüsselwörter (in 1.7.0 ersetzt), das Brennseil als Zugtimer, Original-Sounds,
1:1 nachgebaute Bildschirme und Kartenrahmen.

**Eigene Identität – „Die lebendige Chronik“:**
- Material: heller Kalkstein, poliertes dunkles Holz, Bronze, Blattgold, Lapislazuli-Akzente; Licht fällt warm.
- Das Spielfeld ist ein **Feldherrentisch** mit eingeritzter Weltkarte; Diener werden auf dem Feld zu
  **Truppensiegel-Plaketten**, Helden sind gemeißelte Münzen oder Gemmen.
- Der **„Chronist der Zeiten“** ist die Erzählerstimme; die Schlacht wird als Chronik mitgeschrieben.
- Tote Einheiten zerbrechen zu **Gesteinssplittern**, Zug beenden ist ein **bronzenes Chronometer**,
  Zeitdruck gibt es nur in Belagerungsmissionen als **glühende Lunte**.
- Jede Epoche bringt ihren Klang, ihre Bildsprache und ihre **eigene Spielfeldhälfte** mit.

---

## Qualitätsziele

| Bereich | Ziel | Stand 1.11.0 (gemessen; Menü- und Bildwerte aus 1.9.0, das Hauptmenü ist unverändert) |
|---|---|---|
| Gestaltung | Jeder Bildschirm besteht aus gemalten Assets nach der Stil-Bibel; Freigabe durch dich vor dem Einbau | Hauptmenü und Ladebildschirm ✓ (freigegeben, Blitz und Seitenränder nach deiner Rückmeldung zu 1.6.0 überarbeitet, Stern nach deiner Rückmeldung zu 1.8.0 leiser); übrige Bildschirme noch alt, Bausteine warten auf gemalte Grafiken |
| Bildrate im Match | stabil 60 fps (95 % der Frames < 16,7 ms) auf einem Mittelklasse-Handy, z. B. Galaxy A54 | Match noch nicht gemessen (AP 2.4). Hauptmenü mit Partikeln im Ruhezustand: 95 % ≤ 16,8 ms, 0 von 181 Bildern > 20 ms, auch bei 4× gedrosselter CPU (1.8.0: 0–4; weniger Glitzer am Stern)¹ |
| Touch-Reaktion | sichtbare Reaktion < 50 ms nach Berührung | Hauptmenü: 6 ms, mit 4× gedrosselter CPU 23 ms¹; Kauf im Basar ohne Ruckler (längstes Bild 16 ms bei 4× CPU) |
| Menüwechsel | ≤ 600 ms, unterbrechbar | vom Hauptmenü: 561 ms (4× CPU: 584 ms), neuer Bildschirm ab 401 ms; zurück ins Menü 328 ms (4× CPU: 362 ms)¹ – nicht unterbrechbar (1.8.0: 525–549 ms) |
| Oberfläche | keine Komplett-Neuaufbauten, Scrollposition und Fokus bleiben | ✓ alle Bildschirme und Dialoge über den MVVM-Binder (AP 2.3), geprüft im Klickpfad der CI |
| Start bis Hauptmenü | < 2,5 s (kalt), < 1 s (warm) | auf dem Gerät noch nicht gemessen; Desktop-Chromium mit lokalem Server 0,5 s (nicht aussagekräftig) |
| APK-Größe | < 25 MB | 55,9 MB (1.3.0: 55,2 MB; Hauptmenü-Bild 0,48 MB, Schriften 0,29 MB) |
| Heldenbalance | jeder Held 47–53 % Siegquote gegen das Feld (Simulation, ≥ 200 Partien je Paarung) | **22 Helden, 350 Karten** (1.11.0, 101 200 Partien): Startdecks 46,6–53,9 % (20 von 22: Musashi 53,9 %, Žižka 46,6 %), Zufallsdecks 46,5–52,8 % (21 von 22: Hypatia 46,5 %) – alle Abweichungen ≤ 0,9 Punkte, im Zufallsfehler ±1,5; die sechs neuen Helden 46,6–50,7 % bzw. 48,9–52,8 %. Paarungen 201 bzw. 227 von 231 innerhalb 40/60 – Ausreißer vor allem mit Startdecks: Khan – Fu Hao 69/31, Khan – Mandukhai 68/32, Fu Hao – Imhotep 66,5/33,5, Leonidas – Fabius und Nezahualcóyotl – Žižka je 65,5/34,5; mit Zufallsdecks Fabius – Perikles 65/35. Beginner gewinnt 46,2 / 50,9 % (1.10.0 mit 16 Helden: 47,6–52,7 % bzw. 47,6–53,2 %, 114/119 von 120 Paarungen; 1.9.0: 47,6–51,7 % bzw. 47,6–52,8 %; 1.6.0: 47,8–51,9 % bzw. 47,9–51,6 %; 1.5.0: 15,4–80,2 % bzw. 42,1–57,6 %)² |
| Legendäre | jede Legendäre hat einen einzigartigen Effekt, der eine Partie sichtbar verändert; als Gruppe ≤ 55 % „gewinnt, wenn gezogen“ | ✓ 24 Legendäre mit eigener Regel (12 aus AP 5.3, 12 aus AP 5.10, darunter zwei legendäre Zauber); Gruppe 52,8 % (1.10.0: 52,9 %), einzeln 43,4 (Nezahualpilli) bis 57,7 % (Lagertha); die sechs neuen 46,5 (Marcellus) bis 56,4 % (Qalawun)² |
| Karten (AP 5.11) | keine Karte über 60 % „gewinnt, wenn gezogen“ | knapp verfehlt: 347 von 350 Karten unter 60 %, darüber Goldener Reiter (Khan) 60,9 %, Botin der Stämme 60,5 % und Kämpfer der Heiligen Schar 60,4 % – im Zufallsfehler, aber für Sitzung 10 notiert; die 81 neuen 38,3 (Wagenburg am Vítkov) bis 60,5 %² |

¹ Playwright-Emulation im Handyformat (915 × 412, Pixeldichte 2,6), `node werkzeuge/sichtpruefung.js` und
`node werkzeuge/klickpfad.js`; Werte auf einem echten Handy können abweichen.

² KI gegen KI, `node werkzeuge/balance.js` (200 Partien je Paarung, Startwert 20261006), Bericht
[`balance/BERICHT.md`](balance/BERICHT.md). Zufallsfehler (95 %): ±1,5 Punkte je Held (21 Gegner), ±6,9 je Paarung. Der volle Lauf dauert mit 22 Helden und 350 Karten 27 min auf 4 Kernen.

---

## Arbeitsplan

Größen: **S** = eine Sitzung, **M** = zwei Sitzungen, **L** = drei oder mehr.
Jedes Arbeitspaket (AP) hat Abnahmekriterien; abhaken, wenn erfüllt.

### Phase 0 – Sofortkorrekturen und Umbenennung (S)

**AP 0.1 – Sichtbare Fehler beheben**
- [x] ~~Goldene Platte „Partie fortsetzen“: Text passt nicht (`renderMenu` in `app.js`, `.plaque.gold` in `stone.css`).~~
  Entfallen durch AP 1.3: „Partie fortsetzen“ steht auf der vierten Platte, lange Inschriften verkleinern sich automatisch.
- [x] Basar: Scrollposition und aktiven Reiter nach Kaufen/Ausrüsten erhalten. *Fällt mit AP 2.3 ab: Der Basar
  (`viewmodel/shop.js`, `view/shop.js`) wird nach einem Kauf nur noch abgeglichen; das Regal ist je Reiter verschlüsselt
  (Reiterwechsel beginnt oben, Kauf und Ausrüsten behalten die Position).*
- Abnahme: Screenshots im Handy- und Tabletformat ohne Überläufe; im Basar kein Sprung nach einem Kauf.
  *Gemessen (Klickpfad, Reiter Schlachtfelder ganz unten, „Zen-Schiefer“ kaufen und ausrüsten):* Scrollposition
  1.4.0: 268 → **0**, 1.5.0: 268 → 268 → 268. Reiter bleibt in beiden Versionen. Screenshots `03`–`05` im Artefakt
  „Sichtpruefung“ der CI.

**AP 0.2 – Audio-Check auf dem Gerät**
- [ ] Steingeräusche (`stone`, `scrape`, `grind`, `slam`) auf dem Handy anhören, Lautstärken in `audio.js` angleichen, bei Bedarf ersetzen.

**AP 0.3 – Umbenennung in „Aeterna“**
- [x] Texte: Fenstertitel und Ladebildschirm (`index.html`), Titeltafel im Hauptmenü, „Über das Spiel“,
  Packtitel „CHRONIKEN“, Kartenrücken „Chroniken-Siegel“ → „Aeterna-Siegel“ (interne ID `chroniken` bleibt),
  Pack-Aufdeckbildschirm, Export-Dateiname im Browser (`Aeterna-Spielstand.json`). Auch der Import-Hinweis
  und die Kartenrücken-Beschriftung; die Version steht nur noch an einer Stelle (`VERSION` in `app.js`).
- [x] App-Name auf dem Homescreen: Manifest-Label „Chroniken 1.3.0“ → „Aeterna“. `werkzeuge/manifest_version.py`
  baut den String-Pool jetzt neu auf (beliebige Länge, `--label`); ohne Änderung ist das Ergebnis byte-identisch,
  `androguard` liest das neue Manifest fehlerfrei.
- [x] Version 1.4.0 / versionCode 7; Artefakt- und APK-Namen im Workflow auf `Aeterna-<Version>-Test`.
- [x] Bleibt bewusst gleich: Paket-ID, Speicher-Schlüssel, Server-Name `chroniken.local`, das In-Game-Konzept
  „Chronik“ (Spielverlauf, Chronist). Der native Standard-Dateiname beim Export ändert sich erst mit AP 2.1.
  Abgesichert durch `werkzeuge/tests/aeterna.test.js`.
- Abnahme: Auf dem Gerät heißt die App „Aeterna“, Update über 1.3.0 funktioniert, Spielstand bleibt.
  *Stand:* Manifest, Signatur (v2, gleicher Schlüssel) und Tests geprüft; **der manuelle Test auf deinem Handy war
  erfolgreich** (Rückmeldung zu Sitzung 2). ✓

### Phase 1 – Neue Optik mit gemalten Grafiken (höchste Priorität, L)

Grundsatz: **Erst Stil festlegen und von dir freigeben lassen, dann Grafiken erzeugen, dann einbauen.**
Kein Bildschirm wird mehr aus Code-Formen gezeichnet; `stone.js` dient danach nur noch für Animation und Effekte.

**AP 1.1 – Stil-Bibel (S)**
- [x] Ausgangspunkt ist das Konzeptbild `ungenutzte_assets/ui/hauptmenue-konzept.jpg`: Farben, Materialien,
  Lichtrichtung und Detailgrad daraus ableiten. *Die Farbwerte sind im Bild gemessen; abgeleitet sind nur Gravur- und Zustandsfarben.*
- [x] Datei `stil/STILBIBEL.md`: Farbpalette (Hex-Werte), Materialien (heller Kalkstein mit Poren und Abrieb,
  poliertes dunkles Holz, gealterte Bronze, Blattgold, Lapislazuli, Efeu), Licht, Konturstärken, Schriften,
  Icon-Stil, Bewegungssprache (Dauern, Easing-Kurven), Klangfarben je Epoche. Dazu die Übersicht
  [`stil/stiltafel.jpg`](stil/stiltafel.jpg) und die Palette als CSS-Variablen (`--ae-…` in `hall.css`).
- [x] Schriften (OFL, offline): **Cinzel Decorative** (Logo), **Cinzel** (Titel, Platten, Zahlen),
  **Alegreya Sans** Medium/Bold (Text) in `assets/fonts/` – zusammen 0,29 MB. Fira Sans bleibt Alternative.
- Abnahme: Du gibst die Stil-Bibel frei. *Stand:* **freigegeben** – manueller Test erfolgreich, keine Änderungswünsche
  außer dem Zahnrad im Hauptmenü (siehe AP 1.3). ✓

**AP 1.2 – Asset-Werkstatt: gemalte Grafiken erzeugen (M, fortlaufend)**

Die Grafiken entstehen außerhalb des Codes. Claude-Code-Sitzungen haben bisher kein Bildgenerierungs-Werkzeug,
die Bilder kommen deshalb von dir (z. B. Bild-KI wie beim Konzeptbild) oder werden zugekauft (Lizenz für
kommerzielle Mobile-Spiele prüfen) bzw. beauftragt.

Ablauf: das Konzeptbild als Stilreferenz anhängen, in doppelter Zielgröße erzeugen, transparenter Hintergrund
(oder einfarbig zum Freistellen), Upload nach `ungenutzte_assets/ui/`. Die nächste Sitzung stellt frei,
schneidet zu (9-Slice für Panels), optimiert und baut ein.

Gemeinsamer Prompt-Anfang:
*„Game UI asset for a mobile card game, hand-painted stylized fantasy-antique style, weathered light limestone
with fine pores, chipped edges, ivy and dust in the crevices, aged bronze and gold trim with soft specular
highlights, warm light, soft ambient occlusion, rich detail, clean readable silhouette, isolated on transparent
background, no text“* – passend zum Konzeptbild.

*Menü und Oberflächen*

| Asset | Größe (px) | Verwendung | Prompt-Zusatz |
|---|---|---|---|
| Hauptmenü in hoher Auflösung | 3840 × 2140 | Ersatz für das Konzeptbild (2000 × 1116) | dasselbe Bild hochskaliert/neu erzeugt, ohne Text |
| **Hintergrund Untermenüs und Dialoge, randlos** *(deine Rückmeldung zu 1.8.0: auf dem OnePlus 15 reichen die Menüs noch nicht ganz an den Rand)* | 4000 × 1600 | Basar, Sammlung, Heldenwahl, Kampagne, Dialog-Schleier; die Mitte (3200 × 1600) trägt die Inhalte, links und rechts je 400 px ruhige Fortsetzung für breite Handys, Kamera-Aussparung und 21:9 | „wide dark stone hall interior with bronze lamps, calm low-contrast centre for UI panels, the scene continues seamlessly to both far edges“ |
| Hauptmenü-Einzelteile | je nach Teil | Platten, Medaillons, Titeltafel, Goldanzeige, Zahnrad einzeln | „same element isolated on transparent background“ |
| Panel (9-Slice) | 768 × 768 | Fenster, Kacheln | „stone tablet frame with bronze corners, recessed darker centre“ |
| Reiter aktiv + inaktiv | 800 × 180 | Basar, Sammlung | „small carved stone tab with bronze trim; active version glowing gold“ |
| Präsentationspodest | 1200 × 900 | Basar-Vorschau | „round marble pedestal with soft spotlight“ |
| Siegesbanner / Niederlage | 1600 × 500 | Match-Ende | „unrolling victory banner, gold embroidery“ (Text per Code) |

*Karten*

| Asset | Größe (px) | Verwendung | Prompt-Zusatz |
|---|---|---|---|
| Kartenrahmen Diener / Zauber / Waffe / Bauwerk | 800 × 1128 | Handkarten | „card frame shaped like a temple gateway arch, name banner, empty art window“ |
| Seltenheits-Siegel | je 160 × 160 | Bronze (gewöhnlich), Silber (selten), Gold (episch), Himmels-Obsidian (legendär) | „archive wax seal in bronze / silver / gold / black obsidian with starlight“ |
| Lorbeerkranz | 900 × 500 | Rahmen legendärer Karten | „golden laurel wreath crowning a card frame“ |
| Werte-Symbole | je 160 × 160 | Ätherkristall (Kosten), gekreuzte Klingen (Angriff), Schild (Leben), Turm (Haltbarkeit) | „gem / crossed swords / round shield / small stone tower icon“ |
| Runensteine (Ragnar) | je 724 × 724 | Heilrune, Feuerrune, Schutzrune, Kraftrune – ersetzen das bisherige Totem-Motiv (Atlasfeld 10 von Ragnar) | „carved Norse rune stone glowing with a green healing / red fire / blue shield / golden strength rune, mossy, Viking age“ |
| Truppensiegel-Plakette | 600 × 700 | Diener auf dem Feld (oval), je Seltenheit | „oval medallion plaque with bronze rim, empty centre for portrait“ |
| Schlüsselwort-Rahmen | je 700 × 800 | Schildwall (Holz-/Bronzeschilde), Göttliche Gunst (Aurenkreis), Starre (Ketten/Reif), Tarnung (Unterholz-Schatten) | jeweils als Overlay |
| Kleine Marken | je 128 × 128 | Urne (Vermächtnis), Phiole (Gift), Doppelschlag, Plünderung | „small carved icon“ |

*Spielbrett und HUD*

| Asset | Größe (px) | Verwendung | Prompt-Zusatz |
|---|---|---|---|
| Halbe Spielfelder je Epoche | 10 × (3200 × 800) | Sparta, Alexandria, Ägypten, Venedig, Mongolei, Kelten, Renaissance, Frankreich, Wikinger, Japan | „half of a commander's war table, ancient stone and dark polished wood, carved world map, themed for …“ |
| Mittelnaht | 3200 × 120 | Übergang zwischen den Hälften | „bronze divider rail with engraved meander“ |
| Heldenmünze / Gemme | 800 × 800 | Heldenporträt oben/unten | „carved coin / cameo frame, bronze and stone“ |
| Herrschersiegel Vorder- und Rückseite | je 400 × 400 | Heldenfähigkeit (dreht sich nach Benutzung) | „embossed ruler's seal; back side grey stone“ |
| Phalanx-Schild | 300 × 300 | Rüstungsanzeige | „bronze phalanx shield“ |
| Waffenablage | 400 × 300 | Waffe links neben dem Helden | „stone weapon rest with bronze clamps“ |
| Äther-Runen aktiv + leer | je 160 × 160 | Ressourcen 1–10 unten rechts | „glowing ether rune / golden sun amulet“ |
| Chronometer | 700 × 700 | Zug beenden (zwei Zustände) | „bronze chronometer / hourglass mechanism“ |
| Versiegelte Befehle | 300 × 400 | verdeckte KI-Hand | „rolled order scroll with wax seal“ |
| Pergamentrollen-Stapel | 400 × 500 | Deck, Dicke nimmt ab | „stack of parchment scrolls“ |
| Stundenglas | 300 × 400 | Erschöpfung „Zahn der Zeit“ | „ancient hourglass, sand running out“ |
| Chronik-Leiste | 300 × 1600 | Spielverlauf am linken Rand | „vertical parchment strip with bronze holders“ |
| Eck-Dioramen | je 500 × 500 | vier Bildschirmecken | „burning incense burner / rotating astrolabe / crumbling marble column / miniature catapult“ |
| Bronzemünze | 400 × 400 | Münzwurf um den ersten Zug | „ancient bronze coin, two distinct faces“ |
| Wachsrolle | 200 × 260 | Hinterhalte über dem Helden | „sealed wax scroll“ |

- Abnahme: Grafiken liegen vor, passen sichtbar zum Konzeptbild, du hast sie freigegeben.

**AP 1.3 – Hauptmenü aus dem Konzeptbild (M)**

Das textfreie Konzeptbild ist als Grundlage geeignet. Umsetzung:
- [x] **Format:** Das Bild ist 2000 × 1116 (etwa 16:9), die Bühne 2:1. Auf Höhe skalieren und die Seiten
  (je ca. 80 px) mit horizontal gestreckten Randstreifen füllen – die Balken laufen waagerecht, das fällt kaum auf.
  Besser: höhere Auflösung oder Breitbild-Version des Bildes (AP 1.2).
  *Umgesetzt mit `werkzeuge/hauptmenue_bild.py`:* gestreckte Streifen schlierten sichtbar (Efeu, Zahnrad), deshalb
  oben 24 px und unten 8 px Wand abgeschnitten und die Seiten (je 84 px) gespiegelt fortgesetzt; das angeschnittene
  Zahnrad wird durch Drehung um seine Achse nahtlos ergänzt. Für Handys breiter als 2:1 reicht das Bild abgedunkelt
  bis 2,4:1 in die Seitenränder. Ergebnis 2602 × 1084, 0,45 MB.
- [x] **Bedienelemente aus dem Bild lösen:** Platten, Medaillons, Titeltafel, Goldanzeige und Zahnrad-Knauf
  als eigene Ebenen mit Masken entlang der Konturen (oder als gelieferte Einzelteile).
  *Umgesetzt als Ebenen mit `clip-path` über demselben Bild (keine Zusatzdateien), Geometrie im Konzeptbild
  vermessen (`PLATES`, `RAILS` in `hall.js`). Trefferflächen folgen Platte, Kreis und Balken.*
- [x] **Beschriftung per Code** im gemeißelten Stil: Titeltafel „AETERNA“ mit Unterzeile, die vier Platten,
  die vier Balken (Aufgaben, Basar, Sammlung, Kartenpakete), Goldzahl in der Anzeige.
- [x] **Vier Platten belegen:** Schlacht, Kampagne, Kolosseum und eine vierte (Vorschlag: „Partie fortsetzen“,
  wenn eine Partie läuft, sonst „Herausforderung“ – siehe Offene Entscheidungen).
  *Wie vorgeschlagen; „Herausforderung“ ist vorerst ein **Tagesduell**: feste Helden, Decks und Startwert pro
  Kalendertag (`CHP.daily`), die Platte nennt die Paarung des Tages. „Partie fortsetzen“ pulsiert golden.*
- [x] **Drücken:** Platte sinkt 6–8 px in eine dunkle Fuge, Medaillon drückt ein (Skalierung 0,94, Leuchtkranz in
  seiner Farbe), Balken leuchtet kurz auf, Zahnrad-Knauf dreht sich um 60°; dazu Steinklopfen und Vibration.
- [x] **Leben:** Lichtstrahlen von oben rechts (wie im Bild) pulsieren sanft, Funken und Staub schweben,
  der Stern im Schlussstein glüht, Glanzlauf über die Medaillons, Benachrichtigungs-Siegel (Aufgaben, Pakete).
- [x] **Mehr Leben (Nachtrag):** goldene Partikel auf einer Canvas-Ebene – Glut steigt durch den Saal, Staub
  treibt in den Lichtstrahlen, schwebende Lichtkugeln geben Tiefe, Glitzersterne funkeln am Schlussstein, zwei
  Kometen laufen auf der Goldlinie des Rings, jede Berührung wirft einen Funkenregen, beim Start sprüht der Stern.
  Ein Glanzlauf wandert im Leerlauf von Platte zu Platte (auch auf dem Handy sichtbar).
  **Hover** (Maus/Stift): Platten heben sich 3 px in einen Goldschein mit Glanzlauf, Medaillons schwellen an und
  leuchten in ihrer Farbe, Balken-Inschriften wachsen und glühen, Siegel wackeln, das Zahnrad dreht vor, der
  Mauszeiger zieht eine Funkenspur. Bei „Bewegung reduzieren“ entfällt alles.
- [x] **Auftritt beim Start:** Platten fahren nacheinander ein, Stern blitzt auf (≤ 700 ms, überspringbar).
  *Gemessen 700 ms; Antippen beendet den Auftritt, ohne einen Knopf auszulösen.*
- [x] **Menüwechsel:** Platte drückt → Lichtblitz aus dem Stern → Zoom in den Ring → neuer Bildschirm (≤ 600 ms).
  *Gemessen 524–526 ms; zurück ins Menü umgekehrt (Zoom aus dem Ring) in 333–338 ms. Wechsel zwischen anderen
  Bildschirmen behalten die Steinplatten.*
- [x] **Feinschliff nach deiner Rückmeldung (Sitzung 2):** Das Zahnrad oben rechts hatte eine Kerbe und darunter
  saß ein seltsamer Fleck auf der Wand. Ursache: Das im Konzeptbild angeschnittene Zahnrad wurde um 90° gedreht
  ergänzt – das sind 3,5 Zähne (14 Zähne, je ≈ 25,7°), also traf Zahn auf Lücke; die Wand darunter war an der
  Bildkante gespiegelt, das ergab symmetrische „Rorschach“-Flecken (links genauso, bei Efeu und Balken).
  *Neu in `werkzeuge/hauptmenue_bild.py`:* Speichenkranz um 2 × 45°, Zahnkranz um 4 Zähne gedreht (Winkel an der
  Bildkante gemessen), Zwischenräume zeigen die Wand mit Schlagschatten; die Wand wird je Steinlage **versetzt statt
  gespiegelt** fortgesetzt (die beste Quelle ist meist die gegenüberliegende Bildkante), der Mäanderfries läuft
  periodisch weiter, die Naht ist ein Schnitt geringster Abweichung mit Helligkeitsausgleich.
  Vorher/nachher: [`stil/zahnrad-vorher-nachher.jpg`](stil/zahnrad-vorher-nachher.jpg).
- [x] **Feinschliff nach deiner Rückmeldung zu 1.6.0:** *Lichtblitz zu hell, Rand der Menüs verschwommen.*
  Der Blitz beim Menüwechsel (oben Mitte, aus dem Stern) war ein weißer Kreis, der die ganze Bühne weiß überdeckte. Jetzt
  ein warmes Goldlicht: kleiner heller Kern, dann Gold und Bronze; die bedeckte Bühne leuchtet wie Lampenlicht statt
  zu blenden (`#ring-flash` in `hall.css`, auch der Auftrittsblitz des Sterns ist schwächer). Die Seitenränder auf Handys
  breiter als 2:1 waren gestreckte, weichgezeichnete Randspalten – daher das Verschwommene. `hauptmenue_bild.py` setzt
  die Wand dort jetzt genauso fort wie innerhalb der Bühne (Steinlage für Steinlage aus Originalpixeln, eigener
  Nahtschnitt, Zahnrad bleibt unberührt) und dunkelt sie nach außen nur sanft ab (88 → 66 %). Innerhalb der Bühne ist
  das Bild unverändert (gemessen: höchstens 4 Helligkeitsstufen JPEG-Rauschen, außer den 32 Spalten des Nahtstreifens).
  Geprüft im Handyformat (915 × 412 ist breiter als 2:1, die Ränder sind dort sichtbar) per Screenshot-Folge des Blitzes.
- [x] **Feinschliff nach deiner Rückmeldung zu 1.8.0:** *Der Effekt am Stern oben Mitte ist immer noch zu stark.* Das
  Sternglühen (`.hall-star` in `hall.css`) war eine 130-px-Scheibe mit fast deckend weißem Kern, die bis 95 % Deckkraft
  pulsierte und mit der Bühne auf dem Handy zur großen goldenen Kugel über dem Schlussstein wurde; dazu funkelten fast
  zwei Glitzersterne pro Sekunde. Jetzt: 84 px, warmer Kern ohne Weiß, pulsiert nur noch zwischen 30 und 55 %
  Deckkraft; Glitzer 0,5 pro Sekunde, kleiner und blasser; Auftrittsblitz und Startfunken schwächer. Bitte auf dem
  OnePlus 15 gegenprüfen – wenn er noch stört, kann er auch ganz weg.
- [ ] *Niedrige Priorität (deine Rückmeldung zu 1.8.0):* **Der linke Rand wirkt tot** und wird von Untermenüs nicht
  überdeckt – auf dem OnePlus 15 bleibt links ein dunkler Streifen (rechts nicht), vermutlich die Kamera-Aussparung,
  in die die WebView der alten Hülle nicht zeichnet. Stört laut dir nur wenig; Lösung mit AP 2.1 (Vollbild mit
  Display-Aussparung, `layoutInDisplayCutoutMode`) oder vorher mit dem randlosen Hintergrund aus AP 1.2.
- Abnahme: Screenshot neben dem Konzeptbild – gleiche Qualität; alle Knöpfe reagieren; du gibst frei.
  *Stand:* Vergleichsbild [`stil/vergleich-hauptmenue.jpg`](stil/vergleich-hauptmenue.jpg) (neu mit 1.5.0); alle
  acht Knöpfe und das Zahnrad per Playwright angetippt. **Freigegeben** (manueller Test erfolgreich), Zahnrad und
  Wand danach korrigiert. ✓

*Messwerte AP 1.3 (Handyformat, Emulation, `node werkzeuge/sichtpruefung.js`; Stand 1.5.0, das Menü läuft jetzt über
den MVVM-Binder – die Beschriftung der Platten wird nur noch einmal eingepasst, sonst kostete jeder Druck bei 4× CPU
6 ms Layout zusätzlich):*

| Messung | normal | CPU 4× gedrosselt |
|---|---|---|
| Berührung → sichtbare Reaktion | 6 ms | 20–29 ms |
| Menüwechsel: neuer Bildschirm unter dem Blitz / fertig | 365–366 / 525–526 ms | 379–389 / 541–549 ms |
| Zurück ins Hauptmenü | 329–333 ms | 356–364 ms |
| Auftritt beim Start | 700 ms | – |
| Bildzeit Handy im Ruhezustand mit Partikeln (95 %) | 16,7–16,8 ms, 0 von 181 > 20 ms | 16,7–16,8 ms, 1–2 von 180 > 20 ms |
| Bildzeit Tablet im Ruhezustand mit Partikeln | 57–59 Bilder/s, 95 % meist ≤ 16,8 ms, 3–14 von ~170 > 20 ms | – |

*Was die Messungen verändert haben:* Lichtstrahlen und Sternglühen nutzten `mix-blend-mode: screen`; das halbierte
im Tabletformat die Bildrate (31 Bilder/s, schon vor den Partikeln) und ist jetzt normale Transparenz. Die
Partikel-Canvas läuft 1:1, wenn die Bühne etwa in Originalgröße erscheint (Tablet), sonst mit 0,75 der
Bühnenauflösung (Handy), und pausiert während des Ring-Übergangs. In voller Auflösung kostete sie bei gedrosselter
CPU jedes fünfte Bild. Alle Werte stammen aus Desktop-Chromium ohne GPU; ein echtes Handy rechnet Canvas und
Ebenen auf der GPU und sollte eher besser liegen – bitte auf dem Gerät gegenprüfen.

*Bekannte Grenzen:* Das Bild hat nur 1116 px Höhe und wird auf Tablets mit hoher Pixeldichte hochskaliert;
die ergänzten 84 px je Seite sind aus dem Bild zusammengesetzt (seit 1.5.0 ohne Spiegelung). Beides löst eine
höher aufgelöste Breitbild-Fassung aus AP 1.2 – dann nur `hauptmenue_bild.py` neu ausführen.

**AP 1.4 – Basar 2.0 (M)**
- [ ] Schaufenster statt Raster: Auswahl links, großes Präsentationspodest rechts mit Licht.
- [ ] Kartenrücken drehen sich in 3D, Skins in der Heldenmünze, Schlachtfelder als Miniatur-Spielfeld.
- [ ] Kaufen inszenieren: Münzen fliegen aus der Goldanzeige, Siegel bricht, Gegenstand leuchtet auf, kräftiger Klang.
- [ ] Panels, Reiter und Wallet aus den gemalten Grafiken; klare Zustände (gesperrt, besitzt, ausgerüstet).

**AP 1.5 – Karten neu gestalten (M)**
- [ ] Gemalte Rahmen in Tempeltor-Form; Werte-Symbole: Kosten oben links im Ätherkristall, Angriff unten links
  mit gekreuzten Klingen, Leben unten rechts im Schild.
- [ ] Seltenheit über Archiv-Siegel (Bronze, Silber, Gold, Himmels-Obsidian); Legendäre mit goldenem Lorbeerkranz.
- [ ] Neue gemalte Kartenrücken; „Goldene Karten“ als Kosmetik mit animiertem Glanz.

**AP 1.6 – Sammlung und Deckbau 2.0 (M)**
- [ ] Kartenbuch mit Umblätter-Animation, Antippen zoomt die Karte heran, Filter als gemalte Steinknöpfe.
- [ ] **Manakurve als dauerhafter Anker:** Balkendiagramm der Kosten immer sichtbar, eingefärbt nach
  Früh- (1–3), Mittel- (4–6) und Spätphase (7+), mit Hinweis bei Schieflage.
- [ ] Karten fliegen beim Hinzufügen ins Deck, der passende Balken wächst sichtbar.

**AP 1.7 – Heldenwahl und Kampagnenkarte (M)**
- [ ] Heldenwahl als Galerie mit großem Porträt, Fähigkeit, Epoche und Lieblingskarten.
- [ ] Kampagne als gemalte Weltkarte mit Stationen von Sparta bis Japan; Belagerungsmissionen markiert.

**AP 1.8 – Spielbrett und HUD neu (L)**
- [ ] **Feldherrentisch** aus antikem Stein und poliertem Holz mit eingeritzter Weltkarte.
- [ ] **Zwei thematische Hälften:** Jeder Held bringt seine Epochen-Spielfeldhälfte mit (unten Spieler, oben
  Gegner), verbunden durch eine Bronze-Mittelnaht. Verhältnis zu den Schlachtfeld-Skins aus dem Basar klären.
- [ ] **Helden** als gemeißelte Münzen/Gemmen oben (KI) und unten (Spieler); **Rüstung** als Phalanx-Schild über
  dem Leben; **Waffe** links neben dem Helden mit Wucht (Angriff) und Schmiedequalität (Haltbarkeit).
- [ ] **Heldenfähigkeit** als geprägtes Herrschersiegel rechts neben dem Porträt: nach Benutzung **dreht es sich um**
  (graue Rückseite) und rastet ein; zu Beginn des nächsten Zuges dreht es sich zurück.
- [ ] **Ressourcen unten rechts** als 1–10 Äther-Runen bzw. Sonnen-Amulette (ersetzt die Mana-Säule links).
- [ ] **Chronik-Leiste am linken Rand:** Pergament-Abschnitte mit allen gespielten Karten, Zaubern und Verlusten.
- [ ] **Deck unten rechts** als Pergamentrollen-Stapel, der sichtbar dünner wird; **KI-Hand** oben als versiegelte Befehle.
- [ ] **Zug beenden** als bronzenes Chronometer bzw. Sanduhr, das beim Tippen umspringt, auf Messing schlägt und gongt.
- [ ] **Vier Eck-Dioramen** je Epoche, antippbar (Räuchergefäß brennt, Astrolabium dreht sich, Säule bröckelt, Katapult schießt).
- [ ] **Hinterhalte** als versiegelte Wachsrollen über dem Helden; **Erschöpfung** als Stundenglas.
- [ ] Höchstens 7 Plätze je Seite, Formationen rücken bei Verlusten sofort mittig zusammen (vorhanden, Animation verbessern).
- Abnahme: Mockup zuerst als Bild freigeben, dann einbauen; alle Touch-Ziele mindestens 48 dp.

### Phase 2 – Technisches Fundament (L)

**AP 2.1 – Native Android-Hülle neu aufsetzen (M)**
- [ ] Gradle-Projekt (Kotlin) mit gleicher Paket-ID, `WebViewAssetLoader` für `https://chroniken.local/`,
  Brücke mit identischer JS-API. Verhalten der alten Hülle lässt sich aus `classes.dex` ablesen.
- [ ] Gleicher Signaturschlüssel, CI baut mit Gradle statt mit `apk_bauen.py`; App-Name, Versionen und
  Dateinamen werden normal gepflegt statt binär gepatcht.
- [ ] Gewinne: echte MIME-Typen (WebP/JPEG), Vollbild mit Display-Aussparung (behebt den toten linken Rand auf dem
  OnePlus 15, AP 1.3), Bildschirm bleibt an im Match,
  Splash-Screen mit Aeterna-Logo, App-Icon, `VIBRATE` mit Mustern, hohe Bildwiederholrate.
- Abnahme: Update über die Vorversion installierbar, Spielstand bleibt, alle Brückenfunktionen getestet.

**AP 2.2 – Asset-Pipeline (S)**
- [ ] Alle Bilder nach WebP (Qualität ~85), Atlanten in benötigter Größe; Kartenmotive für Daumennagel und Großansicht getrennt.
- [ ] Laden in Stufen: Hauptmenü sofort, Match-Assets im Hintergrund, Ladebalken mit echtem Fortschritt.
- Abnahme: APK < 25 MB, Start bis Menü < 2,5 s auf dem Testhandy.

**AP 2.3 – UI ohne Komplett-Neuaufbau (M)**
- [x] Bildschirme behalten ihre DOM-Knoten; nur geänderte Teile werden aktualisiert (kleiner eigener Helfer oder
  offline eingebundene Mini-Bibliothek wie Preact + htm, ca. 10 KB).
  *Eigener Binder `core/mvvm.js` (6 KB) als Teil der neuen **MVVM-Struktur** (siehe [Projektaufbau](#projektaufbau)):
  Views rendern HTML, der Binder gleicht nur Unterschiede ab (Listen über `data-key`), Eingaben laufen als Befehle
  `data-cmd` an das ViewModel. Umgestellt: Hauptmenü, Duell-Vorbereitung, Kampagne, Sammlung und Deckbau, Basar,
  Pack öffnen, Starthand, Ergebnis und alle Dialoge; das Match-Canvas liest seinen Zustand aus dem Match-ViewModel.
  `app.js` schrumpft von 56 KB auf 7,6 KB und steckt nur noch zusammen. Die ViewModels laufen ohne DOM und sind
  in `werkzeuge/tests/viewmodel.test.js` getestet (Basar, Packs, Sammlung, Menü, Match, Store).*
- [x] Gemeinsame Bausteine: Steinknopf, Panel, Reiter, Wallet, Modal – je einmal implementiert (`view/kit.js`, dazu
  Kopfleiste und Nachrichtendialog); alle Bildschirme und Dialoge nutzen sie.
- [ ] … mit den gemalten Grafiken – die Bausteine tragen noch die bisherige CSS-Optik. Sobald die Grafiken aus AP 1.2
  da sind (Liste im [Vorschlag für die nächste Sitzung](#vorschlag-für-die-nächste-sitzung)), ändert sich nur
  `view/kit.js` / `kit.css`, nicht die Bildschirme.
- Abnahme: Übergänge laufen weich, keine Bild-Neuladungen, Scrollpositionen bleiben.
  *Gemessen im Klickpfad (Handyformat, gleicher Ablauf für beide Versionen):*

  | Messung | 1.4.0 | 1.5.0 |
  |---|---|---|
  | Basar: Elemente nach einem Kauf neu erzeugt | 51 von 51 | **0** von 51 |
  | Basar: Bilder nach Kauf / nach Ausrüsten neu erzeugt | 5 / 5 von 5 | **0 / 0** |
  | Basar: Scrollposition nach Kauf / Ausrüsten (vorher 268) | 0 / 0 | **268 / 268** |
  | Basar: längstes Bild beim Kauf, CPU 4× gedrosselt | 16 ms | 16 ms |
  | Sammlung: Suchfeld behält beim Tippen Fokus und Cursor | nur durch Nachsetzen von Hand | ✓ von selbst |
  | Starthand: Bilder beim Markieren einer Karte neu erzeugt | alle (Overlay neu) | **0** |

  Der Basar ist klein genug, dass auch der alte Neuaufbau keinen messbaren Ruckler erzeugte – der Gewinn liegt in
  Scrollposition, Bildern und Übergängen (z. B. dreht sich eine aufgedeckte Packkarte jetzt auf demselben Element).

**AP 2.4 – Match-Renderer entlasten (S)**
- [ ] Frame-Drossel `now-lastFrame>=15` entfernen (Ruckeln auf 90/120 Hz).
- [ ] Canvas-Auflösung an die Pixeldichte koppeln (höchstens 2), Touch-Koordinaten bleiben in Spielfeld-Einheiten.
- [ ] Statische Ebene offscreen zeichnen; Leucht- und Schatteneffekte als vorgerenderte Sprites statt `shadowBlur`.
- [ ] Entwickler-Overlay (FPS, Frame-Zeit) über eine versteckte Einstellung.
- Abnahme: Frame-Zeit auf dem Testhandy mindestens halbiert (vorher/nachher hier eintragen).

**AP 2.5 – Entscheidung Canvas 2D oder WebGL (PixiJS) (S)**
- [ ] Prototyp eines Matches mit 7 Dienern pro Seite, voller Hand, Partikelregen und Verformung (Karte → Siegel) in
  PixiJS (MIT, offline eingebunden); auf dem Gerät gegen den optimierten Canvas messen.
- Empfehlung: Wechsel zu PixiJS, sobald Phase 3 mit Partikeln, Glühen, Rissen und Verformung beginnt – das ist
  in Canvas 2D auf Handys kaum flüssig zu schaffen. Engine bleibt unverändert.

**AP 2.6 – Automatische Sichtprüfung (S)**
- [x] Playwright-Tests in CI: Klickpfad Menü → Basar → Match → Ergebnis, Screenshots als Artefakt, Vergleich gegen Referenzbilder.
  *`werkzeuge/klickpfad.js` spielt im Handyformat wie ein Mensch: Hauptmenü → Basar (Reiter, ganz nach unten
  scrollen, kaufen, ausrüsten) → Sammlung (Suche tippen) → Herausforderung → Starthand (Karte markieren) → Match →
  Pause → Aufgeben → Ergebnis → Hauptmenü. 12 Screenshots, 25 Prüfungen (u. a. Gold, Reiter, Scrollposition,
  keine neuen Bilder, Fokus, Niederlage). Stabil durch reduzierte Bewegung, feste Uhrzeit (Tagesduell vom 6. 10. 2026)
  und festen Spielstand. Verglichen wird verkleinert (458 × 206) mit `werkzeuge/referenz/*.webp` (zusammen 244 KB):
  Fehler ab 3 % stark abweichender Pixel oder mittlerer Abweichung 6. Zwei Läufe hintereinander: 0 % Abweichung,
  nur das Match-Canvas 0,1–0,5 %. Neuer CI-Job „sichtpruefung“ (parallel zur APK) mit Artefakt „Sichtpruefung“
  (Screenshots, Abweichungsbilder, Messwerte); er führt auch `sichtpruefung.js` aus. Neue Referenzen nach gewollten
  Änderungen: `node werkzeuge/klickpfad.js --referenz`.*
- Abnahme: CI schlägt bei JavaScript-Fehlern oder starken Bildabweichungen fehl. *✓ – jede Konsolen- oder
  Laufzeitfehlermeldung, jede fehlgeschlagene Prüfung und jede starke Bildabweichung beendet den Job mit Fehler.*

### Phase 3 – Game Feel im Match (L)

Alle Animationen werden aus den Engine-Ereignissen (`events`) abgeleitet; Regeln ändern sich hier nicht.

**AP 3.1 – Animations-Werkzeugkasten (S)**
- [ ] Tweens mit Easing-Kurven, Zeitleisten, Treffer-Stopp (40–80 ms), Kamerawackeln nach Gewicht, Federn.
- [ ] Geschwindigkeitseinstellung wirkt auf alle Animationen.

**AP 3.2 – Karten in der Hand (S)**
- [ ] Gedrückt halten vergrößert die Karte sofort und hebt sie mit dem Rascheln von schwerem Pergament an.
- [ ] Beim Verschieben weichen benachbarte Karten zur Seite aus; Ziehen neigt die Karte mit Federphysik.
- [ ] Grüne Aura um spielbare Karten; **goldgelbe Aura**, wenn eine Bedingung erfüllt ist (Kombo, Formation, Bündnis).

**AP 3.3 – Ausspielen mit Wucht (S)**
- [ ] Karte hebt sich, schwebt kurz und landet mit dumpfem Schlag – „Wumms eines Feldmarsch-Befehls“.
- [ ] **Verformung:** Das rechteckige Dokument formt sich beim Landen zur ovalen Truppensiegel-Plakette.
- [ ] Aufwirbelnder Kartenstaub und Risse im Steintisch; bei schweren Legendären stärker, mit Kameraruck.

**AP 3.4 – Kartenziehen (S)**
- [ ] Karte verlässt das Deck verdeckt (ausgerüsteter Kartenrücken) und dreht sich in der Luft um.
- [ ] Volle Hand: Karte verbrennt zu Asche; Erschöpfung: Stundenglas entzieht 1, 2, 3 … Leben.

**AP 3.5 – Angriff und Treffer (M)**
- [ ] Grüne Umrandung für Einheiten, die noch angreifen können.
- [ ] Roter, stilisierter **Marschrouten-Pfeil** von der angreifenden Einheit zum Finger; gültige Ziele pulsieren rot,
  sobald die Route darüber liegt.
- [ ] Angreifer zieht sich kurz zurück, prallt auf das Ziel, Treffersound passend zur Einheit
  (Schwerterklirren, Hufgetrappel, Lanzenkrachen); gleichzeitiger Schaden auf beiden Seiten.
- [ ] Getroffene wackeln, Schadenszahlen springen rot auf und verblassen mit Spritzern getrockneter Tinte;
  Lebenspunkte pumpen rot.
- [ ] **Tod:** Die Siegel-Plakette zerbricht in Gesteinssplitter, danach der individuelle Fall- oder Sterbelaut.

**AP 3.6 – Schlüsselwort-Effekte (M)**
- [ ] Schildwall (Holz- und Bronzeschilde), Göttliche Gunst (schimmernder Aurenkreis, zerspringt klirrend),
  Starre (Ketten/Reif), Tarnung (Schatten im Unterholz), Gift (Phiole), Vermächtnis (Urne unter der Plakette).
- [ ] Zauber-Partikel je Element und ein eigener Effekt für jede der 10 Heldenfähigkeiten.

**AP 3.7 – Zugwechsel und Ressourcen (S)**
- [ ] „Dein Zug“-Tafel fällt herunter und rastet ein; Äther-Runen füllen sich nacheinander mit Glanz und Klang.
- [ ] Heldenfähigkeits-Siegel dreht sich nach Benutzung um (siehe AP 1.8).
- [ ] Kein Zugtimer im normalen Spiel; nur Belagerungsmissionen zeigen eine glühende Lunte als Countdown.

**AP 3.8 – Match-Anfang und -Ende (S)**
- [ ] **Feldzug-Initiative:** Eine geworfene Bronzemünze entscheidet, wer beginnt; der Zweite erhält die Karte
  „Gunst der Stunde“ (seit 1.7.0 so benannt, fehlt noch die Inszenierung).
- [ ] **Vorbereitungsphase:** Startbefehle werden als Schriftrollen ausgelegt, getauschte rollen sichtbar ins Deck zurück.
- [ ] Intro: Helden stehen sich gegenüber, der Chronist kündigt die Schlacht an.
- [ ] **Sieg:** Das gegnerische Herrscher-Relief bricht auseinander, ein Banner „TRIUMPH“ entrollt sich, Kriegshörner;
  danach werden Belohnungen mit Fortschrittsbalken ausgeschüttet.

**AP 3.9 – Lebendige Schlachtfelder und Lesbarkeit (S)**
- [ ] Eck-Dioramen und Deko-Objekte reagieren auf Antippen (siehe AP 1.8).
- [ ] Langer Druck erklärt Schlüsselwörter in Sprechblasen; Angriffsvorschau zeigt den erwarteten Schaden.

### Phase 4 – Klang, Stimmen und Haptik (M)

**AP 4.1 – Drei Klangspuren je Diener**
- [ ] Jede Einheit bekommt **Auftritt** (Spruch oder Fanfare), **Angriffsruf** und **Todeslaut**.
- [ ] Umfang realistisch staffeln: zuerst die 10 Helden und alle Legendären mit eigener Stimme, dann
  Gruppenklänge für die übrigen Einheiten nach Typ (Infanterie, Reiterei, Bogenschützen, Gelehrte, Tiere,
  Belagerung, Schiffe) mit je 2–3 Varianten, später Einzelstimmen.
- [ ] Quelle festlegen: eigene Aufnahmen, Sprecher oder KI-Sprachausgabe mit kommerzieller Lizenz (Sprache: Deutsch).

**AP 4.2 – Der „Chronist der Zeiten“**
- [ ] Neutrale Erzählerstimme: leitet Schlachten ein, kündigt Legendäre („Monumente“) an, zieht am Ende ein
  kurzes historisches Fazit.

**AP 4.3 – Reaktive KI-Dialoge**
- [ ] Die KI kommentiert kritische Züge mit situativen Zeilen ihres Helden (z. B. Leonidas spottet über einen
  schwachen Angriff, Hypatia analysiert einen Fehler); mit Abklingzeit, damit es nie nervt. Kein Spieler-Emote-Spam.

**AP 4.4 – Geräuschkulisse und Musik**
- [ ] Kategorien: Stein-UI, Pergament/Karten, Kampf, Magie, Belohnung; Lautheit angleichen; Quellen in den Credits.
- [ ] Musik je Epoche (Instrumente wie Aulos, Ney, Shamisen, Bodhrán) für Menü, Kampf, Spannung, Sieg, Niederlage.

**AP 4.5 – Haptik-Sprache** (benötigt AP 2.1)
- [ ] Leicht (Antippen), mittel (Ausspielen, Einrasten), schwer (Treffer, Tod, Legendäre); abschaltbar.

### Phase 5 – Regeln, Karten und Balance (L)

Hier ändern sich `data.js` und `engine.js`. Jede Änderung braucht Tests, einen Simulationslauf und eine
KI, die die neue Mechanik versteht.

**AP 5.1 – Balance-Werkzeug (S)**
- [x] Skript `werkzeuge/balance.js`: KI gegen KI für alle 10 × 10 Heldenpaarungen (Startdecks und Zufallsdecks),
  je Paarung mindestens 200 Partien; Ausgabe: Siegquoten-Matrix, Vorteil des ersten Spielers, Partielänge,
  Spiel- und Siegquote je Karte („gewinnt, wenn gezogen“).
  *Umgesetzt:* 55 Paarungen (45 + 10 Spiegelduelle) × 200 Partien × 2 Deckarten = 22 000 Partien in ≈ 3 min auf
  4 Kernen (Worker-Threads). Je zwei Partien teilen Startwert und Decks und unterscheiden sich nur im Beginner;
  beide Seiten tauschen beim Start Karten ab 4 Mana. Je Held: gegen das Feld, als Beginner und als Zweiter,
  schwerste und leichteste Paarung; je Karte: im Deck, gespielt, „gewinnt, wenn gezogen“ und Abstand zur
  Siegquote des eigenen Helden. Regelvarianten lassen sich ohne Änderung am Spiel vergleichen
  (`AETERNA_MODELL=<Ordner>`). Damit das schnell genug läuft, kopiert die KI den Spielzustand für ihre Vorausschau
  gezielt statt per JSON (`E.copy`): **5,3× schneller bei gleichen Zügen** (Prüfsumme über 60 Partien identisch),
  die Tests laufen in 6,5 statt über 20 s.
- [x] Ergebnisse als Tabelle in `balance/BERICHT.md`; Lauf auch in CI (verkürzt).
  *Vorher: [`balance/BERICHT-1.5.0.md`](balance/BERICHT-1.5.0.md), nachher: [`balance/BERICHT.md`](balance/BERICHT.md).
  Neuer CI-Job „balance“ mit 20 Partien je Paarung (Artefakt „Balance“), Test `werkzeuge/tests/balance.test.js`.*
- Abnahme: reproduzierbare Zahlen mit festem Startwert. *✓ – gleicher Startwert und Regelstand ergeben einen
  byte-gleichen Bericht, unabhängig von der Zahl der Threads (im Test geprüft); der Bericht nennt Startwert und
  Prüfsumme von `data.js` und `engine.js`.*

**AP 5.2 – Heldenbalance (S)**
- [x] Ausreißer anhand von AP 5.1 bestimmen; Stellschrauben: Wert und Kosten der Heldenfähigkeit, Startdeck,
  Heldenkarten. Lieber Schwache stärken als Starke schwächen.
  *Befund:* Mit Startdecks entschied fast nur die Heldenfähigkeit – Fähigkeiten mit Wirkung aufs Feld (Hypatias
  1 Schaden auf ein Ziel nach Wahl, Dandolos Klinge) gewannen, reine Rüstung (Leonidas), Heilung (Imhotep) und
  Gesichtsschaden (Khan) verloren. Bei Zufallsdecks zählten die übrigen Heldenkarten. Der Beginner gewann 57 %
  (Startdecks) bzw. 66 % (Zufallsdecks).
  *Geändert in zehn Messrunden (40–200 Partien je Paarung); Startdecks und neutrale Karten bleiben unverändert,
  Spielstände bleiben gültig:*
  - **Initiative:** +2 statt +1 Mana. Verworfen nach Messung: „Beginner zieht im ersten Zug nicht“ (Startdecks
    kippten auf 40 % für den Beginner) und „Initiative zieht eine Karte“ (Zufallsdecks blieben bei 63 %).
  - **Heldenfähigkeiten:** Leonidas *Schildwall* gibt 1 Rüstung und allen eigenen Dienern +1 Leben (statt 2 Rüstung);
    Hypatias *Sternenfunke* trifft einen **zufälligen Feind** (statt ein Ziel nach Wahl, die Animation fliegt zum
    getroffenen Ziel); Imhotep heilt 3 (statt 2); Boudicca +1 Angriff und 2 Rüstung (statt 1); Nostradamus zieht
    für 1 Leben (statt 2).
  - **Heldenkarten – 40 von 100, davon 27 gestärkt und 13 abgeschwächt** (alt in Klammern):

    | Held | Basiskarten (auch im Startdeck) | übrige Heldenkarten |
    |---|---|---|
    | Leonidas | Bronzener Wall: 3 Rüstung, eigene Diener +2 Leben (5 Rüstung) | – |
    | Hypatia | Sternenkundiger 2/3 (2/4) | Lehrsatz 2 Mana (3), Museionshüterin 4/7 (4/6), Sternenorakel 5 Mana (6), Theon 6/7 (5/7) |
    | Imhotep | Heilender Balsam zieht zusätzlich 1 Karte | Balsamierer 3/4 (3/3), Nilschwemme 3 Mana (4), Urteil der Sonne 5 Mana (6) |
    | Dandolo | Lagunenbote 1/1 (2/1) | Dogenklinge 2 Mana (3), Geheimer Vertrag 2 Mana (3), Arsenal von Venedig 4 Mana (5) |
    | Khan | Steppenspäher 2/2 (2/1), Reiterbogenschütze 3/2 (2/2), Goldener Reiter 5/4 (4/3) | Adlerjägerin 2/3 (3/3), Belagerungsfeuer 6 Mana (5) |
    | Boudicca | Hainwächterin 1/4 (1/3), Icenerkrieger 4/4 (3/4) | Aufstand 3 Mana (4) |
    | Nostradamus | Tintenlehrling heilt 3 (2), Maskierter Seher 2/4 (3/4), Prophezeiung 4 Mana (3) | Schattenpakt 2 Mana (3), Chronist der Nacht 4/6 (4/5), Rote Finsternis 5 Mana (6), Wächter der Zeiten 6 Mana 6/7 (7 Mana 6/8), Caterina 7 Mana (8) |
    | Jeanne | Bauernrekrut 1/3 (1/2), Die Fahne erheben 2 Mana (3) | Lilienritter 3/3 (3/4), Standartenträgerin 4/4 (4/5), Glocken von Reims 6 Mana (5), Paladin der Loire 7 Mana 4/6 (6 Mana 5/6) |
    | Ragnar | Runenschnitzer 4/4 (3/4) | Donnerschlag 4 Mana (3) |
    | Musashi | – | Der leere Geist 5 Mana (4), Sasaki Kojirō 6/6 (7/6) |

- [x] Ziel: jeder Held 47–53 % gegen das Feld, keine Paarung schlechter als 40/60, Erster-Spieler-Vorteil ≤ 55 %.
  *Gemessen (200 Partien je Paarung, Startwert 20261006):*

  | Messung | Startdecks 1.5.0 | Startdecks 1.6.0 | Zufallsdecks 1.5.0 | Zufallsdecks 1.6.0 |
  |---|---|---|---|---|
  | Helden mit 47–53 % gegen das Feld | 2 von 10 | **10 von 10** | 3 von 10 | **10 von 10** |
  | Spanne gegen das Feld | 15,4–80,2 % | **47,8–51,9 %** | 42,1–57,6 % | **47,9–51,6 %** |
  | Paarungen schlechter als 40/60 | 33 von 45 | **0** | 9 von 45 | **0** |
  | Beginner gewinnt | 57,2 % | **45,9 %** | 65,6 % | **50,2 %** |
  | Züge je Partie (Median) | 23 | 23 | 19 | 19 |

  | Held | Startdecks 1.5.0 → 1.6.0 | Zufallsdecks 1.5.0 → 1.6.0 |
  |---|---|---|
  | Leonidas I. | 15,4 → **49,6 %** | 42,6 → **50,3 %** |
  | Hypatia | 80,2 → **51,9 %** | 54,5 → **48,9 %** |
  | Imhotep | 36,5 → **47,8 %** | 42,1 → **47,9 %** |
  | Enrico Dandolo | 61,1 → **48,4 %** | 49,1 → **48,6 %** |
  | Dschingis Khan | 36,8 → **50,3 %** | 51,3 → **51,3 %** |
  | Boudicca | 45,6 → **49,9 %** | 48,2 → **50,5 %** |
  | Nostradamus | 62,4 → **51,1 %** | 45,4 → **50,1 %** |
  | Jeanne d’Arc | 52,3 → **50,8 %** | 57,6 → **50,4 %** |
  | Ragnar Lodbrok | 52,7 → **50,7 %** | 53,9 → **50,4 %** |
  | Miyamoto Musashi | 57,1 → **49,6 %** | 55,4 → **51,6 %** |

- Abnahme: ✓ in beiden Deckarten. *Gegenprobe mit anderem Startwert (`--seed 1`, wieder 22 000 Partien):*
  Helden 46,2–52,2 %, 9 von 10 je Deckart im Ziel (Dandolo Startdecks 46,2 %, Leonidas Zufallsdecks 46,5 %), zwei
  Paarungen knapp darunter (Khan–Boudicca 37,5 %, Jeanne–Hypatia 38 %, beide Startdecks), Beginner 46,6 / 50,4 %.
  Das liegt im Zufallsfehler (±2,3 je Held, ±6,9 je Paarung); über beide Läufe gemittelt liegen alle Helden bei
  47,3–51,8 %. Hypatia gegen Jeanne bleibt mit Startdecks ein natürlicher Konter (Flächenschaden gegen Rekruten,
  59,5–62 %) – ein Fall für AP 5.3/5.4. Geprüft per Screenshot im Handyformat: die längeren Texte (Bronzener Wall,
  Heilender Balsam, Schildwall) passen auf Karte und Heldenpanel; Klickpfad mit neuen Referenzbildern (Version 1.6.0
  in der Fußzeile, geänderte Kartenwerte im Tagesduell).

**AP 5.3 – Legendäre neu denken (M)**

Grundsätze: Jede Legendäre ist eine **historische Persönlichkeit mit einer einzigartigen Regel**, um die man ein Deck
bauen kann; mächtig, aber mit Antwort; nie nur „großer Körper plus Bonus“. Werte nach dem Simulationslauf feinjustieren.

| Held | Heute | Vorschlag (Richtung, Werte vorläufig) | Benötigt |
|---|---|---|---|
| Leonidas | Gorgo, 7: 6/7, andere Diener +2/+2 | **Gorgo, Stimme Spartas** 6: 4/6, Schildwall. Einmarsch: Ruft für jeden feindlichen Diener einen Hopliten (2/3, Schildwall). Eure Schildwall-Diener haben +1 Angriff. | Zählen feindlicher Diener, Aura |
| Hypatia | Theon, 7: 5/7, zieht 2, 3 Rüstung | **Theon von Alexandria** 5: 3/5, Arkaner Fokus +1. Am Ende Eures Zuges: Wirkt Euren zuletzt gewirkten Zauber erneut (zufällige Ziele). | Zauberschaden, Zauber-Verlauf |
| Imhotep | Djoser, 8: 6/8, zwei Pyramidenwächter | **Djoser, der Erbauer** 7: 5/7. Einmarsch: Errichtet die Stufenpyramide (Bauwerk, Haltbarkeit 8): Zu Beginn Eures Zuges erhält Euer schwächster Diener +2/+2. | Bauwerke (AP 5.5) |
| Dandolo | Marco, 7: 6/6, zieht 3 | **Marco Polo, der Weltenfahrer** 6: 5/5. Einmarsch: Ergründet zweimal eine Karte eines anderen Helden („Seidenstraße“); sie kosten 1 weniger. | Ergründen, heldenfremde Karten |
| Khan | Subutai, 8: 7/7, andere +2 Angriff | **Subutai, der Stratege** 7: 6/6, Vorstoß. Wann immer ein anderer eigener Diener angreift, greift ein zufälliger weiterer eigener Diener dasselbe Ziel an (Zangenangriff). | Vorstoß, Angriffs-Auslöser |
| Boudicca | Andraste, 8: 7/8 Spott, Todesröcheln zwei 2/2 | **Andraste, Göttin des Sieges** 8: 7/7. Kostet 1 weniger für jeden eigenen Diener, der in dieser Partie gestorben ist. Einmarsch: Holt die zwei zuletzt gestorbenen eigenen Diener zurück. | Todes-Verlauf, Kostensenkung |
| Nostradamus | Caterina, 8: 7/7, 5 Schaden + 5 Heilung | **Caterina de’ Medici, die Regentin** 6: 5/5. Am Ende Eures Zuges: Zieht eine Karte, sie kostet 2 weniger; Euer Held erleidet 2 Schaden. | Kosten ändern |
| Jeanne | La Hire, 8: 6/8 Gottesschild, zwei Rekruten | **La Hire, der Unbeugsame** 6: 4/6, Göttliche Gunst. Eure Rekruten haben +1/+1 und Göttliche Gunst; Eure Heldenfähigkeit ruft zwei Rekruten. | Aura für Spielsteine, Heldenfähigkeit ändern |
| Ragnar | Lagertha, 8: 7/8 Spott, zwei Krieger | **Lagertha, Schildmaid** 7: 6/7, Schildwall. Einmarsch: Ruft eines von jedem Totem. Eure Totems haben Schildwall und +2 Leben. | Aura für Totems |
| Musashi | Kojirō, 8: 7/6 Ansturm, Gottesschild | **Sasaki Kojirō, der Rivale** 6: 5/5, Doppelschlag. Einmarsch: Duell – Kojirō und ein feindlicher Diener Eurer Wahl kämpfen, bis einer stirbt. | Doppelschlag, Duell-Effekt |
| Neutral | Herodot, 8: 6/8, zieht 3, heilt 4 | **Herodot, Vater der Geschichtsschreibung** 5: 4/5. Einmarsch: Ergründet eine Karte, die in dieser Partie bereits gespielt wurde (von beiden Seiten). | Ergründen, Spielverlauf |
| Neutral | Zenobia, 9: 8/8 Ansturm, 5 Rüstung | **Zenobia, Rebellin von Palmyra** 8: 6/6. Einmarsch: Übernehmt die Kontrolle über einen feindlichen Diener mit höchstens 4 Angriff. | Kontrolle übernehmen |

- [x] Vorschläge mit dir abstimmen, umsetzen, KI-Bewertung ergänzen, Simulationslauf; Legendäre als Gruppe
  nicht stärker als 55 % „gewinnt, wenn gezogen“.
  *Umgesetzt in 1.7.0 – alle zwölf auf einmal* (deine Entscheidung 8, statt nur der Legendären mit den ersten
  Schlüsselwörtern). Neue Regeln dafür in `model/engine.js`: Auren (Gorgo, La Hire, Lagertha – sie enden mit dem Tod der
  Legendären, verlorenes Leben über die Aura wird gekappt, nicht tödlich), Zangenangriff, Duell, Übernahme, Wiederkehr,
  Kosten je Handkarte, Wiederholung des letzten Zaubers, Bauwerk; zwei neue Spielsteine (Hoplit, Stufenpyramide).
  Werte in sieben Varianten-Läufen (`AETERNA_MODELL`, 60–100 Partien je Paarung) justiert, dann der volle Lauf.

  | Held | Legendäre 1.7.0 | gegenüber dem Vorschlag oben | gewinnt, wenn gezogen (Δ zum Helden) |
  |---|---|---|---|
  | Leonidas | **Gorgo, Stimme Spartas** 7: 4/6, Schildwall; Hopliten 1/2 | 7 statt 6 Mana, Hopliten 1/2 statt 2/3 | 57,5 % (+7,9) |
  | Hypatia | **Theon von Alexandria** 5: 4/6 | 4/6 statt 3/5 | 52,1 % (+3,1) |
  | Imhotep | **Djoser, der Erbauer** 6: 4/5; Stufenpyramide 0/8 | 6: 4/5 statt 7: 5/7 | 51,4 % (+2,5) |
  | Dandolo | **Marco Polo, der Weltenfahrer** 6: 5/5 | wie vorgeschlagen | 52,5 % (+1,7) |
  | Khan | **Subutai, der Stratege** 6: 6/6, Vorstoß | 6 statt 7 Mana | 54,3 % (+2,9) |
  | Boudicca | **Andraste, Göttin des Sieges** 8: 5/5 | 1 weniger je **zwei** Gefallene, holt **einen** Diener zurück (statt zwei), 5/5 statt 7/7 | 50,1 % (+2,6) |
  | Nostradamus | **Caterina de’ Medici** 5: 4/6 | 5: 4/6 statt 6: 5/5, 1 statt 2 Schaden am eigenen Helden | 52,0 % (+0,8) |
  | Jeanne | **La Hire, der Unbeugsame** 7: 4/6 | 7 statt 6 Mana | 52,9 % (+3,0) |
  | Ragnar | **Lagertha, Schildmaid** 7: 6/7, Schildwall | Totems +1 statt +2 Leben | 55,8 % (+5,4) |
  | Musashi | **Sasaki Kojirō, der Rivale** 6: 5/6 | 5/6 statt 5/5 | 48,7 % (−2,5) |
  | Neutral | **Herodot, Vater der Geschichte** 4: 4/4 | 4: 4/4 statt 5: 4/5, kürzerer Name (passt aufs Namensband) | 52,0 % (+2,0) |
  | Neutral | **Zenobia, Rebellin von Palmyra** 8: 6/6 | wie vorgeschlagen | 54,1 % (+4,1) |

  *Gemessen* (Zufallsdecks, 200 Partien je Paarung, Startwert 20261006; Startdecks enthalten keine Legendären):

  | Messung | 1.6.0 | 1.7.0 |
  |---|---|---|
  | Legendäre als Gruppe „gewinnt, wenn gezogen“ | 50,9 % (+1,0) – Zenobia (9 Mana) kam in Zufallsdecks nie vor | **52,8 % (+2,8)** |
  | Spanne der einzelnen Legendären (Δ zum eigenen Helden) | −7,1 (Subutai) bis +9,7 (Djoser) | **−2,5 (Kojirō) bis +7,9 (Gorgo)** |
  | Anteil der Partien, in denen die KI die Legendäre ausspielt (wenn im Deck) | 34–53 % | 37–49 % |

  Die Kartentexte passen vollständig auf die Karte: Lange Regeln bekommen eine kleinere Schrift und bis zu sieben
  Zeilen statt abgeschnitten zu werden (geprüft per Screenshot aller zwölf). Caterinas Zusatz „die Regentin“ entfällt
  aus demselben Grund. Gorgo lag am oberen Rand (+7,9); mit den neuen Karten in 1.8.0 sinkt sie ohne Änderung auf 54,0 %
  (+5,4) – kein Feinschliff mehr nötig. Am oberen Rand liegen jetzt Lagertha (56,3 %) und Zenobia (55,5 %), beide unter 60 %.

**AP 5.4 – Historische Schlüsselwörter (M)**

*Umbenennen (Engine bleibt, nur Texte, Symbole und Hilfe):* **✓ alle sechs auf einmal in 1.7.0** (deine Entscheidung 4)

| Heute | Neu | Darstellung |
|---|---|---|
| Spott | **Schildwall** | Holz- und Bronzeschilde um die Einheit; Gegner müssen zuerst sie angreifen |
| Gottesschild | **Göttliche Gunst** | schimmernder Aurenkreis, fängt den ersten Schaden ab |
| Kampfschrei | **Einmarsch** | Effekt beim Ausspielen aus der Hand |
| Todesröcheln | **Vermächtnis** | kleine Urne unter der Plakette |
| Ansturm | **Sturmangriff** | darf sofort jedes Ziel angreifen |
| Initiative (Münze) | **Gunst der Stunde** | Schriftrolle, 0 Mana, +2 Mana in diesem Zug (seit 1.6.0) |

*Neu einführen (Engine-Erweiterung, je mit Tests und KI-Bewertung):*

| Schlüsselwort | Regel | Darstellung |
|---|---|---|
| **Vorstoß** | sofort angreifen, aber keine Helden | Pfeilspitze |
| **Starre** | Ziel verpasst seinen nächsten Angriff | Ketten oder Reif |
| **Doppelschlag** | zwei Angriffe pro Zug | zwei gekreuzte Klingen |
| **Tödliches Gift** | jeder Schaden an Dienern vernichtet sie | Phiole |
| **Tarnung** | weder angreifbar noch anvisierbar, bis die Einheit selbst angreift | Schatten im Unterholz |
| **Plünderung** | ausgeteilter Schaden heilt den eigenen Helden | Beutel |
| **Arkaner Fokus +X** | Offensivzauber verursachen X mehr Schaden | leuchtende Rune |
| **Ergründen** | der Chronist breitet 3 versiegelte Schriftrollen aus, eine wird gewählt | drei Rollen |
| **Belastung X** | nächster Zug hat X Ressourcen weniger | rissige Rune |
| **Bannung** | entfernt alle Effekte, Segnungen und Auren einer Einheit | durchgestrichenes Siegel |

- [x] **Teil 1 (1.7.0): Umbenennung** in Kartentexten, Heldenfähigkeit, Missionen, Hilfe, Zielhinweis und Starthand
  („Du erhältst die Gunst der Stunde“). Engine-Felder (`taunt`, `shield`, `battle`, `death`, `charge`) und Spielstände
  bleiben. Damit nichts doppelt heißt: Leonidas' Fähigkeit *Schildwall* heißt jetzt **Phalanx**, „Spartas Vermächtnis“
  heißt **Spartas Erbe**. Ein Glossar (`CHD.keywords`) erklärt jedes Schlüsselwort unter der Großansicht im Match und in
  den Kartendetails der Sammlung; die Hilfe hat zwei neue Abschnitte. Ein Test stellt sicher, dass kein alter Begriff
  mehr vorkommt und Kartentext und Engine-Feld zusammenpassen.
- [x] **Teil 1 (1.7.0): die ersten neuen Schlüsselwörter** – je mit Engine-Test, KI-Bewertung und Balance-Lauf:
  - **Vorstoß** (`rush`): Duellant (Musashi, 4: 4/3), Kriegselefant (neutral, 7: 7/8), Subutai. Symbol ➤ auf der Plakette.
  - **Starre** (Effekt `freeze`): Schildstoß (Leonidas, 3 Mana: 3 Schaden an einem Diener + Starre, vorher 4 Schaden),
    Donnerschlag (Ragnar, 3 Mana: 1 Schaden an allen feindlichen Dienern + Starre, vorher 4 Mana 2 Schaden). Reif und ❄
    auf der Plakette; in Starre im eigenen Zug gilt sie bis über den nächsten Zug.
  - **Ergründen** (Effekt `discover`): Lehrsatz (Hypatia: Ergründet einen Zauber, zieht 1 Karte), Vergessene Weisheit
    (neutral, 4 Mana: Ergründet zwei Karten, 3 Rüstung), Marco Polo, Herodot. Eigener Dialog „Der Chronist breitet drei
    Schriftrollen aus“; die Wahl lässt sich nicht wegklicken und überlebt Pausieren und Fortsetzen (Spielstand).
  - Für die Legendären außerdem schon **Doppelschlag** (Kojirō, ⚔) und **Arkaner Fokus** (Theon, ✧1), dazu das erste
    **Bauwerk** (Stufenpyramide, siehe AP 5.5).
- [x] **Teil 2 (1.8.0): Plünderung, Tarnung, Bannung, Tödliches Gift, Belastung** – alle fünf auf einmal, je mit
  Engine-Test (`tests/schluesselwoerter2.test.js`), KI-Bewertung und Balance-Lauf:
  - **Plünderung** (`plunder`): Schaden des Dieners – auch beim Gegenschlag, im Zangenangriff und im Duell – heilt den
    eigenen Helden. Marke ♥.
  - **Tarnung** (`stealth`): weder angreifbar noch Ziel von Zaubern, Fähigkeiten (auch Hypatias Zufallsziel) und
    Einmarsch; ein getarnter Schildwall sperrt nicht; Flächenschaden trifft. Endet mit dem ersten eigenen Angriff.
    Plakette abgedunkelt, Marke ◐.
  - **Bannung** (Effekt `silence`): entfernt Schildwall, Göttliche Gunst, Vorstoß, Doppelschlag, Starre, Tarnung,
    Plünderung, Gift, Vermächtnis, Zugende-Effekte, Arkanen Fokus und die Auren der Legendären; Angriff und
    Höchstleben fallen auf den Kartenwert. Auch Bauwerke lassen sich bannen (die Stufenpyramide wirkt dann nicht mehr).
    Plakette ausgegraut, Marke ⊘.
  - **Tödliches Gift** (`poison`): jeder Schaden an einem Diener vernichtet ihn (Göttliche Gunst fängt ihn ab);
    Helden und Bauwerke sind sicher. Marke ⚗.
  - **Belastung X** (`overload`): im nächsten eigenen Zug X Mana weniger. Die Manasäule färbt die gesperrten Kristalle
    rot und zeigt „−X Belastung“ bzw. „Folgezug −X“.
  - **13 neue Karten** (feste IDs hinten angehängt, Spielstände bleiben gültig; alle noch mit Platzhalter, AP 5.12):

    | Karte | Held | Werte | Schlüsselwort | gewinnt, wenn gezogen (Δ zum Helden) |
    |---|---|---|---|---|
    | Agent des Zehnerrats | Dandolo | 3: 4/3 | Tarnung | 54,6 % (+2,9) |
    | Tributeintreiber | Khan | 3: 3/3 | Plünderung | 46,1 % (−4,4) |
    | Kobra des Nils | Imhotep | 2: 1/2 | Tödliches Gift | 53,0 % (+5,1) |
    | Brand von Londinium | Boudicca | Zauber 3: 2 Schaden an allen feindlichen Dienern | Belastung 1 | 53,7 % (+4,9) |
    | Bannbulle | Nostradamus | Zauber 1: Bannung, zieht 1 Karte | Bannung | 57,0 % (+5,1) |
    | Plünderer von Paris | Ragnar | 4: 3/5 | Plünderung | 49,4 % (−1,2) |
    | Zorn des Donnergottes | Ragnar | Zauber 1: 3 Schaden | Belastung 1 | 51,7 % (+1,1) |
    | Shinobi aus Iga | Musashi | 2: 3/2 | Tarnung | 55,1 % (+4,7) |
    | Freibeuterin | neutral | 2: 2/2 | Plünderung | 47,7 % (−2,3) |
    | Späherin im Unterholz | neutral | 1: 2/1 | Tarnung | 52,0 % (+2,0) |
    | Wandermönch | neutral | 2: 2/2, Einmarsch: Bannung | Bannung | 52,1 % (+2,1) |
    | Giftmischerin | neutral | 3: 2/3 | Tödliches Gift | 52,6 % (+2,6) |
    | Condottiere | neutral | 3: 4/5 | Belastung 2 | 50,7 % (+0,7) |

    Werte in drei vollen Läufen justiert: Die Kobra war mit 1/3 der Ausreißer (60,3 %, +10,2) und hat jetzt 1/2; der
    Agent bekam +1 Leben (vorher 45,3 %). Ein gestärkter Tributeintreiber (3/4) schob Khan auf 53,1 % – zurückgenommen.
  *Gemessen* (200 Partien je Paarung, Startwert 20261006; Bericht: [`balance/BERICHT.md`](balance/BERICHT.md), vorher
  [`balance/BERICHT-1.7.0.md`](balance/BERICHT-1.7.0.md)):

  | Messung | 1.7.0 | 1.8.0 |
  |---|---|---|
  | Helden mit 47–53 % gegen das Feld (Start- / Zufallsdecks) | 10 / 10 | **10 / 10** |
  | Spanne gegen das Feld, Zufallsdecks | 47,1–51,8 % | **47,4–52,3 %** |
  | Paarungen schlechter als 40/60 | 0 | **0** |
  | Beginner gewinnt (Start- / Zufallsdecks) | 45,8 / 51,4 % | **45,8 / 49,9 %** |
  | Legendäre als Gruppe „gewinnt, wenn gezogen“ | 52,8 % | **53,1 %** |
  | Neue Karten „gewinnt, wenn gezogen“ | – | **46,1–57,0 %** (keine über 60 %) |
  | Züge je Partie (Median, Zufallsdecks) | 19 | 20 |

**AP 5.5 – Bauwerke und Denkmäler (M)**

Neuer Kartentyp ohne Angriff mit dauerhaftem Effekt, ähnlich Schauplätzen in Runeterra oder Planeswalkern in Magic.

- [x] Regelvorschlag *von dir bestätigt (Entscheidung 6, Sitzung 5):* Ein Bauwerk belegt einen der 7 Plätze, greift nie an, hat **Haltbarkeit** statt Leben, kann von
  Dienern, Helden und gezielten Zaubern angegriffen (belagert) werden; Flächenschaden trifft es nicht; Heilung wirkt
  nicht, nur eigene Reparatur-Effekte. Beim Einsturz bricht die Plakette zusammen.
- [x] Beispiele: **Bibliothek von Alexandria** (zu Beginn Eures Zuges: Ergründet einen Zauber), **Aquädukt** (am Ende
  Eures Zuges: 2 Heilung für alle eigenen Charaktere), **Große Mauer** (Schildwall; feindliche Diener mit Sturmangriff
  können Euren Helden nicht angreifen), **Leuchtturm von Pharos** (Eure Zauber kosten 1 weniger), **Kolosseum**
  (wann immer ein Diener stirbt: +1 Rüstung), **Hängende Gärten** (Heilung auf eigene Diener verdoppelt),
  **Akropolis** (eigene Diener +1 Leben), **Pyramiden von Gizeh** (Vermächtnis löst zweimal aus).
  *Umgesetzt in 1.10.0* – vier als Zeitalterkarten, drei als neutrale Weltwunder; das Aquädukt gibt es schon als
  *Aquädukt von Chapultepec* (Nezahualcóyotl, 1.9.0), eine zweite gleiche Karte wäre eine Dopplung. Werte nach den Messrunden:

  | Bauwerk | Wo | Werte | Regel |
  |---|---|---|---|
  | Bibliothek von Alexandria | Griechische Antike, episch | 3: 0/5 | Zu Beginn Eures Zuges: Ergründet einen Zauber |
  | Leuchtturm von Pharos | Griechische Antike, selten | 3: 0/5 | Arkaner Fokus +1, Eure Zauber kosten 1 weniger (nur mit der Kostensenkung lag er bei −12 Punkten) |
  | Akropolis | Griechische Antike, selten | 2: 0/5 | Eure Diener haben +1 Leben |
  | Große Mauer | China, Korea, Japan, episch | 3: 0/7 | Schildwall; feindliche Diener können Euren Helden nicht in dem Zug angreifen, in dem sie erscheinen (gilt für Sturmangriff wie Vorstoß) |
  | Kolosseum | neutral, selten | 3: 0/6 | Wann immer ein Diener stirbt (beide Seiten): +1 Rüstung |
  | Hängende Gärten | neutral, selten | 2: 0/5 | Am Ende Eures Zuges 1 Heilung für Eure Diener; Heilung wirkt bei Euren Dienern doppelt |
  | Pyramiden von Gizeh | neutral, episch | 4: 0/7 | Eure Vermächtnisse wirken zweimal |

  Dazu fünf weitere neue Bauwerke in der Kartenwelle (Ka-Statue, Jurtenlager, Chinampa, Burgfried, Tribok – siehe AP 5.11).
- [x] Engine: neuer Typ `building`, Zielwahl und KI-Bewertung („belagern oder ignorieren?“), Darstellung mit Turm-Symbol.
  *Umgesetzt in 1.10.0:* Die KI bewertet ein Bauwerk nach seiner Wirkung (`E.impact`: Auslöser, Auren, Kostensenkungen,
  Vermächtnis, Mauer). Ein wirkungsloses (z. B. gebanntes) Bauwerk ist ihr kaum etwas wert – sie greift lieber den Helden
  an; ein wirksames reißt sie ein, sobald es fällt (Test: Bibliothek mit 3 Haltbarkeit wird eingerissen, gebannt ignoriert).
  Schildwall-Mauern bewertet sie wie bisher, weil sie den Weg versperren. Bauwerke auf der Hand zeigen jetzt ein
  Turm-Abzeichen mit Haltbarkeit statt Angriff und Leben, die Kartendetails „♜ Haltbarkeit“.
  *Teilweise in 1.7.0:* Die Stufenpyramide (Spielstein von Djoser) ist das erste Bauwerk – Feld `building`: belegt einen
  der 7 Plätze, greift nie an, Haltbarkeit statt Leben, kein Flächenschaden, keine Heilung, keine Buffs; Diener, Helden
  und gezielte Zauber dürfen sie belagern; die KI bewertet sie über ihre Haltbarkeit. Plakette grau mit ♜ und gezeichneter
  Platzhalter-Pyramide. Bauwerke als eigener Kartentyp aus der Hand fehlen noch.

**AP 5.6 – Taktische Hinterhalte (M)**
- [ ] Verdeckte Karten als versiegelte Wachsrollen über dem Helden, lösen bei gegnerischen Aktionen automatisch aus
  (z. B. „Wenn ein feindlicher Diener angreift …“, „Wenn der Gegner einen Zauber wirkt …“). Keine Echtzeit-Reaktionen nötig.

**AP 5.7 – Erweiterung „Wunder der Welt“ (L)**
- [ ] Rund 90 neue Karten: je Held 6 (davon 1 Legendäre), 20 neutrale, 10 Bauwerke, dazu Hinterhalte; nutzt die neuen
  Schlüsselwörter. Kostenkurve und Werte-Budget nach einer festen Formel (z. B. Grundwerte = 2 × Kosten + 1,
  Schlüsselwörter kosten Werte), Feinschliff per Simulation.
- [ ] Ideen für neue Legendäre: Kleopatra (verführt feindliche Diener), Hannibal (Elefanten ignorieren einmal
  Schildwall), Alexander der Große (wächst mit jedem eroberten Diener), Archimedes (Erfindungen, stärkt Bauwerke),
  Qin Shi Huang (Terrakotta-Armee kehrt zurück), Mansa Musa (Reichtum: Karten kosten weniger), Sun Tzu
  (Hinterhalte kosten 0), Hammurabi (Gesetz: alle Karten kosten 3), Leonardo da Vinci (verwandelt Zauber in
  Erfindungen), Hatschepsut, Saladin, Wu Zetian, Spartacus (Aufstand: Angriff und Leben aller Diener tauschen).
- [ ] Jede neue Karte mit Motiv aus dem Bild-Atlas (Grafiken über AP 1.2).

**AP 5.8 – KI erweitern (M)**
- [x] **Persönlichkeit je Held (aggressiv, defensiv, kombinierend)** – *Teil 2 in 1.10.0*, siehe unten.
- [ ] KI versteht alle neuen Mechaniken; Schwierigkeitsgrade Lehrling, Feldherr, Legende; Vorausschau 1–2 Züge.
  *Teil 1 in 1.7.0:* Die Bewertung (`E.value`) kennt Starre (erstarrter Diener zählt weniger), Doppelschlag, Arkaner
  Fokus, Bauwerke (Haltbarkeit), die Dauerwirkung der Legendären, verbilligte Handkarten und eine offene Ergründen-Wahl
  (zählt als Karte); beim Ergründen wählt sie nach Kosten, Seltenheit, Werten und Spielbarkeit (`E.cardWorth`); die
  Suche nach tödlichen Zügen berücksichtigt Vorstoß, Doppelschlag, Duell und Starre. Gemessen im Balance-Lauf: Die KI
  spielt jede Legendäre in 37–49 % der Partien, in denen sie im Deck liegt (1.6.0: 34–53 %).
  *Teil 2 in 1.10.0:* Feld `ai` je Held neben `ability` – **aggressiv** (Khan, Boudicca, Jeanne, Ragnar, Musashi,
  Amanirenas): Schaden am feindlichen Helden zählt 30 % mehr; **defensiv** (Leonidas, Imhotep, Perikles, Nezahualcóyotl,
  Masako): eigenes Leben +12 %, feindliches Feld räumen +6 %; **kombinierend** (Hypatia, Dandolo, Nostradamus, Agrippa,
  Anna): Handkarten und Ergründen +12 %, jede verschiedene eigene Dauerwirkung (Auslöser, Aura, Fokus, Kostensenkung)
  +0,8. Die Heldenwahl nennt die Spielweise des KI-Gegners. Die Faktoren sind bewusst klein: Eine erste, stärkere
  Fassung (defensiv +25 %) machte die defensiven Helden um 4–5 Punkte stärker und Agrippa als „kombinierend“ (jeder
  Pionier zählte als Dauerwirkung) fiel auf 30 %. Wie sich die Spielweisen unterscheiden, misst das Balance-Werkzeug
  (Anteil der Angriffe aufs Gesicht, siehe AP 5.11).

**Dein Wunsch aus Sitzung 2: mehr Tiefe bei Helden und Karten.** Die drei Pakete unten bauen auf AP 5.1 (Messen)
auf und greifen AP 5.3, 5.4 und 5.7 auf. Grafiken entstehen erst danach (AP 1.2) – bis dahin mit Platzhaltern (AP 5.12).

**AP 5.9 – Chronik der Helden: Hintergründe ausarbeiten (S)**
- [x] Je Held eine Chronikseite: kurze Biografie (historisch belegt, Jahreszahlen), Epoche und Schauplatz, ein
  belegtes oder überliefertes Zitat, Spielstil in einem Satz („Leonidas hält die Linie und bestraft Angreifer“),
  Lieblingskarten, Beziehungen zu anderen Helden (Rivalen, Verbündete) und Stimmungsangaben für Stimme und Musik
  (AP 4.1, Stil-Bibel Abschnitt 8). *Umgesetzt in 1.8.0:* drei Absätze Biografie mit Jahreszahlen, Zitat mit Quelle
  (wo kein Wort des Helden selbst überliefert ist, ein Zeitgenosse oder eine Inschrift: Synesios über Hypatia, der
  Statuensockel Djosers für Imhotep; Dschingis Khans Satz ist als „zugeschrieben“ markiert, Ragnars Saga als Sage),
  Spielstil, drei Lieblingskarten, je drei Beziehungen (die Legendäre, ein Rivale oder Verbündeter unter den zehn
  Helden, ein künftiger Held aus AP 5.10) und Stimmung für Stimme und Musik.
- [x] Ablage als Daten in `model/lore.js`, angezeigt in der Heldenwahl (Knopf „Chronik“) und in der Großansicht des
  Helden im Match (Porträt lange drücken). Das „Archiv der Zeiten“ (Weitere Ideen 1) kann dieselben Daten nutzen.
- [x] Heldenfähigkeiten und Startdecks geprüft. Passt: Leonidas (*Phalanx* stärkt die Linie), Hypatia (*Sternenfunke*,
  zufällig wie ein Sternschnuppenregen), Imhotep (Heilkunst – er wurde als Gott der Heilkunst verehrt; Djoser als
  Bauherr), Khan, Boudicca, Nostradamus, Jeanne; die Startdecks bleiben. *Abweichungen, gesammelt für deine
  Entscheidung 13 – umgesetzt nach 1.8.0:* **Ragnar** ruft jetzt **Runensteine** (Heilrune, Feuerrune, Schutzrune,
  Kraftrune) statt „Totems“, die es in der nordischen Überlieferung nicht gibt; nur Namen und Texte, Engine-IDs
  `totem_*` und Spielstände bleiben, neue Motive stehen in AP 1.2. **Dandolo** – *Verborgene Klinge*
  passte eher zum Zehnerrat als zum blinden Dogen und Flottenführer; die Fähigkeit heißt jetzt **Rammsporn der
  Galeeren** (gleiche Wirkung). **Musashi** ist für den Kampf mit zwei Schwertern bekannt; Vorschlag für AP 5.11: eine Musashi-Karte mit
  Doppelschlag.
- Abnahme: 10 Chronikseiten – **bitte gegenlesen** (Heldenwahl → Chronik).

**AP 5.10 – Neue Helden (M)**

*Deine Vorgabe (Sitzung 2):* mehr Vielfalt innerhalb der Epochen, echte und wichtige Persönlichkeiten, aber nicht
die weltbekannten – so wie Perikles statt Alexander. Auswahlregeln für die Liste: historisch belegt, in ihrer Zeit
bedeutend, außerhalb von Fachkreisen wenig bekannt; Frauen und Männer, alle Weltregionen; nichts nach etwa 1700.

**Zeitalter statt Einzelhelden.** Die Helden werden zu Zeitaltern gruppiert. Jedes Zeitalter bekommt eine
Spielfeldhälfte (AP 1.8) und einen kleinen Pool gemeinsamer Zeitalterkarten (6–8), jeder Held zusätzlich
10 eigene Karten. Das bringt Vielfalt innerhalb einer Epoche (zwei Griechen spielen sich verschieden) und spart
Grafiken: eine Spielfeldhälfte je Zeitalter statt je Held. Rivalen und Verbündete schaffen Geschichten für
Kampagne und Dialoge (AP 4.3).

Vorschläge (Heldenfähigkeit je 2 Mana, Werte vorläufig, erst nach Simulation festlegen; *neu* = braucht ein
Schlüsselwort aus AP 5.4/5.5):

| Zeitalter | Persönlichkeit | Wer war das? | Heldenfähigkeit (Vorschlag) | Spielstil |
|---|---|---|---|---|
| Alter Orient & Ägypten *(bisher: Imhotep)* | **Enheduanna** (um 2285–2250 v. Chr.) | Hohepriesterin in Ur, Tochter Sargons von Akkad – die erste namentlich bekannte Autorin der Welt | **Tempelhymne:** Ergründet einen Zauber, er kostet 1 weniger *(neu: Ergründen)* | Zauber und Wissen |
| | **Ahhotep I.** (16. Jh. v. Chr.) | Königin von Theben im Befreiungskrieg gegen die Hyksos; die „goldenen Fliegen“, Ehrenzeichen für Tapferkeit, werden ihr zugeschrieben | **Goldene Fliege:** Ein eigener Diener erhält +1/+1 | Kleine Armee, die wächst |
| Griechische Antike *(bisher: Leonidas, Hypatia)* | **Perikles** (um 495–429 v. Chr.) | Führender Staatsmann Athens, Bauprogramm der Akropolis, Attischer Seebund | **Bauherr der Akropolis:** Ein eigenes Bauwerk erhält +2 Haltbarkeit; ohne Bauwerk 2 Rüstung *(neu: Bauwerke)* | Bauwerke, breites Feld |
| | **Epaminondas** (um 418–362 v. Chr.) | Thebanischer Feldherr, brach 371 v. Chr. bei Leuktra Spartas Vorherrschaft mit der „schiefen Schlachtordnung“ | **Schiefe Schlachtordnung:** Euer Diener ganz links erhält +2 Angriff in diesem Zug | Position zählt; **Rivale von Leonidas** |
| | **Artemisia I. von Karien** (5. Jh. v. Chr.) | Herrscherin von Halikarnassos, führte bei Salamis 480 v. Chr. eigene Schiffe | **Falsche Flagge:** Ein eigener Diener erhält Tarnung bis zu seinem nächsten Angriff *(neu: Tarnung)* | Täuschung, Hinterhalte |
| Rom *(neu)* | **Marcus Vipsanius Agrippa** (63–12 v. Chr.) | Feldherr hinter Augustus (Actium), Bauherr des ersten Pantheons und mehrerer Aquädukte | **Legionspioniere:** Ruft einen Pionier (1/2); solange er lebt, kosten Eure Bauwerke 1 weniger | Legionen und Bauwerke |
| | **Quintus Fabius Maximus** (um 280–203 v. Chr.) | Der „Zauderer“: zermürbte Hannibal durch Hinhalten statt offener Schlacht | **Cunctator:** Ein feindlicher Diener erhält Starre *(neu: Starre)* | Kontrolle, Zeit gewinnen |
| Persien & Steppe *(bisher: Dschingis Khan)* | **Schapur I.** (um 215–270) | Sasanidischer Großkönig, nahm 260 den römischen Kaiser Valerian gefangen | **Panzerreiter:** Ruft einen Kataphrakten (2/1, Vorstoß), höchstens einer zugleich *(neu: Vorstoß)* | Schwere Reiterei; Rivale Roms |
| | **Mandukhai Khatun** (um 1449–1510) | Regentin, einte die zerfallenen Mongolenstämme erneut und zog selbst in die Schlacht | **Stammesbündnis:** Habt Ihr 3+ Diener, erhalten alle +1 Leben; sonst einer +1/+1 | Breite statt Pfeile |
| Afrika *(neu)* | **Amanirenas** (1. Jh. v. Chr.) | Kandake (Königin) von Kusch, führte 25–21 v. Chr. Krieg gegen Rom und erbeutete den Bronzekopf des Augustus | **Kandake:** 1 Schaden an einen feindlichen Diener; stirbt er, zieht eine Karte | Gezielte Schläge |
| | **Askia Muhammad I.** (reg. 1493–1528) | Herrscher des Songhai-Reichs, machte Timbuktu zur Stadt der Gelehrten | **Gelehrte von Timbuktu:** Ergründet eine Karte aus Eurem eigenen Deck *(neu: Ergründen)* | Auswahl statt Zufall |
| Indien *(neu)* | **Raja Raja Chola I.** (reg. 985–1014) | Herrscher der Chola, baute den Brihadisvara-Tempel in Thanjavur, Flottenzüge bis Sri Lanka | **Tempelstadt:** Euer nächstes Bauwerk in diesem Zug kostet 2 weniger; sonst 2 Rüstung *(neu: Bauwerke)* | Bauwerke, Flotte |
| | **Rani Durgavati** (1524–1564) | Königin der Gond, verteidigte ihr Reich gegen das Mogulreich | **Elefantenwacht:** Ein eigener Diener erhält Schildwall und +1 Leben | Verteidigung |
| China, Korea, Japan *(bisher: Musashi)* | **Fu Hao** (13. Jh. v. Chr.) | Feldherrin und Priesterin der Shang-Dynastie; ihr Grab in Anyang wurde 1976 unversehrt gefunden | **Orakelknochen:** Seht die oberste Karte Eures Decks an, legt sie oben oder unten hin; ein Diener +1 Angriff in diesem Zug | Planung, frühe Angriffe |
| | **Seondeok von Silla** (reg. 632–647) | Erste regierende Königin Koreas, ließ das Observatorium Cheomseongdae bauen | **Sternwarte:** Seht die obersten 2 Karten Eures Decks an, eine davon kommt unter das Deck | Planung, Kombos |
| | **Hōjō Masako** (1157–1225) | Die „Nonnen-Shōgun“: lenkte nach dem Tod ihres Mannes das Kamakura-Shogunat | **Rede an die Vasallen:** Ein eigener Diener erhält +1/+1 und Schildwall bis zu Eurem nächsten Zug | Gefolgschaft, Treue |
| Byzanz & islamische Welt *(neu)* | **Anna Komnene** (1083–1153) | Byzantinische Prinzessin, Ärztin und Historikerin, schrieb die „Alexiade“ | **Alexiade:** Ergründet eine Karte, die in dieser Partie schon gespielt wurde *(neu: Ergründen)* | Chronik-Mechanik |
| | **Fatima al-Fihri** (9. Jh.) | Gründete 859 in Fès die al-Qarawiyyin, die als älteste bestehende Universität gilt | **Haus des Wissens:** Ergründet ein Bauwerk, es kostet 1 weniger *(neu: Bauwerke)* | Bauwerke, Wissen |
| | **Baibars** (um 1223–1277) | Mamlukensultan, schlug 1260 bei Ain Dschalut die Mongolen | **Mamlukenreiter:** Ein eigener Diener erhält Vorstoß *(neu: Vorstoß)* | Gegenangriff; **Rivale von Dschingis Khan** |
| Europäisches Mittelalter *(bisher: Boudicca, Ragnar, Jeanne, Dandolo)* | **Olga von Kiew** (um 890–969) | Regentin der Kiewer Rus, rächte ihren Mann mit List an den Drewljanen | **Olgas Rache:** 1 Schaden an einen feindlichen Diener, 2 wenn in diesem Zug ein eigener Diener gestorben ist | Vergeltung |
| | **Auðr die Tiefsinnige** (9. Jh.) | Führte laut Landnahmebuch ihre Sippe nach Island und verteilte dort Land an ihr Gefolge | **Landnahme:** Ruft einen Siedler (0/2), der zu Beginn jedes Eurer Züge +1 Angriff erhält | Langsames Wachstum; Wikinger neben Ragnar |
| | **Mathilde von Tuszien** (1046–1115) | Markgräfin, auf ihrer Burg Canossa trafen sich 1077 Kaiser und Papst | **Canossa:** Ein Diener (beliebig) kann bis zu Eurem nächsten Zug weder angreifen noch angegriffen werden | Diplomatie, Zeit kaufen |
| | **Jan Žižka** (um 1360–1424) | Hussitischer Feldherr, nie besiegt, kämpfte mit der Wagenburg – zuletzt erblindet | **Wagenburg:** Ruft einen Kriegswagen (0/3, Schildwall) | Unüberwindbare Verteidigung |
| | **Bertrand du Guesclin** (um 1320–1380) | Konnetabel von Frankreich, holte im Hundertjährigen Krieg Burg um Burg zurück | **Kleinkrieg:** 2 Schaden an einen bereits beschädigten Diener | **Verbündeter von Jeanne** |
| Renaissance *(bisher: Nostradamus)* | **Federico da Montefeltro** (1422–1482) | Söldnerführer und Herzog von Urbino, besaß eine der größten Bibliotheken seiner Zeit | **Condotta:** Ruft einen Söldner (3/2); nächster Zug 1 Mana weniger *(neu: Belastung)* | Kaufkraft gegen Tempo |
| Amerika *(neu)* | **Nezahualcóyotl** (1402–1472) | Dichterkönig von Texcoco, baute Dämme und das Aquädukt von Chapultepec | **Blumenlied:** Stellt bei allen eigenen Dienern 1 Leben wieder her | Ausdauer, breite Heilung |
| | **Ix Wak Chan Ajaw** („Lady Six Sky“, um 682–741) | Maya-Herrscherin von Naranjo, führte zahlreiche Feldzüge | **Sternenkrieg:** Ein eigener Diener +2 Angriff in diesem Zug; tötet er einen Diener, zieht eine Karte | Angriff mit Belohnung |

- [x] Du wählst aus. *Entschieden (Sitzung 5): mein Vorschlag für Welle 1 (6 Helden, größtmögliche Vielfalt):*
  Perikles (Griechenland), Marcus Agrippa (Rom), Amanirenas (Kusch), Anna Komnene (Byzanz), Nezahualcóyotl (Texcoco),
  Hōjō Masako (Japan).
  Welle 2 als Rivalen und Gegenstücke: Epaminondas, Baibars, Jan Žižka, Fabius Maximus, Fu Hao, Mandukhai –
  *von dir bestätigt (Entscheidung 15, Rückmeldung zu 1.9.0), umgesetzt in 1.11.0 (Sitzung 8).*
- [x] **Engine: Heldenfähigkeiten datengetrieben.** *Umgesetzt in 1.9.0:* Jeder Held trägt seine Fähigkeit als Daten
  (`ability:{effects,target}` in `data.js`) – dieselben Effekte wie Karten. `E.power` hat keinen `switch` über Helden mehr,
  `E.canPower` leitet die Bedingungen aus den Effekten ab (Platz zum Rufen, ein fehlender Runenstein, etwas zum Ergründen,
  ein sichtbarer Diener als Ziel), die Suche nach tödlichen Zügen erkennt schadende Fähigkeiten an den Effekttypen.
  *Geprüft:* Für die zehn bisherigen Helden ist der Balance-Bericht nach dem Umbau **byte-gleich** (2 200 Partien, gleicher
  Startwert) – der Umbau ändert kein Verhalten. Ein Test stellt sicher, dass `engine.js` keine Helden-ID mehr abfragt.
- [x] **Zeitalter als Datenfeld:** `CHD.ages` (zehn Gruppen von „Alter Orient & Ägypten“ bis „Amerika“), Feld `age` je Held;
  `CHD.playable(karte, held)` lässt Karten mit gleichem `age` in Decks, Ergründen-Pools und Zufallsdecks zu – die
  Zeitalterkarten selbst kommen mit AP 5.11. Die Heldenwahl gruppiert die Helden nach Zeitalter (6 × 3 Kacheln, seit 1.11.0 mit 22 Helden 8 × 3).
- [x] **Bauwerke aus der Hand und neue Auslöser** (Vorgriff auf AP 5.5): Karten und Bauwerke können zu Zugbeginn (`start`)
  oder -ende (`end`) wirken, bei Heilung (`onHeal`, `allyHeal`), als Aura (`buffAura`, `buildingDiscount`); die
  Stufenpyramide nutzt jetzt denselben Mechanismus. Neue Effekte: Bauwerk verstärken, auf die Hand zurückschicken,
  vernichten, Zufallsschaden, Schlüsselwort verleihen, Gegner belasten, gezogene Karten verbilligen. Bossfähigkeiten neuer
  Missionen sind ebenfalls Daten (`effects`, `every`). Die KI bewertet Bauwerke nach Haltbarkeit, Wirkung, Aura und Schildwall.
- [x] **Welle 1 – sechs Helden**, je Chronikseite (Vorlage AP 5.9), 10 eigene Karten (4 Basis fürs Startdeck, 2 gewöhnlich,
  2 selten, 1 episch, 1 legendär), Startdeck, Kampagnenmission „Neue Chroniken“ (11–16, frei nach Mission 10),
  KI-Bewertung der neuen Mechaniken; Porträts als Monogramm-Medaillon und 63 Motive als Platzhalter (Prompts in
  `ungenutzte_assets/MOTIVE.md`). *KI-Persönlichkeit je Held: seit 1.10.0 (AP 5.8 Teil 2).*

  | Held | Zeitalter | Heldenfähigkeit (2 Mana) | Spielstil | Legendäre | Mission (Boss) |
  |---|---|---|---|---|---|
  | **Perikles** (um 495–429 v. Chr.) | Griechische Antike | *Bauherr der Akropolis:* Ruft einen Bürger (1/2), Euer schwächstes Bauwerk erhält +2 Haltbarkeit | Bauwerke (Lange Mauern, Pnyx zieht, Odeion ruft Bürger), breites Feld, *Scherbengericht* | Phidias errichtet die Athena Parthenos (Bauwerk, Eure Diener +1/+1) | Die Langen Mauern (Archidamos von Sparta) |
  | **Marcus Agrippa** (63–12 v. Chr.) | Rom | *Legionspioniere:* Ruft einen Pionier (1/3); solange er lebt, kosten Bauwerke 1 weniger | Legion und Ingenieure: Castra (+1/+1), Ballista, Thermen, Pantheon ergründet fremde Karten, *Testudo* | Vitruv: Bauwerke kosten 2 weniger, ergründet ein Bauwerk | Actium (die Flotte des Antonius) |
  | **Amanirenas** (1. Jh. v. Chr.) | Afrika | *Kandake:* 1 Schaden an einem zufälligen Feind; stirbt dadurch ein Diener, zieht eine Karte | Pfeile, Gift und Raubzüge: Bogenschützen mit Vermächtnis-Treffer, Tödliches Gift verleihen, Plünderung | Bronzekopf des Augustus (Zauber): vernichtet einen Diener, Gegner 2 Mana weniger | Die Tore von Syene (Gaius Petronius) |
  | **Anna Komnene** (1083–um 1153) | Byzanz & islamische Welt | *Alexiade:* Ergründet eine Karte, die in dieser Partie schon gespielt wurde | Chronik und Heilkunst: Warägergarde, Pantokrator-Spital, Griechisches Feuer, Chrysobull verbilligt | Alexios I. Komnenos: am Zugende eine zufällige schon gespielte Karte | Purpur und Pergament (der Kaisersohn Johannes) |
  | **Nezahualcóyotl** (1402–1472) | Amerika | *Blumenlied:* 2 Heilung für alle eigenen Charaktere | Heilen und Wachsen: Gärtner wird bei Heilung stärker, Aquädukt und Damm heilen, Adler- und Jaguarkrieger | Nezahualpilli: jede Heilung gibt einem Diener +1 Angriff | Der Damm im See (Maxtla von Azcapotzalco) |
  | **Hōjō Masako** (1157–1225) | China, Korea, Japan | *Rede an die Vasallen:* Ein befreundeter Diener erhält +1 Leben und Schildwall | Gefolgschaft: Gokenin stärken einander im Tod, *Treueschwur* für Schildwall-Diener, Hachiman-Schrein | Minamoto no Yoritomo: Vermächtnis +2/+2 und Schildwall für alle | Der Krieg von Jōkyū (Kaiser Go-Toba) |

  Werte nach zehn Messrunden (20–40 Partien je Paarung) und zwei vollen Läufen. *Was die Messungen verändert haben:*
  Amanirenas' erste Fähigkeit (1 Schaden an einem Diener nach Wahl, Karte bei Tod) gewann 93 % mit Startdeck – wie
  Hypatia in 1.5.0 –, jetzt trifft sie einen zufälligen Feind; den größten Rest machte die Karte von *Pfeilregen* aus
  (Startdeck 61 → 49 %). Perikles verlor mit „Bauwerk +2, sonst 2 Rüstung“ 82 % seiner Partien (reine Verteidigung
  gewinnt nicht, wie Leonidas in 1.5.0) und ruft jetzt Bürger. Bauwerke ohne Angriff lohnten sich zu ihren
  ersten Kosten nicht (−5 bis −20 Punkte „gewinnt, wenn gezogen“) und wurden 1–2 Mana billiger.
  **Angepasst bei den bisherigen Helden**, weil das größere Feld sie verschob: Imhotep *Nilschülerin* 1/4 (1/3),
  *Tempelärztin* heilt 3 (4); Dandolo *Handelsgesandter* 3/5 (3/4), *Dogenklinge* 3 Mana (2), *Arsenal von Venedig*
  5 Mana (4).
- [x] **Welle 2 – sechs Helden** *(1.11.0, Sitzung 8)*: Rivalen und Gegenstücke, je einer pro Zeitalter, das bisher nur
  einen Helden hatte oder einen Rivalen brauchte; je Chronikseite, 10 eigene Karten (Seltenheiten wie Welle 1), Startdeck,
  Mission 17–22 (einfach angehängt, Entscheidung 14), KI-Persönlichkeit und Monogramm-Porträt; 60 Motive als Platzhalter
  mit Bildidee in `MOTIVE.md`. Neue Regeln dafür siehe Projektaufbau (Diener ganz links, Bündnis-Bedingung, Vorstoß
  verleihen, Ergründen aus dem eigenen Deck, Ziele in Starre).

  | Held | Zeitalter | Heldenfähigkeit | Spielstil, KI | Legendäre | Mission (Boss) |
  |---|---|---|---|---|---|
  | **Epaminondas** (um 418–362 v. Chr.) | Griechische Antike, **Rivale von Leonidas** | *Schiefe Schlachtordnung* (2): Euer Diener ganz links erhält +1/+1 | Ein Flügel, fünfzig Reihen tief: Heilige Schar, Böotarch, Megalopolis stärken den Diener ganz links; aggressiv | Pelopidas: der Diener ganz links erhält Doppelschlag und Göttliche Gunst | Leuktra (Kleombrotos von Sparta) |
  | **Fabius Maximus** (um 280–203 v. Chr.) | Rom | *Cunctator* (**3 Mana**): 1 Schaden an einem feindlichen Diener, er gerät in Starre | Zeit gewinnen: Starre, Schildwall, Rüstung, *Rückeroberung von Tarent* übernimmt einen Diener in Starre; defensiv | Marcellus, Schwert Roms: vernichtet einen Diener in Starre | Der Zauderer (Hannibal Barkas, Kriegselefanten) |
  | **Mandukhai Khatun** (um 1449–1510) | Persien & Steppe | *Stammesbündnis* (2): ab 3 Dienern alle +1 Leben, sonst ein Stammeskrieger (1/2) | Breite statt Pfeile: Stammeskrieger, Herdfeuer, Schwarzes Banner, Batu Möngke wächst mit dem Feld; kombinierend | Wiedervereinigung der Mongolen (Zauber): füllt das Feld, alle +1/+1 | Die Schlacht von Tas Bürd (die Oiraten) |
  | **Baibars** (um 1223–1277) | Byzanz & islamische Welt, **Rivale von Dschingis Khan** | *Mamlukenreiter* (2): ein befreundeter Diener erhält +1 Angriff und Vorstoß – auch frisch ausgespielt greift er sofort an | Gegenangriff und Belagerung: Mamlukenreiter, Ain Dschalut, Manjaniq gegen Bauwerke; aggressiv | Qalawun: Diener mit Vorstoß +2/+2 und Göttliche Gunst | Ain Dschalut (Kitbuqa Noyan) |
  | **Jan Žižka** (um 1360–1424) | Europäisches Mittelalter | *Wagenburg* (2): ruft einen Kriegswagen (1/2, Schildwall) | Wagenburg: Kriegswagen, Hakenbüchsen, *Salve* je Schildwall-Diener, *Prager Fenstersturz*; defensiv | Jan Hus: Vermächtnis drei Taboriten (2/3, Schildwall) | Sudoměř (die Eisernen Herren) |
  | **Fu Hao** (gest. um 1200 v. Chr.) | China, Korea, Japan | *Orakelknochen* (2): seht die obersten drei Karten Eures Decks an, eine davon auf die Hand | Planung und frühe Angriffe: Yue-Axt, Streitwagen, Knochenwahrsager, Ahnentempel; kombinierend | Wu Ding: zweimal Orakel, die Karten kosten 2 weniger | Der Feldzug gegen die Qiang (der Fürst der Qiang) |

  **Zeitalterkarten der Welle 2** (je sieben, `hero` = `age`, nur für die zwei Helden des Zeitalters):
  *Rom* (Agrippa, Fabius): Gladiator, Senator der Kurie, Centurio, Triumphzug, Via Appia, Vestalin am ewigen Feuer, Pax Romana ·
  *Persien & Steppe* (Khan, Mandukhai): Pferdehirtin, Schamane des Ewigen Himmels, Parthischer Schuss, Garde der
  Unsterblichen, Pfeilsturm der Steppe, Königsstraße, Persepolis · *Byzanz & islamische Welt* (Anna, Baibars): Akrit der
  Grenzmark, Gelehrter im Haus der Weisheit, Tribut in Goldbyzantinern, Arzt des Bimaristan, Theodosianische Mauern, Hagia
  Sophia, Ibn an-Nafis.

  *Was die Messungen verändert haben* (drei Messrunden mit 20–40 Partien je Paarung, dazu ein schneller Einzelheldentest
  mit 840 Partien je Variante): **Fabius** gewann mit „Starre + 1 Rüstung“ nur 19,5 % mit Startdeck – reine Verzögerung
  gewinnt nicht, wie bei Leonidas und Perikles. Mit „1 Schaden + Starre“ stieg er auf 65 %, auch nur gegen Diener; erst
  **3 Mana** für die Fähigkeit (wie der Zauderer: langsam, aber stetig) bringt ihn in die Mitte. **Žižka** schwankte mit dem
  Kriegswagen am stärksten: 0/3 → 37 %, 1/3 → 66 %, jetzt 1/2. **Baibars**, **Fu Hao** und **Epaminondas** begannen bei
  60–63 % (Ain Dschalut, Yue-Axt 2/3, Thebanischer Phalangit) und wurden leicht abgeschwächt. Die byzantinischen
  Zeitalterkarten drückten **Anna** mit Zufallsdeck von 48 auf 42 % – Hagia Sophia, Theodosianische Mauern und der Arzt des
  Bimaristan sind deshalb stärker als geplant. *Nach den vollen Läufen:* Žižka 57,7 % mit Startdeck → Hauptmann der
  Taboriten 2/3, danach doch wieder 2/4, dafür Dreschflegelbauer (62,8 % „gewinnt, wenn gezogen“) 2 statt 1 Mana; Mandukhai 53,8 % mit Zufallsdeck →
  Ruf der Tumen 3 Mana, Zwilling 2/1; Baibars 53,1 % → Qutuz und Qalawun je −1 Angriff.
- Abnahme: Simulationslauf (AP 5.1) mit allen Helden, jeder neue Held 47–53 % gegen das Feld. *✓ Gemessen (voller Lauf, 200 Partien je Paarung, 54 400 Partien in 15 min):* die sechs neuen Helden mit Startdeck
  47,6 (Agrippa) bis 51,5 % (Amanirenas), mit Zufallsdeck 47,6 (Agrippa) bis 51,4 % (Amanirenas); alle 16 Helden in beiden
  Deckarten 47,6–52,8 %. Fünf von 240 Paarungen liegen außerhalb 40/60 (siehe Qualitätsziele) – der deutlichste Konter ist
  Amanirenas gegen Jeanne (74/26): Ihr Pfeil trifft die 1/1-Rekruten und zieht dabei Karten. Neue Karten 42,3 % (Aquädukt
  von Chapultepec) bis 60,1 % (Kataphrakt, knapp über der 60-%-Grenze aus AP 5.11) „gewinnt, wenn gezogen“.
  Vorher/nachher: [`balance/BERICHT-1.8.0.md`](balance/BERICHT-1.8.0.md) → [`balance/BERICHT-1.9.0.md`](balance/BERICHT-1.9.0.md).
- Abnahme Welle 2: jeder neue Held 47–53 % gegen das Feld. *Gemessen (drei volle Läufe, je 101 200 Partien in 27 min;
  [`balance/BERICHT-1.10.0.md`](balance/BERICHT-1.10.0.md) → [`balance/BERICHT.md`](balance/BERICHT.md)):*

  | Held | Startdeck | Zufallsdeck | KI | schwerste / leichteste Paarung (Startdeck) |
  |---|---|---|---|---|
  | Epaminondas | 50,7 % | 52,3 % | aggressiv | Fabius 36,5 % / Imhotep 61,0 % |
  | Fabius Maximus | 48,9 % | 48,9 % | defensiv | Leonidas 34,5 % / Epaminondas 63,5 % |
  | Mandukhai | 49,8 % | 52,8 % | kombinierend | Khan 32,0 % / Fabius 62,0 % |
  | Baibars | 51,4 % | 51,4 % | aggressiv | Fabius 38,5 % / Ragnar 61,5 % |
  | Jan Žižka | 46,6 % ✗ | 50,7 % | defensiv | Nezahualcóyotl 34,5 % / Jeanne 64,0 % |
  | Fu Hao | 49,5 % | 49,8 % | kombinierend | Khan 31,0 % / Imhotep 66,5 % |

  ✓ bis auf Žižka mit Startdeck (0,4 Punkte unter der Grenze, im Zufallsfehler ±1,5). Von den bisherigen Helden liegen Musashi
  (Startdeck 53,9 %) und Hypatia (Zufallsdeck 46,5 %) knapp außerhalb; Rivalen wirken: Epaminondas schlägt Leonidas 59,5/40,5,
  Baibars gegen Khan 52/48 (Startdecks).

**AP 5.11 – Karteneffekte überarbeiten und Set vergrößern (L)**
- [ ] Alle 140 Karten durchgehen: doppelte Effekte zusammenlegen oder unterscheiden (z. B. Andraste/Lagertha,
  Marco/Herodot), langweilige „nur Werte“-Karten mit kleinen Regeln versehen, Namen und Texte historisch schärfen,
  Schlüsselwörter nach AP 5.4. *Teil 1 in 1.10.0 – Dopplungen entzerrt:* Andraste und Lagertha sind seit 1.7.0
  verschieden; **Herodot** ergründet jetzt Zeitalterkarten aller Zeitalter (das Ergründen gespielter Karten bleibt Anna
  Komnene), die **Thermen des Agrippa** heilen nur noch den Helden (vorher wie das Aquädukt von Chapultepec). *Offen:* die
  „nur Werte“-Karten (z. B. Wandernder Händler, Veteran, Steinschleuderer) – viele davon liegen in allen Startdecks, eine
  Änderung verschiebt die ganze Startdeck-Balance; das passt besser in eine eigene Runde.
- [x] Neue Karten in Wellen statt auf einmal: Welle 1 ≈ 60 Karten (je Held 4, dazu 20 neutrale, erste Bauwerke
  aus AP 5.5), Welle 2 ≈ 90 Karten („Wunder der Welt“, AP 5.7), danach je neuem Held 10. Ziel nach Welle 2:
  ≈ 300 Karten. *Welle 1 in 1.10.0 – 56 Karten nach dem Plan aus Sitzung 6* (je Held zwei statt vier, dafür
  Zeitalterkarten): je Held zwei, je sieben **Zeitalterkarten** für die drei Zeitalter mit mehreren Helden und drei
  neutrale Weltwunder; alle mit festen IDs hinten angehängt und Platzhalter-Motiv (Prompts in `MOTIVE.md`).
  Zeitalterkarten gehören zum Zeitalter (`hero` = `age` = z. B. `griechen`) und stehen nur dessen Helden offen –
  Sammlung, Deckbau, Zufallsdecks und Ergründen kennen sie. Neue Regeln dafür: siehe AP 5.5 und Projektaufbau.

  | Held / Zeitalter | neue Karten (Werte nach den Messrunden) |
  |---|---|
  | Leonidas | Spartiat der Dreihundert 3: 2/4 Schildwall, wächst bei Schaden · Engpass der Thermopylen 3: Starre für alle Feinde mit 3+ Angriff |
  | Hypatia | Astronomin des Museions 2: 2/3 Arkaner Fokus +1 · Kommentar zu Diophant 2: 2 Schaden, stirbt das Ziel: Ergründen (Zauber) |
  | Imhotep | Priesterin der Sachmet 3: 3/3 heilt 3 · Ka-Statue 2: Bauwerk 0/6, Schildwall, Vermächtnis 5 Heilung |
  | Dandolo | Galeerenschmied 2: 2/2, Waffe +1/+1 · Plünderung Konstantinopels 6: vernichtet einen Diener, Ergründen (fremder Held) |
  | Khan | Jurtenlager 3: Bauwerk, ruft jeden Zug einen Steppenreiter (1/1, Sturmangriff) · Kurultai 4: drei Steppenreiter |
  | Boudicca | Barde der Icener 2: 2/2, Held +2 Angriff · Sichelwagen 5: 3/3 Sturmangriff, 1 Schaden an allen Feinden |
  | Nostradamus | Almanach der Quatrains 1: zieht 1, kostet 1 weniger · Horoskop der Königin 3: Ergründen, −2 Kosten, 2 Schaden am eigenen Helden |
  | Jeanne | Pilgerin aus Domrémy 1: 1/2 ruft einen Rekruten · Die Weihe von Reims 4: alle Diener Göttliche Gunst |
  | Ragnar | Runenmeisterin 2: 1/3 ruft einen Runenstein · Berserkergang 1: +3 Angriff und Plünderung |
  | Musashi | **Schwertschüler aus Kokura 4: 3/4 Doppelschlag** (dein Wunsch aus AP 5.9) · Niten Ichi-ryū 2: +1 Angriff und Doppelschlag |
  | Perikles | Steinmetz vom Pentelikon 2: 1/3, Bauwerk +2 oder Bürger · Schatz des Seebunds 3: zieht 1 + 1 je Bauwerk |
  | Agrippa | Aquilifer 3: 2/3, andere Diener +1 Leben · Harpax 4: übernimmt einen Diener mit höchstens 2 Angriff |
  | Amanirenas | Pfeilmacher aus Meroë 2: 2/3, 1 Schaden an zufälligem Feind · Gift der Wüstenviper 3: zwei Diener Tödliches Gift, zieht 1 |
  | Anna Komnene | Spitalarzt des Pantokrator 2: 1/3 heilt Diener am Zugende · Chronist am Kaiserhof 6: 5/6, 1 billiger je drei gespielte Karten |
  | Nezahualcóyotl | Dichter von Texcoco 2: 2/3 heilt alle um 1 · Chinampa 2: Bauwerk, jeden Zug ein Diener +1/+1 |
  | Hōjō Masako | Jitō-Verwalter 2: 2/3 verleiht Schildwall · Siegel des Shikken 2: Schildwall-Diener erhalten Göttliche Gunst, zieht 1 |
  | **Griechische Antike** (Leonidas, Hypatia, Perikles) | Olympionike 4: 3/3 Sturmangriff, Göttliche Gunst · Rhapsode 2: Ergründen (Zeitalter) · Marathonläufer 2: 2/1 Sturmangriff, Vermächtnis zieht · Orakel von Delphi 3: zweimal Ergründen (eigener Held) · Leuchtturm von Pharos · Akropolis · Bibliothek von Alexandria |
  | **Europäisches Mittelalter** (Dandolo, Boudicca, Jeanne, Ragnar) | Knappe 1: Diener +1 Angriff · Armbrustschütze 3: 2 Schaden · Mönch von Cluny 3: Ergründen (Zeitalter) · Hansekogge 4: zieht 2, Belastung 1 · Turnierritter 4: 3/3 Vorstoß, Göttliche Gunst · Burgfried 2: Bauwerk 0/6, Schildwall, 2 Rüstung je Zug · Tribok 4: Bauwerk, 3 Schaden an feindlichem Diener oder Bauwerk |
  | **China, Korea, Japan** (Musashi, Masako) | Ashigaru 1: 2/1 Vorstoß · Mandarin-Gelehrter 3: Ergründen (Zeitalter) · Teezeremonie 2: 4 Heilung, zieht 1 · Hwacha-Salve 3: fünfmal 1 Schaden · Schildkrötenschiff 5: 3/7 Schildwall, trifft zurück · Terrakotta-Armee 5: drei 2/2 mit Schildwall · Große Mauer 2: Bauwerk 0/7 |
  | Neutral | Kolosseum · Hängende Gärten · Pyramiden von Gizeh (siehe AP 5.5) |

- [x] Budgetformel und Simulation entscheiden die Werte (AP 5.7): keine Welle ohne Balance-Lauf und KI-Bewertung.
  *Welle 1:* Werte in sechs Messrunden (40 Partien je Paarung) und drei vollen Läufen (200 je Paarung) festgelegt; die KI
  bewertet alle neuen Regeln (Auslöser, Auren, Kostensenkungen, Bauwerke nach Wirkung). Eine feste Budgetformel gibt es
  noch nicht – sie kommt mit Welle 2 (AP 5.7). *Was die Messungen verändert haben:* Steinmetz (65 %, +12,9),
  Sichelwagen, Plünderung Konstantinopels und Turnierritter wurden schwächer; Pharos (−12,5), Burgfried, Ka-Statue,
  Große Mauer und die drei Weltwunder billiger oder stärker. Durch die klügere Bauwerk-Bewertung der KI stieg Perikles
  mit Startdeck auf 56–58 % – seine *Rede auf die Gefallenen* kostet jetzt 3 statt 2 Mana (mit +1/+1 statt +1/+2 fiel er
  auf 43 %). **Amanirenas gegen Jeanne** (1.9.0: 74/26): Kandake zieht keine Karte mehr, wenn sie einen beschworenen
  Diener (Rekrut, Runenstein …) tötet – jetzt 56/44. Kleine Korrekturen bei bisherigen Karten: Nilschülerin 1/3 (1/4),
  Maskierte Wache 3/3 (3/4), Rōnin 3/5 (3/4), Pilumwerfer 1/2 (1/1), Kopistin der Chronik 1/3 (1/2), Kataphrakt 4/6 (5/6,
  vorher 63 %), Wächter des Weltenbaums 6/9 (7/9, vorher 61 %).
- Abnahme: je Welle Simulationsbericht, Legendäre ≤ 55 % „gewinnt, wenn gezogen“, keine Karte über 60 %.
  *✓ Welle 1 (voller Lauf, 54 400 Partien, 25 min; Bericht [`balance/BERICHT.md`](balance/BERICHT.md), vorher
  [`balance/BERICHT-1.9.0.md`](balance/BERICHT-1.9.0.md)):*

  | Messung | 1.9.0 | 1.10.0 |
  |---|---|---|
  | Karten | 213 | **269** |
  | Helden mit 47–53 % (Start- / Zufallsdecks) | 16 / 16 | **16 / 15** (Boudicca 53,2 %) |
  | Spanne gegen das Feld (Start- / Zufallsdecks) | 47,6–51,7 / 47,6–52,8 % | **47,6–52,7 / 47,6–53,2 %** |
  | Paarungen innerhalb 40/60 (Start- / Zufallsdecks) | 117 / 118 von 120 | **114 / 119** |
  | Beginner gewinnt (Start- / Zufallsdecks) | 45,7 / 49,8 % | **46,2 / 50,9 %** |
  | Legendäre als Gruppe „gewinnt, wenn gezogen“ | 52,6 % | **52,9 %** |
  | Höchste Karte „gewinnt, wenn gezogen“ | 61,7 % (Wächter des Weltenbaums; Kataphrakt 60,1 %) | **59,7 %** (Phalanxveteran) |
  | Neue Karten „gewinnt, wenn gezogen“ | 42,3–60,1 % | **41,1–57,5 %** |
  | KI: Angriffe aufs Gesicht, aggressiv / kombinierend / defensiv (Zufallsdecks) | – | **50,7 / 45,1 / 40,1 %** (Startdecks 46,0 / 42,4 / 38,8 %) |
  | KI: Angriffe auf Bauwerke (Zufallsdecks) | – | **6,7–9,1 %** |
  | Züge je Partie (Median, Start- / Zufallsdecks) | 23 / 20 | 23 / 20 |

**AP 5.12 – Platzhalter für fehlende Grafiken (S)** – *von dir freigegeben (Sitzung 2): erst mit Platzhaltern.*
Regeln, Balance und KI lassen sich ohne Bilder bauen und testen; die Grafiken (AP 1.2) kommen danach gesammelt.
So, dass es im Spiel nicht kaputt aussieht:
- [x] Datenfeld `art` je Karte und Held; fehlt es, zeichnet der Renderer einen **gestalteten Platzhalter** statt
  eines leeren Fensters: Epochenfarbe des Helden, großes Symbol (Helden-Icon, Kartentyp, Bauwerk-Turm), Name in
  Cinzel, kleiner Vermerk „Motiv folgt“. Neue Helden bekommen ein Medaillon mit Monogramm statt Porträt.
- [x] Eine automatisch erzeugte Liste `ungenutzte_assets/MOTIVE.md` mit allen fehlenden Motiven, Größe und
  fertigem Prompt (Prompt-Anfang aus AP 1.2 + Kartentext + Epoche), damit du die Bilder in Stapeln erzeugen kannst.
- [x] Sichtprüfung zählt Platzhalter, damit sichtbar bleibt, wie viele Motive noch fehlen; ein Platzhalter darf
  nie einen Test brechen.
- Abnahme ✓: Ein Deck nur aus Karten ohne Motiv ist spielbar (Test: sechs KI-Partien bis zum Ende) und lesbar
  (Screenshot im Handyformat: Hand, Plaketten mit Tarnung/Bannung/Plünderung/Gift, Großansicht, Manasäule mit Belastung).
  *Umgesetzt in 1.8.0:* `D.missingArt` kennzeichnet Karten ohne Atlasfeld oder mit gezeichnetem Motiv (`'@pyramid'`);
  `R.tile` zeichnet dann ein Medaillon in der Epochenfarbe des Helden mit Heldenzeichen (neutral: ⚔ Diener, ✦ Zauber,
  ♜ Bauwerk), „Motiv folgt“ und in der Großansicht den Namen; Helden ohne Porträt bekommen ein Monogramm (auch im DOM
  über `R.heroStyle`). `node werkzeuge/motive.js` schreibt die Liste mit Größe (724 × 724 für ein Atlasfeld 362 × 362)
  und Prompt; ein Test prüft, dass sie aktuell ist. *Gemessen:* **14 Motive fehlen** (13 neue Karten und die
  Stufenpyramide), 0 Heldenporträts (`sichtpruefung/messwerte.json` → `platzhalter`). *Stand 1.9.0:* **77 Karten und 6 Heldenporträts** (die
  60 Karten und drei Spielsteine der neuen Helden kamen hinzu; Prompts mit Bildidee in `MOTIVE.md`). *Stand 1.10.0:*
  **135 Karten und 6 Heldenporträts** (dazu 56 Karten der Kartenwelle und zwei Spielsteine, alle mit Bildidee). *Stand 1.11.0:*
  **225 Karten und 12 Heldenporträts** (81 Karten und neun Spielsteine der Welle 2, alle mit Bildidee).

### Phase 6 – Spielmodi und Motivation (fortlaufend)

- [ ] **AP 6.1 Kolosseum als echter Draft:** Held aus 3, dann 30-mal 1 aus 3 Karten; Lauf endet bei 3 Niederlagen
  oder 12 Siegen; Belohnung nach Siegen. Nur App-Ebene.
- [ ] **AP 6.2 Schlacht mit Offline-Rangliste:** Ränge aus Stein, Bronze, Silber, Gold und Lapis mit Sternen; Saisonbelohnungen.
- [ ] **AP 6.3 Aufgaben:** tägliche Aufgaben mit Rotation und einmal Neuwürfeln pro Tag, Login-Bonus, Heldenstufen
  mit Belohnungen (Gold, Skins, goldene Karten).
- [ ] **AP 6.4 Kampagne 2.0:** Kapitel mit kurzen Story-Szenen und Sprechblasen, Bosse mit eigenen Fähigkeiten,
  **Belagerungsmissionen mit Lunten-Countdown**, gelegentliche Kartenrätsel.
- [ ] **AP 6.5 Tutorial:** die ersten drei Partien geführt.
- [ ] **AP 6.6 Eigenständige Mechaniken:** Epochen-Synergien (Bonus bei drei Karten derselben Ära), Relikte als
  Kartentyp (Atlasfelder für Spartanerschild und Astrolabium sind schon gemalt), Chronik-Ereignisse für beide Spieler.

### Phase 7 – Release-Qualität (M)

- [ ] Geräte-Testmatrix: schwach/mittel/stark, 60/90/120 Hz, Seitenverhältnisse 16:9 bis 21:9.
- [ ] Einstellungen: Grafikqualität (Partikel, Auflösung), Textgröße, Farbsehschwäche-Modus, reduzierte Bewegung.
- [ ] Lokales Fehlerprotokoll und automatische Spielstand-Sicherungen.
- [ ] Optional Play-Store: eigener Upload-Schlüssel, Datenschutzerklärung, Store-Grafiken, Name „Aeterna“ auf Markenkonflikte prüfen.

---

## Weitere Ideen

Zusätzliche Vorschläge, die zu Aeterna passen und Spaß machen – zum Einsortieren, wenn die Phasen oben stehen:

1. **Archiv der Zeiten (Lexikon):** Jede gesammelte Karte schaltet einen kurzen, echten Geschichtsfakt frei
   („Wusstest du …?“). Die Sammlung wird zum Nachschlagewerk; Sammel-Meilensteine belohnen mit Kartenrücken.
2. **Historische Schlachten als Rätsel:** Thermopylen 480 v. Chr., Hastings 1066, Orléans 1429 – feste Aufstellung,
   „Gewinne in diesem Zug“. Kurz, knifflig, lehrreich.
3. **Zwei Spieler an einem Gerät:** Hotseat-Modus mit verdeckter Hand beim Weitergeben – Mehrspieler ganz ohne Internet.
4. **Zeitanomalie der Woche:** Jede Kalenderwoche eine Sonderregel offline (z. B. „Alle Diener kosten 1 weniger“,
   „Nur Bauwerke und Zauber“, „Zufällige Helden“) mit eigener Belohnung.
5. **Heldenmeisterschaft:** Stufen je Held schalten Porträtrahmen, zusätzliche Stimmzeilen und Spielfeldhälften frei.
6. **Deck-Codes:** Decks als kurzen Text teilen und importieren.
7. **Chronik-Moment:** Nach besonderen Zügen (z. B. 10+ Schaden in einem Zug) bietet das Spiel ein Bild des Moments zum Teilen an.
8. **Komfort:** Hinweis beim Zug beenden, wenn noch Mana oder Angriffe übrig sind (abschaltbar); Rückgängig beim Sortieren der Hand.
9. **Tagesduell mit festem Startwert:** Jeden Tag dieselbe Ausgangslage, Bestwert lokal speichern.
10. **Handwerk inszenieren:** Herstellen und Entzaubern als Schmiede-Animation mit Funken statt Text-Bestätigung.

---

## Deine Ideensammlung – wo sie im Plan steht

| Bereich aus deiner Liste | Arbeitspakete |
|---|---|
| Name „Aeterna“ | AP 0.3 |
| Textfreies Hauptmenü-Bild mit interaktiven Knöpfen und Animationen | AP 1.3 (Bild liegt in `ungenutzte_assets/ui/`) |
| Mehr Karten | AP 5.7, AP 5.11 (Wellen bis ≈ 300 Karten) – Welle 1 ✓ in 1.10.0 (56 Karten), mit Welle 2 der Helden ✓ in 1.11.0 350 Karten |
| Legendäre aufwerten | AP 5.3 – ✓ in 1.7.0 |
| Hintergründe der Helden ausarbeiten | AP 5.9 – ✓ in 1.8.0 |
| Neue Helden (wichtig, echt, nicht weltbekannt; Zeitalter mit mehreren Helden) | AP 5.10 – Welle 1 ✓ in 1.9.0, Zeitalterkarten ✓ in 1.10.0, Welle 2 ✓ in 1.11.0 (22 Helden, sechs Zeitalter mit Zeitalterkarten) |
| Bestehende Karteneffekte überarbeiten | AP 5.11 (Dopplungen Herodot/Anna und Thermen/Aquädukt entzerrt in 1.10.0) |
| Platzhalter statt fehlender Grafiken | AP 5.12 – ✓ in 1.8.0 |
| Heldenbalance | AP 5.1, AP 5.2 – ✓ in 1.6.0 |
| Heldenfähigkeit dreht sich nach Benutzung um | AP 1.8, AP 3.7 |
| Zwei thematische Spielfeldhälften je Epoche | AP 1.2, AP 1.8 |
| Gewicht und Wucht beim Ausspielen, Staub und Risse | AP 3.3 |
| Drei Klangspuren je Diener | AP 4.1 |
| Status-Leuchten (grün, gelb, roter Zielpfeil, pumpende Lebenspunkte) | AP 3.2, AP 3.5 |
| Manakurve im Deckbau | AP 1.6 |
| Halten zum Vergrößern mit Pergament-Rascheln, ausweichende Nachbarkarten | AP 3.2 |
| Karte wird auf dem Feld zur ovalen Truppensiegel-Plakette | AP 1.2, AP 3.3 |
| Angriffe mit Rückzug, Aufprall und Einheiten-Treffersounds | AP 3.5, AP 4.1 |
| Schadenszahlen mit Tintenspritzern, Tod als Gesteinssplitter | AP 3.5 |
| Chronometer bzw. Sanduhr als „Zug beenden“ mit Gong | AP 1.8 |
| Kein Timer, Lunte nur in Belagerungsmissionen | AP 3.7, AP 6.4 |
| Eck-Dioramen | AP 1.2, AP 1.8, AP 3.9 |
| Reaktive KI-Dialoge | AP 4.3 |
| Chronist der Zeiten (Erzähler) | AP 4.2 |
| Sieg mit zerbrechendem Relief, Banner „TRIUMPH“, Kriegshörnern | AP 3.8 |
| Feldherrentisch, Heldenmünzen, Phalanx-Schild, Herrschersiegel, Waffenablage | AP 1.8 |
| Äther-Runen unten rechts, versiegelte KI-Befehle, Chronik-Leiste, Pergament-Deck, Stundenglas | AP 1.8, AP 3.4 |
| Münzwurf, Startkarten-Tausch, „Gunst der Stunde“, Mana bis 10, Handlimit, gleichzeitiger Schaden, Aufmarsch-Verzögerung, freie Zielwahl, KI-Zug ohne Unterbrechung | vorhanden; Inszenierung in AP 3.4, AP 3.8; Umbenennung ✓ (1.7.0) |
| Taktische Hinterhalte | AP 5.6, AP 1.8 |
| Kartenwerte-Symbole, Lorbeerkranz, Archiv-Siegel der Seltenheit | AP 1.5 |
| Historische Schlüsselwörter (Schildwall bis Bannung) | AP 5.4 (Teil 1 ✓ in 1.7.0, Teil 2 ✓ in 1.8.0), AP 3.6 |
| Bauwerke und Denkmäler mit Haltbarkeit | AP 5.5 – ✓ in 1.10.0 (Weltwunder, KI belagert oder ignoriert, Turm-Abzeichen) |
| Code-Eingabe und Massenöffnung der Kartenpakete (Rückmeldung zu 1.10.0) | ✓ in 1.11.0 – *Einstellungen → Code einlösen*, im Basar „Alle öffnen“ |

---

## Offene Entscheidungen

Diese Punkte solltest du vor dem jeweiligen Arbeitspaket entscheiden:

1. ~~**Vierte Menüplatte** (AP 1.3)~~ – *mit deinem erfolgreichen Test zu AP 1.3 angenommen:* „Partie fortsetzen“
   bei laufender Partie, sonst „Herausforderung“ als Tagesduell. Rätsel und Zeitanomalie können sie später erweitern.
2. **Heldenfähigkeit „umdrehen“** (AP 1.8): Ich habe es so verstanden, dass sich das Fähigkeits-Siegel wie in
   Hearthstone umdreht. Falls du meinst, dass sich das ganze Spielfeld dreht, bitte korrigieren.
3. **Spielfeldhälften vs. Schlachtfeld-Skins** (AP 1.8): Ersetzt ein gekaufter Skin die eigene Epochenhälfte, oder
   werden die Skins zu Mittelnähten/Rahmen?
4. ~~**Schlüsselwörter umbenennen** (AP 5.4)~~ – *entschieden: alle sechs auf einmal*, umgesetzt in 1.7.0.
5. **Ressourcen** (AP 1.8): Äther-Runen oder Sonnen-Amulette?
6. ~~**Bauwerke** (AP 5.5)~~ – *entschieden (Sitzung 5):* Sie belegen einen der 7 Plätze.
7. **Stimmen** (AP 4.1): Quelle und Budget (eigene Aufnahmen, Sprecher, KI-Sprachausgabe)?
8. ~~**Legendäre** (AP 5.3)~~ – *entschieden: alle Vorschläge übernehmen, auf einmal*; umgesetzt in 1.7.0, Werte nach
   dem Balance-Lauf justiert (Abweichungen von der Tabelle in AP 5.3).
9. ~~**Stil-Bibel und Hauptmenü** (AP 1.1, AP 1.3)~~ – *freigegeben* (Sitzung 2), Zahnrad und Wand danach korrigiert.
10. ~~**Code-Struktur**~~ – *entschieden (Sitzung 5):* MVVM bleibt.
11. ~~**Neue Helden** (AP 5.10)~~ – *entschieden (Sitzung 5):* Welle 1 nach meinem Vorschlag – Perikles, Marcus Agrippa,
    Amanirenas, Anna Komnene, Nezahualcóyotl, Hōjō Masako.
12. ~~**Platzhalter** (AP 5.12)~~ – *freigegeben:* neue Karten und Helden zuerst mit gestalteten Platzhaltern.
13. ~~**Namen aus der Chronik-Prüfung** (AP 5.9)~~ – *entschieden:* Ragnars Totems heißen Runensteine, Dandolos
    Fähigkeit *Rammsporn der Galeeren*; umgesetzt in 1.9.0 (nur Namen und Texte).
14. ~~**Neue Chroniken** (AP 5.10)~~ – *entschieden (Rückmeldung zu 1.9.0):* Die Missionen sind nicht so wichtig, eine
    einfache Reihenfolge reicht – es bleibt bei 1 bis 16 nacheinander, jeder Sieg schaltet die nächste frei.
15. ~~**Welle 2 der neuen Helden** (AP 5.10)~~ – *entschieden:* wie vorgeschlagen Epaminondas, Baibars, Jan Žižka,
    Fabius Maximus, Fu Hao und Mandukhai; umgesetzt in 1.11.0.
16. **Codes** (Rückmeldung zu 1.10.0): Die Code-Eingabe und die Massenöffnung waren in keiner Version im Repo (auch nicht
    in der 1.2.2-APK) – sie stammen vermutlich aus einer Fassung außerhalb des Repos. Ich habe beide neu gebaut und vier
    Codes angelegt (siehe [APK herunterladen](#apk-herunterladen)). Kennst Du noch Deine alten Codes oder möchtest Du
    andere Belohnungen? Dann trage ich sie in `CHP.codes` ein.

---

## Empfohlene Reihenfolge der Sitzungen

| Sitzung | Arbeitspakete | Warum jetzt |
|---|---|---|
| 1 ✓ | AP 0.3, AP 1.1, AP 1.3 | erledigt in 1.4.0 – Name Aeterna, Stil-Bibel, gemaltes Hauptmenü (freigegeben) |
| 2 ✓ | AP 2.3, AP 0.1, AP 2.6, Feinschliff AP 1.3 | erledigt in 1.5.0 – MVVM-Struktur, Basar ohne Sprünge, Sichtprüfung in der CI, Zahnrad repariert |
| 3 ✓ | AP 5.1, AP 5.2 | erledigt in 1.6.0 – Balance-Werkzeug, alle Helden 47–53 %, Beginner-Vorteil ausgeglichen |
| 4 ✓ | AP 5.4 (Teil 1), AP 5.3, AP 5.8 (Teil 1), Feinschliff AP 1.3 | erledigt in 1.7.0 – eigene Schlüsselwörter, Vorstoß/Starre/Ergründen, alle zwölf Legendären neu, Menü-Blitz und Seitenränder |
| 5 ✓ | AP 5.12, AP 5.9, AP 5.4 (Teil 2), Rückmeldung 1.7.0 | erledigt in 1.8.0 – Platzhalter, Chronik der Helden, fünf neue Schlüsselwörter mit 13 Karten, randlose Untermenüs |
| 6 ✓ | AP 5.10 (Engine-Teil und Welle 1), Rückmeldung 1.8.0 | erledigt in 1.9.0 – Heldenfähigkeiten als Daten, Zeitalter, sechs neue Helden mit Chronik und Mission, leiserer Stern |
| 7 ✓ | AP 5.11 (Kartenwelle 1), AP 5.5, AP 5.8 Teil 2, Rückmeldung 1.9.0 | erledigt in 1.10.0 – 56 Karten mit Zeitalterkarten, Weltwunder, KI-Persönlichkeit und Belagern |
| 8 ✓ | AP 5.10 Welle 2 (sechs Helden), Zeitalterkarten für Rom, Persien & Steppe, Byzanz, Rückmeldung 1.10.0 | erledigt in 1.11.0 – 22 Helden, 350 Karten, Massenöffnung und Codes |
| zwischendurch | AP 1.2 (du) | Grafiken für Karten, Spielbrett und HUD erzeugen |
| 9 | AP 2.1, AP 2.2, AP 0.2 – siehe unten | Native Hülle, WebP, schneller Start, Haptik-Grundlage, randloser linker Rand |
| 10 | AP 2.4, AP 2.5, AP 5.11 Teil 2 | Flüssiges Match, Renderer-Entscheidung (das Sicherheitsnetz AP 2.6 läuft schon); „nur Werte“-Karten und Balance-Feinschliff aus 1.11.0 |
| 11–13 | AP 1.8, AP 1.5, AP 3.1–3.5 | Neues Spielbrett, neue Karten, Gewicht und Wucht |
| 14 | AP 1.4, AP 1.6, AP 1.7 | Basar, Sammlung, Heldenwahl im neuen Stil |
| 15–16 | AP 3.6–3.9, Phase 4 | Effekte, Stimmen, Chronist, Klang, Haptik aus einem Guss |
| 17+ | AP 5.6, AP 5.7, Phase 6 | Hinterhalte, Erweiterung „Wunder der Welt“, Modi |

Tipp: Eine Sitzung sollte mit einer grünen CI und einer installierbaren APK enden, auch wenn ein Paket noch nicht ganz fertig ist.

---

## Vorschlag für die nächste Sitzung

**Erledigt in Sitzung 8 (Version 1.11.0):** AP 5.10 Welle 2 – Epaminondas, Fabius Maximus, Mandukhai, Baibars, Jan Žižka
und Fu Hao mit je zehn Karten, Chronikseite, Startdeck, KI-Persönlichkeit, Monogramm und Mission 17–22; 21 Zeitalterkarten
für Rom, Persien & Steppe und Byzanz (jetzt sechs Zeitalter mit je zwei bis fünf Helden); neue Regeln (Diener ganz links,
Bündnis-Bedingung, verliehener Vorstoß, Ergründen aus dem eigenen Deck, Ziele in Starre); drei volle Balance-Läufe mit
22 Helden (alle neuen Helden 46,6–52,8 %). Deine Rückmeldung zu 1.10.0: **Massenöffnung** (im Basar „Alle öffnen“, bis zu 50 Pakete, Übersicht mit den
seltensten Karten zuerst) und **Code-Eingabe** (*Einstellungen → Code einlösen*, vier Codes) – beide gab es in keiner
Version im Repo, sie sind neu gebaut (siehe Entscheidung 16). Nebenbei: Heldenwahl mit 8 Spalten für 22 Helden,
Monogramme passen ins Medaillon, „Über das Spiel“ nennt die echten Zahlen statt „140 Karten, zehn Helden“. Davor:
Sitzung 7 (1.10.0) AP 5.11 Kartenwelle 1, AP 5.5, AP 5.8 Teil 2; Sitzung 6 (1.9.0) AP 5.10 Welle 1; Sitzung 5 (1.8.0)
AP 5.12, AP 5.9, AP 5.4 Teil 2; Sitzung 4 (1.7.0) AP 5.4 Teil 1, AP 5.3, AP 5.8 Teil 1; Sitzung 3 (1.6.0) AP 5.1, AP 5.2;
Sitzung 2 (1.5.0) AP 2.3, AP 0.1, AP 2.6; Sitzung 1 (1.4.0) AP 0.3, AP 1.1, AP 1.3.

**Vorher bitte von dir auf dem OnePlus 15 (10–15 Minuten):**
1. Test-APK `Aeterna-1.11.0-Test-APK` aus Actions installieren (Update über 1.10.0, Spielstand und Decks bleiben, die
   sechs neuen Helden bekommen ihr Basisdeck).
2. *Einstellungen → Code einlösen:* `CHRONIK` (alle 350 Karten) oder `KARTENPAKETE` und im Basar **„Alle öffnen“** – ist
   die Übersicht auf dem Handy lesbar, oder möchtest Du die Karten lieber groß nacheinander sehen?
3. **Heldenwahl:** 22 Helden in acht Spalten – Namen und Monogramme gut lesbar?
4. Je eine Partie mit **Epaminondas** (beim Ausspielen bestimmst Du, wer ganz links steht), **Fabius** (seine Fähigkeit
   kostet als einzige 3 Mana) und **Fu Hao** (Orakel: drei Karten aus dem eigenen Deck zur Wahl). Fühlen sie sich
   verschieden an?
5. Offene Entscheidungen **2**, **3**, **5**, **7** und **16** (Codes).
6. *Asset-Aufgabe (AP 1.2), sobald es passt:* 225 Karten- und 12 Porträtmotive stehen mit fertigem Prompt in
   `ungenutzte_assets/MOTIVE.md` (81 Karten und 6 Porträts davon neu).

**Sitzung 9 – AP 2.1 native Android-Hülle, AP 2.2 Asset-Pipeline, AP 0.2 Audio**

Nach drei Inhalts-Sitzungen (1.8.0–1.11.0) wieder Technik, wie im Plan: Die alte Hülle liegt nur kompiliert vor
(`classes.dex`), deshalb gehen Vollbild mit Display-Aussparung (der tote linke Rand auf Deinem OnePlus 15), WebP,
Splash-Screen, Vibrationsmuster und 120 Hz bisher nicht.

| Paket | Inhalt | Warum jetzt |
|---|---|---|
| Rückmeldung 1.11.0 | Codes, Massenöffnung, neue Helden | kurz |
| AP 2.1 | Gradle-Projekt (Kotlin) mit gleicher Paket-ID `de.chroniken.helden.layout`, gleicher Signatur (`chroniken-test.p12`), `WebViewAssetLoader` für `https://chroniken.local/`, dieselbe JS-Brücke (`save`, `load`, `exportSave`, `importSave`, `haptic`, `exitApp`; `App.back()` …), Vollbild mit `layoutInDisplayCutoutMode`; die CI baut mit Gradle statt `apk_bauen.py` | randloser Rand, Grundlage für alles Weitere; Update über 1.11.0 muss klappen (gleicher Schlüssel, höherer versionCode) |
| AP 2.2 | Bilder nach WebP, gestuftes Laden mit echtem Fortschritt | APK 56 MB → Ziel < 25 MB, schnellerer Start |
| AP 0.2 | Lautstärken der Steingeräusche angleichen | braucht Deinen Höreindruck, passt zur neuen Hülle |

Das Risiko liegt in AP 2.1: Die Hülle lässt sich in der Sitzung nur in der CI bauen und nicht auf einem Gerät testen –
deshalb mit Abnahme über Deinen Test (Update über 1.11.0, Spielstand bleibt, Export/Import, Zurück-Taste, Vibration).
Regeln und Karten bleiben unverändert (kein Balance-Lauf nötig, nur Tests und Klickpfad). Der Balance-Feinschliff aus
1.11.0 – die Khan-Paarungen (gegen Fu Hao und Mandukhai 69/31 bzw. 68/32 mit Startdecks), drei Karten knapp über 60 %
(Goldener Reiter, Botin der Stämme, Kämpfer der Heiligen Schar), Musashi 53,9 % – gehört zu AP 5.11 Teil 2 in Sitzung 10.

**Text zum Kopieren für den Start:**

> Lies die `README.md` im Repo `thepytales/Chronicle_of_Heroes`. Arbeite **AP 2.1 (native Android-Hülle), AP 2.2
> (Asset-Pipeline) und AP 0.2 (Audio)** ab und übernimm mein Feedback zu Version 1.11.0: *(hier Feedback und Entscheidungen
> einfügen)*. Halte dich an die „Regeln für jede Sitzung“ und an die MVVM-Struktur, prüfe optische Änderungen mit
> Screenshots im Handyformat, lass die zwingend notwendigen Tests und den Klickpfad (falls notwendig) laufen und sorge für
> eine grüne CI. (Spare im Zweifel Tokens bei der Prüfphase und delegiere Prüfungen an mich und mein OnePlus 15.) Hake
> erledigte Punkte in der README ab und trage Messwerte ein. Öffne am Ende einen Pull Request nach `main` und schreibe unten
> in die README wieder einen Vorschlag für die nächste Sitzung mit Effort-Empfehlung.

**Empfohlener Effort für den nächsten Prompt: xhigh.** Eine neue Android-Hülle aus dem Nichts (Gradle, Kotlin, Signatur,
CI-Umbau) ist Neuland im Projekt und lässt sich nur über die CI prüfen; Fehler dort kosten viele Runden. *high* reicht,
wenn Du nur AP 2.2 und AP 0.2 machen und die Hülle verschieben möchtest – dann wäre stattdessen AP 5.11 Teil 2 (die
„nur Werte“-Karten der Startdecks) mit einem Balance-Lauf ein guter zweiter Block.
