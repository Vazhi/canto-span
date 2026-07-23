# Project state

## Current baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.216 |
| Runtime labels | 133 |
| Current construction notes | 133 |
| Active working notes | 2 |
| Workflow-archived notes | 131 |
| Retired labels | 48 |
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 0 |
| `research_pending` | 79 |
| `unsupported_generalization` | 37 |
| `lexicalized_only` | 2 |
| `parser_heuristic` | 15 |

The canonical registry is the union of
`grammar/<linguistic-status>/*.md`. The 133 construction notes match the 133
runtime labels exactly.

## v0.5.216 active-label evidence and ontology closure

The original 37 `unsupported_generalization` and 15 `parser_heuristic` labels
now have note-local final dispositions grounded in their exact runtime paths,
tests, compatibility/A1 effects, research records, and source scope. Broad
language-facing wrappers remain quarantined or explicitly targeted for narrow
rename/decomposition; useful serialized internal nodes retain stable,
nonlicensing JSON semantics.

No label met the strict retirement gate, no construction status changed, and no
parser-recognition path changed. Thirteen zero-linguistic-evidence invariant
probes cover the retained contract, question/copular, and discourse nodes. The
full retirement review is complete at handoff sequence 38.

## v0.5.213-r1 ConditionResult retirement

`ConditionResult` is retired because its action + `就` + stative wrapper
collapsed a relation between clauses into one cross-category template. Sourced
conditionals now use typed `ClauseRelationEdge` structure with independently
parsed antecedent and consequent members; the bare `買就平啲。` fallback no
longer receives an unsupported conditional analysis.

## v0.5.213-r2 CompletionThenClause reconciliation

`CompletionThenClause` is retired in favor of typed sequential
`ClauseRelationEdge` structure. Completion and later-event members retain their
own visible subjects and predicates, so `佢講完我就話唔係噉。` records `佢` on
the earlier member and `我` on the later member without inferring
conditionality.

## v0.5.213 negated-stative-predicate reconciliation

`NegatedStativePredicate` now records a narrow source-linked profile for overt
`唔` directly before an independently licensed property predicate, without an
inserted copula. Yip’s `呢個女仔唔靚` supplies the exact positive; the paired
negative nominal predicate `佢老婆唔係廣東人` is an executable absence boundary.

The label moves from `unsupported_generalization` to `research_pending`.
Productive predicate selection, other negators, discourse boundaries, corpus
coverage, and role-neutral panel evidence remain unresolved.

## v0.5.212 negated-lexicalized-stative retirement

`NegatedLexicalizedStative` is retired because it merged three independently
distinct profiles: opaque lexical `難X`, compositional `唔 + lexical property
predicate`, and prohibitive `唔好 + V`. Its only standardized case was a
zero-weight reachability probe and did not support the homogeneous claim.

The retirement preserves the observed forms: `難食` remains a lexical
`StativePredicate`; contextual `唔 + 好食` remains
`NegatedStativePredicate`; overt-object `唔好 + 食` remains
`ProhibitiveImperative`; and bare `唔好食` remains `NeedsContext`.

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

## v0.5.213-r5 SchedulingQuestion retirement

`SchedulingQuestion` is retired because its only direct runtime route was the
unsourced `覺得 + scheduling + 幾時 + 好` wrapper. The source-attested
`你想約佢幾時？` already retains its overt subject, modal, scheduling action,
object, and wh-time material through ordinary `ClauseSpan` and `ModalVP`
composition.

## v0.5.213-r4 opinion-question reconciliation

`OpinionQuestion` now retains only the exact sourced structural profile with an
overt subject, `覺得`, an overt evaluated referent, and `點樣`. The former broad
token-cooccurrence fallback and its zero-weight `你覺得呢個點樣` probe are
removed. Other cognition-question complement types remain separate.

## v0.5.213-r3 acceptability-clause reconciliation

`AcceptabilityClause` now requires an overt parsed action predicate before
`都得`. The source-attested `轆咭都得` is an executable positive over the full
span; nominal/wh-only and overt free-choice `…都得` forms are executable absence
boundaries. The broader label remains `unsupported_generalization`.

## Current implementation evidence

- 551 regression cases pass;
- 43 NP-subsystem cases pass;
- 1,518 construction assertions across 133 construction files pass;
- coverage is 132 positive-and-boundary, 0 positive-only, 0
  implementation-only, and 1 compatibility-alias-only;
- no active label is uncovered.

Implementation reachability carries zero linguistic evidence weight.

## Next substantive work

Use the note-local v0.5.216 migration and unresolved-work fields to drive
targeted source/runtime reconciliation, ranked by learner impact, source
availability, and whether a current node creates a misleading analysis. Treat
the full `係唔係`/contracted `係咪` relationship as a separate ontology question
rather than silently broadening the reconciled node. The next retirement-review
window opens at sequence 48 and is required by sequence 58. Do not create
another release-specific verifier or generated validation tree.
