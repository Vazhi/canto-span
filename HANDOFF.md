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
6. `docs/current/CONSTRUCTION-NOTES.md`
7. `docs/current/INFRASTRUCTURE-MIGRATION.md`
8. `GRAMMAR-INDEX.md`

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

Begin infrastructure migration Phase 5:

1. define one standard test directory and file format per active construction;
2. migrate active positive and boundary cases mechanically without deleting historical fixtures;
3. provide one command for the standard construction suite;
4. keep linguistic promotion controlled by `tools/enforce-promotion-rules.js`;
5. avoid turning historical render-review documents into active test authority.

Phase 4 is complete. All 171 notes carry explicit promotion-evidence fields, the focused promotion-gate suite passes 8/8, and every current status is non-promoted. `main.js` remains independent of authoring evidence metadata.

## Save after meaningful work

Commit the coherent change, then run:

```bash
./tools/export-git-working-copy.sh
```

Download the resulting ZIP immediately. It is the project recovery artifact; plugin ZIPs are installation artifacts only.
