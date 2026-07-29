---
title: AB15 — Cantonese demonstrative-classifier-noun source scope R1
status: primary_source_synthesis_complete
construction_uuid: 4f6df953-62d1-5036-80b3-40bc8f02937e
construction_code: AB15
canonical_name: DemonstrativeClassifierNounNP
intake_issue: 264
work_claim: 307
reviewed_on: 2026-07-29
primary_source_ledger: docs/research/AB15-CLASSIFIER-NP-PRIMARY-SOURCE-LEDGER-R1.tsv
---

# AB15 — Cantonese demonstrative-classifier-noun source scope R1

## Executive finding

The current AB15 surface profile is directly and strongly supported:

```text
overt demonstrative + overt classifier + overt noun
```

with **no overt numeral in the construction span**.

This is not merely an accidental substring of a numeral-bearing phrase. Primary
sources independently recognize both:

```text
Dem + Num + CL + N
Dem + CL + N
```

as Cantonese noun-phrase structures. Edited examples include `嗰張檯`, `呢間學校`,
`呢件事`, and `呢位同事`.

The primary literature also requires several corrections and qualifications to the
old repository-only audit:

1. A no-numeral classifier phrase may receive a **cardinality-one interpretation** in
   one formal semantic analysis, but this is not evidence for inserting a hidden
   surface `一`.
2. Cheng and Sybesma explicitly argue that Cantonese classifier-noun phrases do not
   require a covert numeral. The structural and semantic claims can coexist if the
   project preserves their theoretical level instead of reconstructing a token.
3. Headless `Dem + CL` is independently licensed through noun ellipsis and must remain
   separate from AB15's overt-head profile.
4. Classifier and measure-word categories are not safely collapsed. Xia reports a
   systematic Cantonese syntactic distinction, but the connected review could verify
   only the official thesis abstract; item-level classification still requires the
   full evidence or another exact source.
5. Classifier-noun selection is not a simple universal compatibility table. General
   `個`, alternative classifiers, discourse context, register, number, speaker group,
   and lexical meaning all affect choice. A parser may maintain a conservative
   attestation inventory, but it must not convert every unattested pairing into a
   categorical sentence-level rejection.

AB15's identity is therefore **source-aligned and defensibly narrow as written**. The
research does not justify broadening it to numeral-bearing, headless, bare-classifier,
or modifier-complex noun phrases. It also does not justify status promotion or an
immediate runtime change.

## Research question

What exact Cantonese profile is directly supported for
`AB15 DemonstrativeClassifierNounNP`, and what evidence distinguishes it from:

- headless demonstrative-classifier nominals;
- `Dem + Num + CL + N` phrases;
- bare `CL + N` phrases;
- modifier-bearing noun phrases;
- classifier versus measure-word structures; and
- classifier-noun choices not represented in the maintained compatibility data?

## Current permanent profile

```text
Dem + CL + overt N
```

The current identity excludes:

- an overt numeral inside the AB15 span;
- a missing noun reconstructed from context;
- a missing classifier reconstructed after the demonstrative;
- bare classifier-noun phrases without a demonstrative;
- automatic acceptance of every middle-item and noun combination.

These exclusions remain appropriate, but “classifier compatibility” needs a more
careful interpretation than the previous audit supplied.

## Primary source base

The proposition ledger is:

`docs/research/AB15-CLASSIFIER-NP-PRIMARY-SOURCE-LEDGER-R1.tsv`.

### Bond and Sio 2024

Bond and Sio distinguish four unmodified Cantonese NP patterns:

```text
D-(X)-C-N    definite
X-C-N        indefinite
C-N          definite or indefinite
N            indefinite
```

Their exact demonstrative example is:

```text
呢 (一) 個 蘋果
nei1 (jat1) go3 ping4gwo2
this (one) CL apple
```

They build distinct formal analyses for demonstrative noun phrases with and without an
overt numeral. Their no-numeral construction has semantic cardinality one but is marked
as not explicitly enumerated.

