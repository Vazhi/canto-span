# CP044-P1 Polite request adjustment reconciliation R1

## Decision

Retain `PoliteImperativeClause` for one narrow source-linked request profile:

```text
唔該 + addressee + scalar adjustment
```

The exact coursebook example `唔該你快啲` motivates the regression `唔該你快啲。`.

## Parser reconciliation

Before v0.5.201, the sentence remained split into:

- `FormulaDiscourseUnit` over `唔該`;
- an unwrapped addressee `你`;
- `DegreeMannerAdverbial` over `快啲`.

v0.5.201 adds a transparent outer `PoliteImperativeClause` while preserving those learner-visible children. Standalone `唔該` remains a formula, and unrelated `快啲` structures are unchanged.

## Evidence and limits

Source: 鄭定歐、張勵妍、高石英, *粵語（香港話）教程（修訂版）*, printed p. 219, example `唔該你快啲`.

This supports the exact conventional request profile. It does not establish:

- unrestricted productivity after `唔該`;
- equivalence with `請` or `麻煩`;
- one syntax or politeness value across registers;
- categorical naturalness for every Cantonese variety;
- promotion beyond `unsupported_generalization` without broader boundaries.

## Validation

- exact regression: `REG-0549`;
- complete root coverage;
- `FormulaDiscourseUnit` retained as a child;
- `DegreeMannerAdverbial` retained as a child;
- standalone `唔該。` unchanged;
- unrelated `搭地鐵快啲。` unchanged;
- no new verifier or validation directory.
