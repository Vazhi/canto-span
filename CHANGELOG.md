## v0.5.190 — low-reference wrapper audit

- Audited `Comment`, `ComparativeStative`, `DefinitionComplement`, `DefinitionExplanatoryFrame`, and `TemporalAdverbialClause` at exact constructor level.
- Added three zero-evidence implementation probes and increased construction assertions from 1,171 to 1,174.
- Retired constructorless `TemporalAdverbialClause`; preserved its source record and former note in the retirement archive.
- Kept `Comment` active but unresolved because its direct fallback exists while complete parser output remains unobserved in the bounded scan.
- Reduced current labels from 170 to 169 and no-direct-case labels from 53 to 49.
- Changed no recognized parser span or retained linguistic status.

## v0.5.189 — runtime reachability audit

- Scanned 1,885 unique Cantonese-bearing strings from structured project materials.
- Found 15 of the 68 formerly uncovered labels in existing parser output and added one zero-weight implementation probe for each.
- Added the distinct `implementation_positive_only` coverage state so reachability is not confused with linguistic evidence.
- Left 53 labels as `no_direct_cases`; none were declared unreachable or retired.
- Increased standardized construction assertions from 1,156 to 1,171.
- Changed no parser span behavior, runtime label, or linguistic status.

## v0.5.188 — RUL survey-readiness checkpoint

- Reopened the checked RUL sources and preserved the competing instrumental-SVC, purposive-linker, and intended-function analyses.
- Mapped 30 implementation-only probes across direct resources, semantic mismatches, person/ellipsis readings, modal and copular frames, aspect, separate users, coordination, questions, and adverb attachment.
- Defined twelve source- and runtime-linked contrast requirements for the next mixed RUL/PFV pilot.
- Marked every generated probe as zero-weight implementation mapping rather than linguistic evidence.
- Created no survey instrument; the next blocking input is the user prompt that will guide `pilot-v1` creation.
- Changed no parser span behavior, runtime label, linguistic status, fixture expectation, or standardized construction assertion.

## v0.5.187 — role-neutral native-panel evidence

- Retired the fixed Speaker A / Speaker B evidence model.
- Required every respondent, including the user's wife, to use the same instrument and inclusion criteria with no special weight.
- Replaced named-speaker counts with total and eligible panel responses, minimum usable judgments per critical item, instrument quality, contrast coverage, screening, and adjudication fields.
- Set project thresholds at 10 clean judgments per critical item for `provisional` and 30 from a locked clean instrument for `supported_productive`.
- Downgraded `PostverbalZoPerfectiveVP` from `provisional` to `research_pending` because its mixed legacy instruments do not satisfy panel-v2.
- Preserved all historical PFV and RUL responses and recorded the user's report of 50 live RUL responses without treating unsnapshotted rows as canonical evidence.
- Changed no parser span behavior, runtime label, fixture, or standardized construction expectation.

## v0.5.186 — active re-audit closure

- Closed both current `provisional_reaudit` records without weakening the Definition of Done.
- Retained `PostverbalZoPerfectiveVP` as a narrow structural `provisional` construction with four checked sources and one clean same-contrast speaker; preserved ten legacy-panel responses as non-promotional evidence.
- Returned `ResourceUseLaiFunctionRelation` to `research_pending` because its pilot does not resolve the intended parse or code/document boundaries.
- Retired the unused duplicate `TopicCommentClause` label and preserved its historical record.
- Runtime now contains 170 labels; `supported_productive` remains 0.

# Changelog

## v0.5.185 — infrastructure migration Phase 9

- Adopted the user-supplied Definition of Done as the controlling completion text.
- Upgraded construction promotion enforcement to v2: every cited source checked for productive support, corpus candidates individually classified, same positive/negative contrasts shared across eligible speakers, complete executable boundary inventories, and current code-document review metadata.
- Added a Git-derived release-handoff gate and explicit dormant-label retirement cadence.
- Reclassified five manually reviewed HKCanCor examples as five individually classified genuine corpus hits.
- Parser behavior and linguistic statuses did not change.


