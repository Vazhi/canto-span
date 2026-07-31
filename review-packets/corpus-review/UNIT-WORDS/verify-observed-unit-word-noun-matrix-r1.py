#!/usr/bin/env python3
"""Verify the bounded observed unit-word/noun evidence matrix.

This verifier checks research-record integrity only. It does not decide Cantonese
naturalness and does not mutate runtime compatibility data.
"""

from __future__ import annotations

import csv
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
MATRIX = ROOT / "review-packets/corpus-review/UNIT-WORDS/observed-unit-word-noun-matrix-r1.tsv"

EXPECTED_HEADER = [
    "evidence_id",
    "surface",
    "jyutping",
    "unit_word",
    "unit_word_jyutping",
    "unit_word_sense",
    "unit_word_type",
    "noun",
    "noun_jyutping",
    "construction_profile",
    "project_provenance",
    "source_ids",
    "pair_status",
    "structural_np_status",
    "downstream_policy",
    "region_register_context",
    "competing_analysis_or_limit",
    "confidence",
]

ALLOWED_STATUSES = {
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

EXPECTED_STATUS_COUNTS = {
    "source_attested_preferred": 18,
    "source_attested_alternative": 6,
    "general_classifier_substitution": 2,
    "measure_relation_attested": 4,
    "speaker_or_register_limited": 1,
    "structurally_ineligible_for_profile": 10,
    "unreviewed": 2,
    "ambiguous": 1,
}

EXPECTED_SURFACE_STATUS = {
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

EXPECTED_UNIT_WORDS = {
    "個",
    "隻",
    "架",
    "部",
    "杯",
    "碗",
    "本",
    "張",
    "支",
    "枝",
    "位",
    "件",
    "間",
    "對",
    "把",
    "條",
    "啲",
}


def fail(message: str) -> None:
    raise AssertionError(message)


def main() -> None:
    if not MATRIX.exists():
        fail(f"missing matrix: {MATRIX}")

    with MATRIX.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        if reader.fieldnames != EXPECTED_HEADER:
            fail(f"header mismatch: {reader.fieldnames!r}")
        rows = list(reader)

    if len(rows) != 44:
        fail(f"expected 44 rows, found {len(rows)}")

    expected_ids = [f"UWNM-R1-{index:03d}" for index in range(1, 45)]
    actual_ids = [row["evidence_id"] for row in rows]
    if actual_ids != expected_ids:
        fail("evidence IDs are missing, duplicated, or out of sequence")

    for row in rows:
        for field in EXPECTED_HEADER:
            if not row[field].strip():
                fail(f"{row['evidence_id']}: blank required field {field}")
        if row["pair_status"] not in ALLOWED_STATUSES:
            fail(f"{row['evidence_id']}: unsupported pair_status {row['pair_status']}")
        if row["confidence"] not in {"HIGH", "MEDIUM", "LOW"}:
            fail(f"{row['evidence_id']}: unsupported confidence {row['confidence']}")
        if row["downstream_policy"] in {
            "implement_now",
            "runtime_authorized",
            "promotion_authorized",
        }:
            fail(f"{row['evidence_id']}: findings matrix cannot authorize implementation")

    surfaces = [row["surface"] for row in rows]
    if len(surfaces) != len(set(surfaces)):
        fail("surface rows must be unique in the bounded first-phase matrix")

    observed_units = {row["unit_word"] for row in rows}
    if observed_units != EXPECTED_UNIT_WORDS:
        fail(f"unit-word coverage mismatch: {sorted(observed_units)}")

    by_surface = {row["surface"]: row for row in rows}
    for surface, expected_status in EXPECTED_SURFACE_STATUS.items():
        if surface not in by_surface:
            fail(f"missing required surface {surface}")
        actual = by_surface[surface]["pair_status"]
        if actual != expected_status:
            fail(f"{surface}: expected {expected_status}, found {actual}")

    status_counts = Counter(row["pair_status"] for row in rows)
    if dict(status_counts) != EXPECTED_STATUS_COUNTS:
        fail(f"status counts drifted: {dict(status_counts)}")

    di_rows = [row for row in rows if row["unit_word"] == "啲"]
    if len(di_rows) != 4:
        fail(f"expected four 啲 boundary rows, found {len(di_rows)}")
    if any(row["construction_profile"] != "DI-N" for row in di_rows):
        fail("all 啲 rows must remain outside Num-UNIT-N and Dem-UNIT-N")
    if any(row["structural_np_status"] != "not_a_Num_or_Dem_sortal_classifier_profile" for row in di_rows):
        fail("啲 rows must preserve the category/profile separation")

    control_surfaces = {
        "三隻餐廳",
        "三杯書",
        "三本水",
        "三本電話",
        "三張水",
        "三間醫生",
    }
    for surface in control_surfaces:
        row = by_surface[surface]
        if row["downstream_policy"] != "keep_blocked_under_ordinary_literal_reading":
            fail(f"{surface}: control policy drifted")

    candidate_surfaces = {
        "呢個蘋果",
        "一枝鉛筆",
        "一對鞋",
        "一對筷子",
        "一把刀",
        "一把較剪",
        "一條魚",
        "一條街",
        "三條樹枝",
    }
    for surface in candidate_surfaces:
        if by_surface[surface]["downstream_policy"] != "candidate_for_later_controlled_implementation":
            fail(f"{surface}: candidate disposition drifted")

    confidence_counts = Counter(row["confidence"] for row in rows)
    if confidence_counts != Counter({"HIGH": 39, "MEDIUM": 5}):
        fail(f"confidence counts drifted: {dict(confidence_counts)}")

    print(
        "PASS observed unit-word/noun matrix: "
        f"{len(rows)} rows; statuses={dict(status_counts)}; "
        f"confidence={dict(confidence_counts)}"
    )


if __name__ == "__main__":
    main()
