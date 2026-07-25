# Governance, evidence, surveys, and release workflow

This is the current operational policy. Promotion thresholds are in
[`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md); permanent identity and
adjudication rules are in [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md)
and [`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md).

## 1. State ownership

| State dimension | Canonical owner |
|---|---|
| UUID, code, canonical name, family, profile, claim layer | `data/construction-identities.json` plus accepted adjudications |
| Current linguistic status and note-local evidence | one note per active runtime label under `grammar/<status>/` |
| Runtime recognition | `main.js` and executable tests |
| Workflow availability | `data/parked-constructions.json`; every unlisted current construction is available |
| Discovery readiness | `data/construction-candidate-readiness.json` |
| Concurrent work intent | open semantic work-claim issues |
| Historical provenance | research records, batch reports, retired ledgers, and Git history |

An adjudication recommendation is not a status migration. A status move is not a
runtime change. A passing test is not linguistic evidence. A generated readiness
score is not a promotion decision. A work claim is not project state.

## 2. Linguistic statuses

| Status | Meaning |
|---|---|
| `supported_productive` | Exact narrow claim satisfies every Definition-of-Done gate. |
| `provisional_reaudit` | Earlier acceptance withdrawn pending current-standard review. |
| `provisional` | Narrow claim satisfies provisional requirements only. |
| `research_pending` | Concrete linguistic question exists; provisional requirements incomplete. |
| `unsupported_generalization` | Existing broad claim lacks a defensible supported scope. |
| `lexicalized_only` | Bounded lexical inventory retained without productivity claim. |
| `parser_heuristic` | Internal software representation, not a productive Cantonese claim. |

Workflow availability is blacklist-based. A current construction is available
unless its permanent identity appears in `data/parked-constructions.json`.
Parking does not retire a construction, change linguistic status, alter runtime
behavior, or erase evidence. Retired labels never release their UUID or short code.

Legacy `workflow_state`, `workflow_priority`, `workflow_since`, and
`workflow_reason` note fields are non-authoritative compatibility metadata.

## 3. Evidence rules

Every language claim needs proposition-level source records with exact locators.
Classify each relationship as support, restriction, contradiction, competing
analysis, surface attestation, or background. Only verified scope-matched support
contributes to promotion.

Every corpus candidate used as evidence must be reviewed as genuine, false
positive, ambiguous, or unusable. Totals account for the complete candidate
inventory. Reprints, mirrors, copied examples, and shared datasets are not
independent sources.

Lexical entries may establish token identity, pronunciation, broad category, and
lexical restrictions. Parser output, fixtures, probes, render checks, regressions,
and held-out tests measure implementation only.

Current evidence locations:

- status notes: `grammar/`;
- permanent identity and adjudication: `data/construction-identities.json` and
  `data/construction-adjudication-batches/`;
- research: `docs/research/`;
- active panel policy: `review-packets/native-panel/active-v2/`;
- retired and superseded materials: retired ledgers, `archive/`, and Git history.

## 4. Native-panel and survey policy

All eligible respondents form one anonymized native-Cantonese panel. They use the
same instrument, instructions, eligibility screen, quality rules, and adjudication
criteria. No respondent receives a private evidentiary role or special weight.

The evidence unit is one usable adjudicated judgment on one critical item. Record
total and eligible submissions, usable judgments per critical item, minimum item-
level coverage, instrument version and lock state, recruitment channel, assigned
counterbalanced list, quality-screen state, exclusions, and reasons.

### Instrument lifecycle

`research_question` → `source_narrowed` → `pilot_ready` → `pilot_collection` →
`instrument_audit` → `instrument_locked` → `collection` →
`mid_collection_audit` → `adjudicated` → `construction_disposition` → `closed`

Do not edit a live locked instrument. A material change to wording, context, scale,
fillers, branching, or randomization creates a new version.

A clean wave normally uses two or three compatible focal questions, 24–36 rated
items, 8–15 unrelated fillers or calibration items, fully labelled graded
responses, a genuine uncertainty option, counterbalancing, contexts for ellipsis,
interpretation questions for ambiguity, and optional correction/context fields.
Semantic absurdity is not a grammatical boundary.

Flag incomplete responses, failed eligibility, probable duplicates, implausibly
short completions, calibration anomalies, straight-lining, contradictory responses,
missing interpretation answers, identifying free text, version mismatch, and list
imbalance. A recorded manual adjudication decides inclusion.

