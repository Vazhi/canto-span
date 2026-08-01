# Glossika context-linked responses R1

Date: 2026-08-01  
Parent issue: #393  
Work claim: #421  
Pull request: #422

## Endpoint

All **59** Glossika Dialogs 001–020 turns carrying `NeedsContext` were reviewed against their immutable source record, the immediately preceding and following dialog turns, current runtime labels, AA66 `ContextLinkedAnswerUtteranceWrapper`, and AA96 `UnresolvedContextDiagnostic`.

The terminal partition is:

| Disposition | Turns |
|---|---:|
| Bounded context licensing | 44 |
| Independent context-free parser gap | 12 |
| Formula/discourse unit needing no syntactic reconstruction | 2 |
| Retain unresolved `NeedsContext` | 1 |
| **Total** | **59** |

The row-level decisions are in `review-packets/corpus-review/GLOSSIKA-CONTEXT/context-linked-response-decisions-r1.tsv`; the machine-readable map is `data/research/GLOSSIKA-CONTEXT-LINKED-RESPONSE-DECISIONS-R1.json`.

## Accepted context contract

The review accepts a **bounded discourse-metadata contract**, not a universal ellipsis construction. The default context window is the immediately preceding dialog turn. A licensed result may store the antecedent turn ID and overt surface, the response or discourse slot linked to it, and the selected alternative. It must not fabricate omitted Cantonese words, synthetic children, or one invariant hidden clause.

Context application is **member-local**. In turns such as `得呀，幾時去呀？`, only `得呀` is an answer relation; the continuation question keeps its own overt structure. A whole multi-clause turn must not remain `NeedsContext` merely because one child is discourse-dependent.

Licensed profiles include:

- short modal, skill, preference, existential, need, acceptability, time, and proposal answers whose domain is uniquely overt in the preceding turn;
- quantified answers whose measured activity is overt in the preceding question;
- reciprocal `你呢` questions reusing one question domain;
- predicate or object repetition linked to the overt preceding question;
- discourse-spanning `但係／不過` continuations whose current clause is overt and whose contrast antecedent is unique.

The contract blocks licensing when antecedents compete, the semantic relation is not supported by the immediately preceding turn, a conventional formula would require a guessed hidden predicate, or context is being used to hide an independently complete parser miss.

## AA66 and AA96 consequence

AA66 remains a parser representation for heterogeneous answer relations. These 44 licensed rows do **not** establish one shared fragment syntax, one ellipsis operation, or transferable linguistic evidence. Independently typed modal, question, clause, aspect, nominal, and discourse structures retain ownership of their overt material.

AA96 remains a learner-visible uncertainty disposition. It should survive only when the typed missing slot or discourse relation remains unresolved after compatible context is checked. In this packet, only `所以一家人聚埋？` remains unresolved: the immediately preceding claim that the winter-solstice night is longest does not uniquely license the proposed family-gathering consequence, while broader dialog themes permit more than one relation.

## Formulae requiring no reconstruction

Two turns should not be treated as syntactic fragments:

- `好呀！你一定得㗎！`
- `加油！我哋一定得！`

They are encouragement/evaluation formulae. Assigning one unique omitted predicate would overstate the source. They may still receive independently justified discourse-act or evaluative analyses, but structural coverage must not depend on an antecedent link or a reconstructed predicate.

## Independent parser routes

Twelve turns are complete without prior-turn completion and route to three bounded Future issues:

| Issue | Profile | Rows |
|---|---|---:|
| #423 | `如果 + condition + 點算` contingency questions | 4 |
| #424 | overt-predicate `X 就得` sufficiency and event-level `X 得唔得` acceptability | 5 |
| #425 | complete skill-learning desiderative, evaluative, and A-not-A clauses | 3 |

These routes are not evidence that new UUIDs are required. Each issue allows a null outcome in which accepted existing components remain and only detector ordering, lexicon, span ownership, or diagnostic suppression changes.

## Review-class distribution

| Review class | Turns |
|---|---:|
| `continuation_or_fragment_question` | 4 |
| `formula_or_discourse_response` | 7 |
| `genuinely_ambiguous` | 1 |
| `multi_clause_member_local` | 32 |
| `ordinary_parser_gap` | 12 |
| `recoverable_answer` | 3 |

## Method and evidence boundary

The review used only repository-preserved source turns and current parser output. Glossika provides pedagogical attestation and dialog adjacency; it does not establish productivity, preferred analysis, frequency, dialect-wide naturalness, or parser correctness. Current runtime output is implementation evidence only.

Every decision preserves the source wording and records the previous and next turn. No source record, review record, identity, status, fixture, or runtime file is changed.

## Stop rule

This package is complete when all 59 rows are present exactly once, aggregate counts reconcile, the three independent families have durable routes, core and research verification pass, and the temporary snapshot exporter is absent from the final diff. Runtime implementation requires a separate claim and review.
