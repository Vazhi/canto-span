# Corpus and Research

## Binding research protocol

> **CP020R2-RA1 state — 2026-07-17:** The indefinite new-grammar freeze and replacement-only rule remain retired. Legacy Cantonese-language claims remain non-promotable until reconstructed from screened external evidence; future grammar must follow the authority-origin lifecycle. Parser `v0.5.174` is accepted after full rendered review; there is no active candidate.

All current research follows `RESEARCH-BASED-ACCEPTANCE-AUDIT.md`, `CORPUS-FIRST-EVALUATION-PROTOCOL.md`, and `MANDATORY-DOWNLOAD-AND-RECOVERY-PROTOCOL.md`. Corpus hits are candidates until manually adjudicated in context.

> **CP020R2-RA1 state — 2026-07-17:** The indefinite new-grammar freeze and replacement-only rule remain retired. Legacy Cantonese-language claims remain non-promotable until reconstructed from screened external evidence; future grammar must follow the authority-origin lifecycle. Parser `v0.5.174` is accepted after full rendered review; there is no active candidate.


## Corpus-first authority

The project now begins grammar discovery from independently existing Cantonese data and documented linguistic research. Generated examples are probes only. The 177-label active legitimacy inventory is in `test-data/grammar-legitimacy-audit.*`; explicit origin/source-edge state is in `test-data/grammar-claim-provenance-CP021A.*`; the evidence protocol is `CORPUS-FIRST-EVALUATION-PROTOCOL.md`. Raw UD Cantonese-HK and HKCanCor materials remain outside the distributable package.


## Accepted packaged fixtures

### A1 context-status fixture

`test-data/a1-context-status-fixture.tsv` — **40/40 PASS**.

### Frozen pre-intermediate corpus

`test-data/pre-intermediate-gold-corpus.tsv` — **80/80 PASS**, 100% positive construction correctness, zero safety debt.

Accepted expectations may change only through an intentional, documented, rendered-accepted doctrine change. Candidate-specific changes remain in the focused gate until acceptance and later aggregate absorption.

## Current research authority

The live runtime evaluation is:

- `docs/research/CURRENT-RUNTIME-RESEARCH-REAUDIT.md`
- `docs/research/CURRENT-RUNTIME-RESEARCH-REAUDIT.json`
- `docs/research/CURRENT-RUNTIME-RESEARCH-REAUDIT.csv`
- `docs/research/APPLICATION-SWEEP-v0.5.158.md`

It covers 340 rows against accepted v0.5.158 and supplies current defect families, affected tokens, and program scores.

The original v0.5.118 linguistic synthesis and routing matrix remain under `docs/history/research-v0.5.118-snapshot/`. Their language evidence may be consulted; their runtime states and defect counts are historical and superseded.

## Research-to-implementation rule

1. formulate the linguistic question;
2. review multiple credible sources where practical;
3. distinguish facts, competing analyses, doctrine decisions, hypotheses, and ambiguity;
4. collect positive, negative, ambiguous, colloquial, and boundary examples;
5. map evidence to the current v0.5.158 row-level audit;
6. score the broad program;
7. implement only a coherent architecture family;
8. preserve provenance and licensing restrictions;
9. require semantic and regression validation.

Do not patch one research sentence at a time.

## W17 review-only inventories

W17 lexical, functional-corpus, grammar, phonics, and naturalized-alternative TSVs remain separate from the frozen corpus. Naturalness, lexical role, construction structure, context status, and semantic disposition are independently reviewed. Current remaining review-only corpus ledger: **12 FAIL / 3 REVIEW / 0 PASS**; four previously passing rows are promoted accepted and protected by aggregate regression.

Review-only does not mean permanently deferred. The 97 unique W17 review-only units are inventoried and scored in `test-data/review-only-readiness.tsv`; duplicate source copies are counted once. `tools/run-review-only-readiness-audit.js` verifies complete coverage, scores, owners, triggers, blockers, and backlog linkage. Promotion is target-specific: aggregate regression fixture, accepted lexical overlay, construction example, pronunciation reference, or preferred naturalized alternative.

## External HKCanCor work

HKCanCor source rows, selection workspaces, runners, environments, and generated diagnostics remain external. Restricted or non-redistributable sources may be used locally when permitted, but must never enter distributable packages. Preserve provenance and restrictions.

## Supplemental natural-corpus checkpoint CP018A

`WECHAT-FD-001` is a user-supplied sanitized father–daughter WeChat conversation registered as observed natural corpus. It contains 65 editorial clause units and 14 full turns. The pre-CP018 and CP018-r1 snapshots were compared on all 79 rows. CP018 exposed 20 baseline clean-wrapper risks across the unit and turn views, but two repeated `佢話冇房就得喇。` rows reached `MANUAL_REVIEW_ELIGIBLE` through a flat `legacy_surface_rule` `ReportedSpeech` wrapper. This is recorded as a review-routing false negative, not grammar acceptance. See `docs/research/NATURAL-CORPUS-WECHAT-FATHER-DAUGHTER-001-PARSER-AUDIT-CP018A.md`.
