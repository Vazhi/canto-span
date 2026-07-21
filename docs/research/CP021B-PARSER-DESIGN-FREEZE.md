# CP021B Conservative Parser-Design Freeze

- Date: 2026-07-17
- Lifecycle event: `PARSER_DESIGN_FREEZE`
- Checkpoint: `CP021B-PD1`
- Status: `TWO_CONSERVATIVE_DESIGNS_FROZEN / ZERO_RUNTIME_CHANGE / IMPLEMENTATION_REQUIRES_CONFIRMATION`
- Runtime authority: accepted `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`
- Held-out use: `0_OF_36_ROWS_OPENED_OR_PARSED_FOR_DESIGN`

## Decision

Freeze two separate replacements for a later implementation event:

1. `LexicalGiveRelation` replaces the overbroad `TransferDitransitiveVP` behavior. It covers lexical `畀/俾` GIVE with two overt postverbal nominal spans. A uniquely resolved theme-before-recipient branch may assign roles; a person-before-thing branch may preserve only a giving relation and visible participant types while leaving semantic roles unresolved.
2. `PostThemeParticipantRelation` replaces `RecipientFrame` for reviewed predicate-theme-`畀/俾`-participant surfaces. It retains the upstream predicate, theme, marker, overt participant, and optional final predicate while refusing a single Recipient/beneficiary role or marker category.

The designs are independent. Neither may absorb `PassivePermissiveRelation`, fixed expressions, conditional `畀著`, unrelated speech ditransitives, discourse-recovered arguments, or heavy-theme restructuring. The accepted runtime and manifest do not change at this checkpoint.

## Evidence and review boundary

This freeze uses:

- the frozen 79-proposition CP021B extraction, source-derived claims, claim edges, contradictions, and pre-implementation dispositions;
- the 24-row design partition;
- the locked 12-item response from the user's wife, one Guangzhou Cantonese native speaker;
- the 12-row source-grounded AI adjudication, explicitly not a human-expert or native structural judgment;
- the accepted CP020R2 passive/permissive owner and current runtime source.

`docs/research/CP021B-PARSER-DESIGN-EVIDENCE-MAP.tsv` links each consequential design decision to the exact synthesized claim IDs, existing claim-source edge IDs, additional extracted propositions where relevant, source-screen records, and native/AI review items. The map does not create new linguistic evidence or rewrite the frozen synthesis; it makes the design's evidence path directly auditable.

Four theme-before-recipient lexical-GIVE surfaces and five post-theme predicate profiles have relevant native plus AI review. Two alternative-order surfaces remain marked or speaker-variable, and the two-pronoun surface remains unacceptable without a stable role mapping. The other design rows are constraints or probes, not attested language evidence. Independent human-expert validations and native structural-analysis validations remain zero. No claim becomes `supported_productive`.

The 36-row held-out partition was not opened, printed, counted by content, parsed, or used to select a rule. Only its previously frozen bytewise SHA-256 identity may be checked. It remains sealed until the later implementation is code-complete and frozen.

## Shared invariants

Both designs must satisfy all of the following:

- recognize `畀` and `俾` with identical grammar behavior;
- preserve every overt source token and source order;
- insert no hidden subject, theme, recipient, beneficiary, agent, or final predicate;
- distinguish lexical GIVE from post-theme linking and from passive/permissive behavior;
- assign no semantic participant role from marker form or linear position alone;
- encode no global order alternation, categorical theme-weight threshold, marker-distance threshold, second-marker trigger, or `將` trigger;
- choose no fixed preposition, verb, serial-verb, complex-predicate, or constructional category for post-theme `畀/俾`;
- expose provisional behavior to the semantic gate as review-bearing, never automatically accepted;
- treat design and held-out rates as evaluation sampling, never language frequency;
- retain `PassivePermissiveRelation` unchanged and ahead of the new fallbacks where its overt-participant-plus-predicate contract matches.

## Design C01 — `LexicalGiveRelation`

### Purpose and public display

- Internal type: `LexicalGiveRelation`
- Replaces active use of: `TransferDitransitiveVP`
- Default learner label: `Give`
- Baseline learner explanation: `The thing given is followed by the person who receives it in this reviewed pattern.`
- Alternative-order explanation: `A giving meaning is visible, but this order needs context; the parser does not decide who receives what.`
- Legitimacy status on implementation: `provisional`
- Productivity status: not supported

