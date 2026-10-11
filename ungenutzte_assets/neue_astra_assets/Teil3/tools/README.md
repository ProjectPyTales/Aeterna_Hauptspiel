# Technische Erzeugungsrezepte

`build_ui.py` dokumentiert die Erstellung der neuen nativen UI-Zustände, Alpha-Masken, Ausschnitte, Android-XML und Atlanten. `finish_ui.py` erzeugt Vorschauen und Katalog, prüft die Dateien und packt die ZIP. Die handgeschriebenen Markdown-Anleitungen und `integration/ui-r03.js` sind separate Lieferdateien; die Skripte erzeugen sie nicht erneut.

Voraussetzungen: Python mit Pillow, NumPy und SciPy; Node mit Sharp. Keine Bildgenerierungs-API und kein Netzwerk erforderlich.

Die Skripte akzeptieren als erstes Argument einen absoluten Arbeitsordner. Darin müssen die Archive bereits unter `input/Chronicle_of_Heroes_Assets_Teil_01/Chronicle_of_Heroes_Assets_Teil_01/` und entsprechend Teil 02 extrahiert sein; die vier unveränderten ZIPs liegen unter `upload/`. `work/` muss existieren. Ausgabe: `output/Chronicle_of_Heroes_Assets_Teil_03/`.

Vor einer Wiederholung dieses ausgelieferte Paket mitsamt Anleitungen in genau diesen Ausgabeordner kopieren. Dann erst `python tools/build_ui.py /absoluter/arbeitsordner` und anschließend `python tools/finish_ui.py /absoluter/arbeitsordner` ausführen. In einer separaten Arbeitskopie arbeiten, da Dateien im Ausgabeordner aktualisiert werden. Die Originalarchive und das Spiel werden nicht beschrieben.
