# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `6286ed15f7` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die 21 anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,5.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 50600 | ✗ 20/22 | ✗ 199/231 | ✓ 47,3 % | – | 0 | 24 |
| Zufallsdecks | 50600 | ✗ 21/22 | ✗ 224/231 | ✓ 51,3 % | ✓ 53,0 % (+3,0) | 0 | 21 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Leonidas I. | **54,3 %** | 52,2 % | 55,7 % | Epaminondas 40,0 % | Fabius 72,0 % | Defensiv: 37,3 % | ✗ |
| Amanirenas | **52,0 %** | 50,7 % | 52,9 % | Leonidas 36,5 % | Baibars 61,0 % | Aggressiv: 46,1 % | ✓ |
| Hypatia | **51,8 %** | 47,8 % | 55,4 % | Fu Hao 44,5 % | Jeanne 62,5 % | Kombinierend: 46,1 % | ✓ |
| Nostradamus | **51,5 %** | 52,5 % | 50,3 % | Khan 39,5 % | Boudicca 62,5 % | Kombinierend: 42,1 % | ✓ |
| Baibars | **51,4 %** | 49,9 % | 52,7 % | Fabius 32,5 % | Ragnar 63,0 % | Aggressiv: 41,2 % | ✓ |
| Fu Hao | **51,2 %** | 52,3 % | 49,9 % | Khan 33,0 % | Imhotep 64,0 % | Kombinierend: 41,0 % | ✓ |
| Anna Komnene | **51,0 %** | 52,1 % | 49,8 % | Fu Hao 36,5 % | Fabius 68,5 % | Kombinierend: 39,9 % | ✓ |
| Mandukhai Khatun | **50,6 %** | 47,2 % | 54,0 % | Khan 39,0 % | Fabius 67,5 % | Kombinierend: 45,5 % | ✓ |
| Dschingis Khan | **50,5 %** | 46,0 % | 54,8 % | Žižka 38,0 % | Agrippa 67,5 % | Aggressiv: 46,0 % | ✓ |
| Jeanne d’Arc | **50,3 %** | 46,1 % | 54,5 % | Hypatia 37,5 % | Musashi 62,0 % | Aggressiv: 52,2 % | ✓ |
| Ragnar Lodbrok | **50,1 %** | 46,9 % | 53,2 % | Baibars 37,0 % | Fabius 60,5 % | Aggressiv: 42,9 % | ✓ |
| Enrico Dandolo | **49,6 %** | 47,8 % | 51,4 % | Khan 41,5 % | Ragnar 54,5 % | Kombinierend: 42,1 % | ✓ |
| Perikles | **49,1 %** | 44,8 % | 53,5 % | Jeanne 42,5 % | Agrippa 57,5 % | Defensiv: 40,0 % | ✓ |
| Nezahualcóyotl | **49,1 %** | 46,3 % | 52,0 % | Baibars 39,5 % | Žižka 62,0 % | Defensiv: 39,1 % | ✓ |
| Jan Žižka | **49,0 %** | 43,0 % | 55,2 % | Nezahualcóyotl 38,0 % | Masako 64,0 % | Defensiv: 41,8 % | ✓ |
| Miyamoto Musashi | **48,9 %** | 46,1 % | 51,9 % | Jeanne 38,0 % | Dandolo 56,0 % | Aggressiv: 48,8 % | ✓ |
| Fabius Maximus | **48,7 %** | 46,4 % | 51,3 % | Leonidas 28,0 % | Epaminondas 70,5 % | Defensiv: 40,0 % | ✓ |
| Hōjō Masako | **48,7 %** | 44,1 % | 53,4 % | Žižka 36,0 % | Khan 59,0 % | Defensiv: 40,1 % | ✓ |
| Imhotep | **48,6 %** | 45,8 % | 51,7 % | Fu Hao 36,0 % | Boudicca 58,0 % | Defensiv: 36,8 % | ✓ |
| Marcus Agrippa | **48,6 %** | 44,1 % | 53,3 % | Khan 32,5 % | Boudicca 57,0 % | Kombinierend: 44,6 % | ✓ |
| Epaminondas | **48,5 %** | 45,7 % | 51,5 % | Fabius 29,5 % | Leonidas 60,0 % | Aggressiv: 42,9 % | ✓ |
| Boudicca | **46,5 %** | 41,7 % | 51,9 % | Fabius 36,0 % | Musashi 58,5 % | Aggressiv: 42,9 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. | Epam. | Fabi. | Mand. | Baib. | Žižk. | Fu H. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 52 | 55 | 50 | 52 | **62** | 55 | 57 | 54 | 53 | 55 | 55 | **64** | 52 | 59 | 48 | 40 | **72** | 56 | 45 | **62** | 48 |
| Hypatia | 49 | · | 53 | 51 | 52 | 50 | 50 | **63** | 52 | 47 | 56 | 48 | 51 | 45 | 51 | **62** | 60 | 47 | 54 | 54 | 54 | 45 |
| Imhotep | 45 | 47 | · | 49 | 51 | 58 | 41 | 45 | 51 | 55 | 50 | 45 | 53 | 44 | 53 | 48 | 45 | 55 | 52 | 47 | 56 | **36** |
| Dandolo | 51 | 50 | 52 | · | 42 | 51 | 42 | 46 | 55 | 44 | 54 | 52 | 45 | 50 | 52 | 54 | 49 | 50 | 53 | 51 | 54 | 50 |
| Khan | 48 | 48 | 49 | 59 | · | 47 | **61** | 46 | 47 | 47 | 52 | **68** | 47 | 51 | 49 | 41 | 48 | 47 | **61** | 43 | **38** | **67** |
| Boudicca | **39** | 50 | 42 | 50 | 53 | · | **38** | 56 | 47 | 59 | 47 | 43 | 41 | 46 | 48 | 47 | 53 | **36** | 47 | 49 | 42 | 48 |
| Nostradamus | 45 | 51 | 60 | 58 | **40** | **63** | · | 45 | 48 | 47 | 51 | 55 | 44 | 46 | 56 | 52 | 49 | **62** | 53 | 53 | 60 | 50 |
| Jeanne | 43 | **38** | 55 | 54 | 54 | 44 | 55 | · | **61** | **62** | 57 | 51 | 43 | 52 | 47 | 42 | 55 | 48 | 46 | 53 | 41 | 59 |
| Ragnar | 46 | 49 | 50 | 45 | 53 | 53 | 53 | **39** | · | 45 | 48 | 53 | 56 | 52 | 60 | 49 | 51 | **61** | 48 | **37** | 49 | 60 |
| Musashi | 48 | 53 | 45 | 56 | 53 | 42 | 53 | **38** | 55 | · | 50 | 52 | 44 | 52 | 49 | 45 | 56 | 42 | 54 | 49 | 43 | 50 |
| Perikles | 45 | 44 | 50 | 47 | 49 | 53 | 50 | 43 | 52 | 50 | · | 57 | 47 | 54 | 51 | 48 | 52 | 53 | 46 | 44 | 47 | 51 |
| Agrippa | 45 | 53 | 55 | 48 | **32** | 57 | 45 | 50 | 48 | 48 | 43 | · | 49 | 50 | 47 | 49 | 56 | 54 | **36** | 53 | 57 | 48 |
| Amanirenas | **37** | 50 | 48 | 55 | 53 | 60 | 56 | 57 | 44 | 56 | 53 | 52 | · | 46 | 45 | 56 | 60 | 52 | 45 | **61** | 56 | 53 |
| Anna | 48 | 55 | 56 | 51 | 50 | 54 | 54 | 49 | 48 | 48 | 47 | 50 | 54 | · | 47 | 54 | 50 | **69** | 46 | 52 | 56 | **37** |
| Nezahualcóyotl | 42 | 49 | 47 | 49 | 52 | 52 | 44 | 53 | 41 | 51 | 49 | 53 | 55 | 53 | · | 47 | 42 | 55 | 49 | **40** | **62** | 49 |
| Masako | 52 | **39** | 53 | 46 | 59 | 53 | 48 | 59 | 52 | 55 | 52 | 52 | 44 | 46 | 53 | · | 45 | 42 | 55 | **37** | **36** | 47 |
| Epaminondas | 60 | 41 | 55 | 51 | 52 | 47 | 51 | 45 | 50 | 44 | 48 | 44 | 41 | 50 | 59 | 55 | · | **30** | 57 | **38** | 49 | 53 |
| Fabius | **28** | 53 | 45 | 51 | 53 | **64** | **39** | 53 | **40** | 59 | 47 | 46 | 48 | **31** | 45 | 58 | **71** | · | **33** | **68** | 55 | **38** |
| Mandukhai | 44 | 46 | 49 | 47 | **39** | 53 | 48 | 54 | 52 | 46 | 54 | **65** | 55 | 54 | 52 | 45 | 43 | **68** | · | 45 | 56 | 48 |
| Baibars | 55 | 46 | 53 | 49 | 57 | 52 | 48 | 48 | **63** | 52 | 56 | 48 | **39** | 49 | **61** | **63** | **62** | **32** | 55 | · | 43 | 52 |
| Žižka | **39** | 47 | 44 | 47 | **62** | 59 | 41 | 60 | 52 | 57 | 53 | 43 | 44 | 44 | **38** | **64** | 52 | 45 | 44 | 57 | · | 41 |
| Fu Hao | 53 | 55 | **64** | 50 | **33** | 53 | 50 | 41 | 41 | 50 | 49 | 52 | 47 | **64** | 52 | 53 | 47 | **62** | 53 | 49 | 60 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 45,4 % aufs Gesicht, 0,9 % auf Bauwerke · **Defensiv** (7 Helden) 39,3 % aufs Gesicht, 1,0 % auf Bauwerke · **Kombinierend** (7 Helden) 43,0 % aufs Gesicht, 1,0 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 25,2, Median 24, 10–90 %: 17–35, kürzeste 9, längste 64. Beginner gewinnt 47,3 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Belagerungsturm | neutral | 6 | 55,2 % | +5,2 | 76,8 % |
| Goldener Reiter | Khan | 4 | 55,0 % | +4,6 | 70,7 % |
| Warägergardist | Anna | 3 | 55,6 % | +4,6 | 82,6 % |
| Pilumwerfer | Agrippa | 1 | 52,7 % | +3,9 | 77,7 % |
| Handelsgesandter | Dandolo | 4 | 53,2 % | +3,5 | 79,3 % |
| Rede auf die Gefallenen | Perikles | 3 | 52,6 % | +3,4 | 81,7 % |
| Kopistin der Chronik | Anna | 1 | 53,9 % | +3,0 | 81,5 % |
| Bronzene Yue-Axt | Fu Hao | 2 | 54,0 % | +3,0 | 76,4 % |
| Bibliothekslehrling | Hypatia | 1 | 50,0 % | −1,6 | 83,7 % |
| Hainwächterin | Boudicca | 1 | 45,2 % | −1,6 | 82,9 % |
| Nonne von Kamakura | Masako | 2 | 47,1 % | −1,7 | 82,8 % |
| Eichenhaut | Boudicca | 2 | 44,9 % | −1,9 | 74,6 % |
| Fjordspäher | Ragnar | 1 | 47,8 % | −2,3 | 77,3 % |
| Pfeilschuss | Khan | 2 | 48,1 % | −2,3 | 76,0 % |
| Gokenin aus Sagami | Masako | 1 | 46,3 % | −2,5 | 82,2 % |
| Lange Mauern | Perikles | 2 | 45,7 % | −3,4 | 79,7 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Mandukhai Khatun | **53,0 %** | 52,4 % | 53,0 % | Boudicca 45,0 % | Masako 58,5 % | Kombinierend: 47,1 % | ✓ |
| Boudicca | **52,8 %** | 54,3 % | 50,7 % | Baibars 43,5 % | Dandolo 62,5 % | Aggressiv: 49,5 % | ✓ |
| Ragnar Lodbrok | **52,7 %** | 54,4 % | 50,5 % | Agrippa 46,0 % | Khan 59,0 % | Aggressiv: 47,8 % | ✓ |
| Epaminondas | **51,2 %** | 51,0 % | 51,1 % | Žižka 44,0 % | Imhotep 58,5 % | Aggressiv: 47,3 % | ✓ |
| Dschingis Khan | **51,1 %** | 49,9 % | 52,2 % | Ragnar 41,0 % | Nostradamus 61,0 % | Aggressiv: 51,1 % | ✓ |
| Enrico Dandolo | **51,0 %** | 52,6 % | 49,3 % | Boudicca 37,5 % | Imhotep 65,0 % | Kombinierend: 44,8 % | ✓ |
| Nostradamus | **50,9 %** | 52,5 % | 49,2 % | Khan 39,0 % | Hypatia 57,5 % | Kombinierend: 44,5 % | ✓ |
| Miyamoto Musashi | **50,9 %** | 51,9 % | 49,7 % | Ragnar 45,0 % | Hypatia 56,0 % | Aggressiv: 53,7 % | ✓ |
| Jan Žižka | **50,8 %** | 52,2 % | 49,2 % | Fu Hao 41,5 % | Hypatia 61,5 % | Defensiv: 42,8 % | ✓ |
| Baibars | **50,7 %** | 51,9 % | 49,3 % | Ragnar 43,0 % | Boudicca 56,5 % | Aggressiv: 43,0 % | ✓ |
| Leonidas I. | **50,4 %** | 51,9 % | 48,8 % | Mandukhai 45,5 % | Imhotep 57,0 % | Defensiv: 39,1 % | ✓ |
| Fu Hao | **50,0 %** | 53,6 % | 46,4 % | Mandukhai 44,5 % | Žižka 58,5 % | Kombinierend: 44,0 % | ✓ |
| Marcus Agrippa | **50,0 %** | 49,2 % | 50,8 % | Boudicca 43,0 % | Masako 57,0 % | Kombinierend: 46,4 % | ✓ |
| Jeanne d’Arc | **49,5 %** | 52,4 % | 46,7 % | Amanirenas 43,0 % | Hypatia 58,0 % | Aggressiv: 50,2 % | ✓ |
| Hōjō Masako | **49,0 %** | 50,1 % | 48,1 % | Mandukhai 41,5 % | Amanirenas 58,0 % | Defensiv: 39,5 % | ✓ |
| Fabius Maximus | **48,9 %** | 51,1 % | 46,8 % | Anna 37,0 % | Perikles 63,0 % | Defensiv: 41,4 % | ✓ |
| Perikles | **48,5 %** | 50,1 % | 47,0 % | Fabius 37,0 % | Imhotep 56,0 % | Defensiv: 41,2 % | ✓ |
| Amanirenas | **48,4 %** | 49,7 % | 47,3 % | Masako 42,0 % | Jeanne 57,0 % | Aggressiv: 48,2 % | ✓ |
| Anna Komnene | **48,3 %** | 50,3 % | 46,7 % | Boudicca 40,5 % | Fabius 63,0 % | Kombinierend: 41,9 % | ✓ |
| Nezahualcóyotl | **48,3 %** | 49,8 % | 47,1 % | Imhotep 39,5 % | Amanirenas 57,0 % | Defensiv: 39,1 % | ✓ |
| Imhotep | **47,2 %** | 48,2 % | 46,7 % | Dandolo 35,0 % | Nezahualcóyotl 60,5 % | Defensiv: 37,8 % | ✓ |
| Hypatia | **46,5 %** | 49,3 % | 44,3 % | Žižka 38,5 % | Dandolo 54,0 % | Kombinierend: 43,6 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. | Epam. | Fabi. | Mand. | Baib. | Žižk. | Fu H. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 50 | 57 | 50 | 52 | 51 | 56 | 47 | 48 | 46 | 50 | 56 | 52 | 48 | 54 | 50 | 47 | 47 | 46 | 54 | 49 | 51 |
| Hypatia | 50 | · | 49 | 54 | 42 | 42 | 43 | 42 | 49 | 44 | 47 | 48 | 47 | 49 | 48 | 47 | 47 | 54 | 43 | 45 | **39** | 51 |
| Imhotep | 43 | 51 | · | **35** | 56 | 46 | 44 | 44 | 42 | 50 | 44 | 48 | 49 | 49 | **61** | 51 | 42 | 46 | 47 | 45 | 49 | 55 |
| Dandolo | 51 | 46 | **65** | · | 50 | **38** | 59 | 52 | 48 | 48 | 54 | 56 | 55 | 50 | 54 | 54 | 48 | 55 | 51 | 49 | 50 | 44 |
| Khan | 48 | 58 | 44 | 51 | · | 46 | **61** | 49 | 41 | 52 | 55 | 48 | 52 | 59 | 51 | 51 | 50 | 55 | 52 | 52 | 49 | 54 |
| Boudicca | 49 | 59 | 54 | **63** | 54 | · | 50 | 53 | 46 | 50 | 56 | 57 | 56 | 60 | 53 | 44 | 55 | 53 | 55 | 44 | 48 | 52 |
| Nostradamus | 44 | 57 | 56 | 42 | **39** | 50 | · | 56 | 51 | 45 | 48 | 49 | 55 | 52 | 52 | 52 | 54 | 56 | 53 | 48 | 57 | 55 |
| Jeanne | 53 | 58 | 56 | 48 | 51 | 47 | 44 | · | 53 | 45 | 49 | 46 | 43 | 57 | 51 | 51 | 51 | 46 | 47 | 53 | 44 | 50 |
| Ragnar | 52 | 51 | 59 | 53 | 59 | 54 | 50 | 48 | · | 55 | 54 | 46 | 46 | 59 | 53 | 55 | 48 | 54 | 50 | 57 | 52 | 55 |
| Musashi | 54 | 56 | 51 | 52 | 49 | 51 | 55 | 55 | 45 | · | 49 | 47 | 51 | 54 | 49 | 48 | 53 | 49 | 51 | 48 | 51 | 55 |
| Perikles | 51 | 53 | 56 | 47 | 45 | 44 | 52 | 52 | 47 | 51 | · | 48 | 51 | 48 | 53 | 47 | 51 | **37** | 45 | 48 | 49 | 47 |
| Agrippa | 44 | 52 | 53 | 44 | 53 | 43 | 51 | 54 | 54 | 53 | 52 | · | 50 | 50 | 50 | 57 | 49 | 52 | 44 | 44 | 54 | 50 |
| Amanirenas | 49 | 53 | 51 | 45 | 49 | 44 | 45 | 57 | 54 | 50 | 49 | 50 | · | 54 | 43 | 42 | 47 | 47 | 43 | 53 | 52 | 42 |
| Anna | 52 | 52 | 52 | 50 | 41 | 41 | 48 | 43 | 41 | 47 | 53 | 51 | 47 | · | 53 | 53 | 42 | **63** | 49 | 47 | 50 | 45 |
| Nezahualcóyotl | 47 | 53 | **40** | 47 | 49 | 48 | 49 | 50 | 47 | 51 | 47 | 50 | 57 | 48 | · | 47 | 48 | 49 | 43 | 49 | 53 | 48 |
| Masako | 50 | 53 | 49 | 46 | 49 | 56 | 48 | 49 | 45 | 53 | 53 | 43 | 58 | 47 | 53 | · | 50 | 48 | 42 | 44 | 42 | 53 |
| Epaminondas | 53 | 53 | 59 | 52 | 51 | 45 | 46 | 50 | 52 | 47 | 50 | 51 | 53 | 59 | 52 | 50 | · | 51 | 49 | 57 | 44 | 54 |
| Fabius | 53 | 46 | 54 | 45 | 45 | 48 | 44 | 54 | 47 | 51 | **63** | 48 | 53 | **37** | 52 | 53 | 50 | · | 42 | 46 | 53 | 46 |
| Mandukhai | 54 | 57 | 53 | 50 | 49 | 45 | 47 | 53 | 50 | 50 | 55 | 56 | 57 | 51 | 57 | 59 | 52 | 58 | · | 55 | 48 | 56 |
| Baibars | 46 | 55 | 55 | 52 | 49 | 56 | 53 | 48 | 43 | 53 | 53 | 56 | 47 | 53 | 51 | 56 | 43 | 54 | 45 | · | 47 | 51 |
| Žižka | 52 | **62** | 52 | 51 | 51 | 52 | 43 | 56 | 49 | 50 | 51 | 47 | 49 | 50 | 47 | 58 | 56 | 47 | 52 | 53 | · | 42 |
| Fu Hao | 50 | 49 | 45 | 56 | 47 | 49 | 45 | 50 | 45 | 45 | 53 | 51 | 58 | 55 | 52 | 48 | 47 | 54 | 44 | 49 | 59 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 48,8 % aufs Gesicht, 7,7 % auf Bauwerke · **Defensiv** (7 Helden) 40,1 % aufs Gesicht, 9,8 % auf Bauwerke · **Kombinierend** (7 Helden) 44,6 % aufs Gesicht, 9,0 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 21,9, Median 21, 10–90 %: 15–31, kürzeste 8, längste 66. Beginner gewinnt 51,3 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Griechisches Feuer | Anna | 4 | 59,3 % | +10,8 | 46,8 % |
| Goldener Reiter | Khan | 4 | 61,2 % | +10,1 | 47,5 % |
| Warägergardist | Anna | 3 | 58,4 % | +9,9 | 54,6 % |
| Bibliothekar von Konstantinopel | Anna | 4 | 58,3 % | +9,8 | 48,4 % |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 58,2 % | +9,7 | 58,1 % |
| Astrolabienwächter | Hypatia | 3 | 56,5 % | +9,6 | 55,7 % |
| Pilgerin aus Domrémy | Jeanne | 1 | 59,2 % | +9,6 | 52,5 % |
| Phalanxveteran | Leonidas | 5 | 59,7 % | +9,3 | 58,0 % |
| Thermen des Agrippa | Agrippa | 2 | 44,1 % | −5,9 | 54,3 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 42,2 % | −6,3 | 48,0 % |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | 42,2 % | −6,3 | 54,3 % |
| Pyramiden von Gizeh | neutral | 4 | 43,6 % | −6,4 | 27,7 % |
| Leuchtturm von Pharos | Griechische Antike | 3 | 42,6 % | −6,5 | 52,8 % |
| Burgfried | Europäisches Mittelalter | 2 | 44,1 % | −7,1 | 57,7 % |
| Vorgetäuschte Flucht | Baibars | 1 | 40,6 % | −10,0 | 17,1 % |
| Wagenburg am Vítkov | Žižka | 4 | 38,9 % | −11,8 | 59,5 % |

