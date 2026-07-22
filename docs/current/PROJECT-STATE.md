# Project state

## Current baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.198 |
| Runtime labels | 166 |
| Current construction notes | 166 |
| Active working notes | 2 |
| Workflow-archived notes | 164 |
| Retired labels | 15 |
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 0 |
| `research_pending` | 60 |
| `unsupported_generalization` | 84 |
| `lexicalized_only` | 3 |
| `parser_heuristic` | 19 |

The canonical registry is the union of `grammar/active/*.md` and `grammar/archived/*.md`; it matches the 166 runtime labels exactly.

## v0.5.198 verification consolidation

The verification infrastructure was reduced to a stable manifest-driven system:

- one current runner: `tools/verify-current-state.js`;
- one profile manifest: `config/verification-profiles.json`;
- one generated-output location: `validation/current/`;
- one 65-case zero-weight implementation-probe inventory;
- one generic implementation-reachability verifier;
- core, research, release, and all-check profiles.

Release-specific wrapper verifiers, eight separate probe files, obsolete version-specific audit scripts, and repeated v0.5.189–v0.5.197 generated validation directories were removed from the active tree. Git history remains the recovery source for those historical outputs.

No parser span, runtime label, construction status, source claim, or survey result changed.

## Runtime-wrapper review outcome

The v0.5.189–v0.5.197 review series is complete:

- 63 labels have implementation-only coverage;
- 1 label has compatibility-alias-only coverage;
- 4 dead or shadowed labels were retired during the series;
- no active label remains uncovered;
- implementation reachability carries zero linguistic evidence weight.

The detailed historical reasoning remains in the corresponding research and retirement records. It is no longer re-executed during every repository verification.

## Active research

The two active constructions remain:

- `ResourceUseLaiFunctionRelation` — `research_pending`;
- `PostverbalZoPerfectiveVP` — `research_pending`.

Survey integration remains paused while collection proceeds. No current instrument can independently satisfy promotion requirements without a locked clean instrument and adjudicated item-level coverage.

## Next substantive work

Prioritize source/runtime mismatches among the 63 implementation-only labels by learner impact and research tractability. Do not create another release-specific audit framework for each batch; use the stable profiles and add permanent evidence only where it changes the current construction record.
