# Evidence and provenance

## Evidence classes

### External proposition evidence

A source must be represented by proposition-level records with exact locators. Each relationship must be classified as positive support, restriction, contradiction, competing analysis, surface attestation, or contextual background. Only scope-matched positive support contributes to promotion.

### Natural attestation evidence

A natural attestation must preserve enough context and provenance to establish that the example was not generated for the parser. Independence is evaluated by evidence unit, source lineage, speaker or producer, and document relationship—not by URL count alone.

Natural attestations can support occurrence and bounded variation. They do not independently prove the parser's node boundaries or unrestricted productivity.

### Native-speaker evidence

Native-speaker judgments are stored separately from parser-analysis judgments. Record speaker variety, task, context, prompt, response, correction, and uncertainty where available. Negative judgments trigger the conflict burden in `DOCTRINE.md`; unchecked or positive surface judgments do not automatically validate a structural parse.

### Corpus evidence

Corpus evidence is used to find natural examples, distributions, near misses, lexical restrictions, and parser errors. Candidate retrieval is not accepted evidence until manually adjudicated. Project-internal corpora retain the promotion weight assigned in their adjudication records; `WECHAT-GX-TRAVEL-002` currently has zero grammar-promotion weight.

### Internal evidence

Fixtures, generated probes, parser outputs, render packets, regression tests, and held-out evaluation measure implementation behavior. They never establish Cantonese grammar.

## Independence and counting

- Reprints, copied examples, mirrors, shared datasets, or sources relying on the same original evidence are not independent units.
- A source can contribute different relationship types, but boundary or competing-analysis rows cannot be counted as positive support.
- Source counts without scoped propositions and limitations are invalid.
- Held-out cases, render cases, and generated examples cannot be recycled as natural attestations.

## Current accounting

The exact mutable counts are owned by [`PROJECT-STATE.md`](PROJECT-STATE.md). The current evidence inventory accounts for all 179 active labels: 158 externally mapped language labels, one explicit source-gap quarantine (`ScalarRangeFragment`), and 20 internal representation or heuristic labels. External mapping does not imply productive support.

## Canonical records

- [`../research/CURRENT-RESEARCH-PROVENANCE.md`](../research/CURRENT-RESEARCH-PROVENANCE.md) — current evidence entry point.
- `../research/PARSER-CONSTRUCTION-SOURCE-REGISTER-CP021B-R37.tsv` — source identities and locators.
- `../research/PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R37.tsv` — proposition-level relationships and forbidden inferences.
- `../research/PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R37.tsv` — active-label coverage.
- `../research/ACTIVE-SOURCE-ACCOUNTING-v0.5.182.tsv` — current per-label accounting.
- `../../test-data/grammar-claim-source-edges-CP021A.tsv` — explicit claim-source edges.
- `../../test-data/grammar-authority-origin-CP021B.tsv` — source-originated design records.
- `../../test-data/grammar-legitimacy-audit.tsv` — controlled claim types and statuses.
- `../../test-data/native-speaker-naturalness-evidence-v1.tsv` — native naturalness evidence.
- `../research/CP021B-CONTRADICTION-REGISTER.tsv` — contradiction records.

The accepted v0.5.182 source dossier and natural-attestation adjudication remain under `docs/research/`. Their scope is summarized in the acceptance record; operational status is owned by `PROJECT-STATE.md`.
