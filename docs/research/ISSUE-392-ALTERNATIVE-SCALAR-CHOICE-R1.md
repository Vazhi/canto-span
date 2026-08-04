# ISSUE-392 alternative-scalar choice-question disposition R1

Parent issue: #392  
Work claim: #535  
Date: 2026-08-04

## Decision

Do not create or promote a bounded integrated `alternative-choice + scalar evaluation` construction from the current evidence.

The reviewed evidence supports a compositional analysis:

1. `定` / `定係` contributes the alternative-choice question layer; and
2. scalar/evaluative material such as `好啲`, `多啲`, or final `好` contributes a separate comparison, preference, or recommendation layer.

The target examples are real and learner-visible, but this packet does not establish that they require one new construction identity.

## Assumption-level research review

### Assumption A — `定` / `定係` marks alternative-choice questions

Supported.

CantoDict defines `定係` as “or” used in questions giving a choice, often abbreviated to `定`, and contrasts it with `或者`, which is used in disjunctive statements.

A Cantonese-learning source gives the same distinction: `或者` lists possibilities, while `定` / `定係` is used when the hearer must choose between presented options. It gives examples such as `你想食橙定係蘋果呀？` and `你鍾意飲茶定係咖啡多啲㗎？`.

This supports the alternative-choice layer, but the strongest sources here are dictionary/pedagogical rather than a full construction-level grammar packet.

### Assumption B — `好啲` / `多啲` can contribute scalar or preference material

Supported as background, but not enough for a new identity.

Cantonese comparative sources describe adjective comparison and degree material, including `啲` after adjectives or quantities. The `定係` teaching source includes a lexical-preference example with `鍾意 … 多啲`, where `多啲` scopes over liking/preference rather than creating an alternative-question identity by itself.

This supports keeping the scalar/evaluative layer separate from the alternative-question layer.

### Assumption C — final `好` and `好啲` in alternative questions are always the same construction

Not supported.

Examples like:

- `你飲咖啡定奶茶好啲？`
- `凍飲定熱飲好？`
- `搭巴士定地鐵好啲？`

are similar in asking for a better/recommended choice, but `好`, `好啲`, and `多啲` may differ in comparison, recommendation, preference, and acceptability force. This packet does not collapse them.

### Assumption D — the retired broad `ComparativeStative` fallback should be revived

Not supported.

The target forms do not justify restoring a broad comparative fallback. The evidence points to separate alternative-choice and scalar/evaluative layers, not a generic comparative wrapper.

## Target examples

The issue highlights recurring Glossika-style examples such as:

- `你飲咖啡定奶茶好啲？`
- `凍飲定熱飲好？`
- `搭巴士定地鐵好啲？`

These should be treated as complete questions, but the completion does not require a new integrated identity.

## Positive compositional profile

Accept as a complete alternative-scalar question when:

1. alternatives are overtly presented by `定` / `定係`;
2. a scalar/evaluative predicate or modifier such as `好`, `好啲`, `多啲`, or a lexical preference predicate evaluates the alternatives;
3. the sentence asks for a choice, preference, recommendation, or better option.

Expected layers:

- alternative-choice question layer: owns `A 定/定係 B`;
- scalar/evaluative layer: owns `好`, `好啲`, `多啲`, or lexical preference material;
- outer question force: the full utterance asks which alternative satisfies the evaluative relation.

## Negative boundaries

Do not use this profile for:

- `或者` possibility/listing questions that do not require choosing between alternatives;
- ordinary scalar property clauses with no alternative set;
- explicit surpass comparatives such as `A Adj 過 B`;
- lexical preference questions where `鍾意` or another predicate fully owns the preference relation;
- `邊個` / `邊樣` choice questions unless separately mapped;
- final `好` acceptability or recommendation uses without an overt alternative set;
- broad resurrection of retired comparative wrappers.

## Terminal disposition

- `A 定/定係 B`: supported as an alternative-choice layer.
- `A 定/定係 B 好/好啲`: supported as complete compositional alternative plus evaluation.
- `鍾意 A 定係 B 多啲`: supported as lexical preference plus alternative-choice composition.
- One integrated alternative-scalar identity: no, not from this issue.
- New UUID: no.
- Runtime change: no.
- Status promotion: no.
- Later implementation route: allowed only as a bounded parser/spec package if exact parser inspection shows the compositional layers are not preserved.

A later implementation issue may be ready if it is limited to preserving alternative-choice plus scalar/evaluative layering and includes controls for `或者`, ordinary comparatives, lexical preference predicates, and final `好` recommendation uses.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- CantoDict `定係`: `https://www.cantonese.sheik.co.uk/dictionary/words/820/`
- CantoneseLearning `或者` vs `定係`: `https://www.cantoneselearning.com/lesson/comparison/or-in-cantonese`
- CUHK Cantonese Grammar multimedia, adjectival comparison: `https://www.cuhk.edu.hk/lin/cbrc/CantoneseGrammar/multimedia/09.htm`
- Migaku Cantonese comparatives: `https://migaku.com/blog/chinese/cantonese-comparatives-how-to-make-comparisons`
