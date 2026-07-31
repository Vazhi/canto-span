# Glossika Cantonese A1 dialog 007 corpus package

- Source ID: `GLOSSIKA-YUEHK-A1-DLG-007-20260111`
- Title: 週末計劃
- English title: Weekend Plans
- Source date: 2026-01-11
- Gmail message: `19baf2034d90f4e4`
- Intake issue: #143
- Work claim: #318
- Records: 40 dialog turns + 40 vocabulary entries = 80
- Source payload hash: `sha256:d4ddbf74f04134744eaa5aac9b6f165f25d9f09c7148a5d3ac325e612a068754`

## Source fidelity

The interactive-dialog email format omits speaker-name prefixes from romanization lines and preserves source-authored Latin tokens such as `OK` and `A`. Cantonese, punctuation, romanization, vocabulary order, and glosses are preserved. The source contains no per-turn English translations; turn records retain `english: null`.

## Source-block audit

3 vocabulary surfaces are absent from the dialog by exact string matching and remain immutable glossary records. The dialog keeps `OK` as Latin script while the glossary gives `ou1 kei1`; both source forms are preserved and flagged.

## Modular ownership

Canonical runtime ownership comes from `src/**` and `src/runtime-resources/**`. Generated `main.js` is excluded.

No parser, lexicon, identity/status, survey, version, release, or deployment change is included.
