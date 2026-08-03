#!/usr/bin/env python3
from __future__ import annotations

import csv
import hashlib
import json
from pathlib import Path
import subprocess
from typing import Any

REPO = Path(__file__).resolve().parents[1]
PKG_ID = "GLOSSIKA-YUEHK-A1-W16-20260705"
PKG_ROOT_REL = f"data/pedagogical-corpus/glossika/{PKG_ID}"
PKG_ROOT = REPO / PKG_ROOT_REL
REGISTRY_PATH = REPO / "config/pedagogical-corpus-packages.json"
STALE_REF = "origin/agent/week16-ingress-review"
STALE_REVIEW_PATH = f"{PKG_ROOT_REL}/review.json"
AUTHORITY_ISSUE = 514
SOURCE_ISSUE = 133
ROUTE_OWNER_ISSUE = 133
AUTHORIZED_AT = "2026-08-04T02:10:00+08:00"
EMAIL_ID = "19f3100f131df130"


def canonical(value: Any) -> bytes:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def byte_hash(path: Path) -> str:
    return sha(path.read_bytes())


def semantic_hash(path: Path) -> str:
    if path.suffix.lower() == ".json":
        return sha(canonical(json.loads(path.read_text(encoding="utf-8"))))
    if path.suffix.lower() == ".tsv":
        text = path.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n")
        text = "\n".join(line.rstrip() for line in text.split("\n")).rstrip("\n") + "\n"
        return sha(text.encode("utf-8"))
    return byte_hash(path)


def write_json(path: Path, value: Any, *, compact: bool = False) -> None:
    if compact:
        text = json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")) + "\n"
    else:
        text = json.dumps(value, ensure_ascii=False, indent=2) + "\n"
    path.write_text(text, encoding="utf-8")


def git_show_json(path: str) -> Any:
    raw = subprocess.check_output(["git", "show", f"{STALE_REF}:{path}"], cwd=REPO)
    return json.loads(raw.decode("utf-8"))


def source_display(item: dict[str, Any]) -> str:
    source = item.get("source", {})
    if isinstance(source.get("traditional"), str):
        return source["traditional"]
    if "wordA" in source or "wordB" in source:
        return f"{source.get('wordA', '')} / {source.get('wordB', '')}"
    return item["id"]


def discrepancy_type(value: dict[str, Any]) -> str:
    field = str(value.get("field", "other")).lower()
    if field in {"jyutping", "ipa", "phonics_pair", "pronunciation", "reading"}:
        return "pronunciation"
    if field in {"english", "translation"}:
        return "translation"
    if field in {"gloss", "morphemegloss", "lexical_gloss"}:
        return "gloss"
    if field in {"traditional", "orthography", "written_form"}:
        return "orthography"
    if field in {"tokenization", "segmentation"}:
        return "segmentation"
    if field in {"naturalness", "register"}:
        return "naturalness"
    return "other"


def role_for(path: Path) -> str:
    name = path.name
    return {
        "source.json": "source_original",
        "items.tsv": "items_projection",
        "record-ids.json": "source_projection",
        "review-authority.json": "authority_record",
        "review-events.json": "review_events",
        "candidate-snapshot.json": "candidate_snapshot",
        "duplicate-edges.json": "duplicate_edges",
        "discrepancies.json": "discrepancies",
        "implementation-links.json": "implementation_links",
        "routes.json": "routes",
        "aggregate.json": "aggregate_projection",
        "review.json": "control",
        "README.md": "documentation",
        "research-summary.md": "documentation",
    }[name]


