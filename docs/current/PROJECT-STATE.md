# Project state

This file is the sole present-tense project snapshot. Live GitHub intake and work-claim issues own current execution and overlap. Historical reports and Git history explain earlier states but do not define current policy, ownership, or work order.

## Baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.232 |
| Runtime labels | 134 |
| Current construction notes | 134 |
| Available construction notes | 134 |
| Parked construction notes | 0 |
| Retired labels | 48 |
| Permanent UUID records | 182 |
| Expert-adjudicated UUIDs | 94 |
| Pending UUID adjudications | 88 |
| Accepted adjudication batches | 21 |
| Promotion-ready constructions | 0 |

## Agent workflow availability

| Agent workflow | Current state |
|---|---|
| ChatGPT | Available |
| Human action | Available |
| Codex | Available |

The canonical setting is [`../../config/agent-workflow-settings.json`](../../config/agent-workflow-settings.json). New intake and later reassignment may target Codex, ChatGPT, or human action, subject to normal routing, assignment, overlap, claim, verification, and review gates. Re-enabling Codex permits future routing only and does not transfer, reopen, resume, or reassign existing work.

Agent availability is independent of construction availability, which is owned by `data/parked-constructions.json`.

## Linguistic-status inventory

| Status | Records |
|---|---:|
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 0 |
| `research_pending` | 80 |
| `unsupported_generalization` | 37 |
| `lexicalized_only` | 2 |
| `parser_heuristic` | 15 |

These counts describe current status-note placement. An accepted identity adjudication may recommend a rename, narrowing, split, internalization, or future status migration without silently moving a note or changing parser behavior.

## Identity and adjudication

The permanent registry contains 134 current and 48 retired records. UUID and short code are immutable. Canonical name, family, profile, claim layer, and learner label change only through accepted UUID-keyed adjudication.

Twenty-one accepted batches have adjudicated 94 records; 88 remain pending. Canonical decisions live in `data/construction-adjudications.json` and immutable batch files under `data/construction-adjudication-batches/`.

Current consequences include:

- v0.5.232 implements the final #872 Cifu ranks 751–1000 lexical adjudication while retaining complete 2,000/2,000 exact-surface coverage: 79 previously neutral ordinary lexical gaps receive reviewed typed defaults, 84 transparent or default-sensitive surfaces retain neutral defaults while exposing reviewed whole-form or constructional alternatives, and 99 surfaces expose stable reviewed alternative records; all 29 `blocked_atomic` and 10 `research_required` rows receive no new atomic promotion, existing structured `我知` and `沿住` parser entries remain intact, and four stale pre-existing typed defaults are corrected to the final detailed authority (`魚 jyu2` free noun with `jyu4` bound/non-final, `飛 fei1` verb rather than the unsupported ticket default, stative `小心`, and universal determiner/quantifier `全`); the older Week 16 `魚/釣魚 jyu4` test expectation is superseded by the independently adjudicated free/final noun reading without weakening its structural checks; no construction identity or status, survey, corpus, release-publication, or deployment state is changed;

- v0.5.231 implements the final #866 R1+R2 Cifu ranks 501–750 lexical adjudication while retaining complete 2,000/2,000 exact-surface coverage: 45 previously neutral single-analysis lexical gaps receive reviewed typed defaults, 45 neutral or default-sensitive surfaces retain their existing neutral defaults while exposing reviewed whole-form alternatives, and 56 already-typed multi-analysis or reading-split surfaces retain their current defaults while reviewed alternatives are appended; all 30 `blocked_atomic` rows receive no new atomic lexical promotion, existing structured `一次` and `第二個` parser entries are preserved, 101 surfaces expose stable reviewed alternative records, R2 distinctions for `樂`, `磅`, and `直行` are represented, and the evidence-resolved `轉彎` and `早` records are complete; no construction identity or status, survey, corpus, release-publication, or deployment state is changed;

- v0.5.230 implements the final #792 Cifu ranks 1–250 lexical adjudication on the v0.5.229 multi-analysis architecture while retaining complete 2,000/2,000 exact-surface coverage: 21 surfaces receive direct reviewed promotions after runtime-default safeguards, protected or compositional surfaces remain neutral where whole-form typing would damage productive structure, and stable alternatives preserve reviewed polyfunctionality and readings; existing typed `唔係` remains the ordinary negated-copula default with an independently supported otherwise/or-else alternative, `成` remains neutral by default with separate success/completion, whole/all, result-suffix, and 10%-measure analyses, and `喀` uses native-reviewed `haak1` as default while retaining attested `kaa1`, `kak1`, `haak3`, and `kaa3` alternatives and excluding packet-only `haak6`; no construction identity or status, survey, corpus, release-publication, or deployment state is changed;

