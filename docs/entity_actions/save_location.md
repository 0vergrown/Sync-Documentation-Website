---
title: Save Location (Entity Action)
date: 2024-01-07
---

# Save Location

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Saves an entity's current position, dimension, and rotation for later teleportation using the [Teleport To Location (Entity Action)](./teleport_to_location.md).

Type ID: `sync:save_location`

### Fields

| Field       | Type                                                                          | Default | Description                                                |
|-------------|-------------------------------------------------------------------------------|---------|------------------------------------------------------------|
| `id`        | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)   |         | Unique identifier for this saved location                  |
| `overwrite` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `true`  | Whether to overwrite an existing location with the same ID |

### How It Works

This action saves:
- Entity's current position (X, Y, Z coordinates)
- Current dimension/world
- Yaw and pitch (rotation)
- Persistence flag (determines if location survives entity despawn)

Locations are stored per-entity and per-world, persisting across server restarts. Persistent entities (players, named mobs, PathAwareEntity mobs) keep their saved locations indefinitely. Non-persistent entities (items, projectiles) have their locations cleaned up when they're removed.

### Persistence Rules

An entity's saved locations are considered persistent if the entity is:
- A player
- Has a custom name (name-tagged)
- Is a PathAwareEntity (most mobs with AI)

Non-persistent entities have their locations automatically cleaned up when:
- The entity is unloaded or removed
- The entity dies (for living entities)
- Periodic cleanup runs (every 10 minutes) and finds inactive locations

### Notes

- Each entity can have multiple saved locations with different IDs
- Locations persist through server restarts (saved in world data)
- Setting `overwrite: false` prevents replacing existing saved locations
- Maximum of one location per ID per entity
- Periodic cleanup removes locations for despawned non-persistent entities

### Examples

```json
{
    "type": "sync:save_location",
    "id": "home"
}
```
Saves the current location as "home", overwriting any previous home location.

```json
{
    "type": "apoli:if_else",
    "condition": {
        "type": "apoli:on_block",
        "block_condition": {
            "type": "apoli:block",
            "block": "minecraft:lodestone"
        }
    },
    "if_action": {
        "type": "apoli:and",
        "actions": [
            {
                "type": "sync:save_location",
                "id": "lodestone_anchor"
            },
            {
                "type": "apoli:execute_command",
                "command": "title @s actionbar {\"text\":\"Lodestone linked!\",\"color\":\"aqua\"}"
            }
        ]
    }
}
```
Saves location when standing on a lodestone, creating a teleport anchor point.

```json
{
    "type": "apoli:if_else_list",
    "actions": [
        {
            "condition": {
                "type": "apoli:sneaking"
            },
            "action": {
                "type": "sync:save_location",
                "id": "waypoint_1"
            }
        },
        {
            "condition": {
                "type": "apoli:sprinting"
            },
            "action": {
                "type": "sync:teleport_to_location",
                "id": "waypoint_1"
            }
        }
    ]
}
```
Sneak to set a waypoint, sprint to teleport back to it.