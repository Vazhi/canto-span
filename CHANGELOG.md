## v0.5.208 — copular 係唔係 source/runtime reconciliation

- Added source-linked positive coverage for `你係唔係識講德文咋？` and `係唔係每個學生都鍾意睇電視呀？`.
- Added the published terminal-tag boundary `你唔去喇，係唔係呀？`, which must not receive `CopularANotAQuestion`.
- Made complement classification explicit: typed predicate/clause versus bounded nominal/possessive.
- Blocked broad NP wrappers from licensing a predicate complement only through inherited generic slots.
- Kept contracted `係咪` on the existing `PolarQuestionFrame` route rather than silently merging internal analyses.
- Moved standardized coverage from 3 to 4 positive-and-boundary labels and reduced implementation-only coverage from 57 to 56.
- Increased construction assertions from 1,232 to 1,235; regression remains 551/551 and NP remains 43/43.
- Kept `CopularANotAQuestion` at `unsupported_generalization`; no panel evidence, unrestricted complement claim, or tag-construction promotion was added.

## v0.5.207 — portable release status baseline

- Replaced clone-specific commit/tree release baselines with a checked-in, SHA-256-pinned construction-status snapshot.
- Added schema, duplicate-label, allowed-status, count, digest, path, and runtime-version validation for baseline snapshots.
- Added `npm run release:baseline -- <version>` to generate future baseline files from a clean released state.
- Expanded release-gate tests from 8 to 14 cases, including snapshot integrity and path-safety failures.
- Corrected the false v0.5.206 claim that a whole-repository tree object was portable across clones.
- Changed no parser behavior, construction status, evidence record, panel result, survey conclusion, regression expectation, or construction assertion.

## v0.5.206 — terminal 得唔得 source/runtime reconciliation

- Narrowed the legacy `AcceptabilityANotA` fallback from unordered token co-occurrence to an adjacent terminal `得唔得` sequence, optionally followed by checked postposed `先`.
- Added exact source-linked positive coverage for `而家問題係佢嗰度得唔得先。`.
- Added the published restrictive-focus boundary `得唔得三個鐘你可以瞓？`, which must not receive `AcceptabilityANotA`.
- Preserved simple `得唔得？`, prefixed terminal questions, and the existing zero-weight reachability probe.
- Moved standardized coverage from 2 to 3 positive-and-boundary labels and reduced implementation-only coverage from 58 to 57.
- Increased construction assertions from 1,230 to 1,232; regression remains 551/551 and NP remains 43/43.
- Kept `AcceptabilityANotA` at `unsupported_generalization`; no eligible panel evidence, productive scope, or complete boundary inventory was claimed.
- Reviewed `CopularANotAQuestion` but deferred changes because checked clause-complement and tag sources do not match the current nominal/possessive runtime scope.
- Excluded regenerated `validation/current` snapshots from the patch boundary. The attempted Git-tree baseline was later replaced by the portable status-snapshot mechanism in v0.5.207.

## v0.5.205 — documentation consolidation and count enforcement

- Consolidated current status, evidence, native-panel, survey, workflow, validation, promotion, and release policy in `docs/current/GOVERNANCE.md`.
- Reduced seven superseded policy files to compatibility pointers and replaced the completed infrastructure-migration plan with a concise historical pointer.
- Corrected stale status counts: `research_pending` is 62 and `unsupported_generalization` is 81.
- Extended the existing documentation-consistency verifier to check canonical versions, status/workflow totals, folder README counts, and executable-test totals.
- Removed the obsolete standalone review-only-readiness audit script and stale root outputs.
- Moved the stale v0.5.184 NP checkpoint out of the repository root into release history.
- Changed no parser behavior, runtime label, construction status, evidence claim, survey result, or test expectation.

## v0.5.204 — degree-modified lexical stative reconciliation

- Added the source-linked regression `好好食。` under `DegreeModifiedLexicalStative`.
- Preserved transparent degree `好` plus dictionary-backed lexicalized stative `好食`.
- Moved `DegreeModifiedLexicalStative` from `unsupported_generalization` to `research_pending` for this narrow attested profile only.
- Kept the historical implementation probe at linguistic evidence weight zero and made no unrestricted productivity or panel claim.
- Added no parser rule, verifier, or version-specific validation directory.

## v0.5.203 — grammar status-directory migration