def main() -> None:
    source_path = PKG_ROOT / "source.json"
    items_path = PKG_ROOT / "items.tsv"
    source = json.loads(source_path.read_text(encoding="utf-8"))
    source_items = source["items"]
    assert len(source_items) == 59
    ids = [item["id"] for item in source_items]
    assert len(ids) == len(set(ids))

    with items_path.open("r", encoding="utf-8", newline="") as handle:
        tsv_ids = [row["id"] for row in csv.DictReader(handle, delimiter="\t")]
    assert tsv_ids == ids

    stale_review = git_show_json(STALE_REVIEW_PATH)
    assert stale_review["source_id"] == PKG_ID
    assert stale_review["record_count"] == 59
    stale_records = {record["id"]: record for record in stale_review["records"]}
    assert list(stale_records) == ids

    registry = json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))

    # Build exact record-to-record duplicate candidates from active packages only.
    active_forms: dict[tuple[str, str], list[dict[str, str]]] = {}
    for entry in registry["packages"]:
        active_source_path = REPO / entry["root"] / "source.json"
        active_source = json.loads(active_source_path.read_text(encoding="utf-8"))
        for item in active_source["items"]:
            traditional = item.get("source", {}).get("traditional")
            if isinstance(traditional, str) and traditional:
                active_forms.setdefault((item["itemType"], traditional), []).append(
                    {"package_id": entry["package_id"], "record_id": item["id"]}
                )

    duplicate_edges: list[dict[str, Any]] = []
    duplicate_targets: dict[str, dict[str, str]] = {}
    for item in source_items:
        traditional = item.get("source", {}).get("traditional")
        if not isinstance(traditional, str) or not traditional:
            continue
        matches = active_forms.get((item["itemType"], traditional), [])
        if not matches:
            continue
        target = matches[-1]
        duplicate_targets[item["id"]] = target
        duplicate_edges.append(
            {
                "edge_id": f"W16-E-{item['ordinal']:03d}",
                "source": {"package_id": PKG_ID, "record_id": item["id"]},
                "target": target,
                "relation": "exact",
            }
        )

    # Convert stale review differences into typed, explicitly non-authoritative discrepancies.
    discrepancies: list[dict[str, Any]] = []
    discrepancy_records: dict[str, list[str]] = {}
    for item in source_items:
        record = stale_records[item["id"]]
        seen_types: set[str] = set()
        for index, value in enumerate(record.get("source_discrepancies", []), start=1):
            dtype = discrepancy_type(value)
            seen_types.add(dtype)
            did = f"W16-D-{item['ordinal']:03d}-{index:02d}"
            discrepancies.append(
                {
                    "discrepancy_id": did,
                    "source": {"package_id": PKG_ID, "record_id": item["id"]},
                    "type": dtype,
                    "status": "open",
                    "replacement_value": None,
                    "authority_issue": None,
                }
            )
            discrepancy_records.setdefault(item["id"], []).append(dtype)
        if record.get("terminal_ingress_classification") == "naturalness_review_candidate" and "naturalness" not in seen_types:
            did = f"W16-D-{item['ordinal']:03d}-N"
            discrepancies.append(
                {
                    "discrepancy_id": did,
                    "source": {"package_id": PKG_ID, "record_id": item["id"]},
                    "type": "naturalness",
                    "status": "open",
                    "replacement_value": None,
                    "authority_issue": None,
                }
            )
            discrepancy_records.setdefault(item["id"], []).append("naturalness")

    # Preserve merged runtime representation as typed links, never duplicate authority.
    links: list[dict[str, Any]] = []
    implementation_targets: dict[str, list[str]] = {}
    for item in source_items:
        record = stale_records[item["id"]]
        targets = []
        for index, target in enumerate(record.get("implementation_crosswalk_targets", []), start=1):
            path = target["path"]
            targets.append(path)
            links.append(
                {
                    "link_id": f"W16-L-{item['ordinal']:03d}-{index:02d}",
                    "source": {"package_id": PKG_ID, "record_id": item["id"]},
                    "type": "implementation_link",
                    "target": path,
                    "authority": "implementation_owner",
                }
            )
        if targets:
            implementation_targets[item["id"]] = targets

    routes: list[dict[str, Any]] = []
    for item in source_items:
        rid = item["id"]
        types = sorted(set(discrepancy_records.get(rid, [])))
        if not types:
            continue
        requirements = ["Resolve the typed discrepancy without replacing immutable source values."]
        if "naturalness" in types:
            requirements.append("Use controlled Cantonese corpus or independent speaker evidence for naturalness and register.")
        if "pronunciation" in types:
            requirements.append("Use independent phonological and lexical verification before learner-facing pronunciation use.")
        if any(value in types for value in ("translation", "gloss")):
            requirements.append("Resolve the intended contextual sense before adopting a learner-facing translation or gloss.")
        if any(value in types for value in ("segmentation", "orthography", "other")):
            requirements.append("Reconcile source/runtime representation boundaries while preserving both provenance layers.")
        routes.append(
            {
                "route_id": f"W16-R-{item['ordinal']:03d}",
                "source": {"package_id": PKG_ID, "record_id": rid},
                "owner_issue": ROUTE_OWNER_ISSUE,
                "status": "open",
                "requirements": requirements,
                "projected_record_ids": [rid],
            }
        )

    record_file = {"schema": "canto-span-pedagogical-corpus-records-v1", "records": [{"id": rid} for rid in ids]}
    write_json(PKG_ROOT / "record-ids.json", record_file)

    source_semantic = semantic_hash(source_path)
    source_byte = byte_hash(source_path)
    items_byte = byte_hash(items_path)

    authority = {
        "schema": "canto-span-pedagogical-review-authority-v1",
        "authority_issue": AUTHORITY_ISSUE,
        "authority_kind": "review",
        "authorized_state": "reviewed",
        "reviewer_role": "project_reviewer",
        "source_semantic_sha256": source_semantic,
        "authorized_at": AUTHORIZED_AT,
        "scope": PKG_ID,
        "evidence_basis": [
            f"Original Glossika email {EMAIL_ID} was read directly and matched to the immutable 59-record archive.",
            f"Immutable source.json SHA-256 {source_byte}.",
            f"Immutable items.tsv SHA-256 {items_byte}.",
            "Source issue #133 and bounded runtime implementation #119 / merged PR #121.",
            "Stale claim #475 and PR #476 were re-examined as evidence only; no stale authority was inherited.",
        ],
        "replacement_rights": [],
    }
    write_json(PKG_ROOT / "review-authority.json", authority)

    events = []
    for item in source_items:
        record = stale_records[item["id"]]
        terminal = record.get("terminal_ingress_classification")
        if terminal == "naturalness_review_candidate":
            decision = "ambiguous"
        elif terminal == "unusable":
            decision = "unusable"
        elif item["itemType"] in {"lexical_entry", "phonics_pair"} or record.get("source_discrepancies"):
            decision = "observation"
        elif terminal == "new_corpus_attestation":
            decision = "genuine"
        else:
            decision = "observation"
        events.append(
            {
                "event_id": f"W16-REVIEW-{item['ordinal']:03d}",
                "record_id": item["id"],
                "event_type": "review",
                "reviewer_role": "project_reviewer",
                "reviewed_source_semantic_sha256": source_semantic,
                "decision_at": AUTHORIZED_AT,
                "decision_type": decision,
                "evidence_basis": [f"Gmail {EMAIL_ID}; source #133; runtime PR #121; stale evidence #475/#476; migration #514"],
                "replacement_authority_issue": None,
            }
        )
    write_json(PKG_ROOT / "review-events.json", {"schema": "canto-span-pedagogical-review-events-v1", "events": events}, compact=True)

    candidates = []
    for item in source_items:
        rid = item["id"]
        refs: list[dict[str, str]] = []
        if rid in duplicate_targets:
            target = duplicate_targets[rid]
            refs.append(
                {
                    "kind": "active_package_duplicate",
                    "target": f"{target['package_id']}#{target['record_id']}",
                    "basis": "exact item-type and source-form match against an active package",
                }
            )
        for target in implementation_targets.get(rid, []):
            refs.append(
                {
                    "kind": "implementation_owner",
                    "target": target,
                    "basis": "merged PR #121 runtime crosswalk; implementation provenance only",
                }
            )
        if rid in discrepancy_records:
            refs.append(
                {
                    "kind": "open_review_route",
                    "target": "issue:#133",
                    "basis": "typed discrepancy remains unresolved without source replacement",
                }
            )
        candidates.append({"record_id": rid, "candidate_refs": refs})
    write_json(PKG_ROOT / "candidate-snapshot.json", {"schema": "canto-span-pedagogical-candidate-snapshot-v1", "candidates": candidates}, compact=True)

    write_json(PKG_ROOT / "duplicate-edges.json", {"schema": "canto-span-pedagogical-duplicate-edges-v1", "edges": duplicate_edges})
    write_json(PKG_ROOT / "discrepancies.json", {"schema": "canto-span-pedagogical-discrepancies-v1", "discrepancies": discrepancies})
    write_json(PKG_ROOT / "implementation-links.json", {"schema": "canto-span-pedagogical-implementation-links-v1", "links": links})
    write_json(PKG_ROOT / "routes.json", {"schema": "canto-span-pedagogical-routes-v1", "routes": routes})

    summary = {
        "record_count": len(ids),
        "duplicate_edge_count": len(duplicate_edges),
        "discrepancy_count": len(discrepancies),
        "implementation_link_count": len(links),
        "route_count": len(routes),
    }
    write_json(PKG_ROOT / "aggregate.json", {"package_id": PKG_ID, "summary": summary})

    stale_summary = stale_review["summary"]
    review_pointer = {
        "schema": "canto-span-pedagogical-contract-review-pointer-v1",
        "package_id": PKG_ID,
        "state": "reviewed",
        "authority_issue": AUTHORITY_ISSUE,
        "source_issue": SOURCE_ISSUE,
        "source_payload_hash": source["ingress"]["sourcePayloadHash"],
        "record_count": len(ids),
        "legacy_evidence": {"stale_claim": 475, "stale_pr": 476, "authority": "evidence_only"},
        "findings": {
            "prior_terminal_classifications": stale_summary["terminal_classification_counts"],
            "prior_records_with_runtime_crosswalk": stale_summary.get("records_with_runtime_crosswalk", 35),
            "active_record_duplicate_edges": len(duplicate_edges),
            "open_discrepancies": len(discrepancies),
            "source_replacements": 0,
        },
        "evidence_boundary": "Pedagogical attestation and runtime implementation do not establish productivity, source correctness, construction identity, parser correctness, or linguistic status.",
    }
    write_json(PKG_ROOT / "review.json", review_pointer)

    readme = f"""# Glossika Cantonese (HK) A1 Week 16 contract package

- Package ID: `{PKG_ID}`
- Lesson: Hobbies & Free Time
- Source date: 2026-07-05
- Gmail message: `{EMAIL_ID}`
- Source issue: #133
- Contract migration: #514
- Related runtime implementation: #119 / merged PR #121
- Lifecycle: `reviewed` (not `accepted`)
- Stable records: {len(ids)}

## Authority boundary

`source.json` and `items.tsv` remain immutable. Source-authored register, negation, and phonics claims have metadata-only authority. PR #121 is implementation provenance and lexical coverage, not source-correction, pronunciation, naturalness, duplicate-identity, or linguistic-promotion authority.

## Open work

The typed discrepancies and routes retain unresolved source/runtime, pronunciation, register, naturalness, segmentation, and lexical boundaries under issue #133. No replacement value is accepted by this package.
"""
    (PKG_ROOT / "README.md").write_text(readme, encoding="utf-8")

    research = f"""# Week 16 migration research summary

The original Glossika email `{EMAIL_ID}` was checked directly against the retained 59-record archive. The package preserves all source fields, order, IDs, and source/runtime differences.

## Retained evidence

- stale claim #475 / PR #476: record-level review evidence only;
- merged PR #121: bounded implementation and lexical-coverage provenance only;
- active Weeks 14–15: the only eligible package-level duplicate graph targets.

## Contract projection

- stable records: {len(ids)};
- active exact duplicate edges: {len(duplicate_edges)};
- typed open discrepancies: {len(discrepancies)};
- typed implementation links: {len(links)};
- open review routes: {len(routes)}.

## Non-claims

This package does not validate the lesson's generic negation prose, register labels, phonics heading, every source reading, learner gloss, segmentation, naturalness, parser behavior, construction identity, productivity, frequency, or linguistic status. No source value is replaced.
"""
    (PKG_ROOT / "research-summary.md").write_text(research, encoding="utf-8")

    # Activate Week 16 and remove only its legacy and queue entries.
    registry["packages"].append(
        {
            "package_id": PKG_ID,
            "package_kind": "weekly",
            "root": PKG_ROOT_REL,
            "manifest": f"{PKG_ROOT_REL}/package-manifest.json",
            "authority_state": "reviewed",
            "authority_issue": AUTHORITY_ISSUE,
        }
    )
    registry["legacy_archives"] = [entry for entry in registry["legacy_archives"] if entry["package_id"] != PKG_ID]
    registry["migration_queue"] = [entry for entry in registry["migration_queue"] if entry["package_id"] != PKG_ID]
    write_json(REGISTRY_PATH, registry)

    file_names = [
        "source.json",
        "items.tsv",
        "record-ids.json",
        "review-authority.json",
        "review-events.json",
        "candidate-snapshot.json",
        "duplicate-edges.json",
        "discrepancies.json",
        "implementation-links.json",
        "routes.json",
        "aggregate.json",
        "review.json",
        "README.md",
        "research-summary.md",
    ]
    files = []
    for name in file_names:
        path = PKG_ROOT / name
        files.append(
            {
                "path": f"{PKG_ROOT_REL}/{name}",
                "role": role_for(path),
                "byte_sha256": byte_hash(path),
                "semantic_sha256": semantic_hash(path),
            }
        )

    candidate_path = PKG_ROOT / "candidate-snapshot.json"
    manifest = {
        "schema": "canto-span-pedagogical-corpus-package-v1",
        "package_id": PKG_ID,
        "package_kind": "weekly",
        "root": PKG_ROOT_REL,
        "lifecycle": "reviewed",
        "source": {
            "source_id": PKG_ID,
            "provider": "Glossika",
            "authorization_status": "authorized",
            "distribution": "repository_allowed",
            "authorization_basis": "User states Glossika granted permission to use all lesson data in this non-commercial private-use Canto Span project.",
            "original_file": f"{PKG_ROOT_REL}/source.json",
            "byte_sha256": source_byte,
            "semantic_sha256": source_semantic,
            "source_claims_authority": "metadata_only",
        },
        "lineage": {
            "lineage_id": f"lineage:{PKG_ID}",
            "parent_lineage_ids": [f"external:glossika-email:{EMAIL_ID}"],
            "independence_group": "provider:glossika:cantonese-hk-a1-newsletter-series",
        },
        "review_authority": {
            "state": "reviewed",
            "authority_issue": AUTHORITY_ISSUE,
            "reviewer_role": "project_reviewer",
            "reviewed_source_semantic_sha256": source_semantic,
            "authority_record": f"{PKG_ROOT_REL}/review-authority.json",
            "event_file": f"{PKG_ROOT_REL}/review-events.json",
        },
        "candidate_discovery": {
            "mode": "frozen_snapshot",
            "snapshot_file": f"{PKG_ROOT_REL}/candidate-snapshot.json",
            "snapshot_semantic_sha256": semantic_hash(candidate_path),
            "generator_command": None,
        },
        "files": files,
        "record_identity": {
            "record_file": f"{PKG_ROOT_REL}/record-ids.json",
            "id_field": "id",
            "continuity_lock_sha256": sha(canonical({"record_ids": ids})),
        },
        "relations": {
            "duplicate_edges_file": f"{PKG_ROOT_REL}/duplicate-edges.json",
            "discrepancies_file": f"{PKG_ROOT_REL}/discrepancies.json",
            "implementation_links_file": f"{PKG_ROOT_REL}/implementation-links.json",
            "routes_file": f"{PKG_ROOT_REL}/routes.json",
        },
        "projections": {
            "items_tsv_file": f"{PKG_ROOT_REL}/items.tsv",
            "aggregate_file": f"{PKG_ROOT_REL}/aggregate.json",
        },
        "summary": summary,
    }
    write_json(PKG_ROOT / "package-manifest.json", manifest)

    print(json.dumps({"package_id": PKG_ID, "source_byte": source_byte, "source_semantic": source_semantic, "items_byte": items_byte, "summary": summary}, indent=2))


if __name__ == "__main__":
    main()
