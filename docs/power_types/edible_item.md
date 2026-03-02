---
title: Edible Item (Power Type)
date: 2024-01-07
---

# Edible Item

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Makes non-food items consumable or modifies how food items work, with customizable nutrition, effects, animations, and result items.

Type ID: `sync:edible_item`

### Fields

| Field                      | Type                                                                                                                                                                              | Default                          | Description                                                                                                                                                                          |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `item_condition`           | [Item Condition](https://origins.readthedocs.io/en/latest/types/item_condition_types/)                                                                                            | *optional*                       | If specified, this action will be executed on the item consumed by the player.                                                                                                       |
| `food_component`           | [Food Component](https://origins.readthedocs.io/en/latest/types/data_types/food_component/)                                                                                       |                                  | The food component that the item grants upon eating it.                                                                                                                              |
| `entity_action`            | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)                                                                                              | *optional*                       | If specified, this action will be executed on the player upon consuming an item.                                                                                                     |
| `item_action`              | [Item Action](https://origins.readthedocs.io/en/latest/types/item_action_types/)                                                                                                  | *optional*                       | If specified, this action will be executed on the item consumed by the player.                                                                                                       |
| `result_item_action`       | [Item Action](https://origins.readthedocs.io/en/latest/types/item_action_types/)                                                                                                  | *optional*                       | If specified, this action will be executed on the item that is given to the player as a result of consuming an item.                                                                 |
| `result_stack`             | [Item Stack](https://origins.readthedocs.io/en/latest/types/data_types/item_stack/)                                                                                               | *optional*                       | If specified, this item stack will be given to the player.                                                                                                                           |
| `consume_animation`        | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/)                                                                                                       | `EAT`                            | Determines whether the animation effect for consuming the item should be "eating" (`EAT`, displays particle effects based on the item) or "drinking" (`DRINK`, no particle effects.) |
| `consume_sound`            | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)                                                                                               | `"minecraft:entity.generic.eat"` | If specified, the sound event with this namespace and ID will be played when the item is eaten.                                                                                      |
| `consuming_time_modifier`  | [Attribute Modifier](https://origins.readthedocs.io/en/latest/types/data_types/attribute_modifier/)                                                                               | *optional*                       | If specified, this modifier will be applied on the maximum time the item is being consumed (in ticks).                                                                               |
| `consuming_time_modifiers` | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Attribute Modifiers](https://origins.readthedocs.io/en/latest/types/data_types/attribute_modifier/) | *optional*                       | If specified, these modifiers will be applied on the the maximum time the item is being consumed (in ticks).                                                                         |
| `priority`                 | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)                                                                                                     | `0`                              | Determines the priority of which the power will apply its modification to the item. Must be higher than 0 if the item is already edible.                                             |

### How It Works

This power makes items edible or overrides existing food properties. When an item matches the `item_condition`, it becomes consumable with the specified `food_component` values. If multiple edible item powers apply to the same item, the one with the highest priority is used (for already-edible items, the priority must be positive to override default behavior).

### Notes

- Default consumption time is 32 ticks (16 for snacks)
- If `priority` ≤ 0 for already-food items, the vanilla food behavior is used instead
- The `result_stack` works like a container item (e.g., bowl from soup)
- Empty stacks can be made edible for special effects

### Examples

```json
{
    "type": "sync:edible_item",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:stick"
        }
    },
    "food_component": {
        "hunger": 1,
        "saturation": 0.2
    },
    "consume_animation": "EAT"
}
```
Makes sticks edible with minimal nutrition.

```json
{
   "type":"sync:edible_item",
   "item_condition":{
      "type":"apoli:ingredient",
      "ingredient":{
         "tag":"minecraft:flowers"
      }
   },
   "food_component":{
      "hunger":2,
      "saturation":0.5,
      "effect":{
         "effect":"minecraft:regeneration",
         "duration":200,
         "amplifier":0,
         "is_ambient":true,
         "show_particles":true,
         "show_icon":false
      }
   },
   "consume_animation":"EAT"
}
```
Makes flowers edible with regeneration effects.

```json
{
    "type": "sync:edible_item",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:glass_bottle"
        }
    },
    "food_component": {
        "hunger": 0,
        "saturation": 0,
        "always_edible": true
    },
    "consume_animation": "DRINK",
    "consume_sound": "minecraft:entity.generic.drink",
    "result_stack": {
        "item": "minecraft:potion",
        "tag": "{Potion:\"minecraft:water\"}"
    },
    "entity_action": {
        "type": "apoli:extinguish"
    }
}
```
Makes empty bottles drinkable to collect water and extinguish fire.