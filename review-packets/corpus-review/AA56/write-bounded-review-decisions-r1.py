#!/usr/bin/env python3
"""Write complete expert decisions for the bounded AA56 review packet.

Every packet row is assigned explicitly to exactly one reviewed class. Grouping
only reduces repetition in the decision file; it is not an automatic classifier.
"""

from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path


PACKET = Path(__file__).resolve().parent / "bounded-review-packet-r1.tsv"
OUTPUT = Path(__file__).resolve().parent / "bounded-review-decisions-r1.tsv"


@dataclass(frozen=True)
class DecisionTemplate:
    expert_class: str
    profile_disposition: str
    span_recommendation: str
    decision_confidence: str
    decision_reason: str
    source_limit_or_note: str


GROUPS: dict[str, set[int]] = {
    "positive_np_predication_core": {
        6, 22, 26, 27, 29, 34, 41, 42, 61, 66, 69, 75, 82, 86, 87, 91,
        93, 94, 102, 105, 107, 108, 110, 111, 115, 120, 124, 128, 134,
        136, 140, 145, 150, 156, 160, 162, 167, 168, 170, 173, 174, 175,
        178, 179,
    },
    "layered_place_plus_positive_predication": {4, 117},
    "positive_topic_chain_extended": {44},
    "partitive_indefinite_subject_not_marker": {
        7, 9, 18, 68, 85, 99, 104, 126, 139, 152, 153, 154, 155, 158,
        159, 163,
    },
    "bare_existential_or_listing": {
        14, 21, 23, 39, 46, 48, 49, 67, 73, 83, 89, 96, 97, 100, 116,
        147, 169, 177,
    },
    "existential_interrogative_or_complement": {47, 59, 103, 138},
    "aa55_possession_or_subject_have": {
        10, 20, 25, 33, 38, 43, 53, 57, 60, 65, 71, 88, 112, 119,
    },
    "aa77_overt_place_existential": {
        2, 3, 5, 24, 45, 51, 63, 74, 76, 77, 80, 92, 98, 101,
    },
    "negative_human_quantificational_clause": {
        12, 15, 16, 17, 81, 84, 118, 122, 123, 141, 142, 143, 144, 149,
        157, 161, 165, 166, 172, 176,
    },
    "negative_existential_or_availability_complement": {1, 31, 95},
    "event_negation_or_minimizer": {11, 30, 64},
    "negative_property_or_discourse_absence": {13, 19, 52, 54, 55},
    "lexicalized_or_fixed_expression": {32, 40, 58, 78, 129, 130, 137},
    "temporal_or_conditional_have": {62, 90, 127, 132, 135},
    "wh_degree_or_quantity": {70, 72, 106},
    "repair_or_unusable": {8, 28, 35, 50, 56, 79, 109, 125, 148, 151},
    "ambiguous_boundary": {36, 113, 114, 131, 133, 146, 164, 171},
    "lexical_compound_false_positive": {37},
    "rhetorical_polarity_human": {121},
}


