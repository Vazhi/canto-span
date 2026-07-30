#!/usr/bin/env python3
"""Select a deterministic, mechanically stratified AA77 review packet.

This script does not classify construction membership. It selects candidates from the
complete high-recall inventory using overt token/context features only, preserving the
original stable IDs and provenance for later expert review.
"""

from __future__ import annotations

import csv
import json
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any, Iterable

ROOT = Path(__file__).resolve().parents[3]
SOURCE = ROOT / "external-evidence/aa77-hkcancor/hkcancor-aa77-jau-mou-candidate-inventory.json"
OUTPUT = ROOT / "review-packets/corpus-review/AA77/bounded-profile-packet-r1.tsv"
QUERY_ID = "AA77-HKCANCOR-NONINITIAL-JAU-MOU-R1"
PACKET_ID = "AA77-HKCANCOR-NONINITIAL-JAU-MOU-R1-BOUNDED-REVIEW"
QUOTA_PER_STRATUM = 4

STRATA = (
    "place_left",
    "nominal_left_nominal_right",
    "a_not_a_or_opportunity",
    "attributive_embedding",
    "prepredicate_right",
    "aspect_adjacent",
    "wh_or_focus_adjacent",
    "repair_or_ellipsis",
    "other_nominal_right",
    "other_control",
)

PLACE_FORMS = {
    "呢度", "哩度", "嗰度", "邊度", "度", "裏邊", "裡邊", "入邊", "出邊",
    "前面", "後面", "上面", "下面", "側邊", "裏面", "裡面", "屋企", "地方",
    "香港", "大陸", "日本", "澳洲", "桂林", "石塘咀", "公司", "課室", "戲院",
}
WH_FOCUS_FORMS = {
    "乜", "乜嘢", "邊", "邊個", "邊度", "幾", "幾多", "任何", "都", "一啲",
    "啲", "冚唪唥", "全部", "其他",
}
ASPECT_FORMS = {"咗", "過", "緊", "晒", "完", "住"}
NOMINAL_UD = {"NOUN", "PROPN", "PRON", "NUM"}
PREDICATE_UD = {"VERB", "ADJ", "AUX"}

FIELDS = [
    "packet_id",
    "mechanical_stratum",
    "stratum_rank",
    "candidate_id",
    "query_id",
    "source_file",
    "source_file_sha256",
    "recording_date",
    "turn_index_zero_based",
    "token_index_zero_based",
    "participant",
    "participant_role",
    "participant_age",
    "participant_sex",
    "matched_form",
    "matched_hkcancor_tag",
    "matched_ud_tag",
    "distance_from_utterance_start_tokens",
    "preceding_lexical_token_count",
    "following_lexical_token_count",
    "immediate_left_word",
    "immediate_left_pos",
    "immediate_left_ud_pos",
    "immediate_left_jyutping",
    "immediate_right_word",
    "immediate_right_pos",
    "immediate_right_ud_pos",
    "immediate_right_jyutping",
    "nearest_left_word",
    "nearest_left_pos",
    "nearest_left_ud_pos",
    "nearest_left_jyutping",
    "nearest_right_word",
    "nearest_right_pos",
    "nearest_right_ud_pos",
    "nearest_right_jyutping",
    "utterance_text",
    "previous_turn_participant",
    "previous_turn_text",
    "next_turn_participant",
    "next_turn_text",
    "token_sequence",
    "expert_profile",
    "aa77_relevance",
    "decision_confidence",
    "decision_reason",
    "source_comparison_notes",
]


def token(candidate: dict[str, Any], key: str) -> dict[str, Any]:
    value = candidate.get(key)
    return value if isinstance(value, dict) else {}


def token_word(candidate: dict[str, Any], key: str) -> str:
    return str(token(candidate, key).get("word") or "")


def token_pos(candidate: dict[str, Any], key: str) -> str:
    return str(token(candidate, key).get("pos") or "")


def token_ud(candidate: dict[str, Any], key: str) -> str:
    return str(token(candidate, key).get("udPos") or "")


def lexical_tokens(candidate: dict[str, Any]) -> list[dict[str, Any]]:
    values = candidate.get("tokens")
    if not isinstance(values, list):
        return []
    return [item for item in values if isinstance(item, dict) and str(item.get("word") or "")]


def has_attributive_frame(candidate: dict[str, Any]) -> bool:
    tokens = lexical_tokens(candidate)
    anchor = int(candidate.get("tokenIndexZeroBased") or 0)
    after = tokens[anchor + 1 : anchor + 7]
    ge_index = next((i for i, item in enumerate(after) if item.get("word") == "嘅"), None)
    if ge_index is None:
        return False
    return any(
        str(item.get("pos") or "") in {"n", "nr", "ns", "nz", "q"}
        for item in after[ge_index + 1 :]
    )


