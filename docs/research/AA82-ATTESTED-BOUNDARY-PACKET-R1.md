# AA82 attested boundary packet R1

Date: 2026-07-31  
Construction: `AA82` / `BinDouWhPlaceQuestion`  
Runtime label: `LocativeWhQuestion`

## Decision

**A bounded runtime implementation is required.** The merged specification remains valid, and the current parser correctly avoids lexical-only wrapping in the selected embedded and rhetorical cases. It also preserves several motion and purpose questions compositionally without AA82. However, the packet contains repeated false negatives for admitted direct matrix location questions, event-location questions, bare fragments, abstract-location questions, and independently bounded question fragments.

## Method

- Selected 28 attested items from preserved Glossika packages and the immutable HKCanCor AA82 candidate inventory.
- Applied the merged `AA82-RUNTIME-SPECIFICATION-R1` contract rather than treating every lexical occurrence of `邊度` as an expected hit.
- Evaluated every exact surface against the post-merge generated runtime with `analyzeLine` and `diagnosticFinalRows`.
- Kept source attestation, expert classification, and runtime output as separate evidence layers.

## Results

- Required-wrapper cases: **14**
- Required-wrapper hits: **4**
- False negatives: **10**
- False positives in selected exclusions and compositional cases: **0**
- `correct_compositional_without_wrapper`: **9**
- `correct_exclusion`: **3**
- `false_negative_wrapper`: **10**
- `justified_wrapper_hit`: **4**
- `unresolved_contextual`: **2**

No selected embedded or rhetorical exclusion was incorrectly wrapped. The material defect is undergeneration, not broad lexical overgeneration.

## False-negative families

1. **Full direct location questions:** `影印機喺邊度？`, `超市喺邊度？`.
2. **Event-location questions:** `喺邊度等你？`, `我哋邊度見？`, `喺邊度搞唧?`.
3. **Independently bounded fragments:** the final question in `得呀!喺邊度見呀?`, and the second question in `邊間呀？你講緊邊度？`.
4. **Bare motion-goal fragment:** `去邊度呀？`.
5. **Abstract or existential location questions:** `Up-doubling同acting嘅分別喺邊度?`, `邊度有十個percent啊?`.

## Correct boundaries preserved

- Embedded `邊度` under `知唔知` or `問` does not trigger AA82.
- Rhetorical denial-like `佢邊度會跑吖` does not trigger AA82.
- Several motion-goal, experiential-motion, perfective-motion, and motion-purpose questions remain compositionally typed without requiring the compatibility wrapper.
- Multi-fragment inputs with a correct hit restrict the wrapper to the locative question fragment.

## Implementation route

Open one T6 runtime issue to derive AA82 from independently licensed matrix interrogative clause or fragment force plus overt exact `邊度`, rather than from the lexical item alone. Cover admitted direct, event-location, bare-fragment, and split-fragment cases while preserving embedded, rhetorical, negative-indefinite, motion/aspect, and multi-fragment boundaries.

The implementation package must not use AA82 to repair independently rejected motion or aspect analyses. It must add attested regression cases for every false-negative family and retain the correct exclusion and compositional cases in this packet.

## No specification revision

The packet does not contradict the accepted AA82 contract. The current failure is a reproducible implementation gap: matrix question force is not consistently connected to the compatibility wrapper outside a narrow set of templates.

## Item table

