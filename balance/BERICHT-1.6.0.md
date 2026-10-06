# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `ceaab1ab44` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die neun anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±2,3.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %.

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|
| Startdecks | 11000 | ✓ 10/10 | ✓ 45/45 | ✓ 45,9 % | 0 | 23 |
| Zufallsdecks | 11000 | ✓ 10/10 | ✓ 45/45 | ✓ 50,2 % | 0 | 19 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | Ziel |
|---|---|---|---|---|---|---|
| Hypatia | **51,9 %** | 46,2 % | 56,9 % | Musashi 46,0 % | Jeanne 59,5 % | ✓ |
| Nostradamus | **51,1 %** | 50,6 % | 51,1 % | Khan 40,0 % | Boudicca 60,0 % | ✓ |
| Jeanne d’Arc | **50,8 %** | 44,1 % | 57,2 % | Hypatia 40,5 % | Musashi 59,5 % | ✓ |
| Ragnar Lodbrok | **50,7 %** | 45,0 % | 56,1 % | Jeanne 45,0 % | Imhotep 56,5 % | ✓ |
| Dschingis Khan | **50,3 %** | 45,8 % | 54,7 % | Hypatia 41,0 % | Nostradamus 60,0 % | ✓ |
| Boudicca | **49,9 %** | 42,5 % | 57,4 % | Nostradamus 40,0 % | Musashi 56,0 % | ✓ |
| Leonidas I. | **49,6 %** | 49,6 % | 49,6 % | Dandolo 45,0 % | Imhotep 53,0 % | ✓ |
| Miyamoto Musashi | **49,6 %** | 44,0 % | 55,3 % | Jeanne 40,5 % | Dandolo 59,5 % | ✓ |
| Enrico Dandolo | **48,4 %** | 44,9 % | 52,5 % | Musashi 40,5 % | Imhotep 58,0 % | ✓ |
| Imhotep | **47,8 %** | 46,0 % | 50,5 % | Dandolo 42,0 % | Musashi 54,5 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 51 | 53 | 45 | 47 | 53 | 53 | 50 | 47 | 49 |
| Hypatia | 50 | · | 48 | 51 | 59 | 53 | 49 | 60 | 53 | 46 |
| Imhotep | 47 | 53 | · | 42 | 50 | 52 | 44 | 46 | 44 | 55 |
| Dandolo | 55 | 49 | 58 | · | 44 | 46 | 46 | 48 | 50 | 41 |
| Khan | 53 | 41 | 50 | 56 | · | 45 | 60 | 48 | 51 | 49 |
| Boudicca | 48 | 47 | 48 | 54 | 55 | · | 40 | 55 | 47 | 56 |
| Nostradamus | 48 | 52 | 56 | 54 | 40 | 60 | · | 52 | 46 | 52 |
| Jeanne | 50 | 41 | 54 | 52 | 52 | 45 | 49 | · | 55 | 60 |
| Ragnar | 53 | 47 | 56 | 50 | 49 | 53 | 54 | 45 | · | 48 |
| Musashi | 51 | 54 | 45 | 60 | 52 | 44 | 48 | 41 | 52 | · |

