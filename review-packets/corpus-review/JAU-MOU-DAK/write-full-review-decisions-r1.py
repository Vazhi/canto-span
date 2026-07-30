#!/usr/bin/env python3
"""Write complete expert decisions for the 95-row 有得／冇得 corpus inventory.

Every row was reviewed with its utterance and adjacent turns. The default path applies only
to transparent overt-predicate examples; every nontransparent, repaired, elliptical,
code-switched, noun-like, or idiomatic case is listed explicitly below.
"""

from __future__ import annotations

import csv
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
PACKET = ROOT / "review-packets/corpus-review/JAU-MOU-DAK/full-review-packet-r1.tsv"
OUTPUT = ROOT / "review-packets/corpus-review/JAU-MOU-DAK/full-review-decisions-r1.tsv"

FIELDS = [
    "candidate_id",
    "expert_class",
    "semantic_subtype",
    "composition_status",
    "polarity_or_clause_profile",
    "decision_confidence",
    "decision_reason",
]

SEMANTIC_BY_PREDICATE = {
    "平": "bargainability_or_price_condition",
    "去": "access_or_participation",
    "走": "permission_or_release",
    "睇": "access_to_viewing",
    "參加": "participation_opportunity",
    "揀": "choice_availability",
    "選擇": "choice_availability",
    "享用": "benefit_access",
    "要求": "entitlement_or_permission",
    "剪": "practical_possibility",
    "放假": "time_off_availability",
    "計": "calculability_or_compensation_availability",
    "發展": "development_prospect",
    "interview": "selection_opportunity",
    "in": "selection_opportunity",
    "減": "reduction_possibility",
    "攞": "qualification_or_entitlement",
    "食": "food_access",
    "讀": "education_access_or_qualification",
    "出糧": "payment_scheduling",
    "爆冷": "event_possibility",
    "做": "work_or_role_opportunity",
    "用": "use_opportunity",
    "賣": "market_availability",
    "拍戲": "role_opportunity",
    "聚": "social_opportunity",
    "停": "practical_impossibility",
    "玩": "recreation_opportunity",
    "控制": "practical_control_possibility",
    "醫": "treatability",
    "俾": "permission_or_opportunity",
    "話": "permission_or_option",
    "原地踏步": "progress_constraint",
    "搞": "practical_possibility",
    "交易": "transaction_possibility",
}

