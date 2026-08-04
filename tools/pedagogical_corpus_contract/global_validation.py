from __future__ import annotations

from .common import *


def validate_global(packages: list[dict[str, Any]]) -> dict[str, int]:
    refs = {
        (package["manifest"]["package_id"], record_id)
        for package in packages
        for record_id in package["ids"]
    }

    lineage_owner: dict[str, str] = {}
    lineage_parents: dict[str, list[str]] = {}
    for package in packages:
        lineage = package["lineage"]
        lineage_id = lineage["lineage_id"]
        req(lineage_id not in lineage_owner, f"duplicate lineage_id {lineage_id}")
        lineage_owner[lineage_id] = package["manifest"]["package_id"]
        lineage_parents[lineage_id] = lineage["parent_lineage_ids"]

    for parents in lineage_parents.values():
        for parent in parents:
            req(
                parent.startswith("external:") or parent in lineage_owner,
                f"unknown parent lineage {parent}; expected a known parent lineage or external lineage",
            )

    visiting: set[str] = set()
    visited: set[str] = set()

    def visit_lineage(node: str) -> None:
        if node in visited:
            return
        req(node not in visiting, f"lineage cycle at {node}")
        visiting.add(node)
        for parent in lineage_parents.get(node, []):
            if not parent.startswith("external:"):
                visit_lineage(parent)
        visiting.remove(node)
        visited.add(node)

    for node in lineage_owner:
        visit_lineage(node)

    edge_ids: set[str] = set()
    outgoing: dict[tuple[str, str], tuple[str, str]] = {}
    duplicate_count = 0
    for package in packages:
        package_id = package["manifest"]["package_id"]
        for index, edge in enumerate(package["duplicates"]):
            label = f"duplicate[{package_id}:{index}]"
            exact_keys(edge, {"edge_id", "source", "target", "relation"}, label)
            edge_id = edge["edge_id"]
            req(
                isinstance(edge_id, str) and edge_id and edge_id not in edge_ids,
                f"duplicate edge_id {edge_id}",
            )
            edge_ids.add(edge_id)
            source = ref_key(edge["source"], f"{label}.source")
            target = ref_key(edge["target"], f"{label}.target")
            req(source in refs and target in refs, f"{label} has missing source or target")
            req(source != target, f"{label} cannot target itself")
            req(edge["relation"] in {"exact", "normalized"}, f"{label}.relation invalid")
            req(source not in outgoing, f"record has multiple duplicate owners: {source}")
            outgoing[source] = target
            duplicate_count += 1

    for source in outgoing:
        seen: set[tuple[str, str]] = set()
        node = source
        while node in outgoing:
            req(node not in seen, f"duplicate graph cycle at {node}")
            seen.add(node)
            node = outgoing[node]

    route_ids: set[str] = set()
    route_count = 0
    for package in packages:
        package_id = package["manifest"]["package_id"]
        for index, route in enumerate(package["routes"]):
            label = f"route[{package_id}:{index}]"
            exact_keys(
                route,
                {
                    "route_id",
                    "source",
                    "owner_issue",
                    "status",
                    "requirements",
                    "projected_record_ids",
                },
                label,
            )
            route_id = route["route_id"]
            req(
                isinstance(route_id, str) and route_id and route_id not in route_ids,
                f"duplicate route_id {route_id}",
            )
            route_ids.add(route_id)
            source = ref_key(route["source"], f"{label}.source")
            req(source in refs, f"{label} source missing")
            req(
                isinstance(route["owner_issue"], int) and route["owner_issue"] > 0,
                f"{label}.owner_issue invalid",
            )
            req(
                route["status"] in {"open", "completed", "cancelled", "subsumed"},
                f"{label}.status invalid",
            )
            requirements = route["requirements"]
            req(
                isinstance(requirements, list)
                and requirements
                and all(isinstance(value, str) and value for value in requirements),
                f"{label}.requirements invalid",
            )
            req(
                route["projected_record_ids"] == [source[1]],
                f"{label} must project source exactly once",
            )
            route_count += 1

    discrepancy_count = 0
    link_count = 0
    global_discrepancy_ids: set[str] = set()
    global_link_ids: set[str] = set()

    for package in packages:
        package_id = package["manifest"]["package_id"]
        for index, value in enumerate(package["discrepancies"]):
            label = f"discrepancy[{package_id}:{index}]"
            exact_keys(
                value,
                {
                    "discrepancy_id",
                    "source",
                    "type",
                    "status",
                    "replacement_value",
                    "authority_issue",
                },
                label,
            )
            discrepancy_id = value["discrepancy_id"]
            req(
                isinstance(discrepancy_id, str)
                and discrepancy_id
                and discrepancy_id not in global_discrepancy_ids,
                f"duplicate discrepancy_id {discrepancy_id}",
            )
            global_discrepancy_ids.add(discrepancy_id)
            req(ref_key(value["source"], f"{label}.source") in refs, f"{label} source missing")
            req(
                value["type"]
                in {
                    "pronunciation",
                    "translation",
                    "gloss",
                    "orthography",
                    "source_id",
                    "segmentation",
                    "naturalness",
                    "other",
                },
                f"{label}.type invalid",
            )
            req(
                value["status"] in {"open", "proposed", "accepted", "rejected"},
                f"{label}.status invalid",
            )
            if value["status"] == "accepted":
                req(value["replacement_value"] is not None, f"{label} accepted replacement missing value")
                req(value["authority_issue"] is not None, f"{label} accepted replacement missing authority")
                req(
                    value["authority_issue"] == package["authority_issue"],
                    f"{label} authority issue does not match package review authority",
                )
                req(
                    value["type"] in package["replacement_rights"],
                    f"{label} type is not covered by replacement rights",
                )
            else:
                req(
                    value["authority_issue"] is None,
                    f"{label} non-accepted replacement claims authority",
                )
            discrepancy_count += 1

        for index, value in enumerate(package["links"]):
            label = f"link[{package_id}:{index}]"
            exact_keys(value, {"link_id", "source", "type", "target", "authority"}, label)
            link_id = value["link_id"]
            req(
                isinstance(link_id, str) and link_id and link_id not in global_link_ids,
                f"duplicate link_id {link_id}",
            )
            global_link_ids.add(link_id)
            req(ref_key(value["source"], f"{label}.source") in refs, f"{label} source missing")
            req(value["type"] in LINK_AUTHORITY, f"{label}.type invalid")
            req(isinstance(value["target"], str) and value["target"], f"{label}.target invalid")
            req(
                value["authority"] == LINK_AUTHORITY[value["type"]],
                f"{label} typed authority mismatch",
            )
            link_count += 1

    return {
        "packages": len(packages),
        "records": len(refs),
        "duplicate_edges": duplicate_count,
        "routes": route_count,
        "discrepancies": discrepancy_count,
        "implementation_links": link_count,
        "lineages": len(lineage_owner),
    }


