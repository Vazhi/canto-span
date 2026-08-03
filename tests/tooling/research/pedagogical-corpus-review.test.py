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
WEEK16 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W16-20260705")
WEEK17 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W17-20260712")
WEEK18 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W18-20260719")
WEEK19 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W19-20260726")
DIALOG002 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-DLG-002-20251207")
DIALOG003 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-DLG-003-20251214")
REGISTERED = {
    WEEK14: {"role_sensitive": 0, "replacements": 0, "records": 61, "discrepancies": 6, "exact": 5, "runtime": 0, "legacy": 0, "implementation": 0, "routes": 0},
    WEEK15: {"role_sensitive": 0, "replacements": 0, "records": 65, "discrepancies": 4, "exact": 10, "runtime": 0, "legacy": 0, "implementation": 0, "routes": 0},
    WEEK16: {"role_sensitive": 0, "replacements": 0, "records": 59, "discrepancies": 11, "exact": 0, "runtime": 35, "legacy": 0, "implementation": 0, "routes": 0},
    WEEK17: {"role_sensitive": 0, "replacements": 0, "records": 75, "discrepancies": 39, "exact": 3, "runtime": 0, "legacy": 75, "implementation": 0, "routes": 0},
    WEEK18: {"records": 99, "discrepancies": 41, "exact": 0, "runtime": 0, "legacy": 0, "implementation": 39, "role_sensitive": 0, "routes": 13, "replacements": 0},
    WEEK19: {"records": 76, "discrepancies": 72, "exact": 0, "runtime": 0, "legacy": 0, "implementation": 0, "role_sensitive": 27, "routes": 12, "replacements": 1},
    DIALOG002: {"records": 72, "discrepancies": 0, "exact": 3, "runtime": 0, "legacy": 0, "implementation": 0, "role_sensitive": 0, "routes": 13, "replacements": 0},
    DIALOG003: {"records": 96, "discrepancies": 0, "exact": 2, "runtime": 0, "legacy": 0, "implementation": 0, "role_sensitive": 0, "routes": 16, "replacements": 0},
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
                    result["duplicate_status_counts"].get("accepted_exact_duplicate", 0),
                    expected["exact"],
                )
                self.assertEqual(result["runtime_crosswalk_records"], expected["runtime"])
                self.assertEqual(result["legacy_reconciliation_records"], expected["legacy"])
                self.assertEqual(result["bounded_implementation_records"], expected["implementation"])
                self.assertEqual(result["role_sensitive_implementation_records"], expected["role_sensitive"])
                self.assertEqual(result["research_followup_routes"], expected["routes"])
                self.assertEqual(result["reviewed_replacements"], expected["replacements"])

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


    def test_week16_terminal_projection(self) -> None:
        review = json.loads((ROOT / WEEK16 / "review.json").read_text(encoding="utf-8"))
        self.assertEqual(
            review["summary"]["terminal_classification_counts"],
            {
                "lexical_only_attestation": 35,
                "naturalness_review_candidate": 4,
                "new_corpus_attestation": 20,
            },
        )
        self.assertEqual(review["summary"]["records_with_runtime_crosswalk"], 35)
        self.assertEqual(review["summary"]["records_with_source_discrepancies"], 11)

    def test_week16_runtime_crosswalk_is_separate_from_duplicate_identity(self) -> None:
        source = json.loads((ROOT / WEEK16 / "source.json").read_text(encoding="utf-8"))
        review = json.loads((ROOT / WEEK16 / "review.json").read_text(encoding="utf-8"))
        runtime = json.loads((ROOT / WEEK16 / "runtime-crosswalk-r1.json").read_text(encoding="utf-8"))
        self.assertEqual(runtime["record_count"], 35)
        self.assertEqual(len(runtime["records"]), 35)
        self.assertTrue(all(row["expert_duplicate_status"] == "no_accepted_duplicate" for row in review["records"]))
        crosswalk_rows = [row for row in review["records"] if row["implementation_crosswalk_targets"]]
        self.assertEqual(len(crosswalk_rows), 35)
        source_by_id = {row["id"]: row for row in source["items"]}
        difference_surfaces = {
            source_by_id[row["id"]]["source"]["traditional"]
            for row in crosswalk_rows
            if row["evidence_use_disposition"] == "lexical_attestation_with_runtime_crosswalk_and_source_difference"
        }
        self.assertEqual(difference_surfaces, {"煮嘢食", "畫畫", "釣魚", "下棋", "行公園"})
        park = next(row for row in review["records"] if row["id"].endswith("I033"))
        self.assertEqual(park["source_discrepancies"][0]["status"], 'source_runtime_component_default_reading_difference')

    def test_week17_legacy_authority_is_not_independent_evidence(self) -> None:
        review = json.loads((ROOT / WEEK17 / "review.json").read_text(encoding="utf-8"))
        legacy = json.loads((ROOT / WEEK17 / "legacy-reconciliation-r1.json").read_text(encoding="utf-8"))
        project_only = json.loads((ROOT / WEEK17 / "project-only-review-r1.json").read_text(encoding="utf-8"))
        self.assertEqual(review["summary"]["review_status_counts"], {"reviewed": 75, "unreviewed": 0})
        self.assertEqual(review["summary"]["project_only_historical_records"], 5)
        self.assertEqual(legacy["summary"]["legacy_pass_cells"], 162)
        self.assertEqual(legacy["summary"]["legacy_promoted_accepted_cells"], 131)
        self.assertTrue(all(row["inherited_authority_status"] == "unverified_project_history" for row in legacy["records"]))
        self.assertTrue(all(row["authority_status"] == "unverified_project_probe" for row in project_only["records"]))

    def test_week17_only_kwut_has_independent_evidence(self) -> None:
        source = json.loads((ROOT / WEEK17 / "source.json").read_text(encoding="utf-8"))
        review = json.loads((ROOT / WEEK17 / "review.json").read_text(encoding="utf-8"))
        evidence = json.loads((ROOT / WEEK17 / "evidence-sources-r1.json").read_text(encoding="utf-8"))
        linked = [row for row in review["records"] if row["independent_evidence_ids"]]
        self.assertEqual([row["id"] for row in linked], ["GLOSSIKA-YUEHK-A1-W17-20260712-I074"])
        self.assertEqual(evidence["decision"]["source_value"], "hyut3|kut3")
        self.assertEqual(evidence["decision"]["reviewed_value"], "hyut3|fut3")
        source_row = next(row for row in source["items"] if row["id"] == "GLOSSIKA-YUEHK-A1-W17-20260712-I074")
        self.assertIn("kut3", json.dumps(source_row, ensure_ascii=False))

    def test_week17_only_source_repeats_are_accepted_duplicates(self) -> None:
        review = json.loads((ROOT / WEEK17 / "review.json").read_text(encoding="utf-8"))
        exact = [row for row in review["records"] if row["terminal_ingress_classification"] == "exact_duplicate"]
        self.assertEqual([row["id"].rsplit("-", 1)[-1] for row in exact], ["I024", "I025", "I026"])
        self.assertTrue(all(row["accepted_duplicate_targets"][0]["path"].endswith("source.json") for row in exact))

    def test_week18_terminal_projection_and_no_duplicate_promotion(self) -> None:
        review = json.loads((ROOT / WEEK18 / "review.json").read_text(encoding="utf-8"))
        self.assertEqual(
            review["summary"]["terminal_classification_counts"],
            {
                "lexical_only_attestation": 63,
                "naturalness_review_candidate": 8,
                "new_corpus_attestation": 27,
                "unusable": 1,
            },
        )
        self.assertTrue(all(row["expert_duplicate_status"] == "no_accepted_duplicate" for row in review["records"]))
        final_mei = next(row for row in review["records"] if row["id"].endswith("I072"))
        self.assertEqual(final_mei["terminal_ingress_classification"], "new_corpus_attestation")

    def test_week18_incomplete_phonics_row_is_preserved_and_unusable(self) -> None:
        source = json.loads((ROOT / WEEK18 / "source.json").read_text(encoding="utf-8"))
        review = json.loads((ROOT / WEEK18 / "review.json").read_text(encoding="utf-8"))
        source_row = next(row for row in source["items"] if row["id"].endswith("I097"))
        review_row = next(row for row in review["records"] if row["id"].endswith("I097"))
        self.assertEqual(source_row["source"]["wordA"], "香")
        self.assertEqual(source_row["source"]["wordB"], "—")
        self.assertEqual(review_row["terminal_ingress_classification"], "unusable")
        self.assertEqual(review_row["reviewed_values"], {})

    def test_week18_implementation_links_exclude_parser_hints(self) -> None:
        packet = json.loads((ROOT / WEEK18 / "implementation-crosswalk-r1.json").read_text(encoding="utf-8"))
        self.assertEqual(packet["target_record_count"], 39)
        self.assertEqual(packet["parser_hint_record_count"], 33)
        for row in packet["records"]:
            target_paths = {target["path"] for target in row["implementation_targets"]}
            self.assertTrue(target_paths.isdisjoint(set(row["parser_owner_hints"])))
            self.assertEqual(row["parser_hint_authority"], "heuristic_search_hint_only")
            self.assertFalse(row["implementation_authorized"])

    def test_week18_all_followups_have_durable_routes(self) -> None:
        packet = json.loads((ROOT / WEEK18 / "research-routing-r1.json").read_text(encoding="utf-8"))
        self.assertEqual(packet["route_count"], 13)
        self.assertEqual({row["id"] for row in packet["routes"]}, {f"W18-F{number:02d}" for number in range(1, 14)})
        self.assertTrue(all(row["route_owner_issue"] == 481 for row in packet["routes"]))
        self.assertTrue(all(row["terminal_route_state"].startswith("open_") for row in packet["routes"]))

    def test_week18_numeral_route_id_defect_is_reconciled(self) -> None:
        packet = json.loads((ROOT / WEEK18 / "research-routing-r1.json").read_text(encoding="utf-8"))
        route = packet["non_candidate_routes"][0]
        self.assertEqual([item.rsplit("-", 1)[-1] for item in route["declared_source_item_ids"]], [f"I{number:03d}" for number in range(61, 71)])
        self.assertEqual([item.rsplit("-", 1)[-1] for item in route["resolved_source_item_ids"]], [f"I{number:03d}" for number in range(62, 72)])
        self.assertEqual(route["declared_id_status"], "source_id_range_off_by_one")


    def test_week19_terminal_projection_and_role_sensitive_counts(self) -> None:
        review = json.loads((ROOT / WEEK19 / "review.json").read_text(encoding="utf-8"))
        role = json.loads((ROOT / WEEK19 / "role-sensitive-crosswalk-r1.json").read_text(encoding="utf-8"))
        self.assertEqual(review["summary"]["terminal_classification_counts"], {
            "lexical_only_attestation": 61,
            "new_corpus_attestation": 9,
            "pronunciation_discrepancy": 1,
            "unusable": 5,
        })
        self.assertEqual(role["summary"]["classifier_exact_rule_records"], 10)
        self.assertEqual(role["summary"]["classifier_rule_gap_records"], 4)
        self.assertEqual(role["summary"]["controlled_specification_candidate_rows"], 9)
        self.assertEqual(role["summary"]["accepted_noun_pair_count"], 0)

    def test_week19_classifier_gaps_are_not_token_coverage(self) -> None:
        packet = json.loads((ROOT / WEEK19 / "role-sensitive-crosswalk-r1.json").read_text(encoding="utf-8"))
        rows = {row["id"].rsplit("-", 1)[-1]: row for row in packet["records"]}
        for item_id in ["I006", "I009", "I013", "I014"]:
            self.assertEqual(rows[item_id]["role_specific_coverage_state"], "classifier_rule_gap")
            self.assertEqual(rows[item_id]["role_specific_targets"], [])
            self.assertTrue(rows[item_id]["orthographic_token_owner_paths"] or item_id == "I006")

    def test_week19_gaa2_source_and_gaa3_review_are_separate(self) -> None:
        source = json.loads((ROOT / WEEK19 / "source.json").read_text(encoding="utf-8"))
        review = json.loads((ROOT / WEEK19 / "review.json").read_text(encoding="utf-8"))
        source_row = next(row for row in source["items"] if row["id"].endswith("I003"))
        review_row = next(row for row in review["records"] if row["id"].endswith("I003"))
        self.assertEqual(source_row["source"]["jyutping"], "gaa2")
        self.assertEqual(review_row["reviewed_values"], {"jyutping": "gaa3"})
        self.assertEqual(review_row["terminal_ingress_classification"], "pronunciation_discrepancy")

    def test_week19_spatial_route_empty_source_list_is_reconciled(self) -> None:
        routing = json.loads((ROOT / WEEK19 / "research-routing-r1.json").read_text(encoding="utf-8"))
        route = next(row for row in routing["routes"] if row["id"] == "W19-F10")
        self.assertEqual(route["declared_source_item_ids"], [])
        self.assertEqual(route["resolved_source_item_ids"], [f"GLOSSIKA-YUEHK-A1-W19-20260726-I{n:03d}" for n in range(26, 49)])
        self.assertEqual(route["declared_id_status"], "empty_source_id_array_reconciled")

    def test_week19_incomplete_tone_rows_remain_unusable(self) -> None:
        source = json.loads((ROOT / WEEK19 / "source.json").read_text(encoding="utf-8"))
        review = json.loads((ROOT / WEEK19 / "review.json").read_text(encoding="utf-8"))
        review_by_id = {row["id"]: row for row in review["records"]}
        for number in range(72, 77):
            item_id = f"GLOSSIKA-YUEHK-A1-W19-20260726-I{number:03d}"
            self.assertTrue(source["items"][number - 1]["source"]["saam"].endswith("—"))
            self.assertEqual(review_by_id[item_id]["terminal_ingress_classification"], "unusable")

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


class Week16RuntimeCrosswalkMutationTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        shutil.copytree(ROOT / WEEK16, self.root / WEEK16, dirs_exist_ok=True)
        lock_target = self.root / VERIFIER.SOURCE_LOCKS_RELATIVE
        lock_target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / VERIFIER.SOURCE_LOCKS_RELATIVE, lock_target)
        provenance = self.root / "docs/research/GLOSSIKA-WEEK16-LEXICON-PROVENANCE.md"
        provenance.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / "docs/research/GLOSSIKA-WEEK16-LEXICON-PROVENANCE.md", provenance)

    def tearDown(self) -> None:
        self.temp.cleanup()

    def verify(self):
        return VERIFIER.verify(self.root, WEEK16, check_deterministic_crossref=False)

    def test_runtime_crosswalk_identity_drift_fails(self) -> None:
        path = self.root / WEEK16 / "runtime-crosswalk-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["runtime_merge_commit"] = "0" * 40
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "implementation identity mismatch"):
            self.verify()

    def test_fabricated_implementation_target_fails(self) -> None:
        path = self.root / WEEK16 / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        row = next(record for record in review["records"] if record["implementation_crosswalk_targets"])
        row["implementation_crosswalk_targets"][0]["path"] = "data/invented-runtime-owner.json"
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "implementation crosswalk target is not evidence-backed"):
            self.verify()

class Week17LegacyAuthorityMutationTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        shutil.copytree(ROOT / WEEK17, self.root / WEEK17, dirs_exist_ok=True)
        lock_target = self.root / VERIFIER.SOURCE_LOCKS_RELATIVE
        lock_target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / VERIFIER.SOURCE_LOCKS_RELATIVE, lock_target)
        legacy = json.loads((ROOT / WEEK17 / "legacy-reconciliation-r1.json").read_text(encoding="utf-8"))
        for row in legacy["legacy_files"]:
            target = self.root / row["path"]
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / row["path"], target)

    def tearDown(self) -> None:
        self.temp.cleanup()

    def verify(self):
        return VERIFIER.verify(self.root, WEEK17, check_deterministic_crossref=False)

    def test_inherited_project_assertion_cannot_self_promote(self) -> None:
        path = self.root / WEEK17 / "legacy-reconciliation-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["records"][0]["inherited_authority_status"] = "independently_verified"
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "elevated without evidence"):
            self.verify()

    def test_kwut_independent_value_is_locked(self) -> None:
        path = self.root / WEEK17 / "evidence-sources-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["decision"]["reviewed_value"] = "hyut3|kut3"
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "pronunciation value drift"):
            self.verify()

    def test_project_only_probe_cannot_authorize_runtime(self) -> None:
        path = self.root / WEEK17 / "project-only-review-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["records"][0]["runtime_or_status_authorization"] = "runtime_acceptance"
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "authorizes runtime or status change"):
            self.verify()


