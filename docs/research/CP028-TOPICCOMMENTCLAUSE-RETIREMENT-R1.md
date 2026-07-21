# CP028 TopicCommentClause retirement R1

Status: **retired from the active grammar table**

Runtime behavior changed: **no recognized construction output changed**

`TopicCommentClause` had no runtime constructor, no accepted fixture, no direct standardized test, and no current output hit. It duplicated the active `TopicComment` name and had been recommended for retirement in the R34, R35, and R37 internal-disposition records.

Actions:

- removed the dormant label from `CONSTRUCTION_LABEL_REGISTRY`;
- removed its current construction note and empty standardized test;
- preserved the full prior note under `archive/retired-labels/v0.5.186-active-reaudit-closure/`;
- appended the retirement to `RETIRED-CONSTRUCTION-ARCHIVE-v0.5.186-R1.tsv`;
- removed current wiki links that treated it as an active construction.

The retirement does not claim that Cantonese lacks topic-comment clauses. It removes only an unused duplicate parser label. Future language-sensitive work remains under `TopicComment`, `Topic`, and `Comment` or a newly evidenced subtype.
