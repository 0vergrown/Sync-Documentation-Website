---
title: Entity In Radius (Entity Condition)
date: 2024-01-07
---

# Entity In Radius

[Entity Condition Types](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)

Counts entities within a specified radius and compares the count against a value. Can filter entities with bi-entity conditions.

Type ID: `sync:entity_in_radius`

### Fields

| Field                | Type                                                                                            | Default    | Description                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------|------------|-------------------------------------------------------------------------------------------------------|
| `bientity_condition` | [Bi-Entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | Optional condition to filter counted entities                                                         |
| `shape`              | [Shape](https://origins.readthedocs.io/en/latest/types/data_types/shape/)                       | `cube`     | Determines the shape of the area used for checking how many entities fulfill the bi-entity condition. |
| `radius`             | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                       |            | Radius/distance for detection                                                                         |
| `comparison`         | [Comparison](https://origins.readthedocs.io/en/latest/types/data_types/comparison/)             | `>=`       | How to compare the count                                                                              |
| `compare_to`         | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)                   | `1`        | Minimum number of entities required                                                                   |

### Notes

- Counts entities at foot level (bounding box `minY`)
- Excludes the actor entity from the count
- Bi-entity condition receives: (`actor`, `target_entity`)

### Examples

```json
{
    "type": "sync:entity_in_radius",
    "bientity_condition": {
        "type": "apoli:actor_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:player"
        }
    },
    "shape": "sphere",
    "radius": 10.0,
    "comparison": ">=",
    "compare_to": 3
}
```
This example checks if there are at least 3 other players within 10 blocks.