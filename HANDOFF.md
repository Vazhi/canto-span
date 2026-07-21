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
5. `docs/current/CONSTRUCTION-NOTES.md`
6. `docs/current/INFRASTRUCTURE-MIGRATION.md`
7. `GRAMMAR-INDEX.md`

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

Complete infrastructure migration Phase 4:

1. read status, sources, speaker count, and boundaries from `grammar/*.md`;
2. enforce the binding Definition of Done mechanically;
3. fail any unsupported promotion before it can ship;
4. keep the runtime independent of authoring evidence metadata;
5. add focused tests for both accepted and rejected status transitions.

Phase 3 is complete. `main.js` contains parser logic and the active construction-label registry only. The 545-case equivalence check confirms unchanged structural behavior from v0.5.184.

Do not resume broad construction expansion before the Phase 4 promotion validator is in place.

## Save after meaningful work

Commit the coherent change, then run:

```bash
./tools/export-git-working-copy.sh
```

Download the resulting ZIP immediately. It is the project recovery artifact; plugin ZIPs are installation artifacts only.
