# Permanent construction identity

## Purpose

Canto Span separates permanent machine identity from changing linguistic terminology and learner-facing presentation.

A construction record has four distinct identifiers:

1. `construction_uuid` — immutable global machine identity.
2. `construction_code` — immutable short human reference in SoSci-style `AA01` form.
3. `canonical_name` — current technical name; may change after research.
4. `learner_label` — presentation label; may be shared by many records.

Names and learner labels are metadata. Runtime, evidence, tests, surveys, migrations, and cross-record links must ultimately use `construction_uuid`.

## Accepted design

### UUID

- Existing records receive deterministic UUIDv5 values during the one-time migration.
- The migration namespace is fixed in the registry and must never change.
- The legacy label is only the bootstrap seed; later renaming does not recalculate the UUID.
- Future candidate records receive UUIDv4 values when created.
- UUIDs are never reused, deleted, or reassigned.

### Short code

- Canonical records receive a permanent two-letter, two-digit code: `AA01` through `ZZ99`.
- Codes are opaque. Letters do not encode lane, phrase type, claim layer, or status.
- Codes are never reused after retirement or supersession.
- Candidate records created on ordinary branches may have `construction_code: null`.
- A canonical code is assigned only through the allocation tool after collision review.

### Canonical name

- The canonical name describes the current narrow analysis.
- It may be revised without changing UUID or short code.
- Strong research terminology should be stored under `source_terms`, even when a theory-neutral canonical name is chosen.
- Code must not use the canonical name as the durable database key.

### Learner label

- Multiple UUIDs may share the same learner-facing label.
- Learner labels are presentation-only and may change independently.
- A learner label must never be used to infer grammatical identity.

## Identity versus revision

A clarification, new source, learner-text revision, or tighter boundary normally keeps the same UUID and increments `record_revision`.

A split into genuinely different constructions creates new UUIDs and codes. The original record becomes `superseded` and links to the successors.

A mistaken or obsolete record remains resolvable permanently with state `retired` or `superseded`. Its UUID and code remain reserved.

## Required baseline fields

Every canonical identity record must contain at least:

```yaml
construction_uuid: "UUID"
construction_code: "AA01"
canonical_name: "CurrentTechnicalName"
claim_layer: "language_construction"
profile_description: "Exact record-specific scope."
lifecycle_state: "current"
record_revision: 1
```

Family, profile, learner label, source terminology, relationships, and research reconciliation fields may initially be unresolved, but the sweep must record that they are unresolved rather than omit them silently.

## Label-quality sweep

Assigning a UUID does not validate a label. Every current and retired record receives an independent review covering:

- actual runtime behavior;
- source-supported construction scope;
- behavior–research alignment;
- terminology used by the strongest sources;
- overlap and collisions with other records;
- learner-facing grouping;
- recommended disposition: retain, rename, narrow, split, merge, internalize, supersede, quarantine, or keep retired.

The first machine-generated pass may flag naming risks, but automatic flags are not linguistic conclusions.

## Allocation safeguards

- The registry is append-preserving: existing UUID/code pairs may not change.
- Verification rejects duplicate UUIDs, duplicate non-null codes, reused retired codes, missing discovered labels, and orphaned records.
- New canonical code assignment must be serialized through the allocation tool.
- Candidate UUIDs can be created independently because UUIDv4 avoids branch collisions.
- Merged records preserve aliases and explicit predecessor/successor links.

## Migration principle

The initial identity migration covers every canonical current construction note and every label in the retired construction ledger. It changes identity metadata only. It does not promote a linguistic claim, restore a retired runtime matcher, or approve an existing label name.