"""Astra-Einbau (AP A.1): baut die gemalten Astra-Bilder ins Spiel ein und schreibt die Liste, was noch fehlt.

Astra hat die Bilder in mehreren Teillieferungen geschickt (ungenutzte_assets/neue_astra_assets/: Teil1 bis Teil6,
gerettet, gerettet_2te), teils als WebP, teils als PNG, teils mit Originalen in 1254 px. Das Werkzeug sammelt alle
Einzelbilder je ID ein (spätere Lieferungen gehen vor, Originale vor verkleinerten Fassungen) und erzeugt daraus:

- Kartenatlanten quellcode/assets/game/assets/art/astra-karten-<n>.webp (4 × 3 Felder à 362 px, wie die alten
  Atlanten; R.tile schneidet Breite/4 und Höhe/3) für Karten und Spielsteine,
- Heldenatlanten heroes.webp und heroes2.webp (4 × 3 à 384 px, Held i in Atlas i // 12, Feld i % 12) und die
  Marmor-Skins heroes-marble.webp in denselben Feldern,
- die fünf Schlachtfeld-Tische board*.webp mit Vorschau *-preview.webp,
- die Zuordnung quellcode/assets/game/model/bilder.js (ID → Atlas und Feld), die data.js über die Karten legt,
- ungenutzte_assets/ASTRA_STAND.csv (jede der 350 Karten und 27 Spielsteine mit Status und Quelle) und
  ungenutzte_assets/ASTRA_AUFTRAG.md (der nächste Auftrag an Astra: nur noch offene IDs mit Motivbeschreibung aus
  PRODUKTIONSBRIEFING.md).

Das Spiel lädt nur die WebP-Atlanten; PNG oder WebP als Lieferformat ist egal. Alte Atlanten, auf die keine Karte mehr
zeigt, werden gelöscht. Danach `node werkzeuge/motive.js` (MOTIVE.md) ausführen.

Aufruf: python3 werkzeuge/astra_bilder.py
Benötigt: Pillow mit WebP, Node (liest die Karten aus model/data.js)
"""
import csv
import json
import os
import re
import shutil
import subprocess
import sys

from PIL import Image

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
NEU = os.path.join(ROOT, 'ungenutzte_assets/neue_astra_assets')
GAME = os.path.join(ROOT, 'quellcode/assets/game')
ART = os.path.join(GAME, 'assets/art')
CELL, HERO_CELL, QUALITY = 362, 384, 85
T4 = 'Teil4/assets/Chronicle_of_Heroes_Assets_Teil_04/assets'

