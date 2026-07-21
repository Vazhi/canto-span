---
title: Canto Span — Promotion Gate
status: current
tags: [canto-span/validation, canto-span/governance]
related: "[[DEFINITION-OF-DONE]]"
---

# Promotion gate

## Purpose

`tools/enforce-promotion-rules.js` prevents a construction note from shipping with `status: provisional` or `status: supported_productive` unless its machine-readable evidence fields satisfy the current [[DEFINITION-OF-DONE]].

The gate does not promote constructions. It only rejects unsupported authored statuses.

## Commands

```bash
node tools/test-promotion-gate.js
node tools/enforce-promotion-rules.js
```

Both commands are also run by `tools/verify-repository.sh`.

## Required frontmatter fields

Every `grammar/<ConstructionName>.md` note contains:

- `verified_source_count` — source records whose verification state is explicitly recognized as checked;
- `independent_speaker_count` — independent project speaker records, equal to `speaker_count`;
- `negative_cases_drafted`;
- `negative_tests_executable`;
- `negative_tests_passing`;
- `corpus_evidence_used`;
- `corpus_hits_reviewed`;
- `code_document_reconciled`;
- `implementation_validation_separate`;
- `independent_evidence_beyond_internal_tests`;
- `promotion_gate_version` — currently `v1`.

A missing field is a validation failure. Passing executable boundaries require drafted boundaries. Passing boundary tests cannot be asserted when executable tests are absent.

## Status rules

### `supported_productive`

Requires all of the following:

- at least one verified source;
- at least two independent speakers;
- drafted, executable, passing negative and boundary tests;
- every corpus hit reviewed when corpus evidence is used;
- code and documentation reconciled;
- implementation validation reported separately from linguistic evidence;
- independent evidence beyond internal tests;
- a non-empty plain-language claim.

### `provisional`

Requires:

- at least one verified source;
- at least one independent speaker;
- drafted negative and boundary cases;
- independent evidence beyond internal tests;
- a non-empty plain-language claim.

### Other current statuses

`provisional_reaudit`, `research_pending`, `unsupported_generalization`, `parser_heuristic`, and `lexicalized_only` are non-promoted by default. Satisfying some evidence fields does not make them eligible automatically; the authored status must be changed explicitly in the same reviewed commit.

## Verified source states

The gate counts only explicit checked states:

- `PASS`;
- `VERIFIED_*`;
- `MANUALLY_REVIEWED_*`;
- `CURRENT_PAGE_REOPENED`;
- `FULL_TEXT_REOPENED`.

Unknown, missing, pending, or merely present verification text does not count.

## Editing rule

When evidence changes, update the note body and the corresponding frontmatter fields together. A status-only edit is not valid evidence work.
