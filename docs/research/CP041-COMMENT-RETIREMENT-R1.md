# CP041 Comment retirement

Date: 2026-07-22

Checkpoint: `v0.5.197-shadowed-wrapper-retirement`

## Decision

`Comment` is retired from the active runtime registry and current construction-note collection.

## Checks

- prior runtime constructor: one late `wrapCore` child-wrapper path
- accepted fixtures: 0
- standardized cases: 0
- verified complete-parser outputs: 0
- unique serialized-diagnostic dependency: none
- independent linguistic claim: none; the label was an internal container

## Reason

The standalone node only rewrapped the predicate material inside a potential `TopicComment` analysis. It never survived complete parser output and duplicated the `comment` and `comment_predicate` role metadata already carried by `TopicComment`. The fallback now places typed predicate material directly under `TopicComment` and records the comment relation in parent slots.

This does not claim that Cantonese lacks topic-comment structure. It removes only a redundant internal wrapper.

## Preservation

The original note and migration provenance are preserved at:

`archive/retired-labels/v0.5.197-shadowed-wrapper-retirement/Comment.md`
