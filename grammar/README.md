# Grammar construction records by linguistic status

This directory is the canonical authoring registry for every runtime construction label. Each construction note exists **once**, in the folder matching its `status` frontmatter.

## Status folders

| Folder | Current notes | Meaning |
|---|---:|---|
| [`supported_productive/`](./supported_productive/) | 0 | The exact narrow construction satisfies the full definition of done. |
| [`provisional_reaudit/`](./provisional_reaudit/) | 0 | Former acceptance has been withdrawn pending review under the current standard. |
| [`provisional/`](./provisional/) | 0 | A narrow claim meets the provisional checklist but not the productive checklist. |
| [`research_pending/`](./research_pending/) | 65 | A concrete linguistic question exists, but provisional requirements are incomplete. |
| [`unsupported_generalization/`](./unsupported_generalization/) | 75 | The current broad claim has no defensible supported scope. |
| [`lexicalized_only/`](./lexicalized_only/) | 3 | Only bounded lexicalized expressions are retained; productive grammar is not claimed. |
| [`parser_heuristic/`](./parser_heuristic/) | 19 | Internal software representation; it is not a productive Cantonese grammar claim. |
| [`retired/`](./retired/) | 19 | Labels removed from the active runtime registry; this folder is a navigation index, not a second status owner. |

## Current working set

Workflow state is independent of linguistic status. Notes selected for current work remain in their status folder and carry `workflow_state: "active"` in frontmatter.

1. [[ResourceUseLaiFunctionRelation]] — `research_pending`, priority 1.
2. [[PostverbalZoPerfectiveVP]] — `research_pending`, priority 2.

All other current notes carry `workflow_state: "archived"`, meaning parked rather than retired.

## Manual review order

1. Start in [`research_pending/`](./research_pending/) for concrete unanswered questions.
2. Review [`unsupported_generalization/`](./unsupported_generalization/) for narrowing, replacement, quarantine, or retirement.
3. Check [`lexicalized_only/`](./lexicalized_only/) for accidental productivity claims.
4. Check [`parser_heuristic/`](./parser_heuristic/) for learner-facing overstatement or redundant implementation nodes.
5. Treat `provisional*` and `supported_productive` as high-burden states requiring complete current-standard evidence.

## Editing rules

- Do not duplicate a construction note across folders.
- A status change must update the note's `status`, confidence, evidence, boundaries, and current action in the same commit, then move the file to the matching folder.
- A workflow change updates frontmatter only; it does not move the file.
- Retired labels leave the runtime registry and current construction-note set. Preserve their disposition in the retired archive and [`retired/README.md`](./retired/README.md).
- Parser tests and implementation probes are not independent linguistic evidence.

## Verification

```bash
npm run verify
npm run verify:release
```

The verification tools require one note per runtime label and require every note path to match its linguistic status.
