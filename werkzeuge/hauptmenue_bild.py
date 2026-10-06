"""Erzeugt den Hauptmenü-Hintergrund aus dem textfreien Konzeptbild (AP 1.3).

Das Konzeptbild ist 2000 × 1116 (≈ 16:9), die Bühne 2:1. Oben werden 24 px und unten 8 px
abgeschnitten (nur Wand über dem Mäanderfries bzw. unter dem Ring). Links und rechts wird das
Bild auf 2:1 verbreitert (je 84 px innerhalb der Bühne) und darüber hinaus bis 2,4:1 für die
Ränder breiter Handys (je 217 px, nur dort sichtbar):

* innerhalb der Bühne: gespiegelte Fortsetzung der Wand, Fugen und Balken; oben rechts wird
  das angeschnittene Zahnrad durch eine Drehung um seine eigene Achse ergänzt, damit der
  Zahnrad-Knauf nicht doppelt erscheint;
* außerhalb der Bühne: gestreckte, weichgezeichnete und abgedunkelte Randstreifen.

Ergebnis: JPEG-Daten mit .png-Endung (die App-Hülle liefert Bilder nur als .png aus).
Sobald eine höher aufgelöste oder breitere Fassung vorliegt (AP 1.2), dieses Skript mit der
neuen Datei erneut ausführen und die Geometrie in app.js (HALL_ART) prüfen.

Aufruf: python3 werkzeuge/hauptmenue_bild.py [konzept.jpg] [ziel.png]
Benötigt: pip install pillow numpy
"""
import sys

import numpy as np
from PIL import Image, ImageFilter

SRC = 'ungenutzte_assets/ui/hauptmenue-konzept.jpg'
DST = 'quellcode/assets/game/assets/art/hall-aeterna.png'
TOP, BOTTOM = 24, 8          # abgeschnittene Zeilen
INNER, OUTER = 84, 217       # Verbreiterung je Seite: in der Bühne / nur auf breiten Handys
COG = (1913.5, 87.5)         # Achse des angeschnittenen Zahnrads oben rechts
SEAM = 12                    # Überblendung an der rechten Bildkante
PLAQUE_ROWS = (380, 420)     # bis hierher hängt links die Titeltafel
COG_ROWS = (230, 290)        # Übergang Zahnrad-Ergänzung → gespiegelte Wand


def bilinear(a, xs, ys):
    """Bilineares Abtasten von a an Gleitkomma-Koordinaten (gleich geformte Arrays)."""
    h, w = a.shape[:2]
    xs, ys = np.clip(xs, 0, w - 1.001), np.clip(ys, 0, h - 1.001)
    x0, y0 = np.floor(xs).astype(int), np.floor(ys).astype(int)
    fx, fy = (xs - x0)[..., None], (ys - y0)[..., None]
    return (a[y0, x0] * (1 - fx) * (1 - fy) + a[y0, x0 + 1] * fx * (1 - fy)
            + a[y0 + 1, x0] * (1 - fx) * fy + a[y0 + 1, x0 + 1] * fx * fy)


def build(src):
    a = np.asarray(src.convert('RGB')).astype(np.float32)
    full_h, w = a.shape[:2]
    a = a[TOP:full_h - BOTTOM]
    h = a.shape[0]
    rows = np.arange(h, dtype=np.float32)[:, None]

    # Innen links: Spiegelung an x = 0. Neben der Titeltafel (ab x = 55) pendelt die Spiegelung
    # nur über die ersten 46 Spalten, sonst erschiene ein zweiter Tafelrand.
    k = np.arange(1, INNER + 1, dtype=np.float32)[None, :]
    plain = np.broadcast_to(k - 1, (h, INNER))
    period = 46
    pingpong = np.where(plain % (2 * period) < period, plain % period, period - 1 - plain % period)
    t = np.clip((rows + TOP - PLAQUE_ROWS[0]) / (PLAQUE_ROWS[1] - PLAQUE_ROWS[0]), 0, 1)[..., None]
    left = (bilinear(a, pingpong, np.broadcast_to(rows, (h, INNER))) * (1 - t)
            + bilinear(a, plain, np.broadcast_to(rows, (h, INNER))) * t)[:, ::-1]

    # Innen rechts: Spiegelung an x = w, oben ersetzt durch das um 90° gedrehte Zahnrad.
    # Die Drehung beginnt schon SEAM Spalten vor der Bildkante und wird dort eingeblendet.
    n = INNER + SEAM
    k = np.arange(1, n + 1, dtype=np.float32)[None, :]
    tx = np.broadcast_to(w - 1 - SEAM + k, (h, n))
    ty = np.broadcast_to(rows + TOP, (h, n))  # in Koordinaten des Konzeptbilds
    mirror = bilinear(a, np.minimum(tx, 2 * w - 1 - tx), ty - TOP)
    dx, dy = tx - COG[0], ty - COG[1]
    turned = bilinear(a, COG[0] - dy, COG[1] + dx - TOP)
    # Die untere Zahnradhälfte liegt im Schatten: Helligkeit an der Naht angleichen.
    band = slice(0, COG_ROWS[0] - TOP)
    gain = a[band, w - SEAM:w].mean() / turned[band, :SEAM].mean()
    turned *= gain
    t = np.clip((ty - COG_ROWS[0]) / (COG_ROWS[1] - COG_ROWS[0]), 0, 1)[..., None]
    right = turned * (1 - t) + mirror * t
    fade = np.clip(np.arange(n, dtype=np.float32) / SEAM, 0, 1)[None, :, None]
    a[:, w - SEAM:] = a[:, w - SEAM:] * (1 - fade[:, :SEAM]) + right[:, :SEAM] * fade[:, :SEAM]
    right = right[:, SEAM:]

    inner = np.concatenate([left, a, right], axis=1)
    iw = inner.shape[1]

    # Leichte Randabdunklung zur Bühnenkante hin, damit die Ergänzung nicht ins Auge springt.
    ramp = np.ones(iw, dtype=np.float32)
    edge = np.linspace(0.88, 1.0, INNER, dtype=np.float32)
    ramp[:INNER], ramp[-INNER:] = edge, edge[::-1]
    inner *= ramp[None, :, None]

    # Außen: gestreckte Randspalten, weichgezeichnet und abgedunkelt.
    def outer(col, flip):
        strip = np.repeat(col, OUTER, axis=1)
        img = Image.fromarray(strip.clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(6))
        s = np.asarray(img).astype(np.float32) * np.linspace(0.78, 0.30, OUTER, dtype=np.float32)[None, :, None]
        return s[:, ::-1] if flip else s
    out = np.concatenate([outer(inner[:, :4].mean(1, keepdims=True), True), inner,
                          outer(inner[:, -4:].mean(1, keepdims=True), False)], axis=1)
    return Image.fromarray(out.clip(0, 255).astype(np.uint8))


if __name__ == '__main__':
    src, dst = (sys.argv[1:3] + [SRC, DST][len(sys.argv[1:3]):])[:2]
    img = build(Image.open(src))
    img.save(dst, 'JPEG', quality=86, optimize=True)
    print(dst, img.size)
