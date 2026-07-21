---
title: "CP022 I1A I01 R1 Focused Render Review"
status: render-review-pending
candidate: v0.5.179-cp022-i1a-i01-neutral-clause-span-consolidation-r1
packet: EP-CP022-I1A-I01-D1
---

# CP022-I1A-I01-R1 focused render review

## Review rule

For every row, confirm:

- every overt Cantonese character and punctuation mark remains present exactly once;
- Jyutping and learner roles remain sensible and unchanged;
- the typed predicate, modal VP, location, topic, or coordinated NP remains visible as its own child;
- the historical public clause label remains learner-compatible;
- the internal name `ClauseSpan` does not leak as learner-facing engineering jargon;
- no subject, topic, argument, modal meaning, predicate subtype, or omitted material is inserted;
- fragments and incomplete predicates do not become complete clauses merely because ClauseSpan exists.

`ClauseSpan` may appear in full diagnostics only as neutral overt-span accounting.

## Required packet cases

### I01-E01 — ordinary subject-predicate

```canto-span
我食飯。
```

Expected: Public `SubjectPredicateClause`; typed `ProductiveVO` child remains intact.

- [ ] PASS
- [ ] Problem: ____________________________________________

### I01-E02 — locative subject-predicate

```canto-span
我喺屋企。
```

Expected: Public `SubjectPredicateClause`; overt subject and `LocativePlacePhrase` both remain visible.

- [ ] PASS
- [ ] Problem: ____________________________________________

### I01-E03 — subject-modal clause

```canto-span
我一定可以去。
```

Expected: Public `SubjectModalPredicateClause`; `ModalVP` and manner material remain intact.

- [ ] PASS
- [ ] Problem: ____________________________________________

### I01-E04 — locative-modal clause

```canto-span
喺屋企可以食飯。
```

Expected: Public `LocativeModalPredicateClause`; location and `ModalVP` remain separate children.

- [ ] PASS
- [ ] Problem: ____________________________________________

### I01-E05 — topic-modal clause

```canto-span
呢本書可以睇。
```

Expected: Public `TopicModalPredicateClause`; overt topic NP and `ModalVP` remain intact.

- [ ] PASS
- [ ] Problem: ____________________________________________

### I01-E06 — coordinated-subject modal clause

```canto-span
我同你可以去。
```

Expected: Public `CoordinatedSubjectModalPredicateClause`; coordinated NP and `ModalVP` remain separate children.

- [ ] PASS
- [ ] Problem: ____________________________________________

### I01-V01 — negative typed predicate

```canto-span
我冇去。
```

Expected: Public `SubjectPredicateClause`; negative motion predicate remains typed and no hidden positive predicate appears.

- [ ] PASS
- [ ] Problem: ____________________________________________

## Boundary probes

### I01-N01 — predicate without overt clause prefix

```canto-span
食飯。
```

Expected: Remains a predicate/VP fragment; no `ClauseSpan` or fabricated subject.

- [ ] PASS
- [ ] Problem: ____________________________________________

### I01-N02 — modal predicate without clause prefix

```canto-span
可以去。
```

Expected: Remains context-required/incomplete according to existing behavior; no complete clause wrapper.

- [ ] PASS
- [ ] Problem: ____________________________________________

### I01-N03 — coordinated NP fragment

```canto-span
我同你。
```

Expected: Remains `CoordinatedNP`; it is not automatically promoted to a clause subject.

- [ ] PASS
- [ ] Problem: ____________________________________________

## Decision

- [ ] **ACCEPT RENDER** — freeze this exact candidate and open only the six I01 evaluator-custody cases.
- [ ] **REJECT RENDER** — record failing rows and revise only within the bounded I01 scope; do not open held-out cases.
