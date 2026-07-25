#!/usr/bin/env python3
"""AA30 high-recall HKCanCor profile for 同 and 同埋.

The query inventories surface forms only. It does not decide whether a candidate
is NP coordination, comitative/coverb 同, clause coordination, repair, or another
construction, and it does not change evidence/readiness state.
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
    "constructionUuid": "4f2855b1-7545-5e42-a0fb-aef8cf24f0fb",
    "permanentCode": "AA30",
    "canonicalIdentity": "CoordinatedNP",
    "legacyRuntimeLabel": "CoordinatedNP",
}
QUERY_ID = "AA30-HKCANCOR-TUNG-TUNGMAAI-R1"
PROFILE_KEY = "tung-tungmaai"
EXACT_TUNG = "exact_tung_token"
EXACT_TUNGMAAI = "exact_tungmaai_token"
ADJACENT_TUNG_MAAI = "adjacent_tung_maai_tokens"


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
    if word == "同埋":
        end_index = token_index + 1
        matched_profiles = [EXACT_TUNGMAAI]
        segmentation_profile = "single_token_tungmaai"
    elif word == "同":
        if (
            token_index + 1 < len(tokens)
            and tokens[token_index + 1].word == "埋"  # type: ignore[attr-defined]
        ):
            end_index = token_index + 2
            matched_profiles = [EXACT_TUNG, ADJACENT_TUNG_MAAI]
            segmentation_profile = "split_tokens_tung_maai"
        else:
            end_index = token_index + 1
            matched_profiles = [EXACT_TUNG]
            segmentation_profile = "single_token_tung"
    else:
        return None

    matched_surface = "".join(
        item.word for item in tokens[token_index:end_index]  # type: ignore[attr-defined]
    )
    left_neighbor = tokens[token_index - 1] if token_index > 0 else None
    right_neighbor = tokens[end_index] if end_index < len(tokens) else None
    return Match(
        start_index=token_index,
        end_index_exclusive=end_index,
        id_token_index=token_index,
        matched_surface=matched_surface,
        duplicate_group_inputs={"normalizedSurface": matched_surface},
        extra_fields={
            "segmentationProfile": segmentation_profile,
            "matchedProfiles": matched_profiles,
            "overlapDeduplication": {
                "representedProfileCount": len(matched_profiles),
                "representedProfiles": matched_profiles,
                "overlappingRepresentationsDeduplicated": len(matched_profiles) - 1,
            },
            "leftNeighbor": token_record(left_neighbor) if left_neighbor else None,
            "rightNeighbor": (
                token_record(right_neighbor) if right_neighbor else None
            ),
            "matchedHkcancorTags": [
                item.pos for item in tokens[token_index:end_index]  # type: ignore[attr-defined]
            ],
            "matchedUdTags": [
                hkcancor_to_ud(item.pos)  # type: ignore[attr-defined]
                for item in tokens[token_index:end_index]
            ],
        },
    )


def corpus_distribution_sha256(source_hashes: dict[str, str]) -> str:
    payload = "".join(
        f"{digest}  {filename}\n"
        for filename, digest in sorted(source_hashes.items())
    )
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def value_or_boundary(
    row: dict[str, object], neighbor_name: str, field: str, boundary: str
) -> str:
    neighbor = row[neighbor_name]
    return neighbor[field] if neighbor else boundary  # type: ignore[index]


def summary_builder(
    context: WorkbenchContext, rows: list[dict[str, object]]
) -> dict[str, object]:
    corpus = context.corpus
    matched_profiles = Counter(
        profile
        for row in rows
        for profile in row["matchedProfiles"]  # type: ignore[union-attr]
    )
    primary_profiles = Counter(str(row["segmentationProfile"]) for row in rows)
    matched_forms = Counter(str(row["matchedSurfaceSpan"]) for row in rows)
    matched_hkcancor_tags = Counter(
        "+".join(row["matchedHkcancorTags"])  # type: ignore[arg-type]
        for row in rows
    )
    matched_ud_tags = Counter(
        "+".join(row["matchedUdTags"])  # type: ignore[arg-type]
        for row in rows
    )
    source_hashes = dict(context.source_hashes)
    unique_locations = {
        (
            row["sourceFile"],
            row["turnIndexZeroBased"],
            row["tokenIndexZeroBased"],
        )
        for row in rows
    }
    raw_profile_matches = sum(len(row["matchedProfiles"]) for row in rows)  # type: ignore[arg-type]
    return {
        "checkpoint": QUERY_ID,
        "status": "COMPLETE_MECHANICAL_INVENTORY_REVIEW_REQUIRED",
        "construction": CONSTRUCTION,
        "endpoint": (
            "Every exact HKCanCor 同 token, exact 同埋 token, and adjacent 同 + 埋 "
            "token sequence in the frozen distribution is inventoried and accounted "
            "for after overlapping representations at the same source location are "
            "deduplicated."
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
            "surfaceProfiles": [EXACT_TUNG, EXACT_TUNGMAAI, ADJACENT_TUNG_MAAI],
            "selectionUnit": "exact token or adjacent token sequence within one utterance",
            "posRestricted": False,
            "syntacticRoleInferred": False,
            "semanticSelectionPerformed": False,
            "overlapPolicy": (
                "An adjacent 同 + 埋 source location is one candidate that records "
                "both the exact-同 and adjacent-sequence profiles."
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
            "rawSurfaceProfileMatches": raw_profile_matches,
            "overlappingRepresentationsDeduplicated": (
                raw_profile_matches - len(rows)
            ),
            "sourceLocationsWithMultipleProfiles": sum(
                len(row["matchedProfiles"]) > 1 for row in rows  # type: ignore[arg-type]
            ),
            "surfaceProfiles": dict(sorted(matched_profiles.items())),
            "segmentationProfiles": dict(sorted(primary_profiles.items())),
            "matchedSurfaceForms": dict(sorted(matched_forms.items())),
            "matchedHkcancorTagSequences": dict(
                sorted(matched_hkcancor_tags.items())
            ),
            "matchedUdTagSequences": dict(sorted(matched_ud_tags.items())),
            "leftNeighborForms": dict(
                sorted(
                    Counter(
                        value_or_boundary(
                            row, "leftNeighbor", "word", "<UTTERANCE_START>"
                        )
                        for row in rows
                    ).items()
                )
            ),
            "leftNeighborHkcancorPos": dict(
                sorted(
                    Counter(
                        value_or_boundary(
                            row, "leftNeighbor", "pos", "<UTTERANCE_START>"
                        )
                        for row in rows
                    ).items()
                )
            ),
            "leftNeighborUdPos": dict(
                sorted(
                    Counter(
                        value_or_boundary(
                            row, "leftNeighbor", "udPos", "<UTTERANCE_START>"
                        )
                        for row in rows
                    ).items()
                )
            ),
            "rightNeighborForms": dict(
                sorted(
                    Counter(
                        value_or_boundary(
                            row, "rightNeighbor", "word", "<UTTERANCE_END>"
                        )
                        for row in rows
                    ).items()
                )
            ),
            "rightNeighborHkcancorPos": dict(
                sorted(
                    Counter(
                        value_or_boundary(
                            row, "rightNeighbor", "pos", "<UTTERANCE_END>"
                        )
                        for row in rows
                    ).items()
                )
            ),
            "rightNeighborUdPos": dict(
                sorted(
                    Counter(
                        value_or_boundary(
                            row, "rightNeighbor", "udPos", "<UTTERANCE_END>"
                        )
                        for row in rows
                    ).items()
                )
            ),
        },
        "stableIdPolicy": {
            "namespace": QUERY_ID,
            "prefix": "aa30-",
            "anchorToken": "同 or 同埋 at the source location",
        },
        "interpretationWarning": (
            "Surface matching deliberately retains likely coordination, comitative, "
            "coverb, clause-level, repair, and annotation-boundary candidates. "
            "Expert context review must determine construction membership. Counts "
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
        "segmentation_profile",
        "matched_profiles_json",
        "matched_hkcancor_tags",
        "matched_ud_tags",
        "left_form",
        "left_hkcancor_pos",
        "left_ud_pos",
        "right_form",
        "right_hkcancor_pos",
        "right_ud_pos",
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
        left = row["leftNeighbor"]
        right = row["rightNeighbor"]
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
                "matched_profiles_json": json.dumps(
                    row["matchedProfiles"],
                    ensure_ascii=False,
                    separators=(",", ":"),
                ),
                "matched_hkcancor_tags": "+".join(row["matchedHkcancorTags"]),  # type: ignore[arg-type]
                "matched_ud_tags": "+".join(row["matchedUdTags"]),  # type: ignore[arg-type]
                "left_form": left["word"] if left else "",
                "left_hkcancor_pos": left["pos"] if left else "",
                "left_ud_pos": left["udPos"] if left else "",
                "right_form": right["word"] if right else "",
                "right_hkcancor_pos": right["pos"] if right else "",
                "right_ud_pos": right["udPos"] if right else "",
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
        candidate_id_prefix="aa30-",
        inventory_json="hkcancor-aa30-tung-tungmaai-candidate-inventory.json",
        inventory_tsv="hkcancor-aa30-tung-tungmaai-candidate-inventory.tsv",
        summary_json="hkcancor-aa30-tung-tungmaai-query-summary.json",
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
        description="Generate or check the deterministic AA30 HKCanCor query.",
    )


if __name__ == "__main__":
    main()
