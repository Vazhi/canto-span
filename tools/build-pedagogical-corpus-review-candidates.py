#!/usr/bin/env python3
"""Build deterministic mechanical cross-reference candidates for pedagogical corpus review."""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

DEFAULT_ROOT = Path(__file__).resolve().parents[1]
SCAN_ROOTS = ["src", "data", "tests", "docs", "grammar", "review-packets", "external-evidence"]
TEXT_SUFFIXES = {".json", ".jsonl", ".tsv", ".csv", ".md", ".txt", ".js", ".yml", ".yaml"}
EXCLUDED_PARTS = {".git", "node_modules", "archive", "archives", "validation", "recovery", "dist", "build"}
PUNCTUATION = re.compile(r"[\s，。！？；：、,.!?;:'\"“”‘’（）()【】\[\]《》<>—–…·`~]+", re.UNICODE)
SOURCE_WEEK = re.compile(r"-W(\d+)-")
LAYER_PRIORITY = {
    "runtime_lexicon": 0,
    "runtime_source": 1,
    "current_grammar_note": 2,
    "executable_test_or_fixture": 3,
    "canonical_or_research_data": 4,
    "pedagogical_corpus": 5,
    "review_packet": 6,
    "external_evidence": 7,
    "research_ledger": 8,
    "research_report": 9,
    "current_documentation": 10,
    "other": 11,
}
MAX_MATCH_PATHS_PER_TYPE = 24
MIN_NORMALIZED_MATCH_LENGTH = 6
PACKAGE_REVIEW_FILES = {
    "source.json",
    "review.json",
    "items.tsv",
    "README.md",
    "research-summary.md",
    "expert-review-r1.tsv",
    "package-integrity-r1.json",
    "runtime-crosswalk-r1.json",
    "legacy-reconciliation-r1.json",
    "project-only-review-r1.json",
    "evidence-sources-r1.json",
    "implementation-crosswalk-r1.json",
    "role-sensitive-crosswalk-r1.json",
    "research-routing-r1.json",
    "dialog-context-routing-r1.json",
}
GLOBAL_PEDAGOGICAL_DERIVED_FILES = {
    "review.json",
    "README.md",
    "research-summary.md",
    "expert-review-r1.tsv",
    "package-integrity-r1.json",
    "mechanical-cross-reference-r1.json",
    "crosswalk.json",
    "runtime-crosswalk-r1.json",
    "legacy-reconciliation-r1.json",
    "project-only-review-r1.json",
    "evidence-sources-r1.json",
    "implementation-crosswalk-r1.json",
    "role-sensitive-crosswalk-r1.json",
    "research-routing-r1.json",
    "dialog-context-routing-r1.json",
}


def normalize_surface(value: str) -> str:
    return PUNCTUATION.sub("", str(value or "")).lower()


def layer_for(path: str) -> str:
    if path.startswith("src/runtime-resources/lexicon/"):
        return "runtime_lexicon"
    if path.startswith("src/"):
        return "runtime_source"
    if path.startswith("tests/"):
        return "executable_test_or_fixture"
    if path.startswith("grammar/"):
        return "current_grammar_note"
    if path.startswith("data/pedagogical-corpus/"):
        return "pedagogical_corpus"
    if path.startswith("data/research-ledgers/"):
        return "research_ledger"
    if path.startswith("data/"):
        return "canonical_or_research_data"
    if path.startswith("docs/research/"):
        return "research_report"
    if path.startswith("docs/current/"):
        return "current_documentation"
    if path.startswith("review-packets/"):
        return "review_packet"
    if path.startswith("external-evidence/"):
        return "external_evidence"
    return "other"


def read_json(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"expected JSON object: {path}")
    return value


def derived_report_paths(package_relative: Path) -> set[Path]:
    stem = package_relative.name
    return {
        Path("docs/research") / f"{stem}-CORPUS-INGRESS.md",
        Path("docs/research") / f"{stem}-CORPUS-RECONCILIATION.md",
    }


def is_global_pedagogical_derived(relative: Path) -> bool:
    return (
        len(relative.parts) >= 4
        and relative.parts[:3] == ("data", "pedagogical-corpus", "glossika")
        and relative.name in GLOBAL_PEDAGOGICAL_DERIVED_FILES
    )


