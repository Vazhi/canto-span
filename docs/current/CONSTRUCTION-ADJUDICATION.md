# Construction adjudication

## Purpose

Canto Span records expert label and ontology decisions separately from generated discovery scores and separately from mutable runtime labels.

The authoritative adjudication file is:

```text
data/construction-adjudications.json
```

Each decision is keyed by immutable `construction_uuid` and verified against the permanent short code and legacy runtime label.

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

This applies committed decisions to the permanent identity registry, regenerates the label sweep, and regenerates supported-productivity discovery reports.

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
