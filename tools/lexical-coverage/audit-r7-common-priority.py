#!/usr/bin/env python3
"""Compare PR #791 neutral R7 entries with the common spoken Cantonese core.

This is a priority audit only. It does not delete entries or infer POS/lexicality.
"""

from __future__ import annotations

import csv
import io
import json
import re
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def read_tsv(path: Path):
    return list(csv.DictReader(io.StringIO(path.read_text(encoding="utf-8")), delimiter="\t"))


def parse_r7(path: Path):
    rows = []
    line_re = re.compile(r'^\s*\[("(?:\\.|[^"\\])*")\s*,\s*\{.*?note:\s*("(?:\\.|[^"\\])*")')
    status_re = re.compile(r"prior audit status ([^.;]+)")
    for line in path.read_text(encoding="utf-8").splitlines():
        match = line_re.search(line)
        if not match:
            continue
        surface = json.loads(match.group(1))
        note = json.loads(match.group(2))
        status_match = status_re.search(note)
        rows.append(
            {
                "word": surface,
                "prior_audit_status": status_match.group(1) if status_match else "unknown",
                "r7_note": note,
            }
        )
    if not rows:
        raise RuntimeError(f"no R7 entries parsed from {path}")
    return rows


def main() -> int:
    root = repo_root()
    core_path = root / "data/lexical-frequency/common-spoken-cantonese-core-2000.tsv"
    cifu_path = root / "data/lexical-frequency/cifu-spoken-top-2000.tsv"
    r7_path = root / "src/runtime-resources/lexicon/token-lexicon/frequency-gap-fill-r7.js"
    out_path = root / "data/lexical-frequency/common-spoken-cantonese-r7-priority-audit.tsv"

    core = {row["word"]: row for row in read_tsv(core_path)}
    cifu = {row["word"]: row for row in read_tsv(cifu_path)}
    r7 = parse_r7(r7_path)

    out = io.StringIO(newline="")
    fields = [
        "r7_order",
        "word",
        "common_core",
        "common_rank",
        "common_combined_ppm",
        "common_attested_both",
        "cifu_rank",
        "cifu_spoken_adult",
        "cifu_reconstructed_jyutping",
        "prior_audit_status",
        "priority_action",
    ]
    writer = csv.DictWriter(out, fieldnames=fields, delimiter="\t", lineterminator="\n")
    writer.writeheader()

    counts = {
        "r7_entries": len(r7),
        "in_common_core": 0,
        "outside_common_core": 0,
        "outside_and_handled_structurally": 0,
        "outside_and_manual_review": 0,
        "outside_and_reconstructed_cifu_jyutping": 0,
    }

    for idx, row in enumerate(r7, start=1):
        word = row["word"]
        common = core.get(word)
        cifu_row = cifu.get(word, {})
        in_core = common is not None
        if in_core:
            counts["in_common_core"] += 1
        else:
            counts["outside_common_core"] += 1
        prior = row["prior_audit_status"]
        reconstructed = str(cifu_row.get("cifu_jyutping", "")).startswith("*")
        if not in_core and prior == "handled_structurally":
            counts["outside_and_handled_structurally"] += 1
        if not in_core and prior == "manual_review":
            counts["outside_and_manual_review"] += 1
        if not in_core and reconstructed:
            counts["outside_and_reconstructed_cifu_jyutping"] += 1

        if in_core:
            action = "protect_common_frequency_candidate"
        elif prior == "handled_structurally":
            action = "atomic_retirement_candidate"
        elif prior in {"manual_review", "missing"}:
            action = "low_priority_review"
        else:
            action = "outside_core_review"

        writer.writerow(
            {
                "r7_order": idx,
                "word": word,
                "common_core": "true" if in_core else "false",
                "common_rank": common["rank"] if common else "",
                "common_combined_ppm": common["combined_equal_corpus_ppm"] if common else "",
                "common_attested_both": common["attested_both_spoken_corpora"] if common else "",
                "cifu_rank": cifu_row.get("rank", ""),
                "cifu_spoken_adult": cifu_row.get("cifu_spoken_adult", ""),
                "cifu_reconstructed_jyutping": "true" if reconstructed else "false",
                "prior_audit_status": prior,
                "priority_action": action,
            }
        )

    out_path.write_text(out.getvalue(), encoding="utf-8", newline="")
    print(json.dumps(counts, ensure_ascii=False, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
