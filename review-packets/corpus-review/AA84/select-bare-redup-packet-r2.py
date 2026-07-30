#!/usr/bin/env python3
"""Select a bounded AA84 bare-reduplication review packet."""
from __future__ import annotations
import csv
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SOURCE = ROOT / "external-evidence/aa84-bare-redup-hkcancor/hkcancor-aa84-bare-redup-candidate-inventory.tsv"
OUTPUT = ROOT / "review-packets/corpus-review/AA84/bare-redup-packet-r2.tsv"
PACKET_ID = "AA84-HKCANCOR-BARE-REDUP-R2-BOUNDED-REVIEW"

MANNER = {"慢", "細", "淡", "潺", "初", "偏", "流", "唥", "好", "大", "平"}
BOUNDARIES = {
    "temporal_frequency": {"啱", "日", "朝", "晚", "年", "次", "下"},
    "distributive": {"個", "人", "樣", "份", "間", "度", "部", "件", "條", "本", "張", "盒", "節"},
    "quantity": {"少", "啲"},
    "event": {"睇", "試", "講", "走", "做", "諗", "等", "食", "玩", "聽", "行", "傾", "剪", "削"},
    "kin_name": {"太", "爸", "媽", "哥", "姐", "叔", "奶", "婆", "玲", "冰", "美", "凱", "杏", "禮"},
    "sound_lexical": {"拜", "哈", "桀", "卡", "卜", "c.", "B", "du1", "et1", "eu1eu1", "lik1gu1", "dan4dan3", "dan1dan1", "but1"},
}

def yes(value: str) -> bool:
    return value.lower() == "true"

def key(row: dict[str, str]):
    return (row["source_file"], int(row["turn_index_zero_based"]), int(row["token_index_zero_based"]), row["candidate_id"])

def add(reasons, row, reason):
    reasons[row["candidate_id"]].add(reason)

def cap_by_base(rows, reasons, eligible, reason, hosted=2, unhosted=1):
    groups = defaultdict(list)
    for row in sorted(rows, key=key):
        if eligible(row):
            groups[(row["base_surface"], yes(row["has_local_predicate_candidate"]))].append(row)
    for (_base, has_host), group in sorted(groups.items()):
        for row in group[: hosted if has_host else unhosted]:
            add(reasons, row, reason)

def main():
    rows = list(csv.DictReader(SOURCE.open(encoding="utf-8"), delimiter="\t"))
    reasons = defaultdict(set)

    for row in rows:
        if row["base_surface"] in MANNER:
            add(reasons, row, "all_manner_property_anchors")
        if row["repetition_mode"] == "adjacent_identical_tokens" and row["matched_ud_pos"] == "ADJ" and yes(row["has_local_predicate_candidate"]):
            add(reasons, row, "all_adjacent_adjective_runtime_collisions")

    for ud, hosted in (("ADJ", 3), ("ADV", 2), ("VERB", 2)):
        cap_by_base(
            rows, reasons,
            lambda row, ud=ud: row["repetition_mode"] == "internally_repeated_token" and row["matched_ud_pos"] == ud,
            f"capped_internal_{ud.lower()}_by_base_host", hosted, 1,
        )

    for family, surfaces in BOUNDARIES.items():
        cap_by_base(rows, reasons, lambda row, surfaces=surfaces: row["base_surface"] in surfaces, family, 2, 1)

    controls = defaultdict(list)
    for row in sorted(rows, key=key):
        controls[(row["repetition_mode"], row["matched_ud_pos"], yes(row["has_local_predicate_candidate"]))].append(row)
    for group in controls.values():
        add(reasons, group[0], "fixed_mode_pos_host_control")

    selected = sorted((row for row in rows if row["candidate_id"] in reasons), key=key)
    fields = ["packet_id", "packet_row_zero_based", "selection_reasons", *rows[0].keys(), "expert_classification", "expert_subtype", "confidence", "reviewer_note", "parser_implication"]
    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fields, delimiter="\t", lineterminator="\n")
        writer.writeheader()
        for index, row in enumerate(selected):
            writer.writerow({"packet_id": PACKET_ID, "packet_row_zero_based": index, "selection_reasons": ";".join(sorted(reasons[row["candidate_id"]])), **row, "expert_classification": "", "expert_subtype": "", "confidence": "", "reviewer_note": "", "parser_implication": ""})

    print("inventory_rows", len(rows))
    print("packet_rows", len(selected))
    print("modes", dict(sorted(Counter(r["repetition_mode"] for r in selected).items())))
    print("hosts", dict(sorted(Counter(r["has_local_predicate_candidate"] for r in selected).items())))
    print("ud", dict(sorted(Counter(r["matched_ud_pos"] for r in selected).items())))

if __name__ == "__main__":
    main()
