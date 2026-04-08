---
title: Body Part Modifier Entry (Data Type)
date: 2025-03-22
---

# Body Part Modifier Entry
[Data Type](https://origins.readthedocs.io/en/latest/types/data_types/)

A data type representing a body region and the damage modifier(s) to apply when that region is hit. Used by the `modifiers` field of the [Body Part Damage Modifier (Power Type)](../power_types/body_part_damage_modifier.md).

### Structure
This data type is an [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of modifier entry objects. Each object defines either a named body region preset or a fully explicit coordinate range, plus one or more modifiers to apply.

---

### Fields

| Field       | Type                                                                                                                                                                             | Default    | Description                                                                                                                                                      |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `body_part` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)                                                                                                      | *optional* | A named preset defining the body region. See [Named Presets](#named-presets) below. If omitted, the region is defined by the explicit coordinate fields instead. |
| `x_min`     | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                                                                                                        | `-1.0`     | Minimum X bound of the region (entity's right side = −1). Ignored when `body_part` is set.                                                                       |
| `x_max`     | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                                                                                                        | `1.0`      | Maximum X bound of the region (entity's left side = +1). Ignored when `body_part` is set.                                                                        |
| `y_min`     | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                                                                                                        | `0.0`      | Minimum Y bound of the region (feet = 0). Ignored when `body_part` is set.                                                                                       |
| `y_max`     | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                                                                                                        | `1.0`      | Maximum Y bound of the region (top of head = 1). Ignored when `body_part` is set.                                                                                |
| `z_min`     | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                                                                                                        | `-1.0`     | Minimum Z bound of the region (front of entity = −1). Ignored when `body_part` is set.                                                                           |
| `z_max`     | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                                                                                                        | `1.0`      | Maximum Z bound of the region (back of entity = +1). Ignored when `body_part` is set.                                                                            |
| `modifier`  | [Modifier](https://origins.readthedocs.io/en/latest/types/data_types/attribute_modifier_operation/)                                                                              | *optional* | A single modifier to apply when the hit falls within this region.                                                                                                |
| `modifiers` | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Modifier](https://origins.readthedocs.io/en/latest/types/data_types/attribute_modifier_operation/) | *optional* | Multiple modifiers to apply when the hit falls within this region. Applied in order. Can be used together with `modifier`.                                       |

At least one of `modifier` or `modifiers` must be provided. Both can be specified at once and will be combined.

---

### Named Presets
The `body_part` field accepts the following values. All axes use the hit-space coordinate system.

| Value           | yNorm        | xNorm          | zNorm       | Description                            |
|-----------------|--------------|----------------|-------------|----------------------------------------|
| `any`           | 0.0 – 1.0    | −1.0 – 1.0     | −1.0 – 1.0  | Matches any hit location               |
| `head`          | 0.88 – 1.0   | −1.0 – 1.0     | −1.0 – 1.0  | Top of the hitbox                      |
| `torso`         | 0.50 – 0.88  | −0.80 – 0.80   | −1.0 – 1.0  | Mid-body, excluding the arm band       |
| `chest`         | 0.70 – 0.88  | −0.60 – 0.60   | −1.0 – 0.0  | Front of the upper torso               |
| `back`          | 0.50 – 0.88  | −0.60 – 0.60   | 0.0 – 1.0   | Back of the torso                      |
| `left_arm`      | 0.60 – 0.88  | 0.80 – 1.0     | −1.0 – 1.0  | Entity's left arm                      |
| `right_arm`     | 0.60 – 0.88  | −1.0 – −0.80   | −1.0 – 1.0  | Entity's right arm                     |
| `legs`          | 0.18 – 0.50  | −1.0 – 1.0     | −1.0 – 1.0  | Both legs combined                     |
| `feet`          | 0.0 – 0.18   | −1.0 – 1.0     | −1.0 – 1.0  | Both feet combined                     |
| `achilles_heel` | 0.0 – 0.12   | −0.35 – 0.35   | 0.30 – 1.0  | Back of the lower foot                 |

---

### Examples

```json
{
   "body_part":"head",
   "modifier":{
      "operation":"multiply_total_multiplicative",
      "value":1.5
   }
}
```
Hits to the head deal 150% extra damage.

```json
{
   "body_part":"torso",
   "modifiers":[
      {
         "operation":"add_base_early",
         "value":2.0
      },
      {
         "operation":"multiply_total_multiplicative",
         "value":-0.1
      }
   ]
}
```
Torso hits receive +2 flat damage first, then a 10% reduction on the total.

```json
{
    "y_min": 0.50,
    "y_max": 0.62,
    "x_min": -0.40,
    "x_max": 0.40,
    "z_min": 0.40,
    "z_max": 1.0,
    "modifier": {
        "operation": "multiply_total_multiplicative",
        "value": 1.75
    }
}
```
Defines a custom narrow zone at the lower back and applies a 75% damage bonus to hits within it.

```json
{
   "body_part":"any",
   "modifier":{
      "operation":"add_base_early",
      "value":-1.0
   }
}
```
Reduces all incoming damage by 1 regardless of where the hit lands. Useful as a base reduction combined with region-specific bonuses.

```json
[
   {
      "body_part":"head",
      "modifier":{
         "operation":"multiply_total_multiplicative",
         "value":0.5
      }
   },
   {
      "body_part":"back",
      "modifier":{
         "operation":"multiply_total_multiplicative",
         "value":0.3
      }
   },
   {
      "y_min":0.0,
      "y_max":0.12,
      "x_min":-0.35,
      "x_max":0.35,
      "z_min":0.30,
      "z_max":1.0,
      "modifier":{
         "operation":"multiply_total_multiplicative",
         "value":2.0
      }
   }
]
```
Three separate entries: head hits deal 50% extra, back hits deal 30% extra, and a custom achilles-heel zone deals double damage. A hit can match multiple entries simultaneously.

---

### Notes

- If both `body_part` and explicit coordinate fields (`x_min`, `x_max`, etc.) are present, `body_part` takes priority and the coordinate fields are ignored.
- Multiple entries in the array are evaluated independently. A single hit can match more than one entry, and all matching modifiers are applied in sequence.
- At least one of `modifier` or `modifiers` must be specified; an entry with neither is invalid.
- The Z axis (front/back) is only meaningful for projectile hits and player mêlée hits where real positional data is available. For fallback hits (mob attacks), `zNorm` is always `0.0` (center), so entries that require a non-zero Z range will not match.
