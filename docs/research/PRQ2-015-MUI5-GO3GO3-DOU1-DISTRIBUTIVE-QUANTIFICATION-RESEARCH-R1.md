# PRQ2-015 — `每／reduplicated classifier … 都 …` distributive quantification research R1

## 1. Research identity

- Research ID: `PRQ2-015`
- Topic: Cantonese distributive and exhaustive quantification with `每`, reduplicated classifiers, and `都`
- Primary forms:
  - `每 + classifier + noun + 都 + predicate`
  - `reduplicated classifier (+ noun) + 都 + predicate`
  - object-domain variants in which the quantified noun phrase precedes `都` and the predicate
  - recurring-time/event variants such as `每次／次次／個個月 + 都 + predicate`
- Runtime baseline inspected: `0.5.213`
- Research stage: source-linked structural analysis and runtime collision audit
- Parser-change authorization: none
- Construction-status authorization: none

## 2. Neutral research question

What nominal or event domains license Cantonese `都` in distributive or exhaustive quantification, and how should at least the following readings be separated?

1. universal or distributive quantification over individuals;
2. exhaustive totality over a contextually fixed plural or numeral-denoted group;
3. recurring-event or recurring-time distribution;
4. generic or habitual readings;
5. collective predicates whose subject is exhaustively included without requiring separate individual events;
6. adjacent but distinct additive, scalar-focus, concessive, free-choice, and totality constructions containing `都`.

The purpose of this research unit is to establish source-supported distinctions and document current runtime behavior. It does not determine the final node inventory or authorize implementation.

## 3. Executive conclusion

The evidence supports a Cantonese quantificational family in which a domain-denoting phrase precedes `都` and scopes over a following predicate. The best-supported nominal domain introducers are:

```text
每 + classifier + noun
reduplicated classifier + noun
reduplicated classifier with the noun omitted when recoverable
所有嘅 + noun
```

Representative source examples include:

```text
個個都讚佢。
個個女仔都鍾意佢。
每間屋都有冷氣。
所有嘅同事都要準時到。
你條條褲都係黑色。
佢本本書都睇過。
我哋間間舖頭都去過。
```

The quantified domain need not be the grammatical subject. Object-domain examples place the quantified object before the predicate and before the position at which an ordinary postverbal object would occur:

```text
警察每架車都檢查過。
校長所有嘅先生都見過。
佢本本書都睇過。
隻隻貓我都鍾意。
```

Recurring-time and recurring-event phrases also participate:

```text
每次叫佢幫手做家務，佢都話唔得閒。
我每次考試都好緊張。
佢次次都同我講大話。
佢個個月都準時交租。
```

However, the evidence does **not** justify a rule that mechanically requires `都` after every `每` phrase or every reduplicated classifier phrase. Modern lexical examples include `每個學生放完假返嚟要交一份閱讀報告`, with no overt `都`, and Lee's analysis treats reduplicated classifiers as capable of readings outside a `都` construction. Therefore omission of `都` is not a safe automatic ungrammaticality boundary.

The family must also be distinguished from exhaustive `都` with numeral or definite-plural domains:

```text
兩個學生都嚟咗。
啲學生都嚟咗。
三個學生都一齊搬張枱。
```

These can mean that all members of a fixed group are included. They do not automatically entail a separately distributed event for every individual, especially with a collective predicate such as `一齊搬張枱`.

The strongest current runtime problem is not merely absence of a distributive node. Broad wrappers can report root coverage while losing the domain–`都`–predicate dependency, and one topicalized object example receives a malformed full-span `PreferenceVP` analysis.

## 4. Source basis

### 4.1 Lee 2020: classifier reduplication and `都`

Lee's peer-reviewed analysis of Cantonese classifier reduplication is the strongest source for the semantic architecture of the `CL-CL (N) ... 都 ...` subtype.

The study reports that prenominal classifier reduplication has commonly been associated with distributive meanings comparable to “every” or “each,” but that reduplicated classifiers also permit non-distributive plural readings. Lee analyzes the reduplicated classifier as a quantifying determiner with both quantificational and modifying uses.

For the construction containing distributive `都`, Lee argues that the reduplicated classifier regulates the quantification domain through a maximizing effect. This supports an analysis in which the reduplicated classifier phrase contributes the relevant domain while `都` participates in quantification over that domain.

This source therefore supports all of the following safeguards:

1. do not identify classifier reduplication itself with one invariant universal meaning;
2. do not discard the contribution of `都`;
3. preserve a link between the quantified domain and the following predicate;
4. distinguish the `都` construction from reduplicated-classifier phrases without `都`;
5. avoid assuming that the noun must always be pronounced after a reduplicated classifier.

Access limitation: the full article text was not openly available in this pass. The source-supported claims above come from the publisher and institutional abstract. They are sufficient for the broad semantic distinction but not for a complete inventory of syntactic restrictions.

### 4.2 Yip and Matthews 2017: reference-grammar paradigms

The reference grammar presents three common nominal strategies corresponding broadly to English “all/every”:

```text
reduplicated classifier (+ noun)
每 + classifier/noun
所有嘅 + noun
```

It states that `都` is placed before the verb and gives examples including:

```text
個個都讚佢。
每間屋都有冷氣。
所有嘅同事都要準時到。
```

It also documents classifier-reduplication paradigms across several classifier classes:

```text
個個女仔都鍾意佢。
你條條褲都係黑色。
佢本本書都睇過。
我哋間間舖頭都去過。
```

The examples demonstrate that the domain can contain persons, artifacts, books, businesses, and other classifier-compatible nominal classes.

The grammar also states that when the object is quantified in this way, it appears before the verb:

```text
警察每架車都檢查過。
校長所有嘅先生都見過。
```

This is important because a parser that attaches the quantified NP as an ordinary postverbal object will lose the construction's surface dependency.

The source additionally gives predicate combinations in which the quantified object precedes an auxiliary or evaluative predicate:

```text
我先生套套衫都嫌貴。
佢隻隻牌子都話唔鍾意。
```

The reference grammar supports productive pedagogical paradigms, but it is not a substitute for corpus frequency or controlled judgments. Exact limits on omission, marked order, regional variation, and collective predicates remain open.

### 4.3 Words.hk: `每` and modern usage

Words.hk distinguishes individual-domain `每` from a separate rate or ratio use.

Direct examples relevant to the distributive family include:

```text
每次叫佢幫手做家務，佢都話唔得閒。
每年除夕我都去睇煙花倒數。
```

These examples show recurring occasion or interval phrases associated with a following `都` clause.

The same entry gives:

```text
每個學生放完假返嚟要交一份閱讀報告。
```

This example contains a `每` domain but no overt `都`. It prevents a hard parser constraint that treats absence of `都` as automatically malformed.

The entry also documents rate expressions such as:

```text
每小時110公里
每分鐘打到100字
```

These are not ordinary clause-level distributive `都` constructions. They require a separate rate/measurement interpretation.

### 4.4 Words.hk: context-linked `個個都`

A modern dictionary example gives:

```text
我啲同事個個都好好人，成日都幫我手。
```

Here the first noun phrase establishes a group and `個個都` distributes or exhaustively quantifies over its members. This profile differs structurally from a simple subject NP such as `個個學生`.

The same sentence also contains a later aspectual/frequency-like `都` in `成日都幫我手`. A parser must not assume that every `都` in a clause belongs to the same dependency.

### 4.5 Lower-confidence community-dictionary evidence

Community dictionary examples additionally attest forms such as:

```text
個個學生都擔心自己嘅成績。
佢次次都同我講大話。
我每次考試都好緊張。
```

One community note treats postverbal `通知個個` as unacceptable for the intended distributive “notify every student” reading. Because this is not a peer-reviewed or controlled source, it is retained as a boundary probe rather than a decisive grammar rule.

## 5. Formal profile inventory

### 5.1 Profile A: subject-domain universal or distributive

Canonical surface profile:

```text
[DOMAIN NP] + 都 + PREDICATE
```

Strong domain forms:

```text
每 + CL + N
CL-CL + N
CL-CL with recoverable N omitted
所有嘅 + N
context-linked 個個
```

Examples:

```text
個個都讚佢。
個個學生都擔心自己嘅成績。
每間屋都有冷氣。
所有嘅同事都要準時到。
我哋個個都支持你。
```

Minimum semantic commitment:

- the domain contains contextually relevant members;
- the following predicate is asserted across that domain;
- exact distributive force may depend on the lexical predicate and context;
- `都` is not merely an additive particle in this profile.

### 5.2 Profile B: object-domain universal or distributive

Canonical surface profiles:

```text
SUBJECT + [DOMAIN OBJECT] + 都 + PREDICATE
[DOMAIN OBJECT] + SUBJECT + 都 + PREDICATE
```