TEMPLATES = {
    "positive_np_predication_core": DecisionTemplate(
        "positive_np_predication_core",
        "retain_as_narrow_positive_aa56_evidence",
        "有 + overt indefinite NP + predicate whose argument is that NP",
        "high",
        "The overt 有 introduces an indefinite nominal and the following verbal, adjectival, copular, modal, or locative predicate is predicated of that nominal.",
        "Supports the positive source-linked family only; it does not prove a negative 冇 counterpart or one mandatory predicate subtype.",
    ),
    "layered_place_plus_positive_predication": DecisionTemplate(
        "layered_place_plus_positive_predication",
        "compose_aa77_place_with_positive_aa56_predication",
        "overt place/domain + [有 + indefinite NP + NP-linked predicate]",
        "high",
        "An overt place or domain scopes over a locally complete participant-introducing positive clause.",
        "The place belongs to AA77-level locative structure and must not be hidden inside the AA56 participant-introduction span.",
    ),
    "positive_topic_chain_extended": DecisionTemplate(
        "positive_topic_chain_extended",
        "quarantine_as_extended_discourse_profile",
        "有 + introduced NP + following topic/possessor chain",
        "medium",
        "The utterance introduces a participant, but the following clause predicates directly of a possessed body part rather than transparently of the introduced NP.",
        "Compatible with broader discourse presentation, but not sufficient to widen the narrow NP-predicate identity automatically.",
    ),
    "partitive_indefinite_subject_not_marker": DecisionTemplate(
        "partitive_indefinite_subject_not_marker",
        "exclude_from_aa56_marker_evidence",
        "有啲 / 有啲人 as an indefinite determiner or partitive pronoun + predicate",
        "high",
        "Here 有啲 functions as 'some/some of them' and forms the subject nominal itself; the row does not independently establish existential-marker 有 followed by a separate NP.",
        "HKCanCor token boundaries cannot decide grammatical segmentation; these rows are contrastive evidence against a token-only AA56 rule.",
    ),
    "bare_existential_or_listing": DecisionTemplate(
        "bare_existential_or_listing",
        "route_to_bare_existential_or_inventory_profile",
        "有／冇 + nominal, without a locally NP-linked following predicate",
        "high",
        "The row asserts, questions, lists, or denies existence/availability of nominal material, but the mechanically located later predicate is absent, internal to the NP, or belongs to another clause.",
        "Does not satisfy the source-linked AA56 NP-plus-predicate endpoint; positive and negative bare existence require separate typing.",
    ),
    "existential_interrogative_or_complement": DecisionTemplate(
        "existential_interrogative_or_complement",
        "separate_existential_complement_profile",
        "matrix or embedded existential/wh complement, not a simple asserted participant introduction",
        "medium",
        "The 有 phrase is interrogative, free-choice, or selected as a complement of another predicate; its internal nominal-predicate relation is not the ordinary asserted AA56 profile.",
        "May share existential semantics, but question force and embedding must remain overt rather than donated to AA56.",
    ),
    "aa55_possession_or_subject_have": DecisionTemplate(
        "aa55_possession_or_subject_have",
        "exclude_from_aa56_and_route_to_aa55_or_subject_predication",
        "overt subject/possessor + 有／冇 + possessed or associated nominal",
        "high",
        "An overt possessor, experiencer, institution, or affected subject precedes 有／冇, so the nominal is possessed, associated, or predicated of that subject rather than introduced subjectlessly.",
        "Directly contrasts with Lam, Lau, and Lee's subjectless existential-marker analysis.",
    ),
    "aa77_overt_place_existential": DecisionTemplate(
        "aa77_overt_place_existential",
        "exclude_from_aa56_and_route_to_aa77",
        "overt place/domain + 有／冇 + nominal",
        "high",
        "The clause contains an overt local place or domain before 有／冇 and asserts existence or absence within that domain.",
        "AA77 owns the overt-place relation; no silent deletion of the place is permitted.",
    ),
    "negative_human_quantificational_clause": DecisionTemplate(
        "negative_human_quantificational_clause",
        "separate_negative_quantificational_sibling",
        "冇人 + predicate ('nobody/no one predicates')",
        "high",
        "冇人 supplies a negative human quantifier or negative existential subject and the following predicate states what no person does or is.",
        "The sources inspected do not establish this as the morphological negative of positive participant-introducing AA56; keep the asymmetry explicit.",
    ),
    "negative_existential_or_availability_complement": DecisionTemplate(
        "negative_existential_or_availability_complement",
        "separate_negative_existential_or_availability_profile",
        "冇 + nominal + activity/availability complement",
        "high",
        "The clause denies available things, food, work, or analogous nominal material and may license a following activity complement, rather than introducing a participant for predication.",
        "Related existential semantics do not prove identity with positive presentational AA56.",
    ),
    "event_negation_or_minimizer": DecisionTemplate(
        "event_negation_or_minimizer",
        "exclude_as_clausal_event_negation",
        "subject/context + 冇乜/冇 + event predicate",
        "high",
        "The visible material minimizes or negates an event/frequency profile, not existence of an introduced NP.",
        "Law's clausal 冇 boundary and the overt event predicate prevent a token-only existential analysis.",
    ),
    "negative_property_or_discourse_absence": DecisionTemplate(
        "negative_property_or_discourse_absence",
        "exclude_as_property_or_discourse_profile",
        "冇 + property/discourse nominal or proform",
        "high",
        "The row expresses absence of a property, change, feature, or discourse referent; any later predicate is not linked to an introduced nominal.",
        "Negative spelling alone cannot donate positive presentational evidence.",
    ),
    "lexicalized_or_fixed_expression": DecisionTemplate(
        "lexicalized_or_fixed_expression",
        "exclude_or_lexically_quarantine",
        "fixed 有／冇 expression",
        "high",
        "The matched sequence is a conventional modal, reason, discourse, or evaluative expression whose meaning and syntax are not a productive introduced-NP predication.",
        "Requires lexical or construction-specific handling before parser promotion.",
    ),
    "temporal_or_conditional_have": DecisionTemplate(
        "temporal_or_conditional_have",
        "exclude_as_temporal_or_conditional_structure",
        "有 + time/event/condition nominal + independent clause",
        "high",
        "The nominal supplies a time, occasion, duration, or condition for the following clause rather than serving as its introduced participant subject.",
        "Do not reinterpret temporal adjunct structure as AA56 merely because a later predicate exists.",
    ),
    "wh_degree_or_quantity": DecisionTemplate(
        "wh_degree_or_quantity",
        "exclude_as_measure_or_quantity_question",
        "有幾/有幾多 or other measure-question material",
        "high",
        "The matched sequence belongs to degree, quantity, or measure interrogation rather than existential participant introduction.",
        "POS ambiguity around 幾 and classifiers is a mechanical retrieval boundary only.",
    ),
    "repair_or_unusable": DecisionTemplate(
        "repair_or_unusable",
        "exclude_from_productive_evidence",
        "retain overt repair tokens; assign no normalized AA56 span",
        "high",
        "A false start, repetition, truncation, or restart prevents one stable overt construction span from being assigned safely.",
        "The underlying continuation may be grammatical, but repaired corpus material cannot establish the productive boundary by itself.",
    ),
    "ambiguous_boundary": DecisionTemplate(
        "ambiguous_boundary",
        "quarantine_pending_independent_evidence",
        "preserve the overt 有／冇 and nominal material without forcing a construction span",
        "medium",
        "Context permits more than one analysis, including bare existence, possession, ellipsis, object complementation, topic structure, or disfluent predication.",
        "No hidden subject, predicate, place, or argument may be inserted to resolve the ambiguity.",
    ),
    "lexical_compound_false_positive": DecisionTemplate(
        "lexical_compound_false_positive",
        "exclude_as_lexical_compound",
        "lexical 帶有 + complement",
        "high",
        "The character 有 is part of lexical 帶有 'contain/bear', not an independent existential or possessive marker.",
        "Shared orthography and corpus tokenization cannot donate AA56 evidence.",
    ),
    "rhetorical_polarity_human": DecisionTemplate(
        "rhetorical_polarity_human",
        "separate_rhetorical_negative_polarity_profile",
        "邊有人 + predicate",
        "high",
        "The positive-looking 有人 occurs under rhetorical 邊 and conveys that nobody would satisfy the predicate, rather than introducing an actual participant.",
        "Question/polarity force reverses the discourse contribution and must remain represented.",
    ),
}