## Infrastructure migration Phase 8

- Integrated a 23-response RUL01 public native-speaker panel snapshot under a user-authorized one-time protocol exception.
- Committed an anonymized 23 × 21 judgment matrix, item-level aggregates, comments, and a construction-specific result record.
- Counted all 23 retained responses as external panel evidence while setting promotion-eligible independent speakers to 0 because the pilot was binary, fixed-order, context-free, and used one late global comment field.
- Added promotion-gate support for separating total counted speakers from promotion-eligible speakers.
- Added a 109-check snapshot audit and expanded active reviewer workflow validation.
- Changed no parser behavior, linguistic status, source count, or standardized construction expectation.

## Infrastructure migration Phase 7

- Formalized source verification and native-speaker review for the two active construction re-audits.
- Added canonical PFV01 and RUL01 instruments plus generated Google Apps Script for one private Speaker A form and two public Speaker B forms.
- Added privacy-preserving public metadata collection, independence and consent declarations, hidden construction roles, and mixed stimulus order.
- Added CSV normalization that screens response completeness and eligibility but never automatically counts a speaker.
- Added a 117-check active-review workflow audit and 9 focused CSV/import tests.
- Recorded packet-scoped authorization for public Speaker B collection while leaving the archived backlog frozen.
- Changed no parser behavior, linguistic status, source count, speaker count, or standardized test inventory.

## Infrastructure migration Phase 6

- Limited the active authoring working set to `PostverbalZoPerfectiveVP` and `ResourceUseLaiFunctionRelation`.
- Moved the other 169 current construction notes to `grammar/archived/` without changing runtime activity, evidence, linguistic status, or tests.
- Added explicit workflow metadata and fail-closed validation for state, paths, priorities, counts, and promotion attempts.
- Updated current note loaders, construction-test regeneration, metadata synchronization, documentation, and the grammar index for the split layout.
- Archived the former flat-layout note exporter because it would erase Phase 6 triage.
- Changed no parser behavior, runtime labels, source claims, speaker evidence, or standardized test inventory.

## v0.5.185 — runtime metadata reduction

- Removed the 171-record authoring-time evidence registry from `main.js`.
- Removed linguistic status, confidence, source counts, corpus counts, speaker records, held-out state, and promotion eligibility from runtime parse nodes and diagnostic exports.
- Retained parser logic and one minimal 171-label active construction registry.
- Replaced the former runtime grammar-legitimacy diagnostic with an active-label registration audit.
- Archived tools that synchronized or audited the removed embedded registry.
- Kept linguistic governance in `grammar/*.md`, where Phase 4 will enforce promotion mechanically.
- Reduced `main.js` from 1,657,354 to 1,314,766 bytes: 342,588 bytes (20.67%).
- Passed 545/545 aggregate regressions and 545/545 normalized before/after runtime-equivalence cases.

## Infrastructure migration Phase 2 — Obsidian construction notes

- Exported all 171 active runtime labels to one note each under `grammar/`.
- Migrated status, confidence, plain-language claims, source citations and locators, speaker scope, boundary references, implementation state, blockers, and same-family links.
- Made `grammar/*.md` the active authoring-time status owner and added `GRAMMAR-INDEX.md`.
- Froze the former wide status, source-accounting, and re-audit registries under `archive/registry-pre-obsidian-v0.5.184/`.
- Added deterministic migration and validation tools; the note export passes 3,641 checks and exactly matches the 171-label runtime registry.
- Changed no parser, lexicon, Jyutping, construction status, or runtime behavior.

## v0.5.184 — truthful runtime metadata and compositional NP first slice

