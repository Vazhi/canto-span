#!/usr/bin/env python3
"""Verify the disclosure-controlled public interim pilot package."""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import math
import sys
from collections import Counter
from pathlib import Path
from typing import Any

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
    "condition-statistics.csv",
    "item-statistics.csv",
    "qualitative-theme-disposition.csv",
}
EXPECTED_PACKAGE_FILES = EXPECTED_PUBLIC_FILES | {"manifest.json"}
CONDITION_FIELDS = ["group", "condition", "description", "n", "mean", "sd", "median"]
ITEM_FIELDS = ["item_id", "sentence", "n", "mean", "sd", "median"]
THEME_FIELDS = [
    "theme_id",
    "domain",
    "minimum_public_support",
    "public_support_count",
    "adjudication_status",
    "public_disposition",
]
PROHIBITED_PUBLIC_COLUMNS = {
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
    "region",
    "variety",
    "list_assignment",
    "completion_time",
    "case",
    "serial",
    "timestamp",
    "recruitment_reference",
}
PROHIBITED_PROSE = {
    "privacy-safe aggregate snapshot",
    "Eligible completed sample",
    "eligible adult childhood Cantonese speakers retained",
    "Eligible retained cases",
    "eligible_retained_cases",
    "approximately 4.2–14.4 minutes",
    "Under 5 minutes",
    "one sub-five-minute case",
    "其他／唔肯定",
    "其他珠江三角洲粵語",
    "多個地區／其他",
    "adding sentence-final",
    "app/軟件",
    "學習/溫習",
    "水果",
    "free咗/吉",
    "擔／攞遮",
}


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


def parse_int(value: str, label: str) -> int:
    try:
        parsed = int(value)
    except (TypeError, ValueError):
        fail(f"invalid integer for {label}: {value!r}")
    return parsed


def parse_number(value: str, label: str) -> float:
    try:
        parsed = float(value)
    except (TypeError, ValueError):
        fail(f"invalid number for {label}: {value!r}")
    if not math.isfinite(parsed):
        fail(f"non-finite number for {label}: {value!r}")
    return parsed


def verify_public_file_manifest(root: Path, manifest: dict[str, Any]) -> int:
    package = root / PACKAGE_RELATIVE
    actual_names = {path.name for path in package.iterdir() if path.is_file()}
    if actual_names != EXPECTED_PACKAGE_FILES:
        fail(
            "unexpected public package file set: "
            f"missing={sorted(EXPECTED_PACKAGE_FILES - actual_names)} "
            f"extra={sorted(actual_names - EXPECTED_PACKAGE_FILES)}"
        )

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
        fail("manifest public file set does not match disclosure-controlled package")

    for name, record in by_path.items():
        data = read_bytes(root, PACKAGE_RELATIVE / name)
        if record.get("bytes") != len(data):
            fail(f"public byte-count drift: {name}")
        if record.get("sha256") != sha256_hex(data):
            fail(f"public SHA-256 drift: {name}")
    return len(by_path)


