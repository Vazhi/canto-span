#!/usr/bin/env python3
"""Reusable deterministic HKCanCor extraction and review-accounting workbench."""

from __future__ import annotations

import argparse
import csv
import hashlib
import importlib
import io
import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable, Mapping, Sequence


CLASSIFICATIONS = frozenset(
    {"genuine", "false_positive", "ambiguous", "unusable"}
)
ANNOTATION_STATUS = "REQUIRES_EXPERT_CONTEXT_REVIEW"


@dataclass(frozen=True)
class Match:
    """One profile match inside an utterance."""

    start_index: int
    end_index_exclusive: int
    id_token_index: int
    matched_surface: str
    id_namespace: str | None = None
    dedupe_key: str | None = None
    duplicate_group_inputs: Mapping[str, object] | None = None
    extra_fields: Mapping[str, object] = field(default_factory=dict)


@dataclass(frozen=True)
class WorkbenchContext:
    corpus: Any
    source_manifest_path: Path
    source_manifest_sha256: str
    source_hashes: Mapping[str, str]
    pycantonese_version: str


TokenPredicate = Callable[[Sequence[Any], int], Match | None]
SummaryBuilder = Callable[[WorkbenchContext, list[dict[str, object]]], dict[str, object]]
TsvRenderer = Callable[[list[dict[str, object]]], str]


@dataclass(frozen=True)
class QueryProfile:
    """Construction-specific configuration for the shared workbench."""

    query_id: str
    candidate_id_namespace: str
    candidate_id_prefix: str
    inventory_json: str
    inventory_tsv: str
    summary_json: str
    construction: Mapping[str, object]
    token_predicate: TokenPredicate
    summary_builder: SummaryBuilder
    context_before_tokens: int = 0
    context_after_tokens: int = 0
    tsv_renderer: TsvRenderer | None = None

    def __post_init__(self) -> None:
        for name in (
            "query_id",
            "candidate_id_namespace",
            "candidate_id_prefix",
            "inventory_json",
            "inventory_tsv",
            "summary_json",
        ):
            if not getattr(self, name):
                raise ValueError(f"{name} must not be empty")
        if self.context_before_tokens < 0 or self.context_after_tokens < 0:
            raise ValueError("token context sizes must be non-negative")


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def text_of(utterance: Any) -> str:
    return "".join(token.word for token in utterance.tokens)


def token_record(token: Any) -> dict[str, str]:
    return {"word": token.word, "pos": token.pos, "jyutping": token.jyutping}


def participant_record(header: Any, code: str) -> dict[str, object]:
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


def utterance_context(utterances: Sequence[Any], index: int) -> dict[str, object]:
    def one(position: int) -> dict[str, object] | None:
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


def token_context(
    tokens: Sequence[Any],
    match: Match,
    before: int,
    after: int,
) -> dict[str, object]:
    start = max(0, match.start_index - before)
    end = min(len(tokens), match.end_index_exclusive + after)
    return {
        "startTokenIndexZeroBased": start,
        "endTokenIndexExclusive": end,
        "tokens": [token_record(token) for token in tokens[start:end]],
    }


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


