#!/usr/bin/env python3
"""Prepare a compact expert-review queue for final common spoken Cantonese curation.

This tool does not adjudicate lexicality. It combines already-generated spoken-corpus
and Rime evidence and emits review flags so expert effort is concentrated on surfaces
that could plausibly be structural, proper-name/domain concentrated, or otherwise
uncertain near the final 2,000-item cutoff.
"""

from __future__ import annotations

import csv
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CANDIDATES = ROOT / "data/lexical-frequency/common-spoken-cantonese-candidates-5000.tsv"
RIME = ROOT / "external-evidence/lexical-pos/rime-cantonese/c99b16e44d2df77a5cb8fb0867dd2bab7a112cb0/common-spoken-candidates-5000-readings.tsv"
OUT = ROOT / "data/lexical-frequency/common-spoken-cantonese-curation-review-temp.tsv"
SUMMARY = ROOT / "data/lexical-frequency/common-spoken-cantonese-curation-review-temp.json"
REVIEW_LIMIT = 2800

NUMERALS = set("零〇一二兩三四五六七八九十百千萬億幾半第")
MEASURE_TIME = set("個位件條張本間部份年月日號點分鐘秒次歲蚊元度公里米尺吋磅成")
PARTICLE_FINALS = ("咗", "緊", "嘅", "啊", "呀", "喇", "啦", "囉", "囖", "啫", "咋", "咩", "吓", "嘛", "喎", "添")
DIRECTIONAL_FINALS = ("返去", "返嚟", "返來", "出去", "出嚟", "出來", "入去", "入嚟", "入來", "上去", "落去", "過去", "過嚟", "過來")
ASPECT_RESULT_FINALS = ("咗", "緊", "過", "住", "完咗", "到", "唔到", "得到")
PREFIX_FLAGS = {
    "negated_sequence": ("唔", "冇"),
    "demonstrative_sequence": ("呢", "嗰", "哩"),
    "degree_sequence": ("好", "最", "太", "更加", "更", "咁"),
    "pronoun_sequence": ("我哋", "你哋", "佢哋", "我", "你", "佢"),
    "quantified_sequence": ("每", "第", "一", "兩", "三", "四", "五", "六", "七", "八", "九", "十", "幾", "半"),
}


def load_tsv(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as fh:
        return list(csv.DictReader(fh, delimiter="\t"))


def looks_numeric_structural(word: str) -> bool:
    if len(word) < 2 or not any(ch in NUMERALS for ch in word):
        return False
    return any(ch in MEASURE_TIME for ch in word[1:])


def risk_flags(row: dict[str, str], rime: dict[str, str]) -> list[str]:
    rank = int(row["candidate_rank"])
    word = row["word"]
    flags: list[str] = []

    if row.get("known_invalid_atomic") == "true":
        flags.append("known_invalid_atomic")

    proper_share = float(row.get("hkcancor_proper_like_share") or 0.0)
    if proper_share >= 0.80 and int(row.get("hkcancor_count") or 0) >= 2:
        flags.append("proper_name_signal")

    if rime.get("rime_present") != "true":
        flags.append("rime_absent")

    # Corpus imbalance is common for ordinary words because HKCanCor and CantoMap have
    # different domains and tokenization. It becomes a review trigger only near the
    # eventual cutoff and only when historical Cifu does not independently corroborate
    # broad spoken frequency.
    in_cifu = row.get("cifu_top2000") == "true"
    balance = float(row.get("cross_corpus_balance") or 0.0)
    both = row.get("attested_both_spoken_corpora") == "true"
    if rank >= 1000 and not in_cifu and both and balance < 0.05:
        flags.append("lower_rank_domain_concentration")
    if rank >= 1500 and not in_cifu and not both:
        flags.append("lower_rank_single_corpus_non_cifu")

    if len(word) > 1:
        if looks_numeric_structural(word):
            flags.append("numeric_measure_time_sequence")
        for flag, prefixes in PREFIX_FLAGS.items():
            if word.startswith(prefixes):
                flags.append(flag)
                break
        if word.endswith(PARTICLE_FINALS):
            flags.append("particle_final_sequence")
        if word.endswith(DIRECTIONAL_FINALS):
            flags.append("directional_chain")
        elif word.endswith(ASPECT_RESULT_FINALS):
            flags.append("aspect_result_sequence")

    return list(dict.fromkeys(flags))


def main() -> int:
    candidates = load_tsv(CANDIDATES)
    rime_rows = load_tsv(RIME)
    rime_by_rank = {int(r["candidate_rank"]): r for r in rime_rows}
    if len(candidates) != 5000 or len(rime_rows) != 5000:
        raise SystemExit("expected matching 5000-row candidate and Rime ledgers")

    fields = [
        "candidate_rank", "word", "combined_equal_corpus_ppm",
        "hkcancor_count", "cantomap_count", "attested_both_spoken_corpora",
        "cross_corpus_balance", "hkcancor_top_pos", "hkcancor_pos_counts",
        "hkcancor_proper_like_share", "hkcancor_jyutping_counts",
        "cantomap_top_pos", "cantomap_pos_counts", "cantomap_jyutping_counts",
        "cifu_top2000", "cifu_rank", "known_invalid_atomic", "rime_present",
        "rime_readings_compact", "rime_source_files", "review_flags",
        "expert_status", "expert_note",
    ]

    review_rows: list[dict[str, str]] = []
    flag_counts: Counter[str] = Counter()
    convergent_unflagged = 0
    unflagged_nonrime = 0

    for row in candidates:
        rank = int(row["candidate_rank"])
        if rank > REVIEW_LIMIT:
            break
        rime = rime_by_rank[rank]
        if rime["word"] != row["word"]:
            raise SystemExit(f"candidate/Rime mismatch at rank {rank}")
        flags = risk_flags(row, rime)
        if not flags:
            if rime.get("rime_lexical_source_present") == "true":
                convergent_unflagged += 1
            else:
                unflagged_nonrime += 1
            continue
        flag_counts.update(flags)
        review_rows.append({
            **{k: row.get(k, "") for k in fields if k in row},
            "rime_present": rime.get("rime_present", ""),
            "rime_readings_compact": rime.get("rime_readings_compact", ""),
            "rime_source_files": rime.get("rime_source_files", ""),
            "review_flags": "|".join(flags),
            "expert_status": "unreviewed",
            "expert_note": "",
        })

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=fields, delimiter="\t", lineterminator="\n")
        writer.writeheader()
        writer.writerows(review_rows)

    summary = {
        "schema": "canto-span-common-spoken-curation-review-temp-v2",
        "review_limit": REVIEW_LIMIT,
        "candidate_rows_scanned": REVIEW_LIMIT,
        "flagged_review_rows": len(review_rows),
        "unflagged_convergent_lexical_candidates": convergent_unflagged,
        "unflagged_nonrime_candidates": unflagged_nonrime,
        "flag_counts": dict(sorted(flag_counts.items())),
        "important_rule": "Flags prioritize expert review only. They do not automatically include or exclude a surface.",
    }
    SUMMARY.write_text(json.dumps(summary, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