This gives direct support for AB15's no-numeral subtype. It does **not** authorize:

- accepting an overt numeral as part of AB15;
- inserting an unpronounced numeral node;
- equating semantic cardinality with surface token identity; or
- adopting Bond and Sio's HPSG structure as the only possible analysis.

### Cheng and Sybesma 2014

Cheng and Sybesma give the unmarked Chinese order:

```text
Dem + Numeral + Classifier + Modifier + Noun
```

and state two Cantonese-specific generalizations that directly bound AB15:

- a demonstrative may, but need not, be followed by a numeral;
- a Cantonese demonstrative must be followed by a classifier.

They also state that Cantonese `CL + N` phrases are common **without a covert numeral
having to be assumed**. Their summary profile explicitly includes:

```text
[Dem (Nume) Cl N]
```

The apparent difference from Bond and Sio is analytical, not a reason to choose one
source and discard the other. Canto Span can preserve both:

- no hidden surface numeral or parser node;
- optional semantic cardinality-one metadata when an independently accepted analysis
  requires it.

### Matthews and Yip, Chapter 6

The edited grammar directly attests no-numeral headed demonstrative-classifier phrases:

```text
嗰張檯      that table
呢間學校    this school
呢件事      this matter
呢位同事    this colleague
```

It also separately presents:

- bare classifier-noun phrases;
- measure or quantity classifiers;
- sortal classifiers;
- alternative classifiers; and
- possessive constructions involving classifiers.

This confirms that the visible `Dem + CL + N` sequence is ordinary Cantonese and that
classifier-bearing noun phrases belong to several independently constrained profiles.

### Xia 2025

Xia's official thesis record reports grammaticality-judgement evidence for a systematic
syntactic distinction between Cantonese classifiers and measure words:

- Cantonese classifiers are analyzed in a right-branching structure;
- Cantonese measure words are analyzed in a left-branching structure;
- the two categories are structurally and categorially distinct.

This is strong support for keeping classifier and measure-word typing explicit.
However, the connected reader could not retrieve the repository PDF, so this review
does not claim page-level examples or use the abstract to classify a particular
ambiguous lexeme.

The correct consequence is a bounded audit, not a blanket rule that every traditional
“measure word” is excluded from a demonstrative NP. Cantonese descriptive traditions
use terms such as classifier, measure classifier, group classifier, container, and
quantity expression differently. Item-level structure and interpretation must decide
the profile.

## Source-supported positive profile

A clean AB15 positive requires:

1. an overt demonstrative;
2. an overt middle element independently licensed as the classifier of the headed
   noun phrase under the project's accepted analysis;
3. an overt noun head;
4. no overt numeral inside the AB15 span;
5. one continuous or compositionally recoverable headed NP relation without hidden
   token insertion.

Source-linked examples include:

| Surface | Structure | AB15 disposition |
|---|---|---|
| `嗰張檯` | distal Dem + sortal CL + overt N | positive |
| `呢間學校` | proximal Dem + sortal CL + overt N | positive |
| `呢位同事` | proximal Dem + human CL + overt N | positive |
| `呢件事` | proximal Dem + event/abstract-noun CL + overt N | positive |
| `呢個蘋果` | proximal Dem + general CL + overt N | positive |

These examples establish lexical and semantic diversity beyond one classifier or noun
class. They do not establish that every classifier can combine with every noun.

## Sibling profiles and exclusions

### Overt numeral: `Dem + Num + CL + N`

This is a source-supported sibling, not an ungrammatical form:

```text
呢一個蘋果
呢三本書
```

The overt numeral contributes an explicitly enumerated quantity and changes the
construction span. AB15 should not absorb the numeral or treat the longer phrase as an
identical profile. A parser may still represent an AB15-like substructure only if the
project's constituent policy explicitly allows it and does not erase the numeral; the
current permanent profile does not authorize that inference.

