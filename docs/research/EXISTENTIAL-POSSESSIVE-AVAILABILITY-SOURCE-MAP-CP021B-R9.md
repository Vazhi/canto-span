# Existential, possessive, and availability source map (CP021B-R9)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixtures, manifest, accepted version, or held-out data changed**.

## Family selected

After ranking the 124 remaining unmapped language labels, the next coherent high-impact family was the set of constructions built around overt `有`, `冇`, and `有冇`. The batch maps eight labels across Lanes 03, 07, and 10:

- `ExistentialClause`
- `NegatedExistentialClause`
- `ExistentialQuestion`
- `LocativeExistentialClause`
- `ExistentialPresentationalClause`
- `NegatedExistentialFragment`
- `PostposedExistentialQuestion`
- `ExistentialWhQuestion`

The research question was not whether these characters are generally grammatical. It was whether the parser’s **specific node boundaries** correspond to independently documented Cantonese constructions.

## Runtime claim extraction

### Registry-level templates

The registry claims:

- optional subject + `有冇` + NP → `ExistentialQuestion`;
- optional subject + `有` + NP + `冇` → `PostposedExistentialQuestion`;
- optional subject + `冇` + NP → `NegatedExistentialClause`;
- optional subject + `有` + wh object + optional NP → `ExistentialWhQuestion`;
- optional subject + `有` + NP → `ExistentialClause` (`main.js` 1977-2005).

### Active fallback distinctions

The accepted runtime already contains narrower internal distinctions:

- location/domain + `有/冇` + introduced NP → `LocativeExistentialClause` (`main.js` 14161-14201);
- `有/冇` + introduced NP + `喺/喺度` coda → `ExistentialPresentationalClause` (`main.js` 14206-14242);
- bare `有冇` → context-required elliptical `ExistentialQuestion`;
- `有冇` + dynamic/experiential VP → event-question labels, not `ExistentialQuestion`;
- `有冇` + availability nominal such as `嘢食` or `書睇` → `ExistentialQuestion`;
- `有冇` + overt NP → `ExistentialQuestion` (`main.js` 16756-16905);
- bare, subject-bearing, focused, or repeated `冇` may form a context-required `NegatedExistentialFragment` with no fabricated domain (`main.js` 9253-9425);
- a legacy co-occurrence rule wraps spans containing both `有` and `咩` as `ExistentialWhQuestion` (`main.js` 15122-15125).

## Source-derived construction boundaries

### 1. Possession, existence, presentation, and event auxiliary are not one construction

Yip and Matthews distinguish:

- possessor + `有` + possessed NP;
- place expression + `有/冇` + NP;
- participant-introducing `有` + indefinite NP + following predicate;
- available-item constructions such as `有功課做`, `冇衫買`, and `有冇嘢食`;
- auxiliary/event questions and negatives with VP complements.

Lam, Lau, and Lee independently distinguish verbal possessive `有` with an explicit subject from existential-marker `有` introducing a noun without an overt subject. Fan’s article identifies auxiliary/modal `有 + VP` as a separate profile. Shared spelling therefore does not justify one parser node.

### 2. Negative possession/existence uses suppletive `冇`

The sources consistently treat `冇` as the negative counterpart of `有`, not ordinary `唔 + 有`. Lam 2018 gives separate Hong Kong Cantonese negative existential and negative possessive examples and also distinguishes `冇 + VP` perfective/event negation. The parser must therefore preserve both the visible suppletive form and the complement-type split.

### 3. `有冇` questions divide by complement and discourse status

Direct evidence supports:

- possessive `有冇 + NP`;
- locative existential `location + 有冇 + NP`;
- availability with an introduced item and following action/purpose predicate;
- event/experiential `有冇 + VP` as a separate polar-question subtype;
- short `有/冇` answers when the domain is recoverable.

A bare `有冇` question and a bare `冇` response require a discourse-supplied domain. The source does not authorize the parser to fabricate that domain.

