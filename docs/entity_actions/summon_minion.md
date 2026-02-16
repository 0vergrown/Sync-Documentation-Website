---
title: Summon Minion (Entity Action)
date: 2024-01-07
---

# Summon Minion

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Summons a customizable minion entity that can follow the owner and has configurable appearance.

Type ID: `sync:summon_minion`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`texture` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | `sync:textures/entity/minion_template.png` | Texture for the minion
`follow_owner` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | | Whether the minion follows its owner
`follow_offset` | [Vector](https://origins.readthedocs.io/en/latest/types/data_types/vector/) | *optional* | Offset position when following
`scale` | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/) | `1.0` | Size multiplier for the minion
`invulnerable` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `false` | Whether the minion can take damage
`max_life_ticks` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `1200` | Lifespan in ticks (20 ticks = 1 second)
`bientity_action` | [Bi-Entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/) | *optional* | Action to execute on the minion after summoning

### Minion Behavior

- Minions are small, floating entities by default
- When following, they maintain a fixed offset relative to the owner
- They don't attack or have AI by default
- Can be made invulnerable for decorative purposes
- Automatically join the owner's team if possible

### Notes

- Minions use a custom 3D model with layered spheres
- The default texture is a template that can be overridden
- Following minions have no gravity and teleport with the owner
- Offset is relative to the owner's rotation

### Examples

```json
{
    "type": "sync:summon_minion",
    "texture": "mymod:textures/entity/fairy.png",
    "follow_owner": true,
    "follow_offset": [0, 2, 1],
    "scale": 0.5,
    "invulnerable": true,
    "max_life_ticks": 400
}
```
This example summons a small invulnerable fairy minion that floats above and behind the owner for 20 seconds.