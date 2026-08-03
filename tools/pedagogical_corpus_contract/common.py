#!/usr/bin/env python3
"""Verify the shared Canto Span pedagogical-corpus contract."""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import stat
import sys
from typing import Any

REGISTRY_SCHEMA = "canto-span-pedagogical-corpus-registry-v1"
PACKAGE_SCHEMA = "canto-span-pedagogical-corpus-package-v1"
RECORDS_SCHEMA = "canto-span-pedagogical-corpus-records-v1"
CANDIDATE_SCHEMA = "canto-span-pedagogical-candidate-snapshot-v1"
AUTHORITY_SCHEMA = "canto-span-pedagogical-review-authority-v1"
REVIEW_EVENTS_SCHEMA = "canto-span-pedagogical-review-events-v1"
RELATION_SCHEMAS = {
    "duplicate_edges_file": ("duplicate_edges", "canto-span-pedagogical-duplicate-edges-v1", "edges"),
    "discrepancies_file": ("discrepancies", "canto-span-pedagogical-discrepancies-v1", "discrepancies"),
    "implementation_links_file": ("implementation_links", "canto-span-pedagogical-implementation-links-v1", "links"),
    "routes_file": ("routes", "canto-span-pedagogical-routes-v1", "routes"),
}
REGISTRY_KEYS = {"schema", "registry_state", "package_root", "packages", "migration_queue", "invariants"}
REGISTRY_INVARIANTS = {
    "closed_package_manifests": True,
    "safe_path_containment": True,
    "recompute_byte_and_semantic_hashes": True,
    "registry_wide_duplicate_dag": True,
    "registry_wide_route_ownership": True,
    "exact_bidirectional_projections": True,
}
PACKAGE_KEYS = {
    "schema", "package_id", "package_kind", "root", "lifecycle", "source", "lineage",
    "review_authority", "candidate_discovery", "files", "record_identity", "relations",
    "projections", "summary",
}
FILE_ROLES = {
    "source_original", "source_projection", "authority_record", "review_events",
    "candidate_snapshot", "duplicate_edges", "discrepancies", "implementation_links",
    "routes", "items_projection", "aggregate_projection", "documentation", "control",
}
REVIEW_STATES = {"preserved", "mechanical", "reviewed", "accepted", "superseded", "withdrawn"}
REVIEWER_ROLES = {"project_reviewer", "external_expert", "native_reviewer", "source_provider_metadata"}
LINK_AUTHORITY = {
    "token_occurrence": "informational",
    "pronunciation_owner": "pronunciation_owner",
    "implementation_link": "implementation_owner",
    "parser_hint": "informational",
    "evidence_relation": "informational",
}

class ContractError(ValueError):
    pass

def req(ok: bool, msg: str) -> None:
    if not ok:
        raise ContractError(msg)

def exact_keys(obj: Any, keys: set[str], label: str) -> None:
    req(isinstance(obj, dict), f"{label} must be an object")
    actual = set(obj)
    req(actual == keys, f"{label} keys mismatch; missing={sorted(keys-actual)}, extra={sorted(actual-keys)}")

def read_json(path: Path) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError, json.JSONDecodeError) as exc:
        raise ContractError(f"cannot read JSON {path}: {exc}") from exc

def canon(value: Any) -> bytes:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")

def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def byte_hash(path: Path) -> str:
    return digest(path.read_bytes())

def semantic_hash(path: Path) -> str:
    if path.suffix.lower() == ".json":
        return digest(canon(read_json(path)))
    if path.suffix.lower() == ".tsv":
        text = path.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n")
        text = "\n".join(line.rstrip() for line in text.split("\n")).rstrip("\n") + "\n"
        return digest(text.encode("utf-8"))
    return byte_hash(path)

def continuity_hash(ids: list[str]) -> str:
    return digest(canon({"record_ids": ids}))

def safe_rel(value: Any, label: str) -> str:
    req(isinstance(value, str) and value, f"{label} must be a non-empty string")
    req("\\" not in value, f"{label} must use POSIX separators")
    p = PurePosixPath(value)
    req(not p.is_absolute() and all(part not in ("", ".", "..") for part in p.parts), f"{label} is unsafe")
    return p.as_posix()

def resolve(repo: Path, value: str, label: str) -> Path:
    rel = safe_rel(value, label)
    result = (repo / rel).resolve(strict=False)
    try:
        result.relative_to(repo.resolve())
    except ValueError as exc:
        raise ContractError(f"{label} escapes repository root") from exc
    return result

def regular(path: Path, label: str) -> None:
    req(path.exists(), f"{label} missing: {path}")
    req(not path.is_symlink(), f"{label} must not be a symlink: {path}")
    req(stat.S_ISREG(path.stat().st_mode), f"{label} must be a regular file: {path}")

def ref_key(value: Any, label: str) -> tuple[str, str]:
    exact_keys(value, {"package_id", "record_id"}, label)
    req(isinstance(value["package_id"], str) and value["package_id"], f"{label}.package_id invalid")
    req(isinstance(value["record_id"], str) and value["record_id"], f"{label}.record_id invalid")
    return value["package_id"], value["record_id"]

def validate_registry_shape(registry: Any) -> None:
    exact_keys(registry, REGISTRY_KEYS, "registry")
    req(registry["schema"] == REGISTRY_SCHEMA, "unsupported registry schema")
    req(registry["registry_state"] in {"foundation", "active"}, "invalid registry_state")
    safe_rel(registry["package_root"], "registry.package_root")
    req(isinstance(registry["packages"], list), "registry.packages must be an array")
    req(isinstance(registry["migration_queue"], list), "registry.migration_queue must be an array")
    req(registry["invariants"] == REGISTRY_INVARIANTS, "registry invariants must be exact")


