---
title: AA77 — place-initial 有／冇 existential corpus boundaries R1
status: findings_complete
construction_uuid: c130b11d-3828-53d9-ae28-7344fb742201
construction_code: AA77
canonical_name: PlaceInitialJauMouExistentialClause
intake_issue: 344
work_claim: 345
draft_pr: 346
reviewed_on: 2026-07-30
source_ledger: docs/research/AA77-JAU-MOU-PRIMARY-SOURCE-LEDGER-R1.tsv
candidate_inventory: external-evidence/aa77-hkcancor/hkcancor-aa77-jau-mou-candidate-inventory.json
bounded_packet: review-packets/corpus-review/AA77/bounded-profile-packet-r1.tsv
bounded_decisions: review-packets/corpus-review/AA77/bounded-profile-decisions-r1.tsv
selector: review-packets/corpus-review/AA77/select-bounded-profile-packet-r1.py
verifier: review-packets/corpus-review/AA77/verify-bounded-profile-decisions-r1.py
---

# AA77 — place-initial 有／冇 existential corpus boundaries R1

## Executive finding

The current narrow AA77 identity is supported as a **surface-bounded Cantonese
place-initial existential profile**:

```text
overt place or spatial-domain expression + 有/冇 + overt introduced nominal
```

The balanced review packet contains four direct AA77 cases, covering both `有` and `冇`:

```text
裏面有啲乜嘢酒店啊
裏邊冇乜嘢食𡃉咋喎
公司有Internet
澳洲冇嘢睇
```

The other 36 reviewed candidates do not justify broadening AA77. They divide among
explicit-subject possession or availability, no-place existential/presentational clauses,
`有冇得` opportunity questions, event or property negation, `冇咗` change/loss,
coordination and discourse ellipsis, lexical material, ambiguity, and repair.

The review therefore supports the existing direction of the identity record:

- retain the overt place-first `有／冇 + nominal` core as a defensible research object;
- do not treat any noninitial `有` or `冇` token as AA77 by itself;
- do not transfer possession, presentational, event, aspect, question, or ellipsis evidence
  into AA77;
- do not promote status or modify runtime behavior from this packet.

The packet is deliberately stratified and is **not a frequency sample**. Four genuine
items out of forty does not mean that ten percent of all corpus tokens are AA77.

## Empirical trigger

The checked-in inventory
`AA77-HKCANCOR-NONINITIAL-JAU-MOU-R1` contains 1,730 high-recall candidates across
all 58 frozen HKCanCor files:

- 1,134 exact-token `有` candidates;
- 596 exact-token `冇` candidates;
- 1,490 utterances;
- no semantic, place, possession, predicate, or clause-type filtering.

That inventory establishes extraction coverage only. It deliberately retains
heterogeneous analyses and excludes utterance-initial tokens. HKCanCor also commonly
represents `冇得` as a single token, so the query generally does not inventory standalone
`冇得 + predicate`.

The research question was therefore not whether `有` and `冇` occur. It was whether a
bounded, reproducible cross-section supports AA77's overt place-first profile and which
other recurrent profiles the high-recall query exposes.

## Primary-source synthesis

The proposition ledger is
`docs/research/AA77-JAU-MOU-PRIMARY-SOURCE-LEDGER-R1.tsv`.

### Place-first existential structure

Yip and Matthews describe Cantonese existential sentences that begin directly with a
place expression without an inserted preposition. Mok independently analyzes
sentence-initial locatives in Cantonese `yau` existential sentences, while allowing more
than one structural source for those locatives.

Canto Span adopts only the durable surface conclusion:

```text
place expression + 有 + introduced nominal
```

The project does not force the place expression to be a grammatical subject, topic, or
moved adjunct and does not insert an English-like expletive.

Lam directly supplies the negative counterpart with a place expression followed by `冇`
and an overt nominal. Negative existential `冇` is therefore independently supported; it
must not be represented as positive `有` with a hidden negator.

### Possession, subjectless existence, and pre-predicate 有

Lam, Lau, and Lee distinguish at least:

```text
explicit subject + 有 + nominal       possession
有 + introduced nominal (+ predicate) subjectless existential/presentational
有 + verbal/adjectival predicate       pre-predicate event assertion
有得 / 冇得 + predicate               possibility or unavailability
```

Their segmentation proposal does not by itself settle every syntactic analysis, but it
proves that shared spelling is not a sufficient construction boundary.

Lee's semantic analysis independently treats pre-predicate `有 + predicate` as distinct
from postverbal perfective `咗`. The paper analyzes `有` as assertive existential
quantification over events and event time, with readings sensitive to situation
specificity and lexical aspect. This prevents the project from treating every `有 + VP`
as possession, nominal existence, or ordinary perfective marking.

