# Repository-wide future parser work map R1

Date: 2026-08-01
Base commit: `4e7c0b299a24a3ff3dcbeed7edabc246d6da1db2`
Parent issue: #402
Work claim: #403
Pull request: #404

## Executive decision

The strongest next substantive package is **#405 — AA56 positive 有 participant introduction**. It has completed source and corpus boundaries, a reproducible two-direction runtime mismatch, high structural centrality, and an explicit accepted next step: retained-UUID identity migration plus a positive-only parser specification. The package must stop before runtime implementation.

The next two activation-ready packages are **#406 — 有得／冇得 availability** and **#393 — context-linked short responses**. AB30 is not the next task despite its higher generated readiness score because its remaining gates are an external role-neutral panel and held-out validation, not more repository specification.

## Coverage

- **181** permanent identity records scanned: **133 current**, **48 retired**;
- **89** pending identity adjudications reviewed as a selection pool, not as one coherent task;
- **18** complete PRQ2 research units and their source/collision companions scanned;
- **487** files under `docs/research/` inspected through the repository snapshot;
- the complete Glossika 001–020 map reviewed: **821 turns**, including **59 `NeedsContext`** and **131 no-wrapper** turns;
- preexisting open planning issues #343, #367, #391, #392, and #393 checked for duplication;
- recent accepted work checked so completed AA82, nominal-modification, Glossika-ingress, and verification packages were not reopened.

## Ranking method

The numeric score is a decision aid, not linguistic evidence. It weights expected parser impact, evidence maturity, boundedness, dependency leverage, and execution readiness, then subtracts ontology risk and external blocking. Final order also applies the repository tie-break: dependency unlock, correctness impact, evidence readiness, scope certainty, topic balance, then lower cost.

| Rank | Candidate | Issue | Disposition | Score | Why it ranks here |
|---:|---|---:|---|---:|---|
| 1 | AA56 positive 有 participant introduction | #405 | activate_now | 61 | Correct a central subjectless participant-introduction family and establish safe composition among possession, overt-place existence, and NP-linked predication. |
| 2 | 有得／冇得 availability and opportunity | #406 | activate_now | 59 | Add a common availability relation while preserving polarity, embedding, objects, ellipsis, and lexicalized boundaries. |
| 3 | Context-linked short responses across Glossika | #393 | activate_now | 52 | Separate correct unresolved diagnostics from recoverable previous-turn relations and independent parser defects across all twenty dialogs. |
| 4 | Typed paired clause relations | #407 | prepare_evidence | 48 | A coordinated terminal map can unlock several common clause-linking profiles while preventing eleven duplicate identities or broad fallbacks. |
| 5 | Postverbal aspect profiles V開, V落去, V起嚟 | #408 | prepare_evidence | 46 | Correct three common aspectual domains and reduce systematic lexical/directional false analyses. |
| 6 | Classifier/measure evidence-typed metadata | #409 | activate_after_top_specs | 49 | Create a safe evidence architecture for later noun/classifier growth and prevent structural fixtures from being treated as linguistic pair evidence. |
| 7 | AA84 manner profiles | #410 | prepare_evidence | 42 | Improve a productive manner domain while eliminating hidden-marker and surface-equality overgeneration. |
| 8 | Scalar progression and near-miss operators | #414 | prepare_evidence | 40 | Add common degree/event operators and improve negative boundaries around broad scalar fallbacks. |
| 9 | Alternative choice plus scalar evaluation | #392 | existing_future | 39 | Clarify whether choice and evaluation compose or require a bounded integrated profile. |
| 10 | Modal/desiderative/preference decomposition | #411 | prepare_evidence | 37 | High eventual leverage across frequent modal input, but only after scope is narrowed by lexeme and complement type. |
| 11 | 早知 hindsight-regret | #413 | prepare_evidence | 36 | Preserve a conventional counterfactual-regret relation while controlling lexical foreknowledge and unrelated markers. |
| 12 | Resultative and lexical change profiles | #412 | prepare_evidence | 36 | Recover central result/change behavior without reviving exact-string wrappers or one universal result node. |
| 13 | 信得過 potential-standard profile | #391 | existing_future | 40 | Resolve a narrow but clear collision among result potential, evaluative standard, experiential 過, and comparative 過. |

## Activate now

### 1. #405 — AA56 positive 有 participant introduction

- Research center: `有 + overt indefinite NP + NP-linked predicate`.
- Completed evidence: 1,372-row mechanical inventory, complete 179-row review, 44 clear positive rows, and explicit AA55/AA77/partitive/temporal/negative-human exclusions.
- Current mismatch: locative-coda undergeneration plus polarity overgeneration.
- Next endpoint: retained-UUID identity decision and positive-only parser specification; no implementation in the same package.

