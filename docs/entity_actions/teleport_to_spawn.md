---
title: Teleport to Spawn (Entity Action Type)
date: 2024-01-07
---

# Teleport to Spawn

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Teleports a player to either the world spawn point or their personal spawn point (bed/respawn anchor).

Type ID: `sync:teleport_to_spawn`

### Fields

| Field          | Type                                                                          | Default | Description                                                                                                                                         |
|----------------|-------------------------------------------------------------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `player_spawn` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `false` | If `true`, teleports to the player's personal spawn point (bed or respawn anchor). If `false`, teleports to the world spawn point in the overworld. |

### Notes

- The action only affects players; for any other entity type it does nothing.
- When teleporting to the player's spawn point:
  - If the player has a valid spawn point set (bed or respawn anchor), they are teleported to that location in the correct dimension, preserving the spawn angle (yaw).
  - If the player does not have a spawn point, or if the spawn dimension is not loaded, they will fall back to the overworld spawn point.
- The player is placed at the center of the spawn block (`x+0.5`, `z+0.5`) with the spawn's yaw and a pitch of `0`.
- The action respects the player's spawn position data as stored in the player's NBT (e.g., after sleeping in a bed or using a respawn anchor).

### Examples

```json
{
    "type": "sync:teleport_to_spawn"
}
```
Teleports the player to the world spawn (overworld spawn point).

```json
{
    "type": "sync:teleport_to_spawn",
    "player_spawn": true
}
```
Teleports the player to their personal spawn point (bed or respawn anchor) if available; otherwise to the world spawn.