class Week19RoleSensitiveMutationTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        shutil.copytree(ROOT / WEEK19, self.root / WEEK19)
        shutil.copytree(ROOT / "data/research-ledgers", self.root / "data/research-ledgers")
        shutil.copytree(ROOT / "docs/research", self.root / "docs/research")
        shutil.copytree(ROOT / "review-packets/corpus-review/UNIT-WORDS", self.root / "review-packets/corpus-review/UNIT-WORDS")
        shutil.copytree(ROOT / "src", self.root / "src")
        (self.root / "config").mkdir(parents=True)
        shutil.copy2(ROOT / "config/pedagogical-corpus-source-locks.json", self.root / "config/pedagogical-corpus-source-locks.json")
        (self.root / "tools").mkdir(parents=True)
        shutil.copy2(VERIFIER_PATH, self.root / "tools/verify-pedagogical-corpus-review.py")
        shutil.copy2(ROOT / "tools/build-pedagogical-corpus-review-candidates.py", self.root / "tools/build-pedagogical-corpus-review-candidates.py")

    def tearDown(self) -> None:
        self.temp.cleanup()

    def verify_failure(self) -> None:
        with self.assertRaises(AssertionError):
            VERIFIER.verify(self.root, WEEK19, check_deterministic_crossref=False)

    def test_classifier_gap_cannot_be_promoted_from_homographic_token(self) -> None:
        path = self.root / WEEK19 / "role-sensitive-crosswalk-r1.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        row = next(row for row in data["records"] if row["id"].endswith("I009"))
        row["role_specific_coverage_state"] = "exact_classifier_rule_observed"
        row["role_specific_targets"] = [{"path": "src/runtime-resources/lexicon/token-lexicon/referents-and-boundaries.js", "target_type": "role_specific_lexical_resource", "basis": "fabricated"}]
        write_json(path, data)
        self.verify_failure()

    def test_parser_hint_cannot_become_role_target(self) -> None:
        path = self.root / WEEK19 / "role-sensitive-crosswalk-r1.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        row = next(row for row in data["records"] if row["id"].endswith("I063"))
        target_path = row["parser_owner_hints"][0]
        row["role_specific_targets"] = [{"path": target_path, "target_type": "role_specific_grammar_resource", "basis": "fabricated"}]
        write_json(path, data)
        self.verify_failure()

    def test_spatial_route_cannot_return_to_empty_source_set(self) -> None:
        path = self.root / WEEK19 / "research-routing-r1.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        route = next(row for row in data["routes"] if row["id"] == "W19-F10")
        route["resolved_source_item_ids"] = []
        write_json(path, data)
        self.verify_failure()

    def test_gaa3_review_cannot_mutate_source_lock(self) -> None:
        source_path = self.root / WEEK19 / "source.json"
        source = json.loads(source_path.read_text(encoding="utf-8"))
        source["items"][2]["source"]["jyutping"] = "gaa3"
        write_json(source_path, source)
        self.verify_failure()

