# Permanent construction identity

## Purpose

Canto Span separates permanent machine identity from mutable terminology,
runtime aliases, linguistic status, and learner-facing presentation.

Every record has four distinct identifiers:

1. `construction_uuid` — immutable global machine identity;
2. `construction_code` — immutable short reference such as `AA01`;
3. `canonical_name` — current expert-approved technical name;
4. `learner_label` — optional presentation label that may be shared.

Runtime labels, note filenames, evidence links, tests, surveys, migrations, and
cross-record relationships must resolve to UUID. A legacy runtime label remains a
compatibility alias, not the durable key.

## Current registry

- permanent records: **181**;
- current runtime-linked records: **133**;
- retired records: **48**;
- expert-adjudicated records: **49**;
- accepted adjudication batches: **10**;
- allocated codes: `AA01` through `AB82`.

The canonical registry is `data/construction-identities.json`. The immutable lock
is `data/construction-identity-lock.json`. Accepted naming and ontology decisions
come from the adjudication records described in
[`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md).

## UUID rules

- Existing records received deterministic UUIDv5 values during the one-time
  migration.
- The fixed migration namespace never changes.
- The bootstrap legacy label never recalculates the UUID after a rename.
- Future candidates receive UUIDv4 values.
- UUIDs are never reused, deleted, or reassigned.

## Short-code rules

- Canonical records receive an opaque two-letter, two-digit code from `AA01` to
  `ZZ99`.
- Letters and digits encode no lane, phrase type, status, or claim layer.
- Codes are never reused after retirement or supersession.
- Ordinary branch candidates may temporarily have `construction_code: null`.
- Canonical code allocation is serialized through the allocation tool after
  collision review.

## Canonical-name rules

- The canonical name describes the current narrow profile.
- It may change without changing UUID or code.
- Prefer observable, form-based, theory-neutral wording when research does not
  settle one analysis.
- Preserve source terminology separately under `source_terms` with its source ID
  and scope relationship.
- Code must not use canonical name as a durable database key.

## Learner-label rules

- Multiple UUIDs may share a learner label.
- Learner labels may change independently of technical analysis.
- A learner label never establishes grammatical identity, evidence transfer,
  status, or promotion eligibility.

## Revision, split, and retirement

A clarification, source update, learner-text revision, or tighter boundary
normally retains the UUID and increments `record_revision`.

A true split creates new UUIDs and codes. The original record remains permanently
resolvable and links to its successors. Evidence transfers only when its exact
scope matches a successor; shared vocabulary or surface tokens are insufficient.

A mistaken, obsolete, retired, or superseded record remains in the permanent
registry. Its UUID and code remain reserved.

## Required record fields

```yaml
construction_uuid: "UUID"
construction_code: "AA01"
canonical_name: "CurrentTechnicalName"
claim_layer: "language_construction"
profile_description: "Exact record-specific scope."
lifecycle_state: "current"
record_revision: 1
```

Family, profile, learner label, source terminology, relationships, and alignment
fields may be unresolved during migration, but unresolved state must be explicit.

## Label-quality adjudication

Assigning an identity does not approve a label. Review covers:

- actual runtime behavior;
- source-supported scope;
- behavior–research alignment;
- strongest source terminology;
- overlap and collisions;
- claim layer and family/profile placement;
- learner grouping;
- disposition: retain, rename, narrow, split, merge, internalize, supersede,
  quarantine, reopen, or keep retired.

Machine-generated risk flags are triage signals, not linguistic conclusions.

## Supported-productivity discovery

`data/construction-candidate-readiness.json` evaluates each UUID against separate
hard gates: defined language claim, verified sources, scope match, runtime
alignment, positive implementation cases, complete negative boundaries, reviewed
corpus, clean role-neutral panel, held-out validation, and ontology closure.

Candidate states include `source_supported`, `behavior_aligned`,
`boundary_ready`, `evidence_ready`, `heldout_ready`, `promotion_review`,
`narrowing_candidate`, `retired_evidence_rehome_candidate`,
`retired_research_gap`, `lexicalized_review`, and `excluded_nonlanguage`.

Scores rank research effort only. They cannot compensate for a failed hard gate
or authorize promotion.

Canonical generated reports:

- `docs/research/SUPPORTED-PRODUCTIVE-CANDIDATES.md`;
- `docs/research/ORPHANED-CONSTRUCTION-EVIDENCE.md`;
- `docs/research/CONSTRUCTION-FAMILY-GAPS.md`;
- `docs/research/FULL-REPO-SUPPORTED-PRODUCTIVE-SWEEP-R1.md`.

## Safeguards

Verification rejects duplicate UUIDs, duplicate codes, reused retired codes,
missing current or retired identities, orphaned records, code changes, and stale
deterministic outputs. New allocation must use the identity tools.

The identity migration and later adjudications do not by themselves promote a
claim, change a matcher, move a status note, restore a retired label, or approve a
learner-facing explanation.
