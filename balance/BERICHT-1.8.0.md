# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `17e65bfd67` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die neun anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±2,3.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 11000 | ✓ 10/10 | ✓ 45/45 | ✓ 45,8 % | – | 0 | 23 |
| Zufallsdecks | 11000 | ✓ 10/10 | ✓ 45/45 | ✓ 49,9 % | ✓ 53,1 % (+3,1) | 0 | 20 |

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
| Nostradamus | **52,3 %** | 52,6 % | 51,2 % | Musashi 48,5 % | Dandolo 57,5 % | ✓ |
| Enrico Dandolo | **52,2 %** | 54,5 % | 49,0 % | Nostradamus 42,5 % | Leonidas 59,0 % | ✓ |
| Ragnar Lodbrok | **50,7 %** | 50,6 % | 50,5 % | Nostradamus 46,0 % | Hypatia 54,5 % | ✓ |
| Dschingis Khan | **50,6 %** | 48,8 % | 52,2 % | Dandolo 45,5 % | Musashi 54,0 % | ✓ |
| Miyamoto Musashi | **50,6 %** | 50,1 % | 50,8 % | Dandolo 44,0 % | Jeanne 55,5 % | ✓ |
| Jeanne d’Arc | **50,2 %** | 48,4 % | 52,0 % | Hypatia 42,5 % | Dandolo 56,0 % | ✓ |
| Hypatia | **49,2 %** | 48,5 % | 50,3 % | Musashi 45,0 % | Jeanne 57,5 % | ✓ |
| Boudicca | **48,5 %** | 47,9 % | 49,6 % | Dandolo 45,0 % | Imhotep 53,5 % | ✓ |
| Leonidas I. | **48,3 %** | 48,8 % | 48,4 % | Dandolo 41,0 % | Boudicca 53,5 % | ✓ |
| Imhotep | **47,4 %** | 48,4 % | 47,5 % | Jeanne 45,0 % | Ragnar 50,0 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 48 | 53 | 41 | 47 | 54 | 48 | 47 | 52 | 46 |
| Hypatia | 53 | · | 52 | 46 | 48 | 49 | 49 | 57 | 46 | 45 |
| Imhotep | 47 | 48 | · | 47 | 49 | 47 | 47 | 45 | 50 | 49 |
| Dandolo | 59 | 54 | 53 | · | 55 | 55 | 43 | 44 | 51 | 56 |
| Khan | 53 | 52 | 52 | 45 | · | 53 | 48 | 52 | 48 | 54 |
| Boudicca | 47 | 52 | 53 | 45 | 48 | · | 50 | 47 | 46 | 51 |
| Nostradamus | 52 | 52 | 53 | 57 | 52 | 51 | · | 52 | 54 | 49 |
| Jeanne | 53 | 43 | 55 | 56 | 49 | 53 | 48 | · | 51 | 45 |
| Ragnar | 48 | 54 | 50 | 50 | 53 | 54 | 46 | 50 | · | 52 |
| Musashi | 54 | 55 | 52 | 44 | 46 | 50 | 52 | 55 | 48 | · |

**Partielänge** (Züge beider Seiten zusammen): Mittel 20,4, Median 20, 10–90 %: 14–27, kürzeste 8, längste 58. Beginner gewinnt 49,9 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Wächter des Weltenbaums | neutral | 8 | 62,2 % | +12,2 | 41,5 % |
| Die Fahne erheben | Jeanne | 2 | 60,8 % | +10,6 | 53,7 % |
| Phalanxveteran | Leonidas | 5 | 59,1 % | +10,5 | 53,0 % |
| Pestdoktor | Nostradamus | 4 | 60,8 % | +8,9 | 53,1 % |
| Bauernrekrut | Jeanne | 1 | 58,2 % | +8,1 | 55,5 % |
| Goldener Reiter | Khan | 4 | 57,6 % | +7,1 | 46,7 % |
| Schattenpakt | Nostradamus | 2 | 58,7 % | +6,8 | 56,5 % |
| Goldener Skarabäus | Imhotep | 5 | 54,6 % | +6,7 | 54,9 % |
| Vergessene Weisheit | neutral | 4 | 47,0 % | −3,0 | 20,4 % |
| Erste Hilfe | neutral | 1 | 47,0 % | −3,0 | 48,2 % |
| Dienekes | Leonidas | 6 | 45,3 % | −3,3 | 51,3 % |
| Zwei Himmel | Musashi | 3 | 47,1 % | −3,4 | 33,7 % |
| Lilienritter | Jeanne | 4 | 46,2 % | −4,0 | 39,7 % |
| Tributeintreiber | Khan | 3 | 46,1 % | −4,4 | 51,5 % |
| Maskierter Seher | Nostradamus | 3 | 47,4 % | −4,5 | 47,5 % |
| Feldration | neutral | 2 | 44,1 % | −6,0 | 26,4 % |

