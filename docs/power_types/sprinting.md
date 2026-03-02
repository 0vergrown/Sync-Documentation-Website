---
title: Sprinting (Power Type)
date: 2024-01-07
---

# Sprinting

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Forces an entity to sprint automatically, either continuously or only when movement input is detected.

Type ID: `sync:sprinting`

### Fields

| Field            | Type                                                                          | Default | Description                                                                                                                          |
|------------------|-------------------------------------------------------------------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------|
| `requires_input` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `false` | If true, only sprints when the entity is providing movement input (forward key or sprint key). If false, always sprints when moving. |

### How It Works

The power checks every tick whether the entity is actually moving (using velocity) to prevent visual bugs. If the entity isn't moving, sprinting is not forced even if other conditions are met.

### Notes

- Only affects entities that can sprint (primarily players)
- Power must be active for sprinting to be forced
- Respects normal sprinting restrictions (hunger, status effects, etc.)
- Does not bypass sprint-preventing effects like slowness
- The `requires_input` check looks for `key.sprint` and `key.forward` keybindings

### Examples

```json
{
    "type": "sync:sprinting"
}
```
Always sprint when moving.

```json
{
    "type": "sync:sprinting",
    "requires_input": true
}
```
Sprint only when holding forward or sprint key (prevents auto-sprint).

```json
{
    "type": "sync:sprinting",
    "requires_input": false,
    "condition": {
        "type": "apoli:resource",
        "resource": "sync:adrenaline",
        "comparison": ">",
        "compare_to": 50
    }
}
```
Automatically sprint when adrenaline resource is above 50.