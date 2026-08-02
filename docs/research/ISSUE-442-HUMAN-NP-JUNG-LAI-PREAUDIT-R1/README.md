# Issue #442 pre-audit research: human-NP `用嚟` role boundaries

**State:** source-first pre-audit packet  
**Parent issue:** #442  
**Work claim:** #446  
**Survey dependency:** `YUE-JUDGMENT-PILOT-01` remains active; no final audit is available.

## Evidence boundary

This packet begins the source and contrast-design portions of issue #442. The 31 July 2026 aggregate pilot report is used only to identify a research problem: isolated human-NP strings before `用嚟` produced mixed naturalness and mixed interpretations. It is not treated as a frozen audit, participant-level evidence, a construction decision, or a parser specification.

The packet separates four evidence types:

1. **direct construction descriptions** of `用嚟` and purposive `嚟`;
2. **general Cantonese syntax descriptions** of topicalization and omitted arguments;
3. **attested examples** with overt resources and overt users;
4. **analytic hypotheses** that still require controlled judgments and a final survey audit.

## Current source-supported core

The strongest checked source for the narrow surface is Wong (2023), which classifies `呢個用嚟切嘢` as an instrumental serial-verb construction and says that an instrument may be omitted or moved to subject position with `用嚟`. Cheung (2018) describes broader `V1 + 嚟 + V2` material as purposive and treats `用來／用嚟` as conventionalized. Chor (2018) supplies the important broader frame `啲錢我用嚟買晒嗰堆嘢`, where a resource topic and an overt human user are separately expressed.

A deeper full-text review of Francis and Matthews (2006) adds a structural constraint. Their coverb template is `subject + V1 + NP1 + V2 (+ NP2)`: the V1 phrase expresses a relation such as instrument, location, direction, beneficiary, or accompaniment and modifies the main V2. In an analysis where the initial human NP is the user/agent and `用` is V1-like, an isolated string such as `阿明用嚟切方包` leaves the resource argument of `用` unexpressed. That is an omitted-resource analysis, not evidence that `阿明` is itself the instrument or resource.

These sources support a nonhuman instrument/resource core and a distinct resource-plus-user frame. They do **not** directly establish that a bare human NP in `Human NP + 用嚟 + VP` is productively interpreted as the resource or instrument.

## Competing analyses for an isolated human-NP string

For an item such as `阿明用嚟切方包`, at least the following analyses must be distinguished rather than collapsed into one naturalness score:

| Analysis | Structural sketch | Current evidence state |
| --- | --- | --- |
| Human resource/theme | `[阿明]RESOURCE 用嚟 [切方包]PURPOSE` | No direct checked source found for the general productive profile. |
| Overt user plus omitted resource | `[阿明]USER 用 [ØRESOURCE] 嚟 [切方包]PURPOSE` | Cantonese permits discourse-recoverable omitted arguments; exact `用嚟` licensing remains untested. |
| Human topic plus comment | `[阿明]TOPIC [用嚟切方包]COMMENT` | Cantonese topic-comment structure is independently supported; the missing internal role remains unresolved. |
| Assignment/responsibility reading | `阿明` is the person assigned or responsible for the purpose event | Pilot interpretations suggest this possibility, but checked `用嚟` sources do not establish it as the syntax of the isolated string. |
| Metonymic/coercive resource | A person is construed as labour, staff, spokesperson, test subject, etc. | Semantically imaginable in special contexts; no general construction evidence yet. |
| Repair or failed parse | The speaker supplies an object, changes the predicate, or rejects the string | Must remain a genuine negative outcome, not be recoded as one of the analyses above. |

## Topic and omission evidence

Matthews and Yip's official grammar materials establish ordinary Cantonese object topicalization, hanging topics, secondary topicalization, topic chains, and omitted pronouns. These facts make a user/topic analysis structurally possible in principle. They do not prove that every isolated `Human NP + 用嚟 + VP` string has that analysis, because the interpretation depends on discourse recoverability and on whether `用` has a recoverable resource argument.

The official topic-chain example also shows that Cantonese can continue across clauses while leaving an object unexpressed once the discourse topic is established. This supports testing overt-context and no-context variants instead of interpreting an isolated item as self-sufficient.

## Initial decision map

### Source-supported

- `用嚟` has a purposive/function relation and a conventionalized status in checked descriptions.
- A nonhuman instrument can occupy the preverbal position in an instrumental analysis.
- A separate overt human user may occur after a fronted resource/topic in broader purposive actual-use material.
- Cantonese independently permits topicalization and context-sensitive omission.
- Coverb-like V1 structures preserve a separate relational argument after V1; an agent-initial analysis without that argument is an omission analysis.

### Not yet supported

- a productive unrestricted class of human resources directly licensed by the narrow AB53 relation;
- a universal omitted-object analysis for all human-NP strings;
- an assignment/responsibility construction contributed specifically by `用嚟`;
- equivalence among bare, copular, modal, overt-user, and actual-use frames;
- parser insertion of an unspoken resource or user.

### Required later evidence

- the final frozen item audit and adjudicated interpretation coding;
- matched human/nonhuman lexical sets;
- contexts that independently force resource, user, topic, and assignment readings;
- corpus examples preserving enough preceding discourse to identify the role of the human NP;
- negative controls where a human-resource interpretation is implausible but an omitted-resource interpretation remains available, and vice versa.

## Working conclusion

The interim split is best treated as an **analysis-identification problem**, not evidence for either a general human-resource extension or a categorical ban. Current sources establish a nonhuman instrumental/resource core, a broader resource-plus-user frame, and independent topic/omission mechanisms. They leave the bare human-NP string structurally underdetermined. The final issue decision therefore requires forced interpretations and context-controlled contrasts, not pooled naturalness alone.

## Files

- `source-ledger.tsv` — checked sources and exact claim limits;
- `claim-matrix.tsv` — competing analyses and current support;
- `controlled-contrasts.tsv` — proposed matched contrasts for the frozen-audit/follow-up stage;
- `source-review-addendum.md` — full-text coverb review and its consequence for human-NP ambiguity;
- `corpus-review-schema.tsv` — auditable coding fields for future context-bearing corpus candidates.

## Protected state

This packet changes no construction identity, linguistic status, parser behavior, fixture, survey instrument, panel state, participant-text disposition, runtime version, release state, or deployment state.
