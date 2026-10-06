"""Setzt versionCode und Versionstext im binären AndroidManifest.xml.

Der Versionstext wird in allen Strings ersetzt (versionName und App-Name
"Chroniken 1.2.2"). Alte und neue Version müssen gleich lang sein, damit der
String-Pool unverändert groß bleibt.

Aufruf: python3 manifest_version.py quellcode/AndroidManifest.xml 6 1.2.2 1.3.0
"""
import struct
import sys

VERSION_CODE_ATTR = 0x0101021B


def patch(data, version_code, old, new):
    if len(old) != len(new):
        raise SystemExit('Alte und neue Version müssen gleich lang sein.')
    b = bytearray(data)
    if struct.unpack_from('<H', b, 0)[0] != 0x0003:
        raise SystemExit('Kein binäres AndroidManifest.')
    sp = 8
    typ, header, size = struct.unpack_from('<HHI', b, sp)
    assert typ == 0x0001, 'String-Pool erwartet'
    count, _styles, flags, strings_start, _ = struct.unpack_from('<IIIII', b, sp + 8)
    assert not flags & 0x100, 'UTF-8-Pools werden nicht unterstützt'
    replaced = []
    for i in range(count):
        p = sp + strings_start + struct.unpack_from('<I', b, sp + header + i * 4)[0]
        n = struct.unpack_from('<H', b, p)[0]
        start = p + 2
        if n & 0x8000:
            n = ((n & 0x7FFF) << 16) | struct.unpack_from('<H', b, p + 2)[0]
            start = p + 4
        text = b[start:start + 2 * n].decode('utf-16le')
        if old in text:
            b[start:start + 2 * n] = text.replace(old, new).encode('utf-16le')
            replaced.append(text.replace(old, new))
    # Resource map gives each attribute name its framework id.
    off, resmap, patched = sp + size, [], False
    while off < len(b):
        typ, header, size = struct.unpack_from('<HHI', b, off)
        if typ == 0x0180:
            resmap = list(struct.unpack_from('<%dI' % ((size - header) // 4), b, off + header))
        elif typ == 0x0102:
            attr_start, attr_size, attr_count = struct.unpack_from('<HHH', b, off + 16 + 8)
            for k in range(attr_count):
                a = off + 16 + attr_start + k * attr_size
                name = struct.unpack_from('<I', b, a + 4)[0]
                if name < len(resmap) and resmap[name] == VERSION_CODE_ATTR:
                    struct.pack_into('<I', b, a + 16, version_code)
                    patched = True
        off += size
    if not patched:
        raise SystemExit('versionCode nicht gefunden.')
    return bytes(b), replaced


if __name__ == '__main__':
    path, code, old, new = sys.argv[1], int(sys.argv[2]), sys.argv[3], sys.argv[4]
    with open(path, 'rb') as f:
        out, replaced = patch(f.read(), code, old, new)
    with open(path, 'wb') as f:
        f.write(out)
    print('versionCode', code, '· ersetzt:', ', '.join(replaced) or '–')
