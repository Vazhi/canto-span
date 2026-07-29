# Glossika Cantonese (HK) A1 Week 17 corpus reconciliation

- Source ID: `GLOSSIKA-YUEHK-A1-W17-20260712`
- Lesson: Emotions & States
- Source date: 2026-07-12
- Gmail message: `19f5511dfc37c9ea`
- Intake issue: #134
- Work claim: #276
- Pull request: #277
- Source records: 75
- Source payload hash: `sha256:1ece0875ae59d215fbc1f09ad8b5b648ad80e448fadaf89d72f019208be28ea7`

## Preserved source structure

- 8 functional-language sentences
- 32 emotion/state lexical rows, including repeated 攰, 嬲, and 驚 rows
- 10 number entries
- 4 situation sentences
- 5 dialog turns
- 8 source-labeled preposition entries
- 2 preposition example sentences
- 6 phonics pairs

## Reconciliation

The package crosswalks every source row to existing `test-data/w17-*` records and current modular owners. It preserves five project-created naturalized alternatives as project-only records. Existing project corrections and lifecycle states remain unchanged.

## Architecture boundary

`src/**` and `src/runtime-resources/**` are canonical runtime inputs. `main.js` is generated and is not an ownership source. This corpus-only package does not regenerate or modify the runtime bundle.
