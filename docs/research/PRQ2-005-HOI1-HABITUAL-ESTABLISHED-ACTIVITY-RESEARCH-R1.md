---
title: PRQ2-005 — hoi1 habitual and established-activity aspect research
research_id: PRQ2-005
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
queue_visibility: completed_task_only
implementation_authorized: false
status_change_authorized: false
master_backlog_change_authorized: false
---

# PRQ2-005 — postverbal `開 hoi1` habitual and established-activity aspect

## Research decision

Promote postverbal Cantonese `開 hoi1` to one dedicated **habitual and
established-activity aspect research unit**.

The strongest supported core is:

```text
SUBJECT / TOPIC + V-開 + (OBJECT / COMPLEMENT)
```

In this profile, `開` does not mean lexical “open.” It presents the event,
activity, relation, occupation, residence, or use-pattern as recurrent or
established over a prior interval. In many checked descriptions the pattern
continues up to the present or reference time, or has become characteristic of
the participant.

Directly checked examples include:

```text
佢睇開中醫嘅。
“She usually goes to a Chinese doctor.”

我哋做開呢行。
“We have been in this profession for some time.”

佢用開嗰隻牌子。
“She regularly uses that brand.”

我哋搵開嗰個裝修師傅太忙。
“The decorator we usually deal with is too busy.”

佢哋住開嗰度好方便。
“Where they have been living is very convenient.”

我去開嗰間餐廳冇開呀。
“The restaurant I usually go to is not open.”

你有冇食開啲乜嘢藥㗎？
“Are you taking any medications habitually / on an established basis?”
```

The evidence supports a grammatical aspectual use immediately after a verb and
before an overt object or complement. It does not establish an unrestricted
`ANY VERB + 開` rule.

The same form has at least three neighboring profiles that must remain distinct:

1. lexical `開` “open, turn on, start, operate, hold”;
2. resultative or directional `開` in strings such as `打開` or `行開啲`;
3. subordinate or discourse-linked continuation such as `行開呢邊` and
   `講開佢哋兩個`.

The third profile is explicitly described in a major grammar as a less common
continuative or progressive use. It may be historically or synchronically
related to the habitual marker, but the checked evidence does not justify one
surface rule with one semantic label.

This note authorizes no parser change, registry change, construction-status
change, lexicon installation, acceptance fixture, survey instrument, or master
backlog edit.

## Narrow supported profiles

### A. Recurrent or characteristic activity

```text
SUBJECT + V-開 + OBJECT
```

The CUHK grammar supplement gives:

```text
佢睇開中醫嘅。
```

The source labels `開` habitual and glosses the event as a usual medical-care
practice. This supports a recurring event profile and immediate postverbal
placement.

The grammatical meaning is not equivalent to merely asserting one completed
occasion. Compare the independently represented experiential form:

```text
我睇過呢個醫生。
```

`過` presents prior experience. Habitual `開` presents a recurring or
established pattern. The two may overlap in real-world implication, but their
viewpoint contributions are not interchangeable.

### B. Established occupation, relation, residence, or use-pattern

The intermediate grammar gives:

```text
我哋做開呢行。
佢用開嗰隻牌子。
```

These examples are broader than simple event frequency. `做開呢行` identifies
an established occupation; `用開嗰隻牌子` identifies an established usage
pattern. The best research representation must therefore preserve at least:

- repeated occurrence;
- prior establishment;
- persistence through a contextually relevant interval;
- characteristic association between participant and activity, object, place,
  or role.

A future parser must not reduce all four dimensions to an English adverb such as
“usually.”

### C. Habitual material inside relative or modifying clauses

The checked grammar states that the habitual use commonly appears in relative
clauses and gives:

```text
我哋搵開嗰個裝修師傅太忙。
佢哋住開嗰度好方便。
```

Words.hk gives:

```text
用開電腦打字嘅人，用打字機會打得好慢。
```

These examples show that `V開` may occur inside material modifying a person,
place, object, or discourse referent. A future analysis must preserve the
habitual predicate inside the modifier rather than allowing a broad noun-phrase
or clause wrapper to hide it.

The examples do not establish that every `V開 + demonstrative/classifier` string
is a relative clause. The overt or implicit head and the local syntax must be
identified independently.

### D. `有冇` question over a habitual predicate

A directly attested question is:

```text
你有冇食開啲乜嘢藥㗎？
```

This supports an A-not-A or polarity-question frame whose predicate contains
habitual `食開`. The higher question construction does not replace the
aspectual analysis.

