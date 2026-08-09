# Governance, evidence, surveys, and release workflow

This document owns evidence, linguistic status, native-panel and survey policy,
construction dispositions, and release discipline. Promotion thresholds are in
[`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md); identity and adjudication rules
are in [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md) and
[`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md).

Volatile counts and current work order belong only in
[`PROJECT-STATE.md`](PROJECT-STATE.md).

## 1. State ownership

| State dimension | Canonical owner |
|---|---|
| UUID and permanent code | `data/construction-identities.json` and the identity lock |
| Canonical name, family, profile, and claim layer | accepted UUID-keyed adjudications |
| Current linguistic status and note-local evidence | one note per active runtime label under `grammar/<status>/` |
| Runtime recognition | canonical `src/**` runtime modules and executable tests; generated `main.js` for deployment |
| Construction work availability | `data/parked-constructions.json`; unlisted current constructions are available |
| Agent workflow availability | `config/agent-workflow-settings.json` |
| Discovery readiness | `data/construction-candidate-readiness.json` and deterministic reports |
| Current pickup authority | latest valid ownership block in the canonical intake issue |
| Concurrent semantic scope | matching open work claim |
| Native-panel and survey evidence | active versioned review-packet records |
| Corpus candidates and decisions | construction-specific packet, workbench, and decision ledger |
| Merge authorization | `USER-MERGE-REVIEW.md` |
| Historical provenance | research records, immutable batch reports, retired records, archive, and Git history |

Construction availability and agent availability are independent. Parking a
construction does not disable an agent; disabling an agent does not park, retire,
reclassify, or change a construction.

An adjudication recommendation is not a status migration. A status move is not a
runtime change. A passing test is not linguistic evidence. A generated readiness
score is not a promotion decision. An intake or work claim is not project state.

## 2. Linguistic statuses

| Status | Meaning |
|---|---|
| `supported_productive` | The exact narrow claim satisfies every Definition-of-Done gate. |
| `provisional_reaudit` | Earlier acceptance has been withdrawn pending current-standard review. |
| `provisional` | The narrow claim satisfies provisional requirements only. |
| `research_pending` | A concrete linguistic question exists; provisional requirements remain incomplete. |
| `unsupported_generalization` | An existing broad claim lacks a defensible supported scope. |
| `lexicalized_only` | A bounded lexical inventory is retained without a productivity claim. |
| `parser_heuristic` | An internal software representation, not a productive Cantonese claim. |

A current construction is available for bounded work unless its permanent identity
appears in `data/parked-constructions.json`. Parking does not change linguistic
status, runtime behavior, evidence, or permanent identity. Retired records never
release their UUID or code.

Legacy grammar-note workflow fields are non-authoritative compatibility metadata.

## 3. Evidence rules

Every language claim requires proposition-level external source records with exact
locators, supported scope, restrictions, limitations, contradictions, and competing
analyses. Only verified scope-matched support contributes to promotion.

Attestation proves occurrence in its documented context. It does not establish
unrestricted productivity, frequency, dialect-wide naturalness, or the parser's
preferred analysis. Reprints, mirrors, copied examples, and one shared dataset are
not independent sources.

Lexical resources may establish token identity, pronunciation, broad category, and
lexical restrictions. Parser output, fixtures, generated probes, render checks,
regressions, discovery ranks, and held-out tests measure implementation or workflow
state only.

Publication attestation alone cannot overcome contradictory naturalness evidence.
Do not invent dialect, register, pragmatic, lexical, or contextual explanations to
resolve conflict. Require stronger source diversity, controlled contrasts, explicit
variation treatment, negative boundaries, competing analyses, role-neutral panel
evidence, and held-out validation before retaining disputed breadth.

Current evidence locations include:

- status notes under `grammar/`;
- identity and adjudication data under `data/`;
- source-linked research under `docs/research/`;
- native-panel records under `review-packets/native-panel/active-v2/`;
- corpus packets under `review-packets/corpus-review/` and `external-evidence/`;
- retired and superseded materials in immutable reports, archive, and Git history.

## 4. Corpus policy

Mechanical extraction and expert evidence review are separate stages.

Every extraction task must:

1. use an explicit checked-in source allowlist or frozen distribution manifest;
2. define one deterministic query and stable candidate-ID namespace;
3. preserve exact text and span, source location and hash, context, duplicate group,
   query provenance, and available token/POS/Jyutping and participant metadata;
4. retain high-recall competing analyses rather than silently filtering them by the
   desired construction;
5. render deterministic inventories and summaries;
6. mark candidates as requiring expert review;
7. change no evidence, readiness, status, identity, runtime, survey, or release state.

Every candidate used as evidence must later be classified as `genuine`,
`false_positive`, `ambiguous`, or `unusable`, with totals accounting for the complete
inventory. Candidate counts and POS mappings do not establish membership.

When generation requires local corpus access, the parent repository issue remains
with its existing agent owner. One bounded human-action issue may supply exact local
commands and expected outputs. Completing that step does not transfer repository
ownership, linguistic judgment, PR readiness, or merge authority.