**Legendäre** (AP 5.3) – als Gruppe 53,1 % „gewinnt, wenn gezogen“ (+3,1 gegenüber ihrem Helden, 13131 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Lagertha, Schildmaid | Ragnar | 7 | 56,3 % | +5,7 | 46,3 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 55,5 % | +5,5 | 39,8 % |
| Subutai, der Stratege | Khan | 6 | 55,1 % | +4,6 | 42,6 % |
| Caterina de’ Medici | Nostradamus | 5 | 54,8 % | +2,8 | 48,9 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 54,0 % | +5,4 | 44,2 % |
| Andraste, Göttin des Sieges | Boudicca | 8 | 53,6 % | +4,8 | 45,4 % |
| Sasaki Kojirō, der Rivale | Musashi | 6 | 52,8 % | +2,3 | 40,4 % |
| Theon von Alexandria | Hypatia | 5 | 52,7 % | +3,3 | 49,0 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 51,5 % | −0,2 | 39,9 % |
| Herodot, Vater der Geschichte | neutral | 4 | 51,2 % | +1,2 | 40,9 % |
| La Hire, der Unbeugsame | Jeanne | 7 | 51,0 % | +0,8 | 38,9 % |
| Djoser, der Erbauer | Imhotep | 6 | 50,5 % | +2,6 | 49,4 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 2200 | 80,0 % | 50,6 % | +0,9 | 742 | 54,3 % | 53,2 % | +4,6 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 2200 | 80,9 % | 50,8 % | +1,1 | 1010 | 58,1 % | 50,6 % | +2,0 |
| Bronzener Wall | Leonidas | 2 | Basis | 2200 | 80,7 % | 51,1 % | +1,4 | 1060 | 52,7 % | 47,4 % | −1,2 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 2200 | 77,2 % | 51,4 % | +1,8 | 908 | 47,4 % | 48,5 % | −0,1 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1026 | 57,0 % | 49,1 % | +0,5 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1000 | 56,5 % | 47,2 % | −1,3 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1010 | 53,0 % | 59,1 % | +10,5 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 930 | 41,3 % | 48,3 % | −0,3 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 1150 | 51,3 % | 45,3 % | −3,3 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 976 | 44,2 % | 54,0 % | +5,4 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 2200 | 83,9 % | 49,7 % | −1,8 | 700 | 52,1 % | 48,4 % | −1,0 |
| Himmelsstrahl | Hypatia | 2 | Basis | 2200 | 85,7 % | 51,1 % | −0,4 | 1044 | 57,6 % | 50,9 % | +1,5 |
| Sternenkundiger | Hypatia | 3 | Basis | 2200 | 81,9 % | 53,4 % | +1,9 | 1034 | 44,1 % | 49,5 % | +0,2 |
| Sternenregen | Hypatia | 4 | Basis | 2200 | 77,6 % | 54,9 % | +3,4 | 908 | 44,9 % | 55,7 % | +6,3 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1026 | 59,0 % | 54,7 % | +5,3 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 986 | 39,8 % | 47,5 % | −1,9 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1002 | 47,4 % | 50,3 % | +0,9 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 1224 | 50,0 % | 50,0 % | +0,6 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 980 | 53,0 % | 52,6 % | +3,2 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1068 | 49,0 % | 52,7 % | +3,3 |
| Nilschülerin | Imhotep | 1 | Basis | 2200 | 81,8 % | 47,6 % | −0,6 | 730 | 52,2 % | 48,3 % | +0,4 |
| Heilender Balsam | Imhotep | 1 | Basis | 2200 | 83,4 % | 50,0 % | +1,8 | 690 | 57,5 % | 49,4 % | +1,5 |
| Pyramidenwächter | Imhotep | 3 | Basis | 2200 | 84,1 % | 49,6 % | +1,3 | 1012 | 56,0 % | 52,3 % | +4,4 |
| Tempelärztin | Imhotep | 4 | Basis | 2200 | 80,5 % | 49,1 % | +0,8 | 974 | 48,9 % | 46,7 % | −1,2 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 982 | 49,3 % | 50,3 % | +2,4 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1006 | 57,5 % | 51,1 % | +3,2 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1018 | 46,4 % | 47,0 % | −0,9 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1008 | 54,9 % | 54,6 % | +6,7 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 1026 | 53,5 % | 50,2 % | +2,3 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 1238 | 49,4 % | 50,5 % | +2,6 |
| Lagunenbote | Dandolo | 1 | Basis | 2200 | 78,2 % | 51,0 % | +2,3 | 670 | 54,2 % | 53,1 % | +1,3 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 2200 | 81,0 % | 48,7 % | +0,0 | 938 | 48,2 % | 53,0 % | +1,3 |
| Präziser Stich | Dandolo | 2 | Basis | 2200 | 84,1 % | 49,8 % | +1,1 | 942 | 53,1 % | 56,1 % | +4,4 |
| Handelsgesandter | Dandolo | 4 | Basis | 2200 | 77,4 % | 51,3 % | +2,6 | 856 | 42,4 % | 50,7 % | −1,1 |
| Dogenklinge | Dandolo | 2 | Gewöhnlich | – | – | – | – | 896 | 53,2 % | 56,8 % | +5,0 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 976 | 49,5 % | 54,3 % | +2,5 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 966 | 38,6 % | 52,9 % | +1,1 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 960 | 49,7 % | 52,7 % | +0,9 |
| Arsenal von Venedig | Dandolo | 4 | Episch | – | – | – | – | 902 | 36,5 % | 54,5 % | +2,7 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 1256 | 39,9 % | 51,5 % | −0,2 |
| Steppenspäher | Khan | 1 | Basis | 2200 | 77,3 % | 49,6 % | −0,7 | 732 | 50,1 % | 50,8 % | +0,3 |
| Reiterbogenschütze | Khan | 2 | Basis | 2200 | 76,3 % | 48,3 % | −2,0 | 1040 | 51,4 % | 50,2 % | −0,3 |
| Pfeilschuss | Khan | 2 | Basis | 2200 | 76,5 % | 48,5 % | −1,9 | 1052 | 57,3 % | 50,1 % | −0,4 |
| Goldener Reiter | Khan | 4 | Basis | 2200 | 71,7 % | 56,1 % | +5,8 | 948 | 46,7 % | 57,6 % | +7,1 |
| Adlerjägerin | Khan | 3 | Gewöhnlich | – | – | – | – | 1034 | 44,9 % | 54,5 % | +4,0 |
| Steppensturm | Khan | 3 | Gewöhnlich | – | – | – | – | 1044 | 42,0 % | 51,2 % | +0,7 |
| Tumenwächter | Khan | 5 | Selten | – | – | – | – | 926 | 48,8 % | 52,2 % | +1,7 |
| Belagerungsfeuer | Khan | 6 | Selten | – | – | – | – | 1156 | 44,8 % | 53,8 % | +3,3 |
| Keshig-Elite | Khan | 6 | Episch | – | – | – | – | 1132 | 42,3 % | 50,0 % | −0,5 |
| Subutai, der Stratege | Khan | 6 | Legendär | – | – | – | – | 1108 | 42,6 % | 55,1 % | +4,6 |
| Hainwächterin | Boudicca | 1 | Basis | 2200 | 84,1 % | 48,3 % | −1,6 | 690 | 55,1 % | 49,1 % | +0,4 |
| Eichenhaut | Boudicca | 2 | Basis | 2200 | 76,3 % | 48,5 % | −1,4 | 1020 | 39,9 % | 46,8 % | −1,9 |
| Icenerkrieger | Boudicca | 3 | Basis | 2200 | 85,0 % | 51,2 % | +1,3 | 1018 | 56,3 % | 51,8 % | +3,0 |
| Wilder Hieb | Boudicca | 3 | Basis | 2200 | 84,3 % | 49,2 % | −0,8 | 1004 | 62,3 % | 49,2 % | +0,5 |
| Streitwagenlenkerin | Boudicca | 4 | Gewöhnlich | – | – | – | – | 932 | 46,0 % | 48,6 % | −0,2 |
| Druidin des Hains | Boudicca | 3 | Gewöhnlich | – | – | – | – | 996 | 56,2 % | 46,4 % | −2,3 |
| Aufstand | Boudicca | 3 | Selten | – | – | – | – | 934 | 51,1 % | 51,6 % | +2,8 |
| Eichenkoloss | Boudicca | 6 | Selten | – | – | – | – | 1252 | 52,0 % | 51,1 % | +2,3 |
| Zorn der Königin | Boudicca | 5 | Episch | – | – | – | – | 1074 | 33,0 % | 49,7 % | +0,9 |
| Andraste, Göttin des Sieges | Boudicca | 8 | Legendär | – | – | – | – | 678 | 45,4 % | 53,6 % | +4,8 |
| Tintenlehrling | Nostradamus | 1 | Basis | 2200 | 85,0 % | 53,3 % | +2,5 | 760 | 56,6 % | 55,8 % | +3,9 |
| Dunkle Vorahnung | Nostradamus | 2 | Basis | 2200 | 89,3 % | 53,5 % | +2,8 | 1016 | 61,7 % | 56,2 % | +4,2 |
| Maskierter Seher | Nostradamus | 3 | Basis | 2200 | 84,9 % | 51,7 % | +0,9 | 1008 | 47,5 % | 47,4 % | −4,5 |
| Prophezeiung | Nostradamus | 4 | Basis | 2200 | 63,7 % | 51,7 % | +1,0 | 898 | 18,7 % | 49,7 % | −2,2 |
| Pestdoktor | Nostradamus | 4 | Gewöhnlich | – | – | – | – | 866 | 53,1 % | 60,8 % | +8,9 |
| Schattenpakt | Nostradamus | 2 | Gewöhnlich | – | – | – | – | 956 | 56,5 % | 58,7 % | +6,8 |
| Chronist der Nacht | Nostradamus | 5 | Selten | – | – | – | – | 970 | 53,1 % | 52,7 % | +0,8 |
| Rote Finsternis | Nostradamus | 5 | Selten | – | – | – | – | 998 | 38,5 % | 56,5 % | +4,6 |
| Wächter der Zeiten | Nostradamus | 6 | Episch | – | – | – | – | 1182 | 56,3 % | 53,8 % | +1,9 |
| Caterina de’ Medici | Nostradamus | 5 | Legendär | – | – | – | – | 948 | 48,9 % | 54,8 % | +2,8 |
| Bauernrekrut | Jeanne | 1 | Basis | 2200 | 80,5 % | 50,8 % | +0,0 | 740 | 55,5 % | 58,2 % | +8,1 |
| Bannersegen | Jeanne | 2 | Basis | 2200 | 80,3 % | 51,8 % | +0,9 | 918 | 48,0 % | 51,8 % | +1,6 |
| Wache von Orléans | Jeanne | 3 | Basis | 2200 | 79,0 % | 51,3 % | +0,4 | 1050 | 52,4 % | 51,8 % | +1,6 |
| Die Fahne erheben | Jeanne | 2 | Basis | 2200 | 79,0 % | 49,9 % | −0,9 | 980 | 53,7 % | 60,8 % | +10,6 |
| Lilienritter | Jeanne | 4 | Gewöhnlich | – | – | – | – | 912 | 39,7 % | 46,2 % | −4,0 |
| Heiliger Schutz | Jeanne | 2 | Gewöhnlich | – | – | – | – | 1014 | 44,6 % | 52,7 % | +2,5 |
| Standartenträgerin | Jeanne | 5 | Selten | – | – | – | – | 930 | 48,4 % | 50,0 % | −0,2 |
| Glocken von Reims | Jeanne | 6 | Selten | – | – | – | – | 1096 | 42,0 % | 51,8 % | +1,6 |
| Paladin der Loire | Jeanne | 7 | Episch | – | – | – | – | 994 | 37,8 % | 50,7 % | +0,5 |
| La Hire, der Unbeugsame | Jeanne | 7 | Legendär | – | – | – | – | 1014 | 38,9 % | 51,0 % | +0,8 |
| Fjordspäher | Ragnar | 1 | Basis | 2200 | 78,5 % | 49,3 % | −1,3 | 762 | 53,4 % | 52,9 % | +2,4 |
| Runenblitz | Ragnar | 2 | Basis | 2200 | 82,3 % | 50,2 % | −0,3 | 966 | 57,8 % | 50,4 % | −0,1 |
| Schildmaid | Ragnar | 3 | Basis | 2200 | 81,5 % | 51,2 % | +0,7 | 968 | 53,2 % | 53,8 % | +3,3 |
| Runenschnitzer | Ragnar | 4 | Basis | 2200 | 75,9 % | 52,8 % | +2,2 | 876 | 50,8 % | 50,7 % | +0,2 |
| Donnerschlag | Ragnar | 3 | Gewöhnlich | – | – | – | – | 992 | 55,2 % | 51,7 % | +1,1 |
| Berserker vom Fjord | Ragnar | 4 | Gewöhnlich | – | – | – | – | 868 | 47,1 % | 49,0 % | −1,5 |
| Ahnenbund | Ragnar | 3 | Selten | – | – | – | – | 958 | 47,7 % | 52,7 % | +2,2 |
| Runenhüter | Ragnar | 5 | Selten | – | – | – | – | 958 | 49,2 % | 47,9 % | −2,7 |
| Sturm der Nordsee | Ragnar | 5 | Episch | – | – | – | – | 1016 | 49,6 % | 57,3 % | +6,7 |
| Lagertha, Schildmaid | Ragnar | 7 | Legendär | – | – | – | – | 1032 | 46,3 % | 56,3 % | +5,7 |
| Dojoschüler | Musashi | 1 | Basis | 2200 | 81,4 % | 49,3 % | −0,1 | 718 | 52,8 % | 50,7 % | +0,3 |
| Schneller Schnitt | Musashi | 1 | Basis | 2200 | 83,6 % | 50,4 % | +0,9 | 736 | 50,5 % | 56,3 % | +5,8 |
| Rōnin | Musashi | 3 | Basis | 2200 | 83,0 % | 51,1 % | +1,7 | 1046 | 50,1 % | 52,2 % | +1,8 |
| Konzentration | Musashi | 2 | Basis | 2200 | 73,5 % | 51,8 % | +2,3 | 940 | 42,0 % | 49,2 % | −1,3 |
| Kirschblütenwache | Musashi | 3 | Gewöhnlich | – | – | – | – | 1020 | 52,0 % | 52,6 % | +2,1 |
| Zwei Himmel | Musashi | 3 | Gewöhnlich | – | – | – | – | 1000 | 33,7 % | 47,1 % | −3,4 |
| Duellant | Musashi | 4 | Selten | – | – | – | – | 920 | 38,7 % | 50,3 % | −0,1 |
| Der leere Geist | Musashi | 5 | Selten | – | – | – | – | 1040 | 40,8 % | 54,8 % | +4,4 |
| Meister der fünf Ringe | Musashi | 6 | Episch | – | – | – | – | 1232 | 52,0 % | 49,6 % | −0,8 |
| Sasaki Kojirō, der Rivale | Musashi | 6 | Legendär | – | – | – | – | 1120 | 40,4 % | 52,8 % | +2,3 |
| Dorfwache | neutral | 1 | Basis | 22000 | 81,0 % | 49,1 % | −0,9 | 7426 | 53,1 % | 49,8 % | −0,2 |
| Wandernder Händler | neutral | 2 | Basis | 22000 | 80,3 % | 49,1 % | −0,9 | 9662 | 49,5 % | 49,7 % | −0,2 |
| Steinschleuderer | neutral | 2 | Basis | 22000 | 82,3 % | 49,4 % | −0,6 | 9862 | 52,4 % | 50,1 % | +0,0 |
| Grenzläuferin | neutral | 3 | Basis | 22000 | 83,0 % | 50,6 % | +0,6 | 10134 | 52,5 % | 50,9 % | +0,9 |
| Festungsschild | neutral | 4 | Basis | 22000 | 76,4 % | 50,9 % | +1,0 | 9186 | 44,5 % | 49,4 % | −0,6 |
| Kavallerist | neutral | 4 | Basis | 22000 | 78,3 % | 51,2 % | +1,2 | 9404 | 43,7 % | 50,4 % | +0,4 |
| Feldheilerin | neutral | 3 | Basis | 22000 | 80,9 % | 49,4 % | −0,5 | 10360 | 50,5 % | 48,4 % | −1,6 |
| Archivarin | neutral | 4 | Basis | 22000 | 74,1 % | 52,4 % | +2,4 | 9294 | 42,9 % | 50,2 % | +0,2 |
| Wachhund | neutral | 2 | Basis | 22000 | 80,6 % | 48,5 % | −1,5 | 9708 | 51,1 % | 47,3 % | −2,7 |
| Veteran | neutral | 5 | Basis | 22000 | 79,5 % | 52,5 % | +2,5 | 10032 | 47,6 % | 48,6 % | −1,4 |
| Belagerungsturm | neutral | 6 | Basis | 22000 | 76,7 % | 55,6 % | +5,6 | 12136 | 48,1 % | 49,6 % | −0,5 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 10214 | 47,6 % | 49,3 % | −0,7 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 7524 | 52,8 % | 50,8 % | +0,8 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 9954 | 47,8 % | 53,8 % | +3,8 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 10166 | 49,1 % | 48,6 % | −1,4 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 9878 | 51,4 % | 50,2 % | +0,2 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 9764 | 40,9 % | 48,6 % | −1,4 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 7270 | 48,2 % | 47,0 % | −3,0 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 9644 | 54,6 % | 49,2 % | −0,8 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 10432 | 48,2 % | 53,4 % | +3,4 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 10118 | 52,9 % | 50,1 % | +0,1 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 9302 | 46,2 % | 48,7 % | −1,3 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 9784 | 52,6 % | 52,3 % | +2,2 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 9158 | 46,9 % | 51,0 % | +1,0 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 10330 | 56,2 % | 52,9 % | +3,0 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 9688 | 26,4 % | 44,1 % | −6,0 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 9330 | 44,9 % | 47,2 % | −2,8 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 10120 | 44,3 % | 49,4 % | −0,6 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 9260 | 50,2 % | 53,5 % | +3,6 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 9422 | 43,9 % | 54,2 % | +4,2 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 9888 | 48,8 % | 51,3 % | +1,3 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 10224 | 46,1 % | 49,1 % | −0,9 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 9372 | 38,2 % | 47,9 % | −2,1 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 12242 | 52,4 % | 50,5 % | +0,5 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 10652 | 43,2 % | 50,3 % | +0,3 |
| Vergessene Weisheit | neutral | 4 | Episch | – | – | – | – | 9284 | 20,4 % | 47,0 % | −3,0 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 7286 | 41,5 % | 62,2 % | +12,2 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 10764 | 49,7 % | 52,0 % | +2,0 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 9174 | 40,9 % | 51,2 % | +1,2 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 7014 | 39,8 % | 55,5 % | +5,5 |
| Agent des Zehnerrats | Dandolo | 3 | Gewöhnlich | – | – | – | – | 998 | 58,1 % | 54,6 % | +2,9 |
| Tributeintreiber | Khan | 3 | Gewöhnlich | – | – | – | – | 1036 | 51,5 % | 46,1 % | −4,4 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 918 | 50,4 % | 53,0 % | +5,1 |
| Brand von Londinium | Boudicca | 3 | Selten | – | – | – | – | 1046 | 51,1 % | 53,7 % | +4,9 |
| Bannbulle | Nostradamus | 1 | Selten | – | – | – | – | 728 | 54,0 % | 57,0 % | +5,1 |
| Plünderer von Paris | Ragnar | 4 | Gewöhnlich | – | – | – | – | 850 | 49,1 % | 49,4 % | −1,2 |
| Zorn des Donnergottes | Ragnar | 1 | Gewöhnlich | – | – | – | – | 712 | 58,7 % | 51,7 % | +1,1 |
| Shinobi aus Iga | Musashi | 2 | Gewöhnlich | – | – | – | – | 920 | 52,2 % | 55,1 % | +4,7 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 9824 | 51,6 % | 47,7 % | −2,3 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 7270 | 53,2 % | 52,0 % | +2,0 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 9874 | 55,2 % | 52,1 % | +2,1 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 10178 | 49,2 % | 52,6 % | +2,6 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 10276 | 54,1 % | 50,7 % | +0,7 |
