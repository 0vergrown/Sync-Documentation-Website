---
title: Perspective (Entity Condition)
date: 2024-01-07
---

# Perspective

[Entity Condition Types](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)

Returns `true` if the player's current camera perspective matches one of the specified values. The perspective is tracked server-side via a client-to-server packet sent whenever the player switches view.

Type ID: `sync:perspective`

### Fields

| Field          | Type                                                                                                                                                     | Default    | Description                                         |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|------------|-----------------------------------------------------|
| `perspectives` | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | *required* | One or more perspective names the entity must match |

### Perspective Values

| Value                 | Description                        |
|-----------------------|------------------------------------|
| `first_person`        | Standard first-person view         |
| `third_person_back`   | Third-person camera behind player  |
| `third_person_front`  | Third-person camera facing player  |

### Notes

- Only works for **player** entities (non-players always return `false`).
- Defaults to `"first_person"` if the player has not yet sent a perspective packet (e.g. just joined).
- The condition is evaluated **server-side** using the last-received client state.

### Examples

```json
{
  "type":"sync:perspective",
  "perspectives":[
    "first_person"
  ]
}
```
Returns `true` while the player is in first-person view.

```json
{
  "type":"sync:perspective",
  "perspectives":[
    "third_person_back",
    "third_person_front"
  ]
}
```
Returns `true` whenever the player is in any third-person perspective.