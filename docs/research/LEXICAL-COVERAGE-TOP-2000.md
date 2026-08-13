# Common spoken Cantonese lexical priority core

## Governing outcome

Canto Span's lexical development priority is **2,000 contemporary, commonly used spoken Cantonese items/surfaces**. This replaces the historical rule that every Cifu SpokenAdult top-2,000 surface must remain as an atomic token-lexicon entry.

The priority change does **not** mean uncommon Cantonese should be deleted.

- Common contemporary Cantonese is highest priority for parser support and regression reconciliation.
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

The first direct-corpus candidate pass contains exactly 2,000 ranked surfaces:

- 836 attested in both HKCanCor and CantoMap;
- 1,314 also present in the historical Cifu top 2,000;
- 686 outside the historical Cifu top 2,000.

This is a **frequency candidate pool, not the final curated lexical core**. Its lower tail contains proper names, MapTask/navigation-domain vocabulary, productive number/time strings, and segmentation artifacts. Those require curation and backfill so domain concentration does not displace more generally useful spoken vocabulary.

## Secondary evidence

Cifu SpokenAdult frequency remains useful because it also incorporates HKCAC and adds spoken-domain breadth missing from the two directly queryable frozen corpora. Use Cifu rank/frequency as secondary corroboration and backfill evidence, never as mandatory inclusion or lexical identity.

Frozen Rime-Cantonese may corroborate contemporary surfaces/readings. Rime weights are not frequency evidence and Rime is not an independent POS/semantic authority.

Words.hk, Jyut.net, corpus context, and Cantonese linguistic research remain appropriate expert adjudication sources where lexicality, reading, or contemporary usage is unclear.

## Final classifications

Every reviewed item should resolve to one of these outcomes:

- `core_atomic` — common contemporary Cantonese item requiring an atomic lexical runtime analysis;
- `core_structural` — common Cantonese surface/sequence whose productive grammar/construction analysis is preferred over a fake atomic lexeme;
- `defer_valid_low_frequency` — valid Cantonese but uncommon, formal-only, archaic, specialist, or otherwise lower priority for parser accommodation;
- `remove_nonlexical_or_non_cantonese` — not a genuine Cantonese atomic lexical item and therefore eligible for removal from the token lexicon;
- `research_required` — evidence conflict still requiring expert review.

The final priority core should contain exactly 2,000 common spoken items/surfaces after curation and backfill. A `core_structural` surface may count toward common-language coverage without requiring an atomic token-lexicon entry.

## Regression policy

Regression establishes **priority**, not lexical validity.

- Common/core Cantonese regression: keep the lexical item and treat the parser behavior as a high-priority repair obligation.
- Rare/formal/archaic/specialist but valid Cantonese regression: the parser accommodation may be deferred; keep the valid lexeme.
- Invalid/nonlexical/non-Cantonese atomic entry: remove the bad lexical entry because it is not a legitimate atomic Cantonese lexeme. Regression improvement may support the diagnosis but is not required to justify removal.

The project is **not expected to solve every inherited regression** while rebuilding lexical priorities.

`死 sei2` is a useful reference case: direct spoken evidence marks it as common Cantonese. Any parser issue involving it is therefore a parser obligation, not a lexical deletion opportunity.

## R7 cleanup

Historical PR #791 added 1,353 neutral `lexical_item` entries to force exact Cifu top-2,000 surface coverage. Those entries are now review candidates rather than protected lexical truth.

The common-priority audit is:

`data/lexical-frequency/common-spoken-cantonese-r7-priority-audit.tsv`

Initial counts:

- 731 / 1,353 R7 entries occur in the provisional direct spoken-core candidate set;
- 622 are outside it;
- 67 outside-core entries had already been classified `handled_structurally` before R7;
- 239 outside-core manual-review entries have reconstructed Cifu Jyutping.

These counts identify review priority only. Being outside the provisional core does **not** make a valid Cantonese word removable.

### Confirmed invalid atomic entries

`兩年` and `半年` were removed from the R7 atomic token lexicon. The reason is lexicality, not rarity: both are transparent quantified-time expressions (`兩/半 + 年`) already handled compositionally, so their R7 `lexical_item` records falsely treated productive Cantonese phrases as atomic lexemes.

A diagnostic comparison also showed that removing those fake atomic entries eliminated two inherited regression failures without creating new ones. That is supporting evidence that the atomic entries interfered with the intended structural analysis, but the governing reason for deletion is that they are not atomic lexical items.

`三年` showed the same structural problem in the broad experiment, but it lies inside the separately protected #796 rank band and remains untouched under the user's standing restriction.

No further deletion should be selected merely by searching for regression-count improvement.

## Historical R7 status

`src/runtime-resources/lexicon/token-lexicon/frequency-gap-fill-r7.js` remains provenance for the Cifu expansion. Its neutral records must be adjudicated rather than assumed to be genuine lexical items.

Outcomes may include:

- retain/upgrade a genuine Cantonese lexeme;
- keep a genuine but low-priority Cantonese lexeme without prioritizing parser accommodation;
- replace a fake atomic entry with structural handling;
- remove malformed, contaminated, non-Cantonese, or otherwise nonlexical material.

Historical PR #791 and stale work claim #790 remain provenance for why the entries were introduced, not current retention policy.

## Audit metrics going forward

Lexical reports should separately track:

1. final common spoken priority core coverage (`core_atomic` + `core_structural`) out of exactly 2,000;
2. atomic runtime coverage of `core_atomic` items;
3. total valid Cantonese lexical inventory size;
4. valid low-frequency/deferred inventory;
5. invalid/nonlexical entries removed;
6. common-core items still exposing parser regressions.

The historical “Cifu 2,000 / 2,000 exact surfaces in the token lexicon” metric must not drive runtime decisions.

## Scope

This work does not by itself promote construction productivity/status, survey/native-panel evidence, release state, or deployment state. Parser changes may be made when necessary for genuinely common Cantonese, but this task does not require all regression failures to be reconciled.