# candidate_id -> (class, subtype, composition, clause profile, confidence, reason)
OVERRIDES = {
    "jmd-82d02d2e694ac3667241": (
        "elliptical_opportunity",
        "reformulated_negative_availability",
        "truncated_then_paraphrased",
        "negative_self_repair",
        "medium",
        "冇得 is cut off and immediately paraphrased with 你唔可以; the availability meaning is recoverable, but no following predicate belongs to the target span.",
    ),
    "jmd-e6f23de440a829e7c6f6": (
        "ambiguous_boundary",
        "ordering_or_sequence_availability",
        "predicate_category_unresolved",
        "affirmative_conditional_clause",
        "medium",
        "有得 precedes 順序 and a larger 連埋-number expression; the opportunity reading is plausible, but the exact predicate boundary and category are unresolved.",
    ),
    "jmd-a581f40a90aee290c9b9": (
        "repair_or_unusable",
        "abandoned_negative_start",
        "speech_repair",
        "negative_repair",
        "high",
        "The first 冇得 is interrupted by a hyphen and immediately restarted; only the second occurrence supplies a reviewable predicate.",
    ),
    "jmd-f95fccb4087916e0d876": (
        "ambiguous_boundary",
        "selection_opportunity",
        "code_switched_nominal_or_predicate",
        "affirmative_declarative",
        "medium",
        "有得 precedes English second interview material whose corpus category does not establish whether a verbal predicate, nominal complement, or zero verb is present.",
    ),
    "jmd-43ee36eaca12bffbc7ab": (
        "ambiguous_boundary",
        "development_prospect",
        "postpredicate_disfluency",
        "affirmative_declarative",
        "medium",
        "The intended 有得發展 reading is clear, but the following 得會 sequence is disfluent and prevents a confident full-span analysis.",
    ),
    "jmd-02ac16042696cf7e5b0c": (
        "ambiguous_boundary",
        "lexically_uncertain_opportunity",
        "predicate_lexeme_unresolved",
        "affirmative_declarative",
        "medium",
        "The following predicate 掹 is explicitly queried by the interlocutor; the availability frame is plausible but the lexical interpretation is unresolved.",
    ),
    "jmd-22c3ad42032370521a4f": (
        "ambiguous_boundary",
        "meal_access",
        "noun_interposed_or_noncanonical_complement",
        "affirmative_declarative",
        "low",
        "有得飯食 contains noun 飯 before 食 and does not match the directly supported 有得 + overt VP order without an additional analysis.",
    ),
    "jmd-ddf2f730c1317ee62620": (
        "compositional_opportunity",
        "limited_food_opportunity",
        "preverbal_unit_plus_adverbial_predicate",
        "negative_declarative",
        "medium",
        "Context supports inability to meaningfully try local food; 點 modifies the following 食 predicate rather than replacing it.",
    ),
    "jmd-767274c418d1efcbd4a0": (
        "ambiguous_boundary",
        "discount_availability",
        "noun_or_property_predicate_unresolved",
        "negative_declarative",
        "medium",
        "冇得特價 has a transparent no-discount interpretation, but HKCanCor tags 特價 as nominal and the exact predicate structure is unresolved.",
    ),
    "jmd-b3c86a3df7459f6fb3bb": (
        "lexicalized_or_idiomatic",
        "discourse_no_argument",
        "semi_lexicalized_mou_dak_gong",
        "negative_declarative",
        "high",
        "冇得講 functions as a discourse formula meaning there is no argument or nothing further to say, not ordinary denial of an externally available speaking event.",
    ),
    "jmd-4603d2ccaab71614435a": (
        "lexicalized_or_idiomatic",
        "discourse_no_argument",
        "semi_lexicalized_mou_dak_gong",
        "negative_question",
        "high",
        "In the 天意 context, 冇得講 is a conventional discourse evaluation rather than literal speech unavailability.",
    ),
    "jmd-62afd3e69b1615d768a5": (
        "lexicalized_or_idiomatic",
        "discourse_no_argument",
        "semi_lexicalized_mou_dak_gong",
        "negative_declarative",
        "high",
        "噉你噉講冇得講喇 is a conventional response meaning the argument is closed by the premise.",
    ),
    "jmd-5c20cfaf42cb06138915": (
        "lexicalized_or_idiomatic",
        "discourse_inevitability_or_no_remedy",
        "semi_lexicalized_mou_dak_gong",
        "negative_declarative",
        "high",
        "The statement about universal brand worship uses 冇得講 as an evaluative no-remedy formula, not a literal inability to speak.",
    ),
    "jmd-5451cf4f5ee55d5bd4d8": (
        "lexicalized_or_idiomatic",
        "evaluative_beyond_dispute",
        "semi_lexicalized_mou_dak_gong",
        "negative_declarative",
        "high",
        "The thumbs-up context makes 冇得講 an emphatic positive evaluation, distinct from productive opportunity negation.",
    ),
    "jmd-dee50989645bc7ff1b9c": (
        "lexicalized_or_idiomatic",
        "evaluative_beyond_dispute",
        "semi_lexicalized_mou_dak_gong",
        "negative_fragment",
        "high",
        "The standalone response 冇得講 continues the preceding thumbs-up evaluation and is formulaic.",
    ),
    "jmd-23d75ff14dd681fdcc80": (
        "lexicalized_or_idiomatic",
        "evaluative_excellence",
        "lexicalized_single_token_mou_dak_ding",
        "lexicalized_negative_form",
        "high",
        "冇得頂 is one corpus token and an evaluative idiom meaning unsurpassable; it is a negative boundary for productive 冇得 + VP.",
    ),
    "jmd-5cc50147c4eedd28c543": (
        "lexicalized_or_idiomatic",
        "evaluative_excellence",
        "lexicalized_single_token_mou_dak_ding",
        "lexicalized_negative_form",
        "high",
        "冇得頂 is one corpus token and an evaluative idiom meaning unsurpassable; it is not compositional opportunity negation.",
    ),
    "jmd-a17aaf547bf76cde4a60": (
        "lexicalized_or_idiomatic",
        "evaluative_excellence",
        "lexicalized_single_token_mou_dak_ding",
        "lexicalized_negative_form",
        "high",
        "The fused token 冇得頂 is an evaluative idiom, regardless of the unclear referent 大單.",
    ),
    "jmd-31643095d702be0777e3": (
        "lexicalized_or_idiomatic",
        "incomparability_or_uncalculability",
        "semi_lexicalized_mou_dak_gai",
        "negative_declarative",
        "medium",
        "真係冇得計 is compatible with a conventional 'cannot be reckoned/compared' evaluation; the local context does not support a narrow literal calculation event.",
    ),
    "jmd-56ffad37bd471f2083d6": (
        "lexicalized_or_idiomatic",
        "discourse_no_argument",
        "semi_lexicalized_mou_dak_gong",
        "negative_declarative",
        "high",
        "根本冇得講 is formulaic discourse evaluation rather than literal speaking opportunity.",
    ),
    "jmd-0fca42095493105f46d4": (
        "lexicalized_or_idiomatic",
        "worth_considering",
        "semi_lexicalized_yau_dak_nam",
        "affirmative_declarative",
        "medium",
        "有得諗 conventionally means that an option is worth considering; it remains related to opportunity but is not a neutral freely substitutable VP example.",
    ),
    "jmd-759a88c315a290e7cc2a": (
        "repair_or_unusable",
        "abandoned_negative_start",
        "speech_repair",
        "negative_repair",
        "high",
        "冇得 is abandoned after a hyphen and replaced by 冇乜點停; no target predicate completes the first span.",
    ),
    "jmd-fe39bce00dda5e96e624": (
        "repair_or_unusable",
        "abandoned_negative_start",
        "speech_repair",
        "negative_repair",
        "high",
        "冇得 is interrupted and followed by 唔讀 in a self-repair; the row cannot establish 冇得唔讀 or another completed profile.",
    ),
    "jmd-6d06e899e87e9f2a73d6": (
        "ambiguous_boundary",
        "rhetorical_possibility_denial",
        "code_switched_nominal_or_predicate",
        "rhetorical_affirmative_question",
        "medium",
        "邊有得 surprise is a rhetorical denial of possibility, but English surprise may be nominal or predicative and the exact 有得 complement structure is unresolved.",
    ),
    "jmd-52ccdf0568ab3134d6f2": (
        "elliptical_opportunity",
        "activity_availability",
        "predicate_ellipsis_recoverable_from_topic",
        "affirmative_fragment",
        "high",
        "BBQ呢又有得 ends after 有得; the BBQ topic and next turn recover an available barbecue activity without an overt following predicate.",
    ),
    "jmd-ac700a9984d7700c18b6": (
        "compositional_opportunity",
        "progress_constraint",
        "preverbal_unit_plus_complex_predicate",
        "negative_declarative",
        "high",
        "冇得 precedes the predicate phrase 原地踏步; the corpus X tag does not erase the overt practical-impossibility relation.",
    ),
    "jmd-ca926364d76ea781e87c": (
        "compositional_opportunity",
        "creative_opportunity_denial",
        "preverbal_unit_plus_predicate_after_repair",
        "negative_declarative",
        "medium",
        "After a separate aborted 冇, the complete span 冇得俾你創作 transparently denies an opportunity to create.",
    ),
    "jmd-6e9197c8a15312c643f6": (
        "polar_opportunity_question",
        "market_or_planning_opportunity",
        "polarity_over_availability_with_discourse_marker",
        "matrix_polar_question",
        "medium",
        "內地有冇得即係諗下 is disfluent but retains a polarity question about whether the mainland market offers room to consider the proposal.",
    ),
    "jmd-57b9b2e3d8ae1826fb40": (
        "lexicalized_or_idiomatic",
        "discourse_no_argument",
        "semi_lexicalized_mou_dak_gong",
        "negative_fragment",
        "medium",
        "The isolated 冇得講 follows a factual correction and is best retained as a conventional discourse response rather than literal speech unavailability.",
    ),
    "jmd-2c0d7963a1df74385176": (
        "lexicalized_or_idiomatic",
        "unworkability",
        "semi_lexicalized_mou_dak_gaau",
        "negative_fragment",
        "medium",
        "Standalone 冇得搞 means the matter is unworkable; it is semantically related to practical possibility but conventionalized beyond a specific overt event.",
    ),
    "jmd-78b3d8509838a8095692": (
        "lexicalized_or_idiomatic",
        "discourse_inevitability_or_no_argument",
        "semi_lexicalized_mou_dak_gong",
        "negative_declarative",
        "medium",
        "Final 冇得講 functions as a discourse conclusion after a suggestion, not as literal deprivation of speaking opportunity.",
    ),
    "jmd-20a02f1b213a7346c3ee": (
        "compositional_opportunity",
        "transaction_possibility",
        "split_tokenization_genuine_candidate",
        "affirmative_declarative",
        "medium",
        "The split corpus tokens 有 + 得 precede 交易 and express that a deal is possible at the stated price; the tokenization differs but the surface relation is transparent.",
    ),
    "jmd-ab6fa06da402fc164f5f": (
        "compositional_opportunity",
        "job_enabled_recurring_travel",
        "preverbal_unit_plus_adverbial_predicate",
        "affirmative_declarative",
        "high",
        "有得 scopes over the complex predicate 成日返大陸; the intervening adverb does not remove the opportunity interpretation.",
    ),
    "jmd-38f903bf2642c2227e7e": (
        "compositional_opportunity",
        "recreation_opportunity",
        "preverbal_unit_plus_motion_predicate",
        "affirmative_declarative",
        "high",
        "有得 precedes 去玩下; the corpus ADP tag on 去 is an annotation issue, while the overt motion-purpose predicate is clear.",
    ),
}