**Legendäre** (AP 5.3) – als Gruppe 53,0 % „gewinnt, wenn gezogen“ (+3,0 gegenüber ihrem Helden, 62351 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Lagertha, Schildmaid | Ragnar | 7 | 58,3 % | +5,9 | 45,8 % |
| Qalawun, Emir der Bahriya | Baibars | 6 | 57,5 % | +6,8 | 46,3 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 56,9 % | +6,6 | 49,1 % |
| Subutai, der Stratege | Khan | 6 | 56,7 % | +5,7 | 43,7 % |
| Wiedervereinigung der Mongolen | Mandukhai | 8 | 55,8 % | +3,1 | 41,7 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 55,6 % | +5,6 | 44,1 % |
| Wu Ding, König der Shang | Fu Hao | 6 | 54,6 % | +4,6 | 49,8 % |
| Jan Hus, Prediger von Bethlehem | Žižka | 5 | 54,2 % | +3,5 | 43,4 % |
| Andraste, Göttin des Sieges | Boudicca | 8 | 53,3 % | +0,8 | 47,2 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 53,2 % | +2,2 | 45,3 % |
| Caterina de’ Medici | Nostradamus | 5 | 52,7 % | +1,9 | 54,1 % |
| Djoser, der Erbauer | Imhotep | 6 | 52,6 % | +5,1 | 51,0 % |
| Herodot, Vater der Geschichte | neutral | 4 | 51,8 % | +1,8 | 43,4 % |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | 51,8 % | +0,7 | 43,3 % |
| Minamoto no Yoritomo | Masako | 6 | 51,2 % | +2,1 | 52,5 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 50,8 % | +2,2 | 52,3 % |
| Sasaki Kojirō, der Rivale | Musashi | 6 | 50,4 % | −0,5 | 45,5 % |
| La Hire, der Unbeugsame | Jeanne | 7 | 50,3 % | +0,7 | 42,4 % |
| Theon von Alexandria | Hypatia | 5 | 50,0 % | +3,1 | 49,5 % |
| Alexios I. Komnenos | Anna | 6 | 49,9 % | +1,4 | 48,7 % |
| Bronzekopf des Augustus | Amanirenas | 6 | 49,6 % | +1,0 | 46,7 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 48,3 % | −1,6 | 40,0 % |
| Marcellus, Schwert Roms | Fabius | 6 | 45,5 % | −3,5 | 48,1 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 42,2 % | −6,3 | 48,0 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 4600 | 80,9 % | 54,7 % | +0,7 | 1220 | 53,1 % | 52,9 % | +2,5 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 4600 | 82,4 % | 54,7 % | +0,7 | 1676 | 57,7 % | 53,7 % | +3,4 |
| Bronzener Wall | Leonidas | 2 | Basis | 4600 | 82,6 % | 55,2 % | +1,2 | 1624 | 50,3 % | 49,2 % | −1,1 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 4600 | 77,3 % | 56,0 % | +2,1 | 1640 | 49,1 % | 49,5 % | −0,9 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1728 | 57,2 % | 53,3 % | +3,0 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1746 | 55,3 % | 50,6 % | +0,3 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1922 | 58,0 % | 59,7 % | +9,3 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1582 | 46,2 % | 52,2 % | +1,8 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 2450 | 53,7 % | 46,6 % | −3,8 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 2056 | 49,1 % | 56,9 % | +6,6 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 4600 | 83,7 % | 50,0 % | −1,6 | 1148 | 55,6 % | 45,7 % | −1,1 |
| Himmelsstrahl | Hypatia | 2 | Basis | 4600 | 87,1 % | 51,9 % | +0,2 | 1658 | 57,2 % | 49,8 % | +2,9 |
| Sternenkundiger | Hypatia | 3 | Basis | 4600 | 82,0 % | 53,3 % | +1,7 | 1938 | 49,1 % | 49,1 % | +2,2 |
| Sternenregen | Hypatia | 4 | Basis | 4600 | 80,1 % | 54,4 % | +2,8 | 1552 | 46,5 % | 53,4 % | +6,6 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1766 | 55,7 % | 56,5 % | +9,6 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1654 | 42,0 % | 47,9 % | +1,1 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1862 | 47,6 % | 50,5 % | +3,7 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 2534 | 56,6 % | 47,1 % | +0,3 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 1900 | 53,2 % | 44,5 % | −2,3 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1982 | 49,5 % | 50,0 % | +3,1 |
| Nilschülerin | Imhotep | 1 | Basis | 4600 | 83,5 % | 48,4 % | −0,4 | 1348 | 57,3 % | 46,7 % | −0,8 |
| Heilender Balsam | Imhotep | 1 | Basis | 4600 | 83,8 % | 50,0 % | +1,2 | 1314 | 58,8 % | 52,3 % | +4,8 |
| Pyramidenwächter | Imhotep | 3 | Basis | 4600 | 83,9 % | 50,2 % | +1,5 | 1928 | 59,1 % | 49,3 % | +1,9 |
| Tempelärztin | Imhotep | 4 | Basis | 4600 | 81,4 % | 49,5 % | +0,8 | 1820 | 52,5 % | 47,2 % | −0,3 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1842 | 53,6 % | 50,3 % | +2,8 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1894 | 60,6 % | 51,0 % | +3,5 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1882 | 49,7 % | 47,3 % | −0,2 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 2054 | 56,4 % | 53,7 % | +6,2 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 2052 | 55,6 % | 45,9 % | −1,6 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 2532 | 51,0 % | 52,6 % | +5,1 |
| Lagunenbote | Dandolo | 1 | Basis | 4600 | 80,3 % | 52,3 % | +2,7 | 1184 | 51,7 % | 54,8 % | +3,9 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 4600 | 79,9 % | 48,7 % | −0,9 | 1652 | 48,4 % | 47,9 % | −3,0 |
| Präziser Stich | Dandolo | 2 | Basis | 4600 | 85,0 % | 51,2 % | +1,5 | 1658 | 53,9 % | 51,6 % | +0,6 |
| Handelsgesandter | Dandolo | 4 | Basis | 4600 | 79,3 % | 53,2 % | +3,5 | 1542 | 51,2 % | 52,9 % | +1,9 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1684 | 39,7 % | 51,3 % | +0,3 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1718 | 53,7 % | 51,5 % | +0,5 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1698 | 43,6 % | 50,5 % | −0,5 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1800 | 51,2 % | 51,1 % | +0,1 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1820 | 33,8 % | 53,4 % | +2,4 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 2380 | 45,3 % | 53,2 % | +2,2 |
| Steppenspäher | Khan | 1 | Basis | 4600 | 75,5 % | 49,5 % | −1,0 | 1190 | 45,3 % | 50,9 % | −0,2 |
| Reiterbogenschütze | Khan | 2 | Basis | 4600 | 77,1 % | 49,6 % | −0,9 | 1722 | 51,2 % | 53,0 % | +2,0 |
| Pfeilschuss | Khan | 2 | Basis | 4600 | 76,0 % | 48,1 % | −2,3 | 1712 | 53,0 % | 51,9 % | +0,8 |
| Goldener Reiter | Khan | 4 | Basis | 4600 | 70,7 % | 55,0 % | +4,6 | 1586 | 47,5 % | 61,2 % | +10,1 |
| Adlerjägerin | Khan | 3 | Gewöhnlich | – | – | – | – | 1726 | 42,4 % | 49,9 % | −1,1 |
| Steppensturm | Khan | 3 | Gewöhnlich | – | – | – | – | 1696 | 47,9 % | 48,9 % | −2,1 |
| Tumenwächter | Khan | 5 | Selten | – | – | – | – | 1858 | 46,9 % | 53,6 % | +2,6 |
| Belagerungsfeuer | Khan | 6 | Selten | – | – | – | – | 2326 | 48,1 % | 53,6 % | +2,6 |
| Keshig-Elite | Khan | 6 | Episch | – | – | – | – | 2370 | 44,2 % | 48,4 % | −2,7 |
| Subutai, der Stratege | Khan | 6 | Legendär | – | – | – | – | 2284 | 43,7 % | 56,7 % | +5,7 |
| Hainwächterin | Boudicca | 1 | Basis | 4600 | 82,9 % | 45,2 % | −1,6 | 1296 | 52,3 % | 53,1 % | +0,6 |
| Eichenhaut | Boudicca | 2 | Basis | 4600 | 74,6 % | 44,9 % | −1,9 | 1710 | 41,2 % | 50,5 % | −2,0 |
| Icenerkrieger | Boudicca | 3 | Basis | 4600 | 85,3 % | 48,1 % | +1,3 | 1718 | 56,5 % | 55,4 % | +2,9 |
| Wilder Hieb | Boudicca | 3 | Basis | 4600 | 85,1 % | 45,3 % | −1,5 | 1718 | 58,0 % | 49,3 % | −3,2 |
| Streitwagenlenkerin | Boudicca | 4 | Gewöhnlich | – | – | – | – | 1550 | 48,2 % | 51,2 % | −1,3 |
| Druidin des Hains | Boudicca | 3 | Gewöhnlich | – | – | – | – | 1760 | 52,7 % | 50,7 % | −1,8 |
| Aufstand | Boudicca | 3 | Selten | – | – | – | – | 1724 | 55,7 % | 55,9 % | +3,3 |
| Eichenkoloss | Boudicca | 6 | Selten | – | – | – | – | 2492 | 53,2 % | 54,8 % | +2,3 |
| Zorn der Königin | Boudicca | 5 | Episch | – | – | – | – | 1838 | 34,7 % | 49,0 % | −3,6 |
| Andraste, Göttin des Sieges | Boudicca | 8 | Legendär | – | – | – | – | 1402 | 47,2 % | 53,3 % | +0,8 |
| Tintenlehrling | Nostradamus | 1 | Basis | 4600 | 85,2 % | 54,2 % | +2,8 | 1366 | 58,7 % | 57,0 % | +6,2 |
| Dunkle Vorahnung | Nostradamus | 2 | Basis | 4600 | 89,1 % | 54,3 % | +2,9 | 1894 | 66,0 % | 54,1 % | +3,2 |
| Maskierter Seher | Nostradamus | 3 | Basis | 4600 | 85,6 % | 52,3 % | +1,0 | 1944 | 49,6 % | 49,8 % | −1,1 |
| Prophezeiung | Nostradamus | 4 | Basis | 4600 | 67,1 % | 51,7 % | +0,3 | 1726 | 23,8 % | 50,0 % | −0,8 |
| Pestdoktor | Nostradamus | 4 | Gewöhnlich | – | – | – | – | 1836 | 58,1 % | 58,5 % | +7,7 |
| Schattenpakt | Nostradamus | 2 | Gewöhnlich | – | – | – | – | 1874 | 60,1 % | 55,2 % | +4,3 |
| Chronist der Nacht | Nostradamus | 5 | Selten | – | – | – | – | 1914 | 53,2 % | 52,1 % | +1,2 |
| Rote Finsternis | Nostradamus | 5 | Selten | – | – | – | – | 2008 | 42,1 % | 54,0 % | +3,2 |
| Wächter der Zeiten | Nostradamus | 6 | Episch | – | – | – | – | 2542 | 60,3 % | 53,6 % | +2,7 |
| Caterina de’ Medici | Nostradamus | 5 | Legendär | – | – | – | – | 1960 | 54,1 % | 52,7 % | +1,9 |
| Bauernrekrut | Jeanne | 1 | Basis | 4600 | 78,7 % | 49,8 % | −0,5 | 1312 | 55,7 % | 54,1 % | +4,6 |
| Bannersegen | Jeanne | 2 | Basis | 4600 | 79,1 % | 50,1 % | −0,2 | 1652 | 50,7 % | 49,3 % | −0,3 |
| Wache von Orléans | Jeanne | 3 | Basis | 4600 | 78,9 % | 51,1 % | +0,8 | 1792 | 56,4 % | 52,4 % | +2,9 |
| Die Fahne erheben | Jeanne | 2 | Basis | 4600 | 77,0 % | 49,0 % | −1,4 | 1664 | 54,3 % | 55,5 % | +6,0 |
| Lilienritter | Jeanne | 4 | Gewöhnlich | – | – | – | – | 1568 | 41,5 % | 51,2 % | +1,7 |
| Heiliger Schutz | Jeanne | 2 | Gewöhnlich | – | – | – | – | 1670 | 46,8 % | 51,2 % | +1,7 |
| Standartenträgerin | Jeanne | 5 | Selten | – | – | – | – | 1840 | 49,5 % | 50,3 % | +0,8 |
| Glocken von Reims | Jeanne | 6 | Selten | – | – | – | – | 2266 | 42,4 % | 51,3 % | +1,8 |
| Paladin der Loire | Jeanne | 7 | Episch | – | – | – | – | 2098 | 41,4 % | 49,2 % | −0,4 |
| La Hire, der Unbeugsame | Jeanne | 7 | Legendär | – | – | – | – | 2016 | 42,4 % | 50,3 % | +0,7 |
| Fjordspäher | Ragnar | 1 | Basis | 4600 | 77,3 % | 47,8 % | −2,3 | 1256 | 50,9 % | 54,6 % | +2,1 |
| Runenblitz | Ragnar | 2 | Basis | 4600 | 81,8 % | 49,5 % | −0,6 | 1648 | 60,3 % | 54,5 % | +2,0 |
| Schildmaid | Ragnar | 3 | Basis | 4600 | 80,7 % | 51,3 % | +1,2 | 1706 | 53,9 % | 56,5 % | +4,0 |
| Runenschnitzer | Ragnar | 4 | Basis | 4600 | 76,4 % | 52,1 % | +2,0 | 1598 | 50,4 % | 54,5 % | +2,1 |
| Donnerschlag | Ragnar | 3 | Gewöhnlich | – | – | – | – | 1758 | 55,8 % | 54,9 % | +2,4 |
| Berserker vom Fjord | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1556 | 47,1 % | 52,0 % | −0,4 |
| Ahnenbund | Ragnar | 3 | Selten | – | – | – | – | 1664 | 53,2 % | 57,9 % | +5,5 |
| Runenhüter | Ragnar | 5 | Selten | – | – | – | – | 1900 | 48,2 % | 50,6 % | −1,8 |
| Sturm der Nordsee | Ragnar | 5 | Episch | – | – | – | – | 1906 | 52,7 % | 54,8 % | +2,3 |
| Lagertha, Schildmaid | Ragnar | 7 | Legendär | – | – | – | – | 2238 | 45,8 % | 58,3 % | +5,9 |
| Dojoschüler | Musashi | 1 | Basis | 4600 | 80,7 % | 48,5 % | −0,5 | 1182 | 52,5 % | 51,1 % | +0,3 |
| Schneller Schnitt | Musashi | 1 | Basis | 4600 | 84,1 % | 49,7 % | +0,7 | 1160 | 51,8 % | 53,7 % | +2,9 |
| Rōnin | Musashi | 3 | Basis | 4600 | 83,2 % | 49,7 % | +0,7 | 1784 | 49,7 % | 52,0 % | +1,1 |
| Konzentration | Musashi | 2 | Basis | 4600 | 73,9 % | 51,0 % | +2,0 | 1698 | 43,3 % | 49,8 % | −1,0 |
| Kirschblütenwache | Musashi | 3 | Gewöhnlich | – | – | – | – | 1764 | 52,9 % | 52,7 % | +1,9 |
| Zwei Himmel | Musashi | 3 | Gewöhnlich | – | – | – | – | 1776 | 37,9 % | 49,5 % | −1,4 |
| Duellant | Musashi | 4 | Selten | – | – | – | – | 1546 | 40,0 % | 47,8 % | −3,0 |
| Der leere Geist | Musashi | 5 | Selten | – | – | – | – | 1826 | 40,4 % | 54,3 % | +3,5 |
| Meister der fünf Ringe | Musashi | 6 | Episch | – | – | – | – | 2388 | 50,4 % | 49,3 % | −1,5 |
| Sasaki Kojirō, der Rivale | Musashi | 6 | Legendär | – | – | – | – | 2234 | 45,5 % | 50,4 % | −0,5 |
| Dorfwache | neutral | 1 | Basis | 101200 | 80,7 % | 49,2 % | −0,8 | 27672 | 53,7 % | 50,1 % | +0,1 |
| Wandernder Händler | neutral | 2 | Basis | 101200 | 80,8 % | 49,0 % | −1,0 | 37554 | 53,3 % | 48,3 % | −1,7 |
| Steinschleuderer | neutral | 2 | Basis | 101200 | 80,9 % | 49,7 % | −0,3 | 37378 | 52,8 % | 50,5 % | +0,6 |
| Grenzläuferin | neutral | 3 | Basis | 101200 | 83,3 % | 49,8 % | −0,2 | 38958 | 55,1 % | 50,3 % | +0,3 |
| Festungsschild | neutral | 4 | Basis | 101200 | 76,9 % | 51,2 % | +1,2 | 36696 | 47,1 % | 50,5 % | +0,6 |
| Kavallerist | neutral | 4 | Basis | 101200 | 78,3 % | 51,3 % | +1,3 | 36200 | 46,8 % | 51,0 % | +1,1 |
| Feldheilerin | neutral | 3 | Basis | 101200 | 80,8 % | 49,6 % | −0,4 | 39638 | 51,5 % | 49,3 % | −0,6 |
| Archivarin | neutral | 4 | Basis | 101200 | 74,7 % | 52,6 % | +2,5 | 36984 | 45,4 % | 50,4 % | +0,4 |
| Wachhund | neutral | 2 | Basis | 101200 | 78,2 % | 49,0 % | −1,0 | 37276 | 50,1 % | 48,3 % | −1,6 |
| Veteran | neutral | 5 | Basis | 101200 | 79,4 % | 52,5 % | +2,5 | 43444 | 50,1 % | 49,0 % | −0,9 |
| Belagerungsturm | neutral | 6 | Basis | 101200 | 76,8 % | 55,2 % | +5,2 | 55452 | 51,6 % | 50,5 % | +0,5 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 39648 | 50,2 % | 50,4 % | +0,4 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 27860 | 53,2 % | 51,6 % | +1,6 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 43460 | 51,4 % | 53,6 % | +3,6 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 39750 | 49,9 % | 50,3 % | +0,3 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 37346 | 49,4 % | 49,7 % | −0,3 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 37568 | 41,0 % | 49,7 % | −0,3 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 27688 | 49,6 % | 47,4 % | −2,6 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 37250 | 57,1 % | 50,0 % | +0,0 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 49376 | 52,6 % | 53,7 % | +3,7 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 39132 | 53,9 % | 50,9 % | +0,9 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 36712 | 47,8 % | 48,8 % | −1,1 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 37690 | 53,3 % | 52,7 % | +2,7 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 36652 | 48,6 % | 52,7 % | +2,8 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 39254 | 56,7 % | 53,0 % | +3,0 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 37186 | 28,8 % | 45,2 % | −4,8 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 36720 | 48,2 % | 47,1 % | −2,9 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 43470 | 47,4 % | 50,8 % | +0,9 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 36572 | 52,9 % | 54,3 % | +4,4 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 36630 | 47,3 % | 54,8 % | +4,9 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 43582 | 52,3 % | 51,4 % | +1,5 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 43548 | 49,5 % | 50,3 % | +0,3 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 37194 | 42,1 % | 49,3 % | −0,6 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 55618 | 54,8 % | 51,0 % | +1,0 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 49492 | 46,7 % | 52,3 % | +2,4 |
| Vergessene Weisheit | neutral | 4 | Episch | – | – | – | – | 36680 | 24,6 % | 49,2 % | −0,7 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 34340 | 45,1 % | 59,0 % | +9,0 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 49340 | 54,8 % | 52,4 % | +2,4 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 36234 | 43,4 % | 51,8 % | +1,8 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 34088 | 44,1 % | 55,6 % | +5,6 |
| Agent des Zehnerrats | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1704 | 60,1 % | 51,3 % | +0,4 |
| Tributeintreiber | Khan | 3 | Gewöhnlich | – | – | – | – | 1746 | 51,3 % | 49,9 % | −1,1 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1858 | 55,6 % | 50,7 % | +3,2 |
| Brand von Londinium | Boudicca | 3 | Selten | – | – | – | – | 1728 | 51,6 % | 53,7 % | +1,2 |
| Bannbulle | Nostradamus | 1 | Selten | – | – | – | – | 1458 | 59,7 % | 53,2 % | +2,3 |
| Plünderer von Paris | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1672 | 46,5 % | 50,0 % | −2,5 |
| Zorn des Donnergottes | Ragnar | 1 | Gewöhnlich | – | – | – | – | 1278 | 61,2 % | 55,8 % | +3,3 |
| Shinobi aus Iga | Musashi | 2 | Gewöhnlich | – | – | – | – | 1720 | 51,8 % | 54,0 % | +3,2 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 37052 | 51,8 % | 48,0 % | −1,9 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 27842 | 54,9 % | 52,1 % | +2,1 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 37616 | 56,9 % | 52,9 % | +2,9 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 38978 | 51,0 % | 52,2 % | +2,2 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 39306 | 55,3 % | 50,2 % | +0,3 |
| Ruderer der Triere | Perikles | 1 | Basis | 4600 | 79,3 % | 50,6 % | +1,5 | 1184 | 56,3 % | 55,8 % | +7,2 |
| Lange Mauern | Perikles | 2 | Basis | 4600 | 79,7 % | 45,7 % | −3,4 | 1594 | 56,5 % | 43,6 % | −5,0 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 4600 | 81,7 % | 52,6 % | +3,4 | 1696 | 56,4 % | 54,5 % | +5,9 |
| Strategos | Perikles | 3 | Basis | 4600 | 79,8 % | 51,9 % | +2,7 | 1678 | 57,0 % | 53,8 % | +5,2 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1694 | 48,2 % | 45,0 % | −3,6 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1674 | 59,7 % | 53,9 % | +5,3 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1498 | 53,0 % | 54,2 % | +5,6 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1636 | 39,2 % | 51,9 % | +3,3 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1582 | 36,3 % | 43,4 % | −5,2 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 2416 | 52,3 % | 50,8 % | +2,2 |
| Pilumwerfer | Agrippa | 1 | Basis | 4600 | 77,7 % | 52,7 % | +3,9 | 1236 | 55,8 % | 53,6 % | +3,6 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 4600 | 73,0 % | 50,1 % | +1,4 | 1684 | 45,7 % | 52,7 % | +2,8 |
| Castra | Agrippa | 3 | Basis | 4600 | 83,3 % | 50,4 % | +1,7 | 1736 | 58,0 % | 47,5 % | −2,5 |
| Testudo | Agrippa | 2 | Basis | 4600 | 74,5 % | 50,8 % | +2,1 | 1718 | 49,5 % | 52,4 % | +2,4 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1726 | 53,2 % | 52,1 % | +2,2 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1692 | 49,2 % | 54,1 % | +4,1 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1982 | 53,1 % | 52,0 % | +2,0 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1632 | 54,3 % | 44,1 % | −5,9 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1618 | 42,2 % | 48,6 % | −1,4 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1918 | 40,0 % | 48,3 % | −1,6 |
| Bogenschütze von Ta-Seti | Amanirenas | 1 | Basis | 4600 | 82,5 % | 51,6 % | −0,2 | 1398 | 57,7 % | 49,0 % | +0,5 |
| Wüstenreiter | Amanirenas | 2 | Basis | 4600 | 80,8 % | 51,3 % | −0,5 | 1834 | 55,8 % | 45,4 % | −3,1 |
| Pfeilregen von Kusch | Amanirenas | 2 | Basis | 4600 | 78,6 % | 52,7 % | +0,9 | 1874 | 43,8 % | 48,9 % | +0,3 |
| Speerträger von Napata | Amanirenas | 3 | Basis | 4600 | 84,1 % | 52,6 % | +0,8 | 1932 | 55,2 % | 50,0 % | +1,5 |
| Wächter des Löwentempels | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1858 | 55,2 % | 51,4 % | +2,8 |
| Kundschafter aus Meroë | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1918 | 56,5 % | 49,2 % | +0,7 |
| Kriegselefant von Kusch | Amanirenas | 6 | Selten | – | – | – | – | 2552 | 54,5 % | 51,3 % | +2,8 |
| Überfall auf Syene | Amanirenas | 3 | Selten | – | – | – | – | 2022 | 56,0 % | 45,4 % | −3,1 |
| Akinidad, Prinz von Kusch | Amanirenas | 5 | Episch | – | – | – | – | 2038 | 55,9 % | 44,7 % | −3,8 |
| Bronzekopf des Augustus | Amanirenas | 6 | Legendär | – | – | – | – | 2434 | 46,7 % | 49,6 % | +1,0 |
| Kopistin der Chronik | Anna | 1 | Basis | 4600 | 81,5 % | 53,9 % | +3,0 | 1326 | 54,1 % | 52,3 % | +3,8 |
| Pantokrator-Spital | Anna | 3 | Basis | 4600 | 73,3 % | 51,9 % | +0,9 | 1684 | 31,6 % | 50,2 % | +1,7 |
| Warägergardist | Anna | 3 | Basis | 4600 | 82,6 % | 55,6 % | +4,6 | 1770 | 54,6 % | 58,4 % | +9,9 |
| Hofärztin | Anna | 3 | Basis | 4600 | 81,6 % | 51,0 % | +0,1 | 1758 | 42,0 % | 46,1 % | −2,4 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1644 | 46,8 % | 59,3 % | +10,8 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1586 | 48,4 % | 58,3 % | +9,8 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1872 | 49,0 % | 55,9 % | +7,4 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1782 | 38,0 % | 48,7 % | +0,2 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1830 | 49,2 % | 51,3 % | +2,8 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 2378 | 48,7 % | 49,9 % | +1,4 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 4600 | 82,4 % | 49,2 % | +0,0 | 1298 | 55,7 % | 51,1 % | +2,6 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 4600 | 81,7 % | 49,4 % | +0,2 | 1728 | 54,7 % | 49,5 % | +1,0 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 4600 | 83,2 % | 49,9 % | +0,7 | 1768 | 57,7 % | 49,7 % | +1,2 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 4600 | 82,7 % | 48,6 % | −0,6 | 1980 | 59,7 % | 48,9 % | +0,5 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1814 | 55,0 % | 45,3 % | −3,1 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1748 | 54,7 % | 49,5 % | +1,0 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1758 | 54,7 % | 50,1 % | +1,6 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1818 | 54,3 % | 42,2 % | −6,3 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 2686 | 58,1 % | 58,2 % | +9,7 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 2116 | 48,0 % | 42,2 % | −6,3 |
| Gokenin aus Sagami | Masako | 1 | Basis | 4600 | 82,2 % | 46,3 % | −2,5 | 1114 | 57,8 % | 48,1 % | −1,0 |
| Bogenreiter aus Kamakura | Masako | 2 | Basis | 4600 | 82,7 % | 47,3 % | −1,5 | 1548 | 57,4 % | 51,5 % | +2,4 |
| Treueschwur | Masako | 1 | Basis | 4600 | 82,6 % | 50,4 % | +1,7 | 1158 | 54,4 % | 55,4 % | +6,3 |
| Nonne von Kamakura | Masako | 2 | Basis | 4600 | 82,8 % | 47,1 % | −1,7 | 1628 | 58,0 % | 51,7 % | +2,6 |
| Rokuhara-Späher | Masako | 2 | Gewöhnlich | – | – | – | – | 1570 | 56,6 % | 52,5 % | +3,4 |
| Aufgebot von Jōkyū | Masako | 4 | Gewöhnlich | – | – | – | – | 1726 | 55,7 % | 54,3 % | +5,2 |
| Tsurugaoka Hachiman-gū | Masako | 2 | Selten | – | – | – | – | 1632 | 56,5 % | 46,7 % | −2,5 |
| Verbannung nach Oki | Masako | 3 | Selten | – | – | – | – | 1790 | 51,8 % | 46,8 % | −2,3 |
| Hōjō Yoshitoki, Regent | Masako | 5 | Episch | – | – | – | – | 1968 | 54,5 % | 51,9 % | +2,7 |
| Minamoto no Yoritomo | Masako | 6 | Legendär | – | – | – | – | 2572 | 52,5 % | 51,2 % | +2,1 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1782 | 56,6 % | 53,8 % | +3,5 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1700 | 53,4 % | 45,9 % | −4,4 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1626 | 56,1 % | 46,5 % | −0,3 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1662 | 52,6 % | 50,6 % | +3,8 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1944 | 60,2 % | 47,6 % | +0,1 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1820 | 60,8 % | 43,6 % | −3,9 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1690 | 48,1 % | 50,1 % | −0,8 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 2424 | 44,6 % | 53,7 % | +2,7 |
| Jurtenlager | Khan | 3 | Gewöhnlich | – | – | – | – | 1750 | 35,6 % | 46,1 % | −5,0 |
| Kurultai | Khan | 4 | Selten | – | – | – | – | 1582 | 29,6 % | 48,2 % | −2,8 |
| Barde der Icener | Boudicca | 2 | Gewöhnlich | – | – | – | – | 1724 | 55,7 % | 53,8 % | +1,3 |
| Sichelwagen | Boudicca | 5 | Selten | – | – | – | – | 1870 | 49,8 % | 55,1 % | +2,6 |
| Almanach der Quatrains | Nostradamus | 1 | Gewöhnlich | – | – | – | – | 1324 | 59,6 % | 53,3 % | +2,4 |
| Horoskop der Königin | Nostradamus | 3 | Selten | – | – | – | – | 1940 | 2,8 % | 45,7 % | −5,1 |
| Pilgerin aus Domrémy | Jeanne | 1 | Gewöhnlich | – | – | – | – | 1306 | 52,5 % | 59,2 % | +9,6 |
| Die Weihe von Reims | Jeanne | 4 | Selten | – | – | – | – | 1644 | 32,7 % | 48,9 % | −0,6 |
| Runenmeisterin | Ragnar | 2 | Gewöhnlich | – | – | – | – | 1570 | 53,1 % | 54,5 % | +2,0 |
| Berserkergang | Ragnar | 1 | Selten | – | – | – | – | 1294 | 59,5 % | 51,6 % | −0,9 |
| Schwertschüler aus Kokura | Musashi | 4 | Selten | – | – | – | – | 1550 | 45,9 % | 45,2 % | −5,6 |
| Niten Ichi-ryū | Musashi | 2 | Gewöhnlich | – | – | – | – | 1614 | 48,7 % | 49,6 % | −1,2 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1580 | 50,8 % | 53,4 % | +4,8 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1694 | 28,3 % | 46,7 % | −1,9 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1662 | 49,4 % | 46,7 % | −3,3 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1624 | 39,7 % | 48,7 % | −1,2 |
| Pfeilmacher aus Meroë | Amanirenas | 2 | Gewöhnlich | – | – | – | – | 1862 | 56,9 % | 49,8 % | +1,3 |
| Gift der Wüstenviper | Amanirenas | 3 | Selten | – | – | – | – | 1904 | 46,2 % | 51,3 % | +2,8 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1740 | 54,9 % | 49,3 % | +0,8 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 2348 | 57,8 % | 55,7 % | +7,2 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1788 | 57,8 % | 50,6 % | +2,1 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1776 | 52,5 % | 47,3 % | −1,2 |
| Jitō-Verwalter | Masako | 2 | Gewöhnlich | – | – | – | – | 1588 | 55,9 % | 47,1 % | −2,0 |
| Siegel des Shikken | Masako | 2 | Selten | – | – | – | – | 1542 | 47,4 % | 49,7 % | +0,6 |
| Olympionike | Griechische Antike | 4 | Gewöhnlich | – | – | – | – | 6578 | 52,8 % | 55,7 % | +6,5 |
| Rhapsode | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 6566 | 51,9 % | 52,6 % | +3,4 |
| Marathonläufer | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 6544 | 51,9 % | 53,2 % | +4,0 |
| Orakel von Delphi | Griechische Antike | 3 | Selten | – | – | – | – | 6972 | 28,7 % | 47,6 % | −1,6 |
| Leuchtturm von Pharos | Griechische Antike | 3 | Selten | – | – | – | – | 7096 | 52,8 % | 42,6 % | −6,5 |
| Akropolis | Griechische Antike | 2 | Selten | – | – | – | – | 6460 | 54,2 % | 48,7 % | −0,5 |
| Bibliothek von Alexandria | Griechische Antike | 3 | Episch | – | – | – | – | 7068 | 48,7 % | 47,0 % | −2,2 |
| Knappe | Europäisches Mittelalter | 1 | Gewöhnlich | – | – | – | – | 6406 | 53,5 % | 53,0 % | +1,7 |
| Armbrustschütze | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 8884 | 58,4 % | 55,8 % | +4,5 |
| Mönch von Cluny | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 8760 | 50,5 % | 53,9 % | +2,7 |
| Hansekogge | Europäisches Mittelalter | 4 | Gewöhnlich | – | – | – | – | 8064 | 47,8 % | 50,2 % | −1,0 |
| Turnierritter | Europäisches Mittelalter | 4 | Selten | – | – | – | – | 8102 | 51,3 % | 55,2 % | +4,0 |
| Burgfried | Europäisches Mittelalter | 2 | Selten | – | – | – | – | 8400 | 57,7 % | 44,1 % | −7,1 |
| Tribok | Europäisches Mittelalter | 4 | Episch | – | – | – | – | 7960 | 32,5 % | 48,7 % | −2,4 |
| Ashigaru | China, Korea, Japan | 1 | Gewöhnlich | – | – | – | – | 3598 | 54,2 % | 53,4 % | +3,4 |
| Mandarin-Gelehrter | China, Korea, Japan | 3 | Gewöhnlich | – | – | – | – | 5422 | 51,9 % | 52,4 % | +2,5 |
| Teezeremonie | China, Korea, Japan | 2 | Gewöhnlich | – | – | – | – | 4876 | 43,8 % | 48,3 % | −1,6 |
| Hwacha-Salve | China, Korea, Japan | 3 | Selten | – | – | – | – | 5416 | 56,4 % | 50,5 % | +0,6 |
| Schildkrötenschiff | China, Korea, Japan | 5 | Selten | – | – | – | – | 5846 | 54,8 % | 49,4 % | −0,5 |
| Terrakotta-Armee | China, Korea, Japan | 5 | Episch | – | – | – | – | 5840 | 55,8 % | 51,0 % | +1,1 |
| Große Mauer | China, Korea, Japan | 2 | Episch | – | – | – | – | 4954 | 60,3 % | 44,9 % | −5,1 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 39266 | 32,5 % | 45,1 % | −4,9 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 37598 | 57,0 % | 45,1 % | −4,9 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 36970 | 27,7 % | 43,6 % | −6,4 |
| Thebanischer Plänkler | Epaminondas | 1 | Basis | 4600 | 78,1 % | 48,3 % | −0,3 | 1322 | 52,0 % | 55,6 % | +4,6 |
| Böotischer Hoplit | Epaminondas | 2 | Basis | 4600 | 78,7 % | 48,4 % | −0,2 | 1702 | 53,0 % | 55,5 % | +4,5 |
| Fünfzig Schilde tief | Epaminondas | 2 | Basis | 4600 | 74,3 % | 48,7 % | +0,1 | 1714 | 46,6 % | 52,0 % | +0,9 |
| Böotarch | Epaminondas | 3 | Basis | 4600 | 78,1 % | 48,6 % | +0,0 | 1828 | 52,0 % | 55,7 % | +4,7 |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | Gewöhnlich | – | – | – | – | 1918 | 48,8 % | 57,3 % | +6,2 |
| Schlacht bei Leuktra | Epaminondas | 4 | Gewöhnlich | – | – | – | – | 1574 | 42,2 % | 52,3 % | +1,3 |
| Befreiung Messeniens | Epaminondas | 5 | Selten | – | – | – | – | 1908 | 49,5 % | 52,1 % | +1,0 |
| Thebanischer Phalangit | Epaminondas | 4 | Selten | – | – | – | – | 1624 | 45,9 % | 56,9 % | +5,8 |
| Megalopolis | Epaminondas | 3 | Episch | – | – | – | – | 1712 | 43,7 % | 45,8 % | −5,2 |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | Legendär | – | – | – | – | 2578 | 43,3 % | 51,8 % | +0,7 |
| Veles | Fabius | 1 | Basis | 4600 | 88,2 % | 48,7 % | −0,2 | 1274 | 59,1 % | 54,6 % | +5,6 |
| Triarier | Fabius | 2 | Basis | 4600 | 86,7 % | 49,0 % | +0,1 | 1634 | 56,6 % | 51,6 % | +2,6 |
| Hinhalten | Fabius | 2 | Basis | 4600 | 85,5 % | 48,9 % | +0,0 | 1650 | 59,5 % | 49,1 % | +0,2 |
| Konsul der Republik | Fabius | 4 | Basis | 4600 | 84,7 % | 49,4 % | +0,6 | 1672 | 48,9 % | 49,8 % | +0,9 |
| Verbrannte Erde | Fabius | 3 | Gewöhnlich | – | – | – | – | 1834 | 63,2 % | 47,4 % | −1,6 |
| Späher am Volturnus | Fabius | 2 | Gewöhnlich | – | – | – | – | 1718 | 58,4 % | 49,5 % | +0,5 |
| Minucius, der Reiteroberst | Fabius | 4 | Selten | – | – | – | – | 1740 | 51,1 % | 52,9 % | +3,9 |
| Rückeroberung von Tarent | Fabius | 6 | Selten | – | – | – | – | 2468 | 45,3 % | 55,0 % | +6,0 |
| Lager auf den Höhen | Fabius | 3 | Episch | – | – | – | – | 1758 | 64,0 % | 47,3 % | −1,6 |
| Marcellus, Schwert Roms | Fabius | 6 | Legendär | – | – | – | – | 2470 | 48,1 % | 45,5 % | −3,5 |
| Botin der Stämme | Mandukhai | 1 | Basis | 4600 | 77,4 % | 53,1 % | +2,5 | 1256 | 50,2 % | 59,4 % | +6,7 |
| Hüterin des Herdfeuers | Mandukhai | 2 | Basis | 4600 | 78,8 % | 51,4 % | +0,8 | 1686 | 50,1 % | 50,3 % | −2,4 |
| Ruf der Tumen | Mandukhai | 3 | Basis | 4600 | 72,5 % | 49,1 % | −1,5 | 1718 | 41,2 % | 50,6 % | −2,1 |
| Bogenreiterin der Chahar | Mandukhai | 3 | Basis | 4600 | 80,5 % | 52,5 % | +1,9 | 1752 | 53,5 % | 52,7 % | +0,0 |
| Schlacht von Tas Bürd | Mandukhai | 4 | Gewöhnlich | – | – | – | – | 1710 | 46,0 % | 53,0 % | +0,3 |
| Zwilling der Khatun | Mandukhai | 3 | Gewöhnlich | – | – | – | – | 1830 | 52,4 % | 57,0 % | +4,3 |
| Schwarzes Banner | Mandukhai | 2 | Selten | – | – | – | – | 1708 | 59,5 % | 48,1 % | −4,6 |
| Unterwerfung der Oiraten | Mandukhai | 5 | Selten | – | – | – | – | 2132 | 45,8 % | 56,8 % | +4,1 |
| Batu Möngke, der junge Khan | Mandukhai | 4 | Episch | – | – | – | – | 1564 | 44,4 % | 52,1 % | −0,6 |
| Wiedervereinigung der Mongolen | Mandukhai | 8 | Legendär | – | – | – | – | 1632 | 41,7 % | 55,8 % | +3,1 |
| Mamlukenrekrut | Baibars | 1 | Basis | 4600 | 83,2 % | 49,9 % | −1,4 | 1268 | 51,5 % | 51,3 % | +0,7 |
| Barid-Kurier | Baibars | 2 | Basis | 4600 | 79,3 % | 52,2 % | +0,9 | 1644 | 47,8 % | 51,5 % | +0,9 |
| Ain Dschalut | Baibars | 3 | Basis | 4600 | 85,3 % | 52,4 % | +1,1 | 1822 | 58,6 % | 53,7 % | +3,1 |
| Bogenreiter der Bahriya | Baibars | 3 | Basis | 4600 | 83,2 % | 50,5 % | −0,8 | 1714 | 48,9 % | 48,5 % | −2,2 |
| Manjaniq-Meister | Baibars | 4 | Gewöhnlich | – | – | – | – | 1622 | 50,2 % | 53,7 % | +3,1 |
| Vorgetäuschte Flucht | Baibars | 1 | Gewöhnlich | – | – | – | – | 1200 | 17,1 % | 40,6 % | −10,0 |
| Qutuz, Sultan von Ägypten | Baibars | 5 | Selten | – | – | – | – | 2052 | 44,4 % | 56,2 % | +5,6 |
| Sturm auf Antiochia | Baibars | 2 | Selten | – | – | – | – | 1660 | 46,5 % | 48,7 % | −1,9 |
| Zitadelle von Kairo | Baibars | 4 | Episch | – | – | – | – | 1744 | 34,6 % | 49,0 % | −1,6 |
| Qalawun, Emir der Bahriya | Baibars | 6 | Legendär | – | – | – | – | 2720 | 46,3 % | 57,5 % | +6,8 |
| Dreschflegelbauer | Žižka | 2 | Basis | 4600 | 76,7 % | 48,0 % | −1,1 | 1750 | 30,0 % | 49,5 % | −1,2 |
| Píšťala-Schütze | Žižka | 2 | Basis | 4600 | 84,0 % | 50,1 % | +1,0 | 1666 | 62,5 % | 55,5 % | +4,8 |
| Salve aus der Wagenburg | Žižka | 2 | Basis | 4600 | 78,0 % | 47,9 % | −1,2 | 1788 | 33,8 % | 47,1 % | −3,6 |
| Hauptmann der Taboriten | Žižka | 3 | Basis | 4600 | 83,8 % | 50,7 % | +1,6 | 1884 | 60,0 % | 56,7 % | +6,0 |
| Hakenbüchsenwagen | Žižka | 3 | Gewöhnlich | – | – | – | – | 1772 | 58,9 % | 50,2 % | −0,5 |
| Laienkelch | Žižka | 2 | Gewöhnlich | – | – | – | – | 1654 | 45,3 % | 53,6 % | +2,9 |
| Prager Fenstersturz | Žižka | 3 | Selten | – | – | – | – | 1800 | 50,4 % | 49,8 % | −0,9 |
| Wagenburg am Vítkov | Žižka | 4 | Selten | – | – | – | – | 1638 | 59,5 % | 38,9 % | −11,8 |
| Prokop der Kahle | Žižka | 6 | Episch | – | – | – | – | 2566 | 58,0 % | 51,4 % | +0,7 |
| Jan Hus, Prediger von Bethlehem | Žižka | 5 | Legendär | – | – | – | – | 1984 | 43,4 % | 54,2 % | +3,5 |
| Bogenschützin der Shang | Fu Hao | 1 | Basis | 4600 | 83,3 % | 53,7 % | +2,6 | 1290 | 58,1 % | 52,1 % | +2,1 |
| Bronzene Yue-Axt | Fu Hao | 2 | Basis | 4600 | 76,4 % | 54,0 % | +3,0 | 1756 | 42,8 % | 52,6 % | +2,6 |
| Streitwagen der Shang | Fu Hao | 3 | Basis | 4600 | 82,9 % | 52,9 % | +1,8 | 1784 | 51,5 % | 50,6 % | +0,6 |
| Knochenwahrsager | Fu Hao | 3 | Basis | 4600 | 81,9 % | 52,9 % | +1,8 | 1864 | 44,2 % | 50,0 % | +0,0 |
| Aufgebot gegen die Qiang | Fu Hao | 4 | Gewöhnlich | – | – | – | – | 1758 | 50,4 % | 53,4 % | +3,4 |
| Ahnenopfer | Fu Hao | 1 | Gewöhnlich | – | – | – | – | 1190 | 52,0 % | 55,7 % | +5,7 |
| Gravierte Schulterblätter | Fu Hao | 1 | Selten | – | – | – | – | 1234 | 59,0 % | 51,7 % | +1,7 |
| Bogenschützinnen der Fu Hao | Fu Hao | 4 | Selten | – | – | – | – | 1628 | 56,1 % | 54,9 % | +4,9 |
| Ahnentempel von Yin | Fu Hao | 1 | Episch | – | – | – | – | 1202 | 60,2 % | 52,4 % | +2,4 |
| Wu Ding, König der Shang | Fu Hao | 6 | Legendär | – | – | – | – | 2552 | 49,8 % | 54,6 % | +4,6 |
| Gladiator | Rom | 3 | Gewöhnlich | – | – | – | – | 3376 | 59,4 % | 52,2 % | +2,8 |
| Senator der Kurie | Rom | 3 | Gewöhnlich | – | – | – | – | 3506 | 48,4 % | 50,4 % | +1,0 |
| Centurio | Rom | 2 | Gewöhnlich | – | – | – | – | 3488 | 56,0 % | 55,2 % | +5,8 |
| Triumphzug | Rom | 3 | Selten | – | – | – | – | 3468 | 42,9 % | 47,7 % | −1,8 |
| Via Appia | Rom | 2 | Selten | – | – | – | – | 3442 | 54,9 % | 49,4 % | −0,0 |
| Vestalin am ewigen Feuer | Rom | 3 | Selten | – | – | – | – | 3464 | 56,4 % | 49,1 % | −0,4 |
| Pax Romana | Rom | 5 | Episch | – | – | – | – | 3948 | 54,9 % | 44,1 % | −5,4 |
| Pferdehirtin | Persien & Steppe | 2 | Gewöhnlich | – | – | – | – | 3256 | 47,4 % | 54,8 % | +2,9 |
| Schamane des Ewigen Himmels | Persien & Steppe | 3 | Gewöhnlich | – | – | – | – | 3436 | 47,8 % | 54,2 % | +2,3 |
| Parthischer Schuss | Persien & Steppe | 2 | Gewöhnlich | – | – | – | – | 3364 | 54,4 % | 54,6 % | +2,7 |
| Garde der Unsterblichen | Persien & Steppe | 4 | Selten | – | – | – | – | 3326 | 42,3 % | 49,6 % | −2,4 |
| Pfeilsturm der Steppe | Persien & Steppe | 3 | Selten | – | – | – | – | 3440 | 47,8 % | 52,5 % | +0,6 |
| Königsstraße | Persien & Steppe | 2 | Selten | – | – | – | – | 3492 | 50,1 % | 50,0 % | −1,9 |
| Persepolis | Persien & Steppe | 3 | Episch | – | – | – | – | 3580 | 44,0 % | 53,5 % | +1,6 |
| Akrit der Grenzmark | Byzanz & islamische Welt | 2 | Gewöhnlich | – | – | – | – | 3370 | 54,4 % | 53,1 % | +3,6 |
| Gelehrter im Haus der Weisheit | Byzanz & islamische Welt | 3 | Gewöhnlich | – | – | – | – | 3492 | 50,3 % | 51,4 % | +1,9 |
| Tribut in Goldbyzantinern | Byzanz & islamische Welt | 2 | Gewöhnlich | – | – | – | – | 3408 | 26,8 % | 47,9 % | −1,6 |
| Arzt des Bimaristan | Byzanz & islamische Welt | 3 | Selten | – | – | – | – | 3564 | 58,2 % | 55,4 % | +5,8 |
| Theodosianische Mauern | Byzanz & islamische Welt | 2 | Selten | – | – | – | – | 3362 | 56,1 % | 47,3 % | −2,2 |
| Hagia Sophia | Byzanz & islamische Welt | 3 | Episch | – | – | – | – | 3430 | 60,3 % | 46,2 % | −3,4 |
| Ibn an-Nafis, Arzt von Kairo | Byzanz & islamische Welt | 4 | Episch | – | – | – | – | 3184 | 52,8 % | 54,2 % | +4,6 |
