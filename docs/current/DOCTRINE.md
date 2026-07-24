# Canonical doctrine

## Goal

Build a broad, accurate, maintainable learner-facing Cantonese parser grounded in
independently verified sources and natural usage. Linguistic accuracy and learner
safety outrank parser neatness, label count, release speed, fixture stability,
implementation convenience, and source prestige.

## Separate state dimensions

Never collapse these into one registry or one confidence score:

1. **Permanent identity** — immutable UUID and short code.
2. **Current ontology** — canonical name, family, profile, and claim layer.
3. **Linguistic status** — current evidence class owned by the status note.
4. **Runtime behavior** — what code and executable tests actually recognize.
5. **Workflow state** — active or parked work.
6. **Discovery readiness** — which hard promotion gates are complete.
7. **Learner presentation** — simplified labels and explanations.

The authority order is defined in [`00-START-HERE.md`](00-START-HERE.md).

## Claim classes

Every consequential parser statement must be classified as one of:

- Cantonese language construction;
- bounded lexicalized-language claim;
- shared parser subsystem rule;
- parser representation;
- compatibility alias or diagnostic state;
- parser heuristic;
- evidence gap, quarantine, supersession, or retirement record.

Language and lexicalized-language claims require external evidence. Shared
subsystem rules require pattern-level grounding, explicit scope, unseen-
combination tests, and safeguards against converting fallbacks into language
claims. Internal representations, aliases, diagnostics, and heuristics are not
linguistic evidence and cannot enter direct promotion discovery.

## Source-origin rule

A new or promoted language claim must begin with independently checkable external
propositions, not parser behavior. Record the source, exact locator, supported
proposition, limitations, and scope relationship.

Code, parser output, fixtures, generated probes, regression success, learner
usefulness, corpus search results, and historical project confidence cannot
create a language claim. They may test an externally grounded design or identify
a research question.

## Evidence-scope rule

- Attestation proves occurrence in the documented context, not unrestricted
  productivity, frequency, dialect-wide naturalness, or one preferred analysis.
- A narrow supported subtype does not promote a broad runtime alias or umbrella.
- Evidence attached to a wrapper, retired record, or predecessor is never
  transferred automatically to a successor UUID.
- Source quantity cannot compensate for dependence, weak locators, copied
  examples, or mismatched scope.
- Raw corpus counts have no evidence weight. Every used hit must be classified.
- Parser tests and implementation probes have linguistic evidence weight zero.

## Identity and adjudication

UUID and short code never change or return to the allocation pool. A clarified
or renamed profile normally keeps its UUID. A true split creates new UUIDs and
predecessor/successor links. An accepted adjudication can supersede an older name
or claim-layer description without silently changing runtime code or status-note
placement.

Canonical names should describe observable narrow structure and remain neutral
when the research does not settle a theoretical analysis. Source terminology is
preserved separately. Learner labels are presentation-only and may be many-to-one.

See [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md) and
[`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md).

## Structural generalization versus construction claims

Reusable phrase assembly and evidence-gated construction semantics are separate
layers. A grounded NP subsystem may generalize over valid structures without a
citation for every noun or sentence, but it must preserve lexical restrictions,
ambiguity, unknown material, and incomplete spans.

A construction may consume a licensed NP without inheriting broader claims about
verb productivity, aspectual meaning, object omission, selection, or the NP's
internal analysis. Better assembly is parser correctness, not stronger linguistic
evidence for the consumer.

## Native-panel requirement

Native-speaker evidence is one role-neutral panel. Every eligible respondent uses
the same instrument and criteria; no named respondent receives special weight.
`provisional` requires at least 10 usable adjudicated judgments per critical
positive and negative item from a clean instrument. `supported_productive`
requires at least 30 per critical item from a locked clean instrument. Total
submissions cannot replace item-level coverage.

When published analysis conflicts with recorded naturalness, freeze the disputed
scope until independent sources, controlled contrasts, role-neutral evidence,
variation factors, negative boundaries, and competing analyses are reviewed. Do
not invent dialect, register, or contextual explanations.

## Productive promotion

A construction is `supported_productive` only when every item in
[`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md) passes. Discovery scores rank
research effort only. Runtime, render, regression, or held-out success establishes
implementation consistency, not linguistic confidence.

The endpoint is honest resolution, not promotion of every runtime label. A record
may remain narrowly nonproductive, become lexicalized-only, decompose into
internal parts, split, merge, supersede, quarantine, or retire.

## Parser integrity

- Never insert hidden subjects, objects, nouns, resources, propositions, results,
  activities, or connectives.
- Preserve ambiguity when evidence does not determine a unique analysis.
- Internal wrappers and provisional fallback spans cannot license evidence-gated
  constructions.
- Compatibility aliases cannot broaden a supported subtype.
- Learner-facing simplification must remain materially true.
- Negative and boundary cases must remain executable.
- Structural subsystems must be tested on unseen lexical items and combinations.

## Code and documentation

Runtime code and executable tests own current parser behavior. Status notes own
current linguistic status. Identity and accepted adjudications own durable
identity and current ontology. Generated discovery records own readiness
summaries. A mismatch outside an explicitly documented migration boundary blocks
release.

Historical reports preserve provenance only. They must not be copied into current
policy or used to resurrect superseded names, claim layers, work orders, or
confidence statements.

## Work-product discipline

Prefer one canonical record and one verifier per responsibility. Do not create
parallel ledgers, release-specific verifier families, repeated generated snapshot
trees, or automatic workflows that commit intermediate failing states.

Meaningful work includes changed parser behavior, executable tests, verified
evidence, an accepted UUID-keyed decision, a defensible status transition, an
actual retirement, or a binding architecture decision that enables implementation.

## Autonomous governance

The assistant may autonomously research, adjudicate, specify, implement, validate,
revise, quarantine, retire, and publish changes under this doctrine. User
participation remains necessary where independence cannot be created internally,
especially native-panel recruitment and user-visible rendering confirmation.
