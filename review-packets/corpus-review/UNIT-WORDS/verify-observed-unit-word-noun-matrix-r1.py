#!/usr/bin/env python3
"""Verify the bounded observed unit-word/noun evidence matrix."""

from __future__ import annotations

import csv
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
MATRIX = ROOT / "review-packets/corpus-review/UNIT-WORDS/observed-unit-word-noun-matrix-r1.tsv"

HEADER = [
    "evidence_id", "surface", "jyutping", "unit_word", "unit_word_jyutping",
    "unit_word_sense", "unit_word_type", "noun", "noun_jyutping",
    "construction_profile", "project_provenance", "source_ids", "pair_status",
    "structural_np_status", "downstream_policy", "region_register_context",
    "competing_analysis_or_limit", "confidence",
]

STATUSES = {
    "source_attested_preferred",
    "source_attested_alternative",
    "general_classifier_substitution",
    "measure_relation_attested",
    "semantic_shift_attested",
    "corpus_attested_unadjudicated",
    "speaker_or_register_limited",
    "judged_degraded_in_defined_context",
    "structurally_ineligible_for_profile",
    "unreviewed",
    "ambiguous",
}

STATUS_COUNTS = Counter({
    "source_attested_preferred": 18,
    "source_attested_alternative": 6,
    "general_classifier_substitution": 2,
    "measure_relation_attested": 4,
    "speaker_or_register_limited": 1,
    "structurally_ineligible_for_profile": 10,
    "unreviewed": 2,
    "ambiguous": 1,
})

UNIT_WORDS = {
    "個", "隻", "架", "部", "杯", "碗", "本", "張", "支", "枝", "位",
    "件", "間", "對", "把", "條", "啲",
}

SURFACE_STATUS = {
    "呢個蘋果": "source_attested_alternative",
    "三隻餐廳": "structurally_ineligible_for_profile",
    "兩架車": "source_attested_preferred",
    "一部車": "source_attested_alternative",
    "三部電話": "source_attested_preferred",
    "三架電話": "ambiguous",
    "三杯書": "structurally_ineligible_for_profile",
    "兩碗水": "unreviewed",
    "三本水": "structurally_ineligible_for_profile",
    "三本電話": "structurally_ineligible_for_profile",
    "三張水": "structurally_ineligible_for_profile",
    "兩支筆": "source_attested_preferred",
    "一枝鉛筆": "source_attested_alternative",
    "三間醫生": "structurally_ineligible_for_profile",
    "一對鞋": "source_attested_preferred",
    "一對筷子": "source_attested_alternative",
    "一把刀": "source_attested_preferred",
    "一把較剪": "source_attested_preferred",
    "一條魚": "source_attested_preferred",
    "一條街": "source_attested_preferred",
    "三條樹枝": "source_attested_preferred",
    "啲魚": "structurally_ineligible_for_profile",
    "啲書": "structurally_ineligible_for_profile",
    "啲水": "structurally_ineligible_for_profile",
    "啲蘋果": "structurally_ineligible_for_profile",
}

CONTROLS = {
    "三隻餐廳", "三杯書", "三本水", "三本電話", "三張水", "三間醫生",
}

CANDIDATES = {
    "呢個蘋果", "一枝鉛筆", "一對鞋", "一對筷子", "一把刀", "一把較剪",
    "一條魚", "一條街", "三條樹枝",
}


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> None:
    require(MATRIX.exists(), f"missing matrix: {MATRIX}")
    with MATRIX.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        require(reader.fieldnames == HEADER, f"header mismatch: {reader.fieldnames!r}")
        rows = list(reader)

    require(len(rows) == 44, f"expected 44 rows, found {len(rows)}")
    require(
        [row["evidence_id"] for row in rows]
        == [f"UWNM-R1-{index:03d}" for index in range(1, 45)],
        "evidence IDs are missing, duplicated, or out of sequence",
    )

    for row in rows:
        for field in HEADER:
            require(row[field].strip(), f"{row['evidence_id']}: blank {field}")
        require(row["pair_status"] in STATUSES, f"{row['evidence_id']}: bad status")
        require(row["confidence"] in {"HIGH", "MEDIUM", "LOW"}, f"{row['evidence_id']}: bad confidence")
        require(
            row["downstream_policy"] not in {"implement_now", "runtime_authorized", "promotion_authorized"},
            f"{row['evidence_id']}: findings cannot authorize implementation",
        )

    by_surface = {row["surface"]: row for row in rows}
    require(len(by_surface) == 44, "surface rows must be unique")
    require({row["unit_word"] for row in rows} == UNIT_WORDS, "unit-word coverage drifted")

    for surface, status in SURFACE_STATUS.items():
        require(surface in by_surface, f"missing required surface {surface}")
        require(by_surface[surface]["pair_status"] == status, f"{surface}: status drifted")

    actual_statuses = Counter(row["pair_status"] for row in rows)
    require(actual_statuses == STATUS_COUNTS, f"status counts drifted: {dict(actual_statuses)}")

    di_rows = [row for row in rows if row["unit_word"] == "啲"]
    require(len(di_rows) == 4, f"expected four 啲 rows, found {len(di_rows)}")
    require(all(row["construction_profile"] == "DI-N" for row in di_rows), "啲 profile drifted")
    require(
        all(row["structural_np_status"] == "not_a_Num_or_Dem_sortal_classifier_profile" for row in di_rows),
        "啲 category boundary drifted",
    )

    for surface in CONTROLS:
        require(
            by_surface[surface]["downstream_policy"] == "keep_blocked_under_ordinary_literal_reading",
            f"{surface}: control policy drifted",
        )

    for surface in CANDIDATES:
        require(
            by_surface[surface]["downstream_policy"] == "candidate_for_later_controlled_implementation",
            f"{surface}: candidate disposition drifted",
        )

    confidence = Counter(row["confidence"] for row in rows)
    require(confidence == Counter({"HIGH": 38, "MEDIUM": 6}), f"confidence counts drifted: {dict(confidence)}")

    print(
        f"PASS observed unit-word/noun matrix: {len(rows)} rows; "
        f"statuses={dict(actual_statuses)}; confidence={dict(confidence)}"
    )


if __name__ == "__main__":
    main()
