#!/usr/bin/env python3
"""AA62 high-recall HKCanCor profile for verbal POS plus 過."""

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
    "constructionUuid": "9f107fee-95d3-5f2f-9316-ebb14d63b8e7",
    "permanentCode": "AA62",
    "canonicalIdentity": "GwoMarkedExperientialObjectVP",
    "legacyRuntimeLabel": "ExperientialVP",
}
QUERY_ID = "AA62-HKCANCOR-V-GWO-R1"
PROFILE_KEY = "v-gwo"
PRECEDING_VERBAL_POS = frozenset({"v", "v1", "xv"})


def token_record(token: object) -> dict[str, str]:
    return {
        "word": token.word,  # type: ignore[attr-defined]
        "pos": token.pos,  # type: ignore[attr-defined]
        "jyutping": token.jyutping,  # type: ignore[attr-defined]
        "udPos": hkcancor_to_ud(token.pos),  # type: ignore[attr-defined]
    }


def token_predicate(tokens: Sequence[object], token_index: int) -> Match | None:
    token = tokens[token_index]
    if (
        token.word != "過"  # type: ignore[attr-defined]
        or token_index == 0
        or tokens[token_index - 1].pos not in PRECEDING_VERBAL_POS  # type: ignore[attr-defined]
    ):
        return None
    preceding = tokens[token_index - 1]
    following = tokens[token_index + 1] if token_index + 1 < len(tokens) else None
    matched_surface = preceding.word + token.word  # type: ignore[attr-defined]
    return Match(
        start_index=token_index - 1,
        end_index_exclusive=token_index + 1,
        id_token_index=token_index,
        matched_surface=matched_surface,
        duplicate_group_inputs={"normalizedSurface": matched_surface},
        extra_fields={
            "precedingVerb": token_record(preceding),
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
    return {
        "checkpoint": QUERY_ID,
        "status": "COMPLETE_MECHANICAL_INVENTORY_REVIEW_REQUIRED",
        "construction": CONSTRUCTION,
        "endpoint": (
            "Every exact HKCanCor 過 token whose immediately preceding token has "
            "HKCanCor POS v, v1, or xv in the frozen distribution is inventoried "
            "and accounted for here."
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
            "exactMarkerToken": "過",
            "precedingHkcancorPosAllowlist": sorted(PRECEDING_VERBAL_POS),
            "followingTokenRestricted": False,
            "selectionUnit": "token adjacency within one HKCanCor utterance",
            "syntacticRoleInferred": False,
            "semanticSelectionPerformed": False,
        },
        "counts": {
            "candidateTokens": len(rows),
            "candidateUtterances": len(
                {
                    (row["sourceFile"], row["turnIndexZeroBased"])
                    for row in rows
                }
            ),
            "sourceFilesWithCandidates": len(
                {row["sourceFile"] for row in rows}
            ),
            "precedingVerbForms": dict(
                sorted(
                    Counter(
                        row["precedingVerb"]["word"]  # type: ignore[index]
                        for row in rows
                    ).items()
                )
            ),
            "precedingVerbHkcancorPos": dict(
                sorted(
                    Counter(
                        row["precedingVerb"]["pos"]  # type: ignore[index]
                        for row in rows
                    ).items()
                )
            ),
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
            "prefix": "aa62-",
            "anchorToken": "過",
        },
        "interpretationWarning": (
            "The V-POS + 過 adjacency query deliberately retains experiential, "
            "lexical/directional, goal, question, repair, boundary, and objectless "
            "candidates. Expert context review must determine AA62 membership and "
            "object boundaries. Counts do not establish evidence, productivity, "
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
        "preceding_verb_form",
        "preceding_verb_hkcancor_pos",
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
        preceding = row["precedingVerb"]
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
                "preceding_verb_form": preceding["word"],  # type: ignore[index]
                "preceding_verb_hkcancor_pos": preceding["pos"],  # type: ignore[index]
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
        candidate_id_prefix="aa62-",
        inventory_json="hkcancor-aa62-v-gwo-candidate-inventory.json",
        inventory_tsv="hkcancor-aa62-v-gwo-candidate-inventory.tsv",
        summary_json="hkcancor-aa62-v-gwo-query-summary.json",
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
        description="Generate or check the deterministic AA62 HKCanCor query.",
    )


if __name__ == "__main__":
    main()
