---
title: Velocity (Entity Condition)
date: 2024-01-07
---

# Velocity

[Entity Condition Types](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)

Tests an entity's current velocity. Supports two modes: **per-axis exact checks** (using `x`, `y`, `z`) and a **multi-axis combined check** (using `axes` + `compare_to`).

Type ID: `sync:velocity`

### Fields

| Field        | Type                                                                                                                                                     | Default    | Description                                                                                      |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|------------|--------------------------------------------------------------------------------------------------|
| `x`          | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                                                                                | *optional* | Compares the X component of velocity using `comparison`                                          |
| `y`          | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                                                                                | *optional* | Compares the Y component of velocity using `comparison`                                          |
| `z`          | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                                                                                | *optional* | Compares the Z component of velocity using `comparison`                                          |
| `axes`       | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | *optional* | List of axes (`"x"`, `"y"`, `"z"`) whose velocity values are summed and compared to `compare_to` |
| `comparison` | [Comparison](https://origins.readthedocs.io/en/latest/types/data_types/comparison/)                                                                      | `>=`       | The comparison operator used in both modes                                                       |
| `compare_to` | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                                                                                | `0.0`      | The value to compare against in `axes` mode                                                      |

### Modes

**Per-axis mode**: Triggered when any of `x`, `y`, or `z` are present. Each specified component is compared individually using `comparison`. All specified components must pass for the condition to return `true`. `compare_to` is not used in this mode.

**Multi-axis mode**: Triggered when `axes` is present. The signed velocity values of all listed axes are **summed** and compared to `compare_to` using `comparison`.

If neither mode's fields are specified, the condition returns `true` vacuously.

### Notes

- Velocity values are **signed**: negative Y means falling, negative X/Z means moving in the negative direction on that axis.
- In multi-axis mode, summing signed values means opposing velocities can cancel out. Use a single axis in `axes` if you only care about one direction.
- Velocity is read server-side from the entity's current tick state.

### Examples

```json
{
  "type":"sync:velocity",
  "y":-0.1,
  "comparison":"<="
}
```
Returns `true` when the entity is falling (Y velocity ≤ -0.1).

```json
{
  "type":"sync:velocity",
  "y":0.0,
  "comparison":">"
}
```
Returns `true` when the entity is moving upward.

```json
{
  "type":"sync:velocity",
  "axes":[
    "x",
    "z"
  ],
  "comparison":">=",
  "compare_to":0.3
}
```
Returns `true` when the combined horizontal velocity (X + Z) is at least 0.3

```json
{
  "type":"sync:velocity",
  "x":0.0,
  "y":0.0,
  "z":0.0,
  "comparison":"=="
}
```
Returns `true` only when the entity is completely stationary on all three axes.