- Reorganized all 165 canonical construction notes into folders named for their linguistic status.
- Removed `grammar/active/` and `grammar/archived/`; workflow state now remains frontmatter-only.
- Added `grammar/README.md`, status-specific review guides, and `grammar/retired/README.md`.
- Regrouped `GRAMMAR-INDEX.md` by status with workflow, source, boundary, lane, and review-date summaries.
- Updated current loaders, release comparison, diagnostics guidance, and documentation to use the status-directory registry.
- Added no new verifier and changed no parser behavior, runtime label, linguistic status, evidence record, or test expectation.

## v0.5.202 — ComparativeStative retirement and degree-adjustment reconciliation

- Retired `ComparativeStative`, whose residual `stative + 啲` fallback mislabeled a degree adjustment as a generic comparative construction.
- Added the source-linked regression `客氣啲。` under the existing `DegreeMannerAdverbial` representation.
- Preserved explicit surpass-comparative research separately; this patch does not treat every property + `啲` sequence as an overt comparison against a standard.
- Reduced active runtime labels and construction notes from 166 to 165, increased retired labels from 15 to 16, and reduced implementation-only coverage from 60 to 59.
- Increased the regression suite from 549 to 550 while keeping total construction assertions at 1,229.
- Added no verifier or version-specific validation directory.

## v0.5.201 — polite request adjustment reconciliation

- Added the source-linked regression `唔該你快啲。`.
- Preserved `唔該` as a nested `FormulaDiscourseUnit`, `你` as the overt addressee, and `快啲` as a nested `DegreeMannerAdverbial`.
- Kept standalone `唔該` and unrelated scalar-modifier structures unchanged.
- Retained `PoliteImperativeClause` as `unsupported_generalization`; no unrestricted productivity, register equivalence, or panel claim was added.
- Increased regression coverage to 549 and construction assertions to 1,229 without adding verification machinery.

## v0.5.200 — passive/permissive 畀 source/runtime reconciliation

- Added source-linked regressions for permissive `我畀佢打籃球。` and passive `我畀阿媽鬧。`.
- Preserved `打籃球` as a nested reviewed `ProductiveVO` inside `PassivePermissiveRelation`.
- Stopped exposing `籃球` as a retained passive-patient candidate in the permissive example.
- Kept ambiguous surface frames transparent instead of treating 畀 as a context-free deterministic passive/permissive classifier.
- Increased regression coverage from 546 to 548 and construction assertions from 1,223 to 1,226.
- Moved `PassivePermissiveRelation` from implementation-only to positive coverage without changing its `research_pending` status.
- Added no verifier or version-specific validation directory.

## v0.5.199 — overt 咁／噉 manner-adverbial reconciliation

- Extended `MannerAdverbialVP` to preserve repeated manner material, overt `咁／噉`, and a complete following VP.
- Added the source-linked regression `佢慢慢噉食飯。` while retaining the bare `慢慢行` route as zero-weight implementation evidence only.
- Reclassified `MannerAdverbialVP` from `unsupported_generalization` to `research_pending`; no productive promotion or speaker evidence was claimed.
- Increased regression coverage from 545 to 546 and construction assertions from 1,221 to 1,223.
- Added no verifier, release-specific validation directory, or audit framework; removed the unreferenced Phase 2 focused runner and its stale generated outputs.
- Replaced remaining release-pinned status and reachability checks with stable controlled-status, probe-provenance, and dynamic-current checks.

## v0.5.198 — verification consolidation

- Replaced the permanent chain of release-specific wrapper verifiers with one manifest-driven verification runner and separate core, research, and release profiles.
- Consolidated eight implementation-reachability files into one 65-case zero-weight inventory and replaced family-specific verifiers with one generic check.
- Moved all current generated results to `validation/current/`; removed repeated v0.5.189–v0.5.197 validation output directories from the active tree.
- Removed obsolete version-specific acceptance, packet-lock, migration, and compatibility scripts from `tools/`.
- Reduced the active tool directory from 77 files to 41 before generated cleanup.
- Changed no parser behavior, runtime label, linguistic status, source claim, or survey result.

## v0.5.197 — shadowed-wrapper retirement

