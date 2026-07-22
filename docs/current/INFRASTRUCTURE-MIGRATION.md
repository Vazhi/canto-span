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
- the union of `grammar/active/*.md` and `grammar/archived/*.md` is now the authoring-time status owner.

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
- enforced the full current Definition of Done, including reviewed corpus evidence when used, the then-current independent-speaker requirement for productive status, executable passing boundaries, code-document reconciliation, and separation of implementation validation from linguistic confidence;
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

### Phase 6 — Active versus archived construction triage: complete

- selected exactly two current working notes: `PostverbalZoPerfectiveVP` and `ResourceUseLaiFunctionRelation`;
- moved the other 169 current construction records to `grammar/archived/`;
- retained `runtime_active: true`, evidence, status, tests, links, and runtime history for every parked note;
- added explicit workflow state, priority, date, reason, and matching Obsidian tags;
- updated all current loaders and test-metadata tools to read both workflow collections;
- added fail-closed path/state, count, priority, and archived-promotion checks;
- retired the destructive flat-layout regeneration tool to a historical Phase 6 archive;
- changed no parser behavior, linguistic status, test inventory, or runtime label.


### Phase 7 — Repeatable reviewer workflow: complete

- linked each active construction to one canonical source-verification TSV and exact counted source set;
- added a fail-closed 117-check audit for source locators, findings, limitations, note counts, speaker state, form privacy, stimulus equivalence, generated-code synchronization, and non-automatic counting;
- added two canonical instruments and three generated Google Forms: PFV01 Speaker B public, RUL01 Speaker A private, and RUL01 Speaker B public;
- added public recruitment copy that hides construction labels and asks respondents not to discuss items before submission;
- added CSV normalization with native-language, completeness, consent, and independence screening while forcing all normalized responses to remain uncounted pending duplicate review and manual adjudication;
- recorded the user’s packet-scoped authorization for the two active public Speaker B forms while leaving the archived backlog frozen;
- changed no parser behavior, linguistic status, source count, speaker count, runtime label, or standardized construction test.


### Phase 8 — Public-panel evidence integration: complete

- committed an anonymized 23-response × 21-item RUL01 public-panel matrix, item summary, comments, and construction-specific adjudication;
- recorded the user's one-time protocol exception without silently treating the flawed pilot as clean promotion evidence;
- separated total counted speaker evidence from `promotion_eligible_independent_speaker_count`;
- updated the promotion gate so a large pilot panel cannot satisfy the clean one- or two-speaker requirement automatically;
- added focused promotion-gate cases and a 109-check panel-snapshot audit that recomputes every item count;
- documented the next-instrument requirements: graded scale, per-item correction/context fields, randomized item blocks, fillers, contextualized ellipsis, interpretation checks, and semantic-plausibility separation;
- changed no parser behavior, runtime label, construction status, source count, or executable construction expectation.

## v0.5.188 RUL survey-readiness checkpoint

- froze a 30-case implementation-only RUL runtime map with zero linguistic evidence weight;
- recorded twelve contrast domains required before the next panel wave;
- preserved the competing instrumental-SVC, purposive-linker, and intended-function analyses;
- created no survey instrument and recorded the user prompt as the next required input;
- changed no parser behavior or linguistic status.

## v0.5.187 panel-model migration

The fixed two-role reviewer workflow is historical. Active evidence governance
now uses one role-neutral panel, item-level usable-judgment thresholds, and
clean-instrument gates. The former v1 Google Forms package is preserved only as
provenance for collected legacy data.

## v0.5.189 runtime-reachability checkpoint

- scanned 1,885 unique Cantonese-bearing strings from bounded structured project materials;
- identified 15 of the 68 formerly uncovered labels as observable in existing material;
- added one zero-linguistic-weight executable reachability probe for each observed label;
- introduced `implementation_positive_only` to keep runtime reachability separate from direct linguistic cases;
- retained 53 labels as `no_direct_cases`; “not observed” is not treated as unreachable;
- retired no labels because all 68 retain runtime code references;
- changed no parser span behavior or linguistic status.
## v0.5.193 experiential and delimited wrapper audit

- audited six related labels by complete-parser output and exact constructor behavior;
- added seven zero-weight implementation probes across six labels;
- reduced no-direct-case labels from 49 to 43;
- recorded negative-experiential, experiential-question, and cognition-content routing gaps without changing parser spans or linguistic status.

## v0.5.190 low-reference wrapper audit

- inspected five low-reference wrapper and clause labels at exact constructor level;
- added three semantically coherent zero-weight reachability probes;
- distinguished complete-parser output from a directly callable but currently shadowed internal `Comment` fallback;
- retired constructorless `TemporalAdverbialClause` while preserving its checked source and future research question;
- reduced active labels to 169 and no-direct-case labels to 49;
- changed no recognized parser span or retained linguistic status.

## v0.5.192 result/change-state wrapper audit

- added ten zero-weight implementation probes across ten result/change-state labels;
- kept `PerfectiveResultPredicate` at `no_direct_cases` because complete parser output is shadowed by `PerfectiveVP`;
- reduced the no-direct backlog to 33 labels without changing parser spans or linguistic statuses.

## v0.5.193 nominal-wrapper audit

- added direct zero-weight reachability probes for `OrdinalClassifierNP` and nested `PossessiveClassifierNP`;
- represented `DemonstrativeClassifierNP` as a compatibility-alias-only label backed by internal `OvertHeadDemonstrativeClassifierNP`;
- retired constructorless `DemonstrativeHeadNP` while preserving its historical record;
- current coverage is 2 positive-and-boundary, 100 positive-only, 36 implementation-positive-only, 1 compatibility-alias-only, and 29 no-direct labels.
