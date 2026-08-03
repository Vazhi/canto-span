#!/usr/bin/env python3
"""Verify the immutable, references-only AB30 aggregate corpus manifest."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from collections import Counter
from pathlib import Path
from typing import Any

DEFAULT_ROOT = Path(__file__).resolve().parents[3]
MANIFEST_RELATIVE = Path("review-packets/corpus-review/AB30/aggregate-corpus-evidence-manifest-r1.json")
NOTE_RELATIVE = Path("grammar/research_pending/PostverbalZoPerfectiveVP.md")
AGGREGATE_SECTION = "Accepted aggregate corpus review"
EXPECTED_AGGREGATE = {
    "total": 232,
    "genuine": 123,
    "false_positive": 103,
    "ambiguous": 6,
    "unusable": 0,
    "unreviewed": 0,
}
EXPECTED_COMPONENTS = {
    "AB30-TWO-SOURCE-PACKET-R1": {
        "schema": "canto-span-corpus-review-decisions-v1",
        "total": 5,
        "inventory_rows": "candidates",
    },
    "AB30-HKCANCOR-V-ZO-R-R2": {
        "schema": "canto-span-corpus-claim-cross-reference-decisions-v1",
        "total": 121,
        "inventory_rows": "candidates",
    },
    "AB30-HKCANCOR-V-ZO-M-R1": {
        "schema": "canto-span-corpus-claim-cross-reference-decisions-v1",
        "total": 106,
        "inventory_rows": "candidates",
    },
}
EXPECTED_NOTE_BREADTH = [
    "one frozen HKCanCor distribution",
    "two small user-supplied conversation sources",
    "no frequency estimate",
    "no unrestricted productivity",
    "no dialect-wide naturalness",
    "six ambiguous candidates",
]
EXPECTED_SOURCE_IDS = [
    "SRC-FAN-CHAN-2022",
    "SRC-SIO-BOND-2025",
    "SRC-YIP-2025-INNER-ASPECT",
    "SRC-MATTHEWS-YIP-COMPREHENSIVE-CH11",
    "SRC-YIP-MATTHEWS-2000-BASIC",
    "SRC-WONG-ETAL-2022-GACS-ASPECT",
    "SRC-WONG-ETAL-2009-ASPECT-EXPERIMENT",
    "SRC-WONG-STOKES-FLETCHER-2003-ZO2-DIVERSITY",
    "SRC-WONG-ETAL-2004-ZO2-ELICITATION",
]


def fail(message: str) -> None:
    raise AssertionError(message)


def read_bytes(root: Path, relative_path: str | Path) -> bytes:
    path = Path(relative_path)
    if not path.is_absolute():
        path = root / path
    if not path.is_file():
        try:
            display = path.relative_to(root)
        except ValueError:
            display = path
        fail(f"missing file: {display}")
    return path.read_bytes()


def load_json(root: Path, relative_path: str | Path) -> dict[str, Any]:
    path = Path(relative_path)
    raw = read_bytes(root, path)
    try:
        value = json.loads(raw)
    except json.JSONDecodeError as error:
        fail(f"invalid JSON in {path}: {error}")
    if not isinstance(value, dict):
        fail(f"expected JSON object: {path}")
    return value


def sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def git_blob_sha(data: bytes) -> str:
    header = b"blob " + str(len(data)).encode("ascii") + b"\0"
    return hashlib.sha1(header + data).hexdigest()


def verify_file_identity(
    root: Path,
    path: str,
    expected_blob: str,
    expected_sha256: str,
    label: str,
) -> bytes:
    data = read_bytes(root, path)
    actual_blob = git_blob_sha(data)
    actual_sha256 = sha256_hex(data)
    if actual_blob != expected_blob:
        fail(f"{label} Git blob drift: {actual_blob} != {expected_blob}")
    if actual_sha256 != expected_sha256:
        fail(f"{label} SHA-256 drift: {actual_sha256} != {expected_sha256}")
    return data


def normalized_counts(decisions: list[dict[str, Any]]) -> dict[str, int]:
    counts = Counter(str(row.get("classification", "unreviewed")) for row in decisions)
    allowed = {"genuine", "false_positive", "ambiguous", "unusable", "unreviewed"}
    unexpected = sorted(set(counts) - allowed)
    if unexpected:
        fail(f"unexpected classifications: {unexpected}")
    return {
        "total": len(decisions),
        "genuine": counts["genuine"],
        "false_positive": counts["false_positive"],
        "ambiguous": counts["ambiguous"],
        "unusable": counts["unusable"],
        "unreviewed": counts["unreviewed"],
    }


def ledger_declared_counts(ledger: dict[str, Any], total: int) -> dict[str, int]:
    declared = dict(ledger.get("counts") or {})
    return {
        "total": total,
        "genuine": int(declared.get("genuine", 0)),
        "false_positive": int(declared.get("false_positive", 0)),
        "ambiguous": int(declared.get("ambiguous", 0)),
        "unusable": int(declared.get("unusable", 0)),
        "unreviewed": int(declared.get("unreviewed", 0)),
    }


def candidate_id(row: dict[str, Any]) -> str:
    value = row.get("candidate_id", row.get("candidateId"))
    if not isinstance(value, str) or not value:
        fail("component row lacks a stable candidate ID")
    return value


def stable_id_set(rows: list[dict[str, Any]], label: str) -> set[str]:
    values = [candidate_id(row) for row in rows]
    if len(values) != len(set(values)):
        duplicates = sorted(value for value, count in Counter(values).items() if count > 1)
        fail(f"duplicate candidate IDs in {label}: {duplicates[:10]}")
    return set(values)


def parse_frontmatter(path: Path) -> dict[str, Any]:
    text = path.read_text(encoding="utf-8")
    match = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not match:
        fail(f"missing note frontmatter: {path}")
    values: dict[str, Any] = {}
    for line in match.group(1).splitlines():
        if not line.strip():
            continue
        key, separator, raw = line.partition(":")
        if not separator:
            fail(f"invalid note frontmatter line: {line}")
        raw = raw.strip()
        try:
            value: Any = json.loads(raw)
        except json.JSONDecodeError:
            value = raw
        values[key.strip()] = value
    return values


def markdown_section(text: str, heading: str) -> str:
    pattern = re.compile(
        rf"^##\s+{re.escape(heading)}\s*$\n(?P<body>.*?)(?=^##\s+|\Z)",
        re.MULTILINE | re.DOTALL,
    )
    match = pattern.search(text)
    if not match:
        fail(f"AB30 note lacks required section: {heading}")
    return match.group("body")


def verify_note_aggregate_section(note_text: str, manifest: dict[str, Any]) -> None:
    section = markdown_section(note_text, AGGREGATE_SECTION)
    manifest_pointer = str(MANIFEST_RELATIVE)
    if manifest_pointer not in section:
        fail("AB30 aggregate-review section lacks the canonical manifest pointer")

    ledger_paths = [component.get("decision_ledger") for component in manifest["components"]]
    missing_ledgers = [
        ledger_path
        for ledger_path in ledger_paths
        if not isinstance(ledger_path, str) or ledger_path not in section
    ]
    if missing_ledgers:
        fail(f"AB30 aggregate-review section lacks component ledger references: {missing_ledgers}")

    if section.count(manifest_pointer) != 1:
        fail("AB30 aggregate-review section must identify one canonical aggregate owner")


def verify(root: Path = DEFAULT_ROOT) -> dict[str, Any]:
    root = root.resolve()
    manifest = load_json(root, MANIFEST_RELATIVE)
    if manifest.get("schema") != "canto-span-corpus-evidence-aggregate-manifest-v2":
        fail("unexpected aggregate manifest schema")
    if manifest.get("manifest_id") != "AB30-CORPUS-EVIDENCE-AGGREGATE-R1":
        fail("unexpected aggregate manifest ID")
    if manifest.get("integrity_revision") != 2:
        fail("unexpected aggregate integrity revision")
    if "decisions" in manifest:
        fail("aggregate manifest must reference component decisions, not embed them")
    if manifest.get("decision_storage_policy") != "references_only_no_decisions_copied_renumbered_or_reclassified":
        fail("aggregate decision-storage policy changed")

    projection_policy = manifest.get("note_projection_policy") or {}
    required_projection_policy = {
        "aggregate_is_references_only": True,
        "component_source_inventories_are_source_ledger_owners": True,
        "corpus_source_ledger_file_semantics": "references_only_aggregate_pointer_to_component_source_owners",
    }
    if projection_policy != required_projection_policy:
        fail("aggregate note/source-ledger projection semantics changed")

    construction = manifest.get("construction") or {}
    if construction != {
        "construction_uuid": "2169217f-a21d-5165-9513-eb0edee2c220",
        "permanent_code": "AB30",
        "canonical_name": "ZoMarkedPerfectiveObjectVP",
        "legacy_runtime_label": "PostverbalZoPerfectiveVP",
    }:
        fail("AB30 construction identity mismatch")

    components = manifest.get("components")
    if not isinstance(components, list) or len(components) != 3:
        fail("aggregate manifest must contain exactly three component references")

    seen_components: set[str] = set()
    seen_candidates: set[str] = set()
    aggregate = Counter()
    verified_files: list[dict[str, str]] = []

    for component in components:
        component_id = component.get("component_id")
        if component_id not in EXPECTED_COMPONENTS:
            fail(f"unexpected component ID: {component_id}")
        if component_id in seen_components:
            fail(f"duplicate component ID: {component_id}")
        seen_components.add(component_id)
        expected = EXPECTED_COMPONENTS[component_id]

        ledger_path = component.get("decision_ledger")
        if not isinstance(ledger_path, str):
            fail(f"missing decision ledger path for {component_id}")
        ledger_data = verify_file_identity(
            root,
            ledger_path,
            str(component.get("decision_ledger_git_blob_sha", "")),
            str(component.get("decision_ledger_sha256", "")),
            f"{component_id} decision ledger",
        )
        ledger = json.loads(ledger_data)
        verified_files.append({"role": "decision_ledger", "path": ledger_path})
        if ledger.get("schema") != expected["schema"]:
            fail(f"ledger schema mismatch for {component_id}")
        if component.get("decision_ledger_schema") != ledger.get("schema"):
            fail(f"manifest ledger schema mismatch for {component_id}")

        decisions = ledger.get("decisions")
        if not isinstance(decisions, list):
            fail(f"missing decisions list in {ledger_path}")
        calculated = normalized_counts(decisions)
        declared = ledger_declared_counts(ledger, len(decisions))
        if calculated != declared:
            fail(f"component ledger counts do not match decisions for {component_id}: {calculated} != {declared}")
        if calculated["total"] != expected["total"]:
            fail(f"unexpected component total for {component_id}")
        if component.get("counts") != calculated:
            fail(f"manifest component counts do not match ledger for {component_id}")

        inventory_path = component.get("source_inventory")
        if not isinstance(inventory_path, str):
            fail(f"missing source inventory path for {component_id}")
        inventory_data = verify_file_identity(
            root,
            inventory_path,
            str(component.get("source_inventory_git_blob_sha", "")),
            str(component.get("source_inventory_sha256", "")),
            f"{component_id} source inventory",
        )
        inventory = json.loads(inventory_data)
        verified_files.append({"role": "source_inventory", "path": inventory_path})
        inventory_rows = inventory.get(expected["inventory_rows"])
        if not isinstance(inventory_rows, list):
            fail(f"missing inventory candidates for {component_id}")
        if len(inventory_rows) != expected["total"]:
            fail(f"source inventory total mismatch for {component_id}")

        decision_ids = stable_id_set(decisions, f"{component_id} decision ledger")
        inventory_ids = stable_id_set(inventory_rows, f"{component_id} source inventory")
        if decision_ids != inventory_ids:
            missing = sorted(inventory_ids - decision_ids)
            extra = sorted(decision_ids - inventory_ids)
            fail(f"decision/source candidate ID mismatch for {component_id}; missing={missing[:10]} extra={extra[:10]}")

        namespace = component.get("candidate_id_namespace")
        if namespace != manifest.get("candidate_id_namespace") or namespace != "ab30-":
            fail(f"candidate namespace mismatch for {component_id}")
        for stable_id in decision_ids:
            if not stable_id.startswith(namespace):
                fail(f"candidate outside declared namespace: {stable_id}")
            if stable_id in seen_candidates:
                fail(f"candidate appears in more than one component: {stable_id}")
            seen_candidates.add(stable_id)

        source_manifest = component.get("source_manifest") or {}
        if component_id == "AB30-TWO-SOURCE-PACKET-R1":
            if source_manifest.get("ownership") != "embedded_source_set_hash" or source_manifest.get("path") is not None:
                fail("two-source packet must declare an embedded source-set hash rather than a file path")
            if source_manifest.get("mirrored_in") != [
                "source_inventory.sourceManifestHash",
                "decision_ledger.source_manifest_hash",
            ]:
                fail("two-source embedded source-manifest owners changed")
            if inventory.get("sourceManifestHash") != source_manifest.get("sha256"):
                fail("two-source inventory source-set hash mismatch")
            if ledger.get("source_manifest_hash") != source_manifest.get("sha256"):
                fail("two-source decision ledger source-set hash mismatch")
            if ledger.get("source_ledger") != inventory_path:
                fail("two-source source-ledger path mismatch")
        else:
            if ledger.get("queryId") != component.get("query_or_packet_id"):
                fail(f"query ID mismatch for {component_id}")
            if ledger.get("sourceInventory") != inventory_path:
                fail(f"source-inventory path mismatch for {component_id}")
            inventory_summary = inventory.get("summary") or {}
            if inventory_summary.get("checkpoint") != component.get("query_or_packet_id"):
                fail(f"inventory checkpoint mismatch for {component_id}")
            if any(row.get("queryId") != component.get("query_or_packet_id") for row in inventory_rows):
                fail(f"inventory row query ID mismatch for {component_id}")

            query_summary_path = component.get("query_summary")
            if not isinstance(query_summary_path, str):
                fail(f"missing query summary for {component_id}")
            query_summary_data = verify_file_identity(
                root,
                query_summary_path,
                str(component.get("query_summary_git_blob_sha", "")),
                str(component.get("query_summary_sha256", "")),
                f"{component_id} query summary",
            )
            query_summary = json.loads(query_summary_data)
            verified_files.append({"role": "query_summary", "path": query_summary_path})
            if query_summary.get("checkpoint") != component.get("query_or_packet_id"):
                fail(f"query-summary checkpoint mismatch for {component_id}")

            if source_manifest.get("ownership") != "referenced_file":
                fail(f"source-manifest ownership mismatch for {component_id}")
            source_manifest_path = source_manifest.get("path")
            if not isinstance(source_manifest_path, str):
                fail(f"missing source-manifest path for {component_id}")
            verify_file_identity(
                root,
                source_manifest_path,
                str(source_manifest.get("git_blob_sha", "")),
                str(source_manifest.get("sha256", "")),
                f"{component_id} source manifest",
            )
            verified_files.append({"role": "source_manifest", "path": source_manifest_path})

            for owner_label, owner in [
                ("inventory", inventory_summary.get("sourceAllowlist") or {}),
                ("query summary", query_summary.get("sourceAllowlist") or {}),
            ]:
                if owner.get("path") != source_manifest_path:
                    fail(f"{owner_label} source-manifest path mismatch for {component_id}")
                if owner.get("sha256") != source_manifest.get("sha256"):
                    fail(f"{owner_label} source-manifest hash mismatch for {component_id}")
            if ledger.get("sourceAllowlist") != source_manifest_path:
                fail(f"decision-ledger source allowlist mismatch for {component_id}")

        aggregate.update(calculated)

    if seen_components != set(EXPECTED_COMPONENTS):
        fail("component set is incomplete")
    calculated_aggregate = {key: int(aggregate[key]) for key in EXPECTED_AGGREGATE}
    if calculated_aggregate != EXPECTED_AGGREGATE:
        fail(f"calculated aggregate mismatch: {calculated_aggregate}")
    if manifest.get("aggregate_counts") != EXPECTED_AGGREGATE:
        fail("manifest aggregate counts do not match accepted totals")

    required_gate_values = {
        "reviewed_corpus_gate_satisfied": True,
        "independent_corpus_replication_satisfied": False,
        "linguistic_status_changed": False,
        "promotion_ready": False,
        "clean_role_neutral_panel_gate_satisfied": False,
        "held_out_validation_satisfied": False,
    }
    if manifest.get("gate_effect") != required_gate_values:
        fail("aggregate gate effect changed")

    expected_integrity = {
        "component_candidate_ids_disjoint": True,
        "component_decision_counts_complete": True,
        "component_decisions_embedded": False,
        "component_classifications_modified": False,
        "component_decision_bytes_immutable": True,
        "component_source_inventory_bytes_immutable": True,
        "component_decision_ids_equal_source_inventory_ids": True,
        "referenced_source_manifest_bytes_immutable": True,
        "canonical_note_projection_complete": True,
    }
    if manifest.get("integrity_requirements") != expected_integrity:
        fail("aggregate integrity requirements changed")

    note_path = root / NOTE_RELATIVE
    frontmatter = parse_frontmatter(note_path)
    manifest_pointer = str(MANIFEST_RELATIVE)
    expected_note_values: dict[str, Any] = {
        "status": "research_pending",
        "source_count": 9,
        "verified_source_count": 9,
        "source_ids": EXPECTED_SOURCE_IDS,
        "corpus_evidence_used": True,
        "corpus_hits_reviewed": True,
        "corpus_candidate_hit_count": 232,
        "corpus_genuine_hit_count": 123,
        "corpus_false_positive_count": 103,
        "corpus_ambiguous_hit_count": 6,
        "corpus_unusable_hit_count": 0,
        "reviewed_corpus_gate_satisfied": True,
        "independent_corpus_replication_satisfied": False,
        "corpus_aggregate_component_count": 3,
        "corpus_decision_ledger_file": manifest_pointer,
        "corpus_source_ledger_file": manifest_pointer,
        "corpus_evidence_manifest_file": manifest_pointer,
        "corpus_readiness_effect": "reviewed_corpus_gate_satisfied_replication_pending",
        "corpus_breadth_limitations": EXPECTED_NOTE_BREADTH,
    }
    for key, expected_value in expected_note_values.items():
        if frontmatter.get(key) != expected_value:
            fail(f"AB30 note projection mismatch for {key}: {frontmatter.get(key)!r} != {expected_value!r}")

    note_text = note_path.read_text(encoding="utf-8")
    verify_note_aggregate_section(note_text, manifest)

    return {
        "schema": "canto-span-ab30-aggregate-corpus-verification-v2",
        "manifest": manifest_pointer,
        "components": len(components),
        "candidate_ids": len(seen_candidates),
        "counts": calculated_aggregate,
        "verified_file_bindings": len(verified_files),
        "reviewed_corpus_gate_satisfied": True,
        "independent_corpus_replication_satisfied": False,
        "linguistic_status_changed": False,
        "promotion_ready": False,
        "status": "PASS",
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=DEFAULT_ROOT)
    args = parser.parse_args()
    result = verify(args.root)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (AssertionError, KeyError, TypeError, ValueError, json.JSONDecodeError) as error:
        print(f"AB30 aggregate corpus verification failed: {error}", file=sys.stderr)
        raise SystemExit(1)
