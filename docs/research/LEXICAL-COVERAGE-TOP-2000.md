# Common spoken Cantonese lexical priority core

## Governing outcome

Canto Span's lexical development priority is **2,000 contemporary, commonly used spoken Cantonese lexical items**. This replaces the historical rule that every Cifu SpokenAdult top-2,000 surface must remain as an atomic token-lexicon entry.

The priority change does **not** mean uncommon Cantonese should be deleted.

- Common contemporary Cantonese lexemes are highest priority for parser support and regression reconciliation.
- Rare, archaic, formal-only, specialist, or domain-specific **valid Cantonese remains valid vocabulary**. It may be deferred rather than forcing immediate parser work.
- Runtime deletion is limited to entries that are **not genuine Cantonese atomic lexical items**: non-Cantonese noise, malformed or contaminated forms, segmentation artifacts, and productive/compositional strings incorrectly materialized as atomic lexemes.
- Regression is useful diagnostic evidence but is not, by itself, a deletion criterion.

## Why the Cifu-only target was retired

Cifu remains useful frequency and discovery evidence, but it is not a safe lexical authority by itself.

The project evidence contract records that:

- Cifu SpokenAdult rank/surface is derived from Hong Kong Cantonese spoken corpora and is useful frequency evidence;
- Cifu English definitions and much of its Jyutping derive from yeDict/CEDICT-derived material and therefore carry no independent Cantonese lexical-semantic or POS authority;
- Cifu tokenization was re-segmented for the frequency lexicon, so an exact Cifu surface boundary does not prove atomic lexicality;
- reconstructed `*` Jyutping is especially low-confidence candidate metadata.

The historical exact-surface benchmark therefore mixed genuine lexemes with productive sequences, malformed entries, and other material that should not automatically become atomic runtime lexicon entries.

## Primary commonness evidence

The reproducible direct-spoken candidate generator is:

`tools/lexical-coverage/export-common-spoken-core.py`

It uses frozen **PyCantonese 5.0.0** HKCanCor and CantoMap word-token counts. For each Han-containing token it records raw counts and per-million frequency independently in both corpora, then combines the two rates with equal corpus weight.

Generated evidence:

- `data/lexical-frequency/common-spoken-cantonese-core-2000.tsv`
- `data/lexical-frequency/common-spoken-cantonese-core-2000.manifest.json`

The first direct-corpus candidate pass contains exactly 2,000 ranked **surfaces**, not 2,000 adjudicated lexical items:

- 836 attested in both HKCanCor and CantoMap;
- 1,314 also present in the historical Cifu top 2,000;
- 686 outside the historical Cifu top 2,000.

This is a **frequency candidate pool, not the final lexical core**. Its lower tail contains proper names, MapTask/navigation-domain vocabulary, productive number/time strings, and segmentation artifacts. Curation must exclude nonlexical/non-general candidates and backfill from lower-ranked spoken candidates until exactly 2,000 genuine common lexical items remain.

A frequent compositional sequence may still be important grammar evidence, but it does **not** occupy one of the 2,000 lexical-core slots merely because a corpus tokenizer emitted it as one token.

## Secondary evidence

Cifu SpokenAdult frequency remains useful because it also incorporates HKCAC and adds spoken-domain breadth missing from the two directly queryable frozen corpora. Use Cifu rank/frequency as secondary corroboration and backfill evidence, never as mandatory inclusion or lexical identity.

Frozen Rime-Cantonese may corroborate contemporary surfaces/readings. Rime weights are not frequency evidence and Rime is not an independent POS/semantic authority.

Words.hk, Jyut.net, corpus context, and Cantonese linguistic research remain appropriate expert adjudication sources where lexicality, reading, or contemporary usage is unclear.

## Curation outcomes

Every candidate should resolve to one of these outcomes:

- `core_atomic` — a genuine common contemporary Cantonese lexical item; these count toward the final 2,000;
- `common_structural_surface` — common Cantonese sequence handled productively/compositionally; retain as grammar/commonness evidence but **do not count it as a lexical-core item**;
- `defer_valid_low_frequency` — genuine Cantonese lexeme but uncommon, formal-only, archaic, specialist, or otherwise lower priority; retain in the broader lexicon but not necessarily the common 2,000;
- `remove_nonlexical_or_non_cantonese` — not a genuine Cantonese atomic lexical item and therefore eligible for removal from the token lexicon;
- `research_required` — lexicality/commonness evidence conflict still requiring expert review.

