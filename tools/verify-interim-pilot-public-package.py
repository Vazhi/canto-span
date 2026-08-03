#!/usr/bin/env python3
"""Verify the disclosure-controlled public interim pilot package."""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import math
import re
import subprocess
import sys
from functools import lru_cache
from pathlib import Path
from typing import Any, Iterable

DEFAULT_ROOT = Path(__file__).resolve().parents[1]
PACKAGE_RELATIVE = Path(
    "review-packets/native-panel/active-v2/interim-exports/"
    "YUE-JUDGMENT-PILOT-01-2026-07-31"
)
MANIFEST_RELATIVE = PACKAGE_RELATIVE / "manifest.json"
PANEL_STATE_RELATIVE = Path("review-packets/native-panel/active-v2/panel-review-state.json")
FOLLOWUP_METADATA_RELATIVE = Path(
    "review-packets/native-panel/active-v2/followup-draft-v1-metadata.json"
)

EXPECTED_PUBLIC_FILES = {
    "README.md",
    "PUBLIC-DISCLOSURE-POLICY.md",
    "OFFLINE-REPRODUCIBILITY.md",
    "pilot-analysis-report.md",
    "condition-summary-bands.csv",
    "item-publication-status.csv",
    "qualitative-theme-disposition.csv",
}
EXPECTED_PACKAGE_FILES = EXPECTED_PUBLIC_FILES | {"manifest.json"}
WITHDRAWN_FILES = {
    "condition-statistics.csv",
    "item-statistics.csv",
    "interpretation-statistics.csv",
}
CONDITION_FIELDS = ["group", "condition", "description", "interim_signal"]
ITEM_FIELDS = ["item_id", "publication_status", "reason"]
THEME_FIELDS = [
    "theme_id",
    "domain",
    "minimum_public_support",
    "public_support_count",
    "adjudication_status",
    "public_disposition",
]
PROHIBITED_RESULT_FIELDS = {
    "n",
    "denominator",
    "mean",
    "sd",
    "standard_deviation",
    "median",
    "rating_1",
    "rating_2",
    "rating_3",
    "rating_4",
    "rating_5",
    "natural_1_2_pct",
    "uncertain_3_pct",
    "unnatural_4_5_pct",
    "correction_count",
    "interpretation",
    "count",
    "percent",
}
EXPECTED_PRIVATE_SOURCE_FILES = [
    {
        "filename": "data_canto-span_2026-07-31_11-04.csv",
        "role": "participant-level SoSci response export",
        "bytes": 321334,
        "sha256": "0cb385d5a4d115641bc2ea6bd6e83fc5e07190f4d3dfe9c4e41263ec323cabe2",
        "encoding_or_format": "utf-16 tab-delimited",
        "committed_to_public_repository": False,
    },
    {
        "filename": "variables_canto-span_2026-07-31_11-04.csv",
        "role": "SoSci variable definitions",
        "bytes": 181890,
        "sha256": "1816ffcd84cb0ff5a68492122cc7f290d3e7f49ca554196d64f5b6eb9504c690",
        "encoding_or_format": "utf-16 tab-delimited",
        "committed_to_public_repository": False,
    },
    {
        "filename": "values_canto-span_2026-07-31_11-04.csv",
        "role": "SoSci response-code value labels",
        "bytes": 93018,
        "sha256": "5b13025839661b66513483be6d6cc597e06d5a82378952e416e09b07422f8776",
        "encoding_or_format": "utf-16 tab-delimited",
        "committed_to_public_repository": False,
    },
    {
        "filename": "codebook_canto-span_2026-07-31_11-04.xlsx",
        "role": "SoSci codebook",
        "bytes": 69464,
        "sha256": "79afd50631892672e3040862a0eabbd6537814ec7844269712096cf385c90416",
        "encoding_or_format": "xlsx",
        "committed_to_public_repository": False,
    },
    {
        "filename": "Canto_Span_Pilot_Analysis_Report_2026-07-31.docx",
        "role": "descriptive analysis source report",
        "bytes": 291169,
        "sha256": "25b46a922020a3ec4543dac6c778ca71aa3f5c0254082b3c2d08fc16ea0a6db9",
        "encoding_or_format": "docx",
        "committed_to_public_repository": False,
    },
]
EXPECTED_SIGNALS = {
    "more_natural_side": (1.0, 2.5),
    "mixed_or_context_sensitive": (2.5, 3.5),
    "more_unnatural_side": (3.5, 5.000001),
}
MINIMUM_COMPATIBLE_HISTOGRAMS = 10000
PROVISIONAL_DENOMINATOR = 36
SKIP_SCAN_DIRECTORIES = {".git", "node_modules", "__pycache__", ".venv", "venv"}


