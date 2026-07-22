# Governance, evidence, surveys, and release workflow

This document is the single current operational policy for construction status,
evidence, native-speaker surveys, implementation review, and release decisions.
The controlling completion thresholds remain in
[`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md).

## 1. Separate state dimensions

### Linguistic status

| Status | Meaning |
|---|---|
| `supported_productive` | The exact narrow claim satisfies every item in the Definition of Done. |
| `provisional_reaudit` | Earlier acceptance was withdrawn pending current-standard review. |
| `provisional` | A narrow claim meets the provisional checklist but not the productive checklist. |
| `research_pending` | A concrete research question exists, but provisional requirements are incomplete. |
| `unsupported_generalization` | The current claim has no defensible supported scope. |
| `lexicalized_only` | Only a bounded lexicalized inventory is retained. |
| `parser_heuristic` | Internal software representation, not a productive Cantonese claim. |

Implementation state, workflow state, and NP licensing are independent:

- implementation tests may be unimplemented, runtime-referenced, focused-pass,
  regression-pass, render-pass, or held-out-pass;
- workflow state is `active` or `archived`, where `archived` means parked rather
  than retired;
- NP licensing is `licensed_np`, `ambiguous_licensed_np`,
  `provisional_np_candidate`, or `invalid_or_incomplete_np`.

Only `licensed_np` and a consumer-safe `ambiguous_licensed_np` may feed an
evidence-gated construction. None of these implementation states raises
linguistic status by itself.

The canonical linguistic-status owner is one construction note per active
runtime label under [`../../grammar/`](../../grammar/), indexed by
[`../../GRAMMAR-INDEX.md`](../../GRAMMAR-INDEX.md). The runtime stores the
active label set, not a second linguistic-status registry.

## 2. Evidence rules

Every linguistic claim needs proposition-level source records with exact
locators. Classify each source relationship as positive support, restriction,
contradiction, competing analysis, surface attestation, or background. Only
verified, scope-matched support contributes to promotion.

Raw corpus counts are retrieval metadata. Every hit used as evidence must be
classified as genuine, false positive, ambiguous, or unusable, and the
classification totals must account for the candidate inventory.

Reprints, mirrors, copied examples, and shared datasets are not independent
source units. Lexical entries support token analysis but cannot establish a
complete productive phrase. Generated probes, parser output, fixtures, render
checks, regression suites, and held-out tests measure implementation rather
than Cantonese grammar.

Current evidence locations:

- construction notes: [`../../grammar/`](../../grammar/);
- source and research records: [`../research/`](../research/);
- active panel policy and state:
  [`../../review-packets/native-panel/active-v2/`](../../review-packets/native-panel/active-v2/);
- current provenance:
  [`../research/CURRENT-RESEARCH-PROVENANCE.md`](../research/CURRENT-RESEARCH-PROVENANCE.md);
- frozen historical registries and named-reviewer materials: `archive/` and
  `review-packets/native-speaker/active-v1/`.

Historical records remain provenance only and do not define current policy.

## 3. Native-panel and survey policy

All eligible respondents belong to one anonymized native-Cantonese panel and
use the same instrument, instructions, eligibility screen, and quality rules.
No respondent receives a private evidentiary role, special designation, or
additional weight.

The evidence unit is one usable adjudicated judgment on one critical item.
Record:

- total and eligible submissions;
- usable judgments for every critical item;
- minimum usable item-level coverage;
- instrument version and lock state;
- recruitment channel and assigned counterbalanced list;
- quality-screen and adjudication status;
- exclusions and reasons.

Total submissions do not substitute for per-item coverage.

### Instrument lifecycle

1. `research_question`
2. `source_narrowed`
3. `pilot_ready`
4. `pilot_collection`
5. `instrument_audit`
6. `instrument_locked`
7. `collection`
8. `mid_collection_audit`
9. `adjudicated`
10. `construction_disposition`
11. `closed`

Do not edit a live locked instrument in place. A material change to wording,
context, scale, fillers, branching, or randomization creates a new instrument
version.

### Instrument design

A clean public wave normally contains two or three compatible focal questions,
24–36 rated items, and 8–15 unrelated fillers or calibration items. Do not show
more than two consecutive items from one focal family. Counterbalance lexical
sets so one participant does not see every near-duplicate contrast, and store
actual presentation order.

A clean instrument includes:

- a fully labelled graded naturalness scale;
- a genuine uncertain or context-needed response;
- randomized or counterbalanced order;
- unrelated natural, degraded-but-interpretable, and context-dependent fillers;
- context for ellipsis-dependent items;
- interpretation questions for structurally ambiguous strings;
- separate semantic-plausibility diagnostics where needed;
- an optional correction or context field beside each item.

Do not use semantic absurdity as a grammatical boundary. Do not collapse
naturalness, interpretation, lexical choice, semantic plausibility, and context
dependence into one uninterpretable response.

### Screening and adjudication

Flag rather than automatically delete incomplete responses, failed eligibility,
probable duplicates, implausibly short completions, calibration anomalies,
straight-line responses, contradictory duplicates, missing interpretation
answers, identifying free text, version mismatch, and list imbalance. A recorded
manual decision determines inclusion.

After approximately ten usable responses per counterbalanced list, inspect
instrument performance without altering the live form. Close and version a
replacement when a defect materially contaminates a contrast.

### Thresholds

These are project governance thresholds, not universal statistical laws:

- pilot: 5–10 usable judgments per item for instrument diagnosis only;
- `provisional`: at least 10 usable adjudicated judgments per critical positive
  and boundary item from a clean role-neutral instrument;
- `supported_productive`: at least 30 usable adjudicated judgments per critical
  item from a locked clean instrument, plus every non-panel requirement in the
  Definition of Done.

Legacy PFV and RUL instruments remain historical or diagnostic evidence. They
do not satisfy current clean-instrument thresholds where design defects affect
the relevant contrasts.

## 4. Construction workflow

1. Select a bounded linguistic question.
2. Verify every cited source and classify every counted corpus example.
3. State the exact claim, competing analyses, boundaries, and negative cases.
4. Release a role-neutral survey only after the claim and critical contrasts
   are source-narrowed and instrument-ready.
5. Compare the documented claim with the actual heuristic line by line.
6. Implement only the narrow evidence-faithful change.
7. Update `tests/constructions/` and run `npm test`; run semantic, render, and
   prospective held-out checks separately when applicable.
8. Update the construction note's evidence, boundaries, implementation state,
   and current action.
9. Run the promotion and release gates only when the change requires them.
10. Report implementation results separately from linguistic confidence.
11. Accept, revise, quarantine, reject, or retire.

Shared parser subsystems are independent work units. Specify reusable rules,
typed fallback states, exclusions, ambiguity handling, unseen combinations,
and preservation tests before connecting consumers. Subsystem success does not
promote a consuming construction. The current NP boundary is documented in
[`NOUN-PHRASE-SUBSYSTEM.md`](NOUN-PHRASE-SUBSYSTEM.md).

Unknown or low-confidence NP recovery may be displayed as
`provisional_np_candidate`, but it cannot license an evidence-gated
construction. Preserve multiple analyses or an explicit ambiguity record when
attachment is unresolved.

Open a sealed held-out set only after applicable linguistic blockers,
code-document review, and render review are complete. Revealed cases become
ordinary regressions and cannot be reused as prospective evidence.

Every 10–20 semantic versions, review labels with zero fixtures, zero runtime
references, and no forward research progress. Retire labels with no clear
current or planned purpose while preserving their history.

## 5. Validation and dispositions

Evaluate three questions separately:

1. **Linguistic support:** Is the narrow construction justified by verified
   sources, reviewed examples, panel evidence, boundaries, and competing
   analyses?
2. **Implementation correctness:** Does the parser implement that claim without
   regressions or misleading learner output?
3. **Subsystem correctness:** Does shared structure generalize to unseen cases
   while unknown, incomplete, and ambiguous analyses remain safely typed?

Success on one question cannot substitute for another.

Possible dispositions:

- **ACCEPT** — the exact narrow claim passes linguistic and implementation
  requirements;
- **IMPLEMENTED INFRASTRUCTURE** — a shared subsystem passes its structural
  specification without promoting consumers;
- **REVISE** — useful work exists, but one or more requirements fail;
- **QUARANTINE** — retain for research or diagnostics while blocking productive
  licensing;
- **RETIRE** — remove a redundant, dormant, or indefensible label while
  preserving history.

## 6. Mechanical gates

`tools/enforce-promotion-rules.js` rejects `provisional` and
`supported_productive` records that fail the current Definition of Done. It does
not promote constructions. The current schema is
`promotion_gate_version: "v3"`.

```bash
node tools/test-promotion-gate.js
node tools/enforce-promotion-rules.js
node tools/test-release-handoff.js
node tools/verify-release-handoff.js
```

The promotion gate checks source verification, corpus classification, clean
role-neutral panel coverage, drafted or executable boundaries, exact test-count
agreement, current code-document reconciliation, and separate implementation
and linguistic reporting.

The release gate derives status changes from a checked-in construction-status
baseline under `data/release-baselines/` and requires an audit record for every
changed construction. The audit pins the baseline by SHA-256, so verification
does not depend on commit or tree objects from a particular clone. Non-promoted
statuses remain quarantined regardless of isolated evidence fields or
parser-test success.

Create the baseline for a future release from the clean current release before
changing any construction status:

```bash
npm run release:baseline -- <current-version>
```

Copy the printed path, digest, and runtime version into the next release audit.
