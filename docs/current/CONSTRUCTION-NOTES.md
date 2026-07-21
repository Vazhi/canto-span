---
title: Canto Span — Construction Notes
status: current
tags: [canto-span/grammar, canto-span/infrastructure]
related: "[[DEFINITION-OF-DONE]]"
---

# Construction notes

## Authority

Each active construction has exactly one note under `grammar/<ConstructionName>.md`. These notes are the authoring-time owner for linguistic status, confidence, sources, speaker scope, claims, boundary records, implementation state, and unresolved questions.

`GRAMMAR-INDEX.md` links all active notes and summarizes status counts.

## Required frontmatter

Each construction note records:

- construction name;
- linguistic status;
- linguistic confidence;
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
- runtime activity and basic fixture/reference counts.

The note body records the plain-language claim, citations and locators, speaker-review scope, negative and boundary references, implementation state, blockers, and related constructions.

## Linking rule

Use plain links such as `[[PostverbalZoPerfectiveVP]]`. Do not use pipe aliases in framework or construction notes.

## Historical wide schema

The former multi-table registry and the full embedded evidence snapshot are frozen under:

`archive/registry-pre-obsidian-v0.5.184/`

They are retained for audit and recovery but are not edited as current status records.

## Mechanical checks

Run:

```bash
node tools/verify-construction-notes.js
node tools/test-promotion-gate.js
node tools/enforce-promotion-rules.js
```

The command must confirm:

- exactly 171 construction notes;
- exact equality with the runtime active-label set;
- status equality with the current runtime;
- required frontmatter fields;
- source-count consistency;
- valid plain `[[ConstructionName]]` links;
- no aliased wiki links;
- preservation of the frozen full-schema snapshot.

## Editing rule

Edit the construction note rather than the archived TSV/JSON registry. Any change to `status`, speaker count, source verification, boundary state, corpus use, or code-document alignment must update the corresponding frontmatter fields in the same commit.

A note marked `provisional` or `supported_productive` cannot ship unless `tools/enforce-promotion-rules.js` passes. Other statuses are non-promoted by default and cannot become eligible merely because some evidence fields are true.
