# CP021B-R37 research checkpoint

Date: 2026-07-19
Parent: CP021B-R36

## Completed

- Populated `EP-R37-I04` for `NominalAndMeasureSpan`.
- Froze 4 external exact positives, 4 visible variants, 4 negative boundaries, and 8 render-review targets.
- Selected and locked 5 prospective held-out cases in separate evaluator custody.
- Stored only salted commitments in the clean project; held-out surfaces and expected signatures are absent.
- Preserved all 1,084 claim-source rows and 87 external sources unchanged.
- Added one internal provenance record.
- Preserved `main.js`, `manifest.json`, parser behavior, lexicon, Jyutping, and fixtures.

## Boundary

R37 is evaluation preparation only. Implementation is **not authorized**. The packet's intended semantic change is `NONE`; any change to learner-visible meaning, token roles, Jyutping, spans, root coverage, or accepted behavior is a stop condition. LX1 remains render-pending and unaccepted.

## Next

Review the packet and obtain explicit authorization before any I04 code change, or continue populating the remaining safe-cleanup packets without implementation.

## Audit

- I04 packet-lock audit: **60/60 PASS**
- Aggregate regression: **545/545 PASS**
- Grammar legitimacy: **1117/1117 PASS**
- `supported_productive`: **0**
