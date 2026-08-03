#!/usr/bin/env python3
from __future__ import annotations

import csv
import hashlib
import json
from pathlib import Path
import subprocess
from typing import Any

REPO = Path(__file__).resolve().parents[1]
PKG_ID = "GLOSSIKA-YUEHK-A1-W17-20260712"
PKG_ROOT_REL = f"data/pedagogical-corpus/glossika/{PKG_ID}"
PKG_ROOT = REPO / PKG_ROOT_REL
REGISTRY_PATH = REPO / "config/pedagogical-corpus-packages.json"
STALE_REF = "origin/agent/week17-ingress-review"
STALE_REVIEW_PATH = f"{PKG_ROOT_REL}/review.json"
STALE_LEGACY_PATH = f"{PKG_ROOT_REL}/legacy-reconciliation-r1.json"
STALE_PROJECT_ONLY_PATH = f"{PKG_ROOT_REL}/project-only-review-r1.json"
STALE_EVIDENCE_PATH = f"{PKG_ROOT_REL}/evidence-sources-r1.json"
AUTHORITY_ISSUE = 517
SOURCE_ISSUE = 134
ROUTE_OWNER_ISSUE = 134
AUTHORIZED_AT = "2026-08-04T06:25:00+08:00"
EMAIL_ID = "19f5511dfc37c9ea"


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


def discrepancy_type(value: dict[str, Any]) -> str:
    field = str(value.get("field", value.get("type", "other"))).lower()
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
    mapped = {
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
        "crosswalk.json": "control",
    }
    if name in mapped:
        return mapped[name]
    if path.suffix.lower() == ".md":
        return "documentation"
    return "control"


def source_signature(item: dict[str, Any]) -> tuple[str, str, str, str] | None:
    source = item.get("source", {})
    traditional = source.get("traditional")
    if not isinstance(traditional, str) or not traditional:
        return None
    jyutping = source.get("jyutping")
    english = source.get("english")
    return (
        str(item.get("itemType", "")),
        traditional,
        jyutping if isinstance(jyutping, str) else "",
        english if isinstance(english, str) else "",
    )


