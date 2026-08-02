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
EXCLUDED_PARTS = {
    ".git",
    "node_modules",
    "archive",
    "archives",
    "validation",
    "recovery",
    "dist",
    "build",
}
PUNCTUATION = re.compile(r"[\s，。！？；：、,.!?;:'\"“”‘’（）()【】\[\]《》<>—–…·`~]+", re.UNICODE)


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


def candidate_files(root: Path, package_relative: Path, output_relative: Path) -> list[Path]:
    output = []
    excluded_package_files = {
        package_relative / "source.json",
        package_relative / "review.json",
        package_relative / "items.tsv",
        package_relative / "README.md",
        package_relative / "research-summary.md",
        output_relative,
    }
    for scan_root in SCAN_ROOTS:
        base = root / scan_root
        if not base.exists():
            continue
        for path in base.rglob("*"):
            if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
                continue
            relative = path.relative_to(root)
            if relative in excluded_package_files:
                continue
            if any(part in EXCLUDED_PARTS for part in relative.parts):
                continue
            if path.name == "main.js" or path.stat().st_size > 2_000_000:
                continue
            output.append(path)
    return sorted(output)


def load_lines(root: Path, paths: list[Path]) -> list[tuple[str, int, str, str]]:
    lines = []
    for path in paths:
        relative = str(path.relative_to(root))
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        for number, line in enumerate(text.splitlines(), start=1):
            if not line.strip():
                continue
            lines.append((relative, number, line, normalize_surface(line)))
    return lines


def compact_match(path: str, line: int, match_type: str) -> dict[str, Any]:
    return {
        "path": path,
        "line": line,
        "match_type": match_type,
        "layer": layer_for(path),
    }


def unique_matches(matches: list[dict[str, Any]]) -> list[dict[str, Any]]:
    seen = set()
    output = []
    for match in matches:
        key = (match["path"], match["line"], match["match_type"])
        if key in seen:
            continue
        seen.add(key)
        output.append(match)
    return output


def load_later_research(root: Path, source_id: str) -> dict[str, list[dict[str, Any]]]:
    by_item: dict[str, list[dict[str, Any]]] = defaultdict(list)
    lexical_path = root / "data/research-ledgers/glossika-week14-lexical-ingress.json"
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
    followup_path = root / "data/research-ledgers/glossika-week14-followup-candidates.json"
    if followup_path.exists():
        followup = read_json(followup_path)
        if followup.get("sourceId") == source_id:
            for entry in followup.get("candidates", followup.get("records", [])):
                item_ids = entry.get("sourceItemIds", entry.get("source_item_ids", []))
                if isinstance(entry.get("sourceItemId"), str):
                    item_ids = [entry["sourceItemId"]]
                for item_id in item_ids or []:
                    by_item[item_id].append({
                        "packet": followup.get("packetId"),
                        "kind": "followup_candidate",
                        "candidate_id": entry.get("candidateId", entry.get("id")),
                        "disposition": entry.get("disposition", entry.get("terminalDisposition")),
                        "issue": entry.get("issue"),
                        "reason": entry.get("reason", entry.get("rationale")),
                    })
    return by_item


def build(root: Path, package_relative: Path, output_relative: Path) -> dict[str, Any]:
    source_path = root / package_relative / "source.json"
    source = read_json(source_path)
    if source.get("schema") != "canto-span-pedagogical-corpus-source-v1":
        raise ValueError("unsupported pedagogical source schema")
    source_meta = source.get("source") or {}
    source_id = source_meta.get("sourceId")
    items = source.get("items")
    if not isinstance(items, list):
        raise ValueError("source items must be an array")

    scan_paths = candidate_files(root, package_relative, output_relative)
    lines = load_lines(root, scan_paths)
    later = load_later_research(root, str(source_id))
    records = []
    match_counts = Counter()
    layer_counts = Counter()

    for item in items:
        item_id = item.get("id")
        item_source = item.get("source") or {}
        traditional = str(item_source.get("traditional") or "")
        normalized = normalize_surface(traditional)
        exact = []
        normalized_only = []
        if traditional:
            for path, line_number, line, normalized_line in lines:
                if traditional in line:
                    exact.append(compact_match(path, line_number, "exact_surface"))
                elif normalized and normalized in normalized_line:
                    normalized_only.append(compact_match(path, line_number, "normalized_surface"))
        exact = unique_matches(exact)
        normalized_only = unique_matches(normalized_only)
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
            "source_jyutping": item_source.get("jyutping"),
            "source_english": item_source.get("english"),
            "source_hash": item.get("sourceHash"),
            "normalized_surface": normalized,
            "exact_match_candidates": exact,
            "normalized_match_candidates": normalized_only,
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
            "excluded_package_files": [
                "source.json",
                "review.json",
                "items.tsv",
                "README.md",
                "research-summary.md",
                output_relative.name,
            ],
            "excluded_path_parts": sorted(EXCLUDED_PARTS),
            "maximum_file_bytes": 2_000_000,
            "generated_bundle_excluded": True,
            "matches_are_candidates_not_decisions": True,
        },
        "summary": {
            "item_type_counts": dict(sorted(Counter(row["item_type"] for row in records).items())),
            "records_with_exact_candidates": sum(bool(row["exact_match_candidates"]) for row in records),
            "records_with_normalized_candidates": sum(bool(row["normalized_match_candidates"]) for row in records),
            "records_with_later_research": sum(bool(row["later_research_links"]) for row in records),
            "match_counts": dict(sorted(match_counts.items())),
            "candidate_layer_counts": dict(sorted(layer_counts.items())),
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
