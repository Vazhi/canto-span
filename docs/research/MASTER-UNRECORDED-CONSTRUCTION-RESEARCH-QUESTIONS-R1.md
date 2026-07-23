---
title: Canto Span — Master research questions for potentially unrecorded constructions
type: discovery-backlog
status: research_only
baseline_version: 0.5.208
created: 2026-07-22
scope: possible Cantonese grammar constructions not yet represented by a dedicated current construction note
---

# Master research questions for potentially unrecorded constructions

## Purpose

This note records **possible** Cantonese grammar constructions that do not appear to have a dedicated current construction note in the v0.5.208 inventory, or that are represented only by a much broader or narrower label. It is a discovery backlog, not an implementation plan and not evidence that any candidate is productive.

The baseline contains 165 current construction notes. Candidate absence was checked against:

- current note filenames under `grammar/`;
- `GRAMMAR-INDEX.md`;
- active research-note titles and keyword occurrences under `docs/research/`.

A missing dedicated label does **not** prove that the runtime never recognizes the pattern. Some candidates may already be absorbed by generic nodes such as `CoverbFrame`, `DiscourseParticleFrame`, `FocusParticleFrame`, `TopicComment`, `ModalVP`, or `ResultComplementVP`. Every candidate therefore requires a code-and-output collision audit before a new label is proposed.

## Interpretation of backlog states

- **apparently absent** — no dedicated current construction note or clearly matching named research unit was found.
- **partial overlap** — an existing label covers a neighboring or broader phenomenon, but the cited construction appears to require a distinct contrast or subtype.
- **exploratory** — plausible and source-motivated, but the exact Cantonese construction and boundaries still require direct source verification.

## Priority 0 — explicit source leads and high parser value

