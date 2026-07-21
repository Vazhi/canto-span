# Canto Span v0.5.181 — lexicon verification checkpoint

Date: 2026-07-20

## Candidate state

- accepted baseline: **v0.5.180**
- active candidate: **v0.5.181**
- render: **pending, 12 rows**
- prospective held-out: **7 cases, sealed and unopened**
- parser behavior changed by this batch: **no**
- grammar status changed by this batch: **no**
- candidate scoring changed by this batch: **no**
- corpus promotion weight: **0**

## Completed batch

`WECHAT-GX-TRAVEL-002` lexicon/Jyutping R2 now provides:

- 39/39 item-level verification rows;
- 23-source bounded lexical register;
- 16 post-v0.5.181 patch targets;
- 32 planned positive/boundary probes;
- 7 source/regional deferrals;
- 4 polysemy/grammar deferrals;
- explicit preservation of existing `廣州` and temporal `跟住` entries;
- corrected `姨甥` reading **ji4 sang1**, with kinship gloss still quarantined.

## Validation

- item-level verification: **22/22 PASS**
- future patch blueprint: **20/20 PASS**
- current focused candidate: **19/19 PASS**
- aggregate regression: **545/545 PASS**
- runtime hash preservation: **PASS**
- evaluator custody: **sealed**

## Resume

The next required candidate action remains the user-rendered v0.5.181 diagnostic exports. The R2 lexical blueprint may be implemented only in a later semantic-versioned release after v0.5.181 is resolved.