### Clausal 冇

Law argues that clausal `冇` has syntactic behavior visible in aspect restrictions, null
objects, fronting, ellipsis, and A-not-A questions. Canto Span does not need to adopt the
paper's full phonological derivation to preserve the practical boundary: `冇` before a
predicate, in ellipsis, or with aspect material is not automatically negative AA77.

## Packet construction

The selector is
`review-packets/corpus-review/AA77/select-bounded-profile-packet-r1.py`.

It assigns every inventory candidate to exactly one mechanical stratum using overt token,
POS, context, punctuation, and adjacency features. It then selects four stable-source-order
candidates per stratum while maximizing source diversity and representing both polarities
where both occur.

The ten strata are:

1. `place_left`;
2. `nominal_left_nominal_right`;
3. `a_not_a_or_opportunity`;
4. `attributive_embedding`;
5. `prepredicate_right`;
6. `aspect_adjacent`;
7. `wh_or_focus_adjacent`;
8. `repair_or_ellipsis`;
9. `other_nominal_right`;
10. `other_control`.

The first generated revision accidentally filled each stratum with `有` before considering
`冇`. It was rejected before linguistic classification. The corrected selector explicitly
represents both forms whenever available and produced:

```text
40 rows
20 有
20 冇
4 rows in each of 10 strata
```

The generated packet and decision file are checked by
`review-packets/corpus-review/AA77/verify-bounded-profile-decisions-r1.py`.

## Decision totals

| AA77 relevance | Items |
|---|---:|
| `genuine` | 4 |
| `sibling_profile` | 28 |
| `false_positive` | 5 |
| `ambiguous` | 2 |
| `unusable` | 1 |
| **Total** | **40** |

The complete item-level reasons and source comparisons are in
`review-packets/corpus-review/AA77/bounded-profile-decisions-r1.tsv`.

## Direct AA77 evidence

### Positive place-initial 有

#### `裏面有啲乜嘢酒店啊`

Candidate: `aa77-5739dbc3da75449bdfee`.

`裏面` is overt, `有` follows it, and `啲乜嘢酒店` is an overt nominal containing
in-situ wh material. No hidden place or subject is needed. The wh expression belongs to
the introduced nominal domain rather than changing the surface place-first relation.

#### `公司有Internet`

Candidate: `aa77-e034846279ed4e6ed80b`.

The discourse supports `公司` as an institutional or spatial domain followed by `有` and
an overt nominal. Because organizations can also be construed as possessors, this item is
retained with medium confidence. It supports the spatial-domain edge of AA77 but does not
prove that all institution-initial strings have a locative analysis.

### Negative place-initial 冇

#### `裏邊冇乜嘢食𡃉咋喎`

Candidate: `aa77-231e7033943cab8d5d89`.

`裏邊` is overt and `冇` introduces `乜嘢`, with `食` visibly modifying or continuing the
nominal domain. This is a direct negative existential/availability case and requires no
positive `有` reconstruction.

#### `澳洲冇嘢睇`

Candidate: `aa77-55e6fac9a83cbc5c937d`.

The overt place `澳洲` precedes `冇` and nominal `嘢`; `睇` provides visible predicate or
modifier material. The availability interpretation is compatible with the overt
place-first negative existential profile.

## Major negative boundaries

### AA55 explicit-subject possession or availability

The packet includes overt-subject cases such as:

```text
佢有四款
你有一個禮拜六、日
佢有啲噉嘅團
我都應該有問題
```

These map to AA55's explicit-subject possessive or availability domain, subject to its own
lexical and semantic boundaries. They do not become AA77 because a place may be inferred
from the discourse.

Negative or context-dependent subject cases are retained as siblings or ambiguity; AA55's
current positive `有` profile does not automatically absorb every `冇` counterpart.

### AA56 no-place existential/presentational clauses

The packet contains no-place examples such as:

```text
有人叫New_Zealand...
從來冇人講過...
...諗過有啲乜嘢問題...
...有隻船出海
```

These provide an empirical trigger for reviewing existing AA56
`ExistentialPresentationalClause`, whose current identity remains generic. They do not
support broadening AA77 by deleting its overt-place requirement.

Recursive issue: **#347**.

### `有冇得 + predicate` opportunity questions

Four independently sourced packet items instantiate:

```text
有冇得 interview
有冇得讀
有冇得好似佢噉
有冇得平
```

The pattern is supported independently by the source distinction between `有得／冇得`
and other uses of `有／冇`. It is not ordinary V-唔-V, possession, place existence, or a
hidden introduced nominal. Because the inventory generally captures only the initial `有`
while `冇得` is a single token, a separate extraction design is required.

