---
title: Modify Enchantment Damage Dealt (Power Type)
date: 2024-01-07
---

# Modify Enchantment Damage Dealt

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Modifies damage dealt to entities based on the level of a specific enchantment on the attacker's equipment.

Type ID: `sync:modify_enchantment_damage_dealt`

### Fields

Field                 | Type                                                                                                                | Default | Description
----------------------|---------------------------------------------------------------------------------------------------------------------|---------|-------------
`enchantment`         | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)                                 |         | The enchantment whose level on the attacker's equipment determines the bonus.
`base_value`          | [Float](https://origins.readthedocs.io/en/latest/types/data_types/float/)                                           |         | Starting value before any level-based scaling.
`damage_condition`    | [Damage Condition](https://origins.readthedocs.io/en/latest/types/damage_condition_types/)                          | *optional* | If present, the modification only applies when the damage condition is met.
`target_condition`    | [Entity Condition](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)                          | *optional* | If present, the modification only applies when the target condition is met.
`bientity_condition`  | [Bi‑entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/)                     | *optional* | If present, the modification only applies when the bi‑entity condition between attacker and target is met.
`modifier`            | [Attribute Modifier](https://origins.readthedocs.io/en/latest/types/data_types/attribute_modifier/)                 | *optional* | Modifier applied repeatedly to scale the bonus per enchantment level.
`modifiers`           | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Attribute Modifiers](https://origins.readthedocs.io/en/latest/types/data_types/attribute_modifier/) | *optional* | Multiple modifiers applied repeatedly.
`bientity_action`     | [Bi‑entity Action](https://origins.readthedocs.io/en/latest/types/bientity_action_types/)                           | *optional* | Action to execute on the attacker and target when damage is dealt.

### How It Works

For each level of the specified enchantment on the attacker’s equipment, the power calculates a running bonus:

1. Start with `base_value`.
2. For each level beyond the first (i.e., level‑1 times), apply all defined modifiers (from `modifier` and/or `modifiers`) to the current bonus.
3. The final bonus is added to the outgoing damage as an `ADD_BASE_EARLY` modifier.

Because modifiers are applied repeatedly, the scaling can be linear, multiplicative, or exponential depending on the chosen operations. The modifiers themselves are applied using the same rules as Apoli’s standard modifier system.

If the attacker does not have the enchantment (level 0), no bonus is applied.

### Notes

- The power only works while the attacker is a living entity.
- If both `modifier` and `modifiers` are present, all are applied in the order they are listed (first `modifier`, then the list).
- The enchantment level is taken from the **attacker’s equipped items** using `EnchantmentHelper.getEquipmentLevel()`.

### Examples

```json
{
    "type": "sync:modify_enchantment_damage_dealt",
    "enchantment": "minecraft:sharpness",
    "base_value": 1.0,
    "modifier": {
        "operation": "multiply_base",
        "value": 0.5
    }
}
```
With Sharpness I, bonus = 1.0.<br>
With Sharpness II, bonus = 1.0 * 1.5 = 1.5.<br>
With Sharpness III, bonus = (1.0 * 1.5) * 1.5 = 2.25.<br>
The final damage is increased by that amount.

```json
{
    "type": "sync:modify_enchantment_damage_dealt",
    "enchantment": "minecraft:power",
    "base_value": 2.0,
    "modifiers": [
        {
            "operation": "addition",
            "value": 1.0
        },
        {
            "operation": "multiply_base",
            "value": 0.2
        }
    ],
    "damage_condition": {
        "type": "apoli:projectile"
    }
}
```
Only affects projectile damage. For Power I, bonus = 2.0.<br>
For Power II, bonus = (2.0 + 1.0) * 1.2 = 3.6.<br>
For Power III, bonus = (3.6 + 1.0) * 1.2 = 5.52.