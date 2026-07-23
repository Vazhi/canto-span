---
title: UC-RQ-003 — Double-object order alternation and predicate classes
research_id: UC-RQ-003
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-003 — Double-object order alternation and predicate classes

## Research decision

UC-RQ-003 should **not** become one general “double-object alternation” construction.

The checked evidence distinguishes at least four modern Cantonese profiles:

```text
A. V Theme Recipient             markerless Theme–Recipient
B. V Recipient Theme             Recipient–Theme
C. V Theme 畀 Recipient          overt-marker dative
D. lexical 畀 Theme Recipient    lexical-GIVE double object
```

These profiles are not freely interchangeable. Their distribution depends on the matrix predicate, event type, possessive relation, information structure, prosody, register, and speaker population.

The strongest currently supported decomposition is:

1. **Lexical `畀 bei2` double object**: canonical markerless Theme–Recipient for lexical GIVE in pragmatically neutral contexts.
2. **Overt-marker dative**: Theme–`畀`–Recipient/Goal with broad dative predicate classes, including caused-possession, transfer-of-possession, and caused-motion verbs; lexical GIVE itself is marked in this profile except under special information-structural or heavy-theme conditions.
3. **Communication/information Recipient–Theme**: a separate V–Recipient–Theme profile associated with predicates such as `教 gaau3` ‘teach’, `問 man6` ‘ask’, `請教 ceng2gaau3` ‘inquire’, `考 haau2` ‘test’, and `求 kaau4` ‘request’.
4. **Non-`畀` markerless Theme–Recipient**: independently attested but prosodically, lexically, and socially variable; this is the dedicated object of UC-RQ-002 and must not be generalized from written order alone.

The result is therefore a **construction-family and lexical-class map**, not a new parser label. No implementation or status change is authorized.

## Central contrast set

The following contrasts summarize the checked evidence:

```text
我畀咗一支筆佢。              lexical 畀 + Theme + Recipient
我畀咗嗰本好有用嘅書畀新同事。 lexical 畀 + heavy/focused Theme + 畀 + Recipient
我送咗一本書畀佢。            transfer verb + Theme + 畀 + Recipient
小明寄咗一封信畀我。          caused-motion verb + Theme + 畀 + Goal/Recipient
我教佢中文。                  communication verb + Recipient + Theme
我送一本書佢。                non-畀 markerless Theme + Recipient; prosodically variable
```

These examples cannot be represented as permutations of one unordered three-participant frame. The construction itself contributes meaning and combines selectively with predicate classes.

## Checked source findings

The full source ledger is:

`UC-RQ-003-DOUBLE-OBJECT-ORDER-ALTERNATION-SOURCE-VERIFICATION-R1.tsv`

### 1. Cantonese has three major dative surface patterns

Li and Lee (2021) explicitly distinguish:

```text
V Theme Recipient
V Recipient Theme
V Theme 畀 Recipient
```

They do not treat all three in one analysis. Their semantic study concentrates on Theme–Recipient and Theme–`畀`–Recipient, while noting that Recipient–Theme is used with communication and information predicates.

This is direct evidence against a parser that assigns Theme and Recipient solely by the first and second postverbal NP positions.

### 2. Lexical `畀` is exceptional

Li and Lee report the lexical-GIVE verb `畀 bei2` as the only ordinary dative verb available in the markerless Theme–Recipient double-object construction under neutral conditions:

```text
我畀咗一支筆佢。
ngo5 bei2 zo2 jat1 zi1 bat1 keoi5
“I gave her/him a pen.”
```

Other pure caused-possession verbs, transfer-of-possession verbs, and caused-motion verbs are assigned to the overt-marker dative in their judgments. Their examples contrast `送 sung3` and `寄 gei3` with lexical `畀`.

This claim is not completely categorical across the literature. Xu and Peyraube (1997) and Tong and Lee (2024) recognize restricted non-`畀` Theme–Recipient uses. The safe conclusion is therefore:

- lexical `畀` has a special canonical relation to markerless Theme–Recipient order;
- other verbs require predicate-specific and prosodic investigation;
- no unrestricted lexical whitelist or blacklist is yet justified.

### 3. The overt-marker construction spans several semantic classes

Li and Lee classify Cantonese dative predicates into:

- pure caused-possession verbs: `畀 bei2`, `頒 baan1`, `提供 tai4gung1`, etc.;
- transfer-of-possession verbs: `遞 dai6`, `交 gaau1`, `借 ze3`, `租 zou1`, `賣 maai6`, `送 sung3`, etc.;
- caused-motion verbs: `寄 gei3`, `傳 cyun4`, `派 paai3`, `郵 jau4`, `掟 deng3`, `拋 paau1`, `踢 tek3`, etc.

