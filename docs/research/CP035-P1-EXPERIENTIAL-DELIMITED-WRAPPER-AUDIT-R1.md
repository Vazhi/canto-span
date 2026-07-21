# CP035-P1 experiential and delimited wrapper audit

Date: 2026-07-22

Runtime checkpoint: v0.5.191

Scope: constructor-specific implementation reachability only; no native-panel instrument, parser-span change, or linguistic-status change.

## Family reviewed

This checkpoint reviews six related labels that remained `no_direct_cases` after v0.5.190:

- `NegativeExperiential`
- `ExperientialQuestion`
- `ExperientialMotionGoalVP`
- `MotionDelimitedVP`
- `CognitionDelimitedVP`
- `CognitionDelimitedObjectVP`

The existing source maps already show that these runtime labels are broader or differently divided than the independently documented Cantonese patterns. This checkpoint therefore adds only zero-weight implementation probes and records mismatches; it does not promote any construction claim.

## Runtime findings

### EXPDEL-001A / EXPDEL-001B — NegativeExperiential

`我未見過。` and `我冇睇過。` reach `NegativeExperiential` in complete parser output. The two probes are retained separately because the checked research distinguishes not-yet `未 + V過` from aspectual-negative `冇 + V過`.

The implementation remains inconsistent once overt postverbal material is added. `我未見過王小姐。` is currently routed through `ExperientialQuestion`, while `我冇睇過今日嘅報紙。` retains `ExperientialVP` but loses `NegativeExperiential`. These are implementation gaps, not evidence that the longer sentences lack a negative experiential reading.

### EXPDEL-002 — ExperientialQuestion

`你飲過茶未？` reaches `ExperientialQuestion`. This is the intended final-`未` question path. However, the same label can also appear in the preverbal-`未` statement above, while `你有冇去過澳門呀？` does not reach it. The runtime therefore does not yet preserve the source-backed split among final `未`, preverbal `未`, and `有冇 + V過` question strategies.

### EXPDEL-003 — ExperientialMotionGoalVP

`我未去過美國。` reaches `ExperientialMotionGoalVP` for the visible movement + `過` + goal span. The probe protects only that child path. It does not validate the surrounding negative or directional wrappers, nor unrestricted movement-verb and goal combinations.

### EXPDEL-004 — MotionDelimitedVP

`去睇吓醫生。` reaches `MotionDelimitedVP`. The sentence is semantically coherent, but it is used only to exercise the generated movement + action + `吓` template. Existing source mapping places motion-purpose and delimitative composition in a broader family and does not establish the runtime label as a single productive construction.

### EXPDEL-005 — CognitionDelimitedVP

`諗吓。` reaches `CognitionDelimitedVP`. This is a context-dependent implementation probe. The checked exact coursebook continuation `你諗下係唔係` does not reach either cognition-delimited wrapper in complete parser output, showing that current reachability does not cover the source-linked clausal-content profile.

### EXPDEL-006 — CognitionDelimitedObjectVP

`諗吓呢個問題。` reaches `CognitionDelimitedObjectVP` with an overt NP continuation. The probe does not validate a generic direct-object analysis. Existing research explicitly requires distinctions among nominal content, propositions, polar clauses, and discourse-linked omission.

## Evidence accounting

All seven cases have linguistic evidence weight **0**. Source-linked surfaces are used only to verify that a current runtime path exists. Generated coherent probes are not natural attestation. No panel threshold, source count, corpus count, promotion gate, or current linguistic status changes.

## Dispositions

| Label | Disposition |
|---|---|
| `NegativeExperiential` | retain as implementation-reachable but structurally overbroad; split `冇V過`, `未V過`, final-`未`, and `有冇V過` before linguistic promotion |
| `ExperientialQuestion` | retain as implementation-reachable; correct preverbal/final-`未` routing and represent `有冇V過` separately |
| `ExperientialMotionGoalVP` | retain as implementation-reachable; preserve overt movement, aspect, and goal while auditing surrounding wrappers |
| `MotionDelimitedVP` | retain as implementation-reachable generated template; exact lexical and purpose/delimitative boundaries remain unresolved |
| `CognitionDelimitedVP` | retain as implementation-reachable; source-linked clausal continuation remains underparsed |
| `CognitionDelimitedObjectVP` | retain as implementation-reachable; generic object relation remains unsupported and complement types must remain distinct |

## Result

- labels reviewed: **6**
- implementation probes added: **7**
- labels retired: **0**
- linguistic evidence weight added: **0**
- parser recognized-span behavior changed: **no**
- linguistic status changed: **no**
