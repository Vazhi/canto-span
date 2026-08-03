from __future__ import annotations
from datetime import datetime
from .common import *

AUTHORITY_KIND = {
    "reviewed": "review",
    "accepted": "acceptance",
    "superseded": "supersession",
    "withdrawn": "withdrawal",
}
EVENT_DECISIONS = {
    "review": {"genuine", "false_positive", "ambiguous", "unusable", "observation"},
    "acceptance": {"genuine", "false_positive", "ambiguous", "unusable", "accepted_correction"},
    "supersession": {"superseded"},
    "withdrawal": {"withdrawn"},
}
DISCREPANCY_TYPES = {"pronunciation", "translation", "gloss", "orthography", "source_id", "segmentation", "naturalness", "other"}


def timestamp(value: Any, label: str) -> None:
    req(isinstance(value, str) and value, f"{label} must be a non-empty timestamp")
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError as exc:
        raise ContractError(f"{label} must be ISO-8601") from exc
    req(parsed.tzinfo is not None and parsed.utcoffset() is not None, f"{label} must include a timezone")


def string_list(value: Any, label: str, *, allow_empty: bool = False) -> list[str]:
    req(isinstance(value, list), f"{label} must be an array")
    req(allow_empty or bool(value), f"{label} must be non-empty")
    req(all(isinstance(item, str) and item for item in value), f"{label} contains an invalid value")
    req(len(value) == len(set(value)), f"{label} contains duplicates")
    return value


def validate_authority(
    repo: Path,
    manifest: dict[str, Any],
    entry: dict[str, Any],
    files: dict[str, dict[str, Any]],
    record_ids: list[str],
) -> None:
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
    if authority["state"] in AUTHORITY_KIND:
        req(isinstance(authority["authority_issue"], int) and authority["authority_issue"] > 0, "review state requires authority_issue")
        req(authority["reviewer_role"] != "source_provider_metadata", "source provider metadata cannot authorize review")
        req(authority["reviewed_source_semantic_sha256"] == source_semantic, "review not bound to current source semantic hash")
        auth_loaded = role_json(repo, files, authority["authority_record"], "authority_record", "authority_record")
        event_loaded = role_json(repo, files, authority["event_file"], "review_events", "event_file")
        assert auth_loaded and event_loaded
        auth = auth_loaded[1]
        events = event_loaded[1]

        auth_keys = {
            "schema", "authority_issue", "authority_kind", "authorized_state", "reviewer_role",
            "source_semantic_sha256", "authorized_at", "scope", "evidence_basis", "replacement_rights",
        }
        exact_keys(auth, auth_keys, "authority record")
        req(auth["schema"] == AUTHORITY_SCHEMA, "authority record schema invalid")
        req(auth["authority_issue"] == authority["authority_issue"], "authority issue mismatch")
        req(auth["authority_kind"] == AUTHORITY_KIND[authority["state"]], "authority kind mismatch")
        req(auth["authorized_state"] == authority["state"], "authority state mismatch")
        req(auth["reviewer_role"] == authority["reviewer_role"], "authority reviewer mismatch")
        req(auth["source_semantic_sha256"] == source_semantic, "authority source digest mismatch")
        timestamp(auth["authorized_at"], "authority authorized_at")
        req(auth["scope"] == manifest["package_id"], "authority scope mismatch")
        string_list(auth["evidence_basis"], "authority evidence_basis")
        rights = string_list(auth["replacement_rights"], "authority replacement_rights", allow_empty=True)
        req(set(rights) <= DISCREPANCY_TYPES, "authority replacement_rights invalid")

        req(isinstance(events, dict), "review event file must be an object")
        req(not ({"authority_state", "authority_issue", "authorized_state"} & set(events)), "review event file cannot grant its own authority")
        exact_keys(events, {"schema", "events"}, "review event file")
        req(events["schema"] == REVIEW_EVENTS_SCHEMA, "review event schema invalid")
        event_list = events["events"]
        req(isinstance(event_list, list) and event_list, "review event file must contain events")
        event_ids: set[str] = set()
        required_type = AUTHORITY_KIND[authority["state"]]
        required_records: set[str] = set()
        event_keys = {
            "event_id", "record_id", "event_type", "reviewer_role", "reviewed_source_semantic_sha256",
            "decision_at", "decision_type", "evidence_basis", "replacement_authority_issue",
        }
        for index, event in enumerate(event_list):
            label = f"review event[{index}]"
            exact_keys(event, event_keys, label)
            event_id = event["event_id"]
            req(isinstance(event_id, str) and event_id and event_id not in event_ids, f"{label}.event_id invalid or duplicate")
            event_ids.add(event_id)
            record_id = event["record_id"]
            req(record_id in record_ids, f"{label}.record_id missing from package")
            event_type = event["event_type"]
            req(event_type in EVENT_DECISIONS, f"{label}.event_type invalid")
            req(event["reviewer_role"] == authority["reviewer_role"], f"{label}.reviewer_role mismatch")
            req(event["reviewed_source_semantic_sha256"] == source_semantic, f"{label} source digest mismatch")
            timestamp(event["decision_at"], f"{label}.decision_at")
            req(event["decision_type"] in EVENT_DECISIONS[event_type], f"{label}.decision_type invalid")
            string_list(event["evidence_basis"], f"{label}.evidence_basis")
            replacement_issue = event["replacement_authority_issue"]
            if event["decision_type"] == "accepted_correction":
                req(isinstance(replacement_issue, int) and replacement_issue > 0, f"{label} accepted correction lacks replacement authority")
            else:
                req(replacement_issue is None, f"{label} claims replacement authority without an accepted correction")
            if event_type == required_type:
                required_records.add(record_id)
        req(required_records, f"review event file lacks required {required_type} event")
        if authority["state"] == "accepted":
            req(required_records == set(record_ids), "accepted review must decide every record exactly through acceptance events")
    else:
        req(authority["authority_issue"] is None, "non-reviewed state must not claim authority_issue")
        req(authority["reviewed_source_semantic_sha256"] is None, "non-reviewed state must not claim source digest")
        req(authority["authority_record"] is None and authority["event_file"] is None, "non-reviewed state must not claim review files")


def validate_package(repo: Path, entry: dict[str, Any]) -> dict[str, Any]:
    root_rel = safe_rel(entry["root"], "package root")
    manifest_rel = safe_rel(entry["manifest"], "package manifest")
    root = resolve(repo, root_rel, "package root")
    req(root.exists() and root.is_dir() and not root.is_symlink(), "package root must be a real directory")
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

    validate_authority(repo, manifest, entry, files, ids)

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
