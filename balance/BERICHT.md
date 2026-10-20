# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `6f1004b44e` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die 21 anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,5.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 50600 | ✗ 21/22 | ✗ 198/231 | ✓ 47,3 % | – | 0 | 24 |
| Zufallsdecks | 50600 | ✗ 18/22 | ✗ 218/231 | ✓ 50,2 % | ✓ 52,9 % (+2,9) | 0 | 22 |

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
| Imhotep | **54,2 %** | 53,1 % | 54,6 % | Perikles 47,0 % | Hypatia 66,0 % | Defensiv: 37,0 % | ✗ |
| Marcus Agrippa | **54,2 %** | 52,3 % | 55,3 % | Imhotep 48,0 % | Vauban 64,0 % | Kombinierend: 42,8 % | ✗ |
| Leonidas I. | **52,1 %** | 52,0 % | 51,8 % | Dandolo 45,0 % | Vauban 65,5 % | Defensiv: 35,4 % | ✓ |
| Theophanu | **51,9 %** | 51,6 % | 51,9 % | Fabius 43,5 % | Widukind 60,5 % | Defensiv: 35,6 % | ✓ |
| Thusnelda | **51,7 %** | 49,9 % | 53,3 % | Nezahualcóyotl 43,5 % | Hypatia 58,0 % | Kombinierend: 42,6 % | ✓ |
| Ahhotep I. | **50,9 %** | 50,4 % | 51,2 % | Fabius 46,0 % | Widukind 60,5 % | Aggressiv: 45,6 % | ✓ |
| Fabius Maximus | **50,9 %** | 51,0 % | 50,7 % | Ulrich 46,0 % | Theophanu 56,5 % | Defensiv: 37,8 % | ✓ |
| Ulrich von Liechtenstein | **50,7 %** | 52,2 % | 49,0 % | Leonidas 45,0 % | Hypatia 56,0 % | Aggressiv: 49,6 % | ✓ |
| Epaminondas | **50,3 %** | 48,8 % | 51,8 % | Ahhotep 45,0 % | Dandolo 58,0 % | Aggressiv: 43,8 % | ✓ |
| Baibars | **50,2 %** | 50,8 % | 49,5 % | Imhotep 44,0 % | Dandolo 61,5 % | Aggressiv: 39,5 % | ✓ |
| Perikles | **50,1 %** | 51,6 % | 48,7 % | Thusnelda 42,0 % | Nezahualcóyotl 63,0 % | Defensiv: 37,7 % | ✓ |
| Hildegard von Bingen | **49,9 %** | 51,2 % | 48,7 % | Agrippa 43,0 % | Anna 60,5 % | Aggressiv: 47,3 % | ✓ |
| Nezahualcóyotl | **49,9 %** | 51,5 % | 48,3 % | Perikles 37,0 % | Vauban 62,0 % | Defensiv: 35,6 % | ✓ |
| Anna Komnene | **49,7 %** | 51,4 % | 48,0 % | Hildegard 39,5 % | Böttger 60,5 % | Kombinierend: 37,7 % | ✓ |
| Wiprecht von Groitzsch | **49,3 %** | 50,1 % | 48,7 % | Thusnelda 43,5 % | Widukind 55,5 % | Aggressiv: 43,4 % | ✓ |
| Vercingetorix | **49,1 %** | 48,3 % | 50,1 % | Theophanu 40,5 % | Perikles 57,5 % | Aggressiv: 45,0 % | ✓ |
| Fürstin von Vix | **49,0 %** | 50,0 % | 48,0 % | Agrippa 38,5 % | Hypatia 56,0 % | Kombinierend: 41,3 % | ✓ |
| Enrico Dandolo | **48,4 %** | 50,1 % | 46,9 % | Baibars 38,5 % | Hildegard 55,5 % | Kombinierend: 38,3 % | ✓ |
| Hypatia | **47,9 %** | 48,3 % | 47,9 % | Imhotep 34,0 % | Böttger 57,5 % | Kombinierend: 41,3 % | ✓ |
| Widukind | **47,0 %** | 45,8 % | 48,8 % | Imhotep 38,0 % | Dandolo 58,0 % | Aggressiv: 45,0 % | ✓ |
| Vauban | **46,8 %** | 46,3 % | 47,7 % | Leonidas 34,5 % | Hypatia 53,0 % | Defensiv: 37,9 % | ✗ |
| Johann Friedrich Böttger | **45,8 %** | 48,0 % | 44,3 % | Leonidas 37,5 % | Vix 53,0 % | Kombinierend: 39,6 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Widu. | Verc. | Bött. | Hild. | Wipr. | Ulri. | Peri. | Agri. | Ahho. | Anna. | Neza. | Theo. | Epam. | Fabi. | Thus. | Baib. | Vaub. | Vix. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 53 | 47 | 45 | 60 | 57 | **63** | 53 | 46 | 55 | 57 | 50 | 46 | 46 | 52 | 50 | 50 | 50 | 49 | 52 | **66** | 51 |
| Hypatia | 47 | · | **34** | 49 | 47 | 52 | 57 | 49 | 45 | 44 | 48 | 46 | 53 | 48 | 56 | 47 | 50 | 50 | 42 | 53 | 47 | 44 |
| Imhotep | 53 | **66** | · | 56 | **62** | 59 | 59 | 50 | 50 | 54 | 47 | 52 | 53 | 53 | 52 | 55 | 49 | 52 | 54 | 56 | 52 | 59 |
| Dandolo | 55 | 52 | 44 | · | 42 | 53 | 53 | 56 | 51 | 54 | 51 | 44 | 46 | 46 | 47 | 51 | 42 | 45 | 48 | **39** | 51 | 49 |
| Widukind | 41 | 53 | **38** | 58 | · | 44 | 56 | 45 | 45 | 44 | 48 | 40 | **40** | 50 | 49 | **40** | 49 | 48 | 51 | 52 | 53 | 49 |
| Vercingetorix | 43 | 48 | 41 | 47 | 56 | · | 50 | 55 | 45 | 51 | 57 | 46 | 50 | 52 | 44 | 41 | 55 | 53 | 50 | 51 | 53 | 49 |
| Böttger | **38** | 43 | 41 | 48 | 44 | 51 | · | 52 | 47 | 51 | 42 | 46 | 44 | **40** | 46 | 43 | 52 | 45 | 48 | 45 | 49 | 53 |
| Hildegard | 48 | 51 | 51 | 44 | 55 | 45 | 49 | · | 52 | 50 | 49 | 43 | 48 | **61** | 51 | 53 | 51 | 52 | 47 | 55 | 50 | 46 |
| Wiprecht | 54 | 55 | 51 | 49 | 55 | 55 | 53 | 48 | · | 45 | 46 | 45 | 53 | 48 | 47 | 48 | 46 | 46 | 44 | 47 | 52 | 51 |
| Ulrich | 45 | 56 | 47 | 46 | 56 | 49 | 49 | 50 | 55 | · | 54 | 46 | 51 | 51 | 48 | 46 | 53 | 54 | 51 | 52 | 54 | 54 |
| Perikles | 43 | 53 | 53 | 49 | 53 | 43 | 59 | 51 | 54 | 47 | · | 51 | 54 | 48 | **63** | 47 | 50 | 48 | 42 | 49 | 50 | 51 |
| Agrippa | 51 | 54 | 48 | 56 | 60 | 54 | 54 | 57 | 55 | 54 | 50 | · | 52 | 52 | 55 | 55 | 53 | 51 | 51 | 52 | **64** | **62** |
| Ahhotep | 54 | 48 | 48 | 54 | **61** | 51 | 56 | 52 | 47 | 49 | 47 | 49 | · | 54 | 51 | 52 | 55 | 46 | 47 | 50 | 47 | 53 |
| Anna | 54 | 52 | 48 | 54 | 51 | 49 | **61** | **40** | 52 | 49 | 52 | 48 | 46 | · | 56 | 45 | 44 | 50 | 43 | 50 | 55 | 47 |
| Nezahualcóyotl | 49 | 44 | 48 | 53 | 51 | 56 | 54 | 50 | 53 | 53 | **37** | 45 | 49 | 44 | · | 43 | 51 | 52 | 56 | 48 | **62** | 50 |
| Theophanu | 51 | 53 | 45 | 50 | **61** | 60 | 57 | 48 | 52 | 54 | 53 | 45 | 49 | 55 | 57 | · | 48 | 44 | 54 | 51 | 53 | 52 |
| Epaminondas | 51 | 50 | 51 | 58 | 51 | 45 | 48 | 49 | 54 | 48 | 51 | 47 | 45 | 56 | 49 | 52 | · | 49 | 52 | 49 | 52 | 52 |
| Fabius | 51 | 50 | 48 | 55 | 52 | 48 | 55 | 48 | 54 | 46 | 52 | 49 | 54 | 50 | 48 | 56 | 52 | · | 46 | 53 | 52 | 51 |
| Thusnelda | 51 | 58 | 47 | 52 | 49 | 51 | 53 | 53 | 56 | 50 | 58 | 50 | 53 | 57 | 44 | 46 | 49 | 54 | · | 48 | 55 | 56 |
| Baibars | 49 | 47 | 44 | **62** | 49 | 50 | 55 | 45 | 53 | 48 | 51 | 49 | 50 | 50 | 52 | 50 | 51 | 48 | 52 | · | 53 | 50 |
| Vauban | **35** | 53 | 48 | 49 | 48 | 47 | 52 | 51 | 48 | 46 | 51 | **36** | 53 | 45 | **38** | 47 | 48 | 48 | 45 | 48 | · | 49 |
| Vix | 49 | 56 | 42 | 51 | 52 | 52 | 47 | 54 | 49 | 46 | 50 | **39** | 48 | 53 | 51 | 48 | 49 | 50 | 44 | 51 | 51 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 44,9 % aufs Gesicht, 13,3 % auf Bauwerke · **Defensiv** (7 Helden) 36,7 % aufs Gesicht, 15,7 % auf Bauwerke · **Kombinierend** (7 Helden) 40,5 % aufs Gesicht, 14,8 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 24,0, Median 22, 10–90 %: 15–36, kürzeste 8, längste 71. Beginner gewinnt 50,2 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Phalanxveteran | Leonidas | 5 | 62,2 % | +10,3 | 61,4 % |
| Griechisches Feuer | Anna | 4 | 59,4 % | +9,7 | 52,9 % |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 59,5 % | +9,6 | 59,5 % |
| Kataphrakt | Anna | 5 | 59,0 % | +9,2 | 50,7 % |
| Chronist am Kaiserhof | Anna | 6 | 58,5 % | +8,8 | 60,6 % |
| Botin der Cherusker | Thusnelda | 1 | 59,9 % | +8,4 | 55,6 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 59,9 % | +8,0 | 54,8 % |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | 57,8 % | +7,5 | 53,6 % |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | 43,9 % | −5,9 | 55,3 % |
| Weißes Gold | Böttger | 3 | 40,2 % | −5,9 | 3,9 % |
| Sternschanze | Frühe Neuzeit | 2 | 41,4 % | −6,2 | 65,4 % |
| Odeion | Perikles | 4 | 43,9 % | −6,2 | 42,2 % |
| Burgfried | Mittelalter im Reich | 2 | 43,6 % | −6,2 | 59,3 % |
| Vorgetäuschte Flucht | Baibars | 1 | 43,5 % | −6,7 | 20,5 % |
| Zitadelle von Lille | Vauban | 4 | 40,3 % | −6,7 | 60,5 % |
| Ka-Statue | Imhotep | 2 | 46,6 % | −7,3 | 60,2 % |

