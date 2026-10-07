# Balance-Bericht

Erzeugt mit `node werkzeuge/balance.js` (AP 5.1). KI gegen KI, jede Paarung 200 Partien, je zur Hälfte mit jedem Helden als Beginner; Startwert 20261006, Regelstand `f761b1a50a` (Prüfsumme von `data.js` und `engine.js`). Gleicher Startwert und Regelstand ergeben genau diesen Bericht.

Beide Seiten tauschen beim Start Karten ab 4 Mana. Unentschieden zählen halb. „Gegen das Feld“ ist der Mittelwert der Siegquoten gegen die neun anderen Helden (Spiegelduelle zählen nicht). Zufallsfehler (95 %): je Paarung etwa ±6,9 Prozentpunkte, gegen das Feld etwa ±1,8.

**Ziele (AP 5.2):** jeder Held 47,0 % bis 53,0 % gegen das Feld, keine Paarung schlechter als 40/60, Vorteil des Beginners ≤ 55,0 %. **AP 5.3:** Legendäre als Gruppe ≤ 55,0 % „gewinnt, wenn gezogen“ (nur Zufallsdecks – Startdecks enthalten keine).

| Deckart | Partien | Helden 47–53 % | Paarungen ≥ 40/60 | Beginner gewinnt | Legendäre, wenn gezogen | Unentschieden | Züge je Partie (Median) |
|---|---|---|---|---|---|---|---|
| Startdecks | 27200 | ✓ 16/16 | ✗ 117/120 | ✓ 45,7 % | – | 0 | 23 |
| Zufallsdecks | 27200 | ✓ 16/16 | ✗ 118/120 | ✓ 49,8 % | ✓ 52,6 % (+2,6) | 0 | 20 |

## Startdecks

Jeder Held spielt sein Basisdeck (`E.starter`: 4 Heldenkarten und 11 neutrale Karten je zweimal) – das Deck, mit dem jedes Profil beginnt.

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | Ziel |
|---|---|---|---|---|---|---|
| Hypatia | **51,7 %** | 46,1 % | 56,9 % | Imhotep 44,5 % | Masako 63,0 % | ✓ |
| Imhotep | **51,5 %** | 48,5 % | 54,2 % | Anna 45,5 % | Musashi 57,5 % | ✓ |
| Amanirenas | **51,5 %** | 49,2 % | 53,5 % | Leonidas 37,0 % | Jeanne 74,0 % | ✓ |
| Ragnar Lodbrok | **51,0 %** | 46,2 % | 55,5 % | Jeanne 44,5 % | Nezahualcóyotl 57,5 % | ✓ |
| Nostradamus | **50,9 %** | 50,4 % | 51,2 % | Khan 40,0 % | Boudicca 60,0 % | ✓ |
| Leonidas I. | **50,9 %** | 49,8 % | 51,8 % | Dandolo 45,5 % | Amanirenas 63,0 % | ✓ |
| Hōjō Masako | **50,6 %** | 43,9 % | 57,2 % | Hypatia 37,0 % | Khan 57,5 % | ✓ |
| Anna Komnene | **49,8 %** | 49,2 % | 50,5 % | Khan 43,5 % | Hypatia 55,5 % | ✓ |
| Dschingis Khan | **49,8 %** | 45,1 % | 54,5 % | Hypatia 41,0 % | Nostradamus 60,0 % | ✓ |
| Perikles | **49,6 %** | 43,5 % | 55,7 % | Jeanne 43,5 % | Agrippa 58,0 % | ✓ |
| Nezahualcóyotl | **49,3 %** | 45,6 % | 53,2 % | Leonidas 42,5 % | Amanirenas 57,5 % | ✓ |
| Enrico Dandolo | **49,2 %** | 45,5 % | 53,1 % | Musashi 43,5 % | Leonidas 54,5 % | ✓ |
| Miyamoto Musashi | **49,1 %** | 43,9 % | 54,5 % | Jeanne 40,5 % | Dandolo 56,5 % | ✓ |
| Jeanne d’Arc | **49,0 %** | 42,5 % | 55,7 % | Amanirenas 26,0 % | Musashi 59,5 % | ✓ |
| Boudicca | **48,5 %** | 41,2 % | 56,1 % | Nostradamus 40,0 % | Musashi 56,5 % | ✓ |
| Marcus Agrippa | **47,6 %** | 41,0 % | 54,8 % | Amanirenas 40,0 % | Boudicca 55,0 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 51 | 51 | 46 | 47 | 53 | 53 | 51 | 47 | 49 | 48 | 51 | **63** | 53 | 57 | 47 |
| Hypatia | 50 | · | 45 | 49 | 59 | 53 | 49 | 59 | 53 | 46 | 55 | 48 | 53 | 45 | 51 | **63** |
| Imhotep | 50 | 55 | · | 52 | 55 | 56 | 46 | 50 | 48 | 57 | 50 | 48 | 55 | 46 | 55 | 52 |
| Dandolo | 54 | 51 | 48 | · | 46 | 47 | 46 | 51 | 49 | 44 | 49 | 54 | 51 | 52 | 47 | 52 |
| Khan | 53 | 41 | 45 | 54 | · | 45 | 60 | 48 | 51 | 49 | 52 | 59 | 43 | 56 | 49 | 43 |
| Boudicca | 48 | 47 | 44 | 53 | 55 | · | 40 | 55 | 47 | 56 | 49 | 45 | 45 | 48 | 47 | 49 |
| Nostradamus | 48 | 51 | 54 | 54 | 40 | 60 | · | 51 | 46 | 52 | 50 | 56 | 51 | 47 | 55 | 50 |
| Jeanne | 50 | 42 | 51 | 49 | 52 | 45 | 49 | · | 56 | 60 | 56 | 53 | **26** | 52 | 51 | 46 |
| Ragnar | 53 | 47 | 52 | 51 | 49 | 53 | 54 | 44 | · | 49 | 52 | 47 | 48 | 55 | 57 | 53 |
| Musashi | 51 | 54 | 43 | 56 | 52 | 44 | 48 | 41 | 52 | · | 53 | 54 | 41 | 49 | 52 | 49 |
| Perikles | 52 | 45 | 51 | 51 | 49 | 51 | 50 | 44 | 49 | 47 | · | 58 | 50 | 52 | 50 | 47 |
| Agrippa | 50 | 52 | 52 | 47 | 42 | 55 | 44 | 48 | 53 | 46 | 42 | · | 40 | 49 | 47 | 50 |
| Amanirenas | **37** | 47 | 45 | 50 | 57 | 55 | 49 | **74** | 52 | 59 | 51 | 60 | · | 45 | 43 | 49 |
| Anna | 48 | 55 | 54 | 49 | 44 | 52 | 53 | 48 | 45 | 51 | 48 | 51 | 55 | · | 44 | 51 |
| Nezahualcóyotl | 43 | 49 | 45 | 53 | 52 | 53 | 45 | 50 | 43 | 48 | 50 | 53 | 57 | 56 | · | 43 |
| Masako | 53 | **37** | 48 | 49 | 57 | 51 | 50 | 54 | 47 | 51 | 53 | 51 | 51 | 50 | 57 | · |

