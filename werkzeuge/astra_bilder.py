"""Astra-Einbau (AP A.1): baut die gemalten Astra-Bilder ins Spiel ein und schreibt die Liste, was noch fehlt.

Astra hat die Bilder in mehreren Teillieferungen geschickt (ungenutzte_assets/neue_astra_assets/: Teil1 bis Teil6,
gerettet, gerettet_2te), teils als WebP, teils als PNG, teils mit Originalen in 1254 px. Das Werkzeug sammelt alle
Einzelbilder je ID ein (spätere Lieferungen gehen vor, Originale vor verkleinerten Fassungen) und erzeugt daraus:

- Kartenatlanten quellcode/assets/game/assets/art/astra-karten-<n>.webp (4 × 3 Felder à 362 px, wie die alten
  Atlanten; R.tile schneidet Breite/4 und Höhe/3) für Karten und Spielsteine,
- Heldenatlanten heroes.webp und heroes2.webp (4 × 3 à 384 px, Held i in Atlas i // 12, Feld i % 12) und die
  Marmor-Skins heroes-marble.webp in denselben Feldern,
- die fünf Schlachtfeld-Tische board*.webp mit Vorschau *-preview.webp,
- die Zuordnung quellcode/assets/game/model/bilder.js (ID → Atlas und Feld), die data.js über die Karten legt,
- ungenutzte_assets/ASTRA_STAND.csv (jede der 350 Karten und 27 Spielsteine mit Status und Quelle) und
  ungenutzte_assets/ASTRA_AUFTRAG.md (der nächste Auftrag an Astra: nur noch offene IDs mit Motivbeschreibung aus
  PRODUKTIONSBRIEFING.md).

Das Spiel lädt nur die WebP-Atlanten; PNG oder WebP als Lieferformat ist egal. Alte Atlanten, auf die keine Karte mehr
zeigt, werden gelöscht. Danach `node werkzeuge/motive.js` (MOTIVE.md) ausführen.

Aufruf: python3 werkzeuge/astra_bilder.py
Benötigt: Pillow mit WebP, Node (liest die Karten aus model/data.js)
"""
import csv
import json
import os
import re
import shutil
import subprocess
import sys

from PIL import Image, ImageOps

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
NEU = os.path.join(ROOT, 'ungenutzte_assets/neue_astra_assets')
GAME = os.path.join(ROOT, 'quellcode/assets/game')
ART = os.path.join(GAME, 'assets/art')
CELL, HERO_CELL, QUALITY = 362, 384, 85
T4 = 'Teil4/assets/Chronicle_of_Heroes_Assets_Teil_04/assets'