def candidate_files(root: Path, package_relative: Path, output_relative: Path) -> list[Path]:
    output: list[Path] = []
    excluded_files = {package_relative / name for name in PACKAGE_REVIEW_FILES}
    excluded_files.add(output_relative)
    excluded_files.update(derived_report_paths(package_relative))

    for scan_root in SCAN_ROOTS:
        base = root / scan_root
        if not base.exists():
            continue
        for path in base.rglob("*"):
            if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
                continue
            relative = path.relative_to(root)
            if relative in excluded_files or is_global_pedagogical_derived(relative):
                continue
            if relative.parent == package_relative and (
                relative.name.startswith("expert-review-brief.")
                or relative.name.endswith(".tmp.tsv")
                or relative.name.endswith(".tmp.json")
            ):
                continue
            if any(part in EXCLUDED_PARTS for part in relative.parts):
                continue
            if path.name == "main.js" or path.stat().st_size > 2_000_000:
                continue
            output.append(path)
    return sorted(output)


def load_documents(root: Path, paths: list[Path]) -> list[tuple[str, str, list[str]]]:
    documents: list[tuple[str, str, list[str]]] = []
    for path in paths:
        relative = str(path.relative_to(root))
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        normalized_lines = [normalize_surface(line) for line in text.splitlines() if line.strip()]
        documents.append((relative, text, normalized_lines))
    return documents


def compact_match(path: str, match_type: str) -> dict[str, Any]:
    return {"path": path, "match_type": match_type, "layer": layer_for(path)}


def ranked_matches(paths: set[str], match_type: str) -> tuple[list[dict[str, Any]], int]:
    ordered = sorted(paths, key=lambda path: (LAYER_PRIORITY[layer_for(path)], path))
    retained = ordered[:MAX_MATCH_PATHS_PER_TYPE]
    return [compact_match(path, match_type) for path in retained], max(0, len(ordered) - len(retained))


def research_ledger_stem(source_id: str) -> str | None:
    match = SOURCE_WEEK.search(source_id)
    if not match:
        return None
    return f"glossika-week{int(match.group(1))}"


