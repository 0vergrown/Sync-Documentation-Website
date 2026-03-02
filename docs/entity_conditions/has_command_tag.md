---
title: Has Command Tag (Entity Condition)
date: 2024-01-07
---

# Has Command Tag

Checks if an entity has specific command tags. Command tags are metadata that can be added to entities using the `/tag` command.

Type ID: `sync:has_command_tag`

### Fields

| Field          | Type                                                                                                                                                     | Default    | Description                            |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|------------|----------------------------------------|
| `command_tag`  | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)                                                                              | *optional* | Single tag to check for                |
| `command_tags` | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | *optional* | Multiple tags that must all be present |

### Notes

- If both fields are omitted, checks if the entity has any command tags
- Command tags are different from NBT tags - they're managed with `/tag`
- Works with any entity, not just players

### Examples

```json
{
    "type": "sync:has_command_tag",
    "command_tag": "marked_for_death"
}
```
This example checks if an entity has the `marked_for_death` tag.
```json
{
    "type": "sync:has_command_tag",
    "command_tags": [
      "team_red",
      "alive"
    ]
}
```
This example checks if an entity has both "team_red" and "alive" tags.