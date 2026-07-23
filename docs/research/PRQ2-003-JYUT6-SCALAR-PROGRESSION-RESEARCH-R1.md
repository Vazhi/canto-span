---
title: PRQ2-003 — jyut6 scalar progression and comparative-correlative research
research_id: PRQ2-003
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
queue_visibility: completed_task_only
implementation_authorized: false
status_change_authorized: false
master_backlog_change_authorized: false
---

# PRQ2-003 — `越 … 越 …` and `越嚟越 …` scalar progression

## Research decision

Promote Cantonese paired `越 … 越 …` comparative correlatives and
monoclausal `越嚟越 …` progressive-scalar expressions to one dedicated
**research unit with two noninterchangeable subtypes**.

The checked Cantonese-specific evidence directly supports a paired correlative in
which each `越 jyut6` introduces a degree- or extent-sensitive predicate. The
construction relates changes on two scales: as the value associated with the
first predicate changes, the value associated with the second changes in a
corresponding direction. The second scale need not increase in an ordinary
positive direction; negation can yield a “the more X, the less Y” interpretation.

The checked lexical and natural-attestation evidence also supports
`越嚟越 jyut6 lai4 jyut6` as an established Cantonese expression meaning
“increasingly / progressively / more and more.” It normally tracks one entity,
quantity, state, or event property through time or an unfolding trend rather
than directly correlating two independently expressed predicates.

The two patterns are historically and semantically related, but current evidence
does **not** justify one parser rule. They differ in surface structure,
dependency type, ellipsis behavior, and collision profile. In particular, the
internal `嚟` of `越嚟越` must not be assigned ordinary directional-motion
semantics merely because standalone `嚟` is a motion verb.

This note authorizes no parser change, registry entry, construction-status
change, master-backlog edit, lexical installation, test promotion, or automatic
acceptance rule.

## Narrow supported profiles

### A. Paired comparative correlative

The strongest supported research schema is:

```text
(SUBJECT-A) + 越 + GRADABLE/EXTENT PREDICATE-A,
(SUBJECT-B) + 越 + GRADABLE/EXTENT PREDICATE-B
```

The subjects may be different:

```text
你越講，佢越緊張。
“The more you talk, the more nervous he becomes.”
```

The second scale may move in the opposite ordinary direction:

```text
你越講，佢越唔聽。
“The more you talk, the less he listens.”
```

A shared subject may be expressed only once:

```text
小明越食越肥。
“As Siu Ming eats more, he gets fatter.”
```

Discourse may also supply a shared participant:

```text
越講越亂。
“The more (one/you/we) talks, the more confused it becomes.”
```

These paraphrases identify the constructional dependency; they are not
executable semantic representations. The checked sources do not establish an
unrestricted predicate inventory, a complete subject-ellipsis rule, or all
possible tense, aspect, particle, and clause-order combinations.

### B. Monoclausal progressive `越嚟越`

The strongest supported research schema is:

```text
(SUBJECT / DOMAIN) + 越嚟越 + GRADABLE PROPERTY / QUANTITY / EVENT PROPERTY
```

Examples supported by checked lexical and natural-attestation sources include:

```text
天氣越嚟越凍。
你越嚟越靚。
佢啲中文越嚟越好。
越嚟越多人……
越嚟越難搵到好工。
```

A useful semantic paraphrase is:

```text
Across successive times or stages, the value on one contextually supplied scale
moves progressively in a direction characterized by the following predicate.
```

The source inventory supports adjectives, evaluative predicates, quantity
expressions such as `多`, and complex predicate material such as `難 + VP`.
It does not establish that every verb or nominal expression can follow the unit.

## Direct source findings

The source-verification ledger is:

`PRQ2-003-JYUT6-SCALAR-PROGRESSION-SOURCE-VERIFICATION-R1.tsv`

### Tang 2003

Tang's thesis *Comparative Correlatives and Parallel Occurrences of Elements*
directly analyzes Cantonese `jyut6 … jyut6 …` examples as lexical comparative
correlatives.

The Cantonese examples include:

```text
你越講，佢越緊張。
你越講，佢越唔聽。
佢越高，我越開心。
```

The analysis supports these points:

- Cantonese uses overt paired `越` markers in the comparative-correlative
  construction;
- the markers relate two degree or extent variables rather than independently
  modifying two unrelated predicates;
- the construction can express increasing/increasing and
  increasing/decreasing correspondences;
- omitting one member of the paired marking destroys the intended correlative
  interpretation in the source's Cantonese judgments;
- an overt `過 gwo3` comparison can occur inside the scope of a correlative
  `越`, so surpass comparison and comparative correlation are not mutually
  exclusive;
- verbal extent material can participate, including a source example involving
  `跳得越高`;
