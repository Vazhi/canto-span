# Glossika Week 17 corpus reconciliation

- Source ID: `GLOSSIKA-YUEHK-A1-W17-20260712`
- Intake: #134
- Work claim: #276
- Status: source-preserving reconciliation complete; no runtime or promotion change

## Result

- 75 ordered source records
- 72 unique source surfaces
- 19 sentence/dialog records crosswalked to `COR-W17-*`
- 42 lexical source rows crosswalked to 39 unique `LEX-W17-*` records
- 8 grammar phrases crosswalked to `GRAM-W17-*`
- 6 phonics pairs crosswalked to `PHO-W17-*`
- 5 project-only `ALT-W17-*` alternatives retained as source-missing project records
- Source payload hash: `sha256:d77d0f434e78551d460f2f783e970fb94ec5eb1aef06d6097fe88b830ff2005b`

## Modular ownership

The reconciliation uses current source-first ownership. `src/**` and `src/runtime-resources/**` are canonical runtime inputs; `main.js` is generated and excluded. Sentence lifecycle and semantic review come from the existing `test-data/w17-*` files and `review-only-readiness.tsv`. The Week 17 lexical block is owned by `src/runtime-resources/lexicon/token-lexicon/referents-and-boundaries.js`.

## Reconciliation classes

`{"exact_duplicate":75,"normalized_duplicate":0,"partial_match":0,"new_attestation":0,"source_internal_duplicate_occurrence":3,"project_only_item":5,"missing_source_item":5,"pronunciation_discrepancy":1,"pronunciation_review_unresolved":1,"translation_difference":2,"morpheme_gloss_discrepancy":1}`

All 75 source records have exact-surface project matches. Three source rows repeat earlier lexical items. Five naturalized alternatives exist only in the project and are not rewritten into the source layer.

## Preserved discrepancies

- Source 喇 glossed as perfective versus the project-reviewed sentence-final-particle analysis.
- 好奇 source pronunciation remains externally unresolved.
- Source 闊 `kut3` versus project-reviewed `fut3`.
- The phonics heading does not transparently describe every row.
- Repeated 驚 broadens its English gloss from “scared” to “scared / surprised.”

## Protected state

Existing Week 17 corpus verdicts, lifecycle states, canonical lexicon entries, grammar identities, parser behavior, surveys, versioning, release state, and deployment artifacts remain unchanged.
