# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `998f16849d` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die 21 anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,5.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 50600 | ✗ 20/22 | ✗ 199/231 | ✓ 47,3 % | – | 0 | 24 |
| Zufallsdecks | 50600 | ✗ 21/22 | ✗ 223/231 | ✓ 50,7 % | ✓ 53,5 % (+3,5) | 0 | 21 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Leonidas I. | **54,3 %** | 52,2 % | 55,7 % | Epaminondas 40,0 % | Fabius 72,0 % | Defensiv: 37,3 % | ✗ |
| Ahhotep I. | **52,0 %** | 50,7 % | 52,9 % | Leonidas 36,5 % | Baibars 61,0 % | Aggressiv: 46,1 % | ✓ |
| Hypatia | **51,8 %** | 47,8 % | 55,4 % | Vix 44,5 % | Hildegard 62,5 % | Kombinierend: 46,1 % | ✓ |
| Johann Friedrich Böttger | **51,5 %** | 52,5 % | 50,3 % | Widukind 39,5 % | Vercingetorix 62,5 % | Kombinierend: 42,1 % | ✓ |
| Baibars | **51,4 %** | 49,9 % | 52,7 % | Fabius 32,5 % | Wiprecht 63,0 % | Aggressiv: 41,2 % | ✓ |
| Fürstin von Vix | **51,2 %** | 52,3 % | 49,9 % | Widukind 33,0 % | Imhotep 64,0 % | Kombinierend: 41,0 % | ✓ |
| Anna Komnene | **51,0 %** | 52,1 % | 49,8 % | Vix 36,5 % | Fabius 68,5 % | Kombinierend: 39,9 % | ✓ |
| Thusnelda | **50,6 %** | 47,2 % | 54,0 % | Widukind 39,0 % | Fabius 67,5 % | Kombinierend: 45,5 % | ✓ |
| Widukind | **50,5 %** | 46,0 % | 54,8 % | Vauban 38,0 % | Agrippa 67,5 % | Aggressiv: 46,0 % | ✓ |
| Hildegard von Bingen | **50,3 %** | 46,1 % | 54,5 % | Hypatia 37,5 % | Ulrich 62,0 % | Aggressiv: 52,2 % | ✓ |
| Wiprecht von Groitzsch | **50,1 %** | 46,9 % | 53,2 % | Baibars 37,0 % | Fabius 60,5 % | Aggressiv: 42,9 % | ✓ |
| Enrico Dandolo | **49,6 %** | 47,8 % | 51,4 % | Widukind 41,5 % | Wiprecht 54,5 % | Kombinierend: 42,1 % | ✓ |
| Perikles | **49,1 %** | 44,8 % | 53,5 % | Hildegard 42,5 % | Agrippa 57,5 % | Defensiv: 40,0 % | ✓ |
| Nezahualcóyotl | **49,1 %** | 46,3 % | 52,0 % | Baibars 39,5 % | Vauban 62,0 % | Defensiv: 39,1 % | ✓ |
| Vauban | **49,0 %** | 43,0 % | 55,2 % | Nezahualcóyotl 38,0 % | Theophanu 64,0 % | Defensiv: 41,8 % | ✓ |
| Ulrich von Liechtenstein | **48,9 %** | 46,1 % | 51,9 % | Hildegard 38,0 % | Dandolo 56,0 % | Aggressiv: 48,8 % | ✓ |
| Fabius Maximus | **48,7 %** | 46,4 % | 51,3 % | Leonidas 28,0 % | Epaminondas 70,5 % | Defensiv: 40,0 % | ✓ |
| Theophanu | **48,7 %** | 44,1 % | 53,4 % | Vauban 36,0 % | Widukind 59,0 % | Defensiv: 40,1 % | ✓ |
| Imhotep | **48,6 %** | 45,8 % | 51,7 % | Vix 36,0 % | Vercingetorix 58,0 % | Defensiv: 36,8 % | ✓ |
| Marcus Agrippa | **48,6 %** | 44,1 % | 53,3 % | Widukind 32,5 % | Vercingetorix 57,0 % | Kombinierend: 44,6 % | ✓ |
| Epaminondas | **48,5 %** | 45,7 % | 51,5 % | Fabius 29,5 % | Leonidas 60,0 % | Aggressiv: 42,9 % | ✓ |
| Vercingetorix | **46,5 %** | 41,7 % | 51,9 % | Fabius 36,0 % | Ulrich 58,5 % | Aggressiv: 42,9 % | ✗ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Widu. | Verc. | Bött. | Hild. | Wipr. | Ulri. | Peri. | Agri. | Ahho. | Anna. | Neza. | Theo. | Epam. | Fabi. | Thus. | Baib. | Vaub. | Vix. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 52 | 55 | 50 | 52 | **62** | 55 | 57 | 54 | 53 | 55 | 55 | **64** | 52 | 59 | 48 | 40 | **72** | 56 | 45 | **62** | 48 |
| Hypatia | 49 | · | 53 | 51 | 52 | 50 | 50 | **63** | 52 | 47 | 56 | 48 | 51 | 45 | 51 | **62** | 60 | 47 | 54 | 54 | 54 | 45 |
| Imhotep | 45 | 47 | · | 49 | 51 | 58 | 41 | 45 | 51 | 55 | 50 | 45 | 53 | 44 | 53 | 48 | 45 | 55 | 52 | 47 | 56 | **36** |
| Dandolo | 51 | 50 | 52 | · | 42 | 51 | 42 | 46 | 55 | 44 | 54 | 52 | 45 | 50 | 52 | 54 | 49 | 50 | 53 | 51 | 54 | 50 |
| Widukind | 48 | 48 | 49 | 59 | · | 47 | **61** | 46 | 47 | 47 | 52 | **68** | 47 | 51 | 49 | 41 | 48 | 47 | **61** | 43 | **38** | **67** |
| Vercingetorix | **39** | 50 | 42 | 50 | 53 | · | **38** | 56 | 47 | 59 | 47 | 43 | 41 | 46 | 48 | 47 | 53 | **36** | 47 | 49 | 42 | 48 |
| Böttger | 45 | 51 | 60 | 58 | **40** | **63** | · | 45 | 48 | 47 | 51 | 55 | 44 | 46 | 56 | 52 | 49 | **62** | 53 | 53 | 60 | 50 |
| Hildegard | 43 | **38** | 55 | 54 | 54 | 44 | 55 | · | **61** | **62** | 57 | 51 | 43 | 52 | 47 | 42 | 55 | 48 | 46 | 53 | 41 | 59 |
| Wiprecht | 46 | 49 | 50 | 45 | 53 | 53 | 53 | **39** | · | 45 | 48 | 53 | 56 | 52 | 60 | 49 | 51 | **61** | 48 | **37** | 49 | 60 |
| Ulrich | 48 | 53 | 45 | 56 | 53 | 42 | 53 | **38** | 55 | · | 50 | 52 | 44 | 52 | 49 | 45 | 56 | 42 | 54 | 49 | 43 | 50 |
| Perikles | 45 | 44 | 50 | 47 | 49 | 53 | 50 | 43 | 52 | 50 | · | 57 | 47 | 54 | 51 | 48 | 52 | 53 | 46 | 44 | 47 | 51 |
| Agrippa | 45 | 53 | 55 | 48 | **32** | 57 | 45 | 50 | 48 | 48 | 43 | · | 49 | 50 | 47 | 49 | 56 | 54 | **36** | 53 | 57 | 48 |
| Ahhotep | **37** | 50 | 48 | 55 | 53 | 60 | 56 | 57 | 44 | 56 | 53 | 52 | · | 46 | 45 | 56 | 60 | 52 | 45 | **61** | 56 | 53 |
| Anna | 48 | 55 | 56 | 51 | 50 | 54 | 54 | 49 | 48 | 48 | 47 | 50 | 54 | · | 47 | 54 | 50 | **69** | 46 | 52 | 56 | **37** |
| Nezahualcóyotl | 42 | 49 | 47 | 49 | 52 | 52 | 44 | 53 | 41 | 51 | 49 | 53 | 55 | 53 | · | 47 | 42 | 55 | 49 | **40** | **62** | 49 |
| Theophanu | 52 | **39** | 53 | 46 | 59 | 53 | 48 | 59 | 52 | 55 | 52 | 52 | 44 | 46 | 53 | · | 45 | 42 | 55 | **37** | **36** | 47 |
| Epaminondas | 60 | 41 | 55 | 51 | 52 | 47 | 51 | 45 | 50 | 44 | 48 | 44 | 41 | 50 | 59 | 55 | · | **30** | 57 | **38** | 49 | 53 |
| Fabius | **28** | 53 | 45 | 51 | 53 | **64** | **39** | 53 | **40** | 59 | 47 | 46 | 48 | **31** | 45 | 58 | **71** | · | **33** | **68** | 55 | **38** |
| Thusnelda | 44 | 46 | 49 | 47 | **39** | 53 | 48 | 54 | 52 | 46 | 54 | **65** | 55 | 54 | 52 | 45 | 43 | **68** | · | 45 | 56 | 48 |
| Baibars | 55 | 46 | 53 | 49 | 57 | 52 | 48 | 48 | **63** | 52 | 56 | 48 | **39** | 49 | **61** | **63** | **62** | **32** | 55 | · | 43 | 52 |
| Vauban | **39** | 47 | 44 | 47 | **62** | 59 | 41 | 60 | 52 | 57 | 53 | 43 | 44 | 44 | **38** | **64** | 52 | 45 | 44 | 57 | · | 41 |
| Vix | 53 | 55 | **64** | 50 | **33** | 53 | 50 | 41 | 41 | 50 | 49 | 52 | 47 | **64** | 52 | 53 | 47 | **62** | 53 | 49 | 60 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 45,4 % aufs Gesicht, 0,9 % auf Bauwerke · **Defensiv** (7 Helden) 39,3 % aufs Gesicht, 1,0 % auf Bauwerke · **Kombinierend** (7 Helden) 43,0 % aufs Gesicht, 1,0 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 25,2, Median 24, 10–90 %: 17–35, kürzeste 9, längste 64. Beginner gewinnt 47,3 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Belagerungsturm | neutral | 6 | 55,2 % | +5,2 | 76,8 % |
| Goldener Reiter | Widukind | 4 | 55,0 % | +4,6 | 70,7 % |
| Warägergardist | Anna | 3 | 55,6 % | +4,6 | 82,6 % |
| Pilumwerfer | Agrippa | 1 | 52,7 % | +3,9 | 77,7 % |
| Handelsgesandter | Dandolo | 4 | 53,2 % | +3,5 | 79,3 % |
| Rede auf die Gefallenen | Perikles | 3 | 52,6 % | +3,4 | 81,7 % |
| Kopistin der Chronik | Anna | 1 | 53,9 % | +3,0 | 81,5 % |
| Bronzene Yue-Axt | Vix | 2 | 54,0 % | +3,0 | 76,4 % |
| Bibliothekslehrling | Hypatia | 1 | 50,0 % | −1,6 | 83,7 % |
| Hainwächterin | Vercingetorix | 1 | 45,2 % | −1,6 | 82,9 % |
| Nonne von Kamakura | Theophanu | 2 | 47,1 % | −1,7 | 82,8 % |
| Eichenhaut | Vercingetorix | 2 | 44,9 % | −1,9 | 74,6 % |
| Fjordspäher | Wiprecht | 1 | 47,8 % | −2,3 | 77,3 % |
| Pfeilschuss | Widukind | 2 | 48,1 % | −2,3 | 76,0 % |
| Gokenin aus Sagami | Theophanu | 1 | 46,3 % | −2,5 | 82,2 % |
| Lange Mauern | Perikles | 2 | 45,7 % | −3,4 | 79,7 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Theophanu | **54,4 %** | 53,8 % | 54,2 % | Vix 48,5 % | Nezahualcóyotl 61,0 % | Defensiv: 40,4 % | ✗ |
| Wiprecht von Groitzsch | **52,4 %** | 53,4 % | 50,9 % | Theophanu 45,5 % | Dandolo 60,5 % | Aggressiv: 47,8 % | ✓ |
| Ahhotep I. | **52,3 %** | 53,5 % | 50,6 % | Theophanu 42,5 % | Hypatia 57,5 % | Aggressiv: 49,6 % | ✓ |
| Fürstin von Vix | **51,9 %** | 52,5 % | 51,0 % | Wiprecht 44,0 % | Dandolo 63,5 % | Kombinierend: 45,1 % | ✓ |
| Ulrich von Liechtenstein | **51,4 %** | 51,3 % | 51,2 % | Hildegard 44,5 % | Anna 56,5 % | Aggressiv: 53,6 % | ✓ |
| Imhotep | **50,4 %** | 48,9 % | 51,9 % | Fabius 43,0 % | Agrippa 56,5 % | Defensiv: 39,0 % | ✓ |
| Epaminondas | **50,4 %** | 50,9 % | 49,9 % | Theophanu 42,5 % | Anna 58,5 % | Aggressiv: 46,9 % | ✓ |
| Hildegard von Bingen | **50,3 %** | 53,0 % | 47,5 % | Theophanu 42,5 % | Hypatia 58,0 % | Aggressiv: 50,2 % | ✓ |
| Leonidas I. | **50,2 %** | 51,2 % | 49,2 % | Ulrich 44,5 % | Böttger 57,0 % | Defensiv: 38,9 % | ✓ |
| Johann Friedrich Böttger | **50,1 %** | 51,9 % | 48,3 % | Theophanu 42,5 % | Hypatia 57,5 % | Kombinierend: 43,4 % | ✓ |
| Widukind | **49,8 %** | 49,5 % | 50,1 % | Wiprecht 42,5 % | Anna 59,5 % | Aggressiv: 49,5 % | ✓ |
| Thusnelda | **49,8 %** | 49,3 % | 50,3 % | Theophanu 43,0 % | Imhotep 56,5 % | Kombinierend: 45,4 % | ✓ |
| Fabius Maximus | **49,7 %** | 51,2 % | 48,3 % | Anna 37,0 % | Perikles 63,0 % | Defensiv: 41,1 % | ✓ |
| Marcus Agrippa | **49,7 %** | 48,2 % | 51,3 % | Leonidas 43,5 % | Vauban 56,5 % | Kombinierend: 46,3 % | ✓ |
| Baibars | **49,6 %** | 51,6 % | 47,7 % | Vix 38,5 % | Agrippa 56,0 % | Aggressiv: 42,6 % | ✓ |
| Perikles | **49,1 %** | 49,6 % | 48,7 % | Fabius 37,0 % | Vauban 55,5 % | Defensiv: 41,1 % | ✓ |
| Nezahualcóyotl | **49,0 %** | 50,5 % | 47,6 % | Vix 36,5 % | Epaminondas 56,0 % | Defensiv: 39,0 % | ✓ |
| Vercingetorix | **48,6 %** | 48,0 % | 49,4 % | Wiprecht 39,5 % | Agrippa 56,5 % | Aggressiv: 48,2 % | ✓ |
| Anna Komnene | **48,4 %** | 50,0 % | 47,0 % | Widukind 40,5 % | Fabius 63,0 % | Kombinierend: 41,5 % | ✓ |
| Hypatia | **47,9 %** | 49,6 % | 46,6 % | Hildegard 42,0 % | Fabius 54,0 % | Kombinierend: 43,5 % | ✓ |
| Vauban | **47,8 %** | 49,0 % | 47,0 % | Anna 43,0 % | Epaminondas 52,0 % | Defensiv: 42,1 % | ✓ |
| Enrico Dandolo | **47,0 %** | 48,8 % | 45,7 % | Vix 36,5 % | Hypatia 54,0 % | Kombinierend: 41,9 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Widu. | Verc. | Bött. | Hild. | Wipr. | Ulri. | Peri. | Agri. | Ahho. | Anna. | Neza. | Theo. | Epam. | Fabi. | Thus. | Baib. | Vaub. | Vix. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 50 | 50 | 53 | 52 | 56 | 57 | 47 | 48 | 45 | 50 | 56 | 51 | 48 | 48 | 49 | 47 | 47 | 53 | 54 | 50 | 46 |
| Hypatia | 50 | · | 52 | 46 | 52 | 52 | 43 | 42 | 49 | 48 | 47 | 48 | 43 | 49 | 50 | 47 | 47 | 54 | 48 | 45 | 49 | 48 |
| Imhotep | 50 | 49 | · | 53 | 53 | 56 | 51 | 50 | 51 | 50 | 45 | 56 | 52 | 50 | 56 | 44 | 53 | 43 | 44 | 53 | 54 | 50 |
| Dandolo | 47 | 54 | 48 | · | 42 | 49 | 51 | 49 | **40** | 45 | 47 | 47 | 43 | 51 | 46 | 51 | 42 | 51 | 52 | 46 | 54 | **37** |
| Widukind | 48 | 48 | 48 | 58 | · | 46 | 49 | 52 | 43 | 48 | 54 | 55 | 50 | 60 | 48 | 45 | 47 | 47 | 52 | 47 | 49 | 56 |
| Vercingetorix | 44 | 48 | 44 | 51 | 54 | · | 50 | 50 | **40** | 53 | 47 | 56 | 43 | 50 | 50 | 42 | 50 | 47 | 50 | 53 | 49 | 53 |
| Böttger | 43 | 57 | 49 | 50 | 52 | 51 | · | 48 | 51 | 51 | 53 | 45 | 48 | 48 | 54 | 43 | 51 | 51 | 52 | 51 | 56 | 53 |
| Hildegard | 53 | 58 | 50 | 52 | 48 | 51 | 52 | · | 53 | 56 | 49 | 46 | 43 | 57 | 48 | 43 | 51 | 46 | 49 | 53 | 50 | 53 |
| Wiprecht | 52 | 51 | 50 | **61** | 57 | **61** | 50 | 48 | · | 46 | 54 | 46 | 50 | 59 | 54 | 46 | 48 | 54 | 53 | 57 | 51 | 56 |
| Ulrich | 55 | 52 | 51 | 55 | 53 | 48 | 49 | 44 | 54 | · | 56 | 50 | 52 | 56 | 51 | 51 | 52 | 48 | 45 | 54 | 51 | 53 |
| Perikles | 51 | 53 | 55 | 53 | 46 | 53 | 48 | 52 | 47 | 44 | · | 48 | 45 | 48 | 51 | 47 | 51 | **37** | 50 | 48 | 56 | 52 |
| Agrippa | 44 | 52 | 44 | 53 | 45 | 44 | 55 | 54 | 54 | 50 | 52 | · | 48 | 50 | 53 | 48 | 49 | 52 | 48 | 44 | 56 | 52 |
| Ahhotep | 50 | 57 | 49 | 57 | 50 | 57 | 52 | 57 | 50 | 49 | 55 | 53 | · | 55 | 47 | 43 | 57 | 52 | 56 | 54 | 53 | 47 |
| Anna | 52 | 52 | 51 | 50 | 41 | 51 | 52 | 43 | 41 | 44 | 53 | 51 | 45 | · | 49 | 44 | 42 | **63** | 48 | 47 | 57 | 46 |
| Nezahualcóyotl | 52 | 50 | 44 | 54 | 52 | 51 | 46 | 52 | 47 | 50 | 50 | 48 | 53 | 52 | · | **39** | 56 | 47 | 53 | 45 | 54 | **37** |
| Theophanu | 51 | 53 | 56 | 49 | 55 | 59 | 57 | 57 | 54 | 49 | 53 | 52 | 57 | 56 | **61** | · | 57 | 57 | 57 | 51 | 49 | 49 |
| Epaminondas | 53 | 53 | 47 | 58 | 53 | 50 | 50 | 50 | 52 | 48 | 50 | 51 | 43 | 59 | 44 | 43 | · | 51 | 52 | 57 | 48 | 50 |
| Fabius | 53 | 46 | 57 | 50 | 53 | 53 | 50 | 54 | 47 | 53 | **63** | 48 | 48 | **37** | 53 | 43 | 50 | · | 48 | 46 | 48 | 47 |
| Thusnelda | 47 | 52 | 56 | 48 | 48 | 50 | 49 | 52 | 48 | 55 | 51 | 53 | 44 | 53 | 48 | 43 | 49 | 52 | · | 49 | 53 | 50 |
| Baibars | 46 | 55 | 48 | 54 | 53 | 48 | 49 | 48 | 43 | 46 | 53 | 56 | 46 | 53 | 55 | 50 | 43 | 54 | 52 | · | 54 | **39** |
| Vauban | 50 | 52 | 47 | 47 | 51 | 51 | 44 | 50 | 49 | 49 | 44 | 44 | 47 | 43 | 46 | 51 | 52 | 52 | 48 | 46 | · | 44 |
| Vix | 54 | 52 | 50 | **64** | 44 | 48 | 48 | 48 | 44 | 47 | 48 | 49 | 53 | 54 | **64** | 52 | 51 | 53 | 51 | **62** | 56 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (8 Helden) 48,6 % aufs Gesicht, 8,0 % auf Bauwerke · **Defensiv** (7 Helden) 40,2 % aufs Gesicht, 10,3 % auf Bauwerke · **Kombinierend** (7 Helden) 43,9 % aufs Gesicht, 9,4 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 22,0, Median 21, 10–90 %: 15–31, kürzeste 9, längste 66. Beginner gewinnt 50,7 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 60,6 % | +11,6 | 57,2 % |
| Griechisches Feuer | Anna | 4 | 59,2 % | +10,7 | 47,3 % |
| Phalanxveteran | Leonidas | 5 | 60,2 % | +10,0 | 57,8 % |
| Warägergardist | Anna | 3 | 58,3 % | +9,8 | 55,1 % |
| Astrolabienwächter | Hypatia | 3 | 57,8 % | +9,7 | 56,8 % |
| Chronist am Kaiserhof | Anna | 6 | 57,9 % | +9,4 | 57,7 % |
| Wächter des Weltenbaums | neutral | 8 | 58,9 % | +8,9 | 45,1 % |
| Pilgerin aus Domrémy | Hildegard | 1 | 59,0 % | +8,7 | 52,1 % |
| Leuchtturm von Pharos | Griechenland und Hellenismus | 3 | 43,4 % | −6,1 | 52,8 % |
| Sternschanze | Frühe Neuzeit | 2 | 42,8 % | −6,3 | 62,4 % |
| Zorn der Königin | Vercingetorix | 5 | 42,2 % | −6,5 | 36,2 % |
| Pyramiden von Gizeh | neutral | 4 | 43,4 % | −6,6 | 27,5 % |
| Vorgetäuschte Flucht | Baibars | 1 | 42,7 % | −6,9 | 19,1 % |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | 42,1 % | −6,9 | 55,2 % |
| Burgfried | Mittelalter im Reich | 2 | 43,4 % | −8,1 | 55,8 % |
| Wagenburg am Vítkov | Vauban | 4 | 36,8 % | −11,2 | 58,3 % |

