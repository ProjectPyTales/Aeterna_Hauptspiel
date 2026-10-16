"""Entwickler-Splash (1.26.0): PY'TALES-Animation aus dem Originalvideo als animiertes WebP für den Start.

Das Original (ungenutzte_assets/entwicklersplash/pytales-animation-hd.mp4, 1920 × 1080, 50 s, ohne Ton) ist eine
Ruheschleife aus drei Posen im Wechsel A B C B, je 125 ms. Für den Start reicht diese eine Schleife: ein Ausschnitt
von 480 × 480 um die Bildmitte, verlustfrei. Die Seite legt das Bild mittig auf das Grau des Videos (#2c2c2c) und skaliert
es wie das Video im Vollbild (view/css/intro.css) – so sieht es aus wie das Video.
Seit 1.27.0 mit Transparenz: Der Hintergrund des Videos ist überall #2c2c2c (±7 durch die Kompression), die dunkelste
Farbe der Figur liegt 18 Stufen davon entfernt und ihr Rand ist ein heller Umriss ohne Kantenglättung zum Grau. Darum wird
jedes Pixel mit höchstens 7 Stufen Abstand durchsichtig (auch die Löcher in P und A) – beim Ausblenden auf Schwarz bleibt
kein graues Quadrat stehen.

Aufruf: python3 werkzeuge/entwicklersplash.py   (benötigt ffmpeg, Pillow und numpy)
"""
import os, subprocess, tempfile
import numpy as np
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SOURCE = os.path.join(ROOT, 'ungenutzte_assets/entwicklersplash/pytales-animation-hd.mp4')
TARGET = os.path.join(ROOT, 'quellcode/assets/game/assets/intro/pytales.webp')
CROP = (720, 300, 1200, 780)   # 480 × 480 um die Bildmitte (960, 540); die Figur liegt bei x 733–1129, y 315–764
FRAME_MS = 125                 # drei Posen bei 8 Bildern/s
BACKGROUND, KEY = 44, 7        # Grau des Videos und Toleranz für Durchsichtigkeit


def frames():
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['ffmpeg', '-v', 'error', '-i', SOURCE, '-frames:v', '8', '-vsync', '0',
                        os.path.join(tmp, 'f%02d.png')], check=True)
        return [transparent(Image.open(os.path.join(tmp, f'f{i:02d}.png')).convert('RGB').crop(CROP)) for i in range(1, 9)]


def transparent(im):
    rgb = np.asarray(im, np.int16)
    gap = np.abs(rgb - BACKGROUND).max(axis=2)
    alpha = np.where(gap <= KEY, 0, 255).astype(np.uint8)
    rgba = np.dstack([rgb.astype(np.uint8), alpha])
    rgba[alpha == 0, :3] = BACKGROUND
    return Image.fromarray(rgba, 'RGBA')


def main():
    f = frames()
    # Die Schleife A B C B wiederholt sich alle vier Bilder (geprüft: Bild 4 gleicht Bild 2 bis auf Kompressionsrauschen).
    diff = np.abs(np.asarray(f[1], np.int16) - np.asarray(f[3], np.int16)).mean()
    assert diff < .1, f'Schleife erwartet (A B C B), Abweichung {diff:.3f}'
    loop = [f[0], f[1], f[2], f[3]]
    os.makedirs(os.path.dirname(TARGET), exist_ok=True)
    loop[0].save(TARGET, save_all=True, append_images=loop[1:], duration=FRAME_MS, loop=0, lossless=True, method=6)
    print(TARGET, os.path.getsize(TARGET), 'Bytes')


if __name__ == '__main__':
    main()
