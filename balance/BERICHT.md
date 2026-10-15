# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `95e577ad9f` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die 21 anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,5.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 50600 | ✗ 21/22 | ✗ 198/231 | ✓ 47,3 % | – | 0 | 24 |
| Zufallsdecks | 50600 | ✗ 21/22 | ✗ 223/231 | ✓ 51,2 % | ✓ 53,1 % (+3,1) | 0 | 21 |

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
| Wiprecht von Groitzsch | **52,8 %** | 53,9 % | 51,2 % | Imhotep 48,0 % | Dandolo 62,5 % | Aggressiv: 47,9 % | ✓ |
| Imhotep | **52,4 %** | 51,6 % | 52,8 % | Vix 47,0 % | Nezahualcóyotl 60,0 % | Defensiv: 39,8 % | ✓ |
| Ahhotep I. | **52,0 %** | 52,2 % | 51,5 % | Theophanu 47,0 % | Leonidas 60,0 % | Aggressiv: 49,8 % | ✓ |
| Epaminondas | **51,5 %** | 52,2 % | 50,5 % | Perikles 42,0 % | Nezahualcóyotl 61,0 % | Aggressiv: 47,0 % | ✓ |
| Fürstin von Vix | **51,5 %** | 53,0 % | 49,7 % | Epaminondas 43,5 % | Dandolo 61,0 % | Kombinierend: 45,0 % | ✓ |
| Marcus Agrippa | **51,1 %** | 49,4 % | 52,7 % | Imhotep 44,0 % | Nezahualcóyotl 59,0 % | Kombinierend: 47,0 % | ✓ |
| Theophanu | **51,1 %** | 52,9 % | 49,0 % | Agrippa 44,5 % | Nezahualcóyotl 61,0 % | Defensiv: 39,7 % | ✓ |
| Vercingetorix | **51,0 %** | 50,9 % | 50,9 % | Wiprecht 43,0 % | Böttger 58,5 % | Aggressiv: 49,4 % | ✓ |
| Ulrich von Liechtenstein | **51,0 %** | 51,6 % | 50,2 % | Vauban 39,0 % | Baibars 60,5 % | Aggressiv: 53,7 % | ✓ |
| Fabius Maximus | **50,3 %** | 52,3 % | 48,2 % | Vix 44,5 % | Leonidas 58,0 % | Defensiv: 41,3 % | ✓ |
| Perikles | **50,3 %** | 52,8 % | 47,7 % | Ahhotep 43,0 % | Epaminondas 58,0 % | Defensiv: 41,3 % | ✓ |
| Baibars | **50,2 %** | 51,3 % | 49,1 % | Ulrich 39,5 % | Vercingetorix 56,0 % | Aggressiv: 42,6 % | ✓ |
| Hypatia | **50,2 %** | 51,8 % | 48,5 % | Epaminondas 43,0 % | Vauban 59,5 % | Kombinierend: 45,4 % | ✓ |
| Leonidas I. | **50,1 %** | 50,8 % | 49,3 % | Ahhotep 40,0 % | Widukind 59,5 % | Defensiv: 38,2 % | ✓ |
| Johann Friedrich Böttger | **49,8 %** | 52,4 % | 47,2 % | Ahhotep 41,5 % | Hildegard 57,5 % | Kombinierend: 44,0 % | ✓ |
| Anna Komnene | **49,3 %** | 52,3 % | 46,5 % | Theophanu 45,0 % | Vauban 60,5 % | Kombinierend: 41,0 % | ✓ |
| Thusnelda | **48,4 %** | 48,7 % | 48,4 % | Vix 41,5 % | Böttger 54,0 % | Kombinierend: 45,6 % | ✓ |
| Hildegard von Bingen | **48,3 %** | 51,4 % | 45,6 % | Ulrich 42,5 % | Vauban 53,5 % | Aggressiv: 51,0 % | ✓ |
| Enrico Dandolo | **48,0 %** | 49,7 % | 46,7 % | Wiprecht 37,5 % | Nezahualcóyotl 55,0 % | Kombinierend: 42,1 % | ✓ |
| Vauban | **47,9 %** | 49,4 % | 46,8 % | Anna 39,5 % | Ulrich 61,0 % | Defensiv: 42,6 % | ✓ |
| Widukind | **47,3 %** | 48,1 % | 46,9 % | Wiprecht 40,0 % | Hildegard 56,0 % | Aggressiv: 48,8 % | ✓ |
| Nezahualcóyotl | **45,6 %** | 47,9 % | 44,0 % | Theophanu 39,0 % | Widukind 56,0 % | Defensiv: 38,4 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Widu. | Verc. | Bött. | Hild. | Wipr. | Ulri. | Peri. | Agri. | Ahho. | Anna. | Neza. | Theo. | Epam. | Fabi. | Thus. | Baib. | Vaub. | Vix. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 48 | 45 | 53 | 60 | 53 | 47 | 49 | 49 | 54 | 54 | 56 | 40 | 51 | 57 | 46 | 47 | 42 | 56 | 50 | 56 | 42 |
| Hypatia | 52 | · | 46 | 49 | 54 | 47 | 45 | 53 | 52 | 50 | 50 | 46 | 47 | 52 | 55 | 50 | 43 | 53 | 51 | 52 | 60 | 52 |
| Imhotep | 55 | 54 | · | 52 | 52 | 51 | 50 | 53 | 52 | 49 | 51 | 56 | 53 | 52 | 60 | 54 | 53 | 53 | 56 | 49 | 53 | 47 |
| Dandolo | 48 | 52 | 49 | · | 54 | 44 | 51 | 48 | **38** | 51 | 50 | 48 | 44 | 49 | 55 | 48 | **40** | 50 | 53 | 50 | 53 | **39** |
| Widukind | 41 | 47 | 48 | 46 | · | 49 | 53 | 56 | 40 | 53 | 51 | 45 | 47 | 50 | 44 | 47 | 50 | 46 | 49 | 46 | 42 | 45 |
| Vercingetorix | 48 | 53 | 50 | 56 | 51 | · | 59 | 57 | 43 | 49 | 50 | 55 | 47 | 54 | 49 | 51 | 54 | 50 | 53 | 44 | 53 | 48 |
| Böttger | 53 | 55 | 51 | 49 | 47 | 42 | · | 57 | 49 | 51 | 45 | 49 | 42 | 52 | 57 | 51 | 44 | 54 | 46 | 49 | 56 | 49 |
| Hildegard | 51 | 48 | 48 | 52 | 44 | 43 | 43 | · | 52 | 43 | 51 | 44 | 52 | 45 | 51 | 53 | 43 | 52 | 48 | 52 | 54 | 52 |
| Wiprecht | 51 | 49 | 48 | **63** | 60 | 57 | 51 | 49 | · | 55 | 51 | 51 | 50 | 49 | 58 | 51 | 56 | 50 | 51 | 55 | 52 | 54 |
| Ulrich | 46 | 51 | 52 | 50 | 48 | 52 | 49 | 57 | 45 | · | 51 | 47 | 50 | 55 | 56 | 51 | 52 | 54 | 53 | **61** | **39** | 55 |
| Perikles | 46 | 50 | 50 | 51 | 49 | 50 | 55 | 50 | 49 | 49 | · | 49 | 43 | 55 | 55 | 47 | 58 | 44 | 50 | 56 | 48 | 55 |
| Agrippa | 44 | 54 | 44 | 52 | 55 | 45 | 51 | 56 | 50 | 53 | 52 | · | 52 | 52 | 59 | 56 | 51 | 50 | 50 | 46 | 54 | 49 |
| Ahhotep | 60 | 53 | 48 | 56 | 53 | 53 | 59 | 48 | 50 | 50 | 57 | 48 | · | 54 | 48 | 47 | 57 | 50 | 51 | 49 | 51 | 52 |
| Anna | 49 | 48 | 48 | 51 | 50 | 46 | 48 | 55 | 51 | 45 | 45 | 48 | 46 | · | 58 | 45 | 46 | 53 | 49 | 49 | **61** | 46 |
| Nezahualcóyotl | 43 | 45 | 40 | 45 | 56 | 51 | 43 | 49 | 42 | 44 | 45 | 41 | 52 | 42 | · | **39** | **39** | 46 | 49 | 48 | 55 | 45 |
| Theophanu | 54 | 51 | 46 | 53 | 53 | 50 | 50 | 47 | 49 | 49 | 53 | 44 | 53 | 55 | **61** | · | 51 | 49 | 57 | 51 | 51 | 48 |
| Epaminondas | 53 | 57 | 47 | **61** | 50 | 46 | 56 | 57 | 44 | 48 | 42 | 49 | 43 | 54 | **61** | 50 | · | 45 | 59 | 50 | 53 | 56 |
| Fabius | 58 | 47 | 47 | 50 | 54 | 50 | 46 | 48 | 50 | 47 | 56 | 50 | 50 | 48 | 54 | 52 | 55 | · | 52 | 46 | 52 | 45 |
| Thusnelda | 44 | 49 | 44 | 48 | 51 | 48 | 54 | 52 | 49 | 47 | 50 | 50 | 50 | 51 | 51 | 43 | 42 | 48 | · | 54 | 54 | 42 |
| Baibars | 51 | 49 | 52 | 51 | 54 | 56 | 52 | 49 | 45 | **40** | 44 | 54 | 51 | 52 | 53 | 49 | 51 | 54 | 47 | · | 51 | 55 |
| Vauban | 44 | 41 | 48 | 48 | 59 | 48 | 44 | 47 | 48 | **61** | 52 | 46 | 49 | **40** | 45 | 50 | 47 | 48 | 47 | 49 | · | 49 |
| Vix | 59 | 49 | 53 | **61** | 55 | 53 | 51 | 49 | 46 | 45 | 45 | 52 | 48 | 54 | 55 | 52 | 44 | 55 | 59 | 45 | 52 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 48,8 % aufs Gesicht, 8,1 % auf Bauwerke · **Defensiv** (7 Helden) 40,2 % aufs Gesicht, 10,1 % auf Bauwerke · **Kombinierend** (7 Helden) 44,3 % aufs Gesicht, 9,3 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 22,1, Median 21, 10–90 %: 15–31, kürzeste 8, längste 70. Beginner gewinnt 51,2 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Griechisches Feuer | Anna | 4 | 63,1 % | +13,7 | 48,3 % |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 57,6 % | +11,6 | 55,5 % |
| Phalanxveteran | Leonidas | 5 | 61,2 % | +11,2 | 55,3 % |
| Burgbesatzung | neutral | 8 | 58,8 % | +8,7 | 45,5 % |
| Warägergardist | Anna | 3 | 57,8 % | +8,4 | 55,7 % |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | 59,6 % | +8,2 | 48,5 % |
| Synesios von Kyrene | Hypatia | 3 | 58,4 % | +8,2 | 56,6 % |
| Chronist am Kaiserhof | Anna | 6 | 57,6 % | +8,2 | 56,0 % |
| Pyramiden von Gizeh | neutral | 4 | 43,9 % | −6,1 | 29,3 % |
| Odeion | Perikles | 4 | 44,0 % | −6,2 | 39,6 % |
| Heerlager an der Weser | Widukind | 3 | 41,3 % | −6,2 | 42,6 % |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | 39,1 % | −6,8 | 52,0 % |
| Vorgetäuschte Flucht | Baibars | 1 | 43,1 % | −7,1 | 18,1 % |
| Letzter Ritt vor Alesia | Vercingetorix | 5 | 43,2 % | −7,7 | 33,7 % |
| Burgfried | Mittelalter im Reich | 2 | 42,3 % | −7,8 | 56,9 % |
| Zitadelle von Lille | Vauban | 4 | 38,4 % | −9,7 | 55,4 % |

