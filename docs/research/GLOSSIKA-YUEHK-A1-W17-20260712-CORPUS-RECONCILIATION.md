# Glossika Week 17 corpus reconciliation

- Source ID: `GLOSSIKA-YUEHK-A1-W17-20260712`
- Intake: #134
- Work claim: #276
- PR: #277
- Status: source preserved and reconciled; no runtime or promotion change

## Result

- 75 source records preserved in email order.
- 3 repeated source lexical rows retained rather than silently deduplicated.
- 19 sentence/dialog records crosswalked to the existing corpus and semantic-disposition files.
- 50 source lexical rows crosswalked to the 59-entry deduplicated project lexicon, including grammar and phonics records where relevant.
- 6 phonics pairs crosswalked to reviewed project pairs.
- 5 naturalized alternatives retained as project-only records with no source-row claim.
- Crosswalk classifications: `{"exact_duplicate":3,"normalized_duplicate":50,"partial_match":22}`.
- Discrepancy flags: `{"project_review_note":23,"pronunciation_discrepancy":1,"translation_discrepancy":22}`.
- Unmatched source rows: 0.

## Key discrepancies

- Source duplicates: 攰, 嬲, and 驚 occur twice; project lexicon records merge them.
- Gloss expansion: several project lexical glosses add reviewed senses that are not present in the source wording.
- Source/project translation wording differs for some complete sentences without changing the preserved Cantonese source.
- The source gives `闊 kut3`; the reviewed project record gives `闊 fut3`.
- The source labels all eight grammar-table items as prepositions even though current project records preserve multifunctional lexical categories and contextual roles.
- Five naturalized alternatives are project-only and must not be represented as original Glossika rows.

## Modular ownership

Crosswalk ownership is resolved only against current `src/**` and `src/runtime-resources/**` paths. Existing sentence-level parser paths are recorded as candidate owners derived from reviewed utterance types; they are not new identity or promotion decisions. Generated `main.js` is excluded throughout.

## Stop boundary

No parser behavior, runtime lexicon, generated bundle, construction identity/status, existing Week 17 review decision, evidence classification, survey, native panel, version, release, or deployment state changed.
