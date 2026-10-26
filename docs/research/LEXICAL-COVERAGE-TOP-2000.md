# Common spoken Cantonese priority inventory

## Governing outcome

Canto Span's immediate lexical-development priority is **2,000 commonly used Cantonese items grounded in actual spoken Cantonese evidence**.

Frequency determines **priority**, not whether valid Cantonese is allowed to remain in the runtime.

The current removal rule is deliberately narrow:

> **Only Mandarin contamination is a lexical-removal/correction target in this work. Genuine Cantonese stays.**

Do not remove or exclude a Cantonese item because it is:

- compositional or constructional;
- a formula, numeral/time expression, directional sequence, or productive phrase;
- a proper name, place name, organization name, domain term, or task-specific expression;
- rare, archaic, literary, formal, specialist, or low frequency;
- shared with Mandarin or Standard Written Chinese;
- inconvenient for parser regression.

Foreign-origin Cantonese loanwords also remain Cantonese vocabulary when they are genuinely used in Cantonese.

Lexical atomicity can be tracked as a separate linguistic property, but **it is not a deletion criterion in this task**.

## What counts as Mandarin contamination

A correction requires positive evidence that a represented **surface, reading, sense, POS/category, classifier use, grammatical function, or gloss is Mandarin-only contamination and lacks independent Cantonese support for that same analysis**.

Use the narrowest correction supported by the evidence:

1. contaminated gloss/sense -> reject only that sense;
2. contaminated reading -> reject/correct only that reading;
3. contaminated POS/classifier/function -> reject only that analysis;
4. whole surface -> remove only if the lexical item itself is shown to be Mandarin-only/non-Cantonese in the relevant usage and no independent Cantonese evidence rescues it.

A form is **not** Mandarin contamination merely because Mandarin also uses the same Chinese characters or cognate vocabulary.

## Cifu provenance firewall

Cifu remains useful frequency/discovery evidence, especially its SpokenAdult ranking. But its metadata is not an independent Cantonese lexical authority.

The project evidence contract records that:

- Cifu SpokenAdult frequency is based on Hong Kong Cantonese spoken corpora and is useful frequency evidence;
- Cifu English definitions and much of its Jyutping were imported from yeDict, an adaptation of CEDICT Mandarin-English for Cantonese;
- many missing readings were reconstructed automatically;
- Cifu segmentation is a candidate tokenization and does not determine Cantonese lexical identity.

Therefore:

- **Cifu SpokenAdult rank/surface** -> frequency/discovery evidence;
- **Cifu definition** -> low-trust search hint only;
- **Cifu Jyutping** -> candidate reading only, especially weak when reconstructed with `*`;
- **explicit `(Mandarin)` material** -> contamination warning requiring exclusion of that analysis unless independent Cantonese evidence specifically rescues it.

## Primary commonness evidence

Direct spoken evidence is generated from frozen **PyCantonese 5.0.0** HKCanCor and CantoMap data. Preserve the two corpora separately and use their counts/rates to rank development priority.

Current candidate evidence includes:

- `data/lexical-frequency/common-spoken-cantonese-core-2000.tsv`
- `data/lexical-frequency/common-spoken-cantonese-core-2000.manifest.json`
- `data/lexical-frequency/common-spoken-cantonese-candidates-5000.tsv`
- `data/lexical-frequency/common-spoken-cantonese-candidates-5000.manifest.json`

These are **spoken-frequency candidate inventories**. They do not authorize deleting Cantonese items for lexicality, domain, proper-name status, register, or parser behavior.

Cifu SpokenAdult adds a third spoken-frequency perspective through HKCAC and remains useful as secondary frequency corroboration.

## Rescue/adjudication evidence

Frozen Rime-Cantonese is a pronunciation/orthography rescue layer. It is not POS, semantic, lexicality, or frequency authority.

For disputed Cifu metadata, use independent Cantonese evidence such as:

- HKCanCor/CantoMap context and readings;
- Words.hk;
- Jyut.net / Jyut Dictionary;
- Cantonese dictionaries and reference grammars;
- direct Cantonese linguistic research;
- completed expert adjudications #792-#799 and later explicit consolidation records such as #884/#886.

Absence from one resource is not negative evidence.

## Mandarin-contamination ledgers

Two narrow ledgers own the current contamination findings:

- `data/lexical-frequency/cifu-explicit-mandarin-contamination.tsv` — Cifu definitions explicitly marked `(Mandarin)`;
- `data/lexical-frequency/cifu-mandarin-oriented-adjudication.tsv` — additional Mandarin-oriented senses/categories or whole surfaces identified by expert Cantonese adjudication.

At the current checkpoint:

- **23** explicit `(Mandarin)` Cifu cases have been isolated;
- **3** additional Mandarin-oriented findings (`仲`, `法官`, `多少`) have been isolated through expert adjudication;
- **25 of 26** contaminated findings remain valid Cantonese surfaces in another independently supported Cantonese analysis and therefore receive analysis-level rejection/correction only;
- **1 of 26**, rank 1404 `多少`, is positively identified as Standard written Chinese rather than Cantonese and has no Cantonese whole-surface rescue; the reviewed runtime removes that surface while preserving the generated Cifu record as provenance and retaining Cantonese `幾多`;
- the independent common-spoken-Cantonese development-priority inventory remains **2,000 items**; Cifu exact-surface runtime coverage is intentionally **1,999/2,000** after the `多少` removal and is no longer treated as a lexical-validity target.

