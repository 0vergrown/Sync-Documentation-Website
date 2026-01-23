---
title: Action on Death (Power Type)
date: 2024-01-07
---

# Action on Death

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Triggers a bi-entity action when the entity with this power dies.

Type ID: `sync:action_on_death`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_action` | [Bi-Entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/) | | The action to execute when the entity dies. Receives a pair: (killer, victim).
`bientity_condition` | [Bi-Entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | Condition that must be met between killer and victim.
`damage_condition` | [Damage Condition](https://origins.readthedocs.io/en/latest/types/damage_condition_types/) | *optional* | Condition that must be met by the damage source and amount.

### Notes

- The action is executed server-side only
- If there's no killer (environmental damage, suicide), the first element of the pair will be `null`
- Both conditions are optional - if omitted, the action always triggers on death
- The power must be active (all its conditions met) at the time of death

### Examples

```json
{
    "type": "sync:action_on_death",
    "bientity_action": {
        "type": "apoli:explode",
        "power": 4.0,
        "destruction_type": "break",
        "indestructible": {
            "type": "apoli:in_tag",
            "tag": "minecraft:dirt"
        }
    },
    "bientity_condition": {
        "type": "apoli:attacker",
        "entity_condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:player"
        }
    }
}
```
This example causes the entity to explode when killed by a player.
```json
{
    "type": "sync:action_on_death",
    "bientity_action": {
        "type": "apoli:grant_power",
        "power": "my_namespace:revenge_strength",
        "source": "my_namespace:revenge"
    },
    "damage_condition": {
        "type": "apoli:amount",
        "comparison": ">=",
        "compare_to": 10
    }
}
```
This example grants a revenge power to the killer when the entity takes 10 or more damage in the killing blow.