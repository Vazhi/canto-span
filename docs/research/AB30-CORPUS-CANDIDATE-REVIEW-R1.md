# AB30 Corpus Candidate Review R1

## Identity

- Permanent code: `AB30`
- Canonical identity: `ZoMarkedPerfectiveObjectVP`
- Legacy runtime label: `PostverbalZoPerfectiveVP`
- Profile: lexical verb + perfective `咗` + overt licensed NP object
- Review date: 2026-07-24

## Reviewed inventory

The explicit workbench allowlist contains two small sanitized natural-conversation
sources. Its high-recall extractor produced five candidates. Every candidate is now
classified:

| Candidate | Decision | Reason |
|---|---|---|
| `飲咗酒` inside `你飲咗酒你千祈唔好開車啊` | genuine | Local `V–咗–object` constituent; the conditional frame is outside it. |
| `攞咗兩份申請表` | genuine | Overt verb, `咗`, and quantified classifier NP object. |
| `我同佢講咗啦` | false positive | Objectless reported-speech predicate; content follows in another clause. |
| `開咗五個鐘頭車` | false positive | Post-`咗` duration expression, not the narrow simple object profile. |
| `收入超咗就唔得` | false positive | Omitted comparison threshold followed by a consequence clause. |

Totals: **2 genuine**, **3 false positive**, **0 ambiguous**, **0 unusable**.

## Evidence disposition

This closes review of the current five-candidate packet. It does **not** close the
project's broader corpus-evidence gate:

- only two small user-supplied conversation sources are represented;
- the two genuine tokens do not establish unrestricted lexical or object productivity;
- frequency is not used as acceptability or productivity evidence;
- corpus review does not replace the role-neutral panel or held-out validation.

The workbench ledger remains the immutable mechanical extraction record. Expert
classifications are stored separately in `review-decisions-r1.json`, linked by stable
candidate ID and source-manifest hash. Discovery readiness must remain blocked on
broader corpus diversity, clean panel evidence, and held-out validation rather than
treating `2/5 genuine` as unrestricted corpus support.

## Files

- `review-packets/corpus-review/AB30/candidate-ledger.json`
- `review-packets/corpus-review/AB30/review-decisions-r1.json`
- `review-packets/corpus-review/AB30/source-allowlist.json`
