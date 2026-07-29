from __future__ import annotations

import csv
import importlib.util
import io
import json
import sys
import tempfile
import unittest
from dataclasses import dataclass, field
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
WORKBENCH_DIR = ROOT / "tools" / "corpus-review"
PROFILE_PATH = (
    ROOT
    / "external-evidence"
    / "aa91-hkcancor"
    / "query-hkcancor-aa91-hou-x-noun.py"
)
sys.path.insert(0, str(WORKBENCH_DIR))
import hkcancor_workbench as workbench


spec = importlib.util.spec_from_file_location("aa91_hkcancor_profile", PROFILE_PATH)
assert spec and spec.loader
profile_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(profile_module)


@dataclass
class Token:
    word: str
    pos: str
    jyutping: str | None


@dataclass
class Participant:
    code: str = "A"
    name: str = "Speaker"
    role: str = "Adult"
    language: str = "yue"
    l1: str = "yue"
    sex: str = "female"
    age: int = 30


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
    def __init__(self, source: Path, utterances: list[Utterance]):
        self.file_paths = [str(source)]
        self._utterances = [utterances]
        self.n_files = 1

    def utterances(self, by_file: bool = False):
        if by_file:
            return self._utterances
        return self._utterances[0]

    def headers(self):
        return [Header()]

    def words(self):
        return [
            token.word
            for utterance in self.utterances()
            for token in utterance.tokens
        ]


class FakePycantonese:
    __version__ = "5.0.0"

    def __init__(self, corpus: Corpus):
        self._corpus = corpus

    def hkcancor(self):
        return self._corpus


class Aa91HkcancorProfileTests(unittest.TestCase):
    def test_exact_ge_exclusion_nominal_mapping_ids_rendering_and_stale_check(self):
        tokens = [
            Token("好", "d", "hou2"),
            Token("大", "a", "daai6"),
            Token("壓力", "n", "aat3lik6"),
            Token("好", "d", "hou2"),
            Token("嘅", "u", "ge3"),
            Token("朋友", "n", "pang4jau5"),
            Token("好", "d", "hou2"),
            Token("快", "d", "faai3"),
            Token("香港", "ns", "hoeng1gong2"),
            Token("好", "d", "hou2"),
            Token("，", "w", None),
            Token("人", "n", "jan4"),
            Token("好", "d", "hou2"),
            Token("做", "v", "zou6"),
            Token("工", "n", "gung1"),
            Token("好", "d", "hou2"),
            Token("長", "a", "coeng4"),
            Token("行", "v", "haang4"),
        ]
        utterances = [
            Utterance([Token("之前", "t", "zi1cin4")]),
            Utterance(tokens),
            Utterance([Token("之後", "t", "zi1hau6")]),
        ]
        direct_matches = [
            profile_module.token_predicate(tokens, index)
            for index in range(len(tokens))
        ]
        self.assertEqual(
            [index for index, match in enumerate(direct_matches) if match],
            [0, 6, 12],
        )
        self.assertIsNone(direct_matches[3])
        self.assertIsNone(direct_matches[9])
        self.assertIsNone(direct_matches[15])

        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "source.cha"
            source.write_text("frozen source", encoding="utf-8")
            source_hash = workbench.sha256_file(source)
            manifest = root / "manifest.sha256"
            manifest.write_text(
                f"{source_hash}  source.cha\n", encoding="utf-8"
            )
            output_dir = root / "outputs"
            corpus = Corpus(source, utterances)
            fake_module = FakePycantonese(corpus)
            profile = profile_module.QUERY_PROFILES[profile_module.PROFILE_KEY]

            _context, first, summary = workbench.execute_profile(
                profile,
                output_dir=output_dir,
                source_manifest=manifest,
                pycantonese_module=fake_module,
            )
            _context, second, _summary = workbench.execute_profile(
                profile,
                output_dir=output_dir,
                source_manifest=manifest,
                check=True,
                pycantonese_module=fake_module,
            )

            self.assertEqual(first, second)
            self.assertEqual(
                [row["tokenIndexZeroBased"] for row in first], [0, 6, 12]
            )
            self.assertEqual(len({row["candidateId"] for row in first}), 3)
            self.assertEqual(
                [row["matchedSurfaceSpan"] for row in first],
                ["好大壓力", "好快香港", "好做工"],
            )
            self.assertEqual(
                [row["middleToken"]["word"] for row in first],
                ["大", "快", "做"],
            )
            self.assertEqual(
                [row["finalNominalToken"]["udPos"] for row in first],
                ["NOUN", "PROPN", "NOUN"],
            )
            self.assertEqual(
                first[0]["duplicateGroupInputs"],
                {"middleForm": "大", "finalNominalForm": "壓力"},
            )
            self.assertTrue(
                all(
                    row["candidateId"].startswith("aa91-")
                    and row["candidateIdNamespace"] == profile_module.QUERY_ID
                    and row["annotationStatus"]
                    == "REQUIRES_EXPERT_CONTEXT_REVIEW"
                    and len(row["matchedTokens"]) == 3
                    for row in first
                )
            )
            self.assertEqual(first[0]["localContext"]["previous"]["text"], "之前")
            self.assertEqual(first[0]["localContext"]["next"]["text"], "之後")
            self.assertGreaterEqual(len(first[1]["tokenContext"]["tokens"]), 8)
            self.assertEqual(summary["counts"]["candidateSpans"], 3)
            self.assertEqual(summary["counts"]["matchedCorpusTokens"], 9)
            self.assertEqual(
                summary["counts"]["middleForms"], {"做": 1, "大": 1, "快": 1}
            )
            self.assertEqual(
                summary["counts"]["finalNominalUdPos"],
                {"NOUN": 2, "PROPN": 1},
            )

            tsv_rows = list(
                csv.DictReader(
                    io.StringIO(
                        (output_dir / profile.inventory_tsv).read_text(
                            encoding="utf-8"
                        )
                    ),
                    delimiter="\t",
                )
            )
            self.assertEqual(len(tsv_rows), 3)
            self.assertEqual(tsv_rows[0]["matched_hkcancor_tags"], "d+a+n")
            self.assertEqual(tsv_rows[1]["final_nominal_ud_pos"], "PROPN")
            self.assertEqual(
                json.loads(tsv_rows[2]["duplicate_group_inputs_json"]),
                {"middleForm": "做", "finalNominalForm": "工"},
            )

            (output_dir / profile.summary_json).write_text(
                "stale\n", encoding="utf-8"
            )
            with self.assertRaisesRegex(
                RuntimeError, "Generated output is stale"
            ):
                workbench.execute_profile(
                    profile,
                    output_dir=output_dir,
                    source_manifest=manifest,
                    check=True,
                    pycantonese_module=fake_module,
                )


if __name__ == "__main__":
    unittest.main()
