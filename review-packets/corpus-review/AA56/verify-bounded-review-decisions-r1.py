#!/usr/bin/env python3
"""Verify completeness, provenance, and bounded claims for AA56 decisions."""

from __future__ import annotations

import csv
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
PACKET = Path(__file__).resolve().parent / "bounded-review-packet-r1.tsv"
DECISIONS = Path(__file__).resolve().parent / "bounded-review-decisions-r1.tsv"
INVENTORY = (
    ROOT
    / "external-evidence"
    / "aa56-no-place-hkcancor"
    / "hkcancor-aa56-no-place-candidate-inventory.tsv"
)

REQUIRED_DECISION_FIELDS = {
    "expert_class",
    "profile_disposition",
    "span_recommendation",
    "decision_confidence",
    "decision_reason",
    "source_limit_or_note",
}
ALLOWED_CONFIDENCE = {"high", "medium", "low"}


def read_tsv(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle, delimiter="\t"))


def main() -> None:
    inventory = read_tsv(INVENTORY)
    packet = read_tsv(PACKET)
    decisions = read_tsv(DECISIONS)

    assert len(inventory) == 1372, len(inventory)
    assert len(packet) == 179, len(packet)
    assert len(decisions) == len(packet), (len(decisions), len(packet))

    inventory_by_id = {row["candidate_id"]: row for row in inventory}
    packet_by_id = {row["candidate_id"]: row for row in packet}
    decision_by_id = {row["candidate_id"]: row for row in decisions}
    assert len(inventory_by_id) == len(inventory)
    assert len(packet_by_id) == len(packet)
    assert len(decision_by_id) == len(decisions)
    assert set(packet_by_id) == set(decision_by_id)
    assert set(packet_by_id) <= set(inventory_by_id)

    packet_ids = [row["packet_id"] for row in packet]
    assert packet_ids == [f"AA56-R1-{index:03d}" for index in range(1, 180)]

    for candidate_id, packet_row in packet_by_id.items():
        inventory_row = inventory_by_id[candidate_id]
        decision = decision_by_id[candidate_id]
        for field in (
            "source_file",
            "turn_index_zero_based",
            "token_index_zero_based",
            "matched_form",
            "nominal_start_form",
            "text",
        ):
            assert packet_row[field] == inventory_row[field], (candidate_id, field)
            assert decision[field] == packet_row[field], (candidate_id, field)
        assert decision["packet_id"] == packet_row["packet_id"]
        assert decision["selection_strata"] == packet_row["selection_strata"]
        assert all(decision[field].strip() for field in REQUIRED_DECISION_FIELDS)
        assert decision["decision_confidence"] in ALLOWED_CONFIDENCE
        assert "REQUIRES_EXPERT_CONTEXT_REVIEW" == inventory_row["annotation_status"]

    human_rows = [
        row
        for row in packet
        if "all_human_plus_predicate" in row["selection_strata"]
    ]
    assert len(human_rows) == 54
    assert Counter(row["matched_form"] for row in human_rows) == {"有": 31, "冇": 23}

    inherited = [
        row
        for row in packet
        if "inherited_aa77_sibling_anchor" in row["selection_strata"]
    ]
    assert len(inherited) == 6

    class_counts = Counter(row["expert_class"] for row in decisions)
    disposition_counts = Counter(row["profile_disposition"] for row in decisions)
    confidence_counts = Counter(row["decision_confidence"] for row in decisions)

    assert class_counts["positive_np_predication_core"] >= 40
    assert class_counts["negative_human_quantificational_clause"] == 20
    assert class_counts["partitive_indefinite_subject_not_marker"] == 16
    assert class_counts["aa55_possession_or_subject_have"] == 14
    assert class_counts["aa77_overt_place_existential"] == 14
    assert class_counts["repair_or_unusable"] == 10
    assert disposition_counts["retain_as_narrow_positive_aa56_evidence"] >= 40
    assert confidence_counts["low"] == 2
    assert sum(class_counts.values()) == 179

    positive_core = [
        row for row in decisions if row["expert_class"] == "positive_np_predication_core"
    ]
    assert all(row["matched_form"] == "有" for row in positive_core)
    negative_human = [
        row
        for row in decisions
        if row["expert_class"] == "negative_human_quantificational_clause"
    ]
    assert all(row["matched_form"] == "冇" for row in negative_human)

    print("inventory rows:", len(inventory))
    print("packet rows:", len(packet))
    print("expert classes:", dict(sorted(class_counts.items())))
    print("dispositions:", dict(sorted(disposition_counts.items())))
    print("confidence:", dict(sorted(confidence_counts.items())))


if __name__ == "__main__":
    main()
