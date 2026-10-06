"""Erzeugt die Stein-Geräusche des Comic-Stein-Menüs (prozedural, CC0).

stone-*  dumpfes Steinklopfen beim Antippen
scrape-* kurzes Schleifen beim Schließen der Steinplatten
grind-*  schweres Fels-auf-Fels-Mahlen beim Öffnen
slam-*   Einrasten der Steinplatten

Aufruf: python3 stein_sounds.py <zielordner>   (benötigt numpy und ffmpeg)
"""
import subprocess, sys, wave, os, tempfile
import numpy as np

SR = 44100

def biquad(x, kind, f, q=0.707):
    w = 2 * np.pi * f / SR
    a = np.sin(w) / (2 * q)
    c = np.cos(w)
    if kind == 'lp':
        b0, b1, b2 = (1 - c) / 2, 1 - c, (1 - c) / 2
    elif kind == 'hp':
        b0, b1, b2 = (1 + c) / 2, -(1 + c), (1 + c) / 2
    else:  # band pass, constant peak gain
        b0, b1, b2 = a, 0.0, -a
    a0, a1, a2 = 1 + a, -2 * c, 1 - a
    b0, b1, b2, a1, a2 = b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0
    y = np.zeros_like(x)
    x1 = x2 = y1 = y2 = 0.0
    for i, v in enumerate(x):
        o = b0 * v + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
        x2, x1, y2, y1 = x1, v, y1, o
        y[i] = o
    return y

def t_axis(d):
    return np.arange(int(SR * d)) / SR

def knock(rng, f0, decay, length=0.32, crunch=0.25):
    t = t_axis(length)
    # Body: a low thump whose pitch falls quickly, like a block hitting stone.
    f = f0 * (1 + 0.7 * np.exp(-t / 0.012))
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / decay)
    # Inharmonic stone partials, damped fast.
    partials = sum(a * np.sin(2 * np.pi * p * t + rng.uniform(0, 6)) * np.exp(-t / d)
                   for p, a, d in ((f0 * 3.7, .22, .028), (f0 * 7.9, .12, .016), (f0 * 12.3, .06, .01)))
    # Contact click and grit.
    n = rng.standard_normal(len(t))
    click = biquad(n, 'bp', rng.uniform(900, 1400), 0.9) * np.exp(-t / 0.006) * 1.6
    grit = biquad(n, 'lp', 2400) * np.exp(-t / 0.035) * crunch
    s = body * 0.95 + partials + click + grit
    fade = np.minimum(1, (len(t) - np.arange(len(t))) / (SR * 0.03))
    return s * fade

def grains(rng, length, density, lo, hi, gmin=0.002, gmax=0.012):
    out = np.zeros(int(SR * length))
    count = int(density * length)
    for _ in range(count):
        g = int(SR * rng.uniform(gmin, gmax))
        start = rng.integers(0, max(1, len(out) - g))
        tt = np.arange(g) / SR
        burst = rng.standard_normal(g) * np.exp(-tt / (g / SR / 3)) * rng.uniform(0.2, 1) ** 2
        out[start:start + g] += burst
    return biquad(biquad(out, 'hp', lo), 'lp', hi)

def grind(rng, length):
    t = t_axis(length)
    white = rng.standard_normal(len(t))
    brown = np.cumsum(white)
    brown -= biquad(brown, 'lp', 8)  # remove drift
    brown /= np.max(np.abs(brown)) + 1e-9
    rumble = biquad(brown, 'lp', 160) * 1.4
    friction = biquad(biquad(white, 'bp', rng.uniform(260, 340), 0.6), 'lp', 1200) * 0.55
    # Slow irregular pressure changes make the slab "catch" while it slides.
    wobble = 0.65 + 0.35 * np.sin(2 * np.pi * rng.uniform(5, 9) * t + rng.uniform(0, 6)) * np.sin(2 * np.pi * rng.uniform(1.3, 2.2) * t)
    texture = grains(rng, length, 420, 350, 3200) * 2.2
    s = (rumble + friction * wobble) * wobble + texture * wobble
    env = np.minimum(1, t / 0.07) * np.minimum(1, (length - t) / 0.18)
    return s * env

def slam(rng):
    s = knock(rng, rng.uniform(52, 60), 0.16, length=0.75, crunch=0.6)
    t = t_axis(0.75)
    debris = grains(rng, 0.75, 260, 500, 4200) * np.exp(-t / 0.09) * 2.4
    tail = biquad(np.cumsum(rng.standard_normal(len(t))), 'lp', 90)
    tail = tail / (np.max(np.abs(tail)) + 1e-9) * np.exp(-t / 0.22) * 0.35
    fade = np.minimum(1, (0.75 - t) / 0.12)
    return (s + debris + tail) * fade

def write(path, s, peak):
    s = s - np.mean(s)
    s = s / (np.max(np.abs(s)) + 1e-9) * peak
    pcm = (np.clip(s, -1, 1) * 32767).astype('<i2')
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp:
        wav = tmp.name
    with wave.open(wav, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-c:a', 'libvorbis', '-q:a', '4', path], check=True)
    os.unlink(wav)

def main(out):
    rng = np.random.default_rng(1307)
    for i, (f0, dec) in enumerate(((96, .07), (84, .08), (108, .06)), 1):
        write(os.path.join(out, f'stone-{i}.ogg'), knock(rng, f0, dec), 0.9)
    for i in (1, 2):
        write(os.path.join(out, f'scrape-{i}.ogg'), grind(rng, 0.38), 0.75)
        write(os.path.join(out, f'grind-{i}.ogg'), grind(rng, 0.78), 0.8)
        write(os.path.join(out, f'slam-{i}.ogg'), slam(rng), 0.95)

if __name__ == '__main__':
    main(sys.argv[1])