def load_later_research(root: Path, source_id: str) -> dict[str, list[dict[str, Any]]]:
    by_item: dict[str, list[dict[str, Any]]] = defaultdict(list)


    implementation_path = root / f"data/pedagogical-corpus/glossika/{source_id}/implementation-crosswalk-r1.json"
    if implementation_path.exists():
        packet = read_json(implementation_path)
        if packet.get("source_id") == source_id:
            for entry in packet.get("records", []):
                item_id = entry.get("id")
                if item_id:
                    by_item[item_id].append({
                        "packet": "implementation-crosswalk-r1",
                        "kind": "implementation_crosswalk",
                        "implementation_targets": entry.get("implementation_targets", []),
                        "parser_owner_hints": entry.get("parser_owner_hints", []),
                        "exact_project_occurrence_paths": entry.get("exact_project_occurrence_paths", []),
                        "authority_status": entry.get("authority_status"),
                        "parser_hint_authority": entry.get("parser_hint_authority"),
                    })


    role_path = root / f"data/pedagogical-corpus/glossika/{source_id}/role-sensitive-crosswalk-r1.json"
    if role_path.exists():
        packet = read_json(role_path)
        if packet.get("source_id") == source_id:
            for entry in packet.get("records", []):
                item_id = entry.get("id")
                if item_id:
                    by_item[item_id].append({
                        "packet": "role-sensitive-crosswalk-r1",
                        "kind": "role_sensitive_crosswalk",
                        "orthographic_token_owner_paths": entry.get("orthographic_token_owner_paths", []),
                        "pronunciation_owner_paths": entry.get("pronunciation_owner_paths", []),
                        "role_specific_targets": entry.get("role_specific_targets", []),
                        "role_specific_coverage_state": entry.get("role_specific_coverage_state"),
                        "unrelated_or_homographic_owner_paths": entry.get("unrelated_or_homographic_owner_paths", []),
                        "parser_owner_hints": entry.get("parser_owner_hints", []),
                        "parser_hint_authority": entry.get("parser_hint_authority"),
                        "controlled_specification_candidates": entry.get("controlled_specification_candidates", []),
                        "authority_status": entry.get("authority_status"),
                    })

    routing_path = root / f"data/pedagogical-corpus/glossika/{source_id}/research-routing-r1.json"
    if routing_path.exists():
        packet = read_json(routing_path)
        if packet.get("source_id") == source_id:
            for entry in packet.get("item_routes", []):
                item_id = entry.get("id")
                if item_id:
                    by_item[item_id].append({
                        "packet": "research-routing-r1",
                        "kind": "research_routing",
                        "claim_ids": entry.get("claim_ids", []),
                        "route_ids": entry.get("route_ids", []),
                        "non_candidate_route_ids": entry.get("non_candidate_route_ids", []),
                        "route_owner_issue": packet.get("route_owner_issue"),
                    })

    legacy_path = root / f"data/pedagogical-corpus/glossika/{source_id}/legacy-reconciliation-r1.json"
    if legacy_path.exists():
        legacy = read_json(legacy_path)
        if legacy.get("source_id") == source_id:
            for entry in legacy.get("records", []):
                item_id = entry.get("id")
                if item_id:
                    by_item[item_id].append({
                        "packet": "legacy-reconciliation-r1",
                        "kind": "legacy_project_reconciliation",
                        "legacy_classification": entry.get("legacy_classification"),
                        "source_repeat_of": entry.get("source_repeat_of"),
                        "source_repeat_target_path": entry.get("source_repeat_target_path"),
                        "existing_project_records": entry.get("existing_project_records", []),
                        "canonical_lexicon_owners": entry.get("canonical_lexicon_owners", []),
                        "parser_owner_candidates": entry.get("parser_owner_candidates", []),
                        "reviewed_utterance_type": entry.get("reviewed_utterance_type"),
                        "inherited_discrepancies": entry.get("inherited_discrepancies", []),
                        "inherited_authority_status": entry.get("inherited_authority_status"),
                        "independent_evidence_ids": entry.get("independent_evidence_ids", []),
                    })

    runtime_crosswalk_path = root / f"data/pedagogical-corpus/glossika/{source_id}/runtime-crosswalk-r1.json"
    if runtime_crosswalk_path.exists():
        runtime_crosswalk = read_json(runtime_crosswalk_path)
        if runtime_crosswalk.get("source_id") == source_id:
            for entry in runtime_crosswalk.get("records", []):
                item_id = entry.get("id")
                if item_id:
                    by_item[item_id].append({
                        "packet": "runtime-crosswalk-r1",
                        "kind": "runtime_crosswalk",
                        "runtime_pull_request": runtime_crosswalk.get("runtime_pull_request"),
                        "runtime_merge_commit": runtime_crosswalk.get("runtime_merge_commit"),
                        "provenance_path": runtime_crosswalk.get("provenance_path"),
                        "runtime_crosswalk": entry.get("runtime_crosswalk"),
                        "source_discrepancies": entry.get("source_discrepancies", []),
                        "reviewed_values": entry.get("reviewed_values", {}),
                    })

    stem = research_ledger_stem(source_id)
    if stem is None:
        return by_item

    lexical_path = root / f"data/research-ledgers/{stem}-lexical-ingress.json"
    if lexical_path.exists():
        lexical = read_json(lexical_path)
        if lexical.get("sourceId") == source_id:
            for entry in lexical.get("entries", []):
                item_id = entry.get("sourceItemId")
                if item_id:
                    by_item[item_id].append({
                        "packet": lexical.get("packetId"),
                        "kind": "lexical_ingress",
                        "disposition": entry.get("disposition"),
                        "exact_runtime_owners": entry.get("exactRuntimeOwners", []),
                        "canonical_mentions": entry.get("rawCanonicalMentions", []),
                        "recommendation": entry.get("recommendation"),
                    })

    followup_path = root / f"data/research-ledgers/{stem}-followup-candidates.json"
    if followup_path.exists():
        followup = read_json(followup_path)
        if followup.get("sourceId") == source_id:
            for entry in followup.get("candidates", []):
                for item_id in entry.get("sourceItemIds", []):
                    by_item[item_id].append({
                        "packet": followup.get("packetId"),
                        "kind": "followup_candidate",
                        "candidate_id": entry.get("id"),
                        "cluster": entry.get("cluster"),
                        "priority": entry.get("priority"),
                        "next_method": entry.get("nextMethod"),
                        "reason": entry.get("reason"),
                    })
            for entry in followup.get("nonCandidates", []):
                for item_id in entry.get("sourceItemIds", []):
                    by_item[item_id].append({
                        "packet": followup.get("packetId"),
                        "kind": "followup_non_candidate",
                        "cluster": entry.get("cluster"),
                        "disposition": entry.get("disposition"),
                        "reason": entry.get("reason"),
                    })
    return by_item