def fail(message: str) -> None:
    raise AssertionError(message)


def read_bytes(root: Path, relative: Path) -> bytes:
    path = root / relative
    if not path.is_file():
        fail(f"missing file: {relative}")
    return path.read_bytes()


def load_json(root: Path, relative: Path) -> dict[str, Any]:
    try:
        value = json.loads(read_bytes(root, relative))
    except json.JSONDecodeError as error:
        fail(f"invalid JSON in {relative}: {error}")
    if not isinstance(value, dict):
        fail(f"expected JSON object: {relative}")
    return value


def sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def read_csv(root: Path, relative: Path, expected_fields: list[str]) -> list[dict[str, str]]:
    raw = read_bytes(root, relative)
    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError as error:
        fail(f"public CSV is not UTF-8: {relative}: {error}")
    reader = csv.DictReader(text.splitlines())
    if reader.fieldnames != expected_fields:
        fail(f"unexpected CSV schema for {relative}: {reader.fieldnames}")
    rows = list(reader)
    if not rows:
        fail(f"public CSV has no rows: {relative}")
    return rows


def expected_item_ids() -> set[str]:
    experimental = {
        f"G0{group}{condition}0{item}"
        for group in range(1, 6)
        for condition in "ABCD"
        for item in range(1, 5)
    }
    controls = {f"F{item:03d}" for item in range(1, 11)}
    controls |= {f"C{item:03d}" for item in range(1, 3)}
    return experimental | controls


@lru_cache(maxsize=None)
def compatible_histogram_count(signal: str, denominator: int = PROVISIONAL_DENOMINATOR) -> int:
    if signal not in EXPECTED_SIGNALS:
        fail(f"unsupported condition signal: {signal}")
    lower, upper = EXPECTED_SIGNALS[signal]
    count = 0
    for c1 in range(denominator + 1):
        for c2 in range(denominator - c1 + 1):
            for c3 in range(denominator - c1 - c2 + 1):
                for c4 in range(denominator - c1 - c2 - c3 + 1):
                    c5 = denominator - c1 - c2 - c3 - c4
                    total = c1 + 2 * c2 + 3 * c3 + 4 * c4 + 5 * c5
                    mean = total / denominator
                    if lower <= mean < upper:
                        count += 1
    return count


def verify_public_file_manifest(root: Path, manifest: dict[str, Any]) -> int:
    package = root / PACKAGE_RELATIVE
    actual_names = {path.name for path in package.iterdir() if path.is_file()}
    if actual_names != EXPECTED_PACKAGE_FILES:
        fail(
            "unexpected public package file set: "
            f"missing={sorted(EXPECTED_PACKAGE_FILES - actual_names)} "
            f"extra={sorted(actual_names - EXPECTED_PACKAGE_FILES)}"
        )
    if actual_names & WITHDRAWN_FILES:
        fail(f"withdrawn result file reintroduced: {sorted(actual_names & WITHDRAWN_FILES)}")

    records = manifest.get("public_package_files")
    if not isinstance(records, list):
        fail("public_package_files must be an array")
    by_path: dict[str, dict[str, Any]] = {}
    for record in records:
        if not isinstance(record, dict) or not isinstance(record.get("path"), str):
            fail("invalid public package file record")
        name = record["path"]
        if name in by_path:
            fail(f"duplicate public package file record: {name}")
        by_path[name] = record
    if set(by_path) != EXPECTED_PUBLIC_FILES:
        fail("manifest public file set does not match the closed package")

    for name, record in by_path.items():
        data = read_bytes(root, PACKAGE_RELATIVE / name)
        if record.get("bytes") != len(data):
            fail(f"public byte-count drift: {name}")
        if record.get("sha256") != sha256_hex(data):
            fail(f"public SHA-256 drift: {name}")
    return len(by_path)


