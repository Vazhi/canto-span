# Grammar construction records by linguistic status

This directory is the canonical owner of **current linguistic status** and
note-local evidence for every active runtime label. Each active label has exactly
one note in the folder matching its `status` frontmatter.

These filenames and `construction` fields are legacy runtime labels. They are not
the durable construction identity and may differ from the current canonical name
in `data/construction-identities.json` after expert adjudication.

## Separate authorities

- UUID, short code, canonical name, family, profile, and claim layer:
  `data/construction-identities.json` plus accepted adjudications.
- Current linguistic status and note-local evidence: this directory.
- Actual recognition behavior: `main.js` and executable tests.
- Promotion readiness: `data/construction-candidate-readiness.json`.

A rename or internalization decision does not silently move a note, change a
runtime label, or alter a matcher. Those migrations require explicit scoped work.

## Status folders

| Folder | Current notes | Meaning |
|---|---:|---|
| [`supported_productive/`](./supported_productive/) | 0 | Exact narrow construction satisfies the full Definition of Done. |
| [`provisional_reaudit/`](./provisional_reaudit/) | 0 | Former acceptance withdrawn pending current-standard review. |
| [`provisional/`](./provisional/) | 0 | Narrow provisional support; productive requirements incomplete. |
| [`research_pending/`](./research_pending/) | 79 | Concrete linguistic question; provisional requirements incomplete. |
| [`unsupported_generalization/`](./unsupported_generalization/) | 37 | Existing broad claim lacks a defensible supported scope. |
| [`lexicalized_only/`](./lexicalized_only/) | 2 | Bounded lexical inventory only; no productive claim. |
| [`parser_heuristic/`](./parser_heuristic/) | 15 | Internal software representation, not a productive Cantonese claim. |
| [`retired/`](./retired/) | 48 | Navigation for labels absent from the active runtime registry. |

## Active runtime-note working set

Workflow state is independent of linguistic status and expert adjudication.
The two notes currently marked `workflow_state: active` are:

1. `ResourceUseLaiFunctionRelation` — canonical identity
   `AB53 ResourceInitialJungLaiFunctionClause`;
2. `PostverbalZoPerfectiveVP` — canonical identity
   `AB30 ZoMarkedPerfectiveObjectVP`.

All other current notes are workflow-archived, meaning parked rather than
retired. Repository-wide adjudication priority is tracked separately.

## Review order

1. Resolve the next UUID-keyed adjudication batch from the generated candidate
   ranking and ontology risks.
2. Compare the accepted canonical profile with the exact runtime path and status
   note before changing code or status.
3. Split composite wrappers using new UUIDs; never reuse an umbrella UUID for a
   different construction.
4. Review `unsupported_generalization` records for supportable narrow successors,
   not automatic promotion of the existing label.
5. Keep internal representations, compatibility aliases, diagnostics, and
   learner groupings out of direct linguistic promotion.

## Editing rules

- Do not duplicate a current note across status folders.
- A status change must update frontmatter, evidence, boundaries, current action,
  and file location in the same change.
- A workflow change edits frontmatter only.
- A canonical-name change belongs in the identity/adjudication records; preserve
  the legacy runtime label until an explicit compatibility migration.
- A true split creates new UUIDs and predecessor/successor links.
- Parser tests and implementation probes are not independent linguistic evidence.
- Retired labels preserve their history in the retired ledger and navigation
  index; retired codes are never reused.

## Verification

```bash
npm test
npm run verify:adjudications
npm run verify:identities
npm run verify:discovery
npm run verify
npm run verify:release
```

Verification requires one status note per active runtime label and checks that
identity, adjudication, discovery, and status records remain internally
consistent.
