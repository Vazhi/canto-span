from __future__ import annotations

import importlib.util
import unittest
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
PROFILE_PATH = ROOT / "external-evidence" / "aa84-marked-hkcancor" / "query-hkcancor-aa84-marked.py"

spec = importlib.util.spec_from_file_location("aa84_marked_profile", PROFILE_PATH)
assert spec and spec.loader
profile_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(profile_module)


@dataclass
class Token:
    word: str
    pos: str
    jyutping: str | None = None


class Aa84MarkedProfileTests(unittest.TestCase):
    def match_at_marker(self, tokens: list[Token], marker: str):
        index = next(i for i, token in enumerate(tokens) if token.word == marker)
        return profile_module.token_predicate(tokens, index)

    def test_exact_internal_repetition_with_gam2_and_predicate(self):
        tokens = [Token("慢慢", "a", "maan6maan2"), Token("噉", "r", "gam2"), Token("食", "v", "sik6")]
        match = self.match_at_marker(tokens, "噉")
        self.assertIsNotNone(match)
        assert match is not None
        self.assertEqual(match.extra_fields["repetitionShape"], "exact_halves_token")
        self.assertEqual(match.extra_fields["markerJyutping"], "gam2")
        self.assertEqual(match.extra_fields["predicateCandidate"]["word"], "食")
        self.assertTrue(match.extra_fields["mechanicallyAdjacentModifierMarker"])
        self.assertTrue(match.extra_fields["mechanicallyAdjacentMarkerPredicate"])

    def test_written_gam3_is_retained_without_function_inference(self):
        tokens = [Token("慢慢", "a", "maan6maan2"), Token("咁", "d", "gam3"), Token("行", "v", "haang4")]
        match = self.match_at_marker(tokens, "咁")
        self.assertIsNotNone(match)
        assert match is not None
        self.assertEqual(match.extra_fields["markerSurface"], "咁")
        self.assertEqual(match.extra_fields["markerJyutping"], "gam3")

    def test_complex_repeated_prefix_modifier_is_retained_mechanically(self):
        tokens = [Token("細細聲", "a", "sai3sai3seng1"), Token("咁", "d", "gam3"), Token("講", "v", "gong2")]
        match = self.match_at_marker(tokens, "咁")
        self.assertIsNotNone(match)
        assert match is not None
        self.assertEqual(match.extra_fields["repetitionShape"], "repeated_prefix_token")
        self.assertEqual(match.extra_fields["baseSurface"], "細")
        self.assertEqual(match.extra_fields["suffixSurface"], "聲")

    def test_adjacent_identical_tokens_are_retained_as_a_mechanical_shape(self):
        tokens = [Token("慢", "a", "maan6"), Token("慢", "a", "maan2"), Token("噉", "r", "gam2"), Token("行", "v", "haang4")]
        match = self.match_at_marker(tokens, "噉")
        self.assertIsNotNone(match)
        assert match is not None
        self.assertEqual(match.extra_fields["repetitionShape"], "adjacent_identical_tokens")
        self.assertEqual(match.start_index, 0)

    def test_repeated_token_plus_dei_before_marker_is_retained_for_review(self):
        tokens = [Token("傻傻", "a", "so4so4"), Token("哋", "u", "dei6"), Token("咁", "d", "gam3"), Token("笑", "v", "siu3")]
        match = self.match_at_marker(tokens, "咁")
        self.assertIsNotNone(match)
        assert match is not None
        self.assertEqual(match.extra_fields["leftLexicalDistanceToMarker"], 2)
        self.assertEqual(match.extra_fields["interveningLeftTokens"][0]["word"], "哋")

    def test_distributive_like_collision_is_retained_not_preclassified(self):
        tokens = [Token("年年", "q", "nin4nin4"), Token("都", "d", "dou1"), Token("係", "v", "hai6"), Token("噉", "r", "gam2"), Token("打", "v", "daa2")]
        match = self.match_at_marker(tokens, "噉")
        self.assertIsNotNone(match)
        assert match is not None
        self.assertEqual(match.extra_fields["repeatedSurface"], "年年")
        self.assertEqual(match.extra_fields["leftLexicalDistanceToMarker"], 3)

    def test_bare_repetition_without_marker_is_outside_profile(self):
        tokens = [Token("慢慢", "a", "maan6maan2"), Token("行", "v", "haang4")]
        self.assertIsNone(profile_module.token_predicate(tokens, 0))
        self.assertIsNone(profile_module.token_predicate(tokens, 1))

    def test_marker_without_repeated_left_material_is_excluded(self):
        tokens = [Token("好", "a", "hou2"), Token("咁", "d", "gam3"), Token("食", "v", "sik6")]
        self.assertIsNone(self.match_at_marker(tokens, "咁"))

    def test_marker_without_following_predicate_is_excluded(self):
        tokens = [Token("慢慢", "a", "maan6maan2"), Token("噉", "r", "gam2"), Token("呀", "y", "aa3")]
        self.assertIsNone(self.match_at_marker(tokens, "噉"))

    def test_punctuation_breaks_bounded_modifier_marker_sequence(self):
        tokens = [Token("慢慢", "a", "maan6maan2"), Token("，", "w", None), Token("噉", "r", "gam2"), Token("行", "v", "haang4")]
        self.assertIsNone(self.match_at_marker(tokens, "噉"))

    def test_postverbal_marker_has_no_right_predicate_and_is_excluded(self):
        tokens = [Token("食", "v", "sik6"), Token("慢慢", "a", "maan6maan2"), Token("噉", "r", "gam2")]
        self.assertIsNone(self.match_at_marker(tokens, "噉"))

    def test_profile_identity_and_windows_are_stable(self):
        profile = profile_module.QUERY_PROFILES[profile_module.PROFILE_KEY]
        self.assertEqual(profile.query_id, "HKCANCOR-AA84-MARKED-REDUP-R1")
        self.assertEqual(profile.candidate_id_prefix, "aa84gm-")
        self.assertEqual(profile_module.LEFT_WINDOW_LEXICAL, 3)
        self.assertEqual(profile_module.RIGHT_WINDOW_LEXICAL, 3)
        self.assertEqual(profile.inventory_tsv, "hkcancor-aa84-marked-candidate-inventory.tsv")


if __name__ == "__main__":
    unittest.main()
