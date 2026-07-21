# Event modification: reduplication, delimitative 下/吓, and postverbal 返 (CP021B-R21)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixture, manifest, accepted version, or held-out file changed or opened**.

## Family selected

After verifying R20, the 60 remaining unmapped language labels were re-ranked using `main.js` and non-held-out accepted snapshots. Broad `ProductiveVO` and `TransitiveVP` remained incoherent research units. The highest coherent family was:

- `ReduplicatedVP`
- `DelimitedVP`
- `RepetitiveComplementVP`
- `RestorativeComplementVP`

The family concerns overt event modification rather than ordinary argument structure: reduplication, bounded-action `下/吓`, and nonspatial postverbal `返` meanings.

## Runtime extraction

### ReduplicatedVP

The registry requires two adjacent identical `action_verb` tokens and describes the result as a light/checking action. Accepted non-held-out output includes standalone `食食` and embedded `講講`. The node has no overt slot for `一`, `下/吓`, or an object.

### DelimitedVP

The registry requires `action_verb + delimitative_aspect` and labels the span `V吓`. Accepted trees include `講吓` and `食吓`; separate runtime logic may infer or reject a topic-linked omitted object. The delimitative node itself does not encode an event-class restriction.

### RepetitiveComplementVP and RestorativeComplementVP

The fallback recognizes:

1. action + `返` + `好` as restorative;
2. action + `返` + frequency quantity as repetitive;
3. action + `返` + classifier object as repetitive only for selected consumption, perception, or discourse-content verbs;
4. other V返NP sequences as a generic complement with underdetermined meaning.

Accepted top-level cases are `睇返一次`, `講返一次`, `飲返杯咖啡`, and `整返好`.

## Source-derived boundaries

### 1. Verbal reduplication is not one light-action rule

The uploaded Hong Kong Cantonese coursebook distinguishes `V-V`/`V-一-V`, which generally indicate short duration and sometimes trying, from `V-V-下`, which presents an ongoing event such as `行行下` or `食食下飯`. Lam independently shows that reduplicated verbal interpretation can be durative or iterative depending on the aspectual class of the base predicate. The runtime’s same-surface test therefore captures only one visible pattern and cannot determine one meaning or unrestricted lexical productivity.

The exact accepted standalone `食食` with the runtime’s light/checking gloss remains a direct-source gap. This is not a rejection of the form.

### 2. Delimitative 下/吓 has a supported core but competing analyses

Sio and Bond treat `吓` as delimitative outer aspect and restrict it in their implementation to activity predicates, excluding endpoint-adding combinations. The uploaded coursebook calls `下`, sometimes written `吓`, a verbal measure expression/complement comparable to “一下,” with examples including `叫下佢`, `搵下佢`, and `打下電話`. These sources support the overt form and a bounded-action meaning but do not settle one theory-neutral category.

Argument ellipsis is separate. Nothing in the delimitative evidence itself licenses copying a prior topic into an omitted object.

### 3. V返NP is radically underdetermined by surface form

Chor documents directional, redoing, resumptive, reciprocative, restorative, evaluative, and interpersonal uses of `返`. This directly defeats the runtime’s selected-verb-class shortcut. Most importantly, `飲返杯咖啡` is explicitly discussed as a positive/pleasurable subjective use that need not mean returning to or repeating coffee drinking. The uploaded coursebook separately gives a genuinely resumptive `飲番啤酒`, defined as resuming an activity after interruption.

Thus the same broad surface profile can receive different meanings from discourse and construction. Consumption, perception, and speech/content verbs are not sufficient diagnostics.

### 4. Restorative V返好 is attested but must remain compositional

Chor analyzes restoration through an A-B-A return to an earlier functional state. The CUHK resource directly attests `整返好部電腦` and `執返好間房`, alongside structurally different `好返` recovery expressions. This supports the exact restorative surface profile, but not a self-sufficient three-token node: overt objects, result structure, and prior-state provenance must remain visible.

## Dispositions

| Label | Disposition | Parser-facing consequence |
|---|---|---|
| `ReduplicatedVP` | `SOURCE_LINKED_REDUPLICATION_FORM_AND_AKTIONSART_SPLIT_WITH_LEXICAL_BOUNDARIES` | Split bare V-V, V-一-V, and V-V-下; preserve objects/markers; make event class and lexical compatibility explicit. |
| `DelimitedVP` | `SOURCE_LINKED_DELIMITATIVE_FORM_WITH_ACTIVITY_SELECTION_AND_ANALYSIS_REALIGNMENT_REQUIRED` | Retain overt 下/吓, add future event-compatibility review, and keep argument ellipsis separate from delimitative marking. |
| `RepetitiveComplementVP` | `SOURCE_LINKED_FAAN1_RESUMPTIVE_REDOING_SUBJECTIVE_SPLIT_AND_CONTEXTUAL_DISAMBIGUATION_REQUIRED` | Replace verb-class determinism with distinct 返 relations and context-sensitive uncertainty; `飲返杯咖啡` must not be categorically repetitive. |
| `RestorativeComplementVP` | `SOURCE_LINKED_FAAN1_RESTORATIVE_RESULT_NARROWING_AND_PRIOR_STATE_LICENSING_REQUIRED` | Keep exact V返好 attestation but compose it with result, object, and prior-state provenance rather than treating three tokens as a complete construction. |

## Forbidden inferences

R21 does not authorize:

- treating every repeated action token as grammatical or semantically identical;
- deleting or inserting overt `一`, `下`, or `吓`;
- treating V-V, V-一-V, and V-V-下 as one surface construction;
- assigning “light/checking” to every reduplicated verb;
- treating every action verb as compatible with delimitative 下/吓;
- presenting outer-aspect versus verbal-measure analysis as settled fact;
- recovering an omitted object solely from a topic because the predicate contains 吓;
- treating every V返NP as repetition, resumption, restoration, or direction;
- treating consumption, perception, or speech verbs as sufficient 返 disambiguators;
- interpreting `飲返杯咖啡` categorically as repeated drinking;
- inserting a hidden prior event, original state, or patient into restorative structures;
- swallowing overt objects after V返好;
- changing parser behavior during the research freeze.

## Open evidence gaps

- direct corpus evidence for standalone `食食` and its discourse function;
- lexeme-by-lexeme restrictions on bare V-V and V-一-V;
- corpus distribution of 下 versus 吓 and its interaction with objects and particles;
- exact modern corpus attestations for `睇返一次` and `講返一次`;
- operational discourse diagnostics separating resumptive, redoing, evaluative, and interpersonal 返;
- regional and register variation, including Guangzhou versus Hong Kong preferences;
- independent native structural analysis; the project still has zero native expert analyses.

## Freeze result

This batch changes research provenance only. Parser code, grammar templates, roles, glosses, fixtures, tests, manifest data, accepted behavior, and held-out files remain unchanged.
