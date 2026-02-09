---
title: Entity Action Types
date: 2024-01-07
---

# Entity Action Types

Sync adds several entity actions that can be used in data packs to create custom abilities and gameplay mechanics. These actions work alongside Apoli's existing action system.

## Available Entity Actions

| Action | Description |
|--------|-------------|
| [Action on Entity Set](./action_on_entity_set.md) | Executes actions on entities in an entity set |
| [Custom Projectile](./custom_projectile_action.md) | Fires customizable projectiles without requiring a power |
| [Grant All Powers](./grant_all_powers.md) | Grants all powers from a specific source |
| [Print](./print.md) | Logs messages to console or player chat |
| [Random Teleport](./random_teleport.md) | Teleports entities randomly within an area |
| [Radial Menu](./radial_menu.md) | Opens a customizable radial menu with clickable options |
| [Revoke All Powers](./revoke_all_powers.md) | Removes all powers from a specific source |
| [Revoke Power](./revoke_power.md) | Removes a specific power from an entity |
| [Save Location](./save_location.md) | Saves an entity's position for later teleportation |
| [Set Summon Max Life](./set_summon_max_life.md) | Sets the maximum lifetime for summoned entities |
| [Summon Clone](./summon_clone.md) | Summons a clone of the player |
| [Summon Minion](./summon_minion.md) | Summons a customizable minion entity |
| [Teleport To Saved Location](./teleport_to_location.md) | Teleports to a previously saved location |

## Using Sync Entity Actions

Sync entity actions are registered under the `sync` namespace and can be used anywhere Apoli entity actions are accepted.

### Basic Structure
```json
{
  "type": "sync:action_type_name",
  // Action-specific fields...
}
```