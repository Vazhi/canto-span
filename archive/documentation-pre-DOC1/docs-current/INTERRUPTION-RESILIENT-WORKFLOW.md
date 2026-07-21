# Interruption-Resilient Workflow

> **CP020R2-RA1 state — 2026-07-17:** The indefinite new-grammar freeze and replacement-only rule remain retired. Legacy Cantonese-language claims remain non-promotable until reconstructed from screened external evidence; future grammar must follow the authority-origin lifecycle. Parser `v0.5.174` is accepted after full rendered review; there is no active candidate.

`MANDATORY-DOWNLOAD-AND-RECOVERY-PROTOCOL.md` is the controlling artifact protocol. This document covers write-ahead work and resumption.

## Write-ahead principle

No significant evidence, conclusion, design decision, test result, unresolved question, or remediation finding may exist only in chat. Append it to the active ledger when discovered.

## Batch boundary

Use one coherent research goal per batch. Do not enforce numerical caps on sources, examples, or minutes. Continue while the material belongs to the same auditable question, but export an independently resumable checkpoint at question freeze, source-screen freeze, proposition-extraction completion, synthesis, and pre-implementation. Also export before a substantially new branch, major validation, material context-loss risk, or a user-requested checkpoint.

## Resume procedure

1. Select the newest verified rolling recovery ZIP or batch recovery ZIP.
2. Verify its SHA-256 and ZIP integrity.
3. Read `HANDOFF.md`, `CURRENT-STATE.md`, `CHECKPOINT-STATE.md`, and the ledger.
4. Confirm manifest, accepted baseline, candidate, provenance-gate state, and last completed lifecycle event.
5. Re-run the validation subset recorded in the checkpoint.
6. Continue only from the listed next action.
7. Do not repeat completed research unless provenance is inadequate, evidence cannot be verified, newer evidence conflicts, or the prior work never reached a checkpoint.

## Checkpoint identity

Use monotonic batch IDs. A checkpoint ID is not a plugin version and is not acceptance.

## Partial work

A checkpoint may contain incomplete research, failures, contradictions, or provisional results. Label them plainly. Preserve failures and opposing evidence rather than cleaning the package to look complete.

## Stop on artifact failure

If recovery artifacts cannot be created or verified, stop. Further substantive work is prohibited until a valid checkpoint exists.
