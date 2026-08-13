---
title: Canto Span — Testing and Verification
status: current
tags: [canto-span/testing, canto-span/validation]
related: "[[DEFINITION-OF-DONE]]"
---

# Testing and verification

Testing establishes implementation and repository consistency. It does not by itself
establish a Cantonese construction, settle ontology, promote status, authorize a
survey, publish a release, or grant merge approval.

## Default principle

Run the smallest check set that covers the state changed by the task. Broad sweeps are
for diagnosis or release work, not a routine tax on every pull request.

For construction behavior, executable tests are downstream of the evidence-supported
behavioral contract defined in [`GOVERNANCE.md`](GOVERNANCE.md). The contract says
what the runtime is required to do within the currently justified scope; the test
suite makes those implementation expectations executable. A passing test proves
conformance to that expectation, not that the expectation is linguistically true.

A construction-level behavioral contract should cover the cases relevant to its
actual uncertainty and collision surface, including as applicable:

- clear positive cases and exact expected spans or roles;
- minimally different negative boundaries;
- ambiguity or context-dependent cases where the runtime must preserve uncertainty;
- lexical or selectional restrictions that are independently supported;
- collisions with neighboring constructions and shared subsystems;
- compositional cases where no dedicated construction node is justified;
- explicit unresolved cases where available evidence does not license a categorical
  accept/reject rule.

Do not invent a binary linguistic answer merely to obtain a red/green test. When a
boundary is unresolved, encode only the behavior that is justified—for example,
preserving ambiguity, avoiding an unsupported dedicated node, or preventing a broader
claim from inheriting the case—and record the unresolved linguistic question outside
the test as evidence state. Tests may also protect parser-internal invariants without
making a language-construction claim.

## Regression debt ratchet

A pre-existing non-green regression suite is explicit implementation debt; it is not a
blanket block on permanent improvements and it is not silently reclassified as correct
behavior.

For any change whose applicable test scope contains known failures, compare stable
failing-case identities rather than only raw failure counts. Let:

```text
B = failing-case set at the exact base commit
A = failing-case set after the proposed change
```

The primary invariant is:

```text
A ⊆ B
```

Therefore every post-change failure must already have been failing at baseline. In
addition:

- no previously passing case may become failing;
- no protected or high-value behavior may be weakened, especially common contemporary
  Cantonese behavior;
- a failure may not be hidden by deleting or weakening a test, broadening an expected
  result merely to accept more output, suppressing diagnostics, renaming a case so the
  identity comparison misses it, or otherwise changing measurement instead of
  behavior;
- the underlying repository change must remain independently justified. Regression
  improvement is implementation evidence only and cannot manufacture linguistic,
  lexical, evidentiary, identity, or status justification;
- every remaining failure stays explicitly recorded as regression debt rather than
  being treated as an accepted output simply because the ratchet allowed the change.

### Change classes

**Regression-directed changes** are intended to repair executable behavior. They are
acceptable only when the post-change failing set is a strict subset of baseline:

```text
A ⊂ B
```

At least one stable baseline failure identity must disappear. A merely subjective
claim that a failing case “improved” does not satisfy this gate unless that test has a
predefined deterministic graded metric whose improvement is itself an accepted
invariant.

**Evidence-driven cleanup** may be permanent when it is independently justified and
introduces no unique failure even if the failing-set size does not change:

```text
A ⊆ B
```

Examples include removing a demonstrably fake atomic lexical entry or correcting
repository data whose justification does not depend on the regression result. The
unchanged remaining failures are still debt.

### Baseline and comparison procedure

For debt-bearing scopes:

1. record the exact base commit and run the same applicable test command before the
   change;
2. record the baseline failing identities `B` and, where useful, the count;
3. run the same scope after the change and record `A`;
4. report `new_unique = A - B`, `fixed = B - A`, and the remaining failing set;
5. require `new_unique` to be empty;
6. for regression-directed work, require `fixed` to be non-empty;
7. if tests or expectations legitimately changed, separately account for added,
   removed, renamed, and expectation-modified cases so test maintenance cannot be
   mistaken for debt reduction;
8. record the remaining failures explicitly as inherited regression debt in the work
   claim or pull-request validation record and in the current-state owner when a
   repository-wide baseline is maintained there.

Raw red-count reduction is insufficient when one old failure disappears and one new
failure appears. Conversely, a nonzero global exit status caused solely by recorded
baseline debt does not invalidate a change that satisfies the ratchet and every other
applicable gate.

```bash
npm test                # runtime behavior or executable tests
npm run verify          # canonical core repository state
npm run verify:research # research provenance
npm run verify:runtime  # runtime tests, deterministic bundle equality, and bundle loading
npm run verify:release  # promotion or release work only
```

`npm run verify:all` is an explicit full diagnostic sweep across the core, research,
runtime, and release profiles. It includes the full runtime suite, deterministic
runtime-build verification, and generated-runtime loading. It is not a default
acceptance requirement and must not be added automatically to task instructions.

