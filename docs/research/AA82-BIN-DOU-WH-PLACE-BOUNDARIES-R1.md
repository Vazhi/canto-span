---
title: AA82 — 邊度 wh-place role and fragment boundaries R1
status: complete_findings
construction_uuid: 4593e90d-b923-54af-a9ac-533409c38355
construction_code: AA82
canonical_name: BinDouWhPlaceQuestion
intake_issue: 266
work_claim: 311
reviewed_on: 2026-07-29
---

# AA82 — 邊度 wh-place role and fragment boundaries R1

## Question

Should overt `邊度` questions be split into permanent location, goal, source, and
headless identities, or can AA82 remain one overt wh-place identity whose role is
supplied by independently typed parent structure?

## Current identity

AA82 is defined as a question containing overt `邊度` wh-place material. The current
profile includes:

- motion-goal uses such as `去咗邊度`;
- overt locative uses such as `喺邊度`;
- context-dependent headless uses such as `邊度呀`.

The identity preserves the overt form and prohibits assigning one semantic role to all
uses or inserting hidden `喺`.

## Source-supported profiles

### Motion goal — directly supported

`SRC-CHOW-2007-CANTONESE-EVERYONE` distinguishes a `去邊度` question from its
destination response. `SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE` gives the
exact perfective example `佢去咗邊度呀`.

The surrounding motion predicate licenses the goal reading. No hidden locative
preposition is present or required. Perfective `咗` belongs to the motion predicate and
does not turn `邊度` into an object NP.

### Static or event location — directly supported with overt structure

`SRC-WONG-2023-LANGUAGE-SAMPLE` gives `擺喺邊度呢` and separately discusses a
where-question context in which omitted `喺` is treated as an error. This supports an
overt `喺 + 邊度` locative phrase when the predicate requires that structure.

`SRC-YIP-MATTHEWS-2000-BASIC` supports in-situ wh-place expressions in their ordinary
argument or adjunct position. The locative role comes from the overt preposition,
locative predicate, or parent clause—not from `邊度` alone.

### Motion source — not established by the current AA82 source set

The four verified AA82 sources do not provide a proposition-level exact source-marked
example such as an overt source coverb plus `邊度` in a motion-source question. A source
reading is structurally plausible through independently typed source-motion
composition, but plausibility and sibling evidence do not close this subprofile.

Until exact evidence is recorded, AA82 must not assign `source` merely because a motion
verb and `邊度` co-occur. Any supported source profile must preserve its overt source
marker or lexical source construction.

### Bare or headless `邊度呀` — discourse-dependent, not a full-clause default

Current tests treat `邊度呀？` as a positive. The sources securely establish `邊度` as a
where wh-form, but they do not establish every bare token as a complete locative
clause. `SRC-WONG-2023-LANGUAGE-SAMPLE` explicitly distinguishes an elaborated
where-question from a bare wh-word for its grammatical-analysis scoring procedure.
That is not proof that the bare utterance is ungrammatical; it is evidence that the
fragment and the elaborated clause are different analysis units.

A bare `邊度呀` should therefore require discourse-fragment licensing and should not be
assigned location, goal, or source without recoverable context. `喺邊度呀` likewise
preserves an overt locative phrase but may still be a fragment if the subject and
predicate are omitted.

## Ontology decision

**Retain one permanent AA82 identity for overt `邊度` wh-place material, with mandatory
typed composition and fragment metadata. Do not split permanent UUIDs by semantic
role at this stage.**

The same overt wh-form occupies different argument or adjunct positions. Location,
goal, and future source readings are contributed by overt parent structure. Splitting
the lexical wh-form by role would duplicate the same token identity and encourage
source transfer among motion and locative constructions.

The retained identity requires one of these analysis outcomes:

1. `role: location` — licensed by overt locative structure or a typed locative parent;
2. `role: goal` — licensed by a goal-selecting motion parent;
3. `role: source` — reserved until exact source-marked evidence and parent composition
   are recorded;
4. `role: unresolved_fragment` — bare or elliptical use requiring discourse context.

A true split should be reconsidered only if role-specific profiles acquire independent
surface boundaries, incompatible behavior, or distinct permanent evidence that cannot
be represented compositionally.

## Boundary matrix

| Surface/profile | AA82 disposition |
|---|---|
| `佢去咗邊度呀？` | Positive `goal`; motion parent supplies the role. |
| `你去邊度？` | Positive `goal`; no hidden `喺`. |
| `擺喺邊度呢？` | Positive `location`; overt `喺` preserved. |
| full `NP + 喺邊度` question | Positive `location` when parent clause is licensed. |
| `喺邊度呀？` | Overt locative-phrase fragment; context required. |
| `邊度呀？` | Bare wh-place fragment; `role: unresolved_fragment` unless context resolves it. |
| overt source marker + `邊度` | Research candidate; not source-complete yet. |
| motion verb + `邊度` without source marker | Do not infer source; goal or unresolved according to the verb and context. |
| static predicate missing required `喺` | Do not insert hidden `喺`; preserve malformed or alternative analysis. |
| `邊`, `邊庶` | Alternative wh forms; not AA82 merely by meaning. |
| `呢度`, `嗰度` | Demonstrative place expressions, not wh questions. |
| `邊度都...` or comparable free-choice/nonquestion use | Not AA82 question without independent interrogative structure. |
| embedded `唔知邊度...` | Embedded-wh research; do not assume direct-question behavior. |
| unrelated `邊` or `度` tokens | Not AA82. |

## Runtime and test consequences

The present focused negatives only distinguish scalar and A-not-A questions. They do
not test the semantic or fragment boundaries that define AA82.

A later implementation should:

- add explicit role metadata based on parent structure;
- preserve overt `喺`, motion predicates, aspect, and source markers;
- stop presenting `邊度呀` as a fully typed location question without context;
- add alternatives and nonquestion uses as negative boundaries;
- add a full overt locative positive rather than relying only on `喺邊度呀`;
- keep `邊` and `邊庶` outside AA82 unless separately adjudicated;
- make no hidden-preposition repairs.

## Required further research

1. exact source-marked wh-place questions and their relation to `SourceMotionClause`;
2. corpus and discourse review of bare `邊度呀` and `喺邊度呀` fragments;
3. embedded `邊度` interrogatives;
4. regional and register distribution of `邊度`, `邊`, and `邊庶`.

These questions do not block retaining AA82 as an overt lexical wh-place identity, but
they block a productive role-complete claim.

## Disposition

- AA82 UUID and canonical name: **retain**.
- Permanent role-specific split: **not justified now**.
- Location profile: **source supported with overt parent structure**.
- Goal profile: **source supported with motion parent structure**.
- Source profile: **research gap; do not activate from sibling evidence**.
- Bare/headless profile: **fragment requiring context, not a default full clause**.
- Hidden `喺`: **prohibited**.
- Alternative wh forms and nonquestion uses: **excluded**.
- Linguistic status: **unchanged `unsupported_generalization` pending runtime and
  boundary reconciliation**.
- Runtime, tests, corpus decisions, survey, release, and deployment state: **unchanged
  in this findings issue**.
