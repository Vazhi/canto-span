# Issue 724 — AB45 current test-scope audit R1

Date: 2026-08-10
Construction: AB45 `QuantifiedClassifierNP`
Fixture: `tests/constructions/QuantifiedClassifierNP.json`
Audit type: research-only inventory; executable expectations unchanged

## Purpose

This memo classifies the current AB45 fixture family by **linguistic evidentiary role** after the source re-audit. The goal is to determine what the 46 existing executable cases actually test relative to the source-bounded AB45 claim.

Passing parser behavior, historical snapshots, fixture frequency, and the number of live `QuantifiedClassifierNP` rows have zero independent linguistic evidence weight.

## Mechanical fixture inventory

The standard fixture currently contains 46 executable cases:

- 23 exact snapshot cases;
- 4 focused cases;
- 19 NP-matrix cases;
- 0 implementation probes.

A temporary read-only runtime inventory classified the cases into the following mutually exclusive research roles after correcting fixture metadata that grouped classifier-selection controls with ordinary Num–CL–N forms.

| Research role | Cases | AB45 evidentiary disposition |
|---|---:|---|
| Clean overt Num–CL–N candidates | 19 | Source-compatible AB45 core candidates |
| Headless Num–CL candidates | 8 | Related noun-ellipsis profile; context requirement must be explicit |
| Ordinary container-measure profiles | 3 | Measure-word domain; not AB45 classifier-core evidence |
| Classifier/measure compatibility controls | 6 | Lexical/semantic compatibility controls, not clean syntactic negatives |
| Age/dimension profiles | 6 | Unresolved; outside current source-supported AB45 core |
| Wh-quantity profile | 1 | Unresolved; current sources do not establish it as the same numeral construction |
| Explicit non-AB45 boundaries | 2 | Useful structural exclusions |
| Demonstrative outer composition | 1 | Valid larger-NP composition around an AB45 child |
| **Total** | **46** | |

## Finding 1 — only 19 cases are clean overt Num–CL–N core candidates

The source-bounded AB45 core is overt `Num + CL + N`. Nineteen current cases fit that structural profile without being intentionally classifier-incompatible or measure-word cases:

- `一個人。`
- `三個人。`
- `我有一個故事，我睇咗，佢都睇咗。`
- `我食一個蘋果。`
- `我帶咗三部機去啊。`
- `兩部機。`
- `得三本書咋。`
- `得三個人咋。`
- `三本書。`
- `兩本書。`
- `兩間屋。`
- `三隻貓。`
- `兩個老師。`
- `三個問題。`
- `兩支筆。`
- `三件衫。`
- `兩張紙。`
- `兩架車。`
- `三部電話。`

These are the strongest existing executable representatives of the source-supported overt-head family. Their parser success does not itself establish classifier choice or productivity; those properties must remain source- and lexicon-bounded.

## Finding 2 — eight cases are headless Num–CL and require an ellipsis distinction

The current fixture treats the following eight profiles as ordinary `QuantifiedClassifierNP` positives:

- `一個。`
- `一個咋.`
- `一個啫。`
- `我得一個啫。`
- `兩部。`
- `得一個咋。`
- `得一個啫。`
- `得兩個啫。`

Lam, Lau & Lee and Xia independently support **noun ellipsis with an overt classifier**, but that support is context-sensitive: a recoverable nominal head is omitted. Their evidence does not license a context-free equivalence between `Num–CL` and overt `Num–CL–N`, nor between `Num–CL` and a bare numeral.

Therefore these eight cases should be treated as a **related ellipsis profile**, not counted as eight more independent examples of the overt-head AB45 core.

A future runtime alignment must decide whether ellipsis is represented as an AB45 subtype, a context-linked wrapper, or another existing nominal mechanism. This research task does not make that implementation decision.

## Finding 3 — three ordinary container-measure cases are not classifier-core evidence

The fixture currently places these ordinary measure expressions under the same runtime label:

- `飲七杯。`
- `三杯茶。`
- `兩碗飯。`

Xia explicitly distinguishes classifiers from measure words and treats container measure words as part of the measure-word domain with different syntactic behavior from classifier NPs.

These cases may be perfectly legitimate Cantonese quantity expressions, but they **must not inherit AB45 classifier-NP evidence** solely because the runtime currently assigns `quantity + classifier` slots.

Disposition: route to a separately evidenced measure/quantity analysis in a later implementation task; do not use them as AB45 positives in linguistic argumentation.

## Finding 4 — six cases are classifier/measure compatibility controls, not syntax boundaries

