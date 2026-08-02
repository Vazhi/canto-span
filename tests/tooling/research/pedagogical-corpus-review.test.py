#!/usr/bin/env python3
"""Focused mutation tests for completed pedagogical corpus reviews."""

from __future__ import annotations

import hashlib
import importlib.util
import json
import shutil
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
VERIFIER_PATH = ROOT / "tools/verify-pedagogical-corpus-review.py"
SPEC = importlib.util.spec_from_file_location("pedagogical_review_verifier", VERIFIER_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("unable to load pedagogical corpus review verifier")
VERIFIER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VERIFIER)

WEEK14 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W14-20260621")
WEEK15 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W15-20260628")
REGISTERED = {
    WEEK14: {"records": 61, "discrepancies": 6, "exact": 5},
    WEEK15: {"records": 65, "discrepancies": 4, "exact": 10},
}


def write_json(path: Path, value: object) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


class RegisteredPedagogicalCorpusReviewTest(unittest.TestCase):
    def test_completed_registered_packages_pass(self) -> None:
        for package, expected in REGISTERED.items():
            with self.subTest(package=str(package)):
                result = VERIFIER.verify(ROOT, package, check_deterministic_crossref=False)
                self.assertEqual(result["status"], "PASS")
                self.assertEqual(result["records"], expected["records"])
                self.assertEqual(result["reviewed"], expected["records"])
                self.assertEqual(result["unreviewed"], 0)
                self.assertEqual(result["source_discrepancies"], expected["discrepancies"])
                self.assertEqual(
                    result["duplicate_status_counts"]["accepted_exact_duplicate"],
                    expected["exact"],
                )
                self.assertEqual(result["reviewed_replacements"], 0)

    def test_week15_terminal_projection(self) -> None:
        review = json.loads((ROOT / WEEK15 / "review.json").read_text(encoding="utf-8"))
        self.assertEqual(
            review["summary"]["terminal_classification_counts"],
            {
                "exact_duplicate": 10,
                "lexical_only_attestation": 29,
                "naturalness_review_candidate": 1,
                "new_corpus_attestation": 21,
                "pronunciation_discrepancy": 1,
                "translation_discrepancy": 2,
                "unusable": 1,
            },
        )

    def test_week15_incomplete_final_phonics_row_is_preserved_and_unusable(self) -> None:
        source = json.loads((ROOT / WEEK15 / "source.json").read_text(encoding="utf-8"))
        review = json.loads((ROOT / WEEK15 / "review.json").read_text(encoding="utf-8"))
        source_row = next(row for row in source["items"] if row["id"].endswith("I065"))
        review_row = next(row for row in review["records"] if row["id"].endswith("I065"))
        self.assertEqual(
            source_row["source"],
            {
                "ipa": "— vs /pʰɪŋ˨˩/",
                "wordA": "—",
                "wordB": "平",
                "jyutpingA": "—",
                "jyutpingB": "ping4",
                "glossA": "—",
                "glossB": "cheap; flat",
            },
        )
        self.assertEqual(review_row["terminal_ingress_classification"], "unusable")
        self.assertEqual(review_row["reviewed_values"]["phonics_pair"], None)
        self.assertEqual(review_row["source_discrepancies"][0]["status"], "source_incomplete")


class PedagogicalCorpusReviewMutationTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        shutil.copytree(ROOT / WEEK14, self.root / WEEK14, dirs_exist_ok=True)
        lock_target = self.root / VERIFIER.SOURCE_LOCKS_RELATIVE
        lock_target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / VERIFIER.SOURCE_LOCKS_RELATIVE, lock_target)

    def tearDown(self) -> None:
        self.temp.cleanup()

    @property
    def package(self) -> Path:
        return self.root / WEEK14

    def verify(self):
        return VERIFIER.verify(self.root, WEEK14, check_deterministic_crossref=False)

    def test_external_source_lock_rejects_coordinated_local_source_edit(self) -> None:
        source_path = self.package / "source.json"
        source = json.loads(source_path.read_text(encoding="utf-8"))
        source["items"][0]["source"]["traditional"] = "被改動嘅來源"
        write_json(source_path, source)

        integrity_path = self.package / "package-integrity-r1.json"
        integrity = json.loads(integrity_path.read_text(encoding="utf-8"))
        data = source_path.read_bytes()
        record = next(row for row in integrity["immutable_files"] if row["path"] == "source.json")
        record["bytes"] = len(data)
        record["sha256"] = hashlib.sha256(data).hexdigest()
        record["git_blob_sha"] = VERIFIER.git_blob_sha(data)
        write_json(integrity_path, integrity)

        with self.assertRaisesRegex(AssertionError, "external source lock .* drift"):
            self.verify()

    def test_unreviewed_record_fails(self) -> None:
        path = self.package / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        review["records"][0]["review_status"] = "unreviewed"
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "review remains incomplete"):
            self.verify()

    def test_unsupported_terminal_classification_fails(self) -> None:
        path = self.package / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        review["records"][1]["terminal_ingress_classification"] = "construction_candidate"
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "invalid terminal classification"):
            self.verify()

    def test_fabricated_duplicate_target_fails(self) -> None:
        path = self.package / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        row = next(record for record in review["records"] if record["terminal_ingress_classification"] == "exact_duplicate")
        row["accepted_duplicate_targets"][0]["path"] = "data/invented-owner.json"
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "accepted duplicate target is not evidence-backed"):
            self.verify()

    def test_unrecorded_reviewed_replacement_fails_summary(self) -> None:
        path = self.package / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        review["records"][0]["reviewed_values"]["jyutping"] = "replacement-not-authorized"
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "reviewed replacement summary mismatch"):
            self.verify()

    def test_review_id_or_count_drift_fails(self) -> None:
        path = self.package / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        review["records"].pop()
        review["record_count"] -= 1
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "record count projection mismatch|IDs/order do not match source"):
            self.verify()

    def test_mechanical_packet_cannot_contain_expert_decisions(self) -> None:
        path = self.package / "mechanical-cross-reference-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["records"][0]["expert_duplicate_status"] = "accepted_exact_duplicate"
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "mechanical packet contains expert decisions"):
            self.verify()

    def test_exact_duplicate_requires_target(self) -> None:
        path = self.package / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        row = next(record for record in review["records"] if record["terminal_ingress_classification"] == "exact_duplicate")
        row["accepted_duplicate_targets"] = []
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "exact duplicate lacks accepted target"):
            self.verify()


if __name__ == "__main__":
    unittest.main()
