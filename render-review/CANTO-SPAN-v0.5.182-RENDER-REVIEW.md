# Canto Span v0.5.182 Render Review

Accepted baseline: v0.5.180  
Rejected predecessor: v0.5.181  
Candidate: v0.5.182  
Target internal subtype: `ResourceUseLaiFunctionRelation`  
Public compatibility label: `IntendedFunctionRelation`

## Review rules

Inspect every summary row and every corresponding full construction tree. Automated audit success is not semantic acceptance.

For positive rows, verify:

- exactly one internal `ResourceUseLaiFunctionRelation`;
- the public label remains `IntendedFunctionRelation`;
- the overt resource, `用`, `嚟/來`, and the action predicate remain visible;
- no hidden resource, noun, user, object, or purpose is inserted;
- resource subject/topic status remains underdetermined;
- learner roles and Jyutping are accurate.

For boundary rows, verify that the narrow subtype is absent. A broad provisional `IntendedFunctionRelation` may remain only where stated. The v0.5.182 remediation must not widen the positive claim.

## Positive: exact published example

Expected: narrow subtype present. `呢個` remains an overt elliptical demonstrative-classifier NP; no hidden noun is inserted.

```canto-span
呢個用嚟切嘢。
```

## Positive: explicit table resource

Expected: narrow subtype present.

```canto-span
呢張枱用嚟食飯。
```

## Positive: 個 + 杯 noun profile

Expected: narrow subtype present. `呢個杯` is demonstrative + classifier + noun; `杯 bui1` is `what`/head noun, not a measure word.

```canto-span
呢個杯用嚟飲水。
```

## Positive remediation: 隻 + 杯 noun profile

Expected: narrow subtype present. `隻` is the classifier and `杯 bui1` is the noun **cup**.

```canto-span
呢隻杯用嚟飲水。
```

## Positive: pen resource

Expected: narrow subtype present.

```canto-span
呢支筆用嚟寫字。
```

## Positive: written 來 variant

Expected: narrow subtype present. Written `來` remains `loi4`; colloquial `嚟` remains `lai4` elsewhere.

```canto-span
呢張紙用來寫字。
```

## Boundary remediation: overt separate user

Expected: narrow subtype absent. `呢隻杯` remains the resource/topic and `我` remains an overt separate user. A broad provisional relation may remain.

```canto-span
呢隻杯我用嚟飲水。
```

## Boundary: separate overt user with money resource

Expected: narrow subtype absent. A broad provisional relation may remain; do not collapse `我` into the resource.

```canto-span
啲錢我用嚟買晒嗰堆嘢。
```

## Boundary: modal affordance

Expected: narrow subtype absent and the modal remains visible and review-bearing.

```canto-span
呢個可以用嚟切嘢。
```

## Boundary: copular frame

Expected: narrow subtype absent. A broad provisional relation may remain.

```canto-span
呢個係用嚟切嘢。
```

## Boundary: aspect interrupts 用嚟

Expected: narrow subtype absent. `用咗` must not be reinterpreted as adjacent `用嚟`.

```canto-span
呢個用咗嚟切嘢。
```

## Boundary: ordinary instrumental 用

Expected: narrow subtype absent.

```canto-span
我用刀切嘢。
```

## Boundary: general purposive 嚟

Expected: narrow subtype absent.

```canto-span
我買刀嚟切嘢。
```

## Boundary remediation: perfective predicate with 隻 + 杯

Expected: narrow subtype absent. A broad provisional relation may remain review-bearing; `飲咗水` is an actual event, not the conventional function subtype.

```canto-span
呢隻杯用嚟飲咗水。
```

## Boundary: perfective actual-use predicate

Expected: narrow subtype absent. A broad provisional relation may remain review-bearing.

```canto-span
呢個用嚟切咗嘢。
```

## Acceptance sequence

After exporting both diagnostics:

1. inspect all 15 summary rows;
2. inspect all 15 full trees;
3. record render adjudication;
4. freeze exact runtime, diagnostics, packet, lock manifest, and custody hashes;
5. only then open the separate eight-case v0.5.182 evaluator archive once.
