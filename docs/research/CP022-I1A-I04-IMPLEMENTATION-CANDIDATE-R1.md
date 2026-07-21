# CP022-I1A-I04 internal-wrapper cleanup candidate R1

Date: 2026-07-19  
Runtime: `0.5.177`  
Candidate: `v0.5.177-cp022-i1a-i04-internal-wrapper-cleanup-r1`  
Status: **visible gates passed; focused render review required; held-out unopened**

## What this change does

### `ModifierPhrase`

- Removed from the active construction registry.
- Added to the retired-label registry.
- Removed the only remaining code path that could construct it.
- Preserved the overt modifier and linker material directly inside the existing typed nominal analysis.

This is wrapper removal, not a new analysis of Cantonese modification.

### `HeadNP` → `NominalHeadSpan`

- Renamed the actual internal construction to `NominalHeadSpan`.
- Removed `HeadNP` from the active registry and recorded it as a retired migration name.
- Existing diagnostic output may still expose `HeadNP` as compatibility metadata so accepted regression signatures and external consumers do not break.
- The parser internally records `NominalHeadSpan`; learner rendering continues to show the plain gloss “noun phrase.”
- The span cannot independently license definiteness, ellipsis, argument roles, or fragment status.

### `MeasureExpression`

- Retained as an internal child that groups overt quantity and unit material.
- Added explicit metadata that it has no independent grammar-licensing authority.
- Its age/price/area/length interpretation still comes from the separately licensed parent subtype, such as `NominalPredicateClause`.

### `DefinitionComplement`

- Retained as a bounded child of `DefinitionExplanatoryFrame`.
- Added explicit metadata that it cannot independently create a definition reading, noun phrase, hidden head, or argument role.

## What did not change

- No new Cantonese grammar was added.
- No token, Jyutping, learner role, visible span, or root-coverage result changed in the 12 frozen visible cases.
- No accepted regression tree changed publicly.
- No lexicon or Jyutping data changed.
- No source claim was promoted.
- `supported_productive` remains zero.
- LX1 remains render-pending and unaccepted.
- The five I04 held-out cases remain unopened.

## Visible validation

- I04 visible packet gate: **45/45 PASS**
- Aggregate regression: **545/545 PASS**
- Current focused I04 gate: **45/45 PASS**
- Separate LX1 preservation gate: **13/13 PASS**
- Grammar-legitimacy audit: **1111/1111 PASS** across **181** active labels
- Semantic acceptance fixture: **15/15 PASS**
- Pre-intermediate corpus: **80/80 PASS**
- Diagnostic dual-export contract: PASS
- Registry gate: PASS
- Review-only readiness audit: PASS
- Documentation consistency: PASS
- Color palette verification: PASS

The grammar-legitimacy audit count changed from 1117 to 1111 because one active label, `ModifierPhrase`, was deliberately retired. `HeadNP` was renamed one-for-one, so it did not change the active-label count by itself.

## Required next gate

Render the focused review note and inspect the eight packet cases plus the three internal-cleanup probes. Do not open the evaluator-custody archive yet.

After render acceptance, freeze the implementation candidate and only then open the evaluator-custody archive for final held-out evaluation.
