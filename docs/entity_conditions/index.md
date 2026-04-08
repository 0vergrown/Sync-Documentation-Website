---
title: Entity Condition Types
date: 2024-01-07
---

# Entity Condition Types

Sync adds several entity conditions that provide new ways to check entity states and relationships.

## Available Entity Conditions

| Condition                                                 | Description                                                        |
|-----------------------------------------------------------|--------------------------------------------------------------------|
| [Attached to Rope](./attached_to_rope.md)                 | Checks if the player is currently attached to a rope               |
| [Disguised](./disguised.md)                               | Checks if the entity currently has an active disguise              |
| [Entity In Radius](./entity_in_radius.md)                 | Counts entities within a radius with conditions                    |
| [Entity Set Size](./entity_set_size.md)                   | Compares the size of an entity set                                 |
| [Has Command Tag](./has_command_tag.md)                   | Checks if an entity has specific command tags                      |
| [In Pose](./in_pose.md)                                   | Checks if an entity is in a specific pose                          |
| [Is Selected Stolen Power](./is_selected_stolen_power.md) | Checks if the entity has a stolen power package selected           |
| [Key Pressed](./key_pressed.md)                           | Checks if a player is pressing a specific key                      |
| [Perspective](./perspective.md)                           | Checks which camera perspective a player is currently using        |
| [Player Model Type](./player_model_type.md)               | Checks if a player uses "wide" or "slim" model                     |
| [Raycast](./raycast.md)                                   | Checks if a ray from the entity hits something matching conditions |
| [Velocity](./velocity.md)                                 | Checks an entity's current velocity                                |


## Using Sync Entity Conditions

Sync entity conditions are registered under the `sync` namespace and can be used anywhere Apoli entity conditions are accepted.

### Basic Structure
```json
{
  "type": "sync:condition_type_name",
  // Condition-specific fields...
}
```