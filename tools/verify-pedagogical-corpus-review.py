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
    if source.get("schema") != "canto-span-pedagogical-corpus-source-v1":
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
    return items, source_ids


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
    return output


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


def verify_expert_tsv(package: Path, source_items: list[dict[str, Any]], review: dict[str, Any]) -> None:
    fields, rows = load_tsv(package / "expert-review-r1.tsv")
    required = {
        "id",
        "item_type",
        "duplicate_status",
        "terminal_classification",
        "evidence_use",
        "discrepancy_status",
        "accepted_duplicate_targets",
        "review_note",
    }
    if not required.issubset(fields):
        fail(f"expert-review-r1.tsv missing fields: {sorted(required - set(fields))}")
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
        target_paths = ";".join(target["path"] for target in reviewed["accepted_duplicate_targets"])
        if row["accepted_duplicate_targets"] != target_paths:
            fail(f"expert TSV duplicate target mismatch: {item_id}")


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
    verify_review(source, review, crossref, source_items, source_ids)
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
