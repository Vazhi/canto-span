# CP021B Immutable Evaluation Design

- Date: 2026-07-17
- Lifecycle event: `IMMUTABLE_EVALUATION_DESIGN_FREEZE`
- Evidence authority: CP021B-SY claims, edges, contradictions, and no-claim dispositions
- Design partition: 24 rows
- Held-out partition: 36 rows
- Parser output consulted during design: no
- Runtime changes: none

## Purpose

This checkpoint translates the seven source-derived language claims and two project no-claim dispositions into a theory-neutral evaluation. It does not choose a parser node, category analysis, replacement shape, or implementation strategy.

The evaluation asks whether a future candidate preserves the observable boundaries licensed by the evidence:

- lexical GIVE theme-recipient is recognized without being made exclusive;
- recipient-theme and other orders remain predicate, role, weight, discourse, and speaker scoped;
- post-theme `畀/俾` interpretation remains dependent on the upstream predicate and valency;
- heavy-theme, double-marker, and `將` alternatives remain review-bearing rather than categorical;
- non-full and fronted forms preserve discourse dependence without hidden participants;
- causative or permissive and passive readings remain distinct or explicitly ambiguous;
- non-target, historical, and corrected corpus patterns do not leak into a unified recipient analysis; and
- no row or score is converted into a current unrestricted-adult frequency model.

## Frozen partitions

| Partition | Rows | Permitted use |
|---|---:|---|
| Design | 24 | May guide a later implementation plan after separate authorization. |
| Held out | 36 | Must not guide implementation or expectation editing; open only for post-implementation adjudication. |

Files:

- `test-data/cp021b-evaluation-design.tsv`
- `test-data/cp021b-evaluation-heldout.tsv`
- `docs/research/CP021B-EVALUATION-COVERAGE.tsv`

Both partitions are immutable after this freeze. A discovered provenance or transcription error must be recorded as a versioned correction; a failed candidate may not rewrite the row to pass.

## Family allocation

| Family | Design | Held out | Main purpose |
|---|---:|---:|---|
| Lexical GIVE theme-recipient | 4 | 6 | Attestation without exclusivity or productivity inflation |
| Order conditioning | 4 | 6 | Lexical, thematic-role, pronoun, weight, and speaker boundaries |
| Post-theme linking | 4 | 6 | Transfer, beneficiary, Goal, and final-predicate dependence |
| Heavy-theme alternatives | 3 | 5 | Double-marker, short/heavy conflict, `將`, and threshold veto |
| Non-full/restructured | 3 | 5 | Omission, fronting, discourse recovery, and no hidden arguments |
| Causative/passive boundary | 4 | 6 | Permissive, passive, nonadverse, and ambiguous readings |
| Non-target/correction/history | 2 | 2 | Conditional, fixed, corrected, and historical functions |

## Row interpretation

`expected_observation` is an evidence-scoped behavioral requirement, not a required construction label. `prohibited_inference` states the overclaim the candidate must avoid. A row can therefore pass by remaining explicitly unresolved or review-bearing when the frozen claim does not license a single reading.

`stimulus_origin` distinguishes:

- `SOURCE_EXAMPLE` or `SOURCE_LEXICAL_BOUNDARY`: surface material preserved from the extracted source record;
- `SOURCE_PATTERN_PROBE`: a close probe of a source-described pattern;
- `GENERATED_FROM_SOURCE_PATTERN` or `GENERATED_FROM_SOURCE_CONTRAST`: a project-authored test stimulus derived from a frozen proposition;
- `GENERATED_NEGATIVE_BOUNDARY`, `GENERATED_AMBIGUITY_PROBE`, or `GENERATED_CORRECTION_CONTROL`: deliberately uncertain or negative test material.

Generated stimuli are not Cantonese evidence. Passing them cannot promote grammar. Every row remains marked `REQUIRED_BEFORE_RUNTIME_ACCEPTANCE` for native/expert review.

## Split discipline

No Canto Span parse, diagnostic, fixture expectation, or current behavior was consulted while selecting rows or writing expected observations. The design file may be opened during a later authorized implementation-planning event. The held-out file must remain closed to implementation decisions and may be evaluated only after a candidate is fixed.

An implementation candidate must not:

- tune lexical triggers, word order, roles, or ambiguity logic to held-out rows;
- change a held-out expected observation after seeing candidate output;
- count a generated probe as natural attestation;
- insert a hidden theme, recipient, agent, causer, or proposition;
- turn review-bearing uncertainty into a clean result merely to improve the score; or
- use aggregate accuracy to choose among disputed linguistic theories.

## Adjudication dimensions

A later evaluator must inspect both summary and full diagnostic output for every row and record:

1. source text and token preservation;
2. all overt participant spans;
3. possible reading or explicit ambiguity;
4. prohibited inference leakage;
5. hidden-material insertion;
6. orthographic `畀/俾` parity where paired;
7. semantic status and blockers;
8. learner-facing role and hover accuracy;
9. claim and provenance trace; and
10. native/expert review state.

Headless PASS cannot constitute acceptance. Learner-facing changes require rendered Obsidian review. Structural uncertainty requires native/expert analysis rather than unchecked naturalness.

## Automatic vetoes

Regardless of row score, the evaluation fails to authorize implementation or acceptance if a candidate:

- reintroduces one unified recipient relation across transfer, beneficiary, causative/permissive, and passive uses;
- assigns recipient solely from post-marker position;
- selects one disputed marker category as Cantonese fact;
- encodes a categorical length or distance threshold;
- treats missing local participants as invented hidden arguments;
- revives the retracted bare `bij2-VP` corpus class;
- promotes productive modern instrumental `畀/俾` from historical/older-speaker evidence;
- claims current frequency from this balanced evaluation set; or
- changes runtime before separate authorization.

## Next event

After user confirmation, a separate pre-implementation disposition may decide whether the frozen evidence and evaluation support one or more runtime remediation candidates, representation-only handling, or no implementation. CP021B-EV itself authorizes none.
