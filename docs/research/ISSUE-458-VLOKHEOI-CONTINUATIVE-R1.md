# ISSUE-458 V落去 continuative disposition R1

Parent issue: #458  
Work claim: #545  
Date: 2026-08-04

## Decision

Retain nonmotion postpredicative `V落去` as a source-supported Cantonese continuation research family, but do not allocate an identity or implement runtime behavior from this issue.

The reviewed evidence supports a continuation use of `落去`, including CantoDict's entry for `落去` as “go down; down; carrying on” and its note that `落去` may mean “continue” when suffixed to verbs. Wiktionary also lists a Cantonese `落去` sense “on; to continue; to go on.”

However, `落去` also has literal downward / directional meanings. The nonmotion continuation profile needs a bounded corpus/contrast packet before any runtime or identity work.

## Assumption-level research review

### Assumption A — `落去` can mark continuation after a verb

Supported.

CantoDict explicitly records a continuation use and notes that in this sense `落去` may be suffixed to many verbs. Wiktionary similarly lists a continuation sense for Cantonese `落去`.

### Assumption B — every `V落去` is nonmotion continuation

Not supported.

CantoWords and dictionaries also record literal/directional meanings such as moving from a higher place to a lower place. The issue itself requires classification of literal self-motion, caused motion, motion-compatible ambiguity, potential, `咁落去`, `V住落去`, higher consequence/projection, ambiguous, false-positive, and unusable rows. These are boundary-defining, not secondary.

### Assumption C — a continuation use is already implementation-ready

Not supported.

The current evidence establishes the target but does not close host predicate class, object strategy, telicity, progressive `緊`, maintained `住`, lexical `繼續`, or spatial-versus-temporal context boundaries.

## Supported core

Supported as a research family:

- form: `V落去`;
- marker sequence: verb + `落去`;
- meaning: continuation / going on with an action or state beyond a contextual reference point;
- status: source-supported, not implementation-ready.

## Boundaries not closed

Before identity/runtime work, a corpus/contrast packet must distinguish:

1. nonmotion continuation;
2. motion-compatible ambiguity;
3. literal self-motion;
4. caused motion;
5. `咁落去` consequence/projection uses;
6. `V住落去` maintained continuation;
7. potential or ability readings;
8. objectless adjacency and split-object controls;
9. telicity and progressive/aspect interaction;
10. lexical `繼續` paraphrase cases.

## Terminal disposition

- Nonmotion continuative `V落去`: source-supported research family.
- New UUID: no, not from this issue.
- Runtime change: no.
- Status promotion: no.
- Current terminal state: evidence blocker / no runtime action.
- Later work: a non-runtime corpus/contrast packet should classify actual `V落去` rows before any runtime or identity claim.

## Future work retained

Do not open a runtime issue yet. A later ready issue should be a corpus/contrast packet preserving physical mover, moved theme, path, location, endpoint, deixis, host predicate class, object strategy, and discourse context for each row.

Only after that packet should a runtime or identity issue be opened.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- CantoDict `落去`: `https://www.cantonese.sheik.co.uk/dictionary/words/4386/`
- Wiktionary `落去`: `https://en.wiktionary.org/wiki/落去`
- CantoWords `落去`: `https://words.hk/zidin/落去`
- EdUHK `V落` start/continuation paper: `https://repository.eduhk.hk/en/publications/從粵語始成態-v-落-看粵普對應及語言教學-5/`
