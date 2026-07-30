#!/usr/bin/env python3
"""Verify exact expert coverage and report/ledger agreement for AA84 R2."""
from __future__ import annotations

import csv
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
PACKET = ROOT / "review-packets/corpus-review/AA84/bare-redup-packet-r2.tsv"
DECISIONS = ROOT / "review-packets/corpus-review/AA84/bare-redup-decisions-r2.tsv"
REPORT = ROOT / "docs/research/AA84-BARE-REDUPLICATED-MANNER-CANDIDATES-R1.md"
LEDGER = ROOT / "docs/research/AA84-BARE-REDUPLICATION-PRIMARY-SOURCE-LEDGER-R1.tsv"
PACKET_ID = "AA84-HKCANCOR-BARE-REDUP-R2-BOUNDED-REVIEW"
EXPECTED_ROWS = 167
EXPECTED_COUNTS = {
    "ambiguous_boundary": 1,
    "discourse_repetition_hesitation_repair": 9,
    "distributive_expression": 21,
    "event_reduplication_or_progressive": 24,
    "genuine_bare_manner_modifier": 8,
    "lexicalized_nonmanner_adverb": 2,
    "nominal_name_or_kin_term": 27,
    "other_lexical_or_structural": 3,
    "property_predication_or_attribution": 29,
    "quantity_degree_expression": 10,
    "sound_symbolic_or_fixed_lexeme": 16,
    "temporal_frequency_expression": 17,
}
LEGAL = set(EXPECTED_COUNTS)
REQUIRED_DECISION_FIELDS = (
    "expert_classification", "expert_subtype", "confidence",
    "reviewer_note", "parser_implication",
)
REQUIRED_REPORT_TEXT = (
    "444 candidate rows",
    "167 rows",
    "genuine bare manner modifier | 8",
    "temporal/frequency expression | 17",
    "distributive expression | 21",
    "event reduplication or progressive `-下` | 24",
    "property predication or attribution | 29",
    "None of the 50 adjacent-identical-token packet rows is a genuine manner example",
    "maan6maan1",
    "maan6maan2",
    "BareReduplicatedMannerAdverbVP",
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

    counts = Counter(row["expert_classification"] for row in decisions)
    if dict(counts) != EXPECTED_COUNTS:
        raise RuntimeError(f"classification totals changed: {dict(sorted(counts.items()))}")
    confidence = Counter(row["confidence"] for row in decisions)
    if confidence != Counter({"high": 166, "medium": 1}):
        raise RuntimeError(f"confidence totals changed: {dict(confidence)}")

    manner = [row for row in decisions if row["expert_classification"] == "genuine_bare_manner_modifier"]
    if Counter(row["base_surface"] for row in manner) != Counter({"慢": 7, "好": 1}):
        raise RuntimeError("direct manner lexical distribution changed")
    if any(row["repetition_mode"] != "internally_repeated_token" for row in manner):
        raise RuntimeError("an adjacent-token row was incorrectly promoted as manner")
    slow_jyutping = Counter(row["matched_jyutping"] for row in manner if row["base_surface"] == "慢")
    if slow_jyutping != Counter({"maan6maan2": 6, "maan6maan1": 1}):
        raise RuntimeError(f"attested 慢慢 Jyutping distribution changed: {dict(slow_jyutping)}")

    ledger = load(LEDGER)
    if len(ledger) != 8:
        raise RuntimeError(f"expected 8 source-ledger rows, got {len(ledger)}")
    if len({row["claim_id"] for row in ledger}) != 8:
        raise RuntimeError("duplicate source-ledger claim IDs")
    for row in ledger:
        for field in ("claim", "source_id", "locator", "evidence", "parser_implication", "limitation", "verification"):
            if not row[field].strip():
                raise RuntimeError(f"blank ledger field {field}: {row['claim_id']}")

    report = REPORT.read_text(encoding="utf-8")
    for required in REQUIRED_REPORT_TEXT:
        if required not in report:
            raise RuntimeError(f"report missing required audited text: {required}")
    for row in manner:
        if row["candidate_id"] not in report:
            raise RuntimeError(f"report omits direct manner candidate: {row['candidate_id']}")

    print(f"verified_rows={len(decisions)}")
    print(f"classification_counts={dict(sorted(counts.items()))}")
    print(f"confidence_counts={dict(sorted(confidence.items()))}")
    print(f"source_ledger_rows={len(ledger)}")
    print(f"direct_manner_ids={[row['candidate_id'] for row in manner]}")

if __name__ == "__main__":
    main()
