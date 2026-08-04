from __future__ import annotations
import json
from pathlib import Path
import tempfile
import tools.pedagogical_corpus_contract as mod

def repo(case):
    tmp=tempfile.TemporaryDirectory(); case.addCleanup(tmp.cleanup); return Path(tmp.name)
def dump(path,value):
    path.parent.mkdir(parents=True,exist_ok=True); path.write_text(json.dumps(value,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
def load(path): return json.loads(path.read_text(encoding="utf-8"))
def file_entry(root,rel,role): return {"path":rel,"role":role,"byte_sha256":mod.byte_hash(root/rel),"semantic_sha256":mod.semantic_hash(root/rel)}
def queue_item(pid="PKG-OLD",claim=471,pr=472,issue=131,source_root=None):
    return {"package_id":pid,"source_issue":issue,"stale_claim":claim,"stale_pr":pr,"source_root":source_root or f"data/pedagogical-corpus/legacy/{pid}"}
def legacy_item(pid="PKG-OLD",issue=131,source_root=None):
    return {"package_id":pid,"source_issue":issue,"source_root":source_root or f"data/pedagogical-corpus/legacy/{pid}"}
def materialize_archives(root,archives):
    for archive in archives:
        path=root/archive["source_root"]; path.mkdir(parents=True,exist_ok=True)
        marker=path/"source.json"
        if not marker.exists(): dump(marker,{"legacy_archive":archive["package_id"]})
def registry(root,state="foundation",packages=None,queue=None,archives=None):
    if queue is None: queue=[queue_item()] if state=="foundation" else []
    if archives is None:
        archives=[legacy_item(item["package_id"],item["source_issue"],item["source_root"]) for item in queue]
    materialize_archives(root,archives)
    path=root/"config/registry.json"
    dump(path,{"schema":mod.REGISTRY_SCHEMA,"registry_state":state,"package_root":"data/pedagogical-corpus","packages":packages or [],"legacy_archives":archives,"migration_queue":queue,"invariants":mod.REGISTRY_INVARIANTS})
    return path

def package(root,pid="PKG-A",records=None,issue=505,lineage=None,parents=None):
    records=records or ["I001","I002"]; lineage=lineage or f"lineage:{pid}"; parents=parents or ["external:provider"]
    base=f"data/pedagogical-corpus/{pid}"; (root/base).mkdir(parents=True)
    source=f"{base}/source.json"; dump(root/source,{"schema":mod.RECORDS_SCHEMA,"records":[{"record_id":rid,"cantonese":f"句子 {rid}"} for rid in records]}); sem=mod.semantic_hash(root/source)
    authority=f"{base}/authority.json"; dump(root/authority,{"schema":mod.AUTHORITY_SCHEMA,"authority_issue":issue,"authority_kind":"acceptance","authorized_state":"accepted","reviewer_role":"project_reviewer","source_semantic_sha256":sem,"authorized_at":"2026-08-03T18:18:00+08:00","scope":pid,"evidence_basis":["fixture review"],"replacement_rights":[]})
    events=f"{base}/review-events.json"; dump(root/events,{"schema":mod.REVIEW_EVENTS_SCHEMA,"events":[{"event_id":f"EV-{rid}","record_id":rid,"event_type":"acceptance","reviewer_role":"project_reviewer","reviewed_source_semantic_sha256":sem,"decision_at":"2026-08-03T18:18:00+08:00","decision_type":"genuine","evidence_basis":["fixture review"],"replacement_authority_issue":None} for rid in records]})
    candidates=f"{base}/candidate-snapshot.json"; dump(root/candidates,{"schema":mod.CANDIDATE_SCHEMA,"candidates":[{"record_id":rid,"candidate_refs":[]} for rid in records]})
    relations={"duplicate_edges_file":(f"{base}/duplicate-edges.json","duplicate_edges",{"schema":mod.RELATION_SCHEMAS["duplicate_edges_file"][1],"edges":[]}),"discrepancies_file":(f"{base}/discrepancies.json","discrepancies",{"schema":mod.RELATION_SCHEMAS["discrepancies_file"][1],"discrepancies":[]}),"implementation_links_file":(f"{base}/implementation-links.json","implementation_links",{"schema":mod.RELATION_SCHEMAS["implementation_links_file"][1],"links":[]}),"routes_file":(f"{base}/routes.json","routes",{"schema":mod.RELATION_SCHEMAS["routes_file"][1],"routes":[]})}
    for rel,_,value in relations.values(): dump(root/rel,value)
    items=f"{base}/items.tsv"; (root/items).write_text("record_id\tcantonese\n"+"".join(f"{rid}\t句子 {rid}\n" for rid in records),encoding="utf-8")
    summary={"record_count":len(records),"duplicate_edge_count":0,"discrepancy_count":0,"implementation_link_count":0,"route_count":0}; aggregate=f"{base}/aggregate.json"; dump(root/aggregate,{"package_id":pid,"summary":summary})
    roles={source:"source_original",authority:"authority_record",events:"review_events",candidates:"candidate_snapshot",**{v[0]:v[1] for v in relations.values()},items:"items_projection",aggregate:"aggregate_projection"}
    manifest=f"{base}/package-manifest.json"; dump(root/manifest,{"schema":mod.PACKAGE_SCHEMA,"package_id":pid,"package_kind":"other","root":base,"lifecycle":"accepted","source":{"source_id":f"source:{pid}","provider":"fixture","authorization_status":"authorized","distribution":"repository_allowed","authorization_basis":"fixture authorization","original_file":source,"byte_sha256":mod.byte_hash(root/source),"semantic_sha256":sem,"source_claims_authority":"metadata_only"},"lineage":{"lineage_id":lineage,"parent_lineage_ids":parents,"independence_group":f"independence:{pid}"},"review_authority":{"state":"accepted","authority_issue":issue,"reviewer_role":"project_reviewer","reviewed_source_semantic_sha256":sem,"authority_record":authority,"event_file":events},"candidate_discovery":{"mode":"frozen_snapshot","snapshot_file":candidates,"snapshot_semantic_sha256":mod.semantic_hash(root/candidates),"generator_command":None},"files":[file_entry(root,rel,role) for rel,role in roles.items()],"record_identity":{"record_file":source,"id_field":"record_id","continuity_lock_sha256":mod.continuity_hash(records)},"relations":{key:value[0] for key,value in relations.items()},"projections":{"items_tsv_file":items,"aggregate_file":aggregate},"summary":summary})
    return {"package_id":pid,"package_kind":"other","root":base,"manifest":manifest,"authority_state":"accepted","authority_issue":issue},root/manifest

def active(case,count=1):
    root=repo(case); entries=[]; manifests=[]
    for i in range(count):
        entry,manifest=package(root,f"PKG-{chr(65+i)}",issue=505+i); entries.append(entry); manifests.append(manifest)
    return root,registry(root,"active",entries,[],[]),entries,manifests
def refresh(root,manifest,rel):
    value=load(manifest)
    for item in value["files"]:
        if item["path"]==rel: item.update(byte_sha256=mod.byte_hash(root/rel),semantic_sha256=mod.semantic_hash(root/rel)); break
    dump(manifest,value); return value
def relation(root,manifest,field,collection,values):
    value=load(manifest); rel=value["relations"][field]; data=load(root/rel); data[collection]=values; dump(root/rel,data); value=refresh(root,manifest,rel)
    count={"duplicate_edges_file":"duplicate_edge_count","discrepancies_file":"discrepancy_count","implementation_links_file":"implementation_link_count","routes_file":"route_count"}[field]; value["summary"][count]=len(values); dump(manifest,value); aggregate=value["projections"]["aggregate_file"]; dump(root/aggregate,{"package_id":value["package_id"],"summary":value["summary"]}); refresh(root,manifest,aggregate)
