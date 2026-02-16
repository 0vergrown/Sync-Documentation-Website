---
title: Energy Swirl (Power Type)
date: 2024-01-07
---

# Energy Swirl

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Creates a translucent energy swirl around an entity, similar to a Charged Creeper or a Wither on 50% health or less.

Type ID: `sync:energy_swirl`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`texture_location` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | `"minecraft:textures/entity/wither/wither_armor.png"` | The texture used for the energy swirl overlay. If omitted, the Wither armour texture is used.
`size` | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/) | `1.0` | The scale of the swirl relative to the entity’s normal size.
`speed` | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/) | `0.01` | The speed at which the overlay animates. Set to `0` for a completely static overlay.

### Notes

- The swirl uses **additive transparency**, giving it the glowing, ethereal look seen on charged creepers and the wither.
- The power works on any living entity (players, mobs, etc).
- The animation combines a horizontal "swirl" motion and a vertical scrolling.

### Examples

```json
{
    "type": "sync:energy_swirl",
    "texture_location": "minecraft:textures/entity/wither/wither_armor.png",
    "speed": 0.01,
    "condition": {
        "type": "origins:relative_health",
        "comparison": "<=",
        "compare_to": 0.5
    }
}
```
Renders the Wither armour overlay at normal speed when the player’s health is 50% or less.

```json
{
    "type": "sync:energy_swirl",
    "texture_location": "sync:textures/overlay/custom_energy.png",
    "size": 1.5,
    "speed": 0.05
}
```
Uses a custom texture, scales it up by 50%, and animates it five times faster than the default.

```json
{
    "type": "sync:energy_swirl",
    "texture_location": "minecraft:textures/entity/creeper/creeper_armor.png",
    "size": 1.0,
    "speed": 0
}
```
Renders the charged creeper armour as a static overlay (no animation).