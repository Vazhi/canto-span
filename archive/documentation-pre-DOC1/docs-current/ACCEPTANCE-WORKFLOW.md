# Acceptance Workflow

> **CP020R2-RA1 state — 2026-07-17:** The indefinite new-grammar freeze and replacement-only rule remain retired. Legacy Cantonese-language claims remain non-promotable until reconstructed from screened external evidence; future grammar must follow the authority-origin lifecycle. Parser `v0.5.174` is accepted after full rendered review; there is no active candidate.

## 1. Current provenance gate

No legacy claim may be promoted, and no future grammar candidate may be implemented, until the authority-origin record is complete. The workflow currently applies to:

- evidence-governance packages;
- documentation-only packages;
- narrowing/relabeling/quarantine recommendations;
- explicitly authorized parser corrections that do not expand grammar;
- future grammar candidates only after neutral discovery, source screening, proposition extraction, source-derived synthesis, explicit claim–source edges, and frozen evaluation.

The former indefinite freeze and replacement-only exception are retired. CP021A itself authorizes no parser candidate.

## 2. Acceptance is explicit

Packaging, syntax PASS, focused PASS, regression PASS, corpus PASS, or rendered output do not change accepted state. Accepted parser behavior and accepted governance change only through explicit acceptance records.

For Cantonese-language claims, acceptance also requires explicit external proposition edges. Authority compatibility found after a parser claim was invented is labeled post-hoc and cannot establish authority origin.

## 3. Summary/full-diagnostic review

The acceptance-summary JSON is a row index. It is not semantic acceptance.

Required:

1. inspect every summary row;
2. inspect every `full_review.required` row;
3. inspect every row with conservative triggers;
4. inspect every suspicious compact row;
5. inspect at least one apparently clean untriggered full row;
6. verify summary/full companion identity and row alignment;
7. issue explicit PASS, REVISE, or REJECT.

For phase closure or baseline consolidation, inspect all relevant full rows.

## 4. Conservative full-review triggers

- semantic review trace or flag;
- missing, incompatible, or unresolved context;
- ambiguity choice or competing selected alternative;
- normalization or parser-shadow activity;
- non-PASS audit;
- nested/wrapper structure where scope matters;
- contextual learner-role change;
- review-oriented trace family;
- parser-active feature bundle;
- missing/multiple top constructions;
- partial root span or unwrapped non-punctuation material;
- contextual-role provenance mismatch;
- provisional, pending, heuristic, lexicalized-only, or unsupported legitimacy status;
- suspicious role, Jyutping, hierarchy, sense, or doctrine fit.

## 5. Cross-artifact agreement

Summary and full diagnostics must agree on runtime, timestamps, export ID, note path, row count/order, source directives, context, top constructions, root coverage, roles, Jyutping, and legitimacy metadata. Any material mismatch blocks acceptance.

## 6. Research disposition versus parser acceptance

A research dossier may recommend retain/narrow/relabel/downgrade/quarantine/lexicalize/retire/defer. That recommendation is not a parser acceptance event and does not authorize runtime synchronization.

## 7. Required candidate artifacts

When a distributable package changes, provide:

- one-root installable ZIP;
- recovery ZIP;
- checkpoint Markdown;
- checkpoint JSON;
- rolling recovery ZIP;
- acceptance/diagnostic note when applicable;
- validation outputs;
- artifact manifest and SHA-256;
- clear accepted/candidate/freeze metadata.

## 8. Installation command requirement

Every installation command block must include:

```bash
obsidian reload
```