Examples:

```text
警察每架車都檢查過。
校長所有嘅先生都見過。
佢本本書都睇過。
隻隻貓我都鍾意。
條條題目佢都識答。
```

The source-supported generalization is that the quantified object precedes the predicate. The exact distinction between preverbal object, topic, focus, and other information-structural analyses remains open.

A future parser must preserve at least:

1. the quantified NP;
2. the subject when overt;
3. `都`;
4. the predicate;
5. the dependency between the domain and the predicate.

### 5.3 Profile C: recurring occasion, time, or event distribution

Canonical profile:

```text
[RECURRING TIME/EVENT DOMAIN] + 都 + PREDICATE
```

Examples:

```text
每次叫佢幫手做家務，佢都話唔得閒。
我每次考試都好緊張。
佢次次都同我講大話。
佢個個月都準時交租。
佢次次都爭住埋單。
```

The domain may be:

- a recurring occasion (`每次`, `次次`);
- a calendar interval (`每年`, `個個月`);
- an event description associated with the occasion (`每次考試`).

This is event or interval distribution, not necessarily quantification over human individuals.

### 5.4 Profile D: generic or habitual universal statements

Examples:

```text
每個人都會犯錯。
個個細路都鍾意玩。
```

These combine a quantified domain with predicates that are modal, dispositional, generic, or habitual. They should not be reduced to a single completed event for every individual.

The distinction between generic quantification and ordinary context-bounded exhaustive reference remains partly pragmatic. It should be represented as an interpretation dimension, not guessed solely from one surface string.

### 5.5 Profile E: exhaustive totality over a fixed group

Examples:

```text
兩個學生都嚟咗。
啲學生都嚟咗。
```

The domain is a finite numeral-denoted or contextually definite plural set. `都` signals that the predicate applies exhaustively to the relevant members.

This profile overlaps semantically with distribution but differs from `每` and classifier-reduplication domains:

- the group is independently established;
- universal force may arise from exhaustive inclusion of that group;
- collective predicates can be compatible.

### 5.6 Profile F: exhaustive subject with collective predicate

Example:

```text
三個學生都一齊搬張枱。
```

All three students participate, but `一齊搬張枱` describes a joint event. A rule that forces one separate table-moving event per student would be incorrect.

A robust representation therefore needs to separate:

1. exhaustive inclusion of domain members;
2. distributivity of the lexical predicate or event;
3. collective modification such as `一齊`.

### 5.7 Profile G: context-linked appositive distribution

Example:

```text
我啲同事個個都好好人。
```

The discourse first establishes a plural set (`我啲同事`) and then uses `個個都` to quantify over each member. This is not simply one contiguous quantified NP.

Potential representation requirements:

- antecedent group;
- member-distributive anaphoric phrase;
- `都`;
- predicate.

The exact syntax of the appositive or resumptive relation requires further source work.

## 6. Meanings that must remain distinct

### 6.1 Nominal distributivity

A domain of individuals or objects is introduced and the predicate applies across its members:

```text
個個學生都擔心自己嘅成績。
佢本本書都睇過。
```

### 6.2 Exhaustive totality

All members of a contextually fixed group are included:

```text
兩個學生都嚟咗。
啲學生都嚟咗。
```

This does not by itself specify whether the event is individual or collective.

### 6.3 Event or interval distributivity

A predicate recurs over occasions or intervals:

```text
我每次考試都好緊張。
佢個個月都準時交租。
```

### 6.4 Generic or habitual quantification

A generalization is made across people, occasions, or characteristic behavior:

```text
每個人都會犯錯。
個個細路都鍾意玩。
```

### 6.5 Per-rate `每`

Rate expressions are not ordinary domain–`都` dependencies:

```text
每小時110公里
每分鐘打到100字
```

### 6.6 Classifier reduplication without `都`

Lee's analysis and modern examples require retaining non-`都` readings. A parser must not manufacture an omitted `都` dependency merely because a classifier is reduplicated.

### 6.7 `每` without `都`

Modern attestation shows at least some modal or obligation predicates without overt `都`:

```text
每個學生放完假返嚟要交一份閱讀報告。
```

The exact conditions licensing omission remain unresolved.

## 7. `都` collision inventory

### 7.1 Additive `都`

```text
我都識。
```

Meaning: “I also know.”

There is no overt universal domain introduced by `每`, reduplicated classifier, numeral group, or context-linked plural set.