- Synchronized all 171 active runtime statuses with current governance; current `supported_productive` is 0.
- Removed ten retired labels from the active runtime registry.
- Abandoned the DEMO01 promotion/render/held-out track and archived its active materials.
- Implemented licensed versus provisional NP outputs, bounded classifier–head compatibility, and fail-closed unknown material.
- Integrated complete quantified, associative, and coordinated NP objects with postverbal `咗` without changing its linguistic status.
- Recorded one intentional object-boundary migration for `食咗香港嘅飯`.
- Passed 43/43 NP subsystem tests and 545/545 aggregate regression cases.

## v0.5.183 documentation consolidation R4 — NP subsystem doctrine

- Made the compositional NP subsystem a standalone work unit rather than a hidden part of the postverbal-`咗` patch.
- Prohibited example-string and motivating-example lexicon whitelists as the grammatical solution.
- Defined typed NP outputs and blocked unknown/low-confidence NP candidates from licensing evidence-gated constructions.
- Required unseen nouns and unseen structural combinations before consumer integration.
- Required explicit ambiguity preservation for `啲 A 嘅 N` and paratactic binary NP coordination without inferred hidden material.
- Recorded all second-speaker work as frozen while retaining the two-speaker promotion requirement.
- Removed stale current instructions to recruit Speaker B, prepare new Speaker B packets, or prioritize construction-specific lexical patches.
- Replaced stale CP025 progress pointers with the current NP subsystem work unit.
- Parser runtime unchanged.

## v0.5.183 CP026 ResourceUseLaiFunctionRelation re-audit R1

- Reopened five current evidence sources and verified one additional publication only at the metadata level.
- Withdrew the former claim of three independent natural attestations.
- Classified the usable examples as one direct quotation, one editorial interview-derived written instance, and one published illustrative example.
- Recorded one broader direct-quote actual-use boundary and one published separate-user boundary.
- Compared `main.js:7797–8052` with the public claim and documented semantic overbreadth, coordination undercoverage, lexical gaps, and stale runtime metadata.
- Probed 22 controlled cases: 6 narrow subtype outputs, 5 broad-only outputs, and 11 with no intended-function relation.
- Recorded the completed PFV01 Speaker A review and froze all second-speaker work without waiving the two-speaker requirement.
- Kept both former accepted constructions at `provisional_reaudit`; no parser behavior or runtime file changed.

## v0.5.183 Phase 1 dormant-label retirement R1

- Retired ten zero-fixture, zero-output dormant labels from the active governance registry.
- Preserved each label's source mapping, canonical family, reason, and future research target in a retirement archive.
- Reduced active governance labels from 181 to 171 and unsupported generalizations from 97 to 87.
- Left the frozen runtime byte-identical; ten retired names remain documented runtime metadata residue pending a later maintenance candidate.
- Kept linguistic status separate from implementation state and made no promotion.


## v0.5.183-phase0-status-reconciliation-r1

- Replaced two stale operational ledgers whose 21 former provisional rows contradicted the current `research_pending` status.
- Added a 181-row combined status registry separating linguistic status from implementation state.
- Reconciled current CP021B claim-provenance and authority-origin records.
- Archived the superseded ledgers and CP021A historical current-status snapshots.
- Corrected DEMO01's live checkpoint heading from linguistically provisional to `research_pending`.
- No parser behavior or runtime file changed.

## v0.5.183 Definition-of-Done addendum R3 — runtime unchanged

- Added `docs/current/DEFINITION-OF-DONE.md` as binding authority for `provisional`, `supported_productive`, dead-label retirement, and external release handoff.
- Made all completion checklists cumulative and non-grandfathering.
- Returned all 21 prior ordinary provisional labels to `research_pending` because their current provisional checklist has not yet been reverified.
- Kept the two formerly accepted constructions at `provisional_reaudit`; current `supported_productive` remains 0.
- Clarified that a recovery checkpoint may be packaged before a release is done, but must not be described as an externally auditable completed release.
- Kept parser behavior and runtime files unchanged.

