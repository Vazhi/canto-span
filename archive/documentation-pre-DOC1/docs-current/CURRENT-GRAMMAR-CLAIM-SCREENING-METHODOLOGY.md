# Current-Grammar Claim Screening Methodology

> **Current authority — 2026-07-17 / CP020R2-RA1:** Apply `AUTHORITY-ORIGIN-AND-CLAIM-PROVENANCE.md` first. Internal behavior may create only a neutral research question. External proposition extraction must precede future language-claim wording. Runtime v0.5.174 is accepted after complete rendered review; acceptance does not establish productive grammar.

This document defines how individual claims are screened. The full batch lifecycle is in `RESEARCH-BASED-ACCEPTANCE-AUDIT.md`.

## 1. Question registration before claim decomposition

If the lead comes from parser behavior, write it without a proposed answer or parser label. Freeze the question, discovery vocabulary, source classes, inclusion/exclusion rules, competing terms, and stop criteria before substantive searching.

Only after external source propositions have been extracted may a future language claim be drafted.

## 2. Claim decomposition

Record five separate propositions:

| Layer | Question |
|---|---|
| Language claim | What form, meaning, distribution, scope, productivity, and restrictions exist in Cantonese? |
| Independent attestation | Does naturally produced external evidence instantiate the surface and intended reading? |
| Parser representation | Is the node boundary, hierarchy, label, role assignment, and span defensible? |
| Parser heuristic | Are the cues safe operational selectors, or are they being misrepresented as grammar? |
| Lexical scope | Is the behavior productive, closed-class, collocational, or fixed? |

A label may survive as an internal wrapper while its language claim is downgraded or removed.

## 3. Screening populations

Keep separate inventories for:

- patterns active in accepted parser behavior;
- candidate-only behavior;
- dormant registered labels with no accepted fixture or attestation;
- quarantined and lexicalized patterns;
- historical or retired labels.

Candidate-only behavior is excluded from the accepted-pattern denominator.

## 4. Evidence requirements

For each material claim preserve:

- a stable claim ID and explicit claim-source edges;
- canonical URI/DOI and exact locator for every source proposition;
- search queries, screened sources, inclusion/exclusion decisions, and access failures;
- whether the claim is externally originated or legacy post-hoc source-linked;
- pattern-specific sources;
- natural corpus attestations with context and provenance;
- positive, negative, ambiguous, and boundary cases;
- lexical/predicate/register/variety limits;
- design versus held-out membership;
- strongest competing analysis;
- native naturalness evidence where useful;
- native/expert structural analysis where necessary;
- internal parser behavior and diagnostic findings, clearly labeled as internal evidence.

## 5. Evidence that is insufficient by itself

None of these independently validates a grammar claim:

- parser fixture;
- regression snapshot;
- generated example;
- LLM judgment;
- parser hit;
- corpus string match;
- dependency parse;
- dictionary gloss;
- sentence naturalness checkbox;
- clean summary row;
- full-root target label;
- audit PASS;
- historical acceptance.

A source count without source IDs and scoped edges is also insufficient.

## 6. Design/held-out separation

Freeze the design set before evaluating the held-out set. Do not modify the rule or expected analysis to fit held-out rows and then count them as held out. Record failures and future remediation.

A productive claim needs meaningful negative boundaries and cross-lexeme evidence. One lexical item or one fixed particle cluster cannot license a broad pattern.

## 7. Competing-analysis requirement

State the strongest alternative and the evidence that distinguishes it. When evidence cannot distinguish analyses, keep the claim provisional or research-pending; do not force a clean hierarchy.

## 8. Semantic row review

Inspect every summary row. Inspect every triggered or suspicious full diagnostic and at least one apparently clean untriggered full diagnostic. A mechanical evaluator is routing evidence only.

## 9. Separate dispositions

For every audited label record:

```text
language_claim_disposition
representation_disposition
heuristic_disposition
lexical_scope_disposition
runtime_change_authorized = false
future_remediation_candidate
origin_status
external_source_ids
claim_source_edge_ids
```

Use `AUDIT-DISPOSITION-AND-EVIDENCE-MATRIX.md` for support thresholds and disposition meanings.

## 10. Runtime boundary

Research and governance records cannot alter runtime behavior. Implementation requires a separate candidate and acceptance batch.

A future grammar construction may be implemented without a one-for-one replacement only when it emerged from the authority-origin lifecycle. A legacy parser observation cannot qualify by being renamed as a source-derived claim. The dossier must preserve the pre-claim question, screened-source log, extracted propositions, contradiction search, source-derived synthesis, claim-source edges, held-out design, negative boundaries, competing analyses, and recovery artifacts.

## 11. Native screening

Do not treat an unchecked item as natural. Record explicit `natural_in_context`, `unnatural_in_context`, `unsure_or_needs_context`, or `not_seen`. Naturalness is surface evidence only; it cannot validate parser structure or productivity.