The internal name says only that `畀/俾` is the lexical giving predicate in the selected surface. It does not assert a standard syntactic category.

### Recognition preconditions

The fallback may run only after fixed-expression, conditional, and accepted passive/permissive routing. It requires:

1. optional overt subject material already independently licensed as a subject;
2. lexical `畀` or `俾` in predicate position, with no upstream action-theme VP before it;
3. optional immediately following perfective `咗`, or no overt aspect;
4. exactly two overt postverbal spans that are independently licensed as full nominal spans;
5. no later predicate and no second `畀/俾` inside the candidate span;
6. exactly one supported split of the postverbal material into the two nominal spans.

Punctuation and a sentence-final particle may be handled by an outer existing wrapper. They are not evidence for argument structure.

### Branch C01-A — reviewed theme-before-recipient baseline

Emit `LexicalGiveRelation` with `relation_profile=theme_recipient_baseline` only when:

- the first postverbal nominal span has independent thing/theme evidence and is not solely person-like;
- the second postverbal nominal span has independent person-NP evidence;
- the split is unique.

The parent may assign:

- `transfer_predicate` to lexical `畀/俾`;
- `theme` and `object` to the first nominal span;
- `recipient_candidate` and `goal_candidate` to the second nominal span.

The learner leaf remains `who`, but the trace must say that recipient status comes from the reviewed lexical-GIVE profile plus independent person evidence, not from final position alone. Because the evidence is narrow and nonproductive, the semantic gate must return `REVIEW_REQUIRED` with `cp021b_provisional_lexical_give_relation`.

### Branch C01-B — alternative order with unresolved roles

Emit `LexicalGiveRelation` with `relation_profile=nonbaseline_participant_order_unresolved` only when:

- the first postverbal nominal is independently person-like;
- the second is independently thing-like and not solely person-like;
- the split is unique;
- all other C01 preconditions hold.

This branch must not export `theme`, `recipient`, `goal`, or `beneficiary` slots from the two arguments. It exports only `post_give_participant_1` and `post_give_participant_2`, preserving their ordinary lexical `who`/`what` display without converting those labels into semantic roles. Its trace may record `visible_order=person_before_thing`; it must record `semantic_role_assignment=unresolved` and `weight_rule_used=false`.

The semantic gate must return `REVIEW_REQUIRED` with `lexical_give_argument_order_unresolved`. Short and heavy themes receive the same routing; heaviness cannot change the result automatically.

### C01 refusal rules

Do not emit `LexicalGiveRelation` when any of these is true:

- both postverbal spans are person-like or no independent theme-like span exists;
- the two-NP split is absent or nonunique;
- a participant is omitted or recovered only from discourse;
- a theme is fronted outside the local predicate span;
- a second `畀/俾`, `將` restructuring, later predicate, or upstream non-GIVE predicate occurs;
- the marker is passive/permissive, conditional, fixed-expression, or otherwise nonlexical-GIVE;
- an argument would have to be created, copied, or assigned only from position.

Required boundary behavior:

- two-person/pronoun ambiguity: `BLOCKED` with `lexical_give_two_person_argument_roles_unresolved`;
- locally omitted theme or recipient without licensed context: `BLOCKED` through `NeedsContext`, with no hidden role;
- fronting, double-marker, and `將` shapes: preserve overt components and return `REVIEW_REQUIRED` with a boundary-specific code, but no C01 node.

### C01 trace contract

Every emitted C01 node must include:

- `construction_type: LexicalGiveRelation`
- `relation_profile`
- `marker_surface`
- `aspect_surface` or an explicit empty value
- `overt_subject_surface` or an explicit empty value
- `postverbal_argument_surfaces`
- `visible_order`
- `semantic_role_assignment`
- `orthographic_parity: 畀=俾`
- `hidden_participants_inserted: false`
- `weight_rule_used: false`
- `not_claims` containing at least `not_free_order_alternation`, `not_benefactive_linker`, `not_passive_or_permissive`, and `not_supported_productive`

## Design C02 — `PostThemeParticipantRelation`

### Purpose and public display