OVERRIDES: dict[int, dict[str, str]] = {
    8: {
        "decision_confidence": "medium",
        "decision_reason": "After an overt false start, the second 有 introduces 隻船 and 出海 predicates of that NP, but the repaired sequence cannot establish an unrepaired runtime span.",
        "source_limit_or_note": "Underlying material parallels the source-linked positive profile; retain only as repair-aware corroboration.",
    },
    29: {
        "decision_reason": "Subjectless 有 introduces 個 tearing and the following 喺你個 ligament 上邊 supplies a locative predicate of that introduced nominal.",
    },
    34: {
        "decision_reason": "有 introduces 啲機 and 擺咗喺度 predicates a resulting location of those machines; the locative predicate is one subtype of the general source pattern.",
    },
    44: {
        "decision_reason": "有個 BB introduces a participant, but the following overt subject is 隻腳 and the passive predicate applies to that possessed body part.",
    },
    47: {
        "decision_confidence": "medium",
        "decision_reason": "The wh existential asks whether an event-denoting nominal exists and includes 發生, but interrogative force and internal modification make it a boundary rather than a plain asserted AA56 example.",
    },
    66: {
        "decision_reason": "Subjectless 係有 introduces 個分別 and 喺度 is a locative/existential predicate; this is compatible with a locative subtype but does not justify making locative codas mandatory.",
    },
    102: {
        "decision_reason": "有 introduces a relative-modified indefinite human NP and 走埋來 predicates of the complete NP; later 喺度 material belongs to the following accusation, not this span.",
    },
    103: {
        "decision_confidence": "high",
        "decision_reason": "有啲乜嘢問題 is selected by 諗過 as an embedded existential/wh complement; the mechanically found 可能 belongs to the following discourse, not to the introduced nominal.",
    },
    113: {
        "decision_reason": "有一個 introduces an elided referent followed by 我見到, but the missing head and object relation leave bare existence, relative modification, and discourse repair unresolved.",
    },
    114: {
        "decision_reason": "如果有人基督教嗰啲 is disfluent and omits the relation between 人 and 基督教; an existential, copular, or classifier interpretation cannot be selected safely.",
    },
    121: {
        "decision_reason": "邊有人掛住你 is a rhetorical question conventionally conveying that nobody misses the addressee, not an assertion that an indefinite person exists.",
    },
    128: {
        "decision_reason": "有 introduces 三個 programme and 儲咗喺裏邊 predicates their stored result-location; the preceding 我帶三部機去 is a separate clause.",
    },
    131: {
        "decision_reason": "有個問題想問 can mean that the speaker has a question they want to ask; the understood subject of 想問 is not transparently 個問題, so it does not meet the narrow NP-linked-predicate test.",
    },
    133: {
        "decision_reason": "有份成功感喺度 is an abstract experiential/existential expression under 覺得; possession, state predication, and locative idiom remain possible.",
    },
    146: {
        "decision_reason": "有人八十幾分 lacks a locally overt verbal or adjectival predicate; 聽 occurs after a clause break, leaving measure predication or omitted 有 unresolved.",
    },
    164: {
        "decision_confidence": "low",
        "decision_reason": "The heavily disfluent sequence around 重係有人 and the following hypothetical does not expose a stable NP-linked predicate.",
    },
    170: {
        "decision_reason": "有 introduces 個大單 and 真係冇得頂 supplies an evaluative predicate of that nominal; the lexicalized predicate remains separately typed.",
    },
    171: {
        "decision_confidence": "low",
        "decision_reason": "信有人 treats 有人 as a possible complement of 信, while 剁出來 follows after hesitation and may predicate of a different referent; the structure is not recoverable securely.",
    },
}


