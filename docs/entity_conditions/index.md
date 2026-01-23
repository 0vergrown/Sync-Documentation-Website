---
title: Entity Condition Types
date: 2024-01-07
---

# Entity Condition Types

Sync adds several entity conditions that provide new ways to check entity states and relationships.

## Available Entity Conditions

| Condition | Description |
|-----------|-------------|
| [Has Command Tag](./has_command_tag.md) | Checks if an entity has specific command tags |
| [Entity Set Size](./entity_set_size.md) | Compares the size of an entity set |
| [In Pose](./in_pose.md) | Checks if an entity is in a specific pose |
| [Entity In Radius](./entity_in_radius.md) | Counts entities within a radius with conditions |
| [Key Pressed](./key_pressed.md) | Checks if a player is pressing a specific key |

## Using Sync Entity Conditions

Sync entity conditions are registered under the `sync` namespace and can be used anywhere Apoli entity conditions are accepted.

### Basic Structure
```json
{
  "type": "sync:condition_type_name",
  // Condition-specific fields...
}
```