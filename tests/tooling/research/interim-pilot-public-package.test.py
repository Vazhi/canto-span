#!/usr/bin/env python3
"""Mutation tests for the disclosure-controlled interim pilot package."""

from __future__ import annotations

import csv
import hashlib
import importlib.util
import json
import shutil
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
VERIFIER_PATH = ROOT / "tools/verify-interim-pilot-public-package.py"
SPEC = importlib.util.spec_from_file_location("interim_pilot_verifier", VERIFIER_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("unable to load interim pilot verifier")
VERIFIER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VERIFIER)

COPY_PATHS = [
    VERIFIER.PACKAGE_RELATIVE,
    VERIFIER.PANEL_STATE_RELATIVE,
    VERIFIER.FOLLOWUP_METADATA_RELATIVE,
]


def write_json(path: Path, value: object) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


class InterimPilotPublicPackageTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        for relative in COPY_PATHS:
            source = ROOT / relative
            target = self.root / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            if source.is_dir():
                shutil.copytree(source, target, dirs_exist_ok=True)
            else:
                shutil.copyfile(source, target)

    def tearDown(self) -> None:
        self.temp.cleanup()

    @property
    def package(self) -> Path:
        return self.root / VERIFIER.PACKAGE_RELATIVE

    @property
    def manifest_path(self) -> Path:
        return self.root / VERIFIER.MANIFEST_RELATIVE

    def refresh_public_record(self, name: str) -> None:
        manifest = json.loads(self.manifest_path.read_text(encoding="utf-8"))
        data = (self.package / name).read_bytes()
        record = next(row for row in manifest["public_package_files"] if row["path"] == name)
        record["bytes"] = len(data)
        record["sha256"] = hashlib.sha256(data).hexdigest()
        if name.endswith(".csv"):
            with (self.package / name).open("r", encoding="utf-8", newline="") as handle:
                record["data_rows"] = sum(1 for _ in csv.DictReader(handle))
        write_json(self.manifest_path, manifest)

    def test_current_public_package_passes(self) -> None:
        result = VERIFIER.verify(self.root)
        self.assertEqual(result["status"], "PASS")
        self.assertEqual(result["public_files"], 7)
        self.assertEqual(result["item_rows"], 92)
        self.assertEqual(result["collection_state"], "active")
        self.assertEqual(result["item_level_audit_state"], "not_started")

    def test_public_hash_drift_fails(self) -> None:
        path = self.package / "README.md"
        path.write_text(path.read_text(encoding="utf-8") + "\n", encoding="utf-8")
        with self.assertRaisesRegex(AssertionError, "public byte-count drift|public SHA-256 drift"):
            VERIFIER.verify(self.root)

    def test_final_eligibility_language_cannot_return(self) -> None:
        path = self.package / "pilot-analysis-report.md"
        path.write_text(
            path.read_text(encoding="utf-8") + "\nEligible completed sample\n",
            encoding="utf-8",
        )
        self.refresh_public_record("pilot-analysis-report.md")
        with self.assertRaisesRegex(AssertionError, "prohibited or superseded public prose"):
            VERIFIER.verify(self.root)

    def test_item_denominator_below_threshold_fails(self) -> None:
        path = self.package / "item-statistics.csv"
        with path.open("r", encoding="utf-8", newline="") as handle:
            reader = csv.DictReader(handle)
            fields = list(reader.fieldnames or [])
            rows = list(reader)
        rows[0]["n"] = "4"
        with path.open("w", encoding="utf-8", newline="") as handle:
            writer = csv.DictWriter(handle, fieldnames=fields, lineterminator="\n")
            writer.writeheader()
            writer.writerows(rows)
        self.refresh_public_record("item-statistics.csv")
        with self.assertRaisesRegex(AssertionError, "item denominator below public threshold"):
            VERIFIER.verify(self.root)

    def test_exact_rating_or_correction_columns_cannot_return(self) -> None:
        path = self.package / "item-statistics.csv"
        with path.open("r", encoding="utf-8", newline="") as handle:
            reader = csv.DictReader(handle)
            fields = list(reader.fieldnames or []) + ["correction_count"]
            rows = list(reader)
        for row in rows:
            row["correction_count"] = "0"
        with path.open("w", encoding="utf-8", newline="") as handle:
            writer = csv.DictWriter(handle, fieldnames=fields, lineterminator="\n")
            writer.writeheader()
            writer.writerows(rows)
        self.refresh_public_record("item-statistics.csv")
        with self.assertRaisesRegex(AssertionError, "unexpected CSV schema"):
            VERIFIER.verify(self.root)

    def test_withdrawn_interpretation_table_cannot_return(self) -> None:
        (self.package / "interpretation-statistics.csv").write_text(
            "item_id,n,interpretation,count,percent\nX,8,rare,1,12.5\n",
            encoding="utf-8",
        )
        with self.assertRaisesRegex(AssertionError, "unexpected public package file set"):
            VERIFIER.verify(self.root)

    def test_unaudited_qualitative_support_cannot_be_published(self) -> None:
        path = self.package / "qualitative-theme-disposition.csv"
        with path.open("r", encoding="utf-8", newline="") as handle:
            reader = csv.DictReader(handle)
            fields = list(reader.fieldnames or [])
            rows = list(reader)
        rows[0]["public_support_count"] = "1"
        rows[0]["public_disposition"] = "public"
        with path.open("w", encoding="utf-8", newline="") as handle:
            writer = csv.DictWriter(handle, fieldnames=fields, lineterminator="\n")
            writer.writeheader()
            writer.writerows(rows)
        self.refresh_public_record("qualitative-theme-disposition.csv")
        with self.assertRaisesRegex(AssertionError, "unaudited qualitative support count"):
            VERIFIER.verify(self.root)

    def test_snapshot_lifecycle_conflict_fails(self) -> None:
        path = self.root / VERIFIER.PANEL_STATE_RELATIVE
        state = json.loads(path.read_text(encoding="utf-8"))
        state["instrument_lifecycle"]["pilot_collections"][0]["collection_state"] = "closed"
        state["instrument_lifecycle"]["pilot_collections"][0]["compatibility_status"] = "collection_closed"
        write_json(path, state)
        with self.assertRaisesRegex(AssertionError, "snapshot collection state conflicts"):
            VERIFIER.verify(self.root)


if __name__ == "__main__":
    unittest.main()