A correct representation must preserve both:

- the question operator `有冇`;
- the habitual predicate `食開啲乜嘢藥`.

The checked evidence does not establish every possible negator, question form,
or ellipsis pattern for habitual `開`.

### E. Lexical/aspect contrast inside one sentence

The grammatical-analysis source gives:

```text
我去開嗰間餐廳冇開呀。
```

The first `開` is habitual after `去`; the second is lexical `開` describing the
restaurant as open. This single example is decisive evidence against a
character-only analysis.

A future parser must determine local host and constituent structure:

```text
去-開  habitual activity
冇 開  lexical opening state/event under negation
```

It must not assign the same role to both occurrences merely because they share
one graph and tone.

## Related but separately quarantined profiles

### F. Continuative or already-underway subordinate `開`

Yip and Matthews describe a less common use in subordinate clauses that marks
continuation of an activity already begun:

```text
我哋行開呢邊，不如去埋時代廣場囉。
“Now that we are already walking this way, let us go on to Times Square.”
```

The contribution is not ordinary repeated habit. It supplies a circumstance or
rationale based on an activity already underway.

This profile should remain research-linked to habitual `開`, but it requires a
separate subtype or relation until the following are established:

- whether the event must already be in progress;
- whether the first clause is temporal, causal, circumstantial, or converbal;
- which predicates license it;
- whether an overt second clause is required;
- whether habitual and continuative readings can be distinguished without
  prosody or discourse context.

### G. Discourse-topic `講開`

The same grammar gives:

```text
講開佢哋兩個，究竟有冇離婚呀？
“Speaking of those two, have they actually divorced?”
```

and the idiom-like:

```text
講開又講吖……
“Speaking of that …”
```

This is a discourse-linking or topic-introducing use, not a straightforward
habitual statement that someone regularly speaks. Its lexical host, clause
position, and discourse function must remain visible.

Do not implement `講開` through a general habitual rule unless independent
evidence shows the exact compositional relation.

### H. Incidental/opportunity profile

Historical and lexical records also contain profiles such as:

```text
去開買餸，幫我買樽豉油吖。
“When you are going grocery shopping anyway, buy me a bottle of soy sauce.”
```

This resembles a converbal circumstance or favorable opportunity. The current
source base is weaker than for the habitual core and the intermediate grammar's
continuative examples. Keep it as a neighboring profile, not a productive core.

## Semantic distinctions that must remain visible

| Dimension | Values to test |
|---|---|
| aspectual contribution | recurrent habit, established activity, characteristic association, continuation already underway, discourse circumstance |
| temporal interval | continues to speech time, continues to reference time, formerly established, contextually suspended, unresolved |
| predicate class | activity, occupation, residence, use relation, motion, speech, state-like relation |
| object/complement | overt NP, location, profession/role, omitted object, clausal material |
| clause environment | matrix clause, relative/modifying clause, subordinate circumstance, discourse-topic frame, question |
| polarity/question | positive, `有冇`, `冇`, `唔`, `未`, final particle, unresolved |
| aspect combination | bare `V開`, outer perfective, experiential, progressive, durative, completion/result, unresolved |
| lexical competition | lexical `開`, resultative/directional `開`, aspectual `開`, fixed expression |
| reference-time status | current established pattern, former habit, ongoing episode, generic characterization |
| regional/register variation | Hong Kong, Guangzhou, other Yue varieties, formal/pedagogical, colloquial |

## Direct source findings

The full source ledger is:

`PRQ2-005-HOI1-HABITUAL-ESTABLISHED-ACTIVITY-SOURCE-VERIFICATION-R1.tsv`

### Matthews and Yip comprehensive-grammar supplement

The university-hosted Chapter 11 supplement classifies `開` and `慣` under
habitual aspect and provides the exact example:

```text
佢睇開中醫嘅。
```

This is authoritative direct support for the postverbal habitual use. The page
is a concise reference supplement and does not provide the complete lexical,
negation, or aspect-stacking matrix.

### Yip and Matthews intermediate grammar

The grammar gives the exact habitual examples:

```text
我哋做開呢行。
佢用開嗰隻牌子。
我哋搵開嗰個裝修師傅太忙。
佢哋住開嗰度好方便。
```

It explicitly says the habitual sense commonly occurs in relative clauses. It
also separates a less common continuative use and supplies `行開呢邊` and
`講開佢哋兩個` examples.

This source therefore supports one family with at least two distinguishable
profiles. It does not justify collapsing them into one executable rule.

