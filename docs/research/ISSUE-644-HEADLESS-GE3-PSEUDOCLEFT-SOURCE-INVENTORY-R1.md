# ISSUE-644 headless 嘅 ge3 and pseudocleft-like source inventory R1

Parent issue: #644  
Work claim: #645  
Date: 2026-08-06

## Scope

This inventory evaluates Week 18 I002:

```text
你講嘅係邊個？
```

It distinguishes overt-head noun modification, headless or nominalized `ge3`, pseudocleft-like copular structure, possession, and sentence-final particles. The exact source remains attestation only.

## Evidence ledger

| source_id | evidence_grade | verification | citation_and_locator | what_it_supports | limit | disposition |
|---|---|---|---|---|---|---|
| `SRC-SIO-2011-GE3` | `DIRECT_SCHOLARLY_CORE` | `repository_verified_full_text_and_publisher_metadata` | Joanna Ut-Seong Sio. 2011. “The Cantonese ge3.” In *Nominalization in Asian Languages: Diachronic and Typological Perspectives*, pp.125–146. DOI `10.1075/tsl.96.04sio`; repository-verified p.129, examples 13b–c. | Describes the polyfunctionality of Cantonese `ge3` and directly supports overt adnominal modifier/linker structure while showing that the linker does not impose one semantic relation. | The retained exact locator in current repository evidence concerns overt-head modification, not the complete headless I002 or its copular wh structure. | `RETAIN_POLYFUNCTION_AND_OVERT_HEAD_BOUNDARY` |
| `SRC-YAP-MATTHEWS-2008-NOMINALIZERS` | `DIRECT_SCHOLARLY_CORE` | `publisher_metadata_and_fulltext_cantonese_section_inspected` | Foong Ha Yap and Stephen Matthews. 2008. “The development of nominalizers in East Asian and Tibeto-Burman languages.” In *Rethinking Grammaticalization: New Perspectives*, pp.309–341. DOI `10.1075/tsl.76.15yap`; Cantonese `ge3` discussion and grammaticalization pathway figure. | Directly links Cantonese `ge3` genitive/pronominal use with relative-marker and nominalizer development and explicitly discusses headless-relative nominalizer use. | Diachronic and typological analysis establishes the family and pathways, not the exact synchronic tree of I002. | `RETAIN_HEADLESS_NOMINALIZER_AND_PRONOMINAL_OPTIONS` |
| `SRC-CHAN-MATTHEWS-YIP-2011-RC` | `DIRECT_SCHOLARLY_CORE` | `chapter_fulltext_excerpt_inspected` | Angel Chan, Stephen Matthews, and Virginia Yip. 2011. “The acquisition of relative clauses in Cantonese and Mandarin.” In *The Acquisition of Relative Clauses*, pp.197–226. DOI `10.1075/tilar.8.10cha`; p.199, examples (1)–(2). | Directly contrasts classifier relatives with `ge3` relatives and gives `佢食嘅糖`; states that `ge3` links a modifying clause and overt head noun. | Acquisition chapter; the inspected passage does not analyze headless `ge3` or pseudoclefts. | `RETAIN_OVERT_HEAD_RELATIVE_AND_CLASSIFIER_CONTRAST` |
| `SRC-MATTHEWS-YIP-2017-NMC` | `DIRECT_SCHOLARLY_CORE` | `publisher_abstract_inspected` | Stephen Matthews and Virginia Yip. 2017. “Noun-modifying clauses in Cantonese.” In *Noun-Modifying Clause Constructions in Languages of Eurasia*, pp.105–120. DOI `10.1075/tsl.116.06mat`. | Establishes a general Cantonese noun-modifying-clause construction and distinguishes grammatical head relations from semantic/pragmatic modification relations. | Abstract-level substantive scope; no headless or I002-specific example was inspected here. | `RETAIN_GENERAL_NOUN_MODIFICATION_LIMIT` |
| `SRC-LAM-2025-CANTONESE-PSEUDOCLEFT` | `DIRECT_SCHOLARLY_CORE` | `peer_reviewed_conference_abstract_inspected` | Esther Lam. 2025. “A syntactic analysis of Cantonese pseudocleft-like construction.” Abstract from the 58th Annual Meeting of the Societas Linguistica Europaea, pp.294–295. | Gives `[Mary 今朝整嘅] 係 [呢個蛋糕]`; identifies the pre-copular constituent as a headless relative with no overt nominal head or wh-pronoun and argues that it is a predicate in an inverted predicational copular clause. | Two-page conference abstract and one analysis of a close declarative profile; it does not directly analyze the wh-question I002 or settle all competing nominalizer analyses. | `RETAIN_CLOSE_PSEUDOCLEFT_PROFILE_AND_PREDICATE_ANALYSIS_OPTION` |
| `SRC-OPEN-CANTONESE-GE3-COLLISIONS` | `ATTESTATION_ONLY` | `teaching_pages_inspected` | Open Cantonese, “The Sentence Particle 嘅 ge3 (Assertion)” and relationship-identification lessons. | Explicitly distinguishes sentence-final assertion `嘅` from possessive/adnominal `嘅` and illustrates post-copular possessive `我朋友嘅` versus assertion constructions. | Teaching material; supports collision awareness only, not construction identity or syntactic theory. | `RETAIN_SENTENCE_FINAL_AND_POSSESSIVE_COLLISION_ATTESTATION` |
| `SRC-GLOSSIKA-W18-I002` | `ATTESTATION_ONLY` | `checked_in_source_inspected` | `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W18-20260719/source.json`, I002: `你講嘅係邊個？`, Jyutping `Nei5 gong2 ge3 hai6 bin1 go3?`, English “Which one are you talking about?” | Attests the exact string, source segmentation, reading, translation, register, and punctuation. | Does not independently establish constituent category, hidden material, pseudocleft analysis, productivity, or population-wide interpretation. | `RETAIN_AS_TRIGGER_AND_EXACT_ATTESTATION` |
| `PROJECT-AA07-GE-MODIFIER` | `RUNTIME_OBSERVATION_ONLY` | `current_identity_and_note_inspected` | `data/construction-identities.json` AA07 `GeMarkedNominalModifierNP`; `grammar/unsupported_generalization/AssociativeNP.md`. | Shows that AA07’s implemented/evidence-reviewed span requires overt `modifier + 嘅 + noun` and is quarantined pending rename/decomposition. | Runtime and identity state carry zero independent linguistic-evidence weight and do not own headless I002. | `NO_IDENTITY_TRANSFER` |
| `PROJECT-MODIFIED-NP-AGGREGATE` | `RUNTIME_OBSERVATION_ONLY` | `current_registry_inspected` | `data/construction-identities.json`, broad `ModifiedNP` implementation aggregate. | Shows a broad nominal wrapper exists in runtime. | Aggregate behavior does not establish one construction or provide a theory-neutral headless owner. | `NOT_AN_EVIDENCE_BEARING_OWNER` |
| `PROJECT-W18-F02-ROUTE` | `RUNTIME_OBSERVATION_ONLY` | `checked_in_route_inspected` | Issue #481 and Week 18 review records, route W18-F02. | Documents the unresolved repository route. | Project routing has zero independent linguistic-evidence weight. | `RETAIN_AS_REPOSITORY_TRIGGER` |

