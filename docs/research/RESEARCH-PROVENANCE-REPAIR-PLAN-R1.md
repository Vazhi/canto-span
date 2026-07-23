# Research provenance repair plan R1

## Purpose

Repair the gap between **having a citation trail** and **having direct linguistic
evidence**. The repository must preserve exact claim-to-source links, distinguish
research from attestations and runtime observations, and prevent a research unit
from appearing implementation-ready when its core rests only on dictionaries,
lessons, scripts, or generated probes.

This plan changes no parser behavior or construction status by itself.

## Step 1 — restore provenance integrity

Status: **ID and canonical-index repair completed; six pre-existing companion-link
omissions remain explicitly baselined for later normalization.**

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

Status: **completed and integrated into research verification.**

Implemented:

- `tools/research-provenance-lib.js`;
- `tools/verify-research-provenance.js`;
- `tools/test-research-provenance.js`;
- `config/research-provenance-baseline.json` for explicitly enumerated existing
  debt only;
- research-profile integration through `config/verification-profiles.json`;
- `.github/workflows/research-provenance.yml` for branch and pull-request CI;
- machine-readable output at
  `validation/current/research-provenance.json`.

The verifier fails on:

- duplicate UC-RQ or PRQ2 IDs;
- an indexed package missing any member of its package;
- a package absent from the canonical index;
- filename, frontmatter, or heading ID mismatch;
- a new missing main-note companion link;
- an unrecognized or newly introduced source-verification schema;
- a source row with an empty or placeholder citation/locator;
- a runtime observation presented as linguistic evidence;
- a new PRQ2 promotion-style disposition unsupported by qualifying direct
  evidence.

The verifier recognizes source and collision filenames explicitly cited by a main
note rather than assuming every companion repeats the entire main-note slug.
Historical schemas remain explicit baseline warnings; new schema drift fails.

## Step 3 — formalize evidence grades

Status: **implemented.**

Implemented:

- machine-readable vocabulary in
  `config/research-evidence-grades.json`;
- documented standard in
  `docs/research/RESEARCH-EVIDENCE-GRADE-STANDARD-R1.md`;
- canonical graded ledger header:

  ```text
  source_id	evidence_grade	verification	citation_and_locator	what_it_supports	limit	disposition
  ```

- verifier enforcement for missing, unknown, or inconsistent grades;
- 13 focused provenance fixtures;
- explicit baseline for the remaining pre-grade ledgers;
- first complete migration: PRQ2-006 continuative `落去`.

The eight evidence grades are:

1. `DIRECT_SCHOLARLY_CORE`
2. `REFERENCE_GRAMMAR_CORE`
3. `PRIMARY_CORPUS_ATTESTATION`
4. `CONTROLLED_JUDGMENT_EVIDENCE`
5. `ATTESTATION_ONLY`
6. `LEXICAL_OR_PRONUNCIATION_ONLY`
7. `DISCOVERY_LEAD_ONLY`
8. `RUNTIME_OBSERVATION_ONLY`

Promotion-style dispositions require at least one row graded:

- `DIRECT_SCHOLARLY_CORE`;
- `REFERENCE_GRAMMAR_CORE`; or
- `CONTROLLED_JUDGMENT_EVIDENCE`.

`PRIMARY_CORPUS_ATTESTATION` may support occurrence and distribution but does not
independently authorize productivity. The remaining grades never qualify a core
promotion.

PRQ2-006 is the first model migration:

- Yiu 2016: `DIRECT_SCHOLARLY_CORE`;
- Matthews and Yip: `REFERENCE_GRAMMAR_CORE`;
- Words.hk: `ATTESTATION_ONLY`;
- runtime probes: `RUNTIME_OBSERVATION_ONLY`.

The baseline is not an exemption. New ledgers must use the graded schema, and an ID
must be removed from the ungraded baseline immediately after its complete ledger is
reviewed and migrated.

## Step 4 — backfill or downgrade weak recent PRQ2 units

Audit these units first:

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
5. narrow or downgrade every claim not supported by stronger evidence;
6. grade every ledger row according to its actual evidential function;
7. remove the package from the ungraded baseline;
8. preserve unresolved speaker, regional, register, prosodic, and productivity
   boundaries for panel testing.

PRQ2-012 `一係…一係…` is **not** treated as a positive control for the paired
construction merely because its ledger contains a scholarly source and corpus
attestations. The scholarly row supports lexical category, while the adult corpus
supports occurrence. Step 4 must regrade it by exact claim and either locate direct
paired-construction analysis or narrow the disposition.

PRQ2-006 is the current positive model because its direct scholarly and
reference-grammar sources explicitly analyze continuative `落去`.

## Step 5 — audit implementation-to-research links

Review every commit that changed runtime behavior, grammar status, or executable
fixtures after the research-first policy began.

For each changed construction require:

- explicit source IDs in the canonical construction note;
- an exact claim supported by those sources;
- positive and negative/boundary fixtures tied to the sourced claim;
- no reliance on a research note that states implementation is unauthorized;
- no promotion based solely on runtime coverage, generated probes, dictionaries,
  pedagogical examples, or corpus occurrence alone.

Unsupported implementation must be narrowed, quarantined, retired, or reverted;
it must not be grandfathered merely because tests pass.

## Step 6 — integrate the gate into normal verification

Mechanical integration is complete through Step 3. Remaining work:

- document the gate in `docs/current/TESTING.md` and the research README;
- remove baseline entries as each historical package is normalized;
- extend fixtures when new grade/disposition conflicts are discovered;
- keep network availability out of the deterministic local gate;
- run URL reachability as a separate scheduled or manual audit with cached
  results.

## Step 7 — issue a final provenance report

Produce a repository-wide table containing:

- research ID and construction;
- package completeness;
- strongest evidence grade;
- direct scholarly source count;
- reference-grammar source count;
- primary corpus source count;
- controlled-judgment source count;
- attestation-only source count;
- implementation link status;
- unresolved evidence gaps;
- required disposition.

Completion requires zero duplicate IDs, zero unindexed packages, zero malformed
ledgers, zero missing companion links, zero ungraded ledgers, and zero
implementation claims whose evidence chain terminates only in attestation, corpus
occurrence, discovery leads, or runtime observations.
