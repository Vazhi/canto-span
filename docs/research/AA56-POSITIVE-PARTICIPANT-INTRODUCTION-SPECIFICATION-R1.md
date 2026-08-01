---
title: AA56 positive participant-introduction specification R1
status: specification_complete
specification_id: AA56-POSITIVE-PARTICIPANT-R1
intake_issue: 405
work_claim: 415
identity_code: AA56
construction_uuid: 258c1d00-8a77-543c-a26f-2e66d3a37849
canonical_name: JauMarkedIndefiniteNPPredication
legacy_runtime_label: ExistentialPresentationalClause
research_basis: docs/research/AA56-NO-PLACE-EXISTENTIAL-PRESENTATIONAL-BOUNDARIES-R1.md
implementation_authorized: false
status_change_authorized: false
---

# AA56 positive participant-introduction specification R1

## Decision

Retain permanent UUID `258c1d00-8a77-543c-a26f-2e66d3a37849` and code `AA56`.
The accepted canonical identity is:

```text
JauMarkedIndefiniteNPPredication
```

The source-backed core is:

```text
有 + overt indefinite NP + overt predicate linked to that NP
```

The construction is positive-only. A locative predicate is one licensed subtype, not a
required coda. Ordinary `冇人 + predicate` is not the negative member of AA56.

This specification defines a later implementation contract. It does not edit the parser,
fixtures, runtime label, status-note path, survey, panel, held-out set, version, release, or
deployment state.

## Identity contract

| Field | Accepted value |
|---|---|
| Permanent code | `AA56` |
| Permanent UUID | `258c1d00-8a77-543c-a26f-2e66d3a37849` |
| Canonical name | `JauMarkedIndefiniteNPPredication` |
| Legacy runtime alias | `ExistentialPresentationalClause` |
| Claim layer | `language_construction` |
| Family | `ExistentialAndPresentationalClauses` |
| Profile | `SubjectlessJauIndefiniteNPPredicate` |
| Current linguistic status | retain `research_pending` |

The rename is UUID-preserving. No successor UUID is allocated because the accepted positive
profile is the source-supported center of the existing record. The legacy runtime alias and
status-note path remain compatibility surfaces until a separate migration is reviewed.

## Required overt structure

A future matcher may emit AA56 only when all of the following are satisfied:

1. the AA56 core begins with overt positive marker `有`;
2. no overt possessor subject belongs inside the AA56 core before `有`;
3. an overt indefinite NP follows `有`;
4. an overt predicate follows and is structurally linked to the introduced NP;
5. every overt token in the accepted span is preserved;
6. external location, condition, embedding, discourse-setting, and final-particle material is
   represented independently rather than absorbed or invented.

The matcher must not insert a hidden expletive, possessor, place, subject, predicate, or
polarity marker.

## Predicate profiles

The reviewed evidence supports the following predicate classes as members of the research
profile. Implementation for each class still requires explicit bounded tests.

| Predicate profile | Source or corpus basis | Example type |
|---|---|---|
| Verbal | direct source and corpus | `有(一)個人搵你` |
| Adjectival/property | direct source and corpus | `有幾個學生好嬲` |
| Perfective verbal | direct source | `有好多客人嚟咗` |
| Copular | reviewed corpus | `有兩個你嘅手下係平過你` |
| Modal/ability | reviewed corpus | introduced NP followed by modal predicate |
| Evaluative or embedded | reviewed corpus | introduced NP followed by evaluative/embedded predication |
| Locative | reviewed corpus and current fixtures | `有個人喺門口` |

This table does not authorize an unrestricted “any NP + any predicate” matcher. Nominal and
predicate licensing must be derived from independently recognized structures rather than a
surface-token catch-all.

## Span contract

### Minimal span

```text
[有] [introduced indefinite NP] [NP-linked predicate]
```

### External material

The following may occur outside or around the AA56 core and must remain separately typed:

- discourse-setting or conditional material;
- overt place/domain material;
- embedding predicates or quotation structure;
- clause-final particles;
- coordination or clause-relation material.

### Overt-place composition

An overt place/domain before `有` belongs to AA77. When a following predicate also satisfies
AA56, the structures compose without erasing either layer:

```text
[AA77 overt place/domain] + [AA56 有 + indefinite NP + NP-linked predicate]
```

The implementation must not force the overt place to be a hidden subject or topic and must
not make it part of the AA56 core merely because it precedes the marker.

### Locative-predicate subtype

A post-NP `喺／喺度` phrase may serve as the NP-linked predicate. The future matcher must not
require that subtype for all AA56 cases.

## Required exclusions

### AA55 overt-subject possession

Exclude:

```text
overt subject or possessor + 有／冇 + associated NP
```

The overt subject/possessor belongs to AA55. AA56 must not delete it and reinterpret the
associated NP as a participant introduced by a subjectless clause.

### AA77 overt-place existence without following predication

Exclude the AA56 core when the structure is only:

```text
overt place/domain + 有／冇 + NP
```

That is the AA77 center. AA56 may layer only when an additional overt predicate is linked to
the introduced NP.

