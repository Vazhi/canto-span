#!/usr/bin/env python3
"""Verify the AB30 aggregate corpus manifest without copying component decisions."""

from __future__ import annotations

import json
import re
import sys
from collections import Counter
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[3]
MANIFEST_PATH = ROOT / "review-packets/corpus-review/AB30/aggregate-corpus-evidence-manifest-r1.json"
NOTE_PATH = ROOT / "grammar/research_pending/PostverbalZoPerfectiveVP.md"
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
    },
    "AB30-HKCANCOR-V-ZO-R-R2": {
        "schema": "canto-span-corpus-claim-cross-reference-decisions-v1",
        "total": 121,
    },
    "AB30-HKCANCOR-V-ZO-M-R1": {
        "schema": "canto-span-corpus-claim-cross-reference-decisions-v1",
        "total": 106,
    },
}


def fail(message: str) -> None:
    raise AssertionError(message)


def load_json(relative_path: str | Path) -> dict[str, Any]:
    path = Path(relative_path)
    if not path.is_absolute():
        path = ROOT / path
    if not path.is_file():
        fail(f"missing file: {path.relative_to(ROOT)}")
    with path.open(encoding="utf-8") as handle:
        value = json.load(handle)
    if not isinstance(value, dict):
        fail(f"expected JSON object: {path.relative_to(ROOT)}")
    return value


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
        fail("component decision lacks a stable candidate ID")
    return value


