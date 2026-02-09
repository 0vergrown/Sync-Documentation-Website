---
title: Custom Projectile (Power Type)
date: 2024-01-07
---

# Custom Projectile

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Creates a customizable projectile-firing ability with configurable visuals, behavior, and actions on hit/miss. Can fire single or multiple projectiles with various effects.

Type ID: `sync:custom_projectile`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`cooldown` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `1` | Interval of ticks this power needs to recharge before the power can be triggered again.
`hud_render` | [Hud Render](https://origins.readthedocs.io/en/latest/types/data_types/hud_render/) | `{"should_render": false}` | Determines how the cooldown of this power is visualized on the HUD.
`texture_location` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | *optional* | If specified, the texture used for the custom projectile.
`count` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `1` | The amount of projectiles to fire each use.
`interval` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `0` | Determines the interval for firing multiple projectiles consecutively (in ticks). If set to 0, it will fire all the projectiles at the same tick.
`start_delay` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `0` | Determines how long the start of the firing process is delayed (in ticks).
`speed` | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/) | `1.5` | The speed applied to the fired projectile.
`divergence` | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/) | `1.0` | How much each projectile fired is affected by random spread.
`sound` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | *optional* | If set, the sound with this ID will be played when the power is used.
`tag` | [NBT](https://origins.readthedocs.io/en/latest/types/data_types/nbt/) | *optional* | NBT data of the entity.
`allow_conditional_cancelling` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `false` | Determines if extra projectiles will no longer be fired as soon as the entity no longer meets this power's condition.
`block_action_cancels_miss_action` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `false` | Determines if the `block_action_on_hit` action will cancel the `bientity_action_on_miss` action.
`entity_action_before_firing` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional* | If specified, the entity action to execute on the entity firing the projectile just prior to the projectile being created.
`bientity_action_after_firing` | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/) | *optional* | If specified, the bi-entity action to execute with the projectile owner the actor, and the projectile as the target as soon as the projectile is created.
`block_action_on_hit` | [Block Action](https://origins.readthedocs.io/en/latest/types/block_action_types/) | *optional* | If specified, the block action to execute on the block the projectile lands on upon having it land on it.
`bientity_action_on_miss` | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/) | *optional* | If specified, the bi-entity action to execute with the projectile owner as the actor, and the projectile as the target upon missing.
`bientity_action_on_hit` | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/) | *optional* | If specified, the bi-entity action to execute with the projectile as the actor, and the hit entity as the target upon hitting an entity.
`owner_target_bientity_action_on_hit` | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/) | *optional* | If specified, the bi-entity action to execute with the projectile owner as the actor, and the hit entity as the target upon hitting an entity.
`tick_bientity_action` | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/) | *optional* | If specified, the bi-entity action with the projectile owner as the actor, and the projectile as the target that is run each tick of the projectile's lifespan.
`block_condition` | [Block Condition](https://origins.readthedocs.io/en/latest/types/block_condition_types/) | *optional* | If specified, the block condition that the block targeted by the `block_action_on_hit` field must meet in order for that to run.
`bientity_condition` | [Bi-entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | If specified, the bi-entity condition with the projectile as the actor and the target as the target for the projectile to actually hit the target instead of pass through.
`owner_bientity_condition` | [Bi-entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | If specified, the bi-entity condition with the projectile owner as the actor and the target as the target for the projectile to actually hit the target instead of pass through.
`key` | [Key](https://origins.readthedocs.io/en/latest/types/data_types/key/) | `{"key": "key.use"}` | Which active key this power should respond to.

### How It Works

When activated, this power fires customizable projectiles from the entity's eye position in the direction they're looking. The projectiles can:
- Execute actions when hitting blocks or entities
- Have custom textures and NBT data
- Fire in bursts with configurable intervals
- Apply conditions to determine valid targets
- Execute actions every tick while in flight

### Notes

- Projectiles are visual entities rendered as billboards
- The first projectile has perfect accuracy; subsequent ones use divergence
- If a projectile hits a block before an entity, it triggers the block action
- Projectiles are automatically removed when they hit something or when the owner is removed
- Power conditions are checked once at activation unless `allow_conditional_cancelling` is true

### Examples

```json
{
    "type": "sync:custom_projectile",
    "texture_location": "minecraft:textures/item/fire_charge.png",
    "speed": 2.0,
    "sound": "minecraft:entity.blaze.shoot",
    "bientity_action_on_hit": {
        "type": "apoli:damage",
        "amount": 8,
        "damage_type": "minecraft:on_fire"
    },
    "key": {
        "key": "key.use"
    }
}
```
A simple fireball that deals fire damage.

```json
{
    "type": "sync:custom_projectile",
    "count": 3,
    "interval": 5,
    "divergence": 0.5,
    "texture_location": "quirks:textures/entity/quirk/frost/shard.png",
    "block_action_on_hit": {
        "type": "apoli:set_block",
        "block": "minecraft:ice"
    },
    "bientity_action_on_hit": {
        "type": "apoli:apply_effect",
        "effect": {
            "effect": "minecraft:slowness",
            "duration": 100,
            "amplifier": 2
        }
    }
}
```
Fires three ice shards that freeze water and slow enemies.