---
title: Canto Span — Construction Notes
status: current
tags: [canto-span/grammar, canto-span/infrastructure]
related: "[[DEFINITION-OF-DONE]]"
---

# Construction notes

## Authority

Every current runtime construction has exactly one canonical authoring note under the folder matching its linguistic `status`:

- `grammar/supported_productive/`
- `grammar/provisional_reaudit/`
- `grammar/provisional/`
- `grammar/research_pending/`
- `grammar/unsupported_generalization/`
- `grammar/lexicalized_only/`
- `grammar/parser_heuristic/`

The union of those status directories is the canonical 160-note construction registry. A note must not be copied into more than one folder.

`grammar/retired/README.md` is a navigation index for labels removed from the runtime registry. It is not part of the current construction-note set and does not duplicate retired construction records.

`GRAMMAR-INDEX.md` groups all current notes by linguistic status and marks the two active workflow items.

## Status path rule

The parent directory and frontmatter must agree. For example:

```text
grammar/research_pending/PostverbalZoPerfectiveVP.md
```

must contain:

```yaml
status: "research_pending"
```

A linguistic status change therefore moves the file and updates the status, confidence, evidence, boundaries, and current action in the same commit.

## Workflow rule

Workflow state is independent of linguistic status and is stored only in frontmatter:

- `workflow_state: "active"` — selected for current bounded work;
- `workflow_state: "archived"` — parked, but still current and runtime-active.

At this checkpoint the active working set contains exactly:

1. `ResourceUseLaiFunctionRelation`, priority 1;
2. `PostverbalZoPerfectiveVP`, priority 2.

Changing workflow state does not move a file. Workflow archiving does **not** retire a label, erase evidence, or change linguistic status.

## Required frontmatter

Each construction note records:

- construction name;
- linguistic status and confidence;
- claim layer and research lane;
- last recorded review date, or `unknown`;
- total and eligible panel responses, minimum usable judgments per critical item, instrument version/status, contrast coverage, screening, adjudication, recruitment channels, and respondent-role neutrality;
- mapped and verified source counts plus source IDs;
- drafted, executable, passing, and complete-inventory boundary state;
- corpus-use state plus candidate and per-classification hit counts;
- current code-document reconciliation date, commit, and exact code locations;
- separation of implementation and linguistic validation;
- independent evidence beyond internal tests;
- promotion-gate schema version;
- panel evidence model, canonical panel policy/state links, and source-verification file;
- standard construction-test file, coverage state, and positive/boundary/executable counts;
- runtime activity and fixture/reference counts;
- `workflow_state`, `workflow_priority`, `workflow_since`, and `workflow_reason`.

The note body records the plain-language claim, citations and locators, panel-review scope, negative and boundary references, implementation state, blockers, and related constructions.

## Linking rule

Use plain links such as `[[PostverbalZoPerfectiveVP]]`. Do not use pipe aliases in framework or construction notes. Obsidian resolves note-name links across the status directories.

## Historical wide schema

The former multi-table registry and full embedded evidence snapshot are frozen under:

`archive/registry-pre-obsidian-v0.5.184/`

They remain available for audit and recovery but are not edited as current status records.

## Mechanical checks

Run:

```bash
npm run verify
npm run verify:release
```

The checks confirm:

- exactly 160 current construction notes;
- exactly 2 workflow-active and 158 workflow-archived notes;
- exact equality with the runtime active-label set;
- required frontmatter fields;
- exact status-folder/frontmatter agreement;
- exact one-to-one construction-note / construction-test-file mapping;
- standardized test-count and source-count consistency;
- valid plain `[[ConstructionName]]` links;
- no aliased wiki links;
- promotion and release-handoff rules.

## Editing rule

Edit the canonical note in its status folder rather than the archived TSV/JSON registry. A note marked `provisional` or `supported_productive` cannot ship unless `tools/enforce-promotion-rules.js` passes. Other statuses are non-promoted by default and cannot become eligible merely because some implementation checks pass.
