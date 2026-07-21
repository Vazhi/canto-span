# WECHAT-GX-TRAVEL-002 priority grammar research R1

Date: 2026-07-20  
Branch: research-only side branch while v0.5.181 awaits rendered review  
Runtime changed: **no**  
Grammar status changed: **no**  
Evaluator custody opened: **no**

## Purpose

This batch converts five high-value observations from the native family conversation `WECHAT-GX-TRAVEL-002` into bounded, source-linked research dispositions. The corpus establishes only that the recorded surfaces occurred in one native conversation. It does not establish productivity, frequency, universal naturalness, or the correctness of a parser node.

No claim below contributes positive promotion weight to v0.5.181. No parser implementation is authorized by this document.

## Summary dispositions

| Cluster | Corpus surface | Disposition | Parser consequence now |
|---|---|---|---|
| Object-topic negation | `酒冇飲` / `水冇飲一啖` / `酒就唔飲啫` | `COMPOSITIONALLY_LINKED_DEDICATED_CONSTRUCTION_NOT_JUSTIFIED` | Preserve overt topic and negative predicate; no new construction node |
| Hindsight/regret | `早知你坐佢架車咪仲好` | `FRAME_LINKED_EXACT_CONSEQUENT_GAP` | Do not reduce `早知` to an ordinary adverb or `咪` to ordinary negation; exact dependency remains pending |
| Negative attainment | `我冇去到` | `EXACT_NATIVE_SURFACE_PLUS_RESULT_BOUNDARY_LINKED_ANALYSIS_NARROWING_REQUIRED` | Keep distinct from simple `冇去` and potential `去唔到`; no promotion |
| Negative opportunity | `我冇得去` | `NATIVE_ATTESTED_EXTERNAL_DESCRIPTION_GAP` | Do not merge with postverbal potential `得`; preserve as unresolved availability/opportunity profile |
| Activity duration | `開咗五個鐘頭車左右` | `DURATION_PROFILE_LINKED_EXACT_LEXICAL_ANALYSIS_UNRESOLVED` | Keep outside accepted simple `V咗O`; duration and `車` relation remain separate research questions |
| Objectless completion | `食完，聽日就正式旅遊啦` | `COMPLETION_LINKED_OMISSION_CONTEXT_REQUIRED` | Preserve overt `食完`; do not insert an object and do not treat it as `V完咗O` evidence |

## 1. Object-topic negation

### Corpus observations

- `酒冇飲。`
- `水冇飲一啖啊。`
- `酒就唔飲啫。`

### External evidence

`SRC-YIP-MATTHEWS-2000-BASIC`, Unit 22, independently describes Cantonese topic-first order and gives object-topic examples such as “apples, I like to eat” and contrastive object topics. It also notes that a subject may be absent when recoverable from context.

`SRC-LAM-2018-NEGATION-ASPECT`, pp. 215–218, independently distinguishes ordinary `唔` from `冇` used with perfective/event predicates and gives overt `冇 + predicate` examples.

### Synthesis

The sources support the components:

1. an overt object or domain may be established as topic;
2. `冇` may negate an event/perfective predicate;
3. `唔` remains a distinct ordinary negator.

They do **not** independently motivate a dedicated `ObjectTopicNegation` construction. The safest target is compositional topic–comment structure with an overt topic and a negative predicate. The omitted subject must remain discourse-recoverable rather than inserted.

`一啖` is a minimal-quantity complement whose exact interaction with the negative topic structure still needs quantity/focus research. Adding the lexical item cannot validate the whole clause analysis.

### Required boundaries

- Do not reinterpret `酒` or `水` as the grammatical subject solely because they are clause-initial.
- Do not insert an unspoken first-person subject.
- Do not merge `冇` and `唔` into one undifferentiated negator.
- Do not infer a dedicated topicalization construction from three related surfaces in one conversation.

## 2. Hindsight/regret with `早知`

### Corpus observation

`早知你坐佢架車咪仲好。`

### External evidence

`SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE`, printed p. 231, explicitly presents a communicative unit for regret (`懊悔`) and includes `早知係咁就……` and `早知問下人就唔會蕩失路啦`.

### Synthesis

The pedagogical source directly supports `早知` introducing a hindsight/regret frame with a consequent headed by `就` or `就唔會`. It does not establish the exact native-corpus consequent `咪仲好`, its obligatory relationship to `早知`, or the lexical/particle status of `咪` there.

The exact corpus surface is therefore natural attestation for one speaker/context, while the broader `早知 … consequence` regret frame is independently source-linked. A productive `早知…咪…` construction remains unproved.

### Required boundaries

- Do not tokenize `早知` as unrelated `早` plus an ordinary cognition predicate if doing so loses the regret frame.
- Do not treat this `咪` as ordinary `唔`, prohibitive `咪`, or a generic inferential marker without direct evidence.
- Do not insert a hidden protasis or an unspoken earlier decision.
- Keep `早知…就…` evidence separate from the exact `早知…咪仲好` surface.

## 3. `冇去到` versus `冇得去`

### Controlled contrast

| Surface | Working interpretation | Evidence state |
|---|---|---|
| `我冇去` | the going event did not occur | ordinary negative-event profile independently linked |
| `我冇去到` | the intended going was not attained / did not come about | exact native occurrence; result/attainment `到` independently linked; exact external source lead not yet fully registered |
| `我去唔到` | potential inability to go/reach | postverbal potential/result family independently linked |
| `我冇得去` | no available opportunity, permission, or practical option to go | exact native occurrence; dedicated external description not recovered |

### External evidence and source limits

`SRC-LAM-2018-NEGATION-ASPECT` supports `冇` as event/perfective negation.