# Lieferungen in aufsteigendem Vorrang: (Ordner, Endung). Der Dateiname ist die ID.
FOLDERS = [
    ('Teil1/assets/cards', '.webp'),
    ('Teil2/assets/cards', '.png'), ('Teil2/assets/tokens', '.png'),
    (T4 + '/cards', '.png'), (T4 + '/tokens', '.png'),
    ('Teil5/originale_1254px', '.png'),
    ('Teil6/originale', '.png'),
]
# gerettet/ hat Bildtitel statt IDs: Arbeitszuordnung von Astra (Teil 3/4, nicht durch ein Manifest bestätigt).
RESCUED = 'Teil3/GERETTETE_ASSETS_ZUORDNUNG.json'
# gerettet_2te/: fünf Mamlukenbilder, nach Motiv zugeordnet (PRODUKTIONSBRIEFING.md, Abschnitt 7; angesehen 11. 10. 2026).
BAIBARS = {
    'baibars_0': 'bf9709a5-8713-4dd0-8aa7-6ac966b22275.png',  # Rekrut übt mit der Lanze
    'baibars_1': '4137f04e-bc14-49b4-8b74-0480c39de1bd.png',  # Barid-Kurier mit Brieftaube
    'baibars_2': 'efd83f43-4ebc-4b02-b4be-264e376f0dab.png',  # Ain Dschalut
    'baibars_3': 'e1f5377d-d9d2-46b4-9425-24caff1cada0.png',  # Bogenreiter
    'baibars_4': '1c6b6825-0953-4078-b12a-2ed1b9d01797.png',  # Manjaniq
}
# Geliefert und eingebaut, aber von Astra selbst als korrekturbedürftig gemeldet: bleibt im Auftrag als Revision.
REVISION = {
    'fabius_0': 'Veles trägt zu schwere Rüstung: schlichte Tunika, kleiner leichter Rundschild, Wurfspeere, kein Kettenhemd.',
}
# Neue Karten und Spielsteine nach dem Briefing: ID → (Gruppe, Name, Motiv). Erscheinen im Auftrag wie Briefing-Zeilen.
NEW_MOTIFS = {
    'student': ('Spielsteine', 'Schüler der Hypatia',
                'Junger Gelehrter in schlichtem Chiton und Mantel um 400 n. Chr., sitzt mit Wachstafel und Griffel, ein '
                'Astrolab aus Messing auf dem Tisch, Säulenhalle in Alexandria im Hintergrund. Kein Zauber, kein Leuchten '
                '(AP L.5: Hypatias Unterricht).'),
    # AP 5.6 (1.25.0): zwölf Hinterhalte und Annas Träger der Kaiserstandarte.
    'neutral_50': ('Hinterhalte (AP 5.6)', 'Krähenfüße', 'Eiserne Krähenfüße mit vier Spitzen im zertretenen Gras, ein römischer Soldat streut weitere aus einem Lederbeutel, in der Ferne nahen Reiter.'),
    'neutral_51': ('Hinterhalte (AP 5.6)', 'Abgefangene Botschaft', 'Römische Futterholer halten auf einer staubigen Straße in Süditalien zwei numidische Reiter an, ein Legionär hält einen versiegelten Brief hoch (207 v. Chr.).'),
    'steppe_7': ('Hinterhalte (AP 5.6)', 'Falsche Kundschafter von Kadesch', 'Zwei Beduinen knien vor Ramses II. in seinem Lager und zeigen nach Norden; hinter den Mauern von Kadesch warten verborgen hethitische Streitwagen (um 1274 v. Chr.).'),
    'griechen_7': ('Hinterhalte (AP 5.6)', 'Botschaft des Sikinnos', 'Ein griechischer Sklave rudert nachts in einem kleinen Boot auf die persische Flotte zu, Laternen auf den Trieren, die Meerenge von Salamis (480 v. Chr.).'),
    'rom_7': ('Hinterhalte (AP 5.6)', 'Wall am Kalkrieser Berg', 'Germanen warten hinter einem langen Wall aus Rasensoden am Fuß eines bewaldeten Bergs; auf dem schmalen Weg am Moor zieht im Regen eine römische Kolonne vorbei (9 n. Chr.).'),
    'mittelalter_7': ('Hinterhalte (AP 5.6)', 'Fallgatter', 'Das eisenbeschlagene Fallgatter eines Burgtors saust herab, davor reißen Reiter ihre Pferde zurück.'),
    'byzanz_7': ('Hinterhalte (AP 5.6)', 'Engpass von Myriokephalon', 'Seldschukische Bogenreiter greifen von felsigen Hängen eine lange byzantinische Heereskolonne an, der Tross steckt im engen Pass fest (1176).'),
    'ostasien_7': ('Hinterhalte (AP 5.6)', 'Gegenmine', 'Verteidiger einer barocken Sternfestung graben bei Kerzenlicht einen Gegenstollen unter dem Wall, einer horcht an der Erdwand, Pulverfässer (um 1700).'),
    'khan_13': ('Hinterhalte (AP 5.6)', 'Hinterhalt am Süntel', 'Fränkische Reiter stürmen überhastet einen bewaldeten Berghang hinauf auf das Lager der Sachsen zu, von beiden Seiten brechen Sachsen aus dem Wald (782).'),
    'fabius_10': ('Hinterhalte (AP 5.6)', 'Rettung bei Gerunium', 'Der alte Fabius Maximus führt seine Legionen über einen Hügel, um im Tal umzingelte Römer vor den Karthagern zu retten (217 v. Chr.).'),
    'anna_12': ('Hinterhalte (AP 5.6)', 'Täuschung bei Larissa', 'Ein byzantinisches Heer steht mit den kaiserlichen Feldzeichen vor den Mauern von Larissa, normannische Ritter stürmen darauf zu (1083).'),
    'leonidas_12': ('Hinterhalte (AP 5.6)', 'Kampf um den Leichnam', 'Spartanische Hopliten kämpfen im Engpass der Thermopylen um den Leichnam ihres gefallenen Königs und drängen die Perser zurück (480 v. Chr.).'),
    'standard': ('Hinterhalte (AP 5.6)', 'Träger der Kaiserstandarte', 'Byzantinischer Fahnenträger im Lamellenpanzer mit hoher kaiserlicher Fahne mit goldenem Kreuz (11. Jh.).'),
    # AP 5.7 Teil 1 (1.27.0): Erweiterung „Wunder der Welt“.
    'leonidas_13': ('Wunder der Welt (AP 5.7)', 'Eiren der Agoge', 'Ein junger Spartaner von etwa zwanzig Jahren im roten Umhang führt eine Gruppe barfüßiger Jungen mit kurzgeschorenem Haar über einen steinigen Übungsplatz, Schilfrohre in den Händen (5. Jh. v. Chr.).'),
    'hypatia_12': ('Wunder der Welt (AP 5.7)', 'Astrolab für Synesios', 'Ein silbernes Astrolab mit Sternennetz liegt auf einem Tisch mit Papyrusrollen, eine Gelehrtenhand zeigt auf die Skala, Säulenhalle in Alexandria (um 400 n. Chr.). Kein Leuchten.'),
    'imhotep_13': ('Wunder der Welt (AP 5.7)', 'Pilger im Asklepieion von Saqqara', 'Kranke Pilger mit Opfergaben und Tonfiguren steigen im Morgenlicht zum Heiligtum des Imhotep bei der Stufenpyramide von Saqqara hinauf (Spätzeit, um 300 v. Chr.).'),
    'dandolo_13': ('Wunder der Welt (AP 5.7)', 'Eroberung von Zara', 'Venezianische Galeeren und Kreuzfahrer vor den Mauern der Hafenstadt Zara an der Adria, Leitern an den Mauern, Wappen mit dem Markuslöwen (1202).'),
    'khan_14': ('Wunder der Welt (AP 5.7)', 'Irminsul', 'Ein hoher, aufgerichteter Baumstamm als Heiligtum in einer Lichtung, mit Opfergaben und Schnitzereien, Sachsen in Wollmänteln davor, Dämmerung (8. Jh.).'),
    'boudicca_13': ('Wunder der Welt (AP 5.7)', 'Stater des Vercingetorix', 'Gallische Goldmünze mit dem Kopf eines jungen Mannes und der Umschrift VERCINGETORIXS, daneben ein Lederbeutel mit weiteren Münzen auf einem Holztisch (52 v. Chr.).'),
    'nostradamus_13': ('Wunder der Welt (AP 5.7)', 'Manufaktur auf der Albrechtsburg', 'Die spätgotische Albrechtsburg über Meißen an der Elbe, aus den Fenstern Rauch der Brennöfen, im Vordergrund Arbeiter mit Körben voll weißer Gefäße (1710).'),
    'jeanne_12': ('Wunder der Welt (AP 5.7)', 'Volmar, Schreiber Hildegards', 'Ein Benediktinermönch mit Tonsur sitzt am Schreibpult und schreibt auf Pergament, durch eine Öffnung blickt er zu einer Nonne mit Wachstafeln (12. Jh.).'),
    'ragnar_14': ('Wunder der Welt (AP 5.7)', 'Kloster Pegau', 'Romanische Klosterkirche aus Bruchstein an der Weißen Elster, Mönche bei der Feldarbeit, ein Ritter im Kettenhemd kniet vor dem Portal (um 1100).'),
    'musashi_13': ('Wunder der Welt (AP 5.7)', 'Gefährte der Artusfahrt', 'Ein Ritter mit Topfhelm und Wappenrock bricht im Tjost seine Lanze, im Hintergrund ein Zelt mit dem Banner König Artus’ und Zuschauer (1240).'),
    'perikles_12': ('Wunder der Welt (AP 5.7)', 'Aspasia von Milet', 'Eine Frau im feinen Chiton spricht im Säulenhof eines athenischen Hauses zu Männern, die ihr zuhören, eine Schriftrolle in der Hand (5. Jh. v. Chr.).'),
    'agrippa_12': ('Wunder der Welt (AP 5.7)', 'Aqua Virgo', 'Römische Bogenleitung und Bauarbeiter mit Kran und Lot, im Vordergrund strömt klares Wasser in ein Becken (19 v. Chr.).'),
    'amanirenas_12': ('Wunder der Welt (AP 5.7)', 'Stele von Karnak', 'Eine hohe Kalksteinstele mit Hieroglyphen und dem Bild einer Königin im Tempelhof von Karnak, Priester lesen davor (um 1540 v. Chr.).'),
    'anna_13': ('Wunder der Welt (AP 5.7)', 'Kloster Kecharitomene', 'Byzantinisches Frauenkloster mit Kuppelkirche in Konstantinopel, im Garten schreibt eine ältere Frau in Purpur an einem Pult (12. Jh.).'),
    'nezahualcoyotl_12': ('Wunder der Welt (AP 5.7)', 'Gesänge des Dichterkönigs', 'Ein Fürst aus Texcoco mit Federschmuck trägt in einem Garten Verse vor, Musiker mit Trommel (huehuetl) und Flöte, Blüten (15. Jh.).'),
    'masako_12': ('Wunder der Welt (AP 5.7)', 'Heiratsurkunde der Theophanu', 'Eine prachtvolle Urkunde auf purpurrotem Pergament mit Goldschrift und runden Medaillons mit Tieren, ausgerollt auf einem Tisch (972).'),
    'epaminondas_10': ('Wunder der Welt (AP 5.7)', 'Scheinlager bei Mantineia', 'Thebanische Hopliten legen ihre Schilde und Speere ab, als wollten sie lagern, im Hintergrund lösen die Gegner ihre Schlachtreihe (362 v. Chr.).'),
    'fabius_11': ('Wunder der Welt (AP 5.7)', 'Quintus Fabius, der Sohn', 'Ein römischer Konsul mit Liktoren befiehlt einem alten Feldherrn, vom Pferd zu steigen; der Alte steigt lächelnd ab (213 v. Chr.).'),
    'mandukhai_10': ('Wunder der Welt (AP 5.7)', 'Thumelicus', 'Ein kleiner germanischer Junge an der Hand seiner Mutter in einem römischen Triumphzug, Zuschauer und Feldzeichen (17 n. Chr.).'),
    'baibars_10': ('Wunder der Welt (AP 5.7)', 'Brief an die Besatzung von Krak', 'Ein Bote reicht Johanniterrittern auf der Mauer der Burg Krak des Chevaliers einen gesiegelten Brief, davor das Mamlukenheer (1271).'),
    'zizka_10': ('Wunder der Welt (AP 5.7)', 'Neuf-Brisach', 'Vogelschau auf eine achteckige Festungsstadt mit Bastionen, Wassergräben und schnurgeraden Straßen am Rhein (um 1700).'),
    'fuhao_10': ('Wunder der Welt (AP 5.7)', 'Goldener Halsring von Vix', 'Ein massiver goldener Halsring mit kugeligen Enden und kleinen geflügelten Pferden auf dunklem Tuch (um 500 v. Chr.).'),
    'neutral_52': ('Wunder der Welt (AP 5.7)', 'Koloss von Rhodos', 'Die riesige Bronzestatue des Helios am Hafen von Rhodos, Schiffe zu ihren Füßen, Abendlicht (um 280 v. Chr.).'),
    'neutral_53': ('Wunder der Welt (AP 5.7)', 'Zeus des Phidias', 'Der sitzende Zeus aus Gold und Elfenbein im Tempel von Olympia, so groß, dass sein Kopf fast das Dach berührt, Besucher klein davor (5. Jh. v. Chr.).'),
    'neutral_54': ('Wunder der Welt (AP 5.7)', 'Himmelsscheibe von Nebra', 'Eine grün patinierte Bronzescheibe mit goldener Sonne, Mondsichel und Sternen auf Erde und Stein, Nachthimmel darüber (um 1600 v. Chr.).'),
    'neutral_55': ('Wunder der Welt (AP 5.7)', 'Gänse des Kapitols', 'Weiße Gänse schnattern nachts auf dem Kapitol, ein römischer Krieger erwacht mit dem Schwert, Gallier klettern die Felsen herauf (um 387 v. Chr.).'),
    'neutral_56': ('Wunder der Welt (AP 5.7)', 'Skytale', 'Ein Holzstab, um den spiralförmig ein beschriebener Lederstreifen gewickelt ist, in der Hand eines spartanischen Boten (5. Jh. v. Chr.).'),
    # AP 5.7 Teil 2 (1.28.0): Erweiterung „Wunder der Welt“, der Rest.
    'leonidas_14': ('Wunder der Welt (AP 5.7)', '„Mit ihm oder auf ihm“', 'Eine spartanische Mutter im Peplos reicht ihrem jungen Sohn in Rüstung den runden Bronzeschild mit dem Lambda, im Hof eines Hauses, ernster Blick (5. Jh. v. Chr.).'),
    'hypatia_13': ('Wunder der Welt (AP 5.7)', 'Orestes, Präfekt von Ägypten', 'Ein römischer Präfekt in Toga mit Purpursaum hört in einer Säulenhalle in Alexandria einer Gelehrten zu, Schreiber und Wachen im Hintergrund (um 414 n. Chr.).'),
    'imhotep_14': ('Wunder der Welt (AP 5.7)', 'Sockel der Djoser-Statue', 'Ein Statuensockel aus Kalkstein mit Hieroglyphen und den Füßen einer Königsstatue, darauf der eingemeißelte Name des Imhotep, im Hintergrund die Stufenpyramide (um 2650 v. Chr.).'),
    'dandolo_14': ('Wunder der Welt (AP 5.7)', 'Quadriga von San Marco', 'Vier vergoldete Bronzepferde auf der Loggia über dem Portal des Markusdoms in Venedig, Tauben und Abendlicht (13. Jh.).'),
    'khan_15': ('Wunder der Welt (AP 5.7)', 'Taufe in Attigny', 'Ein sächsischer Anführer mit langem Haar steigt in ein steinernes Taufbecken in einer Pfalzkapelle, Karl der Große mit Krone steht als Pate daneben, Priester mit Kreuz (785).'),
    'boudicca_14': ('Wunder der Welt (AP 5.7)', 'Murus Gallicus', 'Eine gallische Stadtmauer aus Holzbalken und Steinen auf einem Hügel, römische Soldaten mit Rammbock und Fackeln scheitern davor (52 v. Chr.).'),
    'nostradamus_14': ('Wunder der Welt (AP 5.7)', 'Weiße Erde aus Aue', 'Bergleute mit Grubenlampen tragen Körbe voll weißer Tonerde aus einem Stollen im Erzgebirge, ein Fuhrwerk wartet im Schnee (um 1710).'),
    'jeanne_13': ('Wunder der Welt (AP 5.7)', 'Lingua ignota', 'Eine aufgeschlagene Pergamentseite mit fremden, erfundenen Buchstaben und einer Wortliste, daneben Feder und Tintenhorn auf einem Klosterpult (12. Jh.).'),
    'ragnar_15': ('Wunder der Welt (AP 5.7)', 'Pilgerfahrt nach Santiago', 'Ein Ritter im Pilgermantel mit Jakobsmuschel und Stab kniet vor der romanischen Kathedrale von Santiago de Compostela, andere Pilger ziehen vorbei (um 1100).'),
    'musashi_14': ('Wunder der Welt (AP 5.7)', 'Turnier zu Friesach', 'Zwei Ritter mit Topfhelmen prallen mit Lanzen im Tjost aufeinander, bunte Zelte und eine Burg auf dem Hügel, Zuschauer auf Tribünen (1224).'),
    'perikles_13': ('Wunder der Welt (AP 5.7)', 'Bauabrechnung des Parthenon', 'Ein Steinmetz meißelt Zahlen in eine Marmorplatte, im Hintergrund der eingerüstete Parthenon auf der Akropolis, Bürger lesen eine fertige Tafel (um 440 v. Chr.).'),
    'agrippa_13': ('Wunder der Welt (AP 5.7)', 'Weltkarte des Agrippa', 'Eine große gemalte Weltkarte mit Mittelmeer, Küsten und Provinzen an der Wand einer römischen Säulenhalle, Bürger betrachten sie (um 7 v. Chr.).'),
    'amanirenas_13': ('Wunder der Welt (AP 5.7)', 'Kamose', 'Ein ägyptischer König mit blauer Krone steht am Bug eines Kriegsschiffs auf dem Nil, Bogenschützen neben ihm, Flotte dahinter (um 1550 v. Chr.).'),
    'anna_14': ('Wunder der Welt (AP 5.7)', 'Irene Dukaina', 'Eine byzantinische Kaiserin in Purpur und Perlen wacht im Feldzelt am Lager eines kranken Kaisers, eine Öllampe brennt (um 1112).'),
    'nezahualcoyotl_13': ('Wunder der Welt (AP 5.7)', 'Bäder von Tetzcotzinco', 'In den Fels gehauene Wasserbecken und Treppen auf einem bewaldeten Hügel, Wasser fließt aus einer Rinne, Gärten mit Blüten, Blick auf den See von Texcoco (15. Jh.).'),
    'masako_13': ('Wunder der Welt (AP 5.7)', 'Theophanius imperator augustus', 'Eine Kaiserin mit Krone und Zepter sitzt auf dem Thron und siegelt eine Urkunde, Schreiber und Bischöfe stehen daneben (990).'),
    'epaminondas_11': ('Wunder der Welt (AP 5.7)', 'Mauern von Messene', 'Mächtige Quadermauern mit einem viereckigen Turm und Tor in hügeliger Landschaft unter dem Berg Ithome, Bauleute setzen Steine (369 v. Chr.).'),
    'fabius_12': ('Wunder der Welt (AP 5.7)', 'Schatten auf den Höhen', 'Ein römisches Heer zieht auf einem Hügelkamm entlang und blickt hinab auf das Lager Hannibals mit Elefanten in der Ebene (217 v. Chr.).'),
    'mandukhai_11': ('Wunder der Welt (AP 5.7)', 'Stolz im Triumphzug', 'Eine germanische Frau mit erhobenem Kopf geht gefasst in einem römischen Triumphzug, Zuschauer, Feldzeichen und Lorbeer (17 n. Chr.).'),
    'baibars_11': ('Wunder der Welt (AP 5.7)', 'Moschee des Baibars', 'Eine große Moschee mit weitem Hof, Arkaden und monumentalem Tor in Kairo, Gläubige und Händler davor (1269).'),
    'zizka_11': ('Wunder der Welt (AP 5.7)', 'Projet d’une dîme royale', 'Ein gealterter Marschall in Perücke schreibt im Kerzenschein an einem Tisch voller Zahlenlisten und Karten Frankreichs (1707).'),
    'fuhao_11': ('Wunder der Welt (AP 5.7)', 'Krater von Vix', 'Ein riesiges bronzenes Mischgefäß mit Henkeln in Gorgonenform und einem Fries aus Kriegern und Wagen, ein Mensch daneben wirkt klein (um 500 v. Chr.).'),
    'neutral_57': ('Wunder der Welt (AP 5.7)', 'Artemistempel von Ephesos', 'Ein riesiger Marmortempel mit doppelten Säulenreihen, Pilger auf den Stufen, im Hintergrund Rauch der alten Brandstelle (4. Jh. v. Chr.).'),
    'neutral_58': ('Wunder der Welt (AP 5.7)', 'Mausoleum von Halikarnassos', 'Ein hohes Grabmal mit Sockel, Säulenkranz, Stufenpyramide und Viergespann auf der Spitze über einer Hafenstadt (um 350 v. Chr.).'),
    'neutral_59': ('Wunder der Welt (AP 5.7)', 'Ischtar-Tor', 'Ein Stadttor aus blau glasierten Ziegeln mit goldenen Stieren und Drachen, Zinnen und eine Prozessionsstraße davor (um 575 v. Chr.).'),
    'neutral_60': ('Wunder der Welt (AP 5.7)', 'Stele des Hammurapi', 'Eine hohe Stele aus schwarzem Stein mit Keilschrift, oben ein König vor dem thronenden Sonnengott, in einem Tempelhof (um 1750 v. Chr.).'),
    'neutral_61': ('Wunder der Welt (AP 5.7)', 'Feuerpost', 'Ein großes Signalfeuer brennt auf einem Berggipfel in der Nacht, auf fernen Gipfeln antworten weitere Feuer, ein Wächter blickt in die Ferne (um 1200 v. Chr.).'),
}
# Nicht neu erzeugen, bis eine Zuordnung geklärt ist. Entscheidung 19 (11. 10. 2026): Die geretteten Alexandria-Bilder
# bleiben hypatia_5 und hypatia_8, hypatia_0 und hypatia_2 werden neu bestellt – nichts mehr gesperrt.
BLOCKED = set()
# AP L.6 (Entscheidung 21, 13. 10. 2026: möglichst keine neuen Bilder): Alte Bilder, die nichts Falsches zeigen, bleiben im Spiel
# und gehen nicht mehr an Astra – geprüft mit dem Bild vor Augen. Feldheilerin (rotes Kreuz erst seit 1863), Wachhund (Schäferhund
# erst seit 1899), Bibliothekslehrling (Prunkbibliothek um 400), Ordensritter und Grabwächter bleiben im Auftrag.
KEEP_OLD = {f'neutral_{i}' for i in (0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 24, 25, 26, 28, 29,
                                     30, 31, 32, 37, 38, 39)} | {'khan_2', 'nostradamus_0', 'hypatia_2', 'recruit', 'warrior', 'coin'}
