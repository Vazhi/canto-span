#!/usr/bin/env python3
"""Select a deterministic, profile-complete AA56 review packet.

The full 1,372-row inventory remains the provenance endpoint. This selector retains
all high-value positive/negative human-predicate rows and all utterance-initial
source-shaped indefinite-NP-plus-predicate rows, then adds fixed, file-diverse
controls for the principal competing analyses.
"""

from __future__ import annotations

import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
INVENTORY = (
    ROOT
    / "external-evidence"
    / "aa56-no-place-hkcancor"
    / "hkcancor-aa56-no-place-candidate-inventory.tsv"
)
OUTPUT = Path(__file__).resolve().parent / "bounded-review-packet-r1.tsv"

INDEFINITE_STARTS = {
    "人",
    "一",
    "一啲",
    "個",
    "幾",
    "啲",
    "好多",
    "兩",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "位",
    "件",
    "份",
    "隻",
    "套",
    "班",
    "種",
    "架",
    "嘢",
}
PRONOUNS = {"我", "我哋", "你", "你哋", "佢", "佢哋", "人哋"}
LOCATIVE_CUES = {
    "喺",
    "喺度",
    "呢度",
    "嗰度",
    "邊度",
    "入面",
    "裡面",
    "裏面",
    "上面",
    "下面",
    "出面",
    "香港",
    "屋企",
    "學校",
    "課室",
}
WH_STARTS = {"乜", "乜嘢", "咩"}

# Coordinates inherited from the bounded AA77 sibling review. The repaired
# 有隻船 row uses the second overt 有, which is the nominal-following token.
ANCHOR_COORDINATES = {
    ("FC-005a_v2.cha", 19, 7),
    ("FC-035_v2.cha", 34, 9),
    ("FC-001_v2.cha", 113, 5),
    ("FC-001_v2.cha", 94, 2),
    ("FC-005a_v2.cha", 93, 5),
    ("FC-005a_v2.cha", 94, 27),
}

CONTROL_LIMITS = {
    "explicit_subject_or_possessor_control": 12,
    "overt_place_domain_control": 12,
    "post_np_locative_coda_control": 12,
    "predicate_less_initial_control": 12,
    "wh_or_embedded_complement_control": 12,
    "repair_control": 10,
}

OUTPUT_FIELDS = [
    "packet_id",
    "selection_strata",
    "candidate_id",
    "source_file",
    "source_file_sha256",
    "turn_index_zero_based",
    "token_index_zero_based",
    "participant",
    "matched_form",
    "utterance_initial_lexical",
    "preceding_lexical_token_count",
    "nominal_start_form",
    "nominal_start_hkcancor_pos",
    "nominal_start_ud_pos",
    "has_later_predicate_candidate",
    "later_predicate_form",
    "later_predicate_ud_pos",
    "later_predicate_token_index_zero_based",
    "immediate_left_form",
    "immediate_left_ud_pos",
    "text",
    "previous_text",
    "next_text",
    "expert_class",
    "profile_disposition",
    "span_recommendation",
    "decision_confidence",
    "decision_reason",
    "source_limit_or_note",
]


def truth(row: dict[str, str], field: str) -> bool:
    return row[field].lower() == "true"


def source_key(row: dict[str, str]) -> tuple[str, int, int, str]:
    return (
        row["source_file"],
        int(row["turn_index_zero_based"]),
        int(row["token_index_zero_based"]),
        row["candidate_id"],
    )


def preceding_words(row: dict[str, str]) -> list[str]:
    return [
        str(item.get("word", ""))
        for item in json.loads(row["preceding_material_tokens_json"])
        if item and item.get("word")
    ]


def has_recent_word(row: dict[str, str], words: set[str], window: int) -> bool:
    return any(word in words for word in preceding_words(row)[-window:])


def is_post_np_locative_surface(row: dict[str, str]) -> bool:
    marker_index = row["text"].find(row["matched_form"])
    if marker_index < 0:
        return False
    return bool(re.search(r"(?:喺度|喺)", row["text"][marker_index + 1 : marker_index + 45]))


def round_robin_by_file(rows: list[dict[str, str]], limit: int) -> list[dict[str, str]]:
    """Take a deterministic file-diverse prefix rather than one global prefix."""

    by_file: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in sorted(rows, key=source_key):
        by_file[row["source_file"]].append(row)

    selected: list[dict[str, str]] = []
    files = sorted(by_file)
    depth = 0
    while len(selected) < limit:
        added = False
        for filename in files:
            bucket = by_file[filename]
            if depth < len(bucket):
                selected.append(bucket[depth])
                added = True
                if len(selected) == limit:
                    break
        if not added:
            break
        depth += 1
    return selected


def add_rows(
    selected: dict[str, dict[str, str]],
    strata: dict[str, set[str]],
    rows: list[dict[str, str]],
    label: str,
) -> None:
    for row in rows:
        candidate_id = row["candidate_id"]
        selected[candidate_id] = row
        strata[candidate_id].add(label)


