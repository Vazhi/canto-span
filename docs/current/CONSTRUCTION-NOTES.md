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
- mapped source count and source IDs;
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

After migration, edit the construction note rather than the archived TSV/JSON registry. Phase 4 will add the validator that enforces the Definition of Done directly from these notes before any status change can ship.
