# Corpus-First Evaluation Protocol

> **CP020R2-RA1 state — 2026-07-17:** The indefinite new-grammar freeze and replacement-only rule remain retired. Legacy Cantonese-language claims remain non-promotable until reconstructed from screened external evidence; future grammar must follow the authority-origin lifecycle. Parser `v0.5.174` is accepted after full rendered review; there is no active candidate.

## Purpose

Use independently produced Cantonese data to discover attestations, restrictions, variation, counterexamples, and alternative analyses. Corpus data are not self-interpreting.

## Required provenance

For every retained example record:

- corpus/source identity;
- document/episode/file;
- speaker or participant when available;
- turn or line ID;
- genre/register;
- date/period and variety where relevant;
- full local context;
- exact query and search method;
- duplicate/reuse handling;
- manual interpretation;
- direct versus inferred evidence;
- design or held-out membership;
- redistribution restriction.

## Candidate classes

Distinguish:

- exact surface attestation;
- morphological-family match;
- semantic candidate;
- superficially similar but competing analysis;
- negative/boundary item;
- unresolved context item.

Do not count all classes as equal support.

## Manual adjudication

Every corpus candidate used in a disposition must be read in context. Automated segmentation, dependency labels, parser output, and frequency are routing aids only.

## Held-out discipline

Freeze independently sourced held-out rows before evaluation. Do not tune expectations to those rows. Record false positives, false negatives, and false-clean structures.

## External data boundary

Restricted corpora, HKCanCor workspaces, environments, and raw source rows remain outside distributable packages. Preserve provenance and restrictions; package only permitted derived records.
