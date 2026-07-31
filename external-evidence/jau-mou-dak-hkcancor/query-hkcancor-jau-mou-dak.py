#!/usr/bin/env python3
"""Exhaustive mechanical HKCanCor inventory for 有得／冇得／有冇得 surfaces.

The query preserves corpus tokenization and local context. It does not decide whether a
candidate is compositional opportunity, a polarity question, ellipsis, an idiom, or a
construction member. Split-token sequences are retained only as tokenization diagnostics.
"""

from __future__ import annotations

import csv
import io
import json
import sys
import unicodedata
from collections import Counter
from pathlib import Path
from typing import Sequence

from pycantonese.pos_tagging import hkcancor_to_ud


ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools" / "corpus-review"))

from hkcancor_workbench import (  # noqa: E402
    Match,
    QueryProfile,
    WorkbenchContext,
    profile_cli,
)


RESEARCH_UNIT = {
    "researchId": "PRQ2-001-CONTINUATION",
    "family": "JauMouDakOpportunity",
    "claimLayer": "research_unit",
}
QUERY_ID = "HKCANCOR-JAU-MOU-DAK-R1"
PROFILE_KEY = "jau-mou-dak"
PREDICATE_UD = {"VERB", "ADJ", "AUX"}


def token_record(token: object | None) -> dict[str, str] | None:
    if token is None:
        return None
    return {
        "word": str(token.word),  # type: ignore[attr-defined]
        "pos": str(token.pos),  # type: ignore[attr-defined]
        "jyutping": str(token.jyutping or ""),  # type: ignore[attr-defined]
        "udPos": hkcancor_to_ud(token.pos),  # type: ignore[attr-defined]
    }


def is_lexical_token(token: object) -> bool:
    if str(token.pos) == "w":  # type: ignore[attr-defined]
        return False
    word = str(token.word)  # type: ignore[attr-defined]
    return any(
        unicodedata.category(character)[0] not in {"P", "S", "Z"}
        for character in word
    )


def nearest_lexical(
    tokens: Sequence[object], start: int, step: int
) -> tuple[int | None, object | None]:
    index = start
    while 0 <= index < len(tokens):
        if is_lexical_token(tokens[index]):
            return index, tokens[index]
        index += step
    return None, None


def make_match(
    tokens: Sequence[object],
    *,
    start: int,
    end: int,
    id_index: int,
    surface: str,
    profile_kind: str,
    tokenization_kind: str,
) -> Match:
    left_index, left = nearest_lexical(tokens, start - 1, -1)
    right_index, right = nearest_lexical(tokens, end, 1)
    right_record = token_record(right)
    left_record = token_record(left)
    right_ud = right_record["udPos"] if right_record else ""
    following_lexical_count = sum(
        1 for token in tokens[end:] if is_lexical_token(token)
    )
    preceding_lexical_count = sum(
        1 for token in tokens[:start] if is_lexical_token(token)
    )

    return Match(
        start_index=start,
        end_index_exclusive=end,
        id_token_index=id_index,
        matched_surface=surface,
        dedupe_key=f"{start}:{end}:{profile_kind}",
        duplicate_group_inputs={
            "profileKind": profile_kind,
            "tokenizationKind": tokenization_kind,
        },
        extra_fields={
            "profileKind": profile_kind,
            "tokenizationKind": tokenization_kind,
            "matchedTokenCount": end - start,
            "matchedHkcancorTags": [str(token.pos) for token in tokens[start:end]],  # type: ignore[attr-defined]
            "matchedUdTags": [hkcancor_to_ud(token.pos) for token in tokens[start:end]],  # type: ignore[attr-defined]
            "utteranceInitial": preceding_lexical_count == 0,
            "utteranceFinal": following_lexical_count == 0,
            "precedingLexicalTokenCount": preceding_lexical_count,
            "followingLexicalTokenCount": following_lexical_count,
            "immediateLeftToken": token_record(tokens[start - 1] if start > 0 else None),
            "immediateRightToken": token_record(tokens[end] if end < len(tokens) else None),
            "nearestLeftLexicalToken": left_record,
            "nearestLeftLexicalIndex": left_index,
            "nearestRightLexicalToken": right_record,
            "nearestRightLexicalIndex": right_index,
            "followingPredicateCandidate": bool(right_record and right_ud in PREDICATE_UD),
        },
    )


