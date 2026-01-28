---
title: Model Part Transformations (Data Type)
date: 2024-11-25
---

# Model Part Transformations

[Data Type](https://origins.readthedocs.io/en/latest/types/data_types/)

A data type representing transformations to apply to entity model parts. Used by the [`sync:modify_model_parts`](../power_types/modify_model_parts.md) power type.

### Structure

This data type is an [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of transformation objects. Each transformation object has the following fields:

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`model_part` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | | The model part to transform. Must be one of: `head`, `hat`, `body`, `rightarm`, `leftarm`, `rightleg`, `leftleg`
`type` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | | The type of transformation. Must be one of: `pitch`, `yaw`, `roll`, `visible`, `hidden`, `xscale`, `yscale`, `zscale`, `pivotx`, `pivoty`, `pivotz`
`value` | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/) | | The amount to transform. For rotations (pitch/yaw/roll): degrees. For positions (pivotx/pivoty/pivotz): units. For scale (xscale/yscale/zscale): multiplier (added to base scale of 1.0). For visibility (visible/hidden): `1` for true/visible, `0` for false/hidden.
`override_animation` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `false` | When `true`, locks the specified rotation (pitch, yaw, or roll) to the exact value, preventing vanilla animations from affecting that rotation on that body part. When `false` or omitted, the transformation is additive and vanilla animations can still affect the part.

### Transformation Types Explained

#### Rotations (`pitch`, `yaw`, `roll`)
- **Normal behavior** (`override_animation: false`): The value is added to the current rotation, allowing vanilla animations (walking, attacking, swimming) to affect the part.
- **Overridden behavior** (`override_animation: true`): The rotation is locked to the exact value specified. Vanilla animations cannot change this rotation for the specified part.

#### Visibility (`visible`, `hidden`)
- `visible`: Controls whether the model part is rendered. `1` = visible, `0` = invisible.
- `hidden`: Controls whether the model part is hidden (similar to visible but may have different rendering behavior).

#### Scale (`xscale`, `yscale`, `zscale`)
- Values are added to the base scale of 1.0. Example: `value: 0.5` results in a scale of 1.5.

#### Position (`pivotx`, `pivoty`, `pivotz`)
- Adjusts the pivot point of the model part relative to its default position.

### Examples

```json
[
    {
        "model_part": "head",
        "type": "pitch",
        "value": 45.0,
        "override_animation": true
    },
    {
        "model_part": "rightarm",
        "type": "roll",
        "value": 90.0
    },
    {
        "model_part": "leftleg",
        "type": "visible",
        "value": 0
    },
    {
        "model_part": "body",
        "type": "xscale",
        "value": 0.5
    }
]
```