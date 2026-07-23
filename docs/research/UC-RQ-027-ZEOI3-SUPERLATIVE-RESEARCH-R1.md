---
title: UC-RQ-027 — zeoi3 superlative construction research
research_id: UC-RQ-027
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-027 — `zeoi3` superlative construction research

## Research decision

A dedicated research unit is justified for Cantonese preverbal or pre-predicate
`最 zeoi3`. Direct sources identify it as a superlative marker and document a
ranking interpretation with a property predicate, a preference predicate taking a
VP complement, and a spatial localizer. This relation cannot be preserved by a
generic degree-modifier node: a superlative selects an extremal member or value
relative to a comparison set, even when that set is supplied only by context.

The safest checked core is therefore:

```text
comparee/topic + zeoi3 + gradable or rankable predicate
    -> the comparee occupies an extremal position in a contextually supplied set
```

The direction of the extremum follows the predicate scale; the checked sources do
not justify a universal token-level algorithm for comparison-set recovery,
predicate licensing, or maximum/minimum direction.

This note does **not** authorize a parser label, lexical expansion, productive
acceptance, comparison-set inference, or changes to current degree templates.

## Safest checked profiles

The direct evidence supports these bounded profiles:

- `zeoi3 + adjective/stative predicate`, explicitly described as superlative;
- subject plus `zeoi3 + zung1ji3 + VP`, ranking preferences over contextual
  alternatives;
- `zeoi3 + disyllabic spatial localizer`, analyzed as degree modification rather
  than nominal modification;
- predicate-only `zeoi3 + predicate` surfaces, while any omitted subject remains
  a separate null-argument question under UC-RQ-025.

These profiles establish more than ordinary degree intensity, but they do not
establish every NP-internal, headless, explicit-set, lexicalized, or modal use.

## Checked source findings

The source-verification ledger is:

`UC-RQ-027-ZEOI3-SUPERLATIVE-SOURCE-VERIFICATION-R1.tsv`

### Wong 2023

The checked full-text monograph lists `最 zeoi3` “most” among degree adverbs and
states that these forms indicate the degree or extent of the state expressed by
an adjective or stative verb. It gives `我最鍾意食花生` “I like to eat peanuts
the most,” demonstrating a subject, preverbal `最`, a preference predicate, and
its following VP complement. Its comparison section separately states that `最`
is placed before an adjective to indicate the superlative.

This evidence supports preverbal/pre-predicate placement and contextual ranking,
but not an explicit comparison-set phrase or an unrestricted host inventory.

### Matthews and Yip 2011

The official CUHK grammar companion has a section headed “Superlatives” and gives
`最衰係你` (`zeoi3 seoi1 hai6 nei5`) with the pragmatic translation “It's all
your fault.” The example independently supports a pre-predicate superlative
profile. Its idiomatic translation does not license automatic compositional
analysis of every `最 + property` string.

### Lam 2013

Lam's doctoral thesis states that Cantonese `zeoi` can precede disyllabic
localizers and gives `喺禮堂最後面` (`hai2 lai5tong4 zeoi3 hau6-min6`) “at the
most back of the hall.” The analysis uses the distribution of the superlative
marker as evidence for a degree projection above the localizer.

This is a specialized spatial construction. It proves that the host class is not
identical to ordinary lexical adjectives, but it does not justify treating every
lexical `最…` compound as a productive superlative phrase.

## Exact collision audit

The collision ledger is:

`UC-RQ-027-ZEOI3-SUPERLATIVE-COLLISION-AUDIT-R1.tsv`

### `DegreeStativePredicate`

The existing surface family can act as a carrier for a degree word plus a stative
predicate, but its generic degree relation does not record an extremum or a
comparison set. Moreover, the reviewed current slot inventory recognizes other
degree markers but does not make lexical `degree_superlative` sufficient, and the
frozen `最貴` case currently has no top construction. The overlap is therefore
partial, not a lossless merger.

### `ScalarEvaluation`

The surviving narrow label covers lexical negative `唔算 + property`. It does not
contain `最`, rank alternatives, or select an extremal member. A shared scalar
domain is not enough to merge the constructions.

### Comparative families

UC-RQ-005 `過` relates a comparee to an overt standard. UC-RQ-026 post-predicate
`啲` expresses scalar difference or requested adjustment. A `最` superlative
instead ranks a comparee among a set of alternatives. These relations may share a
scale, but their overt arguments and semantic outputs differ.

## Quarantined boundaries

Future research must independently establish:

- overt comparison-set phrases such as “among/in X” and their attachment;
- whether explicit sets may precede or follow the superlative predicate;
- NP-internal `zeoi3 + property + noun` and classifier requirements;
- headless `zeoi3 + predicate + ge3`, including composition with UC-RQ-023;
- the host classes of adjectives, stative verbs, cognition/preference verbs,
  localizers, quantities, temporal expressions, and event predicates;
- predicate-only clauses versus null subjects or discourse fragments;
- scale direction, ties, uniqueness, vagueness, and contextual domain recovery;
- `最 + 好 + VP` as compositional “best” versus modal “had better”;
- lexicalized or bound expressions such as `最近`, `最後`, `最初`, `最多`, and
  `最少`;
- negation, aspect, focus, final particles, register, and regional variation.

Nominal/headless composition, explicit comparison-set syntax, and lexicalized or
modal readings remain quarantined rather than inferred from translations.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is pre-predicate Cantonese `zeoi3` directly described as superlative? | **Yes.** |
| Can it rank a preference predicate with a following VP? | **Yes.** |
| Can it modify a spatial localizer? | **Yes, in one direct specialized source.** |
| Does generic degree modification preserve extremal ranking? | **No.** |
| Is an overt comparison-set construction directly established here? | **No; quarantined.** |
| Are nominal/headless and lexicalized/modal profiles established? | **No; separate or quarantined.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-027 may leave active research only after predicate selection, explicit and
implicit comparison-set realization, NP/headless composition, lexicalized/modal
boundaries, and contextual ranking semantics support a typed construction,
lossless compositional merger, continued quarantine, or evidence-based retirement.
