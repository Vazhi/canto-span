# Governance, evidence, surveys, and release workflow

This is the current operational policy. The controlling promotion thresholds are
in [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md); permanent identity and
adjudication rules are in [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md)
and [`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md).

## 1. State ownership

| State dimension | Canonical owner |
|---|---|
| UUID, code, canonical name, family, profile, claim layer | `data/construction-identities.json` plus accepted adjudications |
| Current linguistic status and note-local evidence | one note per active runtime label under `grammar/<status>/` |
| Runtime recognition | `main.js` and executable tests |
| Workflow activity | note frontmatter |
| Discovery readiness | `data/construction-candidate-readiness.json` |
| Historical provenance | research records, batch reports, retired ledgers, and Git history |

An adjudication recommendation is not a status migration. A status move is not a
runtime change. A passing test is not linguistic evidence. A generated readiness
score is not a promotion decision.

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

Workflow state is only `active` or `archived`; archived means parked, not retired.
Retired runtime labels remain permanent identity records and never release their
UUID or short code.

## 3. Evidence rules

Every language claim needs proposition-level source records with exact locators.
Classify each relationship as support, restriction, contradiction, competing
analysis, surface attestation, or background. Only verified scope-matched support
contributes to promotion.

Every corpus candidate used as evidence must be reviewed as genuine, false
positive, ambiguous, or unusable. Totals must account for the complete candidate
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
same instrument, instructions, eligibility screen, quality rules, and
adjudication criteria. No respondent receives a private evidentiary role or
special weight.

The evidence unit is one usable adjudicated judgment on one critical item. Record
total and eligible submissions, usable judgments per critical item, minimum item-
level coverage, instrument version and lock state, recruitment channel, assigned
counterbalanced list, quality-screen state, exclusions, and reasons.

### Instrument lifecycle

`research_question` → `source_narrowed` → `pilot_ready` → `pilot_collection` →
`instrument_audit` → `instrument_locked` → `collection` →
`mid_collection_audit` → `adjudicated` → `construction_disposition` → `closed`

Do not edit a live locked instrument. A material change to wording, context,
scale, fillers, branching, or randomization creates a new version.

A clean wave normally uses two or three compatible focal questions, 24–36 rated
items, 8–15 unrelated fillers or calibration items, fully labelled graded
responses, a genuine uncertainty option, counterbalancing, contexts for ellipsis,
interpretation questions for ambiguity, and optional correction/context fields.
Semantic absurdity is not a grammatical boundary.

Flag incomplete responses, failed eligibility, probable duplicates, implausibly
short completions, calibration anomalies, straight-lining, contradictory
responses, missing interpretation answers, identifying free text, version
mismatch, and list imbalance. A recorded manual adjudication decides inclusion.

Project thresholds:

- pilot: 5–10 usable judgments per item for instrument diagnosis only;
- `provisional`: at least 10 usable adjudicated judgments per critical positive
  and boundary item from one clean role-neutral instrument;
- `supported_productive`: at least 30 usable adjudicated judgments per critical
  item from a locked clean instrument, plus all non-panel requirements.

Legacy or defective instruments remain diagnostic evidence only.

## 5. Construction workflow

1. Select a bounded UUID-keyed linguistic question.
2. Verify sources and classify every corpus example used as evidence.
3. State the exact profile, competing analyses, positive cases, and boundaries.
4. Record or supersede the expert adjudication when identity or ontology changes.
5. Create a role-neutral instrument only after the claim and contrasts are source-
   narrowed and instrument-ready.
6. Compare the accepted profile with the actual runtime path line by line.
7. Implement only the narrow evidence-faithful change.
8. Update tests, status note, identity relationships, and generated discovery
   state in one coherent change.
9. Run the relevant verification profiles.
10. Report implementation results separately from linguistic confidence.
11. Accept, revise, quarantine, split, merge, supersede, or retire.

A true split requires new collision-checked UUIDs. A compatibility alias or
umbrella cannot donate evidence automatically to its successors.

## 6. Validation and dispositions

Evaluate separately:

1. linguistic support;
2. implementation correctness;
3. shared-subsystem correctness;
4. identity and ontology consistency.

Possible dispositions are ACCEPT, IMPLEMENTED INFRASTRUCTURE, REVISE,
QUARANTINE, SPLIT, MERGE, SUPERSEDE, and RETIRE. Success in one dimension cannot
substitute for another.

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

## 8. Documentation and automation discipline

Current policy must live under `docs/current/` and link to generated or historical
records instead of copying their conclusions. Dated batch reports and release
notes are immutable provenance, not current instructions.

GitHub Actions verification is read-only and uses Node 24-compatible action
releases. Do not use branch-specific writer workflows, expected-failure commits,
or bot commits that repair an intentionally incomplete earlier commit. Apply,
regenerate, and verify locally or in the working branch before publishing one
coherent state.
