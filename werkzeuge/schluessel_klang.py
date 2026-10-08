"""Erzeugt die Geräusche für Schlüsselwörter, Münzwurf und Sieg (AP 3.6, AP 3.8; prozedural, CC0).

clink-1, -2    Göttliche Gunst zerspringt: helles, gläsernes Klirren mit nachrieselnden Splittern (≈ 0,5 s)
chains-1, -2   Starre: rasselnde Ketten und ein metallisches Einrasten (≈ 0,5 s)
poison-1, -2   Tödliches Gift: blubbernde Blasen über einem leisen Zischen (≈ 0,6 s)
toss-1, -2     Feldzug-Initiative: hochgeworfene Bronzemünze, die sirrend kreiselt (≈ 0,8 s)
horn-1, -2     Kriegshörner: zwei Hörner im Quintabstand schwellen an (Sieg, Ankündigung des Chronisten, ≈ 2 s)

Aufruf: python3 schluessel_klang.py <zielordner>   (benötigt numpy und ffmpeg)
Gibt je Datei das lauteste 100-ms-Fenster (RMS, dBFS) aus – die Werte stehen in tests/schluessel.test.js.
"""
import os, sys
import numpy as np
from spielgefuehl_klang import SR, biquad, t_of, write
from oberflaeche_klang import loudest

def clink(seed):
    rng = np.random.default_rng(seed); t = t_of(.55); s = np.zeros_like(t)
    # Der Bruch: ein kurzer, heller Anschlag mit unharmonischen Teiltönen, danach rieselnde Splitter.
    for k in range(10):
        at = 0 if k == 0 else rng.uniform(.03, .32); i = int(at * SR); tt = t[:len(t) - i]
        f = rng.uniform(2400, 5200) if k else 3100 + seed % 3 * 180; amp = 1 if k == 0 else rng.uniform(.15, .45)
        ring = sum(a * np.sin(2 * np.pi * f * m * tt + rng.uniform(0, 6)) for m, a in [(1, 1), (1.51, .55), (2.33, .3), (3.1, .15)])
        s[i:] += amp * ring * np.exp(-tt * rng.uniform(18, 34)) * np.minimum(1, tt / .0006)
    n = rng.standard_normal(len(t))
    return s + biquad(n, 5200, 1.2) * np.exp(-t * 40) * 1.4

def chains(seed):
    rng = np.random.default_rng(seed); t = t_of(.52); s = np.zeros_like(t)
    # Glieder schlagen aneinander: kurze, metallische Klicks mit zwei Resonanzen, am Ende das Einrasten.
    times = np.sort(rng.uniform(0, .3, 11))
    for k, at in enumerate(list(times) + [.36]):
        last = k == len(times); i = int(at * SR); m = int(SR * (.05 if last else .025)); tt = np.arange(m) / SR
        click = biquad(rng.standard_normal(m), rng.uniform(3200, 4600), 3) * np.exp(-tt * 160)
        res = sum(a * np.sin(2 * np.pi * f * tt) for f, a in [(rng.uniform(1100, 1400), .6), (rng.uniform(2500, 2900), .4)]) * np.exp(-tt * (45 if last else 90))
        s[i:i + m] += (1.4 if last else rng.uniform(.4, .8)) * (click + .5 * res)[:len(s) - i]
    return s

def poison(seed):
    rng = np.random.default_rng(seed); t = t_of(.62); s = np.zeros_like(t)
    # Blasen: kurze, aufsteigende Töne; darunter ein leises Zischen.
    for _ in range(14):
        i = int(rng.uniform(0, .48) * SR); m = int(SR * rng.uniform(.025, .05)); tt = np.arange(m) / SR
        f0 = rng.uniform(260, 520); f = f0 * (1 + tt / tt[-1] * rng.uniform(.8, 1.6))
        s[i:i + m] += rng.uniform(.3, .8) * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / tt[-1]) ** 2
    hiss = biquad(rng.standard_normal(len(t)), 2200, .7) * .12 * np.sin(np.pi * np.clip(t / .6, 0, 1))
    return s + hiss

def toss(seed):
    rng = np.random.default_rng(seed); t = t_of(.85)
    # Daumen schnippt die Münze: kurzer Klick, dann ein Bronzeton, der mit dem Kreiseln flattert.
    f = 2350 + seed % 2 * 160
    ring = sum(a * np.sin(2 * np.pi * f * m * t + rng.uniform(0, 6)) for m, a in [(1, 1), (1.44, .4), (2.31, .18)])
    flutter = .55 + .45 * np.cos(2 * np.pi * (22 - 8 * t) * t)
    flick = biquad(rng.standard_normal(len(t)), 2800, 2) * np.exp(-t * 220)
    return ring * flutter * np.exp(-t * 4.2) * np.minimum(1, t / .002) * .8 + flick * 1.5

def horn(seed):
    rng = np.random.default_rng(seed); t = t_of(2.1); s = np.zeros_like(t)
    # Zwei Hörner (Grundton und Quinte, das zweite setzt später ein): Obertöne werden mit der Lautstärke heller,
    # leichtes Vibrato, weicher Einsatz; ein kurzer Nachhall wie in einer Talsenke.
    base = 146.8 if seed % 2 else 130.8
    for f0, start, amp in [(base, 0, 1), (base * 1.5, .45, .8)]:
        i = int(start * SR); tt = t[:len(t) - i]; dur = 1.55 - start * .6
        env = np.clip(tt / .35, 0, 1) ** 1.6 * np.clip((dur - tt) / .5, 0, 1)
        vib = 1 + .006 * np.sin(2 * np.pi * 5.2 * tt + rng.uniform(0, 6)) * np.clip(tt / .6, 0, 1)
        phase = 2 * np.pi * f0 * np.cumsum(vib) / SR
        tone = sum(np.sin(k * phase) / k * env ** (.4 * (k - 1)) for k in range(1, 13))
        s[i:] += amp * tone * env
    wet = np.zeros_like(s)
    for d, g in [(.11, .35), (.23, .22), (.37, .12)]:
        k = int(d * SR); wet[k:] += g * s[:-k]
    return biquad(s + wet, 1800, .5, 'low')

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '.'
    for name, make, peak in [('clink', clink, .5), ('chains', chains, .5), ('poison', poison, .45), ('toss', toss, .45), ('horn', horn, .6)]:
        for i in (1, 2):
            path = os.path.join(out, f'{name}-{i}.ogg'); write(path, make(i * 29 + len(name)), peak)
            print(f'{name}-{i}: {loudest(path):.1f} dBFS')
