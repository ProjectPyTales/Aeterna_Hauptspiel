# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `e3141d0352` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die 21 anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,5.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 50600 | ✗ 21/22 | ✗ 198/231 | ✓ 47,3 % | – | 0 | 24 |
| Zufallsdecks | 50600 | ✗ 19/22 | ✗ 220/231 | ✓ 50,6 % | ✓ 53,5 % (+3,4) | 0 | 21 |

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
| Sternenregen | Hypatia | 4 | 56,4 % | +3,8 | 79,3 % |
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
| Theophanu | **53,9 %** | 53,2 % | 54,0 % | Vix 48,5 % | Nezahualcóyotl 61,0 % | Defensiv: 40,0 % | ✗ |
| Imhotep | **53,5 %** | 51,8 % | 54,6 % | Thusnelda 44,5 % | Nezahualcóyotl 62,5 % | Defensiv: 39,2 % | ✗ |
| Ahhotep I. | **52,3 %** | 53,4 % | 50,8 % | Theophanu 42,5 % | Vercingetorix 61,0 % | Aggressiv: 49,4 % | ✓ |
| Fürstin von Vix | **52,1 %** | 52,7 % | 51,0 % | Wiprecht 44,0 % | Dandolo 63,5 % | Kombinierend: 44,9 % | ✓ |
| Wiprecht von Groitzsch | **51,9 %** | 53,1 % | 50,3 % | Theophanu 45,5 % | Dandolo 60,5 % | Aggressiv: 47,6 % | ✓ |
| Ulrich von Liechtenstein | **51,3 %** | 51,2 % | 51,3 % | Hildegard 44,5 % | Anna 56,5 % | Aggressiv: 53,5 % | ✓ |
| Epaminondas | **50,0 %** | 50,1 % | 50,0 % | Imhotep 42,5 % | Anna 58,5 % | Aggressiv: 46,6 % | ✓ |
| Leonidas I. | **50,0 %** | 50,8 % | 49,2 % | Ulrich 44,5 % | Böttger 57,0 % | Defensiv: 38,5 % | ✓ |
| Johann Friedrich Böttger | **50,0 %** | 51,9 % | 48,0 % | Theophanu 42,5 % | Hypatia 57,5 % | Kombinierend: 43,2 % | ✓ |
| Thusnelda | **49,9 %** | 49,1 % | 50,7 % | Theophanu 43,0 % | Imhotep 55,5 % | Kombinierend: 45,1 % | ✓ |
| Hildegard von Bingen | **49,8 %** | 52,6 % | 47,1 % | Theophanu 42,5 % | Anna 57,0 % | Aggressiv: 50,0 % | ✓ |
| Widukind | **49,7 %** | 49,3 % | 50,2 % | Wiprecht 42,5 % | Anna 59,5 % | Aggressiv: 49,3 % | ✓ |
| Marcus Agrippa | **49,7 %** | 48,1 % | 51,4 % | Imhotep 39,0 % | Vauban 56,5 % | Kombinierend: 46,0 % | ✓ |
| Baibars | **49,6 %** | 51,4 % | 47,9 % | Vix 38,5 % | Agrippa 56,0 % | Aggressiv: 42,4 % | ✓ |
| Fabius Maximus | **49,4 %** | 50,9 % | 48,0 % | Anna 37,0 % | Perikles 63,0 % | Defensiv: 40,7 % | ✓ |
| Perikles | **48,7 %** | 49,3 % | 48,4 % | Fabius 37,0 % | Vauban 55,5 % | Defensiv: 40,7 % | ✓ |
| Hypatia | **48,7 %** | 49,9 % | 47,8 % | Ahhotep 39,5 % | Vercingetorix 55,5 % | Kombinierend: 44,5 % | ✓ |
| Nezahualcóyotl | **48,5 %** | 50,1 % | 47,1 % | Vix 36,5 % | Epaminondas 56,0 % | Defensiv: 38,5 % | ✓ |
| Vercingetorix | **48,4 %** | 47,2 % | 49,9 % | Ahhotep 39,0 % | Dandolo 55,0 % | Aggressiv: 48,2 % | ✓ |
| Anna Komnene | **48,0 %** | 49,9 % | 46,4 % | Widukind 40,5 % | Fabius 63,0 % | Kombinierend: 41,2 % | ✓ |
| Vauban | **47,8 %** | 49,2 % | 46,8 % | Imhotep 41,5 % | Vercingetorix 56,0 % | Defensiv: 41,7 % | ✓ |
| Enrico Dandolo | **46,7 %** | 48,7 % | 45,2 % | Vix 36,5 % | Vauban 53,5 % | Kombinierend: 41,6 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Widu. | Verc. | Bött. | Hild. | Wipr. | Ulri. | Peri. | Agri. | Ahho. | Anna. | Neza. | Theo. | Epam. | Fabi. | Thus. | Baib. | Vaub. | Vix. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 47 | 48 | 53 | 52 | 56 | 57 | 47 | 48 | 45 | 50 | 56 | 51 | 48 | 48 | 49 | 47 | 47 | 53 | 54 | 50 | 46 |
| Hypatia | 53 | · | 52 | 48 | 51 | 56 | 43 | 46 | 54 | 46 | 45 | 49 | **40** | 48 | 56 | 49 | 49 | 52 | 46 | 46 | 49 | 51 |
| Imhotep | 53 | 49 | · | 53 | 56 | 57 | 52 | 56 | 54 | 51 | 49 | **61** | 57 | 55 | **63** | 49 | 57 | 51 | 45 | 53 | 59 | 46 |
| Dandolo | 47 | 52 | 47 | · | 42 | 45 | 51 | 48 | **40** | 45 | 47 | 47 | 43 | 51 | 46 | 51 | 42 | 51 | 52 | 46 | 54 | **37** |
| Widukind | 48 | 50 | 44 | 58 | · | 47 | 49 | 52 | 43 | 48 | 54 | 55 | 50 | 60 | 48 | 45 | 47 | 47 | 52 | 47 | 49 | 56 |
| Vercingetorix | 44 | 44 | 43 | 55 | 53 | · | 52 | 49 | 42 | 54 | 53 | 52 | **39** | 53 | 48 | 45 | 52 | 49 | 49 | 51 | 44 | 50 |
| Böttger | 43 | 57 | 49 | 50 | 52 | 48 | · | 48 | 51 | 51 | 53 | 45 | 48 | 48 | 54 | 43 | 51 | 51 | 52 | 51 | 56 | 53 |
| Hildegard | 53 | 54 | 44 | 52 | 48 | 51 | 52 | · | 53 | 56 | 49 | 46 | 43 | 57 | 48 | 43 | 51 | 46 | 49 | 53 | 50 | 53 |
| Wiprecht | 52 | 47 | 47 | **61** | 57 | 58 | 50 | 48 | · | 46 | 54 | 46 | 50 | 59 | 54 | 46 | 48 | 54 | 53 | 57 | 51 | 56 |
| Ulrich | 55 | 54 | 49 | 55 | 53 | 47 | 49 | 44 | 54 | · | 56 | 50 | 52 | 56 | 51 | 51 | 52 | 48 | 45 | 54 | 51 | 53 |
| Perikles | 51 | 55 | 51 | 53 | 46 | 48 | 48 | 52 | 47 | 44 | · | 48 | 45 | 48 | 51 | 47 | 51 | **37** | 50 | 48 | 56 | 52 |
| Agrippa | 44 | 52 | **39** | 53 | 45 | 49 | 55 | 54 | 54 | 50 | 52 | · | 48 | 50 | 53 | 48 | 49 | 52 | 48 | 44 | 56 | 52 |
| Ahhotep | 50 | **61** | 43 | 57 | 50 | **61** | 52 | 57 | 50 | 49 | 55 | 53 | · | 55 | 47 | 43 | 57 | 52 | 56 | 54 | 53 | 47 |
| Anna | 52 | 52 | 45 | 50 | 41 | 48 | 52 | 43 | 41 | 44 | 53 | 51 | 45 | · | 49 | 44 | 42 | **63** | 48 | 47 | 57 | 46 |
| Nezahualcóyotl | 52 | 44 | **38** | 54 | 52 | 53 | 46 | 52 | 47 | 50 | 50 | 48 | 53 | 52 | · | **39** | 56 | 47 | 53 | 45 | 54 | **37** |
| Theophanu | 51 | 52 | 52 | 49 | 55 | 55 | 57 | 57 | 54 | 49 | 53 | 52 | 57 | 56 | **61** | · | 57 | 57 | 57 | 51 | 49 | 49 |
| Epaminondas | 53 | 51 | 43 | 58 | 53 | 49 | 50 | 50 | 52 | 48 | 50 | 51 | 43 | 59 | 44 | 43 | · | 51 | 52 | 57 | 48 | 50 |
| Fabius | 53 | 49 | 49 | 50 | 53 | 52 | 50 | 54 | 47 | 53 | **63** | 48 | 48 | **37** | 53 | 43 | 50 | · | 48 | 46 | 48 | 47 |
| Thusnelda | 47 | 54 | 55 | 48 | 48 | 51 | 49 | 52 | 48 | 55 | 51 | 53 | 44 | 53 | 48 | 43 | 49 | 52 | · | 49 | 53 | 50 |
| Baibars | 46 | 54 | 47 | 54 | 53 | 49 | 49 | 48 | 43 | 46 | 53 | 56 | 46 | 53 | 55 | 50 | 43 | 54 | 52 | · | 54 | **39** |
| Vauban | 50 | 51 | 42 | 47 | 51 | 56 | 44 | 50 | 49 | 49 | 44 | 44 | 47 | 43 | 46 | 51 | 52 | 52 | 48 | 46 | · | 44 |
| Vix | 54 | 49 | 54 | **64** | 44 | 51 | 48 | 48 | 44 | 47 | 48 | 49 | 53 | 54 | **64** | 52 | 51 | 53 | 51 | **62** | 56 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 48,4 % aufs Gesicht, 8,1 % auf Bauwerke · **Defensiv** (7 Helden) 39,9 % aufs Gesicht, 10,2 % auf Bauwerke · **Kombinierend** (7 Helden) 43,8 % aufs Gesicht, 9,4 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 22,0, Median 21, 10–90 %: 15–31, kürzeste 9, längste 66. Beginner gewinnt 50,6 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Astrolabienwächter | Hypatia | 3 | 60,2 % | +11,4 | 57,4 % |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 59,8 % | +11,2 | 57,3 % |
| Phalanxveteran | Leonidas | 5 | 60,1 % | +10,1 | 57,9 % |
| Warägergardist | Anna | 3 | 58,2 % | +10,1 | 55,1 % |
| Griechisches Feuer | Anna | 4 | 58,2 % | +10,0 | 47,0 % |
| Chronist am Kaiserhof | Anna | 6 | 57,4 % | +9,3 | 57,7 % |
| Burgbesatzung | neutral | 8 | 59,0 % | +8,9 | 45,1 % |
| Bibliothekar von Konstantinopel | Anna | 4 | 57,0 % | +8,8 | 46,6 % |
| Sternschanze | Frühe Neuzeit | 2 | 42,5 % | −6,4 | 62,6 % |
| Engpass der Thermopylen | Leonidas | 3 | 43,6 % | −6,4 | 53,1 % |
| Vorgetäuschte Flucht | Baibars | 1 | 43,2 % | −6,4 | 18,6 % |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | 41,9 % | −6,7 | 55,1 % |
| Pyramiden von Gizeh | neutral | 4 | 43,3 % | −6,7 | 27,5 % |
| Letzter Ritt vor Alesia | Vercingetorix | 5 | 41,6 % | −6,9 | 35,5 % |
| Burgfried | Mittelalter im Reich | 2 | 43,3 % | −7,9 | 55,8 % |
| Zitadelle von Lille | Vauban | 4 | 36,1 % | −11,9 | 58,1 % |