### Headless `Dem + CL`

Cheng and Sybesma discuss noun ellipsis after a classifier. Therefore:

```text
呢個
嗰本
```

can be grammatical in an appropriate context, but they are not AB15 because the noun is
not overt. The project must not create a hidden noun merely to reuse the headed profile.

### Bare `CL + N`

Cantonese `CL + N` is independently common and can receive definite or indefinite
interpretations. It is not AB15 because no demonstrative is present.

Examples such as `個蘋果` and `個窗` belong to a separate classifier-noun profile even
when their internal classifier-noun relation resembles the headed portion of AB15.

### Missing classifier: `Dem + N`

The primary syntax source states that a Cantonese demonstrative must be followed by a
classifier. A plain sequence such as `呢書` is therefore not licensed as the ordinary
AB15 profile, and the parser must not repair it by inserting `本` or `個`.

This does not rule out lexicalized forms, quotations, code-switching, dialectal data, or
annotation errors. Such material must be classified from context rather than silently
normalized.

### Modifier-bearing noun phrases

Cheng and Sybesma document fuller noun phrases containing demonstratives, numerals,
classifiers, modifiers, the modification marker, and nouns. Matthews and Yip also give
appositional and possessive classifier structures.

Therefore an intervening modifier is not automatically a malformed noun phrase. It is
simply not the minimal contiguous AB15 profile unless an independently defined
composition preserves:

- the demonstrative;
- the classifier;
- the modifier and any `嘅`;
- the overt noun; and
- the correct constituent boundaries.

The project must not flatten:

```text
Dem + CL + modifier + 嘅 + N
```

into a three-token `Dem + CL + N` construction by deleting the modifier.

## Cardinality one without a hidden numeral

The source set distinguishes three levels:

1. **surface form:** no numeral is pronounced or written;
2. **syntactic analysis:** Cheng and Sybesma say no covert numeral need be assumed for
   Cantonese classifier-noun phrases;
3. **semantic analysis:** Bond and Sio assign no-numeral classifier phrases a
   cardinality of one.

Canto Span should encode only the claims required by its representation:

- preserve the observed no-numeral surface form;
- do not insert `一`;
- allow a source-attributed cardinality-one interpretation in research metadata;
- do not make cardinality one a prerequisite for every future theory or parser node.

## Classifier versus measure-word boundary

The old audit said `Dem + measure-unit + N` was included only if the middle element was
independently typed. That remains directionally correct but needs refinement.

### What is established

- Cantonese sources distinguish sortal classifiers, quantity or measure classifiers,
  alternative classifiers, and other classifier-like expressions.
- Xia reports a systematic syntactic distinction between Cantonese classifiers and
  measure words.
- Child and discourse studies indicate that general `個` readily substitutes for many
  sortal classifiers but not freely for mensural expressions.

### What is not established

- one project-wide binary list that classifies every lexeme for every construction;
- that all traditional “measure classifiers” have identical syntax;
- that every element between a demonstrative and noun belongs to AB15;
- that learner-facing label `measure word` determines the internal linguistic category.

### AB15 consequence

AB15 should remain defined using the internal category `classifier`, but item-level
eligibility must be based on source-supported syntax and use rather than English label
matching. Issue #309 remains necessary to reconcile:

- source terminology;
- internal lexical typing;
- learner-facing display labels;
- demonstrative, numeral, bare-classifier, and measure-predicate constructions.

## Classifier-noun compatibility is graded and variable

The old audit treated compatibility as though the project could select one
“incompatible classifier-noun pairing” as a categorical negative. The primary evidence
requires a more conservative policy.

### General-classifier evidence

Tse, Li, and Leung report that Cantonese-speaking children strongly prefer `個` and use
it in place of many sortal classifiers, while not substituting it freely for mensural
classifiers. Adult discourse studies likewise find general classifiers highly frequent.

### Alternative and discourse-conditioned classifiers

