"""Erzeugt die Geräusche für Uhr, Basar und Kartenbuch (Rückmeldung zu 1.18.0, AP 1.4, AP 1.6; prozedural, CC0).

chime-1, -2   Uhrwerk statt Gong beim Zugwechsel: Tick-Tack der Hemmung und ein leiser, kurzer Glockenton (≈ 0,9 s; seit 1.20.0 sanfter)
coins-1, -2   Münzen fliegen aus der Goldanzeige: helles Klimpern, das auf einem Häufchen endet (≈ 0,6 s)
seal-1, -2    Wachssiegel bricht: trockener Knacks, dumpfer Unterton, bröselnde Splitter (≈ 0,45 s)
page-1, -2    Seite im Kartenbuch umblättern: Luftzug über Pergament und ein leises Klappen (≈ 0,4 s)

Aufruf: python3 oberflaeche_klang.py <zielordner>   (benötigt numpy und ffmpeg)
Gibt je Datei das lauteste 100-ms-Fenster (RMS, dBFS) aus – die Werte stehen in tests/oberflaeche.test.js.
"""
import os, sys
import numpy as np
from spielgefuehl_klang import SR, biquad, t_of, write

def chime(seed):
    rng = np.random.default_rng(seed); t = t_of(.95); s = np.zeros_like(t)
    # Tick-Tack: zwei kurze, gedämpfte Klicks der Hemmung.
    for at, f0, amp in [(0, 2400, .42), (.11, 1900, .3)]:
        i = int(at * SR); n = int(SR * .012)
        s[i:i + n] += amp * biquad(rng.standard_normal(n), f0, 2.5) * np.hanning(n)
    # Weicher Glockenton (G4) mit wenigen, leisen Obertönen, langsamer Einsatz statt Anschlag.
    i = int(.17 * SR); tt = t[:len(t) - i]; f0 = 392 + seed % 2 * 49
    # Rückmeldung 1.19.0 („immer noch etwas viel“): Glocke leiser und kürzer, das Tick-Tack trägt.
    bell = sum(a * np.sin(2 * np.pi * f0 * k * tt) * np.exp(-d * tt) for k, a, d in [(1, 1, 4.8), (2.0, .2, 7), (2.76, .08, 10)])
    s[i:] += .3 * bell * np.minimum(1, tt / .02)
    return s

def coins(seed):
    rng = np.random.default_rng(seed); t = t_of(.62); s = np.zeros_like(t)
    for k in range(9):
        at = .04 * k + rng.uniform(0, .025) + (.08 if k > 6 else 0); i = int(at * SR); tt = t[:len(t) - i]
        f = rng.uniform(2600, 3600); amp = rng.uniform(.35, .7) * (1.25 if k > 6 else 1)
        ring = sum(a * np.sin(2 * np.pi * f * m * tt + rng.uniform(0, 6)) for m, a in [(1, 1), (1.47, .6), (2.09, .35)])
        s[i:] += amp * ring * np.exp(-tt * rng.uniform(28, 40)) * np.minimum(1, tt / .0008)
    return s

def seal(seed):
    rng = np.random.default_rng(seed); t = t_of(.46); n = rng.standard_normal(len(t))
    crack = (biquad(n, 1800, 2.2) + .7 * biquad(n, 3600, 3)) * np.exp(-55 * t)
    thump = np.sin(2 * np.pi * (150 - 80 * t) * t) * np.exp(-18 * t) * .7
    bits = np.zeros_like(t)
    for _ in range(12):
        i = int(rng.uniform(.04, .3) * SR); m = int(SR * rng.uniform(.002, .005))
        bits[i:i + m] += rng.uniform(.15, .45) * np.hanning(m)
    return (crack + thump + biquad(n, 2600, 1.4) * bits * 1.2) * np.minimum(1, t / .0008)

def page(seed):
    rng = np.random.default_rng(seed); t = t_of(.42); n = rng.standard_normal(len(t))
    # Luftzug: Rauschen, dessen Band beim Umschlagen steigt und fällt.
    env = np.sin(np.pi * np.clip(t / .32, 0, 1)) ** 1.5
    sweep = biquad(n, 1600, .6) * .6 + biquad(n, 3400, .9) * .35 * np.clip(np.sin(np.pi * t / .3), 0, 1)
    flap = np.zeros_like(t); i = int(.3 * SR); m = len(t) - i
    flap[i:] = biquad(rng.standard_normal(m), 700, 1.1) * np.exp(-np.arange(m) / SR * 45) * 1.3
    return sweep * env + flap

def loudest(path):
    """Lautestes 100-ms-Fenster der fertigen Datei (RMS, dBFS)."""
    import subprocess
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', path, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    x = np.frombuffer(raw, '<i2') / 32768; w = SR // 10
    return 20 * np.log10(max(np.sqrt(np.mean(x[i:i + w] ** 2)) for i in range(0, max(1, len(x) - w), w // 4)))

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '.'
    for name, make, peak in [('chime', chime, .35), ('coins', coins, .55), ('seal', seal, .55), ('page', page, .4)]:
        for i in (1, 2):
            path = os.path.join(out, f'{name}-{i}.ogg'); write(path, make(i * 23 + len(name)), peak)
            print(f'{name}-{i}: {loudest(path):.1f} dBFS')
    import subprocess
    gong = os.path.join(out, 'gong.ogg')
    if os.path.exists(gong): print(f'zum Vergleich gong: {loudest(gong):.1f} dBFS')
