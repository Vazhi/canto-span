# DouSyunScalarEvaluation

**State:** `research_pending`; no runtime authorization.  
**Historical input:** retired `EvaluationWithDouSyun`.

## Narrow question

What constructional and discourse constraints license Cantonese `都算 + evaluative predicate` with meanings such as ‘fairly’ or ‘can be considered’?

## Why reopened

The old price-specific fallback lacked direct support, but institutional and lexicographic examples attest broader evaluative uses including `都算唔錯` and `都算唔差`.

## Existing evidence to reverify

- `SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE`
- `SRC-WORDSHK-SYUN3`
- `SRC-POLYU-TAI-O-837295`

## Required boundaries

Test predicate classes, negation, degree/result complements, the focus or concessive contribution of `都`, discourse expectations, and whether nominal price complements form a separate profile.

## Implementation safeguard

Do not restore the old price-only token-cooccurrence fallback. A future matcher must require an independently parsed evaluative predicate and preserve the contribution of `都` and `算`.