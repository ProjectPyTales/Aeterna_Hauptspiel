# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `3d6e4f0cd5` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die neun anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±2,3.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 11000 | ✓ 10/10 | ✓ 45/45 | ✓ 45,8 % | – | 0 | 23 |
| Zufallsdecks | 11000 | ✓ 10/10 | ✓ 45/45 | ✓ 51,4 % | ✓ 52,8 % (+2,8) | 0 | 19 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | Ziel |
|---|---|---|---|---|---|---|
| Hypatia | **51,8 %** | 46,3 % | 56,7 % | Musashi 46,0 % | Khan 59,0 % | ✓ |
| Jeanne d’Arc | **51,0 %** | 44,0 % | 57,6 % | Hypatia 41,5 % | Musashi 59,5 % | ✓ |
| Nostradamus | **50,9 %** | 50,6 % | 50,9 % | Khan 40,0 % | Boudicca 60,0 % | ✓ |
| Ragnar Lodbrok | **50,7 %** | 44,9 % | 56,2 % | Jeanne 44,5 % | Imhotep 56,5 % | ✓ |
| Dschingis Khan | **50,4 %** | 45,8 % | 54,8 % | Hypatia 41,0 % | Nostradamus 60,0 % | ✓ |
| Boudicca | **49,9 %** | 42,5 % | 57,5 % | Nostradamus 40,0 % | Musashi 56,5 % | ✓ |
| Leonidas I. | **49,6 %** | 49,5 % | 49,8 % | Dandolo 45,0 % | Imhotep 53,0 % | ✓ |
| Miyamoto Musashi | **49,3 %** | 43,7 % | 55,2 % | Jeanne 40,5 % | Dandolo 59,5 % | ✓ |
| Enrico Dandolo | **48,4 %** | 44,8 % | 52,5 % | Musashi 40,5 % | Imhotep 58,0 % | ✓ |
| Imhotep | **47,9 %** | 46,0 % | 50,5 % | Dandolo 42,0 % | Musashi 55,5 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 51 | 53 | 45 | 47 | 53 | 53 | 51 | 47 | 49 |
| Hypatia | 50 | · | 48 | 51 | 59 | 53 | 49 | 59 | 53 | 46 |
| Imhotep | 47 | 53 | · | 42 | 50 | 52 | 44 | 46 | 44 | 56 |
| Dandolo | 55 | 49 | 58 | · | 44 | 46 | 46 | 48 | 50 | 41 |
| Khan | 53 | 41 | 51 | 56 | · | 45 | 60 | 48 | 51 | 49 |
| Boudicca | 48 | 47 | 48 | 54 | 55 | · | 40 | 55 | 47 | 56 |
| Nostradamus | 48 | 51 | 56 | 54 | 40 | 60 | · | 51 | 46 | 52 |
| Jeanne | 50 | 42 | 54 | 53 | 52 | 45 | 49 | · | 56 | 60 |
| Ragnar | 53 | 47 | 56 | 50 | 49 | 53 | 54 | 44 | · | 49 |
| Musashi | 51 | 54 | 44 | 60 | 52 | 44 | 48 | 41 | 52 | · |

