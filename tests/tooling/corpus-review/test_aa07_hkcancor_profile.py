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

from pycantonese.pos_tagging import hkcancor_to_ud


ROOT = Path(__file__).resolve().parents[3]
WORKBENCH_DIR = ROOT / "tools" / "corpus-review"
PROFILE_PATH = (
    ROOT
    / "external-evidence"
    / "aa07-hkcancor"
    / "query-hkcancor-aa07-ge-noun.py"
)
sys.path.insert(0, str(WORKBENCH_DIR))
import hkcancor_workbench as workbench


spec = importlib.util.spec_from_file_location("aa07_hkcancor_profile", PROFILE_PATH)
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


class Aa07HkcancorProfileTests(unittest.TestCase):
    def test_complete_query_stable_ids_rendering_and_stale_check(self):
        tokens = [
            Token("佢", "r", "keoi5"),
            Token("最", "d", "zeoi3"),
            Token("鍾意", "v", "zung1ji3"),
            Token("嗰", "r", "go2"),
            Token("本", "q", "bun2"),
            Token("舊", "a", "gau6"),
            Token("嘅", "u", "ge3"),
            Token("書", "n", "syu1"),
            Token("同", "c", "tung4"),
            Token("嘅", "u", "ge3"),
            Token("香港", "ns", "hoeng1gong2"),
            Token("嘅", "u", "ge3"),
            Token("佢", "r", "keoi5"),
            Token("嘅", "u", "ge3"),
        ]
        utterances = [
            Utterance([Token("之前", "t", "zi1cin4")]),
            Utterance(tokens),
            Utterance([Token("之後", "t", "zi1hau6")]),
        ]
        expected_indices = [
            index
            for index, token in enumerate(tokens)
            if token.word == "嘅"
            and index + 1 < len(tokens)
            and hkcancor_to_ud(tokens[index + 1].pos) in {"NOUN", "PROPN"}
        ]
        self.assertEqual(expected_indices, [6, 9])

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
                [row["tokenIndexZeroBased"] for row in first], expected_indices
            )
            self.assertEqual(len({row["candidateId"] for row in first}), 2)
            self.assertTrue(
                all(
                    row["candidateId"].startswith("aa07-")
                    and row["candidateIdNamespace"] == profile_module.QUERY_ID
                    and row["annotationStatus"]
                    == "REQUIRES_EXPERT_CONTEXT_REVIEW"
                    for row in first
                )
            )
            self.assertEqual(first[0]["matchedSurfaceSpan"], "嘅書")
            self.assertEqual(first[0]["precedingToken"]["word"], "舊")
            self.assertEqual(
                first[1]["followingNominalToken"],
                {
                    "word": "香港",
                    "pos": "ns",
                    "jyutping": "hoeng1gong2",
                    "udPos": "PROPN",
                },
            )
            self.assertEqual(len(first[0]["tokenContext"]["tokens"]), 11)
            self.assertEqual(
                first[0]["localContext"]["previous"]["text"], "之前"
            )
            self.assertEqual(first[0]["localContext"]["next"]["text"], "之後")
            self.assertEqual(summary["counts"]["candidateTokens"], 2)
            self.assertEqual(
                summary["counts"]["followingHkcancorTags"], {"n": 1, "ns": 1}
            )

            tsv_rows = list(
                csv.DictReader(
                    io.StringIO(
                        (
                            output_dir
                            / profile.inventory_tsv
                        ).read_text(encoding="utf-8")
                    ),
                    delimiter="\t",
                )
            )
            self.assertEqual(len(tsv_rows), 2)
            self.assertEqual(tsv_rows[0]["following_ud_pos"], "NOUN")
            self.assertEqual(
                json.loads(tsv_rows[0]["token_context_json"])["tokens"][6][
                    "word"
                ],
                "嘅",
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
