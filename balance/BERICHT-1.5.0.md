# Balance-Bericht

> Stand **vor** AP 5.2 – die Regeln von Version 1.5.0 (nur die KI rechnet schneller, spielt aber gleich). Aktueller Stand: [BERICHT.md](BERICHT.md).

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `a2e0f65c2f` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die neun anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±2,3.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %.

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|
| Startdecks | 11000 | ✗ 2/10 | ✗ 12/45 | ✗ 57,2 % | 0 | 23 |
| Zufallsdecks | 11000 | ✗ 3/10 | ✗ 36/45 | ✗ 65,6 % | 0 | 19 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | Ziel |
|---|---|---|---|---|---|---|
| Hypatia | **80,2 %** | 79,0 % | 70,4 % | Dandolo 64,0 % | Leonidas 98,0 % | ✗ |
| Nostradamus | **62,4 %** | 70,9 % | 49,4 % | Hypatia 34,0 % | Leonidas 87,0 % | ✗ |
| Enrico Dandolo | **61,1 %** | 70,5 % | 47,7 % | Hypatia 36,0 % | Leonidas 91,0 % | ✗ |
| Miyamoto Musashi | **57,1 %** | 64,4 % | 47,3 % | Hypatia 23,5 % | Leonidas 88,0 % | ✗ |
| Ragnar Lodbrok | **52,7 %** | 59,6 % | 44,8 % | Hypatia 25,0 % | Leonidas 85,5 % | ✓ |
| Jeanne d’Arc | **52,3 %** | 59,5 % | 44,3 % | Hypatia 17,0 % | Leonidas 90,5 % | ✓ |
| Boudicca | **45,6 %** | 50,8 % | 41,9 % | Hypatia 11,5 % | Leonidas 89,0 % | ✗ |
| Dschingis Khan | **36,8 %** | 46,4 % | 32,0 % | Hypatia 14,5 % | Leonidas 62,0 % | ✗ |
| Imhotep | **36,5 %** | 45,3 % | 32,6 % | Hypatia 15,0 % | Leonidas 70,5 % | ✗ |
| Leonidas I. | **15,4 %** | 25,6 % | 17,7 % | Hypatia 2,0 % | Khan 38,0 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | **2** | **30** | **9** | **38** | **11** | **13** | **10** | **14** | **12** |
| Hypatia | **98** | · | **85** | **64** | **86** | **89** | **66** | **83** | **75** | **77** |
| Imhotep | **71** | **15** | · | **24** | 53 | 42 | **24** | **36** | **33** | **33** |
| Dandolo | **91** | **36** | **77** | · | **68** | **63** | 45 | **63** | 59 | 51 |
| Khan | **62** | **15** | 47 | **32** | · | **38** | 41 | **31** | **36** | **30** |
| Boudicca | **89** | **12** | 59 | **38** | **62** | · | **28** | 43 | **39** | 42 |
| Nostradamus | **87** | **34** | **77** | 55 | 59 | **73** | · | **63** | **62** | 52 |
| Jeanne | **91** | **17** | **65** | **37** | **70** | 57 | **37** | · | 54 | 44 |
| Ragnar | **86** | **25** | **67** | 42 | **64** | **61** | **38** | 46 | · | 47 |
| Musashi | **88** | **24** | **67** | 50 | **71** | 58 | 48 | 56 | 53 | · |

