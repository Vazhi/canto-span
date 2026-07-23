# Research evidence-grade standard R1

## Purpose

Every source-verification row must state what kind of evidence it actually provides.
Verification status, source reputation, and evidence weight are related but not
interchangeable:

- a source may be authentic but still support only a lexical gloss;
- a corpus example may attest a form without establishing productivity;
- a dictionary may provide a useful example without supplying construction-level
  analysis;
- runtime output may expose a collision but can never prove the linguistic claim.

The canonical source-ledger header is:

```text
source_id	evidence_grade	verification	citation_and_locator	what_it_supports	limit	disposition
```

Use exactly one grade per source row. Do not combine grades with slashes, commas,
or ad hoc suffixes. Split materially different evidence functions into separate
rows when necessary.

The machine-readable vocabulary is
[`../../config/research-evidence-grades.json`](../../config/research-evidence-grades.json).

## Grades

### `DIRECT_SCHOLARLY_CORE`

Use for a peer-reviewed paper or chapter, academic dissertation or thesis, or
proceedings paper that directly analyzes the Cantonese construction or contrast.

It may qualify a promotion-style research disposition only for the exact claim,
profile, language variety, and boundary actually analyzed. Publication status does
not erase limitations in the source.

### `REFERENCE_GRAMMAR_CORE`

Use for a recognized Cantonese reference grammar that explicitly analyzes the
construction, profile, or boundary.

A pedagogical workbook is not automatically a reference grammar. Grade the exact
source function, not the publisher, author title, or reputation alone.

### `PRIMARY_CORPUS_ATTESTATION`

Use for a reproducible corpus release or checked extraction with an exact row,
utterance, context, and retrieval path.

This grade supports occurrence and contextual distribution. A corpus hit by itself
does not establish unrestricted productivity, categorical acceptability, complete
syntax, or semantic equivalence. Corpus evidence therefore does not independently
qualify a `PROMOTE_CORE` disposition.

### `CONTROLLED_JUDGMENT_EVIDENCE`

Use for a documented blinded panel, controlled experiment, or adjudicated
speaker-judgment dataset with instrument, participant-inclusion, item, and analysis
provenance.

One informal speaker comment, an unblinded consultation, or responses from a flawed
instrument do not receive this grade.

### `ATTESTATION_ONLY`

Use for a dictionary, lesson, drama, manual, media text, isolated example, or
similar source that supplies a real form or usage but does not directly establish
construction-level syntax, semantics, productivity, or boundaries.

These sources remain useful for discovery, lexical variation, example design, and
independent corroboration. They cannot be the sole support for a promotion-style
core claim.

### `LEXICAL_OR_PRONUNCIATION_ONLY`

Use when the source supports only word identity, reading, orthography, gloss,
lexical category, or pronunciation.

Do not promote a construction from lexical-entry evidence.

### `DISCOVERY_LEAD_ONLY`

Use when a source's bibliographic existence or search result is verified but its
substantive contents have not been inspected.

The row may record a recovery priority. It may not support examples, judgments,
analysis, or a substantive construction claim until the source is recovered and
regraded.

This eighth grade is necessary because the repository contains bibliographic leads
that are weaker than attestation and should not be silently inflated.

### `RUNTIME_OBSERVATION_ONLY`

Use for parser behavior, generated probes, diagnostics, test outcomes, or
implementation observations.

This grade always has zero linguistic-evidence weight. Its disposition must remain
collision-, audit-, or implementation-diagnostic only. It cannot use a promotion
or core-support disposition.

## Promotion rule

A `PROMOTE_*`, `DEDICATED_*_CORE`, `SUPPORTED_PRODUCTIVE`, or equivalent
promotion-style disposition requires at least one row graded:

- `DIRECT_SCHOLARLY_CORE`;
- `REFERENCE_GRAMMAR_CORE`; or
- `CONTROLLED_JUDGMENT_EVIDENCE`.

The qualifying row must support the exact promoted claim. The presence of one
strong source in a package does not automatically license every subtype described
in the note.

`PRIMARY_CORPUS_ATTESTATION` is strong occurrence evidence but does not by itself
authorize productivity. `ATTESTATION_ONLY`, `LEXICAL_OR_PRONUNCIATION_ONLY`,
`DISCOVERY_LEAD_ONLY`, and `RUNTIME_OBSERVATION_ONLY` never qualify a core
promotion.

## Verification versus grade

The `verification` column records what was checked, for example:

```text
VERIFIED_AUTHOR_FULL_TEXT_AND_DOI_METADATA
VERIFIED_LOCAL_CORPUS_CONTEXT
VERIFIED_CANTONESE_LEXICOGRAPHIC_RESOURCE
VERIFIED_BIBLIOGRAPHIC_EXISTENCE_ONLY
VERIFIED_DIRECT_LOCAL_OBSERVATION
```

The `evidence_grade` column records the evidential role. Do not infer one from the
other silently. Two rows with the same verification status may receive different
grades because they support different claims.

## Required limitations

Every row must state its limitation. Typical limits include:

- no unrestricted productivity claim;
- one variety or historical period only;
- one lexical frame only;
- occurrence but not acceptability;
- lexical meaning but not construction analysis;
- bibliographic existence only;
- runtime observation with zero linguistic weight.

A blank or generic limitation such as `none` is not acceptable.

## Transitional migration

Existing ledgers without an `evidence_grade` column are enumerated in
`config/research-provenance-baseline.json`. They remain visible warnings rather
than silent exemptions.

Rules during migration:

1. New ledgers must use the canonical graded header.
2. Any newly modified source ledger should be migrated in the same change when the
   grading can be performed accurately.
3. Do not mass-assign grades from keyword matching.
4. Read the cited source function and the row's exact claim before grading it.
5. Remove an ID from the ungraded baseline as soon as its complete ledger is
   migrated.
6. Step 4 prioritizes weak recent PRQ2 units, then legacy schemas, then the remaining
   historical packages.

## Examples

```text
SRC-PAPER-001	DIRECT_SCHOLARLY_CORE	VERIFIED_AUTHOR_FULL_TEXT	Author 2024, pp. 12-18; DOI ...	Directly analyzes the construction and supplies controlled contrasts.	One regional variety; does not establish all complements.	PROMOTE_BOUNDED_CORE
```

```text
SRC-HKCANCOR-001	PRIMARY_CORPUS_ATTESTATION	VERIFIED_LOCAL_CORPUS_CONTEXT	HKCanCor row HKC-...; local path ...	Attests the exact surface in spontaneous conversation.	One occurrence; zero independent productivity weight.	SUPPORT_ATTESTATION_ONLY
```

```text
SRC-DICTIONARY-001	ATTESTATION_ONLY	VERIFIED_CANTONESE_LEXICOGRAPHIC_RESOURCE	Dictionary entry URL ...	Supplies one modern example.	No construction-level analysis or frequency evidence.	USE_AS_CORROBORATION_ONLY
```

```text
SRC-LEAD-001	DISCOVERY_LEAD_ONLY	VERIFIED_BIBLIOGRAPHIC_EXISTENCE_ONLY	Author 1996, title, journal issue ...	Identifies a specialist source for recovery.	Full text unavailable; no substantive claim imported.	HIGH_PRIORITY_SOURCE_RECOVERY_LEAD_ONLY
```

```text
RUNTIME-001	RUNTIME_OBSERVATION_ONLY	VERIFIED_DIRECT_LOCAL_OBSERVATION	Runtime 0.5.213 probe, rows 1-8	Documents current false coverage.	Zero linguistic-evidence weight.	USE_FOR_COLLISION_AUDIT_ONLY
```
