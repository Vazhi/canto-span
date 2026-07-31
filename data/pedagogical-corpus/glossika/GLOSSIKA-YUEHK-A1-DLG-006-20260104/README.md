# Glossika Cantonese A1 dialog 006 corpus package

- Source ID: `GLOSSIKA-YUEHK-A1-DLG-006-20260104`
- Title: 將來想做乜？
- English title: What Do You Want to Do in the Future?
- Source date: 2026-01-04
- Gmail message: `19b8b06b61f9e2e1`
- Intake issue: #142
- Work claim: #298
- Records: 40 dialog turns + 40 vocabulary entries = 80
- Source payload hash: `sha256:725f276b9aab114e53349bb8a119e8ea631ae6a7eeb8d6178680482f0a45a2a0`

## Source fidelity

The newer email format uses Jyutping without speaker-name prefixes and preserves proper-name casing such as YouTube. Cantonese, punctuation, romanization, vocabulary order, and glosses are preserved. The source contains no per-turn English translations; turn records retain `english: null`.

## Source-block audit

12 vocabulary surfaces are absent from the dialog by exact string matching. They remain immutable glossary records. The dialog/glossary pronunciation difference for 嘩 (`waa3` versus `waa1`) is flagged without correction.

## Modular ownership

Canonical runtime ownership comes from `src/**` and `src/runtime-resources/**`. Generated `main.js` is excluded.

No parser, lexicon, identity/status, survey, version, release, or deployment change is included.
