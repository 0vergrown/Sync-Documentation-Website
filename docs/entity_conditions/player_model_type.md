---
title: Player Model Type (Entity Condition)
date: 2024-01-07
---

# Player Model Type

[Entity Condition Types](https://origins.readthedocs.io/en/latest/types/entity_condition_types/)

Checks whether a player is using the "wide" (classic/default) or "slim" (Alex) player model variant.

Type ID: `sync:player_model_type`

### Fields

Field | Type | Default | Description
------|------|---------|-------------
`model_type` | [String](https://origins.readthedocs.io/en/latest/types/data_types/string/) | | The model type to check for. Valid values: `"wide"` or `"slim"`

### How It Works

This condition checks the player's skin model type, which is determined by their Minecraft account settings. The player model type is automatically detected client-side and synchronized to the server.

- **"wide"** - The classic/default player model (Steve) with 4-pixel wide arms
- **"slim"** - The slim player model (Alex) with 3-pixel wide arms

### Notes

- Only works on player entities (returns false for non-players)
- Model type is cached and automatically updated when players change skins
- Model type information is cleared when players disconnect
- Case-insensitive comparison

### Examples

```json
{
    "type": "sync:player_model_type",
    "model_type": "wide"
}
```
This example checks if the player is using the wide/classic model.

```json
{
    "type": "apoli:and",
    "conditions": [
        {
            "type": "sync:player_model_type",
            "model_type": "slim"
        },
        {
            "type": "apoli:equipped_item",
            "equipment_slot": "chest",
            "item_condition": {
                "type": "apoli:ingredient",
                "ingredient": {
                    "item": "minecraft:elytra"
                }
            }
        }
    ]
}
```
This example checks if the player has a slim model and is wearing an elytra.