#!/usr/bin/env python3
"""AA07 high-recall HKCanCor profile for 嘅 plus a nominal head.

The query inventories token adjacency only. It does not infer the modifier
boundary, classify construction membership, or change evidence/readiness state.
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
    "constructionUuid": "1087ebec-c012-5107-9c1f-6383bf40091c",
    "permanentCode": "AA07",
    "canonicalIdentity": "GeMarkedNominalModifierNP",
    "legacyRuntimeLabel": "AssociativeNP",
}
QUERY_ID = "AA07-HKCANCOR-GE-NOMINAL-HEAD-R1"
NOMINAL_UD_POS = frozenset({"NOUN", "PROPN"})
PROFILE_KEY = "ge-nominal-head"


def token_record(token: object) -> dict[str, str]:
    return {
        "word": token.word,  # type: ignore[attr-defined]
        "pos": token.pos,  # type: ignore[attr-defined]
        "jyutping": token.jyutping,  # type: ignore[attr-defined]
    }


def token_predicate(tokens: Sequence[object], token_index: int) -> Match | None:
    token = tokens[token_index]
    if token.word != "嘅" or token_index + 1 >= len(tokens):  # type: ignore[attr-defined]
        return None
    following = tokens[token_index + 1]
    following_ud_pos = hkcancor_to_ud(following.pos)  # type: ignore[attr-defined]
    if following_ud_pos not in NOMINAL_UD_POS:
        return None
    preceding = tokens[token_index - 1] if token_index > 0 else None
    return Match(
        start_index=token_index,
        end_index_exclusive=token_index + 2,
        id_token_index=token_index,
        matched_surface=token.word + following.word,  # type: ignore[attr-defined]
        extra_fields={
            "precedingToken": token_record(preceding) if preceding else None,
            "followingNominalToken": {
                **token_record(following),
                "udPos": following_ud_pos,
            },
        },
    )


def corpus_distribution_sha256(source_hashes: dict[str, str]) -> str:
    payload = "".join(
        f"{digest}  {filename}\n"
        for filename, digest in sorted(source_hashes.items())
    )
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def summary_builder(
    context: WorkbenchContext, rows: list[dict[str, object]]
) -> dict[str, object]:
    corpus = context.corpus
    preceding_pos = Counter(
        (
            row["precedingToken"]["pos"]  # type: ignore[index]
            if row["precedingToken"]
            else "<UTTERANCE_START>"
        )
        for row in rows
    )
    preceding_forms = Counter(
        (
            row["precedingToken"]["word"]  # type: ignore[index]
            if row["precedingToken"]
            else "<UTTERANCE_START>"
        )
        for row in rows
    )
    following_tags = Counter(
        row["followingNominalToken"]["pos"]  # type: ignore[index]
        for row in rows
    )
    following_forms = Counter(
        row["followingNominalToken"]["word"]  # type: ignore[index]
        for row in rows
    )
    source_hashes = dict(context.source_hashes)
    return {
        "checkpoint": QUERY_ID,
        "status": "COMPLETE_MECHANICAL_INVENTORY_REVIEW_REQUIRED",
        "construction": CONSTRUCTION,
        "endpoint": (
            "Every exact HKCanCor 嘅 token whose immediately following token maps "
            "through PyCantonese's HKCanCor-to-UD mapping to NOUN or PROPN in the "
            "frozen distribution is inventoried and accounted for here."
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
            "exactMarkerToken": "嘅",
            "followingUdPosAllowlist": sorted(NOMINAL_UD_POS),
            "selectionUnit": "token adjacency within one HKCanCor utterance",
            "leftPosRestricted": False,
            "fullModifierBoundaryInferred": False,
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
            "precedingHkcancorPos": dict(sorted(preceding_pos.items())),
            "precedingForms": dict(sorted(preceding_forms.items())),
            "followingHkcancorTags": dict(sorted(following_tags.items())),
            "followingForms": dict(sorted(following_forms.items())),
        },
        "stableIdPolicy": {
            "namespace": QUERY_ID,
            "prefix": "aa07-",
            "anchorToken": "嘅",
        },
        "interpretationWarning": (
            "嘅 plus nominal-head token adjacency is a high-recall candidate query "
            "only. Expert context review must determine construction membership "
            "and any full modifier boundary. Counts do not establish evidence, "
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
        "preceding_form",
        "preceding_hkcancor_pos",
        "following_form",
        "following_hkcancor_pos",
        "following_ud_pos",
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
        preceding = row["precedingToken"]
        following = row["followingNominalToken"]
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
                "preceding_form": preceding["word"] if preceding else "",
                "preceding_hkcancor_pos": preceding["pos"] if preceding else "",
                "following_form": following["word"],  # type: ignore[index]
                "following_hkcancor_pos": following["pos"],  # type: ignore[index]
                "following_ud_pos": following["udPos"],  # type: ignore[index]
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
        candidate_id_prefix="aa07-",
        inventory_json=(
            "hkcancor-aa07-ge-nominal-head-candidate-inventory.json"
        ),
        inventory_tsv=(
            "hkcancor-aa07-ge-nominal-head-candidate-inventory.tsv"
        ),
        summary_json="hkcancor-aa07-ge-nominal-head-query-summary.json",
        construction=CONSTRUCTION,
        token_predicate=token_predicate,
        summary_builder=summary_builder,
        context_before_tokens=6,
        context_after_tokens=3,
        tsv_renderer=render_tsv,
    )
}


def main() -> None:
    profile_cli(
        QUERY_PROFILES,
        profile_argument="--profile",
        description="Generate or check the deterministic AA07 HKCanCor query.",
    )


if __name__ == "__main__":
    main()
