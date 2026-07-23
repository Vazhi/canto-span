---
title: UC-RQ-040 — aa3 wo3 bo3 stance-particle contrast research
research_id: UC-RQ-040
status: active_research_unit
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-040 — `aa3`, `wo3`, and `bo3` stance-particle contrast research

## Research decision

Promote sentence-final `aa3`, `wo3`, and `bo3` to a typed stance-particle
contrast research family. Retire the proposal that modern `wo3` and `bo3` are
freely interchangeable variants. Merge `bo3` cluster ordering into UC-RQ-013's
existing particle-cluster research, while retaining standalone particle identity
and function here.

The safest checked modern profiles are:

| Particle | Checked core | Current disposition |
|---|---|---|
| `aa3` | moderates/softens the force of the host while the host retains its statement, question, or other clause type | **promote broad interactional profile** |
| `wo3` | realization, reminder, hearsay, and contrast/noteworthiness over contextually interpreted hosts | **promote typed multifunctional profile; merge broad carrier with current `DiscourseParticleFrame`** |
| `bo3` | principally contrast in short negative utterances; rare independently and often found in clusters | **promote narrow modern contrast profile; merge cluster work into UC-RQ-013** |

Cheung's later corpus-based thesis additionally classifies `aa3` uses for
subjective evaluation, politeness, intolerance, emphasis, and three epistemic
subtypes. Those are source-backed subtype candidates, but the checked abstract
does not supply enough construction-by-construction examples to select them from
surface form alone. They remain quarantined as exact parser categories.

This note does **not** authorize parser changes, rewriting the current `噃` note,
automatic subtype inference, cluster expansion, or status changes.

## Safest checked distinctions

### `aa3`

Leung's minimal-pair analysis finds that `aa3` does not create interrogativity in
an A-not-A or wh question: those forms are already questions. Across several
host types, adding it makes the utterance more neutral or moderate while the
host's original attitude remains. This supports a broad interactional-scope
profile rather than the lexical rule “`aa3` means question.”

Cheung's HKU thesis classifies five functions—softening, subjective evaluation,
politeness, intolerance, and information emphasis—and reports softening and
subjective evaluation as the two most frequent. It also proposes speculative,
deductive, and assumptive epistemic subtypes based on guessing, conversational
evidence, or common-sense inference. Preserve these distinctions as research
claims without treating every `aa3` token as epistemic.

### `wo3`

Leung's 1990s Hong Kong data distinguish realization, reminder, hearsay, and
contrast. Realization concerns the speaker's new awareness; reminder directs the
hearer's attention; hearsay attributes the information elsewhere; contrast marks
a proposition contrary to an expectation. Imperative and exclamatory hosts retain
their clause force while `wo3` adds reminder or mirative/noteworthy stance.

The current broad `DiscourseParticleFrame` for written `喎` is compatible with
this evidence because it explicitly leaves the exact subtype underdetermined.
It is a representation carrier, not evidence that written form alone selects one
of the four functions.

### `bo3`

In the checked 1990s corpus, `bo3` was about 38 times less frequent than `wo3`
and appeared independently only five times. Four were short negative contrast
profiles. The one realization example was judged more natural with `wo3` and
treated as a residue of older `bo3` usage. The source therefore supports a narrow
modern contrast profile, not a general reminder/realization default.

The same study records `bo3` primarily in clusters such as `gaa3bo3`,
`laa3bo3`, `tim1bo3`, and `zaa3bo3`. Their order and compositional semantics
belong under UC-RQ-013; the present unit retains only the identity/function
contrast needed to avoid a false merger with `wo3`.

## Checked source findings

The source-verification ledger is:

`UC-RQ-040-AA3-WO3-BO3-STANCE-PARTICLE-CONTRAST-SOURCE-VERIFICATION-R1.tsv`

Leung 2008 supplies a full minimal-pair account of `aa3` across sentence types
and argues for a general moderating contribution. Cheung 2023 supplies a newer
HKU corpus classification with five pragmatic functions and three epistemic
subtypes; only the official abstract was accessible in this review, so exact
examples and annotation boundaries remain open.

Leung's 2010 synchronic study uses the Hong Kong University Cantonese Corpus and
local-film data to establish the late-20th-century `wo3`/`bo3` split, including
function inventories, relative frequency, independent `bo3` scarcity, and cluster
behavior. The companion diachronic study corroborates functional expansion of
`wo3` and contraction of `bo3` from the 1940s through the 1990s.

## Exact collision audit

The collision ledger is:

`UC-RQ-040-AA3-WO3-BO3-STANCE-PARTICLE-CONTRAST-COLLISION-AUDIT-R1.tsv`

### `DiscourseParticleFrame`

The current proposition-level `喎` frame already preserves broad
evidential/noteworthiness scope and refuses exact tone/context subtype inference.
That is the correct merger point for the broad carrier. It does not license
realization, reminder, hearsay, or contrast automatically, and it does not cover
`aa3` or `bo3` merely because all are final particles.

### `FormulaDiscourseUnit`

Conventional responses such as `好呀` may remain formula units with the overt
particle visible. Formula status cannot replace productive clause-level research
or generalize the formula's discourse force to all `aa3` hosts.

### Current lexical `噃` note

The runtime describes `噃 bo3` as a reminder/realization particle. The checked
late-20th-century evidence instead identifies contrast as its fundamental modern
independent function and treats realization as a single residual older-use case.
This mismatch is recorded for a future authorized reaudit; it is not patched here.

## Quarantined boundaries

Future research must establish:

- construction-level diagnostics for Cheung's five `aa3` functions and three
  epistemic subtypes;
- how clause type, lexical cues, prosody, interaction sequence, speaker knowledge,
  and addressee knowledge select each `wo3` function;
- the modern productivity and regional/generational distribution of standalone
  `bo3`, including positive and residual realization uses;
- `wo3` versus `wo5`, tone-specific hearsay, informal orthography, and fusion;
- exact particle-cluster order, scope, compatibility, and attestation under
  UC-RQ-013;
- statements, questions, imperatives, exclamatives, fragments, formulas, and
  incomplete hosts;
- Hong Kong/Guangzhou and historical variation, frequency, prosody, and speaker
  judgments.

## Provisional outcome

| Question | Current answer |
|---|---|
| Does `aa3` simply mark a question? | **No; checked questions are independently interrogative, while `aa3` broadly moderates the host.** |
| Are multiple pragmatic and epistemic `aa3` classifications source-backed? | **Yes, but exact subtype diagnostics remain quarantined.** |
| Are realization, reminder, hearsay, and contrast all documented for late-20th-century `wo3`? | **Yes.** |
| Are modern `wo3` and `bo3` freely interchangeable? | **No; retire that merger.** |
| Is modern standalone `bo3` broadly reminder/realization? | **No safe default; its checked core is narrow contrast, with realization residual and quarantined.** |
| Where should `bo3` cluster behavior be researched? | **Merge into UC-RQ-013.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-040 may leave active research only after particle identity, host type,
prosody, discourse evidence, epistemic source, contrast expectations, historical
variation, and cluster composition support typed constructions, broader mergers,
continued quarantine, or evidence-based retirement.
