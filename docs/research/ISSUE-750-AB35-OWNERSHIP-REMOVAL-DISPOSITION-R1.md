# Issue 750 — AB35 ownership-removal disposition R1

Date: 2026-08-10  
Construction under audit: AB35 `ProductiveVO`  
Runtime baseline: v0.5.223  
Machine inventory: `docs/research/ISSUE-750-AB35-OWNERSHIP-REMOVAL-INVENTORY-R1.json`

## Purpose and evidence boundary

This memo interprets a development-only counterfactual: every current `ProductiveVO` whitelist entry was parsed under the normal source-first runtime and then parsed again after **only** the 43-entry AB35 whitelist was replaced with an empty list inside a temporary CI workspace.

The inventory has **linguistic evidence weight 0**. It answers what the current parser does without AB35 ownership. It does not establish whether a surface is grammatical, ordinary transitive syntax, a lexical verb–object compound, or a conventionalized activity expression.

Linguistic classifications below come only from the merged issue #744 source re-audit. Parser fallback behavior is reported separately.

## Result

All **43 / 43** whitelist entries were inventoried with a bare probe and an ordinary subject-hosted probe.

When AB35 ownership is disabled:

- **40** entries receive an exact whole-surface `TransitiveVP` fallback;
- **1** entry receives only a partial `TransitiveVP` fallback;
- **1** entry is captured only by a different, inappropriate-looking construction in the bare probe;
- **1** entry receives no construction in either probe.

The 40 exact `TransitiveVP` fallbacks also receive a full subject-hosted `ClauseSpan` for `我 + surface` in the diagnostic probe. Their representative `TransitiveVP` traces use the existing `action_verb! + object!` template and expose complete structured trace bindings. This establishes mechanical composability only.

## Group A — exact whole-surface `TransitiveVP` fallback: 40

The following surfaces remain mechanically covered across their full AB35 surface:

`食飯`, `煮飯`, `摘芒果`, `買嘢`, `食嘢`, `飲水`, `飲茶`, `寫字`, `寫名`, `睇書`, `聽歌`, `睇戲`, `游水`, `跑步`, `影相`, `打機`, `唱K`, `踢波`, `打波`, `彈琴`, `釣魚`, `唱歌`, `睇波`, `講嘢`, `打電話`, `打籃球`, `聽電話`, `做功課`, `返學`, `放學`, `瞓覺`, `洗手`, `沖涼`, `曬太陽`, `打麻雀`, `默書`, `炒股票`, `發脾氣`, `食意粉`, `Book枱`.

This group must **not** be treated as one linguistic class merely because the same fallback matcher accepts it.

### Direct ordinary V–NP control: `做功課`

Issue #744 records direct source support for `做緊功課` as ordinary `[V Asp NP]` syntax. With AB35 disabled, `做功課` receives an exact `TransitiveVP` node and the subject-hosted form receives the expected outer clause composition.

**Disposition:** `做功課` is the strongest currently justified surface for a later removal of AB35 ownership in favor of the already accepted AB78 predicate–object route. That later runtime change still requires its own claim and regression coverage.

### Source-backed lexical V–O compounds: `飲茶`, `游水`, `沖涼`

Issue #744 independently identifies these as members/examples of the Cantonese lexical V–O-compound domain. All three nevertheless fall back mechanically to the ordinary `TransitiveVP` template, with the second component bound to the runtime `object` slot.

**Disposition:** this is **not** evidence that AB78 is the correct linguistic analysis. It is a warning that simple removal of AB35 would preserve parse coverage while potentially erasing the lexical-compound distinction and asserting an ordinary object relation. These three must receive an explicit lexical-compound representation/identity decision before wholesale AB35 retirement can be considered safe.

### Remaining exact fallbacks: 36

The other 36 exact fallbacks are mechanically substitutable at the current parser layer but are **not linguistically reclassified by this audit**. This group includes transparent-looking V–NP strings as well as conventionalized activities and lexicalized-looking expressions.