| Item | Source | Surface | Classification | AA82 |
|---|---|---|---|---|
| `AA82-R1-001` | `GLOSSIKA-YUEHK-A1-DLG-001-20251130-I018` | 去邊度睇呀? | `correct_compositional_without_wrapper` | no |
| `AA82-R1-002` | `GLOSSIKA-YUEHK-A1-DLG-001-20251130-I025` | 得呀!喺邊度見呀? | `false_negative_wrapper` | no |
| `AA82-R1-003` | `GLOSSIKA-YUEHK-A1-DLG-001-20251130-I029` | 唔識呀,喺邊度呀? | `justified_wrapper_hit` | yes |
| `AA82-R1-004` | `GLOSSIKA-YUEHK-A1-DLG-007-20260111-I011` | 太好喇！我哋去邊度？ | `correct_compositional_without_wrapper` | no |
| `AA82-R1-005` | `GLOSSIKA-YUEHK-A1-DLG-007-20260111-I014` | 行街？去邊度行？ | `correct_compositional_without_wrapper` | no |
| `AA82-R1-006` | `GLOSSIKA-YUEHK-A1-DLG-007-20260111-I029` | 喺邊度等你？ | `false_negative_wrapper` | no |
| `AA82-R1-007` | `GLOSSIKA-YUEHK-A1-DLG-009-20260201-I016` | 影印機喺邊度？ | `false_negative_wrapper` | no |
| `AA82-R1-008` | `GLOSSIKA-YUEHK-A1-DLG-010-20260208-I002` | 邊間呀？你講緊邊度？ | `false_negative_wrapper` | no |
| `AA82-R1-009` | `GLOSSIKA-YUEHK-A1-DLG-010-20260208-I004` | 喺邊度㗎？我唔知喎。 | `justified_wrapper_hit` | yes |
| `AA82-R1-010` | `GLOSSIKA-YUEHK-A1-DLG-011-20260215-I001` | 喂，李芳，你知唔知附近邊度有文具舖？ | `correct_exclusion` | no |
| `AA82-R1-011` | `GLOSSIKA-YUEHK-A1-DLG-011-20260215-I005` | 真係？喺邊度呀？ | `justified_wrapper_hit` | yes |
| `AA82-R1-012` | `GLOSSIKA-YUEHK-A1-DLG-012-20260222-I015` | 你平時去邊度游水？ | `correct_compositional_without_wrapper` | no |
| `AA82-R1-013` | `GLOSSIKA-YUEHK-A1-DLG-012-20260222-I031` | 我哋邊度見？ | `false_negative_wrapper` | no |
| `AA82-R1-014` | `GLOSSIKA-YUEHK-A1-DLG-013-20260301-I013` | 去邊度呀？ | `false_negative_wrapper` | no |
| `AA82-R1-015` | `GLOSSIKA-YUEHK-A1-W15-20260628-I050` | 超市喺邊度？ | `false_negative_wrapper` | no |
| `AA82-R1-016` | `GLOSSIKA-YUEHK-A1-W17-20260712-I001` | 講返正題，你尋日去咗邊度呀？ | `justified_wrapper_hit` | yes |
| `AA82-R1-017` | `GLOSSIKA-YUEHK-A1-W18-20260719-I074` | 你聽日去邊度？ | `correct_compositional_without_wrapper` | no |
| `AA82-R1-018` | `aa82-3b9c09b7959df2749c3c` | 我問佢喺邊度做. | `correct_exclusion` | no |
| `AA82-R1-019` | `aa82-6e397d170dcd468a6a5b` | 噉你重去過邊度? | `correct_compositional_without_wrapper` | no |
| `AA82-R1-020` | `aa82-fbbea3cf82ccdc193700` | 邊度有平嘢買,有抵嘢食. | `unresolved_contextual` | no |
| `AA82-R1-021` | `aa82-b23897111121745bb799` | 有,佢邊度會跑吖. | `correct_exclusion` | no |
| `AA82-R1-022` | `aa82-990f7ef8f30a23a07028` | 邊度食得晒唧? | `unresolved_contextual` | no |
| `AA82-R1-023` | `aa82-a2a5790f5225be4dd80e` | 諗住去邊度旅行嚹? | `correct_compositional_without_wrapper` | no |
| `AA82-R1-024` | `aa82-1e87462a7568171acba9` | Up-doubling同acting嘅分別喺邊度? | `false_negative_wrapper` | no |
| `AA82-R1-025` | `aa82-8b8962dd1202da4156cf` | 嗰陣時我哋去咗邊度食啊? | `correct_compositional_without_wrapper` | no |
| `AA82-R1-026` | `aa82-b9bd20c81cf2712eb229` | 你哋去邊度食嘢啊? | `correct_compositional_without_wrapper` | no |
| `AA82-R1-027` | `aa82-2d142dab0d7813b52fd2` | 喺邊度搞唧? | `false_negative_wrapper` | no |
| `AA82-R1-028` | `aa82-b61c4d009ebf7c0939b1` | 邊度有十個percent啊? | `false_negative_wrapper` | no |

The machine-readable packet contains full source paths, HKCanCor anchors and local context, runtime labels, contract expectations, and per-item rationale.
