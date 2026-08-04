#!/usr/bin/env python3
from __future__ import annotations

import csv
import hashlib
import json
from pathlib import Path
import subprocess
from typing import Any

REPO = Path(__file__).resolve().parents[1]
PKG_ID = "GLOSSIKA-YUEHK-A1-W18-20260719"
PKG_ROOT_REL = f"data/pedagogical-corpus/glossika/{PKG_ID}"
PKG_ROOT = REPO / PKG_ROOT_REL
REGISTRY_PATH = REPO / "config/pedagogical-corpus-packages.json"
STALE_REF = "origin/agent/week18-ingress-review"
STALE_REVIEW_PATH = f"{PKG_ROOT_REL}/review.json"
STALE_IMPLEMENTATION_PATH = f"{PKG_ROOT_REL}/implementation-crosswalk-r1.json"
STALE_ROUTING_PATH = f"{PKG_ROOT_REL}/research-routing-r1.json"
AUTHORITY_ISSUE = 520
SOURCE_ISSUE = 135
ROUTE_OWNER_ISSUE = 481
AUTHORIZED_AT = "2026-08-04T10:35:00+08:00"
EMAIL_ID = "19f7923023e862d2"
YIU_DOI = "10.1016/j.lingua.2021.103049"
YIU_URL = "https://researchportal.hkust.edu.hk/en/publications/the-origin-and-development-of-the-question-particle-me1-in-canton/"


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


def stable_map(rows: Any, label: str, key: str = "id") -> dict[str, dict[str, Any]]:
    assert isinstance(rows, list), f"{label} must be an array"
    result: dict[str, dict[str, Any]] = {}
    for row in rows:
        assert isinstance(row, dict), f"{label} row must be an object"
        value = row.get(key)
        assert isinstance(value, str) and value, f"{label} row missing {key}"
        assert value not in result, f"duplicate {label} {key}: {value}"
        result[value] = row
    return result


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


def source_ids_in(value: Any, valid: set[str]) -> set[str]:
    found: set[str] = set()
    if isinstance(value, str):
        if value in valid:
            found.add(value)
    elif isinstance(value, list):
        for child in value:
            found |= source_ids_in(child, valid)
    elif isinstance(value, dict):
        for child in value.values():
            found |= source_ids_in(child, valid)
    return found


def useful_route_texts(value: Any) -> list[str]:
    texts: list[str] = []
    if not isinstance(value, dict):
        return texts
    for key, child in value.items():
        lowered = key.lower()
        if isinstance(child, str) and child.strip() and any(token in lowered for token in ("question", "evidence", "require", "next", "boundary", "claim")):
            texts.append(child.strip())
        elif isinstance(child, list) and any(token in lowered for token in ("evidence", "require", "question", "next")):
            for entry in child:
                if isinstance(entry, str) and entry.strip():
                    texts.append(entry.strip())
    return texts


def role_for(path: Path) -> str:
    mapped = {
        "source.json": "source_original",
        "items.tsv": "items_projection",
        "crosswalk.json": "control",
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
    }
    return mapped[path.name]


