"""Liest und setzt versionCode, versionName und App-Namen im binären AndroidManifest.xml.

Der String-Pool wird bei jeder Änderung neu aufgebaut, deshalb dürfen neue Texte
beliebig lang sein. Alle anderen Chunks verweisen nur über Indizes auf den Pool und
bleiben unverändert.

Aufrufe:
  Version anzeigen ("versionName versionCode", für die CI):
      python3 manifest_version.py quellcode/AndroidManifest.xml
  Alles anzeigen (Version, Code, App-Name):
      python3 manifest_version.py quellcode/AndroidManifest.xml --info
  Version setzen, optional mit neuem App-Namen:
      python3 manifest_version.py quellcode/AndroidManifest.xml 7 1.4.0 --label Aeterna
"""
import struct
import sys

LABEL_ATTR = 0x01010001
VERSION_CODE_ATTR = 0x0101021B
VERSION_NAME_ATTR = 0x0101021C
TYPE_STRING = 0x03
POOL = 8  # Der String-Pool folgt direkt auf den 8-Byte-Kopf der XML-Datei.


def _check(data):
    if struct.unpack_from('<H', data, 0)[0] != 0x0003:
        raise SystemExit('Kein binäres AndroidManifest.')
    typ, header, _size = struct.unpack_from('<HHI', data, POOL)
    if typ != 0x0001 or header != 28:
        raise SystemExit('String-Pool erwartet.')
    _count, styles, flags, _start, _ = struct.unpack_from('<IIIII', data, POOL + 8)
    if flags & 0x100:
        raise SystemExit('UTF-8-Pools werden nicht unterstützt.')
    if styles:
        raise SystemExit('Pools mit Stilen werden nicht unterstützt.')


def strings(data):
    """Alle Texte des String-Pools in Index-Reihenfolge."""
    _check(data)
    count, _styles, _flags, start, _ = struct.unpack_from('<IIIII', data, POOL + 8)
    out = []
    for i in range(count):
        p = POOL + start + struct.unpack_from('<I', data, POOL + 28 + i * 4)[0]
        n = struct.unpack_from('<H', data, p)[0]
        p += 2
        if n & 0x8000:
            n = ((n & 0x7FFF) << 16) | struct.unpack_from('<H', data, p)[0]
            p += 2
        out.append(data[p:p + 2 * n].decode('utf-16le'))
    return out


def _encode(text):
    n = len(text.encode('utf-16le')) // 2
    head = struct.pack('<H', n) if n < 0x8000 else struct.pack('<HH', 0x8000 | n >> 16, n & 0xFFFF)
    return head + text.encode('utf-16le') + b'\0\0'


def _rebuild(data, texts):
    """Ersetzt den String-Pool durch einen neu aufgebauten mit denselben Indizes."""
    old_size = struct.unpack_from('<I', data, POOL + 4)[0]
    offsets, body = [], b''
    for text in texts:
        offsets.append(len(body))
        body += _encode(text)
    body += b'\0' * (-len(body) % 4)
    start = 28 + 4 * len(texts)
    size = start + len(body)
    pool = (struct.pack('<HHIIIIII', 0x0001, 28, size, len(texts), 0, 0, start, 0)
            + struct.pack('<%dI' % len(offsets), *offsets) + body)
    rest = data[POOL + old_size:]
    return data[:4] + struct.pack('<I', 8 + len(pool) + len(rest)) + pool + rest


def _attributes(data):
    """Liefert (Position, Attribut-ID, Rohwert, Typ, Wert) für alle Attribute aller Elemente."""
    off = POOL + struct.unpack_from('<I', data, POOL + 4)[0]
    resmap = []
    while off < len(data):
        typ, header, size = struct.unpack_from('<HHI', data, off)
        if typ == 0x0180:
            resmap = list(struct.unpack_from('<%dI' % ((size - header) // 4), data, off + header))
        elif typ == 0x0102:
            attr_start, attr_size, attr_count = struct.unpack_from('<HHH', data, off + 16 + 8)
            for k in range(attr_count):
                a = off + 16 + attr_start + k * attr_size
                _ns, name, raw, _vsize, _res0, vtype, value = struct.unpack_from('<IIIHBBI', data, a)
                attr = resmap[name] if name < len(resmap) else None
                yield a, attr, raw, vtype, value
        off += size


def read(data):
    """Gibt (versionName, versionCode, App-Name) zurück."""
    texts, found = strings(data), {}
    for _pos, attr, _raw, vtype, value in _attributes(data):
        if attr == VERSION_CODE_ATTR:
            found.setdefault('code', value)
        elif attr == VERSION_NAME_ATTR:
            found.setdefault('name', texts[value])
        elif attr == LABEL_ATTR and vtype == TYPE_STRING:
            found.setdefault('label', texts[value])
    return found['name'], found['code'], found.get('label')


def patch(data, version_code, version_name, label=None):
    """Setzt versionCode und versionName; mit label auch den App-Namen (application/activity)."""
    data = bytearray(data)
    texts = strings(data)
    seen = set()
    for pos, attr, raw, vtype, value in _attributes(data):
        if attr == VERSION_CODE_ATTR:
            struct.pack_into('<I', data, pos + 16, version_code)
            seen.add('code')
        elif attr == VERSION_NAME_ATTR and vtype == TYPE_STRING:
            texts[value] = version_name
            seen.add('name')
        elif attr == LABEL_ATTR and label is not None:
            if vtype != TYPE_STRING or raw != value:
                raise SystemExit('Der App-Name verweist auf eine Ressource und lässt sich hier nicht setzen.')
            texts[value] = label
            seen.add('label')
    missing = {'code', 'name'} - seen | ({'label'} - seen if label is not None else set())
    if missing:
        raise SystemExit('Nicht gefunden: ' + ', '.join(sorted(missing)))
    return bytes(_rebuild(bytes(data), texts))


if __name__ == '__main__':
    args = sys.argv[1:]
    if len(args) in (1, 2) and (len(args) == 1 or args[1] == '--info'):
        with open(args[0], 'rb') as f:
            name, code, label = read(f.read())
        print(name, code, *([label] if len(args) == 2 else []))
        sys.exit()
    if len(args) not in (3, 5) or (len(args) == 5 and args[3] != '--label'):
        raise SystemExit(__doc__)
    path, code, name = args[0], int(args[1]), args[2]
    label = args[4] if len(args) == 5 else None
    with open(path, 'rb') as f:
        out = patch(f.read(), code, name, label)
    with open(path, 'wb') as f:
        f.write(out)
    print('versionCode', code, '· versionName', name, *(['· App-Name', label] if label else []))
