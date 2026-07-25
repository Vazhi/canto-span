#!/usr/bin/env python3
"""AA77 high-recall HKCanCor profile for noninitial 有 and 冇 tokens.

The query inventories bounded surface positions only. It does not infer a place
expression, existential structure, possession, topic structure, introduced-NP
status, construction membership, or evidence readiness.
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
    "constructionUuid": "c130b11d-3828-53d9-ae28-7344fb742201",
    "permanentCode": "AA77",
    "canonicalIdentity": "PlaceInitialJauMouExistentialClause",
    "legacyRuntimeLabel": "LocativeExistentialClause",
}
QUERY_ID = "AA77-HKCANCOR-NONINITIAL-JAU-MOU-R1"
PROFILE_KEY = "noninitial-jau-mou"
TARGET_FORMS = ("有", "冇")


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
    return any(unicodedata.category(character)[0] not in {"P", "S", "Z"} for character in word)


def lexical_indices(tokens: Sequence[object]) -> list[int]:
    return [index for index, token in enumerate(tokens) if is_lexical_token(token)]


def token_predicate(tokens: Sequence[object], token_index: int) -> Match | None:
    token = tokens[token_index]
    word = token.word  # type: ignore[attr-defined]
    if word not in TARGET_FORMS:
        return None

    preceding_lexical_indices = [
        index for index in range(token_index) if is_lexical_token(tokens[index])
    ]
    following_lexical_indices = [
        index
        for index in range(token_index + 1, len(tokens))
        if is_lexical_token(tokens[index])
    ]
    if not preceding_lexical_indices or not following_lexical_indices:
        return None

    immediate_left = tokens[token_index - 1] if token_index > 0 else None
    immediate_right = (
        tokens[token_index + 1] if token_index + 1 < len(tokens) else None
    )
    nearest_left_lexical = tokens[preceding_lexical_indices[-1]]
    nearest_right_lexical = tokens[following_lexical_indices[0]]

    return Match(
        start_index=token_index,
        end_index_exclusive=token_index + 1,
        id_token_index=token_index,
        matched_surface=word,
        duplicate_group_inputs={"matchedForm": word},
        extra_fields={
            "matchedForm": word,
            "matchedHkcancorTag": token.pos,  # type: ignore[attr-defined]
            "matchedUdTag": hkcancor_to_ud(token.pos),  # type: ignore[attr-defined]
            "distanceFromUtteranceStartTokens": token_index,
            "precedingLexicalTokenCount": len(preceding_lexical_indices),
            "followingLexicalTokenCount": len(following_lexical_indices),
            "precedingMaterialTokens": [
                token_record(item) for item in tokens[:token_index]
            ],
            "immediateLeftToken": token_record(immediate_left),
            "immediateRightToken": token_record(immediate_right),
            "nearestLeftLexicalToken": token_record(nearest_left_lexical),
            "nearestRightLexicalToken": token_record(nearest_right_lexical),
        },
    )


def corpus_distribution_sha256(source_hashes: dict[str, str]) -> str:
    payload = "".join(
        f"{digest}  {filename}\n"
        for filename, digest in sorted(source_hashes.items())
    )
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def neighbor_value(
    row: dict[str, object],
    side: str,
    field: str,
    boundary: str,
) -> str:
    token = row[side]
    return token[field] if token else boundary  # type: ignore[index]


def counter_dict(values: Sequence[object]) -> dict[str, int]:
    return dict(sorted(Counter(str(value) for value in values).items()))


def summary_builder(
    context: WorkbenchContext, rows: list[dict[str, object]]
) -> dict[str, object]:
    corpus = context.corpus
    source_hashes = dict(context.source_hashes)
    matched_forms = Counter({form: 0 for form in TARGET_FORMS})
    matched_forms.update(str(row["matchedForm"]) for row in rows)
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
            "Every exact HKCanCor 有 or 冇 token with at least one preceding "
            "lexical token and at least one following lexical token in the same "
            "utterance is inventoried and accounted for."
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
            "surfaceForms": list(TARGET_FORMS),
            "selectionUnit": "exact token within one utterance",
            "requiresPrecedingLexicalToken": True,
            "requiresFollowingLexicalToken": True,
            "punctuationCountsAsLexicalMaterial": False,
            "posRestricted": False,
            "placeLexiconRestricted": False,
            "subjectOrTopicAnalysisPerformed": False,
            "followingNominalityRequired": False,
            "existentialOrPossessiveAnalysisPerformed": False,
            "semanticSelectionPerformed": False,
        },
        "counts": {
            "candidateTokens": len(rows),
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
            "matchedSurfaceForms": dict(sorted(matched_forms.items())),
            "matchedHkcancorPos": counter_dict(
                [row["matchedHkcancorTag"] for row in rows]
            ),
            "matchedUdPos": counter_dict(
                [row["matchedUdTag"] for row in rows]
            ),
            "distanceFromUtteranceStartTokens": counter_dict(
                [row["distanceFromUtteranceStartTokens"] for row in rows]
            ),
            "precedingLexicalTokenCounts": counter_dict(
                [row["precedingLexicalTokenCount"] for row in rows]
            ),
            "followingLexicalTokenCounts": counter_dict(
                [row["followingLexicalTokenCount"] for row in rows]
            ),
            "immediateLeftForms": counter_dict(
                [
                    neighbor_value(
                        row,
                        "immediateLeftToken",
                        "word",
                        "<UTTERANCE_START>",
                    )
                    for row in rows
                ]
            ),
            "immediateLeftHkcancorPos": counter_dict(
                [
                    neighbor_value(
                        row,
                        "immediateLeftToken",
                        "pos",
                        "<UTTERANCE_START>",
                    )
                    for row in rows
                ]
            ),
            "immediateLeftUdPos": counter_dict(
                [
                    neighbor_value(
                        row,
                        "immediateLeftToken",
                        "udPos",
                        "<UTTERANCE_START>",
                    )
                    for row in rows
                ]
            ),
            "immediateRightForms": counter_dict(
                [
                    neighbor_value(
                        row,
                        "immediateRightToken",
                        "word",
                        "<UTTERANCE_END>",
                    )
                    for row in rows
                ]
            ),
            "immediateRightHkcancorPos": counter_dict(
                [
                    neighbor_value(
                        row,
                        "immediateRightToken",
                        "pos",
                        "<UTTERANCE_END>",
                    )
                    for row in rows
                ]
            ),
            "immediateRightUdPos": counter_dict(
                [
                    neighbor_value(
                        row,
                        "immediateRightToken",
                        "udPos",
                        "<UTTERANCE_END>",
                    )
                    for row in rows
                ]
            ),
            "nearestLeftLexicalForms": counter_dict(
                [row["nearestLeftLexicalToken"]["word"] for row in rows]  # type: ignore[index]
            ),
            "nearestRightLexicalForms": counter_dict(
                [row["nearestRightLexicalToken"]["word"] for row in rows]  # type: ignore[index]
            ),
        },
        "stableIdPolicy": {
            "namespace": QUERY_ID,
            "prefix": "aa77-",
            "anchorToken": "the exact 有 or 冇 token at the source location",
        },
        "interpretationWarning": (
            "The inventory deliberately retains place-first existential, possession, "
            "topic, subject, discourse, repair, fragment, wh/focus, and other "
            "competing analyses. Expert context review must determine AA77 membership, "
            "place status, introduced-NP status, and polarity interpretation. Counts "
            "do not establish evidence, productivity, readiness, status, identity, "
            "or runtime behavior."
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
        "matched_form",
        "matched_hkcancor_pos",
        "matched_ud_pos",
        "distance_from_utterance_start_tokens",
        "preceding_lexical_token_count",
        "following_lexical_token_count",
        "immediate_left_form",
        "immediate_left_hkcancor_pos",
        "immediate_left_ud_pos",
        "immediate_right_form",
        "immediate_right_hkcancor_pos",
        "immediate_right_ud_pos",
        "nearest_left_lexical_form",
        "nearest_left_lexical_hkcancor_pos",
        "nearest_left_lexical_ud_pos",
        "nearest_right_lexical_form",
        "nearest_right_lexical_hkcancor_pos",
        "nearest_right_lexical_ud_pos",
        "preceding_material_tokens_json",
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
        lexical_left = row["nearestLeftLexicalToken"]
        lexical_right = row["nearestRightLexicalToken"]
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
                "matched_form": row["matchedForm"],
                "matched_hkcancor_pos": row["matchedHkcancorTag"],
                "matched_ud_pos": row["matchedUdTag"],
                "distance_from_utterance_start_tokens": row[
                    "distanceFromUtteranceStartTokens"
                ],
                "preceding_lexical_token_count": row[
                    "precedingLexicalTokenCount"
                ],
                "following_lexical_token_count": row[
                    "followingLexicalTokenCount"
                ],
                "immediate_left_form": left["word"] if left else "",
                "immediate_left_hkcancor_pos": left["pos"] if left else "",
                "immediate_left_ud_pos": left["udPos"] if left else "",
                "immediate_right_form": right["word"] if right else "",
                "immediate_right_hkcancor_pos": right["pos"] if right else "",
                "immediate_right_ud_pos": right["udPos"] if right else "",
                "nearest_left_lexical_form": lexical_left["word"],
                "nearest_left_lexical_hkcancor_pos": lexical_left["pos"],
                "nearest_left_lexical_ud_pos": lexical_left["udPos"],
                "nearest_right_lexical_form": lexical_right["word"],
                "nearest_right_lexical_hkcancor_pos": lexical_right["pos"],
                "nearest_right_lexical_ud_pos": lexical_right["udPos"],
                "preceding_material_tokens_json": json.dumps(
                    row["precedingMaterialTokens"],
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
        candidate_id_prefix="aa77-",
        inventory_json="hkcancor-aa77-jau-mou-candidate-inventory.json",
        inventory_tsv="hkcancor-aa77-jau-mou-candidate-inventory.tsv",
        summary_json="hkcancor-aa77-jau-mou-query-summary.json",
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
        description="Generate or check the deterministic AA77 HKCanCor query.",
    )


if __name__ == "__main__":
    main()
