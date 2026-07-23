---
title: UC-RQ-016 — hai6–ge3 cleft/focus construction
research_id: UC-RQ-016
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-016 — `hai6 … ge3` cleft/focus construction

## Research decision

A dedicated research unit is justified. Tse 2019 directly analyzes Cantonese
`係 … 嘅` as a cleft in which the copula selects a clause headed by sentence-final
`嘅` and assigns focus within that complement. Law 2004 independently analyzes
Cantonese `係` clefts as biclausal identificational-focus structures and shows that
focus operators associate with the clefted element.

Current copular, explanatory, and particle wrappers preserve pieces of the surface
but do not encode the source-backed focus/presupposition bipartition. This note does
**not** authorize a cleft label, omission rules, focus inference, parser behavior,
grammar status changes, or productive acceptance.

## Safest checked core

```text
(subject) + 係 + focused material + presupposed clause remainder + 嘅
```

The checked sources directly support:

- sentence-final `嘅` in the Cantonese cleft, contrasting with impossible
  clause-medial `V-嘅-O` in Tse's example;
- narrow subject focus: `係我叫佢唞吓先嘅`;
- narrow temporal-adjunct focus: `張三係琴日打電報嘅`;
- broad clausal focus: `我係踢足球嘅` and subjectless `係咁都得嘅`;
- embedded tense/aspect/modal material, including `係要去美國嘅` and
  `佢係打緊字嘅`;
- negation inside the complement: `係唔關你事嘅`;
- identificational focus on material following `係`, with contextual alternatives;
- obligatory association of `zing6hai6`/`zaa3` focus operators with the cleft focus
  in Law's examples.

These findings establish an exact constructional core. They do not establish a
general text-only method for selecting the focus or all possible constituent types.

## Checked source findings

The source-verification ledger is:

`UC-RQ-016-HAI6-GE3-CLEFT-FOCUS-SOURCE-VERIFICATION-R1.tsv`

### Tse 2019

The author-uploaded BEAL proceedings paper directly compares sentence-final
Cantonese `ge3` with Mandarin `de`, supplies Cantonese narrow and broad focus
examples, and analyzes the copula as selecting a `ge3`-headed clausal complement.
The paper is a formal comparative analysis and many examples are inherited from
earlier sources rather than a new experiment.

### Law 2004

The official UCL dissertation analyzes Cantonese `hai6` clefts as biclausal and
identificational, gives focus-operator association examples, and documents relative
clause and modal boundaries. Its judgments are primarily author/limited-informant
evidence.

Neither checked source establishes when Cantonese `hai6` or cleft-final `ge3` may be
omitted while preserving the same cleft interpretation. Both omission questions
remain quarantined.

## Exact collision audit

The collision ledger is:

`UC-RQ-016-HAI6-GE3-CLEFT-FOCUS-COLLISION-AUDIT-R1.tsv`

### `CopularIdentificationFrame`

This internal wrapper can preserve `係` plus a nominal identification, but carries no
language evidence and no focused clausal complement. Ordinary identity such as
“X is Y” must remain distinct from a focus/presupposition cleft.

### `DefinitionExplanatoryFrame`

This wrapper recognizes bounded `係 … 嚟㗎` definition/question surfaces and suppresses
a motion reading of `嚟`. The cleft core instead uses clause-final `嘅` with a focused
constituent and presupposed clause; shared `係` and a final g-particle are insufficient
for merger.

### Generic particle wrappers

`DiscourseParticleFrame` can preserve sentence-final `嘅/㗎` scope but cannot decide
whether `嘅` is cleft-final, assertive, nominalizing, possessive, or part of a cluster.

## Required boundaries

Future research must distinguish:

- narrow subject, object, temporal, locative, manner, and other adjunct focus;
- broad clausal focus from identificational narrow focus;
- ordinary copular identity from cleft `係`;
- cleft-final `嘅` from nominalizer, possessive linker, relative marker, and assertion;
- `係 … 嘅` from `係 … 嚟嘅/嚟㗎` explanatory identification;
- overt versus allegedly omitted `係` and `嘅`;
- TAM/negation compatibility and focus-operator association;
- focus/presupposition context and prosody;
- author judgments from multi-speaker Hong Kong/Guangzhou evidence.

## Research tasks before any implementation proposal

1. Extract every Cantonese example and inherited citation from both sources.
2. Build focused-constituent and TAM/negation acceptance matrices.
3. Find direct Cantonese research on omission of `hai6` and `ge3`; do not transfer
   Mandarin `shi/de` optionality.
4. Test matched identity, assertion, nominalization, explanatory, and cleft contexts.
5. Collect multi-speaker audio with focus and presupposition judgments.
6. Coordinate with UC-RQ-011/012 particle and focus research.
7. Audit parser output only after the overt and omitted profiles are frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is Cantonese `係 … 嘅` directly analyzed as a cleft? | **Yes.** |
| Are narrow and broad focus profiles attested? | **Yes.** |
| Can TAM and negation occur in the checked complement? | **Yes.** |
| Is `嘅` sentence-final in the checked Cantonese construction? | **Yes.** |
| Are `係`/`嘅` omission conditions established? | **No; quarantined.** |
| Do current generic wrappers preserve the cleft distinction? | **No.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-016 may leave active research only after a typed cleft family, lossless
compositional merge, justified quarantine, or evidence-based retirement is established.
Until then, current grammar statuses and parser behavior remain unchanged.
