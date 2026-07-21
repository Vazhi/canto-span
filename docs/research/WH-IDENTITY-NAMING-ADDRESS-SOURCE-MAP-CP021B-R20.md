# Identity, naming, wh-place/wh-classifier, and address-term source map (CP021B-R20)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixture, manifest, accepted version, or held-out file changed or opened**.

## Family selected

R20 re-ranked the 65 remaining unmapped language labels after adding two user-provided Cantonese coursebooks. Their page-level evidence materially raised one coherent cross-lane family:

- `LocativeWhQuestion`
- `WhClassifierQuestion`
- `IdentityWhQuestion`
- `NamingClause`
- `VocativeAddressTerm`

The family is linked by reference and identification: asking where or which referent, asking who someone is, assigning a personal or category name, and selecting an address form. Broad `ProductiveVO`, `TransitiveVP`, and generic clause labels were again rejected as research units.

## New source treatment

The two uploaded textbooks are registered as **pedagogical references**. Their exact dialogues, page-level examples, explicit contrasts, and negative teaching rules are legitimate evidence for attested forms and learner-facing boundaries. They are not used alone to establish unrestricted productivity, frequency, universal judgments, or parser nodes.

- Chow’s *Cantonese for Everyone* uses Jyutping and supplies transparent lesson schemata for names, titles, destinations, and whereabouts.
- 鄭定歐、張勵妍、高石英’s *粵語（香港話）教程* supplies extensive Hong Kong Cantonese dialogues and explicit Cantonese–Mandarin contrasts. Its own romanization is not imported into Canto Span; claims are grounded in the visible Cantonese forms and explanations.

## Runtime claims and evidence boundaries

### 1. `LocativeWhQuestion` currently combines three different relations

The runtime has a motion-perfective profile, a static `喺邊度` profile, and a legacy surface fallback. The sources independently attest motion/destination questions such as `佢去咗邊度呀`, contextual `去邊度` questions, and overt `喺...邊度` place questions. These share a wh-place constituent but not one predicate relation.

Bare `邊度呀` may be a contextually licensed utterance, but clause examples do not authorize insertion of a hidden subject, copula, motion verb, or locative marker.

### 2. `WhClassifierQuestion` is primarily nominal composition

Wong explicitly identifies `邊 + classifier` as a “which” form and gives `你想要邊部車呀`. The uploaded coursebook adds `邊位係黃先生呀` and `佢哋想要邊張枱呀`. These support `邊 + classifier + overt noun` as an NP schema.

The runtime instead exposes `WhClassifierQuestion` as `wh_determiner + classifier (+ particle)` and may use it as a child under an overt noun. Bare `邊 + classifier` requires a separate ellipsis/context analysis; the exact protected `邊間呀` rule does not establish a free cross-product.

### 3. General identity questions are sourced; exact `邊個嚟` is not

The coursebook directly attests `佢係邊個呀`, `嗰位小姐係邊個呀`, and `邊位係黃先生呀`. Wong independently attests person-wh distribution and a fuller explanatory frame `呢個咩嚟㗎`.

No inspected source directly established the runtime’s exact two-token `邊個嚟` profile. The anti-motion reclassification may be operationally useful, but it remains an exact-form source gap. Ordinary copular identity, fuller explanatory `嚟` constructions, and directional motion must stay distinct.

### 4. Personal naming, surname, identity, and definitional labeling must split

Chow explicitly teaches personal pronoun + `叫` + name. The Hong Kong coursebook gives `佢叫乜嘢名呀`, `我姓王`, and multiple definitional/category uses of `叫做`. The runtime, however, requires exact subject + `叫做` + name.

This supports a general naming/labeling domain but not free substitution among `叫`, `叫做`, `姓`, and `係`. Personal naming and definitional “be called” require separate lexical/complement profiles.

### 5. Cantonese address forms are socially and lexically constrained

Cheung’s article establishes a Cantonese address-term system with vocative/designative and social functions. The textbooks provide exact bounded patterns: surname/full name + title; `梁先生 → 梁生`; `王太太 → 王太`; and the direct negative boundary that `阿生` is allowed for an unfamiliar adult man while `阿太` is not.

The runtime’s generated `阿 + one CJK character + suffix`, `阿 + name`, and `name + suffix` families are therefore too broad to promote. Orthographic fit does not determine surname status, intimacy, kinship, age, gender, or social appropriateness.

## Dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `LocativeWhQuestion` | `SOURCE_LINKED_WH_PLACE_SUBTYPE_SPLIT_AND_LOCATIVE_MARKER_BOUNDARY_REQUIRED` | Split motion-goal, static-locative, and discourse-fragment profiles; preserve overt `喺`, motion, aspect, and wh-place material. |
| `WhClassifierQuestion` | `SOURCE_LINKED_WH_NP_SCHEMA_NODE_REALIGNMENT_AND_ELLIPSIS_SPLIT_REQUIRED` | Realign overt `邊+CL+N` with the NP layer; represent bare `邊+CL` only with independently licensed ellipsis/context. |
| `IdentityWhQuestion` | `GENERAL_IDENTITY_WH_SOURCE_LINKED_EXACT_BIN1GO3_LAI4_TEMPLATE_GAP_AND_COPULA_SPLIT_REQUIRED` | Source-link ordinary copular identity; retain exact `邊個嚟` as a gap and keep fuller explanatory `嚟` separate. |
| `NamingClause` | `PERSONAL_NAMING_RELATION_SOURCE_LINKED_GIU1_VERSUS_GIU3ZOU6_SPLIT_AND_EXACT_TEMPLATE_GAP` | Split personal `叫+name`, surname `姓`, identity `係`, and definitional `叫做`; exact runtime template remains a gap. |
| `VocativeAddressTerm` | `ADDRESS_SYSTEM_SOURCE_LINKED_LEXICAL_SOCIAL_SUBTYPES_AND_GENERATIVE_CROSSPRODUCT_NARROWING_REQUIRED` | Retain bounded lexical/social address subtypes and narrow the generated prefix–name–suffix cross-product. |

## Forbidden inferences

R20 does not authorize:

- treating every `邊度` string as the same construction;
- inserting an unspoken `喺`, `係`, motion verb, subject, destination, or noun;
- treating `邊+classifier+noun` as intrinsically a fragment;
- licensing arbitrary `邊+classifier` combinations;
- using `呢個咩嚟㗎` as direct proof of `邊個嚟`;
- treating `嚟` as a general copula;
- treating `叫`, `叫做`, `姓`, and `係` as interchangeable naming heads;
- classifying every `叫做` complement as a personal name;
- generating address forms from one-character shape alone;
- inferring gender, kinship, intimacy, age, status, or acceptability from a title suffix;
- using textbook presentation order as evidence of frequency;
- changing parser behavior during the research freeze.

## Open evidence gaps

- direct conversational/corpus attestation and discourse conditions for exact `邊個嚟`;
- prosodic/context diagnostics for bare `邊度呀` and bare `邊+classifier`;
- full-text recovery of Cheung 1990 for exact address-form inventories and constraints;
- regional variation between Hong Kong, Guangzhou, and other Cantonese address systems;
- personal-name uses of `叫做` and their contrast with `叫`;
- classifier-specific ellipsis licensing beyond the inspected examples;
- a theory-neutral representation shared by identity, definition, naming, and address without merging them.

## Freeze result

This batch changes research provenance only. No parser node, role, gloss, heuristic, fixture, test expectation, manifest field, accepted behavior, or held-out item was changed or opened.