- v0.5.229 implements the finalized #858 Cifu ranks 251–500 lexical adjudication while retaining complete 2,000/2,000 exact-surface coverage: 71 previously neutral fallback surfaces receive reviewed typed entries, 18 `blocked_atomic` surfaces remain neutral/compositional, seven transparent or mixed whole-form surfaces retain neutral default tokenization with stable reviewed alternatives, and 82 reviewed surfaces expose explicit multi-analysis/reading/function records; no construction status, survey, corpus, release-publication, or deployment state is changed;

- v0.5.228 introduces a first-class surface-to-analyses lexical compatibility layer with stable lexical-analysis IDs while retaining all 2,384 runtime lexical surfaces and complete 2,000/2,000 Cifu top-frequency surface coverage; legacy single-analysis entries normalize automatically, and existing context-sensitive `住`, `定`, and `咪` paths preserve explicit alternative analyses rather than forcing one global lexical category;

- v0.5.227 adds 184 independently supported high-frequency lexical entries identified by the Cifu spoken top-2000 audit; compositional corpus strings and grammar-sensitive, variant, or sense-ambiguous forms remain explicit review buckets rather than being lexicalized merely to improve a coverage percentage, and no construction identity, linguistic status, evidence, survey, corpus, release, or deployment state is changed;

- v0.5.226 adds bounded behavior-first post-predicate `過` comparison for overt simple nominal target + gradable property + `過` + overt simple nominal standard, represented structurally as `SubjectPredicateClause` with explicit comparison bindings; `矮 ai2` receives the lexical coverage required by the published `細佬矮過我` example, while no new public construction identity, quantity/temporal comparison generalization, `比`/`啲` comparative generalization, status change, or evidence promotion is inferred;
- `做功課` is no longer owned by the legacy AB35/ProductiveVO compatibility whitelist at v0.5.225; it remains recognized through the accepted AB78 `TransitiveVP` typed `做 + 功課` predicate-object path, while no disposition is inferred for the other 39 unresolved legacy entries;
- `AB35 VerbObjectCompound` source-linked runtime migration has begun at v0.5.224 for the independently supported current-whitelist seed `飲茶` / `游水` / `沖涼`; those exact nodes expose component provenance without an automatic ordinary object binding, while the other 39 legacy `ProductiveVO` compatibility entries remain unchanged pending later review;
- `AB35 VerbObjectCompound` is canonical for the legacy runtime note `ProductiveVO`; the same UUID/code is retained as a source-bounded lexical V–O-compound narrowing, while the remaining 39-entry compatibility route is still unresolved and must be audited item-by-item before retirement;
- `AB30 ZoMarkedPerfectiveObjectVP` remains the nearest direct language-construction candidate and is distinct from broad internal perfective wrappers;
- `AB53 ResourceInitialJungLaiFunctionClause` is canonical for the legacy runtime note `ResourceUseLaiFunctionRelation`;
- `AA56 JauMarkedIndefiniteNPPredication` is canonical for the legacy runtime note `ExistentialPresentationalClause`; PR #593 / `833c7e15cb7b6b9f4efa2caae95461f09f9484f5` implements the accepted positive-only runtime profile under that legacy compatibility label, with no status promotion, runtime-label migration, survey, corpus, release, or deployment change;
- `AB83 JauDakMouDakAvailabilityPredicate` is canonical for the recurring preverbal `有得／冇得 + predicate` availability relation under candidate UUID `4e176fe2-a147-47c7-86c8-6778a379beb2`; issue #597 / claim #606 implement the source-first runtime identity without status promotion, survey, corpus reclassification, release, or deployment change;
- candidate UUIDs `a476c6c6-a0ba-4cf2-9021-13ad4c717d0f`, `caae4649-29cd-4752-8e5d-48ab7d9503a4`, and `af85d495-5906-4fde-a5ba-ca39285a3281` are reserved respectively for the overt PRQ2-008 sufficient-condition, PRQ2-013 ordered-preference, and PRQ2-014 clausal necessary-condition relations; they have no short codes or current runtime identities and require a later separately claimed source-first implementation and canonicalization package;
- Batch 18 internalized AB18 and AB21, retained AB19 and AB20 as retired, and narrowed AB22 to `FinalMe1BiasedPolarQuestionFrame`;
- Batch 19 retains AB25, AB26, and AB27 as retired composite parser representations and rehomes their valid component evidence under separately typed possessive nominal, fragment, and transfer or dative profiles;
- parser representations, umbrellas, and retired records do not compete for linguistic promotion or donate evidence automatically;
- true splits require new UUIDs and explicit predecessor/successor links.

