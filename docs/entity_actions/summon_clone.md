---
title: Summon Clone (Entity Action)
date: 2024-01-07
---

# Summon Clone

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Summons a clone of the player entity with configurable behavior and equipment inheritance.

Type ID: `sync:summon_clone`

### Fields

| Field                  | Type                                                                                      | Default    | Description                                     |
|------------------------|-------------------------------------------------------------------------------------------|------------|-------------------------------------------------|
| `can_sit`              | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)             | `true`     | Whether the clone can sit when interacted with  |
| `can_attack`           | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)             | `true`     | Whether the clone can attack hostile mobs       |
| `follow_owner`         | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)             | `true`     | Whether the clone follows its owner             |
| `inherit_equipment`    | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)             | `true`     | Whether the clone copies the player's equipment |
| `inherit_enchantments` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)             | `true`     | Whether to copy enchantments from equipment     |
| `bientity_action`      | [Bi-Entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/) | *optional* | Action to execute on the clone after summoning  |

### Clone Behavior

- Clones are hostile entities (for combat AI purposes) but are tamed to the player
- They defend their owner from attacks and attack what their owner attacks
- Can use bows and crossbows if equipped
- Have a default lifespan of 60 seconds (1200 ticks)
- Can be made permanent with other actions

### Notes

- Only works on player entities
- Clones use the player's skin texture
- Equipment inheritance includes armor and held items
- Clones are temporary by default (use `set_summon_max_life_ticks` to change)

### Examples

```json
{
    "type": "sync:summon_clone",
    "can_attack": true,
    "follow_owner": false,
    "inherit_equipment": true,
    "bientity_action": {
        "type": "sync:set_summon_max_life_ticks",
        "amount": 6000
    }
}
```
This example summons a clone that stays in place (doesn't follow), inherits equipment, and lasts 5 minutes.