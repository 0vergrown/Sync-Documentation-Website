---
title: Power Types
date: 2024-01-07
---

# Power Types

Sync adds several unique power types that enhance entity behavior and visual effects. These power types can be used in data packs to create custom abilities, visual effects, and gameplay mechanics.

## Available Power Types

| Power Type                                                              | Description                                                          |
|-------------------------------------------------------------------------|----------------------------------------------------------------------|
| [Action on Death](./action_on_death.md)                                 | Triggers actions when an entity dies                                 |
| [Action On Key Sequence](./action_on_key_sequence.md)                   | Executes actions when the player presses a specific sequence of keys |
| [Action on Sending Message](./action_on_sending_message.md)             | Intercepts chat/command messages with regex filters                  |
| [Custom Projectile](./custom_projectile.md)                             | Creates a customizable projectile-firing ability                     |
| [Edible Item](./edible_item.md)                                         | Makes non-food items consumable or modifies food properties          |
| [Emissive](./emissive.md)                                               | Makes entities emit light (glow)                                     |
| [Energy Swirl](./energy_swirl.md)                                       | Creates a translucent energy swirl around an entity                  |
| [Entity Set](./entity_set.md)                                           | Maintains a set of entities with custom actions                      |
| [Entity Texture Overlay](./entity_texture_overlay.md)                   | Applies custom textures to entities                                  |
| [Flip Model](./flip_model.md)                                           | Flips entity models upside down                                      |
| [Modify Enchantment Level](./modify_enchantment_level.md)               | Dynamically modifies enchantment levels on items                     |
| [Modify Enchantment Damage Dealt](./modify_enchantment_damage_dealt.md) | Modifies damage dealt based on enchantment level                     |
| [Modify Label Render](./modify_label_render.md)                         | Modifies name tag rendering with custom text and visibility modes    |
| [Modify Model Parts](./modify_model_parts.md)                           | Adjusts position, rotation, and scale of model parts                 |
| [Modify Player Model](./modify_player_model.md)                         | Changes player models to custom variants with extra limbs            |
| [Mobs Ignore](./mobs_ignore.md)                                         | Makes hostile mobs ignore the entity                                 |
| [Pose](./pose.md)                                                       | Forces entities into specific poses                                  |
| [Prevent Creative Flight](./prevent_creative_flight.md)                 | Forces entities into specific poses                                  |
| [Prevent Sprinting Particles](./prevent_sprinting_particles.md)         | Prevents a player from using creative (ability) flight               |
| [Sprinting](./sprinting.md)                                             | Forces entities to sprint automatically                              |

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
