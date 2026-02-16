---
title: Prevent Label Render (Power Type)
date: 2024-01-07
---

# Prevent Label Render

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Prevents the name tag label of the entity that has the power from rendering to specific viewers.

Type ID: `sync:prevent_label_render`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`entity_condition` | [Entity Condition](https://origins.readthedocs.io/en/latest/types/entity_condition_types/) | *optional* | If specified, the name tag will **only** be hidden from viewers that fulfill this condition.
`bientity_condition` | [Bi-entity Condition](https://origins.readthedocs.io/en/latest/types/bientity_condition_types/) | *optional* | If specified, the name tag will **only** be hidden from viewers that fulfill this condition in relation to the power holder. The condition pair is `(viewer, holder)`.

### Notes

- The power itself has its own `condition` field (the one common to all power types). If that condition is false, the power is inactive and the label is **not** hidden.
- If both `entity_condition` and `bientity_condition` are omitted, the label is hidden from **all** viewers.
- If either condition is specified, both must be satisfied for the label to be hidden. (If you specify only one, it is the only requirement.)
- The viewer is the entity whose camera is being used for rendering (typically a player). In first‑person, the player’s own label is never rendered anyway, so this power affects how others see the power holder.
- The power is evaluated **client‑side** using data synced by Apoli. No extra networking is required.

### Examples

```json
{
    "type": "sync:prevent_label_render"
}
```
Hides the name tag from everyone, unconditionally.

```json
{
    "type": "sync:prevent_label_render",
    "entity_condition": {
        "type": "apoli:in_block_anywhere",
        "block_condition": {
            "type": "apoli:fluid",
            "fluid_condition": {
                "type": "apoli:in_tag",
                "tag": "minecraft:water"
            }
        },
        "comparison": ">=",
        "compare_to": 1
    }
}
```
Hides the label only from viewers whose eyes or feet are in water.

```json
{
    "type": "sync:prevent_label_render",
    "bientity_condition": {
        "type": "apoli:can_see",
        "inverted": true
    }
}
```
Hides the label from viewers that cannot see the power holder (e.g., when the holder is behind a wall).

```json
{
    "type": "sync:prevent_label_render",
    "entity_condition": {
        "type": "apoli:sneaking"
    },
    "bientity_condition": {
        "type": "apoli:distance",
        "comparison": "<=",
        "compare_to": 5
    }
}
```
Hides the label from viewers that are sneaking **and** within 5 blocks of the holder.