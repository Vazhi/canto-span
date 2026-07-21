# Lane 07 A-not-A polar-question source map (CP021B-R7)

Date: 2026-07-18  
Scope: claim-first research mapping only; **no parser behavior, fixtures, manifest, or held-out data changed**.

## Family selected

The remaining unmapped language queue was ranked by runtime and accepted-fixture impact. `ANotAQuestion` dominates the queue, with `ModalANotAQuestion` and `CopularANotAQuestion` forming its closest high-impact structural family. `AcceptabilityANotA` is included because its runtime claims a specialized repeated-predicate subtype, but `AcceptabilityClause` (`VP + 都得`) remains a separate declarative construction and is not mapped in this batch.

This batch maps only:

- `ANotAQuestion`
- `ModalANotAQuestion`
- `CopularANotAQuestion`
- `AcceptabilityANotA`

## Runtime claim extraction

### `ANotAQuestion`

The category template and both ordinary fallbacks require an exact visible predicate copy: optional subject + verb + `唔` + the same verb + optional complement (`main.js` 1915-1921, 7144-7166, 15162-15169). The same label is also assigned by the later have-or-not path to `有冇 + dynamic VP` event-occurrence questions (`main.js` 16790-16848), despite that path having different morphology and subtype metadata.

### `ModalANotAQuestion`

The broad template suggests two modal arms and a visible VP (`main.js` 2107-2111). Specialized fallbacks implement only:

1. exact-copy `想 + 唔 + 想 + VP`; and
2. fused/reduced `可唔可以 + VP`.

The runtime modal inventory is broader than these two paths and includes `想`, `要`, `可以`, `會`, `識`, `使`, `唔使`, and `可唔可以`.

### `CopularANotAQuestion`

The fallback recognizes fused or split `係唔係`, reconstructs both copular arms, and requires a visible nominal or possessive complement (`main.js` 8897-8967).

### `AcceptabilityANotA`

The template claims optional time/topic + `得唔得` + optional particle, while the legacy fallback only checks for two `得` tokens around `唔` (`main.js` 2203-2207, 15108). The coverage inventory records no accepted fixtures for this label.

## Source-derived boundaries

### Ordinary lexical-predicate A-not-A

Law and Li directly attest ordinary Cantonese `A + 唔 + A` questions with optional complements and sentence-final particles. Li also documents reduced disyllabic patterns such as `可唔可以` and `方唔方便`. Therefore, exact whole-token equality is a valid narrow subtype but not a complete definition of Cantonese A-not-A morphology.

Law and Yip allow broader lexical categories than action verbs, while both also describe restrictions. A runtime `isVerbLike` check cannot by itself establish free productivity.

### `有冇 + VP`

Hara explicitly labels `有冇 + VP` as an A-not-A polar question. Yip identifies `有/冇` as a suppletive positive-negative pair rather than ordinary `有 + 唔 + 有`. Fan independently describes nonpossessive auxiliary/modal `有 + dynamic VP`, with a distribution favoring polar questions and other nondeclarative environments.

The broad linguistic family link is therefore supported, but the parser should not represent `有冇 + VP` as the same exact-copy construction as `V唔V`. Possession, existence, experience, and event occurrence remain separate subtypes.

### Modal A-not-A

Law gives modal forms including `要唔要` and `可唔可以`, and also reports lexical/semantic restrictions, especially for epistemic `應該`. Li’s sample confirms reduced disyllabic `可唔可以 + VP`. These sources do not authorize every runtime item tagged `modal` as one productive class.

### Copular `係唔係`

Law argues that `係唔係` contains the copula and belongs to the A-not-A family; her examples also allow a following clause, making the current nominal/possessive-only fallback too narrow. The analysis is not uncontested: Law explicitly argues against earlier special-construction analyses, and Li’s limited film sample documents alternatives without an actual Cantonese `係唔係` token. Surface support and theoretical classification must therefore remain separate.

