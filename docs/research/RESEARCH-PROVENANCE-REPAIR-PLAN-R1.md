# Research provenance repair plan R1

## Purpose

Repair the gap between **having a citation trail** and **having direct linguistic
evidence**. The repository must preserve exact claim-to-source links, distinguish
research from attestations and runtime observations, and prevent a research unit
from appearing implementation-ready when its core rests only on dictionaries,
lessons, scripts, or generated probes.

This plan changes no parser behavior or construction status by itself.

## Step 1 — restore provenance integrity

Status: **completed on `agent/research-provenance-repair`**.

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

Exit gate:

- every canonical research ID identifies one package;
- every indexed package has a same-ID main note, source ledger, and collision
  audit;
- file names, frontmatter IDs, internal companion links, and index IDs agree.

## Step 2 — add a mechanical research-provenance verifier

Create `tools/verify-research-provenance.js` and include it in the research and
full verification profiles.

The verifier must fail on:

- duplicate UC-RQ or PRQ2 IDs;
- an indexed package missing any member of the three-file package;
- a package absent from the canonical index;
- filename, frontmatter, heading, companion-link, or runtime-row ID mismatch;
- malformed source-verification headers;
- a source row with no stable citation or locator;
- a runtime observation presented as linguistic evidence;
- a `PROMOTE_*`, `DEDICATED_*_CORE`, or equivalent disposition unsupported by
  at least one qualifying direct-evidence row;
- external URLs that are syntactically malformed or use an unapproved file
  mirror when an official source is required.

The verifier should emit a machine-readable report under `validation/current/`
and a concise terminal summary.

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

- Add the new verifier to `verify:research` and therefore `verify:all`.
- Add fixture tests for duplicate IDs, missing companions, weak-core promotion,
  runtime-evidence misuse, and malformed source rows.
- Document the gate in `docs/current/TESTING.md` and the research README.
- Keep network availability out of the deterministic local gate; URL reachability
  should be a separate scheduled or manual audit with cached results.

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
ledgers, and zero implementation claims whose evidence chain terminates only in
attestation or runtime observations.
