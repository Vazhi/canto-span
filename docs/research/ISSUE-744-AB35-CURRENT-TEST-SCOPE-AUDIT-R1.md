# Issue 744 — AB35 ProductiveVO current test-scope audit R1

Date: 2026-08-10
Construction: AB35 `ProductiveVO`
Audit role: implementation-fixture inventory only; linguistic evidence weight 0

## Purpose

Audit the current `tests/constructions/ProductiveVO.json` family against the behavior-first source distinction between:

- ordinary transitive V–NP syntax;
- lexical/separable V–O compounds;
- unresolved conventionalized activity V–O expressions;
- higher compositional wrappers.

This document changes no executable expectation or runtime recognition.

## Current fixture inventory

The current file contains:

- 22 snapshot positives;
- 2 focused boundaries;
- 24 executable cases total.

Despite 22 positive cells, the positives revolve around only six recurring V–O-shaped lexical surfaces:

- `食飯`
- `做功課`
- `打電話`
- `飲水`
- `摘芒果`
- `打籃球`

Several test sentences contain more than one such surface, so fixture-cell frequency cannot be interpreted as lexical-family diversity.

## Mutually exclusive fixture-role classification

### A. Clear ordinary/transitive evidence domain — 4 cells

- `REG-0062` `再做功課。`
- `REG-0183` `佢要飲水。`
- `REG-0301` `我落嚟摘芒果食。`
- `REG-0472` `落嚟摘芒果食。`

`做功課` is directly illustrated by Alderete et al. inside ordinary `[V Asp NP]` syntax. `飲水` and `摘芒果` are transparent predicate–object profiles for which the reviewed AB35 sources provide no compound diagnostic.

**Disposition:** useful implementation/composition material, but not linguistic evidence for an independent ProductiveVO construction. Later runtime work should test whether these already have a correct AB78/ordinary-VP route when AB35 ownership is removed.

### B. `食飯`-centered unresolved activity/compound profile — 12 cells

- `REG-0132` `你食飯未？`
- `REG-0133` `你食飯咩？`
- `REG-0134` `你食飯啦。`
- `REG-0135` `你食飯啩。`
- `REG-0136` `你食飯喎。`
- `REG-0188` `佢喺屋企食飯。`
- `REG-0201` `佢話我食飯。`
- `REG-0226` `我有冇食飯？`
- `REG-0227` `我有冇食飯。`
- `REG-0290` `我喺屋企食飯。`
- `REG-0293` `我琴日喺屋企食飯。`
- `REG-0546` `佢慢慢噉食飯。`

Most of the variation is in **outer structure**: final particles, question morphology, locative/time material, reported speech, and manner.

The reviewed sources do not yet settle whether parser-relevant `食飯` should be treated as ordinary transitive/compositional V–NP, a conventionalized activity V–O compound, or context-dependent between those analyses.

**Disposition:** unresolved lexical classification plus higher-composition tests. Repetition across 12 snapshots has evidence weight zero for choosing the lexical analysis.

### C. Mixed `食飯` + ordinary `做功課` sequencing — 3 cells

- `REG-0221` `我先食飯，再做功課。`
- `REG-0222` `我先食飯，做功課。`
- `REG-0268` `我食飯，再做功課。`

These cells primarily exercise clause/sequential composition. They contain one unresolved activity profile (`食飯`) and one directly ordinary VP profile (`做功課`).

**Disposition:** no single AB35 identity can be inferred from the fact that both children are currently labeled ProductiveVO at runtime.

### D. Mixed `食飯` + `打電話` higher-clause case — 1 cell

- `REG-0269` `我食飯嘅時候，佢打電話畀我。`

This combines a temporal/relative-like outer relation with two lexical V–O-shaped activities whose compound status is not established by the current attached sources.

**Disposition:** composition evidence only; no AB35 generalization.

### E. `打電話` activity candidate — 1 cell

- `REG-0058` `打電話。`

The current source package does not provide an item-specific compound analysis for `打電話`.

