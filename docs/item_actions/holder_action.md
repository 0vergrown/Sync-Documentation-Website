---
title: Holder Action (Item Action Type)
date: 2024-12-20
---

# Holder Action

[Item Action Types](https://origins.readthedocs.io/en/latest/types/item_action_types/)

Executes an [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) on the entity that is currently holding this item stack. If the item stack is not being held by any entity (e.g. it's on the ground or in a container), nothing happens.

Type ID: `sync:holder_action`

### Fields

| Field    | Type                                                                                 | Default | Description                                             |
|----------|--------------------------------------------------------------------------------------|---------|---------------------------------------------------------|
| `action` | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/) |         | The action to perform on the holder of this item stack. |

### How It Works

- The item stack must be linked to an entity (this is automatically the case when the stack is in a player’s inventory, in an entity’s hand, or being carried by an item entity).
- When the action runs, it retrieves the holder from the item stack and applies the specified entity action to that holder.
- If the stack has no holder, the action does nothing.

### Examples
```json
{
  "type": "sync:holder_action",
  "action": {
    "type": "apoli:set_on_fire",
    "duration": 2
  }
}
```
Sets the holder on fire.
```json
{
  "type": "sync:holder_action",
  "action": {
    "type": "apoli:apply_effect",
    "effect": {
      "effect": "minecraft:speed",
      "duration": 40,
      "amplifier": 1
    }
  }
}
```
Give the holder a speed boost while holding the item.