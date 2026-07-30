# Project state

This file is the sole present-tense project snapshot. Live GitHub intake and work-claim issues own current execution and overlap. Historical reports and Git history explain earlier states but do not define current policy, ownership, or work order.

## Baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.216 |
| Runtime labels | 133 |
| Current construction notes | 133 |
| Available construction notes | 133 |
| Parked construction notes | 0 |
| Retired labels | 48 |
| Permanent UUID records | 181 |
| Expert-adjudicated UUIDs | 89 |
| Pending UUID adjudications | 92 |
| Accepted adjudication batches | 18 |
| Promotion-ready constructions | 0 |

## Agent workflow availability

| Agent workflow | Current state |
|---|---|
| ChatGPT | Available |
| Human action | Available |
| Codex | Disabled |

The canonical setting is [`../../config/agent-workflow-settings.json`](../../config/agent-workflow-settings.json). While Codex is disabled, new and reassigned intake issues may target only ChatGPT or human action. Codex may not remain the active pickup owner or an actual GitHub issue assignee. Re-enabling it later permits future routing only and does not transfer existing work.

Agent availability is independent of construction availability, which is owned by `data/parked-constructions.json`.

## Linguistic-status inventory

| Status | Records |
|---|---:|
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 0 |
| `research_pending` | 79 |
| `unsupported_generalization` | 37 |
| `lexicalized_only` | 2 |
| `parser_heuristic` | 15 |

These counts describe current status-note placement. An accepted identity adjudication may recommend a rename, narrowing, split, internalization, or future status migration without silently moving a note or changing parser behavior.

## Identity and adjudication

The permanent registry contains 133 current and 48 retired records. UUID and short code are immutable. Canonical name, family, profile, claim layer, and learner label change only through accepted UUID-keyed adjudication.

Eighteen accepted batches have adjudicated 89 records; 92 remain pending. Canonical decisions live in `data/construction-adjudications.json` and immutable batch files under `data/construction-adjudication-batches/`.

Current consequences include:

- `AB30 ZoMarkedPerfectiveObjectVP` remains the nearest direct language-construction candidate and is distinct from broad internal perfective wrappers;
- `AB53 ResourceInitialJungLaiFunctionClause` is canonical for the legacy runtime note `ResourceUseLaiFunctionRelation`;
- Batch 18 internalized AB18 and AB21, retained AB19 and AB20 as retired, and narrowed AB22 to `FinalMe1BiasedPolarQuestionFrame`;
- parser representations, umbrellas, and retired records do not compete for linguistic promotion or donate evidence automatically;
- true splits require new UUIDs and explicit predecessor/successor links.

Earlier accepted batch reports remain immutable. Corrections require later superseding adjudication.

## Construction work availability

The canonical construction blacklist is [`../../data/parked-constructions.json`](../../data/parked-constructions.json), and it is empty. All 133 current notes are available for bounded work. There is no active-note whitelist or repository-wide grammar freeze.

New constructions, splits, broadenings, status changes, and runtime changes still require all applicable identity, evidence, boundary, documentation, testing, and review gates. Legacy note workflow fields are compatibility metadata only.

Availability does not create a fixed research queue. Recent work on one construction or family gives its follow-up tasks neither automatic priority nor automatic exclusion.

A substantive research issue must cite a concrete trigger from current parser behavior, primary sources, project corpora, eligible native judgments, learner/source material, or audited survey evidence. Discovery scores, empty metadata, retired wrappers, and broad family-gap reports can locate work but are not sufficient by themselves. The issue must state a falsifiable unresolved question, bounded evidence, competing analyses and negative boundaries, the decision it could inform, and an acceptable null outcome such as no new construction, lexical-only evidence, an instrument problem, or no runtime change.

Implementation specifications, human artifact requests, corpus ingestion, work claims, and pull requests are execution records rather than independent linguistic research questions.

## Discovery state

| Candidate state | Records |
|---|---:|
| `boundary_ready` | 1 |
| `source_supported` | 62 |
| `narrowing_candidate` | 30 |
| `excluded_nonlanguage` | 38 |
| `lexicalized_review` | 2 |
| `retired_evidence_rehome_candidate` | 42 |
| `retired_research_gap` | 6 |

Promotion-ready remains **0**.

Discovery ranks expose gaps; they never promote, park, assign, or authorize work.

## Corpus state

