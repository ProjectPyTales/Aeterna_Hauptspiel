# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `eb8b7e6ec1` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die neun anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,8.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 27200 | ✗ 15/16 | ✗ 110/120 | ✓ 46,3 % | – | 0 | 23 |
| Zufallsdecks | 27200 | ✗ 15/16 | ✗ 116/120 | ✓ 50,9 % | ✓ 52,9 % (+3,0) | 0 | 20 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Imhotep | **53,2 %** | 50,4 % | 55,4 % | Nostradamus 41,5 % | Boudicca 61,5 % | Defensiv: 37,9 % | ✗ |
| Leonidas I. | **51,8 %** | 50,9 % | 52,3 % | Dandolo 47,0 % | Amanirenas 63,5 % | Defensiv: 37,2 % | ✓ |
| Hypatia | **51,8 %** | 45,6 % | 57,5 % | Anna 43,5 % | Masako 61,5 % | Kombinierend: 45,1 % | ✓ |
| Hōjō Masako | **51,5 %** | 45,0 % | 57,7 % | Hypatia 38,5 % | Khan 60,5 % | Defensiv: 40,5 % | ✓ |
| Nezahualcóyotl | **51,2 %** | 46,9 % | 55,2 % | Imhotep 44,5 % | Anna 58,5 % | Defensiv: 39,3 % | ✓ |
| Dschingis Khan | **51,1 %** | 45,9 % | 56,0 % | Masako 39,5 % | Nostradamus 64,5 % | Aggressiv: 45,1 % | ✓ |
| Amanirenas | **50,8 %** | 47,9 % | 53,5 % | Leonidas 36,5 % | Jeanne 69,5 % | Aggressiv: 45,2 % | ✓ |
| Nostradamus | **50,5 %** | 49,7 % | 51,2 % | Khan 35,5 % | Imhotep 58,5 % | Kombinierend: 41,4 % | ✓ |
| Anna Komnene | **49,7 %** | 50,9 % | 48,5 % | Nezahualcóyotl 41,5 % | Hypatia 56,5 % | Kombinierend: 39,4 % | ✓ |
| Ragnar Lodbrok | **49,5 %** | 45,9 % | 53,2 % | Jeanne 40,0 % | Anna 56,5 % | Aggressiv: 41,4 % | ✓ |
| Jeanne d’Arc | **49,1 %** | 43,4 % | 55,1 % | Amanirenas 30,5 % | Musashi 62,0 % | Aggressiv: 51,7 % | ✓ |
| Enrico Dandolo | **48,6 %** | 46,4 % | 51,2 % | Musashi 42,5 % | Perikles 55,0 % | Kombinierend: 41,8 % | ✓ |
| Perikles | **48,3 %** | 43,5 % | 53,5 % | Hypatia 43,0 % | Agrippa 55,5 % | Defensiv: 40,0 % | ✓ |
| Boudicca | **48,0 %** | 42,0 % | 54,5 % | Imhotep 38,5 % | Musashi 63,0 % | Aggressiv: 43,0 % | ✓ |
| Marcus Agrippa | **47,6 %** | 43,0 % | 52,8 % | Khan 35,5 % | Boudicca 57,5 % | Kombinierend: 44,0 % | ✓ |
| Miyamoto Musashi | **47,1 %** | 43,0 % | 51,9 % | Boudicca 37,0 % | Dandolo 57,5 % | Aggressiv: 48,4 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 51 | 49 | 47 | 47 | 56 | 55 | 51 | 52 | 55 | 50 | 54 | **64** | 51 | 52 | 48 |
| Hypatia | 49 | · | 45 | 50 | 59 | 54 | 51 | 60 | 51 | 48 | 57 | 47 | 54 | 44 | 50 | **62** |
| Imhotep | 52 | 55 | · | 52 | 59 | **62** | 42 | 55 | 54 | 54 | 56 | 51 | 60 | 44 | 56 | 51 |
| Dandolo | 53 | 50 | 48 | · | 43 | 47 | 47 | 47 | 48 | 43 | 55 | 54 | 49 | 50 | 45 | 52 |
| Khan | 53 | 42 | 41 | 57 | · | 47 | **65** | 46 | 55 | 53 | 50 | **65** | 47 | 57 | 50 | **40** |
| Boudicca | 44 | 47 | **39** | 53 | 53 | · | 45 | 55 | 49 | **63** | 46 | 43 | 43 | 50 | 45 | 48 |
| Nostradamus | 45 | 50 | 59 | 53 | **36** | 55 | · | 53 | 47 | 49 | 54 | 53 | 52 | 49 | 55 | 50 |
| Jeanne | 49 | 41 | 45 | 53 | 54 | 45 | 47 | · | 60 | **62** | 56 | 51 | **31** | 53 | 49 | 43 |
| Ragnar | 49 | 50 | 47 | 52 | 45 | 51 | 53 | 40 | · | 47 | 50 | 52 | 47 | 56 | 54 | 51 |
| Musashi | 45 | 53 | 46 | 57 | 47 | **37** | 51 | **38** | 53 | · | 51 | 52 | **38** | 49 | 43 | 46 |
| Perikles | 51 | 43 | 44 | 45 | 50 | 54 | 46 | 44 | 51 | 49 | · | 56 | 45 | 52 | 50 | 46 |
| Agrippa | 46 | 53 | 50 | 46 | **36** | 57 | 48 | 49 | 48 | 48 | 44 | · | 47 | 49 | 46 | 49 |
| Amanirenas | **37** | 46 | 40 | 51 | 53 | 57 | 49 | **70** | 53 | **62** | 55 | 53 | · | 44 | 44 | 50 |
| Anna | 49 | 56 | 56 | 51 | 43 | 50 | 51 | 47 | 44 | 51 | 49 | 51 | 56 | · | 42 | 51 |
| Nezahualcóyotl | 49 | 51 | 44 | 55 | 50 | 55 | 45 | 52 | 47 | 57 | 51 | 54 | 56 | 59 | · | 45 |
| Masako | 53 | **39** | 50 | 48 | **61** | 52 | 51 | 57 | 49 | 54 | 54 | 52 | 51 | 50 | 55 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (6 Helden) 45,8 % aufs Gesicht, 1,3 % auf Bauwerke · **Defensiv** (5 Helden) 39,0 % aufs Gesicht, 1,4 % auf Bauwerke · **Kombinierend** (5 Helden) 42,3 % aufs Gesicht, 1,5 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 24,2, Median 23, 10–90 %: 17–33, kürzeste 9, längste 63. Beginner gewinnt 46,3 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Belagerungsturm | neutral | 6 | 55,5 % | +5,5 | 75,3 % |
| Goldener Reiter | Khan | 4 | 56,1 % | +5,2 | 69,5 % |
| Warägergardist | Anna | 3 | 53,9 % | +4,2 | 81,9 % |
| Pilumwerfer | Agrippa | 1 | 51,8 % | +3,8 | 76,9 % |
| Rede auf die Gefallenen | Perikles | 3 | 52,3 % | +3,8 | 78,6 % |
| Kopistin der Chronik | Anna | 1 | 52,9 % | +3,2 | 80,7 % |
| Sternenregen | Hypatia | 4 | 54,6 % | +3,0 | 77,4 % |
| Handelsgesandter | Dandolo | 4 | 51,8 % | +3,0 | 77,4 % |
| Hainwächterin | Boudicca | 1 | 46,7 % | −1,6 | 81,6 % |
| Reiterbogenschütze | Khan | 2 | 49,4 % | −1,6 | 75,9 % |
| Eichenhaut | Boudicca | 2 | 46,6 % | −1,6 | 72,7 % |
| Bibliothekslehrling | Hypatia | 1 | 49,9 % | −1,7 | 83,2 % |
| Pfeilschuss | Khan | 2 | 49,1 % | −1,8 | 75,4 % |
| Gokenin aus Sagami | Masako | 1 | 49,4 % | −1,9 | 80,3 % |
| Nonne von Kamakura | Masako | 2 | 49,3 % | −2,0 | 81,4 % |
| Lange Mauern | Perikles | 2 | 44,2 % | −4,3 | 77,4 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Enrico Dandolo | **53,2 %** | 55,1 % | 50,6 % | Ragnar 43,5 % | Jeanne 60,5 % | Kombinierend: 45,4 % | ✗ |
| Boudicca | **53,0 %** | 53,9 % | 51,4 % | Leonidas 45,5 % | Khan 60,5 % | Aggressiv: 50,2 % | ✓ |
| Ragnar Lodbrok | **51,6 %** | 51,8 % | 51,1 % | Nostradamus 46,5 % | Khan 59,5 % | Aggressiv: 48,8 % | ✓ |
| Nostradamus | **51,3 %** | 52,6 % | 49,7 % | Dandolo 44,5 % | Masako 61,0 % | Kombinierend: 45,9 % | ✓ |
| Marcus Agrippa | **50,2 %** | 49,4 % | 50,9 % | Leonidas 43,5 % | Imhotep 60,5 % | Kombinierend: 47,3 % | ✓ |
| Leonidas I. | **50,1 %** | 49,4 % | 50,8 % | Dandolo 43,5 % | Agrippa 56,5 % | Defensiv: 39,4 % | ✓ |
| Anna Komnene | **50,0 %** | 52,5 % | 47,5 % | Boudicca 44,5 % | Nezahualcóyotl 57,0 % | Kombinierend: 44,1 % | ✓ |
| Dschingis Khan | **49,9 %** | 48,8 % | 51,0 % | Boudicca 39,5 % | Anna 55,0 % | Aggressiv: 51,8 % | ✓ |
| Miyamoto Musashi | **49,9 %** | 50,0 % | 49,8 % | Khan 45,5 % | Imhotep 55,0 % | Aggressiv: 54,6 % | ✓ |
| Nezahualcóyotl | **49,8 %** | 51,6 % | 48,1 % | Dandolo 41,5 % | Agrippa 55,5 % | Defensiv: 40,7 % | ✓ |
| Perikles | **49,6 %** | 51,5 % | 47,9 % | Dandolo 42,5 % | Imhotep 55,5 % | Defensiv: 42,6 % | ✓ |
| Hypatia | **49,1 %** | 50,5 % | 47,9 % | Boudicca 42,5 % | Agrippa 52,0 % | Kombinierend: 44,9 % | ✓ |
| Amanirenas | **49,0 %** | 50,6 % | 47,6 % | Nostradamus 44,0 % | Jeanne 58,5 % | Aggressiv: 49,3 % | ✓ |
| Jeanne d’Arc | **48,3 %** | 50,5 % | 46,5 % | Dandolo 39,5 % | Imhotep 56,5 % | Aggressiv: 51,3 % | ✓ |
| Imhotep | **47,9 %** | 49,4 % | 46,9 % | Agrippa 39,5 % | Nezahualcóyotl 57,0 % | Defensiv: 39,6 % | ✓ |
| Hōjō Masako | **47,1 %** | 47,6 % | 47,3 % | Nostradamus 39,0 % | Musashi 53,0 % | Defensiv: 39,5 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 49 | 54 | 44 | 49 | 55 | 54 | 48 | 48 | 48 | 46 | 56 | 54 | 47 | 50 | 53 |
| Hypatia | 52 | · | 50 | 51 | 49 | 43 | 47 | 48 | 51 | 49 | 45 | 52 | 51 | 51 | 50 | 51 |
| Imhotep | 47 | 50 | · | 45 | 51 | 48 | 47 | 44 | 46 | 45 | 45 | **40** | 51 | 50 | 57 | 56 |
| Dandolo | 56 | 50 | 55 | · | 46 | 48 | 56 | **61** | 44 | 53 | 57 | 56 | 53 | 50 | 59 | 56 |
| Khan | 51 | 51 | 50 | 54 | · | **40** | 52 | 51 | 41 | 55 | 54 | 48 | 52 | 55 | 45 | 53 |
| Boudicca | 45 | 57 | 52 | 53 | **61** | · | 47 | 57 | 51 | 55 | 56 | 54 | 53 | 56 | 48 | 53 |
| Nostradamus | 47 | 53 | 53 | 44 | 48 | 53 | · | 57 | 54 | 47 | 49 | 53 | 56 | 46 | 49 | **61** |
| Jeanne | 52 | 53 | 56 | **40** | 49 | 43 | 43 | · | 54 | 49 | 45 | 48 | 42 | 52 | 50 | 52 |
| Ragnar | 52 | 49 | 54 | 56 | 60 | 50 | 47 | 47 | · | 49 | 54 | 55 | 50 | 52 | 50 | 53 |
| Musashi | 52 | 52 | 55 | 47 | 45 | 45 | 53 | 51 | 52 | · | 48 | 49 | 52 | 53 | 49 | 47 |
| Perikles | 54 | 55 | 55 | 43 | 47 | 44 | 51 | 55 | 46 | 52 | · | 48 | 50 | 44 | 51 | 52 |
| Agrippa | 44 | 48 | **61** | 44 | 53 | 47 | 48 | 52 | 45 | 52 | 53 | · | 51 | 56 | 45 | 59 |
| Amanirenas | 47 | 50 | 50 | 47 | 48 | 47 | 44 | 59 | 51 | 49 | 51 | 50 | · | 49 | 47 | 50 |
| Anna | 53 | 49 | 51 | 50 | 45 | 44 | 54 | 49 | 48 | 48 | 56 | 44 | 51 | · | 57 | 51 |
| Nezahualcóyotl | 51 | 50 | 43 | 42 | 55 | 52 | 51 | 51 | 51 | 52 | 50 | 55 | 53 | 43 | · | 51 |
| Masako | 47 | 49 | 44 | 44 | 48 | 48 | **39** | 49 | 48 | 53 | 49 | 42 | 51 | 50 | 50 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (6 Helden) 51,0 % aufs Gesicht, 6,4 % auf Bauwerke · **Defensiv** (5 Helden) 40,4 % aufs Gesicht, 8,9 % auf Bauwerke · **Kombinierend** (5 Helden) 45,5 % aufs Gesicht, 8,0 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 21,5, Median 20, 10–90 %: 15–30, kürzeste 8, längste 73. Beginner gewinnt 50,9 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Kataphrakt | Anna | 5 | 63,4 % | +13,4 | 47,2 % |
| Wächter des Weltenbaums | neutral | 8 | 60,6 % | +10,6 | 44,4 % |
| Phalanxveteran | Leonidas | 5 | 59,1 % | +9,0 | 56,3 % |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 58,2 % | +8,4 | 56,8 % |
| Goldener Reiter | Khan | 4 | 58,2 % | +8,3 | 45,4 % |
| Triere von Salamis | Perikles | 4 | 57,8 % | +8,1 | 52,1 % |
| Strategos | Perikles | 3 | 57,7 % | +8,0 | 57,1 % |
| Griechisches Feuer | Anna | 4 | 57,9 % | +7,9 | 48,2 % |
| Schwertschüler aus Kokura | Musashi | 4 | 44,0 % | −5,9 | 43,1 % |
| Leuchtturm von Pharos | Griechische Antike | 3 | 43,7 % | −6,0 | 38,3 % |
| Engpass der Thermopylen | Leonidas | 3 | 44,1 % | −6,0 | 52,6 % |
| Eichenhaut | Boudicca | 2 | 46,2 % | −6,4 | 41,0 % |
| Burgfried | Europäisches Mittelalter | 2 | 43,6 % | −7,7 | 56,9 % |
| Jurtenlager | Khan | 3 | 41,8 % | −8,1 | 35,1 % |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | 40,5 % | −9,4 | 53,7 % |
| Große Mauer | China, Korea, Japan | 3 | 36,4 % | −12,2 | 58,3 % |

