# Week 15 corpus-ingress review summary

Source ID: `GLOSSIKA-YUEHK-A1-W15-20260628`  
Review date: `2026-08-02`  
Review authority: project expert systematic review  
Related research: issue #127 and merged PR #273

## Outcome

All **65** preserved records now have terminal ingress decisions. Source wording, order, hashes, Jyutping, English material, the source claims, and the incomplete final `— / 平` phonics row remain unchanged.

| Terminal class | Count |
| --- | ---: |
| Exact duplicate | 10 |
| Lexical-only attestation | 29 |
| New corpus/pronunciation attestation | 21 |
| Naturalness-review candidate | 1 |
| Pronunciation discrepancy | 1 |
| Translation or lexical-gloss discrepancy | 2 |
| Unusable incomplete source | 1 |

Duplicate disposition: **10 accepted exact**, **55 no accepted duplicate**, and **0 normalized duplicates**.

Source discrepancies: **4**.  
Reviewed replacement values asserted: **0**.

## Accepted exact duplicates

- `I011 附近` — `src/runtime-resources/lexicon/token-lexicon`.
- `I012 遠` — `src/runtime-resources/lexicon/token-lexicon`.
- `I013 近` — `src/runtime-resources/lexicon/token-lexicon`.
- `I014 上面` — `src/runtime-resources/lexicon/token-lexicon`.
- `I016 入面` — `src/runtime-resources/lexicon/token-lexicon`.
- `I018 地鐵站` — `src/runtime-resources/lexicon/token-lexicon`.
- `I020 醫院` — `src/runtime-resources/lexicon/token-lexicon`.
- `I021 公園` — `src/runtime-resources/lexicon/token-lexicon`.
- `I024 街` — `src/runtime-resources/lexicon/token-lexicon`.
- `I047 一百萬` — `src/runtime-resources/lexicon/compositional-lexical-phrases.js`.

These decisions use the explicit later canonical-lexicon owners. Other source repetitions, tests, research mentions, archives, and generated inventories remain non-binding mechanical candidates.

## Lexical and numeral disposition

The remaining ordinary place and route terms are retained as lexical-only attestations and later lexical-ingress candidates. The nine uncovered multiples of ten-thousand remain compositional attestations rather than opaque entries. `一百萬` is already represented by canonical compositional and token-lexicon owners.

No runtime lexicon change occurs in this package.

## Formula, route, and question disposition

The sentence and dialog records remain pedagogical corpus attestations except:

- `I003 唔使唔該` remains a naturalness/register review candidate rather than a rejected formula;
- `I056 你食飯咩` is a translation-pragmatics discrepancy because the neutral English polar-question gloss omits final `me1` discourse force.

The route, spatial, arrival-`到`, `aa3`, A-not-A, and wh-question links remain bounded research questions. They do not establish a catch-all route construction, neutral interchangeable question particles, or parser behavior.

## Phonics disposition

Three complete rows (`些／四`, `借／字`, `踢／滴`) are retained only as pedagogical pronunciation attestations. `靚／令` requires independent phonological and lexical verification. `錫／識` contains an unresolved polysemous gloss. The final `— / 平` row is preserved exactly but is unusable as a reviewed pair because the A side is absent.

## Integrity and evidence boundary

- immutable source projections are bound locally and externally;
- the mechanical packet excludes archives, generated bundles, package review outputs, and the package's own final report;
- expert decisions occur only in `review.json` and `expert-review-r1.tsv`;
- accepted duplicate targets require explicit later runtime-owner or deterministic candidate support;
- source claims about register, final `me1`/`aa4`, and phonics remain unadopted without independent evidence;
- no parser, identity, status, survey, release, or deployment inference follows from this review.
