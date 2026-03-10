---
title: Loop (Meta Action)
date: 2024-01-07
---

# Loop

[Meta Action Types](https://origins.readthedocs.io/en/latest/types/meta_action_types/)

Executes an action a specified number of times, spacing each iteration by a configurable tick interval so they never all fire on the same game tick.

Type ID: `sync:loop`

### Fields

| Field           | Type                                                                                 | Default    | Description                                                    |
|-----------------|--------------------------------------------------------------------------------------|------------|----------------------------------------------------------------|
| `value`         | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)        | `1`        | Number of times `action` is executed                           |
| `ticks`         | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)        | `1`        | Tick interval between iterations. Minimum effective value is 1 |
| `before_action` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional* | Fired once immediately before the first iteration begins       |
| `action`        | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional* | Fired once per iteration                                       |
| `after_action`  | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional* | Fired once after the final iteration completes                 |

### Timing

With `value: 3` and `ticks: 5`:

| Tick | Event                                  |
|------|----------------------------------------|
| 0    | `before_action`                        |
| 5    | `action` (iter 1)                      |
| 10   | `action` (iter 2)                      |
| 15   | `action` (iter 3), then `after_action` |

When `value` is `0`: `before_action` fires immediately, the loop body never runs, and `after_action` fires at the end of the current tick.

### Notes

- Iterations are scheduled via Apoli's `Scheduler`, which hooks into `ServerTickEvents.END_SERVER_TICK`. All scheduling is server-side.
- Each scheduled callback captures the entity reference at the time the action fires. If the entity is removed before a scheduled tick, the callback is still invoked but any component access will return `null`/empty.
- `ticks` is clamped to a minimum of 1 to prevent all iterations from firing simultaneously.

### Examples

```json
{
  "type":"sync:loop",
  "value":5,
  "ticks":10,
  "action":{
    "type":"apoli:spawn_particles",
    "particle":{
      "type":"minecraft:flame"
    },
    "count":3
  }
}
```
Spawns flame particles five times, once every 10 ticks (0.5 seconds).

```json
{
  "type":"sync:loop",
  "value":3,
  "ticks":20,
  "before_action":{
    "type":"apoli:play_sound",
    "sound":"minecraft:block.note_block.pling"
  },
  "action":{
    "type":"apoli:damage",
    "amount":2,
    "damage_type": "minecraft:on_fire"
  },
  "after_action":{
    "type":"apoli:play_sound",
    "sound":"minecraft:entity.generic.explode"
  }
}
```
Plays a pling, deals 2 magic damage three times at 1-second intervals, then plays an explosion sound.