---
title: UC-RQ-007 — Verb-copy focus construction
research_id: UC-RQ-007
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-007 — Verb-copy focus construction

## Research decision

A dedicated research unit is justified. Lee 2019 identifies and experimentally
studies a Cantonese verb-focusing construction with the core form:

```text
V1 + 都 dou1 + negation/licensor + V2
```

The first verb is a bare copy; aspect material is absent from V1 and retained on
V2. The construction contrastively focuses the copied non-stative predicate and
is prosodically realized through F0 and/or duration changes. Current Canto Span has
no node representing this discontinuous copy relation, licensor, aspect asymmetry,
or prosodic focus. This note does **not** authorize parser behavior, lexical changes,
silent material, a grammar status change, or productive acceptance.

## Safest checked core

Lee discusses examples including:

```text
佢睇都冇睇就買咗。
我聽(*過)都未聽過。
```

The narrow evidence-backed profile is:

1. V1 and V2 are overt copies of the same non-stative verb;
2. `都` occurs after V1;
3. negation such as `冇` or `未`, or another independently licensed element,
   precedes or forms part of the V2 predicate;
4. V1 is bare while necessary aspect occurs with V2;
5. the construction yields contrastive verb focus rather than a light-action or
   delimitative reading.

Lee also cites a licensed nonnegative example with result/potential `到`, showing
that the family cannot be reduced to one fixed negator template. The full licensor
inventory remains open.

## Checked source findings

The source-verification ledger is:

`UC-RQ-007-VERB-COPY-FOCUS-SOURCE-VERIFICATION-R1.tsv`

### Lee 2019 — structure and prosody

The HKU thesis record and accessible full-text extract establish:

- a `V1-dou1-mei6-V2` verb-focusing construction;
- two overt copies of the same verb;
- aspect deletion on V1 and retention on V2;
- exclusion of stative verbs from verb focus, while statives can occur in the
  distinct verb-topicalization construction;
- mandatory negation or another licensor such as `到` in the cited analysis;
- a production experiment with 10 native Hong Kong Cantonese speakers aged 18–24;
- cooperative F0 and duration marking of the focused verb, without consistent
  pitch-range expansion or post-focus compression.

The thesis builds its structural discussion partly on Matthews and Yip 1998/2011.
Those exact primary passages were not independently reopened in this checkpoint,
so Lee is the checked carrier for those descriptions.

## Exact collision audit

The collision ledger is:

`UC-RQ-007-VERB-COPY-FOCUS-COLLISION-AUDIT-R1.tsv`

### `ReduplicatedVP`

The runtime requires two adjacent identical action verbs and assigns a light or
checking-action interpretation. Verb focus separates the copies with `都` plus a
licensor and expresses contrastive focus. Adjacency and meaning both differ.

### `FocusParticleFrame`

This internal heuristic represents restrictive `得 … 啫/咋` over scalar or
quantity hosts. It neither copies a verb nor represents `都`, negation/licensing,
aspect asymmetry, or prosodic verb focus.

### `DegreeMannerModifiedVP`

This unsupported wrapper concerns degree/manner modification such as `快啲嚟`.
It has no verb identity relation, focus licensor, or split aspect placement.

### Other verb-copy constructions

Lee distinguishes verb focus from verb topicalization and also notes duration,
frequency, adverbial, and resultative copying. Shared verb repetition is not enough
to merge these constructions; their licensors, aspect placement, discourse
function, and prosody require separate classification.

## Required boundaries

Future research must distinguish:

- verb focus from adjacent reduplication and `V-V-下` duration/backgrounding;
- verb focus from verb topicalization such as `靚就靚，不過…`;
- negative `冇/未` profiles from `到` and any other licensed profiles;
- aspect on V2 from unlicensed aspect on V1;
- stative/property predicates from eligible non-stative predicates;
- focus spanning one clause from the reported cross-clausal possibilities;
- syntactic focus licensing from prosodic realization;
- F0 marking, duration marking, and their speaker-specific combination;
- contemporary Hong Kong usage from inherited grammar descriptions.

## Research tasks before any implementation proposal

1. Reopen the complete Lee thesis and extract every form, licensor, predicate class,
   aspect contrast, judgment, and experimental item.
2. Verify the Matthews and Yip 1998/2011 passages directly.
3. Audit natural modern Hong Kong attestations rather than relying only on elicited
   or constructed examples.
4. Build matched verb-focus, verb-topic, adjacent-reduplication, duration/frequency,
   and resultative-copy contrasts.
5. Use audio naturalness and interpretation tasks with multiple age groups.
6. Audit parser output only after verb identity, licensor, aspect, and clause-span
   boundaries are frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is Cantonese verb-copy focus independently documented? | **Yes.** |
| Is V1 bare while aspect remains on V2? | **Yes in the checked description and examples.** |
| Are stative predicates freely licensed? | **No; Lee distinguishes them from verb focus.** |
| Does `ReduplicatedVP` cover the construction? | **No; it requires adjacency and a light-action reading.** |
| Is negation the only possible licensor? | **No; a `到` example is reported, but the full inventory is open.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-007 may leave active research only after one of these dispositions is justified:

- **dedicated construction:** stable copy, licensor, aspect, predicate, clause-span,
  and prosodic boundaries support verb focus;
- **typed verb-copy family:** focus, topicalization, duration/frequency, adverbial,
  and resultative copying receive separate source-linked profiles;
- **compositional merge:** existing identity, focus, polarity/aspect, and prosodic
  relations preserve the construction without loss;
- **quarantine:** primary-source, natural-attestation, or speaker boundaries remain
  inadequate;
- **retire:** a complete collision audit proves an existing construction sufficient.

Until then, current grammar statuses and parser behavior remain unchanged.
