#!/usr/bin/env python3
"""Mutation tests for the interim public pilot disclosure verifier."""

from __future__ import annotations

import csv
import hashlib
import importlib.util
import io
import json
import shutil
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
VERIFIER_PATH = ROOT / "tools/verify-interim-pilot-public-package.py"
SPEC = importlib.util.spec_from_file_location("interim_public_verifier", VERIFIER_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("unable to load interim public verifier")
VERIFIER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VERIFIER)


class InterimPilotPublicPackageTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        package_source = ROOT / VERIFIER.PACKAGE_RELATIVE
        package_target = self.root / VERIFIER.PACKAGE_RELATIVE
        package_target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copytree(package_source, package_target)

        panel_path = self.root / VERIFIER.PANEL_STATE_RELATIVE
        panel_path.parent.mkdir(parents=True, exist_ok=True)
        panel_path.write_text(
            json.dumps(
                {
                    "instrument_lifecycle": {
                        "pilot_collections": [
                            {
                                "instrument_id": "YUE-JUDGMENT-PILOT-01",
                                "collection_state": "active",
                            }
                        ],
                        "item_level_audit": {
                            "pilot_instrument_id": "YUE-JUDGMENT-PILOT-01",
                            "state": "not_started",
                        },
                        "followup_instrument": {
                            "lifecycle_state": "draft",
                            "deployment_allowed": False,
                        },
                    }
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )
        followup_path = self.root / VERIFIER.FOLLOWUP_METADATA_RELATIVE
        followup_path.parent.mkdir(parents=True, exist_ok=True)
        followup_path.write_text(
            json.dumps(
                {
                    "lifecycle_state": "draft",
                    "deployment_allowed": False,
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )

    def tearDown(self) -> None:
        self.temp.cleanup()

    def package_path(self, name: str) -> Path:
        return self.root / VERIFIER.PACKAGE_RELATIVE / name

    def load_manifest(self) -> dict:
        return json.loads(self.package_path("manifest.json").read_text(encoding="utf-8"))

    def write_manifest(self, manifest: dict) -> None:
        self.package_path("manifest.json").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    def refresh_public_record(self, name: str) -> None:
        manifest = self.load_manifest()
        data = self.package_path(name).read_bytes()
        record = next(row for row in manifest["public_package_files"] if row["path"] == name)
        record["bytes"] = len(data)
        record["sha256"] = hashlib.sha256(data).hexdigest()
        self.write_manifest(manifest)

    def rewrite_csv(self, name: str, fields: list[str], rows: list[dict[str, str]]) -> None:
        buffer = io.StringIO(newline="")
        writer = csv.DictWriter(buffer, fieldnames=fields, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)
        self.package_path(name).write_text(buffer.getvalue(), encoding="utf-8")
        self.refresh_public_record(name)

    def test_current_package_passes(self) -> None:
        result = VERIFIER.verify(self.root)
        self.assertEqual(result["status"], "PASS")
        self.assertEqual(result["public_files"], 7)
        self.assertEqual(result["linked_condition_item_pairs_reviewed"], 80)
        self.assertEqual(result["minimum_compatible_rating_histograms"], 19151)

    def test_public_hash_drift_fails(self) -> None:
        path = self.package_path("README.md")
        path.write_text(path.read_text(encoding="utf-8") + "\n", encoding="utf-8")
        with self.assertRaisesRegex(AssertionError, "byte-count drift"):
            VERIFIER.verify(self.root)

    def test_final_eligibility_language_fails(self) -> None:
        manifest = self.load_manifest()
        manifest["analytic_subset_status"] = "final_eligible_panel_evidence"
        self.write_manifest(manifest)
        with self.assertRaisesRegex(AssertionError, "analytic_subset_status drift"):
            VERIFIER.verify(self.root)

    def test_historical_exact_result_file_reintroduction_fails(self) -> None:
        self.package_path("item-statistics.csv").write_text("item_id,n,mean\nX,8,1.0\n", encoding="utf-8")
        with self.assertRaisesRegex(AssertionError, "unexpected public package file set"):
            VERIFIER.verify(self.root)

    def test_item_numeric_result_column_fails(self) -> None:
        path = self.package_path("item-publication-status.csv")
        rows = list(csv.DictReader(path.read_text(encoding="utf-8").splitlines()))
        for row in rows:
            row["mean"] = "1.0"
        self.rewrite_csv(
            "item-publication-status.csv",
            ["item_id", "publication_status", "reason", "mean"],
            rows,
        )
        with self.assertRaisesRegex(AssertionError, "unexpected CSV schema"):
            VERIFIER.verify(self.root)

    def test_unsupported_condition_signal_fails(self) -> None:
        path = self.package_path("condition-summary-bands.csv")
        rows = list(csv.DictReader(path.read_text(encoding="utf-8").splitlines()))
        rows[0]["interim_signal"] = "exactly_natural"
        self.rewrite_csv("condition-summary-bands.csv", VERIFIER.CONDITION_FIELDS, rows)
        with self.assertRaisesRegex(AssertionError, "unsupported condition signal"):
            VERIFIER.verify(self.root)

    def test_all_public_bands_are_noninvertible(self) -> None:
        counts = {
            signal: VERIFIER.compatible_histogram_count(signal)
            for signal in VERIFIER.EXPECTED_SIGNALS
        }
        self.assertGreaterEqual(min(counts.values()), VERIFIER.MINIMUM_COMPATIBLE_HISTOGRAMS)
        self.assertEqual(counts["more_natural_side"], 19151)
        self.assertEqual(counts["mixed_or_context_sensitive"], 51900)
        self.assertEqual(counts["more_unnatural_side"], 20339)

    def test_missing_condition_row_breaks_linked_table_review(self) -> None:
        path = self.package_path("condition-summary-bands.csv")
        rows = list(csv.DictReader(path.read_text(encoding="utf-8").splitlines()))
        rows = rows[1:]
        self.rewrite_csv("condition-summary-bands.csv", VERIFIER.CONDITION_FIELDS, rows)
        with self.assertRaisesRegex(AssertionError, "condition row count changed"):
            VERIFIER.verify(self.root)

    def test_item_result_must_remain_withheld(self) -> None:
        path = self.package_path("item-publication-status.csv")
        rows = list(csv.DictReader(path.read_text(encoding="utf-8").splitlines()))
        rows[0]["publication_status"] = "published"
        self.rewrite_csv("item-publication-status.csv", VERIFIER.ITEM_FIELDS, rows)
        with self.assertRaisesRegex(AssertionError, "item result became public"):
            VERIFIER.verify(self.root)

    def test_unaudited_qualitative_support_count_fails(self) -> None:
        path = self.package_path("qualitative-theme-disposition.csv")
        rows = list(csv.DictReader(path.read_text(encoding="utf-8").splitlines()))
        rows[0]["public_support_count"] = "5"
        self.rewrite_csv("qualitative-theme-disposition.csv", VERIFIER.THEME_FIELDS, rows)
        with self.assertRaisesRegex(AssertionError, "support count became public"):
            VERIFIER.verify(self.root)

    def test_lifecycle_contradiction_fails(self) -> None:
        panel_path = self.root / VERIFIER.PANEL_STATE_RELATIVE
        panel = json.loads(panel_path.read_text(encoding="utf-8"))
        panel["instrument_lifecycle"]["pilot_collections"][0]["collection_state"] = "closed"
        panel_path.write_text(json.dumps(panel, indent=2) + "\n", encoding="utf-8")
        with self.assertRaisesRegex(AssertionError, "contradicts active pilot"):
            VERIFIER.verify(self.root)

    def test_renamed_private_content_is_detected_by_hash(self) -> None:
        payload = b"synthetic private source bytes"
        renamed = self.root / "docs" / "innocent-name.bin"
        renamed.parent.mkdir(parents=True, exist_ok=True)
        renamed.write_bytes(payload)
        digest = hashlib.sha256(payload).hexdigest()
        with self.assertRaisesRegex(AssertionError, "innocent-name.bin"):
            VERIFIER.verify_private_source_absence(self.root, {digest})

    def test_private_source_provenance_hash_cannot_be_rewritten(self) -> None:
        manifest = self.load_manifest()
        manifest["private_source_files"][0]["sha256"] = "0" * 64
        self.write_manifest(manifest)
        with self.assertRaisesRegex(AssertionError, "private-source provenance records changed"):
            VERIFIER.verify(self.root)


if __name__ == "__main__":
    unittest.main()
