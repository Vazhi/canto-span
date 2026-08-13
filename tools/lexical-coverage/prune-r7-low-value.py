#!/usr/bin/env python3
"""Retire R7 atomic entries that are outside the spoken core and already structural.

The candidate set is produced by audit-r7-common-priority.py. This tool deliberately
implements only the narrow `atomic_retirement_candidate` class. It does not touch
common-core entries or generic low-priority/manual-review entries.
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import re
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def target_surfaces(audit_path: Path):
    rows = list(csv.DictReader(io.StringIO(audit_path.read_text(encoding="utf-8")), delimiter="\t"))
    targets = {row["word"] for row in rows if row["priority_action"] == "atomic_retirement_candidate"}
    if not targets:
        raise RuntimeError("no atomic retirement candidates found")
    return targets


def line_surface(line: str):
    match = re.match(r'^\s*\[("(?:\\.|[^"\\])*")\s*,', line)
    if not match:
        return None
    return json.loads(match.group(1))


def main() -> int:
    root = repo_root()
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()

    audit_path = root / "data/lexical-frequency/common-spoken-cantonese-r7-priority-audit.tsv"
    r7_path = root / "src/runtime-resources/lexicon/token-lexicon/frequency-gap-fill-r7.js"
    targets = target_surfaces(audit_path)

    lines = r7_path.read_text(encoding="utf-8").splitlines(keepends=True)
    kept = []
    removed = []
    for line in lines:
        surface = line_surface(line)
        if surface in targets:
            removed.append(surface)
            continue
        kept.append(line)

    missing = sorted(targets - set(removed))
    if missing:
        raise RuntimeError(f"candidate surfaces missing from R7 module: {missing}")
    if len(removed) != len(targets):
        raise RuntimeError(f"expected {len(targets)} removals, got {len(removed)}")

    print(f"R7 atomic retirement candidates: {len(targets)}")
    print("removed surfaces: " + " | ".join(sorted(removed)))
    if args.write:
        r7_path.write_text("".join(kept), encoding="utf-8", newline="")
        print(f"wrote pruned R7 module: {r7_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
