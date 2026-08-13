# Start here — mandatory project contract

Every human or automated agent must read this file before analyzing, editing,
generating, reviewing, assigning, or merging repository work. A prompt may narrow
scope, but it does not silently override a current canonical owner or a newer
accepted decision.

[`PROJECT-STATE.md`](PROJECT-STATE.md) is the sole present-tense project snapshot.
Volatile counts, milestones, survey and corpus state, agent availability, and work
order belong there and must not be copied into this durable contract.

Historical research, releases, adjudication reports, old issues, generated snapshots,
and Git history preserve provenance. They are not current instructions merely because
they are detailed.

## Canonical document hierarchy

Use the narrowest relevant owner and link to it instead of copying it.

| Responsibility | Canonical owner |
|---|---|
| Present-tense facts and work order | [`PROJECT-STATE.md`](PROJECT-STATE.md) |
| Cross-cutting operating contract | this file |
| Evidence, survey, status, disposition, and release governance | [`GOVERNANCE.md`](GOVERNANCE.md) |
| Promotion and completion thresholds | [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md) |
| Permanent identity | [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md) |
| Expert adjudication | [`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md) |
| Task classification and routing | [`CODEX-ISSUE-WORKFLOW.md`](CODEX-ISSUE-WORKFLOW.md) |
| Optional agent availability | [`AGENT-WORKFLOW-SETTINGS.md`](AGENT-WORKFLOW-SETTINGS.md) and [`../../config/agent-workflow-settings.json`](../../config/agent-workflow-settings.json) |
| Concurrent scope and integration roles | [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md) |
| Autonomous merge authority, standing authorization, and required safety stops | [`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md) |
| Parser and verification policy | [`TESTING.md`](TESTING.md) and executable tests |
| Runtime source, wired resources, and generated-bundle architecture | [`RUNTIME-MODULARIZATION.md`](RUNTIME-MODULARIZATION.md) |
| Corpus extraction and review | [`../../tools/corpus-review/README.md`](../../tools/corpus-review/README.md) |
| Recovery procedure | [`../../HANDOFF.md`](../../HANDOFF.md) |

For a conflict, the narrowest canonical owner wins. Reconcile contradictory current
text; do not preserve both versions as equal authority.

## State ownership

No registry owns every state dimension.

| State dimension | Canonical owner | Consequence |
|---|---|---|
| UUID and short code | identity registry and lock | Assigned identities never change or return to the pool. |
| Canonical ontology | accepted UUID-keyed adjudications | Names and profiles may change without silently changing runtime or status. |
| Linguistic status and note evidence | one current note under `grammar/<status>/` | A recommendation or passing test does not move status. |
| Parser behavior | canonical `src/**` runtime modules and executable tests | `main.js` is generated deployment output; tests establish implementation behavior only. |
| Construction availability | `data/parked-constructions.json` | Unlisted current constructions are available. |
| Agent availability | `config/agent-workflow-settings.json` | A disabled agent cannot be target, owner, or assignee. |
| Pickup authority | latest valid intake ownership block | Cached prompts, comments, labels, and assignments are not authority. |
| Concurrent scope | matching open work claim | Owner, revision, branch, and PR must agree. |
| Merge authorization | `USER-MERGE-REVIEW.md` | Passing checks never replace valid merge authority or live safety checks. |
| Discovery readiness | canonical readiness data | Rankings expose gaps; they do not promote or assign. |
| Panel evidence | active versioned review-packet records | Evidence is role-neutral and item-level. |
| Corpus candidates | extraction packet and decision ledger | Extraction is mechanical; classification is separate. |
| Historical provenance | research records, immutable reports, retired records, and Git history | History cannot override current state. |

Construction availability and agent availability are independent. Enabling an agent
does not unpark a construction, and parking a construction does not disable an agent.

## Mandatory repository workflow

Before the first edit:

1. confirm the repository is `Vazhi/canto-span`;
2. inspect current `main`, open PRs, intake issues, and work claims for overlap,
   ownership, dependencies, and generated outputs;
3. read `PROJECT-STATE.md` and the applicable specialized contracts;
4. classify the task under the routing contract;
5. apply the current agent setting before selecting a pickup target;
6. re-fetch the intake and verify owner, permission, ownership revision, claim,
   branch, and PR bindings;
