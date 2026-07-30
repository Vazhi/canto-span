#!/usr/bin/env python3
"""Select a deterministic, mechanically stratified AA84 bare-reduplication packet."""

from __future__ import annotations

import csv
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
INVENTORY = (
    ROOT
    / "external-evidence"
    / "aa84-bare-redup-hkcancor"
    / "hkcancor-aa84-bare-redup-candidate-inventory.tsv"
)
OUTPUT = ROOT / "review-packets" / "corpus-review" / "AA84" / "bare-redup-packet-r1.tsv"
QUERY_ID = "HKCANCOR-AA84-BARE-REDUP-R1"
PACKET_ID = "AA84-HKCANCOR-BARE-REDUP-R1-BOUNDED-REVIEW"

MANNER_AND_PROPERTY_ANCHORS = {
    "慢", "細", "淡", "潺", "初", "偏", "流", "唥", "好", "大", "平",
}
TEMPORAL_FREQUENCY_ANCHORS = {
    "啱", "日", "朝", "晚", "年", "次", "下", "初",
}
DISTRIBUTIVE_ANCHORS = {
    "個", "人", "樣", "份", "間", "度", "部", "件", "條", "本", "張", "盒", "節",
}
QUANTITY_ANCHORS = {"少", "啲"}
EVENT_ANCHORS = {
    "睇", "試", "講", "走", "做", "諗", "等", "食", "玩", "聽", "行", "傾", "剪", "削",
}
KIN_NAME_ANCHORS = {
    "太", "爸", "媽", "哥", "姐", "叔", "奶", "婆", "玲", "冰", "美", "凱", "杏", "禮",
}
SOUND_LEXICAL_ANCHORS = {
    "拜", "哈", "桀", "卡", "卜", "潺", "唥", "c.", "B", "du1", "et1", "eu1eu1", "lik1gu1", "dan4dan3", "dan1dan1", "but1",
}
ALL_ANCHORS = (
    MANNER_AND_PROPERTY_ANCHORS
    | TEMPORAL_FREQUENCY_ANCHORS
    | DISTRIBUTIVE_ANCHORS
    | QUANTITY_ANCHORS
    | EVENT_ANCHORS
    | KIN_NAME_ANCHORS
    | SOUND_LEXICAL_ANCHORS
)


def truthy(value: str) -> bool:
    return value.strip().lower() == "true"


def source_key(row: dict[str, str]) -> tuple[object, ...]:
    return (
        row["source_file"],
        int(row["turn_index_zero_based"]),
        int(row["token_index_zero_based"]),
        row["candidate_id"],
    )


def add_reason(reasons: dict[str, set[str]], row: dict[str, str], reason: str) -> None:
    reasons[row["candidate_id"]].add(reason)


def main() -> None:
    rows = list(csv.DictReader(INVENTORY.open(encoding="utf-8"), delimiter="\t"))
    reasons: dict[str, set[str]] = defaultdict(set)

    for row in rows:
        mode = row["repetition_mode"]
        ud = row["matched_ud_pos"]
        has_predicate = truthy(row["has_local_predicate_candidate"])
        base = row["base_surface"]

        if (
            mode == "internally_repeated_token"
            and has_predicate
            and ud in {"ADJ", "ADV", "VERB"}
        ):
            add_reason(reasons, row, "all_internal_adj_adv_verb_with_local_predicate")

        if (
            mode == "adjacent_identical_tokens"
            and has_predicate
            and ud == "ADJ"
        ):
            add_reason(reasons, row, "all_adjacent_adjective_runtime_collisions")

        if base in ALL_ANCHORS:
            add_reason(reasons, row, "declared_surface_anchor")
            if base in MANNER_AND_PROPERTY_ANCHORS:
                add_reason(reasons, row, "manner_or_property_anchor")
            if base in TEMPORAL_FREQUENCY_ANCHORS:
                add_reason(reasons, row, "temporal_or_frequency_anchor")
            if base in DISTRIBUTIVE_ANCHORS:
                add_reason(reasons, row, "distributive_anchor")
            if base in QUANTITY_ANCHORS:
                add_reason(reasons, row, "quantity_anchor")
            if base in EVENT_ANCHORS:
                add_reason(reasons, row, "event_anchor")
            if base in KIN_NAME_ANCHORS:
                add_reason(reasons, row, "kin_or_name_anchor")
            if base in SOUND_LEXICAL_ANCHORS:
                add_reason(reasons, row, "sound_or_lexical_anchor")

    # Retain small fixed controls for every remaining POS/mode combination.
    grouped: dict[tuple[str, str, bool], list[dict[str, str]]] = defaultdict(list)
    for row in sorted(rows, key=source_key):
        key = (
            row["repetition_mode"],
            row["matched_ud_pos"],
            truthy(row["has_local_predicate_candidate"]),
        )
        grouped[key].append(row)
    for key, group in sorted(grouped.items()):
        for row in group[:2]:
            add_reason(reasons, row, "fixed_mode_pos_host_control")

    selected = [row for row in rows if row["candidate_id"] in reasons]
    selected.sort(key=source_key)

    fields = [
        "packet_id",
        "packet_row_zero_based",
        "selection_reasons",
        *list(rows[0].keys()),
        "expert_classification",
        "expert_subtype",
        "confidence",
        "reviewer_note",
        "parser_implication",
    ]
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, delimiter="\t", lineterminator="\n")
        writer.writeheader()
        for index, row in enumerate(selected):
            writer.writerow({
                "packet_id": PACKET_ID,
                "packet_row_zero_based": index,
                "selection_reasons": ";".join(sorted(reasons[row["candidate_id"]])),
                **row,
                "expert_classification": "",
                "expert_subtype": "",
                "confidence": "",
                "reviewer_note": "",
                "parser_implication": "",
            })

    mode_counts = Counter(row["repetition_mode"] for row in selected)
    host_counts = Counter(row["has_local_predicate_candidate"] for row in selected)
    ud_counts = Counter(row["matched_ud_pos"] for row in selected)
    reason_counts = Counter(
        reason
        for row in selected
        for reason in reasons[row["candidate_id"]]
    )
    print(f"query_id={QUERY_ID}")
    print(f"packet_id={PACKET_ID}")
    print(f"inventory_rows={len(rows)}")
    print(f"packet_rows={len(selected)}")
    print(f"mode_counts={dict(sorted(mode_counts.items()))}")
    print(f"host_counts={dict(sorted(host_counts.items()))}")
    print(f"ud_counts={dict(sorted(ud_counts.items()))}")
    print(f"reason_counts={dict(sorted(reason_counts.items()))}")


if __name__ == "__main__":
    main()