**Partielänge** (Züge beider Seiten zusammen): Mittel 24,3, Median 23, 10–90 %: 17–33, kürzeste 10, längste 64. Beginner gewinnt 45,9 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Goldener Reiter | Khan | 4 | 56,0 % | +5,7 | 71,7 % |
| Belagerungsturm | neutral | 6 | 55,6 % | +5,6 | 76,6 % |
| Sternenregen | Hypatia | 4 | 55,0 % | +3,4 | 77,6 % |
| Dunkle Vorahnung | Nostradamus | 2 | 53,6 % | +2,8 | 89,4 % |
| Handelsgesandter | Dandolo | 4 | 51,4 % | +2,6 | 77,4 % |
| Tintenlehrling | Nostradamus | 1 | 53,4 % | +2,5 | 85,0 % |
| Veteran | neutral | 5 | 52,5 % | +2,5 | 79,5 % |
| Archivarin | neutral | 4 | 52,4 % | +2,4 | 74,2 % |
| Wandernder Händler | neutral | 2 | 49,1 % | −0,9 | 80,4 % |
| Fjordspäher | Ragnar | 1 | 49,4 % | −1,2 | 78,4 % |
| Eichenhaut | Boudicca | 2 | 48,5 % | −1,5 | 76,2 % |
| Wachhund | neutral | 2 | 48,5 % | −1,5 | 80,7 % |
| Hainwächterin | Boudicca | 1 | 48,3 % | −1,7 | 84,1 % |
| Bibliothekslehrling | Hypatia | 1 | 49,8 % | −1,7 | 83,8 % |
| Pfeilschuss | Khan | 2 | 48,4 % | −1,9 | 76,6 % |
| Reiterbogenschütze | Khan | 2 | 48,2 % | −2,0 | 76,4 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | Ziel |
|---|---|---|---|---|---|---|
| Miyamoto Musashi | **51,6 %** | 52,3 % | 50,3 % | Jeanne 45,5 % | Nostradamus 58,5 % | ✓ |
| Dschingis Khan | **51,3 %** | 50,5 % | 51,6 % | Leonidas 47,0 % | Nostradamus 55,5 % | ✓ |
| Boudicca | **50,5 %** | 49,2 % | 51,6 % | Leonidas 46,0 % | Imhotep 58,5 % | ✓ |
| Ragnar Lodbrok | **50,4 %** | 48,7 % | 52,0 % | Khan 47,0 % | Imhotep 56,0 % | ✓ |
| Jeanne d’Arc | **50,4 %** | 49,8 % | 50,8 % | Nostradamus 44,0 % | Imhotep 55,0 % | ✓ |
| Leonidas I. | **50,3 %** | 50,9 % | 49,5 % | Dandolo 47,0 % | Boudicca 54,0 % | ✓ |
| Nostradamus | **50,1 %** | 49,5 % | 50,6 % | Musashi 41,5 % | Jeanne 56,0 % | ✓ |
| Hypatia | **48,9 %** | 50,1 % | 48,1 % | Musashi 45,5 % | Nostradamus 52,5 % | ✓ |
| Enrico Dandolo | **48,6 %** | 52,1 % | 45,6 % | Musashi 43,0 % | Leonidas 53,0 % | ✓ |
| Imhotep | **47,9 %** | 49,0 % | 47,6 % | Boudicca 41,5 % | Musashi 53,5 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 52 | 50 | 47 | 53 | 54 | 49 | 52 | 47 | 50 |
| Hypatia | 49 | · | 48 | 49 | 49 | 50 | 53 | 49 | 50 | 46 |
| Imhotep | 51 | 53 | · | 49 | 50 | 42 | 47 | 45 | 44 | 54 |
| Dandolo | 53 | 51 | 52 | · | 50 | 47 | 46 | 49 | 48 | 43 |
| Khan | 47 | 52 | 51 | 50 | · | 52 | 56 | 50 | 53 | 54 |
| Boudicca | 46 | 50 | 59 | 53 | 49 | · | 48 | 53 | 51 | 48 |
| Nostradamus | 51 | 48 | 53 | 54 | 44 | 53 | · | 56 | 50 | 42 |
| Jeanne | 49 | 52 | 55 | 52 | 51 | 48 | 44 | · | 51 | 55 |
| Ragnar | 53 | 50 | 56 | 52 | 47 | 49 | 51 | 50 | · | 47 |
| Musashi | 50 | 54 | 47 | 57 | 47 | 53 | 59 | 45 | 53 | · |