- Retired redundant internal `Comment` and shadowed lexical-item-specific `PerfectiveResultPredicate`.
- Preserved comment-role metadata under `TopicComment` and historical perfective-result references through a migration-only `PerfectiveVP` alias.
- Verified exact complete-output equivalence to v0.5.196 over 1,885 structured candidates and all 545 regression cases.
- Reduced the active registry, current notes, and construction test files from 168 to 166; increased retired labels from 13 to 15.
- Eliminated the final two `no_direct_cases`; coverage is now 2 positive-and-boundary, 100 positive-only, 63 implementation-only, and 1 compatibility-alias-only.
- Closed the full dormant/uncovered-label review without adding linguistic evidence, changing retained statuses, or changing recognized parser spans.

## v0.5.196 — final reachable-wrapper audit

- Audited all thirteen labels that remained without direct standardized cases after v0.5.195.
- Added eleven semantically coherent zero-weight implementation probes across completion sequencing, directional motion, condition/result, lexical statives, `畀` relations, polite path commands, progressive-place questions, and progressive-purpose internals.
- Retained `Comment` and `PerfectiveResultPredicate` as explicit constructor-shadowed labels instead of fabricating coverage.
- Increased construction assertions from 1,210 to 1,221 and reduced the no-direct backlog from 13 to 2 labels.
- Changed no recognized parser span, runtime label, or linguistic status.

## v0.5.195 — evaluation, scalar, and question wrapper audit

- Audited ten acceptability, scalar, evaluation, identity, scheduling, temporal, opinion, and existential-question labels at exact constructor and complete-output level.
- Added ten semantically coherent zero-weight implementation probes.
- Preserved source/runtime mismatches for `都得`, `都算`, broad scalar-domain grouping, identity questions, scheduling questions, `係時候`, and postposed existential questions.
- Increased construction assertions from 1,200 to 1,210 and reduced the no-direct backlog from 23 to 13 labels.
- Changed no recognized parser span, runtime label, or linguistic status.

## v0.5.194 — speech, transfer, and complement wrapper audit

- Audited six speech, transfer, naming, intention, and VP-complement labels at exact constructor and complete-output level.
- Added six semantically coherent zero-weight implementation probes.
- Preserved routing differences between positive and negative `話你知`, subject-sensitive `IntentionFrame` reachability, the combined-component gap in `PossessiveTransferClause`, the `叫`/`叫做` naming mismatch, and predicate-specific VP-complement licensing.
- Increased construction assertions from 1,194 to 1,200 and reduced the no-direct backlog from 29 to 23 labels.
- Changed no recognized parser span, runtime label, or linguistic status.

## v0.5.193 — nominal wrapper audit

- Audited four nominal runtime labels at exact constructor and diagnostic-row level.
- Added two zero-weight implementation probes for `OrdinalClassifierNP` and nested `PossessiveClassifierNP`.
- Added a distinct `compatibility_alias_only` coverage state for `DemonstrativeClassifierNP`, which is exposed as the public alias of internal `OvertHeadDemonstrativeClassifierNP` rather than emitted as its own internal node.
- Retired constructorless `DemonstrativeHeadNP` as a known misanalysis and preserved its source record in the retirement archive.
- Increased construction assertions from 1,191 to 1,194 and reduced the no-direct backlog from 33 to 29 labels.
- Changed no recognized parser span or retained linguistic status.

## v0.5.192 — Result/change-state wrapper audit

- Audited eleven result and change-state runtime labels.
- Added ten semantically coherent zero-weight implementation reachability probes across ten labels.
- Preserved `PerfectiveResultPredicate` as a shadowed `no_direct_cases` label rather than fabricating coverage.
- Increased per-construction assertion references from 1,181 to 1,191.
- Reduced the no-direct backlog from 43 to 33 labels without changing parser spans or linguistic statuses.

## v0.5.191 — experiential and delimited wrapper audit

- Reviewed six related no-direct-case labels by exact constructor and complete-parser output.
- Added seven zero-evidence implementation probes across `NegativeExperiential`, `ExperientialQuestion`, `ExperientialMotionGoalVP`, `MotionDelimitedVP`, `CognitionDelimitedVP`, and `CognitionDelimitedObjectVP`.
- Recorded unresolved routing gaps for object-bearing negative experiential statements, `有冇 + V過` questions, and source-attested cognition plus polar-clause content.
- Increased construction assertions from 1,174 to 1,181.
- Changed no parser span, runtime label, or linguistic status.

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
