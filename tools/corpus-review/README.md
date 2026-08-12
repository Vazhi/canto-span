# Corpus candidate review workbenches

Canto Span corpus tooling separates deterministic high-recall extraction from expert
linguistic classification. Extraction prepares provenance-rich candidates; it does
not validate grammaticality, construction membership, evidence sufficiency,
productivity, identity, status, readiness, runtime behavior, survey state, or
release state.

## Shared rules

Every corpus task must preserve:

- one explicit source allowlist or frozen distribution manifest;
- one stable query ID and candidate-ID namespace;
- exact source text and matched span;
- source path or file, content hash, and location indices;
- surrounding utterance or token context;
- duplicate-group information without collapsing source occurrences;
- available participant, token, POS, and Jyutping metadata;
- deterministic JSON, TSV, and summary rendering;
- an explicit expert-review-required state.

Fixtures, generated diagnostics, survey material, grammar examples, documentation
quotations, adjudication records, and derived duplicates are excluded unless the
specific task explicitly claims them as its object of study.

Every candidate used as evidence must later be classified as `genuine`,
`false_positive`, `ambiguous`, or `unusable`, with complete one-to-one accounting.
Frequency and successful extraction never establish membership.

## AB30 repository-source workbench

The Node.js workbench under `tools/corpus-review/` prepares independently reviewable
candidates for `AB30 ZoMarkedPerfectiveObjectVP`, legacy runtime label
`PostverbalZoPerfectiveVP`.

`review-packets/corpus-review/AB30/source-allowlist.json` defines the complete input
boundary. `candidate-ledger.json` is canonical and conforms to
`candidate-ledger.schema.json`. Duplicate groups never collapse records; every
source occurrence retains its own stable ID and provenance.

Review fields begin as:

```json
{
  "classification": "unreviewed",
  "reviewerNote": "",
  "exclusionReason": ""
}
```

Reviewers edit only the review fields. The CLI validates provenance, stable IDs,
content and span hashes, classifications, duplicate accounting, and deterministic
rendering.

From the repository root:

```bash
node tools/corpus-review/cli.js inventory
node tools/corpus-review/cli.js extract
node tools/corpus-review/cli.js validate
node tools/corpus-review/cli.js render
node --test tests/tooling/corpus-review/*.test.js
```

`inventory` refreshes excluded-source accounting. `extract` refreshes the canonical
ledger while preserving completed review fields and refuses to remove a reviewed
candidate. `render` writes derived JSON, TSV, and summary outputs from the validated
ledger.

The local viewer reads a selected ledger with browser APIs and never writes project
data. Review decisions must be saved deliberately and revalidated.

## Reusable HKCanCor workbench

`tools/corpus-review/hkcancor_workbench.py` is the shared deterministic engine for
construction-specific PyCantonese/HKCanCor profiles. Profiles import the engine
instead of duplicating source verification, provenance, stable-ID generation,
output handling, or decision-ledger validation.

Each `QueryProfile` defines:

- one query ID and candidate-ID namespace/prefix;
- an exact token predicate and matched span;
- the ID anchor and any overlap-deduplication key;
- context-window sizes;
- JSON inventory, TSV inventory, and summary filenames;
- the permanent construction identity tuple;
- query-specific summary and optional TSV rendering.

The engine loads PyCantonese lazily, requires the frozen version specified by the
profile (`5.0.0` by default), and verifies every source file against the checked-in
SHA-256 manifest. It rejects missing, extra, duplicate-named, or hash-drifted files.

Candidate records preserve stable ID, query namespace, exact text and span,
token/POS/Jyutping data, source file and hash, file/turn/token indices, participant
metadata, previous and next utterances, optional token windows and profile fields,
and `REQUIRES_EXPERT_CONTEXT_REVIEW`.

Common profile options are:

```text
--output-dir
--source-manifest
--check
--decisions     # only when a complete expert decision ledger exists
```

`--check` renders in memory and fails when a committed output is missing or stale.
Decision validation requires one decision per candidate, canonical classification
counts, a reviewer note, an exclusion-reason string, and at least one claim relation.

Construction-specific scripts and exact profile names live under
`external-evidence/<construction>-hkcancor/`. Use the command recorded by that
profile or its intake issue; do not substitute another construction's surface query.

## Lexical POS evidence packets

Cifu top-frequency lexical POS review uses the same frozen HKCanCor source boundary
but has a separate evidence contract because it compares corpus annotations with the
runtime surface-to-analyses index rather than classifying membership in one
construction.

See
[`docs/research/CIFU-LEXICAL-POS-EVIDENCE-CONTRACT.md`](../../docs/research/CIFU-LEXICAL-POS-EVIDENCE-CONTRACT.md).
The contract requires every rank-band packet to preserve raw HKCanCor POS/Jyutping
evidence, derive a parallel Universal Dependencies POS projection mechanically with
PyCantonese 5.0.0 `hkcancor_to_ud()`, retain current runtime analyses, and provide
deterministic context for every observed surface × raw-POS × Jyutping bucket plus
explicit zero-hit rows.

The UD projection is a lossy navigation layer only. It may not replace raw HKCanCor
tags or determine Canto Span lexical labels, POS, syntax, senses, analysis splits,
parser behavior, or evidence sufficiency.

## Local corpus-dependent execution

When ChatGPT can prepare and review a profile but cannot execute the frozen local
corpus distribution, use this bounded workflow:

1. Keep the parent repository intake owned by ChatGPT.
2. Create the work claim, branch, query profile, and focused tests first.
3. Create one human-action issue containing exact copy-paste commands, expected
   outputs, branch name, and safe completion evidence.
4. The user runs generation, deterministic `--check`, focused tests, and requested
   repository verification locally.
5. The user stages and pushes only the claimed generated outputs.
6. Untracked `validation/current/` byproducts remain local and are not committed.
7. ChatGPT validates the exact pushed head, output summary, hashes, counts,
   changed-file scope, and GitHub checks.
8. Close the human action without transferring the parent issue, expert
   classification, PR readiness, or merge authority.

The human execution step supplies local access and command output only. It does not
classify candidates or establish evidence.

## Interpretation boundary

A profile, candidate count, POS distribution, source coverage statistic, local run,
passing test, deterministic check, or merged inventory changes no construction
membership, evidence, readiness, status, identity, runtime, survey, release, or merge
state. Those require their own explicitly claimed expert and governance steps.
