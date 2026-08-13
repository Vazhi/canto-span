#!/usr/bin/env python3
"""Remove expert-adjudicated invalid atomic entries from frequency-gap-fill-r7.js.

This tool is intentionally narrow. The retirement ledgers determine lexical invalidity;
frequency and regression outcomes do not. Valid rare/formal/archaic Cantonese is not
removed by this tool.
"""
from __future__ import annotations

import argparse
import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LEDGER_DIR = ROOT / "data/lexical-frequency"
LEDGER_GLOB = "r7-invalid-atomic-retirements*.tsv"
R7 = ROOT / "src/runtime-resources/lexicon/token-lexicon/frequency-gap-fill-r7.js"
REPORT = ROOT / "data/lexical-frequency/r7-invalid-atomic-retirement-report.json"
ENTRY_RE = re.compile(r'^\s*\["((?:[^"\\]|\\.)*)",\s*\{')


def load_targets() -> tuple[dict[str, dict[str, str]], list[str]]:
    targets: dict[str, dict[str, str]] = {}
    ledgers = sorted(LEDGER_DIR.glob(LEDGER_GLOB))
    if not ledgers:
        raise SystemExit("no invalid-atomic retirement ledgers found")
    for ledger in ledgers:
        with ledger.open(encoding="utf-8", newline="") as fh:
            for row in csv.DictReader(fh, delimiter="\t"):
                if row["disposition"] != "retire_invalid_atomic":
                    continue
                surface = row["surface"]
                if surface in targets:
                    raise SystemExit(f"duplicate retirement surface across ledgers: {surface}")
                targets[surface] = {**row, "ledger": ledger.name}
    return targets, [ledger.name for ledger in ledgers]


def render(write: bool) -> dict:
    targets, ledgers = load_targets()
    original = R7.read_text(encoding="utf-8").splitlines(keepends=True)
    kept: list[str] = []
    removed: list[str] = []
    for line in original:
        match = ENTRY_RE.match(line)
        if match:
            surface = bytes(match.group(1), "utf-8").decode("unicode_escape") if "\\" in match.group(1) else match.group(1)
            if surface in targets:
                removed.append(surface)
                continue
        kept.append(line)

    removed_set = set(removed)
    absent = sorted(set(targets) - removed_set)
    if len(removed) != len(removed_set):
        raise SystemExit("duplicate R7 entries encountered for a retirement surface")

    payload = {
        "schema": "canto-span-invalid-r7-atomic-retirement-report-v1",
        "policy": "remove only expert-adjudicated nonlexical/non-Cantonese atomic entries; frequency/regression are not deletion criteria",
        "ledgers": ledgers,
        "ledger_target_count": len(targets),
        "removed_from_r7_count": len(removed),
        "removed_from_r7": removed,
        "ledger_targets_absent_from_r7_count": len(absent),
        "ledger_targets_absent_from_r7": absent,
    }

    if write:
        R7.write_text("".join(kept), encoding="utf-8")
        REPORT.write_text(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    else:
        print(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True))
    return payload


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    render(args.write)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
