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
    validate_queue(registry["migration_queue"])
    entries = [validate_entry(value, index) for index, value in enumerate(registry["packages"])]
    for field in ("package_id", "root", "manifest"):
        values = [entry[field] for entry in entries]
        req(len(values) == len(set(values)), f"duplicate registry {field}")

    empty_counts = {"packages": 0, "records": 0, "duplicate_edges": 0, "routes": 0, "discrepancies": 0, "implementation_links": 0, "lineages": 0}
    if registry["registry_state"] == "foundation":
        req(not entries, "foundation registry cannot activate packages")
        req(registry["migration_queue"], "foundation registry requires explicit migration queue")
        return {
            "schema": "canto-span-pedagogical-corpus-contract-report-v1",
            "status": "PASS", "registry_state": "foundation", "packages": 0,
            "migration_queue": len(registry["migration_queue"]), "global": empty_counts,
        }

    req(entries, "active registry requires packages")
    packages = [validate_package(repo, entry) for entry in entries]
    validate_root_coverage(repo, registry["package_root"], packages)
    return {
        "schema": "canto-span-pedagogical-corpus-contract-report-v1",
        "status": "PASS", "registry_state": "active", "packages": len(packages),
        "migration_queue": len(registry["migration_queue"]), "global": validate_global(packages),
    }