**Partielänge** (Züge beider Seiten zusammen): Mittel 24,2, Median 23, 10–90 %: 17–32, kürzeste 11, längste 69. Beginner gewinnt 57,2 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Belagerungsturm | neutral | 6 | 56,5 % | +5,8 | 76,3 % |
| Lagunenbote | Dandolo | 1 | 62,8 % | +3,7 | 78,8 % |
| Tintenlehrling | Nostradamus | 1 | 62,9 % | +2,8 | 83,6 % |
| Archivarin | neutral | 4 | 53,0 % | +2,6 | 73,9 % |
| Konzentration | Musashi | 2 | 58,4 % | +2,6 | 74,0 % |
| Handelsgesandter | Dandolo | 4 | 61,6 % | +2,5 | 75,1 % |
| Sternenregen | Hypatia | 4 | 76,9 % | +2,2 | 77,1 % |
| Veteran | neutral | 5 | 52,6 % | +2,1 | 79,2 % |
| Wachhund | neutral | 2 | 49,1 % | −1,1 | 80,6 % |
| Dorfwache | neutral | 1 | 49,0 % | −1,2 | 80,9 % |
| Reiterbogenschütze | Khan | 2 | 37,8 % | −1,4 | 76,9 % |
| Bibliothekslehrling | Hypatia | 1 | 72,9 % | −1,7 | 83,2 % |
| Hainwächterin | Boudicca | 1 | 44,5 % | −1,9 | 83,5 % |
| Die Fahne erheben | Jeanne | 3 | 49,8 % | −2,1 | 75,0 % |
| Bronzener Wall | Leonidas | 2 | 19,5 % | −2,2 | 77,1 % |
| Pfeilschuss | Khan | 2 | 36,8 % | −2,4 | 78,1 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | Ziel |
|---|---|---|---|---|---|---|
| Jeanne d’Arc | **57,6 %** | 71,8 % | 40,6 % | Hypatia 52,5 % | Imhotep 64,0 % | ✗ |
| Miyamoto Musashi | **55,4 %** | 72,0 % | 36,9 % | Jeanne 47,0 % | Nostradamus 63,5 % | ✗ |
| Hypatia | **54,5 %** | 70,6 % | 36,7 % | Jeanne 47,5 % | Imhotep 63,0 % | ✗ |
| Ragnar Lodbrok | **53,9 %** | 69,7 % | 36,6 % | Jeanne 41,5 % | Imhotep 61,0 % | ✗ |
| Dschingis Khan | **51,3 %** | 67,7 % | 34,4 % | Jeanne 43,5 % | Nostradamus 59,5 % | ✓ |
| Enrico Dandolo | **49,1 %** | 66,8 % | 31,7 % | Hypatia 38,0 % | Imhotep 60,5 % | ✓ |
| Boudicca | **48,2 %** | 64,3 % | 32,7 % | Musashi 39,5 % | Imhotep 59,0 % | ✓ |
| Nostradamus | **45,4 %** | 60,4 % | 32,1 % | Musashi 36,5 % | Leonidas 54,0 % | ✗ |
| Leonidas I. | **42,6 %** | 57,4 % | 30,5 % | Ragnar 40,0 % | Khan 46,5 % | ✗ |
| Imhotep | **42,1 %** | 55,3 % | 31,7 % | Jeanne 36,0 % | Leonidas 55,0 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 41 | 45 | 41 | 47 | 43 | 46 | 42 | 40 | 41 |
| Hypatia | 60 | · | **63** | **62** | 53 | 56 | 52 | 48 | 49 | 50 |
| Imhotep | 55 | **37** | · | **40** | 44 | 41 | 49 | **36** | **39** | **39** |
| Dandolo | 60 | **38** | **61** | · | 51 | 50 | 51 | 42 | 45 | 47 |
| Khan | 53 | 48 | 56 | 50 | · | 56 | 60 | 44 | 48 | 49 |
| Boudicca | 57 | 44 | 59 | 51 | 44 | · | 53 | 44 | 43 | **40** |
| Nostradamus | 54 | 48 | 52 | 49 | 41 | 48 | · | **39** | 43 | **37** |
| Jeanne | 59 | 53 | **64** | 59 | 56 | 56 | **61** | · | 59 | 53 |
| Ragnar | 60 | 52 | **61** | 55 | 53 | 57 | 57 | 42 | · | 48 |
| Musashi | 60 | 51 | **62** | 53 | 52 | **61** | **64** | 47 | 52 | · |

