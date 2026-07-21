# Canto Span research checkpoint — CP021B-R26

Date: 2026-07-19

## Result

Claim-level source mapping is complete for complement omission, response analysis, and lexical valency. No parser behavior changed.

### Dispositions

- `ComplementEllipsisFragment`: `SOURCE_LINKED_DOMAIN_OMISSION_AND_RESPONSE_PARTICLE_SPLIT_WITH_EMBEDDED_EXACT_FORM_GAPS`
- `IntransitiveVP`: `SOURCE_LINKED_LEXEME_VALENCY_AND_NULL_ARGUMENT_SPLIT_WITH_GENERIC_TEMPLATE_REALIGNMENT_REQUIRED`

The evidence supports discourse-recoverable null objects, a narrow existential-domain omission example, independently documented response uses of `係/唔係`, selective VP-ellipsis licensing, and distinct intransitive/transitive/ditransitive VP patterns. It does not validate the exact embedded `覺得 + 有/係/唔係` profiles, a generic one-token intransitive rule, or automatic hidden complement insertion.

## Counts

- external source records: **81**
- internal provenance records: **26**
- cumulative claim-source rows: **824**
- new R26 rows: **30**
- mapped labels: **116 / 182**
- remaining unmapped labels: **66**
- remaining unmapped language labels: **41**
- `supported_productive`: **0**

## Integrity

- accepted parser baseline: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`
- packaged manifest version: `0.5.175`
- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`
- parser code changed: **no**
- fixtures changed: **no**
- held-out data opened: **no**

## Resume

Continue from `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R26.tsv`. Rank the **41** remaining unmapped language labels by runtime and non-held-out fixture impact, select one coherent family, and perform claim-level source mapping before any parser change.
