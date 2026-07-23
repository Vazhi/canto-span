---
title: UC-RQ-004/005 — HKCanCor equative and surpass-comparative attestation
research_ids:
  - UC-RQ-004
  - UC-RQ-005
date: 2026-07-23
implementation_authorized: false
---

# UC-RQ-004/005 — HKCanCor equative and surpass-comparative attestation

## Scope and method

This checkpoint uses the official CC BY UTF-8 HKCanCor release at
`fcbond/hkcancor` commit `39aeadf920e0b5ca93d0ad7792c59e740e7bdd65`
(archive SHA-256
`09223963b8756254e15353cad843f8a4b0cbc4b9223dc8a8fa27fb1cf846057e`).

Two narrow searches were used:

- all 39 tagged `一樣 jat1joeng6` tokens, plus `好似 hou2ci5` utterances
  containing degree `咁 gam3`;
- all 403 standalone `過 gwo3` tokens, narrowed mechanically to 79 immediate
  adjective-`過/u/gwo3` sequences and then screened for overt standards,
  differentials, fragments, and omitted-standard readings.

The POS tag `/u/` occurs on both clear comparative and experiential tokens, so the
corpus tag cannot itself disambiguate the construction.

## UC-RQ-004 equative profiles

| Corpus locator | Surface | Adjudication |
|---|---|---|
| `FC-012_v:2689` | `好似手掌咁大。` | resemblance equative, nominal standard, adjectival parameter |
| `FC-025_v:4923` | `你估我哋好似佢咁有錢咩？` | overt comparee, pronoun standard, adjectival parameter, question |
| `FC-105_v2:1991` | `細細聲唱歌，好似蚊滋咁細聲噉。` | resemblance equative with manner/degree parameter |
| `FC-R007_v2:2034` | `你個火溫未必好似佢咁靚。` | negated resemblance equative with overt comparee and standard |
| `FC-045_v2:5155` | `原來我個英文名同佢阿哥英文名一樣。` | `同 Standard 一樣` equality with no overt following parameter |
| `FC-106b_v2:1634` | `上面嗰啲咪同普通沙灘一樣。` | `同 Standard 一樣` resemblance/equality with no overt parameter |

No adjacent `一樣咁` token occurred among the 39 `一樣` hits. This does not
contradict Lai's modern Hong Kong judgments: HKCanCor was recorded in 1997–1998,
is small for a subtype census, and was not designed to elicit comparison. It does
show that the naturally attested `好似 Standard 咁 Parameter` subtype and
parameterless `同 Standard 一樣` profile must remain visible rather than being
collapsed into the source-preferred `同 Standard 一樣咁 Parameter` core.

## UC-RQ-005 surpass-comparative profiles

| Corpus locator | Surface | Adjudication |
|---|---|---|
| `FC-028_v2:6664` | `靚仔都靚仔過佢少少喇起碼。` | adjective + `過` + pronoun standard + differential |
| `FC-035_v2:408` | `我個friend真係啲方向感好過我好多。` | property predicate + pronoun standard + post-standard differential |
| `FC-052_v2:1389` | `我覺得佢係高解像過啲LD囖。` | property predicate + plural-classifier nominal standard |
| `FC-105_v2:1208` | `啲頭髮生出來重靚過以前。` | property predicate + temporal standard |
| `FC-105_v2:1922` | `我覺得佢啲歌好聽過郭富城喎。` | property predicate + proper-name standard |
| `FC-108d_v2:2630` | `重新過我嗰本喎，Cobuild。` | property predicate + demonstrative nominal standard |
| `FC-108a_v2:6331` | `重辛苦過A-level啊真係。` | property predicate + event/stage standard |
| `FC-108a_v2:6379` | `我都覺得自己勤力過A-level好多，我都未試過咁勤力𡃉真係。` | comparative `勤力過 Standard + differential` followed by experiential `試過`; same-utterance polysemy boundary |

The 79-candidate pool also contains questions, clausal standards, omitted
standards, fragments, and lexicalized `好過` comparisons. The retained examples
establish natural modern use and several standard/differential profiles; they do
not authorize all candidates as one parser pattern.

## Disposition

| Action | Result |
|---|---|
| **Promote** | UC-RQ-004 becomes a typed equative research family with naturally attested resemblance `好似 Standard 咁 Parameter` and parameterless `同 Standard 一樣` profiles. |
| **Quarantine** | Exact productivity and parameter licensing of `同 Standard 一樣咁 Parameter` remain source-backed but corpus-unconfirmed in this checkpoint. |
| **Promote** | UC-RQ-005 `property predicate + 過 + overt standard` is naturally attested as a dedicated surpass-comparative research construction, including post-standard differentials. |
| **Quarantine** | Omitted standards, fragmentary candidates, full predicate inventory, and dative/iterative `過` boundaries remain unresolved. |
| **Retire** | Retire any merger of equative and surpass comparison, reuse of retired `ComparativeStative`, or disambiguation of comparative/experiential `過` from token identity or corpus POS tag alone. |

No parser, lexicon, schema, or grammar-status change follows from this packet.
