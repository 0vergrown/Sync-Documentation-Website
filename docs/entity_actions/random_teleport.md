---
title: Random Teleport (Entity Action)
date: 2024-01-07
---

# Random Teleport

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Teleports an entity to a random location within a defined area, with configurable landing conditions and success/failure actions.

Type ID: `sync:random_teleport`

### Fields

| Field                     | Type                                                                                        | Default        | Description                                                                  |
|---------------------------|---------------------------------------------------------------------------------------------|----------------|------------------------------------------------------------------------------|
| `area_width`              | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                   | `8.0`          | The width of the teleport search area (diameter)                             |
| `area_height`             | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                   | `8.0`          | The height of the teleport search area (diameter)                            |
| `heightmap`               | [Heightmap Type](https://origins.readthedocs.io/en/latest/types/data_types/heightmap_type/) | *optional*     | Optional heightmap type to find valid positions                              |
| `attempts`                | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)               | *(calculated)* | Number of random positions to try (defaults to area_width*2 + area_height*2) |
| `landing_block_condition` | [Block Condition](https://origins.readthedocs.io/en/latest/types/block_condition_types/)    | *optional*     | Condition that landing block must satisfy                                    |
| `landing_condition`       | [Entity Condition](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)  | *optional*     | Condition that the teleported entity must satisfy at landing location        |
| `landing_offset`          | [Vector](https://origins.readthedocs.io/en/latest/types/data_types/vector/)                 | `[0, 0, 0]`    | Offset from the found landing position                                       |
| `loaded_chunks_only`      | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)               | `true`         | Whether to only teleport to already loaded chunks                            |
| `success_action`          | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)        | *optional*     | Action to execute on successful teleport                                     |
| `fail_action`             | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)        | *optional*     | Action to execute if all attempts fail                                       |

### Notes

- The action will try multiple random positions until it finds a valid one or runs out of attempts
- Default landing block condition requires a solid block
- Default landing condition requires the entity to fit without collisions and not be in fluid

### Examples

```json
{
    "type": "sync:random_teleport",
    "area_width": 16.0,
    "area_height": 8.0,
    "heightmap": "world_surface",
    "landing_block_condition": {
        "type": "apoli:in_tag",
        "tag": "minecraft:dirt_like"
    },
    "success_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:entity.enderman.teleport"
    }
}
```
This example teleports the entity to a random dirt-like surface within 16 blocks horizontally and 8 blocks vertically.