def validate_root_coverage(
    repo: Path,
    package_root_rel: str,
    packages: list[dict[str, Any]],
    legacy_archives: list[dict[str, Any]],
) -> None:
    package_root = resolve(repo, package_root_rel, "registry.package_root")
    req(
        package_root.exists() and package_root.is_dir() and not package_root.is_symlink(),
        "package_root must be a real directory",
    )

    active_roots = [package["root"].resolve() for package in packages]
    archive_roots: list[Path] = []
    for index, archive in enumerate(legacy_archives):
        root = resolve(
            repo,
            archive["source_root"],
            f"legacy_archives[{index}].source_root",
        )
        req(
            root.exists() and root.is_dir() and not root.is_symlink(),
            f"legacy archive root must be a real directory: {archive['source_root']}",
        )
        try:
            relative = root.relative_to(package_root)
        except ValueError as exc:
            raise ContractError(
                f"legacy archive root outside configured package_root: {archive['source_root']}"
            ) from exc
        req(relative.parts, "legacy archive root cannot equal configured package_root")
        archive_roots.append(root.resolve())

    roots = active_roots + archive_roots
    req(len(roots) == len(set(roots)), "active and legacy roots must be unique")
    for index, left in enumerate(roots):
        for right in roots[index + 1 :]:
            req(
                left not in right.parents and right not in left.parents,
                "declared package roots overlap",
            )

    for current, dirs, names in os.walk(package_root, followlinks=False):
        current_path = Path(current)
        for name in dirs:
            req(
                not (current_path / name).is_symlink(),
                "package_root contains symlink directory",
            )
        for name in names:
            path = current_path / name
            req(not path.is_symlink(), "package_root contains symlink file")
            resolved = path.resolve()
            req(
                any(root == resolved.parent or root in resolved.parents for root in roots),
                f"undeclared package file: {path.relative_to(repo)}",
            )
