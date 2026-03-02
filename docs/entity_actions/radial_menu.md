---
title: Radial Menu (Entity Action)
date: 2024-01-07
---

# Radial Menu

[Entity Action Types](https://origins.readthedocs.io/en/latest/types/entity_action_types/)

Opens a customizable radial menu on the client screen with configurable buttons, icons, and tooltips.

Type ID: `sync:radial_menu`

### Fields

| Field             | Type                                                                                                                                   | Default    | Description                                                    |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------|------------|----------------------------------------------------------------|
| `entries`         | [Array](https://origins.readthedocs.io/en/latest/types/data_types/array/) of [Radial Menu Entries](../data_types/radial_menu_entry.md) |            | List of menu entries to display                                |
| `sprite_location` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)                                                    | *optional* | Custom texture for the radial menu background (256x256 pixels) |

### How It Works

When this action executes on a player, it opens a radial menu screen on their client. The menu displays the specified entries in a circular pattern around the screen center. Entries are filtered by their conditions before being sent to the client and only entries whose conditions pass are displayed.

### Menu Behavior

- **Layout**: Entries are evenly distributed around a circle
- **Animation**: Entries animate outward from the center based on `velocity` and `distance`
- **Interaction**: Clicking an entry executes its `entity_action` and closes the menu
- **Closure**: Menu closes automatically after selection or when the player closes it manually

### Notes

- Only works on player entities (server-side check)
- Menu is rendered client-side
- Entries with failing conditions are automatically hidden
- Background texture should be 256x256 pixels, centered on screen
- All distances and positions are in screen pixels
- If no entries pass their conditions, the menu doesn't open

### Examples

```json
{
    "type": "sync:radial_menu",
    "entries": [
        {
            "item": {
                "item": "minecraft:water_bucket"
            },
            "entity_action": {
                "type": "apoli:execute_command",
                "command": "fill ~-1 ~ ~-1 ~1 ~2 ~1 minecraft:water replace air"
            }
        },
        {
            "icon": "sync:textures/gui/fire_icon.png",
            "entity_action": {
                "type": "apoli:execute_command",
                "command": "fill ~-1 ~ ~-1 ~1 ~2 ~1 minecraft:fire replace air"
            }
        }
    ]
}
```
A simple radial menu with two options: place water or place fire.

```json
{
    "type": "sync:radial_menu",
    "sprite_location": "sync:textures/gui/custom_menu.png",
    "entries": [
        {
            "item": {
                "item": "minecraft:diamond_sword"
            },
            "button_texture": "sync:textures/gui/button.png",
            "highlight_button_texture": "sync:textures/gui/button_highlight.png",
            "entity_action": {
                "type": "apoli:give",
                "stack": {
                    "item": "minecraft:diamond_sword",
                    "amount": 1
                }
            },
            "tooltip": "Summon Weapon",
            "distance": 120,
            "velocity": 50
        },
        {
            "icon": "sync:textures/gui/heal_icon.png",
            "entity_action": {
                "type": "apoli:heal",
                "amount": 10
            },
            "condition": {
                "type": "apoli:health",
                "comparison": "<",
                "compare_to": 20
            },
            "tooltip": {
                "text": "Emergency Heal",
                "color": "red"
            }
        },
        {
            "item": {
                "item": "minecraft:ender_pearl"
            },
            "entity_action": {
                "type": "sync:random_teleport",
                "area_width": 32.0,
                "area_height": 16.0
            },
            "tooltip": "Random Teleport"
        }
    ]
}
```
An advanced radial menu with custom background, custom button textures, conditional entries, and varied tooltips.

```json
{
    "type": "sync:radial_menu",
    "entries": [
        {
            "item": {
                "item": "minecraft:iron_sword"
            },
            "entity_action": {
                "type": "apoli:change_resource",
                "resource": "sync:combat_mode",
                "change": 1
            },
            "condition": {
                "type": "apoli:resource",
                "resource": "sync:combat_mode",
                "comparison": "==",
                "compare_to": 0
            }
        },
        {
            "item": {
                "item": "minecraft:bow"
            },
            "entity_action": {
                "type": "apoli:change_resource",
                "resource": "sync:combat_mode",
                "change": 1
            },
            "condition": {
                "type": "apoli:resource",
                "resource": "sync:combat_mode",
                "comparison": "==",
                "compare_to": 1
            }
        },
        {
            "item": {
                "item": "minecraft:shield"
            },
            "entity_action": {
                "type": "apoli:change_resource",
                "resource": "sync:combat_mode",
                "change": 1
            },
            "condition": {
                "type": "apoli:resource",
                "resource": "sync:combat_mode",
                "comparison": "==",
                "compare_to": 2
            }
        }
    ]
}
```
A mode-switching radial menu where entries appear based on current mode, cycling through combat styles.