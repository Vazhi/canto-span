# ISSUE-457 V開 habitual / established-activity disposition R1

Parent issue: #457  
Work claim: #543  
Date: 2026-08-04

## Decision

Retain postverbal `V開` as a source-supported Cantonese habitual / established-activity research family, but do not allocate an identity or implement runtime behavior from this issue.

The evidence supports a real profile in which postverbal `開 hoi1` marks a habit, customary activity, or established association continuing up to the present or over a relevant period. The evidence does not yet close the host-class, object, aspect-stacking, polarity, and lexical-`開` boundaries required for implementation.

## Assumption-level research review

### Assumption A — postverbal `開` can mark habit or established activity

Supported.

CantoWords describes `開` as a postverbal aspect marker expressing a habit that has continued for a period of time until the present, with an example involving someone accustomed to using a computer for typing. CantoneseLearning likewise describes habitual `開 hoi1` as expressing a habit that has continued up to the present and contrasts it with related habitual markers such as `親`.

### Assumption B — all `V開` occurrences belong to the same habitual identity

Not supported.

`開` also has ordinary lexical and directional/resultative meanings. The issue’s own required work lists modifier-internal, question, already-underway continuative, discourse-topic, lexical, resultative, directional, ambiguous, false-positive, and unusable rows. These categories are not optional cleanup; they define the identity boundary.

### Assumption C — a runtime gap can promote `V開`

No.

Runtime output is only a trigger. It cannot promote a profile, allocate a UUID, or define the admissible host classes.

## Supported core

Supported as a research family:

- form: `V開`;
- marker: postverbal `開 hoi1`;
- meaning: habitual / established activity / accustomed association;
- status: source-supported, not implementation-ready.

## Boundaries not closed

Before identity or runtime work, the next packet must distinguish:

1. current habit versus former habit;
2. `V開` versus frequency adverbs;
3. `V開` versus experiential `V過`;
4. `V開` versus progressive `V緊`;
5. same-sentence lexical `開`;
6. polarity and question forms;
7. aspect stacking;
8. object/complement placement;
9. lexical host restrictions.

## Terminal disposition

- Habitual / established `V開`: source-supported research family.
- New UUID: no, not from this issue.
- Runtime change: no.
- Status promotion: no.
- Current terminal state: evidence blocker / no runtime action.
- Later work: a non-runtime corpus/contrast packet should classify actual `V開` rows before any runtime or identity claim.

## Future work retained

Do not open a runtime issue yet. A later ready issue should be a corpus/contrast packet that classifies:

- habitual/established uses;
- lexical `開` false positives;
- resultative/directional uses;
- modifier-internal uses;
- already-underway continuative uses;
- polarity and question examples;
- ambiguous and unusable rows.

Only after that packet should a runtime or identity issue be opened.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- CantoWords `開`: `https://cantowords.com/dictionary/開`
- CantoneseLearning habitual `開`: `https://www.cantoneselearning.com/lesson/grammar/cantonese-verb-habitual-marker-hoi1`
- CantoneseLearning habitual `親`, contrast with `開`: `https://www.cantoneselearning.com/lesson/grammar/cantonese-verb-habitual-marker-can1`
- CantoneseLearning verb aspects overview: `https://www.cantoneselearning.com/lesson/grammar/cantonese-verb-aspect`
