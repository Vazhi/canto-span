# Glossika Week 14 corpus ingress

## Scope

This ingress records the complete source content of Glossika Cantonese (HK) A1 Week 14,
“Making Plans & Appointments,” under stable source ID `GLOSSIKA-YUEHK-A1-W14-20260621`.

The user states that Glossika granted permission to use all lesson data in this
non-commercial private-use Canto Span project.

## Extraction result

The source email was decomposed into **61 stable records**:

| Source section | Records |
|---|---:|
| Functional language | 8 |
| Work and office vocabulary | 25 |
| Numbers | 10 |
| Situation patterns | 4 |
| Mini-dialog | 4 |
| Grammar examples | 2 |
| Phonics pairs | 8 |

Every record preserves source order, section, source text, Jyutping, English material,
register where supplied, and a hash of its source fields. The item payload hash is
`sha256:8b539f409e0cd61bea4832edfa6ec1c607e8d18cd9f429ddbab954b36920102f`.

## Review state

All 61 records remain `unreviewed`. The separate review ledger contains mechanical
normalized strings but no accepted correction, duplicate decision, naturalness judgment,
construction classification, or evidence-use authorization.

The following source-wide alerts are already explicit:

1. Glossika's `Casual`, `Polite`, and `Standard` labels require independent register
   verification.
2. The phonics IPA, lexical choices, and minimal-pair claims require independent
   pronunciation verification.
3. Grammar descriptions and example occurrence do not establish productivity or parser
   analysis.

## Next ingress step

Run exact and normalized duplicate comparison against current corpus, tests, research
notes, lexical data, and native-panel material. Record every match in `review.json`
without deleting or collapsing the source occurrence. Route grammar questions to #126.

## Protected state

This ingress changes no parser behavior, runtime lexicon, construction identity or
status, existing corpus classification, survey evidence, release state, or merge
authorization.
