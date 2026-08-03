from __future__ import annotations
from .common import *
def validate_authority(repo: Path, manifest: dict[str, Any], entry: dict[str, Any], files: dict[str, dict[str, Any]]) -> None:
    source = manifest["source"]
    source_keys = {
        "source_id", "provider", "authorization_status", "distribution", "authorization_basis",
        "original_file", "byte_sha256", "semantic_sha256", "source_claims_authority",
    }
    exact_keys(source, source_keys, "source")
    req(isinstance(source["source_id"], str) and source["source_id"], "source_id invalid")
    req(isinstance(source["provider"], str) and source["provider"], "provider invalid")
    req(source["authorization_status"] in {"authorized", "restricted", "unknown", "prohibited"}, "authorization_status invalid")
    req(source["distribution"] in {"repository_allowed", "private_only", "metadata_only", "prohibited"}, "distribution invalid")
    req(isinstance(source["authorization_basis"], str) and source["authorization_basis"], "authorization_basis invalid")
    req(source["source_claims_authority"] == "metadata_only", "source-authored claims must be metadata_only")
    original = safe_rel(source["original_file"], "source.original_file")
    req(original in files and files[original]["role"] == "source_original", "source.original_file role invalid")
    original_path = resolve(repo, original, "source.original_file")
    req(byte_hash(original_path) == source["byte_sha256"], "source byte digest mismatch")
    source_semantic = semantic_hash(original_path)
    req(source_semantic == source["semantic_sha256"], "source semantic digest mismatch")
    req(source["distribution"] == "repository_allowed", "v1 repository source requires repository_allowed distribution")
    req(source["authorization_status"] in {"authorized", "restricted"}, "repository source requires explicit authorization")

    authority = manifest["review_authority"]
    keys = {"state", "authority_issue", "reviewer_role", "reviewed_source_semantic_sha256", "authority_record", "event_file"}
    exact_keys(authority, keys, "review_authority")
    req(authority["state"] in REVIEW_STATES, "review authority state invalid")
    req(authority["state"] == entry["authority_state"], "registry/manifest authority state mismatch")
    req(authority["authority_issue"] == entry["authority_issue"], "registry/manifest authority issue mismatch")
    req(authority["reviewer_role"] in REVIEWER_ROLES, "reviewer_role invalid")
    if authority["state"] in {"reviewed", "accepted", "superseded", "withdrawn"}:
        req(isinstance(authority["authority_issue"], int) and authority["authority_issue"] > 0, "review state requires authority_issue")
        req(authority["reviewer_role"] != "source_provider_metadata", "source provider metadata cannot authorize review")
        req(authority["reviewed_source_semantic_sha256"] == source_semantic, "review not bound to current source semantic hash")
        auth_loaded = role_json(repo, files, authority["authority_record"], "authority_record", "authority_record")
        event_loaded = role_json(repo, files, authority["event_file"], "review_events", "event_file")
        assert auth_loaded and event_loaded
        auth = auth_loaded[1]
        events = event_loaded[1]
        req(isinstance(auth, dict) and auth.get("schema") == AUTHORITY_SCHEMA, "authority record schema invalid")
        req(auth.get("authority_issue") == authority["authority_issue"], "authority issue mismatch")
        req(auth.get("authorized_state") == authority["state"], "authority state mismatch")
        req(auth.get("reviewer_role") == authority["reviewer_role"], "authority reviewer mismatch")
        req(auth.get("source_semantic_sha256") == source_semantic, "authority source digest mismatch")
        req(isinstance(events, dict) and events.get("schema") == REVIEW_EVENTS_SCHEMA, "review event schema invalid")
        req(not ({"authority_state", "authority_issue", "authorized_state"} & set(events)), "review event file cannot grant its own authority")
    else:
        req(authority["authority_issue"] is None, "non-reviewed state must not claim authority_issue")
        req(authority["reviewed_source_semantic_sha256"] is None, "non-reviewed state must not claim source digest")
        req(authority["authority_record"] is None and authority["event_file"] is None, "non-reviewed state must not claim review files")


