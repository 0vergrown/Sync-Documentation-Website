---
title: Action on Entity Set (Entity Action)
date: 2024-01-07
---

# Action on Entity Set

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Executes a bi-entity action on entities stored in an [Entity Set](../power_types/entity_set.md) (Power Type). This allows you to perform actions on all entities in a set with optional filtering and limits.

Type ID: `sync:action_on_entity_set`

### Fields

| Field                | Type                                                                                            | Default    | Description                                           |
|----------------------|-------------------------------------------------------------------------------------------------|------------|-------------------------------------------------------|
| `set`                | [Power Type](https://origins.readthedocs.io/en/latest/types/power_types/)                       |            | The Entity Set power to act upon                      |
| `bientity_action`    | [Bi-Entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)       |            | Action to execute on each entity in the set           |
| `bientity_condition` | [Bi-Entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | Condition to filter which entities receive the action |
| `limit`              | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)                   | `0`        | Maximum number of entities to affect (0 = no limit)   |
| `reverse`            | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                   | `false`    | Whether to process entities in reverse order          |

### Notes

- The action receives a pair: (owner_of_set, entity_in_set)
- If `limit` is set, only that many entities will be affected (starting from the beginning or end if reversed)

### Examples

```json
{
    "type": "sync:action_on_entity_set",
    "set": {
        "power": "mymod:my_entity_set"
    },
    "bientity_action": {
        "type": "apoli:apply_effect",
        "effect": {
            "effect": "minecraft:glowing",
            "duration": 200,
            "amplifier": 0,
            "show_particles": false
        }
    },
    "limit": 5,
    "condition": {
        "type": "apoli:sneaking"
    }
}
```
This example applies glowing to up to 5 entities in the set when sneaking.