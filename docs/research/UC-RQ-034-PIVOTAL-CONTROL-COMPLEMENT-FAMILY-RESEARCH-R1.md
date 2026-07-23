---
title: UC-RQ-034 — pivotal control-complement family research
research_id: UC-RQ-034
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-034 — pivotal control-complement family research

## Research decision

Promote a dedicated typed research family for Cantonese pivotal/object-control
complements with overt `V1 + NP + VP`. In the checked descriptive framework, the
intervening NP is interpreted as the object of the first verb and the subject of
the following predicate. Direct examples support at least:

- request/command `叫 NP VP`;
- permission `俾 NP VP`;
- selection `揀 NP 做 + role`.

These share a structural pivot but not one interchangeable causative meaning.
The current `PassivePermissiveRelation` preserves the `俾` ambiguity family only;
`CausativeResultFrame` is a lexically narrow cause-result predicate without the
same overt pivot structure. Neither can absorb the general family losslessly.

The backlog's proposed `令 ling6` and causative `使 sai2` members remain
quarantined: the checked contemporary Cantonese sources do not establish their
register, complement selection, or interchangeability with colloquial `叫`.

This note does **not** authorize a parser label, new lexicon entries, automatic
control assignment, argument recovery, productive acceptance, or status changes.

## Safest checked profiles

```text
subject + giu3 + pivot NP + VP
    -> request/tell the pivot participant to perform the VP

subject + bei2 + pivot NP + VP
    -> permit/allow the pivot participant to perform the VP

subject + gaan2 + pivot NP + zou6 + role
    -> select the pivot participant to hold the role
```

The shared structural generalization is `V1 + pivot NP + predicate`. The first
verb determines whether the relation is request, permission, selection, or
another independently sourced type. A learner-facing analysis must preserve both
the overt first verb and the pivot's relation to the second predicate.

## Checked source findings

The source-verification ledger is:

`UC-RQ-034-PIVOTAL-CONTROL-COMPLEMENT-FAMILY-SOURCE-VERIFICATION-R1.tsv`

### Wong 2023

Wong's full-text grammar/coding framework defines pivotal constructions as
containing an NP that simultaneously serves as object of the first verb and
subject of the second. It says that only a small set of verbs enters the first
position and gives exact `我揀佢做班長` and `我唔俾佢睇電視` examples.

The same book records `我哋叫佢一齊玩` in a conversational sample and analyzes
the child's repertoire as including a pivotal construction. This directly attests
the requested `叫 + NP + VP` order, while the sample context supports an
ask/request reading rather than automatic physical causation.

### Lai and Pang 2023

Lai and Pang's official full-text causative-resultative study includes
`叫佢讀書` in a larger example and explicitly says that this affirmative
`叫 + NP + VP` portion is not itself a causative-resultative construction under
their diagnostics. This is a useful boundary: a command/complement relation must
not be collapsed into the separate two-predicate cause-result family.

### `俾` research

Independent `俾` studies show that `NP1-俾-NP2-VP` can be permissive/causative or
passive and that context may be required to distinguish them. The pivotal family
therefore links to, but does not replace, the existing ambiguity-preserving
`PassivePermissiveRelation` research.

## Exact collision audit

The collision ledger is:

`UC-RQ-034-PIVOTAL-CONTROL-COMPLEMENT-FAMILY-COLLISION-AUDIT-R1.tsv`

### `PassivePermissiveRelation`

Merge only the permissive `俾 + pivot + VP` subtype into the broader pivotal
research family. Keep passive and indirect-passive readings in the existing typed
`俾` family because their participant roles and discourse conditions differ.

### `CausativeResultFrame`

Keep separate. The runtime's exact `整冧咗 + affected object` profile encodes a
cause-result relation between predicates. It does not contain an overt NP that is
both object of a complement-taking verb and understood subject of a following VP.

### Naming, speech, and intention frames

Lexical `叫` also means call/name and can occur in naming constructions. A
command/request `叫 NP VP` must be distinguished by its following pivot and
predicate, not by the graph alone. Reported-speech, speech-transfer, and intention
frames likewise do not automatically express object control.

### Causative `令/使`

The runtime currently records `使` as the necessity modal used with `唔使`, not
as a sourced causative pivot verb; `令` is not an established member of the
inspected runtime family. Shared Standard Chinese translations are not evidence
for contemporary Cantonese interchangeability.

## Quarantined boundaries

Future research must establish:

- the complete first-verb inventory and its command, request, persuasion,
  permission, prevention, selection, perception, and causation subclasses;
- contemporary Cantonese use, register, and frequency of `令` and causative
  `使`, including colloquial alternatives;
- whether `叫` readings are request, command, indirect causation, naming, calling,
  or reporting in each complement environment;
- NP versus pronoun pivots, animacy, agency, volitionality, and nonagent subjects
  of the lower predicate;
- verbal, stative, nominal, result, directional, aspectual, and negated lower
  predicates;
- omission or discourse recovery of the matrix subject, pivot, lower subject,
  object, or whole lower VP;
- passive/permissive ambiguity, negation scope, aspect, questions, particles,
  coordination, and complement boundaries;
- finite/clausal-complement versus object-control diagnostics;
- speaker, register, corpus frequency, and regional variation.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is `V1 + NP + VP` directly recognized as a Cantonese pivotal pattern? | **Yes.** |
| Is the pivot related to both predicates? | **Yes, in the checked descriptive analysis.** |
| Are `叫 NP VP`, permissive `俾 NP VP`, and `揀 NP 做 role` attested? | **Yes.** |
| Do they all express one causative meaning? | **No.** |
| Can the whole family merge into `PassivePermissiveRelation`? | **No; only the permissive `俾` subtype overlaps.** |
| Is `CausativeResultFrame` the same structure? | **No.** |
| Are contemporary causative `令/使` licensed by the checked evidence? | **Not yet; quarantined.** |
| Is argument omission established? | **No; quarantined.** |
| Is a dedicated typed pivotal/control research family justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-034 may leave active research only after first-verb class, pivot role,
lower-predicate selection, passive/permissive, omission, scope, register, and
discourse judgments support typed constructions, lossless compositional mergers,
continued quarantine, or evidence-based retirement.
