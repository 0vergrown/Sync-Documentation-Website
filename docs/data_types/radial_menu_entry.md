---
title: Radial Menu Entry (Data Type)
date: 2024-01-07
---

# Radial Menu Entry

[Data Type](https://origins.readthedocs.io/en/latest/types/data_types/)

A data type representing a single entry in a radial menu. Used by the [Radial Menu (Entity Action)](../entity_actions/radial_menu.md).

### Fields

| Field                      | Type                                                                                       | Default    | Description                                                                          |
|----------------------------|--------------------------------------------------------------------------------------------|------------|--------------------------------------------------------------------------------------|
| `item`                     | [Item Stack](https://origins.readthedocs.io/en/latest/types/data_types/item_stack/)        | *optional* | Item to display as icon (fallback if no custom icon is provided)                     |
| `button_texture`           | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)        | *optional* | Custom texture for the button background                                             |
| `icon`                     | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)        | *optional* | Custom texture for the button icon                                                   |
| `highlight_icon_texture`   | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)        | *optional* | Custom texture for the icon when the button is hovered                               |
| `highlight_button_texture` | [Identifier](https://origins.readthedocs.io/en/latest/types/data_types/identifier/)        | *optional* | Custom texture for the button when hovered                                           |
| `entity_action`            | [Entity Action](https://origins.readthedocs.io/en/latest/types/entity_action_types/)       |            | Action to execute when this entry is clicked                                         |
| `condition`                | [Entity Condition](https://origins.readthedocs.io/en/latest/types/entity_condition_types/) | *optional* | Optional condition to hide/show this entry                                           |
| `distance`                 | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)              | `-1`       | Distance from center in pixels. When `-1`, defaults to screen height / 4             |
| `velocity`                 | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)              | `-1`       | Animation speed in pixels per tick. When `-1`, defaults to distance / 3              |
| `tooltip`                  | [Text](https://origins.readthedocs.io/en/latest/types/data_types/text_component/)          | *optional* | Tooltip text shown on hover. If not provided and `item` is set, uses the item's name |
| `button_width`             | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)              | `16`       | Width of the button in pixels                                                        |
| `button_height`            | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)              | `20`       | Height of the button in pixels                                                       |
| `icon_width`               | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)              | `16`       | Width of the icon in pixels                                                          |
| `icon_height`              | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)              | `16`       | Height of the icon in pixels                                                         |
| `item_width`               | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)              | `16`       | Width of item display in pixels (when using `item` as icon)                          |
| `item_height`              | [Integer](https://origins.readthedocs.io/en/latest/types/data_types/integer/)              | `16`       | Height of item display in pixels (when using `item` as icon)                         |

### How It Works

Each radial menu entry represents one button in the radial menu. The entry determines:
- **Visual appearance**: Through `button_texture`, `icon`, and their highlight variants
- **Behavior**: Through `entity_action` that executes when clicked
- **Visibility**: Through optional `condition` that can hide the entry
- **Position & Animation**: Through `distance` and `velocity` settings
- **Size**: Through various width/height fields for button, icon, and item

### Icon Priority

The system uses the following priority for displaying icons:
1. Custom `icon` texture (highest priority)
2. `item` stack rendering (fallback)
3. No icon if neither is provided

### Examples

```json
{
    "item": {
        "item": "minecraft:diamond_sword"
    },
    "entity_action": {
        "type": "apoli:execute_command",
        "command": "give @s minecraft:diamond_sword"
    },
    "tooltip": "Get Diamond Sword",
    "button_width": 20,
    "button_height": 24
}
```
An entry using an item icon with custom button size.

```json
{
    "icon": "sync:textures/gui/special_ability.png",
    "button_texture": "sync:textures/gui/button_normal.png",
    "highlight_button_texture": "sync:textures/gui/button_highlight.png",
    "entity_action": {
        "type": "apoli:apply_effect",
        "effect": {
            "effect": "minecraft:strength",
            "duration": 600,
            "amplifier": 1
        }
    },
    "condition": {
        "type": "apoli:resource",
        "resource": "sync:mana",
        "comparison": ">=",
        "compare_to": 50
    },
    "distance": 100,
    "velocity": 40
}
```
An entry with custom textures, condition-based visibility, and custom animation settings.

```json
{
    "item": {
        "item": "minecraft:ender_pearl"
    },
    "entity_action": {
        "type": "sync:random_teleport",
        "area_width": 16.0,
        "area_height": 8.0
    },
    "tooltip": {
        "text": "Random Teleport",
        "color": "aqua"
    },
    "icon_width": 24,
    "icon_height": 24,
    "item_width": 24,
    "item_height": 24
}
```
An entry with a larger item display size and formatted tooltip.