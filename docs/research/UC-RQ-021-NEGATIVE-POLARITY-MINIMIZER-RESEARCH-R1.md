---
title: UC-RQ-021 — negative-polarity minimizer construction
research_id: UC-RQ-021
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-021 — negative-polarity minimizer construction

## Research decision

A dedicated research unit is justified for the directly attested Cantonese
scalar-negation frame:

```text
jat1 + minimal quantity/classifier unit (+ noun) + dou1 + negative predicate
```

Yip gives `一個都冇食` `jat1 go3 dou1 mou5 sik6` “haven't even eaten
one.” An independently reported Hong Kong advertisement gives
`一個都唔會 Miss` `jat1 go3 dou1 m4 wui5 miss` “won't miss a single
one.” These examples establish both `mou5` and `m4`-containing surfaces,
including a contextually recoverable noun after the classifier.

Davis, Luk, and Winterstein independently show that an ordinary `[jat1 CL N]`
indefinite without `dou1` does not receive the same low-scope “any” reading
under `mou5`. The minimizer therefore cannot be reduced to an ordinary quantity
NP plus independently applied negation.

The checked evidence does **not** establish free substitution among `m4`,
negative-perfective `mou5`, and existential `mou5`, or among all classifiers and
measure units. It also does not establish that the count minimizer and
`一啲都唔 + adjective` “not at all” are one syntactic subtype. This note does
**not** authorize parser behavior, grammar status changes, silent nouns, or
productive acceptance.

## Safest checked core

The checked sources support:

- a preverbal minimal quantity or classifier expression followed by `dou1`;
- an overt negative predicate following `dou1`;
- a scalar interpretation paraphrasable as “not even one” or “not a single”;
- `mou5` before an event predicate in Yip's `jat1 go3 dou1 mou5 sik6` example;
- `m4` before modal `wui5` in the attested advertising example;
- omission of an overt noun when its value is contextually recoverable in the
  two checked count examples;
- a related degree-minimizing `jat1 di1 dou1 m4 + adjective` profile in
  independently supplied Cantonese examples.

The evidence supports the construction family, not unrestricted productivity.
The classifier or measure unit remains semantically material, and the position
of an overt noun has not been tested across subtypes.

## Checked source findings

The source-verification ledger is:

`UC-RQ-021-NEGATIVE-POLARITY-MINIMIZER-SOURCE-VERIFICATION-R1.tsv`

### Yip 2020/2021

Yip's author-hosted full text contrasts Mandarin and Cantonese right
dislocation. Its Cantonese answer contains `一個都冇食啊我`, glossed
`one-CL also NEG.PERF eat SP 1SG` and translated “I haven't even eaten one.”
The example directly verifies the count-minimizer surface and interpretation.
Its primary purpose is to test the sentence-particle requirement in right
dislocation, so it does not supply a full minimizer analysis or a negator and
classifier matrix.

### Davis, Luk, and Winterstein 2024

The Sinn und Bedeutung paper distinguishes bare nouns, bare classifier phrases,
and `[jat1 CL N]` phrases. Under descriptive `mou5` negation, it reports that
plain `[CL N]` and `[jat1 CL N]` receive a wide-scope indefinite reading rather
than the low-scope “any” reading available to a bare noun. This is decisive
boundary evidence: the minimizer reading in Yip's example depends on material
beyond an ordinary `[jat1 CL (N)]` indefinite, with overt `dou1` the principal
surface contrast.

### Basciano 2015 / Lister 2009 advertisement

Basciano reproduces a Panadol advertisement as `Special Moment 一個都唔會
Miss`, with Jyutping `jat1 go3 dou1 m4 wui5 miss`, and reports checking the
original television advertisement to correct an earlier transcription. This is
a natural Hong Kong attestation of the `m4`-containing profile. It is evidence
for occurrence, not a controlled grammatical analysis.

### CantoDict `一啲`