def main() -> None:
    source_path = PKG_ROOT / "source.json"
    items_path = PKG_ROOT / "items.tsv"
    crosswalk_path = PKG_ROOT / "crosswalk.json"
    source = json.loads(source_path.read_text(encoding="utf-8"))
    source_items = source["items"]
    assert len(source_items) == 99
    ids = [item["id"] for item in source_items]
    id_set = set(ids)
    assert len(ids) == len(id_set)

    with items_path.open("r", encoding="utf-8", newline="") as handle:
        tsv_ids = [row["id"] for row in csv.DictReader(handle, delimiter="\t")]
    assert tsv_ids == ids
    assert crosswalk_path.exists()

    stale_review = git_show_json(STALE_REVIEW_PATH)
    stale_implementation = git_show_json(STALE_IMPLEMENTATION_PATH)
    stale_routing = git_show_json(STALE_ROUTING_PATH)
    assert stale_review["source_id"] == PKG_ID and stale_review["record_count"] == 99
    stale_records = stable_map(stale_review["records"], "review record")
    assert list(stale_records) == ids
    implementation_records = stable_map(stale_implementation["records"], "implementation record")
    assert list(implementation_records) == ids

    claims = stable_map(stale_routing["claims"], "research claim")
    routes_input = stable_map(stale_routing["routes"], "research route")
    assert stale_routing["claim_count"] == len(claims) == 16
    assert stale_routing["route_count"] == len(routes_input) == 13

    registry = json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))

    # Exact corpus identity is based only on full source signatures against active packages.
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

    duplicate_edges: list[dict[str, Any]] = []
    duplicate_targets: dict[str, dict[str, str]] = {}
    for item in source_items:
        signature = source_signature(item)
        matches = active_forms.get(signature, []) if signature else []
        if matches:
            target = matches[-1]
            duplicate_targets[item["id"]] = target
            duplicate_edges.append({
                "edge_id": f"W18-E-{item['ordinal']:03d}",
                "source": {"package_id": PKG_ID, "record_id": item["id"]},
                "target": target,
                "relation": "exact",
            })

    # Only an established source defect belongs in the discrepancy dimension.
    unusable_ids = [
        item["id"] for item in source_items
        if stale_records[item["id"]].get("terminal_ingress_classification") == "unusable"
    ]
    assert unusable_ids == [f"{PKG_ID}-I097"]
    discrepancies = [{
        "discrepancy_id": "W18-D-097-P",
        "source": {"package_id": PKG_ID, "record_id": unusable_ids[0]},
        "type": "pronunciation",
        "status": "open",
        "replacement_value": None,
        "authority_issue": None,
    }]

    links: list[dict[str, Any]] = []
    link_seen: set[tuple[str, str, str]] = set()
    link_counter: dict[str, int] = {}
    parser_hint_records: set[str] = set()
    path_observation_records: set[str] = set()
    claim_membership: dict[str, list[str]] = {rid: [] for rid in ids}

    def add_link(rid: str, link_type: str, target: str, authority: str) -> None:
        key = (rid, link_type, target)
        if key in link_seen:
            return
        link_seen.add(key)
        link_counter[rid] = link_counter.get(rid, 0) + 1
        ordinal = int(rid.rsplit("I", 1)[1])
        links.append({
            "link_id": f"W18-L-{ordinal:03d}-{link_counter[rid]:03d}",
            "source": {"package_id": PKG_ID, "record_id": rid},
            "type": link_type,
            "target": target,
            "authority": authority,
        })

    for item in source_items:
        rid = item["id"]
        add_link(rid, "evidence_relation", f"{PKG_ROOT_REL}/crosswalk.json#{rid}", "informational")
        implementation = implementation_records[rid]
        for target in implementation.get("implementation_targets", []):
            path = target["path"] if isinstance(target, dict) else str(target)
            add_link(rid, "evidence_relation", f"legacy-pr:480#path-only-implementation:{path}", "informational")
            path_observation_records.add(rid)
        for target in implementation.get("parser_owner_hints", []):
            add_link(rid, "parser_hint", str(target), "informational")
            parser_hint_records.add(rid)
        for target in implementation.get("exact_project_occurrence_paths", []):
            path = target["path"] if isinstance(target, dict) and "path" in target else str(target)
            add_link(rid, "token_occurrence", path, "informational")

    for claim_id, claim in claims.items():
        applicable = source_ids_in(claim, id_set)
        assert applicable, f"claim has no source projection: {claim_id}"
        for rid in sorted(applicable):
            claim_membership[rid].append(claim_id)
            add_link(rid, "evidence_relation", f"legacy-pr:480#claim:{claim_id}", "informational")

    # Preserve the historical bad source ID, but bind current evidence to the verified author.
    i001 = f"{PKG_ID}-I001"
    add_link(i001, "evidence_relation", "historical-ledger:S-CHEUNG-2021-ME1", "informational")
    add_link(i001, "evidence_relation", f"doi:{YIU_DOI}#author=Carine-Yuk-man-Yiu", "informational")
    add_link(i001, "evidence_relation", YIU_URL, "informational")

    route_requirements: dict[str, list[str]] = {}
    route_membership: dict[str, list[str]] = {rid: [] for rid in ids}

    def need(rid: str, text: str) -> None:
        route_requirements.setdefault(rid, [])
        if text not in route_requirements[rid]:
            route_requirements[rid].append(text)

    for route_id, route in routes_input.items():
        applicable = source_ids_in(route, id_set)
        assert applicable, f"route has no source projection: {route_id}"
        details = useful_route_texts(route)
        for rid in sorted(applicable):
            route_membership[rid].append(route_id)
            need(rid, f"Retained Week 18 follow-up {route_id} remains owned by issue #481; open work is not completed evidence.")
            for detail in details[:3]:
                need(rid, detail)
            add_link(rid, "evidence_relation", f"legacy-pr:480#route:{route_id}", "informational")

    for rid, record in stale_records.items():
        terminal = record.get("terminal_ingress_classification")
        if terminal == "naturalness_review_candidate":
            need(rid, "Use direct Cantonese discourse/corpus evidence and controlled speaker review before accepting formula or register naturalness.")
        for value in record.get("source_discrepancies", []):
            status = str(value.get("status", ""))
            if status == "retained_research_route_481":
                issue = str(value.get("issue", "Unresolved source analysis requires research."))
                need(rid, issue)
        if rid in path_observation_records:
            need(rid, "Verify an exact item-level runtime owner locator, represented form, reading, role, and segmentation before treating historical path occurrence as implementation coverage.")
        if rid in parser_hint_records:
            need(rid, "Treat broad parser paths as heuristic search hints until an item-level parser audit verifies ownership and behavior.")

    need(i001, "Use Carine Yuk-man Yiu as the current author attribution for DOI 10.1016/j.lingua.2021.103049; retain the Cheung attribution only as historical ledger provenance.")
    need(f"{PKG_ID}-I097", "Resolve the incomplete source phonics pair 香 / — with independent item-level pronunciation evidence while preserving the source row unchanged.")

    routes: list[dict[str, Any]] = []
    for rid in ids:
        requirements = route_requirements.get(rid)
        if not requirements:
            continue
        ordinal = int(rid.rsplit("I", 1)[1])
        memberships = sorted(set(route_membership[rid]))
        if memberships:
            requirements.insert(0, "Historical route IDs: " + ", ".join(memberships) + ".")
        routes.append({
            "route_id": f"W18-R-{ordinal:03d}",
            "source": {"package_id": PKG_ID, "record_id": rid},
            "owner_issue": ROUTE_OWNER_ISSUE,
            "status": "open",
            "requirements": requirements,
            "projected_record_ids": [rid],
        })

    record_file = {"schema": "canto-span-pedagogical-corpus-records-v1", "records": [{"id": rid} for rid in ids]}
    write_json(PKG_ROOT / "record-ids.json", record_file)

    source_semantic = semantic_hash(source_path)
    source_byte = byte_hash(source_path)
    items_byte = byte_hash(items_path)
    crosswalk_byte = byte_hash(crosswalk_path)

    ledger_basis = []
    for ledger in stale_routing["ledger_files"]:
        ledger_basis.append(f"Retained ledger {ledger['path']} SHA-256 {ledger['sha256']}.")

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
            f"Original Glossika email {EMAIL_ID} was read directly and matched to the immutable 99-record archive.",
            f"Immutable source.json SHA-256 {source_byte}.",
            f"Immutable items.tsv SHA-256 {items_byte}.",
            f"Immutable crosswalk.json SHA-256 {crosswalk_byte}.",
            "Stale claim #479 and PR #480 were re-examined as evidence only; unresolved review blockers were not inherited as authority.",
            f"DOI {YIU_DOI} is currently attributed to Carine Yuk-man Yiu; the retained Cheung source ID remains historical provenance only.",
            *ledger_basis,
        ],
        "replacement_rights": [],
    }
    write_json(PKG_ROOT / "review-authority.json", authority)

    events = []
    routed_ids = {route["source"]["record_id"] for route in routes}
    for item in source_items:
        rid = item["id"]
        terminal = stale_records[rid].get("terminal_ingress_classification")
        if terminal == "unusable":
            decision = "unusable"
        elif terminal == "naturalness_review_candidate":
            decision = "ambiguous"
        elif rid in routed_ids or item.get("itemType") in {"lexical_entry", "grammar_entry", "phonics_pair"}:
            decision = "observation"
        else:
            decision = "genuine"
        events.append({
            "event_id": f"W18-REVIEW-{item['ordinal']:03d}",
            "record_id": rid,
            "event_type": "review",
            "reviewer_role": "project_reviewer",
            "reviewed_source_semantic_sha256": source_semantic,
            "decision_at": AUTHORIZED_AT,
            "decision_type": decision,
            "evidence_basis": [f"Gmail {EMAIL_ID}; source #135; retained research PR #282; stale evidence #479/#480; migration #520"],
            "replacement_authority_issue": None,
        })
    write_json(PKG_ROOT / "review-events.json", {"schema": "canto-span-pedagogical-review-events-v1", "events": events}, compact=True)

    route_ids_by_record = {route["source"]["record_id"]: route["route_id"] for route in routes}
    candidates = []
    for item in source_items:
        rid = item["id"]
        refs: list[dict[str, str]] = []
        if rid in duplicate_targets:
            target = duplicate_targets[rid]
            refs.append({
                "kind": "active_package_duplicate",
                "target": f"{target['package_id']}#{target['record_id']}",
                "basis": "Exact item type, traditional form, Jyutping, and English match against an active package.",
            })
        if claim_membership[rid]:
            refs.append({
                "kind": "bounded_research_claims",
                "target": ",".join(sorted(set(claim_membership[rid]))),
                "basis": "Retained research claims are informational and do not authorize parser, source, or status changes.",
            })
        if rid in route_ids_by_record:
            refs.append({
                "kind": "open_review_route",
                "target": route_ids_by_record[rid],
                "basis": "Locally materialized open route owned by issue #481.",
            })
        if rid == i001:
            refs.append({
                "kind": "provenance_amendment",
                "target": f"doi:{YIU_DOI}",
                "basis": "Current author attribution is Carine Yuk-man Yiu; the old Cheung source ID is historical only.",
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
        "legacy_evidence": {"stale_claim": 479, "stale_pr": 480, "authority": "evidence_only"},
        "findings": {
            "prior_terminal_classifications": stale_review["summary"]["terminal_classification_counts"],
            "retained_claims": len(claims),
            "retained_followup_routes": len(routes_input),
            "locally_materialized_routes": len(routes),
            "path_only_implementation_records": len(path_observation_records),
            "parser_hint_records": len(parser_hint_records),
            "established_source_discrepancies": len(discrepancies),
            "source_replacements": 0,
            "citation_amendment": {"historical_source_id": "S-CHEUNG-2021-ME1", "current_author": "Carine Yuk-man Yiu", "doi": YIU_DOI},
        },
        "evidence_boundary": "Pedagogical attestation, path occurrence, parser hints, retained claims, and open routes do not establish source correctness, item-level implementation ownership, productivity, parser correctness, construction identity, or linguistic status.",
    }
    write_json(PKG_ROOT / "review.json", review_pointer)

    readme = f"""# Glossika Cantonese (HK) A1 Week 18 contract package

- Package ID: `{PKG_ID}`
- Lesson: Common Verbs
- Source date: 2026-07-19
- Gmail message: `{EMAIL_ID}`
- Source issue: #135
- Contract migration: #520
- Open follow-up owner: #481
- Lifecycle: `reviewed` (not `accepted`)
- Stable records: {len(ids)}

## Authority boundary

`source.json`, `items.tsv`, `crosswalk.json`, and the four retained research ledgers remain immutable. Path-only runtime candidates and broad parser lists are informational until exact item-level locators are independently verified. Open research questions are routes, not source defects.

The retained source ID `S-CHEUNG-2021-ME1` is historical provenance only. DOI `{YIU_DOI}` is currently attributed to Carine Yuk-man Yiu.

## Open work

The local route projection preserves all item-level research, naturalness, parser-audit, implementation-owner, temporal, particle, motion, numeral-provenance, and phonics dependencies under issue #481. The incomplete `香 / —` row is the only established source discrepancy in this migration. No source value is replaced.
"""
    (PKG_ROOT / "README.md").write_text(readme, encoding="utf-8")

    research = f"""# Week 18 migration research summary

The original Glossika email `{EMAIL_ID}` was read directly and matched to the retained 99-record archive. The shared-contract migration re-examined stale PR #480 and did not inherit its unresolved authority assumptions.

## Blocker repairs

- current provenance attributes DOI `{YIU_DOI}` to Carine Yuk-man Yiu while retaining the old Cheung source ID as historical metadata;
- unresolved analysis and naturalness questions are represented as routes rather than source discrepancies;
- path-only implementation candidates are informational evidence relations pending exact item-level owner verification;
- broad parser lists remain parser hints;
- the 13 retained follow-ups are checked for unique IDs and materialized into local record-bound routes;
- the historical numeral ID offset remains evidence provenance and does not rewrite source rows.

## Contract projection

- stable records: {len(ids)};
- exact active-package duplicate edges: {len(duplicate_edges)};
- established source discrepancies: {len(discrepancies)};
- bounded informational links: {len(links)};
- local open routes: {len(routes)}.

No parser behavior, runtime resource, source value, research ledger, construction status, native-panel state, survey state, release state, or deployment state changed.
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

    file_names = [
        "source.json", "items.tsv", "crosswalk.json", "record-ids.json", "review-authority.json",
        "review-events.json", "candidate-snapshot.json", "duplicate-edges.json", "discrepancies.json",
        "implementation-links.json", "routes.json", "aggregate.json", "review.json", "README.md",
        "research-summary.md",
    ]
    files = []
    for name in file_names:
        path = PKG_ROOT / name
        files.append({
            "path": f"{PKG_ROOT_REL}/{name}",
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
        "claims": len(claims),
        "historical_routes": len(routes_input),
        "path_only_records": len(path_observation_records),
        "parser_hint_records": len(parser_hint_records),
    }, indent=2))


if __name__ == "__main__":
    main()
