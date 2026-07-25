# AB30 corpus-candidate review workbench

This standalone Node.js workbench prepares independently reviewable candidates
for permanent code `AB30`, canonical identity
`ZoMarkedPerfectiveObjectVP`, and legacy runtime label
`PostverbalZoPerfectiveVP`.

Extraction is intentionally high recall. It is **not** linguistic validation,
an acceptability judgment, construction membership, evidence transfer, a
readiness/status/identity/promotion decision, or a runtime/release decision.
Parser matches and frequency are not used as linguistic evidence.

## Inputs and formats

`review-packets/corpus-review/AB30/source-allowlist.json` is the complete input
boundary. The CLI reads only its `sources` array and never searches the
repository for additional evidence. Each included source has:

- `path`: normalized repository-relative path;
- `format`: currently `text-lines`;
- `sourceType`: mechanical source classification;
- `inclusionReason`: why the primary source is eligible.

The same file inventories plausible but excluded files in `excludedSources`.
Each exclusion has a `reasonCode` and human-readable `reason`. Derived copies,
fixtures, generated diagnostics, survey material, grammar/documentation
examples, adjudication records, and synthetic tests are excluded.

`candidate-ledger.json` is canonical. Its record format is documented by
`candidate-ledger.schema.json`. Every review object starts as:

```json
{
  "classification": "unreviewed",
  "reviewerNote": "",
  "exclusionReason": ""
}
```

The only permitted classifications are `unreviewed`, `genuine`,
`false_positive`, `ambiguous`, and `unusable`. Notes and exclusion reasons are
optional strings. Reviewers may edit only the three fields under `review`.

Duplicate grouping never collapses records: every source occurrence remains a
candidate with its own stable ID and full-record provenance. Exact repeated
`matchedSurfaceSpan` values share a `duplicateGroupId`, even when their speaker
labels or surrounding source records differ.

The ledger also binds itself to the complete AB30 identity tuple, current
extraction-tool version, required evidence-boundary disclaimer, and a stable
semantic hash of the current allowlist. Validation rejects stale or altered
ledger-level provenance.

TSV uses a header row. Tabs, newlines, carriage returns, and backslashes inside
values are rendered as `\t`, `\n`, `\r`, and `\\`; empty values render as
`""`.

## Exact commands

From the repository root:

```bash
node tools/corpus-review/cli.js inventory
node tools/corpus-review/cli.js extract
node tools/corpus-review/cli.js validate
node tools/corpus-review/cli.js render
node --test tests/tooling/corpus-review/*.test.js
```

`inventory` refreshes `excluded-sources.json`. `extract` refreshes the canonical
ledger while preserving all existing review fields. It refuses to proceed if a
rerun would remove any candidate with a nonblank classification, reviewer note,
or exclusion reason. `validate` checks unique IDs, provenance, classifications,
content and span-based duplicate hashes, ledger metadata, reproducibility, and
summary accounting. `render` writes `candidates.json`, `candidates.tsv`, and
`summary.json` from the same validated canonical ledger.

Open `review-packets/corpus-review/AB30/viewer.html` directly in a browser and
choose `candidate-ledger.json`. The viewer uses only local browser APIs, offers
filtering and navigation, and never writes to project data. Review decisions
must be entered into a deliberate copy or the canonical ledger with a text
editor, then validated and rendered.

Rerunning extraction does not determine whether any candidate is genuine, does
not transfer evidence to a related construction, and does not complete the
AB30 corpus gate.

## Reusable HKCanCor query workbench

`hkcancor_workbench.py` is the shared deterministic engine for bounded
PyCantonese/HKCanCor query profiles. It is part of this corpus-review architecture;
construction-specific scripts define profiles and import the engine instead of
copying distribution verification, candidate provenance, output handling, or
decision-ledger validation.

Each `QueryProfile` defines:

- one query ID and stable candidate-ID namespace/prefix;
- a token predicate returning the exact matched span and ID anchor;
- preceding/following token-context sizes;
- JSON inventory, TSV inventory, and JSON summary filenames;
- the permanent construction identity;
- a summary builder for query-specific fields;
- an optional TSV renderer when the standard provenance columns are insufficient.

The engine loads PyCantonese lazily, requires the profile's frozen version
(`5.0.0` by default), verifies every HKCanCor source file against the one checked-in
SHA-256 allowlist, and rejects missing, extra, duplicate-named, or hash-drifted
files. Candidate records retain their stable ID, query namespace, exact text and
matched span, token/POS/Jyutping data, source file/hash, file/turn/token location,
participant metadata, previous/next utterance context, optional token context and
profile fields, and `REQUIRES_EXPERT_CONTEXT_REVIEW`.

Profiles call `profile_cli(...)` to expose the common `--output-dir`,
`--source-manifest`, optional `--decisions`, and `--check` interface. `--check`
renders in memory and fails if any committed output is missing or stale. Optional
decision validation requires complete one-to-one candidate accounting, a nonblank
review note, an exclusion-reason string, at least one claim relation, canonical
classification counts, and one of `genuine`, `false_positive`, `ambiguous`, or
`unusable`.

The existing AB30 `r` and `m` profiles use the shared engine without changing their
commands or outputs:

```bash
python external-evidence/ab30-hkcancor/query-hkcancor-ab30-zo-r.py \
  --following-pos r \
  --output-dir external-evidence/ab30-hkcancor \
  --source-manifest \
    external-evidence/cp021b/hkcancor-cp021b-source-manifest.sha256 \
  --check

python external-evidence/ab30-hkcancor/query-hkcancor-ab30-zo-r.py \
  --following-pos m \
  --output-dir external-evidence/ab30-hkcancor \
  --source-manifest \
    external-evidence/cp021b/hkcancor-cp021b-source-manifest.sha256 \
  --check

python -m unittest \
  tests/tooling/corpus-review/test_hkcancor_workbench.py
```

Query results remain mechanical candidate inventories. A profile, candidate count,
POS mapping, or successful check does not classify construction membership or
change evidence, readiness, status, identity, runtime, or release state.
