#!/usr/bin/env python3
"""Intersect the common-spoken candidate pool with pinned Rime-Cantonese.

Rime is pronunciation/orthography corroboration only. This ledger additionally
preserves whether exact-surface support comes from the character/word dictionaries
or only the phrase dictionary. Those are review signals, not automatic lexicality.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import sys
from collections import defaultdict
from pathlib import Path

UPSTREAM_REPOSITORY = "rime/rime-cantonese"
UPSTREAM_COMMIT = "c99b16e44d2df77a5cb8fb0867dd2bab7a112cb0"
UPSTREAM_COMMIT_DATE = "2026-07-02T11:05:50Z"
SOURCE_FILES = {
    "jyut6ping3.chars.dict.yaml": "f4680c79ac56dd1f88a8d3ff23ec10ca2f2f8976",
    "jyut6ping3.words.dict.yaml": "df000c8c0fa3979ece7e17beb13270fb8784ac18",
    "jyut6ping3.phrase.dict.yaml": "e3888c43b2e2aac2c89a7134f93f4920705c9187",
}
LEXICAL_SOURCE_FILES = {"jyut6ping3.chars.dict.yaml", "jyut6ping3.words.dict.yaml"}
PHRASE_SOURCE_FILE = "jyut6ping3.phrase.dict.yaml"
SCHEMA = "canto-span-rime-cantonese-common-spoken-candidates-v1"


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def git_blob_sha(data: bytes) -> str:
    header = f"blob {len(data)}\0".encode("ascii")
    return hashlib.sha1(header + data).hexdigest()


def parse_rime_file(path: Path, expected_blob_sha: str):
    data = path.read_bytes()
    actual_blob_sha = git_blob_sha(data)
    if actual_blob_sha != expected_blob_sha:
        raise ValueError(
            f"{path.name}: git blob SHA {actual_blob_sha} != pinned {expected_blob_sha}"
        )

    readings = defaultdict(set)
    in_entries = False
    for raw_line in data.decode("utf-8").splitlines():
        if not in_entries:
            if raw_line.strip() == "...":
                in_entries = True
            continue
        if not raw_line or raw_line.startswith("#"):
            continue
        parts = raw_line.split("\t")
        if len(parts) < 2:
            continue
        surface = parts[0].strip()
        reading = parts[1].strip()
        if surface and reading:
            readings[surface].add(reading)

    if not in_entries:
        raise ValueError(f"{path.name}: missing Rime YAML header terminator (...)")

    return readings, {
        "path": path.name,
        "git_blob_sha": actual_blob_sha,
        "sha256": sha256_bytes(data),
        "bytes": len(data),
    }


def load_candidates(path: Path):
    data = path.read_bytes()
    rows = list(csv.DictReader(io.StringIO(data.decode("utf-8")), delimiter="\t"))
    if not rows:
        raise ValueError("candidate pool is empty")
    ranks = [int(row["candidate_rank"]) for row in rows]
    if ranks != list(range(1, len(rows) + 1)):
        raise ValueError("candidate ranks are not contiguous from 1")
    return rows, sha256_bytes(data)


def build_outputs(rime_dir: Path, candidate_path: Path):
    all_readings = defaultdict(set)
    all_sources = defaultdict(set)
    source_metadata = []

    for filename, expected_blob_sha in SOURCE_FILES.items():
        source_path = rime_dir / filename
        if not source_path.is_file():
            raise FileNotFoundError(f"missing pinned Rime source file: {source_path}")
        file_readings, metadata = parse_rime_file(source_path, expected_blob_sha)
        source_metadata.append(metadata)
        for surface, readings in file_readings.items():
            all_readings[surface].update(readings)
            all_sources[surface].add(filename)

    candidates, candidate_sha256 = load_candidates(candidate_path)

    out = io.StringIO(newline="")
    fields = [
        "candidate_rank",
        "word",
        "rime_present",
        "rime_readings",
        "rime_readings_compact",
        "rime_source_files",
        "rime_lexical_source_present",
        "rime_phrase_source_present",
        "rime_phrase_only",
    ]
    writer = csv.DictWriter(out, fieldnames=fields, delimiter="\t", lineterminator="\n")
    writer.writeheader()

    present = 0
    lexical_present = 0
    phrase_present = 0
    phrase_only = 0
    multi_reading = 0
    source_counts = defaultdict(int)

    for row in candidates:
        surface = row["word"]
        readings = sorted(all_readings.get(surface, set()))
        sources = sorted(all_sources.get(surface, set()))
        is_present = bool(readings)
        has_lexical_source = bool(set(sources) & LEXICAL_SOURCE_FILES)
        has_phrase_source = PHRASE_SOURCE_FILE in sources
        is_phrase_only = has_phrase_source and not has_lexical_source
        present += int(is_present)
        lexical_present += int(has_lexical_source)
        phrase_present += int(has_phrase_source)
        phrase_only += int(is_phrase_only)
        multi_reading += int(len(readings) > 1)
        for source in sources:
            source_counts[source] += 1

        writer.writerow(
            {
                "candidate_rank": row["candidate_rank"],
                "word": surface,
                "rime_present": "true" if is_present else "false",
                "rime_readings": "|".join(readings),
                "rime_readings_compact": "|".join(r.replace(" ", "") for r in readings),
                "rime_source_files": "|".join(sources),
                "rime_lexical_source_present": "true" if has_lexical_source else "false",
                "rime_phrase_source_present": "true" if has_phrase_source else "false",
                "rime_phrase_only": "true" if is_phrase_only else "false",
            }
        )

    row_count = len(candidates)
    manifest = {
        "schema": SCHEMA,
        "purpose": (
            "Pinned Rime-Cantonese exact-surface pronunciation/orthography corroboration "
            "for the expanded common-spoken candidate pool; source-file class is retained "
            "as a lexicality review signal but never used as automatic lexical truth."
        ),
        "upstream": {
            "repository": UPSTREAM_REPOSITORY,
            "commit": UPSTREAM_COMMIT,
            "commit_date": UPSTREAM_COMMIT_DATE,
            "license": "CC-BY-4.0",
            "license_file": "LICENSE-CC-BY",
            "source_files": source_metadata,
        },
        "candidate_input": {
            "path": str(candidate_path.relative_to(repo_root())),
            "sha256": candidate_sha256,
            "rows": row_count,
        },
        "output": {
            "rows": row_count,
            "rime_present": present,
            "rime_absent": row_count - present,
            "rime_lexical_source_present": lexical_present,
            "rime_phrase_source_present": phrase_present,
            "rime_phrase_only": phrase_only,
            "rime_multi_reading": multi_reading,
            "source_surface_counts": dict(sorted(source_counts.items())),
        },
        "limitations": [
            "Rime presence supports a Cantonese surface/reading candidate; it does not establish POS, sense, construction identity, commonness, or atomic lexicality.",
            "Rime word/character-dictionary membership is a stronger lexicality review signal than phrase-only membership, but it is not a final adjudication.",
            "Rime phrase-only membership is not proof that a surface is nonlexical.",
            "Rime absence is not evidence that a surface or reading is absent from Cantonese.",
            "Rime dictionary weights are intentionally discarded and must not be interpreted as linguistic frequency.",
        ],
    }
    return out.getvalue(), json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=True) + "\n"


def compare_or_write(path: Path, content: str, check: bool) -> bool:
    if check:
        if not path.is_file():
            print(f"missing generated file: {path}", file=sys.stderr)
            return False
        if path.read_text(encoding="utf-8") != content:
            print(f"generated file is stale: {path}", file=sys.stderr)
            return False
        return True
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8", newline="")
    return True


def main() -> int:
    root = repo_root()
    parser = argparse.ArgumentParser()
    parser.add_argument("--rime-dir", type=Path, required=True)
    parser.add_argument(
        "--candidates",
        type=Path,
        default=root / "data/lexical-frequency/common-spoken-cantonese-candidates-5000.tsv",
    )
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    candidate_path = args.candidates.resolve()
    row_count = sum(1 for _ in candidate_path.open(encoding="utf-8")) - 1
    output_dir = root / "external-evidence/lexical-pos/rime-cantonese" / UPSTREAM_COMMIT
    ledger_path = output_dir / f"common-spoken-candidates-{row_count}-readings.tsv"
    manifest_path = output_dir / f"common-spoken-candidates-{row_count}.manifest.json"

    ledger, manifest = build_outputs(args.rime_dir.resolve(), candidate_path)
    ok = compare_or_write(ledger_path, ledger, args.check)
    ok &= compare_or_write(manifest_path, manifest, args.check)
    if not ok:
        return 1
    print(f"Rime-Cantonese candidate rescue {'verified' if args.check else 'generated'}: {ledger_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
