#!/usr/bin/env python3
"""AA89 high-recall HKCanCor profile for accepted modal lexemes.

The query inventories exact surface and adjacent-negation profiles only. It does
not infer modal readings, complement structure, construction membership, or
evidence readiness.
"""

from __future__ import annotations

import csv
import hashlib
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


CONSTRUCTION = {
    "constructionUuid": "e3ad991e-f109-57ab-a363-cfc2e6d4e170",
    "permanentCode": "AA89",
    "canonicalIdentity": "ModalAuxiliaryComplementVP",
    "legacyRuntimeLabel": "ModalVP",
}
QUERY_ID = "AA89-HKCANCOR-MODAL-LEXEME-R1"
PROFILE_KEY = "modal-lexeme"
BASE_FORMS = ("要", "會", "可以", "使")
SINGLE_TOKEN_FORMS = (*BASE_FORMS, "唔使")
SINGLE_TOKEN = "single_token"
ADJACENT_NEGATION = "adjacent_m4_plus_modal_tokens"
UNNEGATED_SURFACE = "unnegated_surface"
SINGLE_TOKEN_NEGATED_LEXEME = "single_token_negated_lexeme"
ADJACENT_M4_NEGATION = "adjacent_m4_negation"


def token_record(token: object | None) -> dict[str, str] | None:
    if token is None:
        return None
    return {
        "word": token.word,  # type: ignore[attr-defined]
        "pos": token.pos,  # type: ignore[attr-defined]
        "jyutping": token.jyutping,  # type: ignore[attr-defined]
        "udPos": hkcancor_to_ud(token.pos),  # type: ignore[attr-defined]
    }


def is_lexical_token(token: object) -> bool:
    """Return true for material other than punctuation, symbols, or spacing."""

    if token.pos == "w":  # type: ignore[attr-defined]
        return False
    word = str(token.word)  # type: ignore[attr-defined]
    return any(
        unicodedata.category(character)[0] not in {"P", "S", "Z"}
        for character in word
    )


def token_predicate(tokens: Sequence[object], token_index: int) -> Match | None:
    token = tokens[token_index]
    word = token.word  # type: ignore[attr-defined]

    if (
        word == "唔"
        and token_index + 1 < len(tokens)
        and tokens[token_index + 1].word in BASE_FORMS  # type: ignore[attr-defined]
    ):
        end_index = token_index + 2
        query_lexeme = str(tokens[token_index + 1].word)  # type: ignore[attr-defined]
        segmentation_profile = ADJACENT_NEGATION
        negation_profile = ADJACENT_M4_NEGATION
        represented_profiles = [
            f"adjacent:唔+{query_lexeme}",
            f"surface:{word}{query_lexeme}",
        ]
        overlapping_representations_deduplicated = 1
    elif word in SINGLE_TOKEN_FORMS:
        # An adjacent 唔 + modal sequence is represented once at the 唔 anchor.
        if (
            word in BASE_FORMS
            and token_index > 0
            and tokens[token_index - 1].word == "唔"  # type: ignore[attr-defined]
        ):
            return None
        end_index = token_index + 1
        query_lexeme = str(word)
        segmentation_profile = SINGLE_TOKEN
        negation_profile = (
            SINGLE_TOKEN_NEGATED_LEXEME
            if word == "唔使"
            else UNNEGATED_SURFACE
        )
        represented_profiles = [f"single:{word}", f"surface:{word}"]
        overlapping_representations_deduplicated = 0
    else:
        return None

    following_lexical_indices = [
        index
        for index in range(end_index, len(tokens))
        if is_lexical_token(tokens[index])
    ]
    if not following_lexical_indices:
        return None

    matched_tokens = tokens[token_index:end_index]
    matched_surface = "".join(
        str(item.word) for item in matched_tokens  # type: ignore[attr-defined]
    )
    left_token = tokens[token_index - 1] if token_index > 0 else None
    immediate_right = tokens[end_index] if end_index < len(tokens) else None
    following_lexical_index = following_lexical_indices[0]
    following_lexical_token = tokens[following_lexical_index]

    return Match(
        start_index=token_index,
        end_index_exclusive=end_index,
        id_token_index=token_index,
        matched_surface=matched_surface,
        duplicate_group_inputs={"normalizedSurface": matched_surface},
        extra_fields={
            "queryLexeme": query_lexeme,
            "segmentationProfile": segmentation_profile,
            "negationProfile": negation_profile,
            "matchedHkcancorTags": [
                item.pos for item in matched_tokens  # type: ignore[attr-defined]
            ],
            "matchedUdTags": [
                hkcancor_to_ud(item.pos)  # type: ignore[attr-defined]
                for item in matched_tokens
            ],
            "immediateLeftToken": token_record(left_token),
            "immediateRightToken": token_record(immediate_right),
            "followingLexicalToken": token_record(following_lexical_token),
            "followingLexicalTokenIndexZeroBased": following_lexical_index,
            "interveningTokenCountBeforeFollowingLexical": (
                following_lexical_index - end_index
            ),
            "overlapDeduplication": {
                "sourceAnchorTokenIndexZeroBased": token_index,
                "representedProfiles": represented_profiles,
                "overlappingRepresentationsDeduplicated": (
                    overlapping_representations_deduplicated
                ),
            },
        },
    )


