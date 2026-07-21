# Lane 06 classifier noun phrases: parser-facing source map (CP021B-R5)

Date: 2026-07-18  
Branch: research provenance only  
Runtime status: **unchanged** from accepted `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`

## Scope and selection

The remaining queue was ranked by runtime references and accepted-fixture impact. `ProductiveVO` and `TransitiveVP` rank highly but are overly broad abstractions rather than one coherent construction family. This batch therefore maps seven tightly related Lane 06 classifier-NP labels:

| Label | Runtime references | Accepted fixtures | Prior status |
|---|---:|---:|---|
| `QuantifiedClassifierNP` | 22 | 23 | provisional |
| `DemonstrativeClassifierNP` | 14 | 30 | provisional |
| `ClassifierObjectNP` | 8 | 4 | unsupported_generalization |
| `PossessiveClassifierNP` | 4 | 0 | unsupported_generalization |
| `DemonstrativeHeadNP` | 2 | 0 | unsupported_generalization |
| `BareClassifierNP` | 0 | 0 | unsupported_generalization |
| `DemonstrativeQuantifiedClassifierNP` | 0 | 0 | unsupported_generalization |

Counts come from `test-data/grammar-legitimacy-audit.tsv`. They rank impact; they are not linguistic evidence.

## Source basis and theory control

The strongest sources converge on several overt forms while differing over structure and interpretation. Cheng and Sybesma (1999) establish the importance of Cantonese classifier+noun constituents. Simpson, Soh, and Nomoto (2011) show that “bare classifier” means classifier plus noun without a numeral and that definite-reference preferences vary. Bond and Sio (2024) implement four explicit schemata: D-(X)-C-N, X-C-N, C-N, and N. Xia (2025) uses constituency and ellipsis diagnostics and argues for a right-branching Cantonese Num-[CL-N] structure, while reporting reduced acceptability for inserting `jat1` into D-C-N. Canto Span records these convergences and conflicts without adopting one full syntactic theory.

Lam, Lau, and Lee (2024) is used primarily for overt segmentation and corpus-oriented examples, not as a complete syntax. Yu (2006) supplies useful exact examples for possessive and headless demonstrative-classifier NPs but remains corroborative because it is unpublished.

## Runtime claim extraction

### `QuantifiedClassifierNP`

The current runtime uses the same label for two distinct templates:

1. `quantity + classifier + head_noun`, an overt X-C-N nominal;
2. `quantity + classifier + particle?`, marked as discourse-dependent noun-head ellipsis with no fabricated head.

The sources support both overt profiles but distinguish them. Lam et al. and Xia explicitly require the classifier to remain overt under noun ellipsis. The parser's no-hidden-head policy is therefore compatible with the evidence, while a single undifferentiated language construction is too broad.

**Disposition: `SOURCE_LINKED_SPLIT_REQUIRED`.** Preserve separate `overt_head` and `head_ellipsis` subtypes. A bare numeral is not licensed as the same NP, and no antecedent or noun may be invented.

### `DemonstrativeClassifierNP`

Runtime includes both D-C-N (`呢間餐廳`) and headless D-C-Ø (`呢個`, `嗰個`). Both are externally attested profiles, but they differ in overt head presence and discourse requirements. D-X-C-N is also attested, yet the sources conflict over how freely `jat1` can be inserted: Bond and Sio formalize D-(X)-C-N, whereas Xia reports reduced acceptability for `jat1` insertion in Cantonese D-C-N.

**Disposition: `SOURCE_LINKED_SPLIT_REQUIRED`.** Keep overt-head, headless, and overt-numeral profiles distinguishable. Record variation; do not create a hidden numeral or hidden noun.

### `ClassifierObjectNP`

The constructor recognizes overt classifier+head material such as `樣驚喜`, but the label and slots build objecthood into the nominal node. Research treats C-N as a general nominal pattern. Simpson et al. illustrate subject and object uses; Xia shows C-N constituents and coordination; Bond and Sio classify C-N independently of clause role.

**Disposition: `SOURCE_LINKED_REPRESENTATION_REALIGNMENT_REQUIRED`.** Preserve C+N, but use a role-neutral nominal representation. Object, topic, or subject role belongs to the containing construction.

### `BareClassifierNP`

The label is dormant. In the reviewed literature, “bare classifier” consistently means C-N with no overt numeral, not a classifier standing alone. That surface family already overlaps the active `ClassifierObjectNP` path.

**Disposition: `LANGUAGE_FORM_SUPPORTED_DORMANT_LABEL_REDEFINE_OR_RETIRE`.** Do not activate the label as classifier-alone ellipsis. Retire it or redefine it as a role-neutral alias during a later representation design.

### `DemonstrativeHeadNP`

The declared template is `demonstrative_pronoun + head_noun`, but its note gives `呢個 + 蘋果`. Bond and Sio explicitly analyze `呢(一)個蘋果` as D-(X)-C-N, with `個` a classifier. Lam et al. likewise separate determiner, classifier, and noun.

**Disposition: `LANGUAGE_CLAIM_RETIRE_TEMPLATE_MISANALYSIS`.** Keep this path quarantined and route `呢個蘋果`-type strings through demonstrative+classifier+noun. This does not erase the distinct headless `呢個` profile.

### `DemonstrativeQuantifiedClassifierNP`

The label is dormant, but the overt D+Num+CL+N form is attested (`呢兩個人`; `呢(一)個蘋果`). Source attestation does not establish that Canto Span needs a separate node, and Xia's `jat1` judgments block automatic equivalence between D-C-N and D-one-C-N.

**Disposition: `SOURCE_LINKED_DORMANT_NARROW_OR_MERGE`.** Retain only as an overt-token subtype if later representation review demonstrates a need; otherwise compose or merge it with the demonstrative-classifier family.

### `PossessiveClassifierNP`

Sources support possessor+C+N forms such as `我架車` and `佢本書`. Runtime, however, accepts a possessor plus a broad NP and creates the node only as a helper inside a bounded result frame; it does not independently require an overt classifier.

**Disposition: `SOURCE_LINKED_NARROWING_REQUIRED`.** Require overt possessor+classifier+noun structure or independently licensed head ellipsis. Keep result-frame ownership and clause role outside the nominal construction.

## Evidence conflicts and limits

1. **No one-source ontology.** Cheng and Sybesma, Bond and Sio, and Xia use different formal analyses. The project may rely on overt order, head presence, discourse status, and tested distribution without asserting one theory as settled.
2. **Definiteness is not mechanically uniform.** C-N can receive definite or indefinite interpretations depending on position, context, variety, and speaker judgments. Do not hard-code one value from the label alone.
3. **Classifier and measure-word domains are not automatically identical.** Xia explicitly distinguishes their distribution and structure. This batch does not validate every current `classifier` lexicon item as the same grammatical class.
4. **No hidden one.** The source conflict over `jat1` makes a silent-numeral implementation especially unsafe. Preserve only overt tokens.
5. **No parser change.** Every disposition is a future remediation candidate or governance classification, not an implementation authorization.

## Files

- External source register: `PARSER-CONSTRUCTION-SOURCE-REGISTER-CP021B-R5.tsv`
- Internal provenance register: `PARSER-CONSTRUCTION-INTERNAL-PROVENANCE-REGISTER-CP021B-R5.tsv`
- R5 additions: `PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R5-ADDITIONS.tsv`
- Cumulative matrix: `PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R5.tsv`
- Updated 182-label queue: `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R5.tsv`
- Search log: `CP021B-R5-SOURCE-SEARCH-LOG.tsv`

No parser code, manifest version, accepted fixture, or held-out partition changed.
