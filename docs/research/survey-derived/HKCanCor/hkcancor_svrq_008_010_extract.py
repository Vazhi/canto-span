#!/usr/bin/env python3
"""
Corpus-wide HKCanCor candidate extraction for Canto Span SV-RQ-008–SV-RQ-010.

Profiles:
- SV-RQ-008: V 完 咗 O and segmentation variants.
- SV-RQ-009: 咗 followed by postobject 喺/location or directional material.
- SV-RQ-010: 咗 followed by a 喇/啦/嘞-family final particle in the same clause.

This is deliberately high-recall candidate generation. Every candidate still
requires manual linguistic classification before it can count as evidence.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import platform
import re
import sys
from collections import Counter
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any, Iterable, Sequence

try:
    import pycantonese
except ImportError as exc:
    raise SystemExit(
        "PyCantonese is not installed.\n"
        "Run: python3 -m pip install 'pycantonese==5.0.0'"
    ) from exc


STRONG_PUNCTUATION = {
    ".", "?", "!", "。", "？", "！", ";", "；",
}
ALL_PUNCTUATION = STRONG_PUNCTUATION | {
    ",", "，", ":", "：", "、", "-", "—", "…",
    "(", ")", "（", "）", '"', "'", "“", "”", "‘", "’",
}
LAA_WORDS = {
    "喇", "啦", "嘞", "嚹", "𠸏", "𠻺",
}
DIRECTIONAL_WORDS = {
    "返", "入", "出", "上", "落", "過", "去", "嚟", "來",
    "到", "起", "開", "埋", "走",
}
NOMINAL_POS_PREFIXES = (
    "n", "r", "q", "m",
)


@dataclass(frozen=True)
class TokenRecord:
    word: str
    pos: str
    jyutping: str | None


@dataclass(frozen=True)
class Candidate:
    candidate_id: str
    research_question: str
    profile: str
    subtype: str
    corpus: str
    corpus_version: str
    file_name: str
    file_index: int
    utterance_index_in_file: int
    participant: str
    match_start_token: int
    match_end_token_exclusive: int
    matched_surface: str
    matched_segmented: str
    utterance_surface: str
    utterance_segmented: str
    previous_utterance: str
    next_utterance: str
    tokens: list[TokenRecord]
    extraction_note: str
    manual_classification: str = "unreviewed"
    reviewer_note: str = ""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("hkcancor-svrq-008-010-output"),
        help="Directory for JSON, JSONL, TSV, Markdown, and summary outputs.",
    )
    return parser.parse_args()


def token_record(token: Any) -> TokenRecord:
    return TokenRecord(
        word=str(getattr(token, "word", "") or ""),
        pos=str(getattr(token, "pos", "") or ""),
        jyutping=(
            str(getattr(token, "jyutping"))
            if getattr(token, "jyutping", None) is not None
            else None
        ),
    )


def is_punctuation(token: TokenRecord) -> bool:
    return token.word in ALL_PUNCTUATION or token.pos in {"w", "PUNCT"}


def is_strong_boundary(token: TokenRecord) -> bool:
    return token.word in STRONG_PUNCTUATION


def utterance_surface(tokens: Sequence[TokenRecord]) -> str:
    return "".join(token.word for token in tokens)


def utterance_segmented(tokens: Sequence[TokenRecord]) -> str:
    return " ".join(token.word for token in tokens)


def span_surface(tokens: Sequence[TokenRecord], start: int, end: int) -> str:
    return "".join(token.word for token in tokens[start:end])


def span_segmented(tokens: Sequence[TokenRecord], start: int, end: int) -> str:
    return " ".join(token.word for token in tokens[start:end])


def clause_end(tokens: Sequence[TokenRecord], start: int) -> int:
    """Return the exclusive end of the current punctuation-bounded clause."""
    for index in range(start, len(tokens)):
        if is_strong_boundary(tokens[index]):
            return index
    return len(tokens)


def bounded_context(
    tokens: Sequence[TokenRecord],
    start: int,
    end: int,
    left: int = 4,
    right: int = 8,
) -> tuple[int, int]:
    context_start = max(0, start - left)
    context_end = min(len(tokens), end + right)

    # Do not cross strong punctuation when expanding left.
    for index in range(start - 1, context_start - 1, -1):
        if is_strong_boundary(tokens[index]):
            context_start = index + 1
            break

    # Do not cross strong punctuation when expanding right.
    for index in range(end, context_end):
        if is_strong_boundary(tokens[index]):
            context_end = index
            break

    return context_start, context_end


def stable_id(
    *,
    research_question: str,
    profile: str,
    file_name: str,
    utterance_index: int,
    start: int,
    end: int,
    matched_segmented: str,
) -> str:
    payload = "\x1f".join(
        [
            research_question,
            profile,
            file_name,
            str(utterance_index),
            str(start),
            str(end),
            matched_segmented,
        ]
    )
    digest = hashlib.sha256(payload.encode("utf-8")).hexdigest()[:16]
    return f"HKC-{research_question}-{digest}"


def make_candidate(
    *,
    research_question: str,
    profile: str,
    subtype: str,
    file_name: str,
    file_index: int,
    utterance_index: int,
    participant: str,
    tokens: Sequence[TokenRecord],
    start: int,
    end: int,
    previous_utterance: str,
    next_utterance: str,
    extraction_note: str,
    corpus_version: str,
) -> Candidate:
    context_start, context_end = bounded_context(tokens, start, end)
    context_tokens = list(tokens[context_start:context_end])
    matched = span_segmented(tokens, start, end)
    candidate_id = stable_id(
        research_question=research_question,
        profile=profile,
        file_name=file_name,
        utterance_index=utterance_index,
        start=start,
        end=end,
        matched_segmented=matched,
    )
    return Candidate(
        candidate_id=candidate_id,
        research_question=research_question,
        profile=profile,
        subtype=subtype,
        corpus="HKCanCor",
        corpus_version=corpus_version,
        file_name=file_name,
        file_index=file_index,
        utterance_index_in_file=utterance_index,
        participant=participant,
        match_start_token=start,
        match_end_token_exclusive=end,
        matched_surface=span_surface(tokens, start, end),
        matched_segmented=matched,
        utterance_surface=utterance_surface(tokens),
        utterance_segmented=utterance_segmented(tokens),
        previous_utterance=previous_utterance,
        next_utterance=next_utterance,
        tokens=context_tokens,
        extraction_note=extraction_note,
    )


def extract_svrq008(
    *,
    tokens: Sequence[TokenRecord],
    **metadata: Any,
) -> list[Candidate]:
    candidates: list[Candidate] = []

    for index, token in enumerate(tokens):
        # Standard segmentation: V + 完 + 咗.
        if (
            token.word == "完"
            and index > 0
            and index + 1 < len(tokens)
            and tokens[index + 1].word == "咗"
            and not is_punctuation(tokens[index - 1])
        ):
            start = index - 1
            end = min(clause_end(tokens, index + 2), index + 7)
            candidates.append(
                make_candidate(
                    research_question="SV-RQ-008",
                    profile="V_WAN_ZO",
                    subtype="separate_tokens",
                    tokens=tokens,
                    start=start,
                    end=end,
                    extraction_note=(
                        "High-recall V + 完 + 咗 candidate. Material following 咗 "
                        "is retained for manual object/complement classification."
                    ),
                    **metadata,
                )
            )

        # Segmentation variant: a word ending in 完 immediately followed by 咗.
        if (
            token.word != "完"
            and token.word.endswith("完")
            and index + 1 < len(tokens)
            and tokens[index + 1].word == "咗"
        ):
            start = index
            end = min(clause_end(tokens, index + 2), index + 6)
            candidates.append(
                make_candidate(
                    research_question="SV-RQ-008",
                    profile="V_WAN_ZO",
                    subtype="combined_v_wan_token",
                    tokens=tokens,
                    start=start,
                    end=end,
                    extraction_note=(
                        "Tokenization variant where the lexical verb and 完 are "
                        "one segmented word followed by 咗."
                    ),
                    **metadata,
                )
            )

        # Orthographic single-token fallback.
        if "完咗" in token.word:
            start = index
            end = min(clause_end(tokens, index + 1), index + 5)
            candidates.append(
                make_candidate(
                    research_question="SV-RQ-008",
                    profile="V_WAN_ZO",
                    subtype="single_token_contains_wan_zo",
                    tokens=tokens,
                    start=start,
                    end=end,
                    extraction_note=(
                        "Single segmented token contains 完咗; retained as a "
                        "segmentation fallback candidate."
                    ),
                    **metadata,
                )
            )

    return candidates


def extract_svrq009(
    *,
    tokens: Sequence[TokenRecord],
    **metadata: Any,
) -> list[Candidate]:
    candidates: list[Candidate] = []

    for zo_index, token in enumerate(tokens):
        if token.word != "咗":
            continue

        end_limit = min(clause_end(tokens, zo_index + 1), zo_index + 13)

        # V咗 O ... 喺 ...
        for target_index in range(zo_index + 2, end_limit):
            if tokens[target_index].word != "喺":
                continue
            between = tokens[zo_index + 1:target_index]
            if not any(not is_punctuation(item) for item in between):
                continue
            start = max(0, zo_index - 1)
            end = min(end_limit, target_index + 5)
            candidates.append(
                make_candidate(
                    research_question="SV-RQ-009",
                    profile="ZO_OBJECT_POSTVERBAL_HAI_LOCATIVE",
                    subtype="zo_then_material_then_hai2",
                    tokens=tokens,
                    start=start,
                    end=end,
                    extraction_note=(
                        "咗 is followed by intervening material and postverbal 喺 "
                        "within the same strong-punctuation-bounded clause. Manual "
                        "review must determine objecthood and event/result location."
                    ),
                    **metadata,
                )
            )

        # V咗 O ... directional ...
        for target_index in range(zo_index + 2, end_limit):
            target = tokens[target_index]
            if target.word not in DIRECTIONAL_WORDS:
                continue
            between = tokens[zo_index + 1:target_index]
            if not any(not is_punctuation(item) for item in between):
                continue
            start = max(0, zo_index - 1)
            end = min(end_limit, target_index + 5)
            candidates.append(
                make_candidate(
                    research_question="SV-RQ-009",
                    profile="ZO_OBJECT_POSTVERBAL_DIRECTIONAL",
                    subtype=f"directional_{target.word}",
                    tokens=tokens,
                    start=start,
                    end=end,
                    extraction_note=(
                        "咗 is followed by intervening material and a directional/"
                        "goal candidate within the same clause. Manual review must "
                        "determine whether the intervening material is an object and "
                        "whether the target is a directional complement, goal, or "
                        "independent predicate."
                    ),
                    **metadata,
                )
            )

    return candidates


def is_laa_family(token: TokenRecord) -> bool:
    jyutping = token.jyutping or ""
    return (
        token.word in LAA_WORDS
        or jyutping.startswith("laa")
        or jyutping.startswith("laak")
    )


def extract_svrq010(
    *,
    tokens: Sequence[TokenRecord],
    **metadata: Any,
) -> list[Candidate]:
    candidates: list[Candidate] = []

    for zo_index, token in enumerate(tokens):
        if token.word != "咗":
            continue

        end_limit = min(clause_end(tokens, zo_index + 1), zo_index + 18)

        for laa_index in range(zo_index + 1, end_limit):
            target = tokens[laa_index]
            if not is_laa_family(target):
                continue

            between = tokens[zo_index + 1:laa_index]
            overt_nominal_material = any(
                item.pos.startswith(NOMINAL_POS_PREFIXES)
                for item in between
                if not is_punctuation(item)
            )
            subtype = (
                "zo_overt_nominal_material_laa"
                if overt_nominal_material
                else "zo_no_overt_nominal_material_laa"
            )
            start = max(0, zo_index - 1)
            end = laa_index + 1
            candidates.append(
                make_candidate(
                    research_question="SV-RQ-010",
                    profile="ZO_THEN_LAA_FAMILY",
                    subtype=subtype,
                    tokens=tokens,
                    start=start,
                    end=end,
                    extraction_note=(
                        "咗 and a 喇/啦/嘞-family particle occur in the same "
                        "strong-punctuation-bounded clause. The subtype records only "
                        "whether nominal-looking material intervenes; manual review "
                        "must determine aspect, argument structure, and particle use."
                    ),
                    **metadata,
                )
            )
            # One final-particle candidate per 咗 is sufficient for this profile.
            break

    return candidates


def json_ready(candidate: Candidate) -> dict[str, Any]:
    data = asdict(candidate)
    return data


def write_outputs(
    output_dir: Path,
    candidates: Sequence[Candidate],
    summary: dict[str, Any],
) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)

    ledger_path = output_dir / "HKCANCOR-SV-RQ-008-010-CANDIDATES.json"
    jsonl_path = output_dir / "HKCANCOR-SV-RQ-008-010-CANDIDATES.jsonl"
    tsv_path = output_dir / "HKCANCOR-SV-RQ-008-010-CANDIDATES.tsv"
    summary_path = output_dir / "HKCANCOR-SV-RQ-008-010-SUMMARY.json"
    report_path = output_dir / "HKCANCOR-SV-RQ-008-010-REPORT.md"

    ledger_path.write_text(
        json.dumps([json_ready(item) for item in candidates], ensure_ascii=False, indent=2)
        + "\n",
        encoding="utf-8",
    )

    with jsonl_path.open("w", encoding="utf-8") as handle:
        for candidate in candidates:
            handle.write(
                json.dumps(json_ready(candidate), ensure_ascii=False, sort_keys=True)
                + "\n"
            )

    columns = [
        "candidate_id",
        "research_question",
        "profile",
        "subtype",
        "file_name",
        "file_index",
        "utterance_index_in_file",
        "participant",
        "matched_surface",
        "matched_segmented",
        "utterance_surface",
        "utterance_segmented",
        "previous_utterance",
        "next_utterance",
        "manual_classification",
        "reviewer_note",
    ]
    with tsv_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=columns, delimiter="\t")
        writer.writeheader()
        for candidate in candidates:
            row = json_ready(candidate)
            writer.writerow({column: row[column] for column in columns})

    summary_path.write_text(
        json.dumps(summary, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    counts_by_rq = Counter(item.research_question for item in candidates)
    counts_by_profile = Counter(item.profile for item in candidates)
    counts_by_subtype = Counter(item.subtype for item in candidates)

    report_lines = [
        "# HKCanCor corpus search — SV-RQ-008 to SV-RQ-010",
        "",
        "## Status",
        "",
        "Mechanical high-recall candidate extraction only. No candidate is "
        "linguistically accepted until manually reviewed in context.",
        "",
        "## Corpus",
        "",
        f"- files: {summary['corpus']['files']}",
        f"- utterances: {summary['corpus']['utterances']}",
        f"- segmented words: {summary['corpus']['words']}",
        f"- PyCantonese: `{summary['runtime']['pycantonese_version']}`",
        "",
        "## Candidate totals",
        "",
    ]
    for key in sorted(counts_by_rq):
        report_lines.append(f"- `{key}`: {counts_by_rq[key]}")
    report_lines.extend(["", "### Profiles", ""])
    for key in sorted(counts_by_profile):
        report_lines.append(f"- `{key}`: {counts_by_profile[key]}")
    report_lines.extend(["", "### Subtypes", ""])
    for key in sorted(counts_by_subtype):
        report_lines.append(f"- `{key}`: {counts_by_subtype[key]}")
    report_lines.extend(
        [
            "",
            "## Required manual review",
            "",
            "1. Confirm that each hit is inside one syntactic clause.",
            "2. Confirm verb, object, result/goal, and final-particle boundaries.",
            "3. Separate actual construction members from false positives.",
            "4. Record discourse context and speaker/register information where available.",
            "5. Treat zero hits as corpus non-attestation, never as ungrammaticality.",
            "",
        ]
    )
    report_path.write_text("\n".join(report_lines), encoding="utf-8")


def main() -> int:
    args = parse_args()
    corpus = pycantonese.hkcancor()

    utterances_by_file = corpus.utterances(by_file=True)
    file_paths = list(corpus.file_paths)
    if len(file_paths) != len(utterances_by_file):
        raise RuntimeError(
            "PyCantonese returned mismatched file and utterance-group counts: "
            f"{len(file_paths)} files vs {len(utterances_by_file)} groups"
        )

    pycantonese_version = getattr(pycantonese, "__version__", "unknown")
    corpus_version = f"PyCantonese-{pycantonese_version}-bundled-HKCanCor"

    candidates: list[Candidate] = []

    for file_index, (file_path, utterances) in enumerate(
        zip(file_paths, utterances_by_file)
    ):
        file_name = Path(str(file_path)).name

        rendered_utterances: list[str] = []
        tokenized_utterances: list[list[TokenRecord]] = []
        for utterance in utterances:
            records = [token_record(token) for token in utterance.tokens]
            tokenized_utterances.append(records)
            rendered_utterances.append(utterance_segmented(records))

        for utterance_index, (utterance, tokens) in enumerate(
            zip(utterances, tokenized_utterances)
        ):
            previous_utterance = (
                rendered_utterances[utterance_index - 1]
                if utterance_index > 0
                else ""
            )
            next_utterance = (
                rendered_utterances[utterance_index + 1]
                if utterance_index + 1 < len(rendered_utterances)
                else ""
            )
            participant = str(getattr(utterance, "participant", "") or "")
            metadata = {
                "file_name": file_name,
                "file_index": file_index,
                "utterance_index": utterance_index,
                "participant": participant,
                "previous_utterance": previous_utterance,
                "next_utterance": next_utterance,
                "corpus_version": corpus_version,
            }

            candidates.extend(extract_svrq008(tokens=tokens, **metadata))
            candidates.extend(extract_svrq009(tokens=tokens, **metadata))
            candidates.extend(extract_svrq010(tokens=tokens, **metadata))

    # Remove exact duplicate IDs defensively, then sort deterministically.
    deduplicated = {candidate.candidate_id: candidate for candidate in candidates}
    candidates = sorted(
        deduplicated.values(),
        key=lambda item: (
            item.research_question,
            item.file_index,
            item.utterance_index_in_file,
            item.match_start_token,
            item.profile,
            item.subtype,
        ),
    )

    counts_by_rq = Counter(item.research_question for item in candidates)
    counts_by_profile = Counter(item.profile for item in candidates)
    counts_by_subtype = Counter(item.subtype for item in candidates)

    summary = {
        "schema": "canto-span-hkcancor-svrq-008-010-extraction-v1",
        "status": "candidate_generation_only",
        "evidence_boundary": (
            "Mechanical corpus occurrence candidates are not grammaticality, "
            "productivity, construction-membership, promotion, or parser evidence "
            "until manually reviewed."
        ),
        "runtime": {
            "python": platform.python_version(),
            "platform": platform.platform(),
            "pycantonese_version": pycantonese_version,
        },
        "corpus": {
            "name": "HKCanCor",
            "files": corpus.n_files,
            "utterances": sum(len(group) for group in utterances_by_file),
            "words": len(corpus.words()),
        },
        "candidate_total": len(candidates),
        "counts_by_research_question": dict(sorted(counts_by_rq.items())),
        "counts_by_profile": dict(sorted(counts_by_profile.items())),
        "counts_by_subtype": dict(sorted(counts_by_subtype.items())),
    }

    write_outputs(args.output_dir, candidates, summary)

    print(json.dumps(summary, ensure_ascii=False, indent=2))
    print(f"\nOutputs written to: {args.output_dir.resolve()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