def validate_package(repo: Path, entry: dict[str, Any]) -> dict[str, Any]:
    root_rel = safe_rel(entry["root"], "package root")
    manifest_rel = safe_rel(entry["manifest"], "package manifest")
    root = resolve(repo, root_rel, "package root")
    manifest_path = resolve(repo, manifest_rel, "package manifest")
    regular(manifest_path, "package manifest")
    try:
        manifest_path.resolve().relative_to(root.resolve())
    except ValueError as exc:
        raise ContractError("package manifest must be inside package root") from exc
    manifest = read_json(manifest_path)
    exact_keys(manifest, PACKAGE_KEYS, "package manifest")
    req(manifest["schema"] == PACKAGE_SCHEMA, "unsupported package schema")
    req(manifest["package_id"] == entry["package_id"], "package_id mismatch")
    req(manifest["package_kind"] == entry["package_kind"], "package_kind mismatch")
    req(manifest["root"] == root_rel, "package root mismatch")
    req(manifest["lifecycle"] in {"preserved", "review_in_progress", "reviewed", "superseded", "withdrawn"}, "package lifecycle invalid")
    files = validate_inventory(repo, root, manifest_path, manifest["files"])

    identity = manifest["record_identity"]
    exact_keys(identity, {"record_file", "id_field", "continuity_lock_sha256"}, "record_identity")
    record_file = safe_rel(identity["record_file"], "record_file")
    req(record_file in files and files[record_file]["role"] in {"source_original", "source_projection"}, "record file role invalid")
    id_field = identity["id_field"]
    req(isinstance(id_field, str) and id_field, "id_field invalid")
    ids, records = read_records(resolve(repo, record_file, "record_file"), id_field)
    req(continuity_hash(ids) == identity["continuity_lock_sha256"], "record continuity lock mismatch")

    validate_authority(repo, manifest, entry, files)

    lineage = manifest["lineage"]
    exact_keys(lineage, {"lineage_id", "parent_lineage_ids", "independence_group"}, "lineage")
    req(isinstance(lineage["lineage_id"], str) and lineage["lineage_id"], "lineage_id invalid")
    req(isinstance(lineage["parent_lineage_ids"], list), "parent_lineage_ids invalid")
    req(len(lineage["parent_lineage_ids"]) == len(set(lineage["parent_lineage_ids"])), "duplicate parent lineage")
    req(all(isinstance(v, str) and v for v in lineage["parent_lineage_ids"]), "parent lineage invalid")
    req(isinstance(lineage["independence_group"], str) and lineage["independence_group"], "independence_group invalid")

    candidate = manifest["candidate_discovery"]
    exact_keys(candidate, {"mode", "snapshot_file", "snapshot_semantic_sha256", "generator_command"}, "candidate_discovery")
    req(candidate["mode"] == "frozen_snapshot", "v1 requires digest-bound frozen candidate snapshots")
    loaded = role_json(repo, files, candidate["snapshot_file"], "candidate_snapshot", "candidate snapshot")
    assert loaded
    snapshot_path, snapshot = loaded
    req(candidate["snapshot_semantic_sha256"] == semantic_hash(snapshot_path), "candidate snapshot digest mismatch")
    req(candidate["generator_command"] is None, "frozen snapshot cannot claim generator_command")
    req(isinstance(snapshot, dict) and snapshot.get("schema") == CANDIDATE_SCHEMA, "candidate snapshot schema invalid")
    candidates = snapshot.get("candidates")
    req(isinstance(candidates, list), "candidate snapshot candidates invalid")
    req([v.get("record_id") for v in candidates if isinstance(v, dict)] == ids, "candidate snapshot must project every record exactly once and in order")
    for value in candidates:
        exact_keys(value, {"record_id", "candidate_refs"}, "candidate snapshot item")
        req(isinstance(value["candidate_refs"], list), "candidate_refs invalid")

    relations = manifest["relations"]
    exact_keys(relations, set(RELATION_SCHEMAS), "relations")
    relation_data: dict[str, list[Any]] = {}
    for field, (role, schema, collection) in RELATION_SCHEMAS.items():
        loaded = role_json(repo, files, relations[field], role, field) if relations[field] is not None else None
        if loaded is None:
            relation_data[field] = []
        else:
            data = loaded[1]
            req(isinstance(data, dict) and data.get("schema") == schema, f"{field} schema invalid")
            req(isinstance(data.get(collection), list), f"{field} collection invalid")
            relation_data[field] = data[collection]

    projections = manifest["projections"]
    exact_keys(projections, {"items_tsv_file", "aggregate_file"}, "projections")
    if projections["items_tsv_file"] is not None:
        rel = safe_rel(projections["items_tsv_file"], "items_tsv_file")
        req(rel in files and files[rel]["role"] == "items_projection", "items projection role invalid")
        req(read_items(resolve(repo, rel, "items projection"), id_field) == ids, "items projection drift")

    summary = manifest["summary"]
    keys = {"record_count", "duplicate_edge_count", "discrepancy_count", "implementation_link_count", "route_count"}
    exact_keys(summary, keys, "summary")
    expected = {
        "record_count": len(ids),
        "duplicate_edge_count": len(relation_data["duplicate_edges_file"]),
        "discrepancy_count": len(relation_data["discrepancies_file"]),
        "implementation_link_count": len(relation_data["implementation_links_file"]),
        "route_count": len(relation_data["routes_file"]),
    }
    req(summary == expected, f"summary projection mismatch: expected {expected}")
    if projections["aggregate_file"] is not None:
        rel = safe_rel(projections["aggregate_file"], "aggregate_file")
        req(rel in files and files[rel]["role"] == "aggregate_projection", "aggregate projection role invalid")
        req(read_json(resolve(repo, rel, "aggregate projection")) == {"package_id": manifest["package_id"], "summary": summary}, "aggregate projection drift")

    return {
        "entry": entry, "manifest": manifest, "root": root, "ids": ids, "records": records,
        "lineage": lineage,
        "duplicates": relation_data["duplicate_edges_file"],
        "discrepancies": relation_data["discrepancies_file"],
        "links": relation_data["implementation_links_file"],
        "routes": relation_data["routes_file"],
    }
