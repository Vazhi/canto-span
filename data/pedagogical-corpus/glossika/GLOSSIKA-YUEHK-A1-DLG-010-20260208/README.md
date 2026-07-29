# Glossika Cantonese A1 dialog 010 corpus package

- Source ID: `GLOSSIKA-YUEHK-A1-DLG-010-20260208`
- Title: 你覺得呢間餐廳點樣
- English title: What Do You Think of This Restaurant
- Source date: 2026-02-08
- Gmail message: `19c3f44af6d8071d`
- Intake issue: #146
- Work claim: #327
- Records: 40 dialog turns + 40 vocabulary entries = 80
- Source payload hash: `sha256:3dec4a6f3ff3dbd0890fd7be02c9c55116fc1ab7a3b840e19bfa0842ad177563`

## Source fidelity

The interactive-dialog email format omits speaker-name prefixes from romanization lines. Cantonese, punctuation, romanization, vocabulary order, and glosses are preserved. The source-authored forms `Book` and `OK` remain in the Cantonese fields, with `book1` and `ok1` in romanization. The source contains no per-turn English translations; turn records retain `english: null`.

## Source-block audit

5 vocabulary surfaces are absent from the dialog by exact string matching and remain immutable glossary records: `點樣`, `下次`, `定`, `唔該`, `冇問題`.

## Modular ownership

Canonical runtime ownership comes from `src/**` and `src/runtime-resources/**`. Generated `main.js` is excluded.

No parser, lexicon, identity/status, survey, version, release, or deployment change is included.
