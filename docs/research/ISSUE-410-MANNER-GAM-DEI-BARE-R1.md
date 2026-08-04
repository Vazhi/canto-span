# ISSUE-410 咁 / 地 / bare-reduplication manner disposition R1

Parent issue: #410  
Work claim: #537  
Date: 2026-08-04

## Decision

Do not collapse Cantonese manner marking into one broad identity.

The reviewed evidence supports three distinguishable manner routes:

1. **manner/property phrase + `咁` + VP**;
2. **reduplicated adjective or verb + optional/required `地` + VP**, depending on lexical and register context;
3. **bare reduplicated manner expression + VP**, which needs its own evidence and cannot be inferred from written surface equality alone.

AA84 should be retained narrowly until a separate UUID-keyed adjudication decides its identity. The generic written-equality fallback is not linguistic evidence and should not donate status or coverage.

This packet reaches a research/specification disposition only. It changes no runtime behavior.

## Assumption-level research review

### Assumption A — Cantonese has manner adverbial strategies involving `咁`, `地`, and reduplication

Supported.

A grammatical-analysis source for Cantonese samples identifies manner adverbs and includes `gam2` as a manner adverbial route, plus reduplicated adjective/verb material with optional `dei2`. A Routledge preview of a Cantonese grammatical overview similarly notes manner adverbial routes using reduplicated adjective/verb forms with or without `地 dei2`, and adjective + `咁 gam2` + VP.

This supports separating the routes rather than forcing one intersectional identity.

### Assumption B — reduplication is a uniform productive operation across adjectives and verbs

Not supported.

Research on Cantonese reduplication reports category-sensitive differences. The HKBU thesis summary on acceptability of adjective and verb reduplication distinguishes adjective AABB and verb AAB stimuli and varies frequency, formality, and semantic class. Lam’s chapter summary likewise distinguishes nominal, verbal, and adjectival reduplication functions.

Therefore a parser fallback based only on written repetition cannot be treated as grammar evidence. Tone, category, lexical host, frequency, formality, and semantic class all matter.

### Assumption C — AA84 can keep representing only the intersection `reduplicated + 咁 + VP`

Supported only as a conservative interim state.

If AA84 currently encodes a narrow intersection, it should not silently inherit the broader `gam2`, `dei2`, or bare-reduplication evidence. The accepted source map may motivate later split identities or internal representations, but this packet does not allocate them.

### Assumption D — a runtime fallback proves bare reduplication is accepted

Not supported.

Runtime behavior and written surface equality have zero independent linguistic-evidence weight. Bare reduplication may be real, but it needs a bounded corpus/native packet and negative controls before any identity or parser behavior is widened.

## Profile dispositions

### Profile 1 — manner/property phrase + `咁` + VP

Disposition: source-supported route, not implemented or promoted by this packet.

Evidence need for later work:

- distinguish manner `咁 gam2` from degree/demonstrative/filler uses of `咁`;
- include nonreduplicated property phrases;
- identify allowed host classes and particle spelling variants (`咁` / `噉`) where relevant;
- add negative controls for degree-only and discourse-marker uses.

### Profile 2 — reduplicated adjective/verb + `地` + VP

Disposition: source-supported route, not implemented or promoted by this packet.

Evidence need for later work:

- distinguish adjectival and verbal reduplication patterns;
- preserve tone/reading and lexical-class requirements;
- determine when `地` is required, optional, or blocked;
- separate colloquial and formal/written variants.

### Profile 3 — bare reduplicated manner expression + VP

Disposition: plausible but not identity-ready from current evidence.

Evidence need for later work:

- build a bounded corpus/native packet rather than using written-equality fallback;
- classify genuine, false-positive, ambiguous, lexicalized, and register-marked rows;
- test whether the profile is independent, a reduced form of `地`, or a lexicalized adverbial expression;
- add negative controls for repeated words that are not manner adverbials.

## Terminal disposition

- One broad manner identity: no.
- AA84 identity mutation: no, not from this packet.
- New UUIDs: no, not from this packet.
- Runtime change: no.
- Status promotion: no.
- Corpus/native acquisition routes: retained as future work, but not opened as executable implementation because the exact corpus packet design and runtime need still require scoping.

A later ready-to-start issue may be opened for one route at a time, starting with either:

1. a non-runtime evidence packet for `gam2` manner phrases; or
2. a non-runtime evidence packet for `dei2` reduplicated manner adverbials; or
3. a safety repair that quarantines the generic written-equality fallback if exact runtime inspection shows it currently promotes unsupported coverage.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- Wong, Cheung, Lo, and Wan, grammatical analysis of Cantonese samples: `https://www.researchgate.net/publication/365978692_Wong_A_M-Y_Cheung_C_C-H_Lo_J_M-W_Wan_E_K-H_2022_Grammatical_Analysis_of_Cantonese_Samples_in_Understanding_Development_and_Disorders_in_Cantonese_using_Language_Sample_Analysis_published_by_Routledge_`
- Routledge preview of Cantonese grammatical overview: `https://s3-euw1-ap-pe-df-pch-content-store-p.s3.eu-west-1.amazonaws.com/9780367824013/59b11cfb-7fa2-4099-80e6-5667956ad2e0/preview.pdf`
- HKBU thesis summary, acceptability of adjective and verb reduplication in Cantonese: `https://scholars.hkbu.edu.hk/en/studentTheses/the-acceptability-of-adjective-and-verb-reduplication-in-cantones/`
- Lam, reduplication as summation, chapter summary: `https://www.cambridge.org/core/books/countability-in-natural-language/reduplication-as-summation/6465FC945A2EEAFC241AC3FB0C3126C4`
