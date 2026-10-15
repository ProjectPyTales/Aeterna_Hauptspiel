"""Erzeugt die Musik des Start-Intros (1.26.0): assets/audio/intro.ogg, 9,8 s Stereo, prozedural (CC0) plus vier
vorhandene Spielgeräusche (gong-1, slam-1, horn-1, sword sowie draw-1…3 für die einfliegenden Karten).

Die Zeitleiste ist dieselbe wie in quellcode/assets/game/view/intro.js (Konstante T) – jeder Schlag liegt auf einem Bild:
  0,00 s    Funke: tiefer Puls und heller Klang, dann ein anschwellendes Rauschen bis zum Aufreißen der Lichtnaht
  1,00 s    sechs Epochen im Takt (0,48 s ≈ 125 BPM): Taiko-Schlag je Schnitt, gezupfte Achtel in d-Moll, Wisch-Geräusch,
            darunter eine Fläche d-Moll, deren Filter sich bis zum Ring öffnet
  3,88 s    die Bilder kippen zu Karten: Luftstoß, die Karten fliegen ein (Kartengeräusche)
  4,50 s    der Ring dreht sich: ein Schwirren, dessen Pulse genau dann kommen, wenn eine Karte vorn vorbeizieht (gleiche
            Drehfunktion wie im Bild), dazu ein Trommelwirbel, der schneller wird, und ein steigender Ton
  5,55 s    Sog in den Lichtpunkt, 5,92 s Stille
  6,05 s    Einschlag: Unterbass-Fall, Gong, Schlag, Kriegshorn, Schwertklang; Akkord D-Dur (Picardie nach d-Moll) und
            ein Glöckchen für jeden Buchstaben von AETERNA, ab 7,30 s ein Glitzern zum Lichtstreif über dem Titel
Pegel: Spitzen −3 dBFS; im Spiel läuft die Datei über die Gruppe „Geräusche“ (Lautstärke der Einstellungen).

Aufruf: python3 werkzeuge/intro_klang.py   (benötigt numpy und ffmpeg)
"""
import os, subprocess, tempfile, wave
import numpy as np

SR = 44100
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
AUDIO = os.path.join(ROOT, 'quellcode/assets/game/assets/audio')
TARGET = os.path.join(AUDIO, 'intro.ogg')

# Zeitleiste wie view/intro.js
T = dict(seam=.55, montage=1, beat=.48, flip=3.88, edge=4.03, formed=4.5, collapse=5.55, point=5.92, impact=6.05,
         handoff=7.95)
LENGTH = 9.8
N = int(SR * LENGTH)
rng = np.random.default_rng(1260)


def hz(note):
    """Note wie 'D3' oder 'F#3' → Frequenz."""
    names = {'C': -9, 'D': -7, 'E': -5, 'F': -4, 'G': -2, 'A': 0, 'B': 2}
    k = names[note[0]] + (1 if '#' in note else 0) - (1 if note[1:2] == 'b' else 0)
    return 440 * 2 ** ((k + 12 * (int(note[-1]) - 4)) / 12)


def at(s):
    return int(round(s * SR))


def env(n, attack, decay):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(attack, 1e-4)) * np.exp(-t / decay)


def mix(bus, sig, start, gain=1.0, pan=0.0):
    """Mono-Signal ab start (s) in den Stereo-Bus; pan −1 … 1 (gleiche Leistung)."""
    i = at(start)
    if i >= len(bus):
        return
    sig = sig[:len(bus) - i] * gain
    a = (pan + 1) * np.pi / 4
    bus[i:i + len(sig), 0] += sig * np.cos(a)
    bus[i:i + len(sig), 1] += sig * np.sin(a)


def stft_filter(x, gain_of):
    """Zeitabhängiger Filter: gain_of(zeit, frequenzen) → Verstärkung je Band (Hann, 50 % Überlappung)."""
    size, hop = 2048, 1024
    win = np.hanning(size)
    pad = np.concatenate([np.zeros(size), x, np.zeros(size)])
    out = np.zeros_like(pad)
    freqs = np.fft.rfftfreq(size, 1 / SR)
    for i in range(0, len(pad) - size, hop):
        spec = np.fft.rfft(pad[i:i + size] * win)
        out[i:i + size] += np.fft.irfft(spec * gain_of((i + size / 2 - size) / SR, freqs), size) * win
    return out[size:size + len(x)] / 1.5


