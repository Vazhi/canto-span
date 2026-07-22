# Project state

## Current baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.211 |
| Runtime labels | 164 |
| Current construction notes | 164 |
| Active working notes | 2 |
| Workflow-archived notes | 162 |
| Retired labels | 17 |
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 0 |
| `research_pending` | 64 |
| `unsupported_generalization` | 78 |
| `lexicalized_only` | 3 |
| `parser_heuristic` | 19 |

The canonical registry is the union of
`grammar/<linguistic-status>/*.md`. The 164 construction notes match the 164
runtime labels exactly.

## v0.5.211 negative-experiential reconciliation

`NegativeExperiential` now covers the narrow source-linked preverbal
`未/冇 + V過` statement profile. Focused positives reproduce three exact
coursebook examples; executable boundaries keep non-experiential `未V`,
final-`未` questions, `有冇` questions, general `唔`, and prohibitive `咪`
outside the node.

The compatibility fallback is word-order-sensitive, and `未` no longer enters
the existing `唔/冇` directional-negation template. `NegativeExperiential`
moves from `unsupported_generalization` to `research_pending`; productive
verb/object scope, particles, internal long-object parsing, and panel evidence
remain unresolved.

## v0.5.210 scalar-evaluation reconciliation

`ScalarEvaluation` now retains one narrow source-linked family: negative
lexical `算` evaluation with an overt property predicate. Focused positives
cover `對皮鞋唔算貴`, `價錢唔算貴`, and `都唔算貴`; `中等價錢` is an executable
ordinary-nominal boundary.

The unrelated scalar-value-noun + stative-predicate template and the retired
price-specific redirects were removed. `ScalarEvaluation` moves from
`unsupported_generalization` to `research_pending`; complement productivity,
the attested but undercovered `都唔算好差` profile, and panel evidence remain
unresolved.

## v0.5.209 scalar-range fragment retirement

`ScalarRangeFragment` is retired. Its only complete-output evidence was the
zero-weight probe `中等價位。`, while the fallback assigned fragment status to
any core containing `價位` and had no mapped source, accepted fixture, or
independent boundary.

Removing the fallback preserves ordinary structure: `中等價位` remains a
`ModifierNP`, bare `價位` remains nominal material, and `呢個價位` remains an
overt demonstrative-classifier NP. The historical semantic-domain-specific
`PriceRangeFragment` alias no longer redirects to an active construction.

## v0.5.208 copular A-not-A reconciliation

The `CopularANotAQuestion` fallback now explicitly distinguishes checked
overt-full-form predicate/clause complements from bounded nominal/possessive
implementation profiles. It preserves both arms of `係唔係`, rejects a
no-complement terminal tag from this node, and leaves contracted `係咪` on the
separate `PolarQuestionFrame` path.

Standardized coverage adds two source-linked positive cases and one published
tag boundary. The historical `係唔係你嘅？` case remains a zero-weight
implementation probe. `CopularANotAQuestion` remains
`unsupported_generalization`: direct nominal/possessive evidence, contracted
form ontology, broader predicate boundaries, and role-neutral panel evidence
remain incomplete.

## v0.5.207 release-baseline portability repair

Release verification no longer depends on a Git commit or whole-repository tree
object created in another clone. The current audit references a checked-in,
SHA-256-pinned snapshot of the v0.5.206 construction/status inventory. This
makes status-diff verification reproducible after `git am`, cherry-picking,
rebasing, or regeneration of tracked verifier outputs.

The patch changes release tooling and documentation only. Parser behavior,
construction statuses, evidence records, and executable grammar coverage are
unchanged from v0.5.206.

## v0.5.206 acceptability A-not-A reconciliation

The legacy `AcceptabilityANotA` fallback formerly matched any clause containing
two `得` tokens and one `唔`. It now requires an adjacent terminal `得唔得`
sequence and allows only the checked postposed `先` after it.

The standardized construction file adds the source-attested
`而家問題係佢嗰度得唔得先。` as a positive and the published restrictive-focus
`得唔得三個鐘你可以瞓？` as an absence boundary. The historical standalone
`得唔得？` probe remains zero-weight implementation evidence.

`AcceptabilityANotA` remains `unsupported_generalization`: one narrow positive
and one boundary do not establish productive lexical/discourse scope or satisfy
the role-neutral panel requirements. `CopularANotAQuestion` was reviewed but
left unchanged because the checked clause-complement and tag evidence does not
match the current nominal/possessive runtime claim closely enough.

## Active research

The active working set remains:

1. `ResourceUseLaiFunctionRelation` — `research_pending`;
2. `PostverbalZoPerfectiveVP` — `research_pending`.

Survey integration remains paused until a locked clean instrument has usable,
adjudicated item-level coverage. Historical PFV and RUL responses remain
available as diagnostic evidence but cannot satisfy current promotion
thresholds.

## Current implementation evidence

- 551 regression cases pass;
- 43 NP-subsystem cases pass;
- 1,246 construction assertions across 164 construction files pass;
- coverage is 6 positive-and-boundary, 104 positive-only, 53
  implementation-only, and 1 compatibility-alias-only;
- no active label is uncovered.

Implementation reachability carries zero linguistic evidence weight.

## Next substantive work

Resume source/runtime reconciliation among the remaining 53
implementation-only labels, ranked by learner impact, source availability, and
whether the current node creates a misleading analysis. Treat the full
`係唔係`/contracted `係咪` relationship as a separate ontology question rather
than silently broadening the reconciled node. The full retirement-review window
is open at sequence 34 and must close no later than sequence 41. Do not create
another release-specific verifier or generated validation tree.