The overt-marker pattern is not semantically uniform. Depending on predicate class, it may express caused motion to a goal or several kinds of concrete possession. The paper distinguishes inalienable, alienable, control, and “focus” possession, and shows that individual verbs restrict which relation is available.

A surface `V Theme 畀 NP` matcher therefore cannot automatically assign one universal Recipient or Beneficiary role.

### 4. Caused-possession and caused-motion predicates have different goal diagnostics

Li and Lee use `去 heoi3` spatial goals to separate caused-motion predicates from possession predicates:

```text
我寄咗個包裹去倫敦。      caused motion to a spatial goal
*我畀咗個包裹去倫敦。     lexical GIVE does not take a purely spatial goal
```

Transfer and pure caused-possession verbs require a possessional participant rather than a purely spatial destination, while caused-motion predicates may take either a possessional Goal/Recipient or a spatial Goal.

This means that the postverbal participant type is partly determined by the predicate and marker, not simply by linear position.

### 5. Lexical `畀` may use the overt-marker profile under marked conditions

Li and Lee describe lexical `畀` + Theme + `畀` + Recipient as degraded in a neutral short-theme example, but available where the Theme is heavy or focused:

```text
我畀咗嗰本好有用嘅書畀嗰個新同事。
```

The source attributes this distribution to information structure and weight, while also discussing phonological-identity avoidance accounts. This profile must not be represented by a hard ban on two `畀` tokens.

The project’s existing Ngai 2023 source record further warns that no stable syllable threshold has been established. “Heavy or focused Theme” remains a research variable, not an executable cutoff.

### 6. Recipient–Theme order belongs to a separate communication class

Li and Lee state that V–Recipient–Theme is used with predicates of communicated messages and information, including:

```text
請教 ceng2gaau3  inquire
教   gaau3       teach
考   haau2       test
求   kaau4       request
問   man6        ask
```

Their study explicitly sets this order aside rather than treating it as the same alternation as lexical-GIVE and overt-marker datives.

This is the clearest apparently missing subconstruction discovered by UC-RQ-003. It requires its own source and corpus programme because the current `SpeechTransferClause` and `DitransitiveSpeechVP` labels do not establish a V–Recipient–Theme constituent or its lexical boundaries.

### 7. Theme–Recipient is predominant historically but not a free variant of Recipient–Theme

Xu and Peyraube (1997) describe markerless Theme–Recipient as predominant in Cantonese and Recipient–Theme as available only under specific lexical or emphatic conditions. They reject an analysis in which Theme–Recipient is freely derived from Recipient–Theme and argue that Theme–Recipient shares semantic and information-structural constraints with Theme–marker–Recipient.

Their theoretical marker-deletion analysis remains contested. The useful result for Canto Span is narrower: the two markerless orders do not form a free permutation system.

### 8. Contemporary non-`畀` Theme–Recipient requires prosodic evidence

Tong and Lee (2024) show that the non-`畀` inverted double-object construction is conditioned by object weight, relative prominence, pause, and listener age. Their task used audio stimuli and found generally variable acceptability.

This evidence prevents UC-RQ-003 from treating all non-`畀` Theme–Recipient examples as categorically absent. It also prevents a text parser from recognizing the profile as fully supported on word order alone. Detailed handling remains in UC-RQ-002.

### 9. Contact-induced Recipient–Theme use must be separated from inherited communication predicates

Chin (2022) investigates a “northern” Recipient–Theme pattern in modern Hong Kong Cantonese as possible influence from Putonghua and Modern Standard Chinese, using corpus, historical, production, perception, and sociolinguistic evidence.

Only the publisher overview and chapter structure were accessible in this pass, so no numerical result or specific conditioning factor from the book is imported here. The verified point is that modern Recipient–Theme use outside inherited communication-predicate profiles is itself an empirical contact/variation question.

## Construction-family map

| Family | Surface profile | Core predicate domain | Current evidence strength | Parser policy |
|---|---|---|---|---|
| Lexical GIVE DOC | `畀 Theme Recipient` | lexical `畀/俾` | strong exact-source support; order variation still speaker-sensitive | retain separately; do not generalize to all verbs |
| Marked dative | `V Theme 畀 Recipient/Goal` | broad dative classes except neutral lexical `畀`; caused possession, transfer, motion | strong source support, but role and marker category vary | preserve predicate and post-marker participant; avoid one universal role |
| Communication VRT | `V Recipient Theme` | teach/ask/test/request/information predicates | explicit source lead; dedicated boundaries and corpus evidence incomplete | create dedicated research subunit before implementation |
| Non-`畀` IDOC | `V Theme Recipient` | selected transfer predicates | attested but prosody/weight/age conditioned | UC-RQ-002; no text-only productive rule |
| Spatial caused motion | `V Theme 去 Place` or related goal frame | send/throw/motion predicates | source-supported contrastive boundary | do not mislabel Place as Recipient |

