---
title: Power Types
date: 2024-01-07
---

# Power Types

Sync adds several unique power types that enhance entity behavior and visual effects. These power types can be used in data packs to create custom abilities, visual effects, and gameplay mechanics.

## Available Power Types

| Power Type | Description |
|------------|-------------|
| [Action on Death](./action_on_death.md) | Triggers actions when an entity dies |
| [Custom Projectile](./custom_projectile.md) | Creates a customizable projectile-firing ability |
| [Edible Item](./edible_item.md) | Makes non-food items consumable or modifies food properties |
| [Emissive](./emissive.md) | Makes entities emit light (glow) |
| [Energy Swirl](./energy_swirl.md) | Creates a translucent energy swirl around an entity |
| [Entity Set](./entity_set.md) | Maintains a set of entities with custom actions |
| [Entity Texture Overlay](./entity_texture_overlay.md) | Applies custom textures to entities |
| [Flip Model](./flip_model.md) | Flips entity models upside down |
| [Modify Enchantment Level](./modify_enchantment_level.md) | Dynamically modifies enchantment levels on items |
| [Modify Enchantment Damage Dealt](./modify_enchantment_damage_dealt.md) | Modifies damage dealt based on enchantment level |
| [Modify Model Parts](./modify_model_parts.md) | Adjusts position, rotation, and scale of model parts |
| [Modify Player Model](./modify_player_model.md) | Changes player models to custom variants with extra limbs |
| [Mobs Ignore](./mobs_ignore.md) | Makes hostile mobs ignore the entity |
| [Pose](./pose.md) | Forces entities into specific poses |
| [Prevent Label Render](./prevent_label_render.md) | Prevents the name tag label of the entity |
| [Prevent Sprinting Particles](./prevent_sprinting_particles.md) | Prevents sprinting particle effects |
| [Sprinting](./sprinting.md) | Forces entities to sprint automatically |

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
```
