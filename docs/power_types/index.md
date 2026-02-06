---
title: Power Types
date: 2024-01-07
---

# Power Types

Sync adds several unique power types that enhance entity behavior and visual effects. These power types can be used in data packs to create custom abilities, visual effects, and gameplay mechanics.

## Available Power Types

| Power Type | Description |
|------------|-------------|
| [Action on Death](./action_on_death) | Triggers actions when an entity dies |
| [Emissive](./emissive) | Makes entities emit light (glow) |
| [Entity Set](./entity_set) | Maintains a set of entities with custom actions |
| [Entity Texture Overlay](./entity_texture_overlay) | Applies custom textures to entities |
| [Flip Model](./flip_model) | Flips entity models upside down |
| [Modify Model Parts](./modify_model_parts) | Adjusts position, rotation, and scale of model parts |
| [Mobs Ignore](./mobs_ignore) | Makes hostile mobs ignore the entity |
| [Pose](./pose) | Forces entities into specific poses |

## Using Sync Power Types

Sync power types work alongside Apoli power types and can be combined with conditions, actions, and other power features. They are registered under the `sync` namespace.

### Basic Structure
```json
{
  "type": "sync:power_type_name",
  // Power-specific fields...
  "condition": {
    /* optional */
  }
}