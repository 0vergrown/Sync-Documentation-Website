---
title: Colliding (Bi-entity Condition)
date: 2024-01-07
---

# Colliding

[Bi-entity Action Types](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)

Returns `true` if the **actor** entity's bounding box intersects the **target** entity's bounding box. An optional offset can shift the actor's box before the test.

Type ID: `sync:colliding`

### Fields

| Field    | Type                                                                        | Default    | Description                                                                  |
|----------|-----------------------------------------------------------------------------|------------|------------------------------------------------------------------------------|
| `offset` | [Vector](https://origins.readthedocs.io/en/latest/types/data_types/vector/) | *optional* | Offsets the actor's bounding box by this amount before the intersection test |

### Notes

- Both bounding boxes are used as-is from the entity's current position, no expansion or margin is applied.
- Returns `false` if either entity has no bounding box (e.g. spectators).

### Examples

```json
{
    "type": "sync:colliding"
}
```
Returns `true` if the actor and target are physically overlapping.

```json
{
  "type":"sync:colliding",
  "offset":{
    "x":0,
    "y":0,
    "z":1.5
  }
}
```
Checks if the actor's bounding box, shifted 1.5 blocks forward, overlaps the target.