- the thesis proposes additional binding and matching restrictions, but these
  theoretical claims are not independently sufficient for executable parser
  boundaries.

The accessible full thesis does not report a modern acceptability experiment or
representative Cantonese speaker sample for every judgment. It therefore
supports the existence and core dependency but not unrestricted productivity or
all starred boundaries as population-level facts.

### CUHK CANCORP documentation

The Chinese University of Hong Kong's CANCORP documentation describes the
corpus, transcription revision, and POS scheme. The published tag inventory
assigns `越 … 越 jyut6 … jyut6` to the category `corr` “correlative,” alongside
`又 … 又`.

This is useful independent confirmation that the paired form was treated as a
conventional adult-language correlative in an established Cantonese corpus
annotation project. The documentation explicitly says adult criteria were used
for category assignment even though the corpus records child–adult interaction.

The tag inventory does not define full syntax, prove adult productivity, or
resolve whether every child or adult token instantiates the same construction.

### HKCanCor project extraction

The repository's verified HKCanCor candidate inventory contains exact natural
adult-corpus material including:

```text
越講越亂。
```

and:

```text
即係尤其是越有制度嘅地方呢，
就變咗係越難去推行哩一樣嘢。
```

The first is a compact shared-domain paired correlative. The second shows a
longer discourse relation in which the first `越` scopes over a property of
places and the second over difficulty of implementation, with overt `就`
between the members.

These hits establish natural attestation only. Two corpus examples do not define
frequency, exhaustive word order, the role of `就`, or all possible predicate
classes.

### Words.hk

Words.hk lists `越嚟越 / 愈嚟愈` as a Cantonese adverb meaning that something
gradually develops in a direction. It supplies exact examples such as:

```text
越嚟越大
天氣越嚟越凍。
```

This supports conventional lexical identity, Cantonese pronunciation, and a
progressive-trend meaning. A dictionary entry does not establish complete
syntax, historical derivation, productivity, or the precise boundary between an
adverbial unit and a more internally compositional construction.

### Bauer 2018 written-Cantonese attestation

Bauer's academic article on written Cantonese is itself written substantially in
Cantonese and contains an exact `越嚟越多香港學校…` occurrence. This supplies an
independent edited-prose attestation of `越嚟越 + quantity/domain` outside a
pedagogical example.

The article does not analyze this construction, so it has attestation weight but
no direct boundary-setting weight.

### Liu 2008 and Shi & Wang 2021

Mandarin research has analyzed `越來越` as related to the comparative
correlative while also undergoing lexicalization or constructional
conventionalization. Liu proposes a light-verb `來` analysis and argues that the
string is developing toward a degree adverb; Shi and Wang argue for a historical
constructional development rather than simple substitution into a paired
`越 … 越 …` template.

These studies provide a useful structural warning: synchronically compact
“more and more” expressions need not be identical to productive biclausal
comparative correlatives. They do **not** determine the Cantonese syntax,
pronunciation, lexicalization stage, or predicate inventory of `越嚟越` and have
zero direct parser-promotion weight.

## Structural and semantic analysis

### 1. Covariance, not two independent degree modifiers

In the paired construction, the two `越` phrases jointly express a dependency.
The meaning is not simply:

```text
Predicate A has a high degree, and predicate B has a high degree.
```

Instead, values on one scale are associated with corresponding values on the
other. This is why the source contrasts a fully paired Cantonese example with a
surface containing only the first or only the second correlative marker.

A future analysis must therefore preserve:

1. the first scalar or extent-bearing predicate;
2. the second scalar or extent-bearing predicate;
3. the correspondence relation between them;
4. subject or participant sharing where independently recoverable;
5. polarity internal to either predicate.

### 2. “More–less” does not require a different marker

Cantonese can use the same `越 … 越 …` markers where the second predicate is
negative:

```text
你越講，佢越唔聽。
```

The decreasing interpretation is contributed by the polarity and lexical scale
of the second predicate, not by replacing the second `越` with a dedicated
“less” marker.

A future implementation must not hard-code both scales as increasing in a
positive evaluative direction.

### 3. Predicate licensing

Directly supported materials include:

- gradable properties such as height, nervousness, happiness, fatness, and
  difficulty;
- activity predicates interpreted by extent, frequency, or progression, such
  as talking and eating;
- degree complements following `得`, as in jumping higher;
- negative predicates in the second member;
- complex nominal/property material inside one member.

This does not prove that every stative, eventive, modal, existential, nominal,
or idiomatic predicate is scalar. Predicate licensing must be independently
established rather than inferred from mere adjacency to `越`.

### 4. Same-subject and different-subject profiles

Different overt subjects are directly represented in the primary analysis:

```text
你越講，佢越緊張。
```

A repeated subject may be omitted in compact profiles:

```text
小明越食越肥。
越講越亂。
```

