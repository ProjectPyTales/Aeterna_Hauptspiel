# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `30f08a30ae` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die 21 anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,5.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 50600 | ✗ 20/22 | ✗ 199/231 | ✓ 46,2 % | – | 0 | 23 |
| Zufallsdecks | 50600 | ✗ 19/22 | ✗ 223/231 | ✓ 50,8 % | ✓ 52,8 % (+2,9) | 0 | 20 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Jan Žižka | **57,7 %** | 51,0 % | 63,0 % | Nezahualcóyotl 41,0 % | Khan 72,5 % | Defensiv: 44,4 % | ✗ |
| Miyamoto Musashi | **53,0 %** | 48,0 % | 57,4 % | Žižka 41,0 % | Epaminondas 62,5 % | Aggressiv: 48,8 % | ✓ |
| Mandukhai Khatun | **52,7 %** | 46,8 % | 58,2 % | Khan 38,0 % | Fabius 65,0 % | Kombinierend: 45,9 % | ✓ |
| Hypatia | **51,5 %** | 46,3 % | 56,4 % | Anna 43,5 % | Masako 61,5 % | Kombinierend: 45,0 % | ✓ |
| Dschingis Khan | **51,1 %** | 45,9 % | 56,2 % | Žižka 27,5 % | Fu Hao 69,0 % | Aggressiv: 44,9 % | ✓ |
| Leonidas I. | **50,9 %** | 50,4 % | 51,3 % | Epaminondas 40,5 % | Fabius 65,5 % | Defensiv: 36,6 % | ✓ |
| Baibars | **50,9 %** | 48,4 % | 53,2 % | Žižka 37,0 % | Ragnar 61,5 % | Aggressiv: 40,3 % | ✓ |
| Nezahualcóyotl | **50,6 %** | 46,7 % | 54,4 % | Baibars 39,0 % | Žižka 59,0 % | Defensiv: 38,5 % | ✓ |
| Nostradamus | **50,0 %** | 48,8 % | 51,2 % | Khan 35,5 % | Fabius 63,0 % | Kombinierend: 41,3 % | ✓ |
| Hōjō Masako | **49,9 %** | 44,1 % | 55,7 % | Žižka 34,0 % | Khan 60,5 % | Defensiv: 40,2 % | ✓ |
| Epaminondas | **49,7 %** | 44,3 % | 55,1 % | Fabius 36,5 % | Imhotep 61,0 % | Aggressiv: 42,4 % | ✓ |
| Amanirenas | **49,7 %** | 46,7 % | 52,7 % | Leonidas 36,5 % | Baibars 59,0 % | Aggressiv: 44,6 % | ✓ |
| Jeanne d’Arc | **49,3 %** | 43,5 % | 55,2 % | Žižka 29,5 % | Fu Hao 60,5 % | Aggressiv: 51,2 % | ✓ |
| Ragnar Lodbrok | **49,2 %** | 45,9 % | 52,7 % | Žižka 37,0 % | Fu Hao 58,5 % | Aggressiv: 41,3 % | ✓ |
| Anna Komnene | **48,9 %** | 49,4 % | 48,6 % | Nezahualcóyotl 41,5 % | Fabius 64,5 % | Kombinierend: 39,0 % | ✓ |
| Enrico Dandolo | **48,7 %** | 46,1 % | 51,5 % | Musashi 38,0 % | Fabius 55,5 % | Kombinierend: 41,7 % | ✓ |
| Fu Hao | **48,5 %** | 47,7 % | 49,6 % | Khan 31,0 % | Imhotep 66,5 % | Kombinierend: 40,3 % | ✓ |
| Fabius Maximus | **48,4 %** | 45,3 % | 51,7 % | Leonidas 34,5 % | Epaminondas 63,5 % | Defensiv: 40,3 % | ✓ |
| Imhotep | **47,9 %** | 45,6 % | 50,5 % | Fu Hao 33,5 % | Boudicca 60,0 % | Defensiv: 36,1 % | ✓ |
| Marcus Agrippa | **47,7 %** | 42,3 % | 53,5 % | Khan 35,5 % | Boudicca 57,5 % | Kombinierend: 43,9 % | ✓ |
| Perikles | **47,6 %** | 42,7 % | 52,8 % | Žižka 33,5 % | Agrippa 55,5 % | Defensiv: 39,7 % | ✓ |
| Boudicca | **46,2 %** | 39,8 % | 53,3 % | Žižka 32,0 % | Jeanne 55,0 % | Aggressiv: 42,2 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. | Epam. | Fabi. | Mand. | Baib. | Žižk. | Fu H. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 51 | 50 | 47 | 47 | 56 | 55 | 51 | 52 | 46 | 50 | 54 | **64** | 51 | 52 | 48 | 41 | **66** | 53 | 44 | 50 | 47 |
| Hypatia | 49 | · | 47 | 50 | 59 | 54 | 51 | 60 | 51 | 45 | 57 | 47 | 54 | 44 | 50 | **62** | 56 | 47 | 49 | 52 | 52 | 51 |
| Imhotep | 50 | 53 | · | 45 | 49 | 60 | 44 | 50 | 48 | 45 | 53 | 44 | 54 | 45 | 51 | 47 | **39** | 53 | 48 | 49 | 50 | **34** |
| Dandolo | 53 | 50 | 55 | · | 43 | 47 | 47 | 47 | 48 | **38** | 55 | 54 | 49 | 50 | 45 | 52 | 46 | 56 | 49 | 50 | 45 | 46 |
| Khan | 53 | 42 | 52 | 57 | · | 47 | **65** | 46 | 55 | 47 | 50 | **65** | 47 | 57 | 50 | **40** | 54 | 44 | **62** | 48 | **28** | **69** |
| Boudicca | 44 | 47 | 40 | 53 | 53 | · | 45 | 55 | 49 | 55 | 46 | 43 | 43 | 50 | 45 | 48 | 47 | **37** | 45 | 45 | **32** | 53 |
| Nostradamus | 45 | 50 | 56 | 53 | **36** | 55 | · | 53 | 47 | 44 | 54 | 53 | 52 | 49 | 55 | 50 | 41 | **63** | 42 | 48 | 52 | 54 |
| Jeanne | 49 | 41 | 51 | 53 | 54 | 45 | 47 | · | 60 | 59 | 56 | 51 | 44 | 53 | 49 | 43 | 54 | 47 | 40 | 53 | **30** | **61** |
| Ragnar | 49 | 50 | 52 | 52 | 45 | 51 | 53 | 40 | · | 43 | 50 | 52 | 49 | 56 | 54 | 51 | 50 | 57 | 48 | **39** | **37** | 59 |
| Musashi | 54 | 55 | 55 | **62** | 53 | 45 | 56 | 42 | 57 | · | 57 | 57 | 45 | 55 | 45 | 51 | **63** | 52 | 54 | 57 | 41 | 56 |
| Perikles | 51 | 43 | 48 | 45 | 50 | 54 | 46 | 44 | 51 | 43 | · | 56 | 51 | 52 | 50 | 46 | 46 | 50 | 43 | 47 | **34** | 52 |
| Agrippa | 46 | 53 | 56 | 46 | **36** | 57 | 48 | 49 | 48 | 43 | 44 | · | 52 | 49 | 46 | 49 | 47 | 51 | **37** | 51 | 48 | 49 |
| Amanirenas | **37** | 46 | 46 | 51 | 53 | 57 | 49 | 56 | 52 | 55 | 49 | 49 | · | 44 | 44 | 50 | 56 | 54 | 42 | 59 | 44 | 53 |
| Anna | 49 | 56 | 55 | 51 | 43 | 50 | 51 | 47 | 44 | 45 | 49 | 51 | 56 | · | 42 | 51 | 50 | **65** | 42 | 47 | 42 | 45 |
| Nezahualcóyotl | 49 | 51 | 49 | 55 | 50 | 55 | 45 | 52 | 47 | 55 | 51 | 54 | 56 | 59 | · | 45 | 47 | 52 | 50 | **39** | 59 | 45 |
| Masako | 53 | **39** | 53 | 48 | **61** | 52 | 51 | 57 | 49 | 49 | 54 | 52 | 51 | 50 | 55 | · | 48 | 41 | 58 | 44 | **34** | 53 |
| Epaminondas | 60 | 44 | **61** | 54 | 46 | 53 | 59 | 47 | 51 | **38** | 54 | 53 | 44 | 50 | 53 | 53 | · | **37** | 53 | **40** | **39** | 59 |
| Fabius | **35** | 53 | 48 | 44 | 56 | **63** | **37** | 53 | 43 | 48 | 50 | 50 | 47 | **36** | 49 | 60 | **64** | · | **35** | **62** | 50 | **37** |
| Mandukhai | 48 | 52 | 53 | 51 | **38** | 55 | 59 | 60 | 53 | 47 | 57 | **64** | 59 | 59 | 51 | 42 | 48 | **65** | · | 50 | 49 | 52 |
| Baibars | 56 | 49 | 52 | 50 | 52 | 55 | 52 | 48 | **62** | 43 | 53 | 50 | 41 | 53 | **61** | 56 | **61** | **39** | 50 | · | **37** | 51 |
| Žižka | 50 | 48 | 51 | 55 | **73** | **68** | 49 | **71** | **63** | 59 | **67** | 53 | 56 | 58 | 41 | **66** | **62** | 51 | 51 | **63** | · | 60 |
| Fu Hao | 53 | 50 | **67** | 54 | **31** | 48 | 46 | **40** | 42 | 44 | 48 | 52 | 47 | 55 | 55 | 47 | 42 | **64** | 48 | 50 | 40 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 44,5 % aufs Gesicht, 1,0 % auf Bauwerke · **Defensiv** (7 Helden) 39,4 % aufs Gesicht, 1,0 % auf Bauwerke · **Kombinierend** (7 Helden) 42,4 % aufs Gesicht, 1,1 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 24,3, Median 23, 10–90 %: 17–33, kürzeste 9, längste 63. Beginner gewinnt 46,2 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Belagerungsturm | neutral | 6 | 55,3 % | +5,3 | 75,4 % |
| Goldener Reiter | Khan | 4 | 55,9 % | +4,8 | 69,5 % |
| Warägergardist | Anna | 3 | 53,3 % | +4,3 | 81,5 % |
| Pilumwerfer | Agrippa | 1 | 52,0 % | +4,1 | 76,4 % |
| Rede auf die Gefallenen | Perikles | 3 | 51,3 % | +3,5 | 79,2 % |
| Handelsgesandter | Dandolo | 4 | 52,3 % | +3,5 | 77,3 % |
| Kopistin der Chronik | Anna | 1 | 52,3 % | +3,3 | 80,7 % |
| Sternenregen | Hypatia | 4 | 54,5 % | +3,2 | 78,0 % |
| Fjordspäher | Ragnar | 1 | 47,6 % | −1,7 | 77,2 % |
| Bibliothekslehrling | Hypatia | 1 | 49,6 % | −1,7 | 83,0 % |
| Pfeilschuss | Khan | 2 | 49,2 % | −1,9 | 74,9 % |
| Eichenhaut | Boudicca | 2 | 44,6 % | −1,9 | 72,5 % |
| Nonne von Kamakura | Masako | 2 | 47,9 % | −2,0 | 81,2 % |
| Gokenin aus Sagami | Masako | 1 | 47,6 % | −2,3 | 80,8 % |
| Salve aus der Wagenburg | Žižka | 2 | 54,5 % | −2,5 | 74,6 % |
| Lange Mauern | Perikles | 2 | 43,7 % | −4,1 | 77,8 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Mandukhai Khatun | **53,8 %** | 52,8 % | 54,1 % | Musashi 46,0 % | Agrippa 62,0 % | Kombinierend: 47,6 % | ✗ |
| Baibars | **53,1 %** | 53,4 % | 52,2 % | Žižka 43,5 % | Masako 61,5 % | Aggressiv: 43,3 % | ✗ |
| Jan Žižka | **52,6 %** | 53,0 % | 51,8 % | Fu Hao 46,0 % | Hypatia 66,0 % | Defensiv: 43,6 % | ✓ |
| Boudicca | **52,5 %** | 53,0 % | 51,6 % | Baibars 45,5 % | Anna 61,0 % | Aggressiv: 49,4 % | ✓ |
| Ragnar Lodbrok | **52,5 %** | 53,2 % | 51,3 % | Jeanne 46,0 % | Anna 60,5 % | Aggressiv: 47,7 % | ✓ |
| Miyamoto Musashi | **52,0 %** | 51,3 % | 52,2 % | Ragnar 46,0 % | Hypatia 57,0 % | Aggressiv: 53,8 % | ✓ |
| Epaminondas | **51,9 %** | 51,1 % | 52,3 % | Žižka 46,0 % | Imhotep 58,5 % | Aggressiv: 47,4 % | ✓ |
| Dschingis Khan | **50,7 %** | 48,9 % | 52,3 % | Imhotep 42,0 % | Nostradamus 60,0 % | Aggressiv: 51,1 % | ✓ |
| Nostradamus | **50,2 %** | 51,4 % | 49,0 % | Khan 40,0 % | Jeanne 59,0 % | Kombinierend: 44,6 % | ✓ |
| Enrico Dandolo | **49,9 %** | 51,2 % | 48,6 % | Boudicca 40,0 % | Imhotep 58,5 % | Kombinierend: 44,4 % | ✓ |
| Fu Hao | **49,6 %** | 53,1 % | 46,1 % | Musashi 43,0 % | Anna 58,5 % | Kombinierend: 43,9 % | ✓ |
| Amanirenas | **49,1 %** | 49,9 % | 48,6 % | Mandukhai 44,0 % | Jeanne 56,0 % | Aggressiv: 48,4 % | ✓ |
| Jeanne d’Arc | **49,1 %** | 51,2 % | 47,1 % | Nostradamus 41,0 % | Hypatia 55,5 % | Aggressiv: 50,2 % | ✓ |
| Leonidas I. | **49,0 %** | 49,9 % | 48,3 % | Mandukhai 40,0 % | Nostradamus 55,5 % | Defensiv: 38,7 % | ✓ |
| Marcus Agrippa | **49,0 %** | 48,9 % | 49,2 % | Mandukhai 38,0 % | Jeanne 56,5 % | Kombinierend: 46,3 % | ✓ |
| Nezahualcóyotl | **48,9 %** | 50,3 % | 47,8 % | Imhotep 39,0 % | Amanirenas 53,5 % | Defensiv: 39,6 % | ✓ |
| Fabius Maximus | **48,9 %** | 50,7 % | 47,2 % | Baibars 41,5 % | Perikles 65,0 % | Defensiv: 41,5 % | ✓ |
| Hōjō Masako | **48,7 %** | 48,7 % | 48,9 % | Baibars 38,5 % | Perikles 55,5 % | Defensiv: 39,3 % | ✓ |
| Perikles | **47,7 %** | 49,1 % | 46,6 % | Fabius 35,0 % | Imhotep 55,5 % | Defensiv: 41,2 % | ✓ |
| Imhotep | **47,4 %** | 47,7 % | 47,5 % | Ragnar 40,0 % | Nezahualcóyotl 61,0 % | Defensiv: 38,1 % | ✓ |
| Anna Komnene | **47,1 %** | 49,0 % | 45,7 % | Boudicca 39,0 % | Fabius 58,5 % | Kombinierend: 41,9 % | ✓ |
| Hypatia | **46,5 %** | 49,0 % | 44,7 % | Žižka 34,0 % | Fabius 54,5 % | Kombinierend: 43,5 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. | Epam. | Fabi. | Mand. | Baib. | Žižk. | Fu H. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 49 | 55 | 51 | 47 | 51 | 56 | 48 | 48 | 48 | 48 | 55 | 49 | 49 | 49 | 49 | 47 | 49 | 40 | 50 | 46 | 50 |
| Hypatia | 51 | · | 51 | 52 | 41 | 45 | 43 | 45 | 48 | 43 | 45 | 50 | 48 | 47 | 49 | 47 | 45 | 55 | 48 | 45 | **34** | 50 |
| Imhotep | 45 | 49 | · | 42 | 58 | 47 | 45 | 46 | 40 | 46 | 45 | 47 | 49 | 49 | **61** | 52 | 42 | 47 | 44 | 43 | 44 | 56 |
| Dandolo | 49 | 49 | 59 | · | 47 | 40 | 56 | 51 | 48 | 45 | 55 | 55 | 53 | 51 | 52 | 52 | 45 | 56 | 50 | 46 | 48 | 45 |
| Khan | 53 | 60 | 42 | 53 | · | 44 | 60 | 48 | 45 | 51 | 53 | 49 | 52 | 60 | 50 | 49 | 50 | 53 | 47 | 45 | 49 | 54 |
| Boudicca | 50 | 55 | 53 | 60 | 56 | · | 50 | 51 | 47 | 50 | 56 | 56 | 55 | **61** | 52 | 50 | 54 | 51 | 52 | 46 | 47 | 53 |
| Nostradamus | 44 | 57 | 55 | 44 | 40 | 51 | · | 59 | 49 | 47 | 51 | 55 | 51 | 52 | 49 | 50 | 52 | 56 | 48 | 45 | 51 | 53 |
| Jeanne | 53 | 55 | 54 | 49 | 52 | 49 | 41 | · | 54 | 44 | 49 | 44 | 44 | 55 | 52 | 54 | 47 | 49 | 47 | 48 | 44 | 51 |
| Ragnar | 53 | 52 | 60 | 53 | 55 | 53 | 51 | 46 | · | 54 | 54 | 50 | 48 | **61** | 51 | 55 | 47 | 55 | 53 | 56 | 46 | 53 |
| Musashi | 53 | 57 | 54 | 55 | 50 | 50 | 53 | 56 | 46 | · | 51 | 49 | 51 | 56 | 48 | 51 | 54 | 53 | 54 | 47 | 50 | 57 |
| Perikles | 53 | 55 | 55 | 45 | 48 | 44 | 49 | 52 | 47 | 50 | · | 48 | 50 | 49 | 51 | 45 | 49 | **35** | **39** | 46 | 48 | 47 |
| Agrippa | 45 | 50 | 53 | 45 | 51 | 44 | 45 | 56 | 51 | 52 | 52 | · | 50 | 50 | 48 | 56 | 46 | 53 | **38** | 41 | 51 | 53 |
| Amanirenas | 51 | 52 | 51 | 48 | 49 | 45 | 49 | 56 | 52 | 49 | 51 | 51 | · | 54 | 47 | 46 | 47 | 49 | 44 | 51 | 48 | 46 |
| Anna | 51 | 53 | 51 | 50 | 40 | **39** | 49 | 45 | **40** | 44 | 52 | 50 | 47 | · | 52 | 52 | 42 | 59 | 43 | 44 | 48 | 42 |
| Nezahualcóyotl | 51 | 52 | **39** | 48 | 51 | 49 | 52 | 49 | 50 | 52 | 50 | 52 | 53 | 48 | · | 46 | 51 | 47 | 48 | 48 | 48 | 48 |
| Masako | 52 | 53 | 48 | 48 | 51 | 50 | 50 | 46 | 45 | 50 | 55 | 44 | 54 | 48 | 54 | · | 46 | 45 | 45 | **39** | 47 | 55 |
| Epaminondas | 53 | 55 | 59 | 55 | 51 | 47 | 49 | 53 | 53 | 47 | 51 | 54 | 53 | 59 | 49 | 54 | · | 51 | 49 | 51 | 46 | 52 |
| Fabius | 52 | 45 | 53 | 44 | 47 | 50 | 44 | 51 | 45 | 48 | **65** | 47 | 52 | 42 | 53 | 55 | 49 | · | 45 | 42 | 52 | 46 |
| Mandukhai | 60 | 53 | 56 | 51 | 53 | 49 | 53 | 53 | 48 | 46 | **61** | **62** | 56 | 57 | 52 | 55 | 52 | 55 | · | 50 | 52 | 57 |
| Baibars | 50 | 55 | 57 | 54 | 55 | 54 | 55 | 53 | 44 | 53 | 54 | 59 | 49 | 56 | 52 | **62** | 50 | 59 | 50 | · | 44 | 50 |
| Žižka | 54 | **66** | 56 | 52 | 51 | 53 | 49 | 56 | 54 | 51 | 52 | 50 | 52 | 52 | 52 | 53 | 54 | 48 | 48 | 56 | · | 46 |
| Fu Hao | 51 | 50 | 44 | 55 | 46 | 47 | 48 | 50 | 48 | 43 | 53 | 48 | 54 | 59 | 53 | 45 | 48 | 54 | 43 | 50 | 54 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 48,9 % aufs Gesicht, 7,6 % auf Bauwerke · **Defensiv** (7 Helden) 40,3 % aufs Gesicht, 9,7 % auf Bauwerke · **Kombinierend** (7 Helden) 44,6 % aufs Gesicht, 8,9 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 21,7, Median 20, 10–90 %: 15–30, kürzeste 8, längste 66. Beginner gewinnt 50,8 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Dreschflegelbauer | Žižka | 1 | 63,1 % | +10,7 | 55,1 % |
| Phalanxveteran | Leonidas | 5 | 59,8 % | +10,7 | 57,5 % |
| Griechisches Feuer | Anna | 4 | 57,9 % | +10,5 | 46,2 % |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 59,5 % | +10,5 | 57,4 % |
| Goldener Reiter | Khan | 4 | 60,4 % | +9,8 | 46,8 % |
| Pilgerin aus Domrémy | Jeanne | 1 | 58,6 % | +9,5 | 52,8 % |
| Astrolabienwächter | Hypatia | 3 | 56,3 % | +9,4 | 57,0 % |
| Warägergardist | Anna | 3 | 56,7 % | +9,3 | 53,4 % |
| Jurtenlager | Khan | 3 | 44,7 % | −5,9 | 35,8 % |
| Megalopolis | Epaminondas | 3 | 45,8 % | −6,0 | 43,5 % |
| Pyramiden von Gizeh | neutral | 4 | 43,5 % | −6,4 | 26,9 % |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | 42,2 % | −6,8 | 54,5 % |
| Leuchtturm von Pharos | Griechische Antike | 3 | 41,9 % | −6,9 | 52,8 % |
| Burgfried | Europäisches Mittelalter | 2 | 43,8 % | −7,4 | 57,3 % |
| Vorgetäuschte Flucht | Baibars | 1 | 43,1 % | −9,7 | 19,1 % |
| Wagenburg am Vítkov | Žižka | 4 | 40,4 % | −12,0 | 56,0 % |