### Stokes and Fletcher 2003

The peer-reviewed study treats Cantonese aspect markers as grammatical forms
immediately following the lexical verb, lists `hoi1` as habitual, and says the
age-matched children in its study deployed habitual and other aspect markers
over a range of verb types.

This establishes grammatical-category status and acquisition/corpus use. The
study was not designed as a complete adult acceptability or lexical-selection
study of `開`, so “range of verb types” must not be converted into unrestricted
productivity.

### Wong, Cheung, Lo, and Wan 2022

The author-produced grammatical-analysis supplement classifies `開` and `慣` as
habitual markers and gives:

```text
我去開嗰間餐廳冇開呀。
```

The example directly demonstrates aspectual `開` and lexical `開` in the same
sentence. This is a high-value collision control.

### UD Cantonese and CUHK CANCORP annotation

The official UD Cantonese documentation treats aspect markers as auxiliaries
that must immediately follow verbs or certain verb compounds and explicitly
lists `開` as habitual. The CUHK CANCORP tag inventory independently lists `開`
under the `asp` category with the gloss habitual.

These annotation resources support category and position. They do not by
themselves establish speaker judgments for generated strings.

### Words.hk

The curated Cantonese lexical entry defines the suffix as postverbal and as
expressing a habit continuing over a period through the present. Exact examples
include:

```text
阿明做開運動，身體好健康。
我個仔飲開呢隻奶粉。
用開電腦打字嘅人，用打字機會打得好慢。
```

The lexical entry supports conventional use and the established-to-present
profile. It does not establish unrestricted combinations or every temporal
reading.

### Xu 2020 boundary from existing project research

The existing UC-RQ-032 research records that simple `未 + V開` is incompatible
in the tested example reported by Xu. Because only the conference abstract and
not the complete judgment paradigm was available, this is a narrow boundary,
not a universal ban.

It does show that habitual `開` cannot be inserted freely under every preverbal
negator.

## Runtime collision findings

The complete runtime ledger is:

`PRQ2-005-HOI1-HABITUAL-ESTABLISHED-ACTIVITY-COLLISION-AUDIT-R1.tsv`

### No dedicated habitual construction

Runtime v0.5.213 has dedicated paths for experiential `過` and progressive `緊`,
but no dedicated construction representing habitual `開`.

Examples such as:

```text
我哋做開呢行。
佢用開嗰隻牌子。
```

receive no top construction.

### False transitive analysis beginning at `開`

Several target strings are partially or fully covered only because `開` is
misread as an ordinary verb taking the following material as its object:

```text
食開呢隻藥
  -> TransitiveVP: 食開呢隻藥
     -> TransitiveVP: 開呢隻藥

你有冇食開啲乜嘢藥㗎
  -> ANotAQuestion
     -> TransitiveVP: 食開啲乜嘢藥
        -> TransitiveVP: 開啲乜嘢藥
```

Root coverage therefore masks loss of the habitual aspect.

### False action/stative segmentation

The exact grammar example:

```text
佢睇開中醫嘅。
```

is split into `睇開中` and internal `開中` as `ActionStativeVP`, leaving the
subject and final `醫` outside the construction. The runtime neither recognizes
habitual aspect nor the intended object `中醫`.

### Relative-clause and broad-clause masking

The exact Words.hk sentence:

```text
用開電腦打字嘅人，用打字機會打得好慢。
```

receives full root coverage through a generic `ClauseRelationGraph`, but the
first `用開` sequence has no habitual child analysis. Full-span coverage is not
semantic coverage.

### Lexical/aspect contrast is lost

For:

```text
我去開嗰間餐廳冇開呀。
```

runtime v0.5.213 recognizes literal motion `去` and a false transitive
`開嗰間餐廳`, while leaving the second lexical `冇開` unwrapped. It therefore
fails both local readings and the contrast between them.

### Higher negation/question wrappers do not solve the problem

`我冇食開呢隻藥` receives full coverage as `NegatedExistentialClause`, but its
child still contains the false ordinary-verb analysis `開呢隻藥`. This probe is
not source-backed evidence for the sentence's complete naturalness; it shows
that a broad negation wrapper can conceal the missing aspectual structure.

### Aspect stacking remains unresolved

The probe:

```text
我食開咗呢隻藥。
```

is partially parsed as nested `PerfectiveVP` over `食開咗` and `開咗`, treating
`開` as the host of perfective `咗`. The naturalness and interpretation of this
surface were not independently established here. It must remain a survey or
corpus question, not an implementation template.

