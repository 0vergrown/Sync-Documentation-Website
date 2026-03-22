---
title: Body Part Damage Modifier (Power Type)
date: 2026-03-22
---

# Body Part Damage Modifier

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Modifies incoming damage based on which part of the entity's body was hit. Works accurately for projectiles (arrows, tridents) using real hit-position data, and for player melee attacks by raycasting the attacker's look direction against the target's bounding box.

Type ID: `sync:body_part_damage_modifier`

### Fields

| Field              | Type                                                                                                                                               | Default    | Description                                                                                                                                                                  |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `modifiers`        | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Body Part Modifier Entry](../data_types/body_part_modifier_entry.md) |            | A list of body zone / modifier pairs. Each entry defines a region of the body and the modifier(s) to apply when that region is hit. Multiple entries can match the same hit. |
| `damage_condition` | [Damage Condition](https://origins.readthedocs.io/en/latest/types/damage_condition_types/)                                                         | *optional* | If present, the entire power only fires when this condition is satisfied by the incoming damage source and amount.                                                           |
| `require_hit_data` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                                                                      | `false`    | If `true`, the power only fires when real positional hit data is available (projectiles and player melee). Mob attacks and environmental damage are ignored entirely.        |

### Notes

- All matching entries in `modifiers` are applied in order. A single hit can match more than one entry.
- The power runs server-side only, before vanilla armor and absorption calculations.
- `require_hit_data: true` is recommended for weak-spot powers (headshots, achilles heel) that should not proc on mob melee swings or environmental damage.

### Examples
```json
{
   "type":"sync:body_part_damage_modifier",
   "require_hit_data":true,
   "damage_condition":{
      "type":"apoli:damage_type",
      "tag":"minecraft:is_projectile"
   },
   "modifiers":[
      {
         "body_part":"head",
         "modifier":{
            "operation":"multiply_total_multiplicative",
            "value":1.5
         }
      }
   ]
}
```
Headshot bonus for projectiles when arrows and tridents that hit the head deal 50% extra damage. Melee and non-projectile sources are unaffected.

```json
{
   "type":"sync:body_part_damage_modifier",
   "require_hit_data":true,
   "modifiers":[
      {
         "body_part":"achilles_heel",
         "modifier":{
            "operation":"multiply_total_multiplicative",
            "value":2.0
         }
      }
   ]
}
```
Hits to the back of the lower foot deal double damage.

```json
{
   "type":"sync:body_part_damage_modifier",
   "modifiers":[
      {
         "body_part":"head",
         "modifier":{
            "operation":"multiply_total_multiplicative",
            "value":0.5
         }
      },
      {
         "body_part":"torso",
         "modifier":{
            "operation":"multiply_total_multiplicative",
            "value":-0.2
         }
      },
      {
         "body_part":"legs",
         "modifier":{
            "operation":"multiply_total_multiplicative",
            "value":-0.1
         }
      },
      {
         "body_part":"feet",
         "modifier":{
            "operation":"multiply_total_multiplicative",
            "value":-0.3
         }
      }
   ]
}
```
Per-region damage table. Head hits deal 50% more damage; torso, legs, and feet hits deal progressively less.
