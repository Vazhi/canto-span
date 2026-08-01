# Construction adjudication Batch 20

Date: 2026-08-01  
Authority: project expert systematic review  
Scope: AA56 positive subjectless `有` participant introduction

## Outcome

Batch 20 adjudicates one current UUID:

| Code | Legacy label | Approved canonical name | Claim layer | Decision |
|---|---|---|---|---|
| AA56 | `ExistentialPresentationalClause` | `JauMarkedIndefiniteNPPredication` | language construction | retain UUID; narrow to positive `有 + indefinite NP + NP-linked predicate` |

The accepted family/profile is:

```text
family_name: ExistentialAndPresentationalClauses
profile_name: SubjectlessJauIndefiniteNPPredicate
```

The runtime label and status-note path remain unchanged compatibility surfaces. No parser,
fixture, status, survey, panel, held-out, version, release, or deployment change is included.

## Evidence basis

### Primary sources

- `SRC-YIP-MATTHEWS-2000-BASIC` directly gives `有(一)個人搵你`,
  `有幾個學生好嬲`, and `有好多客人嚟咗`, supporting positive
  `有 + indefinite NP + predicate` without a mandatory locative coda.
- `SRC-LAM-LAU-LEE-2024-SEGMENTATION` analyzes `有個男仔孭我走喇` with
  `有` as an existential marker, the introduced noun as the following predicate's subject,
  and no overt possessor subject.
- `SRC-LAM-2018-NEGATION-ASPECT` supports structural separation among negative
  existential, possessive, and aspect-sensitive `冇` environments; it does not establish
  ordinary `冇人 + predicate` as a symmetric presentational construction.

### Frozen corpus review

The deterministic AA56 packet contains 179 reviewed rows from 49 frozen HKCanCor files:

- 44 positive source-compatible NP-predication rows;
- 2 overt-place plus positive-predication layers;
- 20 negative-human quantificational clauses;
- 16 partitive or indefinite-subject `有啲(人)` rows;
- 18 bare existence or inventory rows;
- 14 AA55 possession or overt-subject controls;
- 14 AA77 overt-place existential controls;
- lexical, temporal, repair, rhetorical, ambiguous, and other collision classes.

The packet establishes attestation and boundaries in one Hong Kong conversational corpus.
It does not establish unrestricted productivity or replace role-neutral panel and held-out
evidence.

## Identity decision

### Retain the UUID

Permanent UUID:

```text
258c1d00-8a77-543c-a26f-2e66d3a37849
```

The positive source-supported profile is the defensible center of AA56 rather than a new
construction unrelated to the legacy record. The UUID and short code therefore remain.

### Rename and narrow

`ExistentialPresentationalClause` is too broad to expose the overt positive marker, the
indefinite introduced NP, the following predication relation, and the unsupported polarity
symmetry. The approved name `JauMarkedIndefiniteNPPredication` is form-based and
analysis-neutral enough to preserve the established relation without asserting one disputed
syntactic account.

### Retain language-construction claim layer

The profile has direct source support and a complete reviewed corpus packet. It remains a
language-construction identity, not merely a parser wrapper.

### Retain `research_pending`

The identity and parser specification are now closed, but runtime migration, role-neutral
panel contrasts, and held-out validation remain. No status promotion or status-path move is
justified.

## Positive core

```text
有 + overt indefinite NP + overt predicate linked to that NP
```

Supported predicate classes include verbal, adjectival, perfective verbal, copular, modal,
evaluative/embedded, and locative profiles. Each requires explicit bounded implementation
tests; the identity does not license an unrestricted surface cross-product.

## Structural boundaries

### AA55 possession

An overt possessor or subject before `有／冇` belongs to AA55. AA56 must not erase the overt
subject or reclassify possession as subjectless participant introduction.

### AA77 overt-place existence

Overt place/domain + `有／冇 + NP` belongs to AA77. AA56 may compose only when an additional
overt predicate is linked to the introduced NP.

### Partitive and bare existence

`有啲(人)` is not automatically existential-marker evidence, and bare `有 + NP` without a
following NP-linked predicate is outside AA56.

### Temporal and lexical `有`

Temporal, conditional, measure, and lexical profiles such as `有一日`, `有一次`,
`有一段時間`, `有事`, `有可能`, `有機會`, and `帶有` are excluded.

### Negative `冇人 + predicate`

Ordinary negative-human clauses state that no person satisfies the predicate. They are not
the negative member of AA56. Negative existential, availability, event-negation, minimizer,
discourse-absence, rhetorical, and repair uses also require independent typing.

## Parser specification

The accepted implementation contract is recorded in:

```text
docs/research/AA56-POSITIVE-PARTICIPANT-INTRODUCTION-SPECIFICATION-R1.md
```

It requires positive `有`, an overt indefinite NP, an overt linked predicate, preservation of
external layers, composition with AA77, and explicit exclusion matrices. It authorizes no
runtime edit in Batch 20.

## Compatibility boundary

The legacy runtime label `ExistentialPresentationalClause`, current note path, and current
fixtures remain unchanged until a separate runtime migration. Existing negative
locative-coda fixtures are implementation history and cannot be cited as accepted positive
AA56 evidence.

## Permanent disposition

| Dimension | Disposition |
|---|---|
| UUID/code | retain |
| Canonical name | `JauMarkedIndefiniteNPPredication` |
| Claim layer | language construction |
| Family/profile | `ExistentialAndPresentationalClauses` / `SubjectlessJauIndefiniteNPPredicate` |
| Status | retain `research_pending` |
| Runtime | unchanged; later implementation required |
| Panel/held-out | still required |

## Protected and unchanged

- permanent UUID and short code;
- runtime behavior and emitted labels;
- executable fixtures;
- linguistic-status placement;
- frozen corpus classifications;
- survey, panel, and held-out state;
- runtime version;
- release and deployment state;
- merge authorization.

## Terminal outcome

AA56 has an accepted retained-UUID identity and a positive-only parser specification. The
next step is a separately authorized implementation package; no further broad AA56 corpus
search is required before that specification is implemented and tested.
