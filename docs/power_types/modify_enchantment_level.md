---
title: Modify Enchantment Level (Power Type)
date: 2024-01-07
---

# Modify Enchantment Level

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Modifies the effective level of a specific enchantment on items, either adding levels that don't exist or changing existing enchantment levels.

Type ID: `sync:modify_enchantment_level`

### Fields

| Field            | Type                                                                                                                                                                              | Default    | Description                                                                                                                                   |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `enchantment`    | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)                                                                                               |            | ID of the enchantment to apply/modify the level of to the entity. (e.g., `"minecraft:sharpness"`).                                            |
| `item_condition` | [Item Condition](https://origins.readthedocs.io/en/latest/types/item_condition_types/)                                                                                            | *optional* | If specified, only applies/modifies the level of the specified enchantment to/from the entity if the item condition is fulfilled by the item. |
| `modifier`       | [Attribute Modifier](https://origins.readthedocs.io/en/latest/types/data_types/attribute_modifier/)                                                                               | *optional* | If specified, this modifier will be applied to the current level of the specified enchantment from the entity.                                |
| `modifiers`      | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Attribute Modifiers](https://origins.readthedocs.io/en/latest/types/data_types/attribute_modifier/) | *optional* | If specified, these modifiers will be applied to the current level of the specified enchantment from the entity.                              |

### How It Works

This power modifies the effective level of enchantments on items held or equipped by the entity. The modifications:
- Can add enchantments to items that don't normally have them
- Can increase or decrease the level of existing enchantments
- Work with the game's enchantment system (affecting damage, protection, etc.)
- Are temporary and only active while the power is active
- Stack with the item's actual enchantment level (if present)

Modifiers are applied to the base enchantment level (0 if the item doesn't have the enchantment). The final level is calculated using standard attribute modifier rules (addition, multiply_base, multiply_total).

### Notes

- When multiple powers modify the same enchantment, all modifiers are applied
- Empty item stacks can be given enchantments via this power
- The power updates dynamically as conditions change
- Original item enchantments are never permanently modified

### Examples

```json
{
    "type": "sync:modify_enchantment_level",
    "enchantment": "minecraft:sharpness",
    "modifier": {
        "operation": "addition",
        "value": 2
    }
}
```
Adds Sharpness II to any held weapon, or increases existing Sharpness by 2 levels.

```json
{
    "type": "sync:modify_enchantment_level",
    "enchantment": "minecraft:fire_aspect",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "tag": "minecraft:swords"
        }
    },
    "modifier": {
        "operation": "addition",
        "value": 1
    },
    "condition": {
        "type": "apoli:dimension",
        "dimension": "minecraft:the_nether"
    }
}
```
Gives swords Fire Aspect I while in the Nether.

```json
{
    "type": "sync:modify_enchantment_level",
    "enchantment": "minecraft:protection",
    "item_condition": {
        "type": "apoli:is_equippable",
        "equipment_slot": "chest"
    },
    "modifiers": [
        {
            "operation": "addition",
            "value": 4
        },
        {
            "operation": "multiply_total",
            "value": 0.5
        }
    ],
    "condition": {
        "type": "apoli:health",
        "comparison": "<=",
        "compare_to": 10
    }
}
```
At low health, adds Protection IV to chestplate then multiplies total protection by 1.5.