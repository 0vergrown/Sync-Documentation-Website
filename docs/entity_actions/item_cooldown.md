---
title: Item Cooldown (Entity Action)
date: 2024-12-20
---

# Item Cooldown

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Sets cooldowns on items in a player's inventory, preventing those items from being used until the cooldown expires.

Type ID: `sync:item_cooldown`

### Fields

| Field       | Type                                                                                                  | Default    | Description                                                                                                     |
|-------------|-------------------------------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------|
| `items`     | [List of Items Identifiers](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)    | *optional* | Specific items to set cooldowns on.                                                                             |
| `item_tags` | [List of Item Tag Identifiers](https://origins.readthedocs.io/en/latest/types/data_types/identifier/) | *optional* | Item tags matching multiple items to set cooldowns on. At least one of `items` or `item_tags` must be provided. |
| `ticks`     | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)                         | `20`       | Duration of the cooldown in game ticks (20 ticks = 1 second).                                                   |

### Notes

- Only works on `PlayerEntity` instances server-side. If executed on a non-player entity, nothing happens.
- If the player is not holding any of the specified items, the cooldown is still set (affecting the item whenever it's held).
- Both `items` and `item_tags` can be used in the same action to cooldown both specific items and tagged items.
- At least one of `items` or `item_tags` must be provided, otherwise the action does nothing.
- The [On Cooldown](../item_conditions/on_cooldown.md) item condition can be used to check if an item is currently on cooldown.

### Examples

```json
{
  "type":"sync:item_cooldown",
  "items":[
    "minecraft:diamond_sword"
  ],
  "ticks":100
}
```
Sets a 5-second cooldown on diamond swords.

```json
{
  "type":"sync:item_cooldown",
  "item_tags":[
    "minecraft:tools"
  ],
  "ticks":200
}
```
Sets a 10-second cooldown on all items tagged as tools.
