---
title: Modify Jade Tooltip (Power Type)
date: 2024-01-07
---

# Modify Jade Tooltip

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Controls how this entity appears in [Jade](https://modrinth.com/mod/jade)'s tooltip when viewed by another entity.

Type ID: `sync:modify_jade_tooltip`

> **Requires Jade.** This power type is only registered when Jade is present. It has no effect without it.

### Fields

| Field                 | Type                                                                                            | Default    | Description                                                                                                               |
|-----------------------|-------------------------------------------------------------------------------------------------|------------|---------------------------------------------------------------------------------------------------------------------------|
| `hide_tooltip`        | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                   | `false`    | If `true`, hides the Jade tooltip entirely when this entity is looked at                                                  |
| `display_name`        | [Text](https://origins.readthedocs.io/en/latest/types/data_types/text/)                         | *optional* | Replaces the entity's name line in the tooltip                                                                            |
| `hide_health`         | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                   | `false`    | If `true`, hides the health hearts row                                                                                    |
| `hide_armor`          | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                   | `false`    | If `true`, hides the armor row                                                                                            |
| `hide_potion_effects` | [Boolean](https://origins.readthedocs.io/en/latest/types/data_types/boolean/)                   | `false`    | If `true`, hides the potion effects row                                                                                   |
| `priority`            | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)                   | `0`        | When multiple powers of this type are active, only the one with the highest priority takes effect                         |
| `entity_condition`    | [Entity Condition](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)      | *optional* | Tested on the **viewer**. The power only applies when this condition passes                                               |
| `bientity_condition`  | [Bi-entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | Tested with the **viewer as actor** and the **power holder as target**. The power only applies when this condition passes |

### Notes

- Conditions are checked per-frame on the client against the viewer (the player looking at the entity). Use `entity_condition` for simple viewer-state checks and `bientity_condition` for relationship checks (e.g. distance).
- When multiple `sync:modify_jade_tooltip` powers are active simultaneously, **only the highest-priority one** takes effect. Lower-priority powers are ignored entirely.
- `hide_tooltip` takes precedence over all other fields, if it is `true`, the tooltip is cleared and nothing else runs.

### Examples

```json
{
  "type":"sync:modify_jade_tooltip",
  "hide_health":true,
  "hide_armor":true,
  "display_name":{
    "text":"???",
    "color":"dark_red",
    "bold":true
  }
}
```
Hides health and armor, and replaces the entity's name with a menacing `???` for all viewers.

```json
{
  "type":"sync:modify_jade_tooltip",
  "hide_tooltip":true,
  "bientity_condition":{
    "type":"apoli:distance",
    "comparison":">=",
    "compare_to":16
  }
}
```
Hides the entire Jade tooltip when the viewer is 16 or more blocks away.

```json
{
  "type":"sync:modify_jade_tooltip",
  "display_name":{
    "text":"Disguised Entity",
    "italic":true,
    "color":"gray"
  },
  "priority":10,
  "entity_condition":{
    "type":"sync:disguised",
    "inverted":true
  }
}
```
Shows a "Disguised Entity" name for viewers who can't see through the disguise. Higher priority ensures it wins over a conflicting base power.