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
    / "aa89-hkcancor"
    / "query-hkcancor-aa89-modal-lexeme.py"
)
sys.path.insert(0, str(WORKBENCH_DIR))
import hkcancor_workbench as workbench


spec = importlib.util.spec_from_file_location("aa89_hkcancor_profile", PROFILE_PATH)
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


class Aa89HkcancorProfileTests(unittest.TestCase):
    def test_overlap_segmentation_ids_rendering_and_stale_check(self):
        tokens = [
            Token("你", "r", "nei5"),
            Token("要", "vu", "jiu3"),
            Token("去", "v", "heoi3"),
            Token("，", "w", None),
            Token("唔", "d", "m4"),
            Token("會", "vu", "wui5"),
            Token("返", "v", "faan1"),
            Token("唔使", "vu", "m4sai2"),
            Token("做", "v", "zou6"),
            Token("唔", "d", "m4"),
            Token("使", "vu", "sai2"),
            Token("去", "v", "heoi3"),
            Token("可以", "vu", "ho2ji5"),
            Token("，", "w", None),
            Token("嚟", "v", "lai4"),
            Token("使", "vu", "sai2"),
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
            [1, 4, 7, 9, 12],
        )
        self.assertIsNone(direct_matches[5])
        self.assertIsNone(direct_matches[10])
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
                [row["tokenIndexZeroBased"] for row in first],
                [1, 4, 7, 9, 12],
            )
            self.assertEqual(len({row["candidateId"] for row in first}), 5)
            self.assertEqual(
                [row["matchedSurfaceSpan"] for row in first],
                ["要", "唔會", "唔使", "唔使", "可以"],
            )
            self.assertEqual(
                [row["segmentationProfile"] for row in first],
                [
                    profile_module.SINGLE_TOKEN,
                    profile_module.ADJACENT_NEGATION,
                    profile_module.SINGLE_TOKEN,
                    profile_module.ADJACENT_NEGATION,
                    profile_module.SINGLE_TOKEN,
                ],
            )
            self.assertEqual(
                [row["negationProfile"] for row in first],
                [
                    profile_module.UNNEGATED_SURFACE,
                    profile_module.ADJACENT_M4_NEGATION,
                    profile_module.SINGLE_TOKEN_NEGATED_LEXEME,
                    profile_module.ADJACENT_M4_NEGATION,
                    profile_module.UNNEGATED_SURFACE,
                ],
            )
            self.assertEqual(len(first[1]["matchedTokens"]), 2)
            self.assertEqual(len(first[2]["matchedTokens"]), 1)
            self.assertEqual(
                first[2]["duplicateGroupInputs"],
                first[3]["duplicateGroupInputs"],
            )
            self.assertEqual(
                [row["followingLexicalToken"]["word"] for row in first],
                ["去", "返", "做", "去", "嚟"],
            )
            self.assertEqual(first[4]["immediateRightToken"]["word"], "，")
            self.assertEqual(first[4]["followingLexicalToken"]["word"], "嚟")
            self.assertEqual(
                first[4]["interveningTokenCountBeforeFollowingLexical"], 1
            )
            self.assertTrue(
                all(
                    row["candidateId"].startswith("aa89-")
                    and row["candidateIdNamespace"] == profile_module.QUERY_ID
                    and row["annotationStatus"]
                    == "REQUIRES_EXPERT_CONTEXT_REVIEW"
                    for row in first
                )
            )
            self.assertEqual(first[0]["localContext"]["previous"]["text"], "之前")
            self.assertEqual(first[0]["localContext"]["next"]["text"], "之後")
            self.assertGreaterEqual(len(first[2]["tokenContext"]["tokens"]), 8)
            self.assertEqual(summary["counts"]["candidateSpans"], 5)
            self.assertEqual(summary["counts"]["matchedCorpusTokens"], 7)
            self.assertEqual(
                summary["counts"]["segmentationProfiles"],
                {
                    profile_module.ADJACENT_NEGATION: 2,
                    profile_module.SINGLE_TOKEN: 3,
                },
            )
            self.assertEqual(
                summary["counts"]["matchedSurfaceForms"]["唔使"], 2
            )
            self.assertEqual(
                summary["counts"]["followingForms"],
                {"做": 1, "去": 2, "嚟": 1, "返": 1},
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
            self.assertEqual(len(tsv_rows), 5)
            self.assertEqual(tsv_rows[1]["matched_hkcancor_tags"], "d+vu")
            self.assertEqual(tsv_rows[4]["immediate_right_form"], "，")
            self.assertEqual(tsv_rows[4]["following_lexical_form"], "嚟")
            self.assertEqual(
                json.loads(tsv_rows[2]["duplicate_group_inputs_json"]),
                {"normalizedSurface": "唔使"},
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
