#!/usr/bin/env python3
"""High-recall marker-centered HKCanCor profile for canonical AA84 evidence.

The query starts from written 咁/噉 tokens, looks left within a fixed contiguous
lexical window for mechanically detectable repeated material, and looks right
within a fixed lexical window for a broad predicate cue. It does not infer
manner, reduplication, marker function, VP constituency, productivity, or AA84
membership. Written glyph and corpus Jyutping are preserved independently.
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
QUERY_ID = "HKCANCOR-AA84-MARKED-REDUP-R1"
PROFILE_KEY = "aa84-marked-redup"
MARKERS = frozenset({"咁", "噉"})
LEFT_WINDOW_LEXICAL = 3
RIGHT_WINDOW_LEXICAL = 3
PREDICATE_UD = frozenset({"ADJ", "AUX", "VERB"})


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


def exact_halves(word: str) -> str | None:
    if len(word) < 2 or len(word) % 2:
        return None
    midpoint = len(word) // 2
    first, second = word[:midpoint], word[midpoint:]
    return first if first and first == second else None


def aabb_shape(word: str) -> tuple[str, str] | None:
    if len(word) != 4:
        return None
    if word[0] == word[1] and word[2] == word[3] and word[0] != word[2]:
        return word[0], word[2]
    return None


def repeated_prefix(word: str) -> tuple[str, str] | None:
    """Return repeated prefix and tail for XXY/ABABY-like written forms."""
    for width in range(1, len(word) // 2 + 1):
        first = word[:width]
        second = word[width : width * 2]
        tail = word[width * 2 :]
        if first and first == second and tail:
            return first, tail
    return None


def repetition_shape(word: str) -> tuple[str, dict[str, object]] | None:
    halves = exact_halves(word)
    if halves is not None:
        return "exact_halves_token", {"baseSurface": halves}
    aabb = aabb_shape(word)
    if aabb is not None:
        return "aabb_token", {"aabbBases": list(aabb)}
    prefix = repeated_prefix(word)
    if prefix is not None:
        base, tail = prefix
        return "repeated_prefix_token", {"baseSurface": base, "suffixSurface": tail}
    return None


def contiguous_left_indices(tokens: Sequence[object], marker_index: int) -> list[int]:
    indices: list[int] = []
    index = marker_index - 1
    while index >= 0 and len(indices) < LEFT_WINDOW_LEXICAL:
        token = tokens[index]
        if not is_lexical_token(token):
            break
        indices.append(index)
        index -= 1
    indices.reverse()
    return indices


def repeated_cue(tokens: Sequence[object], marker_index: int) -> dict[str, object] | None:
    left = contiguous_left_indices(tokens, marker_index)
    if not left:
        return None

    # Prefer the cue closest to the marker while retaining the complete bounded
    # span from that cue through any intervening lexical material.
    for index in reversed(left):
        word = str(tokens[index].word)  # type: ignore[attr-defined]
        shape = repetition_shape(word)
        if shape is not None:
            shape_name, details = shape
            return {
                "shape": shape_name,
                "startIndex": index,
                "endIndexExclusive": index + 1,
                "surface": word,
                "leftLexicalDistanceToMarker": marker_index - index,
                **details,
            }

    # Tokenized AA repetition: two exactly adjacent lexical tokens.
    for right_pos in range(len(left) - 1, 0, -1):
        first_index, second_index = left[right_pos - 1], left[right_pos]
        first = str(tokens[first_index].word)  # type: ignore[attr-defined]
        second = str(tokens[second_index].word)  # type: ignore[attr-defined]
        if first and first == second and second_index == first_index + 1:
            return {
                "shape": "adjacent_identical_tokens",
                "startIndex": first_index,
                "endIndexExclusive": second_index + 1,
                "surface": first + second,
                "baseSurface": first,
                "leftLexicalDistanceToMarker": marker_index - first_index,
            }
    return None


def predicate_cue(tokens: Sequence[object], marker_index: int) -> dict[str, object] | None:
    lexical_distance = 0
    for index in range(marker_index + 1, len(tokens)):
        token = tokens[index]
        if not is_lexical_token(token):
            break
        lexical_distance += 1
        if lexical_distance > RIGHT_WINDOW_LEXICAL:
            break
        if safe_ud(token.pos) in PREDICATE_UD:  # type: ignore[attr-defined]
            record = token_record(token)
            assert record is not None
            return {
                "tokenIndexZeroBased": index,
                "rightLexicalDistanceFromMarker": lexical_distance,
                **record,
            }
    return None


def token_predicate(tokens: Sequence[object], token_index: int) -> Match | None:
    marker = tokens[token_index]
    marker_word = str(marker.word)  # type: ignore[attr-defined]
    if marker_word not in MARKERS or not is_lexical_token(marker):
        return None

    repetition = repeated_cue(tokens, token_index)
    if repetition is None:
        return None
    predicate = predicate_cue(tokens, token_index)
    if predicate is None:
        return None

    start = int(repetition["startIndex"])
    end = int(predicate["tokenIndexZeroBased"]) + 1
    surface = "".join(str(item.word) for item in tokens[start:end])  # type: ignore[attr-defined]
    intervening_left = [
        token_record(tokens[index])
        for index in range(int(repetition["endIndexExclusive"]), token_index)
    ]
    intervening_right = [
        token_record(tokens[index])
        for index in range(token_index + 1, int(predicate["tokenIndexZeroBased"]))
    ]

    return Match(
        start_index=start,
        end_index_exclusive=end,
        id_token_index=token_index,
        matched_surface=surface,
        id_namespace=f"{QUERY_ID}:{repetition['shape']}:{marker_word}",
        dedupe_key=f"marker:{token_index}",
        duplicate_group_inputs={
            "repetitionShape": repetition["shape"],
            "repeatedSurface": repetition["surface"],
            "markerSurface": marker_word,
            "predicateSurface": predicate["word"],
        },
        extra_fields={
            "repetitionShape": repetition["shape"],
            "repeatedSurface": repetition["surface"],
            "baseSurface": repetition.get("baseSurface"),
            "suffixSurface": repetition.get("suffixSurface"),
            "aabbBases": repetition.get("aabbBases"),
            "repetitionStartIndexZeroBased": start,
            "repetitionEndIndexExclusive": repetition["endIndexExclusive"],
            "leftLexicalDistanceToMarker": repetition["leftLexicalDistanceToMarker"],
            "markerToken": token_record(marker),
            "markerSurface": marker_word,
            "markerJyutping": marker.jyutping,  # type: ignore[attr-defined]
            "markerHkcancorPos": str(marker.pos),  # type: ignore[attr-defined]
            "markerUdPos": safe_ud(marker.pos),  # type: ignore[attr-defined]
            "predicateCandidate": predicate,
            "rightLexicalDistanceFromMarker": predicate["rightLexicalDistanceFromMarker"],
            "interveningLeftTokens": intervening_left,
            "interveningRightTokens": intervening_right,
            "mechanicallyAdjacentModifierMarker": int(repetition["endIndexExclusive"]) == token_index,
            "mechanicallyAdjacentMarkerPredicate": int(predicate["tokenIndexZeroBased"]) == token_index + 1,
            "leftWindowLexicalTokens": LEFT_WINDOW_LEXICAL,
            "rightWindowLexicalTokens": RIGHT_WINDOW_LEXICAL,
        },
    )


def corpus_distribution_sha256(source_hashes: dict[str, str]) -> str:
    payload = "".join(f"{digest}  {filename}\n" for filename, digest in sorted(source_hashes.items()))
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def counter(values: Sequence[object]) -> dict[str, int]:
    return dict(sorted(Counter(str(value) for value in values).items()))


def summary_builder(context: WorkbenchContext, rows: list[dict[str, object]]) -> dict[str, object]:
    source_hashes = dict(context.source_hashes)
    return {
        "checkpoint": QUERY_ID,
        "status": "COMPLETE_MECHANICAL_INVENTORY_REVIEW_REQUIRED",
        "construction": CONSTRUCTION,
        "endpoint": (
            "Written 咁/噉 markers with mechanically detectable repeated material within the "
            "preceding three contiguous lexical tokens and an ADJ/AUX/VERB cue within the "
            "following three contiguous lexical tokens."
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
            "markerWrittenForms": sorted(MARKERS),
            "leftWindowLexicalTokens": LEFT_WINDOW_LEXICAL,
            "rightWindowLexicalTokens": RIGHT_WINDOW_LEXICAL,
            "predicateCueUdPos": sorted(PREDICATE_UD),
            "repetitionShapes": ["exact_halves_token", "aabb_token", "repeated_prefix_token", "adjacent_identical_tokens"],
            "markerFunctionInferred": False,
            "markerPronunciationInferredFromGlyph": False,
            "reduplicationAnalysisPerformed": False,
            "mannerAnalysisPerformed": False,
            "vpConstituencyInferred": False,
            "productivityInferred": False,
        },
        "counts": {
            "candidateRows": len(rows),
            "candidateUtterances": len({(row["sourceFile"], row["turnIndexZeroBased"]) for row in rows}),
            "sourceFilesWithCandidates": len({row["sourceFile"] for row in rows}),
            "repetitionShapes": counter([row["repetitionShape"] for row in rows]),
            "markerSurfaces": counter([row["markerSurface"] for row in rows]),
            "markerJyutping": counter([row["markerJyutping"] or "<MISSING>" for row in rows]),
            "markerHkcancorPos": counter([row["markerHkcancorPos"] for row in rows]),
            "predicateForms": counter([row["predicateCandidate"]["word"] for row in rows]),
            "leftDistances": counter([row["leftLexicalDistanceToMarker"] for row in rows]),
            "rightDistances": counter([row["rightLexicalDistanceFromMarker"] for row in rows]),
            "sourceFileCandidateCounts": counter([row["sourceFile"] for row in rows]),
        },
        "stableIdPolicy": {
            "namespace": f"{QUERY_ID}:<repetition-shape>:<marker-glyph>",
            "prefix": "aa84gm-",
            "anchorToken": "the written 咁/噉 marker at the frozen source location",
        },
        "interpretationWarning": (
            "Candidates may include temporal/distributive repetition, degree uses of 咁, "
            "demonstrative or discourse 噉, event repetition, lexicalized repeated forms, "
            "repairs, and orthographic/pronunciation collisions. Extraction does not establish "
            "AA84 membership, manner, reduplication, productivity, or status."
        ),
    }


def render_tsv(rows: list[dict[str, object]]) -> str:
    fields = [
        "candidate_id", "source_file", "source_file_sha256", "turn_index_zero_based",
        "token_index_zero_based", "participant", "repetition_shape", "repeated_surface",
        "base_surface", "suffix_surface", "marker_surface", "marker_jyutping",
        "marker_hkcancor_pos", "marker_ud_pos", "left_lexical_distance_to_marker",
        "predicate_surface", "predicate_pos", "predicate_ud_pos", "predicate_jyutping",
        "right_lexical_distance_from_marker", "adjacent_modifier_marker",
        "adjacent_marker_predicate", "intervening_left_tokens_json",
        "intervening_right_tokens_json", "matched_surface_span", "text", "previous_text",
        "next_text", "tokens_json", "annotation_status",
    ]
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=fields, delimiter="\t", lineterminator="\n")
    writer.writeheader()
    for row in rows:
        context = row["localContext"]
        predicate = row["predicateCandidate"]
        writer.writerow({
            "candidate_id": row["candidateId"],
            "source_file": row["sourceFile"],
            "source_file_sha256": row["sourceFileSha256"],
            "turn_index_zero_based": row["turnIndexZeroBased"],
            "token_index_zero_based": row["tokenIndexZeroBased"],
            "participant": row["participant"],
            "repetition_shape": row["repetitionShape"],
            "repeated_surface": row["repeatedSurface"],
            "base_surface": row["baseSurface"] or "",
            "suffix_surface": row["suffixSurface"] or "",
            "marker_surface": row["markerSurface"],
            "marker_jyutping": row["markerJyutping"] or "",
            "marker_hkcancor_pos": row["markerHkcancorPos"],
            "marker_ud_pos": row["markerUdPos"],
            "left_lexical_distance_to_marker": row["leftLexicalDistanceToMarker"],
            "predicate_surface": predicate["word"],
            "predicate_pos": predicate["pos"],
            "predicate_ud_pos": predicate["udPos"],
            "predicate_jyutping": predicate["jyutping"] or "",
            "right_lexical_distance_from_marker": row["rightLexicalDistanceFromMarker"],
            "adjacent_modifier_marker": row["mechanicallyAdjacentModifierMarker"],
            "adjacent_marker_predicate": row["mechanicallyAdjacentMarkerPredicate"],
            "intervening_left_tokens_json": json.dumps(row["interveningLeftTokens"], ensure_ascii=False, separators=(",", ":")),
            "intervening_right_tokens_json": json.dumps(row["interveningRightTokens"], ensure_ascii=False, separators=(",", ":")),
            "matched_surface_span": row["matchedSurfaceSpan"],
            "text": row["text"],
            "previous_text": context["previous"]["text"] if context["previous"] else "",
            "next_text": context["next"]["text"] if context["next"] else "",
            "tokens_json": json.dumps(row["tokens"], ensure_ascii=False, separators=(",", ":")),
            "annotation_status": row["annotationStatus"],
        })
    return output.getvalue()


QUERY_PROFILES = {
    PROFILE_KEY: QueryProfile(
        query_id=QUERY_ID,
        candidate_id_namespace=QUERY_ID,
        candidate_id_prefix="aa84gm-",
        inventory_json="hkcancor-aa84-marked-candidate-inventory.json",
        inventory_tsv="hkcancor-aa84-marked-candidate-inventory.tsv",
        summary_json="hkcancor-aa84-marked-query-summary.json",
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
        description="Generate or check deterministic AA84 marked-reduplication HKCanCor candidates.",
    )


if __name__ == "__main__":
    main()
