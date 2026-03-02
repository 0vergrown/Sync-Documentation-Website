---
title: Holder Condition (Item Condition Type)
date: 2024-12-20
---

# Holder Condition

[Item Condition Types](https://origins.readthedocs.io/en/latest/types/item_condition_types/)

Checks whether the entity holding this item stack meets a given [Entity Condition](https://origins.readthedocs.io/en/latest/types/entity_condition_types/). If the item stack has no holder, the condition returns `false`.

Type ID: `sync:holder_condition`

### Fields

| Field       | Type                                                                                       | Default    | Description                                                                                                |
|-------------|--------------------------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------|
| `condition` | [Entity Condition](https://origins.readthedocs.io/en/latest/types/entity_condition_types/) | *optional* | The condition to test on the holder. If omitted, the condition simply returns `true` when a holder exists. |

### How It Works

- The item stack must be linked to a holder (as described in [`Holder Action`](../item_actions/holder_action.md) Item Action).
- If `condition` is provided, it is evaluated on the holder entity; the overall condition succeeds if the holder exists and the condition passes.
- If `condition` is omitted, the condition succeeds if the stack has any holder at all.

### Examples
```json
{
  "type": "sync:holder_condition",
  "condition": {
    "type": "apoli:entity_type",
    "entity_type": "minecraft:player"
  }
}
```
Check if the holder is a player.
```json
{
  "type": "sync:holder_condition",
  "condition": {
    "type": "apoli:sneaking"
  }
}
```
Check if the holder is sneaking.
```json
{
  "type": "sync:holder_condition"
}
```
Check if the stack is being held at all.