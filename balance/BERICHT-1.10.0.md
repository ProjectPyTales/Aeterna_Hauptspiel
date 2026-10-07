# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `392d5c15aa` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die neun anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,8.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 27200 | ✓ 16/16 | ✗ 114/120 | ✓ 46,2 % | – | 0 | 23 |
| Zufallsdecks | 27200 | ✗ 15/16 | ✗ 119/120 | ✓ 50,9 % | ✓ 52,9 % (+3,0) | 0 | 20 |

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
| Jeanne d’Arc | **50,1 %** | 43,9 % | 56,3 % | Hypatia 40,5 % | Ragnar 60,0 % | Aggressiv: 51,9 % | ✓ |
| Nostradamus | **50,1 %** | 49,2 % | 50,9 % | Khan 35,5 % | Imhotep 56,5 % | Kombinierend: 41,4 % | ✓ |
| Ragnar Lodbrok | **49,7 %** | 46,1 % | 53,4 % | Jeanne 40,0 % | Anna 56,5 % | Aggressiv: 41,6 % | ✓ |
| Anna Komnene | **49,2 %** | 50,3 % | 48,3 % | Nezahualcóyotl 41,5 % | Hypatia 56,5 % | Kombinierend: 39,4 % | ✓ |
| Amanirenas | **49,0 %** | 46,3 % | 52,0 % | Leonidas 36,5 % | Boudicca 57,5 % | Aggressiv: 45,0 % | ✓ |
| Imhotep | **49,0 %** | 46,2 % | 51,9 % | Nostradamus 43,5 % | Boudicca 60,0 % | Defensiv: 36,9 % | ✓ |
| Enrico Dandolo | **48,8 %** | 46,5 % | 51,4 % | Musashi 38,0 % | Imhotep 55,5 % | Kombinierend: 42,0 % | ✓ |
| Perikles | **48,5 %** | 43,9 % | 53,5 % | Hypatia 43,0 % | Agrippa 55,5 % | Defensiv: 40,2 % | ✓ |
| Marcus Agrippa | **48,1 %** | 43,4 % | 53,3 % | Khan 35,5 % | Boudicca 57,5 % | Kombinierend: 44,3 % | ✓ |
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
| Jeanne | 49 | 41 | 51 | 53 | 54 | 45 | 47 | · | 60 | 59 | 56 | 51 | 44 | 53 | 49 | 43 |
| Ragnar | 49 | 50 | 52 | 52 | 45 | 51 | 53 | 40 | · | 43 | 50 | 52 | 49 | 56 | 54 | 51 |
| Musashi | 54 | 55 | 55 | **62** | 53 | 45 | 56 | 42 | 57 | · | 57 | 57 | 45 | 55 | 45 | 51 |
| Perikles | 51 | 43 | 48 | 45 | 50 | 54 | 46 | 44 | 51 | 43 | · | 56 | 51 | 52 | 50 | 46 |
| Agrippa | 46 | 53 | 56 | 46 | **36** | 57 | 48 | 49 | 48 | 43 | 44 | · | 52 | 49 | 46 | 49 |
| Amanirenas | **37** | 46 | 46 | 51 | 53 | 57 | 49 | 56 | 52 | 55 | 49 | 49 | · | 44 | 44 | 50 |
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
| Pilumwerfer | Agrippa | 1 | 52,4 % | +4,1 | 76,7 % |
| Rede auf die Gefallenen | Perikles | 3 | 52,5 % | +3,8 | 78,7 % |
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
| Lange Mauern | Perikles | 2 | 44,5 % | −4,2 | 77,4 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | KI-Spielweise: Angriffe aufs Gesicht | Ziel |
|---|---|---|---|---|---|---|---|
| Boudicca | **53,2 %** | 53,5 % | 52,1 % | Ragnar 47,0 % | Khan 60,5 % | Aggressiv: 50,1 % | ✗ |
| Ragnar Lodbrok | **52,6 %** | 51,6 % | 52,9 % | Jeanne 46,0 % | Imhotep 59,0 % | Aggressiv: 48,6 % | ✓ |
| Enrico Dandolo | **52,0 %** | 55,0 % | 48,5 % | Boudicca 41,0 % | Agrippa 59,5 % | Kombinierend: 45,3 % | ✓ |
| Miyamoto Musashi | **51,6 %** | 52,3 % | 50,5 % | Ragnar 47,0 % | Hypatia 58,0 % | Aggressiv: 54,3 % | ✓ |
| Hōjō Masako | **50,9 %** | 51,2 % | 50,4 % | Jeanne 44,5 % | Khan 56,0 % | Defensiv: 40,2 % | ✓ |
| Nostradamus | **50,1 %** | 51,2 % | 48,9 % | Leonidas 44,5 % | Jeanne 57,0 % | Kombinierend: 45,5 % | ✓ |
| Leonidas I. | **50,1 %** | 50,8 % | 49,4 % | Ragnar 47,0 % | Imhotep 55,5 % | Defensiv: 39,5 % | ✓ |
| Jeanne d’Arc | **49,8 %** | 51,6 % | 48,0 % | Nostradamus 43,0 % | Anna 57,5 % | Aggressiv: 50,6 % | ✓ |
| Marcus Agrippa | **49,6 %** | 48,5 % | 50,8 % | Dandolo 40,5 % | Imhotep 58,5 % | Kombinierend: 47,2 % | ✓ |
| Perikles | **49,3 %** | 50,5 % | 48,3 % | Boudicca 45,0 % | Hypatia 57,0 % | Defensiv: 41,8 % | ✓ |
| Amanirenas | **49,3 %** | 51,2 % | 47,5 % | Boudicca 44,0 % | Jeanne 56,0 % | Aggressiv: 49,3 % | ✓ |
| Nezahualcóyotl | **49,2 %** | 50,6 % | 48,1 % | Imhotep 41,5 % | Khan 54,5 % | Defensiv: 40,4 % | ✓ |
| Dschingis Khan | **48,9 %** | 48,1 % | 50,0 % | Boudicca 39,5 % | Anna 55,5 % | Aggressiv: 51,2 % | ✓ |
| Anna Komnene | **48,2 %** | 50,8 % | 46,0 % | Jeanne 42,5 % | Nostradamus 55,5 % | Kombinierend: 43,6 % | ✓ |
| Imhotep | **47,7 %** | 48,0 % | 47,9 % | Ragnar 41,0 % | Nezahualcóyotl 58,5 % | Defensiv: 38,8 % | ✓ |
| Hypatia | **47,6 %** | 49,4 % | 46,4 % | Musashi 42,0 % | Anna 54,5 % | Kombinierend: 44,1 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 49 | 56 | 48 | 51 | 52 | 56 | 50 | 47 | 47 | 47 | 55 | 49 | 48 | 50 | 50 |
| Hypatia | 52 | · | 48 | 47 | 50 | 46 | 45 | 46 | 48 | 42 | 43 | 48 | 49 | 55 | 50 | 48 |
| Imhotep | 44 | 52 | · | 44 | 49 | 47 | 48 | 46 | 41 | 48 | 45 | 42 | 49 | 54 | 59 | 50 |
| Dandolo | 52 | 53 | 56 | · | 53 | 41 | 56 | 56 | 49 | 44 | 55 | 60 | 53 | 50 | 54 | 51 |
| Khan | 50 | 51 | 52 | 48 | · | **40** | 53 | 54 | 43 | 50 | 53 | 48 | 51 | 56 | 46 | 44 |
| Boudicca | 48 | 54 | 53 | 59 | **61** | · | 48 | 50 | 47 | 51 | 55 | 59 | 56 | 56 | 51 | 51 |
| Nostradamus | 44 | 55 | 53 | 44 | 48 | 52 | · | 57 | 51 | 48 | 49 | 52 | 56 | 45 | 47 | 52 |
| Jeanne | 51 | 54 | 54 | 44 | 46 | 51 | 43 | · | 54 | 46 | 49 | 46 | 44 | 57 | 52 | 56 |
| Ragnar | 53 | 52 | 59 | 52 | 57 | 53 | 50 | 46 | · | 53 | 54 | 55 | 49 | 52 | 53 | 53 |
| Musashi | 53 | 58 | 52 | 56 | 50 | 49 | 52 | 54 | 47 | · | 51 | 50 | 50 | 53 | 49 | 50 |
| Perikles | 53 | 57 | 55 | 45 | 48 | 45 | 52 | 51 | 46 | 49 | · | 47 | 48 | 47 | 51 | 47 |
| Agrippa | 45 | 52 | 59 | 41 | 52 | 41 | 48 | 54 | 45 | 50 | 53 | · | 53 | 56 | 46 | 49 |
| Amanirenas | 51 | 51 | 52 | 48 | 49 | 44 | 44 | 56 | 52 | 50 | 52 | 47 | · | 50 | 48 | 48 |
| Anna | 52 | 45 | 46 | 51 | 44 | 44 | 55 | 43 | 49 | 48 | 53 | 44 | 51 | · | 54 | 45 |
| Nezahualcóyotl | 50 | 51 | 42 | 46 | 54 | 49 | 53 | 48 | 48 | 51 | 50 | 54 | 53 | 46 | · | 46 |
| Masako | 51 | 52 | 50 | 50 | 56 | 50 | 48 | 44 | 47 | 50 | 53 | 52 | 52 | 55 | 54 | · |

