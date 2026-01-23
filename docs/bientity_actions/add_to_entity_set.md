---
title: Add to Entity Set (Bientity Action Type)
date: 2024-01-07
---

# Add to Entity Set

[Bientity Action Types](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)

Adds the target entity to an Entity Set power of the actor entity.

Type ID: `sync:add_to_entity_set`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`set` | [Power Type](https://origins.readthedocs.io/en/latest/types/power_types/) | | The Entity Set power to add the target to.
`time_limit` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | *optional* | Duration (in ticks) the entity should remain in the set. After this time, the entity is automatically removed.

### Notes

- The actor must have the specified Entity Set power
- The target entity will be added with any `action_on_add` specified in the Entity Set power
- If the entity is already in the set, nothing happens
- Negative or zero `time_limit` values are invalid and will be ignored

### Examples

```json
{
    "type": "sync:add_to_entity_set",
    "set": {
        "type": "sync:entity_set"
    }
}
```
This example adds the target entity to the actor's Entity Set power.