| ID | Candidate construction | Neutral research question | Existing collision to test | Backlog state | Main source lead |
|---|---|---|---|---|---|
| UC-RQ-001 | General `將 zoeng1` disposal clause | Which semantic and syntactic conditions license `NP zoeng1 Object VP`, beyond change-into/result frames, and what distinguishes it from object topicalization and ordinary SVO? | `DisposalChangeIntoResultFrame`, `TopicComment`, `CoverbFrame` | **promoted to dedicated research unit** — see `UC-RQ-001-GENERAL-ZOENG1-DISPOSAL-RESEARCH-R1.md` | Matthews & Yip; Mai, Kwan & Yip 2018; Yao 2018 |
| UC-RQ-002 | Inverted double-object construction | Under what prosodic, weight, animacy, and discourse conditions can Cantonese use Verb–Theme–Recipient order? | `LexicalGiveRelation`, `PostThemeParticipantRelation`, `PossessiveTransferClause` | **merged into `LexicalGiveRelation`** — CP021B already preserves theme-before-recipient as the reviewed lexical-GIVE baseline and person-before-thing as role-unresolved; no categorical weight or prosody trigger is licensed | Tong & Lee 2024; CP021B verified source synthesis |
| UC-RQ-003 | Double-object order alternation | Which verbs license Recipient–Theme, Theme–Recipient, or `bei2`-marked recipient frames, and are these one construction family or several lexical classes? | `LexicalGiveRelation`, `PostThemeParticipantRelation`, `SpeechTransferClause` | **merged into `LexicalGiveRelation` and `PostThemeParticipantRelation`** — CP021B supports predicate- and role-conditioned classes, not one free alternation; the speech wrapper is excluded | Chin 2022; CP021B verified source synthesis |
| UC-RQ-004 | Equative comparison clause | What are the productive modern patterns for “X is as A as Y,” including `tung4 Y gam3 A`, `jat1joeng6 gam3 A`, and regional alternatives? | retired comparative label; `DegreeStativePredicate`, `ScalarEvaluation` | **promoted to dedicated research unit** — see `UC-RQ-004-CANTONESE-EQUATIVE-CONSTRUCTION-RESEARCH-R1.md` | Lai 2019, 2021, 2023 |
| UC-RQ-005 | `gwo3` comparative clause | What is the constituent structure and selectional range of `X A gwo3 Y`, and how is comparative `gwo3` distinguished from experiential, directional, dative, and iterative `gwo3`? | `ExperientialVP`, directional nodes, retired comparative label | **promoted to dedicated research unit** — see `UC-RQ-005-GWO3-SURPASS-COMPARATIVE-RESEARCH-R1.md` | Lam 2014; Yiu 2024 |
| UC-RQ-006 | Dislocation focus / right-dislocation construction | When a sentence particle appears medially, what syntactic relation connects the pre-particle clause and post-particle material, and which focus readings are licensed? | `TopicComment`, `DiscourseParticleFrame`, `FocusParticleFrame` | apparently absent | Cheung 2009 |
| UC-RQ-007 | Verb-copy focus construction | What licenses `V1-dou1-(m4/mei6)-V2` and related verb-copy patterns, which aspect markers remain only on V2, and which predicates reject the construction? | `ReduplicatedVP`, `FocusParticleFrame`, `DegreeMannerModifiedVP` | apparently absent | Lee 2019; Matthews & Yip 1998 as cited there |
| UC-RQ-008 | Wh-indeterminate construction | How do wh forms such as `bin1go3`, `mat1je5`, and `bin1dou6` alternate among interrogative, indefinite, negative-polarity, and free-choice readings? | current wh-question labels only cover specific question roles | apparently absent | Hsu & Xu 2020; Wu 1989 |
| UC-RQ-009 | Associative plural `X keoi5dei6` | What nouns and complex NPs can serve as the focal referent in `X 佢哋`, and how does this differ from ordinary plural marking and coordination? | `AssociativeNP`, `CoordinatedNP` | partial overlap | Lui 2026 |
| UC-RQ-010 | Appositive/coreferential N–CL–N | How is coreferential `你個衰仔` distinguished from possessive `你個學生` using syntax, lexical semantics, prosody, and discourse context? | `PossessiveClassifierNP`, `AssociativeNP`, `VocativeAddressTerm` | apparently absent | Tse & Chin 2015 |
| UC-RQ-011 | Sentence-final `gaa3` construction family | Are declarative, exclamative/warning, and interrogative `gaa3` separate constructions, and what co-occurrence restrictions hold with other final particles? | `DiscourseParticleFrame`, `PolarQuestionFrame`, `FocusParticleFrame` | partial overlap | Yu & Hu 2025 |
| UC-RQ-012 | Sentence-final focus particles `zaa3` and `tim1` | What are the scope, ordering, question compatibility, and quantifier interactions of restrictive `zaa3` and additive `tim1`? | `FocusParticleFrame`, restrictive/minimizing particle history | partial overlap | Law 2004 |
| UC-RQ-013 | Sentence-final particle cluster ordering | Which particle classes can combine, in what order, and which semantic conflicts make a cluster impossible? | `DiscourseParticleFrame`, `FocusParticleFrame`, `FormulaDiscourseUnit` | partial overlap | Sybesma & Li 2007 |
| UC-RQ-014 | Separable verb-object compounds | Which VO compounds permit aspect, measure, object modification, or inversion inside the lexical sequence, and how should lexical and phrasal analyses coexist? | `ProductiveVO`, `VerbComplementVP`, ordinary VP labels | apparently absent | Chan & Cheung 2020 |
| UC-RQ-015 | Non-VO separable compounds | Which subject-predicate, coordinate, subordinative, resultative, or unclassified compounds permit internal insertion, and are licenses lexically listed or structurally predictable? | `ProductiveVO`, result-complement nodes | apparently absent | Chan & Cheung 2020 |

## Priority 1 — clear construction candidates requiring dedicated source/boundary work

