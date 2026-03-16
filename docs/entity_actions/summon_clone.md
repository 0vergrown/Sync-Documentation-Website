---
title: Summon Clone (Entity Action)
date: 2024-01-07
---

# Summon Clone

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Summons a clone of the player entity with configurable behavior and equipment inheritance. The clone visually mirrors the owner's skin by default, with optional support for custom textures per arm model type.

Type ID: `sync:summon_clone`

### Fields

| Field                  | Type                                                                                      | Default    | Description                                                                                            |
|------------------------|-------------------------------------------------------------------------------------------|------------|--------------------------------------------------------------------------------------------------------|
| `can_sit`              | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)             | `true`     | Whether the clone can sit when right-clicked by its owner                                              |
| `can_attack`           | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)             | `true`     | Whether the clone can attack hostile mobs                                                              |
| `follow_owner`         | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)             | `true`     | Whether the clone follows its owner                                                                    |
| `inherit_equipment`    | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)             | `true`     | Whether the clone copies the player's armor and held items at the moment of summoning                  |
| `inherit_enchantments` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)             | `true`     | Whether inherited equipment also copies its enchantments                                               |
| `wide_texture`         | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)       | *optional* | Custom skin texture used when the owner has a wide (classic/default) arm model                        |
| `slim_texture`         | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)       | *optional* | Custom skin texture used when the owner has a slim arm model                                           |
| `bientity_action`      | [Bi-Entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/) | *optional* | Action executed after the clone is summoned. The **actor** is the player who summoned the clone; the **target** is the clone itself. |

### Custom Textures

When `wide_texture` and/or `slim_texture` are set, they take top priority over the owner's skin and any active `entity_texture_overlay` replacement. The correct variant is selected automatically based on the owner's arm model:

- If both are set, the matching variant is used.
- If only one is set, it is used as a fallback for both model types.
- If neither is set, the clone falls back to the normal skin resolution (owner skin -> `entity_texture_overlay` -> Steve).

The textures are compatible with `entity_texture_overlay` in overlay mode, overlay feature renderers still draw on top as usual.

### Clone Behavior

- Clones are hostile entities internally (required for combat AI) but are tamed to the summoning player
- They defend their owner from attacks and fight whatever their owner is attacking
- Can use bows and crossbows if inherited or given equipment
- Have a default lifespan of 60 seconds (1200 ticks)

### Notes

- Only works on player entities; a warning is logged if used on anything else
- Equipment is copied at the moment of summoning and does not sync with subsequent changes to the owner's gear
- Clones cannot pick up items from the ground
- Use `sync:set_summon_max_life_ticks` via `bientity_action` to change the lifespan at summon time

### Examples
```json
{
   "type":"sync:summon_clone",
   "can_attack":true,
   "follow_owner":false,
   "inherit_equipment":true,
   "bientity_action":{
      "type":"origins:target_action",
      "action":{
         "type":"sync:set_summon_max_life_ticks",
         "amount":6000
      }
   }
}
```
Basic clone that stays in place and lasts 5 minutes

```json
{
    "type": "sync:summon_clone",
    "wide_texture": "mymod:textures/entity/clone_wide.png",
    "slim_texture": "mymod:textures/entity/clone_slim.png",
    "follow_owner": true,
    "inherit_equipment": false,
    "bientity_action": {
        "type": "apoli:target_action",
        "action": {
            "type": "apoli:apply_effect",
            "effect": {
                "id": "minecraft:glowing",
                "amplifier": 0,
                "duration": 200
            }
        }
    }
}
```
Summon a Clone with a custom skin, running an action on the clone itself after summoning
