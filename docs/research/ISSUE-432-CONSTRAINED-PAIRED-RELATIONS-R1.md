# ISSUE-432 constrained paired-clause relation disposition R1

Parent issue: #432  
Work claim: #555  
Date: 2026-08-04

## Decision

Do not implement PRQ2-009, PRQ2-034, or PRQ2-035 from this issue, and do not treat the current PRQ2-015 runtime/test provenance assignment as acceptable.

Retain all three families as constrained research targets and record a terminal no-runtime disposition:

1. PRQ2-009 `既然 A，B` premise-response;
2. PRQ2-034 `無論 A，B 都 C` unconditional / invariant-consequence frame;
3. PRQ2-035 `寧願 A，都 B / 都要 B` committed preference;
4. PRQ2-035 provenance repair: required, but only through a later runtime-integrity subpackage that changes metadata without changing linguistic behavior.

## Assumption-level research review

### Assumption A — `既然` supports a premise-response relation

Supported as a source-triggered family.

粵典 records `既然` as introducing an objective description of a situation followed by an opinion, advice, or question related to that situation. It gives a Cantonese example `既然你都去圖書館，不如順便幫我還書啦。` This supports a premise-response family and the narrower `既然 A，不如 B` advisory core.

It does not support every currently accepted runtime response marker. Those must be audited one by one.

### Assumption B — `無論 ... 都 ...` supports an unconditional / invariant-consequence frame

Supported as a source-triggered family.

粵典 records `無論` as “no matter what / no matter how,” with the example `無論點，我都唔會放棄。` CantoDict also records `無論` as “regardless of; no matter.” General Chinese grammar sources describe `無論/不管 + open variable + 都` as ranging over possible cases with an invariant result.

This supports the family but not all Cantonese-specific domain, scope, wh, degree, A-not-A, and explicit-alternative boundaries.

### Assumption C — PRQ2-035 committed preference is ready for runtime

Not supported.

The issue itself says rejection and `都要` commitment profiles are attested but source grading and complement/distribution boundaries remain incomplete. It also identifies an implementation-metadata defect involving PRQ2-015. Those are blockers, not implementation details.

### Assumption D — the PRQ2-015 provenance defect can be ignored

Not supported.

PRQ2-015 is distributive quantification, not committed preference. Any current source/test/generated-bundle reference assigning committed-preference behavior to PRQ2-015 is metadata debt. However, a repair must be scoped as runtime integrity / provenance correction and must avoid silently changing linguistic behavior.

## Family dispositions

### PRQ2-009 — `既然 A，B`

Disposition: retained as source-supported research family, not implementation-ready.

Required future work:

- audit current runtime marker inventory;
- separate directly supported causal/advisory `既然 A，不如 B` from broader response-marker cases;
- classify opinion, advice, question, suggestion, and consequence continuations;
- add negative controls against generic conditionals and topic-shift discourse markers.

### PRQ2-034 — `無論 A，B 都 C`

Disposition: retained as source-supported research family, not implementation-ready.

Required future work:

- wh/open-variable domains;
- degree domains;
- A-not-A domains;
- explicit alternative domains;
- `都` scope;
- boundaries against free-choice, concession, and ordinary universal quantification.

### PRQ2-035 — `寧願 A，都 B / 都要 B`

Disposition: retained as research family, not implementation-ready.

Required future work:

- source grading;
- rejection versus commitment profiles;
- `都` versus `都要` scope;
- complement type;
- subject and polarity boundaries;
- register and lexical preference alternatives such as `情願`, `寧肯`, and `寧可`.

### PRQ2-015 provenance boundary

Disposition: defect confirmed as metadata/provenance debt, not a linguistic decision.

Required future work:

- exact inventory of current source/test/generated-bundle references to PRQ2-015;
- classify which references are committed preference and should be PRQ2-035;
- classify which references are genuinely distributive quantification and must remain PRQ2-015;
- implement only in a separately reviewed runtime-integrity subpackage.

## Terminal disposition

- PRQ2-009: retained, evidence-blocked.
- PRQ2-034: retained, evidence-blocked.
- PRQ2-035: retained, evidence-blocked.
- PRQ2-015 metadata defect: confirmed and routed to later runtime-integrity repair.
- New identity: no.
- Runtime behavior change: no.
- Status promotion: no.
- Source mutation: no.

## Future work retained

Do not open runtime behavior issues for PRQ2-009, PRQ2-034, or PRQ2-035 yet.

A ready future issue may be opened for the PRQ2-015/PRQ2-035 provenance repair only if it is constrained to metadata/test/source labels and proves it does not alter parser behavior. That issue should be separate from linguistic identity adjudication.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, identity allocation, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- 粵典 `既然`: `https://words.hk/zidin/%E6%97%A2%E7%84%B6`
- 粵典 `不如`: `https://words.hk/zidin/%E4%B8%8D%E5%A6%82`
- CantoDict `不如`: `https://www.cantonese.sheik.co.uk/dictionary/words/2081/`
- 粵典 `無論`: `https://words.hk/zidin/%E7%84%A1%E8%AB%96`
- CantoDict `無論`: `https://www.cantonese.sheik.co.uk/dictionary/words/3059/`
- Chinese grammar background for `無論/不管...都`: `https://elon.io/grammar/chinese-mandarin/conjunctions/wulun-dou`