### 4. Exact-form gaps remain real gaps

The inspected sources support a general `有 + NP + predicate` presentational family, but not the runtime’s exact homogeneous `有/冇 + NP + 喺-coda` node. They support adjacent `有冇`, not the registered postposed `有 + NP + 冇` template. They support wh-in-situ and attested `有 + wh` combinations, but not the legacy rule that mere co-occurrence of `有` and `咩` establishes a generic `有咩(+NP)` construction.

These are **source gaps**, not claims of ungrammaticality.

## Parser-label dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `ExistentialClause` | `SOURCE_LINKED_SPLIT_REQUIRED` | Split possession, locative existence, participant introduction, and auxiliary `有 + VP`. |
| `NegatedExistentialClause` | `SOURCE_LINKED_SPLIT_REQUIRED` | Split negative possession, locative nonexistence, and event/perfective `冇 + VP`; never insert hidden `有`. |
| `ExistentialQuestion` | `SOURCE_LINKED_SPLIT_REQUIRED` | Split possessive NP, locative NP, availability, event/experiential VP, and discourse-elliptical `有冇`. |
| `LocativeExistentialClause` | `SOURCE_LINKED_NARROWING_DORMANT_TEMPLATE_RETIRE` | Active location + `有/冇` + NP form is linked; the mismatched dormant template should be retired/replaced. |
| `ExistentialPresentationalClause` | `GENERAL_PRESENTATIONAL_FORM_LINKED_EXACT_LOCATIVE_CODA_GAP` | General presentation is linked; exact NP + `喺` coda and negative counterpart remain unmapped. |
| `NegatedExistentialFragment` | `SOURCE_LINKED_CONTEXT_ELLIPSIS_REQUIRED` | Short `冇` response is linked only with discourse-recoverable domain; extended focus/repetition templates stay provisional. |
| `PostposedExistentialQuestion` | `EXACT_FORM_SOURCE_GAP_QUARANTINE` | Exact `有 + NP + 冇` template remains quarantined pending direct evidence. |
| `ExistentialWhQuestion` | `GENERAL_COMPONENTS_LINKED_EXACT_TEMPLATE_GAP` | Wh-in-situ and some `有 + wh` forms are linked; exact generic `有咩(+NP)` template remains unverified. |

## Forbidden inferences

R9 does not authorize:

- a hidden expletive or hidden possessor;
- a hidden positive `有` inside overt `冇`;
- treating all `冇 + VP` as existential negation;
- treating all `有冇` questions as NP existence;
- fabricating the missing domain of bare `有冇` or `冇`;
- deriving `有 + NP + 冇` from ordinary A-not-A by analogy;
- accepting `有咩` from token co-occurrence alone;
- treating a source-search failure as evidence of ungrammaticality;
- changing parser behavior during the research freeze.

## Sources added or expanded

- Yip and Matthews 2000, Unit 6: expanded to possession, existence, presentation, availability, auxiliary questions, and short responses.
- Lam, Lau, and Lee 2024, section 4.5.2: expanded to possessive-verb versus existential-marker segmentation.
- Lam 2018: added for negative existential, possessive, and perfective distributions of `冇`.
- Liang and Mai 2026 supplementary coding scheme: added for `[有冇-NP]` existential questions and in-situ wh examples.

Existing Hara 2023, Yip 1988, and Fan 2026 records supply independent boundaries for event questions, suppletion, and auxiliary/modal `有 + VP`.

## Open evidence gaps

1. Direct natural-corpus and analytic evidence for postposed `有 + NP + 冇`.
2. Exact syntax and distribution of `有咩(+NP)` rather than general wh-in-situ.
3. Exact positive and negative `有/冇 + NP + 喺-coda` presentational clauses.
4. Corpus support for subject-bearing, focused, repeated, and particle-bearing bare-`冇` response templates.
5. Diagnostics separating availability nominals from event-purpose or relative-clause analyses.
