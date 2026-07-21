# CP024-P1-DEMO01 implementation candidate R1

Date: 2026-07-20  
Accepted baseline: **v0.5.182**  
Render candidate: **v0.5.183**  
Target: `OvertHeadDemonstrativeClassifierNP`  
Current legitimacy status: **provisional**  
`supported_productive` delta: **0**

## Implemented decomposition

The candidate replaces one broad runtime path with three explicitly different roles:

1. `OvertHeadDemonstrativeClassifierNP` is the internal language-claim candidate for exactly overt `demonstrative + classifier + complete nominal head`.
2. `HeadlessDemonstrativeClassifierNP` preserves overt `D + CL` without fabricating a noun or antecedent. It is separately `research_pending` and is not part of DEMO01 promotion.
3. `DemonstrativeClassifierNP` remains only a public diagnostic compatibility alias for the overt-head subtype and carries no independent language license.

The obsolete `DemonstrativeHeadNP` template is removed. Forms such as `呢個蘋果` are represented as demonstrative + classifier + noun, not as an indivisible demonstrative followed by a noun.

## Exact positive license

The target requires all three overt adjacent components:

- proximal or distal demonstrative;
- overt classifier;
- overt complete nominal head.

No numeral, noun, referent, clause role, or other material is inserted.

## Excluded from the target

- headless `D + CL`;
- `D + numeral + CL + N`;
- `D + 啲 + N`;
- wh-classifier phrases;
- numeral-classifier NPs without a demonstrative;
- classifier-noun NPs without a demonstrative;
- `D + N` without an overt classifier;
- modified or attachment-ambiguous spans not yet independently resolved;
- incomplete or unknown heads;
- unrestricted classifier–noun compatibility.

## Lexical prerequisite

Added `貓` with Jyutping `maau1` and noun/animal syntax so the source-backed `呢隻貓` profile can be tested. This lexical addition does not independently license the construction.

## Evidence and provenance

The candidate has explicit authority-origin records and claim–source edges to:

- Bond & Sio 2024;
- Lam, Lau & Lee 2024;
- Xia 2025;
- Yu 2006 as corroboration only;
- five manually adjudicated HKCanCor attestations preserved under one derived corpus record.

The headless subtype currently has only one exact published corroborative source in the central authority register. It therefore remains nonproductive and requires a separate future packet.

## Candidate results before render

- visible required exact: **9/9**;
- forbidden target leakage: **0/8**;
- unresolved cases promoted: **0/3**;
- full-root coverage: **17/20**;
- inherited aggregate regression: **543/543 PASS**, with exactly two candidate-focused headless transitions excluded pending acceptance;
- source accounting: **PASS**;
- claim provenance: **PASS**;
- grammar legitimacy: **PASS**;
- accepted productive constructions remain: **2**.

## Custody state

External packet `CP024-P1-DEMO01-HELDOUT-EXTERNAL-1.zip` has raw-file SHA-256:

`7cda111ca194b6159a37c91b789984fdc0c35d6c35d643260810df0cdd5015c4`

The checksum matches the user-supplied value. The archive has not been opened, listed, extracted, or inspected. It must remain sealed until the user completes render review and the exact candidate hashes are confirmed.

## Remaining gate

Actual Obsidian render review is the only current user-controlled blocker. After a passing review is returned against the frozen v0.5.183 hashes, the sealed packet may be consumed once. Any parser-behavior change after packet opening invalidates the evaluation and requires a fresh independent packet.
