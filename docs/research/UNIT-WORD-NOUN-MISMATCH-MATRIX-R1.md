---
title: Unit-word and noun-choice mismatch matrix R1
status: findings_complete
work_claim: 361
intake_issue: 334
matrix: review-packets/corpus-review/UNIT-WORDS/observed-unit-word-noun-matrix-r1.tsv
source_ledger: docs/research/UNIT-WORD-NOUN-MISMATCH-SOURCE-LEDGER-R1.tsv
reviewed_on: 2026-07-31
---

# Unit-word and noun-choice mismatch matrix R1

## Outcome

This review freezes a bounded evidence matrix for unit-word and noun pairings already exposed by repository sources, runtime rules, fixtures, survey material, learner material, or the frozen HKCanCor corpus. It does not create a universal classifier-compatibility table and authorizes no runtime change.

The matrix keeps five questions separate:

1. **Unit-word sense:** sortal classifier, general classifier, honorific classifier, container measure, collective measure, or plural/amount determiner.
2. **Construction profile:** for example `Num-UNIT-N`, `Dem-UNIT-N`, or `UNIT-N`.
3. **Pair evidence:** direct lexical attestation, corpus occurrence, source-supported alternative, unresolved pairing, or ordinary-reading mismatch.
4. **Structural eligibility:** whether all overt components can be represented without inserting or deleting material.
5. **Downstream policy:** descriptive evidence only, preserve current behavior pending evidence, candidate for later controlled implementation, or keep blocked under the ordinary literal reading.

Conflating these dimensions caused earlier overclaims. A structurally complete `Num-UNIT-N` string may still contain an unsupported noun–unit pairing. Conversely, corpus absence does not establish ungrammaticality.

## Evidence rules

- Primary and reference sources may establish classifier or measure senses and directly attested pairings.
- HKCanCor establishes occurrence in a bounded Hong Kong conversational corpus. Counts do not establish categorical preference, productivity, or dialect-wide availability.
- Runtime rules and executable fixtures establish implementation behavior only. They have zero independent linguistic-evidence weight.
- General-classifier substitution, register-conditioned alternatives, and lexical polysemy are recorded rather than collapsed into one preferred answer.
- Semantically coerced readings are not used to license an ordinary literal pairing.

## Main findings

### General and honorific person classifiers

`個` is directly supported as a general classifier and is corpus-attested with ordinary person nouns, including `老師` and `醫生`. `位` remains a source-supported respectful or honorific alternative. The evidence does not justify encoding `位` as universally preferred, or `個` as categorically excluded, for professional nouns.

### Vehicle and machine classifiers

`架` and `部` overlap but are not freely interchangeable. Corpus and lexical evidence support `架車`, `部車`, `部電話`, `部機`, and sense-dependent `架機`. A broad machine sense for `架` does not by itself license `架電話`; that pairing remains unresolved pending pair-specific evidence.

### Container measures

`杯` and `碗` in `杯茶`, `杯水`, and `碗飯` express container-content measures, not sortal classification of tea, water, or rice. Structurally complete strings such as `杯書` remain blocked under ordinary literal readings. Context can create a different coercive measure interpretation, but that must not be silently generalized.

### Sortal pairings

The matrix records directly supported or corpus-attested pairings such as `本書`, `張紙`, `支筆`, `件衫`, `間屋`, `間餐廳`, `對鞋`, `把刀`, and `條魚`. Ordinary literal mismatches such as `本水`, `張水`, and `間醫生` are recorded as noun–unit incompatibilities, not structural NP failures.

### `啲`

`啲` is treated separately from singular sortal classifiers. It can quantify plural count nouns or amounts of mass nouns, but it does not license singular individuated readings merely because a noun can otherwise occur with a classifier.

## Matrix interpretation

The canonical matrix is:

`review-packets/corpus-review/UNIT-WORDS/observed-unit-word-noun-matrix-r1.tsv`

Each row records provenance, pair status, structural status, downstream policy, context, competing analyses, and confidence. `candidate_for_later_controlled_implementation` is not an implementation authorization. `preserve_current_runtime_only_until_pair_evidence` explicitly marks implementation behavior that lacks independent pair-level support.

## Boundaries and unresolved questions

The current evidence does not establish:

- an exhaustive classifier inventory;
- universal classifier–noun compatibility;
- equal preference among alternatives;
- unrestricted general-classifier substitution;
- dialect-wide or register-neutral judgments;
- the conventionality of every possible container measure;
- productive coercion rules;
- parser promotion, status change, fixture replacement, or release readiness.

Future implementation work must cite the exact matrix row and independently justify any binary parser policy. Where evidence remains `unreviewed`, `ambiguous`, or `speaker_or_register_limited`, the correct action is to preserve uncertainty rather than convert it into a hard allow/block rule.

## Protected state

This findings package changes no UUID, construction identity, linguistic status, runtime behavior, executable fixture, classifier compatibility data, classifier/measure typing, learner-facing label, survey, release, or deployment state.
