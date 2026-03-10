---
title: Key Pressed (Entity Condition)
date: 2024-01-07
---

# Key Pressed

[Entity Condition Types](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)

Checks if a player is pressing a specific key. Tracks both continuous holding and individual key presses.

Type ID: `sync:key_pressed`

### Fields

| Field        | Type                                                                          | Default | Description                                                     |
|--------------|-------------------------------------------------------------------------------|---------|-----------------------------------------------------------------|
| `key`        | [Key](https://origins.readthedocs.io/en/latest/types/data_types/key/)         |         | Translation key of the key to check                             |
| `continuous` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/) | `true`  | Whether to check for continuous press or just the initial press |

### Notes

- Only works on player entities
- Key states are tracked client-side and synced to server
- `continuous: false` only returns true on the tick when the key was first pressed

### Examples

```json
{
  "type": "sync:key_pressed",
  "key": {
    "key": "key.attack",
    "continuous": false
  }
}
```
This example checks if the player just pressed the attack button (left click).