def token_predicate(tokens: Sequence[object], token_index: int) -> Match | None:
    word = str(tokens[token_index].word)  # type: ignore[attr-defined]
    next_word = (
        str(tokens[token_index + 1].word)  # type: ignore[attr-defined]
        if token_index + 1 < len(tokens)
        else ""
    )
    previous_word = (
        str(tokens[token_index - 1].word)  # type: ignore[attr-defined]
        if token_index > 0
        else ""
    )

    if word == "有冇得":
        return make_match(
            tokens,
            start=token_index,
            end=token_index + 1,
            id_index=token_index,
            surface="有冇得",
            profile_kind="polar_yau_mou_dak",
            tokenization_kind="single_token_yau_mou_dak",
        )

    if word == "有" and next_word == "冇得":
        return make_match(
            tokens,
            start=token_index,
            end=token_index + 2,
            id_index=token_index,
            surface="有冇得",
            profile_kind="polar_yau_mou_dak",
            tokenization_kind="yau_plus_single_token_mou_dak",
        )

    if word == "冇得" and previous_word == "有":
        return None

    if word == "有冇" and next_word == "得":
        return make_match(
            tokens,
            start=token_index,
            end=token_index + 2,
            id_index=token_index,
            surface="有冇得",
            profile_kind="polar_yau_mou_dak",
            tokenization_kind="single_token_yau_mou_plus_dak",
        )

    if word == "得" and previous_word == "有冇":
        return None

    if word.startswith("有得") and word != "有得":
        return make_match(
            tokens,
            start=token_index,
            end=token_index + 1,
            id_index=token_index,
            surface=word,
            profile_kind="affirmative_fused_lexeme_diagnostic",
            tokenization_kind="single_fused_token_prefixed_yau_dak",
        )

    if word.startswith("冇得") and word != "冇得":
        return make_match(
            tokens,
            start=token_index,
            end=token_index + 1,
            id_index=token_index,
            surface=word,
            profile_kind="negative_fused_lexeme_diagnostic",
            tokenization_kind="single_fused_token_prefixed_mou_dak",
        )

    if word == "有得":
        return make_match(
            tokens,
            start=token_index,
            end=token_index + 1,
            id_index=token_index,
            surface="有得",
            profile_kind="affirmative_yau_dak",
            tokenization_kind="single_token_yau_dak",
        )

    if word == "冇得":
        return make_match(
            tokens,
            start=token_index,
            end=token_index + 1,
            id_index=token_index,
            surface="冇得",
            profile_kind="negative_mou_dak",
            tokenization_kind="single_token_mou_dak",
        )

    if word in {"有", "冇"} and next_word == "得":
        profile_kind = (
            "affirmative_yau_dak_split_diagnostic"
            if word == "有"
            else "negative_mou_dak_split_diagnostic"
        )
        return make_match(
            tokens,
            start=token_index,
            end=token_index + 2,
            id_index=token_index,
            surface=word + "得",
            profile_kind=profile_kind,
            tokenization_kind="split_jau_or_mou_plus_dak",
        )

    if word == "得" and previous_word in {"有", "冇"}:
        return None

    return None


def count(values: list[object]) -> dict[str, int]:
    return dict(sorted(Counter(str(value) for value in values).items()))


def summary_builder(
    context: WorkbenchContext, rows: list[dict[str, object]]
) -> dict[str, object]:
    source_hashes = dict(context.source_hashes)
    return {
        "checkpoint": QUERY_ID,
        "status": "COMPLETE_MECHANICAL_INVENTORY_REVIEW_REQUIRED",
        "researchUnit": RESEARCH_UNIT,
        "endpoint": (
            "Every frozen HKCanCor occurrence of exact single-token 有得, exact "
            "single-token 冇得, exact 有 immediately followed by single-token 冇得, "
            "single-token 有冇得, single-token 有冇 followed by 得, and adjacent split "
            "有/冇 + 得 is inventoried. Single fused tokens beginning with 有得 or "
            "冇得 are retained as lexical-boundary diagnostics. Utterance-initial, "
            "utterance-final, and predicate-less cases are retained."
        ),
        "generatedWithPycantonese": context.pycantonese_version,
        "corpusName": "HKCanCor",
        "corpusFilesInDistribution": context.corpus.n_files,
        "corpusUtterancesInDistribution": len(context.corpus.utterances()),
        "corpusWordsInDistribution": len(context.corpus.words()),
        "hashes": {
            "sourceManifestPath": context.source_manifest_path.as_posix(),
            "sourceManifestSha256": context.source_manifest_sha256,
            "sourceFileSha256ByName": dict(sorted(source_hashes.items())),
        },
        "query": {
            "semanticClassificationPerformed": False,
            "constructionMembershipAssigned": False,
            "followingPredicateRequired": False,
            "utteranceInitialIncluded": True,
            "utteranceFinalIncluded": True,
            "splitTokenSequencesAreDiagnosticsOnly": True,
            "polarYauMouDakDedupePolicy": (
                "A sequence 有 + single-token 冇得 is represented once as polar 有冇得; "
                "the 冇得 token is not separately emitted at that location."
            ),
        },
        "counts": {
            "candidateSpans": len(rows),
            "candidateUtterances": len(
                {(row["sourceFile"], row["turnIndexZeroBased"]) for row in rows}
            ),
            "sourceFilesWithCandidates": len({row["sourceFile"] for row in rows}),
            "profileKinds": count([row["profileKind"] for row in rows]),
            "tokenizationKinds": count([row["tokenizationKind"] for row in rows]),
            "matchedSurfaces": count([row["matchedSurfaceSpan"] for row in rows]),
            "followingPredicateCandidate": count(
                [row["followingPredicateCandidate"] for row in rows]
            ),
            "utteranceInitial": count([row["utteranceInitial"] for row in rows]),
            "utteranceFinal": count([row["utteranceFinal"] for row in rows]),
            "nearestRightLexicalForms": count(
                [
                    (row["nearestRightLexicalToken"] or {}).get("word", "<NONE>")
                    for row in rows
                ]
            ),
            "nearestRightLexicalUdPos": count(
                [
                    (row["nearestRightLexicalToken"] or {}).get("udPos", "<NONE>")
                    for row in rows
                ]
            ),
            "sourceFileCandidateCounts": count([row["sourceFile"] for row in rows]),
        },
        "stableIdPolicy": {
            "namespace": QUERY_ID,
            "prefix": "jmd-",
            "anchor": "first token of the matched corpus span",
        },
        "interpretationWarning": (
            "Counts establish mechanical retrieval only. Expert review must distinguish "
            "opportunity/availability, polar questions, ellipsis, fragments, quotations, "
            "repairs, lexicalized expressions, annotation artifacts, and false positives."
        ),
    }


