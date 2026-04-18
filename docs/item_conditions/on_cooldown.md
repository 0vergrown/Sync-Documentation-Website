---
title: On Cooldown (Item Condition)
date: 2024-12-20
---

# On Cooldown

[Item Condition Types](https://origins.readthedocs.io/en/latest/types/item_condition_types/)

Checks whether the item stack is currently on cooldown. Returns `true` if the item's type has an active cooldown in the holder's item cooldown manager.

Type ID: `sync:on_cooldown`

### Fields

This condition has no fields.

### How It Works

- The condition requires the item to be linked to a `PlayerEntity` (typically an item in the player's inventory or being held).
- Returns `true` if the player's item cooldown manager has an active cooldown for this item type.
- Returns `false` if the item is not being held by a player or if the item is not on cooldown.
- The cooldown is tracked by item type, so all instances of the same item share the same cooldown.
- Cooldowns are set using the [Cooldown](../item_actions/cooldown.md) item action or the [Item Cooldown](../entity_actions/item_cooldown.md) entity action.

### Examples

```json
{
  "type": "sync:on_cooldown"
}
```
Returns `true` if the item is currently on cooldown.