# Lieferungen in aufsteigendem Vorrang: (Ordner, Endung). Der Dateiname ist die ID.
FOLDERS = [
    ('Teil1/assets/cards', '.webp'),
    ('Teil2/assets/cards', '.png'), ('Teil2/assets/tokens', '.png'),
    (T4 + '/cards', '.png'), (T4 + '/tokens', '.png'),
    ('Teil5/originale_1254px', '.png'),
    ('Teil6/originale', '.png'),
]
# gerettet/ hat Bildtitel statt IDs: Arbeitszuordnung von Astra (Teil 3/4, nicht durch ein Manifest bestätigt).
RESCUED = 'Teil3/GERETTETE_ASSETS_ZUORDNUNG.json'
# gerettet_2te/: fünf Mamlukenbilder, nach Motiv zugeordnet (PRODUKTIONSBRIEFING.md, Abschnitt 7; angesehen 11. 10. 2026).
BAIBARS = {
    'baibars_0': 'bf9709a5-8713-4dd0-8aa7-6ac966b22275.png',  # Rekrut übt mit der Lanze
    'baibars_1': '4137f04e-bc14-49b4-8b74-0480c39de1bd.png',  # Barid-Kurier mit Brieftaube
    'baibars_2': 'efd83f43-4ebc-4b02-b4be-264e376f0dab.png',  # Ain Dschalut
    'baibars_3': 'e1f5377d-d9d2-46b4-9425-24caff1cada0.png',  # Bogenreiter
    'baibars_4': '1c6b6825-0953-4078-b12a-2ed1b9d01797.png',  # Manjaniq
}
# Geliefert und eingebaut, aber von Astra selbst als korrekturbedürftig gemeldet: bleibt im Auftrag als Revision.
REVISION = {
    'fabius_0': 'Veles trägt zu schwere Rüstung: schlichte Tunika, kleiner leichter Rundschild, Wurfspeere, kein Kettenhemd.',
}
# Nicht neu erzeugen, bis eine Zuordnung geklärt ist. Entscheidung 19 (11. 10. 2026): Die geretteten Alexandria-Bilder
# bleiben hypatia_5 und hypatia_8, hypatia_0 und hypatia_2 werden neu bestellt – nichts mehr gesperrt.
BLOCKED = set()
# Teil 4 kam beschädigt an: laut Manifest erzeugt, Datei fehlt (Briefing, Abschnitt 8).
LOST_T4 = {'perikles_7', 'perikles_8', 'perikles_9', 'pioneer', 'citizen', 'parthenos'}
# Schlachtfeld-Tische (Feld image in model/cosmetics.js).
BOARDS = ['board', 'board-athen', 'board-kapitol', 'board-skriptorium', 'board-porzellan']
# Gemalte Oberfläche (AP A.2): Name → (Quelle, Breite in px). Das Spiel zeichnet diese Bilder statt der Zeichenfunktion
# mit der Kennung ASTRA: <name>; fehlt ein Bild, bleibt die Zeichnung. Ziel: quellcode/assets/game/assets/ui/<name>.webp.
T1, T3 = 'Teil1/assets', 'Teil3/assets'
BACKS = ['chroniken', 'tempel', 'sparta', 'pharao', 'runen', 'sterne', 'lilien', 'zen']
UI = {
    **{f'kartenruecken-{b}': (f'{T1}/cardbacks/kartenruecken-{b}.webp', 400) for b in BACKS},
    **{f'kartenrahmen-{t}-{v}': (f'{T1}/ui-art/kartenrahmen-{t}-{v}.png', 600)
       for t in ['minion', 'spell', 'building'] for v in ['normal', 'gold']},
    **{f'chronikleiste-{p}': (f'{T3}/ui-art/chronikleiste-{p}.png', 280) for p in ['oben', 'mitte', 'unten']},
    'stundenglas': (f'{T1}/ui-art/stundenglas.png', 280),
    'versiegelte-befehle': (f'{T1}/ui-art/versiegelte-befehle.png', 160),
    'waffenablage': (f'{T1}/ui-art/waffenablage.png', 320),
    'schildwall': (f'{T1}/ui-art/schildwall.png', 480),
    'giftphiole': (f'{T1}/ui-art/giftphiole.png', 128),
    'vermaechtnis-urne': (f'{T1}/ui-art/vermaechtnis-urne.png', 144),
    'kartenpaket': (f'{T1}/ui-art/kartenpaket.png', 680),
    'praesentationspodest': (f'{T1}/ui-art/praesentationspodest.png', 1000),
    'kartenbuch': (f'{T1}/ui-art/kartenbuch.png', 1539),
    'startbefehle': (f'{T1}/ui-art/startbefehle.png', 480),
    'steinplatten-links': (f'{T1}/ui-art/steinplatten-links.png', 1000),
    'steinplatten-rechts': (f'{T1}/ui-art/steinplatten-rechts.png', 1000),
}
# Vektorbilder, die unverändert nach assets/ui/ kommen (heute nur die Währungen; die übrigen flachen Vektoren aus Teil 1
# sind schlichter als die Zeichnungen im Spiel und bleiben ungenutzt, siehe README AP A.2).
SVG = {'waehrung-gold': f'{T1}/ui/waehrung-gold.svg', 'waehrung-staub': f'{T1}/ui/waehrung-staub.svg',
       'waehrung-pakete': f'{T1}/ui/waehrung-pakete.svg'}
