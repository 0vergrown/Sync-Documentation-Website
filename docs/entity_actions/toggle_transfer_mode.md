---
title: Toggle Transfer Mode (Entity Action)
date: 2024-01-07
---

# Toggle Transfer Mode

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Flips the entity's active transfer mode between **STEAL** and **GIVE**, displayed in the action bar. Used in combination with [Transfer](../bientity_actions/transfer.md) with `"mode": "auto"`.

Type ID: `sync:toggle_transfer_mode`

### Fields

*This action type has no fields.*

### Notes

- Defaults to **STEAL** mode if the entity has never toggled.
- Only has a visual effect (action bar message) for `ServerPlayerEntity` instances.
- The current mode can be read by setting `"mode": "auto"` on a `sync:transfer` action.
- State is cleaned up on player disconnect and player death.

### Examples

```json
{
    "type": "sync:toggle_transfer_mode"
}
```

Bind this to a key to let the player switch between stealing and giving powers before using `sync:transfer`.