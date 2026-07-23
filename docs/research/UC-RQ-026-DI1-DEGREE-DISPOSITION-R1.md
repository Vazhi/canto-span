---
title: UC-RQ-026 — di1 post-predicate degree disposition
research_id: UC-RQ-026
status: resolved_mixed_disposition
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-026 — `di1` post-predicate degree disposition

## Research decision

Do **not** promote another generic comparative construction. The candidate divides
into these bounded outcomes:

1. **Merge into `DegreeMannerAdverbial`:** scalar property `X + 啲`, imperative
   scalar adjustment, and action-manner `X + 啲` are already the researched
   subprofiles of that family. Surface order and scope must remain visible.
2. **Keep `ComparativeStative` retired:** its former fallback duplicated the same
   two-token path and fired only when lexical slot metadata was missing.
3. **Quarantine interpretation and standard placement:** Lam directly supports a
   bare comparative with optional standard before `(一)啲`, but one paper does not
   establish unrestricted property selection, all standard categories, or a
   deterministic “more” versus “a bit” reading.
4. **Keep other `啲` constructions separate:** nominal/determiner `啲`, preverbal
   `有啲 + property`, and reduplicated `A-A哋 dei2` do not instantiate the same
   post-predicate degree profile.

This disposition does not authorize changes to the existing degree template, new
semantic subtype output, lexical expansion, or productive acceptance.

## Supported merged core

The checked sources support at least three uses already mapped under the existing
degree/manner family:

```text
scalar property + (jat1) di1
    -> a contextually greater/smaller degree; “a bit/more A”

degree/manner head + di1 + VP
    -> requested or directed adjustment, e.g. act more slowly/quickly

property + di1 as directive
    -> requested state adjustment, e.g. be quieter
```

Lam's comparative example permits an overt comparison standard between the
property predicate and `(一)啲`. With no overt standard, the relevant baseline is
contextual. The source analyzes `(一)啲` as the differential/measure phrase, not as
the `過` surpass marker.

The same form can therefore be translated “a bit A,” “more A,” or as a requested
adjustment depending on predicate, comparison context, clause type, and speech act.
Those translations are not three automatically distinguishable token-level senses.

## Checked source findings

The source-verification ledger is:

`UC-RQ-026-DI1-DEGREE-SOURCE-VERIFICATION-R1.tsv`

### Lam 2014

The official ACL Anthology paper gives a bare comparative in which `gou1`
“tall,” an optional standard, and `(jat1) di1` form “a bit taller.” It states that
the standard is optional, must precede the measure phrase when overt, and contrasts
this profile with `property + gwo3 + required standard`.

This directly supports the scalar-difference core but not every property predicate,
directive, action modifier, or discourse interpretation.

### Wong 2023

The checked full-text monograph supplies three decisive subtype controls:

- `哥哥乖啲喎` as property comparison;
- `靜啲，佢喺度畫畫` as a standalone imperative adjustment rather than a
  modifier of the following clause;
- `快啲行上去啦` as a preposed modifier of a directional predicate.

These examples show why one undifferentiated “comparative adjective” label loses
position, attachment, speech act, and predicate-type information.

### Zheng, Zhang, and Gao 2021

The checked coursebook gives `貴係貴啲` and separately describes post-property
`(一)啲` scalar difference. It corroborates the property-scalar profile without
licensing every stative-plus-`啲` combination.

### Words.hk 2018

The direct Cantonese dictionary entry defines degree `啲` as “a little bit / a bit
more,” usually after an adjective in comparisons. Its examples include `細啲`,
`靚啲`, `好味啲`, and `講慢啲`, while a separate entry records nominal
quantifier `啲`. This corroborates the semantic and category split but is not a
complete productivity grammar.

## Exact collision audit

The collision ledger is:

`UC-RQ-026-DI1-DEGREE-COLLISION-AUDIT-R1.tsv`

### `DegreeMannerAdverbial`

The current category template is exactly `degree_manner_head + degree_particle`
and explicitly includes property heads and manner heads. Prior source mapping
already requires property comparison, imperative adjustment, action manner, and
scope to be split. UC-RQ-026 therefore adds no independent two-token construction
and merges into this research family.

An overt comparison standard, however, creates a larger structure than the current
two-token node. The merger is conceptual/research-level only and does not license a
runtime change.

### `DegreeModifiedLexicalStative`

That label covers a preposed degree word modifying an independently lexicalized
stative, such as the researched `好 + 好食` profile. It does not contain
post-predicate `啲` and is not a merger target.

### `ScalarEvaluation`

The surviving narrow profile is lexical negative `唔算 + property`, such as
`唔算貴`. Scalar subject matter alone does not make it the same construction as
`property + 啲`.

### Retired `ComparativeStative`

The fallback had no independent external edge and duplicated
`DegreeMannerAdverbial`. Its retirement remains correct; UC-RQ-026 must not revive
it under a new name.

## Required boundaries retained after merger

The existing degree/manner research family must still distinguish:

- scalar property from action manner;
- comparative assertion from imperative/request adjustment;
- preposed modifier, postverbal modifier, and standalone directive;
- implicit contextual standard from an overt standard before `(一)啲`;
- differential magnitude from comparison direction and evaluation;
- `X + 啲`, `X + 一啲`, and any `X + 啲啲` profile;
- degree `啲` from nominal/determiner `啲`;
- post-predicate `啲` from preverbal `有啲` and suffixal `哋 dei2`;
- explicit `過` surpass comparison under UC-RQ-005;
- lexical head selection, prosody, final particles, and regional/register limits.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is post-property `(一)啲` directly documented as scalar difference? | **Yes.** |
| May a comparison standard be implicit? | **Yes.** |
| When overt in Lam's profile, does the standard precede `(一)啲`? | **Yes.** |
| Are property comparison and requested adjustment identical in scope? | **No.** |
| Does `ScalarEvaluation` cover this form? | **No.** |
| Is another generic comparative node justified? | **No.** |
| Where does the core belong? | **Merge into `DegreeMannerAdverbial` research.** |
| Is the complete lexical/semantic matrix established? | **No; quarantined.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-026 is resolved as a backlog candidate. Its remaining lexical selection,
standard, position, attachment, interpretation, and speech-act questions belong to
the existing `DegreeMannerAdverbial`/scalar-comparison research family rather than
a new construction.
