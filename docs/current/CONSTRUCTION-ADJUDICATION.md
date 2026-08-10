# Construction adjudication

## Purpose

Expert adjudication records current naming and ontology decisions separately from
mutable runtime labels, status-note placement, and generated discovery scores.
Every decision is keyed by immutable `construction_uuid` and checked against its
permanent short code and legacy runtime label.

Adjudication is behavior-first. It does not begin by assuming that an inherited
runtime label, filename, family, or previous technical name identifies one coherent
linguistic construction. Independently supported behavior determines the bounded
claim; the claim determines the canonical name and ontology. Audited runtime behavior
is essential implementation evidence for comparing the software with that claim, but
it has zero independent linguistic-evidence weight.

## Canonical records

The initial accepted decisions are stored in:

```text
data/construction-adjudications.json
```

Later immutable batches are stored in filename order under:

```text
data/construction-adjudication-batches/*.json
```

Earlier accepted batches are never rewritten. A correction is a later
superseding decision with explicit rationale and relationships.

Volatile adjudication counts, the latest completed batch, and current work order
belong only in [`PROJECT-STATE.md`](PROJECT-STATE.md). Do not copy those values into
this durable contract; the accepted UUID-keyed records and immutable batch files are
the canonical decision history.

## Behavior-first adjudication

A current UUID or short code is a continuity pointer, not a requirement to preserve
its inherited analysis. During adjudication:

1. identify the observable behavior or mismatch under review;
2. establish the independently supported linguistic scope, restrictions, competing
   analyses, and unresolved boundaries;
3. audit what the current runtime actually recognizes, spans, groups, omits, and
   collides with;
4. define the narrow behavioral claim supported by the evidence;
5. decide whether the existing identity is the same behavior clarified or narrowed,
   a genuinely distinct split, a compositional pattern, a lexicalized inventory, or
   a parser representation;
6. only then approve the canonical name, family/profile placement, and claim layer.

Do not broaden a claim to make an inherited label internally coherent. If several
unrelated mechanisms happen to share one runtime wrapper, adjudicate the mechanisms
rather than inventing one umbrella linguistic construction. Conversely, multiple
runtime paths may be aligned to one construction only when the evidence supports one
shared behavioral identity.

Canonical names are downstream descriptions of the accepted claim. Prefer observable,
form-based, theory-neutral wording when the evidence does not settle a stronger
analysis. A provisional investigation may continue under UUID/code reference without
forcing an early final name.

## Trigger-based reevaluation

The improved audit architecture does not automatically reopen every accepted
adjudication. Earlier decisions remain valid provenance until a concrete trigger
justifies reevaluation. Triggers include:

- audited runtime behavior materially differs from the recorded profile;
- one label combines multiple materially different behaviors;
- a supposed construction is better explained compositionally or as parser
  infrastructure;
- executable positive coverage is materially narrower than the recorded claim;
- negative or collision cases expose an unrecorded restriction;
- independent research, reviewed corpus evidence, or role-neutral native judgments
  contradict the recorded boundary;
- the canonical name encodes a theoretical or functional claim stronger than the
  evidence supports.

A triggered review may confirm the earlier decision. If it changes the decision,
record a later superseding adjudication; do not rewrite the historical batch. Lack of
a trigger is not a reason for a repository-wide reaudit.

## Required decision fields

Each completed decision records:

- UUID, permanent code, and legacy runtime label;
- approved canonical name;
- claim layer;
- family, exact profile, and structural description;
- behavior–research alignment;
- terminology alignment;
- recommended disposition and status-migration recommendation;
- exact source, audited runtime, and test basis, with their evidentiary roles kept
  separate;
- source terminology and scope relationship;
- former names and proposed successor profiles where applicable;
- rationale and unresolved blockers.

## Identity rules

- Adjudication never changes UUID or assigned short code.
- A behavior-preserving clarification, narrowing, or rename normally retains the
  UUID.
- A true construction split creates new UUIDs and predecessor/successor links.
- Evidence is not transferred automatically to a successor.
- A wrapper without independent language-construction status may be reclassified
  as `parser_representation` while preserving its history and runtime alias.
- Learner labels remain presentation-only.

## Atomic application workflow

Do not commit a raw batch and allow verification to fail before generated records
are refreshed. Apply, regenerate, verify, and commit one coherent state:

```bash
npm run adjudication:apply
npm run identity:generate
npm run discovery:generate
npm run verify:adjudications
npm run verify:identities
npm run verify:discovery
npm run verify
npm run verify:research
```

The accepted batch, regenerated identities, label sweep, candidate-readiness
registry, generated reports, and any affected current documentation belong in the
same pull request state.

GitHub Actions is read-only verification. Branch-specific automatic writers are
not part of the current workflow and must not be restored.

## Relationship to runtime and status

An accepted adjudication may supersede an older technical name or claim-layer
analysis while the legacy runtime label and status-note path remain unchanged for
compatibility. Such a boundary must be explicit in current documentation.

Runtime-label migration, status-path migration, matcher changes, fixture changes,
new UUID allocation, and retirement are separate scoped actions. None occurs
silently merely because adjudication is complete.

Executable tests derived from an accepted behavioral contract establish whether the
runtime implements that contract; they do not establish the linguistic truth of the
contract or replace its independent evidence.

## Relationship to discovery

Completed ontology review can remove internal or composite records from direct
linguistic promotion and can expose narrow successor work. It does not satisfy
source-scope, runtime-alignment, corpus, panel, held-out, or promotion gates.
Candidate scores remain planning aids only.
