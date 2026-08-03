from pathlib import Path

path = Path('tools/verify-pedagogical-corpus-review.py')
text = path.read_text(encoding='utf-8')
start = text.index('    if schema == "canto-span-pedagogical-dialog-source-v1":\n')
end = text.index('    return items, source_ids\n', start)
new = '''    if schema == "canto-span-pedagogical-dialog-source-v1":
        turns = [row for row in items if row.get("itemType") == "dialog_turn"]
        stage_directions = [row for row in items if row.get("itemType") == "stage_direction"]
        events = [row for row in items if row.get("itemType") in {"dialog_turn", "stage_direction"}]
        vocabulary = [row for row in items if row.get("itemType") == "lexical_entry"]
        has_event_layer = bool(stage_directions) or "dialogEventCount" in ingress
        rows_by_id = {row[id_field]: row for row in rows}
        if has_event_layer:
            if (
                ingress.get("dialogEventCount") != len(events)
                or ingress.get("turnCount") != len(turns)
                or ingress.get("stageDirectionCount", 0) != len(stage_directions)
                or ingress.get("vocabularyCount") != len(vocabulary)
            ):
                fail("dialog source type counts mismatch")
            if [row.get("eventOrdinal") for row in events] != list(range(1, len(events) + 1)):
                fail("dialog event numbering drift")
            if [row.get("turn") for row in turns] != list(range(1, len(turns) + 1)):
                fail("dialog turn numbering drift")
            if [row.get("stageDirectionOrdinal") for row in stage_directions] != list(range(1, len(stage_directions) + 1)):
                fail("dialog stage-direction numbering drift")
            if any((row.get("source") or {}).get("english") is not None for row in events):
                fail("dialog event English must remain null when not supplied")
            previous_event_field = find_field(fields, ["previous_event_id"], "items.tsv")
            next_event_field = find_field(fields, ["next_event_id"], "items.tsv")
            previous_turn_field = find_field(fields, ["previous_turn_id"], "items.tsv")
            next_turn_field = find_field(fields, ["next_turn_id"], "items.tsv")
            event_ids = [row["id"] for row in events]
            for index, item_id in enumerate(event_ids):
                expected_previous = "" if index == 0 else event_ids[index - 1]
                expected_next = "" if index == len(event_ids) - 1 else event_ids[index + 1]
                row = rows_by_id[item_id]
                if row[previous_event_field] != expected_previous or row[next_event_field] != expected_next:
                    fail(f"dialog event adjacency drift: {item_id}")
            turn_ids = [row["id"] for row in turns]
            for index, item_id in enumerate(turn_ids):
                expected_previous = "" if index == 0 else turn_ids[index - 1]
                expected_next = "" if index == len(turn_ids) - 1 else turn_ids[index + 1]
                row = rows_by_id[item_id]
                if row[previous_turn_field] != expected_previous or row[next_turn_field] != expected_next:
                    fail(f"dialog turn adjacency drift: {item_id}")
            for item in stage_directions + vocabulary:
                row = rows_by_id[item["id"]]
                if row[previous_turn_field] or row[next_turn_field]:
                    fail(f"non-turn row carries spoken-turn adjacency: {item['id']}")
            for item in vocabulary:
                row = rows_by_id[item["id"]]
                if row[previous_event_field] or row[next_event_field]:
                    fail(f"lexical row carries dialog event adjacency: {item['id']}")
        else:
            if ingress.get("turnCount") != len(turns) or ingress.get("vocabularyCount") != len(vocabulary):
                fail("dialog source type counts mismatch")
            if [row.get("turn") for row in turns] != list(range(1, len(turns) + 1)):
                fail("dialog turn numbering drift")
            if any((row.get("source") or {}).get("english") is not None for row in turns):
                fail("dialog turn English must remain null when not supplied")
            previous_turn_field = find_field(fields, ["previous_turn_id"], "items.tsv")
            next_turn_field = find_field(fields, ["next_turn_id"], "items.tsv")
            turn_ids = [row["id"] for row in turns]
            for index, item_id in enumerate(turn_ids):
                expected_previous = "" if index == 0 else turn_ids[index - 1]
                expected_next = "" if index == len(turn_ids) - 1 else turn_ids[index + 1]
                row = rows_by_id[item_id]
                if row[previous_turn_field] != expected_previous or row[next_turn_field] != expected_next:
                    fail(f"dialog source adjacency drift: {item_id}")
            for item in vocabulary:
                row = rows_by_id[item["id"]]
                if row[previous_turn_field] or row[next_turn_field]:
                    fail(f"lexical row carries dialog adjacency: {item['id']}")
'''
path.write_text(text[:start] + new + text[end:], encoding='utf-8')