def band(f, center, width):
    return np.exp(-((np.log2(np.maximum(f, 1) / center)) / width) ** 2)


def lowpass(f, cut, order=2):
    return 1 / np.sqrt(1 + (f / cut) ** (2 * order))


def sample(name):
    """Vorhandenes Spielgeräusch als Mono-Float (ffmpeg dekodiert)."""
    with tempfile.TemporaryDirectory() as tmp:
        out = os.path.join(tmp, 'x.wav')
        subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(AUDIO, name + '.ogg'), '-ac', '1', '-ar', str(SR),
                        '-sample_fmt', 's16', out], check=True)
        with wave.open(out) as w:
            return np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float64) / 32768


# ---------- Bausteine ----------
def taiko(pitch=1.0, length=.7):
    n = at(length); t = np.arange(n) / SR
    f = (150 * np.exp(-t * 18) + 52) * pitch
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .22)
    skin = stft_filter(rng.standard_normal(n), lambda tt, fr: band(fr, 900 * pitch, 1.2)) * np.exp(-t / .03) * .9
    return (body + skin) * np.minimum(1, t / .0015)


def pluck(freq, length=.5, bright=.5):
    """Karplus-Strong: gezupfte Saite."""
    n = at(length); period = int(SR / freq)
    buf = rng.uniform(-1, 1, period)
    buf = np.convolve(buf, [bright, 1 - bright], 'same')
    out = np.zeros(n)
    for i in range(n):
        out[i] = buf[i % period]
        buf[i % period] = .996 * .5 * (buf[i % period] + buf[(i + 1) % period])
    return out * np.minimum(1, np.arange(n) / 40)


def saw_pad(freqs, n, cutoff, detune=.12, seed=0):
    """Fläche aus verstimmten Sägezähnen, additiv; cutoff(t) in Hz als Array über n Samples."""
    t = np.arange(n) / SR
    r = np.random.default_rng(seed)
    out = np.zeros((n, 2))
    for f0 in freqs:
        for side, cents in ((0, -detune), (1, detune)):
            f = f0 * 2 ** (cents * (1 + r.uniform(-.3, .3)) / 12)
            ph = r.uniform(0, 2 * np.pi)
            for k in range(1, int(5200 / f)):
                w = (1 / k) / np.sqrt(1 + (k * f / cutoff) ** 4)
                if w.max() < 2e-4:
                    break
                out[:, side] += w * np.sin(2 * np.pi * k * f * t + ph * k)
    return out / (len(freqs) * 1.6)


def bell(freq, length=1.6):
    n = at(length); t = np.arange(n) / SR
    s = sum(a * np.sin(2 * np.pi * freq * r * t) * np.exp(-t / d) for r, a, d in
            [(1, 1, .9), (2.01, .45, .5), (3.02, .28, .3), (4.17, .2, .18), (5.43, .12, .1)])
    return s * np.minimum(1, t / .002)


def whoosh(length, lo, hi, curve=1.0):
    n = at(length)
    noise = rng.standard_normal(n)
    return stft_filter(noise, lambda tt, fr: band(fr, lo * (hi / lo) ** (min(1, max(0, tt / length)) ** curve), .9))


def spin(t):
    """Drehwinkel des Kartenrings wie spin() in view/intro.js."""
    u = np.maximum(0, t - T['edge'])
    return .6 * u + 1.15 * u ** 3


