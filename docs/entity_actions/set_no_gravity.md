---
title: Set No Gravity (Entity Action Type)
date: 2024-01-07
---

# Set No Gravity

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Sets whether an entity is affected by gravity.

Type ID: `sync:set_no_gravity`

### Fields

Field   | Type                                                                                                | Default  | Description
--------|-----------------------------------------------------------------------------------------------------|----------|-------------
`value` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                       | *optional* | If present, sets the entity’s no‑gravity flag to this value. If omitted, toggles the current value.

### How It Works

- When `value` is provided, the entity’s `hasNoGravity()` is set to that boolean.
- When `value` is omitted, the entity’s gravity state is inverted: if it had gravity, it loses it; if it had no gravity, it regains it.

This action works on any entity (players, mobs, items, projectiles, etc.).

### Examples

```json
{
    "type": "sync:set_no_gravity",
    "value": true
}
```
Makes the entity ignore gravity (float in place).

```json
{
    "type": "sync:set_no_gravity"
}
```
Toggles the entity’s gravity state. If it was falling, it now stops falling; if it was floating, it starts falling.

```json
{
    "type": "apoli:if_else",
    "condition": {
        "type": "apoli:status_effect",
        "effect": "minecraft:levitation"
    },
    "if_action": {
        "type": "sync:set_no_gravity",
        "value": true
    },
    "else_action": {
        "type": "sync:set_no_gravity",
        "value": false
    }
}
```
While levitating, the entity has no gravity; otherwise it has normal gravity.