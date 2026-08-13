#!/usr/bin/env python3
"""Remove expert-adjudicated invalid atomic surfaces from non-R7 token modules.

Only exact one-line entries whose surfaces appear in the adjudicated retirement ledgers
are eligible. Valid rare/formal/archaic Cantonese is outside this tool's scope.
"""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LEDGER_DIR = ROOT / "data/lexical-frequency"
LEDGER_GLOB = "r7-invalid-atomic-retirements*.tsv"
TOKEN_DIR = ROOT / "src/runtime-resources/lexicon/token-lexicon"
R7_NAME = "frequency-gap-fill-r7.js"
REPORT = ROOT / "data/lexical-frequency/invalid-curated-atomic-retirement-report.json"
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
    removed: list[dict[str, object]] = []
    changed_paths: list[str] = []
    for path in sorted(TOKEN_DIR.rglob("*.js")):
        if path.name == R7_NAME:
            continue
        original = path.read_text(encoding="utf-8").splitlines(keepends=True)
        kept: list[str] = []
        changed = False
        for lineno, line in enumerate(original, 1):
            match = ENTRY_RE.match(line)
            surface = None
            if match:
                raw = match.group(1)
                surface = bytes(raw, "utf-8").decode("unicode_escape") if "\\" in raw else raw
            if surface in wanted:
                removed.append({
                    "surface": surface,
                    "rank": int(wanted[surface]["rank"]),
                    "path": path.relative_to(ROOT).as_posix(),
                    "line": lineno,
                })
                changed = True
                continue
            kept.append(line)
        if changed:
            path.write_text("".join(kept), encoding="utf-8")
            changed_paths.append(path.relative_to(ROOT).as_posix())

    payload = {
        "schema": "canto-span-invalid-curated-atomic-retirement-report-v1",
        "policy": "remove only exact expert-adjudicated invalid atomic entries; frequency/regression are not deletion criteria",
        "removed_count": len(removed),
        "removed": removed,
        "changed_path_count": len(changed_paths),
        "changed_paths": changed_paths,
    }
    REPORT.write_text(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
