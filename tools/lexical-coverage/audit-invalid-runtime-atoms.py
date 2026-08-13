#!/usr/bin/env python3
"""Audit expert-adjudicated invalid atomic surfaces across the full token lexicon."""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LEDGER_DIR = ROOT / "data/lexical-frequency"
LEDGER_GLOB = "r7-invalid-atomic-retirements*.tsv"
TOKEN_DIR = ROOT / "src/runtime-resources/lexicon/token-lexicon"
REPORT = ROOT / "data/lexical-frequency/invalid-atomic-runtime-audit.json"
ENTRY_RE = re.compile(r'^\s*\["((?:[^"\\]|\\.)*)",\s*\{')


def targets() -> dict[str, dict[str, str]]:
    out: dict[str, dict[str, str]] = {}
    for ledger in sorted(LEDGER_DIR.glob(LEDGER_GLOB)):
        with ledger.open(encoding="utf-8", newline="") as fh:
            for row in csv.DictReader(fh, delimiter="\t"):
                if row["disposition"] != "retire_invalid_atomic":
                    continue
                surface = row["surface"]
                existing = out.get(surface)
                if existing and (existing["rank"] != row["rank"] or existing["disposition"] != row["disposition"]):
                    raise SystemExit(f"conflicting target: {surface}")
                out.setdefault(surface, row)
    return out


def main() -> int:
    wanted = targets()
    hits: list[dict[str, object]] = []
    for path in sorted(TOKEN_DIR.rglob("*.js")):
        rel = path.relative_to(ROOT).as_posix()
        for lineno, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            match = ENTRY_RE.match(line)
            if not match:
                continue
            surface = bytes(match.group(1), "utf-8").decode("unicode_escape") if "\\" in match.group(1) else match.group(1)
            if surface in wanted:
                hits.append({
                    "surface": surface,
                    "rank": int(wanted[surface]["rank"]),
                    "path": rel,
                    "line": lineno,
                })
    payload = {
        "schema": "canto-span-invalid-atomic-runtime-audit-v1",
        "policy": "listed targets are expert-adjudicated non-atomic/noisy surfaces; valid rare Cantonese is outside this audit",
        "target_count": len(wanted),
        "runtime_hit_count": len(hits),
        "runtime_hit_surface_count": len({hit["surface"] for hit in hits}),
        "hits": hits,
    }
    REPORT.write_text(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