# ---------- Komposition ----------
def compose():
    bus = np.zeros((N, 2))
    t = np.arange(N) / SR

    # 0 s: Funke – Puls im Bass, heller Anschlag, Rauschen schwillt bis zur Montage an.
    n = at(1.2); tt = np.arange(n) / SR
    mix(bus, np.sin(2 * np.pi * np.cumsum(70 * np.exp(-tt * 3) + 38) / SR) * np.exp(-tt / .45), 0, .55)
    mix(bus, bell(hz('A5'), 1.4), .02, .14)
    mix(bus, bell(hz('D6'), 1.2), .02, .08)
    for pan in (-.3, .3):
        rise = whoosh(T['montage'] - .15, 300, 6000, 1.6) * np.linspace(0, 1, at(T['montage'] - .15)) ** 2.4
        mix(bus, rise, .15, .32, pan)

    # Fläche d-Moll, Filter öffnet sich von der Naht bis zum Ring; endet mit dem Sog.
    a, b = at(.35), at(T['point'])
    cut = 260 + 2400 * np.clip((t[a:b] - .35) / (T['collapse'] - .35), 0, 1) ** 1.6
    pad = saw_pad([hz('D2'), hz('A2'), hz('D3'), hz('F3'), hz('A3')], b - a, cut, seed=3)
    fade = np.minimum(1, (t[a:b] - .35) / .6) * np.clip((T['point'] - t[a:b]) / .25, 0, 1)
    bus[a:b] += pad * fade[:, None] * .4

    # Montage: Taiko auf jedem Schnitt, Achtel gezupft, Wischgeräusch.
    melody = ['D3', 'D3', 'A3', 'D3', 'F3', 'D3', 'C4', 'A3', 'D3', 'D3', 'A3', 'D3', 'F3', 'G3', 'A3', 'C4']
    for k in range(6):
        beat = T['montage'] + k * T['beat']
        mix(bus, taiko(1 if k % 2 == 0 else 1.12), beat, .7 if k == 0 else .55)
        if k:
            mix(bus, whoosh(.24, 900, 5000) * np.hanning(at(.24)), beat - .02, .16, -.4 + .4 * (k % 3))
        for e in range(2):
            note = melody[(2 * k + e) % len(melody)]
            mix(bus, pluck(hz(note), .45, .4), beat + e * T['beat'] / 2, .3, -.35 if e else .35)
            mix(bus, pluck(hz(note) * 2, .3, .6), beat + e * T['beat'] / 2 + .005, .1, .35 if e else -.35)
    # Kleine Trommel-Auftakte vor den Schnitten 3 und 5.
    for k in (2, 4):
        beat = T['montage'] + k * T['beat']
        for d in (.12, .06):
            mix(bus, taiko(1.6, .25), beat - d, .3)

    # 3,88 s: Bilder kippen zu Karten – Luftstoß nach unten, dann fliegen die Karten ein.
    mix(bus, whoosh(.55, 5000, 400, .7) * np.hanning(at(.55)), T['flip'] - .08, .4)
    mix(bus, taiko(.8, .9), T['flip'], .7)
    draws = [sample('draw-1'), sample('draw-2'), sample('draw-3')]
    for j in range(10):
        start = T['edge'] if j < 3 else 3.92 + .055 * (j - 3)
        mix(bus, draws[j % 3], start + .12 + (.02 * j if j < 3 else 0), .5, (-1 if j % 2 else 1) * .6 if j >= 3 else (j - 1) * .5)

    # Ring: Schwirren im Takt der vorbeiziehenden Karten, Wirbel, steigender Ton.
    a, b = at(T['formed'] - .3), at(T['point'])
    tt = t[a:b]
    pulse = np.abs(np.sin(spin(tt) * 10 / 2)) ** 6
    swirl = stft_filter(rng.standard_normal(b - a), lambda x, fr: band(fr, 1300 + 2200 * min(1, max(0, (x) / 1.6)), 1.1))
    grow = np.clip((tt - (T['formed'] - .3)) / 1.3, 0, 1) ** 1.5 * np.clip((T['point'] - tt) / .08, 0, 1)
    side = np.sin(spin(tt))
    sig = swirl * (.25 + .75 * pulse) * grow * .55
    bus[a:b, 0] += sig * (1 - .5 * side)
    bus[a:b, 1] += sig * (1 + .5 * side)
    x, roll = T['formed'], []
    while x < T['point'] - .05:
        roll.append(x)
        x += max(.05, .22 - .13 * (x - T['formed']))
    for i, x in enumerate(roll):
        mix(bus, taiko(1.35 + .25 * (i % 2), .3), x, .22 + .5 * (x - T['formed']) / (T['point'] - T['formed']), .3 if i % 2 else -.3)
    n = b - at(T['formed']); tt = np.arange(n) / SR
    riser = np.sin(2 * np.pi * np.cumsum(hz('D4') * 2 ** (tt / (n / SR) * 1.0)) / SR) * (tt / (n / SR)) ** 2
    mix(bus, riser * np.clip((n / SR - tt) / .05, 0, 1), T['formed'], .14)

    # Sog in den Lichtpunkt: rückwärts anschwellendes Rauschen, das auf 5,92 s abreißt.
    n = at(T['point'] - T['collapse'] + .05); tt = np.arange(n) / SR
    suck = whoosh(n / SR, 300, 7000, 2) * (tt / tt[-1]) ** 3
    mix(bus, suck, T['collapse'] - .05, .55)

    # Ein Atemzug Stille vor dem Einschlag: alles bis hierher wird ab dem Lichtpunkt fast stumm.
    hush = 1 - .92 * np.clip((t - T['point'] + .02) / .04, 0, 1)
    bus *= hush[:, None]

    # 6,05 s: Einschlag.
    imp = T['impact']
    n = at(2.6); tt = np.arange(n) / SR
    mix(bus, np.sin(2 * np.pi * np.cumsum(95 * np.exp(-tt * 4) + 30) / SR) * np.exp(-tt / .9) * np.minimum(1, tt / .003), imp, 1.5)
    for pan, d in ((-.3, 0), (.3, .004)):
        burst = stft_filter(rng.standard_normal(at(1.2)), lambda x, fr: lowpass(fr, 2500 * np.exp(-x * 3) + 200)) * env(at(1.2), .001, .3)
        mix(bus, burst, imp + d, 1.2, pan)
    mix(bus, sample('gong-1'), imp, 1.1)
    mix(bus, sample('slam-1'), imp, .8)
    mix(bus, sample('horn-1'), imp + .08, .38, -.25)
    mix(bus, sample('sword'), imp + .14, .45, .25)
    # Akkord D-Dur: Bass, Fläche mit langsam schließendem Filter.
    n = at(LENGTH - imp); tt = np.arange(n) / SR
    chord = saw_pad([hz('D2'), hz('A2'), hz('D3'), hz('F#3'), hz('A3'), hz('D4')], n, 3200 * np.exp(-tt * .7) + 500, .1, seed=9)
    shape = np.minimum(1, tt / .04) * np.exp(-tt / 2.6)
    bus[at(imp):at(imp) + n] += chord * shape[:, None] * .62
    # Ein Glöckchen je Buchstabe (Reihenfolge der Enthüllung: von der Mitte nach außen), dann das Glitzern.
    notes = ['D6', 'A5', 'F#6', 'D6', 'A6', 'F#5', 'D7']
    for i in range(7):
        d = .12 + abs(i - 3) * .07
        mix(bus, bell(hz(notes[i])), imp + d + .1, .16, (i - 3) / 4)
    for i in range(14):
        mix(bus, bell(hz('D6') * 2 ** ((i * 2) / 12), .7), imp + 1.25 + i * .04, .05 * (1 - i / 16), (i / 7 - 1))
    # Weiches Ausklingen, damit die Musik des Hauptmenüs übernehmen kann.
    tail = np.clip((LENGTH - t) / 1.2, 0, 1)
    bus *= tail[:, None]
    return bus


def main():
    bus = compose()
    # Etwas Raum: zwei kurze Echos, leise, stereo vertauscht.
    for delay, g in ((.083, .18), (.131, .12)):
        d = at(delay)
        bus[d:, 0] += bus[:-d, 1] * g
        bus[d:, 1] += bus[:-d, 0] * g
    bus -= bus.mean(axis=0)
    peak = np.abs(bus).max()
    bus *= 10 ** (-3 / 20) / peak
    rms = 20 * np.log10(np.sqrt((bus ** 2).mean()))
    with tempfile.TemporaryDirectory() as tmp:
        raw = os.path.join(tmp, 'intro.wav')
        with wave.open(raw, 'w') as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
            w.writeframes((bus * 32767).astype(np.int16).tobytes())
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-c:a', 'libvorbis', '-q:a', '5', TARGET], check=True)
    print(TARGET, os.path.getsize(TARGET), 'Bytes, RMS', round(rms, 1), 'dBFS')


if __name__ == '__main__':
    main()
