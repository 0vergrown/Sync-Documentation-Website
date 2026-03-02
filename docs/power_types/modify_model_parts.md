---
title: Modify Model Parts (Power Type)
date: 2024-01-07
---

# Modify Model Parts

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Modifies the position, rotation, scale, and visibility of entity model parts, with optional animation override.

Type ID: `sync:modify_model_parts`

### Fields

| Field             | Type                                                                                                                                                   | Default | Description                                                                                                                                                                          |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `transformations` | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Model Part Transformations](../data_types/model_part_transformations.md) |         | List of transformations to apply to model parts. See the [Model Part Transformations](../data_types/model_part_transformations.md) documentation for details on each transformation. |

### Examples

```json
{
    "type": "sync:modify_model_parts",
    "transformations": [
        {
            "model_part": "head",
            "type": "pitch",
            "value": 45.0
        },
        {
            "model_part": "rightarm",
            "type": "roll",
            "value": 90.0
        },
        {
            "model_part": "body",
            "type": "xscale",
            "value": 0.25
        }
    ]
}
```
This example tilts the head 45 degrees, rotates the right arm 90 degrees, and makes the body 25% wider.
```json
{
    "type": "sync:modify_model_parts",
    "transformations": [
        {
            "model_part": "leftleg",
            "type": "pitch",
            "value": 6.6,
            "override_animation": true
        },
        {
            "model_part": "rightarm",
            "type": "pitch",
            "value": 10.0,
            "override_animation": false
        }
    ]
}
```
This example locks the left leg's pitch to 6.6 degrees, preventing walking/swimming animations from changing it and adds 10.0 degrees to the right arm's pitch, but still allows vanilla animations to affect it.
```json
{
    "type": "sync:modify_model_parts",
    "transformations": [
        {
            "model_part": "head",
            "type": "pitch",
            "value": -10.0,
            "override_animation": true
        },
        {
            "model_part": "head",
            "type": "yaw",
            "value": 5.0
        },
        {
            "model_part": "rightleg",
            "type": "pitch",
            "value": 15.0,
            "override_animation": true
        },
        {
            "model_part": "leftleg",
            "type": "pitch",
            "value": 15.0,
            "override_animation": true
        },
        {
            "model_part": "rightarm",
            "type": "visible",
            "value": 0
        }
    ]
}
```
This example locks the head's pitch at -10 degrees (no nodding/bobbing animations) and adds 5 degrees to head yaw (still allows looking around) while also locking both legs' pitch at 15 degrees (walking animations disabled, legs stay bent) and hides the right arm completely.