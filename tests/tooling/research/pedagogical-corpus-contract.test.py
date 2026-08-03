#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
import tempfile
import unittest

import sys
REPO_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(REPO_ROOT))
import tools.pedagogical_corpus_contract as mod

INVARIANTS = mod.REGISTRY_INVARIANTS


def dump(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def file_entry(repo: Path, rel: str, role: str) -> dict:
    path = repo / rel
    return {
        "path": rel,
        "role": role,
        "byte_sha256": mod.byte_hash(path),
        "semantic_sha256": mod.semantic_hash(path),
    }


def queue_item(package_id="PKG-OLD", claim=471, pr=472):
    return {
        "package_id": package_id,
        "source_issue": 131,
        "stale_claim": claim,
        "stale_pr": pr,
        "source_root": f"data/pedagogical-corpus/legacy/{package_id}",
    }


def write_registry(repo: Path, state="foundation", packages=None, queue=None) -> Path:
    path = repo / "config/registry.json"
    dump(path, {
        "schema": mod.REGISTRY_SCHEMA,
        "registry_state": state,
        "package_root": "data/pedagogical-corpus",
        "packages": packages or [],
        "migration_queue": [queue_item()] if queue is None and state == "foundation" else (queue or []),
        "invariants": INVARIANTS,
    })
    return path


def build_package(repo: Path, package_id="PKG-A", record_ids=None, authority_issue=505, lineage_id=None, parent_lineages=None):
    record_ids = record_ids or ["I001", "I002"]
    lineage_id = lineage_id or f"lineage:{package_id}"
    parent_lineages = parent_lineages or ["external:provider"]
    root_rel = f"data/pedagogical-corpus/{package_id}"
    root = repo / root_rel
    root.mkdir(parents=True, exist_ok=True)

    source_rel = f"{root_rel}/source.json"
    source = {
        "schema": mod.RECORDS_SCHEMA,
        "records": [{"record_id": rid, "cantonese": f"句子 {rid}"} for rid in record_ids],
    }
    dump(repo / source_rel, source)
    source_sem = mod.semantic_hash(repo / source_rel)

    authority_rel = f"{root_rel}/authority.json"
    dump(repo / authority_rel, {
        "schema": mod.AUTHORITY_SCHEMA,
        "authority_issue": authority_issue,
        "authorized_state": "accepted",
        "reviewer_role": "project_reviewer",
        "source_semantic_sha256": source_sem,
    })
    events_rel = f"{root_rel}/review-events.json"
    dump(repo / events_rel, {"schema": mod.REVIEW_EVENTS_SCHEMA, "events": []})
    candidate_rel = f"{root_rel}/candidate-snapshot.json"
    dump(repo / candidate_rel, {
        "schema": mod.CANDIDATE_SCHEMA,
        "candidates": [{"record_id": rid, "candidate_refs": []} for rid in record_ids],
    })
    duplicate_rel = f"{root_rel}/duplicate-edges.json"
    dump(repo / duplicate_rel, {"schema": mod.RELATION_SCHEMAS["duplicate_edges_file"][1], "edges": []})
    discrepancy_rel = f"{root_rel}/discrepancies.json"
    dump(repo / discrepancy_rel, {"schema": mod.RELATION_SCHEMAS["discrepancies_file"][1], "discrepancies": []})
    links_rel = f"{root_rel}/implementation-links.json"
    dump(repo / links_rel, {"schema": mod.RELATION_SCHEMAS["implementation_links_file"][1], "links": []})
    routes_rel = f"{root_rel}/routes.json"
    dump(repo / routes_rel, {"schema": mod.RELATION_SCHEMAS["routes_file"][1], "routes": []})
    items_rel = f"{root_rel}/items.tsv"
    (repo / items_rel).write_text("record_id\tcantonese\n" + "".join(f"{rid}\t句子 {rid}\n" for rid in record_ids), encoding="utf-8")
    aggregate_rel = f"{root_rel}/aggregate.json"
    summary = {"record_count": len(record_ids), "duplicate_edge_count": 0, "discrepancy_count": 0, "implementation_link_count": 0, "route_count": 0}
    dump(repo / aggregate_rel, {"package_id": package_id, "summary": summary})

    roles = {
        source_rel: "source_original",
        authority_rel: "authority_record",
        events_rel: "review_events",
        candidate_rel: "candidate_snapshot",
        duplicate_rel: "duplicate_edges",
        discrepancy_rel: "discrepancies",
        links_rel: "implementation_links",
        routes_rel: "routes",
        items_rel: "items_projection",
        aggregate_rel: "aggregate_projection",
    }
    manifest_rel = f"{root_rel}/package-manifest.json"
    manifest = {
        "schema": mod.PACKAGE_SCHEMA,
        "package_id": package_id,
        "package_kind": "other",
        "root": root_rel,
        "lifecycle": "reviewed",
        "source": {
            "source_id": f"source:{package_id}",
            "provider": "fixture",
            "authorization_status": "authorized",
            "distribution": "repository_allowed",
            "authorization_basis": "fixture authorization",
            "original_file": source_rel,
            "byte_sha256": mod.byte_hash(repo / source_rel),
            "semantic_sha256": source_sem,
            "source_claims_authority": "metadata_only",
        },
        "lineage": {
            "lineage_id": lineage_id,
            "parent_lineage_ids": parent_lineages,
            "independence_group": f"independence:{package_id}",
        },
        "review_authority": {
            "state": "accepted",
            "authority_issue": authority_issue,
            "reviewer_role": "project_reviewer",
            "reviewed_source_semantic_sha256": source_sem,
            "authority_record": authority_rel,
            "event_file": events_rel,
        },
        "candidate_discovery": {
            "mode": "frozen_snapshot",
            "snapshot_file": candidate_rel,
            "snapshot_semantic_sha256": mod.semantic_hash(repo / candidate_rel),
            "generator_command": None,
        },
        "files": [file_entry(repo, rel, role) for rel, role in roles.items()],
        "record_identity": {
            "record_file": source_rel,
            "id_field": "record_id",
            "continuity_lock_sha256": mod.continuity_hash(record_ids),
        },
        "relations": {
            "duplicate_edges_file": duplicate_rel,
            "discrepancies_file": discrepancy_rel,
            "implementation_links_file": links_rel,
            "routes_file": routes_rel,
        },
        "projections": {"items_tsv_file": items_rel, "aggregate_file": aggregate_rel},
        "summary": summary,
    }
    dump(repo / manifest_rel, manifest)
    entry = {
        "package_id": package_id,
        "package_kind": "other",
        "root": root_rel,
        "manifest": manifest_rel,
        "authority_state": "accepted",
        "authority_issue": authority_issue,
    }
    return entry, repo / manifest_rel


def refresh_file(repo: Path, manifest_path: Path, rel: str) -> dict:
    manifest = load(manifest_path)
    for item in manifest["files"]:
        if item["path"] == rel:
            item["byte_sha256"] = mod.byte_hash(repo / rel)
            item["semantic_sha256"] = mod.semantic_hash(repo / rel)
            break
    else:
        raise AssertionError(rel)
    dump(manifest_path, manifest)
    return manifest


def update_manifest(manifest_path: Path, manifest: dict) -> None:
    dump(manifest_path, manifest)


class ContractTests(unittest.TestCase):
    def make_repo(self):
        tmp = tempfile.TemporaryDirectory()
        repo = Path(tmp.name)
        return tmp, repo

    def verify(self, repo, registry):
        return mod.verify_registry(repo, registry)

    def active_fixture(self, packages=1):
        tmp, repo = self.make_repo()
        entries = []
        manifests = []
        for i in range(packages):
            entry, manifest = build_package(repo, package_id=f"PKG-{chr(65+i)}", authority_issue=505+i)
            entries.append(entry)
            manifests.append(manifest)
        registry = write_registry(repo, state="active", packages=entries, queue=[])
        return tmp, repo, registry, entries, manifests

    def test_foundation_registry_passes(self):
        tmp, repo = self.make_repo()
        self.addCleanup(tmp.cleanup)
        report = self.verify(repo, write_registry(repo))
        self.assertEqual(report["registry_state"], "foundation")
        self.assertEqual(report["migration_queue"], 1)

    def test_foundation_registry_rejects_active_package(self):
        tmp, repo = self.make_repo(); self.addCleanup(tmp.cleanup)
        entry, _ = build_package(repo)
        registry = write_registry(repo, state="foundation", packages=[entry])
        with self.assertRaisesRegex(mod.ContractError, "foundation registry"):
            self.verify(repo, registry)

    def test_foundation_requires_migration_queue(self):
        tmp, repo = self.make_repo(); self.addCleanup(tmp.cleanup)
        registry = write_registry(repo, state="foundation", queue=[])
        with self.assertRaisesRegex(mod.ContractError, "migration queue"):
            self.verify(repo, registry)

    def test_duplicate_migration_claim_fails(self):
        tmp, repo = self.make_repo(); self.addCleanup(tmp.cleanup)
        registry = write_registry(repo, state="foundation", queue=[queue_item("A", 471, 472), queue_item("B", 471, 474)])
        with self.assertRaisesRegex(mod.ContractError, "duplicate migration stale_claim"):
            self.verify(repo, registry)

    def test_active_package_passes(self):
        tmp, repo, registry, _, _ = self.active_fixture(); self.addCleanup(tmp.cleanup)
        report = self.verify(repo, registry)
        self.assertEqual(report["global"]["records"], 2)

    def test_manifest_extra_field_fails(self):
        tmp, repo, registry, _, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        manifest = load(manifests[0]); manifest["self_authorized"] = True; update_manifest(manifests[0], manifest)
        with self.assertRaisesRegex(mod.ContractError, "package manifest keys mismatch"):
            self.verify(repo, registry)

    def test_unsafe_manifest_path_fails(self):
        tmp, repo, registry, entries, _ = self.active_fixture(); self.addCleanup(tmp.cleanup)
        data = load(registry); data["packages"][0]["manifest"] = "../escape.json"; dump(registry, data)
        with self.assertRaisesRegex(mod.ContractError, "unsafe"):
            self.verify(repo, registry)

    def test_untracked_package_file_fails(self):
        tmp, repo, registry, entries, _ = self.active_fixture(); self.addCleanup(tmp.cleanup)
        (repo / entries[0]["root"] / "extra.txt").write_text("extra", encoding="utf-8")
        with self.assertRaisesRegex(mod.ContractError, "closed inventory mismatch"):
            self.verify(repo, registry)

    def test_undeclared_package_file_fails(self):
        tmp, repo, registry, _, _ = self.active_fixture(); self.addCleanup(tmp.cleanup)
        path = repo / "data/pedagogical-corpus/UNDECLARED/file.json"; path.parent.mkdir(parents=True); path.write_text("{}", encoding="utf-8")
        with self.assertRaisesRegex(mod.ContractError, "undeclared package file"):
            self.verify(repo, registry)

    def test_symlink_fails(self):
        tmp, repo, registry, entries, _ = self.active_fixture(); self.addCleanup(tmp.cleanup)
        target = repo / entries[0]["root"] / "source.json"
        link = repo / entries[0]["root"] / "linked.json"
        try:
            link.symlink_to(target)
        except OSError:
            self.skipTest("symlinks unavailable")
        with self.assertRaisesRegex(mod.ContractError, "symlink"):
            self.verify(repo, registry)

    def test_byte_hash_drift_fails(self):
        tmp, repo, registry, entries, _ = self.active_fixture(); self.addCleanup(tmp.cleanup)
        (repo / entries[0]["root"] / "source.json").write_text("{}\n", encoding="utf-8")
        with self.assertRaisesRegex(mod.ContractError, "byte hash mismatch"):
            self.verify(repo, registry)

    def test_semantic_hash_drift_fails_after_byte_refresh(self):
        tmp, repo, registry, entries, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        source_rel = f"{entries[0]['root']}/source.json"
        source = load(repo / source_rel); source["records"][0]["cantonese"] = "改"; dump(repo / source_rel, source)
        manifest = load(manifests[0])
        for item in manifest["files"]:
            if item["path"] == source_rel:
                item["byte_sha256"] = mod.byte_hash(repo / source_rel)
        update_manifest(manifests[0], manifest)
        with self.assertRaisesRegex(mod.ContractError, "semantic hash mismatch"):
            self.verify(repo, registry)

    def test_source_claims_must_be_quarantined(self):
        tmp, repo, registry, _, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        manifest = load(manifests[0]); manifest["source"]["source_claims_authority"] = "accepted"; update_manifest(manifests[0], manifest)
        with self.assertRaisesRegex(mod.ContractError, "metadata_only"):
            self.verify(repo, registry)

    def test_repository_source_requires_authorization(self):
        tmp, repo, registry, _, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        manifest = load(manifests[0]); manifest["source"]["authorization_status"] = "unknown"; update_manifest(manifests[0], manifest)
        with self.assertRaisesRegex(mod.ContractError, "explicit authorization"):
            self.verify(repo, registry)

    def test_review_event_cannot_self_authorize(self):
        tmp, repo, registry, entries, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        rel = f"{entries[0]['root']}/review-events.json"
        events = load(repo / rel); events["authority_issue"] = 505; dump(repo / rel, events)
        refresh_file(repo, manifests[0], rel)
        with self.assertRaisesRegex(mod.ContractError, "cannot grant its own authority"):
            self.verify(repo, registry)

    def test_registry_authority_mismatch_fails(self):
        tmp, repo, registry, _, _ = self.active_fixture(); self.addCleanup(tmp.cleanup)
        data = load(registry); data["packages"][0]["authority_state"] = "reviewed"; dump(registry, data)
        with self.assertRaisesRegex(mod.ContractError, "authority state mismatch"):
            self.verify(repo, registry)

    def test_continuity_lock_drift_fails(self):
        tmp, repo, registry, _, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        manifest = load(manifests[0]); manifest["record_identity"]["continuity_lock_sha256"] = "0" * 64; update_manifest(manifests[0], manifest)
        with self.assertRaisesRegex(mod.ContractError, "continuity lock"):
            self.verify(repo, registry)

    def test_candidate_projection_drift_fails(self):
        tmp, repo, registry, entries, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        rel = f"{entries[0]['root']}/candidate-snapshot.json"
        snapshot = load(repo / rel); snapshot["candidates"].pop(); dump(repo / rel, snapshot)
        manifest = refresh_file(repo, manifests[0], rel)
        manifest["candidate_discovery"]["snapshot_semantic_sha256"] = mod.semantic_hash(repo / rel); update_manifest(manifests[0], manifest)
        with self.assertRaisesRegex(mod.ContractError, "project every record"):
            self.verify(repo, registry)

    def test_items_projection_drift_fails(self):
        tmp, repo, registry, entries, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        rel = f"{entries[0]['root']}/items.tsv"
        (repo / rel).write_text("record_id\tcantonese\nI002\tb\nI001\ta\n", encoding="utf-8")
        refresh_file(repo, manifests[0], rel)
        with self.assertRaisesRegex(mod.ContractError, "items projection drift"):
            self.verify(repo, registry)

    def test_aggregate_projection_drift_fails(self):
        tmp, repo, registry, entries, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        rel = f"{entries[0]['root']}/aggregate.json"
        aggregate = load(repo / rel); aggregate["summary"]["record_count"] = 99; dump(repo / rel, aggregate)
        refresh_file(repo, manifests[0], rel)
        with self.assertRaisesRegex(mod.ContractError, "aggregate projection drift"):
            self.verify(repo, registry)

    def set_relation(self, repo, manifest_path, entry, field, collection, values):
        manifest = load(manifest_path); rel = manifest["relations"][field]
        data = load(repo / rel); data[collection] = values; dump(repo / rel, data)
        manifest = refresh_file(repo, manifest_path, rel)
        count_field = {"duplicate_edges_file": "duplicate_edge_count", "discrepancies_file": "discrepancy_count", "implementation_links_file": "implementation_link_count", "routes_file": "route_count"}[field]
        manifest["summary"][count_field] = len(values)
        update_manifest(manifest_path, manifest)
        aggregate_rel = manifest["projections"]["aggregate_file"]
        dump(repo / aggregate_rel, {"package_id": manifest["package_id"], "summary": manifest["summary"]})
        refresh_file(repo, manifest_path, aggregate_rel)

    def test_duplicate_missing_target_fails(self):
        tmp, repo, registry, entries, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        edge = {"edge_id": "E1", "source": {"package_id": "PKG-A", "record_id": "I001"}, "target": {"package_id": "PKG-A", "record_id": "NOPE"}, "relation": "exact"}
        self.set_relation(repo, manifests[0], entries[0], "duplicate_edges_file", "edges", [edge])
        with self.assertRaisesRegex(mod.ContractError, "missing source or target"):
            self.verify(repo, registry)

    def test_duplicate_cycle_fails(self):
        tmp, repo, registry, entries, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        edges = [
            {"edge_id": "E1", "source": {"package_id": "PKG-A", "record_id": "I001"}, "target": {"package_id": "PKG-A", "record_id": "I002"}, "relation": "exact"},
            {"edge_id": "E2", "source": {"package_id": "PKG-A", "record_id": "I002"}, "target": {"package_id": "PKG-A", "record_id": "I001"}, "relation": "normalized"},
        ]
        self.set_relation(repo, manifests[0], entries[0], "duplicate_edges_file", "edges", edges)
        with self.assertRaisesRegex(mod.ContractError, "duplicate graph cycle"):
            self.verify(repo, registry)

    def test_parser_hint_cannot_be_authoritative(self):
        tmp, repo, registry, entries, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        link = {"link_id": "L1", "source": {"package_id": "PKG-A", "record_id": "I001"}, "type": "parser_hint", "target": "src/parser.js", "authority": "implementation_owner"}
        self.set_relation(repo, manifests[0], entries[0], "implementation_links_file", "links", [link])
        with self.assertRaisesRegex(mod.ContractError, "typed authority mismatch"):
            self.verify(repo, registry)

    def test_accepted_discrepancy_requires_authority(self):
        tmp, repo, registry, entries, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        value = {"discrepancy_id": "D1", "source": {"package_id": "PKG-A", "record_id": "I001"}, "type": "pronunciation", "status": "accepted", "replacement_value": "fut3", "authority_issue": None}
        self.set_relation(repo, manifests[0], entries[0], "discrepancies_file", "discrepancies", [value])
        with self.assertRaisesRegex(mod.ContractError, "missing authority"):
            self.verify(repo, registry)

    def test_route_requires_existing_source(self):
        tmp, repo, registry, entries, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        route = {"route_id": "R1", "source": {"package_id": "PKG-A", "record_id": "NOPE"}, "owner_issue": 700, "status": "open", "requirements": ["speaker review"], "projected_record_ids": ["NOPE"]}
        self.set_relation(repo, manifests[0], entries[0], "routes_file", "routes", [route])
        with self.assertRaisesRegex(mod.ContractError, "source missing"):
            self.verify(repo, registry)

    def test_duplicate_route_id_across_packages_fails(self):
        tmp, repo, registry, entries, manifests = self.active_fixture(packages=2); self.addCleanup(tmp.cleanup)
        for i, package_id in enumerate(("PKG-A", "PKG-B")):
            route = {"route_id": "R-SHARED", "source": {"package_id": package_id, "record_id": "I001"}, "owner_issue": 700+i, "status": "open", "requirements": ["review"], "projected_record_ids": ["I001"]}
            self.set_relation(repo, manifests[i], entries[i], "routes_file", "routes", [route])
        with self.assertRaisesRegex(mod.ContractError, "duplicate route_id"):
            self.verify(repo, registry)

    def test_unknown_lineage_parent_fails(self):
        tmp, repo, registry, _, manifests = self.active_fixture(); self.addCleanup(tmp.cleanup)
        manifest = load(manifests[0]); manifest["lineage"]["parent_lineage_ids"] = ["missing:lineage"]; update_manifest(manifests[0], manifest)
        with self.assertRaisesRegex(mod.ContractError, "unknown parent lineage"):
            self.verify(repo, registry)

    def test_lineage_cycle_fails(self):
        tmp, repo, registry, entries, manifests = self.active_fixture(packages=2); self.addCleanup(tmp.cleanup)
        first = load(manifests[0]); second = load(manifests[1])
        first["lineage"]["parent_lineage_ids"] = [second["lineage"]["lineage_id"]]
        second["lineage"]["parent_lineage_ids"] = [first["lineage"]["lineage_id"]]
        update_manifest(manifests[0], first); update_manifest(manifests[1], second)
        with self.assertRaisesRegex(mod.ContractError, "lineage cycle"):
            self.verify(repo, registry)


if __name__ == "__main__":
    unittest.main(verbosity=2)
