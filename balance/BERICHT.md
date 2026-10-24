# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `aaee049b44` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die 21 anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,5.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 50600 | ✗ 21/22 | ✗ 200/231 | ✓ 47,3 % | – | 0 | 24 |
| Zufallsdecks | 50600 | ✓ 22/22 | ✗ 225/231 | ✓ 50,9 % | ✓ 53,0 % (+3,0) | 0 | 22 |

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
| Leonidas I. | **52,3 %** | 53,5 % | 50,6 % | Ulrich 47,5 % | Vauban 59,5 % | Defensiv: 31,7 % | ✓ |
| Fabius Maximus | **52,2 %** | 53,6 % | 50,4 % | Vix 44,5 % | Vauban 60,5 % | Defensiv: 32,8 % | ✓ |
| Fürstin von Vix | **51,9 %** | 53,0 % | 50,5 % | Wiprecht 45,5 % | Widukind 60,5 % | Kombinierend: 37,5 % | ✓ |
| Thusnelda | **51,6 %** | 50,8 % | 52,2 % | Nezahualcóyotl 46,0 % | Vauban 59,0 % | Kombinierend: 37,9 % | ✓ |
| Theophanu | **51,5 %** | 52,5 % | 50,2 % | Perikles 44,5 % | Vauban 60,5 % | Defensiv: 30,5 % | ✓ |
| Perikles | **51,5 %** | 51,8 % | 51,0 % | Anna 43,5 % | Baibars 62,0 % | Defensiv: 33,9 % | ✓ |
| Anna Komnene | **51,1 %** | 53,7 % | 48,2 % | Vix 41,5 % | Vauban 65,0 % | Kombinierend: 32,7 % | ✓ |
| Imhotep | **50,9 %** | 50,4 % | 51,2 % | Vix 47,0 % | Nezahualcóyotl 59,0 % | Defensiv: 32,1 % | ✓ |
| Ahhotep I. | **50,6 %** | 51,7 % | 49,4 % | Theophanu 41,5 % | Vercingetorix 58,0 % | Aggressiv: 40,0 % | ✓ |
| Enrico Dandolo | **50,5 %** | 51,9 % | 49,0 % | Ahhotep 44,5 % | Hypatia 60,5 % | Kombinierend: 33,5 % | ✓ |
| Ulrich von Liechtenstein | **50,1 %** | 51,6 % | 48,7 % | Ahhotep 43,5 % | Agrippa 60,0 % | Aggressiv: 44,4 % | ✓ |
| Hildegard von Bingen | **49,7 %** | 50,7 % | 48,8 % | Vix 40,5 % | Wiprecht 57,5 % | Aggressiv: 40,8 % | ✓ |
| Johann Friedrich Böttger | **49,5 %** | 51,3 % | 47,8 % | Perikles 43,0 % | Widukind 54,0 % | Kombinierend: 35,8 % | ✓ |
| Wiprecht von Groitzsch | **49,3 %** | 49,7 % | 49,1 % | Agrippa 42,0 % | Vercingetorix 57,5 % | Aggressiv: 38,2 % | ✓ |
| Epaminondas | **49,1 %** | 50,3 % | 48,1 % | Fabius 42,0 % | Anna 58,0 % | Aggressiv: 38,1 % | ✓ |
| Marcus Agrippa | **48,7 %** | 48,3 % | 49,4 % | Ulrich 40,0 % | Wiprecht 58,0 % | Kombinierend: 37,4 % | ✓ |
| Hypatia | **48,6 %** | 49,1 % | 48,4 % | Dandolo 39,5 % | Nezahualcóyotl 58,0 % | Kombinierend: 37,2 % | ✓ |
| Widukind | **48,6 %** | 48,3 % | 49,1 % | Vix 39,5 % | Epaminondas 55,5 % | Aggressiv: 39,0 % | ✓ |
| Vercingetorix | **48,5 %** | 49,7 % | 47,6 % | Ahhotep 42,0 % | Baibars 55,0 % | Aggressiv: 39,0 % | ✓ |
| Baibars | **48,2 %** | 50,0 % | 46,7 % | Perikles 38,0 % | Nezahualcóyotl 60,0 % | Aggressiv: 34,8 % | ✓ |
| Vauban | **47,8 %** | 48,1 % | 48,0 % | Anna 35,0 % | Hypatia 56,0 % | Defensiv: 32,9 % | ✓ |
| Nezahualcóyotl | **47,7 %** | 49,0 % | 46,7 % | Baibars 40,0 % | Widukind 56,5 % | Defensiv: 31,4 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Widu. | Verc. | Bött. | Hild. | Wipr. | Ulri. | Peri. | Agri. | Ahho. | Anna. | Neza. | Theo. | Epam. | Fabi. | Thus. | Baib. | Vaub. | Vix. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 54 | 50 | 51 | 52 | 57 | 51 | 54 | 54 | 48 | 49 | 48 | 48 | 52 | 56 | 54 | 53 | 52 | 53 | 57 | 60 | 48 |
| Hypatia | 46 | · | 43 | **40** | 53 | 54 | 54 | 49 | 53 | 47 | 47 | 51 | 50 | 42 | 58 | 53 | 51 | 48 | 44 | 51 | 44 | 48 |
| Imhotep | 50 | 57 | · | 49 | 48 | 56 | 49 | 48 | 52 | 50 | 51 | 50 | 52 | 54 | 59 | 52 | 51 | 48 | 48 | 51 | 49 | 47 |
| Dandolo | 49 | **61** | 51 | · | 52 | 47 | 53 | 46 | 51 | 49 | 54 | 56 | 45 | 47 | 53 | 49 | 54 | 48 | 50 | 50 | 55 | 45 |
| Widukind | 48 | 48 | 53 | 48 | · | 47 | 46 | 50 | 53 | 52 | 48 | 50 | 48 | 46 | 44 | 53 | 56 | 46 | 48 | 53 | 48 | **40** |
| Vercingetorix | 43 | 47 | 44 | 53 | 53 | · | 47 | 49 | 43 | 50 | 48 | 50 | 42 | 55 | 49 | 44 | 53 | 45 | 51 | 55 | 49 | 54 |
| Böttger | 50 | 46 | 51 | 48 | 54 | 53 | · | 54 | 49 | 50 | 43 | 48 | 50 | 51 | 53 | 46 | 52 | 47 | 45 | 54 | 49 | 53 |
| Hildegard | 46 | 51 | 52 | 54 | 50 | 52 | 46 | · | 57 | 54 | 49 | 45 | 47 | 54 | 50 | 45 | 53 | 51 | 48 | 54 | 48 | 41 |
| Wiprecht | 46 | 48 | 48 | 50 | 48 | 57 | 52 | 43 | · | 51 | 54 | 42 | 49 | 46 | 46 | 47 | 55 | 45 | 50 | 56 | 52 | 55 |
| Ulrich | 53 | 53 | 50 | 52 | 48 | 51 | 51 | 46 | 49 | · | 52 | 60 | 44 | 53 | 54 | 49 | 45 | 47 | 48 | 56 | 49 | 47 |
| Perikles | 51 | 53 | 49 | 47 | 53 | 53 | 57 | 51 | 47 | 48 | · | 57 | 52 | 44 | 54 | 56 | 50 | 48 | 51 | **62** | 53 | 50 |
| Agrippa | 52 | 49 | 50 | 44 | 50 | 50 | 52 | 55 | 58 | 40 | 43 | · | 52 | 42 | 46 | 49 | 45 | 49 | 45 | 50 | 54 | 50 |
| Ahhotep | 53 | 50 | 48 | 55 | 52 | 58 | 51 | 53 | 52 | 56 | 48 | 48 | · | 47 | 50 | 42 | 56 | 50 | 51 | 50 | 47 | 48 |
| Anna | 48 | 59 | 46 | 53 | 54 | 45 | 50 | 47 | 54 | 47 | 56 | 59 | 53 | · | 59 | 51 | 42 | 48 | 49 | 48 | **65** | 42 |
| Nezahualcóyotl | 44 | 42 | 41 | 47 | 56 | 52 | 47 | 51 | 54 | 46 | 47 | 54 | 50 | 42 | · | 42 | 51 | 48 | 54 | 40 | 54 | 42 |
| Theophanu | 47 | 47 | 49 | 52 | 47 | 56 | 54 | 55 | 53 | 51 | 44 | 51 | 59 | 49 | 59 | · | 49 | 52 | 49 | 49 | **61** | 51 |
| Epaminondas | 48 | 50 | 50 | 47 | 44 | 48 | 49 | 48 | 45 | 55 | 51 | 55 | 44 | 58 | 50 | 52 | · | 42 | 49 | 48 | 50 | 53 |
| Fabius | 49 | 52 | 52 | 53 | 54 | 55 | 53 | 50 | 55 | 53 | 53 | 51 | 50 | 53 | 53 | 48 | 58 | · | 50 | 51 | **61** | 45 |
| Thusnelda | 48 | 56 | 52 | 50 | 53 | 50 | 55 | 52 | 51 | 53 | 49 | 55 | 49 | 52 | 46 | 52 | 51 | 51 | · | 49 | 59 | 55 |
| Baibars | 43 | 49 | 50 | 50 | 47 | 45 | 47 | 46 | 44 | 44 | **38** | 50 | 51 | 52 | 60 | 51 | 53 | 49 | 52 | · | 48 | 47 |
| Vauban | 41 | 56 | 52 | 45 | 52 | 52 | 52 | 52 | 48 | 52 | 48 | 47 | 53 | **35** | 46 | **40** | 50 | **40** | 41 | 53 | · | 54 |
| Vix | 52 | 53 | 53 | 55 | **61** | 46 | 48 | 60 | 45 | 53 | 50 | 50 | 52 | 59 | 59 | 50 | 48 | 55 | 45 | 53 | 46 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 39,3 % aufs Gesicht, 21,7 % auf Bauwerke · **Defensiv** (7 Helden) 32,2 % aufs Gesicht, 23,5 % auf Bauwerke · **Kombinierend** (7 Helden) 36,0 % aufs Gesicht, 22,6 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 25,0, Median 22, 10–90 %: 15–39, kürzeste 8, längste 73. Beginner gewinnt 50,9 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Kataphrakt | Anna | 5 | 60,3 % | +9,4 | 53,5 % |
| Griechisches Feuer | Anna | 4 | 60,2 % | +9,3 | 54,4 % |
| Legionär der Zehnten | Agrippa | 2 | 57,9 % | +9,1 | 58,9 % |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 56,9 % | +9,0 | 62,2 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 60,1 % | +8,0 | 54,3 % |
| Warägergardist | Anna | 3 | 58,8 % | +7,8 | 57,8 % |
| Burgbesatzung | neutral | 8 | 57,3 % | +7,2 | 52,2 % |
| Gesandter aus Massalia | Vix | 5 | 58,7 % | +6,9 | 56,7 % |
| Murus Gallicus | Vercingetorix | 2 | 43,3 % | −5,3 | 61,0 % |
| Weltkarte des Agrippa | Agrippa | 2 | 43,4 % | −5,4 | 40,1 % |
| Hinterhalt am Süntel | Widukind | 3 | 43,2 % | −5,5 | 40,9 % |
| Bauabrechnung des Parthenon | Perikles | 2 | 45,4 % | −5,9 | 42,3 % |
| Stele des Hammurapi | neutral | 2 | 44,0 % | −6,0 | 46,0 % |
| Aqua Virgo | Agrippa | 2 | 42,1 % | −6,7 | 58,9 % |
| Zitadelle von Lille | Vauban | 4 | 40,6 % | −7,4 | 63,8 % |
| Kloster Pegau | Wiprecht | 4 | 41,5 % | −7,9 | 38,5 % |

