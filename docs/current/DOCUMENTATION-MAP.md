# Documentation authority map

Start with [`00-START-HERE.md`](00-START-HERE.md). It is the mandatory router for
current project work.

This file is an index, not a second policy layer. Authority is
responsibility-specific; there is no single global document ranking that can safely
resolve every conflict.

## Current owners by responsibility

| Responsibility | Canonical owner |
|---|---|
| Present-tense runtime/version, counts, survey/corpus state, agent availability, and work order | [`PROJECT-STATE.md`](PROJECT-STATE.md) |
| Cross-cutting entry/routing contract | [`00-START-HERE.md`](00-START-HERE.md) |
| Binding linguistic/parser principles | [`DOCTRINE.md`](DOCTRINE.md) |
| Evidence, linguistic status, survey/native-panel rules, promotion/disposition, and release governance | [`GOVERNANCE.md`](GOVERNANCE.md) |
| Promotion and completion thresholds | [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md) |
| Permanent construction identity | [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md) and canonical identity data |
| Accepted identity/ontology adjudication | [`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md) and accepted adjudication data |
| Construction-note schema/ownership | [`CONSTRUCTION-NOTES.md`](CONSTRUCTION-NOTES.md) |
| Task classification and pickup routing | [`CODEX-ISSUE-WORKFLOW.md`](CODEX-ISSUE-WORKFLOW.md) |
| Optional agent workflow availability | [`AGENT-WORKFLOW-SETTINGS.md`](AGENT-WORKFLOW-SETTINGS.md) and [`../../config/agent-workflow-settings.json`](../../config/agent-workflow-settings.json) |
| Concurrent semantic scope, claims, branches, and integration roles | [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md) plus live GitHub records |
| Merge authorization and safety stops | [`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md) |
| Parser tests, regression debt, verification profiles, and generated-output checks | [`TESTING.md`](TESTING.md) and executable tests/config |
| Runtime source and deterministic generated bundle | [`RUNTIME-MODULARIZATION.md`](RUNTIME-MODULARIZATION.md) |
| Git branch/PR workflow and local recovery/export rules | [`GIT-WORKFLOW.md`](GIT-WORKFLOW.md) |
| Corpus extraction/review tooling | [`../../tools/corpus-review/README.md`](../../tools/corpus-review/README.md) and the relevant checked-in profile/packet |
| NP subsystem contract | [`NOUN-PHRASE-SUBSYSTEM.md`](NOUN-PHRASE-SUBSYSTEM.md) |
| Pedagogical-corpus review contract | [`PEDAGOGICAL-CORPUS-REVIEW-CONTRACT.md`](PEDAGOGICAL-CORPUS-REVIEW-CONTRACT.md) |
| Recovery/resume procedure | [`../../HANDOFF.md`](../../HANDOFF.md) |

## Machine-readable and executable owners

Use these when prose is only summarizing state:

- construction identity: `data/construction-identities.json` plus the identity lock;
- accepted construction adjudication: `data/construction-adjudications.json` and
  immutable accepted batch records;
- construction availability: `data/parked-constructions.json`;
- agent availability: `config/agent-workflow-settings.json`;
- verification applicability: `config/verification-profiles.json`;
- runtime source: `src/**` and `src/runtime-resources/**`;
- generated runtime bundle: `main.js` (generated, never hand-edited);
- construction status/evidence: one current note under
  `grammar/<linguistic-status>/*.md`;
- standard construction tests: `tests/constructions/*.json`;
- NP matrix: `tests/fixtures/np-subsystem.json`;
- regression snapshots: `tests/fixtures/regression-snapshots.json`;
- active native-panel state/policy: the active versioned records named by
  `PROJECT-STATE.md`;
- live pickup/claim/PR ownership: the latest valid GitHub intake/claim/PR records.

## Compatibility pointer files

The following files are retained only so older links continue to resolve. They carry
no independent policy and point to [`GOVERNANCE.md`](GOVERNANCE.md):

- `STATUS-AND-CONFIDENCE.md`;
- `EVIDENCE-AND-PROVENANCE.md`;
- `NATIVE-SPEAKER-REVIEW.md`;
- `SURVEY-BATCHING.md`;
- `WORKFLOW.md`;
- `VALIDATION-AND-ACCEPTANCE.md`;
- `PROMOTION-GATE.md`.

Do not copy policy back out of these pointer files.

## Supporting and historical material

These may supply evidence, fixtures, provenance, or historical explanation, but they
are not current operating-policy owners by themselves:

- `docs/research/`;
- `review-packets/`;
- `external-evidence/`;
- `test-data/`;
- `tests/`;
- top-level `archive/`;
- closed issues and pull requests;
- Git history.

A current specialized record inside one of these areas may still own its narrow data
or evidence object when a canonical owner explicitly points to it. That does not make
the whole directory a policy layer.

## Conflict resolution

When two current statements disagree:

1. identify the exact responsibility or state dimension;
2. follow the owner table above;
3. use the narrowest canonical/machine-readable owner for that responsibility;
4. compare prose against runtime/data rather than treating summaries as independent
   truth;
5. update or remove stale contradictory current prose;
6. keep historical material as provenance only.

Important examples:

- runtime source/tests own current parser behavior; status notes do not;
- status notes and evidence records own linguistic status; parser success does not;
- `USER-MERGE-REVIEW.md` owns merge authorization; older per-PR approval language
  elsewhere is stale;
- `PROJECT-STATE.md` owns volatile counts/work order; copied counts elsewhere are
  non-authoritative;
- live intake/work-claim/PR records own current execution; old claims and handoffs do
  not preserve ownership.
