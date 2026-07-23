---
title: UC-RQ-024 — zi6gei2 reflexive binding
research_id: UC-RQ-024
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-024 — `zi6gei2` reflexive binding

## Research decision

A dedicated research unit is justified for Cantonese `自己 zi6gei2` because
direct sources document an antecedent relation that a lexical pronoun entry cannot
preserve. The checked core includes both local and long-distance readings of bare
`zi6gei2`, including possessive uses, while pronoun-plus-`zi6gei2` has a distinct
local/intensifying profile.

Matthews and Yip give `阿嫲話明仔唔識照顧自己` with either Grandma or Ming as
the antecedent. Lam independently contrasts locally bound `佢自己` with bare
`自己`, which can be locally or long-distance bound, and analyzes the latter
split as local anaphoric versus long-distance logophoric binding.

This note does **not** authorize antecedent resolution, a locality rule, a
perspective model, a parser label, or productive acceptance.

## Safest checked core

The checked sources support:

- bare argument `zi6gei2` with a clause-local antecedent;
- bare argument `zi6gei2` with a higher-clause antecedent in an appropriate
  discourse and attitude/speech context;
- possessive `zi6gei2 + classifier/noun` with more than one available antecedent;
- a local-only complex `pronoun + zi6gei2` profile in Lam's binding analysis;
- a pronoun-plus-`zi6gei2` intensifier profile in Matthews and Yip;
- adverbial “by oneself,” generic-pronoun, and intensifier uses as distinct
  profiles that must not be silently collapsed into argument binding.

The sources do not establish an implementation-ready antecedent-selection
algorithm. Person, deictic perspective, discourse speaker, de se attitude,
logocentric-predicate, animacy, and grammatical-function conditions remain
research boundaries.

## Checked source findings

The source-verification ledger is:

`UC-RQ-024-ZI6GEI2-REFLEXIVE-BINDING-SOURCE-VERIFICATION-R1.tsv`

### Matthews and Yip 2011

The official CUHK grammar companion directly gives a bare `自己` sentence with
both a local antecedent and a higher-clause antecedent. It also gives
pronoun-plus-`自己` as an intensifier and `自己間房` with either the matrix
subject or postverbal object as possessor. These examples establish ambiguity,
not a deterministic nearest-antecedent rule.

### Lam 2021

Lam's official LFG proceedings paper directly compares Cantonese bare `jihgei`
and complex `keuihjihgei`. Bare `jihgei` allows local and long-distance binding;
complex `keuihjihgei` is locally bound. The proposal treats local binding as
anaphoric and long-distance binding as grammaticized logophoric binding.

Lam reports blocking effects for long-distance Cantonese `jihgei`, but not for
locally bound `jihgei`, and connects the long-distance system to SOURCE, SELF,
discourse-speaker, perspectival, and de se conditions. The paper leaves the full
formal discourse conditions outside its scope, so those conditions remain open
rather than becoming implementation rules.

### Chen, Mai, Hu, and Shang 2024

This conference abstract explicitly includes Cantonese `zi6gei2` among bare
reflexives that can function as local anaphors, generic pronouns, or
intensifiers. Its child and caregiver production study confirms that the three
functional profiles must be distinguished, but it does not establish adult
long-distance boundaries or a Cantonese-only productivity matrix.

### Words.hk 2022

The Cantonese dictionary entry independently attests local argument, possessive,
pronoun-plus-`自己`, independent/by-self, and generic-like examples. These are
lexicographic usage controls, not formal evidence for binding domains.

## Exact collision audit

The collision ledger is:

`UC-RQ-024-ZI6GEI2-REFLEXIVE-BINDING-COLLISION-AUDIT-R1.tsv`

### Lexical `自己`

The runtime lexicon currently records `自己` as a reflexive pronoun with the
note “self / oneself.” This preserves word identity but no antecedent candidate,
binding distance, grammatical function, possessor relation, perspective, or
intensifier distinction. The research unit therefore cannot be losslessly merged
into the lexical entry.

### Ordinary personal pronouns and `pronoun + 自己`

Lam's complex-reflexive analysis and Matthews and Yip's intensifier presentation
show that a visible pronoun changes the profile. Ordinary pronominal reference
alone does not preserve reflexive identity, while concatenating two lexical
tokens does not establish whether the form is a local anaphor or intensifier.

### Possessive and modified NPs

`自己 + classifier/noun` shares nominal structure with ordinary possessives and
modified NPs, but its interpretation depends on an antecedent relation. Matthews
and Yip's `自己間房` example permits two antecedents. A structural NP wrapper can
remain a surface carrier, but it is not a lossless semantic merger.

## Required boundaries

Future research must distinguish:

- bare `zi6gei2` from person-marked `pronoun + zi6gei2`;
- local anaphoric from long-distance logophoric binding;
- argument, possessor, embedded-subject, oblique, and adverbial positions;
- reflexive, intensifier, “by oneself,” generic, and discourse-speaker uses;
- SOURCE, SELF, and any Cantonese-licensed PIVOT antecedents;
- person/deictic blockers from ordinary intervening antecedents;
- syntactic availability from contextually preferred interpretation;
- animate, inanimate, and event-related antecedents;
- source transcription variants such as `jihgei`, `zi6gei2`, and `keuihjihgei`.

Mandarin `ziji` generalizations must not be transferred to Cantonese without a
direct Cantonese contrast.

## Provisional outcome

| Question | Current answer |
|---|---|
| Are local and long-distance readings of bare Cantonese `zi6gei2` directly documented? | **Yes.** |
| Is pronoun-plus-`zi6gei2` distributionally distinct? | **Yes.** |
| Can possessive `zi6gei2` have more than one antecedent? | **Yes.** |
| Are long-distance blocking effects reported for Cantonese? | **Yes.** |
| Is a complete blocker and perspective matrix established? | **No; quarantined.** |
| Can the lexical entry preserve the binding relation? | **No.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-024 may leave active research only after antecedent domain, grammatical
function, person, perspective, logophoric licensing, and non-binding-use
boundaries support a typed construction, lossless compositional merge, continued
quarantine, or evidence-based retirement.
