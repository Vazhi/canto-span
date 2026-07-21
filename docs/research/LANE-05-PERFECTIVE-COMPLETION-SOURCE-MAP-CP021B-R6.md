# Lane 05 perfective and completion source map (CP021B-R6)

Date: 2026-07-18  
Scope: claim-first research mapping only; **no parser behavior, fixtures, manifest, or held-out data changed**.

## Family selected

The remaining unmapped queue was ranked by runtime use and accepted fixtures. `PerfectiveVP` has 23 runtime references and 37 accepted fixtures; `CompletionVP` has 19 runtime references and 7 accepted fixtures. `CompletionQuestion` is included because its runtime directly consumes completion/perfective structures and its broad fallback materially affects the same evidence boundary.

This batch maps only:

- `PerfectiveVP`
- `CompletionVP`
- `CompletionQuestion`

Progressive, experiential, durative, delimitative, totality `晒`, result-complement, and potential-complement families remain separate research targets unless a boundary is needed to prevent conflation.

## Runtime claim extraction

### `PerfectiveVP`

Current runtime paths include:

1. `action_verb + 咗 + overt object` (`main.js` 2840-2845);
2. objectless `action_verb + 咗 + particle?`, with either activity or context-linked-object interpretation (2847-2851);
3. perfective motion-goal paths (around 2830-2837 and 7905-7911);
4. perfective placement and transitive wrappers;
5. an explicit nested analysis in which `CompletionVP` or `ResultComplementVP` forms first and outer `PerfectiveVP` then contains `咗 + object` (13508-13552).

The umbrella therefore encodes several distinct language and representation claims, not merely the presence of `咗`.

### `CompletionVP`

Current templates include:

1. `V + completion_marker + 咗 + object` (2854-2860);
2. `V + completion_marker + object` (2863-2867);
3. objectless `V + 完` (2870-2876);
4. objectless `V + 晒` labelled `totality_completion` (2941-2947);
5. inner completion/result composition under outer perfective (13508-13552).

The node consequently combines endpoint/phase `完`, totality `晒`, overt and omitted argument profiles, and outer-perfective composition.

### `CompletionQuestion`

The category template requires `completion_vp + 未` (1957-1960), but the main fallback accepts predicates carrying `completion_vp`, `perfective_vp`, `productive_vo`, or generic `vp` slots, literal `完/咗`, or a bare reviewed VO (7222-7241). A later fallback separately accepts any sequence containing `完` before final `未` (15171-15175).

## Source-derived boundaries

### Perfective `咗`

Yip and Matthews describe `咗` as aspect rather than tense, give ordinary `V-咗-O` examples, and distinguish its result/current-relevance contribution from experiential `過`. Sio and Bond independently classify `咗` as outer perfective aspect. These sources support an overt perfective layer, but not a single undifferentiated semantic gloss for every `咗` clause.

### Inner endpoint/result material before outer `咗`

Sio and Bond state `V-IAP-OAP` ordering and give `我食完(咗)麵`; Sybesma gives `佢食完咗啲飯`; Fan and Chan give `琴日佢做完(咗)功課喇`. These establish **published attestation of selected `V完咗O` surfaces**, mainly in Hong Kong-Cantonese-oriented descriptions. They do **not** establish broad naturalness, equal optionality of `咗`, unrestricted productivity, or Guangzhou-speaker acceptance. The project’s sole native reviewer, a Guangzhou Cantonese speaker, rejected both `食完咗飯` and `我食完咗飯`, while accepting `我食完飯` and `我食完飯喇`. The family must therefore remain a documented source/native conflict, quarantined from productive acceptance pending multi-speaker and dialect-sensitive evaluation.

The sources do **not** justify treating every current `completion_marker` as interchangeable. Sio and Bond distinguish outer aspect from heterogeneous endpoint/result material, and explicitly present their own inventory as illustrative rather than exhaustive.

### Final `未` questions

Yip and Matthews explicitly describe final `未` questions whose predicates contain visible completion/result particles (`飽`, `完`) or aspect markers (`咗`, `過`). The examples support multiple subtypes: result/completion, perfective, and experiential. They do not validate the parser’s unrestricted bare-reviewed-VO fallback.

This is a positive authorization boundary, not a claim that every unattested bare-VP+`未` string is universally ungrammatical.

## Construction dispositions

### `PerfectiveVP` — `SOURCE_LINKED_SPLIT_REQUIRED`

Supported core:

- overt `V-咗-O`;
- final-`未` questions over an overt `咗` predicate;
- `V完咗O` with inner endpoint/result material preceding outer perfective.

Required boundary:

- separate simple overt-object, overtly objectless, perfective-over-inner-result, placement, and motion-goal profiles;
- preserve overt tokens and do not insert a missing object;
- do not use the node label to assert simple past tense or uniform completion semantics.

### `CompletionVP` — `SOURCE_LINKED_SPLIT_REQUIRED`

Supported core:

- narrow overt `V完` endpoint/completion profile;
- independently attested `V完咗O` family.

Required boundary:

- separate endpoint/phase `完`, totality `晒`, result-state complements, and outer perfective;
- keep `晒` unmapped pending dedicated source work;
- retain the current nested inner-completion/outer-perfective analysis only as a future representation candidate for the sourced subtype.

### `CompletionQuestion` — `SOURCE_LINKED_NARROWING_REQUIRED`

Supported core:

- final `未` following a predicate with overt completion/result material or an overt aspect marker;
- distinct completion/result, perfective, and experiential subtypes.

Required boundary:

- verb adjacency or generic `ProductiveVO` status is insufficient;
- no hidden completion or aspect marker may be inserted;
- the existing bare-reviewed-VO fallback remains unlicensed by this batch.

## Open evidence gaps

1. `晒` totality/completive behavior and its relation to `完`.
2. Exact lexical and discourse conditions for objectless `V-咗` and `V完`.
3. Whether any independently described bare predicate + final `未` construction supports part of the current broad fallback.
4. Broader selectional restrictions among result/phase material and outer `咗`, beyond the selected systems in Sio and Bond.
5. Multi-speaker naturalness and native structural-analysis validation; current counts remain zero for expert/native structural validation.

## Sources used

- [Yip and Matthews 2000, *Basic Cantonese*](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf), Units 18 and 23.
- [Sio and Bond 2025, “Inner and outer aspect in Cantonese”](https://dkaramasov.github.io/hpsg2025/assets/pdf/7-inner-and-outer-aspect-in-cantonese.pdf), pp. 2-3.
- [Sybesma 2013, “Cantonese sin1 先 and the question of microvariation and macrovariation”](https://www.researchgate.net/publication/305411096_Cantonese_sin_xian_and_the_question_of_microvariation_and_macrovariation), author PDF pp. 17-18, example (25a).
- [Fan and Chan 2022, “Grammatical properties of zo 咗 in Hong Kong Cantonese”](https://www.jbe-platform.com/content/journals/10.1075/lali.00110.fan?crawler=true), p. 374, example (3c).

## Authorization status

This map changes research provenance and future dispositions only. It does not authorize parser implementation, fixture alteration, held-out opening, native-analysis claims, or `supported_productive` promotion.
