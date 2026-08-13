#!/usr/bin/env python3
"""Retire only low-value R7 atomic entries proven to recover regression cases.

The tool derives candidates from the persisted broad retirement experiment, intersects
those recovered cases with `atomic_retirement_candidate` surfaces, and excludes the
protected Cifu #796 band (ranks 1001..1250). It never infers a retirement solely from
low frequency.
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import re
from pathlib import Path

PROTECTED_CIFU_MIN = 1001
PROTECTED_CIFU_MAX = 1250


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def load_audit(path: Path):
    return list(csv.DictReader(io.StringIO(path.read_text(encoding="utf-8")), delimiter="\t"))


def line_surface(line: str):
    match = re.match(r'^\s*\[("(?:\\.|[^"\\])*")\s*,', line)
    return json.loads(match.group(1)) if match else None


def derive_targets(audit_rows, result):
    recovered_sources = [row.get("source", "") for row in result.get("recovered_cases", [])]
    removed = set(result.get("removed_surfaces", []))
    targets = []
    protected = []
    for row in audit_rows:
        word = row["word"]
        if row.get("priority_action") != "atomic_retirement_candidate" or word not in removed:
            continue
        if not any(word and word in source for source in recovered_sources):
            continue
        rank = int(row["cifu_rank"]) if row.get("cifu_rank") else None
        record = {"word": word, "cifu_rank": rank}
        if rank is not None and PROTECTED_CIFU_MIN <= rank <= PROTECTED_CIFU_MAX:
            protected.append(record)
        else:
            targets.append(record)
    return targets, protected


def main() -> int:
    root = repo_root()
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()

    audit_path = root / "data/lexical-frequency/common-spoken-cantonese-r7-priority-audit.tsv"
    result_path = root / "data/lexical-frequency/common-spoken-cantonese-r7-regression-result.json"
    r7_path = root / "src/runtime-resources/lexicon/token-lexicon/frequency-gap-fill-r7.js"

    audit_rows = load_audit(audit_path)
    result = json.loads(result_path.read_text(encoding="utf-8"))
    targets, protected = derive_targets(audit_rows, result)
    target_words = {row["word"] for row in targets}

    if not target_words:
        raise RuntimeError("no causal-safe retirement targets derived")

    lines = r7_path.read_text(encoding="utf-8").splitlines(keepends=True)
    kept = []
    removed_words = []
    for line in lines:
        surface = line_surface(line)
        if surface in target_words:
            removed_words.append(surface)
        else:
            kept.append(line)

    if set(removed_words) != target_words:
        raise RuntimeError(
            f"R7 target mismatch: expected {sorted(target_words)}, removed {sorted(set(removed_words))}"
        )

    print(json.dumps({
        "causal_safe_targets": targets,
        "protected_recovered_targets_not_touched": protected,
        "removed_count": len(removed_words),
    }, ensure_ascii=False, indent=2, sort_keys=True))

    if args.write:
        r7_path.write_text("".join(kept), encoding="utf-8", newline="")
        print(f"wrote causal-safe R7 retirements: {r7_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
