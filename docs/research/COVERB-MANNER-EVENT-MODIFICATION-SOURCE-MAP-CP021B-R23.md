# Coverb and manner event modification (CP021B-R23)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixture, manifest, accepted version, or held-out file changed or opened**.

## Family selected

After verifying R22, the remaining 53 unmapped language labels were ranked by runtime references and non-held-out accepted-fixture reach. `CoverbFrame` had the strongest coherent accepted reach. Its ordering and scope behavior directly interacts with three unresolved modifier labels, so R23 maps:

- `CoverbFrame`
- `DegreeMannerAdverbial`
- `DegreeMannerModifiedVP`
- `MannerAdverbialVP`

Broad `ProductiveVO` and `TransitiveVP` were again rejected as implementation umbrellas rather than coherent research constructions.

## Runtime extraction

### CoverbFrame

The runtime accepts optional subject and up to two pre-coverb modifiers, followed by one of three markers:

1. `用 + instrument NP + predicate`;
2. `喺 + location + predicate`;
3. `同 + NP + predicate`, heuristically divided into comitative, addressee, or broader interpersonal profiles.

Its predicate helper accepts several existing VP wrappers. Accepted examples include `我喺屋企食飯`, `我琴日喺屋企食飯`, and `我哋再同大家講講`.

### DegreeMannerAdverbial

The runtime combines a broad degree/manner head with `啲`. It groups property heads such as `貴/平` with action-related material such as `快/慢/大聲/小心`. Accepted child examples are `行快啲`, `講大聲啲`, and `講慢啲`.

### DegreeMannerModifiedVP

The wrapper requires a DegreeMannerAdverbial before a following VP. It is explicitly a transparent parser wrapper intended to retain the inner motion/action structure. It has no direct occurrence in the inspected accepted snapshot.

### MannerAdverbialVP

The fallback requires two identical stative/property tokens followed by an action predicate and treats the pair as a bare reduplicated manner expression, e.g. `慢慢行`. No accepted fixture directly exercises the label.

## Source-derived boundaries

### 1. Coverbs form a real family, but category and attachment are contested

Francis and Matthews describe the Cantonese coverb construction as serial-verb-like with a preposition-like first verb, while arguing from verbal morphosyntax and experimental extraction data that coverbs are not simply prepositions. Leung gives an alternative detailed syntactic reanalysis. Canto Span should preserve the overt relation without selecting one theoretical category or attachment as parser truth.

### 2. Marker identity and semantic relation must remain visible

Instrumental `用`, event-location `喺`, and comitative `同` are directly attested before the main predicate. The source inventory is broader than the runtime’s three markers. Moreover, `同` has comitative, interpersonal/addressee, and substitute/benefactive-like uses. A speech verb is useful context but does not by itself prove the relation.

### 3. Preverbal location differs from a standalone locative predicate

Wong explicitly contrasts `佢喺泳池游水` with `佢喺泳池`. Kwan separately distinguishes preverbal event location from postverbal result location. `CoverbFrame` therefore requires a following predicate and cannot absorb all `喺` structures.

### 4. Modifier order is not a generic “manner” list

Leung’s inspected examples distinguish temporal, manner, and coverb phrases. Reduplicated manner and a coverb phrase can alternate in the reported examples, but temporal material is structurally/order-wise different. The runtime’s generic role assignment for all pre-coverb modifiers is too coarse.

### 5. `X啲` does not have one function

The evidence includes:

- action-related directives: `講大聲啲`, `講慢啲`, `行快啲`;
- a preposed action modifier: `快啲行上去啦`;
- an imperative scalar unit: `靜啲`;
- property comparison: `哥哥乖啲喎`.

These share visible `啲` but differ in position, scope, and relation to a subject or event. They cannot all be learner-glossed as merely “how the action happens.”

### 6. Preposed and postverbal order must not be silently equated

