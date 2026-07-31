#!/usr/bin/env python3
"""High-recall HKCanCor profile for 有／冇 followed by nominal-start material.

The query is deliberately mechanical. It does not infer an existential,
presentational, possessive, locative, quantificational, subject, pivot, or
predicate analysis. All retained rows require expert context review.
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
    "permanentCode": "AA56",
    "canonicalIdentity": "ExistentialPresentationalClause",
    "legacyRuntimeLabel": "ExistentialPresentationalClause",
}
QUERY_ID = "HKCANCOR-AA56-NOPLACE-R1"
PROFILE_KEY = "aa56-no-place"
TARGET_FORMS = ("有", "冇")
NOMINAL_START_UD = {"DET", "NOUN", "NUM", "PRON", "PROPN"}


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
    return any(
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


def nominal_start(token: object) -> bool:
    """Return true for a broad token-level nominal-start cue."""

    pos = str(token.pos)  # type: ignore[attr-defined]
    ud = safe_ud(pos)
    if ud in NOMINAL_START_UD:
        return True
    # HKCanCor classifier and nominal tags are not fully uniform across files.
    return pos.startswith(("n", "q", "m", "r"))


def later_predicate_candidate(tokens: Sequence[object], start_index: int) -> dict[str, object] | None:
    """Record, but do not require, the first later verbal/adjectival cue."""

    for index in range(start_index, len(tokens)):
        token = tokens[index]
        if not is_lexical_token(token):
            continue
        ud = safe_ud(token.pos)  # type: ignore[attr-defined]
        if ud in {"ADJ", "AUX", "VERB"}:
            record = token_record(token)
            assert record is not None
            return {"tokenIndexZeroBased": index, **record}
    return None


def token_predicate(tokens: Sequence[object], token_index: int) -> Match | None:
    token = tokens[token_index]
    word = str(token.word)  # type: ignore[attr-defined]
    if word not in TARGET_FORMS:
        return None

    following_lexical_indices = [
        index
        for index in range(token_index + 1, len(tokens))
        if is_lexical_token(tokens[index])
    ]
    if not following_lexical_indices:
        return None

    first_right_index = following_lexical_indices[0]
    first_right = tokens[first_right_index]
    if not nominal_start(first_right):
        return None

    preceding_lexical_indices = [
        index for index in range(token_index) if is_lexical_token(tokens[index])
    ]
    immediate_left = tokens[token_index - 1] if token_index > 0 else None
    immediate_right = tokens[token_index + 1] if token_index + 1 < len(tokens) else None
    nearest_left = tokens[preceding_lexical_indices[-1]] if preceding_lexical_indices else None
    predicate_candidate = later_predicate_candidate(tokens, first_right_index + 1)

    return Match(
        start_index=token_index,
        end_index_exclusive=token_index + 1,
        id_token_index=token_index,
        matched_surface=word,
        duplicate_group_inputs={
            "matchedForm": word,
            "nominalStartForm": str(first_right.word),  # type: ignore[attr-defined]
            "nominalStartPos": str(first_right.pos),  # type: ignore[attr-defined]
        },
        extra_fields={
            "matchedForm": word,
            "matchedHkcancorTag": str(token.pos),  # type: ignore[attr-defined]
            "matchedUdTag": safe_ud(token.pos),  # type: ignore[attr-defined]
            "utteranceInitialLexical": not preceding_lexical_indices,
            "distanceFromUtteranceStartTokens": token_index,
            "precedingLexicalTokenCount": len(preceding_lexical_indices),
            "followingLexicalTokenCount": len(following_lexical_indices),
            "precedingMaterialTokens": [token_record(item) for item in tokens[:token_index]],
            "immediateLeftToken": token_record(immediate_left),
            "immediateRightToken": token_record(immediate_right),
            "nearestLeftLexicalToken": token_record(nearest_left),
            "nearestRightLexicalToken": token_record(first_right),
            "nominalStartTokenIndexZeroBased": first_right_index,
            "nominalStartToken": token_record(first_right),
            "laterPredicateCandidate": predicate_candidate,
            "hasLaterPredicateCandidate": predicate_candidate is not None,
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
    matched_forms = Counter({form: 0 for form in TARGET_FORMS})
    matched_forms.update(str(row["matchedForm"]) for row in rows)
    return {
        "checkpoint": QUERY_ID,
        "status": "COMPLETE_MECHANICAL_INVENTORY_REVIEW_REQUIRED",
        "construction": CONSTRUCTION,
        "endpoint": (
            "Every exact HKCanCor 有 or 冇 token whose first following lexical token "
            "has a broad nominal-start POS cue is inventoried, including utterance-initial "
            "and noninitial positions."
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
            "surfaceForms": list(TARGET_FORMS),
            "selectionUnit": "exact token within one utterance",
            "requiresFollowingLexicalToken": True,
            "requiresNominalStartCue": True,
            "includesUtteranceInitial": True,
            "includesNoninitial": True,
            "requiresLaterPredicate": False,
            "punctuationCountsAsLexicalMaterial": False,
            "placeLexiconRestricted": False,
            "subjectOrTopicAnalysisPerformed": False,
            "existentialOrPossessiveAnalysisPerformed": False,
            "semanticSelectionPerformed": False,
        },
        "counts": {
            "candidateTokens": len(rows),
            "candidateUtterances": len({(row["sourceFile"], row["turnIndexZeroBased"]) for row in rows}),
            "sourceFilesWithCandidates": len({row["sourceFile"] for row in rows}),
            "matchedSurfaceForms": dict(sorted(matched_forms.items())),
            "utteranceInitialLexical": counter_dict([row["utteranceInitialLexical"] for row in rows]),
            "hasLaterPredicateCandidate": counter_dict([row["hasLaterPredicateCandidate"] for row in rows]),
            "nominalStartForms": counter_dict([row["nominalStartToken"]["word"] for row in rows]),  # type: ignore[index]
            "nominalStartHkcancorPos": counter_dict([row["nominalStartToken"]["pos"] for row in rows]),  # type: ignore[index]
            "nominalStartUdPos": counter_dict([row["nominalStartToken"]["udPos"] for row in rows]),  # type: ignore[index]
            "nearestLeftLexicalForms": counter_dict([
                neighbor_value(row, "nearestLeftLexicalToken", "word", "<UTTERANCE_START>")
                for row in rows
            ]),
            "sourceFileCandidateCounts": counter_dict([row["sourceFile"] for row in rows]),
        },
        "stableIdPolicy": {
            "namespace": QUERY_ID,
            "prefix": "aa56-",
            "anchorToken": "the exact 有 or 冇 token at the frozen source location",
        },
        "interpretationWarning": (
            "The inventory deliberately retains possession, overt-place existence, "
            "participant presentation, embedded complements, negative-human clauses, "
            "relative material, quotations, repairs, and false positives. Counts do not "
            "establish construction membership, productivity, status, or runtime behavior."
        ),
    }


def render_tsv(rows: list[dict[str, object]]) -> str:
    fields = [
        "candidate_id", "source_file", "source_file_sha256", "file_index_zero_based",
        "turn_index_zero_based", "token_index_zero_based", "participant",
        "matched_surface_span", "matched_form", "matched_hkcancor_pos", "matched_ud_pos",
        "utterance_initial_lexical", "preceding_lexical_token_count",
        "following_lexical_token_count", "immediate_left_form", "immediate_left_ud_pos",
        "nominal_start_form", "nominal_start_hkcancor_pos", "nominal_start_ud_pos",
        "nominal_start_token_index_zero_based", "has_later_predicate_candidate",
        "later_predicate_form", "later_predicate_ud_pos", "later_predicate_token_index_zero_based",
        "text", "previous_text", "next_text", "preceding_material_tokens_json",
        "duplicate_group_inputs_json", "tokens_json", "annotation_status",
    ]
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=fields, delimiter="\t", lineterminator="\n")
    writer.writeheader()
    for row in rows:
        context = row["localContext"]
        left = row["immediateLeftToken"]
        nominal = row["nominalStartToken"]
        predicate = row["laterPredicateCandidate"]
        writer.writerow({
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
            "utterance_initial_lexical": row["utteranceInitialLexical"],
            "preceding_lexical_token_count": row["precedingLexicalTokenCount"],
            "following_lexical_token_count": row["followingLexicalTokenCount"],
            "immediate_left_form": left["word"] if left else "",
            "immediate_left_ud_pos": left["udPos"] if left else "",
            "nominal_start_form": nominal["word"],
            "nominal_start_hkcancor_pos": nominal["pos"],
            "nominal_start_ud_pos": nominal["udPos"],
            "nominal_start_token_index_zero_based": row["nominalStartTokenIndexZeroBased"],
            "has_later_predicate_candidate": row["hasLaterPredicateCandidate"],
            "later_predicate_form": predicate["word"] if predicate else "",
            "later_predicate_ud_pos": predicate["udPos"] if predicate else "",
            "later_predicate_token_index_zero_based": predicate["tokenIndexZeroBased"] if predicate else "",
            "text": row["text"],
            "previous_text": context["previous"]["text"] if context["previous"] else "",  # type: ignore[index]
            "next_text": context["next"]["text"] if context["next"] else "",  # type: ignore[index]
            "preceding_material_tokens_json": json.dumps(row["precedingMaterialTokens"], ensure_ascii=False, separators=(",", ":")),
            "duplicate_group_inputs_json": json.dumps(row["duplicateGroupInputs"], ensure_ascii=False, separators=(",", ":")),
            "tokens_json": json.dumps(row["tokens"], ensure_ascii=False, separators=(",", ":")),
            "annotation_status": row["annotationStatus"],
        })
    return output.getvalue()


QUERY_PROFILES = {
    PROFILE_KEY: QueryProfile(
        query_id=QUERY_ID,
        candidate_id_namespace=QUERY_ID,
        candidate_id_prefix="aa56-",
        inventory_json="hkcancor-aa56-no-place-candidate-inventory.json",
        inventory_tsv="hkcancor-aa56-no-place-candidate-inventory.tsv",
        summary_json="hkcancor-aa56-no-place-query-summary.json",
        construction=CONSTRUCTION,
        token_predicate=token_predicate,
        summary_builder=summary_builder,
        context_before_tokens=10,
        context_after_tokens=12,
        tsv_renderer=render_tsv,
    )
}


def main() -> None:
    profile_cli(
        QUERY_PROFILES,
        profile_argument="--profile",
        description="Generate or check the deterministic AA56 no-place HKCanCor query.",
    )


if __name__ == "__main__":
    main()
