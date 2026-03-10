---
title: Raycast (Entity Condition)
date: 2024-01-07
---

# Raycast

[Entity Condition Types](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)

Returns `true` if a ray cast from the entity's eye position hits something that satisfies all specified conditions. Mirrors the fields of the [Raycast (Entity Action)](../entity_actions/raycast.md) that relate to targeting, but is purely a test (no actions are executed).

Type ID: `sync:raycast`

### Fields

| Field                      | Type                                                                                            | Default    | Description                                                                                                                                    |
|----------------------------|-------------------------------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `distance`                 | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                       | *optional* | Maximum range for both block and entity raycasting. Defaults to the entity's effective reach (respecting `reach-entity-attributes` if present) |
| `block`                    | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                   | `true`     | Whether the ray can hit blocks                                                                                                                 |
| `entity`                   | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                   | `true`     | Whether the ray can hit entities                                                                                                               |
| `shape_type`               | [Shape Type](https://origins.readthedocs.io/en/latest/types/data_types/shape_type/)             | `visual`   | The shape type used for block collision detection                                                                                              |
| `fluid_handling`           | [Fluid Handling](https://origins.readthedocs.io/en/latest/types/data_types/fluid_handling/)     | `any`      | How fluids are treated during block raycasting                                                                                                 |
| `space`                    | [Space](https://origins.readthedocs.io/en/latest/types/data_types/space/)                       | `world`    | The coordinate space in which `direction` is interpreted                                                                                       |
| `direction`                | [Vector](https://origins.readthedocs.io/en/latest/types/data_types/vector/)                     | *optional* | Custom ray direction. If omitted, uses the entity's current look direction                                                                     |
| `entity_distance`          | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                       | *optional* | Maximum range for entity detection only. Overrides `distance` for entities                                                                     |
| `block_distance`           | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                       | *optional* | Maximum range for block detection only. Overrides `distance` for blocks                                                                        |
| `match_bientity_condition` | [Bi-entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | If specified, only entities passing this condition (actor = source, target = candidate) are considered valid entity hits                       |
| `hit_bientity_condition`   | [Bi-entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | If specified, the condition returns `true` only if the closest hit entity satisfies this condition (actor = source, target = hit entity)       |
| `block_condition`          | [Block Condition](https://origins.readthedocs.io/en/latest/types/block_condition_types/)        | *optional* | If specified, the condition returns `true` only if the hit block satisfies this condition                                                      |

### Notes

- The ray originates from the entity's **eye position** in the look direction (or `direction` if set).
- When both `block` and `entity` are enabled, the **closest** hit is evaluated. A hit is only considered valid if it also passes any applicable `hit_bientity_condition` or `block_condition`.
- `match_bientity_condition` acts as a filter during the sweep — candidates that fail it are invisible to the ray. `hit_bientity_condition` is an extra check applied only to the final closest hit.
- If the ray misses entirely, the condition returns `false`.
- `distance`, `entity_distance`, and `block_distance` follow the same resolution rules as the [Raycast Action](../entity_actions/raycast.md).

### Examples

```json
{
  "type": "sync:raycast",
  "distance": 6.0,
  "block": false,
  "hit_bientity_condition": {
    "type": "apoli:target_condition",
    "condition": {
      "type": "apoli:status_effect",
      "effect": "minecraft:poison"
    }
  }
}
```
Returns `true` if the entity is looking at a poisoned entity within 6 blocks.

```json
{
  "type": "sync:raycast",
  "entity": false,
  "block_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:logs"
  }
}
```
Returns `true` if the entity's line of sight hits a log block within default reach.

```json
{
  "type": "sync:raycast",
  "distance": 12.0,
  "match_bientity_condition": {
    "type": "apoli:target_condition",
    "condition": {
      "type": "apoli:entity_type",
      "entity_type": "minecraft:creeper"
    }
  },
  "hit_bientity_condition": {
    "type": "apoli:target_condition",
    "condition": {
      "type": "apoli:nbt",
      "nbt": "{ignited:1b}"
    }
  }
}
```
Returns `true` only when the first creeper in the line of sight (up to 12 blocks away) is already ignited. Non-creeper entities are ignored entirely during the sweep.