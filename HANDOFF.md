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

- runtime: **v0.5.216**
- runtime labels / current construction notes: **133 / 133**
- workflow: **133 available / 0 parked**
- retired labels: **48**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **79**
- current panel focal constructions: PFV and RUL, both `research_pending`

Workflow availability is owned by `data/parked-constructions.json`, not by an
active-note whitelist. The blacklist is currently empty. Legacy workflow fields
inside grammar-note frontmatter are compatibility metadata only.

There is no repository-wide grammar freeze. Agents may select the highest-benefit
bounded non-parked task, but new grammar, broadenings, splits, status transitions,
and runtime changes still require their applicable evidence and verification
gates. When a parked item becomes the best target, recommend unpark before doing
substantive work.

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

The v0.5.216 full review closed all 52 original unsupported/internal ontology
dispositions without status promotion or retirement. Subsequent work should
select the most beneficial bounded available item, consult readiness and unresolved
work as evidence rather than as a queue, and avoid reopening completed reviews
without a concrete reason.
