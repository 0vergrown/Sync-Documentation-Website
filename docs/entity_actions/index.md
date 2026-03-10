---
title: Entity Action Types
date: 2024-01-07
---

# Entity Action Types

Sync adds several entity actions that can be used in data packs to create custom abilities and gameplay mechanics. These actions work alongside Apoli's existing action system.

## Available Entity Actions

| Action                                                      | Description                                               |
|-------------------------------------------------------------|-----------------------------------------------------------|
| [Action on Entity Set](./action_on_entity_set.md)           | Executes actions on entities in an entity set             |
| [Custom Projectile](./custom_projectile.md)                 | Fires customizable projectiles without requiring a power  |
| [Cycle Stolen Power](./cycle_stolen_power.md)               | Cycles through the entity's stolen power packages         |
| [Disguise As](./disguise_as.md)                             | Visually disguises a living entity as another entity type |
| [Grant All Powers](./grant_all_powers.md)                   | Grants all powers from a specific source                  |
| [Print](./print.md)                                         | Logs messages to console or player chat                   |
| [Random Teleport](./random_teleport.md)                     | Teleports entities randomly within an area                |
| [Raycast](./raycast.md)                                     | Fires a ray and executes actions based on what it hits    |
| [Remove Disguise](./remove_disguise.md)                     | Removes an active disguise from an entity                 |
| [Radial Menu](./radial_menu.md)                             | Opens a customizable radial menu with clickable options   |
| [Revoke All Powers](./revoke_all_powers.md)                 | Removes all powers from a specific source                 |
| [Revoke Power](./revoke_power.md)                           | Removes a specific power from an entity                   |
| [Save Location](./save_location.md)                         | Saves an entity's position for later teleportation        |
| [Set Summon Max Life](./set_summon_max_life.md)             | Sets the maximum lifetime for summoned entities           |
| [Set No Gravity](./set_no_gravity.md)                       | Sets or toggles whether an entity is affected by gravity  |
| [Summon Clone](./summon_clone.md)                           | Summons a clone of the player                             |
| [Summon Minion](./summon_minion.md)                         | Summons a customizable minion entity                      |
| [Teleport To Location](./teleport_to_location.md)           | Teleports to a previously saved location                  |
| [Teleport to Spawn](./teleport_to_spawn.md)                 | Teleports a player to their spawn                         |
| [Toggle Transfer Mode](./toggle_transfer_mode.md)           | Flips the entity's steal/give transfer mode               |
| [Use Selected Stolen Power](./use_selected_stolen_power.md) | Activates the currently selected stolen power package     |


## Using Sync Entity Actions

Sync entity actions are registered under the `sync` namespace and can be used anywhere Apoli entity actions are accepted.

### Basic Structure
```json
{
  "type": "sync:action_type_name",
  // Action-specific fields...
}
```