The omission should be represented as shared or discourse-recoverable only when
the construction and context support it. The parser must not invent a specific
unexpressed subject or object.

Tang proposes stricter anaphoric restrictions for some two-clause Cantonese
examples. Those restrictions should remain research hypotheses pending a
controlled contemporary speaker panel; they must not be encoded from the thesis
alone.

### 5. Optional linkers and punctuation

HKCanCor includes a longer example with overt `就` between the two `越`
members. This shows that a correlative relation can coexist with additional
clause-linking material in at least one natural discourse.

The checked Cantonese-specific sources do not establish a full inventory of
licensed connectors, whether `就` is optional across all profiles, or whether a
pause/comma is required. Orthographic punctuation cannot define the
construction.

### 6. `越嚟越` is not literal directional motion

In `越嚟越凍`, the internal `嚟` does not introduce a motion event or deictic
path. The expression contributes progressive change over time or stages.

This creates a direct collision with the current runtime's standalone
`DirectionalMotionVP` analysis of `嚟`. A future parser must protect the compact
`越嚟越` environment before ordinary directional-motion wrapping, while still
allowing genuine motion uses of `嚟` elsewhere.

### 7. `越嚟越` versus paired `越 … 越 …`

The two patterns share scalar progression but differ in dependency structure:

| Property | Paired `越 … 越 …` | `越嚟越 …` |
|---|---|---|
| Overt scalar predicates | two | normally one following predicate/domain |
| Core relation | covariance between two scales | progressive change on one scale over time/stages |
| Internal `嚟` | absent | fixed/conventionalized component |
| Subject pattern | same or different subjects | normally one subject/domain |
| Ellipsis | second subject/domain may be shared | following scalar predicate normally required |
| Main collision | generic clause relation / loose predicates | false directional-motion analysis |

The relation between the two may be represented in research as inheritance or
historical affinity. That does not justify identical runtime labels.

### 8. Quantity and complex-predicate hosts

`越嚟越多` demonstrates that the host need not be a simple adjective. Natural
examples also support material equivalent to `越嚟越難 + VP`.

This requires caution around existing NP and degree wrappers:

- `多 + 人` may form a quantified/person NP internally;
- `難 + VP` may form an evaluative or modal-like predicate;
- neither child analysis captures the higher progressive scalar operator.

The future host inventory should be established through exact source and panel
contrasts rather than a generic “any following span” rule.

### 9. Lexical and orthographic boundaries

Exclude at minimum:

- lexical `越過` “cross/surpass”;
- proper-name material such as `越南`;
- incomplete `越嚟越` with no recoverable scalar host;
- two unrelated clauses each containing lexical `越`;
- ordinary `嚟` motion between adjacent degree words;
- single unmatched correlative `越` unless a licensed elliptical analysis is
  independently established.

Written variants `越嚟越`, `愈嚟愈`, and formal `越來越` are attested in
Cantonese resources. Orthographic equivalence and pronunciation normalization
must be documented separately from syntax.

## Runtime collision audit

The collision ledger is:

`PRQ2-003-JYUT6-SCALAR-PROGRESSION-COLLISION-AUDIT-R1.tsv`

Direct v0.5.213 probes show:

- ordinary paired examples receive no top construction;
- compact same-subject and discourse-shared examples receive no construction;
- a long HKCanCor sentence may receive complete `ClauseRelationGraph` coverage
  through `就`, but neither `越` member nor covariance is typed;
- every tested `越嚟越` example incorrectly exposes internal `嚟` as
  `DirectionalMotionVP`;
- quantity and predicate children such as `多人` may be recognized while the
  progressive operator is lost;
- missing-first-marker and missing-second-marker controls produce unrelated
  partial parses rather than a paired construction;
- lexical `越過` and proper-name `越南` are not safely distinguished through a
  dedicated `越` inventory.

A root-coverage PASS in the long `就` example is therefore a false sense of
structural completeness: generic clause wrapping does not establish the target
correlative relation.

## Collision and merger decisions

### `DegreeStativePredicate`

A degree-stative predicate may be a child of either member:

```text
越緊張
越安全
越嚟越凍
```

It does not encode pairing, covariance, temporal progression, or the special
`越嚟越` unit. Retain only as a potential child analysis.

### `ScalarEvaluation`

Existing scalar-evaluation infrastructure concerns particular evaluative
predicates and cannot serve as a general replacement. The target relates scale
values across clauses or times; it is not merely an evaluation of one scalar
property.

### `ClauseRelationGraph`

A generic clause graph may supply future structural substrate for long paired
examples, especially where `就` is overt. It must not be considered sufficient
unless the two `越`-headed scalar members and their covariance relation are
represented.

### `DirectionalMotionVP`

