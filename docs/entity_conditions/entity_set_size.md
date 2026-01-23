---
title: Entity Set Size (Entity Condition)
date: 2024-01-07
---

# Entity Set Size

Compares the number of entities in an [Entity Set power](../power_types/entity_set.md) against a value.

Type ID: `sync:entity_set_size`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`set` | [Power Type](https://origins.readthedocs.io/en/latest/types/data_types/power_type/) | | The Entity Set power to check
`comparison` | [Comparison](https://origins.readthedocs.io/en/latest/types/data_types/comparison/) | | How to compare the size
`compare_to` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | | Value to compare against

### Notes

- Only works on entities that have the specified Entity Set power
- Counts all entities currently in the set (including temporary ones)

### Examples

```json
{
    "type": "sync:entity_set_size",
    "set": {
        "power": "mymod:minion_set"
    },
    "comparison": "<",
    "compare_to": 5
}
```
This example checks if the entity has fewer than 5 minions in its set.