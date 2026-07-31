from __future__ import annotations

import importlib.util
import unittest
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
PROFILE_PATH = (
    ROOT
    / "external-evidence"
    / "aa56-no-place-hkcancor"
    / "query-hkcancor-aa56-no-place.py"
)

spec = importlib.util.spec_from_file_location("aa56_no_place_profile", PROFILE_PATH)
assert spec and spec.loader
profile_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(profile_module)


@dataclass
class Token:
    word: str
    pos: str
    jyutping: str | None = None


class Aa56NoPlaceProfileTests(unittest.TestCase):
    def test_initial_positive_presentational_shape_is_retained(self):
        tokens = [
            Token("有", "v1", "jau5"),
            Token("個", "q", "go3"),
            Token("男仔", "n", "naam4zai2"),
            Token("孭", "v", "me1"),
            Token("我", "r", "ngo5"),
            Token("走", "v", "zau2"),
        ]
        match = profile_module.token_predicate(tokens, 0)
        self.assertIsNotNone(match)
        assert match is not None
        self.assertTrue(match.extra_fields["utteranceInitialLexical"])
        self.assertEqual(match.extra_fields["nominalStartToken"]["word"], "個")
        self.assertEqual(match.extra_fields["laterPredicateCandidate"]["word"], "孭")

    def test_punctuation_before_marker_does_not_defeat_initial_status(self):
        tokens = [
            Token("，", "", None),
            Token("有", "v1", "jau5"),
            Token("幾", "m", "gei2"),
            Token("個", "q", "go3"),
            Token("學生", "n", "hok6saang1"),
            Token("好", "a", "hou2"),
            Token("嬲", "a", "nau1"),
        ]
        match = profile_module.token_predicate(tokens, 1)
        self.assertIsNotNone(match)
        assert match is not None
        self.assertTrue(match.extra_fields["utteranceInitialLexical"])
        self.assertEqual(match.extra_fields["nominalStartToken"]["word"], "幾")
        self.assertEqual(match.extra_fields["laterPredicateCandidate"]["word"], "好")

    def test_noninitial_possession_is_retained_as_review_boundary(self):
        tokens = [
            Token("我", "r", "ngo5"),
            Token("有", "v1", "jau5"),
            Token("書", "n", "syu1"),
        ]
        match = profile_module.token_predicate(tokens, 1)
        self.assertIsNotNone(match)
        assert match is not None
        self.assertFalse(match.extra_fields["utteranceInitialLexical"])
        self.assertFalse(match.extra_fields["hasLaterPredicateCandidate"])
        self.assertEqual(match.extra_fields["nearestLeftLexicalToken"]["word"], "我")

    def test_negative_human_predicate_shape_is_retained_without_analysis(self):
        tokens = [
            Token("從來", "d", "cung4loi4"),
            Token("冇", "v1", "mou5"),
            Token("人", "n", "jan4"),
            Token("講", "v", "gong2"),
            Token("過", "u", "gwo3"),
        ]
        match = profile_module.token_predicate(tokens, 1)
        self.assertIsNotNone(match)
        assert match is not None
        self.assertEqual(match.matched_surface, "冇")
        self.assertEqual(match.extra_fields["nominalStartToken"]["word"], "人")
        self.assertEqual(match.extra_fields["laterPredicateCandidate"]["word"], "講")

    def test_overt_place_and_lexical_compound_collisions_are_retained(self):
        place_tokens = [
            Token("香港", "ns", "hoeng1gong2"),
            Token("有", "v1", "jau5"),
            Token("好多", "m", "hou2do1"),
            Token("的士", "n", "dik1si2"),
        ]
        compound_tokens = [
            Token("帶", "v", "daai3"),
            Token("有", "v1", "jau5"),
            Token("狗", "n", "gau2"),
            Token("嘅", "u", "ge3"),
            Token("味", "n", "mei6"),
        ]
        self.assertIsNotNone(profile_module.token_predicate(place_tokens, 1))
        self.assertIsNotNone(profile_module.token_predicate(compound_tokens, 1))

    def test_predicate_right_and_utterance_final_markers_are_excluded(self):
        predicate_right = [
            Token("有", "v1", "jau5"),
            Token("去", "v", "heoi3"),
        ]
        utterance_final = [Token("我", "r", "ngo5"), Token("有", "v1", "jau5")]
        self.assertIsNone(profile_module.token_predicate(predicate_right, 0))
        self.assertIsNone(profile_module.token_predicate(utterance_final, 1))

    def test_profile_identity_and_outputs_are_stable(self):
        profile = profile_module.QUERY_PROFILES[profile_module.PROFILE_KEY]
        self.assertEqual(profile.query_id, "HKCANCOR-AA56-NOPLACE-R1")
        self.assertEqual(profile.candidate_id_prefix, "aa56-")
        self.assertEqual(
            profile.inventory_tsv,
            "hkcancor-aa56-no-place-candidate-inventory.tsv",
        )


if __name__ == "__main__":
    unittest.main()