**Legendäre** (AP 5.3) – als Gruppe 52,9 % „gewinnt, wenn gezogen“ (+3,0 gegenüber ihrem Helden, 32577 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Lagertha, Schildmaid | Ragnar | 7 | 56,8 % | +5,4 | 44,4 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 56,3 % | +3,4 | 42,9 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 55,8 % | +5,8 | 42,5 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 55,7 % | +5,6 | 49,1 % |
| Subutai, der Stratege | Khan | 6 | 53,6 % | +3,7 | 42,7 % |
| Theon von Alexandria | Hypatia | 5 | 53,6 % | +4,4 | 49,1 % |
| Herodot, Vater der Geschichte | neutral | 4 | 52,4 % | +2,4 | 42,1 % |
| Bronzekopf des Augustus | Amanirenas | 6 | 52,0 % | +3,0 | 46,7 % |
| Caterina de’ Medici | Nostradamus | 5 | 51,7 % | +0,5 | 50,5 % |
| Djoser, der Erbauer | Imhotep | 6 | 51,2 % | +3,0 | 49,5 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 51,2 % | +1,5 | 51,7 % |
| La Hire, der Unbeugsame | Jeanne | 7 | 50,1 % | +1,6 | 42,1 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 50,1 % | −0,1 | 42,4 % |
| Alexios I. Komnenos | Anna | 6 | 49,6 % | −0,4 | 46,6 % |
| Sasaki Kojirō, der Rivale | Musashi | 6 | 49,4 % | −0,5 | 46,4 % |
| Andraste, Göttin des Sieges | Boudicca | 8 | 48,4 % | −4,2 | 45,9 % |
| Minamoto no Yoritomo | Masako | 6 | 48,0 % | +0,5 | 50,2 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 44,2 % | −5,6 | 46,0 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 3400 | 80,4 % | 52,6 % | +1,0 | 886 | 53,3 % | 53,1 % | +3,0 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 3400 | 80,8 % | 52,1 % | +0,4 | 1230 | 57,2 % | 53,4 % | +3,3 |
| Bronzener Wall | Leonidas | 2 | Basis | 3400 | 80,7 % | 53,5 % | +1,9 | 1230 | 52,8 % | 49,2 % | −0,9 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 3400 | 76,7 % | 53,5 % | +1,9 | 1170 | 45,8 % | 48,2 % | −1,9 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1268 | 56,9 % | 55,3 % | +5,2 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1290 | 54,3 % | 48,6 % | −1,5 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1438 | 56,3 % | 59,1 % | +9,0 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1186 | 46,6 % | 47,6 % | −2,5 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 1792 | 53,1 % | 46,7 % | −3,4 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 1548 | 49,1 % | 55,7 % | +5,6 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 3400 | 83,2 % | 49,9 % | −1,7 | 878 | 55,5 % | 47,3 % | −1,9 |
| Himmelsstrahl | Hypatia | 2 | Basis | 3400 | 86,1 % | 51,2 % | −0,4 | 1210 | 55,9 % | 53,3 % | +4,1 |
| Sternenkundiger | Hypatia | 3 | Basis | 3400 | 81,2 % | 53,2 % | +1,6 | 1406 | 48,2 % | 51,8 % | +2,6 |
| Sternenregen | Hypatia | 4 | Basis | 3400 | 77,4 % | 54,6 % | +3,0 | 1124 | 47,3 % | 56,9 % | +7,6 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1322 | 58,8 % | 54,5 % | +5,3 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1246 | 41,9 % | 48,5 % | −0,7 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1358 | 46,9 % | 52,3 % | +3,1 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 1902 | 54,9 % | 47,8 % | −1,4 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 1396 | 53,3 % | 46,6 % | −2,6 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1470 | 49,1 % | 53,6 % | +4,4 |
| Nilschülerin | Imhotep | 1 | Basis | 3400 | 82,9 % | 52,9 % | +0,1 | 1022 | 57,7 % | 48,2 % | +0,0 |
| Heilender Balsam | Imhotep | 1 | Basis | 3400 | 82,6 % | 54,6 % | +1,7 | 988 | 56,6 % | 54,2 % | +6,1 |
| Pyramidenwächter | Imhotep | 3 | Basis | 3400 | 84,7 % | 53,4 % | +0,5 | 1418 | 58,2 % | 50,9 % | +2,7 |
| Tempelärztin | Imhotep | 4 | Basis | 3400 | 80,7 % | 52,8 % | −0,0 | 1340 | 51,6 % | 46,0 % | −2,1 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1358 | 53,7 % | 52,4 % | +4,2 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1442 | 59,7 % | 52,8 % | +4,7 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1332 | 48,9 % | 48,7 % | +0,6 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1538 | 54,1 % | 53,8 % | +5,7 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 1510 | 55,3 % | 48,1 % | −0,0 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 1866 | 49,5 % | 51,2 % | +3,0 |
| Lagunenbote | Dandolo | 1 | Basis | 3400 | 78,5 % | 51,3 % | +2,5 | 886 | 56,2 % | 55,7 % | +2,8 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 3400 | 79,7 % | 48,1 % | −0,7 | 1214 | 48,4 % | 51,7 % | −1,1 |
| Präziser Stich | Dandolo | 2 | Basis | 3400 | 83,6 % | 50,0 % | +1,2 | 1238 | 57,3 % | 52,2 % | −0,6 |
| Handelsgesandter | Dandolo | 4 | Basis | 3400 | 77,4 % | 51,8 % | +3,0 | 1142 | 51,8 % | 57,3 % | +4,5 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1232 | 41,2 % | 55,7 % | +2,8 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1262 | 57,1 % | 58,4 % | +5,6 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1276 | 44,7 % | 54,6 % | +1,8 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1248 | 51,3 % | 54,3 % | +1,4 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1312 | 35,3 % | 50,7 % | −2,1 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 1716 | 42,9 % | 56,3 % | +3,4 |
| Steppenspäher | Khan | 1 | Basis | 3400 | 75,3 % | 49,8 % | −1,1 | 1048 | 48,1 % | 47,4 % | −2,5 |
| Reiterbogenschütze | Khan | 2 | Basis | 3400 | 75,9 % | 49,4 % | −1,6 | 1466 | 50,8 % | 52,1 % | +2,2 |
| Pfeilschuss | Khan | 2 | Basis | 3400 | 75,4 % | 49,1 % | −1,8 | 1482 | 55,5 % | 50,7 % | +0,8 |
| Goldener Reiter | Khan | 4 | Basis | 3400 | 69,5 % | 56,1 % | +5,2 | 1298 | 45,4 % | 58,2 % | +8,3 |
| Adlerjägerin | Khan | 3 | Gewöhnlich | – | – | – | – | 1492 | 44,8 % | 51,8 % | +1,8 |
| Steppensturm | Khan | 3 | Gewöhnlich | – | – | – | – | 1474 | 44,5 % | 48,9 % | −1,0 |
| Tumenwächter | Khan | 5 | Selten | – | – | – | – | 1400 | 43,2 % | 51,6 % | +1,6 |
| Belagerungsfeuer | Khan | 6 | Selten | – | – | – | – | 1752 | 48,1 % | 54,4 % | +4,5 |
| Keshig-Elite | Khan | 6 | Episch | – | – | – | – | 1768 | 40,9 % | 44,7 % | −5,2 |
| Subutai, der Stratege | Khan | 6 | Legendär | – | – | – | – | 1672 | 42,7 % | 53,6 % | +3,7 |
| Hainwächterin | Boudicca | 1 | Basis | 3400 | 81,6 % | 46,7 % | −1,6 | 934 | 49,8 % | 57,4 % | +4,8 |
| Eichenhaut | Boudicca | 2 | Basis | 3400 | 72,7 % | 46,6 % | −1,6 | 1270 | 41,0 % | 46,2 % | −6,4 |
| Icenerkrieger | Boudicca | 3 | Basis | 3400 | 84,6 % | 49,2 % | +0,9 | 1268 | 55,8 % | 55,9 % | +3,3 |
| Wilder Hieb | Boudicca | 3 | Basis | 3400 | 83,6 % | 47,2 % | −1,0 | 1302 | 57,7 % | 50,3 % | −2,4 |
| Streitwagenlenkerin | Boudicca | 4 | Gewöhnlich | – | – | – | – | 1174 | 47,2 % | 52,4 % | −0,2 |
| Druidin des Hains | Boudicca | 3 | Gewöhnlich | – | – | – | – | 1300 | 52,3 % | 48,1 % | −4,6 |
| Aufstand | Boudicca | 3 | Selten | – | – | – | – | 1276 | 54,8 % | 54,7 % | +2,1 |
| Eichenkoloss | Boudicca | 6 | Selten | – | – | – | – | 1838 | 51,7 % | 52,0 % | −0,6 |
| Zorn der Königin | Boudicca | 5 | Episch | – | – | – | – | 1370 | 35,0 % | 48,8 % | −3,8 |
| Andraste, Göttin des Sieges | Boudicca | 8 | Legendär | – | – | – | – | 1038 | 45,9 % | 48,4 % | −4,2 |
| Tintenlehrling | Nostradamus | 1 | Basis | 3400 | 84,6 % | 53,3 % | +2,8 | 1034 | 56,1 % | 56,4 % | +5,2 |
| Dunkle Vorahnung | Nostradamus | 2 | Basis | 3400 | 88,6 % | 53,3 % | +2,8 | 1414 | 65,5 % | 53,8 % | +2,6 |
| Maskierter Seher | Nostradamus | 3 | Basis | 3400 | 83,9 % | 51,0 % | +0,6 | 1482 | 47,2 % | 50,1 % | −1,1 |
| Prophezeiung | Nostradamus | 4 | Basis | 3400 | 63,9 % | 50,9 % | +0,5 | 1270 | 20,8 % | 51,0 % | −0,2 |
| Pestdoktor | Nostradamus | 4 | Gewöhnlich | – | – | – | – | 1302 | 56,8 % | 58,7 % | +7,5 |
| Schattenpakt | Nostradamus | 2 | Gewöhnlich | – | – | – | – | 1370 | 59,2 % | 56,1 % | +4,9 |
| Chronist der Nacht | Nostradamus | 5 | Selten | – | – | – | – | 1404 | 50,4 % | 51,0 % | −0,2 |
| Rote Finsternis | Nostradamus | 5 | Selten | – | – | – | – | 1488 | 41,4 % | 54,8 % | +3,6 |
| Wächter der Zeiten | Nostradamus | 6 | Episch | – | – | – | – | 1862 | 58,1 % | 54,6 % | +3,4 |
| Caterina de’ Medici | Nostradamus | 5 | Legendär | – | – | – | – | 1458 | 50,5 % | 51,7 % | +0,5 |
| Bauernrekrut | Jeanne | 1 | Basis | 3400 | 78,8 % | 48,8 % | −0,4 | 936 | 55,8 % | 52,7 % | +4,2 |
| Bannersegen | Jeanne | 2 | Basis | 3400 | 78,6 % | 50,0 % | +0,7 | 1224 | 50,6 % | 51,6 % | +3,1 |
| Wache von Orléans | Jeanne | 3 | Basis | 3400 | 77,9 % | 48,7 % | −0,5 | 1338 | 54,3 % | 50,6 % | +2,1 |
| Die Fahne erheben | Jeanne | 2 | Basis | 3400 | 77,0 % | 48,2 % | −1,0 | 1222 | 51,9 % | 51,2 % | +2,7 |
| Lilienritter | Jeanne | 4 | Gewöhnlich | – | – | – | – | 1164 | 40,5 % | 49,4 % | +0,9 |
| Heiliger Schutz | Jeanne | 2 | Gewöhnlich | – | – | – | – | 1256 | 45,5 % | 51,1 % | +2,6 |
| Standartenträgerin | Jeanne | 5 | Selten | – | – | – | – | 1286 | 47,4 % | 49,4 % | +0,9 |
| Glocken von Reims | Jeanne | 6 | Selten | – | – | – | – | 1670 | 41,8 % | 48,9 % | +0,4 |
| Paladin der Loire | Jeanne | 7 | Episch | – | – | – | – | 1538 | 42,4 % | 49,5 % | +1,0 |
| La Hire, der Unbeugsame | Jeanne | 7 | Legendär | – | – | – | – | 1458 | 42,1 % | 50,1 % | +1,6 |
| Fjordspäher | Ragnar | 1 | Basis | 3400 | 77,0 % | 48,1 % | −1,4 | 898 | 49,9 % | 56,0 % | +4,5 |
| Runenblitz | Ragnar | 2 | Basis | 3400 | 81,4 % | 49,6 % | +0,1 | 1252 | 57,3 % | 54,9 % | +3,5 |
| Schildmaid | Ragnar | 3 | Basis | 3400 | 80,0 % | 50,2 % | +0,7 | 1264 | 53,2 % | 54,6 % | +3,1 |
| Runenschnitzer | Ragnar | 4 | Basis | 3400 | 75,9 % | 51,5 % | +2,0 | 1152 | 49,5 % | 51,3 % | −0,1 |
| Donnerschlag | Ragnar | 3 | Gewöhnlich | – | – | – | – | 1326 | 55,6 % | 51,1 % | −0,3 |
| Berserker vom Fjord | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1130 | 45,9 % | 52,0 % | +0,6 |
| Ahnenbund | Ragnar | 3 | Selten | – | – | – | – | 1244 | 52,4 % | 52,6 % | +1,2 |
| Runenhüter | Ragnar | 5 | Selten | – | – | – | – | 1354 | 45,5 % | 46,7 % | −4,7 |
| Sturm der Nordsee | Ragnar | 5 | Episch | – | – | – | – | 1324 | 52,6 % | 55,1 % | +3,7 |
| Lagertha, Schildmaid | Ragnar | 7 | Legendär | – | – | – | – | 1620 | 44,4 % | 56,8 % | +5,4 |
| Dojoschüler | Musashi | 1 | Basis | 3400 | 79,7 % | 46,8 % | −0,6 | 898 | 51,9 % | 53,4 % | +3,5 |
| Schneller Schnitt | Musashi | 1 | Basis | 3400 | 83,1 % | 48,5 % | +1,0 | 898 | 47,3 % | 49,7 % | −0,2 |
| Rōnin | Musashi | 3 | Basis | 3400 | 82,3 % | 48,4 % | +1,0 | 1300 | 47,5 % | 51,9 % | +2,0 |
| Konzentration | Musashi | 2 | Basis | 3400 | 72,8 % | 49,3 % | +1,8 | 1280 | 40,9 % | 49,0 % | −0,9 |
| Kirschblütenwache | Musashi | 3 | Gewöhnlich | – | – | – | – | 1312 | 52,0 % | 50,3 % | +0,3 |
| Zwei Himmel | Musashi | 3 | Gewöhnlich | – | – | – | – | 1282 | 36,3 % | 50,7 % | +0,8 |
| Duellant | Musashi | 4 | Selten | – | – | – | – | 1134 | 40,1 % | 46,4 % | −3,5 |
| Der leere Geist | Musashi | 5 | Selten | – | – | – | – | 1348 | 37,3 % | 55,0 % | +5,1 |
| Meister der fünf Ringe | Musashi | 6 | Episch | – | – | – | – | 1772 | 50,1 % | 48,8 % | −1,1 |
| Sasaki Kojirō, der Rivale | Musashi | 6 | Legendär | – | – | – | – | 1648 | 46,4 % | 49,4 % | −0,5 |
| Dorfwache | neutral | 1 | Basis | 54400 | 79,6 % | 49,3 % | −0,7 | 15290 | 53,4 % | 49,1 % | −0,9 |
| Wandernder Händler | neutral | 2 | Basis | 54400 | 76,6 % | 49,2 % | −0,8 | 21000 | 48,8 % | 49,8 % | −0,2 |
| Steinschleuderer | neutral | 2 | Basis | 54400 | 80,3 % | 49,4 % | −0,6 | 20674 | 52,4 % | 50,1 % | +0,1 |
| Grenzläuferin | neutral | 3 | Basis | 54400 | 81,6 % | 50,7 % | +0,7 | 21436 | 52,1 % | 52,7 % | +2,7 |
| Festungsschild | neutral | 4 | Basis | 54400 | 75,4 % | 50,9 % | +0,9 | 19944 | 46,1 % | 50,6 % | +0,6 |
| Kavallerist | neutral | 4 | Basis | 54400 | 77,0 % | 51,3 % | +1,3 | 19942 | 46,0 % | 51,7 % | +1,7 |
| Feldheilerin | neutral | 3 | Basis | 54400 | 79,2 % | 49,4 % | −0,6 | 21912 | 51,7 % | 48,6 % | −1,4 |
| Archivarin | neutral | 4 | Basis | 54400 | 72,9 % | 52,4 % | +2,4 | 20066 | 44,7 % | 51,2 % | +1,2 |
| Wachhund | neutral | 2 | Basis | 54400 | 78,4 % | 48,6 % | −1,4 | 20522 | 49,6 % | 48,9 % | −1,1 |
| Veteran | neutral | 5 | Basis | 54400 | 78,0 % | 52,5 % | +2,5 | 23262 | 49,1 % | 49,3 % | −0,7 |
| Belagerungsturm | neutral | 6 | Basis | 54400 | 75,3 % | 55,5 % | +5,5 | 29342 | 50,2 % | 50,0 % | +0,1 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 21708 | 50,1 % | 50,0 % | +0,1 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 15340 | 52,5 % | 51,7 % | +1,7 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 23312 | 50,3 % | 53,7 % | +3,8 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 21614 | 50,1 % | 49,7 % | −0,3 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 20560 | 49,2 % | 49,5 % | −0,5 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 20664 | 40,7 % | 49,8 % | −0,2 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 15288 | 49,1 % | 47,5 % | −2,5 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 20860 | 56,4 % | 49,9 % | −0,1 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 25974 | 50,5 % | 54,0 % | +4,0 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 21774 | 53,8 % | 50,5 % | +0,5 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 19994 | 47,1 % | 48,9 % | −1,1 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 20878 | 53,1 % | 52,4 % | +2,4 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 20216 | 47,8 % | 51,9 % | +2,0 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 21594 | 55,7 % | 53,0 % | +3,1 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 20638 | 27,6 % | 44,8 % | −5,2 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 19986 | 47,8 % | 46,3 % | −3,7 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 23200 | 46,2 % | 51,0 % | +1,1 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 19930 | 51,1 % | 53,1 % | +3,2 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 20248 | 45,4 % | 54,2 % | +4,3 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 23446 | 51,1 % | 51,2 % | +1,2 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 23062 | 48,0 % | 50,2 % | +0,3 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 20376 | 40,8 % | 48,7 % | −1,2 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 29592 | 53,3 % | 51,0 % | +1,0 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 26234 | 45,2 % | 52,3 % | +2,3 |
| Vergessene Weisheit | neutral | 4 | Episch | – | – | – | – | 19876 | 23,6 % | 48,7 % | −1,3 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 18126 | 44,4 % | 60,6 % | +10,6 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 26216 | 53,5 % | 52,8 % | +2,8 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 19850 | 42,1 % | 52,4 % | +2,4 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 17936 | 42,5 % | 55,8 % | +5,8 |
| Agent des Zehnerrats | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1300 | 57,7 % | 54,3 % | +1,5 |
| Tributeintreiber | Khan | 3 | Gewöhnlich | – | – | – | – | 1394 | 50,4 % | 45,9 % | −4,0 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1394 | 54,2 % | 50,2 % | +2,1 |
| Brand von Londinium | Boudicca | 3 | Selten | – | – | – | – | 1270 | 50,2 % | 53,5 % | +0,8 |
| Bannbulle | Nostradamus | 1 | Selten | – | – | – | – | 1072 | 57,0 % | 54,7 % | +3,5 |
| Plünderer von Paris | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1196 | 47,6 % | 48,3 % | −3,1 |
| Zorn des Donnergottes | Ragnar | 1 | Gewöhnlich | – | – | – | – | 926 | 57,3 % | 49,6 % | −1,8 |
| Shinobi aus Iga | Musashi | 2 | Gewöhnlich | – | – | – | – | 1266 | 52,1 % | 52,4 % | +2,5 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 20824 | 51,2 % | 48,9 % | −1,1 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 15626 | 53,6 % | 52,2 % | +2,2 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 20626 | 56,0 % | 52,2 % | +2,2 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 21662 | 50,2 % | 52,6 % | +2,6 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 21614 | 55,3 % | 51,4 % | +1,4 |
| Ruderer der Triere | Perikles | 1 | Basis | 3400 | 78,8 % | 50,3 % | +1,8 | 878 | 57,1 % | 54,5 % | +4,8 |
| Lange Mauern | Perikles | 2 | Basis | 3400 | 77,4 % | 44,2 % | −4,3 | 1182 | 55,2 % | 45,7 % | −4,0 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 3400 | 78,6 % | 52,3 % | +3,8 | 1208 | 54,2 % | 54,5 % | +4,8 |
| Strategos | Perikles | 3 | Basis | 3400 | 77,0 % | 51,1 % | +2,6 | 1248 | 57,1 % | 57,7 % | +8,0 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1256 | 48,0 % | 45,1 % | −4,6 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1254 | 58,1 % | 55,7 % | +6,0 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1158 | 52,1 % | 57,8 % | +8,1 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1200 | 36,5 % | 53,8 % | +4,1 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1136 | 35,9 % | 44,9 % | −4,8 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 1806 | 51,7 % | 51,2 % | +1,5 |
| Pilumwerfer | Agrippa | 1 | Basis | 3400 | 76,9 % | 51,8 % | +3,8 | 1036 | 56,0 % | 56,4 % | +6,3 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 3400 | 73,3 % | 50,1 % | +2,2 | 1442 | 46,7 % | 54,2 % | +4,1 |
| Castra | Agrippa | 3 | Basis | 3400 | 81,9 % | 48,9 % | +1,0 | 1406 | 61,2 % | 50,3 % | +0,1 |
| Testudo | Agrippa | 2 | Basis | 3400 | 73,2 % | 50,0 % | +2,1 | 1376 | 48,8 % | 53,8 % | +3,6 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1350 | 49,6 % | 47,3 % | −2,8 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1326 | 51,2 % | 54,6 % | +4,5 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1550 | 51,2 % | 54,3 % | +4,1 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1416 | 51,9 % | 51,1 % | +1,0 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1296 | 39,9 % | 48,5 % | −1,6 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1590 | 42,4 % | 50,1 % | −0,1 |
| Bogenschütze von Ta-Seti | Amanirenas | 1 | Basis | 3400 | 81,9 % | 51,2 % | +0,5 | 1042 | 57,0 % | 49,1 % | +0,1 |
| Wüstenreiter | Amanirenas | 2 | Basis | 3400 | 80,9 % | 50,1 % | −0,6 | 1328 | 58,3 % | 48,1 % | −1,0 |
| Pfeilregen von Kusch | Amanirenas | 2 | Basis | 3400 | 77,9 % | 51,8 % | +1,1 | 1446 | 45,6 % | 51,1 % | +2,0 |
| Speerträger von Napata | Amanirenas | 3 | Basis | 3400 | 82,2 % | 51,9 % | +1,2 | 1426 | 53,6 % | 48,5 % | −0,6 |
| Wächter des Löwentempels | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1366 | 52,9 % | 55,2 % | +6,1 |
| Kundschafter aus Meroë | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1398 | 56,7 % | 49,0 % | −0,1 |
| Kriegselefant von Kusch | Amanirenas | 6 | Selten | – | – | – | – | 1882 | 55,9 % | 51,0 % | +2,0 |
| Überfall auf Syene | Amanirenas | 3 | Selten | – | – | – | – | 1514 | 56,5 % | 46,7 % | −2,4 |
| Akinidad, Prinz von Kusch | Amanirenas | 5 | Episch | – | – | – | – | 1506 | 56,6 % | 44,3 % | −4,8 |
| Bronzekopf des Augustus | Amanirenas | 6 | Legendär | – | – | – | – | 1774 | 46,7 % | 52,0 % | +3,0 |
| Kopistin der Chronik | Anna | 1 | Basis | 3400 | 80,7 % | 52,9 % | +3,2 | 1010 | 53,8 % | 52,7 % | +2,7 |
| Pantokrator-Spital | Anna | 3 | Basis | 3400 | 70,9 % | 50,7 % | +1,0 | 1456 | 28,7 % | 47,6 % | −2,4 |
| Warägergardist | Anna | 3 | Basis | 3400 | 81,9 % | 53,9 % | +4,2 | 1476 | 53,5 % | 56,0 % | +6,0 |
| Hofärztin | Anna | 3 | Basis | 3400 | 80,2 % | 49,3 % | −0,4 | 1422 | 43,2 % | 46,7 % | −3,3 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1284 | 48,2 % | 57,9 % | +7,9 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1234 | 45,5 % | 55,7 % | +5,7 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1408 | 47,2 % | 63,4 % | +13,4 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1468 | 36,1 % | 50,5 % | +0,5 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1478 | 45,7 % | 51,9 % | +1,9 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 1784 | 46,6 % | 49,6 % | −0,4 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 3400 | 82,1 % | 51,4 % | +0,3 | 992 | 52,9 % | 53,4 % | +3,6 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 3400 | 80,4 % | 51,6 % | +0,5 | 1268 | 53,1 % | 48,3 % | −1,5 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 3400 | 82,2 % | 51,1 % | +0,0 | 1314 | 58,1 % | 52,0 % | +2,2 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 3400 | 81,6 % | 49,7 % | −1,3 | 1464 | 59,6 % | 49,2 % | −0,6 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1338 | 54,3 % | 45,8 % | −4,0 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1276 | 53,0 % | 49,2 % | −0,6 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1314 | 53,7 % | 49,9 % | +0,0 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1340 | 53,7 % | 40,5 % | −9,4 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 1978 | 56,8 % | 58,2 % | +8,4 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 1568 | 46,0 % | 44,2 % | −5,6 |
| Gokenin aus Sagami | Masako | 1 | Basis | 3400 | 80,3 % | 49,4 % | −1,9 | 864 | 57,9 % | 48,3 % | +0,9 |
| Bogenreiter aus Kamakura | Masako | 2 | Basis | 3400 | 81,4 % | 50,1 % | −1,2 | 1128 | 58,2 % | 52,8 % | +5,3 |
| Treueschwur | Masako | 1 | Basis | 3400 | 80,1 % | 53,3 % | +1,9 | 896 | 51,5 % | 54,7 % | +7,3 |
| Nonne von Kamakura | Masako | 2 | Basis | 3400 | 81,4 % | 49,3 % | −2,0 | 1198 | 60,1 % | 50,9 % | +3,5 |
| Rokuhara-Späher | Masako | 2 | Gewöhnlich | – | – | – | – | 1216 | 56,1 % | 48,0 % | +0,5 |
| Aufgebot von Jōkyū | Masako | 4 | Gewöhnlich | – | – | – | – | 1256 | 52,7 % | 52,2 % | +4,7 |
| Tsurugaoka Hachiman-gū | Masako | 2 | Selten | – | – | – | – | 1234 | 56,0 % | 46,5 % | −0,9 |
| Verbannung nach Oki | Masako | 3 | Selten | – | – | – | – | 1306 | 50,5 % | 45,5 % | −1,9 |
| Hōjō Yoshitoki, Regent | Masako | 5 | Episch | – | – | – | – | 1458 | 51,2 % | 53,6 % | +6,2 |
| Minamoto no Yoritomo | Masako | 6 | Legendär | – | – | – | – | 1912 | 50,2 % | 48,0 % | +0,5 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1308 | 54,1 % | 53,4 % | +3,3 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1228 | 52,6 % | 44,1 % | −6,0 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1216 | 52,5 % | 45,9 % | −3,3 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1226 | 53,2 % | 53,6 % | +4,4 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1436 | 58,2 % | 47,5 % | −0,7 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1340 | 60,0 % | 44,1 % | −4,0 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1212 | 48,0 % | 52,1 % | −0,7 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 1734 | 45,4 % | 55,9 % | +3,0 |
| Jurtenlager | Khan | 3 | Gewöhnlich | – | – | – | – | 1430 | 35,1 % | 41,8 % | −8,1 |
| Kurultai | Khan | 4 | Selten | – | – | – | – | 1296 | 30,0 % | 47,5 % | −2,4 |
| Barde der Icener | Boudicca | 2 | Gewöhnlich | – | – | – | – | 1250 | 55,8 % | 54,3 % | +1,6 |
| Sichelwagen | Boudicca | 5 | Selten | – | – | – | – | 1406 | 51,0 % | 53,7 % | +1,1 |
| Almanach der Quatrains | Nostradamus | 1 | Gewöhnlich | – | – | – | – | 972 | 56,8 % | 55,1 % | +3,9 |
| Horoskop der Königin | Nostradamus | 3 | Selten | – | – | – | – | 1448 | 2,6 % | 46,2 % | −5,0 |
| Pilgerin aus Domrémy | Jeanne | 1 | Gewöhnlich | – | – | – | – | 960 | 51,1 % | 54,2 % | +5,7 |
| Die Weihe von Reims | Jeanne | 4 | Selten | – | – | – | – | 1250 | 29,4 % | 47,5 % | −1,0 |
| Runenmeisterin | Ragnar | 2 | Gewöhnlich | – | – | – | – | 1198 | 53,0 % | 55,7 % | +4,3 |
| Berserkergang | Ragnar | 1 | Selten | – | – | – | – | 942 | 59,1 % | 52,9 % | +1,5 |
| Schwertschüler aus Kokura | Musashi | 4 | Selten | – | – | – | – | 1128 | 43,1 % | 44,0 % | −5,9 |
| Niten Ichi-ryū | Musashi | 2 | Gewöhnlich | – | – | – | – | 1274 | 49,0 % | 48,9 % | −1,0 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1194 | 50,8 % | 54,5 % | +4,9 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1232 | 27,1 % | 48,9 % | −0,8 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1372 | 45,1 % | 49,7 % | −0,5 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1292 | 38,8 % | 54,5 % | +4,4 |
| Pfeilmacher aus Meroë | Amanirenas | 2 | Gewöhnlich | – | – | – | – | 1360 | 54,2 % | 46,2 % | −2,9 |
| Gift der Wüstenviper | Amanirenas | 3 | Selten | – | – | – | – | 1410 | 42,8 % | 53,0 % | +3,9 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1460 | 52,5 % | 52,5 % | +2,5 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 1742 | 58,4 % | 56,1 % | +6,1 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1346 | 56,3 % | 49,3 % | −0,5 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1304 | 51,4 % | 47,5 % | −2,3 |
| Jitō-Verwalter | Masako | 2 | Gewöhnlich | – | – | – | – | 1208 | 56,5 % | 49,7 % | +2,2 |
| Siegel des Shikken | Masako | 2 | Selten | – | – | – | – | 1152 | 36,3 % | 46,6 % | −0,8 |
| Olympionike | Griechische Antike | 4 | Gewöhnlich | – | – | – | – | 3612 | 52,7 % | 55,5 % | +5,9 |
| Rhapsode | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 3528 | 52,7 % | 51,8 % | +2,2 |
| Marathonläufer | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 3574 | 53,2 % | 52,5 % | +2,8 |
| Orakel von Delphi | Griechische Antike | 3 | Selten | – | – | – | – | 3980 | 30,7 % | 49,3 % | −0,4 |
| Leuchtturm von Pharos | Griechische Antike | 3 | Selten | – | – | – | – | 3908 | 38,3 % | 43,7 % | −6,0 |
| Akropolis | Griechische Antike | 2 | Selten | – | – | – | – | 3530 | 55,3 % | 50,2 % | +0,5 |
| Bibliothek von Alexandria | Griechische Antike | 3 | Episch | – | – | – | – | 3876 | 50,1 % | 48,6 % | −1,0 |
| Knappe | Europäisches Mittelalter | 1 | Gewöhnlich | – | – | – | – | 3712 | 54,0 % | 53,0 % | +1,6 |
| Armbrustschütze | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 5290 | 57,3 % | 54,3 % | +2,9 |
| Mönch von Cluny | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 5164 | 49,8 % | 54,9 % | +3,5 |
| Hansekogge | Europäisches Mittelalter | 4 | Gewöhnlich | – | – | – | – | 4764 | 47,1 % | 50,0 % | −1,2 |
| Turnierritter | Europäisches Mittelalter | 4 | Selten | – | – | – | – | 4854 | 50,2 % | 54,6 % | +3,2 |
| Burgfried | Europäisches Mittelalter | 2 | Selten | – | – | – | – | 5052 | 56,9 % | 43,6 % | −7,7 |
| Tribok | Europäisches Mittelalter | 5 | Episch | – | – | – | – | 5398 | 27,0 % | 46,1 % | −5,2 |
| Ashigaru | China, Korea, Japan | 1 | Gewöhnlich | – | – | – | – | 1766 | 52,9 % | 51,5 % | +2,8 |
| Mandarin-Gelehrter | China, Korea, Japan | 3 | Gewöhnlich | – | – | – | – | 2638 | 51,1 % | 50,4 % | +1,8 |
| Teezeremonie | China, Korea, Japan | 2 | Gewöhnlich | – | – | – | – | 2434 | 43,4 % | 45,6 % | −3,0 |
| Hwacha-Salve | China, Korea, Japan | 3 | Selten | – | – | – | – | 2610 | 54,8 % | 49,3 % | +0,7 |
| Schildkrötenschiff | China, Korea, Japan | 5 | Selten | – | – | – | – | 2750 | 54,5 % | 48,3 % | −0,3 |
| Terrakotta-Armee | China, Korea, Japan | 5 | Episch | – | – | – | – | 2856 | 52,7 % | 49,2 % | +0,6 |
| Große Mauer | China, Korea, Japan | 3 | Episch | – | – | – | – | 2612 | 58,3 % | 36,4 % | −12,2 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 21764 | 32,4 % | 44,5 % | −5,5 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 20778 | 56,1 % | 45,6 % | −4,4 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 20176 | 27,3 % | 44,3 % | −5,7 |
