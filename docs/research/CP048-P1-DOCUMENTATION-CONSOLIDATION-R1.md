# CP048-P1 Documentation consolidation R1

## Decision

Consolidate the active evidence, status, survey, validation, promotion, and
release workflow into one current document:

`docs/current/GOVERNANCE.md`

The seven prior policy files remain only as compatibility pointers so older
research links continue to resolve. `INFRASTRUCTURE-MIGRATION.md` is reduced to
a completed-history pointer, and the stale root-level v0.5.184 NP checkpoint is
moved under `archive/release-history/`.

## Contradictions removed

The canonical construction notes contain:

- 62 `research_pending` records;
- 81 `unsupported_generalization` records.

`grammar/README.md` and the corresponding status-folder README files still
reported 61 and 82. Those counts are corrected.

Repeated current-policy statements about named Speaker A/B roles, private
reviewers, fixed two-person evidence, old migration phases, and versioned
validation directories are removed from the authoritative layer. Historical
records remain available but no longer compete with current governance.

## Enforcement change

`tools/verify-documentation-consistency.js` remains the one documentation
verifier. Its schema advances to v2 and now checks:

- package, manifest, and runtime-version agreement;
- canonical note and status counts;
- workflow-active and workflow-archived counts;
- retired-label count;
- grammar status-folder README counts;
- regression, NP, construction-file, assertion, and coverage totals;
- JSON validity and local Markdown links.

This is an extension of the existing stable check, not a new verifier or
release-specific audit framework.

The obsolete standalone review-only-readiness audit script and its stale root
validation outputs are removed. Its historical TSV records remain available to
construction notes that cite them.

## Non-changes

This checkpoint changes no:

- parser span or token role;
- runtime construction label;
- linguistic status or confidence;
- source, corpus, or panel evidence;
- survey response or adjudication;
- regression or construction expectation.

## Checkpoint

Release: `v0.5.205-documentation-consolidation`

Next work resumes source/runtime reconciliation among the 58 remaining
implementation-only labels without creating new permanent verification
machinery.