def corpus_distribution_sha256(source_hashes: dict[str, str]) -> str:
    payload = "".join(
        f"{digest}  {filename}\n"
        for filename, digest in sorted(source_hashes.items())
    )
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def counter_dict(values: Sequence[object]) -> dict[str, int]:
    return dict(sorted(Counter(str(value) for value in values).items()))


def sequence_key(values: object) -> str:
    return "+".join(str(value) for value in values)  # type: ignore[arg-type]


def summary_builder(
    context: WorkbenchContext, rows: list[dict[str, object]]
) -> dict[str, object]:
    corpus = context.corpus
    source_hashes = dict(context.source_hashes)
    query_lexemes = Counter({form: 0 for form in SINGLE_TOKEN_FORMS})
    query_lexemes.update(str(row["queryLexeme"]) for row in rows)
    matched_forms = Counter(
        {
            "要": 0,
            "會": 0,
            "可以": 0,
            "使": 0,
            "唔使": 0,
            "唔要": 0,
            "唔會": 0,
            "唔可以": 0,
        }
    )
    matched_forms.update(str(row["matchedSurfaceSpan"]) for row in rows)
    unique_locations = {
        (
            row["sourceFile"],
            row["turnIndexZeroBased"],
            row["tokenIndexZeroBased"],
        )
        for row in rows
    }
    return {
        "checkpoint": QUERY_ID,
        "status": "COMPLETE_MECHANICAL_INVENTORY_REVIEW_REQUIRED",
        "construction": CONSTRUCTION,
        "endpoint": (
            "Every exact HKCanCor 要, 會, 可以, 使, or 唔使 token and every "
            "exact adjacent 唔 + 要/會/可以/使 sequence with at least one "
            "following lexical token in the same utterance is inventoried and "
            "accounted for after overlap deduplication."
        ),
        "generatedWithPycantonese": context.pycantonese_version,
        "corpusName": "HKCanCor",
        "corpusFilesInDistribution": corpus.n_files,
        "corpusUtterancesInDistribution": len(corpus.utterances()),
        "corpusWordsInDistribution": len(corpus.words()),
        "hashes": {
            "verifiedCorpusDistributionSha256": corpus_distribution_sha256(
                source_hashes
            ),
            "sourceManifestPath": context.source_manifest_path.as_posix(),
            "sourceManifestSha256": context.source_manifest_sha256,
            "sourceFileSha256ByName": dict(sorted(source_hashes.items())),
        },
        "query": {
            "singleTokenSurfaceForms": list(SINGLE_TOKEN_FORMS),
            "adjacentNegationProfiles": [f"唔 + {form}" for form in BASE_FORMS],
            "selectionUnit": "exact token or adjacent token sequence within one utterance",
            "requiresFollowingLexicalToken": True,
            "punctuationCountsAsLexicalMaterial": False,
            "posRestricted": False,
            "syntaxRestricted": False,
            "modalReadingInferred": False,
            "complementStructureInferred": False,
            "semanticSelectionPerformed": False,
            "overlapPolicy": (
                "An adjacent 唔 + modal sequence is anchored once at 唔; the "
                "following modal token cannot create a second candidate. Exact "
                "single-token 唔使 and adjacent 唔 + 使 remain distinct through "
                "segmentationProfile while sharing normalizedSurface=唔使."
            ),
        },
        "counts": {
            "candidateSpans": len(rows),
            "matchedCorpusTokens": sum(
                len(row["matchedTokens"]) for row in rows  # type: ignore[arg-type]
            ),
            "uniqueSourceLocations": len(unique_locations),
            "candidateUtterances": len(
                {
                    (row["sourceFile"], row["turnIndexZeroBased"])
                    for row in rows
                }
            ),
            "sourceFilesWithCandidates": len(
                {row["sourceFile"] for row in rows}
            ),
            "sourceFileCandidateCounts": counter_dict(
                [row["sourceFile"] for row in rows]
            ),
            "queryLexemes": dict(sorted(query_lexemes.items())),
            "matchedSurfaceForms": dict(sorted(matched_forms.items())),
            "segmentationProfiles": counter_dict(
                [row["segmentationProfile"] for row in rows]
            ),
            "negationProfiles": counter_dict(
                [row["negationProfile"] for row in rows]
            ),
            "lexemeByNegationProfile": counter_dict(
                [
                    f"{row['queryLexeme']}|{row['negationProfile']}"
                    for row in rows
                ]
            ),
            "surfaceBySegmentationProfile": counter_dict(
                [
                    f"{row['matchedSurfaceSpan']}|{row['segmentationProfile']}"
                    for row in rows
                ]
            ),
            "matchedHkcancorPosSequences": counter_dict(
                [sequence_key(row["matchedHkcancorTags"]) for row in rows]
            ),
            "matchedUdPosSequences": counter_dict(
                [sequence_key(row["matchedUdTags"]) for row in rows]
            ),
            "followingForms": counter_dict(
                [row["followingLexicalToken"]["word"] for row in rows]  # type: ignore[index]
            ),
            "followingHkcancorPos": counter_dict(
                [row["followingLexicalToken"]["pos"] for row in rows]  # type: ignore[index]
            ),
            "followingUdPos": counter_dict(
                [row["followingLexicalToken"]["udPos"] for row in rows]  # type: ignore[index]
            ),
            "interveningTokenCountsBeforeFollowingLexical": counter_dict(
                [
                    row["interveningTokenCountBeforeFollowingLexical"]
                    for row in rows
                ]
            ),
        },
        "stableIdPolicy": {
            "namespace": QUERY_ID,
            "prefix": "aa89-",
            "anchorToken": (
                "the exact modal token, exact 唔使 token, or initial 唔 token "
                "of an adjacent negation profile at the source location"
            ),
        },
        "interpretationWarning": (
            "The inventory deliberately retains modal, lexical, desiderative, "
            "deontic, epistemic, permissive, interrogative-adjacent, repair, "
            "fragment, and annotation-boundary candidates. Expert context review "
            "must determine AA89 membership, modal reading, polarity, and complement "
            "structure. Counts do not establish evidence, productivity, readiness, "
            "status, identity, or runtime behavior."
        ),
    }


