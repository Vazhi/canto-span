#!/usr/bin/env python3
"""Render the bounded AA84 packet as a compact expert-review table."""
from __future__ import annotations
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SOURCE = ROOT / "review-packets/corpus-review/AA84/bare-redup-packet-r2.tsv"
OUTPUT = ROOT / "review-packets/corpus-review/AA84/bare-redup-review-view-r2.tsv"

FIELDS = [
    "packet_row_zero_based", "candidate_id", "selection_reasons",
    "repetition_mode", "base_surface", "matched_surface_span",
    "matched_hkcancor_pos", "matched_ud_pos", "matched_jyutping",
    "second_token_form", "second_token_hkcancor_pos", "second_token_jyutping",
    "has_local_predicate_candidate", "predicate_distance_lexical_tokens",
    "local_predicate_form", "local_predicate_hkcancor_pos",
    "local_predicate_ud_pos", "local_predicate_jyutping",
    "source_file", "turn_index_zero_based", "participant",
    "text", "previous_text", "next_text",
    "expert_classification", "expert_subtype", "confidence",
    "reviewer_note", "parser_implication",
]

def main():
    rows = list(csv.DictReader(SOURCE.open(encoding="utf-8"), delimiter="\t"))
    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, FIELDS, delimiter="\t", lineterminator="\n", extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)
    print(f"review_view_rows={len(rows)}")

if __name__ == "__main__":
    main()