**Legendäre** (AP 5.3) – als Gruppe 52,9 % „gewinnt, wenn gezogen“ (+2,9 gegenüber ihrem Helden, 62468 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Gorgo, Stimme Spartas | Leonidas | 7 | 59,9 % | +8,0 | 54,8 % |
| Djoser, der Erbauer | Imhotep | 6 | 58,6 % | +4,7 | 54,1 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 55,2 % | +1,4 | 51,5 % |
| Bund der Stämme | Thusnelda | 8 | 55,1 % | +3,5 | 48,1 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 54,8 % | +4,8 | 49,6 % |
| Qalawun, Emir der Bahriya | Baibars | 6 | 54,4 % | +4,2 | 52,5 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 54,3 % | +5,8 | 50,3 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 54,1 % | +4,0 | 57,5 % |
| Otto II., Kaiser | Theophanu | 6 | 54,1 % | +2,4 | 59,6 % |
| Judith von Böhmen | Wiprecht | 7 | 53,6 % | +4,2 | 51,1 % |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | 53,3 % | +3,0 | 49,2 % |
| Friedrich der Streitbare | Ulrich | 6 | 52,2 % | +1,6 | 49,0 % |
| Abbi, Gefährte Widukinds | Widukind | 6 | 52,1 % | +4,8 | 48,0 % |
| Theon von Alexandria | Hypatia | 5 | 52,0 % | +3,9 | 55,6 % |
| Herodot, Vater der Geschichte | neutral | 4 | 51,4 % | +1,4 | 48,3 % |
| Alexios I. Komnenos | Anna | 6 | 51,3 % | +1,6 | 51,5 % |
| Gesandter aus Massalia | Vix | 6 | 51,1 % | +2,1 | 55,0 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 50,9 % | +1,0 | 51,1 % |
| Zeremonialaxt des Ahmose | Ahhotep | 6 | 50,3 % | −0,5 | 51,3 % |
| Marcellus, Schwert Roms | Fabius | 6 | 50,1 % | −0,7 | 53,2 % |
| Commius, Führer des Entsatzheers | Vercingetorix | 8 | 49,5 % | +0,3 | 49,7 % |
| Ludwig XIV., der Sonnenkönig | Vauban | 5 | 49,4 % | +2,4 | 51,4 % |
| Jutta von Sponheim, Magistra | Hildegard | 7 | 49,2 % | −0,7 | 46,1 % |
| Tschirnhaus, Naturforscher | Böttger | 5 | 46,6 % | +0,4 | 59,9 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 4600 | 81,0 % | 54,1 % | +0,7 | 972 | 56,5 % | 57,1 % | +5,2 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 4600 | 82,3 % | 54,2 % | +0,8 | 1400 | 61,2 % | 57,9 % | +6,0 |
| Bronzener Wall | Leonidas | 2 | Basis | 4600 | 82,5 % | 54,7 % | +1,3 | 1348 | 55,4 % | 53,4 % | +1,5 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 4600 | 77,2 % | 55,7 % | +2,3 | 1570 | 52,2 % | 51,0 % | −0,9 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1574 | 65,1 % | 53,4 % | +1,5 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1568 | 59,6 % | 52,5 % | +0,6 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1846 | 61,4 % | 62,2 % | +10,3 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1478 | 51,6 % | 54,4 % | +2,6 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 2266 | 58,3 % | 51,1 % | −0,8 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 1878 | 54,8 % | 59,9 % | +8,0 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 4600 | 82,5 % | 51,3 % | −1,3 | 970 | 53,9 % | 46,3 % | −1,8 |
| Erdmessung des Eratosthenes | Hypatia | 2 | Basis | 4600 | 87,2 % | 52,8 % | +0,3 | 1364 | 61,5 % | 50,7 % | +2,6 |
| Sternenkundiger | Hypatia | 3 | Basis | 4600 | 82,1 % | 54,4 % | +1,8 | 1780 | 57,4 % | 48,8 % | +0,7 |
| Sternkatalog des Hipparchos | Hypatia | 4 | Basis | 4600 | 79,3 % | 56,4 % | +3,8 | 1516 | 53,4 % | 52,8 % | +4,7 |
| Synesios von Kyrene | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1638 | 61,2 % | 54,1 % | +6,0 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1420 | 38,6 % | 43,7 % | −4,4 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1788 | 55,0 % | 51,5 % | +3,4 |
| Brennspiegel des Archimedes | Hypatia | 6 | Selten | – | – | – | – | 2336 | 60,7 % | 45,0 % | −3,1 |
| Klaudios Ptolemaios | Hypatia | 5 | Episch | – | – | – | – | 1812 | 59,7 % | 48,8 % | +0,7 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1884 | 55,6 % | 52,0 % | +3,9 |
| Nilschülerin | Imhotep | 1 | Basis | 4600 | 82,9 % | 51,6 % | −0,3 | 1016 | 55,7 % | 57,8 % | +4,0 |
| Heilender Balsam | Imhotep | 1 | Basis | 4600 | 83,7 % | 53,8 % | +2,0 | 926 | 62,9 % | 57,0 % | +3,1 |
| Pyramidenwächter | Imhotep | 3 | Basis | 4600 | 84,2 % | 53,2 % | +1,3 | 1578 | 60,3 % | 56,4 % | +2,6 |
| Tempelärztin | Imhotep | 4 | Basis | 4600 | 80,7 % | 52,5 % | +0,6 | 1520 | 55,6 % | 54,0 % | +0,1 |
| Brot und Bier | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1364 | 57,1 % | 54,4 % | +0,5 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1572 | 60,6 % | 60,3 % | +6,4 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1578 | 53,4 % | 51,7 % | −2,1 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1950 | 58,0 % | 58,3 % | +4,4 |
| Urteil nach der Maat | Imhotep | 5 | Episch | – | – | – | – | 1810 | 60,8 % | 48,6 % | −5,3 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 2306 | 54,1 % | 58,6 % | +4,7 |
| Lagunenbote | Dandolo | 1 | Basis | 4600 | 80,3 % | 52,5 % | +2,7 | 970 | 54,4 % | 55,7 % | +7,2 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 4600 | 79,7 % | 48,9 % | −0,9 | 1416 | 57,9 % | 46,6 % | −1,9 |
| Präziser Stich | Dandolo | 2 | Basis | 4600 | 85,1 % | 51,3 % | +1,5 | 1412 | 57,9 % | 48,7 % | +0,2 |
| Handelsgesandter | Dandolo | 4 | Basis | 4600 | 79,2 % | 53,3 % | +3,5 | 1480 | 55,1 % | 52,0 % | +3,5 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1502 | 49,4 % | 50,2 % | +1,7 |
| Nachtwache am Kanal | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1494 | 55,4 % | 47,4 % | −1,1 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1356 | 54,3 % | 50,4 % | +1,9 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1762 | 55,6 % | 50,9 % | +2,4 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1726 | 41,9 % | 46,9 % | −1,6 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 2288 | 50,3 % | 54,3 % | +5,8 |
| Späher aus Engern | Widukind | 1 | Basis | 4600 | 75,4 % | 49,1 % | −1,1 | 1020 | 51,4 % | 50,4 % | +3,1 |
| Speerwerfer aus Westfalen | Widukind | 2 | Basis | 4600 | 77,0 % | 49,3 % | −0,9 | 1444 | 56,1 % | 47,3 % | −0,0 |
| Pfeilschuss | Widukind | 2 | Basis | 4600 | 76,1 % | 47,8 % | −2,4 | 1452 | 54,8 % | 47,5 % | +0,2 |
| Reiter der Edelinge | Widukind | 4 | Basis | 4600 | 70,7 % | 54,8 % | +4,7 | 1480 | 49,7 % | 53,7 % | +6,4 |
| Falknerin | Widukind | 3 | Gewöhnlich | – | – | – | – | 1528 | 48,6 % | 46,4 % | −0,9 |
| Sachsenaufstand | Widukind | 3 | Gewöhnlich | – | – | – | – | 1484 | 49,7 % | 43,1 % | −4,2 |
| Schildträger aus Ostfalen | Widukind | 5 | Selten | – | – | – | – | 1646 | 51,1 % | 49,4 % | +2,1 |
| Sturm auf die Eresburg | Widukind | 6 | Selten | – | – | – | – | 2178 | 51,6 % | 51,0 % | +3,7 |
| Gefolgschaft Widukinds | Widukind | 6 | Episch | – | – | – | – | 2234 | 48,0 % | 46,6 % | −0,7 |
| Abbi, Gefährte Widukinds | Widukind | 6 | Legendär | – | – | – | – | 2140 | 48,0 % | 52,1 % | +4,8 |
| Hüterin des Hains | Vercingetorix | 1 | Basis | 4600 | 82,4 % | 47,2 % | −1,6 | 1060 | 57,1 % | 49,9 % | +0,7 |
| Schild aus Eichenholz | Vercingetorix | 2 | Basis | 4600 | 75,3 % | 47,5 % | −1,4 | 1448 | 46,2 % | 48,2 % | −1,0 |
| Krieger der Arverner | Vercingetorix | 3 | Basis | 4600 | 85,4 % | 50,1 % | +1,3 | 1568 | 60,3 % | 54,6 % | +5,4 |
| Hieb mit dem Langschwert | Vercingetorix | 3 | Basis | 4600 | 84,8 % | 48,0 % | −0,8 | 1566 | 62,2 % | 45,6 % | −3,6 |
| Reiter der Arverner | Vercingetorix | 4 | Gewöhnlich | – | – | – | – | 1450 | 51,6 % | 49,2 % | +0,0 |
| Heilkundige mit der Mistel | Vercingetorix | 3 | Gewöhnlich | – | – | – | – | 1618 | 57,8 % | 49,3 % | +0,1 |
| Erhebung der Gallier | Vercingetorix | 3 | Selten | – | – | – | – | 1512 | 58,3 % | 54,4 % | +5,2 |
| Verteidiger von Gergovia | Vercingetorix | 6 | Selten | – | – | – | – | 2308 | 56,0 % | 51,0 % | +1,7 |
| Letzter Ritt vor Alesia | Vercingetorix | 5 | Episch | – | – | – | – | 1792 | 40,3 % | 44,1 % | −5,1 |
| Commius, Führer des Entsatzheers | Vercingetorix | 8 | Legendär | – | – | – | – | 1268 | 49,7 % | 49,5 % | +0,3 |
| Apothekerlehrling | Böttger | 1 | Basis | 4600 | 85,5 % | 53,8 % | +2,8 | 992 | 66,5 % | 48,4 % | +2,3 |
| Verpuffung im Laboratorium | Böttger | 2 | Basis | 4600 | 89,3 % | 53,9 % | +2,9 | 1450 | 69,1 % | 48,6 % | +2,4 |
| Bergmann aus Aue | Böttger | 3 | Basis | 4600 | 85,4 % | 52,1 % | +1,0 | 1630 | 55,8 % | 43,6 % | −2,6 |
| Rezept des Goldmachers | Böttger | 4 | Basis | 4600 | 67,0 % | 51,5 % | +0,4 | 1402 | 31,5 % | 43,6 % | −2,6 |
| Pestarzt | Böttger | 4 | Gewöhnlich | – | – | – | – | 1456 | 63,7 % | 53,6 % | +7,5 |
| Befehl des Kurfürsten | Böttger | 2 | Gewöhnlich | – | – | – | – | 1480 | 64,5 % | 50,9 % | +4,7 |
| Schreiber der Manufaktur | Böttger | 5 | Selten | – | – | – | – | 1654 | 58,5 % | 42,8 % | −3,4 |
| Glut des Brennofens | Böttger | 5 | Selten | – | – | – | – | 1652 | 49,2 % | 47,5 % | +1,4 |
| Wache auf dem Königstein | Böttger | 6 | Episch | – | – | – | – | 2220 | 65,2 % | 46,0 % | −0,2 |
| Tschirnhaus, Naturforscher | Böttger | 5 | Legendär | – | – | – | – | 1726 | 59,9 % | 46,6 % | +0,4 |
| Pförtnerin vom Rupertsberg | Hildegard | 1 | Basis | 4600 | 78,7 % | 49,9 % | −0,6 | 1072 | 57,7 % | 57,0 % | +7,1 |
| Grünkraft | Hildegard | 2 | Basis | 4600 | 79,0 % | 50,5 % | −0,1 | 1448 | 54,5 % | 52,5 % | +2,6 |
| Klostervogt | Hildegard | 3 | Basis | 4600 | 78,8 % | 51,4 % | +0,9 | 1592 | 57,9 % | 50,3 % | +0,4 |
| Einkleidung der Novizinnen | Hildegard | 2 | Basis | 4600 | 77,1 % | 49,1 % | −1,4 | 1448 | 57,0 % | 52,9 % | +3,0 |
| Pilger am Rhein | Hildegard | 4 | Gewöhnlich | – | – | – | – | 1422 | 45,4 % | 47,5 % | −2,4 |
| Segen der Äbtissin | Hildegard | 2 | Gewöhnlich | – | – | – | – | 1434 | 50,3 % | 49,2 % | −0,7 |
| Vorsängerin im Chor | Hildegard | 5 | Selten | – | – | – | – | 1700 | 52,2 % | 51,9 % | +2,0 |
| Spiel der Tugenden | Hildegard | 6 | Selten | – | – | – | – | 2140 | 48,6 % | 52,8 % | +2,9 |
| Ritter mit dem Schutzbrief | Hildegard | 7 | Episch | – | – | – | – | 1940 | 47,2 % | 48,5 % | −1,4 |
| Jutta von Sponheim, Magistra | Hildegard | 7 | Legendär | – | – | – | – | 1878 | 46,1 % | 49,2 % | −0,7 |
| Siedler aus Franken | Wiprecht | 1 | Basis | 4600 | 77,3 % | 47,3 % | −2,3 | 1052 | 53,6 % | 50,6 % | +1,2 |
| Fehde | Wiprecht | 2 | Basis | 4600 | 81,6 % | 48,8 % | −0,8 | 1456 | 64,0 % | 47,7 % | −1,7 |
| Burgmann von Groitzsch | Wiprecht | 3 | Basis | 4600 | 80,7 % | 50,8 % | +1,2 | 1580 | 58,4 % | 54,2 % | +4,8 |
| Lokator | Wiprecht | 4 | Basis | 4600 | 76,2 % | 51,5 % | +1,9 | 1482 | 55,0 % | 47,0 % | −2,4 |
| Verhau | Wiprecht | 3 | Gewöhnlich | – | – | – | – | 1574 | 62,5 % | 48,7 % | −0,7 |
| Panzerreiter | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1492 | 52,2 % | 51,8 % | +2,4 |
| Rodung | Wiprecht | 3 | Selten | – | – | – | – | 1572 | 55,2 % | 52,4 % | +3,0 |
| Grenzwächter der Mark | Wiprecht | 5 | Selten | – | – | – | – | 1822 | 53,7 % | 46,4 % | −3,0 |
| Heerfahrt nach Italien | Wiprecht | 5 | Episch | – | – | – | – | 1744 | 56,5 % | 50,6 % | +1,2 |
| Judith von Böhmen | Wiprecht | 7 | Legendär | – | – | – | – | 2052 | 51,1 % | 53,6 % | +4,2 |
| Edelknabe | Ulrich | 1 | Basis | 4600 | 80,9 % | 48,5 % | −0,4 | 1032 | 55,6 % | 49,4 % | −1,2 |
| Lanzenstoß | Ulrich | 1 | Basis | 4600 | 84,0 % | 49,6 % | +0,8 | 966 | 56,4 % | 50,9 % | +0,3 |
| Fahrender Ritter | Ulrich | 3 | Basis | 4600 | 83,3 % | 49,5 % | +0,7 | 1606 | 52,1 % | 52,9 % | +2,3 |
| Minnebrief | Ulrich | 2 | Basis | 4600 | 74,1 % | 50,8 % | +1,9 | 1464 | 46,7 % | 53,5 % | +2,9 |
| Minneritter | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1678 | 56,4 % | 54,3 % | +3,7 |
| Mit eingelegter Lanze | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1516 | 43,5 % | 47,9 % | −2,7 |
| Kämpe im Buhurt | Ulrich | 4 | Selten | – | – | – | – | 1464 | 42,8 % | 46,8 % | −3,8 |
| Venusfahrt | Ulrich | 5 | Selten | – | – | – | – | 1760 | 45,2 % | 55,3 % | +4,7 |
| Landrichter der Steiermark | Ulrich | 6 | Episch | – | – | – | – | 2250 | 54,7 % | 49,0 % | −1,6 |
| Friedrich der Streitbare | Ulrich | 6 | Legendär | – | – | – | – | 2148 | 49,0 % | 52,2 % | +1,6 |
| Dorfwache | neutral | 1 | Basis | 101200 | 80,7 % | 49,2 % | −0,8 | 22648 | 57,1 % | 50,6 % | +0,7 |
| Wandernder Händler | neutral | 2 | Basis | 101200 | 80,9 % | 49,0 % | −1,0 | 31518 | 56,5 % | 49,3 % | −0,7 |
| Steinschleuderer | neutral | 2 | Basis | 101200 | 80,9 % | 49,7 % | −0,3 | 31460 | 56,4 % | 50,9 % | +0,9 |
| Wilderin | neutral | 3 | Basis | 101200 | 83,3 % | 49,8 % | −0,3 | 34646 | 58,9 % | 50,1 % | +0,2 |
| Torwache der Burg | neutral | 4 | Basis | 101200 | 76,9 % | 51,3 % | +1,2 | 33338 | 51,3 % | 50,3 % | +0,3 |
| Kavallerist | neutral | 4 | Basis | 101200 | 78,3 % | 51,3 % | +1,3 | 33108 | 51,8 % | 51,4 % | +1,4 |
| Feldheilerin | neutral | 3 | Basis | 101200 | 80,8 % | 49,6 % | −0,5 | 34882 | 56,1 % | 49,8 % | −0,1 |
| Archivarin | neutral | 4 | Basis | 101200 | 74,7 % | 52,6 % | +2,6 | 33654 | 50,1 % | 50,0 % | −0,0 |
| Wachhund | neutral | 2 | Basis | 101200 | 78,3 % | 48,9 % | −1,1 | 31400 | 54,7 % | 49,4 % | −0,6 |
| Veteran | neutral | 5 | Basis | 101200 | 79,3 % | 52,5 % | +2,5 | 40484 | 54,5 % | 49,3 % | −0,7 |
| Belagerungsturm | neutral | 6 | Basis | 101200 | 76,8 % | 55,2 % | +5,2 | 51260 | 55,8 % | 50,4 % | +0,4 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 35080 | 54,6 % | 50,6 % | +0,6 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 22210 | 56,2 % | 51,9 % | +1,9 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 40388 | 55,2 % | 53,1 % | +3,1 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 34772 | 54,3 % | 49,8 % | −0,2 |
| Nachtwächter | neutral | 2 | Basis | – | – | – | – | 31498 | 54,3 % | 50,4 % | +0,4 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 31480 | 46,7 % | 49,6 % | −0,4 |
| Heilkräuter | neutral | 1 | Basis | – | – | – | – | 22658 | 53,5 % | 47,6 % | −2,3 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 31294 | 60,1 % | 49,3 % | −0,6 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 45324 | 56,4 % | 54,0 % | +4,0 |
| Ordensritter | neutral | 3 | Gewöhnlich | – | – | – | – | 34970 | 57,0 % | 51,5 % | +1,5 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 33672 | 52,3 % | 49,7 % | −0,3 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 31360 | 56,4 % | 52,0 % | +2,1 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 33362 | 52,9 % | 51,6 % | +1,6 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 34962 | 60,4 % | 52,7 % | +2,7 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 31402 | 35,9 % | 46,6 % | −3,3 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 33510 | 52,8 % | 48,6 % | −1,3 |
| Prätorianer | neutral | 5 | Gewöhnlich | – | – | – | – | 40482 | 52,2 % | 50,3 % | +0,3 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 33220 | 56,0 % | 53,9 % | +4,0 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 33472 | 51,7 % | 53,3 % | +3,3 |
| Löwin der Arena | neutral | 5 | Selten | – | – | – | – | 40770 | 56,4 % | 51,8 % | +1,8 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 40566 | 54,3 % | 49,6 % | −0,4 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 33324 | 47,9 % | 49,0 % | −1,0 |
| Trojanisches Pferd | neutral | 6 | Selten | – | – | – | – | 51584 | 58,5 % | 50,8 % | +0,8 |
| Brander | neutral | 7 | Episch | – | – | – | – | 45190 | 52,0 % | 52,9 % | +2,9 |
| Mercators Atlas | neutral | 4 | Episch | – | – | – | – | 33644 | 33,2 % | 50,2 % | +0,2 |
| Burgbesatzung | neutral | 8 | Episch | – | – | – | – | 30752 | 50,6 % | 57,2 % | +7,2 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 45404 | 59,3 % | 52,8 % | +2,8 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 33370 | 48,3 % | 51,4 % | +1,4 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 30730 | 49,6 % | 54,8 % | +4,8 |
| Spitzel im Venezianerviertel | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1406 | 64,0 % | 50,4 % | +1,9 |
| Plünderer am Rhein | Widukind | 3 | Gewöhnlich | – | – | – | – | 1608 | 53,6 % | 44,3 % | −3,0 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1376 | 56,4 % | 54,9 % | +1,0 |
| Zwanzig Städte in Flammen | Vercingetorix | 3 | Selten | – | – | – | – | 1532 | 55,1 % | 49,6 % | +0,4 |
| Eid der Arkanisten | Böttger | 1 | Selten | – | – | – | – | 1024 | 67,4 % | 49,7 % | +3,6 |
| Böhmischer Söldner | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1374 | 51,1 % | 45,1 % | −4,3 |
| Brandschatzung | Wiprecht | 1 | Gewöhnlich | – | – | – | – | 1018 | 62,3 % | 48,9 % | −0,5 |
| Heimlicher Bote | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1434 | 53,8 % | 54,6 % | +3,9 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 31358 | 55,9 % | 48,8 % | −1,2 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 22622 | 57,2 % | 52,0 % | +2,0 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 31310 | 60,6 % | 55,4 % | +5,4 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 34858 | 55,6 % | 53,0 % | +3,1 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 34804 | 58,8 % | 50,5 % | +0,6 |
| Ruderer der Triere | Perikles | 1 | Basis | 4600 | 79,4 % | 50,4 % | +1,5 | 1058 | 59,2 % | 52,6 % | +2,4 |
| Lange Mauern | Perikles | 2 | Basis | 4600 | 79,5 % | 45,5 % | −3,5 | 1376 | 57,3 % | 48,1 % | −2,0 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 4600 | 81,7 % | 52,3 % | +3,4 | 1614 | 62,8 % | 54,3 % | +4,1 |
| Strategos | Perikles | 3 | Basis | 4600 | 79,8 % | 51,7 % | +2,8 | 1506 | 60,1 % | 53,4 % | +3,3 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1628 | 51,5 % | 45,9 % | −4,2 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1432 | 64,0 % | 55,2 % | +5,1 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1474 | 58,7 % | 57,0 % | +6,8 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1436 | 43,7 % | 48,9 % | −1,2 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1532 | 42,2 % | 43,9 % | −6,2 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 2174 | 57,5 % | 54,1 % | +4,0 |
| Pilumwerfer | Agrippa | 1 | Basis | 4600 | 77,6 % | 52,3 % | +4,0 | 1048 | 59,8 % | 55,3 % | +1,5 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 4600 | 72,9 % | 49,9 % | +1,5 | 1386 | 52,8 % | 55,3 % | +1,5 |
| Castra | Agrippa | 3 | Basis | 4600 | 83,2 % | 50,1 % | +1,8 | 1460 | 65,2 % | 53,8 % | −0,0 |
| Testudo | Agrippa | 2 | Basis | 4600 | 74,6 % | 50,4 % | +2,1 | 1420 | 54,8 % | 57,0 % | +3,2 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1624 | 57,1 % | 53,8 % | +0,0 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1588 | 54,4 % | 57,4 % | +3,5 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1790 | 57,1 % | 56,4 % | +2,5 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1448 | 57,0 % | 51,0 % | −2,8 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1496 | 45,5 % | 54,4 % | +0,5 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1802 | 51,5 % | 55,2 % | +1,4 |
| Bogenschütze aus Elkab | Ahhotep | 1 | Basis | 4600 | 82,4 % | 51,3 % | −0,2 | 1014 | 58,1 % | 52,6 % | +1,8 |
| Krieger der Nilflotte | Ahhotep | 2 | Basis | 4600 | 80,9 % | 51,1 % | −0,4 | 1432 | 51,7 % | 50,3 % | −0,5 |
| Pfeilregen vor Auaris | Ahhotep | 2 | Basis | 4600 | 78,8 % | 52,4 % | +0,9 | 1316 | 52,7 % | 50,9 % | +0,1 |
| Speerträger aus Theben | Ahhotep | 3 | Basis | 4600 | 83,9 % | 52,3 % | +0,8 | 1578 | 57,6 % | 55,4 % | +4,6 |
| Priester der Selket | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1580 | 59,1 % | 51,7 % | +0,9 |
| Medjai-Kundschafter | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1570 | 55,6 % | 50,0 % | −0,9 |
| Erbeuteter Streitwagen | Ahhotep | 6 | Selten | – | – | – | – | 2328 | 59,8 % | 54,6 % | +3,8 |
| Überfall auf Nefrusi | Ahhotep | 3 | Selten | – | – | – | – | 1554 | 56,4 % | 49,7 % | −1,1 |
| Ahmose, Befreier Ägyptens | Ahhotep | 5 | Episch | – | – | – | – | 1850 | 59,5 % | 46,1 % | −4,7 |
| Zeremonialaxt des Ahmose | Ahhotep | 6 | Legendär | – | – | – | – | 2338 | 51,3 % | 50,3 % | −0,5 |
| Kopistin der Chronik | Anna | 1 | Basis | 4600 | 81,5 % | 53,6 % | +3,0 | 1048 | 59,0 % | 55,0 % | +5,2 |
| Pantokrator-Spital | Anna | 3 | Basis | 4600 | 73,1 % | 51,6 % | +1,0 | 1532 | 36,7 % | 49,5 % | −0,2 |
| Warägergardist | Anna | 3 | Basis | 4600 | 82,7 % | 55,1 % | +4,5 | 1650 | 59,1 % | 56,1 % | +6,4 |
| Hofärztin | Anna | 3 | Basis | 4600 | 81,8 % | 50,7 % | +0,1 | 1472 | 48,0 % | 46,9 % | −2,8 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1524 | 52,9 % | 59,4 % | +9,7 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1472 | 49,1 % | 56,6 % | +6,9 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1770 | 50,7 % | 59,0 % | +9,2 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1566 | 44,0 % | 49,8 % | +0,1 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1736 | 53,8 % | 51,6 % | +1,9 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 2216 | 51,5 % | 51,3 % | +1,6 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 4600 | 82,5 % | 48,7 % | +0,0 | 1000 | 60,7 % | 53,6 % | +3,7 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 4600 | 81,7 % | 48,9 % | +0,2 | 1410 | 58,2 % | 53,4 % | +3,5 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 4600 | 83,3 % | 49,3 % | +0,7 | 1402 | 61,3 % | 49,5 % | −0,4 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 4600 | 82,8 % | 47,9 % | −0,7 | 1654 | 63,1 % | 52,4 % | +2,5 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1428 | 60,8 % | 47,8 % | −2,1 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1400 | 59,1 % | 49,1 % | −0,8 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1596 | 56,1 % | 55,8 % | +5,9 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1564 | 55,3 % | 43,9 % | −5,9 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 2380 | 59,5 % | 59,5 % | +9,6 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 1746 | 51,1 % | 50,9 % | +1,0 |
| Lehnsmann | Theophanu | 1 | Basis | 4600 | 82,1 % | 45,2 % | −2,6 | 972 | 61,3 % | 52,5 % | +0,8 |
| Bogenschütze der Pfalz | Theophanu | 2 | Basis | 4600 | 82,6 % | 46,2 % | −1,6 | 1368 | 63,3 % | 53,5 % | +1,8 |
| Treueschwur | Theophanu | 1 | Basis | 4600 | 82,5 % | 49,4 % | +1,6 | 974 | 60,2 % | 55,2 % | +3,5 |
| Stiftsdame aus Quedlinburg | Theophanu | 2 | Basis | 4600 | 82,8 % | 46,0 % | −1,8 | 1346 | 63,4 % | 54,5 % | +2,7 |
| Späher an der Elbe | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1446 | 64,7 % | 53,3 % | +1,6 |
| Heerbann | Theophanu | 4 | Gewöhnlich | – | – | – | – | 1548 | 62,0 % | 57,3 % | +5,6 |
| St. Pantaleon in Köln | Theophanu | 2 | Selten | – | – | – | – | 1288 | 60,9 % | 51,4 % | −0,3 |
| Haft in Utrecht | Theophanu | 3 | Selten | – | – | – | – | 1656 | 57,9 % | 50,0 % | −1,8 |
| Willigis, Erzbischof von Mainz | Theophanu | 5 | Episch | – | – | – | – | 1930 | 60,7 % | 54,9 % | +3,2 |
| Otto II., Kaiser | Theophanu | 6 | Legendär | – | – | – | – | 2458 | 59,6 % | 54,1 % | +2,4 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1580 | 63,0 % | 58,2 % | +6,3 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1558 | 59,0 % | 52,3 % | +0,4 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1398 | 62,1 % | 48,3 % | +0,2 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1376 | 56,8 % | 50,5 % | +2,4 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1558 | 60,5 % | 55,0 % | +1,2 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1416 | 60,2 % | 46,6 % | −7,3 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1342 | 54,7 % | 51,0 % | +2,5 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 2196 | 51,8 % | 51,6 % | +3,1 |
| Heerlager an der Weser | Widukind | 3 | Gewöhnlich | – | – | – | – | 1520 | 42,6 % | 44,4 % | −2,9 |
| Versammlung in Marklo | Widukind | 4 | Selten | – | – | – | – | 1402 | 38,7 % | 46,9 % | −0,4 |
| Barde der Arverner | Vercingetorix | 2 | Gewöhnlich | – | – | – | – | 1472 | 55,2 % | 51,4 % | +2,2 |
| Gallische Reiterei | Vercingetorix | 5 | Selten | – | – | – | – | 1742 | 53,5 % | 48,2 % | −1,0 |
| Laborbuch | Böttger | 1 | Gewöhnlich | – | – | – | – | 1024 | 61,9 % | 44,9 % | −1,3 |
| Weißes Gold | Böttger | 3 | Selten | – | – | – | – | 1584 | 3,9 % | 40,2 % | −5,9 |
| Adlige Stifterin | Hildegard | 1 | Gewöhnlich | – | – | – | – | 1078 | 54,2 % | 56,2 % | +6,3 |
| Weihe der Klosterkirche | Hildegard | 4 | Selten | – | – | – | – | 1472 | 39,9 % | 46,6 % | −3,3 |
| Feldmesser | Wiprecht | 2 | Gewöhnlich | – | – | – | – | 1454 | 58,0 % | 53,2 % | +3,8 |
| Beuterecht | Wiprecht | 1 | Selten | – | – | – | – | 1080 | 60,4 % | 50,4 % | +1,1 |
| Ritter aus Murau | Ulrich | 4 | Selten | – | – | – | – | 1516 | 50,6 % | 48,7 % | −1,9 |
| Frische Lanze | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1438 | 54,0 % | 47,9 % | −2,7 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1392 | 55,5 % | 54,3 % | +4,2 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1548 | 37,1 % | 45,5 % | −4,7 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1520 | 54,2 % | 51,8 % | −2,0 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1490 | 40,2 % | 56,3 % | +2,4 |
| Pfeilmacher aus Edfu | Ahhotep | 2 | Gewöhnlich | – | – | – | – | 1360 | 58,4 % | 54,3 % | +3,4 |
| Gift der Hornviper | Ahhotep | 3 | Selten | – | – | – | – | 1502 | 49,9 % | 52,3 % | +1,5 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1442 | 54,2 % | 50,6 % | +0,9 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 2298 | 60,6 % | 58,5 % | +8,8 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1366 | 59,4 % | 51,6 % | +1,8 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1318 | 58,4 % | 50,3 % | +0,4 |
| Kanzler der Kaiserin | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1372 | 63,4 % | 54,8 % | +3,0 |
| Siegel der Kaiserin | Theophanu | 2 | Selten | – | – | – | – | 1408 | 55,2 % | 55,4 % | +3,7 |
| Olympionike | Griechenland und Hellenismus | 4 | Gewöhnlich | – | – | – | – | 6094 | 54,5 % | 56,1 % | +6,0 |
| Rhapsode | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 5564 | 55,8 % | 52,8 % | +2,7 |
| Marathonläufer | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 5658 | 55,0 % | 55,5 % | +5,4 |
| Orakel von Delphi | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 6402 | 35,6 % | 48,5 % | −1,6 |
| Leuchtturm von Pharos | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 6442 | 56,8 % | 46,0 % | −4,0 |
| Akropolis | Griechenland und Hellenismus | 2 | Selten | – | – | – | – | 5738 | 58,5 % | 49,6 % | −0,5 |
| Bibliothek von Alexandria | Griechenland und Hellenismus | 3 | Episch | – | – | – | – | 6462 | 53,6 % | 48,1 % | −1,9 |
| Knappe | Mittelalter im Reich | 1 | Gewöhnlich | – | – | – | – | 5012 | 57,1 % | 51,4 % | +1,6 |
| Armbrustschütze | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 7894 | 60,0 % | 54,1 % | +4,3 |
| Mönch von Cluny | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 7990 | 54,1 % | 53,2 % | +3,4 |
| Hansekogge | Mittelalter im Reich | 4 | Gewöhnlich | – | – | – | – | 7476 | 51,3 % | 50,0 % | +0,1 |
| Turnierritter | Mittelalter im Reich | 4 | Selten | – | – | – | – | 7512 | 54,0 % | 53,9 % | +4,0 |
| Burgfried | Mittelalter im Reich | 2 | Selten | – | – | – | – | 6818 | 59,3 % | 43,6 % | −6,2 |
| Tribok | Mittelalter im Reich | 4 | Episch | – | – | – | – | 7496 | 38,2 % | 47,8 % | −2,1 |
| Landsknecht | Frühe Neuzeit | 1 | Gewöhnlich | – | – | – | – | 3130 | 60,4 % | 53,1 % | +5,6 |
| Buchdrucker aus Mainz | Frühe Neuzeit | 3 | Gewöhnlich | – | – | – | – | 5038 | 59,1 % | 51,0 % | +3,3 |
| Leipziger Kaffeehaus | Frühe Neuzeit | 2 | Gewöhnlich | – | – | – | – | 4428 | 51,5 % | 46,8 % | −0,8 |
| Kartaunen-Salve | Frühe Neuzeit | 3 | Selten | – | – | – | – | 4774 | 61,3 % | 48,7 % | +1,0 |
| Kriegsgaleone | Frühe Neuzeit | 5 | Selten | – | – | – | – | 5390 | 60,3 % | 49,4 % | +1,8 |
| Stehendes Heer | Frühe Neuzeit | 5 | Episch | – | – | – | – | 5338 | 62,4 % | 48,3 % | +0,6 |
| Sternschanze | Frühe Neuzeit | 2 | Episch | – | – | – | – | 4330 | 65,4 % | 41,4 % | −6,2 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 34836 | 39,1 % | 45,6 % | −4,4 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 31412 | 60,1 % | 46,1 % | −3,8 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 33286 | 33,7 % | 45,9 % | −4,0 |
| Thebanischer Plänkler | Epaminondas | 1 | Basis | 4600 | 78,2 % | 47,6 % | −0,3 | 1056 | 56,6 % | 53,2 % | +2,9 |
| Böotischer Hoplit | Epaminondas | 2 | Basis | 4600 | 78,9 % | 47,7 % | −0,1 | 1428 | 52,3 % | 53,0 % | +2,7 |
| Fünfzig Schilde tief | Epaminondas | 2 | Basis | 4600 | 74,4 % | 47,7 % | −0,1 | 1408 | 49,8 % | 46,9 % | −3,5 |
| Böotarch | Epaminondas | 3 | Basis | 4600 | 78,2 % | 47,5 % | −0,3 | 1686 | 55,7 % | 56,0 % | +5,7 |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | Gewöhnlich | – | – | – | – | 1894 | 53,6 % | 57,8 % | +7,5 |
| Schlacht bei Leuktra | Epaminondas | 4 | Gewöhnlich | – | – | – | – | 1522 | 47,6 % | 51,0 % | +0,7 |
| Befreiung Messeniens | Epaminondas | 5 | Selten | – | – | – | – | 1754 | 51,4 % | 50,7 % | +0,4 |
| Thebanischer Phalangit | Epaminondas | 4 | Selten | – | – | – | – | 1524 | 45,7 % | 52,2 % | +1,9 |
| Megalopolis | Epaminondas | 3 | Episch | – | – | – | – | 1640 | 49,1 % | 45,9 % | −4,4 |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | Legendär | – | – | – | – | 2304 | 49,2 % | 53,3 % | +3,0 |
| Veles | Fabius | 1 | Basis | 4600 | 88,3 % | 48,4 % | −0,2 | 1022 | 63,6 % | 54,4 % | +3,6 |
| Triarier | Fabius | 2 | Basis | 4600 | 86,7 % | 48,7 % | +0,2 | 1404 | 62,3 % | 54,4 % | +3,6 |
| Hinhalten | Fabius | 2 | Basis | 4600 | 85,5 % | 48,4 % | −0,1 | 1486 | 62,1 % | 52,6 % | +1,8 |
| Konsul der Republik | Fabius | 4 | Basis | 4600 | 84,6 % | 49,1 % | +0,6 | 1456 | 56,0 % | 49,7 % | −1,1 |
| Verbrannte Erde | Fabius | 3 | Gewöhnlich | – | – | – | – | 1586 | 64,4 % | 51,3 % | +0,5 |
| Späher am Volturnus | Fabius | 2 | Gewöhnlich | – | – | – | – | 1384 | 60,8 % | 52,7 % | +1,9 |
| Minucius, der Reiteroberst | Fabius | 4 | Selten | – | – | – | – | 1524 | 57,4 % | 51,2 % | +0,4 |
| Rückeroberung von Tarent | Fabius | 6 | Selten | – | – | – | – | 2196 | 52,7 % | 57,2 % | +6,4 |
| Lager auf den Höhen | Fabius | 3 | Episch | – | – | – | – | 1586 | 63,6 % | 48,8 % | −2,0 |
| Marcellus, Schwert Roms | Fabius | 6 | Legendär | – | – | – | – | 2316 | 53,2 % | 50,1 % | −0,7 |
| Botin der Cherusker | Thusnelda | 1 | Basis | 4600 | 77,6 % | 53,1 % | +2,6 | 1098 | 55,6 % | 59,9 % | +8,4 |
| Hüterin des Herdfeuers | Thusnelda | 2 | Basis | 4600 | 79,1 % | 51,3 % | +0,8 | 1544 | 55,9 % | 51,7 % | +0,1 |
| Ruf zum Thing | Thusnelda | 3 | Basis | 4600 | 72,6 % | 48,9 % | −1,6 | 1544 | 47,4 % | 48,1 % | −3,4 |
| Krieger im Keil | Thusnelda | 3 | Basis | 4600 | 80,5 % | 52,5 % | +2,0 | 1526 | 56,3 % | 52,3 % | +0,7 |
| Varusschlacht | Thusnelda | 4 | Gewöhnlich | – | – | – | – | 1454 | 53,0 % | 54,6 % | +3,0 |
| Krieger der Sippe | Thusnelda | 3 | Gewöhnlich | – | – | – | – | 1588 | 59,3 % | 51,9 % | +0,3 |
| Heiliger Hain | Thusnelda | 2 | Selten | – | – | – | – | 1462 | 58,1 % | 50,3 % | −1,3 |
| Seitenwechsel | Thusnelda | 5 | Selten | – | – | – | – | 1922 | 47,5 % | 53,3 % | +1,7 |
| Arminius, Fürst der Cherusker | Thusnelda | 4 | Episch | – | – | – | – | 1524 | 46,3 % | 48,8 % | −2,8 |
| Bund der Stämme | Thusnelda | 8 | Legendär | – | – | – | – | 1448 | 48,1 % | 55,1 % | +3,5 |
| Mamlukenrekrut | Baibars | 1 | Basis | 4600 | 83,2 % | 49,0 % | −1,6 | 1040 | 56,4 % | 49,7 % | −0,5 |
| Barid-Kurier | Baibars | 2 | Basis | 4600 | 79,3 % | 51,5 % | +0,9 | 1458 | 55,8 % | 50,7 % | +0,5 |
| Ain Dschalut | Baibars | 3 | Basis | 4600 | 85,2 % | 51,6 % | +1,0 | 1630 | 60,2 % | 50,7 % | +0,5 |
| Bogenreiter der Bahriya | Baibars | 3 | Basis | 4600 | 83,2 % | 49,6 % | −1,0 | 1688 | 52,5 % | 49,5 % | −0,7 |
| Manjaniq-Meister | Baibars | 4 | Gewöhnlich | – | – | – | – | 1592 | 54,5 % | 51,8 % | +1,7 |
| Vorgetäuschte Flucht | Baibars | 1 | Gewöhnlich | – | – | – | – | 1060 | 20,5 % | 43,5 % | −6,7 |
| Qutuz, Sultan von Ägypten | Baibars | 5 | Selten | – | – | – | – | 1888 | 49,5 % | 52,0 % | +1,8 |
| Sturm auf Antiochia | Baibars | 2 | Selten | – | – | – | – | 1468 | 52,6 % | 47,9 % | −2,3 |
| Zitadelle von Kairo | Baibars | 4 | Episch | – | – | – | – | 1490 | 42,1 % | 46,9 % | −3,3 |
| Qalawun, Emir der Bahriya | Baibars | 6 | Legendär | – | – | – | – | 2454 | 52,5 % | 54,4 % | +4,2 |
| Schanzarbeiter | Vauban | 2 | Basis | 4600 | 76,6 % | 47,8 % | −1,1 | 1478 | 44,0 % | 44,9 % | −2,2 |
| Grenadier | Vauban | 2 | Basis | 4600 | 84,0 % | 49,9 % | +1,0 | 1482 | 62,8 % | 50,2 % | +3,1 |
| Salve von der Bastion | Vauban | 2 | Basis | 4600 | 78,1 % | 47,8 % | −1,1 | 1416 | 41,7 % | 43,2 % | −3,9 |
| Ingenieur des Königs | Vauban | 3 | Basis | 4600 | 83,9 % | 50,5 % | +1,6 | 1568 | 64,3 % | 50,4 % | +3,4 |
| Festungsgeschütz | Vauban | 3 | Gewöhnlich | – | – | – | – | 1678 | 63,2 % | 48,6 % | +1,5 |
| Faschinen | Vauban | 2 | Gewöhnlich | – | – | – | – | 1516 | 54,2 % | 49,2 % | +2,2 |
| Minengang | Vauban | 3 | Selten | – | – | – | – | 1640 | 55,9 % | 47,9 % | +0,9 |
| Zitadelle von Lille | Vauban | 4 | Selten | – | – | – | – | 1598 | 60,5 % | 40,3 % | −6,7 |
| Louvois, Kriegsminister | Vauban | 6 | Episch | – | – | – | – | 2304 | 61,2 % | 45,6 % | −1,5 |
| Ludwig XIV., der Sonnenkönig | Vauban | 5 | Legendär | – | – | – | – | 1768 | 51,4 % | 49,4 % | +2,4 |
| Speerwerfer vom Mont Lassois | Vix | 1 | Basis | 4600 | 83,5 % | 53,6 % | +2,6 | 972 | 59,5 % | 50,5 % | +1,4 |
| Prunkdolch | Vix | 2 | Basis | 4600 | 76,7 % | 53,9 % | +2,9 | 1418 | 47,7 % | 47,9 % | −1,2 |
| Reiter an der Seine | Vix | 3 | Basis | 4600 | 82,9 % | 52,9 % | +1,9 | 1636 | 50,5 % | 49,8 % | +0,8 |
| Seherin | Vix | 3 | Basis | 4600 | 81,8 % | 52,9 % | +1,9 | 1602 | 49,4 % | 49,4 % | +0,4 |
| Aufgebot des Fürstensitzes | Vix | 4 | Gewöhnlich | – | – | – | – | 1582 | 54,7 % | 51,0 % | +2,0 |
| Trankopfer | Vix | 1 | Gewöhnlich | – | – | – | – | 970 | 56,7 % | 48,6 % | −0,5 |
| Gelage am Krater | Vix | 1 | Selten | – | – | – | – | 992 | 62,1 % | 48,5 % | −0,6 |
| Schleuderer am Wall | Vix | 4 | Selten | – | – | – | – | 1618 | 58,6 % | 53,4 % | +4,3 |
| Halle auf dem Mont Lassois | Vix | 1 | Episch | – | – | – | – | 986 | 61,1 % | 48,5 % | −0,6 |
| Gesandter aus Massalia | Vix | 6 | Legendär | – | – | – | – | 2542 | 55,0 % | 51,1 % | +2,1 |
| Gladiator | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 6342 | 61,7 % | 54,4 % | +3,0 |
| Senator der Kurie | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 6436 | 55,1 % | 53,8 % | +2,5 |
| Centurio | Rom und Germanien | 2 | Gewöhnlich | – | – | – | – | 5766 | 58,9 % | 54,1 % | +2,7 |
| Triumphzug | Rom und Germanien | 3 | Selten | – | – | – | – | 6236 | 50,8 % | 50,2 % | −1,1 |
| Via Appia | Rom und Germanien | 2 | Selten | – | – | – | – | 5706 | 57,5 % | 49,8 % | −1,6 |
| Vestalin am ewigen Feuer | Rom und Germanien | 3 | Selten | – | – | – | – | 6102 | 59,6 % | 50,1 % | −1,2 |
| Pax Romana | Rom und Germanien | 5 | Episch | – | – | – | – | 7368 | 56,0 % | 47,2 % | −4,2 |
| Wagenbauer | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 4226 | 55,4 % | 52,5 % | +1,3 |
| Schreiber im Lebenshaus | Frühzeit und Ägypten | 3 | Gewöhnlich | – | – | – | – | 4730 | 56,6 % | 53,6 % | +2,4 |
| Schuss vom Streitwagen | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 4142 | 63,9 % | 53,7 % | +2,5 |
| Wache der Medjai | Frühzeit und Ägypten | 4 | Selten | – | – | – | – | 4648 | 50,3 % | 52,2 % | +1,0 |
| Angriff der Streitwagen | Frühzeit und Ägypten | 3 | Selten | – | – | – | – | 4728 | 59,4 % | 53,2 % | +2,1 |
| Bernsteinstraße | Frühzeit und Ägypten | 2 | Selten | – | – | – | – | 4158 | 57,6 % | 46,9 % | −4,2 |
| Festung Buhen | Frühzeit und Ägypten | 3 | Episch | – | – | – | – | 4832 | 53,5 % | 54,3 % | +3,2 |
| Akrit der Grenzmark | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 4328 | 56,4 % | 53,2 % | +3,7 |
| Gelehrter im Haus der Weisheit | Kreuzzüge | 3 | Gewöhnlich | – | – | – | – | 4640 | 56,3 % | 53,0 % | +3,6 |
| Tribut in Goldbyzantinern | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 4340 | 36,2 % | 48,1 % | −1,3 |
| Arzt des Bimaristan | Kreuzzüge | 3 | Selten | – | – | – | – | 4704 | 61,2 % | 56,1 % | +6,6 |
| Theodosianische Mauern | Kreuzzüge | 2 | Selten | – | – | – | – | 4324 | 59,9 % | 47,1 % | −2,4 |
| Hagia Sophia | Kreuzzüge | 3 | Episch | – | – | – | – | 4788 | 64,1 % | 46,9 % | −2,5 |
| Ibn an-Nafis, Arzt von Kairo | Kreuzzüge | 4 | Episch | – | – | – | – | 4432 | 56,9 % | 52,2 % | +2,7 |
| Krähenfüße | neutral | 1 | Gewöhnlich | – | – | – | – | 22334 | 56,7 % | 52,6 % | +2,7 |
| Abgefangene Botschaft | neutral | 2 | Selten | – | – | – | – | 31618 | 41,9 % | 46,6 % | −3,4 |
| Falsche Kundschafter von Kadesch | Frühzeit und Ägypten | 2 | Selten | – | – | – | – | 4136 | 41,7 % | 48,6 % | −2,5 |
| Botschaft des Sikinnos | Griechenland und Hellenismus | 1 | Gewöhnlich | – | – | – | – | 4030 | 54,9 % | 52,9 % | +2,8 |
| Wall am Kalkrieser Berg | Rom und Germanien | 3 | Selten | – | – | – | – | 6318 | 36,6 % | 51,6 % | +0,2 |
| Fallgatter | Mittelalter im Reich | 2 | Gewöhnlich | – | – | – | – | 7248 | 43,4 % | 45,2 % | −4,6 |
| Engpass von Myriokephalon | Kreuzzüge | 3 | Selten | – | – | – | – | 4732 | 44,3 % | 48,6 % | −0,8 |
| Gegenmine | Frühe Neuzeit | 3 | Selten | – | – | – | – | 4850 | 44,9 % | 44,4 % | −3,2 |
| Hinterhalt am Süntel | Widukind | 3 | Selten | – | – | – | – | 1512 | 37,7 % | 45,4 % | −2,0 |
| Rettung bei Gerunium | Fabius | 2 | Selten | – | – | – | – | 1442 | 52,1 % | 49,4 % | −1,4 |
| Täuschung bei Larissa | Anna | 1 | Selten | – | – | – | – | 1020 | 52,4 % | 54,7 % | +4,9 |
| Kampf um den Leichnam | Leonidas | 2 | Selten | – | – | – | – | 1374 | 52,2 % | 49,2 % | −2,6 |
| Eiren der Agoge | Leonidas | 2 | Gewöhnlich | – | – | – | – | 1386 | 57,3 % | 53,3 % | +1,4 |
| Astrolab für Synesios | Hypatia | 1 | Gewöhnlich | – | – | – | – | 950 | 53,8 % | 51,1 % | +3,0 |
| Pilger im Asklepieion von Saqqara | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1534 | 60,2 % | 54,7 % | +0,9 |
| Eroberung von Zara | Dandolo | 3 | Selten | – | – | – | – | 1602 | 54,7 % | 50,5 % | +2,0 |
| Irminsul | Widukind | 3 | Selten | – | – | – | – | 1546 | 56,5 % | 43,2 % | −4,1 |
| Stater des Vercingetorix | Vercingetorix | 1 | Gewöhnlich | – | – | – | – | 1020 | 58,0 % | 53,4 % | +4,2 |
| Manufaktur auf der Albrechtsburg | Böttger | 3 | Selten | – | – | – | – | 1682 | 57,1 % | 47,8 % | +1,7 |
| Volmar, Schreiber Hildegards | Hildegard | 3 | Selten | – | – | – | – | 1672 | 55,4 % | 54,8 % | +4,9 |
| Kloster Pegau | Wiprecht | 4 | Episch | – | – | – | – | 1422 | 38,3 % | 44,9 % | −4,5 |
| Gefährte der Artusfahrt | Ulrich | 4 | Selten | – | – | – | – | 1452 | 49,1 % | 51,7 % | +1,0 |
| Aspasia von Milet | Perikles | 3 | Selten | – | – | – | – | 1528 | 58,2 % | 54,9 % | +4,8 |
| Aqua Virgo | Agrippa | 2 | Gewöhnlich | – | – | – | – | 1396 | 58,2 % | 50,3 % | −3,5 |
| Stele von Karnak | Ahhotep | 3 | Selten | – | – | – | – | 1608 | 57,3 % | 48,4 % | −2,4 |
| Kloster Kecharitomene | Anna | 3 | Episch | – | – | – | – | 1620 | 49,8 % | 47,6 % | −2,2 |
| Gesänge des Dichterkönigs | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1322 | 56,1 % | 47,3 % | −2,6 |
| Heiratsurkunde der Theophanu | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1410 | 61,8 % | 54,1 % | +2,4 |
| Scheinlager bei Mantineia | Epaminondas | 2 | Selten | – | – | – | – | 1478 | 35,2 % | 46,8 % | −3,5 |
| Quintus Fabius, der Sohn | Fabius | 4 | Gewöhnlich | – | – | – | – | 1494 | 59,6 % | 52,6 % | +1,7 |
| Thumelicus | Thusnelda | 3 | Gewöhnlich | – | – | – | – | 1612 | 54,8 % | 56,8 % | +5,2 |
| Brief an die Besatzung von Krak | Baibars | 4 | Selten | – | – | – | – | 1482 | 53,0 % | 52,2 % | +2,0 |
| Neuf-Brisach | Vauban | 3 | Episch | – | – | – | – | 1584 | 65,0 % | 45,6 % | −1,4 |
| Goldener Halsring von Vix | Vix | 2 | Selten | – | – | – | – | 1370 | 45,5 % | 49,4 % | +0,3 |
| Koloss von Rhodos | neutral | 6 | Episch | – | – | – | – | 51984 | 45,4 % | 51,6 % | +1,5 |
| Zeus des Phidias | neutral | 4 | Episch | – | – | – | – | 33254 | 57,6 % | 45,6 % | −4,4 |
| Himmelsscheibe von Nebra | neutral | 2 | Selten | – | – | – | – | 31538 | 32,3 % | 48,1 % | −1,8 |
| Gänse des Kapitols | neutral | 1 | Gewöhnlich | – | – | – | – | 22648 | 55,0 % | 46,7 % | −3,3 |
| Skytale | neutral | 2 | Selten | – | – | – | – | 31524 | 42,2 % | 47,4 % | −2,5 |
