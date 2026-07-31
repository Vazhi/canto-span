from __future__ import annotations

import importlib.util
import unittest
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
PROFILE_PATH = (
    ROOT
    / "external-evidence"
    / "aa84-bare-redup-hkcancor"
    / "query-hkcancor-aa84-bare-redup.py"
)

spec = importlib.util.spec_from_file_location("aa84_bare_redup_profile", PROFILE_PATH)
assert spec and spec.loader
profile_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(profile_module)


@dataclass
class Token:
    word: str
    pos: str
    jyutping: str | None = None


class Aa84BareRedupProfileTests(unittest.TestCase):
    def test_internal_slow_manner_candidate_is_retained_with_host(self):
        tokens = [
            Token("慢慢", "a", "maan6maan2"),
            Token("行", "v", "hang4"),
        ]
        match = profile_module.token_predicate(tokens, 0)
        self.assertIsNotNone(match)
        assert match is not None
        self.assertEqual(match.extra_fields["repetitionMode"], "internally_repeated_token")
        self.assertEqual(match.extra_fields["baseSurface"], "慢")
        self.assertEqual(match.extra_fields["localPredicateCandidate"]["word"], "行")
        self.assertEqual(match.extra_fields["predicateDistanceLexicalTokens"], 1)

    def test_internal_temporal_and_distributive_controls_are_retained(self):
        temporal = [Token("日日", "q", "jat6jat6"), Token("買", "v", "maai5")]
        distributive = [
            Token("個個", "q", "go3go3"),
            Token("都", "d", "dou1"),
            Token("讀", "v", "duk6"),
        ]
        temporal_match = profile_module.token_predicate(temporal, 0)
        distributive_match = profile_module.token_predicate(distributive, 0)
        self.assertIsNotNone(temporal_match)
        self.assertIsNotNone(distributive_match)
        assert temporal_match and distributive_match
        self.assertEqual(temporal_match.extra_fields["localPredicateCandidate"]["word"], "買")
        self.assertEqual(distributive_match.extra_fields["localPredicateCandidate"]["word"], "讀")

    def test_internal_token_without_local_predicate_is_retained_as_control(self):
        tokens = [Token("拜拜", "l1", "baai1baai3"), Token("啊", "y", "aa3")]
        match = profile_module.token_predicate(tokens, 0)
        self.assertIsNotNone(match)
        assert match is not None
        self.assertFalse(match.extra_fields["hasLocalPredicateCandidate"])

    def test_exact_adjacent_pair_with_local_predicate_is_retained(self):
        tokens = [
            Token("慢", "a", "maan6"),
            Token("慢", "a", "maan2"),
            Token("行", "v", "hang4"),
        ]
        match = profile_module.token_predicate(tokens, 0)
        self.assertIsNotNone(match)
        assert match is not None
        self.assertEqual(match.extra_fields["repetitionMode"], "adjacent_identical_tokens")
        self.assertEqual(match.end_index_exclusive, 2)
        self.assertEqual(match.extra_fields["secondToken"]["jyutping"], "maan2")
        self.assertEqual(match.extra_fields["localPredicateCandidate"]["word"], "行")

    def test_adjacent_pair_without_local_predicate_is_excluded(self):
        tokens = [
            Token("我", "r", "ngo5"),
            Token("我", "r", "ngo5"),
            Token("呢", "y1", "ne1"),
        ]
        self.assertIsNone(profile_module.token_predicate(tokens, 0))

    def test_punctuation_separated_repetition_is_not_an_adjacent_pair(self):
        tokens = [
            Token("慢", "a", "maan6"),
            Token("，", "", None),
            Token("慢", "a", "maan2"),
            Token("行", "v", "hang4"),
        ]
        self.assertIsNone(profile_module.token_predicate(tokens, 0))

    def test_event_repetition_with_haa5_is_not_misread_as_exact_halves(self):
        tokens = [
            Token("行行下", "v", "haang4haang4haa5"),
            Token("跌", "v", "dit3"),
        ]
        self.assertIsNone(profile_module.token_predicate(tokens, 0))

    def test_names_and_kin_terms_remain_mechanical_controls(self):
        tokens = [Token("太太", "n", "taai3taai2"), Token("會", "vu", "wui5")]
        match = profile_module.token_predicate(tokens, 0)
        self.assertIsNotNone(match)
        assert match is not None
        self.assertEqual(match.extra_fields["baseSurface"], "太")
        self.assertEqual(match.extra_fields["matchedHkcancorTag"], "n")

    def test_profile_identity_and_outputs_are_stable(self):
        profile = profile_module.QUERY_PROFILES[profile_module.PROFILE_KEY]
        self.assertEqual(profile.query_id, "HKCANCOR-AA84-BARE-REDUP-R1")
        self.assertEqual(profile.candidate_id_prefix, "aa84br-")
        self.assertEqual(
            profile.inventory_tsv,
            "hkcancor-aa84-bare-redup-candidate-inventory.tsv",
        )
        self.assertEqual(profile_module.LOCAL_PREDICATE_WINDOW_LEXICAL, 5)


if __name__ == "__main__":
    unittest.main()
