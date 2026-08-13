#!/usr/bin/env python3
"""Generate a frozen Rime-Cantonese reading ledger for the Cifu spoken top 2,000.

This tool is mechanical evidence transport only. It preserves exact-surface Rime
readings and source provenance. It does not infer POS, meaning, frequency,
lexicality, or linguistic status.
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
SCHEMA = "canto-span-rime-cantonese-top2000-v1"


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


def load_cifu(path: Path):
    data = path.read_bytes()
    text = data.decode("utf-8")
    rows = list(csv.DictReader(io.StringIO(text), delimiter="\t"))
    if len(rows) != 2000:
        raise ValueError(f"expected exactly 2,000 Cifu rows, got {len(rows)}")
    ranks = [int(row["rank"]) for row in rows]
    if ranks != list(range(1, 2001)):
        raise ValueError("Cifu ranks are not exactly 1..2000 in order")
    return rows, sha256_bytes(data)


def build_outputs(rime_dir: Path, cifu_path: Path):
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

    cifu_rows, cifu_sha256 = load_cifu(cifu_path)

    out = io.StringIO(newline="")
    fields = [
        "rank",
        "word",
        "cifu_candidate_jyutping",
        "rime_present",
        "rime_readings",
        "rime_readings_compact",
        "rime_source_files",
    ]
    writer = csv.DictWriter(out, fieldnames=fields, delimiter="\t", lineterminator="\n")
    writer.writeheader()

    present = 0
    multi_reading = 0
    source_counts = defaultdict(int)

    for row in cifu_rows:
        surface = row["word"]
        readings = sorted(all_readings.get(surface, set()))
        sources = sorted(all_sources.get(surface, set()))
        is_present = bool(readings)
        if is_present:
            present += 1
        if len(readings) > 1:
            multi_reading += 1
        for source in sources:
            source_counts[source] += 1

        writer.writerow(
            {
                "rank": row["rank"],
                "word": surface,
                "cifu_candidate_jyutping": row.get("cifu_jyutping", ""),
                "rime_present": "true" if is_present else "false",
                "rime_readings": "|".join(readings),
                "rime_readings_compact": "|".join(r.replace(" ", "") for r in readings),
                "rime_source_files": "|".join(sources),
            }
        )

    manifest = {
        "schema": SCHEMA,
        "purpose": (
            "Offline exact-surface Cantonese pronunciation/orthography corroboration "
            "for Cifu SpokenAdult top-2000 adjudication; not POS, semantic, lexicality, "
            "or frequency authority."
        ),
        "upstream": {
            "repository": UPSTREAM_REPOSITORY,
            "commit": UPSTREAM_COMMIT,
            "commit_date": UPSTREAM_COMMIT_DATE,
            "license": "CC-BY-4.0",
            "license_file": "LICENSE-CC-BY",
            "source_files": source_metadata,
        },
        "cifu_input": {
            "path": str(cifu_path.relative_to(repo_root())),
            "sha256": cifu_sha256,
            "rows": 2000,
        },
        "output": {
            "rows": 2000,
            "rime_present": present,
            "rime_absent": 2000 - present,
            "rime_multi_reading": multi_reading,
            "source_surface_counts": dict(sorted(source_counts.items())),
        },
        "limitations": [
            "Rime presence supports a Cantonese surface/reading candidate; it does not establish POS, sense, construction identity, or atomic lexicality.",
            "Rime absence is not evidence that a surface or reading is absent from Cantonese.",
            "Rime dictionary weights are intentionally discarded and must not be interpreted as linguistic frequency.",
            "Cifu Jyutping is retained only as candidate metadata for comparison and has no independent evidentiary weight.",
        ],
    }

    manifest_text = json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=True) + "\n"
    return out.getvalue(), manifest_text


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
    parser.add_argument(
        "--rime-dir",
        type=Path,
        required=True,
        help="Local checkout/directory containing the pinned Rime-Cantonese source files",
    )
    parser.add_argument(
        "--cifu",
        type=Path,
        default=root / "data/lexical-frequency/cifu-spoken-top-2000.tsv",
    )
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    output_dir = (
        root
        / "external-evidence/lexical-pos/rime-cantonese"
        / UPSTREAM_COMMIT
    )
    ledger_path = output_dir / "cifu-top-2000-readings.tsv"
    manifest_path = output_dir / "manifest.json"

    ledger, manifest = build_outputs(args.rime_dir.resolve(), args.cifu.resolve())
    ok = True
    ok &= compare_or_write(ledger_path, ledger, args.check)
    ok &= compare_or_write(manifest_path, manifest, args.check)
    if not ok:
        return 1

    mode = "verified" if args.check else "generated"
    print(f"Rime-Cantonese top-2000 evidence {mode}: {ledger_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