**KI-Persönlichkeit** (AP 5.8 Teil 2) – Anteil der Angriffe: **Aggressiv** (6 Helden) 50,7 % aufs Gesicht, 6,7 % auf Bauwerke · **Defensiv** (5 Helden) 40,1 % aufs Gesicht, 9,1 % auf Bauwerke · **Kombinierend** (5 Helden) 45,1 % aufs Gesicht, 8,4 % auf Bauwerke.

**Partielänge** (Züge beider Seiten zusammen): Mittel 21,6, Median 20, 10–90 %: 15–30, kürzeste 8, längste 67. Beginner gewinnt 50,9 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 59,1 % | +9,8 | 57,3 % |
| Phalanxveteran | Leonidas | 5 | 59,7 % | +9,6 | 56,1 % |
| Wächter des Weltenbaums | neutral | 8 | 58,8 % | +8,8 | 44,3 % |
| Pestdoktor | Nostradamus | 4 | 58,5 % | +8,4 | 56,3 % |
| Kataphrakt | Anna | 5 | 56,5 % | +8,1 | 45,5 % |
| Triere von Salamis | Perikles | 4 | 57,1 % | +7,7 | 52,8 % |
| Chronist am Kaiserhof | Anna | 6 | 55,5 % | +7,1 | 58,6 % |
| Olympionike | Griechische Antike | 4 | 56,2 % | +7,1 | 52,8 % |
| Kolosseum | neutral | 3 | 44,5 % | −5,5 | 32,8 % |
| Odeion | Perikles | 4 | 43,8 % | −5,5 | 35,5 % |
| Pyramiden von Gizeh | neutral | 4 | 43,9 % | −6,0 | 27,2 % |
| Burgfried | Europäisches Mittelalter | 2 | 44,3 % | −7,4 | 56,8 % |
| Leuchtturm von Pharos | Griechische Antike | 3 | 41,7 % | −7,4 | 54,2 % |
| Große Mauer | China, Korea, Japan | 2 | 43,3 % | −7,8 | 60,2 % |
| Jurtenlager | Khan | 3 | 41,1 % | −8,0 | 34,9 % |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | 40,9 % | −8,4 | 54,7 % |