def near_hyphen(candidate: dict[str, Any]) -> bool:
    tokens = lexical_tokens(candidate)
    anchor = int(candidate.get("tokenIndexZeroBased") or 0)
    lo = max(0, anchor - 2)
    hi = min(len(tokens), anchor + 3)
    return any(item.get("word") == "-" for item in tokens[lo:hi])


def stratum_for(candidate: dict[str, Any]) -> str:
    matched = str(candidate.get("matchedForm") or candidate.get("matchedSurfaceSpan") or "")
    left_word = token_word(candidate, "nearestLeftLexicalToken")
    right_word = token_word(candidate, "nearestRightLexicalToken")
    left_pos = token_pos(candidate, "nearestLeftLexicalToken")
    left_ud = token_ud(candidate, "nearestLeftLexicalToken")
    right_ud = token_ud(candidate, "nearestRightLexicalToken")

    # Priority is intentional: the same candidate enters exactly one observable stratum.
    if matched == "有" and right_word in {"冇", "冇得"}:
        return "a_not_a_or_opportunity"
    if matched == "冇" and left_word == "有":
        return "a_not_a_or_opportunity"
    if left_pos in {"f", "s", "ns"} or left_word in PLACE_FORMS:
        return "place_left"
    if has_attributive_frame(candidate):
        return "attributive_embedding"
    if left_word in ASPECT_FORMS or right_word in ASPECT_FORMS:
        return "aspect_adjacent"
    if left_word in WH_FOCUS_FORMS or right_word in WH_FOCUS_FORMS:
        return "wh_or_focus_adjacent"
    if near_hyphen(candidate) or int(candidate.get("followingLexicalTokenCount") or 0) <= 1:
        return "repair_or_ellipsis"
    if left_ud in NOMINAL_UD and right_ud in NOMINAL_UD:
        return "nominal_left_nominal_right"
    if right_ud in PREDICATE_UD:
        return "prepredicate_right"
    if right_ud in NOMINAL_UD:
        return "other_nominal_right"
    return "other_control"


def source_order_key(candidate: dict[str, Any]) -> tuple[Any, ...]:
    return (
        int(candidate.get("fileIndexZeroBased") or 0),
        int(candidate.get("turnIndexZeroBased") or 0),
        int(candidate.get("tokenIndexZeroBased") or 0),
        str(candidate.get("candidateId") or ""),
    )


def select_diverse(candidates: Iterable[dict[str, Any]], quota: int) -> list[dict[str, Any]]:
    ordered = sorted(candidates, key=source_order_key)
    selected: list[dict[str, Any]] = []
    selected_ids: set[str] = set()
    used_sources: set[str] = set()
    used_forms: set[str] = set()

    def take(predicate: Any) -> None:
        for candidate in ordered:
            if len(selected) >= quota:
                return
            cid = str(candidate.get("candidateId") or "")
            if cid in selected_ids or not predicate(candidate):
                continue
            selected.append(candidate)
            selected_ids.add(cid)
            used_sources.add(str(candidate.get("sourceFile") or ""))
            used_forms.add(str(candidate.get("matchedForm") or ""))

    # First represent both matched forms where the stratum contains them.
    for form in ("有", "冇"):
        take(lambda candidate, form=form: str(candidate.get("matchedForm") or "") == form and str(candidate.get("sourceFile") or "") not in used_sources)
        if len(selected) >= quota:
            return selected

    # Then maximize source-file diversity before filling by stable source order.
    take(lambda candidate: str(candidate.get("sourceFile") or "") not in used_sources)
    take(lambda candidate: True)
    return selected


def flat_token(candidate: dict[str, Any], key: str, field: str) -> str:
    return str(token(candidate, key).get(field) or "")


