from __future__ import annotations

import importlib.util
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
    / "aa62-hkcancor"
    / "query-hkcancor-aa62-v-gwo.py"
)
sys.path.insert(0, str(WORKBENCH_DIR))
import hkcancor_workbench as workbench


spec = importlib.util.spec_from_file_location("aa62_hkcancor_profile", PROFILE_PATH)
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
        return self._utterances if by_file else self._utterances[0]

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


class Aa62HkcancorProfileTests(unittest.TestCase):
    def test_complete_verbal_pos_query_stable_rendering_and_stale_check(self):
        tokens = [
            Token("食", "v", "sik6"),
            Token("過", "u", "gwo3"),
            Token("飯", "n", "faan6"),
            Token("去", "v1", "heoi3"),
            Token("過", "u", "gwo3"),
            Token("香港", "ns", "hoeng1gong2"),
            Token("試", "xv", "si3"),
            Token("過", "u", "gwo3"),
            Token("名詞", "n", "ming4ci4"),
            Token("過", "u", "gwo3"),
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
            [1, 4, 7],
        )

        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "source.cha"
            source.write_text("frozen source", encoding="utf-8")
            digest = workbench.sha256_file(source)
            manifest = root / "manifest.sha256"
            manifest.write_text(f"{digest}  source.cha\n", encoding="utf-8")
            output_dir = root / "outputs"
            fake = FakePycantonese(Corpus(source, utterances))
            profile = profile_module.QUERY_PROFILES[profile_module.PROFILE_KEY]

            _context, first, summary = workbench.execute_profile(
                profile,
                output_dir=output_dir,
                source_manifest=manifest,
                pycantonese_module=fake,
            )
            _context, second, _summary = workbench.execute_profile(
                profile,
                output_dir=output_dir,
                source_manifest=manifest,
                check=True,
                pycantonese_module=fake,
            )

            self.assertEqual(first, second)
            self.assertEqual(
                [row["tokenIndexZeroBased"] for row in first], [1, 4, 7]
            )
            self.assertEqual(len({row["candidateId"] for row in first}), 3)
            self.assertEqual(
                [row["precedingVerb"]["pos"] for row in first],
                ["v", "v1", "xv"],
            )
            self.assertEqual(first[0]["matchedSurfaceSpan"], "食過")
            self.assertEqual(first[0]["followingToken"]["word"], "飯")
            self.assertEqual(first[0]["followingToken"]["udPos"], "NOUN")
            self.assertTrue(
                all(
                    row["candidateId"].startswith("aa62-")
                    and row["candidateIdNamespace"] == profile_module.QUERY_ID
                    and row["annotationStatus"]
                    == "REQUIRES_EXPERT_CONTEXT_REVIEW"
                    for row in first
                )
            )
            self.assertEqual(first[0]["localContext"]["previous"]["text"], "之前")
            self.assertEqual(first[0]["localContext"]["next"]["text"], "之後")
            self.assertEqual(summary["counts"]["candidateTokens"], 3)
            self.assertEqual(
                summary["counts"]["precedingVerbHkcancorPos"],
                {"v": 1, "v1": 1, "xv": 1},
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
                    pycantonese_module=fake,
                )


if __name__ == "__main__":
    unittest.main()
