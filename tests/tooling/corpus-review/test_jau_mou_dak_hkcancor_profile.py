from __future__ import annotations

import csv
import importlib.util
import io
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
    / "jau-mou-dak-hkcancor"
    / "query-hkcancor-jau-mou-dak.py"
)
sys.path.insert(0, str(WORKBENCH_DIR))
import hkcancor_workbench as workbench


spec = importlib.util.spec_from_file_location("jau_mou_dak_profile", PROFILE_PATH)
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


class JauMouDakHkcancorProfileTests(unittest.TestCase):
    def test_profile_variants_and_polar_dedupe(self):
        utterances = [
            Utterance([Token("有得", "vu", "jau5dak1"), Token("去", "v", "heoi3")]),
            Utterance([Token("而家", "t", "ji4gaa1"), Token("冇得", "vu", "mou5dak1")]),
            Utterance([Token("有", "v1", "jau5"), Token("冇得", "vu", "mou5dak1"), Token("讀", "v", "duk6")]),
            Utterance([Token("有冇", "v", "jau5mou5"), Token("得", "u", "dak1"), Token("改", "v", "goi2")]),
            Utterance([Token("有", "v1", "jau5"), Token("得", "u", "dak1"), Token("玩", "v", "waan2"), Token("冇", "v1", "mou5"), Token("得", "u", "dak1"), Token("去", "v", "heoi3")]),
            Utterance([Token("有冇得", "vu", "jau5mou5dak1"), Token("平", "a", "peng4")]),
        ]

        direct = []
        for utterance in utterances:
            direct.extend(
                match
                for index in range(len(utterance.tokens))
                if (match := profile_module.token_predicate(utterance.tokens, index))
            )
        self.assertEqual(len(direct), 7)
        self.assertEqual(
            [match.matched_surface for match in direct],
            ["有得", "冇得", "有冇得", "有冇得", "有得", "冇得", "有冇得"],
        )
        self.assertEqual(
            [match.extra_fields["profileKind"] for match in direct],
            [
                "affirmative_yau_dak",
                "negative_mou_dak",
                "polar_yau_mou_dak",
                "polar_yau_mou_dak",
                "affirmative_yau_dak_split_diagnostic",
                "negative_mou_dak_split_diagnostic",
                "polar_yau_mou_dak",
            ],
        )
        self.assertTrue(direct[0].extra_fields["followingPredicateCandidate"])
        self.assertTrue(direct[1].extra_fields["utteranceFinal"])
        fused = profile_module.token_predicate(
            [Token("冇得頂", "a", "mou5dak1ding2")], 0
        )
        self.assertIsNotNone(fused)
        self.assertEqual(
            fused.extra_fields["profileKind"],
            "negative_fused_lexeme_diagnostic",
        )

    def test_deterministic_outputs_and_summary(self):
        utterances = [
            Utterance([Token("之前", "t", "zi1cin4")]),
            Utterance([Token("有", "v1", "jau5"), Token("冇得", "vu", "mou5dak1"), Token("讀", "v", "duk6")]),
            Utterance([Token("冇得", "vu", "mou5dak1")]),
        ]
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "source.cha"
            source.write_text("frozen source", encoding="utf-8")
            source_hash = workbench.sha256_file(source)
            manifest = root / "manifest.sha256"
            manifest.write_text(f"{source_hash}  source.cha\n", encoding="utf-8")
            output_dir = root / "outputs"
            corpus = Corpus(source, utterances)
            fake = FakePycantonese(corpus)
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
            self.assertEqual(len(first), 2)
            self.assertEqual([row["matchedSurfaceSpan"] for row in first], ["有冇得", "冇得"])
            self.assertEqual(summary["counts"]["candidateSpans"], 2)
            self.assertEqual(
                summary["counts"]["profileKinds"],
                {"negative_mou_dak": 1, "polar_yau_mou_dak": 1},
            )
            self.assertEqual(
                summary["counts"]["followingPredicateCandidate"],
                {"False": 1, "True": 1},
            )

            rows = list(
                csv.DictReader(
                    io.StringIO(
                        (output_dir / profile.inventory_tsv).read_text(encoding="utf-8")
                    ),
                    delimiter="\t",
                )
            )
            self.assertEqual(rows[0]["profile_kind"], "polar_yau_mou_dak")
            self.assertEqual(rows[0]["nearest_right_lexical_word"], "讀")
            self.assertEqual(rows[1]["utterance_final"], "true")


if __name__ == "__main__":
    unittest.main()
