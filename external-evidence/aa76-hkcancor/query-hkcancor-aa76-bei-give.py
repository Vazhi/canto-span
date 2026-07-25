#!/usr/bin/env python3
"""AA76 high-recall HKCanCor profile for exact 畀, 俾, and 给 tokens.

The query inventories surface forms only. It does not infer lexical GIVE,
argument roles or order, construction membership, or evidence readiness.
"""

from __future__ import annotations

import csv
import hashlib
import io
import json
import sys
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
    "constructionUuid": "5a77623d-eced-5f83-b0ad-ff1aea8d4b2d",
    "permanentCode": "AA76",
    "canonicalIdentity": "BeiThemeRecipientGiveVP",
    "legacyRuntimeLabel": "LexicalGiveRelation",
}
QUERY_ID = "AA76-HKCANCOR-BEI-GIVE-R1"
PROFILE_KEY = "bei-give"
TARGET_FORMS = ("畀", "俾", "给")


def token_record(token: object | None) -> dict[str, str] | None:
    if token is None:
        return None
    return {
        "word": token.word,  # type: ignore[attr-defined]
        "pos": token.pos,  # type: ignore[attr-defined]
        "jyutping": token.jyutping,  # type: ignore[attr-defined]
        "udPos": hkcancor_to_ud(token.pos),  # type: ignore[attr-defined]
    }


def token_predicate(tokens: Sequence[object], token_index: int) -> Match | None:
    token = tokens[token_index]
    word = token.word  # type: ignore[attr-defined]
    if word not in TARGET_FORMS:
        return None

    left_token = tokens[token_index - 1] if token_index > 0 else None
    right_token = (
        tokens[token_index + 1] if token_index + 1 < len(tokens) else None
    )
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


def neighbor_value(
    row: dict[str, object],
    side: str,
    field: str,
    boundary: str,
) -> str:
    token = row[side]
    return token[field] if token else boundary  # type: ignore[index]


def summary_builder(
    context: WorkbenchContext, rows: list[dict[str, object]]
) -> dict[str, object]:
    corpus = context.corpus
    source_hashes = dict(context.source_hashes)
    matched_forms = Counter({form: 0 for form in TARGET_FORMS})
    matched_forms.update(str(row["matchedForm"]) for row in rows)
    matched_hkcancor_tags = Counter(
        str(row["matchedHkcancorTag"]) for row in rows
    )
    matched_ud_tags = Counter(str(row["matchedUdTag"]) for row in rows)
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
            "Every exact HKCanCor token whose surface form is 畀, 俾, or 给 in "
            "the frozen distribution is inventoried and accounted for."
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
            "posRestricted": False,
            "precedingSubjectRequired": False,
            "followingArgumentCountRequired": False,
            "followingNominalityRequired": False,
            "lexicalSenseInferred": False,
            "argumentRolesInferred": False,
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
            "matchedSurfaceForms": dict(sorted(matched_forms.items())),
            "matchedHkcancorPos": dict(sorted(matched_hkcancor_tags.items())),
            "matchedUdPos": dict(sorted(matched_ud_tags.items())),
            "immediateLeftForms": dict(
                sorted(
                    Counter(
                        neighbor_value(
                            row,
                            "immediateLeftToken",
                            "word",
                            "<UTTERANCE_START>",
                        )
                        for row in rows
                    ).items()
                )
            ),
            "immediateLeftHkcancorPos": dict(
                sorted(
                    Counter(
                        neighbor_value(
                            row,
                            "immediateLeftToken",
                            "pos",
                            "<UTTERANCE_START>",
                        )
                        for row in rows
                    ).items()
                )
            ),
            "immediateLeftUdPos": dict(
                sorted(
                    Counter(
                        neighbor_value(
                            row,
                            "immediateLeftToken",
                            "udPos",
                            "<UTTERANCE_START>",
                        )
                        for row in rows
                    ).items()
                )
            ),
            "immediateRightForms": dict(
                sorted(
                    Counter(
                        neighbor_value(
                            row,
                            "immediateRightToken",
                            "word",
                            "<UTTERANCE_END>",
                        )
                        for row in rows
                    ).items()
                )
            ),
            "immediateRightHkcancorPos": dict(
                sorted(
                    Counter(
                        neighbor_value(
                            row,
                            "immediateRightToken",
                            "pos",
                            "<UTTERANCE_END>",
                        )
                        for row in rows
                    ).items()
                )
            ),
            "immediateRightUdPos": dict(
                sorted(
                    Counter(
                        neighbor_value(
                            row,
                            "immediateRightToken",
                            "udPos",
                            "<UTTERANCE_END>",
                        )
                        for row in rows
                    ).items()
                )
            ),
        },
        "stableIdPolicy": {
            "namespace": QUERY_ID,
            "prefix": "aa76-",
            "anchorToken": "the exact 畀, 俾, or 给 token at the source location",
        },
        "interpretationWarning": (
            "The inventory deliberately retains lexical GIVE, passive, permissive, "
            "benefactive, linker, repaired, discourse, omitted-argument, and "
            "annotation-boundary candidates. Expert context review must determine "
            "AA76 membership, sense, argument roles, and order. Counts do not "
            "establish evidence, productivity, readiness, status, identity, or "
            "runtime behavior."
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
                "matched_form": row["matchedForm"],
                "matched_hkcancor_pos": row["matchedHkcancorTag"],
                "matched_ud_pos": row["matchedUdTag"],
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
        candidate_id_prefix="aa76-",
        inventory_json="hkcancor-aa76-bei-give-candidate-inventory.json",
        inventory_tsv="hkcancor-aa76-bei-give-candidate-inventory.tsv",
        summary_json="hkcancor-aa76-bei-give-query-summary.json",
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
        description="Generate or check the deterministic AA76 HKCanCor query.",
    )


if __name__ == "__main__":
    main()