## 5. Native-panel and survey policy

All eligible respondents form one anonymized native-Cantonese panel. They use the
same instrument, instructions, eligibility screen, quality rules, adjudication
criteria, and evidentiary weight. No named person, relationship, private reviewer,
expert title, or recruitment channel receives special status.

The evidence unit is one usable adjudicated judgment on one critical item. Record:

- total and eligible submissions;
- usable judgments per critical item and minimum item-level coverage;
- instrument version, lock state, and counterbalanced list;
- recruitment channel and eligibility screen;
- quality flags, probable duplicates, exclusions, and reasons;
- manual adjudication decisions;
- version mismatch and identifying free-text handling.

### Instrument lifecycle

`research_question` → `source_narrowed` → `pilot_ready` → `pilot_collection` →
`instrument_audit` → `instrument_locked` → `collection` →
`mid_collection_audit` → `adjudicated` → `construction_disposition` → `closed`

A pilot diagnoses instrument quality only. Do not edit a live locked instrument.
Material changes to wording, context, scale, fillers, branching, or randomization
create a new version whose responses are adjudicated separately.

A clean wave normally uses compatible focal questions, fully labelled graded
responses, a genuine uncertainty option, unrelated fillers or calibration items,
counterbalancing, contexts for ellipsis, interpretation questions for ambiguity,
and optional correction or context fields. Semantic absurdity is not a grammatical
boundary.

Promotion thresholds and every additional requirement are defined only in
`DEFINITION-OF-DONE.md`. Do not replace that checklist with a submission total or a
shortened rule elsewhere.

## 6. Work selection and substantive change

There is no active-note whitelist, repository-wide grammar freeze, or read-only
research lane. Agents may select any non-parked current construction when it is the
highest-benefit bounded task after considering learner value, evidence gaps,
ontology risk, implementation leverage, dependencies, active semantic claims, and
the cost of leaving the issue unresolved.

When a parked construction appears to be the best target, recommend unpark and state:

1. why the existing reason no longer controls;
2. the expected project benefit;
3. the changed evidence or dependency;
4. the bounded scope and safeguards.

The item remains parked until a reviewed change removes its blacklist entry.

One coherent claim may include source review, evidence recording, adjudication,
implementation, tests, and documentation when every affected state dimension and
gate is declared. Research findings alone still do not authorize promotion or
runtime broadening.

For substantive construction work:

1. select one bounded UUID-keyed question;
2. verify external sources and classify every corpus example used as evidence;
3. state the exact profile, competing analyses, positives, and boundaries;
4. record or supersede expert adjudication when identity or ontology changes;
5. create a role-neutral instrument only after the claim is source-narrowed and
   instrument-ready;
6. compare the accepted profile with runtime behavior line by line;
7. implement only the evidence-faithful scope;
8. update tests, status note, identity relationships, and generated state coherently;
9. run applicable verification profiles;
10. report implementation results separately from linguistic confidence;
11. disposition the work explicitly.

A true split requires new collision-checked UUIDs. A compatibility alias, umbrella,
retired record, or parser representation cannot donate evidence automatically.

## 7. Validation and dispositions

Evaluate separately:

1. linguistic support;
2. implementation correctness;
3. shared-subsystem correctness;
4. identity and ontology consistency;
5. panel and corpus evidence quality;
6. release and documentation consistency.

Possible dispositions include ACCEPT, IMPLEMENTED INFRASTRUCTURE, REVISE,
QUARANTINE, SPLIT, MERGE, SUPERSEDE, and RETIRE. Success in one dimension cannot
substitute for another.

Mechanical gates include:

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

Verification may reject an incomplete state but never promotes it automatically.

## 8. Documentation, coordination, automation, and releases

Current policy lives under `docs/current/`; `PROJECT-STATE.md` alone owns volatile
present-tense facts. Historical reports are immutable provenance. Entry documents
link to specialized owners instead of copying their conclusions.

Semantic claims govern concurrent work. Integrators reconcile integration-owned
files, regenerate deterministic outputs, make complete PRs ready, record the exact
reviewed head and validation, and then apply `USER-MERGE-REVIEW.md`: merge under
standing authorization when every live safety condition passes, and stop only when
that owner requires a safety stop.

Automation follows least privilege. A write-capable workflow requires an exclusive
claim covering the workflow and target, minimal permissions, checked preconditions,
branch-limited auditable writes, and no ability to write directly to `main`, expand
its own scope, adjudicate evidence, promote status, deploy surveys, publish releases,
or infer merge authority outside `USER-MERGE-REVIEW.md`. Automation may merge or
enable auto-merge only when that file supplies valid authority and every live safety
condition passes.

Release audits use reviewed SHA-256-pinned baselines under
`data/release-baselines/`. Runtime release packages remain minimal. Do not publish a
release whose documentation describes a cleaner, broader, stronger, or newer state
than canonical data and runtime implement.
