#!/usr/bin/env python3
"""Generate the complete expert decisions for the bounded AA84 R2 packet.

The ordered rules encode the completed source-order review. Exact reviewed
candidate IDs override lexical families. No rule promotes a row merely because
its written surface repeats or because a broad POS tag is adjectival/adverbial.
"""
from __future__ import annotations

import csv
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SOURCE = ROOT / "review-packets/corpus-review/AA84/bare-redup-packet-r2.tsv"
OUTPUT = ROOT / "review-packets/corpus-review/AA84/bare-redup-decisions-r2.tsv"

DIRECT_BARE_MANNER = {
    "aa84br-7a140f4b02ff1620f5b8",  # 慢慢行 maan6maan1
    "aa84br-8bba4d83e71013862755",  # 慢慢揾
    "aa84br-65949ba1d2e6ae5b08cf",  # 慢慢歎
    "aa84br-bb8cc991d426236c1df0",  # 好好對返人哋
    "aa84br-0bab6a1c370dc2bd3417",  # 慢慢來
    "aa84br-8dc9389d196feaa88861",  # 慢慢行
    "aa84br-7bd78caf870eb7d82990",  # 慢慢覺得
    "aa84br-56adeb32f815707a4137",  # 慢慢食
}
AMBIGUOUS_GRADUAL = {"aa84br-f1e8e40b9e24bb8581f4"}
ENUMERATIVE_DANG = {
    "aa84br-e5cd363cf000fd3f6262",
    "aa84br-5520ea40ec40a5f46dfa",
}

TEMPORAL = {"啱", "日", "朝", "晚", "年", "次", "下", "初"}
DISTRIBUTIVE = {
    "個", "人", "樣", "份", "間", "度", "部", "件", "條", "本", "張", "盒", "節", "通",
}
QUANTITY = {"少", "啲", "et1"}
EVENT = {
    "食", "行", "睇", "做", "傾", "走", "糴", "試", "講", "等", "玩", "聽", "諗", "升", "削", "剪",
}
PROPERTY = {"細", "淡", "麻", "潺", "潔白", "杏", "平", "大"}
LEXICAL_ADVERB = {"明", "偏"}
KIN_NAME = {"太", "爸", "媽", "哥", "姐", "叔", "奶", "婆", "玲", "冰", "美", "凱", "禮"}
SOUND_FIXED = {
    "拜", "哈", "桀", "卡", "卜", "唥", "Zip1", "du1", "dan1dan1", "dan4dan3", "but1", "eu1eu1", "lik1gu1",
}
DISCOURSE_BASES = {"唔", "嗰", "好似", "噉", "唉", "一", "到", "可能", "小一"}
NOMINAL_OTHER = {"B", "c.", "乜"}