# Gemalte Hintergründe nach assets/art/: Name → (Quelle, Qualität). Das Hauptmenü ist Astras Neufassung des Konzeptbilds in
# derselben Geometrie (2602 × 1084, deckungsgleich überblendet) – die Trefferflächen in view/hall.js bleiben gültig.
BACKGROUNDS = {'menu': (f'{T1}/backgrounds/menu.webp', 80), 'bg-basar': (f'{T1}/backgrounds/basar.webp', 80),
               'bg-sammlung': (f'{T1}/backgrounds/sammlung.webp', 80), 'bg-pakete': (f'{T1}/backgrounds/pakete.webp', 80),
               'bg-heldengalerie': (f'{T1}/backgrounds/heldengalerie.webp', 80),
               'hall-aeterna': ('Teil1/game-assets/art/hall-aeterna.webp', 90)}
# Alte Atlanten aus werkzeuge/bilder_webp.py, die nur Kartenbilder enthalten: fallen weg, wenn keine Karte mehr zeigt.
OLD_CARD_ATLASES = ['leonidas', 'hypatia', 'imhotep', 'dandolo', 'khan', 'boudicca', 'nostradamus', 'jeanne',
                    'ragnar', 'musashi', 'neutral0', 'neutral1', 'neutral2', 'neutral3']


def game():
    js = ("const D=require(process.argv[1]);console.log(JSON.stringify({"
          "cards:D.cards.map(c=>({id:c.id,name:c.name,owner:D.eraOf(c),art:c.art})),"
          "tokens:Object.values(D.tokens).map(c=>({id:c.id,name:c.name,owner:'Spielstein',art:c.art})),"
          "heroes:D.heroes.map(h=>({id:h.id,name:h.name}))}))")
    out = subprocess.run(['node', '-e', js, os.path.join(GAME, 'model/data.js')], check=True, capture_output=True, text=True)
    return json.loads(out.stdout)


def collect():
    found = {}
    for folder, ext in FOLDERS:
        path = os.path.join(NEU, folder)
        if os.path.isdir(path):
            for f in sorted(os.listdir(path)):
                if f.endswith(ext):
                    found[f[:-len(ext)]] = os.path.join(folder, f)
    for entry in json.load(open(os.path.join(NEU, RESCUED), encoding='utf-8')):
        found.setdefault(entry['id'], entry['source_file'])
    for i, f in BAIBARS.items():
        found[i] = 'gerettet_2te/' + f
    return found


