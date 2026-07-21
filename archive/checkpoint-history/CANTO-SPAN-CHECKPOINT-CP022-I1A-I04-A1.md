# Canto Span checkpoint — CP022-I1A-I04-A1

- Date: 2026-07-19
- Lifecycle event: `PACKET_SCOPED_INTERNAL_CLEANUP_ACCEPTANCE`
- Status: **ACCEPTED**
- Parent candidate: `CP022-I1A-I04-R1`
- Accepted runtime: `v0.5.177-cp022-i1a-i04-internal-wrapper-cleanup-r1`
- Authorized packet: `EP-R37-I04`
- Active candidate: none

## Accepted change

The authorized I04 cleanup is accepted with intended semantic change **NONE**:

- `ModifierPhrase` is retired from the active registry and no longer emitted.
- `HeadNP` is internally represented as `NominalHeadSpan`; `HeadNP` survives only as compatibility metadata and ordinary learner-facing “noun phrase” display.
- `MeasureExpression` and `DefinitionComplement` remain bounded internal spans and cannot independently license grammar.

No new Cantonese construction was added or promoted. The global grammar freeze remains active outside I04.

## Evaluation

- Visible packet: **45/45 PASS**
- Rendered diagnostic rows: **11/11 PASS**
- Prospective held-out commitments: **5/5 verified**
- Prospective held-out exact signatures: **5/5 PASS**
- Aggregate regression: **545/545 PASS**
- Grammar legitimacy: **1111/1111 PASS** across 181 active labels
- `supported_productive`: **0**
- Semantic acceptance fixture: **15/15 PASS**
- Pre-intermediate corpus: **80/80 PASS**
- LX1 preservation: **13/13 PASS**, but LX1 remains render-pending and unaccepted

The rendered exports contained four inherited generic-hover-gloss warnings. They exposed no raw slot, no missing gloss, no `ModifierPhrase`, and no `NominalHeadSpan` learner jargon. No separate screenshot or pixel-layout artifact was supplied; acceptance is based on the user-supplied rendered diagnostic exports and full construction trees.

## Held-out disposition

The custody archive hash was verified before opening: `b0ea009f75039b8866756ae1c76cf815fb9d191d97a6362df71f987e65cee596`. The frozen candidate ZIP hash was `3a6fd80257955699807522a02f0a685b250aea0295f9341a76e5b947f9a60c6d`. All five commitments verified and all five cases matched their preimplementation signatures exactly.

These five cases are now consumed. They may become disclosed regression examples, but they must never again be described as prospective held-out evidence.

## Boundary

This checkpoint consumes only the authorization for `EP-R37-I04`. It does **not** authorize changes to ClauseSpan, clause relations, particles, questions, negation, motion, aspect, valency, or any other family. LX1 is not accepted by this checkpoint.

## Next

Design-only work may populate and lock the next packet. The recommended next safe-cleanup family is `I01 ClauseSpan`. **A new explicit unfreeze authorization is required before any I01 parser code changes begin.**

## Artifacts

- `validation/cp022-i1a-i04-a1/render-adjudication.json`
- `validation/cp022-i1a-i04-a1/heldout-evaluation-summary.json`
- `validation/cp022-i1a-i04-a1/acceptance-audit.json`
- `review-packets/cp022-evaluation/EP-R37-I04/final-evaluation/`
- `docs/research/CP022-I1A-I04-A1-ACCEPTANCE.md`