### Partitive or indefinite-subject `有啲(人)`

Do not treat `有啲(人)` as independent existential-marker evidence merely because the string
begins with `有`. Partitive or indefinite-subject analyses require their own structure and
must not inherit AA56 automatically.

### Bare existence, inventory, or listing

Exclude:

```text
有 + NP
```

when no overt NP-linked predicate follows. The parser may represent existence or listing
elsewhere, but AA56 requires the overt predication relation.

### Temporal, conditional, measure, and lexical `有`

Exclude at minimum:

- `有一日`;
- `有一次`;
- `有一段時間`;
- `有事`;
- `有可能`;
- `有機會`;
- compounds or predicates containing lexical `有` such as `帶有`.

A later implementation must use structure and lexical boundaries, not a marker-only rule.

### Negative `冇人 + predicate`

Do not emit AA56 for ordinary negative-human clauses such as:

```text
從來冇人講過。
冇人同你講嘢。
冇人知。
冇人負擔得起。
```

These state that no person satisfies the predicate. They are negative-human
quantificational or negative existential-subject clauses, not a symmetric negative
participant-introduction profile.

Negative existential, availability, minimizer, event-negation, discourse-absence,
rhetorical-polarity, and repair uses of `冇` also remain outside AA56 unless independently
typed.

### Repair and ambiguity

False starts and repairs must not be silently normalized into a complete AA56 structure.
Ambiguous cases must remain unresolved rather than fabricating NP or predicate boundaries.

## Future runtime output contract

A later implementation should preserve the legacy label until compatibility migration is
explicitly authorized. Its node should expose, at minimum:

```text
construction_uuid: 258c1d00-8a77-543c-a26f-2e66d3a37849
construction_code: AA56
canonical_identity: JauMarkedIndefiniteNPPredication
legacy_runtime_label: ExistentialPresentationalClause
polarity: positive
marker: 有
introduced_np: overt
predicate_relation: linked_to_introduced_np
```

Recommended child roles:

1. positive existential/introductory marker;
2. introduced indefinite NP;
3. NP-linked predicate;
4. independently represented particles or external layers.

The node must not claim unrestricted productivity, a hidden subject, mandatory location, or
positive-negative symmetry.

## Controlled implementation matrix

The later runtime package must include positive and boundary cases covering at least the
following cells.

### Positive cells

- singular classifier NP + verbal predicate;
- quantified/plural NP + adjectival predicate;
- quantified/plural NP + perfective verbal predicate;
- human NP + copular predicate;
- human NP + modal predicate;
- nonhuman NP + locative predicate;
- external condition or discourse setting + AA56 core;
- overt-place AA77 layer + AA56 core;
- final-particle preservation;
- embedded or quoted AA56 core.

### Boundary cells

- AA55 overt-subject possession;
- AA77 place + `有／冇` + NP without following NP-linked predicate;
- partitive `有啲(人)`;
- bare `有 + NP` existence/listing;
- temporal `有一日／有一次／有一段時間`;
- lexical `有可能／有機會／帶有`;
- ordinary `冇人 + predicate`;
- negative availability complement;
- rhetorical `邊有人`;
- repair or interrupted marker-NP sequence;
- definite or referential NP boundary cases;
- predicate-link ambiguity.

Existing negative locative-coda snapshots are implementation history, not accepted AA56
positive evidence. A later migration must reclassify them without deleting any separately
valid negative existential analysis.

## Evidence gates after specification

Identity and specification acceptance do not satisfy the remaining evidence gates.

### Role-neutral panel

A later locked panel should test critical contrasts rather than broad naturalness alone:

- positive `有` versus ordinary negative `冇人`;
- verbal, adjectival, copular, modal, and locative predicates;
- indefinite versus definite/referential introduced NPs;
- bare existence versus NP-linked predication;
- AA55 possession versus AA56 introduction;
- AA77 overt-place existence versus AA77 + AA56 layering;
- partitive `有啲(人)` and temporal/lexical controls.

### Held-out validation

Held-out examples must not be used to choose marker, nominal, predicate, lexical, or span
rules. Validation must include both positive profiles and the principal collision classes
from the 179-row review.

## Implementation sequence

1. accept Batch 20 identity adjudication and this specification;
2. open a separate runtime implementation issue and claim;
3. add controlled tests and compatibility expectations before changing the matcher;
4. implement positive-only recognition without broad lexical expansion;
5. reclassify legacy negative fixtures under independently justified structures;
6. run runtime source-first and task-scoped verification;
7. collect panel evidence and held-out validation through separately governed packages;
8. consider status or runtime-label migration only after those gates.

## Protected and unchanged

This specification changes none of the following:

- runtime behavior or emitted nodes;
- executable fixtures;
- linguistic status or status-note placement;
- corpus classifications;
- survey or panel state;
- held-out state;
- runtime version;
- release or deployment state;
- merge authorization.

## Terminal outcome

AA56 now has a retained-UUID identity decision and an exact positive-only parser contract.
The next authorized step after acceptance is a separately claimed runtime implementation
package. No parser edit is included here.
