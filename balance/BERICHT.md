# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `e9652f4e45` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die 21 anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,5.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 50600 | ✗ 21/22 | ✗ 200/231 | ✓ 47,3 % | – | 0 | 24 |
| Zufallsdecks | 50600 | ✗ 19/22 | ✗ 223/231 | ✓ 50,9 % | ✓ 52,8 % (+2,8) | 0 | 22 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Leonidas I. | **53,4 %** | 51,7 % | 54,6 % | Epaminondas 40,0 % | Fabius 72,0 % | Defensiv: 36,7 % | ✗ |
| Hypatia | **53,0 %** | 49,8 % | 55,7 % | Anna 43,0 % | Theophanu 66,0 % | Kombinierend: 49,3 % | ✓ |
| Enrico Dandolo | **52,2 %** | 50,2 % | 53,8 % | Widukind 43,5 % | Thusnelda 58,0 % | Kombinierend: 41,9 % | ✓ |
| Imhotep | **52,0 %** | 48,7 % | 55,0 % | Vix 39,5 % | Vercingetorix 61,5 % | Defensiv: 35,8 % | ✓ |
| Ahhotep I. | **51,5 %** | 50,5 % | 52,2 % | Leonidas 36,5 % | Baibars 61,0 % | Aggressiv: 45,9 % | ✓ |
| Baibars | **51,0 %** | 49,3 % | 52,6 % | Fabius 32,5 % | Wiprecht 63,0 % | Aggressiv: 40,6 % | ✓ |
| Johann Friedrich Böttger | **50,9 %** | 51,7 % | 49,8 % | Widukind 39,5 % | Fabius 61,5 % | Kombinierend: 41,7 % | ✓ |
| Fürstin von Vix | **50,8 %** | 51,7 % | 49,9 % | Widukind 33,0 % | Anna 63,5 % | Kombinierend: 40,6 % | ✓ |
| Anna Komnene | **50,5 %** | 51,5 % | 49,3 % | Vix 36,5 % | Fabius 68,5 % | Kombinierend: 39,5 % | ✓ |
| Hildegard von Bingen | **50,3 %** | 46,1 % | 54,3 % | Hypatia 39,0 % | Ulrich 62,0 % | Aggressiv: 52,0 % | ✓ |
| Thusnelda | **49,7 %** | 46,1 % | 53,4 % | Widukind 39,0 % | Fabius 67,5 % | Kombinierend: 44,9 % | ✓ |
| Marcus Agrippa | **49,5 %** | 44,4 % | 54,7 % | Baibars 41,0 % | Vercingetorix 59,5 % | Kombinierend: 45,1 % | ✓ |
| Widukind | **49,5 %** | 45,3 % | 53,8 % | Vauban 38,0 % | Vix 67,0 % | Aggressiv: 45,7 % | ✓ |
| Wiprecht von Groitzsch | **49,3 %** | 46,5 % | 52,3 % | Baibars 37,0 % | Fabius 60,5 % | Aggressiv: 42,5 % | ✓ |
| Vauban | **48,9 %** | 42,9 % | 55,2 % | Nezahualcóyotl 38,0 % | Theophanu 64,0 % | Defensiv: 41,3 % | ✓ |
| Ulrich von Liechtenstein | **48,8 %** | 46,0 % | 51,7 % | Hildegard 38,0 % | Epaminondas 56,0 % | Aggressiv: 48,4 % | ✓ |
| Perikles | **48,8 %** | 44,3 % | 53,4 % | Hildegard 42,5 % | Agrippa 55,0 % | Defensiv: 39,3 % | ✓ |
| Vercingetorix | **48,4 %** | 43,7 % | 53,4 % | Fabius 36,5 % | Ulrich 61,0 % | Aggressiv: 45,5 % | ✓ |
| Nezahualcóyotl | **48,4 %** | 46,0 % | 51,1 % | Baibars 39,5 % | Vauban 62,0 % | Defensiv: 38,5 % | ✓ |
| Fabius Maximus | **48,2 %** | 46,1 % | 50,6 % | Leonidas 28,0 % | Epaminondas 70,5 % | Defensiv: 39,5 % | ✓ |
| Epaminondas | **47,5 %** | 44,9 % | 50,7 % | Fabius 29,5 % | Leonidas 60,0 % | Aggressiv: 42,5 % | ✓ |
| Theophanu | **47,4 %** | 42,6 % | 52,7 % | Hypatia 34,0 % | Widukind 59,0 % | Defensiv: 39,6 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Widu. | Verc. | Bött. | Hild. | Wipr. | Ulri. | Peri. | Agri. | Ahho. | Anna. | Neza. | Theo. | Epam. | Fabi. | Thus. | Baib. | Vaub. | Vix. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 50 | 51 | 50 | 52 | 55 | 55 | 57 | 54 | 53 | 55 | 47 | **64** | 52 | 59 | 48 | 40 | **72** | 56 | 45 | **62** | 48 |
| Hypatia | 50 | · | 56 | 44 | 50 | 50 | 49 | **61** | 59 | 45 | 53 | 55 | 49 | 43 | 54 | **66** | **63** | 59 | 49 | 58 | 55 | 47 |
| Imhotep | 50 | 44 | · | 49 | 56 | **62** | 41 | 44 | 53 | 57 | 56 | 50 | 57 | 47 | 60 | 58 | 55 | 49 | 57 | 53 | 58 | **40** |
| Dandolo | 50 | 56 | 52 | · | 44 | 54 | 50 | 49 | 55 | 45 | 53 | 55 | 47 | 53 | 52 | 56 | 55 | 52 | 58 | 54 | 54 | 55 |
| Widukind | 48 | 50 | 44 | 56 | · | 43 | **61** | 46 | 47 | 47 | 52 | 56 | 47 | 51 | 49 | 41 | 48 | 47 | **61** | 43 | **38** | **67** |
| Vercingetorix | 45 | 50 | **39** | 46 | 57 | · | 46 | 54 | 48 | **61** | 49 | 41 | 44 | 53 | 51 | 54 | 56 | **37** | 48 | 55 | 43 | 45 |
| Böttger | 45 | 52 | 60 | 51 | **40** | 54 | · | 45 | 48 | 47 | 51 | 56 | 44 | 46 | 56 | 52 | 49 | **62** | 53 | 53 | 60 | 50 |
| Hildegard | 43 | **39** | 56 | 51 | 54 | 47 | 55 | · | **61** | **62** | 57 | 47 | 43 | 52 | 47 | 42 | 55 | 48 | 46 | 53 | 41 | 59 |
| Wiprecht | 46 | 41 | 47 | 45 | 53 | 52 | 53 | **39** | · | 45 | 48 | 49 | 56 | 52 | 60 | 49 | 51 | **61** | 48 | **37** | 49 | 60 |
| Ulrich | 48 | 55 | 43 | 55 | 53 | **39** | 53 | **38** | 55 | · | 50 | 53 | 44 | 52 | 49 | 45 | 56 | 42 | 54 | 49 | 43 | 50 |
| Perikles | 45 | 47 | 44 | 47 | 49 | 51 | 50 | 43 | 52 | 50 | · | 55 | 47 | 54 | 51 | 48 | 52 | 53 | 46 | 44 | 47 | 51 |
| Agrippa | 53 | 45 | 50 | 45 | 44 | 60 | 44 | 53 | 52 | 47 | 45 | · | 51 | 52 | 49 | 51 | 53 | 56 | 47 | 41 | 55 | 49 |
| Ahhotep | **37** | 51 | 43 | 53 | 53 | 56 | 56 | 57 | 44 | 56 | 53 | 50 | · | 46 | 45 | 56 | 60 | 52 | 45 | **61** | 56 | 53 |
| Anna | 48 | 57 | 53 | 48 | 50 | 48 | 54 | 49 | 48 | 48 | 47 | 49 | 54 | · | 47 | 54 | 50 | **69** | 46 | 52 | 56 | **37** |
| Nezahualcóyotl | 42 | 47 | 41 | 48 | 52 | 50 | 44 | 53 | 41 | 51 | 49 | 52 | 55 | 53 | · | 47 | 42 | 55 | 49 | **40** | **62** | 49 |
| Theophanu | 52 | **34** | 42 | 44 | 59 | 47 | 48 | 59 | 52 | 55 | 52 | 49 | 44 | 46 | 53 | · | 45 | 42 | 55 | **37** | **36** | 47 |
| Epaminondas | 60 | **37** | 45 | 45 | 52 | 44 | 51 | 45 | 50 | 44 | 48 | 48 | 41 | 50 | 59 | 55 | · | **30** | 57 | **38** | 49 | 53 |
| Fabius | **28** | 42 | 51 | 48 | 53 | **64** | **39** | 53 | **40** | 59 | 47 | 44 | 48 | **31** | 45 | 58 | **71** | · | **33** | **68** | 55 | **38** |
| Thusnelda | 44 | 51 | 43 | 42 | **39** | 53 | 48 | 54 | 52 | 46 | 54 | 53 | 55 | 54 | 52 | 45 | 43 | **68** | · | 45 | 56 | 48 |
| Baibars | 55 | 42 | 47 | 46 | 57 | 45 | 48 | 48 | **63** | 52 | 56 | 59 | **39** | 49 | **61** | **63** | **62** | **32** | 55 | · | 43 | 52 |
| Vauban | **39** | 45 | 42 | 47 | **62** | 57 | 41 | 60 | 52 | 57 | 53 | 45 | 44 | 44 | **38** | **64** | 52 | 45 | 44 | 57 | · | 41 |
| Vix | 53 | 53 | **61** | 45 | **33** | 55 | 50 | 41 | 41 | 50 | 49 | 52 | 47 | **64** | 52 | 53 | 47 | **62** | 53 | 49 | 60 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 45,4 % aufs Gesicht, 1,0 % auf Bauwerke · **Defensiv** (7 Helden) 38,7 % aufs Gesicht, 1,0 % auf Bauwerke · **Kombinierend** (7 Helden) 43,3 % aufs Gesicht, 1,0 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 25,1, Median 24, 10–90 %: 17–34, kürzeste 10, längste 64. Beginner gewinnt 47,3 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Belagerungsturm | neutral | 6 | 55,2 % | +5,2 | 76,6 % |
| Reiter der Edelinge | Widukind | 4 | 54,2 % | +4,7 | 70,8 % |
| Warägergardist | Anna | 3 | 54,9 % | +4,5 | 82,6 % |
| Sternkatalog des Hipparchos | Hypatia | 4 | 56,7 % | +4,0 | 79,2 % |
| Rede auf die Gefallenen | Perikles | 3 | 52,4 % | +3,5 | 81,7 % |
| Legionär der Zehnten | Agrippa | 2 | 53,0 % | +3,4 | 78,3 % |
| Handelsgesandter | Dandolo | 4 | 55,1 % | +3,1 | 78,7 % |
| Kopistin der Chronik | Anna | 1 | 53,5 % | +3,1 | 81,1 % |
| Ruf zum Thing | Thusnelda | 3 | 48,2 % | −1,5 | 72,8 % |
| Bogenschütze der Pfalz | Theophanu | 2 | 46,1 % | −1,5 | 82,6 % |
| Hüterin des Hains | Vercingetorix | 1 | 47,0 % | −1,6 | 82,5 % |
| Stiftsdame aus Quedlinburg | Theophanu | 2 | 45,9 % | −1,7 | 82,9 % |
| Siedler aus Franken | Wiprecht | 1 | 47,2 % | −2,2 | 77,2 % |
| Pfeilschuss | Widukind | 2 | 47,2 % | −2,3 | 76,1 % |
| Lehnsmann | Theophanu | 1 | 45,1 % | −2,5 | 82,2 % |
| Lange Mauern | Perikles | 2 | 45,6 % | −3,3 | 79,7 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Thusnelda | **53,8 %** | 52,8 % | 54,1 % | Ulrich 47,0 % | Hypatia 59,0 % | Kombinierend: 38,2 % | ✗ |
| Leonidas I. | **53,4 %** | 54,9 % | 51,3 % | Ulrich 49,0 % | Vauban 63,0 % | Defensiv: 31,9 % | ✗ |
| Fabius Maximus | **53,0 %** | 54,0 % | 51,5 % | Leonidas 48,0 % | Vauban 61,5 % | Defensiv: 33,1 % | ✓ |
| Theophanu | **51,6 %** | 52,7 % | 50,1 % | Perikles 44,5 % | Vauban 60,5 % | Defensiv: 30,5 % | ✓ |
| Perikles | **51,5 %** | 51,5 % | 51,3 % | Anna 44,5 % | Baibars 62,0 % | Defensiv: 33,8 % | ✓ |
| Anna Komnene | **51,4 %** | 54,4 % | 48,0 % | Epaminondas 40,5 % | Vauban 65,0 % | Kombinierend: 32,9 % | ✓ |
| Imhotep | **51,1 %** | 50,7 % | 51,4 % | Thusnelda 47,0 % | Nezahualcóyotl 59,0 % | Defensiv: 32,3 % | ✓ |
| Enrico Dandolo | **50,7 %** | 51,7 % | 49,5 % | Ahhotep 44,5 % | Hypatia 60,5 % | Kombinierend: 33,5 % | ✓ |
| Ulrich von Liechtenstein | **50,6 %** | 52,2 % | 48,9 % | Ahhotep 43,5 % | Agrippa 60,0 % | Aggressiv: 44,5 % | ✓ |
| Ahhotep I. | **50,6 %** | 51,9 % | 49,3 % | Theophanu 41,5 % | Vercingetorix 58,0 % | Aggressiv: 40,0 % | ✓ |
| Hildegard von Bingen | **50,0 %** | 50,8 % | 49,1 % | Thusnelda 44,0 % | Wiprecht 57,5 % | Aggressiv: 40,7 % | ✓ |
| Johann Friedrich Böttger | **49,6 %** | 51,8 % | 47,5 % | Perikles 43,0 % | Vix 55,5 % | Kombinierend: 35,8 % | ✓ |
| Epaminondas | **49,4 %** | 50,6 % | 48,3 % | Fabius 39,5 % | Anna 59,5 % | Aggressiv: 38,3 % | ✓ |
| Hypatia | **48,9 %** | 49,2 % | 48,7 % | Dandolo 39,5 % | Nezahualcóyotl 58,0 % | Kombinierend: 37,3 % | ✓ |
| Wiprecht von Groitzsch | **48,9 %** | 49,4 % | 48,5 % | Agrippa 42,0 % | Vercingetorix 57,5 % | Aggressiv: 38,1 % | ✓ |
| Widukind | **48,6 %** | 48,6 % | 48,8 % | Thusnelda 42,5 % | Epaminondas 55,5 % | Aggressiv: 39,1 % | ✓ |
| Baibars | **48,6 %** | 50,4 % | 47,0 % | Perikles 38,0 % | Vix 64,0 % | Aggressiv: 34,9 % | ✓ |
| Marcus Agrippa | **48,2 %** | 47,4 % | 49,3 % | Ulrich 40,0 % | Wiprecht 58,0 % | Kombinierend: 37,3 % | ✓ |
| Nezahualcóyotl | **48,0 %** | 49,4 % | 47,0 % | Baibars 40,0 % | Widukind 56,5 % | Defensiv: 31,5 % | ✓ |
| Vauban | **47,9 %** | 48,0 % | 48,1 % | Anna 35,0 % | Vix 58,5 % | Defensiv: 33,0 % | ✓ |
| Vercingetorix | **47,7 %** | 49,0 % | 46,8 % | Ahhotep 42,0 % | Baibars 55,0 % | Aggressiv: 38,9 % | ✓ |
| Fürstin von Vix | **46,6 %** | 48,0 % | 45,9 % | Baibars 36,0 % | Agrippa 55,5 % | Kombinierend: 36,1 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Widu. | Verc. | Bött. | Hild. | Wipr. | Ulri. | Peri. | Agri. | Ahho. | Anna. | Neza. | Theo. | Epam. | Fabi. | Thus. | Baib. | Vaub. | Vix. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 55 | 50 | 54 | 53 | 57 | 52 | 54 | 55 | 49 | 51 | 52 | 49 | 51 | 57 | 53 | 54 | 52 | 51 | 60 | **63** | 53 |
| Hypatia | 45 | · | 43 | **40** | 53 | 54 | 54 | 49 | 53 | 47 | 47 | 51 | 50 | 43 | 58 | 53 | 51 | 48 | 41 | 51 | 44 | 54 |
| Imhotep | 51 | 57 | · | 49 | 48 | 56 | 49 | 48 | 52 | 50 | 51 | 50 | 52 | 54 | 59 | 52 | 51 | 49 | 47 | 51 | 49 | 53 |
| Dandolo | 47 | **61** | 51 | · | 52 | 47 | 53 | 46 | 51 | 49 | 54 | 56 | 45 | 47 | 53 | 49 | 54 | 47 | 50 | 50 | 55 | 53 |
| Widukind | 47 | 48 | 53 | 48 | · | 47 | 46 | 50 | 53 | 52 | 48 | 50 | 48 | 46 | 44 | 53 | 56 | 44 | 43 | 53 | 48 | 48 |
| Vercingetorix | 43 | 47 | 44 | 53 | 53 | · | 47 | 49 | 43 | 50 | 48 | 50 | 42 | 55 | 49 | 44 | 53 | 43 | 42 | 55 | 49 | 49 |
| Böttger | 49 | 46 | 51 | 47 | 54 | 53 | · | 54 | 49 | 50 | 43 | 48 | 50 | 50 | 53 | 46 | 52 | 47 | 46 | 54 | 49 | 56 |
| Hildegard | 47 | 51 | 52 | 54 | 50 | 52 | 46 | · | 57 | 54 | 49 | 45 | 47 | 54 | 50 | 45 | 53 | 50 | 44 | 54 | 48 | 50 |
| Wiprecht | 45 | 48 | 48 | 50 | 48 | 57 | 52 | 43 | · | 51 | 54 | 42 | 49 | 44 | 46 | 47 | 55 | 45 | 43 | 56 | 52 | 54 |
| Ulrich | 51 | 53 | 50 | 52 | 48 | 51 | 51 | 46 | 49 | · | 52 | 60 | 44 | 53 | 54 | 49 | 45 | 47 | 53 | 56 | 49 | 54 |
| Perikles | 50 | 53 | 49 | 47 | 53 | 53 | 57 | 51 | 47 | 48 | · | 57 | 52 | 45 | 54 | 56 | 50 | 49 | 47 | **62** | 53 | 54 |
| Agrippa | 48 | 49 | 50 | 44 | 50 | 50 | 52 | 55 | 58 | 40 | 43 | · | 52 | 41 | 46 | 49 | 45 | 50 | 43 | 50 | 54 | 45 |
| Ahhotep | 51 | 50 | 48 | 55 | 52 | 58 | 51 | 53 | 52 | 56 | 48 | 48 | · | 48 | 50 | 42 | 56 | 49 | 49 | 50 | 47 | 51 |
| Anna | 49 | 57 | 47 | 53 | 54 | 45 | 51 | 46 | 56 | 48 | 55 | 60 | 52 | · | 59 | 52 | 41 | 49 | 44 | 49 | **65** | 49 |
| Nezahualcóyotl | 43 | 42 | 41 | 47 | 56 | 52 | 47 | 51 | 54 | 46 | 47 | 54 | 50 | 42 | · | 42 | 51 | 48 | 53 | 40 | 54 | 52 |
| Theophanu | 47 | 47 | 49 | 52 | 47 | 56 | 54 | 55 | 53 | 51 | 44 | 51 | 59 | 49 | 59 | · | 49 | 52 | 48 | 49 | **61** | 54 |
| Epaminondas | 47 | 50 | 50 | 47 | 44 | 48 | 49 | 48 | 45 | 55 | 51 | 55 | 44 | 60 | 50 | 52 | · | **40** | 51 | 48 | 50 | 59 |
| Fabius | 48 | 52 | 52 | 53 | 56 | 57 | 53 | 51 | 55 | 53 | 52 | 51 | 51 | 51 | 53 | 49 | **61** | · | 49 | 51 | **62** | 57 |
| Thusnelda | 50 | 59 | 53 | 51 | 57 | 58 | 54 | 56 | 57 | 47 | 53 | 57 | 51 | 56 | 47 | 53 | 50 | 52 | · | 56 | 58 | 56 |
| Baibars | 41 | 49 | 50 | 51 | 47 | 45 | 47 | 46 | 44 | 44 | **38** | 50 | 51 | 52 | 60 | 51 | 53 | 50 | 44 | · | 48 | **64** |
| Vauban | **37** | 56 | 52 | 45 | 52 | 52 | 52 | 52 | 48 | 52 | 48 | 47 | 53 | **35** | 46 | **40** | 50 | **39** | 42 | 53 | · | 59 |
| Vix | 47 | 46 | 48 | 47 | 52 | 51 | 44 | 51 | 46 | 46 | 46 | 55 | 49 | 51 | 49 | 47 | 42 | 43 | 44 | **36** | 42 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 39,3 % aufs Gesicht, 21,6 % auf Bauwerke · **Defensiv** (7 Helden) 32,3 % aufs Gesicht, 23,4 % auf Bauwerke · **Kombinierend** (7 Helden) 35,9 % aufs Gesicht, 22,8 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 25,1, Median 22, 10–90 %: 15–40, kürzeste 8, längste 73. Beginner gewinnt 50,9 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Griechisches Feuer | Anna | 4 | 61,5 % | +10,3 | 55,3 % |
| Phalanxveteran | Leonidas | 5 | 63,0 % | +9,9 | 62,1 % |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 58,1 % | +9,9 | 62,1 % |
| Kataphrakt | Anna | 5 | 59,7 % | +8,5 | 53,4 % |
| Legionär der Zehnten | Agrippa | 2 | 56,7 % | +8,3 | 58,3 % |
| Eiren der Agoge | Leonidas | 2 | 60,8 % | +7,7 | 60,7 % |
| Burgbesatzung | neutral | 8 | 57,5 % | +7,6 | 52,4 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 60,6 % | +7,5 | 54,0 % |
| Pnyx | Perikles | 3 | 45,9 % | −5,5 | 50,7 % |
| Odeion | Perikles | 4 | 45,7 % | −5,7 | 42,1 % |
| Bauabrechnung des Parthenon | Perikles | 2 | 45,7 % | −5,7 | 42,0 % |
| Stele des Hammurapi | neutral | 2 | 44,0 % | −6,0 | 46,1 % |
| Zitadelle von Lille | Vauban | 4 | 41,8 % | −6,2 | 64,3 % |
| Hinterhalt am Süntel | Widukind | 3 | 42,3 % | −6,4 | 41,0 % |
| Aqua Virgo | Agrippa | 2 | 40,7 % | −7,6 | 58,9 % |
| Kloster Pegau | Wiprecht | 4 | 41,2 % | −7,8 | 39,2 % |

