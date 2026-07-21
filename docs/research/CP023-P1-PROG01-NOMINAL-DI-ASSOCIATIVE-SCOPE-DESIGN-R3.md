# CP023-P1-PROG01 `啲` plus associative nominal design — R3

Date: 2026-07-20  
Status: **ambiguity-aware design frozen; forced single attachment prohibited**  
Accepted runtime: **v0.5.182**, unchanged

## Correction to the R2 working diagnosis

R2 described `啲公司嘅報告` as categorically misgrouped and treated `啲 [公司嘅報告]` as the intended structure. That was too strong. The surface permits at least two plausible readings:

1. `啲 [公司嘅報告]` — a `啲`-marked set or quantity of company reports;
2. `[啲公司] 嘅 報告` — reports associated with some/the companies.

The sources establish head-final nominal structure, `啲` in classifier-nominal expressions, possessor-before-head patterns, and the attested surface `啲九巴嘅數據`. They do **not** uniquely determine attachment for every `啲 + NP + 嘅 + N` string. Transcript orthography supplies no prosody. The current parser output is still inadequate because it closes `啲公司` early and then places `嘅報告` in a detached `ModifiedNP` under a generic `QuantityNP`, without transparently encoding either complete associative relation.

## Source-backed components

- Cantonese NPs are generally head-final and can contain preceding determiner/classifier material.
- `啲 di1` functions as a plural classifier in nominal expressions.
- Possessor/associate material precedes the nominal head; `嘅` can link nominal material to a following head.
- `我哋而家就睇緊啲九巴嘅數據` occurs in an official interpreted-hearing transcript discussing KMB data.

These components justify preserving both candidate attachments; they do not justify one universal parse.

## Frozen representation design

For a surface `啲 A 嘅 N`, the parser must first recognize the longest valid lexical items and then construct complete candidate analyses:

### Candidate A — outer `啲`

`DiMarkedNP(啲, AssociativeNP(A, 嘅, N))`

Use when `A 嘅 N` is independently a valid associative nominal and context or lexical semantics favors a set/quantity of that whole nominal.

### Candidate B — `啲` inside the associate/possessor

`AssociativeNP(DiMarkedNP(啲, A), 嘅, N)`

Use when `啲 A` independently forms the associate/possessor phrase.

When both are structurally available and context does not settle the relation, retain both as candidate analyses or mark the attachment review-required. Do not silently choose the branch produced first by greedy assembly.

## Implementation invariants

1. Recognize proper names and multi-character heads before grammatical assembly; `九巴` must not become numeral `九` plus unrelated `巴`.
2. Preserve overt `啲`, `A`, `嘅`, and `N` spans in either analysis.
3. Encode a complete `AssociativeNP`; a detached `ModifiedNP` beginning with `嘅` is not an adequate substitute.
4. Do not let generic `QuantityNP` root coverage conceal unresolved attachment.
5. Preserve isolated `啲公司` as `DiMarkedNP` and `公司嘅報告` as `AssociativeNP`.
6. A later progressive wrapper may consume the complete selected nominal analysis, never the prefix `啲公司` alone.
7. No new public language-construction label is required solely for ambiguity; alternatives may be represented in trace/analysis metadata.

## Context-specific disposition of `啲九巴嘅數據`

The hearing context repeatedly discusses data supplied by KMB, so Candidate A (`啲 [九巴嘅數據]`) is a reasonable context-preferred research analysis after `九巴` and `數據` are recognized atomically. This is an inference from discourse context, not a source-explicit constituency judgment. Candidate B must not be made impossible by a universal grammar rule.

## Acceptance boundary

A future nominal patch may be accepted for transparent ambiguity handling without claiming a final theoretical DP structure. It must pass visible and prospective cases for both attachments, proper-name preservation, ordinary `啲 N`, ordinary `A 嘅 N`, and progressive whole-object integration.
