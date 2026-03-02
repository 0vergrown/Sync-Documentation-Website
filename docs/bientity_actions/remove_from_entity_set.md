---
title: Remove from Entity Set (Bientity Action Type)
date: 2024-01-07
---

# Remove from Entity Set

[Bientity Action Types](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)

Removes the target entity from an Entity Set power on the actor entity.

Type ID: `sync:remove_from_entity_set`

### Fields

| Field | Type                                                                      | Default | Description                                     |
|-------|---------------------------------------------------------------------------|---------|-------------------------------------------------|
| `set` | [Power Type](https://origins.readthedocs.io/en/latest/types/power_types/) |         | The Entity Set power to remove the target from. |

### Notes

- The actor must have the specified Entity Set power
- If the entity isn't in the set, nothing happens
- The removal action is executed immediately
- This works for both permanent and temporary set members

### Examples

```json
{
    "type": "sync:remove_from_entity_set",
    "set": {
        "type": "sync:entity_set"
    }
}
```
This example removes the target entity from the actor's Entity Set power.