Matthews and Yip explicitly discuss alternative classifiers. Erbaugh reports that
synonymous sortals are common and that speakers vary. Nagy and Lo find similar general
and mass-classifier preferences in Hong Kong and heritage spontaneous speech, with
classifier choice strongly affected by noun number.

### Project consequence

A compatibility inventory may be useful as a conservative attestation and ranking
resource, but it should distinguish:

- source-attested preferred pairing;
- attested general-classifier alternative;
- semantically shifted classifier choice;
- register-sensitive or discourse-conditioned alternative;
- unattested in the reviewed data;
- judged degraded by a defined speaker population;
- structurally impossible because the middle item is not a classifier in that profile.

“Not present in the current compatibility table” is not equivalent to
“ungrammatical Cantonese.”

A negative fixture should therefore target a source-backed structural or category
boundary, or a controlled classifier-choice contrast with documented speaker and
context conditions. The implementation must not invent one arbitrary mismatch merely
to satisfy a gate.

## Revised boundary matrix

| Surface/profile | AB15 disposition | Reason |
|---|---|---|
| `呢本書` | positive | no-numeral Dem-CL-overt N |
| `嗰間餐廳` | positive | distal headed profile |
| `呢個蘋果` | positive | general classifier with overt head |
| `呢三本書` | separate sibling | overt numeral is preserved |
| `呢個` | headless sibling | noun ellipsis; no hidden noun |
| `本書` | bare classifier-noun sibling | no demonstrative |
| `三本書` | quantified classifier sibling | numeral present, demonstrative absent |
| `呢書` | not ordinary AB15 | required classifier is absent; no repair |
| `呢件好複雜嘅事` | modifier-bearing composition | do not delete modifier or `嘅` |
| `呢啲魚` | requires item/profile typing | headed Dem-CL-N is visible; plural/quantity semantics and category must remain explicit |
| `呢班人` | requires source-specific classifier/measure analysis | group meaning cannot be decided from slot alone |
| unattested CL-N pairing | unresolved, not automatic negative | requires source, corpus, and speaker-context evidence |
| mensural expression in a superficial Dem-X-N sequence | not automatically AB15 | classifier/measure-word syntax must be established |

## Consequences for issue #308

The former implementation issue is partly valid and partly over-specified.

### Still justified

- record the completed structural source audit;
- preserve AB15 identity and `research_pending` status;
- add explicit boundaries for numeral-bearing, headless, bare-classifier, missing-
  classifier, and modifier-bearing profiles;
- preserve every overt token and avoid hidden numeral, classifier, or noun insertion;
- regenerate discovery output only from accepted canonical metadata.

### Not yet justified

- adding an arbitrary “incompatible classifier-noun” negative before the compatibility
  research establishes a controlled, source-backed contrast;
- assuming every measure-word-labeled item is outside AB15;
- treating a longer modifier-bearing or numeral-bearing NP as globally malformed rather
  than outside the narrow profile.

Issue #308 should depend on #309 for any classifier/measure or compatibility-specific
fixture. The structural source-closure changes can remain independent.

## Final disposition

- AB15 no-numeral `Dem + CL + overt N` profile: **directly primary-source supported**.
- Identity narrowing: **not required**.
- Overt numeral sibling: **independently supported and separate**.
- Headless `Dem + CL`: **independently supported through noun ellipsis and separate**.
- Bare `CL + N`: **independently supported and separate**.
- Missing classifier after a demonstrative: **not licensed as ordinary AB15; no hidden
  repair**.
- Semantic cardinality one: **source-attributed interpretation, not a hidden token**.
- Classifier versus measure word: **genuine structural research boundary; item-level
  audit still required**.
- Classifier-noun compatibility: **graded, alternative-rich, and population/context
  sensitive; no automatic negative from table absence**.
- AB15 linguistic status: **unchanged `research_pending`**.
- UUID, identity, runtime, fixtures, survey, release, and deployment: **unchanged in
  this findings issue**.