def default_semantic(row: dict[str, str]) -> str:
    return SEMANTIC_BY_PREDICATE.get(
        row["nearest_right_lexical_word"], "general_circumstantial_opportunity"
    )


def default_profile(row: dict[str, str], polarity: str) -> str:
    text = row["text"]
    if "?" in text:
        return f"{polarity}_surface_question"
    return f"{polarity}_declarative"


def decide(row: dict[str, str]) -> tuple[str, str, str, str, str, str]:
    candidate_id = row["candidate_id"]
    if candidate_id in OVERRIDES:
        return OVERRIDES[candidate_id]

    kind = row["profile_kind"]
    predicate = row["nearest_right_lexical_word"] or "<ELLIPSIS>"

    if kind == "polar_yau_mou_dak":
        profile = "embedded_polar_question" if "唔知" in row["text"] else "matrix_polar_question"
        return (
            "polar_opportunity_question",
            default_semantic(row),
            "polarity_over_availability_unit",
            profile,
            "high",
            f"Full-context review: overt 有 + 冇得 scopes over following material {predicate} and asks whether the relevant opportunity or availability exists.",
        )

    if kind == "negative_fused_lexeme_diagnostic":
        raise AssertionError(f"fused lexical item missing explicit decision: {candidate_id}")

    polarity = "affirmative" if kind.startswith("affirmative") else "negative"
    if row["following_predicate_candidate"] != "true":
        raise AssertionError(f"nonpredicate candidate missing explicit decision: {candidate_id}")

    composition = (
        "split_tokenization_genuine_candidate"
        if kind.endswith("split_diagnostic")
        else "productive_preverbal_unit_plus_predicate"
    )
    return (
        "compositional_opportunity",
        default_semantic(row),
        composition,
        default_profile(row, polarity),
        "high",
        f"Full-context review: overt {row['matched_surface_span']} precedes predicate {predicate} and transparently expresses circumstantial availability, opportunity, access, permission, qualification, or practical possibility in context.",
    )


def main() -> None:
    with PACKET.open(encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle, delimiter="\t"))
    if len(rows) != 95:
        raise SystemExit(f"expected 95 packet rows, found {len(rows)}")

    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDS, delimiter="\t", lineterminator="\n")
        writer.writeheader()
        for row in rows:
            decision = decide(row)
            writer.writerow(dict(zip(FIELDS, [row["candidate_id"], *decision], strict=True)))
    print(f"wrote {len(rows)} complete decisions to {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
