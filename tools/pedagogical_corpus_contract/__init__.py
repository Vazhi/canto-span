from __future__ import annotations
from .common import *
from .package import validate_package
from .global_validation import validate_global, validate_root_coverage

def verify_registry(repo: Path, registry_path: Path) -> dict[str, Any]:
    repo = repo.resolve()
    registry_path = registry_path.resolve()
    try:
        registry_path.relative_to(repo)
    except ValueError as exc:
        raise ContractError("registry path must be inside repository") from exc
    regular(registry_path, "registry")
    registry = read_json(registry_path)
    validate_registry_shape(registry)
    archives = validate_legacy_archives(registry["legacy_archives"])
    validate_queue(registry["migration_queue"])
    entries = [validate_entry(value, index) for index, value in enumerate(registry["packages"])]
    for field in ("package_id", "root", "manifest"):
        values = [entry[field] for entry in entries]
        req(len(values) == len(set(values)), f"duplicate registry {field}")

    active_ids = {entry["package_id"] for entry in entries}
    archive_by_id = {item["package_id"]: item for item in archives}
    archive_ids = set(archive_by_id)
    queued_ids = {item["package_id"] for item in registry["migration_queue"]}
    req(not (active_ids & archive_ids), f"active packages remain in legacy archives: {sorted(active_ids & archive_ids)}")
    req(not (active_ids & queued_ids), f"active packages remain in migration queue: {sorted(active_ids & queued_ids)}")
    req(queued_ids <= archive_ids, f"migration queue packages lack legacy archive declarations: {sorted(queued_ids-archive_ids)}")
    for index, item in enumerate(registry["migration_queue"]):
        archive = archive_by_id[item["package_id"]]
        req(item["source_issue"] == archive["source_issue"], f"migration_queue[{index}] source_issue does not match legacy archive")
        req(item["source_root"] == archive["source_root"], f"migration_queue[{index}] source_root does not match legacy archive")

    package_root = resolve(repo, registry["package_root"], "registry.package_root")
    req(package_root.exists() and package_root.is_dir() and not package_root.is_symlink(), "package_root must be a real directory")
    for entry in entries:
        root = resolve(repo, entry["root"], "package root")
        try:
            relative = root.relative_to(package_root)
        except ValueError as exc:
            raise ContractError(f"package root outside configured package_root: {entry['root']}") from exc
        req(relative.parts, "package root cannot equal configured package_root")

    empty_counts = {"packages": 0, "records": 0, "duplicate_edges": 0, "routes": 0, "discrepancies": 0, "implementation_links": 0, "lineages": 0}
    if registry["registry_state"] == "foundation":
        req(not entries, "foundation registry cannot activate packages")
        req(archives, "foundation registry requires explicit legacy archives")
        req(registry["migration_queue"], "foundation registry requires explicit migration queue")
        validate_root_coverage(repo, registry["package_root"], [], archives)
        return {
            "schema": "canto-span-pedagogical-corpus-contract-report-v1",
            "status": "PASS", "registry_state": "foundation", "packages": 0,
            "legacy_archives": len(archives), "migration_queue": len(registry["migration_queue"]),
            "global": empty_counts,
        }

    req(entries, "active registry requires packages")
    packages = [validate_package(repo, entry) for entry in entries]
    validate_root_coverage(repo, registry["package_root"], packages, archives)
    return {
        "schema": "canto-span-pedagogical-corpus-contract-report-v1",
        "status": "PASS", "registry_state": "active", "packages": len(packages),
        "legacy_archives": len(archives), "migration_queue": len(registry["migration_queue"]),
        "global": validate_global(packages),
    }