**Legendäre** (AP 5.3) – als Gruppe 53,5 % „gewinnt, wenn gezogen“ (+3,5 gegenüber ihrem Helden, 62015 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Lagertha, Schildmaid | Wiprecht | 7 | 58,6 % | +6,5 | 45,1 % |
| Qalawun, Emir der Bahriya | Baibars | 6 | 57,2 % | +7,6 | 46,5 % |
| Wu Ding, König der Shang | Vix | 6 | 56,8 % | +5,1 | 49,2 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 56,8 % | +6,6 | 48,8 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 56,0 % | +6,0 | 44,3 % |
| Minamoto no Yoritomo | Theophanu | 6 | 55,6 % | +1,6 | 51,3 % |
| Wiedervereinigung der Mongolen | Thusnelda | 8 | 55,3 % | +5,5 | 41,8 % |
| Subutai, der Stratege | Widukind | 6 | 54,8 % | +5,0 | 44,9 % |
| Bronzekopf des Augustus | Ahhotep | 6 | 54,8 % | +2,7 | 45,9 % |
| Djoser, der Erbauer | Imhotep | 6 | 54,3 % | +3,9 | 53,1 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 52,8 % | +5,6 | 43,8 % |
| Herodot, Vater der Geschichte | neutral | 4 | 52,3 % | +2,3 | 43,7 % |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | 52,2 % | +1,9 | 44,6 % |
| Caterina de’ Medici | Böttger | 5 | 51,9 % | +1,8 | 51,3 % |
| Jan Hus, Prediger von Bethlehem | Vauban | 5 | 51,6 % | +3,6 | 43,3 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 50,9 % | +1,8 | 52,8 % |
| Theon von Alexandria | Hypatia | 5 | 50,7 % | +2,6 | 50,2 % |
| Sasaki Kojirō, der Rivale | Ulrich | 6 | 50,5 % | −0,7 | 44,4 % |
| La Hire, der Unbeugsame | Hildegard | 7 | 49,9 % | −0,4 | 42,6 % |
| Andraste, Göttin des Sieges | Vercingetorix | 8 | 48,9 % | +0,2 | 45,9 % |
| Alexios I. Komnenos | Anna | 6 | 48,7 % | +0,2 | 49,5 % |
| Marcellus, Schwert Roms | Fabius | 6 | 48,5 % | −1,3 | 48,3 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 47,5 % | −2,3 | 41,7 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 45,8 % | −3,2 | 45,5 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 4600 | 80,9 % | 54,7 % | +0,7 | 1220 | 52,8 % | 53,0 % | +2,8 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 4600 | 82,4 % | 54,7 % | +0,7 | 1676 | 57,0 % | 54,8 % | +4,6 |
| Bronzener Wall | Leonidas | 2 | Basis | 4600 | 82,6 % | 55,2 % | +1,2 | 1624 | 49,0 % | 51,2 % | +1,0 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 4600 | 77,3 % | 56,0 % | +2,1 | 1640 | 49,5 % | 50,5 % | +0,3 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1728 | 55,6 % | 51,6 % | +1,5 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1746 | 54,5 % | 50,7 % | +0,5 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1922 | 57,8 % | 60,2 % | +10,0 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1582 | 45,5 % | 51,9 % | +1,7 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 2450 | 52,6 % | 46,8 % | −3,4 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 2056 | 48,8 % | 56,8 % | +6,6 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 4600 | 83,7 % | 50,0 % | −1,6 | 1148 | 54,9 % | 46,8 % | −1,3 |
| Himmelsstrahl | Hypatia | 2 | Basis | 4600 | 87,1 % | 51,9 % | +0,2 | 1658 | 57,7 % | 49,4 % | +1,3 |
| Sternenkundiger | Hypatia | 3 | Basis | 4600 | 82,0 % | 53,3 % | +1,7 | 1938 | 49,6 % | 50,1 % | +2,0 |
| Sternenregen | Hypatia | 4 | Basis | 4600 | 80,1 % | 54,4 % | +2,8 | 1552 | 45,4 % | 54,0 % | +5,9 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1766 | 56,8 % | 57,8 % | +9,7 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1654 | 43,1 % | 49,0 % | +0,9 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1862 | 48,1 % | 52,2 % | +4,1 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 2534 | 56,6 % | 46,8 % | −1,3 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 1900 | 52,8 % | 45,6 % | −2,5 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1982 | 50,2 % | 50,7 % | +2,6 |
| Nilschülerin | Imhotep | 1 | Basis | 4600 | 83,5 % | 48,4 % | −0,4 | 1186 | 54,0 % | 49,9 % | −0,5 |
| Heilender Balsam | Imhotep | 1 | Basis | 4600 | 83,8 % | 50,0 % | +1,2 | 1166 | 59,3 % | 52,7 % | +2,4 |
| Pyramidenwächter | Imhotep | 3 | Basis | 4600 | 83,9 % | 50,2 % | +1,5 | 1672 | 59,6 % | 50,3 % | −0,1 |
| Tempelärztin | Imhotep | 4 | Basis | 4600 | 81,4 % | 49,5 % | +0,8 | 1658 | 54,4 % | 47,5 % | −2,8 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1518 | 54,5 % | 53,7 % | +3,3 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1784 | 58,8 % | 56,3 % | +5,9 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1678 | 48,0 % | 48,9 % | −1,5 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1998 | 56,3 % | 56,6 % | +6,2 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 1936 | 58,6 % | 48,1 % | −2,3 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 2540 | 53,1 % | 54,3 % | +3,9 |
| Lagunenbote | Dandolo | 1 | Basis | 4600 | 80,3 % | 52,3 % | +2,7 | 1138 | 52,5 % | 53,6 % | +6,4 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 4600 | 79,9 % | 48,7 % | −0,9 | 1602 | 50,2 % | 46,5 % | −0,7 |
| Präziser Stich | Dandolo | 2 | Basis | 4600 | 85,0 % | 51,2 % | +1,5 | 1652 | 55,8 % | 49,6 % | +2,3 |
| Handelsgesandter | Dandolo | 4 | Basis | 4600 | 79,3 % | 53,2 % | +3,5 | 1574 | 50,7 % | 46,7 % | −0,6 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1628 | 41,2 % | 46,7 % | −0,5 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1696 | 54,1 % | 46,4 % | −0,9 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1640 | 47,0 % | 49,1 % | +1,8 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1826 | 52,0 % | 50,9 % | +3,6 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1876 | 38,1 % | 47,7 % | +0,5 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 2418 | 43,8 % | 52,8 % | +5,6 |
| Steppenspäher | Widukind | 1 | Basis | 4600 | 75,5 % | 49,5 % | −1,0 | 1258 | 49,8 % | 51,7 % | +1,9 |
| Reiterbogenschütze | Widukind | 2 | Basis | 4600 | 77,1 % | 49,6 % | −0,9 | 1790 | 50,2 % | 52,7 % | +2,9 |
| Pfeilschuss | Widukind | 2 | Basis | 4600 | 76,0 % | 48,1 % | −2,3 | 1766 | 55,0 % | 51,8 % | +2,0 |
| Goldener Reiter | Widukind | 4 | Basis | 4600 | 70,7 % | 55,0 % | +4,6 | 1574 | 47,8 % | 53,8 % | +4,0 |
| Adlerjägerin | Widukind | 3 | Gewöhnlich | – | – | – | – | 1736 | 42,2 % | 48,3 % | −1,5 |
| Steppensturm | Widukind | 3 | Gewöhnlich | – | – | – | – | 1718 | 45,1 % | 48,3 % | −1,5 |
| Tumenwächter | Widukind | 5 | Selten | – | – | – | – | 1806 | 46,1 % | 49,6 % | −0,2 |
| Belagerungsfeuer | Widukind | 6 | Selten | – | – | – | – | 2306 | 48,8 % | 53,5 % | +3,7 |
| Keshig-Elite | Widukind | 6 | Episch | – | – | – | – | 2350 | 44,4 % | 47,5 % | −2,3 |
| Subutai, der Stratege | Widukind | 6 | Legendär | – | – | – | – | 2268 | 44,9 % | 54,8 % | +5,0 |
| Hainwächterin | Vercingetorix | 1 | Basis | 4600 | 82,9 % | 45,2 % | −1,6 | 1248 | 51,4 % | 48,3 % | −0,4 |
| Eichenhaut | Vercingetorix | 2 | Basis | 4600 | 74,6 % | 44,9 % | −1,9 | 1708 | 42,1 % | 45,1 % | −3,6 |
| Icenerkrieger | Vercingetorix | 3 | Basis | 4600 | 85,3 % | 48,1 % | +1,3 | 1674 | 55,4 % | 51,1 % | +2,4 |
| Wilder Hieb | Vercingetorix | 3 | Basis | 4600 | 85,1 % | 45,3 % | −1,5 | 1706 | 59,1 % | 47,0 % | −1,7 |
| Streitwagenlenkerin | Vercingetorix | 4 | Gewöhnlich | – | – | – | – | 1586 | 48,8 % | 45,1 % | −3,6 |
| Druidin des Hains | Vercingetorix | 3 | Gewöhnlich | – | – | – | – | 1746 | 52,5 % | 47,8 % | −0,9 |
| Aufstand | Vercingetorix | 3 | Selten | – | – | – | – | 1702 | 55,2 % | 49,2 % | +0,5 |
| Eichenkoloss | Vercingetorix | 6 | Selten | – | – | – | – | 2456 | 51,8 % | 49,2 % | +0,5 |
| Zorn der Königin | Vercingetorix | 5 | Episch | – | – | – | – | 1882 | 36,2 % | 42,2 % | −6,5 |
| Andraste, Göttin des Sieges | Vercingetorix | 8 | Legendär | – | – | – | – | 1408 | 45,9 % | 48,9 % | +0,2 |
| Tintenlehrling | Böttger | 1 | Basis | 4600 | 85,2 % | 54,2 % | +2,8 | 1200 | 58,7 % | 54,2 % | +4,1 |
| Dunkle Vorahnung | Böttger | 2 | Basis | 4600 | 89,1 % | 54,3 % | +2,9 | 1660 | 67,0 % | 54,8 % | +4,8 |
| Maskierter Seher | Böttger | 3 | Basis | 4600 | 85,6 % | 52,3 % | +1,0 | 1792 | 49,3 % | 50,6 % | +0,5 |
| Prophezeiung | Böttger | 4 | Basis | 4600 | 67,1 % | 51,7 % | +0,3 | 1564 | 25,4 % | 48,6 % | −1,5 |
| Pestdoktor | Böttger | 4 | Gewöhnlich | – | – | – | – | 1634 | 60,6 % | 57,1 % | +7,1 |
| Schattenpakt | Böttger | 2 | Gewöhnlich | – | – | – | – | 1674 | 59,0 % | 56,9 % | +6,9 |
| Chronist der Nacht | Böttger | 5 | Selten | – | – | – | – | 1782 | 52,6 % | 48,8 % | −1,3 |
| Rote Finsternis | Böttger | 5 | Selten | – | – | – | – | 1792 | 45,8 % | 55,3 % | +5,2 |
| Wächter der Zeiten | Böttger | 6 | Episch | – | – | – | – | 2424 | 59,0 % | 53,2 % | +3,1 |
| Caterina de’ Medici | Böttger | 5 | Legendär | – | – | – | – | 1844 | 51,3 % | 51,9 % | +1,8 |
| Bauernrekrut | Hildegard | 1 | Basis | 4600 | 78,7 % | 49,8 % | −0,5 | 1312 | 55,3 % | 56,6 % | +6,3 |
| Bannersegen | Hildegard | 2 | Basis | 4600 | 79,1 % | 50,1 % | −0,2 | 1652 | 49,9 % | 50,4 % | +0,1 |
| Wache von Orléans | Hildegard | 3 | Basis | 4600 | 78,9 % | 51,1 % | +0,8 | 1792 | 55,6 % | 51,5 % | +1,3 |
| Die Fahne erheben | Hildegard | 2 | Basis | 4600 | 77,0 % | 49,0 % | −1,4 | 1664 | 54,9 % | 56,4 % | +6,1 |
| Lilienritter | Hildegard | 4 | Gewöhnlich | – | – | – | – | 1568 | 41,3 % | 51,8 % | +1,6 |
| Heiliger Schutz | Hildegard | 2 | Gewöhnlich | – | – | – | – | 1670 | 45,2 % | 52,7 % | +2,4 |
| Standartenträgerin | Hildegard | 5 | Selten | – | – | – | – | 1840 | 49,1 % | 50,1 % | −0,2 |
| Glocken von Reims | Hildegard | 6 | Selten | – | – | – | – | 2266 | 42,1 % | 51,4 % | +1,1 |
| Paladin der Loire | Hildegard | 7 | Episch | – | – | – | – | 2098 | 40,9 % | 48,8 % | −1,5 |
| La Hire, der Unbeugsame | Hildegard | 7 | Legendär | – | – | – | – | 2016 | 42,6 % | 49,9 % | −0,4 |
| Fjordspäher | Wiprecht | 1 | Basis | 4600 | 77,3 % | 47,8 % | −2,3 | 1256 | 49,4 % | 55,8 % | +3,6 |
| Runenblitz | Wiprecht | 2 | Basis | 4600 | 81,8 % | 49,5 % | −0,6 | 1648 | 59,2 % | 54,1 % | +2,0 |
| Schildmaid | Wiprecht | 3 | Basis | 4600 | 80,7 % | 51,3 % | +1,2 | 1706 | 53,0 % | 55,4 % | +3,2 |
| Runenschnitzer | Wiprecht | 4 | Basis | 4600 | 76,4 % | 52,1 % | +2,0 | 1598 | 50,5 % | 55,0 % | +2,9 |
| Donnerschlag | Wiprecht | 3 | Gewöhnlich | – | – | – | – | 1758 | 56,4 % | 52,3 % | +0,2 |
| Berserker vom Fjord | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1556 | 47,6 % | 52,9 % | +0,7 |
| Ahnenbund | Wiprecht | 3 | Selten | – | – | – | – | 1664 | 53,0 % | 56,0 % | +3,8 |
| Runenhüter | Wiprecht | 5 | Selten | – | – | – | – | 1900 | 47,8 % | 51,6 % | −0,5 |
| Sturm der Nordsee | Wiprecht | 5 | Episch | – | – | – | – | 1906 | 52,0 % | 53,7 % | +1,5 |
| Lagertha, Schildmaid | Wiprecht | 7 | Legendär | – | – | – | – | 2238 | 45,1 % | 58,6 % | +6,5 |
| Dojoschüler | Ulrich | 1 | Basis | 4600 | 80,7 % | 48,5 % | −0,5 | 1212 | 52,7 % | 55,4 % | +4,2 |
| Schneller Schnitt | Ulrich | 1 | Basis | 4600 | 84,1 % | 49,7 % | +0,7 | 1206 | 51,7 % | 53,9 % | +2,7 |
| Rōnin | Ulrich | 3 | Basis | 4600 | 83,2 % | 49,7 % | +0,7 | 1778 | 47,0 % | 52,6 % | +1,3 |
| Konzentration | Ulrich | 2 | Basis | 4600 | 73,9 % | 51,0 % | +2,0 | 1722 | 39,8 % | 51,0 % | −0,2 |
| Kirschblütenwache | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1752 | 52,6 % | 53,9 % | +2,7 |
| Zwei Himmel | Ulrich | 3 | Gewöhnlich | – | – | – | – | 1724 | 35,8 % | 51,1 % | −0,1 |
| Duellant | Ulrich | 4 | Selten | – | – | – | – | 1534 | 38,5 % | 52,3 % | +1,1 |
| Der leere Geist | Ulrich | 5 | Selten | – | – | – | – | 1866 | 41,2 % | 54,6 % | +3,4 |
| Meister der fünf Ringe | Ulrich | 6 | Episch | – | – | – | – | 2470 | 50,1 % | 50,9 % | −0,4 |
| Sasaki Kojirō, der Rivale | Ulrich | 6 | Legendär | – | – | – | – | 2322 | 44,4 % | 50,5 % | −0,7 |
| Dorfwache | neutral | 1 | Basis | 101200 | 80,7 % | 49,2 % | −0,8 | 26932 | 53,8 % | 49,4 % | −0,6 |
| Wandernder Händler | neutral | 2 | Basis | 101200 | 80,8 % | 49,0 % | −1,0 | 36802 | 52,8 % | 48,6 % | −1,4 |
| Steinschleuderer | neutral | 2 | Basis | 101200 | 80,9 % | 49,7 % | −0,3 | 36654 | 52,5 % | 50,6 % | +0,6 |
| Grenzläuferin | neutral | 3 | Basis | 101200 | 83,3 % | 49,8 % | −0,2 | 38010 | 55,3 % | 49,8 % | −0,2 |
| Festungsschild | neutral | 4 | Basis | 101200 | 76,9 % | 51,2 % | +1,2 | 36106 | 47,0 % | 50,7 % | +0,7 |
| Kavallerist | neutral | 4 | Basis | 101200 | 78,3 % | 51,3 % | +1,3 | 35318 | 46,3 % | 51,5 % | +1,4 |
| Feldheilerin | neutral | 3 | Basis | 101200 | 80,8 % | 49,6 % | −0,4 | 38602 | 51,4 % | 48,9 % | −1,1 |
| Archivarin | neutral | 4 | Basis | 101200 | 74,7 % | 52,6 % | +2,5 | 36610 | 45,3 % | 50,3 % | +0,3 |
| Wachhund | neutral | 2 | Basis | 101200 | 78,2 % | 49,0 % | −1,0 | 36624 | 49,5 % | 48,5 % | −1,5 |
| Veteran | neutral | 5 | Basis | 101200 | 79,4 % | 52,5 % | +2,5 | 42932 | 50,0 % | 49,0 % | −1,1 |
| Belagerungsturm | neutral | 6 | Basis | 101200 | 76,8 % | 55,2 % | +5,2 | 55236 | 51,6 % | 50,4 % | +0,4 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 38534 | 50,6 % | 50,2 % | +0,1 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 26942 | 52,9 % | 52,1 % | +2,1 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 43002 | 51,4 % | 54,2 % | +4,1 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 38894 | 49,5 % | 50,1 % | +0,1 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 36516 | 48,7 % | 49,8 % | −0,2 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 36310 | 40,6 % | 49,5 % | −0,5 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 27306 | 49,6 % | 47,3 % | −2,7 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 36570 | 56,6 % | 50,1 % | +0,1 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 49242 | 52,4 % | 53,4 % | +3,4 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 38316 | 53,4 % | 51,2 % | +1,2 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 36026 | 48,1 % | 48,9 % | −1,2 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 36636 | 53,2 % | 53,0 % | +3,0 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 36122 | 48,8 % | 52,3 % | +2,3 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 38702 | 56,4 % | 52,9 % | +2,9 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 36350 | 28,7 % | 45,5 % | −4,5 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 36096 | 48,0 % | 47,1 % | −2,9 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 43080 | 47,6 % | 50,7 % | +0,7 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 35810 | 52,4 % | 54,6 % | +4,5 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 35954 | 47,2 % | 54,3 % | +4,3 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 43010 | 52,4 % | 51,9 % | +1,9 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 43096 | 49,4 % | 51,0 % | +0,9 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 36552 | 42,5 % | 49,7 % | −0,3 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 55432 | 54,7 % | 51,2 % | +1,2 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 49600 | 47,0 % | 52,6 % | +2,6 |
| Vergessene Weisheit | neutral | 4 | Episch | – | – | – | – | 36244 | 24,5 % | 48,7 % | −1,3 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 34338 | 45,1 % | 58,9 % | +8,9 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 49318 | 54,6 % | 52,6 % | +2,6 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 35690 | 43,7 % | 52,3 % | +2,3 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 34054 | 44,3 % | 56,0 % | +6,0 |
| Agent des Zehnerrats | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1656 | 58,6 % | 51,2 % | +4,0 |
| Tributeintreiber | Widukind | 3 | Gewöhnlich | – | – | – | – | 1762 | 51,0 % | 47,1 % | −2,7 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1628 | 50,4 % | 51,3 % | +0,9 |
| Brand von Londinium | Vercingetorix | 3 | Selten | – | – | – | – | 1728 | 49,6 % | 46,0 % | −2,7 |
| Bannbulle | Böttger | 1 | Selten | – | – | – | – | 1168 | 63,0 % | 53,3 % | +3,2 |
| Plünderer von Paris | Wiprecht | 4 | Gewöhnlich | – | – | – | – | 1672 | 48,0 % | 46,9 % | −5,3 |
| Zorn des Donnergottes | Wiprecht | 1 | Gewöhnlich | – | – | – | – | 1278 | 60,6 % | 53,9 % | +1,8 |
| Shinobi aus Iga | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1666 | 52,3 % | 53,7 % | +2,5 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 36278 | 51,2 % | 48,4 % | −1,6 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 27130 | 54,8 % | 52,4 % | +2,4 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 36784 | 56,3 % | 53,1 % | +3,1 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 38502 | 51,0 % | 52,5 % | +2,4 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 38286 | 55,2 % | 50,5 % | +0,4 |
| Ruderer der Triere | Perikles | 1 | Basis | 4600 | 79,3 % | 50,6 % | +1,5 | 1184 | 56,2 % | 57,2 % | +8,1 |
| Lange Mauern | Perikles | 2 | Basis | 4600 | 79,7 % | 45,7 % | −3,4 | 1594 | 56,0 % | 44,2 % | −5,0 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 4600 | 81,7 % | 52,6 % | +3,4 | 1696 | 57,9 % | 55,2 % | +6,0 |
| Strategos | Perikles | 3 | Basis | 4600 | 79,8 % | 51,9 % | +2,7 | 1678 | 58,6 % | 53,9 % | +4,8 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1694 | 48,8 % | 43,2 % | −6,0 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1674 | 61,3 % | 55,4 % | +6,2 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1498 | 53,0 % | 55,5 % | +6,4 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1636 | 40,5 % | 50,9 % | +1,8 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1582 | 37,9 % | 43,3 % | −5,9 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 2416 | 52,8 % | 50,9 % | +1,8 |
| Pilumwerfer | Agrippa | 1 | Basis | 4600 | 77,7 % | 52,7 % | +3,9 | 1236 | 56,1 % | 53,3 % | +3,5 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 4600 | 73,0 % | 50,1 % | +1,4 | 1684 | 46,0 % | 51,2 % | +1,5 |
| Castra | Agrippa | 3 | Basis | 4600 | 83,3 % | 50,4 % | +1,7 | 1736 | 58,4 % | 48,2 % | −1,6 |
| Testudo | Agrippa | 2 | Basis | 4600 | 74,5 % | 50,8 % | +2,1 | 1718 | 50,9 % | 53,0 % | +3,2 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1726 | 53,4 % | 50,1 % | +0,4 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1692 | 48,6 % | 54,1 % | +4,3 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1982 | 52,9 % | 53,4 % | +3,7 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1632 | 54,1 % | 44,3 % | −5,5 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1618 | 40,7 % | 50,7 % | +0,9 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1918 | 41,7 % | 47,5 % | −2,3 |
| Bogenschütze von Ta-Seti | Ahhotep | 1 | Basis | 4600 | 82,5 % | 51,6 % | −0,2 | 1260 | 55,9 % | 56,3 % | +4,3 |
| Wüstenreiter | Ahhotep | 2 | Basis | 4600 | 80,8 % | 51,3 % | −0,5 | 1654 | 52,4 % | 51,7 % | −0,3 |
| Pfeilregen von Kusch | Ahhotep | 2 | Basis | 4600 | 78,6 % | 52,7 % | +0,9 | 1536 | 44,9 % | 50,7 % | −1,3 |
| Speerträger von Napata | Ahhotep | 3 | Basis | 4600 | 84,1 % | 52,6 % | +0,8 | 1774 | 52,8 % | 52,1 % | +0,1 |
| Wächter des Löwentempels | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1718 | 51,3 % | 53,5 % | +1,4 |
| Kundschafter aus Meroë | Ahhotep | 3 | Gewöhnlich | – | – | – | – | 1692 | 54,8 % | 53,4 % | +1,4 |
| Kriegselefant von Kusch | Ahhotep | 6 | Selten | – | – | – | – | 2536 | 53,7 % | 53,1 % | +1,1 |
| Überfall auf Syene | Ahhotep | 3 | Selten | – | – | – | – | 1648 | 52,1 % | 48,9 % | −3,1 |
| Akinidad, Prinz von Kusch | Ahhotep | 5 | Episch | – | – | – | – | 2040 | 55,2 % | 49,1 % | −2,9 |
| Bronzekopf des Augustus | Ahhotep | 6 | Legendär | – | – | – | – | 2392 | 45,9 % | 54,8 % | +2,7 |
| Kopistin der Chronik | Anna | 1 | Basis | 4600 | 81,5 % | 53,9 % | +3,0 | 1326 | 53,5 % | 51,1 % | +2,6 |
| Pantokrator-Spital | Anna | 3 | Basis | 4600 | 73,3 % | 51,9 % | +0,9 | 1684 | 30,6 % | 51,3 % | +2,8 |
| Warägergardist | Anna | 3 | Basis | 4600 | 82,6 % | 55,6 % | +4,6 | 1770 | 55,1 % | 58,3 % | +9,8 |
| Hofärztin | Anna | 3 | Basis | 4600 | 81,6 % | 51,0 % | +0,1 | 1758 | 42,2 % | 45,8 % | −2,7 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1644 | 47,3 % | 59,2 % | +10,7 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1586 | 46,9 % | 56,9 % | +8,4 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1872 | 48,0 % | 55,5 % | +7,0 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1782 | 37,3 % | 47,5 % | −1,0 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1830 | 48,5 % | 47,5 % | −1,0 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 2378 | 49,5 % | 48,7 % | +0,2 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 4600 | 82,4 % | 49,2 % | +0,0 | 1220 | 59,5 % | 51,4 % | +2,4 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 4600 | 81,7 % | 49,4 % | +0,2 | 1628 | 55,3 % | 50,4 % | +1,3 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 4600 | 83,2 % | 49,9 % | +0,7 | 1596 | 58,1 % | 48,7 % | −0,3 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 4600 | 82,7 % | 48,6 % | −0,6 | 1702 | 58,8 % | 50,7 % | +1,7 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1502 | 58,1 % | 47,5 % | −1,5 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1652 | 53,8 % | 49,9 % | +0,9 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1728 | 53,7 % | 53,5 % | +4,5 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1702 | 55,2 % | 42,1 % | −6,9 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 2514 | 57,2 % | 60,6 % | +11,6 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 1914 | 45,5 % | 45,8 % | −3,2 |
| Gokenin aus Sagami | Theophanu | 1 | Basis | 4600 | 82,2 % | 46,3 % | −2,5 | 1130 | 57,3 % | 58,0 % | +4,0 |
| Bogenreiter aus Kamakura | Theophanu | 2 | Basis | 4600 | 82,7 % | 47,3 % | −1,5 | 1526 | 56,4 % | 57,1 % | +3,1 |
| Treueschwur | Theophanu | 1 | Basis | 4600 | 82,6 % | 50,4 % | +1,7 | 1192 | 51,4 % | 57,3 % | +3,3 |
| Nonne von Kamakura | Theophanu | 2 | Basis | 4600 | 82,8 % | 47,1 % | −1,7 | 1604 | 57,9 % | 56,1 % | +2,1 |
| Rokuhara-Späher | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1584 | 58,6 % | 55,7 % | +1,7 |
| Aufgebot von Jōkyū | Theophanu | 4 | Gewöhnlich | – | – | – | – | 1658 | 55,9 % | 57,4 % | +3,4 |
| Tsurugaoka Hachiman-gū | Theophanu | 2 | Selten | – | – | – | – | 1642 | 56,6 % | 53,1 % | −0,9 |
| Verbannung nach Oki | Theophanu | 3 | Selten | – | – | – | – | 1770 | 50,7 % | 51,2 % | −2,8 |
| Hōjō Yoshitoki, Regent | Theophanu | 5 | Episch | – | – | – | – | 2010 | 51,8 % | 56,9 % | +2,9 |
| Minamoto no Yoritomo | Theophanu | 6 | Legendär | – | – | – | – | 2638 | 51,3 % | 55,6 % | +1,6 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1782 | 55,6 % | 52,6 % | +2,4 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1700 | 53,1 % | 44,2 % | −6,0 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1626 | 56,6 % | 47,9 % | −0,2 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1662 | 53,4 % | 52,1 % | +4,0 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1728 | 62,5 % | 50,8 % | +0,4 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1626 | 59,9 % | 44,7 % | −5,7 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1632 | 49,2 % | 47,6 % | +0,4 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 2388 | 45,2 % | 50,3 % | +3,0 |
| Jurtenlager | Widukind | 3 | Gewöhnlich | – | – | – | – | 1668 | 32,5 % | 47,1 % | −2,7 |
| Kurultai | Widukind | 4 | Selten | – | – | – | – | 1528 | 31,4 % | 47,1 % | −2,7 |
| Barde der Icener | Vercingetorix | 2 | Gewöhnlich | – | – | – | – | 1720 | 55,5 % | 50,5 % | +1,8 |
| Sichelwagen | Vercingetorix | 5 | Selten | – | – | – | – | 1874 | 49,1 % | 48,3 % | −0,4 |
| Almanach der Quatrains | Böttger | 1 | Gewöhnlich | – | – | – | – | 1212 | 55,2 % | 52,1 % | +2,0 |
| Horoskop der Königin | Böttger | 3 | Selten | – | – | – | – | 1760 | 3,1 % | 45,3 % | −4,8 |
| Pilgerin aus Domrémy | Hildegard | 1 | Gewöhnlich | – | – | – | – | 1306 | 52,1 % | 59,0 % | +8,7 |
| Die Weihe von Reims | Hildegard | 4 | Selten | – | – | – | – | 1644 | 32,9 % | 48,9 % | −1,3 |
| Runenmeisterin | Wiprecht | 2 | Gewöhnlich | – | – | – | – | 1570 | 53,1 % | 52,7 % | +0,6 |
| Berserkergang | Wiprecht | 1 | Selten | – | – | – | – | 1294 | 59,1 % | 54,2 % | +2,1 |
| Schwertschüler aus Kokura | Ulrich | 4 | Selten | – | – | – | – | 1578 | 45,6 % | 49,5 % | −1,8 |
| Niten Ichi-ryū | Ulrich | 2 | Gewöhnlich | – | – | – | – | 1674 | 49,5 % | 48,7 % | −2,6 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1580 | 51,5 % | 52,4 % | +3,2 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1694 | 29,1 % | 45,1 % | −4,0 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1662 | 49,0 % | 48,2 % | −1,6 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1624 | 39,3 % | 49,1 % | −0,6 |
| Pfeilmacher aus Meroë | Ahhotep | 2 | Gewöhnlich | – | – | – | – | 1720 | 57,7 % | 52,5 % | +0,4 |
| Gift der Wüstenviper | Ahhotep | 3 | Selten | – | – | – | – | 1622 | 44,1 % | 53,3 % | +1,3 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1740 | 54,7 % | 49,9 % | +1,4 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 2348 | 57,7 % | 57,9 % | +9,4 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1622 | 59,3 % | 49,4 % | +0,4 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1574 | 55,2 % | 48,9 % | −0,1 |
| Jitō-Verwalter | Theophanu | 2 | Gewöhnlich | – | – | – | – | 1622 | 54,9 % | 57,4 % | +3,4 |
| Siegel des Shikken | Theophanu | 2 | Selten | – | – | – | – | 1626 | 42,6 % | 54,0 % | +0,0 |
| Olympionike | Griechenland und Hellenismus | 4 | Gewöhnlich | – | – | – | – | 6578 | 52,8 % | 55,0 % | +5,6 |
| Rhapsode | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 6566 | 52,0 % | 52,0 % | +2,5 |
| Marathonläufer | Griechenland und Hellenismus | 2 | Gewöhnlich | – | – | – | – | 6544 | 51,5 % | 52,3 % | +2,9 |
| Orakel von Delphi | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 6972 | 29,0 % | 48,3 % | −1,1 |
| Leuchtturm von Pharos | Griechenland und Hellenismus | 3 | Selten | – | – | – | – | 7096 | 52,8 % | 43,4 % | −6,1 |
| Akropolis | Griechenland und Hellenismus | 2 | Selten | – | – | – | – | 6460 | 54,5 % | 50,5 % | +1,1 |
| Bibliothek von Alexandria | Griechenland und Hellenismus | 3 | Episch | – | – | – | – | 7068 | 48,5 % | 48,3 % | −1,2 |
| Knappe | Mittelalter im Reich | 1 | Gewöhnlich | – | – | – | – | 6308 | 53,1 % | 52,2 % | +0,7 |
| Armbrustschütze | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 8872 | 57,0 % | 56,2 % | +4,7 |
| Mönch von Cluny | Mittelalter im Reich | 3 | Gewöhnlich | – | – | – | – | 8804 | 49,3 % | 54,7 % | +3,2 |
| Hansekogge | Mittelalter im Reich | 4 | Gewöhnlich | – | – | – | – | 7978 | 46,0 % | 50,5 % | −1,0 |
| Turnierritter | Mittelalter im Reich | 4 | Selten | – | – | – | – | 8036 | 47,9 % | 55,1 % | +3,5 |
| Burgfried | Mittelalter im Reich | 2 | Selten | – | – | – | – | 8354 | 55,8 % | 43,4 % | −8,1 |
| Tribok | Mittelalter im Reich | 4 | Episch | – | – | – | – | 8086 | 30,0 % | 48,5 % | −3,1 |
| Landsknecht | Frühe Neuzeit | 1 | Gewöhnlich | – | – | – | – | 3584 | 58,3 % | 52,9 % | +3,8 |
| Buchdrucker aus Mainz | Frühe Neuzeit | 3 | Gewöhnlich | – | – | – | – | 5438 | 54,8 % | 52,8 % | +3,7 |
| Leipziger Kaffeehaus | Frühe Neuzeit | 2 | Gewöhnlich | – | – | – | – | 4910 | 47,5 % | 49,0 % | −0,1 |
| Kartaunen-Salve | Frühe Neuzeit | 3 | Selten | – | – | – | – | 5362 | 57,9 % | 50,4 % | +1,3 |
| Kriegsgaleone | Frühe Neuzeit | 5 | Selten | – | – | – | – | 5590 | 57,9 % | 49,0 % | −0,1 |
| Stehendes Heer | Frühe Neuzeit | 5 | Episch | – | – | – | – | 5624 | 59,2 % | 51,4 % | +2,4 |
| Sternschanze | Frühe Neuzeit | 2 | Episch | – | – | – | – | 4882 | 62,4 % | 42,8 % | −6,3 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 38160 | 32,1 % | 44,6 % | −5,4 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 36766 | 57,0 % | 44,9 % | −5,1 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 36374 | 27,5 % | 43,4 % | −6,6 |
| Thebanischer Plänkler | Epaminondas | 1 | Basis | 4600 | 78,1 % | 48,3 % | −0,3 | 1322 | 51,7 % | 54,6 % | +4,3 |
| Böotischer Hoplit | Epaminondas | 2 | Basis | 4600 | 78,7 % | 48,4 % | −0,2 | 1702 | 52,6 % | 55,7 % | +5,3 |
| Fünfzig Schilde tief | Epaminondas | 2 | Basis | 4600 | 74,3 % | 48,7 % | +0,1 | 1714 | 45,8 % | 51,5 % | +1,1 |
| Böotarch | Epaminondas | 3 | Basis | 4600 | 78,1 % | 48,6 % | +0,0 | 1828 | 52,8 % | 54,5 % | +4,2 |
| Kämpfer der Heiligen Schar | Epaminondas | 5 | Gewöhnlich | – | – | – | – | 1918 | 48,9 % | 55,4 % | +5,0 |
| Schlacht bei Leuktra | Epaminondas | 4 | Gewöhnlich | – | – | – | – | 1574 | 42,2 % | 49,7 % | −0,6 |
| Befreiung Messeniens | Epaminondas | 5 | Selten | – | – | – | – | 1908 | 49,8 % | 52,1 % | +1,7 |
| Thebanischer Phalangit | Epaminondas | 4 | Selten | – | – | – | – | 1624 | 45,9 % | 55,6 % | +5,2 |
| Megalopolis | Epaminondas | 3 | Episch | – | – | – | – | 1712 | 43,5 % | 45,4 % | −4,9 |
| Pelopidas, Führer der Heiligen Schar | Epaminondas | 6 | Legendär | – | – | – | – | 2578 | 44,6 % | 52,2 % | +1,9 |
| Veles | Fabius | 1 | Basis | 4600 | 88,2 % | 48,7 % | −0,2 | 1274 | 60,1 % | 53,7 % | +4,0 |
| Triarier | Fabius | 2 | Basis | 4600 | 86,7 % | 49,0 % | +0,1 | 1634 | 55,4 % | 51,2 % | +1,4 |
| Hinhalten | Fabius | 2 | Basis | 4600 | 85,5 % | 48,9 % | +0,0 | 1650 | 60,7 % | 50,1 % | +0,3 |
| Konsul der Republik | Fabius | 4 | Basis | 4600 | 84,7 % | 49,4 % | +0,6 | 1672 | 50,0 % | 48,6 % | −1,2 |
| Verbrannte Erde | Fabius | 3 | Gewöhnlich | – | – | – | – | 1834 | 62,8 % | 48,2 % | −1,5 |
| Späher am Volturnus | Fabius | 2 | Gewöhnlich | – | – | – | – | 1718 | 58,4 % | 50,5 % | +0,7 |
| Minucius, der Reiteroberst | Fabius | 4 | Selten | – | – | – | – | 1740 | 51,7 % | 53,3 % | +3,5 |
| Rückeroberung von Tarent | Fabius | 6 | Selten | – | – | – | – | 2468 | 46,0 % | 55,7 % | +6,0 |
| Lager auf den Höhen | Fabius | 3 | Episch | – | – | – | – | 1758 | 63,7 % | 46,4 % | −3,3 |
| Marcellus, Schwert Roms | Fabius | 6 | Legendär | – | – | – | – | 2470 | 48,3 % | 48,5 % | −1,3 |
| Botin der Stämme | Thusnelda | 1 | Basis | 4600 | 77,4 % | 53,1 % | +2,5 | 1246 | 53,0 % | 55,2 % | +5,4 |
| Hüterin des Herdfeuers | Thusnelda | 2 | Basis | 4600 | 78,8 % | 51,4 % | +0,8 | 1734 | 51,6 % | 47,2 % | −2,6 |
| Ruf der Tumen | Thusnelda | 3 | Basis | 4600 | 72,5 % | 49,1 % | −1,5 | 1692 | 43,0 % | 47,9 % | −1,9 |
| Bogenreiterin der Chahar | Thusnelda | 3 | Basis | 4600 | 80,5 % | 52,5 % | +1,9 | 1752 | 55,4 % | 52,0 % | +2,2 |
| Schlacht von Tas Bürd | Thusnelda | 4 | Gewöhnlich | – | – | – | – | 1678 | 46,1 % | 49,7 % | −0,1 |
| Zwilling der Khatun | Thusnelda | 3 | Gewöhnlich | – | – | – | – | 1838 | 51,4 % | 51,5 % | +1,7 |
| Schwarzes Banner | Thusnelda | 2 | Selten | – | – | – | – | 1638 | 57,6 % | 48,1 % | −1,7 |
| Unterwerfung der Oiraten | Thusnelda | 5 | Selten | – | – | – | – | 2050 | 44,9 % | 52,2 % | +2,4 |
| Batu Möngke, der junge Khan | Thusnelda | 4 | Episch | – | – | – | – | 1636 | 43,6 % | 47,3 % | −2,5 |
| Wiedervereinigung der Mongolen | Thusnelda | 8 | Legendär | – | – | – | – | 1622 | 41,8 % | 55,3 % | +5,5 |
| Mamlukenrekrut | Baibars | 1 | Basis | 4600 | 83,2 % | 49,9 % | −1,4 | 1268 | 51,9 % | 50,5 % | +0,8 |
| Barid-Kurier | Baibars | 2 | Basis | 4600 | 79,3 % | 52,2 % | +0,9 | 1644 | 47,0 % | 52,0 % | +2,4 |
| Ain Dschalut | Baibars | 3 | Basis | 4600 | 85,3 % | 52,4 % | +1,1 | 1822 | 58,8 % | 50,6 % | +0,9 |
| Bogenreiter der Bahriya | Baibars | 3 | Basis | 4600 | 83,2 % | 50,5 % | −0,8 | 1714 | 49,4 % | 50,0 % | +0,4 |
| Manjaniq-Meister | Baibars | 4 | Gewöhnlich | – | – | – | – | 1622 | 49,9 % | 51,8 % | +2,1 |
| Vorgetäuschte Flucht | Baibars | 1 | Gewöhnlich | – | – | – | – | 1200 | 19,1 % | 42,7 % | −6,9 |
| Qutuz, Sultan von Ägypten | Baibars | 5 | Selten | – | – | – | – | 2052 | 45,3 % | 55,6 % | +6,0 |
| Sturm auf Antiochia | Baibars | 2 | Selten | – | – | – | – | 1660 | 47,5 % | 48,3 % | −1,4 |
| Zitadelle von Kairo | Baibars | 4 | Episch | – | – | – | – | 1744 | 33,4 % | 46,8 % | −2,9 |
| Qalawun, Emir der Bahriya | Baibars | 6 | Legendär | – | – | – | – | 2720 | 46,5 % | 57,2 % | +7,6 |
| Dreschflegelbauer | Vauban | 2 | Basis | 4600 | 76,7 % | 48,0 % | −1,1 | 1742 | 32,3 % | 47,3 % | −0,8 |
| Píšťala-Schütze | Vauban | 2 | Basis | 4600 | 84,0 % | 50,1 % | +1,0 | 1670 | 61,4 % | 49,1 % | +1,0 |
| Salve aus der Wagenburg | Vauban | 2 | Basis | 4600 | 78,0 % | 47,9 % | −1,2 | 1724 | 36,0 % | 46,1 % | −1,9 |
| Hauptmann der Taboriten | Vauban | 3 | Basis | 4600 | 83,8 % | 50,7 % | +1,6 | 1884 | 60,7 % | 54,9 % | +6,9 |
| Hakenbüchsenwagen | Vauban | 3 | Gewöhnlich | – | – | – | – | 1822 | 58,1 % | 45,5 % | −2,5 |
| Laienkelch | Vauban | 2 | Gewöhnlich | – | – | – | – | 1644 | 46,7 % | 50,5 % | +2,4 |
| Prager Fenstersturz | Vauban | 3 | Selten | – | – | – | – | 1826 | 52,0 % | 47,7 % | −0,3 |
| Wagenburg am Vítkov | Vauban | 4 | Selten | – | – | – | – | 1696 | 58,3 % | 36,8 % | −11,2 |
| Prokop der Kahle | Vauban | 6 | Episch | – | – | – | – | 2514 | 55,2 % | 48,5 % | +0,4 |
| Jan Hus, Prediger von Bethlehem | Vauban | 5 | Legendär | – | – | – | – | 1922 | 43,3 % | 51,6 % | +3,6 |
| Bogenschützin der Shang | Vix | 1 | Basis | 4600 | 83,3 % | 53,7 % | +2,6 | 1124 | 54,4 % | 52,9 % | +1,2 |
| Bronzene Yue-Axt | Vix | 2 | Basis | 4600 | 76,4 % | 54,0 % | +3,0 | 1660 | 40,1 % | 53,4 % | +1,7 |
| Streitwagen der Shang | Vix | 3 | Basis | 4600 | 82,9 % | 52,9 % | +1,8 | 1802 | 45,8 % | 53,6 % | +1,9 |
| Knochenwahrsager | Vix | 3 | Basis | 4600 | 81,9 % | 52,9 % | +1,8 | 1792 | 42,1 % | 53,6 % | +1,9 |
| Aufgebot gegen die Qiang | Vix | 4 | Gewöhnlich | – | – | – | – | 1744 | 50,3 % | 56,1 % | +4,4 |
| Ahnenopfer | Vix | 1 | Gewöhnlich | – | – | – | – | 1220 | 55,3 % | 53,5 % | +1,8 |
| Gravierte Schulterblätter | Vix | 1 | Selten | – | – | – | – | 1230 | 58,5 % | 54,1 % | +2,3 |
| Bogenschützinnen der Fu Hao | Vix | 4 | Selten | – | – | – | – | 1640 | 53,1 % | 58,0 % | +6,3 |
| Ahnentempel von Yin | Vix | 1 | Episch | – | – | – | – | 1264 | 59,2 % | 53,8 % | +2,1 |
| Wu Ding, König der Shang | Vix | 6 | Legendär | – | – | – | – | 2664 | 49,2 % | 56,8 % | +5,1 |
| Gladiator | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 6774 | 57,7 % | 52,3 % | +2,7 |
| Senator der Kurie | Rom und Germanien | 3 | Gewöhnlich | – | – | – | – | 7020 | 50,0 % | 50,9 % | +1,3 |
| Centurio | Rom und Germanien | 2 | Gewöhnlich | – | – | – | – | 6898 | 55,3 % | 53,7 % | +4,2 |
| Triumphzug | Rom und Germanien | 3 | Selten | – | – | – | – | 6874 | 44,7 % | 47,8 % | −1,7 |
| Via Appia | Rom und Germanien | 2 | Selten | – | – | – | – | 6844 | 54,1 % | 47,1 % | −2,4 |
| Vestalin am ewigen Feuer | Rom und Germanien | 3 | Selten | – | – | – | – | 6950 | 56,2 % | 47,5 % | −2,0 |
| Pax Romana | Rom und Germanien | 5 | Episch | – | – | – | – | 7822 | 53,4 % | 43,9 % | −5,6 |
| Wagenbauer | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 4950 | 50,1 % | 54,3 % | +2,9 |
| Schreiber im Lebenshaus | Frühzeit und Ägypten | 3 | Gewöhnlich | – | – | – | – | 5126 | 53,2 % | 51,7 % | +0,3 |
| Schuss vom Streitwagen | Frühzeit und Ägypten | 2 | Gewöhnlich | – | – | – | – | 4952 | 60,3 % | 56,2 % | +4,8 |
| Wache der Medjai | Frühzeit und Ägypten | 4 | Selten | – | – | – | – | 4974 | 47,0 % | 52,2 % | +0,8 |
| Angriff der Streitwagen | Frühzeit und Ägypten | 3 | Selten | – | – | – | – | 5290 | 54,5 % | 54,3 % | +2,9 |
| Bernsteinstraße | Frühzeit und Ägypten | 2 | Selten | – | – | – | – | 4782 | 55,0 % | 49,3 % | −2,0 |
| Festung Buhen | Frühzeit und Ägypten | 3 | Episch | – | – | – | – | 5128 | 50,4 % | 53,5 % | +2,1 |
| Akrit der Grenzmark | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 4994 | 54,6 % | 50,5 % | +2,0 |
| Gelehrter im Haus der Weisheit | Kreuzzüge | 3 | Gewöhnlich | – | – | – | – | 5262 | 50,9 % | 51,6 % | +3,1 |
| Tribut in Goldbyzantinern | Kreuzzüge | 2 | Gewöhnlich | – | – | – | – | 4994 | 28,2 % | 45,7 % | −2,8 |
| Arzt des Bimaristan | Kreuzzüge | 3 | Selten | – | – | – | – | 5226 | 59,5 % | 54,6 % | +6,1 |
| Theodosianische Mauern | Kreuzzüge | 2 | Selten | – | – | – | – | 5018 | 57,5 % | 44,9 % | −3,6 |
| Hagia Sophia | Kreuzzüge | 3 | Episch | – | – | – | – | 5196 | 60,1 % | 44,9 % | −3,6 |
| Ibn an-Nafis, Arzt von Kairo | Kreuzzüge | 4 | Episch | – | – | – | – | 4832 | 53,1 % | 51,0 % | +2,5 |