**Partielänge** (Züge beider Seiten zusammen): Mittel 24,3, Median 23, 10–90 %: 17–33, kürzeste 10, längste 64. Beginner gewinnt 45,8 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Goldener Reiter | Khan | 4 | 56,1 % | +5,8 | 71,7 % |
| Belagerungsturm | neutral | 6 | 55,6 % | +5,6 | 76,7 % |
| Sternenregen | Hypatia | 4 | 54,9 % | +3,4 | 77,6 % |
| Dunkle Vorahnung | Nostradamus | 2 | 53,5 % | +2,8 | 89,3 % |
| Handelsgesandter | Dandolo | 4 | 51,3 % | +2,6 | 77,4 % |
| Tintenlehrling | Nostradamus | 1 | 53,3 % | +2,5 | 85,0 % |
| Veteran | neutral | 5 | 52,5 % | +2,5 | 79,5 % |
| Archivarin | neutral | 4 | 52,4 % | +2,4 | 74,1 % |
| Die Fahne erheben | Jeanne | 2 | 49,9 % | −0,9 | 79,0 % |
| Fjordspäher | Ragnar | 1 | 49,3 % | −1,3 | 78,5 % |
| Eichenhaut | Boudicca | 2 | 48,5 % | −1,4 | 76,3 % |
| Wachhund | neutral | 2 | 48,5 % | −1,5 | 80,6 % |
| Hainwächterin | Boudicca | 1 | 48,3 % | −1,6 | 84,1 % |
| Bibliothekslehrling | Hypatia | 1 | 49,7 % | −1,8 | 83,9 % |
| Pfeilschuss | Khan | 2 | 48,5 % | −1,9 | 76,5 % |
| Reiterbogenschütze | Khan | 2 | 48,3 % | −2,0 | 76,3 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | Ziel |
|---|---|---|---|---|---|---|
| Dschingis Khan | **51,8 %** | 51,6 % | 51,3 % | Jeanne 48,0 % | Dandolo 56,0 % | ✓ |
| Nostradamus | **51,5 %** | 53,7 % | 48,7 % | Dandolo 46,5 % | Imhotep 57,0 % | ✓ |
| Miyamoto Musashi | **51,5 %** | 51,5 % | 50,9 % | Khan 45,5 % | Boudicca 57,5 % | ✓ |
| Enrico Dandolo | **51,0 %** | 55,4 % | 46,3 % | Khan 44,0 % | Hypatia 57,0 % | ✓ |
| Ragnar Lodbrok | **50,4 %** | 51,7 % | 49,0 % | Musashi 45,5 % | Imhotep 55,5 % | ✓ |
| Jeanne d’Arc | **49,8 %** | 50,7 % | 49,0 % | Hypatia 44,0 % | Leonidas 57,0 % | ✓ |
| Leonidas I. | **49,4 %** | 50,0 % | 49,1 % | Jeanne 43,0 % | Boudicca 54,5 % | ✓ |
| Hypatia | **48,8 %** | 51,0 % | 47,0 % | Dandolo 43,0 % | Jeanne 56,0 % | ✓ |
| Imhotep | **48,7 %** | 50,2 % | 47,6 % | Nostradamus 43,0 % | Hypatia 55,0 % | ✓ |
| Boudicca | **47,1 %** | 48,4 % | 46,8 % | Musashi 42,5 % | Jeanne 50,5 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 52 | 51 | 44 | 51 | 55 | 50 | 43 | 51 | 50 |
| Hypatia | 48 | · | 45 | 43 | 49 | 50 | 46 | 56 | 54 | 50 |
| Imhotep | 50 | 55 | · | 48 | 49 | 51 | 43 | 49 | 45 | 50 |
| Dandolo | 56 | 57 | 53 | · | 44 | 54 | 54 | 48 | 48 | 47 |
| Khan | 50 | 52 | 52 | 56 | · | 50 | 52 | 48 | 54 | 55 |
| Boudicca | 45 | 50 | 49 | 46 | 50 | · | 45 | 51 | 46 | 43 |
| Nostradamus | 51 | 54 | 57 | 47 | 49 | 55 | · | 55 | 48 | 49 |
| Jeanne | 57 | 44 | 51 | 53 | 52 | 50 | 45 | · | 48 | 50 |
| Ragnar | 49 | 47 | 55 | 52 | 47 | 54 | 52 | 53 | · | 46 |
| Musashi | 50 | 51 | 50 | 53 | 45 | 57 | 52 | 51 | 54 | · |