## Collision audit

The detailed runtime table is:

`UC-RQ-003-DOUBLE-OBJECT-ORDER-ALTERNATION-COLLISION-AUDIT-R1.tsv`

### `LexicalGiveRelation`

The current node recognizes lexical `畀/俾` followed by two nominal spans and intentionally leaves person-before-thing order unresolved. It emits for both:

```text
我畀咗一本書佢。
我畀咗佢一本書。
```

This is safer than forcing roles, but it cannot represent the broader order family because it requires lexical `畀` as matrix predicate. It should remain the lexical-GIVE branch, not be renamed as a general double-object construction.

### `PostThemeParticipantRelation`

This node requires an overt post-theme `畀/俾`. It covers some marked-dative surfaces such as:

```text
我交咗本書畀張三。
我借咗本書畀佢。
```

Its theory-neutral participant policy is appropriate while Recipient/Beneficiary/Goal/Source distinctions remain predicate-dependent. However, its current bounded predicate inventory is not a verified implementation of the full semantic-class hierarchy in Li and Lee.

### `SpeechTransferClause` and `DitransitiveSpeechVP`

The current runtime does not produce a dedicated triadic analysis for:

```text
我教佢中文。
我問佢一個問題。
```

`SpeechTransferClause` is an unsupported outer wrapper around speech/complement material, not an evidence-backed Recipient–Theme construction. `DitransitiveSpeechVP` is likewise unsupported. Neither should be promoted merely because UC-RQ-003 identifies communication predicates as a class.

A new dedicated research subunit should first determine:

- exact predicate inventory;
- whether the second object is a Theme, content NP, question NP, or clause;
- animacy and person restrictions on the first object;
- compatibility with aspect, negation, classifiers, clauses, and omitted content;
- boundaries against ordinary transitive teaching, testing, requesting, and asking.

### generic NP wrappers conceal missing argument structure

The sandbox v0.5.208 parser recognizes only isolated NPs or broad wrappers for several exact source profiles. For example:

- `我送咗一本書佢。` produces a spurious `QuantityNP` over `一本書佢`;
- `我送咗佢一本書。` recognizes only `一本書`;
- `我教佢中文。` receives no dedicated construction;
- `我問佢一個問題。` recognizes only the quantified NP;
- `我畀咗嗰本好有用嘅書畀新同事。` does not produce a complete marked-dative relation.

Full or partial surface coverage must not be treated as a correct triadic analysis.

## Decomposed research questions

### UC-RQ-003A — predicate inventory for communication Recipient–Theme

Which modern Cantonese predicates license `V Recipient Theme/Content`? Begin with the source list `請教`, `教`, `考`, `求`, and `問`, then test semantic neighbors such as `話`, `通知`, `提醒`, `答`, and `請` without assuming they belong to the same class.

### UC-RQ-003B — content category

Can the second complement be:

- a bare noun;
- quantified NP;
- wh expression;
- quoted speech;
- finite clause;
- interrogative content;
- omitted under discourse recovery?

The parser must not call all of these “Theme” without evidence.

### UC-RQ-003C — first-object role

Does the first postverbal NP consistently denote Addressee/Learner/Examinee/Requester, or do predicates impose different roles? Determine whether one constructional role exists or each predicate selects a distinct participant.

### UC-RQ-003D — lexical GIVE order

For lexical `畀`, compare Theme–Recipient and Recipient–Theme under matched Theme weight, recipient form, discourse focus, region, age, and register. Existing evidence establishes variation but not free alternation.

### UC-RQ-003E — double-`畀` marked profile

Under what conditions is `畀 Theme 畀 Recipient` accepted? Test phonological identity, Theme weight, contrastive focus, intervening aspect or modifiers, and alternative orthography, without assuming that spelling affects spoken grammar.

### UC-RQ-003F — overt-marker predicate hierarchy

Verify the semantic classes and individual predicates proposed by Li and Lee through current corpus evidence and native judgments. Distinguish caused possession, transfer, caused motion, creation/benefactive, communication, and Source-transfer predicates.

### UC-RQ-003G — Recipient versus spatial Goal

For caused-motion predicates, compare `畀 NP`, `去 Place`, and other directional markers. Determine which NPs can be reinterpreted as institutions or possessors and which are purely locative.

