# Project state

## Current baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.203 |
| Runtime labels | 165 |
| Current construction notes | 165 |
| Active working notes | 2 |
| Workflow-archived notes | 163 |
| Retired labels | 16 |
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 0 |
| `research_pending` | 61 |
| `unsupported_generalization` | 82 |
| `lexicalized_only` | 3 |
| `parser_heuristic` | 19 |

The canonical registry is the union of `grammar/<linguistic-status>/*.md`; each note is stored in the folder matching its frontmatter status, and the 165 notes match the runtime labels exactly.

## v0.5.203 status-directory migration

All 165 canonical construction notes are now grouped by linguistic status under `grammar/`. The former `active/` and `archived/` workflow directories were removed. Workflow selection remains in frontmatter, so the two active research notes stay visible inside `research_pending/` while every status can be reviewed directly from the filesystem. `grammar/retired/README.md` provides a navigation view for the 16 retired labels without duplicating their canonical historical records. Parser behavior, runtime labels, linguistic statuses, evidence, and test expectations are unchanged.

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

## v0.5.202 ComparativeStative retirement

`ComparativeStative` is retired. Its only observable path was a residual `stative + 啲` fallback that conflated scalar adjustment with overt comparison. The source-linked regression `客氣啲。` now uses `DegreeMannerAdverbial`. This does not establish unrestricted property + `啲` productivity, and it does not replace separate research on explicit surpass comparatives such as predicate + `過` + comparison standard.

## v0.5.201 passive/permissive 畀 reconciliation

`PassivePermissiveRelation` now has two source-linked positive regressions. The permissive example preserves `打籃球` as a nested reviewed `ProductiveVO`, preventing `籃球` from being misreported as a retained patient. The passive example preserves the transparent passive/permissive interpretation boundary. Status remains `research_pending`; no panel or productivity claim was added.

## v0.5.199 manner-adverbial reconciliation

`MannerAdverbialVP` now recognizes the independently attested repeated-property + overt `咁／噉` + VP pattern and preserves a constructed following VP as a child. One source-linked regression was added. The construction moved from `unsupported_generalization` to `research_pending`; unrestricted productivity, negative boundaries, and the bare `慢慢 + V` route remain unestablished. No new verification machinery was added.

## Runtime-wrapper review outcome

The v0.5.189–v0.5.197 review series is complete:

- 59 labels have implementation-only coverage;
- 1 label has compatibility-alias-only coverage;
- 4 dead or shadowed labels were retired during the v0.5.189–v0.5.197 series; one additional misleading fallback was retired in v0.5.202;
- no active label remains uncovered;
- implementation reachability carries zero linguistic evidence weight.

The detailed historical reasoning remains in the corresponding research and retirement records. It is no longer re-executed during every repository verification.

## Active research

The two active constructions remain:

- `ResourceUseLaiFunctionRelation` — `research_pending`;
- `PostverbalZoPerfectiveVP` — `research_pending`.

Survey integration remains paused while collection proceeds. No current instrument can independently satisfy promotion requirements without a locked clean instrument and adjudicated item-level coverage.

## Next substantive work

Continue source/runtime reconciliation among the remaining 59 implementation-only labels by learner impact and research tractability. Preserve explicit comparison strategies separately from scalar `啲` adjustment. Do not create release-specific audit frameworks; add permanent evidence only where it changes the construction record.
