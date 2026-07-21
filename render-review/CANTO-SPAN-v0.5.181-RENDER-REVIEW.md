# Canto Span v0.5.181 Render Review

Accepted baseline: v0.5.180  
Candidate: v0.5.181  
Target internal subtype: `ResourceUseLaiFunctionRelation`  
Public compatibility label: `IntendedFunctionRelation`

## Review rules

Inspect every row in the acceptance summary and every corresponding full construction tree. The candidate is not accepted merely because automated audits pass.

For positive rows, verify:

- exactly one internal `ResourceUseLaiFunctionRelation`;
- public label remains `IntendedFunctionRelation`;
- the overt resource, `用`, `嚟/來`, and function predicate remain visible;
- no hidden noun, resource, user, object, or purpose is inserted;
- resource subject/topic status remains underdetermined;
- Jyutping and learner roles are accurate.

For boundary rows, verify that the narrow subtype is absent. A broad provisional `IntendedFunctionRelation` may remain only where noted. Lexicon improvements for `切` and `刀` are allowed but must not create the narrow subtype.

## Positive: exact published example

Expected: narrow subtype present. `呢個` remains an overt elliptical demonstrative-classifier NP; no hidden noun is inserted.

```canto-span
呢個用嚟切嘢。
```

## Positive: explicit table resource

Expected: narrow subtype present; `呢張枱` is the overt resource and `食飯` is the intended function.

```canto-span
呢張枱用嚟食飯。
```

## Positive: cup resource

Expected: narrow subtype present. `呢個杯` must be a complete demonstrative-classifier noun phrase, and `杯 bui1` must be the noun **cup** (`what`/head noun), not the cupful classifier.

```canto-span
呢個杯用嚟飲水。
```

## Positive: pen resource

Expected: narrow subtype present.

```canto-span
呢支筆用嚟寫字。
```

## Positive: written 來 variant

Expected: narrow subtype present with the `用來` orthographic variant. Written `來` must remain `loi4`; it must not inherit colloquial `嚟 lai4` merely because both forms participate in the relation.

```canto-span
呢張紙用來寫字。
```

## Boundary: separate overt user and actual-use profile

Expected: narrow subtype absent. A broader provisional relation may remain; do not collapse the overt user into the resource.

```canto-span
啲錢我用嚟買晒嗰堆嘢。
```

## Boundary: modal affordance

Expected: narrow subtype absent. The modal must remain visible and review-bearing under the broader analysis.

```canto-span
呢個可以用嚟切嘢。
```

## Boundary: copular frame

Expected: narrow subtype absent. A broad provisional relation may remain, but the copula cannot be absorbed into the promoted subtype.

```canto-span
呢個係用嚟切嘢。
```

## Boundary: aspect interrupts 用嚟

Expected: narrow subtype absent. `用咗` must not be reinterpreted as adjacent `用嚟`.

```canto-span
呢個用咗嚟切嘢。
```

## Boundary: ordinary instrumental 用

Expected: narrow subtype absent. `用刀` is ordinary instrumental use, not a resource-function statement.

```canto-span
我用刀切嘢。
```

## Boundary: general purposive 嚟

Expected: narrow subtype absent. `買刀嚟切嘢` is a purposive chain without adjacent `用嚟`.

```canto-span
我買刀嚟切嘢。
```

## Boundary: perfective actual-use predicate

Expected: narrow subtype absent. A broad provisional relation may remain review-bearing; `切咗嘢` must not be promoted as a conventional intended function.

```canto-span
呢個用嚟切咗嘢。
```

## Acceptance sequence

After exporting both diagnostics:

1. inspect all 12 summary rows;
2. inspect all 12 full trees;
3. record render adjudication;
4. freeze exact runtime, diagnostics, packet, and custody hashes;
5. only then open the sealed seven-case evaluator archive once.
