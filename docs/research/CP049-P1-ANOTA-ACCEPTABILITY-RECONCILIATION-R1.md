# CP049-P1 — Acceptability A-not-A source/runtime reconciliation R1

Date: 2026-07-22
Release: v0.5.206
Target: `AcceptabilityANotA`
Status change: none

## Why this label was selected

`AcceptabilityANotA` was one of the remaining implementation-only labels and is
learner-facing because `得唔得` is a common transparent A-not-A surface.  Its
legacy fallback was not transparent, however: it labelled any clause containing
at least two `得` tokens and one `唔`, even when the tokens did not form one
adjacent terminal predicate.

## Checked evidence

The source-verification table is
`CP049-P1-ANOTA-ACCEPTABILITY-SOURCE-VERIFICATION-R1.tsv`.

- Sybesma (2013), chapter p. 10, example (11c), contains the exact clause
  `而家問題係佢嗰度得唔得先。`  This supports a clause-final adjacent `得唔得`
  sequence followed by postposed `先`.
- Lui (2023), article p. 71 / PDF p. 5, example (10b), explicitly marks
  `*得唔得三個鐘你可以瞓？` unavailable for the intended restrictive-focus
  question.  The initial `得` in that profile is analyzed as preverbal
  restrictive focus rather than the acceptability predicate represented here.
- Li (2017) remains useful for the broader evaluative A-not-A family but does
  not independently license the exact `得唔得` runtime scope.

## Runtime defect and correction

Before v0.5.206, the legacy fallback required only two `得` tokens and one `唔`
anywhere in the core.  It therefore mislabeled the published restrictive-focus
boundary as `AcceptabilityANotA`.

v0.5.206 requires:

1. adjacent overt `得 + 唔 + 得`;
2. terminal position after stripping ordinary final particles;
3. at most the independently attested postposed `先` after the sequence.

The existing generative route for simple `得唔得？` is retained.  The fallback
continues to cover larger clauses ending in `得唔得` or `得唔得先`, but no longer
converts a nonterminal sequence into an acceptability question.

## Executable evidence

Canonical packet:
`review-packets/cp049-p1-anota-acceptability-r1/focused-evaluation-packet.json`

| Case | Surface | Assertion | Evidence role |
|---|---|---|---|
| `ANOTA-E01` | `而家問題係佢嗰度得唔得先。` | `AcceptabilityANotA` present | exact source attestation |
| `ANOTA-N01` | `得唔得三個鐘你可以瞓？` | `AcceptabilityANotA` absent | explicit published boundary |

The historical `得唔得？` reachability probe remains in the standardized file
with linguistic evidence weight zero.  The two new cases are rebuilt by the
existing construction-test generator and are not a separate validation system.

## Status decision

The label remains `unsupported_generalization`.

The checkpoint supports only one narrow positive profile and one narrow
boundary.  It has no eligible role-neutral panel responses, no complete lexical
or discourse boundary inventory, and no basis for claiming unrestricted
productivity.  Implementation validation and linguistic status remain
separate.

## Copular A-not-A deferral

`CopularANotAQuestion` was inspected in the same question-family pass but was
not changed.  Law (2001) supports `係唔係` with embedded clause complements,
while Li (2017) documents a tag use and explicitly distinguishes tags from
regular A-not-A questions.  The current runtime instead centers nominal and
possessive complements and does not cover several source examples.  Attaching
those sources to the existing runtime as positive tests would overstate the
implementation; broadening the node is outside this bounded reconciliation.

## Result

- one misleading runtime overmatch removed;
- one exact positive and one exact boundary made executable;
- no label added or retired;
- no linguistic status promoted;
- PFV and RUL survey work unchanged.