The fixture contains six deliberately problematic pairings:

- `三本水。`
- `三杯書。`
- `三間醫生。`
- `三隻餐廳。`
- `三本電話。`
- `三張水。`

These strings preserve a Num–unit–N-like order but manipulate lexical compatibility between the classifier/measure word and the noun.

They are useful **selectional controls**, because they test whether the runtime distinguishes formally plausible quantity structure from incompatible classifier/noun combinations. They are not clean negative evidence for the AB45 word order or constituency itself: a speaker may reject them because of lexical-semantic selection rather than because `Num–CL–N` is structurally unavailable.

The `三杯書` case is additionally measure-word-like; for this audit it is classified once, under compatibility controls, so categories remain mutually exclusive.

## Finding 5 — six age/dimension cases are outside the current source-supported AB45 core

Current examples:

- `三歲。` (snapshot)
- `五百呎。`
- `張枱三呎。`
- `佢有三歲。`
- `呢本書三歲。`
- `三歲。` (NP matrix)

These do not exhibit the strongest source-supported overt `Num–CL–N` profile. Xia’s classifier/measure distinction also makes it unsafe to infer that conventional age or dimension units instantiate the same classifier structure.

Disposition: **unresolved relative to AB45**. This does not mean the strings are necessarily ungrammatical or that a replacement construction is already known. It means only that the attached AB45 sources do not license treating them as classifier-NP evidence.

## Finding 6 — the fixture contains one wh-quantity profile with no direct AB45 source support

`呢句有幾多個字？` currently yields a `QuantifiedClassifierNP` row over `幾多個字`.

The three attached AB45 sources establish numeral-based classifier structures. Bond & Sio note that a small quantifier set can in principle occupy their `X` position, but explicitly limit their analysis to numerals. None of the three directly establishes Cantonese `幾多 + CL + N` as the same AB45 construction.

Disposition: **unresolved**. A later research unit should determine whether wh quantity is an AB45 subtype, a sibling quantity construction, or an outer wh operator over classifier material.

## Finding 7 — the demonstrative composition case already shows the desired narrow-child architecture

`呢三本書。` currently yields an AB45 child `三本書` under `ModifiedNP` rather than extending AB45 over the demonstrative.

This is consistent with the source distinction between `D-(X)-C-N` and `X-C-N`: the demonstrative belongs to the larger NP composition while the internal quantified classifier material remains separately identifiable.

Disposition: preserve this **outer-composition** pattern in a future runtime alignment unless stronger evidence requires a different internal tree.

## Finding 8 — the two explicit negatives are useful but do not close the main research boundaries

Current focused negatives:

- `本書。`
- `呢個。`

These correctly demonstrate that classifier-headed nominal material without the required quantity, and a demonstrative-classifier phrase, do not automatically become AB45.

They do not test the most important boundaries exposed by the source re-audit:

- overt Num–CL–N vs contextual Num–CL–ØN;
- Num–CL ellipsis vs bare numeral;
- classifier NP vs measure-word NP;
- classifier NP vs age/dimension expression;
- numeral quantity vs wh quantity;
- structural Num–CL–N vs classifier–noun incompatibility.

Therefore `negative_boundary_inventory_complete` must remain false.

## Required future executable matrix

Before runtime alignment, the implementation specification should include controlled cases for:

1. multiple semantically compatible overt Num–CL–N classifier classes;
2. contextual noun ellipsis `Num–CL–ØN` paired with the corresponding overt head and a bare numeral;
3. demonstrative + quantified classifier NP with a narrow internal AB45 child;
4. ordinary container measure expressions separated from classifier NPs;
5. classifier/measure–noun compatibility controls explicitly labeled as selectional rather than syntactic boundaries;
6. age/dimension profiles held outside AB45 until their own structural owner is sourced;
7. wh quantity held outside the accepted AB45 core until independently researched.

## Current disposition

- Linguistic status: remains `research_pending`.
- Source-scope decision: `RETAIN_NARROW_RESEARCH_PENDING`.
- Core: overt `Num–CL–N`.
- Related supported profile: context-linked `Num–CL–ØN` noun ellipsis.
- Demonstrative: outer composition.
- Measure/container, age/dimension, and wh quantity: not licensed as AB45 by the current source set.
- Compatibility controls: lexical/semantic diagnostics only.
- Current 46-case fixture: retained unchanged in this research-only task.
- Runtime alignment: required later, after the separate AA49 runtime branch no longer creates overlapping generic quantity/VP risk.
- Fixture frequency/parser reach: evidence weight zero.
