# Directive, suggestion, priority, and action-timing source map (CP021B-R27)

Date: 2026-07-19  
Scope: claim-level research mapping only; **no parser behavior, fixture, manifest, accepted version, or held-out file changed or opened**.

## Family selected

After verifying R26, the 41 remaining unmapped language labels were ranked by runtime and non-held-out accepted-fixture reach. `ActionStativeVP` has three accepted appearances but is a mixed implementation wrapper whose cases belong to quantity/object and scalar-question analyses. Broad `ProductiveVO` and `TransitiveVP` remain unsuitable research units. R27 instead maps a coherent speech-act and event-ordering family:

- `ProhibitiveImperative`
- `SuggestionQuestion`
- `PriorityMarkerClause`
- `PoliteImperativeClause`
- `TimeToActionFrame`

## Source-derived boundaries

### 1. Prohibitives require marker and lexical splits

Chin distinguishes specialized `咪` and `唔好` prohibitive markers from ordinary `唔`. The uploaded coursebook directly gives `咪行咁快`, `咪住先`, and `咪唔記得呀`. The runtime, however, exposes only `唔好` as its general marker. It must also distinguish true prohibitions from lexical formulae such as `唔好意思` and ambiguous property/directive strings such as `唔好食`.

### 2. `不如` introduces a suggestion, not necessarily a syntactic question

The coursebook gives `不如放咗工，我哋一齊去瞄下吖` and explicitly describes `不如…吖` as expressing a suggestion. Additional examples place a reason before the proposal. The overt subject and predicate remain ordinary clause material. English renderings like “how about…” do not establish Cantonese interrogative structure, and the generic runtime particle slot is not sourced.

### 3. Postverbal `先` has a sourced priority core but multiple other uses

Zhou identifies postverbal `先` as prominent for “first” while emphasizing multiple grammatical and pragmatic meanings. Sybesma independently separates several `先` forms by meaning, pronunciation, and distribution. The coursebook attests `你打電話先啦`, but also `第二時先啦` and preparatory `V定…先`. These cannot be collapsed into one action-first wrapper.

### 4. Polite requests are marker-specific and compositionally ordinary

The coursebooks attest `請你等一等`, `請你哋睇一下`, `麻煩你哋填一下`, `唔該講大聲啲`, and `唔該講慢啲`. These support request strategies with `請`, `麻煩`, and conventional `唔該`, not the runtime’s exact required path shape `請 + addressee + optional time + 沿住 + path + predicate`.

### 5. The exact `係 + 時候 + action` runtime frame remains a direct-source gap

`時候` is independently supported as a temporal head, especially in overt temporal clauses and ordinary time expressions. The inspected sources did not provide a direct construction-level attestation for the exact fixed runtime template. Component support does not justify a dedicated node, hidden expletive, or English “it is time to” structure.

## Dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `ProhibitiveImperative` | `SOURCE_LINKED_PROHIBITIVE_MARKER_SPLIT_WITH_LEXICAL_AMBIGUITY_AND_MAI5_COVERAGE_REQUIRED` | Split `唔好`, `咪`, ordinary negation, lexicalized forms, and particle-specific directive force. |
| `SuggestionQuestion` | `SOURCE_LINKED_SUGGESTION_UTTERANCE_REALIGNMENT_AND_PARTICLE_CONTEXT_SPLIT_REQUIRED` | Realign as suggestion force over overt proposal material; do not infer intrinsic question syntax. |
| `PriorityMarkerClause` | `SOURCE_LINKED_POSTVERBAL_SIN1_PRIORITY_WITH_PARTICLEIZED_AND_PREPARATORY_SUBTYPE_SPLIT_REQUIRED` | Split simple priority, particleized/deferral, preparatory `V定…先`, and unresolved sequence-domain uses. |
| `PoliteImperativeClause` | `GENERIC_REQUEST_COMPONENTS_SOURCE_LINKED_EXACT_QING2_ADDRESSEE_PATH_TEMPLATE_GAP_AND_REALIGNMENT_REQUIRED` | Decompose the unsourced path wrapper into marker-specific request force plus ordinary clause/VP structure. |
| `TimeToActionFrame` | `COMPONENTS_LINKED_EXACT_HAI6_SI4HAU6_ACTION_FRAME_SOURCE_GAP_AND_QUARANTINE_OR_MERGE_REQUIRED` | Keep quarantined or merge into ordinary components until the exact construction is directly sourced. |

## Forbidden inferences

R27 does not authorize:

- treating every `唔好 + material` as a prohibition;
- treating `咪` and `唔好` as freely interchangeable;
- treating every `不如` utterance as syntactically interrogative;
- generating arbitrary final particles after suggestions, requests, prohibitives, or `先`;
- treating every postverbal `先` as simple priority;
- inserting a hidden later event after `先`;
- merging `請`, `麻煩`, and `唔該` into one syntactic marker;
- requiring `沿住 + path` in ordinary polite requests;
- promoting `係時候 + action` from component co-occurrence;
- inserting a hidden expletive, subject, action, path, or sequence counterpart;
- using code or accepted fixtures as linguistic authority;
- changing parser behavior during the research freeze.

## Open evidence gaps

- full corpus distribution and semantic contrast of `咪` versus `唔好`;
- particle-by-particle directive and suggestion force;
- exact discourse/prosodic diagnostics separating question-shaped translations from suggestions;
- modern corpus evidence for priority, deferral, and preparatory `先` subtypes;
- the exact runtime polite-path template;
- direct construction-level evidence for `係 + 時候 + action`;
- regional and register variation in request and prohibitive strategies.

## Freeze result

This checkpoint changes research provenance only. `main.js`, `manifest.json`, parser templates, roles, glosses, fixtures, tests, accepted behavior, and held-out files remain unchanged.
