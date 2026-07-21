# CP024-P1-DEMO01 natural-attestation adjudication R1

Status: **PASS — five manually adjudicated natural attestations; standing minimum exceeded**

Target: `OvertHeadDemonstrativeClassifierNP`

## Corpus provenance

The records come from the HKCanCor distribution already preserved in the project evidence tree. HKCanCor consists of transcribed recorded Cantonese conversations/radio material. The preserved PyCantonese 5.0.0 distribution is smaller than the full repository description, so this is not an exhaustive corpus census.

The five rows were discovered inside an earlier lexical retrieval inventory for `畀/俾`. That query was unrelated to demonstrative NPs. Each qualifying D-C-N span was manually re-read with its full utterance, token sequence, local context, recording file, participant record, and source-file hash. The incidental retrieval bias affects frequency inference, not the authenticity of the attested occurrences.

## Qualifying records

| ID | Exact span | File / turn | Participant | Evidence contribution |
|---|---|---|---|---|
| DEMO-N1 | `嗰間公司` | `FC-020_v.cha`, turn 445, 1997-07-13 | XXB, female, age 22 | distal + `間` + organization noun; embedded object/profile |
| DEMO-N2 | `哩份工` | `FC-026_v2.cha`, turn 234, 1997-07-28 | XXJ, female, age 24 | proximal transcription variant + `份` + work noun |
| DEMO-N3 | `嗰位哥哥` | `FC-046_v2.cha`, turn 117 | XXC, female, age 25 | distal + human classifier `位` + person noun; relative-clause environment |
| DEMO-N4 | `哩份工作` | `FC-108c_v2.cha`, turn 348, 1995-12-22 | XXA, female, age 22 | proximal transcription variant + `份` + disyllabic work noun |
| DEMO-N5 | `哩間公司` | `FC-R017_v.cha`, turn 225, 1998-03-07 | XXA, male | proximal transcription variant + `間` + organization noun; clause topic/subject environment |

The exact utterances, contexts, token POS/Jyutping records, participant metadata, source hashes, and limitations are preserved in `CP024-P1-DEMO01-NATURAL-ATTESTATIONS-R1.tsv`.

## Independence adjudication

The standing threshold requires at least three independent natural examples across at least two independent sources or speakers. These five records come from five distinct recording files and participant records, spanning multiple dates and both sexes. They exceed the speaker/recording independence minimum even though they belong to one corpus collection.

No two rows are copied illustrative examples. No parser fixture, generated case, visible packet, render case, held-out case, or parser output is counted.

## Controlled variation established

The natural records vary:

- demonstrative: distal `嗰` and proximal `哩` (the corpus transcription variant corresponding to proximal `呢`);
- classifier: `間`, `份`, and `位`;
- head: organization, work/activity noun, and human noun;
- syntactic environment: embedded object/reference, relative-clause nominal, and clause topic/subject-like use.

This supports productivity of the narrow overt D-C-N schema beyond one memorized phrase. It does **not** license arbitrary demonstrative–classifier–noun combinations, a universal definiteness rule, silent `一`, headless D-C, or one unique syntactic theory.

## Decision

The exact natural-attestation gate is **closed PASS** for the narrow overt-head subtype. Exact source-origin and competing-profile boundaries were already frozen. Remaining preimplementation blocker: **independently sealed prospective held-out custody**.