`SRC-CHENG-SYBESMA-2004-POSTVERBAL-DAK` supports postverbal `得` and `唔` in ability/result-potential structures. That evidence is a **contrast**, not support for preverbal `冇得 + VP`.

A search of the official handbook for the 28th International Conference on Yue Dialects surfaced the exact form `…落大雨冇去到`, translated there as Mandarin `沒去成`. The PDF contribution title, author, page, and complete argument could not be reliably recovered in this environment. It remains a discovery lead and contributes zero registered support until those details are verified.

No dedicated academic description of exact `冇得 + VP` was recovered in this batch. Informal and dictionary/corpus-search examples show that `冇得 + VP` occurs, but they do not settle its syntax or all semantic subtypes.

### Required boundaries

- Do not analyze preverbal `冇得去` as the postverbal potential construction described for `V得R` or `V唔R`.
- Do not collapse `冇去到` into simple `冇去`; overt `到` must remain represented.
- Do not equate `冇去到` with `去唔到`; nonoccurrence/nonattainment and potential inability need separate evidence.
- The gloss “no opportunity/permission/practical option” is contextual and provisional, not a universal lexical definition of `冇得`.

## 4. Activity duration with `咗`

### Corpus observation

`大概開咗五個鐘頭車左右啦。`

### External evidence

`SRC-YIP-MATTHEWS-2000-BASIC`, Unit 11, explicitly describes duration expressions between a verb and its object, with examples of the form `V-咗 + duration + object`. This establishes a duration profile that differs structurally from simple adjacent `V-咗-O`.

`SRC-TANG-2024-CANTONESE-GRAMMAR-GUIDE`, pp. 34–39, attests postposed approximation with `左右`, including duration expressions such as `三日左右`.

### Synthesis

The combination of those sources and the native occurrence supports treating `五個鐘頭左右` as a duration/approximation constituent. It does not settle whether final `車` in `開…車` is an ordinary object, an activity-domain noun, a cognate-like element, or part of a conventional driving expression.

This surface must remain outside accepted `PostverbalZoPerfectiveVP`, whose narrow scope requires adjacent `V + 咗 + overt nominal object`. A duration constituent intervenes here.

### Required boundaries

- Do not count `開咗五個鐘頭車左右` as positive evidence for simple `V咗O`.
- Do not attach `左右` directly to `車`; its supported scope is the duration.
- Do not infer a generic rule from the single lexical host `開車`.
- Do not treat the duration as an endpoint/result complement.

## 5. Objectless completion with `食完`

### Corpus observation

`食完，聽日就正式旅遊啦。`

### External evidence

`SRC-YIP-MATTHEWS-2000-BASIC`, Unit 17, independently describes `完` as a resultative/completion element, including transparent `V完` examples such as finishing reading.

`SRC-YIP-MATTHEWS-2000-SYNTACTIC-TRANSFER` and the project’s complement-omission map independently support discourse-recoverable object omission in adult Cantonese, while warning against unrestricted omission and hidden-object insertion.

### Synthesis

The external sources support completion semantics for overt `V完` and context-dependent omission as separate propositions. The private native corpus directly attests one objectless `食完` in a sequencing context. Together they justify a research target in which the overt completion predicate is preserved and its object/activity domain remains unresolved in discourse.

The surface contains no post-completion `咗` and provides **zero evidence** for `V完咗O`.

### Required boundaries

- Do not insert `飯`, `嘢`, or any other hidden object.
- Do not mark the omitted domain as semantically saturated without context linkage.
- Do not use the occurrence to promote unrestricted objectless `V完`.
- Do not count it as attestation of `V完咗O`.

## Source weighting

| Evidence | Permitted use | Forbidden use |
|---|---|---|
| `WECHAT-GX-TRAVEL-002` | exact natural-surface attestation in one family conversation; research-question generation; boundary testing | productivity, frequency, universality, parser-analysis validation |
| Yip & Matthews 2000 | exact pedagogical examples and descriptive contrasts | exhaustive distribution or parser ontology |
| Lam 2018 | independently described negation/aspect split | every discourse or complement subtype |
| 鄭–張–高 2021 | exact contextualized teaching forms and communicative function | corpus frequency or unrestricted productive `早知…咪…` |
| Tang 2024 | exact contemporary approximation forms | peer-reviewed syntactic proof or unrestricted productivity |
| Cheng & Sybesma 2004 | postverbal potential/result contrast | preverbal `冇得 + VP` licensing |
| inaccessible Yue 28 handbook snippet | discovery lead only | registered support or promotion weight |

## Research conclusions

1. Object-topic negation is currently best treated compositionally; a dedicated construction is not justified.
2. The general `早知` regret frame is source-linked, but exact `早知…咪仲好` remains a native-only subtype pending direct analysis.
3. `冇去到` and `冇得去` must be kept distinct; exact `冇得 + VP` remains an external-description gap.
4. `開咗五個鐘頭車左右` belongs to an activity-duration research profile and is excluded from simple `V咗O`.
5. `食完` is a completion predicate with unresolved contextual omission and is not `V完咗O` evidence.

## Authorized next actions after v0.5.181 acceptance

- verify ordinary lexicon/Jyutping for `一啖`, `早知`, `左右`, and stable activity expressions without accepting surrounding grammar;
- build multi-speaker minimal-contrast review for the four-way negative-motion set;
- seek a full pattern-specific source for `冇得 + VP` and the exact role of `咪` in hindsight consequents;
- add research-bearing negative boundaries before any parser implementation proposal;
- create new prospective held-out custody only if a later, separately authorized implementation candidate emerges.
