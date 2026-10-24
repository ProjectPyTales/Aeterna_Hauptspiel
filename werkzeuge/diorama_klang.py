"""Erzeugt die Klänge der vier Eck-Dioramen (AP 3.9, seit 1.32.0; prozedural, CC0).

astrolab-1, -2   Astrolabium: das Netz dreht sich mit feinem Ratschen über Messing und endet in einem hellen Ton (≈ 1,1 s)
incense-1, -2    Räuchergefäß: Glut flammt auf (weiches Fauchen) und knistert leise (≈ 1,0 s)
column-1, -2     Säule: Splitter brechen vom Kapitell und rieseln mit Staub auf die Stufen (≈ 0,9 s)
catapult-1, -2   Katapult: Holz knarrt, der Arm schlägt gegen den Querbalken, der Stein landet fern und dumpf (≈ 1,0 s)

Aufruf: python3 diorama_klang.py <zielordner>   (benötigt numpy und ffmpeg)
Gibt je Datei das lauteste 100-ms-Fenster (RMS, dBFS) aus – die Werte stehen in tests/lebendig.test.js.
"""
import os, sys
import numpy as np
from spielgefuehl_klang import SR, biquad, t_of, write
from oberflaeche_klang import loudest

def astrolab(seed):
    rng = np.random.default_rng(seed); t = t_of(1.1); s = np.zeros_like(t)
    # Ratschen: Klicks, die gegen Ende langsamer werden (das Netz läuft aus).
    at = 0.0; k = 0
    while at < .72:
        i = int(at * SR); n = int(SR * .006)
        s[i:i + n] += .35 * biquad(rng.standard_normal(n), 3200 + rng.uniform(-300, 300), 4) * np.hanning(n)
        k += 1; at += .028 + .0016 * k * k / 6
    # Heller Messington am Ende.
    i = int(.78 * SR); tt = t[:len(t) - i]; f0 = 1318 + seed % 2 * 80
    s[i:] += .25 * sum(a * np.sin(2 * np.pi * f0 * m * tt) * np.exp(-d * tt) for m, a, d in [(1, 1, 6), (2.4, .3, 11)])
    return s

def incense(seed):
    rng = np.random.default_rng(seed); t = t_of(1.0); n = rng.standard_normal(len(t))
    env = np.minimum(1, t / .12) * np.exp(-np.maximum(0, t - .15) * 3.2)
    s = biquad(n, 900, .5) * env * .9
    for _ in range(14):
        at = rng.uniform(.05, .9); m = int(SR * rng.uniform(.002, .006)); i = int(at * SR)
        s[i:i + m] += rng.uniform(.3, .7) * biquad(rng.standard_normal(m), 4200, 3) * np.hanning(m)
    return s

def column(seed):
    rng = np.random.default_rng(seed); t = t_of(.9); s = np.zeros_like(t)
    # Knacks des Kapitells, dann Splitter auf Stein, zuletzt rieselnder Staub.
    m = int(SR * .03); s[:m] += biquad(rng.standard_normal(m), 1500, 1.4) * np.exp(-np.arange(m) / SR * 90)
    for _ in range(9):
        at = rng.uniform(.12, .55); m = int(SR * .02); i = int(at * SR)
        s[i:i + m] += rng.uniform(.25, .55) * biquad(rng.standard_normal(m), rng.uniform(1800, 3200), 6) * np.exp(-np.arange(m) / SR * 160)
    dust = biquad(rng.standard_normal(len(t)), 5000, .7) * np.clip((t - .3) / .2, 0, 1) * np.exp(-np.maximum(0, t - .5) * 6) * .12
    return s + dust

def catapult(seed):
    rng = np.random.default_rng(seed); t = t_of(1.0); s = np.zeros_like(t)
    # Knarren: kurz gereihte, tiefe Reibimpulse.
    for k in range(10):
        i = int((.01 + k * .011) * SR); m = int(SR * .008)
        s[i:i + m] += .4 * biquad(rng.standard_normal(m), 420 + 30 * k, 5) * np.hanning(m)
    # Schlag des Arms gegen den Querbalken (Holz).
    i = int(.16 * SR); m = int(SR * .12); tt = np.arange(m) / SR
    s[i:i + m] += np.sin(2 * np.pi * 180 * tt) * np.exp(-tt * 38) + .5 * biquad(rng.standard_normal(m), 900, 1.5) * np.exp(-tt * 60)
    # Ferner, dumpfer Aufschlag des Steins.
    i = int(.62 * SR); m = int(SR * .2); tt = np.arange(m) / SR
    s[i:i + m] += .45 * (np.sin(2 * np.pi * 70 * tt) * np.exp(-tt * 22) + .4 * biquad(rng.standard_normal(m), 300, 1) * np.exp(-tt * 30))
    return s

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '.'
    for name, make, peak in [('astrolab', astrolab, .4), ('incense', incense, .4), ('column', column, .45), ('catapult', catapult, .5)]:
        for i in (1, 2):
            path = os.path.join(out, f'{name}-{i}.ogg'); write(path, make(i * 31 + len(name)), peak)
            print(f'{name}-{i}: {loudest(path):.1f} dBFS')
