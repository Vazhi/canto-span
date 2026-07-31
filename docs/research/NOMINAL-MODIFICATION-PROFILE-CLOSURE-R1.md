---
title: Nominal modification — AA07, AA91, and AB10 profile closure R1
status: blocked_pending_compact_corpus_packet
intake_issue: 268
work_claim: 316
human_artifact_issue: 315
reviewed_on: 2026-07-29
---

# Nominal modification — AA07, AA91, and AB10 profile closure R1

## Question

How should Cantonese nominal modification be divided among:

- `AA07 GeMarkedNominalModifierNP`;
- `AA91 DegreePropertyModifierNounNP`; and
- retired `AB10 NominalModificationCompositeWrapper`?

The source and ontology portion is complete below. Final corpus-packet accounting is
blocked only on the lossless compact export requested in human-action issue #315.

## Profile map

### AA07 — overt modifier + 嘅 + overt noun

AA07 has the narrow profile:

```text
overt nominal modifier + 嘅 + overt nominal head
```

The sources support possessive and broader nominal-modification examples, but they do
not justify assigning one semantic role to `嘅`. AA07 is therefore a structural
linker-marked nominal profile, not an “associative” semantic class.

AA07 includes local spans such as:

- `我嘅書`;
- `香港嘅飯`;
- the object-internal `香港嘅飯` within `食咗香港嘅飯`.

AA07 does not automatically include:

- the distinct associative-plural `X + (佢)哋` construction;
- headless `modifier + 嘅` without independently licensed ellipsis;
- relative clauses merely because they contain `嘅`;
- nominalized clauses or proposition-denoting `嘅` structures;
- classifier or quantity NPs whose decisive boundary is not modifier + linker + noun;
- lexicalized compounds whose internal analysis is not synchronically transparent.

The full HKCanCor query is intentionally much broader: every `嘅` immediately before a
NOUN/PROPN-mapped token, yielding 960 candidates. That query necessarily contains
relative, possessive, nominalized, clausal, attachment, annotation, and boundary
competitors. It cannot be converted into AA07 evidence by adjacency alone.

### AA91 — degree-marked property + overt noun without 嘅

AA91 has the narrow profile:

```text
degree-marked property expression + overt noun
```

The current exemplar is `好大壓力`. Sio's direct-versus-`嘅` contrast and Yu's direct
adjective-noun examples support the existence of a distinct unmarked modification
profile. The construction does not include every `好 + X + noun-tagged token` string.

AA91 requires:

1. `好` or another independently licensed degree element to modify the property;
2. the middle expression to function as a property modifier rather than a verb,
   quantifier, particle, numeral, repair, or comparative marker;
3. the final element to be an overt noun head rather than a headless classifier or
   annotation artifact;
4. the complete local span to be nominal modification rather than predication across
   a constituent boundary.

### AB10 — no surviving shared construction

Retired AB10 is explicitly a historical aggregate over:

- direct property modification;
- `嘅`-marked modification;
- classifier-linked nominals;
- relative clauses; and
- nominal complements.

These structures have no single shared licensing boundary. AB10 must remain retired
and must not receive a successor solely to preserve the umbrella label.

Its preserved source propositions have these exact homes:

| Preserved proposition | Current home |
|---|---|
| direct versus `嘅`-marked nominal modification contrast | AA91 and AA07, at claim level only |
| overt `嘅` linker before an overt nominal head | AA07 |
| direct degree-property modification before an overt noun | AA91 |
| relative-clause modification | independently typed relative-clause construction research |
| classifier-linked nominal structure | classifier/quantity NP constructions |
| nominal complements | independently typed nominal-complement research |
| historical aggregate implementation behavior | AB10 provenance only; no active language claim |

No AB10 source is transferred through the retired wrapper. Each proposition must match
the destination profile independently.

## Diagnostic AA91 corpus packet R1

The complete AA91 mechanical inventory contains 78 candidates across 40 source files.
A preliminary 17-item diagnostic packet was selected by stable ID to cover genuine
direct modification and the major extraction competitors visible in the inventory.
This packet is complete as listed but is not the final corpus-readiness packet.

