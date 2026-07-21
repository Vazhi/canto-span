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

## Mechanical promotion and release gates

Before any status change or version handoff is accepted, run:

```bash
node tools/test-promotion-gate.js
node tools/enforce-promotion-rules.js
node tools/verify-release-handoff.js
```

The v2 construction gate reads note frontmatter, source records, corpus classification counts, shared speaker-contrast metadata, standardized test coverage, and current code-review metadata. It fails closed when any required fact is missing or inconsistent.

The release gate independently derives status changes from Git. It requires an audit slice for every changed construction, rejects unre-audited `supported_productive` records, preserves separate implementation and linguistic reporting, and checks the dormant-label retirement cadence.

No prior acceptance is exempt. Additional native-speaker review is authorized, but only screened, independent, same-contrast records can satisfy the speaker gate. Public pilot responses may be retained without becoming promotion eligible.

## Dispositions

- **ACCEPT** — the exact narrow claim passes linguistic and implementation requirements.
- **IMPLEMENTED INFRASTRUCTURE** — a shared subsystem passes its independent structural specification; this does not promote consuming constructions.
- **REVISE** — useful work exists, but one or more requirements fail.
- **QUARANTINE** — retain for research or diagnostics while blocking productive licensing.
- **RETIRE** — remove a redundant, dormant, or indefensible label while preserving history.

A failure cannot be converted into a pass by widening the claim, adding example-specific strings, counting raw hits, treating one speaker as population evidence, or relabeling internal test success as linguistic confidence.