def render_tsv(rows: list[dict[str, object]]) -> str:
    fields = [
        "candidate_id",
        "query_id",
        "profile_kind",
        "tokenization_kind",
        "matched_surface_span",
        "source_file",
        "source_file_sha256",
        "file_index_zero_based",
        "turn_index_zero_based",
        "token_index_zero_based",
        "participant",
        "recording_date",
        "utterance_initial",
        "utterance_final",
        "preceding_lexical_token_count",
        "following_lexical_token_count",
        "following_predicate_candidate",
        "nearest_left_lexical_word",
        "nearest_left_lexical_pos",
        "nearest_left_lexical_ud_pos",
        "nearest_right_lexical_word",
        "nearest_right_lexical_pos",
        "nearest_right_lexical_ud_pos",
        "text",
        "previous_text",
        "next_text",
        "matched_tokens_json",
        "tokens_json",
        "annotation_status",
    ]
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=fields, delimiter="\t", lineterminator="\n")
    writer.writeheader()
    for row in rows:
        left = row["nearestLeftLexicalToken"] or {}
        right = row["nearestRightLexicalToken"] or {}
        context = row["localContext"]
        writer.writerow(
            {
                "candidate_id": row["candidateId"],
                "query_id": row["queryId"],
                "profile_kind": row["profileKind"],
                "tokenization_kind": row["tokenizationKind"],
                "matched_surface_span": row["matchedSurfaceSpan"],
                "source_file": row["sourceFile"],
                "source_file_sha256": row["sourceFileSha256"],
                "file_index_zero_based": row["fileIndexZeroBased"],
                "turn_index_zero_based": row["turnIndexZeroBased"],
                "token_index_zero_based": row["tokenIndexZeroBased"],
                "participant": row["participant"],
                "recording_date": row["recordingDate"] or "",
                "utterance_initial": str(row["utteranceInitial"]).lower(),
                "utterance_final": str(row["utteranceFinal"]).lower(),
                "preceding_lexical_token_count": row["precedingLexicalTokenCount"],
                "following_lexical_token_count": row["followingLexicalTokenCount"],
                "following_predicate_candidate": str(row["followingPredicateCandidate"]).lower(),
                "nearest_left_lexical_word": left.get("word", ""),
                "nearest_left_lexical_pos": left.get("pos", ""),
                "nearest_left_lexical_ud_pos": left.get("udPos", ""),
                "nearest_right_lexical_word": right.get("word", ""),
                "nearest_right_lexical_pos": right.get("pos", ""),
                "nearest_right_lexical_ud_pos": right.get("udPos", ""),
                "text": row["text"],
                "previous_text": context["previous"]["text"] if context["previous"] else "",
                "next_text": context["next"]["text"] if context["next"] else "",
                "matched_tokens_json": json.dumps(row["matchedTokens"], ensure_ascii=False, separators=(",", ":")),
                "tokens_json": json.dumps(row["tokens"], ensure_ascii=False, separators=(",", ":")),
                "annotation_status": row["annotationStatus"],
            }
        )
    return output.getvalue()


QUERY_PROFILES = {
    PROFILE_KEY: QueryProfile(
        query_id=QUERY_ID,
        candidate_id_namespace=QUERY_ID,
        candidate_id_prefix="jmd-",
        inventory_json="hkcancor-jau-mou-dak-candidate-inventory.json",
        inventory_tsv="hkcancor-jau-mou-dak-candidate-inventory.tsv",
        summary_json="hkcancor-jau-mou-dak-query-summary.json",
        construction=RESEARCH_UNIT,
        token_predicate=token_predicate,
        summary_builder=summary_builder,
        context_before_tokens=4,
        context_after_tokens=6,
        tsv_renderer=render_tsv,
    )
}


if __name__ == "__main__":
    profile_cli(
        QUERY_PROFILES,
        profile_argument="--profile",
        description="Generate the exhaustive HKCanCor 有得／冇得／有冇得 inventory.",
    )