7. create or update the smallest adequate semantic work claim;
8. create the exact `agent/<description>` branch named in the claim;
9. declare canonical inputs, generated outputs, protected state, dependencies,
   reserved decisions, and task-specific checks;
10. implement one coherent acceptable result under the applicable gates; when the base commit contains known regression debt, use the monotonic regression-debt ratchet in `TESTING.md` instead of requiring unrelated pre-existing failures to become green;
11. open or update one linked PR, then bind `active_pr` to the assigned GitHub PR
    number in the live intake;
12. keep the PR draft while work, dependencies, pending changesets, or integration
    remain unresolved;
13. when ready, record the pull-request number, exact head, scope, validation, risks,
    and limitations;
14. apply `USER-MERGE-REVIEW.md`: continue autonomously and merge under standing
    authority when live safety checks pass; stop only when that owner requires a
    safety stop;
15. keep promotion, deployment, release, and runtime broadening inside their own
    declared gates.

A live mismatch requires:

```text
routing result: unavailable
repository changes: none
```

## Non-negotiable standards

### Research and work selection

There is no read-only research role. Research, evidence recording, adjudication,
implementation, tests, documentation, and integration may be combined when one
coherent claim declares every affected state and gate.

There is no active-note whitelist or repository-wide grammar freeze. Any non-parked
current construction may receive bounded work when it offers the greatest expected
benefit and satisfies the applicable gates. Parking is workflow state, not linguistic
status or retirement; do not work on a parked construction silently.

New constructions, splits, broadenings, status transitions, and runtime changes still
require exact identity, external evidence, boundaries, tests, documentation, and
review.