## Permanent-check admission standard

A permanent test, audit, verifier, workflow gate, snapshot, or profile entry may be
added only when all five conditions are satisfied:

1. **Recurring invariant:** the condition remains relevant across future work.
2. **Meaningful failure:** violating it could materially harm runtime behavior,
   identity, evidence integrity, coordination safety, current documentation, or a
   release.
3. **No duplicate coverage:** another existing check does not already catch the same
   failure.
4. **Maintainable determinism:** the result is reproducible and does not depend on
   current prose, transient counts, or an individual work packet.
5. **Clear purpose:** the reason for existence fits in one sentence.

Every entry in `config/verification-profiles.json` records both `reason` and
`run_when`. A check that cannot meet this standard must not be permanent.

Do not add permanent checks for:

- a completed migration or repair;
- one PR, construction, survey draft, corpus packet, or response snapshot;
- exact historical counts or file contents;
- temporary implementation probes;
- preserving exact documentation wording;
- proving that an obsolete check remains deleted;
- a hypothetical failure already covered elsewhere.

Temporary validation may be created inside bounded work when it is useful. Remove it
before the PR is ready unless it independently qualifies as permanent.

## Retained permanent profiles

### Core

| Check | Reason for existence | Run when |
|---|---|---|
| `construction-notes` | Keep current construction notes structurally aligned with runtime labels and test files. | Runtime labels, note paths/statuses, or construction-test metadata change. |
| `construction-adjudications` | Prevent accepted UUID-keyed adjudications from drifting from canonical records. | Identity or adjudication records change. |
| `construction-identities` | Protect permanent UUIDs, short codes, aliases, and lifecycle coverage. | Identity, adjudication, runtime-label, or source-path data change. |
| `discovery-freshness` | Detect stale deterministic readiness outputs after canonical inputs change. | Identity, evidence, status, corpus, panel, test, or readiness inputs change. |
| `parked-constructions` | Ensure parked entries resolve and unlisted constructions remain available. | Parking or identity data change. |
| `project-state` | Keep the sole current snapshot synchronized with canonical counts. | Canonical state or `PROJECT-STATE.md` changes. |
| `documentation` | Prevent broken current-document links and competing current authority. | Current documentation, authority settings, or canonical state change. |

### Research

| Check | Reason for existence | Run when |
|---|---|---|
| `research-provenance` | Prevent missing, duplicate, malformed, or overclaimed research provenance records. | Research packages, source ledgers, evidence grades, or provenance configuration change. |

Panel, survey, corpus-review, and construction-specific validation is performed by
the workflow that creates or updates those materials. It is not permanently rerun
after that phase closes unless the material remains a current lifecycle owner,
accepted gate-bearing aggregate, or other recurring canonical invariant that
independently satisfies the permanent-check admission standard.

### Runtime

| Check | Reason for existence | Run when |
|---|---|---|
| `runtime-build` | Detect stale or nondeterministic committed runtime bundles relative to canonical runtime source. | Runtime source, runtime resources, build tooling, package metadata, or committed `main.js` changes. |
| `runtime-tests` | Protect parser behavior and executable construction expectations across the canonical runtime test suite. | Runtime source, runtime resources, executable fixtures, lexicon data, or runtime tests change. |
| `generated-runtime` | Ensure the committed deployment bundle remains loadable and self-contained in the supported host contract. | Runtime source, build tooling, package metadata, generated-bundle tests, or committed `main.js` changes. |

The runtime profile is directly runnable with `npm run verify:runtime`. It is included
in `verify:all` but remains separate from ordinary core or research verification.
When `runtime-tests` contains recorded baseline debt, interpret that component through
the regression-debt ratchet above; deterministic build or load failures that were not
part of the recorded baseline remain ordinary blockers.

### Release

| Check | Reason for existence | Run when |
|---|---|---|
| `promotion-rules` | Block linguistic status promotion unless permanent evidence gates are satisfied. | A promotion or status transition is proposed. |
| `release-handoff` | Block release publication when version, package, or handoff invariants are incomplete. | Preparing or changing a release. |

Release checks are not part of ordinary core or research work.

## Workflow alignment

Permanent GitHub workflows run only for the state they protect:

| Workflow | Triggered scope | Command |
|---|---|---|
| Runtime source-first validation | runtime source, generated runtime, build tooling, runtime profile ownership, or executable tests | `verify:runtime` |
| Full diagnostic verification | verification profile manifest, profile runner, package scripts, its own workflow, or manual dispatch | `verify:all -- --keep-going` |
| Construction identity | identity, adjudication, identity tooling, or current grammar notes | adjudication and identity checks |
| Supported productive discovery | readiness inputs and deterministic discovery outputs | `verify:discovery` equivalent |
| Research provenance | research packages, evidence configuration, or research notes | `verify:research` |