def main() -> None:
    source_path = PKG_ROOT / "source.json"
    items_path = PKG_ROOT / "items.tsv"
    crosswalk_path = PKG_ROOT / "crosswalk.json"

    source = json.loads(source_path.read_text(encoding="utf-8"))
    source_items = source["items"]
    assert len(source_items) == 75
    ids = [item["id"] for item in source_items]
    assert len(ids) == len(set(ids))

    with items_path.open("r", encoding="utf-8", newline="") as handle:
        tsv_ids = [row["id"] for row in csv.DictReader(handle, delimiter="\t")]
    assert tsv_ids == ids
    assert crosswalk_path.exists()

    stale_review = git_show_json(STALE_REVIEW_PATH)
    stale_legacy = git_show_json(STALE_LEGACY_PATH)
    project_only = git_show_json(STALE_PROJECT_ONLY_PATH)
    evidence_sources = git_show_json(STALE_EVIDENCE_PATH)
    assert stale_review["source_id"] == PKG_ID and stale_review["record_count"] == 75
    stale_records = {record["id"]: record for record in stale_review["records"]}
    assert list(stale_records) == ids
    assert project_only["record_count"] == 5
    assert evidence_sources["decision"]["source_item_id"] in ids

    registry = json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))

    duplicate_edges: list[dict[str, Any]] = []
    duplicate_targets: dict[str, dict[str, str]] = {}
    for item in source_items:
        record = stale_records[item["id"]]
        accepted = record.get("accepted_duplicate_targets", [])
        if accepted:
            target_id = accepted[0]["record_id"]
            target = {"package_id": PKG_ID, "record_id": target_id}
            duplicate_targets[item["id"]] = target
            duplicate_edges.append({
                "edge_id": f"W17-E-{item['ordinal']:03d}-SOURCE",
                "source": {"package_id": PKG_ID, "record_id": item["id"]},
                "target": target,
                "relation": "exact",
            })

    active_forms: dict[tuple[str, str, str, str], list[dict[str, str]]] = {}
    for entry in registry["packages"]:
        active_source = json.loads((REPO / entry["root"] / "source.json").read_text(encoding="utf-8"))
        for active_item in active_source["items"]:
            signature = source_signature(active_item)
            if signature:
                active_forms.setdefault(signature, []).append({
                    "package_id": entry["package_id"],
                    "record_id": active_item["id"],
                })
    for item in source_items:
        rid = item["id"]
        if rid in duplicate_targets:
            continue
        signature = source_signature(item)
        matches = active_forms.get(signature, []) if signature else []
        if matches:
            target = matches[-1]
            duplicate_targets[rid] = target
            duplicate_edges.append({
                "edge_id": f"W17-E-{item['ordinal']:03d}-ACTIVE",
                "source": {"package_id": PKG_ID, "record_id": rid},
                "target": target,
                "relation": "exact",
            })

    evidence_decision = evidence_sources["decision"]
    evidence_rid = evidence_decision["source_item_id"]
    proposed_reading = evidence_decision["reviewed_value"]

    discrepancies: list[dict[str, Any]] = []
    discrepancy_records: dict[str, list[str]] = {}
    for item in source_items:
        rid = item["id"]
        record = stale_records[rid]
        seen_types: set[str] = set()
        values = record.get("source_discrepancies", [])
        for index, value in enumerate(values, start=1):
            dtype = discrepancy_type(value)
            seen_types.add(dtype)
            proposed = rid == evidence_rid and dtype == "pronunciation"
            discrepancies.append({
                "discrepancy_id": f"W17-D-{item['ordinal']:03d}-{index:02d}",
                "source": {"package_id": PKG_ID, "record_id": rid},
                "type": dtype,
                "status": "proposed" if proposed else "open",
                "replacement_value": proposed_reading if proposed else None,
                "authority_issue": None,
            })
            discrepancy_records.setdefault(rid, []).append(dtype)

        terminal = record.get("terminal_ingress_classification")
        if terminal == "translation_discrepancy" and not ({"translation", "gloss"} & seen_types):
            discrepancies.append({
                "discrepancy_id": f"W17-D-{item['ordinal']:03d}-T",
                "source": {"package_id": PKG_ID, "record_id": rid},
                "type": "translation",
                "status": "open",
                "replacement_value": None,
                "authority_issue": None,
            })
            discrepancy_records.setdefault(rid, []).append("translation")
            seen_types.add("translation")
        if terminal == "naturalness_review_candidate" and "naturalness" not in seen_types:
            discrepancies.append({
                "discrepancy_id": f"W17-D-{item['ordinal']:03d}-N",
                "source": {"package_id": PKG_ID, "record_id": rid},
                "type": "naturalness",
                "status": "open",
                "replacement_value": None,
                "authority_issue": None,
            })
            discrepancy_records.setdefault(rid, []).append("naturalness")
            seen_types.add("naturalness")
        if terminal == "pronunciation_discrepancy" and "pronunciation" not in seen_types:
            proposed = rid == evidence_rid
            discrepancies.append({
                "discrepancy_id": f"W17-D-{item['ordinal']:03d}-P",
                "source": {"package_id": PKG_ID, "record_id": rid},
                "type": "pronunciation",
                "status": "proposed" if proposed else "open",
                "replacement_value": proposed_reading if proposed else None,
                "authority_issue": None,
            })
            discrepancy_records.setdefault(rid, []).append("pronunciation")
            seen_types.add("pronunciation")
        if item.get("itemType") == "phonics_pair" and not record.get("independent_evidence_ids") and "pronunciation" not in seen_types:
            discrepancies.append({
                "discrepancy_id": f"W17-D-{item['ordinal']:03d}-PH",
                "source": {"package_id": PKG_ID, "record_id": rid},
                "type": "pronunciation",
                "status": "open",
                "replacement_value": None,
                "authority_issue": None,
            })
            discrepancy_records.setdefault(rid, []).append("pronunciation")

    links: list[dict[str, Any]] = []
    link_seen: set[tuple[str, str, str]] = set()
    link_counter: dict[str, int] = {}
    parser_hint_records: set[str] = set()
    project_probe_records: set[str] = set()
    pronunciation_evidence_records: set[str] = set()
    implementation_targets: dict[str, list[str]] = {}

    def add_link(rid: str, link_type: str, target: str, authority: str) -> None:
        key = (rid, link_type, target)
        if key in link_seen:
            return
        link_seen.add(key)
        link_counter[rid] = link_counter.get(rid, 0) + 1
        ordinal = int(rid.rsplit("I", 1)[1])
        links.append({
            "link_id": f"W17-L-{ordinal:03d}-{link_counter[rid]:03d}",
            "source": {"package_id": PKG_ID, "record_id": rid},
            "type": link_type,
            "target": target,
            "authority": authority,
        })
        if link_type == "implementation_link":
            implementation_targets.setdefault(rid, []).append(target)

    project_id_to_source: dict[str, str] = {}
    for item in source_items:
        rid = item["id"]
        add_link(rid, "evidence_relation", f"{PKG_ROOT_REL}/crosswalk.json#{rid}", "informational")
        record = stale_records[rid]
        for packet in record.get("later_research_links", []):
            for existing in packet.get("existing_project_records", []):
                project_id = existing.get("id")
                suffix = f"#{project_id}" if project_id else ""
                add_link(rid, "evidence_relation", f"{existing['path']}{suffix}", "informational")
                if isinstance(project_id, str) and project_id:
                    project_id_to_source.setdefault(project_id, rid)
            for target in packet.get("canonical_lexicon_owners", []):
                add_link(rid, "implementation_link", target, "implementation_owner")
            for target in packet.get("parser_owner_candidates", []):
                add_link(rid, "parser_hint", target, "informational")
                parser_hint_records.add(rid)
            for evidence_id in packet.get("independent_evidence_ids", []):
                add_link(rid, "pronunciation_owner", f"evidence:{evidence_id}", "pronunciation_owner")
                pronunciation_evidence_records.add(rid)

    for claim in evidence_sources["claims"]:
        add_link(evidence_rid, "pronunciation_owner", claim["url"], "pronunciation_owner")
        pronunciation_evidence_records.add(evidence_rid)

    for probe in project_only["records"]:
        related = probe["relatedSourceProjectId"]
        rid = project_id_to_source.get(related)
        assert rid, f"project-only probe cannot resolve source project id {related}"
        add_link(rid, "evidence_relation", f"{probe['sourceProjectRecord']['path']}#{probe['id']}", "informational")
        project_probe_records.add(rid)

    route_requirements: dict[str, list[str]] = {}

    def need(rid: str, text: str) -> None:
        route_requirements.setdefault(rid, [])
        if text not in route_requirements[rid]:
            route_requirements[rid].append(text)

    for rid, types in discrepancy_records.items():
        need(rid, "Resolve typed discrepancies without mutating the immutable source layer.")
        unique = set(types)
        if "naturalness" in unique:
            need(rid, "Use controlled corpus or independent speaker evidence for naturalness and register.")
        if "pronunciation" in unique:
            need(rid, "Use independent item-level pronunciation evidence before learner-facing adoption.")
        if {"translation", "gloss"} & unique:
            need(rid, "Resolve contextual meaning before adopting a learner-facing translation or gloss.")
        if {"segmentation", "orthography", "other"} & unique:
            need(rid, "Keep inherited project assertions separate from independently authorized evidence.")
    for rid in parser_hint_records:
        need(rid, "Treat parser-owner paths as heuristic until an item-level runtime audit verifies ownership.")
    for rid in project_probe_records:
        need(rid, "Keep project-only naturalized alternatives outside source attestation and runtime/status promotion.")
    for rid in pronunciation_evidence_records:
        need(rid, "Preserve the source reading unchanged; any corrected learner-facing reading requires separate acceptance authority.")

    routes = []
    by_id = {item["id"]: item for item in source_items}
    for rid in ids:
        requirements = route_requirements.get(rid)
        if not requirements:
            continue
        item = by_id[rid]
        routes.append({
            "route_id": f"W17-R-{item['ordinal']:03d}",
            "source": {"package_id": PKG_ID, "record_id": rid},
            "owner_issue": ROUTE_OWNER_ISSUE,
            "status": "open",
            "requirements": requirements,
            "projected_record_ids": [rid],
        })

    record_file = {
        "schema": "canto-span-pedagogical-corpus-records-v1",
        "records": [{"id": rid} for rid in ids],
    }
    write_json(PKG_ROOT / "record-ids.json", record_file)

    source_semantic = semantic_hash(source_path)
    source_byte = byte_hash(source_path)
    items_byte = byte_hash(items_path)
    crosswalk_byte = byte_hash(crosswalk_path)

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
            f"Original Glossika email {EMAIL_ID} was read directly and matched to the immutable 75-record archive.",
            f"Immutable source.json SHA-256 {source_byte}.",
            f"Immutable items.tsv SHA-256 {items_byte}.",
            f"Preserved crosswalk.json SHA-256 {crosswalk_byte}.",
            "Source issue #134; stale claim #477 and PR #478 re-examined as evidence only.",
            "CUHK pronunciation database and Chinese Text Project support only the item-level 闊 fut3 proposal.",
        ],
        "replacement_rights": [],
    }
    write_json(PKG_ROOT / "review-authority.json", authority)

    events = []
    for item in source_items:
        rid = item["id"]
        record = stale_records[rid]
        terminal = record.get("terminal_ingress_classification")
        if terminal == "naturalness_review_candidate":
            decision = "ambiguous"
        elif terminal == "unusable":
            decision = "unusable"
        elif terminal == "new_corpus_attestation" and rid not in discrepancy_records:
            decision = "genuine"
        else:
            decision = "observation"
        basis = [f"Gmail {EMAIL_ID}; source #134; stale evidence #477/#478; migration #517"]
        if rid == evidence_rid:
            basis.append("CUHK and Chinese Text Project pronunciation-only evidence for 闊 fut3")
        events.append({
            "event_id": f"W17-REVIEW-{item['ordinal']:03d}",
            "record_id": rid,
            "event_type": "review",
            "reviewer_role": "project_reviewer",
            "reviewed_source_semantic_sha256": source_semantic,
            "decision_at": AUTHORIZED_AT,
            "decision_type": decision,
            "evidence_basis": basis,
            "replacement_authority_issue": None,
        })
    write_json(PKG_ROOT / "review-events.json", {"schema": "canto-span-pedagogical-review-events-v1", "events": events}, compact=True)

    candidates = []
    for item in source_items:
        rid = item["id"]
        refs: list[dict[str, str]] = [{
            "kind": "legacy_project_history",
            "target": f"{PKG_ROOT_REL}/crosswalk.json#{rid}",
            "basis": "preserved project reconciliation; informational only",
        }]
        if rid in duplicate_targets:
            target = duplicate_targets[rid]
            refs.append({
                "kind": "record_duplicate",
                "target": f"{target['package_id']}#{target['record_id']}",
                "basis": "reviewed exact source repeat or exact active-package match",
            })
        for target in implementation_targets.get(rid, []):
            refs.append({
                "kind": "implementation_owner",
                "target": target,
                "basis": "current runtime representation; no linguistic authority",
            })
        if rid in parser_hint_records:
            refs.append({
                "kind": "parser_hint",
                "target": "issue:#134",
                "basis": "heuristic parser-owner candidates require item-level audit",
            })
        if rid in route_requirements:
            refs.append({
                "kind": "open_review_route",
                "target": "issue:#134",
                "basis": "unresolved review requirement without source replacement",
            })
        if rid in pronunciation_evidence_records:
            refs.append({
                "kind": "pronunciation_evidence",
                "target": "W17-PRON-CUHK-FUT3|W17-PRON-CTEXT-FUT3",
                "basis": "pronunciation-only support; source remains immutable",
            })
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

    review_pointer = {
        "schema": "canto-span-pedagogical-contract-review-pointer-v1",
        "package_id": PKG_ID,
        "state": "reviewed",
        "authority_issue": AUTHORITY_ISSUE,
        "source_issue": SOURCE_ISSUE,
        "source_payload_hash": source["ingress"]["sourcePayloadHash"],
        "record_count": len(ids),
        "legacy_evidence": {
            "stale_claim": 477,
            "stale_pr": 478,
            "origin_reconciliation_pr": stale_legacy["origin_pull_request"],
            "authority": "evidence_only",
        },
        "findings": {
            "prior_terminal_classifications": stale_review["summary"]["terminal_classification_counts"],
            "inherited_pass_cells": 162,
            "inherited_promoted_accepted_cells": 131,
            "project_only_historical_probes": project_only["record_count"],
            "active_record_duplicate_edges": len(duplicate_edges),
            "open_or_proposed_discrepancies": len(discrepancies),
            "typed_links": len(links),
            "open_routes": len(routes),
            "source_replacements": 0,
            "proposed_pronunciation_corrections": 1,
        },
        "evidence_boundary": "Inherited project PASS/PROMOTED_ACCEPTED values, parser hints, and pedagogical attestations do not establish independent linguistic authority, parser correctness, productivity, or status.",
    }
    write_json(PKG_ROOT / "review.json", review_pointer)

    readme = f"""# Glossika Cantonese (HK) A1 Week 17 contract package

- Package ID: `{PKG_ID}`
- Lesson: Emotions & States
- Source date: 2026-07-12
- Gmail message: `{EMAIL_ID}`
- Source issue: #134
- Contract migration: #517
- Lifecycle: `reviewed` (not `accepted`)
- Stable records: {len(ids)}

## Authority boundary

`source.json`, `items.tsv`, `crosswalk.json`, and the legacy `w17-*` project records remain immutable. Inherited `PASS`, `REVIEW`, and `PROMOTED_ACCEPTED` values remain project history rather than independent evidence. Parser-owner paths are heuristic hints only.

The source pronunciation `闊 hyut3|kut3` remains unchanged. Independent CUHK and Chinese Text Project evidence supports a proposed `hyut3|fut3` learner-facing reading, but this reviewed package grants no replacement authority.

## Open work

Typed discrepancies and routes retain unresolved translation, naturalness, pronunciation, project-history, project-only-probe, and parser-ownership questions under issue #134. No source value is accepted as replaced.
"""
    (PKG_ROOT / "README.md").write_text(readme, encoding="utf-8")

    research = f"""# Week 17 migration research summary

The original Glossika email `{EMAIL_ID}` was checked directly against the retained 75-record archive. The package preserves every source row, three repeated rows, source order, IDs, `crosswalk.json`, and the legacy `w17-*` project records.

## Retained evidence

- stale claim #477 / PR #478: record-level reconciliation evidence only;
- inherited project assertions: 162 `PASS` cells and 131 `PROMOTED_ACCEPTED` cells, retained without self-authority;
- five project-only naturalized alternatives: historical probes, not source attestations;
- CUHK pronunciation database and Chinese Text Project: pronunciation-only support for `闊 fut3`;
- active Weeks 14–16: eligible cross-package duplicate targets.

## Contract projection

- stable records: {len(ids)};
- exact duplicate edges: {len(duplicate_edges)};
- typed open or proposed discrepancies: {len(discrepancies)};
- typed implementation/evidence links: {len(links)};
- open review routes: {len(routes)}.

## Non-claims

This package does not validate inherited project status fields, project-only probes, generic lesson claims, dialect-wide naturalness, parser ownership, parser behavior, construction identity, productivity, frequency, or linguistic status. No immutable source value is replaced.
"""
    (PKG_ROOT / "research-summary.md").write_text(research, encoding="utf-8")

    registry["packages"].append({
        "package_id": PKG_ID,
        "package_kind": "weekly",
        "root": PKG_ROOT_REL,
        "manifest": f"{PKG_ROOT_REL}/package-manifest.json",
        "authority_state": "reviewed",
        "authority_issue": AUTHORITY_ISSUE,
    })
    registry["legacy_archives"] = [entry for entry in registry["legacy_archives"] if entry["package_id"] != PKG_ID]
    registry["migration_queue"] = [entry for entry in registry["migration_queue"] if entry["package_id"] != PKG_ID]
    write_json(REGISTRY_PATH, registry)

    files = []
    for path in sorted(PKG_ROOT.rglob("*")):
        if not path.is_file() or path.name == "package-manifest.json":
            continue
        rel = path.relative_to(REPO).as_posix()
        files.append({
            "path": rel,
            "role": role_for(path),
            "byte_sha256": byte_hash(path),
            "semantic_sha256": semantic_hash(path),
        })

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

    print(json.dumps({
        "package_id": PKG_ID,
        "source_byte": source_byte,
        "source_semantic": source_semantic,
        "items_byte": items_byte,
        "crosswalk_byte": crosswalk_byte,
        "summary": summary,
    }, indent=2))


if __name__ == "__main__":
    main()