class Week18ResearchRoutingMutationTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        shutil.copytree(ROOT / WEEK18, self.root / WEEK18, dirs_exist_ok=True)
        lock_target = self.root / VERIFIER.SOURCE_LOCKS_RELATIVE
        lock_target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / VERIFIER.SOURCE_LOCKS_RELATIVE, lock_target)
        routing = json.loads((ROOT / WEEK18 / "research-routing-r1.json").read_text(encoding="utf-8"))
        for row in routing["ledger_files"]:
            target = self.root / row["path"]
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / row["path"], target)
        implementation = json.loads((ROOT / WEEK18 / "implementation-crosswalk-r1.json").read_text(encoding="utf-8"))
        for row in implementation["records"]:
            for target_info in row["implementation_targets"]:
                target = self.root / target_info["path"]
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(ROOT / target_info["path"], target)

    def tearDown(self) -> None:
        self.temp.cleanup()

    def verify(self):
        return VERIFIER.verify(self.root, WEEK18, check_deterministic_crossref=False)

    def test_route_owner_is_required(self) -> None:
        path = self.root / WEEK18 / "research-routing-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["routes"][0]["route_owner_issue"] = 0
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "lacks owner"):
            self.verify()

    def test_numeral_route_cannot_restore_off_by_one_range(self) -> None:
        path = self.root / WEEK18 / "research-routing-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["non_candidate_routes"][0]["resolved_source_item_ids"] = packet["non_candidate_routes"][0]["declared_source_item_ids"]
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "resolved numeral"):
            self.verify()

    def test_parser_hint_cannot_become_authoritative(self) -> None:
        path = self.root / WEEK18 / "implementation-crosswalk-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        row = next(record for record in packet["records"] if record["parser_owner_hints"])
        row["parser_hint_authority"] = "accepted_parser_owner"
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "parser-owner hint elevated"):
            self.verify()