| ID | Candidate construction | Neutral research question | Existing collision to test | Backlog state | Source lead |
|---|---|---|---|---|---|
| UC-RQ-016 | `hai6 … ge3` cleft/focus clause | Which constituents can be focused in `係 X 嘅`, when may `hai6` or `ge3` be omitted, and how is this separated from copular identification and sentence-final assertion? | `CopularIdentificationFrame`, `DefinitionExplanatoryFrame`, particle frames | apparently absent | Matthews & Yip; Cantonese textbook sources; direct research source still needed |
| UC-RQ-017 | `lin4 … dou1` even-focus construction | Is overt `lin4` optional, preferred, or construction-dependent; what polarity and scalar conditions license the focused constituent? | `FocusParticleFrame`, `PriorityMarkerClause` | apparently absent | Lee 2019; Law 2004 |
| UC-RQ-018 | Alternative/disjunctive question | What distinguishes `A ding6 B`, `hai6 A ding6 B`, and particle-marked alternatives from A-not-A and ordinary polar questions? | `ANotAQuestion`, `PolarQuestionFrame` | apparently absent | Wu 1989; Yu & Hu 2025 |
| UC-RQ-019 | Clause-final tag question | Which tags (`係唔係呀`, `係咪呀`, invariant particles) attach to declaratives, and how do they differ syntactically from clause-internal copular A-not-A questions? | `CopularANotAQuestion` explicitly excludes tags | apparently absent | Wu 1989; CP051 source leads |
| UC-RQ-020 | Free-choice wh + `dou1` | Which wh expressions receive universal/free-choice readings with `dou1`, and what modal, conditional, or negative environments are required? | `WhClassifierQuestion`, `ExistentialWhQuestion`, `FocusParticleFrame` | apparently absent | Hsu & Xu 2020; direct syntax source still needed |
| UC-RQ-021 | Negative-polarity minimizer `jat1 CL N dou1 m4/mou5` | What structural unit licenses “not even one N,” and how does it interact with classifiers, negation type, and scope? | quantity NPs, `FocusParticleFrame`, negation nodes | apparently absent | Law 2004; direct Cantonese boundary study needed |
| UC-RQ-022 | Personal plural `-dei6` | Is `dei6` restricted to pronouns and selected human nouns, and what are the boundaries between ordinary plurality, associative plurality, and lexicalized `jan4dei6`? | no dedicated plural-NP construction | apparently absent | Tam 2021 grammar profile; Lui 2026 |
| UC-RQ-023 | `ge3` nominalization | Which clauses and VPs can be nominalized by `ge3`, what argument positions remain implicit, and how is nominalization separated from relatives, possession, and sentence-final `ge3`? | `RelativeClauseNP`, `ModifiedNP`, `StativeNominalComplement` | partial overlap | Matthews & Yip; textbook sources; direct source audit needed |
| UC-RQ-024 | Reflexive `zi6gei2` binding | Which local and long-distance antecedents are available, what blocks a reading, and how do person, perspective, and logophoricity affect interpretation? | no reflexive construction note | apparently absent | direct Cantonese binding source required |
| UC-RQ-025 | Null-argument / topic-drop clause | Under what discourse conditions may subjects, objects, or complements be unexpressed, and how should omitted arguments be distinguished from fragments and ellipsis? | `ComplementEllipsisFragment`, `FragmentAnswer`, `TopicComment` | partial overlap | Cantonese discourse/zero-anaphora source required |
| UC-RQ-026 | `di1` comparative/attenuative degree | When does post-adjectival `啲 di1` mean comparative “more A,” attenuated “a bit A,” or requested adjustment, and what standards of comparison are implicit? | `DegreeModifiedLexicalStative`, `ScalarEvaluation`, polite-adjustment history | partial overlap | written-Cantonese descriptions; direct grammar source needed |
| UC-RQ-027 | Superlative `zeoi3` phrase/clause | What NP and predicate structures license `最 zeoi3`, and how are explicit comparison sets represented? | `DegreeStativePredicate`, `ScalarEvaluation` | apparently absent | Cantonese grammar-profile/textbook source; direct research source needed |
| UC-RQ-028 | Differential comparative | Where do measure phrases occur in comparative clauses (`高過佢兩吋` and variants), and what predicates and units are licensed? | `MeasureExpression`, `QuantityNP`, absent comparative construction | apparently absent | Yiu 2024; targeted corpus/source study needed |
| UC-RQ-029 | Resultant-state `V-zyu6` | Which uses of `住 zyu6` encode maintained result state, ongoing activity, posture, or imperative persistence, and how do they differ from `gan2` progressive? | `ProgressiveVP`, `DurativeVP`, `LocativePostureVP` | partial overlap | aspect source map/textbooks; dedicated source audit needed |
| UC-RQ-030 | Exhaustive/completive `V-saai3` | Does `晒 saai3` quantify affected participants, event completion, or both; what negation and object structures are possible? | `CompletionVP`, `ResultComplementVP`, `QuantityNP` | apparently absent | Chan & Cheung 2020 mentions `saai3` insertion; targeted aspect source needed |
| UC-RQ-031 | Additive/completive `V-maai4` | Which readings of `埋 maai4` are additive, completive, directional, or lexicalized, and what argument structure changes accompany them? | `CompoundDirectionalMotionVP`, `CompletionVP`, `RestorativeComplementVP` | apparently absent | source-map/textbook lead; direct source needed |
| UC-RQ-032 | `mei6` not-yet negation | What is the scope and aspectual selection of preverbal `未 mei6`, and how do `mei6`, `m4`, and `mou5` divide event, state, and perfective negation? | `NegativeExperiential`, `NegatedVP`, completion questions | apparently absent | Yu & Hu 2025 examples; targeted negation source needed |
| UC-RQ-033 | Potential `dak1` versus descriptive/degree `dak1` | Which structural diagnostics distinguish potential `V-dak1-C` from manner/degree `V-dak1-Adj/Adv`, and can the same surface sequence be ambiguous? | `PotentialResultVP`, `PotentialDirectionalVP`, `DegreeMannerAdverbial` | partial overlap | result/potential source map; dedicated contrast study needed |
| UC-RQ-034 | General causative/complement-taking `giu3/ling6/sai2` | Which verbs license NP + VP complements, how are cause, command, permission, and request distinguished, and which embedded arguments may be omitted? | `CausativeResultFrame`, `PassivePermissiveRelation`, speech/intention frames | partial overlap | direct Cantonese complement source needed |

