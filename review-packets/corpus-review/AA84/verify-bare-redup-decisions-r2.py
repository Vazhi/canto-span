#!/usr/bin/env python3
"""Verify exact, complete expert coverage for the AA84 R2 packet."""
from __future__ import annotations

import csv
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
PACKET = ROOT / "review-packets/corpus-review/AA84/bare-redup-packet-r2.tsv"
DECISIONS = ROOT / "review-packets/corpus-review/AA84/bare-redup-decisions-r2.tsv"
PACKET_ID = "AA84-HKCANCOR-BARE-REDUP-R2-BOUNDED-REVIEW"
EXPECTED_ROWS = 167
LEGAL = {
    "genuine_bare_manner_modifier",
    "lexicalized_nonmanner_adverb",
    "temporal_frequency_expression",
    "distributive_expression",
    "quantity_degree_expression",
    "event_reduplication_or_progressive",
    "property_predication_or_attribution",
    "nominal_name_or_kin_term",
    "sound_symbolic_or_fixed_lexeme",
    "discourse_repetition_hesitation_repair",
    "other_lexical_or_structural",
    "ambiguous_boundary",
}
REQUIRED_DECISION_FIELDS = (
    "expert_classification", "expert_subtype", "confidence",
    "reviewer_note", "parser_implication",
)


def load(path: Path):
    return list(csv.DictReader(path.open(encoding="utf-8"), delimiter="\t"))


def main():
    packet = load(PACKET)
    decisions = load(DECISIONS)
    if len(packet) != EXPECTED_ROWS or len(decisions) != EXPECTED_ROWS:
        raise RuntimeError(f"expected {EXPECTED_ROWS} rows; packet={len(packet)} decisions={len(decisions)}")

    packet_by_id = {row["candidate_id"]: row for row in packet}
    decisions_by_id = {row["candidate_id"]: row for row in decisions}
    if len(packet_by_id) != EXPECTED_ROWS or len(decisions_by_id) != EXPECTED_ROWS:
        raise RuntimeError("duplicate candidate IDs")
    if set(packet_by_id) != set(decisions_by_id):
        raise RuntimeError("decision candidate coverage differs from packet")

    immutable = (
        "packet_id", "packet_row_zero_based", "candidate_id", "source_file",
        "turn_index_zero_based", "token_index_zero_based", "participant",
        "repetition_mode", "base_surface", "matched_surface_span",
        "matched_jyutping", "text", "previous_text", "next_text",
    )
    for cid, original in packet_by_id.items():
        decision = decisions_by_id[cid]
        if decision["packet_id"] != PACKET_ID:
            raise RuntimeError(f"packet ID mismatch: {cid}")
        for field in immutable:
            if original[field] != decision[field]:
                raise RuntimeError(f"immutable field mismatch {field}: {cid}")
        if decision["expert_classification"] not in LEGAL:
            raise RuntimeError(f"illegal classification: {cid}")
        if decision["confidence"] not in {"high", "medium", "low"}:
            raise RuntimeError(f"illegal confidence: {cid}")
        for field in REQUIRED_DECISION_FIELDS:
            if not decision[field].strip():
                raise RuntimeError(f"blank {field}: {cid}")

    manner = [row for row in decisions if row["expert_classification"] == "genuine_bare_manner_modifier"]
    if len(manner) != 8:
        raise RuntimeError(f"expected 8 direct manner rows, got {len(manner)}")
    if Counter(row["base_surface"] for row in manner) != Counter({"慢": 7, "好": 1}):
        raise RuntimeError("direct manner lexical distribution changed")
    slow_jyutping = {row["matched_jyutping"] for row in manner if row["base_surface"] == "慢"}
    if not {"maan6maan1", "maan6maan2"}.issubset(slow_jyutping):
        raise RuntimeError("mixed attested 慢慢 Jyutping annotations were not preserved")

    counts = Counter(row["expert_classification"] for row in decisions)
    confidence = Counter(row["confidence"] for row in decisions)
    print(f"verified_rows={len(decisions)}")
    print(f"classification_counts={dict(sorted(counts.items()))}")
    print(f"confidence_counts={dict(sorted(confidence.items()))}")
    print(f"direct_manner_ids={[row['candidate_id'] for row in manner]}")

if __name__ == "__main__":
    main()