class Dialog002ProjectionTest(unittest.TestCase):
    def test_dialog002_terminal_projection_and_translation_availability(self) -> None:
        source = json.loads((ROOT / DIALOG002 / "source.json").read_text(encoding="utf-8"))
        review = json.loads((ROOT / DIALOG002 / "review.json").read_text(encoding="utf-8"))
        self.assertEqual(review["summary"]["terminal_classification_counts"], {"exact_duplicate":3,"lexical_only_attestation":27,"naturalness_review_candidate":10,"new_corpus_attestation":28,"normalized_duplicate":4})
        turns = [row for row in source["items"] if row["itemType"] == "dialog_turn"]
        review_by_id = {row["id"]: row for row in review["records"]}
        self.assertEqual(len(turns), 38)
        self.assertTrue(all(row["source"]["english"] is None for row in turns))
        self.assertTrue(all(review_by_id[row["id"]]["source_availability"]["english"] == "not_supplied" for row in turns))
        self.assertTrue(all(not review_by_id[row["id"]]["source_discrepancies"] for row in turns))

    def test_dialog002_duplicate_record_owners(self) -> None:
        review = json.loads((ROOT / DIALOG002 / "review.json").read_text(encoding="utf-8"))
        exact = [row["id"].rsplit("-",1)[-1] for row in review["records"] if row["terminal_ingress_classification"] == "exact_duplicate"]
        normalized = [row["id"].rsplit("-",1)[-1] for row in review["records"] if row["terminal_ingress_classification"] == "normalized_duplicate"]
        self.assertEqual(exact, ["I056","I061","I062"])
        self.assertEqual(normalized, ["I060","I063","I066","I070"])
        for row in review["records"]:
            if row["accepted_duplicate_targets"]:
                target = row["accepted_duplicate_targets"][0]
                self.assertTrue(target["path"].endswith("source.json"))
                self.assertTrue(target["record_id"].startswith("GLOSSIKA-"))

    def test_dialog002_source_adjacency_and_aggregate_limitation(self) -> None:
        routing = json.loads((ROOT / DIALOG002 / "dialog-context-routing-r1.json").read_text(encoding="utf-8"))
        self.assertEqual(len(routing["source_adjacency"]), 38)
        self.assertIsNone(routing["source_adjacency"][0]["previous_turn_id"])
        self.assertIsNone(routing["source_adjacency"][-1]["next_turn_id"])
        self.assertEqual(routing["aggregate_adjacency_limitation"]["aggregate_turns_with_null_previous_and_next"], 38)


