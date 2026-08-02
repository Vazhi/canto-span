#!/usr/bin/env python3
"""Verify source-preserving pedagogical corpus packages and completed expert reviews."""

from __future__ import annotations

import argparse
import csv
import hashlib
import importlib.util
import json
import re
import sys
from collections import Counter
from pathlib import Path
from typing import Any

DEFAULT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_LOCKS_RELATIVE = Path("config/pedagogical-corpus-source-locks.json")
REQUIRED_FILES = {
    "source.json",
    "items.tsv",
    "review.json",
    "mechanical-cross-reference-r1.json",
    "expert-review-r1.tsv",
    "package-integrity-r1.json",
    "README.md",
    "research-summary.md",
}
ALLOWED_TERMINAL = {
    "exact_duplicate",
    "normalized_duplicate",
    "new_corpus_attestation",
    "lexical_only_attestation",
    "pronunciation_discrepancy",
    "translation_discrepancy",
    "naturalness_review_candidate",
    "unusable",
}
ALLOWED_DUPLICATE = {
    "accepted_exact_duplicate",
    "accepted_normalized_duplicate",
    "no_accepted_duplicate",
}
REQUIRED_NOT_CLAIMS = {
    "not_grammar_proof",
    "not_productivity_evidence",
    "not_dialect_wide_naturalness",
    "not_parser_acceptance",
    "not_linguistic_status_change",
}
SHA256_PATTERN = re.compile(r"^sha256:[0-9a-f]{64}$")


def fail(message: str) -> None:
    raise AssertionError(message)


def read_bytes(path: Path) -> bytes:
    if not path.is_file():
        fail(f"missing file: {path}")
    return path.read_bytes()


def load_json(path: Path) -> dict[str, Any]:
    try:
        value = json.loads(read_bytes(path))
    except json.JSONDecodeError as error:
        fail(f"invalid JSON in {path}: {error}")
    if not isinstance(value, dict):
        fail(f"expected JSON object: {path}")
    return value


def sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def git_blob_sha(data: bytes) -> str:
    return hashlib.sha1(b"blob " + str(len(data)).encode("ascii") + b"\0" + data).hexdigest()


def stable_ids(rows: list[dict[str, Any]], label: str, field: str = "id") -> list[str]:
    values: list[str] = []
    for row in rows:
        value = row.get(field)
        if not isinstance(value, str) or not value:
            fail(f"{label} row lacks {field}")
        values.append(value)
    if len(values) != len(set(values)):
        duplicates = sorted(value for value, count in Counter(values).items() if count > 1)
        fail(f"duplicate IDs in {label}: {duplicates[:10]}")
    return values


def find_field(fields: list[str], candidates: list[str], label: str, required: bool = True) -> str | None:
    for candidate in candidates:
        if candidate in fields:
            return candidate
    if required:
        fail(f"{label} lacks required field; expected one of {candidates}")
    return None