- Internal type: `PostThemeParticipantRelation`
- Replaces active use of: `RecipientFrame`
- Retired alias remains retired: `BenefactiveRecipientFrame`
- Default learner label: `For / to`
- Learner explanation: `Links the preceding action and thing to a following person. The exact link depends on the verb and context.`
- Legitimacy status on implementation: `provisional`
- Productivity status: not supported

`For / to` is an English navigation gloss, not a claim that the marker has one category or that the following person is always a recipient or beneficiary.

### Recognition preconditions

The implementation must first isolate an optional overt subject from a predicate-level candidate. The new node covers the predicate, not the subject. It requires:

1. a full-span upstream VP with an overt non-GIVE predicate and overt theme/object;
2. immediately following `畀` or `俾`;
3. one overt independently licensed person-denoting NP after the marker;
4. either no remaining material or one independently licensed following predicate/VP;
5. a frozen upstream predicate profile listed below;
6. no match to fixed-expression, conditional, lexical-GIVE, or passive/permissive routing.

The subject, when present, remains outside this node and may be wrapped by the existing `SubjectPredicateClause`. The upstream VP remains a child. The theme remains inside that VP. The marker, post-marker participant, and optional final predicate remain visible children. The node must not be reduced to `畀/俾 + NP` because doing so would discard the valency evidence that licenses the relation.

### Frozen predicate profiles

Only these reviewed profiles are eligible in the first implementation:

| Upstream predicate | Required local shape | Trace candidates | Required caution |
|---|---|---|---|
| `借` | predicate + overt theme + marker + person | `goal_or_lend_to_candidate` | preserve borrow/lend lexical ambiguity; never infer Source from position |
| `交` | predicate + overt theme + marker + person | `goal_or_recipient_candidate` | lexical transfer meaning comes from `交`, not from the marker alone |
| `織` | predicate + overt theme + marker + person | `beneficiary_or_intended_user_candidate` | do not entail transfer or receipt |
| `買` | predicate + overt theme + marker + person | `beneficiary_or_intended_recipient_candidate` | context may decide whether later transfer is intended |
| `攞` | predicate + overt theme + marker + person + overt final predicate | `final_predicate_participant_or_beneficiary_candidate` | final predicate is mandatory and must remain visible |

Aspect, when independently part of the upstream VP, remains there. No unlisted predicate becomes eligible by semantic similarity, fixture analogy, or held-out behavior.

### Role and category policy

The post-marker NP receives only structural slots such as `post_theme_participant`, `person_np`, and `np`. It does not receive `recipient`, `goal`, `beneficiary`, `agent`, or `source` as an asserted role. Candidate readings belong in trace metadata only.

The marker receives `post_theme_link_marker` and learner role `func`. It must not receive a fixed `preposition`, `serial_verb`, `secondary_predicate`, or `case_marker` category. The optional final predicate remains `doing` and keeps its existing predicate slots. No hidden shared argument may be added between it and the participant.

Every C02 node is `REVIEW_REQUIRED` with `post_theme_participant_role_context_dependent`, even when a lexical profile makes one reading likely. The runtime may expose candidates to diagnostics but must not tell the learner that the person necessarily receives or benefits.

### C02 refusal rules

Do not emit `PostThemeParticipantRelation` when:

- the upstream predicate is lexical GIVE;
- there is no overt local theme/object, marker, or participant;
- the participant is not independently person-denoting;
- trailing material exists but is not one licensed predicate/VP;
- the upstream predicate profile is not one of the five frozen profiles;
- the shape belongs to passive/permissive, conditional `畀著`, fixed `畀心機`, heavy-theme double-marker, `將`, or unrelated speech behavior;
- recognition would require a hidden participant or a fixed marker category.

Unlisted or structurally incomplete shapes preserve ordinary components and receive existing blocking/review behavior. They do not fall back to `RecipientFrame`.

### C02 trace contract

Every emitted C02 node must include:

- `construction_type: PostThemeParticipantRelation`
- `relation_profile: theory_neutral_post_theme_participant`
- `upstream_predicate_surface`
- `upstream_theme_surface`
- `marker_surface`
- `postmarker_participant_surface`
- `following_predicate_surface` or an explicit empty value
- `participant_role_candidates`
- `participant_role_status: unresolved_or_context_dependent`
- `marker_category_status: not_selected`
- `upstream_predicate_profile`
- `orthographic_parity: 畀=俾`
- `hidden_participants_inserted: false`
- `not_claims` containing at least `not_lexical_give`, `not_passive_or_permissive`, `not_unified_recipient_or_beneficiary`, `not_fixed_marker_category`, and `not_supported_productive`

