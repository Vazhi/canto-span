# Handoff

## Restore first

This repository must be restored from the newest full working-copy ZIP, including `.git/`.

Run:

```bash
cd canto-span
./tools/verify-repository.sh
git status
git log --oneline --decorate -5
```

Do not assume continuity from an earlier conversation unless these checks succeed.

## Read next

1. `docs/current/PROJECT-STATE.md`
2. `docs/current/NOUN-PHRASE-SUBSYSTEM.md`
3. `docs/current/DOCTRINE.md`
4. `docs/current/DEFINITION-OF-DONE.md`
5. `docs/current/PROMOTION-GATE.md`
6. `docs/current/TESTING.md`
7. `docs/current/CONSTRUCTION-NOTES.md`
8. `docs/current/INFRASTRUCTURE-MIGRATION.md`
9. `GRAMMAR-INDEX.md`

## Binding state

- runtime: **v0.5.185**
- active runtime labels: **171**
- runtime labels / construction notes: **171 / 171**
- construction workflow: **2 active / 169 archived**
- authoring evidence embedded in runtime: **none**
- `supported_productive`: **0**
- `PostverbalZoPerfectiveVP`: **provisional_reaudit; Speaker A complete**
- `ResourceUseLaiFunctionRelation`: **provisional_reaudit**
- second-speaker work: **frozen; requirement not waived**
- DEMO01: **abandoned**

## Current substantive task

Infrastructure migration Phase 6 is complete.

The active working set is:

1. `grammar/active/PostverbalZoPerfectiveVP.md`;
2. `grammar/active/ResourceUseLaiFunctionRelation.md`.

The other 169 current records are under `grammar/archived/`. They remain runtime-active and retain all evidence, status, and standardized tests. Workflow archiving is not retirement.

Phase 7 may formalize source-checking and native-speaker review checklists. Second-speaker work remains frozen. Use the stored blinded form method only when a specific evidence gap requires user-mediated review; Phase 6 itself required no native-speaker form.

`npm test` runs 545 exact regressions, 43 NP cases, and 1,156 per-construction assertions across 171 standard construction files. Coverage debt remains explicit: 69 runtime-active labels have no direct standardized case.

## Save after meaningful work

Commit the coherent change, then run:

```bash
./tools/export-git-working-copy.sh
```

Download the resulting ZIP immediately. It is the project recovery artifact; plugin ZIPs are installation artifacts only.
