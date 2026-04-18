---
title: Cooldown (Item Action)
date: 2024-12-20
---

# Cooldown

[Item Action Types](https://origins.readthedocs.io/en/latest/types/item_action_types/)

Sets a cooldown on the item stack, preventing the player holding it from using it until the cooldown expires.

Type ID: `sync:cooldown`

### Fields

| Field   | Type                                                                          | Default | Description                                                   |
|---------|-------------------------------------------------------------------------------|---------|---------------------------------------------------------------|
| `ticks` | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/) | `20`    | Duration of the cooldown in game ticks (20 ticks = 1 second). |

### How It Works

- The item action requires the item stack to be linked to an entity (typically a player holding the item).
- When executed, it sets a cooldown on the item's type in the holder's item cooldown manager.
- If the item is not being held by a player, the action does nothing.
- The cooldown prevents the item from being used until it expires, regardless of where the item is in the player's inventory.
- The [On Cooldown](../item_conditions/on_cooldown.md) item condition can be used to check if an item is currently on cooldown.

### Examples

```json
{
  "type": "sync:cooldown",
  "ticks": 100
}
```
Sets a 5-second cooldown on the item.
