#!/usr/bin/env python3
"""Verify the bounded AA77 packet and its complete expert decisions."""

from __future__ import annotations

import csv
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
PACKET = ROOT / "review-packets/corpus-review/AA77/bounded-profile-packet-r1.tsv"
DECISIONS = ROOT / "review-packets/corpus-review/AA77/bounded-profile-decisions-r1.tsv"
EXPECTED_PACKET_ID = "AA77-HKCANCOR-NONINITIAL-JAU-MOU-R1-BOUNDED-REVIEW"
EXPECTED_QUERY_ID = "AA77-HKCANCOR-NONINITIAL-JAU-MOU-R1"
ALLOWED_RELEVANCE = {"genuine", "sibling_profile", "false_positive", "ambiguous", "unusable"}
ALLOWED_CONFIDENCE = {"high", "medium", "low"}
EXPECTED_RELEVANCE_COUNTS = {
    "genuine": 4,
    "sibling_profile": 28,
    "false_positive": 5,
    "ambiguous": 2,
    "unusable": 1,
}


def read_tsv(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle, delimiter="\t"))


def main() -> None:
    packet = read_tsv(PACKET)
    decisions = read_tsv(DECISIONS)

    assert len(packet) == 40, f"packet rows: {len(packet)}"
    assert len(decisions) == 40, f"decision rows: {len(decisions)}"
    assert {row["packet_id"] for row in packet} == {EXPECTED_PACKET_ID}
    assert {row["packet_id"] for row in decisions} == {EXPECTED_PACKET_ID}
    assert {row["query_id"] for row in packet} == {EXPECTED_QUERY_ID}

    packet_ids = [row["candidate_id"] for row in packet]
    decision_ids = [row["candidate_id"] for row in decisions]
    assert len(packet_ids) == len(set(packet_ids)), "duplicate packet candidate ID"
    assert len(decision_ids) == len(set(decision_ids)), "duplicate decision candidate ID"
    assert set(packet_ids) == set(decision_ids), "packet and decision candidate sets differ"

    forms = Counter(row["matched_form"] for row in packet)
    strata = Counter(row["mechanical_stratum"] for row in packet)
    relevance = Counter(row["aa77_relevance"] for row in decisions)

    assert forms == {"有": 20, "冇": 20}, forms
    assert len(strata) == 10 and set(strata.values()) == {4}, strata
    assert set(relevance) <= ALLOWED_RELEVANCE, relevance
    assert dict(relevance) == EXPECTED_RELEVANCE_COUNTS, relevance

    packet_index = {row["candidate_id"]: row for row in packet}
    for row in decisions:
        cid = row["candidate_id"]
        assert row["mechanical_stratum"] == packet_index[cid]["mechanical_stratum"], cid
        assert row["matched_form"] == packet_index[cid]["matched_form"], cid
        assert row["aa77_relevance"] in ALLOWED_RELEVANCE, cid
        assert row["decision_confidence"] in ALLOWED_CONFIDENCE, cid
        for field in ("expert_profile", "decision_reason", "source_comparison_notes"):
            assert row[field].strip(), f"{cid}: blank {field}"
            assert row[field] == row[field].strip(), f"{cid}: surrounding whitespace in {field}"
        for field in ("aa77_relevance", "decision_confidence"):
            assert row[field] == row[field].strip(), f"{cid}: surrounding whitespace in {field}"

    genuine_ids = [row["candidate_id"] for row in decisions if row["aa77_relevance"] == "genuine"]
    assert all(packet_index[cid]["mechanical_stratum"] == "place_left" for cid in genuine_ids)
    assert {packet_index[cid]["matched_form"] for cid in genuine_ids} == {"有", "冇"}

    print("packet rows:", len(packet))
    print("matched forms:", dict(forms))
    print("strata:", dict(strata))
    print("AA77 relevance:", dict(relevance))
    print("genuine candidate IDs:", ", ".join(genuine_ids))


if __name__ == "__main__":
    main()
