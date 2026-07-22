# CP046-P1 Grammar status-directory migration R1

## Decision

Store each canonical current construction note in the folder matching its linguistic `status` rather than in a folder matching workflow state.

The canonical paths are:

```text
grammar/supported_productive/
grammar/provisional_reaudit/
grammar/provisional/
grammar/research_pending/
grammar/unsupported_generalization/
grammar/lexicalized_only/
grammar/parser_heuristic/
```

`grammar/retired/README.md` is a navigation index only. Retired labels remain outside the current runtime-label and construction-note registries.

## Reason

The former `grammar/active/` and `grammar/archived/` layout made workflow state immediately visible but obscured the more important linguistic status. With 165 current notes and only two active workflow items, manual research review required repeatedly consulting frontmatter or the root index to determine which claims were:

- research questions;
- unsupported generalizations;
- lexicalized-only records;
- parser heuristics;
- provisional or supported claims.

The new layout makes the status inventory visible directly in the filesystem and in Obsidian while preserving one canonical note per construction.

## Workflow separation

Workflow state remains independent of linguistic status:

- `workflow_state: active` marks the two currently selected research notes;
- `workflow_state: archived` means parked rather than retired;
- workflow changes do not move files;
- linguistic status changes move files and update frontmatter in the same commit.

The two active notes remain:

1. `ResourceUseLaiFunctionRelation` — `research_pending`;
2. `PostverbalZoPerfectiveVP` — `research_pending`.

## Migration scope

- moved 165 canonical construction notes without changing their contents;
- added status-folder guides and a central `grammar/README.md`;
- regrouped `GRAMMAR-INDEX.md` by linguistic status;
- added a retired-label navigation table;
- changed note loaders to read controlled status directories;
- changed validation to require folder/status agreement;
- changed release comparison to read both historical workflow layouts and the current status layout;
- removed remaining fixed path assumptions from current documentation and tools.

## Non-changes

This migration changes no:

- parser span or token role;
- runtime construction label;
- linguistic status or confidence;
- source, corpus, or panel record;
- standardized test case or expected output;
- active research priority;
- retirement disposition.

## Manual review entry points

- `grammar/README.md` — folder meanings and recommended review order;
- `GRAMMAR-INDEX.md` — all current notes grouped by status with source, boundary, lane, review-date, and workflow summaries;
- `grammar/retired/README.md` — complete retired-label navigation table.

## Verification intent

The existing verification profiles must establish:

- one canonical note per runtime label;
- note filename and construction-name agreement;
- status-folder/frontmatter agreement;
- workflow-state validity independent of path;
- unchanged status counts and active working set;
- unchanged parser tests and construction assertions;
- release comparison compatibility with the pre-v0.5.203 layout.

No new verifier or version-specific validation directory is introduced.
