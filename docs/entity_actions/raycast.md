---
title: Raycast (Entity Action)
date: 2024-01-07
---

# Raycast

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Fires a ray from an entity's eye position and executes actions based on what it hits. Supports per-type distances, custom directions, piercing, particle trails, and command execution along the ray.

Type ID: `sync:raycast`

### Fields

| Field                           | Type                                                                                            | Default    | Description                                                                                                                                    |
|---------------------------------|-------------------------------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `distance`                      | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                       | *optional* | Maximum range for both block and entity raycasting. Defaults to the entity's effective reach (respecting `reach-entity-attributes` if present) |
| `block`                         | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                   | `true`     | Whether the ray can hit blocks                                                                                                                 |
| `entity`                        | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                   | `true`     | Whether the ray can hit entities                                                                                                               |
| `shape_type`                    | [Shape Type](https://origins.readthedocs.io/en/latest/types/data_types/shape_type/)             | `visual`   | The shape type used for block collision detection                                                                                              |
| `fluid_handling`                | [Fluid Handling](https://origins.readthedocs.io/en/latest/types/data_types/fluid_handling/)     | `any`      | How fluids are treated during block raycasting                                                                                                 |
| `space`                         | [Space](https://origins.readthedocs.io/en/latest/types/data_types/space/)                       | `world`    | The coordinate space in which `direction` is interpreted                                                                                       |
| `direction`                     | [Vector](https://origins.readthedocs.io/en/latest/types/data_types/vector/)                     | *optional* | Custom ray direction. If omitted, uses the entity's current look direction                                                                     |
| `pierce`                        | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                   | `false`    | If `true`, the ray passes through entities and `bientity_action` is executed on every entity hit before the first block                        |
| `particle`                      | [Particle Effect](https://origins.readthedocs.io/en/latest/types/data_types/particle_effect/)   | *optional* | Particle to spawn at intervals along the ray                                                                                                   |
| `spacing`                       | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                       | `0.5`      | Distance in blocks between each particle spawn along the ray                                                                                   |
| `entity_distance`               | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                       | *optional* | Maximum range for entity detection only. Overrides `distance` for entities                                                                     |
| `block_distance`                | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                       | *optional* | Maximum range for block detection only. Overrides `distance` for blocks                                                                        |
| `bientity_condition`            | [Bi-entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | If specified, only entities passing this condition (actor = source, target = candidate) are considered valid hits                              |
| `block_condition`               | [Block Condition](https://origins.readthedocs.io/en/latest/types/block_condition_types/)        | *optional* | If specified, `block_action` only runs when the hit block satisfies this condition                                                             |
| `bientity_action`               | [Bi-entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)       | *optional* | Action executed on each entity hit (actor = source, target = hit entity)                                                                       |
| `block_action`                  | [Block Action](https://origins.readthedocs.io/en/latest/types/block_action_types/)              | *optional* | Action executed on the block hit by the ray                                                                                                    |
| `before_action`                 | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)            | *optional* | Action executed on the source entity before the ray is cast                                                                                    |
| `hit_action`                    | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)            | *optional* | Action executed on the source entity when the ray hits anything                                                                                |
| `miss_action`                   | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)            | *optional* | Action executed on the source entity when the ray hits nothing                                                                                 |
| `command_at_hit`                | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)                     | *optional* | Command to run at the hit position                                                                                                             |
| `command_hit_offset`            | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                       | *optional* | Distance to offset the `command_at_hit` position away from the hit surface. Defaults to a small automatic offset based on the hit face         |
| `command_along_ray`             | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)                     | *optional* | Command to run repeatedly at intervals along the ray                                                                                           |
| `command_step`                  | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                       | `1.0`      | Interval in blocks between each execution of `command_along_ray`                                                                               |
| `command_along_ray_only_on_hit` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                   | `false`    | If `true`, `command_along_ray` only runs when the ray hits something                                                                           |

### Notes

- The ray always originates from the entity's **eye position**.
- When both `block` and `entity` are enabled, the **closest** hit wins for `hit_action` and `command_at_hit`. With `pierce`, `bientity_action` fires on every entity closer than the first block hit.
- `distance` is the shared fallback. `entity_distance` and `block_distance` each override it for their respective type. If none of these are set, the entity's live reach values are used (including any modifiers from `reach-entity-attributes`).
- Particles and `command_along_ray` both trace up to the hit position (or the full range on a miss).
- `block_action` respects `block_condition`; `bientity_action` respects `bientity_condition`.

### Examples

```json
{
    "type": "sync:raycast",
    "distance": 10.0,
    "bientity_action": {
        "type": "apoli:damage",
        "amount": 4,
        "source": {
            "name": "magic"
        }
    },
    "hit_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:entity.player.attack.sweep"
    },
    "miss_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:entity.arrow.shoot"
    }
}
```
Damages the first entity in the player's line of sight within 10 blocks.

```json
{
    "type": "sync:raycast",
    "distance": 20.0,
    "entity": false,
    "block_action": {
        "type": "apoli:set_block",
        "block": "minecraft:tnt"
    },
    "block_condition": {
        "type": "apoli:block_state",
        "block": "minecraft:stone"
    }
}
```
Replaces the first stone block in the line of sight with TNT. Ignores entities entirely.

```json
{
    "type": "sync:raycast",
    "pierce": true,
    "entity_distance": 8.0,
    "block_distance": 16.0,
    "particle": {
        "type": "minecraft:witch"
    },
    "spacing": 0.4,
    "bientity_action": {
        "type": "apoli:add_velocity",
        "z": -2.0,
        "space": "local"
    },
    "command_at_hit": "particle minecraft:explosion ~ ~ ~",
    "command_along_ray_only_on_hit": true
}
```
Fires a piercing ray that pushes back all entities within 8 blocks, traces particles along the path, and spawns an explosion particle at the impact point.