## v0.5.183 documentation and evidence-standard realignment R2 — runtime unchanged

- Withdrew the prior `supported_productive` classifications for `PostverbalZoPerfectiveVP` and `ResourceUseLaiFunctionRelation`; both are now `provisional_reaudit`.
- Set the current `supported_productive` count to 0 without changing parser behavior.
- Added mandatory retroactive source re-verification for all 23 provisional or formerly accepted language constructions.
- Made raw corpus hit counts non-evidential until each hit is manually reviewed.
- Added the requirement that at least two independent native Cantonese speakers review the same relevant positive and negative contrasts before productive acceptance.
- Separated linguistic status and confidence from render, regression, and held-out completion.
- Added a 10-version dormant-label retirement cadence.
- Replaced active process jargon with plain descriptions of source review, speaker review, render review, and sealed held-out testing.
- Recorded the v0.5.182/v0.5.183 embedded two-status metadata as known stale pending a future metadata-only runtime correction.
- Kept the DEMO01 held-out ZIP sealed; render alone no longer authorizes opening it.

## v0.5.183 candidate — CP024-P1-DEMO01 render pending

- Implemented narrow internal `OvertHeadDemonstrativeClassifierNP` without promotion.
- Separated `HeadlessDemonstrativeClassifierNP` and prohibited hidden noun insertion.
- Retained `DemonstrativeClassifierNP` only as a public compatibility alias.
- Removed the `DemonstrativeHeadNP` runtime misanalysis.
- Added bounded `貓 maau1` lexical coverage for the source-backed animal-classifier test.
- Closed explicit authority-origin and claim-source provenance for both decomposed subtypes.
- Passed 9/9 visible positives, 0/8 target leakages, 543/543 inherited regression cases, and all internal candidate audits.
- Verified the externally sealed held-out checksum without opening the archive.
- At candidate-build time the embedded runtime metadata still reported two `supported_productive` labels. Current governance supersedes that historical metadata: both are under re-audit and the current supported count is 0.


## CP024-P0/P1-R1 — productive-promotion program; v0.5.182 runtime unchanged

- Defined defensible terminal outcomes for all 179 active labels and 53 canonical families.
- Established a two-track program: narrow promotion throughput plus dependency unblocking.
- Selected and source-froze `OvertHeadDemonstrativeClassifierNP` with 20 visible cases.
- Recorded baseline behavior: 8/9 required exact, one required absent, and two headless leakages.
- Closed the exact natural-attestation gate with five manually adjudicated HKCanCor records across distinct recordings/participant records.
- Froze valency decomposition and rejected direct promotion of `ProductiveVO`, `TransitiveVP`, and `IntransitiveVP`.
- Prepared an external evaluator handoff for independently sealed prospective custody.
- Made no runtime, grammar, lexicon, Jyutping, role, manifest, or status change.

## CP023-P1-PROG01-R3 — specification freeze; v0.5.182 runtime unchanged

- Added a 14-row predicate–progressive evidence matrix with eight exact overt-object predicate/sense seeds.
- Established that the evidence supports source-labeled seeds, not a productive `action_verb × 緊 × NP` class.
- Froze an overt-`同埋` extension design for existing `CoordinatedNP`.
- Corrected the R2 overclaim about `啲 A 嘅 N`: both outer-`啲` and `啲`-marked-associate attachments must remain available or review-bearing.
- Added 14 visible nominal design cases and R3 proposition-level source edges.
- Kept exact `錫條` Jyutping quarantined and made no runtime or custody change.

This file summarizes current release history. The complete historical changelog is preserved at [`archive/release-history/CHANGELOG-FULL-through-v0.5.182.md`](archive/release-history/CHANGELOG-FULL-through-v0.5.182.md). Historical entries describe their own former states and are not current instructions.

## CP023-P1-PROG01-R2 — remediation blueprint; v0.5.182 runtime unchanged

