---
title: Action On Key Sequence (Power Type)
date: 2024-12-20
---

# Action On Key Sequence

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Executes an action when the player presses a specific sequence of keys.

Type ID: `sync:action_on_key_sequence`

### Fields

| Field            | Type                                                                                                                                                     | Default                    | Description                                                                                                                                                                                                                              |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `success_action` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)                                                                     | *optional*                 | Action to execute when the player completes the sequence correctly.                                                                                                                                                                      |
| `fail_action`    | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)                                                                     | *optional*                 | Action to execute when the player presses an incorrect key (i.e. a key that is not the next expected one).                                                                                                                               |
| `cooldown`       | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)                                                                            | `0`                        | Interval in ticks the power must wait after a successful completion before it can be used again.                                                                                                                                         |
| `hud_render`     | [Hud Render](https://origins.readthedocs.io/en/latest/types/data_types/hud_render/)                                                                      | `{"should_render": false}` | Determines how the cooldown is visualized on the HUD.                                                                                                                                                                                    |
| `keys`           | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Functional Key](../data_types/functional_key.md)                           |                            | The set of keys that are tracked by this power. Each entry defines a key, whether it is continuous, and an optional action that runs whenever that key is pressed (or held). These keys are the only ones that can advance the sequence. |
| `key_sequence`   | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) |                            | The exact order of keys (by their translation key) that the player must press to trigger `success_action`.                                                                                                                               |

### How It Works

1. The power tracks the state of every key listed in `keys` and executes the associated `action` whenever the key is pressed (or held if `continuous` is true).
2. It maintains an internal progress index pointing to the next expected key in `key_sequence`.
3. When a key that matches the next expected key is pressed (or held, if `continuous`), progress advances.
    - If the pressed key is not the next expected one **and** the sequence has already started, the `fail_action` runs (if provided) and the progress resets (or potentially moves to a different start - see "Resetting Behavior" below).
4. If the progress reaches the end of the sequence, `success_action` runs, the power goes on cooldown, and progress is reset.
5. The cooldown is independent of the sequence state and only affects the ability to complete the sequence again.

**Resetting Behavior:**  
When an incorrect key is pressed, the power looks at the first key of the sequence. If the incorrect key happens to match that first key, the sequence starts over from position 1; otherwise it resets completely (progress = 0). This allows “over‑typing” where a correct key can re‑start the sequence without a fail penalty if it also matches the first key.

### Examples
```json
{
    "type": "sync:action_on_key_sequence",
    "success_action": {
        "type": "apoli:heal",
        "amount": 4
    },
    "cooldown": 100,
    "hud_render": {
        "should_render": true
    },
    "keys": [
        {
            "key": "key.jump",
            "continuous": false,
            "action": {
                "type": "apoli:execute_command",
                "command": "me jumped!"
            }
        },
        "key.attack",
        "key.use"
    ],
    "key_sequence": [
        "key.attack",
        "key.attack",
        "key.jump"
    ]
}
```
Pressing `attack` -> `attack` -> `jump` heals the player by 4 health points.
```json
{
    "type": "sync:action_on_key_sequence",
    "success_action": {
        "type": "apoli:execute_command",
        "command": "me casted 'KONAMI CODE'!"
    },
    "fail_action": {
        "type": "apoli:damage",
        "source": {
            "name": "generic"
        },
        "amount": 10
    },
    "cooldown": 200,
    "hud_render": {
        "should_render": true
    },
    "keys": [
        {
            "key": "key.jump",
            "action": {
                "type": "apoli:execute_command",
                "command": "say UP"
            }
        },
        {
            "key": "key.sneak",
            "action": {
                "type": "apoli:execute_command",
                "command": "say DOWN"
            }
        },
        {
            "key": "key.left",
            "action": {
                "type": "apoli:execute_command",
                "command": "say LEFT"
            }
        },
        {
            "key": "key.right",
            "action": {
                "type": "apoli:execute_command",
                "command": "say RIGHT"
            }
        },
        {
            "key": "key.attack",
            "action": {
                "type": "apoli:execute_command",
                "command": "say A (Attack)"
            }
        },
        {
            "key": "key.use",
            "action": {
                "type": "apoli:execute_command",
                "command": "say B (Use)"
            }
        }
    ],
    "key_sequence": [
        "key.jump",
        "key.jump",
        "key.sneak",
        "key.sneak",
        "key.left",
        "key.right",
        "key.left",
        "key.right",
        "key.use",
        "key.attack"
    ]
}
```
Pressing the classic Konami sequence (`↑ ↑ ↓ ↓ ← → ← → B A`) broadcasts a message. If the player makes a mistake, they take 10 damage.
### Notes

- The power works only on the **server** side; key press states are synced from the client via custom packets.
- If the power is on cooldown, key presses are still detected and their per‑key actions are executed, but the sequence progress is **not** updated (i.e. the sequence cannot be completed until the cooldown ends).
- The `keys` array can mix string and object forms. All keys listed there are considered "tracked", pressing any other key does **not** affect the sequence.
- Continuous keys (`continuous: true`) fire their action every tick they are held and also count as a press every tick for sequence advancement.