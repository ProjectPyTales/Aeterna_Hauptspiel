"""Erstellt das HTML5-Paket für GitHub Pages mit index.html an der Wurzel, unabhängig von Checkout-Zeitstempeln."""
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo
import re

root = Path(__file__).resolve().parents[1]
game = root / "quellcode/assets/game"
version = re.search(r"version:'([\d.]+)'", (game / "model/neu.js").read_text()).group(1)
target = root / "dist" / f"Aeterna-{version}-HTML5.zip"
target.parent.mkdir(exist_ok=True)
with ZipFile(target, "w") as package:
    for file in sorted(path for path in game.rglob("*") if path.is_file()):
        entry = ZipInfo(file.relative_to(game).as_posix())
        entry.create_system = 3
        entry.external_attr = 0o100644 << 16
        package.writestr(entry, file.read_bytes(), compress_type=ZIP_DEFLATED, compresslevel=6)
print(target)
