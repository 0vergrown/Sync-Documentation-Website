---
title: Pose (Power Type)
date: 2024-01-07
---

# Pose

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Forces entities into specific poses. Higher priority pose powers override lower priority ones.

Type ID: `sync:pose`

### Fields

Field | Type                                                                          | Default | Description
------|-------------------------------------------------------------------------------|---------|-------------
`pose` | [Entity Pose](#available-poses)                                               | | The pose to force the entity into.
`priority` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `0` | Priority level (higher overrides lower).

### Available Poses
| Pose | Description | Example Entities |
|------|-------------|------------------|
| `standing` | Normal upright stance | All entities |
| `fall_flying` | Flying with elytra | Players with elytra |
| `sleeping` | Lying down sleeping | Players in beds |
| `swimming` | Swimming animation | Players, fish |
| `spin_attack` | Spinning attack | Players with trident |
| `crouching` | Sneaking/crouching | Players, spiders |
| `dying` | Death animation | All entities |
| `long_jumping` | Long jump pose | Players, horses |
| `using_tongue` | Extending tongue | Frogs |
| `sniffing` | Sniffing animation | Wardens |
| `emerging` | Emerging from ground | Wardens |
| `digging` | Digging animation | Players |

### Notes

- Priority system allows multiple pose powers to coexist
- Overrides normal pose logic completely
- Works on both players and other entities
- Some poses have special animations or behaviors
- Does not prevent movement (e.g., `crouching` doesn't slow)

### Examples

```json
{
    "type": "sync:pose",
    "pose": "spin_attack",
    "priority": 10,
    "condition": {
        "type": "apoli:using_item",
        "item_condition": {
            "type": "apoli:ingredient",
            "ingredient": {
                "item": "minecraft:trident"
            }
        }
    }
}
```
This example forces the spin attack pose when using a trident, with high priority.
```json
{
    "type": "sync:pose",
    "pose": "sleeping",
    "priority": 5,
    "condition": {
      "type": "origins:health",
      "comparison": "<",
      "compare_to": 8
    }
}
```
This example makes the entity appear to sleep when below 8 health (4 hearts).