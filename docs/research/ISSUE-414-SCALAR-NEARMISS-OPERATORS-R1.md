# ISSUE-414 scalar progression and near-miss operator disposition R1

Parent issue: #414  
Work claim: #541  
Date: 2026-08-04

## Decision

Keep scalar progression and near-miss operators as two separate research families. Do not merge them into one operator construction and do not implement either from this issue.

The reviewed evidence supports:

1. **scalar progression**: `越…越…` paired scalar correlatives and `越嚟越…` / `越來越…` monoclausal progression;
2. **near-miss approximatives**: Cantonese `差啲` / `爭啲`, often with `就`, marking an event that almost happened or an outcome that was narrowly missed.

Both are source-supported enough to retain as real target families, but neither has enough boundary closure here for identity allocation, runtime implementation, or status promotion.

## Assumption-level research review

### Assumption A — `越…越…` and `越嚟越…` are scalar-progression profiles

Supported as a source-backed family.

Cantonese dictionaries list `越嚟越` as Cantonese “getting more and more,” and `越來越` as “becoming more and more.” General Chinese grammar sources describe `越…越…` as a correlative pattern in which one scale changes with another. These sources support the scalar-progression target, but they do not by themselves settle Cantonese-specific span, polarity, host, or runtime boundaries.

### Assumption B — `差啲` / `爭啲` are Cantonese near-miss approximatives

Supported.

CantoWords records `爭啲 / 差啲` with examples such as `爭啲就攞到冠軍喇`, indicating a narrowly missed outcome. CantoDict records `差啲` as Cantonese “almost, just about to” and lists `差點` as the Mandarin/SWC counterpart rather than the Cantonese form. These support a Cantonese near-miss family.

### Assumption C — scalar progression and near-miss should be one constructional family

Not supported.

The two families share broad scalar/event intuition, but their syntax and semantics are different:

- scalar progression relates one or two scales over time, degree, or dependency;
- near-miss relates an event to a narrowly avoided or narrowly missed occurrence.

A single identity would hide these differences and risk false positives.

### Assumption D — current runtime gaps can promote the profiles

No.

Runtime failure to preserve these operators is a trigger only. It does not prove identity, scope, polarity, or collision boundaries.

## Family 1 — scalar progression

Supported routes:

- paired `越 A 越 B` scalar correlative;
- monoclausal `越嚟越 X` / `越來越 X` progression.

Open boundaries before identity/runtime work:

- two-scale versus one-scale identity;
- negative second-scale profiles;
- progressive scalar hosts;
- whether `越嚟越` is lexicalized, compositional, or a separate profile;
- object/topic placement and long-clause boundaries;
- false positives involving lexical `越過`, ordinary degree, generic comparison, and similarity.

## Family 2 — near-miss approximative

Supported routes:

- `差啲 + event`;
- `爭啲 + event`;
- `差啲/爭啲 + 就 + event`;
- narrowly missed positive outcome or narrowly avoided negative outcome.

Open boundaries before identity/runtime work:

- whether `就` is optional, emphatic, or structurally required in some profiles;
- positive near-miss versus negative avoided-event interpretations;
- interaction with negation and aspect;
- host-event category;
- lexical variants and register;
- false positives involving `差唔多`, approximate quantity, or non-event comparison.

## Terminal disposition

- Scalar progression: source-supported research family, not implementation-ready.
- Near-miss approximative: source-supported research family, not implementation-ready.
- One combined identity: no.
- New UUIDs: no, not from this issue.
- Runtime change: no.
- Status promotion: no.
- Later work: two separate non-runtime evidence packets or two separate runtime specs only after the evidence packets close their boundaries.

## Future work retained

Do not open runtime issues yet. The next ready work, if pursued, should be one of:

1. a non-runtime scalar-progression corpus/contrast packet for `越…越…` and `越嚟越…`; or
2. a non-runtime near-miss corpus/contrast packet for `差啲/爭啲 (+ 就) + event`.

Each packet should classify genuine, false-positive, ambiguous, lexicalized, and unusable rows before any implementation claim.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- CantoDict `越嚟越`: `https://www.cantonese.sheik.co.uk/dictionary/words/5247/`
- CantoDict `越來越`: `https://www.cantonese.sheik.co.uk/dictionary/words/5246/`
- CantoWords `爭啲 / 差啲`: `https://cantowords.com/dictionary/爭啲`
- CantoDict `差啲`: `https://www.cantonese.sheik.co.uk/dictionary/words/7725/`
- CantoDict `差點` Mandarin/SWC contrast: `https://www.cantonese.sheik.co.uk/dictionary/words/20545/`
