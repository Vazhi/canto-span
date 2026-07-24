# Private research branch guardrail

This branch contains private survey-derived research planning material.

## Mandatory merge rule

Before any pull request from this branch is merged into `main`:

1. delete `private-research-track/TEMP-SURVEY-DERIVED-RESEARCH-QUESTIONS.md`;
2. delete this guardrail file;
3. confirm that no raw survey export, individual free-text response, private participant data, or private research backlog remains in the diff;
4. retain only research notes, source ledgers, and public-safe aggregate conclusions that have passed privacy and provenance review.

Do not merge this branch while either file remains present.

Research work on this branch must add new files only. Do not modify existing repository files, generated identity/discovery outputs, parser code, tests, fixtures, workflows, grammar status, or release metadata.