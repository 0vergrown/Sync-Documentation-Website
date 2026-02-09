---
title: Teleport To Saved Location (Entity Action)
date: 2024-01-07
---

# Teleport To Saved Location

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Teleports an entity to a location previously saved with the [Save Location (Entity Action)](./save_location.md).

Type ID: `sync:teleport_to_location`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`id` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | | The identifier of the saved location to teleport to

### How It Works

This action retrieves a saved location by its ID and teleports the entity to it. The teleportation:
- Moves the entity to the exact saved coordinates
- Changes dimensions if necessary
- Restores the saved yaw and pitch (view direction)
- Works across dimensions (Overworld ↔ Nether ↔ End)
- Stops any riding/navigation for mobs

The action handles dimension changes automatically, creating the entity in the target dimension if needed.

### Player vs Non-Player Behavior

**For Players:**
- Uses Minecraft's built-in player teleportation
- Preserves all player state across dimension changes
- Rotation is properly applied

**For Non-Player Entities:**
- Uses entity world transfer for dimension changes
- Stops pathfinding for mobs
- Dismounts any ridden entities
- Proper rotation and head yaw applied

### Notes

- Does nothing if no location with the specified ID exists
- Does nothing if the target chunk isn't loaded (for non-players)
- Target dimension must exist
- Saved locations persist across server restarts
- Works on any entity, not just players

### Examples

```json
{
    "type": "sync:teleport_to_location",
    "id": "home"
}
```
Teleports to the saved "home" location.

```json
{
    "type": "apoli:if_else",
    "condition": {
        "type": "apoli:resource",
        "resource": "sync:recall_cooldown",
        "comparison": "==",
        "compare_to": 0
    },
    "if_action": {
        "type": "apoli:and",
        "actions": [
            {
                "type": "sync:teleport_to_location",
                "id": "lodestone_anchor"
            },
            {
                "type": "apoli:change_resource",
                "resource": "sync:recall_cooldown",
                "change": 100
            }
        ]
    },
    "else_action": {
        "type": "apoli:execute_command",
        "command": "title @s actionbar {\"text\":\"Recall on cooldown!\",\"color\":\"red\"}"
    }
}
```
Teleports to a lodestone anchor with cooldown management.

```json
{
    "type": "apoli:choice",
    "actions": [
        {
            "element": {
                "type": "sync:teleport_to_location",
                "id": "waypoint_1"
            },
            "weight": 1
        },
        {
            "element": {
                "type": "sync:teleport_to_location",
                "id": "waypoint_2"
            },
            "weight": 1
        },
        {
            "element": {
                "type": "sync:teleport_to_location",
                "id": "waypoint_3"
            },
            "weight": 1
        }
    ]
}
```
Randomly teleports to one of three saved waypoints.