**Partielänge** (Züge beider Seiten zusammen): Mittel 20,1, Median 19, 10–90 %: 14–27, kürzeste 8, längste 54. Beginner gewinnt 51,4 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Phalanxveteran | Leonidas | 5 | 64,8 % | +15,3 | 54,2 % |
| Wächter des Weltenbaums | neutral | 8 | 62,6 % | +12,6 | 41,1 % |
| Goldener Skarabäus | Imhotep | 5 | 59,4 % | +10,5 | 53,9 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 57,5 % | +7,9 | 45,3 % |
| Schildmaid | Ragnar | 3 | 58,2 % | +7,8 | 53,1 % |
| Die Fahne erheben | Jeanne | 2 | 57,3 % | +7,5 | 52,7 % |
| Hainwächterin | Boudicca | 1 | 55,0 % | +7,4 | 53,6 % |
| Pestdoktor | Nostradamus | 4 | 58,1 % | +6,9 | 53,0 % |
| Prophezeiung | Nostradamus | 4 | 48,1 % | −3,1 | 17,1 % |
| Lilienritter | Jeanne | 4 | 46,6 % | −3,2 | 38,7 % |
| Dienekes | Leonidas | 6 | 46,1 % | −3,5 | 50,4 % |
| Zorn der Königin | Boudicca | 5 | 43,6 % | −3,9 | 29,7 % |
| Bibliothekslehrling | Hypatia | 1 | 44,5 % | −4,5 | 54,9 % |
| Eichenhaut | Boudicca | 2 | 43,1 % | −4,5 | 38,9 % |
| Feldration | neutral | 2 | 44,8 % | −5,2 | 25,9 % |
| Bogenmeisterin | neutral | 4 | 44,7 % | −5,3 | 44,1 % |

