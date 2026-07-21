# CP024-P1-DEMO01-R1 implementation checkpoint

Date: 2026-07-20  
Accepted baseline: **v0.5.182**  
Candidate: **v0.5.183**  
Status: **render candidate ready; not accepted**

## Result

The narrow overt demonstrative–classifier–noun subtype is implemented and remains provisional. The broad prior behavior has been decomposed without promoting a headless or hidden-noun analysis.

- visible positives: **9/9 exact**;
- forbidden target leakage: **0/8**;
- unresolved attachment cases promoted: **0/3**;
- inherited regression: **543/543 PASS** outside two exact candidate-focused headless transitions;
- candidate audit: **51/51 PASS**;
- accepted `supported_productive`: **2**, unchanged.

## Exact runtime change

- added internal `OvertHeadDemonstrativeClassifierNP`;
- added separate `HeadlessDemonstrativeClassifierNP` with no hidden noun;
- retained `DemonstrativeClassifierNP` only as a public compatibility alias;
- retired runtime selection of `DemonstrativeHeadNP`;
- added bounded lexical entry `貓 maau1`.

## Evidence state

Central authority-origin and claim–source records now cover the narrow overt subtype with four structural sources plus a five-record HKCanCor natural-attestation unit. The headless subtype has one exact corroborative source and remains `research_pending`.

## Custody state

`CP024-P1-DEMO01-HELDOUT-EXTERNAL-1.zip` matches SHA-256:

`7cda111ca194b6159a37c91b789984fdc0c35d6c35d643260810df0cdd5015c4`

It remains sealed, unopened, unlisted, and unextracted. It is intentionally excluded from runtime and recovery packages.

## Required next action

Install the candidate runtime and render `CANTO-SPAN-v0.5.183-RENDER-REVIEW.md` in Obsidian. Return the acceptance-summary and full-diagnostics JSON. Do not open the held-out ZIP.

After render passes, confirm the frozen hashes and consume the held-out packet once. A held-out failure causes rollback or a new candidate with a fresh independent packet; cases cannot be reused.

## Frozen runtime hashes

- `main.js`: `e25b6f7142eafce66a172b68d8e409275f127cfe902e93bafaf7147152bfcbe9`
- `manifest.json`: `d7f5a9be248a4efd1839852e8a100a9968273050f0aa5953af2a35c3661801f5`
- `styles.css`: `5e97a27bb3925dbc63c0af00f72899c3c860c5b1a407e3f8ea832b8ff0dd409a`
