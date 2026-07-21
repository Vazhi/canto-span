# Native corpus: Guangxi family travel conversation

- Corpus ID: `WECHAT-GX-TRAVEL-002`
- Added to project state: v0.5.181 render-pending snapshot
- Source: user-supplied native family conversation transcribed by speech-to-text
- Speakers: A, B, C, D, plus one embedded WeChat message
- Proper-name instruction: `吳嘉敏` is the user's wife's name and is preserved exactly
- Evidence role: natural attestation and parser evaluation only; not independent proof of productive grammar
- Grammar acceptance effect: none

## Files

- `test-data/natural-corpus-wechat-guangxi-travel-002-raw.txt`: untouched user-supplied STT
- `test-data/natural-corpus-wechat-guangxi-travel-002-turns.json/.tsv`: conservative normalized turns with confidence and unresolved-span notes
- `test-data/natural-corpus-wechat-guangxi-travel-002-units.json/.tsv`: 52 stable parser-facing discourse units

## Normalization policy

1. Converted Simplified forms to Traditional Cantonese orthography.
2. Corrected only high-confidence STT duplication, punctuation, classifiers, and locally recoverable word order.
3. Preserved genuine repetition, false starts, particles, profanity, Mandarin-influenced `開車`, fragments, and omitted arguments.
4. Did not invent content for three unstable areas:
   - the vehicle-count sequence in C's first long turn;
   - the place name tentatively compatible with `賀州`;
   - the words immediately following `吳嘉敏`.
5. Unresolved spans are present in the turn record but excluded from parser-facing units.
6. The interpretation `我姨甥都喺嗰邊囉` is a context-based STT repair from `我姨甥都好靚囉`; it is explicitly documented rather than treated as audio-verified.

## Corpus value

The stable units provide natural evidence and evaluation questions for:

- conversational motion, goals, deictic direction, arrival, route, and distance;
- approximate quantities and durations;
- subject/object omission and discourse linkage;
- `咗` with duration and motion predicates;
- objectless `食完` in temporal sequencing;
- `早知…咪…` regret/counterfactual structure;
- prohibitives with `千祈唔好`;
- `同` as coordination, comparison, or accompaniment;
- particles and clusters including `啫`, `咋`, `㗎喇`, `㗎啦`, and `㗎咋`;
- natural repetition and self-repair.

## Restrictions

This corpus must not be used by itself to:

- promote a construction to `supported_productive`;
- resolve the existing native conflict over `V完咗O`;
- infer exact dialect boundaries;
- validate a parser analysis merely because a surface is naturally attested.
