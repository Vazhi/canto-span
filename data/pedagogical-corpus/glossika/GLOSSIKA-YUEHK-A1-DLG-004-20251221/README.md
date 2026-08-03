# Glossika Cantonese A1 Dialog 004 — reviewed corpus package

Source ID: `GLOSSIKA-YUEHK-A1-DLG-004-20251221`
Title: `想走但唔想失禮`

## Completed review

- 88 reviewed records and **0 unreviewed records**.
- 41 spoken turns, 3 stage directions, and 44 vocabulary records remain source-preserved.
- 3 exact and 2 normalized source-record duplicates were accepted.
- 39 lexical attestations, 27 new dialog/stage attestations, and 17 unresolved contextual-naturalness candidates remain.
- All 44 events preserve event adjacency; all 41 spoken turns separately preserve spoken-turn adjacency across stage directions.
- Event-level English was not supplied and remains `null`; no translation was invented.
- Provider grammar, Mandarin-comparison, cultural, and confidence notes remain metadata rather than evidence.
- Fifteen durable routes are owned by issue #494.

## Files

- `source.json` and `items.tsv` — immutable source archive.
- `crosswalk.json` — retained original mechanical ingress report.
- `mechanical-cross-reference-r1.json` — deterministic current source-record candidates and route links.
- `review.json` and `expert-review-r1.tsv` — terminal expert dispositions.
- `dialog-context-routing-r1.json` — contextual, source-alert, aggregate, stage-direction, and dual-adjacency routing.
- `package-integrity-r1.json` — immutable local source bindings.
- `research-summary.md` — evidence boundary and final counts.

## Verification

```bash
npm run verify:pedagogical-corpus-review
python3 tests/tooling/research/pedagogical-corpus-review.test.py
```

No parser behavior, runtime lexicon, construction identity/status, survey, release, or deployment state is authorized by this package.
