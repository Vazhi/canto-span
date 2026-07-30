#!/usr/bin/env python3
"""Verify completeness and internal consistency of the 95-row 有得／冇得 review."""

from __future__ import annotations

import csv
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
PACKET = ROOT / "review-packets/corpus-review/JAU-MOU-DAK/full-review-packet-r1.tsv"
DECISIONS = ROOT / "review-packets/corpus-review/JAU-MOU-DAK/full-review-decisions-r1.tsv"

ALLOWED_CLASSES = {
    "compositional_opportunity",
    "polar_opportunity_question",
    "elliptical_opportunity",
    "lexicalized_or_idiomatic",
    "ambiguous_boundary",
    "repair_or_unusable",
}
ALLOWED_CONFIDENCE = {"high", "medium", "low"}
REQUIRED_DECISION_FIELDS = {
    "candidate_id",
    "expert_class",
    "semantic_subtype",
    "composition_status",
    "polarity_or_clause_profile",
    "decision_confidence",
    "decision_reason",
}


def read(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle, delimiter="\t"))


def main() -> None:
    packet = read(PACKET)
    decisions = read(DECISIONS)
    if len(packet) != 95 or len(decisions) != 95:
        raise SystemExit(f"expected 95 packet and decision rows; got {len(packet)} and {len(decisions)}")

    packet_by_id = {row["candidate_id"]: row for row in packet}
    decision_by_id = {row["candidate_id"]: row for row in decisions}
    if len(packet_by_id) != 95 or len(decision_by_id) != 95:
        raise SystemExit("duplicate candidate IDs")
    if set(packet_by_id) != set(decision_by_id):
        missing = sorted(set(packet_by_id) - set(decision_by_id))
        extra = sorted(set(decision_by_id) - set(packet_by_id))
        raise SystemExit(f"decision ID mismatch; missing={missing}, extra={extra}")

    for candidate_id, decision in decision_by_id.items():
        if set(decision) != REQUIRED_DECISION_FIELDS:
            raise SystemExit(f"unexpected decision columns for {candidate_id}")
        if any(not decision[field].strip() for field in REQUIRED_DECISION_FIELDS):
            raise SystemExit(f"blank decision field for {candidate_id}")
        if decision["expert_class"] not in ALLOWED_CLASSES:
            raise SystemExit(f"invalid class for {candidate_id}")
        if decision["decision_confidence"] not in ALLOWED_CONFIDENCE:
            raise SystemExit(f"invalid confidence for {candidate_id}")

        packet_row = packet_by_id[candidate_id]
        if packet_row["profile_kind"] == "polar_yau_mou_dak" and decision["expert_class"] != "polar_opportunity_question":
            raise SystemExit(f"polar candidate not classified as polarity question: {candidate_id}")
        if packet_row["profile_kind"] == "negative_fused_lexeme_diagnostic" and decision["expert_class"] != "lexicalized_or_idiomatic":
            raise SystemExit(f"fused lexical candidate not quarantined: {candidate_id}")
        if decision["expert_class"] == "repair_or_unusable" and "repair" not in decision["composition_status"]:
            raise SystemExit(f"repair decision lacks repair status: {candidate_id}")

    class_counts = Counter(row["expert_class"] for row in decisions)
    confidence_counts = Counter(row["decision_confidence"] for row in decisions)
    profile_counts = Counter(row["profile_kind"] for row in packet)
    print("packet rows:", len(packet))
    print("profile kinds:", dict(sorted(profile_counts.items())))
    print("expert classes:", dict(sorted(class_counts.items())))
    print("confidence:", dict(sorted(confidence_counts.items())))
    print("polar candidate IDs:", ", ".join(
        row["candidate_id"] for row in packet if row["profile_kind"] == "polar_yau_mou_dak"
    ))


if __name__ == "__main__":
    main()