The full diagnostic workflow is path-scoped to verification orchestration changes and
manual dispatch. It does not run on every pull request. Core verification intentionally
excludes `npm test`; runtime behavior already has a path-scoped workflow and remains
directly runnable through `npm test` or the runtime profile. No workflow runs
coordination metadata checks on every pull request.

## Verifier unit tests

Unit tests for a verifier or coordination library may remain when they exercise
reusable logic. Run them when that implementation changes. They are not listed in the
routine profiles merely to test the test on every unrelated PR.

Examples:

```bash
node --test tests/tooling/project-state/project-state.test.js
node tools/test-research-provenance.js
node tools/test-promotion-gate.js
node tools/test-release-handoff.js
npm run test:coordination
```

These commands are task-specific. Their existence does not make them mandatory for
unrelated runtime, documentation, research, or corpus work.

## Parser tests

```bash
npm test
```

The aggregate suite runs regression, NP-subsystem, per-construction executable cases,
and accepted lexicon regression checks. It builds `src/plugin-entry.js` in memory from
the canonical source tree and executes that build under an Obsidian stub. It does not
read committed `main.js`. Those tests protect runtime behavior and executable
behavioral contracts; implementation probes carry no independent linguistic evidence
weight.

A focused test suite is not complete merely because its intended positives pass.
Where the accepted behavioral contract identifies boundaries or collisions, the
suite must protect those too. Conversely, a test must not manufacture a linguistic
boundary that the evidence contract deliberately leaves unresolved.

When the aggregate suite has inherited failures, do not convert them to passing by
weakening expectations and do not demand that unrelated work repair all of them.
Capture stable failing identities at the base commit and apply the ratchet above.

`npm test` preserves the pre-run contents of its legacy report files and restores them
before exiting, so a normal passing run does not dirty the working tree.

The generated deployment artifact has separate checks:

```bash
npm run build:runtime          # regenerate main.js from canonical source
npm run verify:runtime-build   # deterministic build and committed-byte equality
npm run test:generated-runtime # load/self-containment smoke test
```

`npm run verify:runtime` runs `verify:runtime-build`, the full runtime test suite, and
the generated-runtime smoke test as one diagnostic profile.

`main.js` is generated output and must not be edited directly. Unrelated research,
corpus, survey, governance, and documentation work must not regenerate it.

## Identity and deterministic outputs

Run individual commands when their inputs change:

```bash
npm run verify:adjudications
npm run verify:identities
npm run verify:discovery
```

Write mode remains explicit:

```bash
npm run adjudication:apply
npm run identity:generate
npm run discovery:generate
```

Apply and regenerate before publishing a coherent PR. Do not publish a state that
introduces a new failure or violates another applicable gate. Known inherited runtime
failures may remain only when the recorded regression-debt comparison satisfies the
ratchet above.

## Coordination tools

Coordination is governed by `AGENTS.md`, `00-START-HERE.md`, and truthful live
repository records. It is not a verification profile and there is no universal PR
metadata workflow. Agents are responsible for checking ownership, overlap, claim
scope, branch, and PR state before editing and before presenting work for review.

Reusable coordination libraries, schemas, and focused tests remain available for
changes to those tools:

```bash
npm run test:coordination
```

That command is task-specific. It does not run on unrelated pull requests and does
not establish merge eligibility. Merge authority remains separate and is owned by
[`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md); coordination diagnostics never grant
it.

## Reports and generated output

Routine verification prints results and does not write a profile summary. Tools that
support reports accept an explicit output path, for example:

```bash
node tools/verify-current-state.js --profile core --output /tmp/core-verification.json
node tools/verify-current-state.js --profile runtime --output /tmp/runtime-verification.json
node tools/verify-research-provenance.js --output /tmp/research-provenance.json
node tools/verify-parked-constructions.js --output /tmp/parked-constructions.json
node tools/enforce-promotion-rules.js --output /tmp/promotion-gate.json
node tools/verify-release-handoff.js --output /tmp/release-handoff.json
```

`validation/current/` is not a patch input or mandatory report archive. A ready PR
must not include regenerated verification byproducts unless the user explicitly asks
for a retained report and the file has a continuing purpose outside the test run.

Permanent evidence belongs in canonical notes, ledgers, adjudications, fixtures,
research records, review decisions, or release records—not in a fresh validation
snapshot created each time a command runs.

## Updating verification

When adding or changing a check:

1. State the recurring invariant and meaningful failure in one sentence.
2. Search for existing coverage before creating anything new.
3. Prefer extending one canonical verifier over adding a parallel audit.
4. Keep exact work-package validation temporary.
5. Run the affected verifier's own unit tests.
6. Run only the profile that consumes the verifier.
7. Remove temporary scripts, probes, reports, and migration assertions before ready
   state.
8. Do not add a meta-test whose only purpose is preventing future pruning.

Passing checks never replace expert evidence review or the live merge-authority and
safety checks required by [`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md).