def parse_frontmatter(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    match = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not match:
        fail(f"missing note frontmatter: {path.relative_to(ROOT)}")
    values: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if not line.strip():
            continue
        key, separator, raw = line.partition(":")
        if not separator:
            fail(f"invalid note frontmatter line: {line}")
        values[key.strip()] = raw.strip()
    return values


def unquote(value: str) -> str:
    if value.startswith('"') and value.endswith('"'):
        return json.loads(value)
    return value


def main() -> int:
    manifest = load_json(MANIFEST_PATH)
    if manifest.get("schema") != "canto-span-corpus-evidence-aggregate-manifest-v1":
        fail("unexpected aggregate manifest schema")
    if manifest.get("manifest_id") != "AB30-CORPUS-EVIDENCE-AGGREGATE-R1":
        fail("unexpected aggregate manifest ID")
    if "decisions" in manifest:
        fail("aggregate manifest must reference component decisions, not embed them")

    construction = manifest.get("construction") or {}
    if construction.get("construction_uuid") != "2169217f-a21d-5165-9513-eb0edee2c220":
        fail("AB30 UUID mismatch")
    if construction.get("permanent_code") != "AB30":
        fail("AB30 permanent code mismatch")

    components = manifest.get("components")
    if not isinstance(components, list) or len(components) != 3:
        fail("aggregate manifest must contain exactly three component references")

    seen_components: set[str] = set()
    seen_candidates: set[str] = set()
    aggregate = Counter()

    for component in components:
        component_id = component.get("component_id")
        if component_id not in EXPECTED_COMPONENTS:
            fail(f"unexpected component ID: {component_id}")
        if component_id in seen_components:
            fail(f"duplicate component ID: {component_id}")
        seen_components.add(component_id)

        ledger_path = component.get("decision_ledger")
        if not isinstance(ledger_path, str):
            fail(f"missing decision ledger path for {component_id}")
        ledger = load_json(ledger_path)
        expected = EXPECTED_COMPONENTS[component_id]
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

        namespace = component.get("candidate_id_namespace")
        if namespace != manifest.get("candidate_id_namespace") or namespace != "ab30-":
            fail(f"candidate namespace mismatch for {component_id}")
        for row in decisions:
            stable_id = candidate_id(row)
            if not stable_id.startswith(namespace):
                fail(f"candidate outside declared namespace: {stable_id}")
            if stable_id in seen_candidates:
                fail(f"candidate appears in more than one component: {stable_id}")
            seen_candidates.add(stable_id)

        source_manifest = component.get("source_manifest") or {}
        if component_id == "AB30-TWO-SOURCE-PACKET-R1":
            source_inventory = load_json(component["source_inventory"])
            if source_inventory.get("sourceManifestHash") != source_manifest.get("sha256"):
                fail("two-source packet manifest hash mismatch")
            if ledger.get("source_manifest_hash") != source_manifest.get("sha256"):
                fail("two-source decision ledger manifest hash mismatch")
            if ledger.get("source_ledger") != component.get("source_inventory"):
                fail("two-source source-ledger path mismatch")
        else:
            if ledger.get("queryId") != component.get("query_or_packet_id"):
                fail(f"query ID mismatch for {component_id}")
            if ledger.get("sourceInventory") != component.get("source_inventory"):
                fail(f"source-inventory path mismatch for {component_id}")
            query_summary = load_json(component["query_summary"])
            if query_summary.get("checkpoint") != component.get("query_or_packet_id"):
                fail(f"query-summary checkpoint mismatch for {component_id}")
            summary_manifest = query_summary.get("sourceAllowlist") or {}
            if summary_manifest.get("path") != source_manifest.get("path"):
                fail(f"source-manifest path mismatch for {component_id}")
            if summary_manifest.get("sha256") != source_manifest.get("sha256"):
                fail(f"source-manifest hash mismatch for {component_id}")
            if ledger.get("sourceAllowlist") != source_manifest.get("path"):
                fail(f"decision-ledger source allowlist mismatch for {component_id}")

        aggregate.update(calculated)

    if seen_components != set(EXPECTED_COMPONENTS):
        fail("component set is incomplete")
    calculated_aggregate = {key: int(aggregate[key]) for key in EXPECTED_AGGREGATE}
    if calculated_aggregate != EXPECTED_AGGREGATE:
        fail(f"calculated aggregate mismatch: {calculated_aggregate}")
    if manifest.get("aggregate_counts") != EXPECTED_AGGREGATE:
        fail("manifest aggregate counts do not match accepted totals")

    gate_effect = manifest.get("gate_effect") or {}
    required_gate_values = {
        "reviewed_corpus_gate_satisfied": True,
        "independent_corpus_replication_satisfied": False,
        "linguistic_status_changed": False,
        "promotion_ready": False,
        "clean_role_neutral_panel_gate_satisfied": False,
        "held_out_validation_satisfied": False,
    }
    for key, expected_value in required_gate_values.items():
        if gate_effect.get(key) is not expected_value:
            fail(f"incorrect gate effect: {key}")

    frontmatter = parse_frontmatter(NOTE_PATH)
    expected_note_values = {
        "status": '"research_pending"',
        "corpus_evidence_used": "true",
        "corpus_hits_reviewed": "true",
        "corpus_candidate_hit_count": "232",
        "corpus_genuine_hit_count": "123",
        "corpus_false_positive_count": "103",
        "corpus_ambiguous_hit_count": "6",
        "corpus_unusable_hit_count": "0",
        "reviewed_corpus_gate_satisfied": "true",
        "independent_corpus_replication_satisfied": "false",
        "corpus_decision_ledger_file": '"review-packets/corpus-review/AB30/aggregate-corpus-evidence-manifest-r1.json"',
    }
    for key, expected_value in expected_note_values.items():
        if frontmatter.get(key) != expected_value:
            fail(f"AB30 note projection mismatch for {key}: {frontmatter.get(key)!r}")
    if unquote(frontmatter.get("corpus_decision_ledger_file", "")) != str(MANIFEST_PATH.relative_to(ROOT)):
        fail("AB30 note does not point to the aggregate manifest")

    print(json.dumps({
        "schema": "canto-span-ab30-aggregate-corpus-verification-v1",
        "manifest": str(MANIFEST_PATH.relative_to(ROOT)),
        "components": len(components),
        "candidate_ids": len(seen_candidates),
        "counts": calculated_aggregate,
        "reviewed_corpus_gate_satisfied": True,
        "independent_corpus_replication_satisfied": False,
        "status": "PASS",
    }, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (AssertionError, KeyError, TypeError, ValueError, json.JSONDecodeError) as error:
        print(f"AB30 aggregate corpus verification failed: {error}", file=sys.stderr)
        raise SystemExit(1)
