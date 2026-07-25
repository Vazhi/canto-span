#!/usr/bin/env python3
"""AB53 high-recall HKCanCor profile for 用嚟 and adjacent 用 + 嚟.

The query inventories surface forms only. It does not infer an overt resource,
function relation, purpose interpretation, construction membership, or evidence
readiness.
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
    "constructionUuid": "06c9f3b1-f243-588d-8a6e-bddf9a94c871",
    "permanentCode": "AB53",
    "canonicalIdentity": "ResourceInitialJungLaiFunctionClause",
    "legacyRuntimeLabel": "ResourceUseLaiFunctionRelation",
}
QUERY_ID = "AB53-HKCANCOR-JUNG-LAI-R1"
PROFILE_KEY = "jung-lai"
ADJACENT_JUNG_LAI = "adjacent_jung_lai_tokens"
SINGLE_TOKEN_JUNG_LAI = "single_token_jung_lai"


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
    if word == "用嚟":
        end_index = token_index + 1
        segmentation_profile = SINGLE_TOKEN_JUNG_LAI
    elif (
        word == "用"
        and token_index + 1 < len(tokens)
        and tokens[token_index + 1].word == "嚟"  # type: ignore[attr-defined]
    ):
        end_index = token_index + 2
        segmentation_profile = ADJACENT_JUNG_LAI
    else:
        return None

    matched_tokens = tokens[token_index:end_index]
    matched_surface = "".join(
        item.word for item in matched_tokens  # type: ignore[attr-defined]
    )
    left_token = tokens[token_index - 1] if token_index > 0 else None
    right_token = tokens[end_index] if end_index < len(tokens) else None
    return Match(
        start_index=token_index,
        end_index_exclusive=end_index,
        id_token_index=token_index,
        matched_surface=matched_surface,
        duplicate_group_inputs={"normalizedSurface": matched_surface},
        extra_fields={
            "segmentationProfile": segmentation_profile,
            "overlapDeduplication": {
                "sourceAnchorTokenIndexZeroBased": token_index,
                "representedProfiles": [segmentation_profile],
                "overlappingRepresentationsDeduplicated": 0,
            },
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
    segmentation_profiles = Counter(
        str(row["segmentationProfile"]) for row in rows
    )
    matched_forms = Counter(str(row["matchedSurfaceSpan"]) for row in rows)
    matched_hkcancor_tags = Counter(
        "+".join(row["matchedHkcancorTags"])  # type: ignore[arg-type]
        for row in rows
    )
    matched_ud_tags = Counter(
        "+".join(row["matchedUdTags"])  # type: ignore[arg-type]
        for row in rows
    )
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
            "Every exact HKCanCor token 用嚟 and every exact adjacent 用 + 嚟 "
            "sequence in the frozen distribution is inventoried and accounted "
            "for after source-location overlap deduplication."
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
            "surfaceProfiles": [
                ADJACENT_JUNG_LAI,
                SINGLE_TOKEN_JUNG_LAI,
            ],
            "selectionUnit": (
                "exact token or adjacent token sequence within one utterance"
            ),
            "precedingResourceRequired": False,
            "followingVpRequired": False,
            "posRestricted": False,
            "functionInterpretationInferred": False,
            "semanticSelectionPerformed": False,
            "overlapPolicy": (
                "The scanner anchors one candidate at 用 or 用嚟; the 嚟 token "
                "in an adjacent match cannot create a second candidate."
            ),
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
            "segmentationProfiles": dict(sorted(segmentation_profiles.items())),
            "matchedSurfaceForms": dict(sorted(matched_forms.items())),
            "matchedHkcancorTagSequences": dict(
                sorted(matched_hkcancor_tags.items())
            ),
            "matchedUdTagSequences": dict(sorted(matched_ud_tags.items())),
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
            "prefix": "ab53-",
            "anchorToken": "用 or 用嚟 at the source location",
        },
        "interpretationWarning": (
            "The inventory deliberately retains resource-initial, omitted-resource, "
            "discourse-linked, repaired, lexical, and annotation-boundary "
            "candidates. Expert context review must determine AB53 membership and "
            "resource/function interpretation. Counts do not establish evidence, "
            "productivity, readiness, status, identity, or runtime behavior."
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
        "segmentation_profile",
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
                "segmentation_profile": row["segmentationProfile"],
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
        candidate_id_prefix="ab53-",
        inventory_json="hkcancor-ab53-jung-lai-candidate-inventory.json",
        inventory_tsv="hkcancor-ab53-jung-lai-candidate-inventory.tsv",
        summary_json="hkcancor-ab53-jung-lai-query-summary.json",
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
        description="Generate or check the deterministic AB53 HKCanCor query.",
    )


if __name__ == "__main__":
    main()