def square(path, size):
    im = Image.open(os.path.join(NEU, path))
    im.load()
    im = im.convert('RGB')
    if im.width != im.height:
        s = min(im.size)
        im = im.crop(((im.width - s) // 2, (im.height - s) // 2, (im.width + s) // 2, (im.height + s) // 2))
    return im.resize((size, size), Image.LANCZOS)


def atlas(name, paths, size):
    sheet = Image.new('RGB', (size * 4, size * 3), (114, 89, 56))
    for i, p in enumerate(paths):
        sheet.paste(square(p, size), (i % 4 * size, i // 4 * size))
    sheet.save(os.path.join(ART, name + '.webp'), 'WEBP', quality=QUALITY, method=6)


def ui_images():
    """Schreibt die Oberflächenbilder und liefert Name → [Breite, Höhe] sowie die Bildfenster der Kartenrahmen."""
    out = os.path.join(GAME, 'assets/ui')
    os.makedirs(out, exist_ok=True)
    sizes = {}
    for name, (src, width) in UI.items():
        im = Image.open(os.path.join(NEU, src))
        im.load()
        im = im.convert('RGBA' if 'A' in im.getbands() else 'RGB')
        h = round(im.height * width / im.width)
        im.resize((width, h), Image.LANCZOS).save(os.path.join(out, name + '.webp'), 'WEBP', quality=88, method=6)
        sizes[name] = [width, h]
    for name, src in SVG.items():
        shutil.copyfile(os.path.join(NEU, src), os.path.join(out, name + '.svg'))
    # Bildfenster je Rahmen aus Astras Clipmasken (Teil 3), umgerechnet auf die Karte von 200 × 282.
    windows = {}
    for a in json.load(open(os.path.join(NEU, 'Teil3/ASSET_MANIFEST.json'), encoding='utf-8'))['assets']:
        if a.get('aperture_bbox'):
            (w, h), (x0, y0, x1, y1) = a['size'], a['aperture_bbox']
            key = a['id'].replace('kartenrahmen-', '').replace('-clip', '')
            windows[key] = [round(x0 * 200 / w, 1), round(y0 * 282 / h, 1), round(x1 * 200 / w, 1), round(y1 * 282 / h, 1)]
    for name, (src, quality) in BACKGROUNDS.items():
        Image.open(os.path.join(NEU, src)).convert('RGB').save(os.path.join(ART, name + '.webp'), 'WEBP', quality=quality, method=6)
    return sizes, windows


def write_map(cards, heroes, ui, windows):
    rows = lambda d: ',\n'.join(f'  {json.dumps(k) if "-" in k else k}:{json.dumps(v)}' for k, v in d.items())
    text = ('// Erzeugt von werkzeuge/astra_bilder.py aus ungenutzte_assets/neue_astra_assets/ – nicht von Hand ändern.\n'
            '// Gemalte Astra-Bilder (AP A.1): Karte oder Spielstein → [Atlas, Feld], Held → [Atlas, Feld].\n'
            '// data.js legt das über die Karten und Helden. Oberfläche (AP A.2): ui = Bild → [Breite, Höhe] in assets/ui/,\n'
            '// windows = Bildfenster der Kartenrahmen [links, oben, rechts, unten] auf der Karte von 200 × 282.\n'
            "(function(root){'use strict';\nconst api={cards:{\n" + rows(cards) + '\n},heroes:{\n' + rows(heroes) +
            '\n},ui:{\n' + rows(ui) + '\n},windows:{\n' + rows(windows) + "\n}};\nif(typeof module!=='undefined')module.exports=api;else root.CHB=api;\n"
            "})(typeof globalThis!=='undefined'?globalThis:this);\n")
    open(os.path.join(GAME, 'model/bilder.js'), 'w', encoding='utf-8').write(text)


def briefing():
    """Motivzeilen aus PRODUKTIONSBRIEFING.md: ID → (Gruppe, Kontext, Name, Motiv, Reihenfolge)."""
    rows, group, context = {}, '', ''
    for line in open(os.path.join(NEU, 'PRODUKTIONSBRIEFING.md'), encoding='utf-8'):
        line = line.rstrip('\n')
        if line.startswith('## '):
            group, context = {'6': 'Spielsteine', '8': 'Aus Teil 4 wiederbeschaffen',
                              '9': 'Alexandria · Spätantike (Entscheidung 19: neu bestellen)'}.get(line[3], line[3:]), ''
        elif line.startswith('### '):
            group, context = line[4:], ''
        elif line.startswith('**Stil-/Epochenkontext:**'):
            context = line
        elif line.startswith('|'):
            m = re.search(r'assets/(cards|tokens)/([a-z0-9_]+)\.png', line)
            if not m:
                continue
            cells = [c.strip() for c in line.strip('|').split('|')]
            name = cells[0].split('–', 1)[-1].strip().strip('`') if '`' in cells[0] else cells[0]
            group_name = re.sub(r'\s*·\s*\d+ Motive.*$', '', group)
            motif = cells[2] if group.startswith('Alexandria') else cells[-1]  # Abschnitt 9: Motiv, dann Sperrgrund
            rows.setdefault(m.group(2), (group_name, context, name, motif, len(rows)))
    return rows


def main():
    data = game()
    found = collect()
    known = {c['id'] for c in data['cards'] + data['tokens']}
    stray = sorted(set(found) - known)
    if stray:
        sys.exit('Bilder ohne Karte im Spiel: ' + ', '.join(stray))

    # Karten und Spielsteine in Spielreihenfolge, zwölf je Atlas.
    items = [c for c in data['cards'] + data['tokens'] if c['id'] in found]
    for f in os.listdir(ART):
        if f.startswith('astra-karten-'):
            os.remove(os.path.join(ART, f))
    card_map = {}
    for n in range(0, len(items), 12):
        name = f'astra-karten-{n // 12 + 1:02d}'
        chunk = items[n:n + 12]
        atlas(name, [found[c['id']] for c in chunk], CELL)
        for i, c in enumerate(chunk):
            card_map[c['id']] = [name, i]

    heroes = [h['id'] for h in data['heroes']]
    hero_map = {}
    for k, name in enumerate(['heroes', 'heroes2']):
        chunk = heroes[k * 12:(k + 1) * 12]
        atlas(name, [f'Teil1/assets/heroes/{h}.webp' for h in chunk], HERO_CELL)
        for i, h in enumerate(chunk):
            hero_map[h] = [name, i]
    marble = Image.new('RGB', (HERO_CELL * 4, HERO_CELL * 3), (114, 89, 56))
    for f in sorted(os.listdir(os.path.join(NEU, 'Teil1/assets/skins'))):
        h = f.split('-')[0]
        name, i = hero_map[h]
        assert name == 'heroes', 'Skins liegen in heroes-marble und brauchen einen Helden aus heroes.webp'
        marble.paste(square(f'Teil1/assets/skins/{f}', HERO_CELL), (i % 4 * HERO_CELL, i // 4 * HERO_CELL))
    marble.save(os.path.join(ART, 'heroes-marble.webp'), 'WEBP', quality=QUALITY, method=6)

    for name in BOARDS:
        im = Image.open(os.path.join(NEU, f'Teil1/assets/backgrounds/{name}.webp')).convert('RGB')
        im.save(os.path.join(ART, name + '.webp'), 'WEBP', quality=QUALITY, method=6)
        im.resize((480, 240), Image.LANCZOS).save(os.path.join(ART, name + '-preview.webp'), 'WEBP', quality=80, method=6)
    write_map(card_map, hero_map, *ui_images())

    # Was zeigt das Spiel jetzt? Alte Kartenatlanten ohne Karte entfallen.
    now = game()
    used = {c['art'] for c in now['cards'] + now['tokens']}
    for name in OLD_CARD_ATLASES:
        path = os.path.join(ART, name + '.webp')
        if name not in used and os.path.exists(path):
            os.remove(path)
            print('entfernt:', name + '.webp')

    # Stand je ID und der nächste Auftrag an Astra.
    motifs = briefing()
    status = {}
    for c in data['cards'] + data['tokens']:
        i = c['id']
        if i in REVISION:
            status[i] = 'Revision'
        elif i in found:
            status[i] = 'eingebaut'
        elif i in BLOCKED:
            status[i] = 'gesperrt'
        elif i in LOST_T4:
            status[i] = 'wiederbeschaffen'
        else:
            status[i] = 'offen'
    with open(os.path.join(ROOT, 'ungenutzte_assets/ASTRA_STAND.csv'), 'w', encoding='utf-8', newline='') as f:
        w = csv.writer(f, delimiter=';')
        w.writerow(['id', 'name', 'gruppe', 'status', 'quelle'])
        for c in data['cards'] + data['tokens']:
            w.writerow([c['id'], c['name'], c['owner'], status[c['id']], found.get(c['id'], '')])
    auftrag(data, status, motifs, len(items), len({v[0] for v in card_map.values()}))
    counts = {s: list(status.values()).count(s) for s in ['eingebaut', 'Revision', 'offen', 'wiederbeschaffen', 'gesperrt']}
    print(f'{len(items)} Karten und Spielsteine in {len({v[0] for v in card_map.values()})} Atlanten, '
          f'22 Helden, 4 Skins, 5 Tische · Stand: {counts}')


def auftrag(data, status, motifs, done, atlases):
    names = {c['id']: c['name'] for c in data['cards'] + data['tokens']}
    todo = [i for i, s in status.items() if s in ('offen', 'Revision', 'wiederbeschaffen')]
    cards = [i for i in todo if i in {c['id'] for c in data['cards']}]
    tokens = [i for i in todo if i not in cards]
    lines = open(os.path.join(NEU, 'PRODUKTIONSBRIEFING.md'), encoding='utf-8').read().split('\n')
    start = next(n for n, l in enumerate(lines) if l.startswith('## 2.'))
    end = next(n for n, l in enumerate(lines) if l.startswith('## 5.'))
    common = '\n'.join(lines[start:end]).replace('Status ZUORDNEN, WIEDERBESCHAFFEN und GESPERRT nicht als '
                                                  'Generierungsauftrag behandeln.\n', '')
    out = ['# AETERNA – Auftrag an Astra: noch fehlende Kartenbilder', '',
           '*Erzeugt von `werkzeuge/astra_bilder.py` – nicht von Hand ändern. Grundlage: alle Lieferungen in '
           '`ungenutzte_assets/neue_astra_assets/` (Teil 1–6, gerettet, gerettet_2te) und das Produktionsbriefing '
           '(`neue_astra_assets/PRODUKTIONSBRIEFING.md`). Jede Karte mit Status steht in `ASTRA_STAND.csv`.*', '',
           '**Diese Datei ersetzt das alte Produktionsbriefing als Übergabe an die Bild-KI.** Sie enthält nur noch, '
           'was wirklich fehlt; alles Gelieferte ist im Spiel eingebaut und darf nicht erneut erzeugt werden.', '',
           '## 1. Stand', '',
           '| Status | Karten | Spielsteine | Summe |', '|---|---:|---:|---:|']
    allcards = {c['id'] for c in data['cards']}
    for s, text in [('eingebaut', 'Eingebaut (im Spiel)'), ('Revision', 'Eingebaut, Korrektur nötig'),
                    ('offen', 'Neu erzeugen'), ('wiederbeschaffen', 'Teil 4 beschädigt – Original suchen, sonst neu'),
                    ('gesperrt', 'Gesperrt – Zuordnung klären')]:
        k = sum(1 for i, v in status.items() if v == s and i in allcards)
        t = sum(1 for i, v in status.items() if v == s and i not in allcards)
        out.append(f'| {text} | {k} | {t} | **{k + t}** |')
    out += [f'| **Gesamt** | **{len(allcards)}** | **{len(status) - len(allcards)}** | **{len(status)}** |', '',
            f'Im Spiel: {done} Karten und Spielsteine in {atlases} Atlanten, alle 22 Heldenporträts, 4 Marmor-Skins, '
            '5 Schlachtfeld-Tische. Lieferformat ist egal (PNG oder WebP): `werkzeuge/astra_bilder.py` erzeugt daraus '
            'die WebP-Atlanten des Spiels. Bitte weiter **PNG 1024 × 1024** (oder das native Original) liefern, '
            'je Datei genau die ID als Namen, **höchstens 10–12 Bilder je ZIP** – große ZIPs sind mehrfach abgebrochen.', '',
            common, '']

    def section(title, ids, intro):
        out.extend([title, '', intro, ''])
        group = None
        ids = sorted(ids, key=lambda i: motifs.get(i, ('',) * 4 + (10 ** 6,))[4])
        for i in ids:
            g, ctx, name, motif, _ = motifs.get(i, ('Ohne Vorlage', '', names[i], '', 0))
            if g != group:
                group = g
                out.extend(['', f'### {g}', ''])
                if ctx:
                    out.extend([ctx, ''])
                out.extend(['| ID | Name | Status | Konkretes Motiv und Komposition |', '|---|---|---|---|'])
            note = {'Revision': 'Revision: ' + REVISION.get(i, ''), 'wiederbeschaffen': 'Original aus Teil 4 '
                    'suchen; nur wenn verloren, neu erzeugen'}.get(status[i], 'neu')
            out.append(f'| `{i}` | {names[i]} | {note} | {motif} |')
        out.append('')

    section(f'## 5. Kartenillustrationen: {len(cards)}', cards,
            'Profil **K1**: PNG, 1024 × 1024 px, 1:1, deckend, sRGB; Dateiname `<ID>.png`.')
    section(f'## 6. Spielsteine: {len(tokens)}', tokens,
            'Profil **T1**: wie K1, Hauptfigur größer, Hintergrund ruhiger; vollständige Szene, kein Freisteller.')
    if BLOCKED:
        out += ['## 7. Gesperrt – erst klären, nicht erzeugen', '']
        out += [f'- `{i}` {names[i]}: ' + motifs.get(i, ('', '', '', '', 0))[3] for i in sorted(BLOCKED)] + ['']
    open(os.path.join(ROOT, 'ungenutzte_assets/ASTRA_AUFTRAG.md'), 'w', encoding='utf-8').write('\n'.join(out))


if __name__ == '__main__':
    main()
