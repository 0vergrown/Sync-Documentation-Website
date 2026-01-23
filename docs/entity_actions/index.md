---
title: Entity Action Types
date: 2024-01-07
---

# Entity Action Types

Sync adds several entity actions that can be used in data packs to create custom abilities and gameplay mechanics. These actions work alongside Apoli's existing action system.

## Available Entity Actions

| Action | Description |
|--------|-------------|
| [Radial Menu](./radial_menu.md) | Opens a customizable radial menu with clickable options |
| [Action on Entity Set](./action_on_entity_set.md) | Executes actions on entities in an entity set |
| [Random Teleport](./random_teleport.md) | Teleports entities randomly within an area |
| [Print](./print.md) | Logs messages to console or player chat |
| [Summon Clone](./summon_clone.md) | Summons a clone of the player |
| [Summon Minion](./summon_minion.md) | Summons a customizable minion entity |
| [Set Summon Max Life](./set_summon_max_life.md) | Sets the maximum lifetime for summoned entities |

## Using Sync Entity Actions

Sync entity actions are registered under the `sync` namespace and can be used anywhere Apoli entity actions are accepted.

### Basic Structure
```json
{
  "type": "sync:action_type_name",
  // Action-specific fields...
}
```