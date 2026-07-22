# CP038-P1 speech, transfer, and complement wrapper audit

Date: 2026-07-22

Runtime checkpoint: v0.5.194

Scope: constructor-specific implementation reachability for six speech, transfer, naming, intention, and complement wrappers. No survey evidence, parser-span change, or linguistic promotion is involved.

## Family reviewed

This checkpoint reviews six labels that remained `no_direct_cases` after v0.5.193:

- `SpeechTransferClause`
- `DitransitiveSpeechVP`
- `IntentionFrame`
- `PossessiveTransferClause`
- `NamingClause`
- `VPComplementFrame`

The audit asks only whether the current implementation can emit each label in complete parser output. Reachability is not treated as evidence that the label names a valid or productive Cantonese construction.

## Runtime findings

### STCWRAP-001A and STCWRAP-001B — speech-effect sequence

`我唔話你知。` reaches both the outer `SpeechTransferClause` and nested `DitransitiveSpeechVP`. This exact negative surface is independently attested, but the runtime routing is sensitive to the negated clause: `我話你知。` currently routes through `ReportedSpeech` and `CognitionStatementClause` rather than these two labels.

The probes therefore protect only the current negative route. They do not establish unrestricted lexical productivity or the necessity of a separate outer wrapper.

### STCWRAP-002 — lexicalized intention route

`我諗住返屋企。` reaches `IntentionFrame` with a visible motion VP. The subjectless `諗住返屋企。` instead reaches `VerbComplementVP`, showing that complete-output routing is narrower than token presence alone.

The probe does not resolve the intention, assumption, maintained-thought, or ordinary aspectual readings associated with `諗住` and other `V住` forms.

### STCWRAP-003 — possession plus modal transfer

`我有本書要畀你。` reaches `PossessiveTransferClause`, with nested nominal and recipient structure preserved. The wrapper combines possession, a classifier-headed object, modality, transfer, and recipient in one frame.

The probe protects that exact implementation route only. Checked evidence for the component relations is not treated as proof of the combined wrapper.

### STCWRAP-004 — bounded naming fallback

`我叫做 Chris。` reaches `NamingClause`. The current fallback requires exactly a subject, `叫做`, and a name-like final node; ASCII names provide the cleanest observed complete-output route.

Checked personal-naming evidence primarily uses `叫`, while `叫做` is also used for definitions and category labels. The probe therefore records an implementation path with a known lexical-analysis gap rather than validating the runtime claim.

### STCWRAP-005 — broad VP-complement wrapper

`我記得要返屋企。` reaches `VPComplementFrame` and keeps the following motion VP visible. The wrapper is an internal representation for a predicate followed by a VP complement.

The probe does not establish that every predicate may take every VP complement. Predicate-specific complement licensing remains a separate research requirement.

## Evidence accounting

- six implementation-only probes were added;
- every probe has linguistic evidence weight **0**;
- no panel, corpus, or source count changed;
- no construction status changed;
- no runtime label was retired;
- no recognized parser span changed.

## Result

- labels reviewed: **6**;
- implementation-positive labels added: **6**;
- labels retired: **0**;
- parser recognized-span behavior changed: **no**;
- linguistic status changed: **no**;
- linguistic evidence weight added: **0**;
- remaining `no_direct_cases`: **23**.