The community dictionary gives several marked Cantonese examples of
`一啲都唔 + adjective`, explicitly describing the pattern as emphatic
adjectival negation meaning “not at all.” This corroborates a degree-minimizer
profile but does not establish that plural/amount `di1` is structurally
identical to count `jat1 CL (N)`.

Law 2004 was checked because it was the original source lead. It gives useful
scalar-focus and `lin4 … dou1` context but no direct boundary study of the
negative minimal-quantity construction. It is context only, not the core source
for this promotion.

## Exact collision audit

The collision ledger is:

`UC-RQ-021-NEGATIVE-POLARITY-MINIMIZER-COLLISION-AUDIT-R1.tsv`

### `QuantityNP` and `QuantifiedClassifierNP`

These notes can preserve the internal quantity/classifier phrase, but not the
following `dou1`, the negative licensor, or scalar scope. Davis, Luk, and
Winterstein's plain-indefinite contrast shows why the NP alone cannot absorb the
construction.

### `FocusParticleFrame`

This is an internal parser heuristic without independent Cantonese evidence. It
does not identify the minimal scalar associate or distinguish minimizer,
`lin4 … dou1` even focus, universal wh quantification, and additive `dou1`.

### `NegatedVP` and `NegatedExistentialClause`

Generic negation can preserve the negative predicate but not the preverbal
minimal quantity or its scalar relation to `dou1`. `mou5` must also remain split
between negative-perfective and existential/possessive profiles; the checked
evidence does not license one interchangeable negation slot.

### UC-RQ-017 and UC-RQ-020

UC-RQ-017 overt `lin4 XP dou1` ranks an exceptional focused alternative and is
not restricted to negation. UC-RQ-020 universal `wh + dou1` quantifies over a wh
domain. Neither preserves the minimal quantity plus negative-predicate profile.

## Required boundaries

Future research must distinguish:

- count `jat1 + sortal CL (+ N)` from measure expressions such as `jat1 miu5`;
- count/measure minimizers from degree `jat1 di1 dou1 m4 + adjective`;
- an overt noun from contextually recoverable headless classifier phrases;
- `m4 + predicate`, `m4 + modal + predicate`, negative-perfective `mou5`, and
  existential/possessive `mou5`;
- subject, object, event-measure, time-measure, and degree associates;
- narrow minimizer scope from wide-scope ordinary `[jat1 CL N]` indefinites;
- absent `lin4` from overt `lin4 … dou1` even-focus constructions;
- Hong Kong natural use from constructed examples and transfer from Mandarin
  minimizer analyses.

## Research tasks before any implementation proposal

1. Build a classifier/measure-type by `m4`/`mou5` matrix with matched contexts.
2. Test overt and omitted nouns and recoverability requirements separately.
3. Compare count, event-measure, temporal, mass/amount, and degree minimizers.
4. Obtain interpretation judgments contrasting ordinary `[jat1 CL N]`, the
   `dou1` minimizer, overt `lin4`, and bare-noun low-scope indefinites.
5. Test negation, modality, aspect, and existential/possessive readings without
   treating the two negators as freely interchangeable.
6. Collect natural multi-speaker audio and corpus attestations before fixing
   constituent or prosodic boundaries.
7. Audit parser output only after the supported subprofiles are frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is a Cantonese `jat1 CL dou1` negative minimizer directly attested? | **Yes.** |
| Are both `m4`- and `mou5`-containing surfaces attested? | **Yes.** |
| Are the negators freely interchangeable? | **Not established.** |
| Is an overt noun always required after the classifier? | **No; checked headless examples exist.** |
| Does plain `[jat1 CL N]` under negation have the same scope? | **No in the checked contrast.** |
| Is `jat1 di1 dou1 m4 + adjective` the same subtype? | **Related; structural merger quarantined.** |
| Can existing quantity, focus, or negation wrappers preserve the whole claim? | **No.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-021 may leave active research only after a typed minimizer family, lossless
compositional merge, justified quarantine, or evidence-based retirement is
established. Until then, current grammar statuses and parser behavior remain
unchanged.