Recursive issue: **#348**.

### Event and property negation

Examples include:

```text
你冇去行咩
就冇生蟲
冇乜點去
都冇乜特色
冇以前參加咁多
```

These contain overt predicate, degree, frequency, or comparative material. They support
clausal/event/property boundaries, not AA77.

### Change or loss with `冇咗`

The packet contains:

```text
冇咗件事
冇咗個形
```

Overt `咗` and the loss/disappearance reading distinguish these from unmarked negative
existential `冇 + NP`. The project already has result/change research; the packet adds
boundary evidence but does not create another research branch.

### Ellipsis, coordination, and repair

Coordinated examples can inherit a location interpretation from an overt first conjunct:

```text
邊度有平嘢買，有抵嘢食
裏面有啲乜嘢酒店，同埋有啲乜嘢嘢玩
```

The second `有` does not contain its own overt place. Context supports interpretation, but
AA77 cannot silently duplicate the place into the selected span.

Discourse answers such as `今次冇` and `而家冇嚹` lack overt place and nominal material.
They remain ellipsis evidence. A false start such as `我就冇-我包咗...` is unusable for
construction membership but is retained in the packet.

### Lexical and nonconstructional matches

The query also reaches:

```text
有一日            temporal expression
帶有狗嘅味        lexical 帶有
冇用              property 'useless/not useful'
冇咁搶得咁犀利    degree comparison
```

Exact character matching is insufficient for a construction claim.

## Recursive disposition

This review followed each recurrent boundary only far enough to determine whether it
already has a project home or exposes a new empirical question.

| Exposed profile | Disposition |
|---|---|
| Explicit-subject `有 + NP` | Existing AA55; no new issue |
| No-place existential/presentational `有／冇 + nominal (+ predicate)` | Existing generic AA56 needs bounded review: #347 |
| `有冇得 + predicate` opportunity polar | No matching identity found; bounded research issue #348 |
| Pre-predicate event-assertive `有 + VP/AP` | Primary-source-supported contrast, but this packet supplies no sufficiently clean new positive cluster; no child issue from this packet |
| `冇咗 + NP` loss/change | Existing result/change family; no duplicate issue |
| Event/property negation, ellipsis, degree, repair | Boundaries only; no new construction presumed |

The recursion stops here because the two surviving questions now require their own query
endpoints, source synthesis, and runtime-overlap checks. Continuing to manufacture more
children from isolated strings would violate the evidence-trigger rule.

## AA77 disposition

### Supported research-level profile

```text
[OVERT PLACE OR SPATIAL DOMAIN] + [有 OR 冇] + [OVERT INTRODUCED NOMINAL]
```

The introduced nominal may contain overt quantity, wh, modifier, or predicate material
where the full surface structure supports it. This packet does not establish unrestricted
productivity for every such extension.

### Required exclusions

- explicit-subject possession or availability;
- no-place subjectless presentational clauses;
- pre-predicate `有 + VP/AP` event assertion;
- `有得／冇得／有冇得` possibility and polarity;
- event, property, degree, or comparative negation;
- `冇咗` change/loss;
- lexical compounds and fixed expressions;
- place supplied only by a previous conjunct or discourse;
- omitted nominal or predicate material;
- abandoned repairs.

### Status consequence

The packet supports retaining AA77 as `research_pending`. It does not establish:

- corpus-wide prevalence or productivity;
- full positive/negative lexical diversity;
- speaker or regional breadth beyond the frozen HKCanCor sample;
- role-neutral panel evidence;
- held-out behavior;
- exact runtime alignment;
- promotion readiness.

No identity, status, runtime, fixture, panel, survey, held-out, release, or deployment
change is made in this findings work.

## Limitations

1. The packet is mechanically stratified, not statistically representative.
2. It reviews 40 of 1,730 candidates and does not extrapolate decisions to the remainder.
3. The source inventory excludes utterance-initial tokens and generally misses standalone
   single-token `冇得`.
4. HKCanCor is conversational Hong Kong Cantonese from a bounded historical corpus and
   cannot establish all regional, age, or register distributions.
5. Some institutional nouns can receive both spatial-domain and possessor readings.
6. No new native-panel or survey judgment was collected.
7. Runtime constructors were not modified or fully audited in this issue.

## Protected state

Unchanged:

- permanent UUID registry;
- construction identity and linguistic status;
- runtime behavior and executable fixtures;
- source corpus and the 1,730-item inventory;
- survey, panel, and held-out evidence;
- release and deployment state;
- merge authorization.
