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

- runtime: **v0.5.184**
- active labels: **171**
- runtime/governance mismatches: **0**
- `supported_productive`: **0**
- `PostverbalZoPerfectiveVP`: **provisional_reaudit; Speaker A complete**
- `ResourceUseLaiFunctionRelation`: **provisional_reaudit**
- second-speaker work: **frozen; requirement not waived**
- DEMO01: **abandoned**

## Current substantive task

Complete infrastructure migration Phase 3:

1. move authoring-time evidence metadata out of `main.js`;
2. retain parser heuristics and minimal active-label/runtime status data only;
3. update audits to read construction notes for evidence and status;
4. prove parser output and the 545-case regression suite are unchanged;
5. commit the reduction as a readable diff.

Do not resume broad construction expansion before the Phase 4 promotion validator is in place.

## Save after meaningful work

Commit the coherent change, then run:

```bash
./tools/export-git-working-copy.sh
```

Download the resulting ZIP immediately. It is the project recovery artifact; plugin ZIPs are installation artifacts only.
