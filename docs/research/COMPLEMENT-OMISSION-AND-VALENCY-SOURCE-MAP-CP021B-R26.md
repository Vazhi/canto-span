# Complement omission, response analysis, and lexical valency source map (CP021B-R26)

Date: 2026-07-19  
Scope: claim-level research mapping only; **no parser behavior, fixture, manifest, accepted version, or held-out file changed or opened**.

## Family selected

After verifying R25, the 43 remaining unmapped language labels were ranked by runtime references and non-held-out accepted-fixture reach. Broad `ProductiveVO` and `TransitiveVP` remained unsuitable research units. R26 maps:

- `ComplementEllipsisFragment` — five accepted fixtures;
- `IntransitiveVP` — four accepted fixtures.

The coherent question is whether a surface lacking an overt complement represents lexical one-place valency, a discourse-recoverable null argument, response anaphora, existential-domain omission, or selectively licensed VP ellipsis.

## Runtime extraction

### ComplementEllipsisFragment

The label is created only inside `OpinionStanceFrame`. The runtime recognizes:

1. one-token `有/冇` as `existential_domain_ellipsis`;
2. `係/唔係`, optionally preceded by one subject, as `copular_complement_ellipsis`.

The five accepted cases are `我都覺得有`, `我都覺得佢係`, `我都覺得係`, `我都覺得係啊`, and `我覺得唔係`. All remain `NeedsContext`, and the parser does not fabricate missing words.

### IntransitiveVP

The generative template accepts exactly one `action_verb`. Four accepted cases contain the label: three instances of `笑` and one contextual `同意`. No lexeme-level valency source or discourse-omission test is consulted.

## Source-derived boundaries

### 1. Existential-domain omission is attested, but narrowly

Yip and Matthews give adult Cantonese `仲有`, translated as “There are still some (there).” This supports an understood existential domain in discourse. It does not establish every bare or embedded `有` as the same construction.

### 2. Cantonese null objects require discourse support

The same paper states that null objects refer to material previously mentioned or otherwise recoverable from context. Its exact dialogue contains `我鍾意` meaning “I like (it).” A one-verb surface therefore cannot by itself prove intransitivity.

### 3. `係/唔係` has a competing response-particle analysis

Cheng independently analyzes `係` as a positive response particle and `唔係` as its negative counterpart. The uploaded coursebook also uses `係/係呀` for agreement and `唔係` for disagreement. The runtime’s short forms cannot be forced into copular-complement ellipsis without discourse evidence.

### 4. VP ellipsis is a separate, selectively licensed phenomenon

Lee and Pan show that some auxiliaries and some `有/冇/未` uses license VP ellipsis, while progressive `喺度` and several aspectual heads do not. This blocks a generic “short predicate = ellipsis” rule and does not validate the exact `覺得 + 有/係` profiles.

### 5. General proposition selection does not settle exact omission structure

`覺得` can take propositional content, but none of the inspected sources directly establishes the exact embedded runtime strings with the runtime’s missing-slot analysis. These remain direct-source gaps, not rejected forms.

### 6. Lexical valency and omission must be represented separately

The Cantonese Grammar Synopsis explicitly distinguishes intransitive, transitive, and ditransitive VP patterns. Yip and Matthews show that a transitive predicate can nevertheless surface without its object when discourse licenses omission. Future parsing therefore requires both a lexeme/use valency record and an independent omission decision.

### 7. `同意` is not safely “intransitive” from token count

The accepted `我就同意` follows a proposition in the conditional antecedent. The uploaded coursebook likewise asks whether the learner agrees with a stated proposition. Its content can be discourse-supplied even when no following complement is overt.

### 8. Exact `笑` valency remains a lexical evidence gap

The accepted `笑` cases are plausible one-place predicates, but R26 did not recover a directly inspected lexeme-level source that establishes the relevant senses and boundaries. The gap blocks promotion of the generic template; it is not evidence against `笑`.

## Dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `ComplementEllipsisFragment` | `SOURCE_LINKED_DOMAIN_OMISSION_AND_RESPONSE_PARTICLE_SPLIT_WITH_EMBEDDED_EXACT_FORM_GAPS` | Split existential-domain omission, response/propositional anaphora, independently evidenced copular omission, null arguments, and selectively licensed VP ellipsis. Preserve visible tokens and unresolved antecedent status. |
| `IntransitiveVP` | `SOURCE_LINKED_LEXEME_VALENCY_AND_NULL_ARGUMENT_SPLIT_WITH_GENERIC_TEMPLATE_REALIGNMENT_REQUIRED` | Require sourced lexeme/use valency or explicit uncertainty. Separate genuine one-place predicates from null NP objects, null propositions, optional-object uses, and auxiliary ellipsis. |

## Forbidden inferences

R26 does not authorize:

- treating every bare `有/冇` as existential-domain omission;
- treating every `係/唔係` as either copular ellipsis or a response particle;
- deriving the exact embedded `覺得 + 有/係/唔係` forms from related examples;
- inventing an omitted noun, proposition, VP, subject, or object as an overt token;
- treating all one-token verbs as intransitive;
- treating all objectless verbs as transitive with null objects;
- classifying `同意` as inherently intransitive from surface length;
- importing a null-topic derivation, phase analysis, or pedagogical category as parser truth;
- interpreting accepted fixture success as linguistic evidence;
- changing parser behavior during the research freeze.

## Open evidence gaps

- direct modern dialogue/corpus examples of the exact `我都覺得有/係/佢係` and `我覺得唔係` profiles;
- diagnostics separating copular complement omission from response/propositional anaphora inside stance frames;
- lexeme- and sense-level valency evidence for `笑`, `同意`, and the runtime action-verb inventory;
- corpus rates and discourse conditions for existential-domain omission;
- theory-neutral representation of null NP arguments versus omitted propositions and VPs;
- regional and register variation in short response and omission strategies.

## Freeze result

This checkpoint changes research provenance only. `main.js`, `manifest.json`, parser templates, roles, glosses, fixtures, tests, accepted behavior, and held-out files remain unchanged.