class Dialog002MutationTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        shutil.copytree(ROOT, self.root, dirs_exist_ok=True)

    def tearDown(self) -> None:
        self.temp.cleanup()

    def verify(self):
        return VERIFIER.verify(self.root, DIALOG002, check_deterministic_crossref=False)

    def test_missing_translation_cannot_become_discrepancy(self) -> None:
        path = self.root / DIALOG002 / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        review["records"][0]["source_discrepancies"] = [{"field":"english","issue":"not supplied","status":"translation_discrepancy"}]
        review["summary"]["records_with_source_discrepancies"] = 1
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "missing English"):
            self.verify()

    def test_aggregate_lock_is_required(self) -> None:
        path = self.root / DIALOG002 / "dialog-context-routing-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["aggregate_map"]["sha256"] = "0" * 64
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "aggregate-map lock drift"):
            self.verify()

    def test_source_adjacency_cannot_be_erased(self) -> None:
        path = self.root / DIALOG002 / "items.tsv"
        lines = path.read_text(encoding="utf-8").splitlines()
        fields = lines[0].split("\t")
        values = lines[2].split("\t")
        values[fields.index("previous_turn_id")] = ""
        lines[2] = "\t".join(values)
        path.write_text("\n".join(lines) + "\n", encoding="utf-8")
        with self.assertRaisesRegex(AssertionError, "adjacency drift"):
            self.verify()

    def test_documentation_occurrence_cannot_be_duplicate_owner(self) -> None:
        path = self.root / DIALOG002 / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        row = next(value for value in review["records"] if value["id"].endswith("I039"))
        row["terminal_ingress_classification"] = "exact_duplicate"
        row["expert_duplicate_status"] = "accepted_exact_duplicate"
        row["accepted_duplicate_targets"] = [{"path":"docs/research/example.md","record_id":"fake","basis":"documentation occurrence"}]
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "not evidence-backed"):
            self.verify()

    def test_naturalness_route_set_is_locked(self) -> None:
        path = self.root / DIALOG002 / "dialog-context-routing-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        route = next(row for row in packet["routes"] if row["route_id"] == "D2-R12")
        route["source_item_ids"] = route["source_item_ids"][:-1]
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "naturalness route|context route projection"):
            self.verify()

    def test_route_owner_is_required(self) -> None:
        path = self.root / DIALOG002 / "dialog-context-routing-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["routes"][0]["owner_issue"] = 0
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "lacks owner"):
            self.verify()

    def test_duplicate_record_identity_is_required(self) -> None:
        path = self.root / DIALOG002 / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        row = next(value for value in review["records"] if value["id"].endswith("I056"))
        row["accepted_duplicate_targets"][0]["record_id"] = "missing"
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "not a record-level candidate"):
            self.verify()