**Legendäre** (AP 5.3) – als Gruppe 52,8 % „gewinnt, wenn gezogen“ (+2,8 gegenüber ihrem Helden, 13555 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Gorgo, Stimme Spartas | Leonidas | 7 | 57,5 % | +7,9 | 45,3 % |
| Lagertha, Schildmaid | Ragnar | 7 | 55,8 % | +5,4 | 43,2 % |
| Subutai, der Stratege | Khan | 6 | 54,3 % | +2,9 | 43,0 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 54,1 % | +4,1 | 39,6 % |
| La Hire, der Unbeugsame | Jeanne | 7 | 52,9 % | +3,0 | 41,1 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 52,5 % | +1,7 | 36,8 % |
| Theon von Alexandria | Hypatia | 5 | 52,1 % | +3,1 | 49,4 % |
| Herodot, Vater der Geschichte | neutral | 4 | 52,0 % | +2,0 | 40,7 % |
| Caterina de’ Medici | Nostradamus | 5 | 52,0 % | +0,8 | 48,3 % |
| Djoser, der Erbauer | Imhotep | 6 | 51,4 % | +2,5 | 48,5 % |
| Andraste, Göttin des Sieges | Boudicca | 8 | 50,1 % | +2,6 | 45,5 % |
| Sasaki Kojirō, der Rivale | Musashi | 6 | 48,7 % | −2,5 | 43,7 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 2200 | 80,0 % | 50,6 % | +0,9 | 878 | 55,0 % | 49,4 % | −0,1 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 2200 | 80,9 % | 50,8 % | +1,1 | 1126 | 58,1 % | 50,8 % | +1,2 |
| Bronzener Wall | Leonidas | 2 | Basis | 2200 | 80,7 % | 51,1 % | +1,4 | 1196 | 55,5 % | 49,2 % | −0,4 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 2200 | 77,2 % | 51,4 % | +1,8 | 968 | 46,4 % | 50,0 % | +0,5 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1170 | 57,7 % | 53,0 % | +3,5 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1140 | 55,4 % | 48,9 % | −0,7 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1048 | 54,2 % | 64,8 % | +15,3 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 990 | 41,6 % | 49,6 % | +0,1 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 1176 | 50,4 % | 46,1 % | −3,5 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 966 | 45,3 % | 57,5 % | +7,9 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 2200 | 83,9 % | 49,7 % | −1,8 | 822 | 54,9 % | 44,5 % | −4,5 |
| Himmelsstrahl | Hypatia | 2 | Basis | 2200 | 85,7 % | 51,1 % | −0,4 | 1164 | 59,5 % | 48,0 % | −1,0 |
| Sternenkundiger | Hypatia | 3 | Basis | 2200 | 81,9 % | 53,4 % | +1,9 | 1196 | 48,4 % | 48,1 % | −0,9 |
| Sternenregen | Hypatia | 4 | Basis | 2200 | 77,6 % | 54,9 % | +3,4 | 972 | 46,2 % | 54,5 % | +5,5 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1118 | 55,7 % | 54,3 % | +5,3 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1142 | 40,6 % | 47,1 % | −1,9 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1030 | 46,2 % | 53,3 % | +4,3 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 1248 | 51,0 % | 48,8 % | −0,2 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 1006 | 50,5 % | 46,2 % | −2,8 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1062 | 49,4 % | 52,1 % | +3,1 |
| Nilschülerin | Imhotep | 1 | Basis | 2200 | 81,8 % | 47,6 % | −0,6 | 880 | 55,6 % | 51,2 % | +2,3 |
| Heilender Balsam | Imhotep | 1 | Basis | 2200 | 83,4 % | 50,0 % | +1,8 | 888 | 56,8 % | 53,4 % | +4,5 |
| Pyramidenwächter | Imhotep | 3 | Basis | 2200 | 84,1 % | 49,6 % | +1,3 | 1154 | 54,9 % | 51,3 % | +2,4 |
| Tempelärztin | Imhotep | 4 | Basis | 2200 | 80,5 % | 49,1 % | +0,8 | 1032 | 48,3 % | 48,9 % | −0,0 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1120 | 51,0 % | 52,8 % | +3,9 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1172 | 58,8 % | 50,4 % | +1,5 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1192 | 45,2 % | 48,5 % | −0,4 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1052 | 53,9 % | 59,4 % | +10,5 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 1060 | 54,5 % | 49,7 % | +0,8 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 1250 | 48,5 % | 51,4 % | +2,5 |
| Lagunenbote | Dandolo | 1 | Basis | 2200 | 78,2 % | 51,0 % | +2,3 | 816 | 52,8 % | 54,7 % | +3,9 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 2200 | 81,0 % | 48,7 % | +0,0 | 1116 | 49,4 % | 54,7 % | +3,9 |
| Präziser Stich | Dandolo | 2 | Basis | 2200 | 84,1 % | 49,8 % | +1,1 | 1094 | 54,0 % | 49,9 % | −0,9 |
| Handelsgesandter | Dandolo | 4 | Basis | 2200 | 77,4 % | 51,3 % | +2,6 | 926 | 43,1 % | 47,8 % | −3,0 |
| Dogenklinge | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1086 | 49,5 % | 53,4 % | +2,6 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1110 | 53,3 % | 56,7 % | +5,8 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1078 | 42,3 % | 52,6 % | +1,8 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1016 | 49,9 % | 51,1 % | +0,3 |
| Arsenal von Venedig | Dandolo | 4 | Episch | – | – | – | – | 960 | 35,5 % | 51,5 % | +0,7 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 1268 | 36,8 % | 52,5 % | +1,7 |
| Steppenspäher | Khan | 1 | Basis | 2200 | 77,3 % | 49,6 % | −0,7 | 876 | 50,7 % | 51,1 % | −0,3 |
| Reiterbogenschütze | Khan | 2 | Basis | 2200 | 76,3 % | 48,3 % | −2,0 | 1192 | 54,4 % | 49,6 % | −1,8 |
| Pfeilschuss | Khan | 2 | Basis | 2200 | 76,5 % | 48,5 % | −1,9 | 1158 | 58,9 % | 53,8 % | +2,4 |
| Goldener Reiter | Khan | 4 | Basis | 2200 | 71,7 % | 56,1 % | +5,8 | 1024 | 45,6 % | 56,3 % | +4,8 |
| Adlerjägerin | Khan | 3 | Gewöhnlich | – | – | – | – | 1184 | 46,5 % | 52,4 % | +1,0 |
| Steppensturm | Khan | 3 | Gewöhnlich | – | – | – | – | 1144 | 46,9 % | 49,7 % | −1,7 |
| Tumenwächter | Khan | 5 | Selten | – | – | – | – | 992 | 45,2 % | 52,1 % | +0,6 |
| Belagerungsfeuer | Khan | 6 | Selten | – | – | – | – | 1156 | 45,1 % | 54,0 % | +2,6 |
| Keshig-Elite | Khan | 6 | Episch | – | – | – | – | 1128 | 40,3 % | 49,0 % | −2,5 |
| Subutai, der Stratege | Khan | 6 | Legendär | – | – | – | – | 1096 | 43,0 % | 54,3 % | +2,9 |
| Hainwächterin | Boudicca | 1 | Basis | 2200 | 84,1 % | 48,3 % | −1,6 | 854 | 53,6 % | 55,0 % | +7,4 |
| Eichenhaut | Boudicca | 2 | Basis | 2200 | 76,3 % | 48,5 % | −1,4 | 1178 | 38,9 % | 43,1 % | −4,5 |
| Icenerkrieger | Boudicca | 3 | Basis | 2200 | 85,0 % | 51,2 % | +1,3 | 1118 | 58,2 % | 51,1 % | +3,5 |
| Wilder Hieb | Boudicca | 3 | Basis | 2200 | 84,3 % | 49,2 % | −0,8 | 1126 | 58,0 % | 46,5 % | −1,0 |
| Streitwagenlenkerin | Boudicca | 4 | Gewöhnlich | – | – | – | – | 1028 | 43,8 % | 46,7 % | −0,9 |
| Druidin des Hains | Boudicca | 3 | Gewöhnlich | – | – | – | – | 1118 | 54,7 % | 48,4 % | +0,9 |
| Aufstand | Boudicca | 3 | Selten | – | – | – | – | 1170 | 51,2 % | 49,4 % | +1,8 |
| Eichenkoloss | Boudicca | 6 | Selten | – | – | – | – | 1264 | 54,0 % | 50,0 % | +2,4 |
| Zorn der Königin | Boudicca | 5 | Episch | – | – | – | – | 1044 | 29,7 % | 43,6 % | −3,9 |
| Andraste, Göttin des Sieges | Boudicca | 8 | Legendär | – | – | – | – | 672 | 45,5 % | 50,1 % | +2,6 |
| Tintenlehrling | Nostradamus | 1 | Basis | 2200 | 85,0 % | 53,3 % | +2,5 | 924 | 58,0 % | 53,6 % | +2,4 |
| Dunkle Vorahnung | Nostradamus | 2 | Basis | 2200 | 89,3 % | 53,5 % | +2,8 | 1220 | 63,1 % | 53,5 % | +2,2 |
| Maskierter Seher | Nostradamus | 3 | Basis | 2200 | 84,9 % | 51,7 % | +0,9 | 1132 | 50,3 % | 49,2 % | −2,0 |
| Prophezeiung | Nostradamus | 4 | Basis | 2200 | 63,7 % | 51,7 % | +1,0 | 960 | 17,1 % | 48,1 % | −3,1 |
| Pestdoktor | Nostradamus | 4 | Gewöhnlich | – | – | – | – | 940 | 53,0 % | 58,1 % | +6,9 |
| Schattenpakt | Nostradamus | 2 | Gewöhnlich | – | – | – | – | 1140 | 56,0 % | 56,8 % | +5,6 |
| Chronist der Nacht | Nostradamus | 5 | Selten | – | – | – | – | 980 | 52,1 % | 50,3 % | −0,9 |
| Rote Finsternis | Nostradamus | 5 | Selten | – | – | – | – | 1030 | 41,1 % | 56,4 % | +5,2 |
| Wächter der Zeiten | Nostradamus | 6 | Episch | – | – | – | – | 1182 | 56,1 % | 54,4 % | +3,2 |
| Caterina de’ Medici | Nostradamus | 5 | Legendär | – | – | – | – | 984 | 48,3 % | 52,0 % | +0,8 |
| Bauernrekrut | Jeanne | 1 | Basis | 2200 | 80,5 % | 50,8 % | +0,0 | 894 | 58,2 % | 56,5 % | +6,7 |
| Bannersegen | Jeanne | 2 | Basis | 2200 | 80,3 % | 51,8 % | +0,9 | 1050 | 49,4 % | 50,0 % | +0,1 |
| Wache von Orléans | Jeanne | 3 | Basis | 2200 | 79,0 % | 51,3 % | +0,4 | 1166 | 55,1 % | 53,2 % | +3,4 |
| Die Fahne erheben | Jeanne | 2 | Basis | 2200 | 79,0 % | 49,9 % | −0,9 | 1150 | 52,7 % | 57,3 % | +7,5 |
| Lilienritter | Jeanne | 4 | Gewöhnlich | – | – | – | – | 950 | 38,7 % | 46,6 % | −3,2 |
| Heiliger Schutz | Jeanne | 2 | Gewöhnlich | – | – | – | – | 1156 | 45,6 % | 51,2 % | +1,3 |
| Standartenträgerin | Jeanne | 5 | Selten | – | – | – | – | 966 | 47,6 % | 49,1 % | −0,7 |
| Glocken von Reims | Jeanne | 6 | Selten | – | – | – | – | 1102 | 40,0 % | 52,0 % | +2,2 |
| Paladin der Loire | Jeanne | 7 | Episch | – | – | – | – | 992 | 38,9 % | 49,7 % | −0,1 |
| La Hire, der Unbeugsame | Jeanne | 7 | Legendär | – | – | – | – | 1014 | 41,1 % | 52,9 % | +3,0 |
| Fjordspäher | Ragnar | 1 | Basis | 2200 | 78,5 % | 49,3 % | −1,3 | 944 | 51,4 % | 49,5 % | −0,9 |
| Runenblitz | Ragnar | 2 | Basis | 2200 | 82,3 % | 50,2 % | −0,3 | 1170 | 57,6 % | 51,5 % | +1,2 |
| Schildmaid | Ragnar | 3 | Basis | 2200 | 81,5 % | 51,2 % | +0,7 | 1100 | 53,1 % | 58,2 % | +7,8 |
| Runenschnitzer | Ragnar | 4 | Basis | 2200 | 75,9 % | 52,8 % | +2,2 | 964 | 50,3 % | 50,3 % | −0,1 |
| Donnerschlag | Ragnar | 3 | Gewöhnlich | – | – | – | – | 1136 | 58,2 % | 49,9 % | −0,5 |
| Berserker vom Fjord | Ragnar | 4 | Gewöhnlich | – | – | – | – | 936 | 46,3 % | 52,8 % | +2,5 |
| Ahnenbund | Ragnar | 3 | Selten | – | – | – | – | 1098 | 51,7 % | 53,1 % | +2,7 |
| Runenhüter | Ragnar | 5 | Selten | – | – | – | – | 1022 | 48,1 % | 48,7 % | −1,6 |
| Sturm der Nordsee | Ragnar | 5 | Episch | – | – | – | – | 1022 | 51,1 % | 51,6 % | +1,2 |
| Lagertha, Schildmaid | Ragnar | 7 | Legendär | – | – | – | – | 1020 | 43,2 % | 55,8 % | +5,4 |
| Dojoschüler | Musashi | 1 | Basis | 2200 | 81,4 % | 49,3 % | −0,1 | 876 | 52,4 % | 57,1 % | +5,9 |
| Schneller Schnitt | Musashi | 1 | Basis | 2200 | 83,6 % | 50,4 % | +0,9 | 880 | 54,7 % | 53,7 % | +2,5 |
| Rōnin | Musashi | 3 | Basis | 2200 | 83,0 % | 51,1 % | +1,7 | 1174 | 51,5 % | 53,1 % | +1,9 |
| Konzentration | Musashi | 2 | Basis | 2200 | 73,5 % | 51,8 % | +2,3 | 1144 | 40,8 % | 52,5 % | +1,3 |
| Kirschblütenwache | Musashi | 3 | Gewöhnlich | – | – | – | – | 1128 | 51,3 % | 56,0 % | +4,7 |
| Zwei Himmel | Musashi | 3 | Gewöhnlich | – | – | – | – | 1108 | 37,9 % | 49,0 % | −2,2 |
| Duellant | Musashi | 4 | Selten | – | – | – | – | 1016 | 38,6 % | 51,1 % | −0,1 |
| Der leere Geist | Musashi | 5 | Selten | – | – | – | – | 1068 | 39,7 % | 51,7 % | +0,5 |
| Meister der fünf Ringe | Musashi | 6 | Episch | – | – | – | – | 1250 | 50,3 % | 49,2 % | −2,0 |
| Sasaki Kojirō, der Rivale | Musashi | 6 | Legendär | – | – | – | – | 1092 | 43,7 % | 48,7 % | −2,5 |
| Dorfwache | neutral | 1 | Basis | 22000 | 81,0 % | 49,1 % | −0,9 | 8912 | 53,6 % | 48,6 % | −1,4 |
| Wandernder Händler | neutral | 2 | Basis | 22000 | 80,3 % | 49,1 % | −0,9 | 11280 | 50,9 % | 50,5 % | +0,5 |
| Steinschleuderer | neutral | 2 | Basis | 22000 | 82,3 % | 49,4 % | −0,6 | 11510 | 54,4 % | 50,0 % | +0,0 |
| Grenzläuferin | neutral | 3 | Basis | 22000 | 83,0 % | 50,6 % | +0,6 | 11456 | 52,5 % | 52,7 % | +2,7 |
| Festungsschild | neutral | 4 | Basis | 22000 | 76,4 % | 50,9 % | +1,0 | 9948 | 44,0 % | 49,4 % | −0,6 |
| Kavallerist | neutral | 4 | Basis | 22000 | 78,3 % | 51,2 % | +1,2 | 10048 | 44,1 % | 49,9 % | −0,1 |
| Feldheilerin | neutral | 3 | Basis | 22000 | 80,9 % | 49,4 % | −0,5 | 11558 | 52,6 % | 49,4 % | −0,6 |
| Archivarin | neutral | 4 | Basis | 22000 | 74,1 % | 52,4 % | +2,4 | 9902 | 43,6 % | 49,9 % | −0,1 |
| Wachhund | neutral | 2 | Basis | 22000 | 80,6 % | 48,5 % | −1,5 | 11334 | 53,3 % | 47,4 % | −2,6 |
| Veteran | neutral | 5 | Basis | 22000 | 79,5 % | 52,5 % | +2,5 | 10286 | 48,6 % | 47,6 % | −2,4 |
| Belagerungsturm | neutral | 6 | Basis | 22000 | 76,7 % | 55,6 % | +5,6 | 12160 | 48,2 % | 49,7 % | −0,3 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 11394 | 49,9 % | 49,8 % | −0,1 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 8724 | 53,2 % | 52,0 % | +2,1 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 10336 | 47,4 % | 53,2 % | +3,3 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 11710 | 50,7 % | 49,8 % | −0,2 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 11156 | 51,3 % | 50,8 % | +0,8 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 11562 | 39,6 % | 48,8 % | −1,2 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 8830 | 47,3 % | 47,1 % | −2,9 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 11336 | 55,9 % | 49,3 % | −0,7 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 10406 | 48,2 % | 52,9 % | +3,0 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 11464 | 54,1 % | 51,6 % | +1,6 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 10112 | 45,4 % | 47,8 % | −2,2 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 11328 | 54,4 % | 52,0 % | +2,0 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 9866 | 47,3 % | 51,2 % | +1,2 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 11466 | 56,9 % | 52,8 % | +2,8 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 11566 | 25,9 % | 44,8 % | −5,2 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 9894 | 44,1 % | 44,7 % | −5,3 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 10444 | 44,0 % | 50,6 % | +0,7 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 9936 | 50,2 % | 53,7 % | +3,7 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 9944 | 43,1 % | 53,5 % | +3,5 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 10350 | 49,5 % | 51,9 % | +1,9 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 10492 | 46,0 % | 48,2 % | −1,7 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 10190 | 38,4 % | 48,3 % | −1,7 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 12370 | 52,0 % | 50,5 % | +0,5 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 10674 | 42,8 % | 50,5 % | +0,5 |
| Vergessene Weisheit | neutral | 4 | Episch | – | – | – | – | 9702 | 20,6 % | 47,0 % | −3,0 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 7272 | 41,1 % | 62,6 % | +12,6 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 10780 | 50,2 % | 51,5 % | +1,5 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 9906 | 40,7 % | 52,0 % | +2,0 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 7026 | 39,6 % | 54,1 % | +4,1 |
