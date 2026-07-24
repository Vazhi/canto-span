# Canto Span — Definition of Done

This defines when a construction and a release may be called done. It applies to
every UUID-keyed language claim and every version handed off for review.

## `supported_productive`

A construction is eligible only when all of the following are true:

- [ ] **Identity and ontology are closed.** The UUID, short code, canonical name,
      claim layer, family, exact profile, predecessor/successor relationships,
      and accepted adjudication agree.
- [ ] **Sources are real and checked.** Every cited external source exists and
      supports the specific narrow claim rather than only the general topic.
- [ ] **Source scope matches the claim.** Attestation, restrictions, competing
      analyses, and unresolved variation are recorded without transferring
      evidence from an umbrella, predecessor, retired record, or internal node.
- [ ] **Corpus hits are reviewed, not counted.** Every candidate used as evidence
      is classified as genuine, false positive, ambiguous, or unusable, and the
      totals account for the full candidate inventory.
- [ ] **A locked role-neutral native panel covers every critical contrast.** Every
      critical positive and negative item has at least 30 usable independently
      submitted adjudicated judgments from eligible respondents using the same
      locked clean instrument and inclusion criteria. No respondent receives
      special status or weight.
- [ ] **Negative and boundary cases are executable.** Every case the construction
      must not match is present in a passing parser test.
- [ ] **Implementation matches documentation exactly.** The runtime path has been
      compared line by line with the accepted canonical profile and status note.
- [ ] **Implementation and linguistic evidence are reported separately.** Parser,
      render, regression, and held-out results are not presented as source,
      corpus, or panel confidence.
- [ ] **Held-out validation passes.** A sealed prospective set was opened only
      after applicable source, boundary, ontology, code-document, and render
      blockers were closed.
- [ ] **The public description is plain.** It states what was checked, with which
      sources and instrument version, the usable judgment count for each critical
      item, the corpus classifications, and what remains uncertain.

If any item is unchecked, the construction remains `provisional` or lower,
regardless of internal render, regression, or held-out success.

## `provisional`

A construction may move to `provisional` only when:

- [ ] one checked external source supports the exact narrow claim;
- [ ] identity and claim layer are adjudicated sufficiently to exclude internal
      wrappers, aliases, and unrelated sibling profiles;
- [ ] every critical positive and negative item has at least 10 usable
      independently submitted adjudicated judgments from eligible respondents on
      one clean role-neutral instrument;
- [ ] the instrument has no unresolved defect capable of contaminating the
      relevant contrast;
- [ ] negative and boundary cases are drafted;
- [ ] the claim does not rest solely on generated probes, fixtures, render
      examples, corpus counts, or held-out cases.

Otherwise it remains `research_pending`, `unsupported_generalization`,
`lexicalized_only`, `parser_heuristic`, or is superseded or retired.

## Native-panel evidence rules

- Total submissions do not substitute for per-item coverage.
- Report numerator and denominator for every critical item and the minimum usable
  item-level sample size.
- Every eligible respondent uses the same instrument, inclusion criteria, quality
  rules, and evidentiary weight.
- A limited or contaminated pilot is diagnostic only.
- A locked live instrument is never edited in place; material changes create a
  new version whose responses are adjudicated separately.

## Splitting, superseding, and retiring

A true construction split is done only when:

- [ ] every successor has a new collision-checked UUID and, when canonicalized, a
      new permanent short code;
- [ ] predecessor/successor links are recorded;
- [ ] evidence is reassigned only where its exact scope matches the successor;
- [ ] the predecessor remains permanently resolvable;
- [ ] runtime aliases and status-note migrations are explicit rather than silent.

A dead label may retire only when:

- [ ] it serves no clear current or planned runtime, compatibility, diagnostic,
      research, or recovery purpose;
- [ ] its permanent identity, prior status, aliases, and reason are preserved;
- [ ] it is removed from the active runtime registry and current-note inventory;
- [ ] its UUID and code remain reserved forever.

## Release handoff

A version is ready for external audit only when:

- [ ] every identity, status, runtime, and generated-readiness change is included
      in one coherent passing repository state;
- [ ] every status change is justified against the relevant checklist;
- [ ] no earlier acceptance is grandfathered;
- [ ] each changed construction audit identifies UUID, code, canonical name,
      legacy runtime alias, exact code locations, verified sources, panel state,
      corpus review, tests, and unresolved questions;
- [ ] no release document describes a cleaner, broader, or stronger analysis than
      the runtime and accepted adjudication implement;
- [ ] current documentation contains no stale branch name, superseded work order,
      or historical claim presented as current policy;
- [ ] all required verification profiles pass without expected-failure commits or
      repair-bot follow-ups.

## Explicit non-criteria

None of the following makes a construction or release done by itself:

- parser, render, regression, or held-out success;
- one respondent's judgment;
- a large submission count without usable per-item coverage;
- a limited or defective instrument;
- an unclassified corpus hit count;
- an accepted name without matched source and runtime scope;
- a discovery score or candidate rank;
- a version increment;
- confidence wording without the underlying records.

## Guiding principle

The target is a small, honest, evidence-bearing grammar rather than a high
promotion count. Internal wrappers, aliases, diagnostics, and unsupported broad
labels must not compete as productive Cantonese constructions.