**Legendäre** (AP 5.3) – als Gruppe 53,0 % „gewinnt, wenn gezogen“ (+3,0 gegenüber ihrem Helden, 62632 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Gorgo, Stimme Spartas | Leonidas | 7 | 60,1 % | +8,0 | 54,3 % |
| Gesandter aus Massalia | Vix | 5 | 58,7 % | +6,9 | 56,7 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 55,5 % | +4,1 | 58,6 % |
| Alexios I. Komnenos | Anna | 6 | 55,4 % | +4,4 | 54,0 % |
| Djoser, der Erbauer | Imhotep | 6 | 54,7 % | +3,9 | 54,3 % |
| Bund der Stämme | Thusnelda | 8 | 54,3 % | +2,8 | 49,7 % |
| Qalawun, Emir der Bahriya | Baibars | 6 | 53,9 % | +5,6 | 52,6 % |
| Otto II., Kaiser | Theophanu | 6 | 53,8 % | +2,5 | 60,1 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 53,8 % | +3,8 | 51,3 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 53,5 % | +3,1 | 50,4 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 52,9 % | +4,1 | 50,4 % |
| Judith von Böhmen | Wiprecht | 7 | 52,8 % | +3,4 | 52,3 % |
| Herodot, Vater der Geschichte | neutral | 4 | 52,6 % | +2,6 | 49,8 % |
| Abbi, Gefährte Widukinds | Widukind | 6 | 52,3 % | +3,6 | 51,6 % |
| Theon von Alexandria | Hypatia | 5 | 51,9 % | +3,2 | 56,0 % |
| Ludwig XIV., der Sonnenkönig | Vauban | 5 | 51,9 % | +3,9 | 54,7 % |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | 51,7 % | +2,5 | 50,7 % |
| Marcellus, Schwert Roms | Fabius | 6 | 51,3 % | −0,7 | 56,7 % |
| Jutta von Sponheim, Magistra | Hildegard | 7 | 49,8 % | −0,0 | 48,1 % |
| Zeremonialaxt des Ahmose | Ahhotep | 6 | 49,7 % | −0,9 | 54,4 % |
| Tschirnhaus, Naturforscher | Böttger | 5 | 49,4 % | −0,2 | 59,8 % |
| Commius, Führer des Entsatzheers | Vercingetorix | 8 | 49,1 % | +0,5 | 51,5 % |
| Friedrich der Streitbare | Ulrich | 6 | 48,5 % | −1,6 | 49,8 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 48,1 % | +0,2 | 52,0 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 4600 | 80,9 % | 53,9 % | +0,8 | 878 | 55,2 % | 52,2 % | +0,1 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 4600 | 82,4 % | 53,9 % | +0,8 | 1288 | 62,3 % | 55,9 % | +3,9 |
| Bronzener Wall | Leonidas | 2 | Basis | 4600 | 82,3 % | 54,4 % | +1,3 | 1210 | 57,9 % | 54,2 % | +2,1 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 4600 | 77,0 % | 55,5 % | +2,4 | 1506 | 54,1 % | 49,8 % | −2,3 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1398 | 64,7 % | 58,9 % | +6,8 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1518 | 62,2 % | 50,3 % | −1,8 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1818 | 61,3 % | 58,6 % | +6,6 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1430 | 52,7 % | 57,7 % | +5,6 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 2282 | 58,6 % | 51,6 % | −0,5 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 1886 | 54,3 % | 60,1 % | +8,0 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 4600 | 82,5 % | 51,5 % | −1,3 | 876 | 57,1 % | 47,7 % | −1,1 |
| Erdmessung des Eratosthenes | Hypatia | 2 | Basis | 4600 | 87,2 % | 53,1 % | +0,3 | 1226 | 63,4 % | 49,4 % | +0,7 |
| Sternenkundiger | Hypatia | 3 | Basis | 4600 | 81,8 % | 54,4 % | +1,7 | 1648 | 55,3 % | 50,0 % | +1,3 |
| Sternkatalog des Hipparchos | Hypatia | 4 | Basis | 4600 | 79,2 % | 56,7 % | +4,0 | 1426 | 55,5 % | 54,0 % | +5,3 |
| Synesios von Kyrene | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1540 | 62,9 % | 55,0 % | +6,2 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1344 | 39,0 % | 47,7 % | −1,1 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1748 | 54,5 % | 51,8 % | +3,0 |
| Brennspiegel des Archimedes | Hypatia | 6 | Selten | – | – | – | – | 2330 | 62,0 % | 46,3 % | −2,4 |
| Klaudios Ptolemaios | Hypatia | 5 | Episch | – | – | – | – | 1774 | 58,1 % | 47,8 % | −1,0 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1788 | 56,0 % | 51,9 % | +3,2 |
| Nilschülerin | Imhotep | 1 | Basis | 4600 | 82,8 % | 51,6 % | −0,2 | 930 | 55,5 % | 56,0 % | +5,2 |
| Heilender Balsam | Imhotep | 1 | Basis | 4600 | 83,8 % | 53,7 % | +1,9 | 842 | 63,4 % | 50,4 % | −0,4 |
| Pyramidenwächter | Imhotep | 3 | Basis | 4600 | 84,2 % | 53,1 % | +1,3 | 1432 | 60,6 % | 54,1 % | +3,2 |
| Tempelärztin | Imhotep | 4 | Basis | 4600 | 80,8 % | 52,5 % | +0,7 | 1436 | 55,4 % | 48,3 % | −2,5 |
| Brot und Bier | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1308 | 59,6 % | 54,4 % | +3,6 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1416 | 60,4 % | 51,8 % | +1,0 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1460 | 53,9 % | 51,7 % | +0,9 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1898 | 55,8 % | 53,9 % | +3,1 |
| Urteil nach der Maat | Imhotep | 5 | Episch | – | – | – | – | 1822 | 60,5 % | 50,5 % | −0,3 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 2300 | 54,3 % | 54,7 % | +3,9 |
| Lagunenbote | Dandolo | 1 | Basis | 4600 | 79,8 % | 54,7 % | +2,7 | 844 | 56,0 % | 56,5 % | +6,1 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 4600 | 79,0 % | 51,1 % | −0,9 | 1276 | 54,2 % | 50,3 % | −0,1 |
| Präziser Stich | Dandolo | 2 | Basis | 4600 | 84,8 % | 53,4 % | +1,5 | 1238 | 58,2 % | 50,3 % | −0,2 |
| Handelsgesandter | Dandolo | 4 | Basis | 4600 | 78,7 % | 55,1 % | +3,1 | 1424 | 57,7 % | 51,3 % | +0,8 |
| Dogenklinge | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1248 | 58,0 % | 53,6 % | +3,1 |
| Nachtwache am Kanal | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1390 | 57,9 % | 53,6 % | +3,2 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1272 | 52,2 % | 53,4 % | +3,0 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1762 | 57,8 % | 52,4 % | +2,0 |
| Arsenal von Venedig | Dandolo | 4 | Episch | – | – | – | – | 1302 | 46,9 % | 51,8 % | +1,3 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 2256 | 50,4 % | 53,5 % | +3,1 |
| Späher aus Engern | Widukind | 1 | Basis | 4600 | 75,6 % | 48,6 % | −0,9 | 898 | 53,2 % | 50,0 % | +1,3 |
| Speerwerfer aus Westfalen | Widukind | 2 | Basis | 4600 | 77,1 % | 48,6 % | −0,9 | 1266 | 59,7 % | 47,5 % | −1,2 |
| Pfeilschuss | Widukind | 2 | Basis | 4600 | 76,1 % | 47,2 % | −2,3 | 1356 | 56,6 % | 49,1 % | +0,3 |
| Reiter der Edelinge | Widukind | 4 | Basis | 4600 | 70,8 % | 54,2 % | +4,7 | 1394 | 53,4 % | 54,5 % | +5,8 |
| Falknerin | Widukind | 3 | Gewöhnlich | – | – | – | – | 1412 | 50,1 % | 51,0 % | +2,3 |
| Sachsenaufstand | Widukind | 3 | Gewöhnlich | – | – | – | – | 1334 | 49,1 % | 47,0 % | −1,8 |
| Schildträger aus Ostfalen | Widukind | 5 | Selten | – | – | – | – | 1630 | 52,6 % | 51,1 % | +2,3 |
| Sturm auf die Eresburg | Widukind | 6 | Selten | – | – | – | – | 2158 | 53,7 % | 53,3 % | +4,6 |
| Gefolgschaft Widukinds | Widukind | 6 | Episch | – | – | – | – | 2244 | 52,1 % | 48,1 % | −0,6 |
| Abbi, Gefährte Widukinds | Widukind | 6 | Legendär | – | – | – | – | 2134 | 51,6 % | 52,3 % | +3,6 |
| Hüterin des Hains | Vercingetorix | 1 | Basis | 4600 | 82,5 % | 47,0 % | −1,6 | 966 | 57,2 % | 50,0 % | +1,4 |
| Schild aus Eichenholz | Vercingetorix | 2 | Basis | 4600 | 75,3 % | 47,2 % | −1,4 | 1264 | 49,3 % | 46,7 % | −2,0 |
| Krieger der Arverner | Vercingetorix | 3 | Basis | 4600 | 85,4 % | 49,9 % | +1,3 | 1462 | 61,9 % | 52,9 % | +4,3 |
| Hieb mit dem Langschwert | Vercingetorix | 3 | Basis | 4600 | 84,7 % | 47,8 % | −0,8 | 1488 | 65,0 % | 45,5 % | −3,1 |
| Reiter der Arverner | Vercingetorix | 4 | Gewöhnlich | – | – | – | – | 1438 | 52,9 % | 48,2 % | −0,4 |
| Heilkundige mit der Mistel | Vercingetorix | 3 | Gewöhnlich | – | – | – | – | 1438 | 58,0 % | 47,9 % | −0,7 |
| Erhebung der Gallier | Vercingetorix | 3 | Selten | – | – | – | – | 1470 | 60,4 % | 48,8 % | +0,2 |
| Verteidiger von Gergovia | Vercingetorix | 6 | Selten | – | – | – | – | 2320 | 58,5 % | 49,6 % | +1,0 |
| Letzter Ritt vor Alesia | Vercingetorix | 5 | Episch | – | – | – | – | 1792 | 44,5 % | 46,9 % | −1,7 |
| Commius, Führer des Entsatzheers | Vercingetorix | 8 | Legendär | – | – | – | – | 1266 | 51,5 % | 49,1 % | +0,5 |
| Apothekerlehrling | Böttger | 1 | Basis | 4600 | 85,5 % | 53,6 % | +2,8 | 856 | 65,1 % | 54,8 % | +5,2 |
| Verpuffung im Laboratorium | Böttger | 2 | Basis | 4600 | 89,3 % | 53,6 % | +2,8 | 1298 | 70,5 % | 52,4 % | +2,8 |
| Bergmann aus Aue | Böttger | 3 | Basis | 4600 | 85,2 % | 51,9 % | +1,1 | 1504 | 54,5 % | 47,1 % | −2,5 |
| Rezept des Goldmachers | Böttger | 4 | Basis | 4600 | 66,8 % | 51,3 % | +0,5 | 1352 | 34,3 % | 47,1 % | −2,5 |
| Pestarzt | Böttger | 4 | Gewöhnlich | – | – | – | – | 1392 | 62,6 % | 53,4 % | +3,8 |
| Befehl des Kurfürsten | Böttger | 2 | Gewöhnlich | – | – | – | – | 1268 | 66,0 % | 55,9 % | +6,3 |
| Schreiber der Manufaktur | Böttger | 4 | Selten | – | – | – | – | 1408 | 63,9 % | 50,1 % | +0,5 |
| Glut des Brennofens | Böttger | 4 | Selten | – | – | – | – | 1424 | 48,9 % | 51,5 % | +1,9 |
| Wache auf dem Königstein | Böttger | 6 | Episch | – | – | – | – | 2316 | 67,2 % | 48,9 % | −0,7 |
| Tschirnhaus, Naturforscher | Böttger | 5 | Legendär | – | – | – | – | 1714 | 59,8 % | 49,4 % | −0,2 |
| Pförtnerin vom Rupertsberg | Hildegard | 1 | Basis | 4600 | 78,6 % | 49,6 % | −0,6 | 974 | 58,5 % | 55,5 % | +5,7 |
| Grünkraft | Hildegard | 2 | Basis | 4600 | 79,0 % | 50,2 % | −0,1 | 1292 | 54,8 % | 50,7 % | +0,9 |
| Klostervogt | Hildegard | 3 | Basis | 4600 | 78,8 % | 51,2 % | +1,0 | 1492 | 59,8 % | 53,6 % | +3,8 |
| Einkleidung der Novizinnen | Hildegard | 2 | Basis | 4600 | 77,2 % | 48,9 % | −1,4 | 1304 | 55,4 % | 53,1 % | +3,3 |
| Pilger am Rhein | Hildegard | 4 | Gewöhnlich | – | – | – | – | 1386 | 47,9 % | 48,9 % | −0,9 |
| Segen der Äbtissin | Hildegard | 2 | Gewöhnlich | – | – | – | – | 1306 | 49,8 % | 52,8 % | +3,1 |
| Vorsängerin im Chor | Hildegard | 5 | Selten | – | – | – | – | 1688 | 56,3 % | 51,0 % | +1,2 |
| Spiel der Tugenden | Hildegard | 6 | Selten | – | – | – | – | 2134 | 51,1 % | 51,8 % | +2,0 |
| Ritter mit dem Schutzbrief | Hildegard | 7 | Episch | – | – | – | – | 1946 | 47,4 % | 48,9 % | −0,9 |
| Jutta von Sponheim, Magistra | Hildegard | 7 | Legendär | – | – | – | – | 1890 | 48,1 % | 49,8 % | −0,0 |
| Siedler aus Franken | Wiprecht | 1 | Basis | 4600 | 77,2 % | 47,2 % | −2,2 | 944 | 55,0 % | 50,8 % | +1,4 |
| Fehde | Wiprecht | 2 | Basis | 4600 | 81,6 % | 48,7 % | −0,7 | 1310 | 65,1 % | 46,3 % | −3,1 |
| Burgmann von Groitzsch | Wiprecht | 3 | Basis | 4600 | 80,7 % | 50,6 % | +1,2 | 1454 | 62,0 % | 50,8 % | +1,4 |
| Lokator | Wiprecht | 4 | Basis | 4600 | 76,1 % | 51,4 % | +2,0 | 1396 | 56,1 % | 50,2 % | +0,8 |
| Verhau | Wiprecht | 3 | Gewöhnlich | – | – | – | – | 1394 | 62,3 % | 50,9 % | +1,5 |
| Panzerreiter | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1464 | 54,0 % | 49,9 % | +0,5 |
| Rodung | Wiprecht | 3 | Selten | – | – | – | – | 1480 | 58,0 % | 53,5 % | +4,2 |
| Grenzwächter der Mark | Wiprecht | 5 | Selten | – | – | – | – | 1758 | 54,9 % | 48,4 % | −1,0 |
| Heerfahrt nach Italien | Wiprecht | 5 | Episch | – | – | – | – | 1754 | 57,0 % | 49,8 % | +0,4 |
| Judith von Böhmen | Wiprecht | 7 | Legendär | – | – | – | – | 2048 | 52,3 % | 52,8 % | +3,4 |
| Edelknabe | Ulrich | 1 | Basis | 4600 | 80,8 % | 48,6 % | −0,3 | 914 | 54,7 % | 50,8 % | +0,7 |
| Lanzenstoß | Ulrich | 1 | Basis | 4600 | 83,9 % | 49,7 % | +0,8 | 882 | 58,5 % | 50,8 % | +0,7 |
| Fahrender Ritter | Ulrich | 3 | Basis | 4600 | 83,3 % | 49,6 % | +0,7 | 1476 | 52,4 % | 51,6 % | +1,5 |
| Minnebrief | Ulrich | 2 | Basis | 4600 | 74,2 % | 50,9 % | +2,1 | 1288 | 46,2 % | 48,7 % | −1,5 |
| Minneritter | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1552 | 56,7 % | 54,5 % | +4,4 |
| Mit eingelegter Lanze | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1414 | 41,4 % | 47,6 % | −2,5 |
| Kämpe im Buhurt | Ulrich | 4 | Selten | – | – | – | – | 1380 | 43,8 % | 49,4 % | −0,8 |
| Venusfahrt | Ulrich | 5 | Selten | – | – | – | – | 1756 | 44,9 % | 49,5 % | −0,6 |
| Landrichter der Steiermark | Ulrich | 6 | Episch | – | – | – | – | 2256 | 54,0 % | 51,1 % | +0,9 |
| Friedrich der Streitbare | Ulrich | 6 | Legendär | – | – | – | – | 2134 | 49,8 % | 48,5 % | −1,6 |
| Dorfwache | neutral | 1 | Basis | 101200 | 80,6 % | 49,2 % | −0,8 | 20116 | 57,6 % | 51,3 % | +1,3 |
| Wandernder Händler | neutral | 2 | Basis | 101200 | 81,0 % | 49,0 % | −1,1 | 28798 | 57,1 % | 50,5 % | +0,5 |
| Steinschleuderer | neutral | 2 | Basis | 101200 | 81,1 % | 49,7 % | −0,3 | 28292 | 57,5 % | 50,8 % | +0,8 |
| Wilderin | neutral | 3 | Basis | 101200 | 83,2 % | 49,7 % | −0,3 | 31900 | 59,1 % | 49,5 % | −0,5 |
| Torwache der Burg | neutral | 4 | Basis | 101200 | 76,8 % | 51,3 % | +1,3 | 31812 | 52,3 % | 50,7 % | +0,7 |
| Kavallerist | neutral | 4 | Basis | 101200 | 78,2 % | 51,3 % | +1,3 | 31760 | 52,8 % | 50,9 % | +0,9 |
| Feldheilerin | neutral | 3 | Basis | 101200 | 80,7 % | 49,6 % | −0,4 | 32020 | 56,1 % | 49,5 % | −0,5 |
| Archivarin | neutral | 4 | Basis | 101200 | 74,5 % | 52,6 % | +2,5 | 32260 | 51,6 % | 49,9 % | −0,1 |
| Wachhund | neutral | 2 | Basis | 101200 | 78,5 % | 48,9 % | −1,1 | 28304 | 54,8 % | 49,9 % | −0,1 |
| Veteran | neutral | 5 | Basis | 101200 | 79,2 % | 52,5 % | +2,5 | 40074 | 56,1 % | 49,4 % | −0,7 |
| Belagerungsturm | neutral | 6 | Basis | 101200 | 76,6 % | 55,2 % | +5,2 | 51482 | 57,4 % | 50,0 % | −0,0 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 32484 | 55,3 % | 50,1 % | +0,0 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 20186 | 56,5 % | 51,4 % | +1,4 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 40008 | 56,8 % | 52,8 % | +2,8 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 32474 | 54,6 % | 50,2 % | +0,2 |
| Nachtwächter | neutral | 2 | Basis | – | – | – | – | 28224 | 54,4 % | 50,9 % | +0,9 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 28458 | 48,8 % | 50,0 % | +0,0 |
| Heilkräuter | neutral | 1 | Basis | – | – | – | – | 20144 | 54,0 % | 48,5 % | −1,5 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 28600 | 62,1 % | 49,5 % | −0,5 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 45388 | 58,2 % | 53,6 % | +3,5 |
| Ordensritter | neutral | 3 | Gewöhnlich | – | – | – | – | 32256 | 58,0 % | 51,3 % | +1,3 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 31888 | 53,2 % | 49,8 % | −0,2 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 28286 | 57,9 % | 52,8 % | +2,8 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 32122 | 54,8 % | 52,4 % | +2,4 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 32186 | 60,0 % | 53,9 % | +3,9 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 28342 | 38,4 % | 47,2 % | −2,8 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 31580 | 54,0 % | 48,2 % | −1,8 |
| Prätorianer | neutral | 5 | Gewöhnlich | – | – | – | – | 40118 | 54,1 % | 50,2 % | +0,2 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 31656 | 57,9 % | 54,4 % | +4,4 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 31812 | 52,5 % | 53,5 % | +3,5 |
| Löwin der Arena | neutral | 5 | Selten | – | – | – | – | 39896 | 58,2 % | 52,3 % | +2,2 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 40186 | 54,9 % | 50,4 % | +0,4 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 32036 | 50,5 % | 50,4 % | +0,3 |
| Trojanisches Pferd | neutral | 6 | Selten | – | – | – | – | 51596 | 60,1 % | 50,8 % | +0,7 |
| Brander | neutral | 7 | Episch | – | – | – | – | 45186 | 53,5 % | 53,1 % | +3,1 |
| Mercators Atlas | neutral | 4 | Episch | – | – | – | – | 32268 | 36,4 % | 50,8 % | +0,8 |
| Burgbesatzung | neutral | 8 | Episch | – | – | – | – | 30922 | 52,2 % | 57,3 % | +7,2 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 45604 | 61,1 % | 51,6 % | +1,6 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 31750 | 49,8 % | 52,6 % | +2,6 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 30788 | 51,3 % | 53,8 % | +3,8 |
| Spitzel im Venezianerviertel | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1456 | 60,2 % | 54,7 % | +4,2 |
| Plünderer am Rhein | Widukind | 3 | Gewöhnlich | – | – | – | – | 1484 | 57,7 % | 48,2 % | −0,5 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1266 | 54,6 % | 55,3 % | +4,5 |
| Zwanzig Städte in Flammen | Vercingetorix | 3 | Selten | – | – | – | – | 1452 | 55,1 % | 47,9 % | −0,7 |
| Eid der Arkanisten | Böttger | 1 | Selten | – | – | – | – | 922 | 68,1 % | 56,0 % | +6,5 |
| Böhmischer Söldner | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1344 | 53,7 % | 45,7 % | −3,7 |
| Brandschatzung | Wiprecht | 1 | Gewöhnlich | – | – | – | – | 892 | 64,9 % | 44,6 % | −4,8 |
| Heimlicher Bote | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1280 | 53,1 % | 51,1 % | +1,0 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 28318 | 56,0 % | 49,1 % | −0,9 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 20046 | 58,6 % | 52,4 % | +2,4 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 28476 | 62,4 % | 56,1 % | +6,1 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 32750 | 55,4 % | 52,5 % | +2,5 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 32588 | 59,2 % | 50,8 % | +0,8 |
| Ruderer der Triere | Perikles | 1 | Basis | 4600 | 79,4 % | 50,4 % | +1,5 | 890 | 60,8 % | 55,3 % | +3,9 |
| Lange Mauern | Perikles | 2 | Basis | 4600 | 79,7 % | 45,6 % | −3,3 | 1226 | 58,2 % | 46,6 % | −4,8 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 4600 | 81,7 % | 52,4 % | +3,5 | 1408 | 62,8 % | 54,4 % | +3,0 |
| Strategos | Perikles | 3 | Basis | 4600 | 79,6 % | 51,7 % | +2,9 | 1538 | 62,4 % | 56,1 % | +4,8 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1382 | 50,4 % | 46,3 % | −5,1 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1248 | 63,6 % | 56,5 % | +5,1 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1450 | 62,1 % | 53,4 % | +2,0 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1474 | 44,2 % | 49,4 % | −1,9 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1386 | 42,4 % | 46,5 % | −4,9 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 2172 | 58,6 % | 55,5 % | +4,1 |
| Pilumwerfer | Agrippa | 1 | Basis | 4600 | 77,8 % | 52,6 % | +3,0 | 920 | 59,1 % | 54,0 % | +5,2 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 4600 | 78,3 % | 53,0 % | +3,4 | 1248 | 58,9 % | 57,9 % | +9,1 |
| Castra | Agrippa | 3 | Basis | 4600 | 82,1 % | 50,1 % | +0,5 | 1456 | 64,3 % | 49,6 % | +0,8 |
| Testudo | Agrippa | 2 | Basis | 4600 | 74,7 % | 50,5 % | +1,0 | 1270 | 56,5 % | 52,7 % | +3,8 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1358 | 53,8 % | 49,9 % | +1,1 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1458 | 58,0 % | 50,2 % | +1,3 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1830 | 57,7 % | 53,4 % | +4,5 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1258 | 60,1 % | 43,9 % | −4,9 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1402 | 48,2 % | 46,8 % | −2,0 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1748 | 50,4 % | 52,9 % | +4,1 |
| Bogenschütze aus Elkab | Ahhotep | 1 | Basis | 4600 | 82,5 % | 51,2 % | −0,1 | 924 | 62,4 % | 52,9 % | +2,4 |
| Krieger der Nilflotte | Ahhotep | 2 | Basis | 4600 | 81,1 % | 50,9 % | −0,4 | 1262 | 53,2 % | 52,3 % | +1,7 |
| Pfeilregen vor Auaris | Ahhotep | 2 | Basis | 4600 | 78,9 % | 52,4 % | +1,0 | 1286 | 50,4 % | 47,0 % | −3,6 |
| Speerträger aus Theben | Ahhotep | 3 | Basis | 4600 | 84,0 % | 52,0 % | +0,7 | 1406 | 59,7 % | 53,3 % | +2,8 |
| Priester der Selket | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1454 | 57,9 % | 51,5 % | +0,9 |
| Medjai-Kundschafter | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1442 | 60,3 % | 50,2 % | −0,4 |
| Erbeuteter Streitwagen | Ahhotep | 6 | Selten | – | – | – | – | 2308 | 60,9 % | 53,2 % | +2,6 |
| Überfall auf Nefrusi | Ahhotep | 3 | Selten | – | – | – | – | 1450 | 60,2 % | 48,8 % | −1,8 |
| Ahmose, Befreier Ägyptens | Ahhotep | 5 | Episch | – | – | – | – | 1806 | 60,6 % | 47,2 % | −3,3 |
| Zeremonialaxt des Ahmose | Ahhotep | 6 | Legendär | – | – | – | – | 2302 | 54,4 % | 49,7 % | −0,9 |
| Kopistin der Chronik | Anna | 1 | Basis | 4600 | 81,1 % | 53,5 % | +3,1 | 948 | 53,7 % | 57,8 % | +6,8 |
| Pantokrator-Spital | Anna | 3 | Basis | 4600 | 72,9 % | 51,5 % | +1,0 | 1398 | 38,8 % | 49,9 % | −1,1 |
| Warägergardist | Anna | 3 | Basis | 4600 | 82,6 % | 54,9 % | +4,5 | 1430 | 57,8 % | 58,8 % | +7,8 |
| Hofärztin | Anna | 3 | Basis | 4600 | 81,5 % | 50,5 % | +0,1 | 1434 | 45,3 % | 50,6 % | −0,4 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1450 | 54,4 % | 60,2 % | +9,3 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1394 | 54,2 % | 56,4 % | +5,5 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1628 | 53,5 % | 60,3 % | +9,4 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1444 | 45,1 % | 51,3 % | +0,3 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1808 | 53,1 % | 54,7 % | +3,8 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 2250 | 54,0 % | 55,4 % | +4,4 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 4600 | 82,7 % | 48,6 % | −0,0 | 852 | 62,2 % | 53,6 % | +5,7 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 4600 | 81,9 % | 48,8 % | +0,2 | 1282 | 60,5 % | 52,1 % | +4,2 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 4600 | 83,3 % | 49,3 % | +0,7 | 1278 | 63,6 % | 49,2 % | +1,4 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 4600 | 82,8 % | 47,8 % | −0,8 | 1544 | 61,8 % | 50,3 % | +2,5 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1224 | 59,0 % | 47,4 % | −0,5 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1300 | 59,0 % | 49,2 % | +1,4 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1450 | 59,4 % | 49,1 % | +1,3 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1584 | 57,0 % | 45,4 % | −2,5 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 2342 | 62,2 % | 56,9 % | +9,0 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 1784 | 52,0 % | 48,1 % | +0,2 |
| Lehnsmann | Theophanu | 1 | Basis | 4600 | 82,2 % | 45,1 % | −2,5 | 806 | 62,4 % | 54,2 % | +2,8 |
| Bogenschütze der Pfalz | Theophanu | 2 | Basis | 4600 | 82,6 % | 46,1 % | −1,5 | 1230 | 63,1 % | 55,6 % | +4,2 |
| Treueschwur | Theophanu | 1 | Basis | 4600 | 82,3 % | 49,1 % | +1,5 | 878 | 59,8 % | 54,7 % | +3,3 |
| Stiftsdame aus Quedlinburg | Theophanu | 2 | Basis | 4600 | 82,9 % | 45,9 % | −1,7 | 1308 | 65,1 % | 50,5 % | −0,9 |
| Späher an der Elbe | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1224 | 65,0 % | 55,1 % | +3,8 |
| Heerbann | Theophanu | 4 | Gewöhnlich | – | – | – | – | 1532 | 60,4 % | 53,8 % | +2,4 |
| St. Pantaleon in Köln | Theophanu | 2 | Selten | – | – | – | – | 1214 | 61,8 % | 52,6 % | +1,2 |
| Haft in Utrecht | Theophanu | 3 | Selten | – | – | – | – | 1548 | 62,1 % | 49,6 % | −1,8 |
| Willigis, Erzbischof von Mainz | Theophanu | 5 | Episch | – | – | – | – | 1852 | 64,1 % | 55,6 % | +4,2 |
| Otto II., Kaiser | Theophanu | 6 | Legendär | – | – | – | – | 2456 | 60,1 % | 53,8 % | +2,5 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1446 | 60,0 % | 55,9 % | +3,8 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1442 | 62,2 % | 49,9 % | −2,1 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1316 | 60,6 % | 49,5 % | +0,7 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1382 | 58,3 % | 51,1 % | +2,4 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1476 | 61,2 % | 51,8 % | +1,0 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1332 | 64,7 % | 46,5 % | −4,3 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1272 | 56,7 % | 51,8 % | +1,4 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 2248 | 52,0 % | 53,0 % | +2,5 |
| Heerlager an der Weser | Widukind | 3 | Gewöhnlich | – | – | – | – | 1426 | 42,8 % | 44,0 % | −4,8 |
| Versammlung in Marklo | Widukind | 4 | Selten | – | – | – | – | 1384 | 38,4 % | 46,3 % | −2,4 |
| Barde der Arverner | Vercingetorix | 2 | Gewöhnlich | – | – | – | – | 1312 | 57,5 % | 50,6 % | +2,0 |
| Gallische Reiterei | Vercingetorix | 5 | Selten | – | – | – | – | 1762 | 55,3 % | 50,1 % | +1,5 |
| Laborbuch | Böttger | 1 | Gewöhnlich | – | – | – | – | 842 | 63,3 % | 55,1 % | +5,5 |
| Weißes Gold | Böttger | 3 | Selten | – | – | – | – | 1580 | 16,8 % | 49,2 % | −0,4 |
| Adlige Stifterin | Hildegard | 1 | Gewöhnlich | – | – | – | – | 958 | 54,9 % | 53,0 % | +3,2 |
| Weihe der Klosterkirche | Hildegard | 4 | Selten | – | – | – | – | 1514 | 40,0 % | 50,5 % | +0,7 |
| Feldmesser | Wiprecht | 2 | Gewöhnlich | – | – | – | – | 1328 | 56,9 % | 50,2 % | +0,8 |
| Beuterecht | Wiprecht | 1 | Selten | – | – | – | – | 936 | 59,6 % | 49,0 % | −0,4 |
| Ritter aus Murau | Ulrich | 4 | Selten | – | – | – | – | 1380 | 50,4 % | 48,7 % | −1,5 |
| Frische Lanze | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1300 | 56,0 % | 46,8 % | −3,3 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1260 | 52,9 % | 52,3 % | +1,0 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1418 | 41,7 % | 47,9 % | −3,5 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1438 | 54,9 % | 46,5 % | −2,4 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1434 | 44,2 % | 47,9 % | −0,9 |
| Pfeilmacher aus Edfu | Ahhotep | 2 | Gewöhnlich | – | – | – | – | 1324 | 62,0 % | 52,7 % | +2,1 |
| Gift der Hornviper | Ahhotep | 3 | Selten | – | – | – | – | 1408 | 50,5 % | 51,9 % | +1,4 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1364 | 56,5 % | 54,9 % | +3,9 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 2294 | 61,8 % | 57,1 % | +6,1 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1220 | 60,1 % | 49,0 % | +1,1 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1302 | 61,8 % | 44,6 % | −3,3 |
| Kanzler der Kaiserin | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1250 | 63,4 % | 53,1 % | +1,7 |
| Siegel der Kaiserin | Theophanu | 2 | Selten | – | – | – | – | 1168 | 56,8 % | 51,2 % | −0,1 |
| Olympionike | Griechenland und Hellenismus | 4 | Gewöhnlich | – | – | – | – | 5808 | 57,3 % | 55,2 % | +4,8 |
| Rhapsode | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 5098 | 55,9 % | 54,0 % | +3,7 |
| Marathonläufer | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 4896 | 55,3 % | 54,3 % | +4,0 |
| Orakel von Delphi | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 5770 | 38,4 % | 50,9 % | +0,5 |
| Leuchtturm von Pharos | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 5870 | 55,7 % | 46,2 % | −4,2 |
| Akropolis | Griechenland und Hellenismus | 2 | Selten | – | – | – | – | 5044 | 59,4 % | 50,4 % | −0,0 |
| Bibliothek von Alexandria | Griechenland und Hellenismus | 3 | Episch | – | – | – | – | 5912 | 53,2 % | 50,2 % | −0,2 |
| Knappe | Mittelalter im Reich | 1 | Gewöhnlich | – | – | – | – | 4492 | 56,8 % | 52,1 % | +2,2 |
| Armbrustschütze | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 7406 | 62,4 % | 53,6 % | +3,6 |
| Mönch von Cluny | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 7378 | 54,2 % | 52,7 % | +2,8 |
| Hansekogge | Mittelalter im Reich | 4 | Gewöhnlich | – | – | – | – | 7068 | 51,6 % | 48,9 % | −1,1 |
| Turnierritter | Mittelalter im Reich | 4 | Selten | – | – | – | – | 7206 | 54,6 % | 52,8 % | +2,9 |
| Burgfried | Mittelalter im Reich | 2 | Selten | – | – | – | – | 6534 | 64,2 % | 45,1 % | −4,9 |
| Tribok | Mittelalter im Reich | 4 | Episch | – | – | – | – | 6962 | 38,6 % | 49,0 % | −0,9 |
| Landsknecht | Frühe Neuzeit | 1 | Gewöhnlich | – | – | – | – | 2616 | 62,2 % | 51,3 % | +2,8 |
| Buchdrucker aus Mainz | Frühe Neuzeit | 3 | Gewöhnlich | – | – | – | – | 4480 | 59,2 % | 52,6 % | +4,1 |
| Leipziger Kaffeehaus | Frühe Neuzeit | 2 | Gewöhnlich | – | – | – | – | 3978 | 55,3 % | 48,0 % | −0,6 |
| Kartaunen-Salve | Frühe Neuzeit | 3 | Selten | – | – | – | – | 4500 | 63,9 % | 48,5 % | −0,0 |
| Kriegsgaleone | Frühe Neuzeit | 5 | Selten | – | – | – | – | 5362 | 62,5 % | 50,2 % | +1,7 |
| Stehendes Heer | Frühe Neuzeit | 5 | Episch | – | – | – | – | 5362 | 63,0 % | 49,2 % | +0,7 |
| Sternschanze | Frühe Neuzeit | 2 | Episch | – | – | – | – | 3944 | 67,1 % | 44,0 % | −4,6 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 32466 | 40,4 % | 46,2 % | −3,8 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 28408 | 60,8 % | 46,8 % | −3,2 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 31658 | 35,4 % | 46,5 % | −3,5 |
| Thebanischer Plänkler | Epaminondas | 1 | Basis | 4600 | 78,2 % | 47,5 % | −0,3 | 940 | 54,5 % | 52,6 % | +3,4 |
| Böotischer Hoplit | Epaminondas | 2 | Basis | 4600 | 78,8 % | 47,9 % | +0,1 | 1330 | 57,4 % | 55,2 % | +6,0 |
| Fünfzig Schilde tief | Epaminondas | 2 | Basis | 4600 | 74,5 % | 47,7 % | −0,0 | 1338 | 52,2 % | 50,5 % | +1,3 |
| Böotarch | Epaminondas | 3 | Basis | 4600 | 78,1 % | 47,4 % | −0,3 | 1506 | 53,3 % | 55,2 % | +6,0 |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | Gewöhnlich | – | – | – | – | 1870 | 54,8 % | 53,6 % | +4,4 |
| Schlacht bei Leuktra | Epaminondas | 4 | Gewöhnlich | – | – | – | – | 1578 | 51,1 % | 49,8 % | +0,6 |
| Befreiung Messeniens | Epaminondas | 5 | Selten | – | – | – | – | 1750 | 54,0 % | 50,6 % | +1,4 |
| Thebanischer Phalangit | Epaminondas | 4 | Selten | – | – | – | – | 1418 | 47,7 % | 52,4 % | +3,2 |
| Megalopolis | Epaminondas | 3 | Episch | – | – | – | – | 1448 | 47,7 % | 44,6 % | −4,6 |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | Legendär | – | – | – | – | 2294 | 50,7 % | 51,7 % | +2,5 |
| Veles | Fabius | 1 | Basis | 4600 | 88,2 % | 48,4 % | +0,0 | 874 | 64,3 % | 54,4 % | +2,5 |
| Triarier | Fabius | 2 | Basis | 4600 | 86,5 % | 48,6 % | +0,3 | 1272 | 61,0 % | 56,1 % | +4,1 |
| Hinhalten | Fabius | 2 | Basis | 4600 | 85,4 % | 48,3 % | −0,1 | 1354 | 65,6 % | 52,9 % | +0,9 |
| Konsul der Republik | Fabius | 4 | Basis | 4600 | 84,5 % | 49,1 % | +0,7 | 1376 | 56,9 % | 53,9 % | +1,9 |
| Verbrannte Erde | Fabius | 3 | Gewöhnlich | – | – | – | – | 1386 | 66,9 % | 51,1 % | −0,9 |
| Späher am Volturnus | Fabius | 2 | Gewöhnlich | – | – | – | – | 1348 | 59,6 % | 53,0 % | +1,1 |
| Minucius, der Reiteroberst | Fabius | 4 | Selten | – | – | – | – | 1452 | 62,3 % | 55,1 % | +3,2 |
| Rückeroberung von Tarent | Fabius | 6 | Selten | – | – | – | – | 2204 | 56,1 % | 56,5 % | +4,6 |
| Lager auf den Höhen | Fabius | 3 | Episch | – | – | – | – | 1488 | 67,6 % | 51,0 % | −1,0 |
| Marcellus, Schwert Roms | Fabius | 6 | Legendär | – | – | – | – | 2306 | 56,7 % | 51,3 % | −0,7 |
| Botin der Cherusker | Thusnelda | 1 | Basis | 4600 | 77,5 % | 52,5 % | +2,8 | 920 | 55,1 % | 56,9 % | +5,4 |
| Hüterin des Herdfeuers | Thusnelda | 2 | Basis | 4600 | 79,0 % | 50,5 % | +0,8 | 1354 | 53,8 % | 52,2 % | +0,7 |
| Ruf zum Thing | Thusnelda | 3 | Basis | 4600 | 72,8 % | 48,2 % | −1,5 | 1442 | 51,0 % | 50,4 % | −1,1 |
| Krieger im Keil | Thusnelda | 3 | Basis | 4600 | 80,4 % | 51,8 % | +2,0 | 1446 | 58,7 % | 55,2 % | +3,7 |
| Varusschlacht | Thusnelda | 5 | Gewöhnlich | – | – | – | – | 1824 | 51,3 % | 49,4 % | −2,0 |
| Krieger der Sippe | Thusnelda | 3 | Gewöhnlich | – | – | – | – | 1490 | 55,4 % | 53,2 % | +1,8 |
| Heiliger Hain | Thusnelda | 2 | Selten | – | – | – | – | 1398 | 63,1 % | 50,0 % | −1,5 |
| Seitenwechsel | Thusnelda | 5 | Selten | – | – | – | – | 1810 | 51,0 % | 50,3 % | −1,2 |
| Arminius, Fürst der Cherusker | Thusnelda | 4 | Episch | – | – | – | – | 1426 | 48,6 % | 50,4 % | −1,0 |
| Bund der Stämme | Thusnelda | 8 | Legendär | – | – | – | – | 1452 | 49,7 % | 54,3 % | +2,8 |
| Mamlukenrekrut | Baibars | 1 | Basis | 4600 | 83,0 % | 49,5 % | −1,5 | 950 | 57,2 % | 48,0 % | −0,3 |
| Barid-Kurier | Baibars | 2 | Basis | 4600 | 79,3 % | 52,0 % | +1,0 | 1314 | 51,5 % | 50,6 % | +2,2 |
| Ain Dschalut | Baibars | 3 | Basis | 4600 | 85,0 % | 52,0 % | +1,1 | 1486 | 61,3 % | 49,6 % | +1,3 |
| Bogenreiter der Bahriya | Baibars | 3 | Basis | 4600 | 83,2 % | 50,0 % | −1,0 | 1482 | 55,1 % | 49,0 % | +0,7 |
| Manjaniq-Meister | Baibars | 4 | Gewöhnlich | – | – | – | – | 1498 | 56,5 % | 48,7 % | +0,3 |
| Vorgetäuschte Flucht | Baibars | 1 | Gewöhnlich | – | – | – | – | 852 | 24,3 % | 45,7 % | −2,6 |
| Qutuz, Sultan von Ägypten | Baibars | 5 | Selten | – | – | – | – | 1866 | 51,5 % | 52,1 % | +3,8 |
| Sturm auf Antiochia | Baibars | 2 | Selten | – | – | – | – | 1348 | 52,4 % | 46,8 % | −1,5 |
| Zitadelle von Kairo | Baibars | 4 | Episch | – | – | – | – | 1472 | 45,3 % | 44,3 % | −4,1 |
| Qalawun, Emir der Bahriya | Baibars | 6 | Legendär | – | – | – | – | 2478 | 52,6 % | 53,9 % | +5,6 |
| Schanzarbeiter | Vauban | 2 | Basis | 4600 | 76,4 % | 47,8 % | −1,2 | 1364 | 47,4 % | 48,9 % | +0,9 |
| Grenadier | Vauban | 2 | Basis | 4600 | 83,9 % | 49,9 % | +0,9 | 1348 | 67,7 % | 50,8 % | +2,8 |
| Salve von der Bastion | Vauban | 2 | Basis | 4600 | 78,1 % | 47,8 % | −1,2 | 1348 | 48,2 % | 49,1 % | +1,1 |
| Ingenieur des Königs | Vauban | 3 | Basis | 4600 | 83,9 % | 50,8 % | +1,7 | 1406 | 68,5 % | 51,9 % | +3,9 |
| Festungsgeschütz | Vauban | 3 | Gewöhnlich | – | – | – | – | 1536 | 62,9 % | 48,3 % | +0,2 |
| Faschinen | Vauban | 2 | Gewöhnlich | – | – | – | – | 1312 | 59,8 % | 50,7 % | +2,7 |
| Minengang | Vauban | 3 | Selten | – | – | – | – | 1498 | 59,6 % | 47,8 % | −0,3 |
| Zitadelle von Lille | Vauban | 4 | Selten | – | – | – | – | 1480 | 63,8 % | 40,6 % | −7,4 |
| Louvois, Kriegsminister | Vauban | 6 | Episch | – | – | – | – | 2326 | 64,9 % | 45,5 % | −2,5 |
| Ludwig XIV., der Sonnenkönig | Vauban | 5 | Legendär | – | – | – | – | 1804 | 54,7 % | 51,9 % | +3,9 |
| Speerwerfer vom Mont Lassois | Vix | 1 | Basis | 4600 | 83,5 % | 53,4 % | +2,6 | 900 | 59,8 % | 52,5 % | +0,7 |
| Prunkdolch | Vix | 2 | Basis | 4600 | 76,7 % | 53,6 % | +2,9 | 1248 | 51,0 % | 53,0 % | +1,3 |
| Reiter an der Seine | Vix | 3 | Basis | 4600 | 82,9 % | 52,7 % | +1,9 | 1498 | 51,5 % | 52,1 % | +0,4 |
| Seherin | Vix | 3 | Basis | 4600 | 81,6 % | 52,7 % | +2,0 | 1432 | 48,3 % | 51,7 % | −0,1 |
| Aufgebot des Fürstensitzes | Vix | 4 | Gewöhnlich | – | – | – | – | 1482 | 52,7 % | 51,7 % | −0,1 |
| Trankopfer | Vix | 1 | Gewöhnlich | – | – | – | – | 852 | 54,5 % | 50,7 % | −1,0 |
| Gelage am Krater | Vix | 1 | Selten | – | – | – | – | 944 | 61,5 % | 54,1 % | +2,4 |
| Schleuderer am Wall | Vix | 4 | Selten | – | – | – | – | 1548 | 56,9 % | 56,0 % | +4,3 |
| Halle auf dem Mont Lassois | Vix | 1 | Episch | – | – | – | – | 910 | 60,4 % | 50,7 % | −1,1 |
| Gesandter aus Massalia | Vix | 5 | Legendär | – | – | – | – | 1994 | 56,7 % | 58,7 % | +6,9 |
| Gladiator | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 5896 | 62,6 % | 53,4 % | +3,1 |
| Senator der Kurie | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 5712 | 55,5 % | 52,4 % | +2,1 |
| Centurio | Rom und Germanien | 2 | Gewöhnlich | – | – | – | – | 5212 | 59,7 % | 53,2 % | +2,9 |
| Triumphzug | Rom und Germanien | 3 | Selten | – | – | – | – | 5744 | 51,5 % | 50,3 % | +0,0 |
| Via Appia | Rom und Germanien | 2 | Selten | – | – | – | – | 5296 | 59,6 % | 48,0 % | −2,3 |
| Vestalin am ewigen Feuer | Rom und Germanien | 3 | Selten | – | – | – | – | 6002 | 60,2 % | 50,6 % | +0,3 |
| Pax Romana | Rom und Germanien | 5 | Episch | – | – | – | – | 7094 | 57,4 % | 46,9 % | −3,3 |
| Wagenbauer | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 3818 | 55,2 % | 53,1 % | +2,0 |
| Schreiber im Lebenshaus | Frühzeit und Ägypten | 3 | Gewöhnlich | – | – | – | – | 4316 | 56,8 % | 52,6 % | +1,5 |
| Schuss vom Streitwagen | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 3764 | 65,1 % | 53,5 % | +2,4 |
| Wache der Medjai | Frühzeit und Ägypten | 4 | Selten | – | – | – | – | 4296 | 52,0 % | 51,4 % | +0,3 |
| Angriff der Streitwagen | Frühzeit und Ägypten | 3 | Selten | – | – | – | – | 4468 | 59,2 % | 52,9 % | +1,8 |
| Bernsteinstraße | Frühzeit und Ägypten | 2 | Selten | – | – | – | – | 3794 | 58,3 % | 47,6 % | −3,5 |
| Festung Buhen | Frühzeit und Ägypten | 3 | Episch | – | – | – | – | 4376 | 53,2 % | 53,7 % | +2,6 |
| Akrit der Grenzmark | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 3978 | 58,1 % | 53,1 % | +3,2 |
| Gelehrter im Haus der Weisheit | Kreuzzüge | 3 | Gewöhnlich | – | – | – | – | 4486 | 54,9 % | 53,0 % | +3,2 |
| Tribut in Goldbyzantinern | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 3878 | 38,5 % | 48,8 % | −1,1 |
| Arzt des Bimaristan | Kreuzzüge | 3 | Selten | – | – | – | – | 4294 | 60,6 % | 55,0 % | +5,1 |
| Theodosianische Mauern | Kreuzzüge | 2 | Selten | – | – | – | – | 3978 | 61,6 % | 47,6 % | −2,4 |
| Hagia Sophia | Kreuzzüge | 3 | Episch | – | – | – | – | 4406 | 66,4 % | 48,0 % | −1,9 |
| Ibn an-Nafis, Arzt von Kairo | Kreuzzüge | 4 | Episch | – | – | – | – | 4318 | 55,9 % | 53,0 % | +3,1 |
| Krähenfüße | neutral | 1 | Gewöhnlich | – | – | – | – | 19800 | 58,5 % | 51,7 % | +1,7 |
| Abgefangene Botschaft | neutral | 2 | Selten | – | – | – | – | 28498 | 44,9 % | 46,7 % | −3,3 |
| Falsche Kundschafter von Kadesch | Frühzeit und Ägypten | 2 | Selten | – | – | – | – | 3774 | 45,9 % | 48,7 % | −2,3 |
| Botschaft des Sikinnos | Griechenland und Hellenismus | 1 | Gewöhnlich | – | – | – | – | 3630 | 57,9 % | 51,4 % | +1,0 |
| Wall am Kalkrieser Berg | Rom und Germanien | 3 | Selten | – | – | – | – | 5884 | 39,9 % | 48,8 % | −1,5 |
| Fallgatter | Mittelalter im Reich | 2 | Gewöhnlich | – | – | – | – | 6316 | 45,2 % | 46,9 % | −3,0 |
| Engpass von Myriokephalon | Kreuzzüge | 3 | Selten | – | – | – | – | 4404 | 43,9 % | 50,8 % | +0,9 |
| Gegenmine | Frühe Neuzeit | 3 | Selten | – | – | – | – | 4386 | 47,0 % | 46,1 % | −2,5 |
| Hinterhalt am Süntel | Widukind | 3 | Selten | – | – | – | – | 1498 | 40,9 % | 43,2 % | −5,5 |
| Rettung bei Gerunium | Fabius | 2 | Selten | – | – | – | – | 1314 | 54,9 % | 51,6 % | −0,4 |
| Täuschung bei Larissa | Anna | 1 | Selten | – | – | – | – | 940 | 53,8 % | 57,0 % | +6,0 |
| Kampf um den Leichnam | Leonidas | 2 | Selten | – | – | – | – | 1184 | 53,2 % | 51,8 % | −0,3 |
| Eiren der Agoge | Leonidas | 2 | Gewöhnlich | – | – | – | – | 1272 | 60,5 % | 58,9 % | +6,8 |
| Astrolab für Synesios | Hypatia | 1 | Gewöhnlich | – | – | – | – | 938 | 55,7 % | 49,4 % | +0,7 |
| Pilger im Asklepieion von Saqqara | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1356 | 61,4 % | 53,0 % | +2,2 |
| Eroberung von Zara | Dandolo | 3 | Selten | – | – | – | – | 1344 | 59,7 % | 49,6 % | −0,9 |
| Irminsul | Widukind | 3 | Selten | – | – | – | – | 1420 | 58,1 % | 43,6 % | −5,1 |
| Stater des Vercingetorix | Vercingetorix | 1 | Gewöhnlich | – | – | – | – | 862 | 54,6 % | 49,6 % | +1,0 |
| Manufaktur auf der Albrechtsburg | Böttger | 2 | Selten | – | – | – | – | 1298 | 63,3 % | 54,2 % | +4,6 |
| Volmar, Schreiber Hildegards | Hildegard | 3 | Selten | – | – | – | – | 1530 | 58,2 % | 53,6 % | +3,8 |
| Kloster Pegau | Wiprecht | 4 | Episch | – | – | – | – | 1406 | 38,5 % | 41,5 % | −7,9 |
| Gefährte der Artusfahrt | Ulrich | 4 | Selten | – | – | – | – | 1394 | 50,9 % | 49,6 % | −0,5 |
| Aspasia von Milet | Perikles | 3 | Selten | – | – | – | – | 1510 | 55,4 % | 53,7 % | +2,4 |
| Aqua Virgo | Agrippa | 2 | Gewöhnlich | – | – | – | – | 1292 | 58,9 % | 42,1 % | −6,7 |
| Stele von Karnak | Ahhotep | 3 | Selten | – | – | – | – | 1448 | 56,6 % | 51,6 % | +1,1 |
| Kloster Kecharitomene | Anna | 3 | Episch | – | – | – | – | 1404 | 45,8 % | 52,5 % | +1,5 |
| Gesänge des Dichterkönigs | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1324 | 58,5 % | 47,4 % | −0,4 |
| Heiratsurkunde der Theophanu | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1276 | 59,7 % | 54,9 % | +3,5 |
| Scheinlager bei Mantineia | Epaminondas | 2 | Selten | – | – | – | – | 1296 | 38,4 % | 47,4 % | −1,8 |
| Quintus Fabius, der Sohn | Fabius | 4 | Gewöhnlich | – | – | – | – | 1508 | 61,5 % | 54,4 % | +2,4 |
| Thumelicus | Thusnelda | 3 | Gewöhnlich | – | – | – | – | 1510 | 49,7 % | 52,2 % | +0,7 |
| Brief an die Besatzung von Krak | Baibars | 4 | Selten | – | – | – | – | 1462 | 53,2 % | 52,3 % | +4,0 |
| Neuf-Brisach | Vauban | 3 | Episch | – | – | – | – | 1530 | 67,8 % | 46,4 % | −1,6 |
| Goldener Halsring von Vix | Vix | 2 | Selten | – | – | – | – | 1270 | 46,9 % | 53,9 % | +2,1 |
| Koloss von Rhodos | neutral | 6 | Episch | – | – | – | – | 51954 | 47,3 % | 52,4 % | +2,3 |
| Zeus des Phidias | neutral | 4 | Episch | – | – | – | – | 31706 | 58,7 % | 46,9 % | −3,2 |
| Himmelsscheibe von Nebra | neutral | 2 | Selten | – | – | – | – | 28466 | 36,3 % | 49,2 % | −0,8 |
| Gänse des Kapitols | neutral | 1 | Gewöhnlich | – | – | – | – | 20166 | 57,7 % | 47,5 % | −2,5 |
| Skytale | neutral | 2 | Selten | – | – | – | – | 28652 | 44,3 % | 47,3 % | −2,7 |
| „Mit ihm oder auf ihm“ | Leonidas | 2 | Gewöhnlich | – | – | – | – | 1238 | 56,2 % | 52,7 % | +0,6 |
| Orestes, Präfekt von Ägypten | Hypatia | 4 | Selten | – | – | – | – | 1484 | 52,1 % | 49,9 % | +1,1 |
| Sockel der Djoser-Statue | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1352 | 49,6 % | 47,2 % | −3,6 |
| Quadriga von San Marco | Dandolo | 2 | Selten | – | – | – | – | 1294 | 59,7 % | 47,3 % | −3,2 |
| Taufe in Attigny | Widukind | 2 | Gewöhnlich | – | – | – | – | 1246 | 52,3 % | 49,0 % | +0,3 |
| Murus Gallicus | Vercingetorix | 2 | Episch | – | – | – | – | 1268 | 61,0 % | 43,3 % | −5,3 |
| Weiße Erde aus Aue | Böttger | 2 | Gewöhnlich | – | – | – | – | 1292 | 64,6 % | 54,0 % | +4,4 |
| Lingua ignota | Hildegard | 1 | Gewöhnlich | – | – | – | – | 864 | 54,3 % | 46,4 % | −3,3 |
| Pilgerfahrt nach Santiago | Wiprecht | 3 | Selten | – | – | – | – | 1462 | 41,7 % | 45,3 % | −4,1 |
| Turnier zu Friesach | Ulrich | 3 | Selten | – | – | – | – | 1442 | 45,2 % | 52,0 % | +1,9 |
| Bauabrechnung des Parthenon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1268 | 42,3 % | 45,4 % | −5,9 |
| Weltkarte des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1282 | 40,1 % | 43,4 % | −5,4 |
| Kamose | Ahhotep | 4 | Selten | – | – | – | – | 1518 | 57,8 % | 56,4 % | +5,9 |
| Irene Dukaina | Anna | 3 | Gewöhnlich | – | – | – | – | 1492 | 55,4 % | 56,1 % | +5,2 |
| Bäder von Tetzcotzinco | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1282 | 41,1 % | 46,5 % | −1,3 |
| Theophanius imperator augustus | Theophanu | 3 | Episch | – | – | – | – | 1514 | 55,2 % | 52,2 % | +0,8 |
| Mauern von Messene | Epaminondas | 3 | Selten | – | – | – | – | 1550 | 58,3 % | 44,9 % | −4,3 |
| Schatten auf den Höhen | Fabius | 2 | Gewöhnlich | – | – | – | – | 1298 | 56,8 % | 49,5 % | −2,4 |
| Stolz im Triumphzug | Thusnelda | 2 | Gewöhnlich | – | – | – | – | 1278 | 49,9 % | 51,3 % | −0,1 |
| Moschee des Baibars | Baibars | 3 | Selten | – | – | – | – | 1462 | 51,6 % | 46,0 % | −2,3 |
| Projet d’une dîme royale | Vauban | 3 | Gewöhnlich | – | – | – | – | 1468 | 53,5 % | 44,2 % | −3,9 |
| Krater von Vix | Vix | 2 | Selten | – | – | – | – | 1320 | 60,6 % | 54,2 % | +2,4 |
| Artemistempel von Ephesos | neutral | 2 | Selten | – | – | – | – | 28362 | 60,7 % | 47,6 % | −2,4 |
| Mausoleum von Halikarnassos | neutral | 3 | Episch | – | – | – | – | 32250 | 60,9 % | 53,2 % | +3,2 |
| Ischtar-Tor | neutral | 3 | Selten | – | – | – | – | 32362 | 64,6 % | 45,9 % | −4,1 |
| Stele des Hammurapi | neutral | 2 | Selten | – | – | – | – | 28400 | 46,0 % | 44,0 % | −6,0 |
| Feuerpost | neutral | 1 | Gewöhnlich | – | – | – | – | 20232 | 58,0 % | 49,5 % | −0,5 |