### 7.2 Scalar or even-focus `都`

```text
連佢都識。
```

`都` associates with a scalar-focus phrase headed by `連`. This is not nominal distributivity.

### 7.3 Wh-indeterminate universal or free choice

```text
邊個都識。
佢乜嘢秘密都知嘅。
```

The domain is introduced by a wh-indeterminate. Existing Canto Span research already treats this as a separate wh–`都` family.

### 7.4 Concessive `都`

```text
就算落雨都去。
```

`都` participates in a concessive dependency. It should not be absorbed into the nominal distributive family.

### 7.5 `晒` totality interaction

```text
個個都走晒。
```

Existing research treats `晒` as postverbal totality quantification over a definite domain. In this sentence:

- `個個都` establishes distributive or exhaustive quantification over individuals;
- `走晒` contributes postverbal totality/completion-like semantics;
- the two should not be collapsed into one marker.

### 7.6 Frequency-like or habitual `都`

In sentences such as:

```text
我每次考試都好緊張。
成日都幫我手。
```

`都` associates with a recurring-event or temporal domain. This must be linked to the temporal expression rather than typed as plain additive focus.

## 8. Negative scope

The contrast below is structurally important:

```text
個個學生都唔合格。
唔係個個學生都合格。
```

The first is compatible with universal scope over negation: each student is not qualified.

The second is ordinarily associated with negation taking scope over the universal claim: not every student is qualified.

This research pass does not establish a complete Cantonese scope theory or all available readings. It does establish that a parser must preserve the position and scope relation of clause-level negation instead of treating both strings as equivalent bags of tokens.

## 9. Noun omission and domain recovery

The reference grammar explicitly allows the noun to be omitted after classifier reduplication when recoverable:

```text
個個都讚佢。
```

This means a parser cannot require an overt noun after every reduplicated classifier.

Potential analyses include:

- classifier-based pronominal domain;
- ellipsis of a contextually recoverable noun;
- lexicalized quantificational pronoun for frequent forms such as `個個`.

The present sources do not select one implementation analysis. The surface and semantic requirement is to recover or represent a domain rather than misclassify `個個` as an ordinary numeral–classifier phrase.

## 10. Classifier-domain restrictions

The reference paradigms support several classifier classes:

```text
個個女仔
條條褲
本本書
間間舖頭
套套衫
隻隻牌子
```

This supports productivity across compatible classifiers, but not unrestricted reduplication of every classifier in every context.

Remaining questions include:

- lexicalized quantifiers versus productive reduplication;
- acceptability of rare classifiers;
- mass nouns and measure classifiers;
- regional preferences;
- plural noun phrases without classifiers;
- phonological and orthographic variation.

These require corpus and native-panel evidence before broad implementation.

## 11. Object order and information structure

The source-supported order places the quantified object before the predicate:

```text
警察每架車都檢查過。
佢本本書都睇過。
```

A second profile places the quantified object before the overt subject:

```text
隻隻貓我都鍾意。
條條題目佢都識答。
```

The present evidence does not decide whether these should be modeled as:

- preverbal object quantification;
- topicalization;
- focus movement;
- left-dislocation;
- a dedicated correlative dependency.

It does establish that an ordinary transitive rule expecting `V + object` is insufficient.

## 12. Runtime audit method

Runtime probes were executed against version `0.5.213` using the repository's current analysis entry point. The audit recorded:

- top-level status;
- root coverage;
- construction labels;
- spans and child analyses;
- malformed full-span wrappers;
- missing domain–`都`–predicate dependencies;
- collisions with neighboring `都` constructions.

The audit is diagnostic only. Runtime output is not evidence for the linguistic analysis.

## 13. Runtime findings

### 13.1 No dedicated distributive dependency

No tested example received a construction that explicitly linked:

```text
quantified domain ↔ 都 ↔ predicate
```

Most examples were either `NO_TOP_CONSTRUCTION` or received partial coverage from unrelated NP and VP nodes.

### 13.2 `每` is often lost outside a smaller NP

For:

```text
每間屋都有冷氣。
```

runtime coverage includes only `間屋` as a `ModifiedNP`. `每`, `都`, and the main predicate remain outside a coherent construction.

For:

```text
警察每架車都檢查過。
```

runtime coverage similarly recognizes `架車` but not the full quantified object or distributive dependency.

### 13.3 Reduplicated classifiers receive only local NP coverage

For:

