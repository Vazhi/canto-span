#!/usr/bin/env python3
from pathlib import Path
import sys, unittest
ROOT=Path(__file__).resolve().parents[3]; sys.path.insert(0,str(ROOT)); sys.path.insert(0,str(Path(__file__).parent))
import tools.pedagogical_corpus_contract as mod
from pedagogical_corpus_contract_fixtures import *

class ContractTests(unittest.TestCase):
    def fail(self,root,reg,msg):
        with self.assertRaisesRegex(mod.ContractError,msg): mod.verify_registry(root,reg)
    def test_foundation_and_active_pass(self):
        root=repo(self); report=mod.verify_registry(root,registry(root)); self.assertEqual(report["migration_queue"],1); self.assertEqual(report["legacy_archives"],1)
        root,reg,_,_=active(self); self.assertEqual(mod.verify_registry(root,reg)["global"]["records"],2)
    def test_foundation_queue_failures(self):
        root=repo(self); entry,_=package(root); self.fail(root,registry(root,"foundation",[entry]),"foundation registry")
        root=repo(self); archive=legacy_item(); self.fail(root,registry(root,"foundation",queue=[],archives=[archive]),"migration queue")
        root=repo(self); queue=[queue_item("A",471,472),queue_item("B",471,474)]; archives=[legacy_item("A"),legacy_item("B")]; self.fail(root,registry(root,"foundation",queue=queue,archives=archives),"duplicate migration stale_claim")
    def test_active_root_queue_failures(self):
        root,reg,entries,_=active(self); data=load(reg); archive=legacy_item(entries[0]["package_id"],131,entries[0]["root"]); data["legacy_archives"]=[archive]; data["migration_queue"]=[queue_item(entries[0]["package_id"],source_root=entries[0]["root"])]; dump(reg,data); self.fail(root,reg,"remain in legacy archives")
        root=repo(self); entry,_=package(root); reg=registry(root,"active",[entry],[],[]); data=load(reg); data["package_root"]="other-root"; dump(reg,data); self.fail(root,reg,"package_root")
    def test_staged_legacy_archive_coverage(self):
        root,reg,entries,_=active(self); archive=legacy_item("PKG-OLD"); materialize_archives(root,[archive]); data=load(reg); data["legacy_archives"]=[archive]; data["migration_queue"]=[queue_item("PKG-OLD")]; dump(reg,data); self.assertEqual(mod.verify_registry(root,reg)["legacy_archives"],1)
        root,reg,_,_=active(self); data=load(reg); data["migration_queue"]=[queue_item("PKG-OLD")]; dump(reg,data); self.fail(root,reg,"lack legacy archive declarations")
        root,reg,_,_=active(self); archive=legacy_item("PKG-OLD"); materialize_archives(root,[archive]); data=load(reg); data["legacy_archives"]=[archive]; data["migration_queue"]=[queue_item("PKG-OLD",source_root="data/pedagogical-corpus/legacy/OTHER")]; dump(reg,data); self.fail(root,reg,"source_root does not match")
        root,reg,_,_=active(self); archive=legacy_item("PKG-OLD",source_root="outside/PKG-OLD"); materialize_archives(root,[archive]); data=load(reg); data["legacy_archives"]=[archive]; dump(reg,data); self.fail(root,reg,"outside configured package_root")
    def test_manifest_path_lifecycle_failures(self):
        root,reg,_,manifests=active(self); value=load(manifests[0]); value["extra"]=True; dump(manifests[0],value); self.fail(root,reg,"package manifest keys mismatch")
        root,reg,_,manifests=active(self); value=load(manifests[0]); value["lifecycle"]="reviewed"; dump(manifests[0],value); self.fail(root,reg,"lifecycle/authority state mismatch")
        root,reg,_,_=active(self); value=load(reg); value["packages"][0]["manifest"]="../escape.json"; dump(reg,value); self.fail(root,reg,"unsafe")
    def test_inventory_symlink_failures(self):
        root,reg,entries,_=active(self); (root/entries[0]["root"]/"extra").write_text("x"); self.fail(root,reg,"closed inventory mismatch")
        root,reg,_,_=active(self); path=root/"data/pedagogical-corpus/UNDECLARED/file"; path.parent.mkdir(parents=True); path.write_text("x"); self.fail(root,reg,"undeclared package file")
        root,reg,entries,_=active(self); link=root/entries[0]["root"]/"linked"; link.symlink_to(root/entries[0]["root"]/"source.json"); self.fail(root,reg,"symlink")
    def test_hash_failures(self):
        root,reg,entries,_=active(self); rel=f"{entries[0]['root']}/source.json"; (root/rel).write_text("{}\n"); self.fail(root,reg,"byte hash mismatch")
        root,reg,entries,manifests=active(self); rel=f"{entries[0]['root']}/source.json"; value=load(root/rel); value["records"][0]["cantonese"]="改"; dump(root/rel,value); manifest=load(manifests[0]); next(i for i in manifest["files"] if i["path"]==rel)["byte_sha256"]=mod.byte_hash(root/rel); dump(manifests[0],manifest); self.fail(root,reg,"semantic hash mismatch")
    def test_source_authority_failures(self):
        for field,value,msg in [("authorization_status","unknown","explicit authorization"),("source_claims_authority","accepted","metadata_only")]:
            root,reg,_,manifests=active(self); manifest=load(manifests[0]); manifest["source"][field]=value; dump(manifests[0],manifest)
            with self.subTest(field=field): self.fail(root,reg,msg)
    def test_review_event_failures(self):
        cases=[("empty","must contain events"),("partial","decide every record"),("digest","source digest mismatch"),("time","include a timezone"),("evidence","evidence_basis must be non-empty"),("self","cannot grant its own authority"),("duplicate","exactly one acceptance event per record"),("correction","must use the package authority issue")]
        for kind,msg in cases:
            root,reg,entries,manifests=active(self); base=entries[0]["root"]
            if kind=="evidence": rel=f"{base}/authority.json"; value=load(root/rel); value["evidence_basis"]=[]
            else:
                rel=f"{base}/review-events.json"; value=load(root/rel)
                if kind=="empty": value["events"]=[]
                elif kind=="partial": value["events"].pop()
                elif kind=="digest": value["events"][0]["reviewed_source_semantic_sha256"]="0"*64
                elif kind=="time": value["events"][0]["decision_at"]="2026-08-03T18:18:00"
                elif kind=="self": value["authority_issue"]=505
                elif kind=="duplicate": extra=dict(value["events"][0]); extra["event_id"]="EV-DUP"; value["events"].append(extra)
                else: value["events"][0].update(decision_type="accepted_correction",replacement_authority_issue=999)
            dump(root/rel,value); refresh(root,manifests[0],rel)
            with self.subTest(kind=kind): self.fail(root,reg,msg)
    def test_identity_projection_failures(self):
        for kind,msg in [("continuity","continuity lock"),("candidate","project every record"),("items","items projection drift"),("aggregate","aggregate projection drift")]:
            root,reg,entries,manifests=active(self); base=entries[0]["root"]; value=load(manifests[0])
            if kind=="continuity": value["record_identity"]["continuity_lock_sha256"]="0"*64; dump(manifests[0],value)
            elif kind=="candidate": rel=f"{base}/candidate-snapshot.json"; data=load(root/rel); data["candidates"].pop(); dump(root/rel,data); value=refresh(root,manifests[0],rel); value["candidate_discovery"]["snapshot_semantic_sha256"]=mod.semantic_hash(root/rel); dump(manifests[0],value)
            elif kind=="items": rel=f"{base}/items.tsv"; (root/rel).write_text("record_id\tcantonese\nI002\tb\nI001\ta\n"); refresh(root,manifests[0],rel)
            else: rel=f"{base}/aggregate.json"; data=load(root/rel); data["summary"]["record_count"]=99; dump(root/rel,data); refresh(root,manifests[0],rel)
            with self.subTest(kind=kind): self.fail(root,reg,msg)
    def test_duplicate_graph_failures(self):
        root,reg,_,manifests=active(self); edge={"edge_id":"E1","source":{"package_id":"PKG-A","record_id":"I001"},"target":{"package_id":"PKG-A","record_id":"NOPE"},"relation":"exact"}; relation(root,manifests[0],"duplicate_edges_file","edges",[edge]); self.fail(root,reg,"missing source or target")
        root,reg,_,manifests=active(self); edges=[{"edge_id":"E1","source":{"package_id":"PKG-A","record_id":"I001"},"target":{"package_id":"PKG-A","record_id":"I002"},"relation":"exact"},{"edge_id":"E2","source":{"package_id":"PKG-A","record_id":"I002"},"target":{"package_id":"PKG-A","record_id":"I001"},"relation":"normalized"}]; relation(root,manifests[0],"duplicate_edges_file","edges",edges); self.fail(root,reg,"duplicate graph cycle")
    def test_typed_relation_failures(self):
        root,reg,_,manifests=active(self); link={"link_id":"L1","source":{"package_id":"PKG-A","record_id":"I001"},"type":"parser_hint","target":"src/parser.js","authority":"implementation_owner"}; relation(root,manifests[0],"implementation_links_file","links",[link]); self.fail(root,reg,"typed authority mismatch")
        for issue,rights,msg in [(None,[],"missing authority"),(999,["pronunciation"],"does not match package review authority"),(505,[],"not covered by replacement rights")]:
            root,reg,entries,manifests=active(self); rel=f"{entries[0]['root']}/authority.json"; auth=load(root/rel); auth["replacement_rights"]=rights; dump(root/rel,auth); refresh(root,manifests[0],rel); item={"discrepancy_id":"D1","source":{"package_id":"PKG-A","record_id":"I001"},"type":"pronunciation","status":"accepted","replacement_value":"fut3","authority_issue":issue}; relation(root,manifests[0],"discrepancies_file","discrepancies",[item])
            with self.subTest(issue=issue,rights=rights): self.fail(root,reg,msg)
        root,reg,_,manifests=active(self); route={"route_id":"R1","source":{"package_id":"PKG-A","record_id":"NOPE"},"owner_issue":700,"status":"open","requirements":["review"],"projected_record_ids":["NOPE"]}; relation(root,manifests[0],"routes_file","routes",[route]); self.fail(root,reg,"source missing")
    def test_global_route_lineage_failures(self):
        root,reg,_,manifests=active(self,2)
        for i,pid in enumerate(("PKG-A","PKG-B")): relation(root,manifests[i],"routes_file","routes",[{"route_id":"R-SHARED","source":{"package_id":pid,"record_id":"I001"},"owner_issue":700+i,"status":"open","requirements":["review"],"projected_record_ids":["I001"]}])
        self.fail(root,reg,"duplicate route_id")
        root,reg,_,manifests=active(self,2); value=load(manifests[0]); value["lineage"]["parent_lineage_ids"]=["missing:lineage"]; dump(manifests[0],value); self.fail(root,reg,"known parent lineage")
        root,reg,_,manifests=active(self,2); a,b=load(manifests[0]),load(manifests[1]); a["lineage"]["parent_lineage_ids"]=[b["lineage"]["lineage_id"]]; b["lineage"]["parent_lineage_ids"]=[a["lineage"]["lineage_id"]]; dump(manifests[0],a); dump(manifests[1],b); self.fail(root,reg,"lineage cycle")

if __name__=="__main__": unittest.main(verbosity=2)
