#!/usr/bin/env python3
"""AB30 profiles for the reusable deterministic HKCanCor workbench.

This is a token/POS retrieval and review-accounting tool. It does not treat
HKCanCor annotations, token adjacency, or frequency as a gold syntactic
analysis, a productivity result, or a readiness/status decision.
"""

from __future__ import annotations

import sys
from collections import Counter
from pathlib import Path
from typing import Sequence


ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools" / "corpus-review"))

from hkcancor_workbench import (  # noqa: E402
    Match,
    QueryProfile,
    WorkbenchContext,
    profile_cli,
)


CONSTRUCTION = {
    "constructionUuid": "2169217f-a21d-5165-9513-eb0edee2c220",
    "permanentCode": "AB30",
    "canonicalIdentity": "ZoMarkedPerfectiveObjectVP",
    "legacyRuntimeLabel": "PostverbalZoPerfectiveVP",
}
R_QUERY_ID = "AB30-HKCANCOR-V-ZO-R-R2"
M_QUERY_ID = "AB30-HKCANCOR-V-ZO-M-R1"
LEGACY_KEOI_QUERY_ID = "AB30-HKCANCOR-V-ZO-KEOI-R1"
PRECEDING_VERBAL_POS = {"v", "v1", "xv"}


def token_predicate(following_pos: str, query_id: str):
    def match(tokens: Sequence[object], token_index: int) -> Match | None:
        token = tokens[token_index]
        if not (
            token.word == "咗"
            and token_index > 0
            and token_index + 1 < len(tokens)
            and tokens[token_index - 1].pos in PRECEDING_VERBAL_POS
            and tokens[token_index + 1].pos == following_pos
        ):
            return None
        id_namespace = (
            LEGACY_KEOI_QUERY_ID
            if following_pos == "r" and tokens[token_index + 1].word == "佢"
            else query_id
        )
        return Match(
            start_index=token_index - 1,
            end_index_exclusive=token_index + 2,
            id_token_index=token_index,
            matched_surface="".join(
                item.word for item in tokens[token_index - 1 : token_index + 2]
            ),
            id_namespace=id_namespace,
        )

    return match


def summary_builder(following_pos: str, query_id: str):
    def build(
        context: WorkbenchContext, rows: list[dict[str, object]]
    ) -> dict[str, object]:
        corpus = context.corpus
        verb_counts = Counter(
            row["matchedTokens"][0]["word"]  # type: ignore[index]
            for row in rows
        )
        following_counts = Counter(
            row["matchedTokens"][2]["word"]  # type: ignore[index]
            for row in rows
        )
        return {
            "checkpoint": query_id,
            "status": "COMPLETE_MECHANICAL_INVENTORY_REVIEW_REQUIRED",
            "construction": CONSTRUCTION,
            "endpoint": (
                (
                    "Every exact HKCanCor token matching preceding POS v, v1, or xv + "
                    "咗 + following POS r is inventoried and must be accounted for in "
                    "the R2 decision ledger."
                )
                if following_pos == "r"
                else (
                    "Every exact HKCanCor token matching preceding POS v, v1, or xv + "
                    "咗 + following POS m is inventoried and must be accounted for in "
                    "the M-R1 decision ledger."
                )
            ),
            "generatedWithPycantonese": context.pycantonese_version,
            "corpusName": "HKCanCor",
            "corpusFilesInDistribution": corpus.n_files,
            "corpusUtterancesInDistribution": len(corpus.utterances()),
            "corpusWordsInDistribution": len(corpus.words()),
            "sourceAllowlist": {
                "path": context.source_manifest_path.as_posix(),
                "sha256": context.source_manifest_sha256,
                "files": corpus.n_files,
            },
            "query": {
                "exactMarkerToken": "咗",
                "precedingTokenPosAllowlist": sorted(PRECEDING_VERBAL_POS),
                "followingTokenPos": following_pos,
                "selectionUnit": "token adjacency within one HKCanCor utterance",
                "parserOutputConsulted": False,
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
                "precedingVerbForms": dict(sorted(verb_counts.items())),
                "followingForms": dict(sorted(following_counts.items())),
            },
            "stableIdPolicy": {
                **(
                    {
                        "currentNamespace": query_id,
                        "preservedNamespaceForExactFollowing佢": LEGACY_KEOI_QUERY_ID,
                        "reason": (
                            "The 27 exact-佢 candidates were reviewed in R1. Their "
                            "existing candidate IDs remain unchanged inside this "
                            "superseding R2 ledger."
                        ),
                    }
                    if following_pos == "r"
                    else {
                        "currentNamespace": query_id,
                        "reason": (
                            "The disjoint following-m profile uses its own query "
                            "namespace and does not alter R1 or R2 candidate IDs."
                        ),
                    }
                )
            },
            "interpretationWarning": (
                f"The POS tags and V-咗-{following_pos} adjacency define a high-recall comparison "
                "slice only. Expert context review must distinguish an overt object "
                "from a following clause subject, possessive-NP onset, repair, or "
                "other analysis. Counts do not establish productivity or readiness."
            ),
        }

    return build


QUERY_PROFILES = {
    following_pos: QueryProfile(
        query_id=query_id,
        candidate_id_namespace=query_id,
        candidate_id_prefix="ab30-",
        inventory_json=f"hkcancor-ab30-zo-{following_pos}-candidate-inventory.json",
        inventory_tsv=f"hkcancor-ab30-zo-{following_pos}-candidate-inventory.tsv",
        summary_json=f"hkcancor-ab30-zo-{following_pos}-query-summary.json",
        construction=CONSTRUCTION,
        token_predicate=token_predicate(following_pos, query_id),
        summary_builder=summary_builder(following_pos, query_id),
    )
    for following_pos, query_id in (("r", R_QUERY_ID), ("m", M_QUERY_ID))
}


def main() -> None:
    profile_cli(
        QUERY_PROFILES,
        profile_argument="--following-pos",
        description="Generate or check deterministic AB30 HKCanCor query slices.",
    )


if __name__ == "__main__":
    main()