```text
佢本本書都睇過。
```

runtime identifies:

- `本本書` as a `ModifiedNP`;
- `睇過` as an `ExperientialVP`.

It does not connect the quantified object, `都`, and experiential predicate.

### 13.4 Strongest false full-span parse

For:

```text
隻隻貓我都鍾意。
```

runtime reports root coverage through a broad `PreferenceVP` spanning the whole sentence. It also creates a malformed `ModifiedNP` spanning `隻隻貓我`, incorrectly absorbing the subject pronoun into the quantified NP.

The full-span result therefore masks structural failure rather than representing the distributive object construction.

### 13.5 Generic wrappers can mask missing quantification

For:

```text
個個細路都鍾意玩。
```

runtime returns a broad `PreferenceVP` covering the sentence. The internal domain–`都` dependency remains untyped.

This confirms that root `PASS` cannot be treated as evidence that the quantificational construction is represented.

### 13.6 Recurring-event clauses receive generic linking coverage

For:

```text
每次叫佢幫手做家務，佢都話唔得閒。
```

runtime reaches root coverage using `ClauseLinkingSequence`. It recognizes `每次` locally as `QuantifiedTimeNP`, but does not type the relation between the recurring occasion and the following `都` clause.

### 13.7 Event descriptions can be fragmented

For:

```text
我每次考試都好緊張。
```

runtime recognizes `每次` and `好緊張` separately. The event noun `考試` and `都` are not integrated with them.

### 13.8 `個個月` and similar recurring domains are missed

Examples such as:

```text
佢個個月都準時交租。
佢次次都爭住埋單。
```

receive no coherent top construction.

### 13.9 Negative scope remains unrepresented

The two strings:

```text
個個學生都唔合格。
唔係個個學生都合格。
```

both receive only partial local NP coverage. Runtime does not preserve the contrasting scope relation.

### 13.10 `都` plus `晒` is not integrated

For:

```text
個個都走晒。
```

runtime returns no top construction. The sentence requires both pre-predicate distributive/exhaustive structure and postverbal totality structure.

### 13.11 Numeral and definite-plural domains are fragmented

For:

```text
兩個學生都嚟咗。
```

runtime recognizes `兩個學生` as a quantified classifier NP but falsely analyzes `嚟` as directional motion. `都` and perfective `咗` are not integrated.

For:

```text
啲學生都嚟咗。
```

runtime identifies a `DiMarkedNP` and again assigns a directional analysis to `嚟`, with no exhaustive-totality dependency.

### 13.12 Collective predicates are not distinguished

For:

```text
三個學生都一齊搬張枱。
```

runtime identifies the numeral NP and a local transitive VP but does not represent exhaustive inclusion or the collective contribution of `一齊`.

### 13.13 Neighboring `都` constructions are also untyped

The audit found no dedicated top construction for:

```text
邊個都識。
連佢都識。
我都識。
佢乜嘢秘密都知嘅。
```

`就算落雨都去` receives broad contextual/clause-relation coverage but not a precise concessive dependency.

This reinforces the need for collision-safe subtyping rather than one unrestricted `都` rule.

## 14. Collision matrix

| Surface profile | Intended research family | Must not be collapsed into |
|---|---|---|
| `每間屋都有冷氣` | nominal universal/distributive | ordinary `ModifiedNP` plus additive `都` |
| `個個學生都…` | reduplicated-classifier domain | generic focus particle frame |
| `佢本本書都睇過` | quantified object | ordinary postverbal object |
| `隻隻貓我都鍾意` | topicalized/preverbal object domain | monolithic preference VP |
| `每次…都…` | recurring occasion dependency | independent time NP plus additive `都` |
| `個個月都…` | recurring interval distribution | lexical repetition only |
| `兩個學生都…` | exhaustive fixed-domain totality | `每` universal determiner |
| `三個學生都一齊…` | exhaustive participation with collective event | forced individual event distribution |
| `我都識` | additive | nominal distributive |
| `連佢都識` | scalar/even focus | nominal distributive |
| `邊個都識` | wh-indeterminate universal/free choice | `每/CL-CL` family |
| `就算落雨都去` | concessive | nominal distributive |
| `個個都走晒` | distributive/exhaustive plus postverbal totality | one undifferentiated “all” marker |
| `每小時110公里` | rate/measurement | clause-level distributive `都` |

## 15. Candidate parser obligations for a future authorized phase

This section records research requirements, not implementation instructions.

