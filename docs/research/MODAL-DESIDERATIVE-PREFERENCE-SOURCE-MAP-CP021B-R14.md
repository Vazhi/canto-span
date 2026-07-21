# Modal, desiderative, and preference source map (CP021B-R14)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixtures, manifest, accepted version, or held-out data changed**.

## Family selected

After ranking the 89 remaining unmapped language labels, the broad `ProductiveVO` and `TransitiveVP` abstractions were again rejected as incoherent research batches. This checkpoint maps three directly interacting labels:

- `ModalVP`
- `DesiderativeVP`
- `PreferenceVP`

Modal A-not-A questions were already mapped in R7. `IntentionFrame`, `VPComplementFrame`, acceptability predicates, postverbal potential `得`, and general stance constructions remain separate families.

## Runtime claim extraction

### Broad modal core

`ModalVP` uses the template `subject? + time? + negator? + modal + manner? + VP + particle?`. The modal slot currently admits `想`, `要`, `可以`, `會`, `識`, `使`, `唔使`, and `可唔可以`. `modalVPFromNodes()` also accepts a wide set of prebuilt VP families, while separate runtime functions may wrap the resulting node in subject/topic/location modal clauses.

### Desiderative core

`DesiderativeVP` requires the special `desiderative_modal` slot, which is limited to `想`, despite the lexicon and sources also giving `要` a want-to reading. The node includes optional subject, degree, and particle material, and a fallback can promote spans using surface cooccurrence cues involving `想`, `好`, or `試吓`.

### Preference core

`PreferenceVP` declares a VP complement, but its note and fallback also claim object complementation. The fallback promotes any core span containing `鍾意`, without first establishing whether the complement is an NP, VP, or clause-like structure.

## Source-derived boundaries

### 1. Auxiliary position and scope are structured, not token-adjacent

Luke and Nancarrow place core auxiliaries after the subject and before the VP. In multi-VP sequences, an auxiliary before the first VP can scope over the sequence; placement before a later VP changes scope or structure and may be unacceptable. Basic Cantonese additionally shows that an adverb can intervene between auxiliary and main verb.

### 2. The modal inventory is heterogeneous

The direct study distinguishes core and non-core auxiliaries. Items express prediction, possibility, ability, permission, obligation, willingness, desire, and knowing how, and some also function as main verbs. A single generic modal node cannot imply identical complementation, negation, scope, or gloss.

### 3. `想` and `要` do not form one interchangeable desiderative marker

`想 + VP` is directly attested as a desiderative auxiliary. `要` may take an NP as a main verb or a VP as an auxiliary, and its auxiliary reading can express desire or necessity. Its negative forms split: `唔要` means not want, while `唔使` means need not. The runtime's `想`-only desiderative slot therefore underrepresents the attested lexical system, but simply adding `要` would overgenerate without semantic and complement disambiguation.

### 4. Generic negator and degree slots are not justified

The `要` polarity contrast directly defeats a uniform `negator + modal` rule. This research pass also did not establish the runtime's generic optional degree slot as a productive desiderative construction; exact forms must be researched rather than inferred from the general degree category.

### 5. `鍾意` has multiple complement profiles

Luke and Nancarrow attest NP-taking main-verb use, clause-like complementation, and auxiliary-like `鍾意 + VP`. They also use aspect distribution to distinguish some uses. Basic Cantonese independently attests `鍾意聽音樂`. These facts support typed complement profiles, not token-presence promotion or one mandatory word-class analysis.

### 6. Postverbal `得` remains outside ModalVP

Basic Cantonese distinguishes preverbal `可以` from postverbal `得` ability/possibility expressions. R10 already maps result and potential complements; R14 does not collapse those structures into the modal family.

## Parser-label dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `ModalVP` | `SOURCE_LINKED_SPLIT_AND_LEXICAL_SCOPE_NARROWING_REQUIRED` | Retain overt auxiliary-before-VP relations, but split lexical modal subtypes, polarity/question forms, clause wrappers, and position-sensitive scope. No free modal × VP-family cross-product. |
| `DesiderativeVP` | `SOURCE_LINKED_SPLIT_AND_LEXICAL_SEMANTIC_NARROWING_REQUIRED` | Split `想` and `要` by lexical use, NP/VP complement, desire/necessity meaning, and polarity. Quarantine generic degree and cooccurrence fallbacks. |
| `PreferenceVP` | `SOURCE_LINKED_SPLIT_AND_COMPLEMENT_TYPE_REQUIRED` | Split `鍾意` NP-object, clause-like, and auxiliary-like VP uses; retire token-presence fallback and keep word-class analysis neutral. |

## Forbidden inferences

R14 does not authorize:

- treating every item in the runtime modal slot as one Cantonese construction;
- a productive modal × arbitrary-VP-family cross-product;
- attaching a modal to any VP in a sequence without position-sensitive scope;
- treating `可唔可以` or `唔使` as ordinary positive modal tokens;
- treating `唔 + 要` as the negative of every `要 + VP` reading;
- classifying every `要 + VP` as desire rather than obligation;
- inserting an unspoken modal, subject, object, purpose, degree, or complement;
- interpreting every `想` as desiderative or every `鍾意` as VP-taking;
- treating `鍾意` NP, VP, and clause complements as the same argument structure;
- merging preverbal `可以` with postverbal potential or acceptability `得`;
- adopting the core/non-core auxiliary analysis as mandatory learner-visible ontology;
- changing parser behavior during the research freeze.

## Sources added or extended

- Luke and Nancarrow 1998: direct corpus-based study of Cantonese auxiliary position, scope, complement restrictions, core/non-core membership, lexical-use contrasts, and corpus frequencies.
- Yip and Matthews 2000: exact reference examples for modal order, intervening adverbs, main/auxiliary contrasts, `唔要` versus `唔使`, postverbal `得`, and `鍾意 + VP`.
- Internal R14 runtime screen: records current templates, lexical-slot membership, fallbacks, and representation conflicts; it is not linguistic authority.

## Open evidence gaps

- current corpus distributions and register variation for individual modal lexemes;
- exact lexical selection restrictions for each auxiliary and each VP subtype;
- a source-backed inventory of degree-modified desiderative expressions;
- the full syntax of auxiliary ellipsis and sentence-final afterthought modals;
- whether `鍾意 + VP` is best represented as auxiliary, control/complement-taking verb, or another analysis;
- dialectal and speaker variation in `要`, `想`, `識`, `會`, and `可以` readings;
- interaction of modals with aspect, negation, particles, topics, and serial-purpose chains.

## Freeze result

This batch changes research provenance only. No parser node, role, gloss, heuristic, fixture, test expectation, manifest field, or held-out item was changed or opened.