Earlier accepted batch reports remain immutable. Corrections require later superseding adjudication.

## Construction work availability

The canonical construction blacklist is [`../../data/parked-constructions.json`](../../data/parked-constructions.json), and it is empty. All 134 current notes are available for bounded work. There is no active-note whitelist or repository-wide grammar freeze.

New constructions, splits, broadenings, status changes, and runtime changes still require all applicable identity, evidence, boundary, documentation, testing, and review gates. Legacy note workflow fields are compatibility metadata only.

Availability does not create a fixed research queue. Recent work on one construction or family gives its follow-up tasks neither automatic priority nor automatic exclusion.

A substantive research issue must cite a concrete trigger from current parser behavior, primary sources, project corpora, eligible native judgments, learner/source material, or audited survey evidence. Discovery scores, empty metadata, retired wrappers, and broad family-gap reports can locate work but are not sufficient by themselves. The issue must state a falsifiable unresolved question, bounded evidence, competing analyses and negative boundaries, the decision it could inform, and an acceptable null outcome such as no new construction, lexical-only evidence, an instrument problem, or no runtime change.

Implementation specifications, human artifact requests, corpus ingestion, work claims, and pull requests are execution records rather than independent linguistic research questions.

## Discovery state

| Candidate state | Records |
|---|---:|
| `behavior_aligned` | 1 |
| `boundary_ready` | 3 |
| `excluded_nonlanguage` | 38 |
| `lexicalized_review` | 2 |
| `narrowing_candidate` | 30 |
| `retired_evidence_rehome_candidate` | 42 |
| `retired_research_gap` | 6 |
| `source_supported` | 60 |

Promotion-ready remains **0**.

The paired-clause relation map reviews PRQ2-008–015 and PRQ2-033–035 as eleven separate families across 151 checked-in collision rows. The three bounded typed cores in #430 have separate reserved candidate UUIDs for overt sufficient condition, ordered preference, and clausal necessary condition. #431 and #432 are now closed with bounded research dispositions rather than open implementation authority: the additive, alternative, exclusion, coexistence, premise-response, unconditional, and committed-preference families remain separated into constrained research targets or no-action outcomes, with later runtime work requiring separately claimed source-first packages. The prior #409 link is historical and closed; PRQ2-015 distributive quantification remains separate from committed-preference provenance. Generic clause graphs remain parser infrastructure with zero independent linguistic-evidence weight.

Discovery ranks expose gaps; they never promote, park, assign, or authorize work.

## Corpus state

The canonical AB30 packet has five fully reviewed candidates: two genuine and three false positives. Its readiness effect is `partial_only` because both genuine examples come from two small user-supplied conversation sources. It establishes attestation and extractor boundaries, not broad diversity or productivity.

The reusable PyCantonese 5.0.0 HKCanCor workbench verifies the frozen 58-file distribution against a checked-in SHA-256 manifest. Mechanical inventories exist for AA07, AA30, AA58, AA62, AA76, AA77, AA82, AB30, and AB53.

AA77 contains 1,730 high-recall noninitial `有` or `冇` candidates with following lexical material across all 58 files. The inventory deliberately retains existential, possessive, topic, subject, discourse, repair, fragment, wh/focus, and other analyses. It changes no evidence, readiness, status, identity, runtime, or release state.

Corpus extraction is separate from expert classification. A bounded human local-generation step may supply corpus access and artifacts while the parent repository issue remains ChatGPT-owned; it transfers neither judgment nor merge authority.

The complete Glossika Dialogs 001–020 `NeedsContext` review classifies all 59 affected turns against preserved adjacency: 44 have bounded context licensing, 12 are independently complete parser gaps routed to #423–#425, two are formulae needing no syntactic reconstruction, and one remains genuinely unresolved. The accepted context consequence is member-local discourse metadata only; it does not fabricate omitted words, establish one shared ellipsis syntax, or change AA66, AA96, runtime behavior, fixtures, or status.

