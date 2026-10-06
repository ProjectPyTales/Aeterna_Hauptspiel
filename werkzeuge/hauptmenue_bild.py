"""Erzeugt den Hauptmenü-Hintergrund aus dem textfreien Konzeptbild (AP 1.3).

Das Konzeptbild ist 2000 × 1116 (≈ 16:9), die Bühne 2:1. Oben werden 24 px und unten 8 px
abgeschnitten (nur Wand über dem Mäanderfries bzw. unter dem Ring). Links und rechts wird das
Bild auf 2:1 verbreitert (je 84 px innerhalb der Bühne) und darüber hinaus bis 2,4:1 für die
Ränder breiter Handys (je 217 px, nur dort sichtbar).

Innerhalb der Bühne wird nichts gespiegelt – Spiegelungen erzeugten symmetrische Flecken auf
der Wand und eine Kerbe im Zahnrad (Rückmeldung zu 1.4.0):

* Wand: jede Steinlage (zwischen zwei waagerechten Fugen) wird waagerecht versetzt fortgesetzt.
  Der Versatz ist so gewählt, dass die Kopie an der Bildkante am besten passt und keine
  Medaillons, Ketten oder das Zahnrad mitnimmt. Über der obersten Fuge greift die Ergänzung
  fugenfreie Steinfläche einer tieferen Lage ab; links läuft der Mäanderfries periodisch weiter.
* Zahnrad oben rechts: Speichenkranz um 2 × 45° und Zahnkranz um 4 Zähne gedreht, getrennt an
  einem glatten Ring; die Winkel sind an der Bildkante gemessen. Zwischen den Zähnen zeigt sich
  die ergänzte Wand mit weichem Schlagschatten.
* Naht: Schnitt geringster Abweichung durch einen 32 px breiten Überlappungsstreifen (wie beim
  Image Quilting) und zeilenweiser Helligkeitsausgleich, der nach außen ausklingt.

Außerhalb der Bühne: gestreckte, weichgezeichnete und abgedunkelte Randstreifen.

Ergebnis: JPEG-Daten mit .png-Endung (die App-Hülle liefert Bilder nur als .png aus).
Sobald eine höher aufgelöste oder breitere Fassung vorliegt (AP 1.2), dieses Skript mit der
neuen Datei erneut ausführen und die Geometrie in hall.js (ART) prüfen.

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
OV = 32                      # Überlappung an der Bildkante für den Nahtschnitt
JOINTS = (324, 548, 668, 768, 888, 988)   # waagerechte Fugen, an beiden Rändern gleich
MIN_SHIFT = 120              # kleinster Versatz einer Steinlage
# Was nie in die Ergänzung kopiert werden darf (Konzept-Pixel x0, y0, x1, y1).
KEEP_OUT = [(55, 0, 560, 380), (95, 300, 560, 470),            # Titeltafel, Ketten
            (490, 0, 1505, 1116),                                # Ring mit Platten
            (451, 630, 623, 802), (561, 851, 733, 1023),       # Medaillons links
            (1369, 630, 1541, 802), (1260, 850, 1432, 1022),   # Medaillons rechts
            (1650, 0, 2000, 262)]                                # Goldanzeige und Zahnrad
FRIEZE, MEANDER = (20, 106), 38       # Mäanderfries oben links: Zeilen, Periode
COG = (1913.5, 87.5)         # Achse des angeschnittenen Zahnrads oben rechts
TURN_TEETH, TURN_SPOKES = 99.5, 89.5  # vier Zähne bzw. zwei Speichen weiter (an der Kante gemessen)
R_SPLIT, R_OUT = 124, 172    # glatter Ring zwischen Speichen und Zahnkranz, Außenradius
DARK = 82                    # Kontur des Zahnrads (Helligkeit)


def bilinear(a, xs, ys):
    """Bilineares Abtasten von a an Gleitkomma-Koordinaten (gleich geformte Arrays)."""
    h, w = a.shape[:2]
    xs, ys = np.clip(xs, 0, w - 1.001), np.clip(ys, 0, h - 1.001)
    x0, y0 = np.floor(xs).astype(int), np.floor(ys).astype(int)
    fx, fy = (xs - x0)[..., None], (ys - y0)[..., None]
    return (a[y0, x0] * (1 - fx) * (1 - fy) + a[y0, x0 + 1] * fx * (1 - fy)
            + a[y0 + 1, x0] * (1 - fx) * fy + a[y0 + 1, x0 + 1] * fx * fy)


def blur(m, r):
    img = Image.fromarray((np.clip(m, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))
    return np.asarray(img).astype(np.float32) / 255


def wall(a, flipped):
    """Wand rechts neben der Kante von a (Breite OV + INNER, alle Zeilen)."""
    h, w = a.shape[:2]
    out = np.zeros((h, OV + INNER, 3), np.float32)
    cols = np.arange(w - OV, w + INNER)
    to_concept = (lambda x: w - 1 - x) if flipped else (lambda x: x)

    def free(y0, y1, d):
        xa, xb = sorted((to_concept(w - OV - d), to_concept(w + INNER - 1 - d)))
        return not any(xa < bx1 and xb > bx0 and y0 < by1 and y1 > by0 for bx0, by0, bx1, by1 in KEEP_OUT)

    rows = JOINTS + (h,)
    for y0, y1 in zip(rows[:-1], rows[1:]):
        edge = a[y0:y1, w - OV:w]
        # Gewählt wird die Quelle, die an der Kante am besten passt (mindestens MIN_SHIFT entfernt,
        # damit kein Stein direkt neben sich selbst wiederkehrt); ihre Farbe wird behutsam angeglichen.
        cost = lambda d: ((a[y0:y1, w - OV - d:w - d] - edge) ** 2).mean()
        d = min((d for d in range(MIN_SHIFT, w - OV) if free(y0, y1, d)), key=cost)
        gain = np.clip(edge.mean((0, 1)) / a[y0:y1, w - OV - d:w - d].mean((0, 1)), .7, 1.3)
        out[y0:y1] = a[y0:y1, cols - d] * gain
    # Über der obersten Fuge: fugenfreie Steinfläche der Lage darunter. Ab Zeile 106 eine Lage
    # tiefer (die Fuge darüber fiele auf Zeile 100, unter den Fries), darüber 330 Zeilen tiefer.
    j, course, cut = JOINTS[0], JOINTS[1] - JOINTS[0], FRIEZE[1]
    top = out[j + 6:j + 6 + cut + 20].copy()
    out[cut:j] = out[cut + course:j + course]
    t = np.linspace(0, 1, 20, dtype=np.float32)[:, None, None]
    out[cut:cut + 20] = top[cut:] * (1 - t) + out[cut:cut + 20] * t
    out[:cut] = top[:cut]
    if flipped:
        # Links oben läuft der Mäanderfries periodisch weiter.
        f0, f1 = FRIEZE
        src = (w - 40) + (cols - (w - 40)) % MEANDER
        out[f0:f1] = a[f0:f1, src]
    return out


def gear(a):
    """Zahnrad rechts der Kante: Farbe und Deckkraft (1 = Zahnrad, 0 = Wand dahinter)."""
    h, w = a.shape[:2]
    ys, xs = np.mgrid[0:h, w - OV:w + INNER].astype(np.float32)
    dx, dy = xs - COG[0], ys - COG[1]
    r, th = np.hypot(dx, dy), np.arctan2(dy, dx)

    def turn(deg):
        t = th + np.deg2rad(deg)
        return bilinear(a, COG[0] + r * np.cos(t), COG[1] + r * np.sin(t))
    k = np.clip((r - R_SPLIT + 3) / 6, 0, 1)[..., None]
    g = turn(TURN_SPOKES) * (1 - k) + turn(TURN_TEETH) * k
    # Wand ist, was von außen erreichbar ist, ohne die dunkle Kontur des Zahnrads zu kreuzen.
    def grow(b):
        o = b.copy()
        o[1:] |= b[:-1]
        o[:-1] |= b[1:]
        o[:, 1:] |= b[:, :-1]
        o[:, :-1] |= b[:, 1:]
        return o
    dark, outside = grow(g.mean(2) < DARK), r >= R_OUT
    while True:
        grown = grow(outside) & ~dark | outside
        if (grown == outside).all():
            break
        outside = grown
    return g, blur(~outside, 0.7)


def seam(o, c):
    """Schnitt geringster Abweichung von oben nach unten: 0 = Original, 1 = Ergänzung."""
    e = ((o - c) ** 2).sum(2)
    h, n = e.shape
    acc = e.copy()
    for y in range(1, h):
        p = acc[y - 1]
        acc[y] += np.minimum(p, np.minimum(np.r_[np.inf, p[:-1]], np.r_[p[1:], np.inf]))
    path = np.zeros(h, int)
    path[-1] = int(acc[-1].argmin())
    for y in range(h - 2, -1, -1):
        lo = max(0, path[y + 1] - 1)
        path[y] = lo + int(acc[y, lo:path[y + 1] + 2].argmin())
    return np.clip((np.arange(n)[None, :] - path[:, None] + 1.5) / 3, 0, 1)[..., None]


def extend(a, flipped=False):
    """Bild a nach rechts um INNER Spalten ergänzen; liefert (Kante, Ergänzung)."""
    w = a.shape[1]
    comp = wall(a, flipped)
    if not flipped:
        g, m = gear(a)
        sel = m[:, :OV] > .9
        g = g * (a[:, w - OV:w][sel].mean(0) / g[:, :OV][sel].mean(0))
        shadow = np.zeros_like(m)
        shadow[6:] = m[:-6]
        comp = comp * (1 - .28 * blur(shadow, 5)[..., None] * (1 - m[..., None]))
        comp = g * m[..., None] + comp * (1 - m[..., None])
    # Helligkeitsausgleich: Abweichung an der Kante (zeilenweise geglättet) klingt nach außen aus.
    diff = (a[:, w - OV:w - 2] - comp[:, :OV - 2]).mean(1)
    k = np.exp(-(np.arange(-40, 41) / 16.0) ** 2)
    diff = np.stack([np.convolve(np.pad(diff[:, c], 40, mode='edge'), k / k.sum(), 'valid') for c in range(3)], 1)
    comp = comp + diff[:, None, :] * np.clip(1 - (np.arange(comp.shape[1]) - OV) / 70, 0, 1)[None, :, None]
    t = seam(a[:, w - OV:], comp[:, :OV])
    return a[:, w - OV:] * (1 - t) + comp[:, :OV] * t, comp[:, OV:]


def build(src):
    a = np.asarray(src.convert('RGB')).astype(np.float32)
    edge_r, right = extend(a)
    edge_l, left = extend(a[:, ::-1].copy(), flipped=True)
    a[:, a.shape[1] - OV:] = edge_r
    a[:, :OV] = edge_l[:, ::-1]
    inner = np.concatenate([left[:, ::-1], a, right], axis=1)[TOP:a.shape[0] - BOTTOM]
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