In particular, the merged #744 re-audit already leaves `食飯`, `打電話`, and `打籃球` unresolved with respect to ordinary-transitive versus lexical/activity analysis. Their successful AB78 fallback does not resolve that question.

**Disposition:** retain as item-specific review candidates. Do not bulk-rehome all 36 to AB78 solely from this inventory.

## Group B — partial fallback: `煮嘢食`

With AB35 disabled, the parser produces `TransitiveVP` only for the prefix `煮嘢`; the final `食` is outside that node in both bare and subject-hosted probes.

**Disposition:** AB35 currently supplies whole-surface grouping that AB78 does not replace. `煮嘢食` requires separate analysis of its internal predicate/purpose/result/serial structure before AB35 ownership can be removed. Treating the partial `煮嘢` node as equivalent coverage would be incorrect.

## Group C — collision fallback: `下棋`

With AB35 disabled:

- bare `下棋。` is captured as `TemporalClause` over `下棋`;
- subject-hosted `我下棋。` receives no construction.

The inventory does not use this fallback as linguistic evidence and does not infer why the temporal detector fires.

**Disposition:** this is a parser collision/blocker, not a successful rehome. A later task must determine the independently supported analysis of `下棋` and prevent the accidental temporal route before AB35 ownership is removed.

## Group D — no construction: `做運動`

Neither `做運動。` nor `我做運動。` receives a construction when the AB35 whitelist is disabled.

**Disposition:** AB35 currently provides unique runtime coverage for this surface. Its linguistic analysis must be independently established before any removal or rehoming.

## What the architecture made visible

Without structured trace provenance, the headline “41 entries still produce a `TransitiveVP` somewhere” would have been misleading. Exact source spans separate the **40 full-surface fallbacks** from the partial `煮嘢` fallback inside `煮嘢食`, while parent/scope information exposes the `下棋` temporal collision and distinguishes subject-hosted clause composition from the embedded VP.

The same provenance also exposes a more subtle issue: the three independently source-backed lexical compounds have technically complete AB78 bindings, but those bindings label the nominal-looking component as an ordinary `object`. Architecture validity therefore cannot substitute for linguistic validity.

## Decision

**Do not retire or bulk-disable AB35 yet.**

The current evidence supports a staged transition rather than one whitelist deletion:

1. **Ordinary V–NP rehome lane.** Start with directly supported `做功課`; expand only when item-specific evidence establishes ordinary predicate–object behavior.
2. **Lexical V–O-compound lane.** Decide how the source-backed compound domain (`飲茶`, `游水`, `沖涼` initially) should be represented without pretending it is an unrestricted productive V+noun rule or an ordinary object relation.
3. **Transition-blocker lane.** Resolve `煮嘢食`, `下棋`, and `做運動` before AB35 ownership is removed from those surfaces.
4. **Unresolved activity lane.** Keep the remaining conventionalized/activity candidates item-specific until evidence resolves their analysis.
5. **Identity decision after lanes 1–3.** Only then decide whether the permanent AB35 UUID should be narrowed/reinterpreted to a lexically licensed V–O-compound family, retired, or superseded. The historical name `ProductiveVO` does not decide that outcome.

## Highest-value next task

The strongest next dependency for eventual AB35 retirement is the **lexical V–O-compound representation decision**. The source evidence already establishes that this domain is real, and the ownership-removal inventory shows that current fallback would otherwise silently flatten the three directly supported compounds into ordinary `TransitiveVP` object structure.

That task should be identity/research-first: determine whether AB35 can truthfully narrow to a lexically licensed V–O-compound identity, define the minimum item-level membership/diagnostic contract, and only then authorize runtime migration. It should not begin by adding a new generic matcher.

## Protected state

This inventory authorizes no runtime change, test-expectation change, construction rename/retirement/split, status change, corpus reclassification, survey/native-panel/held-out change, release, or deployment.