def validate_queue(queue: list[Any]) -> None:
    seen_packages: set[str] = set()
    seen_claims: set[int] = set()
    seen_prs: set[int] = set()
    keys = {"package_id", "source_issue", "stale_claim", "stale_pr", "source_root"}
    for index, item in enumerate(queue):
        label = f"migration_queue[{index}]"
        exact_keys(item, keys, label)
        package_id = item["package_id"]
        req(isinstance(package_id, str) and package_id, f"{label}.package_id invalid")
        req(package_id not in seen_packages, f"duplicate migration package {package_id}")
        seen_packages.add(package_id)
        for field, seen in (("stale_claim", seen_claims), ("stale_pr", seen_prs)):
            value = item[field]
            req(isinstance(value, int) and value > 0, f"{label}.{field} invalid")
            req(value not in seen, f"duplicate migration {field} {value}")
            seen.add(value)
        req(isinstance(item["source_issue"], int) and item["source_issue"] > 0, f"{label}.source_issue invalid")
        safe_rel(item["source_root"], f"{label}.source_root")


def validate_entry(entry: Any, index: int) -> dict[str, Any]:
    label = f"packages[{index}]"
    keys = {"package_id", "package_kind", "root", "manifest", "authority_state", "authority_issue"}
    exact_keys(entry, keys, label)
    req(isinstance(entry["package_id"], str) and entry["package_id"], f"{label}.package_id invalid")
    req(entry["package_kind"] in {"weekly", "dialog", "other"}, f"{label}.package_kind invalid")
    safe_rel(entry["root"], f"{label}.root")
    safe_rel(entry["manifest"], f"{label}.manifest")
    req(entry["authority_state"] in REVIEW_STATES, f"{label}.authority_state invalid")
    if entry["authority_issue"] is not None:
        req(isinstance(entry["authority_issue"], int) and entry["authority_issue"] > 0, f"{label}.authority_issue invalid")
    if entry["authority_state"] in {"reviewed", "accepted", "superseded", "withdrawn"}:
        req(entry["authority_issue"] is not None, f"{label} requires authority_issue")
    return entry


def read_records(path: Path, id_field: str) -> tuple[list[str], dict[str, Any]]:
    data = read_json(path)
    req(isinstance(data, dict) and data.get("schema") == RECORDS_SCHEMA, f"record schema invalid: {path}")
    records = data.get("records")
    req(isinstance(records, list) and records, f"record file must contain records: {path}")
    ids: list[str] = []
    mapping: dict[str, Any] = {}
    for index, record in enumerate(records):
        req(isinstance(record, dict), f"record {index} must be an object")
        record_id = record.get(id_field)
        req(isinstance(record_id, str) and record_id, f"record {index} missing {id_field}")
        req(record_id not in mapping, f"duplicate record ID {record_id}")
        ids.append(record_id)
        mapping[record_id] = record
    return ids, mapping


def read_items(path: Path, id_field: str) -> list[str]:
    with path.open("r", encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle, delimiter="\t"))
    req(rows and id_field in rows[0], f"items projection lacks {id_field}")
    ids = [row[id_field] for row in rows]
    req(all(ids) and len(ids) == len(set(ids)), "items projection has blank or duplicate IDs")
    return ids


def validate_inventory(repo: Path, package_root: Path, manifest_path: Path, files: Any) -> dict[str, dict[str, Any]]:
    req(isinstance(files, list) and files, "package files must be non-empty")
    declared: dict[str, dict[str, Any]] = {}
    keys = {"path", "role", "byte_sha256", "semantic_sha256"}
    for index, item in enumerate(files):
        label = f"files[{index}]"
        exact_keys(item, keys, label)
        rel = safe_rel(item["path"], f"{label}.path")
        req(rel not in declared, f"duplicate declared file {rel}")
        req(item["role"] in FILE_ROLES, f"{label}.role invalid")
        for field in ("byte_sha256", "semantic_sha256"):
            value = item[field]
            req(isinstance(value, str) and len(value) == 64 and set(value) <= set("0123456789abcdef"), f"{label}.{field} invalid")
        path = resolve(repo, rel, label)
        regular(path, label)
        try:
            path.resolve().relative_to(package_root.resolve())
        except ValueError as exc:
            raise ContractError(f"declared file outside package root: {rel}") from exc
        req(byte_hash(path) == item["byte_sha256"], f"byte hash mismatch: {rel}")
        req(semantic_hash(path) == item["semantic_sha256"], f"semantic hash mismatch: {rel}")
        declared[rel] = item

    actual: set[str] = set()
    req(package_root.exists() and package_root.is_dir(), f"package root missing: {package_root}")
    for current, dirs, names in os.walk(package_root, followlinks=False):
        current_path = Path(current)
        for name in dirs:
            req(not (current_path / name).is_symlink(), f"symlink directory in package: {current_path/name}")
        for name in names:
            path = current_path / name
            regular(path, "package file")
            actual.add(path.relative_to(repo).as_posix())
    expected = set(declared) | {manifest_path.relative_to(repo).as_posix()}
    req(actual == expected, f"closed inventory mismatch; missing={sorted(expected-actual)}, extra={sorted(actual-expected)}")
    return declared


def role_json(repo: Path, files: dict[str, dict[str, Any]], rel: Any, role: str, label: str) -> tuple[Path, Any] | None:
    if rel is None:
        return None
    rel = safe_rel(rel, label)
    req(rel in files and files[rel]["role"] == role, f"{label} must be declared with role {role}")
    path = resolve(repo, rel, label)
    return path, read_json(path)