### 2. #406 — 有得／冇得 availability and opportunity

- Completed evidence: 95-span exhaustive review; 31 affirmative and 32 negative transparent rows; five `有冇得` polarity questions.
- Current mismatch: relation absent or fragmented under modal, existential, A-not-A, and potential analyses.
- Next endpoint: identity/composition decision and parser specification with lexicalized and ellipsis quarantine.

### 3. #393 — context-linked short responses

- Complete finite set: 59 `NeedsContext` turns with preserved adjacency.
- Next endpoint: separate legitimate unresolved diagnostics, recoverable previous-turn relations, formulas/fragments, and independent parser gaps.
- Null outcome remains acceptable: all 59 may be correctly unresolved.

## Ready but lower direct behavior gain

### #409 — classifier/measure evidence-typed metadata

This is a well-specified behavior-preserving schema migration. It is ready, but ranks below the three direct parser-gap packages because its first PR deliberately changes no compatibility outcome. It prevents future evidence and policy conflation and should precede classifier expansion.

## Prepare evidence or identity map

- **#407 paired clause relations:** terminally type eleven source-backed PRQ2 relations before implementing any set of nodes.
- **#408 postverbal aspect profiles:** adjudicate `V開`, continuative `V落去`, and inchoative `V起嚟／起上嚟` against lexical and directional uses.
- **#410 manner profiles:** separate `gam2`, `dei2`, and bare reduplication and remove written-equality inheritance.
- **#414 scalar progression and near-miss:** mature `越…越／越嚟越` and `差啲／爭啲` as separate profiles; coordinate with existing #392.
- **#411 modal/desiderative/preference:** high eventual leverage, but lexeme, complement, polarity, scope, and ellipsis evidence is not yet bounded enough for a runtime rewrite.
- **#413 早知 hindsight-regret:** direct constructional support exists; consequent, `咪`, omission, order, and prosody remain.
- **#412 result/change profiles:** build five bounded packets without restoring retired wrappers.
- **#392 alternative-choice plus scalar evaluation:** retain existing issue; no duplicate created.
- **#391 信得過:** retain existing narrow research issue; likely lexical-only null outcome remains valid.
- **AA77 place-initial existence:** keep low-priority preparation; only 40 of 1,730 candidates are reviewed and exact runtime alignment is not closed.

## Waiting

- **AB30 `ZoMarkedPerfectiveObjectVP`:** generated readiness is high, but the remaining work is a locked role-neutral panel and held-out validation. Do not create more repository research merely because it scores 90.
- **#343 survey-split 用嚟 / V完咗O:** collection remains active. Wait for the stopping rule, frozen export, exclusions, quality audit, and item-version audit.

## No action or completed

- **AB15 demonstrative-classifier-noun:** latest accepted note records strong evidence and runtime alignment; route future classifier architecture through #409 instead.
- **AA07/AA91 nominal modification:** accepted corpus closure retained the narrow identities and kept AB10 retired; no new runtime or UUID consequence.
- **AA82 matrix 邊度:** corpus boundary packet, specification, implementation, and regressions are complete under PR #390.
- **89 pending identities:** remain a family-specific selection pool. Do not create one score-driven global adjudication batch.

## New durable Future issues

| Issue | Scope |
|---:|---|
| #405 | AA56 retained identity and positive-only specification |
| #406 | 有得／冇得 identity and composition |
| #407 | paired clause-relation terminal map |
| #408 | postverbal aspect/directional collision program |
| #409 | classifier/measure evidence schema |
| #410 | AA84 manner identity and packet plan |
| #411 | modal/desiderative/preference decomposition |
| #412 | result/change decision packets |
| #413 | 早知 hindsight-regret maturation |
| #414 | scalar progression and near-miss maturation |

## Evidence boundaries

- Generated readiness scores locate gaps; they do not prove grammatical validity or select work automatically.
- Parser output, fixtures, and regression success are implementation observations only.
- Glossika and corpus examples establish attestation in context, not unrestricted productivity.
- Identity, status, runtime, survey, and release decisions remain separate.
- No candidate in this map receives a runtime, UUID, status, survey, release, or deployment change.

## Stop rule

- all 181 identities received an inventory row;
- all 18 PRQ2 units were inventoried;
- all selected candidate families received activate, prepare, wait, no-action, completed, or selection-pool dispositions;
- preexisting issues were deduplicated;
- only backlog-admission-ready nonduplicates became new Future issues;
- the recommended next package and its stop-before boundary are explicit.