**Legendäre** (AP 5.3) – als Gruppe 52,8 % „gewinnt, wenn gezogen“ (+2,9 gegenüber ihrem Helden, 61812 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Qalawun, Emir der Bahriya | Baibars | 6 | 58,8 % | +6,0 | 46,5 % |
| Lagertha, Schildmaid | Ragnar | 7 | 58,0 % | +5,7 | 45,1 % |
| Subutai, der Stratege | Khan | 6 | 56,2 % | +5,6 | 44,0 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 55,5 % | +5,6 | 43,4 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 55,2 % | +6,1 | 49,5 % |
| Wiedervereinigung der Mongolen | Mandukhai | 8 | 55,1 % | +1,6 | 40,1 % |
| Wu Ding, König der Shang | Fu Hao | 6 | 54,2 % | +4,6 | 49,3 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 53,1 % | +3,2 | 44,4 % |
| Djoser, der Erbauer | Imhotep | 6 | 53,1 % | +5,5 | 50,8 % |
| Jan Hus, Prediger von Bethlehem | Žižka | 5 | 52,6 % | +0,2 | 43,6 % |
| Andraste, Göttin des Sieges | Boudicca | 8 | 52,6 % | +0,3 | 45,9 % |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | 52,3 % | +0,6 | 42,7 % |
| Sasaki Kojirō, der Rivale | Musashi | 6 | 52,1 % | +0,3 | 44,9 % |
| Herodot, Vater der Geschichte | neutral | 4 | 51,7 % | +1,8 | 42,7 % |
| Caterina de’ Medici | Nostradamus | 5 | 51,3 % | +1,1 | 53,2 % |
| Theon von Alexandria | Hypatia | 5 | 50,9 % | +4,0 | 49,5 % |
| Minamoto no Yoritomo | Masako | 6 | 50,2 % | +1,4 | 51,4 % |
| La Hire, der Unbeugsame | Jeanne | 7 | 50,1 % | +0,9 | 42,3 % |
| Bronzekopf des Augustus | Amanirenas | 6 | 49,6 % | +0,4 | 45,1 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 48,9 % | +1,0 | 51,8 % |
| Alexios I. Komnenos | Anna | 6 | 48,4 % | +1,0 | 48,4 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 46,8 % | −2,2 | 39,4 % |
| Marcellus, Schwert Roms | Fabius | 6 | 46,6 % | −2,3 | 47,1 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 43,9 % | −5,1 | 46,7 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 4600 | 80,4 % | 51,7 % | +0,9 | 1220 | 53,7 % | 50,7 % | +1,6 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 4600 | 81,4 % | 51,4 % | +0,6 | 1676 | 58,3 % | 52,7 % | +3,6 |
| Bronzener Wall | Leonidas | 2 | Basis | 4600 | 81,2 % | 52,5 % | +1,7 | 1624 | 52,3 % | 47,8 % | −1,3 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 4600 | 76,1 % | 52,7 % | +1,9 | 1640 | 48,5 % | 48,3 % | −0,8 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1728 | 56,5 % | 52,3 % | +3,3 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1746 | 55,1 % | 49,4 % | +0,3 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1922 | 57,5 % | 59,8 % | +10,7 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1582 | 46,1 % | 51,4 % | +2,3 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 2450 | 53,3 % | 45,0 % | −4,1 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 2056 | 49,5 % | 55,2 % | +6,1 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 4600 | 83,0 % | 49,6 % | −1,7 | 1148 | 55,4 % | 47,0 % | +0,2 |
| Himmelsstrahl | Hypatia | 2 | Basis | 4600 | 86,0 % | 51,1 % | −0,2 | 1658 | 57,3 % | 49,8 % | +3,0 |
| Sternenkundiger | Hypatia | 3 | Basis | 4600 | 81,2 % | 52,8 % | +1,4 | 1938 | 49,1 % | 49,7 % | +2,9 |
| Sternenregen | Hypatia | 4 | Basis | 4600 | 78,0 % | 54,5 % | +3,2 | 1552 | 45,1 % | 51,0 % | +4,2 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1766 | 57,0 % | 56,3 % | +9,4 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1654 | 41,6 % | 46,7 % | −0,1 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1862 | 48,1 % | 51,3 % | +4,5 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 2534 | 55,9 % | 47,7 % | +0,8 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 1900 | 53,9 % | 44,2 % | −2,6 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1982 | 49,5 % | 50,9 % | +4,0 |
| Nilschülerin | Imhotep | 1 | Basis | 4600 | 82,6 % | 47,4 % | −0,6 | 1348 | 56,8 % | 48,4 % | +0,8 |
| Heilender Balsam | Imhotep | 1 | Basis | 4600 | 82,7 % | 49,9 % | +1,8 | 1314 | 58,4 % | 52,1 % | +4,5 |
| Pyramidenwächter | Imhotep | 3 | Basis | 4600 | 84,5 % | 49,3 % | +1,2 | 1928 | 59,1 % | 50,4 % | +2,8 |
| Tempelärztin | Imhotep | 4 | Basis | 4600 | 80,4 % | 48,8 % | +0,8 | 1820 | 52,7 % | 46,8 % | −0,8 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1842 | 52,9 % | 50,6 % | +3,0 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1894 | 59,9 % | 51,4 % | +3,8 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1882 | 49,3 % | 47,7 % | +0,1 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 2054 | 55,6 % | 53,5 % | +5,9 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 2052 | 55,9 % | 46,4 % | −1,2 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 2532 | 50,8 % | 53,1 % | +5,5 |
| Lagunenbote | Dandolo | 1 | Basis | 4600 | 78,8 % | 51,4 % | +2,6 | 1184 | 50,9 % | 52,7 % | +2,9 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 4600 | 79,6 % | 48,2 % | −0,6 | 1652 | 47,8 % | 47,4 % | −2,5 |
| Präziser Stich | Dandolo | 2 | Basis | 4600 | 83,6 % | 50,4 % | +1,6 | 1658 | 53,7 % | 50,4 % | +0,5 |
| Handelsgesandter | Dandolo | 4 | Basis | 4600 | 77,3 % | 52,3 % | +3,5 | 1542 | 51,3 % | 51,2 % | +1,3 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1684 | 38,9 % | 49,5 % | −0,4 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1718 | 54,9 % | 51,3 % | +1,4 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1698 | 43,7 % | 49,6 % | −0,3 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1800 | 50,2 % | 50,3 % | +0,4 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1820 | 32,9 % | 52,1 % | +2,2 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 2380 | 44,4 % | 53,1 % | +3,2 |
| Steppenspäher | Khan | 1 | Basis | 4600 | 74,9 % | 50,4 % | −0,7 | 1190 | 45,0 % | 50,9 % | +0,3 |
| Reiterbogenschütze | Khan | 2 | Basis | 4600 | 75,6 % | 49,5 % | −1,6 | 1722 | 50,6 % | 53,1 % | +2,5 |
| Pfeilschuss | Khan | 2 | Basis | 4600 | 74,9 % | 49,2 % | −1,9 | 1712 | 53,0 % | 52,1 % | +1,5 |
| Goldener Reiter | Khan | 4 | Basis | 4600 | 69,5 % | 55,9 % | +4,8 | 1586 | 46,8 % | 60,4 % | +9,8 |
| Adlerjägerin | Khan | 3 | Gewöhnlich | – | – | – | – | 1726 | 41,3 % | 50,0 % | −0,6 |
| Steppensturm | Khan | 3 | Gewöhnlich | – | – | – | – | 1696 | 47,4 % | 48,9 % | −1,7 |
| Tumenwächter | Khan | 5 | Selten | – | – | – | – | 1858 | 46,2 % | 53,2 % | +2,6 |
| Belagerungsfeuer | Khan | 6 | Selten | – | – | – | – | 2326 | 47,6 % | 53,5 % | +2,9 |
| Keshig-Elite | Khan | 6 | Episch | – | – | – | – | 2370 | 44,5 % | 48,8 % | −1,8 |
| Subutai, der Stratege | Khan | 6 | Legendär | – | – | – | – | 2284 | 44,0 % | 56,2 % | +5,6 |
| Hainwächterin | Boudicca | 1 | Basis | 4600 | 81,6 % | 44,9 % | −1,6 | 1296 | 51,0 % | 53,6 % | +1,3 |
| Eichenhaut | Boudicca | 2 | Basis | 4600 | 72,5 % | 44,6 % | −1,9 | 1710 | 40,3 % | 48,7 % | −3,6 |
| Icenerkrieger | Boudicca | 3 | Basis | 4600 | 84,4 % | 47,5 % | +0,9 | 1718 | 55,7 % | 55,7 % | +3,5 |
| Wilder Hieb | Boudicca | 3 | Basis | 4600 | 83,6 % | 45,6 % | −0,9 | 1718 | 58,5 % | 49,6 % | −2,7 |
| Streitwagenlenkerin | Boudicca | 4 | Gewöhnlich | – | – | – | – | 1550 | 47,1 % | 50,8 % | −1,5 |
| Druidin des Hains | Boudicca | 3 | Gewöhnlich | – | – | – | – | 1760 | 53,6 % | 50,4 % | −1,9 |
| Aufstand | Boudicca | 3 | Selten | – | – | – | – | 1724 | 54,7 % | 56,7 % | +4,4 |
| Eichenkoloss | Boudicca | 6 | Selten | – | – | – | – | 2492 | 52,4 % | 54,1 % | +1,9 |
| Zorn der Königin | Boudicca | 5 | Episch | – | – | – | – | 1838 | 33,7 % | 49,0 % | −3,3 |
| Andraste, Göttin des Sieges | Boudicca | 8 | Legendär | – | – | – | – | 1402 | 45,9 % | 52,6 % | +0,3 |
| Tintenlehrling | Nostradamus | 1 | Basis | 4600 | 84,5 % | 52,6 % | +2,6 | 1366 | 58,1 % | 55,4 % | +5,2 |
| Dunkle Vorahnung | Nostradamus | 2 | Basis | 4600 | 88,1 % | 52,9 % | +2,9 | 1894 | 64,7 % | 54,9 % | +4,7 |
| Maskierter Seher | Nostradamus | 3 | Basis | 4600 | 84,0 % | 50,7 % | +0,7 | 1944 | 47,9 % | 50,6 % | +0,4 |
| Prophezeiung | Nostradamus | 4 | Basis | 4600 | 63,4 % | 50,6 % | +0,6 | 1726 | 22,7 % | 48,6 % | −1,6 |
| Pestdoktor | Nostradamus | 4 | Gewöhnlich | – | – | – | – | 1836 | 56,3 % | 57,8 % | +7,6 |
| Schattenpakt | Nostradamus | 2 | Gewöhnlich | – | – | – | – | 1874 | 60,0 % | 55,8 % | +5,6 |
| Chronist der Nacht | Nostradamus | 5 | Selten | – | – | – | – | 1914 | 51,6 % | 51,4 % | +1,2 |
| Rote Finsternis | Nostradamus | 5 | Selten | – | – | – | – | 2008 | 41,9 % | 53,8 % | +3,6 |
| Wächter der Zeiten | Nostradamus | 6 | Episch | – | – | – | – | 2542 | 59,1 % | 53,3 % | +3,0 |
| Caterina de’ Medici | Nostradamus | 5 | Legendär | – | – | – | – | 1960 | 53,2 % | 51,3 % | +1,1 |
| Bauernrekrut | Jeanne | 1 | Basis | 4600 | 78,4 % | 49,2 % | −0,1 | 1312 | 55,6 % | 53,8 % | +4,6 |
| Bannersegen | Jeanne | 2 | Basis | 4600 | 78,7 % | 50,1 % | +0,7 | 1652 | 49,9 % | 50,3 % | +1,2 |
| Wache von Orléans | Jeanne | 3 | Basis | 4600 | 77,8 % | 49,4 % | +0,1 | 1792 | 56,1 % | 52,5 % | +3,4 |
| Die Fahne erheben | Jeanne | 2 | Basis | 4600 | 76,4 % | 48,6 % | −0,7 | 1664 | 54,2 % | 55,8 % | +6,7 |
| Lilienritter | Jeanne | 4 | Gewöhnlich | – | – | – | – | 1568 | 40,8 % | 51,5 % | +2,4 |
| Heiliger Schutz | Jeanne | 2 | Gewöhnlich | – | – | – | – | 1670 | 46,9 % | 51,8 % | +2,7 |
| Standartenträgerin | Jeanne | 5 | Selten | – | – | – | – | 1840 | 48,3 % | 49,7 % | +0,6 |
| Glocken von Reims | Jeanne | 6 | Selten | – | – | – | – | 2266 | 42,5 % | 50,8 % | +1,6 |
| Paladin der Loire | Jeanne | 7 | Episch | – | – | – | – | 2098 | 40,8 % | 49,8 % | +0,6 |
| La Hire, der Unbeugsame | Jeanne | 7 | Legendär | – | – | – | – | 2016 | 42,3 % | 50,1 % | +0,9 |
| Fjordspäher | Ragnar | 1 | Basis | 4600 | 77,2 % | 47,6 % | −1,7 | 1256 | 50,7 % | 53,8 % | +1,6 |
| Runenblitz | Ragnar | 2 | Basis | 4600 | 80,6 % | 49,3 % | +0,0 | 1648 | 60,1 % | 53,8 % | +1,6 |
| Schildmaid | Ragnar | 3 | Basis | 4600 | 80,8 % | 50,0 % | +0,7 | 1706 | 53,6 % | 54,9 % | +2,7 |
| Runenschnitzer | Ragnar | 4 | Basis | 4600 | 75,3 % | 51,3 % | +2,0 | 1598 | 50,3 % | 54,0 % | +1,8 |
| Donnerschlag | Ragnar | 3 | Gewöhnlich | – | – | – | – | 1758 | 56,3 % | 52,2 % | −0,0 |
| Berserker vom Fjord | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1556 | 47,6 % | 52,0 % | −0,2 |
| Ahnenbund | Ragnar | 3 | Selten | – | – | – | – | 1664 | 52,0 % | 58,3 % | +6,0 |
| Runenhüter | Ragnar | 5 | Selten | – | – | – | – | 1900 | 47,4 % | 50,6 % | −1,6 |
| Sturm der Nordsee | Ragnar | 5 | Episch | – | – | – | – | 1906 | 52,3 % | 53,9 % | +1,7 |
| Lagertha, Schildmaid | Ragnar | 7 | Legendär | – | – | – | – | 2238 | 45,1 % | 58,0 % | +5,7 |
| Dojoschüler | Musashi | 1 | Basis | 4600 | 78,7 % | 51,8 % | −0,9 | 1182 | 51,9 % | 52,6 % | +0,8 |
| Schneller Schnitt | Musashi | 1 | Basis | 4600 | 82,9 % | 53,2 % | +0,5 | 1160 | 50,2 % | 54,8 % | +3,0 |
| Rōnin | Musashi | 3 | Basis | 4600 | 83,2 % | 54,8 % | +2,1 | 1784 | 53,4 % | 58,4 % | +6,6 |
| Konzentration | Musashi | 2 | Basis | 4600 | 71,6 % | 54,4 % | +1,7 | 1698 | 41,6 % | 50,5 % | −1,3 |
| Kirschblütenwache | Musashi | 3 | Gewöhnlich | – | – | – | – | 1764 | 52,2 % | 53,7 % | +1,9 |
| Zwei Himmel | Musashi | 3 | Gewöhnlich | – | – | – | – | 1776 | 36,1 % | 50,5 % | −1,3 |
| Duellant | Musashi | 4 | Selten | – | – | – | – | 1546 | 39,5 % | 50,7 % | −1,1 |
| Der leere Geist | Musashi | 5 | Selten | – | – | – | – | 1826 | 39,7 % | 55,3 % | +3,5 |
| Meister der fünf Ringe | Musashi | 6 | Episch | – | – | – | – | 2388 | 50,1 % | 50,0 % | −1,8 |
| Sasaki Kojirō, der Rivale | Musashi | 6 | Legendär | – | – | – | – | 2234 | 44,9 % | 52,1 % | +0,3 |
| Dorfwache | neutral | 1 | Basis | 101200 | 79,4 % | 49,3 % | −0,7 | 27624 | 53,3 % | 50,1 % | +0,1 |
| Wandernder Händler | neutral | 2 | Basis | 101200 | 76,7 % | 49,2 % | −0,8 | 37582 | 48,2 % | 50,0 % | +0,1 |
| Steinschleuderer | neutral | 2 | Basis | 101200 | 80,4 % | 49,4 % | −0,6 | 37368 | 52,8 % | 50,4 % | +0,5 |
| Grenzläuferin | neutral | 3 | Basis | 101200 | 81,4 % | 50,9 % | +0,9 | 39006 | 51,9 % | 52,5 % | +2,5 |
| Festungsschild | neutral | 4 | Basis | 101200 | 75,3 % | 50,9 % | +0,9 | 36732 | 46,6 % | 50,6 % | +0,7 |
| Kavallerist | neutral | 4 | Basis | 101200 | 76,9 % | 51,3 % | +1,3 | 36238 | 46,3 % | 51,0 % | +1,0 |
| Feldheilerin | neutral | 3 | Basis | 101200 | 79,4 % | 49,3 % | −0,7 | 39608 | 51,0 % | 49,1 % | −0,8 |
| Archivarin | neutral | 4 | Basis | 101200 | 73,1 % | 52,2 % | +2,3 | 37018 | 44,9 % | 50,3 % | +0,3 |
| Wachhund | neutral | 2 | Basis | 101200 | 78,4 % | 48,7 % | −1,3 | 37294 | 50,1 % | 48,1 % | −1,8 |
| Veteran | neutral | 5 | Basis | 101200 | 78,0 % | 52,4 % | +2,4 | 43436 | 49,6 % | 48,9 % | −1,0 |
| Belagerungsturm | neutral | 6 | Basis | 101200 | 75,4 % | 55,3 % | +5,3 | 55448 | 51,1 % | 50,4 % | +0,4 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 39654 | 49,7 % | 50,2 % | +0,2 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 27882 | 52,7 % | 51,4 % | +1,5 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 43462 | 50,8 % | 53,7 % | +3,8 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 39760 | 49,7 % | 50,2 % | +0,2 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 37294 | 49,5 % | 50,1 % | +0,1 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 37502 | 40,4 % | 49,3 % | −0,7 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 27644 | 49,6 % | 47,5 % | −2,5 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 37240 | 56,2 % | 49,7 % | −0,2 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 49384 | 52,0 % | 53,6 % | +3,6 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 39134 | 54,1 % | 50,5 % | +0,5 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 36686 | 47,0 % | 49,1 % | −0,8 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 37590 | 52,7 % | 52,6 % | +2,6 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 36736 | 48,1 % | 52,2 % | +2,3 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 39256 | 56,0 % | 52,8 % | +2,8 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 37320 | 28,3 % | 45,1 % | −4,8 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 36736 | 47,6 % | 47,1 % | −2,8 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 43468 | 46,9 % | 50,9 % | +0,9 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 36606 | 52,3 % | 54,1 % | +4,1 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 36628 | 46,4 % | 54,5 % | +4,6 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 43602 | 51,8 % | 51,3 % | +1,3 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 43564 | 49,0 % | 50,1 % | +0,2 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 37336 | 41,6 % | 49,4 % | −0,5 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 55632 | 54,1 % | 50,8 % | +0,8 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 49470 | 46,1 % | 52,2 % | +2,2 |
| Vergessene Weisheit | neutral | 4 | Episch | – | – | – | – | 36660 | 23,9 % | 48,9 % | −1,0 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 34328 | 44,3 % | 58,9 % | +8,9 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 49354 | 54,2 % | 52,7 % | +2,7 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 36262 | 42,7 % | 51,7 % | +1,8 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 34086 | 43,4 % | 55,5 % | +5,6 |
| Agent des Zehnerrats | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1704 | 59,4 % | 51,3 % | +1,4 |
| Tributeintreiber | Khan | 3 | Gewöhnlich | – | – | – | – | 1746 | 50,5 % | 50,0 % | −0,6 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1858 | 54,8 % | 51,1 % | +3,5 |
| Brand von Londinium | Boudicca | 3 | Selten | – | – | – | – | 1728 | 49,9 % | 52,5 % | +0,2 |
| Bannbulle | Nostradamus | 1 | Selten | – | – | – | – | 1458 | 58,8 % | 51,4 % | +1,2 |
| Plünderer von Paris | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1672 | 45,9 % | 51,9 % | −0,3 |
| Zorn des Donnergottes | Ragnar | 1 | Gewöhnlich | – | – | – | – | 1278 | 60,6 % | 51,2 % | −1,0 |
| Shinobi aus Iga | Musashi | 2 | Gewöhnlich | – | – | – | – | 1720 | 50,5 % | 55,0 % | +3,2 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 36956 | 51,8 % | 48,2 % | −1,8 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 27806 | 54,3 % | 52,2 % | +2,2 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 37630 | 56,5 % | 52,8 % | +2,8 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 39008 | 50,4 % | 52,0 % | +2,0 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 39378 | 55,3 % | 50,2 % | +0,3 |
| Ruderer der Triere | Perikles | 1 | Basis | 4600 | 78,4 % | 49,9 % | +2,1 | 1184 | 56,0 % | 55,8 % | +7,9 |
| Lange Mauern | Perikles | 2 | Basis | 4600 | 77,8 % | 43,7 % | −4,1 | 1594 | 55,4 % | 43,2 % | −4,7 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 4600 | 79,2 % | 51,3 % | +3,5 | 1696 | 55,1 % | 52,5 % | +4,6 |
| Strategos | Perikles | 3 | Basis | 4600 | 77,7 % | 50,2 % | +2,4 | 1678 | 57,3 % | 53,8 % | +5,9 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1694 | 47,2 % | 43,2 % | −4,7 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1674 | 59,0 % | 54,6 % | +6,7 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1498 | 52,2 % | 54,4 % | +6,5 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1636 | 39,3 % | 50,2 % | +2,3 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1582 | 36,3 % | 42,5 % | −5,3 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 2416 | 51,8 % | 48,9 % | +1,0 |
| Pilumwerfer | Agrippa | 1 | Basis | 4600 | 76,4 % | 52,0 % | +4,1 | 1236 | 56,1 % | 53,7 % | +4,7 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 4600 | 73,0 % | 49,8 % | +1,9 | 1684 | 46,1 % | 50,2 % | +1,2 |
| Castra | Agrippa | 3 | Basis | 4600 | 82,0 % | 48,8 % | +0,9 | 1736 | 57,3 % | 48,1 % | −1,0 |
| Testudo | Agrippa | 2 | Basis | 4600 | 73,2 % | 50,4 % | +2,5 | 1718 | 49,2 % | 52,2 % | +3,2 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1726 | 52,0 % | 50,5 % | +1,4 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1692 | 49,5 % | 51,5 % | +2,4 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1982 | 52,7 % | 51,4 % | +2,4 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1632 | 53,7 % | 43,3 % | −5,7 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1618 | 40,7 % | 48,3 % | −0,7 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1918 | 39,4 % | 46,8 % | −2,2 |
| Bogenschütze von Ta-Seti | Amanirenas | 1 | Basis | 4600 | 82,0 % | 50,0 % | +0,3 | 1398 | 57,2 % | 49,5 % | +0,3 |
| Wüstenreiter | Amanirenas | 2 | Basis | 4600 | 80,3 % | 49,0 % | −0,7 | 1834 | 56,3 % | 45,7 % | −3,5 |
| Pfeilregen von Kusch | Amanirenas | 2 | Basis | 4600 | 77,7 % | 50,7 % | +1,0 | 1874 | 44,1 % | 50,0 % | +0,8 |
| Speerträger von Napata | Amanirenas | 3 | Basis | 4600 | 83,1 % | 50,6 % | +0,9 | 1932 | 54,9 % | 50,4 % | +1,2 |
| Wächter des Löwentempels | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1858 | 53,9 % | 51,9 % | +2,7 |
| Kundschafter aus Meroë | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1918 | 55,8 % | 50,0 % | +0,7 |
| Kriegselefant von Kusch | Amanirenas | 6 | Selten | – | – | – | – | 2552 | 53,9 % | 51,7 % | +2,5 |
| Überfall auf Syene | Amanirenas | 3 | Selten | – | – | – | – | 2022 | 55,9 % | 46,7 % | −2,5 |
| Akinidad, Prinz von Kusch | Amanirenas | 5 | Episch | – | – | – | – | 2038 | 55,1 % | 45,6 % | −3,6 |
| Bronzekopf des Augustus | Amanirenas | 6 | Legendär | – | – | – | – | 2434 | 45,1 % | 49,6 % | +0,4 |
| Kopistin der Chronik | Anna | 1 | Basis | 4600 | 80,7 % | 52,3 % | +3,3 | 1326 | 53,4 % | 51,2 % | +3,8 |
| Pantokrator-Spital | Anna | 3 | Basis | 4600 | 70,9 % | 50,0 % | +1,0 | 1684 | 30,6 % | 48,5 % | +1,2 |
| Warägergardist | Anna | 3 | Basis | 4600 | 81,5 % | 53,3 % | +4,3 | 1770 | 53,4 % | 56,7 % | +9,3 |
| Hofärztin | Anna | 3 | Basis | 4600 | 79,6 % | 48,7 % | −0,3 | 1758 | 42,0 % | 44,8 % | −2,6 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1644 | 46,2 % | 57,9 % | +10,5 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1586 | 47,5 % | 56,3 % | +8,9 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1872 | 48,2 % | 56,5 % | +9,1 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1782 | 37,1 % | 46,7 % | −0,7 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1830 | 48,1 % | 48,8 % | +1,4 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 2378 | 48,4 % | 48,4 % | +1,0 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 4600 | 82,2 % | 50,8 % | +0,3 | 1298 | 54,8 % | 54,5 % | +5,5 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 4600 | 80,2 % | 51,1 % | +0,5 | 1728 | 54,7 % | 49,3 % | +0,3 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 4600 | 82,4 % | 50,8 % | +0,3 | 1768 | 57,0 % | 49,8 % | +0,8 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 4600 | 81,9 % | 49,3 % | −1,2 | 1980 | 59,0 % | 49,2 % | +0,2 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1814 | 55,2 % | 46,3 % | −2,7 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1748 | 54,3 % | 51,1 % | +2,1 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1758 | 55,0 % | 50,6 % | +1,5 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1818 | 54,5 % | 42,2 % | −6,8 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 2686 | 57,4 % | 59,5 % | +10,5 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 2116 | 46,7 % | 43,9 % | −5,1 |
| Gokenin aus Sagami | Masako | 1 | Basis | 4600 | 80,8 % | 47,6 % | −2,3 | 1114 | 57,6 % | 49,2 % | +0,4 |
| Bogenreiter aus Kamakura | Masako | 2 | Basis | 4600 | 81,6 % | 48,8 % | −1,1 | 1548 | 57,6 % | 50,6 % | +1,8 |
| Treueschwur | Masako | 1 | Basis | 4600 | 80,3 % | 51,7 % | +1,8 | 1158 | 53,3 % | 53,3 % | +4,5 |
| Nonne von Kamakura | Masako | 2 | Basis | 4600 | 81,2 % | 47,9 % | −2,0 | 1628 | 58,1 % | 51,9 % | +3,1 |
| Rokuhara-Späher | Masako | 2 | Gewöhnlich | – | – | – | – | 1570 | 56,6 % | 52,0 % | +3,2 |
| Aufgebot von Jōkyū | Masako | 4 | Gewöhnlich | – | – | – | – | 1726 | 55,6 % | 53,1 % | +4,3 |
| Tsurugaoka Hachiman-gū | Masako | 2 | Selten | – | – | – | – | 1632 | 55,8 % | 45,8 % | −3,0 |
| Verbannung nach Oki | Masako | 3 | Selten | – | – | – | – | 1790 | 50,7 % | 45,5 % | −3,3 |
| Hōjō Yoshitoki, Regent | Masako | 5 | Episch | – | – | – | – | 1968 | 54,4 % | 51,7 % | +2,9 |
| Minamoto no Yoritomo | Masako | 6 | Legendär | – | – | – | – | 2572 | 51,4 % | 50,2 % | +1,4 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1782 | 55,9 % | 52,9 % | +3,8 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1700 | 53,6 % | 43,9 % | −5,2 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1626 | 55,2 % | 47,8 % | +0,9 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1662 | 52,3 % | 51,5 % | +4,6 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1944 | 59,0 % | 48,9 % | +1,4 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1820 | 60,1 % | 43,7 % | −3,9 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1690 | 47,4 % | 48,2 % | −1,7 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 2424 | 44,5 % | 52,1 % | +2,2 |
| Jurtenlager | Khan | 3 | Gewöhnlich | – | – | – | – | 1750 | 35,8 % | 44,7 % | −5,9 |
| Kurultai | Khan | 4 | Selten | – | – | – | – | 1582 | 30,1 % | 49,1 % | −1,5 |
| Barde der Icener | Boudicca | 2 | Gewöhnlich | – | – | – | – | 1724 | 53,8 % | 54,5 % | +2,2 |
| Sichelwagen | Boudicca | 5 | Selten | – | – | – | – | 1870 | 48,6 % | 54,5 % | +2,2 |
| Almanach der Quatrains | Nostradamus | 1 | Gewöhnlich | – | – | – | – | 1324 | 57,7 % | 51,9 % | +1,7 |
| Horoskop der Königin | Nostradamus | 3 | Selten | – | – | – | – | 1940 | 2,9 % | 45,1 % | −5,1 |
| Pilgerin aus Domrémy | Jeanne | 1 | Gewöhnlich | – | – | – | – | 1306 | 52,8 % | 58,6 % | +9,5 |
| Die Weihe von Reims | Jeanne | 4 | Selten | – | – | – | – | 1644 | 32,2 % | 47,8 % | −1,3 |
| Runenmeisterin | Ragnar | 2 | Gewöhnlich | – | – | – | – | 1570 | 52,0 % | 53,3 % | +1,1 |
| Berserkergang | Ragnar | 1 | Selten | – | – | – | – | 1294 | 59,7 % | 50,5 % | −1,7 |
| Schwertschüler aus Kokura | Musashi | 4 | Selten | – | – | – | – | 1550 | 44,2 % | 47,3 % | −4,5 |
| Niten Ichi-ryū | Musashi | 2 | Gewöhnlich | – | – | – | – | 1614 | 49,2 % | 49,0 % | −2,7 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1580 | 50,0 % | 53,8 % | +5,9 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1694 | 28,6 % | 46,5 % | −1,3 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1662 | 49,2 % | 46,6 % | −2,4 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1624 | 38,5 % | 49,3 % | +0,2 |
| Pfeilmacher aus Meroë | Amanirenas | 2 | Gewöhnlich | – | – | – | – | 1862 | 55,8 % | 50,2 % | +1,0 |
| Gift der Wüstenviper | Amanirenas | 3 | Selten | – | – | – | – | 1904 | 45,2 % | 52,5 % | +3,3 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1740 | 54,0 % | 47,0 % | −0,3 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 2348 | 57,5 % | 53,9 % | +6,5 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1788 | 57,4 % | 50,5 % | +1,5 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1776 | 52,5 % | 47,5 % | −1,5 |
| Jitō-Verwalter | Masako | 2 | Gewöhnlich | – | – | – | – | 1588 | 55,6 % | 48,8 % | −0,0 |
| Siegel des Shikken | Masako | 2 | Selten | – | – | – | – | 1542 | 45,5 % | 49,2 % | +0,4 |
| Olympionike | Griechische Antike | 4 | Gewöhnlich | – | – | – | – | 6578 | 52,2 % | 55,4 % | +6,6 |
| Rhapsode | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 6566 | 51,8 % | 52,3 % | +3,5 |
| Marathonläufer | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 6544 | 51,6 % | 52,6 % | +3,7 |
| Orakel von Delphi | Griechische Antike | 3 | Selten | – | – | – | – | 6972 | 28,0 % | 47,2 % | −1,7 |
| Leuchtturm von Pharos | Griechische Antike | 3 | Selten | – | – | – | – | 7096 | 52,8 % | 41,9 % | −6,9 |
| Akropolis | Griechische Antike | 2 | Selten | – | – | – | – | 6460 | 54,3 % | 49,1 % | +0,2 |
| Bibliothek von Alexandria | Griechische Antike | 3 | Episch | – | – | – | – | 7068 | 48,1 % | 46,3 % | −2,5 |
| Knappe | Europäisches Mittelalter | 1 | Gewöhnlich | – | – | – | – | 6404 | 53,3 % | 53,3 % | +2,1 |
| Armbrustschütze | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 8988 | 58,1 % | 54,7 % | +3,4 |
| Mönch von Cluny | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 8734 | 50,0 % | 54,1 % | +2,9 |
| Hansekogge | Europäisches Mittelalter | 4 | Gewöhnlich | – | – | – | – | 8114 | 47,8 % | 50,0 % | −1,2 |
| Turnierritter | Europäisches Mittelalter | 4 | Selten | – | – | – | – | 8060 | 50,6 % | 55,6 % | +4,4 |
| Burgfried | Europäisches Mittelalter | 2 | Selten | – | – | – | – | 8452 | 57,3 % | 43,8 % | −7,4 |
| Tribok | Europäisches Mittelalter | 4 | Episch | – | – | – | – | 7982 | 31,1 % | 48,1 % | −3,1 |
| Ashigaru | China, Korea, Japan | 1 | Gewöhnlich | – | – | – | – | 3598 | 54,0 % | 53,9 % | +3,9 |
| Mandarin-Gelehrter | China, Korea, Japan | 3 | Gewöhnlich | – | – | – | – | 5422 | 51,7 % | 52,6 % | +2,6 |
| Teezeremonie | China, Korea, Japan | 2 | Gewöhnlich | – | – | – | – | 4876 | 42,9 % | 48,3 % | −1,6 |
| Hwacha-Salve | China, Korea, Japan | 3 | Selten | – | – | – | – | 5416 | 56,5 % | 51,2 % | +1,2 |
| Schildkrötenschiff | China, Korea, Japan | 5 | Selten | – | – | – | – | 5846 | 54,3 % | 49,4 % | −0,6 |
| Terrakotta-Armee | China, Korea, Japan | 5 | Episch | – | – | – | – | 5840 | 55,5 % | 50,6 % | +0,7 |
| Große Mauer | China, Korea, Japan | 2 | Episch | – | – | – | – | 4954 | 60,1 % | 44,4 % | −5,6 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 39282 | 31,7 % | 44,6 % | −5,4 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 37616 | 56,5 % | 44,8 % | −5,1 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 36950 | 26,9 % | 43,5 % | −6,4 |
| Thebanischer Plänkler | Epaminondas | 1 | Basis | 4600 | 76,6 % | 50,3 % | +0,6 | 1322 | 52,2 % | 54,5 % | +2,8 |
| Böotischer Hoplit | Epaminondas | 2 | Basis | 4600 | 76,9 % | 50,2 % | +0,5 | 1702 | 52,4 % | 55,8 % | +4,1 |
| Fünfzig Schilde tief | Epaminondas | 2 | Basis | 4600 | 73,7 % | 50,1 % | +0,4 | 1714 | 45,0 % | 51,6 % | −0,1 |
| Böotarch | Epaminondas | 3 | Basis | 4600 | 77,3 % | 49,8 % | +0,1 | 1828 | 51,8 % | 55,4 % | +3,6 |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | Gewöhnlich | – | – | – | – | 1918 | 48,0 % | 59,9 % | +8,2 |
| Schlacht bei Leuktra | Epaminondas | 4 | Gewöhnlich | – | – | – | – | 1574 | 42,1 % | 52,7 % | +1,0 |
| Befreiung Messeniens | Epaminondas | 5 | Selten | – | – | – | – | 1908 | 49,4 % | 52,6 % | +0,8 |
| Thebanischer Phalangit | Epaminondas | 4 | Selten | – | – | – | – | 1624 | 45,3 % | 57,9 % | +6,2 |
| Megalopolis | Epaminondas | 3 | Episch | – | – | – | – | 1712 | 43,5 % | 45,8 % | −6,0 |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | Legendär | – | – | – | – | 2578 | 42,7 % | 52,3 % | +0,6 |
| Veles | Fabius | 1 | Basis | 4600 | 87,0 % | 48,5 % | +0,0 | 1274 | 59,9 % | 53,9 % | +4,9 |
| Triarier | Fabius | 2 | Basis | 4600 | 85,5 % | 48,7 % | +0,2 | 1634 | 56,4 % | 51,4 % | +2,4 |
| Hinhalten | Fabius | 2 | Basis | 4600 | 84,2 % | 48,7 % | +0,2 | 1650 | 58,9 % | 48,2 % | −0,7 |
| Konsul der Republik | Fabius | 4 | Basis | 4600 | 83,0 % | 48,8 % | +0,3 | 1672 | 49,4 % | 48,4 % | −0,5 |
| Verbrannte Erde | Fabius | 3 | Gewöhnlich | – | – | – | – | 1834 | 61,8 % | 46,1 % | −2,8 |
| Späher am Volturnus | Fabius | 2 | Gewöhnlich | – | – | – | – | 1718 | 57,7 % | 49,0 % | +0,0 |
| Minucius, der Reiteroberst | Fabius | 4 | Selten | – | – | – | – | 1740 | 50,3 % | 52,3 % | +3,3 |
| Rückeroberung von Tarent | Fabius | 6 | Selten | – | – | – | – | 2468 | 43,9 % | 55,2 % | +6,2 |
| Lager auf den Höhen | Fabius | 3 | Episch | – | – | – | – | 1758 | 63,7 % | 48,2 % | −0,8 |
| Marcellus, Schwert Roms | Fabius | 6 | Legendär | – | – | – | – | 2470 | 47,1 % | 46,6 % | −2,3 |
| Botin der Stämme | Mandukhai | 1 | Basis | 4600 | 77,0 % | 55,0 % | +2,5 | 1278 | 49,1 % | 59,4 % | +5,9 |
| Hüterin des Herdfeuers | Mandukhai | 2 | Basis | 4600 | 77,3 % | 52,0 % | −0,5 | 1622 | 50,6 % | 51,0 % | −2,4 |
| Ruf der Tumen | Mandukhai | 2 | Basis | 4600 | 75,6 % | 52,6 % | +0,1 | 1706 | 48,9 % | 55,6 % | +2,1 |
| Bogenreiterin der Chahar | Mandukhai | 3 | Basis | 4600 | 78,9 % | 54,8 % | +2,3 | 1746 | 53,7 % | 56,0 % | +2,5 |
| Schlacht von Tas Bürd | Mandukhai | 4 | Gewöhnlich | – | – | – | – | 1734 | 45,4 % | 55,2 % | +1,8 |
| Zwilling der Khatun | Mandukhai | 3 | Gewöhnlich | – | – | – | – | 1808 | 53,3 % | 58,4 % | +4,9 |
| Schwarzes Banner | Mandukhai | 2 | Selten | – | – | – | – | 1684 | 58,0 % | 50,3 % | −3,1 |
| Unterwerfung der Oiraten | Mandukhai | 5 | Selten | – | – | – | – | 2100 | 45,4 % | 57,5 % | +4,0 |
| Batu Möngke, der junge Khan | Mandukhai | 4 | Episch | – | – | – | – | 1594 | 43,7 % | 50,8 % | −2,7 |
| Wiedervereinigung der Mongolen | Mandukhai | 8 | Legendär | – | – | – | – | 1628 | 40,1 % | 55,1 % | +1,6 |
| Mamlukenrekrut | Baibars | 1 | Basis | 4600 | 81,5 % | 49,9 % | −0,8 | 1268 | 50,6 % | 51,4 % | −1,4 |
| Barid-Kurier | Baibars | 2 | Basis | 4600 | 77,1 % | 51,9 % | +1,1 | 1644 | 45,8 % | 54,0 % | +1,2 |
| Ain Dschalut | Baibars | 3 | Basis | 4600 | 83,3 % | 52,1 % | +1,3 | 1822 | 58,2 % | 57,3 % | +4,5 |
| Bogenreiter der Bahriya | Baibars | 3 | Basis | 4600 | 81,1 % | 50,2 % | −0,6 | 1714 | 48,7 % | 52,2 % | −0,6 |
| Manjaniq-Meister | Baibars | 4 | Gewöhnlich | – | – | – | – | 1622 | 49,3 % | 54,9 % | +2,1 |
| Vorgetäuschte Flucht | Baibars | 1 | Gewöhnlich | – | – | – | – | 1200 | 19,1 % | 43,1 % | −9,7 |
| Qutuz, Sultan von Ägypten | Baibars | 5 | Selten | – | – | – | – | 2052 | 47,8 % | 59,9 % | +7,1 |
| Sturm auf Antiochia | Baibars | 2 | Selten | – | – | – | – | 1660 | 45,9 % | 50,7 % | −2,1 |
| Zitadelle von Kairo | Baibars | 4 | Episch | – | – | – | – | 1744 | 32,7 % | 51,6 % | −1,2 |
| Qalawun, Emir der Bahriya | Baibars | 6 | Legendär | – | – | – | – | 2720 | 46,5 % | 58,8 % | +6,0 |
| Dreschflegelbauer | Žižka | 1 | Basis | 4600 | 81,1 % | 58,3 % | +1,3 | 1338 | 55,1 % | 63,1 % | +10,7 |
| Píšťala-Schütze | Žižka | 2 | Basis | 4600 | 81,9 % | 56,8 % | −0,2 | 1690 | 61,2 % | 55,9 % | +3,5 |
| Salve aus der Wagenburg | Žižka | 2 | Basis | 4600 | 74,6 % | 54,5 % | −2,5 | 1748 | 32,7 % | 47,2 % | −5,2 |
| Hauptmann der Taboriten | Žižka | 3 | Basis | 4600 | 81,4 % | 57,8 % | +0,8 | 1914 | 58,4 % | 58,2 % | +5,8 |
| Hakenbüchsenwagen | Žižka | 3 | Gewöhnlich | – | – | – | – | 1782 | 58,1 % | 51,5 % | −0,9 |
| Laienkelch | Žižka | 2 | Gewöhnlich | – | – | – | – | 1662 | 43,6 % | 54,1 % | +1,7 |
| Prager Fenstersturz | Žižka | 3 | Selten | – | – | – | – | 1814 | 51,1 % | 53,1 % | +0,7 |
| Wagenburg am Vítkov | Žižka | 4 | Selten | – | – | – | – | 1658 | 56,0 % | 40,4 % | −12,0 |
| Prokop der Kahle | Žižka | 6 | Episch | – | – | – | – | 2566 | 56,7 % | 50,2 % | −2,2 |
| Jan Hus, Prediger von Bethlehem | Žižka | 5 | Legendär | – | – | – | – | 1984 | 43,6 % | 52,6 % | +0,2 |
| Bogenschützin der Shang | Fu Hao | 1 | Basis | 4600 | 81,8 % | 51,5 % | +2,8 | 1290 | 57,9 % | 51,5 % | +1,9 |
| Bronzene Yue-Axt | Fu Hao | 2 | Basis | 4600 | 74,0 % | 51,3 % | +2,7 | 1756 | 42,4 % | 50,7 % | +1,1 |
| Streitwagen der Shang | Fu Hao | 3 | Basis | 4600 | 82,0 % | 49,7 % | +1,0 | 1784 | 51,2 % | 51,5 % | +1,9 |
| Knochenwahrsager | Fu Hao | 3 | Basis | 4600 | 80,5 % | 50,1 % | +1,4 | 1864 | 43,8 % | 49,5 % | −0,1 |
| Aufgebot gegen die Qiang | Fu Hao | 4 | Gewöhnlich | – | – | – | – | 1758 | 49,3 % | 53,7 % | +4,0 |
| Ahnenopfer | Fu Hao | 1 | Gewöhnlich | – | – | – | – | 1190 | 51,7 % | 56,0 % | +6,4 |
| Gravierte Schulterblätter | Fu Hao | 1 | Selten | – | – | – | – | 1234 | 58,4 % | 53,9 % | +4,3 |
| Bogenschützinnen der Fu Hao | Fu Hao | 4 | Selten | – | – | – | – | 1628 | 55,7 % | 53,7 % | +4,1 |
| Ahnentempel von Yin | Fu Hao | 1 | Episch | – | – | – | – | 1202 | 59,3 % | 54,1 % | +4,5 |
| Wu Ding, König der Shang | Fu Hao | 6 | Legendär | – | – | – | – | 2552 | 49,3 % | 54,2 % | +4,6 |
| Gladiator | Rom | 3 | Gewöhnlich | – | – | – | – | 3376 | 58,9 % | 50,2 % | +1,2 |
| Senator der Kurie | Rom | 3 | Gewöhnlich | – | – | – | – | 3506 | 48,3 % | 49,6 % | +0,6 |
| Centurio | Rom | 2 | Gewöhnlich | – | – | – | – | 3488 | 55,7 % | 55,1 % | +6,0 |
| Triumphzug | Rom | 3 | Selten | – | – | – | – | 3468 | 41,8 % | 47,7 % | −1,3 |
| Via Appia | Rom | 2 | Selten | – | – | – | – | 3442 | 54,4 % | 49,4 % | +0,4 |
| Vestalin am ewigen Feuer | Rom | 3 | Selten | – | – | – | – | 3464 | 56,5 % | 48,3 % | −0,8 |
| Pax Romana | Rom | 5 | Episch | – | – | – | – | 3948 | 53,8 % | 43,9 % | −5,1 |
| Pferdehirtin | Persien & Steppe | 2 | Gewöhnlich | – | – | – | – | 3226 | 46,1 % | 54,0 % | +2,0 |
| Schamane des Ewigen Himmels | Persien & Steppe | 3 | Gewöhnlich | – | – | – | – | 3414 | 48,3 % | 53,9 % | +1,8 |
| Parthischer Schuss | Persien & Steppe | 2 | Gewöhnlich | – | – | – | – | 3352 | 53,0 % | 53,4 % | +1,3 |
| Garde der Unsterblichen | Persien & Steppe | 4 | Selten | – | – | – | – | 3346 | 41,9 % | 49,1 % | −3,1 |
| Pfeilsturm der Steppe | Persien & Steppe | 3 | Selten | – | – | – | – | 3464 | 48,0 % | 52,3 % | +0,3 |
| Königsstraße | Persien & Steppe | 2 | Selten | – | – | – | – | 3470 | 49,4 % | 47,7 % | −4,3 |
| Persepolis | Persien & Steppe | 3 | Episch | – | – | – | – | 3590 | 43,6 % | 53,2 % | +1,1 |
| Akrit der Grenzmark | Byzanz & islamische Welt | 2 | Gewöhnlich | – | – | – | – | 3370 | 53,6 % | 53,3 % | +3,2 |
| Gelehrter im Haus der Weisheit | Byzanz & islamische Welt | 3 | Gewöhnlich | – | – | – | – | 3492 | 50,1 % | 52,2 % | +2,1 |
| Tribut in Goldbyzantinern | Byzanz & islamische Welt | 2 | Gewöhnlich | – | – | – | – | 3408 | 25,9 % | 49,3 % | −0,7 |
| Arzt des Bimaristan | Byzanz & islamische Welt | 3 | Selten | – | – | – | – | 3564 | 57,2 % | 57,1 % | +7,1 |
| Theodosianische Mauern | Byzanz & islamische Welt | 2 | Selten | – | – | – | – | 3362 | 55,7 % | 46,7 % | −3,3 |
| Hagia Sophia | Byzanz & islamische Welt | 3 | Episch | – | – | – | – | 3430 | 59,7 % | 46,9 % | −3,2 |
| Ibn an-Nafis, Arzt von Kairo | Byzanz & islamische Welt | 4 | Episch | – | – | – | – | 3184 | 52,2 % | 55,7 % | +5,5 |
