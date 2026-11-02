#!/usr/bin/env python3
"""Erzeugt quellcode/assets/game/view/css/lesbar.css aus den übrigen Stylesheets (Phase 7, seit 1.34.0).

- Textgröße „Groß“ und „Sehr groß“ (Klassen text-gross / text-sehr am Wurzelelement): jede Regel mit Lesetext bis 21 px
  bekommt eine Kopie mit 1,15- bzw. 1,3-facher Schrift. Überschriften und Zahlen auf Karten bleiben, wie sie sind.
- Bewegung „Ruhig“ (Klasse motion-ruhig): jeder Block @media(prefers-reduced-motion:reduce) wird für die Klasse wiederholt –
  die Einstellung wirkt damit genau wie die Vorgabe des Geräts.

Aufruf: python3 werkzeuge/lesbar_css.py          (schreibt die Datei)
        python3 werkzeuge/lesbar_css.py --pruefen (Exit 1, wenn die Datei veraltet ist – läuft im Test)"""
import re, sys, pathlib

CSS = pathlib.Path(__file__).resolve().parent.parent / 'quellcode/assets/game/view/css'
OUT = CSS / 'lesbar.css'
SOURCES = ['style.css', 'packs.css', 'stone.css', 'hall.css', 'kit.css', 'screens.css', 'draft.css', 'quests.css', 'campaign.css', 'intro.css', 'astra.css']
# Lesetext: Absätze, Listen, Erklärungen, Hinweise. Keine Kartenwerte, Knöpfe oder Titel.
READ = re.compile(r'(\bp\b|help|glossary|chronicle|lore|speech|scene-cue|scene-source|quest|settings|show-info|show-power|show-meta|show-school|show-style|foe-style|fuse-line|fuse-note|mission-panel|option-lore|power-text|shop-hint|plaque-info|pack-info|match-log|zoom-text|zoom-hint|zoom-type|card-detail|discover|toast|lesson|coach)')
SKIP = re.compile(r'(h1|h2|h3|eyebrow|\bb\b|button|cost|stat)')
SIZES = [('text-gross', 1.15), ('text-sehr', 1.3)]


def blocks(text):
    """(prelude, body) top-level, Kommentare entfernt."""
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)
    out, i, n = [], 0, len(text)
    while i < n:
        j = text.find('{', i)
        if j < 0:
            break
        depth, k = 1, j + 1
        while k < n and depth:
            depth += {'{': 1, '}': -1}.get(text[k], 0)
            k += 1
        out.append((text[i:j].strip(), text[j + 1:k - 1]))
        i = k
    return out


def prefix(selectors, cls):
    out = []
    for s in selectors.split(','):
        s = s.strip()
        if not s:
            continue
        if s.startswith('html'):
            out.append('html.' + cls + s[4:])
        elif s.startswith(':root'):
            out.append('html.' + cls + s[5:])
        else:
            out.append('html.' + cls + ' ' + s)
    return ','.join(out)


def build():
    text_rules, motion = [], []
    for name in SOURCES:
        path = CSS / name
        if not path.exists():
            continue
        for pre, body in blocks(path.read_text(encoding='utf-8')):
            if pre.startswith('@media') and 'prefers-reduced-motion' in pre.replace(' ', ''):
                for sel, decl in blocks(body):
                    motion.append(prefix(sel, 'motion-ruhig') + '{' + decl.strip() + '}')
                continue
            if pre.startswith('@'):
                continue
            m = re.search(r'font-size:\s*([0-9.]+)px', body)
            if not m or float(m.group(1)) > 21:
                continue
            sels = [s.strip() for s in pre.split(',') if READ.search(s) and not SKIP.search(s.split(' ')[-1])]
            if sels:
                text_rules.append((','.join(sels), float(m.group(1)), name))
    lines = ['/* Erzeugt von werkzeuge/lesbar_css.py – nicht von Hand ändern. Textgröße und ruhige Bewegung (Phase 7, seit 1.34.0). */']
    for cls, k in SIZES:
        for sel, px, _ in text_rules:
            lines.append(prefix(sel, cls) + '{font-size:' + ('%g' % round(px * k, 1)) + 'px;line-height:1.32}')
    lines += motion
    lines.append('html.motion-ruhig *,html.motion-ruhig *::before,html.motion-ruhig *::after{scroll-behavior:auto!important}')
    return '\n'.join(lines) + '\n'


if __name__ == '__main__':
    css = build()
    if '--pruefen' in sys.argv:
        ok = OUT.exists() and OUT.read_text(encoding='utf-8') == css
        print('lesbar.css ist aktuell.' if ok else 'lesbar.css ist veraltet: python3 werkzeuge/lesbar_css.py')
        sys.exit(0 if ok else 1)
    OUT.write_text(css, encoding='utf-8')
    print('geschrieben:', OUT, len(css.splitlines()), 'Zeilen')
