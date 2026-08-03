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


def dump(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def file_entry(repo: Path, rel: str, role: str) -> dict:
    return {"path": rel, "role": role, "byte_sha256": mod.byte_hash(repo / rel), "semantic_sha256": mod.semantic_hash(repo / rel)}


def queue_item(package_id="PKG-OLD", claim=471, pr=472):
    return {"package_id": package_id, "source_issue": 131, "stale_claim": claim, "stale_pr": pr, "source_root": f"data/pedagogical-corpus/legacy/{package_id}"}


def write_registry(repo: Path, state="foundation", packages=None, queue=None) -> Path:
    path = repo / "config/registry.json"
    dump(path, {
        "schema": mod.REGISTRY_SCHEMA,
        "registry_state": state,
        "package_root": "data/pedagogical-corpus",
        "packages": packages or [],
        "migration_queue": [queue_item()] if queue is None and state == "foundation" else (queue or []),
        "invariants": mod.REGISTRY_INVARIANTS,
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
    dump(repo / source_rel, {"schema": mod.RECORDS_SCHEMA, "records": [{"record_id": rid, "cantonese": f"句子 {rid}"} for rid in record_ids]})
    source_sem = mod.semantic_hash(repo / source_rel)
    authority_rel = f"{root_rel}/authority.json"
    dump(repo / authority_rel, {
        "schema": mod.AUTHORITY_SCHEMA,
        "authority_issue": authority_issue,
        "authority_kind": "acceptance",
        "authorized_state": "accepted",
        "reviewer_role": "project_reviewer",
        "source_semantic_sha256": source_sem,
        "authorized_at": "2026-08-03T18:18:00+08:00",
        "scope": package_id,
        "evidence_basis": ["fixture review"],
        "replacement_rights": [],
    })
    events_rel = f"{root_rel}/review-events.json"
    dump(repo / events_rel, {
        "schema": mod.REVIEW_EVENTS_SCHEMA,
        "events": [{
            "event_id": f"EV-{rid}",
            "record_id": rid,
            "event_type": "acceptance",
            "reviewer_role": "project_reviewer",
            "reviewed_source_semantic_sha256": source_sem,
            "decision_at": "2026-08-03T18:18:00+08:00",
            "decision_type": "genuine",
            "evidence_basis": ["fixture review"],
            "replacement_authority_issue": None,
        } for rid in record_ids],
    })
    candidate_rel = f"{root_rel}/candidate-snapshot.json"
    dump(repo / candidate_rel, {"schema": mod.CANDIDATE_SCHEMA, "candidates": [{"record_id": rid, "candidate_refs": []} for rid in record_ids]})
    duplicate_rel = f"{root_rel}/duplicate-edges.json"
    discrepancy_rel = f"{root_rel}/discrepancies.json"
    links_rel = f"{root_rel}/implementation-links.json"
    routes_rel = f"{root_rel}/routes.json"
    dump(repo / duplicate_rel, {"schema": mod.RELATION_SCHEMAS["duplicate_edges_file"][1], "edges": []})
    dump(repo / discrepancy_rel, {"schema": mod.RELATION_SCHEMAS["discrepancies_file"][1], "discrepancies": []})
    dump(repo / links_rel, {"schema": mod.RELATION_SCHEMAS["implementation_links_file"][1], "links": []})
    dump(repo / routes_rel, {"schema": mod.RELATION_SCHEMAS["routes_file"][1], "routes": []})
    items_rel = f"{root_rel}/items.tsv"
    (repo / items_rel).write_text("record_id\tcantonese\n" + "".join(f"{rid}\t句子 {rid}\n" for rid in record_ids), encoding="utf-8")
    summary = {"record_count": len(record_ids), "duplicate_edge_count": 0, "discrepancy_count": 0, "implementation_link_count": 0, "route_count": 0}
    aggregate_rel = f"{root_rel}/aggregate.json"
    dump(repo / aggregate_rel, {"package_id": package_id, "summary": summary})
    roles = {
        source_rel: "source_original", authority_rel: "authority_record", events_rel: "review_events",
        candidate_rel: "candidate_snapshot", duplicate_rel: "duplicate_edges", discrepancy_rel: "discrepancies",
        links_rel: "implementation_links", routes_rel: "routes", items_rel: "items_projection", aggregate_rel: "aggregate_projection",
    }
    manifest_rel = f"{root_rel}/package-manifest.json"
    manifest = {
        "schema": mod.PACKAGE_SCHEMA, "package_id": package_id, "package_kind": "other", "root": root_rel, "lifecycle": "reviewed",
        "source": {"source_id": f"source:{package_id}", "provider": "fixture", "authorization_status": "authorized", "distribution": "repository_allowed", "authorization_basis": "fixture authorization", "original_file": source_rel, "byte_sha256": mod.byte_hash(repo / source_rel), "semantic_sha256": source_sem, "source_claims_authority": "metadata_only"},
        "lineage": {"lineage_id": lineage_id, "parent_lineage_ids": parent_lineages, "independence_group": f"independence:{package_id}"},
        "review_authority": {"state": "accepted", "authority_issue": authority_issue, "reviewer_role": "project_reviewer", "reviewed_source_semantic_sha256": source_sem, "authority_record": authority_rel, "event_file": events_rel},
        "candidate_discovery": {"mode": "frozen_snapshot", "snapshot_file": candidate_rel, "snapshot_semantic_sha256": mod.semantic_hash(repo / candidate_rel), "generator_command": None},
        "files": [file_entry(repo, rel, role) for rel, role in roles.items()],
        "record_identity": {"record_file": source_rel, "id_field": "record_id", "continuity_lock_sha256": mod.continuity_hash(record_ids)},
        "relations": {"duplicate_edges_file": duplicate_rel, "discrepancies_file": discrepancy_rel, "implementation_links_file": links_rel, "routes_file": routes_rel},
        "projections": {"items_tsv_file": items_rel, "aggregate_file": aggregate_rel},
        "summary": summary,
    }
    dump(repo / manifest_rel, manifest)
    return {"package_id": package_id, "package_kind": "other", "root": root_rel, "manifest": manifest_rel, "authority_state": "accepted", "authority_issue": authority_issue}, repo / manifest_rel


def refresh_file(repo: Path, manifest_path: Path, rel: str) -> dict:
    manifest = load(manifest_path)
    for item in manifest["files"]:
        if item["path"] == rel:
            item["byte_sha256"] = mod.byte_hash(repo / rel)
            item["semantic_sha256"] = mod.semantic_hash(repo / rel)
            break
    dump(manifest_path, manifest)
    return manifest


def set_relation(repo: Path, manifest_path: Path, field: str, collection: str, values) -> None:
    manifest = load(manifest_path)
    rel = manifest["relations"][field]
    data = load(repo / rel); data[collection] = values; dump(repo / rel, data)
    manifest = refresh_file(repo, manifest_path, rel)
    count_field = {"duplicate_edges_file": "duplicate_edge_count", "discrepancies_file": "discrepancy_count", "implementation_links_file": "implementation_link_count", "routes_file": "route_count"}[field]
    manifest["summary"][count_field] = len(values); dump(manifest_path, manifest)
    aggregate_rel = manifest["projections"]["aggregate_file"]
    dump(repo / aggregate_rel, {"package_id": manifest["package_id"], "summary": manifest["summary"]})
    refresh_file(repo, manifest_path, aggregate_rel)


class ContractTests(unittest.TestCase):
    def repo(self):
        tmp = tempfile.TemporaryDirectory(); self.addCleanup(tmp.cleanup); return Path(tmp.name)

    def active(self, count=1):
        repo = self.repo(); entries=[]; manifests=[]
        for i in range(count):
            entry, manifest = build_package(repo, package_id=f"PKG-{chr(65+i)}", authority_issue=505+i)
            entries.append(entry); manifests.append(manifest)
        return repo, write_registry(repo, state="active", packages=entries, queue=[]), entries, manifests

    def test_foundation_and_active_fixtures_pass(self):
        repo = self.repo()
        self.assertEqual(mod.verify_registry(repo, write_registry(repo))["migration_queue"], 1)
        repo, registry, _, _ = self.active()
        self.assertEqual(mod.verify_registry(repo, registry)["global"]["records"], 2)

    def test_foundation_and_migration_queue_fail_closed(self):
        repo = self.repo(); entry, _ = build_package(repo)
        registry = write_registry(repo, state="foundation", packages=[entry])
        with self.assertRaisesRegex(mod.ContractError, "foundation registry"):
            mod.verify_registry(repo, registry)

        repo = self.repo()
        registry = write_registry(repo, state="foundation", queue=[])
        with self.assertRaisesRegex(mod.ContractError, "migration queue"):
            mod.verify_registry(repo, registry)

        repo = self.repo()
        registry = write_registry(repo, state="foundation", queue=[
            queue_item("A", 471, 472), queue_item("B", 471, 474),
        ])
        with self.assertRaisesRegex(mod.ContractError, "duplicate migration stale_claim"):
            mod.verify_registry(repo, registry)

    def test_active_registry_root_and_queue_boundaries(self):
        repo, registry, entries, _ = self.active()
        data = load(registry); data["migration_queue"]=[queue_item(entries[0]["package_id"],471,472)]; dump(registry,data)
        with self.assertRaisesRegex(mod.ContractError, "remain in migration queue"): mod.verify_registry(repo, registry)
        repo = self.repo(); entry, _ = build_package(repo)
        data = write_registry(repo, state="active", packages=[entry], queue=[])
        value=load(data); value["package_root"]="other-root"; dump(data,value)
        with self.assertRaisesRegex(mod.ContractError, "package_root"): mod.verify_registry(repo,data)

    def test_manifest_and_path_shape_fail_closed(self):
        repo, registry, _, manifests = self.active()
        manifest=load(manifests[0]); manifest["extra"]=True; dump(manifests[0],manifest)
        with self.assertRaisesRegex(mod.ContractError,"package manifest keys mismatch"): mod.verify_registry(repo,registry)
        repo, registry, _, _ = self.active(); value=load(registry); value["packages"][0]["manifest"]="../escape.json"; dump(registry,value)
        with self.assertRaisesRegex(mod.ContractError,"unsafe"): mod.verify_registry(repo,registry)

    def test_closed_inventory_and_symlink_fail_closed(self):
        repo, registry, entries, _ = self.active(); (repo/entries[0]["root"] / "extra.txt").write_text("x")
        with self.assertRaisesRegex(mod.ContractError,"closed inventory mismatch"): mod.verify_registry(repo,registry)
        repo, registry, _, _ = self.active(); path=repo/"data/pedagogical-corpus/UNDECLARED/file"; path.parent.mkdir(parents=True); path.write_text("x")
        with self.assertRaisesRegex(mod.ContractError,"undeclared package file"): mod.verify_registry(repo,registry)

    def test_byte_and_semantic_hashes_fail_closed(self):
        repo, registry, entries, manifests = self.active(); rel=f"{entries[0]['root']}/source.json"; (repo/rel).write_text("{}\n")
        with self.assertRaisesRegex(mod.ContractError,"byte hash mismatch"): mod.verify_registry(repo,registry)
        repo, registry, entries, manifests = self.active(); rel=f"{entries[0]['root']}/source.json"; source=load(repo/rel); source["records"][0]["cantonese"]="改"; dump(repo/rel,source)
        manifest=load(manifests[0]); next(item for item in manifest["files"] if item["path"]==rel)["byte_sha256"]=mod.byte_hash(repo/rel); dump(manifests[0],manifest)
        with self.assertRaisesRegex(mod.ContractError,"semantic hash mismatch"): mod.verify_registry(repo,registry)

    def test_source_authorization_and_claim_quarantine(self):
        for field, value, message in [("authorization_status","unknown","explicit authorization"),("source_claims_authority","accepted","metadata_only")]:
            repo, registry, _, manifests = self.active(); manifest=load(manifests[0]); manifest["source"][field]=value; dump(manifests[0],manifest)
            with self.subTest(field=field), self.assertRaisesRegex(mod.ContractError,message): mod.verify_registry(repo,registry)

    def test_review_authority_and_events_are_bound(self):
        mutations = [
            ("events-empty", "must contain events"), ("events-partial", "decide every record"),
            ("event-digest", "source digest mismatch"), ("event-time", "include a timezone"),
            ("authority-evidence", "evidence_basis must be non-empty"), ("self-authority", "cannot grant its own authority"),
        ]
        for mutation, message in mutations:
            repo, registry, entries, manifests = self.active(); root=entries[0]["root"]
            if mutation.startswith("authority"):
                rel=f"{root}/authority.json"; value=load(repo/rel); value["evidence_basis"]=[]
            else:
                rel=f"{root}/review-events.json"; value=load(repo/rel)
                if mutation=="events-empty": value["events"]=[]
                elif mutation=="events-partial": value["events"].pop()
                elif mutation=="event-digest": value["events"][0]["reviewed_source_semantic_sha256"]="0"*64
                elif mutation=="event-time": value["events"][0]["decision_at"]="2026-08-03T18:18:00"
                elif mutation=="self-authority": value["authority_issue"]=505
            dump(repo/rel,value); refresh_file(repo,manifests[0],rel)
            with self.subTest(mutation=mutation), self.assertRaisesRegex(mod.ContractError,message): mod.verify_registry(repo,registry)

    def test_identity_candidate_and_projection_drift_fail(self):
        mutations=[("continuity","continuity lock"),("candidate","project every record"),("items","items projection drift"),("aggregate","aggregate projection drift")]
        for mutation,message in mutations:
            repo,registry,entries,manifests=self.active(); root=entries[0]["root"]; manifest=load(manifests[0])
            if mutation=="continuity": manifest["record_identity"]["continuity_lock_sha256"]="0"*64; dump(manifests[0],manifest)
            elif mutation=="candidate":
                rel=f"{root}/candidate-snapshot.json"; value=load(repo/rel); value["candidates"].pop(); dump(repo/rel,value); manifest=refresh_file(repo,manifests[0],rel); manifest["candidate_discovery"]["snapshot_semantic_sha256"]=mod.semantic_hash(repo/rel); dump(manifests[0],manifest)
            elif mutation=="items": rel=f"{root}/items.tsv"; (repo/rel).write_text("record_id\tcantonese\nI002\tb\nI001\ta\n"); refresh_file(repo,manifests[0],rel)
            else: rel=f"{root}/aggregate.json"; value=load(repo/rel); value["summary"]["record_count"]=99; dump(repo/rel,value); refresh_file(repo,manifests[0],rel)
            with self.subTest(mutation=mutation), self.assertRaisesRegex(mod.ContractError,message): mod.verify_registry(repo,registry)

    def test_duplicate_graph_targets_and_cycles_fail(self):
        repo,registry,_,manifests=self.active(); edge={"edge_id":"E1","source":{"package_id":"PKG-A","record_id":"I001"},"target":{"package_id":"PKG-A","record_id":"NOPE"},"relation":"exact"}; set_relation(repo,manifests[0],"duplicate_edges_file","edges",[edge])
        with self.assertRaisesRegex(mod.ContractError,"missing source or target"): mod.verify_registry(repo,registry)
        repo,registry,_,manifests=self.active(); edges=[{"edge_id":"E1","source":{"package_id":"PKG-A","record_id":"I001"},"target":{"package_id":"PKG-A","record_id":"I002"},"relation":"exact"},{"edge_id":"E2","source":{"package_id":"PKG-A","record_id":"I002"},"target":{"package_id":"PKG-A","record_id":"I001"},"relation":"normalized"}]; set_relation(repo,manifests[0],"duplicate_edges_file","edges",edges)
        with self.assertRaisesRegex(mod.ContractError,"duplicate graph cycle"): mod.verify_registry(repo,registry)

    def test_typed_links_discrepancies_and_routes_fail_closed(self):
        repo,registry,_,manifests=self.active(); link={"link_id":"L1","source":{"package_id":"PKG-A","record_id":"I001"},"type":"parser_hint","target":"src/parser.js","authority":"implementation_owner"}; set_relation(repo,manifests[0],"implementation_links_file","links",[link])
        with self.assertRaisesRegex(mod.ContractError,"typed authority mismatch"): mod.verify_registry(repo,registry)
        repo,registry,_,manifests=self.active(); value={"discrepancy_id":"D1","source":{"package_id":"PKG-A","record_id":"I001"},"type":"pronunciation","status":"accepted","replacement_value":"fut3","authority_issue":None}; set_relation(repo,manifests[0],"discrepancies_file","discrepancies",[value])
        with self.assertRaisesRegex(mod.ContractError,"missing authority"): mod.verify_registry(repo,registry)
        repo,registry,_,manifests=self.active(); route={"route_id":"R1","source":{"package_id":"PKG-A","record_id":"NOPE"},"owner_issue":700,"status":"open","requirements":["review"],"projected_record_ids":["NOPE"]}; set_relation(repo,manifests[0],"routes_file","routes",[route])
        with self.assertRaisesRegex(mod.ContractError,"source missing"): mod.verify_registry(repo,registry)

    def test_global_route_and_lineage_integrity(self):
        repo,registry,_,manifests=self.active(2)
        for i,pkg in enumerate(("PKG-A","PKG-B")):
            route={"route_id":"R-SHARED","source":{"package_id":pkg,"record_id":"I001"},"owner_issue":700+i,"status":"open","requirements":["review"],"projected_record_ids":["I001"]}; set_relation(repo,manifests[i],"routes_file","routes",[route])
        with self.assertRaisesRegex(mod.ContractError,"duplicate route_id"): mod.verify_registry(repo,registry)
        repo,registry,_,manifests=self.active(); manifest=load(manifests[0]); manifest["lineage"]["parent_lineage_ids"]=["missing:lineage"]; dump(manifests[0],manifest)
        with self.assertRaisesRegex(mod.ContractError,"unknown parent lineage"): mod.verify_registry(repo,registry)
        repo,registry,_,manifests=self.active(2); a=load(manifests[0]); b=load(manifests[1]); a["lineage"]["parent_lineage_ids"]=[b["lineage"]["lineage_id"]]; b["lineage"]["parent_lineage_ids"]=[a["lineage"]["lineage_id"]]; dump(manifests[0],a); dump(manifests[1],b)
        with self.assertRaisesRegex(mod.ContractError,"lineage cycle"): mod.verify_registry(repo,registry)


if __name__ == "__main__":
    unittest.main(verbosity=2)