def select(rows: list[dict[str, str]]) -> tuple[list[dict[str, str]], dict[str, set[str]]]:
    selected: dict[str, dict[str, str]] = {}
    strata: dict[str, set[str]] = defaultdict(set)

    human_predicate = [
        row
        for row in rows
        if row["nominal_start_form"] == "人"
        and truth(row, "has_later_predicate_candidate")
    ]
    add_rows(selected, strata, human_predicate, "all_human_plus_predicate")

    initial_source_shaped = [
        row
        for row in rows
        if truth(row, "utterance_initial_lexical")
        and truth(row, "has_later_predicate_candidate")
        and row["nominal_start_form"] in INDEFINITE_STARTS
    ]
    add_rows(
        selected,
        strata,
        initial_source_shaped,
        "all_initial_indefinite_np_plus_predicate",
    )

    anchors = [
        row
        for row in rows
        if (
            row["source_file"],
            int(row["turn_index_zero_based"]),
            int(row["token_index_zero_based"]),
        )
        in ANCHOR_COORDINATES
    ]
    found_coordinates = {
        (
            row["source_file"],
            int(row["turn_index_zero_based"]),
            int(row["token_index_zero_based"]),
        )
        for row in anchors
    }
    missing = ANCHOR_COORDINATES - found_coordinates
    if missing:
        raise RuntimeError(f"Missing required inherited anchors: {sorted(missing)}")
    add_rows(selected, strata, anchors, "inherited_aa77_sibling_anchor")

    control_pools = {
        "explicit_subject_or_possessor_control": [
            row
            for row in rows
            if not truth(row, "utterance_initial_lexical")
            and has_recent_word(row, PRONOUNS, 3)
        ],
        "overt_place_domain_control": [
            row
            for row in rows
            if not truth(row, "utterance_initial_lexical")
            and has_recent_word(row, LOCATIVE_CUES, 5)
        ],
        "post_np_locative_coda_control": [
            row for row in rows if is_post_np_locative_surface(row)
        ],
        "predicate_less_initial_control": [
            row
            for row in rows
            if truth(row, "utterance_initial_lexical")
            and not truth(row, "has_later_predicate_candidate")
        ],
        "wh_or_embedded_complement_control": [
            row
            for row in rows
            if row["nominal_start_form"] in WH_STARTS or "?" in row["text"]
        ],
        "repair_control": [row for row in rows if "-" in row["text"]],
    }

    for label, pool in control_pools.items():
        # Prefer rows not already retained so each control increases boundary coverage.
        unselected = [row for row in pool if row["candidate_id"] not in selected]
        chosen = round_robin_by_file(unselected, CONTROL_LIMITS[label])
        add_rows(selected, strata, chosen, label)

    ordered = sorted(selected.values(), key=source_key)
    return ordered, strata


def write_packet(rows: list[dict[str, str]], strata: dict[str, set[str]]) -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=OUTPUT_FIELDS,
            delimiter="\t",
            lineterminator="\n",
        )
        writer.writeheader()
        for index, row in enumerate(rows, start=1):
            writer.writerow(
                {
                    "packet_id": f"AA56-R1-{index:03d}",
                    "selection_strata": ";".join(sorted(strata[row["candidate_id"]])),
                    "candidate_id": row["candidate_id"],
                    "source_file": row["source_file"],
                    "source_file_sha256": row["source_file_sha256"],
                    "turn_index_zero_based": row["turn_index_zero_based"],
                    "token_index_zero_based": row["token_index_zero_based"],
                    "participant": row["participant"],
                    "matched_form": row["matched_form"],
                    "utterance_initial_lexical": row["utterance_initial_lexical"],
                    "preceding_lexical_token_count": row["preceding_lexical_token_count"],
                    "nominal_start_form": row["nominal_start_form"],
                    "nominal_start_hkcancor_pos": row["nominal_start_hkcancor_pos"],
                    "nominal_start_ud_pos": row["nominal_start_ud_pos"],
                    "has_later_predicate_candidate": row["has_later_predicate_candidate"],
                    "later_predicate_form": row["later_predicate_form"],
                    "later_predicate_ud_pos": row["later_predicate_ud_pos"],
                    "later_predicate_token_index_zero_based": row[
                        "later_predicate_token_index_zero_based"
                    ],
                    "immediate_left_form": row["immediate_left_form"],
                    "immediate_left_ud_pos": row["immediate_left_ud_pos"],
                    "text": row["text"],
                    "previous_text": row["previous_text"],
                    "next_text": row["next_text"],
                    "expert_class": "",
                    "profile_disposition": "",
                    "span_recommendation": "",
                    "decision_confidence": "",
                    "decision_reason": "",
                    "source_limit_or_note": "",
                }
            )


def main() -> None:
    with INVENTORY.open(encoding="utf-8", newline="") as handle:
        inventory_rows = list(csv.DictReader(handle, delimiter="\t"))
    selected, strata = select(inventory_rows)
    write_packet(selected, strata)

    selection_counts = Counter()
    for labels in strata.values():
        selection_counts.update(labels)
    print(f"full inventory rows: {len(inventory_rows)}")
    print(f"bounded packet rows: {len(selected)}")
    print("packet polarity:", dict(Counter(row["matched_form"] for row in selected)))
    print("selection strata:", dict(sorted(selection_counts.items())))
    print("source files represented:", len({row["source_file"] for row in selected}))


if __name__ == "__main__":
    main()