class Dialog003ProjectionTest(unittest.TestCase):
    def test_dialog003_terminal_projection_and_metadata_boundary(self) -> None:
        source = json.loads((ROOT / DIALOG003 / "source.json").read_text(encoding="utf-8"))
        review = json.loads((ROOT / DIALOG003 / "review.json").read_text(encoding="utf-8"))
        routing = json.loads((ROOT / DIALOG003 / "dialog-context-routing-r1.json").read_text(encoding="utf-8"))
        self.assertEqual(review["summary"]["terminal_classification_counts"], {"exact_duplicate":2,"lexical_only_attestation":44,"naturalness_review_candidate":16,"new_corpus_attestation":34})
        turns = [row for row in source["items"] if row["itemType"] == "dialog_turn"]
        self.assertEqual(len(turns), 50)
        self.assertTrue(all(row["source"]["english"] is None for row in turns))
        self.assertFalse(routing["source_metadata_authority"]["accepted_as_linguistic_evidence"])
        self.assertFalse(routing["source_metadata_authority"]["source_confidence_affects_evidence_grade"])
        self.assertTrue(routing["source_metadata_authority"]["cultural_claims_require_independent_verification"])

    def test_dialog003_duplicate_record_owners(self) -> None:
        review = json.loads((ROOT / DIALOG003 / "review.json").read_text(encoding="utf-8"))
        exact = [row["id"].rsplit("-",1)[-1] for row in review["records"] if row["terminal_ingress_classification"] == "exact_duplicate"]
        normalized = [row["id"].rsplit("-",1)[-1] for row in review["records"] if row["terminal_ingress_classification"] == "normalized_duplicate"]
        self.assertEqual(exact, ["I055","I091"])
        self.assertEqual(normalized, [])

    def test_dialog003_source_adjacency_and_aggregate_limitation(self) -> None:
        routing = json.loads((ROOT / DIALOG003 / "dialog-context-routing-r1.json").read_text(encoding="utf-8"))
        self.assertEqual(len(routing["source_adjacency"]), 50)
        self.assertEqual(routing["aggregate_adjacency_limitation"]["aggregate_turns_with_null_previous_and_next"], 50)
        self.assertEqual(len(routing["aggregate_needs_context_ids"]), 5)

class Dialog003MutationTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        shutil.copytree(ROOT, self.root, dirs_exist_ok=True)

    def tearDown(self) -> None:
        self.temp.cleanup()

    def verify(self):
        return VERIFIER.verify(self.root, DIALOG003, check_deterministic_crossref=False)

    def test_source_confidence_cannot_become_evidence(self) -> None:
        path = self.root / DIALOG003 / "dialog-context-routing-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["source_metadata_authority"]["source_confidence_affects_evidence_grade"] = True
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "metadata authority"):
            self.verify()

    def test_aggregate_lock_is_required(self) -> None:
        path = self.root / DIALOG003 / "dialog-context-routing-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["aggregate_map"]["sha256"] = "0" * 64
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "aggregate-map lock drift"):
            self.verify()

    def test_source_adjacency_cannot_be_erased(self) -> None:
        path = self.root / DIALOG003 / "items.tsv"
        lines = path.read_text(encoding="utf-8").splitlines()
        fields = lines[0].split("\t")
        values = lines[2].split("\t")
        values[fields.index("previous_turn_id")] = ""
        lines[2] = "\t".join(values)
        path.write_text("\n".join(lines) + "\n", encoding="utf-8")
        with self.assertRaisesRegex(AssertionError, "adjacency drift"):
            self.verify()

    def test_documentation_occurrence_cannot_be_duplicate_owner(self) -> None:
        path = self.root / DIALOG003 / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        row = next(value for value in review["records"] if value["id"].endswith("I059"))
        row["terminal_ingress_classification"] = "exact_duplicate"
        row["expert_duplicate_status"] = "accepted_exact_duplicate"
        row["accepted_duplicate_targets"] = [{"path":"docs/research/example.md","record_id":"fake","basis":"documentation occurrence"}]
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "not evidence-backed"):
            self.verify()

    def test_naturalness_route_set_is_locked(self) -> None:
        path = self.root / DIALOG003 / "dialog-context-routing-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        route = next(row for row in packet["routes"] if row["route_id"] == "D3-R15")
        route["source_item_ids"] = route["source_item_ids"][:-1]
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "naturalness route|context route projection"):
            self.verify()

    def test_route_owner_is_required(self) -> None:
        path = self.root / DIALOG003 / "dialog-context-routing-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["routes"][0]["owner_issue"] = 0
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "lacks owner"):
            self.verify()

    def test_duplicate_record_identity_is_required(self) -> None:
        path = self.root / DIALOG003 / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        row = next(value for value in review["records"] if value["id"].endswith("I055"))
        row["accepted_duplicate_targets"][0]["record_id"] = "missing"
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "not a record-level candidate"):
            self.verify()

if __name__ == "__main__":
    unittest.main()
