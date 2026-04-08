---
title: Prevent Teleport (Power Type)
date: 2026-04-08
---

# Prevent Teleport

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Prevents the holder from being teleported by any means while the power is active.

Type ID: `sync:prevent_teleport`

### Fields

| Field           | Type                                                                                 | Default    | Description                                                    |
|-----------------|--------------------------------------------------------------------------------------|------------|----------------------------------------------------------------|
| `entity_action` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional* | Executed on the entity each time a teleport attempt is blocked |

### Blocked Teleport Sources

The following teleport mechanisms are all intercepted:

| Source                      | Notes                                                                                      |
|-----------------------------|--------------------------------------------------------------------------------------------|
| `/tp` command               | Blocked regardless of dimension                                                            |
| Spectator menu click        | Clicking an entity in spectator mode to teleport to it is blocked                          |
| Sync's Teleport to Location | Blocked including cross-dimension teleports                                                |
| Sync's Teleport to Spawn    | Blocked including cross-dimension teleports                                                |
| Sync's Random Teleport      | Blocked; the action fires from the main overloads (not per-attempt to avoid spam)          |
| Teleport actions            | Any action that goes through the standard `teleport` overloads is blocked                  |
| Portals and end gateways    | Dimension transitions (`moveToWorld`) are cancelled; the player stays in the current world |
| `entity.requestTeleport()`  | Blocked; the `entity_action` does **not** fire for this path to avoid action spam          |

### Notes

- Sleep wake-up is **not** affected, vanilla bed wake-up uses `networkHandler.requestTeleport()` directly and bypasses the power.
- Multiple `prevent_teleport` powers stack: if any one of them is active the teleport is blocked and **all** of their entity actions fire.
- The power can be scoped with `condition` to only prevent teleportation under specific circumstances.

### Examples

```json
{
  "type": "sync:prevent_teleport"
}
```
Silently prevents all teleportation.

```json
{
  "type": "sync:prevent_teleport",
  "entity_action": {
    "type": "apoli:execute_command",
    "command": "playsound minecraft:block.note_block.bass master @s"
  }
}
```
Prevents teleportation and plays a bass note each time an attempt is blocked.