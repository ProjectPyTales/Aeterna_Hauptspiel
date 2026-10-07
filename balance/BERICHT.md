# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `9083c726e6` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die neun anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,8.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 27200 | ✓ 16/16 | ✗ 113/120 | ✓ 46,2 % | – | 0 | 23 |
| Zufallsdecks | 27200 | ✗ 15/16 | ✗ 118/120 | ✓ 50,9 % | ✓ 52,9 % (+3,0) | 0 | 20 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Miyamoto Musashi | **52,7 %** | 47,7 % | 57,1 % | Jeanne 41,5 % | Dandolo 62,0 % | Aggressiv: 49,2 % | ✓ |
| Hypatia | **51,7 %** | 45,4 % | 57,6 % | Anna 43,5 % | Masako 61,5 % | Kombinierend: 45,1 % | ✓ |
| Hōjō Masako | **51,4 %** | 44,9 % | 57,6 % | Hypatia 38,5 % | Khan 60,5 % | Defensiv: 40,6 % | ✓ |
| Nezahualcóyotl | **51,4 %** | 47,3 % | 55,2 % | Masako 44,5 % | Anna 58,5 % | Defensiv: 39,4 % | ✓ |
| Dschingis Khan | **51,3 %** | 46,2 % | 56,2 % | Masako 39,5 % | Nostradamus 64,5 % | Aggressiv: 45,2 % | ✓ |
| Leonidas I. | **51,3 %** | 50,8 % | 51,6 % | Musashi 45,5 % | Amanirenas 63,5 % | Defensiv: 37,2 % | ✓ |
| Amanirenas | **50,8 %** | 47,8 % | 53,6 % | Leonidas 36,5 % | Jeanne 69,5 % | Aggressiv: 45,2 % | ✓ |
| Nostradamus | **50,1 %** | 49,2 % | 50,9 % | Khan 35,5 % | Imhotep 56,5 % | Kombinierend: 41,4 % | ✓ |
| Ragnar Lodbrok | **49,6 %** | 46,1 % | 53,2 % | Jeanne 40,0 % | Anna 56,5 % | Aggressiv: 41,6 % | ✓ |
| Jeanne d’Arc | **49,2 %** | 43,1 % | 55,6 % | Amanirenas 30,5 % | Ragnar 60,0 % | Aggressiv: 51,8 % | ✓ |
| Anna Komnene | **49,2 %** | 50,3 % | 48,3 % | Nezahualcóyotl 41,5 % | Hypatia 56,5 % | Kombinierend: 39,4 % | ✓ |
| Imhotep | **49,0 %** | 46,2 % | 51,9 % | Nostradamus 43,5 % | Boudicca 60,0 % | Defensiv: 36,9 % | ✓ |
| Enrico Dandolo | **48,8 %** | 46,5 % | 51,4 % | Musashi 38,0 % | Imhotep 55,5 % | Kombinierend: 42,0 % | ✓ |
| Perikles | **48,1 %** | 43,5 % | 53,2 % | Hypatia 43,0 % | Agrippa 55,5 % | Defensiv: 40,1 % | ✓ |
| Marcus Agrippa | **47,8 %** | 43,1 % | 52,9 % | Khan 35,5 % | Boudicca 57,5 % | Kombinierend: 44,2 % | ✓ |
| Boudicca | **47,6 %** | 41,8 % | 53,9 % | Imhotep 40,0 % | Jeanne 55,0 % | Aggressiv: 43,0 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 51 | 50 | 47 | 47 | 56 | 55 | 51 | 52 | 46 | 50 | 54 | **64** | 51 | 52 | 48 |
| Hypatia | 49 | · | 47 | 50 | 59 | 54 | 51 | 60 | 51 | 45 | 57 | 47 | 54 | 44 | 50 | **62** |
| Imhotep | 50 | 53 | · | 45 | 49 | 60 | 44 | 50 | 48 | 45 | 53 | 44 | 54 | 45 | 51 | 47 |
| Dandolo | 53 | 50 | 55 | · | 43 | 47 | 47 | 47 | 48 | **38** | 55 | 54 | 49 | 50 | 45 | 52 |
| Khan | 53 | 42 | 52 | 57 | · | 47 | **65** | 46 | 55 | 47 | 50 | **65** | 47 | 57 | 50 | **40** |
| Boudicca | 44 | 47 | 40 | 53 | 53 | · | 45 | 55 | 49 | 55 | 46 | 43 | 43 | 50 | 45 | 48 |
| Nostradamus | 45 | 50 | 56 | 53 | **36** | 55 | · | 53 | 47 | 44 | 54 | 53 | 52 | 49 | 55 | 50 |
| Jeanne | 49 | 41 | 51 | 53 | 54 | 45 | 47 | · | 60 | 59 | 56 | 51 | **31** | 53 | 49 | 43 |
| Ragnar | 49 | 50 | 52 | 52 | 45 | 51 | 53 | 40 | · | 43 | 50 | 52 | 47 | 56 | 54 | 51 |
| Musashi | 54 | 55 | 55 | **62** | 53 | 45 | 56 | 42 | 57 | · | 57 | 57 | 45 | 55 | 45 | 51 |
| Perikles | 51 | 43 | 48 | 45 | 50 | 54 | 46 | 44 | 51 | 43 | · | 56 | 45 | 52 | 50 | 46 |
| Agrippa | 46 | 53 | 56 | 46 | **36** | 57 | 48 | 49 | 48 | 43 | 44 | · | 47 | 49 | 46 | 49 |
| Amanirenas | **37** | 46 | 46 | 51 | 53 | 57 | 49 | **70** | 53 | 55 | 55 | 53 | · | 44 | 44 | 50 |
| Anna | 49 | 56 | 55 | 51 | 43 | 50 | 51 | 47 | 44 | 45 | 49 | 51 | 56 | · | 42 | 51 |
| Nezahualcóyotl | 49 | 51 | 49 | 55 | 50 | 55 | 45 | 52 | 47 | 55 | 51 | 54 | 56 | 59 | · | 45 |
| Masako | 53 | **39** | 53 | 48 | **61** | 52 | 51 | 57 | 49 | 49 | 54 | 52 | 51 | 50 | 55 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (6 Helden) 46,0 % aufs Gesicht, 1,3 % auf Bauwerke · **Defensiv** (5 Helden) 38,8 % aufs Gesicht, 1,4 % auf Bauwerke · **Kombinierend** (5 Helden) 42,4 % aufs Gesicht, 1,5 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 24,2, Median 23, 10–90 %: 17–33, kürzeste 9, längste 63. Beginner gewinnt 46,2 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Belagerungsturm | neutral | 6 | 55,5 % | +5,5 | 75,2 % |
| Goldener Reiter | Khan | 4 | 56,3 % | +5,1 | 69,5 % |
| Warägergardist | Anna | 3 | 53,5 % | +4,2 | 81,8 % |
| Pilumwerfer | Agrippa | 1 | 52,0 % | +4,0 | 76,7 % |
| Rede auf die Gefallenen | Perikles | 3 | 52,1 % | +3,8 | 78,6 % |
| Sternenregen | Hypatia | 4 | 54,6 % | +3,2 | 77,4 % |
| Kopistin der Chronik | Anna | 1 | 52,4 % | +3,1 | 80,8 % |
| Handelsgesandter | Dandolo | 4 | 52,0 % | +3,0 | 77,1 % |
| Hainwächterin | Boudicca | 1 | 46,5 % | −1,4 | 81,6 % |
| Reiterbogenschütze | Khan | 2 | 49,7 % | −1,5 | 75,9 % |
| Bibliothekslehrling | Hypatia | 1 | 49,8 % | −1,6 | 83,1 % |
| Eichenhaut | Boudicca | 2 | 46,1 % | −1,7 | 72,7 % |
| Gokenin aus Sagami | Masako | 1 | 49,4 % | −1,9 | 80,3 % |
| Nonne von Kamakura | Masako | 2 | 49,4 % | −1,9 | 81,6 % |
| Pfeilschuss | Khan | 2 | 49,2 % | −2,0 | 75,5 % |
| Lange Mauern | Perikles | 2 | 44,1 % | −4,3 | 77,4 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Boudicca | **53,7 %** | 54,0 % | 52,5 % | Ragnar 46,0 % | Khan 60,5 % | Aggressiv: 50,2 % | ✗ |
| Ragnar Lodbrok | **52,9 %** | 51,9 % | 53,2 % | Jeanne 46,0 % | Imhotep 59,0 % | Aggressiv: 48,6 % | ✓ |
| Enrico Dandolo | **52,3 %** | 55,4 % | 48,6 % | Boudicca 41,5 % | Agrippa 59,5 % | Kombinierend: 45,3 % | ✓ |
| Miyamoto Musashi | **51,8 %** | 52,5 % | 50,6 % | Ragnar 47,0 % | Hypatia 59,5 % | Aggressiv: 54,4 % | ✓ |
| Hōjō Masako | **51,1 %** | 51,3 % | 50,6 % | Jeanne 44,5 % | Khan 56,0 % | Defensiv: 40,2 % | ✓ |
| Leonidas I. | **50,3 %** | 51,0 % | 49,5 % | Ragnar 47,0 % | Imhotep 55,5 % | Defensiv: 39,6 % | ✓ |
| Nostradamus | **50,1 %** | 51,2 % | 48,9 % | Leonidas 44,5 % | Jeanne 57,0 % | Kombinierend: 45,4 % | ✓ |
| Jeanne d’Arc | **49,7 %** | 51,4 % | 48,0 % | Nostradamus 43,0 % | Anna 57,5 % | Aggressiv: 50,6 % | ✓ |
| Perikles | **49,3 %** | 50,7 % | 48,1 % | Boudicca 43,0 % | Hypatia 58,0 % | Defensiv: 41,8 % | ✓ |
| Marcus Agrippa | **49,3 %** | 48,2 % | 50,5 % | Boudicca 39,5 % | Imhotep 58,5 % | Kombinierend: 47,0 % | ✓ |
| Nezahualcóyotl | **49,3 %** | 50,5 % | 48,2 % | Imhotep 41,5 % | Khan 54,5 % | Defensiv: 40,4 % | ✓ |
| Dschingis Khan | **49,0 %** | 48,2 % | 50,1 % | Boudicca 39,5 % | Anna 55,5 % | Aggressiv: 51,2 % | ✓ |
| Amanirenas | **48,6 %** | 50,5 % | 47,1 % | Nostradamus 43,5 % | Jeanne 54,5 % | Aggressiv: 48,9 % | ✓ |
| Anna Komnene | **48,3 %** | 50,8 % | 46,2 % | Jeanne 42,5 % | Nostradamus 55,5 % | Kombinierend: 43,7 % | ✓ |
| Imhotep | **47,5 %** | 47,9 % | 47,6 % | Ragnar 41,0 % | Nezahualcóyotl 58,5 % | Defensiv: 38,8 % | ✓ |
| Hypatia | **47,0 %** | 48,9 % | 45,8 % | Musashi 40,5 % | Anna 53,5 % | Kombinierend: 44,0 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 50 | 56 | 48 | 51 | 52 | 56 | 50 | 47 | 47 | 47 | 55 | 51 | 48 | 50 | 50 |
| Hypatia | 50 | · | 49 | 46 | 49 | 45 | 46 | 46 | 46 | 41 | 42 | 48 | 50 | 54 | 49 | 47 |
| Imhotep | 44 | 52 | · | 44 | 49 | 47 | 48 | 46 | 41 | 48 | 45 | 42 | 47 | 54 | 59 | 50 |
| Dandolo | 53 | 54 | 56 | · | 53 | 42 | 56 | 56 | 49 | 44 | 55 | 60 | 55 | 50 | 54 | 51 |
| Khan | 50 | 51 | 52 | 48 | · | **40** | 53 | 54 | 43 | 50 | 53 | 48 | 52 | 56 | 46 | 44 |
| Boudicca | 48 | 55 | 53 | 59 | **61** | · | 48 | 52 | 46 | 52 | 57 | **61** | 56 | 56 | 52 | 50 |
| Nostradamus | 44 | 54 | 53 | 44 | 48 | 52 | · | 57 | 51 | 48 | 49 | 52 | 56 | 45 | 47 | 52 |
| Jeanne | 51 | 54 | 54 | 44 | 46 | 48 | 43 | · | 54 | 46 | 49 | 46 | 46 | 57 | 52 | 56 |
| Ragnar | 53 | 54 | 59 | 52 | 57 | 54 | 50 | 46 | · | 53 | 54 | 55 | 50 | 52 | 53 | 53 |
| Musashi | 53 | 60 | 52 | 56 | 50 | 49 | 52 | 54 | 47 | · | 51 | 50 | 52 | 53 | 49 | 50 |
| Perikles | 53 | 58 | 55 | 45 | 48 | 43 | 52 | 51 | 46 | 49 | · | 47 | 50 | 47 | 51 | 47 |
| Agrippa | 45 | 52 | 59 | 41 | 52 | **40** | 48 | 54 | 45 | 50 | 53 | · | 50 | 56 | 46 | 49 |
| Amanirenas | 49 | 51 | 53 | 45 | 49 | 44 | 44 | 54 | 50 | 49 | 51 | 50 | · | 48 | 47 | 47 |
| Anna | 52 | 47 | 46 | 51 | 44 | 44 | 55 | 43 | 49 | 48 | 53 | 44 | 52 | · | 54 | 45 |
| Nezahualcóyotl | 50 | 51 | 42 | 46 | 54 | 48 | 53 | 48 | 48 | 51 | 50 | 54 | 53 | 46 | · | 46 |
| Masako | 51 | 53 | 50 | 50 | 56 | 50 | 48 | 44 | 47 | 50 | 53 | 52 | 53 | 55 | 54 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (6 Helden) 50,6 % aufs Gesicht, 6,8 % auf Bauwerke · **Defensiv** (5 Helden) 40,2 % aufs Gesicht, 9,1 % auf Bauwerke · **Kombinierend** (5 Helden) 45,1 % aufs Gesicht, 8,4 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 21,6, Median 20, 10–90 %: 15–30, kürzeste 8, längste 67. Beginner gewinnt 50,9 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 59,5 % | +10,1 | 57,3 % |
| Phalanxveteran | Leonidas | 5 | 59,8 % | +9,6 | 56,2 % |
| Wächter des Weltenbaums | neutral | 8 | 58,7 % | +8,7 | 44,4 % |
| Pestdoktor | Nostradamus | 4 | 58,5 % | +8,4 | 56,1 % |
| Triere von Salamis | Perikles | 4 | 57,4 % | +8,0 | 52,8 % |
| Kataphrakt | Anna | 5 | 56,4 % | +7,9 | 45,2 % |
| Chronist am Kaiserhof | Anna | 6 | 55,7 % | +7,2 | 58,6 % |
| Griechisches Feuer | Anna | 4 | 55,6 % | +7,1 | 48,1 % |
| Odeion | Perikles | 4 | 44,1 % | −5,3 | 35,6 % |
| Kolosseum | neutral | 3 | 44,5 % | −5,4 | 33,0 % |
| Pyramiden von Gizeh | neutral | 4 | 43,9 % | −6,0 | 27,3 % |
| Burgfried | Europäisches Mittelalter | 2 | 44,5 % | −7,4 | 56,7 % |
| Leuchtturm von Pharos | Griechische Antike | 3 | 41,6 % | −7,4 | 54,2 % |
| Große Mauer | China, Korea, Japan | 2 | 43,5 % | −7,7 | 60,2 % |
| Jurtenlager | Khan | 3 | 41,3 % | −7,8 | 35,0 % |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | 41,1 % | −8,3 | 54,7 % |