def load_tsv(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    try:
        text = read_bytes(path).decode("utf-8")
    except UnicodeDecodeError as error:
        fail(f"TSV must be UTF-8: {path}: {error}")
    reader = csv.DictReader(text.splitlines(), delimiter="\t")
    fields = list(reader.fieldnames or [])
    if not fields:
        fail(f"TSV has no header: {path}")
    return fields, list(reader)


def load_builder(root: Path):
    path = root / "tools/build-pedagogical-corpus-review-candidates.py"
    spec = importlib.util.spec_from_file_location("pedagogical_review_builder", path)
    if spec is None or spec.loader is None:
        fail("unable to load pedagogical review candidate builder")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def immutable_records(package: Path, records: Any, label: str) -> dict[str, dict[str, Any]]:
    if not isinstance(records, list):
        fail(f"{label} immutable_files must be an array")
    by_path: dict[str, dict[str, Any]] = {}
    for row in records:
        if not isinstance(row, dict) or row.get("path") not in {"source.json", "items.tsv"}:
            fail(f"{label} contains an invalid immutable file record")
        path = row["path"]
        if path in by_path:
            fail(f"{label} repeats immutable path: {path}")
        data = read_bytes(package / path)
        expected = {
            "path": path,
            "bytes": len(data),
            "sha256": sha256_hex(data),
            "git_blob_sha": git_blob_sha(data),
        }
        for field, value in expected.items():
            if row.get(field) != value:
                fail(f"{label} {field} drift: {path}")
        by_path[path] = row
    if set(by_path) != {"source.json", "items.tsv"}:
        fail(f"{label} must bind source.json and items.tsv exactly")
    return by_path


def verify_integrity(
    root: Path,
    package: Path,
    package_relative: Path,
    integrity: dict[str, Any],
    source_id: str,
    payload_hash: str,
) -> None:
    if integrity.get("schema") != "canto-span-pedagogical-corpus-package-integrity-v1":
        fail("unexpected package integrity schema")
    if integrity.get("source_id") != source_id:
        fail("package integrity source ID mismatch")
    if integrity.get("source_payload_hash") != payload_hash:
        fail("package integrity source payload hash mismatch")
    local = immutable_records(package, integrity.get("immutable_files"), "package integrity")

    locks = load_json(root / SOURCE_LOCKS_RELATIVE)
    if locks.get("schema") != "canto-span-pedagogical-corpus-source-locks-v1":
        fail("unexpected pedagogical source-lock schema")
    records = locks.get("records")
    if not isinstance(records, list):
        fail("pedagogical source-lock records must be an array")
    matches = [row for row in records if isinstance(row, dict) and row.get("package") == str(package_relative)]
    if len(matches) != 1:
        fail("package must have exactly one external source lock")
    lock = matches[0]
    if lock.get("source_id") != source_id or lock.get("source_payload_hash") != payload_hash:
        fail("external source-lock identity mismatch")
    external = immutable_records(package, lock.get("immutable_files"), "external source lock")
    if external != local:
        fail("package integrity does not match the external source lock")


def verify_source_and_tsv(package: Path, source: dict[str, Any]) -> tuple[list[dict[str, Any]], list[str]]:
    schema = source.get("schema")
    if schema not in {"canto-span-pedagogical-corpus-source-v1", "canto-span-pedagogical-dialog-source-v1"}:
        fail("unsupported source schema")
    items = source.get("items")
    if not isinstance(items, list) or not items:
        fail("source items must be a non-empty array")
    source_ids = stable_ids(items, "source items")
    if [row.get("ordinal") for row in items] != list(range(1, len(items) + 1)):
        fail("source ordinals are not contiguous")
    ingress = source.get("ingress") or {}
    if ingress.get("recordCount") != len(items):
        fail("source ingress record count mismatch")
    for item in items:
        source_hash = item.get("sourceHash")
        if not isinstance(source_hash, str) or not SHA256_PATTERN.fullmatch(source_hash):
            fail(f"source item hash missing or malformed: {item.get('id')}")
        if not isinstance(item.get("source"), dict):
            fail(f"source values missing: {item.get('id')}")
    fields, rows = load_tsv(package / "items.tsv")
    id_field = find_field(fields, ["id", "stable_id", "stableId", "item_id"], "items.tsv")
    assert id_field is not None
    tsv_ids = stable_ids(rows, "items.tsv", id_field)
    if tsv_ids != source_ids:
        fail("items.tsv IDs or order do not match source.json")
    hash_field = find_field(fields, ["source_hash", "sourceHash"], "items.tsv", required=False)
    if hash_field:
        source_by_id = {row["id"]: row for row in items}
        for row in rows:
            if row[hash_field] != source_by_id[row[id_field]]["sourceHash"]:
                fail(f"items.tsv source hash mismatch: {row[id_field]}")
    if schema == "canto-span-pedagogical-dialog-source-v1":
        turns = [row for row in items if row.get("itemType") == "dialog_turn"]
        vocabulary = [row for row in items if row.get("itemType") == "lexical_entry"]
        if ingress.get("turnCount") != len(turns) or ingress.get("vocabularyCount") != len(vocabulary):
            fail("dialog source type counts mismatch")
        if [row.get("turn") for row in turns] != list(range(1, len(turns) + 1)):
            fail("dialog turn numbering drift")
        if any((row.get("source") or {}).get("english") is not None for row in turns):
            fail("dialog turn English must remain null when not supplied")
        previous_field = find_field(fields, ["previous_turn_id"], "items.tsv")
        next_field = find_field(fields, ["next_turn_id"], "items.tsv")
        rows_by_id = {row[id_field]: row for row in rows}
        turn_ids = [row["id"] for row in turns]
        for index, item_id in enumerate(turn_ids):
            expected_previous = "" if index == 0 else turn_ids[index - 1]
            expected_next = "" if index == len(turn_ids) - 1 else turn_ids[index + 1]
            row = rows_by_id[item_id]
            if row[previous_field] != expected_previous or row[next_field] != expected_next:
                fail(f"dialog source adjacency drift: {item_id}")
        for row in vocabulary:
            tsv = rows_by_id[row["id"]]
            if tsv[previous_field] or tsv[next_field]:
                fail(f"lexical row carries dialog adjacency: {row['id']}")
    return items, source_ids


def verify_runtime_crosswalk(
    root: Path,
    package: Path,
    source_id: str,
    payload_hash: str,
    source_items: list[dict[str, Any]],
) -> set[str]:
    path = package / "runtime-crosswalk-r1.json"
    if not path.exists():
        return set()
    packet = load_json(path)
    if packet.get("schema") != "canto-span-pedagogical-runtime-crosswalk-v1":
        fail("unexpected pedagogical runtime-crosswalk schema")
    if packet.get("source_id") != source_id or packet.get("source_payload_hash") != payload_hash:
        fail("runtime-crosswalk source identity mismatch")
    pull_request = packet.get("runtime_pull_request")
    merge_commit = packet.get("runtime_merge_commit")
    provenance_path = packet.get("provenance_path")
    if not isinstance(pull_request, int) or pull_request <= 0:
        fail("runtime-crosswalk pull request missing")
    if not isinstance(merge_commit, str) or not re.fullmatch(r"[0-9a-f]{40}", merge_commit):
        fail("runtime-crosswalk merge commit malformed")
    if not isinstance(provenance_path, str) or not provenance_path or not (root / provenance_path).is_file():
        fail("runtime-crosswalk provenance path missing")
    records = packet.get("records")
    if not isinstance(records, list):
        fail("runtime-crosswalk records must be an array")
    ids = stable_ids(records, "runtime-crosswalk records")
    if packet.get("record_count") != len(records):
        fail("runtime-crosswalk record count mismatch")
    source_by_id = {row["id"]: row for row in source_items}
    for row in records:
        item_id = row["id"]
        source = source_by_id.get(item_id)
        if source is None or source.get("itemType") != "lexical_entry":
            fail(f"runtime-crosswalk references a nonlexical or missing source item: {item_id}")
        if row.get("source_hash") != source.get("sourceHash"):
            fail(f"runtime-crosswalk source hash drift: {item_id}")
        link = row.get("runtime_crosswalk")
        if not isinstance(link, dict) or link.get("status") != "merged_runtime_crosswalk":
            fail(f"runtime-crosswalk implementation link missing: {item_id}")
        if link.get("pullRequest") != pull_request or link.get("mergeCommit") != merge_commit:
            fail(f"runtime-crosswalk implementation identity mismatch: {item_id}")
        if link.get("provenancePath") != provenance_path:
            fail(f"runtime-crosswalk provenance projection mismatch: {item_id}")
        if not isinstance(row.get("source_discrepancies"), list):
            fail(f"runtime-crosswalk source discrepancies malformed: {item_id}")
        if not isinstance(row.get("reviewed_values"), dict):
            fail(f"runtime-crosswalk reviewed values malformed: {item_id}")
    return set(ids)


def verify_legacy_reconciliation(
    root: Path,
    package: Path,
    source_id: str,
    payload_hash: str,
    source_items: list[dict[str, Any]],
    review: dict[str, Any],
) -> set[str]:
    path = package / "legacy-reconciliation-r1.json"
    if not path.exists():
        return set()
    for required in ["crosswalk.json", "project-only-review-r1.json", "evidence-sources-r1.json"]:
        if not (package / required).is_file():
            fail(f"legacy reconciliation companion missing: {required}")
    packet = load_json(path)
    if packet.get("schema") != "canto-span-pedagogical-corpus-legacy-reconciliation-v1":
        fail("unexpected legacy reconciliation schema")
    if packet.get("source_id") != source_id or packet.get("source_payload_hash") != payload_hash:
        fail("legacy reconciliation source identity mismatch")
    if packet.get("origin_pull_request") != 277 or packet.get("origin_merge_commit") != "18e285c92b639f56e6b0eb08543e42ce7c66151e":
        fail("legacy reconciliation origin identity mismatch")

    crosswalk_data = read_bytes(package / "crosswalk.json")
    crosswalk = load_json(package / "crosswalk.json")
    crosswalk_lock = packet.get("original_crosswalk") or {}
    expected_crosswalk = {
        "path": "crosswalk.json",
        "bytes": len(crosswalk_data),
        "sha256": sha256_hex(crosswalk_data),
        "git_blob_sha": git_blob_sha(crosswalk_data),
    }
    if crosswalk_lock != expected_crosswalk:
        fail("legacy crosswalk lock drift")
    if crosswalk.get("sourceId") != source_id or crosswalk.get("sourcePayloadHash") != payload_hash:
        fail("original legacy crosswalk identity mismatch")

    legacy_files = packet.get("legacy_files")
    if not isinstance(legacy_files, list) or len(legacy_files) != 8:
        fail("legacy file snapshot must contain eight files")
    registered_paths = set((crosswalk.get("existingWeek17Inputs") or {}).values())
    snapshot_paths = {row.get("path") for row in legacy_files if isinstance(row, dict)}
    if snapshot_paths != registered_paths:
        fail("legacy file snapshot path set mismatch")
    table_ids: dict[str, set[str]] = {}
    pass_cells = 0
    promoted_cells = 0
    for row in legacy_files:
        path_value = row["path"]
        data = read_bytes(root / path_value)
        fields, rows = load_tsv(root / path_value)
        expected = {
            "path": path_value,
            "bytes": len(data),
            "sha256": sha256_hex(data),
            "git_blob_sha": git_blob_sha(data),
            "row_count": len(rows),
            "fields": fields,
        }
        if row != expected:
            fail(f"legacy project file drift: {path_value}")
        table_ids[path_value] = {value["id"] for value in rows if value.get("id")}
        for value in rows:
            pass_cells += sum(cell == "PASS" for cell in value.values())
            promoted_cells += sum(cell == "PROMOTED_ACCEPTED" for cell in value.values())
    if pass_cells != 162 or promoted_cells != 131:
        fail("legacy status-cell baseline drift")

    records = packet.get("records")
    if not isinstance(records, list):
        fail("legacy reconciliation records must be an array")
    ids = stable_ids(records, "legacy reconciliation records")
    source_ids = [row["id"] for row in source_items]
    if ids != source_ids or packet.get("record_count") != len(source_ids):
        fail("legacy reconciliation IDs/order/count mismatch")
    crosswalk_rows = crosswalk.get("records")
    if not isinstance(crosswalk_rows, list):
        fail("original legacy crosswalk records missing")
    original_by_id = {row["sourceItemId"]: row for row in crosswalk_rows}
    source_by_id = {row["id"]: row for row in source_items}
    for row in records:
        item_id = row["id"]
        original = original_by_id.get(item_id)
        if original is None:
            fail(f"legacy reconciliation record lacks original crosswalk row: {item_id}")
        if row.get("source_hash") != source_by_id[item_id].get("sourceHash"):
            fail(f"legacy reconciliation source hash drift: {item_id}")
        comparisons = {
            "legacy_classification": original.get("classification"),
            "source_repeat_of": original.get("sourceRepeatOf"),
            "existing_project_records": original.get("existingProjectRecords", []),
            "canonical_lexicon_owners": original.get("canonicalLexiconOwners", []),
            "parser_owner_candidates": original.get("canonicalParserOwnerCandidates", []),
            "reviewed_utterance_type": original.get("reviewedUtteranceType"),
            "inherited_discrepancies": original.get("discrepancies", []),
        }
        for field, expected in comparisons.items():
            if row.get(field) != expected:
                fail(f"legacy reconciliation projection drift: {item_id}: {field}")
        repeat_of = row.get("source_repeat_of")
        expected_target = str(Path("data/pedagogical-corpus/glossika") / source_id / "source.json") if repeat_of else None
        if row.get("source_repeat_target_path") != expected_target:
            fail(f"legacy source-repeat target drift: {item_id}")
        for ref in row.get("existing_project_records", []):
            if ref.get("path") not in table_ids or ref.get("id") not in table_ids[ref["path"]]:
                fail(f"legacy project record reference is unresolved: {item_id}: {ref}")
        if row.get("inherited_authority_status") != "unverified_project_history":
            fail(f"legacy project assertion was elevated without evidence: {item_id}")
        evidence_ids = row.get("independent_evidence_ids")
        expected_ids = ["W17-PRON-CUHK-FUT3", "W17-PRON-CTEXT-FUT3"] if item_id.endswith("I074") else []
        if evidence_ids != expected_ids:
            fail(f"legacy independent-evidence linkage drift: {item_id}")

    evidence = load_json(package / "evidence-sources-r1.json")
    if evidence.get("schema") != "canto-span-pedagogical-corpus-independent-evidence-v1":
        fail("unexpected Week 17 independent-evidence schema")
    claims = evidence.get("claims")
    if not isinstance(claims, list) or {row.get("id") for row in claims} != {"W17-PRON-CUHK-FUT3", "W17-PRON-CTEXT-FUT3"}:
        fail("Week 17 independent pronunciation sources changed")
    for claim in claims:
        if claim.get("evidence_grade") != "LEXICAL_OR_PRONUNCIATION_ONLY" or "fut3" not in str(claim.get("supported_claim")):
            fail("Week 17 independent evidence exceeds pronunciation scope")
    decision = evidence.get("decision") or {}
    if decision.get("source_item_id") != f"{source_id}-I074" or decision.get("source_value") != "hyut3|kut3":
        fail("Week 17 pronunciation decision source projection drift")
    if decision.get("reviewed_value") != "hyut3|fut3" or decision.get("corrected_reading") != "fut3":
        fail("Week 17 independently verified pronunciation value drift")
    if decision.get("source_mutated") is not False or decision.get("scope") != "pronunciation_only":
        fail("Week 17 pronunciation correction exceeded its evidence boundary")

    project_only = load_json(package / "project-only-review-r1.json")
    raw_project_only = crosswalk.get("projectOnlyRecords") or crosswalk.get("projectOnlyItems") or []
    project_rows = project_only.get("records")
    if project_only.get("schema") != "canto-span-pedagogical-corpus-project-only-review-v1":
        fail("unexpected project-only review schema")
    if not isinstance(project_rows, list) or len(project_rows) != 5 or project_only.get("record_count") != 5:
        fail("Week 17 project-only review count mismatch")
    if [row.get("id") for row in project_rows] != [row.get("id") for row in raw_project_only]:
        fail("Week 17 project-only IDs/order drift")
    for reviewed, original in zip(project_rows, raw_project_only):
        for key, value in original.items():
            if reviewed.get(key) != value:
                fail(f"project-only historical projection drift: {reviewed.get('id')}: {key}")
        if reviewed.get("authority_status") != "unverified_project_probe" or reviewed.get("evidence_use_disposition") != "not_source_attestation":
            fail(f"project-only probe was elevated without evidence: {reviewed.get('id')}")
        if reviewed.get("runtime_or_status_authorization") != "none":
            fail(f"project-only probe authorizes runtime or status change: {reviewed.get('id')}")

    review_rows = review.get("records")
    if not isinstance(review_rows, list):
        fail("review rows missing for legacy linkage")
    for row in review_rows:
        item_id = row["id"]
        if row.get("legacy_reconciliation_status") != original_by_id[item_id].get("classification"):
            fail(f"review legacy classification drift: {item_id}")
        if row.get("inherited_project_authority") != "unverified_project_history":
            fail(f"review inherited project authority was elevated: {item_id}")
        expected_ids = ["W17-PRON-CUHK-FUT3", "W17-PRON-CTEXT-FUT3"] if item_id.endswith("I074") else []
        if row.get("independent_evidence_ids") != expected_ids:
            fail(f"review independent-evidence linkage drift: {item_id}")
    return set(ids)


def verify_bounded_implementation_crosswalk(
    root: Path,
    package: Path,
    source_id: str,
    payload_hash: str,
    source_items: list[dict[str, Any]],
) -> set[str]:
    path = package / "implementation-crosswalk-r1.json"
    if not path.exists():
        return set()
    if not (package / "crosswalk.json").is_file():
        fail("bounded implementation crosswalk lacks original crosswalk")
    packet = load_json(path)
    if packet.get("schema") != "canto-span-pedagogical-corpus-implementation-crosswalk-v1":
        fail("unexpected bounded implementation-crosswalk schema")
    if packet.get("source_id") != source_id or packet.get("source_payload_hash") != payload_hash:
        fail("bounded implementation-crosswalk source identity mismatch")
    if packet.get("origin_pull_request") != 280 or packet.get("origin_merge_commit") != "6924651c8048c4bc74d5b3eac47f4c49a6a8d6c5":
        fail("bounded implementation-crosswalk origin identity mismatch")
    crosswalk_data = read_bytes(package / "crosswalk.json")
    crosswalk_lock = packet.get("original_crosswalk") or {}
    expected_lock = {
        "path": "crosswalk.json",
        "bytes": len(crosswalk_data),
        "sha256": sha256_hex(crosswalk_data),
        "git_blob_sha": git_blob_sha(crosswalk_data),
    }
    if crosswalk_lock != expected_lock:
        fail("bounded implementation original crosswalk lock drift")
    original = load_json(package / "crosswalk.json")
    if original.get("sourceId") != source_id or original.get("sourcePayloadHash") != payload_hash:
        fail("original Week 18 crosswalk identity mismatch")
    original_rows = original.get("records")
    records = packet.get("records")
    if not isinstance(original_rows, list) or not isinstance(records, list):
        fail("bounded implementation-crosswalk records missing")
    source_ids = [row["id"] for row in source_items]
    ids = stable_ids(records, "bounded implementation-crosswalk records")
    if ids != source_ids or packet.get("record_count") != len(source_ids):
        fail("bounded implementation-crosswalk IDs/order/count mismatch")
    original_by_id = {row["sourceItemId"]: row for row in original_rows}
    source_by_id = {row["id"]: row for row in source_items}
    target_ids: set[str] = set()
    parser_hint_records = 0
    for row in records:
        item_id = row["id"]
        source = source_by_id[item_id]
        old = original_by_id.get(item_id)
        if old is None or row.get("source_hash") != source.get("sourceHash"):
            fail(f"bounded implementation source projection drift: {item_id}")
        comparisons = {
            "source_classification": old.get("classification"),
            "compositional_numeral": bool(old.get("compositionalNumeral")),
            "parser_owner_hints": old.get("canonicalParserOwnerCandidates", []),
            "exact_project_occurrence_paths": old.get("exactProjectMatchPaths", []),
        }
        for field, expected in comparisons.items():
            if row.get(field) != expected:
                fail(f"bounded implementation crosswalk projection drift: {item_id}: {field}")
        if row.get("authority_status") != "bounded_implementation_observation":
            fail(f"bounded implementation observation elevated: {item_id}")
        if row.get("parser_hint_authority") != "heuristic_search_hint_only":
            fail(f"parser-owner hint elevated without audit: {item_id}")
        if row.get("implementation_authorized") is not False:
            fail(f"bounded implementation packet authorizes change: {item_id}")
        expected_paths = list(old.get("canonicalLexiconOwners", [])) + list(old.get("canonicalPronunciationOwners", []))
        targets = row.get("implementation_targets")
        if not isinstance(targets, list) or [target.get("path") for target in targets] != expected_paths:
            fail(f"bounded implementation target projection drift: {item_id}")
        for target in targets:
            if not isinstance(target, dict) or not all(
                isinstance(target.get(key), str) and target[key]
                for key in ["path", "target_type", "basis"]
            ):
                fail(f"malformed bounded implementation target: {item_id}")
            if not (root / target["path"]).is_file():
                fail(f"bounded implementation target path missing: {item_id}: {target['path']}")
        target_paths = {target["path"] for target in targets}
        if target_paths.intersection(row.get("parser_owner_hints", [])):
            fail(f"parser hint promoted into implementation target: {item_id}")
        if targets:
            target_ids.add(item_id)
        if row.get("parser_owner_hints"):
            parser_hint_records += 1
    if packet.get("target_record_count") != len(target_ids) or len(target_ids) != 39:
        fail("bounded implementation target count mismatch")
    if packet.get("parser_hint_record_count") != parser_hint_records or parser_hint_records != 33:
        fail("bounded parser-hint count mismatch")
    return target_ids


def verify_week18_research_routing(
    root: Path,
    package: Path,
    source_id: str,
    payload_hash: str,
    source_items: list[dict[str, Any]],
    review: dict[str, Any],
) -> set[str]:
    path = package / "research-routing-r1.json"
    if not path.exists():
        return set()
    packet = load_json(path)
    if packet.get("schema") != "canto-span-pedagogical-corpus-research-routing-v1":
        fail("unexpected Week 18 research-routing schema")
    if packet.get("source_id") != source_id or packet.get("source_payload_hash") != payload_hash:
        fail("Week 18 research-routing source identity mismatch")
    if packet.get("origin_pull_request") != 282 or packet.get("origin_merge_commit") != "31d5dd20de80f2a86d5bf40cdefea5aec9764bd8":
        fail("Week 18 research-routing origin identity mismatch")
    if packet.get("route_owner_issue") != 481:
        fail("Week 18 research routes lack their durable owner")
    ledger_files = packet.get("ledger_files")
    if not isinstance(ledger_files, list) or len(ledger_files) != 4:
        fail("Week 18 research-routing ledger lock count mismatch")
    ledgers: dict[str, dict[str, Any]] = {}
    for row in ledger_files:
        path_value = row.get("path")
        if not isinstance(path_value, str):
            fail("Week 18 ledger lock path missing")
        data = read_bytes(root / path_value)
        ledger = load_json(root / path_value)
        expected = {
            "path": path_value,
            "bytes": len(data),
            "sha256": sha256_hex(data),
            "git_blob_sha": git_blob_sha(data),
            "schema": ledger.get("schema"),
            "packet_id": ledger.get("packetId"),
        }
        if row != expected:
            fail(f"Week 18 retained research ledger drift: {path_value}")
        ledgers[path_value] = ledger
    claim_ledger = next(value for value in ledgers.values() if value.get("packetId") == "GLOSSIKA-YUEHK-A1-W18-20260719-CLAIM-SOURCE-R1")
    followup_ledger = next(value for value in ledgers.values() if value.get("packetId") == "GLOSSIKA-YUEHK-A1-W18-20260719-FOLLOWUP-R1")
    claims = packet.get("claims")
    routes = packet.get("routes")
    item_routes = packet.get("item_routes")
    non_candidates = packet.get("non_candidate_routes")
    if not all(isinstance(value, list) for value in [claims, routes, item_routes, non_candidates]):
        fail("Week 18 research-routing arrays missing")
    original_claims = {row["id"]: row for row in claim_ledger.get("claims", [])}
    if {row.get("id") for row in claims} != set(original_claims) or packet.get("claim_count") != 16:
        fail("Week 18 research claim set drift")
    source_ids = [row["id"] for row in source_items]
    source_id_set = set(source_ids)
    expected_claim_applications = {
        "W18-C01": [f"{source_id}-I{number:03d}" for number in range(1, 5)],
        "W18-C02": [f"{source_id}-I001"],
        "W18-C03": [f"{source_id}-I002"],
        "W18-C04": [f"{source_id}-I{number:03d}" for number in range(5, 9)],
        "W18-C05": [f"{source_id}-I005", f"{source_id}-I008"],
        "W18-C06": [f"{source_id}-I072"],
        "W18-C07": [f"{source_id}-I075", f"{source_id}-I077"],
        "W18-C08": [f"{source_id}-I078"],
        "W18-C09": [f"{source_id}-I079"],
        "W18-C10": [f"{source_id}-I079"],
        "W18-C11": [f"{source_id}-I{number:03d}" for number in range(9, 34)],
        "W18-C12": [f"{source_id}-I{number:03d}" for number in range(34, 62)],
        "W18-C13": [f"{source_id}-I{number:03d}" for number in [34, 36, 37, 38, 45, 46, 59, 60, 61]],
        "W18-C14": [f"{source_id}-I{number:03d}" for number in range(62, 72)],
        "W18-C15": [f"{source_id}-I{number:03d}" for number in range(80, 91)],
        "W18-C16": [f"{source_id}-I{number:03d}" for number in range(94, 100)],
    }
    claim_ids_by_item: dict[str, list[str]] = {item_id: [] for item_id in source_ids}
    for row in claims:
        claim_id = row["id"]
        original = original_claims[claim_id]
        for field in ["claim", "status", "sourceIds", "boundary"]:
            if row.get(field) != original.get(field):
                fail(f"Week 18 research claim projection drift: {claim_id}: {field}")
        applicable = row.get("applicable_source_item_ids")
        if applicable != expected_claim_applications.get(claim_id):
            fail(f"Week 18 research claim source mapping drift: {claim_id}")
        if row.get("authority_status") != "retained_bounded_research_claim" or row.get("implementation_authorized") is not False:
            fail(f"Week 18 research claim exceeds its authority: {claim_id}")
        for item_id in applicable:
            claim_ids_by_item[item_id].append(claim_id)
    original_routes = {row["id"]: row for row in followup_ledger.get("candidates", [])}
    if {row.get("id") for row in routes} != set(original_routes) or packet.get("route_count") != 13:
        fail("Week 18 follow-up route set drift")
    expected_route_states = {
        "W18-F01": "open_research_dependency",
        "W18-F02": "open_research_dependency",
        "W18-F03": "open_research_dependency",
        "W18-F04": "open_research_dependency",
        "W18-F05": "open_research_dependency",
        "W18-F06": "open_parser_audit_dependency",
        "W18-F07": "open_mixed_research_and_parser_audit_dependency",
        "W18-F08": "open_research_dependency",
        "W18-F09": "open_research_dependency",
        "W18-F10": "open_lexical_review_dependency",
        "W18-F11": "open_lexical_register_research_dependency",
        "W18-F12": "open_research_family_dependency",
        "W18-F13": "open_phonological_review_dependency",
    }
    route_ids_by_item: dict[str, list[str]] = {item_id: [] for item_id in source_ids}
    route_ids: set[str] = set()
    for row in routes:
        route_id = row["id"]
        original = original_routes[route_id]
        comparisons = {
            "cluster": original.get("cluster"),
            "declared_source_item_ids": original.get("sourceItemIds", []),
            "reason": original.get("reason"),
            "priority": original.get("priority"),
            "next_method": original.get("nextMethod"),
            "blocked_actions": original.get("blockedActions", []),
        }
        for field, expected in comparisons.items():
            if row.get(field) != expected:
                fail(f"Week 18 follow-up route projection drift: {route_id}: {field}")
        resolved = row.get("resolved_source_item_ids")
        if not isinstance(resolved, list) or not resolved or not set(resolved).issubset(source_id_set):
            fail(f"Week 18 resolved follow-up source IDs malformed: {route_id}")
        if route_id == "W18-F11" and resolved != [f"{source_id}-I{number:03d}" for number in range(34, 62)]:
            fail("Week 18 temporal route source coverage drift")
        if route_id != "W18-F11" and resolved != original.get("sourceItemIds", []):
            fail(f"Week 18 follow-up source IDs changed without reconciliation: {route_id}")
        if row.get("terminal_route_state") != expected_route_states.get(route_id):
            fail(f"Week 18 follow-up terminal route state drift: {route_id}")
        if row.get("route_owner_issue") != 481 or row.get("implementation_authorized") is not False:
            fail(f"Week 18 follow-up route lacks owner or authorizes change: {route_id}")
        for item_id in resolved:
            route_ids_by_item[item_id].append(route_id)
        route_ids.add(route_id)
    if packet.get("non_candidate_route_count") != 1 or len(non_candidates) != 1:
        fail("Week 18 non-candidate route count mismatch")
    non_candidate = non_candidates[0]
    original_non_candidate = followup_ledger.get("nonCandidates", [None])[0]
    declared = [f"{source_id}-I{number:03d}" for number in range(61, 71)]
    resolved = [f"{source_id}-I{number:03d}" for number in range(62, 72)]
    if non_candidate.get("declared_source_item_ids") != declared or original_non_candidate.get("sourceItemIds") != declared:
        fail("Week 18 original numeral non-candidate ID range changed")
    if non_candidate.get("resolved_source_item_ids") != resolved:
        fail("Week 18 resolved numeral non-candidate ID range drift")
    if non_candidate.get("declared_id_status") != "source_id_range_off_by_one":
        fail("Week 18 numeral route provenance defect is not recorded")
    if non_candidate.get("disposition") != original_non_candidate.get("disposition"):
        fail("Week 18 numeral non-candidate disposition drift")
    if non_candidate.get("terminal_route_state") != "completed_by_retained_compositional_numeral_decision":
        fail("Week 18 numeral non-candidate route is not terminal")
    if non_candidate.get("route_owner_issue") != 481 or non_candidate.get("implementation_authorized") is not False:
        fail("Week 18 numeral non-candidate route exceeds scope")
    non_candidate_by_item: dict[str, list[str]] = {item_id: [] for item_id in source_ids}
    for item_id in resolved:
        non_candidate_by_item[item_id].append("W18-N01")
    if stable_ids(item_routes, "Week 18 item routes") != source_ids:
        fail("Week 18 item-route IDs/order drift")
    review_by_id = {row["id"]: row for row in review.get("records", [])}
    for row in item_routes:
        item_id = row["id"]
        expected_claims = sorted(claim_ids_by_item[item_id])
        expected_routes = sorted(route_ids_by_item[item_id])
        expected_non_candidates = sorted(non_candidate_by_item[item_id])
        if row.get("claim_ids") != expected_claims or row.get("route_ids") != expected_routes or row.get("non_candidate_route_ids") != expected_non_candidates:
            fail(f"Week 18 item-route projection drift: {item_id}")
        reviewed = review_by_id[item_id]
        if reviewed.get("research_claim_ids") != expected_claims or reviewed.get("research_route_ids") != expected_routes or reviewed.get("research_non_candidate_route_ids") != expected_non_candidates:
            fail(f"Week 18 review research-route linkage drift: {item_id}")
    return route_ids



def verify_research_routing(
    root: Path,
    package: Path,
    source_id: str,
    payload_hash: str,
    source_items: list[dict[str, Any]],
    review: dict[str, Any],
) -> set[str]:
    if source_id == "GLOSSIKA-YUEHK-A1-W19-20260726":
        return verify_week19_research_routing(root, package, source_id, payload_hash, source_items, review)
    if source_id == "GLOSSIKA-YUEHK-A1-DLG-002-20251207":
        return verify_dialog_context_routing(root, package, source_id, payload_hash, source_items, review)
    return verify_week18_research_routing(root, package, source_id, payload_hash, source_items, review)


def allowed_duplicate_paths(crossref_row: dict[str, Any], normalized: bool) -> set[str]:
    field = "normalized_match_candidates" if normalized else "exact_match_candidates"
    output = {
        match.get("path")
        for match in crossref_row.get(field, [])
        if isinstance(match, dict) and isinstance(match.get("path"), str)
    }
    if not normalized:
        for link in crossref_row.get("later_research_links", []):
            if isinstance(link, dict):
                output.update(owner for owner in link.get("exact_runtime_owners", []) if isinstance(owner, str))
                if link.get("kind") == "legacy_project_reconciliation" and isinstance(link.get("source_repeat_target_path"), str):
                    output.add(link["source_repeat_target_path"])
    return output



def verify_week19_role_sensitive_crosswalk(
    root: Path,
    package: Path,
    source_id: str,
    payload_hash: str,
    source_items: list[dict[str, Any]],
) -> set[str]:
    path = package / "role-sensitive-crosswalk-r1.json"
    if not path.exists():
        return set()
    packet = load_json(path)
    if packet.get("schema") != "canto-span-pedagogical-corpus-role-sensitive-crosswalk-v1":
        fail("unexpected Week 19 role-sensitive crosswalk schema")
    if packet.get("source_id") != source_id or packet.get("source_payload_hash") != payload_hash:
        fail("Week 19 role-sensitive crosswalk identity mismatch")
    if packet.get("origin_pull_request") != 285 or packet.get("origin_merge_commit") != "763bfabd0bfb5a57ed8e95a684217a51d158d3e1":
        fail("Week 19 corpus-origin identity mismatch")
    if packet.get("research_pull_request") != 287 or packet.get("research_merge_commit") != "6938b4a457daab2a46e95a603f5093fa8458eecc":
        fail("Week 19 research-origin identity mismatch")
    if packet.get("unit_word_pull_request") != 362 or packet.get("unit_word_merge_commit") != "9229799d6373e3f1bd93e0cb2816a65e6ae52a95":
        fail("Week 19 unit-word-origin identity mismatch")
    data = read_bytes(package / "crosswalk.json")
    expected_lock = {"path": "crosswalk.json", "bytes": len(data), "sha256": sha256_hex(data), "git_blob_sha": git_blob_sha(data)}
    if packet.get("original_crosswalk") != expected_lock:
        fail("Week 19 original crosswalk lock drift")
    original = load_json(package / "crosswalk.json")
    original_rows = original.get("records")
    records = packet.get("records")
    if not isinstance(original_rows, list) or not isinstance(records, list):
        fail("Week 19 role-sensitive records missing")
    source_ids = [row["id"] for row in source_items]
    if stable_ids(records, "Week 19 role-sensitive records") != source_ids or packet.get("summary", {}).get("record_count") != 76:
        fail("Week 19 role-sensitive IDs/order/count drift")
    original_by_id = {row["sourceItemId"]: row for row in original_rows}
    source_by_id = {row["id"]: row for row in source_items}
    target_ids: set[str] = set()
    classifier_exact = 0
    classifier_gaps: list[str] = []
    candidate_ids: list[str] = []
    for row in records:
        item_id = row["id"]
        source = source_by_id[item_id]
        old = original_by_id[item_id]
        if row.get("source_hash") != source.get("sourceHash"):
            fail(f"Week 19 role-sensitive source hash drift: {item_id}")
        if row.get("source_classification") != old.get("classification") or row.get("compositional_numeral") != bool(old.get("compositionalNumeral")):
            fail(f"Week 19 original classification projection drift: {item_id}")
        if row.get("orthographic_token_owner_paths") != old.get("canonicalRuntimeResourceOwners", []):
            fail(f"Week 19 token-owner projection drift: {item_id}")
        if row.get("parser_owner_hints") != old.get("canonicalParserOwnerCandidates", []):
            fail(f"Week 19 parser-hint projection drift: {item_id}")
        if row.get("parser_hint_authority") != "heuristic_search_hint_only":
            fail(f"Week 19 parser hint elevated: {item_id}")
        if row.get("authority_status") != "role_sensitive_implementation_observation_only":
            fail(f"Week 19 role observation elevated: {item_id}")
        if row.get("implementation_authorized") is not False or row.get("status_change_authorized") is not False:
            fail(f"Week 19 role packet authorizes change: {item_id}")
        targets = row.get("role_specific_targets")
        if not isinstance(targets, list):
            fail(f"Week 19 role targets malformed: {item_id}")
        target_paths = set()
        for target in targets:
            if not isinstance(target, dict) or not all(isinstance(target.get(key), str) and target[key] for key in ["path", "target_type", "basis"]):
                fail(f"Week 19 role target malformed: {item_id}")
            if not (root / target["path"]).is_file():
                fail(f"Week 19 role target path missing: {item_id}: {target['path']}")
            target_paths.add(target["path"])
        if target_paths.intersection(row.get("unrelated_or_homographic_owner_paths", [])):
            fail(f"Week 19 homographic owner promoted as role owner: {item_id}")
        if target_paths.intersection(row.get("parser_owner_hints", [])):
            fail(f"Week 19 parser hint promoted as role owner: {item_id}")
        state = row.get("role_specific_coverage_state")
        if state == "exact_classifier_rule_observed":
            classifier_exact += 1
            if target_paths != {"src/runtime-resources/grammar/classifier-head-rules.js"}:
                fail(f"Week 19 exact classifier rule target drift: {item_id}")
        if state == "classifier_rule_gap":
            classifier_gaps.append(source_text_for_verifier(source))
            if targets:
                fail(f"Week 19 classifier gap has a role target: {item_id}")
        candidates = row.get("controlled_specification_candidates")
        if not isinstance(candidates, list):
            fail(f"Week 19 unit-word candidates malformed: {item_id}")
        for candidate in candidates:
            if candidate.get("downstream_policy") != "candidate_for_later_controlled_implementation":
                fail(f"Week 19 unit-word candidate authority drift: {item_id}")
            candidate_ids.append(candidate.get("evidence_id"))
        if row.get("accepted_noun_pairs") != []:
            fail(f"Week 19 noun pair promoted without authorization: {item_id}")
        if targets:
            target_ids.add(item_id)
    summary = packet.get("summary") or {}
    if classifier_exact != 10 or summary.get("classifier_exact_rule_records") != 10:
        fail("Week 19 exact classifier-rule count mismatch")
    if classifier_gaps != ["枝", "對", "把", "條"] or summary.get("classifier_rule_gap_records") != 4:
        fail("Week 19 classifier-rule gap set mismatch")
    if len(candidate_ids) != 9 or len(set(candidate_ids)) != 9 or summary.get("controlled_specification_candidate_rows") != 9:
        fail("Week 19 controlled-specification candidate count mismatch")
    if summary.get("accepted_noun_pair_count") != 0:
        fail("Week 19 noun-pair promotion count changed")
    return target_ids


def source_text_for_verifier(item: dict[str, Any]) -> str:
    source = item.get("source") or {}
    return str(source.get("traditional") or source.get("tone") or "")


def verify_week19_research_routing(
    root: Path,
    package: Path,
    source_id: str,
    payload_hash: str,
    source_items: list[dict[str, Any]],
    review: dict[str, Any],
) -> set[str]:
    path = package / "research-routing-r1.json"
    packet = load_json(path)
    if packet.get("source_id") != source_id or packet.get("source_payload_hash") != payload_hash:
        fail("Week 19 research-routing identity mismatch")
    if packet.get("origin_pull_request") != 287 or packet.get("origin_merge_commit") != "6938b4a457daab2a46e95a603f5093fa8458eecc":
        fail("Week 19 research-routing origin drift")
    if packet.get("route_owner_issue") != 484:
        fail("Week 19 routes lack durable owner #484")
    files = packet.get("research_files")
    if not isinstance(files, list) or len(files) != 13:
        fail("Week 19 research-file lock count mismatch")
    for row in files:
        relative = row.get("path")
        if not isinstance(relative, str):
            fail("Week 19 research-file path missing")
        data = read_bytes(root / relative)
        expected = {"path": relative, "bytes": len(data), "sha256": sha256_hex(data), "git_blob_sha": git_blob_sha(data)}
        if relative.endswith(".json"):
            ledger = load_json(root / relative)
            expected["schema"] = ledger.get("schema")
            expected["packet_id"] = ledger.get("packetId")
        if row != expected:
            fail(f"Week 19 retained research file drift: {relative}")
    source_ids = [row["id"] for row in source_items]
    source_set = set(source_ids)
    routes = packet.get("routes")
    claims = packet.get("claims")
    item_routes = packet.get("item_routes")
    if not all(isinstance(value, list) for value in [routes, claims, item_routes]):
        fail("Week 19 research-routing arrays missing")
    if packet.get("claim_count") != 16 or {row.get("id") for row in claims} != {f"W19-C{i:02d}" for i in range(1, 17)}:
        fail("Week 19 research claim set drift")
    for claim in claims:
        applicable = claim.get("applicable_source_item_ids")
        if not isinstance(applicable, list) or not applicable or not set(applicable).issubset(source_set):
            fail(f"Week 19 claim mapping malformed: {claim.get('id')}")
        if claim.get("authority_status") != "retained_bounded_research_claim" or claim.get("implementation_authorized") is not False:
            fail(f"Week 19 claim authority elevated: {claim.get('id')}")
    if packet.get("route_count") != 12 or {row.get("id") for row in routes} != {f"W19-F{i:02d}" for i in range(1, 13)}:
        fail("Week 19 route set drift")
    route_ids: set[str] = set()
    for route in routes:
        route_id = route["id"]
        resolved = route.get("resolved_source_item_ids")
        if not isinstance(resolved, list) or not resolved or not set(resolved).issubset(source_set):
            fail(f"Week 19 route mapping malformed: {route_id}")
        if route_id == "W19-F10":
            expected = [f"{source_id}-I{number:03d}" for number in range(26, 49)]
            if route.get("declared_source_item_ids") != [] or resolved != expected or route.get("declared_id_status") != "empty_source_id_array_reconciled":
                fail("Week 19 spatial route reconciliation drift")
        elif resolved != route.get("declared_source_item_ids"):
            fail(f"Week 19 route IDs changed without reconciliation: {route_id}")
        if route.get("route_owner_issue") != 484 or route.get("implementation_authorized") is not False:
            fail(f"Week 19 route exceeds authority: {route_id}")
        if route_id == "W19-F03":
            result = route.get("completed_result") or {}
            if route.get("terminal_route_state") != "completed_item_level_pronunciation_review" or result.get("source_value") != "gaa2" or result.get("reviewed_value") != "gaa3" or result.get("source_mutated") is not False:
                fail("Week 19 架 pronunciation route drift")
        elif not str(route.get("terminal_route_state", "")).startswith("open_"):
            fail(f"Week 19 unresolved route falsely completed: {route_id}")
        route_ids.add(route_id)
    non_candidates = packet.get("non_candidate_routes")
    if packet.get("non_candidate_route_count") != 1 or not isinstance(non_candidates, list) or len(non_candidates) != 1:
        fail("Week 19 numeral non-candidate route count mismatch")
    numeral = non_candidates[0]
    expected_numerals = [f"{source_id}-I{number:03d}" for number in range(53, 63)]
    if numeral.get("declared_source_item_ids") != expected_numerals or numeral.get("resolved_source_item_ids") != expected_numerals or numeral.get("terminal_route_state") != "completed_by_retained_compositional_numeral_decision":
        fail("Week 19 compositional numeral route drift")
    unit_summary = packet.get("unit_word_summary") or {}
    if unit_summary.get("reviewed_surface_count") != 44 or unit_summary.get("controlled_specification_candidate_count") != 9 or unit_summary.get("accepted_or_promoted_noun_pair_count") != 0:
        fail("Week 19 unit-word summary drift")
    if stable_ids(item_routes, "Week 19 item routes") != source_ids:
        fail("Week 19 item-route IDs/order drift")
    review_by_id = {row["id"]: row for row in review.get("records", [])}
    for row in item_routes:
        item_id = row["id"]
        reviewed = review_by_id[item_id]
        comparisons = {
            "research_claim_ids": row.get("claim_ids"),
            "research_route_ids": row.get("route_ids"),
            "research_non_candidate_route_ids": row.get("non_candidate_route_ids"),
            "controlled_specification_candidate_ids": row.get("controlled_specification_candidate_ids"),
        }
        for field, expected in comparisons.items():
            if reviewed.get(field) != expected:
                fail(f"Week 19 review route projection drift: {item_id}: {field}")
    return route_ids



def verifier_item_source_values(item: dict[str, Any]) -> tuple[Any, Any, Any]:
    values = item.get("source") or {}
    return values.get("traditional"), values.get("jyutping") or values.get("jyutpingLine") or values.get("romanizationLine"), values.get("english")


def verifier_normalize_surface(value: Any) -> str:
    return re.sub(r"[\s，。！？；：、,.!?;:'\"“”‘’（）()【】\[\]《》<>—–…·`~\/]+", "", str(value or "")).lower()


def verifier_normalize_jyutping(value: Any) -> str:
    text = str(value or "").strip().strip("/")
    if ":" in text:
        prefix, rest = text.split(":", 1)
        if len(prefix.split()) <= 4:
            text = rest
    return " ".join(re.findall(r"[a-z]+[1-6]", text.lower()))


def verifier_normalize_english(value: Any) -> str:
    text = str(value or "").lower()
    text = re.sub(r"[\[\](){},.;:!?/]+", " ", text)
    text = re.sub(r"\b(a|an|the)\b", " ", text)
    return " ".join(text.split())


def find_source_record(root: Path, path: str, record_id: str) -> dict[str, Any]:
    document = load_json(root / path)
    records = document.get("items")
    if not isinstance(records, list):
        fail(f"duplicate target source lacks items: {path}")
    matches = [row for row in records if row.get("id") == record_id]
    if len(matches) != 1:
        fail(f"duplicate target record missing or repeated: {path}: {record_id}")
    return matches[0]


def verify_dialog_duplicate_targets(root: Path, source_id: str, source_items: list[dict[str, Any]], review: dict[str, Any], crossref: dict[str, Any]) -> None:
    if source_id != "GLOSSIKA-YUEHK-A1-DLG-002-20251207":
        return
    source_by_id = {row["id"]: row for row in source_items}
    crossref_by_id = {row["id"]: row for row in crossref.get("records", [])}
    for row in review.get("records", []):
        terminal = row.get("terminal_ingress_classification")
        if terminal not in {"exact_duplicate", "normalized_duplicate"}:
            continue
        if len(row.get("accepted_duplicate_targets", [])) != 1:
            fail(f"dialog duplicate must have one canonical record owner: {row['id']}")
        target = row["accepted_duplicate_targets"][0]
        record_id = target.get("record_id")
        path_value = target.get("path")
        if not isinstance(record_id, str) or not isinstance(path_value, str):
            fail(f"dialog duplicate target lacks record identity: {row['id']}")
        candidate_field = "exact_match_candidates" if terminal == "exact_duplicate" else "normalized_match_candidates"
        candidates = {(candidate.get("path"), candidate.get("record_id")) for candidate in crossref_by_id[row["id"]].get(candidate_field, []) if isinstance(candidate, dict)}
        if (path_value, record_id) not in candidates:
            fail(f"dialog duplicate target is not a record-level candidate: {row['id']}")
        current_values = verifier_item_source_values(source_by_id[row["id"]])
        target_values = verifier_item_source_values(find_source_record(root, path_value, record_id))
        if terminal == "exact_duplicate":
            if current_values != target_values:
                fail(f"dialog exact duplicate source fields drift: {row['id']}")
        else:
            current_norm = verifier_normalize_surface(current_values[0]), verifier_normalize_jyutping(current_values[1]), verifier_normalize_english(current_values[2])
            target_norm = verifier_normalize_surface(target_values[0]), verifier_normalize_jyutping(target_values[1]), verifier_normalize_english(target_values[2])
            if current_norm != target_norm or current_values == target_values:
                fail(f"dialog normalized duplicate identity drift: {row['id']}")


def verify_dialog_context_routing(root: Path, package: Path, source_id: str, payload_hash: str, source_items: list[dict[str, Any]], review: dict[str, Any]) -> set[str]:
    if source_id != "GLOSSIKA-YUEHK-A1-DLG-002-20251207":
        return set()
    packet = load_json(package / "dialog-context-routing-r1.json")
    if packet.get("schema") != "canto-span-pedagogical-dialog-context-routing-v1":
        fail("unexpected dialog context-routing schema")
    if packet.get("source_id") != source_id or packet.get("source_payload_hash") != payload_hash:
        fail("dialog context-routing source identity mismatch")
    if packet.get("route_owner_issue") != 487:
        fail("dialog context routes lack durable owner")
    routes = packet.get("routes")
    item_routes = packet.get("item_routes")
    if not isinstance(routes, list) or not isinstance(item_routes, list):
        fail("dialog context-routing arrays missing")
    expected_route_ids = {f"D2-R{number:02d}" for number in range(1, 14)}
    route_ids = {row.get("route_id") for row in routes}
    if route_ids != expected_route_ids or packet.get("route_count") != 13:
        fail("dialog context route set drift")
    source_ids = [row["id"] for row in source_items]
    source_id_set = set(source_ids)
    route_ids_by_item = {item_id: [] for item_id in source_ids}
    for route in routes:
        if route.get("owner_issue") != 487:
            fail(f"dialog context route lacks owner: {route.get('route_id')}")
        if not isinstance(route.get("route_state"), str) or not isinstance(route.get("evidence_requirement"), str):
            fail(f"dialog context route lacks state or evidence requirement: {route.get('route_id')}")
        route_items = route.get("source_item_ids")
        if not isinstance(route_items, list) or not set(route_items).issubset(source_id_set):
            fail(f"dialog context route source IDs drift: {route.get('route_id')}")
        for item_id in route_items:
            route_ids_by_item[item_id].append(route["route_id"])
    if stable_ids(item_routes, "dialog context item routes") != source_ids:
        fail("dialog context item-route IDs/order drift")
    review_by_id = {row["id"]: row for row in review.get("records", [])}
    for row in item_routes:
        expected = sorted(route_ids_by_item[row["id"]])
        if row.get("route_ids") != expected or review_by_id[row["id"]].get("research_route_ids") != expected:
            fail(f"dialog context route projection drift: {row['id']}")
    naturalness = {f"{source_id}-{short}" for short in ["I003","I009","I017","I018","I020","I022","I023","I033","I034","I036"]}
    reviewed_naturalness = {row["id"] for row in review.get("records", []) if row.get("terminal_ingress_classification") == "naturalness_review_candidate"}
    if reviewed_naturalness != naturalness:
        fail("dialog naturalness candidate set drift")
    route12 = next(row for row in routes if row.get("route_id") == "D2-R12")
    if set(route12.get("source_item_ids", [])) != naturalness:
        fail("dialog naturalness route projection drift")
    aggregate_lock = packet.get("aggregate_map")
    aggregate_path = aggregate_lock.get("path") if isinstance(aggregate_lock, dict) else None
    if aggregate_path != "data/corpus-reviews/GLOSSIKA-YUEHK-A1-DLG-001-020-DECISION-MAP-R1.json":
        fail("dialog aggregate-map path drift")
    data = read_bytes(root / aggregate_path)
    aggregate = load_json(root / aggregate_path)
    expected_lock = {"path": aggregate_path, "bytes": len(data), "sha256": sha256_hex(data), "git_blob_sha": git_blob_sha(data), "schema": aggregate.get("schema"), "packet_id": aggregate.get("packet_id")}
    if aggregate_lock != expected_lock:
        fail("dialog aggregate-map lock drift")
    aggregate_turns = [row for row in aggregate.get("turns", []) if row.get("source_id") == source_id]
    if len(aggregate_turns) != 38:
        fail("dialog aggregate-map turn projection count drift")
    if any(row.get("previous_turn_id") is not None or row.get("next_turn_id") is not None for row in aggregate_turns):
        fail("dialog aggregate-map limitation no longer matches retained map")
    if packet.get("aggregate_adjacency_limitation") != {"dialog_turn_count":38,"aggregate_turns_with_null_previous_and_next":38,"source_package_adjacency_is_authoritative":True,"aggregate_map_is_not_rewritten":True}:
        fail("dialog aggregate adjacency limitation drift")
    turns = [row for row in source_items if row.get("itemType") == "dialog_turn"]
    adjacency = packet.get("source_adjacency")
    if not isinstance(adjacency, list) or stable_ids(adjacency, "dialog source adjacency") != [row["id"] for row in turns]:
        fail("dialog source adjacency projection drift")
    for index, row in enumerate(adjacency):
        expected_previous = None if index == 0 else turns[index - 1]["id"]
        expected_next = None if index == len(turns) - 1 else turns[index + 1]["id"]
        if row.get("previous_turn_id") != expected_previous or row.get("next_turn_id") != expected_next:
            fail(f"dialog source adjacency packet drift: {row['id']}")
    return route_ids


def verify_review(
    source: dict[str, Any],
    review: dict[str, Any],
    crossref: dict[str, Any],
    source_items: list[dict[str, Any]],
    source_ids: list[str],
) -> None:
    if review.get("schema") != "canto-span-pedagogical-corpus-review-v2":
        fail("unexpected expert review schema")
    if crossref.get("schema") != "canto-span-pedagogical-corpus-review-candidates-v1":
        fail("unexpected mechanical cross-reference schema")
    source_id = (source.get("source") or {}).get("sourceId")
    payload_hash = (source.get("ingress") or {}).get("sourcePayloadHash")
    if review.get("source_id") != source_id or crossref.get("source_id") != source_id:
        fail("review or cross-reference source ID mismatch")
    if review.get("source_payload_hash") != payload_hash or crossref.get("source_payload_hash") != payload_hash:
        fail("source payload hash projection mismatch")
    if review.get("record_count") != len(source_ids) or crossref.get("record_count") != len(source_ids):
        fail("record count projection mismatch")
    if set(review.get("allowed_terminal_classifications") or []) != ALLOWED_TERMINAL:
        fail("allowed terminal classifications changed")

    review_rows = review.get("records")
    crossref_rows = crossref.get("records")
    if not isinstance(review_rows, list) or not isinstance(crossref_rows, list):
        fail("review or cross-reference records missing")
    review_ids = stable_ids(review_rows, "review records")
    crossref_ids = stable_ids(crossref_rows, "cross-reference records")
    if review_ids != source_ids or crossref_ids != source_ids:
        fail("review or cross-reference IDs/order do not match source")

    source_by_id = {row["id"]: row for row in source_items}
    crossref_by_id = {row["id"]: row for row in crossref_rows}
    terminal_counts: Counter[str] = Counter()
    duplicate_counts: Counter[str] = Counter()
    evidence_counts: Counter[str] = Counter()
    discrepancy_count = 0
    replacement_count = 0
    runtime_crosswalk_count = 0
    bounded_implementation_count = 0

    for row in crossref_rows:
        item = source_by_id[row["id"]]
        if row.get("source_hash") != item.get("sourceHash"):
            fail(f"cross-reference source hash drift: {row['id']}")
        if row.get("mechanical_status") != "candidate_scan_complete":
            fail(f"mechanical scan incomplete: {row['id']}")
        if row.get("expert_duplicate_status") != "unreviewed" or row.get("terminal_ingress_classification") != "unreviewed":
            fail(f"mechanical packet contains expert decisions: {row['id']}")

    for row in review_rows:
        item_id = row["id"]
        item = source_by_id[item_id]
        crossref_row = crossref_by_id[item_id]
        if row.get("source_hash") != item.get("sourceHash"):
            fail(f"review source hash drift: {item_id}")
        if row.get("review_status") != "reviewed":
            fail(f"review remains incomplete: {item_id}")
        if row.get("review_authority") != "project_expert_systematic_review":
            fail(f"review authority missing: {item_id}")
        terminal = row.get("terminal_ingress_classification")
        duplicate = row.get("expert_duplicate_status")
        if terminal not in ALLOWED_TERMINAL:
            fail(f"invalid terminal classification {terminal!r}: {item_id}")
        if duplicate not in ALLOWED_DUPLICATE:
            fail(f"invalid duplicate status {duplicate!r}: {item_id}")
        terminal_counts[terminal] += 1
        duplicate_counts[duplicate] += 1
        evidence = row.get("evidence_use_disposition")
        if not isinstance(evidence, str) or not evidence:
            fail(f"evidence-use disposition missing: {item_id}")
        evidence_counts[evidence] += 1
        if row.get("mechanical_cross_reference_id") != item_id:
            fail(f"cross-reference ID mismatch: {item_id}")
        if set(row.get("not_claims") or []) != REQUIRED_NOT_CLAIMS:
            fail(f"evidence-boundary not_claims changed: {item_id}")
        if not isinstance(row.get("review_note"), str) or not row["review_note"]:
            fail(f"review note missing: {item_id}")

        targets = row.get("accepted_duplicate_targets")
        if not isinstance(targets, list):
            fail(f"duplicate targets must be an array: {item_id}")
        if terminal == "exact_duplicate":
            if duplicate != "accepted_exact_duplicate" or not targets:
                fail(f"exact duplicate lacks accepted target: {item_id}")
            allowed = allowed_duplicate_paths(crossref_row, normalized=False)
        elif terminal == "normalized_duplicate":
            if duplicate != "accepted_normalized_duplicate" or not targets:
                fail(f"normalized duplicate lacks accepted target: {item_id}")
            allowed = allowed_duplicate_paths(crossref_row, normalized=True)
        else:
            if duplicate != "no_accepted_duplicate" or targets:
                fail(f"nonduplicate has accepted duplicate state or target: {item_id}")
            allowed = set()
        for target in targets:
            if not isinstance(target, dict) or target.get("path") not in allowed:
                fail(f"accepted duplicate target is not evidence-backed: {item_id}: {target}")
            if not isinstance(target.get("basis"), str) or not target["basis"]:
                fail(f"accepted duplicate target lacks basis: {item_id}")



        later_links = row.get("later_research_links")
        if later_links != crossref_row.get("later_research_links"):
            fail(f"review later-research links drift from the mechanical packet: {item_id}")
        runtime_links = [
            link for link in later_links
            if isinstance(link, dict) and link.get("kind") == "runtime_crosswalk"
        ]
        bounded_links = [
            link for link in later_links
            if isinstance(link, dict) and link.get("kind") in {"implementation_crosswalk", "role_sensitive_crosswalk"}
        ]
        implementation_targets = row.get("implementation_crosswalk_targets", [])
        if not isinstance(implementation_targets, list):
            fail(f"implementation crosswalk targets must be an array: {item_id}")
        allowed_implementation_paths = {
            match.get("path")
            for match in crossref_row.get("exact_match_candidates", [])
            if isinstance(match, dict)
            and match.get("layer") in {"runtime_lexicon", "runtime_source"}
            and isinstance(match.get("path"), str)
        }
        allowed_implementation_paths.update(
            link.get("provenance_path")
            for link in runtime_links
            if isinstance(link.get("provenance_path"), str)
        )
        for link in bounded_links:
            allowed_implementation_paths.update(
                target.get("path")
                for target in link.get("implementation_targets", link.get("role_specific_targets", []))
                if isinstance(target, dict) and isinstance(target.get("path"), str)
            )
        if runtime_links:
            if terminal != "lexical_only_attestation" or not implementation_targets:
                fail(f"runtime-crosswalk item lacks a separate lexical implementation target: {item_id}")
        elif bounded_links:
            expected_targets = bounded_links[0].get("implementation_targets", bounded_links[0].get("role_specific_targets", []))
            if implementation_targets != expected_targets:
                fail(f"bounded implementation targets drift from the mechanical packet: {item_id}")
            if implementation_targets and terminal not in {"lexical_only_attestation", "new_corpus_attestation", "pronunciation_discrepancy"}:
                fail(f"bounded implementation target is attached to an incompatible terminal state: {item_id}")
        elif implementation_targets:
            fail(f"implementation target lacks a recognized implementation evidence link: {item_id}")
        for target in implementation_targets:
            if not isinstance(target, dict) or target.get("path") not in allowed_implementation_paths:
                fail(f"implementation crosswalk target is not evidence-backed: {item_id}: {target}")
            if not all(isinstance(target.get(key), str) and target[key] for key in ["basis", "target_type"]):
                fail(f"implementation crosswalk target lacks metadata: {item_id}")
        if implementation_targets:
            if runtime_links:
                runtime_crosswalk_count += 1
            else:
                bounded_implementation_count += 1

        discrepancies = row.get("source_discrepancies")
        if not isinstance(discrepancies, list):
            fail(f"source discrepancies must be an array: {item_id}")
        if terminal in {"pronunciation_discrepancy", "translation_discrepancy"} and not discrepancies:
            fail(f"discrepancy classification lacks detail: {item_id}")
        if discrepancies:
            discrepancy_count += 1
            for discrepancy in discrepancies:
                if not isinstance(discrepancy, dict) or not all(
                    isinstance(discrepancy.get(key), str) and discrepancy[key]
                    for key in ["field", "issue", "status"]
                ):
                    fail(f"malformed source discrepancy: {item_id}")

        if source_id == "GLOSSIKA-YUEHK-A1-DLG-002-20251207" and item.get("itemType") == "dialog_turn":
            if row.get("source_availability") != {"english": "not_supplied"}:
                fail(f"dialog turn missing English availability drift: {item_id}")
            if discrepancies:
                fail(f"dialog turn missing English cannot be a translation discrepancy: {item_id}")

        reviewed_values = row.get("reviewed_values")
        if not isinstance(reviewed_values, dict):
            fail(f"reviewed values must be a separate object: {item_id}")
        if any(value is not None for value in reviewed_values.values()):
            replacement_count += 1

    summary = review.get("summary") or {}
    if summary.get("review_status_counts") != {"reviewed": len(source_ids), "unreviewed": 0}:
        fail("review status summary mismatch")
    if summary.get("terminal_classification_counts") != dict(sorted(terminal_counts.items())):
        fail("terminal classification summary mismatch")
    if summary.get("duplicate_status_counts") != dict(sorted(duplicate_counts.items())):
        fail("duplicate status summary mismatch")
    if summary.get("evidence_use_counts") != dict(sorted(evidence_counts.items())):
        fail("evidence-use summary mismatch")
    if summary.get("records_with_source_discrepancies") != discrepancy_count:
        fail("source discrepancy summary mismatch")
    if summary.get("records_with_reviewed_replacements") != replacement_count:
        fail("reviewed replacement summary mismatch")
    if summary.get("records_with_runtime_crosswalk", 0) != runtime_crosswalk_count:
        fail("runtime-crosswalk summary mismatch")
    if summary.get("records_with_implementation_crosswalk", 0) != bounded_implementation_count:
        fail("bounded implementation-crosswalk summary mismatch")


def verify_expert_tsv(package: Path, source_items: list[dict[str, Any]], review: dict[str, Any]) -> None:
    fields, rows = load_tsv(package / "expert-review-r1.tsv")
    required = {
        "id", "item_type", "duplicate_status", "terminal_classification",
        "evidence_use", "discrepancy_status", "review_note",
    }
    if not required.issubset(fields):
        fail(f"expert-review-r1.tsv missing fields: {sorted(required - set(fields))}")
    accepted_field = find_field(fields, ["accepted_duplicate_targets"], "expert-review-r1.tsv", required=False)
    implementation_field = find_field(fields, ["implementation_crosswalk_targets"], "expert-review-r1.tsv", required=False)
    if accepted_field is None and implementation_field is None:
        fail("expert-review-r1.tsv lacks target projections")
    ids = stable_ids(rows, "expert-review-r1.tsv")
    source_ids = [row["id"] for row in source_items]
    if ids != source_ids:
        fail("expert-review-r1.tsv IDs/order do not match source")
    review_by_id = {row["id"]: row for row in review["records"]}
    source_by_id = {row["id"]: row for row in source_items}
    for row in rows:
        item_id = row["id"]
        reviewed = review_by_id[item_id]
        source = source_by_id[item_id]
        if row["item_type"] != source["itemType"]:
            fail(f"expert TSV item type mismatch: {item_id}")
        if row["duplicate_status"] != reviewed["expert_duplicate_status"]:
            fail(f"expert TSV duplicate status mismatch: {item_id}")
        if row["terminal_classification"] != reviewed["terminal_ingress_classification"]:
            fail(f"expert TSV terminal classification mismatch: {item_id}")
        if row["evidence_use"] != reviewed["evidence_use_disposition"]:
            fail(f"expert TSV evidence-use mismatch: {item_id}")
        if row["review_note"] != reviewed["review_note"]:
            fail(f"expert TSV review note mismatch: {item_id}")
        expected_discrepancies = ";".join(value["status"] for value in reviewed["source_discrepancies"])
        if row["discrepancy_status"] != expected_discrepancies:
            fail(f"expert TSV discrepancy projection mismatch: {item_id}")
        accepted_paths = ";".join(target["path"] for target in reviewed["accepted_duplicate_targets"])
        if accepted_field is not None:
            if row[accepted_field] != accepted_paths:
                fail(f"expert TSV duplicate target mismatch: {item_id}")
        elif accepted_paths:
            fail(f"expert TSV omits accepted duplicate targets: {item_id}")
        implementation_paths = ";".join(
            target["path"] for target in reviewed.get("implementation_crosswalk_targets", [])
        )
        if implementation_field is not None:
            if row[implementation_field] != implementation_paths:
                fail(f"expert TSV implementation target mismatch: {item_id}")
        elif implementation_paths:
            fail(f"expert TSV omits implementation crosswalk targets: {item_id}")


def source_display(item: dict[str, Any]) -> str:
    values = item.get("source") or {}
    if isinstance(values.get("traditional"), str) and values["traditional"]:
        return values["traditional"].rstrip("。！？?")
    left = values.get("wordA", values.get("traditionalA", "—"))
    right = values.get("wordB", values.get("traditionalB", "—"))
    return f"{left}／{right}"


def verify_documentation(
    package: Path,
    source_items: list[dict[str, Any]],
    review: dict[str, Any],
) -> None:
    readme = read_bytes(package / "README.md").decode("utf-8")
    summary_text = read_bytes(package / "research-summary.md").decode("utf-8")
    if "0 unreviewed records" not in readme or "npm run verify:pedagogical-corpus-review" not in readme:
        fail("package README does not describe the completed review and permanent verifier")
    source_id = review.get("source_id")
    if not isinstance(source_id, str) or source_id not in summary_text:
        fail("research summary does not identify the reviewed source")

    source_by_id = {row["id"]: row for row in source_items}
    for row in review.get("records", []):
        if row.get("terminal_ingress_classification") != "exact_duplicate":
            continue
        item_id = row["id"]
        short_id = item_id.rsplit("-", 1)[-1]
        projection = f"{short_id} {source_display(source_by_id[item_id])}"
        if projection not in summary_text:
            fail(f"research summary omits accepted exact duplicate: {projection}")

    labels = {
        "exact_duplicate": ["Exact duplicate"],
        "lexical_only_attestation": ["Lexical-only attestation"],
        "new_corpus_attestation": ["New corpus/pronunciation attestation"],
        "pronunciation_discrepancy": ["Pronunciation discrepancy"],
        "translation_discrepancy": ["Translation or lexical-gloss discrepancy"],
        "naturalness_review_candidate": ["Naturalness-review candidate"],
        "unusable": ["Unusable", "Unusable incomplete source"],
        "normalized_duplicate": ["Normalized duplicate"],
    }
    counts = review["summary"]["terminal_classification_counts"]
    for terminal, count in counts.items():
        if count <= 0:
            continue
        candidates = labels.get(terminal)
        if not candidates:
            fail(f"no documentation label configured for {terminal}")
        if not any(f"| {label} | {count} |" in summary_text for label in candidates):
            fail(f"research summary count projection mismatch: {terminal}={count}")


def nonderived_match_paths(builder: Any, row: dict[str, Any], field: str) -> set[str]:
    output: set[str] = set()
    for match in row.get(field, []):
        if not isinstance(match, dict) or not isinstance(match.get("path"), str):
            fail(f"malformed mechanical candidate in {row.get('id')}: {match}")
        path = Path(match["path"])
        if builder.is_global_pedagogical_derived(path):
            continue
        output.add(match["path"])
    return output


def verify_deterministic_crossref(root: Path, package_relative: Path, committed: dict[str, Any]) -> None:
    builder = load_builder(root)
    output_relative = package_relative / "mechanical-cross-reference-r1.json"
    generated = builder.build(root, package_relative, output_relative)

    top_level_fields = ["schema", "source_id", "source_path", "source_payload_hash", "record_count"]
    for field in top_level_fields:
        if committed.get(field) != generated.get(field):
            fail(f"mechanical cross-reference {field} drift")

    committed_rows = committed.get("records")
    generated_rows = generated.get("records")
    if not isinstance(committed_rows, list) or not isinstance(generated_rows, list):
        fail("mechanical cross-reference records missing")
    if stable_ids(committed_rows, "committed mechanical records") != stable_ids(generated_rows, "generated mechanical records"):
        fail("mechanical cross-reference IDs/order drift")

    generated_by_id = {row["id"]: row for row in generated_rows}
    fixed_fields = [
        "ordinal",
        "section",
        "subsection",
        "item_type",
        "source_traditional",
        "source_jyutping",
        "source_english",
        "source_hash",
        "normalized_surface",
        "later_research_links",
        "mechanical_status",
        "expert_duplicate_status",
        "terminal_ingress_classification",
        "evidence_use_disposition",
        "review_note",
    ]
    for committed_row in committed_rows:
        item_id = committed_row["id"]
        generated_row = generated_by_id[item_id]
        for field in fixed_fields:
            if committed_row.get(field) != generated_row.get(field):
                fail(f"mechanical cross-reference {field} drift: {item_id}")
        for field in ["exact_match_candidates", "normalized_match_candidates"]:
            committed_paths = nonderived_match_paths(builder, committed_row, field)
            generated_paths = nonderived_match_paths(builder, generated_row, field)
            stale = sorted(committed_paths - generated_paths)
            if stale:
                fail(f"mechanical cross-reference contains stale non-derived candidates: {item_id}: {stale}")


def verify(
    root: Path,
    package_relative: Path,
    check_deterministic_crossref: bool = True,
) -> dict[str, Any]:
    root = root.resolve()
    package_relative = Path(package_relative)
    package = root / package_relative
    if not package.is_dir():
        fail(f"package directory does not exist: {package_relative}")
    actual_files = {path.name for path in package.iterdir() if path.is_file()}
    missing = REQUIRED_FILES - actual_files
    if missing:
        fail(f"package missing required files: {sorted(missing)}")
    if package_relative.name == "GLOSSIKA-YUEHK-A1-W19-20260726" and "role-sensitive-crosswalk-r1.json" not in actual_files:
        fail("Week 19 package lacks role-sensitive crosswalk")
    if package_relative.name == "GLOSSIKA-YUEHK-A1-DLG-002-20251207" and "dialog-context-routing-r1.json" not in actual_files:
        fail("dialog 002 package lacks context-routing packet")
    temporary = sorted(name for name in actual_files if ".tmp." in name or name.endswith(".tmp"))
    if temporary:
        fail(f"temporary review files remain: {temporary}")

    source = load_json(package / "source.json")
    review = load_json(package / "review.json")
    crossref = load_json(package / "mechanical-cross-reference-r1.json")
    integrity = load_json(package / "package-integrity-r1.json")
    source_items, source_ids = verify_source_and_tsv(package, source)
    source_id = (source.get("source") or {}).get("sourceId")
    payload_hash = (source.get("ingress") or {}).get("sourcePayloadHash")
    if not isinstance(source_id, str) or not source_id:
        fail("source ID missing")
    if not isinstance(payload_hash, str) or not SHA256_PATTERN.fullmatch(payload_hash):
        fail("source payload hash missing or malformed")
    verify_integrity(root, package, package_relative, integrity, source_id, payload_hash)
    runtime_crosswalk_ids = verify_runtime_crosswalk(root, package, source_id, payload_hash, source_items)
    legacy_reconciliation_ids = verify_legacy_reconciliation(root, package, source_id, payload_hash, source_items, review)
    bounded_implementation_ids = verify_bounded_implementation_crosswalk(root, package, source_id, payload_hash, source_items)
    role_sensitive_ids = verify_week19_role_sensitive_crosswalk(root, package, source_id, payload_hash, source_items)
    research_route_ids = verify_research_routing(root, package, source_id, payload_hash, source_items, review)
    verify_review(source, review, crossref, source_items, source_ids)
    verify_dialog_duplicate_targets(root, source_id, source_items, review, crossref)
    reviewed_crosswalk_ids = {
        row["id"] for row in review["records"] if row.get("implementation_crosswalk_targets")
    }
    if reviewed_crosswalk_ids != (runtime_crosswalk_ids | bounded_implementation_ids | role_sensitive_ids):
        fail("reviewed implementation targets do not match the registered implementation packets")
    verify_expert_tsv(package, source_items, review)
    verify_documentation(package, source_items, review)
    if check_deterministic_crossref:
        verify_deterministic_crossref(root, package_relative, crossref)

    return {
        "schema": "canto-span-pedagogical-corpus-review-verification-v1",
        "source_id": source_id,
        "package": str(package_relative),
        "records": len(source_ids),
        "source_payload_hash": payload_hash,
        "reviewed": review["summary"]["review_status_counts"]["reviewed"],
        "unreviewed": review["summary"]["review_status_counts"]["unreviewed"],
        "terminal_classification_counts": review["summary"]["terminal_classification_counts"],
        "duplicate_status_counts": review["summary"]["duplicate_status_counts"],
        "source_discrepancies": review["summary"]["records_with_source_discrepancies"],
        "reviewed_replacements": review["summary"]["records_with_reviewed_replacements"],
        "runtime_crosswalk_records": len(runtime_crosswalk_ids),
        "legacy_reconciliation_records": len(legacy_reconciliation_ids),
        "bounded_implementation_records": len(bounded_implementation_ids),
        "role_sensitive_implementation_records": len(role_sensitive_ids),
        "research_followup_routes": len(research_route_ids),
        "project_only_historical_records": review["summary"].get("project_only_historical_records", 0),
        "deterministic_crossref_checked": check_deterministic_crossref,
        "status": "PASS",
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=DEFAULT_ROOT)
    parser.add_argument("--package", type=Path, action="append", required=True)
    parser.add_argument("--check-deterministic-crossref", action="store_true")
    args = parser.parse_args()
    results = [
        verify(
            args.root,
            package,
            check_deterministic_crossref=args.check_deterministic_crossref,
        )
        for package in args.package
    ]
    if len(results) == 1:
        output: dict[str, Any] = results[0]
    else:
        output = {
            "schema": "canto-span-pedagogical-corpus-review-batch-verification-v1",
            "package_count": len(results),
            "records": sum(row["records"] for row in results),
            "reviewed": sum(row["reviewed"] for row in results),
            "unreviewed": sum(row["unreviewed"] for row in results),
            "packages": results,
            "status": "PASS",
        }
    print(json.dumps(output, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (AssertionError, KeyError, TypeError, ValueError, json.JSONDecodeError) as error:
        print(f"Pedagogical corpus review verification failed: {error}", file=sys.stderr)
        raise SystemExit(1)
