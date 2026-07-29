# Glossika Cantonese A1 dialog 008 corpus package

- Source ID: `GLOSSIKA-YUEHK-A1-DLG-008-20260125`
- Title: 借嘢
- English title: Borrowing Things
- Source date: 2026-01-25
- Gmail message: `19bf72ba0f4339e0`
- Intake issue: #144
- Work claim: #322
- Records: 40 dialog turns + 40 vocabulary entries = 80
- Source payload hash: `sha256:030f3c5352ca69ca415bf7bc127ecab5d8d736b8ad5eb2d4daa1368803d900b9`

## Source fidelity

The interactive-dialog email format omits speaker-name prefixes from romanization lines. Cantonese, punctuation, romanization, vocabulary order, and glosses are preserved. The source contains no per-turn English translations; turn records retain `english: null`.

## Source-block and orthography audit

8 vocabulary surfaces are absent from the dialog by exact string matching and remain immutable glossary records. The dialog writes the giving verb as `俾`, while the glossary lists `畀`; both source values and the shared `bei2` romanization are preserved and flagged.

## Modular ownership

Canonical runtime ownership comes from `src/**` and `src/runtime-resources/**`. Generated `main.js` is excluded.

No parser, lexicon, identity/status, survey, version, release, or deployment change is included.
