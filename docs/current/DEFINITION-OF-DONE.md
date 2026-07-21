# Canto Span — Definition of Done

This defines when a construction, and when a release, can be called done. It applies to every construction in the grammar and every version handed off for review, regardless of how much internal process has already been run against it.

This document is binding current project authority. When another current document is less strict or ambiguous, this document controls.

## Definition of Done: `supported_productive`

A construction is DONE — eligible for `supported_productive` — only when ALL of the following are true:

- [ ] **Sources are real and checked.** Every cited external source (published grammar, dictionary, monograph, corpus) has been independently verified to exist and to actually support the specific claim being made — not just the general topic.
- [ ] **Corpus hits are reviewed, not counted.** Every corpus hit used as evidence has been individually inspected and classified as a genuine instance, false positive, ambiguous case, or unusable example. A raw `external_corpus_candidate_hit_count` with no classification does not count as evidence.
- [ ] **Two independent native speakers.** The same relevant positive and negative contrasts have been judged by at least two speakers who did not consult each other. A single speaker's judgments are recorded but do not satisfy this item on their own.
- [ ] **Negative/boundary cases exist as executable tests.** Every case the construction must NOT match is present as a test the parser actually runs — not only described in prose — and passes.
- [ ] **Implementation matches documentation exactly.** The runtime heuristic has been re-read against its own claim, line by line, in this review. Any mismatch is resolved (fix the document or fix the code) before this box is checked.
- [ ] **Implementation validation and linguistic confidence are reported separately.** The release notes state pass/fail on render and held-out tests as one line, and state the linguistic confidence (source count, speaker count, corpus review status) as a separate line. Neither is allowed to stand in for the other.
- [ ] **Description is in plain language.** The construction's public claim and evidence are stated in ordinary prose — what was checked, by whom, against what examples, what remains uncertain — without invented process vocabulary standing in for missing detail.

If any box is unchecked, the construction stays at `provisional` or lower, **regardless of whether it passed internal render/held-out tests.** Passing those tests is necessary but never sufficient.

## Definition of Done: `provisional`

A construction may move from `unsupported_generalization` / `research_pending` to `provisional` when:

- [ ] At least one real, checked external source supports a narrower, defensible version of the claim (narrow the claim if the evidence does not cover the broad version).
- [ ] At least one native speaker has judged the relevant positive and negative examples, and the record states plainly that only one speaker has been consulted.
- [ ] Negative/boundary cases are drafted, even if not yet all executable.
- [ ] The construction is not resting solely on generated probes, render examples, fixtures, or held-out cases — those do not count as independent natural attestation on their own.

Otherwise it stays quarantined: `research_pending` (real work in progress) or `unsupported_generalization` (no defensible narrower claim yet found), or is retired per the next section.

## Definition of Done: retiring a dead label

On a regular cadence (recommend every 10–20 versions), review every construction with zero fixtures, zero runtime references, and no forward research progress since the last review. For each:

- [ ] Confirm it still serves no clear purpose (not just “hasn't been touched recently” — check whether it is a placeholder for planned work).
- [ ] Move it to an archive record (name, prior status, reason for retirement) so historical provenance is not lost.
- [ ] Remove it from the active grammar table.

A label sitting at `quarantine_dormant_label_and_consider_retirement` for multiple review cycles without action is not done — it should be retired or explicitly re-justified as still active work.

## Definition of Done: a release / version handoff

A version is ready to hand off for external audit only when:

- [ ] Every status change in this release (new `provisional`, any promotion to `supported_productive`, any retirement) is justified against the relevant checklist above — not merely asserted.
- [ ] Any construction currently `supported_productive` that hasn't yet been re-audited under the current sourcing standard is explicitly marked as pending re-audit, not silently grandfathered in.
- [ ] The audit slice for this release lists, per changed construction: the plain-language claim, exact code location, sources with enough detail to verify, speaker count, and unresolved questions — per the existing handoff instructions.
- [ ] No release document describes a stronger or cleaner analysis than the parser code actually implements.

## Explicit non-criteria

These do NOT, by themselves, make a construction or a release done:

- Passing render checks, held-out cases, or regression suites alone.
- A single native speaker's acceptability judgments alone.
- A nonzero corpus hit count with no per-hit classification.
- A version number increment.
- Confidence-label language (`provisional`, `medium confidence`) without the underlying source count, speaker count, and corpus review it is supposed to summarize.

## Mechanical enforcement

Each construction note carries the machine-readable fields consumed by `tools/enforce-promotion-rules.js`. The authored status and the evidence fields must change in the same commit.

The gate is intentionally fail-closed:

- a missing field is a failure;
- an unknown status is a failure;
- `negative_tests_passing: true` without executable drafted boundaries is a failure;
- a `provisional` or `supported_productive` status with any unmet requirement is a failure;
- non-promoted statuses remain ineligible even when some individual evidence requirements happen to pass.

Run the focused rule tests and the project gate before accepting any status change:

```bash
node tools/test-promotion-gate.js
node tools/enforce-promotion-rules.js
```

## Guiding principle

A small grammar with a few genuinely well-evidenced constructions is the target — not a large table of confidently labeled but thinly supported ones. A low `supported_productive` count is an acceptable, expected state, not a problem to fix by loosening any of the above.

## Current application

- No earlier `supported_productive` or `provisional` classification is grandfathered.
- A formerly accepted construction remains `provisional_reaudit` while any current productive checklist item is unchecked; it does not count as supported.
- A formerly provisional construction returns to `research_pending` until the provisional checklist has been reverified.
- Research or documentation progress may be committed before a release is done, but it must not be described as a completed externally auditable release.
