---
title: UC-RQ-031 — maai4 verbal-particle family research
research_id: UC-RQ-031
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-031 — `maai4` verbal-particle family research

## Research decision

A dedicated typed research family is justified for postverbal `埋 maai4`.
Chor's direct diachronic and contemporary study documents a connected but
non-equivalent set of functions:

1. lexical motion “approach/get close”;
2. directional particle “towards”;
3. collective “together”;
4. additive quantification or scope extension “also/as well”;
5. completion when the added item/event is the remaining or last one;
6. a subjectified negative-evaluation profile.

These functions cannot be represented by treating `埋` as an unrestricted
completion marker. They also cannot be merged into a general directional node,
because the additive, completive, and evaluative profiles no longer require
physical motion.

This note does **not** authorize lexical segmentation, a parser label, automatic
scope resolution, productive acceptance, or status changes.

## Safest checked profiles

Chor's contemporary evidence supports at least:

```text
V + maai4 + goal/reference point
    -> direction towards that point

V + maai4 + participant/theme or contextual event
    -> include an additional participant, theme, or event

V + maai4 (+ sin1/particle)
    -> finish the remaining/last portion in a licensed context

V + maai4 + negatively evaluated object
    -> speaker signals negative evaluation or counter-expectation
```

The same surface can remain context-sensitive. Additive inclusion may target an
object or an event, and completion can arise because the additional item is the
last item. A learner-facing analysis must preserve that relation rather than
assigning “finish” from token identity alone.

## Checked source findings

The source-verification ledger is:

`UC-RQ-031-MAAI4-VERBAL-PARTICLE-FAMILY-SOURCE-VERIFICATION-R1.tsv`

### Chor 2010

The official PolyU-hosted version of record uses early pedagogical texts, film
transcriptions, a spoken corpus, and native-speaker observations. It documents the
historical path from motion through direction and togetherness to additive
quantification, completion, and negative evaluation.

For additive `埋`, Chor gives examples in which an additional object is included
and an example with two readings: addition of a concrete object or addition of an
event. The paper states that additive `埋` extends the action to the object of a
transitive verb or the subject of an intransitive verb in earlier analyses.

The paper carefully distinguishes two stages of completion. In an early example,
“finish up the rest” is an implicature because the added item is the last one. A
later early-Cantonese example and contemporary `講埋`/`跑埋` examples have a
stronger conventionalized completion reading. Completion therefore belongs in the
family, but not as the only invariant meaning.

Chor also documents contemporary evaluative `埋`, where the speaker negatively
evaluates an object or situation. A superficially positive continuation becomes
ironic, showing that this profile cannot be reduced to ordinary addition.

### Wong 2023

Wong's checked full-text monograph groups `埋` among other verbal particles and
describes it as “also/along,” expanding a domain toward completion of an ongoing
action. It gives `你食埋啲餅先啦` and the topicalized `啲餅你食埋先啦`, plus
`等埋我` “wait for/include me too.” These examples corroborate participant/theme
inclusion and remaining-item completion in contemporary pedagogical analysis.

## Exact collision audit

The collision ledger is:

`UC-RQ-031-MAAI4-VERBAL-PARTICLE-FAMILY-COLLISION-AUDIT-R1.tsv`

### `CompoundDirectionalMotionVP`

Directional `埋` belongs to the general motion/direction domain, but current
runtime inspection found no standalone `埋` component in that family. Even a
future directional carrier would cover only “towards/close,” not additive,
completive, collective, or evaluative uses.

### `CompletionVP`

The current completion-marker inventory covers `完` and `晒`, not `埋`. More
importantly, Chor shows that completion is historically and synchronically tied to
addition of the remaining/last item, while other `埋` uses remain additive or
evaluative. A generic completion merger would discard scope and discourse
conditions.

### `RestorativeComplementVP`

The current restorative profile uses `返` plus a result state to recover a prior or
expected state. `埋` inclusion/completion does not itself assert restoration to a
prior state. Shared postverbal position is not a semantic collision.

## Lexicalized and homographic boundaries

The following must remain separate unless item-level research establishes
transparent composition:

- connector `同埋` “and/and also”;
- lexical `約埋` “arrange/include together”;
- restaurant formula `埋單` “settle the bill”;
- lexical compounds such as `收埋`, `匿埋`, or `閂埋`;
- reduplicated or fixed `加加埋埋`;
- lexical motion verb `埋` and compound directionals such as `埋嚟`;
- any graph, tone, or segmentation variant not directly verified.

## Quarantined boundaries

Future research must establish:

- object, subject, event, and proposition scope diagnostics;
- transitive versus intransitive argument-structure effects;
- when completion is implicated, conventionalized, or absent;
- the role of `先`, directives, future/irrealis context, and an expected next event;
- exact directional complements, goals, path/deixis ordering, and motion verbs;
- collective versus additive readings;
- negative evaluation, counter-expectation, irony, and prosody;
- negation, aspect stacking, questions, final particles, and omitted arguments;
- modern frequency, lexical selection, speaker, register, and regional variation.

## Provisional outcome

| Question | Current answer |
|---|---|
| Are directional, collective, additive, completive, and evaluative `maai4` uses directly documented? | **Yes.** |
| Can additive scope include an object or an event? | **Yes.** |
| Is completion always the lexical meaning of `maai4`? | **No.** |
| Can a completion reading become conventionalized in context? | **Yes.** |
| Do current collision nodes preserve the full family? | **No.** |
| Is the complete scope/lexical matrix established? | **No; quarantined.** |
| Is a dedicated typed research family justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-031 may leave active research only after role, scope, direction, completion,
evaluation, lexicalization, and clause-environment boundaries support typed
constructions, lossless compositional mergers, continued quarantine, or
evidence-based retirement.
