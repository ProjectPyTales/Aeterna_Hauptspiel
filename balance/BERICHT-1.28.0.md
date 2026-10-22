# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `5d7de9e7ac` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die 21 anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,5.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 50600 | ✗ 21/22 | ✗ 198/231 | ✓ 47,3 % | – | 0 | 24 |
| Zufallsdecks | 50600 | ✗ 18/22 | ✗ 219/231 | ✓ 50,7 % | ✓ 53,2 % (+3,2) | 0 | 22 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Leonidas I. | **53,7 %** | 52,1 % | 54,7 % | Epaminondas 40,0 % | Fabius 72,0 % | Defensiv: 36,6 % | ✗ |
| Hypatia | **52,8 %** | 49,6 % | 55,6 % | Anna 43,0 % | Theophanu 66,0 % | Kombinierend: 49,0 % | ✓ |
| Imhotep | **52,1 %** | 48,8 % | 55,0 % | Vix 39,5 % | Vercingetorix 61,5 % | Defensiv: 35,8 % | ✓ |
| Ahhotep I. | **51,7 %** | 50,6 % | 52,5 % | Leonidas 36,5 % | Baibars 61,0 % | Aggressiv: 45,9 % | ✓ |
| Johann Friedrich Böttger | **51,2 %** | 52,2 % | 49,9 % | Widukind 39,5 % | Fabius 61,5 % | Kombinierend: 41,6 % | ✓ |
| Fürstin von Vix | **51,1 %** | 52,0 % | 50,0 % | Widukind 33,0 % | Anna 63,5 % | Kombinierend: 40,5 % | ✓ |
| Anna Komnene | **50,7 %** | 51,7 % | 49,5 % | Vix 36,5 % | Fabius 68,5 % | Kombinierend: 39,4 % | ✓ |
| Baibars | **50,6 %** | 49,3 % | 51,9 % | Fabius 32,5 % | Wiprecht 63,0 % | Aggressiv: 40,6 % | ✓ |
| Hildegard von Bingen | **50,6 %** | 46,3 % | 54,7 % | Hypatia 39,0 % | Ulrich 62,0 % | Aggressiv: 52,0 % | ✓ |
| Thusnelda | **50,5 %** | 47,1 % | 53,9 % | Widukind 39,0 % | Fabius 67,5 % | Kombinierend: 44,9 % | ✓ |
| Widukind | **50,2 %** | 45,8 % | 54,5 % | Vauban 38,0 % | Agrippa 67,5 % | Aggressiv: 45,8 % | ✓ |
| Enrico Dandolo | **49,8 %** | 48,3 % | 51,3 % | Widukind 41,5 % | Wiprecht 54,5 % | Kombinierend: 41,4 % | ✓ |
| Wiprecht von Groitzsch | **49,5 %** | 46,5 % | 52,7 % | Baibars 37,0 % | Fabius 60,5 % | Aggressiv: 42,5 % | ✓ |
| Perikles | **48,9 %** | 44,6 % | 53,3 % | Hildegard 42,5 % | Agrippa 57,5 % | Defensiv: 39,2 % | ✓ |
| Vauban | **48,8 %** | 42,7 % | 55,2 % | Nezahualcóyotl 38,0 % | Theophanu 64,0 % | Defensiv: 41,3 % | ✓ |
| Vercingetorix | **48,7 %** | 44,0 % | 53,7 % | Fabius 36,5 % | Ulrich 61,0 % | Aggressiv: 45,5 % | ✓ |
| Ulrich von Liechtenstein | **48,7 %** | 46,1 % | 51,6 % | Hildegard 38,0 % | Dandolo 56,0 % | Aggressiv: 48,3 % | ✓ |
| Nezahualcóyotl | **48,5 %** | 46,0 % | 51,4 % | Baibars 39,5 % | Vauban 62,0 % | Defensiv: 38,4 % | ✓ |
| Fabius Maximus | **48,4 %** | 46,3 % | 50,7 % | Leonidas 28,0 % | Epaminondas 70,5 % | Defensiv: 39,4 % | ✓ |
| Marcus Agrippa | **48,2 %** | 43,8 % | 52,9 % | Widukind 32,5 % | Vauban 57,0 % | Kombinierend: 44,0 % | ✓ |
| Epaminondas | **47,7 %** | 45,0 % | 50,7 % | Fabius 29,5 % | Leonidas 60,0 % | Aggressiv: 42,5 % | ✓ |
| Theophanu | **47,6 %** | 42,9 % | 52,7 % | Hypatia 34,0 % | Widukind 59,0 % | Defensiv: 39,6 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Widu. | Verc. | Bött. | Hild. | Wipr. | Ulri. | Peri. | Agri. | Ahho. | Anna. | Neza. | Theo. | Epam. | Fabi. | Thus. | Baib. | Vaub. | Vix. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 50 | 51 | 50 | 52 | 55 | 55 | 57 | 54 | 53 | 55 | 55 | **64** | 52 | 59 | 48 | 40 | **72** | 56 | 45 | **62** | 48 |
| Hypatia | 50 | · | 56 | 46 | 50 | 50 | 49 | **61** | 59 | 45 | 53 | 49 | 49 | 43 | 54 | **66** | **63** | 59 | 49 | 58 | 55 | 47 |
| Imhotep | 50 | 44 | · | 51 | 56 | **62** | 41 | 44 | 53 | 57 | 56 | 50 | 57 | 47 | 60 | 58 | 55 | 49 | 57 | 53 | 58 | **40** |
| Dandolo | 51 | 54 | 50 | · | 42 | 52 | 42 | 46 | 55 | 44 | 54 | 52 | 45 | 50 | 52 | 54 | 49 | 50 | 53 | 51 | 54 | 50 |
| Widukind | 48 | 50 | 44 | 59 | · | 43 | **61** | 46 | 47 | 47 | 52 | **68** | 47 | 51 | 49 | 41 | 48 | 47 | **61** | 43 | **38** | **67** |
| Vercingetorix | 45 | 50 | **39** | 48 | 57 | · | 46 | 54 | 48 | **61** | 49 | 45 | 44 | 53 | 51 | 54 | 56 | **37** | 48 | 55 | 43 | 45 |
| Böttger | 45 | 52 | 60 | 58 | **40** | 54 | · | 45 | 48 | 47 | 51 | 55 | 44 | 46 | 56 | 52 | 49 | **62** | 53 | 53 | 60 | 50 |
| Hildegard | 43 | **39** | 56 | 54 | 54 | 47 | 55 | · | **61** | **62** | 57 | 51 | 43 | 52 | 47 | 42 | 55 | 48 | 46 | 53 | 41 | 59 |
| Wiprecht | 46 | 41 | 47 | 45 | 53 | 52 | 53 | **39** | · | 45 | 48 | 53 | 56 | 52 | 60 | 49 | 51 | **61** | 48 | **37** | 49 | 60 |
| Ulrich | 48 | 55 | 43 | 56 | 53 | **39** | 53 | **38** | 55 | · | 50 | 52 | 44 | 52 | 49 | 45 | 56 | 42 | 54 | 49 | 43 | 50 |
| Perikles | 45 | 47 | 44 | 47 | 49 | 51 | 50 | 43 | 52 | 50 | · | 57 | 47 | 54 | 51 | 48 | 52 | 53 | 46 | 44 | 47 | 51 |
| Agrippa | 45 | 52 | 50 | 48 | **32** | 55 | 45 | 50 | 48 | 48 | 43 | · | 49 | 50 | 47 | 49 | 56 | 54 | **36** | 53 | 57 | 48 |
| Ahhotep | **37** | 51 | 43 | 55 | 53 | 56 | 56 | 57 | 44 | 56 | 53 | 52 | · | 46 | 45 | 56 | 60 | 52 | 45 | **61** | 56 | 53 |
| Anna | 48 | 57 | 53 | 51 | 50 | 48 | 54 | 49 | 48 | 48 | 47 | 50 | 54 | · | 47 | 54 | 50 | **69** | 46 | 52 | 56 | **37** |
| Nezahualcóyotl | 42 | 47 | 41 | 49 | 52 | 50 | 44 | 53 | 41 | 51 | 49 | 53 | 55 | 53 | · | 47 | 42 | 55 | 49 | **40** | **62** | 49 |
| Theophanu | 52 | **34** | 42 | 46 | 59 | 47 | 48 | 59 | 52 | 55 | 52 | 52 | 44 | 46 | 53 | · | 45 | 42 | 55 | **37** | **36** | 47 |
| Epaminondas | 60 | **37** | 45 | 51 | 52 | 44 | 51 | 45 | 50 | 44 | 48 | 44 | 41 | 50 | 59 | 55 | · | **30** | 57 | **38** | 49 | 53 |
| Fabius | **28** | 42 | 51 | 51 | 53 | **64** | **39** | 53 | **40** | 59 | 47 | 46 | 48 | **31** | 45 | 58 | **71** | · | **33** | **68** | 55 | **38** |
| Thusnelda | 44 | 51 | 43 | 47 | **39** | 53 | 48 | 54 | 52 | 46 | 54 | **65** | 55 | 54 | 52 | 45 | 43 | **68** | · | 45 | 56 | 48 |
| Baibars | 55 | 42 | 47 | 49 | 57 | 45 | 48 | 48 | **63** | 52 | 56 | 48 | **39** | 49 | **61** | **63** | **62** | **32** | 55 | · | 43 | 52 |
| Vauban | **39** | 45 | 42 | 47 | **62** | 57 | 41 | 60 | 52 | 57 | 53 | 43 | 44 | 44 | **38** | **64** | 52 | 45 | 44 | 57 | · | 41 |
| Vix | 53 | 53 | **61** | 50 | **33** | 55 | 50 | 41 | 41 | 50 | 49 | 52 | 47 | **64** | 52 | 53 | 47 | **62** | 53 | 49 | 60 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 45,4 % aufs Gesicht, 1,0 % auf Bauwerke · **Defensiv** (7 Helden) 38,6 % aufs Gesicht, 1,0 % auf Bauwerke · **Kombinierend** (7 Helden) 43,0 % aufs Gesicht, 1,0 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 25,1, Median 24, 10–90 %: 17–35, kürzeste 9, längste 64. Beginner gewinnt 47,3 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Belagerungsturm | neutral | 6 | 55,2 % | +5,2 | 76,8 % |
| Reiter der Edelinge | Widukind | 4 | 54,8 % | +4,7 | 70,7 % |
| Warägergardist | Anna | 3 | 55,1 % | +4,5 | 82,7 % |
| Pilumwerfer | Agrippa | 1 | 52,3 % | +4,0 | 77,6 % |
| Sternkatalog des Hipparchos | Hypatia | 4 | 56,4 % | +3,8 | 79,3 % |
| Handelsgesandter | Dandolo | 4 | 53,3 % | +3,5 | 79,2 % |
| Rede auf die Gefallenen | Perikles | 3 | 52,3 % | +3,4 | 81,7 % |
| Kopistin der Chronik | Anna | 1 | 53,6 % | +3,0 | 81,5 % |
| Mamlukenrekrut | Baibars | 1 | 49,0 % | −1,6 | 83,2 % |
| Bogenschütze der Pfalz | Theophanu | 2 | 46,2 % | −1,6 | 82,6 % |
| Hüterin des Hains | Vercingetorix | 1 | 47,2 % | −1,6 | 82,4 % |
| Stiftsdame aus Quedlinburg | Theophanu | 2 | 46,0 % | −1,8 | 82,8 % |
| Siedler aus Franken | Wiprecht | 1 | 47,3 % | −2,3 | 77,3 % |
| Pfeilschuss | Widukind | 2 | 47,8 % | −2,4 | 76,1 % |
| Lehnsmann | Theophanu | 1 | 45,2 % | −2,6 | 82,1 % |
| Lange Mauern | Perikles | 2 | 45,5 % | −3,5 | 79,5 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Marcus Agrippa | **56,4 %** | 55,0 % | 56,7 % | Imhotep 50,0 % | Vauban 67,0 % | Kombinierend: 40,6 % | ✗ |
| Imhotep | **54,4 %** | 53,8 % | 54,1 % | Vauban 49,0 % | Nezahualcóyotl 63,5 % | Defensiv: 34,4 % | ✗ |
| Thusnelda | **53,0 %** | 51,8 % | 53,7 % | Agrippa 48,5 % | Hypatia 60,0 % | Kombinierend: 40,0 % | ✓ |
| Perikles | **52,7 %** | 51,8 % | 53,2 % | Wiprecht 44,0 % | Böttger 65,0 % | Defensiv: 35,6 % | ✓ |
| Ahhotep I. | **52,1 %** | 53,2 % | 50,7 % | Theophanu 42,0 % | Böttger 58,5 % | Aggressiv: 42,5 % | ✓ |
| Fabius Maximus | **51,6 %** | 52,5 % | 50,4 % | Agrippa 42,5 % | Epaminondas 65,0 % | Defensiv: 34,9 % | ✓ |
| Leonidas I. | **51,2 %** | 52,7 % | 49,6 % | Imhotep 39,0 % | Vauban 59,5 % | Defensiv: 33,5 % | ✓ |
| Anna Komnene | **50,4 %** | 53,1 % | 47,6 % | Epaminondas 39,0 % | Vauban 63,0 % | Kombinierend: 35,3 % | ✓ |
| Hildegard von Bingen | **50,3 %** | 52,0 % | 48,5 % | Agrippa 41,0 % | Ulrich 58,5 % | Aggressiv: 43,2 % | ✓ |
| Theophanu | **50,1 %** | 51,7 % | 48,5 % | Perikles 41,5 % | Nezahualcóyotl 59,5 % | Defensiv: 32,6 % | ✓ |
| Ulrich von Liechtenstein | **50,1 %** | 51,0 % | 49,1 % | Hildegard 41,5 % | Dandolo 57,0 % | Aggressiv: 46,7 % | ✓ |
| Wiprecht von Groitzsch | **50,0 %** | 50,2 % | 49,8 % | Hildegard 42,5 % | Dandolo 58,0 % | Aggressiv: 40,0 % | ✓ |
| Hypatia | **49,9 %** | 49,6 % | 50,2 % | Agrippa 39,5 % | Nezahualcóyotl 59,5 % | Kombinierend: 39,4 % | ✓ |
| Epaminondas | **49,2 %** | 50,1 % | 48,5 % | Fabius 35,0 % | Anna 61,0 % | Aggressiv: 40,1 % | ✓ |
| Baibars | **48,6 %** | 49,9 % | 47,6 % | Perikles 37,0 % | Vix 58,5 % | Aggressiv: 36,8 % | ✓ |
| Fürstin von Vix | **48,0 %** | 48,4 % | 48,0 % | Epaminondas 41,0 % | Nezahualcóyotl 56,5 % | Kombinierend: 38,2 % | ✓ |
| Widukind | **47,7 %** | 48,1 % | 47,7 % | Nezahualcóyotl 41,5 % | Epaminondas 56,0 % | Aggressiv: 41,3 % | ✓ |
| Vercingetorix | **47,6 %** | 46,9 % | 48,7 % | Imhotep 40,5 % | Vauban 58,5 % | Aggressiv: 40,9 % | ✓ |
| Nezahualcóyotl | **47,5 %** | 49,0 % | 46,4 % | Imhotep 36,5 % | Widukind 58,5 % | Defensiv: 33,1 % | ✓ |
| Vauban | **47,4 %** | 47,0 % | 48,2 % | Agrippa 33,0 % | Böttger 57,0 % | Defensiv: 35,2 % | ✓ |
| Johann Friedrich Böttger | **46,5 %** | 49,0 % | 44,7 % | Perikles 35,0 % | Widukind 53,5 % | Kombinierend: 36,9 % | ✗ |
| Enrico Dandolo | **45,2 %** | 48,8 % | 42,4 % | Agrippa 39,0 % | Leonidas 52,0 % | Kombinierend: 34,7 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Widu. | Verc. | Bött. | Hild. | Wipr. | Ulri. | Peri. | Agri. | Ahho. | Anna. | Neza. | Theo. | Epam. | Fabi. | Thus. | Baib. | Vaub. | Vix. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 55 | **39** | 48 | 55 | 50 | 58 | 55 | 53 | 51 | 48 | 44 | 48 | 49 | 54 | 53 | 53 | 51 | 48 | 56 | 60 | 51 |
| Hypatia | 45 | · | 43 | 56 | 54 | 56 | 55 | 51 | 51 | 47 | 50 | **40** | 48 | 49 | 60 | 57 | 55 | 46 | 40 | 52 | 47 | 50 |
| Imhotep | **61** | 57 | · | 59 | 52 | 60 | 53 | 50 | 53 | 55 | 52 | 50 | 50 | 60 | **64** | 54 | 53 | 54 | 50 | 54 | 49 | 56 |
| Dandolo | 52 | 44 | 41 | · | 45 | 48 | 49 | 45 | 42 | 43 | 42 | **39** | 44 | 44 | 47 | 45 | **40** | 49 | 47 | 46 | 49 | 51 |
| Widukind | 45 | 46 | 48 | 55 | · | 49 | 47 | 46 | 49 | 50 | 46 | 44 | 50 | 43 | 42 | 52 | 56 | 44 | 46 | 51 | 49 | 49 |
| Vercingetorix | 50 | 44 | 41 | 52 | 51 | · | 48 | 56 | 46 | 47 | 45 | 42 | 43 | 44 | 46 | 45 | 51 | 43 | 47 | 54 | 59 | 51 |
| Böttger | 42 | 45 | 47 | 51 | 53 | 53 | · | 49 | 45 | 50 | **35** | **37** | 42 | 45 | 53 | 49 | 47 | 45 | 45 | 53 | 43 | 51 |
| Hildegard | 45 | 49 | 51 | 55 | 54 | 44 | 52 | · | 57 | 59 | 50 | 41 | 46 | 51 | 53 | 50 | 54 | 52 | 43 | 56 | 47 | 49 |
| Wiprecht | 47 | 49 | 48 | 58 | 52 | 54 | 55 | 43 | · | 54 | 56 | 44 | 44 | 45 | 44 | 50 | 55 | 47 | 49 | 53 | 53 | 54 |
| Ulrich | 49 | 53 | 45 | 57 | 51 | 53 | 51 | 42 | 47 | · | 48 | 48 | 45 | 50 | 51 | 54 | 47 | 53 | 51 | 56 | 51 | 53 |
| Perikles | 53 | 50 | 49 | 59 | 54 | 55 | **65** | 50 | 44 | 53 | · | 48 | 52 | 51 | 57 | 59 | 49 | 48 | 51 | **63** | 51 | 51 |
| Agrippa | 56 | **61** | 50 | **61** | 56 | 59 | **63** | 59 | 56 | 53 | 53 | · | 55 | 53 | 55 | 56 | 55 | 57 | 52 | 55 | **67** | 54 |
| Ahhotep | 53 | 53 | 51 | 56 | 51 | 57 | 59 | 54 | 56 | 55 | 49 | 45 | · | 55 | 51 | 42 | 58 | 54 | 52 | 48 | 47 | 52 |
| Anna | 51 | 52 | 40 | 56 | 57 | 56 | 55 | 50 | 55 | 50 | 50 | 47 | 45 | · | 59 | 53 | **39** | 50 | 43 | 44 | **63** | 45 |
| Nezahualcóyotl | 47 | 41 | **37** | 53 | 59 | 54 | 48 | 48 | 56 | 49 | 43 | 45 | 49 | 42 | · | 41 | 49 | 48 | 50 | 42 | 56 | 44 |
| Theophanu | 47 | 43 | 46 | 55 | 49 | 55 | 51 | 50 | 51 | 47 | 42 | 44 | 58 | 48 | 60 | · | 49 | 55 | 50 | 46 | 59 | 52 |
| Epaminondas | 48 | 45 | 48 | **61** | 44 | 49 | 53 | 46 | 45 | 53 | 51 | 45 | 42 | **61** | 51 | 52 | · | **35** | 52 | 48 | 48 | 59 |
| Fabius | 49 | 54 | 46 | 51 | 56 | 57 | 55 | 48 | 53 | 48 | 52 | 43 | 46 | 51 | 52 | 45 | **65** | · | 49 | 52 | 60 | 52 |
| Thusnelda | 52 | 60 | 50 | 53 | 54 | 53 | 55 | 57 | 52 | 49 | 49 | 49 | 49 | 57 | 51 | 51 | 49 | 52 | · | 57 | 59 | 56 |
| Baibars | 44 | 49 | 47 | 54 | 50 | 46 | 48 | 44 | 47 | 44 | **37** | 45 | 53 | 56 | 58 | 54 | 52 | 48 | 43 | · | 47 | 59 |
| Vauban | 41 | 53 | 51 | 51 | 51 | 42 | 57 | 53 | 47 | 50 | 50 | **33** | 53 | **37** | 44 | 41 | 53 | 41 | 41 | 53 | · | 55 |
| Vix | 49 | 50 | 44 | 49 | 51 | 49 | 50 | 51 | 46 | 48 | 50 | 46 | 48 | 55 | 56 | 48 | 41 | 48 | 44 | 42 | 45 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 41,4 % aufs Gesicht, 19,3 % auf Bauwerke · **Defensiv** (7 Helden) 34,2 % aufs Gesicht, 21,3 % auf Bauwerke · **Kombinierend** (7 Helden) 37,9 % aufs Gesicht, 20,5 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 24,3, Median 22, 10–90 %: 15–37, kürzeste 8, längste 72. Beginner gewinnt 50,7 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 59,7 % | +12,0 | 60,7 % |
| Kataphrakt | Anna | 5 | 60,0 % | +9,6 | 51,5 % |
| Phalanxveteran | Leonidas | 5 | 60,7 % | +9,6 | 60,6 % |
| Griechisches Feuer | Anna | 4 | 59,9 % | +9,6 | 52,7 % |
| Synesios von Kyrene | Hypatia | 3 | 58,5 % | +8,6 | 60,5 % |
| Pförtnerin vom Rupertsberg | Hildegard | 1 | 58,5 % | +8,2 | 56,7 % |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | 57,2 % | +7,9 | 53,8 % |
| Goldener Skarabäus | Imhotep | 5 | 61,7 % | +7,7 | 56,0 % |
| Ka-Statue | Imhotep | 2 | 47,7 % | −6,3 | 63,1 % |
| Odeion | Perikles | 4 | 46,0 % | −6,5 | 42,6 % |
| Mausoleum von Halikarnassos | neutral | 3 | 43,2 % | −6,8 | 38,4 % |
| Zitadelle von Lille | Vauban | 4 | 40,8 % | −6,8 | 62,3 % |
| Hinterhalt am Süntel | Widukind | 3 | 40,3 % | −7,6 | 38,6 % |
| Kloster Pegau | Wiprecht | 4 | 42,2 % | −7,8 | 39,5 % |
| Murus Gallicus | Vercingetorix | 3 | 40,0 % | −7,8 | 62,6 % |
| Mauern von Messene | Epaminondas | 3 | 41,1 % | −8,2 | 57,8 % |

