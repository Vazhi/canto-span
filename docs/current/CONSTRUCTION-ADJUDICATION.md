# Construction adjudication

## Purpose

Canto Span records expert label and ontology decisions separately from generated discovery scores and separately from mutable runtime labels.

The original adjudication document is:

```text
data/construction-adjudications.json
```

Later append-only batches are stored under:

```text
data/construction-adjudication-batches/*.json
```

Each decision is keyed by immutable `construction_uuid` and verified against the permanent short code and legacy runtime label. Batch files are applied in filename order, and duplicate UUIDs or short codes across batches are rejected.

## Current progress

As of Batch 07, 34 of 181 permanent records have completed expert adjudication across the original decision document and six append-only batch files. The latest accepted batch is documented in:

```text
docs/research/CONSTRUCTION-ADJUDICATION-BATCH-07.md
```

The count records completed ontology judgments only. It does not imply runtime migration, linguistic promotion, corpus closure, panel completion, or held-out validation.

## Required decision fields

Every completed adjudication records:

- approved canonical name;
- claim layer;
- family and exact profile;
- profile description;
- behavior–research alignment;
- terminology alignment;
- recommended disposition;
- status-migration recommendation;
- exact source, runtime, and test basis;
- source terminology;
- unresolved blockers.

## Application

Run:

```bash
npm run adjudication:apply
```

This applies all committed decisions to the permanent identity registry. Then regenerate the identity sweep and supported-productivity reports:

```bash
node tools/generate-construction-identities.js --write
npm run discovery:generate
```

Verification uses:

```bash
npm run verify:adjudications
npm run verify:identities
npm run verify:discovery
```

## Governance

- Adjudication never changes UUID or assigned short code.
- A rename preserves the runtime label under `legacy_labels` and adds it to `former_names`.
- A behavior-preserving rename normally retains the same UUID.
- A true construction split requires new UUIDs and predecessor/successor links.
- A wrapper that lacks independent language-construction status may be reclassified as `parser_representation` without deleting its history.
- A completed ontology review does not satisfy corpus, panel, held-out, or promotion gates.
- Runtime and status-path migrations remain explicit follow-up work; they are not silently performed by registry adjudication.
- Earlier batch documents remain unchanged after acceptance; corrections require a later superseding adjudication rather than rewriting history.