## Priority 2 — clause-linking and discourse candidates

| ID | Candidate construction | Neutral research question | Existing collision to test | Backlog state | Source lead |
|---|---|---|---|---|---|
| UC-RQ-035 | Correlative `jat1 … zau6 …` | Which aspectual and event-order constraints distinguish immediate succession (“as soon as”) from ordinary conditional or narrative sequencing? | `ConditionalClause`, `TemporalClause`, `CompletionThenClause` | apparently absent | textbook/grammar source; corpus confirmation needed |
| UC-RQ-036 | Concessive `seoi1jin4 … daan6hai6 …` | Which parts of the pair are obligatory or omissible, and how is concessive coordination represented when only one marker is overt? | `ConditionResult`, `ConditionalClause`, clause-relation heuristics | apparently absent | grammar profile/textbooks; direct source needed |
| UC-RQ-037 | Scalar concessive `zau6syun3 … dou1 …` | What modal and quantificational relation links the subordinate clause to `dou1` in “even if” constructions? | `ConditionalClause`, `FocusParticleFrame` | apparently absent | targeted source needed |
| UC-RQ-038 | Exception/unless `ceoi4fei1 …` | What main-clause polarity and modal restrictions accompany `除非 ceoi4fei1`, and when is an overt consequence clause required? | `ConditionalClause` | apparently absent | targeted source needed |
| UC-RQ-039 | Simultaneous `jat1bin1 … jat1bin1 …` | Does the paired marker coordinate VPs, clauses, or event descriptions, and what subject-sharing constraints apply? | `SerialVerbPurposeChain`, clause-relation heuristics | apparently absent | grammar profile/textbooks; corpus confirmation needed |
| UC-RQ-040 | Multifunctional `aa3`, `wo3`, and `bo3` particle contrasts | Which semantic/pragmatic contrasts are constructional rather than merely lexical, and should realization, reminder, hearsay, contrast, softening, and epistemic uses be represented separately? | `DiscourseParticleFrame`, `FormulaDiscourseUnit` | partial overlap | Cheung 2023; Leung 2010 |


## Dedicated research units

| ID | Research unit | Current result |
|---|---|---|
| UC-RQ-001 | `UC-RQ-001-GENERAL-ZOENG1-DISPOSAL-RESEARCH-R1.md` | Modern `將` pretransitives are independently attested, with the strongest checked core in handling/displacement. General predicate, NP, register, prosody, and regional boundaries remain open; no parser change is authorized. |
| UC-RQ-004 | `UC-RQ-004-CANTONESE-EQUATIVE-CONSTRUCTION-RESEARCH-R1.md` | Modern Hong Kong Cantonese equatives are independently attested as a multi-profile family. The strongest checked core is `comparee + 同 + standard + 一樣咁 + parameter`; resemblance, `有/冇`, and bare-degree-marker profiles require separate subtype boundaries. No parser change is authorized. |
| UC-RQ-005 | `UC-RQ-005-GWO3-SURPASS-COMPARATIVE-RESEARCH-R1.md` | Cantonese `comparee + scalar predicate + 過 + standard` is directly attested as a surpass comparative. Comparative, experiential, path/directional, dative, and iterative `過` must remain distinct readings; no parser change is authorized. |

