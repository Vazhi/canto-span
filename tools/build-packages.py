#!/usr/bin/env python3
"""Build a minimal runtime ZIP and a separate recovery/research ZIP."""
from __future__ import annotations
import argparse, hashlib, json, os, shutil, tempfile, zipfile
from pathlib import Path

RUNTIME_FILES = ("main.js", "manifest.json", "styles.css")
FORBIDDEN_RECOVERY_PATTERNS = ("CUSTODY", "DO-NOT-OPEN", "EVALUATOR-RESULTS")


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def add_tree(zf: zipfile.ZipFile, root: Path, arc_root: str, recovery: bool) -> None:
    for path in sorted(root.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(root).as_posix()
        if any(part in {".git", "node_modules", "__pycache__"} for part in path.parts):
            continue
        if path.suffix in {".zip", ".pyc"} or path.name.endswith((".bak", ".tmp", ".orig")):
            continue
        if recovery and any(token in rel.upper() for token in FORBIDDEN_RECOVERY_PATTERNS):
            continue
        zf.write(path, f"{arc_root}/{rel}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("checkpoint")
    parser.add_argument("--output-dir", default="/mnt/data")
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent
    out = Path(args.output_dir)
    out.mkdir(parents=True, exist_ok=True)
    version = json.loads((root / "manifest.json").read_text())["version"]
    runtime_zip = out / f"canto-span-plugin-v{version}.zip"
    slug = args.checkpoint.strip().lower().replace(" ", "-")
    recovery_zip = out / f"canto-span-recovery-v{version}-{slug}.zip"
    for p in (runtime_zip, recovery_zip):
        p.unlink(missing_ok=True)
    with zipfile.ZipFile(runtime_zip, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for name in RUNTIME_FILES:
            zf.write(root / name, f"canto-span/{name}")
    with zipfile.ZipFile(recovery_zip, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        add_tree(zf, root, "canto-span", recovery=True)
    print(json.dumps({
        "runtime_zip": str(runtime_zip),
        "runtime_sha256": sha256(runtime_zip),
        "recovery_zip": str(recovery_zip),
        "recovery_sha256": sha256(recovery_zip),
    }, indent=2))

if __name__ == "__main__":
    main()
