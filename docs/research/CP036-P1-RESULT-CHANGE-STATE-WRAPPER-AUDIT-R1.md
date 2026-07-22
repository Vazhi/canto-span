# CP036-P1 result and change-state wrapper audit

Date: 2026-07-22

Runtime checkpoint: v0.5.192

Scope: constructor-specific implementation reachability only; no native-panel instrument, parser-span change, or linguistic-status change.

## Family reviewed

This checkpoint reviews eleven related labels that remained `no_direct_cases` after v0.5.191:

- `CausativeResultFrame`
- `CausativeResultPredicate`
- `ChangeIntoPredicate`
- `ModalChangeIntoResultFrame`
- `DisposalChangeIntoResultFrame`
- `ResultStateClause`
- `TransformationResultFrame`
- `TransformationResultPredicate`
- `SeemingPerfectiveResultClause`
- `PerfectiveObjectResultPredicate`
- `PerfectiveResultPredicate`

The existing source records do not establish these implementation labels as productive linguistic constructions. The audit therefore adds only semantically coherent zero-weight reachability probes and records the remaining shadowed path.

## Runtime findings

### RESCHG-001A / RESCHG-001B — causative result

`佢整冧咗間屋。` reaches both `CausativeResultFrame` and its nested `CausativeResultPredicate`. The runtime pattern is explicitly lexicalized to `整 + 冧 + 咗`; the probe does not justify broader causative-result composition.

### RESCHG-002A / RESCHG-002B — modal change into

`佢會變成老師。` reaches `ModalChangeIntoResultFrame` and nested `ChangeIntoPredicate`. This demonstrates complete-output reachability for the exact modal frame only.

### RESCHG-003 — disposal change into

`佢會將呢間屋變成餐廳。` reaches `DisposalChangeIntoResultFrame`. The exact runtime requires the modal `會` and disposal marker `將`; no claim is made about broader disposal grammar.

### RESCHG-004 — result state

`好多都熟咗喇。` reaches `ResultStateClause`. The implementation is tied to `熟咗` with optional quantity/focus material; the probe is not evidence for a general result-state adjective class.

### RESCHG-005A / RESCHG-005B — transformation result

`佢變咗做老師。` reaches `TransformationResultFrame` and nested `TransformationResultPredicate`. Multi-token topics such as `間屋` can be wrapped earlier and fail to reach the late fallback, so topic coverage remains incomplete.

### RESCHG-006A / RESCHG-006B — seeming weather result

`呢度好似今日停咗雨。` reaches `SeemingPerfectiveResultClause` and nested `PerfectiveObjectResultPredicate`. The implementation requires a narrow six-part profile with single-token location and time nodes.

### PerfectiveResultPredicate — shadowed constructor

The internal `解決 + 咗 + optional particle` fallback can still construct `PerfectiveResultPredicate` when called directly. In complete parser output, `解決咗` is routed through `PerfectiveVP` first, so the specialized label does not survive. It remains `no_direct_cases`; no zero-weight probe is added merely to make the coverage count look complete.

## Evidence accounting

All ten probe records have linguistic evidence weight **0**. They protect implementation reachability only. No panel threshold, source count, corpus count, promotion gate, or linguistic status changes.

## Result

- labels reviewed: **11**
- implementation probes added: **10**
- labels moved to `implementation_positive_only`: **10**
- labels remaining shadowed/no-direct in this family: **1**
- labels retired: **0**
- linguistic evidence weight added: **0**
- parser recognized-span behavior changed: **no**
- linguistic status changed: **no**
