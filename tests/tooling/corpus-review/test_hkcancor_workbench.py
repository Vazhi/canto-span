from __future__ import annotations

import json
import sys
import tempfile
import unittest
from dataclasses import dataclass, field
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
MODULE_PATH = ROOT / "tools" / "corpus-review" / "hkcancor_workbench.py"
sys.path.insert(0, str(MODULE_PATH.parent))
import hkcancor_workbench as workbench


@dataclass
class Token:
    word: str
    pos: str
    jyutping: str


@dataclass
class Participant:
    code: str = "A"
    name: str = "Speaker"
    role: str = "Target_Child"
    language: str = "yue"
    l1: str = "yue"
    sex: str = "female"
    age: int = 5


@dataclass
class Header:
    date: str = "1998-01-01"
    participants: tuple[Participant, ...] = field(
        default_factory=lambda: (Participant(),)
    )


@dataclass
class Utterance:
    tokens: list[Token]
    participant: str = "A"


class Corpus:
    def __init__(self, file_paths: list[Path], utterances: list[list[Utterance]]):
        self.file_paths = [str(path) for path in file_paths]
        self._utterances = utterances
        self.n_files = len(file_paths)

    def utterances(self, by_file: bool = False):
        if by_file:
            return self._utterances
        return [utterance for source in self._utterances for utterance in source]

    def headers(self):
        return [Header() for _path in self.file_paths]

    def words(self):
        return [
            token.word
            for utterance in self.utterances()
            for token in utterance.tokens
        ]


def profile():
    def predicate(tokens, index):
        if tokens[index].word != "中":
            return None
        return workbench.Match(
            start_index=index,
            end_index_exclusive=index + 1,
            id_token_index=index,
            matched_surface=tokens[index].word,
            duplicate_group_inputs={"normalizedSurface": tokens[index].word},
        )

    def summary(context, rows):
        return {
            "queryId": "TEST-HKCANCOR-R1",
            "sourceManifestSha256": context.source_manifest_sha256,
            "candidateTokens": len(rows),
        }

    return workbench.QueryProfile(
        query_id="TEST-HKCANCOR-R1",
        candidate_id_namespace="TEST-HKCANCOR-R1",
        candidate_id_prefix="test-",
        inventory_json="inventory.json",
        inventory_tsv="inventory.tsv",
        summary_json="summary.json",
        construction={"permanentCode": "TEST"},
        token_predicate=predicate,
        summary_builder=summary,
        context_before_tokens=1,
        context_after_tokens=1,
    )