**Disposition:** lexical/activity candidate requiring direct diagnostics; not a licensed ProductiveVO generalization.

### F. `打籃球` activity candidate — 1 cell

- `REG-0547` `我畀佢打籃球。`

Earlier source/runtime work established `打籃球` as an embedded activity VP in this permissive environment. It did **not** establish that the surface is a Cantonese V–O compound or that `打 + noun` is productive.

**Disposition:** valid embedded activity VP, unresolved compound classification, outer permissive composition remains separate.

## Existing boundaries do not test the decisive distinction

The only two explicit ProductiveVO boundaries are:

- `CP061-PVO-N01` `佢好高。` — stative predicate;
- `CP061-PVO-N02` `喺屋企。` — locative phrase.

They show that AB35 is not every predicate/phrase, but they do not distinguish:

- ordinary transparent transitive V + NP from lexical V–O compound;
- V–O compound from freely replaceable object;
- separable vs inseparable lexical V–O;
- lexical activity meaning retained vs lost under separation;
- V–O compound from serial/resultative/ditransitive/clausal-complement neighbors.

The current boundary inventory therefore does not test the construction question raised by the source re-audit.

## Runtime whitelist audit

The runtime resource `src/runtime-resources/lexicon/productive-vo.js` is a closed lexical list, not a generative V+N rule. Its entries visibly mix different evidence profiles.

### Source-backed V–O-compound examples already present in the whitelist

- `飲茶` — independently discussed as a Cantonese V–O compound with lexical ‘have dim sum’ meaning in Alderete et al.;
- `游水` — independently analyzed as a Cantonese VOC by Bodomo et al.;
- `沖涼` — Bodomo et al. use the bath/shower VOC in Cantonese syntactic diagnostics.

None of these is directly exercised by the current 22 positive AB35 fixture cells.

### Clearly ordinary/compositional or currently unsupported-as-compound entries

The same whitelist contains transparent object-taking material such as:

- `飲水`
- `摘芒果`
- `買嘢`
- `食嘢`
- `寫名`
- `食意粉`

and `做功課`, which Alderete et al. directly illustrate under ordinary `[V Asp NP]` syntax.

### Unresolved activity candidates

The whitelist also contains conventionalized activities such as:

- `食飯`
- `打電話`
- `打籃球`
- `踢波`
- `打機`
- `做運動`
- `瞓覺`
- `打麻雀`

The fact that these feel activity-like or are useful learner vocabulary is not a syntactic diagnostic. Each requires an independently supported lexical/morphosyntactic disposition if a retained compound identity is desired.

## GACS/source-label problem

The existing note’s use of Wong/GACS as support for “productive” cannot rescue the fixture design. GACS scores up to four **different exemplars** of an item to estimate a child’s abstract grammatical knowledge. It is a developmental language-sample scoring method. Repeating `食飯` under many outer wrappers is not the same thing, and the GACS term does not establish a ProductiveVO parser category.

## Audit conclusion

The current fixture is a historical implementation family, not a controlled linguistic test of one construction.

It is especially misleading in two ways:

1. it heavily repeats unresolved `食飯` under different outer wrappers while under-testing lexical diversity;
2. it omits direct focused coverage of several Cantonese V–O compounds that the literature actually identifies as compounds.

## Later runtime-audit target

A separate accepted-specification task should, without assuming the outcome:

1. temporarily remove AB35 from the analysis of each current whitelist surface and record what independently typed structure remains;
2. rehome transparent ordinary V–NP material to AB78 where the accepted predicate–object contract is satisfied;
3. preserve source-backed lexical V–O compounds without pretending they are arbitrary generative V+N combinations;
4. keep unresolved activity surfaces unresolved until item-specific diagnostics justify a lexical-compound or ordinary-transitive analysis;
5. determine whether the permanent AB35 identity should be retired, narrowed/reinterpreted, or split only after that behavior audit;
6. replace historical repeated-wrapper positives with controlled ordinary-VP vs lexical-compound contrasts if a retained identity survives.

No runtime behavior or fixture expectation changes in issue #744.
