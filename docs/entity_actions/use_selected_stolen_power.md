---
title: Use Selected Stolen Power (Entity Action)
date: 2024-01-07
---

# Use Selected Stolen Power

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Activates all `ActiveCooldownPower` instances in the entity's currently selected stolen power package, as though the player had pressed their activation key for each one.

Type ID: `sync:use_selected_stolen_power`

### Fields

*This action type has no fields.*

### Notes

- Only runs server-side.
- Only powers that are instances of Apoli's `ActiveCooldownPower` are triggered; passive powers in the package are ignored.
- Use [Is Selected Stolen Power](../entity_conditions/is_selected_stolen_power.md) to guard against calling this when no package is selected.
- The selected package can be cycled with [Cycle Stolen Power](./cycle_stolen_power.md).

### Examples

```json
{
    "type": "sync:use_selected_stolen_power"
}
```

Trigger this from a key binding to let a player use the active power they've stolen from another entity.