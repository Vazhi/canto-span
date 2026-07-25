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
    / "aa30-hkcancor"
    / "query-hkcancor-aa30-tung.py"
)
sys.path.insert(0, str(WORKBENCH_DIR))
import hkcancor_workbench as workbench


spec = importlib.util.spec_from_file_location("aa30_hkcancor_profile", PROFILE_PATH)
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


class Aa30HkcancorProfileTests(unittest.TestCase):
    def test_all_profiles_overlap_dedup_stable_rendering_and_stale_check(self):
        tokens = [
            Token("我", "r", "ngo5"),
            Token("同", "c", "tung4"),
            Token("你", "r", "nei5"),
            Token("同埋", "c", "tung4maai4"),
            Token("佢", "r", "keoi5"),
            Token("同", "p", "tung4"),
            Token("埋", "v", "maai4"),
            Token("大家", "r", "daai6gaa1"),
        ]
        utterances = [
            Utterance([Token("之前", "t", "zi1cin4")]),
            Utterance(tokens),
            Utterance([Token("之後", "t", "zi1hau6")]),
        ]

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
                [row["tokenIndexZeroBased"] for row in first], [1, 3, 5]
            )
            self.assertEqual(len({row["candidateId"] for row in first}), 3)
            self.assertEqual(
                [row["matchedSurfaceSpan"] for row in first],
                ["同", "同埋", "同埋"],
            )
            self.assertEqual(
                [row["segmentationProfile"] for row in first],
                [
                    "single_token_tung",
                    "single_token_tungmaai",
                    "split_tokens_tung_maai",
                ],
            )
            self.assertEqual(
                first[2]["matchedProfiles"],
                [
                    profile_module.EXACT_TUNG,
                    profile_module.ADJACENT_TUNG_MAAI,
                ],
            )
            self.assertEqual(
                first[2]["overlapDeduplication"],
                {
                    "representedProfileCount": 2,
                    "representedProfiles": [
                        profile_module.EXACT_TUNG,
                        profile_module.ADJACENT_TUNG_MAAI,
                    ],
                    "overlappingRepresentationsDeduplicated": 1,
                },
            )
            self.assertEqual(first[2]["leftNeighbor"]["word"], "佢")
            self.assertEqual(first[2]["rightNeighbor"]["word"], "大家")
            self.assertEqual(first[2]["matchedHkcancorTags"], ["p", "v"])
            self.assertEqual(first[2]["matchedUdTags"], ["ADP", "VERB"])
            self.assertEqual(
                first[1]["duplicateGroupInputs"],
                first[2]["duplicateGroupInputs"],
            )
            self.assertTrue(
                all(
                    row["candidateId"].startswith("aa30-")
                    and row["candidateIdNamespace"] == profile_module.QUERY_ID
                    and row["annotationStatus"]
                    == "REQUIRES_EXPERT_CONTEXT_REVIEW"
                    for row in first
                )
            )
            self.assertEqual(first[0]["localContext"]["previous"]["text"], "之前")
            self.assertEqual(first[0]["localContext"]["next"]["text"], "之後")
            self.assertEqual(len(first[0]["tokenContext"]["tokens"]), 8)
            self.assertEqual(summary["counts"]["candidateTokens"], 3)
            self.assertEqual(summary["counts"]["uniqueSourceLocations"], 3)
            self.assertEqual(summary["counts"]["rawSurfaceProfileMatches"], 4)
            self.assertEqual(
                summary["counts"]["overlappingRepresentationsDeduplicated"], 1
            )
            self.assertEqual(
                summary["counts"]["surfaceProfiles"],
                {
                    profile_module.ADJACENT_TUNG_MAAI: 1,
                    profile_module.EXACT_TUNG: 2,
                    profile_module.EXACT_TUNGMAAI: 1,
                },
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
            self.assertEqual(len(tsv_rows), 3)
            self.assertEqual(
                json.loads(tsv_rows[2]["matched_profiles_json"]),
                [
                    profile_module.EXACT_TUNG,
                    profile_module.ADJACENT_TUNG_MAAI,
                ],
            )
            self.assertEqual(tsv_rows[2]["right_ud_pos"], "PRON")

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
