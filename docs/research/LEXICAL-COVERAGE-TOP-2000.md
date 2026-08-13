# Common spoken Cantonese lexical priority core

## Governing outcome

Canto Span's lexical priority target is **2,000 contemporary, commonly used spoken Cantonese items/surfaces**, not mandatory retention of every surface in the historical Cifu SpokenAdult top-2,000 list.

The previous R7 rule — materialize every Cifu surface as an atomic runtime lexical entry and never remove it for regression reasons — is superseded.

The new rule is behavior- and value-first:

- common/high-value Cantonese is protected;
- if a protected common item exposes a parser regression, keep the item and repair parser behavior;
- archaic, rare, formal-only, specialist, contaminated, weakly supported, or domain-specific material is lower priority;
- a low-value runtime lexical entry may be retired when it demonstrably creates or worsens parser/regression behavior and removing the atomic entry does not reduce common spoken-Cantonese capability;
- a frequent surface sequence does not automatically deserve an atomic lexical entry when productive grammar already accounts for it.

This is a priority model, not a claim that vocabulary outside the core is invalid Cantonese.

## Why the Cifu-only target was retired

Cifu remains valuable frequency/discovery evidence, but it is not a safe lexical authority by itself.

The project evidence contract now records that:

- Cifu SpokenAdult rank/surface is derived from Hong Kong Cantonese spoken corpora and remains useful frequency evidence;
- Cifu's English definitions and much of its Jyutping derive from yeDict, an adaptation of CEDICT, and therefore carry no independent Cantonese lexical-semantic/POS authority;
- Cifu tokenization was re-segmented for the frequency lexicon, so an exact Cifu surface boundary does not prove atomic lexicality;
- reconstructed `*` Jyutping is especially low-confidence candidate metadata.

The old exact-surface benchmark therefore mixed at least three different things: genuine common lexemes, productive/compositional sequences, and low-value or contaminated dictionary/tokenization material.

## Primary commonness evidence

The current reproducible direct-spoken candidate generator is:

`tools/lexical-coverage/export-common-spoken-core.py`

It uses frozen **PyCantonese 5.0.0**:

- HKCanCor;
- CantoMap.

For each exact Han-containing word token it records raw count and per-million frequency independently in both corpora. The provisional score is the arithmetic mean of the two per-million rates, giving each corpus equal weight rather than letting corpus size alone control rank.

The generated evidence is:

- `data/lexical-frequency/common-spoken-cantonese-core-2000.tsv`
- `data/lexical-frequency/common-spoken-cantonese-core-2000.manifest.json`

The first direct-corpus candidate pass contains exactly 2,000 ranked surfaces:

- 836 are attested in both HKCanCor and CantoMap;
- 1,314 are also in the historical Cifu top 2,000;
- 686 are outside the historical Cifu top 2,000.

This first 2,000 is a **frequency candidate pool, not the final curated lexical core**. Its lower tail contains proper names, MapTask/navigation-domain vocabulary, productive number/time strings, and segmentation artifacts. Those must not displace more useful general-spoken vocabulary merely because of corpus-domain concentration.

## Secondary evidence

Cifu SpokenAdult frequency remains useful because it also incorporates HKCAC and therefore adds spoken-domain breadth missing from the two directly queryable frozen corpora.

Use Cifu frequency/rank as secondary corroboration/backfill evidence, never as mandatory inclusion or lexical identity.

The frozen Rime-Cantonese layer may corroborate contemporary surface/readings. Rime weights are not frequency evidence and Rime has no independent POS/semantic/lexicality authority.

Words.hk, Jyut.net, corpus context, and Cantonese linguistic research remain appropriate expert adjudication sources where lexicality, reading, or usage status is unclear.

## Final core classifications

Every final priority item should resolve to one of these outcomes:

- `core_atomic` — common contemporary spoken item requiring a lexical runtime analysis;
- `core_structural` — common surface/sequence, but productive grammar/construction handling is preferred over a fake atomic lexical entry;
- `defer_low_value` — attested Cantonese but uncommon, formal-only, archaic, specialist, domain-specific, or otherwise low priority for regression accommodation;
- `retire_regression` — low-value atomic runtime entry with demonstrated parser/regression cost whose removal preserves common-core capability;
- `research_required` — evidence conflict still requiring expert review.

The final protected core must contain exactly 2,000 priority items/surfaces after curation and backfill; `core_structural` items may count toward common-surface coverage without requiring an atomic token-lexicon entry.

## Regression retirement rule

A runtime lexical entry is eligible for retirement only when **both** conditions hold:

1. it is outside the protected common lexical need, or the common surface is already structurally/compositionally licensed without that atomic entry; and
2. controlled regression comparison demonstrates that the atomic entry causes or materially worsens parser behavior/ambiguity.

Low frequency alone is not sufficient reason to delete an entry. A failing snapshot alone is not sufficient reason either.

Conversely, common/high-value vocabulary is not removed merely to make regression tests green. `死 sei2` is the reference example: it is strongly common in direct spoken evidence, so parser behavior around it is a parser obligation rather than a lexical-retirement opportunity.

## First causal retirement experiment

Historical PR #791 added 1,353 neutral R7 entries to force exact Cifu top-2,000 coverage.

The common-priority audit (`data/lexical-frequency/common-spoken-cantonese-r7-priority-audit.tsv`) currently finds:

- 731 / 1,353 R7 entries inside the provisional direct spoken-core candidate set;
- 622 outside it;
- 67 outside-core entries that were already classified `handled_structurally` before R7;
- 239 outside-core manual-review entries whose Cifu Jyutping was reconstructed.

A controlled experiment removing all 67 structural/outside-core atomic entries reduced the inherited regression failures from **317 to 314**, with no new failures. The three recovered cases were `三年。`, `兩年喇。`, and `半年。`.

The project restriction on #796 (Cifu ranks 1001–1250) remains in force. `三年` is rank 1139 and therefore was **not** selected for permanent retirement.

A second causal-safe experiment removed only the non-#796 recovered entries:

- `兩年` — historical Cifu rank 977;
- `半年` — historical Cifu rank 1749.

That controlled comparison reduced regression failures from **317 to 315 with zero new failures**. These are transparent quantified-time expressions already licensed structurally; their atomic R7 entries are therefore justified `retire_regression` candidates.

## Historical R7 status

`src/runtime-resources/lexicon/token-lexicon/frequency-gap-fill-r7.js` remains provenance for the 2026 Cifu coverage expansion, but its old comments/policy are no longer governing.

Its neutral `lexical_item` records are candidates for review, not protected lexical truth. Common entries may be retained and upgraded; structural or low-value entries may be retired under the causal rule above.

Historical PR #791 and stale work claim #790 remain useful provenance for why those entries were introduced.

## Audit metrics going forward

Future lexical reports should separate at least:

1. final common spoken priority core coverage (`core_atomic` + `core_structural`) out of exactly 2,000;
2. atomic runtime lexical coverage for `core_atomic` items;
3. total runtime lexical inventory size;
4. low-value deferred inventory;
5. regression retirements with causal evidence;
6. protected common-core items still exposing parser regressions.

A raw “Cifu 2,000 / 2,000 exact surfaces in the token lexicon” metric is historical only and must not drive runtime decisions.

## Scope

This priority policy does not by itself promote construction productivity/status, survey/native-panel evidence, corpus classifications, release state, or deployment state.

Parser changes remain allowed when necessary to preserve genuinely common spoken Cantonese behavior. Lexical retirement is preferred only when the entry is demonstrably low-value or structurally unnecessary and causally contributes to regression.