When active work exposes missing lexical coverage needed for a stronger supported
example, clean contrast, coherent survey item, corpus analysis, or executable test,
treat that lexical gap as support work to complete in the same bounded task rather
than as a reason to weaken or defer the task. Follow the lexical-coverage rules and
exceptions in [`GOVERNANCE.md`](GOVERNANCE.md#lexical-coverage-during-active-work).

### Identity and evidence

Use `construction_code + canonical_name`; record legacy runtime labels separately.
Clarification or narrowing normally retains its UUID. A true split requires new
collision-checked UUIDs and explicit predecessor/successor links. Earlier accepted
batches remain immutable; corrections use later superseding records. Evidence never
passes automatically from an umbrella, predecessor, retired record, parser
representation, or sibling.

Every language claim begins with independently checkable external propositions and
exact locators. Attestation proves occurrence in context, not unrestricted
productivity, frequency, dialect-wide naturalness, or the parser's preferred
analysis. Parser output, tests, fixtures, rendering, regression success, discovery
rank, and usefulness have zero independent linguistic evidence weight.

Publication attestation alone does not override contradictory naturalness evidence.
Do not invent dialect, register, pragmatic, lexical, or contextual explanations.
Keep disputed breadth out of promotion and runtime broadening until sources,
contrasts, variation, negative boundaries, competing analyses, role-neutral evidence,
and held-out validation are reviewed.

### Parser, corpus, and panel integrity

Do not insert hidden arguments, connectives, semantic roles, or unsupported structure.
Preserve ambiguity, incomplete spans, lexical restrictions, and unknown material.
Internal wrappers, fallbacks, aliases, and diagnostics cannot license a linguistic
construction or broaden a supported subtype.

Corpus extraction uses a checked-in source boundary and preserves stable IDs, exact
text/span, source/hash/location, context, duplicates, query provenance, and available
participant/POS/Jyutping metadata. Mechanical high-recall extraction does not
classify membership. Evidence use requires complete review as `genuine`,
`false_positive`, `ambiguous`, or `unusable`.

When local corpus access is required, keep the parent task with its existing ChatGPT
owner and create one bounded human action for exact commands and artifacts. That step
transfers neither linguistic judgment, repository ownership, nor merge authority.

All eligible respondents belong to one anonymized role-neutral panel and use the same instrument, eligibility criteria, quality rules, and evidentiary weight. No named person, relationship, private reviewer, expert title, or recruitment channel receives special status.

A pilot diagnoses instrument quality and never promotes a construction. Material
edits to a live instrument require a new version.

### Documentation, claims, and automation

`PROJECT-STATE.md` is the only volatile snapshot. Prefer one canonical record and one
verifier per responsibility. Historical reports remain provenance and must not
describe current state.

Semantic work claims reserve semantic regions, not merely filenames. Shared claims
may touch one file only in disjoint regions. Repository-wide policy, schemas,
workflows, verification orchestration, and configured exclusive paths require an
exclusive claim. Files marked integration-owned require an integrator.

Temporary records under `changes/pending/` must not survive a ready-to-merge PR.
`validation/current/` contains optional verifier reports, not patch inputs. Routine
verification must not modify tracked validation reports.

Automation follows least privilege. Write-capable automation must be claim-scoped,
preconditioned, auditable, branch-limited, and unable to write directly to `main`,
expand scope, adjudicate evidence, promote status, deploy surveys, publish releases,
or infer merge authority outside `USER-MERGE-REVIEW.md`.

Passing checks, lack of conflict, elapsed time, assignment, or repository ownership
must be paired with valid merge authority and live safety checks before merge.

### Regression debt ratchet

Known failing tests are explicit implementation debt, not accepted parser behavior.
When the base commit already contains regression failures, permanent work is judged by
stable failing-case identities rather than by whether the entire inherited suite is
green. `TESTING.md` owns the exact gate, test-validity review, and comparison
procedure.

For unchanged tests whose validity remains accepted, the post-change failing set may
not contain a unique failure absent from baseline and a previously passing test may
not become failing. Protected or high-value behavior may not be weakened. A failure
may not be hidden merely to obtain acceptance by weakening a still-valid test,
broadening an expectation without independent justification, or suppressing
diagnostics.

Tests themselves remain reviewable. If preserving a passing test would require
reverting independently justified progress or retaining a stale, incorrect, overly
broad, or superseded expectation, review that test against the current behavioral
contract and evidence. A justified test may be modified, replaced, split, or removed,
with the decision and replacement coverage recorded. Such a test-contract change is
accounted separately and does not count as regression-debt reduction by itself.

Regression-directed changes must strictly reduce actual behavior debt on the
unchanged valid test set. Independently justified evidence-driven cleanup may leave
that failing set unchanged if it introduces no new valid-test failure. Regression
improvement never manufactures linguistic or lexical justification; those decisions
remain governed by their independent evidence owners. Remaining red cases stay
recorded as debt until separately repaired.

### Permanent verification admission

A permanent test, audit, verifier, CI gate, snapshot, or profile entry is allowed only
when it protects a recurring high-impact invariant, is not already covered, is
deterministic and maintainable, and has a one-sentence reason for existence.

One-time repair checks, migration guards, exact historical counts, exact packet or
survey contents, current response totals, construction-specific readiness scripts,
and temporary probes belong only to the work that needs them. Remove them before the
PR is ready unless they independently satisfy the permanent standard. Do not add a
new permanent check merely to preserve exact wording or prove that an old check was
removed. Verifier unit tests are run when that verifier changes, not on every PR.

## Verification

Run only the profiles relevant to the changed state:

```bash
npm test                # runtime or executable tests
npm run verify          # canonical core repository state
npm run verify:research # research provenance
npm run verify:release  # release or promotion work only
```

`npm run verify:all` is an explicit diagnostic sweep, not a routine acceptance
requirement. Individual adjudication, identity, or discovery commands may be run when
their own inputs change. Every permanent profile command records its reason and
`run_when` scope in `config/verification-profiles.json`.

When an applicable runtime suite contains recorded baseline debt, a nonzero global
exit result does not by itself reject a change. Record the exact base commit and
baseline failing identities, rerun the same scope after the change, and apply the
set-based ratchet in `TESTING.md`. Unrelated pre-existing failures remain debt; new
unique failures on unchanged valid tests remain blockers. If a test is independently
shown stale or incorrect, reconcile it through the test-validity review rather than
forcing valid progress to preserve the obsolete expectation.

Coordination is followed directly from `AGENTS.md`, this contract, and the live
repository records. It is not confirmed by `npm run verify` or by a universal PR
metadata check. Run `npm run test:coordination` only when coordination libraries,
schemas, or their focused behavior change.

A passing verifier never promotes a construction, grants merge authority by itself,
proves that an agent followed procedure, or justifies retaining an unnecessary check.

## Historical-material rule

Dated reports, retired ledgers, old prompts, closed issues, generated baselines, and
Git commits may be cited for provenance. They must not replace the current name,
claim layer, status, runtime description, survey state, agent availability, work
order, pickup owner, or merge authority.