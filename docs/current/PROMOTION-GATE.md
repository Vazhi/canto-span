---
title: Canto Span — Promotion Gate
status: current
tags: [canto-span/validation, canto-span/governance]
related: "[[DEFINITION-OF-DONE]]"
---

# Promotion gate

`tools/enforce-promotion-rules.js` rejects `provisional` and
`supported_productive` records that fail the current Definition of Done. It
does not promote constructions and does not treat parser tests as linguistic
evidence.

The current schema is `promotion_gate_version: "v3"`.

## Commands

```bash
node tools/test-promotion-gate.js
node tools/enforce-promotion-rules.js
node tools/test-release-handoff.js
node tools/verify-release-handoff.js
```

## Source and corpus enforcement

Every cited source must be represented in the construction note. Productive
promotion requires all cited sources checked. When corpus evidence is used,
every candidate hit must be classified and the classification totals must equal
the candidate count.

## Native-panel enforcement

The gate reads:

- `panel_response_count_total`;
- `eligible_panel_response_count`;
- `minimum_usable_judgments_per_critical_item`;
- `critical_contrast_coverage`;
- `survey_instrument_version` and `survey_instrument_status`;
- `survey_instrument_quality_resolved`;
- `quality_screen_status` and `panel_adjudication_status`;
- `recruitment_channels`;
- `respondent_role_neutral`.

`provisional` requires at least 10 usable judgments per critical item from a
`pilot_clean`, `locked_clean`, or `closed_clean` role-neutral instrument, with
complete positive and negative contrast coverage and completed screening and
adjudication.

`supported_productive` requires at least 30 usable judgments per critical item
from a `locked_clean` or `closed_clean` instrument, plus every other productive
requirement.

A named reviewer, a private form, or a large limited pilot receives no special
credit.

## Boundary and code enforcement

`provisional` requires drafted boundaries. `supported_productive` additionally
requires a complete inventory, executable passing tests, exact test-count
agreement, current code/document reconciliation metadata, separate
implementation and linguistic reporting, and a completed current-standard
re-audit.

## Release enforcement

The release gate derives status changes from Git and requires an audit record
for every change. Each changed-construction record includes verifiable sources,
exact code locations, survey version, total and eligible panel responses,
minimum usable critical-item sample size, instrument and adjudication state,
and unresolved questions.

Non-promoted statuses remain quarantined regardless of individual evidence
fields.
