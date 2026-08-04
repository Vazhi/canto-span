# ISSUE-459 V起嚟 / V起上嚟 onset and manifestation disposition R1

Parent issue: #459  
Work claim: #547  
Date: 2026-08-04

## Decision

Retain `V起嚟` / `V起上嚟` as source-supported Cantonese onset / inchoative research profiles, but do not allocate an identity or implement runtime behavior from this issue.

The reviewed evidence supports `起上嚟` as an inchoative aspect marker emphasizing the beginning of an activity, and supports `起嚟` as a related form with upward / beginning-to semantics. However, the issue also asks about manifestation, discontinuous object placement, short-vs-long variants, literal motion, and caused upward motion. Those boundaries are not closed enough for implementation.

## Assumption-level research review

### Assumption A — `起上嚟` can mark inchoative aspect in Cantonese

Supported.

Cantonese aspect overviews list inchoative `hei2-soeng5-lai4 起上嚟` with the function “to emphasise the beginning of an activity,” including the example `個 BB 突然之間喊起上嚟` / the baby suddenly began crying. A dedicated paper titled “The formation of the inchoative aspect marker heisoenglai in Cantonese” also treats `起上嚟` as an inchoative aspect marker.

### Assumption B — `起嚟` and `起上嚟` are automatically the same identity

Not supported.

CantoDict records `起嚟` with meanings including “upward; beginning to” and gives `起上嚟` as a variant, but the issue itself distinguishes short and long variants, onset versus manifestation, and discontinuous orders. A future packet must decide whether these are one identity, related profiles, or separate components.

### Assumption C — onset, manifestation, literal rising, and caused upward motion can share one runtime identity

Not supported.

The issue requires classification of unsplit dynamic onset, state/property manifestation, generic-when reading, split transitive onset, split verb-object compounds, literal self-motion, caused upward motion, appearance/evaluation, discourse-topic use, competing object orders, ambiguous, false-positive, and unusable rows. These are boundary-defining categories.

### Assumption D — source-backed examples authorize parser behavior now

No.

Runtime output and source attestation can trigger research, but identity and parser behavior require a bounded corpus/contrast packet and negative boundaries. This issue stops before runtime implementation.

## Supported core

Supported as research profiles:

- form: `V起上嚟`;
- function: inchoative / onset, especially beginning of an activity;
- related form: `V起嚟`, with upward / beginning-to semantics;
- status: source-supported, not implementation-ready.

## Boundaries not closed

Before identity/runtime work, the next packet must distinguish:

1. short `起嚟` versus long `起上嚟`;
2. dynamic onset versus state/property manifestation;
3. unsplit `V起嚟` versus split `V起O嚟` / `V起O上嚟`;
4. verb-object compounds versus productive object placement;
5. literal self-motion upward;
6. caused upward motion;
7. appearance/evaluation readings;
8. discourse-topic or quoted uses;
9. matrix versus subordinate environments;
10. competing object orders and false positives.

## Terminal disposition

- `V起上嚟` inchoative/onset: source-supported research profile.
- `V起嚟` upward/beginning-to profile: source-supported but not yet identity-resolved against `起上嚟`.
- manifestation and discontinuous profiles: retained as research targets, not accepted as implementation-ready.
- New UUID: no, not from this issue.
- Runtime change: no.
- Status promotion: no.
- Current terminal state: evidence blocker / no runtime action.
- Later work: a non-runtime corpus/contrast packet should classify actual `V起嚟` / `V起上嚟` rows before any identity or runtime claim.

## Future work retained

Do not open a runtime issue yet. A later ready issue should be a corpus/contrast packet preserving:

- every token between `起` and `嚟` / `上嚟`;
- host predicate;
- object or verb-object nominal;
- clause environment;
- trigger, mover/theme, path, deixis, and discourse function;
- literal and caused-motion competitors;
- onset and manifestation readings;
- ambiguous and unusable rows.

Only after that packet should a runtime or identity issue be opened.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- ResearchGate, “The formation of the inchoative aspect marker heisoenglai in Cantonese”: `https://www.researchgate.net/publication/276466589_The_formation_of_the_inchoative_aspect_marker_heisoenglai_in_Cantonese`
- CantoDict `起嚟`: `https://www.cantonese.sheik.co.uk/dictionary/words/41547/`
- Cantonese grammar verbal aspect overview: `https://www.liquisearch.com/cantonese_grammar/verbal_aspect`
- Verbal morphological category of aspect in Cantonese: `https://czasopisma.pan.pl/Content/127937/PDF/2023-01-LINS-03.pdf`
- Bulletin of Chinese Linguistics PDF, 粵語開始體 “起上嚟” 的產生: `https://ccl.hkust.edu.hk/files/publication/%E4%B8%AD%E5%9C%8B%E8%AA%9E%E8%A8%80%E5%AD%B8%E9%9B%86%E5%88%8A/Volume%202_No.2%20%282008%29.pdf`
