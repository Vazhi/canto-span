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
