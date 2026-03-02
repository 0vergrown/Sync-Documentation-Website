---
title: In Entity Set (Bientity Condition)
date: 2024-01-07
---

# In Entity Set

Checks if the target entity is contained within the actor's [Entity Set](../power_types/entity_set.md) (Power Type).

Type ID: `sync:in_entity_set`

### Fields

| Field | Type                                                                                | Default | Description                   |
|-------|-------------------------------------------------------------------------------------|---------|-------------------------------|
| `set` | [Power Type](https://origins.readthedocs.io/en/latest/types/data_types/power_type/) |         | The Entity Set power to check |

### Notes

- Checks if `target` is in `actor`'s entity set
- Both entities must be valid and loaded
- Can be used to filter actions to only affect entities in a set

### Examples

```json
{
    "type": "sync:in_entity_set",
    "set": {
        "power": "mymod:minion_set"
    }
}
```
This example checks if the target entity is one of the actor's minions.