# ISSUE-617 過…未 experiential-question profile disposition R1

Parent issue: #617  
Work claim: #618  
Date: 2026-08-05

## Decision

Retain AA61 `GwoFinalMeiExperientialQuestion` narrowly for a question containing:

```text
overt experiential V過 material + clause-final 未 + optional final particle
```

The defining relation is not final `未` alone. AA61 requires an independently typed experiential child before the final marker and must remain separate from completion questions, preverbal experiential negation, `有冇 + V過`, lexical `過`, and context-dependent fragments.

No hidden `有冇`, repeated negative predicate, omitted clause, or specific theoretical derivation should be inserted by the parser.

## Profile dispositions

| Profile | Disposition | Reason |
|---|---|---|
| `subject + V過 + object + 未 + particle?` | `RETAIN_AS_AA61_CORE` | Multiple independent official and scholarly sources directly attest this sequence with predicate and object variation. |
| `subject + V過 + 未 + particle?` with recoverable object | `SUPPORTED_DISCOURSE-DEPENDENT_SHORT_PROFILE` | Naturalistic school dialogue directly attests `你食過未?` with an established food referent and reply `未食過`. |
| affirmative `V過` | `SUPPORTED_EXPERIENTIAL_STATEMENT_OUTSIDE_AA61` | Experiential aspect without final question marker is a separate statement profile. |
| `未 + V過` | `SUPPORTED_NEGATIVE_EXPERIENTIAL_OUTSIDE_AA61` | Preverbal `未` is an overt negative/not-yet strategy and not final AA61 `未`. |
| `冇 + V過` | `SUPPORTED_NEGATIVE_EXPERIENTIAL_OUTSIDE_AA61` | Official CUHK material directly attests the form as a negative experiential reply. |
| `有冇 + V過` | `SUPPORTED_SEPARATE_EXPERIENTIAL_QUESTION` | The overt suppletive polarity strategy has its own runtime/identity path and must not be normalized to final `未`. |
| `V咗…未` | `SUPPORTED_COMPLETION_QUESTION_OUTSIDE_AA61` | Official contrastive teaching material directly attests final `未` with perfective `咗` and no experiential `過`. |
| `V完…未` | `SUPPORTED_COMPLETION_QUESTION_OUTSIDE_AA61` | Completion/result structure is independently typed and not experiential merely because `未` is final. |
| bare reviewed VP + final `未` | `COMPLETION_OR_CONTEXTUAL_QUESTION_NOT_AA61` | Final `未` is broader than AA61; experiential interpretation requires overt experiential structure. |
| reply fragments `V過`, `未V過`, `冇V過` | `SEPARATE_FRAGMENT_OR_RESPONSE_COMPOSITION` | Replies are attested but do not reproduce the AA61 final-marker construction. |
| lexical/directional `過` | `SEPARATE_LEXICAL_OR_DIRECTIONAL_PROFILE` | Surface identity of the character does not establish experiential aspect. |
| resultative, potential, comparative, or quantifying `過` | `SEPARATE_TYPED_CONSTRUCTION` | Independently researched functions must not transfer evidence to AA61. |
| objectless `V過未` without usable context | `AMBIGUOUS_OR_NEEDS_CONTEXT` | The source supports recoverable omission, not unrestricted context-free analysis. |

## Current runtime comparison

Canonical source inspected:

- `src/parser/detectors/questions/completion-experiential.js`

### Source-aligned behavior

`experientialQuestionBoundaryFallback` requires:

- a node that can fill `experiential_vp`;
- a later node with surface `未`;
- only text or recognized particles after final `未`.

It also checks preverbal `未／冇` before the experiential VP first and routes that material to `NegativeExperiential`. The separate `experientialYesNoQuestionFallback` handles `有冇 + ExperientialVP`.

These order-sensitive distinctions align with the reviewed evidence and AA61's accepted identity.

### Remaining runtime–research gaps

The final-`未` branch currently wraps the entire `core` after confirming only that an experiential VP occurs somewhere before `未`. It does not validate every node between the experiential VP and final marker against the trace template's claimed `topic_or_object?` slot.

As a result, unrelated or untyped intervening material could potentially be absorbed into one `ExperientialQuestion` node if the tail after `未` contains only particles or text.

The runtime also does not explicitly distinguish:

- a full-object experiential VP from discourse-recoverable object omission;
- an embedded or quoted final-`未` question from outer host material;
- completion and experiential ambiguity in very short strings where upstream typing is uncertain;
- permitted final-particle inventories and combinations;
- lexical or directional `過` when upstream typing is wrong or absent.

A later implementation should validate all intervening nodes as part of the typed experiential predicate/object structure or preserve them outside the AA61 node. It must not use arbitrary rest-of-clause capture.

## Current test comparison

Canonical test inspected:

- `tests/constructions/ExperientialQuestion.json`

Current coverage contains:

- one positive: `你飲過茶未？`;
- one preverbal-`未` negative boundary: `我未去過美國。`;
- one `有冇 + V過` question boundary: `你有冇去過澳門呀？`.

This establishes the original distinction but does not test the core's actual span and collision inventory.

A later implementation test package should add:

### Positive AA61 cells

- intransitive or motion experiential VP + place/object + final `未`;
- transitive experiential VP + overt nominal object + final `未`;
- predicate and object variants documented by CUHK;
- optional final `呀` after `未`;
- objectless short form with an explicit test context;
- subject visibly preserved;
- embedded or quoted AA61 with host material preserved outside;
- topic or temporal material kept outside unless transparently licensed.

### Separate composition cells

- affirmative `V過` statement;
- preverbal `未 + V過`;
- preverbal `冇 + V過`;
- `有冇 + V過`;
- positive and negative reply fragments;
- `V咗…未` completion question;
- `V完…未` completion question;
- bare-VP + `未` completion question;
- lexical/directional `過` preserved through its own analysis.

### Negative and collision cells

- final `未` without an experiential VP;
- lexical `過` followed by final `未` accidentally co-occurring in a larger clause;
- unrelated material between the experiential VP and `未`;
- a second clause between the experiential VP and final `未`;
- nonparticle material after `未`;
- repairs, interruptions, quotations, and incomplete alternatives;
- objectless short form without supplied context;
- a specific-time perfective reading where upstream analysis is completion rather than experiential;
- `未` inside a noun, quotation, or lexicalized string.

## Final `未` representation

The source record supports final position and question/polarity function. It does not require one derivational analysis.

A theory-neutral AA61 node should preserve:

- a typed experiential predicate or VP child;
- any overt complement licensed inside that child;
- overt final `未` as a final polarity/question marker;
- optional following sentence-final particle;
- no hidden negative VP or `有冇`;
- explicit context dependence when complement material is omitted.

The parser may record competing analyses in metadata if necessary, but it should not present ellipsis or A-not-A derivation as established fact without stronger evidence.

## Span and composition contract

A later AA61 implementation should:

1. require an overt typed experiential child containing aspectual `過`;
2. place final `未` after that experiential material;
3. permit only typed complement/object material between the experiential head and final marker;
4. reject or preserve outside all unrelated intervening material;
5. keep outer topic, condition, quotation, embedding, focus, discourse relation, and host clause separate;
6. preserve optional final particles as visible material and verify their allowed combinations;
7. distinguish source-supported discourse recovery from context-free omission;
8. keep completion, negative experiential, and `有冇` strategies separate;
9. never infer experiential status from the characters `過` and `未` alone.

## Identity consequence

AA61's current UUID and canonical name correctly expose the two defining overt markers and remain appropriate. No split, merge, rename, or new UUID is authorized.

Potential later family work may organize:

- final-`未` experiential questions;
- `有冇 + V過` experiential questions;
- preverbal negative experiential profiles;
- affirmative experiential clauses;
- completion questions with final `未`.

Family membership must not transfer identity, evidence, or runtime behavior across these profiles.

## Terminal outcome

- full `V過…未` profile: `RETAIN_NARROWLY_AS_AA61`.
- objectless context-linked short form: `SUPPORTED_WITH_CONTEXT`.
- final `未` alone: `INSUFFICIENT_FOR_AA61`.
- current order-sensitive runtime distinction: `SOURCE_ALIGNED`.
- current whole-core/intervening-material policy: `UNDERCONSTRAINED`.
- preverbal `未／冇 + V過`: `SEPARATE_NEGATIVE_EXPERIENTIAL`.
- `有冇 + V過`: `SEPARATE_EXPERIENTIAL_QUESTION`.
- completion `V咗／V完…未`: `SEPARATE_COMPLETION_QUESTION`.
- lexical/directional/resultative `過`: `SEPARATE_TYPED_PROFILE`.
- formal ellipsis derivation of final `未`: `NOT_ESTABLISHED`.
- New UUID: no.
- Status promotion: no.
- Runtime change in this packet: no.

## Next separately claimed action

After this packet merges, one Codex-eligible accepted-specification task may:

1. retain the order-sensitive typed experiential + final `未` requirement;
2. validate every intervening node rather than wrapping arbitrary core material;
3. add explicit context-bearing short-form tests;
4. preserve outer host and final-particle structure visibly;
5. add the controlled completion, negation, 有冇, lexical-過, and repair matrix;
6. regenerate runtime outputs and run relevant verification;
7. make no identity or linguistic-status change.

## Protected-state confirmation

This packet changes no runtime behavior, parser matcher, construction test, fixture, identity, code, linguistic status, corpus classification, survey, panel, held-out, release, package, or deployment state.

## Source inventory

See `docs/research/ISSUE-617-GWO-FINAL-MEI-SOURCE-INVENTORY-R1.md`.
