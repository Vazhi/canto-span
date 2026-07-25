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
- Explicitly parked work: `data/parked-constructions.json`.

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

## Work availability

The repository uses a blacklist, not an active-note whitelist. Every current note
is available for bounded research, adjudication, specification, or implementation
unless its permanent identity appears in
[`data/parked-constructions.json`](../data/parked-constructions.json).

The parked registry is currently empty: **133 available / 0 parked**. An agent may
choose whichever available item offers the greatest expected project benefit,
subject to the evidence, identity, overlap, and verification rules in
`docs/current/00-START-HERE.md`.

If a parked construction becomes the best next target, recommend unpark with the
changed circumstances, expected benefit, and proposed bounded scope. Do not work
on it silently; remove it from the parked registry through an explicit reviewed
change first.

Legacy `workflow_state`, `workflow_priority`, `workflow_since`, `workflow_reason`,
and workflow tags remain in existing note frontmatter only as non-authoritative
compatibility metadata for older tooling and panel records. They do not park a
note or control agent work selection.

## Review order

1. Select the highest-benefit bounded non-parked question after checking current
   main, open PRs, dependencies, evidence gaps, learner impact, and ontology risk.
2. Resolve UUID-keyed adjudication when identity or ontology remains unsettled.
3. Compare the accepted canonical profile with the exact runtime path and status
   note before changing code or status.
4. Split composite wrappers using new UUIDs; never reuse an umbrella UUID for a
   different construction.
5. Review `unsupported_generalization` records for supportable narrow successors,
   not automatic promotion of the existing label.
6. Keep internal representations, compatibility aliases, diagnostics, and
   learner groupings out of direct linguistic promotion.

## Editing rules

- Do not duplicate a current note across status folders.
- A status change must update frontmatter, evidence, boundaries, current action,
  and file location in the same change.
- Parking and unparking belong only in `data/parked-constructions.json`; they do
  not move a grammar note or change its linguistic status.
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
identity, adjudication, discovery, status, parked-work, and runtime records remain
internally consistent.
