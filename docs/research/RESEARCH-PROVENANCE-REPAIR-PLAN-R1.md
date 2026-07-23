# Research provenance repair plan R1

## Purpose

Repair the gap between **having a citation trail** and **having direct linguistic
evidence**. The repository must preserve exact claim-to-source links, distinguish
research from attestations and runtime observations, and prevent a research unit
from appearing implementation-ready when its core rests only on dictionaries,
lessons, scripts, or generated probes.

This plan changes no parser behavior or construction status by itself.

## Step 1 — restore provenance integrity

Status: **ID and canonical-index repair completed on
`agent/research-provenance-repair`; six pre-existing companion-link omissions
remain explicitly baselined for later normalization.**

- Reserve `PRQ2-015` for `每／個個…都…` distributive quantification.
- Renumber `寧願…都…` committed preference to `PRQ2-035`.
- Repair same-ID references in the research note, source ledger, and collision
  audit.
- Correct the ordered-preference cross-reference from `PRQ2-009` to
  `PRQ2-013`.
- Restore missing completed PRQ2-004 through PRQ2-007 and PRQ2-015 entries to
  `CURRENT-RESEARCH-PROVENANCE.md`.
- Sort the completed PRQ2 index numerically.
- Remove the temporary GitHub write-access test file.

Current result:

- duplicate research IDs: **0**;
- unindexed canonical packages: **0**;
- missing package files: **0**;
- pre-existing main-note companion-link omissions: **6 warnings** across
  UC-RQ-020, UC-RQ-022, PRQ2-006, and PRQ2-007.

Exit gate:

- every canonical research ID identifies one package;
- every indexed package has a main note, source ledger, and collision audit;
- file names, frontmatter IDs, headings, companion links, and index IDs agree;
- all six baselined companion-link omissions are normalized before final closure.

## Step 2 — add a mechanical research-provenance verifier

Status: **completed and passing in GitHub Actions.**

Implemented:

- `tools/research-provenance-lib.js`;
- `tools/verify-research-provenance.js`;
- `tools/test-research-provenance.js` with eight focused fixtures;
- `config/research-provenance-baseline.json` for explicitly enumerated existing
  debt only;
- research-profile integration through `config/verification-profiles.json`;
- `.github/workflows/research-provenance.yml` for branch and pull-request CI;
- machine-readable output at
  `validation/current/research-provenance.json`.

The verifier now fails on:

- duplicate UC-RQ or PRQ2 IDs;
- an indexed package missing any member of its package;
- a package absent from the canonical index;
- filename, frontmatter, or heading ID mismatch;
- a new missing main-note companion link;
- an unrecognized or newly introduced noncanonical source-verification schema;
- a source row with an empty or placeholder citation/locator;
- a runtime observation presented as linguistic evidence;
- a new PRQ2 `PROMOTE_*`, `DEDICATED_*_CORE`, or equivalent disposition
  unsupported by at least one qualifying direct-evidence row.

The verifier recognizes source and collision filenames explicitly cited by a main
note rather than assuming every companion repeats the entire main-note slug. It
also normalizes seven known historical ledger schemas for audit while reporting
them as baseline warnings; new schema drift still fails.

Verified result at commit `117b9fc847df293e61594076b497960d1595d297`:

- indexed packages: **58**;
- verifier errors: **0**;
- explicit baseline warnings: **18**;
  - weak-core source debt: **5**;
  - legacy ledger schemas: **7**;
  - missing companion links: **6**;
- `verify:research`: **8 / 8 commands passed**;
- GitHub Actions job: **PASS**.

The baseline is not an exemption from final repair. It prevents new debt while
Steps 3 and 4 remove the enumerated historical debt package by package.

## Step 3 — formalize evidence grades

Add a documented evidence-grade vocabulary to the source ledgers:

1. `DIRECT_SCHOLARLY_CORE`
   - peer-reviewed paper or chapter;
   - academic dissertation or proceedings paper;
   - direct linguistic study of the construction.
2. `REFERENCE_GRAMMAR_CORE`
   - recognized Cantonese reference grammar explicitly analyzing the profile.
3. `PRIMARY_CORPUS_ATTESTATION`
   - reproducible corpus release or checked extraction with exact row/context.
4. `CONTROLLED_JUDGMENT_EVIDENCE`
   - documented speaker panel or experimental judgment evidence.
5. `ATTESTATION_ONLY`
   - dictionary, lesson, drama, manual, media text, or isolated example.
6. `LEXICAL_OR_PRONUNCIATION_ONLY`
   - word identity, reading, or gloss without construction analysis.
7. `RUNTIME_OBSERVATION_ONLY`
   - parser behavior; always zero linguistic-evidence weight.

A research unit may remain active with only attestation evidence, but its core
disposition must explicitly say `PENDING_DIRECT_RESEARCH` rather than imply that
the construction has been established for implementation.

## Step 4 — backfill or downgrade weak recent PRQ2 units

Audit these Codex-created units first:

- PRQ2-008 `只要…就…`;
- PRQ2-009 `既然…`;
- PRQ2-010 `除咗…之外…`;
- PRQ2-011 `唔單止…仲…`;
- PRQ2-013 `與其…不如…`;
- PRQ2-014 `只有…先至…`;
- PRQ2-033 `又…又…`;
- PRQ2-034 `無論…都…`;
- PRQ2-035 `寧願…都…`.

For each unit:

1. locate direct Cantonese linguistic research or an explicit reference-grammar
   analysis;
2. verify the exact examples, page/section locators, and claimed structural or
   semantic boundary;
3. add reproducible primary-corpus evidence where available;
4. keep dictionary, teaching, and drama evidence as corroboration only;
5. narrow or downgrade every claim not supported by the stronger evidence;
6. preserve unresolved speaker, regional, register, prosodic, and productivity
   boundaries for panel testing.

PRQ2-012 `一係…一係…` is the initial positive control because its ledger already
contains a primary scholarly source and adult corpus attestations.

## Step 5 — audit implementation-to-research links

Review every commit that changed runtime behavior, grammar status, or executable
fixtures after the research-first policy began.

For each changed construction require:

- explicit source IDs in the canonical construction note;
- an exact claim supported by those sources;
- positive and negative/boundary fixtures tied to the sourced claim;
- no reliance on a research note that states implementation is unauthorized;
- no promotion based solely on runtime coverage, generated probes, dictionaries,
  or pedagogical examples.

Unsupported implementation must be narrowed, quarantined, retired, or reverted;
it must not be grandfathered merely because tests pass.

## Step 6 — integrate the gate into normal verification

Mechanical integration is already complete through Step 2. Remaining work:

- document the gate in `docs/current/TESTING.md` and the research README;
- extend fixtures when Step 3 adds explicit evidence grades;
- remove baseline entries as each historical package is normalized;
- keep network availability out of the deterministic local gate;
- run URL reachability as a separate scheduled or manual audit with cached
  results.

## Step 7 — issue a final provenance report

Produce a repository-wide table containing:

- research ID and construction;
- package completeness;
- strongest evidence grade;
- direct scholarly source count;
- primary corpus source count;
- attestation-only source count;
- implementation link status;
- unresolved evidence gaps;
- required disposition.

Completion requires zero duplicate IDs, zero unindexed packages, zero malformed
ledgers, zero missing companion links, and zero implementation claims whose
evidence chain terminates only in attestation or runtime observations.
