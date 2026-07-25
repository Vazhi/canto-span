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
    / "aa82-hkcancor"
    / "query-hkcancor-aa82-bin-dou.py"
)
sys.path.insert(0, str(WORKBENCH_DIR))
import hkcancor_workbench as workbench


spec = importlib.util.spec_from_file_location("aa82_hkcancor_profile", PROFILE_PATH)
assert spec and spec.loader
profile_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(profile_module)


@dataclass
class Token:
    word: str
    pos: str
    jyutping: str


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


class Aa82HkcancorProfileTests(unittest.TestCase):
    def test_profiles_dedup_ids_rendering_and_stale_check(self):
        tokens = [
            Token("你", "r", "nei5"),
            Token("去", "v", "heoi3"),
            Token("邊", "r", "bin1"),
            Token("度", "q", "dou6"),
            Token("呀", "y", "aa3"),
            Token("同", "c", "tung4"),
            Token("邊度", "r", "bin1dou6"),
            Token("呢", "y", "ne1"),
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
            [2, 6],
        )
        self.assertIsNone(direct_matches[3])

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
                [row["tokenIndexZeroBased"] for row in first], [2, 6]
            )
            self.assertEqual(len({row["candidateId"] for row in first}), 2)
            self.assertEqual(
                [row["matchedSurfaceSpan"] for row in first], ["邊度", "邊度"]
            )
            self.assertEqual(
                [row["segmentationProfile"] for row in first],
                [
                    profile_module.ADJACENT_BIN_DOU,
                    profile_module.SINGLE_TOKEN_BIN_DOU,
                ],
            )
            self.assertEqual(len(first[0]["matchedTokens"]), 2)
            self.assertEqual(len(first[1]["matchedTokens"]), 1)
            self.assertEqual(first[0]["immediateLeftToken"]["word"], "去")
            self.assertEqual(first[0]["immediateLeftToken"]["udPos"], "VERB")
            self.assertEqual(first[0]["immediateRightToken"]["word"], "呀")
            self.assertEqual(first[1]["immediateLeftToken"]["word"], "同")
            self.assertEqual(first[1]["immediateRightToken"]["word"], "呢")
            self.assertEqual(
                first[0]["duplicateGroupInputs"],
                first[1]["duplicateGroupInputs"],
            )
            self.assertTrue(
                all(
                    row["candidateId"].startswith("aa82-")
                    and row["candidateIdNamespace"] == profile_module.QUERY_ID
                    and row["annotationStatus"]
                    == "REQUIRES_EXPERT_CONTEXT_REVIEW"
                    for row in first
                )
            )
            self.assertEqual(first[0]["localContext"]["previous"]["text"], "之前")
            self.assertEqual(first[0]["localContext"]["next"]["text"], "之後")
            self.assertEqual(len(first[0]["tokenContext"]["tokens"]), 8)
            self.assertEqual(summary["counts"]["candidateTokens"], 2)
            self.assertEqual(summary["counts"]["matchedCorpusTokens"], 3)
            self.assertEqual(summary["counts"]["uniqueSourceLocations"], 2)
            self.assertEqual(
                summary["counts"]["segmentationProfiles"],
                {
                    profile_module.ADJACENT_BIN_DOU: 1,
                    profile_module.SINGLE_TOKEN_BIN_DOU: 1,
                },
            )
            self.assertEqual(
                summary["counts"]["immediateLeftForms"],
                {"去": 1, "同": 1},
            )
            self.assertEqual(
                summary["counts"]["immediateRightForms"],
                {"呀": 1, "呢": 1},
            )

            tsv_rows = list(
                csv.DictReader(
                    io.StringIO(
                        (
                            output_dir / profile.inventory_tsv
                        ).read_text(encoding="utf-8")
                    ),
                    delimiter="\t",
                )
            )
            self.assertEqual(len(tsv_rows), 2)
            self.assertEqual(tsv_rows[0]["immediate_left_ud_pos"], "VERB")
            self.assertEqual(tsv_rows[0]["immediate_right_form"], "呀")
            self.assertEqual(
                json.loads(tsv_rows[0]["duplicate_group_inputs_json"]),
                {"normalizedSurface": "邊度"},
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
