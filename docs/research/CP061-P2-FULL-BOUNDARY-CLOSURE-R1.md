# CP061-P2 full boundary closure

Checkpoint: `v0.5.215-p2-full-boundary-closure`

## Decision

Every active language-facing construction must have at least one accepted positive
case and two direct negative controls. The controls in
`tests/fixtures/boundary-closure-v1.json` close the remaining positive-only
inventory after the high-fan-out P1 slice.

## Boundary method

The fixture uses contrasts among already accepted parser profiles:

- ordinary saturated clauses versus fragments, discourse units, and special clause
  types;
- stative, eventive, modal, perfective, progressive, and directional predicates
  versus one another;
- bare, quantified, demonstrative, temporal, person, and associative nominals
  versus one another;
- scalar, A-not-A, completion, existential, classifier, and fragment questions
  versus one another;
- positive grammatical clauses versus learner-error and contextual-completion
  labels.

Each `class` field states the distinction being protected. Repeated surfaces are
intentional controls: they make cross-family overgeneration visible while keeping
the evidence set small and reviewable.

## Source linkage

The contrasts narrow parser assignment and do not establish new productive
generalizations. Their profiles are grounded in the already checked language
samples and grammar descriptions mapped to:

- `SRC-WONG-2023-LANGUAGE-SAMPLE`
- `SRC-YIP-MATTHEWS-2000-BASIC`
- `SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE`

Positive evidence remains in exact regression fixtures, focused evaluation
packets, and the corresponding construction note. The boundary fixture is the
canonical machine-readable ledger for this closure pass.

## Endpoint

This pass is complete only when generated coverage reports zero `positive_only`,
zero `implementation_positive_only`, and zero `no_direct_cases`, while the
compatibility alias remains explicitly guarded and the core and release verifiers
pass.