## Collision boundaries

### `ExperientialVP`

`V過` asserts or presents prior experience. `V開` presents recurrence,
establishment, or characteristic practice over an interval. A participant may
have done something before without doing it habitually, and a current
established practice entails prior occasions without being reducible to an
experiential marker.

Disposition: preserve separate aspectual types and allow only evidence-backed
composition.

### `ProgressiveVP` and `DurativeVP`

`V緊` presents an event as ongoing at a reference point; `V住` presents a
continuous activity or state. Habitual `V開` normally concerns a broader pattern
of occasions or an established relation. The less common continuative `開`
profile creates a genuine boundary with progressive/durative aspect and must be
resolved by clause environment and discourse context.

Disposition: do not merge habitual and progressive. Quarantine continuative
`開` as a related subtype.

### `慣 gwaan3`

Major grammars group `開` and `慣` as habitual markers, but lexical and
pedagogical descriptions often associate `慣` more directly with being
accustomed or habituated. The checked sources do not establish complete
interchangeability, object placement, or attitudinal differences.

Disposition: separate research neighbor; no aliasing.

### Frequency adverbs

`成日`, `通常`, `一向`, and `不嬲` can express frequency or temporal continuity
without postverbal `開`. They may co-occur with `V開` in some speech, but the
checked authoritative sources do not establish redundancy or obligatory
co-occurrence.

Disposition: represent frequency adverbials independently; do not use them as a
substitute trigger for habitual aspect.

### Lexical, resultative, and directional `開`

Controls include:

```text
佢開門。
佢打開道門。
你行開啲。
間舖今日冇開。
```

These use lexical or result/direction meanings rather than habitual aspect. The
surface position after another verb is not sufficient: `打開` and `行開` may be
lexicalized, resultative, directional, aspectual, or ambiguous depending on the
host and context.

Disposition: require lexical-host and constituent diagnostics before any
habitual rule.

### Converbal/discourse `開`

`行開呢邊`, `講開佢哋兩個`, and incidental `去開買餸` introduce an already
underway circumstance, rationale, topic, or opportunity. They are not ordinary
habitual assertions.

Disposition: retain as separate subtypes or neighboring research units until
clause relation and discourse requirements are established.

## Native-speaker evidence still required

A future blinded instrument or controlled panel should test:

1. activity, accomplishment, achievement, state, occupation, residence, use,
   motion, and speech predicates;
2. current habit versus former habit versus temporarily suspended practice;
3. matrix versus relative versus subordinate versus discourse-topic uses;
4. overt objects, locations, professions, omitted complements, and headless
   modifiers;
5. `有冇`, `冇`, `唔`, `未`, and final-particle interactions;
6. `開` with `咗`, `過`, `緊`, `住`, `完`, `晒`, and result compounds;
7. `開` versus `慣`, frequency adverbs, and bare verbs;
8. lexical/resultative/directional controls with the same written graph;
9. Hong Kong, Guangzhou, and other Yue-variety judgments;
10. prosody and context for continuative, incidental, and discourse-topic uses.

When native-speaker evidence becomes necessary, create a separate blinded survey
brief first. All qualified respondents belong to one pooled panel under the
same inclusion criteria.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is postverbal `開` directly documented as a Cantonese aspect marker? | **Yes.** |
| Is its strongest supported core habitual or established activity? | **Yes.** |
| Must it immediately follow the verb or an appropriate verbal host? | **Yes, in the checked grammatical descriptions.** |
| Can it precede an overt object or complement? | **Yes.** |
| Is it common in relative/modifying clauses? | **Yes, according to the checked intermediate grammar.** |
| Can a higher `有冇` question contain `V開`? | **Yes, directly attested.** |
| Is it equivalent to experiential `過` or progressive `緊`? | **No.** |
| Is every postverbal `開` habitual? | **No.** |
| Are continuative and discourse-topic uses attested? | **Yes, but they remain separate subtypes.** |
| Is unrestricted negation or aspect stacking established? | **No.** |
| Does runtime v0.5.213 represent the habitual dependency? | **No.** |
| Can generic root coverage conceal a false analysis? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

PRQ2-005 may leave active research only after independent evidence resolves:

- predicate and complement licensing;
- current versus former and suspended habits;
- relative-clause and headless-modifier structure;
- question and negation paradigms;
- aspect and result stacking;
- lexical/resultative/directional ambiguity;
- continuative, incidental, and discourse-topic subtypes;
- regional and register variation;
- controlled native-speaker judgments and held-out collision testing.
