# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `72d879a70e` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die 21 anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,5.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 50600 | ✗ 20/22 | ✗ 201/231 | ✓ 46,2 % | – | 0 | 23 |
| Zufallsdecks | 50600 | ✗ 21/22 | ✗ 227/231 | ✓ 50,9 % | ✓ 52,8 % (+2,9) | 0 | 20 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Miyamoto Musashi | **53,9 %** | 49,1 % | 57,9 % | Jeanne 41,5 % | Epaminondas 62,5 % | Aggressiv: 49,0 % | ✗ |
| Dschingis Khan | **52,2 %** | 47,1 % | 57,0 % | Masako 39,5 % | Fu Hao 69,0 % | Aggressiv: 45,2 % | ✓ |
| Hypatia | **51,9 %** | 47,0 % | 56,5 % | Anna 43,5 % | Masako 61,5 % | Kombinierend: 45,1 % | ✓ |
| Leonidas I. | **51,6 %** | 51,0 % | 52,0 % | Epaminondas 40,5 % | Fabius 65,5 % | Defensiv: 36,6 % | ✓ |
| Baibars | **51,4 %** | 49,1 % | 53,4 % | Fabius 38,5 % | Ragnar 61,5 % | Aggressiv: 40,4 % | ✓ |
| Nezahualcóyotl | **51,1 %** | 47,4 % | 54,7 % | Baibars 39,0 % | Žižka 65,5 % | Defensiv: 38,8 % | ✓ |
| Nostradamus | **50,7 %** | 49,6 % | 51,7 % | Khan 35,5 % | Fabius 63,0 % | Kombinierend: 41,3 % | ✓ |
| Epaminondas | **50,7 %** | 45,3 % | 56,0 % | Fabius 36,5 % | Imhotep 61,0 % | Aggressiv: 42,7 % | ✓ |
| Hōjō Masako | **50,3 %** | 44,3 % | 56,3 % | Hypatia 38,5 % | Khan 60,5 % | Defensiv: 40,4 % | ✓ |
| Amanirenas | **50,2 %** | 47,3 % | 53,0 % | Leonidas 36,5 % | Baibars 59,0 % | Aggressiv: 44,8 % | ✓ |
| Ragnar Lodbrok | **50,1 %** | 46,4 % | 53,7 % | Baibars 38,5 % | Fu Hao 58,5 % | Aggressiv: 41,5 % | ✓ |
| Anna Komnene | **49,9 %** | 50,5 % | 49,4 % | Nezahualcóyotl 41,5 % | Fabius 64,5 % | Kombinierend: 39,1 % | ✓ |
| Jeanne d’Arc | **49,8 %** | 44,1 % | 55,6 % | Žižka 36,0 % | Fu Hao 60,5 % | Aggressiv: 51,3 % | ✓ |
| Mandukhai Khatun | **49,8 %** | 45,2 % | 54,5 % | Khan 32,0 % | Fabius 62,0 % | Kombinierend: 45,1 % | ✓ |
| Fu Hao | **49,5 %** | 48,2 % | 50,9 % | Khan 31,0 % | Imhotep 66,5 % | Kombinierend: 40,5 % | ✓ |
| Enrico Dandolo | **49,2 %** | 46,5 % | 52,0 % | Musashi 38,0 % | Fabius 55,5 % | Kombinierend: 41,8 % | ✓ |
| Fabius Maximus | **48,9 %** | 45,5 % | 52,4 % | Leonidas 34,5 % | Epaminondas 63,5 % | Defensiv: 40,4 % | ✓ |
| Imhotep | **48,5 %** | 46,3 % | 50,9 % | Fu Hao 33,5 % | Boudicca 60,0 % | Defensiv: 36,3 % | ✓ |
| Perikles | **48,3 %** | 43,5 % | 53,4 % | Hypatia 43,0 % | Agrippa 55,5 % | Defensiv: 39,7 % | ✓ |
| Marcus Agrippa | **48,2 %** | 42,6 % | 54,1 % | Khan 35,5 % | Boudicca 57,5 % | Kombinierend: 44,0 % | ✓ |
| Boudicca | **47,2 %** | 40,6 % | 54,3 % | Fabius 37,0 % | Jeanne 55,0 % | Aggressiv: 42,4 % | ✓ |
| Jan Žižka | **46,6 %** | 40,7 % | 53,1 % | Nezahualcóyotl 34,5 % | Jeanne 64,0 % | Defensiv: 41,1 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. | Epam. | Fabi. | Mand. | Baib. | Žižk. | Fu H. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 51 | 50 | 47 | 47 | 56 | 55 | 51 | 52 | 46 | 50 | 54 | **64** | 51 | 52 | 48 | 41 | **66** | 54 | 44 | **64** | 47 |
| Hypatia | 49 | · | 47 | 50 | 59 | 54 | 51 | 60 | 51 | 45 | 57 | 47 | 54 | 44 | 50 | **62** | 56 | 47 | 49 | 52 | **62** | 51 |
| Imhotep | 50 | 53 | · | 45 | 49 | 60 | 44 | 50 | 48 | 45 | 53 | 44 | 54 | 45 | 51 | 47 | **39** | 53 | 50 | 49 | 60 | **34** |
| Dandolo | 53 | 50 | 55 | · | 43 | 47 | 47 | 47 | 48 | **38** | 55 | 54 | 49 | 50 | 45 | 52 | 46 | 56 | 52 | 50 | 53 | 46 |
| Khan | 53 | 42 | 52 | 57 | · | 47 | **65** | 46 | 55 | 47 | 50 | **65** | 47 | 57 | 50 | **40** | 54 | 44 | **68** | 48 | 45 | **69** |
| Boudicca | 44 | 47 | 40 | 53 | 53 | · | 45 | 55 | 49 | 55 | 46 | 43 | 43 | 50 | 45 | 48 | 47 | **37** | 50 | 45 | 47 | 53 |
| Nostradamus | 45 | 50 | 56 | 53 | **36** | 55 | · | 53 | 47 | 44 | 54 | 53 | 52 | 49 | 55 | 50 | 41 | **63** | 45 | 48 | **63** | 54 |
| Jeanne | 49 | 41 | 51 | 53 | 54 | 45 | 47 | · | 60 | 59 | 56 | 51 | 44 | 53 | 49 | 43 | 54 | 47 | 45 | 53 | **36** | **61** |
| Ragnar | 49 | 50 | 52 | 52 | 45 | 51 | 53 | 40 | · | 43 | 50 | 52 | 49 | 56 | 54 | 51 | 50 | 57 | 48 | **39** | 54 | 59 |
| Musashi | 54 | 55 | 55 | **62** | 53 | 45 | 56 | 42 | 57 | · | 57 | 57 | 45 | 55 | 45 | 51 | **63** | 52 | **62** | 57 | 51 | 56 |
| Perikles | 51 | 43 | 48 | 45 | 50 | 54 | 46 | 44 | 51 | 43 | · | 56 | 51 | 52 | 50 | 46 | 46 | 50 | 44 | 47 | 48 | 52 |
| Agrippa | 46 | 53 | 56 | 46 | **36** | 57 | 48 | 49 | 48 | 43 | 44 | · | 52 | 49 | 46 | 49 | 47 | 51 | **40** | 51 | 55 | 49 |
| Amanirenas | **37** | 46 | 46 | 51 | 53 | 57 | 49 | 56 | 52 | 55 | 49 | 49 | · | 44 | 44 | 50 | 56 | 54 | 46 | 59 | 51 | 53 |
| Anna | 49 | 56 | 55 | 51 | 43 | 50 | 51 | 47 | 44 | 45 | 49 | 51 | 56 | · | 42 | 51 | 50 | **65** | 48 | 47 | 57 | 45 |
| Nezahualcóyotl | 49 | 51 | 49 | 55 | 50 | 55 | 45 | 52 | 47 | 55 | 51 | 54 | 56 | 59 | · | 45 | 47 | 52 | 55 | **39** | **66** | 45 |
| Masako | 53 | **39** | 53 | 48 | **61** | 52 | 51 | 57 | 49 | 49 | 54 | 52 | 51 | 50 | 55 | · | 48 | 41 | 57 | 44 | 44 | 53 |
| Epaminondas | 60 | 44 | **61** | 54 | 46 | 53 | 59 | 47 | 51 | **38** | 54 | 53 | 44 | 50 | 53 | 53 | · | **37** | 56 | **40** | 56 | 59 |
| Fabius | **35** | 53 | 48 | 44 | 56 | **63** | **37** | 53 | 43 | 48 | 50 | 50 | 47 | **36** | 49 | 60 | **64** | · | **38** | **62** | 57 | **37** |
| Mandukhai | 47 | 52 | 50 | 48 | **32** | 51 | 55 | 55 | 52 | **39** | 56 | **61** | 54 | 53 | 45 | 43 | 44 | **62** | · | 46 | 56 | 48 |
| Baibars | 56 | 49 | 52 | 50 | 52 | 55 | 52 | 48 | **62** | 43 | 53 | 50 | 41 | 53 | **61** | 56 | **61** | **39** | 54 | · | 45 | 51 |
| Žižka | **37** | **39** | 40 | 48 | 55 | 53 | **37** | **64** | 46 | 49 | 53 | 45 | 49 | 43 | **35** | 56 | 44 | 43 | 44 | 55 | · | 44 |
| Fu Hao | 53 | 50 | **67** | 54 | **31** | 48 | 46 | **40** | 42 | 44 | 48 | 52 | 47 | 55 | 55 | 47 | 42 | **64** | 52 | 50 | 56 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 44,7 % aufs Gesicht, 1,0 % auf Bauwerke · **Defensiv** (7 Helden) 39,0 % aufs Gesicht, 1,0 % auf Bauwerke · **Kombinierend** (7 Helden) 42,4 % aufs Gesicht, 1,1 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 24,3, Median 23, 10–90 %: 17–33, kürzeste 9, längste 63. Beginner gewinnt 46,2 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Belagerungsturm | neutral | 6 | 55,3 % | +5,3 | 75,6 % |
| Goldener Reiter | Khan | 4 | 56,7 % | +4,7 | 69,6 % |
| Warägergardist | Anna | 3 | 54,2 % | +4,2 | 81,7 % |
| Pilumwerfer | Agrippa | 1 | 52,2 % | +3,9 | 76,5 % |
| Rede auf die Gefallenen | Perikles | 3 | 51,9 % | +3,4 | 79,3 % |
| Handelsgesandter | Dandolo | 4 | 52,7 % | +3,4 | 77,3 % |
| Botin der Stämme | Mandukhai | 1 | 53,1 % | +3,3 | 76,9 % |
| Kopistin der Chronik | Anna | 1 | 53,2 % | +3,2 | 80,9 % |
| Fjordspäher | Ragnar | 1 | 48,4 % | −1,7 | 77,0 % |
| Bibliothekslehrling | Hypatia | 1 | 50,0 % | −1,7 | 83,1 % |
| Hainwächterin | Boudicca | 1 | 45,7 % | −1,7 | 81,5 % |
| Eichenhaut | Boudicca | 2 | 45,5 % | −1,9 | 72,5 % |
| Pfeilschuss | Khan | 2 | 49,9 % | −2,1 | 74,8 % |
| Nonne von Kamakura | Masako | 2 | 48,1 % | −2,2 | 81,2 % |
| Gokenin aus Sagami | Masako | 1 | 48,0 % | −2,3 | 80,5 % |
| Lange Mauern | Perikles | 2 | 44,3 % | −4,2 | 77,8 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Boudicca | **52,8 %** | 53,3 % | 51,7 % | Ragnar 46,5 % | Anna 61,0 % | Aggressiv: 49,4 % | ✓ |
| Mandukhai Khatun | **52,8 %** | 51,6 % | 53,4 % | Khan 46,0 % | Hypatia 58,5 % | Kombinierend: 47,2 % | ✓ |
| Ragnar Lodbrok | **52,5 %** | 53,3 % | 51,2 % | Jeanne 46,0 % | Anna 60,5 % | Aggressiv: 47,7 % | ✓ |
| Epaminondas | **52,3 %** | 51,6 % | 52,6 % | Boudicca 46,5 % | Imhotep 58,5 % | Aggressiv: 47,4 % | ✓ |
| Miyamoto Musashi | **52,1 %** | 51,9 % | 51,9 % | Ragnar 46,0 % | Hypatia 57,0 % | Aggressiv: 53,9 % | ✓ |
| Baibars | **51,4 %** | 52,5 % | 50,0 % | Ragnar 43,0 % | Fabius 60,0 % | Aggressiv: 42,8 % | ✓ |
| Dschingis Khan | **51,1 %** | 49,4 % | 52,5 % | Imhotep 42,0 % | Nostradamus 60,0 % | Aggressiv: 51,0 % | ✓ |
| Jan Žižka | **50,7 %** | 51,3 % | 49,9 % | Fu Hao 43,0 % | Hypatia 60,0 % | Defensiv: 42,7 % | ✓ |
| Nostradamus | **50,6 %** | 51,7 % | 49,4 % | Khan 40,0 % | Jeanne 59,0 % | Kombinierend: 44,7 % | ✓ |
| Enrico Dandolo | **49,9 %** | 51,5 % | 48,3 % | Boudicca 40,0 % | Imhotep 58,5 % | Kombinierend: 44,6 % | ✓ |
| Fu Hao | **49,8 %** | 53,0 % | 46,7 % | Musashi 43,0 % | Anna 58,5 % | Kombinierend: 43,9 % | ✓ |
| Leonidas I. | **49,5 %** | 50,6 % | 48,5 % | Khan 47,0 % | Nostradamus 55,5 % | Defensiv: 38,7 % | ✓ |
| Amanirenas | **49,4 %** | 50,3 % | 48,6 % | Mandukhai 44,0 % | Jeanne 56,0 % | Aggressiv: 48,5 % | ✓ |
| Jeanne d’Arc | **49,4 %** | 51,3 % | 47,6 % | Nostradamus 41,0 % | Hypatia 55,5 % | Aggressiv: 50,1 % | ✓ |
| Marcus Agrippa | **49,4 %** | 49,1 % | 49,7 % | Mandukhai 42,5 % | Jeanne 56,5 % | Kombinierend: 46,4 % | ✓ |
| Nezahualcóyotl | **49,0 %** | 50,3 % | 47,9 % | Imhotep 39,0 % | Amanirenas 53,5 % | Defensiv: 39,6 % | ✓ |
| Fabius Maximus | **48,9 %** | 50,9 % | 47,0 % | Baibars 40,0 % | Perikles 65,0 % | Defensiv: 41,5 % | ✓ |
| Hōjō Masako | **48,7 %** | 49,1 % | 48,5 % | Žižka 42,5 % | Perikles 55,5 % | Defensiv: 39,3 % | ✓ |
| Perikles | **48,1 %** | 49,8 % | 46,7 % | Fabius 35,0 % | Imhotep 55,5 % | Defensiv: 41,3 % | ✓ |
| Imhotep | **47,7 %** | 48,2 % | 47,7 % | Ragnar 40,0 % | Nezahualcóyotl 61,0 % | Defensiv: 38,1 % | ✓ |
| Anna Komnene | **47,5 %** | 49,8 % | 45,7 % | Boudicca 39,0 % | Fabius 58,5 % | Kombinierend: 41,9 % | ✓ |
| Hypatia | **46,5 %** | 48,7 % | 44,9 % | Žižka 40,0 % | Fabius 54,5 % | Kombinierend: 43,6 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. | Epam. | Fabi. | Mand. | Baib. | Žižk. | Fu H. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 49 | 55 | 51 | 47 | 51 | 56 | 48 | 48 | 48 | 48 | 55 | 49 | 49 | 49 | 49 | 47 | 49 | 48 | 52 | 48 | 50 |
| Hypatia | 51 | · | 51 | 52 | 41 | 45 | 43 | 45 | 48 | 43 | 45 | 50 | 48 | 47 | 49 | 47 | 45 | 55 | 42 | 44 | 40 | 50 |
| Imhotep | 45 | 49 | · | 42 | 58 | 47 | 45 | 46 | 40 | 46 | 45 | 47 | 49 | 49 | **61** | 52 | 42 | 47 | 47 | 44 | 49 | 56 |
| Dandolo | 50 | 49 | 59 | · | 47 | 40 | 56 | 51 | 48 | 45 | 54 | 55 | 53 | 51 | 52 | 52 | 44 | 55 | 49 | 49 | 49 | 45 |
| Khan | 53 | 60 | 42 | 53 | · | 44 | 60 | 48 | 45 | 51 | 53 | 50 | 52 | 60 | 50 | 49 | 50 | 53 | 54 | 45 | 50 | 54 |
| Boudicca | 50 | 55 | 53 | 60 | 56 | · | 50 | 51 | 47 | 50 | 56 | 56 | 55 | **61** | 52 | 50 | 54 | 51 | 53 | 49 | 49 | 53 |
| Nostradamus | 44 | 57 | 55 | 44 | 40 | 51 | · | 59 | 49 | 47 | 51 | 55 | 51 | 52 | 49 | 50 | 52 | 56 | 52 | 45 | 55 | 53 |
| Jeanne | 53 | 55 | 54 | 49 | 52 | 49 | 41 | · | 54 | 44 | 49 | 44 | 44 | 55 | 52 | 54 | 47 | 49 | 49 | 49 | 47 | 51 |
| Ragnar | 53 | 52 | 60 | 53 | 55 | 53 | 51 | 46 | · | 54 | 54 | 50 | 48 | **61** | 51 | 55 | 47 | 55 | 49 | 57 | 49 | 53 |
| Musashi | 53 | 57 | 54 | 55 | 50 | 50 | 53 | 56 | 46 | · | 51 | 49 | 51 | 56 | 48 | 51 | 54 | 53 | 54 | 50 | 49 | 57 |
| Perikles | 53 | 55 | 55 | 46 | 48 | 44 | 49 | 52 | 47 | 50 | · | 48 | 50 | 49 | 51 | 45 | 49 | **35** | 44 | 48 | 51 | 47 |
| Agrippa | 45 | 50 | 53 | 45 | 51 | 44 | 45 | 56 | 51 | 52 | 52 | · | 50 | 50 | 48 | 56 | 46 | 53 | 43 | 44 | 53 | 53 |
| Amanirenas | 51 | 52 | 51 | 48 | 49 | 45 | 49 | 56 | 52 | 49 | 51 | 51 | · | 54 | 47 | 46 | 47 | 49 | 44 | 53 | 52 | 46 |
| Anna | 51 | 53 | 51 | 50 | 40 | **39** | 49 | 45 | **40** | 44 | 52 | 50 | 47 | · | 52 | 52 | 42 | 59 | 48 | 44 | 51 | 42 |
| Nezahualcóyotl | 51 | 52 | **39** | 48 | 51 | 49 | 52 | 49 | 50 | 52 | 50 | 52 | 53 | 48 | · | 46 | 51 | 47 | 44 | 51 | 53 | 48 |
| Masako | 52 | 53 | 48 | 48 | 51 | 50 | 50 | 46 | 45 | 50 | 55 | 44 | 54 | 48 | 54 | · | 46 | 45 | 45 | 43 | 43 | 55 |
| Epaminondas | 53 | 55 | 59 | 56 | 51 | 47 | 49 | 53 | 53 | 47 | 51 | 54 | 53 | 59 | 49 | 54 | · | 51 | 49 | 56 | 49 | 52 |
| Fabius | 52 | 45 | 53 | 45 | 47 | 50 | 44 | 51 | 45 | 48 | **65** | 48 | 52 | 42 | 53 | 55 | 49 | · | 45 | 40 | 53 | 46 |
| Mandukhai | 52 | 59 | 53 | 52 | 46 | 48 | 49 | 52 | 52 | 46 | 56 | 57 | 56 | 52 | 56 | 55 | 52 | 55 | · | 56 | 48 | 57 |
| Baibars | 48 | 56 | 56 | 51 | 55 | 52 | 55 | 52 | 43 | 50 | 53 | 56 | 47 | 56 | 50 | 57 | 44 | 60 | 44 | · | 46 | 49 |
| Žižka | 53 | 60 | 51 | 52 | 50 | 52 | 45 | 53 | 51 | 51 | 49 | 48 | 49 | 49 | 48 | 57 | 52 | 47 | 52 | 54 | · | 43 |
| Fu Hao | 51 | 50 | 44 | 55 | 46 | 47 | 48 | 50 | 48 | 43 | 53 | 48 | 54 | 59 | 53 | 45 | 48 | 54 | 43 | 52 | 57 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 48,8 % aufs Gesicht, 7,6 % auf Bauwerke · **Defensiv** (7 Helden) 40,2 % aufs Gesicht, 9,7 % auf Bauwerke · **Kombinierend** (7 Helden) 44,6 % aufs Gesicht, 8,9 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 21,7, Median 20, 10–90 %: 15–30, kürzeste 8, längste 68. Beginner gewinnt 50,9 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Griechisches Feuer | Anna | 4 | 58,3 % | +10,6 | 46,0 % |
| Phalanxveteran | Leonidas | 5 | 59,9 % | +10,3 | 57,8 % |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 59,4 % | +10,3 | 57,3 % |
| Pilgerin aus Domrémy | Jeanne | 1 | 59,4 % | +10,0 | 53,3 % |
| Goldener Reiter | Khan | 4 | 60,9 % | +9,9 | 46,9 % |
| Astrolabienwächter | Hypatia | 3 | 56,4 % | +9,6 | 56,8 % |
| Warägergardist | Anna | 3 | 57,3 % | +9,6 | 53,7 % |
| Wächter des Weltenbaums | neutral | 8 | 59,0 % | +9,0 | 44,4 % |
| Große Mauer | China, Korea, Japan | 2 | 44,1 % | −6,0 | 59,9 % |
| Megalopolis | Epaminondas | 3 | 46,0 % | −6,1 | 43,8 % |
| Pyramiden von Gizeh | neutral | 4 | 43,4 % | −6,5 | 26,9 % |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | 42,4 % | −6,7 | 54,3 % |
| Burgfried | Europäisches Mittelalter | 2 | 44,0 % | −6,9 | 57,2 % |
| Leuchtturm von Pharos | Griechische Antike | 3 | 42,1 % | −7,0 | 52,9 % |
| Vorgetäuschte Flucht | Baibars | 1 | 41,4 % | −9,9 | 17,3 % |
| Wagenburg am Vítkov | Žižka | 4 | 38,3 % | −12,3 | 57,8 % |