**Partielänge** (Züge beider Seiten zusammen): Mittel 24,5, Median 23, 10–90 %: 17–33, kürzeste 9, längste 65. Beginner gewinnt 45,7 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Belagerungsturm | neutral | 6 | 55,6 % | +5,6 | 75,8 % |
| Goldener Reiter | Khan | 4 | 55,4 % | +5,6 | 71,4 % |
| Rede auf die Gefallenen | Perikles | 2 | 54,1 % | +4,5 | 79,8 % |
| Warägergardist | Anna | 3 | 53,9 % | +4,1 | 82,5 % |
| Sternenregen | Hypatia | 4 | 54,6 % | +3,1 | 78,1 % |
| Pilumwerfer | Agrippa | 1 | 50,8 % | +2,9 | 77,8 % |
| Tintenlehrling | Nostradamus | 1 | 53,7 % | +2,9 | 84,9 % |
| Handelsgesandter | Dandolo | 4 | 52,2 % | +2,8 | 77,9 % |
| Hainwächterin | Boudicca | 1 | 47,1 % | −1,5 | 83,3 % |
| Bibliothekslehrling | Hypatia | 1 | 49,7 % | −1,8 | 83,9 % |
| Reiterbogenschütze | Khan | 2 | 48,0 % | −1,8 | 77,4 % |
| Pfeilschuss | Khan | 2 | 47,8 % | −2,0 | 77,1 % |
| Nonne von Kamakura | Masako | 2 | 48,5 % | −2,0 | 81,0 % |
| Eichenhaut | Boudicca | 2 | 46,5 % | −2,1 | 75,9 % |
| Gokenin aus Sagami | Masako | 1 | 48,2 % | −2,3 | 79,8 % |
| Lange Mauern | Perikles | 2 | 44,9 % | −4,7 | 76,9 % |

## Zufallsdecks

Jede Partie mit neu gemischten Zufallsdecks (`E.randomDeck`, wie die KI im freien Duell und das Tagesduell).

| Held | gegen das Feld | als Beginner | als Zweiter | schwerste Paarung | leichteste Paarung | Ziel |
|---|---|---|---|---|---|---|
| Nostradamus | **52,8 %** | 53,5 % | 51,4 % | Musashi 49,0 % | Agrippa 58,0 % | ✓ |
| Dschingis Khan | **52,0 %** | 50,6 % | 52,9 % | Perikles 47,0 % | Anna 62,0 % | ✓ |
| Amanirenas | **51,4 %** | 52,1 % | 50,4 % | Leonidas 41,0 % | Boudicca 57,0 % | ✓ |
| Leonidas I. | **50,9 %** | 50,8 % | 50,7 % | Musashi 46,0 % | Amanirenas 59,0 % | ✓ |
| Enrico Dandolo | **50,9 %** | 52,0 % | 49,5 % | Nostradamus 45,0 % | Nezahualcóyotl 61,0 % | ✓ |
| Miyamoto Musashi | **50,9 %** | 49,8 % | 51,8 % | Perikles 45,0 % | Jeanne 55,5 % | ✓ |
| Ragnar Lodbrok | **50,7 %** | 50,6 % | 50,6 % | Nostradamus 47,0 % | Agrippa 55,0 % | ✓ |
| Hypatia | **50,2 %** | 49,2 % | 51,1 % | Musashi 45,0 % | Jeanne 57,5 % | ✓ |
| Perikles | **50,1 %** | 50,1 % | 50,0 % | Nezahualcóyotl 42,5 % | Musashi 55,0 % | ✓ |
| Boudicca | **49,2 %** | 48,5 % | 50,1 % | Amanirenas 43,0 % | Nezahualcóyotl 55,5 % | ✓ |
| Jeanne d’Arc | **49,1 %** | 47,4 % | 51,0 % | Hypatia 42,5 % | Imhotep 54,0 % | ✓ |
| Hōjō Masako | **48,9 %** | 47,0 % | 51,1 % | Nostradamus 43,5 % | Imhotep 55,0 % | ✓ |
| Imhotep | **48,6 %** | 48,7 % | 48,8 % | Amanirenas 45,0 % | Nezahualcóyotl 56,5 % | ✓ |
| Nezahualcóyotl | **48,6 %** | 50,5 % | 46,9 % | Dandolo 39,0 % | Perikles 57,5 % | ✓ |
| Anna Komnene | **48,2 %** | 47,8 % | 49,1 % | Khan 38,0 % | Nezahualcóyotl 56,5 % | ✓ |
| Marcus Agrippa | **47,6 %** | 48,4 % | 47,5 % | Dandolo 42,0 % | Jeanne 55,0 % | ✓ |

**Siegquoten-Matrix** (Zeile gegen Spalte, in %; fett = außerhalb 40–60):

