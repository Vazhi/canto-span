# Documentation authority map

## Authority order

1. `PROJECT-STATE.md` — mutable baseline, active candidate, accepted scope, unresolved exclusions, and next action.
2. `DOCTRINE.md` — stable binding principles.
3. `EVIDENCE-AND-PROVENANCE.md` — evidence definitions, source relationships, independence rules, and canonical evidence records.
4. `WORKFLOW.md` — execution sequence and checkpoint requirements.
5. `VALIDATION-AND-ACCEPTANCE.md` — gate definitions and allowed dispositions.
6. `PACKAGING-AND-RECOVERY.md` — package boundaries and retention rules.
7. Root state pointers and `PROGRESS-CHECKPOINT.json` — concise resumable copies of `PROJECT-STATE.md`.
8. `docs/research/` and `test-data/` — canonical evidence, provenance, accepted records, and historical decisions; not operational authority.
9. `archive/` — superseded documentation, checkpoints, searches, releases, and packaging history; never active instruction.

## One-owner rule

Each subject has one authoritative owner:

| Subject | Owner |
|---|---|
| Current runtime, candidate, counts, accepted scope, next action | `PROJECT-STATE.md` |
| Stable linguistic and parser principles | `DOCTRINE.md` |
| Evidence meaning and provenance requirements | `EVIDENCE-AND-PROVENANCE.md` |
| Work sequence and checkpoint cadence | `WORKFLOW.md` |
| Gate definitions and dispositions | `VALIDATION-AND-ACCEPTANCE.md` |
| Package contents and separation | `PACKAGING-AND-RECOVERY.md` |
| Historical chronology | `CHANGELOG.md` and `archive/` |

Other files may link to these facts but should not restate mutable details unless they are intentionally concise state pointers.

## Conflict and history rules

- Current authority outranks research records and archives.
- A research record's words such as “pending,” “unauthorized,” “next,” or “required” apply only to the recorded checkpoint unless `PROJECT-STATE.md` explicitly adopts them.
- Historical files are preserved rather than rewritten, because changing them would corrupt provenance.
- A superseded file that can be mistaken for current state belongs under `archive/`, not at the project root.

## Atomic update rule

A state-changing release must update together:

- `PROJECT-STATE.md` and root state pointers;
- `PROGRESS-CHECKPOINT.json` and `PACKAGING-MANIFEST.json`;
- acceptance or rejection record;
- evidence/provenance records affected by the change;
- validation and render records;
- package manifests and hashes.

A documentation-only consolidation must state that runtime behavior is unchanged and regenerate documentation, package-separation, and archive-integrity checks.