def normalize_jyutping(value: Any) -> str:
    text = str(value or "").strip().strip("/")
    if ":" in text:
        prefix, rest = text.split(":", 1)
        if len(prefix.split()) <= 4:
            text = rest
    return " ".join(re.findall(r"[a-z]+[1-6]", text.lower()))


def normalize_english(value: Any) -> str:
    text = str(value or "").lower()
    text = re.sub(r"[\[\](){},.;:!?/]+", " ", text)
    text = re.sub(r"\b(a|an|the)\b", " ", text)
    return " ".join(text.split())


def item_source_values(item: dict[str, Any]) -> tuple[Any, Any, Any]:
    values = item.get("source") or {}
    return values.get("traditional"), values.get("jyutping") or values.get("jyutpingLine") or values.get("romanizationLine"), values.get("english")


def dialog_record_matches(root: Path, package_relative: Path, source: dict[str, Any]) -> dict[str, dict[str, list[dict[str, Any]]]]:
    output = {row["id"]: {"exact": [], "normalized": []} for row in source.get("items", [])}
    current_values = {row["id"]: item_source_values(row) for row in source.get("items", [])}
    corpus_root = root / "data/pedagogical-corpus/glossika"
    for candidate in sorted(corpus_root.glob("*/source.json")):
        if candidate.resolve() == (root / package_relative / "source.json").resolve():
            continue
        try:
            document = read_json(candidate)
        except (OSError, ValueError, json.JSONDecodeError):
            continue
        records = document.get("items")
        if not isinstance(records, list):
            continue
        relative = str(candidate.relative_to(root))
        candidate_source_id = (document.get("source") or {}).get("sourceId")
        for target in records:
            target_values = item_source_values(target)
            if not target_values[0]:
                continue
            for item_id, values in current_values.items():
                exact = values == target_values
                normalized = normalize_surface(values[0]) == normalize_surface(target_values[0]) and normalize_jyutping(values[1]) == normalize_jyutping(target_values[1]) and normalize_english(values[2]) == normalize_english(target_values[2])
                if not exact and not normalized:
                    continue
                output[item_id]["exact" if exact else "normalized"].append({
                    "path": relative,
                    "record_id": target.get("id"),
                    "source_id": candidate_source_id,
                    "match_type": "exact_source_record" if exact else "normalized_source_record",
                    "layer": "pedagogical_corpus",
                })
    for values in output.values():
        values["exact"].sort(key=lambda row: (row["path"], row.get("record_id") or ""))
        values["normalized"].sort(key=lambda row: (row["path"], row.get("record_id") or ""))
    return output


def dialog_context_links(package: Path) -> dict[str, list[dict[str, Any]]]:
    path = package / "dialog-context-routing-r1.json"
    if not path.is_file():
        return {}
    packet = read_json(path)
    output: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for route in packet.get("routes", []):
        for item_id in route.get("source_item_ids", []):
            output[item_id].append({
                "kind": "dialog_context_route",
                "route_id": route.get("route_id"),
                "route_owner_issue": route.get("owner_issue"),
                "route_state": route.get("route_state"),
                "evidence_requirement": route.get("evidence_requirement"),
                "linked_issues": route.get("linked_issues", []),
            })
    for links in output.values():
        links.sort(key=lambda row: row["route_id"])
    return output