# … dazu drei, die AP L.6 mit einem vorhandenen Bild löst: Steinadler (khan, Feld 10) für den Adler der Berge, goldenes Buch
# mit Erdkugel (neutral3, Feld 10) für Mercators Atlas, Sternkarte (Sonne = Gold, Mond = Silber) für das Rezept des Goldmachers.
KEEP_OLD |= {'neutral_22', 'neutral_35', 'nostradamus_3'}
# Spielsteine, die keine Karte und keine Fähigkeit ruft: kein Bild bestellen.
UNUSED = {'stoneguard'}
# Teil 4 kam beschädigt an: laut Manifest erzeugt, Datei fehlt (Briefing, Abschnitt 8).
LOST_T4 = {'perikles_7', 'perikles_8', 'perikles_9', 'pioneer', 'citizen', 'parthenos'}
# Schlachtfeld-Tische (Feld image in model/cosmetics.js).
BOARDS = ['board', 'board-athen', 'board-kapitol', 'board-skriptorium', 'board-porzellan']
# Gemalte Oberfläche (AP A.2): Name → (Quelle, Breite in px). Das Spiel zeichnet diese Bilder statt der Zeichenfunktion
# mit der Kennung ASTRA: <name>; fehlt ein Bild, bleibt die Zeichnung. Ziel: quellcode/assets/game/assets/ui/<name>.webp.
T1, T3 = 'Teil1/assets', 'Teil3/assets'
BACKS = ['chroniken', 'tempel', 'sparta', 'pharao', 'runen', 'sterne', 'lilien', 'zen']
UI = {
    **{f'kartenruecken-{b}': (f'{T1}/cardbacks/kartenruecken-{b}.webp', 400) for b in BACKS},
    **{f'kartenrahmen-{t}-{v}': (f'{T1}/ui-art/kartenrahmen-{t}-{v}.png', 600)
       for t in ['minion', 'spell', 'building'] for v in ['normal', 'gold']},
    **{f'chronikleiste-{p}': (f'{T3}/ui-art/chronikleiste-{p}.png', 280) for p in ['oben', 'mitte', 'unten']},
    'stundenglas': (f'{T1}/ui-art/stundenglas.png', 280),
    'versiegelte-befehle': (f'{T1}/ui-art/versiegelte-befehle.png', 160),
    'waffenablage': (f'{T1}/ui-art/waffenablage.png', 320),
    'schildwall': (f'{T1}/ui-art/schildwall.png', 480),
    'giftphiole': (f'{T1}/ui-art/giftphiole.png', 128),
    'vermaechtnis-urne': (f'{T1}/ui-art/vermaechtnis-urne.png', 144),
    'kartenpaket': (f'{T1}/ui-art/kartenpaket.png', 680),
    'praesentationspodest': (f'{T1}/ui-art/praesentationspodest.png', 1000),
    'kartenbuch': (f'{T1}/ui-art/kartenbuch.png', 1539),
    'startbefehle': (f'{T1}/ui-art/startbefehle.png', 480),
    # Rückmeldung zu 1.22.0: Astras zwei Hälften passen nicht zueinander (andere Rundung, Platten, Scharniere) und standen mit
    # Wand dazwischen. Beide Flügel kommen jetzt aus der rechten Hälfte, ohne leeren Rand, der linke gespiegelt – so treffen
    # sich die Steinleisten an der Naht und die Tür schließt symmetrisch.
    'steinplatten-links': (f'{T1}/ui-art/steinplatten-rechts.png', 780, 'gespiegelt'),
    'steinplatten-rechts': (f'{T1}/ui-art/steinplatten-rechts.png', 780, 'beschnitten'),
}
# Vektorbilder, die unverändert nach assets/ui/ kommen (heute nur die Währungen; die übrigen flachen Vektoren aus Teil 1
# sind schlichter als die Zeichnungen im Spiel und bleiben ungenutzt, siehe README AP A.2).
SVG = {'waehrung-gold': f'{T1}/ui/waehrung-gold.svg', 'waehrung-staub': f'{T1}/ui/waehrung-staub.svg',
       'waehrung-pakete': f'{T1}/ui/waehrung-pakete.svg'}
