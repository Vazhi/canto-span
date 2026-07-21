# CP026 Resource + 用嚟/用來 re-audit checkpoint

Status: **source and implementation re-audit complete; construction remains `provisional_reaudit`**

Parser behavior changed: **no**

## Plain-language claim currently supported

Published and public Cantonese sources show examples in which overt material appears before `用嚟` or `用來`, followed by a predicate describing use, purpose, or an action performed with the item. The sources analyze this area as instrumental serial-verb structure, purposive `嚟`, or conventionalized `用嚟/用來`.

They do not establish the parser's complete resource class, a unique intended-function node, unrestricted predicate compatibility, or all current exclusion rules.

## Source review

- Wong 2023 was reopened at the exact page. `呢個用嚟切嘢` is a published illustrative example classified as an Instrumental SVC. It is not traceable to a speaker recording in the cited passage.
- Cheung 2018 was reopened at the exact pages. It supports purposive `V1 + 嚟 + V2` and says `用來/用嚟` has become a disyllabic expression.
- Hong Kong Memory contains `另一邊用來儲物`, but it is editorialized interview-derived narrative, not marked direct speech.
- The Countryside Conservation Office page directly quotes `呢間屋用嚟擺嘢、養豬養牛`. This is one direct natural quotation. Its coordinated predicate is not cleanly covered by the frozen parser.
- Chor 2018 supplies the broader separate-user, perfective actual-use boundary `啲錢我用嚟買晒嗰堆嘢`.
- Matthews 2006 bibliographic metadata was verified, but the chapter full text was not reopened. It receives no specific current claim weight.

The former statement that there were three independent natural attestations is withdrawn.

## Code review

The frozen runtime at `main.js:7797–8052`:

- approximates a non-person resource through broad parser slots;
- requires adjacent `用 + 嚟/來` and a parser-recognized verb-like predicate;
- separates selected overt-user, modal, copular, negated, and perfective-predicate profiles;
- preserves subject/topic underdetermination for the direct resource;
- does not test whether the relation semantically states an assigned or intended function;
- rejects coordination punctuation or `同埋/或者` before building the relation;
- can assign the narrow subtype to broad probes such as `香港用嚟切嘢` and `呢個問題用嚟切嘢`.

Legacy runtime metadata still says `supported_productive` and `promotion_candidate_pending_render_and_heldout`. Those values are stale and will be corrected only in a later runtime candidate.

## Implementation probe

Twenty-two controlled cases were run against byte-identical v0.5.183:

- narrow subtype present: 6;
- broad `IntendedFunctionRelation` only: 5;
- no intended-function relation: 11.

Source-linked findings:

- `呢個用嚟切嘢`: narrow subtype present;
- `另一邊用來儲物`: absent and blocked by lexical/Jyutping gaps for `另` and `物`;
- `呢間屋用嚟擺嘢`: narrow subtype present;
- full coordinated direct quote: target node appears, but the overall diagnostic is blocked and predicate vocabulary is incomplete.

## Speaker work

No valid Speaker A review is yet recorded for this construction. A Cantonese Speaker A form has been prepared.

All second-speaker recruitment and review work is frozen at the user's request. The two-speaker requirement is preserved and still blocks `supported_productive`.

## Status decision

`ResourceUseLaiFunctionRelation` remains `provisional_reaudit` because:

- exact sources and examples are now checked;
- boundaries and implementation behavior are documented;
- no first-speaker review is complete;
- the public semantic claim is broader than the runtime can justify;
- implementation misses or incompletely handles source-linked examples;
- the required second speaker is frozen, not waived.

No held-out set was opened and no runtime change was made.


## Subsequent public-panel update

A later 23-response public panel snapshot was screened and committed under a one-time pilot exception. It counts as limited external panel evidence but contributes zero promotion-eligible independent speakers. See `CP026-P1-RUL01-PUBLIC-PANEL-R1-RESULT.md`. This addendum does not alter the original checkpoint's historical state at the time it was written.