### Acceptability/evaluation

Li attests evaluative and adjectival A-not-A forms such as `方唔方便`, `啱唔啱用`, and `夠唔夠`. This supports evaluation meanings inside the broader predicate A-not-A family. The reviewed primary-source set did not independently motivate a special `AcceptabilityANotA` construction for `得唔得`, nor the runtime’s optional time/topic template. This is a source/ontology gap, not evidence that `得唔得` is unnatural.

## Construction dispositions

### `ANotAQuestion` — `SOURCE_LINKED_SPLIT_REQUIRED`

Supported core:

- overt lexical-predicate `A唔A` with optional visible complement;
- reduced disyllabic A-not-A as a distinct surface subtype;
- a broad family relationship for suppletive `有冇 + VP` questions.

Required split:

- exact lexical-predicate `A唔A`;
- reduced-disyllabic forms;
- `有冇` possession/existence/event/experiential subtypes.

Neutrality or lack of expectation may be learner-facing pragmatic metadata but is not a hard structural parse condition.

### `ModalANotAQuestion` — `SOURCE_LINKED_NARROWING_AND_SUBTYPE_SPLIT_REQUIRED`

Keep only independently sourced lexical modal subtypes. Separate exact-copy forms such as `想唔想` or `要唔要` from reduced/fused `可唔可以`; preserve the overt complement; and do not promote the entire runtime modal list from category membership alone.

### `CopularANotAQuestion` — `SOURCE_LINKED_ANALYSIS_CONTESTED_REPRESENTATION_NARROWING`

Retain the overt `係唔係` surface. Distinguish nominal/possessive complements from clausal complements, preserve fused-versus-split tokenization as internal provenance, and mark the uniform copular-A-not-A analysis as supported but contested.

### `AcceptabilityANotA` — `GENERAL_ANOTA_FORM_LINKED_EXACT_CONSTRUCTION_GAP`

Broad evaluative A-not-A is supported, but a distinct `得唔得` construction node and its optional time/topic template remain unmapped. Keep the path quarantined; a future representation may merge the form into lexical predicate A-not-A if exact construction evidence is not found.

## Open evidence gaps

1. Pattern-specific primary analysis for `得唔得` and its lexical category in contemporary Hong Kong/Guangzhou Cantonese.
2. Exact restrictions for `想唔想`, `使唔使`, `識唔識`, `會唔會`, and other runtime-listed modals.
3. Corpus distribution and complement types for copular `係唔係`, including `係咪` competition.
4. A parser-ready lexical inventory for reduced disyllabic A-not-A forms; no free syllable-deletion rule is authorized.
5. Multi-speaker naturalness and native structural-analysis validation. Current independent human-expert and native structural-analysis counts remain zero.

## Sources used

- [Law 2001, “A-not-A Questions in Cantonese”](https://www.phon.ucl.ac.uk/publications/WPL/01papers/law.pdf).
- [Li 2017, *The Syntactic and Pragmatic Properties of A-not-A Question in Chinese*](https://ir.canterbury.ac.nz/items/0764332d-7d53-44d8-a034-a0e316f2145f).
- [Hara 2023, “Cantonese Question Particles”](https://yuriehara.github.io/website/download/RoutledgeCantoneseParticle.pdf).
- [Yip 1988, “Negation in Cantonese as a Lexical Rule”](https://www11.ihp.sinica.edu.tw/storage/w2_file/3407pXasnae.pdf).
- [Fan 2026, “The Modal Meaning of the jau5 (有) have+VP in Hong Kong Cantonese”](https://jcl.fah.um.edu.mo/the-modal-meaning-of-the-jau5-%E6%9C%89havevp-in-hong-kong-cantonese/), abstract-level verification.

## Authorization status

This map changes research provenance and future dispositions only. It does not authorize parser implementation, fixture alteration, held-out opening, native-analysis claims, or `supported_productive` promotion.