Project thresholds:

- pilot: 5–10 usable judgments per item for instrument diagnosis only;
- `provisional`: at least 10 usable adjudicated judgments per critical positive and
  boundary item from one clean role-neutral instrument;
- `supported_productive`: at least 30 usable adjudicated judgments per critical
  item from a locked clean instrument, plus all non-panel requirements.

Legacy or defective instruments remain diagnostic evidence only.

## 5. Work selection, research, and implementation

There is no active-note whitelist, repository-wide grammar freeze, or read-only
research lane. Agents may select any non-parked current construction when it is the
most beneficial bounded task. Selection considers learner value, evidence gaps,
ontology risk, implementation leverage, dependencies, open semantic claims, and the
cost of leaving the issue unresolved.

Research is not required to stop at a handoff boundary. One coherent claim may
include source review, evidence recording, adjudication, runtime implementation,
tests, and documentation when all affected state dimensions are declared and every
applicable gate is met. Research findings alone still do not authorize promotion or
runtime broadening.

When a parked construction appears to be the best target, the agent must recommend
unpark and state:

1. why the existing parking reason no longer controls;
2. the expected project benefit;
3. the evidence, dependency, or implementation change that justifies review;
4. the proposed bounded scope and safeguards.

The construction remains parked until a reviewed change removes its entry from
`data/parked-constructions.json`.

For substantive construction work:

1. Select a bounded UUID-keyed linguistic question.
2. Verify sources and classify every corpus example used as evidence.
3. State the exact profile, competing analyses, positive cases, and boundaries.
4. Record or supersede expert adjudication when identity or ontology changes.
5. Create a role-neutral instrument only after the claim and contrasts are source-
   narrowed and instrument-ready.
6. Compare the accepted profile with the actual runtime path line by line.
7. Implement only the narrow evidence-faithful change.
8. Update tests, status note, identity relationships, and generated discovery state
   in one coherent branch or integration step.
9. Run the relevant verification profiles.
10. Report implementation results separately from linguistic confidence.
11. Accept, revise, quarantine, split, merge, supersede, or retire.

A true split requires new collision-checked UUIDs. A compatibility alias or umbrella
cannot donate evidence automatically to successors. New grammar, broadenings,
splits, and runtime changes remain subject to all identity, evidence, boundary,
status, documentation, and verification gates.

## 6. Validation and dispositions

Evaluate separately:

1. linguistic support;
2. implementation correctness;
3. shared-subsystem correctness;
4. identity and ontology consistency.

Possible dispositions are ACCEPT, IMPLEMENTED INFRASTRUCTURE, REVISE, QUARANTINE,
SPLIT, MERGE, SUPERSEDE, and RETIRE. Success in one dimension cannot substitute for
another.

## 7. Mechanical gates

```bash
npm test
npm run verify:adjudications
npm run verify:identities
npm run verify:discovery
npm run verify
npm run verify:research
npm run verify:release
npm run verify:all
```

The promotion gate rejects incomplete `provisional` or `supported_productive`
records; it never promotes them. The release gate derives status changes from a
reviewed SHA-256-pinned baseline under `data/release-baselines/` and requires an
audit for every status change.

Create a future release baseline from the clean current release before changing
status:

```bash
npm run release:baseline -- <current-version>
```

## 8. Documentation, coordination, and automation discipline

Current policy lives under `docs/current/` and links to generated or historical
records instead of copying their conclusions. Dated batch reports and release notes
are immutable provenance, not current instructions.

Semantic claims govern concurrent work. Workers may research and implement ordinary
claimed scope. Integrators reconcile integration-owned files, mark complete PRs
ready, and merge passing work in dependency order. Routine merge management does
not require a separate per-PR user request once delegated to the integrator.

Automation follows least privilege rather than a blanket read-only rule:

- validation-only workflows remain read-only because they need no writes;
- write-capable automation requires an exclusive active claim covering the workflow
  and every target;
- permissions are explicit and minimal;
- writes are limited to the claimed non-`main` branch or issue/PR metadata;
- base, head, claim, target, and operation preconditions are checked;
- every write is auditable;
- automation cannot write directly to `main`, expand its own scope, adjudicate
  linguistic evidence, promote status, deploy surveys, or publish releases without
  separately authorized scope and gates.

Do not use expected-failure commits or repair automation to complete an intentionally
incoherent earlier state. Apply, regenerate, and verify one coherent result before
ready state.