# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `feec770d50` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die 21 anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,5.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 50600 | ✗ 20/22 | ✗ 202/231 | ✓ 46,3 % | – | 0 | 23 |
| Zufallsdecks | 50600 | ✗ 20/22 | ✗ 226/231 | ✓ 50,8 % | ✓ 52,8 % (+2,9) | 0 | 20 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Miyamoto Musashi | **53,9 %** | 48,9 % | 58,3 % | Jeanne 41,5 % | Epaminondas 62,5 % | Aggressiv: 49,0 % | ✗ |
| Hypatia | **51,7 %** | 46,8 % | 56,3 % | Anna 43,5 % | Masako 61,5 % | Kombinierend: 45,1 % | ✓ |
| Dschingis Khan | **51,7 %** | 46,6 % | 56,4 % | Žižka 32,5 % | Fu Hao 69,0 % | Aggressiv: 45,0 % | ✓ |
| Jan Žižka | **51,6 %** | 46,3 % | 56,6 % | Nezahualcóyotl 38,5 % | Khan 67,5 % | Defensiv: 43,3 % | ✓ |
| Baibars | **51,5 %** | 49,1 % | 53,7 % | Fabius 38,5 % | Ragnar 61,5 % | Aggressiv: 40,4 % | ✓ |
| Leonidas I. | **51,4 %** | 50,9 % | 51,6 % | Epaminondas 40,5 % | Fabius 65,5 % | Defensiv: 36,6 % | ✓ |
| Nezahualcóyotl | **51,0 %** | 47,0 % | 54,7 % | Baibars 39,0 % | Žižka 61,5 % | Defensiv: 38,6 % | ✓ |
| Nostradamus | **50,4 %** | 49,4 % | 51,3 % | Khan 35,5 % | Fabius 63,0 % | Kombinierend: 41,3 % | ✓ |
| Amanirenas | **50,2 %** | 47,3 % | 53,1 % | Leonidas 36,5 % | Baibars 59,0 % | Aggressiv: 44,7 % | ✓ |
| Hōjō Masako | **50,1 %** | 44,1 % | 56,2 % | Hypatia 38,5 % | Khan 60,5 % | Defensiv: 40,3 % | ✓ |
| Epaminondas | **50,1 %** | 45,0 % | 55,3 % | Fabius 36,5 % | Imhotep 61,0 % | Aggressiv: 42,5 % | ✓ |
| Jeanne d’Arc | **49,9 %** | 44,3 % | 55,5 % | Žižka 36,5 % | Fu Hao 60,5 % | Aggressiv: 51,3 % | ✓ |
| Ragnar Lodbrok | **49,6 %** | 45,9 % | 53,4 % | Baibars 38,5 % | Fu Hao 58,5 % | Aggressiv: 41,5 % | ✓ |
| Mandukhai Khatun | **49,5 %** | 45,0 % | 54,0 % | Khan 32,0 % | Fabius 62,0 % | Kombinierend: 45,2 % | ✓ |
| Anna Komnene | **49,5 %** | 49,9 % | 49,1 % | Nezahualcóyotl 41,5 % | Fabius 64,5 % | Kombinierend: 39,1 % | ✓ |
| Fu Hao | **49,3 %** | 48,4 % | 50,3 % | Khan 31,0 % | Imhotep 66,5 % | Kombinierend: 40,4 % | ✓ |
| Enrico Dandolo | **49,0 %** | 46,4 % | 51,7 % | Musashi 38,0 % | Fabius 55,5 % | Kombinierend: 41,8 % | ✓ |
| Fabius Maximus | **48,9 %** | 45,7 % | 52,3 % | Leonidas 34,5 % | Epaminondas 63,5 % | Defensiv: 40,4 % | ✓ |
| Imhotep | **48,1 %** | 45,9 % | 50,7 % | Fu Hao 33,5 % | Boudicca 60,0 % | Defensiv: 36,2 % | ✓ |
| Perikles | **48,0 %** | 43,5 % | 52,9 % | Žižka 41,5 % | Agrippa 55,5 % | Defensiv: 39,7 % | ✓ |
| Marcus Agrippa | **48,0 %** | 42,5 % | 53,8 % | Khan 35,5 % | Boudicca 57,5 % | Kombinierend: 43,9 % | ✓ |
| Boudicca | **46,7 %** | 40,2 % | 53,7 % | Žižka 36,0 % | Jeanne 55,0 % | Aggressiv: 42,3 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. | Epam. | Fabi. | Mand. | Baib. | Žižk. | Fu H. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 51 | 50 | 47 | 47 | 56 | 55 | 51 | 52 | 46 | 50 | 54 | **64** | 51 | 52 | 48 | 41 | **66** | 54 | 44 | 59 | 47 |
| Hypatia | 49 | · | 47 | 50 | 59 | 54 | 51 | 60 | 51 | 45 | 57 | 47 | 54 | 44 | 50 | **62** | 56 | 47 | 49 | 52 | 57 | 51 |
| Imhotep | 50 | 53 | · | 45 | 49 | 60 | 44 | 50 | 48 | 45 | 53 | 44 | 54 | 45 | 51 | 47 | **39** | 53 | 50 | 49 | 53 | **34** |
| Dandolo | 53 | 50 | 55 | · | 43 | 47 | 47 | 47 | 48 | **38** | 55 | 54 | 49 | 50 | 45 | 52 | 46 | 56 | 52 | 50 | 48 | 46 |
| Khan | 53 | 42 | 52 | 57 | · | 47 | **65** | 46 | 55 | 47 | 50 | **65** | 47 | 57 | 50 | **40** | 54 | 44 | **68** | 48 | **33** | **69** |
| Boudicca | 44 | 47 | 40 | 53 | 53 | · | 45 | 55 | 49 | 55 | 46 | 43 | 43 | 50 | 45 | 48 | 47 | **37** | 50 | 45 | **36** | 53 |
| Nostradamus | 45 | 50 | 56 | 53 | **36** | 55 | · | 53 | 47 | 44 | 54 | 53 | 52 | 49 | 55 | 50 | 41 | **63** | 45 | 48 | 56 | 54 |
| Jeanne | 49 | 41 | 51 | 53 | 54 | 45 | 47 | · | 60 | 59 | 56 | 51 | 44 | 53 | 49 | 43 | 54 | 47 | 45 | 53 | **37** | **61** |
| Ragnar | 49 | 50 | 52 | 52 | 45 | 51 | 53 | 40 | · | 43 | 50 | 52 | 49 | 56 | 54 | 51 | 50 | 57 | 48 | **39** | 45 | 59 |
| Musashi | 54 | 55 | 55 | **62** | 53 | 45 | 56 | 42 | 57 | · | 57 | 57 | 45 | 55 | 45 | 51 | **63** | 52 | **62** | 57 | 53 | 56 |
| Perikles | 51 | 43 | 48 | 45 | 50 | 54 | 46 | 44 | 51 | 43 | · | 56 | 51 | 52 | 50 | 46 | 46 | 50 | 44 | 47 | 42 | 52 |
| Agrippa | 46 | 53 | 56 | 46 | **36** | 57 | 48 | 49 | 48 | 43 | 44 | · | 52 | 49 | 46 | 49 | 47 | 51 | **40** | 51 | 51 | 49 |
| Amanirenas | **37** | 46 | 46 | 51 | 53 | 57 | 49 | 56 | 52 | 55 | 49 | 49 | · | 44 | 44 | 50 | 56 | 54 | 46 | 59 | 52 | 53 |
| Anna | 49 | 56 | 55 | 51 | 43 | 50 | 51 | 47 | 44 | 45 | 49 | 51 | 56 | · | 42 | 51 | 50 | **65** | 48 | 47 | 48 | 45 |
| Nezahualcóyotl | 49 | 51 | 49 | 55 | 50 | 55 | 45 | 52 | 47 | 55 | 51 | 54 | 56 | 59 | · | 45 | 47 | 52 | 55 | **39** | **62** | 45 |
| Masako | 53 | **39** | 53 | 48 | **61** | 52 | 51 | 57 | 49 | 49 | 54 | 52 | 51 | 50 | 55 | · | 48 | 41 | 57 | 44 | 40 | 53 |
| Epaminondas | 60 | 44 | **61** | 54 | 46 | 53 | 59 | 47 | 51 | **38** | 54 | 53 | 44 | 50 | 53 | 53 | · | **37** | 56 | **40** | 44 | 59 |
| Fabius | **35** | 53 | 48 | 44 | 56 | **63** | **37** | 53 | 43 | 48 | 50 | 50 | 47 | **36** | 49 | 60 | **64** | · | **38** | **62** | 58 | **37** |
| Mandukhai | 47 | 52 | 50 | 48 | **32** | 51 | 55 | 55 | 52 | **39** | 56 | **61** | 54 | 53 | 45 | 43 | 44 | **62** | · | 46 | 49 | 48 |
| Baibars | 56 | 49 | 52 | 50 | 52 | 55 | 52 | 48 | **62** | 43 | 53 | 50 | 41 | 53 | **61** | 56 | **61** | **39** | 54 | · | 48 | 51 |
| Žižka | 42 | 43 | 48 | 53 | **68** | **64** | 44 | **64** | 55 | 48 | 59 | 50 | 48 | 53 | **39** | 60 | 56 | 42 | 51 | 53 | · | 49 |
| Fu Hao | 53 | 50 | **67** | 54 | **31** | 48 | 46 | **40** | 42 | 44 | 48 | 52 | 47 | 55 | 55 | 47 | 42 | **64** | 52 | 50 | 52 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 44,6 % aufs Gesicht, 1,0 % auf Bauwerke · **Defensiv** (7 Helden) 39,3 % aufs Gesicht, 1,0 % auf Bauwerke · **Kombinierend** (7 Helden) 42,4 % aufs Gesicht, 1,1 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 24,3, Median 23, 10–90 %: 17–33, kürzeste 9, längste 63. Beginner gewinnt 46,3 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Belagerungsturm | neutral | 6 | 55,3 % | +5,3 | 75,5 % |
| Goldener Reiter | Khan | 4 | 56,3 % | +4,8 | 69,7 % |
| Warägergardist | Anna | 3 | 53,8 % | +4,3 | 81,7 % |
| Pilumwerfer | Agrippa | 1 | 52,2 % | +4,1 | 76,3 % |
| Handelsgesandter | Dandolo | 4 | 52,6 % | +3,5 | 77,3 % |
| Rede auf die Gefallenen | Perikles | 3 | 51,6 % | +3,5 | 79,4 % |
| Botin der Stämme | Mandukhai | 1 | 52,8 % | +3,2 | 76,8 % |
| Kopistin der Chronik | Anna | 1 | 52,7 % | +3,2 | 80,9 % |
| Fjordspäher | Ragnar | 1 | 48,0 % | −1,7 | 77,1 % |
| Hainwächterin | Boudicca | 1 | 45,3 % | −1,7 | 81,6 % |
| Eichenhaut | Boudicca | 2 | 45,0 % | −1,9 | 72,5 % |
| Pfeilschuss | Khan | 2 | 49,4 % | −2,1 | 74,9 % |
| Salve aus der Wagenburg | Žižka | 2 | 49,3 % | −2,1 | 74,8 % |
| Nonne von Kamakura | Masako | 2 | 48,0 % | −2,1 | 81,1 % |
| Gokenin aus Sagami | Masako | 1 | 47,8 % | −2,4 | 80,5 % |
| Lange Mauern | Perikles | 2 | 44,0 % | −4,2 | 77,9 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Mandukhai Khatun | **53,0 %** | 52,2 % | 53,3 % | Khan 46,0 % | Hypatia 58,5 % | Kombinierend: 47,2 % | ✗ |
| Boudicca | **52,7 %** | 53,1 % | 51,9 % | Ragnar 46,5 % | Anna 61,0 % | Aggressiv: 49,4 % | ✓ |
| Ragnar Lodbrok | **52,4 %** | 53,3 % | 51,0 % | Jeanne 46,0 % | Anna 60,5 % | Aggressiv: 47,7 % | ✓ |
| Epaminondas | **52,2 %** | 51,6 % | 52,5 % | Boudicca 46,5 % | Imhotep 58,5 % | Aggressiv: 47,4 % | ✓ |
| Miyamoto Musashi | **52,1 %** | 51,6 % | 52,2 % | Ragnar 46,0 % | Hypatia 57,0 % | Aggressiv: 54,0 % | ✓ |
| Jan Žižka | **51,5 %** | 52,0 % | 50,8 % | Fu Hao 43,0 % | Hypatia 63,0 % | Defensiv: 43,4 % | ✓ |
| Baibars | **51,4 %** | 52,5 % | 50,1 % | Ragnar 43,0 % | Fabius 60,0 % | Aggressiv: 42,9 % | ✓ |
| Dschingis Khan | **51,0 %** | 49,4 % | 52,5 % | Imhotep 42,0 % | Nostradamus 60,0 % | Aggressiv: 51,1 % | ✓ |
| Nostradamus | **50,4 %** | 51,6 % | 49,2 % | Khan 40,0 % | Jeanne 59,0 % | Kombinierend: 44,6 % | ✓ |
| Enrico Dandolo | **49,9 %** | 51,2 % | 48,7 % | Boudicca 40,0 % | Imhotep 58,5 % | Kombinierend: 44,6 % | ✓ |
| Fu Hao | **49,8 %** | 53,1 % | 46,5 % | Musashi 43,0 % | Anna 58,5 % | Kombinierend: 44,0 % | ✓ |
| Marcus Agrippa | **49,4 %** | 49,3 % | 49,7 % | Mandukhai 42,5 % | Jeanne 56,5 % | Kombinierend: 46,3 % | ✓ |
| Leonidas I. | **49,4 %** | 50,4 % | 48,6 % | Žižka 45,5 % | Nostradamus 55,5 % | Defensiv: 38,7 % | ✓ |
| Jeanne d’Arc | **49,3 %** | 51,3 % | 47,5 % | Nostradamus 41,0 % | Hypatia 55,5 % | Aggressiv: 50,1 % | ✓ |
| Amanirenas | **49,3 %** | 50,1 % | 48,7 % | Mandukhai 44,0 % | Jeanne 56,0 % | Aggressiv: 48,5 % | ✓ |
| Hōjō Masako | **48,9 %** | 49,2 % | 48,8 % | Baibars 43,0 % | Perikles 55,5 % | Defensiv: 39,3 % | ✓ |
| Nezahualcóyotl | **48,8 %** | 50,1 % | 47,8 % | Imhotep 39,0 % | Amanirenas 53,5 % | Defensiv: 39,5 % | ✓ |
| Fabius Maximus | **48,8 %** | 50,9 % | 47,0 % | Baibars 40,0 % | Perikles 65,0 % | Defensiv: 41,5 % | ✓ |
| Perikles | **48,0 %** | 49,6 % | 46,8 % | Fabius 35,0 % | Imhotep 55,5 % | Defensiv: 41,2 % | ✓ |
| Imhotep | **47,5 %** | 47,8 % | 47,7 % | Ragnar 40,0 % | Nezahualcóyotl 61,0 % | Defensiv: 38,1 % | ✓ |
| Anna Komnene | **47,4 %** | 49,5 % | 45,8 % | Boudicca 39,0 % | Fabius 58,5 % | Kombinierend: 41,9 % | ✓ |
| Hypatia | **46,4 %** | 48,7 % | 44,7 % | Žižka 37,0 % | Fabius 54,5 % | Kombinierend: 43,6 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. | Epam. | Fabi. | Mand. | Baib. | Žižk. | Fu H. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 49 | 55 | 51 | 47 | 51 | 56 | 48 | 48 | 48 | 48 | 55 | 49 | 49 | 49 | 49 | 47 | 49 | 48 | 52 | 46 | 50 |
| Hypatia | 51 | · | 51 | 52 | 41 | 45 | 43 | 45 | 48 | 43 | 45 | 50 | 48 | 47 | 49 | 47 | 45 | 55 | 42 | 44 | **37** | 50 |
| Imhotep | 45 | 49 | · | 42 | 58 | 47 | 45 | 46 | 40 | 46 | 45 | 47 | 49 | 49 | **61** | 52 | 42 | 47 | 47 | 44 | 45 | 56 |
| Dandolo | 50 | 49 | 59 | · | 47 | 40 | 56 | 51 | 48 | 45 | 54 | 55 | 53 | 51 | 52 | 52 | 44 | 55 | 49 | 49 | 49 | 45 |
| Khan | 53 | 60 | 42 | 53 | · | 44 | 60 | 48 | 45 | 51 | 53 | 50 | 52 | 60 | 50 | 49 | 50 | 53 | 54 | 45 | 50 | 54 |
| Boudicca | 50 | 55 | 53 | 60 | 56 | · | 50 | 51 | 47 | 50 | 56 | 56 | 55 | **61** | 52 | 50 | 54 | 51 | 53 | 49 | 48 | 53 |
| Nostradamus | 44 | 57 | 55 | 44 | 40 | 51 | · | 59 | 49 | 47 | 51 | 54 | 51 | 52 | 49 | 50 | 52 | 56 | 52 | 45 | 51 | 53 |
| Jeanne | 53 | 55 | 54 | 49 | 52 | 49 | 41 | · | 54 | 44 | 49 | 44 | 44 | 55 | 52 | 54 | 47 | 49 | 49 | 49 | 46 | 51 |
| Ragnar | 53 | 52 | 60 | 53 | 55 | 53 | 51 | 46 | · | 54 | 54 | 50 | 48 | **61** | 51 | 55 | 47 | 55 | 49 | 57 | 47 | 53 |
| Musashi | 53 | 57 | 54 | 55 | 50 | 50 | 53 | 56 | 46 | · | 51 | 49 | 51 | 56 | 48 | 51 | 54 | 53 | 54 | 50 | 50 | 57 |
| Perikles | 53 | 55 | 55 | 46 | 48 | 44 | 49 | 52 | 47 | 50 | · | 48 | 50 | 49 | 51 | 45 | 49 | **35** | 44 | 48 | 49 | 47 |
| Agrippa | 45 | 50 | 53 | 45 | 51 | 44 | 46 | 56 | 51 | 52 | 52 | · | 50 | 50 | 48 | 56 | 46 | 53 | 43 | 44 | 54 | 53 |
| Amanirenas | 51 | 52 | 51 | 48 | 49 | 45 | 49 | 56 | 52 | 49 | 51 | 51 | · | 54 | 47 | 46 | 47 | 49 | 44 | 53 | 50 | 46 |
| Anna | 51 | 53 | 51 | 50 | 40 | **39** | 49 | 45 | **40** | 44 | 52 | 50 | 47 | · | 52 | 52 | 42 | 59 | 48 | 44 | 49 | 42 |
| Nezahualcóyotl | 51 | 52 | **39** | 48 | 51 | 49 | 52 | 49 | 50 | 52 | 50 | 52 | 53 | 48 | · | 46 | 51 | 47 | 44 | 51 | 48 | 48 |
| Masako | 52 | 53 | 48 | 49 | 51 | 50 | 50 | 46 | 45 | 50 | 55 | 44 | 54 | 48 | 54 | · | 46 | 45 | 45 | 43 | 47 | 55 |
| Epaminondas | 53 | 55 | 59 | 56 | 51 | 47 | 49 | 53 | 53 | 47 | 51 | 54 | 53 | 59 | 49 | 54 | · | 51 | 49 | 56 | 48 | 52 |
| Fabius | 52 | 45 | 53 | 45 | 47 | 50 | 44 | 51 | 45 | 48 | **65** | 48 | 52 | 42 | 53 | 55 | 49 | · | 45 | 40 | 52 | 46 |
| Mandukhai | 52 | 59 | 53 | 52 | 46 | 48 | 49 | 52 | 52 | 46 | 56 | 57 | 56 | 52 | 56 | 55 | 52 | 55 | · | 56 | 54 | 57 |
| Baibars | 48 | 56 | 56 | 51 | 55 | 52 | 55 | 52 | 43 | 50 | 53 | 56 | 47 | 56 | 50 | 57 | 44 | 60 | 44 | · | 47 | 49 |
| Žižka | 54 | **63** | 55 | 51 | 51 | 52 | 50 | 54 | 53 | 51 | 52 | 47 | 51 | 52 | 52 | 53 | 53 | 48 | 47 | 53 | · | 43 |
| Fu Hao | 51 | 50 | 44 | 55 | 46 | 47 | 48 | 50 | 48 | 43 | 53 | 48 | 54 | 59 | 53 | 45 | 48 | 54 | 43 | 52 | 57 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 48,9 % aufs Gesicht, 7,6 % auf Bauwerke · **Defensiv** (7 Helden) 40,3 % aufs Gesicht, 9,7 % auf Bauwerke · **Kombinierend** (7 Helden) 44,6 % aufs Gesicht, 8,9 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 21,7, Median 20, 10–90 %: 15–30, kürzeste 8, längste 66. Beginner gewinnt 50,8 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Dreschflegelbauer | Žižka | 1 | 62,8 % | +11,4 | 55,4 % |
| Phalanxveteran | Leonidas | 5 | 60,0 % | +10,5 | 57,8 % |
| Griechisches Feuer | Anna | 4 | 58,2 % | +10,5 | 46,2 % |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 59,4 % | +10,5 | 57,3 % |
| Goldener Reiter | Khan | 4 | 61,0 % | +10,0 | 47,0 % |
| Pilgerin aus Domrémy | Jeanne | 1 | 59,2 % | +9,8 | 53,0 % |
| Astrolabienwächter | Hypatia | 3 | 56,3 % | +9,6 | 56,9 % |
| Warägergardist | Anna | 3 | 56,9 % | +9,2 | 53,6 % |
| Große Mauer | China, Korea, Japan | 2 | 44,3 % | −5,9 | 59,9 % |
| Jurtenlager | Khan | 3 | 45,0 % | −5,9 | 35,9 % |
| Pyramiden von Gizeh | neutral | 4 | 43,4 % | −6,5 | 26,8 % |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | 42,1 % | −6,8 | 54,5 % |
| Leuchtturm von Pharos | Griechische Antike | 3 | 42,1 % | −7,0 | 52,9 % |
| Burgfried | Europäisches Mittelalter | 2 | 43,9 % | −7,2 | 57,3 % |
| Vorgetäuschte Flucht | Baibars | 1 | 41,6 % | −9,7 | 17,4 % |
| Wagenburg am Vítkov | Žižka | 4 | 39,4 % | −12,0 | 56,3 % |

