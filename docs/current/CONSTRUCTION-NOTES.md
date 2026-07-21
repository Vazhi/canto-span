---
title: Canto Span — Construction Notes
status: current
tags: [canto-span/grammar, canto-span/infrastructure]
related: "[[DEFINITION-OF-DONE]]"
---

# Construction notes

## Authority

Every current runtime construction has exactly one authoring note in one of two workflow collections:

- `grammar/active/<ConstructionName>.md` — the small current working set;
- `grammar/archived/<ConstructionName>.md` — current records parked outside the working set.

The union of both directories is the canonical 171-note construction registry. Workflow archiving does **not** retire a label, mark it runtime-inactive, erase its evidence, or change its linguistic status. Retired labels are a separate concept and remain outside the active runtime registry.

`GRAMMAR-INDEX.md` links all 171 notes, lists the active working set first, and summarizes workflow, status, and standardized-test coverage.

## Current working-set rule

The active working set must remain genuinely small. At this checkpoint it contains exactly:

1. `PostverbalZoPerfectiveVP`;
2. `ResourceUseLaiFunctionRelation`.

A parked note may return to `grammar/active/` only through the same commit that records its new work reason and priority. Workflow state is independent of linguistic status: a supported or provisional construction may be parked when no substantive work is currently scheduled.

## Required frontmatter

Each construction note records:

- construction name;
- linguistic status and confidence;
- claim layer and research lane;
- last recorded review date, or `unknown`;
- independent speaker count;
- mapped and verified source counts plus source IDs;
- drafted and executable boundary state;
- corpus-use and corpus-review state;
- code-document reconciliation state;
- separation of implementation and linguistic validation;
- independent evidence beyond internal tests;
- promotion-gate schema version;
- for active re-audits, native-review protocol/state/form links, canonical source-verification file, and Speaker A/B workflow states;
- standard construction-test file, coverage state, and positive/boundary/executable counts;
- runtime activity and basic fixture/reference counts;
- `workflow_state`: `active` or `archived`;
- `workflow_priority`: a positive integer for active notes, otherwise `null`;
- `workflow_since` and `workflow_reason`.

The note body records the plain-language claim, citations and locators, speaker-review scope, negative and boundary references, implementation state, blockers, and related constructions.

## Linking rule

Use plain links such as `[[PostverbalZoPerfectiveVP]]`. Do not use pipe aliases in framework or construction notes. Obsidian resolves these links across the active and archived subdirectories by note name.

## Historical wide schema

The former multi-table registry and the full embedded evidence snapshot are frozen under:

`archive/registry-pre-obsidian-v0.5.184/`

They are retained for audit and recovery but are not edited as current status records.

## Mechanical checks

Run:

```bash
npm test
node tools/verify-construction-notes.js
node tools/verify-active-working-set.js
node tools/verify-active-review-workflow.js
node tools/test-promotion-gate.js
node tools/enforce-promotion-rules.js
```

The commands must confirm:

- exactly 171 current construction notes;
- exactly 2 active and 169 workflow-archived notes;
- exact equality with the runtime active-label set;
- required frontmatter fields and path/state agreement;
- exact one-to-one construction-note / construction-test-file mapping;
- standardized test-count consistency;
- source-count consistency;
- valid plain `[[ConstructionName]]` links;
- no aliased wiki links;
- preservation of the frozen full-schema snapshot;
- for the active working set, exact source-checklist linkage, form/spec synchronization, speaker-state consistency, and non-automatic response counting.

## Editing rule

Edit the current construction note rather than the archived TSV/JSON registry. Any change to `status`, speaker count, source verification, boundary state, corpus use, code-document alignment, or workflow state must update the corresponding frontmatter fields in the same commit.

A note marked `provisional` or `supported_productive` cannot ship unless `tools/enforce-promotion-rules.js` passes. Other statuses are non-promoted by default and cannot become eligible merely because some evidence fields are true.