| Candidate ID | Surface | Classification | Reason |
|---|---|---|---|
| `aa91-5fa491142f9eab95122c` | `好大問題` | genuine | `好大` directly modifies overt noun `問題` inside a nominal predicate. |
| `aa91-98848bc5c6713f7bb621` | `好大壓力` | genuine | Exact AA91 degree-property plus overt noun profile. |
| `aa91-28de3c95e587b0f1c206` | `好短時間` | genuine | `好短` directly modifies overt temporal noun `時間`; larger clause does not alter the local NP. |
| `aa91-3cad3e6fb93543042ad6` | `好大條` | false_positive | Final `條` is a headless classifier/predicative measure, not an overt noun head. |
| `aa91-fe96af30b7ed7dbfb29c` | `好大隻` | false_positive | Headless classifier/predicative profile, not AA91. |
| `aa91-2543131327737b5c9f6f` | `好大隻` | false_positive | Same headless-classifier boundary in an overt copular context. |
| `aa91-ccc9f31ce255ae3087ad` | `好大隻` | false_positive | Predicate over previously mentioned flies; no overt noun head after the property. |
| `aa91-e92db19a6858b1e4e4f5` | `好細隻` | false_positive | Headless classifier followed by a separate quantity expression. |
| `aa91-338f76fc4359c438535b` | `好多毛` | false_positive | `好多` is a quantity expression, not the degree-property modifier profile. |
| `aa91-a65700398c552d4c0a2c` | `好少地方` | false_positive | Quantity/amount reading (“very little space”), not property modification. |
| `aa91-881073ae1c077533ff01` | `好少例子` | false_positive | Quantified “few examples” profile. |
| `aa91-6c81f83466cbed44efa6` | `好六科` | false_positive | Query begins inside `最好六科`; `好` is part of a superlative predicate and `六科` is quantified material. |
| `aa91-5feaf6545a8c73a6182c` | `好六科` | false_positive | Same `最好 + 六科` extraction-boundary error. |
| `aa91-427008a77aeb788d11f9` | `好出聲` | false_positive | Degree adverb plus verb-object expression `出聲`. |
| `aa91-2d235747a24cd36516c5` | `好冇心機` | false_positive | Degree plus negative existential/stative VP, not nominal modification. |
| `aa91-2306267f4e41a26ad383` | `好俾個` | false_positive | Query crosses the negative imperative `唔好俾個...`; no property modifier. |
| `aa91-a9359ba2d1518b0b6861` | `好有孝心` | false_positive | Degree plus existential/stative predicate `有孝心`. |
| `aa91-665fa3b48054e85378f1` | `好鍾意錢` | false_positive | Degree plus transitive cognition/attitude predicate. |
| `aa91-5b002ffb1ea61ae4394c` | `好有印象` | false_positive | Degree plus existential/stative predicate. |
| `aa91-09ef35a382eef7b76f8e` | `好嘥時間` | false_positive | Degree plus verb-object expression `嘥時間`. |

Packet totals: **20 reviewed; 3 genuine; 17 false positive; 0 ambiguous; 0
unusable**.

The strong false-positive rate confirms that POS-defined adjacency cannot license
AA91. In particular, HKCanCor maps classifier tags to UD NOUN, and the unrestricted
middle position admits verbs, numerals, particles, and quantifiers.

## Remaining corpus endpoint

Issue #315 requests compact, lossless tables for:

- all 960 AA07 candidates; and
- all 78 AA91 candidates.

After those artifacts are attached, the expert review will define and fully classify a
bounded final packet using explicit, reproducible selection rules. The final packet
must retain false positives and ambiguous items and preserve stable IDs, source,
utterance, adjacent-turn context, and POS metadata.

The intended selection strategy is:

### AA91

Review the full 78-candidate inventory. Its size is bounded and its query deliberately
contains the complete major contrast set.

### AA07

Do not attempt to treat all 960 candidates as one immediate promotion packet. Select a
stratified packet before classification, covering at minimum:

- pronoun/nominal possessors;
- common-noun and proper-name modifiers;
- adjective/property material before `嘅`;
- verbal or clausal material before `嘅`;
- relative-clause candidates;
- headless or attachment ambiguity;
- utterance-start, punctuation, repair, and annotation boundaries;
- lexicalized or noncompositional strings;
- multiple source files and participants.

The selection manifest must be deterministic and must state that the remaining
inventory is unreviewed rather than silently excluded.

## Family decision

The source and ontology evidence supports **two current narrow profiles**, not one
nominal-modification umbrella:

1. AA07 `modifier + 嘅 + overt noun`;
2. AA91 `degree-property + overt noun` without `嘅`.

AB10 contributes no third construction. Its only valid future role is immutable
historical provenance linking older aggregate behavior to independently typed current
structures.

Family closure is therefore structurally achievable without a new UUID. Corpus,
panel, runtime-alignment, and held-out gates remain construction-specific.

## Current disposition

- AA07 identity: retain.
- AA91 identity: retain.
- AB10: remain retired; no successor umbrella.
- New nominal-modification UUID: not justified.
- AA91 diagnostic packet: complete, non-readiness 20-item review.
- Final AA91 and selected AA07 corpus packets: blocked on issue #315 artifact.
- Linguistic statuses, runtime, tests, identities, survey, release, and deployment:
  unchanged.
