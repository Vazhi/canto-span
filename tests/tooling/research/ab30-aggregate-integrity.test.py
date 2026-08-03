#!/usr/bin/env python3
"""Focused mutation tests for the AB30 aggregate integrity verifier."""

from __future__ import annotations

import importlib.util
import json
import shutil
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
VERIFIER_PATH = ROOT / "review-packets/corpus-review/AB30/verify-aggregate-corpus-evidence-manifest-r1.py"
SPEC = importlib.util.spec_from_file_location("ab30_aggregate_verifier", VERIFIER_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("unable to load AB30 verifier")
VERIFIER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VERIFIER)

COPY_PATHS = [
    VERIFIER.MANIFEST_RELATIVE,
    VERIFIER.NOTE_RELATIVE,
    Path("review-packets/corpus-review/AB30/review-decisions-r1.json"),
    Path("review-packets/corpus-review/AB30/candidate-ledger.json"),
    Path("review-packets/corpus-review/AB30/hkcancor-zo-r-decisions-r2.json"),
    Path("external-evidence/ab30-hkcancor/hkcancor-ab30-zo-r-candidate-inventory.json"),
    Path("external-evidence/ab30-hkcancor/hkcancor-ab30-zo-r-query-summary.json"),
    Path("review-packets/corpus-review/AB30/hkcancor-zo-m-decisions-r1.json"),
    Path("external-evidence/ab30-hkcancor/hkcancor-ab30-zo-m-candidate-inventory.json"),
    Path("external-evidence/ab30-hkcancor/hkcancor-ab30-zo-m-query-summary.json"),
    Path("external-evidence/cp021b/hkcancor-cp021b-source-manifest.sha256"),
]


def write_json(path: Path, value: object) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


class Ab30AggregateIntegrityTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        for relative in COPY_PATHS:
            source = ROOT / relative
            target = self.root / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(source, target)

    def tearDown(self) -> None:
        self.temp.cleanup()

    def test_current_aggregate_passes(self) -> None:
        result = VERIFIER.verify(self.root)
        self.assertEqual(result["status"], "PASS")
        self.assertEqual(result["candidate_ids"], 232)
        self.assertEqual(result["counts"], VERIFIER.EXPECTED_AGGREGATE)

    def test_count_preserving_decision_swap_fails_byte_binding(self) -> None:
        path = self.root / "review-packets/corpus-review/AB30/review-decisions-r1.json"
        ledger = json.loads(path.read_text(encoding="utf-8"))
        genuine = next(row for row in ledger["decisions"] if row["classification"] == "genuine")
        false_positive = next(row for row in ledger["decisions"] if row["classification"] == "false_positive")
        genuine["classification"], false_positive["classification"] = (
            false_positive["classification"],
            genuine["classification"],
        )
        write_json(path, ledger)
        with self.assertRaisesRegex(AssertionError, "decision ledger Git blob drift"):
            VERIFIER.verify(self.root)

    def test_stale_digest_metadata_fails(self) -> None:
        path = self.root / VERIFIER.MANIFEST_RELATIVE
        manifest = json.loads(path.read_text(encoding="utf-8"))
        manifest["components"][0]["source_inventory_sha256"] = "0" * 64
        write_json(path, manifest)
        with self.assertRaisesRegex(AssertionError, "source inventory SHA-256 drift"):
            VERIFIER.verify(self.root)

    def test_decision_inventory_id_set_drift_fails_after_digest_refresh(self) -> None:
        inventory_path = self.root / "review-packets/corpus-review/AB30/candidate-ledger.json"
        inventory = json.loads(inventory_path.read_text(encoding="utf-8"))
        inventory["candidates"][0]["candidateId"] = "ab30-intentional-id-drift"
        write_json(inventory_path, inventory)
        inventory_data = inventory_path.read_bytes()

        manifest_path = self.root / VERIFIER.MANIFEST_RELATIVE
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        component = manifest["components"][0]
        component["source_inventory_git_blob_sha"] = VERIFIER.git_blob_sha(inventory_data)
        component["source_inventory_sha256"] = VERIFIER.sha256_hex(inventory_data)
        write_json(manifest_path, manifest)

        with self.assertRaisesRegex(AssertionError, "decision/source candidate ID mismatch"):
            VERIFIER.verify(self.root)

    def test_source_manifest_byte_drift_fails(self) -> None:
        path = self.root / "external-evidence/cp021b/hkcancor-cp021b-source-manifest.sha256"
        path.write_bytes(path.read_bytes() + b"\n")
        with self.assertRaisesRegex(AssertionError, "source manifest Git blob drift"):
            VERIFIER.verify(self.root)

    def test_note_projection_drift_fails(self) -> None:
        path = self.root / VERIFIER.NOTE_RELATIVE
        text = path.read_text(encoding="utf-8")
        self.assertIn("corpus_candidate_hit_count: 232", text)
        path.write_text(
            text.replace("corpus_candidate_hit_count: 232", "corpus_candidate_hit_count: 231", 1),
            encoding="utf-8",
        )
        with self.assertRaisesRegex(AssertionError, "note projection mismatch for corpus_candidate_hit_count"):
            VERIFIER.verify(self.root)

    def test_equivalent_note_prose_does_not_fail(self) -> None:
        path = self.root / VERIFIER.NOTE_RELATIVE
        text = path.read_text(encoding="utf-8")
        old = "It references rather than copies these complete decision ledgers:"
        replacement = "The aggregate keeps decision rows in the three component ledgers listed below instead of embedding them:"
        self.assertIn(old, text)
        path.write_text(text.replace(old, replacement, 1), encoding="utf-8")
        self.assertEqual(VERIFIER.verify(self.root)["status"], "PASS")

    def test_missing_component_ledger_reference_in_note_fails(self) -> None:
        path = self.root / VERIFIER.NOTE_RELATIVE
        text = path.read_text(encoding="utf-8")
        ledger = "review-packets/corpus-review/AB30/hkcancor-zo-m-decisions-r1.json"
        self.assertIn(ledger, text)
        path.write_text(text.replace(ledger, "omitted-ledger.json", 1), encoding="utf-8")
        with self.assertRaisesRegex(AssertionError, "lacks component ledger references"):
            VERIFIER.verify(self.root)


if __name__ == "__main__":
    unittest.main()