def verify_manifest_policy(manifest: dict[str, Any]) -> None:
    expected_top = {
        "schema": "canto-span-native-panel-interim-export-v3",
        "instrument_id": "YUE-JUDGMENT-PILOT-01",
        "instrument_version": "0.1.0-pilot",
        "snapshot_kind": "interim_disclosure_controlled_banded_derivative",
        "snapshot_state": "frozen_historical_derivative",
        "collection_state": "active",
        "item_level_audit_state": "not_started",
        "evidence_status": "descriptive_pilot_only_not_adjudicated",
        "analytic_subset_status": "provisionally_retained_for_interim_description",
    }
    for key, expected in expected_top.items():
        if manifest.get(key) != expected:
            fail(f"manifest {key} drift: {manifest.get(key)!r} != {expected!r}")

    screening = manifest.get("screening_totals") or {}
    expected_screening = {
        "survey_starts": 113,
        "incomplete_starts": 66,
        "finished_cases": 47,
        "screened_out_finished_cases": 11,
        "provisionally_retained_for_interim_description": 36,
        "provisional_cases_with_exactly_32_ratings": 36,
    }
    if screening != expected_screening:
        fail("provisional screening totals changed")
    if screening["survey_starts"] != screening["incomplete_starts"] + screening["finished_cases"]:
        fail("survey-start arithmetic mismatch")
    if screening["finished_cases"] != (
        screening["screened_out_finished_cases"]
        + screening["provisionally_retained_for_interim_description"]
    ):
        fail("finished-case arithmetic mismatch")

    if manifest.get("counterbalanced_list_counts") != {
        "LIST_A": 9,
        "LIST_B": 11,
        "LIST_C": 8,
        "LIST_D": 8,
    }:
        fail("counterbalanced-list counts changed")

    if manifest.get("private_source_files") != EXPECTED_PRIVATE_SOURCE_FILES:
        fail("private-source provenance records changed")

    disclosure = manifest.get("disclosure_control") or {}
    required = {
        "policy_file": "PUBLIC-DISCLOSURE-POLICY.md",
        "minimum_sensitive_cell_size": 5,
        "exact_item_results_public": False,
        "exact_condition_moments_public": False,
        "exact_rating_category_counts_public": False,
        "correction_counts_public": False,
        "fixed_choice_interpretation_counts_public": False,
        "participant_derived_qualitative_themes_public": False,
        "condition_signal_bands_public": True,
        "minimum_compatible_rating_histograms_per_band": MINIMUM_COMPATIBLE_HISTOGRAMS,
        "linked_table_review_required": True,
        "private_content_hash_scan_required": True,
        "qualitative_theme_minimum_support": 5,
    }
    if disclosure != required:
        fail("public disclosure-control metadata changed")

    bands = manifest.get("condition_signal_bands") or {}
    expected_bands = {
        name: {
            "mean_lower_inclusive": bounds[0],
            "mean_upper_exclusive": bounds[1],
            "compatible_histograms_at_provisional_n": compatible_histogram_count(name),
        }
        for name, bounds in EXPECTED_SIGNALS.items()
    }
    if bands != expected_bands:
        fail("condition signal-band definitions or histogram counts changed")

    privacy = manifest.get("privacy_disposition") or {}
    if privacy.get("claim") != "disclosure_controlled_not_risk_free":
        fail("public privacy claim must remain disclosure-controlled, not risk-free")
    for field in [
        "participant_level_export_public",
        "open_text_public",
        "exact_timestamps_public",
        "case_and_serial_identifiers_public",
        "recruitment_reference_public",
    ]:
        if privacy.get(field) is not False:
            fail(f"private public-disposition drift: {field}")

    reproducibility = manifest.get("source_to_aggregate_reproducibility") or {}
    if reproducibility != {
        "status": "not_reproducible_historical_script_and_environment_not_retained",
        "documentation": "OFFLINE-REPRODUCIBILITY.md",
        "script_sha256": None,
        "environment_lock_sha256": None,
    }:
        fail("historical source-to-aggregate reproducibility status changed")


def verify_condition_bands(root: Path, manifest: dict[str, Any]) -> list[dict[str, str]]:
    rows = read_csv(root, PACKAGE_RELATIVE / "condition-summary-bands.csv", CONDITION_FIELDS)
    if len(rows) != 20:
        fail(f"condition row count changed: {len(rows)}")
    seen: set[tuple[str, str]] = set()
    minimum = math.inf
    for row in rows:
        key = (row["group"], row["condition"])
        if key in seen:
            fail(f"duplicate condition row: {key}")
        seen.add(key)
        signal = row["interim_signal"]
        possible = compatible_histogram_count(signal)
        minimum = min(minimum, possible)
        if possible < MINIMUM_COMPATIBLE_HISTOGRAMS:
            fail(f"condition band is too revealing: {key} has {possible} compatible histograms")
    expected = {(f"G0{group}", condition) for group in range(1, 6) for condition in "ABCD"}
    if seen != expected:
        fail("condition matrix is incomplete")
    validation = manifest.get("public_validation") or {}
    if validation.get("condition_summary_rows") != len(rows):
        fail("manifest condition row count drift")
    if validation.get("minimum_compatible_rating_histograms") != int(minimum):
        fail("manifest minimum compatible-histogram count drift")
    return rows


