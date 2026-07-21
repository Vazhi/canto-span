# Validation and acceptance

The controlling completion criteria are in [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md). Validation cannot waive them.

## Separate questions

1. **Linguistic support:** Is the narrow construction justified by verified sources, reviewed examples, speaker evidence, boundaries, and competing-analysis review?
2. **Implementation correctness:** Does the parser implement that claim accurately and without regressions or misleading learner output?
3. **Subsystem correctness:** Does reusable structure generalize to unseen combinations while unknown, incomplete, and ambiguous analyses remain safely typed?

Success on one question cannot substitute for another.

## Construction checks

- independent source re-verification;
- manual corpus/example classification;
- same-contrast speaker review, with two independent speakers required for `supported_productive`;
- executable negative and boundary cases;
- competing-analysis review;
- line-by-line code-document comparison;
- focused, preservation, semantic, regression, render, and prospective held-out tests;
- documentation and package integrity.

## NP subsystem checks

Before integration, the NP subsystem must pass:

- bare, quantified-classifier, demonstrative-classifier, simple associative, and binary coordination positives within the frozen scope;
- unseen nouns and unseen combinations;
- malformed and incomplete negatives;
- unknown-token tests proving `provisional_np_candidate` cannot license downstream constructions;
- ambiguity tests preserving unresolved `啲 A 嘅 N` attachment;
- coordination tests that do not infer shared or hidden material;
- preservation tests for existing NP consumers;
- diagnostics separating structural recognition from naturalness and linguistic status.

Making the motivating perfective examples pass is not sufficient.

## Productive promotion

A construction may become `supported_productive` only after every Definition-of-Done item and every applicable implementation check passes. No prior acceptance is exempt. Second-speaker work is frozen, so no construction requiring that missing review can currently be promoted.

## Dispositions

- **ACCEPT** — the exact narrow claim passes linguistic and implementation requirements.
- **IMPLEMENTED INFRASTRUCTURE** — a shared subsystem passes its independent structural specification; this does not promote consuming constructions.
- **REVISE** — useful work exists, but one or more requirements fail.
- **QUARANTINE** — retain for research or diagnostics while blocking productive licensing.
- **RETIRE** — remove a redundant, dormant, or indefensible label while preserving history.

A failure cannot be converted into a pass by widening the claim, adding example-specific strings, counting raw hits, treating one speaker as population evidence, or relabeling internal test success as linguistic confidence.