`快啲行上去` and `行快啲` are both attested, but the sources do not establish free interchangeability or identical syntax, information structure, or particle behavior. A future representation must preserve order and the complete inner directional VP.

### 7. DegreeMannerModifiedVP is primarily an internal wrapper

The exact preposed surface is supported, but no source establishes `DegreeMannerModifiedVP` as a dedicated Cantonese construction node. The best-supported future treatment is a transparent modifier relation over an independently parsed VP.

### 8. Reduplicated manner is directly supported with overt `噉`

Leung gives `慢慢噉` before an event and shows its ordering with a `同` coverb phrase. The coursebook independently attests `慢慢噉形成咗`. Both directly inspected examples retain `噉`; they do not prove the runtime’s exact bare `慢慢行` template.

### 9. Bare reduplicated manner remains an exact-form gap

R23 recovered no direct source for bare `慢慢行` as the same productive construction. This blocks promotion but is not a grammaticality rejection. Lexeme selection, optionality of `噉`, prosody, and register remain research questions.

## Dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `CoverbFrame` | `SOURCE_LINKED_MARKER_AND_RELATION_SUBTYPE_SPLIT_WITH_CATEGORY_ATTACHMENT_BOUNDARY_REQUIRED` | Split marker/relation subtypes; preserve object and following predicate; remain neutral on verb/preposition/adjunct theory. |
| `DegreeMannerAdverbial` | `SOURCE_LINKED_SCALAR_PROPERTY_AND_ACTION_MANNER_SPLIT_WITH_HEAD_SELECTION_NARROWING_REQUIRED` | Split property comparison, imperative adjustment, pre/postverbal action modification, and discourse scope. |
| `DegreeMannerModifiedVP` | `COMPONENTS_SOURCE_LINKED_PREPOSED_MODIFIER_WRAPPER_REALIGNMENT_REQUIRED` | Treat as transparent modifier-plus-VP composition or internal wrapper, preserving the complete inner VP. |
| `MannerAdverbialVP` | `SOURCE_LINKED_REDUPLICATED_MANNER_WITH_GAM2_VISIBLE_AND_BARE_FORM_GAP` | Source-link `X-X噉`; keep bare `X-X + VP`, optionality, and lexical productivity unresolved. |

## Forbidden inferences

R23 does not authorize:

- treating every coverb as an ordinary preposition or every coverb phrase as one kind of serial verb;
- limiting Cantonese coverbs to the runtime’s `用/喺/同` inventory;
- assigning comitative, addressee, or benefactive meaning from `同` or verb class alone;
- classifying a standalone `喺 + location` predicate as a CoverbFrame;
- assigning time, focus, and discourse modifiers the generic role “manner”;
- treating every `X啲` as event manner or every adjacent `X啲 + VP` as one predicate;
- assuming free alternation between `快啲行` and `行快啲`;
- deleting, inserting, or freely substituting sentence-final particles;
- treating component attestation as proof of an independent DegreeMannerModifiedVP node;
- deleting overt `噉` from sourced reduplicated-manner expressions;
- licensing arbitrary repeated stative/property forms as manner adverbs;
- using code, fixtures, or textbooks alone as proof of productivity;
- changing parser behavior during the research freeze.

## Open evidence gaps

- corpus and experimental evidence separating `同` comitative, addressee, interpersonal, and benefactive-like readings;
- modern corpus distribution for coverb marker inventories and multiple-coverb ordering;
- lexeme-specific and prosodic conditions on preposed versus postverbal `X啲`;
- the full semantic inventory of `啲` in directives, comparison, and event modification;
- direct evidence for exact bare `慢慢行` and optionality of `噉`;
- lexical productivity of reduplicated manner heads;
- theory-neutral attachment diagnostics suitable for parser representation;
- native expert structural analyses; project native input remains surface-naturalness evidence, not expert analysis.

## Freeze result

This batch changes research provenance only. Parser code, grammar templates, roles, glosses, fixtures, tests, manifest data, accepted behavior, and held-out files remain unchanged.