def row_for(candidate: dict[str, Any], stratum: str, rank: int) -> dict[str, Any]:
    participant = candidate.get("participantMetadata")
    participant = participant if isinstance(participant, dict) else {}
    context = candidate.get("localContext")
    context = context if isinstance(context, dict) else {}
    previous = context.get("previous") if isinstance(context.get("previous"), dict) else {}
    following = context.get("next") if isinstance(context.get("next"), dict) else {}
    sequence = " ".join(str(item.get("word") or "") for item in lexical_tokens(candidate))

    row = {
        "packet_id": PACKET_ID,
        "mechanical_stratum": stratum,
        "stratum_rank": rank,
        "candidate_id": candidate.get("candidateId", ""),
        "query_id": candidate.get("queryId", ""),
        "source_file": candidate.get("sourceFile", ""),
        "source_file_sha256": candidate.get("sourceFileSha256", ""),
        "recording_date": candidate.get("recordingDate", ""),
        "turn_index_zero_based": candidate.get("turnIndexZeroBased", ""),
        "token_index_zero_based": candidate.get("tokenIndexZeroBased", ""),
        "participant": candidate.get("participant", ""),
        "participant_role": participant.get("role", ""),
        "participant_age": participant.get("age", ""),
        "participant_sex": participant.get("sex", ""),
        "matched_form": candidate.get("matchedForm", candidate.get("matchedSurfaceSpan", "")),
        "matched_hkcancor_tag": candidate.get("matchedHkcancorTag", ""),
        "matched_ud_tag": candidate.get("matchedUdTag", ""),
        "distance_from_utterance_start_tokens": candidate.get("distanceFromUtteranceStartTokens", ""),
        "preceding_lexical_token_count": candidate.get("precedingLexicalTokenCount", ""),
        "following_lexical_token_count": candidate.get("followingLexicalTokenCount", ""),
        "immediate_left_word": flat_token(candidate, "immediateLeftToken", "word"),
        "immediate_left_pos": flat_token(candidate, "immediateLeftToken", "pos"),
        "immediate_left_ud_pos": flat_token(candidate, "immediateLeftToken", "udPos"),
        "immediate_left_jyutping": flat_token(candidate, "immediateLeftToken", "jyutping"),
        "immediate_right_word": flat_token(candidate, "immediateRightToken", "word"),
        "immediate_right_pos": flat_token(candidate, "immediateRightToken", "pos"),
        "immediate_right_ud_pos": flat_token(candidate, "immediateRightToken", "udPos"),
        "immediate_right_jyutping": flat_token(candidate, "immediateRightToken", "jyutping"),
        "nearest_left_word": flat_token(candidate, "nearestLeftLexicalToken", "word"),
        "nearest_left_pos": flat_token(candidate, "nearestLeftLexicalToken", "pos"),
        "nearest_left_ud_pos": flat_token(candidate, "nearestLeftLexicalToken", "udPos"),
        "nearest_left_jyutping": flat_token(candidate, "nearestLeftLexicalToken", "jyutping"),
        "nearest_right_word": flat_token(candidate, "nearestRightLexicalToken", "word"),
        "nearest_right_pos": flat_token(candidate, "nearestRightLexicalToken", "pos"),
        "nearest_right_ud_pos": flat_token(candidate, "nearestRightLexicalToken", "udPos"),
        "nearest_right_jyutping": flat_token(candidate, "nearestRightLexicalToken", "jyutping"),
        "utterance_text": candidate.get("text", ""),
        "previous_turn_participant": previous.get("participant", ""),
        "previous_turn_text": previous.get("text", ""),
        "next_turn_participant": following.get("participant", ""),
        "next_turn_text": following.get("text", ""),
        "token_sequence": sequence,
        "expert_profile": "",
        "aa77_relevance": "",
        "decision_confidence": "",
        "decision_reason": "",
        "source_comparison_notes": "",
    }
    return row


def main() -> None:
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    candidates = data.get("candidates")
    if not isinstance(candidates, list):
        raise SystemExit(f"{SOURCE}: missing candidates list")
    if len(candidates) != 1730:
        raise SystemExit(f"expected 1730 candidates, found {len(candidates)}")
    if any(candidate.get("queryId") != QUERY_ID for candidate in candidates):
        raise SystemExit("inventory contains an unexpected queryId")

    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for candidate in candidates:
        grouped[stratum_for(candidate)].append(candidate)

    missing = {name: len(grouped[name]) for name in STRATA if len(grouped[name]) < QUOTA_PER_STRATUM}
    if missing:
        raise SystemExit(f"insufficient candidates for packet quotas: {missing}")

    rows: list[dict[str, Any]] = []
    for stratum in STRATA:
        selected = select_diverse(grouped[stratum], QUOTA_PER_STRATUM)
        if len(selected) != QUOTA_PER_STRATUM:
            raise SystemExit(f"{stratum}: selected {len(selected)}, expected {QUOTA_PER_STRATUM}")
        rows.extend(row_for(candidate, stratum, rank) for rank, candidate in enumerate(selected, start=1))

    ids = [str(row["candidate_id"]) for row in rows]
    if len(ids) != len(set(ids)):
        raise SystemExit("duplicate candidate IDs in bounded packet")
    if len(rows) != len(STRATA) * QUOTA_PER_STRATUM:
        raise SystemExit(f"unexpected packet size: {len(rows)}")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDS, delimiter="\t", lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)

    counts = Counter(row["mechanical_stratum"] for row in rows)
    forms = Counter(row["matched_form"] for row in rows)
    print(f"wrote {len(rows)} rows to {OUTPUT.relative_to(ROOT)}")
    print("strata:", dict(counts))
    print("matched forms:", dict(forms))


if __name__ == "__main__":
    main()