| | Leon. | Hypa. | Imho. | Dand. | Khan. | Boud. | Nost. | Jean. | Ragn. | Musa. | Peri. | Agri. | Aman. | Anna. | Neza. | Masa. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Leonidas | · | 48 | 54 | 52 | 47 | 54 | 50 | 47 | 52 | 46 | 51 | 55 | 59 | 53 | 47 | 52 |
| Hypatia | 53 | · | 51 | 51 | 48 | 49 | 47 | 57 | 46 | 45 | 46 | 54 | 48 | 56 | 52 | 52 |
| Imhotep | 47 | 49 | · | 53 | 49 | 47 | 47 | 46 | 50 | 48 | 52 | 46 | 45 | 52 | 56 | 45 |
| Dandolo | 48 | 50 | 48 | · | 46 | 50 | 45 | 55 | 49 | 54 | 51 | 58 | 48 | 52 | **61** | 52 |
| Khan | 53 | 52 | 51 | 54 | · | 53 | 48 | 52 | 48 | 54 | 47 | 57 | 48 | **62** | 51 | 52 |
| Boudicca | 47 | 52 | 53 | 51 | 48 | · | 49 | 47 | 46 | 51 | 46 | 54 | 43 | 47 | 56 | 53 |
| Nostradamus | 51 | 53 | 53 | 55 | 52 | 52 | · | 51 | 53 | 49 | 52 | 58 | 50 | 56 | 52 | 56 |
| Jeanne | 53 | 43 | 54 | 45 | 49 | 53 | 50 | · | 51 | 45 | 53 | 45 | 45 | 53 | 50 | 50 |
| Ragnar | 48 | 54 | 51 | 52 | 53 | 54 | 47 | 50 | · | 52 | 50 | 55 | 47 | 47 | 48 | 55 |
| Musashi | 54 | 55 | 52 | 47 | 46 | 50 | 51 | 55 | 48 | · | 45 | 52 | 53 | 52 | 53 | 52 |
| Perikles | 50 | 54 | 49 | 50 | 53 | 54 | 48 | 47 | 51 | 55 | · | 52 | 48 | 50 | 43 | 51 |
| Agrippa | 45 | 46 | 54 | 42 | 43 | 47 | 42 | 55 | 45 | 48 | 49 | · | 45 | 52 | 51 | 52 |
| Amanirenas | 41 | 52 | 55 | 53 | 53 | 57 | 50 | 55 | 53 | 48 | 53 | 55 | · | 49 | 46 | 53 |
| Anna | 48 | 44 | 49 | 48 | **38** | 53 | 44 | 47 | 53 | 48 | 50 | 48 | 52 | · | 56 | 45 |
| Nezahualcóyotl | 53 | 48 | 44 | **39** | 49 | 44 | 49 | 51 | 52 | 48 | 57 | 50 | 54 | 44 | · | 49 |
| Masako | 48 | 48 | 55 | 48 | 48 | 47 | 44 | 51 | 45 | 49 | 50 | 49 | 48 | 55 | 52 | · |

**Partielänge** (Züge beider Seiten zusammen): Mittel 21,0, Median 20, 10–90 %: 15–28, kürzeste 8, längste 58. Beginner gewinnt 49,8 %, Unentschieden (Zuglimit 120): 0.

**Auffällige Karten** – „gewinnt, wenn gezogen“ im Vergleich zur Siegquote des eigenen Helden (Δ in Prozentpunkten):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Wächter des Weltenbaums | neutral | 8 | 61,7 % | +11,7 | 43,3 % |
| Kataphrakt | Anna | 5 | 60,1 % | +11,7 | 49,7 % |
| Griechisches Feuer | Anna | 4 | 58,4 % | +10,0 | 49,2 % |
| Phalanxveteran | Leonidas | 5 | 60,0 % | +9,3 | 52,4 % |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | 57,8 % | +9,0 | 56,8 % |
| Die Fahne erheben | Jeanne | 2 | 57,6 % | +8,4 | 54,7 % |
| Bauernrekrut | Jeanne | 1 | 56,9 % | +7,7 | 57,3 % |
| Pestdoktor | Nostradamus | 4 | 59,9 % | +7,5 | 52,9 % |
| Pantheon | Agrippa | 4 | 43,7 % | −4,2 | 50,8 % |
| Thermen des Agrippa | Agrippa | 2 | 43,6 % | −4,3 | 56,0 % |
| Pnyx | Perikles | 3 | 45,5 % | −4,6 | 51,6 % |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | 42,9 % | −5,8 | 50,1 % |
| Feldration | neutral | 2 | 44,1 % | −5,9 | 26,5 % |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | 42,3 % | −6,4 | 56,9 % |
| Lange Mauern | Perikles | 2 | 43,0 % | −7,0 | 56,8 % |
| Odeion | Perikles | 4 | 42,7 % | −7,4 | 44,8 % |

**Legendäre** (AP 5.3) – als Gruppe 52,6 % „gewinnt, wenn gezogen“ (+2,6 gegenüber ihrem Helden, 34190 Partien):

| Karte | Held | Mana | gewinnt, wenn gezogen | Δ | gespielt |
|---|---|---:|---:|---:|---:|
| Subutai, der Stratege | Khan | 6 | 57,4 % | +5,6 | 43,5 % |
| Caterina de’ Medici | Nostradamus | 5 | 56,4 % | +4,0 | 49,6 % |
| Zenobia, Rebellin von Palmyra | neutral | 8 | 55,4 % | +5,4 | 41,6 % |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | 55,2 % | +4,4 | 39,4 % |
| Lagertha, Schildmaid | Ragnar | 7 | 54,8 % | +4,2 | 46,4 % |
| Gorgo, Stimme Spartas | Leonidas | 7 | 54,4 % | +3,6 | 46,5 % |
| Bronzekopf des Augustus | Amanirenas | 6 | 54,1 % | +2,9 | 45,9 % |
| Phidias, Meister der Akropolis | Perikles | 7 | 53,8 % | +3,8 | 47,2 % |
| Theon von Alexandria | Hypatia | 5 | 53,7 % | +3,5 | 48,6 % |
| Sasaki Kojirō, der Rivale | Musashi | 6 | 52,9 % | +2,2 | 43,7 % |
| Herodot, Vater der Geschichte | neutral | 4 | 51,1 % | +1,1 | 41,5 % |
| Andraste, Göttin des Sieges | Boudicca | 8 | 50,8 % | +1,5 | 45,2 % |
| Minamoto no Yoritomo | Masako | 6 | 50,1 % | +1,0 | 47,0 % |
| Djoser, der Erbauer | Imhotep | 6 | 49,9 % | +1,1 | 50,7 % |
| La Hire, der Unbeugsame | Jeanne | 7 | 49,4 % | +0,2 | 39,3 % |
| Vitruv, Baumeister Roms | Agrippa | 5 | 47,6 % | −0,3 | 40,7 % |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | 46,6 % | −2,2 | 43,1 % |
| Alexios I. Komnenos | Anna | 6 | 46,1 % | −2,3 | 45,0 % |

## Alle Karten

„im Deck“ = Partien, in denen die Karte im Deck lag; „gespielt“ = Anteil dieser Partien, in denen sie ausgespielt wurde; „gewinnt, wenn gezogen“ = Siegquote der Partien, in denen sie auf die Hand kam (nach dem Kartentausch); Δ wie oben.

