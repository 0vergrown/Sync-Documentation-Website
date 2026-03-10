---
title: Is Selected Stolen Power (Entity Condition)
date: 2024-01-07
---

# Is Selected Stolen Power

[Entity Condition Types](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)

Returns `true` if the entity currently has a stolen power package selected (via [Cycle Stolen Power](../entity_actions/cycle_stolen_power.md)), optionally checking whether the selection matches a specific source identifier.

Type ID: `sync:is_selected_stolen_power`

### Fields

| Field    | Type                                                                                | Default    | Description                                                                                                |
|----------|-------------------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------|
| `source` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | *optional* | If provided, returns `true` only if the currently selected stolen package came from this source identifier |

### Notes

- If `source` is omitted, the condition simply checks whether the entity has **any** stolen power package selected at all.
- This is useful for gating a [Use Selected Stolen Power](../entity_actions/use_selected_stolen_power.md) or [Transfer (give mode)](../bientity_actions/transfer.md) call behind a UI check.
- Returns `false` for entities that have never stolen any powers.

### Examples

```json
{
    "type": "sync:is_selected_stolen_power"
}
```
Returns `true` if the entity has any stolen power package selected.

```json
{
    "type": "sync:is_selected_stolen_power",
    "source": "my_datapack:origin_powers"
}
```
Returns `true` only if the currently selected package originally came from `my_datapack:origin_powers`.