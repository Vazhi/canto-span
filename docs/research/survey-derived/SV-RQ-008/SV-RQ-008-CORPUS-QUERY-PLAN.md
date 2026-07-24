---
research_id: SV-RQ-008
document: corpus_query_plan
status: planned
created: 2026-07-24
execution_status: not_started
---

# SV-RQ-008 corpus query and review plan

## Purpose

Collect contextualized attestations of `V完咗O` and matched alternatives without treating raw hit counts as productivity evidence.

## Query families

Search exact and segmented variants for:

- `完咗`
- `食完咗`
- `睇完咗`
- `寫完咗`
- `做完咗`
- `搬完咗`
- `飲完咗`
- `聽完咗`
- `畫完咗`
- `洗完咗`

For every verb, also query matched forms:

- `V完O`
- `V完O喇`
- `V咗O`

## Inclusion requirements

A candidate must preserve:

- original source identifier;
- exact text;
- left and right context;
- speaker or source variety when known;
- source genre;
- date;
- transcription provenance;
- whether the text is spontaneous, scripted, edited, or pedagogical.

## Exclusions

Do not count:

- parser fixtures;
- generated survey items;
- grammar explanations repeating the target;
- machine-generated examples;
- duplicate mirrors;
- Mandarin examples;
- examples without enough context to identify the object boundary.

## Manual classification

For each retained occurrence record:

- lexical verb;
- verb class;
- object text;
- object definiteness/quantization;
- overt subject;
- temporal adverbial;
- final particle;
- negation or modality;
- clause type;
- discourse function;
- region/variety;
- confidence that `完` is completive inner aspect;
- confidence that `咗` is outer perfective;
- reviewer decision: genuine / false positive / ambiguous / unusable.

## Evidence rule

Corpus attestation can establish occurrence and contextual distribution. It cannot by itself establish unrestricted productivity, universal acceptability, or a parser boundary.
