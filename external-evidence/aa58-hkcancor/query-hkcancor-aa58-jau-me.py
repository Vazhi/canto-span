#!/usr/bin/env python3
"""AA58 high-recall HKCanCor profile for 有 + 咩 and 有咩.

The query inventories surface forms only. It does not infer a following nominal
head, question interpretation, construction membership, or evidence readiness.
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
    "constructionUuid": "fd7373c1-9f61-5c5e-bc86-d078ee69f965",
    "permanentCode": "AA58",
    "canonicalIdentity": "JauMeNounWhQuestion",
    "legacyRuntimeLabel": "ExistentialWhQuestion",
}
QUERY_ID = "AA58-HKCANCOR-JAU-ME-R1"
PROFILE_KEY = "jau-me"
ADJACENT_JAU_ME = "adjacent_jau_me_tokens"
SINGLE_TOKEN_JAU_ME = "single_token_jau_me"


def token_record(token: object) -> dict[str, str]:
    return {
        "word": token.word,  # type: ignore[attr-defined]
        "pos": token.pos,  # type: ignore[attr-defined]
        "jyutping": token.jyutping,  # type: ignore[attr-defined]
        "udPos": hkcancor_to_ud(token.pos),  # type: ignore[attr-defined]
    }


def token_predicate(tokens: Sequence[object], token_index: int) -> Match | None:
    token = tokens[token_index]
    word = token.word  # type: ignore[attr-defined]
    if word == "有咩":
        end_index = token_index + 1
        segmentation_profile = SINGLE_TOKEN_JAU_ME
    elif (
        word == "有"
        and token_index + 1 < len(tokens)
        and tokens[token_index + 1].word == "咩"  # type: ignore[attr-defined]
    ):
        end_index = token_index + 2
        segmentation_profile = ADJACENT_JAU_ME
    else:
        return None

    matched_tokens = tokens[token_index:end_index]
    matched_surface = "".join(
        item.word for item in matched_tokens  # type: ignore[attr-defined]
    )
    following = tokens[end_index] if end_index < len(tokens) else None
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
            "followingToken": token_record(following) if following else None,
        },
    )


def corpus_distribution_sha256(source_hashes: dict[str, str]) -> str:
    payload = "".join(
        f"{digest}  {filename}\n"
        for filename, digest in sorted(source_hashes.items())
    )
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def following_value(
    row: dict[str, object], field: str, boundary: str = "<UTTERANCE_END>"
) -> str:
    token = row["followingToken"]
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
            "Every exact adjacent HKCanCor 有 + 咩 token sequence and every exact "
            "single token 有咩 in the frozen distribution is inventoried and "
            "accounted for after source-location overlap deduplication."
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
            "surfaceProfiles": [ADJACENT_JAU_ME, SINGLE_TOKEN_JAU_ME],
            "selectionUnit": "exact token or adjacent token sequence within one utterance",
            "followingNominalRequired": False,
            "posRestricted": False,
            "interpretationInferred": False,
            "semanticSelectionPerformed": False,
            "overlapPolicy": (
                "The scanner anchors one candidate at 有 or 有咩; the 咩 token in "
                "an adjacent match cannot create a second candidate."
            ),
        },
        "counts": {
            "candidateTokens": len(rows),
            "matchedCorpusTokens": sum(len(row["matchedTokens"]) for row in rows),  # type: ignore[arg-type]
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
            "followingForms": dict(
                sorted(Counter(following_value(row, "word") for row in rows).items())
            ),
            "followingHkcancorPos": dict(
                sorted(Counter(following_value(row, "pos") for row in rows).items())
            ),
            "followingUdPos": dict(
                sorted(
                    Counter(following_value(row, "udPos") for row in rows).items()
                )
            ),
        },
        "stableIdPolicy": {
            "namespace": QUERY_ID,
            "prefix": "aa58-",
            "anchorToken": "有 or 有咩 at the source location",
        },
        "interpretationWarning": (
            "The inventory deliberately retains noun-headed, headless, repaired, "
            "discourse-fragment, and annotation-boundary candidates. Expert context "
            "review must determine AA58 membership and interpretation. Counts do "
            "not establish evidence, productivity, readiness, status, identity, or "
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
        "segmentation_profile",
        "matched_hkcancor_tags",
        "matched_ud_tags",
        "following_form",
        "following_hkcancor_pos",
        "following_ud_pos",
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
        following = row["followingToken"]
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
                "matched_hkcancor_tags": "+".join(row["matchedHkcancorTags"]),  # type: ignore[arg-type]
                "matched_ud_tags": "+".join(row["matchedUdTags"]),  # type: ignore[arg-type]
                "following_form": following["word"] if following else "",
                "following_hkcancor_pos": following["pos"] if following else "",
                "following_ud_pos": following["udPos"] if following else "",
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
        candidate_id_prefix="aa58-",
        inventory_json="hkcancor-aa58-jau-me-candidate-inventory.json",
        inventory_tsv="hkcancor-aa58-jau-me-candidate-inventory.tsv",
        summary_json="hkcancor-aa58-jau-me-query-summary.json",
        construction=CONSTRUCTION,
        token_predicate=token_predicate,
        summary_builder=summary_builder,
        context_before_tokens=6,
        context_after_tokens=6,
        tsv_renderer=render_tsv,
    )
}


def main() -> None:
    profile_cli(
        QUERY_PROFILES,
        profile_argument="--profile",
        description="Generate or check the deterministic AA58 HKCanCor query.",
    )


if __name__ == "__main__":
    main()
