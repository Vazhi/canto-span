# Canto Span — Definition of Done

This defines when a construction, and when a release, can be called done. It
applies to every construction and every version handed off for review.

## Definition of Done: `supported_productive`

A construction is eligible for `supported_productive` only when all of the
following are true:

- [ ] **Sources are real and checked.** Every cited external source has been
      verified to exist and to support the specific claim rather than only the
      general topic.
- [ ] **Corpus hits are reviewed, not counted.** Every corpus hit used as
      evidence has been individually classified as genuine, false positive,
      ambiguous, or unusable.
- [ ] **A locked role-neutral native panel covers every critical contrast.**
      Every critical positive and negative item has at least 30 usable,
      independently submitted, adjudicated judgments from eligible native
      Cantonese respondents using the same locked clean instrument and the same
      inclusion criteria. No respondent receives special status or weight.
- [ ] **Negative and boundary cases are executable.** Every case the
      construction must not match is present in a parser test and passes.
- [ ] **Implementation matches documentation exactly.** The runtime heuristic
      has been re-read against its claim line by line and every mismatch has
      been resolved.
- [ ] **Implementation validation and linguistic confidence are separate.**
      Release notes report parser/render/held-out results separately from
      source counts, minimum usable item-level panel size, corpus review, and
      unresolved linguistic questions.
- [ ] **The description is plain.** The public record says what was checked,
      with which sources and survey version, how many usable judgments each
      critical item received, and what remains uncertain.

If any item is unchecked, the construction stays at `provisional` or lower,
regardless of internal render, regression, or held-out success.

## Definition of Done: `provisional`

A construction may move from `unsupported_generalization` or
`research_pending` to `provisional` only when:

- [ ] At least one checked external source supports a narrow defensible claim.
- [ ] Every critical positive and negative item has at least 10 usable,
      independently submitted, adjudicated judgments from eligible native
      Cantonese respondents using one role-neutral clean instrument.
- [ ] The instrument has no unresolved defect capable of contaminating the
      relevant contrast.
- [ ] Negative and boundary cases are drafted, even if not all are executable.
- [ ] The claim is not resting solely on generated probes, fixtures, render
      examples, or held-out cases.

Otherwise it remains `research_pending`, `unsupported_generalization`, or is
retired.

## Native-panel evidence rules

- Total submissions do not substitute for per-item coverage.
- Report the numerator and denominator for every critical item and the minimum
  usable item-level sample size.
- The user's wife uses the same instrument and criteria as every other
  respondent and receives no special designation or weight.
- A limited or contaminated pilot remains useful diagnostic evidence but
  cannot satisfy either promotion threshold.
- A live locked instrument must not be edited in place. Material changes create
  a new survey version whose responses are adjudicated separately.

## Definition of Done: retiring a dead label

Every 10–20 versions, review constructions with zero fixtures, zero runtime
references, and no forward research progress. For each:

- [ ] Confirm that it serves no clear current or planned purpose.
- [ ] Preserve its name, prior status, and retirement reason in an archive.
- [ ] Remove it from the active grammar table.

A dormant label cannot remain indefinitely without retirement or explicit
re-justification.

## Definition of Done: release handoff

A version is ready for external audit only when:

- [ ] Every status change is justified against the relevant checklist.
- [ ] Any `supported_productive` construction not re-audited under the current
      standard is marked pending rather than grandfathered.
- [ ] Each changed construction's audit slice includes its plain-language
      claim, exact code locations, verifiable sources, survey instrument
      version, total and eligible panel responses, minimum usable judgments per
      critical item, quality/adjudication state, and unresolved questions.
- [ ] No release document describes a cleaner or stronger analysis than the
      runtime implements.

## Explicit non-criteria

These do not make a construction or release done by themselves:

- parser, render, held-out, or regression success;
- one named respondent's judgment;
- a large submission count without usable per-item coverage;
- judgments from a limited or defective instrument;
- an unclassified corpus hit count;
- a version increment;
- confidence wording without its underlying source, panel, corpus, and
  implementation record.

## Guiding principle

A small grammar with genuinely evidenced constructions is the target. A low
`supported_productive` count is expected and must not be raised by weakening
these requirements.