**Legendäre** (AP 5.3) – als Gruppe 53,2 % „gewinnt, wenn gezogen“ (+3,2 gegenüber ihrem Helden, 61609 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Bund der Stämme | Thusnelda | 8 | 57,7 % | +5,0 | 48,8 % |
| Djoser, der Erbauer | Imhotep | 6 | 57,3 % | +3,3 | 55,1 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 57,0 % | +5,9 | 52,5 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 56,8 % | +4,3 | 57,5 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 56,2 % | +0,3 | 48,9 % |
| Theon von Alexandria | Hypatia | 5 | 55,3 % | +5,4 | 53,9 % |
| Qalawun, Emir der Bahriya | Baibars | 6 | 55,3 % | +6,5 | 50,8 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 54,6 % | +4,6 | 49,8 % |
| Judith von Böhmen | Wiprecht | 7 | 54,5 % | +4,5 | 50,8 % |
| Herodot, Vater der Geschichte | neutral | 4 | 53,0 % | +3,1 | 48,9 % |
| Zeremonialaxt des Ahmose | Ahhotep | 6 | 52,3 % | +0,4 | 52,3 % |
| Abbi, Gefährte Widukinds | Widukind | 6 | 52,1 % | +4,2 | 50,2 % |
| Alexios I. Komnenos | Anna | 6 | 52,1 % | +1,7 | 52,0 % |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | 51,8 % | +2,5 | 50,1 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 51,3 % | +5,7 | 49,2 % |
| Otto II., Kaiser | Theophanu | 6 | 51,2 % | +1,1 | 57,6 % |
| Marcellus, Schwert Roms | Fabius | 6 | 51,0 % | −0,5 | 54,5 % |
| Ludwig XIV., der Sonnenkönig | Vauban | 5 | 50,3 % | +2,6 | 53,5 % |
| Gesandter aus Massalia | Vix | 6 | 50,0 % | +1,8 | 54,9 % |
| Jutta von Sponheim, Magistra | Hildegard | 7 | 49,8 % | −0,5 | 47,5 % |
| Friedrich der Streitbare | Ulrich | 6 | 48,7 % | −1,4 | 49,2 % |
| Commius, Führer des Entsatzheers | Vercingetorix | 8 | 47,1 % | −0,7 | 48,3 % |
| Tschirnhaus, Naturforscher | Böttger | 5 | 46,7 % | −0,1 | 59,9 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 44,9 % | −2,8 | 50,7 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 4600 | 81,0 % | 54,1 % | +0,7 | 878 | 55,9 % | 50,4 % | −0,8 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 4600 | 82,3 % | 54,2 % | +0,8 | 1288 | 61,3 % | 55,7 % | +4,5 |
| Bronzener Wall | Leonidas | 2 | Basis | 4600 | 82,5 % | 54,7 % | +1,3 | 1210 | 55,6 % | 52,4 % | +1,3 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 4600 | 77,2 % | 55,7 % | +2,3 | 1506 | 52,0 % | 51,8 % | +0,6 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1398 | 63,5 % | 56,8 % | +5,6 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1518 | 61,9 % | 48,8 % | −2,3 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1818 | 60,6 % | 60,7 % | +9,6 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1430 | 49,7 % | 54,9 % | +3,8 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 2282 | 57,8 % | 51,1 % | −0,0 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 1886 | 52,5 % | 57,0 % | +5,9 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 4600 | 82,5 % | 51,3 % | −1,3 | 876 | 56,7 % | 46,1 % | −3,9 |
| Erdmessung des Eratosthenes | Hypatia | 2 | Basis | 4600 | 87,2 % | 52,8 % | +0,3 | 1226 | 61,5 % | 52,3 % | +2,4 |
| Sternenkundiger | Hypatia | 3 | Basis | 4600 | 82,1 % | 54,4 % | +1,8 | 1648 | 55,8 % | 51,6 % | +1,7 |
| Sternkatalog des Hipparchos | Hypatia | 4 | Basis | 4600 | 79,3 % | 56,4 % | +3,8 | 1426 | 53,6 % | 55,8 % | +5,9 |
| Synesios von Kyrene | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1540 | 60,5 % | 58,5 % | +8,6 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1344 | 36,8 % | 49,8 % | −0,1 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1748 | 52,9 % | 54,5 % | +4,6 |
| Brennspiegel des Archimedes | Hypatia | 6 | Selten | – | – | – | – | 2330 | 59,9 % | 48,5 % | −1,4 |
| Klaudios Ptolemaios | Hypatia | 5 | Episch | – | – | – | – | 1774 | 57,0 % | 50,2 % | +0,3 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1788 | 53,9 % | 55,3 % | +5,4 |
| Nilschülerin | Imhotep | 1 | Basis | 4600 | 82,9 % | 51,6 % | −0,3 | 910 | 55,3 % | 55,8 % | +1,9 |
| Heilender Balsam | Imhotep | 1 | Basis | 4600 | 83,7 % | 53,8 % | +2,0 | 816 | 62,1 % | 58,0 % | +4,0 |
| Pyramidenwächter | Imhotep | 3 | Basis | 4600 | 84,2 % | 53,2 % | +1,3 | 1438 | 60,0 % | 54,9 % | +0,9 |
| Tempelärztin | Imhotep | 4 | Basis | 4600 | 80,7 % | 52,5 % | +0,6 | 1454 | 54,2 % | 55,2 % | +1,2 |
| Brot und Bier | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1314 | 58,4 % | 55,9 % | +1,9 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1428 | 60,4 % | 58,1 % | +4,1 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1464 | 52,9 % | 53,4 % | −0,6 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1926 | 56,0 % | 61,7 % | +7,7 |
| Urteil nach der Maat | Imhotep | 5 | Episch | – | – | – | – | 1832 | 60,1 % | 52,9 % | −1,1 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 2302 | 55,1 % | 57,3 % | +3,3 |
| Lagunenbote | Dandolo | 1 | Basis | 4600 | 80,3 % | 52,5 % | +2,7 | 872 | 58,9 % | 53,0 % | +7,4 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 4600 | 79,7 % | 48,9 % | −0,9 | 1304 | 54,9 % | 44,6 % | −1,0 |
| Präziser Stich | Dandolo | 2 | Basis | 4600 | 85,1 % | 51,3 % | +1,5 | 1262 | 58,0 % | 46,5 % | +0,9 |
| Handelsgesandter | Dandolo | 4 | Basis | 4600 | 79,2 % | 53,3 % | +3,5 | 1386 | 55,5 % | 50,5 % | +4,9 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1414 | 51,1 % | 45,5 % | −0,1 |
| Nachtwache am Kanal | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1370 | 56,2 % | 44,2 % | −1,4 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1262 | 56,7 % | 48,6 % | +3,0 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1704 | 58,2 % | 50,1 % | +4,6 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1658 | 40,7 % | 46,6 % | +1,0 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 2284 | 49,2 % | 51,3 % | +5,7 |
| Späher aus Engern | Widukind | 1 | Basis | 4600 | 75,4 % | 49,1 % | −1,1 | 898 | 52,3 % | 48,3 % | +0,4 |
| Speerwerfer aus Westfalen | Widukind | 2 | Basis | 4600 | 77,0 % | 49,3 % | −0,9 | 1266 | 58,5 % | 47,6 % | −0,3 |
| Pfeilschuss | Widukind | 2 | Basis | 4600 | 76,1 % | 47,8 % | −2,4 | 1356 | 56,4 % | 48,9 % | +1,0 |
| Reiter der Edelinge | Widukind | 4 | Basis | 4600 | 70,7 % | 54,8 % | +4,7 | 1394 | 51,9 % | 54,8 % | +6,9 |
| Falknerin | Widukind | 3 | Gewöhnlich | – | – | – | – | 1412 | 49,4 % | 50,5 % | +2,6 |
| Sachsenaufstand | Widukind | 3 | Gewöhnlich | – | – | – | – | 1334 | 48,4 % | 46,6 % | −1,3 |
| Schildträger aus Ostfalen | Widukind | 5 | Selten | – | – | – | – | 1630 | 51,8 % | 51,1 % | +3,2 |
| Sturm auf die Eresburg | Widukind | 6 | Selten | – | – | – | – | 2158 | 53,9 % | 50,4 % | +2,5 |
| Gefolgschaft Widukinds | Widukind | 6 | Episch | – | – | – | – | 2244 | 51,6 % | 46,6 % | −1,3 |
| Abbi, Gefährte Widukinds | Widukind | 6 | Legendär | – | – | – | – | 2134 | 50,2 % | 52,1 % | +4,2 |
| Hüterin des Hains | Vercingetorix | 1 | Basis | 4600 | 82,4 % | 47,2 % | −1,6 | 976 | 55,8 % | 50,3 % | +2,5 |
| Schild aus Eichenholz | Vercingetorix | 2 | Basis | 4600 | 75,3 % | 47,5 % | −1,4 | 1280 | 46,8 % | 43,3 % | −4,5 |
| Krieger der Arverner | Vercingetorix | 3 | Basis | 4600 | 85,4 % | 50,1 % | +1,3 | 1460 | 59,6 % | 53,7 % | +5,9 |
| Hieb mit dem Langschwert | Vercingetorix | 3 | Basis | 4600 | 84,8 % | 48,0 % | −0,8 | 1462 | 64,0 % | 47,2 % | −0,6 |
| Reiter der Arverner | Vercingetorix | 4 | Gewöhnlich | – | – | – | – | 1428 | 52,9 % | 48,5 % | +0,7 |
| Heilkundige mit der Mistel | Vercingetorix | 3 | Gewöhnlich | – | – | – | – | 1460 | 57,1 % | 46,3 % | −1,5 |
| Erhebung der Gallier | Vercingetorix | 3 | Selten | – | – | – | – | 1456 | 56,6 % | 48,7 % | +0,9 |
| Verteidiger von Gergovia | Vercingetorix | 6 | Selten | – | – | – | – | 2316 | 57,0 % | 49,8 % | +2,0 |
| Letzter Ritt vor Alesia | Vercingetorix | 5 | Episch | – | – | – | – | 1768 | 41,9 % | 45,5 % | −2,3 |
| Commius, Führer des Entsatzheers | Vercingetorix | 8 | Legendär | – | – | – | – | 1270 | 48,3 % | 47,1 % | −0,7 |
| Apothekerlehrling | Böttger | 1 | Basis | 4600 | 85,5 % | 53,8 % | +2,8 | 874 | 63,4 % | 53,3 % | +6,5 |
| Verpuffung im Laboratorium | Böttger | 2 | Basis | 4600 | 89,3 % | 53,9 % | +2,9 | 1318 | 70,6 % | 48,6 % | +1,8 |
| Bergmann aus Aue | Böttger | 3 | Basis | 4600 | 85,4 % | 52,1 % | +1,0 | 1496 | 53,9 % | 44,1 % | −2,7 |
| Rezept des Goldmachers | Böttger | 4 | Basis | 4600 | 67,0 % | 51,5 % | +0,4 | 1354 | 31,9 % | 43,7 % | −3,1 |
| Pestarzt | Böttger | 4 | Gewöhnlich | – | – | – | – | 1406 | 63,1 % | 53,0 % | +6,2 |
| Befehl des Kurfürsten | Böttger | 2 | Gewöhnlich | – | – | – | – | 1284 | 65,0 % | 52,6 % | +5,8 |
| Schreiber der Manufaktur | Böttger | 5 | Selten | – | – | – | – | 1634 | 57,9 % | 44,3 % | −2,5 |
| Glut des Brennofens | Böttger | 5 | Selten | – | – | – | – | 1598 | 47,1 % | 48,8 % | +2,0 |
| Wache auf dem Königstein | Böttger | 6 | Episch | – | – | – | – | 2244 | 65,4 % | 46,4 % | −0,4 |
| Tschirnhaus, Naturforscher | Böttger | 5 | Legendär | – | – | – | – | 1662 | 59,9 % | 46,7 % | −0,1 |
| Pförtnerin vom Rupertsberg | Hildegard | 1 | Basis | 4600 | 78,7 % | 49,9 % | −0,6 | 974 | 56,7 % | 58,5 % | +8,2 |
| Grünkraft | Hildegard | 2 | Basis | 4600 | 79,0 % | 50,5 % | −0,1 | 1292 | 54,3 % | 50,7 % | +0,4 |
| Klostervogt | Hildegard | 3 | Basis | 4600 | 78,8 % | 51,4 % | +0,9 | 1492 | 58,5 % | 54,9 % | +4,6 |
| Einkleidung der Novizinnen | Hildegard | 2 | Basis | 4600 | 77,1 % | 49,1 % | −1,4 | 1304 | 54,8 % | 53,8 % | +3,6 |
| Pilger am Rhein | Hildegard | 4 | Gewöhnlich | – | – | – | – | 1386 | 47,6 % | 48,7 % | −1,6 |
| Segen der Äbtissin | Hildegard | 2 | Gewöhnlich | – | – | – | – | 1306 | 48,4 % | 53,2 % | +3,0 |
| Vorsängerin im Chor | Hildegard | 5 | Selten | – | – | – | – | 1688 | 56,0 % | 51,0 % | +0,7 |
| Spiel der Tugenden | Hildegard | 6 | Selten | – | – | – | – | 2134 | 48,3 % | 53,0 % | +2,7 |
| Ritter mit dem Schutzbrief | Hildegard | 7 | Episch | – | – | – | – | 1946 | 46,8 % | 49,7 % | −0,5 |
| Jutta von Sponheim, Magistra | Hildegard | 7 | Legendär | – | – | – | – | 1890 | 47,5 % | 49,8 % | −0,5 |
| Siedler aus Franken | Wiprecht | 1 | Basis | 4600 | 77,3 % | 47,3 % | −2,3 | 944 | 52,9 % | 51,8 % | +1,8 |
| Fehde | Wiprecht | 2 | Basis | 4600 | 81,6 % | 48,8 % | −0,8 | 1310 | 62,9 % | 47,9 % | −2,1 |
| Burgmann von Groitzsch | Wiprecht | 3 | Basis | 4600 | 80,7 % | 50,8 % | +1,2 | 1454 | 60,7 % | 52,1 % | +2,1 |
| Lokator | Wiprecht | 4 | Basis | 4600 | 76,2 % | 51,5 % | +1,9 | 1396 | 55,9 % | 50,4 % | +0,3 |
| Verhau | Wiprecht | 3 | Gewöhnlich | – | – | – | – | 1394 | 60,9 % | 51,9 % | +1,9 |
| Panzerreiter | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1464 | 52,0 % | 51,6 % | +1,6 |
| Rodung | Wiprecht | 3 | Selten | – | – | – | – | 1480 | 56,6 % | 55,6 % | +5,6 |
| Grenzwächter der Mark | Wiprecht | 5 | Selten | – | – | – | – | 1758 | 55,0 % | 49,8 % | −0,2 |
| Heerfahrt nach Italien | Wiprecht | 5 | Episch | – | – | – | – | 1754 | 55,2 % | 52,5 % | +2,5 |
| Judith von Böhmen | Wiprecht | 7 | Legendär | – | – | – | – | 2048 | 50,8 % | 54,5 % | +4,5 |
| Edelknabe | Ulrich | 1 | Basis | 4600 | 80,9 % | 48,5 % | −0,4 | 914 | 54,9 % | 52,1 % | +2,0 |
| Lanzenstoß | Ulrich | 1 | Basis | 4600 | 84,0 % | 49,6 % | +0,8 | 882 | 56,7 % | 53,5 % | +3,5 |
| Fahrender Ritter | Ulrich | 3 | Basis | 4600 | 83,3 % | 49,5 % | +0,7 | 1476 | 51,4 % | 50,3 % | +0,3 |
| Minnebrief | Ulrich | 2 | Basis | 4600 | 74,1 % | 50,8 % | +1,9 | 1288 | 45,9 % | 49,3 % | −0,8 |
| Minneritter | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1552 | 55,5 % | 53,4 % | +3,3 |
| Mit eingelegter Lanze | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1414 | 40,4 % | 48,1 % | −1,9 |
| Kämpe im Buhurt | Ulrich | 4 | Selten | – | – | – | – | 1380 | 43,3 % | 49,7 % | −0,3 |
| Venusfahrt | Ulrich | 5 | Selten | – | – | – | – | 1756 | 43,8 % | 52,9 % | +2,9 |
| Landrichter der Steiermark | Ulrich | 6 | Episch | – | – | – | – | 2256 | 53,3 % | 50,3 % | +0,2 |
| Friedrich der Streitbare | Ulrich | 6 | Legendär | – | – | – | – | 2134 | 49,2 % | 48,7 % | −1,4 |
| Dorfwache | neutral | 1 | Basis | 101200 | 80,7 % | 49,2 % | −0,8 | 20152 | 56,8 % | 50,7 % | +0,7 |
| Wandernder Händler | neutral | 2 | Basis | 101200 | 80,9 % | 49,0 % | −1,0 | 28962 | 55,8 % | 50,2 % | +0,2 |
| Steinschleuderer | neutral | 2 | Basis | 101200 | 80,9 % | 49,7 % | −0,3 | 28320 | 56,6 % | 51,2 % | +1,2 |
| Wilderin | neutral | 3 | Basis | 101200 | 83,3 % | 49,8 % | −0,3 | 31828 | 58,2 % | 50,0 % | +0,1 |
| Torwache der Burg | neutral | 4 | Basis | 101200 | 76,9 % | 51,3 % | +1,2 | 31832 | 51,2 % | 50,7 % | +0,7 |
| Kavallerist | neutral | 4 | Basis | 101200 | 78,3 % | 51,3 % | +1,3 | 31740 | 51,8 % | 51,2 % | +1,2 |
| Feldheilerin | neutral | 3 | Basis | 101200 | 80,8 % | 49,6 % | −0,5 | 32068 | 55,4 % | 49,8 % | −0,1 |
| Archivarin | neutral | 4 | Basis | 101200 | 74,7 % | 52,6 % | +2,6 | 32264 | 50,4 % | 50,2 % | +0,2 |
| Wachhund | neutral | 2 | Basis | 101200 | 78,3 % | 48,9 % | −1,1 | 28300 | 54,4 % | 50,0 % | +0,0 |
| Veteran | neutral | 5 | Basis | 101200 | 79,3 % | 52,5 % | +2,5 | 39870 | 54,7 % | 49,7 % | −0,3 |
| Belagerungsturm | neutral | 6 | Basis | 101200 | 76,8 % | 55,2 % | +5,2 | 51146 | 56,4 % | 50,3 % | +0,3 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 32520 | 54,7 % | 50,5 % | +0,5 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 20218 | 55,8 % | 52,3 % | +2,3 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 39814 | 55,7 % | 53,5 % | +3,4 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 32226 | 54,1 % | 50,3 % | +0,4 |
| Nachtwächter | neutral | 2 | Basis | – | – | – | – | 28390 | 53,8 % | 50,7 % | +0,7 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 28470 | 47,7 % | 49,7 % | −0,3 |
| Heilkräuter | neutral | 1 | Basis | – | – | – | – | 20214 | 53,6 % | 48,6 % | −1,4 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 28620 | 60,9 % | 49,6 % | −0,3 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 45318 | 56,8 % | 54,1 % | +4,1 |
| Ordensritter | neutral | 3 | Gewöhnlich | – | – | – | – | 32264 | 57,4 % | 51,4 % | +1,5 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 32004 | 52,0 % | 50,3 % | +0,3 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 28352 | 57,1 % | 52,9 % | +3,0 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 31986 | 53,5 % | 52,8 % | +2,8 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 32230 | 59,6 % | 54,1 % | +4,1 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 28302 | 36,5 % | 47,0 % | −3,0 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 31668 | 53,0 % | 47,6 % | −2,4 |
| Prätorianer | neutral | 5 | Gewöhnlich | – | – | – | – | 39846 | 52,8 % | 50,5 % | +0,5 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 31630 | 56,7 % | 54,6 % | +4,6 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 31810 | 51,2 % | 53,8 % | +3,9 |
| Löwin der Arena | neutral | 5 | Selten | – | – | – | – | 39908 | 57,0 % | 52,4 % | +2,3 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 40040 | 53,8 % | 50,4 % | +0,4 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 31882 | 48,9 % | 49,7 % | −0,3 |
| Trojanisches Pferd | neutral | 6 | Selten | – | – | – | – | 51468 | 58,9 % | 50,7 % | +0,7 |
| Brander | neutral | 7 | Episch | – | – | – | – | 45112 | 52,3 % | 52,9 % | +2,9 |
| Mercators Atlas | neutral | 4 | Episch | – | – | – | – | 32202 | 34,3 % | 50,3 % | +0,4 |
| Burgbesatzung | neutral | 8 | Episch | – | – | – | – | 30728 | 51,1 % | 57,4 % | +7,4 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 45424 | 59,5 % | 52,5 % | +2,5 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 31728 | 48,9 % | 53,0 % | +3,1 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 30654 | 49,8 % | 54,6 % | +4,6 |
| Spitzel im Venezianerviertel | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1460 | 63,1 % | 49,0 % | +3,4 |
| Plünderer am Rhein | Widukind | 3 | Gewöhnlich | – | – | – | – | 1484 | 57,3 % | 45,8 % | −2,1 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1302 | 54,2 % | 55,6 % | +1,7 |
| Zwanzig Städte in Flammen | Vercingetorix | 3 | Selten | – | – | – | – | 1432 | 54,7 % | 47,3 % | −0,5 |
| Eid der Arkanisten | Böttger | 1 | Selten | – | – | – | – | 980 | 69,5 % | 52,1 % | +5,3 |
| Böhmischer Söldner | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1344 | 53,5 % | 45,9 % | −4,2 |
| Brandschatzung | Wiprecht | 1 | Gewöhnlich | – | – | – | – | 892 | 64,3 % | 49,1 % | −0,9 |
| Heimlicher Bote | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1280 | 52,4 % | 51,9 % | +1,8 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 28398 | 55,2 % | 49,3 % | −0,6 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 20102 | 58,2 % | 51,8 % | +1,8 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 28552 | 61,5 % | 55,6 % | +5,6 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 32694 | 55,2 % | 53,3 % | +3,4 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 32428 | 58,4 % | 51,9 % | +1,9 |
| Ruderer der Triere | Perikles | 1 | Basis | 4600 | 79,4 % | 50,4 % | +1,5 | 890 | 58,7 % | 55,6 % | +3,1 |
| Lange Mauern | Perikles | 2 | Basis | 4600 | 79,5 % | 45,5 % | −3,5 | 1226 | 58,2 % | 52,5 % | −0,0 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 4600 | 81,7 % | 52,3 % | +3,4 | 1408 | 60,9 % | 55,6 % | +3,1 |
| Strategos | Perikles | 3 | Basis | 4600 | 79,8 % | 51,7 % | +2,8 | 1538 | 61,5 % | 58,4 % | +5,9 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1382 | 50,3 % | 47,9 % | −4,6 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1248 | 61,5 % | 56,6 % | +4,1 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1450 | 60,6 % | 56,1 % | +3,6 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1474 | 42,7 % | 51,5 % | −1,0 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1386 | 42,6 % | 46,0 % | −6,5 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 2172 | 57,5 % | 56,8 % | +4,3 |
| Pilumwerfer | Agrippa | 1 | Basis | 4600 | 77,6 % | 52,3 % | +4,0 | 920 | 60,0 % | 58,9 % | +3,1 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 4600 | 72,9 % | 49,9 % | +1,5 | 1248 | 52,3 % | 57,3 % | +1,5 |
| Castra | Agrippa | 3 | Basis | 4600 | 83,2 % | 50,1 % | +1,8 | 1456 | 64,0 % | 56,5 % | +0,6 |
| Testudo | Agrippa | 2 | Basis | 4600 | 74,6 % | 50,4 % | +2,1 | 1270 | 55,8 % | 58,8 % | +2,9 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1358 | 53,4 % | 55,5 % | −0,3 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1458 | 55,1 % | 54,3 % | −1,5 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1830 | 57,8 % | 57,4 % | +1,5 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1258 | 58,3 % | 50,0 % | −5,9 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1402 | 46,9 % | 53,8 % | −2,1 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1748 | 48,9 % | 56,2 % | +0,3 |
| Bogenschütze aus Elkab | Ahhotep | 1 | Basis | 4600 | 82,4 % | 51,3 % | −0,2 | 924 | 60,6 % | 55,0 % | +3,1 |
| Krieger der Nilflotte | Ahhotep | 2 | Basis | 4600 | 80,9 % | 51,1 % | −0,4 | 1262 | 52,4 % | 52,8 % | +0,9 |
| Pfeilregen vor Auaris | Ahhotep | 2 | Basis | 4600 | 78,8 % | 52,4 % | +0,9 | 1286 | 49,9 % | 46,1 % | −5,8 |
| Speerträger aus Theben | Ahhotep | 3 | Basis | 4600 | 83,9 % | 52,3 % | +0,8 | 1406 | 57,6 % | 54,8 % | +2,9 |
| Priester der Selket | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1454 | 57,8 % | 50,6 % | −1,3 |
| Medjai-Kundschafter | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1442 | 59,7 % | 52,0 % | +0,1 |
| Erbeuteter Streitwagen | Ahhotep | 6 | Selten | – | – | – | – | 2308 | 60,0 % | 53,5 % | +1,6 |
| Überfall auf Nefrusi | Ahhotep | 3 | Selten | – | – | – | – | 1450 | 57,9 % | 48,4 % | −3,5 |
| Ahmose, Befreier Ägyptens | Ahhotep | 5 | Episch | – | – | – | – | 1806 | 58,8 % | 47,2 % | −4,7 |
| Zeremonialaxt des Ahmose | Ahhotep | 6 | Legendär | – | – | – | – | 2302 | 52,3 % | 52,3 % | +0,4 |
| Kopistin der Chronik | Anna | 1 | Basis | 4600 | 81,5 % | 53,6 % | +3,0 | 948 | 53,7 % | 56,0 % | +5,7 |
| Pantokrator-Spital | Anna | 3 | Basis | 4600 | 73,1 % | 51,6 % | +1,0 | 1398 | 37,6 % | 48,3 % | −2,0 |
| Warägergardist | Anna | 3 | Basis | 4600 | 82,7 % | 55,1 % | +4,5 | 1430 | 56,4 % | 57,8 % | +7,5 |
| Hofärztin | Anna | 3 | Basis | 4600 | 81,8 % | 50,7 % | +0,1 | 1434 | 43,9 % | 48,6 % | −1,7 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1450 | 52,7 % | 59,9 % | +9,6 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1394 | 52,7 % | 56,4 % | +6,0 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1628 | 51,5 % | 60,0 % | +9,6 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1444 | 42,5 % | 51,9 % | +1,5 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1808 | 51,3 % | 55,4 % | +5,1 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 2250 | 52,0 % | 52,1 % | +1,7 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 4600 | 82,5 % | 48,7 % | +0,0 | 852 | 61,5 % | 54,6 % | +6,9 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 4600 | 81,7 % | 48,9 % | +0,2 | 1282 | 59,4 % | 51,6 % | +3,9 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 4600 | 83,3 % | 49,3 % | +0,7 | 1278 | 61,5 % | 49,3 % | +1,6 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 4600 | 82,8 % | 47,9 % | −0,7 | 1544 | 61,1 % | 50,7 % | +3,0 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1224 | 58,4 % | 46,5 % | −1,2 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1300 | 58,7 % | 48,6 % | +0,9 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1450 | 57,9 % | 50,6 % | +2,9 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1584 | 56,0 % | 45,2 % | −2,5 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 2342 | 60,7 % | 59,7 % | +12,0 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 1784 | 50,7 % | 44,9 % | −2,8 |
| Lehnsmann | Theophanu | 1 | Basis | 4600 | 82,1 % | 45,2 % | −2,6 | 806 | 61,3 % | 52,6 % | +2,4 |
| Bogenschütze der Pfalz | Theophanu | 2 | Basis | 4600 | 82,6 % | 46,2 % | −1,6 | 1230 | 61,8 % | 53,5 % | +3,3 |
| Treueschwur | Theophanu | 1 | Basis | 4600 | 82,5 % | 49,4 % | +1,6 | 878 | 59,2 % | 52,1 % | +2,0 |
| Stiftsdame aus Quedlinburg | Theophanu | 2 | Basis | 4600 | 82,8 % | 46,0 % | −1,8 | 1308 | 63,0 % | 51,6 % | +1,5 |
| Späher an der Elbe | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1224 | 62,7 % | 53,2 % | +3,0 |
| Heerbann | Theophanu | 4 | Gewöhnlich | – | – | – | – | 1532 | 58,9 % | 52,0 % | +1,8 |
| St. Pantaleon in Köln | Theophanu | 2 | Selten | – | – | – | – | 1214 | 61,0 % | 49,8 % | −0,3 |
| Haft in Utrecht | Theophanu | 3 | Selten | – | – | – | – | 1548 | 59,6 % | 48,8 % | −1,3 |
| Willigis, Erzbischof von Mainz | Theophanu | 5 | Episch | – | – | – | – | 1852 | 61,1 % | 56,1 % | +5,9 |
| Otto II., Kaiser | Theophanu | 6 | Legendär | – | – | – | – | 2456 | 57,6 % | 51,2 % | +1,1 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1446 | 58,9 % | 55,9 % | +4,7 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1442 | 60,3 % | 49,1 % | −2,0 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1316 | 57,5 % | 50,5 % | +0,6 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1382 | 57,7 % | 51,2 % | +1,2 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1482 | 59,9 % | 53,1 % | −0,9 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1318 | 63,1 % | 47,7 % | −6,3 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1324 | 55,2 % | 48,1 % | +2,5 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 2204 | 52,1 % | 49,3 % | +3,7 |
| Heerlager an der Weser | Widukind | 3 | Gewöhnlich | – | – | – | – | 1426 | 42,5 % | 43,2 % | −4,7 |
| Versammlung in Marklo | Widukind | 4 | Selten | – | – | – | – | 1384 | 38,4 % | 45,1 % | −2,8 |
| Barde der Arverner | Vercingetorix | 2 | Gewöhnlich | – | – | – | – | 1348 | 57,0 % | 49,5 % | +1,7 |
| Gallische Reiterei | Vercingetorix | 5 | Selten | – | – | – | – | 1790 | 52,6 % | 47,9 % | +0,1 |
| Laborbuch | Böttger | 1 | Gewöhnlich | – | – | – | – | 884 | 59,5 % | 42,6 % | −4,2 |
| Weißes Gold | Böttger | 3 | Selten | – | – | – | – | 1544 | 5,8 % | 42,5 % | −4,3 |
| Adlige Stifterin | Hildegard | 1 | Gewöhnlich | – | – | – | – | 958 | 54,7 % | 53,6 % | +3,3 |
| Weihe der Klosterkirche | Hildegard | 4 | Selten | – | – | – | – | 1514 | 38,8 % | 49,9 % | −0,3 |
| Feldmesser | Wiprecht | 2 | Gewöhnlich | – | – | – | – | 1328 | 57,0 % | 51,0 % | +1,0 |
| Beuterecht | Wiprecht | 1 | Selten | – | – | – | – | 936 | 59,6 % | 50,8 % | +0,8 |
| Ritter aus Murau | Ulrich | 4 | Selten | – | – | – | – | 1380 | 48,3 % | 46,5 % | −3,5 |
| Frische Lanze | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1300 | 54,4 % | 46,7 % | −3,4 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1260 | 51,8 % | 55,4 % | +2,9 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1418 | 39,9 % | 48,9 % | −3,6 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1438 | 54,9 % | 54,2 % | −1,6 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1434 | 43,6 % | 56,4 % | +0,5 |
| Pfeilmacher aus Edfu | Ahhotep | 2 | Gewöhnlich | – | – | – | – | 1324 | 61,2 % | 54,4 % | +2,4 |
| Gift der Hornviper | Ahhotep | 3 | Selten | – | – | – | – | 1408 | 49,6 % | 52,4 % | +0,5 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1364 | 56,5 % | 53,9 % | +3,5 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 2294 | 59,5 % | 56,6 % | +6,3 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1220 | 59,3 % | 48,6 % | +0,9 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1302 | 60,8 % | 43,3 % | −4,4 |
| Kanzler der Kaiserin | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1250 | 60,7 % | 51,2 % | +1,1 |
| Siegel der Kaiserin | Theophanu | 2 | Selten | – | – | – | – | 1168 | 53,9 % | 53,1 % | +3,0 |
| Olympionike | Griechenland und Hellenismus | 4 | Gewöhnlich | – | – | – | – | 5808 | 55,7 % | 56,3 % | +5,5 |
| Rhapsode | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 5098 | 55,1 % | 54,1 % | +3,4 |
| Marathonläufer | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 4896 | 55,0 % | 56,7 % | +6,0 |
| Orakel von Delphi | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 5770 | 36,5 % | 52,1 % | +1,4 |
| Leuchtturm von Pharos | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 5870 | 55,9 % | 46,6 % | −4,2 |
| Akropolis | Griechenland und Hellenismus | 2 | Selten | – | – | – | – | 5044 | 58,9 % | 50,8 % | +0,1 |
| Bibliothek von Alexandria | Griechenland und Hellenismus | 3 | Episch | – | – | – | – | 5912 | 52,7 % | 50,2 % | −0,6 |
| Knappe | Mittelalter im Reich | 1 | Gewöhnlich | – | – | – | – | 4492 | 56,1 % | 51,8 % | +2,1 |
| Armbrustschütze | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 7406 | 61,2 % | 53,9 % | +4,2 |
| Mönch von Cluny | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 7378 | 53,5 % | 53,7 % | +3,9 |
| Hansekogge | Mittelalter im Reich | 4 | Gewöhnlich | – | – | – | – | 7068 | 50,4 % | 48,5 % | −1,3 |
| Turnierritter | Mittelalter im Reich | 4 | Selten | – | – | – | – | 7206 | 53,6 % | 53,2 % | +3,4 |
| Burgfried | Mittelalter im Reich | 2 | Selten | – | – | – | – | 6534 | 62,9 % | 43,9 % | −5,8 |
| Tribok | Mittelalter im Reich | 4 | Episch | – | – | – | – | 6962 | 38,1 % | 48,0 % | −1,7 |
| Landsknecht | Frühe Neuzeit | 1 | Gewöhnlich | – | – | – | – | 2666 | 62,4 % | 51,3 % | +3,9 |
| Buchdrucker aus Mainz | Frühe Neuzeit | 3 | Gewöhnlich | – | – | – | – | 4438 | 59,4 % | 51,9 % | +4,6 |
| Leipziger Kaffeehaus | Frühe Neuzeit | 2 | Gewöhnlich | – | – | – | – | 3954 | 53,6 % | 46,6 % | −0,8 |
| Kartaunen-Salve | Frühe Neuzeit | 3 | Selten | – | – | – | – | 4530 | 63,1 % | 48,0 % | +0,6 |
| Kriegsgaleone | Frühe Neuzeit | 5 | Selten | – | – | – | – | 5258 | 61,1 % | 48,9 % | +1,5 |
| Stehendes Heer | Frühe Neuzeit | 5 | Episch | – | – | – | – | 5272 | 62,6 % | 48,2 % | +0,8 |
| Sternschanze | Frühe Neuzeit | 2 | Episch | – | – | – | – | 3958 | 67,6 % | 43,7 % | −3,7 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 32414 | 39,9 % | 45,8 % | −4,2 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 28486 | 60,3 % | 46,5 % | −3,5 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 31570 | 34,9 % | 46,5 % | −3,4 |
| Thebanischer Plänkler | Epaminondas | 1 | Basis | 4600 | 78,2 % | 47,6 % | −0,3 | 940 | 53,4 % | 51,4 % | +2,1 |
| Böotischer Hoplit | Epaminondas | 2 | Basis | 4600 | 78,9 % | 47,7 % | −0,1 | 1330 | 56,3 % | 55,0 % | +5,7 |
| Fünfzig Schilde tief | Epaminondas | 2 | Basis | 4600 | 74,4 % | 47,7 % | −0,1 | 1338 | 51,5 % | 50,8 % | +1,5 |
| Böotarch | Epaminondas | 3 | Basis | 4600 | 78,2 % | 47,5 % | −0,3 | 1506 | 53,9 % | 53,9 % | +4,6 |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | Gewöhnlich | – | – | – | – | 1870 | 53,8 % | 57,2 % | +7,9 |
| Schlacht bei Leuktra | Epaminondas | 4 | Gewöhnlich | – | – | – | – | 1578 | 49,7 % | 51,7 % | +2,4 |
| Befreiung Messeniens | Epaminondas | 5 | Selten | – | – | – | – | 1750 | 51,9 % | 51,0 % | +1,7 |
| Thebanischer Phalangit | Epaminondas | 4 | Selten | – | – | – | – | 1418 | 48,2 % | 51,1 % | +1,8 |
| Megalopolis | Epaminondas | 3 | Episch | – | – | – | – | 1448 | 47,0 % | 44,6 % | −4,7 |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | Legendär | – | – | – | – | 2294 | 50,1 % | 51,8 % | +2,5 |
| Veles | Fabius | 1 | Basis | 4600 | 88,3 % | 48,4 % | −0,2 | 874 | 63,7 % | 52,0 % | +0,6 |
| Triarier | Fabius | 2 | Basis | 4600 | 86,7 % | 48,7 % | +0,2 | 1272 | 60,9 % | 55,0 % | +3,5 |
| Hinhalten | Fabius | 2 | Basis | 4600 | 85,5 % | 48,4 % | −0,1 | 1354 | 62,9 % | 52,9 % | +1,4 |
| Konsul der Republik | Fabius | 4 | Basis | 4600 | 84,6 % | 49,1 % | +0,6 | 1376 | 55,3 % | 53,1 % | +1,6 |
| Verbrannte Erde | Fabius | 3 | Gewöhnlich | – | – | – | – | 1386 | 65,0 % | 52,3 % | +0,8 |
| Späher am Volturnus | Fabius | 2 | Gewöhnlich | – | – | – | – | 1348 | 58,8 % | 50,2 % | −1,2 |
| Minucius, der Reiteroberst | Fabius | 4 | Selten | – | – | – | – | 1452 | 59,8 % | 53,8 % | +2,3 |
| Rückeroberung von Tarent | Fabius | 6 | Selten | – | – | – | – | 2204 | 53,4 % | 55,7 % | +4,3 |
| Lager auf den Höhen | Fabius | 3 | Episch | – | – | – | – | 1488 | 65,5 % | 50,6 % | −0,9 |
| Marcellus, Schwert Roms | Fabius | 6 | Legendär | – | – | – | – | 2306 | 54,5 % | 51,0 % | −0,5 |
| Botin der Cherusker | Thusnelda | 1 | Basis | 4600 | 77,6 % | 53,1 % | +2,6 | 916 | 54,4 % | 59,9 % | +7,1 |
| Hüterin des Herdfeuers | Thusnelda | 2 | Basis | 4600 | 79,1 % | 51,3 % | +0,8 | 1380 | 51,7 % | 53,1 % | +0,4 |
| Ruf zum Thing | Thusnelda | 3 | Basis | 4600 | 72,6 % | 48,9 % | −1,6 | 1472 | 50,7 % | 47,6 % | −5,1 |
| Krieger im Keil | Thusnelda | 3 | Basis | 4600 | 80,5 % | 52,5 % | +2,0 | 1426 | 58,2 % | 55,5 % | +2,8 |
| Varusschlacht | Thusnelda | 4 | Gewöhnlich | – | – | – | – | 1442 | 50,9 % | 53,3 % | +0,6 |
| Krieger der Sippe | Thusnelda | 3 | Gewöhnlich | – | – | – | – | 1504 | 53,9 % | 55,0 % | +2,3 |
| Heiliger Hain | Thusnelda | 2 | Selten | – | – | – | – | 1382 | 61,6 % | 50,4 % | −2,3 |
| Seitenwechsel | Thusnelda | 5 | Selten | – | – | – | – | 1834 | 49,8 % | 50,2 % | −2,5 |
| Arminius, Fürst der Cherusker | Thusnelda | 4 | Episch | – | – | – | – | 1424 | 47,8 % | 53,2 % | +0,5 |
| Bund der Stämme | Thusnelda | 8 | Legendär | – | – | – | – | 1448 | 48,8 % | 57,7 % | +5,0 |
| Mamlukenrekrut | Baibars | 1 | Basis | 4600 | 83,2 % | 49,0 % | −1,6 | 950 | 57,1 % | 48,7 % | −0,1 |
| Barid-Kurier | Baibars | 2 | Basis | 4600 | 79,3 % | 51,5 % | +0,9 | 1314 | 51,8 % | 50,4 % | +1,6 |
| Ain Dschalut | Baibars | 3 | Basis | 4600 | 85,2 % | 51,6 % | +1,0 | 1486 | 61,1 % | 53,0 % | +4,3 |
| Bogenreiter der Bahriya | Baibars | 3 | Basis | 4600 | 83,2 % | 49,6 % | −1,0 | 1482 | 53,3 % | 50,4 % | +1,6 |
| Manjaniq-Meister | Baibars | 4 | Gewöhnlich | – | – | – | – | 1498 | 55,9 % | 48,7 % | −0,1 |
| Vorgetäuschte Flucht | Baibars | 1 | Gewöhnlich | – | – | – | – | 852 | 21,7 % | 46,3 % | −2,5 |
| Qutuz, Sultan von Ägypten | Baibars | 5 | Selten | – | – | – | – | 1866 | 49,9 % | 53,5 % | +4,7 |
| Sturm auf Antiochia | Baibars | 2 | Selten | – | – | – | – | 1348 | 52,4 % | 46,5 % | −2,2 |
| Zitadelle von Kairo | Baibars | 4 | Episch | – | – | – | – | 1472 | 44,3 % | 46,0 % | −2,7 |
| Qalawun, Emir der Bahriya | Baibars | 6 | Legendär | – | – | – | – | 2478 | 50,8 % | 55,3 % | +6,5 |
| Schanzarbeiter | Vauban | 2 | Basis | 4600 | 76,6 % | 47,8 % | −1,1 | 1364 | 46,0 % | 47,4 % | −0,2 |
| Grenadier | Vauban | 2 | Basis | 4600 | 84,0 % | 49,9 % | +1,0 | 1348 | 65,9 % | 49,7 % | +2,1 |
| Salve von der Bastion | Vauban | 2 | Basis | 4600 | 78,1 % | 47,8 % | −1,1 | 1348 | 45,5 % | 49,1 % | +1,5 |
| Ingenieur des Königs | Vauban | 3 | Basis | 4600 | 83,9 % | 50,5 % | +1,6 | 1406 | 68,1 % | 51,4 % | +3,8 |
| Festungsgeschütz | Vauban | 3 | Gewöhnlich | – | – | – | – | 1536 | 61,5 % | 49,1 % | +1,4 |
| Faschinen | Vauban | 2 | Gewöhnlich | – | – | – | – | 1312 | 59,3 % | 49,1 % | +1,5 |
| Minengang | Vauban | 3 | Selten | – | – | – | – | 1498 | 59,6 % | 49,4 % | +1,7 |
| Zitadelle von Lille | Vauban | 4 | Selten | – | – | – | – | 1480 | 62,3 % | 40,8 % | −6,8 |
| Louvois, Kriegsminister | Vauban | 6 | Episch | – | – | – | – | 2326 | 62,8 % | 45,6 % | −2,1 |
| Ludwig XIV., der Sonnenkönig | Vauban | 5 | Legendär | – | – | – | – | 1804 | 53,5 % | 50,3 % | +2,6 |
| Speerwerfer vom Mont Lassois | Vix | 1 | Basis | 4600 | 83,5 % | 53,6 % | +2,6 | 886 | 59,9 % | 48,8 % | +0,6 |
| Prunkdolch | Vix | 2 | Basis | 4600 | 76,7 % | 53,9 % | +2,9 | 1310 | 48,9 % | 50,8 % | +2,6 |
| Reiter an der Seine | Vix | 3 | Basis | 4600 | 82,9 % | 52,9 % | +1,9 | 1510 | 54,1 % | 49,6 % | +1,4 |
| Seherin | Vix | 3 | Basis | 4600 | 81,8 % | 52,9 % | +1,9 | 1416 | 50,6 % | 48,6 % | +0,4 |
| Aufgebot des Fürstensitzes | Vix | 4 | Gewöhnlich | – | – | – | – | 1450 | 54,1 % | 49,8 % | +1,6 |
| Trankopfer | Vix | 1 | Gewöhnlich | – | – | – | – | 872 | 56,0 % | 52,0 % | +3,8 |
| Gelage am Krater | Vix | 1 | Selten | – | – | – | – | 934 | 59,7 % | 51,9 % | +3,7 |
| Schleuderer am Wall | Vix | 4 | Selten | – | – | – | – | 1530 | 59,0 % | 50,2 % | +2,0 |
| Halle auf dem Mont Lassois | Vix | 1 | Episch | – | – | – | – | 898 | 61,6 % | 48,6 % | +0,4 |
| Gesandter aus Massalia | Vix | 6 | Legendär | – | – | – | – | 2560 | 54,9 % | 50,0 % | +1,8 |
| Gladiator | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 5868 | 61,6 % | 54,8 % | +2,9 |
| Senator der Kurie | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 5750 | 54,7 % | 54,5 % | +2,6 |
| Centurio | Rom und Germanien | 2 | Gewöhnlich | – | – | – | – | 5216 | 58,2 % | 55,6 % | +3,7 |
| Triumphzug | Rom und Germanien | 3 | Selten | – | – | – | – | 5664 | 50,7 % | 51,1 % | −0,8 |
| Via Appia | Rom und Germanien | 2 | Selten | – | – | – | – | 5374 | 58,3 % | 51,3 % | −0,7 |
| Vestalin am ewigen Feuer | Rom und Germanien | 3 | Selten | – | – | – | – | 5996 | 59,8 % | 52,2 % | +0,3 |
| Pax Romana | Rom und Germanien | 5 | Episch | – | – | – | – | 7162 | 55,5 % | 47,3 % | −4,7 |
| Wagenbauer | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 3844 | 54,4 % | 54,8 % | +3,5 |
| Schreiber im Lebenshaus | Frühzeit und Ägypten | 3 | Gewöhnlich | – | – | – | – | 4352 | 57,6 % | 54,1 % | +2,9 |
| Schuss vom Streitwagen | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 3774 | 63,9 % | 54,7 % | +3,3 |
| Wache der Medjai | Frühzeit und Ägypten | 4 | Selten | – | – | – | – | 4300 | 51,2 % | 51,8 % | +0,7 |
| Angriff der Streitwagen | Frühzeit und Ägypten | 3 | Selten | – | – | – | – | 4446 | 58,3 % | 54,7 % | +3,4 |
| Bernsteinstraße | Frühzeit und Ägypten | 2 | Selten | – | – | – | – | 3784 | 57,6 % | 49,8 % | −1,6 |
| Festung Buhen | Frühzeit und Ägypten | 3 | Episch | – | – | – | – | 4428 | 54,2 % | 53,6 % | +2,3 |
| Akrit der Grenzmark | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 4002 | 56,9 % | 53,9 % | +5,6 |
| Gelehrter im Haus der Weisheit | Kreuzzüge | 3 | Gewöhnlich | – | – | – | – | 4490 | 55,1 % | 52,6 % | +4,4 |
| Tribut in Goldbyzantinern | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 3876 | 36,9 % | 46,1 % | −2,1 |
| Arzt des Bimaristan | Kreuzzüge | 3 | Selten | – | – | – | – | 4324 | 60,1 % | 55,1 % | +6,8 |
| Theodosianische Mauern | Kreuzzüge | 2 | Selten | – | – | – | – | 3996 | 61,0 % | 45,7 % | −2,5 |
| Hagia Sophia | Kreuzzüge | 3 | Episch | – | – | – | – | 4346 | 64,5 % | 46,2 % | −2,0 |
| Ibn an-Nafis, Arzt von Kairo | Kreuzzüge | 4 | Episch | – | – | – | – | 4304 | 55,4 % | 51,3 % | +3,2 |
| Krähenfüße | neutral | 1 | Gewöhnlich | – | – | – | – | 19888 | 57,1 % | 52,1 % | +2,1 |
| Abgefangene Botschaft | neutral | 2 | Selten | – | – | – | – | 28440 | 43,0 % | 46,3 % | −3,7 |
| Falsche Kundschafter von Kadesch | Frühzeit und Ägypten | 2 | Selten | – | – | – | – | 3760 | 43,4 % | 49,3 % | −2,0 |
| Botschaft des Sikinnos | Griechenland und Hellenismus | 1 | Gewöhnlich | – | – | – | – | 3630 | 56,0 % | 50,7 % | −0,1 |
| Wall am Kalkrieser Berg | Rom und Germanien | 3 | Selten | – | – | – | – | 5912 | 38,4 % | 50,8 % | −1,1 |
| Fallgatter | Mittelalter im Reich | 2 | Gewöhnlich | – | – | – | – | 6316 | 43,5 % | 46,0 % | −3,6 |
| Engpass von Myriokephalon | Kreuzzüge | 3 | Selten | – | – | – | – | 4420 | 42,9 % | 47,8 % | −0,4 |
| Gegenmine | Frühe Neuzeit | 3 | Selten | – | – | – | – | 4390 | 45,6 % | 44,1 % | −3,2 |
| Hinterhalt am Süntel | Widukind | 3 | Selten | – | – | – | – | 1498 | 38,6 % | 40,3 % | −7,6 |
| Rettung bei Gerunium | Fabius | 2 | Selten | – | – | – | – | 1314 | 52,4 % | 51,5 % | +0,0 |
| Täuschung bei Larissa | Anna | 1 | Selten | – | – | – | – | 940 | 52,4 % | 57,3 % | +7,0 |
| Kampf um den Leichnam | Leonidas | 2 | Selten | – | – | – | – | 1184 | 50,6 % | 49,9 % | −1,3 |
| Eiren der Agoge | Leonidas | 2 | Gewöhnlich | – | – | – | – | 1272 | 59,8 % | 56,8 % | +5,7 |
| Astrolab für Synesios | Hypatia | 1 | Gewöhnlich | – | – | – | – | 938 | 54,3 % | 52,3 % | +2,4 |
| Pilger im Asklepieion von Saqqara | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1464 | 58,8 % | 53,0 % | −0,9 |
| Eroberung von Zara | Dandolo | 3 | Selten | – | – | – | – | 1390 | 54,2 % | 48,9 % | +3,3 |
| Irminsul | Widukind | 3 | Selten | – | – | – | – | 1420 | 56,6 % | 43,7 % | −4,2 |
| Stater des Vercingetorix | Vercingetorix | 1 | Gewöhnlich | – | – | – | – | 802 | 57,0 % | 53,0 % | +5,2 |
| Manufaktur auf der Albrechtsburg | Böttger | 3 | Selten | – | – | – | – | 1510 | 59,0 % | 45,9 % | −0,9 |
| Volmar, Schreiber Hildegards | Hildegard | 3 | Selten | – | – | – | – | 1530 | 58,2 % | 55,2 % | +4,9 |
| Kloster Pegau | Wiprecht | 4 | Episch | – | – | – | – | 1406 | 39,5 % | 42,2 % | −7,8 |
| Gefährte der Artusfahrt | Ulrich | 4 | Selten | – | – | – | – | 1394 | 49,4 % | 51,8 % | +1,7 |
| Aspasia von Milet | Perikles | 3 | Selten | – | – | – | – | 1510 | 54,7 % | 56,2 % | +3,7 |
| Aqua Virgo | Agrippa | 2 | Gewöhnlich | – | – | – | – | 1292 | 58,2 % | 53,2 % | −2,6 |
| Stele von Karnak | Ahhotep | 3 | Selten | – | – | – | – | 1448 | 54,9 % | 53,6 % | +1,6 |
| Kloster Kecharitomene | Anna | 3 | Episch | – | – | – | – | 1404 | 48,6 % | 52,3 % | +1,9 |
| Gesänge des Dichterkönigs | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1324 | 56,7 % | 46,9 % | −0,8 |
| Heiratsurkunde der Theophanu | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1276 | 57,4 % | 54,5 % | +4,4 |
| Scheinlager bei Mantineia | Epaminondas | 2 | Selten | – | – | – | – | 1296 | 37,0 % | 45,6 % | −3,7 |
| Quintus Fabius, der Sohn | Fabius | 4 | Gewöhnlich | – | – | – | – | 1508 | 59,0 % | 55,6 % | +4,1 |
| Thumelicus | Thusnelda | 3 | Gewöhnlich | – | – | – | – | 1520 | 54,2 % | 57,8 % | +5,0 |
| Brief an die Besatzung von Krak | Baibars | 4 | Selten | – | – | – | – | 1462 | 53,1 % | 52,5 % | +3,7 |
| Neuf-Brisach | Vauban | 3 | Episch | – | – | – | – | 1530 | 67,6 % | 46,2 % | −1,4 |
| Goldener Halsring von Vix | Vix | 2 | Selten | – | – | – | – | 1356 | 48,7 % | 52,7 % | +4,5 |
| Koloss von Rhodos | neutral | 6 | Episch | – | – | – | – | 51786 | 46,1 % | 51,9 % | +1,9 |
| Zeus des Phidias | neutral | 4 | Episch | – | – | – | – | 31512 | 57,9 % | 46,2 % | −3,7 |
| Himmelsscheibe von Nebra | neutral | 2 | Selten | – | – | – | – | 28596 | 34,2 % | 48,6 % | −1,4 |
| Gänse des Kapitols | neutral | 1 | Gewöhnlich | – | – | – | – | 20128 | 56,5 % | 47,0 % | −3,0 |
| Skytale | neutral | 2 | Selten | – | – | – | – | 28720 | 42,7 % | 47,1 % | −2,9 |
| „Mit ihm oder auf ihm“ | Leonidas | 2 | Gewöhnlich | – | – | – | – | 1238 | 57,7 % | 50,4 % | −0,8 |
| Orestes, Präfekt von Ägypten | Hypatia | 4 | Selten | – | – | – | – | 1484 | 50,3 % | 54,2 % | +4,3 |
| Sockel der Djoser-Statue | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1150 | 53,6 % | 54,6 % | +0,7 |
| Quadriga von San Marco | Dandolo | 3 | Selten | – | – | – | – | 1446 | 56,5 % | 45,3 % | −0,3 |
| Taufe in Attigny | Widukind | 2 | Gewöhnlich | – | – | – | – | 1246 | 51,2 % | 45,8 % | −2,1 |
| Murus Gallicus | Vercingetorix | 3 | Episch | – | – | – | – | 1410 | 62,6 % | 40,0 % | −7,8 |
| Weiße Erde aus Aue | Böttger | 2 | Gewöhnlich | – | – | – | – | 1338 | 64,8 % | 51,4 % | +4,5 |
| Lingua ignota | Hildegard | 1 | Gewöhnlich | – | – | – | – | 864 | 54,3 % | 46,9 % | −3,4 |
| Pilgerfahrt nach Santiago | Wiprecht | 3 | Selten | – | – | – | – | 1462 | 40,6 % | 46,4 % | −3,6 |
| Turnier zu Friesach | Ulrich | 3 | Selten | – | – | – | – | 1442 | 45,2 % | 52,8 % | +2,7 |
| Bauabrechnung des Parthenon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1268 | 41,8 % | 48,1 % | −4,4 |
| Weltkarte des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1282 | 38,4 % | 51,6 % | −4,3 |
| Kamose | Ahhotep | 4 | Selten | – | – | – | – | 1518 | 56,1 % | 58,8 % | +6,9 |
| Irene Dukaina | Anna | 3 | Gewöhnlich | – | – | – | – | 1492 | 55,4 % | 57,0 % | +6,7 |
| Bäder von Tetzcotzinco | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1282 | 41,5 % | 47,6 % | −0,1 |
| Theophanius imperator augustus | Theophanu | 3 | Episch | – | – | – | – | 1514 | 51,0 % | 50,1 % | −0,0 |
| Mauern von Messene | Epaminondas | 3 | Selten | – | – | – | – | 1550 | 57,8 % | 41,1 % | −8,2 |
| Schatten auf den Höhen | Fabius | 2 | Gewöhnlich | – | – | – | – | 1298 | 54,5 % | 49,8 % | −1,7 |
| Stolz im Triumphzug | Thusnelda | 2 | Gewöhnlich | – | – | – | – | 1278 | 48,8 % | 51,5 % | −1,2 |
| Moschee des Baibars | Baibars | 3 | Selten | – | – | – | – | 1462 | 51,6 % | 45,8 % | −2,9 |
| Projet d’une dîme royale | Vauban | 3 | Gewöhnlich | – | – | – | – | 1468 | 51,9 % | 45,5 % | −2,1 |
| Krater von Vix | Vix | 3 | Selten | – | – | – | – | 1616 | 51,4 % | 46,7 % | −1,5 |
| Artemistempel von Ephesos | neutral | 2 | Selten | – | – | – | – | 28402 | 60,2 % | 46,1 % | −3,9 |
| Mausoleum von Halikarnassos | neutral | 3 | Episch | – | – | – | – | 32248 | 38,4 % | 43,2 % | −6,8 |
| Ischtar-Tor | neutral | 3 | Selten | – | – | – | – | 32338 | 63,9 % | 45,9 % | −4,0 |
| Stele des Hammurapi | neutral | 2 | Selten | – | – | – | – | 28472 | 45,7 % | 44,0 % | −5,9 |
| Feuerpost | neutral | 1 | Gewöhnlich | – | – | – | – | 20264 | 57,0 % | 49,8 % | −0,2 |