**Partielänge** (Züge beider Seiten zusammen): Mittel 20,0, Median 19, 10–90 %: 14–27, kürzeste 8, längste 55. Beginner gewinnt 50,2 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Phalanxveteran | Leonidas | 5 | 63,2 % | +13,0 | 56,8 % |
| Wächter des Weltenbaums | neutral | 8 | 62,7 % | +12,8 | 41,5 % |
| Djoser, der Erbauer | Imhotep | 8 | 58,0 % | +9,7 | 46,4 % |
| Die Fahne erheben | Jeanne | 2 | 58,8 % | +8,5 | 53,1 % |
| Schildmaid | Ragnar | 3 | 57,9 % | +7,5 | 54,6 % |
| Goldener Reiter | Khan | 4 | 57,7 % | +6,6 | 47,1 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 56,4 % | +6,2 | 46,1 % |
| Astrolabienwächter | Hypatia | 3 | 55,1 % | +6,0 | 58,6 % |
| Lehrsatz | Hypatia | 2 | 45,3 % | −3,7 | 41,0 % |
| Vergessene Weisheit | neutral | 5 | 46,0 % | −4,0 | 24,2 % |
| Dienekes | Leonidas | 6 | 46,1 % | −4,1 | 49,4 % |
| Kriegselefant | neutral | 7 | 45,4 % | −4,6 | 48,1 % |
| Urteil der Sonne | Imhotep | 5 | 43,7 % | −4,7 | 55,5 % |
| Zorn der Königin | Boudicca | 5 | 45,2 % | −5,2 | 29,1 % |
| Feldration | neutral | 2 | 43,7 % | −6,3 | 24,1 % |
| Subutai, der Stratege | Khan | 8 | 44,0 % | −7,1 | 35,0 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 2200 | 80,0 % | 50,6 % | +0,9 | 872 | 56,7 % | 54,1 % | +3,9 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 2200 | 80,9 % | 50,7 % | +1,1 | 1140 | 58,6 % | 51,1 % | +0,8 |
| Bronzener Wall | Leonidas | 2 | Basis | 2200 | 80,7 % | 51,0 % | +1,4 | 1210 | 54,0 % | 50,7 % | +0,5 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 2200 | 77,2 % | 51,3 % | +1,7 | 1024 | 48,7 % | 48,8 % | −1,5 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1194 | 57,8 % | 53,7 % | +3,4 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1176 | 55,8 % | 49,7 % | −0,5 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1066 | 56,8 % | 63,2 % | +13,0 |
| Spartas Vermächtnis | Leonidas | 4 | Selten | – | – | – | – | 994 | 40,7 % | 51,3 % | +1,1 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 1160 | 49,4 % | 46,1 % | −4,1 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 926 | 46,1 % | 56,4 % | +6,2 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 2200 | 83,8 % | 49,8 % | −1,7 | 822 | 54,9 % | 45,5 % | −3,6 |
| Himmelsstrahl | Hypatia | 2 | Basis | 2200 | 85,7 % | 51,2 % | −0,3 | 1200 | 61,3 % | 51,9 % | +2,8 |
| Sternenkundiger | Hypatia | 3 | Basis | 2200 | 82,0 % | 53,5 % | +2,0 | 1236 | 50,8 % | 51,9 % | +2,8 |
| Sternenregen | Hypatia | 4 | Basis | 2200 | 77,6 % | 55,0 % | +3,4 | 1008 | 47,9 % | 53,3 % | +4,2 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1184 | 58,6 % | 55,1 % | +6,0 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1166 | 41,0 % | 45,3 % | −3,7 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1020 | 51,3 % | 53,9 % | +4,8 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 1196 | 52,0 % | 50,0 % | +0,9 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 986 | 57,0 % | 48,2 % | −0,9 |
| Theon, der Gelehrte | Hypatia | 7 | Legendär | – | – | – | – | 970 | 46,8 % | 51,6 % | +2,5 |
| Nilschülerin | Imhotep | 1 | Basis | 2200 | 81,8 % | 47,7 % | −0,5 | 880 | 58,3 % | 47,3 % | −1,0 |
| Heilender Balsam | Imhotep | 1 | Basis | 2200 | 83,5 % | 50,0 % | +1,7 | 890 | 57,3 % | 50,9 % | +2,6 |
| Pyramidenwächter | Imhotep | 3 | Basis | 2200 | 84,0 % | 49,5 % | +1,2 | 1170 | 55,3 % | 52,8 % | +4,5 |
| Tempelärztin | Imhotep | 4 | Basis | 2200 | 80,5 % | 49,1 % | +0,8 | 1078 | 51,9 % | 50,0 % | +1,7 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1126 | 55,2 % | 52,0 % | +3,7 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1206 | 60,3 % | 51,6 % | +3,3 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1202 | 47,7 % | 47,8 % | −0,5 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1084 | 56,0 % | 52,4 % | +4,1 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 1082 | 55,5 % | 43,7 % | −4,7 |
| Djoser, der Erbauer | Imhotep | 8 | Legendär | – | – | – | – | 774 | 46,4 % | 58,0 % | +9,7 |
| Lagunenbote | Dandolo | 1 | Basis | 2200 | 78,2 % | 51,0 % | +2,3 | 820 | 55,6 % | 52,6 % | +3,7 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 2200 | 81,0 % | 48,7 % | +0,0 | 1120 | 49,6 % | 47,8 % | −1,1 |
| Präziser Stich | Dandolo | 2 | Basis | 2200 | 84,1 % | 49,8 % | +1,1 | 1096 | 55,0 % | 49,8 % | +0,9 |
| Handelsgesandter | Dandolo | 4 | Basis | 2200 | 77,4 % | 51,4 % | +2,6 | 964 | 44,1 % | 47,5 % | −1,4 |
| Dogenklinge | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1084 | 48,4 % | 52,1 % | +3,2 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1142 | 54,1 % | 52,1 % | +3,3 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1060 | 41,9 % | 47,2 % | −1,7 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1030 | 50,4 % | 49,4 % | +0,6 |
| Arsenal von Venedig | Dandolo | 4 | Episch | – | – | – | – | 1020 | 35,1 % | 48,9 % | +0,1 |
| Marco, der Weltenfahrer | Dandolo | 7 | Legendär | – | – | – | – | 1072 | 42,7 % | 48,4 % | −0,5 |
| Steppenspäher | Khan | 1 | Basis | 2200 | 77,3 % | 49,5 % | −0,8 | 880 | 49,9 % | 53,4 % | +2,3 |
| Reiterbogenschütze | Khan | 2 | Basis | 2200 | 76,4 % | 48,2 % | −2,0 | 1212 | 53,5 % | 51,9 % | +0,8 |
| Pfeilschuss | Khan | 2 | Basis | 2200 | 76,6 % | 48,4 % | −1,9 | 1156 | 59,1 % | 50,7 % | −0,4 |
| Goldener Reiter | Khan | 4 | Basis | 2200 | 71,7 % | 56,0 % | +5,7 | 1052 | 47,1 % | 57,7 % | +6,6 |
| Adlerjägerin | Khan | 3 | Gewöhnlich | – | – | – | – | 1226 | 45,6 % | 52,9 % | +1,8 |
| Steppensturm | Khan | 3 | Gewöhnlich | – | – | – | – | 1204 | 47,8 % | 48,6 % | −2,5 |
| Tumenwächter | Khan | 5 | Selten | – | – | – | – | 1014 | 49,7 % | 50,9 % | −0,2 |
| Belagerungsfeuer | Khan | 6 | Selten | – | – | – | – | 1158 | 48,2 % | 54,4 % | +3,3 |
| Keshig-Elite | Khan | 6 | Episch | – | – | – | – | 1114 | 41,6 % | 51,3 % | +0,2 |
| Subutai, der Stratege | Khan | 8 | Legendär | – | – | – | – | 622 | 35,0 % | 44,0 % | −7,1 |
| Hainwächterin | Boudicca | 1 | Basis | 2200 | 84,1 % | 48,3 % | −1,7 | 858 | 56,2 % | 54,5 % | +4,1 |
| Eichenhaut | Boudicca | 2 | Basis | 2200 | 76,2 % | 48,5 % | −1,5 | 1190 | 41,8 % | 47,5 % | −3,0 |
| Icenerkrieger | Boudicca | 3 | Basis | 2200 | 85,0 % | 51,2 % | +1,3 | 1150 | 58,0 % | 53,6 % | +3,2 |
| Wilder Hieb | Boudicca | 3 | Basis | 2200 | 84,3 % | 49,1 % | −0,8 | 1158 | 58,8 % | 51,6 % | +1,2 |
| Streitwagenlenkerin | Boudicca | 4 | Gewöhnlich | – | – | – | – | 1064 | 47,2 % | 47,2 % | −3,2 |
| Druidin des Hains | Boudicca | 3 | Gewöhnlich | – | – | – | – | 1142 | 55,0 % | 51,1 % | +0,7 |
| Aufstand | Boudicca | 3 | Selten | – | – | – | – | 1164 | 54,7 % | 54,1 % | +3,7 |
| Eichenkoloss | Boudicca | 6 | Selten | – | – | – | – | 1248 | 52,2 % | 53,8 % | +3,4 |
| Zorn der Königin | Boudicca | 5 | Episch | – | – | – | – | 1044 | 29,1 % | 45,2 % | −5,2 |
| Andraste, die Beschützerin | Boudicca | 8 | Legendär | – | – | – | – | 674 | 38,6 % | 56,0 % | +5,6 |
| Tintenlehrling | Nostradamus | 1 | Basis | 2200 | 85,0 % | 53,4 % | +2,5 | 928 | 58,7 % | 50,8 % | +0,8 |
| Dunkle Vorahnung | Nostradamus | 2 | Basis | 2200 | 89,4 % | 53,6 % | +2,8 | 1220 | 61,9 % | 51,5 % | +1,4 |
| Maskierter Seher | Nostradamus | 3 | Basis | 2200 | 84,9 % | 51,7 % | +0,9 | 1174 | 48,3 % | 49,4 % | −0,6 |
| Prophezeiung | Nostradamus | 4 | Basis | 2200 | 63,6 % | 51,8 % | +0,9 | 1028 | 15,9 % | 47,7 % | −2,3 |
| Pestdoktor | Nostradamus | 4 | Gewöhnlich | – | – | – | – | 948 | 53,3 % | 55,6 % | +5,6 |
| Schattenpakt | Nostradamus | 2 | Gewöhnlich | – | – | – | – | 1190 | 56,7 % | 54,3 % | +4,3 |
| Chronist der Nacht | Nostradamus | 5 | Selten | – | – | – | – | 1006 | 50,9 % | 49,5 % | −0,5 |
| Rote Finsternis | Nostradamus | 5 | Selten | – | – | – | – | 992 | 43,4 % | 51,0 % | +0,9 |
| Wächter der Zeiten | Nostradamus | 6 | Episch | – | – | – | – | 1132 | 57,1 % | 52,2 % | +2,2 |
| Caterina, die Regentin | Nostradamus | 7 | Legendär | – | – | – | – | 1030 | 53,3 % | 54,7 % | +4,7 |
| Bauernrekrut | Jeanne | 1 | Basis | 2200 | 80,4 % | 50,6 % | +0,0 | 890 | 59,0 % | 54,4 % | +4,1 |
| Bannersegen | Jeanne | 2 | Basis | 2200 | 80,3 % | 51,4 % | +0,8 | 1064 | 50,8 % | 51,2 % | +0,9 |
| Wache von Orléans | Jeanne | 3 | Basis | 2200 | 79,0 % | 51,0 % | +0,4 | 1184 | 57,5 % | 56,0 % | +5,7 |
| Die Fahne erheben | Jeanne | 2 | Basis | 2200 | 79,0 % | 49,8 % | −0,9 | 1198 | 53,1 % | 58,8 % | +8,5 |
| Lilienritter | Jeanne | 4 | Gewöhnlich | – | – | – | – | 984 | 41,4 % | 47,2 % | −3,2 |
| Heiliger Schutz | Jeanne | 2 | Gewöhnlich | – | – | – | – | 1114 | 46,6 % | 50,7 % | +0,4 |
| Standartenträgerin | Jeanne | 5 | Selten | – | – | – | – | 1000 | 53,2 % | 54,5 % | +4,1 |
| Glocken von Reims | Jeanne | 6 | Selten | – | – | – | – | 1094 | 40,5 % | 50,6 % | +0,3 |
| Paladin der Loire | Jeanne | 7 | Episch | – | – | – | – | 1002 | 40,6 % | 50,4 % | +0,0 |
| La Hire, der Unbeugsame | Jeanne | 8 | Legendär | – | – | – | – | 672 | 39,1 % | 50,5 % | +0,1 |
| Fjordspäher | Ragnar | 1 | Basis | 2200 | 78,4 % | 49,4 % | −1,2 | 972 | 52,1 % | 50,4 % | +0,1 |
| Runenblitz | Ragnar | 2 | Basis | 2200 | 82,3 % | 50,3 % | −0,3 | 1210 | 59,9 % | 52,1 % | +1,7 |
| Schildmaid | Ragnar | 3 | Basis | 2200 | 81,6 % | 51,2 % | +0,7 | 1148 | 54,6 % | 57,9 % | +7,5 |
| Runenschnitzer | Ragnar | 4 | Basis | 2200 | 76,0 % | 52,7 % | +2,2 | 1014 | 54,2 % | 49,9 % | −0,4 |
| Donnerschlag | Ragnar | 4 | Gewöhnlich | – | – | – | – | 998 | 41,7 % | 49,6 % | −0,7 |
| Berserker vom Fjord | Ragnar | 4 | Gewöhnlich | – | – | – | – | 946 | 47,1 % | 53,3 % | +3,0 |
| Ahnenbund | Ragnar | 3 | Selten | – | – | – | – | 1184 | 54,5 % | 55,4 % | +5,0 |
| Runenhüter | Ragnar | 5 | Selten | – | – | – | – | 1040 | 50,1 % | 50,9 % | +0,6 |
| Sturm der Nordsee | Ragnar | 6 | Episch | – | – | – | – | 1202 | 48,6 % | 51,4 % | +1,0 |
| Lagertha, Schild des Nordens | Ragnar | 8 | Legendär | – | – | – | – | 694 | 37,5 % | 53,8 % | +3,4 |
| Dojoschüler | Musashi | 1 | Basis | 2200 | 81,4 % | 49,5 % | −0,1 | 878 | 54,8 % | 55,3 % | +4,1 |
| Schneller Schnitt | Musashi | 1 | Basis | 2200 | 83,6 % | 50,6 % | +0,9 | 880 | 54,0 % | 54,7 % | +3,4 |
| Rōnin | Musashi | 3 | Basis | 2200 | 83,0 % | 51,3 % | +1,7 | 1210 | 51,4 % | 49,3 % | −2,0 |
| Konzentration | Musashi | 2 | Basis | 2200 | 73,5 % | 51,9 % | +2,3 | 1142 | 41,6 % | 49,8 % | −1,5 |
| Kirschblütenwache | Musashi | 3 | Gewöhnlich | – | – | – | – | 1162 | 52,2 % | 54,2 % | +2,9 |
| Zwei Himmel | Musashi | 3 | Gewöhnlich | – | – | – | – | 1150 | 33,8 % | 49,9 % | −1,3 |
| Duellant | Musashi | 4 | Selten | – | – | – | – | 1058 | 43,7 % | 54,8 % | +3,5 |
| Der leere Geist | Musashi | 5 | Selten | – | – | – | – | 1094 | 42,7 % | 52,8 % | +1,6 |
| Meister der fünf Ringe | Musashi | 6 | Episch | – | – | – | – | 1230 | 50,2 % | 52,0 % | +0,7 |
| Sasaki Kojirō | Musashi | 8 | Legendär | – | – | – | – | 648 | 33,6 % | 54,3 % | +3,0 |
| Dorfwache | neutral | 1 | Basis | 22000 | 81,0 % | 49,2 % | −0,8 | 8922 | 54,2 % | 48,7 % | −1,3 |
| Wandernder Händler | neutral | 2 | Basis | 22000 | 80,4 % | 49,1 % | −0,9 | 11508 | 51,9 % | 49,7 % | −0,3 |
| Steinschleuderer | neutral | 2 | Basis | 22000 | 82,3 % | 49,4 % | −0,6 | 11646 | 54,2 % | 49,1 % | −0,9 |
| Grenzläuferin | neutral | 3 | Basis | 22000 | 83,0 % | 50,5 % | +0,5 | 11690 | 53,0 % | 52,1 % | +2,1 |
| Festungsschild | neutral | 4 | Basis | 22000 | 76,4 % | 50,9 % | +0,9 | 10432 | 45,9 % | 50,2 % | +0,2 |
| Kavallerist | neutral | 4 | Basis | 22000 | 78,4 % | 51,2 % | +1,2 | 10398 | 46,4 % | 50,6 % | +0,7 |
| Feldheilerin | neutral | 3 | Basis | 22000 | 80,9 % | 49,5 % | −0,5 | 11730 | 53,2 % | 50,2 % | +0,2 |
| Archivarin | neutral | 4 | Basis | 22000 | 74,2 % | 52,4 % | +2,4 | 10152 | 44,4 % | 49,8 % | −0,2 |
| Wachhund | neutral | 2 | Basis | 22000 | 80,7 % | 48,5 % | −1,5 | 11506 | 54,2 % | 47,5 % | −2,5 |
| Veteran | neutral | 5 | Basis | 22000 | 79,5 % | 52,5 % | +2,5 | 10412 | 49,0 % | 48,7 % | −1,2 |
| Belagerungsturm | neutral | 6 | Basis | 22000 | 76,6 % | 55,6 % | +5,6 | 11738 | 49,4 % | 50,6 % | +0,7 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 11738 | 50,4 % | 49,5 % | −0,5 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 8728 | 54,5 % | 52,5 % | +2,5 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 10454 | 50,1 % | 55,3 % | +5,3 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 11734 | 50,0 % | 49,5 % | −0,5 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 11416 | 51,3 % | 50,3 % | +0,3 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 11706 | 38,1 % | 48,1 % | −1,9 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 8884 | 48,0 % | 47,9 % | −2,1 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 11694 | 56,5 % | 48,9 % | −1,1 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 10148 | 48,1 % | 45,4 % | −4,6 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 11730 | 55,3 % | 50,4 % | +0,5 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 10456 | 47,1 % | 48,7 % | −1,3 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 11396 | 56,0 % | 51,7 % | +1,7 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 10282 | 49,1 % | 52,7 % | +2,7 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 11752 | 58,0 % | 52,0 % | +2,0 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 11606 | 24,1 % | 43,7 % | −6,3 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 10254 | 47,3 % | 47,0 % | −3,0 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 10442 | 44,5 % | 52,0 % | +2,0 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 10296 | 52,0 % | 52,0 % | +2,1 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 10328 | 44,5 % | 53,9 % | +3,9 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 10624 | 51,6 % | 50,6 % | +0,7 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 10642 | 47,5 % | 48,6 % | −1,4 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 10284 | 38,8 % | 47,7 % | −2,3 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 11966 | 53,5 % | 49,7 % | −0,3 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 10330 | 43,2 % | 49,8 % | −0,1 |
| Vergessene Weisheit | neutral | 5 | Episch | – | – | – | – | 10496 | 24,2 % | 46,0 % | −4,0 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 7034 | 41,5 % | 62,7 % | +12,8 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 10346 | 50,9 % | 52,7 % | +2,8 |
| Herodot, der Chronist | neutral | 8 | Legendär | – | – | – | – | 6792 | 39,6 % | 48,4 % | −1,5 |
| Zenobia, Königin von Palmyra | neutral | 9 | Legendär | – | – | – | – | – | – | – | – |
