"""Baut die Test-APK aus dem Ordner quellcode/ und signiert sie (APK Signature Scheme v2).

Die App hat minSdk 28; v2 reicht dort für die Installation aus. Unkomprimierte
Einträge (resources.arsc, Bilder, Audio) werden wie bei zipalign auf 4 Byte
ausgerichtet.

Aufruf:
  python3 werkzeuge/apk_bauen.py quellcode Chroniken-1.3.0-Test.apk \
      werkzeuge/signatur/chroniken-test.p12 chroniken-test
Benötigt: pip install cryptography
"""
import hashlib
import io
import os
import struct
import sys
import zipfile

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import pkcs12

STORED = ('.png', '.ogg', '.jpg')
ALIGN = 4
RSA_PKCS1_SHA256 = 0x0103
V2_BLOCK_ID = 0x7109871A


def entries(root):
    files = []
    for base, _dirs, names in os.walk(root):
        for name in names:
            path = os.path.join(base, name)
            rel = os.path.relpath(path, root).replace(os.sep, '/')
            if not rel.startswith('META-INF/'):
                files.append(rel)
    first = ['AndroidManifest.xml', 'classes.dex', 'resources.arsc']
    return [f for f in first if f in files] + sorted(f for f in files if f not in first)


def build_zip(root):
    out = io.BytesIO()
    with zipfile.ZipFile(out, 'w') as z:
        for rel in entries(root):
            with open(os.path.join(root, rel), 'rb') as f:
                data = f.read()
            info = zipfile.ZipInfo(rel, date_time=(1981, 1, 1, 1, 1, 2))
            info.create_system = 0
            info.external_attr = 0
            stored = rel == 'resources.arsc' or rel.endswith(STORED)
            info.compress_type = zipfile.ZIP_STORED if stored else zipfile.ZIP_DEFLATED
            if stored:
                # Alignment extra field (id 0xd935), as written by apksigner/zipalign.
                start = out.tell() + 30 + len(rel.encode())
                pad = (-(start + 6)) % ALIGN
                info.extra = struct.pack('<HHH', 0xD935, 2 + pad, ALIGN) + b'\0' * pad
            z.writestr(info, data, compresslevel=9)
    return out.getvalue()


def lp(b):
    return struct.pack('<I', len(b)) + b


def sign_v2(apk, key, cert_der):
    eocd = apk.rfind(b'PK\x05\x06')
    cd_size, cd_off = struct.unpack_from('<II', apk, eocd + 12)
    assert cd_off + cd_size == eocd, 'unerwartetes ZIP-Layout'
    sections = (apk[:cd_off], apk[cd_off:eocd], apk[eocd:])
    chunks = []
    for sec in sections:
        for i in range(0, len(sec), 1 << 20):
            part = sec[i:i + (1 << 20)]
            chunks.append(hashlib.sha256(b'\xa5' + struct.pack('<I', len(part)) + part).digest())
    digest = hashlib.sha256(b'\x5a' + struct.pack('<I', len(chunks)) + b''.join(chunks)).digest()
    signed_data = (lp(lp(struct.pack('<I', RSA_PKCS1_SHA256) + lp(digest)))
                   + lp(lp(cert_der)) + lp(b''))
    signature = key.sign(signed_data, padding.PKCS1v15(), hashes.SHA256())
    public = key.public_key().public_bytes(serialization.Encoding.DER,
                                           serialization.PublicFormat.SubjectPublicKeyInfo)
    signer = lp(signed_data) + lp(lp(struct.pack('<I', RSA_PKCS1_SHA256) + lp(signature))) + lp(public)
    value = lp(lp(signer))
    pair = struct.pack('<QI', 4 + len(value), V2_BLOCK_ID) + value
    size = len(pair) + 8 + 16
    block = struct.pack('<Q', size) + pair + struct.pack('<Q', size) + b'APK Sig Block 42'
    tail = bytearray(sections[2])
    struct.pack_into('<I', tail, 16, cd_off + len(block))
    return sections[0] + block + sections[1] + bytes(tail)


def main(root, target, keystore, password):
    with open(keystore, 'rb') as f:
        key, cert, _ = pkcs12.load_key_and_certificates(f.read(), password.encode())
    apk = sign_v2(build_zip(root), key, cert.public_bytes(serialization.Encoding.DER))
    with open(target, 'wb') as f:
        f.write(apk)
    print(target, len(apk) // 1024, 'KiB · SHA-256-Zertifikat',
          hashlib.sha256(cert.public_bytes(serialization.Encoding.DER)).hexdigest())


if __name__ == '__main__':
    main(*sys.argv[1:5])