| Karte | Held | Mana | Seltenheit | Startdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ | Zufallsdecks: im Deck | gespielt | gewinnt, wenn gezogen | Δ |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Spartanischer Rekrut | Leonidas | 1 | Basis | 3400 | 80,0 % | 51,7 % | +1,0 | 1154 | 54,0 % | 54,0 % | +3,3 |
| Wächter der Thermopylen | Leonidas | 2 | Basis | 3400 | 80,6 % | 51,5 % | +0,8 | 1498 | 57,3 % | 49,7 % | −1,0 |
| Bronzener Wall | Leonidas | 2 | Basis | 3400 | 80,0 % | 52,5 % | +1,7 | 1604 | 53,4 % | 49,7 % | −1,0 |
| Hoplitenhauptmann | Leonidas | 4 | Basis | 3400 | 76,4 % | 52,7 % | +2,0 | 1422 | 48,6 % | 50,5 % | −0,3 |
| Speerträger | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1632 | 55,6 % | 49,9 % | −0,9 |
| Schildstoß | Leonidas | 3 | Gewöhnlich | – | – | – | – | 1550 | 55,4 % | 50,8 % | +0,1 |
| Phalanxveteran | Leonidas | 5 | Selten | – | – | – | – | 1576 | 52,4 % | 60,0 % | +9,3 |
| Spartas Erbe | Leonidas | 4 | Selten | – | – | – | – | 1452 | 41,9 % | 49,2 % | −1,6 |
| Dienekes | Leonidas | 6 | Episch | – | – | – | – | 1810 | 51,2 % | 47,6 % | −3,2 |
| Gorgo, Stimme Spartas | Leonidas | 7 | Legendär | – | – | – | – | 1556 | 46,5 % | 54,4 % | +3,6 |
| Bibliothekslehrling | Hypatia | 1 | Basis | 3400 | 83,9 % | 49,7 % | −1,8 | 1124 | 53,7 % | 49,5 % | −0,6 |
| Himmelsstrahl | Hypatia | 2 | Basis | 3400 | 86,4 % | 51,3 % | −0,2 | 1628 | 58,2 % | 52,9 % | +2,7 |
| Sternenkundiger | Hypatia | 3 | Basis | 3400 | 81,5 % | 53,1 % | +1,6 | 1634 | 45,4 % | 50,2 % | +0,0 |
| Sternenregen | Hypatia | 4 | Basis | 3400 | 78,1 % | 54,6 % | +3,1 | 1392 | 45,1 % | 55,8 % | +5,7 |
| Astrolabienwächter | Hypatia | 3 | Gewöhnlich | – | – | – | – | 1554 | 59,7 % | 55,0 % | +4,8 |
| Lehrsatz | Hypatia | 2 | Gewöhnlich | – | – | – | – | 1510 | 40,0 % | 48,3 % | −1,9 |
| Museionshüterin | Hypatia | 5 | Selten | – | – | – | – | 1488 | 47,5 % | 53,8 % | +3,6 |
| Sonnenfokus | Hypatia | 6 | Selten | – | – | – | – | 1922 | 51,5 % | 49,5 % | −0,7 |
| Sternenorakel | Hypatia | 5 | Episch | – | – | – | – | 1546 | 52,3 % | 50,4 % | +0,2 |
| Theon von Alexandria | Hypatia | 5 | Legendär | – | – | – | – | 1614 | 48,6 % | 53,7 % | +3,5 |
| Nilschülerin | Imhotep | 1 | Basis | 3400 | 82,2 % | 51,9 % | +0,5 | 1136 | 54,4 % | 49,1 % | +0,3 |
| Heilender Balsam | Imhotep | 1 | Basis | 3400 | 82,8 % | 52,9 % | +1,6 | 1062 | 56,9 % | 51,7 % | +3,0 |
| Pyramidenwächter | Imhotep | 3 | Basis | 3400 | 84,4 % | 52,0 % | +0,7 | 1572 | 56,4 % | 51,0 % | +2,2 |
| Tempelärztin | Imhotep | 4 | Basis | 3400 | 80,8 % | 51,6 % | +0,2 | 1472 | 49,8 % | 46,9 % | −1,9 |
| Sonnensegen | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1550 | 51,2 % | 48,2 % | −0,6 |
| Balsamierer | Imhotep | 3 | Gewöhnlich | – | – | – | – | 1530 | 58,2 % | 51,9 % | +3,1 |
| Nilschwemme | Imhotep | 3 | Selten | – | – | – | – | 1520 | 47,5 % | 46,0 % | −2,8 |
| Goldener Skarabäus | Imhotep | 5 | Selten | – | – | – | – | 1604 | 54,4 % | 55,7 % | +6,9 |
| Urteil der Sonne | Imhotep | 5 | Episch | – | – | – | – | 1592 | 54,5 % | 48,1 % | −0,7 |
| Djoser, der Erbauer | Imhotep | 6 | Legendär | – | – | – | – | 1898 | 50,7 % | 49,9 % | +1,1 |
| Lagunenbote | Dandolo | 1 | Basis | 3400 | 78,6 % | 51,8 % | +2,5 | 1084 | 52,3 % | 55,6 % | +4,8 |
| Arsenalarbeiter | Dandolo | 2 | Basis | 3400 | 80,1 % | 48,7 % | −0,6 | 1448 | 49,0 % | 52,4 % | +1,7 |
| Präziser Stich | Dandolo | 2 | Basis | 3400 | 84,1 % | 50,3 % | +0,9 | 1536 | 51,8 % | 52,7 % | +2,0 |
| Handelsgesandter | Dandolo | 4 | Basis | 3400 | 77,9 % | 52,2 % | +2,8 | 1326 | 45,7 % | 53,0 % | +2,3 |
| Dogenklinge | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1492 | 40,1 % | 49,8 % | −1,0 |
| Maskierte Wache | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1506 | 53,5 % | 55,4 % | +4,7 |
| Geheimer Vertrag | Dandolo | 2 | Selten | – | – | – | – | 1492 | 43,2 % | 50,5 % | −0,3 |
| Admiral der Galeeren | Dandolo | 5 | Selten | – | – | – | – | 1528 | 50,4 % | 53,1 % | +2,4 |
| Arsenal von Venedig | Dandolo | 5 | Episch | – | – | – | – | 1556 | 31,1 % | 48,9 % | −1,8 |
| Marco Polo, der Weltenfahrer | Dandolo | 6 | Legendär | – | – | – | – | 1934 | 39,4 % | 55,2 % | +4,4 |
| Steppenspäher | Khan | 1 | Basis | 3400 | 76,5 % | 48,8 % | −1,0 | 1116 | 49,1 % | 54,2 % | +2,4 |
| Reiterbogenschütze | Khan | 2 | Basis | 3400 | 77,4 % | 48,0 % | −1,8 | 1588 | 52,5 % | 50,3 % | −1,4 |
| Pfeilschuss | Khan | 2 | Basis | 3400 | 77,1 % | 47,8 % | −2,0 | 1618 | 58,9 % | 50,2 % | −1,6 |
| Goldener Reiter | Khan | 4 | Basis | 3400 | 71,4 % | 55,4 % | +5,6 | 1460 | 47,6 % | 57,2 % | +5,4 |
| Adlerjägerin | Khan | 3 | Gewöhnlich | – | – | – | – | 1600 | 44,9 % | 54,6 % | +2,9 |
| Steppensturm | Khan | 3 | Gewöhnlich | – | – | – | – | 1594 | 45,2 % | 50,8 % | −1,0 |
| Tumenwächter | Khan | 5 | Selten | – | – | – | – | 1472 | 48,0 % | 51,7 % | −0,0 |
| Belagerungsfeuer | Khan | 6 | Selten | – | – | – | – | 1778 | 44,0 % | 53,7 % | +1,9 |
| Keshig-Elite | Khan | 6 | Episch | – | – | – | – | 1758 | 43,8 % | 49,9 % | −1,9 |
| Subutai, der Stratege | Khan | 6 | Legendär | – | – | – | – | 1726 | 43,5 % | 57,4 % | +5,6 |
| Hainwächterin | Boudicca | 1 | Basis | 3400 | 83,3 % | 47,1 % | −1,5 | 1116 | 56,9 % | 51,4 % | +2,1 |
| Eichenhaut | Boudicca | 2 | Basis | 3400 | 75,9 % | 46,5 % | −2,1 | 1534 | 40,7 % | 45,9 % | −3,4 |
| Icenerkrieger | Boudicca | 3 | Basis | 3400 | 85,4 % | 49,9 % | +1,3 | 1554 | 56,0 % | 52,4 % | +3,0 |
| Wilder Hieb | Boudicca | 3 | Basis | 3400 | 85,1 % | 47,6 % | −1,0 | 1526 | 60,4 % | 48,5 % | −0,8 |
| Streitwagenlenkerin | Boudicca | 4 | Gewöhnlich | – | – | – | – | 1472 | 47,5 % | 47,1 % | −2,2 |
| Druidin des Hains | Boudicca | 3 | Gewöhnlich | – | – | – | – | 1504 | 57,0 % | 47,7 % | −1,7 |
| Aufstand | Boudicca | 3 | Selten | – | – | – | – | 1454 | 53,0 % | 53,8 % | +4,5 |
| Eichenkoloss | Boudicca | 6 | Selten | – | – | – | – | 1930 | 53,3 % | 50,5 % | +1,2 |
| Zorn der Königin | Boudicca | 5 | Episch | – | – | – | – | 1636 | 35,1 % | 48,3 % | −1,1 |
| Andraste, Göttin des Sieges | Boudicca | 8 | Legendär | – | – | – | – | 1042 | 45,2 % | 50,8 % | +1,5 |
| Tintenlehrling | Nostradamus | 1 | Basis | 3400 | 84,9 % | 53,7 % | +2,9 | 1156 | 57,9 % | 54,8 % | +2,3 |
| Dunkle Vorahnung | Nostradamus | 2 | Basis | 3400 | 89,1 % | 53,5 % | +2,7 | 1556 | 63,0 % | 57,5 % | +5,0 |
| Maskierter Seher | Nostradamus | 3 | Basis | 3400 | 84,6 % | 51,6 % | +0,8 | 1590 | 47,0 % | 51,1 % | −1,4 |
| Prophezeiung | Nostradamus | 4 | Basis | 3400 | 63,4 % | 51,7 % | +0,9 | 1362 | 19,8 % | 50,1 % | −2,4 |
| Pestdoktor | Nostradamus | 4 | Gewöhnlich | – | – | – | – | 1386 | 52,9 % | 59,9 % | +7,5 |
| Schattenpakt | Nostradamus | 2 | Gewöhnlich | – | – | – | – | 1442 | 57,4 % | 57,0 % | +4,5 |
| Chronist der Nacht | Nostradamus | 5 | Selten | – | – | – | – | 1486 | 53,2 % | 53,5 % | +1,1 |
| Rote Finsternis | Nostradamus | 5 | Selten | – | – | – | – | 1528 | 40,1 % | 57,2 % | +4,8 |
| Wächter der Zeiten | Nostradamus | 6 | Episch | – | – | – | – | 1866 | 55,7 % | 53,8 % | +1,3 |
| Caterina de’ Medici | Nostradamus | 5 | Legendär | – | – | – | – | 1482 | 49,6 % | 56,4 % | +4,0 |
| Bauernrekrut | Jeanne | 1 | Basis | 3400 | 80,4 % | 48,9 % | −0,2 | 1150 | 57,3 % | 56,9 % | +7,7 |
| Bannersegen | Jeanne | 2 | Basis | 3400 | 80,5 % | 49,4 % | +0,3 | 1442 | 48,7 % | 50,2 % | +1,0 |
| Wache von Orléans | Jeanne | 3 | Basis | 3400 | 79,4 % | 48,9 % | −0,2 | 1610 | 53,7 % | 51,6 % | +2,3 |
| Die Fahne erheben | Jeanne | 2 | Basis | 3400 | 78,4 % | 47,9 % | −1,2 | 1536 | 54,7 % | 57,6 % | +8,4 |
| Lilienritter | Jeanne | 4 | Gewöhnlich | – | – | – | – | 1472 | 41,1 % | 47,0 % | −2,2 |
| Heiliger Schutz | Jeanne | 2 | Gewöhnlich | – | – | – | – | 1602 | 46,7 % | 49,0 % | −0,2 |
| Standartenträgerin | Jeanne | 5 | Selten | – | – | – | – | 1460 | 50,1 % | 48,3 % | −1,0 |
| Glocken von Reims | Jeanne | 6 | Selten | – | – | – | – | 1780 | 43,3 % | 52,3 % | +3,1 |
| Paladin der Loire | Jeanne | 7 | Episch | – | – | – | – | 1562 | 40,5 % | 46,5 % | −2,7 |
| La Hire, der Unbeugsame | Jeanne | 7 | Legendär | – | – | – | – | 1498 | 39,3 % | 49,4 % | +0,2 |
| Fjordspäher | Ragnar | 1 | Basis | 3400 | 78,0 % | 49,6 % | −1,2 | 1122 | 52,3 % | 52,7 % | +2,1 |
| Runenblitz | Ragnar | 2 | Basis | 3400 | 82,1 % | 50,7 % | −0,1 | 1504 | 59,2 % | 50,2 % | −0,5 |
| Schildmaid | Ragnar | 3 | Basis | 3400 | 81,3 % | 51,7 % | +0,8 | 1540 | 52,9 % | 53,5 % | +2,8 |
| Runenschnitzer | Ragnar | 4 | Basis | 3400 | 76,9 % | 53,1 % | +2,3 | 1394 | 50,1 % | 53,3 % | +2,7 |
| Donnerschlag | Ragnar | 3 | Gewöhnlich | – | – | – | – | 1496 | 57,6 % | 49,8 % | −0,8 |
| Berserker vom Fjord | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1346 | 49,0 % | 49,9 % | −0,7 |
| Ahnenbund | Ragnar | 3 | Selten | – | – | – | – | 1472 | 49,3 % | 53,7 % | +3,1 |
| Runenhüter | Ragnar | 5 | Selten | – | – | – | – | 1504 | 49,7 % | 49,2 % | −1,4 |
| Sturm der Nordsee | Ragnar | 5 | Episch | – | – | – | – | 1528 | 51,2 % | 55,8 % | +5,2 |
| Lagertha, Schildmaid | Ragnar | 7 | Legendär | – | – | – | – | 1646 | 46,4 % | 54,8 % | +4,2 |
| Dojoschüler | Musashi | 1 | Basis | 3400 | 81,4 % | 49,0 % | −0,2 | 1072 | 53,3 % | 53,7 % | +3,0 |
| Schneller Schnitt | Musashi | 1 | Basis | 3400 | 84,4 % | 49,8 % | +0,6 | 1150 | 49,9 % | 56,8 % | +6,1 |
| Rōnin | Musashi | 3 | Basis | 3400 | 84,1 % | 50,9 % | +1,7 | 1608 | 51,6 % | 52,4 % | +1,7 |
| Konzentration | Musashi | 2 | Basis | 3400 | 74,6 % | 51,6 % | +2,3 | 1528 | 44,0 % | 47,8 % | −3,0 |
| Kirschblütenwache | Musashi | 3 | Gewöhnlich | – | – | – | – | 1564 | 53,9 % | 53,0 % | +2,2 |
| Zwei Himmel | Musashi | 3 | Gewöhnlich | – | – | – | – | 1542 | 35,6 % | 48,4 % | −2,3 |
| Duellant | Musashi | 4 | Selten | – | – | – | – | 1446 | 38,8 % | 48,3 % | −2,4 |
| Der leere Geist | Musashi | 5 | Selten | – | – | – | – | 1584 | 40,2 % | 53,1 % | +2,3 |
| Meister der fünf Ringe | Musashi | 6 | Episch | – | – | – | – | 1894 | 51,4 % | 49,8 % | −1,0 |
| Sasaki Kojirō, der Rivale | Musashi | 6 | Legendär | – | – | – | – | 1760 | 43,7 % | 52,9 % | +2,2 |
| Dorfwache | neutral | 1 | Basis | 54400 | 80,2 % | 49,3 % | −0,8 | 18302 | 53,4 % | 49,7 % | −0,3 |
| Wandernder Händler | neutral | 2 | Basis | 54400 | 77,6 % | 49,1 % | −0,9 | 24122 | 48,2 % | 49,5 % | −0,5 |
| Steinschleuderer | neutral | 2 | Basis | 54400 | 80,8 % | 49,3 % | −0,7 | 24062 | 52,4 % | 50,7 % | +0,7 |
| Grenzläuferin | neutral | 3 | Basis | 54400 | 82,1 % | 50,7 % | +0,7 | 25012 | 53,2 % | 51,9 % | +1,8 |
| Festungsschild | neutral | 4 | Basis | 54400 | 76,1 % | 51,0 % | +1,0 | 22954 | 45,3 % | 49,6 % | −0,4 |
| Kavallerist | neutral | 4 | Basis | 54400 | 77,7 % | 51,3 % | +1,2 | 23034 | 45,3 % | 51,0 % | +1,0 |
| Feldheilerin | neutral | 3 | Basis | 54400 | 79,8 % | 49,3 % | −0,7 | 25434 | 51,3 % | 48,4 % | −1,6 |
| Archivarin | neutral | 4 | Basis | 54400 | 73,5 % | 52,5 % | +2,5 | 22856 | 44,3 % | 49,4 % | −0,6 |
| Wachhund | neutral | 2 | Basis | 54400 | 79,0 % | 48,6 % | −1,4 | 24046 | 50,5 % | 48,2 % | −1,8 |
| Veteran | neutral | 5 | Basis | 54400 | 78,4 % | 52,7 % | +2,7 | 25196 | 49,0 % | 49,0 % | −1,0 |
| Belagerungsturm | neutral | 6 | Basis | 54400 | 75,8 % | 55,6 % | +5,6 | 30430 | 49,9 % | 49,7 % | −0,3 |
| Schmied | neutral | 3 | Basis | – | – | – | – | 25138 | 48,6 % | 48,8 % | −1,2 |
| Wüstenspäherin | neutral | 1 | Basis | – | – | – | – | 18166 | 52,7 % | 51,3 % | +1,3 |
| Gebirgswache | neutral | 5 | Basis | – | – | – | – | 25218 | 49,8 % | 53,9 % | +3,9 |
| Verwegener Bote | neutral | 3 | Basis | – | – | – | – | 25114 | 49,5 % | 48,8 % | −1,2 |
| Laternenträger | neutral | 2 | Basis | – | – | – | – | 24310 | 49,7 % | 49,8 % | −0,2 |
| Versorgung | neutral | 2 | Basis | – | – | – | – | 24180 | 39,4 % | 48,7 % | −1,3 |
| Erste Hilfe | neutral | 1 | Basis | – | – | – | – | 18110 | 49,1 % | 47,8 % | −2,2 |
| Wurfmesser | neutral | 2 | Basis | – | – | – | – | 24122 | 56,0 % | 49,5 % | −0,6 |
| Kriegselefant | neutral | 7 | Basis | – | – | – | – | 26654 | 50,0 % | 53,6 % | +3,7 |
| Bernsteinhüter | neutral | 3 | Gewöhnlich | – | – | – | – | 25170 | 53,8 % | 50,8 % | +0,8 |
| Söldnerhauptmann | neutral | 4 | Gewöhnlich | – | – | – | – | 23040 | 47,2 % | 48,5 % | −1,5 |
| Adler der Berge | neutral | 2 | Gewöhnlich | – | – | – | – | 24184 | 52,7 % | 51,8 % | +1,8 |
| Grabwächter | neutral | 4 | Gewöhnlich | – | – | – | – | 22752 | 48,0 % | 51,2 % | +1,2 |
| Sammelruf | neutral | 3 | Gewöhnlich | – | – | – | – | 25264 | 56,8 % | 52,6 % | +2,6 |
| Feldration | neutral | 2 | Gewöhnlich | – | – | – | – | 24328 | 26,5 % | 44,1 % | −5,9 |
| Bogenmeisterin | neutral | 4 | Gewöhnlich | – | – | – | – | 22952 | 45,7 % | 46,8 % | −3,2 |
| Marmorwächter | neutral | 5 | Gewöhnlich | – | – | – | – | 25484 | 46,4 % | 49,8 % | −0,1 |
| Silberner Bannerträger | neutral | 4 | Selten | – | – | – | – | 23006 | 51,4 % | 53,5 % | +3,5 |
| Flammenkrug | neutral | 4 | Selten | – | – | – | – | 23220 | 45,3 % | 53,7 % | +3,7 |
| Goldene Löwin | neutral | 5 | Selten | – | – | – | – | 25158 | 50,6 % | 51,6 % | +1,6 |
| Seidenkarawanenführer | neutral | 5 | Selten | – | – | – | – | 25462 | 47,7 % | 49,7 % | −0,3 |
| Schlachtruf | neutral | 4 | Selten | – | – | – | – | 22818 | 39,8 % | 48,9 % | −1,1 |
| Ruinengolem | neutral | 6 | Selten | – | – | – | – | 30494 | 52,8 % | 50,6 % | +0,6 |
| Phönix der Chroniken | neutral | 7 | Episch | – | – | – | – | 26686 | 44,1 % | 51,2 % | +1,2 |
| Vergessene Weisheit | neutral | 4 | Episch | – | – | – | – | 23062 | 21,9 % | 47,8 % | −2,2 |
| Wächter des Weltenbaums | neutral | 8 | Episch | – | – | – | – | 18690 | 43,3 % | 61,7 % | +11,7 |
| Donnernde Legion | neutral | 7 | Episch | – | – | – | – | 26826 | 52,2 % | 52,6 % | +2,7 |
| Herodot, Vater der Geschichte | neutral | 4 | Legendär | – | – | – | – | 23050 | 41,5 % | 51,1 % | +1,1 |
| Zenobia, Rebellin von Palmyra | neutral | 8 | Legendär | – | – | – | – | 18286 | 41,6 % | 55,4 % | +5,4 |
| Agent des Zehnerrats | Dandolo | 3 | Gewöhnlich | – | – | – | – | 1538 | 57,6 % | 51,8 % | +1,1 |
| Tributeintreiber | Khan | 3 | Gewöhnlich | – | – | – | – | 1578 | 51,3 % | 47,7 % | −4,1 |
| Kobra des Nils | Imhotep | 2 | Gewöhnlich | – | – | – | – | 1408 | 51,1 % | 53,7 % | +4,9 |
| Brand von Londinium | Boudicca | 3 | Selten | – | – | – | – | 1566 | 51,5 % | 52,1 % | +2,8 |
| Bannbulle | Nostradamus | 1 | Selten | – | – | – | – | 1140 | 56,1 % | 57,5 % | +5,1 |
| Plünderer von Paris | Ragnar | 4 | Gewöhnlich | – | – | – | – | 1332 | 47,0 % | 47,7 % | −2,9 |
| Zorn des Donnergottes | Ragnar | 1 | Gewöhnlich | – | – | – | – | 1098 | 59,6 % | 51,4 % | +0,8 |
| Shinobi aus Iga | Musashi | 2 | Gewöhnlich | – | – | – | – | 1444 | 53,1 % | 55,6 % | +4,9 |
| Freibeuterin | neutral | 2 | Gewöhnlich | – | – | – | – | 24178 | 51,5 % | 48,4 % | −1,6 |
| Späherin im Unterholz | neutral | 1 | Gewöhnlich | – | – | – | – | 17932 | 53,8 % | 52,2 % | +2,2 |
| Wandermönch | neutral | 2 | Gewöhnlich | – | – | – | – | 24176 | 55,0 % | 51,6 % | +1,6 |
| Giftmischerin | neutral | 3 | Selten | – | – | – | – | 25322 | 50,2 % | 52,5 % | +2,5 |
| Condottiere | neutral | 3 | Gewöhnlich | – | – | – | – | 25210 | 54,9 % | 49,8 % | −0,2 |
| Ruderer der Triere | Perikles | 1 | Basis | 3400 | 78,1 % | 50,9 % | +1,3 | 1188 | 57,3 % | 49,6 % | −0,5 |
| Lange Mauern | Perikles | 2 | Basis | 3400 | 76,9 % | 44,9 % | −4,7 | 1392 | 56,8 % | 43,0 % | −7,0 |
| Rede auf die Gefallenen | Perikles | 2 | Basis | 3400 | 79,8 % | 54,1 % | +4,5 | 1544 | 56,5 % | 57,5 % | +7,4 |
| Strategos | Perikles | 3 | Basis | 3400 | 76,5 % | 51,9 % | +2,3 | 1592 | 57,0 % | 51,5 % | +1,5 |
| Pnyx | Perikles | 3 | Gewöhnlich | – | – | – | – | 1572 | 51,6 % | 45,5 % | −4,6 |
| Scherbengericht | Perikles | 2 | Gewöhnlich | – | – | – | – | 1494 | 59,6 % | 55,6 % | +5,5 |
| Triere von Salamis | Perikles | 4 | Selten | – | – | – | – | 1434 | 48,5 % | 52,2 % | +2,2 |
| Pest von Athen | Perikles | 4 | Selten | – | – | – | – | 1458 | 35,1 % | 49,6 % | −0,5 |
| Odeion | Perikles | 4 | Episch | – | – | – | – | 1406 | 44,8 % | 42,7 % | −7,4 |
| Phidias, Meister der Akropolis | Perikles | 7 | Legendär | – | – | – | – | 1814 | 47,2 % | 53,8 % | +3,8 |
| Pilumwerfer | Agrippa | 1 | Basis | 3400 | 77,8 % | 50,8 % | +2,9 | 1078 | 55,2 % | 53,1 % | +5,2 |
| Legionär der Zehnten | Agrippa | 2 | Basis | 3400 | 73,9 % | 49,7 % | +1,8 | 1472 | 45,7 % | 51,9 % | +4,0 |
| Castra | Agrippa | 3 | Basis | 3400 | 81,9 % | 48,2 % | +0,3 | 1516 | 59,8 % | 47,8 % | −0,1 |
| Testudo | Agrippa | 2 | Basis | 3400 | 74,1 % | 50,7 % | +2,7 | 1424 | 46,2 % | 53,0 % | +5,1 |
| Ballista | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1570 | 56,8 % | 46,6 % | −1,3 |
| Liburnen bei Actium | Agrippa | 3 | Gewöhnlich | – | – | – | – | 1628 | 51,2 % | 53,5 % | +5,6 |
| Primus Pilus | Agrippa | 5 | Selten | – | – | – | – | 1612 | 49,3 % | 53,1 % | +5,1 |
| Thermen des Agrippa | Agrippa | 2 | Selten | – | – | – | – | 1478 | 56,0 % | 43,6 % | −4,3 |
| Pantheon | Agrippa | 4 | Episch | – | – | – | – | 1448 | 50,8 % | 43,7 % | −4,2 |
| Vitruv, Baumeister Roms | Agrippa | 5 | Legendär | – | – | – | – | 1644 | 40,7 % | 47,6 % | −0,3 |
| Bogenschütze von Ta-Seti | Amanirenas | 1 | Basis | 3400 | 83,1 % | 51,9 % | +0,6 | 1178 | 57,4 % | 50,6 % | −0,6 |
| Wüstenreiter | Amanirenas | 2 | Basis | 3400 | 82,1 % | 51,2 % | −0,2 | 1500 | 55,4 % | 50,2 % | −1,1 |
| Pfeilregen von Kusch | Amanirenas | 2 | Basis | 3400 | 79,0 % | 52,8 % | +1,4 | 1552 | 48,1 % | 51,7 % | +0,5 |
| Speerträger von Napata | Amanirenas | 3 | Basis | 3400 | 84,2 % | 52,2 % | +0,8 | 1550 | 54,5 % | 51,8 % | +0,6 |
| Wächter des Löwentempels | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1624 | 53,3 % | 53,5 % | +2,3 |
| Kundschafter aus Meroë | Amanirenas | 3 | Gewöhnlich | – | – | – | – | 1506 | 54,7 % | 52,9 % | +1,7 |
| Kriegselefant von Kusch | Amanirenas | 6 | Selten | – | – | – | – | 1850 | 56,2 % | 56,6 % | +5,4 |
| Überfall auf Syene | Amanirenas | 3 | Selten | – | – | – | – | 1600 | 55,6 % | 49,8 % | −1,5 |
| Akinidad, Prinz von Kusch | Amanirenas | 5 | Episch | – | – | – | – | 1654 | 55,7 % | 47,8 % | −3,5 |
| Bronzekopf des Augustus | Amanirenas | 6 | Legendär | – | – | – | – | 1798 | 45,9 % | 54,1 % | +2,9 |
| Kopistin der Chronik | Anna | 1 | Basis | 3400 | 80,4 % | 51,8 % | +2,0 | 1204 | 53,0 % | 53,6 % | +5,1 |
| Pantokrator-Spital | Anna | 3 | Basis | 3400 | 71,8 % | 50,6 % | +0,8 | 1542 | 26,8 % | 46,0 % | −2,4 |
| Warägergardist | Anna | 3 | Basis | 3400 | 82,5 % | 53,9 % | +4,1 | 1588 | 53,4 % | 54,6 % | +6,2 |
| Hofärztin | Anna | 3 | Basis | 3400 | 78,4 % | 49,7 % | −0,2 | 1506 | 36,6 % | 47,7 % | −0,7 |
| Griechisches Feuer | Anna | 4 | Gewöhnlich | – | – | – | – | 1454 | 49,2 % | 58,4 % | +10,0 |
| Bibliothekar von Konstantinopel | Anna | 4 | Gewöhnlich | – | – | – | – | 1316 | 43,6 % | 54,0 % | +5,6 |
| Kataphrakt | Anna | 5 | Selten | – | – | – | – | 1542 | 49,7 % | 60,1 % | +11,7 |
| Chrysobull | Anna | 3 | Selten | – | – | – | – | 1620 | 31,0 % | 47,7 % | −0,7 |
| Nikephoros Bryennios | Anna | 5 | Episch | – | – | – | – | 1496 | 46,0 % | 48,1 % | −0,4 |
| Alexios I. Komnenos | Anna | 6 | Legendär | – | – | – | – | 1846 | 45,0 % | 46,1 % | −2,3 |
| Gärtner von Tetzcotzinco | Nezahualcóyotl | 1 | Basis | 3400 | 81,8 % | 49,8 % | +0,4 | 1056 | 56,8 % | 50,9 % | +2,1 |
| Adlerkrieger | Nezahualcóyotl | 2 | Basis | 3400 | 80,3 % | 49,7 % | +0,3 | 1432 | 53,6 % | 51,3 % | +2,6 |
| Blumenkrieg | Nezahualcóyotl | 2 | Basis | 3400 | 82,0 % | 49,2 % | −0,2 | 1482 | 57,6 % | 48,4 % | −0,3 |
| Jaguarkrieger | Nezahualcóyotl | 3 | Basis | 3400 | 81,2 % | 48,1 % | −1,3 | 1564 | 59,3 % | 48,0 % | −0,7 |
| Aquädukt von Chapultepec | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1532 | 56,9 % | 42,3 % | −6,4 |
| Gesetze von Texcoco | Nezahualcóyotl | 2 | Gewöhnlich | – | – | – | – | 1444 | 51,0 % | 48,0 % | −0,7 |
| Quetzal-Hauptmann | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1390 | 51,8 % | 53,6 % | +4,8 |
| Damm von Nezahualcóyotl | Nezahualcóyotl | 4 | Selten | – | – | – | – | 1466 | 50,1 % | 42,9 % | −5,8 |
| Itzcoatl, Herr von Tenochtitlan | Nezahualcóyotl | 6 | Episch | – | – | – | – | 2002 | 56,8 % | 57,8 % | +9,0 |
| Nezahualpilli, Sohn des Dichters | Nezahualcóyotl | 5 | Legendär | – | – | – | – | 1610 | 43,1 % | 46,6 % | −2,2 |
| Gokenin aus Sagami | Masako | 1 | Basis | 3400 | 79,8 % | 48,2 % | −2,3 | 1058 | 54,0 % | 51,7 % | +2,6 |
| Bogenreiter aus Kamakura | Masako | 2 | Basis | 3400 | 81,1 % | 49,3 % | −1,2 | 1390 | 57,5 % | 54,4 % | +5,4 |
| Treueschwur | Masako | 1 | Basis | 3400 | 79,8 % | 52,6 % | +2,0 | 1046 | 48,0 % | 51,7 % | +2,6 |
| Nonne von Kamakura | Masako | 2 | Basis | 3400 | 81,0 % | 48,5 % | −2,0 | 1452 | 57,9 % | 52,0 % | +3,0 |
| Rokuhara-Späher | Masako | 2 | Gewöhnlich | – | – | – | – | 1454 | 55,7 % | 52,5 % | +3,4 |
| Aufgebot von Jōkyū | Masako | 4 | Gewöhnlich | – | – | – | – | 1478 | 50,4 % | 53,5 % | +4,4 |
| Tsurugaoka Hachiman-gū | Masako | 2 | Selten | – | – | – | – | 1458 | 58,4 % | 46,3 % | −2,7 |
| Verbannung nach Oki | Masako | 3 | Selten | – | – | – | – | 1576 | 45,9 % | 44,8 % | −4,2 |
| Hōjō Yoshitoki, Regent | Masako | 5 | Episch | – | – | – | – | 1632 | 48,8 % | 51,0 % | +1,9 |
| Minamoto no Yoritomo | Masako | 6 | Legendär | – | – | – | – | 1984 | 47,0 % | 50,1 % | +1,0 |