## Resolved dispositions

| ID | Disposition | Research-backed mapping and boundary |
|---|---|---|
| UC-RQ-002 | **merged into existing construction** | `LexicalGiveRelation` already covers lexical `畀/俾` GIVE with two overt postverbal nominal spans. Its reviewed baseline is theme-before-recipient; its alternative person-before-thing branch preserves both participants without assigning theme, recipient, goal, or beneficiary roles. `CP021B-SOURCE-DERIVED-SYNTHESIS.md` finds that order varies with predicate class, role, weight, discourse, and speaker/contact variation, but supports neither free alternation nor a categorical weight threshold. `PostThemeParticipantRelation` instead requires an upstream non-GIVE predicate plus overt post-theme `畀/俾`; `PossessiveTransferClause` is an unsupported combined possession–modal–transfer wrapper. No new label or parser change is authorized. |
| UC-RQ-003 | **merged into existing constructions** | CP021B's verified synthesis rejects one unified double-object alternation. Lexical `畀/俾` GIVE with two overt postverbal nominals maps to `LexicalGiveRelation`; predicate–theme–`畀/俾`–participant surfaces map to the role- and category-neutral `PostThemeParticipantRelation`, with predicate valency controlling the candidate interpretation. Recipient-before-theme, theme-before-recipient, post-theme-marker, Goal/Source, and heavy-theme patterns therefore remain bounded profiles rather than freely interchangeable outputs. `SpeechTransferClause` is an unsupported transparent outer wrapper for a narrow speech-effect route and does not establish another double-object family. No new label or parser change is authorized. |

## Research protocol for every candidate

Before creating a grammar note or parser label, complete all of the following:

1. **Exact collision audit** — inspect runtime constructors, outputs, current notes, and retired labels for an existing analysis that already covers the pattern.
2. **Claim definition** — state the narrowest surface form, structural claim, interpretation, and excluded look-alikes.
3. **Independent sources** — verify at least one exact source before `research_pending`; pedagogical sources may seed questions but do not establish unrestricted productivity.
4. **Natural attestations** — collect and individually classify corpus examples rather than reporting raw hit counts.
5. **Minimal contrasts** — construct semantically coherent positive, competing-analysis, and boundary cases.
6. **Regional and register scope** — distinguish Hong Kong, Guangzhou, other Yue varieties, written Cantonese, age grading, and prosodic dependence where relevant.
7. **Panel task selection** — use naturalness, interpretation, context, or prosodic/audio judgment according to the actual unresolved question.
8. **No implementation inference** — discovery, source attestation, and survey construction do not by themselves justify parser changes or status promotion.

## Suggested first research batches

### Batch A — highest structural payoff

- UC-RQ-001 general `zoeng1` disposal;
- UC-RQ-002/003 double-object alternations;
- UC-RQ-004/005 equative and `gwo3` comparison;
- UC-RQ-014/015 separable compounds.

These affect argument structure, constituent boundaries, and many ordinary learner sentences.

### Batch B — question and quantification coverage

- UC-RQ-008 wh indeterminates;
- UC-RQ-018 alternative questions;
- UC-RQ-019 tags;
- UC-RQ-020 free-choice wh;
- UC-RQ-021 negative-polarity minimizers.

### Batch C — discourse and particles

- UC-RQ-006/007 focus constructions;
- UC-RQ-011/012/013 particle functions and ordering;
- UC-RQ-040 particle contrasts.

These probably require context-rich or audio evidence and should not be reduced to token adjacency rules.

## Source leads

These references motivate candidate discovery only. Each exact claim must still be checked against the full source.