Standalone `嚟` remains a valid motion predicate in other environments. Inside
`越嚟越`, however, the current motion analysis is a false positive and must be
blocked by any future construction-specific handling.

### `QuantifiedPersonNP` and other NP wrappers

These may correctly represent a child such as `多人`, but they cannot absorb the
preceding progressive-scalar operator. Full analysis requires both the internal
NP and the higher `越嚟越` dependency.

### Surpass comparison with `過`

The primary source allows an overt comparison standard inside a correlative
member. Do not make `越 … 越 …` and `過` comparatives mutually exclusive.
Equative, surpass, differential, and correlative structures must remain
separately typed even when nested.

## Required negative-boundary inventory

Before any parser change, test at least:

### Paired correlative positives

- `你越講，佢越緊張。`
- `你越講，佢越唔聽。`
- `小明越食越肥。`
- `越講越亂。`
- `密碼越複雜越安全。`
- `佢跳得越高，我越開心。`
- a natural `越 … 就 … 越 …` profile;
- same-subject and different-subject profiles;
- positive and negative second predicates.

### `越嚟越` positives

- `天氣越嚟越凍。`
- `你越嚟越靚。`
- `佢啲中文越嚟越好。`
- `越嚟越多人……`
- `越嚟越難 + VP`;
- written variants `愈嚟愈` and `越來越` with pronunciation review.

### Required exclusions or quarantines

- `你越講，佢好緊張。` — unmatched first marker;
- `你講，佢越緊張。` — unmatched second marker;
- `越嚟越。` — missing scalar host without supporting context;
- `我越過條線。` — lexical cross/surpass;
- `越南好熱。` — proper name;
- ordinary deictic `嚟` motion;
- non-gradable predicates with no independently established scale;
- multiple nested `越` expressions without a supported matching relation;
- punctuation-only distinctions;
- Mandarin-only `越來越` restrictions imported without Cantonese evidence.

## Native-panel requirements

A future blinded instrument should separate rather than mix:

1. paired `越 … 越 …` with different subjects;
2. paired forms with a shared subject;
3. negative second predicates;
4. verbal extent predicates and `得` complements;
5. overt `就` between members;
6. `越嚟越` with adjectives;
7. `越嚟越` with quantity expressions;
8. `越嚟越` with complex predicates;
9. unmatched-marker controls;
10. literal-motion and proper-name controls;
11. orthographic variants;
12. context-sensitive ellipsis.

The instrument should collect naturalness, intended interpretation, correction,
and regional/register information. Written-only judgments cannot settle prosodic
or pause boundaries.

## Open questions

1. Which event predicates have a conventional measurable extent suitable for
   paired `越 … 越 …`?
2. How broad is shared-subject omission, and when is an overt second subject
   required or disfavored?
3. What contemporary Cantonese judgments support or reject the thesis's proposed
   pronoun and matching restrictions?
4. Is `就` freely optional, semantically restricted, or register-dependent
   between the two members?
5. Which aspect markers and sentence-final particles may occur in each member?
6. Can either member be a nominal or existential predicate, and under what
   scalar interpretation?
7. Is `越嚟越` synchronically one lexical adverb, a partially compositional
   construction, or multiple register-dependent analyses in Cantonese?
8. Which predicate classes follow `越嚟越`, especially verbs, modals, quantity
   expressions, and negative predicates?
9. How should `越來越`, `越嚟越`, and `愈嚟愈` be normalized without erasing
   pronunciation or register?
10. What corpus frequency and distribution distinguish paired and monoclausal
    profiles in adult conversational Cantonese?

## Current disposition

- dedicated research unit: **yes**;
- paired comparative-correlative subtype: **directly supported**;
- monoclausal progressive `越嚟越` subtype: **directly attested and lexically supported**;
- single unified executable rule: **not supported**;
- exact productive predicate inventory: **unresolved**;
- `就` distribution: **attested but not generalized**;
- pronoun/matching restrictions: **theoretical source claim requiring panel replication**;
- parser implementation: **not authorized**;
- construction-status change: **not authorized**;
- master-backlog change: **not authorized**;
- private queue inclusion: **prohibited**.

## Later implementation prerequisites

1. Review a broader adult Cantonese corpus for both patterns.
2. Verify exact natural examples across adjectives, verbs, quantities, and
   negative predicates.
3. Run a blinded native panel with matched positive and boundary contrasts.
4. Resolve `就`, subject sharing, and `得`-complement behavior.
5. Decide whether `越嚟越` requires lexical protection before motion parsing.
6. Define explicit exclusions for `越過`, `越南`, ordinary `嚟`, and incomplete
   strings.
7. Keep child predicate/NP analyses visible under a higher scalar dependency.
8. Re-run complete regression, documentation, source-accounting, and release
   verification after any implementation proposal.
