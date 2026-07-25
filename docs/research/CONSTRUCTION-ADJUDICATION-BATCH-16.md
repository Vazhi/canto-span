# Construction adjudication — Batch 16

**Adjudication date:** 2026-07-25  
**Authority:** project expert systematic review  
**Records:** `AB06`, `AB07`, `AB08`, `AB09`, `AB10`

## Integration state

The expert decisions are recorded in
`data/construction-adjudication-batches/batch-16.json`. Deterministic application
to the identity registry, label sweep, discovery registry, generated research
reports, and current documentation must occur in the same pull request before
merge readiness.

This batch changes identity and ontology metadata only. It does not authorize or
perform a runtime-label migration, status-path migration, matcher change, fixture
change, new UUID allocation, lifecycle restoration, survey change, release
change, promotion, or merge.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Action |
|---|---|---|---|---|
| `AB06` | `NegativeHaveClause` | `Mou5ExistentialPossessiveEventComposite` | `parser_representation` | `retain_retired_reclassify` |
| `AB07` | `NegativePotentialComplement` | `VerbM4ResultPotentialVP` | `language_construction` | `rename_retain_narrow` |
| `AB08` | `NegativePotentialDirectionalVP` | `NegativePotentialDirectionalCompositeWrapper` | `parser_representation` | `internalize_and_decompose` |
| `AB09` | `NominalHeadSpan` | `OvertAnalyzedNominalSpan` | `parser_representation` | `rename_retain_narrow` |
| `AB10` | `NominalModifierNP` | `NominalModificationCompositeWrapper` | `parser_representation` | `retain_retired_reclassify` |

No UUID, permanent code, lifecycle state, runtime label, or status path changes.

## AB06 — Mou5ExistentialPossessiveEventComposite

- UUID: `a113b35a-3b49-5120-b1bb-c3fb8f081bda`
- Lifecycle: remains retired.
- Family: `NegationRepresentation`
- Profile: `Mou5PossessionExistenceAndEventAggregate`
- Alignment: `disjoint`.
- Status recommendation: remain retired.

The retirement archive records zero accepted fixtures, zero runtime references,
and zero parser outputs. It identifies possession, existence, and event negation
as distinct research homes. `NegativeHaveClause` therefore has no independent
language-construction boundary.

The UUID remains permanently resolvable as a historical parser representation.
Evidence from overt nominal-complement clauses, elliptical responses, or event
and aspect negation cannot transfer through this obsolete wrapper.

## AB07 — VerbM4ResultPotentialVP

- UUID: `23a889d8-991c-5348-8da3-ccf865f5e509`
- Family: `PotentialComplementation`
- Profile: `VerbM4ResultComplement`
- Alignment: `overlapping`.
- Status recommendation: retain `unsupported_generalization`.

The five executable positives are `我食唔到飯`, `食唔到飯`, `做唔完`,
`做唔完份功課`, and `聽唔到聲`. They consistently contain an overt verb,
`唔`, and an overt result or attainability complement. Cheng and Sybesma
separate potential from permission or ability uses and do not justify a default
overt or hidden `得` in the negative form.

The retained UUID is limited to the overt `V + 唔 + result complement` profile.
Directional chains, ordinary preverbal negation, positive potentials, and
permission or ability `得` remain independently typed.

## AB08 — NegativePotentialDirectionalCompositeWrapper

- UUID: `98fe5056-ec42-5505-b8d1-7514375fcfc9`
- Family: `PotentialAndDirectionalRepresentation`
- Profile: `VerbM4DirectionalChainAggregate`
- Alignment: `overlapping`, but compositional.
- Status recommendation: migrate to `parser_heuristic` only through a separate compatibility change.

The two executable positives are `行唔入去` and `攞唔返嚟`. Their overt
material combines a negative-potential relation with independently meaningful
directional structure. The current note already recommends typed composition
rather than a separate public construction.

The wrapper may preserve runtime aggregation and exact marker order, but it must
not generate hidden `得` or compete for direct linguistic promotion.

## AB09 — OvertAnalyzedNominalSpan

- UUID: `e56bf2b7-7a16-50cb-a14e-9cd0c245594b`
- Family: `NominalStructureRepresentation`
- Profile: `OvertNominalMaterialSubordinateToNPLicensing`
- Alignment: `runtime_narrower_defensible`.
- Status recommendation: retain `parser_heuristic`.

The current note explicitly assigns zero independent linguistic-evidence weight.
The runtime and tests use the span to preserve overt analyzed nominal material
while licensed, ambiguous, provisional, and invalid NP states remain
independently authoritative.

`Head` overstates the structural commitment. `OvertAnalyzedNominalSpan` states
that the node cannot independently infer a noun, omitted head, argument role,
ellipsis analysis, or fragment status. The emitted legacy label remains unchanged
until all consumers are explicitly migrated.

## AB10 — NominalModificationCompositeWrapper

- UUID: `9d121ce5-a2c6-54bb-b8e6-24ae22f93e13`
- Lifecycle: remains retired.
- Family: `NominalModificationAndRelatives`
- Profile: `BareGeClassifierRelativeAndComplementAggregate`
- Alignment: `disjoint`.
- Status recommendation: remain retired.

The retirement archive records zero fixtures, zero runtime references, and zero
parser outputs and classifies the label as a duplicate umbrella. Bare property
modification, `嘅`-marked modification, classifier-linked structure, relative
clauses, and nominal complements require separate boundaries.

The retired UUID remains resolvable for provenance only. Evidence from any one
nominal subtype cannot be transferred to the historical umbrella.

## Evidence boundary

The adjudication uses the immutable identity registry, current grammar notes,
current executable construction files, the retired-construction archive, and
verified source records already mapped by the repository.

Implementation reachability and test success carry zero independent linguistic
evidence weight. Evidence does not transfer across possession, existence, event
negation, negative potential, directional structure, NP licensing state, nominal
modifier subtype, relative clause, complement structure, or future successor.

## Expected inventory after deterministic application

- expert-adjudicated identities: **79 / 181**;
- pending adjudications: **102**;
- accepted batches: **16**;
- promotion-ready remains **0** unless a separately authorized evidence decision changes it.

Exact discovery-state counts must be reported from the deterministic generator
rather than predicted in this expert decision record.

## Explicitly unchanged

- `main.js` and runtime behavior;
- emitted legacy labels;
- grammar-note paths and linguistic statuses;
- executable fixtures;
- lifecycle state, UUIDs, and permanent codes;
- survey instruments, responses, and deployment state;
- corpus decisions;
- release version, tags, and packages;
- merge authorization.