class HkcancorWorkbenchTests(unittest.TestCase):
    def test_source_manifest_and_distribution_reject_drift(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "source.cha"
            source.write_text("original", encoding="utf-8")
            digest = workbench.sha256_file(source)
            manifest = root / "manifest.sha256"
            manifest.write_text(f"{digest}  source.cha\n", encoding="utf-8")

            allowlist, manifest_digest = workbench.read_source_allowlist(manifest)
            self.assertEqual(allowlist, {"source.cha": digest})
            self.assertEqual(manifest_digest, workbench.sha256_file(manifest))
            corpus = Corpus([source], [[]])
            self.assertEqual(
                workbench.verify_distribution(corpus, allowlist),
                {"source.cha": digest},
            )

            source.write_text("changed", encoding="utf-8")
            with self.assertRaisesRegex(RuntimeError, "source hashes differ"):
                workbench.verify_distribution(corpus, allowlist)

    def test_stable_ids_context_and_deterministic_rendering(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "source.cha"
            source.write_text("source", encoding="utf-8")
            source_hash = workbench.sha256_file(source)
            manifest = root / "manifest.sha256"
            manifest.write_text(f"{source_hash}  source.cha\n", encoding="utf-8")
            corpus = Corpus(
                [source],
                [[
                    Utterance(
                        [
                            Token("前", "n", "cin4"),
                            Token("中", "v", "zung1"),
                            Token("後", "n", "hau6"),
                        ]
                    )
                ]],
            )
            context = workbench.WorkbenchContext(
                corpus=corpus,
                source_manifest_path=manifest,
                source_manifest_sha256=workbench.sha256_file(manifest),
                source_hashes={"source.cha": source_hash},
                pycantonese_version="5.0.0",
            )
            query = profile()
            first = workbench.extract_candidates(context, query)
            second = workbench.extract_candidates(context, query)
            self.assertEqual(first, second)
            self.assertEqual(first[0]["candidateId"], second[0]["candidateId"])
            self.assertEqual(
                first[0]["tokenContext"]["tokens"],
                [
                    {"word": "前", "pos": "n", "jyutping": "cin4"},
                    {"word": "中", "pos": "v", "jyutping": "zung1"},
                    {"word": "後", "pos": "n", "jyutping": "hau6"},
                ],
            )
            self.assertEqual(
                first[0]["duplicateGroupInputs"],
                {"normalizedSurface": "中"},
            )

            summary = query.summary_builder(context, first)
            outputs = workbench.rendered_outputs(query, summary, first)
            output_dir = root / "outputs"
            workbench.check_or_write_outputs(output_dir, outputs, check=False)
            workbench.check_or_write_outputs(output_dir, outputs, check=True)
            (output_dir / "summary.json").write_text("stale\n", encoding="utf-8")
            with self.assertRaisesRegex(RuntimeError, "Generated output is stale"):
                workbench.check_or_write_outputs(output_dir, outputs, check=True)

    def test_complete_decision_accounting(self):
        rows = [
            {"candidateId": "test-a", "matchedSurfaceSpan": "甲"},
            {"candidateId": "test-b", "matchedSurfaceSpan": "乙"},
        ]
        decisions = [
            {
                "candidateId": "test-a",
                "matchedSurfaceSpan": "甲",
                "classification": "genuine",
                "reviewerNote": "Reviewed in context.",
                "exclusionReason": "",
                "claimRelations": ["direct_candidate"],
            },
            {
                "candidateId": "test-b",
                "matchedSurfaceSpan": "乙",
                "classification": "false_positive",
                "reviewerNote": "Different construction.",
                "exclusionReason": "boundary",
                "claimRelations": ["boundary_candidate"],
            },
        ]
        ledger = {
            "schema": "canto-span-corpus-claim-cross-reference-decisions-v1",
            "construction": {"permanentCode": "TEST"},
            "queryId": "TEST-HKCANCOR-R1",
            "counts": {
                "ambiguous": 0,
                "false_positive": 1,
                "genuine": 1,
                "unusable": 0,
            },
            "packetStatus": "complete",
            "decisions": decisions,
        }
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "decisions.json"
            path.write_text(json.dumps(ledger), encoding="utf-8")
            workbench.validate_decisions(
                path,
                rows,
                query_id="TEST-HKCANCOR-R1",
                construction={"permanentCode": "TEST"},
            )

            ledger["decisions"] = decisions[:1]
            path.write_text(json.dumps(ledger), encoding="utf-8")
            with self.assertRaisesRegex(
                RuntimeError, "does not account for candidates"
            ):
                workbench.validate_decisions(
                    path,
                    rows,
                    query_id="TEST-HKCANCOR-R1",
                    construction={"permanentCode": "TEST"},
                )

    def test_rejects_pycantonese_version_drift_before_loading_corpus(self):
        class WrongVersion:
            __version__ = "5.0.1"

            @staticmethod
            def hkcancor():
                raise AssertionError("version drift must stop before corpus loading")

        with self.assertRaisesRegex(RuntimeError, "frozen to PyCantonese 5.0.0"):
            workbench.load_verified_hkcancor(
                Path("unused-manifest"),
                pycantonese_module=WrongVersion,
            )


if __name__ == "__main__":
    unittest.main()