## Native-panel and survey state

`YUE-JUDGMENT-PILOT-01` remains the active SoSci collection instrument. The public questionnaire is available at [https://www.soscisurvey.de/canto-span/](https://www.soscisurvey.de/canto-span/). It is anonymous, takes approximately 10 minutes, and is intended for native or childhood Cantonese speakers.

General questions, recruitment help, Cantonese wording feedback, and community discussion belong in [GitHub Discussions](https://github.com/Vazhi/canto-span/discussions). GitHub Issues remain reserved for reproducible bugs, bounded research tasks, and implementation work.

The `review-packets/native-panel/active-v2/followup-draft-v1-*` specification remains non-deployable.

All eligible respondents form one anonymized role-neutral panel. No named person, relationship, private reviewer, expert title, or recruitment channel receives special weight. The pilot must close and receive item-level audit before a follow-up is revised, locked, generated, deployed, or treated as final evidence.

## Verification baseline

- aggregate regression cases: **551**;
- NP-subsystem cases: **43**;
- per-construction assertions: **1,639** across **134** files;
- current test coverage: 133 positive-and-boundary and 1 compatibility-alias-only construction file;

Canonical documentation-verifier values:

| Target | Current value |
|---|---:|
| Aggregate regression cases | 551 |
| NP-subsystem cases | 43 |
| Per-construction assertions | 1,639 |
| Construction test files | 134 |

Stable task-scoped core verification is `npm run verify`. Runtime verification is `npm run verify:runtime`. The explicit full diagnostic sweep is `npm run verify:all`; it includes core, research, runtime, generated-bundle, promotion, and release checks and is not a routine requirement for unrelated work. Passing tests and implementation reachability have zero independent linguistic evidence weight.

## Current work order

Live GitHub issue state records active execution and activation-ready work, not the complete universe of dormant future-work signals. A zero-open-issue state therefore means there is no current intake or active work claim after live-state review; it does not cancel deferred work recorded in this file, accepted decision records, route records, candidate ledgers, survey lifecycle gates, release gates, or closed issue and pull-request history.

Do not create a bulk placeholder backlog merely to mirror every dormant signal. Create or reopen an issue only when a concrete trigger has current evidence, dependencies are clear enough to define a bounded outcome, and the work can reach a reviewable terminal state. Prefer a new issue when the old issue reached its original endpoint or when reopening would blur historical closure; reopen only when the same unresolved outcome remains accurately owned by that issue.

1. Keep documentation, canonical data, status notes, runtime, survey metadata, corpus records, agent settings, claims, and generated reports consistent.
2. Select the highest-benefit non-parked task after checking live work, evidence gaps, learner impact, ontology risk, source and data availability, dependencies, implementation leverage, and recent topic concentration.
3. Require each substantive research issue to identify an actual project trigger, a falsifiable unresolved linguistic question, bounded evidence, relevant counterevidence and ambiguity, and an acceptable null outcome.
4. Treat topic diversity as a balancing factor: do not let the same few construction families repeatedly dominate when similarly valuable alternatives exist elsewhere.
5. Continuing within the same family is allowed when its follow-up is genuinely the strongest next task; recent work gives a topic neither automatic priority nor automatic exclusion.
6. Keep accepted implementation, runtime/design audits, human actions, corpus ingestion, claims, and pull requests separate from the substantive research portfolio.
7. Continue identity adjudication from the 88 pending UUIDs when it outranks other work; batches are opportunities, not a mandatory queue.
8. Complete useful HKCanCor inventories through deterministic extraction and separate expert review when they expose a bounded empirical question that outranks other available work, using human local execution only when access requires it.
9. Keep `YUE-JUDGMENT-PILOT-01` in collection until its stopping rule is met, then audit item wording, eligibility, exclusions, quality, comments, interpretations, controls, and regional limitations before drawing conclusions or revising a follow-up.
10. Implement status-path or runtime-label migrations only in explicitly scoped reviewed changes.
11. Do not create duplicate current-state ledgers, verifier families, naming systems, fixed construction queues, or unscoped automatic writers.

## Historical-material rule

Dated reports, retired ledgers, old prompts, closed issues, generated baselines, and Git commits may be cited for provenance. They must not replace current name, claim layer, status, runtime description, survey state, agent availability, work order, pickup ownership, or merge authority.
