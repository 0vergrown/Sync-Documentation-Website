---
title: Spawn Entity (Block Action)
date: 2024-01-07
---

# Spawn Entity

Spawns an entity at a block position. This is a block action that can be used in block-related events.

Type ID: `sync:spawn_entity`

### Fields

Field | Type | Default    | Description
------|------|------------|-------------
`entity_type` | [Entity Type](https://origins.readthedocs.io/en/latest/types/data_types/entity_type/) |            | Type of entity to spawn
`tag` | [NBT](https://origins.readthedocs.io/en/latest/types/data_types/nbt/) | *optional* | NBT data for the entity
`entity_action` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional*     | Action to execute on the spawned entity

### Notes

- Spawns at the center of the block position
- Can include passengers in NBT data
- Entity action is executed immediately after spawning
- Useful for creating block-triggered spawners or traps

### Examples

```json
{
    "type": "sync:spawn_entity",
    "entity_type": "minecraft:item",
    "tag": "{Item:{id:\"minecraft:diamond\",Count:1b}}",
    "entity_action": {
        "type": "apoli:add_velocity",
        "y": 0.5
    }
}
```
This example spawns a diamond item that pops up from the block.