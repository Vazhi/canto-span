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

- runtime: **v0.5.215**
- runtime labels / current construction notes: **133 / 133**
- workflow: **2 active / 131 archived**
- retired labels: **48**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **79**
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
8. `docs/research/CURRENT-RESEARCH-PROVENANCE.md`
9. `docs/research/README.md`

## Next substantive work

Follow the priorities and authorization boundaries in `docs/current/`. Research
records under `docs/research/` are evidence and decision history only; their
completion does not change grammar status or authorize runtime work.
