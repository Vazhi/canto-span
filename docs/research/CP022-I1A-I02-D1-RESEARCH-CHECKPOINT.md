# Canto Span checkpoint — CP022-I1A-I02-D1

Date: 2026-07-19  
Parent: `CP022-I1A-I04-A1`  
Accepted runtime: `v0.5.177-cp022-i1a-i04-internal-wrapper-cleanup-r1`  
Parser behavior changed: **no**  
Implementation authorized: **no**

## Result

The prerequisite `I02 ClauseRelationGraph` structural-equivalence packet is populated and prospective held out is locked.

The packet defines the future internal components `ClauseRelationGraph`, `ClauseRelationEdge`, and `ClauseRelationMemberSpan`, while preserving the current three names only as possible compatibility metadata. The intended semantic change is `NONE`.

## Why I02 is next

The R35/R36 dependency graph says I01 depends on I02. Relation members must have stable graph, edge, and member responsibilities before broad clause-span wrappers can be consolidated. The prior handoff naming I01 as the immediate next packet is corrected here.

## Evaluation inventory

- visible complete relation anchors: **4**
- visible positive variants: **4**
- visible negative boundaries: **4**
- future render cases: **8**
- prospective held-out cases: **6**
- held-out classes: causal, conditional, sequential, temporal, incomplete-member, graph-only
- selected held-out surface leakage: **0**
- held-out opened: **no**

## Validation

- packet-lock audit: **105/105 PASS**
- aggregate regression: **545/545 PASS**
- grammar legitimacy: **1111/1111 PASS**
- semantic acceptance: **15/15 PASS**
- pre-intermediate corpus: **80/80 PASS**
- accepted I04 current-focused gate: **61/61 PASS**
- documentation consistency: **PASS**
- parent archive comparison: **PASS**; zero missing inherited files; runtime files unchanged
- `supported_productive`: **0**
- active runtime labels: **181**

## Integrity

- `main.js`: unchanged, SHA-256 `16beb61925c69cdeb9dc7dfb159a3cf394ab98a2201a213f444d9256a2f9d6e7`
- `manifest.json`: unchanged, SHA-256 `500d23b80bc529f1b232cc67d27a7ef87af3aac5748c2d411791b6e941243c02`
- `styles.css`: unchanged, SHA-256 `5e97a27bb3925dbc63c0af00f72899c3c860c5b1a407e3f8ea832b8ff0dd409a`
- custody archive SHA-256: `e90541d4b1337e2e6ae61fb24f5ddf4e6337a697d26f3d966cef2343da1c0e34`
- public lock-manifest SHA-256: `6e9d179111a4d56cce74982307a75050aaabf79a2484e2d1b83222744007e7cb`

## Authorization stop

**NEW EXPLICIT I02 UNFREEZE AUTHORIZATION IS REQUIRED NOW.**

The allowed future scope would be only `EP-CP022-I1A-I02-D1`: internal graph/edge/member cleanup with no intended semantic change. No I01 or other-family parser change is included.
