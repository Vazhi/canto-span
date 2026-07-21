# Mandatory Download and Recovery Protocol

> **Current authority — 2026-07-17 / CP021A:** This protocol uses event-based interim exports so a coherent research batch cannot accumulate until conversation limits destroy it.

This protocol overrides any weaker checkpoint, reporting, or packaging instruction.

## Non-negotiable rule

A research, documentation, implementation, validation, or packaging batch is **not complete** until recovery artifacts have been created successfully, verified, and linked to the user.

> **No download, no checkpoint. No checkpoint, no continuation.**

## Required artifacts after every substantive batch

### Human-readable checkpoint

Suggested filename:

```text
CANTO-SPAN-CHECKPOINT-<batch-id>.md
```

Required fields:

- batch ID and date;
- accepted baseline and active candidate;
- exact task or research question;
- work completed;
- sources/evidence examined;
- findings and dispositions;
- unresolved questions;
- doctrine and parser impact;
- files changed/created/removed;
- validation, failures, and warnings;
- next action;
- exact continuation instructions.

For research batches also include the neutral question, search-protocol version, screened-source manifest state, proposition-extraction state, and claim-source-edge state.

### Machine-readable checkpoint

Suggested filename:

```text
canto-span-checkpoint-<batch-id>.json
```

Required fields:

```json
{
  "batch_id": "",
  "baseline_version": "",
  "historical_accepted_governance": "",
  "binding_operational_governance": "",
  "candidate_version": null,
  "status": "",
  "legacy_claim_promotion_gate": "AUTHORITY_ORIGIN_RECONSTRUCTION_REQUIRED",
  "future_grammar_gate": "AUTHORITY_ORIGIN_LIFECYCLE_REQUIRED",
  "files_changed": [],
  "files_created": [],
  "files_removed": [],
  "research_questions": [],
  "sources_recorded": [],
  "search_protocol_status": "",
  "screened_source_manifest": "",
  "proposition_extraction_status": "",
  "claim_source_edge_status": "",
  "decisions": [],
  "frozen_remediation_candidates": [],
  "unresolved_items": [],
  "validation": {},
  "next_actions": [],
  "artifact_manifest": []
}
```

### Batch recovery package

Suggested filename:

```text
canto-span-recovery-<batch-id>.zip
```

Include everything required to resume: current docs, ledger, queue, checkpoint files, source dossiers, evidence tables, changed files, validation results, provenance, and candidate state.

### Rolling recovery package

Always update:

```text
canto-span-current-recovery.zip
```

This is the simplest handoff path and must represent the actual latest documented state.

### Installable candidate package

When runtime, tooling, fixtures, corpus, lexicon, validation surface, or distributable documentation changes, also provide a separately installable one-root plugin ZIP. The installable package and recovery package serve different purposes and neither replaces the other.

## Maximum unexported work

No substantive evidence batch may wait until final synthesis for its first downloadable recovery point.

Create an `IN_PROGRESS` checkpoint skeleton and recovery ZIP as soon as the question and discovery protocol are frozen. Rebuild and expose recovery artifacts when:

1. the source-screening manifest is frozen;
2. proposition extraction is completed or materially changes the answer space;
3. synthesis/disposition is recorded;
4. implementation or major validation would begin;
5. a different research branch would open;
6. interruption risk appears or the user requests a checkpoint.

These are evidence-state events, not arbitrary source, example, or time quotas. A larger coherent family audit may continue across several exports, but no meaningful source screen, extraction, or synthesis may exist only in chat or only in a transient workspace.

## Verification before reporting readiness

Verify:

```text
[ ] All artifact files exist
[ ] All artifact files are non-empty
[ ] Checkpoint JSON parses
[ ] Markdown is readable
[ ] Recovery ZIP passes integrity testing
[ ] Rolling recovery ZIP passes integrity testing
[ ] Installable ZIP passes integrity testing when required
[ ] Required files are present
[ ] Installable ZIP contains one canto-span/ root
[ ] manifest.json and main.js are present in installable ZIP
[ ] Major archive SHA-256 values are recorded
[ ] Artifact manifest matches actual files
[ ] Package state matches the latest queue and documentation
[ ] Download links are provided before continuation
```

Do not claim verification that was not performed.

## Atomic checkpoint order

1. write findings to the active ledger;
2. update authoritative documentation where justified;
3. update the remaining queue;
4. create checkpoint Markdown;
5. create checkpoint JSON;
6. assemble recovery ZIP;
7. assemble installable ZIP when required;
8. update rolling recovery ZIP;
9. verify every artifact;
10. calculate and record SHA-256;
11. provide direct download links;
12. only then begin another substantive batch.

Changing state or queue after step 6 requires rebuilding the affected archives.

## Mandatory stop condition

If artifacts cannot be created or verified:

- stop the batch;
- state exactly what exists only in the workspace;
- provide any partial artifacts that can be verified;
- do not begin another substantive batch;
- do not claim the work is safely preserved.

## User-facing downloads section

End each batch response with an easy-to-find section containing links for:

- recovery package;
- human-readable checkpoint;
- machine-readable checkpoint;
- rolling recovery package;
- installable candidate package, if required;
- diagnostic/acceptance note, if applicable;
- checksum manifest.

Do not provide only local filesystem paths or filenames.

## Runtime and acceptance boundary

A recovery or installable ZIP is not acceptance. Packaging cannot change accepted parser behavior, accepted governance, legitimacy statuses, or rendered acceptance state.
