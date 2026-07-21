# CP021B Native Naturalness Response Ingestion

> **CP021B-EA1 metadata clarification — 2026-07-17:** The reviewer is the user's wife, a native Cantonese speaker from Guangzhou, and the sole native reviewer for this project. `NORMALIZED-RESPONSE-NS01-v2.tsv` supersedes the earlier unconfirmed-variety metadata while preserving the raw response and original review date exactly. The Stage B disposition is now recorded separately in `CP021B-STAGE-B-AI-EXPERT-ADJUDICATION.md`.

- Date: 2026-07-17
- Lifecycle event: `NATIVE_NATURALNESS_RESPONSE_INGESTION`
- Status: `12_EXPLICIT_CHOICES_LOCKED / EXPERT_ADJUDICATION_PENDING / NO_DESIGN_OR_RUNTIME_AUTHORIZATION`
- Parent checkpoint: `CP021B-NR0`

## Received response

The user returned a low-friction Markdown review covering all twelve frozen CP021B-NR0 surfaces. The raw file is preserved byte-for-byte as:

`review-packets/cp021b-native-expert-design-v1/stage-a-native/completed-low-friction/RAW-RESPONSE-NS01.md`

Its SHA-256 is `1853dabfe16fac3da01e8308bb74728a22302c81c7e066ab3cf4724ed00b5324`.

The conversation describes the reviewer as the user's native-speaker wife. The form itself leaves name, date, and the Hong Kong Cantonese yes/no field blank. The normalized record therefore uses reviewer pseudonym `CP021B-NS01`, preserves the user-reported native-speaker background, and records Hong Kong variety and review date as unconfirmed rather than inferring them.

## Response result

- Explicit selections: **12/12**
- `NATURAL_IN_CONTEXT`: **10**
- `UNNATURAL_IN_CONTEXT`: **2**
- `UNSURE_OR_NEEDS_CONTEXT`: **0**
- `NOT_SEEN`: **0**
- Corrections supplied: **2/2 rejected items**
- Multiple selections: **0**
- Blank naturalness responses: **0**

| Item | Surface | Response | Supplied correction |
|---|---|---|---|
| N01 | 我買咗杯咖啡畀佢。 | Natural | — |
| N02 | 我畀佢本書。 | Wrong | 我畀咗本書佢。 |
| N03 | 我攞咗本書畀佢睇。 | Natural | — |
| N04 | 我織咗件冷衫畀你。 | Natural | — |
| N05 | 佢俾咗三百蚊我。 | Natural | — |
| N06 | 我借咗本書畀佢。 | Natural | — |
| N07 | 我畀佢你。 | Wrong | 我畀佢畀你。 |
| N08 | 老師俾張紙學生。 | Natural | — |
| N09 | 我交咗本書畀張三。 | Natural | — |
| N10 | 我畀阿明嗰本我尋日喺書展買嘅書。 | Natural | — |
| N11 | 我畀咗本書佢。 | Natural | — |
| N12 | 阿媽畀咗個蘋果細佬。 | Natural | — |

## Narrow observations

1. The same reviewer rejects short-theme recipient-before-theme N02 and supplies theme-before-recipient N11 as the correction; N11 is independently marked natural in the same form.
2. The same reviewer marks heavy-theme recipient-before-theme N10 natural. This blocks a categorical ban on recipient-before-theme order and is compatible with a weight-, discourse-, or speaker-conditioned boundary, but the task does not identify which condition controls it.
3. The two-pronoun N07 is rejected and repaired with a second `畀`. Because no translation or participant-role description was supplied, the repair is preserved without forcing a role mapping or structural category.
4. Multiple post-theme `畀` surfaces and multiple lexical-GIVE theme-recipient surfaces are accepted. Their naturalness does not establish one unified relation, marker category, hierarchy, or productive rule.
5. Both `畀` and `俾` occur in accepted items, but the reviewer supplied no orthography comment. Item acceptance alone is not an orthographic-parity analysis.

## Evidence boundary

This is one-speaker sentence-naturalness evidence. It does not validate translations, intended readings, participant roles, structural analyses, category labels, productivity, population frequency, or unrestricted modern Hong Kong usage. Generated surfaces remain probes rather than independent corpus attestations.

The user-directed quick form omitted the original packet's translation, role-description, context, confidence, and reviewer-metadata fields. Those omissions are recorded as unknown, not filled by project inference. The twelve naturalness choices are immutable and usable as a bounded Stage A naturalness screen; Stage B must explicitly preserve the missing fields and supply independent expert analysis before either CP021B design candidate can advance.

## Gate result

- Stage A naturalness choices: complete for 12/12 surfaces
- Stage A extended interpretation/metadata fields: not collected by user-directed low-friction design
- Stage B expert adjudication: not started
- CP020R2 rendered disposition: still required independently
- Parser design: not authorized
- Runtime change: none

Next event: Stage B expert adjudication against the locked raw response and normalized ledger, without opening held-out rows or consulting CP021B parser output.