# Gemalte Hintergründe nach assets/art/: Name → (Quelle, Qualität). Das Hauptmenü ist Astras Neufassung des Konzeptbilds in
# derselben Geometrie (2602 × 1084, deckungsgleich überblendet) – die Trefferflächen in view/hall.js bleiben gültig.
BACKGROUNDS = {'menu': (f'{T1}/backgrounds/menu.webp', 80), 'bg-basar': (f'{T1}/backgrounds/basar.webp', 80),
               'bg-sammlung': (f'{T1}/backgrounds/sammlung.webp', 80), 'bg-pakete': (f'{T1}/backgrounds/pakete.webp', 80),
               'bg-heldengalerie': (f'{T1}/backgrounds/heldengalerie.webp', 80),
               'hall-aeterna': ('Teil1/game-assets/art/hall-aeterna.webp', 90)}
# Alte Atlanten aus werkzeuge/bilder_webp.py, die nur Kartenbilder enthalten: fallen weg, wenn keine Karte mehr zeigt.
OLD_CARD_ATLASES = ['leonidas', 'hypatia', 'imhotep', 'dandolo', 'khan', 'boudicca', 'nostradamus', 'jeanne',
                    'ragnar', 'musashi', 'neutral0', 'neutral1', 'neutral2', 'neutral3']


