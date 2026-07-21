---
title: Canto Span — Promotion Gate
status: current
tags: [canto-span/validation, canto-span/governance]
related: "[[DEFINITION-OF-DONE]]"
---

# Promotion gate

## Purpose

`tools/enforce-promotion-rules.js` rejects `provisional` and `supported_productive` statuses that do not satisfy the current [[DEFINITION-OF-DONE]]. It does not promote constructions and does not treat passing parser tests as linguistic evidence.

The current schema is `promotion_gate_version: "v2"`.

## Commands

```bash
node tools/test-promotion-gate.js
node tools/enforce-promotion-rules.js
node tools/test-release-handoff.js
node tools/verify-release-handoff.js
```

All four are run by `tools/verify-repository.sh`.

## Source enforcement

Every construction note records both `source_count` and `verified_source_count`. The gate independently counts `### SRC-*` records and recognized `Verification` states in the note.

For `supported_productive`:

- at least one external source must be cited;
- every cited source must have a recognized checked state;
- the declared counts must equal the actual source records.

For `provisional`, at least one checked source must support the narrower claim. Unchecked additional citations do not help satisfy that minimum.

## Corpus enforcement

The following fields are separate:

- `corpus_candidate_hit_count`;
- `corpus_genuine_hit_count`;
- `corpus_false_positive_count`;
- `corpus_ambiguous_hit_count`;
- `corpus_unusable_hit_count`.

When corpus evidence is used for `supported_productive`, every candidate must be classified and the four classification totals must exactly equal the candidate count. A raw hit count or a broad `corpus_hits_reviewed` assertion is insufficient.

## Native-speaker enforcement

`independent_speaker_count` records all counted speaker evidence. `promotion_eligible_independent_speaker_count`, when present, excludes retained but methodologically limited evidence. `same_contrast_independent_speaker_count` records only independent promotion-eligible speakers who judged the same relevant positive and negative contrasts.

- `provisional` requires at least one such speaker.
- `supported_productive` requires at least two.

A public pilot may remain useful evidence without satisfying either gate.

## Boundary enforcement

`provisional` requires drafted negative and boundary cases.

`supported_productive` additionally requires:

- `negative_boundary_inventory_complete: true`;
- executable boundary tests;
- passing boundary tests;
- at least one boundary case in the standardized construction test file;
- exact agreement between note metadata and the test file's coverage counts.

The completeness field is a reviewed inventory assertion: it states that every known must-not-match case in the construction's documented scope has an executable test. It cannot be inferred from the existence of some negative tests.

## Code-document enforcement

`supported_productive` requires all of the following from the current re-audit:

- `code_document_reconciled: true`;
- a dated `code_document_review_date`;
- the reviewed Git commit in `code_document_review_commit`;
- exact entries in `code_document_code_locations`;
- `current_standard_reaudit_complete: true`.

Historical implementation acceptance does not satisfy these fields.

## Release enforcement

`tools/verify-release-handoff.js` reads the current release audit record and:

- derives actual status changes from Git rather than trusting release prose;
- requires a complete audit-slice entry for every changed construction;
- rejects any `supported_productive` construction that has not passed the current gate;
- requires separate implementation-validation and linguistic-confidence lines;
- requires an explicit code-versus-release-document overclaim review;
- checks the 10–20 handoff dormant-label review cadence.

The current audit record is `docs/releases/v0.5.186-active-reaudit-closure-audit.json`.

## Non-promoted statuses

`provisional_reaudit`, `research_pending`, `unsupported_generalization`, `parser_heuristic`, and `lexicalized_only` remain non-promoted regardless of how many individual evidence fields happen to pass. Status changes require an explicit reviewed commit.