**Legendäre** (AP 5.3) – als Gruppe 52,8 % „gewinnt, wenn gezogen“ (+2,8 gegenüber ihrem Helden, 63010 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Gorgo, Stimme Spartas | Leonidas | 7 | 60,6 % | +7,5 | 54,0 % |
| Bund der Stämme | Thusnelda | 8 | 55,7 % | +2,3 | 49,7 % |
| Djoser, der Erbauer | Imhotep | 6 | 55,3 % | +4,3 | 54,7 % |
| Alexios I. Komnenos | Anna | 6 | 55,1 % | +3,9 | 54,2 % |
| Otto II., Kaiser | Theophanu | 6 | 54,4 % | +2,9 | 60,3 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 54,3 % | +2,9 | 58,8 % |
| Qalawun, Emir der Bahriya | Baibars | 6 | 54,1 % | +5,4 | 52,6 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 54,1 % | +3,5 | 50,5 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 53,5 % | +3,6 | 51,5 % |
| Theon von Alexandria | Hypatia | 5 | 52,9 % | +3,9 | 55,7 % |
| Ludwig XIV., der Sonnenkönig | Vauban | 5 | 52,6 % | +4,6 | 54,4 % |
| Herodot, Vater der Geschichte | neutral | 4 | 52,6 % | +2,6 | 49,9 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 52,5 % | +4,2 | 50,7 % |
| Judith von Böhmen | Wiprecht | 7 | 52,2 % | +3,3 | 52,5 % |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | 51,9 % | +2,4 | 50,7 % |
| Abbi, Gefährte Widukinds | Widukind | 6 | 51,8 % | +3,1 | 51,6 % |
| Marcellus, Schwert Roms | Fabius | 6 | 51,2 % | −1,6 | 56,5 % |
| Jutta von Sponheim, Magistra | Hildegard | 7 | 50,1 % | +0,1 | 48,4 % |
| Commius, Führer des Entsatzheers | Vercingetorix | 8 | 50,0 % | +2,1 | 51,4 % |
| Tschirnhaus, Naturforscher | Böttger | 5 | 49,7 % | +0,1 | 60,2 % |
| Zeremonialaxt des Ahmose | Ahhotep | 6 | 49,7 % | −0,9 | 54,3 % |
| Friedrich der Streitbare | Ulrich | 6 | 49,4 % | −1,2 | 49,9 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 48,4 % | +0,2 | 51,9 % |
| Gesandter aus Massalia | Vix | 6 | 48,1 % | +1,2 | 55,5 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 4600 | 80,9 % | 53,9 % | +0,8 | 878 | 55,8 % | 51,9 % | −1,2 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 4600 | 82,4 % | 53,9 % | +0,8 | 1288 | 62,3 % | 58,8 % | +5,7 |
| Bronzener Wall | Leonidas | 2 | Basis | 4600 | 82,3 % | 54,4 % | +1,3 | 1210 | 58,9 % | 54,5 % | +1,4 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 4600 | 77,0 % | 55,5 % | +2,4 | 1506 | 53,3 % | 52,4 % | −0,7 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1398 | 64,2 % | 59,1 % | +6,0 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1518 | 61,9 % | 51,2 % | −1,9 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1818 | 62,1 % | 63,0 % | +9,9 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1430 | 52,6 % | 58,1 % | +5,0 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 2282 | 58,3 % | 52,8 % | −0,3 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 1886 | 54,0 % | 60,6 % | +7,5 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 4600 | 82,5 % | 51,5 % | −1,3 | 876 | 57,3 % | 46,7 % | −2,2 |
| Erdmessung des Eratosthenes | Hypatia | 2 | Basis | 4600 | 87,2 % | 53,1 % | +0,3 | 1226 | 63,5 % | 49,8 % | +0,9 |
| Sternenkundiger | Hypatia | 3 | Basis | 4600 | 81,8 % | 54,4 % | +1,7 | 1648 | 55,3 % | 50,5 % | +1,5 |
| Sternkatalog des Hipparchos | Hypatia | 4 | Basis | 4600 | 79,2 % | 56,7 % | +4,0 | 1426 | 56,0 % | 54,5 % | +5,5 |
| Synesios von Kyrene | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1540 | 62,5 % | 55,5 % | +6,6 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1344 | 39,4 % | 48,1 % | −0,8 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1748 | 54,6 % | 52,1 % | +3,1 |
| Brennspiegel des Archimedes | Hypatia | 6 | Selten | – | – | – | – | 2330 | 61,9 % | 46,4 % | −2,5 |
| Klaudios Ptolemaios | Hypatia | 5 | Episch | – | – | – | – | 1774 | 58,2 % | 48,1 % | −0,8 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1788 | 55,7 % | 52,9 % | +3,9 |
| Nilschülerin | Imhotep | 1 | Basis | 4600 | 82,8 % | 51,6 % | −0,2 | 930 | 55,3 % | 56,4 % | +5,4 |
| Heilender Balsam | Imhotep | 1 | Basis | 4600 | 83,8 % | 53,7 % | +1,9 | 842 | 63,2 % | 50,1 % | −0,9 |
| Pyramidenwächter | Imhotep | 3 | Basis | 4600 | 84,2 % | 53,1 % | +1,3 | 1432 | 60,8 % | 54,4 % | +3,4 |
| Tempelärztin | Imhotep | 4 | Basis | 4600 | 80,8 % | 52,5 % | +0,7 | 1436 | 55,8 % | 48,8 % | −2,2 |
| Brot und Bier | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1308 | 59,7 % | 54,8 % | +3,8 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1416 | 60,3 % | 52,1 % | +1,1 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1460 | 54,0 % | 52,3 % | +1,3 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1898 | 55,6 % | 54,8 % | +3,8 |
| Urteil nach der Maat | Imhotep | 5 | Episch | – | – | – | – | 1822 | 60,4 % | 50,5 % | −0,5 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 2300 | 54,7 % | 55,3 % | +4,3 |
| Lagunenbote | Dandolo | 1 | Basis | 4600 | 79,8 % | 54,7 % | +2,7 | 844 | 56,4 % | 57,6 % | +7,0 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 4600 | 79,0 % | 51,1 % | −0,9 | 1276 | 55,0 % | 50,5 % | −0,1 |
| Präziser Stich | Dandolo | 2 | Basis | 4600 | 84,8 % | 53,4 % | +1,5 | 1238 | 58,2 % | 50,8 % | +0,2 |
| Handelsgesandter | Dandolo | 4 | Basis | 4600 | 78,7 % | 55,1 % | +3,1 | 1424 | 57,9 % | 51,3 % | +0,7 |
| Dogenklinge | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1248 | 58,4 % | 53,8 % | +3,2 |
| Nachtwache am Kanal | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1390 | 58,7 % | 53,1 % | +2,5 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1272 | 52,5 % | 53,2 % | +2,6 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1762 | 57,7 % | 52,5 % | +1,9 |
| Arsenal von Venedig | Dandolo | 4 | Episch | – | – | – | – | 1302 | 46,9 % | 52,4 % | +1,8 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 2256 | 50,5 % | 54,1 % | +3,5 |
| Späher aus Engern | Widukind | 1 | Basis | 4600 | 75,6 % | 48,6 % | −0,9 | 898 | 53,3 % | 50,7 % | +2,0 |
| Speerwerfer aus Westfalen | Widukind | 2 | Basis | 4600 | 77,1 % | 48,6 % | −0,9 | 1266 | 59,8 % | 47,7 % | −1,0 |
| Pfeilschuss | Widukind | 2 | Basis | 4600 | 76,1 % | 47,2 % | −2,3 | 1356 | 56,7 % | 48,9 % | +0,1 |
| Reiter der Edelinge | Widukind | 4 | Basis | 4600 | 70,8 % | 54,2 % | +4,7 | 1394 | 52,8 % | 54,6 % | +5,9 |
| Falknerin | Widukind | 3 | Gewöhnlich | – | – | – | – | 1412 | 50,3 % | 50,2 % | +1,5 |
| Sachsenaufstand | Widukind | 3 | Gewöhnlich | – | – | – | – | 1334 | 49,3 % | 47,0 % | −1,7 |
| Schildträger aus Ostfalen | Widukind | 5 | Selten | – | – | – | – | 1630 | 52,6 % | 51,0 % | +2,2 |
| Sturm auf die Eresburg | Widukind | 6 | Selten | – | – | – | – | 2158 | 54,2 % | 53,4 % | +4,7 |
| Gefolgschaft Widukinds | Widukind | 6 | Episch | – | – | – | – | 2244 | 52,2 % | 48,0 % | −0,7 |
| Abbi, Gefährte Widukinds | Widukind | 6 | Legendär | – | – | – | – | 2134 | 51,6 % | 51,8 % | +3,1 |
| Hüterin des Hains | Vercingetorix | 1 | Basis | 4600 | 82,5 % | 47,0 % | −1,6 | 966 | 56,9 % | 49,4 % | +1,5 |
| Schild aus Eichenholz | Vercingetorix | 2 | Basis | 4600 | 75,3 % | 47,2 % | −1,4 | 1264 | 49,0 % | 46,3 % | −1,7 |
| Krieger der Arverner | Vercingetorix | 3 | Basis | 4600 | 85,4 % | 49,9 % | +1,3 | 1462 | 61,9 % | 52,0 % | +4,0 |
| Hieb mit dem Langschwert | Vercingetorix | 3 | Basis | 4600 | 84,7 % | 47,8 % | −0,8 | 1488 | 64,7 % | 44,8 % | −3,1 |
| Reiter der Arverner | Vercingetorix | 4 | Gewöhnlich | – | – | – | – | 1438 | 52,6 % | 47,4 % | −0,5 |
| Heilkundige mit der Mistel | Vercingetorix | 3 | Gewöhnlich | – | – | – | – | 1438 | 58,1 % | 46,8 % | −1,2 |
| Erhebung der Gallier | Vercingetorix | 3 | Selten | – | – | – | – | 1470 | 60,1 % | 48,7 % | +0,8 |
| Verteidiger von Gergovia | Vercingetorix | 6 | Selten | – | – | – | – | 2320 | 58,5 % | 49,6 % | +1,7 |
| Letzter Ritt vor Alesia | Vercingetorix | 5 | Episch | – | – | – | – | 1792 | 44,0 % | 46,0 % | −1,9 |
| Commius, Führer des Entsatzheers | Vercingetorix | 8 | Legendär | – | – | – | – | 1266 | 51,4 % | 50,0 % | +2,1 |
| Apothekerlehrling | Böttger | 1 | Basis | 4600 | 85,5 % | 53,6 % | +2,8 | 856 | 65,2 % | 54,7 % | +5,0 |
| Verpuffung im Laboratorium | Böttger | 2 | Basis | 4600 | 89,3 % | 53,6 % | +2,8 | 1298 | 70,8 % | 52,4 % | +2,7 |
| Bergmann aus Aue | Böttger | 3 | Basis | 4600 | 85,2 % | 51,9 % | +1,1 | 1504 | 55,0 % | 46,2 % | −3,5 |
| Rezept des Goldmachers | Böttger | 4 | Basis | 4600 | 66,8 % | 51,3 % | +0,5 | 1352 | 34,0 % | 46,9 % | −2,8 |
| Pestarzt | Böttger | 4 | Gewöhnlich | – | – | – | – | 1392 | 62,4 % | 53,5 % | +3,9 |
| Befehl des Kurfürsten | Böttger | 2 | Gewöhnlich | – | – | – | – | 1268 | 66,4 % | 55,7 % | +6,1 |
| Schreiber der Manufaktur | Böttger | 4 | Selten | – | – | – | – | 1408 | 64,5 % | 50,3 % | +0,6 |
| Glut des Brennofens | Böttger | 4 | Selten | – | – | – | – | 1424 | 48,8 % | 51,5 % | +1,9 |
| Wache auf dem Königstein | Böttger | 6 | Episch | – | – | – | – | 2316 | 67,4 % | 48,8 % | −0,8 |
| Tschirnhaus, Naturforscher | Böttger | 5 | Legendär | – | – | – | – | 1714 | 60,2 % | 49,7 % | +0,1 |
| Pförtnerin vom Rupertsberg | Hildegard | 1 | Basis | 4600 | 78,6 % | 49,6 % | −0,6 | 974 | 58,9 % | 56,9 % | +6,9 |
| Grünkraft | Hildegard | 2 | Basis | 4600 | 79,0 % | 50,2 % | −0,1 | 1292 | 55,0 % | 51,3 % | +1,4 |
| Klostervogt | Hildegard | 3 | Basis | 4600 | 78,8 % | 51,2 % | +1,0 | 1492 | 59,9 % | 53,6 % | +3,7 |
| Einkleidung der Novizinnen | Hildegard | 2 | Basis | 4600 | 77,2 % | 48,9 % | −1,4 | 1304 | 55,5 % | 53,0 % | +3,0 |
| Pilger am Rhein | Hildegard | 4 | Gewöhnlich | – | – | – | – | 1386 | 48,2 % | 48,7 % | −1,3 |
| Segen der Äbtissin | Hildegard | 2 | Gewöhnlich | – | – | – | – | 1306 | 49,8 % | 52,9 % | +2,9 |
| Vorsängerin im Chor | Hildegard | 5 | Selten | – | – | – | – | 1688 | 55,9 % | 51,4 % | +1,5 |
| Spiel der Tugenden | Hildegard | 6 | Selten | – | – | – | – | 2134 | 50,9 % | 52,2 % | +2,2 |
| Ritter mit dem Schutzbrief | Hildegard | 7 | Episch | – | – | – | – | 1946 | 47,7 % | 48,6 % | −1,3 |
| Jutta von Sponheim, Magistra | Hildegard | 7 | Legendär | – | – | – | – | 1890 | 48,4 % | 50,1 % | +0,1 |
| Siedler aus Franken | Wiprecht | 1 | Basis | 4600 | 77,2 % | 47,2 % | −2,2 | 944 | 54,7 % | 51,2 % | +2,2 |
| Fehde | Wiprecht | 2 | Basis | 4600 | 81,6 % | 48,7 % | −0,7 | 1310 | 65,1 % | 45,5 % | −3,5 |
| Burgmann von Groitzsch | Wiprecht | 3 | Basis | 4600 | 80,7 % | 50,6 % | +1,2 | 1454 | 62,2 % | 50,6 % | +1,7 |
| Lokator | Wiprecht | 4 | Basis | 4600 | 76,1 % | 51,4 % | +2,0 | 1396 | 56,5 % | 49,3 % | +0,3 |
| Verhau | Wiprecht | 3 | Gewöhnlich | – | – | – | – | 1394 | 62,6 % | 50,2 % | +1,3 |
| Panzerreiter | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1464 | 53,8 % | 49,9 % | +1,0 |
| Rodung | Wiprecht | 3 | Selten | – | – | – | – | 1480 | 58,3 % | 53,3 % | +4,3 |
| Grenzwächter der Mark | Wiprecht | 5 | Selten | – | – | – | – | 1758 | 54,9 % | 47,6 % | −1,3 |
| Heerfahrt nach Italien | Wiprecht | 5 | Episch | – | – | – | – | 1754 | 56,7 % | 49,8 % | +0,8 |
| Judith von Böhmen | Wiprecht | 7 | Legendär | – | – | – | – | 2048 | 52,5 % | 52,2 % | +3,3 |
| Edelknabe | Ulrich | 1 | Basis | 4600 | 80,8 % | 48,6 % | −0,3 | 914 | 54,9 % | 51,5 % | +1,0 |
| Lanzenstoß | Ulrich | 1 | Basis | 4600 | 83,9 % | 49,7 % | +0,8 | 882 | 58,6 % | 51,3 % | +0,7 |
| Fahrender Ritter | Ulrich | 3 | Basis | 4600 | 83,3 % | 49,6 % | +0,7 | 1476 | 52,1 % | 51,9 % | +1,4 |
| Minnebrief | Ulrich | 2 | Basis | 4600 | 74,2 % | 50,9 % | +2,1 | 1288 | 46,4 % | 49,9 % | −0,6 |
| Minneritter | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1552 | 56,8 % | 54,4 % | +3,8 |
| Mit eingelegter Lanze | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1414 | 41,4 % | 48,5 % | −2,0 |
| Kämpe im Buhurt | Ulrich | 4 | Selten | – | – | – | – | 1380 | 43,4 % | 49,4 % | −1,1 |
| Venusfahrt | Ulrich | 5 | Selten | – | – | – | – | 1756 | 45,5 % | 51,2 % | +0,7 |
| Landrichter der Steiermark | Ulrich | 6 | Episch | – | – | – | – | 2256 | 54,2 % | 50,8 % | +0,2 |
| Friedrich der Streitbare | Ulrich | 6 | Legendär | – | – | – | – | 2134 | 49,9 % | 49,4 % | −1,2 |
| Dorfwache | neutral | 1 | Basis | 101200 | 80,6 % | 49,2 % | −0,8 | 20124 | 57,6 % | 51,3 % | +1,3 |
| Wandernder Händler | neutral | 2 | Basis | 101200 | 81,0 % | 49,0 % | −1,1 | 28808 | 57,1 % | 50,7 % | +0,7 |
| Steinschleuderer | neutral | 2 | Basis | 101200 | 81,1 % | 49,7 % | −0,3 | 28302 | 57,6 % | 50,8 % | +0,8 |
| Wilderin | neutral | 3 | Basis | 101200 | 83,2 % | 49,7 % | −0,3 | 31878 | 59,2 % | 49,5 % | −0,5 |
| Torwache der Burg | neutral | 4 | Basis | 101200 | 76,8 % | 51,3 % | +1,3 | 31804 | 52,2 % | 50,7 % | +0,7 |
| Kavallerist | neutral | 4 | Basis | 101200 | 78,2 % | 51,3 % | +1,3 | 31764 | 52,7 % | 51,0 % | +1,1 |
| Feldheilerin | neutral | 3 | Basis | 101200 | 80,7 % | 49,6 % | −0,4 | 32000 | 56,0 % | 49,6 % | −0,4 |
| Archivarin | neutral | 4 | Basis | 101200 | 74,5 % | 52,6 % | +2,5 | 32234 | 51,6 % | 50,0 % | −0,0 |
| Wachhund | neutral | 2 | Basis | 101200 | 78,5 % | 48,9 % | −1,1 | 28308 | 54,9 % | 49,8 % | −0,2 |
| Veteran | neutral | 5 | Basis | 101200 | 79,2 % | 52,5 % | +2,5 | 40118 | 56,2 % | 49,3 % | −0,7 |
| Belagerungsturm | neutral | 6 | Basis | 101200 | 76,6 % | 55,2 % | +5,2 | 51452 | 57,4 % | 50,2 % | +0,2 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 32470 | 55,4 % | 50,1 % | +0,1 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 20160 | 56,6 % | 51,6 % | +1,6 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 40012 | 56,9 % | 52,9 % | +2,9 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 32468 | 54,7 % | 49,9 % | −0,1 |
| Nachtwächter | neutral | 2 | Basis | – | – | – | – | 28252 | 54,2 % | 50,5 % | +0,5 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 28464 | 48,9 % | 49,8 % | −0,1 |
| Heilkräuter | neutral | 1 | Basis | – | – | – | – | 20142 | 54,0 % | 48,4 % | −1,6 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 28586 | 62,1 % | 49,4 % | −0,6 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 45274 | 58,2 % | 53,3 % | +3,3 |
| Ordensritter | neutral | 3 | Gewöhnlich | – | – | – | – | 32192 | 58,1 % | 51,2 % | +1,3 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 31890 | 53,2 % | 50,1 % | +0,1 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 28304 | 57,9 % | 52,9 % | +2,9 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 32098 | 54,9 % | 52,0 % | +2,1 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 32190 | 60,1 % | 54,1 % | +4,1 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 28346 | 38,4 % | 47,5 % | −2,5 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 31554 | 54,1 % | 48,0 % | −2,0 |
| Prätorianer | neutral | 5 | Gewöhnlich | – | – | – | – | 40188 | 54,3 % | 50,1 % | +0,1 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 31642 | 57,8 % | 54,4 % | +4,4 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 31814 | 52,5 % | 53,3 % | +3,3 |
| Löwin der Arena | neutral | 5 | Selten | – | – | – | – | 39924 | 58,3 % | 52,0 % | +2,0 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 40244 | 55,0 % | 50,5 % | +0,5 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 31976 | 50,6 % | 50,1 % | +0,1 |
| Trojanisches Pferd | neutral | 6 | Selten | – | – | – | – | 51578 | 60,1 % | 50,7 % | +0,7 |
| Brander | neutral | 7 | Episch | – | – | – | – | 45122 | 53,7 % | 53,2 % | +3,2 |
| Mercators Atlas | neutral | 4 | Episch | – | – | – | – | 32294 | 36,5 % | 50,7 % | +0,7 |
| Burgbesatzung | neutral | 8 | Episch | – | – | – | – | 30784 | 52,4 % | 57,5 % | +7,6 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 45568 | 61,2 % | 51,6 % | +1,6 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 31768 | 49,9 % | 52,6 % | +2,6 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 30656 | 51,5 % | 53,5 % | +3,6 |
| Spitzel im Venezianerviertel | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1456 | 60,2 % | 55,5 % | +4,9 |
| Plünderer am Rhein | Widukind | 3 | Gewöhnlich | – | – | – | – | 1484 | 57,7 % | 48,0 % | −0,7 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1266 | 54,4 % | 54,8 % | +3,8 |
| Zwanzig Städte in Flammen | Vercingetorix | 3 | Selten | – | – | – | – | 1452 | 54,9 % | 47,1 % | −0,8 |
| Eid der Arkanisten | Böttger | 1 | Selten | – | – | – | – | 922 | 68,2 % | 56,6 % | +7,0 |
| Böhmischer Söldner | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1344 | 54,5 % | 43,9 % | −5,1 |
| Brandschatzung | Wiprecht | 1 | Gewöhnlich | – | – | – | – | 892 | 64,5 % | 44,5 % | −4,5 |
| Heimlicher Bote | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1280 | 53,4 % | 52,6 % | +2,0 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 28308 | 56,2 % | 49,1 % | −0,9 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 20070 | 58,7 % | 52,5 % | +2,5 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 28474 | 62,4 % | 55,9 % | +5,9 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 32712 | 55,7 % | 52,4 % | +2,4 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 32566 | 59,2 % | 51,1 % | +1,1 |
| Ruderer der Triere | Perikles | 1 | Basis | 4600 | 79,4 % | 50,4 % | +1,5 | 890 | 60,2 % | 55,4 % | +4,0 |
| Lange Mauern | Perikles | 2 | Basis | 4600 | 79,7 % | 45,6 % | −3,3 | 1226 | 58,7 % | 47,4 % | −4,1 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 4600 | 81,7 % | 52,4 % | +3,5 | 1408 | 62,7 % | 53,9 % | +2,5 |
| Strategos | Perikles | 3 | Basis | 4600 | 79,6 % | 51,7 % | +2,9 | 1538 | 61,8 % | 56,9 % | +5,5 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1382 | 50,7 % | 45,9 % | −5,5 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1248 | 64,3 % | 56,3 % | +4,9 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1450 | 61,8 % | 53,6 % | +2,2 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1474 | 44,2 % | 49,0 % | −2,4 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1386 | 42,1 % | 45,7 % | −5,7 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 2172 | 58,8 % | 54,3 % | +2,9 |
| Pilumwerfer | Agrippa | 1 | Basis | 4600 | 77,8 % | 52,6 % | +3,0 | 920 | 60,0 % | 54,0 % | +5,6 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 4600 | 78,3 % | 53,0 % | +3,4 | 1248 | 58,3 % | 56,7 % | +8,3 |
| Castra | Agrippa | 3 | Basis | 4600 | 82,1 % | 50,1 % | +0,5 | 1456 | 64,4 % | 49,0 % | +0,7 |
| Testudo | Agrippa | 2 | Basis | 4600 | 74,7 % | 50,5 % | +1,0 | 1270 | 56,4 % | 51,7 % | +3,4 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1358 | 54,0 % | 48,9 % | +0,6 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1458 | 57,5 % | 49,3 % | +1,0 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1830 | 57,9 % | 52,6 % | +4,3 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1258 | 60,2 % | 42,9 % | −5,4 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1402 | 48,6 % | 47,0 % | −1,4 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1748 | 50,7 % | 52,5 % | +4,2 |
| Bogenschütze aus Elkab | Ahhotep | 1 | Basis | 4600 | 82,5 % | 51,2 % | −0,1 | 924 | 62,0 % | 51,7 % | +1,2 |
| Krieger der Nilflotte | Ahhotep | 2 | Basis | 4600 | 81,1 % | 50,9 % | −0,4 | 1262 | 52,9 % | 52,3 % | +1,7 |
| Pfeilregen vor Auaris | Ahhotep | 2 | Basis | 4600 | 78,9 % | 52,4 % | +1,0 | 1286 | 50,4 % | 46,4 % | −4,1 |
| Speerträger aus Theben | Ahhotep | 3 | Basis | 4600 | 84,0 % | 52,0 % | +0,7 | 1406 | 59,2 % | 53,8 % | +3,2 |
| Priester der Selket | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1454 | 57,8 % | 51,2 % | +0,7 |
| Medjai-Kundschafter | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1442 | 60,7 % | 50,1 % | −0,5 |
| Erbeuteter Streitwagen | Ahhotep | 6 | Selten | – | – | – | – | 2308 | 61,3 % | 52,8 % | +2,3 |
| Überfall auf Nefrusi | Ahhotep | 3 | Selten | – | – | – | – | 1450 | 60,3 % | 48,0 % | −2,5 |
| Ahmose, Befreier Ägyptens | Ahhotep | 5 | Episch | – | – | – | – | 1806 | 60,4 % | 47,1 % | −3,5 |
| Zeremonialaxt des Ahmose | Ahhotep | 6 | Legendär | – | – | – | – | 2302 | 54,3 % | 49,7 % | −0,9 |
| Kopistin der Chronik | Anna | 1 | Basis | 4600 | 81,1 % | 53,5 % | +3,1 | 948 | 54,0 % | 58,2 % | +7,0 |
| Pantokrator-Spital | Anna | 3 | Basis | 4600 | 72,9 % | 51,5 % | +1,0 | 1398 | 38,1 % | 48,9 % | −2,3 |
| Warägergardist | Anna | 3 | Basis | 4600 | 82,6 % | 54,9 % | +4,5 | 1430 | 57,1 % | 58,0 % | +6,8 |
| Hofärztin | Anna | 3 | Basis | 4600 | 81,5 % | 50,5 % | +0,1 | 1434 | 44,8 % | 50,1 % | −1,2 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1450 | 55,3 % | 61,5 % | +10,3 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1394 | 53,9 % | 56,8 % | +5,5 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1628 | 53,4 % | 59,7 % | +8,5 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1444 | 44,8 % | 52,1 % | +0,9 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1808 | 53,9 % | 55,2 % | +3,9 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 2250 | 54,2 % | 55,1 % | +3,9 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 4600 | 82,7 % | 48,6 % | −0,0 | 852 | 61,7 % | 54,0 % | +5,8 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 4600 | 81,9 % | 48,8 % | +0,2 | 1282 | 60,4 % | 52,7 % | +4,5 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 4600 | 83,3 % | 49,3 % | +0,7 | 1278 | 63,1 % | 50,2 % | +2,0 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 4600 | 82,8 % | 47,8 % | −0,8 | 1544 | 61,9 % | 50,7 % | +2,5 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1224 | 58,8 % | 47,5 % | −0,7 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1300 | 59,2 % | 49,6 % | +1,4 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1450 | 59,7 % | 50,2 % | +2,0 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1584 | 57,0 % | 45,8 % | −2,4 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 2342 | 62,1 % | 58,1 % | +9,9 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 1784 | 51,9 % | 48,4 % | +0,2 |
| Lehnsmann | Theophanu | 1 | Basis | 4600 | 82,2 % | 45,1 % | −2,5 | 806 | 62,7 % | 54,8 % | +3,4 |
| Bogenschütze der Pfalz | Theophanu | 2 | Basis | 4600 | 82,6 % | 46,1 % | −1,5 | 1230 | 63,3 % | 56,1 % | +4,7 |
| Treueschwur | Theophanu | 1 | Basis | 4600 | 82,3 % | 49,1 % | +1,5 | 878 | 60,0 % | 54,2 % | +2,8 |
| Stiftsdame aus Quedlinburg | Theophanu | 2 | Basis | 4600 | 82,9 % | 45,9 % | −1,7 | 1308 | 64,8 % | 51,2 % | −0,2 |
| Späher an der Elbe | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1224 | 65,0 % | 54,7 % | +3,2 |
| Heerbann | Theophanu | 4 | Gewöhnlich | – | – | – | – | 1532 | 60,2 % | 54,4 % | +3,0 |
| St. Pantaleon in Köln | Theophanu | 2 | Selten | – | – | – | – | 1214 | 61,4 % | 52,4 % | +1,0 |
| Haft in Utrecht | Theophanu | 3 | Selten | – | – | – | – | 1548 | 61,6 % | 49,5 % | −2,0 |
| Willigis, Erzbischof von Mainz | Theophanu | 5 | Episch | – | – | – | – | 1852 | 63,9 % | 56,0 % | +4,5 |
| Otto II., Kaiser | Theophanu | 6 | Legendär | – | – | – | – | 2456 | 60,3 % | 54,4 % | +2,9 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1446 | 60,2 % | 57,4 % | +4,3 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1442 | 62,1 % | 50,2 % | −2,9 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1316 | 60,1 % | 49,7 % | +0,8 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1382 | 58,5 % | 51,4 % | +2,4 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1476 | 61,8 % | 51,6 % | +0,5 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1332 | 64,4 % | 46,7 % | −4,3 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1272 | 57,5 % | 52,1 % | +1,5 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 2248 | 52,3 % | 53,1 % | +2,5 |
| Heerlager an der Weser | Widukind | 3 | Gewöhnlich | – | – | – | – | 1426 | 42,7 % | 43,5 % | −5,2 |
| Versammlung in Marklo | Widukind | 4 | Selten | – | – | – | – | 1384 | 38,8 % | 47,3 % | −1,4 |
| Barde der Arverner | Vercingetorix | 2 | Gewöhnlich | – | – | – | – | 1312 | 57,6 % | 50,4 % | +2,4 |
| Gallische Reiterei | Vercingetorix | 5 | Selten | – | – | – | – | 1762 | 55,2 % | 48,9 % | +1,0 |
| Laborbuch | Böttger | 1 | Gewöhnlich | – | – | – | – | 842 | 62,9 % | 54,4 % | +4,7 |
| Weißes Gold | Böttger | 3 | Selten | – | – | – | – | 1580 | 17,3 % | 49,5 % | −0,2 |
| Adlige Stifterin | Hildegard | 1 | Gewöhnlich | – | – | – | – | 958 | 55,3 % | 53,5 % | +3,6 |
| Weihe der Klosterkirche | Hildegard | 4 | Selten | – | – | – | – | 1514 | 40,6 % | 51,0 % | +1,0 |
| Feldmesser | Wiprecht | 2 | Gewöhnlich | – | – | – | – | 1328 | 57,5 % | 49,7 % | +0,8 |
| Beuterecht | Wiprecht | 1 | Selten | – | – | – | – | 936 | 59,8 % | 48,0 % | −1,0 |
| Ritter aus Murau | Ulrich | 4 | Selten | – | – | – | – | 1380 | 49,8 % | 48,8 % | −1,7 |
| Frische Lanze | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1300 | 56,0 % | 46,9 % | −3,6 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1260 | 52,9 % | 52,3 % | +0,8 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1418 | 42,0 % | 47,4 % | −4,0 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1438 | 55,6 % | 45,2 % | −3,2 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1434 | 45,0 % | 46,4 % | −1,9 |
| Pfeilmacher aus Edfu | Ahhotep | 2 | Gewöhnlich | – | – | – | – | 1324 | 62,4 % | 52,6 % | +2,0 |
| Gift der Hornviper | Ahhotep | 3 | Selten | – | – | – | – | 1408 | 51,3 % | 51,5 % | +0,9 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1364 | 56,2 % | 55,6 % | +4,4 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 2294 | 61,4 % | 56,9 % | +5,7 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1220 | 60,2 % | 48,7 % | +0,5 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1302 | 61,8 % | 45,1 % | −3,2 |
| Kanzler der Kaiserin | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1250 | 63,1 % | 52,7 % | +1,3 |
| Siegel der Kaiserin | Theophanu | 2 | Selten | – | – | – | – | 1168 | 56,5 % | 51,4 % | −0,0 |
| Olympionike | Griechenland und Hellenismus | 4 | Gewöhnlich | – | – | – | – | 5808 | 57,0 % | 55,6 % | +4,8 |
| Rhapsode | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 5098 | 55,9 % | 54,9 % | +4,2 |
| Marathonläufer | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 4896 | 55,1 % | 55,1 % | +4,4 |
| Orakel von Delphi | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 5770 | 38,3 % | 51,7 % | +1,0 |
| Leuchtturm von Pharos | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 5870 | 55,7 % | 46,6 % | −4,1 |
| Akropolis | Griechenland und Hellenismus | 2 | Selten | – | – | – | – | 5044 | 59,4 % | 51,1 % | +0,3 |
| Bibliothek von Alexandria | Griechenland und Hellenismus | 3 | Episch | – | – | – | – | 5912 | 53,4 % | 50,8 % | +0,1 |
| Knappe | Mittelalter im Reich | 1 | Gewöhnlich | – | – | – | – | 4492 | 56,9 % | 52,4 % | +2,4 |
| Armbrustschütze | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 7406 | 62,5 % | 53,7 % | +3,7 |
| Mönch von Cluny | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 7378 | 54,6 % | 52,6 % | +2,6 |
| Hansekogge | Mittelalter im Reich | 4 | Gewöhnlich | – | – | – | – | 7068 | 51,7 % | 48,8 % | −1,2 |
| Turnierritter | Mittelalter im Reich | 4 | Selten | – | – | – | – | 7206 | 54,6 % | 52,9 % | +2,9 |
| Burgfried | Mittelalter im Reich | 2 | Selten | – | – | – | – | 6534 | 64,2 % | 44,7 % | −5,2 |
| Tribok | Mittelalter im Reich | 4 | Episch | – | – | – | – | 6962 | 38,9 % | 49,4 % | −0,6 |
| Landsknecht | Frühe Neuzeit | 1 | Gewöhnlich | – | – | – | – | 2616 | 62,1 % | 51,2 % | +2,6 |
| Buchdrucker aus Mainz | Frühe Neuzeit | 3 | Gewöhnlich | – | – | – | – | 4480 | 59,1 % | 53,1 % | +4,5 |
| Leipziger Kaffeehaus | Frühe Neuzeit | 2 | Gewöhnlich | – | – | – | – | 3978 | 55,3 % | 47,5 % | −1,1 |
| Kartaunen-Salve | Frühe Neuzeit | 3 | Selten | – | – | – | – | 4500 | 64,0 % | 48,6 % | −0,1 |
| Kriegsgaleone | Frühe Neuzeit | 5 | Selten | – | – | – | – | 5362 | 62,4 % | 50,7 % | +2,0 |
| Stehendes Heer | Frühe Neuzeit | 5 | Episch | – | – | – | – | 5362 | 63,1 % | 49,1 % | +0,4 |
| Sternschanze | Frühe Neuzeit | 2 | Episch | – | – | – | – | 3944 | 67,2 % | 44,2 % | −4,5 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 32474 | 40,4 % | 46,0 % | −4,0 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 28448 | 60,8 % | 46,6 % | −3,4 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 31572 | 35,6 % | 46,7 % | −3,3 |
| Thebanischer Plänkler | Epaminondas | 1 | Basis | 4600 | 78,2 % | 47,5 % | −0,3 | 940 | 54,1 % | 53,4 % | +4,0 |
| Böotischer Hoplit | Epaminondas | 2 | Basis | 4600 | 78,8 % | 47,9 % | +0,1 | 1330 | 57,5 % | 54,6 % | +5,2 |
| Fünfzig Schilde tief | Epaminondas | 2 | Basis | 4600 | 74,5 % | 47,7 % | −0,0 | 1338 | 52,5 % | 50,7 % | +1,3 |
| Böotarch | Epaminondas | 3 | Basis | 4600 | 78,1 % | 47,4 % | −0,3 | 1506 | 53,5 % | 55,1 % | +5,6 |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | Gewöhnlich | – | – | – | – | 1870 | 54,4 % | 54,4 % | +5,0 |
| Schlacht bei Leuktra | Epaminondas | 4 | Gewöhnlich | – | – | – | – | 1578 | 51,1 % | 49,8 % | +0,3 |
| Befreiung Messeniens | Epaminondas | 5 | Selten | – | – | – | – | 1750 | 53,9 % | 50,4 % | +1,0 |
| Thebanischer Phalangit | Epaminondas | 4 | Selten | – | – | – | – | 1418 | 47,5 % | 52,2 % | +2,8 |
| Megalopolis | Epaminondas | 3 | Episch | – | – | – | – | 1448 | 48,2 % | 44,1 % | −5,3 |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | Legendär | – | – | – | – | 2294 | 50,7 % | 51,9 % | +2,4 |
| Veles | Fabius | 1 | Basis | 4600 | 88,2 % | 48,4 % | +0,0 | 874 | 63,6 % | 55,7 % | +3,0 |
| Triarier | Fabius | 2 | Basis | 4600 | 86,5 % | 48,6 % | +0,3 | 1272 | 61,2 % | 56,5 % | +3,7 |
| Hinhalten | Fabius | 2 | Basis | 4600 | 85,4 % | 48,3 % | −0,1 | 1354 | 64,8 % | 53,9 % | +1,1 |
| Konsul der Republik | Fabius | 4 | Basis | 4600 | 84,5 % | 49,1 % | +0,7 | 1376 | 56,5 % | 53,6 % | +0,9 |
| Verbrannte Erde | Fabius | 3 | Gewöhnlich | – | – | – | – | 1386 | 66,9 % | 52,6 % | −0,2 |
| Späher am Volturnus | Fabius | 2 | Gewöhnlich | – | – | – | – | 1348 | 60,5 % | 52,3 % | −0,5 |
| Minucius, der Reiteroberst | Fabius | 4 | Selten | – | – | – | – | 1452 | 62,3 % | 55,5 % | +2,7 |
| Rückeroberung von Tarent | Fabius | 6 | Selten | – | – | – | – | 2204 | 55,9 % | 56,2 % | +3,5 |
| Lager auf den Höhen | Fabius | 3 | Episch | – | – | – | – | 1488 | 67,1 % | 51,9 % | −0,9 |
| Marcellus, Schwert Roms | Fabius | 6 | Legendär | – | – | – | – | 2306 | 56,5 % | 51,2 % | −1,6 |
| Botin der Cherusker | Thusnelda | 1 | Basis | 4600 | 77,5 % | 52,5 % | +2,8 | 916 | 53,9 % | 60,3 % | +6,8 |
| Hüterin des Herdfeuers | Thusnelda | 2 | Basis | 4600 | 79,0 % | 50,5 % | +0,8 | 1380 | 52,9 % | 54,3 % | +0,8 |
| Ruf zum Thing | Thusnelda | 3 | Basis | 4600 | 72,8 % | 48,2 % | −1,5 | 1472 | 49,5 % | 49,6 % | −3,9 |
| Krieger im Keil | Thusnelda | 3 | Basis | 4600 | 80,4 % | 51,8 % | +2,0 | 1426 | 59,4 % | 55,3 % | +1,8 |
| Varusschlacht | Thusnelda | 4 | Gewöhnlich | – | – | – | – | 1442 | 52,2 % | 55,0 % | +1,6 |
| Krieger der Sippe | Thusnelda | 3 | Gewöhnlich | – | – | – | – | 1504 | 54,3 % | 55,7 % | +2,3 |
| Heiliger Hain | Thusnelda | 2 | Selten | – | – | – | – | 1382 | 62,2 % | 52,3 % | −1,1 |
| Seitenwechsel | Thusnelda | 5 | Selten | – | – | – | – | 1834 | 50,2 % | 52,8 % | −0,7 |
| Arminius, Fürst der Cherusker | Thusnelda | 4 | Episch | – | – | – | – | 1424 | 49,1 % | 55,4 % | +1,9 |
| Bund der Stämme | Thusnelda | 8 | Legendär | – | – | – | – | 1448 | 49,7 % | 55,7 % | +2,3 |
| Mamlukenrekrut | Baibars | 1 | Basis | 4600 | 83,0 % | 49,5 % | −1,5 | 950 | 57,2 % | 49,3 % | +0,6 |
| Barid-Kurier | Baibars | 2 | Basis | 4600 | 79,3 % | 52,0 % | +1,0 | 1314 | 52,0 % | 51,4 % | +2,6 |
| Ain Dschalut | Baibars | 3 | Basis | 4600 | 85,0 % | 52,0 % | +1,1 | 1486 | 61,2 % | 50,6 % | +1,9 |
| Bogenreiter der Bahriya | Baibars | 3 | Basis | 4600 | 83,2 % | 50,0 % | −1,0 | 1482 | 55,1 % | 49,2 % | +0,5 |
| Manjaniq-Meister | Baibars | 4 | Gewöhnlich | – | – | – | – | 1498 | 56,4 % | 48,1 % | −0,6 |
| Vorgetäuschte Flucht | Baibars | 1 | Gewöhnlich | – | – | – | – | 852 | 24,2 % | 45,9 % | −2,8 |
| Qutuz, Sultan von Ägypten | Baibars | 5 | Selten | – | – | – | – | 1866 | 51,2 % | 53,0 % | +4,3 |
| Sturm auf Antiochia | Baibars | 2 | Selten | – | – | – | – | 1348 | 51,9 % | 47,0 % | −1,7 |
| Zitadelle von Kairo | Baibars | 4 | Episch | – | – | – | – | 1472 | 45,2 % | 44,2 % | −4,6 |
| Qalawun, Emir der Bahriya | Baibars | 6 | Legendär | – | – | – | – | 2478 | 52,6 % | 54,1 % | +5,4 |
| Schanzarbeiter | Vauban | 2 | Basis | 4600 | 76,4 % | 47,8 % | −1,2 | 1364 | 46,9 % | 48,2 % | +0,2 |
| Grenadier | Vauban | 2 | Basis | 4600 | 83,9 % | 49,9 % | +0,9 | 1348 | 67,4 % | 50,7 % | +2,7 |
| Salve von der Bastion | Vauban | 2 | Basis | 4600 | 78,1 % | 47,8 % | −1,2 | 1348 | 48,2 % | 49,8 % | +1,7 |
| Ingenieur des Königs | Vauban | 3 | Basis | 4600 | 83,9 % | 50,8 % | +1,7 | 1406 | 69,0 % | 52,2 % | +4,2 |
| Festungsgeschütz | Vauban | 3 | Gewöhnlich | – | – | – | – | 1536 | 62,6 % | 48,3 % | +0,3 |
| Faschinen | Vauban | 2 | Gewöhnlich | – | – | – | – | 1312 | 59,9 % | 49,7 % | +1,7 |
| Minengang | Vauban | 3 | Selten | – | – | – | – | 1498 | 60,2 % | 48,0 % | −0,1 |
| Zitadelle von Lille | Vauban | 4 | Selten | – | – | – | – | 1480 | 64,3 % | 41,8 % | −6,2 |
| Louvois, Kriegsminister | Vauban | 6 | Episch | – | – | – | – | 2326 | 64,3 % | 46,4 % | −1,7 |
| Ludwig XIV., der Sonnenkönig | Vauban | 5 | Legendär | – | – | – | – | 1804 | 54,4 % | 52,6 % | +4,6 |
| Speerwerfer vom Mont Lassois | Vix | 1 | Basis | 4600 | 83,5 % | 53,4 % | +2,6 | 886 | 59,6 % | 51,0 % | +4,0 |
| Prunkdolch | Vix | 2 | Basis | 4600 | 76,7 % | 53,6 % | +2,9 | 1310 | 50,2 % | 50,8 % | +3,8 |
| Reiter an der Seine | Vix | 3 | Basis | 4600 | 82,9 % | 52,7 % | +1,9 | 1510 | 54,4 % | 47,9 % | +0,9 |
| Seherin | Vix | 3 | Basis | 4600 | 81,6 % | 52,7 % | +2,0 | 1416 | 50,8 % | 47,3 % | +0,4 |
| Aufgebot des Fürstensitzes | Vix | 4 | Gewöhnlich | – | – | – | – | 1450 | 55,2 % | 48,8 % | +1,8 |
| Trankopfer | Vix | 1 | Gewöhnlich | – | – | – | – | 872 | 55,4 % | 47,5 % | +0,6 |
| Gelage am Krater | Vix | 1 | Selten | – | – | – | – | 934 | 61,0 % | 48,0 % | +1,1 |
| Schleuderer am Wall | Vix | 4 | Selten | – | – | – | – | 1530 | 58,5 % | 48,9 % | +1,9 |
| Halle auf dem Mont Lassois | Vix | 1 | Episch | – | – | – | – | 898 | 61,0 % | 44,9 % | −2,0 |
| Gesandter aus Massalia | Vix | 6 | Legendär | – | – | – | – | 2560 | 55,5 % | 48,1 % | +1,2 |
| Gladiator | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 5884 | 62,7 % | 53,0 % | +2,3 |
| Senator der Kurie | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 5748 | 55,6 % | 52,7 % | +2,0 |
| Centurio | Rom und Germanien | 2 | Gewöhnlich | – | – | – | – | 5194 | 59,2 % | 54,6 % | +3,9 |
| Triumphzug | Rom und Germanien | 3 | Selten | – | – | – | – | 5672 | 52,2 % | 50,5 % | −0,2 |
| Via Appia | Rom und Germanien | 2 | Selten | – | – | – | – | 5336 | 59,1 % | 48,6 % | −2,0 |
| Vestalin am ewigen Feuer | Rom und Germanien | 3 | Selten | – | – | – | – | 6010 | 61,0 % | 51,2 % | +0,5 |
| Pax Romana | Rom und Germanien | 5 | Episch | – | – | – | – | 7162 | 56,9 % | 47,9 % | −2,7 |
| Wagenbauer | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 3898 | 56,1 % | 51,5 % | +2,0 |
| Schreiber im Lebenshaus | Frühzeit und Ägypten | 3 | Gewöhnlich | – | – | – | – | 4354 | 57,3 % | 50,8 % | +1,5 |
| Schuss vom Streitwagen | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 3742 | 64,9 % | 52,9 % | +3,4 |
| Wache der Medjai | Frühzeit und Ägypten | 4 | Selten | – | – | – | – | 4304 | 53,1 % | 48,8 % | −0,6 |
| Angriff der Streitwagen | Frühzeit und Ägypten | 3 | Selten | – | – | – | – | 4456 | 58,7 % | 51,3 % | +1,8 |
| Bernsteinstraße | Frühzeit und Ägypten | 2 | Selten | – | – | – | – | 3772 | 59,4 % | 46,7 % | −2,8 |
| Festung Buhen | Frühzeit und Ägypten | 3 | Episch | – | – | – | – | 4390 | 53,7 % | 51,4 % | +2,0 |
| Akrit der Grenzmark | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 3978 | 58,1 % | 53,8 % | +3,7 |
| Gelehrter im Haus der Weisheit | Kreuzzüge | 3 | Gewöhnlich | – | – | – | – | 4486 | 54,7 % | 53,4 % | +3,3 |
| Tribut in Goldbyzantinern | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 3878 | 38,5 % | 48,9 % | −1,2 |
| Arzt des Bimaristan | Kreuzzüge | 3 | Selten | – | – | – | – | 4294 | 60,5 % | 55,5 % | +5,3 |
| Theodosianische Mauern | Kreuzzüge | 2 | Selten | – | – | – | – | 3978 | 61,2 % | 47,7 % | −2,5 |
| Hagia Sophia | Kreuzzüge | 3 | Episch | – | – | – | – | 4406 | 66,4 % | 47,7 % | −2,5 |
| Ibn an-Nafis, Arzt von Kairo | Kreuzzüge | 4 | Episch | – | – | – | – | 4318 | 56,0 % | 53,0 % | +2,9 |
| Krähenfüße | neutral | 1 | Gewöhnlich | – | – | – | – | 19878 | 58,6 % | 51,5 % | +1,5 |
| Abgefangene Botschaft | neutral | 2 | Selten | – | – | – | – | 28472 | 45,0 % | 46,9 % | −3,1 |
| Falsche Kundschafter von Kadesch | Frühzeit und Ägypten | 2 | Selten | – | – | – | – | 3768 | 45,7 % | 46,3 % | −3,1 |
| Botschaft des Sikinnos | Griechenland und Hellenismus | 1 | Gewöhnlich | – | – | – | – | 3630 | 57,6 % | 51,4 % | +0,7 |
| Wall am Kalkrieser Berg | Rom und Germanien | 3 | Selten | – | – | – | – | 5882 | 40,1 % | 48,8 % | −1,9 |
| Fallgatter | Mittelalter im Reich | 2 | Gewöhnlich | – | – | – | – | 6316 | 45,2 % | 46,7 % | −3,2 |
| Engpass von Myriokephalon | Kreuzzüge | 3 | Selten | – | – | – | – | 4404 | 43,6 % | 51,0 % | +0,8 |
| Gegenmine | Frühe Neuzeit | 3 | Selten | – | – | – | – | 4386 | 47,5 % | 46,4 % | −2,3 |
| Hinterhalt am Süntel | Widukind | 3 | Selten | – | – | – | – | 1498 | 41,0 % | 42,3 % | −6,4 |
| Rettung bei Gerunium | Fabius | 2 | Selten | – | – | – | – | 1314 | 54,5 % | 52,3 % | −0,4 |
| Täuschung bei Larissa | Anna | 1 | Selten | – | – | – | – | 940 | 53,9 % | 58,1 % | +6,8 |
| Kampf um den Leichnam | Leonidas | 2 | Selten | – | – | – | – | 1184 | 53,5 % | 52,3 % | −0,8 |
| Eiren der Agoge | Leonidas | 2 | Gewöhnlich | – | – | – | – | 1272 | 60,7 % | 60,8 % | +7,7 |
| Astrolab für Synesios | Hypatia | 1 | Gewöhnlich | – | – | – | – | 938 | 55,2 % | 50,2 % | +1,2 |
| Pilger im Asklepieion von Saqqara | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1356 | 61,7 % | 53,7 % | +2,6 |
| Eroberung von Zara | Dandolo | 3 | Selten | – | – | – | – | 1344 | 60,3 % | 50,1 % | −0,5 |
| Irminsul | Widukind | 3 | Selten | – | – | – | – | 1420 | 58,0 % | 44,0 % | −4,7 |
| Stater des Vercingetorix | Vercingetorix | 1 | Gewöhnlich | – | – | – | – | 862 | 55,2 % | 49,3 % | +1,4 |
| Manufaktur auf der Albrechtsburg | Böttger | 2 | Selten | – | – | – | – | 1298 | 63,8 % | 53,9 % | +4,2 |
| Volmar, Schreiber Hildegards | Hildegard | 3 | Selten | – | – | – | – | 1530 | 58,3 % | 53,5 % | +3,5 |
| Kloster Pegau | Wiprecht | 4 | Episch | – | – | – | – | 1406 | 39,2 % | 41,2 % | −7,8 |
| Gefährte der Artusfahrt | Ulrich | 4 | Selten | – | – | – | – | 1394 | 50,5 % | 50,6 % | +0,0 |
| Aspasia von Milet | Perikles | 3 | Selten | – | – | – | – | 1510 | 55,0 % | 54,0 % | +2,6 |
| Aqua Virgo | Agrippa | 2 | Gewöhnlich | – | – | – | – | 1292 | 58,9 % | 40,7 % | −7,6 |
| Stele von Karnak | Ahhotep | 3 | Selten | – | – | – | – | 1448 | 56,2 % | 50,7 % | +0,2 |
| Kloster Kecharitomene | Anna | 3 | Episch | – | – | – | – | 1404 | 46,9 % | 52,2 % | +1,0 |
| Gesänge des Dichterkönigs | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1324 | 58,7 % | 48,5 % | +0,3 |
| Heiratsurkunde der Theophanu | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1276 | 60,1 % | 54,1 % | +2,7 |
| Scheinlager bei Mantineia | Epaminondas | 2 | Selten | – | – | – | – | 1296 | 38,4 % | 48,1 % | −1,4 |
| Quintus Fabius, der Sohn | Fabius | 4 | Gewöhnlich | – | – | – | – | 1508 | 62,3 % | 56,4 % | +3,6 |
| Thumelicus | Thusnelda | 3 | Gewöhnlich | – | – | – | – | 1520 | 55,1 % | 57,5 % | +4,1 |
| Brief an die Besatzung von Krak | Baibars | 4 | Selten | – | – | – | – | 1462 | 53,8 % | 52,5 % | +3,7 |
| Neuf-Brisach | Vauban | 3 | Episch | – | – | – | – | 1530 | 67,8 % | 46,3 % | −1,7 |
| Goldener Halsring von Vix | Vix | 2 | Selten | – | – | – | – | 1356 | 50,0 % | 49,8 % | +2,9 |
| Koloss von Rhodos | neutral | 6 | Episch | – | – | – | – | 51900 | 47,5 % | 52,3 % | +2,3 |
| Zeus des Phidias | neutral | 4 | Episch | – | – | – | – | 31630 | 58,7 % | 46,8 % | −3,2 |
| Himmelsscheibe von Nebra | neutral | 2 | Selten | – | – | – | – | 28450 | 36,6 % | 49,0 % | −1,0 |
| Gänse des Kapitols | neutral | 1 | Gewöhnlich | – | – | – | – | 20144 | 57,7 % | 47,7 % | −2,3 |
| Skytale | neutral | 2 | Selten | – | – | – | – | 28644 | 44,3 % | 47,3 % | −2,7 |
| „Mit ihm oder auf ihm“ | Leonidas | 2 | Gewöhnlich | – | – | – | – | 1238 | 56,5 % | 53,8 % | +0,7 |
| Orestes, Präfekt von Ägypten | Hypatia | 4 | Selten | – | – | – | – | 1484 | 52,2 % | 50,3 % | +1,3 |
| Sockel der Djoser-Statue | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1352 | 49,1 % | 47,9 % | −3,1 |
| Quadriga von San Marco | Dandolo | 2 | Selten | – | – | – | – | 1294 | 59,5 % | 47,6 % | −3,0 |
| Taufe in Attigny | Widukind | 2 | Gewöhnlich | – | – | – | – | 1246 | 52,4 % | 49,0 % | +0,3 |
| Murus Gallicus | Vercingetorix | 2 | Episch | – | – | – | – | 1268 | 61,2 % | 42,5 % | −5,5 |
| Weiße Erde aus Aue | Böttger | 2 | Gewöhnlich | – | – | – | – | 1292 | 64,8 % | 53,3 % | +3,6 |
| Lingua ignota | Hildegard | 1 | Gewöhnlich | – | – | – | – | 864 | 54,9 % | 45,7 % | −4,3 |
| Pilgerfahrt nach Santiago | Wiprecht | 3 | Selten | – | – | – | – | 1462 | 41,9 % | 44,3 % | −4,7 |
| Turnier zu Friesach | Ulrich | 3 | Selten | – | – | – | – | 1442 | 45,6 % | 52,1 % | +1,5 |
| Bauabrechnung des Parthenon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1268 | 42,0 % | 45,7 % | −5,7 |
| Weltkarte des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1282 | 40,4 % | 43,0 % | −5,4 |
| Kamose | Ahhotep | 4 | Selten | – | – | – | – | 1518 | 57,8 % | 56,4 % | +5,8 |
| Irene Dukaina | Anna | 3 | Gewöhnlich | – | – | – | – | 1492 | 55,5 % | 56,2 % | +5,0 |
| Bäder von Tetzcotzinco | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1282 | 41,0 % | 47,1 % | −1,1 |
| Theophanius imperator augustus | Theophanu | 3 | Episch | – | – | – | – | 1514 | 55,0 % | 51,0 % | −0,4 |
| Mauern von Messene | Epaminondas | 3 | Selten | – | – | – | – | 1550 | 58,2 % | 44,4 % | −5,0 |
| Schatten auf den Höhen | Fabius | 2 | Gewöhnlich | – | – | – | – | 1298 | 56,7 % | 51,1 % | −1,6 |
| Stolz im Triumphzug | Thusnelda | 2 | Gewöhnlich | – | – | – | – | 1278 | 49,3 % | 51,7 % | −1,7 |
| Moschee des Baibars | Baibars | 3 | Selten | – | – | – | – | 1462 | 52,0 % | 46,4 % | −2,4 |
| Projet d’une dîme royale | Vauban | 3 | Gewöhnlich | – | – | – | – | 1468 | 53,3 % | 44,9 % | −3,2 |
| Krater von Vix | Vix | 3 | Selten | – | – | – | – | 1616 | 51,1 % | 45,0 % | −1,9 |
| Artemistempel von Ephesos | neutral | 2 | Selten | – | – | – | – | 28368 | 61,0 % | 47,4 % | −2,6 |
| Mausoleum von Halikarnassos | neutral | 3 | Episch | – | – | – | – | 32246 | 60,9 % | 53,2 % | +3,2 |
| Ischtar-Tor | neutral | 3 | Selten | – | – | – | – | 32340 | 64,8 % | 46,1 % | −3,9 |
| Stele des Hammurapi | neutral | 2 | Selten | – | – | – | – | 28422 | 46,1 % | 44,0 % | −6,0 |
| Feuerpost | neutral | 1 | Gewöhnlich | – | – | – | – | 20240 | 58,3 % | 49,5 % | −0,6 |
