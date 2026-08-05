# ISSUE-641 等／完／先／好唔好 source inventory R1

Parent issue: #641  
Work claim: #642  
Date: 2026-08-05

## Scope

This inventory evaluates Week 18 rows I005 and I008 as layered turn-management requests. It separates independent evidence for permissive `等`, completion `完`, postverbal priority `先`, and final `好唔好`.

The exact source strings remain attestation only. The inventory does not allocate a construction identity or authorize runtime changes.

## Evidence ledger

| source_id | evidence_grade | verification | citation_and_locator | what_it_supports | limit | disposition |
|---|---|---|---|---|---|---|
| `SRC-LAI-2020-DANG2-FUNCTIONS` | `DIRECT_SCHOLARLY_CORE` | `publisher_abstract_and_fulltext_examples_inspected` | Yik-Po Lai. 2020. “Multiple functions of the Cantonese ‘wait’ verb dang2 and their historical development.” *Studies in Language* 44(4):917–963. DOI `10.1075/sl.19011.lai`; especially section 5.1 on permissive ‘let’ and section 6.1 on causative ‘cause’. <https://benjamins.com/catalog/sl.19011.lai> | Directly distinguishes permissive, causative, temporal, notice, connective, and other functions of `dang2`; analyzes permissive `[dang2-NP-VP]` in request/imperative contexts and gives examples such as `你等我埋單啦` ‘Let me pay the bill.’ | Does not analyze the complete Week 18 I005/I008 strings or define a deterministic parser disambiguation algorithm for every `等 + NP + VP`. | `RETAIN_PERMISSIVE_CORE_AND_POLYFUNCTION_BOUNDARIES` |
| `SRC-ZHOU-2018-POSTVERBAL-SIN1` | `DIRECT_SCHOLARLY_CORE` | `publisher_article_and_fulltext_inspected` | Yang Zhou. 2018. “Exploring the emergence of the postverbal sin1 先 in Cantonese.” *Language and Linguistics* 19(2):333–375. DOI `10.1075/lali.00012.zho`; introduction and synchronic distinctions, with postverbal examples including polite/request contexts. <https://benjamins.com/catalog/lali.00012.zho> | Directly establishes that postverbal `先` prominently expresses ‘first’/precedence and distinguishes temporal, imperative, and other functions. | Historical-functional analysis does not determine the exact syntactic attachment of `先` inside I008 or make all `先` tokens one construction. | `RETAIN_POSTVERBAL_PRIORITY_LAYER` |
| `SRC-SYBESMA-2013-SIN1` | `DIRECT_SCHOLARLY_CORE` | `fulltext_excerpt_inspected` | Rint Sybesma. 2013. “Cantonese sin 先 and the question of microvariation and macrovariation.” In *Breaking Down the Barriers*, pp.971–994; examples (1)–(2), including `唔該你斟杯茶俾我先` ‘Please pour me a cup of tea first.’ | Supports postverbal placement after the VP’s complement/object material and a polite first-priority request profile. | Does not contain I008 or decide attachment to permissive `等` versus the lower completion VP. | `CORROBORATE_POSTCOMPLEMENT_ORDER` |
| `SRC-MATTHEWS-YIP-2011-CH11-WEB` | `REFERENCE_GRAMMAR_CORE` | `official_book_website_example_inspected` | Stephen Matthews and Virginia Yip. 2011. *Cantonese: A Comprehensive Grammar*, Chapter 11 web companion, lines/example under verbal particles: `等我寫低個電話先` ‘Let me write down the telephone number.’ <https://www.cuhk.edu.hk/lin/cbrc/CantoneseGrammar/multimedia/11.htm> | Directly attests the close combined order `等 + first-person NP + VP + object + 先` with permissive translation. | The webpage’s local subsection heading does not by itself settle the syntactic category of every component; the example is used for order and interpretation only. | `RETAIN_CLOSE_COMBINED_PROFILE` |
| `SRC-MATTHEWS-YIP-2011-COMPREHENSIVE` | `REFERENCE_GRAMMAR_CORE` | `bibliographic_and_relevant_chapter_scope_verified` | Stephen Matthews and Virginia Yip. 2011. *Cantonese: A Comprehensive Grammar*, 2nd ed., Chapter 11/12 “Aspect and verbal particles,” especially the resultative-particle discussion around p.243 and question-tag discussion pp.366–367. DOI `10.4324/9780203835012`. | Recognized reference-grammar home for resultative/completive `完`, postverbal particles, and Cantonese tag questions. | The complete book text was not reproduced in this packet; substantive propositions are corroborated by the direct chapter/example sources below. | `REFERENCE_GRAMMAR_CONTEXT` |
| `SRC-LAI-PANG-2023-RESULTATIVES` | `DIRECT_SCHOLARLY_CORE` | `article_inspected` | Ryan Ka Yau Lai and Michelle Man-Long Pang. 2023. “Rethinking the Description and Typology of Cantonese Causative–Resultative Constructions.” *Languages* 8(2):151. DOI `10.3390/languages8020151`; discussion citing Matthews and Yip 2011 p.243 and listing `完 jyun4` ‘to the end’. <https://www.mdpi.com/2226-471X/8/2/151> | Direct scholarly corroboration that `完` belongs to the Cantonese resultative/completion particle inventory. | Does not establish every composition involving `完` or analyze I005/I008. | `RETAIN_COMPLETION_PARTICLE_CORE` |
| `SRC-YIP-2025-INNER-ASPECT` | `DIRECT_SCHOLARLY_CORE` | `fulltext_inspected` | Ka-Fai Yip. 2025. “Inner Aspect in Cantonese,” profile inventory identifying `jyun4 完 ‘finish’: Completive` as a postverbal inner-aspect element. <https://kafai-yip.github.io/assets/docs/Yip%20%282025%29%20Inner%20aspect%20in%20Cantonese.pdf> | Supports postverbal `V + 完` as a completive profile distinct from outer perfective aspect. | Recent analysis; does not settle all speaker-sensitive ordering or the full source sentence. | `CORROBORATE_WAN_COMPLETION_CORE` |
| `SRC-HUANG-HER-KONG-2025-CANTONESE-QUESTIONS` | `DIRECT_SCHOLARLY_CORE` | `fulltext_pdf_inspected` | Huang Yu-hsin, Her One-soon, and Stano Kong. 2025. “Revisiting the Taxonomy of Interrogatives in Cantonese.” *Tsing Hua Journal of Chinese Studies* 55(1):157–195. DOI `10.6503/THJCS.202503_55(1).0005`; p.160 n.2: `係唔係` and `好唔好` are tag questions typically added at the end of a declarative sentence and are categorized as A-not-A questions. <https://onesoonher.github.io/info/publication/A88-Cantonese-Qs.pdf> | Directly supports final `好唔好` as a tag appended to a proposition and its relation to the A-not-A family. | The paper explicitly does not analyze these tags in detail and does not establish request-force nuances for every context. | `RETAIN_FINAL_TAG_BOUNDARY` |
| `SRC-WONG-ETAL-2022-GACS` | `DIRECT_SCHOLARLY_CORE` | `chapter_content_inspected` | Anita Mei-Yin Wong, Carol Cheung, Jessica Lo, and Elaine Wan. 2022. “Grammatical Analysis of Cantonese Samples,” in *Understanding Development and Disorder in Cantonese using Language Sample Analysis*; sections on resultative particles and tag questions. | Independently includes `完` in the verbal/resultative-particle inventory and `好唔好` in the Cantonese tag-question inventory. | Descriptive coding framework; it does not define the complete syntax or discourse force of I008. | `CORROBORATE_COMPLETION_AND_TAG_CLASSES` |
| `SRC-HONGKONGVISION-HOU-M-HOU` | `ATTESTATION_ONLY` | `teaching_page_inspected` | Hong Kong Vision. 2017. “好唔好/係唔係/得唔得：相手に確認する,” examples of a proposition followed by `好唔好` to seek an addressee response or approval. <https://hongkongvision.com/archives/4980> | Contextual teaching attestations for final `好唔好` in proposal/request uses. | Learner material; no independent construction-level productivity or syntactic authority. | `RETAIN_AS_PRAGMATIC_ATTESTATION` |
| `SRC-GLOSSIKA-W18-I005-I008` | `ATTESTATION_ONLY` | `checked_in_source_inspected` | `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W18-20260719/source.json`, I005 `等陣，等我講完。` and I008 `唔該等我講完先好唔好？`. | Attests the exact strings, punctuation, Jyutping, glosses, English translations, register labels, and turn-management grouping. | Pedagogical source; does not independently establish syntax, productivity, naturalness, formulaicity, or population-wide register. | `RETAIN_AS_TRIGGER_AND_EXACT_ATTESTATION` |
| `PROJECT-W18-F04-ROUTE` | `RUNTIME_OBSERVATION_ONLY` | `checked_in_route_inspected` | Issue #481 and Week 18 review records, route W18-F04. | Documents the repository’s unresolved decomposition route. | Project routing has zero independent linguistic-evidence weight. | `RETAIN_AS_REPOSITORY_TRIGGER` |
| `PROJECT-WAN-COMPLETION-IDENTITY` | `RUNTIME_OBSERVATION_ONLY` | `current_registry_inspected` | `data/construction-identities.json`, current `WanMarkedCompletionVP`, profile `VerbWanCompletionPredicate`. | Shows an existing current identity already represents narrow `V + 完` completion. | Identity/runtime state does not prove the linguistic analysis or authorize changes. | `EXISTING_HOME_OBSERVATION` |
| `PROJECT-POSTVERBAL-SIN-IDENTITY` | `RUNTIME_OBSERVATION_ONLY` | `current_registry_inspected` | `data/construction-identities.json`, current `PostverbalSinPriorityClause`, profile `ActionVPPostverbalSinOptionalFinalParticle`. | Shows an existing current identity for an overt action VP followed by priority `先`. | Does not determine whether current output correctly preserves I008 or own other `先` functions. | `EXISTING_HOME_OBSERVATION` |
| `PROJECT-DANG2-TAG-IDENTITY-AUDIT` | `RUNTIME_OBSERVATION_ONLY` | `bounded_registry_search_completed` | `data/construction-identities.json`; no dedicated current identity found by bounded search for permissive `dang2` or final `好唔好` tag. | Identifies possible representation gaps for a later parser/identity audit. | Absence from the registry has zero linguistic-evidence weight and does not itself justify a new UUID. | `AUDIT_GAP_ONLY` |