## Runtime integration contract for the later implementation

The later implementation event must make these coordinated changes; this checkpoint makes none of them:

1. Add both new types to the active construction registry, slot derivation, learner-gloss registry, legitimacy metadata, and claim-provenance ledger as authority-origin provisional designs.
2. Retire active `TransferDitransitiveVP` and `RecipientFrame`; keep `BenefactiveRecipientFrame` retired. No alias may silently redirect an old semantic claim to a new node.
3. Replace the current `transferDitransitiveVPFallback`, `benefactiveRecipientVPFallback`, and `recipientFrameFallback` routing with the two frozen fallbacks.
4. Update the special `SerialVerbPurposeChain` consumer so a post-theme participant plus final predicate is represented by the neutral C02 node, not a nested recipient assertion or a purpose assertion selected from form alone.
5. Extend the semantic guard so any reachable old `TransferDitransitiveVP` or `RecipientFrame` is a blocker, while both new types are review-bearing with their exact codes.
6. Preserve `PassivePermissiveRelation` behavior, ordering, traces, learner output, CP020R2 fixtures, and rendered acceptance.
7. Implement orthographic parity with one shared marker predicate or equivalent shared path, not duplicated spelling-specific grammars.
8. Do not modify frozen design or held-out input files, source claims, native response, or AI adjudication.

## Frozen design-row dispositions

`docs/research/CP021B-PARSER-DESIGN-BEHAVIOR.tsv` is binding for all 24 design rows:

- D001-D004: C01-A, role-safe theme-before-recipient, review required.
- D005-D006: C01-B, relation visible but roles unresolved, review required.
- D007: no new relation, blocked two-person role ambiguity.
- D008-D012: C02, theory-neutral post-theme relation, review required.
- D013-D015: no new relation, heavy/restructured boundary review.
- D016 and D018: no new relation, context-dependent omission blocked without licensed context.
- D017: no new relation, fronted-theme boundary review.
- D019-D022: unchanged CP020R2 `PassivePermissiveRelation` ownership.
- D023-D024: unchanged non-target handling.

These are design expectations, not parser results. No CP021B parser output has been produced at this checkpoint.

## Direct evidence trace

The binding evidence map covers:

- lexical-GIVE baseline and nonexclusivity;
- alternative order and two-pronoun restrictions;
- post-theme surface attestation, predicate dependence, and competing category analyses;
- the five reviewed predicate profiles and the preserved final predicate;
- heavy-theme, omission/fronting, passive/permissive, conditional, fixed-expression, orthographic, and frequency boundaries;
- the internal no-unified-recipient architecture veto.

Every referenced `EDGE-CP021B-SY-*` resolves to `CP021B-CLAIM-SOURCE-EDGES.tsv`, where the canonical URI, exact locator, extracted proposition, verification state, limitations, and independence unit are recorded. Additional proposition IDs resolve to the frozen proposition extraction and are used only for narrower design constraints or review surfaces, not to broaden a synthesized claim.

## Validation and later acceptance

After explicit confirmation, a separate implementation checkpoint may implement exactly this design from the accepted v0.5.174 runtime. Before the held-out partition can be opened, the implementation must be code-complete, syntax-valid, registry-complete, and frozen by hash. Held-out results may adjudicate the candidate but may not tune it.

Acceptance still requires:

- all 24 design rows and all 36 held-out rows evaluated without exclusions;
- overt-span, role, trace, orthography, hidden-participant, semantic-status, and root-coverage checks;
- full regression, grammar-legitimacy, claim-provenance, semantic-acceptance, and documentation audits;
- rendered Obsidian review because learner labels, hovers, and tree structure change;
- an explicit PASS, REVISE, or REJECT disposition.

## Authorization boundary

This checkpoint freezes an implementable design but changes no runtime and authorizes no automatic continuation. Stop and wait for user confirmation. The next event, if confirmed, is `CP021B-IM1 / FROZEN_DESIGN_IMPLEMENTATION`; only after that implementation is frozen may the held-out partition be opened for one-shot evaluation.