The final common lexical core is complete only when exactly **2,000 `core_atomic` lexical items** have been established after exclusions and backfill. Structural sequences are tracked separately.

## Regression policy

Regression establishes **priority**, not lexical validity.

- Common/core Cantonese regression: keep the lexical item and treat parser behavior as a high-priority repair obligation.
- Rare/formal/archaic/specialist but valid Cantonese regression: parser accommodation may be deferred; keep the valid lexeme.
- Invalid/nonlexical/non-Cantonese atomic entry: remove the bad lexical entry because it is not a legitimate atomic Cantonese lexeme. Regression improvement may support the diagnosis but is not required to justify removal.

The project is **not expected to solve every inherited regression** while rebuilding lexical priorities.

`死 sei2` is the reference case: it is strongly represented in direct spoken evidence, so parser trouble involving it is a parser obligation rather than a lexical deletion opportunity.

## Invalid atomic cleanup checkpoint

Historical PR #791 added 1,353 neutral `lexical_item` entries to force exact Cifu top-2,000 surface coverage. Those records are now review candidates rather than protected lexical truth.

The current expert retirement ledgers are:

- `data/lexical-frequency/r7-invalid-atomic-retirements.tsv`
- `data/lexical-frequency/r7-invalid-atomic-retirements-1251-2000.tsv`

They contain **213 unique surfaces** already adjudicated as non-atomic, malformed/noisy, or otherwise invalid as whole lexical entries. Frequency and regression counts are not used to select these targets.

Cleanup results:

- **204** invalid neutral R7 atoms were removed from `frequency-gap-fill-r7.js` across the staged cleanup, including the earlier `兩年` and `半年` structural removals;
- a whole-runtime audit then found **9** of the same invalid surfaces in older curated token modules: `好多人`, `我知`, `邊間`, `好貴`, `好靚`, `一次`, `第二個`, `沿住`, and `係咪`;
- those nine whole-surface records were removed while their component words and productive constructions remain available;
- `data/lexical-frequency/invalid-atomic-runtime-audit.json` now reports **0 runtime hits across all 213 adjudicated invalid targets**.

This cleanup covers the completed expert bands #792, #793, #794, #795, #797, #798, and #799. The separately active/protected **#796 ranks 1001–1250 were not changed**.

Ambiguous items were deliberately not deleted merely because an adjudication had once marked them unresolved. Plausible proper names, domain lexemes, conventional locatives, and directional terms require positive evidence of invalidity before retirement.

## Historical R7 status

`src/runtime-resources/lexicon/token-lexicon/frequency-gap-fill-r7.js` remains provenance for the Cifu expansion, but its original blanket-retention comments/policy are historical rather than governing.

Outcomes for surviving entries may include:

- retain/upgrade a genuine common Cantonese lexeme;
- keep a genuine but low-priority Cantonese lexeme without prioritizing parser accommodation;
- remove a fake atomic entry while preserving structural handling;
- remove malformed, contaminated, non-Cantonese, or otherwise nonlexical material.

Historical PR #791 and stale work claim #790 remain provenance for why the entries were introduced, not current retention policy.

## Audit metrics going forward

Lexical reports should separately track:

1. final common spoken lexical core: exactly 2,000 genuine `core_atomic` items;
2. common structural surfaces excluded/backfilled from the lexical core;
3. atomic runtime coverage of the 2,000 common lexemes;
4. total valid Cantonese lexical inventory size;
5. valid low-frequency/deferred inventory;
6. invalid/nonlexical entries removed;
7. common-core items still exposing parser regressions.

The historical “Cifu 2,000 / 2,000 exact surfaces in the token lexicon” metric is provenance only and must not drive runtime decisions.

## Scope

This work does not by itself promote construction productivity/status, survey/native-panel evidence, release state, or deployment state. Parser changes may be made when necessary for genuinely common Cantonese, but this task does not require all regression failures to be reconciled.
