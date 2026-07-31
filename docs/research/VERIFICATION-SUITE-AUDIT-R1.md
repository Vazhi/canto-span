# Verification suite audit R1

Date: 2026-07-31  
Issue: #399  
Work claim: #400

## Decision

Verification is reserved for recurring repository-integrity invariants. Coordination
procedure is mandatory under `AGENTS.md` and `docs/current/00-START-HERE.md`, but it is
not proved by parsing pull-request prose or live issue metadata and no longer runs as
a universal merge-blocking workflow.

## Audit method

Each permanent command and workflow was evaluated against the current five-part
admission standard: recurring invariant, meaningful impact, no duplicate coverage,
deterministic maintainability, and a clear single-sentence purpose. The audit also
checked whether routine verification modifies tracked files and whether a narrower
path-scoped workflow already protects the same state.

## Dispositions

| Check or workflow | Disposition | Reason |
|---|---|---|
| Runtime aggregate tests | Retain as `npm test` and in the path-scoped runtime workflow; remove from core profile | Parser behavior is high impact, but running it again inside every core-state sweep duplicates the runtime workflow. |
| Construction-note alignment | Retain in core | Prevents active runtime labels, current notes, and executable construction files from drifting apart. |
| Adjudication application check | Retain in core and identity workflow | Prevents canonical identity data from diverging from accepted immutable adjudications. |
| Construction identity verification | Retain; remove exact `181` historical-count assertion | UUID, code, alias, lifecycle, and lock invariants recur; a frozen historical count does not. |
| Discovery freshness | Retain in core and path-scoped discovery workflow | Prevents deterministic readiness outputs from becoming stale after canonical evidence inputs change. |
| Parked-construction verification | Retain; make read-only by default | Parking resolution is a recurring invariant, but ordinary verification must not write `validation/current/`. |
| Project-state verification | Retain in core | Protects the sole present-tense state snapshot against canonical derived values. |
| Documentation consistency | Retain structural and dynamic checks; remove exact policy-prose checks | Current links, sole authority, batch accounting, and setting synchronization are objective; exact sentences and forbidden phrases are brittle policy policing. |
| Research provenance | Retain in research profile and path-scoped workflow | Prevents malformed, missing, duplicated, or overclaimed source records. |
| Promotion rules | Retain only in release profile; make read-only by default | Promotion evidence gates are high impact but irrelevant to ordinary work. |
| Release handoff | Retain only in release profile; make read-only by default | Release publication requires coherent version, baseline, and handoff state, but ordinary verification must not generate reports. |
| `verify:coordination` | Remove | Coordination is an agent contract, not repository correctness state, and its tests need run only when coordination tooling changes. |
| Coordination meta-verifier | Remove | It required exact contract wording and the continued presence of its own workflow, violating anti-bloat and no-exact-prose rules. |
| Universal `Coordination claim` PR workflow | Remove | It blocked otherwise valid PRs on issue/claim/PR wording and live metadata rather than repository correctness. |
| Coordination libraries, schemas, and focused tests | Retain as optional task-specific tools | They remain useful for changeset mechanics and diagnostics without determining merge eligibility. |

## Workflow alignment after the audit

- Runtime source-first validation owns runtime build equality, parser tests, and the
generated-runtime smoke test on runtime-related paths.
- Construction identity owns identity and adjudication checks on identity-related
paths.
- Supported productive discovery owns deterministic readiness freshness on its inputs.
- Research provenance owns research-source integrity on research-related paths.
- Core, research, and release npm profiles remain locally runnable and task-scoped.
- No workflow validates coordination metadata on every PR.

## Read-only verification rule

`verify-parked-constructions.js`, `enforce-promotion-rules.js`, and
`verify-release-handoff.js` now print results without changing tracked files. A report
is written only when the caller supplies `--output <path>`. This eliminates the
`validation/current/` byproducts that contaminated unrelated work, including the
initial repair attempt for PR #395.

## Branch-protection note

Deleting a workflow does not necessarily remove a separately configured required
status-check name from GitHub rulesets. The connected repository tool does not expose
ruleset mutation. After this PR merges, remove `Coordination claim` from the required
status checks in repository Settings only if GitHub still lists it. This is a one-time
hosting configuration cleanup, not a repository verifier.

## Protected state

No parser behavior, construction identity, linguistic status, evidence decision,
corpus or survey content, runtime version, release decision, pickup ownership, or
merge authorization is changed by this audit.
