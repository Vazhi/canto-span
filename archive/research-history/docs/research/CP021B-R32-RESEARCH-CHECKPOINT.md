# Canto Span research checkpoint — CP021B-R32

Date: 2026-07-19

## Result

Claim-level mapping is complete for nominal coordination, nominal modification, ordinal classifier phrases, possession, and possession-plus-transfer wrappers. R32 changes no runtime behavior.

The source-backed core includes nominal coordination with `同/同埋` or juxtaposition, distinct bare and `嘅`-marked nominal modification, true `第` ordinals with headed and classifier-headed ellipsis profiles, possessor+`嘅`, possessor+classifier, and headless possessive nominals. The evidence does not validate one generic nominal-modifier or possessive node, token-only ordinal analysis of `第二`, or the exact combined `有 + CL-N + 要 + 畀 + recipient` wrapper.

## Counts

- external source records: **86**
- internal provenance records: **32**
- cumulative claim-source rows: **1054**
- new R32 rows: **30**
- mapped labels: **152 / 182**
- remaining unmapped labels: **30**
- remaining unmapped language labels: **5**
- `supported_productive`: **0**

## Dual lineage and integrity

- research parent: `CP021B-R31`
- working-tree parent: `CP021B-LX1-render-candidate`
- inherited runtime candidate: `0.5.176`
- accepted parser baseline: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`
- `main.js` SHA-256: `fa753f61fa188bbed0e0d932b60f610d84ccb190ca6596bdc98ddc9dc5245a2c`
- `manifest.json` SHA-256: `d7fbc5ba2dcb9dd652d04638e9c854c74eb03b183eedaa1967318b31a310f065`
- R32 parser/lexicon/Jyutping changes: **none**
- fixtures changed: **no**
- held-out data opened: **no**

LX1's 199 lexicon additions and two Jyutping fallbacks remain inherited and render-unconfirmed; R32 neither accepts nor modifies them.

## Resume

Continue from `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R32.tsv`. Five unmapped language labels remain: three bounded relation/motion labels plus broad `ProductiveVO` and `TransitiveVP` umbrellas.

## Validation

- nominal-relations source audit: **127 / 127 PASS**
- aggregate regression: **545 / 545 PASS**
- inherited LX1 audit: **20 / 20 PASS**
- grammar-legitimacy audit: **1117 / 1117 PASS**