def verify_item_status(root: Path, manifest: dict[str, Any]) -> list[dict[str, str]]:
    rows = read_csv(root, PACKAGE_RELATIVE / "item-publication-status.csv", ITEM_FIELDS)
    if len(rows) != 92:
        fail(f"item publication row count changed: {len(rows)}")
    ids = [row["item_id"] for row in rows]
    if len(ids) != len(set(ids)):
        fail("duplicate public item ID")
    if set(ids) != expected_item_ids():
        fail("public item inventory is incomplete or contains unknown IDs")
    for row in rows:
        if row["publication_status"] != "withheld_no_item_level_results_public":
            fail(f"item result became public: {row['item_id']}")
        if row["reason"] != "Exact item-level rating summaries are not public in this interim package.":
            fail(f"item withholding reason changed: {row['item_id']}")
    if manifest.get("public_validation", {}).get("item_publication_status_rows") != len(rows):
        fail("manifest item publication row count drift")
    return rows


def verify_theme_disposition(root: Path, manifest: dict[str, Any]) -> list[dict[str, str]]:
    rows = read_csv(
        root,
        PACKAGE_RELATIVE / "qualitative-theme-disposition.csv",
        THEME_FIELDS,
    )
    if len(rows) != 4:
        fail(f"qualitative disposition row count changed: {len(rows)}")
    for row in rows:
        if row["minimum_public_support"] != "5":
            fail(f"qualitative public threshold changed: {row['theme_id']}")
        if row["public_support_count"].strip():
            fail(f"unaudited qualitative support count became public: {row['theme_id']}")
        if row["adjudication_status"] != "not_audited_private_source_required":
            fail(f"qualitative adjudication status changed: {row['theme_id']}")
        if row["public_disposition"] != "withheld":
            fail(f"unaudited qualitative theme became public: {row['theme_id']}")
    if manifest.get("public_validation", {}).get("qualitative_theme_disposition_rows") != len(rows):
        fail("manifest qualitative disposition row count drift")
    return rows


def verify_linked_table_review(
    condition_rows: list[dict[str, str]],
    item_rows: list[dict[str, str]],
    manifest: dict[str, Any],
) -> int:
    if PROHIBITED_RESULT_FIELDS & set(CONDITION_FIELDS):
        fail("condition table exposes participant-derived numeric fields")
    if PROHIBITED_RESULT_FIELDS & set(ITEM_FIELDS):
        fail("item table exposes participant-derived numeric fields")

    condition_keys = {(row["group"], row["condition"]) for row in condition_rows}
    joined = 0
    for row in item_rows:
        match = re.fullmatch(r"(G0[1-5])([A-D])0[1-4]", row["item_id"])
        if not match:
            continue
        key = (match.group(1), match.group(2))
        if key not in condition_keys:
            fail(f"experimental item lacks condition row: {row['item_id']}")
        if row["publication_status"] != "withheld_no_item_level_results_public":
            fail(f"linked item result is not withheld: {row['item_id']}")
        joined += 1
    if joined != 80:
        fail(f"linked-table review expected 80 experimental item joins, found {joined}")
    if manifest.get("public_validation", {}).get("linked_condition_item_pairs_reviewed") != joined:
        fail("manifest linked-table review count drift")
    return joined


def iter_repository_files(root: Path) -> Iterable[Path]:
    git_dir = root / ".git"
    if git_dir.exists():
        run = subprocess.run(
            ["git", "-C", str(root), "ls-files", "-z"],
            capture_output=True,
            check=False,
        )
        if run.returncode == 0:
            for raw in run.stdout.split(b"\0"):
                if not raw:
                    continue
                relative = Path(raw.decode("utf-8", errors="strict"))
                path = root / relative
                if path.is_file() and not path.is_symlink():
                    yield path
            return
    for path in root.rglob("*"):
        if not path.is_file() or path.is_symlink():
            continue
        relative = path.relative_to(root)
        if any(part in SKIP_SCAN_DIRECTORIES for part in relative.parts):
            continue
        yield path


def verify_private_source_absence(
    root: Path,
    forbidden_hashes: set[str] | None = None,
) -> int:
    hashes = forbidden_hashes or {row["sha256"] for row in EXPECTED_PRIVATE_SOURCE_FILES}
    checked = 0
    matches: list[str] = []
    for path in iter_repository_files(root):
        checked += 1
        if sha256_hex(path.read_bytes()) in hashes:
            matches.append(str(path.relative_to(root)))
    if matches:
        fail(f"private-source content hash present under repository path(s): {sorted(matches)}")
    return checked


