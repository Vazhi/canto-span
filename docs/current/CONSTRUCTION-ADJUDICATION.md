# Construction adjudication

## Purpose

Expert adjudication records current naming and ontology decisions separately from
mutable runtime labels, status-note placement, and generated discovery scores.
Every decision is keyed by immutable `construction_uuid` and checked against its
permanent short code and legacy runtime label.

## Canonical records

The initial accepted decisions are stored in:

```text
data/construction-adjudications.json
```

Later immutable batches are stored in filename order under:

```text
data/construction-adjudication-batches/*.json
```

Earlier accepted batches are never rewritten. A correction is a later
superseding decision with explicit rationale and relationships.

## Current progress

- permanent records: **181**;
- accepted adjudications: **34**;
- pending adjudications: **147**;
- accepted batches: **7**;
- latest batch report:
  `docs/research/CONSTRUCTION-ADJUDICATION-BATCH-07.md`.

This count records completed identity and ontology judgments only. It does not
imply runtime migration, status migration, corpus closure, panel completion,
held-out validation, or promotion.

The next planned batch is:

1. `AA26 CompletionVP`;
2. `AA34 CoverbFrame`;
3. `AA37 DegreeMannerAdverbial`;
4. `AA40 DegreeStativePredicate`;
5. `AA45 DesiderativeVP`.

## Required decision fields

Each completed decision records:

- UUID, permanent code, and legacy runtime label;
- approved canonical name;
- claim layer;
- family, exact profile, and structural description;
- behavior–research alignment;
- terminology alignment;
- recommended disposition and status-migration recommendation;
- exact source, runtime, and test basis;
- source terminology and scope relationship;
- former names and proposed successor profiles where applicable;
- rationale and unresolved blockers.

## Identity rules

- Adjudication never changes UUID or assigned short code.
- A behavior-preserving clarification or rename normally retains the UUID.
- A true construction split creates new UUIDs and predecessor/successor links.
- Evidence is not transferred automatically to a successor.
- A wrapper without independent language-construction status may be reclassified
  as `parser_representation` while preserving its history and runtime alias.
- Learner labels remain presentation-only.

## Atomic application workflow

Do not commit a raw batch and allow verification to fail before generated records
are refreshed. Apply, regenerate, verify, and commit one coherent state:

```bash
npm run adjudication:apply
npm run identity:generate
npm run discovery:generate
npm run verify:adjudications
npm run verify:identities
npm run verify:discovery
npm run verify
npm run verify:research
```

The accepted batch, regenerated identities, label sweep, candidate-readiness
registry, generated reports, and any affected current documentation belong in the
same pull request state.

GitHub Actions is read-only verification. The deleted branch-specific automatic
writer is not part of the current workflow and must not be restored.

## Relationship to runtime and status

An accepted adjudication may supersede an older technical name or claim-layer
analysis while the legacy runtime label and status-note path remain unchanged for
compatibility. Such a boundary must be explicit in current documentation.

Runtime-label migration, status-path migration, matcher changes, fixture changes,
new UUID allocation, and retirement are separate scoped actions. None occurs
silently merely because adjudication is complete.

## Relationship to discovery

Completed ontology review can remove internal or composite records from direct
linguistic promotion and can expose narrow successor work. It does not satisfy
source-scope, runtime-alignment, corpus, panel, held-out, or promotion gates.
Candidate scores remain planning aids only.