def render_tsv(rows: list[dict[str, object]]) -> str:
    fields = [
        "candidate_id",
        "source_file",
        "source_file_sha256",
        "file_index_zero_based",
        "turn_index_zero_based",
        "token_index_zero_based",
        "participant",
        "matched_surface_span",
        "query_lexeme",
        "segmentation_profile",
        "negation_profile",
        "matched_hkcancor_tags",
        "matched_ud_tags",
        "immediate_left_form",
        "immediate_left_hkcancor_pos",
        "immediate_left_ud_pos",
        "immediate_right_form",
        "immediate_right_hkcancor_pos",
        "immediate_right_ud_pos",
        "following_lexical_form",
        "following_lexical_hkcancor_pos",
        "following_lexical_ud_pos",
        "following_lexical_token_index_zero_based",
        "intervening_token_count_before_following_lexical",
        "overlap_deduplication_json",
        "duplicate_group_inputs_json",
        "text",
        "previous_text",
        "next_text",
        "token_context_json",
        "tokens_json",
        "annotation_status",
    ]
    output = io.StringIO()
    writer = csv.DictWriter(
        output, fieldnames=fields, delimiter="\t", lineterminator="\n"
    )
    writer.writeheader()
    for row in rows:
        context = row["localContext"]
        left = row["immediateLeftToken"]
        right = row["immediateRightToken"]
        following = row["followingLexicalToken"]
        writer.writerow(
            {
                "candidate_id": row["candidateId"],
                "source_file": row["sourceFile"],
                "source_file_sha256": row["sourceFileSha256"],
                "file_index_zero_based": row["fileIndexZeroBased"],
                "turn_index_zero_based": row["turnIndexZeroBased"],
                "token_index_zero_based": row["tokenIndexZeroBased"],
                "participant": row["participant"],
                "matched_surface_span": row["matchedSurfaceSpan"],
                "query_lexeme": row["queryLexeme"],
                "segmentation_profile": row["segmentationProfile"],
                "negation_profile": row["negationProfile"],
                "matched_hkcancor_tags": "+".join(  # type: ignore[arg-type]
                    row["matchedHkcancorTags"]
                ),
                "matched_ud_tags": "+".join(  # type: ignore[arg-type]
                    row["matchedUdTags"]
                ),
                "immediate_left_form": left["word"] if left else "",
                "immediate_left_hkcancor_pos": left["pos"] if left else "",
                "immediate_left_ud_pos": left["udPos"] if left else "",
                "immediate_right_form": right["word"] if right else "",
                "immediate_right_hkcancor_pos": right["pos"] if right else "",
                "immediate_right_ud_pos": right["udPos"] if right else "",
                "following_lexical_form": following["word"],  # type: ignore[index]
                "following_lexical_hkcancor_pos": following["pos"],  # type: ignore[index]
                "following_lexical_ud_pos": following["udPos"],  # type: ignore[index]
                "following_lexical_token_index_zero_based": row[
                    "followingLexicalTokenIndexZeroBased"
                ],
                "intervening_token_count_before_following_lexical": row[
                    "interveningTokenCountBeforeFollowingLexical"
                ],
                "overlap_deduplication_json": json.dumps(
                    row["overlapDeduplication"],
                    ensure_ascii=False,
                    separators=(",", ":"),
                ),
                "duplicate_group_inputs_json": json.dumps(
                    row["duplicateGroupInputs"],
                    ensure_ascii=False,
                    separators=(",", ":"),
                ),
                "text": row["text"],
                "previous_text": (
                    context["previous"]["text"] if context["previous"] else ""  # type: ignore[index]
                ),
                "next_text": (
                    context["next"]["text"] if context["next"] else ""  # type: ignore[index]
                ),
                "token_context_json": json.dumps(
                    row["tokenContext"], ensure_ascii=False, separators=(",", ":")
                ),
                "tokens_json": json.dumps(
                    row["tokens"], ensure_ascii=False, separators=(",", ":")
                ),
                "annotation_status": row["annotationStatus"],
            }
        )
    return output.getvalue()


QUERY_PROFILES = {
    PROFILE_KEY: QueryProfile(
        query_id=QUERY_ID,
        candidate_id_namespace=QUERY_ID,
        candidate_id_prefix="aa89-",
        inventory_json="hkcancor-aa89-modal-lexeme-candidate-inventory.json",
        inventory_tsv="hkcancor-aa89-modal-lexeme-candidate-inventory.tsv",
        summary_json="hkcancor-aa89-modal-lexeme-query-summary.json",
        construction=CONSTRUCTION,
        token_predicate=token_predicate,
        summary_builder=summary_builder,
        context_before_tokens=8,
        context_after_tokens=8,
        tsv_renderer=render_tsv,
    )
}


def main() -> None:
    profile_cli(
        QUERY_PROFILES,
        profile_argument="--profile",
        description="Generate or check the deterministic AA89 HKCanCor query.",
    )


if __name__ == "__main__":
    main()
