# CP057-P1 NegatedStativePredicate reconciliation R1

Date: 2026-07-22

Checkpoint: `v0.5.213-negated-stative-predicate-reconciliation`

## Decision

Retain `NegatedStativePredicate` as `research_pending` for the narrow overt
`唔 + independently licensed property predicate` profile. Do not promote it to
provisional or productive status.

## Primary-source review

Yip (1988, p. 452, example 7) gives `Ni go neui jai m leng` “This girl isn’t
beautiful.” The example directly places `m` (`唔`) before the property
predicate and explicitly notes that no verb “to be” occurs. The focused test
normalizes the published romanization as `呢個女仔唔靚。` without changing its
overt structure.

Yip’s immediately following nominal contrast (p. 453, example 8b) requires the
copula in a negative nominal predicate. The focused boundary normalizes that
example as `佢老婆唔係廣東人。` and requires `NegatedStativePredicate` to remain
absent.

Alderete et al. (2017, p. 24 entry 57; p. 27 entry 71) independently describe
predicative adjectives as verb-like and state that the copula `係` is not used
when the predicate is adjectival. This corroborates the copula boundary but
does not establish unrestricted lexical productivity.

## Runtime review

The v0.5.212 runtime has two `NegatedStativePredicate` category templates:

- `唔 + ordinary_stative_predicate`;
- `唔 + dictionary-backed lexicalized_stative_predicate`.

Both explicitly constrain the negator surface to `唔`, preserve the negator and
predicate as separate children, and insert no hidden copula. The lexicalized
template was retained after the v0.5.212 retirement of the conflated
`NegatedLexicalizedStative` label.

## Executable evidence

- positive: `呢個女仔唔靚。` contains `NegatedStativePredicate`;
- boundary: `佢老婆唔係廣東人。` does not contain
  `NegatedStativePredicate`;
- zero-weight probe: `你好似唔開心噃。` continues to protect runtime
  reachability only.

The source examples establish the checked construction and category boundary;
they do not validate the parser’s complete subject-NP analysis.

## Remaining limits

- no role-neutral native-speaker panel evidence;
- no reviewed corpus-frequency inventory;
- incomplete productive property-predicate inventory;
- no evidence here for `冇`, `未`, `咪`, or other negators in this
  construction;
- incomplete discourse, particle, coordination, and embedding boundaries.

## Result

- status changes from `unsupported_generalization` to `research_pending`;
- positive-and-boundary coverage increases from 6 to 7;
- implementation-only coverage decreases from 52 to 51;
- construction assertions increase from 1,245 to 1,247;
- parser behavior is unchanged from the narrow v0.5.212 template boundary.