def verify_distribution(
    corpus: Any, allowlist: Mapping[str, str]
) -> dict[str, str]:
    source_paths = [Path(path) for path in corpus.file_paths]
    actual_names = [path.name for path in source_paths]
    if len(actual_names) != len(set(actual_names)):
        raise RuntimeError("PyCantonese distribution contains duplicate filenames")
    if set(actual_names) != set(allowlist):
        missing = sorted(set(allowlist) - set(actual_names))
        extra = sorted(set(actual_names) - set(allowlist))
        raise RuntimeError(
            "PyCantonese source distribution differs from allowlist; "
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


def load_verified_hkcancor(
    source_manifest_path: Path,
    *,
    expected_pycantonese_version: str = "5.0.0",
    pycantonese_module: Any | None = None,
) -> WorkbenchContext:
    module = pycantonese_module or importlib.import_module("pycantonese")
    if module.__version__ != expected_pycantonese_version:
        raise RuntimeError(
            "HKCanCor workbench is frozen to PyCantonese "
            f"{expected_pycantonese_version}; got {module.__version__}"
        )
    allowlist, manifest_sha256 = read_source_allowlist(source_manifest_path)
    corpus = module.hkcancor()
    source_hashes = verify_distribution(corpus, allowlist)
    return WorkbenchContext(
        corpus=corpus,
        source_manifest_path=source_manifest_path,
        source_manifest_sha256=manifest_sha256,
        source_hashes=source_hashes,
        pycantonese_version=module.__version__,
    )


def candidate_id(
    *,
    prefix: str,
    namespace: str,
    source_file: str,
    source_hash: str,
    turn_index: int,
    token_index: int,
    matched_surface: str,
) -> str:
    identity = "\0".join(
        [
            namespace,
            source_file,
            source_hash,
            str(turn_index),
            str(token_index),
            matched_surface,
        ]
    )
    return prefix + sha256_bytes(identity.encode("utf-8"))[:20]


def extract_candidates(
    context: WorkbenchContext, profile: QueryProfile
) -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    candidate_ids: set[str] = set()
    corpus = context.corpus
    utterances_by_file = corpus.utterances(by_file=True)
    headers = corpus.headers()
    source_paths = [Path(path) for path in corpus.file_paths]

    for file_index, utterances in enumerate(utterances_by_file):
        source_file = source_paths[file_index].name
        header = headers[file_index]
        for turn_index, utterance in enumerate(utterances):
            tokens = utterance.tokens
            seen_match_keys: set[str] = set()
            for token_index, _token in enumerate(tokens):
                match = profile.token_predicate(tokens, token_index)
                if match is None:
                    continue
                if not (
                    0 <= match.start_index < match.end_index_exclusive <= len(tokens)
                ):
                    raise RuntimeError(
                        f"{profile.query_id} produced an invalid token span"
                    )
                if not 0 <= match.id_token_index < len(tokens):
                    raise RuntimeError(
                        f"{profile.query_id} produced an invalid ID token index"
                    )
                if match.dedupe_key is not None:
                    if match.dedupe_key in seen_match_keys:
                        continue
                    seen_match_keys.add(match.dedupe_key)
                namespace = match.id_namespace or profile.candidate_id_namespace
                row: dict[str, object] = {
                    "candidateId": candidate_id(
                        prefix=profile.candidate_id_prefix,
                        namespace=namespace,
                        source_file=source_file,
                        source_hash=context.source_hashes[source_file],
                        turn_index=turn_index,
                        token_index=match.id_token_index,
                        matched_surface=match.matched_surface,
                    ),
                    "queryId": profile.query_id,
                    "candidateIdNamespace": namespace,
                    "sourceFile": source_file,
                    "sourceFileSha256": context.source_hashes[source_file],
                    "fileIndexZeroBased": file_index,
                    "turnIndexZeroBased": turn_index,
                    "tokenIndexZeroBased": match.id_token_index,
                    "recordingDate": (
                        str(header.date) if header.date is not None else None
                    ),
                    "participant": utterance.participant,
                    "participantMetadata": participant_record(
                        header, utterance.participant
                    ),
                    "text": text_of(utterance),
                    "tokens": [token_record(item) for item in tokens],
                    "matchedSurfaceSpan": match.matched_surface,
                    "matchedTokens": [
                        token_record(item)
                        for item in tokens[
                            match.start_index : match.end_index_exclusive
                        ]
                    ],
                    "localContext": utterance_context(utterances, turn_index),
                    "annotationStatus": ANNOTATION_STATUS,
                }
                if profile.context_before_tokens or profile.context_after_tokens:
                    row["tokenContext"] = token_context(
                        tokens,
                        match,
                        profile.context_before_tokens,
                        profile.context_after_tokens,
                    )
                if match.duplicate_group_inputs is not None:
                    row["duplicateGroupInputs"] = dict(match.duplicate_group_inputs)
                reserved_overrides = sorted(set(row).intersection(match.extra_fields))
                if reserved_overrides:
                    raise RuntimeError(
                        f"{profile.query_id} profile fields override canonical fields: "
                        + ", ".join(reserved_overrides)
                    )
                row.update(match.extra_fields)
                candidate_key = str(row["candidateId"])
                if candidate_key in candidate_ids:
                    raise RuntimeError(
                        f"{profile.query_id} produced duplicate candidate ID "
                        f"{candidate_key}; define a dedupe key or distinct ID anchor"
                    )
                candidate_ids.add(candidate_key)
                rows.append(row)
    return rows


def render_default_tsv(rows: list[dict[str, object]]) -> str:
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
    writer = csv.DictWriter(
        output, fieldnames=fields, delimiter="\t", lineterminator="\n"
    )
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
    profile: QueryProfile,
    summary: dict[str, object],
    rows: list[dict[str, object]],
) -> dict[str, str]:
    tsv_renderer = profile.tsv_renderer or render_default_tsv
    return {
        profile.inventory_json: json.dumps(
            {"summary": summary, "candidates": rows},
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        profile.inventory_tsv: tsv_renderer(rows),
        profile.summary_json: json.dumps(summary, ensure_ascii=False, indent=2)
        + "\n",
    }


def check_or_write_outputs(
    output_dir: Path, outputs: Mapping[str, str], *, check: bool
) -> None:
    if check:
        for filename, expected in outputs.items():
            path = output_dir / filename
            if not path.exists() or path.read_text(encoding="utf-8") != expected:
                raise RuntimeError(f"Generated output is stale: {path}")
        return
    output_dir.mkdir(parents=True, exist_ok=True)
    for filename, value in outputs.items():
        (output_dir / filename).write_text(value, encoding="utf-8")


def validate_decisions(
    path: Path,
    rows: list[dict[str, object]],
    *,
    query_id: str,
    construction: Mapping[str, object],
) -> None:
    ledger = json.loads(path.read_text(encoding="utf-8"))
    if ledger.get("schema") != "canto-span-corpus-claim-cross-reference-decisions-v1":
        raise RuntimeError("Decision ledger has an unsupported schema")
    if ledger.get("construction") != construction:
        raise RuntimeError("Decision ledger construction identity does not match")
    if ledger.get("queryId") != query_id:
        raise RuntimeError("Decision ledger queryId does not match this query")

    expected = {row["candidateId"]: row for row in rows}
    decisions = ledger.get("decisions")
    if not isinstance(decisions, list):
        raise RuntimeError("Decision ledger decisions must be an array")
    actual: dict[str, dict[str, object]] = {}
    counts: dict[str, int] = {name: 0 for name in sorted(CLASSIFICATIONS)}
    for decision in decisions:
        if not isinstance(decision, dict):
            raise RuntimeError("Decision ledger entries must be objects")
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
        if (
            not isinstance(decision.get("reviewerNote"), str)
            or not decision["reviewerNote"]
        ):
            raise RuntimeError(f"Decision requires reviewerNote for {candidate_key}")
        if not isinstance(decision.get("exclusionReason"), str):
            raise RuntimeError(
                f"Decision requires exclusionReason for {candidate_key}"
            )
        relations = decision.get("claimRelations")
        if not isinstance(relations, list) or not relations:
            raise RuntimeError(
                f"Decision requires claimRelations for {candidate_key}"
            )
        actual[candidate_key] = decision
        counts[str(classification)] += 1

    if set(actual) != set(expected):
        missing = sorted(set(expected) - set(actual))
        raise RuntimeError(f"Decision ledger does not account for candidates: {missing}")
    if ledger.get("counts") != counts:
        raise RuntimeError(f"Decision ledger counts differ; expected {counts}")
    if ledger.get("packetStatus") != "complete":
        raise RuntimeError("Decision ledger packetStatus must be complete")


def execute_profile(
    profile: QueryProfile,
    *,
    output_dir: Path,
    source_manifest: Path,
    decisions: Path | None = None,
    check: bool = False,
    expected_pycantonese_version: str = "5.0.0",
    pycantonese_module: Any | None = None,
) -> tuple[WorkbenchContext, list[dict[str, object]], dict[str, object]]:
    context = load_verified_hkcancor(
        source_manifest,
        expected_pycantonese_version=expected_pycantonese_version,
        pycantonese_module=pycantonese_module,
    )
    rows = extract_candidates(context, profile)
    summary = profile.summary_builder(context, rows)
    outputs = rendered_outputs(profile, summary, rows)
    check_or_write_outputs(output_dir, outputs, check=check)
    if decisions:
        validate_decisions(
            decisions,
            rows,
            query_id=profile.query_id,
            construction=profile.construction,
        )
    return context, rows, summary


def profile_cli(
    profiles: Mapping[str, QueryProfile],
    *,
    profile_argument: str,
    description: str,
    argv: Sequence[str] | None = None,
) -> None:
    if not profiles:
        raise ValueError("at least one query profile is required")
    parser = argparse.ArgumentParser(description=description)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--source-manifest", type=Path, required=True)
    parser.add_argument("--decisions", type=Path)
    parser.add_argument(
        profile_argument,
        choices=sorted(profiles),
        default=next(iter(profiles)),
    )
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args(argv)
    profile_key = getattr(args, profile_argument.lstrip("-").replace("-", "_"))
    profile = profiles[profile_key]
    _context, rows, _summary = execute_profile(
        profile,
        output_dir=args.output_dir,
        source_manifest=args.source_manifest,
        decisions=args.decisions,
        check=args.check,
    )
    print(
        f"{profile.query_id}: {len(rows)} candidates; "
        f"{'checked' if args.check else 'generated'} deterministic outputs."
    )
    if args.decisions:
        print(f"Validated complete decisions: {args.decisions}")
