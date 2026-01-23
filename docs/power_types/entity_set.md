---
title: Entity Set (Power Type)
date: 2024-01-07
---

# Entity Set

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Maintains a dynamic set of entities with the ability to execute actions when entities are added or removed.

Type ID: `sync:entity_set`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`action_on_add` | [Bi-Entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/) | *optional* | Action executed when an entity is added to the set.
`action_on_remove` | [Bi-Entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/) | *optional* | Action executed when an entity is removed from the set.
`tick_rate` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `1` | How often (in ticks) the set checks for temporary entity expiration.

### Notes

- In the context of this power type, the "**actor**" will be the entity that has the power while the "**target**" will be the entities within the set.
- Entities can be added temporarily with a duration
- The set persists across game sessions (saved to NBT). 
- Works with any entity type, not just living entities
- Use `tick_rate` to balance performance vs responsiveness
- The power ticks even when inactive to manage temporary entities

### Examples

```json
{
    "type": "sync:entity_set",
    "action_on_add": {
        "type": "apoli:apply_effect",
        "effect": {
          "effect": "minecraft:glowing",
          "duration": 100,
          "amplifier": 0,
          "is_ambient": false,
          "show_particles": false,
          "show_icon": true
        }
    },
    "action_on_remove": {
        "type": "apoli:apply_effect",
        "effect": {
          "effect": "minecraft:slowness",
          "duration": 200,
          "amplifier": 2,
          "is_ambient": false,
          "show_particles": false,
          "show_icon": true
        }
    },
    "tick_rate": 20
}
```
This example applies glowing to entities when added and slowness when removed, checking every second.