### UC-RQ-003H — Source readings

Which predicates permit a post-theme Source rather than Recipient, especially borrowing, taking, asking-for, and obtaining predicates? The role cannot be inferred from postverbal position or `畀` alone.

### UC-RQ-003I — contact-induced northern order

Measure Recipient–Theme use outside inherited communication predicates across age, education, Putonghua exposure, formal writing, translation, and region. Keep contact-induced patterns separate from core lexical profiles.

### UC-RQ-003J — construction identity

Determine whether the four profiles are related by derivation, constructional inheritance, lexical frames, or only functional similarity. Parser implementation should wait for observable diagnostics rather than encoding a preferred theoretical derivation.

## Recommended evidence programme

### Stage 1 — source and corpus census

Build a predicate-by-frame table with individually reviewed natural examples:

```text
predicate
predicate sense
semantic class
V-T-R
V-R-T
V-T-畀-R
V-T-去-Goal
recipient/source/goal role
spoken or written
region
prosody available
source locator
```

Do not treat raw searches for `畀` as frame counts.

### Stage 2 — written matched contrasts

Use semantically coherent lexical sets. Each set should hold predicate, participants, aspect, definiteness, and discourse context constant while comparing order and marker realization.

Written tasks can address lexical and semantic compatibility, but cannot settle UC-RQ-002 prosodic IDOC.

### Stage 3 — audio production and judgment

Use audio for all non-`畀` markerless Theme–Recipient contrasts. Record natural productions rather than inserting pauses only through editing. Preserve actual prosodic measurements and presentation order.

### Stage 4 — blinded native-speaker instrument

The blinded survey brief should describe neutral order and marker conditions without parser labels or preferred outcomes. Use separate interpretation questions for Recipient, Source, spatial Goal, Addressee, and Beneficiary readings.

### Stage 5 — post-collection runtime integration

Only after source, corpus, and panel evidence is adjudicated should the project decide whether to:

- narrow existing `LexicalGiveRelation`;
- split `PostThemeParticipantRelation` by independently recoverable predicate classes;
- create a communication Recipient–Theme construction;
- retain non-`畀` IDOC as prosody-dependent research metadata rather than text-parser grammar;
- retire unsupported speech-transfer wrappers.

## Current disposition

| Question | Disposition |
|---|---|
| Are the three orders one freely alternating construction? | **No.** Checked sources show lexical, semantic, information-structural, and prosodic restrictions. |
| Is lexical `畀` special? | **Yes.** It has the strongest canonical relation to markerless Theme–Recipient order. |
| Does overt `畀` always introduce the same semantic role? | **No.** Predicate class distinguishes possession, transfer, motion, and potentially other relations. |
| Is Recipient–Theme generally available? | **Not established.** It is directly associated with communication/information predicates, while broader northern-pattern use is variable and contact-sensitive. |
| Is a new generic parser label authorized? | **No.** |
| Is a new research subunit justified? | **Yes:** communication/information V–Recipient–Theme. |
| Should UC-RQ-003 remain in the master backlog? | Mark as **promoted to a family-mapping research unit**, with communication VRT remaining open. |

## Related project units

- `UC-RQ-002-INVERTED-DOUBLE-OBJECT-RESEARCH-R1.md`
- `grammar/research_pending/LexicalGiveRelation.md`
- `grammar/research_pending/PostThemeParticipantRelation.md`
- `grammar/unsupported_generalization/SpeechTransferClause.md`
- `grammar/unsupported_generalization/DitransitiveSpeechVP.md`
- `docs/research/CP021B-SOURCE-SCREEN-FREEZE.md`

## Sources

1. Li, Ziying, and Hanjung Lee. 2021. “Syntactic Distribution of the Semantic Classes of Dative Verbs in English and Cantonese: A Crosslinguistic Perspective.” *PACLIC 35*, 628–639. Full text: `https://aclanthology.org/2021.paclic-1.66.pdf`.
2. Xu, Liejiong, and Alain Peyraube. 1997. “On the Double Object Construction and the Oblique Construction in Cantonese.” *Studies in Language* 21(1): 105–127. DOI: `10.1075/sl.21.1.05lie`.
3. Tong, Angel Man-Shan, and Kwing Lok Albert Lee. 2024. “An acceptability study of triadic constructions in Hong Kong Cantonese.” *Lingua* 307: 103749. DOI: `10.1016/j.lingua.2024.103749`.
4. Chin, Andy Chi-on. 2022. *Cantonese GIVE and Double-Object Construction: Grammaticalization and Word Order Change*. John Benjamins. DOI: `10.1075/scld.15`.
