# Top-2000 spoken Cantonese lexical coverage audit

## Outcome

The runtime lexicon now contains an **exact lexical surface for every one of the 2,000 highest-ranked Cifu SpokenAdult forms**.

This is an inclusion target, not a lexicon-size cap. Existing lexical items outside the frequency list remain in the runtime. On the completed R7 branch:

- Cifu top-2,000 exact-surface coverage: **2,000 / 2,000 (100%)**
- Total runtime lexical entries: **2,388**
- Total runtime unique lexical surfaces: **2,384**
- Runtime unique surfaces outside the Cifu top 2,000: **384**
- Exact top-2,000 surfaces whose Cifu/runtime reading correspondence remains sense-uncertain: **24**

No pre-existing lexical item was removed because it fell outside the top-2,000 list.

## Frequency source

The ranking uses Lai & Winterstein's **Cifu v1** lexicon, pinned at commit `8d5e4903e419193f903823880a7815712072cc80`, ranking unique non-empty forms by integer `SpokenAdult` frequency. Exactly the 2,000 highest-frequency forms with positive adult-spoken counts are retained.

The result is therefore a reproducible **Cifu adult-spoken top 2,000**, not a claim that one universal Cantonese frequency ranking exists.

Cifu supplies the ranked surface, adult-spoken frequency, Jyutping field, definition field, and structure metadata. Earlier reviewed batches also used independent lexical checks such as Wiktionary where useful.

## Coverage history

Before the first top-2,000 audit additions, only a minority of the ranked surfaces had direct runtime entries. R1–R6 added 184 independently reviewed entries. After those batches the audit contained:

- 623 `covered_main`
- 24 `surface_covered_sense_uncertain`
- 179 `handled_structurally`
- 833 `missing`
- 341 `manual_review`

R7 changes the purpose of those latter classifications. They are no longer used as reasons to withhold an exact lexical surface. R7 materializes **1,353 exact neutral lexical entries** corresponding to the former:

- 833 `missing`
- 341 `manual_review`
- 179 `handled_structurally`

Together with the 647 exact surfaces already present, this produces **2,000/2,000 exact frequency-list coverage**.

## R7 representation

R7 entries live in:

`src/runtime-resources/lexicon/token-lexicon/frequency-gap-fill-r7.js`

They are intentionally represented conservatively as neutral lexical items when POS or grammar-role assignment is not yet independently verified:

- `label: "lex"`
- `pos: "lexical_item"`
- `syntax: "lexical_item"`
- Cifu-derived surface, rank, frequency, reading field, and definition/notes retained for review

This separates two questions that should not have been conflated:

1. **Should the runtime know this lexical surface exists?**
2. **What POS, syntactic affordances, senses, and parser behavior should it receive?**

The first question is now complete for all 2,000 ranked surfaces. The second is a subsequent verification/adjudication task.

## Regression policy

Lexical coverage is not removed merely because it exposes a parser regression, snapshot change, or audit failure. Those failures diagnose runtime behavior that may need repair; they do not make a supported lexical surface cease to exist.

The earlier decision to exclude `死 sei2` because it activated an unwanted parse was therefore reversed. `死` is retained in R7 lexical coverage. Parser behavior involving it is a separate repair problem.

Tests remain useful diagnostics, but maintaining green tests is not itself the lexical-coverage objective.

## Total lexicon versus frequency subset

The top-2,000 list is only a benchmark subset of the runtime lexicon. The completed branch contains **2,384 unique lexical surfaces**, of which **384 are outside the top-2,000 Cifu set**. Those additional entries remain available and should continue to expand whenever justified by research, corpus, survey, teaching, or parser-development needs.

Future lexical audits should therefore report at least two separate metrics:

1. benchmark coverage, such as `2,000 / 2,000` Cifu surfaces;
2. total runtime lexical inventory size.

Neither metric should be used as a reason to delete valid vocabulary.

## POS verification follow-up

R7 intentionally does not guess POS merely to finish the coverage benchmark. Human-assigned follow-up issues divide the top-2,000 ranking into manageable review bands. Those reviews should verify POS and, where useful, reading/sense distinctions using independent lexical evidence and local Ubuntu tooling.

POS correction may replace neutral `lexical_item` metadata with better-supported lexical categories. It must not delete a frequency-list surface solely because grammar support is incomplete.

## Reproducibility

Canonical audit data:

`data/lexical-frequency/cifu-spoken-top-2000.tsv`

Permanent audit tool:

`tools/lexical-coverage/top-2000-audit.mjs`

The audit compares the ranked Cifu subset against the **full runtime token lexicon**, including `frequency-gap-fill-r7.js`, and separately reports total runtime unique surfaces and surfaces outside the benchmark set.

## Scope

This work expands lexical coverage only. It does not by itself establish construction productivity, grammar identity, parser correctness, construction status, evidence sufficiency, survey/native-panel state, corpus adjudication, release state, or deployment state. Those consequences remain separate work.