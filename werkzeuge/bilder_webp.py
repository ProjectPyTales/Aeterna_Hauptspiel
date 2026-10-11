"""Asset-Pipeline (AP 2.2): erzeugt die Bilder des Spiels als WebP aus den Originalen.

Quelle: ungenutzte_assets/archiviert/art-original/*.png (PNG- oder JPEG-Daten, so wie sie bis 1.11.0 im Spiel lagen),
Ziel:   quellcode/assets/game/assets/art/*.webp

Die Größen richten sich nach der größten Darstellung im Spiel:
- Kartenatlanten (4 × 3 Felder à 362 px), Heldenatlanten, Spielfelder, Hauptmenü und Basar bleiben in voller Größe –
  ein Atlasfeld erscheint in der Großansicht (Sammlung, Kartendetail) etwa in Originalgröße.
- Der Lorbeerrahmen der Legendären wird höchstens 384 px breit gezeichnet (Karte 200 px breit, Rahmen 192 px,
  größte Karte 2×) und deshalb auf die Hälfte verkleinert; das spart auch Rechenzeit bei jedem Kartenbild.

Seit 1.21.0 (AP A.1) erzeugt werkzeuge/astra_bilder.py die gemalten Astra-Bilder (Kartenatlanten, Helden, Skins,
Tische). Dieses Werkzeug überspringt sie und erzeugt alte Kartenatlanten nur, solange noch eine Karte darauf zeigt
(die WebP-Datei existiert).

Aufruf: python3 werkzeuge/bilder_webp.py            (alle Bilder neu erzeugen und Größen ausgeben)
Benötigt: Pillow mit WebP (python3 -c "from PIL import features; print(features.check('webp'))")
"""
import os
import sys

from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SRC = os.path.join(ROOT, 'ungenutzte_assets/archiviert/art-original')
DST = os.path.join(ROOT, 'quellcode/assets/game/assets/art')

QUALITY = 85
# Abweichungen je Bild: (Qualität, Verkleinerungsfaktor)
SPECIAL = {
    'legendary-frame': (88, 0.5),   # mit Transparenz, klein gezeichnet
    'hall-aeterna': (90, 1),        # Hauptmenü: das Aushängeschild, etwas höhere Qualität
    'menu': (80, 1),                # Bühnenhintergrund unter den Untermenüs, meist verdeckt
    'temple': (80, 1),              # Basar-Hintergrund unter dunkler Lasur
}
# Von werkzeuge/astra_bilder.py ersetzt (AP A.1).
ASTRA = {'board', 'board-preview', 'heroes', 'heroes-marble'}
CARD_ATLASES = {'leonidas', 'hypatia', 'imhotep', 'dandolo', 'khan', 'boudicca', 'nostradamus', 'jeanne', 'ragnar',
                'musashi', 'neutral0', 'neutral1', 'neutral2', 'neutral3'}


def convert(name):
    quality, scale = SPECIAL.get(name, (QUALITY, 1))
    im = Image.open(os.path.join(SRC, name + '.png'))
    im.load()
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGBA' if 'transparency' in im.info else 'RGB')
    if scale != 1:
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    target = os.path.join(DST, name + '.webp')
    im.save(target, 'WEBP', quality=quality, method=6, exact=False)
    return im.size, os.path.getsize(os.path.join(SRC, name + '.png')), os.path.getsize(target)


def main():
    os.makedirs(DST, exist_ok=True)
    names = sorted(f[:-4] for f in os.listdir(SRC) if f.endswith('.png'))
    names = [n for n in names if n not in ASTRA and (n not in CARD_ATLASES or os.path.exists(os.path.join(DST, n + '.webp')))]
    before = after = 0
    for name in names:
        size, a, b = convert(name)
        before += a
        after += b
        print(f'{name:24} {size[0]:>4} × {size[1]:<4} {a / 1e6:6.2f} MB → {b / 1e6:5.2f} MB')
    print(f'{len(names)} Bilder: {before / 1e6:.1f} MB → {after / 1e6:.1f} MB')


if __name__ == '__main__':
    sys.exit(main())
