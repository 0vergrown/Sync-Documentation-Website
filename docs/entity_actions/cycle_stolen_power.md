---
title: Cycle Stolen Power (Entity Action)
date: 2024-01-07
---

# Cycle Stolen Power

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Advances or reverses the entity's stolen-power selection index, wrapping around when it reaches either end. Displays the new selection in the action bar for players.

Type ID: `sync:cycle_stolen_power`

### Fields

| Field   | Type                                                                          | Default | Description                                                                 |
|---------|-------------------------------------------------------------------------------|---------|-----------------------------------------------------------------------------|
| `delta` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `1`     | How many slots to advance. Positive moves forward, negative moves backward  |

### Notes

- Only runs server-side.
- Wraps around using `Math.floorMod`, so cycling backward from slot 0 goes to the last slot.
- The action bar message shows `[current/total] source_id` so players know which package is active.
- If the entity has no stolen packages, a "No stolen powers to cycle" message is shown and nothing changes.

### Examples

```json
{
    "type": "sync:cycle_stolen_power"
}
```
Advance to the next stolen power package.

```json
{
    "type": "sync:cycle_stolen_power",
    "delta": -1
}
```
Go back to the previous stolen power package.