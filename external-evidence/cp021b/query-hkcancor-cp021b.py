#!/usr/bin/env python3
"""Export the complete HKCanCor 畀/俾 discovery inventory for CP021B.

This is a lexical retrieval step, not proposition extraction or annotation.  It
exports every utterance containing an exact 畀/俾 token and the one additional
utterance found by substring expansion.  No parser output is consulted.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
from collections import Counter
from pathlib import Path

import pycantonese


FORMS = ("畀", "俾")


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def text_of(utterance) -> str:
    return "".join(token.word for token in utterance.tokens)


def token_record(token) -> dict[str, object]:
    return {
        "word": token.word,
        "pos": token.pos,
        "jyutping": token.jyutping,
    }


def participant_record(header, code: str) -> dict[str, object]:
    for participant in header.participants:
        if participant.code == code:
            return {
                "code": participant.code,
                "name": participant.name,
                "role": participant.role,
                "language": participant.language,
                "l1": participant.l1,
                "sex": participant.sex,
                "age": str(participant.age) if participant.age is not None else None,
            }
    return {"code": code}


def context_record(utterances, index: int) -> dict[str, object]:
    def one(position: int):
        if position < 0 or position >= len(utterances):
            return None
        utterance = utterances[position]
        return {
            "turn_index_zero_based": position,
            "participant": utterance.participant,
            "text": text_of(utterance),
            "tokens": [token_record(token) for token in utterance.tokens],
        }

    return {"previous": one(index - 1), "next": one(index + 1)}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", type=Path, required=True)
    args = parser.parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)

    if pycantonese.__version__ != "5.0.0":
        raise RuntimeError(
            f"CP021B is frozen to PyCantonese 5.0.0; got {pycantonese.__version__}"
        )

    corpus = pycantonese.hkcancor()
    utterances_by_file = corpus.utterances(by_file=True)
    headers = corpus.headers()
    source_paths = [Path(path) for path in corpus.file_paths]
    source_hashes = {path.name: sha256(path) for path in source_paths}

    rows: list[dict[str, object]] = []
    matched_token_counter: Counter[str] = Counter()
    matched_pos_counter: Counter[str] = Counter()
    query_type_counter: Counter[str] = Counter()

    for file_index, utterances in enumerate(utterances_by_file):
        source_path = source_paths[file_index]
        header = headers[file_index]
        for turn_index, utterance in enumerate(utterances):
            matches = []
            for token_index, token in enumerate(utterance.tokens):
                exact = token.word in FORMS
                substring = any(form in token.word for form in FORMS)
                if substring:
                    query_type = "exact_token" if exact else "substring_expansion"
                    matches.append(
                        {
                            "token_index_zero_based": token_index,
                            "word": token.word,
                            "pos": token.pos,
                            "jyutping": token.jyutping,
                            "query_type": query_type,
                        }
                    )
                    matched_token_counter[token.word] += 1
                    matched_pos_counter[token.pos] += 1
                    query_type_counter[query_type] += 1
            if not matches:
                continue

            query_scope = (
                "exact_token"
                if all(match["query_type"] == "exact_token" for match in matches)
                else "substring_expansion"
            )
            rows.append(
                {
                    "candidate_id": f"HKC-{file_index:02d}-{turn_index:05d}",
                    "query_scope": query_scope,
                    "source_file": source_path.name,
                    "source_file_sha256": source_hashes[source_path.name],
                    "file_index_zero_based": file_index,
                    "turn_index_zero_based": turn_index,
                    "recording_date": str(header.date) if header.date is not None else None,
                    "participant": utterance.participant,
                    "participant_metadata": participant_record(
                        header, utterance.participant
                    ),
                    "text": text_of(utterance),
                    "tokens": [token_record(token) for token in utterance.tokens],
                    "matches": matches,
                    "local_context": context_record(utterances, turn_index),
                    "annotation_status": "UNSCREENED_LEXICAL_CANDIDATE",
                }
            )

    manifest_lines = [
        f"{source_hashes[path.name]}  {path.name}" for path in source_paths
    ]
    manifest_sha256 = hashlib.sha256(
        ("\n".join(manifest_lines) + "\n").encode("utf-8")
    ).hexdigest()

    exact_rows = [row for row in rows if row["query_scope"] == "exact_token"]
    summary = {
        "checkpoint": "CP021B-SOURCE-DISCOVERY",
        "status": "LEXICAL_CANDIDATE_INVENTORY_ONLY",
        "generated_with_pycantonese": pycantonese.__version__,
        "corpus_name": "HKCanCor",
        "corpus_files_in_distribution": corpus.n_files,
        "corpus_utterances_in_distribution": len(corpus.utterances()),
        "corpus_words_in_distribution": len(corpus.words()),
        "source_manifest_sha256": manifest_sha256,
        "query": {
            "exact_forms": list(FORMS),
            "primary_scope": "token.word exactly equals 畀 or 俾",
            "expansion_scope": "token.word contains 畀 or 俾",
            "parser_output_consulted": False,
            "semantic_selection_performed": False,
        },
        "counts": {
            "exact_candidate_utterances": len(exact_rows),
            "expanded_candidate_utterances": len(rows),
            "matched_tokens": sum(len(row["matches"]) for row in rows),
            "source_files_with_candidates": len(
                {row["source_file"] for row in rows}
            ),
            "matched_token_forms": dict(sorted(matched_token_counter.items())),
            "matched_pos_tags": dict(sorted(matched_pos_counter.items())),
            "query_types": dict(sorted(query_type_counter.items())),
        },
        "license_and_provenance": {
            "repository": "https://github.com/fcbond/hkcancor",
            "license": "CC BY 4.0",
            "corpus_citation": (
                "K. K. Luke and May L. Y. Wong (2015), The Hong Kong "
                "Cantonese Corpus: Design and Uses"
            ),
            "recording_period": "1997-03 to 1998-08",
            "distribution_limitation": (
                "PyCantonese 5.0.0 supplies 58 files and 153,656 words; "
                "this is smaller than the repository's approximately 230,000-word "
                "description and is not a complete census of all Hong Kong Cantonese."
            ),
        },
        "interpretation_warning": (
            "Lexical retrieval establishes candidate occurrence only. Rows are not "
            "gold syntactic analyses and cannot validate a parser construction."
        ),
    }

    json_path = args.output_dir / "hkcancor-cp021b-candidate-inventory.json"
    json_path.write_text(
        json.dumps({"summary": summary, "rows": rows}, ensure_ascii=False, indent=2)
        + "\n",
        encoding="utf-8",
    )

    tsv_path = args.output_dir / "hkcancor-cp021b-candidate-inventory.tsv"
    fields = [
        "candidate_id",
        "query_scope",
        "source_file",
        "source_file_sha256",
        "file_index_zero_based",
        "turn_index_zero_based",
        "recording_date",
        "participant",
        "text",
        "matches_json",
        "previous_text",
        "next_text",
        "annotation_status",
    ]
    with tsv_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, delimiter="\t")
        writer.writeheader()
        for row in rows:
            writer.writerow(
                {
                    "candidate_id": row["candidate_id"],
                    "query_scope": row["query_scope"],
                    "source_file": row["source_file"],
                    "source_file_sha256": row["source_file_sha256"],
                    "file_index_zero_based": row["file_index_zero_based"],
                    "turn_index_zero_based": row["turn_index_zero_based"],
                    "recording_date": row["recording_date"],
                    "participant": row["participant"],
                    "text": row["text"],
                    "matches_json": json.dumps(
                        row["matches"], ensure_ascii=False, separators=(",", ":")
                    ),
                    "previous_text": (
                        row["local_context"]["previous"]["text"]
                        if row["local_context"]["previous"]
                        else ""
                    ),
                    "next_text": (
                        row["local_context"]["next"]["text"]
                        if row["local_context"]["next"]
                        else ""
                    ),
                    "annotation_status": row["annotation_status"],
                }
            )

    (args.output_dir / "hkcancor-cp021b-query-summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (args.output_dir / "hkcancor-cp021b-source-manifest.sha256").write_text(
        "\n".join(manifest_lines) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    main()