## Supported propositions

Qualifying evidence supports:

1. Cantonese overt-head `ge3` relatives or noun-modifying clauses have the order `clause + 嘅 + noun`.
2. Cantonese also has classifier relatives without `ge3`, so relative-clause evidence cannot be generalized from the token alone.
3. `ge3` has nominalizer and pronominal/headless functions related diachronically and synchronically to genitive and relative-marker uses.
4. Cantonese has a close pseudocleft-like `[headless clause + ge3] + 係 + nominal` profile.
5. A direct analysis treats the pre-copular headless constituent in that close profile as a predicate rather than requiring a nominal head.
6. Sentence-final assertion `嘅` and possessive/adnominal `嘅` are separate collision profiles.

## Competing analyses preserved

For a surface `clause + 嘅` without an overt head, the evidence permits at least:

- headless relative-clause terminology;
- nominalizer analysis;
- pronominal or light-head ‘one(s)’ analysis;
- predicate analysis in pseudocleft-like copular clauses.

This packet does not select one analysis as universally correct.

## I002-specific limit

No inspected qualifying source directly analyzes:

```text
[你講嘅] + 係 + [邊個]
```

as a wh pseudocleft. Lam’s close source has a post-copular overt nominal in a declarative construction. Glossika supplies the exact wh-question attestation. The family and span are supported, but the exact internal parse remains unresolved.

## Unsupported conclusions

The evidence does not establish:

- a specific deleted noun in I002;
- one universal syntactic category for every headless `ge3` constituent;
- automatic transfer from overt-head AA07;
- one `嘅` construction spanning possession, noun modification, nominalization, pseudoclefts, and sentence-final mood;
- unrestricted productivity or discourse interpretation;
- a new UUID;
- current parser correctness.

## Repository consequence

The strongest next action is a parser-output audit of I002 and controlled contrasts. If a representation gap remains, a separate identity/composition issue should compare a theory-neutral `ClauseGe3WithoutOvertHead` profile with a full pseudocleft construction. It must not extend AA07 by token presence.

No immutable source, parser, runtime, test, identity, status, corpus, survey, release, or deployment change is authorized.