**Legendäre** (AP 5.3) – als Gruppe 52,9 % „gewinnt, wenn gezogen“ (+3,0 gegenüber ihrem Helden, 32857 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Lagertha, Schildmaid | Ragnar | 7 | 56,8 % | +4,5 | 43,3 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 55,3 % | +5,3 | 42,6 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 55,3 % | +3,5 | 44,4 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 54,5 % | +4,4 | 49,4 % |
| Andraste, Göttin des Sieges | Boudicca | 8 | 54,4 % | +1,6 | 47,1 % |
| Subutai, der Stratege | Khan | 6 | 53,5 % | +4,4 | 43,8 % |
| Djoser, der Erbauer | Imhotep | 6 | 52,8 % | +4,8 | 50,7 % |
| Minamoto no Yoritomo | Masako | 6 | 52,7 % | +1,9 | 51,6 % |
| Herodot, Vater der Geschichte | neutral | 4 | 52,6 % | +2,6 | 42,6 % |
| Theon von Alexandria | Hypatia | 5 | 51,5 % | +3,6 | 48,2 % |
| Bronzekopf des Augustus | Amanirenas | 6 | 51,4 % | +2,0 | 45,8 % |
| La Hire, der Unbeugsame | Jeanne | 7 | 51,1 % | +1,3 | 41,7 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 51,0 % | +1,3 | 42,9 % |
| Caterina de’ Medici | Nostradamus | 5 | 50,8 % | +0,7 | 52,7 % |
| Sasaki Kojirō, der Rivale | Musashi | 6 | 50,7 % | −0,7 | 44,7 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 50,0 % | +0,7 | 52,7 % |
| Alexios I. Komnenos | Anna | 6 | 46,3 % | −2,1 | 46,8 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 44,2 % | −5,1 | 46,7 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 3400 | 80,2 % | 52,1 % | +0,9 | 886 | 54,0 % | 53,2 % | +3,1 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 3400 | 80,7 % | 51,6 % | +0,4 | 1230 | 57,1 % | 54,3 % | +4,2 |
| Bronzener Wall | Leonidas | 2 | Basis | 3400 | 80,6 % | 53,0 % | +1,9 | 1230 | 52,5 % | 48,6 % | −1,5 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 3400 | 76,6 % | 53,0 % | +1,9 | 1170 | 46,3 % | 49,6 % | −0,5 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1268 | 56,9 % | 54,8 % | +4,7 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1290 | 54,1 % | 49,1 % | −1,0 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1438 | 56,1 % | 59,7 % | +9,6 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1186 | 45,9 % | 50,2 % | +0,1 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 1792 | 53,1 % | 45,9 % | −4,2 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 1548 | 49,4 % | 54,5 % | +4,4 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 3400 | 83,1 % | 49,8 % | −1,6 | 878 | 57,5 % | 46,7 % | −1,2 |
| Himmelsstrahl | Hypatia | 2 | Basis | 3400 | 86,1 % | 51,1 % | −0,4 | 1210 | 57,6 % | 52,0 % | +4,1 |
| Sternenkundiger | Hypatia | 3 | Basis | 3400 | 81,2 % | 53,0 % | +1,6 | 1406 | 48,0 % | 50,4 % | +2,5 |
| Sternenregen | Hypatia | 4 | Basis | 3400 | 77,4 % | 54,6 % | +3,2 | 1124 | 45,8 % | 52,8 % | +4,9 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1322 | 59,0 % | 53,7 % | +5,8 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1246 | 42,1 % | 47,7 % | −0,2 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1358 | 47,0 % | 51,7 % | +3,8 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 1902 | 55,9 % | 48,5 % | +0,6 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 1396 | 53,4 % | 44,7 % | −3,1 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1470 | 48,2 % | 51,5 % | +3,6 |
| Nilschülerin | Imhotep | 1 | Basis | 3400 | 82,6 % | 48,6 % | −0,5 | 1022 | 58,0 % | 46,1 % | −1,8 |
| Heilender Balsam | Imhotep | 1 | Basis | 3400 | 82,4 % | 50,8 % | +1,7 | 988 | 57,9 % | 53,2 % | +5,3 |
| Pyramidenwächter | Imhotep | 3 | Basis | 3400 | 84,4 % | 50,1 % | +1,0 | 1418 | 58,7 % | 50,0 % | +2,1 |
| Tempelärztin | Imhotep | 4 | Basis | 3400 | 80,9 % | 49,6 % | +0,6 | 1340 | 51,9 % | 45,8 % | −2,2 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1358 | 53,1 % | 52,1 % | +4,2 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1442 | 60,5 % | 52,2 % | +4,3 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1332 | 48,7 % | 49,5 % | +1,5 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1538 | 54,6 % | 53,4 % | +5,5 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 1510 | 56,9 % | 47,8 % | −0,2 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 1866 | 50,7 % | 52,8 % | +4,8 |
| Lagunenbote | Dandolo | 1 | Basis | 3400 | 78,5 % | 51,5 % | +2,5 | 884 | 53,8 % | 53,5 % | +1,8 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 3400 | 79,6 % | 48,5 % | −0,5 | 1210 | 47,9 % | 50,7 % | −1,1 |
| Präziser Stich | Dandolo | 2 | Basis | 3400 | 83,7 % | 50,3 % | +1,3 | 1228 | 55,2 % | 50,9 % | −0,9 |
| Handelsgesandter | Dandolo | 4 | Basis | 3400 | 77,1 % | 52,0 % | +3,0 | 1152 | 51,3 % | 58,1 % | +6,4 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1232 | 40,0 % | 51,9 % | +0,2 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1258 | 55,1 % | 52,4 % | +0,6 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1262 | 43,7 % | 53,0 % | +1,2 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1284 | 49,3 % | 52,8 % | +1,0 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1356 | 33,6 % | 55,6 % | +3,8 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 1746 | 44,4 % | 55,3 % | +3,5 |
| Steppenspäher | Khan | 1 | Basis | 3400 | 75,2 % | 50,2 % | −1,0 | 1048 | 48,1 % | 48,9 % | −0,1 |
| Reiterbogenschütze | Khan | 2 | Basis | 3400 | 75,9 % | 49,7 % | −1,5 | 1466 | 50,9 % | 49,2 % | +0,1 |
| Pfeilschuss | Khan | 2 | Basis | 3400 | 75,5 % | 49,2 % | −2,0 | 1482 | 56,3 % | 49,9 % | +0,8 |
| Goldener Reiter | Khan | 4 | Basis | 3400 | 69,5 % | 56,3 % | +5,1 | 1298 | 46,4 % | 55,3 % | +6,2 |
| Adlerjägerin | Khan | 3 | Gewöhnlich | – | – | – | – | 1492 | 45,1 % | 48,6 % | −0,4 |
| Steppensturm | Khan | 3 | Gewöhnlich | – | – | – | – | 1474 | 45,9 % | 47,5 % | −1,6 |
| Tumenwächter | Khan | 5 | Selten | – | – | – | – | 1400 | 43,9 % | 49,9 % | +0,8 |
| Belagerungsfeuer | Khan | 6 | Selten | – | – | – | – | 1752 | 48,9 % | 53,7 % | +4,7 |
| Keshig-Elite | Khan | 6 | Episch | – | – | – | – | 1768 | 41,2 % | 44,2 % | −4,8 |
| Subutai, der Stratege | Khan | 6 | Legendär | – | – | – | – | 1672 | 43,8 % | 53,5 % | +4,4 |
| Hainwächterin | Boudicca | 1 | Basis | 3400 | 81,6 % | 46,5 % | −1,4 | 936 | 51,1 % | 56,8 % | +4,0 |
| Eichenhaut | Boudicca | 2 | Basis | 3400 | 72,7 % | 46,1 % | −1,7 | 1266 | 39,5 % | 48,3 % | −4,5 |
| Icenerkrieger | Boudicca | 3 | Basis | 3400 | 84,6 % | 48,7 % | +0,8 | 1256 | 56,8 % | 56,8 % | +4,0 |
| Wilder Hieb | Boudicca | 3 | Basis | 3400 | 83,5 % | 46,8 % | −1,0 | 1278 | 59,0 % | 49,5 % | −3,3 |
| Streitwagenlenkerin | Boudicca | 4 | Gewöhnlich | – | – | – | – | 1146 | 46,8 % | 50,9 % | −1,8 |
| Druidin des Hains | Boudicca | 3 | Gewöhnlich | – | – | – | – | 1324 | 52,6 % | 50,6 % | −2,2 |
| Aufstand | Boudicca | 3 | Selten | – | – | – | – | 1250 | 54,6 % | 57,7 % | +4,9 |
| Eichenkoloss | Boudicca | 6 | Selten | – | – | – | – | 1874 | 52,9 % | 54,5 % | +1,7 |
| Zorn der Königin | Boudicca | 5 | Episch | – | – | – | – | 1356 | 32,1 % | 50,5 % | −2,3 |
| Andraste, Göttin des Sieges | Boudicca | 8 | Legendär | – | – | – | – | 1040 | 47,1 % | 54,4 % | +1,6 |
| Tintenlehrling | Nostradamus | 1 | Basis | 3400 | 84,6 % | 52,9 % | +2,8 | 1034 | 56,4 % | 55,2 % | +5,1 |
| Dunkle Vorahnung | Nostradamus | 2 | Basis | 3400 | 88,4 % | 52,9 % | +2,8 | 1414 | 64,3 % | 51,7 % | +1,6 |
| Maskierter Seher | Nostradamus | 3 | Basis | 3400 | 84,0 % | 50,6 % | +0,5 | 1482 | 48,5 % | 49,2 % | −0,9 |
| Prophezeiung | Nostradamus | 4 | Basis | 3400 | 64,1 % | 50,4 % | +0,3 | 1270 | 22,6 % | 49,3 % | −0,8 |
| Pestdoktor | Nostradamus | 4 | Gewöhnlich | – | – | – | – | 1302 | 56,3 % | 58,5 % | +8,4 |
| Schattenpakt | Nostradamus | 2 | Gewöhnlich | – | – | – | – | 1370 | 59,9 % | 54,1 % | +4,0 |
| Chronist der Nacht | Nostradamus | 5 | Selten | – | – | – | – | 1404 | 50,5 % | 50,9 % | +0,8 |
| Rote Finsternis | Nostradamus | 5 | Selten | – | – | – | – | 1488 | 42,2 % | 52,9 % | +2,8 |
| Wächter der Zeiten | Nostradamus | 6 | Episch | – | – | – | – | 1862 | 59,0 % | 53,2 % | +3,1 |
| Caterina de’ Medici | Nostradamus | 5 | Legendär | – | – | – | – | 1458 | 52,7 % | 50,8 % | +0,7 |
| Bauernrekrut | Jeanne | 1 | Basis | 3400 | 78,7 % | 49,8 % | −0,3 | 940 | 55,9 % | 56,0 % | +6,2 |
| Bannersegen | Jeanne | 2 | Basis | 3400 | 78,9 % | 50,7 % | +0,6 | 1212 | 50,7 % | 48,9 % | −0,9 |
| Wache von Orléans | Jeanne | 3 | Basis | 3400 | 77,8 % | 49,8 % | −0,3 | 1314 | 54,2 % | 52,4 % | +2,6 |
| Die Fahne erheben | Jeanne | 2 | Basis | 3400 | 76,9 % | 49,3 % | −0,8 | 1218 | 53,4 % | 53,3 % | +3,5 |
| Lilienritter | Jeanne | 4 | Gewöhnlich | – | – | – | – | 1154 | 41,0 % | 51,0 % | +1,2 |
| Heiliger Schutz | Jeanne | 2 | Gewöhnlich | – | – | – | – | 1244 | 47,4 % | 52,0 % | +2,2 |
| Standartenträgerin | Jeanne | 5 | Selten | – | – | – | – | 1310 | 47,9 % | 51,3 % | +1,5 |
| Glocken von Reims | Jeanne | 6 | Selten | – | – | – | – | 1678 | 41,5 % | 50,1 % | +0,3 |
| Paladin der Loire | Jeanne | 7 | Episch | – | – | – | – | 1560 | 43,7 % | 50,2 % | +0,4 |
| La Hire, der Unbeugsame | Jeanne | 7 | Legendär | – | – | – | – | 1512 | 41,7 % | 51,1 % | +1,3 |
| Fjordspäher | Ragnar | 1 | Basis | 3400 | 77,2 % | 48,4 % | −1,4 | 898 | 50,2 % | 56,4 % | +4,1 |
| Runenblitz | Ragnar | 2 | Basis | 3400 | 81,3 % | 49,8 % | +0,0 | 1238 | 58,4 % | 52,1 % | −0,1 |
| Schildmaid | Ragnar | 3 | Basis | 3400 | 80,0 % | 50,4 % | +0,7 | 1262 | 52,5 % | 54,8 % | +2,5 |
| Runenschnitzer | Ragnar | 4 | Basis | 3400 | 75,8 % | 51,6 % | +1,9 | 1166 | 49,1 % | 52,8 % | +0,5 |
| Donnerschlag | Ragnar | 3 | Gewöhnlich | – | – | – | – | 1292 | 55,0 % | 53,9 % | +1,7 |
| Berserker vom Fjord | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1152 | 45,4 % | 52,9 % | +0,6 |
| Ahnenbund | Ragnar | 3 | Selten | – | – | – | – | 1232 | 52,4 % | 56,5 % | +4,3 |
| Runenhüter | Ragnar | 5 | Selten | – | – | – | – | 1386 | 46,9 % | 48,2 % | −4,1 |
| Sturm der Nordsee | Ragnar | 5 | Episch | – | – | – | – | 1378 | 52,1 % | 53,4 % | +1,2 |
| Lagertha, Schildmaid | Ragnar | 7 | Legendär | – | – | – | – | 1638 | 43,3 % | 56,8 % | +4,5 |
| Dojoschüler | Musashi | 1 | Basis | 3400 | 78,9 % | 51,4 % | −1,0 | 888 | 52,0 % | 52,1 % | +0,7 |
| Schneller Schnitt | Musashi | 1 | Basis | 3400 | 82,8 % | 52,8 % | +0,5 | 886 | 49,5 % | 53,6 % | +2,1 |
| Rōnin | Musashi | 3 | Basis | 3400 | 83,1 % | 54,5 % | +2,1 | 1306 | 53,8 % | 55,2 % | +3,8 |
| Konzentration | Musashi | 2 | Basis | 3400 | 72,1 % | 54,0 % | +1,6 | 1270 | 42,0 % | 50,1 % | −1,3 |
| Kirschblütenwache | Musashi | 3 | Gewöhnlich | – | – | – | – | 1316 | 52,2 % | 53,5 % | +2,1 |
| Zwei Himmel | Musashi | 3 | Gewöhnlich | – | – | – | – | 1294 | 35,9 % | 51,8 % | +0,4 |
| Duellant | Musashi | 4 | Selten | – | – | – | – | 1140 | 39,6 % | 48,6 % | −2,8 |
| Der leere Geist | Musashi | 5 | Selten | – | – | – | – | 1352 | 39,4 % | 56,4 % | +5,0 |
| Meister der fünf Ringe | Musashi | 6 | Episch | – | – | – | – | 1776 | 50,8 % | 49,3 % | −2,1 |
| Sasaki Kojirō, der Rivale | Musashi | 6 | Legendär | – | – | – | – | 1638 | 44,7 % | 50,7 % | −0,7 |
| Dorfwache | neutral | 1 | Basis | 54400 | 79,5 % | 49,3 % | −0,7 | 15282 | 53,5 % | 49,2 % | −0,8 |
| Wandernder Händler | neutral | 2 | Basis | 54400 | 76,5 % | 49,2 % | −0,8 | 20912 | 48,6 % | 49,7 % | −0,3 |
| Steinschleuderer | neutral | 2 | Basis | 54400 | 80,2 % | 49,4 % | −0,6 | 20660 | 52,2 % | 50,2 % | +0,3 |
| Grenzläuferin | neutral | 3 | Basis | 54400 | 81,4 % | 50,7 % | +0,7 | 21420 | 52,1 % | 52,4 % | +2,4 |
| Festungsschild | neutral | 4 | Basis | 54400 | 75,2 % | 50,9 % | +0,9 | 19930 | 46,3 % | 50,8 % | +0,8 |
| Kavallerist | neutral | 4 | Basis | 54400 | 76,8 % | 51,3 % | +1,3 | 19940 | 46,2 % | 51,7 % | +1,7 |
| Feldheilerin | neutral | 3 | Basis | 54400 | 79,1 % | 49,4 % | −0,6 | 21810 | 51,3 % | 48,4 % | −1,6 |
| Archivarin | neutral | 4 | Basis | 54400 | 72,8 % | 52,4 % | +2,4 | 20100 | 45,0 % | 50,7 % | +0,7 |
| Wachhund | neutral | 2 | Basis | 54400 | 78,3 % | 48,7 % | −1,3 | 20514 | 49,9 % | 48,7 % | −1,3 |
| Veteran | neutral | 5 | Basis | 54400 | 78,0 % | 52,5 % | +2,5 | 23438 | 49,4 % | 48,9 % | −1,1 |
| Belagerungsturm | neutral | 6 | Basis | 54400 | 75,2 % | 55,5 % | +5,5 | 29530 | 50,5 % | 50,2 % | +0,2 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 21730 | 49,9 % | 50,6 % | +0,7 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 15362 | 52,6 % | 51,3 % | +1,3 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 23468 | 50,3 % | 53,3 % | +3,3 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 21710 | 50,2 % | 49,3 % | −0,7 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 20354 | 49,5 % | 49,9 % | −0,1 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 20606 | 41,0 % | 49,6 % | −0,3 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 15272 | 49,7 % | 47,7 % | −2,3 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 20802 | 56,5 % | 50,0 % | +0,1 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 26102 | 51,2 % | 54,0 % | +4,1 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 21680 | 53,8 % | 50,7 % | +0,8 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 20108 | 47,3 % | 49,1 % | −0,9 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 20718 | 53,3 % | 52,3 % | +2,3 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 20202 | 47,6 % | 52,3 % | +2,4 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 21552 | 56,5 % | 53,0 % | +3,1 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 20632 | 28,3 % | 45,2 % | −4,8 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 19968 | 47,6 % | 46,4 % | −3,6 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 23444 | 46,3 % | 50,7 % | +0,7 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 19866 | 52,1 % | 53,7 % | +3,8 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 20172 | 45,9 % | 54,5 % | +4,5 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 23624 | 51,3 % | 51,3 % | +1,3 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 23288 | 49,0 % | 49,8 % | −0,2 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 20312 | 41,0 % | 49,1 % | −0,8 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 29650 | 53,6 % | 51,0 % | +1,1 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 26290 | 45,5 % | 52,0 % | +2,0 |
| Vergessene Weisheit | neutral | 4 | Episch | – | – | – | – | 19830 | 23,9 % | 48,9 % | −1,0 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 18116 | 44,3 % | 58,8 % | +8,8 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 26282 | 53,6 % | 52,8 % | +2,8 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 19794 | 42,6 % | 52,6 % | +2,6 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 17988 | 42,6 % | 55,3 % | +5,3 |
| Agent des Zehnerrats | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1242 | 60,5 % | 50,4 % | −1,4 |
| Tributeintreiber | Khan | 3 | Gewöhnlich | – | – | – | – | 1394 | 50,6 % | 44,8 % | −4,2 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1394 | 54,2 % | 50,3 % | +2,4 |
| Brand von Londinium | Boudicca | 3 | Selten | – | – | – | – | 1254 | 49,7 % | 56,5 % | +3,7 |
| Bannbulle | Nostradamus | 1 | Selten | – | – | – | – | 1072 | 58,3 % | 51,9 % | +1,9 |
| Plünderer von Paris | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1250 | 46,4 % | 53,2 % | +0,9 |
| Zorn des Donnergottes | Ragnar | 1 | Gewöhnlich | – | – | – | – | 926 | 60,5 % | 50,9 % | −1,4 |
| Shinobi aus Iga | Musashi | 2 | Gewöhnlich | – | – | – | – | 1280 | 51,0 % | 54,5 % | +3,1 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 20596 | 51,4 % | 48,8 % | −1,1 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 15566 | 53,5 % | 52,4 % | +2,4 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 20698 | 56,5 % | 52,4 % | +2,4 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 21654 | 50,1 % | 52,4 % | +2,4 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 21688 | 55,5 % | 50,3 % | +0,4 |
| Ruderer der Triere | Perikles | 1 | Basis | 3400 | 78,7 % | 50,6 % | +1,9 | 878 | 57,4 % | 55,8 % | +6,4 |
| Lange Mauern | Perikles | 2 | Basis | 3400 | 77,4 % | 44,5 % | −4,2 | 1182 | 55,9 % | 44,8 % | −4,6 |
| Rede auf die Gefallenen | Perikles | 3 | Basis | 3400 | 78,7 % | 52,5 % | +3,8 | 1208 | 54,5 % | 54,1 % | +4,7 |
| Strategos | Perikles | 3 | Basis | 3400 | 77,1 % | 51,3 % | +2,6 | 1248 | 57,1 % | 54,8 % | +5,4 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1256 | 47,0 % | 45,1 % | −4,3 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1254 | 58,7 % | 55,5 % | +6,1 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1158 | 52,8 % | 57,1 % | +7,7 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1200 | 38,3 % | 52,9 % | +3,5 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1136 | 35,5 % | 43,8 % | −5,5 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 1806 | 52,7 % | 50,0 % | +0,7 |
| Pilumwerfer | Agrippa | 1 | Basis | 3400 | 76,7 % | 52,4 % | +4,1 | 1036 | 56,0 % | 54,7 % | +5,0 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 3400 | 73,2 % | 50,7 % | +2,4 | 1442 | 46,7 % | 53,0 % | +3,3 |
| Castra | Agrippa | 3 | Basis | 3400 | 81,9 % | 49,4 % | +1,1 | 1406 | 61,2 % | 50,5 % | +0,8 |
| Testudo | Agrippa | 2 | Basis | 3400 | 73,1 % | 50,7 % | +2,4 | 1376 | 49,8 % | 53,7 % | +4,1 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1350 | 49,8 % | 47,8 % | −1,9 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1326 | 52,3 % | 54,5 % | +4,9 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1550 | 51,5 % | 54,2 % | +4,6 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1416 | 52,1 % | 47,6 % | −2,0 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1296 | 39,7 % | 48,0 % | −1,7 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1590 | 42,9 % | 51,0 % | +1,3 |
| Bogenschütze von Ta-Seti | Amanirenas | 1 | Basis | 3400 | 81,9 % | 49,5 % | +0,3 | 1042 | 58,5 % | 50,7 % | +1,3 |
| Wüstenreiter | Amanirenas | 2 | Basis | 3400 | 80,8 % | 48,4 % | −0,7 | 1328 | 57,8 % | 46,8 % | −2,6 |
| Pfeilregen von Kusch | Amanirenas | 2 | Basis | 3400 | 77,8 % | 50,1 % | +1,0 | 1446 | 45,0 % | 50,8 % | +1,4 |
| Speerträger von Napata | Amanirenas | 3 | Basis | 3400 | 82,3 % | 50,2 % | +1,0 | 1426 | 54,6 % | 49,6 % | +0,2 |
| Wächter des Löwentempels | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1366 | 53,7 % | 53,1 % | +3,7 |
| Kundschafter aus Meroë | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1398 | 56,0 % | 50,6 % | +1,2 |
| Kriegselefant von Kusch | Amanirenas | 6 | Selten | – | – | – | – | 1882 | 54,8 % | 50,9 % | +1,5 |
| Überfall auf Syene | Amanirenas | 3 | Selten | – | – | – | – | 1514 | 56,2 % | 46,3 % | −3,1 |
| Akinidad, Prinz von Kusch | Amanirenas | 5 | Episch | – | – | – | – | 1506 | 55,4 % | 45,7 % | −3,6 |
| Bronzekopf des Augustus | Amanirenas | 6 | Legendär | – | – | – | – | 1774 | 45,8 % | 51,4 % | +2,0 |
| Kopistin der Chronik | Anna | 1 | Basis | 3400 | 80,8 % | 52,4 % | +3,1 | 1010 | 53,6 % | 51,6 % | +3,2 |
| Pantokrator-Spital | Anna | 3 | Basis | 3400 | 70,7 % | 50,2 % | +0,9 | 1456 | 29,5 % | 45,6 % | −2,8 |
| Warägergardist | Anna | 3 | Basis | 3400 | 81,8 % | 53,5 % | +4,2 | 1476 | 54,7 % | 54,1 % | +5,7 |
| Hofärztin | Anna | 3 | Basis | 3400 | 80,1 % | 49,0 % | −0,3 | 1422 | 43,2 % | 45,7 % | −2,7 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1284 | 48,0 % | 55,3 % | +6,9 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1234 | 45,4 % | 53,7 % | +5,3 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1408 | 45,5 % | 56,5 % | +8,1 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1468 | 35,1 % | 49,4 % | +1,0 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1478 | 46,3 % | 49,9 % | +1,6 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 1784 | 46,8 % | 46,3 % | −2,1 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 3400 | 82,0 % | 51,5 % | +0,3 | 992 | 53,7 % | 52,3 % | +2,9 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 3400 | 80,3 % | 51,8 % | +0,6 | 1268 | 53,1 % | 49,7 % | +0,4 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 3400 | 82,3 % | 51,4 % | +0,1 | 1314 | 58,2 % | 50,7 % | +1,3 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 3400 | 81,5 % | 49,9 % | −1,3 | 1464 | 60,0 % | 48,5 % | −0,8 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1338 | 55,1 % | 45,8 % | −3,5 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1276 | 53,9 % | 50,3 % | +0,9 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1314 | 54,1 % | 50,0 % | +0,7 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1340 | 54,7 % | 40,9 % | −8,4 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 1978 | 57,3 % | 59,1 % | +9,8 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 1568 | 46,7 % | 44,2 % | −5,1 |
| Gokenin aus Sagami | Masako | 1 | Basis | 3400 | 80,3 % | 49,4 % | −1,9 | 820 | 57,3 % | 52,4 % | +1,6 |
| Bogenreiter aus Kamakura | Masako | 2 | Basis | 3400 | 81,3 % | 50,1 % | −1,1 | 1112 | 57,4 % | 52,8 % | +2,0 |
| Treueschwur | Masako | 1 | Basis | 3400 | 80,1 % | 53,3 % | +2,0 | 840 | 52,0 % | 56,4 % | +5,6 |
| Nonne von Kamakura | Masako | 2 | Basis | 3400 | 81,6 % | 49,4 % | −1,9 | 1208 | 59,1 % | 53,9 % | +3,1 |
| Rokuhara-Späher | Masako | 2 | Gewöhnlich | – | – | – | – | 1144 | 57,2 % | 53,4 % | +2,6 |
| Aufgebot von Jōkyū | Masako | 4 | Gewöhnlich | – | – | – | – | 1288 | 56,3 % | 54,3 % | +3,5 |
| Tsurugaoka Hachiman-gū | Masako | 2 | Selten | – | – | – | – | 1198 | 54,8 % | 49,7 % | −1,1 |
| Verbannung nach Oki | Masako | 3 | Selten | – | – | – | – | 1312 | 50,0 % | 48,6 % | −2,2 |
| Hōjō Yoshitoki, Regent | Masako | 5 | Episch | – | – | – | – | 1440 | 54,2 % | 53,6 % | +2,8 |
| Minamoto no Yoritomo | Masako | 6 | Legendär | – | – | – | – | 1900 | 51,6 % | 52,7 % | +1,9 |
| Spartiat der Dreihundert | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1308 | 55,3 % | 50,9 % | +0,9 |
| Engpass der Thermopylen | Leonidas | 3 | Selten | – | – | – | – | 1228 | 53,1 % | 46,6 % | −3,5 |
| Astronomin des Museions | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1216 | 54,9 % | 46,8 % | −1,0 |
| Kommentar zu Diophant | Hypatia | 2 | Selten | – | – | – | – | 1226 | 52,6 % | 51,5 % | +3,6 |
| Priesterin der Sachmet | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1436 | 59,3 % | 49,1 % | +1,1 |
| Ka-Statue | Imhotep | 2 | Selten | – | – | – | – | 1340 | 61,5 % | 44,5 % | −3,4 |
| Galeerenschmied | Dandolo | 2 | Gewöhnlich | – | – | – | – | 1222 | 47,2 % | 48,5 % | −3,2 |
| Plünderung Konstantinopels | Dandolo | 6 | Selten | – | – | – | – | 1774 | 44,7 % | 53,3 % | +1,5 |
| Jurtenlager | Khan | 3 | Gewöhnlich | – | – | – | – | 1430 | 34,9 % | 41,1 % | −8,0 |
| Kurultai | Khan | 4 | Selten | – | – | – | – | 1296 | 30,9 % | 46,7 % | −2,3 |
| Barde der Icener | Boudicca | 2 | Gewöhnlich | – | – | – | – | 1268 | 55,1 % | 54,3 % | +1,5 |
| Sichelwagen | Boudicca | 5 | Selten | – | – | – | – | 1402 | 48,2 % | 54,3 % | +1,5 |
| Almanach der Quatrains | Nostradamus | 1 | Gewöhnlich | – | – | – | – | 972 | 57,7 % | 53,1 % | +3,0 |
| Horoskop der Königin | Nostradamus | 3 | Selten | – | – | – | – | 1448 | 2,2 % | 47,4 % | −2,7 |
| Pilgerin aus Domrémy | Jeanne | 1 | Gewöhnlich | – | – | – | – | 978 | 52,5 % | 56,9 % | +7,1 |
| Die Weihe von Reims | Jeanne | 4 | Selten | – | – | – | – | 1214 | 32,0 % | 49,7 % | −0,1 |
| Runenmeisterin | Ragnar | 2 | Gewöhnlich | – | – | – | – | 1160 | 52,1 % | 57,5 % | +5,3 |
| Berserkergang | Ragnar | 1 | Selten | – | – | – | – | 946 | 60,0 % | 49,9 % | −2,3 |
| Schwertschüler aus Kokura | Musashi | 4 | Selten | – | – | – | – | 1146 | 44,2 % | 48,9 % | −2,5 |
| Niten Ichi-ryū | Musashi | 2 | Gewöhnlich | – | – | – | – | 1202 | 48,8 % | 48,9 % | −2,6 |
| Steinmetz vom Pentelikon | Perikles | 2 | Gewöhnlich | – | – | – | – | 1194 | 49,8 % | 54,9 % | +5,5 |
| Schatz des Seebunds | Perikles | 3 | Selten | – | – | – | – | 1232 | 28,0 % | 48,8 % | −0,6 |
| Aquilifer | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1372 | 45,7 % | 49,1 % | −0,6 |
| Harpax | Agrippa | 4 | Selten | – | – | – | – | 1292 | 40,2 % | 52,5 % | +2,8 |
| Pfeilmacher aus Meroë | Amanirenas | 2 | Gewöhnlich | – | – | – | – | 1360 | 56,5 % | 49,5 % | +0,1 |
| Gift der Wüstenviper | Amanirenas | 3 | Selten | – | – | – | – | 1410 | 44,8 % | 54,2 % | +4,8 |
| Spitalarzt des Pantokrator | Anna | 2 | Gewöhnlich | – | – | – | – | 1460 | 53,3 % | 49,3 % | +0,9 |
| Chronist am Kaiserhof | Anna | 6 | Selten | – | – | – | – | 1742 | 58,6 % | 55,5 % | +7,1 |
| Dichter von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1346 | 56,8 % | 48,5 % | −0,8 |
| Chinampa | Nezahualcóyotl | 2 | Selten | – | – | – | – | 1304 | 51,2 % | 47,7 % | −1,6 |
| Jitō-Verwalter | Masako | 2 | Gewöhnlich | – | – | – | – | 1196 | 56,0 % | 52,1 % | +1,3 |
| Siegel des Shikken | Masako | 2 | Selten | – | – | – | – | 1164 | 46,5 % | 49,8 % | −1,0 |
| Olympionike | Griechische Antike | 4 | Gewöhnlich | – | – | – | – | 3612 | 52,8 % | 56,2 % | +7,1 |
| Rhapsode | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 3528 | 53,1 % | 50,9 % | +1,8 |
| Marathonläufer | Griechische Antike | 2 | Gewöhnlich | – | – | – | – | 3574 | 52,7 % | 51,4 % | +2,2 |
| Orakel von Delphi | Griechische Antike | 3 | Selten | – | – | – | – | 3980 | 30,8 % | 48,6 % | −0,5 |
| Leuchtturm von Pharos | Griechische Antike | 3 | Selten | – | – | – | – | 3908 | 54,2 % | 41,7 % | −7,4 |
| Akropolis | Griechische Antike | 2 | Selten | – | – | – | – | 3530 | 55,0 % | 49,6 % | +0,4 |
| Bibliothek von Alexandria | Griechische Antike | 3 | Episch | – | – | – | – | 3876 | 49,7 % | 48,0 % | −1,2 |
| Knappe | Europäisches Mittelalter | 1 | Gewöhnlich | – | – | – | – | 3714 | 54,3 % | 53,0 % | +1,3 |
| Armbrustschütze | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 5218 | 58,0 % | 56,0 % | +4,4 |
| Mönch von Cluny | Europäisches Mittelalter | 3 | Gewöhnlich | – | – | – | – | 5158 | 50,6 % | 54,7 % | +3,0 |
| Hansekogge | Europäisches Mittelalter | 4 | Gewöhnlich | – | – | – | – | 4744 | 46,6 % | 50,0 % | −1,6 |
| Turnierritter | Europäisches Mittelalter | 4 | Selten | – | – | – | – | 4816 | 50,7 % | 54,6 % | +3,0 |
| Burgfried | Europäisches Mittelalter | 2 | Selten | – | – | – | – | 5054 | 56,8 % | 44,3 % | −7,4 |
| Tribok | Europäisches Mittelalter | 4 | Episch | – | – | – | – | 4706 | 31,3 % | 48,9 % | −2,7 |
| Ashigaru | China, Korea, Japan | 1 | Gewöhnlich | – | – | – | – | 1708 | 53,9 % | 56,1 % | +5,0 |
| Mandarin-Gelehrter | China, Korea, Japan | 3 | Gewöhnlich | – | – | – | – | 2642 | 51,7 % | 53,2 % | +2,1 |
| Teezeremonie | China, Korea, Japan | 2 | Gewöhnlich | – | – | – | – | 2410 | 43,2 % | 48,4 % | −2,7 |
| Hwacha-Salve | China, Korea, Japan | 3 | Selten | – | – | – | – | 2624 | 56,1 % | 51,7 % | +0,6 |
| Schildkrötenschiff | China, Korea, Japan | 5 | Selten | – | – | – | – | 2792 | 52,4 % | 51,0 % | −0,1 |
| Terrakotta-Armee | China, Korea, Japan | 5 | Episch | – | – | – | – | 2818 | 54,0 % | 50,0 % | −1,0 |
| Große Mauer | China, Korea, Japan | 2 | Episch | – | – | – | – | 2388 | 60,2 % | 43,3 % | −7,8 |
| Kolosseum | neutral | 3 | Selten | – | – | – | – | 21800 | 32,8 % | 44,5 % | −5,5 |
| Hängende Gärten | neutral | 2 | Selten | – | – | – | – | 20730 | 56,3 % | 45,6 % | −4,4 |
| Pyramiden von Gizeh | neutral | 4 | Episch | – | – | – | – | 20186 | 27,2 % | 43,9 % | −6,0 |
