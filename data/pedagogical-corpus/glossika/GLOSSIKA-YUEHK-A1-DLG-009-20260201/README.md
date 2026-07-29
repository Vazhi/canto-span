# Glossika Cantonese A1 dialog 009 corpus package

- Source ID: `GLOSSIKA-YUEHK-A1-DLG-009-20260201`
- Title: 辦公室指示
- English title: Office Instructions
- Source date: 2026-02-01
- Gmail message: `19c1b38474acaadb`
- Intake issue: #145
- Work claim: #324
- Records: 40 dialog turns + 40 vocabulary entries = 80
- Source payload hash: `sha256:da9f05195c7becc7231dbe6c2555a6f2e382a5bb6fc4b73e03cc72816050f6e1`

## Source fidelity

The interactive-dialog email format omits speaker-name prefixes from romanization lines and preserves the source-authored Latin tokens `send` and `email`. Cantonese, punctuation, romanization, vocabulary order, and glosses are preserved. The source contains no per-turn English translations; turn records retain `english: null`.

## Source-block and romanization audit

2 vocabulary surfaces are absent from the dialog by exact string matching and remain immutable glossary records. Turn 6 writes `嘅` but gives `gaa3`; the glossary lists `嘅 /ge3/`. All source values are preserved and flagged.

## Modular ownership

Canonical runtime ownership comes from `src/**` and `src/runtime-resources/**`. Generated `main.js` is excluded.

No parser, lexicon, identity/status, survey, version, release, or deployment change is included.
