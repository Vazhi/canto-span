#!/usr/bin/env python3
from __future__ import annotations

import csv
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
INVENTORY = ROOT / "external-evidence" / "aa84-marked-hkcancor" / "hkcancor-aa84-marked-candidate-inventory.json"
DECISIONS = Path(__file__).with_name("decisions.tsv")

EXPECTED_COUNTS = {"genuine": 3, "false_positive": 11}
ALLOWED_CLASSIFICATIONS = frozenset({"genuine", "false_positive", "ambiguous", "unusable"})
ALLOWED_CLAIM_RELATIONS = frozenset({"direct_attestation", "qualified_attestation", "boundary_evidence", "no_support"})
EXPECTED_GENUINE_SURFACES = frozenset({"符符碌碌", "嗱嗱臨", "死死氣"})
EXPECTED_GENUINE_FILES = frozenset({"FC-025_v.cha", "FC-035_v2.cha", "FC-038a_v2.cha"})


def main() -> None:
    inventory = json.loads(INVENTORY.read_text(encoding="utf-8"))
    candidates = inventory.get("candidates")
    if not isinstance(candidates, list):
        raise RuntimeError("inventory candidates must be an array")
    if len(candidates) != 14:
        raise RuntimeError(f"expected 14 inventory candidates; got {len(candidates)}")

    candidate_ids = [str(row["candidateId"]) for row in candidates]
    if len(candidate_ids) != len(set(candidate_ids)):
        raise RuntimeError("inventory candidate IDs are not unique")
    inventory_by_id = {str(row["candidateId"]): row for row in candidates}

    with DECISIONS.open(encoding="utf-8", newline="") as handle:
        decisions = list(csv.DictReader(handle, delimiter="\t"))
    if len(decisions) != 14:
        raise RuntimeError(f"expected 14 expert decisions; got {len(decisions)}")

    decision_ids = [row["candidate_id"] for row in decisions]
    if len(decision_ids) != len(set(decision_ids)):
        raise RuntimeError("decision candidate IDs are not unique")
    if set(decision_ids) != set(candidate_ids):
        missing = sorted(set(candidate_ids) - set(decision_ids))
        extra = sorted(set(decision_ids) - set(candidate_ids))
        raise RuntimeError(f"decision/inventory ID mismatch; missing={missing}; extra={extra}")

    counts = Counter(row["expert_classification"] for row in decisions)
    unexpected = sorted(set(counts) - ALLOWED_CLASSIFICATIONS)
    if unexpected:
        raise RuntimeError(f"unexpected classifications: {unexpected}")
    expected_full = Counter({"genuine": 3, "false_positive": 11, "ambiguous": 0, "unusable": 0})
    actual_full = Counter({name: counts.get(name, 0) for name in expected_full})
    if actual_full != expected_full:
        raise RuntimeError(f"classification counts differ; expected {dict(expected_full)}, got {dict(actual_full)}")

    for row in decisions:
        candidate = inventory_by_id[row["candidate_id"]]
        if row["source_file"] != str(candidate["sourceFile"]):
            raise RuntimeError(f"source mismatch for {row['candidate_id']}")
        if row["matched_surface_span"] != str(candidate["matchedSurfaceSpan"]):
            raise RuntimeError(f"matched span mismatch for {row['candidate_id']}")
        if not row["confidence"]:
            raise RuntimeError(f"missing confidence for {row['candidate_id']}")
        if not row["reviewer_note"]:
            raise RuntimeError(f"missing reviewer note for {row['candidate_id']}")
        if not row["parser_implication"]:
            raise RuntimeError(f"missing parser implication for {row['candidate_id']}")
        if row["claim_relation"] not in ALLOWED_CLAIM_RELATIONS:
            raise RuntimeError(f"invalid claim relation for {row['candidate_id']}: {row['claim_relation']}")

    genuine = [row for row in decisions if row["expert_classification"] == "genuine"]
    genuine_surfaces = frozenset(row["repeated_surface"] for row in genuine)
    genuine_files = frozenset(row["source_file"] for row in genuine)
    if genuine_surfaces != EXPECTED_GENUINE_SURFACES:
        raise RuntimeError(f"genuine surfaces differ: {sorted(genuine_surfaces)}")
    if genuine_files != EXPECTED_GENUINE_FILES:
        raise RuntimeError(f"genuine source files differ: {sorted(genuine_files)}")

    genuine_relations = Counter(row["claim_relation"] for row in genuine)
    expected_relations = Counter({"direct_attestation": 2, "qualified_attestation": 1})
    if genuine_relations != expected_relations:
        raise RuntimeError(f"genuine claim relations differ: {dict(genuine_relations)}")

    print("AA84 marked HKCanCor R1 expert decisions: PASS")
    print("inventory candidates: 14")
    print("reviewed decisions: 14")
    print("genuine: 3")
    print("false_positive: 11")
    print("ambiguous: 0")
    print("unusable: 0")
    print("genuine source files: 3")


if __name__ == "__main__":
    main()