def game():
    js = ("const D=require(process.argv[1]);console.log(JSON.stringify({"
          "cards:D.cards.map(c=>({id:c.id,name:c.name,owner:D.eraOf(c),art:c.art})),"
          "tokens:Object.values(D.tokens).map(c=>({id:c.id,name:c.name,owner:'Spielstein',art:c.art})),"
          "heroes:D.heroes.map(h=>({id:h.id,name:h.name}))}))")
    out = subprocess.run(['node', '-e', js, os.path.join(GAME, 'model/data.js')], check=True, capture_output=True, text=True)
    return json.loads(out.stdout)


def collect():
    found = {}
    for folder, ext in FOLDERS:
        path = os.path.join(NEU, folder)
        if os.path.isdir(path):
            for f in sorted(os.listdir(path)):
                if f.endswith(ext):
                    found[f[:-len(ext)]] = os.path.join(folder, f)
    for entry in json.load(open(os.path.join(NEU, RESCUED), encoding='utf-8')):
        found.setdefault(entry['id'], entry['source_file'])
    for i, f in BAIBARS.items():
        found[i] = 'gerettet_2te/' + f
    return found


def square(path, size):
    im = Image.open(os.path.join(NEU, path))
    im.load()
    im = im.convert('RGB')
    if im.width != im.height:
        s = min(im.size)
        im = im.crop(((im.width - s) // 2, (im.height - s) // 2, (im.width + s) // 2, (im.height + s) // 2))
    return im.resize((size, size), Image.LANCZOS)


def atlas(name, paths, size):
    sheet = Image.new('RGB', (size * 4, size * 3), (114, 89, 56))
    for i, p in enumerate(paths):
        sheet.paste(square(p, size), (i % 4 * size, i // 4 * size))
    sheet.save(os.path.join(ART, name + '.webp'), 'WEBP', quality=QUALITY, method=6)


def ui_images():
    """Schreibt die Oberflächenbilder und liefert Name → [Breite, Höhe] sowie die Bildfenster der Kartenrahmen."""
    out = os.path.join(GAME, 'assets/ui')
    os.makedirs(out, exist_ok=True)
    sizes = {}
    for name, (src, width, *how) in UI.items():
        im = Image.open(os.path.join(NEU, src))
        im.load()
        im = im.convert('RGBA' if 'A' in im.getbands() else 'RGB')
        if how:
            im = im.crop(im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox())
            if how[0] == 'gespiegelt':
                im = ImageOps.mirror(im)
        h = round(im.height * width / im.width)
        im.resize((width, h), Image.LANCZOS).save(os.path.join(out, name + '.webp'), 'WEBP', quality=88, method=6)
        sizes[name] = [width, h]
    for name, src in SVG.items():
        shutil.copyfile(os.path.join(NEU, src), os.path.join(out, name + '.svg'))
    # Bildfenster je Rahmen aus Astras Clipmasken (Teil 3), umgerechnet auf die Karte von 200 × 282.
    windows = {}
    for a in json.load(open(os.path.join(NEU, 'Teil3/ASSET_MANIFEST.json'), encoding='utf-8'))['assets']:
        if a.get('aperture_bbox'):
            (w, h), (x0, y0, x1, y1) = a['size'], a['aperture_bbox']
            key = a['id'].replace('kartenrahmen-', '').replace('-clip', '')
            windows[key] = [round(x0 * 200 / w, 1), round(y0 * 282 / h, 1), round(x1 * 200 / w, 1), round(y1 * 282 / h, 1)]
    for name, (src, quality) in BACKGROUNDS.items():
        Image.open(os.path.join(NEU, src)).convert('RGB').save(os.path.join(ART, name + '.webp'), 'WEBP', quality=quality, method=6)
    return sizes, windows


def write_map(cards, heroes, ui, windows):
    rows = lambda d: ',\n'.join(f'  {json.dumps(k) if "-" in k else k}:{json.dumps(v)}' for k, v in d.items())
    text = ('// Erzeugt von werkzeuge/astra_bilder.py aus ungenutzte_assets/neue_astra_assets/ – nicht von Hand ändern.\n'
            '// Gemalte Astra-Bilder (AP A.1): Karte oder Spielstein → [Atlas, Feld], Held → [Atlas, Feld].\n'
            '// data.js legt das über die Karten und Helden. Oberfläche (AP A.2): ui = Bild → [Breite, Höhe] in assets/ui/,\n'
            '// windows = Bildfenster der Kartenrahmen [links, oben, rechts, unten] auf der Karte von 200 × 282.\n'
            "(function(root){'use strict';\nconst api={cards:{\n" + rows(cards) + '\n},heroes:{\n' + rows(heroes) +
            '\n},ui:{\n' + rows(ui) + '\n},windows:{\n' + rows(windows) + "\n}};\nif(typeof module!=='undefined')module.exports=api;else root.CHB=api;\n"
            "})(typeof globalThis!=='undefined'?globalThis:this);\n")
    open(os.path.join(GAME, 'model/bilder.js'), 'w', encoding='utf-8').write(text)


def briefing():
    """Motivzeilen aus PRODUKTIONSBRIEFING.md: ID → (Gruppe, Kontext, Name, Motiv, Reihenfolge)."""
    rows, group, context = {}, '', ''
    for line in open(os.path.join(NEU, 'PRODUKTIONSBRIEFING.md'), encoding='utf-8'):
        line = line.rstrip('\n')
        if line.startswith('## '):
            group, context = {'6': 'Spielsteine', '8': 'Aus Teil 4 wiederbeschaffen',
                              '9': 'Alexandria · Spätantike (Entscheidung 19: neu bestellen)'}.get(line[3], line[3:]), ''
        elif line.startswith('### '):
            group, context = line[4:], ''
        elif line.startswith('**Stil-/Epochenkontext:**'):
            context = line
        elif line.startswith('|'):
            m = re.search(r'assets/(cards|tokens)/([a-z0-9_]+)\.png', line)
            if not m:
                continue
            cells = [c.strip() for c in line.strip('|').split('|')]
            name = cells[0].split('–', 1)[-1].strip().strip('`') if '`' in cells[0] else cells[0]
            group_name = re.sub(r'\s*·\s*\d+ Motive.*$', '', group)
            motif = cells[2] if group.startswith('Alexandria') else cells[-1]  # Abschnitt 9: Motiv, dann Sperrgrund
            rows.setdefault(m.group(2), (group_name, context, name, motif, len(rows)))
    return rows


def main():
    data = game()
    found = collect()
    known = {c['id'] for c in data['cards'] + data['tokens']}
    stray = sorted(set(found) - known)
    if stray:
        sys.exit('Bilder ohne Karte im Spiel: ' + ', '.join(stray))

    # Karten und Spielsteine in Spielreihenfolge, zwölf je Atlas.
    items = [c for c in data['cards'] + data['tokens'] if c['id'] in found]
    for f in os.listdir(ART):
        if f.startswith('astra-karten-'):
            os.remove(os.path.join(ART, f))
    card_map = {}
    for n in range(0, len(items), 12):
        name = f'astra-karten-{n // 12 + 1:02d}'
        chunk = items[n:n + 12]
        atlas(name, [found[c['id']] for c in chunk], CELL)
        for i, c in enumerate(chunk):
            card_map[c['id']] = [name, i]

    heroes = [h['id'] for h in data['heroes']]
    hero_map = {}
    for k, name in enumerate(['heroes', 'heroes2']):
        chunk = heroes[k * 12:(k + 1) * 12]
        atlas(name, [f'Teil1/assets/heroes/{h}.webp' for h in chunk], HERO_CELL)
        for i, h in enumerate(chunk):
            hero_map[h] = [name, i]
    marble = Image.new('RGB', (HERO_CELL * 4, HERO_CELL * 3), (114, 89, 56))
    for f in sorted(os.listdir(os.path.join(NEU, 'Teil1/assets/skins'))):
        h = f.split('-')[0]
        name, i = hero_map[h]
        assert name == 'heroes', 'Skins liegen in heroes-marble und brauchen einen Helden aus heroes.webp'
        marble.paste(square(f'Teil1/assets/skins/{f}', HERO_CELL), (i % 4 * HERO_CELL, i // 4 * HERO_CELL))
    marble.save(os.path.join(ART, 'heroes-marble.webp'), 'WEBP', quality=QUALITY, method=6)

    for name in BOARDS:
        im = Image.open(os.path.join(NEU, f'Teil1/assets/backgrounds/{name}.webp')).convert('RGB')
        im.save(os.path.join(ART, name + '.webp'), 'WEBP', quality=QUALITY, method=6)
        im.resize((480, 240), Image.LANCZOS).save(os.path.join(ART, name + '-preview.webp'), 'WEBP', quality=80, method=6)
    write_map(card_map, hero_map, *ui_images())

    # Was zeigt das Spiel jetzt? Alte Kartenatlanten ohne Karte entfallen.
    now = game()
    used = {c['art'] for c in now['cards'] + now['tokens']}
    for name in OLD_CARD_ATLASES:
        path = os.path.join(ART, name + '.webp')
        if name not in used and os.path.exists(path):
            os.remove(path)
            print('entfernt:', name + '.webp')

    # Stand je ID und der nächste Auftrag an Astra.
    motifs = briefing()
    for n, (i, (g, name, motif)) in enumerate(NEW_MOTIFS.items()):
        motifs.setdefault(i, (g, '', name, motif, 10 ** 5 + n))
    status = {}
    for c in data['cards'] + data['tokens']:
        i = c['id']
        if i in REVISION:
            status[i] = 'Revision'
        elif i in found:
            status[i] = 'eingebaut'
        elif i in BLOCKED:
            status[i] = 'gesperrt'
        elif i in LOST_T4:
            status[i] = 'wiederbeschaffen'
        elif i in KEEP_OLD:
            status[i] = 'altes Bild'
        elif i in UNUSED:
            status[i] = 'unbenutzt'
        else:
            status[i] = 'offen'
    with open(os.path.join(ROOT, 'ungenutzte_assets/ASTRA_STAND.csv'), 'w', encoding='utf-8', newline='') as f:
        w = csv.writer(f, delimiter=';')
        w.writerow(['id', 'name', 'gruppe', 'status', 'quelle'])
        for c in data['cards'] + data['tokens']:
            w.writerow([c['id'], c['name'], c['owner'], status[c['id']], found.get(c['id'], '')])
    auftrag(data, status, motifs, len(items), len({v[0] for v in card_map.values()}))
    counts = {s: list(status.values()).count(s) for s in ['eingebaut', 'Revision', 'altes Bild', 'unbenutzt', 'offen',
                                                          'wiederbeschaffen', 'gesperrt']}
    print(f'{len(items)} Karten und Spielsteine in {len({v[0] for v in card_map.values()})} Atlanten, '
          f'22 Helden, 4 Skins, 5 Tische · Stand: {counts}')


def auftrag(data, status, motifs, done, atlases):
    names = {c['id']: c['name'] for c in data['cards'] + data['tokens']}
    todo = [i for i, s in status.items() if s in ('offen', 'Revision', 'wiederbeschaffen')]
    cards = [i for i in todo if i in {c['id'] for c in data['cards']}]
    tokens = [i for i in todo if i not in cards]
    lines = open(os.path.join(NEU, 'PRODUKTIONSBRIEFING.md'), encoding='utf-8').read().split('\n')
    start = next(n for n, l in enumerate(lines) if l.startswith('## 2.'))
    end = next(n for n, l in enumerate(lines) if l.startswith('## 5.'))
    common = '\n'.join(lines[start:end]).replace('Status ZUORDNEN, WIEDERBESCHAFFEN und GESPERRT nicht als '
                                                  'Generierungsauftrag behandeln.\n', '')
    out = ['# AETERNA – Auftrag an Astra: noch fehlende Kartenbilder', '',
           '*Erzeugt von `werkzeuge/astra_bilder.py` – nicht von Hand ändern. Grundlage: alle Lieferungen in '
           '`ungenutzte_assets/neue_astra_assets/` (Teil 1–6, gerettet, gerettet_2te) und das Produktionsbriefing '
           '(`neue_astra_assets/PRODUKTIONSBRIEFING.md`). Jede Karte mit Status steht in `ASTRA_STAND.csv`.*', '',
           '**Diese Datei ersetzt das alte Produktionsbriefing als Übergabe an die Bild-KI.** Sie enthält nur noch, '
           'was wirklich fehlt; alles Gelieferte ist im Spiel eingebaut und darf nicht erneut erzeugt werden.', '',
           '## 1. Stand', '',
           '| Status | Karten | Spielsteine | Summe |', '|---|---:|---:|---:|']
    allcards = {c['id'] for c in data['cards']}
    for s, text in [('eingebaut', 'Eingebaut (im Spiel)'), ('Revision', 'Eingebaut, Korrektur nötig'),
                    ('altes Bild', 'Altes Bild bleibt (AP L.6) – nicht erzeugen'),
                    ('unbenutzt', 'Im Spiel nie gerufen – nicht erzeugen'), ('offen', 'Neu erzeugen'), ('wiederbeschaffen', 'Teil 4 beschädigt – Original suchen, sonst neu'),
                    ('gesperrt', 'Gesperrt – Zuordnung klären')]:
        k = sum(1 for i, v in status.items() if v == s and i in allcards)
        t = sum(1 for i, v in status.items() if v == s and i not in allcards)
        out.append(f'| {text} | {k} | {t} | **{k + t}** |')
    out += [f'| **Gesamt** | **{len(allcards)}** | **{len(status) - len(allcards)}** | **{len(status)}** |', '',
            f'Im Spiel: {done} Karten und Spielsteine in {atlases} Atlanten, alle 22 Heldenporträts, 4 Marmor-Skins, '
            '5 Schlachtfeld-Tische. Lieferformat ist egal (PNG oder WebP): `werkzeuge/astra_bilder.py` erzeugt daraus '
            'die WebP-Atlanten des Spiels. Bitte weiter **PNG 1024 × 1024** (oder das native Original) liefern, '
            'je Datei genau die ID als Namen, **höchstens 10–12 Bilder je ZIP** – große ZIPs sind mehrfach abgebrochen.', '',
            common, '']

    def section(title, ids, intro):
        out.extend([title, '', intro, ''])
        group = None
        ids = sorted(ids, key=lambda i: motifs.get(i, ('',) * 4 + (10 ** 6,))[4])
        for i in ids:
            g, ctx, name, motif, _ = motifs.get(i, ('Ohne Vorlage', '', names[i], '', 0))
            if g != group:
                group = g
                out.extend(['', f'### {g}', ''])
                if ctx:
                    out.extend([ctx, ''])
                out.extend(['| ID | Name | Status | Konkretes Motiv und Komposition |', '|---|---|---|---|'])
            note = {'Revision': 'Revision: ' + REVISION.get(i, ''), 'wiederbeschaffen': 'Original aus Teil 4 '
                    'suchen; nur wenn verloren, neu erzeugen'}.get(status[i], 'neu')
            out.append(f'| `{i}` | {names[i]} | {note} | {motif} |')
        out.append('')

    section(f'## 5. Kartenillustrationen: {len(cards)}', cards,
            'Profil **K1**: PNG, 1024 × 1024 px, 1:1, deckend, sRGB; Dateiname `<ID>.png`.')
    section(f'## 6. Spielsteine: {len(tokens)}', tokens,
            'Profil **T1**: wie K1, Hauptfigur größer, Hintergrund ruhiger; vollständige Szene, kein Freisteller.')
    if BLOCKED:
        out += ['## 7. Gesperrt – erst klären, nicht erzeugen', '']
        out += [f'- `{i}` {names[i]}: ' + motifs.get(i, ('', '', '', '', 0))[3] for i in sorted(BLOCKED)] + ['']
    open(os.path.join(ROOT, 'ungenutzte_assets/ASTRA_AUFTRAG.md'), 'w', encoding='utf-8').write('\n'.join(out))


if __name__ == '__main__':
    main()