The canonical AB30 packet has five fully reviewed candidates: two genuine and three false positives. Its readiness effect is `partial_only` because both genuine examples come from two small user-supplied conversation sources. It establishes attestation and extractor boundaries, not broad diversity or productivity.

The reusable PyCantonese 5.0.0 HKCanCor workbench verifies the frozen 58-file distribution against a checked-in SHA-256 manifest. Mechanical inventories exist for AA07, AA30, AA58, AA62, AA76, AA77, AA82, AB30, and AB53.

AA77 contains 1,730 high-recall noninitial `有` or `冇` candidates with following lexical material across all 58 files. The inventory deliberately retains existential, possessive, topic, subject, discourse, repair, fragment, wh/focus, and other analyses. It changes no evidence, readiness, status, identity, runtime, or release state.

Corpus extraction is separate from expert classification. A bounded human local-generation step may supply corpus access and artifacts while the parent repository issue remains ChatGPT-owned; it transfers neither judgment nor merge authority.

## Native-panel and survey state

`YUE-JUDGMENT-PILOT-01` remains the active SoSci collection instrument. The public questionnaire is available at [https://www.soscisurvey.de/canto-span/](https://www.soscisurvey.de/canto-span/). It is anonymous, takes approximately 10 minutes, and is intended for native or childhood Cantonese speakers.

General questions, recruitment help, Cantonese wording feedback, and community discussion belong in [GitHub Discussions](https://github.com/Vazhi/canto-span/discussions). GitHub Issues remain reserved for reproducible bugs, bounded research tasks, and implementation work.

The `review-packets/native-panel/active-v2/followup-draft-v1-*` specification remains non-deployable.

All eligible respondents form one anonymized role-neutral panel. No named person, relationship, private reviewer, expert title, or recruitment channel receives special weight. The pilot must close and receive item-level audit before a follow-up is revised, locked, generated, deployed, or treated as final evidence.

## Verification baseline

- aggregate regression cases: **551**;
- NP-subsystem cases: **43**;
- per-construction assertions: **1,518** across **133** files;
- current test coverage: 132 positive-and-boundary and 1 compatibility-alias-only construction file;

Canonical documentation-verifier values:

| Target | Current value |
|---|---:|
| Aggregate regression cases | 551 |
| NP-subsystem cases | 43 |
| Per-construction assertions | 1,518 |
| Construction test files | 133 |

Stable verification is `npm run verify`; full verification is `npm run verify:all`. Passing tests and implementation reachability have zero independent linguistic evidence weight.

## Current work order

1. Keep documentation, canonical data, status notes, runtime, survey metadata, corpus records, agent settings, claims, and generated reports consistent.
2. Select the highest-benefit non-parked task after checking live work, evidence gaps, learner impact, ontology risk, source and data availability, dependencies, implementation leverage, and recent topic concentration.
3. Require each substantive research issue to identify an actual project trigger, a falsifiable unresolved linguistic question, bounded evidence, relevant counterevidence and ambiguity, and an acceptable null outcome.
4. Treat topic diversity as a balancing factor: do not let the same few construction families repeatedly dominate when similarly valuable alternatives exist elsewhere.
5. Continuing within the same family is allowed when its follow-up is genuinely the strongest next task; recent work gives a topic neither automatic priority nor automatic exclusion.
6. Keep accepted implementation, runtime/design audits, human actions, corpus ingestion, claims, and pull requests separate from the substantive research portfolio.
7. Continue identity adjudication from the 92 pending UUIDs when it outranks other work; batches are opportunities, not a mandatory queue.
8. Complete useful HKCanCor inventories through deterministic extraction and separate expert review when they expose a bounded empirical question that outranks other available work, using human local execution only when access requires it.
9. Keep `YUE-JUDGMENT-PILOT-01` in collection until its stopping rule is met, then audit item wording, eligibility, exclusions, quality, comments, interpretations, controls, and regional limitations before drawing conclusions or revising a follow-up.
10. Implement status-path or runtime-label migrations only in explicitly scoped reviewed changes.
11. Do not create duplicate current-state ledgers, verifier families, naming systems, fixed construction queues, or unscoped automatic writers.

## Historical-material rule

Dated reports, retired ledgers, old prompts, closed issues, generated baselines, and Git commits may be cited for provenance. They must not replace current name, claim layer, status, runtime description, survey state, agent availability, work order, pickup ownership, or merge authority.
