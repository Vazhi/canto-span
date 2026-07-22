# Handoff

## Restore first

```bash
cd canto-span
./tools/verify-repository.sh
git status
git log --oneline --decorate -5
```

The recovery ZIP must include `.git/`.

## Applying a handoff patch

Generated verification snapshots may be dirty after `npm run verify:all`. They are not canonical patch inputs. Use this sequence before applying the next patch:

```bash
git am --abort 2>/dev/null || true
git restore --staged --worktree validation/current
git am /path/to/canto-span-version.patch
npm run verify:all
git restore --staged --worktree validation/current
```

Current release audits must reference a checked-in construction-status baseline under `data/release-baselines/` and pin it by SHA-256. Do not store commit or tree object IDs from any clone. Generate the next baseline from the clean released state with `npm run release:baseline -- <version>`.

## Binding state

- runtime: **v0.5.211**
- runtime labels / current construction notes: **164 / 164**
- workflow: **2 active / 162 archived**
- retired labels: **17**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **64**
- active constructions: PFV and RUL, both `research_pending`

## Evidence model

Every qualified respondent uses the same locked instrument and inclusion
criteria. Promotion depends on usable adjudicated judgments per critical item:
10 for `provisional` and 30 for `supported_productive` from a locked clean
instrument. Historical PFV and RUL instruments do not currently satisfy those
requirements.

## Read next

1. `docs/current/PROJECT-STATE.md`
2. `docs/current/DOCTRINE.md`
3. `docs/current/DEFINITION-OF-DONE.md`
4. `docs/current/GOVERNANCE.md`
5. `docs/current/TESTING.md`
6. `grammar/README.md`
7. `GRAMMAR-INDEX.md`
8. `docs/research/CP055-P1-NEGATIVE-EXPERIENTIAL-RECONCILIATION-R1.md`
9. `docs/research/CP054-P1-SCALAR-EVALUATION-RECONCILIATION-R1.md`
10. `docs/research/CP053-P1-EVALUATION-WITH-DOU-SYUN-EXTERNAL-EVIDENCE-R1.md`
11. `docs/research/CP052-P1-SCALAR-RANGE-FRAGMENT-RETIREMENT-R1.md`

## Next substantive work

Continue source/runtime reconciliation among the remaining 53
implementation-only labels. Rank the next label by learner impact, exact source
match, and risk of misleading analysis. Do not merge full `係唔係` with
contracted `係咪`, promote nominal/possessive complements, or add a tag node
without a separately bounded claim and executable evidence. The retirement
review window is open at handoff sequence 34 and must be completed by sequence
41.
