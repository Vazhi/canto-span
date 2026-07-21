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
- active labels: **171**
- runtime labels / construction notes: **171 / 171**
- authoring evidence embedded in runtime: **none**
- `supported_productive`: **0**
- `PostverbalZoPerfectiveVP`: **provisional_reaudit; Speaker A complete**
- `ResourceUseLaiFunctionRelation`: **provisional_reaudit**
- second-speaker work: **frozen; requirement not waived**
- DEMO01: **abandoned**

## Current substantive task

Begin infrastructure migration Phase 6: choose a genuinely small active working set and move all other construction notes into an explicitly archived collection without deleting evidence or runtime labels prematurely.

Phase 5 is complete. `npm test` runs 545 exact regressions, 43 NP cases, and 1,156 per-construction assertions across 171 standard construction files. Coverage debt remains explicit: 69 active labels have no direct standardized case.

## Save after meaningful work

Commit the coherent change, then run:

```bash
./tools/export-git-working-copy.sh
```

Download the resulting ZIP immediately. It is the project recovery artifact; plugin ZIPs are installation artifacts only.
