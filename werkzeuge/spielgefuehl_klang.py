"""Erzeugt die Geräusche für Hand, Ausspielen und Treffer (AP 3.2, 3.3, 3.5; prozedural, CC0).

parchment-1, -2  Rascheln von schwerem Pergament, wenn eine Karte angehoben wird (≈ 0,35 s)
thud-1, -2       dumpfer Schlag, wenn ein Diener landet – „Wumms eines Feldmarsch-Befehls“ (≈ 0,55 s)
hooves-1, -2     Hufgetrappel und Aufprall: Treffer von Reitern und Streitwagen (≈ 0,55 s)
lance-1, -2      Lanzenkrachen – splitterndes Holz: Treffer von Speeren, Piken und Hopliten (≈ 0,5 s)

Aufruf: python3 spielgefuehl_klang.py <zielordner>   (benötigt numpy und ffmpeg)
"""
import subprocess, sys, wave, os, tempfile
import numpy as np

SR = 44100

def biquad(x, f0, q, kind='band'):
    """Einfacher Bandpass/Tiefpass (RBJ-Kochbuch), Abtastwert für Abtastwert."""
    w = 2 * np.pi * f0 / SR; a = np.sin(w) / (2 * q); c = np.cos(w)
    if kind == 'band':
        b0, b1, b2 = a, 0, -a
    else:
        b0, b1, b2 = (1 - c) / 2, 1 - c, (1 - c) / 2
    a0, a1, a2 = 1 + a, -2 * c, 1 - a
    b0, b1, b2, a1, a2 = b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0
    y = np.zeros_like(x); x1 = x2 = y1 = y2 = 0.0
    for i, v in enumerate(x):
        o = b0 * v + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
        x2, x1, y2, y1 = x1, v, y1, o; y[i] = o
    return y

def t_of(seconds):
    return np.arange(int(SR * seconds)) / SR

def parchment(seed):
    rng = np.random.default_rng(seed); t = t_of(.36)
    noise = rng.standard_normal(len(t))
    # Knistern: kurze, unregelmäßige Ausbrüche, dazu ein weiches Rauschen des Bogens.
    crackle = np.zeros_like(t)
    for _ in range(26):
        at = rng.uniform(0, .26); n = int(SR * rng.uniform(.004, .014)); i = int(at * SR)
        crackle[i:i + n] += rng.uniform(.4, 1) * np.hanning(n)
    body = biquad(noise, 2600, .7) * (crackle * .9 + .25 * np.exp(-((t - .12) / .09) ** 2))
    low = biquad(noise, 380, .9) * np.exp(-((t - .05) / .05) ** 2) * .6
    s = body + low
    return s * np.minimum(1, t / .004) * np.exp(-3 * t)

def thud(seed):
    rng = np.random.default_rng(seed); t = t_of(.55)
    f = 92 * np.exp(-t * 5) + 42
    phase = 2 * np.pi * np.cumsum(f) / SR
    boom = np.sin(phase) * np.exp(-7 * t)
    knock = biquad(rng.standard_normal(len(t)), 240, 1.2) * np.exp(-40 * t) * 1.6
    dust = biquad(rng.standard_normal(len(t)), 1200, .6) * np.exp(-14 * t) * .18
    s = boom + knock + dust
    return s * np.minimum(1, t / .002)

def hooves(seed):
    rng = np.random.default_rng(seed); t = t_of(.56); s = np.zeros_like(t)
    # Galopp: drei Hufschläge kurz hintereinander, dann der schwere Aufprall.
    for k, (at, amp, f0) in enumerate([(0, .55, 190), (.075, .7, 170), (.15, .8, 160), (.27, 1.2, 120)]):
        i = int(at * SR); tt = t[:len(t) - i]
        hit = np.sin(2 * np.pi * f0 * tt * (1 - tt * 1.5)) * np.exp(-38 * tt)
        hit += biquad(rng.standard_normal(len(tt)), 900 + 300 * k, .8) * np.exp(-60 * tt) * .9
        s[i:] += amp * hit
    s += biquad(rng.standard_normal(len(t)), 700, .5) * np.exp(-((t - .3) / .12) ** 2) * .12
    return s

def lance(seed):
    rng = np.random.default_rng(seed); t = t_of(.5); n = rng.standard_normal(len(t))
    crack = (biquad(n, 820, 3) * 1.2 + biquad(n, 2300, 4) * .8) * np.exp(-26 * t)
    thump = np.sin(2 * np.pi * (110 - 60 * t) * t) * np.exp(-16 * t) * .9
    splinter = np.zeros_like(t)
    for _ in range(14):
        i = int(rng.uniform(.01, .18) * SR); m = int(SR * rng.uniform(.002, .006))
        splinter[i:i + m] += rng.uniform(.3, .9) * np.hanning(m)
    splinters = biquad(n, 4200, 1.5) * splinter * 1.4
    return (crack + thump + splinters) * np.minimum(1, t / .001)

def write(path, s, peak=.5):
    s = s / np.max(np.abs(s)) * peak
    fd, wav = tempfile.mkstemp(suffix='.wav'); os.close(fd)
    with wave.open(wav, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((s * 32767).astype('<i2').tobytes())
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-c:a', 'libvorbis', '-q:a', '4', path], check=True)
    os.remove(wav)

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '.'
    # Hufe und Lanze mit höherer Spitze: ihr Lärm verteilt sich über mehrere Schläge (Pegel siehe audio.js, CHA.levels).
    for name, make, peak in [('parchment', parchment, .5), ('thud', thud, .5), ('hooves', hooves, .75), ('lance', lance, .75)]:
        for i in (1, 2):
            write(os.path.join(out, f'{name}-{i}.ogg'), make(i * 17 + len(name)), peak)