def build(root: Path, package_relative: Path, output_relative: Path) -> dict[str, Any]:
    source = read_json(root / package_relative / "source.json")
    schema = source.get("schema")
    if schema not in {"canto-span-pedagogical-corpus-source-v1", "canto-span-pedagogical-dialog-source-v1"}:
        raise ValueError("unsupported pedagogical source schema")
    source_id = (source.get("source") or {}).get("sourceId")
    items = source.get("items")
    if not isinstance(items, list):
        raise ValueError("source items must be an array")
    is_dialog = schema == "canto-span-pedagogical-dialog-source-v1"
    documents = [] if is_dialog else load_documents(root, candidate_files(root, package_relative, output_relative))
    later = {} if is_dialog else load_later_research(root, str(source_id))
    record_matches = dialog_record_matches(root, package_relative, source) if is_dialog else {}
    route_links = dialog_context_links(root / package_relative) if is_dialog else {}
    records: list[dict[str, Any]] = []
    match_counts: Counter[str] = Counter()
    layer_counts: Counter[str] = Counter()
    for item in items:
        item_source = item.get("source") or {}
        traditional = str(item_source.get("traditional") or "")
        normalized = normalize_surface(traditional)
        item_id = item.get("id")
        if is_dialog:
            exact = record_matches.get(item_id, {}).get("exact", [])
            normalized_only = record_matches.get(item_id, {}).get("normalized", [])
            exact_omitted = normalized_omitted = 0
        else:
            exact_paths: set[str] = set()
            normalized_paths: set[str] = set()
            if traditional:
                for candidate_path, text_value, normalized_lines in documents:
                    if traditional in text_value:
                        exact_paths.add(candidate_path)
                    elif len(normalized) >= MIN_NORMALIZED_MATCH_LENGTH and any(normalized == line or normalized in line for line in normalized_lines):
                        normalized_paths.add(candidate_path)
            exact, exact_omitted = ranked_matches(exact_paths, "exact_surface_file")
            normalized_only, normalized_omitted = ranked_matches(normalized_paths, "normalized_surface_file")
        for match in exact + normalized_only:
            match_counts[match["match_type"]] += 1
            layer_counts[match["layer"]] += 1
        records.append({
            "id": item_id,
            "ordinal": item.get("ordinal"),
            "section": item.get("section"),
            "subsection": item.get("subsection"),
            "item_type": item.get("itemType"),
            "source_traditional": traditional,
            "source_jyutping": item_source.get("jyutping") or item_source.get("jyutpingLine") or item_source.get("romanizationLine"),
            "source_english": item_source.get("english"),
            "source_hash": item.get("sourceHash"),
            "normalized_surface": normalized,
            "exact_match_candidates": exact,
            "exact_match_paths_omitted": exact_omitted,
            "normalized_match_candidates": normalized_only,
            "normalized_match_paths_omitted": normalized_omitted,
            "later_research_links": route_links.get(item_id, []) if is_dialog else later.get(item_id, []),
            "mechanical_status": "candidate_scan_complete",
            "expert_duplicate_status": "unreviewed",
            "terminal_ingress_classification": "unreviewed",
            "evidence_use_disposition": "unreviewed",
            "review_note": "",
        })
    return {
        "schema": "canto-span-pedagogical-corpus-review-candidates-v1",
        "source_id": source_id,
        "source_path": str(package_relative / "source.json"),
        "source_payload_hash": (source.get("ingress") or {}).get("sourcePayloadHash"),
        "record_count": len(records),
        "scan_policy": {
            "roots": SCAN_ROOTS,
            "excluded_package_files": sorted(PACKAGE_REVIEW_FILES | {output_relative.name}),
            "excluded_path_parts": sorted(EXCLUDED_PARTS),
            "maximum_file_bytes": 2_000_000,
            "generated_bundle_excluded": True,
            "matches_are_file_level_candidates_not_decisions": True,
            "dialog_matches_are_record_level_source_candidates": is_dialog,
            "maximum_paths_per_match_type": MAX_MATCH_PATHS_PER_TYPE,
            "minimum_normalized_match_length": MIN_NORMALIZED_MATCH_LENGTH,
            "layer_priority": LAYER_PRIORITY,
        },
        "summary": {
            "item_type_counts": dict(sorted(Counter(row["item_type"] for row in records).items())),
            "records_with_exact_candidates": sum(bool(row["exact_match_candidates"]) for row in records),
            "records_with_normalized_candidates": sum(bool(row["normalized_match_candidates"]) for row in records),
            "records_with_later_research": sum(bool(row["later_research_links"]) for row in records),
            "retained_file_match_counts": dict(sorted(match_counts.items())),
            "candidate_layer_counts": dict(sorted(layer_counts.items())),
            "omitted_exact_paths": sum(row["exact_match_paths_omitted"] for row in records),
            "omitted_normalized_paths": sum(row["normalized_match_paths_omitted"] for row in records),
            "expert_reviewed": 0,
        },
        "records": records,
    }

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=DEFAULT_ROOT)
    parser.add_argument("--package", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    root = args.root.resolve()
    package_relative = Path(args.package)
    output_relative = Path(args.output)
    result = build(root, package_relative, output_relative)
    rendered = json.dumps(result, ensure_ascii=False, indent=2) + "\n"
    if args.write:
        target = root / output_relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(rendered, encoding="utf-8")
    else:
        print(rendered, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
