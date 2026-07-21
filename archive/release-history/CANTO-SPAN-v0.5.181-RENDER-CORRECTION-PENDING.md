# Canto Span v0.5.181 — rendered-review correction pending

Date: 2026-07-20

## State

- accepted baseline: **v0.5.180**
- active candidate: **v0.5.181**
- target: `ResourceUseLaiFunctionRelation`
- first render adjudication: **FAIL — 88/90 PASS**
- evaluator custody: **seven cases, sealed and unopened**
- candidate frozen: **no**
- `supported_productive`: **1**

## Why the first render was rejected

The target subtype and all seven boundaries behaved as intended, but two learner-facing checks failed:

1. `呢個杯用嚟飲水` rendered `杯` as a measure word rather than the noun **cup**.
2. `呢張紙用來寫字` rendered written `來` as `lai4` rather than `loi4`.

No hidden evaluator material was opened.

## Bounded correction

- `呢個杯` / `嗰個杯` now expose `杯 bui1` as a noun/head noun.
- Independent classifier `杯` remains available elsewhere.
- Intended-function `嚟` remains `lai4`.
- Intended-function written `來` now remains `loi4`.
- No construction definition, boundary, evidence weight, grammar status, or held-out commitment changed.

## Headless validation after correction

- packet lock: **21/21 PASS**
- visible evaluation: **83/83 PASS**
- implementation audit: **26/26 PASS**
- current focused: **19/19 PASS**
- aggregate regression: **545/545 PASS**
- accepted-baseline topology: **545/545 PASS**
- native naturalness: **33/33 PASS**
- I02 preservation: **24/24 PASS**
- grammar legitimacy: **1100/1100 PASS**
- documentation consistency: **PASS — 0 broken links before checkpoint update**

## Resume

Install the replacement v0.5.181 runtime, rerender `CANTO-SPAN-v0.5.181-RENDER-REVIEW.md`, and return both JSON exports. Inspect all twelve rows again. Only a clean second render can freeze the exact candidate and authorize opening custody.