**Legendäre** (AP 5.3) – als Gruppe 52,8 % „gewinnt, wenn gezogen“ (+2,9 gegenüber ihrem Helden, 61766 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Lagertha, Schildmaid | Ragnar | 7 | 57,7 % | +5,4 | 45,1 % |
| Qalawun, Emir der Bahriya | Baibars | 6 | 56,4 % | +5,1 | 45,6 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 56,3 % | +6,7 | 49,5 % |
| Subutai, der Stratege | Khan | 6 | 56,3 % | +5,3 | 43,9 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 55,4 % | +5,5 | 43,4 % |
| Wu Ding, König der Shang | Fu Hao | 6 | 54,6 % | +4,8 | 49,1 % |
| Wiedervereinigung der Mongolen | Mandukhai | 8 | 54,1 % | +1,6 | 41,4 % |
| Djoser, der Erbauer | Imhotep | 6 | 54,1 % | +6,1 | 50,2 % |
| Jan Hus, Prediger von Bethlehem | Žižka | 5 | 53,9 % | +3,3 | 42,7 % |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | 53,0 % | +0,9 | 42,6 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 52,9 % | +3,0 | 44,5 % |
| Sasaki Kojirō, der Rivale | Musashi | 6 | 52,3 % | +0,4 | 45,0 % |
| Andraste, Göttin des Sieges | Boudicca | 8 | 52,1 % | −0,4 | 45,9 % |
| Herodot, Vater der Geschichte | neutral | 4 | 51,7 % | +1,7 | 42,7 % |
| Caterina de’ Medici | Nostradamus | 5 | 51,5 % | +0,9 | 53,5 % |
| Theon von Alexandria | Hypatia | 5 | 50,5 % | +3,7 | 49,5 % |
| Minamoto no Yoritomo | Masako | 6 | 50,4 % | +1,6 | 51,7 % |
| La Hire, der Unbeugsame | Jeanne | 7 | 50,2 % | +0,8 | 42,1 % |
| Bronzekopf des Augustus | Amanirenas | 6 | 50,1 % | +0,6 | 45,2 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 49,8 % | +1,5 | 51,9 % |
| Alexios I. Komnenos | Anna | 6 | 48,8 % | +1,0 | 48,4 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 47,2 % | −2,2 | 39,4 % |
| Marcellus, Schwert Roms | Fabius | 6 | 46,5 % | −2,5 | 47,0 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 43,4 % | −5,8 | 46,8 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 4600 | 80,5 % | 52,3 % | +0,8 | 1220 | 53,4 % | 51,0 % | +1,4 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 4600 | 81,5 % | 51,9 % | +0,4 | 1676 | 58,5 % | 53,1 % | +3,6 |
| Bronzener Wall | Leonidas | 2 | Basis | 4600 | 81,3 % | 53,0 % | +1,5 | 1624 | 52,3 % | 47,9 % | −1,7 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 4600 | 76,4 % | 53,2 % | +1,8 | 1640 | 48,9 % | 47,8 % | −1,8 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1728 | 56,8 % | 52,9 % | +3,3 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1746 | 54,9 % | 49,6 % | +0,0 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1922 | 57,8 % | 59,9 % | +10,3 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1582 | 46,0 % | 51,5 % | +2,0 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 2450 | 53,3 % | 44,9 % | −4,7 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 2056 | 49,5 % | 56,3 % | +6,7 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 4600 | 83,1 % | 50,0 % | −1,7 | 1148 | 55,6 % | 46,9 % | +0,0 |
| Himmelsstrahl | Hypatia | 2 | Basis | 4600 | 86,0 % | 51,5 % | −0,2 | 1658 | 57,2 % | 49,9 % | +3,1 |
| Sternenkundiger | Hypatia | 3 | Basis | 4600 | 81,2 % | 53,1 % | +1,4 | 1938 | 48,9 % | 49,4 % | +2,6 |
| Sternenregen | Hypatia | 4 | Basis | 4600 | 78,2 % | 54,7 % | +3,0 | 1552 | 45,4 % | 51,4 % | +4,6 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1766 | 56,8 % | 56,4 % | +9,6 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1654 | 41,4 % | 46,8 % | −0,1 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1862 | 47,5 % | 51,6 % | +4,8 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 2534 | 55,8 % | 47,7 % | +0,9 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 1900 | 53,6 % | 44,7 % | −2,1 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1982 | 49,5 % | 50,5 % | +3,7 |
| Nilschülerin | Imhotep | 1 | Basis | 4600 | 82,6 % | 48,0 % | −0,6 | 1348 | 57,1 % | 48,5 % | +0,6 |
| Heilender Balsam | Imhotep | 1 | Basis | 4600 | 82,7 % | 50,3 % | +1,7 | 1314 | 58,1 % | 53,3 % | +5,3 |
| Pyramidenwächter | Imhotep | 3 | Basis | 4600 | 84,4 % | 49,8 % | +1,2 | 1928 | 58,9 % | 50,4 % | +2,4 |
| Tempelärztin | Imhotep | 4 | Basis | 4600 | 80,4 % | 49,2 % | +0,6 | 1820 | 52,6 % | 46,7 % | −1,2 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1842 | 53,4 % | 51,0 % | +3,0 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1894 | 59,9 % | 52,1 % | +4,2 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1882 | 48,9 % | 47,8 % | −0,1 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 2054 | 55,1 % | 54,4 % | +6,5 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 2052 | 55,6 % | 46,9 % | −1,0 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 2532 | 50,2 % | 54,1 % | +6,1 |
| Lagunenbote | Dandolo | 1 | Basis | 4600 | 78,8 % | 51,7 % | +2,4 | 1184 | 50,5 % | 53,6 % | +3,7 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 4600 | 79,8 % | 48,6 % | −0,7 | 1652 | 47,8 % | 46,4 % | −3,6 |
| Präziser Stich | Dandolo | 2 | Basis | 4600 | 83,8 % | 50,8 % | +1,5 | 1658 | 53,9 % | 50,0 % | +0,0 |
| Handelsgesandter | Dandolo | 4 | Basis | 4600 | 77,3 % | 52,7 % | +3,4 | 1542 | 51,2 % | 51,9 % | +1,9 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1684 | 38,4 % | 49,8 % | −0,1 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1718 | 54,7 % | 50,9 % | +1,0 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1698 | 43,2 % | 49,6 % | −0,3 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1800 | 50,6 % | 49,6 % | −0,3 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1820 | 32,8 % | 52,2 % | +2,3 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 2380 | 44,5 % | 52,9 % | +3,0 |
| Steppenspäher | Khan | 1 | Basis | 4600 | 74,8 % | 51,4 % | −0,7 | 1190 | 44,9 % | 50,7 % | −0,3 |
| Reiterbogenschütze | Khan | 2 | Basis | 4600 | 75,5 % | 50,5 % | −1,5 | 1722 | 50,9 % | 53,2 % | +2,2 |
| Pfeilschuss | Khan | 2 | Basis | 4600 | 74,8 % | 49,9 % | −2,1 | 1712 | 53,4 % | 52,4 % | +1,5 |
| Goldener Reiter | Khan | 4 | Basis | 4600 | 69,6 % | 56,7 % | +4,7 | 1586 | 46,9 % | 60,9 % | +9,9 |
| Adlerjägerin | Khan | 3 | Gewöhnlich | – | – | – | – | 1726 | 41,7 % | 49,5 % | −1,4 |
| Steppensturm | Khan | 3 | Gewöhnlich | – | – | – | – | 1696 | 47,9 % | 49,1 % | −1,9 |
| Tumenwächter | Khan | 5 | Selten | – | – | – | – | 1858 | 46,2 % | 53,8 % | +2,8 |
| Belagerungsfeuer | Khan | 6 | Selten | – | – | – | – | 2326 | 47,6 % | 54,4 % | +3,4 |
| Keshig-Elite | Khan | 6 | Episch | – | – | – | – | 2370 | 44,4 % | 49,3 % | −1,7 |
| Subutai, der Stratege | Khan | 6 | Legendär | – | – | – | – | 2284 | 43,9 % | 56,3 % | +5,3 |
| Hainwächterin | Boudicca | 1 | Basis | 4600 | 81,5 % | 45,7 % | −1,7 | 1296 | 51,4 % | 52,9 % | +0,3 |
| Eichenhaut | Boudicca | 2 | Basis | 4600 | 72,5 % | 45,5 % | −1,9 | 1710 | 40,3 % | 49,3 % | −3,3 |
| Icenerkrieger | Boudicca | 3 | Basis | 4600 | 84,3 % | 48,3 % | +0,9 | 1718 | 55,8 % | 56,2 % | +3,7 |
| Wilder Hieb | Boudicca | 3 | Basis | 4600 | 83,7 % | 46,4 % | −1,0 | 1718 | 58,6 % | 49,9 % | −2,6 |
| Streitwagenlenkerin | Boudicca | 4 | Gewöhnlich | – | – | – | – | 1550 | 46,9 % | 51,8 % | −0,7 |
| Druidin des Hains | Boudicca | 3 | Gewöhnlich | – | – | – | – | 1760 | 53,5 % | 50,5 % | −2,0 |
| Aufstand | Boudicca | 3 | Selten | – | – | – | – | 1724 | 54,8 % | 56,3 % | +3,8 |
| Eichenkoloss | Boudicca | 6 | Selten | – | – | – | – | 2492 | 52,3 % | 54,4 % | +1,9 |
| Zorn der Königin | Boudicca | 5 | Episch | – | – | – | – | 1838 | 33,5 % | 49,0 % | −3,5 |
| Andraste, Göttin des Sieges | Boudicca | 8 | Legendär | – | – | – | – | 1402 | 45,9 % | 52,1 % | −0,4 |
| Tintenlehrling | Nostradamus | 1 | Basis | 4600 | 84,6 % | 53,3 % | +2,6 | 1366 | 58,2 % | 56,0 % | +5,5 |
| Dunkle Vorahnung | Nostradamus | 2 | Basis | 4600 | 88,3 % | 53,5 % | +2,8 | 1894 | 64,9 % | 54,8 % | +4,2 |
| Maskierter Seher | Nostradamus | 3 | Basis | 4600 | 84,4 % | 51,3 % | +0,6 | 1944 | 47,7 % | 50,4 % | −0,2 |
| Prophezeiung | Nostradamus | 4 | Basis | 4600 | 63,8 % | 51,2 % | +0,5 | 1726 | 22,6 % | 49,0 % | −1,6 |
| Pestdoktor | Nostradamus | 4 | Gewöhnlich | – | – | – | – | 1836 | 56,5 % | 58,7 % | +8,1 |
| Schattenpakt | Nostradamus | 2 | Gewöhnlich | – | – | – | – | 1874 | 59,9 % | 56,0 % | +5,4 |
| Chronist der Nacht | Nostradamus | 5 | Selten | – | – | – | – | 1914 | 51,4 % | 51,6 % | +1,0 |
| Rote Finsternis | Nostradamus | 5 | Selten | – | – | – | – | 2008 | 41,9 % | 53,8 % | +3,2 |
| Wächter der Zeiten | Nostradamus | 6 | Episch | – | – | – | – | 2542 | 59,3 % | 53,4 % | +2,8 |
| Caterina de’ Medici | Nostradamus | 5 | Legendär | – | – | – | – | 1960 | 53,5 % | 51,5 % | +0,9 |
| Bauernrekrut | Jeanne | 1 | Basis | 4600 | 78,5 % | 49,6 % | −0,2 | 1312 | 55,3 % | 54,8 % | +5,3 |
| Bannersegen | Jeanne | 2 | Basis | 4600 | 78,8 % | 50,5 % | +0,6 | 1652 | 49,9 % | 50,7 % | +1,2 |
| Wache von Orléans | Jeanne | 3 | Basis | 4600 | 77,9 % | 49,8 % | −0,1 | 1792 | 56,0 % | 53,2 % | +3,8 |
| Die Fahne erheben | Jeanne | 2 | Basis | 4600 | 76,4 % | 49,0 % | −0,8 | 1664 | 54,1 % | 56,0 % | +6,6 |
| Lilienritter | Jeanne | 4 | Gewöhnlich | – | – | – | – | 1568 | 41,1 % | 51,4 % | +1,9 |
| Heiliger Schutz | Jeanne | 2 | Gewöhnlich | – | – | – | – | 1670 | 46,4 % | 51,5 % | +2,1 |
| Standartenträgerin | Jeanne | 5 | Selten | – | – | – | – | 1840 | 48,8 % | 49,7 % | +0,3 |
| Glocken von Reims | Jeanne | 6 | Selten | – | – | – | – | 2266 | 42,4 % | 50,9 % | +1,5 |
| Paladin der Loire | Jeanne | 7 | Episch | – | – | – | – | 2098 | 41,1 % | 50,0 % | +0,6 |
| La Hire, der Unbeugsame | Jeanne | 7 | Legendär | – | – | – | – | 2016 | 42,1 % | 50,2 % | +0,8 |
| Fjordspäher | Ragnar | 1 | Basis | 4600 | 77,0 % | 48,4 % | −1,7 | 1256 | 50,8 % | 54,5 % | +2,3 |
| Runenblitz | Ragnar | 2 | Basis | 4600 | 80,7 % | 50,0 % | −0,1 | 1648 | 60,1 % | 53,5 % | +1,3 |
| Schildmaid | Ragnar | 3 | Basis | 4600 | 80,8 % | 50,8 % | +0,7 | 1706 | 53,8 % | 55,1 % | +2,9 |
| Runenschnitzer | Ragnar | 4 | Basis | 4600 | 75,5 % | 52,0 % | +1,9 | 1598 | 50,6 % | 53,2 % | +1,0 |
| Donnerschlag | Ragnar | 3 | Gewöhnlich | – | – | – | – | 1758 | 55,7 % | 52,5 % | +0,3 |
| Berserker vom Fjord | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1556 | 47,6 % | 52,5 % | +0,2 |
| Ahnenbund | Ragnar | 3 | Selten | – | – | – | – | 1664 | 51,8 % | 58,1 % | +5,9 |
| Runenhüter | Ragnar | 5 | Selten | – | – | – | – | 1900 | 47,5 % | 50,3 % | −1,9 |
| Sturm der Nordsee | Ragnar | 5 | Episch | – | – | – | – | 1906 | 52,2 % | 54,0 % | +1,7 |
| Lagertha, Schildmaid | Ragnar | 7 | Legendär | – | – | – | – | 2238 | 45,1 % | 57,7 % | +5,4 |
| Dojoschüler | Musashi | 1 | Basis | 4600 | 78,6 % | 52,6 % | −0,9 | 1182 | 52,0 % | 52,4 % | +0,5 |
| Schneller Schnitt | Musashi | 1 | Basis | 4600 | 83,1 % | 53,9 % | +0,4 | 1160 | 50,5 % | 54,7 % | +2,8 |
| Rōnin | Musashi | 3 | Basis | 4600 | 83,2 % | 55,3 % | +1,8 | 1784 | 53,4 % | 58,0 % | +6,1 |
| Konzentration | Musashi | 2 | Basis | 4600 | 71,7 % | 55,2 % | +1,6 | 1698 | 41,9 % | 50,6 % | −1,3 |
| Kirschblütenwache | Musashi | 3 | Gewöhnlich | – | – | – | – | 1764 | 51,9 % | 53,5 % | +1,6 |
| Zwei Himmel | Musashi | 3 | Gewöhnlich | – | – | – | – | 1776 | 35,9 % | 50,8 % | −1,1 |
| Duellant | Musashi | 4 | Selten | – | – | – | – | 1546 | 39,7 % | 50,6 % | −1,3 |
| Der leere Geist | Musashi | 5 | Selten | – | – | – | – | 1826 | 40,1 % | 54,7 % | +2,8 |
| Meister der fünf Ringe | Musashi | 6 | Episch | – | – | – | – | 2388 | 49,8 % | 50,3 % | −1,6 |
| Sasaki Kojirō, der Rivale | Musashi | 6 | Legendär | – | – | – | – | 2234 | 45,0 % | 52,3 % | +0,4 |
| Dorfwache | neutral | 1 | Basis | 101200 | 79,4 % | 49,3 % | −0,7 | 27672 | 53,5 % | 50,2 % | +0,2 |
| Wandernder Händler | neutral | 2 | Basis | 101200 | 77,0 % | 49,3 % | −0,7 | 37554 | 48,3 % | 50,0 % | +0,0 |
| Steinschleuderer | neutral | 2 | Basis | 101200 | 80,5 % | 49,4 % | −0,6 | 37378 | 52,8 % | 50,4 % | +0,4 |
| Grenzläuferin | neutral | 3 | Basis | 101200 | 81,5 % | 50,9 % | +0,9 | 38958 | 52,0 % | 52,5 % | +2,5 |
| Festungsschild | neutral | 4 | Basis | 101200 | 75,4 % | 50,9 % | +0,9 | 36696 | 46,7 % | 50,3 % | +0,4 |
| Kavallerist | neutral | 4 | Basis | 101200 | 77,0 % | 51,3 % | +1,3 | 36200 | 46,4 % | 50,9 % | +1,0 |
| Feldheilerin | neutral | 3 | Basis | 101200 | 79,6 % | 49,4 % | −0,6 | 39638 | 51,0 % | 49,1 % | −0,8 |
| Archivarin | neutral | 4 | Basis | 101200 | 73,2 % | 52,2 % | +2,2 | 36984 | 44,9 % | 50,3 % | +0,3 |
| Wachhund | neutral | 2 | Basis | 101200 | 78,5 % | 48,7 % | −1,3 | 37276 | 50,2 % | 48,2 % | −1,8 |
| Veteran | neutral | 5 | Basis | 101200 | 78,1 % | 52,4 % | +2,4 | 43444 | 49,7 % | 48,7 % | −1,2 |
| Belagerungsturm | neutral | 6 | Basis | 101200 | 75,6 % | 55,3 % | +5,3 | 55452 | 51,0 % | 50,4 % | +0,4 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 39648 | 49,7 % | 50,5 % | +0,5 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 27860 | 52,7 % | 51,7 % | +1,7 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 43460 | 50,9 % | 53,5 % | +3,5 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 39750 | 49,8 % | 50,1 % | +0,2 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 37346 | 49,6 % | 50,0 % | −0,0 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 37568 | 40,4 % | 49,4 % | −0,5 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 27688 | 49,5 % | 47,6 % | −2,4 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 37250 | 56,4 % | 49,8 % | −0,2 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 49376 | 52,0 % | 53,7 % | +3,7 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 39132 | 54,0 % | 50,5 % | +0,5 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 36712 | 47,2 % | 49,1 % | −0,8 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 37690 | 52,8 % | 52,6 % | +2,6 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 36652 | 48,0 % | 52,3 % | +2,3 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 39254 | 56,3 % | 52,8 % | +2,8 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 37186 | 28,4 % | 45,1 % | −4,9 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 36720 | 47,7 % | 47,3 % | −2,7 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 43470 | 47,0 % | 51,0 % | +1,1 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 36572 | 52,3 % | 54,1 % | +4,1 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 36630 | 46,6 % | 54,4 % | +4,5 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 43582 | 51,8 % | 51,4 % | +1,5 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 43548 | 49,1 % | 50,2 % | +0,2 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 37194 | 41,7 % | 49,4 % | −0,5 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 55618 | 54,3 % | 50,8 % | +0,8 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 49492 | 46,2 % | 52,2 % | +2,2 |
| Vergessene Weisheit | neutral | 4 | Episch | – | – | – | – | 36680 | 23,9 % | 48,9 % | −1,0 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 34340 | 44,4 % | 59,0 % | +9,0 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 49340 | 54,3 % | 52,5 % | +2,5 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 36234 | 42,7 % | 51,7 % | +1,7 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 34088 | 43,4 % | 55,4 % | +5,5 |
| Agent des Zehnerrats | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1704 | 59,4 % | 50,6 % | +0,7 |
| Tributeintreiber | Khan | 3 | Gewöhnlich | – | – | – | – | 1746 | 50,3 % | 50,3 % | −0,7 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1858 | 54,5 % | 51,6 % | +3,7 |
| Brand von Londinium | Boudicca | 3 | Selten | – | – | – | – | 1728 | 50,1 % | 53,0 % | +0,5 |
| Bannbulle | Nostradamus | 1 | Selten | – | – | – | – | 1458 | 58,8 % | 52,0 % | +1,4 |
| Plünderer von Paris | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1672 | 46,0 % | 51,5 % | −0,7 |
| Zorn des Donnergottes | Ragnar | 1 | Gewöhnlich | – | – | – | – | 1278 | 60,4 % | 51,8 % | −0,5 |
| Shinobi aus Iga | Musashi | 2 | Gewöhnlich | – | – | – | – | 1720 | 51,0 % | 55,2 % | +3,3 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 37052 | 51,8 % | 48,0 % | −2,0 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 27842 | 54,4 % | 52,3 % | +2,3 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 37616 | 56,5 % | 52,8 % | +2,8 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 38978 | 50,6 % | 52,2 % | +2,2 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 39306 | 55,4 % | 50,2 % | +0,3 |
| Ruderer der Triere | Perikles | 1 | Basis | 4600 | 78,6 % | 50,5 % | +2,1 | 1184 | 55,9 % | 55,5 % | +7,3 |
| Lange Mauern | Perikles | 2 | Basis | 4600 | 77,8 % | 44,3 % | −4,2 | 1594 | 55,9 % | 43,5 % | −4,8 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 4600 | 79,3 % | 51,9 % | +3,4 | 1696 | 55,1 % | 52,9 % | +4,6 |
| Strategos | Perikles | 3 | Basis | 4600 | 77,8 % | 51,0 % | +2,5 | 1678 | 57,0 % | 53,6 % | +5,3 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1694 | 46,6 % | 44,0 % | −4,3 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1674 | 59,6 % | 54,3 % | +6,0 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1498 | 52,2 % | 54,1 % | +5,8 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1636 | 38,7 % | 50,3 % | +2,0 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1582 | 35,7 % | 42,4 % | −5,9 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 2416 | 51,9 % | 49,8 % | +1,5 |
| Pilumwerfer | Agrippa | 1 | Basis | 4600 | 76,5 % | 52,2 % | +3,9 | 1236 | 56,0 % | 54,4 % | +4,9 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 4600 | 73,1 % | 50,2 % | +1,8 | 1684 | 46,4 % | 51,3 % | +1,9 |
| Castra | Agrippa | 3 | Basis | 4600 | 81,9 % | 49,3 % | +0,9 | 1736 | 57,2 % | 48,4 % | −1,0 |
| Testudo | Agrippa | 2 | Basis | 4600 | 73,5 % | 50,8 % | +2,4 | 1718 | 49,1 % | 52,5 % | +3,1 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1726 | 52,3 % | 50,6 % | +1,2 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1692 | 49,8 % | 51,8 % | +2,4 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1982 | 53,0 % | 51,7 % | +2,3 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1632 | 54,0 % | 44,1 % | −5,3 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1618 | 40,7 % | 48,5 % | −0,9 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1918 | 39,4 % | 47,2 % | −2,2 |
| Bogenschütze von Ta-Seti | Amanirenas | 1 | Basis | 4600 | 82,0 % | 50,5 % | +0,3 | 1398 | 57,0 % | 49,7 % | +0,3 |
| Wüstenreiter | Amanirenas | 2 | Basis | 4600 | 80,5 % | 49,3 % | −0,9 | 1834 | 56,5 % | 45,8 % | −3,6 |
| Pfeilregen von Kusch | Amanirenas | 2 | Basis | 4600 | 77,6 % | 51,2 % | +1,0 | 1874 | 43,6 % | 50,6 % | +1,2 |
| Speerträger von Napata | Amanirenas | 3 | Basis | 4600 | 83,1 % | 51,0 % | +0,9 | 1932 | 54,8 % | 50,5 % | +1,1 |
| Wächter des Löwentempels | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1858 | 54,2 % | 51,7 % | +2,2 |
| Kundschafter aus Meroë | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1918 | 56,2 % | 50,2 % | +0,7 |
| Kriegselefant von Kusch | Amanirenas | 6 | Selten | – | – | – | – | 2552 | 53,9 % | 51,5 % | +2,0 |
| Überfall auf Syene | Amanirenas | 3 | Selten | – | – | – | – | 2022 | 55,9 % | 47,1 % | −2,4 |
| Akinidad, Prinz von Kusch | Amanirenas | 5 | Episch | – | – | – | – | 2038 | 55,2 % | 45,6 % | −3,8 |
| Bronzekopf des Augustus | Amanirenas | 6 | Legendär | – | – | – | – | 2434 | 45,2 % | 50,1 % | +0,6 |
| Kopistin der Chronik | Anna | 1 | Basis | 4600 | 80,9 % | 53,2 % | +3,2 | 1326 | 53,1 % | 52,0 % | +4,3 |
| Pantokrator-Spital | Anna | 3 | Basis | 4600 | 71,4 % | 50,8 % | +0,9 | 1684 | 30,4 % | 49,4 % | +1,6 |
| Warägergardist | Anna | 3 | Basis | 4600 | 81,7 % | 54,2 % | +4,2 | 1770 | 53,7 % | 57,3 % | +9,6 |
| Hofärztin | Anna | 3 | Basis | 4600 | 79,9 % | 49,6 % | −0,3 | 1758 | 41,9 % | 44,7 % | −3,0 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1644 | 46,0 % | 58,3 % | +10,6 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1586 | 47,7 % | 56,2 % | +8,4 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1872 | 48,7 % | 56,6 % | +8,9 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1782 | 37,1 % | 47,0 % | −0,7 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1830 | 47,9 % | 49,2 % | +1,5 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 2378 | 48,4 % | 48,8 % | +1,0 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 4600 | 82,2 % | 51,2 % | +0,2 | 1298 | 54,9 % | 53,9 % | +4,7 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 4600 | 80,1 % | 51,5 % | +0,5 | 1728 | 54,8 % | 49,4 % | +0,2 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 4600 | 82,4 % | 51,2 % | +0,2 | 1768 | 57,2 % | 50,2 % | +1,1 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 4600 | 81,8 % | 49,9 % | −1,2 | 1980 | 59,2 % | 48,7 % | −0,4 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1814 | 55,2 % | 45,7 % | −3,4 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1748 | 54,1 % | 50,8 % | +1,7 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1758 | 54,8 % | 50,8 % | +1,6 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1818 | 54,3 % | 42,4 % | −6,7 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 2686 | 57,3 % | 59,4 % | +10,3 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 2116 | 46,8 % | 43,4 % | −5,8 |
| Gokenin aus Sagami | Masako | 1 | Basis | 4600 | 80,5 % | 48,0 % | −2,3 | 1114 | 57,8 % | 49,3 % | +0,5 |
| Bogenreiter aus Kamakura | Masako | 2 | Basis | 4600 | 81,8 % | 49,2 % | −1,2 | 1548 | 57,8 % | 50,7 % | +1,9 |
| Treueschwur | Masako | 1 | Basis | 4600 | 80,5 % | 52,0 % | +1,7 | 1158 | 53,1 % | 54,0 % | +5,2 |
| Nonne von Kamakura | Masako | 2 | Basis | 4600 | 81,2 % | 48,1 % | −2,2 | 1628 | 58,2 % | 50,8 % | +2,0 |
| Rokuhara-Späher | Masako | 2 | Gewöhnlich | – | – | – | – | 1570 | 56,4 % | 53,0 % | +4,2 |
| Aufgebot von Jōkyū | Masako | 4 | Gewöhnlich | – | – | – | – | 1726 | 55,3 % | 53,0 % | +4,2 |
| Tsurugaoka Hachiman-gū | Masako | 2 | Selten | – | – | – | – | 1632 | 55,9 % | 46,4 % | −2,4 |
| Verbannung nach Oki | Masako | 3 | Selten | – | – | – | – | 1790 | 50,6 % | 45,6 % | −3,2 |
| Hōjō Yoshitoki, Regent | Masako | 5 | Episch | – | – | – | – | 1968 | 53,9 % | 52,0 % | +3,2 |
| Minamoto no Yoritomo | Masako | 6 | Legendär | – | – | – | – | 2572 | 51,7 % | 50,4 % | +1,6 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1782 | 56,1 % | 53,4 % | +3,8 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1700 | 53,6 % | 44,8 % | −4,8 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1626 | 55,4 % | 47,5 % | +0,7 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1662 | 52,5 % | 51,3 % | +4,5 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1944 | 59,0 % | 48,7 % | +0,8 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1820 | 60,3 % | 44,6 % | −3,3 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1690 | 47,3 % | 48,3 % | −1,7 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 2424 | 44,2 % | 52,4 % | +2,5 |
| Jurtenlager | Khan | 3 | Gewöhnlich | – | – | – | – | 1750 | 35,6 % | 45,1 % | −5,9 |
| Kurultai | Khan | 4 | Selten | – | – | – | – | 1582 | 30,2 % | 49,9 % | −1,0 |
| Barde der Icener | Boudicca | 2 | Gewöhnlich | – | – | – | – | 1724 | 53,8 % | 54,4 % | +1,9 |
| Sichelwagen | Boudicca | 5 | Selten | – | – | – | – | 1870 | 48,6 % | 54,0 % | +1,5 |
| Almanach der Quatrains | Nostradamus | 1 | Gewöhnlich | – | – | – | – | 1324 | 57,7 % | 52,5 % | +1,9 |
| Horoskop der Königin | Nostradamus | 3 | Selten | – | – | – | – | 1940 | 2,7 % | 45,7 % | −4,9 |
| Pilgerin aus Domrémy | Jeanne | 1 | Gewöhnlich | – | – | – | – | 1306 | 53,3 % | 59,4 % | +10,0 |
| Die Weihe von Reims | Jeanne | 4 | Selten | – | – | – | – | 1644 | 31,9 % | 48,4 % | −1,1 |
| Runenmeisterin | Ragnar | 2 | Gewöhnlich | – | – | – | – | 1570 | 51,9 % | 53,7 % | +1,5 |
| Berserkergang | Ragnar | 1 | Selten | – | – | – | – | 1294 | 59,6 % | 50,4 % | −1,8 |
| Schwertschüler aus Kokura | Musashi | 4 | Selten | – | – | – | – | 1550 | 44,2 % | 47,4 % | −4,5 |
| Niten Ichi-ryū | Musashi | 2 | Gewöhnlich | – | – | – | – | 1614 | 49,1 % | 49,4 % | −2,5 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1580 | 49,7 % | 54,5 % | +6,2 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1694 | 28,1 % | 47,2 % | −1,0 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1662 | 49,2 % | 46,7 % | −2,7 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1624 | 38,5 % | 49,4 % | −0,0 |
| Pfeilmacher aus Meroë | Amanirenas | 2 | Gewöhnlich | – | – | – | – | 1862 | 56,1 % | 50,9 % | +1,5 |
| Gift der Wüstenviper | Amanirenas | 3 | Selten | – | – | – | – | 1904 | 45,7 % | 53,0 % | +3,5 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1740 | 54,0 % | 47,7 % | −0,1 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 2348 | 57,5 % | 54,3 % | +6,6 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1788 | 57,6 % | 50,4 % | +1,3 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1776 | 52,4 % | 47,5 % | −1,7 |
| Jitō-Verwalter | Masako | 2 | Gewöhnlich | – | – | – | – | 1588 | 55,7 % | 49,0 % | +0,2 |
| Siegel des Shikken | Masako | 2 | Selten | – | – | – | – | 1542 | 45,8 % | 49,8 % | +1,0 |
| Olympionike | Griechische Antike | 4 | Gewöhnlich | – | – | – | – | 6578 | 52,1 % | 55,7 % | +6,5 |
| Rhapsode | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 6566 | 51,8 % | 52,5 % | +3,3 |
| Marathonläufer | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 6544 | 51,5 % | 52,7 % | +3,5 |
| Orakel von Delphi | Griechische Antike | 3 | Selten | – | – | – | – | 6972 | 27,9 % | 47,2 % | −2,0 |
| Leuchtturm von Pharos | Griechische Antike | 3 | Selten | – | – | – | – | 7096 | 52,9 % | 42,1 % | −7,0 |
| Akropolis | Griechische Antike | 2 | Selten | – | – | – | – | 6460 | 54,5 % | 49,2 % | +0,1 |
| Bibliothek von Alexandria | Griechische Antike | 3 | Episch | – | – | – | – | 7068 | 48,1 % | 46,7 % | −2,4 |
| Knappe | Europäisches Mittelalter | 1 | Gewöhnlich | – | – | – | – | 6406 | 53,1 % | 53,3 % | +2,3 |
| Armbrustschütze | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 8884 | 58,0 % | 55,1 % | +4,2 |
| Mönch von Cluny | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 8760 | 50,7 % | 53,3 % | +2,3 |
| Hansekogge | Europäisches Mittelalter | 4 | Gewöhnlich | – | – | – | – | 8064 | 47,5 % | 49,7 % | −1,2 |
| Turnierritter | Europäisches Mittelalter | 4 | Selten | – | – | – | – | 8102 | 51,1 % | 54,9 % | +3,9 |
| Burgfried | Europäisches Mittelalter | 2 | Selten | – | – | – | – | 8400 | 57,2 % | 44,0 % | −6,9 |
| Tribok | Europäisches Mittelalter | 4 | Episch | – | – | – | – | 7960 | 31,8 % | 48,2 % | −2,7 |
| Ashigaru | China, Korea, Japan | 1 | Gewöhnlich | – | – | – | – | 3598 | 54,1 % | 53,8 % | +3,7 |
| Mandarin-Gelehrter | China, Korea, Japan | 3 | Gewöhnlich | – | – | – | – | 5422 | 51,5 % | 52,6 % | +2,5 |
| Teezeremonie | China, Korea, Japan | 2 | Gewöhnlich | – | – | – | – | 4876 | 43,2 % | 48,5 % | −1,5 |
| Hwacha-Salve | China, Korea, Japan | 3 | Selten | – | – | – | – | 5416 | 56,3 % | 51,2 % | +1,1 |
| Schildkrötenschiff | China, Korea, Japan | 5 | Selten | – | – | – | – | 5846 | 54,4 % | 49,2 % | −0,8 |
| Terrakotta-Armee | China, Korea, Japan | 5 | Episch | – | – | – | – | 5840 | 55,3 % | 50,3 % | +0,3 |
| Große Mauer | China, Korea, Japan | 2 | Episch | – | – | – | – | 4954 | 59,9 % | 44,1 % | −6,0 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 39266 | 31,8 % | 44,8 % | −5,2 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 37598 | 56,7 % | 45,0 % | −5,0 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 36970 | 26,9 % | 43,4 % | −6,5 |
| Thebanischer Plänkler | Epaminondas | 1 | Basis | 4600 | 76,7 % | 51,1 % | +0,5 | 1322 | 52,2 % | 55,1 % | +3,0 |
| Böotischer Hoplit | Epaminondas | 2 | Basis | 4600 | 77,0 % | 51,0 % | +0,4 | 1702 | 52,5 % | 56,6 % | +4,5 |
| Fünfzig Schilde tief | Epaminondas | 2 | Basis | 4600 | 73,9 % | 51,0 % | +0,3 | 1714 | 45,6 % | 52,1 % | +0,0 |
| Böotarch | Epaminondas | 3 | Basis | 4600 | 77,3 % | 50,7 % | +0,1 | 1828 | 51,8 % | 55,4 % | +3,3 |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | Gewöhnlich | – | – | – | – | 1918 | 48,4 % | 60,4 % | +8,3 |
| Schlacht bei Leuktra | Epaminondas | 4 | Gewöhnlich | – | – | – | – | 1574 | 42,6 % | 53,6 % | +1,5 |
| Befreiung Messeniens | Epaminondas | 5 | Selten | – | – | – | – | 1908 | 49,3 % | 53,1 % | +1,0 |
| Thebanischer Phalangit | Epaminondas | 4 | Selten | – | – | – | – | 1624 | 45,4 % | 58,4 % | +6,3 |
| Megalopolis | Epaminondas | 3 | Episch | – | – | – | – | 1712 | 43,8 % | 46,0 % | −6,1 |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | Legendär | – | – | – | – | 2578 | 42,6 % | 53,0 % | +0,9 |
| Veles | Fabius | 1 | Basis | 4600 | 86,8 % | 49,1 % | +0,1 | 1274 | 59,6 % | 53,2 % | +4,2 |
| Triarier | Fabius | 2 | Basis | 4600 | 85,7 % | 49,1 % | +0,1 | 1634 | 56,7 % | 51,5 % | +2,5 |
| Hinhalten | Fabius | 2 | Basis | 4600 | 84,3 % | 49,0 % | +0,0 | 1650 | 59,2 % | 48,0 % | −0,9 |
| Konsul der Republik | Fabius | 4 | Basis | 4600 | 83,0 % | 49,3 % | +0,3 | 1672 | 49,5 % | 47,8 % | −1,1 |
| Verbrannte Erde | Fabius | 3 | Gewöhnlich | – | – | – | – | 1834 | 62,2 % | 46,2 % | −2,8 |
| Späher am Volturnus | Fabius | 2 | Gewöhnlich | – | – | – | – | 1718 | 57,6 % | 49,4 % | +0,4 |
| Minucius, der Reiteroberst | Fabius | 4 | Selten | – | – | – | – | 1740 | 50,3 % | 51,8 % | +2,9 |
| Rückeroberung von Tarent | Fabius | 6 | Selten | – | – | – | – | 2468 | 44,0 % | 55,6 % | +6,6 |
| Lager auf den Höhen | Fabius | 3 | Episch | – | – | – | – | 1758 | 63,5 % | 48,0 % | −1,0 |
| Marcellus, Schwert Roms | Fabius | 6 | Legendär | – | – | – | – | 2470 | 47,0 % | 46,5 % | −2,5 |
| Botin der Stämme | Mandukhai | 1 | Basis | 4600 | 76,9 % | 53,1 % | +3,3 | 1256 | 49,8 % | 60,5 % | +8,0 |
| Hüterin des Herdfeuers | Mandukhai | 2 | Basis | 4600 | 78,0 % | 50,2 % | +0,3 | 1686 | 48,9 % | 51,1 % | −1,4 |
| Ruf der Tumen | Mandukhai | 3 | Basis | 4600 | 71,3 % | 48,8 % | −1,1 | 1718 | 40,7 % | 50,9 % | −1,6 |
| Bogenreiterin der Chahar | Mandukhai | 3 | Basis | 4600 | 79,4 % | 51,9 % | +2,1 | 1752 | 53,1 % | 52,6 % | +0,1 |
| Schlacht von Tas Bürd | Mandukhai | 4 | Gewöhnlich | – | – | – | – | 1710 | 46,2 % | 53,7 % | +1,2 |
| Zwilling der Khatun | Mandukhai | 3 | Gewöhnlich | – | – | – | – | 1830 | 51,8 % | 54,6 % | +2,1 |
| Schwarzes Banner | Mandukhai | 2 | Selten | – | – | – | – | 1708 | 58,6 % | 46,8 % | −5,7 |
| Unterwerfung der Oiraten | Mandukhai | 5 | Selten | – | – | – | – | 2132 | 45,5 % | 56,7 % | +4,2 |
| Batu Möngke, der junge Khan | Mandukhai | 4 | Episch | – | – | – | – | 1564 | 43,0 % | 51,9 % | −0,7 |
| Wiedervereinigung der Mongolen | Mandukhai | 8 | Legendär | – | – | – | – | 1632 | 41,4 % | 54,1 % | +1,6 |
| Mamlukenrekrut | Baibars | 1 | Basis | 4600 | 81,6 % | 50,4 % | −0,8 | 1268 | 50,5 % | 50,6 % | −0,7 |
| Barid-Kurier | Baibars | 2 | Basis | 4600 | 77,2 % | 52,4 % | +1,1 | 1644 | 47,0 % | 50,9 % | −0,3 |
| Ain Dschalut | Baibars | 3 | Basis | 4600 | 83,5 % | 52,5 % | +1,2 | 1822 | 58,3 % | 56,2 % | +5,0 |
| Bogenreiter der Bahriya | Baibars | 3 | Basis | 4600 | 81,2 % | 50,6 % | −0,7 | 1714 | 48,8 % | 49,1 % | −2,1 |
| Manjaniq-Meister | Baibars | 4 | Gewöhnlich | – | – | – | – | 1622 | 49,6 % | 54,8 % | +3,6 |
| Vorgetäuschte Flucht | Baibars | 1 | Gewöhnlich | – | – | – | – | 1200 | 17,3 % | 41,4 % | −9,9 |
| Qutuz, Sultan von Ägypten | Baibars | 5 | Selten | – | – | – | – | 2052 | 43,9 % | 57,0 % | +5,7 |
| Sturm auf Antiochia | Baibars | 2 | Selten | – | – | – | – | 1660 | 46,6 % | 49,1 % | −2,1 |
| Zitadelle von Kairo | Baibars | 4 | Episch | – | – | – | – | 1744 | 33,4 % | 50,4 % | −0,9 |
| Qalawun, Emir der Bahriya | Baibars | 6 | Legendär | – | – | – | – | 2720 | 45,6 % | 56,4 % | +5,1 |
| Dreschflegelbauer | Žižka | 2 | Basis | 4600 | 71,7 % | 46,0 % | −0,8 | 1750 | 29,2 % | 49,2 % | −1,4 |
| Píšťala-Schütze | Žižka | 2 | Basis | 4600 | 82,4 % | 48,4 % | +1,5 | 1666 | 62,1 % | 54,6 % | +4,0 |
| Salve aus der Wagenburg | Žižka | 2 | Basis | 4600 | 74,2 % | 45,9 % | −1,0 | 1788 | 32,8 % | 46,8 % | −3,8 |
| Hauptmann der Taboriten | Žižka | 3 | Basis | 4600 | 82,0 % | 49,4 % | +2,5 | 1884 | 60,2 % | 57,4 % | +6,8 |
| Hakenbüchsenwagen | Žižka | 3 | Gewöhnlich | – | – | – | – | 1772 | 59,0 % | 50,7 % | +0,1 |
| Laienkelch | Žižka | 2 | Gewöhnlich | – | – | – | – | 1654 | 44,2 % | 53,2 % | +2,6 |
| Prager Fenstersturz | Žižka | 3 | Selten | – | – | – | – | 1800 | 50,3 % | 50,5 % | −0,1 |
| Wagenburg am Vítkov | Žižka | 4 | Selten | – | – | – | – | 1638 | 57,8 % | 38,3 % | −12,3 |
| Prokop der Kahle | Žižka | 6 | Episch | – | – | – | – | 2566 | 56,8 % | 51,1 % | +0,5 |
| Jan Hus, Prediger von Bethlehem | Žižka | 5 | Legendär | – | – | – | – | 1984 | 42,7 % | 53,9 % | +3,3 |
| Bogenschützin der Shang | Fu Hao | 1 | Basis | 4600 | 81,9 % | 52,2 % | +2,7 | 1290 | 57,8 % | 51,2 % | +1,4 |
| Bronzene Yue-Axt | Fu Hao | 2 | Basis | 4600 | 74,3 % | 52,1 % | +2,6 | 1756 | 43,2 % | 51,1 % | +1,3 |
| Streitwagen der Shang | Fu Hao | 3 | Basis | 4600 | 82,0 % | 50,6 % | +1,1 | 1784 | 51,2 % | 51,6 % | +1,8 |
| Knochenwahrsager | Fu Hao | 3 | Basis | 4600 | 80,6 % | 50,8 % | +1,3 | 1864 | 43,9 % | 49,4 % | −0,4 |
| Aufgebot gegen die Qiang | Fu Hao | 4 | Gewöhnlich | – | – | – | – | 1758 | 49,4 % | 53,6 % | +3,8 |
| Ahnenopfer | Fu Hao | 1 | Gewöhnlich | – | – | – | – | 1190 | 51,7 % | 56,3 % | +6,5 |
| Gravierte Schulterblätter | Fu Hao | 1 | Selten | – | – | – | – | 1234 | 58,8 % | 53,1 % | +3,2 |
| Bogenschützinnen der Fu Hao | Fu Hao | 4 | Selten | – | – | – | – | 1628 | 55,5 % | 54,4 % | +4,6 |
| Ahnentempel von Yin | Fu Hao | 1 | Episch | – | – | – | – | 1202 | 59,3 % | 54,3 % | +4,5 |
| Wu Ding, König der Shang | Fu Hao | 6 | Legendär | – | – | – | – | 2552 | 49,1 % | 54,6 % | +4,8 |
| Gladiator | Rom | 3 | Gewöhnlich | – | – | – | – | 3376 | 58,8 % | 50,5 % | +1,3 |
| Senator der Kurie | Rom | 3 | Gewöhnlich | – | – | – | – | 3506 | 48,5 % | 50,4 % | +1,2 |
| Centurio | Rom | 2 | Gewöhnlich | – | – | – | – | 3488 | 55,6 % | 54,9 % | +5,7 |
| Triumphzug | Rom | 3 | Selten | – | – | – | – | 3468 | 41,8 % | 47,7 % | −1,5 |
| Via Appia | Rom | 2 | Selten | – | – | – | – | 3442 | 54,5 % | 49,5 % | +0,3 |
| Vestalin am ewigen Feuer | Rom | 3 | Selten | – | – | – | – | 3464 | 56,4 % | 48,3 % | −0,9 |
| Pax Romana | Rom | 5 | Episch | – | – | – | – | 3948 | 54,0 % | 44,3 % | −4,9 |
| Pferdehirtin | Persien & Steppe | 2 | Gewöhnlich | – | – | – | – | 3256 | 47,2 % | 54,1 % | +2,3 |
| Schamane des Ewigen Himmels | Persien & Steppe | 3 | Gewöhnlich | – | – | – | – | 3436 | 47,6 % | 53,9 % | +2,1 |
| Parthischer Schuss | Persien & Steppe | 2 | Gewöhnlich | – | – | – | – | 3364 | 53,9 % | 53,7 % | +1,9 |
| Garde der Unsterblichen | Persien & Steppe | 4 | Selten | – | – | – | – | 3326 | 42,3 % | 49,7 % | −2,2 |
| Pfeilsturm der Steppe | Persien & Steppe | 3 | Selten | – | – | – | – | 3440 | 47,7 % | 52,8 % | +1,0 |
| Königsstraße | Persien & Steppe | 2 | Selten | – | – | – | – | 3492 | 50,2 % | 48,7 % | −3,0 |
| Persepolis | Persien & Steppe | 3 | Episch | – | – | – | – | 3580 | 43,7 % | 53,1 % | +1,3 |
| Akrit der Grenzmark | Byzanz & islamische Welt | 2 | Gewöhnlich | – | – | – | – | 3370 | 53,8 % | 53,1 % | +3,6 |
| Gelehrter im Haus der Weisheit | Byzanz & islamische Welt | 3 | Gewöhnlich | – | – | – | – | 3492 | 50,3 % | 51,9 % | +2,4 |
| Tribut in Goldbyzantinern | Byzanz & islamische Welt | 2 | Gewöhnlich | – | – | – | – | 3408 | 26,3 % | 48,5 % | −1,0 |
| Arzt des Bimaristan | Byzanz & islamische Welt | 3 | Selten | – | – | – | – | 3564 | 57,7 % | 55,5 % | +6,1 |
| Theodosianische Mauern | Byzanz & islamische Welt | 2 | Selten | – | – | – | – | 3362 | 55,8 % | 46,9 % | −2,5 |
| Hagia Sophia | Byzanz & islamische Welt | 3 | Episch | – | – | – | – | 3430 | 59,8 % | 46,6 % | −2,9 |
| Ibn an-Nafis, Arzt von Kairo | Byzanz & islamische Welt | 4 | Episch | – | – | – | – | 3184 | 52,5 % | 55,1 % | +5,5 |
