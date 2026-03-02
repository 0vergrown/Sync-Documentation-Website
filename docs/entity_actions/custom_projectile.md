---
title: Custom Projectile (Entity Action)
date: 2024-01-07
---

# Custom Projectile

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Fires one or more custom projectiles from an entity without requiring a power. This is the action-based version of the [Custom Projectile (Power Type)](../power_types/custom_projectile.md).

Type ID: `sync:custom_projectile`

### Fields

| Field                                 | Type                                                                                            | Default    | Description                                                                                                                                                                      |
|---------------------------------------|-------------------------------------------------------------------------------------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `entity_id`                           | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)             | *optional* | Identifier for tracking the projectile                                                                                                                                           |
| `texture_location`                    | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)             | *optional* | If specified, the texture used for the custom projectile.                                                                                                                        |
| `count`                               | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)                   | `1`        | The amount of projectiles to fire each use.                                                                                                                                      |
| `speed`                               | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                       | `1.5`      | The speed applied to the fired projectile.                                                                                                                                       |
| `divergence`                          | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                       | `1.0`      | How much each projectile fired is affected by random spread.                                                                                                                     |
| `sound`                               | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)             | *optional* | If set, the sound with this ID will be played when the power is used.                                                                                                            |
| `tag`                                 | [NBT](https://origins.readthedocs.io/en/latest/types/data_types/nbt/)                           | *optional* | NBT data to apply to projectiles                                                                                                                                                 |
| `entity_action_before_firing`         | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)            | *optional* | If specified, the entity action to execute on the entity firing the projectile just prior to the projectile being created.                                                       |
| `bientity_action_after_firing`        | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)       | *optional* | If specified, the bi-entity action to execute with the projectile owner the actor, and the projectile as the target as soon as the projectile is created.                        |
| `block_action_on_hit`                 | [Block Action](https://origins.readthedocs.io/en/latest/types/block_action_types/)              | *optional* | If specified, the block action to execute on the block the projectile lands on upon having it land on it.                                                                        |
| `bientity_action_on_miss`             | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)       | *optional* | If specified, the bi-entity action to execute with the projectile owner as the actor, and the projectile as the target upon missing.                                             |
| `bientity_action_on_hit`              | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)       | *optional* | If specified, the bi-entity action to execute with the projectile as the actor, and the hit entity as the target upon hitting an entity.                                         |
| `owner_target_bientity_action_on_hit` | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)       | *optional* | If specified, the bi-entity action to execute with the projectile owner as the actor, and the hit entity as the target upon hitting an entity.                                   |
| `block_action_cancels_miss_action`    | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                   | `false`    | Determines if the `block_action_on_hit` action will cancel the `bientity_action_on_miss` action.                                                                                 |
| `block_condition`                     | [Block Condition](https://origins.readthedocs.io/en/latest/types/block_condition_types/)        | *optional* | If specified, the block condition that the block targeted by the `block_action_on_hit` field must meet in order for that to run.                                                 |
| `bientity_condition`                  | [Bi-entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | If specified, the bi-entity condition with the projectile as the actor and the target as the target for the projectile to actually hit the target instead of pass through.       |
| `owner_bientity_condition`            | [Bi-entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | If specified, the bi-entity condition with the projectile owner as the actor and the target as the target for the projectile to actually hit the target instead of pass through. |
| `tick_bientity_action`                | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)       | *optional* | If specified, the bi-entity action with the projectile owner as the actor, and the projectile as the target that is run each tick of the projectile's lifespan.                  |

### Notes

- Only works server-side on living entities
- All projectiles are fired instantly (no interval/delay like the power version)
- First projectile has perfect accuracy, subsequent ones use divergence
- Projectiles despawn when they hit something or when the owner is removed

### Examples

```json
{
    "type": "sync:custom_projectile",
    "texture_location": "sync:textures/projectile/magic_missile.png",
    "count": 5,
    "speed": 3.0,
    "divergence": 2.0,
    "bientity_action_on_hit": {
        "type": "apoli:damage",
        "amount": 4
    }
}
```
Fires a spread of 5 magic missiles.

```json
{
    "type": "sync:custom_projectile",
    "texture_location": "sync:textures/projectile/healing_orb.png",
    "bientity_condition": {
        "type": "apoli:actor_condition",
        "condition": {
            "type": "apoli:entity_group",
            "group": "undead",
            "inverted": true
        }
    },
    "owner_target_bientity_action_on_hit": {
        "type": "apoli:heal",
        "amount": 6
    }
}
```
Fires a healing projectile that only affects non-undead entities.