Any future implementation would need to demonstrate all of the following:

1. recognize domain phrases headed by `每` without discarding `每`;
2. recognize compatible reduplicated classifiers and optional noun omission;
3. link the domain phrase to `都` and the predicate;
4. support subject-domain and object-domain profiles;
5. preserve overt subject position in topicalized object examples;
6. support recurring-time and recurring-event domains;
7. distinguish distributive quantification from exhaustive totality;
8. allow collective predicates without forcing separate individual events;
9. preserve negation scope;
10. distinguish additive, scalar-focus, concessive, and wh-indeterminate `都`;
11. preserve interaction with `晒`, aspect markers, modals, and experiential `過`;
12. avoid treating every `每` phrase as requiring overt `都`;
13. avoid treating every reduplicated classifier as universally quantified;
14. avoid treating rate `每` as nominal distribution;
15. avoid accepting malformed spans merely because a broad wrapper covers the root.

## 16. Evidence still required before implementation

### 16.1 Controlled native judgments

A future blinded survey or panel should test at least:

- `每-NP` with versus without overt `都`;
- classifier reduplication with versus without `都`;
- subject and object domains;
- object placement before versus after the predicate;
- context-linked `我啲同事個個都…` profiles;
- `每次`, `次次`, and calendar-interval domains;
- numeral and definite-plural exhaustive domains;
- collective versus distributive predicates;
- negation scope;
- regional and lexical variation.

Before drafting such an instrument, the project owner should supply a fresh blinded survey-generation prompt and neutral study brief. Existing runtime mappings must remain outside the blind instrument-generation stage.

### 16.2 Corpus evidence

Required corpus work includes:

- spontaneous subject-domain examples;
- quantified-object examples with clear word order;
- recurring-event examples;
- `每` without overt `都`;
- reduplicated classifiers without `都`;
- collective-predicate examples;
- discourse contexts clarifying generic versus context-bounded readings.

This pass did not complete a corpus extraction, so no frequency or productivity claim is made from corpus counts.

### 16.3 Source coverage

Further primary research is needed on:

- the syntax and semantics of Cantonese `都` beyond classifier reduplication;
- topic/focus analyses of quantified objects;
- negation scope;
- collective predicates;
- historical or regional variation;
- optionality of `都`.

## 17. Recommended status

Recommended research status:

```text
source_linked_research_pending
```

Rationale:

- strong source support exists for core nominal and object-domain paradigms;
- a peer-reviewed semantic analysis supports the classifier-reduplication subtype;
- modern lexical attestation supports recurring-event uses and important omission boundaries;
- current runtime behavior is inadequate and sometimes falsely complete;
- exact optionality, information structure, collective readings, and regional boundaries remain unresolved;
- no held-out native panel or targeted corpus sample has yet been adjudicated.

This recommendation does not alter the construction registry or any runtime status.

## 18. Parser-change authorization

This research note authorizes **no parser change**.

It does not authorize:

- a new `都` node;
- modification of `FocusParticleFrame`;
- modification of quantified NP nodes;
- modification of `ClauseSpan` or `ClauseRelationGraph`;
- status promotion;
- broadening of classifier reduplication;
- survey generation;
- lexicon changes.

Any later change must pass the project's source, collision, corpus, native-panel, and held-out acceptance gates.

## 19. Source files in this package

- `PRQ2-015-MUI5-GO3GO3-DOU1-DISTRIBUTIVE-QUANTIFICATION-RESEARCH-R1.md`
- `PRQ2-015-MUI5-GO3GO3-DOU1-DISTRIBUTIVE-QUANTIFICATION-SOURCE-VERIFICATION-R1.tsv`
- `PRQ2-015-MUI5-GO3GO3-DOU1-DISTRIBUTIVE-QUANTIFICATION-COLLISION-AUDIT-R1.tsv`

## 20. Final research judgment

Cantonese `每／reduplicated classifier … 都 …` should be treated as a source-supported quantificational family with at least nominal, object-domain, recurring-event, generic, and exhaustive-totality subprofiles.

The evidence does not support:

- one lexical meaning for every reduplicated classifier;
- mandatory overt `都` after every `每` phrase;
- a single undifferentiated `都` construction;
- automatic individual-event distributivity with collective predicates;
- ordinary postverbal-object treatment of quantified objects;
- promotion based on current root coverage.

The appropriate next step is evidence expansion and controlled boundary testing, not parser implementation.
