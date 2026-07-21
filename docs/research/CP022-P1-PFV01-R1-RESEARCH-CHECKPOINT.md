# CP022-P1-PFV01-R1 research and implementation checkpoint

Status: **render-pending; not accepted**  
Runtime candidate: `v0.5.180-cp022-p1-pfv01-postverbal-zo-overt-object-promotion-r1`  
Accepted parent: `v0.5.179-cp022-i1a-i01-neutral-clause-span-consolidation-r1`  
Packet: `EP-CP022-P1-PFV01-D1`

## Purpose

This is the first bounded productive-grammar promotion pilot. It isolates the externally supported simple postverbal perfective profile as internal `PostverbalZoPerfectiveVP`, while retaining public compatibility label `PerfectiveVP`.

The candidate is limited to an overt action predicate followed by overt `咗` and an overt nominal object. It does not promote broad `PerfectiveVP`, objectless `V-咗`, result/completion `V完咗O`, motion-goal, placement, experiential `過`, progressive `緊`, hidden arguments, or selectionally incompatible predicate-object combinations.

## Evidence and provenance

Four explicit claim-source edges are recorded: two positively support the simple profile and two are boundary-only records for the native-conflicted V完咗O family. The active source accounting remains complete:

- active labels: 178;
- language or lexical labels: 158;
- externally mapped language labels: 157;
- explicit source-gap quarantines: 1 (`ScalarRangeFragment`);
- unaccounted active labels: 0.

This source mapping does not itself establish productive acceptance. Rendered semantics, prospective held-out performance, negative boundaries, regression preservation, and the one-count narrow promotion decision remain required.

## Implementation boundary

- new internal subtype: `PostverbalZoPerfectiveVP`;
- public compatibility alias: `PerfectiveVP`;
- broad `PerfectiveVP`: still provisional;
- candidate subtype: still provisional;
- `supported_productive`: 0;
- held-out cases: 7, selected and hashed before implementation, still sealed.

## Headless validation

- packet lock: 22/22 PASS;
- visible packet: 63/63 PASS;
- current focused gate: 12/12 PASS;
- implementation audit: 28/28 PASS;
- I02 preservation: 24/24 PASS;
- unaffected inherited regression: 529/529 PASS;
- 16 affected inherited cases are isolated in the focused packet and must be reabsorbed before acceptance;
- grammar legitimacy: 1093/1093 PASS;
- semantic acceptance: 15/15 PASS;
- pre-intermediate corpus: 80/80 PASS;
- lexicon topology outside candidate scope: 529/529 PASS;
- review-only readiness: 1242/1242 PASS;
- source accounting and claim provenance: PASS;
- documentation consistency: PASS, 0 broken links.
- native-conflict burden: 13/13 PASS

## Remaining acceptance sequence

1. Render and inspect all 12 focused rows and their full diagnostics.
2. If render passes, freeze the exact runtime, project, diagnostic, and custody hashes.
3. Open the seven-case custody archive once.
4. Reabsorb the 16 focused exclusions into the 545-case aggregate suite.
5. Promote only `PostverbalZoPerfectiveVP` from provisional to `supported_productive` if every gate passes.
6. Keep broad `PerfectiveVP` provisional regardless of the narrow result.

No evaluator custody data may enter the runtime or ordinary recovery archive.

## Native-conflict burden

The adjacent `V完咗O` family is published-attested but directly rejected in two recorded Guangzhou-native judgments. It is included only as an exclusion boundary. No dialect or register explanation is assumed, and it contributes zero positive-support sources to PFV01. Any future promotion of that family requires controlled contrasts, independent variation research, multi-speaker sampling, and a new prospective held-out packet.
