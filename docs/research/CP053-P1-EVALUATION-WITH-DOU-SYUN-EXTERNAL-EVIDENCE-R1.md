# CP053-P1 EvaluationWithDouSyun external evidence R1

Date: 2026-07-22

Scope: external-evidence follow-up and disposition only; no parser behavior,
fixture, manifest, accepted version, schema, or held-out file changed or opened.

## Decision

Retain `EvaluationWithDouSyun` as `unsupported_generalization`, but do not treat
the current price-domain runtime wrapper as the researched Cantonese pattern.

The label should not be retired yet because independent evidence attests a real
lexical evaluation family with `都算`. It should not be promoted or broadened
because the evidence does not establish the runtime template, exact constituent
boundary, predicate inventory, or productivity.

## New external evidence

### Words.hk / 粵典 `算`

The verb sense `當成` provides three direct examples:

- `我都算好彩`
- `近來生意都算唔錯`
- `佢啲成績都算唔差㗎喇`

These examples independently establish subject/topic + `都算` + evaluative
predicate surfaces, including predicates with negation. They do not establish a
mandatory price noun or the runtime's price-domain lexical selection.

Source: <https://words.hk/zidin/%E7%AE%97>

### PolyU Tai O interview transcript

A public natural-speech transcript contains `都算好彩啦`, `都算好彩，有瓦遮頭`,
and `都算好嘢㗎啦` in one exchange. This corroborates context-recovered or
predicate-initial `都算` evaluation in natural speech.

Source: <https://prod-dcd-datasets-public-files-eu-west-1.s3.eu-west-1.amazonaws.com/e24f131a-8077-41a0-b17c-b41b697344d2>

The passage does not by itself determine omitted-subject syntax, phrase
boundaries, or productive complement selection.

## Comparison with the runtime

The active registry models optional focus adverb + required evaluation marker +
optional modifier + required price noun. The fallback requires co-occurring
`都`, `算`, and one of `中等/價錢/價位`. Its only standardized case remains the
zero-weight implementation probe `都算中等價位。`.

The checked external examples instead end in overt evaluative predicates such
as `好彩`, `唔錯`, `唔差`, and `好嘢`. No checked source supports the exact probe,
a mandatory price noun, or domain-vocabulary co-occurrence as a construction
boundary.

## Disposition

- keep the linguistic status `unsupported_generalization`;
- keep the implementation probe at zero linguistic evidence weight;
- retain the runtime unchanged during this evidence-only slice;
- research whether `都` is ordinary adverbial scope over lexical `算` evaluation;
- define complement, subject/topic, fragment, negation, particle, and
  `ScalarEvaluation` boundaries before any parser replacement;
- retire the price-specific wrapper only together with an evidence-backed
  replacement decision, or after showing that ordinary composition fully
  preserves the attested analysis.

## Forbidden inferences

This checkpoint does not authorize treating every `都算 + X` string as one
construction, treating dictionary examples as productivity evidence, inserting
a hidden subject or price noun, or accepting the existing probe as natural.