OUTPUT_FIELDS = [
    "packet_id",
    "candidate_id",
    "selection_strata",
    "source_file",
    "turn_index_zero_based",
    "token_index_zero_based",
    "matched_form",
    "nominal_start_form",
    "later_predicate_form",
    "text",
    "previous_text",
    "next_text",
    "expert_class",
    "profile_disposition",
    "span_recommendation",
    "decision_confidence",
    "decision_reason",
    "source_limit_or_note",
]


def decision_index() -> dict[int, DecisionTemplate]:
    assigned: dict[int, DecisionTemplate] = {}
    for group_name, packet_numbers in GROUPS.items():
        template = TEMPLATES[group_name]
        for number in packet_numbers:
            if number in assigned:
                raise RuntimeError(f"Packet row {number} assigned more than once")
            assigned[number] = template
    return assigned


def main() -> None:
    with PACKET.open(encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle, delimiter="\t"))

    decisions = decision_index()
    expected_numbers = {int(row["packet_id"].rsplit("-", 1)[1]) for row in rows}
    missing = expected_numbers - set(decisions)
    extra = set(decisions) - expected_numbers
    if missing or extra:
        raise RuntimeError(f"Decision coverage mismatch; missing={sorted(missing)} extra={sorted(extra)}")

    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=OUTPUT_FIELDS,
            delimiter="\t",
            lineterminator="\n",
        )
        writer.writeheader()
        for row in rows:
            number = int(row["packet_id"].rsplit("-", 1)[1])
            template = decisions[number]
            decision = {
                "expert_class": template.expert_class,
                "profile_disposition": template.profile_disposition,
                "span_recommendation": template.span_recommendation,
                "decision_confidence": template.decision_confidence,
                "decision_reason": template.decision_reason,
                "source_limit_or_note": template.source_limit_or_note,
            }
            decision.update(OVERRIDES.get(number, {}))
            writer.writerow(
                {
                    "packet_id": row["packet_id"],
                    "candidate_id": row["candidate_id"],
                    "selection_strata": row["selection_strata"],
                    "source_file": row["source_file"],
                    "turn_index_zero_based": row["turn_index_zero_based"],
                    "token_index_zero_based": row["token_index_zero_based"],
                    "matched_form": row["matched_form"],
                    "nominal_start_form": row["nominal_start_form"],
                    "later_predicate_form": row["later_predicate_form"],
                    "text": row["text"],
                    "previous_text": row["previous_text"],
                    "next_text": row["next_text"],
                    **decision,
                }
            )

    print(f"wrote {len(rows)} complete decisions to {OUTPUT}")


if __name__ == "__main__":
    main()
