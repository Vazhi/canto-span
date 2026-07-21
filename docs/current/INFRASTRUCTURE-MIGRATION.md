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
- a remote may be added later but is not required for Git history or diffs.

### Phase 2 — Construction notes in Obsidian: next

Create one note per active construction under `grammar/`, mechanically verify the note count against the 171-row registry, and archive the old full-schema registry as historical reference.

### Phase 3 — Runtime metadata reduction: pending

Move authoring-time evidence metadata out of `main.js`, retaining parser heuristics and the minimal active-label information required at runtime.

### Phase 4 — Mechanical promotion validation: pending

Add a Node validation command that reads construction-note frontmatter and rejects status changes that fail the Definition of Done.

### Phase 5 — Standard executable construction tests: pending

Consolidate active boundary and positive cases into one test directory and one command, while retaining historical test records under `archive/`.

### Phase 6 — Active versus archived construction triage: pending

Choose a small active working set and move the remainder to an explicitly archived collection without deleting their records.

### Phase 7 — Repeatable reviewer workflow: pending

Formalize source checking and native-speaker review as reusable checklists. Second-speaker work remains frozen until explicitly unfrozen.
