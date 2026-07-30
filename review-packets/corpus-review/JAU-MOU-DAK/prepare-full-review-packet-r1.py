#!/usr/bin/env python3
"""Project the exhaustive 有得／冇得 inventory into a lossless expert-review table."""

from __future__ import annotations

import csv
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
SOURCE = (
    ROOT
    / "external-evidence/jau-mou-dak-hkcancor"
    / "hkcancor-jau-mou-dak-candidate-inventory.tsv"
)
OUTPUT = ROOT / "review-packets/corpus-review/JAU-MOU-DAK/full-review-packet-r1.tsv"
QUERY_ID = "HKCANCOR-JAU-MOU-DAK-R1"

OUTPUT_FIELDS = [
    "candidate_id",
    "query_id",
    "profile_kind",
    "tokenization_kind",
    "matched_surface_span",
    "source_file",
    "turn_index_zero_based",
    "participant",
    "utterance_initial",
    "utterance_final",
    "following_predicate_candidate",
    "nearest_left_lexical_word",
    "nearest_left_lexical_ud_pos",
    "nearest_right_lexical_word",
    "nearest_right_lexical_ud_pos",
    "text",
    "previous_text",
    "next_text",
    "expert_class",
    "semantic_subtype",
    "composition_status",
    "polarity_or_clause_profile",
    "decision_confidence",
    "decision_reason",
]

COPY_FIELDS = OUTPUT_FIELDS[:18]


def main() -> None:
    with SOURCE.open(encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle, delimiter="\t"))
    if len(rows) != 95:
        raise SystemExit(f"expected 95 exhaustive candidates, found {len(rows)}")
    if any(row["query_id"] != QUERY_ID for row in rows):
        raise SystemExit("unexpected query ID")
    if len({row["candidate_id"] for row in rows}) != len(rows):
        raise SystemExit("duplicate candidate IDs")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(
            handle, fieldnames=OUTPUT_FIELDS, delimiter="\t", lineterminator="\n"
        )
        writer.writeheader()
        for source in rows:
            row = {field: source[field] for field in COPY_FIELDS}
            for field in OUTPUT_FIELDS[18:]:
                row[field] = ""
            writer.writerow(row)
    print(f"wrote {len(rows)} rows to {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
