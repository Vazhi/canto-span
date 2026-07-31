---
title: AA82 runtime-span audit R1
status: complete
construction: AA82 BinDouWhPlaceQuestion
intake_issue: 266
work_claim: 311
reviewed_on: 2026-07-31
---

# AA82 runtime-span audit R1

## Scope

This addendum completes the runtime-span dependency left open by `AA82-BIN-DOU-WH-PLACE-BOUNDARIES-R1.md`. It records read-only implementation observations and the resulting identity disposition. It changes no runtime, fixture, UUID, linguistic status, corpus classification, survey, release, or deployment state.

Where the earlier synthesis says that identity retention depends on a runtime-span audit, this addendum supplies that audit and supersedes only that unresolved conditional wording.

## Read-only findings

The repository audit found three distinct layers:

1. The lexical record preserves overt `邊度` as `wh_place` material.
2. The narrow legacy fallback source recognizes overt `喺 + 邊度` without inserting hidden material.
3. Active regression outputs can nevertheless wrap a complete clause or fragment in `LocativeWhQuestion`.

Observed full-span positives include profiles equivalent to:

- perfective motion-goal question: `去咗邊度呀`
- subject plus perfective motion-goal question: `你去咗邊度`
- overt locative question: `喺邊度呀`
- bare interrogative fragment: `邊度呀`

The wrapper is not applied consistently across every wh-place question. A non-perfective motion-goal example such as `你尋日去邊度呀` can remain compositionally represented through `SubjectPredicateClause` and `MotionGoalVP`. A semantically incompatible perfective-object string such as `你尋日食咗邊度呀` remains outside the wh-place question wrapper.

No audit evidence supports extending the outer question wrapper to negative-indefinite or negative-wh uses merely because they contain lexical `邊度`.

## Identity disposition

Retain the permanent AA82 UUID and canonical identity `BinDouWhPlaceQuestion`.

The retained research identity is narrow:

- it is an overt-`邊度` interrogative construction, not a lexical token class;
- its semantic role—location, goal, source, path candidate, body locus, or context-linked fragment—must come from overt parent structure and discourse context;
- embedded interrogatives, negative-wh structures, and negative-indefinite structures may contain the same lexical wh-place material without belonging to the outer AA82 question construction;
- role-specific UUID splits are not justified by the present evidence.

This is not a status promotion. AA82 remains `unsupported_generalization` because the current runtime wrapper is broader and less compositionally consistent than the source-supported identity.

## Follow-up implementation boundary

Issue #312 should replace or narrow the legacy full-span wrapper through explicit, composition-preserving question structure. Any implementation must preserve overt:

- subjects and predicates;
- motion or locative predicates;
- `喺` and `由` where present;
- aspect marking;
- sentence particles;
- cognition-clause parents in embedded questions;
- the lexical `邊度` child.

It must not infer one semantic role, insert hidden locative or source material, or treat every lexical `邊度` occurrence as a direct question.

Corpus distribution, rhetorical force, fragments, variants, path/body-locus candidates, and false-positive classification remain issue #313.

## Evidence boundary

Runtime output and fixtures establish implementation behavior only. They do not independently establish Cantonese grammaticality, productivity, frequency, register, or dialect-wide preference. The linguistic boundaries remain grounded in the primary-source synthesis and source ledger delivered with this PR.
