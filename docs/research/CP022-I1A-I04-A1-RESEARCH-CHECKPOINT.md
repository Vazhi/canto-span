# CP022-I1A-I04-A1 research and acceptance checkpoint

Date: 2026-07-19  
Parent: CP022-I1A-I04-R1  
Accepted runtime: `v0.5.177-cp022-i1a-i04-internal-wrapper-cleanup-r1`  
Status: **ACCEPTED; no active parser candidate**

## Completed

- Accepted the I04 internal-wrapper cleanup within the previously authorized scope.
- Adjudicated all 11 rendered diagnostic rows: 11/11 PASS.
- Verified the evaluator-custody commitments: 5/5 PASS.
- Evaluated the frozen candidate on five prospective held-out cases: 5/5 exact-signature PASS.
- Preserved aggregate regression 545/545, grammar legitimacy 1111/1111, semantic acceptance 15/15, and pre-intermediate corpus 80/80.
- Kept `supported_productive` at zero and the global grammar freeze active outside I04.
- Kept LX1 render-pending and unaccepted.

## Accepted implementation

- `ModifierPhrase`: retired; no active emission.
- `HeadNP`: internal rename to `NominalHeadSpan`; compatibility metadata only.
- `MeasureExpression`: bounded internal overt-measure span; non-licensing.
- `DefinitionComplement`: bounded internal child span; non-licensing.

## Evidence limits

The render decision is grounded in user-supplied acceptance-summary and full-diagnostics exports, not an independent screenshot or pixel-layout capture. Four generic construction-gloss warnings remain inherited and non-blocking because they contain no internal-label or raw-slot leakage.

## Next

The I04 authorization is consumed. Design-only preparation may proceed for `I01 ClauseSpan`, but **new explicit authorization is required before any I01 parser change**.

## Hashes

- Frozen R1 candidate ZIP: `3a6fd80257955699807522a02f0a685b250aea0295f9341a76e5b947f9a60c6d`
- Evaluator custody archive: `b0ea009f75039b8866756ae1c76cf815fb9d191d97a6362df71f987e65cee596`
- Render summary: `39e2e112523a66de1cc4da990ca995136c8470ea03910032e00e547fb503d55c`
- Render full diagnostics: `8a7c9ec01f9de68c22dbab98b767090dd6ce34c4df9c4c3bd689dad8dcdf32cc`
- Private held-out result: `d194080c28de243af7972e811df989860c5acfe7fc563963578d57241568d66a`