def verify_manifest_policy(manifest: dict[str, Any]) -> None:
    expected_top = {
        "schema": "canto-span-native-panel-interim-export-v2",
        "instrument_id": "YUE-JUDGMENT-PILOT-01",
        "instrument_version": "0.1.0-pilot",
        "snapshot_kind": "interim_disclosure_controlled_aggregate",
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

    list_counts = manifest.get("counterbalanced_list_counts") or {}
    if list_counts != {"LIST_A": 9, "LIST_B": 11, "LIST_C": 8, "LIST_D": 8}:
        fail("counterbalanced-list counts changed")
    if sum(list_counts.values()) != screening["provisionally_retained_for_interim_description"]:
        fail("counterbalanced-list total does not match provisional subset")

    disclosure = manifest.get("disclosure_control") or {}
    required_disclosure = {
        "policy_file": "PUBLIC-DISCLOSURE-POLICY.md",
        "minimum_sensitive_cell_size": 5,
        "minimum_statistical_summary_denominator": 8,
        "complementary_suppression_required": True,
        "linked_table_review_required": True,
        "participant_characteristics_public": False,
        "cross_tabs_public": False,
        "completion_time_extremes_public": False,
        "exact_rating_category_counts_public": False,
        "correction_counts_public": False,
        "fixed_choice_interpretation_counts_public": False,
        "participant_derived_qualitative_themes_public": False,
        "qualitative_theme_minimum_support": 5,
    }
    if disclosure != required_disclosure:
        fail("public disclosure-control policy metadata changed")

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


def verify_condition_csv(root: Path, manifest: dict[str, Any]) -> list[dict[str, str]]:
    rows = read_csv(root, PACKAGE_RELATIVE / "condition-statistics.csv", CONDITION_FIELDS)
    if len(rows) != 20:
        fail(f"condition row count changed: {len(rows)}")
    seen: set[tuple[str, str]] = set()
    for row in rows:
        key = (row["group"], row["condition"])
        if key in seen:
            fail(f"duplicate condition row: {key}")
        seen.add(key)
        if parse_int(row["n"], f"condition {key} n") != 36:
            fail(f"condition denominator changed: {key}")
        mean = parse_number(row["mean"], f"condition {key} mean")
        sd = parse_number(row["sd"], f"condition {key} sd")
        median = parse_number(row["median"], f"condition {key} median")
        if not 1 <= mean <= 5 or sd < 0 or not 1 <= median <= 5:
            fail(f"condition statistic outside rating scale: {key}")
    if seen != {(f"G0{group}", condition) for group in range(1, 6) for condition in "ABCD"}:
        fail("condition matrix is incomplete")
    validation = manifest.get("public_validation") or {}
    if validation.get("condition_statistics_rows") != len(rows):
        fail("manifest condition row count drift")
    if validation.get("condition_denominator") != 36:
        fail("manifest condition denominator drift")
    return rows


def verify_item_csv(root: Path, manifest: dict[str, Any]) -> list[dict[str, str]]:
    rows = read_csv(root, PACKAGE_RELATIVE / "item-statistics.csv", ITEM_FIELDS)
    if len(rows) != 92:
        fail(f"item row count changed: {len(rows)}")
    ids = [row["item_id"] for row in rows]
    if len(ids) != len(set(ids)):
        fail("duplicate public item ID")
    denominators = []
    for row in rows:
        n = parse_int(row["n"], f"item {row['item_id']} n")
        denominators.append(n)
        if n < 8:
            fail(f"item denominator below public threshold: {row['item_id']} n={n}")
        mean = parse_number(row["mean"], f"item {row['item_id']} mean")
        sd = parse_number(row["sd"], f"item {row['item_id']} sd")
        median = parse_number(row["median"], f"item {row['item_id']} median")
        if not 1 <= mean <= 5 or sd < 0 or not 1 <= median <= 5:
            fail(f"item statistic outside rating scale: {row['item_id']}")
    counts = Counter(denominators)
    if sum(count for n, count in counts.items() if 8 <= n <= 11) != 80:
        fail(f"expected 80 counterbalanced experimental items with n=8..11: {dict(counts)}")
    if counts[36] != 12:
        fail(f"expected 12 pooled filler/control items with n=36: {dict(counts)}")
    if any(n not in {8, 9, 11, 36} for n in denominators):
        fail(f"unexpected item denominator: {sorted(set(denominators))}")
    validation = manifest.get("public_validation") or {}
    if validation.get("item_statistics_rows") != len(rows):
        fail("manifest item row count drift")
    if validation.get("item_denominator_min") != min(denominators):
        fail("manifest minimum item denominator drift")
    if validation.get("item_denominator_max") != max(denominators):
        fail("manifest maximum item denominator drift")
    return rows


def verify_theme_csv(root: Path, manifest: dict[str, Any]) -> list[dict[str, str]]:
    rows = read_csv(
        root,
        PACKAGE_RELATIVE / "qualitative-theme-disposition.csv",
        THEME_FIELDS,
    )
    if len(rows) != 4:
        fail(f"qualitative disposition row count changed: {len(rows)}")
    for row in rows:
        if parse_int(row["minimum_public_support"], row["theme_id"]) != 5:
            fail(f"qualitative public threshold changed: {row['theme_id']}")
        if row["public_support_count"].strip():
            fail(f"unaudited qualitative support count became public: {row['theme_id']}")
        if row["adjudication_status"] != "not_audited_private_source_required":
            fail(f"qualitative adjudication status changed: {row['theme_id']}")
        if row["public_disposition"] != "withheld":
            fail(f"unaudited qualitative theme became public: {row['theme_id']}")
    validation = manifest.get("public_validation") or {}
    if validation.get("qualitative_theme_disposition_rows") != len(rows):
        fail("manifest qualitative disposition row count drift")
    return rows


def verify_prose(root: Path) -> None:
    prose_paths = [
        PACKAGE_RELATIVE / "README.md",
        PACKAGE_RELATIVE / "PUBLIC-DISCLOSURE-POLICY.md",
        PACKAGE_RELATIVE / "OFFLINE-REPRODUCIBILITY.md",
        PACKAGE_RELATIVE / "pilot-analysis-report.md",
    ]
    text_by_path = {
        str(path): read_bytes(root, path).decode("utf-8") for path in prose_paths
    }
    combined = "\n".join(text_by_path.values())
    for phrase in PROHIBITED_PROSE:
        if phrase in combined:
            fail(f"prohibited or superseded public prose remains: {phrase}")

    required = {
        "README.md": [
            "disclosure-controlled aggregate snapshot",
            "provisionally retained for interim description",
            "interpretation-statistics.csv` was withdrawn",
        ],
        "PUBLIC-DISCLOSURE-POLICY.md": [
            "minimum cell size",
            "Complementary suppression",
            "Linked-table review",
            "at least **5**",
        ],
        "OFFLINE-REPRODUCIBILITY.md": [
            "cannot currently reproduce",
            "original source-to-aggregate analysis script",
            "No script or environment digest is invented",
        ],
        "pilot-analysis-report.md": [
            "Provisional analytic subset",
            "80 counterbalanced experimental-item denominators",
            "12 pooled filler/control denominators",
            "Analyst hypotheses, not adjudicated findings",
        ],
    }
    for name, phrases in required.items():
        text = text_by_path[str(PACKAGE_RELATIVE / name)]
        for phrase in phrases:
            if phrase not in text:
                fail(f"required disclosure statement missing from {name}: {phrase}")


def verify_private_files_absent(root: Path, manifest: dict[str, Any]) -> int:
    records = manifest.get("private_source_files")
    if not isinstance(records, list) or len(records) != 5:
        fail("private source provenance records changed")
    private_names = set()
    for record in records:
        if not isinstance(record, dict) or not isinstance(record.get("filename"), str):
            fail("invalid private source provenance record")
        if record.get("committed_to_public_repository") is not False:
            fail(f"private source marked public: {record.get('filename')}")
        private_names.add(record["filename"])
    found = []
    for path in root.rglob("*"):
        if path.is_file() and path.name in private_names:
            found.append(str(path.relative_to(root)))
    if found:
        fail(f"private source file committed: {found}")
    return len(private_names)


def verify_lifecycle(root: Path, manifest: dict[str, Any]) -> None:
    state = load_json(root, PANEL_STATE_RELATIVE)
    metadata = load_json(root, FOLLOWUP_METADATA_RELATIVE)
    lifecycle = state.get("instrument_lifecycle") or {}
    pilots = lifecycle.get("pilot_collections")
    if not isinstance(pilots, list) or len(pilots) != 1:
        fail("current canonical lifecycle lacks exactly one pilot")
    pilot = pilots[0]
    audit = lifecycle.get("item_level_audit") or {}
    followup = lifecycle.get("followup_instrument") or {}
    if pilot.get("instrument_id") != manifest.get("instrument_id"):
        fail("snapshot instrument does not match current canonical pilot")
    if pilot.get("collection_state") != manifest.get("collection_state"):
        fail("snapshot collection state conflicts with current canonical pilot")
    if audit.get("state") != manifest.get("item_level_audit_state"):
        fail("snapshot audit state conflicts with current canonical audit")
    if followup.get("lifecycle_state") != "draft" or followup.get("deployment_allowed") is not False:
        fail("current follow-up is not draft and non-deployable")
    if metadata.get("lifecycle_state") != "draft" or metadata.get("deployment_allowed") is not False:
        fail("follow-up metadata is not draft and non-deployable")


def verify(root: Path = DEFAULT_ROOT) -> dict[str, Any]:
    root = root.resolve()
    manifest = load_json(root, MANIFEST_RELATIVE)
    verify_manifest_policy(manifest)
    public_file_count = verify_public_file_manifest(root, manifest)
    condition_rows = verify_condition_csv(root, manifest)
    item_rows = verify_item_csv(root, manifest)
    theme_rows = verify_theme_csv(root, manifest)
    verify_prose(root)
    private_source_count = verify_private_files_absent(root, manifest)
    verify_lifecycle(root, manifest)

    if (root / PACKAGE_RELATIVE / "interpretation-statistics.csv").exists():
        fail("withdrawn interpretation-statistics.csv is public")
    validation = manifest.get("public_validation") or {}
    if validation.get("interpretation_statistics_withdrawn") is not True:
        fail("manifest does not record interpretation-table withdrawal")
    if validation.get("aggregate_files_utf8") is not True:
        fail("manifest does not require UTF-8 public aggregates")

    return {
        "schema": "canto-span-interim-pilot-public-package-verification-v1",
        "instrument_id": manifest["instrument_id"],
        "snapshot_state": manifest["snapshot_state"],
        "analytic_subset_status": manifest["analytic_subset_status"],
        "public_files": public_file_count,
        "condition_rows": len(condition_rows),
        "item_rows": len(item_rows),
        "qualitative_disposition_rows": len(theme_rows),
        "private_source_provenance_records": private_source_count,
        "minimum_sensitive_cell_size": manifest["disclosure_control"]["minimum_sensitive_cell_size"],
        "minimum_statistical_summary_denominator": manifest["disclosure_control"]["minimum_statistical_summary_denominator"],
        "source_to_aggregate_reproducibility": manifest["source_to_aggregate_reproducibility"]["status"],
        "collection_state": manifest["collection_state"],
        "item_level_audit_state": manifest["item_level_audit_state"],
        "status": "PASS",
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=DEFAULT_ROOT)
    args = parser.parse_args()
    result = verify(args.root)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (AssertionError, KeyError, TypeError, ValueError, json.JSONDecodeError) as error:
        print(f"Interim pilot public-package verification failed: {error}", file=sys.stderr)
        raise SystemExit(1)
