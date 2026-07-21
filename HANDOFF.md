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
6. `docs/current/NATIVE-SPEAKER-REVIEW.md`
7. `docs/current/TESTING.md`
8. `docs/current/CONSTRUCTION-NOTES.md`
9. `docs/current/INFRASTRUCTURE-MIGRATION.md`
10. `GRAMMAR-INDEX.md`

## Binding state

- runtime: **v0.5.185**
- active runtime labels: **171**
- runtime labels / construction notes: **171 / 171**
- construction workflow: **2 active / 169 archived**
- authoring evidence embedded in runtime: **none**
- `supported_productive`: **0**
- `PostverbalZoPerfectiveVP`: **provisional_reaudit; Speaker A complete**
- `ResourceUseLaiFunctionRelation`: **provisional_reaudit**
- native-speaker evidence: **RUL01 public pilot snapshot counted at 23 responses with 0 promotion-eligible speakers; PFV01 Speaker B and controlled RUL01 Speaker A remain pending**
- DEMO01: **abandoned**

## Current substantive task

Infrastructure migration Phase 9 is complete.


Phase 9 adopts the user-supplied Definition of Done as the controlling completion text and upgrades enforcement to promotion gate v2. It also adds `tools/verify-release-handoff.js`, a Git-derived release audit, and a 10–20 handoff retirement-review cadence. No parser behavior or linguistic status changed.

The active working set is:

1. `grammar/active/PostverbalZoPerfectiveVP.md`;
2. `grammar/active/ResourceUseLaiFunctionRelation.md`.

The other 169 current records are under `grammar/archived/`. They remain runtime-active and retain all evidence, status, and standardized tests. Workflow archiving is not retirement.

Phase 7 formalized source verification and native-speaker review. Phase 8 commits the first RUL01 public-panel result: 23 complete responses are retained as external panel evidence under a one-time exception, while `promotion_eligible_independent_speaker_count` remains 0 because the instrument was a binary fixed-order context-free pilot with one late global comment field. The canonical snapshot and result are under `review-packets/native-speaker/active-v1/completed/RUL01-SPEAKER-B-PUBLIC-R1/` and `docs/research/CP026-P1-RUL01-PUBLIC-PANEL-R1-RESULT.md`. Later live responses require a new dated snapshot rather than mutation of R1.

`npm test` runs 545 exact regressions, 43 NP cases, and 1,156 per-construction assertions across 171 standard construction files. Coverage debt remains explicit: 69 runtime-active labels have no direct standardized case.

## Save after meaningful work

Commit the coherent change, then run:

```bash
./tools/export-git-working-copy.sh
```

Download the resulting ZIP immediately. It is the project recovery artifact; plugin ZIPs are installation artifacts only.