Examples:

- `走 zau2`: retain Cantonese `走`; reject Cifu's `to walk (Mandarin)` sense.
- `面 min6`: retain Cantonese noun/locality uses; reject the Mandarin flat-object classifier imported by Cifu.
- `公司 gung1 si1`: retain Cantonese organization noun; reject the Mandarin `家` classifier metadata.
- `把 baa2`: retain independently supported Cantonese classifier/lexical behavior; reject the Mandarin disposal-construction analysis.
- `仲 zung6`: retain Cantonese `still/yet/also`; reject Cifu's Mandarin-oriented `middle/second in seniority` sense family for this spoken item.
- `法官 faat3 gun1`: retain Cantonese person/title noun `judge`; do not import Cifu's free verbal `to judge` analysis.
- `多少 do1 siu2`: CantoDict explicitly marks the form Standard written Chinese rather than Cantonese and supplies `幾多` as Cantonese; remove the whole surface from the effective Cantonese runtime rather than retaining it for a historical coverage count.

## Correction of historical PR #843 cleanup

PR #843 used a broader policy that removed entries for being non-atomic/compositional or otherwise outside a proposed atomic lexical core. That policy is superseded by the user's clarified rule.

Under active claim #844:

- the seven runtime/bundle files changed by #843 have been restored to their pre-#843 lexical state;
- the earlier 213 Cantonese removals are therefore not retained as runtime deletions;
- broad invalid-atom retirement ledgers/reports and their deletion tools are removed from the active branch;
- direct spoken-frequency evidence produced during that work is retained because it remains useful.

Historical #843 remains provenance for how the mistaken broader cleanup occurred; it is not current lexical policy.

## Runtime implementation rule

Before changing runtime lexical data, compare each contamination finding with the actual runtime analysis.

- If the runtime already represents only the valid Cantonese analysis, **make no runtime change**.
- If the runtime entry is neutral `lexical_item` coverage and does not encode the contaminated sense/category, **do not delete it merely because Cifu's gloss is contaminated**.
- If the runtime explicitly encodes the Mandarin-only sense/reading/category, remove or correct that specific analysis.
- Delete an entire runtime surface only if positive evidence establishes that the represented lexical item itself is Mandarin-only in the relevant usage and Cantonese rescue fails.

A zero whole-surface deletion count is valid when contamination is confined to source metadata. It is not a target: `多少` demonstrates that positive surface-level evidence can and should produce a whole-surface removal under the same narrow rule.

## Regression policy

Parser regression is not lexical evidence.

- A genuine Cantonese item stays even when it causes parser regression.
- Common Cantonese regressions receive higher development priority.
- Rare/formal/specialist Cantonese regressions may be deferred.
- Regression reduction is never sufficient reason to call a Cantonese item Mandarin contamination.

## Metrics

Track separately:

1. the 2,000-item common spoken Cantonese development-priority inventory;
2. direct HKCanCor/CantoMap counts and cross-corpus support;
3. Cifu secondary frequency rank;
4. Mandarin-contaminated Cifu analyses identified;
5. contaminated analyses actually present in runtime;
6. whole surfaces proven Mandarin-only and removed, if any;
7. valid Cantonese items still exposing parser regressions.

Do not use an atomicity-purity metric as a deletion target.

## Scope

This lexical audit does not by itself change construction identity/status, evidence sufficiency, survey/native-panel state, release state, or deployment state.

## External vernacular top-2,000 functional audit — 2026-08-16

The user-supplied Google Sheet **Most Common Cantonese Words (Frequency List)** is now a bounded external discovery/pronunciation source in addition to the project-owned Cifu/HKCanCor/CantoMap inventories. It is not treated as a lexical whitelist or as sole authority for readings, senses, POS, or grammar.

After normalizing the first 2,000 distinct non-tombstoned surfaces and checking the **effective runtime**, the final functional-coverage result is:

- bounded source items: **2,000**;
- CJK-bearing items: **1,973**;
- exact runtime lexical coverage: **1,407**;
- fully readable compositional runtime coverage: **565**;
- in-scope Cantonese/CJK functional gaps: **0**;
- intentional CJK hold: **1** — `這`, a Standard Written Chinese source row with no source pronunciation, meaning, or example;
- non-CJK rows: **27**.

Thus the in-scope CJK set is **1,972 / 1,972 functionally covered**. Exact whole-string absence is not counted as a lexical failure when the runtime correctly decomposes the expression into readable Cantonese tokens. Productive strings such as negated VPs, pronoun clauses, classifier phrases, particle sequences, and transparent verb-object combinations remain compositional rather than being promoted merely to improve an exact-surface percentage.

The audit also exposed source errors and missing alternatives that were independently checked before runtime use. Representative corrections include `爸 baa4` rather than the Sheet's `ba1`, `簿 bou2` rather than `bou6`, ordinary spoken `爸爸 baa4 baa1` while preserving written `baa1 baa1`, `時間 si4 gaan3 / si4 gaan1`, `處理 cyu5 lei5 / cyu2 lei5`, and final-particle `嘛 maa5 / maa3`. Multi-reading and polyfunctional items remain explicit analyses rather than collapsed defaults.