**Partielänge** (Züge beider Seiten zusammen): Mittel 20,6, Median 19, 10–90 %: 15–28, kürzeste 9, längste 52. Beginner gewinnt 65,6 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Wächter des Weltenbaums | neutral | 8 | 62,6 % | +12,7 | 44,5 % |
| Lagunenbote | Dandolo | 1 | 59,4 % | +10,1 | 61,5 % |
| Paladin der Loire | Jeanne | 6 | 65,8 % | +9,5 | 50,4 % |
| Phalanxveteran | Leonidas | 5 | 53,1 % | +9,2 | 59,3 % |
| Djoser, der Erbauer | Imhotep | 8 | 52,3 % | +8,8 | 46,4 % |
| Andraste, die Beschützerin | Boudicca | 8 | 56,6 % | +8,1 | 45,3 % |
| Der leere Geist | Musashi | 4 | 62,5 % | +8,0 | 46,2 % |
| Sternenregen | Hypatia | 4 | 61,4 % | +7,7 | 48,1 % |
| Subutai, der Stratege | Khan | 8 | 47,6 % | −3,5 | 33,8 % |
| Zorn der Königin | Boudicca | 5 | 44,4 % | −4,1 | 30,4 % |
| Urteil der Sonne | Imhotep | 6 | 39,2 % | −4,3 | 55,3 % |
| Geheimer Vertrag | Dandolo | 3 | 44,6 % | −4,7 | 28,4 % |
| Kriegselefant | neutral | 7 | 45,0 % | −4,9 | 50,6 % |
| Feldration | neutral | 2 | 44,6 % | −5,3 | 26,5 % |
| Bronzener Wall | Leonidas | 2 | 37,1 % | −6,8 | 26,0 % |
| Dienekes | Leonidas | 6 | 36,2 % | −7,7 | 50,9 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 2200 | 82,0 % | 21,4 % | −0,3 | 872 | 59,1 % | 44,9 % | +1,0 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 2200 | 81,8 % | 21,6 % | −0,0 | 1140 | 59,4 % | 43,0 % | −0,9 |
| Bronzener Wall | Leonidas | 2 | Basis | 2200 | 77,1 % | 19,5 % | −2,2 | 1210 | 26,0 % | 37,1 % | −6,8 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 2200 | 77,5 % | 21,8 % | +0,1 | 1024 | 50,7 % | 41,8 % | −2,1 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1194 | 59,7 % | 45,3 % | +1,4 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1176 | 58,6 % | 41,5 % | −2,4 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1066 | 59,3 % | 53,1 % | +9,2 |
| Spartas Vermächtnis | Leonidas | 4 | Selten | – | – | – | – | 994 | 41,9 % | 42,8 % | −1,1 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 1160 | 50,9 % | 36,2 % | −7,7 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 926 | 48,4 % | 47,9 % | +4,0 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 2200 | 83,2 % | 72,9 % | −1,7 | 852 | 58,3 % | 55,3 % | +1,6 |
| Himmelsstrahl | Hypatia | 2 | Basis | 2200 | 86,9 % | 74,2 % | −0,4 | 1232 | 63,4 % | 54,9 % | +1,2 |
| Sternenkundiger | Hypatia | 3 | Basis | 2200 | 82,3 % | 75,6 % | +0,9 | 1242 | 57,3 % | 55,3 % | +1,7 |
| Sternenregen | Hypatia | 4 | Basis | 2200 | 77,1 % | 76,9 % | +2,2 | 996 | 48,1 % | 61,4 % | +7,7 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1182 | 62,1 % | 58,0 % | +4,3 |
| Lehrsatz | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1172 | 25,1 % | 50,2 % | −3,4 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1006 | 51,1 % | 55,2 % | +1,5 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 1152 | 55,1 % | 53,6 % | −0,1 |
| Sternenorakel | Hypatia | 6 | Episch | – | – | – | – | 1064 | 53,9 % | 52,9 % | −0,7 |
| Theon, der Gelehrte | Hypatia | 7 | Legendär | – | – | – | – | 942 | 49,2 % | 56,6 % | +2,9 |
| Nilschülerin | Imhotep | 1 | Basis | 2200 | 78,7 % | 38,7 % | −0,2 | 898 | 59,4 % | 43,6 % | +0,1 |
| Heilender Balsam | Imhotep | 1 | Basis | 2200 | 81,6 % | 38,7 % | −0,3 | 910 | 49,7 % | 41,7 % | −1,8 |
| Pyramidenwächter | Imhotep | 3 | Basis | 2200 | 80,7 % | 40,4 % | +1,4 | 1174 | 57,4 % | 46,3 % | +2,8 |
| Tempelärztin | Imhotep | 4 | Basis | 2200 | 74,6 % | 40,0 % | +1,1 | 1074 | 53,7 % | 43,5 % | +0,0 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1166 | 55,5 % | 47,7 % | +4,2 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1212 | 61,1 % | 43,2 % | −0,3 |
| Nilschwemme | Imhotep | 4 | Selten | – | – | – | – | 1008 | 38,2 % | 43,3 % | −0,2 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1110 | 53,2 % | 49,9 % | +6,4 |
| Urteil der Sonne | Imhotep | 6 | Episch | – | – | – | – | 1204 | 55,3 % | 39,2 % | −4,3 |
| Djoser, der Erbauer | Imhotep | 8 | Legendär | – | – | – | – | 694 | 46,4 % | 52,3 % | +8,8 |
| Lagunenbote | Dandolo | 1 | Basis | 2200 | 78,8 % | 62,8 % | +3,7 | 850 | 61,5 % | 59,4 % | +10,1 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 2200 | 76,7 % | 58,7 % | −0,4 | 1174 | 51,1 % | 51,0 % | +1,8 |
| Präziser Stich | Dandolo | 2 | Basis | 2200 | 82,9 % | 59,9 % | +0,8 | 1130 | 56,2 % | 48,4 % | −0,9 |
| Handelsgesandter | Dandolo | 4 | Basis | 2200 | 75,1 % | 61,6 % | +2,5 | 954 | 47,4 % | 48,4 % | −0,9 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1140 | 35,7 % | 46,7 % | −2,6 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1136 | 57,4 % | 51,9 % | +2,7 |
| Geheimer Vertrag | Dandolo | 3 | Selten | – | – | – | – | 1104 | 28,4 % | 44,6 % | −4,7 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 994 | 52,7 % | 52,2 % | +3,0 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1056 | 32,2 % | 46,3 % | −3,0 |
| Marco, der Weltenfahrer | Dandolo | 7 | Legendär | – | – | – | – | 1104 | 47,2 % | 48,1 % | −1,2 |
| Steppenspäher | Khan | 1 | Basis | 2200 | 78,6 % | 38,3 % | −0,8 | 880 | 50,9 % | 55,3 % | +4,3 |
| Reiterbogenschütze | Khan | 2 | Basis | 2200 | 76,9 % | 37,8 % | −1,4 | 1214 | 50,1 % | 49,1 % | −2,0 |
| Pfeilschuss | Khan | 2 | Basis | 2200 | 78,1 % | 36,8 % | −2,4 | 1162 | 60,2 % | 51,2 % | +0,1 |
| Goldener Reiter | Khan | 4 | Basis | 2200 | 70,9 % | 40,9 % | +1,7 | 1038 | 40,1 % | 51,2 % | +0,1 |
| Adlerjägerin | Khan | 3 | Gewöhnlich | – | – | – | – | 1206 | 55,3 % | 56,6 % | +5,5 |
| Steppensturm | Khan | 3 | Gewöhnlich | – | – | – | – | 1170 | 49,1 % | 49,2 % | −1,9 |
| Tumenwächter | Khan | 5 | Selten | – | – | – | – | 996 | 50,7 % | 54,0 % | +3,0 |
| Belagerungsfeuer | Khan | 5 | Selten | – | – | – | – | 1068 | 51,4 % | 57,2 % | +6,2 |
| Keshig-Elite | Khan | 6 | Episch | – | – | – | – | 1186 | 44,9 % | 51,1 % | +0,0 |
| Subutai, der Stratege | Khan | 8 | Legendär | – | – | – | – | 672 | 33,8 % | 47,6 % | −3,5 |
| Hainwächterin | Boudicca | 1 | Basis | 2200 | 83,5 % | 44,5 % | −1,9 | 876 | 57,0 % | 51,5 % | +3,0 |
| Eichenhaut | Boudicca | 2 | Basis | 2200 | 75,9 % | 46,4 % | +0,0 | 1190 | 42,4 % | 49,4 % | +0,9 |
| Icenerkrieger | Boudicca | 3 | Basis | 2200 | 83,5 % | 47,0 % | +0,6 | 1170 | 54,3 % | 47,8 % | −0,7 |
| Wilder Hieb | Boudicca | 3 | Basis | 2200 | 83,6 % | 46,9 % | +0,6 | 1162 | 62,2 % | 46,1 % | −2,4 |
| Streitwagenlenkerin | Boudicca | 4 | Gewöhnlich | – | – | – | – | 1042 | 48,0 % | 49,4 % | +0,9 |
| Druidin des Hains | Boudicca | 3 | Gewöhnlich | – | – | – | – | 1156 | 58,4 % | 47,3 % | −1,2 |
| Aufstand | Boudicca | 4 | Selten | – | – | – | – | 976 | 46,1 % | 51,1 % | +2,6 |
| Eichenkoloss | Boudicca | 6 | Selten | – | – | – | – | 1268 | 56,1 % | 53,0 % | +4,5 |
| Zorn der Königin | Boudicca | 5 | Episch | – | – | – | – | 976 | 30,4 % | 44,4 % | −4,1 |
| Andraste, die Beschützerin | Boudicca | 8 | Legendär | – | – | – | – | 656 | 45,3 % | 56,6 % | +8,1 |
| Tintenlehrling | Nostradamus | 1 | Basis | 2200 | 83,6 % | 62,9 % | +2,8 | 930 | 63,0 % | 47,5 % | +1,3 |
| Dunkle Vorahnung | Nostradamus | 2 | Basis | 2200 | 89,0 % | 62,1 % | +1,9 | 1218 | 64,2 % | 48,9 % | +2,7 |
| Maskierter Seher | Nostradamus | 3 | Basis | 2200 | 87,4 % | 61,6 % | +1,5 | 1152 | 58,0 % | 46,8 % | +0,6 |
| Prophezeiung | Nostradamus | 3 | Basis | 2200 | 75,6 % | 60,3 % | +0,1 | 1190 | 30,7 % | 44,4 % | −1,8 |
| Pestdoktor | Nostradamus | 4 | Gewöhnlich | – | – | – | – | 994 | 54,5 % | 52,4 % | +6,2 |
| Schattenpakt | Nostradamus | 3 | Gewöhnlich | – | – | – | – | 1160 | 50,8 % | 47,0 % | +0,8 |
| Chronist der Nacht | Nostradamus | 5 | Selten | – | – | – | – | 996 | 50,3 % | 44,2 % | −2,0 |
| Rote Finsternis | Nostradamus | 6 | Selten | – | – | – | – | 1168 | 40,0 % | 46,6 % | +0,4 |
| Wächter der Zeiten | Nostradamus | 7 | Episch | – | – | – | – | 980 | 51,4 % | 51,3 % | +5,1 |
| Caterina, die Regentin | Nostradamus | 8 | Legendär | – | – | – | – | 664 | 50,6 % | 50,9 % | +4,7 |
| Bauernrekrut | Jeanne | 1 | Basis | 2200 | 80,2 % | 52,4 % | +0,6 | 926 | 58,1 % | 63,1 % | +6,9 |
| Bannersegen | Jeanne | 2 | Basis | 2200 | 81,2 % | 52,3 % | +0,4 | 1086 | 52,0 % | 57,5 % | +1,3 |
| Wache von Orléans | Jeanne | 3 | Basis | 2200 | 80,0 % | 51,9 % | +0,0 | 1170 | 58,2 % | 59,3 % | +3,1 |
| Die Fahne erheben | Jeanne | 3 | Basis | 2200 | 75,0 % | 49,8 % | −2,1 | 1142 | 47,2 % | 56,1 % | −0,1 |
| Lilienritter | Jeanne | 4 | Gewöhnlich | – | – | – | – | 994 | 48,0 % | 61,3 % | +5,1 |
| Heiliger Schutz | Jeanne | 2 | Gewöhnlich | – | – | – | – | 1144 | 46,2 % | 54,2 % | −2,0 |
| Standartenträgerin | Jeanne | 5 | Selten | – | – | – | – | 994 | 52,7 % | 60,4 % | +4,2 |
| Glocken von Reims | Jeanne | 5 | Selten | – | – | – | – | 1014 | 45,6 % | 59,1 % | +2,9 |
| Paladin der Loire | Jeanne | 6 | Episch | – | – | – | – | 1132 | 50,4 % | 65,8 % | +9,5 |
| La Hire, der Unbeugsame | Jeanne | 8 | Legendär | – | – | – | – | 730 | 45,6 % | 56,4 % | +0,2 |
| Fjordspäher | Ragnar | 1 | Basis | 2200 | 77,7 % | 51,7 % | −0,5 | 950 | 54,0 % | 52,0 % | −1,2 |
| Runenblitz | Ragnar | 2 | Basis | 2200 | 81,5 % | 52,6 % | +0,3 | 1182 | 59,5 % | 53,9 % | +0,7 |
| Schildmaid | Ragnar | 3 | Basis | 2200 | 80,4 % | 52,9 % | +0,7 | 1130 | 56,5 % | 56,8 % | +3,6 |
| Runenschnitzer | Ragnar | 4 | Basis | 2200 | 75,1 % | 53,2 % | +0,9 | 1040 | 51,2 % | 53,8 % | +0,6 |
| Donnerschlag | Ragnar | 3 | Gewöhnlich | – | – | – | – | 1154 | 55,5 % | 57,7 % | +4,5 |
| Berserker vom Fjord | Ragnar | 4 | Gewöhnlich | – | – | – | – | 986 | 47,1 % | 57,9 % | +4,7 |
| Ahnenbund | Ragnar | 3 | Selten | – | – | – | – | 1156 | 51,5 % | 56,0 % | +2,8 |
| Runenhüter | Ragnar | 5 | Selten | – | – | – | – | 1022 | 50,0 % | 52,3 % | −0,9 |
| Sturm der Nordsee | Ragnar | 6 | Episch | – | – | – | – | 1196 | 51,8 % | 54,4 % | +1,2 |
| Lagertha, Schild des Nordens | Ragnar | 8 | Legendär | – | – | – | – | 710 | 43,5 % | 59,7 % | +6,5 |
| Dojoschüler | Musashi | 1 | Basis | 2200 | 81,8 % | 56,1 % | +0,3 | 870 | 56,1 % | 56,8 % | +2,4 |
| Schneller Schnitt | Musashi | 1 | Basis | 2200 | 82,8 % | 56,0 % | +0,2 | 884 | 54,4 % | 56,0 % | +1,6 |
| Rōnin | Musashi | 3 | Basis | 2200 | 81,7 % | 55,8 % | −0,0 | 1192 | 51,2 % | 51,4 % | −3,0 |
| Konzentration | Musashi | 2 | Basis | 2200 | 74,0 % | 58,4 % | +2,6 | 1148 | 40,9 % | 52,1 % | −2,3 |
| Kirschblütenwache | Musashi | 3 | Gewöhnlich | – | – | – | – | 1180 | 51,9 % | 56,9 % | +2,5 |
| Zwei Himmel | Musashi | 3 | Gewöhnlich | – | – | – | – | 1132 | 36,1 % | 53,3 % | −1,2 |
| Duellant | Musashi | 4 | Selten | – | – | – | – | 1058 | 41,1 % | 57,2 % | +2,7 |
| Der leere Geist | Musashi | 4 | Selten | – | – | – | – | 1062 | 46,2 % | 62,5 % | +8,0 |
| Meister der fünf Ringe | Musashi | 6 | Episch | – | – | – | – | 1226 | 53,2 % | 53,5 % | −0,9 |
| Sasaki Kojirō | Musashi | 8 | Legendär | – | – | – | – | 650 | 39,1 % | 60,1 % | +5,7 |
| Dorfwache | neutral | 1 | Basis | 22000 | 80,9 % | 49,0 % | −1,2 | 9044 | 56,1 % | 49,9 % | +0,1 |
| Wandernder Händler | neutral | 2 | Basis | 22000 | 79,8 % | 49,7 % | −0,5 | 11574 | 53,6 % | 50,5 % | +0,5 |
| Steinschleuderer | neutral | 2 | Basis | 22000 | 82,0 % | 49,7 % | −0,6 | 11772 | 56,1 % | 49,6 % | −0,4 |
| Grenzläuferin | neutral | 3 | Basis | 22000 | 82,5 % | 51,0 % | +0,6 | 11732 | 53,2 % | 50,3 % | +0,3 |
| Festungsschild | neutral | 4 | Basis | 22000 | 76,3 % | 51,3 % | +0,9 | 10436 | 48,0 % | 50,7 % | +0,9 |
| Kavallerist | neutral | 4 | Basis | 22000 | 77,9 % | 51,8 % | +1,4 | 10262 | 47,3 % | 51,6 % | +1,7 |
| Feldheilerin | neutral | 3 | Basis | 22000 | 80,3 % | 49,5 % | −0,7 | 11674 | 52,7 % | 48,2 % | −1,7 |
| Archivarin | neutral | 4 | Basis | 22000 | 73,9 % | 53,0 % | +2,6 | 10236 | 46,7 % | 50,7 % | +0,7 |
| Wachhund | neutral | 2 | Basis | 22000 | 80,6 % | 49,1 % | −1,1 | 11672 | 56,5 % | 48,0 % | −2,0 |
| Veteran | neutral | 5 | Basis | 22000 | 79,2 % | 52,6 % | +2,1 | 10244 | 51,8 % | 49,1 % | −0,8 |
| Belagerungsturm | neutral | 6 | Basis | 22000 | 76,3 % | 56,5 % | +5,8 | 11826 | 50,9 % | 50,1 % | +0,2 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 11766 | 49,8 % | 49,2 % | −0,8 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 8938 | 56,3 % | 51,6 % | +1,6 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 10252 | 51,6 % | 55,0 % | +5,1 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 11800 | 49,8 % | 48,3 % | −1,6 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 11510 | 53,1 % | 50,9 % | +1,0 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 11748 | 40,1 % | 48,6 % | −1,2 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 9056 | 50,5 % | 48,7 % | −1,2 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 11724 | 57,6 % | 48,9 % | −1,1 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 10144 | 50,6 % | 45,0 % | −4,9 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 11588 | 56,2 % | 49,5 % | −0,5 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 10284 | 49,2 % | 49,7 % | −0,2 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 11520 | 57,3 % | 50,1 % | +0,2 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 10226 | 50,5 % | 52,4 % | +2,4 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 11816 | 59,1 % | 51,1 % | +1,2 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 11694 | 26,5 % | 44,6 % | −5,3 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 10230 | 48,7 % | 47,5 % | −2,3 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 10472 | 47,8 % | 51,5 % | +1,6 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 10240 | 53,4 % | 52,7 % | +2,8 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 10304 | 46,6 % | 53,3 % | +3,3 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 10502 | 52,7 % | 51,8 % | +1,8 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 10620 | 50,0 % | 50,3 % | +0,2 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 10240 | 39,8 % | 49,2 % | −0,6 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 11894 | 54,7 % | 50,3 % | +0,4 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 10256 | 46,2 % | 51,4 % | +1,5 |
| Vergessene Weisheit | neutral | 5 | Episch | – | – | – | – | 10472 | 25,4 % | 47,4 % | −2,5 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 7020 | 44,5 % | 62,6 % | +12,7 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 10210 | 53,8 % | 53,2 % | +3,4 |
| Herodot, der Chronist | neutral | 8 | Legendär | – | – | – | – | 6758 | 42,3 % | 49,7 % | −0,1 |
| Zenobia, Königin von Palmyra | neutral | 9 | Legendär | – | – | – | – | – | – | – | – |