**Legendäre** (AP 5.3) – als Gruppe 52,8 % „gewinnt, wenn gezogen“ (+2,9 gegenüber ihrem Helden, 61769 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Lagertha, Schildmaid | Ragnar | 7 | 57,6 % | +5,4 | 45,2 % |
| Qalawun, Emir der Bahriya | Baibars | 6 | 56,5 % | +5,2 | 45,5 % |
| Subutai, der Stratege | Khan | 6 | 56,5 % | +5,5 | 44,0 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 56,1 % | +6,6 | 49,4 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 55,4 % | +5,5 | 43,4 % |
| Wu Ding, König der Shang | Fu Hao | 6 | 54,6 % | +4,8 | 49,4 % |
| Wiedervereinigung der Mongolen | Mandukhai | 8 | 54,2 % | +1,4 | 41,5 % |
| Djoser, der Erbauer | Imhotep | 6 | 53,4 % | +5,6 | 50,4 % |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | 53,0 % | +1,0 | 42,5 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 52,9 % | +3,0 | 44,5 % |
| Jan Hus, Prediger von Bethlehem | Žižka | 5 | 52,2 % | +0,8 | 44,0 % |
| Sasaki Kojirō, der Rivale | Musashi | 6 | 52,1 % | +0,2 | 44,9 % |
| Andraste, Göttin des Sieges | Boudicca | 8 | 52,1 % | −0,4 | 45,9 % |
| Herodot, Vater der Geschichte | neutral | 4 | 51,7 % | +1,7 | 42,7 % |
| Caterina de’ Medici | Nostradamus | 5 | 51,6 % | +1,2 | 53,4 % |
| Theon von Alexandria | Hypatia | 5 | 50,6 % | +3,9 | 49,3 % |
| Minamoto no Yoritomo | Masako | 6 | 50,4 % | +1,3 | 51,7 % |
| La Hire, der Unbeugsame | Jeanne | 7 | 50,1 % | +0,7 | 42,3 % |
| Bronzekopf des Augustus | Amanirenas | 6 | 50,0 % | +0,7 | 45,2 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 49,7 % | +1,6 | 51,8 % |
| Alexios I. Komnenos | Anna | 6 | 48,6 % | +0,9 | 48,5 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 46,7 % | −2,7 | 39,5 % |
| Marcellus, Schwert Roms | Fabius | 6 | 46,6 % | −2,4 | 47,0 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 43,3 % | −5,6 | 46,6 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 4600 | 80,5 % | 52,1 % | +0,9 | 1220 | 53,4 % | 51,0 % | +1,5 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 4600 | 81,5 % | 51,8 % | +0,6 | 1676 | 58,5 % | 53,0 % | +3,5 |
| Bronzener Wall | Leonidas | 2 | Basis | 4600 | 81,3 % | 52,8 % | +1,6 | 1624 | 52,3 % | 47,6 % | −1,8 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 4600 | 76,4 % | 53,0 % | +1,8 | 1640 | 48,8 % | 47,9 % | −1,5 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1728 | 56,7 % | 52,7 % | +3,2 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1746 | 55,2 % | 49,7 % | +0,2 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1922 | 57,8 % | 60,0 % | +10,5 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1582 | 46,1 % | 51,6 % | +2,1 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 2450 | 53,3 % | 45,0 % | −4,5 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 2056 | 49,4 % | 56,1 % | +6,6 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 4600 | 83,0 % | 49,9 % | −1,6 | 1148 | 55,7 % | 46,5 % | −0,2 |
| Himmelsstrahl | Hypatia | 2 | Basis | 4600 | 86,0 % | 51,3 % | −0,2 | 1658 | 57,3 % | 49,8 % | +3,1 |
| Sternenkundiger | Hypatia | 3 | Basis | 4600 | 81,2 % | 52,9 % | +1,4 | 1938 | 49,0 % | 49,5 % | +2,8 |
| Sternenregen | Hypatia | 4 | Basis | 4600 | 78,1 % | 54,6 % | +3,0 | 1552 | 45,2 % | 50,8 % | +4,1 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1766 | 56,9 % | 56,3 % | +9,6 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1654 | 41,5 % | 46,6 % | −0,1 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1862 | 47,5 % | 51,2 % | +4,5 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 2534 | 55,7 % | 47,5 % | +0,8 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 1900 | 53,6 % | 44,6 % | −2,1 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1982 | 49,3 % | 50,6 % | +3,9 |
| Nilschülerin | Imhotep | 1 | Basis | 4600 | 82,6 % | 47,7 % | −0,6 | 1348 | 57,2 % | 48,1 % | +0,4 |
| Heilender Balsam | Imhotep | 1 | Basis | 4600 | 82,6 % | 50,1 % | +1,8 | 1314 | 58,3 % | 52,9 % | +5,2 |
| Pyramidenwächter | Imhotep | 3 | Basis | 4600 | 84,4 % | 49,5 % | +1,2 | 1928 | 58,9 % | 50,4 % | +2,6 |
| Tempelärztin | Imhotep | 4 | Basis | 4600 | 80,3 % | 49,0 % | +0,7 | 1820 | 52,6 % | 46,9 % | −0,9 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1842 | 53,2 % | 50,9 % | +3,2 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1894 | 59,8 % | 51,6 % | +3,9 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1882 | 49,0 % | 47,6 % | −0,1 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 2054 | 55,2 % | 54,1 % | +6,4 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 2052 | 55,8 % | 46,6 % | −1,1 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 2532 | 50,4 % | 53,4 % | +5,6 |
| Lagunenbote | Dandolo | 1 | Basis | 4600 | 78,8 % | 51,5 % | +2,4 | 1184 | 51,2 % | 53,6 % | +3,7 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 4600 | 79,6 % | 48,4 % | −0,7 | 1652 | 47,8 % | 46,6 % | −3,4 |
| Präziser Stich | Dandolo | 2 | Basis | 4600 | 83,8 % | 50,6 % | +1,6 | 1658 | 54,0 % | 50,0 % | +0,1 |
| Handelsgesandter | Dandolo | 4 | Basis | 4600 | 77,3 % | 52,6 % | +3,5 | 1542 | 51,1 % | 51,7 % | +1,7 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1684 | 38,6 % | 50,1 % | +0,2 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1718 | 54,9 % | 50,8 % | +0,9 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1698 | 43,5 % | 49,6 % | −0,3 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1800 | 50,5 % | 50,1 % | +0,1 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1820 | 32,9 % | 52,1 % | +2,2 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 2380 | 44,5 % | 52,9 % | +3,0 |
| Steppenspäher | Khan | 1 | Basis | 4600 | 74,9 % | 50,8 % | −0,8 | 1190 | 45,0 % | 50,7 % | −0,3 |
| Reiterbogenschütze | Khan | 2 | Basis | 4600 | 75,6 % | 50,1 % | −1,5 | 1722 | 50,8 % | 53,2 % | +2,3 |
| Pfeilschuss | Khan | 2 | Basis | 4600 | 74,9 % | 49,4 % | −2,1 | 1712 | 53,2 % | 52,3 % | +1,3 |
| Goldener Reiter | Khan | 4 | Basis | 4600 | 69,7 % | 56,3 % | +4,8 | 1586 | 47,0 % | 61,0 % | +10,0 |
| Adlerjägerin | Khan | 3 | Gewöhnlich | – | – | – | – | 1726 | 41,4 % | 49,5 % | −1,5 |
| Steppensturm | Khan | 3 | Gewöhnlich | – | – | – | – | 1696 | 47,8 % | 49,3 % | −1,6 |
| Tumenwächter | Khan | 5 | Selten | – | – | – | – | 1858 | 46,1 % | 54,0 % | +3,0 |
| Belagerungsfeuer | Khan | 6 | Selten | – | – | – | – | 2326 | 47,7 % | 54,0 % | +3,0 |
| Keshig-Elite | Khan | 6 | Episch | – | – | – | – | 2370 | 44,5 % | 49,0 % | −1,9 |
| Subutai, der Stratege | Khan | 6 | Legendär | – | – | – | – | 2284 | 44,0 % | 56,5 % | +5,5 |
| Hainwächterin | Boudicca | 1 | Basis | 4600 | 81,6 % | 45,3 % | −1,7 | 1296 | 51,2 % | 53,1 % | +0,6 |
| Eichenhaut | Boudicca | 2 | Basis | 4600 | 72,5 % | 45,0 % | −1,9 | 1710 | 40,1 % | 49,1 % | −3,4 |
| Icenerkrieger | Boudicca | 3 | Basis | 4600 | 84,4 % | 47,9 % | +0,9 | 1718 | 55,8 % | 56,2 % | +3,7 |
| Wilder Hieb | Boudicca | 3 | Basis | 4600 | 83,6 % | 45,9 % | −1,0 | 1718 | 58,7 % | 49,8 % | −2,7 |
| Streitwagenlenkerin | Boudicca | 4 | Gewöhnlich | – | – | – | – | 1550 | 46,9 % | 51,8 % | −0,7 |
| Druidin des Hains | Boudicca | 3 | Gewöhnlich | – | – | – | – | 1760 | 53,5 % | 50,7 % | −1,8 |
| Aufstand | Boudicca | 3 | Selten | – | – | – | – | 1724 | 54,7 % | 56,6 % | +4,1 |
| Eichenkoloss | Boudicca | 6 | Selten | – | – | – | – | 2492 | 52,4 % | 54,2 % | +1,7 |
| Zorn der Königin | Boudicca | 5 | Episch | – | – | – | – | 1838 | 33,6 % | 49,2 % | −3,3 |
| Andraste, Göttin des Sieges | Boudicca | 8 | Legendär | – | – | – | – | 1402 | 45,9 % | 52,1 % | −0,4 |
| Tintenlehrling | Nostradamus | 1 | Basis | 4600 | 84,7 % | 52,9 % | +2,6 | 1366 | 58,1 % | 55,2 % | +4,8 |
| Dunkle Vorahnung | Nostradamus | 2 | Basis | 4600 | 88,2 % | 53,2 % | +2,9 | 1894 | 64,6 % | 54,6 % | +4,2 |
| Maskierter Seher | Nostradamus | 3 | Basis | 4600 | 84,2 % | 51,0 % | +0,6 | 1944 | 47,8 % | 50,2 % | −0,2 |
| Prophezeiung | Nostradamus | 4 | Basis | 4600 | 63,8 % | 50,9 % | +0,5 | 1726 | 22,7 % | 49,0 % | −1,4 |
| Pestdoktor | Nostradamus | 4 | Gewöhnlich | – | – | – | – | 1836 | 56,5 % | 58,1 % | +7,7 |
| Schattenpakt | Nostradamus | 2 | Gewöhnlich | – | – | – | – | 1874 | 60,1 % | 55,9 % | +5,5 |
| Chronist der Nacht | Nostradamus | 5 | Selten | – | – | – | – | 1914 | 51,7 % | 51,5 % | +1,1 |
| Rote Finsternis | Nostradamus | 5 | Selten | – | – | – | – | 2008 | 41,7 % | 53,5 % | +3,2 |
| Wächter der Zeiten | Nostradamus | 6 | Episch | – | – | – | – | 2542 | 59,3 % | 53,2 % | +2,8 |
| Caterina de’ Medici | Nostradamus | 5 | Legendär | – | – | – | – | 1960 | 53,4 % | 51,6 % | +1,2 |
| Bauernrekrut | Jeanne | 1 | Basis | 4600 | 78,5 % | 49,6 % | −0,3 | 1312 | 55,2 % | 54,3 % | +4,9 |
| Bannersegen | Jeanne | 2 | Basis | 4600 | 78,8 % | 50,5 % | +0,6 | 1652 | 50,1 % | 50,4 % | +1,0 |
| Wache von Orléans | Jeanne | 3 | Basis | 4600 | 77,8 % | 49,8 % | −0,0 | 1792 | 55,9 % | 53,1 % | +3,7 |
| Die Fahne erheben | Jeanne | 2 | Basis | 4600 | 76,5 % | 49,1 % | −0,8 | 1664 | 54,3 % | 55,9 % | +6,5 |
| Lilienritter | Jeanne | 4 | Gewöhnlich | – | – | – | – | 1568 | 41,1 % | 51,8 % | +2,5 |
| Heiliger Schutz | Jeanne | 2 | Gewöhnlich | – | – | – | – | 1670 | 46,8 % | 51,3 % | +1,9 |
| Standartenträgerin | Jeanne | 5 | Selten | – | – | – | – | 1840 | 48,6 % | 49,6 % | +0,3 |
| Glocken von Reims | Jeanne | 6 | Selten | – | – | – | – | 2266 | 42,3 % | 51,1 % | +1,7 |
| Paladin der Loire | Jeanne | 7 | Episch | – | – | – | – | 2098 | 41,1 % | 50,1 % | +0,8 |
| La Hire, der Unbeugsame | Jeanne | 7 | Legendär | – | – | – | – | 2016 | 42,3 % | 50,1 % | +0,7 |
| Fjordspäher | Ragnar | 1 | Basis | 4600 | 77,1 % | 48,0 % | −1,7 | 1256 | 50,6 % | 54,5 % | +2,3 |
| Runenblitz | Ragnar | 2 | Basis | 4600 | 80,6 % | 49,6 % | −0,0 | 1648 | 60,2 % | 53,4 % | +1,3 |
| Schildmaid | Ragnar | 3 | Basis | 4600 | 80,8 % | 50,4 % | +0,7 | 1706 | 53,6 % | 55,3 % | +3,1 |
| Runenschnitzer | Ragnar | 4 | Basis | 4600 | 75,4 % | 51,7 % | +2,0 | 1598 | 50,4 % | 53,4 % | +1,3 |
| Donnerschlag | Ragnar | 3 | Gewöhnlich | – | – | – | – | 1758 | 56,0 % | 52,2 % | +0,0 |
| Berserker vom Fjord | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1556 | 47,7 % | 52,2 % | +0,1 |
| Ahnenbund | Ragnar | 3 | Selten | – | – | – | – | 1664 | 51,9 % | 58,4 % | +6,2 |
| Runenhüter | Ragnar | 5 | Selten | – | – | – | – | 1900 | 47,4 % | 50,3 % | −1,9 |
| Sturm der Nordsee | Ragnar | 5 | Episch | – | – | – | – | 1906 | 52,3 % | 53,8 % | +1,6 |
| Lagertha, Schildmaid | Ragnar | 7 | Legendär | – | – | – | – | 2238 | 45,2 % | 57,6 % | +5,4 |
| Dojoschüler | Musashi | 1 | Basis | 4600 | 78,5 % | 52,7 % | −0,9 | 1182 | 52,0 % | 52,1 % | +0,2 |
| Schneller Schnitt | Musashi | 1 | Basis | 4600 | 83,1 % | 54,0 % | +0,4 | 1160 | 50,1 % | 54,5 % | +2,6 |
| Rōnin | Musashi | 3 | Basis | 4600 | 83,2 % | 55,5 % | +1,9 | 1784 | 53,3 % | 58,3 % | +6,3 |
| Konzentration | Musashi | 2 | Basis | 4600 | 71,8 % | 55,3 % | +1,7 | 1698 | 41,7 % | 50,7 % | −1,2 |
| Kirschblütenwache | Musashi | 3 | Gewöhnlich | – | – | – | – | 1764 | 51,9 % | 53,6 % | +1,7 |
| Zwei Himmel | Musashi | 3 | Gewöhnlich | – | – | – | – | 1776 | 35,8 % | 50,6 % | −1,3 |
| Duellant | Musashi | 4 | Selten | – | – | – | – | 1546 | 39,6 % | 51,3 % | −0,6 |
| Der leere Geist | Musashi | 5 | Selten | – | – | – | – | 1826 | 39,8 % | 55,0 % | +3,1 |
| Meister der fünf Ringe | Musashi | 6 | Episch | – | – | – | – | 2388 | 49,8 % | 50,4 % | −1,5 |
| Sasaki Kojirō, der Rivale | Musashi | 6 | Legendär | – | – | – | – | 2234 | 44,9 % | 52,1 % | +0,2 |
| Dorfwache | neutral | 1 | Basis | 101200 | 79,4 % | 49,3 % | −0,7 | 27674 | 53,4 % | 50,0 % | +0,1 |
| Wandernder Händler | neutral | 2 | Basis | 101200 | 76,9 % | 49,3 % | −0,7 | 37568 | 48,3 % | 50,0 % | −0,0 |
| Steinschleuderer | neutral | 2 | Basis | 101200 | 80,4 % | 49,4 % | −0,6 | 37394 | 52,8 % | 50,5 % | +0,5 |
| Grenzläuferin | neutral | 3 | Basis | 101200 | 81,5 % | 50,9 % | +0,9 | 38970 | 52,1 % | 52,4 % | +2,4 |
| Festungsschild | neutral | 4 | Basis | 101200 | 75,4 % | 50,9 % | +0,9 | 36708 | 46,7 % | 50,4 % | +0,5 |
| Kavallerist | neutral | 4 | Basis | 101200 | 77,0 % | 51,3 % | +1,3 | 36220 | 46,3 % | 51,1 % | +1,1 |
| Feldheilerin | neutral | 3 | Basis | 101200 | 79,5 % | 49,4 % | −0,6 | 39624 | 51,0 % | 49,1 % | −0,9 |
| Archivarin | neutral | 4 | Basis | 101200 | 73,1 % | 52,3 % | +2,3 | 36998 | 44,9 % | 50,3 % | +0,3 |
| Wachhund | neutral | 2 | Basis | 101200 | 78,5 % | 48,7 % | −1,3 | 37316 | 50,2 % | 48,3 % | −1,7 |
| Veteran | neutral | 5 | Basis | 101200 | 78,0 % | 52,4 % | +2,4 | 43434 | 49,6 % | 48,8 % | −1,1 |
| Belagerungsturm | neutral | 6 | Basis | 101200 | 75,5 % | 55,3 % | +5,3 | 55456 | 51,0 % | 50,4 % | +0,4 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 39656 | 49,7 % | 50,4 % | +0,4 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 27844 | 52,7 % | 51,6 % | +1,6 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 43476 | 50,9 % | 53,6 % | +3,6 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 39740 | 49,8 % | 50,2 % | +0,2 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 37366 | 49,5 % | 49,8 % | −0,2 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 37540 | 40,4 % | 49,4 % | −0,5 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 27680 | 49,5 % | 47,6 % | −2,4 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 37256 | 56,2 % | 49,6 % | −0,3 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 49376 | 52,0 % | 53,7 % | +3,7 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 39112 | 54,0 % | 50,6 % | +0,6 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 36654 | 47,1 % | 49,1 % | −0,8 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 37640 | 52,8 % | 52,6 % | +2,7 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 36712 | 48,1 % | 52,2 % | +2,2 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 39232 | 56,2 % | 52,8 % | +2,8 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 37258 | 28,5 % | 45,1 % | −4,8 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 36714 | 47,7 % | 47,1 % | −2,9 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 43466 | 47,0 % | 51,0 % | +1,1 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 36586 | 52,3 % | 54,1 % | +4,1 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 36644 | 46,5 % | 54,4 % | +4,5 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 43566 | 51,9 % | 51,3 % | +1,4 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 43572 | 49,1 % | 50,2 % | +0,3 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 37264 | 41,7 % | 49,5 % | −0,5 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 55612 | 54,2 % | 50,8 % | +0,8 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 49500 | 46,1 % | 52,1 % | +2,2 |
| Vergessene Weisheit | neutral | 4 | Episch | – | – | – | – | 36638 | 23,9 % | 48,9 % | −1,0 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 34334 | 44,4 % | 58,9 % | +9,0 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 49344 | 54,2 % | 52,6 % | +2,6 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 36262 | 42,7 % | 51,7 % | +1,7 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 34088 | 43,4 % | 55,4 % | +5,5 |
| Agent des Zehnerrats | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1704 | 59,5 % | 51,0 % | +1,0 |
| Tributeintreiber | Khan | 3 | Gewöhnlich | – | – | – | – | 1746 | 50,4 % | 50,4 % | −0,6 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1858 | 54,6 % | 51,2 % | +3,5 |
| Brand von Londinium | Boudicca | 3 | Selten | – | – | – | – | 1728 | 49,7 % | 52,9 % | +0,4 |
| Bannbulle | Nostradamus | 1 | Selten | – | – | – | – | 1458 | 58,5 % | 51,8 % | +1,4 |
| Plünderer von Paris | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1672 | 45,9 % | 51,5 % | −0,7 |
| Zorn des Donnergottes | Ragnar | 1 | Gewöhnlich | – | – | – | – | 1278 | 60,5 % | 51,7 % | −0,4 |
| Shinobi aus Iga | Musashi | 2 | Gewöhnlich | – | – | – | – | 1720 | 50,7 % | 55,4 % | +3,5 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 37032 | 51,8 % | 48,1 % | −1,9 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 27816 | 54,3 % | 52,5 % | +2,5 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 37650 | 56,4 % | 52,8 % | +2,8 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 38954 | 50,5 % | 52,3 % | +2,3 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 39312 | 55,2 % | 50,2 % | +0,2 |
| Ruderer der Triere | Perikles | 1 | Basis | 4600 | 78,5 % | 50,3 % | +2,1 | 1184 | 56,0 % | 55,6 % | +7,4 |
| Lange Mauern | Perikles | 2 | Basis | 4600 | 77,9 % | 44,0 % | −4,2 | 1594 | 55,5 % | 43,4 % | −4,7 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 4600 | 79,4 % | 51,6 % | +3,5 | 1696 | 55,0 % | 52,8 % | +4,6 |
| Strategos | Perikles | 3 | Basis | 4600 | 77,9 % | 50,8 % | +2,6 | 1678 | 57,0 % | 53,9 % | +5,7 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1694 | 46,9 % | 44,0 % | −4,1 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1674 | 59,6 % | 54,5 % | +6,3 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1498 | 52,3 % | 54,1 % | +5,9 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1636 | 38,8 % | 50,3 % | +2,1 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1582 | 36,0 % | 42,7 % | −5,4 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 2416 | 51,8 % | 49,7 % | +1,6 |
| Pilumwerfer | Agrippa | 1 | Basis | 4600 | 76,3 % | 52,2 % | +4,1 | 1236 | 56,0 % | 54,1 % | +4,7 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 4600 | 73,0 % | 50,1 % | +2,0 | 1684 | 46,3 % | 50,8 % | +1,3 |
| Castra | Agrippa | 3 | Basis | 4600 | 82,0 % | 49,1 % | +1,0 | 1736 | 57,2 % | 48,7 % | −0,8 |
| Testudo | Agrippa | 2 | Basis | 4600 | 73,3 % | 50,7 % | +2,6 | 1718 | 49,5 % | 52,4 % | +2,9 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1726 | 52,0 % | 50,9 % | +1,4 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1692 | 49,8 % | 51,9 % | +2,4 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1982 | 52,8 % | 51,9 % | +2,4 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1632 | 53,8 % | 43,6 % | −5,8 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1618 | 40,8 % | 48,8 % | −0,7 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1918 | 39,5 % | 46,7 % | −2,7 |
| Bogenschütze von Ta-Seti | Amanirenas | 1 | Basis | 4600 | 82,1 % | 50,5 % | +0,3 | 1398 | 57,2 % | 49,7 % | +0,3 |
| Wüstenreiter | Amanirenas | 2 | Basis | 4600 | 80,4 % | 49,4 % | −0,8 | 1834 | 56,4 % | 45,7 % | −3,6 |
| Pfeilregen von Kusch | Amanirenas | 2 | Basis | 4600 | 77,6 % | 51,2 % | +1,0 | 1874 | 44,0 % | 50,3 % | +0,9 |
| Speerträger von Napata | Amanirenas | 3 | Basis | 4600 | 83,0 % | 51,1 % | +0,8 | 1932 | 54,6 % | 50,6 % | +1,3 |
| Wächter des Löwentempels | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1858 | 54,0 % | 51,8 % | +2,5 |
| Kundschafter aus Meroë | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1918 | 56,3 % | 50,1 % | +0,8 |
| Kriegselefant von Kusch | Amanirenas | 6 | Selten | – | – | – | – | 2552 | 54,0 % | 51,4 % | +2,0 |
| Überfall auf Syene | Amanirenas | 3 | Selten | – | – | – | – | 2022 | 55,8 % | 47,0 % | −2,4 |
| Akinidad, Prinz von Kusch | Amanirenas | 5 | Episch | – | – | – | – | 2038 | 55,0 % | 45,7 % | −3,7 |
| Bronzekopf des Augustus | Amanirenas | 6 | Legendär | – | – | – | – | 2434 | 45,2 % | 50,0 % | +0,7 |
| Kopistin der Chronik | Anna | 1 | Basis | 4600 | 80,9 % | 52,7 % | +3,2 | 1326 | 53,2 % | 51,6 % | +4,0 |
| Pantokrator-Spital | Anna | 3 | Basis | 4600 | 71,3 % | 50,5 % | +1,0 | 1684 | 30,3 % | 49,5 % | +1,9 |
| Warägergardist | Anna | 3 | Basis | 4600 | 81,7 % | 53,8 % | +4,3 | 1770 | 53,6 % | 56,9 % | +9,2 |
| Hofärztin | Anna | 3 | Basis | 4600 | 79,9 % | 49,2 % | −0,3 | 1758 | 42,0 % | 44,9 % | −2,7 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1644 | 46,2 % | 58,2 % | +10,5 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1586 | 47,7 % | 56,7 % | +9,0 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1872 | 48,5 % | 56,6 % | +8,9 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1782 | 37,4 % | 47,3 % | −0,4 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1830 | 48,4 % | 49,2 % | +1,5 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 2378 | 48,5 % | 48,6 % | +0,9 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 4600 | 82,2 % | 51,1 % | +0,3 | 1298 | 54,9 % | 54,0 % | +5,1 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 4600 | 80,2 % | 51,4 % | +0,5 | 1728 | 55,0 % | 48,8 % | −0,2 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 4600 | 82,5 % | 51,2 % | +0,3 | 1768 | 57,5 % | 49,8 % | +0,8 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 4600 | 82,0 % | 49,7 % | −1,1 | 1980 | 59,1 % | 48,6 % | −0,4 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1814 | 55,2 % | 46,0 % | −3,0 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1748 | 54,3 % | 50,6 % | +1,7 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1758 | 54,7 % | 50,6 % | +1,7 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1818 | 54,5 % | 42,1 % | −6,8 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 2686 | 57,3 % | 59,4 % | +10,5 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 2116 | 46,6 % | 43,3 % | −5,6 |
| Gokenin aus Sagami | Masako | 1 | Basis | 4600 | 80,5 % | 47,8 % | −2,4 | 1114 | 57,3 % | 49,5 % | +0,5 |
| Bogenreiter aus Kamakura | Masako | 2 | Basis | 4600 | 81,7 % | 49,0 % | −1,1 | 1548 | 57,6 % | 51,1 % | +2,1 |
| Treueschwur | Masako | 1 | Basis | 4600 | 80,4 % | 51,9 % | +1,8 | 1158 | 53,5 % | 54,0 % | +4,9 |
| Nonne von Kamakura | Masako | 2 | Basis | 4600 | 81,1 % | 48,0 % | −2,1 | 1628 | 58,3 % | 51,2 % | +2,2 |
| Rokuhara-Späher | Masako | 2 | Gewöhnlich | – | – | – | – | 1570 | 56,5 % | 52,5 % | +3,4 |
| Aufgebot von Jōkyū | Masako | 4 | Gewöhnlich | – | – | – | – | 1726 | 55,6 % | 53,4 % | +4,4 |
| Tsurugaoka Hachiman-gū | Masako | 2 | Selten | – | – | – | – | 1632 | 55,6 % | 46,6 % | −2,5 |
| Verbannung nach Oki | Masako | 3 | Selten | – | – | – | – | 1790 | 50,3 % | 45,8 % | −3,2 |
| Hōjō Yoshitoki, Regent | Masako | 5 | Episch | – | – | – | – | 1968 | 54,4 % | 52,1 % | +3,0 |
| Minamoto no Yoritomo | Masako | 6 | Legendär | – | – | – | – | 2572 | 51,7 % | 50,4 % | +1,3 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1782 | 56,1 % | 52,8 % | +3,4 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1700 | 53,7 % | 44,6 % | −4,9 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1626 | 55,2 % | 47,7 % | +1,0 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1662 | 52,3 % | 51,2 % | +4,5 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1944 | 59,2 % | 48,9 % | +1,1 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1820 | 60,2 % | 44,0 % | −3,7 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1690 | 47,6 % | 48,1 % | −1,9 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 2424 | 44,3 % | 52,3 % | +2,3 |
| Jurtenlager | Khan | 3 | Gewöhnlich | – | – | – | – | 1750 | 35,9 % | 45,0 % | −5,9 |
| Kurultai | Khan | 4 | Selten | – | – | – | – | 1582 | 30,0 % | 50,0 % | −1,0 |
| Barde der Icener | Boudicca | 2 | Gewöhnlich | – | – | – | – | 1724 | 53,8 % | 54,3 % | +1,8 |
| Sichelwagen | Boudicca | 5 | Selten | – | – | – | – | 1870 | 48,6 % | 54,1 % | +1,6 |
| Almanach der Quatrains | Nostradamus | 1 | Gewöhnlich | – | – | – | – | 1324 | 57,7 % | 52,3 % | +1,9 |
| Horoskop der Königin | Nostradamus | 3 | Selten | – | – | – | – | 1940 | 2,7 % | 45,1 % | −5,3 |
| Pilgerin aus Domrémy | Jeanne | 1 | Gewöhnlich | – | – | – | – | 1306 | 53,0 % | 59,2 % | +9,8 |
| Die Weihe von Reims | Jeanne | 4 | Selten | – | – | – | – | 1644 | 32,2 % | 48,4 % | −1,0 |
| Runenmeisterin | Ragnar | 2 | Gewöhnlich | – | – | – | – | 1570 | 52,2 % | 53,1 % | +0,9 |
| Berserkergang | Ragnar | 1 | Selten | – | – | – | – | 1294 | 59,7 % | 50,4 % | −1,7 |
| Schwertschüler aus Kokura | Musashi | 4 | Selten | – | – | – | – | 1550 | 44,0 % | 47,5 % | −4,4 |
| Niten Ichi-ryū | Musashi | 2 | Gewöhnlich | – | – | – | – | 1614 | 49,1 % | 49,2 % | −2,7 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1580 | 49,9 % | 54,2 % | +6,0 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1694 | 28,5 % | 46,7 % | −1,5 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1662 | 49,3 % | 46,8 % | −2,7 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1624 | 38,4 % | 49,8 % | +0,3 |
| Pfeilmacher aus Meroë | Amanirenas | 2 | Gewöhnlich | – | – | – | – | 1862 | 56,2 % | 50,7 % | +1,4 |
| Gift der Wüstenviper | Amanirenas | 3 | Selten | – | – | – | – | 1904 | 45,5 % | 52,3 % | +2,9 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1740 | 54,0 % | 47,1 % | −0,5 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 2348 | 57,4 % | 54,2 % | +6,5 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1788 | 57,4 % | 50,1 % | +1,2 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1776 | 52,4 % | 47,3 % | −1,7 |
| Jitō-Verwalter | Masako | 2 | Gewöhnlich | – | – | – | – | 1588 | 55,7 % | 49,3 % | +0,3 |
| Siegel des Shikken | Masako | 2 | Selten | – | – | – | – | 1542 | 45,4 % | 49,6 % | +0,6 |
| Olympionike | Griechische Antike | 4 | Gewöhnlich | – | – | – | – | 6578 | 52,2 % | 55,5 % | +6,4 |
| Rhapsode | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 6566 | 51,8 % | 52,5 % | +3,4 |
| Marathonläufer | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 6544 | 51,4 % | 52,7 % | +3,7 |
| Orakel von Delphi | Griechische Antike | 3 | Selten | – | – | – | – | 6972 | 27,9 % | 47,1 % | −1,9 |
| Leuchtturm von Pharos | Griechische Antike | 3 | Selten | – | – | – | – | 7096 | 52,9 % | 42,1 % | −7,0 |
| Akropolis | Griechische Antike | 2 | Selten | – | – | – | – | 6460 | 54,5 % | 49,1 % | +0,0 |
| Bibliothek von Alexandria | Griechische Antike | 3 | Episch | – | – | – | – | 7068 | 48,1 % | 46,6 % | −2,5 |
| Knappe | Europäisches Mittelalter | 1 | Gewöhnlich | – | – | – | – | 6404 | 53,3 % | 53,1 % | +2,0 |
| Armbrustschütze | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 8988 | 58,3 % | 54,8 % | +3,7 |
| Mönch von Cluny | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 8734 | 50,1 % | 53,8 % | +2,7 |
| Hansekogge | Europäisches Mittelalter | 4 | Gewöhnlich | – | – | – | – | 8114 | 47,8 % | 50,1 % | −1,0 |
| Turnierritter | Europäisches Mittelalter | 4 | Selten | – | – | – | – | 8060 | 50,6 % | 55,4 % | +4,3 |
| Burgfried | Europäisches Mittelalter | 2 | Selten | – | – | – | – | 8452 | 57,3 % | 43,9 % | −7,2 |
| Tribok | Europäisches Mittelalter | 4 | Episch | – | – | – | – | 7982 | 31,1 % | 48,0 % | −3,1 |
| Ashigaru | China, Korea, Japan | 1 | Gewöhnlich | – | – | – | – | 3598 | 54,0 % | 53,7 % | +3,5 |
| Mandarin-Gelehrter | China, Korea, Japan | 3 | Gewöhnlich | – | – | – | – | 5422 | 51,5 % | 52,7 % | +2,5 |
| Teezeremonie | China, Korea, Japan | 2 | Gewöhnlich | – | – | – | – | 4876 | 43,1 % | 48,5 % | −1,7 |
| Hwacha-Salve | China, Korea, Japan | 3 | Selten | – | – | – | – | 5416 | 56,3 % | 51,2 % | +1,0 |
| Schildkrötenschiff | China, Korea, Japan | 5 | Selten | – | – | – | – | 5846 | 54,4 % | 49,4 % | −0,7 |
| Terrakotta-Armee | China, Korea, Japan | 5 | Episch | – | – | – | – | 5840 | 55,3 % | 50,7 % | +0,5 |
| Große Mauer | China, Korea, Japan | 2 | Episch | – | – | – | – | 4954 | 59,9 % | 44,3 % | −5,9 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 39290 | 31,7 % | 44,6 % | −5,3 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 37638 | 56,6 % | 44,9 % | −5,0 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 36962 | 26,8 % | 43,4 % | −6,5 |
| Thebanischer Plänkler | Epaminondas | 1 | Basis | 4600 | 76,5 % | 50,6 % | +0,5 | 1322 | 52,5 % | 55,2 % | +3,1 |
| Böotischer Hoplit | Epaminondas | 2 | Basis | 4600 | 76,9 % | 50,6 % | +0,5 | 1702 | 52,5 % | 56,4 % | +4,4 |
| Fünfzig Schilde tief | Epaminondas | 2 | Basis | 4600 | 73,8 % | 50,5 % | +0,4 | 1714 | 45,3 % | 51,8 % | −0,3 |
| Böotarch | Epaminondas | 3 | Basis | 4600 | 77,3 % | 50,2 % | +0,1 | 1828 | 51,9 % | 55,4 % | +3,4 |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | Gewöhnlich | – | – | – | – | 1918 | 48,2 % | 60,5 % | +8,5 |
| Schlacht bei Leuktra | Epaminondas | 4 | Gewöhnlich | – | – | – | – | 1574 | 42,6 % | 52,8 % | +0,7 |
| Befreiung Messeniens | Epaminondas | 5 | Selten | – | – | – | – | 1908 | 49,3 % | 52,9 % | +0,8 |
| Thebanischer Phalangit | Epaminondas | 4 | Selten | – | – | – | – | 1624 | 45,3 % | 58,3 % | +6,2 |
| Megalopolis | Epaminondas | 3 | Episch | – | – | – | – | 1712 | 43,6 % | 46,3 % | −5,8 |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | Legendär | – | – | – | – | 2578 | 42,5 % | 53,0 % | +1,0 |
| Veles | Fabius | 1 | Basis | 4600 | 86,9 % | 49,0 % | +0,0 | 1274 | 59,7 % | 53,7 % | +4,8 |
| Triarier | Fabius | 2 | Basis | 4600 | 85,5 % | 49,2 % | +0,2 | 1634 | 56,6 % | 51,4 % | +2,4 |
| Hinhalten | Fabius | 2 | Basis | 4600 | 84,2 % | 49,1 % | +0,1 | 1650 | 58,9 % | 48,0 % | −1,0 |
| Konsul der Republik | Fabius | 4 | Basis | 4600 | 82,9 % | 49,3 % | +0,3 | 1672 | 49,4 % | 47,9 % | −1,0 |
| Verbrannte Erde | Fabius | 3 | Gewöhnlich | – | – | – | – | 1834 | 62,1 % | 46,1 % | −2,9 |
| Späher am Volturnus | Fabius | 2 | Gewöhnlich | – | – | – | – | 1718 | 57,7 % | 49,1 % | +0,2 |
| Minucius, der Reiteroberst | Fabius | 4 | Selten | – | – | – | – | 1740 | 50,1 % | 52,3 % | +3,4 |
| Rückeroberung von Tarent | Fabius | 6 | Selten | – | – | – | – | 2468 | 43,8 % | 55,4 % | +6,5 |
| Lager auf den Höhen | Fabius | 3 | Episch | – | – | – | – | 1758 | 63,5 % | 48,0 % | −0,9 |
| Marcellus, Schwert Roms | Fabius | 6 | Legendär | – | – | – | – | 2470 | 47,0 % | 46,6 % | −2,4 |
| Botin der Stämme | Mandukhai | 1 | Basis | 4600 | 76,8 % | 52,8 % | +3,2 | 1256 | 49,9 % | 60,6 % | +7,9 |
| Hüterin des Herdfeuers | Mandukhai | 2 | Basis | 4600 | 77,8 % | 49,8 % | +0,3 | 1686 | 49,2 % | 51,0 % | −1,8 |
| Ruf der Tumen | Mandukhai | 3 | Basis | 4600 | 71,2 % | 48,5 % | −1,0 | 1718 | 40,6 % | 50,7 % | −2,0 |
| Bogenreiterin der Chahar | Mandukhai | 3 | Basis | 4600 | 79,2 % | 51,6 % | +2,1 | 1752 | 53,2 % | 52,6 % | −0,1 |
| Schlacht von Tas Bürd | Mandukhai | 4 | Gewöhnlich | – | – | – | – | 1710 | 46,4 % | 53,5 % | +0,8 |
| Zwilling der Khatun | Mandukhai | 3 | Gewöhnlich | – | – | – | – | 1830 | 51,9 % | 55,0 % | +2,2 |
| Schwarzes Banner | Mandukhai | 2 | Selten | – | – | – | – | 1708 | 58,7 % | 47,6 % | −5,2 |
| Unterwerfung der Oiraten | Mandukhai | 5 | Selten | – | – | – | – | 2132 | 45,5 % | 57,0 % | +4,2 |
| Batu Möngke, der junge Khan | Mandukhai | 4 | Episch | – | – | – | – | 1564 | 43,3 % | 52,1 % | −0,7 |
| Wiedervereinigung der Mongolen | Mandukhai | 8 | Legendär | – | – | – | – | 1632 | 41,5 % | 54,2 % | +1,4 |
| Mamlukenrekrut | Baibars | 1 | Basis | 4600 | 81,5 % | 50,5 % | −0,9 | 1268 | 50,4 % | 50,6 % | −0,7 |
| Barid-Kurier | Baibars | 2 | Basis | 4600 | 77,2 % | 52,6 % | +1,2 | 1644 | 47,0 % | 50,9 % | −0,4 |
| Ain Dschalut | Baibars | 3 | Basis | 4600 | 83,4 % | 52,7 % | +1,3 | 1822 | 58,1 % | 56,4 % | +5,1 |
| Bogenreiter der Bahriya | Baibars | 3 | Basis | 4600 | 81,2 % | 50,8 % | −0,6 | 1714 | 48,5 % | 49,6 % | −1,7 |
| Manjaniq-Meister | Baibars | 4 | Gewöhnlich | – | – | – | – | 1622 | 49,6 % | 55,0 % | +3,7 |
| Vorgetäuschte Flucht | Baibars | 1 | Gewöhnlich | – | – | – | – | 1200 | 17,4 % | 41,6 % | −9,7 |
| Qutuz, Sultan von Ägypten | Baibars | 5 | Selten | – | – | – | – | 2052 | 43,7 % | 57,1 % | +5,8 |
| Sturm auf Antiochia | Baibars | 2 | Selten | – | – | – | – | 1660 | 46,6 % | 49,3 % | −2,0 |
| Zitadelle von Kairo | Baibars | 4 | Episch | – | – | – | – | 1744 | 33,4 % | 50,2 % | −1,1 |
| Qalawun, Emir der Bahriya | Baibars | 6 | Legendär | – | – | – | – | 2720 | 45,5 % | 56,5 % | +5,2 |
| Dreschflegelbauer | Žižka | 1 | Basis | 4600 | 81,5 % | 53,3 % | +1,8 | 1338 | 55,4 % | 62,8 % | +11,4 |
| Píšťala-Schütze | Žižka | 2 | Basis | 4600 | 82,3 % | 51,7 % | +0,3 | 1690 | 61,5 % | 55,1 % | +3,7 |
| Salve aus der Wagenburg | Žižka | 2 | Basis | 4600 | 74,8 % | 49,3 % | −2,1 | 1748 | 32,2 % | 45,9 % | −5,5 |
| Hauptmann der Taboriten | Žižka | 3 | Basis | 4600 | 81,3 % | 50,9 % | −0,6 | 1914 | 58,2 % | 53,8 % | +2,4 |
| Hakenbüchsenwagen | Žižka | 3 | Gewöhnlich | – | – | – | – | 1782 | 58,1 % | 50,5 % | −0,9 |
| Laienkelch | Žižka | 2 | Gewöhnlich | – | – | – | – | 1662 | 43,9 % | 53,3 % | +1,9 |
| Prager Fenstersturz | Žižka | 3 | Selten | – | – | – | – | 1814 | 51,3 % | 52,0 % | +0,6 |
| Wagenburg am Vítkov | Žižka | 4 | Selten | – | – | – | – | 1658 | 56,3 % | 39,4 % | −12,0 |
| Prokop der Kahle | Žižka | 6 | Episch | – | – | – | – | 2566 | 56,7 % | 49,5 % | −1,9 |
| Jan Hus, Prediger von Bethlehem | Žižka | 5 | Legendär | – | – | – | – | 1984 | 44,0 % | 52,2 % | +0,8 |
| Bogenschützin der Shang | Fu Hao | 1 | Basis | 4600 | 81,9 % | 52,1 % | +2,7 | 1290 | 57,7 % | 51,5 % | +1,7 |
| Bronzene Yue-Axt | Fu Hao | 2 | Basis | 4600 | 74,2 % | 52,0 % | +2,7 | 1756 | 42,8 % | 51,1 % | +1,3 |
| Streitwagen der Shang | Fu Hao | 3 | Basis | 4600 | 82,0 % | 50,4 % | +1,1 | 1784 | 51,4 % | 51,3 % | +1,5 |
| Knochenwahrsager | Fu Hao | 3 | Basis | 4600 | 80,5 % | 50,7 % | +1,3 | 1864 | 43,9 % | 49,3 % | −0,5 |
| Aufgebot gegen die Qiang | Fu Hao | 4 | Gewöhnlich | – | – | – | – | 1758 | 49,6 % | 53,9 % | +4,1 |
| Ahnenopfer | Fu Hao | 1 | Gewöhnlich | – | – | – | – | 1190 | 51,8 % | 56,3 % | +6,5 |
| Gravierte Schulterblätter | Fu Hao | 1 | Selten | – | – | – | – | 1234 | 58,7 % | 53,5 % | +3,7 |
| Bogenschützinnen der Fu Hao | Fu Hao | 4 | Selten | – | – | – | – | 1628 | 55,8 % | 53,8 % | +4,0 |
| Ahnentempel von Yin | Fu Hao | 1 | Episch | – | – | – | – | 1202 | 59,6 % | 54,1 % | +4,3 |
| Wu Ding, König der Shang | Fu Hao | 6 | Legendär | – | – | – | – | 2552 | 49,4 % | 54,6 % | +4,8 |
| Gladiator | Rom | 3 | Gewöhnlich | – | – | – | – | 3376 | 58,9 % | 50,3 % | +1,1 |
| Senator der Kurie | Rom | 3 | Gewöhnlich | – | – | – | – | 3506 | 48,4 % | 50,3 % | +1,1 |
| Centurio | Rom | 2 | Gewöhnlich | – | – | – | – | 3488 | 55,6 % | 55,0 % | +5,8 |
| Triumphzug | Rom | 3 | Selten | – | – | – | – | 3468 | 41,7 % | 47,6 % | −1,6 |
| Via Appia | Rom | 2 | Selten | – | – | – | – | 3442 | 54,5 % | 49,7 % | +0,5 |
| Vestalin am ewigen Feuer | Rom | 3 | Selten | – | – | – | – | 3464 | 56,3 % | 48,5 % | −0,7 |
| Pax Romana | Rom | 5 | Episch | – | – | – | – | 3948 | 53,7 % | 44,3 % | −4,9 |
| Pferdehirtin | Persien & Steppe | 2 | Gewöhnlich | – | – | – | – | 3256 | 47,4 % | 54,4 % | +2,5 |
| Schamane des Ewigen Himmels | Persien & Steppe | 3 | Gewöhnlich | – | – | – | – | 3436 | 47,5 % | 54,0 % | +2,1 |
| Parthischer Schuss | Persien & Steppe | 2 | Gewöhnlich | – | – | – | – | 3364 | 53,8 % | 53,8 % | +1,9 |
| Garde der Unsterblichen | Persien & Steppe | 4 | Selten | – | – | – | – | 3326 | 42,3 % | 49,9 % | −2,1 |
| Pfeilsturm der Steppe | Persien & Steppe | 3 | Selten | – | – | – | – | 3440 | 47,6 % | 52,7 % | +0,8 |
| Königsstraße | Persien & Steppe | 2 | Selten | – | – | – | – | 3492 | 50,2 % | 48,9 % | −3,0 |
| Persepolis | Persien & Steppe | 3 | Episch | – | – | – | – | 3580 | 43,7 % | 53,2 % | +1,3 |
| Akrit der Grenzmark | Byzanz & islamische Welt | 2 | Gewöhnlich | – | – | – | – | 3370 | 53,7 % | 52,7 % | +3,2 |
| Gelehrter im Haus der Weisheit | Byzanz & islamische Welt | 3 | Gewöhnlich | – | – | – | – | 3492 | 50,3 % | 52,2 % | +2,7 |
| Tribut in Goldbyzantinern | Byzanz & islamische Welt | 2 | Gewöhnlich | – | – | – | – | 3408 | 26,3 % | 48,4 % | −1,0 |
| Arzt des Bimaristan | Byzanz & islamische Welt | 3 | Selten | – | – | – | – | 3564 | 57,8 % | 55,7 % | +6,2 |
| Theodosianische Mauern | Byzanz & islamische Welt | 2 | Selten | – | – | – | – | 3362 | 55,8 % | 46,8 % | −2,6 |
| Hagia Sophia | Byzanz & islamische Welt | 3 | Episch | – | – | – | – | 3430 | 59,8 % | 46,6 % | −2,9 |
| Ibn an-Nafis, Arzt von Kairo | Byzanz & islamische Welt | 4 | Episch | – | – | – | – | 3184 | 52,6 % | 55,2 % | +5,7 |
