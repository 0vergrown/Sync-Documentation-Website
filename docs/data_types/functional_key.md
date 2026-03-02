---
title: Functional Key (Data Type)
date: 2024-12-20
---

# Functional Key

[Data Type](https://origins.readthedocs.io/en/latest/types/data_types/)

A data type representing a keybind that can be pressed to trigger an action, optionally with continuous detection. Used by the [`keys`](#) field of the [`sync:action_on_key_sequence`](../power_types/action_on_key_sequence.md) power type.

### Fields

If specified as an **object**, the fields are:

| Field        | Type                                                                                 | Default    | Description                                                                                                    |
|--------------|--------------------------------------------------------------------------------------|------------|----------------------------------------------------------------------------------------------------------------|
| `key`        | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)          |            | The translation key of the keybind (e.g. `"key.jump"`, `"key.attack"`). See [Key Names](#key-names) below.     |
| `continuous` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)        | `false`    | If `true`, the key is considered pressed every tick it is held down; if `false`, it only fires once per press. |
| `action`     | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) | *optional* | The action to execute on the player when the key is pressed (or held, if continuous).                          |

If specified as a **string**, it is treated as the `key` field with `continuous` defaulting to `false` and no `action`.

---

### Key Names

The `key` field accepts any valid key translation key. Common examples:

| Key                    | Value                    |
|------------------------|--------------------------|
| Jump                   | `key.jump`               |
| Sneak                  | `key.sneak`              |
| Attack                 | `key.attack`             |
| Use Item / Place Block | `key.use`                |
| Forward                | `key.forward`            |
| Back                   | `key.back`               |
| Left                   | `key.left`               |
| Right                  | `key.right`              |
| Drop                   | `key.drop`               |
| Inventory              | `key.inventory`          |
| Swap Hands             | `key.swapHands`          |
| Pick Block             | `key.pickItem`           |
| Chat                   | `key.chat`               |
| Command                | `key.command`            |
| Social Interactions    | `key.socialInteractions` |
| Advancements           | `key.advancements`       |
| Spectator Outlines     | `key.spectatorOutlines`  |
| Screenshot             | `key.screenshot`         |
| Smooth Camera          | `key.smoothCamera`       |
| Fullscreen             | `key.fullscreen`         |
| Toggle Perspective     | `key.togglePerspective`  |

For a complete list, refer to the vanilla `KeyBinding` class or the [GLFW key names](https://www.glfw.org/docs/latest/group__keys.html).

---

### Examples

**String shorthand** (just the key, no action, non‑continuous):
```json
"keys": [
    "key.forward"
]
```

**Object with an action**:
```json
"keys": [
    {
        "key": "key.jump",
        "continuous": false,
        "action": {
            "type": "apoli:execute_command",
            "command": "me jumped!"
        }
    }
]
```

**Continuous key with action** (fires every tick while held):
```json
"keys": [
    {
        "key": "key.attack",
        "continuous": true,
        "action": {
            "type": "apoli:apply_effect",
            "effect": {
                "effect": "minecraft:weakness",
                "duration": 20,
                "amplifier": 0
            }
        }
    }
]
```