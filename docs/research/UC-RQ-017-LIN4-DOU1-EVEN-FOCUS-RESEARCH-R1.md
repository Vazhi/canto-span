---
title: UC-RQ-017 — lin4–dou1 even-focus construction
research_id: UC-RQ-017
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-017 — `lin4 … dou1` even-focus construction

## Research decision

A dedicated research unit is justified for the overt Cantonese scalar-focus frame:

```text
連 lin4 + focused XP + 都 dou1 + predicate
```

Lee 2019 identifies `lin4 … dou1` as a Cantonese focus construction. Lau 2020
separates additive `dou1` from a scalar use conveying unexpectedness and analyzes
the co-occurring `lin4 … dou1` profile as the Cantonese counterpart of English
*even*. Official CUHK teaching materials independently give affirmative and
negative examples.

The checked sources do not support a global rule that overt `lin4` is freely
optional. A preference for dropping `lin4` is documented for the distinct
verb-copy focus construction reviewed in UC-RQ-007. Zero-`lin4` scalar `dou1`,
verb-copy focus, distributive/universal `dou1`, and additive `dou1` therefore remain
separate profiles. This note does **not** authorize silent material, focus inference,
parser behavior, grammar status changes, or productive acceptance.

## Safest checked core

The checked sources support:

- an overt `lin4 + XP + dou1` sequence, with the focused XP between the markers;
- an exceptional or unexpectedly extreme alternative reading for that XP;
- affirmative predicates, including `連星期六都要上堂` and `連你都噉對我`;
- negative predicates, including `連龍肉都食唔落` and `連坐票都冇`;
- subject and object/nominal focus in independently supplied examples;
- embedding of the frame inside a larger clause or relative-clause-like modifier.

Both polarities are therefore attested. Negation is not a general licensing
requirement for overt nominal `lin4 … dou1`, although negative minimizers and the
verb-copy family have narrower independent conditions.

## Checked source findings

The source-verification ledger is:

`UC-RQ-017-LIN4-DOU1-EVEN-FOCUS-SOURCE-VERIFICATION-R1.tsv`

### Lee 2019

The official publisher preview explicitly lists Cantonese `lin4 … dou1
‘even … also’` as a syntactic/grammatical focus construction and distinguishes
Cantonese `dou1 ‘even/also’` from simple one-to-one transfer of Mandarin `dou`.
The available preview establishes the construction's recognition and broader
focus-system context, but not its complete chapter-level judgments or optionality
conditions.

### Lau 2020

The Linguistic Society of Hong Kong abstract distinguishes additive and scalar
uses of `dou`, assigns unexpectedness to the scalar use, and gives a
`sam6zi3lin4 … dou1 … tim1` example whose focused alternative is ranked least
likely. The abstract's `dou1`/`dou2` notation is an analytical use distinction;
it is not sufficient evidence for introducing a Cantonese lexical tone contrast.

### CUHK Cantonese Express

The official teaching resource presents `連……都 lin4……dou1` as a Cantonese
construction and supplies both affirmative and negative-predicate exercises.
It corroborates ordinary pedagogical availability but is not a formal boundary or
acceptability study.

### Lee 2019 verb-focus thesis

The official HKU thesis documents a narrower `V1-dou1-licensor-V2` family and
reports that its Cantonese analysis allows and prefers omission of `lin4`. That
finding is construction-specific evidence for UC-RQ-007, not a license to erase
`lin4` from the overt XP construction reviewed here.

Law 2004 was also checked because it was an original source lead. Its dissertation
directly analyzes Cantonese focus-particle meanings, including scalar readings, but
does not establish the ordinary `lin4 XP dou1` form or its `lin4` optionality. It is
context only, not core evidence for this disposition.

## Exact collision audit

The collision ledger is:

`UC-RQ-017-LIN4-DOU1-EVEN-FOCUS-COLLISION-AUDIT-R1.tsv`

### `FocusParticleFrame`

This internal parser representation supplies no Cantonese construction evidence and
does not encode the two overt markers, their intervening associate, or a scalar
alternative relation. It may eventually carry a generic internal span, but it cannot
absorb the language claim.

### `PriorityMarkerClause`

This quarantined runtime label concerns postverbal `sin1` priority/sequence. It has
no `lin4`, no focus associate bounded by `lin4` and `dou1`, and no scalar
unexpectedness requirement. The candidates must remain separate.

### UC-RQ-007 verb-copy focus

Verb-copy focus shares scalar `dou1`, but it requires two copies of a non-stative
verb, a negator or other licensor, and asymmetric aspect placement. Its documented
zero-`lin4` preference is not a general omission rule for nominal `lin4 XP dou1`.

### Universal, free-choice, and minimizer `dou1`

UC-RQ-008, UC-RQ-020, and UC-RQ-021 cover wh-indeterminates, free-choice readings,
and negative minimizers. Shared `dou1` does not establish shared scalar focus;
quantificational force, polarity, associate type, and alternatives must be tested.

## Required boundaries

Future research must distinguish:

- overt `lin4 XP dou1` from additive `XP dou1` and universal/distributive `dou1`;
- subject, object, adjunct, predicate, clause, and quantified-XP associates;
- affirmative scalar surprise from negative `not even` and minimizer readings;
- ordinary XP focus from UC-RQ-007 verb-copy focus;
- optional overt `lin4` from analyses that posit no `lin4` in the first place;
- scalar likelihood, contextual extremeness, and purely emphatic readings;
- `sam6zi3`, `lin4`, `dou1`, and sentence-final `tim1` contributions;
- natural Hong Kong/Guangzhou usage from constructed and teaching examples.

## Research tasks before any implementation proposal

1. Obtain the complete Lee 2019 chapter and extract every Cantonese contrast.
2. Build an associate-type by polarity matrix with matched additive, universal,
   scalar, free-choice, and minimizer controls.
3. Test overt and absent `lin4` separately for nominal, adjunct, and predicate focus.
4. Record contextual alternative sets and likelihood/extremeness judgments.
5. Test combinations with `sam6zi3`, `tim1`, negation, modals, and aspect.
6. Collect multi-speaker audio and interpretation judgments.
7. Audit parser output only after overt and absent-marker profiles are frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is overt `lin4 XP dou1` a directly recognized Cantonese construction? | **Yes.** |
| Does it support scalar/exceptional focus? | **Yes.** |
| Are both affirmative and negative predicates attested? | **Yes.** |
| Is negation required generally? | **No.** |
| Is overt `lin4` globally optional? | **Not established; quarantined.** |
| May UC-RQ-007's omission preference be generalized? | **No.** |
| Can generic current wrappers preserve the distinction? | **No.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-017 may leave active research only after a typed scalar-focus family,
lossless compositional merge, justified quarantine, or evidence-based retirement is
established. Until then, current grammar statuses and parser behavior remain
unchanged.
