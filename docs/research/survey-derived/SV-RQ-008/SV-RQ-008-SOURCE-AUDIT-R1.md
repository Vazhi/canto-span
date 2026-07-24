---
research_id: SV-RQ-008
document: source_audit_r1
status: checkpoint_complete
created: 2026-07-24
runtime_change_authorized: false
merge_safety: new_file_only
---

# SV-RQ-008 source audit R1

## Checkpoint result

The first source audit resolves only the existence and structural-order question.

### Supported

- Cantonese completive `完` can occur below outer perfective `咗`.
- The surface order `V-完-咗-O` is explicitly attested in scholarly work.
- At least two independent scholarly publications provide an overt-object `食完咗…` example.
- The sequence must not be rejected categorically.

### Unresolved

- which verbs license the sequence;
- whether object quantization or affectedness matters;
- whether elapsed-time or current-result contexts improve it;
- whether final `喇` competes with or complements outer `咗`;
- differences among Hong Kong, Guangzhou, Macau, and other Yue varieties;
- whether the pattern is ordinary aspectual composition or has construction-specific restrictions.

## Source grading

| Source | Grade | Scope | Contribution |
|---|---|---|---|
| Yip 2025, *Inner Aspect in Cantonese* | `DIRECT_SCHOLARLY_CORE` | direct | analyzes `完` as completive inner aspect, states inner aspect can precede `咗`, and gives `食完咗飯好耐嘍` |
| Sybesma 2013, *Cantonese sin and the Question of Microvariation and Macrovariation* | `DIRECT_SCHOLARLY_CORE` | partial direct | states that verbal particles such as `完` precede `咗` and gives `佢食完咗啲飯` |
| Fan & Chan 2022, *香港粵語「咗」的語法特點* | `DIRECT_SCHOLARLY_CORE` | supporting | analyzes Hong Kong Cantonese `咗` placement and distinguishes verbal perfective from sentence-final aspectual material |
| Kwok, Chin & Tsou 2016, *Grammatical diversity across the Yue dialects* | `DIRECT_SCHOLARLY_CORE` | regional-methodological | field data show Yue dialects differ in perfective markers and their VP position; blocks Yue-wide generalization from Hong Kong data |
| Cheung 2007, *香港粵語語法的研究* | `REFERENCE_GRAMMAR_CORE` | pending direct inspection | Yip cites page 149 for `食完咗飯好耐嘍`; direct page inspection remains required |

## Evidence triangulation

### Structural evidence

Yip's ordering is:

```text
verbal root < resultative complement < inner aspect < outer aspect < 晒
```

On that analysis, `食-完-咗-飯` is the expected ordering of:

- lexical verb;
- completive inner aspect;
- perfective outer aspect;
- object.

Sybesma independently places `完` before `咗` and supplies the same general surface profile.

### Survey evidence

The pilot does not challenge structural possibility. Instead, it shows strong lexical or speaker-conditioned variation:

- `睇完咗` and `寫完咗` were mostly accepted;
- `食完咗` and `搬完咗` were mostly rejected in their sampled frames.

Because item assignment was unequal and each item sample was small, the lexical ordering is not yet stable evidence.

### Regional evidence

Kwok, Chin and Tsou show that perfective markers and their VP position vary across Yue dialects. This does not directly analyze `V完咗O`, but it makes regional stratification mandatory. The current survey's Hong Kong weighting cannot answer a Guangzhou-, Macau-, or Yue-wide question.

## Refined research model

Treat the problem as four separate gates.

### Gate 1 — Structural availability

**Current result:** pass.

At least some Hong Kong Cantonese grammars and scholarly analyses license and attest `V完咗O`.

### Gate 2 — Lexical and event-structure distribution

**Current result:** unresolved.

Test verb class, culmination type, incremental theme, affectedness, and conventional task boundaries.

### Gate 3 — Discourse distribution

**Current result:** unresolved.

Test current-result, elapsed-time, narrative-sequencing, and contrastive-completion contexts. The attested `好耐嘍` example makes elapsed-time context a priority.

### Gate 4 — Regional and speaker distribution

**Current result:** unresolved.

Collect sufficiently balanced Hong Kong, Guangzhou, and Macau judgments before any regional claim.

## Implementation consequence

None.

The correct research-only label is:

```text
source-linked provisional composition
```

Do not:

- create a dedicated parser construction;
- broaden `AA26`;
- promote `AB30`;
- encode a verb whitelist from four survey items;
- treat majority rejection as a categorical ban;
- treat scholarly attestation as unrestricted productivity.

## Next checkpoint

The next checkpoint requires one of:

1. direct inspection of Cheung 2007:149 and neighboring discussion;
2. a provenance-preserving corpus packet with genuine `V完咗O` occurrences;
3. a blinded four-form follow-up instrument with balanced lexical classes and regional recruitment.
