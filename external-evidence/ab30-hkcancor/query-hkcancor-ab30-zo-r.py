#!/usr/bin/env python3
"""Cross-reference AB30 claims against bounded HKCanCor V-咗-POS slices.

This is a token/POS retrieval and review-accounting tool.  It does not treat
HKCanCor annotations, token adjacency, or frequency as a gold syntactic
analysis, a productivity result, or a readiness/status decision.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import re
from collections import Counter
from pathlib import Path

import pycantonese


CONSTRUCTION = {
    "constructionUuid": "2169217f-a21d-5165-9513-eb0edee2c220",
    "permanentCode": "AB30",
    "canonicalIdentity": "ZoMarkedPerfectiveObjectVP",
    "legacyRuntimeLabel": "PostverbalZoPerfectiveVP",
}
R_QUERY_ID = "AB30-HKCANCOR-V-ZO-R-R2"
M_QUERY_ID = "AB30-HKCANCOR-V-ZO-M-R1"
LEGACY_KEOI_QUERY_ID = "AB30-HKCANCOR-V-ZO-KEOI-R1"
PY_CANTONESE_VERSION = "5.0.0"
CLASSIFICATIONS = {"genuine", "false_positive", "ambiguous", "unusable"}
PRECEDING_VERBAL_POS = {"v", "v1", "xv"}
QUERY_PROFILES = {
    "r": {
        "query_id": R_QUERY_ID,
        "inventory_json": "hkcancor-ab30-zo-r-candidate-inventory.json",
        "inventory_tsv": "hkcancor-ab30-zo-r-candidate-inventory.tsv",
        "summary_json": "hkcancor-ab30-zo-r-query-summary.json",
    },
    "m": {
        "query_id": M_QUERY_ID,
        "inventory_json": "hkcancor-ab30-zo-m-candidate-inventory.json",
        "inventory_tsv": "hkcancor-ab30-zo-m-candidate-inventory.tsv",
        "summary_json": "hkcancor-ab30-zo-m-query-summary.json",
    },
}


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def text_of(utterance) -> str:
    return "".join(token.word for token in utterance.tokens)


def token_record(token) -> dict[str, str]:
    return {"word": token.word, "pos": token.pos, "jyutping": token.jyutping}


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
            "turnIndexZeroBased": position,
            "participant": utterance.participant,
            "text": text_of(utterance),
            "tokens": [token_record(token) for token in utterance.tokens],
        }

    return {"previous": one(index - 1), "next": one(index + 1)}


def read_source_allowlist(path: Path) -> tuple[dict[str, str], str]:
    entries: dict[str, str] = {}
    for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        match = re.fullmatch(r"([0-9a-f]{64})  ([^/]+)", line)
        if not match:
            raise RuntimeError(
                f"Malformed source-manifest line {line_number} in {path}"
            )
        digest, filename = match.groups()
        if filename in entries:
            raise RuntimeError(f"Duplicate source filename in {path}: {filename}")
        entries[filename] = digest
    return entries, sha256_file(path)


def verify_distribution(corpus, allowlist: dict[str, str]) -> dict[str, str]:
    source_paths = [Path(path) for path in corpus.file_paths]
    actual_names = [path.name for path in source_paths]
    if set(actual_names) != set(allowlist):
        missing = sorted(set(allowlist) - set(actual_names))
        extra = sorted(set(actual_names) - set(allowlist))
        raise RuntimeError(
            f"PyCantonese source distribution differs from allowlist; "
            f"missing={missing}, extra={extra}"
        )
    actual_hashes = {path.name: sha256_file(path) for path in source_paths}
    mismatches = [
        name for name, digest in actual_hashes.items() if allowlist[name] != digest
    ]
    if mismatches:
        raise RuntimeError(
            "PyCantonese source hashes differ from allowlist: "
            + ", ".join(sorted(mismatches))
        )
    return actual_hashes


def candidate_id(
    id_namespace: str,
    source_file: str,
    source_hash: str,
    turn_index: int,
    token_index: int,
    matched_surface: str,
) -> str:
    identity = "\0".join(
        [
            id_namespace,
            source_file,
            source_hash,
            str(turn_index),
            str(token_index),
            matched_surface,
        ]
    )
    return "ab30-" + sha256_bytes(identity.encode("utf-8"))[:20]


def extract_rows(
    corpus, source_hashes: dict[str, str], following_pos: str, query_id: str
) -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    utterances_by_file = corpus.utterances(by_file=True)
    headers = corpus.headers()
    source_paths = [Path(path) for path in corpus.file_paths]

    for file_index, utterances in enumerate(utterances_by_file):
        source_file = source_paths[file_index].name
        header = headers[file_index]
        for turn_index, utterance in enumerate(utterances):
            tokens = utterance.tokens
            for token_index, token in enumerate(tokens):
                if not (
                    token.word == "咗"
                    and token_index > 0
                    and token_index + 1 < len(tokens)
                    and tokens[token_index - 1].pos in PRECEDING_VERBAL_POS
                    and tokens[token_index + 1].pos == following_pos
                ):
                    continue
                id_namespace = (
                    LEGACY_KEOI_QUERY_ID
                    if following_pos == "r" and tokens[token_index + 1].word == "佢"
                    else query_id
                )
                matched_surface = "".join(
                    item.word for item in tokens[token_index - 1 : token_index + 2]
                )
                rows.append(
                    {
                        "candidateId": candidate_id(
                            id_namespace,
                            source_file,
                            source_hashes[source_file],
                            turn_index,
                            token_index,
                            matched_surface,
                        ),
                        "queryId": query_id,
                        "candidateIdNamespace": id_namespace,
                        "sourceFile": source_file,
                        "sourceFileSha256": source_hashes[source_file],
                        "fileIndexZeroBased": file_index,
                        "turnIndexZeroBased": turn_index,
                        "tokenIndexZeroBased": token_index,
                        "recordingDate": (
                            str(header.date) if header.date is not None else None
                        ),
                        "participant": utterance.participant,
                        "participantMetadata": participant_record(
                            header, utterance.participant
                        ),
                        "text": text_of(utterance),
                        "tokens": [token_record(item) for item in tokens],
                        "matchedSurfaceSpan": matched_surface,
                        "matchedTokens": [
                            token_record(item)
                            for item in tokens[token_index - 1 : token_index + 2]
                        ],
                        "localContext": context_record(utterances, turn_index),
                        "annotationStatus": "REQUIRES_EXPERT_CONTEXT_REVIEW",
                    }
                )
    return rows


def build_summary(
    corpus,
    rows: list[dict[str, object]],
    source_manifest_path: Path,
    source_manifest_sha256: str,
    following_pos: str,
    query_id: str,
) -> dict[str, object]:
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
        "generatedWithPycantonese": pycantonese.__version__,
        "corpusName": "HKCanCor",
        "corpusFilesInDistribution": corpus.n_files,
        "corpusUtterancesInDistribution": len(corpus.utterances()),
        "corpusWordsInDistribution": len(corpus.words()),
        "sourceAllowlist": {
            "path": source_manifest_path.as_posix(),
            "sha256": source_manifest_sha256,
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
        "text",
        "previous_text",
        "next_text",
        "tokens_json",
        "annotation_status",
    ]
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=fields, delimiter="\t", lineterminator="\n")
    writer.writeheader()
    for row in rows:
        context = row["localContext"]
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
                "text": row["text"],
                "previous_text": (
                    context["previous"]["text"] if context["previous"] else ""
                ),
                "next_text": context["next"]["text"] if context["next"] else "",
                "tokens_json": json.dumps(
                    row["tokens"], ensure_ascii=False, separators=(",", ":")
                ),
                "annotation_status": row["annotationStatus"],
            }
        )
    return output.getvalue()


def rendered_outputs(
    summary: dict[str, object],
    rows: list[dict[str, object]],
    profile: dict[str, str],
) -> dict[str, str]:
    return {
        profile["inventory_json"]: json.dumps(
            {"summary": summary, "candidates": rows},
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        profile["inventory_tsv"]: render_tsv(rows),
        profile["summary_json"]: json.dumps(summary, ensure_ascii=False, indent=2) + "\n",
    }


def validate_decisions(
    path: Path, rows: list[dict[str, object]], query_id: str
) -> None:
    ledger = json.loads(path.read_text(encoding="utf-8"))
    if ledger.get("schema") != "canto-span-corpus-claim-cross-reference-decisions-v1":
        raise RuntimeError("Decision ledger has an unsupported schema")
    if ledger.get("construction") != CONSTRUCTION:
        raise RuntimeError("Decision ledger construction identity does not match AB30")
    if ledger.get("queryId") != query_id:
        raise RuntimeError("Decision ledger queryId does not match this query")

    expected = {row["candidateId"]: row for row in rows}
    decisions = ledger.get("decisions")
    if not isinstance(decisions, list):
        raise RuntimeError("Decision ledger decisions must be an array")
    actual: dict[str, dict[str, object]] = {}
    counts: Counter[str] = Counter()
    for decision in decisions:
        candidate = expected.get(decision.get("candidateId"))
        if candidate is None:
            raise RuntimeError(
                f"Decision references an unknown candidate: {decision.get('candidateId')}"
            )
        candidate_key = str(decision["candidateId"])
        if candidate_key in actual:
            raise RuntimeError(f"Duplicate decision for {candidate_key}")
        if decision.get("matchedSurfaceSpan") != candidate["matchedSurfaceSpan"]:
            raise RuntimeError(f"Decision span mismatch for {candidate_key}")
        classification = decision.get("classification")
        if classification not in CLASSIFICATIONS:
            raise RuntimeError(f"Invalid classification for {candidate_key}")
        if not isinstance(decision.get("reviewerNote"), str) or not decision["reviewerNote"]:
            raise RuntimeError(f"Decision requires reviewerNote for {candidate_key}")
        if not isinstance(decision.get("exclusionReason"), str):
            raise RuntimeError(f"Decision requires exclusionReason for {candidate_key}")
        relations = decision.get("claimRelations")
        if not isinstance(relations, list) or not relations:
            raise RuntimeError(f"Decision requires claimRelations for {candidate_key}")
        actual[candidate_key] = decision
        counts[classification] += 1

    if set(actual) != set(expected):
        missing = sorted(set(expected) - set(actual))
        raise RuntimeError(f"Decision ledger does not account for candidates: {missing}")
    expected_counts = {name: counts.get(name, 0) for name in sorted(CLASSIFICATIONS)}
    if ledger.get("counts") != expected_counts:
        raise RuntimeError(
            f"Decision ledger counts differ; expected {expected_counts}"
        )
    if ledger.get("packetStatus") != "complete":
        raise RuntimeError("Decision ledger packetStatus must be complete")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--source-manifest", type=Path, required=True)
    parser.add_argument("--decisions", type=Path)
    parser.add_argument(
        "--following-pos", choices=sorted(QUERY_PROFILES), default="r"
    )
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    profile = QUERY_PROFILES[args.following_pos]
    query_id = profile["query_id"]

    if pycantonese.__version__ != PY_CANTONESE_VERSION:
        raise RuntimeError(
            f"{query_id} is frozen to PyCantonese {PY_CANTONESE_VERSION}; "
            f"got {pycantonese.__version__}"
        )

    allowlist, source_manifest_sha256 = read_source_allowlist(args.source_manifest)
    corpus = pycantonese.hkcancor()
    source_hashes = verify_distribution(corpus, allowlist)
    rows = extract_rows(corpus, source_hashes, args.following_pos, query_id)
    summary = build_summary(
        corpus,
        rows,
        args.source_manifest,
        source_manifest_sha256,
        args.following_pos,
        query_id,
    )
    outputs = rendered_outputs(summary, rows, profile)

    if args.check:
        for filename, expected in outputs.items():
            path = args.output_dir / filename
            if not path.exists() or path.read_text(encoding="utf-8") != expected:
                raise RuntimeError(f"Generated output is stale: {path}")
    else:
        args.output_dir.mkdir(parents=True, exist_ok=True)
        for filename, value in outputs.items():
            (args.output_dir / filename).write_text(value, encoding="utf-8")

    if args.decisions:
        validate_decisions(args.decisions, rows, query_id)

    print(
        f"{query_id}: {len(rows)} candidates; "
        f"{'checked' if args.check else 'generated'} deterministic outputs."
    )
    if args.decisions:
        print(f"Validated complete decisions: {args.decisions}")


if __name__ == "__main__":
    main()