**Legendäre** (AP 5.3) – als Gruppe 53,5 % „gewinnt, wenn gezogen“ (+3,4 gegenüber ihrem Helden, 61910 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Judith von Böhmen | Wiprecht | 7 | 58,4 % | +6,7 | 45,0 % |
| Djoser, der Erbauer | Imhotep | 6 | 57,5 % | +4,3 | 52,1 % |
| Qalawun, Emir der Bahriya | Baibars | 6 | 57,1 % | +7,5 | 46,3 % |
| Gesandter aus Massalia | Vix | 6 | 57,0 % | +5,1 | 48,7 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 56,9 % | +6,9 | 48,9 % |
| Bund der Stämme | Thusnelda | 8 | 56,2 % | +6,3 | 42,1 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 55,8 % | +5,7 | 44,3 % |
| Zeremonialaxt des Ahmose | Ahhotep | 6 | 55,1 % | +3,0 | 46,0 % |
| Otto II., Kaiser | Theophanu | 6 | 54,8 % | +1,3 | 51,1 % |
| Abbi, Gefährte Widukinds | Widukind | 6 | 54,5 % | +4,7 | 44,6 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 52,7 % | +5,7 | 43,6 % |
| Herodot, Vater der Geschichte | neutral | 4 | 52,3 % | +2,3 | 43,5 % |
| Ludwig XIV., der Sonnenkönig | Vauban | 5 | 52,1 % | +4,1 | 43,7 % |
| Tschirnhaus, Naturforscher | Böttger | 5 | 52,0 % | +2,0 | 51,1 % |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | 51,8 % | +1,8 | 44,8 % |
| Theon von Alexandria | Hypatia | 5 | 50,5 % | +1,7 | 49,7 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 50,4 % | +1,5 | 52,7 % |
| Friedrich der Streitbare | Ulrich | 6 | 50,2 % | −1,0 | 44,3 % |
| Jutta von Sponheim, Magistra | Hildegard | 7 | 50,0 % | +0,2 | 42,6 % |
| Marcellus, Schwert Roms | Fabius | 6 | 48,6 % | −0,8 | 48,1 % |
| Alexios I. Komnenos | Anna | 6 | 48,5 % | +0,3 | 49,7 % |
| Commius, Führer des Entsatzheers | Vercingetorix | 8 | 48,1 % | −0,5 | 46,7 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 47,3 % | −2,5 | 41,2 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 44,7 % | −3,9 | 45,6 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 4600 | 81,0 % | 54,1 % | +0,7 | 1220 | 52,9 % | 52,2 % | +2,2 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 4600 | 82,3 % | 54,2 % | +0,8 | 1676 | 57,2 % | 55,2 % | +5,2 |
| Bronzener Wall | Leonidas | 2 | Basis | 4600 | 82,5 % | 54,7 % | +1,3 | 1624 | 49,3 % | 51,3 % | +1,3 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 4600 | 77,2 % | 55,7 % | +2,3 | 1640 | 49,4 % | 50,0 % | +0,0 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1728 | 55,7 % | 52,0 % | +2,0 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1746 | 54,6 % | 50,5 % | +0,5 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1922 | 57,9 % | 60,1 % | +10,1 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1582 | 45,3 % | 50,5 % | +0,5 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 2450 | 52,9 % | 46,4 % | −3,6 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 2056 | 48,9 % | 56,9 % | +6,9 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 4600 | 82,5 % | 51,3 % | −1,3 | 1148 | 53,5 % | 47,8 % | −1,0 |
| Himmelsstrahl | Hypatia | 2 | Basis | 4600 | 87,2 % | 52,8 % | +0,3 | 1658 | 57,7 % | 51,1 % | +2,3 |
| Sternenkundiger | Hypatia | 3 | Basis | 4600 | 82,1 % | 54,4 % | +1,8 | 1938 | 50,5 % | 50,2 % | +1,4 |
| Sternenregen | Hypatia | 4 | Basis | 4600 | 79,3 % | 56,4 % | +3,8 | 1552 | 46,8 % | 54,8 % | +6,0 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1766 | 57,4 % | 60,2 % | +11,4 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1654 | 30,1 % | 48,4 % | −0,5 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1862 | 49,1 % | 54,7 % | +5,9 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 2534 | 56,7 % | 48,4 % | −0,4 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 1900 | 53,1 % | 46,5 % | −2,4 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1982 | 49,7 % | 50,5 % | +1,7 |
| Nilschülerin | Imhotep | 1 | Basis | 4600 | 82,9 % | 51,6 % | −0,3 | 1186 | 53,0 % | 56,0 % | +2,8 |
| Heilender Balsam | Imhotep | 1 | Basis | 4600 | 83,7 % | 53,8 % | +2,0 | 1166 | 57,1 % | 57,2 % | +4,0 |
| Pyramidenwächter | Imhotep | 3 | Basis | 4600 | 84,2 % | 53,2 % | +1,3 | 1672 | 59,0 % | 54,0 % | +0,8 |
| Tempelärztin | Imhotep | 4 | Basis | 4600 | 80,7 % | 52,5 % | +0,6 | 1658 | 53,6 % | 50,2 % | −3,0 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1518 | 53,6 % | 57,1 % | +3,9 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1784 | 58,5 % | 58,2 % | +5,0 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1678 | 46,6 % | 54,4 % | +1,2 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1998 | 55,3 % | 59,8 % | +6,7 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 1936 | 56,8 % | 51,6 % | −1,6 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 2540 | 52,1 % | 57,5 % | +4,3 |
| Lagunenbote | Dandolo | 1 | Basis | 4600 | 80,3 % | 52,5 % | +2,7 | 1138 | 52,9 % | 52,3 % | +5,4 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 4600 | 79,7 % | 48,9 % | −0,9 | 1602 | 50,2 % | 46,4 % | −0,5 |
| Präziser Stich | Dandolo | 2 | Basis | 4600 | 85,1 % | 51,3 % | +1,5 | 1652 | 55,5 % | 49,3 % | +2,3 |
| Handelsgesandter | Dandolo | 4 | Basis | 4600 | 79,2 % | 53,3 % | +3,5 | 1574 | 50,6 % | 46,7 % | −0,2 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1628 | 40,8 % | 46,7 % | −0,2 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1696 | 54,0 % | 46,1 % | −0,9 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1640 | 47,1 % | 48,9 % | +1,9 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1826 | 52,1 % | 50,9 % | +4,0 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1876 | 37,8 % | 46,2 % | −0,8 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 2418 | 43,6 % | 52,7 % | +5,7 |
| Späher aus Engern | Widukind | 1 | Basis | 4600 | 75,4 % | 49,1 % | −1,1 | 1258 | 49,8 % | 51,7 % | +1,9 |
| Speerwerfer aus Westfalen | Widukind | 2 | Basis | 4600 | 77,0 % | 49,3 % | −0,9 | 1790 | 50,3 % | 53,7 % | +3,9 |
| Pfeilschuss | Widukind | 2 | Basis | 4600 | 76,1 % | 47,8 % | −2,4 | 1766 | 55,1 % | 51,6 % | +1,8 |
| Reiter der Edelinge | Widukind | 4 | Basis | 4600 | 70,7 % | 54,8 % | +4,7 | 1574 | 47,9 % | 54,3 % | +4,5 |
| Falknerin | Widukind | 3 | Gewöhnlich | – | – | – | – | 1736 | 42,2 % | 48,6 % | −1,1 |
| Sachsenaufstand | Widukind | 3 | Gewöhnlich | – | – | – | – | 1718 | 45,4 % | 48,3 % | −1,5 |
| Schildträger aus Ostfalen | Widukind | 5 | Selten | – | – | – | – | 1806 | 46,3 % | 49,9 % | +0,2 |
| Sturm auf die Eresburg | Widukind | 6 | Selten | – | – | – | – | 2306 | 49,0 % | 53,7 % | +4,0 |
| Gefolgschaft Widukinds | Widukind | 6 | Episch | – | – | – | – | 2350 | 44,4 % | 47,4 % | −2,3 |
| Abbi, Gefährte Widukinds | Widukind | 6 | Legendär | – | – | – | – | 2268 | 44,6 % | 54,5 % | +4,7 |
| Hüterin des Hains | Vercingetorix | 1 | Basis | 4600 | 82,4 % | 47,2 % | −1,6 | 1248 | 50,9 % | 46,8 % | −1,7 |
| Schild aus Eichenholz | Vercingetorix | 2 | Basis | 4600 | 75,3 % | 47,5 % | −1,4 | 1708 | 41,7 % | 44,4 % | −4,1 |
| Krieger der Arverner | Vercingetorix | 3 | Basis | 4600 | 85,4 % | 50,1 % | +1,3 | 1674 | 56,4 % | 51,3 % | +2,7 |
| Hieb mit dem Langschwert | Vercingetorix | 3 | Basis | 4600 | 84,8 % | 48,0 % | −0,8 | 1706 | 58,5 % | 47,6 % | −0,9 |
| Reiter der Arverner | Vercingetorix | 4 | Gewöhnlich | – | – | – | – | 1586 | 49,4 % | 46,2 % | −2,3 |
| Heilkundige mit der Mistel | Vercingetorix | 3 | Gewöhnlich | – | – | – | – | 1746 | 51,7 % | 47,5 % | −1,0 |
| Erhebung der Gallier | Vercingetorix | 3 | Selten | – | – | – | – | 1702 | 54,9 % | 50,4 % | +1,9 |
| Verteidiger von Gergovia | Vercingetorix | 6 | Selten | – | – | – | – | 2456 | 51,2 % | 49,2 % | +0,6 |
| Letzter Ritt vor Alesia | Vercingetorix | 5 | Episch | – | – | – | – | 1882 | 35,5 % | 41,6 % | −6,9 |
| Commius, Führer des Entsatzheers | Vercingetorix | 8 | Legendär | – | – | – | – | 1408 | 46,7 % | 48,1 % | −0,5 |
| Apothekerlehrling | Böttger | 1 | Basis | 4600 | 85,5 % | 53,8 % | +2,8 | 1200 | 59,0 % | 55,2 % | +5,2 |
| Verpuffung im Laboratorium | Böttger | 2 | Basis | 4600 | 89,3 % | 53,9 % | +2,9 | 1660 | 67,0 % | 54,6 % | +4,6 |
| Bergmann aus Aue | Böttger | 3 | Basis | 4600 | 85,4 % | 52,1 % | +1,0 | 1792 | 49,3 % | 50,2 % | +0,2 |
| Geheimes Rezeptbuch | Böttger | 4 | Basis | 4600 | 67,0 % | 51,5 % | +0,4 | 1564 | 25,6 % | 48,2 % | −1,7 |
| Pestarzt | Böttger | 4 | Gewöhnlich | – | – | – | – | 1634 | 60,6 % | 57,1 % | +7,2 |
| Befehl des Kurfürsten | Böttger | 2 | Gewöhnlich | – | – | – | – | 1674 | 59,5 % | 57,0 % | +7,1 |
| Schreiber der Manufaktur | Böttger | 5 | Selten | – | – | – | – | 1782 | 52,9 % | 48,9 % | −1,0 |
| Glut des Brennofens | Böttger | 5 | Selten | – | – | – | – | 1792 | 46,2 % | 55,3 % | +5,3 |
| Wache auf dem Königstein | Böttger | 6 | Episch | – | – | – | – | 2424 | 59,2 % | 53,1 % | +3,2 |
| Tschirnhaus, Naturforscher | Böttger | 5 | Legendär | – | – | – | – | 1844 | 51,1 % | 52,0 % | +2,0 |
| Pförtnerin vom Rupertsberg | Hildegard | 1 | Basis | 4600 | 78,7 % | 49,9 % | −0,6 | 1312 | 55,4 % | 56,4 % | +6,6 |
| Grünkraft | Hildegard | 2 | Basis | 4600 | 79,0 % | 50,5 % | −0,1 | 1652 | 50,1 % | 50,4 % | +0,6 |
| Klostervogt | Hildegard | 3 | Basis | 4600 | 78,8 % | 51,4 % | +0,9 | 1792 | 55,6 % | 51,6 % | +1,8 |
| Einkleidung der Novizinnen | Hildegard | 2 | Basis | 4600 | 77,1 % | 49,1 % | −1,4 | 1664 | 55,0 % | 55,5 % | +5,7 |
| Pilger am Rhein | Hildegard | 4 | Gewöhnlich | – | – | – | – | 1568 | 41,3 % | 51,3 % | +1,4 |
| Segen der Äbtissin | Hildegard | 2 | Gewöhnlich | – | – | – | – | 1670 | 45,1 % | 52,2 % | +2,4 |
| Vorsängerin im Chor | Hildegard | 5 | Selten | – | – | – | – | 1840 | 49,1 % | 49,8 % | −0,0 |
| Spiel der Tugenden | Hildegard | 6 | Selten | – | – | – | – | 2266 | 42,1 % | 51,2 % | +1,4 |
| Ritter mit dem Schutzbrief | Hildegard | 7 | Episch | – | – | – | – | 2098 | 40,8 % | 48,0 % | −1,9 |
| Jutta von Sponheim, Magistra | Hildegard | 7 | Legendär | – | – | – | – | 2016 | 42,6 % | 50,0 % | +0,2 |
| Siedler aus Franken | Wiprecht | 1 | Basis | 4600 | 77,3 % | 47,3 % | −2,3 | 1256 | 50,1 % | 55,1 % | +3,4 |
| Fehde | Wiprecht | 2 | Basis | 4600 | 81,6 % | 48,8 % | −0,8 | 1648 | 59,2 % | 53,7 % | +2,0 |
| Burgmann von Groitzsch | Wiprecht | 3 | Basis | 4600 | 80,7 % | 50,8 % | +1,2 | 1706 | 52,8 % | 55,6 % | +3,9 |
| Lokator | Wiprecht | 4 | Basis | 4600 | 76,2 % | 51,5 % | +1,9 | 1598 | 50,6 % | 54,6 % | +2,8 |
| Verhau | Wiprecht | 3 | Gewöhnlich | – | – | – | – | 1758 | 56,3 % | 51,9 % | +0,2 |
| Panzerreiter | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1556 | 47,8 % | 53,3 % | +1,6 |
| Rodung | Wiprecht | 3 | Selten | – | – | – | – | 1664 | 52,8 % | 55,7 % | +4,0 |
| Grenzwächter der Mark | Wiprecht | 5 | Selten | – | – | – | – | 1900 | 47,6 % | 50,4 % | −1,3 |
| Heerfahrt nach Italien | Wiprecht | 5 | Episch | – | – | – | – | 1906 | 51,6 % | 53,4 % | +1,6 |
| Judith von Böhmen | Wiprecht | 7 | Legendär | – | – | – | – | 2238 | 45,0 % | 58,4 % | +6,7 |
| Edelknabe | Ulrich | 1 | Basis | 4600 | 80,9 % | 48,5 % | −0,4 | 1212 | 53,2 % | 54,7 % | +3,5 |
| Lanzenstoß | Ulrich | 1 | Basis | 4600 | 84,0 % | 49,6 % | +0,8 | 1206 | 51,4 % | 53,8 % | +2,6 |
| Fahrender Ritter | Ulrich | 3 | Basis | 4600 | 83,3 % | 49,5 % | +0,7 | 1778 | 47,4 % | 53,0 % | +1,8 |
| Minnebrief | Ulrich | 2 | Basis | 4600 | 74,1 % | 50,8 % | +1,9 | 1722 | 40,1 % | 50,8 % | −0,5 |
| Minneritter | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1752 | 52,6 % | 53,9 % | +2,7 |
| Mit eingelegter Lanze | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1724 | 36,1 % | 51,0 % | −0,2 |
| Kämpe im Buhurt | Ulrich | 4 | Selten | – | – | – | – | 1534 | 38,3 % | 52,3 % | +1,0 |
| Venusfahrt | Ulrich | 5 | Selten | – | – | – | – | 1866 | 41,1 % | 54,5 % | +3,3 |
| Landrichter der Steiermark | Ulrich | 6 | Episch | – | – | – | – | 2470 | 50,1 % | 50,4 % | −0,8 |
| Friedrich der Streitbare | Ulrich | 6 | Legendär | – | – | – | – | 2322 | 44,3 % | 50,2 % | −1,0 |
| Dorfwache | neutral | 1 | Basis | 101200 | 80,7 % | 49,2 % | −0,8 | 26932 | 53,8 % | 49,5 % | −0,5 |
| Wandernder Händler | neutral | 2 | Basis | 101200 | 80,9 % | 49,0 % | −1,0 | 36802 | 53,0 % | 48,7 % | −1,3 |
| Steinschleuderer | neutral | 2 | Basis | 101200 | 80,9 % | 49,7 % | −0,3 | 36654 | 52,5 % | 50,8 % | +0,8 |
| Wilderin | neutral | 3 | Basis | 101200 | 83,3 % | 49,8 % | −0,3 | 38010 | 55,3 % | 49,8 % | −0,2 |
| Torwache der Burg | neutral | 4 | Basis | 101200 | 76,9 % | 51,3 % | +1,2 | 36106 | 47,0 % | 50,8 % | +0,7 |
| Kavallerist | neutral | 4 | Basis | 101200 | 78,3 % | 51,3 % | +1,3 | 35318 | 46,2 % | 51,4 % | +1,4 |
| Feldheilerin | neutral | 3 | Basis | 101200 | 80,8 % | 49,6 % | −0,5 | 38602 | 51,3 % | 49,0 % | −1,0 |
| Archivarin | neutral | 4 | Basis | 101200 | 74,7 % | 52,6 % | +2,6 | 36610 | 45,3 % | 50,3 % | +0,3 |
| Wachhund | neutral | 2 | Basis | 101200 | 78,3 % | 48,9 % | −1,1 | 36624 | 49,5 % | 48,3 % | −1,7 |
| Veteran | neutral | 5 | Basis | 101200 | 79,3 % | 52,5 % | +2,5 | 42932 | 50,0 % | 49,0 % | −1,1 |
| Belagerungsturm | neutral | 6 | Basis | 101200 | 76,8 % | 55,2 % | +5,2 | 55236 | 51,6 % | 50,4 % | +0,4 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 38534 | 50,4 % | 50,1 % | +0,1 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 26942 | 52,7 % | 52,4 % | +2,4 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 43002 | 51,4 % | 54,2 % | +4,1 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 38894 | 49,5 % | 50,0 % | +0,0 |
| Nachtwächter | neutral | 2 | Basis | – | – | – | – | 36516 | 48,7 % | 49,8 % | −0,2 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 36310 | 40,0 % | 49,7 % | −0,3 |
| Heilkräuter | neutral | 1 | Basis | – | – | – | – | 27306 | 49,7 % | 47,5 % | −2,5 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 36570 | 56,5 % | 50,0 % | −0,0 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 49242 | 52,4 % | 53,4 % | +3,4 |
| Ordensritter | neutral | 3 | Gewöhnlich | – | – | – | – | 38316 | 53,5 % | 51,2 % | +1,2 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 36026 | 48,0 % | 48,7 % | −1,3 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 36636 | 53,3 % | 53,0 % | +3,0 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 36122 | 48,7 % | 52,4 % | +2,4 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 38702 | 56,4 % | 53,0 % | +3,0 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 36350 | 28,7 % | 45,4 % | −4,6 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 36096 | 48,1 % | 47,1 % | −2,9 |
| Prätorianer | neutral | 5 | Gewöhnlich | – | – | – | – | 43080 | 47,6 % | 50,5 % | +0,5 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 35810 | 52,4 % | 54,5 % | +4,5 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 35954 | 47,3 % | 54,4 % | +4,4 |
| Löwin der Arena | neutral | 5 | Selten | – | – | – | – | 43010 | 52,3 % | 51,8 % | +1,7 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 43096 | 49,4 % | 51,0 % | +1,0 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 36552 | 42,6 % | 49,6 % | −0,3 |
| Trojanisches Pferd | neutral | 6 | Selten | – | – | – | – | 55432 | 54,7 % | 51,2 % | +1,2 |
| Brander | neutral | 7 | Episch | – | – | – | – | 49600 | 46,9 % | 52,7 % | +2,6 |
| Vergessene Weisheit | neutral | 4 | Episch | – | – | – | – | 36244 | 24,2 % | 48,7 % | −1,3 |
| Burgbesatzung | neutral | 8 | Episch | – | – | – | – | 34338 | 45,1 % | 59,0 % | +8,9 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 49318 | 54,5 % | 52,8 % | +2,7 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 35690 | 43,5 % | 52,3 % | +2,3 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 34054 | 44,3 % | 55,8 % | +5,7 |
| Agent des Zehnerrats | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1656 | 58,7 % | 51,0 % | +4,0 |
| Plünderer am Rhein | Widukind | 3 | Gewöhnlich | – | – | – | – | 1762 | 51,0 % | 47,2 % | −2,5 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1628 | 50,7 % | 55,0 % | +1,8 |
| Zwanzig Städte in Flammen | Vercingetorix | 3 | Selten | – | – | – | – | 1728 | 49,6 % | 47,5 % | −1,0 |
| Eid der Arkanisten | Böttger | 1 | Selten | – | – | – | – | 1168 | 62,9 % | 53,3 % | +3,4 |
| Böhmischer Söldner | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1672 | 48,0 % | 46,6 % | −5,1 |
| Brandschatzung | Wiprecht | 1 | Gewöhnlich | – | – | – | – | 1278 | 60,7 % | 53,5 % | +1,8 |
| Heimlicher Bote | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1666 | 52,6 % | 53,0 % | +1,8 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 36278 | 51,1 % | 48,6 % | −1,4 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 27130 | 54,7 % | 52,3 % | +2,3 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 36784 | 56,3 % | 52,9 % | +2,9 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 38502 | 51,1 % | 52,5 % | +2,5 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 38286 | 55,1 % | 50,4 % | +0,4 |
| Ruderer der Triere | Perikles | 1 | Basis | 4600 | 79,4 % | 50,4 % | +1,5 | 1184 | 56,2 % | 57,0 % | +8,2 |
| Lange Mauern | Perikles | 2 | Basis | 4600 | 79,5 % | 45,5 % | −3,5 | 1594 | 55,9 % | 44,1 % | −4,7 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 4600 | 81,7 % | 52,3 % | +3,4 | 1696 | 57,9 % | 54,4 % | +5,6 |
| Strategos | Perikles | 3 | Basis | 4600 | 79,8 % | 51,7 % | +2,8 | 1678 | 58,6 % | 53,5 % | +4,7 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1694 | 48,5 % | 43,2 % | −5,6 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1674 | 60,9 % | 55,3 % | +6,4 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1498 | 53,0 % | 55,0 % | +6,2 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1636 | 40,7 % | 50,2 % | +1,4 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1582 | 38,1 % | 42,5 % | −6,3 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 2416 | 52,7 % | 50,4 % | +1,5 |
| Pilumwerfer | Agrippa | 1 | Basis | 4600 | 77,6 % | 52,3 % | +4,0 | 1236 | 55,9 % | 53,9 % | +4,1 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 4600 | 72,9 % | 49,9 % | +1,5 | 1684 | 45,8 % | 50,2 % | +0,4 |
| Castra | Agrippa | 3 | Basis | 4600 | 83,2 % | 50,1 % | +1,8 | 1736 | 58,8 % | 48,1 % | −1,7 |
| Testudo | Agrippa | 2 | Basis | 4600 | 74,6 % | 50,4 % | +2,1 | 1718 | 51,2 % | 52,6 % | +2,8 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1726 | 53,1 % | 50,6 % | +0,8 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1692 | 48,5 % | 54,3 % | +4,5 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1982 | 52,8 % | 53,4 % | +3,6 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1632 | 54,3 % | 44,9 % | −4,9 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1618 | 40,5 % | 51,2 % | +1,4 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1918 | 41,2 % | 47,3 % | −2,5 |
| Bogenschütze aus Elkab | Ahhotep | 1 | Basis | 4600 | 82,4 % | 51,3 % | −0,2 | 1260 | 55,1 % | 56,1 % | +4,0 |
| Krieger der Nilflotte | Ahhotep | 2 | Basis | 4600 | 80,9 % | 51,1 % | −0,4 | 1654 | 52,5 % | 51,3 % | −0,8 |
| Pfeilregen vor Auaris | Ahhotep | 2 | Basis | 4600 | 78,8 % | 52,4 % | +0,9 | 1536 | 44,8 % | 50,5 % | −1,6 |
| Speerträger aus Theben | Ahhotep | 3 | Basis | 4600 | 83,9 % | 52,3 % | +0,8 | 1774 | 52,4 % | 51,5 % | −0,6 |
| Priester der Selket | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1718 | 51,2 % | 53,5 % | +1,4 |
| Medjai-Kundschafter | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1692 | 54,9 % | 53,5 % | +1,4 |
| Erbeuteter Streitwagen | Ahhotep | 6 | Selten | – | – | – | – | 2536 | 53,5 % | 53,6 % | +1,5 |
| Überfall auf Nefrusi | Ahhotep | 3 | Selten | – | – | – | – | 1648 | 52,0 % | 49,0 % | −3,1 |
| Ahmose, Befreier Ägyptens | Ahhotep | 5 | Episch | – | – | – | – | 2040 | 54,9 % | 49,0 % | −3,1 |
| Zeremonialaxt des Ahmose | Ahhotep | 6 | Legendär | – | – | – | – | 2392 | 46,0 % | 55,1 % | +3,0 |
| Kopistin der Chronik | Anna | 1 | Basis | 4600 | 81,5 % | 53,6 % | +3,0 | 1326 | 53,6 % | 50,4 % | +2,2 |
| Pantokrator-Spital | Anna | 3 | Basis | 4600 | 73,1 % | 51,6 % | +1,0 | 1684 | 30,6 % | 50,5 % | +2,4 |
| Warägergardist | Anna | 3 | Basis | 4600 | 82,7 % | 55,1 % | +4,5 | 1770 | 55,1 % | 58,2 % | +10,1 |
| Hofärztin | Anna | 3 | Basis | 4600 | 81,8 % | 50,7 % | +0,1 | 1758 | 42,4 % | 45,0 % | −3,2 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1644 | 47,0 % | 58,2 % | +10,0 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1586 | 46,6 % | 57,0 % | +8,8 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1872 | 48,0 % | 55,1 % | +6,9 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1782 | 36,9 % | 47,2 % | −1,0 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1830 | 48,4 % | 47,8 % | −0,4 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 2378 | 49,7 % | 48,5 % | +0,3 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 4600 | 82,5 % | 48,7 % | +0,0 | 1220 | 59,5 % | 51,6 % | +2,9 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 4600 | 81,7 % | 48,9 % | +0,2 | 1628 | 55,3 % | 49,9 % | +1,2 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 4600 | 83,3 % | 49,3 % | +0,7 | 1596 | 58,0 % | 47,5 % | −1,1 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 4600 | 82,8 % | 47,9 % | −0,7 | 1702 | 58,8 % | 51,3 % | +2,7 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1502 | 58,4 % | 47,0 % | −1,6 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1652 | 54,1 % | 49,2 % | +0,6 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1728 | 53,9 % | 52,8 % | +4,2 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1702 | 55,1 % | 41,9 % | −6,7 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 2514 | 57,3 % | 59,8 % | +11,2 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 1914 | 45,6 % | 44,7 % | −3,9 |
| Lehnsmann | Theophanu | 1 | Basis | 4600 | 82,1 % | 45,2 % | −2,6 | 1130 | 57,5 % | 56,9 % | +3,3 |
| Bogenschütze der Pfalz | Theophanu | 2 | Basis | 4600 | 82,6 % | 46,2 % | −1,6 | 1526 | 56,6 % | 56,9 % | +3,3 |
| Treueschwur | Theophanu | 1 | Basis | 4600 | 82,5 % | 49,4 % | +1,6 | 1192 | 51,0 % | 57,1 % | +3,5 |
| Stiftsdame aus Quedlinburg | Theophanu | 2 | Basis | 4600 | 82,8 % | 46,0 % | −1,8 | 1604 | 57,9 % | 55,2 % | +1,6 |
| Späher an der Elbe | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1584 | 58,6 % | 55,6 % | +2,0 |
| Heerbann | Theophanu | 4 | Gewöhnlich | – | – | – | – | 1658 | 55,6 % | 57,4 % | +3,8 |
| St. Pantaleon in Köln | Theophanu | 2 | Selten | – | – | – | – | 1642 | 56,2 % | 53,1 % | −0,4 |
| Haft in Utrecht | Theophanu | 3 | Selten | – | – | – | – | 1770 | 51,0 % | 50,4 % | −3,1 |
| Willigis, Erzbischof von Mainz | Theophanu | 5 | Episch | – | – | – | – | 2010 | 51,7 % | 56,4 % | +2,8 |
| Otto II., Kaiser | Theophanu | 6 | Legendär | – | – | – | – | 2638 | 51,1 % | 54,8 % | +1,3 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1782 | 55,8 % | 52,0 % | +2,0 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1700 | 53,1 % | 43,6 % | −6,4 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1626 | 56,6 % | 48,8 % | −0,0 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1662 | 54,5 % | 53,1 % | +4,3 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1728 | 60,9 % | 54,3 % | +1,1 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1626 | 58,9 % | 47,1 % | −6,1 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1632 | 48,6 % | 47,3 % | +0,4 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 2388 | 44,6 % | 49,6 % | +2,7 |
| Heerlager an der Weser | Widukind | 3 | Gewöhnlich | – | – | – | – | 1668 | 32,5 % | 46,8 % | −3,0 |
| Versammlung in Marklo | Widukind | 4 | Selten | – | – | – | – | 1528 | 31,4 % | 47,6 % | −2,1 |
| Barde der Arverner | Vercingetorix | 2 | Gewöhnlich | – | – | – | – | 1720 | 54,7 % | 49,2 % | +0,6 |
| Gallische Reiterei | Vercingetorix | 5 | Selten | – | – | – | – | 1874 | 49,0 % | 48,1 % | −0,5 |
| Laborbuch | Böttger | 1 | Gewöhnlich | – | – | – | – | 1212 | 55,8 % | 51,9 % | +1,9 |
| Weißes Gold | Böttger | 3 | Selten | – | – | – | – | 1760 | 3,4 % | 45,2 % | −4,7 |
| Adlige Stifterin | Hildegard | 1 | Gewöhnlich | – | – | – | – | 1306 | 52,1 % | 58,1 % | +8,3 |
| Weihe der Klosterkirche | Hildegard | 4 | Selten | – | – | – | – | 1644 | 32,8 % | 48,5 % | −1,4 |
| Feldmesser | Wiprecht | 2 | Gewöhnlich | – | – | – | – | 1570 | 53,0 % | 52,5 % | +0,7 |
| Beuterecht | Wiprecht | 1 | Selten | – | – | – | – | 1294 | 59,4 % | 53,1 % | +1,4 |
| Ritter aus Murau | Ulrich | 4 | Selten | – | – | – | – | 1578 | 45,5 % | 49,3 % | −1,9 |
| Frische Lanze | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1674 | 49,4 % | 49,5 % | −1,7 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1580 | 51,5 % | 51,5 % | +2,6 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1694 | 28,8 % | 45,0 % | −3,8 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1662 | 49,2 % | 48,1 % | −1,6 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1624 | 39,3 % | 49,0 % | −0,8 |
| Pfeilmacher aus Edfu | Ahhotep | 2 | Gewöhnlich | – | – | – | – | 1720 | 57,2 % | 53,4 % | +1,3 |
| Gift der Hornviper | Ahhotep | 3 | Selten | – | – | – | – | 1622 | 44,3 % | 53,4 % | +1,3 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1740 | 54,5 % | 49,7 % | +1,5 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 2348 | 57,7 % | 57,4 % | +9,3 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1622 | 59,2 % | 49,2 % | +0,6 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1574 | 55,1 % | 48,2 % | −0,5 |
| Kanzler der Kaiserin | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1622 | 54,7 % | 56,9 % | +3,3 |
| Siegel der Kaiserin | Theophanu | 2 | Selten | – | – | – | – | 1626 | 42,7 % | 53,5 % | −0,1 |
| Olympionike | Griechenland und Hellenismus | 4 | Gewöhnlich | – | – | – | – | 6578 | 53,1 % | 55,4 % | +6,0 |
| Rhapsode | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 6566 | 52,2 % | 51,8 % | +2,4 |
| Marathonläufer | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 6544 | 52,4 % | 52,4 % | +3,0 |
| Orakel von Delphi | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 6972 | 26,9 % | 47,9 % | −1,5 |
| Leuchtturm von Pharos | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 7096 | 53,4 % | 43,9 % | −5,5 |
| Akropolis | Griechenland und Hellenismus | 2 | Selten | – | – | – | – | 6460 | 54,9 % | 50,3 % | +0,9 |
| Bibliothek von Alexandria | Griechenland und Hellenismus | 3 | Episch | – | – | – | – | 7068 | 49,1 % | 47,8 % | −1,7 |
| Knappe | Mittelalter im Reich | 1 | Gewöhnlich | – | – | – | – | 6308 | 53,1 % | 51,8 % | +0,6 |
| Armbrustschütze | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 8872 | 57,0 % | 56,0 % | +4,7 |
| Mönch von Cluny | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 8804 | 49,3 % | 54,5 % | +3,2 |
| Hansekogge | Mittelalter im Reich | 4 | Gewöhnlich | – | – | – | – | 7978 | 45,9 % | 50,5 % | −0,8 |
| Turnierritter | Mittelalter im Reich | 4 | Selten | – | – | – | – | 8036 | 47,9 % | 54,5 % | +3,2 |
| Burgfried | Mittelalter im Reich | 2 | Selten | – | – | – | – | 8354 | 55,8 % | 43,3 % | −7,9 |
| Tribok | Mittelalter im Reich | 4 | Episch | – | – | – | – | 8086 | 30,1 % | 48,6 % | −2,7 |
| Landsknecht | Frühe Neuzeit | 1 | Gewöhnlich | – | – | – | – | 3584 | 58,1 % | 53,0 % | +4,1 |
| Buchdrucker aus Mainz | Frühe Neuzeit | 3 | Gewöhnlich | – | – | – | – | 5438 | 54,8 % | 52,2 % | +3,3 |
| Leipziger Kaffeehaus | Frühe Neuzeit | 2 | Gewöhnlich | – | – | – | – | 4910 | 47,7 % | 48,9 % | −0,0 |
| Kartaunen-Salve | Frühe Neuzeit | 3 | Selten | – | – | – | – | 5362 | 57,8 % | 50,4 % | +1,5 |
| Kriegsgaleone | Frühe Neuzeit | 5 | Selten | – | – | – | – | 5590 | 58,0 % | 48,9 % | +0,1 |
| Stehendes Heer | Frühe Neuzeit | 5 | Episch | – | – | – | – | 5624 | 59,3 % | 51,3 % | +2,5 |
| Sternschanze | Frühe Neuzeit | 2 | Episch | – | – | – | – | 4882 | 62,6 % | 42,5 % | −6,4 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 38160 | 32,0 % | 45,0 % | −5,0 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 36766 | 56,9 % | 44,8 % | −5,2 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 36374 | 27,5 % | 43,3 % | −6,7 |
| Thebanischer Plänkler | Epaminondas | 1 | Basis | 4600 | 78,2 % | 47,6 % | −0,3 | 1322 | 51,7 % | 54,3 % | +4,3 |
| Böotischer Hoplit | Epaminondas | 2 | Basis | 4600 | 78,9 % | 47,7 % | −0,1 | 1702 | 52,6 % | 56,0 % | +6,0 |
| Fünfzig Schilde tief | Epaminondas | 2 | Basis | 4600 | 74,4 % | 47,7 % | −0,1 | 1714 | 45,9 % | 50,9 % | +0,9 |
| Böotarch | Epaminondas | 3 | Basis | 4600 | 78,2 % | 47,5 % | −0,3 | 1828 | 52,7 % | 54,0 % | +3,9 |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | Gewöhnlich | – | – | – | – | 1918 | 49,3 % | 54,6 % | +4,5 |
| Schlacht bei Leuktra | Epaminondas | 4 | Gewöhnlich | – | – | – | – | 1574 | 42,4 % | 49,2 % | −0,8 |
| Befreiung Messeniens | Epaminondas | 5 | Selten | – | – | – | – | 1908 | 49,8 % | 52,2 % | +2,1 |
| Thebanischer Phalangit | Epaminondas | 4 | Selten | – | – | – | – | 1624 | 45,8 % | 55,1 % | +5,0 |
| Megalopolis | Epaminondas | 3 | Episch | – | – | – | – | 1712 | 43,5 % | 45,0 % | −5,0 |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | Legendär | – | – | – | – | 2578 | 44,8 % | 51,8 % | +1,8 |
| Veles | Fabius | 1 | Basis | 4600 | 88,3 % | 48,4 % | −0,2 | 1274 | 59,9 % | 53,6 % | +4,2 |
| Triarier | Fabius | 2 | Basis | 4600 | 86,7 % | 48,7 % | +0,2 | 1634 | 55,3 % | 51,5 % | +2,0 |
| Hinhalten | Fabius | 2 | Basis | 4600 | 85,5 % | 48,4 % | −0,1 | 1650 | 60,9 % | 50,0 % | +0,6 |
| Konsul der Republik | Fabius | 4 | Basis | 4600 | 84,6 % | 49,1 % | +0,6 | 1672 | 50,1 % | 48,8 % | −0,7 |
| Verbrannte Erde | Fabius | 3 | Gewöhnlich | – | – | – | – | 1834 | 62,3 % | 48,4 % | −1,1 |
| Späher am Volturnus | Fabius | 2 | Gewöhnlich | – | – | – | – | 1718 | 58,2 % | 50,4 % | +0,9 |
| Minucius, der Reiteroberst | Fabius | 4 | Selten | – | – | – | – | 1740 | 51,7 % | 52,4 % | +2,9 |
| Rückeroberung von Tarent | Fabius | 6 | Selten | – | – | – | – | 2468 | 46,2 % | 55,6 % | +6,2 |
| Lager auf den Höhen | Fabius | 3 | Episch | – | – | – | – | 1758 | 63,9 % | 46,7 % | −2,8 |
| Marcellus, Schwert Roms | Fabius | 6 | Legendär | – | – | – | – | 2470 | 48,1 % | 48,6 % | −0,8 |
| Botin der Cherusker | Thusnelda | 1 | Basis | 4600 | 77,6 % | 53,1 % | +2,6 | 1246 | 53,3 % | 55,7 % | +5,8 |
| Hüterin des Herdfeuers | Thusnelda | 2 | Basis | 4600 | 79,1 % | 51,3 % | +0,8 | 1734 | 51,6 % | 47,3 % | −2,6 |
| Ruf zum Thing | Thusnelda | 3 | Basis | 4600 | 72,6 % | 48,9 % | −1,6 | 1692 | 43,3 % | 48,6 % | −1,3 |
| Krieger im Keil | Thusnelda | 3 | Basis | 4600 | 80,5 % | 52,5 % | +2,0 | 1752 | 55,5 % | 51,5 % | +1,6 |
| Varusschlacht | Thusnelda | 4 | Gewöhnlich | – | – | – | – | 1678 | 46,2 % | 49,8 % | −0,1 |
| Krieger der Sippe | Thusnelda | 3 | Gewöhnlich | – | – | – | – | 1838 | 51,3 % | 51,8 % | +1,9 |
| Heiliger Hain | Thusnelda | 2 | Selten | – | – | – | – | 1638 | 58,1 % | 48,4 % | −1,5 |
| Seitenwechsel | Thusnelda | 5 | Selten | – | – | – | – | 2050 | 45,0 % | 52,3 % | +2,4 |
| Arminius, Fürst der Cherusker | Thusnelda | 4 | Episch | – | – | – | – | 1636 | 43,5 % | 47,7 % | −2,3 |
| Bund der Stämme | Thusnelda | 8 | Legendär | – | – | – | – | 1622 | 42,1 % | 56,2 % | +6,3 |
| Mamlukenrekrut | Baibars | 1 | Basis | 4600 | 83,2 % | 49,0 % | −1,6 | 1268 | 51,9 % | 50,8 % | +1,2 |
| Barid-Kurier | Baibars | 2 | Basis | 4600 | 79,3 % | 51,5 % | +0,9 | 1644 | 47,1 % | 52,0 % | +2,3 |
| Ain Dschalut | Baibars | 3 | Basis | 4600 | 85,2 % | 51,6 % | +1,0 | 1822 | 58,9 % | 50,6 % | +0,9 |
| Bogenreiter der Bahriya | Baibars | 3 | Basis | 4600 | 83,2 % | 49,6 % | −1,0 | 1714 | 49,1 % | 49,7 % | +0,0 |
| Manjaniq-Meister | Baibars | 4 | Gewöhnlich | – | – | – | – | 1622 | 49,9 % | 51,4 % | +1,8 |
| Vorgetäuschte Flucht | Baibars | 1 | Gewöhnlich | – | – | – | – | 1200 | 18,6 % | 43,2 % | −6,4 |
| Qutuz, Sultan von Ägypten | Baibars | 5 | Selten | – | – | – | – | 2052 | 45,2 % | 55,3 % | +5,7 |
| Sturm auf Antiochia | Baibars | 2 | Selten | – | – | – | – | 1660 | 47,5 % | 48,3 % | −1,4 |
| Zitadelle von Kairo | Baibars | 4 | Episch | – | – | – | – | 1744 | 33,3 % | 46,7 % | −2,9 |
| Qalawun, Emir der Bahriya | Baibars | 6 | Legendär | – | – | – | – | 2720 | 46,3 % | 57,1 % | +7,5 |
| Schanzarbeiter | Vauban | 2 | Basis | 4600 | 76,6 % | 47,8 % | −1,1 | 1742 | 32,4 % | 47,6 % | −0,4 |
| Grenadier | Vauban | 2 | Basis | 4600 | 84,0 % | 49,9 % | +1,0 | 1670 | 61,5 % | 49,1 % | +1,1 |
| Salve von der Bastion | Vauban | 2 | Basis | 4600 | 78,1 % | 47,8 % | −1,1 | 1724 | 36,0 % | 46,0 % | −2,0 |
| Ingenieur des Königs | Vauban | 3 | Basis | 4600 | 83,9 % | 50,5 % | +1,6 | 1884 | 60,7 % | 54,7 % | +6,7 |
| Festungsgeschütz | Vauban | 3 | Gewöhnlich | – | – | – | – | 1822 | 58,1 % | 45,5 % | −2,5 |
| Faschinen | Vauban | 2 | Gewöhnlich | – | – | – | – | 1644 | 46,7 % | 50,3 % | +2,3 |
| Minengang | Vauban | 3 | Selten | – | – | – | – | 1826 | 51,8 % | 48,0 % | −0,0 |
| Zitadelle von Lille | Vauban | 4 | Selten | – | – | – | – | 1696 | 58,1 % | 36,1 % | −11,9 |
| Louvois, Kriegsminister | Vauban | 6 | Episch | – | – | – | – | 2514 | 55,1 % | 48,2 % | +0,2 |
| Ludwig XIV., der Sonnenkönig | Vauban | 5 | Legendär | – | – | – | – | 1922 | 43,7 % | 52,1 % | +4,1 |
| Speerwerfer vom Mont Lassois | Vix | 1 | Basis | 4600 | 83,5 % | 53,6 % | +2,6 | 1124 | 54,7 % | 52,9 % | +1,0 |
| Prunkdolch | Vix | 2 | Basis | 4600 | 76,7 % | 53,9 % | +2,9 | 1660 | 39,9 % | 53,5 % | +1,6 |
| Reiter an der Seine | Vix | 3 | Basis | 4600 | 82,9 % | 52,9 % | +1,9 | 1802 | 45,7 % | 53,6 % | +1,7 |
| Seherin | Vix | 3 | Basis | 4600 | 81,8 % | 52,9 % | +1,9 | 1792 | 42,1 % | 54,0 % | +2,1 |
| Aufgebot des Fürstensitzes | Vix | 4 | Gewöhnlich | – | – | – | – | 1744 | 49,9 % | 56,1 % | +4,2 |
| Trankopfer | Vix | 1 | Gewöhnlich | – | – | – | – | 1220 | 55,2 % | 54,1 % | +2,2 |
| Gelage am Krater | Vix | 1 | Selten | – | – | – | – | 1230 | 58,6 % | 54,2 % | +2,3 |
| Schleuderer am Wall | Vix | 4 | Selten | – | – | – | – | 1640 | 53,1 % | 58,1 % | +6,2 |
| Halle auf dem Mont Lassois | Vix | 1 | Episch | – | – | – | – | 1264 | 59,1 % | 53,6 % | +1,7 |
| Gesandter aus Massalia | Vix | 6 | Legendär | – | – | – | – | 2664 | 48,7 % | 57,0 % | +5,1 |
| Gladiator | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 6774 | 57,4 % | 52,2 % | +2,7 |
| Senator der Kurie | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 7020 | 50,0 % | 50,8 % | +1,4 |
| Centurio | Rom und Germanien | 2 | Gewöhnlich | – | – | – | – | 6898 | 55,4 % | 53,8 % | +4,3 |
| Triumphzug | Rom und Germanien | 3 | Selten | – | – | – | – | 6874 | 44,6 % | 47,0 % | −2,4 |
| Via Appia | Rom und Germanien | 2 | Selten | – | – | – | – | 6844 | 53,9 % | 46,9 % | −2,5 |
| Vestalin am ewigen Feuer | Rom und Germanien | 3 | Selten | – | – | – | – | 6950 | 56,2 % | 47,5 % | −1,9 |
| Pax Romana | Rom und Germanien | 5 | Episch | – | – | – | – | 7822 | 53,3 % | 43,4 % | −6,1 |
| Wagenbauer | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 4950 | 49,6 % | 55,1 % | +2,7 |
| Schreiber im Lebenshaus | Frühzeit und Ägypten | 3 | Gewöhnlich | – | – | – | – | 5126 | 52,6 % | 53,3 % | +0,9 |
| Schuss vom Streitwagen | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 4952 | 59,9 % | 57,2 % | +4,8 |
| Wache der Medjai | Frühzeit und Ägypten | 4 | Selten | – | – | – | – | 4974 | 45,9 % | 53,3 % | +0,9 |
| Angriff der Streitwagen | Frühzeit und Ägypten | 3 | Selten | – | – | – | – | 5290 | 53,7 % | 55,3 % | +3,0 |
| Bernsteinstraße | Frühzeit und Ägypten | 2 | Selten | – | – | – | – | 4782 | 54,9 % | 49,8 % | −2,6 |
| Festung Buhen | Frühzeit und Ägypten | 3 | Episch | – | – | – | – | 5128 | 49,5 % | 54,6 % | +2,2 |
| Akrit der Grenzmark | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 4994 | 54,7 % | 50,6 % | +2,3 |
| Gelehrter im Haus der Weisheit | Kreuzzüge | 3 | Gewöhnlich | – | – | – | – | 5262 | 50,9 % | 51,2 % | +2,9 |
| Tribut in Goldbyzantinern | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 4994 | 28,2 % | 45,7 % | −2,5 |
| Arzt des Bimaristan | Kreuzzüge | 3 | Selten | – | – | – | – | 5226 | 59,5 % | 54,6 % | +6,4 |
| Theodosianische Mauern | Kreuzzüge | 2 | Selten | – | – | – | – | 5018 | 57,6 % | 44,1 % | −4,1 |
| Hagia Sophia | Kreuzzüge | 3 | Episch | – | – | – | – | 5196 | 60,3 % | 44,3 % | −4,0 |
| Ibn an-Nafis, Arzt von Kairo | Kreuzzüge | 4 | Episch | – | – | – | – | 4832 | 53,3 % | 50,4 % | +2,2 |
