"""Erzeugt den Kristallklang der Äther-Uhr (AP 3.7, prozedural, CC0): Jeder Kristall, der sich zu Zugbeginn füllt,
klingt kurz und hell an – zwei Varianten in leicht anderer Tonhöhe.

aether-1, aether-2  kurzes Glasglöckchen mit Schimmer (≈ 0,45 s)

Aufruf: python3 aether_klang.py <zielordner>   (benötigt numpy und ffmpeg)
"""
import subprocess, sys, wave, os, tempfile
import numpy as np

SR = 44100

def chime(f0, seed):
    rng = np.random.default_rng(seed)
    t = np.arange(int(SR * .45)) / SR
    s = np.zeros_like(t)
    # Inharmonische Teiltöne wie bei einer Glasschale, die hohen verklingen schneller.
    for k, (ratio, amp, decay) in enumerate([(1, 1, 7), (2.76, .5, 11), (5.4, .28, 17), (8.93, .14, 25)]):
        s += amp * np.sin(2 * np.pi * f0 * ratio * t + rng.uniform(0, 6.3)) * np.exp(-decay * t)
    s += .05 * rng.standard_normal(len(t)) * np.exp(-60 * t)  # weicher Anschlag
    s *= np.minimum(1, t / .003)
    return s

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
    for i, f0 in enumerate([1568, 1760], 1):
        write(os.path.join(out, f'aether-{i}.ogg'), chime(f0, i))
