---
title: Modify Model Parts (Power Type)
date: 2024-01-07
---

# Modify Model Parts

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Modifies the position, rotation, scale, and visibility of entity model parts.

Type ID: `sync:modify_model_parts`

### Fields

Field | Type                                                                                                                                   | Default | Description
------|----------------------------------------------------------------------------------------------------------------------------------------|---------|-------------
`transformations` | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Model Part Transformations](#model-part-transformations) | | List of transformations to apply to model parts.

### Model Part Transformations

Each transformation is an [object](https://origins.readthedocs.io/en/latest/types/data_types/object/) with these fields:

Field | Type | Description
------|------|-------------
`model_part` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | Which model part to transform: `head`, `hat`, `body`, `rightarm`, `leftarm`, `rightleg`, `leftleg`
`type` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | Type of transformation: `pitch`, `yaw`, `roll`, `visible`, `hidden`, `xscale`, `yscale`, `zscale`, `pivotx`, `pivoty`, `pivotz`
`value` | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/) | Amount to transform (degrees for rotations, units for position, multiplier for scale, 0/1 for visibility)

### Notes

- Transformations are additive and stack with multiple powers
- Scale defaults to 1.0 (values are added to this)
- Position adjustments are relative to default pivot points
- Visibility: `1` = visible, `0` = invisible
- Hidden: `1` = hidden, `0` = not hidden

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
        }
    ]
}
```
This example tilts the head 45 degrees and rotates the right arm 90 degrees.