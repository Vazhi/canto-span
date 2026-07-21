---
title: Canto Span — Infrastructure Migration
status: in-progress
tags: [canto-span/plan, canto-span/migration]
related: "[[DEFINITION-OF-DONE]]"
---

# Infrastructure migration

## Goal

Reduce ceremony, drift risk, and file bloat without restarting the parser or discarding evidence, fixtures, status decisions, or history.

## Constraints

- Existing material is migrated or archived, not silently discarded.
- Each phase must produce a mechanically reviewable result.
- Migration work must remain smaller than the recurring work it replaces.

## Phase status

### Phase 1 — Git working history: complete

- baseline commit preserves v0.5.184 exactly;
- migration changes are a separate commit;
- the sandbox repository is explicitly temporary;
- full exports include `.git`;
- checkpoint-state, recovery-package, and packaging-manifest files are archived;
- `origin` is configured as `https://github.com/Vazhi/canto-span.git` and the local `main` branch tracks `origin/main`; full `.git` exports remain the ChatGPT transfer mechanism.

### Phase 2 — Construction notes in Obsidian: complete

- 171 active labels were exported to 171 notes under `grammar/`;
- note filenames and frontmatter construction names match exactly;
- source citations, locators, speaker scope, claims, boundary references, implementation state, blockers, and related-construction links were migrated;
- the export passed 3,641 mechanical checks;
- the former wide registries were archived under `archive/registry-pre-obsidian-v0.5.184/`;
- `grammar/*.md` is now the active authoring-time status owner.

### Phase 3 — Runtime metadata reduction: complete

- removed linguistic status, confidence, source, corpus, speaker, held-out, and promotion metadata from `main.js`;
- removed per-construction authoring metadata from runtime parse nodes and diagnostic exports;
- retained parser logic plus the 171-label active runtime registry;
- replaced the former runtime legitimacy lane with an active-label registration audit;
- archived tools whose purpose was synchronizing the embedded evidence registry;
- verified all 545 regression cases and a 545-case normalized before/after runtime-equivalence comparison;
- reduced `main.js` by approximately 340 KB without changing structural parser behavior.

### Phase 4 — Mechanical promotion validation: complete

- added explicit promotion-evidence fields to all 171 construction notes;
- added `tools/enforce-promotion-rules.js`, which fails closed on unsupported `provisional` or `supported_productive` status records;
- enforced the full current Definition of Done, including reviewed corpus evidence when used, two independent speakers for productive status, executable passing boundaries, code-document reconciliation, and separation of implementation validation from linguistic confidence;
- classified all current non-promoted statuses as quarantined or non-promotional by default;
- added focused accepted and rejected transition tests;
- integrated the promotion gate into `tools/verify-repository.sh`.

### Phase 5 — Standard executable construction tests: complete

- created `tests/` as the active executable-test authority;
- created exactly 171 files under `tests/constructions/`, one per active runtime label;
- migrated the 545 exact regression snapshots and 43 NP cases into `tests/fixtures/`;
- migrated focused positive and boundary cases for `PostverbalZoPerfectiveVP` and `ResourceUseLaiFunctionRelation`;
- added `npm test` as the single standard command;
- archived the former active fixture locations and manual render-review documents under `archive/migration-phase5-retired-test-workflow/`;
- exposed remaining coverage debt: 2 labels have positive and boundary tests, 100 have positive-only coverage, and 69 have no direct standardized case.

### Phase 6 — Active versus archived construction triage: pending

Choose a small active working set and move the remainder to an explicitly archived collection without deleting their records.

### Phase 7 — Repeatable reviewer workflow: pending

Formalize source checking and native-speaker review as reusable checklists. Second-speaker work remains frozen until explicitly unfrozen.
