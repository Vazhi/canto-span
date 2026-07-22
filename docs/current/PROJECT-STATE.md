# Project state

## Current baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.208 |
| Runtime labels | 165 |
| Current construction notes | 165 |
| Active working notes | 2 |
| Workflow-archived notes | 163 |
| Retired labels | 16 |
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 0 |
| `research_pending` | 62 |
| `unsupported_generalization` | 81 |
| `lexicalized_only` | 3 |
| `parser_heuristic` | 19 |

The canonical registry is the union of
`grammar/<linguistic-status>/*.md`. The 165 construction notes match the 165
runtime labels exactly.

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
- 1,235 construction assertions across 165 construction files pass;
- coverage is 4 positive-and-boundary, 104 positive-only, 56
  implementation-only, and 1 compatibility-alias-only;
- no active label is uncovered.

Implementation reachability carries zero linguistic evidence weight.

## Next substantive work

Resume source/runtime reconciliation among the remaining 56
implementation-only labels, ranked by learner impact, source availability, and
whether the current node creates a misleading analysis. Treat the full
`係唔係`/contracted `係咪` relationship as a separate ontology question rather
than silently broadening the reconciled node. The full retirement-review window
is open at sequence 31 and must close no later than sequence 41. Do not create
another release-specific verifier or generated validation tree.