- Verified source-word lexicon and Jyutping requirements without changing runtime data.
- Left exact `錫條` compound pronunciation unresolved rather than guessing its final tone.
- Added a 32-item lexical baseline and seven-case nominal prerequisite probe.
- Isolated wrong `啲 + possessor + 嘅 + noun` scope, absent coordinated nominal objects, polysemy requirements, and progressive whole-object reassembly.
- Froze a dependency-ordered remediation blueprint.
- Kept implementation and prospective evaluator custody blocked until the predicate-compatibility and nominal design packets are frozen.


## CP023-P1-PROG01-R1 — research checkpoint; v0.5.182 runtime unchanged

- Selected and source-froze a narrow postverbal `緊` overt-object research candidate.
- Added three official transcript sources, proposition-level edges, a variation record for `有 + V緊`, and natural-attestation adjudication.
- Added a 23-case visible research packet and reusable observation-only runner.
- Baseline result: 4/13 required exact target spans, 7/13 incomplete, 2/13 absent; 3/9 forbidden cases still contain broad `ProgressiveVP`.
- Added no construction, changed no label status, and selected no prospective held-out cases.

## v0.5.182 — accepted

- Accepted narrow internal `ResourceUseLaiFunctionRelation` as the second `supported_productive` construction.
- Passed 15/15 rendered rows, 133/133 render assertions, and 8/8 fresh prospective held-out cases.
- Met the three-independent-natural-attestation minimum without counting generated, rendered, fixture, corpus-candidate, or held-out sentences as natural language evidence.
- Kept broad `IntendedFunctionRelation` provisional.
- Rejected v0.5.181 and consumed all evaluator cases from both cycles.
- Preserved minimal runtime, recovery, and evaluator-result package separation.

## v0.5.180 — accepted

- Accepted narrow internal `PostverbalZoPerfectiveVP` as the first `supported_productive` construction.
- Kept broad `PerfectiveVP` provisional and native-conflicted `V完咗O` outside the accepted scope.
- Passed focused, rendered, prospective held-out, and aggregate regression gates.

## Documentation consolidation — v0.5.182 runtime unchanged

- Rewrote the current documentation around one authority source per subject.
- Removed duplicated current-state claims from stable doctrine and workflow files.
- Moved obsolete root pending, waiting, evidence-limited, rejection-cycle, and prior-release records into `archive/release-history/`.
- Reclassified `docs/research/` as evidence and decision history, never active operational instruction.
- Preserved all historical files and parser behavior.


## CP025 PFV01 re-audit

`PostverbalZoPerfectiveVP` remains `provisional_reaudit`. Four sources were reverified, but the re-audit found that the old completion/current-relevance exclusion was too strong, the broad `action_verb` and selectional scope is not fully source-backed, the legacy six-hit corpus count has no row-level provenance, only one prior speaker sentence exactly instantiates the target, and the frozen runtime covers only 2 of 6 controlled positive probes. See `docs/research/CP025-P1-PFV01-R1-REAUDIT-CHECKPOINT.md`.

## Infrastructure migration — Git Phase 1

- Initialized Git with an untouched v0.5.184 baseline commit.
- Replaced active checkpoint-state, packaging-manifest, and recovery-ZIP workflow with Git commits and full working-copy exports containing `.git/`.
- Archived the superseded files and combined recovery-package tools without deleting their history.
- Added repository verification and export scripts.
- No parser, grammar, lexicon, Jyutping, status, or test expectation changed.

## Infrastructure migration Phase 5

- Consolidated active executable tests under `tests/`.
- Added one standard JSON test file for each of 171 active constructions.
- Added `npm test` as the single command for 545 exact regressions, 43 NP cases, and 1,156 construction assertions.
- Migrated focused positive and boundary suites for `PostverbalZoPerfectiveVP` and `ResourceUseLaiFunctionRelation`.
- Archived manual render-review documents and the former active fixture locations.
- No parser behavior or linguistic status changed.
