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


def derived_report_path(package_relative: Path) -> Path:
    return Path("docs/research") / f"{package_relative.name}-CORPUS-INGRESS.md"


def is_global_pedagogical_derived(relative: Path) -> bool:
    return (
        len(relative.parts) >= 4
        and relative.parts[:3] == ("data", "pedagogical-corpus", "glossika")
        and relative.name in GLOBAL_PEDAGOGICAL_DERIVED_FILES
    )


def candidate_files(root: Path, package_relative: Path, output_relative: Path) -> list[Path]:
    output: list[Path] = []
    excluded_files = {package_relative / name for name in PACKAGE_REVIEW_FILES}
    excluded_files.update({output_relative, derived_report_path(package_relative)})

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


def build(root: Path, package_relative: Path, output_relative: Path) -> dict[str, Any]:
    source = read_json(root / package_relative / "source.json")
    if source.get("schema") != "canto-span-pedagogical-corpus-source-v1":
        raise ValueError("unsupported pedagogical source schema")
    source_id = (source.get("source") or {}).get("sourceId")
    items = source.get("items")
    if not isinstance(items, list):
        raise ValueError("source items must be an array")

    documents = load_documents(root, candidate_files(root, package_relative, output_relative))
    later = load_later_research(root, str(source_id))
    records: list[dict[str, Any]] = []
    match_counts: Counter[str] = Counter()
    layer_counts: Counter[str] = Counter()

    for item in items:
        item_source = item.get("source") or {}
        traditional = str(item_source.get("traditional") or "")
        normalized = normalize_surface(traditional)
        exact_paths: set[str] = set()
        normalized_paths: set[str] = set()

        if traditional:
            for path, text, normalized_lines in documents:
                if traditional in text:
                    exact_paths.add(path)
                elif len(normalized) >= MIN_NORMALIZED_MATCH_LENGTH and any(
                    normalized == line or normalized in line for line in normalized_lines
                ):
                    normalized_paths.add(path)

        exact, exact_omitted = ranked_matches(exact_paths, "exact_surface_file")
        normalized_only, normalized_omitted = ranked_matches(normalized_paths, "normalized_surface_file")
        for match in exact + normalized_only:
            match_counts[match["match_type"]] += 1
            layer_counts[match["layer"]] += 1

        item_id = item.get("id")
        records.append({
            "id": item_id,
            "ordinal": item.get("ordinal"),
            "section": item.get("section"),
            "subsection": item.get("subsection"),
            "item_type": item.get("itemType"),
            "source_traditional": traditional,
            "source_jyutping": item_source.get("jyutping"),
            "source_english": item_source.get("english"),
            "source_hash": item.get("sourceHash"),
            "normalized_surface": normalized,
            "exact_match_candidates": exact,
            "exact_match_paths_omitted": exact_omitted,
            "normalized_match_candidates": normalized_only,
            "normalized_match_paths_omitted": normalized_omitted,
            "later_research_links": later.get(item_id, []),
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
