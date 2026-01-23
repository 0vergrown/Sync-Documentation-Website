---
title: Flip Model (Power Type)
date: 2024-01-07
---

# Flip Model

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Flips entity models upside down, similar to the "Dinnerbone" or "Grumm" name effect. Also flips the player's view in first person.

Type ID: `sync:flip_model`

### Fields

Field | Type                                                                          | Default | Description
------|-------------------------------------------------------------------------------|---------|-------------
`flip_view` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `false` | Whether to also flip the first-person camera view.

### Notes

- Overrides the "Dinnerbone" and "Grumm" name effects
- Works on both players and other entities
- Client-side visual effect only
- Does not affect hitboxes or collision

### Examples

```json
{
    "type": "sync:flip_model",
    "flip_view": false
}
```
This example flips the player model.