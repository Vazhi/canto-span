---
title: UC-RQ-019 — Clause-final tag question
research_id: UC-RQ-019
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-019 — Clause-final tag question

## Research decision

Promote a dedicated research unit for detachable clause-final A-not-A tags, with
the checked core:

```text
host clause + (pause) + 係唔係 / 好唔好 / 得唔得 (+ particle)
```

Wong 2023 explicitly defines these as tags attached to the end of a statement.
Huang, Her, and Kong 2025 supplies two structural diagnostics: `係唔係` can stand
alone in discourse and can follow an already interrogative host. By contrast,
clause-internal `係唔係/係咪 + complement` belongs to the copular A-not-A/polar
family.

The contracted terminal form `係咪呀` is not directly established by the checked
tag sources and remains quarantined. The claim that invariant polar particles such
as `呀 aa4` or `嚱 he2` are tags is rejected for this research unit: Huang et al.
show that they cannot stand alone or attach after a question. This note does **not**
authorize parser behavior, tag inference, grammar status changes, or productive
acceptance.

## Safest checked core

- tags attach after an independently complete host;
- `係唔係`, `好唔好`, and `得唔得` are directly listed tag forms;
- `你唔去喇，係唔係呀？` is a checked declarative-host example;
- detached `係唔係？` can respond to a preceding assertion;
- `係唔係` can follow a host already marked as a question;
- clause-internal `係唔係/係咪` precedes its predicate or complement and is not a
  terminal tag;
- `aa4` and `he2` are bound polar particles under the checked diagnostics, not
  detachable tags.

## Checked sources

See `UC-RQ-019-CLAUSE-FINAL-TAG-QUESTION-SOURCE-VERIFICATION-R1.tsv`.

### Wong 2023

The published Cantonese language-sample framework defines tag questions as turning
statements into questions by attaching a tag at the end. It lists three common
A-not-A tags and contrasts them with intonation and echo questions. The framework is
descriptive and inherits parts of the analysis from Matthews and Yip.

### Huang, Her, and Kong 2025

The journal article treats tags as structurally independent from matrix clauses,
uses standalone occurrence and attachment to questions as diagnostics, and contrasts
`係唔係` with `aa4/he2`. Its biclausal interpretation draws on broader tag-question
literature; exact Cantonese prosodic and dependency structure still needs direct study.

### Li 2017

Li distinguishes tag uses from regular A-not-A questions. It supports the boundary,
but the film sample cannot establish frequency or a complete tag inventory.

## Exact collision audit

See `UC-RQ-019-CLAUSE-FINAL-TAG-QUESTION-COLLISION-AUDIT-R1.tsv`.

`CopularANotAQuestion` already excludes terminal no-complement `係唔係`; this is a
correct boundary, not a gap to merge away. `PolarQuestionFrame` may carry
clause-internal contracted `係咪`, but it does not encode an independent host plus
detachable tag. Generic particle wrappers cannot identify a tag relation.

## Required boundaries

- declarative, imperative, and interrogative hosts;
- full `係唔係` versus terminal contracted `係咪`;
- agreement-seeking, confirmation, challenge, and repair functions;
- `係唔係`, `好唔好`, `得唔得`, and any other lexical tag bases;
- host-final particles before the tag and tag-internal/final particles;
- prosodic pause, intonation, and host/tag polarity matching;
- detachable tags versus bound polar particles and echo questions.

## Provisional outcome

| Question | Current answer |
|---|---|
| Are clause-final A-not-A tags directly documented? | **Yes; promote.** |
| Are they the same as clause-internal copular A-not-A? | **No.** |
| Can full `係唔係` detach and follow a question? | **Yes.** |
| Is terminal `係咪呀` equivalence established? | **No; quarantine.** |
| Are invariant `aa4/he2` particles the same tags? | **No; reject that merger.** |
| Is implementation authorized? | **No.** |

## Research tasks before implementation

1. Verify full/contracted terminal tags with multi-speaker audio.
2. Build host-type, polarity, tag-base, particle, and response matrices.
3. Test pause and intonation against standalone and question-attachment diagnostics.
4. Separate tag, polar-particle, intonation, and echo-question controls.
5. Audit parser output only after the tag inventory and host boundary are frozen.

## Exit conditions

UC-RQ-019 remains active until a typed tag family, lossless compositional merge,
justified quarantine, or evidence-based retirement is established. Current grammar
statuses and parser behavior remain unchanged.
