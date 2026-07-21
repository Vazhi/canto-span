# Canto Span v0.5.181 corpus addendum

The v0.5.181 parser candidate remains render-pending and behaviorally unchanged.

Added `WECHAT-GX-TRAVEL-002` from a user-supplied native family conversation:

- 12 normalized turns;
- 52 stable parser-facing units;
- untouched raw STT retained for provenance;
- uncertain STT spans excluded from parser-facing units;
- `吳嘉敏` preserved as the user-confirmed proper name;
- no grammar status, parser rule, lexicon entry, fixture, or held-out custody changed.

The corpus is natural-attestation and evaluation material only. It has no direct grammar-acceptance effect.

## Validation

- corpus ingestion audit: **PASS**
- current focused candidate gate: **19/19 PASS**
- source accounting and research retention: **PASS**, 473 rows
- documentation consistency: **PASS**, zero broken links
- runtime files: byte-identical to the prior v0.5.181 snapshot
## Unit adjudication

All 52 high-confidence parser-facing units have now been individually adjudicated against the frozen v0.5.181 runtime. Queue membership overlaps:

- accepted-behavior regression or remediation: **16** units;
- lexicon/Jyutping enrichment: **32** units;
- context/disfluency research: **40** units;
- grammar research requiring external evidence: **46** units.

Primary dispositions are 30 grammar-research units, 9 context/disfluency units, 7 lexicon units, and 6 regression/remediation units. Only two are immediately clean regression fixtures; three additional units are deliberately review-bearing boundary fixtures. No unit changes grammar status or supplies productive-promotion weight.

High-priority research clusters include object-topic negation, `早知…咪…` hindsight, `冇去到` versus `冇得去`, duration expressions, objectless `食完`, and natural motion/purpose chains. The duration and completion units are explicitly excluded from the accepted simple V+咗+overt-object subtype, and the corpus contains no V完咗O example.

