# Aeterna 1.41.0 · Android-Code 44

## Ausgangsstand

Der Tag `test-apk` und `main` zeigten beim Abgleich auf `2a0cc9d01fcafdf38b7da7e613e979f1d0c39db6`. GitHub meldete keinen offenen PR. Der Bildzweig `codex/oberflaeche-u05-u13` brachte vier weitere Commits bis `2de0c63841739ad5916d44b8c8937a8a89fa8277` (1.40.0/43). Er enthält die Motive für 416 Karten, 28 Spielsteine und U01–U13. Die veröffentlichte APK 1.39.0/42 hatte 25 793 360 Bytes und SHA-256 `226eff696025b85ab0cab2c9ad29e40124707c75e2ad02052ca1b16ebc669f88`.

## Was im Kandidaten steckt

- Offline sind die 22 Helden, Kampagne, Lehrstunden, Sammlung und Deckbau verfügbar. Die 334 neuen Chronikzeilen ergänzen den vorhandenen Bestand auf 416. Der Test vergleicht die tatsächlichen IDs. Die Heldenansicht liest Name, Kosten und Regeltext der Fähigkeit aus denselben Daten wie die Engine.
- 163 lokale Ogg-Dateien vertonen die 22 Helden, die 24 Legendären und den Chronisten. Je Held gibt es Begrüßung und zwei situative Kommentare. Die 22 legendären Diener sprechen bei Auftritt, Angriff und Abschied. Bei den zwei legendären Zaubern wechseln drei Sprüche beim Ausspielen. Einheiten teilen sich Geräuschvarianten nach Typ. Der Chronist eröffnet das Duell, kündigt ein Monument an und spricht am Ende zur Geschichte des eigenen Helden. Gesprochene Kommentare überlappen einander nicht. Die KI hat 35 Sekunden Abklingzeit. Musik, Geräusche und Stimmen sind separat regelbar.
- Alle Sprechtexte stehen in `quellcode/assets/game/assets/audio/stimmen.json`. Eigene deutsche Rollenprosa, Synthese mit Piper und den Stimmen Thorsten und Kerstin. 33 Rollenclips verwenden Kerstin, die übrigen 130 einschließlich des Chronisten Thorsten. Beide Sprachkorpora stehen unter CC0. Die Mischung zielt auf −19 LUFS und −2 dBTP vor dem Spielregler. Die beiden bereits ausgewählten Musikstücke bleiben die Musik für Menü und Duell. [Modellkarte](https://huggingface.co/rhasspy/piper-voices/blob/main/de/de_DE/thorsten/medium/MODEL_CARD) · [Thorsten – Rechte und Aufnahmen](https://thorsten-voice.de/en/about/recordings/) · [Kerstin – Aufnahmen und CC0-Erklärung](https://github.com/rhasspy/dataset-voice-kerstin)
- Das private Duell verwendet dieselbe Engine auf einem Node-Server. Beide Clients senden bestätigte Befehle. Jeder Platz sieht das öffentliche Brett, die eigene Hand und seine erlaubten Aktionen. Ein zufälliger Einladungscode öffnet den Gastplatz. Für die Rückkehr erhält jeder Browser einen eigenen Schlüssel. Bei Abbruch pausiert das Spiel, bis beide zurück sind. Die Revisionsnummer schützt vor einem doppelten Zug. Verschiedene Spielversionen werden beim Verbindungsaufbau abgewiesen. Das Offline-Profil bleibt vom Raum getrennt.

## Prüfprotokoll des Kandidaten

| Umgebung | Ergebnis |
|---|---|
| Regeln und Spieldaten | 269 bestandene Node-Tests. Der Chroniktest gleicht die IDs aller 416 Sammelkarten ab und behandelt die 28 Spielsteine separat. |
| Browser | 69 bestandene Klickpfad-Prüfungen einschließlich Hauptmenü, Lehrstunde, Sammlung, Deckbau, Kampagne und Match. 36 bestandene Prüfungen in der Gerätematrix. Startablauf, Hauptmenü-, Match- und Renderermessung ohne Prüffehler. Der isolierte Introlauf maß 3,59 s für den Splash. |
| Browser mit beiden APKs | Veröffentlichtes Paket 1.39.0 → Kandidat 1.41.0, identische Sammlung, eigene Deckliste und laufende Partie. Die Partie ließ sich fortsetzen und beenden. Beide Kartenansichten zeigten die längste Text-/Quellenkombination bei 640 × 360 und größter Schrift bis zum Ende. |
| HTML5-ZIP | Zwei getrennte Browserprofile spielten eine vollständige Partie mit 67 Befehlen, 22 ausgespielten Karten und 31 Angriffen. Nach getrenntem Socket und erneut geöffneter Gastseite blieben Revision, Hand und öffentliches Brett erhalten. Der Server bestätigte das Ende und wies die abweichende Spielversion ab. ZIP-SHA-256 `25b19daf7456a3dcdc04d84fdffa48d18f16cb3324a6962983130edb26f87200`. |
| Klang | Alle 163 Ogg-Dateien mit FFmpeg gemessen. Die integrierte Lautheit lag zwischen −22,14 und −18,23 LUFS, der Median bei −19,0 LUFS. Der höchste True Peak betrug −1,49 dBTP. Im Spiel ließen sich Musik, Geräusche und Stimmen getrennt regeln. Ein laufender Sprachclip verstummte beim Stellen auf null, und die Klangprobe blieb dann stumm. |
| Android-Emulator | Die native Abnahme ist im Zweiglauf als eigener Job `android-abnahme` sichtbar. Er protokolliert APK-Installation, SHA-256 des wiederhergestellten Spielstands, Neuinstallation sowie die gemeinsame WSS-Partie aus APK und ZIP. Das Ergebnis für den geprüften Commit steht in [PR #11](https://github.com/ProjectPyTales/Aeterna_Hauptspiel/pull/11). |
| Physisches Gerät | In dieser Umgebung war kein Android-Handy angeschlossen. Lautsprecherverständlichkeit, fühlbare Vibration, echte Fingergesten und Bildrate auf einem Zielgerät sind offen. Für das Ergebnis Gerät, Android-/WebView-Version und beobachtete Bildrate festhalten. |

In einer Stichprobe mit Whisper Base und Whisper Small (Deutsch) erkannten beide Modelle die Begrüßung, den Leonidas-Gruß, zwei situative Heldenkommentare und Zenobias überarbeiteten Abschied „Erzählt von mir“ wörtlich. Bei Juttas „Ich zeige euch den Weg“ traf das größere Modell den Text ebenfalls wörtlich. Beim längeren Schlusssatz über die Zitadelle von Lille blieb die historische Aussage erkennbar. Der subjektive Höreindruck über den Telefonlautsprecher gehört zur Geräteabnahme.

## Bauen und prüfen

Vom Repository-Stamm mit Node 22+, Python 3, JDK 17, Android SDK 36, Build Tools und Playwright-Chromium ausführen.

```sh
npm ci --prefix relay
npm install --no-save --no-package-lock playwright@1.56.1
npx playwright install --with-deps chromium
node --test werkzeuge/tests/*.test.js
node werkzeuge/klickpfad.js
node werkzeuge/geraetematrix.js
node werkzeuge/intromessung.js
node werkzeuge/sichtpruefung.js
node werkzeuge/matchmessung.js
node werkzeuge/labormessung.js
python3 werkzeuge/html5.py
node werkzeuge/freundesduell-test.js dist/Aeterna-1.41.0-HTML5.zip
(cd android && ./gradlew assembleRelease --no-daemon)
cp android/app/build/outputs/apk/release/app-release.apk dist/Aeterna-1.41.0-Test.apk
node werkzeuge/update_info.js dist/Aeterna-1.41.0-Test.apk dist/version.json
```

Für die Update-Prüfung zuerst `version.json` und die darin benannte APK aus dem tatsächlich veröffentlichten Release sichern. Beispiel für die Ausgangslage 1.39.0:

```sh
mkdir -p abnahme-alt
gh release download test-apk -p version.json -D abnahme-alt
curl -fL "$(jq -r .android.url abnahme-alt/version.json)" -o abnahme-alt/alt.apk
echo "$(jq -r .android.sha256 abnahme-alt/version.json)  abnahme-alt/alt.apk" | sha256sum -c -
node werkzeuge/update-spielstand.js abnahme-alt/alt.apk dist/Aeterna-1.41.0-Test.apk
```

Der Browser-Test entpackt beide APKs und hält Ursprung und Browserprofil beim Wechsel fest. Er öffnet ein Paket, speichert ein eigenes 30-Karten-Deck, startet eine Partie, lädt den alten Stand erneut und vergleicht Sammlung, Decks und den gesamten wiederhergestellten Regelzustand. Danach spielt er das Duell zu Ende. Auf 640 × 360 sind sowohl in der Sammlung als auch in der Großansicht die längste Text-/Quellenkombination bei sehr großer Schrift erreichbar.

## Privates Duell und itch.io

`npm ci --prefix relay && npm start --prefix relay` startet den Relay auf `127.0.0.1:8787`. Für den öffentlichen Betrieb braucht es einen laufenden Server mit diesem Checkout, eine erreichbare Domain und einen TLS-Reverse-Proxy mit WebSocket-Upgrade zu diesem Port. Der Server akzeptiert `HOST` und `PORT`. Beide Spieler geben dieselbe WSS-Adresse unter *Schlacht → Privates Duell* ein. Eine Person erstellt die Einladung, die andere tritt mit dem zehnstelligen Code bei. Über das Hauptmenü kann man eine laufende Einladung später wieder öffnen. Wer „Einladung verlassen“ bestätigt, gibt seinen Platz auf. Die Räume liegen im Arbeitsspeicher und verfallen nach zwei Stunden Inaktivität oder bei einem Serverneustart.

Lokal verwendet der Pakettest einen Relay auf einem freien Loopback-Port und zwei vollständig getrennte Browserprofile. Er prüft beide Starthände, die öffentliche Brettansicht nach jedem Zug, verdeckte Handkarten, Versionskonflikt, einen abrupt getrennten Transport mit automatischer Wiederverbindung, das erneute Öffnen der Gastseite und ein reguläres Partieende. Das Paket für den manuellen itch.io-Upload ist `dist/Aeterna-1.41.0-HTML5.zip`. In itch.io „HTML“ und „This file will be played in the browser“ wählen und Vollbild erlauben. Den Upload übernimmt der Projektinhaber.

## Native Wiederholung im Test-AVD

Der Zweiglauf verwendet die signierte Datei aus `Android-Kandidat`, die separate Instrumentierung und das bereits im Browser geprüfte itch-ZIP. Für die native Offline-Prüfung ist der Flugmodus während Neuinstallation und Update eingeschaltet. Beide APK-Installationen laufen über Androids Paketmanager. Die Referenz liegt im Speicher desselben Android-Pakets. Der Test vergleicht Sammlung, alle Decks und die laufende Partie beim zweiten Start der veröffentlichten App und nach dem Update. Dann öffnet er die alte Partie und prüft in einer zweiten, frischen Installation das Startprofil. Der WSS-Test verbindet den Browser aus dem ZIP und die WebView aus der installierten APK. Eine nur in diesem Wegwerf-Emulator eingetragene Test-CA beglaubigt den lokalen Relay. Der öffentliche Serverbetrieb erfordert ein eigenes gültiges TLS-Zertifikat.

Für die Wiederholung ein frisches Android-13-Test-AVD (API 33, x86_64, Google APIs) mit `-writable-system` starten. Das explizite Flag bestätigt, dass Systemzertifikat und Testprofil nur in diesem verwerfbaren Emulator angelegt werden dürfen.

```sh
(cd android && ./gradlew assembleRelease assembleReleaseAndroidTest --no-daemon)
bash werkzeuge/android-emulator-abnahme.sh --leeres-test-avd abnahme-alt/alt.apk \
  android/app/build/outputs/apk/release/app-release.apk \
  android/app/build/outputs/apk/androidTest/release/app-release-androidTest.apk \
  dist/Aeterna-1.41.0-HTML5.zip
```

## Geräteabnahme

Ein Testgerät bzw. einen separaten Android-Testnutzer verwenden. Sammlung und persönliche Spielstände auf Geräten mit vorhandener Installation vorher exportieren. Ausgangs-APK, Kandidat und `adb` müssen lokal verfügbar sein.

1. Auf einem leeren Testprofil `adb install abnahme-alt/alt.apk` ausführen. Ein Paket öffnen und eine erhaltene Karte mit Anzahl festhalten. Ein neues Deck „Abnahme“ mit 30 Karten speichern. Freies Duell mit diesem Deck starten, Starthand bestätigen und nach einem eigenen Zug zum Menü zurück. Helden, Lebenspunkte, Hand und Zugzahl notieren. App beenden.
2. Ohne Deinstallation `adb install -r dist/Aeterna-1.41.0-Test.apk` ausführen. Unter Einstellungen → Über das Spiel 1.41.0 prüfen. Kartenanzahl und Deckliste vergleichen, Partie über „Fortsetzen“ öffnen und den protokollierten Zug zu Ende spielen. Installierte Version zusätzlich mit `adb shell dumpsys package de.chroniken.helden.layout` (versionCode 44) prüfen.
3. Auf einem zweiten leeren Testprofil den Kandidaten neu installieren. Im Flugmodus Lehrstunde, Sammlung, Deckbau und Kampagnenstart öffnen. Ein Offline-Duell beenden. Bei voller Hand links, mittig und rechts antippen, ziehen und lange drücken. Größte Schrift wählen, lange Chronik samt Quelle lesen. Stimmen, Musik und Geräusche einzeln stumm/laut prüfen. Vibration aus/ein und Treffer vergleichen. Unter „Über das Spiel“ fünfmal auf die Versionsnummer tippen. Die FPS-Anzeige bei Ruhe, voller Hand und dicht besetztem Brett beobachten und Gerät, Android-Version und Messbereich notieren.
4. Für die Geräteprüfung des Freundesduells am Handy und im Browser denselben WSS-Relay eintragen. Normal spielen, während eines Zuges am Handy WLAN unterbrechen und wiederherstellen. Hand, Brett, Mana und Zugrecht vergleichen und die Partie beenden.

Paket-ID für Vorgänger und Kandidat: `de.chroniken.helden.layout`. Erwarteter SHA-256-Fingerabdruck des Signaturzertifikats: `8d4ab16f74df55c6ea0c119e2074e02ee7aeb2e1262c2770fede660b29e9e509`. Der Workflow **Test-APK bauen** (`.github/workflows/apk.yml`) veröffentlicht bei einem Push nach `main` unter dem bestehenden Release-Namen `test-apk`. Der Arbeitszweig veröffentlicht keinen Release.
