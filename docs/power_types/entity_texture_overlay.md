---
title: Entity Texture Overlay (Power Type)
date: 2024-01-07
---

# Entity Texture Overlay

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Applies custom textures to entities, either as replacements or overlays. Supports both "wide" and "slim" player models with color tinting options.

Type ID: `sync:entity_texture_overlay`

### Fields

| Field                   | Type                                                                                | Default | Description                                                    |
|-------------------------|-------------------------------------------------------------------------------------|---------|----------------------------------------------------------------|
| `wide_texture_location` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) |         | Texture location for wide-armed models.                        |
| `slim_texture_location` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) |         | Texture location for slim-armed models.                        |
| `show_first_person`     | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)       | `false` | Whether to show the texture in first-person view.              |
| `render_as_overlay`     | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)       | `false` | If true, renders over existing texture; if false, replaces it. |
| `red`                   | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)           | `1.0`   | Red color channel multiplier (0.0-1.0).                        |
| `green`                 | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)           | `1.0`   | Green color channel multiplier (0.0-1.0).                      |
| `blue`                  | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)           | `1.0`   | Blue color channel multiplier (0.0-1.0).                       |
| `alpha`                 | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)           | `1.0`   | Alpha/transparency (0.0-1.0).                                  |
| `hide_cape`             | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)       | `false` | Whether to hide the player's cape.                             |

### Examples

```json
{
    "type": "sync:entity_texture_overlay",
    "wide_texture_location": "mymod:textures/overlay/wide_glow.png",
    "slim_texture_location": "mymod:textures/overlay/slim_glow.png",
    "render_as_overlay": true,
    "show_first_person": true,
    "red": 0.0,
    "green": 1.0,
    "blue": 0.0,
    "alpha": 0.5,
    "condition": {
        "type": "apoli:sneaking"
    }
}
```
This example applies a semi-transparent green glow overlay when sneaking, visible in first person.
```json
{
    "type": "sync:entity_texture_overlay",
    "wide_texture_location": "mymod:textures/skins/hero_wide.png",
    "slim_texture_location": "mymod:textures/skins/hero_slim.png",
    "render_as_overlay": false,
    "hide_cape": true,
    "condition": {
        "type": "apoli:equipped_item",
        "equipment_slot": "mainhand",
        "item_condition": {
            "type": "apoli:ingredient",
            "ingredient": {
                "item": "minecraft:nether_star"
            }
        }
    }
}
```
This example replaces the player's skin texture when holding a nether star, hiding their cape.