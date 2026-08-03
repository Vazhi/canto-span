# Final corpus-ingress review: Dialog 004 — 想走但唔想失禮

Source ID: `GLOSSIKA-YUEHK-A1-DLG-004-20251221`
Parent issue: #140
Work claim: #491
Review PR: #492
Follow-up route owner: #494

## Result

All 88 records now have terminal expert dispositions:

- 3 exact source-record duplicates;
- 2 normalized source-record duplicates;
- 39 lexical-only attestations;
- 27 new dialog or stage-context attestations;
- 17 unresolved contextual-naturalness candidates;
- 0 unreviewed records and 0 source replacements.

The accepted duplicate rows are I051 `不過`, I074 `緊要`, I075 `遲到`, normalized I045 `唔好意思`, and normalized I071 `點解`. Documentation and runtime occurrences are not duplicate owners.

## Context integrity

The package preserves two distinct source chains:

1. all 44 events, including I015, I027, and I036 stage directions;
2. the 41 spoken turns, whose previous/next links skip stage directions.

Stage directions are retained as discourse context but are not treated as spoken syntax. All 44 event English fields remain `null` because the source supplied no translations.

## Evidence boundary

Issue #494 gives every naturalness candidate and source alert a named terminal route. Provider explanations and confidence labels remain metadata. The aggregate map’s omission of stage directions and null turn adjacency are recorded as aggregation limitations, not corrected here. Runtime labels and `NeedsContext` outputs remain implementation observations only.

No parser, runtime, identity/status, survey, release, deployment, or merge-authority change is made.