**Legendäre** (AP 5.3) – als Gruppe 53,1 % „gewinnt, wenn gezogen“ (+3,1 gegenüber ihrem Helden, 62135 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Judith von Böhmen | Wiprecht | 7 | 59,2 % | +6,7 | 46,2 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 57,5 % | +7,4 | 50,8 % |
| Qalawun, Emir der Bahriya | Baibars | 6 | 56,5 % | +6,3 | 46,8 % |
| Gesandter aus Massalia | Vix | 6 | 56,1 % | +4,8 | 49,1 % |
| Djoser, der Erbauer | Imhotep | 6 | 55,4 % | +3,2 | 50,6 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 55,0 % | +5,0 | 44,5 % |
| Ludwig XIV., der Sonnenkönig | Vauban | 5 | 54,0 % | +5,9 | 43,4 % |
| Friedrich der Streitbare | Ulrich | 6 | 53,3 % | +2,4 | 45,0 % |
| Zeremonialaxt des Ahmose | Ahhotep | 6 | 53,1 % | +1,2 | 47,5 % |
| Theon von Alexandria | Hypatia | 5 | 52,9 % | +2,7 | 50,2 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 52,4 % | +2,2 | 53,1 % |
| Herodot, Vater der Geschichte | neutral | 4 | 52,4 % | +2,4 | 43,8 % |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | 52,4 % | +1,0 | 44,2 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 51,9 % | +3,7 | 46,4 % |
| Commius, Führer des Entsatzheers | Vercingetorix | 8 | 51,1 % | +0,2 | 44,6 % |
| Otto II., Kaiser | Theophanu | 6 | 51,1 % | +0,2 | 52,2 % |
| Bund der Stämme | Thusnelda | 8 | 50,9 % | +2,4 | 43,0 % |
| Tschirnhaus, Naturforscher | Böttger | 5 | 50,6 % | +0,8 | 55,2 % |
| Alexios I. Komnenos | Anna | 6 | 49,8 % | +0,4 | 48,4 % |
| Abbi, Gefährte Widukinds | Widukind | 6 | 49,7 % | +2,2 | 45,2 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 49,7 % | −1,4 | 45,2 % |
| Marcellus, Schwert Roms | Fabius | 6 | 48,6 % | −1,7 | 47,7 % |
| Jutta von Sponheim, Magistra | Hildegard | 7 | 48,5 % | −0,0 | 43,4 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 43,0 % | −2,9 | 47,2 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 4600 | 81,0 % | 54,1 % | +0,7 | 1086 | 56,4 % | 50,7 % | +0,6 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 4600 | 82,3 % | 54,2 % | +0,8 | 1570 | 57,3 % | 52,9 % | +2,8 |
| Bronzener Wall | Leonidas | 2 | Basis | 4600 | 82,5 % | 54,7 % | +1,3 | 1466 | 53,1 % | 50,3 % | +0,3 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 4600 | 77,2 % | 55,7 % | +2,3 | 1626 | 50,3 % | 49,2 % | −0,8 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1668 | 59,1 % | 53,0 % | +2,9 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1678 | 57,6 % | 51,2 % | +1,1 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1928 | 55,3 % | 61,2 % | +11,2 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1574 | 45,4 % | 51,2 % | +1,2 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 2448 | 54,1 % | 46,8 % | −3,3 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 2060 | 50,8 % | 57,5 % | +7,4 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 4600 | 82,5 % | 51,3 % | −1,3 | 1058 | 55,5 % | 47,9 % | −2,2 |
| Erdmessung des Eratosthenes | Hypatia | 2 | Basis | 4600 | 87,2 % | 52,8 % | +0,3 | 1530 | 59,0 % | 51,5 % | +1,4 |
| Sternenkundiger | Hypatia | 3 | Basis | 4600 | 82,1 % | 54,4 % | +1,8 | 1856 | 52,1 % | 52,8 % | +2,6 |
| Sternkatalog des Hipparchos | Hypatia | 4 | Basis | 4600 | 79,3 % | 56,4 % | +3,8 | 1562 | 47,2 % | 57,6 % | +7,4 |
| Synesios von Kyrene | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1698 | 56,6 % | 58,4 % | +8,2 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1554 | 30,2 % | 48,5 % | −1,6 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1874 | 49,6 % | 53,3 % | +3,2 |
| Brennspiegel des Archimedes | Hypatia | 6 | Selten | – | – | – | – | 2536 | 56,6 % | 48,4 % | −1,7 |
| Klaudios Ptolemaios | Hypatia | 5 | Episch | – | – | – | – | 1908 | 54,5 % | 49,1 % | −1,1 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1970 | 50,2 % | 52,9 % | +2,7 |
| Nilschülerin | Imhotep | 1 | Basis | 4600 | 82,9 % | 51,6 % | −0,3 | 1110 | 53,0 % | 53,2 % | +1,0 |
| Heilender Balsam | Imhotep | 1 | Basis | 4600 | 83,7 % | 53,8 % | +2,0 | 1018 | 58,4 % | 53,1 % | +0,9 |
| Pyramidenwächter | Imhotep | 3 | Basis | 4600 | 84,2 % | 53,2 % | +1,3 | 1654 | 56,3 % | 55,5 % | +3,3 |
| Tempelärztin | Imhotep | 4 | Basis | 4600 | 80,7 % | 52,5 % | +0,6 | 1638 | 52,6 % | 52,8 % | +0,6 |
| Brot und Bier | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1452 | 53,7 % | 55,8 % | +3,6 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1674 | 57,0 % | 58,6 % | +6,4 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1666 | 49,3 % | 51,9 % | −0,3 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1996 | 54,9 % | 58,0 % | +5,8 |
| Urteil nach der Maat | Imhotep | 5 | Episch | – | – | – | – | 1946 | 56,8 % | 50,8 % | −1,4 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 2530 | 50,6 % | 55,4 % | +3,2 |
| Lagunenbote | Dandolo | 1 | Basis | 4600 | 80,3 % | 52,5 % | +2,7 | 1054 | 52,7 % | 49,4 % | +1,2 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 4600 | 79,7 % | 48,9 % | −0,9 | 1518 | 51,0 % | 45,7 % | −2,5 |
| Präziser Stich | Dandolo | 2 | Basis | 4600 | 85,1 % | 51,3 % | +1,5 | 1564 | 56,2 % | 50,3 % | +2,1 |
| Handelsgesandter | Dandolo | 4 | Basis | 4600 | 79,2 % | 53,3 % | +3,5 | 1546 | 50,8 % | 50,1 % | +1,9 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1610 | 44,7 % | 49,5 % | +1,3 |
| Nachtwache am Kanal | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1586 | 52,9 % | 49,3 % | +1,2 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1554 | 48,0 % | 49,6 % | +1,4 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1834 | 51,7 % | 51,8 % | +3,6 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1858 | 36,5 % | 49,3 % | +1,1 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 2380 | 46,4 % | 51,9 % | +3,7 |
| Späher aus Engern | Widukind | 1 | Basis | 4600 | 75,4 % | 49,1 % | −1,1 | 1130 | 50,9 % | 45,6 % | −1,9 |
| Speerwerfer aus Westfalen | Widukind | 2 | Basis | 4600 | 77,0 % | 49,3 % | −0,9 | 1602 | 52,7 % | 50,8 % | +3,3 |
| Pfeilschuss | Widukind | 2 | Basis | 4600 | 76,1 % | 47,8 % | −2,4 | 1604 | 56,7 % | 47,0 % | −0,5 |
| Reiter der Edelinge | Widukind | 4 | Basis | 4600 | 70,7 % | 54,8 % | +4,7 | 1518 | 48,7 % | 53,3 % | +5,8 |
| Falknerin | Widukind | 3 | Gewöhnlich | – | – | – | – | 1652 | 44,3 % | 49,0 % | +1,5 |
| Sachsenaufstand | Widukind | 3 | Gewöhnlich | – | – | – | – | 1618 | 48,0 % | 47,4 % | −0,1 |
| Schildträger aus Ostfalen | Widukind | 5 | Selten | – | – | – | – | 1780 | 48,3 % | 49,6 % | +2,1 |
| Sturm auf die Eresburg | Widukind | 6 | Selten | – | – | – | – | 2294 | 50,0 % | 49,1 % | +1,6 |
| Gefolgschaft Widukinds | Widukind | 6 | Episch | – | – | – | – | 2366 | 46,2 % | 44,1 % | −3,4 |
| Abbi, Gefährte Widukinds | Widukind | 6 | Legendär | – | – | – | – | 2262 | 45,2 % | 49,7 % | +2,2 |
| Hüterin des Hains | Vercingetorix | 1 | Basis | 4600 | 82,4 % | 47,2 % | −1,6 | 1186 | 52,0 % | 53,5 % | +2,6 |
| Schild aus Eichenholz | Vercingetorix | 2 | Basis | 4600 | 75,3 % | 47,5 % | −1,4 | 1576 | 43,1 % | 48,2 % | −2,7 |
| Krieger der Arverner | Vercingetorix | 3 | Basis | 4600 | 85,4 % | 50,1 % | +1,3 | 1608 | 56,3 % | 55,1 % | +4,2 |
| Hieb mit dem Langschwert | Vercingetorix | 3 | Basis | 4600 | 84,8 % | 48,0 % | −0,8 | 1638 | 59,2 % | 50,3 % | −0,6 |
| Reiter der Arverner | Vercingetorix | 4 | Gewöhnlich | – | – | – | – | 1524 | 48,3 % | 51,5 % | +0,6 |
| Heilkundige mit der Mistel | Vercingetorix | 3 | Gewöhnlich | – | – | – | – | 1648 | 52,9 % | 50,2 % | −0,8 |
| Erhebung der Gallier | Vercingetorix | 3 | Selten | – | – | – | – | 1648 | 53,6 % | 52,0 % | +1,1 |
| Verteidiger von Gergovia | Vercingetorix | 6 | Selten | – | – | – | – | 2468 | 52,6 % | 50,7 % | −0,2 |
| Letzter Ritt vor Alesia | Vercingetorix | 5 | Episch | – | – | – | – | 1878 | 33,7 % | 43,2 % | −7,7 |
| Commius, Führer des Entsatzheers | Vercingetorix | 8 | Legendär | – | – | – | – | 1404 | 44,6 % | 51,1 % | +0,2 |
| Apothekerlehrling | Böttger | 1 | Basis | 4600 | 85,5 % | 53,8 % | +2,8 | 1100 | 60,1 % | 51,3 % | +1,5 |
| Verpuffung im Laboratorium | Böttger | 2 | Basis | 4600 | 89,3 % | 53,9 % | +2,9 | 1564 | 66,2 % | 53,8 % | +4,0 |
| Bergmann aus Aue | Böttger | 3 | Basis | 4600 | 85,4 % | 52,1 % | +1,0 | 1716 | 53,0 % | 47,7 % | −2,1 |
| Rezept des Goldmachers | Böttger | 4 | Basis | 4600 | 67,0 % | 51,5 % | +0,4 | 1504 | 27,7 % | 46,1 % | −3,7 |
| Pestarzt | Böttger | 4 | Gewöhnlich | – | – | – | – | 1582 | 60,2 % | 57,4 % | +7,7 |
| Befehl des Kurfürsten | Böttger | 2 | Gewöhnlich | – | – | – | – | 1626 | 59,9 % | 56,7 % | +6,9 |
| Schreiber der Manufaktur | Böttger | 5 | Selten | – | – | – | – | 1770 | 53,0 % | 49,0 % | −0,8 |
| Glut des Brennofens | Böttger | 5 | Selten | – | – | – | – | 1752 | 44,3 % | 54,2 % | +4,4 |
| Wache auf dem Königstein | Böttger | 6 | Episch | – | – | – | – | 2404 | 60,7 % | 52,8 % | +3,1 |
| Tschirnhaus, Naturforscher | Böttger | 5 | Legendär | – | – | – | – | 1850 | 55,2 % | 50,6 % | +0,8 |
| Pförtnerin vom Rupertsberg | Hildegard | 1 | Basis | 4600 | 78,7 % | 49,9 % | −0,6 | 1196 | 57,6 % | 54,1 % | +5,6 |
| Grünkraft | Hildegard | 2 | Basis | 4600 | 79,0 % | 50,5 % | −0,1 | 1556 | 48,7 % | 49,7 % | +1,2 |
| Klostervogt | Hildegard | 3 | Basis | 4600 | 78,8 % | 51,4 % | +0,9 | 1710 | 55,9 % | 53,3 % | +4,8 |
| Einkleidung der Novizinnen | Hildegard | 2 | Basis | 4600 | 77,1 % | 49,1 % | −1,4 | 1534 | 54,0 % | 53,8 % | +5,3 |
| Pilger am Rhein | Hildegard | 4 | Gewöhnlich | – | – | – | – | 1548 | 39,5 % | 47,6 % | −0,9 |
| Segen der Äbtissin | Hildegard | 2 | Gewöhnlich | – | – | – | – | 1520 | 46,8 % | 47,5 % | −0,9 |
| Vorsängerin im Chor | Hildegard | 5 | Selten | – | – | – | – | 1824 | 48,5 % | 48,3 % | −0,2 |
| Spiel der Tugenden | Hildegard | 6 | Selten | – | – | – | – | 2276 | 43,0 % | 48,3 % | −0,2 |
| Ritter mit dem Schutzbrief | Hildegard | 7 | Episch | – | – | – | – | 2108 | 41,0 % | 47,5 % | −1,0 |
| Jutta von Sponheim, Magistra | Hildegard | 7 | Legendär | – | – | – | – | 2004 | 43,4 % | 48,5 % | −0,0 |
| Siedler aus Franken | Wiprecht | 1 | Basis | 4600 | 77,3 % | 47,3 % | −2,3 | 1150 | 50,5 % | 54,5 % | +1,9 |
| Fehde | Wiprecht | 2 | Basis | 4600 | 81,6 % | 48,8 % | −0,8 | 1558 | 60,2 % | 52,7 % | +0,1 |
| Burgmann von Groitzsch | Wiprecht | 3 | Basis | 4600 | 80,7 % | 50,8 % | +1,2 | 1662 | 54,5 % | 57,3 % | +4,8 |
| Lokator | Wiprecht | 4 | Basis | 4600 | 76,2 % | 51,5 % | +1,9 | 1568 | 50,3 % | 50,6 % | −2,0 |
| Verhau | Wiprecht | 3 | Gewöhnlich | – | – | – | – | 1706 | 57,9 % | 51,7 % | −0,9 |
| Panzerreiter | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1554 | 47,0 % | 53,0 % | +0,5 |
| Rodung | Wiprecht | 3 | Selten | – | – | – | – | 1590 | 52,4 % | 56,4 % | +3,8 |
| Grenzwächter der Mark | Wiprecht | 5 | Selten | – | – | – | – | 1908 | 46,1 % | 49,6 % | −3,0 |
| Heerfahrt nach Italien | Wiprecht | 5 | Episch | – | – | – | – | 1904 | 52,7 % | 53,5 % | +1,0 |
| Judith von Böhmen | Wiprecht | 7 | Legendär | – | – | – | – | 2232 | 46,2 % | 59,2 % | +6,7 |
| Edelknabe | Ulrich | 1 | Basis | 4600 | 80,9 % | 48,5 % | −0,4 | 1132 | 53,0 % | 53,7 % | +2,8 |
| Lanzenstoß | Ulrich | 1 | Basis | 4600 | 84,0 % | 49,6 % | +0,8 | 1060 | 51,0 % | 53,9 % | +3,0 |
| Fahrender Ritter | Ulrich | 3 | Basis | 4600 | 83,3 % | 49,5 % | +0,7 | 1702 | 49,6 % | 52,3 % | +1,4 |
| Minnebrief | Ulrich | 2 | Basis | 4600 | 74,1 % | 50,8 % | +1,9 | 1564 | 42,1 % | 47,8 % | −3,1 |
| Minneritter | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1726 | 53,2 % | 51,7 % | +0,8 |
| Mit eingelegter Lanze | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1694 | 37,8 % | 50,7 % | −0,2 |
| Kämpe im Buhurt | Ulrich | 4 | Selten | – | – | – | – | 1580 | 41,8 % | 50,1 % | −0,8 |
| Venusfahrt | Ulrich | 5 | Selten | – | – | – | – | 1878 | 41,3 % | 56,4 % | +5,5 |
| Landrichter der Steiermark | Ulrich | 6 | Episch | – | – | – | – | 2496 | 51,1 % | 50,9 % | −0,0 |
| Friedrich der Streitbare | Ulrich | 6 | Legendär | – | – | – | – | 2310 | 45,0 % | 53,3 % | +2,4 |
| Dorfwache | neutral | 1 | Basis | 101200 | 80,7 % | 49,2 % | −0,8 | 24912 | 53,8 % | 50,5 % | +0,5 |
| Wandernder Händler | neutral | 2 | Basis | 101200 | 80,9 % | 49,0 % | −1,0 | 34094 | 53,2 % | 48,5 % | −1,4 |
| Steinschleuderer | neutral | 2 | Basis | 101200 | 80,9 % | 49,7 % | −0,3 | 34266 | 53,0 % | 50,9 % | +0,9 |
| Wilderin | neutral | 3 | Basis | 101200 | 83,3 % | 49,8 % | −0,3 | 36660 | 55,1 % | 49,9 % | −0,1 |
| Torwache der Burg | neutral | 4 | Basis | 101200 | 76,9 % | 51,3 % | +1,2 | 35428 | 47,3 % | 50,1 % | +0,1 |
| Kavallerist | neutral | 4 | Basis | 101200 | 78,3 % | 51,3 % | +1,3 | 35006 | 47,4 % | 51,4 % | +1,4 |
| Feldheilerin | neutral | 3 | Basis | 101200 | 80,8 % | 49,6 % | −0,5 | 36874 | 52,3 % | 48,7 % | −1,3 |
| Archivarin | neutral | 4 | Basis | 101200 | 74,7 % | 52,6 % | +2,6 | 35810 | 46,3 % | 50,4 % | +0,4 |
| Wachhund | neutral | 2 | Basis | 101200 | 78,3 % | 48,9 % | −1,1 | 34220 | 50,6 % | 48,8 % | −1,2 |
| Veteran | neutral | 5 | Basis | 101200 | 79,3 % | 52,5 % | +2,5 | 42778 | 50,6 % | 49,3 % | −0,7 |
| Belagerungsturm | neutral | 6 | Basis | 101200 | 76,8 % | 55,2 % | +5,2 | 55208 | 52,2 % | 50,7 % | +0,7 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 37064 | 51,1 % | 50,7 % | +0,7 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 24934 | 53,2 % | 52,3 % | +2,3 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 42918 | 51,5 % | 54,4 % | +4,3 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 37210 | 50,6 % | 50,2 % | +0,2 |
| Nachtwächter | neutral | 2 | Basis | – | – | – | – | 34538 | 49,9 % | 50,6 % | +0,7 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 33996 | 41,3 % | 49,0 % | −1,0 |
| Heilkräuter | neutral | 1 | Basis | – | – | – | – | 24510 | 49,9 % | 48,0 % | −2,0 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 34110 | 56,5 % | 49,5 % | −0,5 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 49168 | 53,1 % | 53,8 % | +3,7 |
| Ordensritter | neutral | 3 | Gewöhnlich | – | – | – | – | 37118 | 53,7 % | 51,6 % | +1,6 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 35532 | 48,3 % | 49,2 % | −0,9 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 34184 | 54,2 % | 52,0 % | +2,0 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 35382 | 48,9 % | 52,7 % | +2,7 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 37040 | 56,8 % | 53,2 % | +3,2 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 34334 | 29,9 % | 45,4 % | −4,6 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 35494 | 48,8 % | 47,2 % | −2,8 |
| Prätorianer | neutral | 5 | Gewöhnlich | – | – | – | – | 42664 | 48,1 % | 51,5 % | +1,5 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 35436 | 52,9 % | 54,4 % | +4,4 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 35362 | 47,3 % | 54,1 % | +4,1 |
| Löwin der Arena | neutral | 5 | Selten | – | – | – | – | 43042 | 52,6 % | 52,2 % | +2,1 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 42762 | 50,0 % | 50,3 % | +0,2 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 35604 | 42,8 % | 48,5 % | −1,5 |
| Trojanisches Pferd | neutral | 6 | Selten | – | – | – | – | 55462 | 54,9 % | 51,3 % | +1,3 |
| Brander | neutral | 7 | Episch | – | – | – | – | 49490 | 47,8 % | 52,8 % | +2,8 |
| Mercators Atlas | neutral | 4 | Episch | – | – | – | – | 35638 | 25,7 % | 48,6 % | −1,4 |
| Burgbesatzung | neutral | 8 | Episch | – | – | – | – | 34340 | 45,5 % | 58,8 % | +8,7 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 49232 | 55,4 % | 52,7 % | +2,6 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 35252 | 43,8 % | 52,4 % | +2,4 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 34062 | 44,5 % | 55,0 % | +5,0 |
| Spitzel im Venezianerviertel | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1708 | 58,1 % | 49,9 % | +1,7 |
| Plünderer am Rhein | Widukind | 3 | Gewöhnlich | – | – | – | – | 1640 | 50,7 % | 46,8 % | −0,7 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1562 | 52,4 % | 54,2 % | +2,0 |
| Zwanzig Städte in Flammen | Vercingetorix | 3 | Selten | – | – | – | – | 1618 | 51,4 % | 52,0 % | +1,1 |
| Eid der Arkanisten | Böttger | 1 | Selten | – | – | – | – | 1082 | 60,1 % | 51,7 % | +1,9 |
| Böhmischer Söldner | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1594 | 46,4 % | 52,1 % | −0,4 |
| Brandschatzung | Wiprecht | 1 | Gewöhnlich | – | – | – | – | 1148 | 59,3 % | 54,9 % | +2,3 |
| Heimlicher Bote | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1546 | 54,4 % | 54,4 % | +3,6 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 34028 | 51,6 % | 48,5 % | −1,5 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 24690 | 54,3 % | 51,9 % | +2,0 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 33902 | 57,2 % | 53,1 % | +3,1 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 37420 | 52,2 % | 53,5 % | +3,5 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 37116 | 55,1 % | 50,8 % | +0,8 |
| Ruderer der Triere | Perikles | 1 | Basis | 4600 | 79,4 % | 50,4 % | +1,5 | 1154 | 56,9 % | 53,1 % | +2,9 |
| Lange Mauern | Perikles | 2 | Basis | 4600 | 79,5 % | 45,5 % | −3,5 | 1492 | 58,4 % | 46,7 % | −3,5 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 4600 | 81,7 % | 52,3 % | +3,4 | 1612 | 57,6 % | 55,2 % | +5,0 |
| Strategos | Perikles | 3 | Basis | 4600 | 79,8 % | 51,7 % | +2,8 | 1666 | 59,9 % | 58,2 % | +8,0 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1642 | 50,5 % | 48,3 % | −2,0 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1452 | 62,0 % | 55,7 % | +5,5 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1566 | 55,0 % | 57,3 % | +7,1 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1580 | 38,7 % | 51,5 % | +1,3 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1588 | 39,6 % | 44,0 % | −6,2 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 2422 | 53,1 % | 52,4 % | +2,2 |
| Pilumwerfer | Agrippa | 1 | Basis | 4600 | 77,6 % | 52,3 % | +4,0 | 1100 | 56,6 % | 55,4 % | +4,4 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 4600 | 72,9 % | 49,9 % | +1,5 | 1580 | 45,3 % | 53,7 % | +2,6 |
| Castra | Agrippa | 3 | Basis | 4600 | 83,2 % | 50,1 % | +1,8 | 1638 | 58,8 % | 49,1 % | −2,0 |
| Testudo | Agrippa | 2 | Basis | 4600 | 74,6 % | 50,4 % | +2,1 | 1634 | 48,0 % | 55,1 % | +4,1 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1706 | 53,3 % | 53,4 % | +2,4 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1640 | 50,2 % | 54,8 % | +3,7 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1946 | 50,9 % | 57,3 % | +6,2 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1560 | 55,3 % | 49,1 % | −2,0 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1572 | 40,4 % | 50,1 % | −1,0 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1946 | 45,2 % | 49,7 % | −1,4 |
| Bogenschütze aus Elkab | Ahhotep | 1 | Basis | 4600 | 82,4 % | 51,3 % | −0,2 | 1092 | 56,2 % | 53,1 % | +1,2 |
| Krieger der Nilflotte | Ahhotep | 2 | Basis | 4600 | 80,9 % | 51,1 % | −0,4 | 1554 | 50,5 % | 51,4 % | −0,5 |
| Pfeilregen vor Auaris | Ahhotep | 2 | Basis | 4600 | 78,8 % | 52,4 % | +0,9 | 1574 | 43,3 % | 51,2 % | −0,7 |
| Speerträger aus Theben | Ahhotep | 3 | Basis | 4600 | 83,9 % | 52,3 % | +0,8 | 1642 | 51,9 % | 52,3 % | +0,4 |
| Priester der Selket | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1676 | 54,7 % | 53,8 % | +1,9 |
| Medjai-Kundschafter | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1590 | 54,5 % | 49,6 % | −2,2 |
| Erbeuteter Streitwagen | Ahhotep | 6 | Selten | – | – | – | – | 2530 | 53,3 % | 54,1 % | +2,2 |
| Überfall auf Nefrusi | Ahhotep | 3 | Selten | – | – | – | – | 1618 | 54,4 % | 49,8 % | −2,1 |
| Ahmose, Befreier Ägyptens | Ahhotep | 5 | Episch | – | – | – | – | 2008 | 55,9 % | 48,3 % | −3,5 |
| Zeremonialaxt des Ahmose | Ahhotep | 6 | Legendär | – | – | – | – | 2396 | 47,5 % | 53,1 % | +1,2 |
| Kopistin der Chronik | Anna | 1 | Basis | 4600 | 81,5 % | 53,6 % | +3,0 | 1128 | 55,8 % | 54,4 % | +5,0 |
| Pantokrator-Spital | Anna | 3 | Basis | 4600 | 73,1 % | 51,6 % | +1,0 | 1720 | 33,7 % | 49,0 % | −0,4 |
| Warägergardist | Anna | 3 | Basis | 4600 | 82,7 % | 55,1 % | +4,5 | 1662 | 55,7 % | 57,8 % | +8,4 |
| Hofärztin | Anna | 3 | Basis | 4600 | 81,8 % | 50,7 % | +0,1 | 1656 | 41,2 % | 47,7 % | −1,7 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1494 | 48,3 % | 63,1 % | +13,7 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1562 | 49,3 % | 56,8 % | +7,4 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1878 | 48,5 % | 56,5 % | +7,1 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1630 | 41,4 % | 50,1 % | +0,7 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1858 | 50,3 % | 51,8 % | +2,4 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 2366 | 48,4 % | 49,8 % | +0,4 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 4600 | 82,5 % | 48,7 % | +0,0 | 1084 | 59,6 % | 50,0 % | +4,0 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 4600 | 81,7 % | 48,9 % | +0,2 | 1580 | 55,1 % | 48,7 % | +2,7 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 4600 | 83,3 % | 49,3 % | +0,7 | 1542 | 60,5 % | 47,4 % | +1,5 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 4600 | 82,8 % | 47,9 % | −0,7 | 1718 | 60,1 % | 47,0 % | +1,1 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1486 | 55,1 % | 40,3 % | −5,7 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1426 | 51,4 % | 47,6 % | +1,6 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1640 | 54,0 % | 49,9 % | +3,9 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1744 | 52,0 % | 39,1 % | −6,8 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 2494 | 55,5 % | 57,6 % | +11,6 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 1904 | 47,2 % | 43,0 % | −2,9 |
| Lehnsmann | Theophanu | 1 | Basis | 4600 | 82,1 % | 45,2 % | −2,6 | 1106 | 57,9 % | 53,1 % | +2,1 |
| Bogenschütze der Pfalz | Theophanu | 2 | Basis | 4600 | 82,6 % | 46,2 % | −1,6 | 1462 | 61,7 % | 52,6 % | +1,6 |
| Treueschwur | Theophanu | 1 | Basis | 4600 | 82,5 % | 49,4 % | +1,6 | 1068 | 51,8 % | 53,0 % | +2,0 |
| Stiftsdame aus Quedlinburg | Theophanu | 2 | Basis | 4600 | 82,8 % | 46,0 % | −1,8 | 1456 | 56,8 % | 52,9 % | +1,9 |
| Späher an der Elbe | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1464 | 58,0 % | 53,6 % | +2,6 |
| Heerbann | Theophanu | 4 | Gewöhnlich | – | – | – | – | 1636 | 55,6 % | 55,6 % | +4,6 |
| St. Pantaleon in Köln | Theophanu | 2 | Selten | – | – | – | – | 1522 | 55,6 % | 50,2 % | −0,8 |
| Haft in Utrecht | Theophanu | 3 | Selten | – | – | – | – | 1718 | 51,9 % | 49,9 % | −1,1 |
| Willigis, Erzbischof von Mainz | Theophanu | 5 | Episch | – | – | – | – | 2000 | 53,9 % | 54,9 % | +3,9 |
| Otto II., Kaiser | Theophanu | 6 | Legendär | – | – | – | – | 2650 | 52,2 % | 51,1 % | +0,2 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1616 | 55,4 % | 53,8 % | +3,7 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1684 | 56,9 % | 45,5 % | −4,6 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1480 | 55,6 % | 52,0 % | +1,8 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1516 | 51,3 % | 51,7 % | +1,6 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1612 | 59,6 % | 53,4 % | +1,2 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1512 | 57,9 % | 47,8 % | −4,4 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1574 | 49,1 % | 48,8 % | +0,6 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 2394 | 46,0 % | 51,1 % | +3,0 |
| Heerlager an der Weser | Widukind | 3 | Gewöhnlich | – | – | – | – | 1574 | 42,6 % | 41,3 % | −6,2 |
| Versammlung in Marklo | Widukind | 4 | Selten | – | – | – | – | 1536 | 30,6 % | 45,5 % | −2,0 |
| Barde der Arverner | Vercingetorix | 2 | Gewöhnlich | – | – | – | – | 1570 | 53,4 % | 53,7 % | +2,8 |
| Gallische Reiterei | Vercingetorix | 5 | Selten | – | – | – | – | 1844 | 51,8 % | 48,4 % | −2,6 |
| Laborbuch | Böttger | 1 | Gewöhnlich | – | – | – | – | 1156 | 56,6 % | 54,0 % | +4,3 |
| Weißes Gold | Böttger | 3 | Selten | – | – | – | – | 1682 | 3,0 % | 45,5 % | −4,2 |
| Adlige Stifterin | Hildegard | 1 | Gewöhnlich | – | – | – | – | 1156 | 53,1 % | 53,4 % | +4,9 |
| Weihe der Klosterkirche | Hildegard | 4 | Selten | – | – | – | – | 1640 | 31,3 % | 47,8 % | −0,7 |
| Feldmesser | Wiprecht | 2 | Gewöhnlich | – | – | – | – | 1546 | 55,6 % | 53,2 % | +0,7 |
| Beuterecht | Wiprecht | 1 | Selten | – | – | – | – | 1148 | 58,2 % | 53,2 % | +0,7 |
| Ritter aus Murau | Ulrich | 4 | Selten | – | – | – | – | 1572 | 46,7 % | 48,4 % | −2,4 |
| Frische Lanze | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1574 | 50,4 % | 47,7 % | −3,2 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1456 | 51,0 % | 53,3 % | +3,0 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1658 | 31,2 % | 47,0 % | −3,2 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1624 | 47,8 % | 51,0 % | +0,0 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1530 | 37,1 % | 53,5 % | +2,5 |
| Pfeilmacher aus Edfu | Ahhotep | 2 | Gewöhnlich | – | – | – | – | 1524 | 57,3 % | 53,7 % | +1,8 |
| Gift der Hornviper | Ahhotep | 3 | Selten | – | – | – | – | 1632 | 42,5 % | 53,4 % | +1,6 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1574 | 56,9 % | 50,6 % | +1,2 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 2364 | 56,0 % | 57,6 % | +8,2 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1460 | 57,1 % | 45,3 % | −0,7 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1518 | 55,9 % | 44,5 % | −1,5 |
| Kanzler der Kaiserin | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1476 | 58,5 % | 51,4 % | +0,4 |
| Siegel der Kaiserin | Theophanu | 2 | Selten | – | – | – | – | 1576 | 47,4 % | 51,4 % | +0,4 |
| Olympionike | Griechenland und Hellenismus | 4 | Gewöhnlich | – | – | – | – | 6464 | 53,4 % | 55,7 % | +5,2 |
| Rhapsode | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 6324 | 52,5 % | 53,9 % | +3,4 |
| Marathonläufer | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 6084 | 53,7 % | 54,5 % | +4,0 |
| Orakel von Delphi | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 6768 | 27,8 % | 49,2 % | −1,3 |
| Leuchtturm von Pharos | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 6704 | 53,8 % | 44,6 % | −5,8 |
| Akropolis | Griechenland und Hellenismus | 2 | Selten | – | – | – | – | 6274 | 56,7 % | 48,9 % | −1,5 |
| Bibliothek von Alexandria | Griechenland und Hellenismus | 3 | Episch | – | – | – | – | 6710 | 50,4 % | 48,6 % | −1,8 |
| Knappe | Mittelalter im Reich | 1 | Gewöhnlich | – | – | – | – | 5598 | 52,8 % | 51,3 % | +1,3 |
| Armbrustschütze | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 8434 | 58,0 % | 55,3 % | +5,2 |
| Mönch von Cluny | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 8390 | 49,6 % | 53,2 % | +3,0 |
| Hansekogge | Mittelalter im Reich | 4 | Gewöhnlich | – | – | – | – | 7902 | 46,9 % | 49,3 % | −0,8 |
| Turnierritter | Mittelalter im Reich | 4 | Selten | – | – | – | – | 7874 | 49,0 % | 53,7 % | +3,6 |
| Burgfried | Mittelalter im Reich | 2 | Selten | – | – | – | – | 7810 | 56,9 % | 42,3 % | −7,8 |
| Tribok | Mittelalter im Reich | 4 | Episch | – | – | – | – | 7852 | 32,0 % | 46,4 % | −3,7 |
| Landsknecht | Frühe Neuzeit | 1 | Gewöhnlich | – | – | – | – | 3456 | 56,6 % | 50,6 % | +2,6 |
| Buchdrucker aus Mainz | Frühe Neuzeit | 3 | Gewöhnlich | – | – | – | – | 5070 | 54,9 % | 52,4 % | +4,4 |
| Leipziger Kaffeehaus | Frühe Neuzeit | 2 | Gewöhnlich | – | – | – | – | 4780 | 47,3 % | 46,5 % | −1,6 |
| Kartaunen-Salve | Frühe Neuzeit | 3 | Selten | – | – | – | – | 5076 | 57,7 % | 48,7 % | +0,7 |
| Kriegsgaleone | Frühe Neuzeit | 5 | Selten | – | – | – | – | 5640 | 57,5 % | 48,2 % | +0,2 |
| Stehendes Heer | Frühe Neuzeit | 5 | Episch | – | – | – | – | 5672 | 59,1 % | 48,8 % | +0,8 |
| Sternschanze | Frühe Neuzeit | 2 | Episch | – | – | – | – | 4758 | 63,1 % | 42,6 % | −5,4 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 36806 | 34,9 % | 44,5 % | −5,5 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 34106 | 57,0 % | 45,2 % | −4,8 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 35650 | 29,3 % | 43,9 % | −6,1 |
| Thebanischer Plänkler | Epaminondas | 1 | Basis | 4600 | 78,2 % | 47,6 % | −0,3 | 1116 | 53,5 % | 52,5 % | +1,1 |
| Böotischer Hoplit | Epaminondas | 2 | Basis | 4600 | 78,9 % | 47,7 % | −0,1 | 1690 | 50,0 % | 54,9 % | +3,6 |
| Fünfzig Schilde tief | Epaminondas | 2 | Basis | 4600 | 74,4 % | 47,7 % | −0,1 | 1594 | 48,9 % | 50,6 % | −0,7 |
| Böotarch | Epaminondas | 3 | Basis | 4600 | 78,2 % | 47,5 % | −0,3 | 1732 | 52,8 % | 56,8 % | +5,5 |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | Gewöhnlich | – | – | – | – | 1928 | 48,5 % | 59,6 % | +8,2 |
| Schlacht bei Leuktra | Epaminondas | 4 | Gewöhnlich | – | – | – | – | 1602 | 43,6 % | 51,8 % | +0,5 |
| Befreiung Messeniens | Epaminondas | 5 | Selten | – | – | – | – | 1910 | 50,1 % | 50,4 % | −0,9 |
| Thebanischer Phalangit | Epaminondas | 4 | Selten | – | – | – | – | 1584 | 45,4 % | 53,3 % | +2,0 |
| Megalopolis | Epaminondas | 3 | Episch | – | – | – | – | 1754 | 45,8 % | 46,9 % | −4,4 |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | Legendär | – | – | – | – | 2586 | 44,2 % | 52,4 % | +1,0 |
| Veles | Fabius | 1 | Basis | 4600 | 88,3 % | 48,4 % | −0,2 | 1182 | 59,4 % | 55,2 % | +4,9 |
| Triarier | Fabius | 2 | Basis | 4600 | 86,7 % | 48,7 % | +0,2 | 1530 | 57,0 % | 53,5 % | +3,3 |
| Hinhalten | Fabius | 2 | Basis | 4600 | 85,5 % | 48,4 % | −0,1 | 1576 | 60,0 % | 52,0 % | +1,8 |
| Konsul der Republik | Fabius | 4 | Basis | 4600 | 84,6 % | 49,1 % | +0,6 | 1544 | 48,5 % | 51,4 % | +1,1 |
| Verbrannte Erde | Fabius | 3 | Gewöhnlich | – | – | – | – | 1688 | 60,5 % | 51,4 % | +1,1 |
| Späher am Volturnus | Fabius | 2 | Gewöhnlich | – | – | – | – | 1530 | 57,8 % | 53,4 % | +3,1 |
| Minucius, der Reiteroberst | Fabius | 4 | Selten | – | – | – | – | 1708 | 53,3 % | 51,7 % | +1,5 |
| Rückeroberung von Tarent | Fabius | 6 | Selten | – | – | – | – | 2458 | 45,4 % | 56,5 % | +6,2 |
| Lager auf den Höhen | Fabius | 3 | Episch | – | – | – | – | 1690 | 60,4 % | 48,3 % | −2,0 |
| Marcellus, Schwert Roms | Fabius | 6 | Legendär | – | – | – | – | 2468 | 47,7 % | 48,6 % | −1,7 |
| Botin der Cherusker | Thusnelda | 1 | Basis | 4600 | 77,6 % | 53,1 % | +2,6 | 1124 | 52,0 % | 55,6 % | +7,0 |
| Hüterin des Herdfeuers | Thusnelda | 2 | Basis | 4600 | 79,1 % | 51,3 % | +0,8 | 1624 | 52,5 % | 46,4 % | −2,2 |
| Ruf zum Thing | Thusnelda | 3 | Basis | 4600 | 72,6 % | 48,9 % | −1,6 | 1752 | 43,9 % | 47,5 % | −1,1 |
| Krieger im Keil | Thusnelda | 3 | Basis | 4600 | 80,5 % | 52,5 % | +2,0 | 1618 | 54,9 % | 52,6 % | +4,0 |
| Varusschlacht | Thusnelda | 4 | Gewöhnlich | – | – | – | – | 1562 | 46,8 % | 48,9 % | +0,3 |
| Krieger der Sippe | Thusnelda | 3 | Gewöhnlich | – | – | – | – | 1744 | 55,8 % | 49,8 % | +1,2 |
| Heiliger Hain | Thusnelda | 2 | Selten | – | – | – | – | 1674 | 57,7 % | 43,1 % | −5,5 |
| Seitenwechsel | Thusnelda | 5 | Selten | – | – | – | – | 2046 | 43,5 % | 48,5 % | −0,1 |
| Arminius, Fürst der Cherusker | Thusnelda | 4 | Episch | – | – | – | – | 1596 | 45,4 % | 49,9 % | +1,3 |
| Bund der Stämme | Thusnelda | 8 | Legendär | – | – | – | – | 1622 | 43,0 % | 50,9 % | +2,4 |
| Mamlukenrekrut | Baibars | 1 | Basis | 4600 | 83,2 % | 49,0 % | −1,6 | 1192 | 54,4 % | 52,5 % | +2,3 |
| Barid-Kurier | Baibars | 2 | Basis | 4600 | 79,3 % | 51,5 % | +0,9 | 1624 | 51,7 % | 47,6 % | −2,6 |
| Ain Dschalut | Baibars | 3 | Basis | 4600 | 85,2 % | 51,6 % | +1,0 | 1726 | 54,7 % | 55,2 % | +5,0 |
| Bogenreiter der Bahriya | Baibars | 3 | Basis | 4600 | 83,2 % | 49,6 % | −1,0 | 1756 | 47,7 % | 50,5 % | +0,3 |
| Manjaniq-Meister | Baibars | 4 | Gewöhnlich | – | – | – | – | 1616 | 51,2 % | 53,4 % | +3,2 |
| Vorgetäuschte Flucht | Baibars | 1 | Gewöhnlich | – | – | – | – | 1194 | 18,1 % | 43,1 % | −7,1 |
| Qutuz, Sultan von Ägypten | Baibars | 5 | Selten | – | – | – | – | 2020 | 43,6 % | 55,2 % | +5,0 |
| Sturm auf Antiochia | Baibars | 2 | Selten | – | – | – | – | 1494 | 48,0 % | 47,1 % | −3,1 |
| Zitadelle von Kairo | Baibars | 4 | Episch | – | – | – | – | 1690 | 37,8 % | 47,0 % | −3,2 |
| Qalawun, Emir der Bahriya | Baibars | 6 | Legendär | – | – | – | – | 2734 | 46,8 % | 56,5 % | +6,3 |
| Schanzarbeiter | Vauban | 2 | Basis | 4600 | 76,6 % | 47,8 % | −1,1 | 1582 | 39,4 % | 44,4 % | −3,7 |
| Grenadier | Vauban | 2 | Basis | 4600 | 84,0 % | 49,9 % | +1,0 | 1688 | 59,8 % | 50,4 % | +2,3 |
| Salve von der Bastion | Vauban | 2 | Basis | 4600 | 78,1 % | 47,8 % | −1,1 | 1618 | 35,4 % | 43,7 % | −4,5 |
| Ingenieur des Königs | Vauban | 3 | Basis | 4600 | 83,9 % | 50,5 % | +1,6 | 1718 | 60,4 % | 56,1 % | +8,0 |
| Festungsgeschütz | Vauban | 3 | Gewöhnlich | – | – | – | – | 1718 | 57,7 % | 47,9 % | −0,3 |
| Faschinen | Vauban | 2 | Gewöhnlich | – | – | – | – | 1680 | 48,3 % | 49,0 % | +0,9 |
| Minengang | Vauban | 3 | Selten | – | – | – | – | 1680 | 51,7 % | 47,9 % | −0,2 |
| Zitadelle von Lille | Vauban | 4 | Selten | – | – | – | – | 1730 | 55,4 % | 38,4 % | −9,7 |
| Louvois, Kriegsminister | Vauban | 6 | Episch | – | – | – | – | 2494 | 54,0 % | 45,6 % | −2,5 |
| Ludwig XIV., der Sonnenkönig | Vauban | 5 | Legendär | – | – | – | – | 1898 | 43,4 % | 54,0 % | +5,9 |
| Speerwerfer vom Mont Lassois | Vix | 1 | Basis | 4600 | 83,5 % | 53,6 % | +2,6 | 1122 | 55,4 % | 55,7 % | +4,4 |
| Prunkdolch | Vix | 2 | Basis | 4600 | 76,7 % | 53,9 % | +2,9 | 1556 | 40,0 % | 54,1 % | +2,8 |
| Reiter an der Seine | Vix | 3 | Basis | 4600 | 82,9 % | 52,9 % | +1,9 | 1710 | 46,1 % | 51,9 % | +0,5 |
| Seherin | Vix | 3 | Basis | 4600 | 81,8 % | 52,9 % | +1,9 | 1716 | 45,6 % | 50,0 % | −1,3 |
| Aufgebot des Fürstensitzes | Vix | 4 | Gewöhnlich | – | – | – | – | 1682 | 50,9 % | 54,3 % | +3,0 |
| Trankopfer | Vix | 1 | Gewöhnlich | – | – | – | – | 1034 | 55,5 % | 51,8 % | +0,5 |
| Gelage am Krater | Vix | 1 | Selten | – | – | – | – | 1078 | 58,7 % | 55,9 % | +4,6 |
| Schleuderer am Wall | Vix | 4 | Selten | – | – | – | – | 1672 | 56,2 % | 58,5 % | +7,2 |
| Halle auf dem Mont Lassois | Vix | 1 | Episch | – | – | – | – | 1112 | 57,8 % | 50,4 % | −1,0 |
| Gesandter aus Massalia | Vix | 6 | Legendär | – | – | – | – | 2662 | 49,1 % | 56,1 % | +4,8 |
| Gladiator | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 6704 | 58,4 % | 54,7 % | +4,5 |
| Senator der Kurie | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 6470 | 51,1 % | 51,0 % | +0,7 |
| Centurio | Rom und Germanien | 2 | Gewöhnlich | – | – | – | – | 6226 | 54,7 % | 54,8 % | +4,6 |
| Triumphzug | Rom und Germanien | 3 | Selten | – | – | – | – | 6694 | 44,3 % | 48,1 % | −2,1 |
| Via Appia | Rom und Germanien | 2 | Selten | – | – | – | – | 6318 | 55,6 % | 47,5 % | −2,7 |
| Vestalin am ewigen Feuer | Rom und Germanien | 3 | Selten | – | – | – | – | 6582 | 57,1 % | 48,4 % | −1,8 |
| Pax Romana | Rom und Germanien | 5 | Episch | – | – | – | – | 7950 | 52,9 % | 44,8 % | −5,4 |
| Wagenbauer | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 4522 | 49,6 % | 54,6 % | +2,9 |
| Schreiber im Lebenshaus | Frühzeit und Ägypten | 3 | Gewöhnlich | – | – | – | – | 4910 | 52,6 % | 53,5 % | +1,8 |
| Schuss vom Streitwagen | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 4674 | 59,6 % | 58,3 % | +6,6 |
| Wache der Medjai | Frühzeit und Ägypten | 4 | Selten | – | – | – | – | 5026 | 46,4 % | 52,9 % | +1,1 |
| Angriff der Streitwagen | Frühzeit und Ägypten | 3 | Selten | – | – | – | – | 5056 | 55,3 % | 53,7 % | +2,0 |
| Bernsteinstraße | Frühzeit und Ägypten | 2 | Selten | – | – | – | – | 4554 | 54,6 % | 50,3 % | −1,4 |
| Festung Buhen | Frühzeit und Ägypten | 3 | Episch | – | – | – | – | 5054 | 50,1 % | 53,5 % | +1,7 |
| Akrit der Grenzmark | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 4794 | 54,7 % | 52,5 % | +3,2 |
| Gelehrter im Haus der Weisheit | Kreuzzüge | 3 | Gewöhnlich | – | – | – | – | 4946 | 50,4 % | 51,4 % | +2,1 |
| Tribut in Goldbyzantinern | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 4634 | 30,2 % | 48,1 % | −1,2 |
| Arzt des Bimaristan | Kreuzzüge | 3 | Selten | – | – | – | – | 5036 | 58,9 % | 55,3 % | +6,1 |
| Theodosianische Mauern | Kreuzzüge | 2 | Selten | – | – | – | – | 4730 | 59,3 % | 47,1 % | −2,2 |
| Hagia Sophia | Kreuzzüge | 3 | Episch | – | – | – | – | 4994 | 61,7 % | 44,8 % | −4,5 |
| Ibn an-Nafis, Arzt von Kairo | Kreuzzüge | 4 | Episch | – | – | – | – | 4742 | 52,8 % | 52,0 % | +2,8 |
| Krähenfüße | neutral | 1 | Gewöhnlich | – | – | – | – | 24858 | 52,2 % | 52,1 % | +2,1 |
| Abgefangene Botschaft | neutral | 2 | Selten | – | – | – | – | 34482 | 35,0 % | 45,1 % | −4,9 |
| Falsche Kundschafter von Kadesch | Frühzeit und Ägypten | 2 | Selten | – | – | – | – | 4464 | 34,5 % | 49,2 % | −2,6 |
| Botschaft des Sikinnos | Griechenland und Hellenismus | 1 | Gewöhnlich | – | – | – | – | 4354 | 53,9 % | 53,1 % | +2,7 |
| Wall am Kalkrieser Berg | Rom und Germanien | 3 | Selten | – | – | – | – | 6552 | 29,3 % | 47,9 % | −2,3 |
| Fallgatter | Mittelalter im Reich | 2 | Gewöhnlich | – | – | – | – | 7904 | 37,6 % | 46,2 % | −3,9 |
| Engpass von Myriokephalon | Kreuzzüge | 3 | Selten | – | – | – | – | 4982 | 37,6 % | 47,5 % | −1,7 |
| Gegenmine | Frühe Neuzeit | 3 | Selten | – | – | – | – | 5122 | 36,4 % | 44,7 % | −3,3 |
| Hinterhalt am Süntel | Widukind | 3 | Selten | – | – | – | – | 1700 | 32,8 % | 43,0 % | −4,5 |
| Rettung bei Gerunium | Fabius | 2 | Selten | – | – | – | – | 1564 | 48,0 % | 49,4 % | −0,9 |
| Täuschung bei Larissa | Anna | 1 | Selten | – | – | – | – | 1132 | 49,2 % | 55,9 % | +6,5 |
| Kampf um den Leichnam | Leonidas | 2 | Selten | – | – | – | – | 1524 | 47,0 % | 46,6 % | −3,5 |
