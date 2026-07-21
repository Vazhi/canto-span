# Grammar-Legitimacy Audit

> **CP020R2-RA1 state — 2026-07-17:** The indefinite new-grammar freeze and replacement-only rule remain retired. Legacy Cantonese-language claims remain non-promotable until reconstructed from screened external evidence; future grammar must follow the authority-origin lifecycle. Parser `v0.5.174` is accepted after full rendered review; there is no active candidate.

## Audit goal

Audit every current grammar claim and parser representation without increasing unsupported grammar inventory. The eventual inventory covers active, candidate-only, dormant, quarantined, lexicalized, retired, replacement-eligible, and historical labels.

## Current inventory state

- Active registry labels: **177**
- Fully supported productive claims: **0**
- Native analysis-validated claims: **0**
- `unsupported_generalization`: **99**
- `research_pending`: **36**
- `parser_heuristic`: **25**
- `lexicalized_only`: **3**
- `provisional`: **19**
- Language/lexical claims with explicit proposition edges: **4**
- Language/lexical claims without an explicit edge: **153**
- Internal representation/heuristic claims: **25**
- Demonstrably authority-originated claims: **0**
- LANE-05: all 34 original labels dispositioned through CP010
- LANE-01: 10 original runtime labels and 18 historical findings dispositioned through CP017
- CP018 synchronized four removal-ready bridge labels only

## CP018 effect

The legitimacy inventory changed from 188 to 184 rows by deleting exactly:

- `ComitativeActionMotionVP`
- `ActionSourceFocusClause`
- `GoalDirectedActionPredicate`
- `ModalGoalBenefactivePurposeClause`

No construction row was added. Unsupported language-claim inventory decreased by four. Later accepted work reduced the registry to 182 labels. The embedded runtime map and TSV/JSON audit inventories exactly match the current 177-label registry.

CP018 also adds a separate semantic-acceptance gate. That gate is not a support class and does not promote a claim. Its statuses indicate whether a parser result is blocked, requires review, or is merely eligible for manual review.

## Remaining LANE-01 synchronization history

The following remain future, separately gated packages:

1. consolidate the three `UseForPurpose*` language claims;
2. replace or retire `AffectednessFrame` narrowly;
3. replace or retire `RecipientFrame` narrowly;
4. split lexical, instrumental, and intended-function `用`;
5. correct order/spatial false analyses;
6. migrate `CoverbFrame` to typed provenance last.

CP018, CP019R2, and the v0.5.172 parser received their recorded dispositions. CP020R2-RA1 subsequently accepted v0.5.174 after complete rendered review while leaving the relation provisional and nonproductive. The replacement-only exception is retired; any future work must use the authority-origin lifecycle.

## Authoritative CP018 outputs

- `../research/LANE-01-SEMANTIC-GUARD-BRIDGE-RETIREMENT-CP018.md`
- `../research/LANE-01-SEMANTIC-GUARD-BRIDGE-FULL-REVIEW-CP018.md`
- `../../test-data/grammar-legitimacy-audit.json`
- `../../test-data/grammar-legitimacy-audit.tsv`

## CP021A provenance output

`grammar-claim-provenance-CP021A.json` and `.tsv` provide one row for every label. A source-count field alone is not evidence: explicit edges must carry source identifiers, exact locators, extracted propositions, relationship, verification state, and limitations. The 153 source-less language claims are assigned downgrade or quarantine; the four post-hoc-linked labels remain nonproductive pending reconstruction; the 25 engineering claims remain non-linguistic. Future grammar is possible only after authority-origin research and separate candidate authorization.
