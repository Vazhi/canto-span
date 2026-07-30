#!/usr/bin/env python3
"""High-recall HKCanCor profile for attested repeated material near predicates.

The query is deliberately mechanical. It inventories either one token whose
written surface consists of two identical halves, or two exactly adjacent
lexical tokens with identical surfaces and a local predicate cue to their
right. It does not infer reduplication, tone change, manner, adverbial status,
constituency, lexicalization, productivity, or construction membership.
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

from hkcancor_workbench import Match, QueryProfile, WorkbenchContext, profile_cli  # noqa: E402


CONSTRUCTION = {
    "permanentCode": "AA84",
    "canonicalIdentity": "GamMarkedReduplicatedMannerVP",
    "legacyRuntimeLabel": "MannerAdverbialVP",
}
QUERY_ID = "HKCANCOR-AA84-BARE-REDUP-R1"
PROFILE_KEY = "aa84-bare-redup"
LOCAL_PREDICATE_WINDOW_LEXICAL = 5
PREDICATE_UD = {"ADJ", "AUX", "VERB"}


def safe_ud(pos: object) -> str:
    value = str(pos or "")
    if not value:
        return "X"
    try:
        return hkcancor_to_ud(value)
    except (KeyError, ValueError):
        return "X"


def is_lexical_token(token: object) -> bool:
    if str(token.pos) == "w":  # type: ignore[attr-defined]
        return False
    word = str(token.word)  # type: ignore[attr-defined]
    return bool(word) and any(
        unicodedata.category(character)[0] not in {"P", "S", "Z"}
        for character in word
    )


def token_record(token: object | None) -> dict[str, object] | None:
    if token is None:
        return None
    return {
        "word": str(token.word),  # type: ignore[attr-defined]
        "pos": str(token.pos),  # type: ignore[attr-defined]
        "jyutping": token.jyutping,  # type: ignore[attr-defined]
        "udPos": safe_ud(token.pos),  # type: ignore[attr-defined]
    }


def identical_halves(word: str) -> str | None:
    """Return the repeated written base for exact whole-token XX forms."""

    if len(word) < 2 or len(word) % 2:
        return None
    midpoint = len(word) // 2
    first = word[:midpoint]
    second = word[midpoint:]
    if not first or first != second:
        return None
    if not any(unicodedata.category(character)[0] in {"L", "N"} for character in first):
        return None
    return first


def following_lexical_indices(tokens: Sequence[object], start_index: int) -> list[int]:
    return [
        index
        for index in range(start_index, len(tokens))
        if is_lexical_token(tokens[index])
    ]


def local_predicate_candidate(
    tokens: Sequence[object], start_index: int
) -> tuple[dict[str, object] | None, int | None]:
    """Return the first broad predicate cue in a fixed lexical window."""

    lexical_distance = 0
    for index in range(start_index, len(tokens)):
        token = tokens[index]
        if not is_lexical_token(token):
            continue
        lexical_distance += 1
        if lexical_distance > LOCAL_PREDICATE_WINDOW_LEXICAL:
            break
        if safe_ud(token.pos) in PREDICATE_UD:  # type: ignore[attr-defined]
            record = token_record(token)
            assert record is not None
            return {"tokenIndexZeroBased": index, **record}, lexical_distance
    return None, None


def token_predicate(tokens: Sequence[object], token_index: int) -> Match | None:
    token = tokens[token_index]
    if not is_lexical_token(token):
        return None

    word = str(token.word)  # type: ignore[attr-defined]
    base = identical_halves(word)
    adjacent = False
    end_index = token_index + 1
    second_token: object | None = None

    if token_index + 1 < len(tokens):
        candidate = tokens[token_index + 1]
        if is_lexical_token(candidate) and str(candidate.word) == word:  # type: ignore[attr-defined]
            adjacent = True
            second_token = candidate
            end_index = token_index + 2

    if base is None and not adjacent:
        return None

    predicate, predicate_distance = local_predicate_candidate(tokens, end_index)
    # Internally repeated tokens are retained as the complete written XX inventory,
    # including no-host controls. Adjacent pairs are numerous speech repetitions and
    # are retained only when a local predicate cue makes them relevant to the runtime
    # collision question.
    if base is None and adjacent and predicate is None:
        return None

    if base is not None and adjacent:
        mode = "internal_token_plus_adjacent_pair"
    elif base is not None:
        mode = "internally_repeated_token"
    else:
        mode = "adjacent_identical_tokens"
        base = word

    preceding_lexical = [
        index for index in range(token_index) if is_lexical_token(tokens[index])
    ]
    following_lexical = following_lexical_indices(tokens, end_index)
    immediate_left = tokens[token_index - 1] if token_index > 0 else None
    immediate_right = tokens[end_index] if end_index < len(tokens) else None
    nearest_left = tokens[preceding_lexical[-1]] if preceding_lexical else None
    nearest_right = tokens[following_lexical[0]] if following_lexical else None
    matched_surface = "".join(str(item.word) for item in tokens[token_index:end_index])  # type: ignore[attr-defined]

    return Match(
        start_index=token_index,
        end_index_exclusive=end_index,
        id_token_index=token_index,
        matched_surface=matched_surface,
        id_namespace=f"{QUERY_ID}:{mode}",
        dedupe_key=f"{mode}:{token_index}:{end_index}",
        duplicate_group_inputs={
            "repetitionMode": mode,
            "baseSurface": base,
            "matchedSurface": matched_surface,
        },
        extra_fields={
            "repetitionMode": mode,
            "baseSurface": base,
            "firstToken": token_record(token),
            "secondToken": token_record(second_token),
            "matchedHkcancorTag": str(token.pos),  # type: ignore[attr-defined]
            "matchedUdTag": safe_ud(token.pos),  # type: ignore[attr-defined]
            "matchedJyutping": token.jyutping,  # type: ignore[attr-defined]
            "utteranceInitialLexical": not preceding_lexical,
            "precedingLexicalTokenCount": len(preceding_lexical),
            "followingLexicalTokenCount": len(following_lexical),
            "immediateLeftToken": token_record(immediate_left),
            "immediateRightToken": token_record(immediate_right),
            "nearestLeftLexicalToken": token_record(nearest_left),
            "nearestRightLexicalToken": token_record(nearest_right),
            "localPredicateCandidate": predicate,
            "hasLocalPredicateCandidate": predicate is not None,
            "predicateDistanceLexicalTokens": predicate_distance,
            "localPredicateWindowLexicalTokens": LOCAL_PREDICATE_WINDOW_LEXICAL,
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


def neighbor_value(row: dict[str, object], side: str, field: str, boundary: str) -> str:
    token = row[side]
    return str(token[field]) if token else boundary  # type: ignore[index]


def summary_builder(context: WorkbenchContext, rows: list[dict[str, object]]) -> dict[str, object]:
    source_hashes = dict(context.source_hashes)
    return {
        "checkpoint": QUERY_ID,
        "status": "COMPLETE_MECHANICAL_INVENTORY_REVIEW_REQUIRED",
        "construction": CONSTRUCTION,
        "endpoint": (
            "Every HKCanCor lexical token whose complete written form consists of two "
            "identical halves is retained. Two exactly adjacent lexical tokens with "
            "identical written forms are additionally retained when an ADJ/AUX/VERB cue "
            "occurs within the next five lexical tokens."
        ),
        "generatedWithPycantonese": context.pycantonese_version,
        "corpusName": "HKCanCor",
        "corpusFilesInDistribution": context.corpus.n_files,
        "corpusUtterancesInDistribution": len(context.corpus.utterances()),
        "corpusWordsInDistribution": len(context.corpus.words()),
        "hashes": {
            "verifiedCorpusDistributionSha256": corpus_distribution_sha256(source_hashes),
            "sourceManifestPath": context.source_manifest_path.as_posix(),
            "sourceManifestSha256": context.source_manifest_sha256,
            "sourceFileSha256ByName": dict(sorted(source_hashes.items())),
        },
        "query": {
            "selectionUnits": [
                "one lexical token with exact identical written halves",
                "two exactly adjacent lexical tokens with identical written forms",
            ],
            "adjacentPairsRequireLocalPredicateCue": True,
            "internalTokensRequireLocalPredicateCue": False,
            "localPredicateCueUdPos": sorted(PREDICATE_UD),
            "localPredicateWindowLexicalTokens": LOCAL_PREDICATE_WINDOW_LEXICAL,
            "punctuationCountsAsLexicalMaterial": False,
            "toneChangeInferred": False,
            "morphologicalAnalysisPerformed": False,
            "mannerAnalysisPerformed": False,
            "semanticSelectionPerformed": False,
        },
        "counts": {
            "candidateRows": len(rows),
            "candidateUtterances": len(
                {(row["sourceFile"], row["turnIndexZeroBased"]) for row in rows}
            ),
            "sourceFilesWithCandidates": len({row["sourceFile"] for row in rows}),
            "repetitionModes": counter_dict([row["repetitionMode"] for row in rows]),
            "baseSurfaces": counter_dict([row["baseSurface"] for row in rows]),
            "matchedHkcancorPos": counter_dict([row["matchedHkcancorTag"] for row in rows]),
            "matchedUdPos": counter_dict([row["matchedUdTag"] for row in rows]),
            "hasLocalPredicateCandidate": counter_dict(
                [row["hasLocalPredicateCandidate"] for row in rows]
            ),
            "predicateForms": counter_dict(
                [
                    row["localPredicateCandidate"]["word"]  # type: ignore[index]
                    if row["localPredicateCandidate"]
                    else "<NO_LOCAL_PREDICATE>"
                    for row in rows
                ]
            ),
            "matchedJyutping": counter_dict(
                [row["matchedJyutping"] or "<MISSING>" for row in rows]
            ),
            "sourceFileCandidateCounts": counter_dict([row["sourceFile"] for row in rows]),
        },
        "stableIdPolicy": {
            "namespace": f"{QUERY_ID}:<repetition-mode>",
            "prefix": "aa84br-",
            "anchorToken": "the first repeated token or internally repeated token at the frozen source location",
        },
        "interpretationWarning": (
            "The inventory deliberately retains manner candidates, temporal and frequency "
            "expressions, distributive classifiers, quantities, names, kin terms, lexicalized "
            "and expressive forms, event repetition, quotations, hesitation, repairs, and "
            "other false positives. Written equality and corpus counts do not establish "
            "reduplication, tone behavior, manner, productivity, status, or runtime validity."
        ),
    }


def render_tsv(rows: list[dict[str, object]]) -> str:
    fields = [
        "candidate_id", "source_file", "source_file_sha256", "file_index_zero_based",
        "turn_index_zero_based", "token_index_zero_based", "participant",
        "repetition_mode", "base_surface", "matched_surface_span",
        "matched_hkcancor_pos", "matched_ud_pos", "matched_jyutping",
        "second_token_form", "second_token_hkcancor_pos", "second_token_jyutping",
        "utterance_initial_lexical", "has_local_predicate_candidate",
        "predicate_distance_lexical_tokens", "local_predicate_form",
        "local_predicate_hkcancor_pos", "local_predicate_ud_pos",
        "local_predicate_jyutping", "local_predicate_token_index_zero_based",
        "immediate_left_form", "immediate_right_form", "nearest_left_lexical_form",
        "nearest_right_lexical_form", "text", "previous_text", "next_text",
        "duplicate_group_inputs_json", "tokens_json", "annotation_status",
    ]
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=fields, delimiter="\t", lineterminator="\n")
    writer.writeheader()
    for row in rows:
        context = row["localContext"]
        second = row["secondToken"]
        predicate = row["localPredicateCandidate"]
        writer.writerow({
            "candidate_id": row["candidateId"],
            "source_file": row["sourceFile"],
            "source_file_sha256": row["sourceFileSha256"],
            "file_index_zero_based": row["fileIndexZeroBased"],
            "turn_index_zero_based": row["turnIndexZeroBased"],
            "token_index_zero_based": row["tokenIndexZeroBased"],
            "participant": row["participant"],
            "repetition_mode": row["repetitionMode"],
            "base_surface": row["baseSurface"],
            "matched_surface_span": row["matchedSurfaceSpan"],
            "matched_hkcancor_pos": row["matchedHkcancorTag"],
            "matched_ud_pos": row["matchedUdTag"],
            "matched_jyutping": row["matchedJyutping"] or "",
            "second_token_form": second["word"] if second else "",  # type: ignore[index]
            "second_token_hkcancor_pos": second["pos"] if second else "",  # type: ignore[index]
            "second_token_jyutping": second["jyutping"] if second else "",  # type: ignore[index]
            "utterance_initial_lexical": row["utteranceInitialLexical"],
            "has_local_predicate_candidate": row["hasLocalPredicateCandidate"],
            "predicate_distance_lexical_tokens": row["predicateDistanceLexicalTokens"] or "",
            "local_predicate_form": predicate["word"] if predicate else "",  # type: ignore[index]
            "local_predicate_hkcancor_pos": predicate["pos"] if predicate else "",  # type: ignore[index]
            "local_predicate_ud_pos": predicate["udPos"] if predicate else "",  # type: ignore[index]
            "local_predicate_jyutping": predicate["jyutping"] if predicate else "",  # type: ignore[index]
            "local_predicate_token_index_zero_based": predicate["tokenIndexZeroBased"] if predicate else "",  # type: ignore[index]
            "immediate_left_form": neighbor_value(row, "immediateLeftToken", "word", "<UTTERANCE_START>"),
            "immediate_right_form": neighbor_value(row, "immediateRightToken", "word", "<UTTERANCE_END>"),
            "nearest_left_lexical_form": neighbor_value(row, "nearestLeftLexicalToken", "word", "<UTTERANCE_START>"),
            "nearest_right_lexical_form": neighbor_value(row, "nearestRightLexicalToken", "word", "<UTTERANCE_END>"),
            "text": row["text"],
            "previous_text": context["previous"]["text"] if context["previous"] else "",  # type: ignore[index]
            "next_text": context["next"]["text"] if context["next"] else "",  # type: ignore[index]
            "duplicate_group_inputs_json": json.dumps(
                row["duplicateGroupInputs"], ensure_ascii=False, separators=(",", ":")
            ),
            "tokens_json": json.dumps(row["tokens"], ensure_ascii=False, separators=(",", ":")),
            "annotation_status": row["annotationStatus"],
        })
    return output.getvalue()


QUERY_PROFILES = {
    PROFILE_KEY: QueryProfile(
        query_id=QUERY_ID,
        candidate_id_namespace=QUERY_ID,
        candidate_id_prefix="aa84br-",
        inventory_json="hkcancor-aa84-bare-redup-candidate-inventory.json",
        inventory_tsv="hkcancor-aa84-bare-redup-candidate-inventory.tsv",
        summary_json="hkcancor-aa84-bare-redup-query-summary.json",
        construction=CONSTRUCTION,
        token_predicate=token_predicate,
        summary_builder=summary_builder,
        context_before_tokens=8,
        context_after_tokens=10,
        tsv_renderer=render_tsv,
    )
}


def main() -> None:
    profile_cli(
        QUERY_PROFILES,
        profile_argument="--profile",
        description="Generate or check the deterministic AA84 bare-reduplication HKCanCor query.",
    )


if __name__ == "__main__":
    main()
