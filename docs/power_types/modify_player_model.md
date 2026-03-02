---
title: Modify Player Model (Power Type)
date: 2024-01-07
---

# Modify Player Model

[Power Types](https://origins.readthedocs.io/en/latest/types/power_types/)

Changes the player's visual model to custom variants with additional limbs or body parts.

Type ID: `sync:modify_player_model`

### Fields

| Field   | Type                                                                        | Default | Description                                                     |
|---------|-----------------------------------------------------------------------------|---------|-----------------------------------------------------------------|
| `model` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) |         | The model variant to use. Valid values: `FOUR_ARMS`, `STINKFLY` |

### How It Works

This power type modifies the player's entity model to add extra limbs or change their body structure. The modifications are purely visual and automatically adapt to both "wide" and "slim" player model types.

**Four Arms Model:**
- Adds a second pair of arms below the regular arms
- The extra arms mirror the movement of the primary arms
- Upper arms are angled upward, lower arms angled downward
- Compatible with armor rendering

**StinkFly Model:**
- Adds a second pair of legs
- Modifies the body to be more insect-like with angled upper and lower torso
- Repositions head, arms, and legs
- Maintains full animation support including sneaking

### Notes

- Models automatically adjust based on the player's skin type (wide/slim arms)
- All vanilla animations are preserved and adapted to the new model
- Armor and held items render correctly on modified models
- The power is client-side visual only - hitboxes remain unchanged
- Multiple model powers can exist but only one will be active at a time (last one wins)

### Examples

```json
{
    "type": "sync:modify_player_model",
    "model": "FOUR_ARMS"
}
```
This example gives the player a permanent four-armed model.

```json
{
    "type": "sync:modify_player_model",
    "model": "STINKFLY",
    "condition": {
        "type": "apoli:power_active",
        "power": "sync:flying_transformation"
    }
}
```
This example changes to the StinkFly model only when a flying transformation power is active.