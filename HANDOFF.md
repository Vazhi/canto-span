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
5. `docs/current/INFRASTRUCTURE-MIGRATION.md`

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

Continue the shared NP subsystem without broadening construction claims:

1. represent unresolved `啲 A 嘅 N` attachment explicitly;
2. support nested or complex NP conjuncts compositionally;
3. define a reviewable lexical-class onboarding path;
4. connect licensed NP inputs to additional consumers only where this corrects structural assembly.

Do not create example-string whitelists.

## Save after meaningful work

Commit the coherent change, then run:

```bash
./tools/export-git-working-copy.sh
```

Download the resulting ZIP immediately. It is the project recovery artifact; plugin ZIPs are installation artifacts only.