1. Tam, Wing Yu Hugo. 2021. “Development of the Cantonese Grammar Profile: Reconsidering pedagogical sequence of grammar items in Cantonese as a second language.” *Chinese as a Second Language* 56(3): 209–228. DOI: `10.1075/csl.21009.tam`.
2. Matthews, Stephen et al. 2014. “The grammar of displacement in Cantonese heritage speakers.” HKU Scholars Hub handle `10722/199852`.
3. Kataoka, Shin. 2023. “Disposal construction and related issues in Peking Mandarin and Cantonese in the nineteenth century.” In *Early Chinese Dialect Grammar*, 335–359.
4. Chin, Chi On Andy. 2022. *Cantonese GIVE and Double-Object Construction: Grammaticalization and Word Order Change*. John Benjamins. DOI: `10.1075/scld.15`.
5. Tong, Angel Man-Shan & Kwing Lok Albert Lee. 2024. “An acceptability study of triadic constructions in Hong Kong Cantonese.” *Lingua* 307: 103749. DOI: `10.1016/j.lingua.2024.103749`.
6. Lai, Yik Po. 2021. “A diachronic typological study of equative constructions in Cantonese.” *Current Research in Chinese Linguistics* 100(1): 55–67.
7. Lai, Yik Po. 2023. “A large-scale comparative dialectal study of Chinese equative constructions.” *Bulletin of Chinese Linguistics* 16(1): 77–107. DOI: `10.30184/BCL.202306_16(1).0006`.
8. Yiu, Yuk Man Carine. 2024. “The multifunctionality of `gwo3` in Cantonese: grammaticalization and typology.” DOI: `10.1007/978-981-97-4314-8_8`.
9. Lam, Charles Tsz-Kwan. 2014. “A Unified Analysis to Surpass Comparative and Experiential Aspect.”
10. Cheung, Lawrence Yam-Leung. 2009. “Dislocation focus construction in Chinese.” *Journal of East Asian Linguistics* 18: 197–232. DOI: `10.1007/s10831-009-9046-z`.
11. Lee, Tsoi Lam Sharon. 2019. *Focus prosody in Cantonese: the case of verb-copying constructions*. HKU thesis, handle `10722/279874`.
12. Law, Yan Kei Ann. 2004. *Sentence-final focus particles in Cantonese*. UCL doctoral thesis, eprint `10101610`.
13. Sybesma, Rint & Boya Li. 2007. “The dissection and structural mapping of Cantonese sentence final particles.” *Lingua* 117(10): 1739–1783. DOI: `10.1016/j.lingua.2006.10.003`.
14. Yu, Zhiyin & Xiaoshi Hu. 2025. “The Syntax of the Sentence-final Particle `gaa3` in Cantonese.” *Current Research in Chinese Linguistics* 104(2): 653–678. DOI: `10.29499/CrCL.202507_104(2).0022`.
15. Cheung, Wang Nok. 2023. *Investigating the semantic/pragmatic function(s) of the Cantonese sentence final particle `aa3`*. HKU thesis, handle `10722/335514`.
16. Leung, Wai Mun. 2010. “The comparison of the Cantonese sentence final particles `bo3` and `wo3`.” *Asian Culture and History* 2(2): 86–98. DOI: `10.5539/ach.v2n2p86`.
17. Hsu, Yu-Yin & Anqi Xu. 2020. “Wh-indeterminates and Prosody in Hong Kong Cantonese.” *Speech Prosody 2020*. DOI: `10.21437/SpeechProsody.2020-77`.
18. Wu, Kam-yin. 1989. *A linguistic study of interrogation in Cantonese: comparisons with English*. HKU thesis. DOI: `10.5353/th_b3120952`.
19. Lui, Pun Ho. 2026. “The associative plural in Cantonese.” *Language and Linguistics* 27(2). DOI: `10.1075/lali.00256.lui`.
20. Tse, Ming San & Andy Chin. 2015. “The coreferential use of the Cantonese N–CL–N construction.” Paper presented at the 15th International Conference on Cantonese and Yue Dialects.
21. Chan, Sheila S. L. & Lawrence Y. L. Cheung. 2020. “Morpho-Syntax of Non-VO Separable Compound Verbs in Cantonese.” *Studies in Chinese Linguistics* 41(2): 185–206. DOI: `10.2478/scl-2020-0007`.

## Completion condition for this note

This note remains open. A candidate leaves this master list only when one of the following is recorded:

- **promoted to a dedicated research unit** with exact sources and collision audit;
- **merged into an existing construction** with the mapping and rationale documented;
- **rejected** because it is lexical, purely pragmatic, already represented, non-Cantonese, or unsupported;
- **deferred** because prosody/audio, regional sampling, or unavailable sources prevent a defensible investigation.