## Supported propositions

The reviewed evidence supports these bounded propositions:

1. Cantonese `等 dang2` is polyfunctional and has a directly analyzed permissive ‘let’ use distinct from lexical wait, causative, temporal, notice, and connective profiles.
2. The permissive use has an overt `[等 + NP + VP]` structure in request/imperative contexts.
3. `完 jyun4` is a postverbal completion/resultative or completive element.
4. Postverbal `先 sin1` marks priority or precedence and follows VP complement/object material in the close examples.
5. A recognized reference-grammar example directly attests `等 + first-person NP + VP + object + 先`.
6. `好唔好` can function as a tag question appended to a complete proposition and is formally related to A-not-A questions.
7. I005 and I008 are compatible with transparent layered composition.

## Unresolved or unsupported conclusions

The evidence does not establish:

- that every `等 + NP + VP` sequence is permissive;
- a character-only rule for `等`;
- one construction spanning `唔該等我講完先好唔好`;
- exact narrow attachment of `先` inside I008;
- that `好唔好` tags and predicate-internal `好唔好 + predicate` share one implementation identity;
- formula frequency or regional/register distribution of the complete strings;
- unrestricted object omission or hidden arguments;
- a new UUID;
- parser correctness from current runtime behavior.

## Repository consequence

The strongest supported next action is a parser-output audit, not direct implementation. It should preserve existing completion and postverbal-`先` identities, test permissive `等` and final-tag representation, and keep all outer material visible.

No immutable source, runtime, parser, test, identity, status, corpus, survey, release, or deployment change is authorized by this inventory.
