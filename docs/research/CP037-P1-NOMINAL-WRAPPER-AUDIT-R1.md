# CP037-P1 nominal wrapper audit

Date: 2026-07-22

Runtime checkpoint: v0.5.193

Scope: constructor-specific implementation reachability, compatibility-alias accounting, and retirement of one constructorless label. No native-panel instrument or linguistic promotion is involved.

## Family reviewed

This checkpoint reviews four nominal labels that remained `no_direct_cases` after v0.5.192:

- `DemonstrativeClassifierNP`
- `DemonstrativeHeadNP`
- `OrdinalClassifierNP`
- `PossessiveClassifierNP`

The audit separates direct internal construction output from a public compatibility alias. It does not treat alias exposure or implementation reachability as evidence for a Cantonese-language claim.

## Runtime findings

### NOMWRAP-001 — ordinal classifier wrapper

`第二個故仔。` reaches `OrdinalClassifierNP` in complete parser output. The runtime requires an ordinal modifier, classifier, and overt noun head. This probe protects only that existing wrapper path and carries linguistic evidence weight 0.

The checked source record also documents non-ordinal lexicalized uses of `第二`. The probe therefore does not generalize all `第二 + classifier/head` sequences as ordinal.

### NOMWRAP-002 — possessive classifier wrapper

`佢整冧咗我間屋。` reaches a nested `PossessiveClassifierNP` for `我間屋` inside the bounded causative-result frame. The current fallback is not a general standalone possessive-NP parser: `我間屋。` produces `ModifiedNP` for `間屋` but does not preserve `PossessiveClassifierNP` in complete output.

The probe records the actual narrow implementation reachability only.

### NOMWRAP-003 — public compatibility alias

`呢本書。` produces the internal construction `OvertHeadDemonstrativeClassifierNP` while exposing `DemonstrativeClassifierNP` as the public compatibility alias. `DemonstrativeClassifierNP` is therefore not a separately emitted internal node.

The standard test framework now records this case as `compatibility_alias_only`, rather than misclassifying the alias as either a direct construction positive or an uncovered runtime path.

### DemonstrativeHeadNP — retirement

`DemonstrativeHeadNP` had no constructor, no accepted fixture, no standardized case, and no verified parser output. Its own plain-language record already stated that forms such as `呢個蘋果` contain an overt classifier and belong to the overt D-CL-N subtype.

The label was removed from the active runtime registry and current construction notes. Its historical record and mapped sources are preserved under `archive/retired-labels/v0.5.193-nominal-wrapper-audit/`.

## Evidence accounting

- `NOMWRAP-001` and `NOMWRAP-002` are implementation-only probes.
- `NOMWRAP-003` is a compatibility-alias probe.
- Every probe has linguistic evidence weight **0**.
- No native-panel count, corpus count, or promotion threshold changes.
- `DemonstrativeHeadNP` retirement reduces the active runtime registry by one label but does not change recognized parser spans.

## Result

- labels reviewed: **4**
- implementation-positive labels added: **2**
- compatibility-alias-only labels added: **1**
- labels retired: **1**
- parser recognized-span behavior changed: **no**
- linguistic status of retained labels changed: **no**
- linguistic evidence weight added: **0**