def verify_prose(root: Path) -> None:
    prose_names = [
        "README.md",
        "PUBLIC-DISCLOSURE-POLICY.md",
        "OFFLINE-REPRODUCIBILITY.md",
        "pilot-analysis-report.md",
    ]
    combined = "\n".join(
        read_bytes(root, PACKAGE_RELATIVE / name).decode("utf-8") for name in prose_names
    )
    prohibited = [
        "privacy-safe aggregate snapshot",
        "eligible_retained_cases",
        "Eligible retained cases",
        "exact item-level rating summaries for 92",
    ]
    for phrase in prohibited:
        if phrase in combined:
            fail(f"prohibited or superseded public prose remains: {phrase}")
    required = [
        "provisionally retained",
        "not final evidence",
        "condition-statistics.csv",
        "item-statistics.csv",
        "interpretation-statistics.csv",
        "10,000",
        "content-hash",
        "80 counterbalanced experimental",
    ]
    for phrase in required:
        if phrase not in combined:
            fail(f"required public disclosure statement missing: {phrase}")


def verify_lifecycle(root: Path, manifest: dict[str, Any]) -> None:
    panel = load_json(root, PANEL_STATE_RELATIVE)
    followup = load_json(root, FOLLOWUP_METADATA_RELATIVE)
    lifecycle = panel.get("instrument_lifecycle") or {}
    pilots = lifecycle.get("pilot_collections")
    if not isinstance(pilots, list) or len(pilots) != 1:
        fail("canonical lifecycle lacks exactly one pilot declaration")
    pilot = pilots[0]
    audit = lifecycle.get("item_level_audit") or {}
    followup_state = lifecycle.get("followup_instrument") or {}
    if pilot.get("instrument_id") != manifest.get("instrument_id"):
        fail("interim package does not target the canonical pilot")
    if pilot.get("collection_state") != "active" or manifest.get("collection_state") != "active":
        fail("interim package contradicts active pilot collection")
    if audit.get("state") != "not_started" or manifest.get("item_level_audit_state") != "not_started":
        fail("interim package contradicts item-audit state")
    if followup_state.get("lifecycle_state") != "draft" or followup.get("lifecycle_state") != "draft":
        fail("interim package contradicts follow-up draft state")
    if followup_state.get("deployment_allowed") is not False or followup.get("deployment_allowed") is not False:
        fail("interim package contradicts follow-up deployment lock")


def verify(root: Path = DEFAULT_ROOT) -> dict[str, Any]:
    root = root.resolve()
    manifest = load_json(root, MANIFEST_RELATIVE)
    public_files = verify_public_file_manifest(root, manifest)
    verify_manifest_policy(manifest)
    condition_rows = verify_condition_bands(root, manifest)
    item_rows = verify_item_status(root, manifest)
    theme_rows = verify_theme_disposition(root, manifest)
    linked_pairs = verify_linked_table_review(condition_rows, item_rows, manifest)
    verify_prose(root)
    verify_lifecycle(root, manifest)
    scanned_files = verify_private_source_absence(root)

    validation = manifest.get("public_validation") or {}
    expected_validation = {
        "condition_summary_rows": 20,
        "item_publication_status_rows": 92,
        "qualitative_theme_disposition_rows": 4,
        "linked_condition_item_pairs_reviewed": 80,
        "minimum_compatible_rating_histograms": 19151,
        "condition_statistics_withdrawn": True,
        "item_statistics_withdrawn": True,
        "interpretation_statistics_withdrawn": True,
        "aggregate_files_utf8": True,
    }
    if validation != expected_validation:
        fail("public validation summary changed")

    return {
        "schema": "canto-span-interim-public-package-verification-v3",
        "public_files": public_files,
        "condition_rows": len(condition_rows),
        "item_status_rows": len(item_rows),
        "qualitative_disposition_rows": len(theme_rows),
        "linked_condition_item_pairs_reviewed": linked_pairs,
        "minimum_compatible_rating_histograms": 19151,
        "private_source_hashes_checked_absent": len(EXPECTED_PRIVATE_SOURCE_FILES),
        "repository_files_hashed": scanned_files,
        "collection_state": "active",
        "item_level_audit_state": "not_started",
        "followup_state": "draft",
        "status": "PASS",
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=DEFAULT_ROOT)
    args = parser.parse_args()
    print(json.dumps(verify(args.root), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (AssertionError, KeyError, TypeError, ValueError, json.JSONDecodeError) as error:
        print(f"interim pilot public-package verification failed: {error}", file=sys.stderr)
        raise SystemExit(1)