**Legendäre** (AP 5.3) – als Gruppe 52,9 % „gewinnt, wenn gezogen“ (+3,0 gegenüber ihrem Helden, 32881 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Lagertha, Schildmaid | Ragnar | 7 | 57,1 % | +4,6 | 43,4 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 55,4 % | +3,4 | 44,3 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 55,1 % | +5,2 | 42,7 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 54,7 % | +4,4 | 49,4 % |
| Andraste, Göttin des Sieges | Boudicca | 8 | 54,2 % | +1,0 | 47,4 % |
| Subutai, der Stratege | Khan | 6 | 53,6 % | +4,5 | 43,8 % |
| Minamoto no Yoritomo | Masako | 6 | 52,8 % | +1,8 | 51,6 % |
| Herodot, Vater der Geschichte | neutral | 4 | 52,6 % | +2,7 | 42,6 % |
| Djoser, der Erbauer | Imhotep | 6 | 52,4 % | +4,6 | 50,8 % |
| Theon von Alexandria | Hypatia | 5 | 51,4 % | +4,0 | 48,8 % |
| La Hire, der Unbeugsame | Jeanne | 7 | 51,3 % | +1,6 | 41,6 % |
| Sasaki Kojirō, der Rivale | Musashi | 6 | 51,1 % | −0,4 | 44,7 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 51,0 % | +1,6 | 42,8 % |
| Caterina de’ Medici | Nostradamus | 5 | 50,9 % | +0,9 | 52,6 % |
| Bronzekopf des Augustus | Amanirenas | 6 | 50,9 % | +2,1 | 46,3 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 49,8 % | +0,4 | 52,6 % |
| Alexios I. Komnenos | Anna | 6 | 46,4 % | −2,1 | 46,7 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 44,2 % | −5,2 | 46,6 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 3400 | 80,2 % | 52,1 % | +0,9 | 886 | 53,7 % | 53,3 % | +3,0 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 3400 | 80,7 % | 51,6 % | +0,4 | 1230 | 57,0 % | 53,9 % | +3,6 |
| Bronzener Wall | Leonidas | 2 | Basis | 3400 | 80,6 % | 53,0 % | +1,9 | 1230 | 52,4 % | 48,9 % | −1,4 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 3400 | 76,6 % | 53,0 % | +1,9 | 1170 | 46,3 % | 49,7 % | −0,6 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1268 | 56,9 % | 55,1 % | +4,8 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1290 | 54,1 % | 49,1 % | −1,1 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1438 | 56,2 % | 59,8 % | +9,6 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1186 | 45,8 % | 50,1 % | −0,1 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 1792 | 52,8 % | 46,2 % | −4,1 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 1548 | 49,4 % | 54,7 % | +4,4 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 3400 | 83,1 % | 49,8 % | −1,6 | 878 | 56,8 % | 47,3 % | −0,1 |
| Himmelsstrahl | Hypatia | 2 | Basis | 3400 | 86,1 % | 51,1 % | −0,4 | 1210 | 57,3 % | 51,8 % | +4,5 |
| Sternenkundiger | Hypatia | 3 | Basis | 3400 | 81,2 % | 53,0 % | +1,6 | 1406 | 48,0 % | 49,1 % | +1,7 |
| Sternenregen | Hypatia | 4 | Basis | 3400 | 77,4 % | 54,6 % | +3,2 | 1124 | 46,4 % | 53,6 % | +6,3 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1322 | 58,9 % | 53,4 % | +6,0 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1246 | 41,7 % | 46,2 % | −1,1 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1358 | 46,3 % | 51,6 % | +4,2 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 1902 | 56,6 % | 47,8 % | +0,5 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 1396 | 53,2 % | 43,7 % | −3,7 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1470 | 48,8 % | 51,4 % | +4,0 |
| Nilschülerin | Imhotep | 1 | Basis | 3400 | 82,6 % | 48,6 % | −0,5 | 1022 | 57,9 % | 45,9 % | −1,9 |
| Heilender Balsam | Imhotep | 1 | Basis | 3400 | 82,4 % | 50,8 % | +1,7 | 988 | 57,9 % | 53,2 % | +5,4 |
| Pyramidenwächter | Imhotep | 3 | Basis | 3400 | 84,4 % | 50,1 % | +1,0 | 1418 | 58,8 % | 49,8 % | +2,0 |
| Tempelärztin | Imhotep | 4 | Basis | 3400 | 80,9 % | 49,6 % | +0,6 | 1340 | 51,9 % | 45,5 % | −2,3 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1358 | 53,1 % | 51,8 % | +4,0 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1442 | 60,5 % | 51,9 % | +4,1 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1332 | 48,9 % | 49,2 % | +1,4 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1538 | 54,7 % | 53,2 % | +5,5 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 1510 | 56,7 % | 47,6 % | −0,2 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 1866 | 50,8 % | 52,4 % | +4,6 |
| Lagunenbote | Dandolo | 1 | Basis | 3400 | 78,5 % | 51,5 % | +2,5 | 884 | 53,5 % | 53,9 % | +1,9 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 3400 | 79,6 % | 48,5 % | −0,5 | 1210 | 47,9 % | 50,7 % | −1,3 |
| Präziser Stich | Dandolo | 2 | Basis | 3400 | 83,7 % | 50,3 % | +1,3 | 1228 | 55,1 % | 51,0 % | −1,0 |
| Handelsgesandter | Dandolo | 4 | Basis | 3400 | 77,1 % | 52,0 % | +3,0 | 1152 | 51,0 % | 57,9 % | +5,9 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1232 | 39,9 % | 52,0 % | +0,0 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1258 | 54,9 % | 52,4 % | +0,4 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1262 | 43,6 % | 53,4 % | +1,4 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1284 | 49,6 % | 52,9 % | +0,9 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1356 | 33,3 % | 55,4 % | +3,4 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 1746 | 44,3 % | 55,4 % | +3,4 |
| Steppenspäher | Khan | 1 | Basis | 3400 | 75,2 % | 50,2 % | −1,0 | 1048 | 48,2 % | 48,9 % | −0,2 |
| Reiterbogenschütze | Khan | 2 | Basis | 3400 | 75,9 % | 49,7 % | −1,5 | 1466 | 51,0 % | 49,4 % | +0,3 |
| Pfeilschuss | Khan | 2 | Basis | 3400 | 75,5 % | 49,2 % | −2,0 | 1482 | 56,3 % | 50,2 % | +1,1 |
| Goldener Reiter | Khan | 4 | Basis | 3400 | 69,5 % | 56,3 % | +5,1 | 1298 | 46,2 % | 55,5 % | +6,4 |
| Adlerjägerin | Khan | 3 | Gewöhnlich | – | – | – | – | 1492 | 45,2 % | 48,6 % | −0,5 |
| Steppensturm | Khan | 3 | Gewöhnlich | – | – | – | – | 1474 | 46,1 % | 47,3 % | −1,9 |
| Tumenwächter | Khan | 5 | Selten | – | – | – | – | 1400 | 43,9 % | 49,9 % | +0,7 |
| Belagerungsfeuer | Khan | 6 | Selten | – | – | – | – | 1752 | 48,8 % | 53,7 % | +4,5 |
| Keshig-Elite | Khan | 6 | Episch | – | – | – | – | 1768 | 41,2 % | 44,2 % | −5,0 |
| Subutai, der Stratege | Khan | 6 | Legendär | – | – | – | – | 1672 | 43,8 % | 53,6 % | +4,5 |
| Hainwächterin | Boudicca | 1 | Basis | 3400 | 81,6 % | 46,5 % | −1,4 | 936 | 50,9 % | 56,9 % | +3,7 |
| Eichenhaut | Boudicca | 2 | Basis | 3400 | 72,7 % | 46,1 % | −1,7 | 1266 | 39,2 % | 48,4 % | −4,8 |
| Icenerkrieger | Boudicca | 3 | Basis | 3400 | 84,6 % | 48,7 % | +0,8 | 1256 | 56,4 % | 56,8 % | +3,6 |
| Wilder Hieb | Boudicca | 3 | Basis | 3400 | 83,5 % | 46,8 % | −1,0 | 1278 | 59,2 % | 49,6 % | −3,7 |
| Streitwagenlenkerin | Boudicca | 4 | Gewöhnlich | – | – | – | – | 1146 | 46,6 % | 51,7 % | −1,6 |
| Druidin des Hains | Boudicca | 3 | Gewöhnlich | – | – | – | – | 1324 | 52,6 % | 51,1 % | −2,1 |
| Aufstand | Boudicca | 3 | Selten | – | – | – | – | 1250 | 54,4 % | 57,8 % | +4,6 |
| Eichenkoloss | Boudicca | 6 | Selten | – | – | – | – | 1874 | 52,6 % | 55,3 % | +2,1 |
| Zorn der Königin | Boudicca | 5 | Episch | – | – | – | – | 1356 | 32,4 % | 50,3 % | −3,0 |
| Andraste, Göttin des Sieges | Boudicca | 8 | Legendär | – | – | – | – | 1040 | 47,4 % | 54,2 % | +1,0 |
| Tintenlehrling | Nostradamus | 1 | Basis | 3400 | 84,6 % | 52,9 % | +2,8 | 1034 | 56,3 % | 55,0 % | +5,0 |
| Dunkle Vorahnung | Nostradamus | 2 | Basis | 3400 | 88,4 % | 52,9 % | +2,8 | 1414 | 64,2 % | 51,4 % | +1,4 |
| Maskierter Seher | Nostradamus | 3 | Basis | 3400 | 84,0 % | 50,6 % | +0,5 | 1482 | 48,3 % | 49,2 % | −0,9 |
| Prophezeiung | Nostradamus | 4 | Basis | 3400 | 64,1 % | 50,4 % | +0,3 | 1270 | 22,7 % | 49,3 % | −0,8 |
| Pestdoktor | Nostradamus | 4 | Gewöhnlich | – | – | – | – | 1302 | 56,1 % | 58,5 % | +8,4 |
| Schattenpakt | Nostradamus | 2 | Gewöhnlich | – | – | – | – | 1370 | 59,7 % | 54,4 % | +4,4 |
| Chronist der Nacht | Nostradamus | 5 | Selten | – | – | – | – | 1404 | 50,3 % | 50,5 % | +0,4 |
| Rote Finsternis | Nostradamus | 5 | Selten | – | – | – | – | 1488 | 42,3 % | 52,9 % | +2,8 |
| Wächter der Zeiten | Nostradamus | 6 | Episch | – | – | – | – | 1862 | 59,0 % | 53,0 % | +2,9 |
| Caterina de’ Medici | Nostradamus | 5 | Legendär | – | – | – | – | 1458 | 52,6 % | 50,9 % | +0,9 |
| Bauernrekrut | Jeanne | 1 | Basis | 3400 | 78,7 % | 49,0 % | −0,3 | 940 | 55,7 % | 56,1 % | +6,4 |
| Bannersegen | Jeanne | 2 | Basis | 3400 | 78,8 % | 50,0 % | +0,6 | 1212 | 50,7 % | 48,2 % | −1,5 |
| Wache von Orléans | Jeanne | 3 | Basis | 3400 | 77,8 % | 48,8 % | −0,5 | 1314 | 54,2 % | 52,7 % | +3,0 |
| Die Fahne erheben | Jeanne | 2 | Basis | 3400 | 76,9 % | 48,4 % | −1,0 | 1218 | 53,1 % | 53,5 % | +3,8 |
| Lilienritter | Jeanne | 4 | Gewöhnlich | – | – | – | – | 1154 | 41,3 % | 51,3 % | +1,6 |
| Heiliger Schutz | Jeanne | 2 | Gewöhnlich | – | – | – | – | 1244 | 47,4 % | 51,8 % | +2,1 |
| Standartenträgerin | Jeanne | 5 | Selten | – | – | – | – | 1310 | 48,0 % | 51,4 % | +1,7 |
| Glocken von Reims | Jeanne | 6 | Selten | – | – | – | – | 1678 | 41,3 % | 49,9 % | +0,2 |
| Paladin der Loire | Jeanne | 7 | Episch | – | – | – | – | 1560 | 43,9 % | 50,2 % | +0,5 |
| La Hire, der Unbeugsame | Jeanne | 7 | Legendär | – | – | – | – | 1512 | 41,6 % | 51,3 % | +1,6 |
| Fjordspäher | Ragnar | 1 | Basis | 3400 | 77,2 % | 48,3 % | −1,4 | 898 | 50,3 % | 56,1 % | +3,6 |
| Runenblitz | Ragnar | 2 | Basis | 3400 | 81,3 % | 49,7 % | +0,0 | 1238 | 58,5 % | 52,6 % | +0,1 |
| Schildmaid | Ragnar | 3 | Basis | 3400 | 80,0 % | 50,3 % | +0,6 | 1262 | 52,5 % | 55,1 % | +2,6 |
| Runenschnitzer | Ragnar | 4 | Basis | 3400 | 75,7 % | 51,6 % | +1,9 | 1166 | 49,1 % | 53,3 % | +0,8 |
| Donnerschlag | Ragnar | 3 | Gewöhnlich | – | – | – | – | 1292 | 54,9 % | 54,6 % | +2,1 |
| Berserker vom Fjord | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1152 | 45,4 % | 53,3 % | +0,8 |
| Ahnenbund | Ragnar | 3 | Selten | – | – | – | – | 1232 | 52,0 % | 56,7 % | +4,2 |
| Runenhüter | Ragnar | 5 | Selten | – | – | – | – | 1386 | 46,8 % | 48,6 % | −4,0 |
| Sturm der Nordsee | Ragnar | 5 | Episch | – | – | – | – | 1378 | 52,1 % | 53,6 % | +1,0 |
| Lagertha, Schildmaid | Ragnar | 7 | Legendär | – | – | – | – | 1638 | 43,4 % | 57,1 % | +4,6 |
| Dojoschüler | Musashi | 1 | Basis | 3400 | 78,9 % | 51,4 % | −1,0 | 888 | 52,0 % | 52,7 % | +1,1 |
| Schneller Schnitt | Musashi | 1 | Basis | 3400 | 82,8 % | 52,8 % | +0,5 | 886 | 49,4 % | 53,5 % | +1,9 |
| Rōnin | Musashi | 3 | Basis | 3400 | 83,1 % | 54,5 % | +2,1 | 1306 | 53,8 % | 55,2 % | +3,6 |
| Konzentration | Musashi | 2 | Basis | 3400 | 72,1 % | 54,0 % | +1,6 | 1270 | 41,9 % | 50,3 % | −1,2 |
| Kirschblütenwache | Musashi | 3 | Gewöhnlich | – | – | – | – | 1316 | 52,3 % | 53,9 % | +2,4 |
| Zwei Himmel | Musashi | 3 | Gewöhnlich | – | – | – | – | 1294 | 36,0 % | 51,8 % | +0,2 |
| Duellant | Musashi | 4 | Selten | – | – | – | – | 1140 | 39,5 % | 48,6 % | −3,0 |
| Der leere Geist | Musashi | 5 | Selten | – | – | – | – | 1352 | 39,5 % | 56,7 % | +5,1 |
| Meister der fünf Ringe | Musashi | 6 | Episch | – | – | – | – | 1776 | 50,8 % | 49,4 % | −2,1 |
| Sasaki Kojirō, der Rivale | Musashi | 6 | Legendär | – | – | – | – | 1638 | 44,7 % | 51,1 % | −0,4 |
| Dorfwache | neutral | 1 | Basis | 54400 | 79,5 % | 49,3 % | −0,7 | 15282 | 53,5 % | 49,1 % | −0,8 |
| Wandernder Händler | neutral | 2 | Basis | 54400 | 76,5 % | 49,2 % | −0,8 | 20912 | 48,7 % | 49,5 % | −0,5 |
| Steinschleuderer | neutral | 2 | Basis | 54400 | 80,2 % | 49,4 % | −0,6 | 20660 | 52,2 % | 50,2 % | +0,2 |
| Grenzläuferin | neutral | 3 | Basis | 54400 | 81,4 % | 50,7 % | +0,7 | 21420 | 52,2 % | 52,3 % | +2,4 |
| Festungsschild | neutral | 4 | Basis | 54400 | 75,2 % | 50,9 % | +0,9 | 19930 | 46,4 % | 50,8 % | +0,9 |
| Kavallerist | neutral | 4 | Basis | 54400 | 76,8 % | 51,3 % | +1,3 | 19940 | 46,2 % | 51,7 % | +1,7 |
| Feldheilerin | neutral | 3 | Basis | 54400 | 79,1 % | 49,4 % | −0,6 | 21810 | 51,4 % | 48,5 % | −1,4 |
| Archivarin | neutral | 4 | Basis | 54400 | 72,8 % | 52,4 % | +2,4 | 20100 | 45,0 % | 50,5 % | +0,5 |
| Wachhund | neutral | 2 | Basis | 54400 | 78,3 % | 48,7 % | −1,3 | 20514 | 49,8 % | 48,8 % | −1,2 |
| Veteran | neutral | 5 | Basis | 54400 | 78,0 % | 52,5 % | +2,5 | 23438 | 49,4 % | 48,9 % | −1,1 |
| Belagerungsturm | neutral | 6 | Basis | 54400 | 75,2 % | 55,5 % | +5,5 | 29530 | 50,5 % | 50,1 % | +0,2 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 21730 | 49,9 % | 50,8 % | +0,8 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 15362 | 52,7 % | 51,2 % | +1,2 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 23468 | 50,4 % | 53,4 % | +3,4 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 21710 | 50,2 % | 49,2 % | −0,8 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 20354 | 49,4 % | 50,0 % | +0,0 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 20606 | 41,0 % | 49,6 % | −0,3 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 15272 | 49,8 % | 47,7 % | −2,2 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 20802 | 56,5 % | 49,8 % | −0,1 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 26102 | 51,2 % | 54,1 % | +4,1 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 21680 | 53,9 % | 50,8 % | +0,9 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 20108 | 47,3 % | 49,0 % | −0,9 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 20718 | 53,4 % | 52,4 % | +2,4 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 20202 | 47,6 % | 52,3 % | +2,4 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 21552 | 56,5 % | 53,0 % | +3,0 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 20632 | 28,3 % | 45,1 % | −4,8 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 19968 | 47,7 % | 46,3 % | −3,7 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 23444 | 46,3 % | 50,6 % | +0,6 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 19866 | 52,1 % | 53,6 % | +3,7 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 20172 | 46,0 % | 54,6 % | +4,7 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 23624 | 51,3 % | 51,2 % | +1,3 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 23288 | 49,1 % | 49,8 % | −0,2 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 20312 | 41,1 % | 48,9 % | −1,0 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 29650 | 53,6 % | 51,0 % | +1,0 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 26290 | 45,5 % | 52,1 % | +2,1 |
| Vergessene Weisheit | neutral | 4 | Episch | – | – | – | – | 19830 | 24,0 % | 48,8 % | −1,1 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 18116 | 44,4 % | 58,7 % | +8,7 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 26282 | 53,6 % | 52,9 % | +2,9 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 19794 | 42,6 % | 52,6 % | +2,7 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 17988 | 42,7 % | 55,1 % | +5,2 |
| Agent des Zehnerrats | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1242 | 60,6 % | 51,1 % | −0,9 |
| Tributeintreiber | Khan | 3 | Gewöhnlich | – | – | – | – | 1394 | 50,5 % | 45,0 % | −4,1 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1394 | 54,2 % | 50,3 % | +2,5 |
| Brand von Londinium | Boudicca | 3 | Selten | – | – | – | – | 1254 | 49,9 % | 56,6 % | +3,3 |
| Bannbulle | Nostradamus | 1 | Selten | – | – | – | – | 1072 | 58,3 % | 51,9 % | +1,9 |
| Plünderer von Paris | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1250 | 46,3 % | 53,2 % | +0,7 |
| Zorn des Donnergottes | Ragnar | 1 | Gewöhnlich | – | – | – | – | 926 | 60,7 % | 51,5 % | −1,1 |
| Shinobi aus Iga | Musashi | 2 | Gewöhnlich | – | – | – | – | 1280 | 50,9 % | 54,7 % | +3,2 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 20596 | 51,3 % | 48,8 % | −1,1 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 15566 | 53,6 % | 52,4 % | +2,5 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 20698 | 56,5 % | 52,4 % | +2,4 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 21654 | 50,0 % | 52,5 % | +2,5 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 21688 | 55,5 % | 50,4 % | +0,4 |
| Ruderer der Triere | Perikles | 1 | Basis | 3400 | 78,7 % | 50,2 % | +1,8 | 878 | 57,5 % | 56,1 % | +6,7 |
| Lange Mauern | Perikles | 2 | Basis | 3400 | 77,4 % | 44,1 % | −4,3 | 1182 | 56,1 % | 45,1 % | −4,3 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 3400 | 78,6 % | 52,1 % | +3,8 | 1208 | 54,6 % | 54,2 % | +4,7 |
| Strategos | Perikles | 3 | Basis | 3400 | 77,1 % | 50,9 % | +2,6 | 1248 | 57,1 % | 54,6 % | +5,2 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1256 | 47,1 % | 44,9 % | −4,5 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1254 | 58,5 % | 55,4 % | +5,9 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1158 | 52,8 % | 57,4 % | +8,0 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1200 | 38,4 % | 53,0 % | +3,6 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1136 | 35,6 % | 44,1 % | −5,3 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 1806 | 52,6 % | 49,8 % | +0,4 |
| Pilumwerfer | Agrippa | 1 | Basis | 3400 | 76,7 % | 52,0 % | +4,0 | 1036 | 56,0 % | 55,1 % | +5,8 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 3400 | 73,2 % | 50,4 % | +2,4 | 1442 | 46,9 % | 52,3 % | +2,9 |
| Castra | Agrippa | 3 | Basis | 3400 | 81,9 % | 49,0 % | +1,0 | 1406 | 61,3 % | 50,5 % | +1,1 |
| Testudo | Agrippa | 2 | Basis | 3400 | 73,1 % | 50,4 % | +2,4 | 1376 | 49,7 % | 53,2 % | +3,9 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1350 | 49,8 % | 47,8 % | −1,6 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1326 | 52,1 % | 54,0 % | +4,6 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1550 | 51,2 % | 54,2 % | +4,8 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1416 | 52,0 % | 47,8 % | −1,6 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1296 | 39,8 % | 47,5 % | −1,9 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1590 | 42,8 % | 51,0 % | +1,6 |
| Bogenschütze von Ta-Seti | Amanirenas | 1 | Basis | 3400 | 81,9 % | 51,2 % | +0,5 | 1042 | 59,1 % | 48,8 % | +0,0 |
| Wüstenreiter | Amanirenas | 2 | Basis | 3400 | 81,0 % | 50,1 % | −0,6 | 1328 | 58,7 % | 46,2 % | −2,6 |
| Pfeilregen von Kusch | Amanirenas | 2 | Basis | 3400 | 77,9 % | 51,7 % | +1,0 | 1446 | 45,6 % | 50,8 % | +2,0 |
| Speerträger von Napata | Amanirenas | 3 | Basis | 3400 | 82,4 % | 51,9 % | +1,2 | 1426 | 55,0 % | 49,1 % | +0,3 |
| Wächter des Löwentempels | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1366 | 53,6 % | 52,7 % | +3,9 |
| Kundschafter aus Meroë | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1398 | 57,1 % | 49,3 % | +0,6 |
| Kriegselefant von Kusch | Amanirenas | 6 | Selten | – | – | – | – | 1882 | 55,0 % | 50,0 % | +1,3 |
| Überfall auf Syene | Amanirenas | 3 | Selten | – | – | – | – | 1514 | 56,6 % | 46,2 % | −2,6 |
| Akinidad, Prinz von Kusch | Amanirenas | 5 | Episch | – | – | – | – | 1506 | 56,7 % | 44,6 % | −4,2 |
| Bronzekopf des Augustus | Amanirenas | 6 | Legendär | – | – | – | – | 1774 | 46,3 % | 50,9 % | +2,1 |
| Kopistin der Chronik | Anna | 1 | Basis | 3400 | 80,8 % | 52,4 % | +3,1 | 1010 | 53,6 % | 51,9 % | +3,4 |
| Pantokrator-Spital | Anna | 3 | Basis | 3400 | 70,7 % | 50,2 % | +0,9 | 1456 | 29,5 % | 45,9 % | −2,6 |
| Warägergardist | Anna | 3 | Basis | 3400 | 81,8 % | 53,5 % | +4,2 | 1476 | 54,7 % | 54,1 % | +5,6 |
| Hofärztin | Anna | 3 | Basis | 3400 | 80,1 % | 49,0 % | −0,3 | 1422 | 43,2 % | 45,5 % | −3,0 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1284 | 48,1 % | 55,6 % | +7,1 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1234 | 45,2 % | 53,7 % | +5,2 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1408 | 45,2 % | 56,4 % | +7,9 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1468 | 35,3 % | 49,2 % | +0,7 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1478 | 46,3 % | 50,2 % | +1,7 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 1784 | 46,7 % | 46,4 % | −2,1 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 3400 | 82,0 % | 51,5 % | +0,3 | 992 | 53,7 % | 52,3 % | +2,9 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 3400 | 80,3 % | 51,8 % | +0,6 | 1268 | 53,1 % | 49,8 % | +0,5 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 3400 | 82,3 % | 51,4 % | +0,1 | 1314 | 58,3 % | 50,8 % | +1,5 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 3400 | 81,5 % | 49,9 % | −1,3 | 1464 | 59,8 % | 48,4 % | −1,0 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1338 | 55,2 % | 45,8 % | −3,5 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1276 | 53,8 % | 50,3 % | +0,9 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1314 | 54,1 % | 49,8 % | +0,5 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1340 | 54,7 % | 41,1 % | −8,3 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 1978 | 57,3 % | 59,5 % | +10,1 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 1568 | 46,6 % | 44,2 % | −5,2 |
| Gokenin aus Sagami | Masako | 1 | Basis | 3400 | 80,3 % | 49,4 % | −1,9 | 820 | 57,4 % | 52,1 % | +1,2 |
| Bogenreiter aus Kamakura | Masako | 2 | Basis | 3400 | 81,3 % | 50,1 % | −1,1 | 1112 | 57,6 % | 53,4 % | +2,5 |
| Treueschwur | Masako | 1 | Basis | 3400 | 80,1 % | 53,3 % | +2,0 | 840 | 51,9 % | 56,9 % | +5,9 |
| Nonne von Kamakura | Masako | 2 | Basis | 3400 | 81,6 % | 49,4 % | −1,9 | 1208 | 59,4 % | 53,9 % | +2,9 |
| Rokuhara-Späher | Masako | 2 | Gewöhnlich | – | – | – | – | 1144 | 57,4 % | 53,6 % | +2,7 |
| Aufgebot von Jōkyū | Masako | 4 | Gewöhnlich | – | – | – | – | 1288 | 56,7 % | 54,4 % | +3,5 |
| Tsurugaoka Hachiman-gū | Masako | 2 | Selten | – | – | – | – | 1198 | 55,0 % | 49,7 % | −1,2 |
| Verbannung nach Oki | Masako | 3 | Selten | – | – | – | – | 1312 | 50,1 % | 48,7 % | −2,3 |
| Hōjō Yoshitoki, Regent | Masako | 5 | Episch | – | – | – | – | 1440 | 54,2 % | 54,1 % | +3,1 |
| Minamoto no Yoritomo | Masako | 6 | Legendär | – | – | – | – | 1900 | 51,6 % | 52,8 % | +1,8 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1308 | 55,0 % | 51,8 % | +1,6 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1228 | 53,0 % | 46,3 % | −3,9 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1216 | 52,5 % | 44,8 % | −2,6 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1226 | 52,9 % | 51,3 % | +3,9 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1436 | 59,1 % | 48,6 % | +0,8 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1340 | 61,4 % | 44,7 % | −3,1 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1222 | 47,4 % | 48,9 % | −3,1 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 1774 | 44,6 % | 53,6 % | +1,6 |
| Jurtenlager | Khan | 3 | Gewöhnlich | – | – | – | – | 1430 | 35,0 % | 41,3 % | −7,8 |
| Kurultai | Khan | 4 | Selten | – | – | – | – | 1296 | 30,9 % | 46,4 % | −2,7 |
| Barde der Icener | Boudicca | 2 | Gewöhnlich | – | – | – | – | 1268 | 55,0 % | 54,4 % | +1,2 |
| Sichelwagen | Boudicca | 5 | Selten | – | – | – | – | 1402 | 49,6 % | 56,4 % | +3,2 |
| Almanach der Quatrains | Nostradamus | 1 | Gewöhnlich | – | – | – | – | 972 | 57,3 % | 53,0 % | +2,9 |
| Horoskop der Königin | Nostradamus | 3 | Selten | – | – | – | – | 1448 | 2,3 % | 47,4 % | −2,7 |
| Pilgerin aus Domrémy | Jeanne | 1 | Gewöhnlich | – | – | – | – | 978 | 52,4 % | 56,6 % | +6,9 |
| Die Weihe von Reims | Jeanne | 4 | Selten | – | – | – | – | 1214 | 32,1 % | 49,5 % | −0,2 |
| Runenmeisterin | Ragnar | 2 | Gewöhnlich | – | – | – | – | 1160 | 51,8 % | 57,9 % | +5,4 |
| Berserkergang | Ragnar | 1 | Selten | – | – | – | – | 946 | 60,0 % | 50,1 % | −2,4 |
| Schwertschüler aus Kokura | Musashi | 4 | Selten | – | – | – | – | 1146 | 44,2 % | 48,6 % | −2,9 |
| Niten Ichi-ryū | Musashi | 2 | Gewöhnlich | – | – | – | – | 1202 | 48,9 % | 48,9 % | −2,6 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1194 | 49,8 % | 54,5 % | +5,1 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1232 | 28,1 % | 49,1 % | −0,3 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1372 | 45,8 % | 49,1 % | −0,3 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1292 | 40,2 % | 52,1 % | +2,7 |
| Pfeilmacher aus Meroë | Amanirenas | 2 | Gewöhnlich | – | – | – | – | 1360 | 55,1 % | 45,0 % | −3,7 |
| Gift der Wüstenviper | Amanirenas | 3 | Selten | – | – | – | – | 1410 | 44,0 % | 53,2 % | +4,4 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1460 | 53,4 % | 49,4 % | +0,9 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 1742 | 58,6 % | 55,7 % | +7,2 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1346 | 56,8 % | 48,4 % | −1,0 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1304 | 51,2 % | 47,7 % | −1,7 |
| Jitō-Verwalter | Masako | 2 | Gewöhnlich | – | – | – | – | 1196 | 56,3 % | 52,4 % | +1,5 |
| Siegel des Shikken | Masako | 2 | Selten | – | – | – | – | 1164 | 46,7 % | 50,2 % | −0,7 |
| Olympionike | Griechische Antike | 4 | Gewöhnlich | – | – | – | – | 3612 | 53,0 % | 55,9 % | +6,9 |
| Rhapsode | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 3528 | 53,0 % | 50,7 % | +1,7 |
| Marathonläufer | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 3574 | 52,7 % | 51,3 % | +2,3 |
| Orakel von Delphi | Griechische Antike | 3 | Selten | – | – | – | – | 3980 | 31,0 % | 48,5 % | −0,5 |
| Leuchtturm von Pharos | Griechische Antike | 3 | Selten | – | – | – | – | 3908 | 54,2 % | 41,6 % | −7,4 |
| Akropolis | Griechische Antike | 2 | Selten | – | – | – | – | 3530 | 55,2 % | 49,7 % | +0,7 |
| Bibliothek von Alexandria | Griechische Antike | 3 | Episch | – | – | – | – | 3876 | 49,6 % | 47,7 % | −1,3 |
| Knappe | Europäisches Mittelalter | 1 | Gewöhnlich | – | – | – | – | 3714 | 54,2 % | 53,1 % | +1,2 |
| Armbrustschütze | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 5218 | 58,0 % | 56,2 % | +4,3 |
| Mönch von Cluny | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 5158 | 50,4 % | 55,0 % | +3,1 |
| Hansekogge | Europäisches Mittelalter | 4 | Gewöhnlich | – | – | – | – | 4744 | 46,6 % | 49,7 % | −2,2 |
| Turnierritter | Europäisches Mittelalter | 4 | Selten | – | – | – | – | 4816 | 50,6 % | 54,8 % | +2,9 |
| Burgfried | Europäisches Mittelalter | 2 | Selten | – | – | – | – | 5054 | 56,7 % | 44,5 % | −7,4 |
| Tribok | Europäisches Mittelalter | 4 | Episch | – | – | – | – | 4706 | 31,4 % | 48,9 % | −2,9 |
| Ashigaru | China, Korea, Japan | 1 | Gewöhnlich | – | – | – | – | 1708 | 53,9 % | 55,9 % | +4,7 |
| Mandarin-Gelehrter | China, Korea, Japan | 3 | Gewöhnlich | – | – | – | – | 2642 | 51,7 % | 53,6 % | +2,4 |
| Teezeremonie | China, Korea, Japan | 2 | Gewöhnlich | – | – | – | – | 2410 | 43,3 % | 48,7 % | −2,6 |
| Hwacha-Salve | China, Korea, Japan | 3 | Selten | – | – | – | – | 2624 | 56,1 % | 51,7 % | +0,4 |
| Schildkrötenschiff | China, Korea, Japan | 5 | Selten | – | – | – | – | 2792 | 52,4 % | 50,9 % | −0,4 |
| Terrakotta-Armee | China, Korea, Japan | 5 | Episch | – | – | – | – | 2818 | 53,9 % | 50,1 % | −1,1 |
| Große Mauer | China, Korea, Japan | 2 | Episch | – | – | – | – | 2388 | 60,2 % | 43,5 % | −7,7 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 21800 | 33,0 % | 44,5 % | −5,4 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 20730 | 56,3 % | 45,7 % | −4,3 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 20186 | 27,3 % | 43,9 % | −6,0 |