CLASSIFICATIONS = {
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


def decide(row: dict[str, str]) -> tuple[str, str, str, str, str]:
    cid = row["candidate_id"]
    base = row["base_surface"]
    surface = row["matched_surface_span"]
    text = row["text"]
    host = row["local_predicate_form"] or "<none>"
    mode = row["repetition_mode"]
    ud = row["matched_ud_pos"]

    if cid in DIRECT_BARE_MANNER:
        subtype = "gradual_process_maanmaan" if base == "慢" else "well_manner_houhou"
        note = (
            f"Reviewed context directly links bare {surface} to the following predicate {host}; "
            "no overt 咁／噉／地 marker is present and the repeated expression modifies how or gradually the event/process unfolds."
        )
        return (
            "genuine_bare_manner_modifier", subtype, "high", note,
            "Positive AA84 evidence, but license only a reviewed lexical/morphological profile with an overt compatible host; written repetition alone is insufficient.",
        )

    if cid in AMBIGUOUS_GRADUAL:
        return (
            "ambiguous_boundary", "discourse_gradual_without_local_overt_host", "medium",
            "慢慢 has a gradual discourse reading, but the mechanically selected 譬如 is not its syntactic host and the omitted predicate boundary cannot be recovered from the overt span alone.",
            "Do not use this row as a direct positive fixture; preserve it as discourse-level evidence requiring an overt host or independent context analysis.",
        )

    if cid in ENUMERATIVE_DANG:
        return (
            "other_lexical_or_structural", "enumerative_dang2dang2_etcetera", "high",
            "等等 closes an enumeration and does not repeat the verb 等 'wait' or modify a following predicate.",
            "Exclude enumerative 等等 before any bare-manner or event-reduplication rule.",
        )

    if base == "好":
        return (
            "property_predication_or_attribution", "degree_property_or_separate_hou_tokens", "high",
            f"Context shows {surface} as a property predicate, degree sequence, complement, or speech repetition rather than a bare manner modifier of the mechanically nearby {host}.",
            "Do not license adjacent 好 + 好 by surface equality; require a reviewed single-token lexical profile such as the exact 好好對 manner case.",
        )

    if base in TEMPORAL:
        return (
            "temporal_frequency_expression", f"temporal_frequency_{base}", "high",
            f"{surface} locates or quantifies event time/frequency in context; it does not answer the manner question for {host}.",
            "Route temporal/frequency reduplicatives away from AA84 even when they occur immediately before a predicate.",
        )

    if base in DISTRIBUTIVE:
        return (
            "distributive_expression", f"distributive_totality_{base}", "high",
            f"{surface} distributes over people, objects, places, occasions, or alternatives; the following predicate scopes over the distributed set.",
            "Exclude distributive classifier/nominal reduplication from manner detection.",
        )

    if base in QUANTITY:
        return (
            "quantity_degree_expression", f"quantity_or_degree_{base}", "high",
            f"{surface} expresses a small amount, degree, or scalar adjustment in context, not event manner.",
            "Route quantity/degree expressions separately; local adjective or verb proximity is not a manner relation.",
        )

    if base in EVENT:
        subtype = "event_progressive_with_haa5" if "下" in text else "delimitative_iterative_or_repair_event"
        return (
            "event_reduplication_or_progressive", subtype, "high",
            f"The repeated verbal material denotes event iteration, delimitative action, progressive -下 structure, or repaired repetition; it is not an adverbial property modifying {host}.",
            "Keep verb reduplication and V-V-下 profiles outside the bare property-manner fallback.",
        )

    if base in PROPERTY:
        subtype = "property_with_overt_marker" if any(marker in text for marker in ("哋", "地", "聲")) else "property_predicate_or_attributive"
        return (
            "property_predication_or_attribution", subtype, "high",
            f"{surface} describes a property, attributive value, sound/property phrase, or change-state progression; the nearby {host} is not a bare manner host.",
            "Do not collapse property reduplication, overt-marker forms, and event modification into one AA84 branch.",
        )

    if base == "流":
        return (
            "other_lexical_or_structural", "fixed_circumstantial_laulau", "high",
            "生日流流 is a fixed circumstantial expression ('on a birthday of all times'), not a manner modifier of 講.",
            "Treat the fixed X流流 pattern lexically and exclude it from AA84.",
        )

    if base in LEXICAL_ADVERB:
        return (
            "lexicalized_nonmanner_adverb", f"lexical_sentential_adverb_{base}", "high",
            f"{surface} is a conventional counterexpectational/evidential sentential adverb, not a manner description of {host}.",
            "Maintain a lexical sentential-adverb profile separate from bare manner reduplication.",
        )

    if base in KIN_NAME:
        return (
            "nominal_name_or_kin_term", "kinship_or_personal_name", "high",
            f"{surface} is a kin term or personal name in context; repeated orthography is lexical and unrelated to manner.",
            "Exclude names and kinship lexemes before any repeated-surface construction rule.",
        )

    if base in SOUND_FIXED:
        return (
            "sound_symbolic_or_fixed_lexeme", "sound_symbolic_greeting_or_fixed_form", "high",
            f"{surface} is sound-symbolic, a greeting, an expressive fixed form, or quoted nonlexical material; predicate proximity does not make it manner morphology.",
            "Require a dedicated lexical/sound-symbolic analysis; do not infer AA84 from repeated spelling.",
        )

    if base in NOMINAL_OTHER:
        return (
            "nominal_name_or_kin_term", "acronym_measure_or_placeholder_nominal", "high",
            f"{surface} is an acronym, unit/measure abbreviation, baby noun, grade sequence, or indefinite placeholder in the reviewed context.",
            "Exclude nominal/acronym/placeholder material from AA84.",
        )

    if base in DISCOURSE_BASES or mode == "adjacent_identical_tokens":
        return (
            "discourse_repetition_hesitation_repair", "adjacent_speech_repetition_or_false_pair", "high",
            f"The two adjacent tokens arise from hesitation, repair, emphasis, separate syntactic words, or transcription adjacency; {host} is only a local cue.",
            "The runtime must not treat two surface-identical nodes as reduplicative manner without lexical and structural gating.",
        )

    if ud == "ADJ":
        return (
            "property_predication_or_attribution", "residual_lexical_property", "medium",
            f"The internally repeated form functions as a lexical property/evaluation in context; no clear bare modifier-host relation with {host} is established.",
            "Quarantine from AA84 unless a source-linked lexical manner use and overt host are independently established.",
        )
    if ud == "ADV":
        return (
            "lexicalized_nonmanner_adverb", "residual_lexical_adverb", "medium",
            f"The form is adverbial in the broad corpus annotation, but context does not establish manner modification of {host}.",
            "Do not equate the broad ADV tag with AA84 membership.",
        )
    if ud == "VERB":
        return (
            "event_reduplication_or_progressive", "residual_repeated_event", "medium",
            "The repeated form is verbal/eventive and lacks evidence for a property-derived manner relation.",
            "Keep under verb-reduplication review, not the bare manner branch.",
        )

    return (
        "other_lexical_or_structural", "residual_nonmanner_control", "medium",
        f"Reviewed context does not establish {surface} as a bare manner modifier of {host}; the row remains a mechanical boundary control.",
        "Exclude from AA84 unless independent construction-specific evidence is added.",
    )


def main() -> None:
    rows = list(csv.DictReader(SOURCE.open(encoding="utf-8"), delimiter="\t"))
    decisions = []
    for row in rows:
        classification, subtype, confidence, note, implication = decide(row)
        if classification not in CLASSIFICATIONS:
            raise RuntimeError(f"unknown classification: {classification}")
        row = dict(row)
        row["expert_classification"] = classification
        row["expert_subtype"] = subtype
        row["confidence"] = confidence
        row["reviewer_note"] = note
        row["parser_implication"] = implication
        decisions.append(row)

    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(decisions[0].keys()), delimiter="\t", lineterminator="\n")
        writer.writeheader()
        writer.writerows(decisions)

    counts = Counter(row["expert_classification"] for row in decisions)
    confidence = Counter(row["confidence"] for row in decisions)
    print(f"decisions={len(decisions)}")
    print(f"classification_counts={dict(sorted(counts.items()))}")
    print(f"confidence_counts={dict(sorted(confidence.items()))}")


if __name__ == "__main__":
    main()
