#!/usr/bin/env python3
"""AA91 high-recall HKCanCor profile for exact 好-X-noun sequences.

The query inventories form and frozen POS mapping only. It does not infer a
property reading, modification, predication, construction membership, or
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
    "constructionUuid": "6cb39abf-cd97-5701-8b7d-d2575645c127",
    "permanentCode": "AA91",
    "canonicalIdentity": "DegreePropertyModifierNounNP",
    "legacyRuntimeLabel": "ModifierNP",
}
QUERY_ID = "AA91-HKCANCOR-HOU-X-NOUN-R1"
PROFILE_KEY = "hou-x-noun"
FINAL_NOMINAL_UD_TAGS = {"NOUN", "PROPN"}


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
    if token_index + 2 >= len(tokens):
        return None

    degree_token = tokens[token_index]
    middle_token = tokens[token_index + 1]
    final_token = tokens[token_index + 2]

    if degree_token.word != "好":  # type: ignore[attr-defined]
        return None
    if middle_token.word == "嘅" or not is_lexical_token(middle_token):  # type: ignore[attr-defined]
        return None

    final_ud_pos = hkcancor_to_ud(final_token.pos)  # type: ignore[attr-defined]
    if final_ud_pos not in FINAL_NOMINAL_UD_TAGS:
        return None

    matched_tokens = tokens[token_index : token_index + 3]
    matched_surface = "".join(
        str(item.word) for item in matched_tokens  # type: ignore[attr-defined]
    )
    left_token = tokens[token_index - 1] if token_index > 0 else None
    right_token = tokens[token_index + 3] if token_index + 3 < len(tokens) else None

    return Match(
        start_index=token_index,
        end_index_exclusive=token_index + 3,
        id_token_index=token_index,
        matched_surface=matched_surface,
        duplicate_group_inputs={
            "middleForm": str(middle_token.word),  # type: ignore[attr-defined]
            "finalNominalForm": str(final_token.word),  # type: ignore[attr-defined]
        },
        extra_fields={
            "degreeToken": token_record(degree_token),
            "middleToken": token_record(middle_token),
            "finalNominalToken": token_record(final_token),
            "matchedHkcancorTags": [
                item.pos for item in matched_tokens  # type: ignore[attr-defined]
            ],
            "matchedUdTags": [
                hkcancor_to_ud(item.pos)  # type: ignore[attr-defined]
                for item in matched_tokens
            ],
            "immediateLeftToken": token_record(left_token),
            "immediateRightToken": token_record(right_token),
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
            "Every exact HKCanCor three-token sequence 好 + X + N is inventoried "
            "when X is lexical and not 嘅 and N maps through the frozen HKCanCor-to-UD "
            "mapping to NOUN or PROPN."
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
            "initialSurfaceForm": "好",
            "middleTokenRule": "any lexical token except exact 嘅",
            "finalUdPos": sorted(FINAL_NOMINAL_UD_TAGS),
            "selectionUnit": "exact adjacent three-token sequence within one utterance",
            "middlePosRestricted": False,
            "middleAdjectiveOrStativeRequired": False,
            "syntaxRestricted": False,
            "modifierReadingInferred": False,
            "predicationExcluded": False,
            "semanticSelectionPerformed": False,
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
            "matchedSurfaceForms": counter_dict(
                [row["matchedSurfaceSpan"] for row in rows]
            ),
            "middleForms": counter_dict(
                [row["middleToken"]["word"] for row in rows]  # type: ignore[index]
            ),
            "middleHkcancorPos": counter_dict(
                [row["middleToken"]["pos"] for row in rows]  # type: ignore[index]
            ),
            "middleUdPos": counter_dict(
                [row["middleToken"]["udPos"] for row in rows]  # type: ignore[index]
            ),
            "finalNominalForms": counter_dict(
                [row["finalNominalToken"]["word"] for row in rows]  # type: ignore[index]
            ),
            "finalNominalHkcancorPos": counter_dict(
                [row["finalNominalToken"]["pos"] for row in rows]  # type: ignore[index]
            ),
            "finalNominalUdPos": counter_dict(
                [row["finalNominalToken"]["udPos"] for row in rows]  # type: ignore[index]
            ),
            "middleFinalFormPairs": counter_dict(
                [
                    f"{row['middleToken']['word']}|{row['finalNominalToken']['word']}"  # type: ignore[index]
                    for row in rows
                ]
            ),
            "matchedHkcancorPosSequences": counter_dict(
                [sequence_key(row["matchedHkcancorTags"]) for row in rows]
            ),
            "matchedUdPosSequences": counter_dict(
                [sequence_key(row["matchedUdTags"]) for row in rows]
            ),
        },
        "stableIdPolicy": {
            "namespace": QUERY_ID,
            "prefix": "aa91-",
            "anchorToken": "the exact 好 token at the source location",
        },
        "interpretationWarning": (
            "The inventory deliberately retains degree-property candidates, "
            "predication, verbal and adverbial sequences, lexicalized strings, repairs, "
            "fragments, annotation boundaries, and POS-mapping false positives. Expert "
            "context review must determine AA91 membership and the relation between the "
            "middle and final tokens. Counts do not establish evidence, productivity, "
            "readiness, status, identity, or runtime behavior."
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
        "degree_form",
        "degree_hkcancor_pos",
        "degree_ud_pos",
        "middle_form",
        "middle_hkcancor_pos",
        "middle_ud_pos",
        "final_nominal_form",
        "final_nominal_hkcancor_pos",
        "final_nominal_ud_pos",
        "matched_hkcancor_tags",
        "matched_ud_tags",
        "immediate_left_form",
        "immediate_left_hkcancor_pos",
        "immediate_left_ud_pos",
        "immediate_right_form",
        "immediate_right_hkcancor_pos",
        "immediate_right_ud_pos",
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
        degree = row["degreeToken"]
        middle = row["middleToken"]
        final_nominal = row["finalNominalToken"]
        left = row["immediateLeftToken"]
        right = row["immediateRightToken"]
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
                "degree_form": degree["word"],  # type: ignore[index]
                "degree_hkcancor_pos": degree["pos"],  # type: ignore[index]
                "degree_ud_pos": degree["udPos"],  # type: ignore[index]
                "middle_form": middle["word"],  # type: ignore[index]
                "middle_hkcancor_pos": middle["pos"],  # type: ignore[index]
                "middle_ud_pos": middle["udPos"],  # type: ignore[index]
                "final_nominal_form": final_nominal["word"],  # type: ignore[index]
                "final_nominal_hkcancor_pos": final_nominal["pos"],  # type: ignore[index]
                "final_nominal_ud_pos": final_nominal["udPos"],  # type: ignore[index]
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
        candidate_id_prefix="aa91-",
        inventory_json="hkcancor-aa91-hou-x-noun-candidate-inventory.json",
        inventory_tsv="hkcancor-aa91-hou-x-noun-candidate-inventory.tsv",
        summary_json="hkcancor-aa91-hou-x-noun-query-summary.json",
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
        description="Generate or check the deterministic AA91 HKCanCor query.",
    )


if __name__ == "__main__":
    main()
