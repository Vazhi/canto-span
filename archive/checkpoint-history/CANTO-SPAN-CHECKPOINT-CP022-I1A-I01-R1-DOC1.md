# Canto Span checkpoint CP022-I1A-I01-R1-DOC1

This checkpoint consolidates documentation, verifies source accounting, restores historical research records to a separate archive, and enforces runtime/recovery package separation. Parser runtime bytes remain unchanged from I01 R1.

## Source-accounting result

- Active labels: 177
- Active language or lexicalized-language labels: 157
- Positively mapped to external sources: 156
- Explicit source-gap quarantine: `ScalarRangeFragment`
- Active internal representation or heuristic labels: 20
- Unaccounted active labels: 0
- Cumulative source-matrix rows: 1,084
- Source identifiers in the cumulative matrix: 116
- Current source-map dossiers: 30

All active labels are research-accounted. It is intentionally **not** claimed that every active language label has positive support. `ScalarRangeFragment` remains unsupported, dormant, non-promotable, and scheduled for merge or retirement unless new evidence appears.

## Research-retention result

- 141 selected research files remain byte-identical in current canonical locations.
- 323 previously removed historical research files were restored under `archive/research-history/`.
- 2 evolved provenance files retain their current versions and have their original full-checkpoint versions archived.
- Missing selected research files: 0.

## Documentation result

The former overlapping `docs/current/` set was replaced by eight authoritative files:

- `00-START-HERE.md`
- `PROJECT-STATE.md`
- `DOCTRINE.md`
- `EVIDENCE-AND-PROVENANCE.md`
- `WORKFLOW.md`
- `VALIDATION-AND-ACCEPTANCE.md`
- `PACKAGING-AND-RECOVERY.md`
- `DOCUMENTATION-MAP.md`

Superseded documents remain in `archive/documentation-pre-DOC1/` as historical evidence only.

## Packaging rule

The runtime ZIP contains exactly `main.js`, `manifest.json`, and `styles.css`. Research, documentation, validation, tools, tests, history, render notes, and recovery files belong only in the separate recovery/research ZIP. Evaluator custody remains separate from both.

## Runtime and candidate state

- Candidate: `v0.5.179-cp022-i1a-i01-neutral-clause-span-consolidation-r1`
- Accepted baseline: `v0.5.178-cp022-i1a-i02-clause-relation-graph-cleanup-r1`
- I01 render pending
- Six I01 held-out cases sealed
- `supported_productive = 0`
